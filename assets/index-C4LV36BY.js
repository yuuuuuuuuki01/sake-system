(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const co="modulepreload",po=function(e){return"/"+e},nn={},q=function(t,n,s){let r=Promise.resolve();if(n&&n.length>0){let u=function(y){return Promise.all(y.map(v=>Promise.resolve(v).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),p=d?.nonce||d?.getAttribute("nonce");r=u(n.map(y=>{if(y=po(y),y in nn)return;nn[y]=!0;const v=y.endsWith(".css"),g=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${g}`))return;const w=document.createElement("link");if(w.rel=v?"stylesheet":co,v||(w.as="script"),w.crossOrigin="",w.href=y,p&&w.setAttribute("nonce",p),document.head.appendChild(w),v)return new Promise((P,A)=>{w.addEventListener("load",P),w.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${y}`)))})}))}function l(d){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=d,window.dispatchEvent(p),!p.defaultPrevented)throw d}return r.then(d=>{for(const p of d||[])p.status==="rejected"&&l(p.reason);return t().catch(l)})},xe="https://ridspyczkxwkcbmwndhm.supabase.co",uo="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHNweWN6a3h3a2NibXduZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzkwODAsImV4cCI6MjA5MzUxNTA4MH0.ppWbfEsrUdUL8sRPO3BPHWA-r12ueMgJ3C44n1FvK3o",re=uo;async function Ne(e,t){try{const n=new URL(`/rest/v1/${e}`,xe),s=await fetch(n.toString(),{method:"POST",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function Ia(e,t){try{const n=new URL(`/rest/v1/${e}`,xe),s=await fetch(n.toString(),{method:"POST",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function St(e,t,n){try{const s=new URL(`/rest/v1/${e}?id=eq.${t}`,xe);return(await fetch(s.toString(),{method:"PATCH",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function he(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,xe),s=await fetch(n.toString(),{method:"POST",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function Ta(e){try{const t=new URL(`/rest/v1/${e}`,xe);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:re,Authorization:`Bearer ${re}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const s=n.headers.get("Content-Range");if(s){const r=s.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function V(e,t={}){try{const n=new URL(`/rest/v1/${e}`,xe);Object.entries(t).forEach(([r,l])=>{n.searchParams.set(r,l)});const s=await fetch(n.toString(),{method:"GET",headers:{apikey:re,Authorization:`Bearer ${re}`,Accept:"application/json",Prefer:"return=representation"}});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function Fn(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,xe);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:re,Authorization:`Bearer ${re}`}})).ok}catch{return!1}}async function ge(e,t={},n=1e3){const s=[];let r=0;try{for(;;){const l=new URL(`/rest/v1/${e}`,xe);Object.entries(t).forEach(([u,y])=>{l.searchParams.set(u,y)}),l.searchParams.set("limit",String(n)),l.searchParams.set("offset",String(r));const d=await fetch(l.toString(),{method:"GET",headers:{apikey:re,Authorization:`Bearer ${re}`,Accept:"application/json",Prefer:"return=representation"}});if(!d.ok)throw new Error(`HTTP ${d.status}`);const p=await d.json();if(s.push(...p),p.length<n)break;r+=n}return s}catch(l){return console.warn(`Failed to query all rows from Supabase table ${e}`,l),s.length>0?s:[]}}const Z=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:re,SUPABASE_URL:xe,supabaseCount:Ta,supabaseDelete:Fn,supabaseInsert:Ne,supabaseQuery:V,supabaseQueryAll:ge,supabaseRpc:he,supabaseUpdate:St,supabaseUpsert:Ia},Symbol.toStringTag,{value:"Module"})),Ma="sake_auth";function Vn(e){localStorage.setItem(Ma,JSON.stringify(e))}function Yn(){return{apikey:re,"Content-Type":"application/json"}}function mo(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),s=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(s))}catch{return null}}async function Un(e,t){const n=await fetch(`${xe}/auth/v1/${e}`,{method:"POST",headers:Yn(),body:JSON.stringify(t)}),s=await n.json().catch(()=>({}));if(!n.ok)throw new Error(s.error_description??s.msg??`HTTP ${n.status}`);return s}async function yo(e,t){const n=await Un("token?grant_type=password",{email:e,password:t});return Vn({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function sn(e,t){const n=await Un("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&Vn({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function ho(){const e=Ht();if(localStorage.removeItem(Ma),!!e?.access_token)try{await fetch(`${xe}/auth/v1/logout`,{method:"POST",headers:{...Yn(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function Ht(){const e=localStorage.getItem(Ma);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function fo(){const e=Ht();if(!e)return null;const t=mo(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function go(e){const t=Ht();if(!t)throw new Error("not signed in");const n=await fetch(`${xe}/auth/v1/user`,{method:"PUT",headers:{apikey:re,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const s=await n.json().catch(()=>({}));throw new Error(s.msg??`HTTP ${n.status}`)}}const Na={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},Jn={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},vo={generatedAt:new Date().toISOString(),records:[]},Fe={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},bo={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},wo={},xo={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function ie(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function $o(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function _o(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function f(e,t,n=""){for(const s of t){const r=e[s];if(typeof r=="string"&&r.length>0)return r}return n}function D(e,t,n=0){for(const s of t)if(s in e)return ie(e[s]);return n}function ve(e,t,n=!0){for(const s of t)if(s in e)return _o(e[s]);return n}function fe(e,t,n){for(const s of t){const r=e[s];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const l=new Date(r);if(!Number.isNaN(l.getTime()))return l.toISOString()}return n}function So(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:fe(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:ie(e.total_amount??e.billed_amount)}}function on(e){const t=e.trim().toUpperCase(),n=wo[t];if(n)return n;const s=Jn.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function Qn(e){try{return(await V("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function at(e,t){await Ia("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function Hn(){const e=await ge("daily_sales_detail",{select:"sales_date,amount,document_count,bottles,volume_ml,price_per_bottle,price_per_liter",order:"sales_date.desc"});if(e.length>0){const[t,n]=await Promise.all([V("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),V("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),r=new Date().toISOString().slice(0,10),l=r.slice(0,7),d=[...e].sort((P,A)=>P.sales_date.localeCompare(A.sales_date)).map(P=>({date:new Date(`${P.sales_date}T00:00:00Z`).toISOString(),amount:ie(P.amount??P.sales_amount),bottles:ie(P.bottles),volumeMl:ie(P.volume_ml),pricePerBottle:ie(P.price_per_bottle),pricePerLiter:ie(P.price_per_liter)})),p=d.slice(-30),u=P=>ie(P.amount??P.sales_amount),y=e.reduce((P,A)=>A.sales_date===r?P+u(A):P,0),v=e.reduce((P,A)=>A.sales_date.startsWith(l)?P+u(A):P,0),g=t.filter(P=>ie(P.balance_amount)>0),w=n.map((P,A)=>({id:String(P.id??`sale-${A+1}`),documentNo:P.document_no??P.legacy_document_no??"",date:P.sales_date??"",customerCode:P.legacy_customer_code??"",customerName:P.customer_name??P.legacy_customer_code??"",amount:ie(P.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:y,todayDelta:0,monthSales:v,monthDelta:0,unpaidCount:g.length,unpaidAmount:g.reduce((P,A)=>P+ie(A.balance_amount),0)},dailySales:p,allDailySales:d,salesRecords:w}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),Jn}async function Kn(){const e=await ge("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const s=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:ie(t.billed_amount),paymentAmount:ie(t.paid_amount),balanceAmount:ie(t.balance_amount),lastPaymentDate:null,status:$o(t.payment_status)}})}:vo}async function Ra(){const[e,t]=await Promise.all([ge("customers"),ge("products")]);if(e.length>0||t.length>0){const n=e.length?e.map((r,l)=>{const d=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:f(r,["id","customer_id","code"],`customer-${l+1}`),code:f(r,["code","customer_code","legacy_customer_code"],`C${String(l+1).padStart(4,"0")}`),name:f(r,["name","customer_name","display_name"],`Customer ${l+1}`),kanaName:f(r,["kana_name"],""),shortName:f(r,["short_name"],""),postalCode:f(r,["postal_code"],""),address1:f(r,["address1"],""),address2:f(r,["address2"],""),phone:f(r,["phone"],""),fax:f(r,["fax"],""),email:f(r,["email"],""),staffCode:f(r,["staff_code"],""),businessType:f(r,["business_type"],""),areaCode:f(r,["delivery_area_code"],""),salesCategory:String(d.sales_category??""),closingDay:D(r,["closing_day","close_day"],31),paymentDay:D(r,["payment_day","due_day"],15),paymentMonth:Number(d.payment_month??0),paymentCycle:f(r,["payment_cycle"],""),billingCycleType:f(r,["billing_cycle_type"],""),billingCode:String(d.billing_code??""),creditLimit:D(r,["credit_limit"],0),taxMode:f(r,["tax_mode"],""),taxRound:String(d.tax_round??""),invoiceIssue:String(d.invoice_issue??""),invoiceType:f(r,["invoice_type"],""),priceGroup:String(d.price_group??""),priceType:String(d.price_type??""),tradeType:(()=>{const p=f(r,["trade_type"],"");if(p)return p;const u=String(d.price_type??"");return u==="000"?"B2B2C":u==="001"?"B2C":"B2B"})(),customerGroup1:String(d.customer_group1??""),customerGroup2:String(d.customer_group2??""),bankName:f(r,["bank_name"],""),bankBranch:f(r,["bank_branch"],""),bankAccount:f(r,["bank_account"],""),isActive:ve(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):Fe.customers,s=t.length?t.map((r,l)=>({id:f(r,["id","product_id","product_code","legacy_product_code"],`product-${l+1}`),code:f(r,["product_code","legacy_product_code","code"],`P${String(l+1).padStart(5,"0")}`),janCode:f(r,["jan_code","jan","barcode"],""),name:f(r,["name","product_name","display_name"],`Product ${l+1}`),kanaName:f(r,["kana_name"],""),shortName:f(r,["short_name"],""),category:f(r,["category_code","category","category_name"],"未分類"),taxCategoryCode:f(r,["tax_code","tax_category_code"],""),isActive:ve(r,["is_active","active","enabled"],!0),listPrice:D(r,["list_price"],0),purchasePrice:D(r,["purchase_price"],0),salePrice:D(r,["default_sale_price","sale_price"],0),costPrice:D(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:f(r,["unit_name","unit"],"本"),caseQty:r.case_qty!=null?Number(r.case_qty):null,bottleType:f(r,["bottle_type"],""),containerCode:f(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:f(r,["rice_type"],""),season:f(r,["season"],""),agingYears:D(r,["aging_years"],0)})):Fe.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||Fe.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:Fe.summary.activeCustomerCount,productCount:t.length||Fe.summary.productCount,activeProductCount:t.length?s.filter(r=>r.isActive).length:Fe.summary.activeProductCount},customers:n,products:s}}return Fe}async function Gn(){const[e,t]=await Promise.all([V("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),V("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?fe(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const s=e[0],r=f(s,["status"],"success"),l=s.errors,d=Array.isArray(l)?l.length>0:!!l;return{generatedAt:new Date().toISOString(),lastSyncAt:fe(s,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:d?"warning":r==="error"?"error":"success",jobName:f(s,["agent_hostname"],"sake-relay"),message:`${D(s,["rows_upserted"],0)}行同期 / ${D(s,["files_updated"],0)}ファイル更新`}}return{...bo,lastDataAt:n}}async function Wn(){const e=await he("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function $t(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount,line_count",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];e.customerCode.trim()&&n.push(`customer_code.ilike.*${e.customerCode.trim()}*`,`legacy_customer_code.ilike.*${e.customerCode.trim()}*`),e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const s=await V("mv_invoice_with_line_count",t);return s.length>0?s.map((r,l)=>({id:f(r,["id"],`invoice-${l}`),documentNo:f(r,["document_no","legacy_document_no"],""),date:fe(r,["sales_date"],""),customerCode:f(r,["legacy_customer_code","customer_code"],""),customerName:f(r,["customer_name","legacy_customer_code"],""),itemCount:D(r,["line_count"],0),amount:D(r,["total_amount","billed_amount"],0)})):[]}async function Oa(e){const t=e.trim().toUpperCase();if(!t)return on("");const[n,s,r]=await Promise.all([V("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),V("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),V("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||s.length>0){const l=n.map((u,y)=>{const v=So(u,y);return{id:v.id,date:v.date,documentNo:v.documentNo,amount:v.amount}}),d=s.map((u,y)=>({id:String(u.id??`payment-${y+1}`),date:fe(u,["payment_date","received_date"],new Date().toISOString()),amount:ie(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),p=r.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:ie(p?.balance_amount),salesTotal:l.reduce((u,y)=>u+y.amount,0),paymentTotal:d.reduce((u,y)=>u+y.amount,0),salesHistory:l,paymentHistory:d}}return on(t)}async function ja(){const[e,t,n,s]=await Promise.all([V("mv_monthly_sales",{order:"month.asc"}),V("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),V("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),V("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(r=>({month:f(r,["month"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),volumeMl:D(r,["volume_ml"],0)})),productTotals:n.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})),customerTotals:t.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})),staffTotals:s.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:0}))}:xo}async function ko(e,t,n){if(t==="all")return[];const s=n?Xn(t,n):null,l=await he(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:s?.from??null,p_date_to:s?.to??null});return l?l.map(d=>({code:f(d,["code"],""),name:f(d,["name"],""),amount:D(d,["amount"],0),quantity:D(d,["quantity"],0),documents:D(d,["documents"],0),volumeMl:D(d,["volume_ml"],0)})):[]}async function Po(e,t){if(t==="all")return[];const n=await he("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(s=>s.period_val).filter(Boolean)}function Xn(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,s]=t.split("-").map(Number),r=`${n}-${String(s).padStart(2,"0")}-01`,l=new Date(n,s,0).getDate(),d=`${n}-${String(s).padStart(2,"0")}-${String(l).padStart(2,"0")}`;return{from:r,to:d}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const s=parseInt(n[1]),r=parseInt(n[2]),l=new Date(s,0,4),d=l.getDay()||7,p=new Date(l);p.setDate(l.getDate()-d+1);const u=new Date(p);u.setDate(p.getDate()+(r-1)*7);const y=new Date(u);return y.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:y.toISOString().slice(0,10)}}return null}function Zn(e){return e.map(t=>({staffCode:f(t,["staff_code"],""),staffName:f(t,["staff_name"],""),code:f(t,["code"],""),name:f(t,["name"],""),tag:f(t,["tag"],""),amount:D(t,["amount"],0),quantity:D(t,["quantity"],0),documents:D(t,["documents"],0)}))}async function Eo(e,t){const n=await he("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(s=>({code:f(s,["code"],""),name:f(s,["name"],""),amount:D(s,["amount"],0),quantity:D(s,["quantity"],0),documents:D(s,["documents"],0)})):[]}async function Ao(e,t,n){const s=await he("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?Zn(s):[]}async function Lo(e,t,n){const s=await he("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?Zn(s):[]}async function Co(e,t){if(e==="all"||!t)return[];const n=await he("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(s=>({month:f(s,["label"],""),amount:D(s,["amount"],0),quantity:D(s,["quantity"],0),volumeMl:D(s,["volume_ml"],0)})):[]}function Do(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function qo(e,t,n){const s=await he("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),tag:f(r,["tag"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})):[]}async function Io(e,t,n){const s=await he("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),tag:f(r,["tag"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})):[]}async function To(e,t){const n=await he("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(s=>({month:f(s,["month"],""),amount:D(s,["amount"],0),quantity:D(s,["quantity"],0),volumeMl:D(s,["volume_ml"],0)})):[]}async function Mo(e,t){const n=await he("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:f(s,["brew_category"],""),subCategory:f(s,["sub_category"],""),productCount:D(s,["product_count"],0),totalShipmentQty:D(s,["total_shipment_qty"],0),totalShipmentMl:D(s,["total_shipment_ml"],0),monthlyAvgQty:D(s,["monthly_avg_qty"],0),monthlyAvgMl:D(s,["monthly_avg_ml"],0),currentStockL:D(s,["current_stock_l"],0),monthsRemaining:D(s,["months_remaining"],0),costPerL:D(s,["cost_per_l"],0)})):[]}async function No(e,t){const n=await he("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({month:f(s,["month"],""),brewCategory:f(s,["brew_category"],""),shipmentMl:D(s,["shipment_ml"],0)})):[]}async function Ro(e,t){const n=await he("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:f(s,["brew_category"],""),subCategory:f(s,["sub_category"],""),productCode:f(s,["product_code"],""),productName:f(s,["product_name"],""),volumeMl:D(s,["volume_ml"],0),annualQty:D(s,["annual_qty"],0),annualMl:D(s,["annual_ml"],0),monthlyAvgQty:D(s,["monthly_avg_qty"],0),monthlyAvgMl:D(s,["monthly_avg_ml"],0)})):[]}async function Oo(e){return(await V("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:f(n,["id"],""),brewCategory:f(n,["brew_category"],""),fy:D(n,["fy"],e),brewMonth:D(n,["brew_month"],0),durationMonths:D(n,["duration_months"],2),plannedVolumeL:D(n,["planned_volume_l"],0),notes:f(n,["notes"],"")}))}async function jo(e,t,n){return await he("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(r=>({brew_month:r.brewMonth,duration_months:r.durationMonths,planned_volume_l:r.plannedVolumeL,notes:r.notes??null}))})!==null}async function Bo(e,t,n,s){return await Ia("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:s??null,updated_at:new Date().toISOString()})!==null}async function zo(){const e=await V("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const s=f(n,["category_name"],""),r=f(n,["production_type_name"],"");!s||!r||(t[s]||(t[s]=[]),t[s].push(r))}return t}async function Fo(e,t){return await he("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function Vo(e,t){return await he("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function Yo(){const e=await V("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>f(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function Uo(){const e=await V("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const s=f(n,["brew_category"],"");s&&(t[s]={brewCategory:s,rawAlcoholPct:D(n,["raw_alcohol_pct"],18),targetAlcoholPct:D(n,["target_alcohol_pct"],15)})}return t}async function Jo(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await q(async()=>{const{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}},void 0);return r?(await fetch(`${s}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function Qo(){const e=await he("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:D(t,["fy"],0),brewCategory:f(t,["brew_category"],""),shipmentL:D(t,["shipment_l"],0),monthsElapsed:D(t,["months_elapsed"],12),annualizedL:D(t,["annualized_l"],0)})):[]}async function Ho(){const e=await V("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const s=f(n,["brew_category"],""),r=D(n,["growth_rate"],NaN);s&&!isNaN(r)&&(t[s]=r)}return t}async function Ko(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}},void 0);return s?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function Go(){const e=await V("brewing_rice_params",{}),t={};for(const n of e??[]){const s=f(n,["brew_category"],"");s&&(t[s]={brewCategory:s,polishingRatio:D(n,["polishing_ratio"],.7),ricePerLiterKg:D(n,["rice_per_liter_kg"],.5),kojiRatio:D(n,["koji_ratio"],.3),kojiVariety:f(n,["koji_variety"],"山田錦"),kojiPricePerKg:D(n,["koji_price_per_kg"],600),kakeVariety:f(n,["kake_variety"],"一般米"),kakePricePerKg:D(n,["kake_price_per_kg"],350),alcoholAdditionRatio:D(n,["alcohol_addition_ratio"],0)})}return t}async function Wo(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,koji_ratio:t.kojiRatio,koji_variety:t.kojiVariety,koji_price_per_kg:t.kojiPricePerKg,kake_variety:t.kakeVariety,kake_price_per_kg:t.kakePricePerKg,alcohol_addition_ratio:t.alcoholAdditionRatio??0,updated_at:new Date().toISOString()})})).ok:!1}async function Xo(){const e=await he("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:f(t,["brew_category"],""),monthNum:D(t,["month_num"],0),avgMonthlyL:D(t,["avg_monthly_l"],0)})):[]}async function Zo(e){const t=await V("procurement_decisions",{fy:`eq.${e}`}),n={};for(const s of t??[]){const r=f(s,["brew_category"],""),l=D(s,["decided_brewing_l"],-1);r&&l>=0&&(n[r]=l)}return n}async function er(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await q(async()=>{const{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}},void 0);return r?(await fetch(`${s}/rest/v1/procurement_decisions`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,fy:t,decided_brewing_l:n,updated_at:new Date().toISOString()})})).ok:!1}async function tr(e){return(await V("brewing_batches",{fy:`eq.${e}`,order:"start_date.asc.nullsfirst"})??[]).map(n=>({id:f(n,["id"],""),brewCategory:f(n,["brew_category"],""),batchCode:f(n,["batch_code"],""),fy:D(n,["fy"],e),plannedVolumeL:D(n,["planned_volume_l"],0),tankNo:f(n,["tank_no"],""),status:f(n,["status"],"planned"),startDate:f(n,["start_date"],""),targetEndDate:f(n,["target_end_date"],""),notes:f(n,["notes"],"")}))}async function ar(e){return e.length===0?[]:(await V("brewing_process_steps",{batch_id:`in.(${e.join(",")})`,order:"batch_id.asc,step_order.asc"})??[]).map(n=>({id:f(n,["id"],""),batchId:f(n,["batch_id"],""),stepOrder:D(n,["step_order"],0),stepName:f(n,["step_name"],""),plannedStart:f(n,["planned_start"],""),plannedEnd:f(n,["planned_end"],""),actualStart:f(n,["actual_start"],""),actualEnd:f(n,["actual_end"],""),status:f(n,["status"],"未着手"),temperature:n.temperature!=null?D(n,["temperature"],0):null,notes:f(n,["notes"],"")}))}async function nr(e,t,n,s,r){return await he("create_brewing_batch",{p_brew_category:e,p_batch_code:t,p_fy:n,p_volume_l:s,p_start_date:r})}async function sr(e,t){return St("brewing_process_steps",e,t)}async function or(e,t){return St("brewing_batches",e,{...t,updated_at:new Date().toISOString()})}async function rr(e){return(await V("rice_purchase_commitments",{fy:`eq.${e}`,order:"variety_name.asc"})??[]).map(n=>({id:f(n,["id"],""),varietyName:f(n,["variety_name"],""),committedBales:D(n,["committed_bales"],0),pricePerKg:D(n,["price_per_kg"],0),supplier:f(n,["supplier"],""),deliveryMonth:D(n,["delivery_month"],0)||null,fy:D(n,["fy"],e),notes:f(n,["notes"],"")}))}async function ir(e){return await Ne("rice_purchase_commitments",{variety_name:e.varietyName,committed_bales:e.committedBales??0,price_per_kg:e.pricePerKg??0,supplier:e.supplier??"",delivery_month:e.deliveryMonth??null,fy:e.fy,notes:e.notes??""})!==null}async function lr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_purchase_commitments?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function cr(){return(await V("rice_varieties",{order:"sort_order.asc,name.asc"})??[]).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),defaultPricePerKg:D(t,["default_price_per_kg"],400),region:f(t,["region"],"")}))}async function dr(e,t,n=""){return await Ne("rice_varieties",{name:e,default_price_per_kg:t,region:n})!==null}async function pr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_varieties?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function ur(e){return(await V("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:f(n,["id"],""),brewCategory:f(n,["brew_category"],""),label:f(n,["label"],""),volumeL:D(n,["volume_l"],0)}))}async function mr(){return(await V("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:f(t,["id"],""),brewCategory:f(t,["brew_category"],""),label:f(t,["label"],""),volumeL:D(t,["volume_l"],0)}))}async function yr(e,t,n){return await Ne("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function hr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function fr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function gr(){return(await V("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:f(t,["name"],""),parentCategory:f(t,["parent_category"],"")})).filter(t=>t.name)}async function vr(e,t){return await Ne("brewing_custom_categories",{name:e,parent_category:t})!==null}async function br(e){const t=await he("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:f(n,["production_type_name"],""),count:D(n,["product_count"],0)})).filter(n=>n.name):[]}async function wr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function xr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await q(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);if(!s)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function $r(){const e=await V("brewing_category_overrides",{}),t={};for(const n of e??[]){const s=f(n,["product_code"],""),r=f(n,["brew_category"],"");s&&r&&(t[s]=r)}return t}async function _r(e){return(await V("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>f(n,["product_code"],"")).filter(Boolean)}async function Sr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await q(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);if(!s)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}}),t.length===0)return!0;const r=t.map(d=>({year_month:e,product_code:d}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(r)})).ok}catch{return!1}}const ga={sales:"売上",return:"返品",export_return:"輸出戻入"};async function es(e){const t=e.lines.reduce((r,l)=>r+l.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Ne("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const rn={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function Ba(e){const t=await V("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],s=ie(n.total_amount);return{documentNo:e,invoiceDate:f(n,["sales_date","document_date"],""),customerCode:f(n,["legacy_customer_code","customer_code"],""),customerName:f(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...rn,documentNo:e||rn.documentNo}}const kr={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function za(e){const t=await V("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const l=D(r,["sales_amount"],0),d=D(r,["tax_amount"],0);return{customerCode:f(r,["customer_code"],""),customerName:f(r,["customer_name"],""),closingDay:31,salesAmount:l,taxAmount:d,prevBalance:0,paymentAmount:0,billingAmount:l,status:"open"}}),s=n.reduce((r,l)=>r+l.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:s,customers:n}}return{...kr,targetYearMonth:e}}const Pr={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function Kt(){const[e,t,n]=await Promise.all([V("mv_monthly_sales",{order:"month.asc"}),V("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),V("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return Pr;const s=e.slice(-12).map(u=>f(u,["month"],"")),r=new Map;t.forEach(u=>{const y=f(u,["code"],"");r.has(y)||r.set(y,{name:f(u,["name"],y),monthValues:new Map}),r.get(y).monthValues.set(f(u,["month"],""),D(u,["amount"],0))});const d=Array.from(r.entries()).map(([u,y])=>({code:u,name:y.name,total:s.reduce((v,g)=>v+(y.monthValues.get(g)??0),0),monthValues:y.monthValues})).sort((u,y)=>y.total-u.total).slice(0,10).map(u=>({label:u.name,values:s.map(y=>u.monthValues.get(y)??0)})),p=n.map(u=>({label:f(u,["name"],""),values:s.map(()=>Math.round(D(u,["amount"],0)/s.length))}));return{generatedAt:new Date().toISOString(),months:s,salesByProduct:d,salesByCustomer:p,costSimulation:[]}}async function Er(){const e=await ge("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const s=f(n,["code"],"");if(!s)return;const r=f(n,["month"],""),l=parseInt(r.slice(5,7))-1;if(l<0||l>11)return;let d=t.get(s);d||(d={name:f(n,["name"],s),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(s,d)),d.qty[l]+=D(n,["quantity"],0),d.amt[l]+=D(n,["amount"],0)}),Array.from(t.entries()).map(([n,s])=>({code:n,name:s.name,monthlyQuantity:s.qty,monthlyAmount:s.amt,totalQuantity:s.qty.reduce((r,l)=>r+l,0),totalAmount:s.amt.reduce((r,l)=>r+l,0)})).filter(n=>n.totalQuantity>0).sort((n,s)=>s.totalAmount-n.totalAmount)}async function Ar(){return(await V("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:f(t,["product_code"],""),productName:f(t,["product_name"],""),forecastMonth:f(t,["forecast_month"],""),segment:f(t,["segment"],"monthly"),avgMonthly:D(t,["avg_monthly"],0),forecastQuantity:D(t,["forecast_quantity"],0),forecastAmount:D(t,["forecast_amount"],0),safetyStock:D(t,["safety_stock"],0),calculatedAt:fe(t,["calculated_at"],"")}))}async function Lr(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await ge("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(d=>String(d.id)).filter(Boolean);const s=await ge("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(d=>{d.id&&r.set(String(d.id),d)});const l=[];return s.forEach(d=>{const p=String(d.header_id??d.document_header_id??""),u=r.get(p);if(!u)return;const y=u.sales_date??u.document_date??"";!y||y<t||l.push({date:y.slice(0,10),customerName:u.customer_name??"不明",productName:d.product_name??"不明",quantity:ie(d.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),l.sort((d,p)=>d.date.localeCompare(p.date))}async function ts(){const e=new Date().toISOString();return(await V("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:f(n,["id"],""),message:f(n,["message"],""),level:f(n,["level"],"info"),startsAt:fe(n,["starts_at"],""),endsAt:n.ends_at?fe(n,["ends_at"],""):null,dismissible:ve(n,["dismissible"],!0)}))}async function Cr(){const e=await ge("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:f(t,["customer_code"],""),customer_name:f(t,["customer_name"],""),business_type:f(t,["business_type"],""),area_code:f(t,["area_code"],""),phone:f(t,["phone"],""),last_order_date:f(t,["last_order_date"],""),days_since_order:D(t,["days_since_order"],0),amount_12m:D(t,["amount_12m"],0),amount_3m:D(t,["amount_3m"],0),amount_this_month:D(t,["amount_this_month"],0),amount_last_year_same_month:D(t,["amount_last_year_same_month"],0),annual_revenue:D(t,["annual_revenue"],0),is_dormant:ve(t,["is_dormant"],!1),is_at_risk:ve(t,["is_at_risk"],!1)})):[]}async function Dr(){return(await ge("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:f(t,["customer_code"],""),customer_name:f(t,["customer_name"],""),phone:f(t,["phone"],""),address:f(t,["address"],""),area_code:f(t,["area_code"],""),business_type:f(t,["business_type"],""),priority_score:D(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:f(t,["last_order_date"],""),days_since_order:D(t,["days_since_order"],0),annual_revenue:D(t,["annual_revenue"],0),recommended_action:f(t,["recommended_action"],"")}))}async function qr(){return(await ge("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:f(t,["product_code"],""),product_name:f(t,["product_name"],""),season_type:f(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:D(t,["avg_monthly_qty"],0)}))}async function Ir(){return(await ge("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:f(t,["product_code"],""),name:f(t,["product_name"],""),monthlyQuantity:[D(t,["m01"],0),D(t,["m02"],0),D(t,["m03"],0),D(t,["m04"],0),D(t,["m05"],0),D(t,["m06"],0),D(t,["m07"],0),D(t,["m08"],0),D(t,["m09"],0),D(t,["m10"],0),D(t,["m11"],0),D(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:D(t,["total_quantity"],0),totalAmount:D(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function as(e,t,n){try{return await Ne("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function ns(e,t){return St("customers",e,t)}async function ss(e,t){return St("products",e,t)}async function va(e,t){const n=e.find(d=>d.code===t);n?.priceGroup;const s=n?.priceGroup||t;let r="";try{const d=await V("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});d[0]?.memo&&(r=(typeof d[0].memo=="string"?JSON.parse(d[0].memo):d[0].memo)?.price_type??"")}catch{}const l=new Map;if(s){const d=await V("customer_product_prices",{price_group:`eq.${s}`,select:"legacy_product_code,special_price"});for(const p of d)l.set(p.legacy_product_code,p.special_price)}return{priceType:r,priceGroup:s,individualPrices:l}}function Fa(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function os(){return(await V("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function Tr(){return(await ge("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Mr(){return(await V("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function vt(e,t="billing"){const n=await he("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t});return n?n.map(s=>({code:String(s.legacy_customer_code??""),name:String(s.customer_name??""),address:String(s.address1??""),yearAmount:Number(s.year_amount??0),sharePct:Number(s.share_pct??0),orderDays:Number(s.order_days??0),prevAmount:Number(s.prev_amount??0),growthRate:s.growth_rate!=null?Number(s.growth_rate):null,currentRank:String(s.current_rank??"C"),prevRank:String(s.prev_rank??"")})):[]}async function rs(){const[e,t]=await Promise.all([V("mv_customer_abc",{order:"amount.desc"}),Kt()]),n=e.map(s=>({code:f(s,["code"],""),name:f(s,["name"],""),amount:D(s,["amount"],0),documents:D(s,["documents"],0),ratio:D(s,["ratio"],0),cumRatio:D(s,["cum_ratio"],0),abcRank:f(s,["abc_rank"],"C")}));return{generatedAt:new Date().toISOString(),ranking:n,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function Nr(){const[e,t]=await Promise.all([V("mv_product_abc",{order:"amount.desc"}),Kt()]),n=e.map(d=>({code:f(d,["code"],""),name:f(d,["name"],""),amount:D(d,["amount"],0),quantity:D(d,["quantity"],0),ratio:D(d,["ratio"],0),cumRatio:D(d,["cum_ratio"],0),abcRank:f(d,["abc_rank"],"C")})),s=n.reduce((d,p)=>d+p.amount,0),r=new Set(n.filter(d=>d.abcRank==="A").map(d=>d.name)),l=t.salesByProduct.filter(d=>r.has(d.label));return{generatedAt:new Date().toISOString(),totalAmount:s,ranking:n,months:t.months,monthlyByProduct:l.length>0?l:t.salesByProduct}}const is={planned:"計画中",active:"仕込中",done:"完了"};async function ls(){const e=await V("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),jikomiNo:f(t,["batch_no","legacy_batch_no"],""),productName:f(t,["brand_name"],""),riceType:f(t,["rice_type"],""),plannedKg:D(t,["planned_rice_kg"],0),actualKg:D(t,["actual_rice_kg"],0),startDate:fe(t,["start_date"],""),expectedDoneDate:fe(t,["expected_done_date"],""),status:f(t,["status"],"planned"),tankNo:f(t,["tank_no"],""),note:f(t,["remarks"],"")})):[]}async function cs(){const e=await V("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),tankNo:f(t,["tank_no"],""),capacity:D(t,["capacity_l"],0),currentVolume:D(t,["current_volume_l"],0),productName:f(t,["current_product_code"],""),jikomiNo:f(t,["current_batch_id"],""),status:f(t,["status"],"empty"),lastUpdated:fe(t,["last_updated_at"],"")})):[]}async function ds(){const e=await V("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),kenteiNo:f(t,["kentei_no"],""),jikomiNo:f(t,["batch_id"],""),productName:f(t,["product_code"],""),kenteiDate:fe(t,["kentei_date"],""),alcoholDegree:D(t,["alcohol_degree"],0),extractDegree:D(t,["extract_degree"],0),sakaMeterValue:D(t,["sakemeter_value"],0),volume:D(t,["volume_l"],0),taxCategory:f(t,["tax_category_code"],""),status:f(t,["status"],"pending")})):[]}async function ba(){const e=await V("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),code:f(t,["material_code","legacy_material_code"],""),name:f(t,["name"],""),unit:f(t,["unit"],""),currentStock:D(t,["current_stock"],0),minimumStock:D(t,["minimum_stock"],0),unitCost:D(t,["unit_cost"],0),lastUpdated:fe(t,["updated_at"],"")})):[]}async function ps(){const e=await V("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),documentNo:f(t,["document_no","legacy_document_no"],""),purchaseDate:fe(t,["purchase_date"],""),supplierCode:f(t,["supplier_code","legacy_supplier_code"],""),supplierName:f(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:D(t,["total_amount"],0),status:f(t,["payment_status"],"pending")})):[]}async function us(){const e=await V("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:f(t,["supplier_code","legacy_supplier_code"],""),supplierName:f(t,["legacy_supplier_code"],""),totalPurchase:D(t,["total_purchase"],0),paidAmount:D(t,["paid_amount"],0),balance:D(t,["balance"],0),nextPaymentDate:fe(t,["next_payment_date"],""),status:f(t,["status"],"unpaid")})):[]}async function ms(){const e=await V("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),billNo:f(t,["bill_no"],""),supplierName:f(t,["counterparty_name"],""),amount:D(t,["amount"],0),issueDate:fe(t,["issue_date"],""),dueDate:fe(t,["due_date"],""),status:f(t,["status"],"holding")})):[]}async function ys(){const e=await V("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:f(t,["material_code","legacy_material_code"],""),name:f(t,["name"],""),unit:f(t,["unit"],""),currentStock:D(t,["current_stock"],0),minimumStock:D(t,["minimum_stock"],0),lastPurchaseDate:fe(t,["last_purchase_date"],""),unitCost:D(t,["unit_cost"],0)})):[]}const hs=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],wa={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Rr={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function Va(e,t){const n=await V("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const s=n[0],r=f(s,["id"],""),[l,d]=await Promise.all([V("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),V("tax_deductions",{declaration_id:`eq.${r}`})]),p=l.map(y=>({taxCategory:f(y,["tax_category_code"],""),taxCategoryName:f(y,["tax_category_name"],""),alcoholDegree:D(y,["alcohol_degree"],0),volume:D(y,["taxable_volume"],0),taxRate:D(y,["tax_rate"],0),taxAmount:D(y,["tax_amount"],0),productionVolume:D(y,["production_volume"],0),previousBalance:D(y,["previous_balance"],0),currentAdjustment:D(y,["current_adjustment"],0),exportDeduction:D(y,["export_deduction"],0),sampleDeduction:D(y,["sample_deduction"],0),taxableVolume:D(y,["taxable_volume"],0)})),u=d.map(y=>({type:f(y,["deduction_type"],"sample"),categoryCode:f(y,["tax_category_code"],""),volume:D(y,["volume"],0),reason:f(y,["reason"],""),documentNo:f(y,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:f(s,["company_name"],""),companyNo:f(s,["company_no"],""),companyAddress:f(s,["company_address"],""),companyRepresentative:f(s,["company_representative"],""),taxOffice:f(s,["tax_office"],""),rows:p,deductions:u,totalVolume:D(s,["total_taxable_volume"],0),totalTax:D(s,["total_tax_amount"],0),status:f(s,["status"],"draft"),submittedAt:f(s,["submitted_at"],"")||null}}return{...Rr,targetYear:e,targetMonth:t}}function Ae(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function fs(e){const t=e.rows.map(s=>`    <Category>
      <Code>${Ae(s.taxCategory)}</Code>
      <Name>${Ae(s.taxCategoryName)}</Name>
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
`),n=e.deductions.map(s=>`    <Deduction type="${Ae(s.type)}">
      <CategoryCode>${Ae(s.categoryCode)}</CategoryCode>
      <Volume>${s.volume}</Volume>
      <Reason>${Ae(s.reason)}</Reason>${s.documentNo?`
      <DocumentNo>${Ae(s.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${Ae(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${Ae(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${Ae(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${Ae(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${Ae(e.taxOffice)}</TaxOffice>
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
`}function Or(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function jr(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),s=e.rows.map(l=>[l.taxCategory,l.taxCategoryName,l.alcoholDegree,l.productionVolume,l.previousBalance,l.currentAdjustment,l.exportDeduction,l.sampleDeduction,l.taxableVolume,l.taxRate,l.taxAmount].map(Or).join(",")),r=`,合計,,${e.rows.reduce((l,d)=>l+d.productionVolume,0)},,,${e.rows.reduce((l,d)=>l+d.exportDeduction,0)},${e.rows.reduce((l,d)=>l+d.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...s,r].join(`
`)+`
`}function Br(e){const t=e.rows.map(r=>{const l=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),d=Math.round(l*r.taxRate);return{...r,taxableVolume:l,volume:l,taxAmount:d}}),n=t.reduce((r,l)=>r+l.taxableVolume,0),s=t.reduce((r,l)=>r+l.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:s}}async function zr(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>Z);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:fs(e),submitted_at:e.submittedAt})}async function Ya(e){const t=await V("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:f(n,["id"],""),saleDate:f(n,["sale_date"],e),saleTime:f(n,["sale_time"],""),productCode:f(n,["product_code"],""),productName:f(n,["product_name"],""),quantity:D(n,["quantity"],0),unitPrice:D(n,["unit_price"],0),amount:D(n,["amount"],0),paymentMethod:f(n,["payment_method"],"cash")})):[]}async function gs(){const e=await V("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:f(t,["id"],""),orderNo:f(t,["order_no"],""),orderDate:fe(t,["order_date"],""),customerName:f(t,["customer_name"],""),postalCode:f(t,["postal_code"],""),address:f(t,["shipping_address"],""),items:[],totalAmount:D(t,["total_amount"],0),status:f(t,["status"],"new"),shippingDate:fe(t,["shipping_date"],"")})):[]}async function Fr(e,t,n,s,r,l){const d=await Ne("store_orders",{order_no:e,order_date:new Date().toISOString().slice(0,10),channel:"mobile",customer_name:t,legacy_customer_code:n||null,total_amount:s,status:"new",remarks:r||null});if(!d)return null;const p=d.id;for(let u=0;u<l.length;u++){const y=l[u];await Ne("store_order_lines",{order_id:p,line_no:u+1,product_code:y.productCode,product_name:y.productName,quantity:y.quantity,unit_price:y.unitPrice,amount:y.amount})}return p}async function Ot(e){const t=await Ne("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function vs(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Vr(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await V("print_layouts",t)).map(s=>({id:f(s,["id"],""),name:f(s,["name"],""),templateKey:f(s,["template_key"],""),positions:s.positions??{},isDefault:ve(s,["is_default"],!1),note:f(s,["note"],""),updatedAt:f(s,["updated_at"],"")}))}async function Yr(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>Z);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},s=await t("print_layouts",n);return s?{id:f(s,["id"],e.id),name:f(s,["name"],e.name),templateKey:f(s,["template_key"],e.templateKey),positions:s.positions??e.positions,isDefault:ve(s,["is_default"],!1),note:f(s,["note"],""),updatedAt:f(s,["updated_at"],"")}:null}async function Ur(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Jr(){return(await V("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),email:f(t,["email"],""),displayName:f(t,["display_name"],""),signature:f(t,["signature"],""),replyTo:f(t,["reply_to"],""),isDefault:ve(t,["is_default"],!1),isVerified:ve(t,["is_verified"],!1),note:f(t,["note"],"")}))}async function Qr(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:f(n,["id"],e.id),name:f(n,["name"],e.name),email:f(n,["email"],e.email),displayName:f(n,["display_name"],""),signature:f(n,["signature"],""),replyTo:f(n,["reply_to"],""),isDefault:ve(n,["is_default"],!1),isVerified:ve(n,["is_verified"],!1)}:null}async function Hr(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const Ua={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},Ja={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function Kr(e){const t=`${e}-01T00:00:00Z`,[n,s]=e.split("-").map(p=>parseInt(p,10)),r=new Date(n,s,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await V("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${l})`,order:"starts_at.asc"})).map(p=>({id:f(p,["id"],""),title:f(p,["title"],""),description:f(p,["description"],""),category:f(p,["category"],"general")||"general",startsAt:f(p,["starts_at"],new Date().toISOString()),endsAt:f(p,["ends_at"],""),isAllDay:ve(p,["is_all_day"],!1),location:f(p,["location"],""),attendees:p.attendees??[],relatedCustomerCode:f(p,["related_customer_code"],""),relatedOrderId:f(p,["related_order_id"],""),color:f(p,["color"],""),googleEventId:f(p,["google_event_id"],"")}))}async function Gr(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??Ja[e.category],updated_at:new Date().toISOString()})?e:null}async function Wr(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function bs(){return(await V("integration_settings",{order:"name.asc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),provider:f(t,["provider"],""),config:t.config??{},isEnabled:ve(t,["is_enabled"],!1),lastSyncAt:f(t,["last_sync_at"],""),lastStatus:f(t,["last_status"],"")}))}async function kt(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function Xr(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const s=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(s,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const l=await r.json(),{supabaseInsert:d}=await q(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>Z);return{supabaseInsert:u}},void 0);let p=0;for(const u of l.orders){const y=`shopify_${u.id}`;await d("shopify_orders",{id:y,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),p++}return await kt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得成功`}),{count:p}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function Zr(){return(await V("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:f(t,["id"],""),shopifyOrderId:f(t,["shopify_order_id"],""),orderNumber:f(t,["order_number"],""),orderDate:f(t,["order_date"],""),customerName:f(t,["customer_name"],""),customerEmail:f(t,["customer_email"],""),totalAmount:ie(t.total_amount),financialStatus:f(t,["financial_status"],""),fulfillmentStatus:f(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function ei(e){const t=e.config.refresh_token,n=e.config.client_id,s=e.config.client_secret;if(!t||!n||!s)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:s})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const d=(await r.json()).access_token;return await kt({...e,config:{...e.config,oauth_token:d}}),e.config.oauth_token=d,{token:d}}async function ti(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const s=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),l=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${s}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let d=await fetch(l,{headers:{Authorization:`Bearer ${t}`}});if(d.status===401){const v=await ei(e);if(v.error)return{count:0,error:v.error};t=v.token,d=await fetch(l,{headers:{Authorization:`Bearer ${t}`}})}if(!d.ok)return{count:0,error:`HTTP ${d.status}`};const p=await d.json(),{supabaseInsert:u}=await q(async()=>{const{supabaseInsert:v}=await Promise.resolve().then(()=>Z);return{supabaseInsert:v}},void 0);let y=0;for(const v of p.items){const g=`gcal_${v.id}`,w=v.start?.dateTime??v.start?.date??"",P=v.end?.dateTime??v.end?.date??"";await u("calendar_events",{id:g,title:String(v.summary??"(無題)"),description:String(v.description??""),category:"general",starts_at:String(w),ends_at:String(P),location:String(v.location??""),google_event_id:String(v.id??""),updated_at:new Date().toISOString()}),y++}return await kt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${y}件取得`}),{count:y}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function ai(){return(await V("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:f(t,["id"],""),receivedAt:f(t,["received_at"],""),senderPhone:f(t,["sender_phone"],""),senderName:f(t,["sender_name"],""),imageUrl:f(t,["image_url"],""),ocrStatus:f(t,["ocr_status"],"pending")||"pending",ocrText:f(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:f(t,["linked_invoice_id"],"")}))}async function ni(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const s=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(s){return{text:"",error:s instanceof Error?s.message:String(s)}}}async function si(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Ft={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},Vt={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function oi(){return(await V("user_profiles",{order:"display_name.asc"})).map(t=>({id:f(t,["id"],""),email:f(t,["email"],""),displayName:f(t,["display_name"],""),staffCode:f(t,["staff_code"],""),department:f(t,["department"],"all")||"all",role:f(t,["role"],"staff")||"staff",defaultMailSenderId:f(t,["default_mail_sender_id"],""),phone:f(t,["phone"],""),avatarUrl:f(t,["avatar_url"],""),isActive:ve(t,["is_active"],!0),lastSignInAt:f(t,["last_sign_in_at"],""),createdAt:f(t,["created_at"],"")}))}async function ri(e){if(!e)return null;const t=await V("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:f(n,["id"],""),email:f(n,["email"],""),displayName:f(n,["display_name"],""),staffCode:f(n,["staff_code"],""),department:f(n,["department"],"all")||"all",role:f(n,["role"],"staff")||"staff",defaultMailSenderId:f(n,["default_mail_sender_id"],""),phone:f(n,["phone"],""),avatarUrl:f(n,["avatar_url"],""),isActive:ve(n,["is_active"],!0),lastSignInAt:f(n,["last_sign_in_at"],"")}}async function ii(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function li(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ci(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>Z);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function di(e=100){return(await V("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:f(n,["id"],""),action:f(n,["action"],""),entityType:f(n,["entity_type"],""),entityId:f(n,["entity_id"],""),userEmail:f(n,["user_email"],""),changes:n.changes??{},createdAt:f(n,["created_at"],"")}))}const Yt={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function ws(){return(await V("slack_notifications",{order:"event_type.asc"})).map(t=>({id:f(t,["id"],""),eventType:f(t,["event_type"],"new_order"),enabled:ve(t,["enabled"],!0),channel:f(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:f(t,["last_triggered_at"],"")}))}async function pi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function ui(e=50){return(await V("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:f(n,["id"],""),eventType:f(n,["event_type"],""),channel:f(n,["channel"],""),message:f(n,["message"],""),status:f(n,["status"],"sent"),error:f(n,["error"],""),sentAt:f(n,["sent_at"],"")}))}async function mi(e,t,n){const r=(await bs()).find(y=>y.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const l=r.config.webhook_url;if(!l)return{ok:!1,error:"Webhook URL未設定"};const p=(await ws()).find(y=>y.eventType===e&&y.enabled);if(!p)return{ok:!1,error:"通知ルールが無効"};const u=n??p.channel??r.config.default_channel??"#general";try{const y=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${Yt[e]} ${t}`,channel:u})}),v=y.ok,{supabaseInsert:g}=await q(async()=>{const{supabaseInsert:w}=await Promise.resolve().then(()=>Z);return{supabaseInsert:w}},void 0);return await g("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:v?"sent":"failed",error:v?null:`HTTP ${y.status}`}),v?{ok:!0}:{ok:!1,error:`HTTP ${y.status}`}}catch(y){return{ok:!1,error:y instanceof Error?y.message:String(y)}}}const Gt={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},Qa={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function yi(){return(await V("prospects",{order:"updated_at.desc"})).map(t=>({id:f(t,["id"],""),companyName:f(t,["company_name"],""),contactName:f(t,["contact_name"],""),email:f(t,["email"],""),phone:f(t,["phone"],""),address:f(t,["address"],""),website:f(t,["website"],""),businessType:f(t,["business_type"],""),stage:f(t,["stage"],"cold"),source:f(t,["source"],""),expectedAmount:ie(t.expected_amount),probability:ie(t.probability),assignedStaffCode:f(t,["assigned_staff_code"],""),nextActionDate:f(t,["next_action_date"],""),nextAction:f(t,["next_action"],""),note:f(t,["note"],""),lastContactAt:f(t,["last_contact_at"],""),wonAt:f(t,["won_at"],""),lostAt:f(t,["lost_at"],""),lostReason:f(t,["lost_reason"],""),convertedCustomerCode:f(t,["converted_customer_code"],""),createdAt:f(t,["created_at"],"")}))}async function xs(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0),n=await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()});return n?{...e,id:f(n,["id"],e.id)}:null}async function hi(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);try{const s=new URL("/rest/v1/prospects",t);return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function fi(e){return(await V("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:f(n,["id"],""),prospectId:f(n,["prospect_id"],""),activityType:f(n,["activity_type"],"call"),title:f(n,["title"],""),description:f(n,["description"],""),activityDate:f(n,["activity_date"],""),result:f(n,["result"],""),staffCode:f(n,["staff_code"],"")}))}async function gi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const $s=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function vi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function bi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function wi(){return(await ge("v_customer_map")).filter(t=>t.lat&&t.lng).map(t=>({customerCode:f(t,["customer_code"],""),name:f(t,["name"],""),phone:f(t,["phone"],""),areaCode:f(t,["area_code"],""),businessType:f(t,["business_type"],""),businessTypeName:f(t,["business_type_name"],""),address1:f(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:ve(t,["is_at_risk"],!1),isDormant:ve(t,["is_dormant"],!1),amount12m:D(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}const Wt=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function xi(){return(await ge("customer_churn_notes")).map(t=>({customerCode:f(t,["customer_code"],""),reason:f(t,["reason"],""),memo:f(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:f(t,["updated_at"],"")}))}async function $i(e){const{supabaseUpsert:t}=await q(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>Z);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function _i(){return(await V("delivery_locations",{order:"name.asc"})).map(t=>({id:f(t,["id"],""),customerCode:f(t,["customer_code"],""),name:f(t,["name"],""),postalCode:f(t,["postal_code"],""),address:f(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:f(t,["contact_name"],""),phone:f(t,["phone"],""),deliveryNote:f(t,["delivery_note"],""),isActive:ve(t,["is_active"],!0)}))}async function Si(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function ki(e=50){return(await V("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:f(n,["id"],""),callDirection:f(n,["call_direction"],"inbound"),fromNumber:f(n,["from_number"],""),toNumber:f(n,["to_number"],""),matchedCustomerCode:f(n,["matched_customer_code"],""),matchedProspectId:f(n,["matched_prospect_id"],""),durationSeconds:ie(n.duration_seconds),callStatus:f(n,["call_status"],"answered"),recordingUrl:f(n,["recording_url"],""),transcript:f(n,["transcript"],""),ivryCallId:f(n,["ivry_call_id"],""),startedAt:f(n,["started_at"],""),endedAt:f(n,["ended_at"],""),notes:f(n,["notes"],"")}))}async function _s(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function Pi(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const s=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(s,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const d=(await r.json()).calls??[];let p=0;for(const u of d)await _s({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),p++;return await kt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得`}),{count:p}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function Ei(e,t){const n=e.config.api_key,s=e.config.team_id;if(!n||!s)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const l of t){if(!l.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${s}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:l.name,phone_number:l.phone,external_id:l.customerCode??"",note:l.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function Ai(){return(await V("lead_lists",{order:"created_at.desc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),query:f(t,["query"],""),area:f(t,["area"],""),businessType:f(t,["business_type"],""),totalCount:ie(t.total_count),source:f(t,["source"],"manual"),createdAt:f(t,["created_at"],"")}))}async function Li(e){return(await V("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:f(n,["id"],""),listId:f(n,["list_id"],""),companyName:f(n,["company_name"],""),address:f(n,["address"],""),phone:f(n,["phone"],""),website:f(n,["website"],""),email:f(n,["email"],""),businessType:f(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:ie(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:f(n,["place_id"],""),status:f(n,["status"],"new"),convertedProspectId:f(n,["converted_prospect_id"],""),note:f(n,["note"],"")}))}async function Ci(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function Ss(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function Di(e,t,n){const s=e.config.api_key;if(!s)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),l=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${s}`;try{const d=await fetch(l);if(!d.ok)return{results:[],error:`HTTP ${d.status}`};const p=await d.json();return p.status!=="OK"&&p.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${p.status}`}:{results:p.results.map(y=>{const v=y.geometry?.location;return{id:`place_${y.place_id}`,listId:"",companyName:String(y.name??""),address:String(y.formatted_address??""),rating:y.rating?Number(y.rating):void 0,reviewCount:y.user_ratings_total?Number(y.user_ratings_total):void 0,lat:v?.lat,lng:v?.lng,placeId:String(y.place_id??""),status:"new"}})}}catch(d){return{results:[],error:d instanceof Error?d.message:String(d)}}}async function qi(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await xs(t);return n&&await Ss({...e,status:"imported",convertedProspectId:t.id}),n}async function Ii(){return(await V("workflow_orders",{order:"order_date.desc"})).map(t=>({id:f(t,["id"],""),orderNo:f(t,["order_no"],""),customerName:f(t,["customer_name"],""),customerCode:f(t,["customer_code"],""),orderDate:f(t,["order_date"],""),deliveryDate:f(t,["delivery_date"],""),stage:f(t,["stage"],"new"),totalAmount:ie(t.total_amount),itemCount:ie(t.item_count),priority:f(t,["priority"],"normal"),staffName:f(t,["staff_name"],""),notes:f(t,["notes"],"")}))}async function Ti(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function Mi(){return(await V("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),email:f(t,["email"],""),phone:f(t,["phone"],""),visitDate:f(t,["visit_date"],""),partySize:ie(t.party_size)||1,language:f(t,["language"],"ja"),purpose:f(t,["purpose"],""),message:f(t,["message"],""),status:f(t,["status"],"new"),repliedAt:f(t,["replied_at"],""),confirmedTime:f(t,["confirmed_time"],""),createdAt:f(t,["created_at"],new Date().toISOString())}))}async function Ni(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Z);return{supabaseInsert:s}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const Ri=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function ks(){return(await Promise.all(Ri.map(async t=>{const[n,s]=await Promise.all([Ta(t.table),V(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:s[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function jt(e,t,n=100){const s=(t-1)*n,[r,l]=await Promise.all([V(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(s)}),Ta(e)]);return{records:r,total:l}}async function xa(e){const t=await V("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const s=JSON.parse(n);return String(s.price_group??"")}catch{return""}return""}async function Ps(e,t){if(e){const s=await V("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(s.length>0&&s[0].special_price)return ie(s[0].special_price)}const n=await V("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?ie(n[0].default_sale_price):0}const Oi=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],ji=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],Bi={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function zi(){const e=new Date,t=[];for(let u=11;u>=0;u--){const y=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`)}const n=Oi,s={},r={};for(const u of n){s[u.code]={};for(const y of t){const v=parseInt(y.split("-")[1])-1,g=Bi[u.code]??100,w=Math.round(g*ji[v]*(.85+Math.random()*.3));s[u.code][y]=w,r[y]=(r[y]??0)+w}}const l={},d={},p={};for(const u of n){const y=t.map(w=>s[u.code][w]??0),v=y.reduce((w,P)=>w+P,0)/y.length,g=y.reduce((w,P)=>w+(P-v)**2,0)/y.length;l[u.code]=y.reduce((w,P)=>w+P,0),d[u.code]=v,p[u.code]=Math.sqrt(g)}return{months:t,products:n,matrix:s,totals:r,productTotals:l,productAvg:d,productStdDev:p}}async function Fi(e=36){const t=(()=>{const w=new Date;return w.setMonth(w.getMonth()-e),`${w.getFullYear()}-${String(w.getMonth()+1).padStart(2,"0")}`})(),n=await ge("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"});if(n.length===0)return zi();const s=new Set,r=new Map,l={},d={};for(const w of n){const P=f(w,["year_month"],""),A=f(w,["product_code"],""),R=f(w,["product_name"],A),o=D(w,["quantity"],0);!P||!A||(s.add(P),r.set(A,R),l[A]||(l[A]={}),l[A][P]=o,d[P]=(d[P]??0)+o)}const p=[...s].sort(),u=[...r.entries()].map(([w,P])=>({code:w,name:P})),y={},v={},g={};for(const w of u){const P=p.map(o=>l[w.code]?.[o]??0),A=P.reduce((o,i)=>o+i,0)/(P.length||1),R=P.reduce((o,i)=>o+(i-A)**2,0)/(P.length||1);y[w.code]=P.reduce((o,i)=>o+i,0),v[w.code]=A,g[w.code]=Math.sqrt(R)}return{months:p,products:u,matrix:l,totals:d,productTotals:y,productAvg:v,productStdDev:g}}async function Vi(){return(await V("product_safety_stock_params",{order:"product_code.asc"})).map(t=>({productCode:f(t,["product_code"],""),productName:f(t,["product_name"],""),unit:f(t,["unit"],"本"),avgMonthlyDemand:D(t,["avg_monthly_demand"],0),demandStdDev:D(t,["demand_std_dev"],0),leadTimeDays:D(t,["lead_time_days"],30),serviceLevel:D(t,["service_level"],.95),safetyStockQty:D(t,["safety_stock_qty"],0),reorderPoint:D(t,["reorder_point"],0),memo:f(t,["memo"],""),productionType:f(t,["production_type"],"monthly")}))}async function Yi(e){return(await V("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:f(n,["id"],""),yearMonth:f(n,["year_month"],e),productCode:f(n,["product_code"],""),productName:f(n,["product_name"],""),demandForecast:D(n,["demand_forecast"],0),safetyStockTarget:D(n,["safety_stock_target"],0),openingStock:D(n,["opening_stock"],0),requiredProduction:D(n,["required_production"],0),plannedQty:D(n,["planned_qty"],0),actualQty:D(n,["actual_qty"],0),status:f(n,["status"],"draft"),productionType:f(n,["production_type"],"monthly"),notes:f(n,["notes"],"")}))}async function Ui(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n||e.length===0)return!1;try{const s=e.map(d=>({product_code:d.productCode,product_name:d.productName,unit:d.unit,avg_monthly_demand:d.avgMonthlyDemand,demand_std_dev:d.demandStdDev,lead_time_days:d.leadTimeDays,service_level:d.serviceLevel,safety_stock_qty:d.safetyStockQty,reorder_point:d.reorderPoint,production_type:d.productionType,memo:d.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),r=new URL("/rest/v1/product_safety_stock_params",t),l=await fetch(r.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(s)});if(!l.ok){const d=await l.text();return console.error("saveSafetyStockParamsBulk failed:",l.status,d),!1}return!0}catch(s){return console.error("saveSafetyStockParamsBulk error:",s),!1}}async function Ji(e){const{supabaseUpsert:t}=await q(async()=>{const{supabaseUpsert:s}=await Promise.resolve().then(()=>Z);return{supabaseUpsert:s}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function Qi(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}async function Hi(e){const[t,n]=e.split("-").map(Number),s=`${e}-01`,r=new Date(t,n,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}`,d=await ge("sales_document_headers",{select:"sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${s},sales_date.lte.${l})`,order:"sales_date.asc"}),p=await ge("customers",{select:"id,address1",address1:"not.is.null"}),u={};for(const v of p)v.address1&&(u[v.id]=Qi(v.address1));const y={};for(const v of d){const g=v.sales_date;if(!g)continue;const w=u[v.legacy_customer_code]||"住所未登録",P=Number(v.total_amount)||0;y[g]||(y[g]={date:g,entries:[],cityGroups:[],totalAmount:0,count:0}),y[g].entries.push({customerCode:v.legacy_customer_code||"",customerName:v.customer_name||"",city:w,amount:P}),y[g].totalAmount+=P,y[g].count++}for(const v of Object.values(y)){const g={};for(const w of v.entries)g[w.city]=(g[w.city]||0)+1;v.cityGroups=Object.entries(g).sort((w,P)=>P[1]-w[1]).map(([w,P])=>({city:w,count:P}))}return y}async function Ha(){return V("quotes",{select:"id,quote_no,quote_date,valid_until,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function Es(e){const t=await V("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await V("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function Ki(){const e=new Date().toISOString().slice(0,7)+"-01";return ge("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}const N=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:Ja,CALENDAR_CATEGORY_LABELS:Ua,CHURN_REASONS:Wt,DEPT_LABELS:Vt,INVOICE_TYPE_LABELS:ga,JIKOMI_STATUS_LABELS:is,MATERIAL_CATEGORIES:$s,PROSPECT_STAGE_COLORS:Qa,PROSPECT_STAGE_LABELS:Gt,ROLE_LABELS:Ft,SEASONAL_TEMPLATES:Na,SLACK_EVENT_LABELS:Yt,TAX_DEDUCTION_LABELS:wa,TAX_RATE_CATEGORIES:hs,addBrewingCustomCategory:vr,addBrewingStockEntry:yr,addRiceVariety:dr,convertLeadToProspect:qi,createBrewingBatch:nr,deleteBrewingCustomCategory:wr,deleteBrewingStockEntry:fr,deleteCalendarEvent:Wr,deleteMailSender:Hr,deleteMaterial:bi,deletePrintLayout:Ur,deleteProspect:hi,deleteRicePurchaseCommitment:lr,deleteRiceVariety:pr,deleteUserProfile:li,fetchAllBrewingStockEntries:mr,fetchAnalyticsByPeriod:ko,fetchAnnouncements:ts,fetchAuditLogs:di,fetchAvailablePeriods:Po,fetchAvailableProductionTypes:Yo,fetchBillList:ms,fetchBillingSummary:za,fetchBrewingAlcoholSettings:Uo,fetchBrewingBatches:tr,fetchBrewingCategoryOverrides:$r,fetchBrewingCustomCategories:gr,fetchBrewingForecastOverrides:Ho,fetchBrewingMonthlyTrend:No,fetchBrewingPlanSummary:Mo,fetchBrewingProcessSteps:ar,fetchBrewingProductDetail:Ro,fetchBrewingRiceParams:Go,fetchBrewingSchedule:Oo,fetchBrewingSeasonalPattern:Xo,fetchBrewingStockEntries:ur,fetchBrewingYearlyShipments:Qo,fetchCalendarEvents:Kr,fetchCallLogs:ki,fetchCategoryTypeLinks:zo,fetchChurnAlerts:Cr,fetchChurnNotes:xi,fetchCustomerAnalysis:rs,fetchCustomerEfficiency:Mr,fetchCustomerEfficiencyByYear:vt,fetchCustomerLedger:Oa,fetchCustomerPriceGroup:xa,fetchCustomerPricing:va,fetchCustomerProductBreakdown:qo,fetchDeliveryLocations:_i,fetchDeliveryNote:Ba,fetchDeliverySchedule:Lr,fetchDemandAnalysis:Fi,fetchDemandForecasts:Ar,fetchEntityMonthlySales:To,fetchFaxInbox:ai,fetchIntegrationSettings:bs,fetchInvoices:$t,fetchJikomiList:ls,fetchKenteiList:ds,fetchLabelExclusions:_r,fetchLeadItems:Li,fetchLeadLists:Ai,fetchMailSenders:Jr,fetchMapCustomers:wi,fetchMasterStats:Ra,fetchMaterialList:ba,fetchMyProfile:ri,fetchOrderHeaders:Ki,fetchPayableList:us,fetchPaymentStatus:Kn,fetchPeriodChartData:Co,fetchPipelineMeta:Gn,fetchPrintLayouts:Vr,fetchProcurementDecisions:Zo,fetchProductABC:Nr,fetchProductCustomerBreakdown:Io,fetchProductDaily:Tr,fetchProductMonthlyShipments:Er,fetchProductPower:os,fetchProductPrice:Ps,fetchProductShipmentsFromTable:Ir,fetchProductionPlan:Yi,fetchProspectActivities:fi,fetchProspects:yi,fetchPurchaseList:ps,fetchQuoteList:Ha,fetchQuoteWithLines:Es,fetchRawMaterialStock:ys,fetchRawRecords:jt,fetchRawTableList:ks,fetchRicePurchaseCommitments:rr,fetchRiceVarieties:cr,fetchSafetyStockParams:Vi,fetchSalesAnalytics:ja,fetchSalesReport:Kt,fetchSalesSummary:Hn,fetchSeasonalProfiles:qr,fetchShipmentCalendar:Hi,fetchShopifyOrders:Zr,fetchSlackLogs:ui,fetchSlackRules:ws,fetchStaffCustomerBreakdown:Ao,fetchStaffProductBreakdown:Lo,fetchStaffTotalsByPeriod:Eo,fetchStoreOrders:gs,fetchStoreSales:Ya,fetchSyncDashboard:Wn,fetchSystemSetting:Qn,fetchTankList:cs,fetchTaxDeclaration:Va,fetchTourInquiriesFromDb:Mi,fetchTypesInCategory:br,fetchUserProfiles:oi,fetchVisitPriorities:Dr,fetchWorkflowOrdersFromDb:Ii,generateTaxCSV:jr,generateTaxXML:fs,linkTypeToCategory:Fo,ocrFaxImage:ni,periodToDateRange:Xn,prevYearFilter:Do,reassignBrewingStockEntry:hr,recalculateTaxDeclaration:Br,recordAudit:ci,resolveProductPrice:Fa,saveBrewingAlcoholSetting:Jo,saveBrewingForecastOverride:Ko,saveBrewingRiceParams:Wo,saveBrewingSchedule:jo,saveCalendarEvent:Gr,saveCallLog:_s,saveChurnNote:$i,saveDeliveryLocation:Si,saveEmailCampaign:Ot,saveFaxRecord:si,saveIntegrationSetting:kt,saveInvoice:es,saveLabelExclusions:Sr,saveLeadItem:Ss,saveLeadList:Ci,saveMailSender:Qr,saveMaterial:vi,savePrintLayout:Yr,saveProcurementDecision:er,saveProductionPlan:Ji,saveProspect:xs,saveProspectActivity:gi,saveRicePurchaseCommitment:ir,saveSafetyStockParamsBulk:Ui,saveSlackRule:pi,saveStoreOrder:Fr,saveTaxDeclaration:zr,saveTourInquiry:Ni,saveUserProfile:ii,saveWorkflowOrder:Ti,searchPlaces:Di,sendEmailCampaign:vs,sendSlackNotification:mi,setBrewingCategoryOverride:xr,submitFeatureRequest:as,syncGoogleCalendar:ti,syncIvryCallLogs:Pi,syncPhoneBookToIvry:Ei,syncShopifyOrders:Xr,unlinkTypeFromCategory:Vo,updateBrewingBatch:or,updateBrewingProcessStep:sr,updateCustomer:ns,updateProduct:ss,upsertBrewingStock:Bo,upsertSystemSetting:at},Symbol.toStringTag,{value:"Module"}));function We(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Gi={open:"未締め",closed:"締め済"};function Wi(e,t){const n=e.customers.map(s=>`
      <tr>
        <td>
          <div class="table-title">${s.customerName}</div>
          <div class="table-sub mono">${s.customerCode}</div>
        </td>
        <td class="numeric">${s.closingDay}日</td>
        <td class="numeric">${We(s.salesAmount)}</td>
        <td class="numeric">${We(s.taxAmount)}</td>
        <td class="numeric">${We(s.prevBalance)}</td>
        <td class="numeric">${We(s.paymentAmount)}</td>
        <td class="numeric"><strong>${We(s.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${Gi[s.status]}</span>
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
        <p class="kpi-value">${We(e.totalBilling)}</p>
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
  `}const Xi={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},Zi={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function ln(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Et(e){const t=Zi[e],n=Xi[e].map(s=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${ln(s.title)}</p>
            <p class="category-card-description">${ln(s.description)}</p>
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
  `}function As(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function bt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function el(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${As(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${bt(t.amount)}</td>
        </tr>
      `).join("")}function tl(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${As(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${bt(t.amount)}</td>
        </tr>
      `).join("")}function al(e,t){return`
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
            <dd>${bt(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${bt(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${bt(e.balanceAmount)}</dd>
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
            <tbody>${el(e)}</tbody>
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
            <tbody>${tl(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function ct(e,t,n){const s=e.findIndex(l=>l.column===t);if(s>=0){if(e[s].direction==="asc"){const d=[...e];return d[s]={column:t,direction:"desc"},d}return e.filter((d,p)=>p!==s)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function nl(e,t){const n=e.findIndex(l=>l.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const s=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${s}${r}</span>`}function ee(e,t,n,s=""){return`<th class="sortable ${s}" data-sort-col="${e}">${t} ${nl(n,e)}</th>`}function cn(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function ot(e,t,n){return t.length===0?e:[...e].sort((s,r)=>{for(const{column:l,direction:d}of t){const p=n[l];if(!p)continue;const u=cn(s[p]),y=cn(r[p]);let v=0;if(typeof u=="number"&&typeof y=="number"?v=u-y:v=String(u).localeCompare(String(y),"ja"),v!==0)return d==="asc"?v:-v}return 0})}const sl={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},dn={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},dt={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function ol(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function rl(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function il(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function Ls(e,t){const n=rl(t),s=il(t),[r,l]=t.split("-").map(Number),d=new Map;e.forEach(h=>{if(h.date.slice(0,7)===t){const b=h.date.slice(0,10);d.has(b)||d.set(b,[]),d.get(b).push(h)}});const p=e.filter(h=>h.date.slice(0,7)===t),u=p.reduce((h,b)=>h+b.quantity,0),y=new Set(p.map(h=>h.date)).size,v=new Date().toISOString().slice(0,10),g=["日","月","火","水","木","金","土"].map(h=>`<th class="dcal-header">${h}</th>`).join("");let w="",P=1;for(let h=0;h<6&&!(P>n&&h>0);h++){w+="<tr>";for(let b=0;b<7;b++)if(h===0&&b<s||P>n)w+='<td class="dcal-cell dcal-empty"></td>';else{const x=`${r}-${String(l).padStart(2,"0")}-${String(P).padStart(2,"0")}`,$=d.get(x)||[],E=x===v,k=$.reduce((S,C)=>S+C.quantity,0);w+=`
          <td class="dcal-cell ${E?"dcal-today":""}">
            <div class="dcal-day">${P}</div>
            ${$.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${$[0].status}">${$.length}件 ${k}本</div>
              </div>
            `:""}
          </td>`,P++}w+="</tr>"}const[A,R]=l===1?[r-1,12]:[r,l-1],[o,i]=l===12?[r+1,1]:[r,l+1],c=`${A}-${String(R).padStart(2,"0")}`,m=`${o}-${String(i).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${l}月: ${y}日稼働 / ${p.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${c}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${r}年${l}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${m}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${g}</tr></thead>
        <tbody>${w}</tbody>
      </table>
    </section>
  `}function ll(e,t){const n=t==="all"?e:e.filter(p=>p.segment===t),s={all:e.length};e.forEach(p=>{s[p.segment]=(s[p.segment]??0)+1});const l=["all",...[...new Set(e.map(p=>p.segment))]].map(p=>`
      <button class="button ${t===p?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${p}">
        ${p==="all"?"全て":dn[p]??p} (${s[p]??0})
      </button>
    `).join(""),d=n.map(p=>`
      <tr>
        <td class="mono">${p.code}</td>
        <td>${p.name}</td>
        <td><span class="segment-badge" style="background:${dt[p.segment]??"#718096"};">${dn[p.segment]??p.segment}</span></td>
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
            <li><span class="segment-badge" style="background:${dt.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${dt["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${dt["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${dt["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
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
          <tbody>${d}</tbody>
        </table>
      </div>
    </section>
  `}function cl(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${Ls(e.deliveries,e.calendarMonth)}
    ${ll(e.forecasts,e.selectedSegment)}
  `}function dl(e,t){return Ls(e,t)}const At={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function pn(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function ta(e,t,n){if(t==="all")return e;const s=new Date,r=s.toISOString().slice(0,10),l=new Date(s);switch(t){case"today":return e.filter(d=>d.date.slice(0,10)===r);case"month":return e.filter(d=>d.date.slice(0,7)===r.slice(0,7));case"future":{const d=new Date(s.getFullYear(),s.getMonth(),1).toISOString().slice(0,10);return e.filter(p=>p.date.slice(0,10)>=d)}case"90days":return l.setDate(l.getDate()-90),e.filter(d=>d.date>=l.toISOString());case"year":return l.setFullYear(l.getFullYear()-1),e.filter(d=>d.date>=l.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(d=>{const p=d.date.slice(0,10);return p>=n.start&&p<=n.end})}}function ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function aa(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function pl(e){const s={top:20,right:20,bottom:30,left:50},r=760-s.left-s.right,l=260-s.top-s.bottom,d=Math.max(...e.map(v=>v.amount),1),p=r/e.length,u=e.map((v,g)=>{const w=v.amount/d*l,P=s.left+g*p+4,A=s.top+l-w,R=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(v.date));return`
        <g>
          <rect x="${P}" y="${A}" width="${Math.max(p-8,8)}" height="${w}" rx="4" fill="#0F5B8D" opacity="${.58+g/e.length*.34}" />
          ${g%5===0?`<text x="${P+6}" y="252" class="chart-axis">${R}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(v=>{const g=s.top+l-l*v,w=Math.round(d*v/1e3);return`
        <g>
          <line x1="${s.left}" y1="${g}" x2="${760-s.right}" y2="${g}" class="chart-grid" />
          <text x="6" y="${g+4}" class="chart-axis">${w.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function ul(e,t,n,s,r="month",l,d=[]){const p={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=ta(e.allDailySales,r,l),y=u.reduce((B,U)=>B+U.amount,0),v=u.reduce((B,U)=>B+U.bottles,0),g=u.reduce((B,U)=>B+U.volumeMl,0),w=u.length,P=v>0?Math.round(y/v):0,A=g>0?Math.round(y/(g/1e3)):0,R=new Date,o=R.toISOString().slice(0,10),i=o.slice(0,7),c=ta(e.allDailySales,"month").filter(B=>B.date.slice(0,10)<=o),m=c.reduce((B,U)=>B+U.amount,0);c.reduce((B,U)=>B+U.bottles,0);const h=R.getDate();new Date(R.getFullYear(),R.getMonth()+1,0).getDate();const x=(s?.orderHeaders??[]).filter(B=>B.sales_date.slice(0,7)===i),$=x.reduce((B,U)=>B+Number(U.total_amount),0),E=x.length,k=ta(e.allDailySales,"month"),S=k.reduce((B,U)=>B+U.bottles,0),C=$>0?$:k.reduce((B,U)=>B+U.amount,0),L=$>0?"orders":"extrapolation",T=(u.length>0?e.allDailySales.filter(B=>{const U=u[0]?.date??"",J=u[u.length-1]?.date??"",H=pn(U,-1),K=pn(J,-1);return B.date>=H&&B.date<=K}):[]).reduce((B,U)=>B+U.amount,0),j=T>0?(y-T)/T*100:0,M=j>0?"+":"",z=e.salesRecords.slice(0,10).map(B=>`
            <tr>
              <td class="mono">${B.documentNo}</td>
              <td>${aa(B.date)}</td>
              <td>${B.customerName}</td>
              <td class="numeric">${ke(B.amount)}</td>
            </tr>
          `).join(""),F=["today","month","future","90days","year","all"].map(B=>`<button class="button ${B===r?"primary":"secondary"} small" type="button" data-period="${B}">${At[B]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${p[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${aa(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${F}</div>
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
        <p class="kpi-value">${ke(e.kpis.todaySales)}</p>
        <p class="kpi-sub">${e.kpis.todaySales>0?`${new Date().getMonth()+1}/${new Date().getDate()} 時点`:"本日データなし"}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月実績（本日まで）</p>
        <p class="kpi-value">${ke(m)}</p>
        <p class="kpi-sub">${h}日経過 / ${c.length}営業日 / 日平均 ${c.length>0?ke(Math.round(m/c.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${ke(C)}</p>
        <p class="kpi-sub">${L==="orders"?`受注確定 ${E}件`:`出荷見込 ${S.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${j>=0?"#2f855a":"#c53d3d"}">${T>0?`${M}${j.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${T>0?ke(T):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${ke(e.kpis.unpaidAmount)}</p>
      </article>
    </section>

    ${r!=="month"?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">${At[r]}売上</p>
        <p class="kpi-value">${ke(y)}</p>
        <p class="kpi-sub">${w}日間${w>0?` / 日平均 ${ke(Math.round(y/w))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${v.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${ke(P)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(g/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${ke(A)}</p>
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
            <p class="panel-caption">${At[r]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${pl(u.length>0?u:e.dailySales)}
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
              <dd>${aa(t.lastSyncAt)}</dd>
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
          <tbody>${z}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${At[r]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ee("date","日付",d)}
              ${ee("amount","売上",d,"numeric")}
              ${ee("bottles","本数",d,"numeric")}
              ${ee("volumeMl","液体量(L)",d,"numeric")}
              ${ee("pricePerBottle","本単価",d,"numeric")}
              ${ee("pricePerLiter","L単価",d,"numeric")}
            </tr>
          </thead>
          <tbody>${ot(d.length>0?u:u.slice().reverse(),d,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(B=>`
            <tr>
              <td class="mono">${B.date.slice(0,10)}</td>
              <td class="numeric">${ke(B.amount)}</td>
              <td class="numeric">${B.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(B.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${ke(B.pricePerBottle)}</td>
              <td class="numeric">${ke(B.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${s?ml(s):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function ml(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(p=>p.startsAt.slice(0,10)>=t).slice(0,5),s=e.tourInquiries.filter(p=>p.status==="new").length,r=e.churnSummary,l=r?r.atRiskCount+r.dormantCount+r.decliningCount:null,d=r?`<article class="panel kpi-card ${r.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
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
      ${d}
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
        ${n.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${n.map(p=>{const u=new Date(p.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${p.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${u.getMonth()+1}/${u.getDate()} ${p.isAllDay?"終日":u.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${p.title}</div>
                  ${p.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${p.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>

    ${e.deliveries&&e.deliveries.length>0?dl(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?yl(e.orderHeaders):""}
  `}function yl(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),s=new Date().toISOString().slice(0,10),r=s.slice(0,7),l=new Map;for(const g of e){const w=g.sales_date.slice(0,7),P=l.get(w)??{count:0,total:0};l.set(w,{count:P.count+1,total:P.total+Number(g.total_amount)})}const d=[...l.keys()].sort(),p=e.reduce((g,w)=>g+Number(w.total_amount),0),u=d.map(g=>{const{count:w,total:P}=l.get(g);return`<tr>
      <td class="mono" style="font-weight:700;">${g===r?`${g}（当月）`:g}</td>
      <td class="numeric">${w.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(P)}</td>
    </tr>`}).join(""),y=e.filter(g=>g.sales_date>=s).slice(0,30),v=y.map(g=>`<tr>
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
          <tbody>${v}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function hl(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function Xe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function fl(e,t){const n=e.lines.length?e.lines.map((r,l)=>`
          <tr>
            <td class="numeric">${l+1}</td>
            <td class="mono">${r.productCode}</td>
            <td>${r.productName}</td>
            <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
            <td>${r.unit}</td>
            <td class="numeric">${Xe(r.unitPrice)}</td>
            <td class="numeric">${Xe(r.amount)}</td>
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
            <tr><th>納品日</th><td>${hl(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${Xe(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${Xe(s)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${Xe(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${Xe(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function Ce(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function gl(e){return Ce(e).replaceAll(`
`,"<br />")}function vl(e){const n=[...Object.values(Na),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${Ce(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),s=e.previewRecipients.length?e.previewRecipients.map(r=>`
            <li>
              <span>${Ce(r.name)}</span>
              <span class="table-sub">${Ce(r.email)} / ${Ce(r.area)}</span>
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
          <input id="email-subject" type="text" value="${Ce(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${Ce(e.body)}</textarea>
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
            ${e.senders.map(r=>`<option value="${r.id}" ${r.id===e.senderId?"selected":""}>${Ce(r.name)} &lt;${Ce(r.email)}&gt;${r.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${Ce(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?gl(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${Ce(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function Le(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Lt(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function bl(e,t){const n=[Lt("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Le(r.name)}</strong>
            <span class="table-sub mono">${Le(r.code)}</span>
          </button>
        `)),Lt("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Le(r.name)}</strong>
            <span class="table-sub mono">${Le(r.code)}</span>
          </button>
        `)),Lt("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${Le(r.documentNo)}</strong>
            <span class="table-sub">${Le(r.customerName)} / ${Le(r.date)}</span>
          </button>
        `)),Lt("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${Le(r.path)}"
          >
            <strong>${Le(r.title)}</strong>
            <span class="table-sub mono">${Le(r.path)}</span>
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
            value="${Le(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||s}
          </div>
        </div>
      </div>
    </div>
  `}function pt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Cs(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${pt(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${pt(e.title)}">
        <div class="modal-header">
          <h2>${pt(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${pt(e.placeholder)}"
            value="${pt(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function Ct(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function un(e){return e.trim().toLowerCase()}function wl(e,t){const n=un(t),s=e.filter(l=>n?[l.code,l.name,l.name].map(un).some(d=>d.includes(n)):!0).slice(0,50),r=s.length?`
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
              ${s.map(l=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${Ct(l.code)}"
                      data-name="${Ct(l.name)}"
                    >
                      <td class="mono">${Ct(l.code)}</td>
                      <td>${Ct(l.name)}</td>
                      <td>${l.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Cs({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:r,emptyMessage:"該当する得意先が見つかりません。"})}function xl(e){return e.toISOString().slice(0,10)}function Ke(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ve(e,t){return e[t]?`<div class="field-error">${Ke(e[t])}</div>`:""}function Ze(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function $l(e,t,n,s){const r=Object.keys(ga).map(u=>`<option value="${u}" ${e.invoiceType===u?"selected":""}>${ga[u]}</option>`).join(""),l=e.lines.map((u,y)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${Ze(s,`lines.${y}.productCode`,"input-cell")}" type="text" data-line="${y}" data-field="productCode" value="${Ke(u.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${y}" aria-label="商品検索">🔍</button>
          </div>
          ${Ve(s,`lines.${y}.productCode`)}
        </td>
        <td>
          <input class="${Ze(s,`lines.${y}.productName`,"input-cell")}" type="text" data-line="${y}" data-field="productName" value="${Ke(u.productName)}" placeholder="商品名" />
          ${Ve(s,`lines.${y}.productName`)}
        </td>
        <td>
          <input class="${Ze(s,`lines.${y}.quantity`,"input-cell numeric")}" type="number" data-line="${y}" data-field="quantity" value="${u.quantity}" min="0" />
          ${Ve(s,`lines.${y}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${y}" data-field="unit" value="${u.unit}" placeholder="本" /></td>
        <td>
          <input class="${Ze(s,`lines.${y}.unitPrice`,"input-cell numeric")}" type="number" data-line="${y}" data-field="unitPrice" value="${u.unitPrice}" min="0" />
          ${Ve(s,`lines.${y}.unitPrice`)}
        </td>
        <td class="numeric">${u.amount>0?u.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${y}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${y}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),d=e.lines.reduce((u,y)=>u+y.amount,0),p=Math.floor(d*10/110);return`
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
          <input class="${Ze(s,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||xl(new Date)}" />
          ${Ve(s,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${Ze(s,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${Ke(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${Ve(s,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${Ke(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${Ke(e.staffCode)}" />
        </label>
      </div>
      ${Ve(s,"lines")}
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
          <span class="total-value">${(d-p).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${p.toLocaleString("ja-JP")} 円</span>
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
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${Ke(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function _l(e){return"¥"+e.toLocaleString("ja-JP")}function Sl(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const kl={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},Pl={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},El={sake:"酒販用",standard:"通常"};function Al(e,t){return`
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
          <tbody>${t?'<tr><td colspan="8" class="empty-row">読み込み中…</td></tr>':e.length===0?'<tr><td colspan="8" class="empty-row">見積書がありません</td></tr>':e.map(s=>`
      <tr>
        <td class="mono">${s.quote_no}</td>
        <td>${Sl(s.quote_date)}</td>
        <td>${s.customer_name||"（未選択）"}</td>
        <td>${s.subject||""}</td>
        <td class="numeric">${_l(s.total_amount)}</td>
        <td><span class="badge ${Pl[s.status]??"badge-gray"}">${kl[s.status]??s.status}</span></td>
        <td>${El[s.template_type]??s.template_type}</td>
        <td>
          <button class="button secondary small" data-open-quote="${s.id}">開く</button>
          <button class="button secondary small danger" data-delete-quote="${s.id}" data-quote-no="${s.quote_no}">削除</button>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}const Ds="kanei-quote-settings",qs=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Bt={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function $a(){try{const e=localStorage.getItem(Ds);if(e)return{...Bt,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Bt,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Bt}}function Ge(e){localStorage.setItem(Ds,JSON.stringify(e))}function Te(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Se(e,t,n,s="text",r=""){return`<div class="form-row"><label>${t}</label><input type="${s}" id="${e}" value="${Te(n)}" placeholder="${Te(r)}" /></div>`}function Ll(e,t,n,s){const r=s.map(l=>`<option value="${Te(l)}" ${n===l?"selected":""}>${Te(l)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${r}</select></div>`}function Cl(e){return`
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
        ${Ll("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
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
        ${qs.map(t=>`
          <button
            type="button"
            data-action="set-accent-color"
            data-color="${Te(t.value)}"
            title="${Te(t.label)}"
            style="width:36px;height:36px;border-radius:6px;border:3px solid ${e.accentColor===t.value?"#333":"transparent"};background:${Te(t.value)};cursor:pointer;transition:border-color 0.15s;"
          ></button>
        `).join("")}
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
          カスタム
          <input type="color" id="qs-accent-color" value="${Te(e.accentColor||"#0968e5")}" style="width:36px;height:36px;border:none;border-radius:4px;cursor:pointer;padding:2px;" />
        </label>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:12px;color:var(--text-secondary);">現在の色:</span>
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:${Te(e.accentColor||"#0968e5")};border:1px solid rgba(0,0,0,0.15);"></span>
          <code style="font-size:12px;">${Te(e.accentColor||"#0968e5")}</code>
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
  `}function Dl(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function Ut(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:Dl(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}Ut();function W(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ee(e){return"¥"+e.toLocaleString("ja-JP")}function mn(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Is(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function Ts(e,t,n){return"#"+[e,t,n].map(s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0")).join("")}function Jt(e,t){const[n,s,r]=Is(e);return Ts(n+(255-n)*t,s+(255-s)*t,r+(255-r)*t)}function Ms(e,t){const[n,s,r]=Is(e);return Ts(n*(1-t),s*(1-t),r*(1-t))}function ql(e){const t=Ms(e,.15),n=Jt(e,.88),s=Jt(e,.96);return`
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:11px; color:#1a1a2e; padding:20mm 18mm 16mm; }
.q-doc { max-width: 720px; margin: 0 auto; }
/* タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） */
.q-title-row { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:3px solid ${e}; padding-bottom:8px; margin-bottom:12px; }
.q-title { font-size:22px; font-weight:700; letter-spacing:0.3em; color:${e}; }
.q-meta-table { font-size:10px; border-collapse:collapse; }
.q-meta-table th { text-align:left; padding:2px 8px 2px 0; color:#666; white-space:nowrap; font-weight:400; }
.q-meta-table td { font-weight:600; text-align:right; padding-left:12px; }
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
`}function Il(e){const t=Ms(e,.15),n=Jt(e,.88),s=Jt(e,.96);return`
.q-doc { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:13px; color:#1a1a2e; max-width:720px; margin:0 auto; }
.q-doc * { box-sizing:border-box; margin:0; padding:0; }
/* タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） */
.q-doc .q-title-row { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:3px solid ${e}; padding-bottom:10px; margin-bottom:14px; }
.q-doc .q-title { font-size:26px; font-weight:700; letter-spacing:0.3em; color:${e}; }
.q-doc .q-meta-table { font-size:12px; border-collapse:collapse; }
.q-doc .q-meta-table th { text-align:left; padding:2px 10px 2px 0; color:#666; white-space:nowrap; font-weight:400; }
.q-doc .q-meta-table td { font-weight:600; text-align:right; padding-left:14px; }
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
`}function Ns(e,t){const n=e.lines.reduce((A,R)=>A+R.amount,0),s=Math.round(n*e.taxRate/100),r=n+s,l=e.templateType==="sake",d=l?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",p=l?9:6,u=e.lines.map((A,R)=>{const o=l?`<td style="font-size:9px;">${W(A.janCode)}</td><td style="text-align:center;">${A.caseQty??""}</td><td style="text-align:right;">${A.retailPrice!=null?Ee(A.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${R+1}</td>
      <td class="mono" style="font-size:9px;">${W(A.productCode)}</td>
      <td>${W(A.productName)}</td>
      ${o}
      <td style="text-align:right;">${A.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${W(A.unit)}</td>
      <td style="text-align:right;">${Ee(A.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${p}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,y=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),v=y?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${W(y)}</p>
    </div>
  `:"",g=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",w=[];e.validUntil&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${mn(e.validUntil)}</div></div>`),e.paymentTerms&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${W(e.paymentTerms)}</div></div>`),e.deliveryDate&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${W(e.deliveryDate)}</div></div>`),e.deliveryPlace&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${W(e.deliveryPlace)}</div></div>`);const P=w.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min(w.length,4)},1fr);">${w.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <table class="q-meta-table" style="margin-left:auto;text-align:right;">
      ${e.quoteNo?`<tr><th>見積番号</th><td>${W(e.quoteNo)}</td></tr>`:""}
      <tr><th>見積日</th><td>${mn(e.quoteDate)}</td></tr>
    </table>
  </div>

  <!-- 取引先（左）・自社情報（右） -->
  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${W(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${W(e.customerAddress)}</p>`:""}
    </div>
    <div class="q-seller-col">
      <!-- 自社情報: 社名の右に印鑑 -->
      <div class="q-seller-name-row">
        <span class="q-seller-name">${W(t.companyName)}</span>
        ${g}
      </div>
      ${t.companyPostal?`<p class="q-seller-sub">〒${W(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${W(t.companyAddress1)}${t.companyAddress2?" "+W(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${W(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${W(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${W(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  ${P}

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${Ee(r)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${W(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${W(t.defaultHeaderNote)}</p>`:""}

  <div class="q-table-wrap">
  <table class="q-items">
    <thead>
      <tr>
        <th style="width:28px;">No.</th>
        <th style="width:60px;">品番</th>
        <th>品名</th>
        ${d}
        <th style="width:42px;">数量</th>
        <th style="width:32px;">単位</th>
        <th style="width:80px;">${l?"納入価格":"単価"}</th>
      </tr>
    </thead>
    <tbody>${u}</tbody>
    <tfoot>
      <tr><td colspan="${p-1}" style="text-align:right;">小計</td><td style="text-align:right;">${Ee(n)}</td></tr>
      <tr><td colspan="${p-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${Ee(s)}</td></tr>
      <tr class="q-total-row"><td colspan="${p-1}" style="text-align:right;">合計</td><td style="text-align:right;">${Ee(r)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${W(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${W(t.defaultFooterNote)}</p>`:""}

  ${v}
</div>`}function Rs(e,t,n,s,r,l,d){const p=e.lines.reduce((A,R)=>A+R.amount,0),u=Math.round(p*e.taxRate/100),y=p+u,v=e.templateType==="sake",g=s.length>=1?t.filter(A=>A.name.includes(s)||A.code.includes(s)).slice(0,8):[],w=r.length>=1?n.filter(A=>A.name.includes(r)||A.code.includes(r)).slice(0,8):[];if(e.previewMode){const A=d.accentColor||"#0968e5";return`
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
        ${Il(A)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${Ns(e,d)}
      </div>
    `}const P=e.lines.map((A,R)=>{const o=v?`
      <td><input type="text" class="jan-input" data-line-idx="${R}" value="${W(A.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${R}" value="${A.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${R}" value="${A.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${W(A.productCode)}</td>
      <td>${W(A.productName)}</td>
      ${o}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${R}" value="${A.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${W(A.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${R}" value="${A.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${Ee(A.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${R}">×</button></td>
    </tr>`}).join("")||`<tr><td colspan="${v?10:7}" style="text-align:center;color:var(--text-secondary);padding:20px;">商品を検索して追加</td></tr>`;return`
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
          ${qs.map(A=>`
            <button type="button" data-action="set-accent-color" data-color="${W(A.value)}" title="${W(A.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${d.accentColor===A.value?"#333":"transparent"};background:${W(A.value)};cursor:pointer;"></button>
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
          <input type="text" id="q-no" value="${W(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${W(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${W(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${W(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${W(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">既存得意先</p>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${W(s)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${g.length>0?`<div class="search-results">${g.map(A=>`
        <button class="search-item" type="button" data-select-customer="${A.code}" data-cust-name="${W(A.name)}" data-cust-addr="${W(A.address1||"")}">
          <span class="mono">${A.code}</span> ${W(A.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName&&!e.isProspect?`<div class="selected-item"><span class="mono">${W(e.customerCode)}</span> <strong>${W(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${W(e.customerAddress)}</span>`:""}</div>`:""}

      <div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--border);">
        <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">見込み顧客から選択</p>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="q-prospect-search" placeholder="見込み顧客名で検索…" style="flex:1;" />
          <button type="button" class="button secondary small" data-action="new-prospect-from-quote">＋ 新規登録</button>
        </div>
        <div id="q-prospect-results"></div>
        ${e.customerName&&e.isProspect?`<div class="selected-item" style="border-left:3px solid #48bb78;"><span style="font-size:11px;background:#48bb78;color:white;border-radius:3px;padding:1px 5px;margin-right:6px;">見込</span> <strong>${W(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${W(e.customerAddress)}</span>`:""}</div>`:""}
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
        <input type="text" id="q-prod-search" value="${W(r)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${w.length>0?`<div class="search-results">${w.map(A=>{const R=l?Fa(A,l):{price:A.salePrice||0,label:"卸価格"},o=A.listPrice||0,i=R.label!=="標準価格"&&R.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${A.code}" data-prod-name="${W(A.name)}" data-prod-price="${R.price}" data-prod-retail="${o}" data-prod-jan="${W(A.janCode??"")}" data-prod-unit="${W(A.unit??"本")}" data-prod-case="${A.caseQty??""}">
          <span class="mono">${A.code}</span> ${W(A.name)}
          <span class="numeric" ${i?'style="color:#2f855a;font-weight:700;"':""}>納入 ${R.price?Ee(R.price):"未設定"} <small>(${R.label})</small>${o?`　定価 ${Ee(o)}`:""}</span>
        </button>`}).join("")}</div>`:""}

      <div class="table-wrap" style="margin-top:10px;">
        <table>
          <thead>
            <tr>
              <th>品番</th><th>品名</th>
              ${v?'<th>JANコード</th><th>入数</th><th class="numeric">希望小売価格</th>':""}
              <th class="numeric">数量</th><th>単位</th><th class="numeric">${v?"納入価格":"単価"}</th><th class="numeric">金額</th><th></th>
            </tr>
          </thead>
          <tbody>${P}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="3">${W(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${Ee(p)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${Ee(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${Ee(y)}</span></div>
        </div>
      </div>
    </section>
  `}async function Tl(e,t){const n=t.accentColor||"#0968e5",s=document.createElement("div");s.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",s.innerHTML=`<style>${ql(n)}</style>${Ns(e,t)}`,document.body.appendChild(s);try{const[{default:r},{jsPDF:l}]=await Promise.all([q(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),q(()=>import("./jspdf.es.min-BxNDxYwp.js").then(A=>A.j),[])]),d=await r(s,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),p=210,u=297,y=d.width/p,v=u*y,g=new l({orientation:"portrait",unit:"mm",format:"a4"});let w=0,P=0;for(;w<d.height;){P>0&&g.addPage();const A=Math.min(v,d.height-w),R=document.createElement("canvas");R.width=d.width,R.height=Math.ceil(A);const o=R.getContext("2d");o.fillStyle="#ffffff",o.fillRect(0,0,R.width,R.height),o.drawImage(d,0,w,d.width,A,0,0,d.width,A);const i=R.toDataURL("image/jpeg",.95),c=A/y;g.addImage(i,"JPEG",0,0,p,c),w+=v,P++}g.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(s)}}function Dt(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function Os(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function js(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function Bs(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function Ml(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function Nl(e,t,n,s,r){const l=new Map,d=new Map;for(const v of e){if(v.date>=t&&v.date<=n){const g=l.get(v.productCode);g?(g.amt+=v.amount,g.qty+=v.qty):l.set(v.productCode,{name:v.productName,vol:v.volumeMl,amt:v.amount,qty:v.qty})}v.date>=s&&v.date<=r&&d.set(v.productCode,(d.get(v.productCode)??0)+v.amount)}const p=[...l.entries()].map(([v,g])=>({code:v,...g})).sort((v,g)=>g.amt-v.amt),u=p.reduce((v,g)=>v+g.amt,0);let y=0;return p.map(v=>{y+=v.amt;const g=u>0?Math.round(v.amt*1e4/u)/100:0,w=y<=u*.7?"A":y<=u*.9?"B":"C",P=d.get(v.code)??0,A=P>0?Math.round((v.amt-P)/P*1e3)/10:null;return{code:v.code,name:v.name,volumeMl:v.vol,amount:v.amt,qty:v.qty,sharePct:g,rank:w,prevAmount:P,growthRate:A}})}function Rl(e,t,n){const s=new Date,r=s.toISOString().slice(0,10);let l=r,d=r,p="";switch(e){case"week":{const v=new Date(s);v.setDate(v.getDate()-7),l=v.toISOString().slice(0,10),d=r,p="直近7日間";break}case"month":{l=r.slice(0,7)+"-01",d=r,p="当月";break}case"90days":{const v=new Date(s);v.setDate(v.getDate()-90),l=v.toISOString().slice(0,10),d=r,p="直近90日間";break}case"year":{const v=new Date(s);v.setFullYear(v.getFullYear()-1),l=v.toISOString().slice(0,10),d=r,p="直近1年間";break}case"custom":{l=t||r,d=n||r,p=`${l} 〜 ${d}`;break}}const u=new Date(l);u.setFullYear(u.getFullYear()-1);const y=new Date(d);return y.setFullYear(y.getFullYear()-1),{start:l,end:d,prevStart:u.toISOString().slice(0,10),prevEnd:y.toISOString().slice(0,10),label:p}}function Ol(e,t="all",n=[],s="year",r,l,d=[]){const p=Rl(s,r,l),u=n.length>0?Nl(n,p.start,p.end,p.prevStart,p.prevEnd):e.map(c=>({code:c.code,name:c.name,volumeMl:c.volumeMl,amount:c.yearAmount,qty:c.yearQty,sharePct:c.sharePct,rank:c.rank,prevAmount:c.prevAmount,growthRate:c.growthRate})),y=u.filter(c=>c.rank==="A").length,v=u.filter(c=>c.rank==="B").length,g=u.filter(c=>c.rank==="C").length,w=u.filter(c=>c.growthRate!=null&&c.growthRate>10),P=u.filter(c=>c.growthRate!=null&&c.growthRate<-10);let A=u,R="全商品";switch(t){case"A":A=u.filter(c=>c.rank==="A"),R="Aランク";break;case"B":A=u.filter(c=>c.rank==="B"),R="Bランク";break;case"C":A=u.filter(c=>c.rank==="C"),R="Cランク";break;case"growing":A=w,R="成長商品(+10%以上)";break;case"declining":A=P,R="衰退商品(-10%以下)";break}const o=(c,m,h)=>`<button class="button ${t===c?"primary":"secondary"} small" data-product-filter="${c}">${m} (${h})</button>`,i=(c,m)=>`<button class="button ${s===c?"primary":"secondary"} small" data-product-period="${c}">${m}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${i("week","週次")}
        ${i("month","月次")}
        ${i("90days","90日")}
        ${i("year","年間")}
        ${i("custom","指定期間")}
      </div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="pp-range-start" class="range-input" value="${r||""}" />
        <span>〜</span>
        <input type="date" id="pp-range-end" class="range-input" value="${l||""}" />
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
        <p class="kpi-value">${v} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${w.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${P.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${R} (${A.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${o("all","全て",u.length)}
        ${o("A","A",y)}
        ${o("B","B",v)}
        ${o("C","C",g)}
        ${o("growing","成長",w.length)}
        ${o("declining","衰退",P.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ee("rank","ABC",d)}
              ${ee("name","商品名",d)}
              ${ee("amount","売上",d,"numeric")}
              ${ee("sharePct","構成比",d,"numeric")}
              ${ee("qty","本数",d,"numeric")}
              ${ee("growthRate","前年同期比",d,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${ot(A,d,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(c=>`
              <tr>
                <td>${js(c.rank)}</td>
                <td>${c.name?c.name.slice(0,25):c.code}${c.volumeMl?` <small>${c.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${Os(c.amount)}</td>
                <td class="numeric">${c.sharePct}%</td>
                <td class="numeric">${c.qty.toLocaleString()}</td>
                <td class="numeric">${Bs(c.growthRate)}</td>
              </tr>
            `).join("")}
            ${A.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function jl(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,s="billing"){const r=e.filter(w=>w.currentRank==="A").length,l=e.filter(w=>w.prevRank&&w.currentRank<w.prevRank).length,d=e.filter(w=>w.prevRank&&w.currentRank>w.prevRank).length,p=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,u=2011,y=[];for(let w=p;w>=u&&y.length<6;w--)y.push(w);const v=`
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;">
      <span style="font-size:13px;color:var(--text-secondary);margin-right:4px;">年度：</span>
      ${y.map(w=>`
        <button class="button ${w===n?"primary":"secondary"} small"
          data-action="efficiency-year-change" data-year="${w}"
          style="min-width:80px;">
          ${w}年度
        </button>
      `).join("")}
      <select data-action="efficiency-year-select"
        style="margin-left:8px;padding:4px 8px;border-radius:4px;border:1px solid var(--border);background:var(--surface);font-size:13px;">
        <option value="">過去年度…</option>
        ${Array.from({length:p-u+1},(w,P)=>p-P).filter(w=>!y.includes(w)).map(w=>`<option value="${w}" ${w===n?"selected":""}>${w}年度</option>`).join("")}
      </select>
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
        <p class="kpi-value">${r} ${s==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">ランクアップ</p>
        <p class="kpi-value">${l} ${s==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${d} ${s==="billing"?"社":"店舗"}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>${s==="billing"?"得意先":"店舗（納品先）"}ABC分析（${n}年度・4月〜翌3月）</h2></div>
      ${v}
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ee("currentRank","ABC",t)}
              ${ee("name","得意先名",t)}
              ${ee("yearAmount","年間売上",t,"numeric")}
              ${ee("sharePct","構成比",t,"numeric")}
              ${ee("orderDays","受注日数",t,"numeric")}
              ${ee("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${ot(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(w=>`
              <tr>
                <td>${js(w.currentRank)}</td>
                <td>${w.name||w.code}</td>
                <td class="numeric">${Os(w.yearAmount)}</td>
                <td class="numeric">${w.sharePct}%</td>
                <td class="numeric">${w.orderDays}日</td>
                <td class="numeric">${Bs(w.growthRate)}</td>
                <td>${Ml(w.currentRank,w.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Bl(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function zl(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Fl(e,t){const n=e.length?e.map(s=>`
            <tr>
              <td class="mono">${s.documentNo}</td>
              <td>${Bl(s.date)}</td>
              <td>
                <div class="table-title">${s.customerName}</div>
                <div class="table-sub mono">${s.customerCode}</div>
              </td>
              <td class="numeric">${s.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${zl(s.amount)}</td>
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
  `}function Vl(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Yl(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function zs(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function Fs(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function yn(e){const t=zs(Fs(e),6);return t.setHours(23,59,59,999),t}function hn(e){return new Date(`${e}T00:00:00`)}function fn(e){return`${e.getMonth()+1}/${e.getDate()}`}function Ul(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Jl(){const e=new Date,t=Fs(Yl(Vl(e),-3)),n=yn(new Date(e.getFullYear(),e.getMonth()+4,0)),s=[];let r=new Date(t);for(;r<=n;){const l=yn(r);s.push({start:new Date(r),end:l,label:`${fn(r)} - ${fn(l)}`}),r=zs(r,7)}return s}function Ql(e){const t=Jl(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,s=t.map(l=>`
        <div class="gantt-week">
          <span>${l.label}</span>
        </div>
      `).join(""),r=e.length?e.map(l=>{const d=hn(l.startDate),p=hn(l.expectedDoneDate),u=Math.max(0,t.findIndex(g=>g.end>=d)),y=Math.max(u,t.reduce((g,w,P)=>w.start<=p?P:g,u)),v=[`仕込番号: ${l.jikomiNo}`,`銘柄: ${l.productName}`,`期間: ${l.startDate} - ${l.expectedDoneDate}`,`タンク: ${l.tankNo}`,`備考: ${l.note||"なし"}`].join(`
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
                  title="${Ul(v)}"
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
          ${s}
        </div>
        ${r}
      </div>
    </section>
  `}function gn(e,t){const n={planned:"neutral",active:"warning",done:"success"},s=e.map(p=>`
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
          <span class="status-pill ${n[p.status]}">${is[p.status]}</span>
        </td>
        <td>${p.note||"―"}</td>
      </tr>
    `).join(""),r=e.filter(p=>p.status==="active").length,l=e.filter(p=>p.status==="done").length,d=e.filter(p=>p.status==="planned").length;return`
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
        <p class="kpi-value">${d} 本</p>
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
          <tbody>${s||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Hl(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},s=e.map(u=>`
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
    `).join(""),r=e.filter(u=>u.status==="approved").length,l=e.filter(u=>u.status==="submitted").length,d=e.filter(u=>u.status==="pending").length;return`
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
        <p class="kpi-value">${d} 件</p>
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
  `}function Kl(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Gl(e,t){return`
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
        ${e?`<p class="field-error">${Kl(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function Wl(e){return`
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
  `}function Xl(e){return`
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
  `}const Ka={query:"",businessType:"",tradeType:"",areaCode:"",activeOnly:"",page:1},wt=50;function Zl(e,t){let n=e;if(t.query){const p=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(p)||u.name.toLowerCase().includes(p)||u.kanaName&&u.kanaName.toLowerCase().includes(p)||u.address1&&u.address1.toLowerCase().includes(p)||u.phone&&u.phone.toLowerCase().includes(p))}t.businessType&&(n=n.filter(p=>p.businessType===t.businessType)),t.tradeType&&(n=n.filter(p=>p.tradeType===t.tradeType)),t.areaCode&&(n=n.filter(p=>p.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(p=>p.isActive):t.activeOnly==="inactive"&&(n=n.filter(p=>!p.isActive));const s=Math.max(1,Math.ceil(n.length/wt)),l=(Math.min(t.page,s)-1)*wt,d=n.slice(l,l+wt);return{filtered:n,paged:d,totalPages:s}}function vn(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const s=(t-1)*wt+1,r=Math.min(t*wt,e),l=[];for(let d=1;d<=n;d++)d===1||d===n||d>=t-2&&d<=t+2?l.push(`<button class="button ${d===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${d}" style="min-width:36px;padding:4px 8px;">${d}</button>`):(d===t-3||d===t+3)&&l.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${s}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${l.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function ec(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),s=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
          ${Object.entries(ac).map(([r,l])=>`<option value="${r}" ${t.tradeType===r?"selected":""}>${l}</option>`).join("")}
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
  `}function _a(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function tc(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}const ac={B2B:"B2B（卸）",B2B2C:"B2B2C（生産者）",B2C:"B2C（小売）"};function nc(e){return e?`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${{B2B:"#3b82f6",B2B2C:"#8b5cf6",B2C:"#10b981"}[e]??"#999"};">${e}</span>`:"―"}function sc(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${nc(t.tradeType)}</td>
          <td>${tc(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${_a(t.address1||"",16)}</td>
          <td>${_a(t.address2||"",12)}</td>
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
      `).join("")}function qt(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function oc(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${_a(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${qt(t.purchasePrice)}</td>
          <td class="numeric">${qt(t.salePrice)}</td>
          <td class="numeric">${qt(t.listPrice)}</td>
          <td class="numeric">${qt(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function rc(e,t,n=Ka,s=[]){const{filtered:r,paged:l,totalPages:d}=Zl(e.customers,n);return`
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
        ${ec(e.customers,n)}
        ${vn(r.length,n.page,d)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${ee("code","コード",s)}
                ${ee("name","得意先名",s)}
                ${ee("kanaName","カナ",s)}
                <th>略称</th>
                ${ee("businessType","業態",s)}
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
                ${ee("areaName","地区",s)}
                ${ee("closingDay","締日",s,"numeric")}
                ${ee("paymentDay","支払日",s,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${sc(ot(l,s,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${vn(r.length,n.page,d)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${ee("code","コード",s)}
                ${ee("name","商品名",s)}
                <th>カナ</th>
                ${ee("category","分類",s)}
                <th>酒税区分</th>
                ${ee("alcoholDegree","度数",s,"numeric")}
                ${ee("volumeMl","容量ml",s,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${ee("purchasePrice","生産者価格",s,"numeric")}
                ${ee("salePrice","卸価格",s,"numeric")}
                ${ee("listPrice","定価(小売)",s,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${oc(ot(e.products,s,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function na(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ic(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${$s.map(s=>`<option ${n?.materialType===s?"selected":""}>${s}</option>`).join("")}
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
  `}function lc(e){const t=e.map(r=>{const d=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${d?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${d?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${na(r.unitCost)}</td>
          <td class="numeric">${na(r.currentStock*r.unitCost)}</td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${r.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(r=>r.minimumStock>0&&r.currentStock/r.minimumStock<1.5).length,s=e.reduce((r,l)=>r+l.currentStock*l.unitCost,0);return`
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
        <p class="kpi-value">${na(s)}</p>
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
  `}function cc(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function sa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const dc={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function pc(e){return`
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
          <td class="numeric">${sa(n.billedAmount)}</td>
          <td class="numeric">${sa(n.paymentAmount)}</td>
          <td class="numeric">${sa(n.balanceAmount)}</td>
          <td>${cc(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${dc[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function et(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function bn(e){return e.trim().toLowerCase()}function uc(e,t){const n=bn(t),s=e.filter(l=>n?[l.code,l.name,l.janCode].map(bn).some(d=>d.includes(n)):!0),r=s.length?`
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
              ${s.map(l=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${et(l.code)}"
                      data-name="${et(l.name)}"
                    >
                      <td class="mono">${et(l.code)}</td>
                      <td>${et(l.name)}</td>
                      <td class="mono">${et(l.janCode)}</td>
                      <td>${et(l.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Cs({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:r,emptyMessage:"該当する商品が見つかりません。"})}function Ye(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function mc(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},l={unpaid:"warning",partial:"neutral",paid:"success"},d=e.map(g=>`
      <tr>
        <td class="mono">${g.documentNo}</td>
        <td>${g.purchaseDate}</td>
        <td class="mono">${g.supplierCode}</td>
        <td>${g.supplierName}</td>
        <td>${g.itemName}</td>
        <td class="numeric">${g.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${Ye(g.unitPrice)}</td>
        <td class="numeric"><strong>${Ye(g.amount)}</strong></td>
        <td>
          <span class="status-pill ${s[g.status]}">${n[g.status]}</span>
        </td>
      </tr>
    `).join(""),p=t.map(g=>`
      <tr>
        <td class="mono">${g.supplierCode}</td>
        <td>${g.supplierName}</td>
        <td class="numeric">${Ye(g.totalPurchase)}</td>
        <td class="numeric">${Ye(g.paidAmount)}</td>
        <td class="numeric"><strong>${Ye(g.balance)}</strong></td>
        <td>${g.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${l[g.status]}">${r[g.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${g.supplierCode}" ${g.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),u=e.reduce((g,w)=>g+w.amount,0),y=t.reduce((g,w)=>g+w.balance,0),v=t.filter(g=>g.status!=="paid").length;return`
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
        <p class="kpi-value">${Ye(u)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${Ye(y)}</p>
        <p class="kpi-sub">未払い ${v} 社</p>
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
          <tbody>${d||'<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>'}</tbody>
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
  `}function ut(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function yc(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},r=e.map(v=>`
      <tr>
        <td class="mono">${v.billNo}</td>
        <td>${v.supplierName}</td>
        <td class="numeric">${ut(v.amount)}</td>
        <td>${v.issueDate}</td>
        <td>${v.dueDate}</td>
        <td>
          <span class="status-pill ${s[v.status]}">${n[v.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${v.id}" ${v.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),l=t.map(v=>{const g=v.minimumStock>0&&v.currentStock<v.minimumStock*1.2;return`
        <tr>
          <td class="mono">${v.code}</td>
          <td>${v.name}</td>
          <td class="numeric ${g?"text-danger":""}">
            ${v.currentStock.toLocaleString("ja-JP")} ${v.unit}
            ${g?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${v.minimumStock.toLocaleString("ja-JP")} ${v.unit}</td>
          <td class="numeric">${ut(v.unitCost)}</td>
          <td class="numeric">${ut(v.currentStock*v.unitCost)}</td>
          <td>${v.lastPurchaseDate}</td>
        </tr>
      `}).join(""),d=e.filter(v=>v.status==="holding"),p=d.reduce((v,g)=>v+g.amount,0),u=t.reduce((v,g)=>v+g.currentStock*g.unitCost,0),y=t.filter(v=>v.minimumStock>0&&v.currentStock<v.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${ut(p)}</p>
        <p class="kpi-sub">${d.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${ut(u)}</p>
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
  `}function Sa(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function $e(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ka(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${$e(e)}</pre>
    </div>
  `}function hc(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function It(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${$e(e)}</code>
      ${hc(e)}
    </div>
  `}function tt(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${$e(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${$e(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${$e(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?ka(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${$e(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${$e(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function Tt(e){return`
    <div class="setup-step setup-step-compact" data-step="${$e(e.stepLabel)}">
      <h3>${$e(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${$e(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function Mt(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function wn(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function fc(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?Sa(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Mt(e.lastOverallSync)}">${wn(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${Mt(e.lastOverallSync)==="success"?"1時間以内":Mt(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${$e(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?Sa(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Mt(t.lastSyncAt)}">${wn(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function gc(e,t,n,s){const r={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${s?fc(s):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${Sa(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${r[e.status]}</span>
        </p>
        <p class="kpi-sub">${$e(e.message)}</p>
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
      ${Tt({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${It("git --version")}
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
      ${Tt({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${It("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${Tt({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${It("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${It("python get-pip.py")}
        `})}
      ${Tt({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${tt({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${tt({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${tt({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${tt({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${tt({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${tt({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${ka(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${ka(`{
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
            <span class="config-value">${$e(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${$e(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${$e(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${$e(n)}"
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
  `}function gt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function vc(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function bc(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(g=>g.amount),1),s=28,r=6,l=140,d=100,p=760,u=p-l-d,y=t.length*(s+r)+16,v=t.map((g,w)=>{const P=g.amount/n*u,A=w*(s+r)+8,R=g.abcRank==="A"?"#2F855A":g.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${l-8}" y="${A+s/2+5}" class="chart-axis" text-anchor="end">${g.name.length>10?g.name.slice(0,10)+"…":g.name}</text>
          <rect x="${l}" y="${A}" width="${P}" height="${s}" rx="4" fill="${R}" opacity="0.85" />
          <text x="${l+P+8}" y="${A+s/2+5}" class="chart-axis">${(g.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${p} ${y}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${v}
    </svg>
  `}function wc(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(s=>`<th class="numeric">${s}</th>`).join(""),n=e.monthlyByCustomer.map(s=>{const r=s.values.reduce((d,p)=>d+p,0),l=s.values.map(d=>`<td class="numeric">${d>0?(d/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${s.label}</td>
          ${l}
          <td class="numeric"><strong>${gt(r)}</strong></td>
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
  `}function xc(e){e.ranking.reduce((u,y)=>u+y.amount,0);const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,s=e.ranking.filter(u=>u.abcRank==="C").length,r=e.ranking.filter(u=>u.abcRank==="A").reduce((u,y)=>u+y.amount,0),l=e.ranking.filter(u=>u.abcRank==="B").reduce((u,y)=>u+y.amount,0),d=e.ranking.filter(u=>u.abcRank==="C").reduce((u,y)=>u+y.amount,0),p=e.ranking.map(u=>`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric">${gt(u.amount)}</td>
          <td class="numeric">${u.ratio.toFixed(1)}%</td>
          <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${vc(u.abcRank)}">${u.abcRank}</span></td>
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
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${gt(r)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${gt(l)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${s}社 <span class="kpi-sub">${gt(d)}</span></div>
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
        ${bc(e.ranking)}
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
      ${wc(e)}
    </section>
  `}const $c={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},xn={amount:"売上額",quantity:"出荷本数",volume:"移出量"},Pa=10;function Ga(e){const[t,n]=e.split("-").map(Number);return n>=Pa?t:t-1}function _c(e){const t=Pa-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(Pa).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function Sc(e,t,n){const s=d=>t==="quantity"?d.quantity:t==="volume"?d.volumeMl:d.amount,r=new Map;for(const d of e){const p=n==="fiscal"?`${Ga(d.month)}年度`:d.month.slice(0,4);r.set(p,(r.get(p)??0)+s(d))}return{curr:[...r.entries()].sort((d,p)=>d[0].localeCompare(p[0])).map(([d,p])=>({month:d,amount:p}))}}function kc(e){const t=new Set;for(const n of e)t.add(Ga(n.month));return[...t].sort((n,s)=>s-n).map(String)}function rt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Pc(e){return e.replace("-","/")}const $n={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function Ec(e,t="#0F5B8D",n=[],s="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const r=n.length>0&&n.some(c=>c.amount>0),l=760,d=280,p={top:16,right:24,bottom:36,left:s==="amount"?64:56},u=l-p.left-p.right,y=d-p.top-p.bottom,v=[...e.map(c=>c.amount),...n.map(c=>c.amount)],g=Math.max(...v,1),w=u/e.length;function P(c){if(s==="quantity")return c>=1e4?`${(c/1e4).toFixed(1)}万本`:`${Math.round(c).toLocaleString()}本`;if(s==="volume"){const m=c/1e3;return m>=1e4?`${(m/1e3).toFixed(0)}kL`:`${Math.round(m).toLocaleString()} L`}return`${Math.round(c/1e4).toLocaleString("ja-JP")}万円`}function A(c){return s==="quantity"?`${c.toLocaleString()}本`:s==="volume"?Xt(c):rt(c)}const R=[0,.25,.5,.75,1].map(c=>{const m=p.top+y-y*c,h=P(g*c);return`<g>
        <line x1="${p.left}" y1="${m}" x2="${l-p.right}" y2="${m}" class="chart-grid" />
        <text x="4" y="${m+4}" class="chart-axis">${h}</text>
      </g>`}).join(""),o=e.map((c,m)=>{const h=r?Math.max((w-18)/2,10):Math.max(w-18,24),b=r?2:0,x=p.left+m*w+(w-(r?h*2+b:h))/2,$=c.amount/g*y,E=p.top+y-$,k=n[m]?.amount??0,S=k/g*y,C=p.top+y-S,L=r?`<rect x="${x}" y="${C}" width="${h}" height="${S}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${A(k)}</title></rect>`:"",I=r?x+h+b:x;return`<g>
      ${L}
      <rect x="${I}" y="${E}" width="${h}" height="${$}" rx="4" fill="${t}" opacity="${.6+m/e.length*.35}"><title>${A(c.amount)}</title></rect>
      <text x="${p.left+m*w+w/2}" y="${d-8}" class="chart-axis centered-axis">${Pc(c.month)}</text>
    </g>`}).join(""),i=r?`
    <g transform="translate(${l-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${l} ${d}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${R}${o}${i}
    </svg>
  `}function Xt(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function Ac(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(s=>`
    <tr>
      <td class="mono">${s.code}</td>
      <td>${s.name}</td>
      <td class="numeric">${rt(s.amount)}</td>
      <td class="numeric">${s.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Xt(s.volumeMl)}</td>
      <td class="numeric">${s.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${s.code}" data-drilldown-name="${s.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function Lc(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${rt(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Xt(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function _n(e,t,n){const s=t?e.filter(l=>l.tag.includes(t)||l.name.includes(t)):e,r=s.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':s.map(l=>`
        <tr>
          <td class="mono">${l.code||"―"}</td>
          <td>${l.name||"未設定"}</td>
          <td class="mono">${l.tag||"―"}</td>
          <td class="numeric">${rt(l.amount)}</td>
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
  `}function Vs(e,t,n="all",s="",r=[],l=[],d="",p="",u=null,y="all",v="",g=[],w=[],P=[],A=null,R=[],o=[],i="amount",c="calendar"){const m=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",h=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,x=n!=="all"&&r.length>0&&t!=="staff"?r:h,$=ot(x,P,$c),E={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},k=xn[i],S=G=>i==="quantity"?G.quantity:i==="volume"?G.volumeMl:G.amount,C=G=>i==="quantity"?`${G.toLocaleString()}本`:i==="volume"?Xt(G):rt(G);let L,I=[],T,j,M;if(A&&A.monthlySales.length>0)L=A.monthlySales.slice(-24).map(G=>({month:G.month,amount:S(G)})),T=`${A.name} の月別${k}`,j=`${A.tab==="customers"?"得意先":"商品"}: ${A.code}`,M="#0968e5";else if(R.length>0&&n!=="all"){L=R.map(Y=>({month:Y.month,amount:S(Y)})),I=o.map(Y=>({month:Y.month,amount:S(Y)}));const G=L.reduce((Y,Q)=>Y+Q.amount,0),de=I.reduce((Y,Q)=>Y+Q.amount,0),se=de>0?(G-de)/de*100:0,le=se>0?"+":"";T=`${E[n]} ${k}（${s}）`,j=`${C(G)}${de>0?` / 前年比 ${le}${se.toFixed(1)}%`:""}`,M="#2f855a"}else{L=Sc(e.monthlySales,i,c).curr,I=[];const de=L.reduce((le,Y)=>le+Y.amount,0);T=`${c==="fiscal"?"決算年度別":"暦年別"}${k}`,j=`累計 ${C(de)}（${L.length}${c==="fiscal"?"期":"年"}）`,M="#0F5B8D"}const z=["amount","quantity","volume"].map(G=>`<button class="tab-button ${G===i?"active":""}" data-chart-metric="${G}">${xn[G]}</button>`).join(""),F=["all","yearly","monthly","weekly","daily"].map(G=>`<button class="button ${G===n?"primary":"secondary"} small" type="button" data-analytics-period="${G}">${$n[G]}</button>`).join(""),B=c==="fiscal"&&n==="yearly"?kc(e.monthlySales):l,U=c==="fiscal"&&n==="yearly"&&!B.includes(s)?B[0]??"":s,J=n!=="all"&&B.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${B.map(G=>`<option value="${G}" ${G===U?"selected":""}>${c==="fiscal"&&n==="yearly"?G+"年度":G}</option>`).join("")}
      </select>`:"";let H="",K="";if(t==="staff"){const G=["all","yearly","monthly","weekly","daily"].map(Q=>`<button class="button ${Q===y?"primary":"secondary"} small" type="button" data-staff-period="${Q}">${$n[Q]}</button>`).join(""),de=y!=="all"&&g.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${g.map(Q=>`<option value="${Q}" ${Q===v?"selected":""}>${Q}</option>`).join("")}
        </select>`:"",le=(w.length>0?w:e.staffTotals).filter(Q=>!d||Q.name.includes(d)||Q.code.includes(d)),Y=y!=="all"&&v?` (${v})`:"";if(H=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${G}</div>
        ${de}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${d}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${Y?`<span style="font-size:12px;color:var(--text-secondary);">${Y}</span>`:""}
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
            ${le.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':le.map(Q=>`
                <tr>
                  <td class="mono">${Q.code||"―"}</td>
                  <td>${Q.name||"未設定"}</td>
                  <td class="numeric">${rt(Q.amount)}</td>
                  <td class="numeric">${Q.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${Q.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${Q.code}" data-staff-name="${Q.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const Q=u.breakdownTab,X=y!=="all"&&v?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${v}</span>`:"";K=`
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
              <button class="tab-button ${Q==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${Q==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${p}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${Q==="customers"?_n(u.customerRows,p,"得意先名"):_n(u.productRows,p,"商品名")}
        </article>
      `}}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group" style="font-size:12px;">
          <button class="tab-button ${c==="calendar"?"active":""}" data-fiscal-mode="calendar">暦年（1〜12月）</button>
          <button class="tab-button ${c==="fiscal"?"active":""}" data-fiscal-mode="fiscal">決算期（10〜9月）</button>
        </div>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <h2>${T}</h2>
            <p class="panel-caption">${j}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${z}</div>
            ${A?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${Ec(L,M,I,i)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${m}</h2>
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
            <div class="button-group">${F}</div>
            ${J}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${ee("code","コード",P,"mono")}
                  ${ee("name","名称",P)}
                  ${ee("amount","売上額",P,"numeric")}
                  ${ee("quantity","本数",P,"numeric")}
                  ${ee("volumeMl","移出量",P,"numeric")}
                  ${ee("documents","伝票数",P,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${Ac($,!0)}</tbody>
            </table>
          </div>
        `:H}
      </article>
    </section>

    ${A?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${A.name} の${A.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${A.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${A.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${Lc(A.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${K}
  `}const Sn=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:_c,monthToFiscalYear:Ga,renderSalesAnalytics:Vs},Symbol.toStringTag,{value:"Module"}));function mt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Cc(e){const t=Math.max(...e.salesByProduct.flatMap(l=>l.values),1),n=e.salesByProduct.map(l=>{const d=l.values.map((p,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(p/t*120)}px" title="${e.months[u]}: ${mt(p)}"></div>
            <span class="bar-label">${e.months[u].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${l.label}</p>
          <div class="bar-chart">${d}</div>
        </div>
      `}).join(""),s=e.costSimulation.map(l=>`
      <tr>
        <td class="mono">${l.productCode}</td>
        <td>${l.productName}</td>
        <td class="numeric">${mt(l.costPrice)}</td>
        <td class="numeric">${mt(l.sellPrice)}</td>
        <td class="numeric">${mt(l.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${l.marginRate>=40?"success":"warning"}">${l.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(l=>{const d=l.values.reduce((p,u)=>p+u,0);return`
        <tr>
          <td>${l.label}</td>
          ${l.values.map(p=>`<td class="numeric">${(p/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${mt(d)}</strong></td>
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
          <tbody>${s}</tbody>
        </table>
      </div>
    </section>
  `}function Dc(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function qc(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function kn(e){return e.toISOString().slice(0,10)}function Ic(e,t,n){const s=e.length?e.map(r=>`
            <tr>
              <td class="mono">${r.documentNo}</td>
              <td>${Dc(r.date)}</td>
              <td>
                <div class="table-title">${r.customerName}</div>
                <div class="table-sub mono">${r.customerCode}</div>
              </td>
              <td class="numeric">${qc(r.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||kn(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||kn(new Date)}" />
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
  `}function Nt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Tc(e,t,n,s){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},l={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},d={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},p=e.map(g=>`
      <tr>
        <td>${g.saleTime}</td>
        <td class="mono">${g.productCode}</td>
        <td>${g.productName}</td>
        <td class="numeric">${g.quantity}</td>
        <td class="numeric">${Nt(g.unitPrice)}</td>
        <td class="numeric"><strong>${Nt(g.amount)}</strong></td>
        <td>${r[g.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(g=>`
      <tr>
        <td class="mono">${g.orderNo}</td>
        <td>${g.orderDate}</td>
        <td>${g.customerName}</td>
        <td>${g.postalCode} ${g.address}</td>
        <td>${g.items.map(w=>`${w.productName} ×${w.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Nt(g.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${d[g.status]}">${l[g.status]}</span>
        </td>
        <td>${g.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${g.id}">詳細</button>
        </td>
      </tr>
    `).join(""),y=e.reduce((g,w)=>g+w.amount,0),v=t.filter(g=>g.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${Nt(y)}</p>
        <p class="kpi-sub">${e.length} 件 / ${s}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${v} 件</p>
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
  `}const oa={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Mc={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Nc(e,t,n,s){const r=Mc[e],l=Object.keys(oa).map(p=>`
      <button class="tab-button ${e===p?"active":""}" data-import-entity="${p}">
        ${oa[p]}
      </button>
    `).join(""),d=t?`
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
        <h2>${oa[e]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${r.required.map(p=>`<code class="config-value">${p}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${r.optional.map(p=>`<code class="config-value">${p}</code>`).join(" / ")}</dd>
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

    ${d}

    ${s?`<section class="panel"><p class="sync-message">${s}</p></section>`:""}
  `}const ue={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function Rc(e,t,n){const s=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:ue.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:ue.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:ue.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:ue.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:ue.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:ue.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:ue.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:ue.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:ue.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:ue.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:ue.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:ue.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:ue.date}];e.lines.slice(0,6).forEach((d,p)=>{const u=33+p*8.5;s.push({id:`line${p}_name`,label:`明細${p+1} 品名`,x:5,y:u,fontSize:7.5,value:d.productName+(d.spec?` ${d.spec}`:""),color:ue.detail},{id:`line${p}_code`,label:`明細${p+1} CD`,x:64,y:u,fontSize:7.5,value:d.productCode,color:ue.detail},{id:`line${p}_qty`,label:`明細${p+1} 数量`,x:124,y:u,fontSize:8,value:d.quantity>0?String(d.quantity):"",color:ue.detail},{id:`line${p}_price`,label:`明細${p+1} 原単価`,x:163,y:u,fontSize:8,value:d.unitPrice>0?d.unitPrice.toLocaleString("ja-JP"):"",color:ue.detail},{id:`line${p}_amount`,label:`明細${p+1} 原価金額`,x:176,y:u,fontSize:8,value:d.amount>0?d.amount.toLocaleString("ja-JP"):"",color:ue.detail},{id:`line${p}_retail`,label:`明細${p+1} 売単価`,x:193,y:u,fontSize:8,value:d.retailPrice?d.retailPrice.toLocaleString("ja-JP"):"",color:ue.detail})});const r=e.lines.reduce((d,p)=>d+(p.amount||0),0),l=e.lines.reduce((d,p)=>d+p.quantity,0);return s.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(l),color:ue.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:ue.total}),n&&s.forEach(d=>{const p=n[d.id];p&&(d.x=p.x,d.y=p.y)}),s}function Oc(e,t,n,s,r){const d=Rc(e,t,s).map(u=>`
      <div class="fd-field ${r?"fd-draggable":""}"
           data-fd-id="${u.id}"
           style="left:${u.x}mm; top:${u.y}mm; font-size:${u.fontSize}pt; --fd-color:${u.color};"
           title="${u.label} (${u.x.toFixed(1)}, ${u.y.toFixed(1)})">
        ${r?`<span class="fd-badge">${u.label}</span>`:""}
        <span class="fd-value">${u.value}</span>
      </div>
    `).join(""),p=n.showReferenceOverlay&&n.overlayImageUrl?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
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
        <div class="fd-canvas" style="${p}">
          ${d}
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
  `}function ra(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const s=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,l=parseFloat(n.style.top)||0;t[s]={x:r,y:l}}),t}function jc(e,t,n){const s=[...new Set(e.map(w=>w.areaCode).filter(Boolean))].sort(),r=[...new Set(e.map(w=>w.businessTypeName||w.businessType).filter(Boolean))].sort(),l=e.filter(w=>w.isAtRisk),d=e.filter(w=>!w.isAtRisk&&w.isDormant),p=e.filter(w=>!w.isAtRisk&&!w.isDormant&&w.amount12m>0),u=e.filter(w=>!w.isAtRisk&&!w.isDormant&&w.amount12m===0),y=t.filter(w=>w.lat&&w.lng),v=JSON.stringify(e),g=JSON.stringify(y.map(w=>({name:w.name,address:w.address,lat:w.lat,lng:w.lng,phone:w.phone})));return`
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
        <div class="kpi-value">${l.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠</div>
        <div class="kpi-value">${d.length}<span class="kpi-sub">社</span></div>
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
      <button class="button ${n.filterStatus==="all"?"primary":"secondary"} small" type="button" data-map-status="all">すべて</button>
      <button class="button ${n.filterStatus==="at-risk"?"primary":"secondary"} small" type="button" data-map-status="at-risk">🔴 離反リスク</button>
      <button class="button ${n.filterStatus==="dormant"?"primary":"secondary"} small" type="button" data-map-status="dormant">🟠 休眠</button>
      <button class="button ${n.filterStatus==="active"?"primary":"secondary"} small" type="button" data-map-status="active">🔵 取引中</button>
      <button class="button ${n.filterStatus==="inactive"?"primary":"secondary"} small" type="button" data-map-status="inactive">⚪ 売上なし</button>
      <select id="map-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${s.map(w=>`<option value="${w}" ${n.filterArea===w?"selected":""}>${w}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${r.map(w=>`<option value="${w}" ${n.filterBiz===w?"selected":""}>${w}</option>`).join("")}
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
      const ALL_CUSTOMERS = ${v};
      const DELIVERIES    = ${g};

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

      let activeStatus = "${n.filterStatus}";
      let activeArea   = "${n.filterArea}";
      let activeBiz    = "${n.filterBiz}";

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
    <\/script>`}const Bc={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},zc=["new","picking","packed","shipped","delivered"];function Fc(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(l=>t[l.stage].push(l));const n=zc.map(l=>{const d=Bc[l],p=t[l];return`
      <div class="wf-col" data-wf-stage="${l}">
        <div class="wf-col-header" style="--wf-color:${d.color};">
          <span class="wf-col-icon">${d.icon}</span>
          <span class="wf-col-label">${d.label}</span>
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
    `}).join(""),s=e.reduce((l,d)=>l+d.totalAmount,0),r=e.filter(l=>l.priority==="urgent").length;return`
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
  `}function Vc(e,t,n){const s=e.cart.reduce((l,d)=>l+d.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((l,d)=>l+d.quantity,0)}<br/>
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

      ${Yc(e,t,n)}
    </div>
  `}function Yc(e,t,n){if(e.step==="customer"){const s=e.customerQuery.toLowerCase(),r=s?t.filter(l=>l.name.toLowerCase().includes(s)||l.code.toLowerCase().includes(s)):t.slice(0,20);return`
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
    `}if(e.step==="products"){const s=e.productQuery.toLowerCase(),r=s?n.filter(l=>l.name.toLowerCase().includes(s)||l.code.toLowerCase().includes(s)):n.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${r.slice(0,50).map(l=>{const d=e.cart.find(p=>p.productCode===l.code);return`
              <div class="mo-item mo-product-item">
                <div style="flex:1;">
                  <div class="mo-item-title">${l.name}</div>
                  <div class="mo-item-sub">${l.category} / JAN ${l.janCode||"―"}</div>
                </div>
                ${d?`<div class="mo-qty-ctrl">
                      <button data-mo-qty="-1" data-mo-product="${l.code}">−</button>
                      <span>${d.quantity}</span>
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
  `}const Pn={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},En={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},An={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function Uc(e,t){const n=e.find(l=>l.id===t)??e[0],s=e.filter(l=>l.status==="new").length,r=e.filter(l=>l.status==="confirmed").length;return`
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
          ${e.map(l=>`
            <button class="tour-item ${n?.id===l.id?"active":""}" data-tour-id="${l.id}">
              <div class="tour-item-head">
                <strong>${l.name}</strong>
                <span class="status-pill ${En[l.status]}">${Pn[l.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${An[l.language]} · 👥 ${l.partySize}名
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
            <span class="status-pill ${En[n.status]}">${Pn[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${An[n.language]}</dd></div>
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
  `}const Jc=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,Qc=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Hc(e,t){const n=t?e.find(r=>r.id===t):null,s=t==="__new__";return`
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
  `}function Kc(e,t,n,s){const[r,l]=t.split("-").map(b=>parseInt(b,10)),d=new Date(r,l-1,1),p=new Date(r,l,0),u=d.getDay(),y=p.getDate(),v=[];for(let b=0;b<u;b++)v.push({isOutside:!0});for(let b=1;b<=y;b++)v.push({date:new Date(r,l-1,b)});for(;v.length%7!==0;)v.push({isOutside:!0});const g=n?e.filter(b=>b.category===n):e,w={};g.forEach(b=>{const x=b.startsAt.slice(0,10);w[x]??=[],w[x].push(b)});const P=new Date().toISOString().slice(0,10),A=v.map(b=>{if(b.isOutside)return'<div class="cal-cell cal-outside"></div>';const x=b.date,$=`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}-${String(x.getDate()).padStart(2,"0")}`,E=w[$]??[],k=$===P,S=x.getDay();return`
        <div class="cal-cell ${k?"cal-today":""} ${S===0?"cal-sun":S===6?"cal-sat":""}"
             data-cal-date="${$}">
          <div class="cal-day-num">${x.getDate()}</div>
          <div class="cal-events">
            ${E.slice(0,3).map(C=>`
              <button class="cal-event" data-cal-event-id="${C.id}"
                      style="background:${C.color||Ja[C.category]||"#0F5B8D"};"
                      title="${C.title}">
                <span class="cal-event-time">${C.isAllDay?"終日":new Date(C.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${C.title}</span>
              </button>
            `).join("")}
            ${E.length>3?`<button class="cal-event-more" data-cal-date="${$}">+${E.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),R=s?.isOpen?Gc(s):"",o=new Date(r,l-2,1),i=new Date(r,l,1),c=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}`,m=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`,h=(()=>{const b=new Date;return`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`})();return`
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
          <button class="button secondary" data-action="cal-prev" data-ym="${c}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${h}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${m}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(Ua).map(([b,x])=>`<option value="${b}" ${n===b?"selected":""}>${x}</option>`).join("")}
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
        ${A}
      </div>
    </section>

    ${R}
  `}function Gc(e){const t=e.event;return`
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
                ${Object.entries(Ua).map(([n,s])=>`<option value="${n}" ${t.category===n?"selected":""}>${s}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?Ln(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?Ln(t.endsAt):""}" />
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
  `}function Ln(e){const t=new Date(e),n=s=>String(s).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const yt={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function Wc(e,t){const n=t?e.find(s=>s.id===t):null;return`
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
        <p class="form-hint">${yt[n.provider]?.description??""}</p>
        ${yt[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${yt[n.provider].setupUrl}" target="_blank">${yt[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(yt[n.provider]?.fields??[]).map(s=>`
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
  `}function Xc(e,t){const n=e.reduce((l,d)=>l+d.totalAmount,0),s=e.filter(l=>l.financialStatus==="paid").length,r=e.filter(l=>l.fulfillmentStatus!=="fulfilled"&&l.fulfillmentStatus!=="shipped").length;return`
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
                <td style="font-size:12px;">${l.lineItems.map(d=>`${d.name} ×${d.quantity}`).join("<br/>")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Zc(e,t,n){return`
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
  `}function ed(e,t,n){const s=t==="__new__"?null:e.find(d=>d.id===t),r=t==="__new__";return n?.role==="admin"?`
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
        <p class="kpi-sub">有効 ${e.filter(d=>d.isActive).length}名</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">管理者</p>
        <p class="kpi-value">${e.filter(d=>d.role==="admin").length}名</p>
        <p class="kpi-sub">全権アクセス</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">部署数</p>
        <p class="kpi-value">${new Set(e.map(d=>d.department)).size}</p>
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
            ${e.map(d=>`
              <tr ${d.isActive?"":'style="opacity:0.5;"'}>
                <td class="mono">${d.staffCode??"―"}</td>
                <td><strong>${d.displayName}</strong>${d.id===n?.id?'<span style="color:var(--primary);font-size:11px;"> (あなた)</span>':""}</td>
                <td class="mono" style="font-size:12px;">${d.email}</td>
                <td>${Vt[d.department]}</td>
                <td>${Ft[d.role]}</td>
                <td style="font-size:12px;">${d.lastSignInAt?d.lastSignInAt.slice(0,16).replace("T"," "):"―"}</td>
                <td>${d.isActive?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}</td>
                <td>
                  <button class="button-sm secondary" data-action="user-edit" data-id="${d.id}">編集</button>
                  ${d.id!==n?.id?`<button class="button-sm secondary" data-action="user-delete" data-id="${d.id}" style="color:var(--danger);">削除</button>`:""}
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
              ${Object.entries(Vt).map(([d,p])=>`<option value="${d}" ${s?.department===d?"selected":""}>${p}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Ft).map(([d,p])=>`<option value="${d}" ${s?.role===d?"selected":""}>${p}</option>`).join("")}
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
    `}function td(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${Vt[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Ft[e.role]}</dd></div>
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
    `}function ad(e){const t={};return e.forEach(n=>{const s=n.userEmail??"(anonymous)";t[s]=(t[s]??0)+1}),`
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
  `}function nd(e){const t=e.prospects.reduce((l,d)=>l+d.expectedAmount,0),n=e.prospects.reduce((l,d)=>l+d.expectedAmount*d.probability/100,0),s=e.prospects.filter(l=>l.stage==="won").length,r=e.prospects.filter(l=>l.stage==="hot"||l.stage==="negotiating").length;return`
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

    ${e.viewMode==="kanban"?sd(e.prospects):od(e.prospects)}

    ${rd(e)}
  `}function sd(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(s=>{const r=e.filter(d=>d.stage===s),l=r.reduce((d,p)=>d+p.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${s}">
          <div class="pk-col-header" style="--pk-color:${Qa[s]};">
            <span class="pk-col-label">${Gt[s]}</span>
            <span class="pk-col-count">${r.length}</span>
          </div>
          <div class="pk-col-sub">¥${l.toLocaleString("ja-JP")}</div>
          <div class="pk-col-body">
            ${r.length===0?'<div class="wf-empty">―</div>':r.map(d=>`
              <div class="pk-card" data-prospect-id="${d.id}" draggable="true">
                <div class="pk-card-company">${d.companyName}</div>
                <div class="pk-card-meta">${d.businessType??""} ${d.contactName?"· "+d.contactName:""}</div>
                <div class="pk-card-amount">¥${d.expectedAmount.toLocaleString("ja-JP")} <span style="color:var(--text-secondary);">(${d.probability}%)</span></div>
                ${d.nextAction?`<div class="pk-card-action">🎯 ${d.nextAction}${d.nextActionDate?" ("+d.nextActionDate+")":""}</div>`:""}
                ${d.assignedStaffCode?`<div class="pk-card-staff">👤 ${d.assignedStaffCode}</div>`:""}
                <div style="margin-top:6px;" onclick="event.stopPropagation()">
                  <button class="button-sm secondary" data-action="prospect-quote-create"
                    data-id="${d.id}" data-name="${d.companyName.replace(/"/g,"&quot;")}"
                    data-addr="${(d.address??"").replace(/"/g,"&quot;")}"
                    style="font-size:11px;padding:2px 8px;">見積作成</button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `}).join("")}</div>
    </section>
  `}function od(e){return`
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
                <td><span class="status-pill" style="background:${Qa[t.stage]};color:white;">${Gt[t.stage]}</span></td>
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
  `}function rd(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(s=>s.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(Gt).map(([s,r])=>`<option value="${s}" ${n?.stage===s?"selected":""}>${r}</option>`).join("")}
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
  `}function id(e,t,n){const s=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
            ${t.map(l=>`
              <tr>
                <td>${Yt[l.eventType]||l.eventType}</td>
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
                <td>${Yt[l.eventType]||l.eventType}</td>
                <td class="mono" style="font-size:12px;">${l.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${l.message}</td>
                <td><span class="status-pill ${l.status==="sent"?"success":"warning"}">${l.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function ld(e,t,n,s){const r=new Map(t.map(g=>[g.code,g])),l=e.filter(g=>g.callDirection==="inbound").length,d=e.filter(g=>g.callDirection==="outbound").length,p=e.filter(g=>g.callStatus==="missed").length,u=e.reduce((g,w)=>g+(w.durationSeconds??0),0),y=g=>{if(g===0)return"―";const w=Math.floor(g/60),P=g%60;return w>0?`${w}分${P}秒`:`${P}秒`},v=g=>{if(g.matchedCustomerCode){const w=r.get(g.matchedCustomerCode);if(w)return`${w.name} (既存)`}return"未登録番号"};return`
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
        <p class="kpi-value">${l}件</p>
        <p class="kpi-sub">不在 ${p}件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">発信</p>
        <p class="kpi-value">${d}件</p>
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
                  <strong>${v(g)}</strong>
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
  `}const cd=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function dd(e){const t=e.activeListId?e.lists.find(l=>l.id===e.activeListId):null,n=e.items.filter(l=>l.status==="new").length,s=e.items.filter(l=>l.status==="imported").length,r=e.items.filter(l=>l.status==="excluded").length;return`
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
            ${cd.map(l=>`<option value="${l}" ${e.searchBusinessType===l?"selected":""}>${l}</option>`).join("")}
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
                ${e.searchResults.map((l,d)=>`
                  <tr>
                    <td><input type="checkbox" class="lb-search-check" data-idx="${d}" checked /></td>
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
  `}const Cn={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},pd={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},ud={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function we(e){return"¥"+e.toLocaleString("ja-JP")}function xt(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Ys(e,t){const n=e.reduce((l,d)=>l+d.amount,0),s=Math.floor(n*t),r=n+s;return{subtotal:n,taxAmount:s,total:r}}const ce={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function pe(e,t){const n=e.align??"left",s=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${s}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function ia(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),s=n-2018;return{y:s>0?String(s).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function md(e,t,n){const s=ia(e.documentDate),r=ia(e.orderDate??e.documentDate),l=ia(e.deliveryDate??e.documentDate),d=e.lines.slice(0,6).map((o,i)=>{const c=ce.detailStartY+i*ce.detailRowH,m=ce.detailCols,h=[],b=(x,$)=>{$&&h.push(pe({...x,y:c,x:x.x+0},$))};return b(m.productName,o.productName+(o.spec?` ${o.spec}`:"")),b(m.productCode,o.productCode),b(m.color,o.color??""),b(m.size,[o.size,o.caseQty?`×${o.caseQty}`:""].filter(Boolean).join(" ")),b(m.unit,o.unit),b(m.quantity,o.quantity>0?o.quantity.toLocaleString("ja-JP"):""),b(m.correctedQty,o.correctedQuantity?o.correctedQuantity.toLocaleString("ja-JP"):""),b(m.discount,o.discount?o.discount.toLocaleString("ja-JP"):""),b(m.unitPrice,o.unitPrice>0?o.unitPrice.toLocaleString("ja-JP"):""),b(m.costAmount,o.amount>0?o.amount.toLocaleString("ja-JP"):""),b(m.retailPrice,o.retailPrice?o.retailPrice.toLocaleString("ja-JP"):""),b(m.note,o.receivedAmount?o.receivedAmount.toLocaleString("ja-JP"):""),h.join("")}).join(""),p=e.lines.reduce((o,i)=>o+(i.amount||0),0),u=e.lines.reduce((o,i)=>o+(i.retailPrice||0)*(i.correctedQuantity??i.quantity),0),y=e.lines.reduce((o,i)=>o+(i.receivedAmount||0),0),v=e.lines.reduce((o,i)=>o+(i.returnAmount||0),0),g=e.lines.reduce((o,i)=>o+i.quantity,0),w=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",P=n.calibrationOffsetX||0,A=n.calibrationOffsetY||0,R=`transform: translate(${P}mm, ${A}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${w}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${R}">
        ${pe(ce.currentDateY,s.y)}
        ${pe(ce.currentDateM,s.m)}
        ${pe(ce.currentDateD,s.d)}
        ${pe(ce.documentNo,e.documentNo)}
        ${e.settlementPrint?pe(ce.settlementCheck,"✓"):""}

        ${pe(ce.vendorName,t.name)}
        ${pe(ce.vendorAddress,t.address1)}
        ${pe(ce.chainStoreCode,e.chainStoreCode??"")}
        ${pe(ce.categoryCode,e.categoryCode??"")}
        ${pe(ce.slipNumber,e.documentNo)}
        ${pe(ce.vendorCode,e.slipTypeCode??"")}

        ${pe(ce.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${pe(ce.orderDateY,r.y)}
        ${pe(ce.orderDateM,r.m)}
        ${pe(ce.orderDateD,r.d)}
        ${pe(ce.deliveryDateY,l.y)}
        ${pe(ce.deliveryDateM,l.m)}
        ${pe(ce.deliveryDateD,l.d)}
        ${pe(ce.orderNo,e.orderNo??"")}
        ${pe(ce.partnerCode,e.vendorCode??"")}

        ${d}

        ${pe(ce.totalQty,g.toLocaleString("ja-JP"))}
        ${pe(ce.receivedTotal,y.toLocaleString("ja-JP"))}
        ${pe(ce.returnTotal,v.toLocaleString("ja-JP"))}
        ${pe(ce.correctedCostTotal,p.toLocaleString("ja-JP"))}
        ${pe(ce.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function yd(e,t,n){const{subtotal:s,taxAmount:r,total:l}=Ys(e.lines,e.taxRate),d=e.previousBalance??0,p=e.paymentAmount??0,u=d-p+l,y=e.lines.map(g=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${g.note??""}</td>
        <td>${g.productName}${g.spec?` <span style="color:#636e72;font-size:9pt;">/ ${g.spec}</span>`:""}</td>
        <td class="numeric">${g.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${g.unit}</td>`:""}
        <td class="numeric">${we(g.unitPrice)}</td>
        <td class="numeric">${we(g.amount)}</td>
      </tr>
    `).join(""),v=Array.from({length:Math.max(0,6-e.lines.length)}).map(()=>`
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
        <div><dt>請求日</dt><dd>${xt(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${xt(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${we(u)}</span>
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
        <tbody>${y}${v}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${we(s)} / 消費税: ${we(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${d?`<tr><th>前回御請求額</th><td>${we(d)}</td></tr>`:""}
          ${p?`<tr><th>ご入金額</th><td>▲ ${we(p)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${we(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${we(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${we(u)}</td></tr>
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
  `}function hd(e,t,n){const{subtotal:s,taxAmount:r,total:l}=Ys(e.lines,e.taxRate),d=e.lines.map(u=>`
      <tr>
        <td>${u.productName}${u.spec?` <span style="color:#636e72;font-size:9pt;">/ ${u.spec}</span>`:""}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${u.unit}</td>`:""}
        <td class="numeric">${we(u.unitPrice)}</td>
        <td class="numeric">${we(u.amount)}</td>
      </tr>
    `).join(""),p=Array.from({length:Math.max(0,5-e.lines.length)}).map(()=>`
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
        <div><dt>見積日</dt><dd>${xt(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${xt(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${we(l)}</span>
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
        <tbody>${d}${p}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${we(s)} / 消費税: ${we(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${we(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${we(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${we(l)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?xt(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function fd(e,t,n,s){let r="";switch(e){case"chain_store":r=md(s,n,t);break;case"quotation":r=hd(s,n,t);break;case"invoice_monthly":r=yd(s,n,t);break}const l=Object.keys(Cn).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${Cn[u]}</button>`).join(""),d=s.lines.map((u,y)=>`
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
              <tbody>${d||'<tr><td colspan="5" class="empty-row">行追加してください</td></tr>'}</tbody>
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
  `}const gd={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},vd={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Us(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],s="",r=!1;for(let p=0;p<e.length;p++){const u=e[p];r?u==='"'?e[p+1]==='"'?(s+='"',p++):r=!1:s+=u:u==='"'?r=!0:u===","?(n.push(s),s=""):u===`
`||u==="\r"?(u==="\r"&&e[p+1]===`
`&&p++,n.push(s),n.some(y=>y!=="")&&t.push(n),n=[],s=""):s+=u}if((s!==""||n.length>0)&&(n.push(s),n.some(p=>p!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const l=t[0].map(p=>p.trim()),d=[];for(let p=1;p<t.length;p++){const u={};l.forEach((y,v)=>{u[y]=(t[p][v]??"").trim()}),d.push(u)}return{columns:l,rows:d}}function Js(e,t,n){const s=gd[e],r=s.filter(p=>!t.includes(p)),l=n.map(p=>{const u=[];r.length>0&&u.push(`必須列欠損: ${r.join(",")}`);for(const y of s)t.includes(y)&&!p[y]&&u.push(`${y}が空`);return{...p,_valid:u.length===0,_error:u[0]}}),d=l.filter(p=>p._valid).length;return{entity:e,columns:t,rows:l,totalRows:n.length,validRows:d,invalidRows:l.length-d}}function Qs(e){const n=vd[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function Hs(e,t){const{supabaseInsert:n}=await q(async()=>{const{supabaseInsert:p}=await Promise.resolve().then(()=>Z);return{supabaseInsert:p}},void 0);let s=0,r=0;const d={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const p of t){if(!p._valid)continue;const{_valid:u,_error:y,...v}=p,g={...v};if(!g.id){const w=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";g.id=String(v[w]??`${e}-${Date.now()}-${s+r}`)}for(const w of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof g[w]=="string"&&g[w]!==""){const P=Number(g[w]);Number.isFinite(P)&&(g[w]=P)}try{await n(d,g)!==null?s++:r++}catch{r++}}return{inserted:s,failed:r}}const bd=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:Qs,importToSupabase:Hs,parseCSV:Us,validateImport:Js},Symbol.toStringTag,{value:"Module"}));function la(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function wd(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function xd(e,t,n,s,r){const l=n.reduce((y,v)=>y+v.rowCount,0),d=n.map(y=>y.lastSyncAt).filter(y=>y!==null).sort().reverse()[0]??null,p=100,u=Math.max(1,Math.ceil(r/p));return`
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
        <p class="kpi-value">${d?la(d):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${y.lastSyncAt?la(y.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(y=>y.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${r.toLocaleString("ja-JP")}件中 ${((s-1)*p+1).toLocaleString("ja-JP")}-${Math.min(s*p,r).toLocaleString("ja-JP")} を表示</p>
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
              <td>${y._synced_at?la(y._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${y._raw_b64?y._raw_b64.slice(0,200):""}">${wd(y._raw_b64)}</td>
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
  `}const it=400,lt=240;function te(e){return e.toLocaleString("ja-JP")}function ca(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function $d(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function De(e,t,n,s=""){return`<th class="${s}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${$d(n,t)}</th>`}function ht(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function _d(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const s=e.products.slice().sort((i,c)=>(e.productTotals[c.code]??0)-(e.productTotals[i.code]??0)).slice(0,6),r=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],l=820,d=280,p={top:20,right:20,bottom:40,left:60},u=l-p.left-p.right,y=d-p.top-p.bottom,v=t.map(i=>s.reduce((c,m)=>c+(n[m.code]?.[i]??0),0)),g=Math.max(...v,1),w=u/t.length,P=Math.max(w-10,14),A=[0,.25,.5,.75,1].map(i=>{const c=p.top+y-y*i,m=`${Math.round(g*i/100)*100}`;return`
      <line x1="${p.left}" y1="${c}" x2="${l-p.right}" y2="${c}" class="chart-grid" />
      <text x="6" y="${c+4}" class="chart-axis">${Number(m).toLocaleString("ja-JP")}</text>
    `}).join(""),R=t.map((i,c)=>{let m=p.top+y;const h=p.left+c*w+(w-P)/2,b=s.map((C,L)=>{const T=(n[C.code]?.[i]??0)/g*y;return m-=T,`<rect x="${h}" y="${m}" width="${P}" height="${T}" fill="${r[L%r.length]}" opacity="0.85" rx="${L===s.length-1?3:0}" />`}).join(""),[x,$]=i.split("-"),E=parseInt($),k=E===1||c%3===0,S=E===1?`${x.slice(2)}年`:`${E}月`;return`<g>${b}${k?`<text x="${h+P/2}" y="${d-10}" class="chart-axis centered-axis">${S}</text>`:""}</g>`}).join(""),o=s.map((i,c)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${r[c%r.length]};"></span>
       ${i.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${l} ${d}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${A}${R}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${p.left}px;display:flex;flex-wrap:wrap;">${o}</div>
  `}function Sd(e){const{months:t,products:n}=e,s=n.slice().sort((d,p)=>(e.productTotals[p.code]??0)-(e.productTotals[d.code]??0)).slice(0,50),r=t.map(d=>{const[p,u]=d.split("-"),y=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${y===1?`${p.slice(2)}年1月`:`${y}月`}</th>`}).join(""),l=s.map(d=>{const p=t.map(u=>{const y=e.matrix[d.code]?.[u]??0;return`<td class="numeric">${y>0?te(y):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${d.code}</td>
        <td style="white-space:nowrap;">${d.name}</td>
        ${p}
        <td class="numeric"><strong>${te(e.productTotals[d.code]??0)}</strong></td>
        <td class="numeric">${te(Math.round(e.productAvg[d.code]??0))}</td>
        <td class="numeric">${te(Math.round(e.productStdDev[d.code]??0))}</td>
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
  `}function kd(e,t){const n=e.months[e.months.length-1]??"",s=e.months[e.months.length-2]??"",r=e.months.length-13,l=r>=0?e.months[r]:"",d=e.products.reduce((P,A)=>P+(e.matrix[A.code]?.[n]??0),0),p=e.products.reduce((P,A)=>P+(e.matrix[A.code]?.[s]??0),0),u=l?e.products.reduce((P,A)=>P+(e.matrix[A.code]?.[l]??0),0):0,y=p>0?(d-p)/p*100:0,v=u>0?(d-u)/u*100:0,g=P=>P>=0?"+":"",w=[1,2,3,5].map(P=>`<option value="${P}" ${P===t?"selected":""}>${P}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${te(d)} 本</p>
        <p class="kpi-sub">${ca(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${y>=0?"":"text-danger"}">${g(y)}${y.toFixed(1)}%</p>
        <p class="kpi-sub">${ca(s)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${v>=0?"":"text-danger"}">${u>0?`${g(v)}${v.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${l?`${ca(l)} 比`:"前年データなし"}</p>
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
            <select data-action="demand-years-back" style="width:80px;">${w}</select>
          </label>
          <button class="button secondary" type="button" data-action="demand-csv-export">CSV出力</button>
        </div>
      </div>
      ${_d(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${Sd(e)}
    </section>
  `}function Pd(e,t){const s=e.slice().sort((l,d)=>{if(!t)return 0;const p=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return p*l.productName.localeCompare(d.productName,"ja");case"ss-avg":return p*(l.avgMonthlyDemand-d.avgMonthlyDemand);case"ss-std":return p*(l.demandStdDev-d.demandStdDev);case"ss-ss":{const u=Math.ceil(ht(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(ht(d.serviceLevel)*d.demandStdDev*Math.sqrt(d.leadTimeDays/30));return p*(u-y)}case"ss-rop":{const u=Math.ceil(l.avgMonthlyDemand*(l.leadTimeDays/30)+ht(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(d.avgMonthlyDemand*(d.leadTimeDays/30)+ht(d.serviceLevel)*d.demandStdDev*Math.sqrt(d.leadTimeDays/30));return p*(u-y)}default:return 0}}).map(l=>{const d=ht(l.serviceLevel),p=l.leadTimeDays/30,u=Math.ceil(d*l.demandStdDev*Math.sqrt(p)),y=Math.ceil(l.avgMonthlyDemand*p+u),v=u-l.safetyStockQty,g=v>0?"text-danger":v<-u*.3?"text-warning":"",w=[.9,.95,.99].map(P=>`<option value="${P}" ${Math.abs(l.serviceLevel-P)<.01?"selected":""}>${(P*100).toFixed(0)}%</option>`).join("");return`
      <tr>
        <td style="white-space:nowrap;">${l.productName}</td>
        <td class="numeric">${te(Math.round(l.avgMonthlyDemand))}</td>
        <td class="numeric">${te(Math.round(l.demandStdDev))}</td>
        <td>
          <input class="input-sm" type="number" min="1" max="180"
            value="${l.leadTimeDays}"
            data-action="ss-lead-time" data-code="${l.productCode}"
            style="width:60px;text-align:right;" />
        </td>
        <td>
          <select class="input-sm" data-action="ss-service-level" data-code="${l.productCode}"
            style="width:64px;">${w}</select>
        </td>
        <td class="numeric"><strong>${te(u)}</strong></td>
        <td class="numeric">${te(y)}</td>
        <td class="numeric ${g}">
          ${v>0?`+${te(v)}`:te(v)}
          ${v>0?'<span class="status-pill warning" style="margin-left:4px">不足</span>':""}
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
              ${De("商品名","ss-name",t)}
              ${De("月平均需要","ss-avg",t,"numeric")}
              ${De("標準偏差","ss-std",t,"numeric")}
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              ${De("安全在庫[算出]","ss-ss",t,"numeric")}
              ${De("発注点","ss-rop",t,"numeric")}
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const Ed={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function Ad(e,t,n,s){const r={draft:"下書き",confirmed:"確定",actual:"実績入力済"},l={draft:"neutral",confirmed:"info",actual:"success"},d=$=>Object.entries(Ed).map(([E,k])=>`<option value="${E}" ${E===$?"selected":""}>${k}</option>`).join(""),p=640,u=$=>$.map(E=>{const k=Math.max(0,E.demandForecast+E.safetyStockTarget-E.openingStock),S=E.plannedQty>0?E.plannedQty:Math.round(k),C=S>0?Math.ceil(S/p*10)/10:0,L=E.plannedQty>0?(E.actualQty-E.plannedQty)/E.plannedQty*100:null,I=L!==null?L>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${E.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${E.productCode}"
            style="width:92px;">${d(E.productionType)}</select>
        </td>
        <td class="numeric">${te(Math.round(E.demandForecast))}</td>
        <td class="numeric">${te(Math.round(E.safetyStockTarget))}</td>
        <td class="numeric">${te(Math.round(E.openingStock))}</td>
        <td class="numeric"><strong>${te(Math.round(k))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${E.plannedQty}"
            data-action="plan-qty" data-code="${E.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">${E.actualQty>0?te(E.actualQty):"—"}</td>
        <td class="numeric ${I}">
          ${L!==null?`${L>=0?"+":""}${L.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${C>0?`${C.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${l[E.status]??"neutral"}">${r[E.status]??E.status}</span>
        </td>
      </tr>
    `}).join(""),v=(n==="all"?e:e.filter($=>$.productionType===n)).slice().sort(($,E)=>{if(!s)return 0;const k=s.dir==="asc"?1:-1,S=Math.max(0,$.demandForecast+$.safetyStockTarget-$.openingStock),C=Math.max(0,E.demandForecast+E.safetyStockTarget-E.openingStock);switch(s.column){case"plan-name":return k*$.productName.localeCompare(E.productName,"ja");case"plan-forecast":return k*($.demandForecast-E.demandForecast);case"plan-required":return k*(S-C);case"plan-planned":return k*($.plannedQty-E.plannedQty);case"plan-actual":return k*($.actualQty-E.actualQty);case"plan-label":{const L=$.plannedQty>0?$.plannedQty:Math.round(S),I=E.plannedQty>0?E.plannedQty:Math.round(C);return k*(L-I)}default:return 0}}),g=u(v),w=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],P=$=>{const k=($==="all"?e:e.filter(S=>S.productionType===$)).reduce((S,C)=>{const L=Math.max(0,C.demandForecast+C.safetyStockTarget-C.openingStock);return S+(C.plannedQty>0?C.plannedQty:Math.round(L))},0);return Math.ceil(k/p*10)/10},A=w.filter($=>$.key!=="all").map($=>{const E=P($.key),k=e.filter(C=>C.productionType===$.key).length,S=$.key==="make_to_order"?e.filter(C=>C.productionType==="make_to_order"&&C.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${$.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${E>0?E.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${k}商品${S!==null?` · 受注${S}件`:""}</p>
      </div>
    `}).join(""),R=v.reduce(($,E)=>$+E.demandForecast,0),o=v.reduce(($,E)=>$+Math.max(0,E.demandForecast+E.safetyStockTarget-E.openingStock),0),i=v.reduce(($,E)=>$+E.plannedQty,0),c=v.reduce(($,E)=>$+E.actualQty,0),m=P(n),h=new Date,b=Array.from({length:24},($,E)=>{const k=new Date(h.getFullYear(),h.getMonth()-6+E,1),S=`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`;return`<option value="${S}" ${S===t?"selected":""}>${S.replace("-","年")}月</option>`}).join(""),x=w.map($=>`<button class="button ${n===$.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${$.key}"
       style="padding:4px 12px;font-size:13px;">${$.label}</button>`).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${b}</select>
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
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${A}</div>
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
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${x}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${De("商品名","plan-name",s)}
              <th>生産区分</th>
              ${De("需要予測","plan-forecast",s,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${De("必要生産数","plan-required",s,"numeric")}
              ${De("計画数","plan-planned",s,"numeric")}
              ${De("実績数","plan-actual",s,"numeric")}
              <th class="numeric">達成率</th>
              ${De("ラベル工数","plan-label",s,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${g||'<tr><td colspan="11" class="empty-row">データなし</td></tr>'}
            ${v.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${te(Math.round(R))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${te(Math.round(o))}</td>
                <td class="numeric">${te(i)}</td>
                <td class="numeric">${c>0?te(c):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${m.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ks(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n,0).getDate();return Array.from({length:s},(r,l)=>{const d=l+1;return`${e}-${String(d).padStart(2,"0")}`})}function Dn(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function qn(e){const t=new Date(e).getDay();return t===0||t===6}function Ld(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function Gs(e){return e.partTimers+e.employees}function qe(e,t,n={partCapacity:it,empCapacity:lt}){const s=e.filter(v=>v.partTimers>0||v.employees>0);if(s.length===0)return;const r=t.reduce((v,g)=>{const w=g.plannedQty>0?g.plannedQty:Math.max(0,g.demandForecast+g.safetyStockTarget-g.openingStock);return v+w},0);if(r<=0)return;const l=r/s.length;let d=0,p=0,u=1/0;const y=Math.ceil(l/n.partCapacity);for(let v=0;v<=y;v++){const g=l-v*n.partCapacity,w=g>0?Math.ceil(g/n.empCapacity):0,P=v+w;P<u&&(u=P,d=v,p=w)}for(const v of e)v.confirmed||(v.partTimers>0||v.employees>0)&&(v.partTimers=d,v.employees=p)}function Cd(e,t,n={partCapacity:it,empCapacity:lt}){const s=t.filter(p=>Gs(p)>0).map(p=>p.date).sort();if(s.length===0)return t.map(p=>({date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const r={monthly:0,november:1,annual:2,make_to_order:3},l=e.filter(p=>p.plannedQty>0||Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)>0).map(p=>({productCode:p.productCode,productName:p.productName,productionType:p.productionType,remaining:p.plannedQty>0?p.plannedQty:Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)})).filter(p=>p.remaining>0).sort((p,u)=>(r[p.productionType]??99)-(r[u.productionType]??99)||u.remaining-p.remaining),d=new Map;for(const p of t){const u=Ld(p,n);d.set(p.date,{date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const p of l){let u=p.remaining;if(u<=0)continue;if(s.reduce((v,g)=>{const w=d.get(g);return v+Math.max(0,w.capacity-w.totalQty)},0)<=0)break;for(const v of s){if(u<=0)break;const g=d.get(v),w=Math.max(0,g.capacity-g.totalQty);if(w<=0)continue;const P=Math.min(u,w);g.items.push({productCode:p.productCode,productName:p.productName,productionType:p.productionType,qty:P}),g.totalQty+=P,g.utilization=g.capacity>0?g.totalQty/g.capacity:0,u-=P}}return t.map(p=>d.get(p.date))}function zt(e,t=1,n=1){return Ks(e).map(s=>({date:s,partTimers:qn(s)?0:t,employees:qn(s)?0:n,confirmed:!1}))}function Dd(e,t,n,s=null,r=new Set,l={partCapacity:it,empCapacity:lt}){const d=Ks(t),p=e.filter(L=>!r.has(L.productCode)),u=Cd(p,n,l),y=new Map(u.map(L=>[L.date,L])),v=p.reduce((L,I)=>L+(I.plannedQty>0?I.plannedQty:Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock)),0),w=e.reduce((L,I)=>L+(I.plannedQty>0?I.plannedQty:Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock)),0)-v,P=u.reduce((L,I)=>L+I.totalQty,0),A=n.filter(L=>Gs(L)>0).length,R=u.reduce((L,I)=>L+I.capacity,0),o=n.reduce((L,I)=>L+I.partTimers,0),i=n.reduce((L,I)=>L+I.employees,0),c=A>0?Math.ceil(v/A):0,m=new Date,h=Array.from({length:24},(L,I)=>{const T=new Date(m.getFullYear(),m.getMonth()-6+I,1),j=`${T.getFullYear()}-${String(T.getMonth()+1).padStart(2,"0")}`;return`<option value="${j}" ${j===t?"selected":""}>${j.replace("-","年")}月</option>`}).join(""),b=new Date(d[0]).getDay(),x=[];for(let L=0;L<b;L++)x.push('<div style="min-height:44px;"></div>');for(const L of d){const I=y.get(L),T=new Date(L).getDay(),j=parseInt(L.split("-")[2]),M=I?.partTimers??0,z=I?.employees??0,F=M+z,B=I?.totalQty??0,U=I?.utilization??0,J=L===s,H=F===0?"var(--surface-alt)":U>.95?"rgba(197,61,61,0.12)":U>.7?"rgba(183,121,31,0.10)":U>0?"rgba(47,133,90,0.08)":"var(--surface)",K=F===0?"transparent":U>.95?"#c53d3d":U>.7?"#b7791f":U>0?"#2f855a":"var(--border)",G=T===0?"#c53d3d":T===6?"#0F5B8D":"var(--text)",de=F>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${M>0?`パ${M}`:""}${z>0?`社${z}`:""}</span>`:"";x.push(`
      <div data-action="cal-toggle-day" data-date="${L}"
        style="min-height:44px;padding:3px;border:${J?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${H};cursor:pointer;display:flex;flex-direction:column;
          ${J?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${G};line-height:1;">${j}</span>
          ${de}
        </div>
        ${F>0?`
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${B>0?te(B):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(U*100,100)}%;background:${K};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const E=x.length%7;if(E>0)for(let L=0;L<7-E;L++)x.push('<div style="min-height:44px;"></div>');const k=s?y.get(s):null;s&&n.find(L=>L.date===s);const S=s&&k?(()=>{const L=k,I=parseInt(s.split("-")[2]),T=Dn(s),j=Math.round(L.utilization*100),M=n.find(Y=>Y.date===s),z=s===new Date().toISOString().slice(0,10),F={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},B={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},U=L.items.map(Y=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${F[Y.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${Y.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${B[Y.productionType]??Y.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${te(Y.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),J=`パ${L.partTimers}×${l.partCapacity} 社${L.employees}×${l.empCapacity} = ${te(L.capacity)}本`,H=L.totalQty>0?Math.ceil(L.totalQty/l.partCapacity):0,K=[];if(L.totalQty>0)for(let Y=0;Y<=H;Y++){const Q=L.totalQty-Y*l.partCapacity;if(Q<=0){K.push({p:Y,e:0});break}const X=Math.ceil(Q/l.empCapacity);K.push({p:Y,e:X})}const G=L.totalQty-L.capacity,de=L.totalQty===0?"":G>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${te(G)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',se=K.filter(Y=>Y.p+Y.e>0).sort((Y,Q)=>Y.p+Y.e-(Q.p+Q.e)).slice(0,3),le=L.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${te(L.totalQty)}本を収めるには ${de}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${se.map((Y,Q)=>{const X=Y.p===L.partTimers&&Y.e===L.employees;return`<button data-action="cal-apply-pattern" data-date="${s}" data-part="${Y.p}" data-emp="${Y.e}"
              style="font-size:11px;padding:4px 10px;border:1px solid ${X?"#2f855a":"var(--border)"};
                border-radius:4px;background:${X?"rgba(47,133,90,0.08)":"var(--surface)"};
                cursor:pointer;white-space:nowrap;${X?"font-weight:600;":""}">
              パ${Y.p}社${Y.e}＝${Y.p+Y.e}人
              <span style="color:var(--text-secondary);margin-left:2px;">${te(Y.p*l.partCapacity+Y.e*l.empCapacity)}本</span>
            </button>`}).join("")}
        </div>
      </div>
    `:"";return`
      <section class="panel" style="margin-top:12px;border:2px solid ${z?"#2f855a":"#0F5B8D"};">
        <div style="padding:12px 16px 8px;${z?"background:rgba(47,133,90,0.06);":""}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            ${z?'<span style="background:#2f855a;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;">TODAY</span>':""}
            <h2 style="margin:0;font-size:16px;">${I}日（${T}）${z?"":"の生産内訳"}</h2>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${J} ・ 稼働率${j}%</div>
          ${L.totalQty>0?`<div style="font-size:20px;font-weight:700;margin-top:6px;">${te(L.totalQty)}<span style="font-size:13px;font-weight:400;">本</span> <span style="font-size:13px;font-weight:400;">/ ${L.items.length}品</span></div>`:""}
        </div>
        ${le}
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
        ${L.items.length>0?`
          <div style="padding:0 4px;">
            ${U}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${te(L.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():s?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(s.split("-")[2])}日（${Dn(s)}）— 休日</p>
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
  `:"",C=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(L=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${L.color};"></span>${L.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${h}</select>
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
      <div><strong>${te(Math.round(v))}</strong>本 ÷ <strong>${A}</strong>稼働日 = 日当たり<strong>${te(c)}</strong>本</div>
      <div>→ パ<strong>${o}</strong> 社<strong>${i}</strong>人日 ・ キャパ<strong>${te(R)}</strong>本
        ${P<v?` <span style="color:#c53d3d;">（${te(Math.round(v-P))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
      </div>
      <div style="color:var(--text-secondary);font-size:10px;">日付タップで稼働ON/OFF → 人数自動計算</div>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${C}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((L,I)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${I===0?"#c53d3d":I===6?"#0F5B8D":"var(--text-secondary)"};">${L}</div>`).join("")}
        ${x.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">日付タップで稼働ON/OFF</p>
    </section>

    ${S}

    <section class="panel" style="margin-top:12px;" id="cal-label-section">
      <div class="panel-header" style="padding-bottom:4px;">
        <div>
          <h2 style="font-size:14px;">ラベル対象商品</h2>
          <p class="panel-caption">区分ごとにまとめて外す or 個別に外せます${r.size>0?`（<strong>${r.size}</strong>品除外中 = ${te(Math.round(w))}本）`:""}</p>
        </div>
        <button class="button primary" type="button" data-action="cal-save-exclusions"
          style="padding:6px 14px;font-size:12px;">設定を保存</button>
      </div>
      <div id="cal-label-list" style="max-height:500px;overflow-y:auto;">
        ${(()=>{const L=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],I=new Map;for(const T of e){if((T.plannedQty>0?T.plannedQty:Math.max(0,T.demandForecast+T.safetyStockTarget-T.openingStock))<=0)continue;const M=T.productionType||"monthly";I.has(M)||I.set(M,[]),I.get(M).push(T)}return L.filter(T=>I.has(T.key)).map(T=>{const j=I.get(T.key),M=j.reduce((J,H)=>J+(H.plannedQty>0?H.plannedQty:Math.max(0,H.demandForecast+H.safetyStockTarget-H.openingStock)),0),z=j.filter(J=>r.has(J.productCode)).length,F=z===j.length,B=z===0,U=j.map(J=>{const H=J.plannedQty>0?J.plannedQty:Math.max(0,J.demandForecast+J.safetyStockTarget-J.openingStock),K=r.has(J.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${K?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${J.productCode}"
                    ${K?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${K?"text-decoration:line-through;":""}">${J.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${te(Math.round(H))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${T.key}"
                    ${F?"":"checked"} ${!B&&!F?'class="indeterminate"':""}
                    style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${T.color};flex-shrink:0;"></span>
                  <div style="flex:1;font-size:13px;font-weight:600;">${T.label}<span style="font-weight:400;color:var(--text-secondary);margin-left:6px;">${j.length}品 ${te(Math.round(M))}本</span></div>
                  ${z>0&&!F?`<span style="font-size:11px;color:#b7791f;">${z}品除外</span>`:""}
                  ${F?'<span style="font-size:11px;color:var(--text-secondary);">全除外</span>':""}
                </div>
                ${U}
              </div>
            `}).join("")})()}
      </div>
    </section>
  `}function qd(e,t,n,s,r,l,d="all",p=null,u=[],y=null,v=new Set,g={partCapacity:it,empCapacity:lt}){const P=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(R=>`<button class="tab-button ${s===R.key?"active":""}"
       data-demand-tab="${R.key}">${R.label}</button>`).join("");let A="";if(s==="demand")A=e?kd(e,l):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(s==="safety")A=Pd(t,p);else if(s==="plan")A=Ad(n,r,d,p);else if(s==="calendar")try{A=Dd(n,r,u,y,v,g)}catch(R){console.error("[renderCalendarTab] error:",R),A=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(R)}
${R?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${P}
    </div>

    ${A}
  `}const ze={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Me=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function ne(e){return e.toLocaleString("ja-JP")}function ye(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function Wa(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function Id(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function Xa(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function Td(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(o=>o.month))].sort(),n=Me.filter(o=>e.some(i=>i.brewCategory===o)),s={};for(const o of e)s[o.month]||(s[o.month]={}),s[o.month][o.brewCategory]=o.shipmentMl;const r=820,l=300,d={top:20,right:20,bottom:50,left:70},p=r-d.left-d.right,u=l-d.top-d.bottom,y=t.map(o=>n.reduce((i,c)=>i+(s[o]?.[c]??0),0)),v=Math.max(...y,1),g=p/t.length,w=Math.max(g-8,14),P=[0,.25,.5,.75,1].map(o=>{const i=d.top+u-u*o,c=v*o/1e3;return`
      <line x1="${d.left}" y1="${i}" x2="${r-d.right}" y2="${i}" class="chart-grid" />
      <text x="6" y="${i+4}" class="chart-axis">${Math.round(c).toLocaleString("ja-JP")}L</text>
    `}).join(""),A=t.map((o,i)=>{let c=d.top+u;const m=d.left+i*g+(g-w)/2,h=n.map(S=>{const C=s[o]?.[S]??0,L=C/v*u;return c-=L,L>0?`<rect x="${m}" y="${c}" width="${w}" height="${L}" fill="${ze[S]??"#9ca3af"}" opacity="0.85" rx="1"><title>${S}: ${ye(C)}L</title></rect>`:""}).join(""),[b,x]=o.split("-"),$=parseInt(x),E=$===10||i%2===0,k=$===10?`${b}年度`:`${$}月`;return`<g>${h}${E?`<text x="${m+w/2}" y="${l-12}" class="chart-axis centered-axis" style="font-size:10px;">${k}</text>`:""}</g>`}).join(""),R=n.map(o=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${ze[o]??"#9ca3af"};"></span>
       ${o}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${l}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${P}${A}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${d.left}px;display:flex;flex-wrap:wrap;">${R}</div>
  `}function Md(e,t,n,s){const r=new Map;for(const p of e){const u=p.brewCategory;r.has(u)||r.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const y=r.get(u);y.rows.push(p),y.totalMl+=p.totalShipmentMl,y.avgMl+=p.monthlyAvgMl,y.stockL=p.currentStockL}const l=new Map;for(const p of t)l.has(p.brewCategory)||l.set(p.brewCategory,[]),l.get(p.brewCategory).push(p);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${Me.filter(p=>r.has(p)).map(p=>{const u=r.get(p),y=ze[p]??"#9ca3af",v=Xa(p);l.get(p);const g=n[p]??{rawAlcoholPct:18,targetAlcoholPct:15},w=g.targetAlcoholPct>0?g.rawAlcoholPct/g.targetAlcoholPct:1;u.stockL*1e3;const P=u.totalMl,A=u.avgMl,R=P/1e3,o=Math.round(u.stockL*w*10)/10,i=o*1e3,c=A>0?Math.round(i/A*10)/10:0,m=o-R,h=A>0?Math.round(A*2/1e3*10)/10:0,b=o<h,x=Wa(c),$=Id(c),E=Math.min(c/12*100,100),k=m>=0?"#22c55e":"#ef4444",S=m>=0?`+${ne(Math.round(m))}L 余裕`:`${ne(Math.round(m))}L 不足`,C=w>1.001;return`
        <div class="card" style="border-top:3px solid ${y};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${y};">${p}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${x}20;color:${x};font-weight:600;">${$}</span>
              <button class="btn-edit-stock" data-cat-id="${v}" data-cat="${p}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${v}">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;font-size:11px;margin-bottom:4px;">
              <div><span style="color:#6b7280;">原酒在庫</span><br><strong style="font-size:15px;">${ne(u.stockL)}L</strong></div>
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${ne(Math.round(R))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${ye(A)}L</strong></div>
            </div>
            ${C?`
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${ne(o)}L</div>
                <div style="color:#6b7280;">${g.rawAlcoholPct}% → ${g.targetAlcoholPct}%（×${w.toFixed(2)}）・残<strong>${c.toFixed(1)}</strong>ヶ月</div>
              </div>
            `:""}
            ${(()=>{const L=s.filter(I=>I.parentCategory===p);return L.length===0?"":L.map(I=>{const j=t.filter(M=>M.brewCategory===I.name).reduce((M,z)=>M+z.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${I.name}</span>
                  ${j>0?`<span style="margin-left:4px;">${ne(j)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${v}" style="display:none;margin-bottom:8px;">
            ${(()=>{const L=s.filter(M=>M.parentCategory===p),I=[{name:p,label:p},...L.map(M=>({name:M.name,label:M.name}))],T=I.flatMap(M=>t.filter(F=>F.brewCategory===M.name).map(F=>({...F,catLabel:M.label}))),j=I.map(M=>`<option value="${M.name}">${M.label}</option>`).join("");return`
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${T.map(M=>`
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                      <span style="font-size:11px;flex:1;min-width:60px;">${M.label||"タンク"}</span>
                      <strong style="font-size:13px;">${ne(M.volumeL)}L</strong>
                      ${I.length>1?`
                        <select data-action="brew-reassign-entry" data-id="${M.id}"
                          style="font-size:10px;padding:1px 4px;border:1px solid var(--border);border-radius:3px;max-width:100px;">
                          ${I.map(z=>`<option value="${z.name}" ${z.name===M.brewCategory?"selected":""}>${z.label}</option>`).join("")}
                        </select>
                      `:`<span style="font-size:10px;color:var(--text-secondary);">${M.catLabel}</span>`}
                      <button data-action="brew-delete-entry" data-id="${M.id}" data-cat="${M.brewCategory}"
                        style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                    </div>
                  `).join("")||'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">タンクなし</div>'}
                </div>
                <div style="display:flex;gap:4px;align-items:center;margin-top:6px;flex-wrap:wrap;">
                  ${I.length>1?`<select id="new-entry-target-${v}" style="height:28px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">${j}</select>`:""}
                  <input id="new-entry-label-${v}" type="text" placeholder="タンク名"
                    style="width:80px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <input id="new-entry-vol-${v}" type="number" min="0" step="1" placeholder="L"
                    style="width:60px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <button data-action="brew-add-entry" data-cat="${p}" data-cat-id="${v}"
                    style="font-size:11px;padding:4px 10px;border:none;border-radius:4px;background:#0F5B8D;color:#fff;cursor:pointer;white-space:nowrap;">追加</button>
                </div>
              `})()}
            <div style="border-top:1px solid var(--border);padding-top:8px;margin-top:8px;">
              <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">アルコール度数（加水計算用）</div>
              <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  原酒
                  <input id="alc-raw-${v}" type="number" min="1" max="30" step="0.1" value="${g.rawAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <span style="color:#6b7280;">→</span>
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  出荷
                  <input id="alc-target-${v}" type="number" min="1" max="30" step="0.1" value="${g.targetAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <button data-action="brew-alc-save" data-cat="${p}"
                  style="font-size:10px;padding:3px 8px;border:none;border-radius:4px;background:#2563eb;color:#fff;cursor:pointer;">保存</button>
              </div>
            </div>
            <div style="margin-top:6px;">
              <button class="btn-cancel-stock" data-cat-id="${v}"
                style="font-size:11px;padding:4px 12px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">閉じる</button>
            </div>
          </div>

          <div style="display:flex;gap:8px;margin-bottom:6px;font-size:11px;flex-wrap:wrap;">
            <span style="color:${k};font-weight:600;">年間比 ${S}</span>
            <span style="color:${b?"#ef4444":"#6b7280"};">安全在庫${ne(h)}L${b?" ⚠下回り":" ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${C?"（加水後）":""}</span>
            <span style="font-weight:600;color:${x};">${c.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${x};height:100%;width:${E}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function Nd(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const r of e)t.has(r.brewCategory)||t.set(r.brewCategory,[]),t.get(r.brewCategory).push(r);const n=`
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
  `,s=[];for(const r of Me){const l=t.get(r);if(!l)continue;const d=ze[r]??"#9ca3af",p=l.length>1,u=l.reduce((o,i)=>o+i.totalShipmentQty,0),y=l.reduce((o,i)=>o+i.totalShipmentMl,0),v=l.reduce((o,i)=>o+i.monthlyAvgQty,0),g=l.reduce((o,i)=>o+i.monthlyAvgMl,0),w=l.reduce((o,i)=>o+i.productCount,0),P=l[0].currentStockL,A=g>0?Math.round(P*1e3/g*10)/10:0,R=Wa(A);if(s.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${p?"pointer":"default"};" ${p?`data-toggle-cat="${r}"`:""}>
        <td style="color:${d};">
          ${p?`<span class="toggle-icon" data-cat="${r}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${r}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${w}</td>
        <td style="text-align:right;">${ne(u)}</td>
        <td style="text-align:right;">${ye(y)}</td>
        <td style="text-align:right;">${ne(v)}</td>
        <td style="text-align:right;">${ye(g)}</td>
        <td style="text-align:right;">${ne(P)}</td>
        <td style="text-align:right;color:${R};font-weight:700;">${A.toFixed(1)}</td>
      </tr>
    `),p)for(const o of l)s.push(`
          <tr class="sub-row-${Xa(r)}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${o.subCategory}</td>
            <td style="text-align:right;">${o.productCount}</td>
            <td style="text-align:right;">${ne(o.totalShipmentQty)}</td>
            <td style="text-align:right;">${ye(o.totalShipmentMl)}</td>
            <td style="text-align:right;">${ne(o.monthlyAvgQty)}</td>
            <td style="text-align:right;">${ye(o.monthlyAvgMl)}</td>
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
  `}function Rd(e,t,n,s,r,l={}){const d={html:"",needByCategory:{}};if(e.length===0)return d;const p={},u=new Date,y=u.getMonth()+1,v=y>=10?u.getFullYear():u.getFullYear()-1,g=v+1,w=new Map;for(const S of e)w.has(S.brewCategory)||w.set(S.brewCategory,new Map),w.get(S.brewCategory).set(S.fy,{shipL:S.shipmentL,annualL:S.annualizedL});const P=new Map;for(const S of r)P.has(S.brewCategory)||P.set(S.brewCategory,new Map),P.get(S.brewCategory).set(S.monthNum,S.avgMonthlyL);const A=[...new Set(e.map(S=>S.fy))].sort(),R=[...w.keys()].sort((S,C)=>{const L=[...Me,...s.map(I=>I.name)];return(L.indexOf(S)===-1?99:L.indexOf(S))-(L.indexOf(C)===-1?99:L.indexOf(C))}),o=[];for(let S=y;S<=9;S++)o.push(S);if(y>=10)for(let S=1;S<=9;S++)o.push(S);const i=A.filter(S=>S<v),c=A.includes(v),m=R.map(S=>{const C=w.get(S);A.filter(me=>C.has(me));const L=ze[S]??"#6366f1",I=P.get(S)??new Map,T=i.filter(me=>C.has(me)).map(me=>C.get(me).shipL);let j=0;if(T.length>=2){let me=0,be=0;for(let Re=1;Re<T.length;Re++)if(T[Re-1]>0){const ea=(T[Re]-T[Re-1])/T[Re-1],Pt=Re;me+=ea*Pt,be+=Pt}j=be>0?me/be:0}const M=C.get(v)?.annualL??0,z=T.length>0?T[T.length-1]:0,F=M>0&&z>0?Math.round(z*.4+M*.6):z||M,B=o.reduce((me,be)=>me+(I.get(be)??0),0),U=t.filter(me=>me.brewCategory===S).reduce((me,be)=>me+be.volumeL,0),J=n[S],H=J&&J.targetAlcoholPct>0?J.rawAlcoholPct/J.targetAlcoholPct:1,K=Math.round(U*H),G=Math.max(0,K-Math.round(B)),de=S in l,se=de?l[S]:j,le=Math.round(se*100),Y=Math.round(F*(1+se)),Q=Math.max(0,Y-G);p[S]=Q;const X=le>0?"#22c55e":le<0?"#ef4444":"#6b7280",oe=Math.round(j*100),_e=C.get(v)?.annualL??0;return`
      <tr>
        <td style="color:${L};font-weight:600;white-space:nowrap;">${S}</td>
        ${i.map(me=>`<td style="text-align:right;">${C.has(me)?ne(Math.round(C.get(me).shipL)):"—"}</td>`).join("")}
        ${c?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${ne(Math.round(_e))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${le}"
            data-action="brew-growth-edit" data-cat="${S}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${de?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${X};font-weight:600;${de?"background:rgba(37,99,235,0.06);":""}"
            title="${de?`手動設定（自動: ${T.length>=2?oe+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${ne(K)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${ne(Math.round(B))}</td>
        <td style="text-align:right;font-weight:600;">${ne(G)}</td>
        <td style="text-align:right;">${ne(Y)}</td>
        <td style="text-align:right;color:${Q>0?"#ef4444":"#22c55e"};font-weight:700;">${Q>0?ne(Q):"余裕"}</td>
      </tr>
    `}).join("");let h=0,b=0,x=0,$=0,E=0;for(const S of R){const C=w.get(S),L=P.get(S)??new Map,I=i.filter(se=>C.has(se)).map(se=>C.get(se).shipL);let T=0;if(I.length>=2){let se=0,le=0;for(let Y=1;Y<I.length;Y++)if(I[Y-1]>0){const Q=(I[Y]-I[Y-1])/I[Y-1];se+=Q*Y,le+=Y}T=le>0?se/le:0}const j=C.get(v)?.annualL??0,M=I.length>0?I[I.length-1]:0,z=j>0&&M>0?Math.round(M*.4+j*.6):M||j,F=t.filter(se=>se.brewCategory===S).reduce((se,le)=>se+le.volumeL,0),B=n[S],U=B&&B.targetAlcoholPct>0?B.rawAlcoholPct/B.targetAlcoholPct:1,J=Math.round(F*U),H=o.reduce((se,le)=>se+(L.get(le)??0),0),K=Math.max(0,J-Math.round(H)),G=S in l?l[S]:T,de=Math.round(z*(1+G));h+=J,b+=Math.round(H),x+=K,$+=de,E+=Math.max(0,de-K)}const k=y<=9?`${y}月〜9月`:`${y}月〜翌9月`;return{needByCategory:p,html:`
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
              ${i.map(S=>`<th style="text-align:right;">${S}(L)</th>`).join("")}
              ${c?`<th style="text-align:right;">${v}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${k}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${g}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${m}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${i.map(()=>"<td></td>").join("")}
              ${c?"<td></td>":""}
              <td></td>
              <td style="text-align:right;">${ne(h)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${ne(b)}</td>
              <td style="text-align:right;">${ne(x)}</td>
              <td style="text-align:right;">${ne($)}</td>
              <td style="text-align:right;color:#ef4444;">${ne(E)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}}function Od(e,t,n,s,r){if(e.length===0)return"";const l=new Date,d=l.getMonth()+1,p=l.getFullYear(),u=[];let y=d,v=p;for(let i=0;i<4;i++){const c=[];for(let b=0;b<3;b++)c.push({y:v,m:y}),y++,y>12&&(y=1,v++);const m=`${c[0].y}/${c[0].m}`,h=`${c[2].y}/${c[2].m}`;u.push({label:`${m}-${h}`,months:c})}const g=new Map;for(const i of n)g.has(i.brewCategory)||g.set(i.brewCategory,new Map),g.get(i.brewCategory).set(i.monthNum,i.avgMonthlyL);const w=new Map;for(const i of e)w.has(i.brewCategory)||w.set(i.brewCategory,i.currentStockL);for(const i of r){const c=t.filter(m=>m.brewCategory===i.name).reduce((m,h)=>m+h.volumeL,0);c>0&&w.set(i.name,c)}const P=new Map;for(const i of r)P.has(i.parentCategory)||P.set(i.parentCategory,[]),P.get(i.parentCategory).push(i);const A=[];for(const i of Me){(w.has(i)||(g.get(i)?.size??0)>0)&&A.push({cat:i,isChild:!1});for(const c of P.get(i)??[])(w.has(c.name)||(g.get(c.name)?.size??0)>0)&&A.push({cat:c.name,isChild:!0})}function R(i,c){const m=s[i],h=m&&m.targetAlcoholPct>0?m.rawAlcoholPct/m.targetAlcoholPct:1;let b=(w.get(i)??0)*h;const x=g.get(i)??new Map,$=ze[i]??(c?"#6366f1":"#9ca3af");let E="";const k=[];for(const S of u){const C=S.months.reduce((j,{m:M})=>j+(x.get(M)??0),0),L=b;b=Math.max(0,b-C),L>0&&b<=0&&!E&&(E=S.label);const T=b<=0?"#ef4444":b<C?"#eab308":"#22c55e";k.push(`<td style="text-align:right;padding:4px 6px;color:${T};font-weight:${b<=0?"700":"400"};">${b>0?ne(Math.round(b)):"枯渇"}</td>`)}return`
      <tr style="${c?"background:rgba(99,102,241,0.02);":""}">
        <td style="color:${$};font-weight:${c?"500":"600"};padding:4px 6px;white-space:nowrap;${c?"padding-left:20px;font-size:11px;":""}">${c?"┗ ":""}${i}</td>
        <td style="text-align:right;padding:4px 6px;">${ne(Math.round((w.get(i)??0)*h))}</td>
        ${k.join("")}
        <td style="padding:4px 6px;font-size:11px;color:${E?"#ef4444":"#22c55e"};font-weight:600;">
          ${E?`⚠ ${E}`:"12ヶ月+"}
        </td>
      </tr>
    `}const o=A.map(({cat:i,isChild:c})=>R(i,c)).join("");return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 8px 0;">四半期別 在庫枯渇予測</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 10px;">現在庫（加水後）から季節出荷を差し引いた残量推移</p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th style="padding:4px 6px;">区分</th>
              <th style="text-align:right;padding:4px 6px;">現在庫(L)</th>
              ${u.map(i=>`<th style="text-align:right;padding:4px 6px;font-size:10px;">${i.label}</th>`).join("")}
              <th style="padding:4px 6px;">枯渇時期</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
        </table>
      </div>
    </div>
  `}function jd(e,t,n){const s=new Map;for(const d of e){s.has(d.brewCategory)||s.set(d.brewCategory,{avgMl:0,totalMl:0,stockL:d.currentStockL});const p=s.get(d.brewCategory);p.avgMl+=d.monthlyAvgMl,p.totalMl+=d.totalShipmentMl}for(const d of n){const p=t.filter(u=>u.brewCategory===d.name).reduce((u,y)=>u+y.volumeL,0);(p>0||s.has(d.name))&&(s.has(d.name)?s.get(d.name).stockL=p:(s.get(d.parentCategory),s.set(d.name,{avgMl:0,totalMl:0,stockL:p})))}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${[...Me,...n.map(d=>d.name)].filter(d=>s.has(d)&&(s.get(d).stockL>0||s.get(d).totalMl>0)).map(d=>{const p=s.get(d),u=p.avgMl>0?Math.round(p.stockL*1e3/p.avgMl*10)/10:0,y=p.totalMl/1e3,v=y>0?Math.round(p.stockL/y*100):0,g=n.some(o=>o.name===d),w=ze[d]??(g?"#6366f1":"#9ca3af"),P=p.avgMl>0?Wa(u):p.stockL>0?"#22c55e":"#9ca3af",A=p.avgMl>0?Math.min(u/12*100,100):p.stockL>0?100:0,R=p.avgMl>0?`${u.toFixed(1)}ヶ月 / 年間の${v}%`:`${ne(p.stockL)}L在庫`;return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:100px;font-size:12px;font-weight:500;color:${w};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${d}">${g?"┗ ":""}${d}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${P};height:100%;width:${A}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">${R}</span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${p.stockL>0?"var(--text)":"#ef4444"};">${ne(p.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function Bd(e,t,n,s,r){if(e.length===0)return"";const l=n.map(g=>g.name);[...Me,...l];const d=new Map;for(const g of n)d.has(g.parentCategory)||d.set(g.parentCategory,[]),d.get(g.parentCategory).push(g);const p=new Map;for(const g of e)p.has(g.brewCategory)||p.set(g.brewCategory,[]),p.get(g.brewCategory).push(g);for(const g of l)p.has(g)||p.set(g,[]);const u=new Set;for(const g of n)for(const w of p.get(g.name)??[])u.add(w.productCode);const y=new Map;for(const g of Me)y.set(g,p.get(g)??[]);const v=Me.filter(g=>p.has(g)).map(g=>{const w=p.get(g)??[],P=ze[g]??"#9ca3af",A=d.get(g)??[],R=A.length>0,o=w.reduce((k,S)=>k+S.annualMl,0),i=w.reduce((k,S)=>k+S.monthlyAvgMl,0),c=w.filter(k=>!u.has(k.productCode)),m=c.filter(k=>!t.has(k.productCode)),h=m.reduce((k,S)=>k+S.annualMl,0),b=m.reduce((k,S)=>k+S.monthlyAvgMl,0),x=c.filter(k=>t.has(k.productCode)),$=c.map(k=>{const S=t.has(k.productCode);return`
          <tr style="${S?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${R?`<input type="checkbox" ${S?"":"checked"} data-action="brew-move-to-child" data-code="${k.productCode}" data-parent="${g}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${S?"color:#b7791f;":""}" title="${k.productName}">
              ${k.productName}${S?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${k.subCategory}</td>
            <td style="text-align:right;">${ye(k.annualMl)}</td>
            <td style="text-align:right;">${ye(k.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),E=A.map(k=>{const S=p.get(k.name)??[],C=S.reduce((F,B)=>F+B.annualMl,0),L=S.reduce((F,B)=>F+B.monthlyAvgMl,0),I=r.filter(F=>F.brewCategory===k.name),T=I.reduce((F,B)=>F+B.volumeL,0),j=Xa(k.name),M=S.map(F=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${F.productCode}" data-cat="${k.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${F.productName}"><strong>${F.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${F.subCategory}</td>
            <td style="text-align:right;">${ye(F.annualMl)}</td>
            <td style="text-align:right;">${ye(F.monthlyAvgMl)}</td>
          </tr>
        `).join(""),z=x.filter(F=>!S.some(B=>B.productCode===F.productCode)).map(F=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${F.productCode}" data-cat="${k.name}"
                  style="cursor:pointer;" />
              </td>
              <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${F.productName}">${F.productName}</td>
              <td style="font-size:11px;color:var(--text-secondary);">${F.subCategory}</td>
              <td style="text-align:right;color:var(--text-secondary);">${ye(F.annualMl)}</td>
              <td style="text-align:right;color:var(--text-secondary);">${ye(F.monthlyAvgMl)}</td>
            </tr>
          `).join("");return`
          <tr><td colspan="5" style="padding:0;">
            <div style="border-left:3px solid #6366f1;margin:8px 0 8px 16px;padding:6px 0 6px 12px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <strong style="font-size:12px;color:#6366f1;">${k.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${S.length}品 ・ ${ye(C)}L/年${T>0?` ・ 在庫${ne(T)}L`:""}</span>
                <button class="btn-edit-stock" data-cat-id="${j}" data-cat="${k.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${k.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${j}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${I.map(F=>`
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${F.label||"タンク"}</span>
                    <strong style="font-size:11px;">${ne(F.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${F.id}" data-cat="${k.name}"
                      style="font-size:9px;padding:1px 4px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">×</button>
                  </div>
                `).join("")}
                <div style="display:flex;gap:3px;align-items:center;margin-top:3px;">
                  <input id="new-entry-label-${j}" type="text" placeholder="名前" style="width:70px;height:22px;font-size:10px;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <input id="new-entry-vol-${j}" type="number" min="0" placeholder="L" style="width:50px;height:22px;font-size:10px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <button data-action="brew-add-entry" data-cat="${k.name}" data-cat-id="${j}"
                    style="font-size:9px;padding:2px 6px;border:none;border-radius:3px;background:#0F5B8D;color:#fff;cursor:pointer;">追加</button>
                </div>
                <button class="btn-cancel-stock" data-cat-id="${j}" style="font-size:9px;padding:2px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;margin-top:3px;">閉じる</button>
              </div>
              ${M.length>0||z.length>0?`
                <table class="data-table" style="font-size:11px;margin:0;">
                  <tbody>
                    ${M}
                    ${z}
                  </tbody>
                  ${S.length>0?`<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${ye(C)}</td><td style="text-align:right;">${ye(L)}</td>
                  </tr></tfoot>`:""}
                </table>
              `:'<div style="font-size:10px;color:var(--text-secondary);padding:4px;">親からチェックを外すとここに候補表示されます</div>'}
            </div>
          </td></tr>
        `}).join("");return`
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${P};"></span>
            <h4 style="margin:0;font-size:14px;">${g}</h4>
            <span style="font-size:12px;color:var(--text-secondary);">
              全${w.length}銘柄 ・ 年間${ye(o)}L
              ${R?`（内 ${A.map(k=>`${k.name}:${(p.get(k.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${R?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${$}
                ${E}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${ye(o)}</td><td style="text-align:right;">${ye(i)}</td></tr>
                ${R?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${ye(h)}</td><td style="text-align:right;">${ye(b)}</td></tr>`:""}
                ${x.length>0?`<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${x.length}品</td>
                  <td style="text-align:right;">${ye(x.reduce((k,S)=>k+S.annualMl,0))}</td>
                  <td style="text-align:right;">${ye(x.reduce((k,S)=>k+S.monthlyAvgMl,0))}</td></tr>`:""}
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
            ${Me.filter(g=>g!=="その他").map(g=>`<option value="${g}">${g}</option>`).join("")}
          </select>
          <input id="brew-new-category-name" type="text" placeholder="新しい区分名"
            style="font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;width:120px;" />
          <button data-action="brew-add-category" class="button primary"
            style="font-size:12px;padding:4px 12px;">追加</button>
        </div>
      </div>
      ${v}
    </div>
  `}function zd(e,t,n,s=[],r=new Set,l=[],d={},p=[],u={},y=[],v=[],g={},w={}){const P=new Date,A=P.getMonth()>=9?P.getFullYear():P.getFullYear()-1,R=Array.from({length:5},(i,c)=>{const m=A-c;return`<option value="${m}" ${m===n?"selected":""}>${m}年度 (${m}/10-${m+1}/9)</option>`}).join(""),o=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return o||`
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div>
          <h2 style="margin:0;font-size:18px;">醸造計画</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;">特定名称酒区分別の出荷実績と在庫状況</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <label for="brewing-fy-select" style="font-size:13px;font-weight:500;">会計年度:</label>
          <select id="brewing-fy-select" class="input" style="width:auto;min-width:200px;">
            ${R}
          </select>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:14px;margin:0 0 8px 0;">月次移出推移（区分別）</h3>
        ${Td(t)}
      </div>

      ${Md(e,p,u,l)}

      ${Rd(y,p,u,l,v,g).html}

      ${jd(e,p,l)}

      ${Od(e,p,v,u,l)}

      ${Bd(s,r,l,d,p)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${Nd(e)}
      </div>
    </section>
  `}const da={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Fd=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"],ft=[10,11,12,1,2,3,4,5,6,7,8,9],In=["10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月","9月"],Ue=[9,10,11,12,1,2,3,4,5],Vd=["9月","10月","11月","12月","1月","2月","3月","4月","5月"];function ae(e){return e.toLocaleString("ja-JP")}function Yd(e,t,n,s=[],r=2026,l=[],d=[],p={}){const y=[...new Set([...Object.keys(e).filter(k=>e[k]>0),...s.filter(k=>k.plannedVolumeL>0).map(k=>k.brewCategory)])];if(y.length===0)return'<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>';const v=[...Fd,...n.map(k=>k.name)];y.sort((k,S)=>(v.indexOf(k)===-1?99:v.indexOf(k))-(v.indexOf(S)===-1?99:v.indexOf(S)));const g={polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0},w=new Map;for(const k of s)w.has(k.brewCategory)||w.set(k.brewCategory,[]),w.get(k.brewCategory).push(k);const P=(k,S,C,L,I)=>`<input type="number" step="${I}" value="${C}" data-action="brew-rice-edit" data-cat="${S}" data-field="${k}"
        style="width:${L};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`,A=(k,S,C)=>`<select data-action="brew-rice-variety-select" data-cat="${S}" data-field="${k}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${l.map(L=>`<option value="${L.name}" ${L.name===C?"selected":""}>${L.name}${L.region?` (${L.region})`:""}</option>`).join("")}
      ${!l.some(L=>L.name===C)&&C?`<option value="${C}" selected>${C}</option>`:""}
    </select>`;let R=0,o=0,i=0,c=0;const m=ft.map(()=>0),h=new Map,b=y.map(k=>{const S=e[k]??0,C=t[k]??g,L=da[k]??"#6366f1",I=w.get(k)??[],T=k in p,j=I.reduce((X,oe)=>X+oe.plannedVolumeL,0),M=I.length>0,z=T?p[k]:M?j:S,F=C.alcoholAdditionRatio??0,B=z*(1-F),U=Math.round(B*C.ricePerLiterKg),J=Math.round(U*C.kojiRatio),H=U-J,K=Math.round(J/C.polishingRatio),G=Math.round(H/C.polishingRatio),de=K+G,se=Math.round(K*C.kojiPricePerKg),le=Math.round(G*C.kakePricePerKg);R+=K,o+=G,i+=se,c+=le;for(const[X,oe,_e,me]of[[C.kojiVariety,K,C.kojiPricePerKg,"麹米"],[C.kakeVariety,G,C.kakePricePerKg,"掛米"]]){if(oe<=0)continue;h.has(X)||h.set(X,{brownKg:0,pricePerKg:_e,cost:0,usage:[]});const be=h.get(X);be.brownKg+=oe,be.cost+=Math.round(oe*_e),be.pricePerKg=Math.round(be.cost/be.brownKg),be.usage.push({cat:k,type:me,kg:oe})}const Y=ft.map(()=>0);if(I.length>0)for(const X of I){const oe=ft.indexOf(X.brewMonth);oe>=0&&(Y[oe]+=X.plannedVolumeL)}else{const X=z/12;for(let oe=0;oe<12;oe++)Y[oe]=X}const Q=Y.reduce((X,oe)=>X+oe,0)||1;for(let X=0;X<12;X++){const oe=Y[X]/Q;m[X]+=Math.round(de*oe)}return`
      <div class="card" style="border-top:3px solid ${L};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${L};">${k}</h4>
          <div style="font-size:12px;">${z>0?`予算 <strong>¥${ae(se+le)}</strong>`:'<span style="color:#6b7280;font-weight:600;">醸造しない</span>'}</div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(z)}"
              data-action="proc-edit-vol" data-cat="${k}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid ${T?"#2563eb":"var(--border)"};border-radius:4px;padding:0 4px;font-weight:600;${T?"background:rgba(37,99,235,0.04);":""}" />L
          </label>
          ${F>0?`<span style="color:var(--text-secondary);">−${Math.round(F*100)}%→${ae(Math.round(B))}L</span>`:""}
          ${S>0&&Math.abs(S-z)>10?`<span style="color:var(--text-secondary);font-size:11px;">(予測${ae(Math.round(S))})</span>`:""}
        </div>

        <div style="border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:8px;background:var(--surface-alt);">
          <div style="font-size:11px;font-weight:600;color:${L};margin-bottom:6px;">醸造スケジュール${I.length>0?` (${ae(Math.round(I.reduce((X,oe)=>X+oe.plannedVolumeL,0)))}L / ${ae(Math.round(z))}L)`:""}</div>
          ${I.length>0?`
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
              ${I.map(X=>`
                <div style="display:flex;align-items:center;gap:3px;padding:3px 8px;border-radius:4px;background:${L}15;border:1px solid ${L}30;">
                  <span style="font-size:11px;font-weight:600;color:${L};">${X.brewMonth}月</span>
                  <input type="number" min="0" max="${Math.round(z)}" step="100" value="${Math.round(X.plannedVolumeL)}"
                    data-action="proc-sched-edit-vol" data-cat="${k}" data-month="${X.brewMonth}"
                    style="width:56px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />L
                  <button data-action="proc-sched-remove" data-cat="${k}" data-month="${X.brewMonth}"
                    style="border:none;background:none;color:#ef4444;cursor:pointer;font-size:14px;padding:0 2px;line-height:1;">×</button>
                </div>
              `).join("")}
            </div>
          `:'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px;">醸造月を追加してください</div>'}
          <div style="display:flex;align-items:center;gap:4px;">
            <select data-action="proc-add-month-select" data-cat="${k}"
              style="height:24px;font-size:11px;border:1px solid var(--border);border-radius:3px;padding:0 4px;">
              ${[10,11,12,1,2,3,4,5,6,7,8,9].filter(X=>!I.some(oe=>oe.brewMonth===X)).map(X=>`<option value="${X}">${X}月</option>`).join("")}
            </select>
            <input type="number" min="0" max="${Math.round(z)}" step="100" placeholder="L"
              data-action="proc-add-month-vol" data-cat="${k}"
              style="width:56px;height:24px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />
            <button data-action="proc-add-schedule" data-cat="${k}"
              style="height:24px;font-size:11px;padding:0 8px;border:1px solid ${L};background:${L}10;color:${L};border-radius:3px;cursor:pointer;">+追加</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${P("ricePerLiterKg",k,C.ricePerLiterKg,"48px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${P("kojiRatio",k,C.kojiRatio,"44px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${P("polishingRatio",k,C.polishingRatio,"44px","0.01")}</label>
          ${F>0||k==="本醸造"||k==="普通酒"?`<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${P("alcoholAdditionRatio",k,C.alcoholAdditionRatio??0,"44px","0.01")}</label>`:""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${A("kojiVariety",k,C.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${P("kojiPricePerKg",k,C.kojiPricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${ae(K)}kg</strong> <span style="color:var(--text-secondary);">(${(K/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${ae(se)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${A("kakeVariety",k,C.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${P("kakePricePerKg",k,C.kakePricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${ae(G)}kg</strong> <span style="color:var(--text-secondary);">(${(G/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${ae(le)}</div>
          </div>
        </div>
      </div>
    `}).join(""),x=R+o,$=i+c,E=Math.max(...m,1);return ft.map((k,S)=>{const C=m[S];return`
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${C/E*100}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${C>0?2:0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${In[S]}</div>
        <div style="font-size:10px;font-weight:600;">${C>0?ae(C):""}</div>
        <div style="font-size:9px;color:var(--text-secondary);">${C>0?(C/60).toFixed(0)+"俵":""}</div>
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
        <div style="display:grid;grid-template-columns:80px repeat(${Ue.length},1fr);font-size:11px;min-width:500px;">
          <div style="padding:4px;font-weight:600;">区分</div>
          ${Vd.map(k=>`<div style="text-align:center;padding:4px;font-weight:600;border-left:1px solid var(--border);">${k}</div>`).join("")}
        </div>
        ${(()=>{const k=[],S=Ue.length,C=new Map;for(const T of d)T.deliveryMonth&&(C.has(T.varietyName)||C.set(T.varietyName,[]),C.get(T.varietyName).push(T.deliveryMonth));for(const[T,j]of C){const M=Ue.map(z=>{const F=j.includes(z),B=d.filter(U=>U.varietyName===T&&U.deliveryMonth===z).reduce((U,J)=>U+J.committedBales,0);return`<div style="text-align:center;padding:3px;border-left:1px solid var(--border);${F?"background:#dcfce7;":""}">
                ${F?`<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${B}俵</div>`:""}
              </div>`}).join("");k.push(`<div style="display:grid;grid-template-columns:80px repeat(${S},1fr);border-top:1px solid var(--border);">
              <div style="padding:4px;color:#16a34a;font-weight:500;font-size:10px;">📥 ${T}</div>${M}
            </div>`)}const L=34,I=2;for(const T of y){const j=w.get(T)??[],M=da[T]??"#6366f1",z=T in p,F=j.reduce((Y,Q)=>Y+Q.plannedVolumeL,0),B=j.length>0,U=z?p[T]:B?F:e[T]??0,J=[],H=[...j].sort((Y,Q)=>Ue.indexOf(Y.brewMonth)-Ue.indexOf(Q.brewMonth)),K=[];for(const Y of H){const Q=Ue.indexOf(Y.brewMonth);if(Q<0)continue;const X=Math.min(Y.durationMonths,S-Q),oe=Q+X;let _e=0;for(;_e<K.length&&K[_e]>Q;)_e++;_e>=K.length?K.push(oe):K[_e]=oe,J.push({s:Y,startIdx:Q,dur:X,lane:_e})}const de=Math.max(K.length,1)*(L+I)+I,se=Ue.map(()=>`<div style="border-left:1px solid var(--border);height:${de}px;"></div>`).join(""),le=J.map(({s:Y,startIdx:Q,dur:X,lane:oe})=>{const _e=(Q/S*100).toFixed(2),me=(X/S*100).toFixed(2),be=I+oe*(L+I);return`<div class="gantt-bar" data-cat="${T}" data-month="${Y.brewMonth}" data-dur="${X}" data-vol="${Math.round(Y.plannedVolumeL)}" data-max="${Math.round(U)}"
                style="position:absolute;left:${_e}%;width:${me}%;top:${be}px;height:${L}px;
                  background:${M}30;border:2px solid ${M};border-radius:6px;cursor:grab;
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${M};overflow:hidden;box-sizing:border-box;">
                <div class="gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
                <span class="gantt-bar-label" style="pointer-events:none;white-space:nowrap;">${ae(Math.round(Y.plannedVolumeL))}L</span>
                <div class="gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
              </div>`}).join("");k.push(`<div style="display:grid;grid-template-columns:80px 1fr;border-top:1px solid var(--border);">
              <div style="padding:4px;color:${M};font-weight:500;font-size:10px;display:flex;align-items:center;">🍶 ${T}</div>
              <div style="position:relative;display:grid;grid-template-columns:repeat(${S},1fr);">
                ${se}
                <div class="gantt-bar-container" data-cat="${T}" data-max="${Math.round(U)}" data-cols="${S}" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                  ${le}
                </div>
              </div>
            </div>`)}return k.join("")||'<div style="text-align:center;color:var(--text-secondary);padding:16px;">区分を追加するとタイムラインが表示されます</div>'})()}
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(()=>{const k=y.map(C=>{const L=t[C]??g,I=w.get(C)??[],T=C in p,j=I.reduce((J,H)=>J+H.plannedVolumeL,0),M=I.length>0,z=T?p[C]:M?j:e[C]??0,F=z*(1-(L.alcoholAdditionRatio??0)),B=Math.round(F*L.ricePerLiterKg),U=Math.round(B/L.polishingRatio);return{cat:C,brewingL:z,brownKg:U,color:da[C]??"#6366f1"}}).filter(C=>C.brewingL>0||C.brownKg>0),S=Math.max(...k.map(C=>C.brownKg),1);return k.map(C=>{const L=Math.min(C.brownKg/S*100,100);return`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="width:90px;font-size:11px;font-weight:500;color:${C.color};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${C.cat}</span>
              <div style="flex:1;background:#e5e7eb;border-radius:3px;height:20px;overflow:hidden;position:relative;">
                <div style="background:${C.color};opacity:0.7;height:100%;width:${L}%;border-radius:3px;"></div>
                <span style="position:absolute;top:2px;left:6px;font-size:10px;font-weight:600;color:#374151;">${ae(C.brownKg)}kg (${Math.ceil(C.brownKg/60)}俵)</span>
              </div>
              <span style="width:60px;font-size:10px;text-align:right;color:var(--text-secondary);">${ae(Math.round(C.brewingL))}L</span>
            </div>
          `}).join("")})()}
    </section>

    ${b}

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
            ${[...h.entries()].sort((k,S)=>S[1].brownKg-k[1].brownKg).map(([k,S])=>{const C=(S.brownKg/60).toFixed(1),L=S.usage.map(I=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${I.type==="麹米"?"rgba(99,102,241,0.08)":"rgba(183,121,31,0.08)"};margin-right:3px;">${I.cat}/${I.type} ${ae(I.kg)}kg</span>`).join("");return`
                <tr>
                  <td style="font-weight:600;">${k}</td>
                  <td style="text-align:right;font-weight:600;">${ae(S.brownKg)}</td>
                  <td style="text-align:right;">${C}</td>
                  <td style="text-align:right;">¥${ae(S.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${ae(S.cost)}</td>
                  <td style="max-width:300px;overflow-x:auto;">${L}</td>
                </tr>
              `}).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              <td style="text-align:right;">${ae(x)}</td>
              <td style="text-align:right;">${Math.ceil(x/60)}</td>
              <td></td>
              <td style="text-align:right;">¥${ae($)}</td>
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
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${ae(R)}kg</strong> <span style="color:var(--text-secondary);">(${(R/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${ae(i)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${ae(o)}kg</strong> <span style="color:var(--text-secondary);">(${(o/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${ae(c)}</div>
        </div>
        <div style="background:var(--surface-alt);border-radius:8px;padding:14px;border:2px solid var(--border);">
          <div style="font-size:11px;font-weight:600;">総合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${ae(x)}kg</strong> <span style="color:var(--text-secondary);">(${Math.ceil(x/60)}俵)</span></div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">¥${ae($)}<span style="font-size:13px;font-weight:400;margin-left:4px;">(${($/1e4).toFixed(0)}万)</span></div>
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
      ${(()=>{const k=new Map;for(const[M,z]of h)k.set(M,z.brownKg);const S=new Map;for(const M of d){S.has(M.varietyName)||S.set(M.varietyName,{bales:0,kg:0,cost:0,suppliers:[]});const z=S.get(M.varietyName);z.bales+=M.committedBales,z.kg+=M.committedBales*60,z.cost+=M.committedBales*60*M.pricePerKg,M.supplier&&!z.suppliers.includes(M.supplier)&&z.suppliers.push(M.supplier)}const C=[...new Set([...k.keys(),...S.keys()])];let L=0,I=0;const T=C.map(M=>{const z=k.get(M)??0,F=S.get(M),B=F?.kg??0,U=B-z;L+=B,I+=z;const J=U>=0?"#22c55e":"#ef4444",H=U>=0?`+${ae(Math.round(U))}kg余裕`:`${ae(Math.round(U))}kg不足`,K=B>0?Math.min(z/B*100,100):0;return`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${M}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${ae(Math.round(B))}kg (${F?.bales??0}俵)</span>
                  <span>必要 ${ae(Math.round(z))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${K}%;background:${B>0?U>=0?"#22c55e":"#ef4444":"#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${J};">${B>0?H:"未確保"}</span>
            </div>
          `}).join(""),j=L-I;return`
          <div style="margin-bottom:12px;">
            ${T||'<p style="color:var(--text-secondary);text-align:center;padding:12px;">作付け予定が未登録です</p>'}
          </div>
          ${L>0?`
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;padding:8px;background:var(--surface-alt);border-radius:6px;">
              <span>確保合計: <strong>${ae(Math.round(L))}kg</strong> (${Math.ceil(L/60)}俵)</span>
              <span>必要合計: <strong>${ae(Math.round(I))}kg</strong></span>
              <span style="color:${j>=0?"#22c55e":"#ef4444"};font-weight:600;">
                ${j>=0?`余裕 ${ae(Math.round(j))}kg`:`不足 ${ae(Math.round(-j))}kg`}
              </span>
            </div>
          `:""}
          <div style="display:flex;gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap;">
            <select id="proc-commit-variety" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;">
              ${l.map(M=>`<option value="${M.name}">${M.name}</option>`).join("")}
            </select>
            <input id="proc-commit-bales" type="number" min="0" step="1" placeholder="俵数"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <input id="proc-commit-price" type="number" min="0" step="10" placeholder="円/kg"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <select id="proc-commit-month" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">
              <option value="">入荷月</option>
              ${ft.map((M,z)=>`<option value="${M}">${In[z]}</option>`).join("")}
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
        ${l.map(k=>`
          <div style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;margin:2px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
            <strong>${k.name}</strong>
            <span style="color:var(--text-secondary);">¥${ae(k.defaultPricePerKg)}/kg</span>
            ${k.region?`<span style="color:var(--text-secondary);font-size:10px;">${k.region}</span>`:""}
            <button data-action="proc-delete-variety" data-id="${k.id}"
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
  `}const Ud={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Jd={planned:"計画中",active:"進行中",completed:"完了"},Qd={planned:"neutral",active:"warning",completed:"success"},Hd={未着手:"#e5e7eb",進行中:"#3b82f6",完了:"#22c55e"},Oe=12;function Kd(e){return e.toLocaleString("ja-JP")}function pa(e,t){const n=new Date(e).getTime(),s=new Date(t).getTime();return Math.round((s-n)/864e5)}function Gd(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n.toISOString().slice(0,10)}function Ea(e){return Ud[e]??"#9ca3af"}function Wd(e,t,n){const s=[...t].sort((y,v)=>y.stepOrder-v.stepOrder),r=s.length,l=s.filter(y=>y.status==="完了").length,d=r>0?Math.round(l/r*100):0,p=s.find(y=>y.status==="進行中"),u=Ea(e.brewCategory);return`
    <article class="panel" style="border-left:4px solid ${u};margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:12px;cursor:pointer"
           data-action="bp-toggle-detail" data-batch-id="${e.id}">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <strong style="font-size:1.05rem">${e.batchCode}</strong>
            <span style="background:${u};color:#fff;font-size:0.7rem;padding:2px 8px;border-radius:9999px">
              ${e.brewCategory}
            </span>
            <span class="status-pill ${Qd[e.status]}">${Jd[e.status]}</span>
          </div>
          <div style="font-size:0.82rem;color:#6b7280;margin-top:4px">
            タンク ${e.tankNo} ｜ ${Kd(e.plannedVolumeL)} L ｜ ${e.startDate} 〜 ${e.targetEndDate}
          </div>
        </div>
        <div style="width:140px;flex-shrink:0;text-align:right">
          <div style="font-size:0.75rem;color:#6b7280;margin-bottom:2px">
            ${l}/${r} 工程 ${p?"▸ "+p.stepName:""}
          </div>
          <div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden">
            <div style="width:${d}%;height:100%;background:${u};border-radius:3px"></div>
          </div>
        </div>
        <span style="font-size:1.1rem;color:#9ca3af">${n?"▲":"▼"}</span>
      </div>
      ${n?Xd(e,s):""}
    </article>`}function Xd(e,t){if(t.length===0)return'<div style="padding:16px 0;color:#9ca3af;font-size:0.85rem">工程が登録されていません</div>';const n=t.flatMap(w=>[w.plannedStart,w.plannedEnd].filter(Boolean));if(n.length===0)return'<div style="padding:16px 0;color:#9ca3af;font-size:0.85rem">日程未設定</div>';n.sort();const s=n[0],r=n[n.length-1],l=Math.max(pa(s,r)+1,1),d=Math.min(l,80),p=d*Oe,u=[];let y="";for(let w=0;w<d;w++){const P=Gd(s,w);P.slice(5,7)+""+P.slice(8,10);const A=P.slice(0,7);A!==y&&(u.push(`<span style="position:absolute;left:${w*Oe}px;font-size:0.65rem;color:#9ca3af;white-space:nowrap">${P.slice(5,7)}月</span>`),y=A)}const v=t.map(w=>{const P=Math.max(pa(s,w.plannedStart),0),A=Math.min(pa(s,w.plannedEnd),d-1),R=P*Oe,o=Math.max((A-P+1)*Oe,Oe),i=Hd[w.status],c=w.status==="未着手"?"#374151":"#fff";return`
      <div style="display:flex;align-items:center;gap:0;margin-bottom:2px;min-height:28px">
        <div style="width:120px;flex-shrink:0;font-size:0.78rem;padding-right:6px;text-align:right;white-space:nowrap;overflow:hidden;text-overflow:ellipsis${w.status==="進行中"?";font-weight:700;color:#2563eb":""}">${w.stepName}</div>
        <div style="position:relative;width:${p}px;height:22px;background:repeating-linear-gradient(90deg,#f3f4f6 0 ${Oe-1}px,#e5e7eb ${Oe-1}px ${Oe}px);border-radius:3px">
          <div style="position:absolute;left:${R}px;top:2px;width:${o}px;height:18px;background:${i};border-radius:3px;color:${c};font-size:0.65rem;line-height:18px;padding:0 4px;overflow:hidden;white-space:nowrap">
            ${w.plannedStart.slice(5)} – ${w.plannedEnd.slice(5)}
          </div>
        </div>
      </div>`}).join(""),g=t.map(w=>`
    <tr style="border-bottom:1px solid #f3f4f6">
      <td style="padding:6px 8px;font-size:0.82rem;font-weight:${w.status==="進行中"?700:400}">${w.stepName}</td>
      <td style="padding:6px 8px;font-size:0.78rem;color:#6b7280">${w.plannedStart} 〜 ${w.plannedEnd}</td>
      <td style="padding:6px 8px;font-size:0.78rem;color:#6b7280">${w.actualStart||"―"} 〜 ${w.actualEnd||"―"}</td>
      <td style="padding:6px 4px">
        <select data-action="bp-step-status" data-step-id="${w.id}" style="font-size:0.78rem;padding:2px 4px;border:1px solid #d1d5db;border-radius:4px">
          ${["未着手","進行中","完了"].map(P=>`<option value="${P}"${w.status===P?" selected":""}>${P}</option>`).join("")}
        </select>
      </td>
      <td style="padding:6px 4px">
        <input type="number" step="0.1" data-action="bp-step-temp" data-step-id="${w.id}"
               value="${w.temperature??""}" placeholder="℃"
               style="width:60px;font-size:0.78rem;padding:2px 4px;border:1px solid #d1d5db;border-radius:4px">
      </td>
      <td style="padding:6px 4px">
        <input type="text" data-action="bp-step-notes" data-step-id="${w.id}"
               value="${w.notes}" placeholder="メモ"
               style="width:120px;font-size:0.78rem;padding:2px 4px;border:1px solid #d1d5db;border-radius:4px">
      </td>
    </tr>`).join("");return`
    <div style="margin-top:12px;padding-top:12px;border-top:1px solid #e5e7eb">
      <!-- Gantt -->
      <div style="overflow-x:auto;margin-bottom:16px">
        <div style="position:relative;height:18px;width:${p}px;margin-left:120px;margin-bottom:4px">
          ${u.join("")}
        </div>
        ${v}
      </div>
      <!-- Step table -->
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:2px solid #e5e7eb;font-size:0.75rem;color:#6b7280;text-align:left">
            <th style="padding:4px 8px">工程</th>
            <th style="padding:4px 8px">予定</th>
            <th style="padding:4px 8px">実績</th>
            <th style="padding:4px 4px">ステータス</th>
            <th style="padding:4px 4px">温度</th>
            <th style="padding:4px 4px">メモ</th>
          </tr>
        </thead>
        <tbody>${g}</tbody>
      </table>
      ${e.notes?`<div style="margin-top:8px;font-size:0.8rem;color:#6b7280">備考: ${e.notes}</div>`:""}
    </div>`}function Zd(e){return`
    <div class="panel" style="margin-bottom:16px">
      <div class="panel-header">新規バッチ登録</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;padding:12px 0">
        <label style="font-size:0.82rem">
          カテゴリ
          <select data-field="bp-category" style="width:100%;margin-top:4px;padding:6px;border:1px solid #d1d5db;border-radius:6px;font-size:0.85rem">
            ${e.map(n=>`<option value="${n}">${n}</option>`).join("")}
          </select>
        </label>
        <label style="font-size:0.82rem">
          バッチコード
          <input type="text" data-field="bp-batch-code" placeholder="R8-J01"
                 style="width:100%;margin-top:4px;padding:6px;border:1px solid #d1d5db;border-radius:6px;font-size:0.85rem">
        </label>
        <label style="font-size:0.82rem">
          計画数量 (L)
          <input type="number" data-field="bp-volume" placeholder="1800"
                 style="width:100%;margin-top:4px;padding:6px;border:1px solid #d1d5db;border-radius:6px;font-size:0.85rem">
        </label>
        <label style="font-size:0.82rem">
          開始日
          <input type="date" data-field="bp-start-date"
                 style="width:100%;margin-top:4px;padding:6px;border:1px solid #d1d5db;border-radius:6px;font-size:0.85rem">
        </label>
      </div>
      <div style="text-align:right;padding-top:4px">
        <button class="button" data-action="bp-create-batch">登録</button>
      </div>
    </div>`}function ep(e,t,n,s={}){const{expandedBatchId:r,showNewForm:l}=s,d={};for(const A of t)(d[A.batchId]??=[]).push(A);const p=e.filter(A=>A.status==="active").length,u=e.filter(A=>A.status==="planned").length,y=e.filter(A=>A.status==="completed").length,v=e.filter(A=>A.status!=="completed"),g={};for(const A of v)(g[A.brewCategory]??=[]).push(A);const P=n.filter(A=>g[A]?.length).map(A=>{const R=g[A],o=R.map(i=>Wd(i,d[i.id]??[],r===i.id)).join("");return`
        <div style="margin-bottom:20px">
          <h3 style="font-size:0.9rem;color:${Ea(A)};margin-bottom:8px;border-bottom:2px solid ${Ea(A)};padding-bottom:4px;display:inline-block">
            ${A}（${R.length}）
          </h3>
          ${o}
        </div>`}).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>醸造工程管理</h1>
      </div>
      <div class="meta-stack">
        <button class="button" data-action="bp-show-new-form">＋ 新規バッチ</button>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">進行中</p>
        <p class="kpi-value">${p} 本</p>
        <p class="kpi-sub">アクティブバッチ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">計画中</p>
        <p class="kpi-value">${u} 本</p>
        <p class="kpi-sub">未着手</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${y} 本</p>
        <p class="kpi-sub">今期累計</p>
      </article>
    </section>

    ${l?Zd(n):""}

    <section>
      ${P||'<div class="panel" style="padding:24px;text-align:center;color:#9ca3af">バッチが登録されていません</div>'}
    </section>`}function Aa(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function tp(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ws(e){return e?Wt.find(t=>t.value===e)?.label??e:""}function ap(e){const t=[],n=[],s=[];for(const r of e){const l=r.amount_last_year_same_month>0?r.amount_this_month/r.amount_last_year_same_month:1,d={code:r.customer_code,name:r.customer_name,businessType:r.business_type,areaCode:r.area_code,phone:r.phone,lastOrderDate:r.last_order_date,daysSinceLastOrder:r.days_since_order,totalAmountLast12m:r.amount_12m,amount3m:r.amount_3m,amountThisMonth:r.amount_this_month,amountLastYearSameMonth:r.amount_last_year_same_month,annualRevenue:r.annual_revenue,yoyRatio:l,status:"dormant"};r.is_at_risk?t.push({...d,status:"at-risk"}):r.is_dormant?n.push({...d,status:"dormant"}):r.amount_last_year_same_month>0&&l<.8&&s.push({...d,status:"declining"})}return t.sort((r,l)=>l.totalAmountLast12m-r.totalAmountLast12m),n.sort((r,l)=>l.daysSinceLastOrder-r.daysSinceLastOrder),s.sort((r,l)=>r.yoyRatio-l.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:s}}function np(e,t){const n=t?.reason??"",s=Wt.map(r=>`<option value="${r.value}" ${n===r.value?"selected":""}>${r.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${s}
    </select>`}function sp(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],s=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',r=!!t?.actionedAt,l=r?'style="opacity:0.45;"':"",d=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${Ws(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${r?"1":"0"}" ${l}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${d}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${s}
      <td class="numeric">${Aa(e.totalAmountLast12m)}</td>
      <td>${np(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${r?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function ua(e,t,n,s,r,l,d,p){if(r.length===0)return"";const u=r.map(y=>sp(y,p.get(y.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${s}" style="margin-right:8px;">${r.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${tp(l)}</p>
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
              <th class="numeric">${d}</th>
              <th class="numeric" data-sort="amount12m">12M売上</th>
              <th>注文しない理由</th>
              <th>対応済</th>
              <th>電話</th>
            </tr>
          </thead>
          <tbody>${u}</tbody>
        </table>
      </div>
    </section>`}function op(e,t=[]){const{atRiskCustomers:n,dormantCustomers:s,decliningCustomers:r}=e,l=n.length+s.length+r.length,d=n.reduce((o,i)=>o+i.totalAmountLast12m,0),p=s.reduce((o,i)=>o+i.totalAmountLast12m,0),u=r.reduce((o,i)=>o+i.totalAmountLast12m,0),y=[...n,...s,...r],v=[...new Set(y.map(o=>o.areaCode).filter(Boolean))].sort(),g=[...new Set(y.map(o=>o.businessType).filter(Boolean))].sort(),w=new Map(t.map(o=>[o.customerCode,o])),P=t.filter(o=>o.actionedAt).length,A=new Map;t.forEach(o=>{o.reason&&A.set(o.reason,(A.get(o.reason)??0)+1)});const R=[...A.entries()].sort((o,i)=>i[1]-o[1]).slice(0,5).map(([o,i])=>`<span class="status-pill info" style="font-size:0.75rem;">${Ws(o)} ${i}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${Aa(d)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${s.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${Aa(p)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${r.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${P}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-muted);">${l}社中</div>
      </div>
    </section>

    ${R?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${R}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${l})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${s.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${r.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${v.map(o=>`<option value="${o}">${o}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${g.map(o=>`<option value="${o}">${o}</option>`).join("")}
      </select>
    </div>

    ${ua("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,d,"状況",w)}
    ${ua("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",s,p,"経過日数",w)}
    ${ua("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",r,u,"前年同月比",w)}

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
    <\/script>`}const Be=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],La={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},je={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function rp(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ip(e){const t=e.reduce((l,d)=>l+d,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const s=Math.max(...e);return e.filter(l=>l>s*.1).length<=6?"seasonal":"year-round"}function lp(e){const t=e.reduce((l,d)=>l+d,0);if(t===0)return[];const s=t/12*1.5,r=[];for(let l=0;l<12;l++)e[l]>s&&r.push(l);if(r.length===0){const l=Math.max(...e);l>0&&r.push(e.indexOf(l))}return r.sort((l,d)=>l-d)}function cp(e){return e.length===0?0:(e[0]-2+12)%12}function Tn(e){const t=new Date().getMonth(),n=e.map(r=>{const l=ip(r.monthlyQuantity),d=lp(r.monthlyQuantity),p=cp(d);return{code:r.code,name:r.name,category:r.category,peakMonths:d,proposalStartMonth:p,seasonType:l,monthlyQuantity:r.monthlyQuantity}}),s=[];for(let r=0;r<12;r++){const l=n.filter(d=>{if(d.peakMonths.length===0)return!1;const p=d.proposalStartMonth,u=d.peakMonths[0];return p<=u?r>=p&&r<=u:r>=p||r<=u});s.push({month:r,products:l,targetCustomers:[]})}return{products:n,proposals:s,selectedMonth:t}}function dp(e){const{products:t,proposals:n,selectedMonth:s}=e,r=new Date().getMonth(),l={"year-round":[],seasonal:[],"year-end":[]};t.forEach(g=>l[g.seasonType].push(g));const d=n[s],p=t.length,u=d?.products.length??0,y=t.filter(g=>g.peakMonths.includes(s)).length,v=d?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${Be[s]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${Be[s]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${y}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${v}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${Be.map((g,w)=>{const P=w===r,A=w===s;return`<button class="button" style="padding:4px 10px;background:${A?"#0F5B8D":P?"#e2e8f0":"transparent"};color:${A?"#fff":"#333"};border:${P&&!A?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${w}">${g}${P?" ●":""}</button>`}).join("")}
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
            ${Be.map((g,w)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${w===r?"background:#f0f7ff;":""}">${g.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${pp(l,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${up(l,s)}

  <!-- Target customer list for selected month -->
  ${mp(d)}
</div>`}function pp(e,t){const n=[],s=["year-round","seasonal","year-end"];for(const r of s){const l=e[r];if(l.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${je[r]}15;color:${je[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${La[r]}</span>
    </td></tr>`);for(const d of l){const p=Be.map((u,y)=>{const v=d.peakMonths.includes(y),g=Xs(d,y),w=y===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let P="transparent";v?P=je[d.seasonType]:g&&(P=je[d.seasonType]+"40");const A=v||g?`background:${P};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${w}"><div style="${A}" title="${v?"ピーク":g?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${d.name}"><span class="mono" style="font-size:0.7rem;color:#888">${d.code}</span> ${d.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${je[d.seasonType]}15;color:${je[d.seasonType]}">${La[d.seasonType]}</span></td>
        ${p}
      </tr>`)}}}return n.join("")}function Xs(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,s=e.peakMonths[0];return n<=s?t>=n&&t<s:t>=n||t<s}function up(e,t){const s=["year-round","seasonal","year-end"].map(r=>{const l=e[r];if(l.length===0)return"";const d=l.filter(u=>u.peakMonths.includes(t)||Xs(u,t));if(d.length===0)return"";const p=d.map(u=>{const v=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',g=u.monthlyQuantity.reduce((w,P)=>w+P,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${v}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${g.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map(w=>Be[w]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${je[r]}15;color:${je[r]}">${La[r]}</span>
        <span style="font-size:0.85rem;color:#666">${Be[t]}の対象: ${d.length}品</span>
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
    </div>`}).filter(Boolean);return s.length===0?`<div style="padding:1rem;color:#666;text-align:center">${Be[t]}に提案対象の商品はありません</div>`:s.join("")}function mp(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${rp(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const yp=["日","月","火","水","木","金","土"];function hp(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n-1,1),r=new Date(t,n,0),l=[];for(let d=0;d<s.getDay();d++)l.push({outside:!0});for(let d=1;d<=r.getDate();d++)l.push({date:`${e}-${String(d).padStart(2,"0")}`});for(;l.length%7!==0;)l.push({outside:!0});return l}function fp(e,t,n){const[s,r]=t.split("-").map(Number),l=new Date(s,r-2,1),d=new Date(s,r,1),p=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}`,u=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,y=new Date().toISOString().slice(0,10),g=hp(t).map(R=>{if(R.outside)return'<div class="sc-cell sc-outside"></div>';const o=R.date,i=Number(o.split("-")[2]),c=new Date(`${o}T00:00:00`).getDay(),m=e?.[o],h=o===y,b=o===n;let x="",$="";return m&&(x=`<span class="sc-badge">${m.count}件</span>`,$=m.cityGroups.slice(0,3).map(E=>`<span class="sc-city-tag">${E.city}<em>${E.count}</em></span>`).join(""),m.cityGroups.length>3&&($+=`<span class="sc-city-more">+${m.cityGroups.length-3}</span>`)),`
      <div class="sc-cell ${h?"sc-today":""} ${b?"sc-selected":""} ${m?"sc-has-data":""}"
           data-sc-date="${o}">
        <div class="sc-day-header">
          <span class="sc-day-num ${c===0?"sc-sun":c===6?"sc-sat":""}">${i}</span>
          ${x}
        </div>
        <div class="sc-cities">${$}</div>
      </div>
    `}).join(""),w=n&&e?.[n]?gp(e[n]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',P=Object.values(e??{}).reduce((R,o)=>R+o.count,0),A=Object.values(e??{}).reduce((R,o)=>R+o.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${P>0?`月計: <strong>${P}件</strong> / <strong>¥${A.toLocaleString()}</strong>`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${p}">◀</button>
          <span class="sc-month-label">${s}年${r}月</span>
          <button class="sc-nav-btn" data-sc-ym="${u}">▶</button>
        </div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays">
            ${yp.map((R,o)=>`<div class="sc-weekday ${o===0?"sc-sun":o===6?"sc-sat":""}">${R}</div>`).join("")}
          </div>
          <div class="sc-grid">
            ${e===null?'<div class="sc-loading"><div class="loading-spinner"></div><p>読み込み中…</p></div>':g}
          </div>
        </div>

        <div class="sc-detail-col">
          ${w}
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
  `}function gp(e){const t=e.date.replace(/-/g,"/").slice(5),n={};for(const r of e.entries)(n[r.city]??=[]).push(r);const s=Object.entries(n).sort((r,l)=>l[1].length-r[1].length).map(([r,l])=>{const d=l.sort((p,u)=>u.amount-p.amount).map(p=>`
          <div class="sc-customer-row">
            <span class="sc-customer-name" title="${p.customerName}">${p.customerName}</span>
            <span class="sc-customer-amt">${p.amount>0?`¥${p.amount.toLocaleString()}`:"-"}</span>
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${r}（${l.length}件）</div>
          ${d}
        </div>`}).join("");return`
    <p class="sc-detail-date">${t}の出荷</p>
    <p class="sc-detail-meta">${e.count}件 / ¥${e.totalAmount.toLocaleString()}</p>
    ${s}
  `}const vp=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),ma=["月","火","水","木","金"],Mn=6;function bp(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function wp(e,t){if(t.length===0)return 0;const n=[...t].sort((r,l)=>r-l);return n.filter(r=>r<=e).length/n.length}function xp(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function Nn(e){const t=new Date,n=e.map(u=>u.annualRevenue),s=e.map(u=>{const y=bp(u.lastOrderDate,t);let v=0;const g=[];y>=60&&(v+=50,g.push("離反リスク")),u.hasSeasonalProposal&&(v+=30,g.push("季節提案タイミング")),y>=30&&y<60&&(v+=20,g.push("定期巡回"));const w=wp(u.annualRevenue,n),P=Math.round(w*20);P>0&&(v+=P,g.push("金額ウェイト"));const A=xp(g,y);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:v,reasons:g,lastOrderDate:u.lastOrderDate,daysSinceOrder:y,annualRevenue:u.annualRevenue,recommendedAction:A}}).filter(u=>u.priorityScore>0).sort((u,y)=>y.priorityScore-u.priorityScore),r=new Map;for(const u of s){const y=u.areaCode||"その他";r.has(y)||r.set(y,[]),r.get(y).push(u)}const l=[...r.entries()].sort((u,y)=>y[1].reduce((v,g)=>v+g.priorityScore,0)-u[1].reduce((v,g)=>v+g.priorityScore,0)),d=[];let p=0;for(const[u,y]of l){const v=y.sort((g,w)=>w.priorityScore-g.priorityScore);for(let g=0;g<v.length&&!(p>=ma.length);g+=Mn){const w=v.slice(g,g+Mn);d.push({dayLabel:ma[p],area:u,visits:w}),p++}if(p>=ma.length)break}return{candidates:s,weekPlan:d,filterArea:"",filterMinScore:0}}function $p(e){const{candidates:t,weekPlan:n,filterArea:s,filterMinScore:r}=e,l=t.filter(g=>!(s&&g.areaCode!==s||r>0&&g.priorityScore<r)),d=Array.from(new Set(t.map(g=>g.areaCode))).sort(),p=l.length,u=l.filter(g=>g.priorityScore>=50).length,y=l.filter(g=>g.reasons.includes("離反リスク")).length,v=n.reduce((g,w)=>g+w.visits.length,0);return`
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
        <div class="kpi-value">${v}</div>
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
            ${d.map(g=>`<option value="${g}"${s===g?" selected":""}>${g}</option>`).join("")}
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
      ${n.length===0?"<p>訪問候補がありません。</p>":_p(n)}
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
            ${l.map(g=>Sp(g)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function _p(e){return`
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
  `}function Sp(e){return`
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
      <td class="numeric">${vp.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function kp(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=e.map(y=>{const v=y.capacity>0?Math.round(y.currentVolume/y.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${y.tankNo}</strong></td>
          <td class="numeric">${y.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${y.currentVolume>0?y.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${v}%"></div>
            </div>
            <span class="progress-label">${v}%</span>
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
      `}).join(""),r=e.filter(y=>y.status==="in_use").length,l=e.filter(y=>y.status==="aging").length,d=e.filter(y=>y.status==="empty").length,p=e.reduce((y,v)=>y+v.capacity,0),u=e.reduce((y,v)=>y+v.currentVolume,0);return`
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
        <p class="kpi-value">${r} 基</p>
        <p class="kpi-sub">熟成中 ${l} 基</p>
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
  `}function ya(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Pp(e,t,n){const s=e.rows.map((y,v)=>`
      <tr>
        <td class="mono">${y.taxCategory}</td>
        <td>${y.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${v}" data-tax-field="alcoholDegree" value="${y.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${v}" data-tax-field="productionVolume" value="${y.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${v}" data-tax-field="previousBalance" value="${y.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${v}" data-tax-field="exportDeduction" value="${y.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${v}" data-tax-field="sampleDeduction" value="${y.sampleDeduction}" />
        </td>
        <td class="numeric">${y.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${y.taxRate}</td>
        <td class="numeric"><strong>${ya(y.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${v}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),r=e.deductions.map((y,v)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${v}" data-ded-field="type">
            ${Object.keys(wa).map(g=>`<option value="${g}" ${g===y.type?"selected":""}>${wa[g]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${v}" data-ded-field="categoryCode">
            ${hs.map(g=>`<option value="${g.code}" ${g.code===y.categoryCode?"selected":""}>${g.code}:${g.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${v}" data-ded-field="volume" value="${y.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${v}" data-ded-field="reason" value="${y.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${v}" data-ded-field="documentNo" value="${y.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${v}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),l=Array.from({length:12},(y,v)=>v+1),d=e.rows.reduce((y,v)=>y+v.exportDeduction+v.sampleDeduction,0),p=e.rows.reduce((y,v)=>y+v.productionVolume,0),u=p>0?d/p*100:0;return`
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
            ${l.map(y=>`<option value="${y}" ${n===y?"selected":""}>${y}月</option>`).join("")}
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
        <p class="kpi-value">${ya(e.totalTax)}</p>
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
          <tbody>${s||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${e.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${ya(e.totalTax)}</th>
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
  `}const Ep={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let Je=null,Ap=0;const Ca=[];function Lp(){return Je&&document.body.contains(Je)||(Je=document.createElement("div"),Je.className="toast-container",document.body.appendChild(Je)),Je}function O(e,t="success",n){const s=Lp(),r=++Ap,l=t==="error"?5e3:t==="warning"?4e3:3e3,d=document.createElement("div");d.className=`toast toast-${t}`,d.setAttribute("role","status"),d.setAttribute("aria-live","polite"),d.innerHTML=`
    <span class="toast-icon">${Ep[t]}</span>
    <span class="toast-msg">${Dp(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const p={id:r,message:e,type:t,el:d};Ca.push(p),s.appendChild(d),requestAnimationFrame(()=>{d.classList.add("toast-enter")});const u=()=>Cp(p);d.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{d.classList.add("toast-exit"),d.addEventListener("animationend",u,{once:!0})},l)}function Cp(e){const t=Ca.indexOf(e);t!==-1&&(Ca.splice(t,1),e.el.remove())}function Dp(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Pe(e,t={}){const{title:n="確認",confirmLabel:s="OK",cancelLabel:r="キャンセル",variant:l="primary"}=t;return new Promise(d=>{const p=document.createElement("div");p.className="modal-backdrop confirm-backdrop",p.setAttribute("role","dialog"),p.setAttribute("aria-modal","true"),p.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${l}">
            ${l==="danger"?qp:Ip}
          </div>
          <h3 class="confirm-title">${Rt(n)}</h3>
          <p class="confirm-message">${Rt(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${Rt(r)}</button>
          <button class="button ${l} confirm-ok">${Rt(s)}</button>
        </div>
      </div>
    `;const u=v=>{p.classList.add("confirm-exit"),p.addEventListener("animationend",()=>{p.remove()},{once:!0}),d(v)};p.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),p.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),p.addEventListener("click",v=>{v.target===p&&u(!1)});const y=v=>{v.key==="Escape"&&(document.removeEventListener("keydown",y),u(!1))};document.addEventListener("keydown",y),document.body.appendChild(p),requestAnimationFrame(()=>{p.querySelector(".confirm-ok")?.focus()})})}const qp=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,Ip=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function Rt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Rn(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Da(e,t,n){if(t.length===0&&(!n||n.length===0))return;const s=n&&n.length>0?n:Object.keys(t[0]??{}).map(y=>({key:y,label:y})),l=`\uFEFF${[s.map(y=>Rn(y.label)).join(","),...t.map(y=>s.map(v=>Rn(y[v.key])).join(","))].join(`\r
`)}`,d=new Blob([l],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(d),u=document.createElement("a");u.href=p,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(p),0)}const Tp=Object.fromEntries(Wt.map(e=>[e.value,e.label])),Mp=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan","/procurement","/brewing-process"];let nt=[];async function Np(){const{supabaseQueryAll:e}=await q(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>Z);return{supabaseQueryAll:n}},void 0);nt=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const On=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"},{path:"/procurement",title:"調達計画"},{path:"/brewing-process",title:"醸造工程"}];function Zs(e){const t=Na[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function Za(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Rp(){const e=Zs("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const Zt=new Date,Op=Zt.toISOString().slice(0,7),jp=Zt.getFullYear(),Bp=Zt.getMonth()+1,zp=Zt.toISOString().slice(0,10),Fp="C0011",Qe=Rp();function eo(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return Mp.includes(n)?n:"/"}function en(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":case"/procurement":case"/brewing-process":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const jn=eo(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:Za(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Op,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:jp,taxMonth:Bp,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...pd,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...ud},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:zp,route:jn,currentCategory:en(jn),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:Fp,salesPeriod:"month",customRange:{start:"",end:""},quoteState:Ut($a()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCompanySettings:$a(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...Ka},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:Qe.mode,emailRegion:Qe.region,emailHistorySegment:Qe.historySegment,emailTemplateId:Qe.templateId,emailSubject:Qe.subject,emailBody:Qe.body,emailSaveMessage:Qe.saveMessage,emailSending:!1,demandForecast:{...sl},shipmentCalendarData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:zt(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:it,empCapacity:lt},brewingSchedule:[],brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},riceVarieties:[],ricePurchaseCommitments:[],procurementDecisions:{},brewingBatches:[],brewingProcessSteps:[],bpExpandedBatchId:"",bpShowNewForm:!1,globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function Bn(e){return e.slice(0,10)}function Vp(e){return{...e}}function Qt(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function to(){a.invoiceForm=Za(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},Qt()}function ao(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,s)=>{n.productCode.trim()||(t[`lines.${s}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${s}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${s}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${s}.unitPrice`]="単価は0円以上で入力してください。")}),t}function Yp(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,Vp(t))}function Up(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((s,r)=>{const l=r===0?1:2,d=1200*(r+1);return{productCode:s.code,productName:s.name,quantity:l,unitPrice:d,unit:"本",amount:l*d}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function Jp(e){const t=a.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Qp(e){const t=a.masterStats?.customers.find(n=>n.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function no(e){if(Ie(e),a.invoiceErrors=ao(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){_();return}a.invoiceSaving=!0,_(),es(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=Za(),_()}).catch(()=>{a.invoiceSaving=!1,_()})}function so(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((s,r)=>new Date(r.date).getTime()-new Date(s.date).getTime()).filter(s=>{const r=new Date(s.date);return!(t&&r<t||n&&r>n)})}function oo(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?nt:nt.filter(e=>e.area===a.emailRegion);case"history":return nt.filter(e=>e.historySegment===a.emailHistorySegment);default:return nt}}function Hp(){const e=oo();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function ha(e){const t=oo(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(s=>s.email),status:e}}function tn(){return a.user,!1}function _t(){a.globalSearchOpen=!1,a.globalQuery=""}function Kp(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:On.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:On}}function Gp(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?so(a.salesSummary):[]).map(s=>({documentNo:s.documentNo,date:s.date,customerCode:s.customerCode,customerName:s.customerName,amount:s.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((s,r)=>r.balanceAmount-s.balanceAmount).map(s=>({...s})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(s=>({...s})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(s=>({...s})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(s=>({...s})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(s=>({...s})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(s=>({...s}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(s=>({...s}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Da(n,e,t)}function fa(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=en(e),a.sidebarOpen=!1,_t(),an(e)}async function an(e){a.actionLoading=!0,_();try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,_(),a.quoteList=await Ha(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:t}=await q(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>N);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await $t(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await ja());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await Ba(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await q(async()=>{const{fetchShipmentCalendar:n}=await Promise.resolve().then(()=>N);return{fetchShipmentCalendar:n}},void 0);a.shipmentCalendarData=await t(a.shipmentCalendarYearMonth);break}case"/billing":a.billingSummary||(a.billingSummary=await za(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Kt());break;case"/product-power":a.productPower.length===0&&(a.productPower=await os());break;case"/customer-efficiency":a.customerEfficiency=await vt(a.customerEfficiencyYear,a.customerEfficiencyGroupBy);break;case"/customer-analysis":a.customerAnalysis||(a.customerAnalysis=await rs());break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await q(async()=>{const{fetchDemandForecasts:l,fetchDeliverySchedule:d}=await Promise.resolve().then(()=>N);return{fetchDemandForecasts:l,fetchDeliverySchedule:d}},void 0),[s,r]=await Promise.all([t(),n()]);a.demandForecast.forecasts=s.map(l=>({code:l.productCode,name:l.productName,segment:l.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(l.avgMonthly),adjustedAvg:Math.round(l.avgMonthly),nextMonthForecast:Math.round(l.forecastQuantity),annualForecast:Math.round(l.avgMonthly*12),safetyStock:Math.round(l.safetyStock)})),a.demandForecast.deliveries=ol(r)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:n}=await q(async()=>{const{fetchChurnAlerts:s,fetchChurnNotes:r}=await Promise.resolve().then(()=>N);return{fetchChurnAlerts:s,fetchChurnNotes:r}},void 0);if(!a.churnAlert){const s=await t();a.churnAlert=ap(s)}a.churnNotes=await n();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await q(async()=>{const{fetchProductShipmentsFromTable:s}=await Promise.resolve().then(()=>N);return{fetchProductShipmentsFromTable:s}},void 0),n=await t();if(n.length>0)a.seasonalCalendar=Tn(n.map(s=>({code:s.code,name:s.name,category:"",monthlyQuantity:s.monthlyQuantity})));else{const{fetchProductMonthlyShipments:s}=await q(async()=>{const{fetchProductMonthlyShipments:l}=await Promise.resolve().then(()=>N);return{fetchProductMonthlyShipments:l}},void 0),r=await s();a.seasonalCalendar=Tn(r.map(l=>({code:l.code,name:l.name,category:"",monthlyQuantity:l.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:t}=await q(async()=>{const{fetchVisitPriorities:s}=await Promise.resolve().then(()=>N);return{fetchVisitPriorities:s}},void 0),n=await t();if(n.length>0)a.visitPlanner={candidates:n.map(s=>({code:s.customer_code,name:s.customer_name,phone:s.phone,address:s.address,areaCode:s.area_code,businessType:s.business_type,priorityScore:s.priority_score,reasons:s.reasons,lastOrderDate:s.last_order_date,daysSinceOrder:s.days_since_order,annualRevenue:s.annual_revenue,recommendedAction:s.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=Nn(n.map(s=>({code:s.customer_code,name:s.customer_name,phone:s.phone,address1:s.address,areaCode:s.area_code,businessType:s.business_type,annualRevenue:s.annual_revenue,lastOrderDate:s.last_order_date,hasSeasonalProposal:s.reasons.some(r=>r.includes("季節"))})));else{const{supabaseQueryAll:s}=await q(async()=>{const{supabaseQueryAll:u}=await Promise.resolve().then(()=>Z);return{supabaseQueryAll:u}},void 0),[r,l]=await Promise.all([s("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):Ra().then(u=>u.customers)]),d=a.masterStats?.customers??l,p=new Map;r.forEach(u=>{const y=u.legacy_customer_code||"",v=u.sales_date||"",g=Number(u.total_amount)||0,w=p.get(y);!w||v>w.lastDate?p.set(y,{lastDate:v,total:(w?.total??0)+g}):w.total+=g}),a.visitPlanner=Nn(d.filter(u=>u.isActive).map(u=>({code:u.code,name:u.name,phone:u.phone,address1:u.address1,areaCode:u.areaCode,businessType:u.businessType,annualRevenue:p.get(u.code)?.total??0,lastOrderDate:p.get(u.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:n,fetchProductionPlan:s,fetchLabelExclusions:r}=await q(async()=>{const{fetchDemandAnalysis:d,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}=await Promise.resolve().then(()=>N);return{fetchDemandAnalysis:d,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}},void 0);if(!a.demandAnalysis){const[d,p]=await Promise.all([t(a.demandYearsBack*12),n()]);a.demandAnalysis=d,a.safetyStockParams=p}if(a.productionPlan.length===0){const d=await s(a.demandPlanYearMonth);d.length>0?a.productionPlan=d:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=buildPlanFromAnalysis(a.demandPlanYearMonth))}const l=await r(a.demandPlanYearMonth);if(a.calendarLabelExcluded=new Set(l),a.productionPlan.length>0){const d=a.productionPlan.filter(p=>!a.calendarLabelExcluded.has(p.productCode));qe(a.calendarShifts,d,a.calendarCapacity)}break}case"/procurement":case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:n,fetchBrewingSchedule:s,fetchBrewingProductDetail:r,fetchBrewingCustomCategories:l,fetchBrewingCategoryOverrides:d,fetchAllBrewingStockEntries:p,fetchCategoryTypeLinks:u,fetchAvailableProductionTypes:y,fetchBrewingAlcoholSettings:v,fetchBrewingYearlyShipments:g,fetchBrewingSeasonalPattern:w,fetchBrewingForecastOverrides:P,fetchBrewingRiceParams:A,fetchRiceVarieties:R,fetchRicePurchaseCommitments:o,fetchProcurementDecisions:i}=await q(async()=>{const{fetchBrewingPlanSummary:H,fetchBrewingMonthlyTrend:K,fetchBrewingSchedule:G,fetchBrewingProductDetail:de,fetchBrewingCustomCategories:se,fetchBrewingCategoryOverrides:le,fetchAllBrewingStockEntries:Y,fetchCategoryTypeLinks:Q,fetchAvailableProductionTypes:X,fetchBrewingAlcoholSettings:oe,fetchBrewingYearlyShipments:_e,fetchBrewingSeasonalPattern:me,fetchBrewingForecastOverrides:be,fetchBrewingRiceParams:Re,fetchRiceVarieties:ea,fetchRicePurchaseCommitments:Pt,fetchProcurementDecisions:lo}=await Promise.resolve().then(()=>N);return{fetchBrewingPlanSummary:H,fetchBrewingMonthlyTrend:K,fetchBrewingSchedule:G,fetchBrewingProductDetail:de,fetchBrewingCustomCategories:se,fetchBrewingCategoryOverrides:le,fetchAllBrewingStockEntries:Y,fetchCategoryTypeLinks:Q,fetchAvailableProductionTypes:X,fetchBrewingAlcoholSettings:oe,fetchBrewingYearlyShipments:_e,fetchBrewingSeasonalPattern:me,fetchBrewingForecastOverrides:be,fetchBrewingRiceParams:Re,fetchRiceVarieties:ea,fetchRicePurchaseCommitments:Pt,fetchProcurementDecisions:lo}},void 0),c=a.brewingPlanFY,m=`${c}-10-01`,h=`${c+1}-09-30`,[b,x,$,E,k,S,C,L,I,T,j,M,z,F,B,U,J]=await Promise.all([t(m,h).catch(()=>[]),n(m,h).catch(()=>[]),s(c).catch(()=>[]),r(m,h).catch(()=>[]),l().catch(()=>[]),d().catch(()=>({})),p().catch(()=>[]),u().catch(()=>({})),y().catch(()=>[]),v().catch(()=>({})),g().catch(()=>[]),w().catch(()=>[]),P().catch(()=>({})),A().catch(()=>({})),R().catch(()=>[]),o(c).catch(()=>[]),i(c).catch(()=>({}))]);a.brewingPlanData=b,a.brewingMonthlyTrend=x,a.brewingSchedule=$,a.brewingProductDetail=E,a.brewingCustomCategories=k,a.brewingOverrides=S,a.brewingStockEntries=C,a.brewingTypeLinks=L,a.brewingAvailableTypes=I,a.brewingYearlyShipments=j,a.brewingSeasonalPattern=M,a.brewingForecastOverrides=z,a.brewingRiceParams=F,a.riceVarieties=B,a.ricePurchaseCommitments=U,a.procurementDecisions=J,a.brewingAlcoholSettings=T;break}case"/brewing-process":{const{fetchBrewingBatches:t,fetchBrewingProcessSteps:n,fetchBrewingCustomCategories:s}=await q(async()=>{const{fetchBrewingBatches:p,fetchBrewingProcessSteps:u,fetchBrewingCustomCategories:y}=await Promise.resolve().then(()=>N);return{fetchBrewingBatches:p,fetchBrewingProcessSteps:u,fetchBrewingCustomCategories:y}},void 0),r=a.brewingPlanFY,[l,d]=await Promise.all([t(r).catch(()=>[]),s().catch(()=>[])]);a.brewingBatches=l,l.length>0?a.brewingProcessSteps=await n(l.map(p=>p.id)).catch(()=>[]):a.brewingProcessSteps=[],a.brewingCustomCategories=d;break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await ls());break;case"/tanks":a.tankList.length===0&&(a.tankList=await cs());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await ds());break;case"/materials":a.materialList.length===0&&(a.materialList=await ba());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([ps(),us()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([ms(),ys()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await Va(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Ya(a.storeSalesDate),gs()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await q(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>N);return{fetchMailSenders:n}},void 0);if(a.mailSenders=await t(),!a.emailSenderId||!a.mailSenders.find(n=>n.id===a.emailSenderId)){const n=a.mailSenders.find(s=>s.isDefault)??a.mailSenders[0];n&&(a.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await q(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>N);return{fetchCalendarEvents:n}},void 0);a.calendarEvents=await t(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await q(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>N);return{fetchIntegrationSettings:n}},void 0);a.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchShopifyOrders:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>N);return{fetchShopifyOrders:s,fetchIntegrationSettings:r}},void 0);a.shopifyOrders=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchFaxInbox:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>N);return{fetchFaxInbox:s,fetchIntegrationSettings:r}},void 0);a.faxRecords=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/users":{const{fetchUserProfiles:t}=await q(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>N);return{fetchUserProfiles:n}},void 0);a.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:s}=await q(async()=>{const{fetchMyProfile:l,fetchAuditLogs:d,fetchMailSenders:p}=await Promise.resolve().then(()=>N);return{fetchMyProfile:l,fetchAuditLogs:d,fetchMailSenders:p}},void 0),r=a.user?.email??a.myProfile?.email??"";r&&(a.myProfile=await t(r)),a.mailSenders.length===0&&(a.mailSenders=await s()),a.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await q(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>N);return{fetchAuditLogs:n}},void 0);a.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await q(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>N);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:n}=await q(async()=>{const{fetchMapCustomers:l,fetchDeliveryLocations:d}=await Promise.resolve().then(()=>N);return{fetchMapCustomers:l,fetchDeliveryLocations:d}},void 0),[s,r]=await Promise.all([t(),n()]);a.mapCustomers=s,a.deliveryLocations=r}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchCallLogs:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>N);return{fetchCallLogs:s,fetchIntegrationSettings:r}},void 0);a.callLogs=await t(100),a.integrations.length===0&&(a.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchLeadLists:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>N);return{fetchLeadLists:s,fetchIntegrationSettings:r}},void 0);a.leadLists=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await q(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>N);return{fetchWorkflowOrdersFromDb:n}},void 0);a.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await q(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>N);return{fetchTourInquiriesFromDb:n}},void 0);a.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:s}=await q(async()=>{const{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>N);return{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:d}},void 0);a.slackRules=await t(),a.slackLogs=await n(50),a.integrations.length===0&&(a.integrations=await s())}break;case"/":{const{fetchProspects:t,fetchCalendarEvents:n,fetchWorkflowOrdersFromDb:s,fetchTourInquiriesFromDb:r,fetchOrderHeaders:l}=await q(async()=>{const{fetchProspects:d,fetchCalendarEvents:p,fetchWorkflowOrdersFromDb:u,fetchTourInquiriesFromDb:y,fetchOrderHeaders:v}=await Promise.resolve().then(()=>N);return{fetchProspects:d,fetchCalendarEvents:p,fetchWorkflowOrdersFromDb:u,fetchTourInquiriesFromDb:y,fetchOrderHeaders:v}},void 0);a.prospects.length===0&&(a.prospects=await t()),a.calendarEvents.length===0&&(a.calendarEvents=await n(a.calendarYearMonth)),a.materialList.length===0&&(a.materialList=await ba()),a.workflowOrders.length===0&&(a.workflowOrders=await s()),a.tourInquiries.length===0&&(a.tourInquiries=await r()),a.orderHeaders.length===0&&(a.orderHeaders=await l())}break;default:break}}catch(t){console.error("Route data load error:",e,t),O(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{a.actionLoading=!1,_()}}function zn(){if(tn())return Gl(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return Et("sales");case"/cat/brewery":return Et("brewery");case"/cat/purchase":return Et("purchase");case"/cat/more":return Et("more");case"/invoice-entry":return $l(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/quote":return a.quoteEditId===null?Al(a.quoteList,a.quoteListLoading):Rs(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return Cl(a.quoteCompanySettings);case"/email":return vl(Hp());case"/delivery":return a.deliveryNote?fl(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return fp(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate);case"/billing":return a.billingSummary?Wi(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?Cc(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Ol(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return jl(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy);case"/customer-analysis":return a.customerAnalysis?xc(a.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return cl(a.demandForecast);case"/demand":return qd(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return zd(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/procurement":{const e={};if(a.brewingYearlyShipments.length>0){const t=new Date,n=t.getMonth()+1,s=n>=10?t.getFullYear():t.getFullYear()-1,r=[...new Set(a.brewingYearlyShipments.map(u=>u.fy))].filter(u=>u<s).sort(),l=new Map;for(const u of a.brewingSeasonalPattern)l.has(u.brewCategory)||l.set(u.brewCategory,new Map),l.get(u.brewCategory).set(u.monthNum,u.avgMonthlyL);const d=[];for(let u=n;u<=9;u++)d.push(u);if(n>=10)for(let u=1;u<=9;u++)d.push(u);const p=new Map;for(const u of a.brewingYearlyShipments)p.has(u.brewCategory)||p.set(u.brewCategory,new Map),p.get(u.brewCategory).set(u.fy,{shipL:u.shipmentL,annualL:u.annualizedL});for(const[u,y]of p){const v=r.filter(x=>y.has(x)).map(x=>y.get(x).shipL);let g=0;if(v.length>=2){const x=[];for(let $=1;$<v.length;$++)v[$-1]>0&&x.push((v[$]-v[$-1])/v[$-1]);g=x.length>0?x.reduce(($,E)=>$+E,0)/x.length:0}const w=u in a.brewingForecastOverrides?a.brewingForecastOverrides[u]:g,P=v.length>0?v[v.length-1]:y.get(s)?.annualL??0,A=l.get(u)??new Map,R=d.reduce((x,$)=>x+(A.get($)??0),0),o=a.brewingStockEntries.filter(x=>x.brewCategory===u).reduce((x,$)=>x+$.volumeL,0),i=a.brewingAlcoholSettings[u],c=i&&i.targetAlcoholPct>0?i.rawAlcoholPct/i.targetAlcoholPct:1,m=Math.round(o*c),h=Math.max(0,m-Math.round(R)),b=Math.round(P*(1+w));e[u]=Math.max(0,b-h)}}return Yd(e,a.brewingRiceParams,a.brewingCustomCategories,a.brewingSchedule,a.brewingPlanFY,a.riceVarieties,a.ricePurchaseCommitments,a.procurementDecisions)}case"/churn-alert":return a.churnAlert?op(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?dp(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?$p(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/brewing-process":{const e=[...new Set(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール",...a.brewingCustomCategories.map(t=>t.name)])];return ep(a.brewingBatches,a.brewingProcessSteps,e,{expandedBatchId:a.bpExpandedBatchId,showNewForm:a.bpShowNewForm})}case"/jikomi":return a.jikomiView==="calendar"?`${gn(a.jikomiList,a.jikomiView)}${Ql(a.jikomiList)}`:gn(a.jikomiList,a.jikomiView);case"/tanks":return kp(a.tankList);case"/kentei":return Hl(a.kenteiList);case"/materials":return lc(a.materialList)+ic(a.materialEditing,a.materialEditingIsNew);case"/purchase":return mc(a.purchaseList,a.payableList);case"/raw-material":return yc(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Pp(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return Tc(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?gc(a.pipelineMeta,xe,re,a.syncDashboard):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return xd(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return Nc(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return fd(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return Oc(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapCustomers.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>':jc(a.mapCustomers,a.deliveryLocations,a.mapFilters);case"/workflow":return Fc(a.workflowOrders);case"/mobile-order":return Vc(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return Uc(a.tourInquiries,a.tourActiveId);case"/mail-senders":return Hc(a.mailSenders,a.mailSenderEditingId);case"/calendar":return Kc(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return Wc(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return Xc(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Zc(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/users":return ed(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return td(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return ad(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return nd(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return id(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return ld(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return dd(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return Ic(so(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return pc([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return rc(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return Fl(a.invoiceRecords,a.invoiceFilter);case"/ledger":return al(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return Vs(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return Xp();default:return ul(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function Wp(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(r=>!a.dismissedAnnouncements.has(r.id)).map(r=>{const l=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${l.bg};border-bottom:2px solid ${l.border};">
        <span class="announcement-text">${l.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),s=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+s}function Xp(){function e(n,s,r,l){return`<a href="${`${"/".replace(/\/$/,"")||"/"}${n}`}" data-link="${n}" class="home-card">
      <span class="home-card-icon">${s}</span>
      <span class="home-card-label">${r}</span>
      <span class="home-card-desc">${l}</span>
    </a>`}const t=[{title:"販売業務",color:"#1a56db",cards:[e("/invoice-entry","📝","伝票入力","売上・返品を入力"),e("/quote","📄","見積作成","見積書の作成・管理"),e("/invoice","🔍","伝票照会","過去伝票の照会"),e("/delivery","🚚","納品書","納品書の発行"),e("/billing","💳","月次請求","請求書・入金管理"),e("/ledger","📒","得意先台帳","取引履歴の確認")].join("")},{title:"分析・レポート",color:"#7e3af2",cards:[e("/analytics","📊","売上分析","期間・商品・得意先別"),e("/customer-analysis","👥","得意先分析","ABC分析・ランク"),e("/product-power","📦","商品力分析","商品別販売力"),e("/customer-efficiency","⚡","営業効率","訪問効率・コスト"),e("/report","📈","集計帳票","各種集計帳票"),e("/sales","📋","売上一覧","売上明細一覧")].join("")},{title:"営業・顧客管理",color:"#0e9f6e",cards:[e("/churn-alert","🎯","営業アクション","離反リスク・フォロー"),e("/visit-planner","📅","訪問計画","訪問スケジュール"),e("/map","🗺️","取引先マップ","地図で取引先を確認"),e("/prospects","🌱","新規営業","新規開拓の進捗"),e("/email","✉️","メール配信","一斉メール配信"),e("/seasonal-calendar","🌸","季節提案","季節別提案管理")].join("")},{title:"受注・仕入",color:"#e3a008",cards:[e("/workflow","🔄","受注ワークフロー","受注から出荷まで"),e("/shopify","🛒","Shopify注文","EC受注の確認"),e("/purchase","📥","仕入・買掛","仕入管理・買掛金"),e("/payment","💰","入金状況","入金・回収状況")].join("")},{title:"製造管理",color:"#e02424",cards:[e("/jikomi","🍶","仕込管理","仕込帳・製造記録"),e("/tanks","🛢️","タンク管理","タンク在庫の管理"),e("/tax","📋","酒税申告","酒税申告書の作成"),e("/demand","📆","需要・生産計画","需要予測・生産計画"),e("/brewing-plan","🗓️","醸造計画","年間醸造スケジュール"),e("/procurement","🌾","調達計画","原料米の調達・予算"),e("/brewing-process","🍶","醸造工程","バッチ別の醸造工程管理")].join("")},{title:"マスタ・設定",color:"#6b7280",cards:[e("/master","⚙️","マスタ管理","商品・得意先マスタ"),e("/store","🏪","店舗・直売所","直売所の販売管理"),e("/tour","🏯","酒蔵見学","見学予約の管理"),e("/setup","🔗","連動設定","酒仙iとの連動"),e("/import","📤","データ取込","CSVデータ取込"),e("/users","👤","ユーザー管理","アカウント管理")].join("")}];return`
    <div class="home-page">
      <div class="home-welcome">
        <p class="home-welcome-date">${new Date().toLocaleDateString("ja-JP",{year:"numeric",month:"long",day:"numeric",weekday:"long"})}</p>
        <h2 class="home-welcome-title">何をしますか？</h2>
      </div>
      ${t.map(n=>`
        <div class="home-section">
          <h3 class="home-section-title" style="--section-color:${n.color}">
            <span class="home-section-bar"></span>${n.title}
          </h3>
          <div class="home-card-grid">${n.cards}</div>
        </div>
      `).join("")}
    </div>
  `}function Zp(){if(tn())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${zn()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/procurement":"調達計画","/brewing-process":"醸造工程","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",s=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?wl(a.masterStats.customers,a.pickerQuery):uc(a.masterStats.products,a.pickerQuery):"",r=a.globalSearchOpen?bl(a.globalQuery,Kp()):"",l=a.user?`<span class="app-header-user">${a.user.email}</span>
       <button class="button secondary small" type="button" data-action="auth-logout">ログアウト</button>`:a.authSkipped?'<span class="app-header-user">デモモード</span>':"";return`
    <div class="shell-v2">
      <header class="app-header">
        <div class="app-header-left">${t?`<div class="app-brand">
        <span class="app-brand-mark">syusen-cloud</span>
        <span class="app-brand-name">酒仙i クラウド</span>
       </div>`:`<a href="${"/".replace(/\/$/,"")||"/"}" data-link="/" class="app-back-btn">← ホーム</a>
       <span class="app-page-title">${n}</span>`}</div>
        <div class="app-header-right">
          <button class="button secondary small" type="button" data-action="global-search-open">検索 <kbd>Ctrl+K</kbd></button>
          ${l}
        </div>
      </header>
      ${Wp()}
      <main class="main-v2">
        <div class="view ${a.actionLoading?"is-busy":""}">${zn()}</div>
        <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
      </main>
      ${s}
      ${r}
    </div>
  `}async function eu(){a.actionLoading=!0,_();try{const{fetchSalesSummary:e}=await q(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>N);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,_()}}async function tu(e){a.actionLoading=!0,_();try{a.invoiceRecords=await $t(e)}finally{a.actionLoading=!1,_()}}async function au(e){a.actionLoading=!0,_();try{a.customerLedger=await Oa(e)}finally{a.actionLoading=!1,_()}}function Ie(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,n)=>{const s=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:s,unitPrice:r,amount:s*r}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function He(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function nu(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,_()}),e.querySelectorAll("[data-action='global-search-close']").forEach(o=>{o.addEventListener("click",i=>{o.classList.contains("global-search")&&i.target instanceof HTMLElement&&!i.target.classList.contains("global-search")||(_t(),_())})}),e.querySelector("#global-search-input")?.addEventListener("input",o=>{a.globalQuery=o.target.value,_()}),e.querySelectorAll("[data-action='global-nav']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.path;i&&(_t(),fa(i))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{Gp()}),e.querySelectorAll("[data-jikomi-tab]").forEach(o=>{o.addEventListener("click",()=>{a.jikomiView=o.dataset.jikomiTab,_()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const o=e.querySelector("#auth-email")?.value.trim()??"",i=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,_(),yo(o,i).then(async c=>{a.user=c,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:h}=await q(async()=>{const{fetchMyProfile:b,recordAudit:x}=await Promise.resolve().then(()=>N);return{fetchMyProfile:b,recordAudit:x}},void 0);a.myProfile=await m(c.email),await h({action:"sign_in",userEmail:c.email}),_()}).catch(async c=>{try{const m=await sn(o,i);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:h}=await q(async()=>{const{fetchMyProfile:b}=await Promise.resolve().then(()=>N);return{fetchMyProfile:b}},void 0);a.myProfile=await h(m.email)}catch{a.authError=c instanceof Error?c.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,_()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,_()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{ho().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,_()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(o=>{o.addEventListener("click",()=>{a.sidebarOpen=!1,_()})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let o=0;t.addEventListener("touchstart",i=>{o=i.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",i=>{i.changedTouches[0].clientX-o<-60&&(a.sidebarOpen=!1,_())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.id??"";a.dismissedAnnouncements.add(i),_()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelectorAll("[data-link]").forEach(o=>{o.addEventListener("click",i=>{i.preventDefault(),fa(o.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async o=>{o.preventDefault();const i=e.querySelector("#fr-title")?.value??"",c=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",h=e.querySelector("#fr-result");if(!i.trim())return;const b=await as(i,c,m);if(h&&(h.textContent=b?"送信しました":"送信に失敗しました",h.className=`fr-result ${b?"success":"error"}`),b){const x=e.querySelector("#feature-request-form");x&&x.reset()}}),e.querySelectorAll("[data-period]").forEach(o=>{o.addEventListener("click",()=>{a.salesPeriod=o.dataset.period,_()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const o=e.querySelector("#range-start")?.value??"",i=e.querySelector("#range-end")?.value??"";o&&i&&(a.customRange={start:o,end:i},a.salesPeriod="custom",_())}),e.querySelectorAll("[data-edit-customer]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.editCustomer??"",c=a.masterStats?.customers.find(h=>h.id===i);if(!c)return;const m=document.createElement("div");m.innerHTML=Wl(c),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),x=document.getElementById("ec-trade-type")?.value||null,$=await ns(i,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,trade_type:x,manual_override:!0});b&&(b.textContent=$?"保存しました":"保存に失敗",b.className=`fr-result ${$?"success":"error"}`),$&&(document.getElementById("edit-modal")?.remove(),st())})})}),e.querySelectorAll("[data-edit-product]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.editProduct??"",c=a.masterStats?.products.find(h=>h.id===i);if(!c)return;const m=document.createElement("div");m.innerHTML=Xl(c),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),x=await ss(i,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});b&&(b.textContent=x?"保存しました":"保存に失敗",b.className=`fr-result ${x?"success":"error"}`),x&&(document.getElementById("edit-modal")?.remove(),st())})})}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=Ut(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,_()}),e.querySelectorAll("[data-open-quote]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.openQuote,c=await Es(i);if(!c){O("見積の読み込みに失敗しました","error");return}a.quoteState={id:c.id,quoteNo:c.quote_no,quoteDate:c.quote_date,validUntil:c.valid_until??"",customerCode:c.legacy_customer_code??"",customerName:c.customer_name,customerAddress:c.customer_address,subject:c.subject,lines:c.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:c.remarks,taxRate:c.tax_rate,deliveryDate:c.delivery_date,paymentTerms:c.payment_terms,deliveryPlace:c.delivery_place,templateType:c.template_type??"sake",previewMode:!1},a.quoteEditId=i,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,_()})}),e.querySelectorAll("[data-delete-quote]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.deleteQuote,c=o.dataset.quoteNo??i;if(!await Pe(`見積 ${c} を削除しますか？`))return;await Fn("quotes",i)?(a.quoteList=a.quoteList.filter(b=>b.id!==i),O("削除しました","success"),_()):O("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,_(),Ha().then(o=>{a.quoteList=o,a.quoteListLoading=!1,_()})}),e.querySelectorAll("[name='q-template']").forEach(o=>{o.addEventListener("change",()=>{a.quoteState.templateType=o.value,_()})});function n(o){return(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function s(o){return o.length?o.map(i=>`<button class="search-item" type="button" data-select-customer="${n(i.code)}" data-cust-name="${n(i.name)}" data-cust-addr="${n(i.address1||"")}"><span class="mono">${n(i.code)}</span><span style="font-size:13px;font-weight:600;">${n(i.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function r(o){o.querySelectorAll("[data-select-customer]").forEach(i=>{i.addEventListener("click",async()=>{const c=i.dataset.selectCustomer??"";a.quoteState.customerCode=c,a.quoteState.customerName=i.dataset.custName??"",a.quoteState.customerAddress=i.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),o.remove(),a.quotePricing=await va(a.masterStats?.customers??[],c),_()})})}function l(o){const i=e.querySelector("#q-cust-search")?.closest(".form-row");if(!i)return;let c=document.getElementById("cust-search-results");c||(c=document.createElement("div"),c.id="cust-search-results",c.className="search-results",i.after(c));const m=a.masterStats?.customers??[],h=o.trim().toLowerCase(),b=h.length===0?m:m.filter(x=>x.name.includes(o)||x.kanaName.includes(o)||x.code.includes(o)||x.name.toLowerCase().includes(h)||x.kanaName.toLowerCase().includes(h));c.innerHTML=s(b),r(c)}function d(o,i){return o.length?o.map(c=>{const m=i?Fa(c,i):{price:c.salePrice||0,label:"卸価格"},h=c.listPrice||0,b=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${n(c.code)}" data-prod-name="${n(c.name)}" data-prod-price="${m.price}" data-prod-retail="${h}" data-prod-jan="${n(c.janCode??"")}" data-prod-unit="${n(c.unit)}" data-prod-case="${c.caseQty??""}"><span class="mono">${n(c.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${n(c.name)}</span><span class="numeric"${b?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${n(m.label)})</small>${h?`　定価 ¥${h.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function p(o){o.querySelectorAll("[data-add-product]").forEach(i=>{i.addEventListener("click",()=>{const c=i.dataset.addProduct??"",m=i.dataset.prodName??"",h=parseInt(i.dataset.prodPrice??"0"),b=parseInt(i.dataset.prodRetail??"0")||null,x=i.dataset.prodJan??"",$=i.dataset.prodUnit||"本",E=i.dataset.prodCase??"",k=E?parseInt(E):null;a.quoteState.lines.push({productCode:c,productName:m,janCode:x,caseQty:k,quantity:1,unit:$,unitPrice:h,retailPrice:b,amount:h}),a.quoteProductQuery="";const S=e.querySelector("#q-prod-search");S&&(S.value=""),_()})})}function u(o){const i=e.querySelector("#q-prod-search")?.closest(".form-row");if(!i)return;let c=document.getElementById("prod-search-results");if(c||(c=document.createElement("div"),c.id="prod-search-results",c.className="search-results",i.after(c)),!a.masterStats){c.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,h=o.trim().toLowerCase(),b=h.length===0?m:m.filter(x=>x.name.includes(o)||x.kanaName.includes(o)||x.code.includes(o)||x.name.toLowerCase().includes(h)||x.kanaName.toLowerCase().includes(h));c.innerHTML=d(b,a.quotePricing),p(c)}function y(o,i){let c=null;function m(){c||(c=h=>{const b=document.getElementById(i);if(!b){document.removeEventListener("touchstart",c),document.removeEventListener("mousedown",c),c=null;return}o.contains(h.target)||b.contains(h.target)||(b.remove(),document.removeEventListener("touchstart",c),document.removeEventListener("mousedown",c),c=null)},document.addEventListener("touchstart",c,{passive:!0}),document.addEventListener("mousedown",c))}return m}(function(){const o=e.querySelector("#q-cust-search");if(!o)return;const i=y(o,"cust-search-results");o.addEventListener("focus",()=>{l(o.value),i()}),o.addEventListener("compositionend",()=>{a.quoteCustomerQuery=o.value,l(o.value)}),o.addEventListener("input",c=>{c.isComposing||(a.quoteCustomerQuery=o.value,l(o.value))}),o.value&&l(o.value)})(),(function(){const o=e.querySelector("#q-prod-search");if(!o)return;const i=y(o,"prod-search-results");o.addEventListener("focus",()=>{u(o.value),i()}),o.addEventListener("compositionend",()=>{a.quoteProductQuery=o.value,u(o.value)}),o.addEventListener("input",c=>{c.isComposing||(a.quoteProductQuery=o.value,u(o.value))}),o.value&&u(o.value)})(),e.querySelectorAll("[data-select-customer]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.selectCustomer??"";a.quoteState.customerCode=i,a.quoteState.customerName=o.dataset.custName??"",a.quoteState.customerAddress=o.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await va(a.masterStats?.customers??[],i),_()})}),e.querySelector("#q-price-type")?.addEventListener("change",o=>{const i=o.target.value;a.quoteState.manualPriceType=i,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:i}:a.quotePricing={priceType:i,priceGroup:"",individualPrices:new Map},_()}),e.querySelectorAll("[data-add-product]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.addProduct??"",c=o.dataset.prodName??"",m=parseInt(o.dataset.prodPrice??"0"),h=parseInt(o.dataset.prodRetail??"0")||null,b=o.dataset.prodJan??"",x=o.dataset.prodUnit||"本",$=o.dataset.prodCase??"",E=$?parseInt($):null;a.quoteState.lines.push({productCode:i,productName:c,janCode:b,caseQty:E,quantity:1,unit:x,unitPrice:m,retailPrice:h,amount:m}),a.quoteProductQuery="",_()})}),(()=>{const o=e.querySelector("#q-prospect-search");if(!o)return;const i=y(o,"q-prospect-results");function c(m){let h=document.getElementById("q-prospect-results");if(!h)return;const b=m.trim(),x=b.length===0?a.prospects.slice(0,8):a.prospects.filter($=>$.companyName.includes(b)||($.contactName??"").includes(b)).slice(0,8);if(x.length===0){h.innerHTML="";return}h.className="search-results",h.innerHTML=x.map($=>`<button class="search-item" type="button" data-select-prospect="${$.id}" data-prospect-name="${n($.companyName)}" data-prospect-addr="${n($.address??"")}"><span style="font-size:13px;font-weight:600;">${n($.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${n($.contactName??"")} ${$.address?"· "+$.address.slice(0,20):""}</span></button>`).join(""),h.querySelectorAll("[data-select-prospect]").forEach($=>{$.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=$.dataset.prospectName??"",a.quoteState.customerAddress=$.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=$.dataset.selectProspect??"";const E=a.quoteState.manualPriceType??"";a.quotePricing={priceType:E,priceGroup:"",individualPrices:new Map},o.value="",h&&(h.innerHTML=""),_()})})}o.addEventListener("focus",()=>{c(o.value),i()}),o.addEventListener("input",m=>{m.isComposing||c(o.value)}),o.addEventListener("compositionend",()=>c(o.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const o=e.querySelector("#q-prospect-search")?.value.trim()??"",i=document.createElement("div");i.className="modal-backdrop",i.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",i.innerHTML=`
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
    `,document.body.appendChild(i),i.querySelector("#pq-company")?.focus();const c=()=>i.remove();i.addEventListener("click",m=>{m.target===i&&c()}),i.querySelector("#prospect-quick-close")?.addEventListener("click",c),i.querySelector("#prospect-quick-close2")?.addEventListener("click",c),i.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const m=(i.querySelector("#pq-company")?.value??"").trim();if(!m){O("会社名は必須です","warning");return}const h={id:crypto.randomUUID(),companyName:m,contactName:i.querySelector("#pq-contact")?.value.trim()||void 0,address:i.querySelector("#pq-address")?.value.trim()||void 0,phone:i.querySelector("#pq-phone")?.value.trim()||void 0,note:i.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:b,fetchProspects:x}=await q(async()=>{const{saveProspect:k,fetchProspects:S}=await Promise.resolve().then(()=>N);return{saveProspect:k,fetchProspects:S}},void 0),$=await b(h);if(!$){O("登録失敗","error");return}a.prospects=await x(),a.quoteState.customerCode="",a.quoteState.customerName=$.companyName,a.quoteState.customerAddress=$.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=$.id;const E=a.quoteState.manualPriceType??"";a.quotePricing={priceType:E,priceGroup:"",individualPrices:new Map},c(),O(`${$.companyName} を見込み顧客として登録しました`,"success"),_()})});function v(){Dt(a.quoteState);const o=e.querySelector("#q-preview-scaler");if(!o)return;o.innerHTML=Rs(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const i=o.querySelector(".q-preview-doc"),c=o.parentElement?.clientWidth??0,m=i?.offsetWidth??0;if(c>0&&m>0&&m>c-24){const h=(c-24)/m;o.style.transform=`scale(${h})`,o.style.transformOrigin="top left",o.style.height=`${((i?.offsetHeight??0)+48)*h}px`}else o.style.transform="",o.style.height=""}for(const o of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${o}`)?.addEventListener("input",v);e.querySelector("#q-remarks")?.addEventListener("input",v),e.querySelectorAll(".qty-input").forEach(o=>{o.addEventListener("change",()=>{const i=parseInt(o.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.quantity=parseFloat(o.value)||0,c.amount=c.quantity*c.unitPrice,v())})}),e.querySelectorAll(".price-input").forEach(o=>{o.addEventListener("change",()=>{const i=parseInt(o.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.unitPrice=parseInt(o.value)||0,c.amount=c.quantity*c.unitPrice,v())})}),e.querySelectorAll(".jan-input").forEach(o=>{o.addEventListener("change",()=>{const i=parseInt(o.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.janCode=o.value,v())})}),e.querySelectorAll(".case-qty-input").forEach(o=>{o.addEventListener("change",()=>{const i=parseInt(o.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.caseQty=o.value?parseInt(o.value):null,v())})}),e.querySelectorAll(".retail-price-input").forEach(o=>{o.addEventListener("change",()=>{const i=parseInt(o.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.retailPrice=o.value?parseInt(o.value):null,v())})}),e.querySelectorAll("[data-remove-line]").forEach(o=>{o.addEventListener("click",()=>{const i=parseInt(o.dataset.removeLine??"0");a.quoteState.lines.splice(i,1),_()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{Dt(a.quoteState),a.quoteState.previewMode=!0,_()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,_()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async o=>{const i=o.currentTarget;i.disabled=!0,i.textContent="生成中…",a.quoteState.previewMode||Dt(a.quoteState);try{await Tl(a.quoteState,a.quoteCompanySettings)}finally{i.disabled=!1,i.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{Dt(a.quoteState);const o=a.quoteState,i=o.lines.reduce(($,E)=>$+E.amount,0),c=Math.round(i*o.taxRate/100),m=i+c;if(!o.quoteNo)try{const{supabaseRpc:$}=await q(async()=>{const{supabaseRpc:k}=await Promise.resolve().then(()=>Z);return{supabaseRpc:k}},void 0),E=await $("generate_quote_no",{});o.quoteNo=E??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{o.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const h=new Date().toISOString().slice(0,10),b=o.templateType==="sake"||o.templateType==="standard"?o.templateType:"sake",x={quote_no:o.quoteNo,quote_date:o.quoteDate||h,valid_until:o.validUntil||null,legacy_customer_code:o.customerCode||null,customer_name:o.customerName||"",customer_address:o.customerAddress||"",subject:o.subject||"",template_type:b,subtotal:i,tax_amount:c,total_amount:m,tax_rate:o.taxRate||10,remarks:o.remarks||"",delivery_date:o.deliveryDate||"",payment_terms:o.paymentTerms||"",delivery_place:o.deliveryPlace||"",updated_at:new Date().toISOString()};try{let $=o.id;if(o.id){const E=await fetch(`${xe}/rest/v1/quotes?id=eq.${encodeURIComponent(o.id)}`,{method:"PATCH",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(x)});if(!E.ok){const k=await E.text();throw new Error(`quotes更新失敗 ${E.status}: ${k}`)}await fetch(`${xe}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(o.id)}`,{method:"DELETE",headers:{apikey:re,Authorization:`Bearer ${re}`}})}else{const E=await fetch(`${xe}/rest/v1/quotes`,{method:"POST",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(x)});if(!E.ok){const S=await E.text();throw new Error(`quotes作成失敗 ${E.status}: ${S}`)}const k=await E.json();if(!k?.[0]?.id)throw new Error("IDが返りませんでした");$=k[0].id,o.id=$}if(o.lines.length>0){const E=o.lines.map((S,C)=>({quote_id:$,line_no:C+1,legacy_product_code:S.productCode||null,product_name:S.productName,jan_code:S.janCode||null,case_qty:S.caseQty??null,quantity:S.quantity,unit:S.unit,unit_price:S.unitPrice,retail_price:S.retailPrice??null,amount:S.amount})),k=await fetch(`${xe}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(E)});if(!k.ok){const S=await k.text();throw new Error(`明細保存失敗 ${k.status}: ${S}`)}}O(`見積 ${o.quoteNo} を保存しました`,"success"),_()}catch($){console.error("[save-quote]",$),O(`保存失敗: ${String($).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const o=c=>document.getElementById(c)?.value??"",i={...a.quoteCompanySettings,companyName:o("qs-company-name"),companyPostal:o("qs-company-postal"),companyAddress1:o("qs-company-addr1"),companyAddress2:o("qs-company-addr2"),companyTel:o("qs-company-tel"),companyFax:o("qs-company-fax"),companyEmail:o("qs-company-email"),companyRegistrationNo:o("qs-company-regno"),bankName:o("qs-bank-name"),bankBranch:o("qs-bank-branch"),bankAccountType:o("qs-bank-type"),bankAccountNo:o("qs-bank-no"),bankAccountHolder:o("qs-bank-holder"),defaultPaymentTerms:o("qs-payment-terms"),defaultHeaderNote:o("qs-header-note"),defaultFooterNote:o("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};Ge(i),at("quote_company",i),a.quoteCompanySettings=i,O("設定を保存しました","success"),_()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},Ge(a.quoteCompanySettings),at("quote_company",a.quoteCompanySettings),_()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",o=>{const i=o.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},Ge(a.quoteCompanySettings),_()}),e.querySelector("#qs-seal-file")?.addEventListener("change",o=>{const i=o.target.files?.[0];if(!i)return;const c=new FileReader;c.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:c.result},Ge(a.quoteCompanySettings),at("quote_company",a.quoteCompanySettings),_()},c.readAsDataURL(i)}),e.querySelector("#qs-seal-size")?.addEventListener("input",o=>{const i=parseInt(o.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:i},Ge(a.quoteCompanySettings),at("quote_company",a.quoteCompanySettings),_()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},Ge(a.quoteCompanySettings),at("quote_company",a.quoteCompanySettings),_()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.month;i&&(a.demandForecast.calendarMonth=i,_())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.segment;a.demandForecast.selectedSegment=i,_()})}),e.querySelectorAll("[data-demand-tab]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.demandTab;if(i){if(a.demandTab=i,i==="calendar"){const c=new Date().toISOString().slice(0,10);c.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=c)}_()}})});function g(o){const i=a.demandAnalysis,c=a.safetyStockParams;if(!i||c.length===0)return[];const[m,h]=o.split("-"),b=`${parseInt(m)-1}-${h}`,x=i.months.filter($=>$<o).slice(-3);return c.map($=>{const E=$.productionType==="make_to_order",k=i.matrix[$.productCode]?.[b]??0,S=x.map(j=>i.matrix[$.productCode]?.[j]??0),C=S.length>0?S.reduce((j,M)=>j+M,0)/S.length:$.avgMonthlyDemand,L=E?0:k>0?Math.ceil(k):Math.ceil(C),I=E?0:Math.ceil($.safetyStockQty),T=Math.max(0,L+I);return{id:"",yearMonth:o,productCode:$.productCode,productName:$.productName,demandForecast:L,safetyStockTarget:I,openingStock:0,requiredProduction:T,plannedQty:E?0:T,actualQty:0,status:"draft",productionType:$.productionType??"monthly",notes:""}})}e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async o=>{const i=parseInt(o.target.value)||3;a.demandYearsBack=i,a.demandAnalysis=null;const{fetchDemandAnalysis:c}=await q(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>N);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await c(i*12),_()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.code??"",c=parseInt(o.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,b=c/30,x=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),$=Math.ceil(m.avgMonthlyDemand*b+x);return{...m,leadTimeDays:c,safetyStockQty:x,reorderPoint:$}}),_()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.code??"",c=parseFloat(o.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=c>=.99?2.33:c>=.97?1.88:c>=.95?1.65:c>=.9?1.28:1.04,b=m.leadTimeDays/30,x=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),$=Math.ceil(m.avgMonthlyDemand*b+x);return{...m,serviceLevel:c,safetyStockQty:x,reorderPoint:$}}),_()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async o=>{if(a.safetyStockParams.length===0)return;const i=o.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveSafetyStockParamsBulk:c}=await q(async()=>{const{saveSafetyStockParamsBulk:h}=await Promise.resolve().then(()=>N);return{saveSafetyStockParamsBulk:h}},void 0),m=await c(a.safetyStockParams);i.disabled=!1,i.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const o=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),i=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(c=>{const m=o>=.99?2.33:o>=.97?1.88:o>=.95?1.65:o>=.9?1.28:1.04,h=i/30,b=Math.ceil(m*c.demandStdDev*Math.sqrt(h)),x=Math.ceil(c.avgMonthlyDemand*h+b);return{...c,serviceLevel:o,leadTimeDays:i,safetyStockQty:b,reorderPoint:x}}),_()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.code??"",c=o.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===i?{...m,productionType:c}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async o=>{const i=o.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarShifts=zt(i,1,0);const{fetchProductionPlan:c}=await q(async()=>{const{fetchProductionPlan:h}=await Promise.resolve().then(()=>N);return{fetchProductionPlan:h}},void 0),m=await c(i);a.productionPlan=m.length>0?m:g(i),qe(a.calendarShifts,a.productionPlan.filter(h=>!a.calendarLabelExcluded.has(h.productCode)),a.calendarCapacity),_()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(o=>{o.addEventListener("click",()=>{a.demandPlanTypeFilter=o.dataset.filter??"all",_()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.sortCol??"";a.demandSort?.column===i?a.demandSort=a.demandSort.dir==="desc"?{column:i,dir:"asc"}:null:a.demandSort={column:i,dir:"desc"},_()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=g(a.demandPlanYearMonth),_()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",o=>{const i=o.target.files?.[0];if(!i)return;const c=new FileReader;c.onload=async()=>{const{parseCSV:m}=await q(async()=>{const{parseCSV:I}=await Promise.resolve().then(()=>bd);return{parseCSV:I}},void 0),{columns:h,rows:b}=m(c.result),x=document.getElementById("csv-import-status"),$=h.find(I=>/商品コード|product_code|code|コード/i.test(I)),E=h.find(I=>/在庫|stock|期首|opening/i.test(I)),k=h.find(I=>/計画|plan|planned|生産/i.test(I));if(!$){x&&(x.style.display="block",x.style.background="rgba(197,61,61,0.1)",x.style.color="#c53d3d",x.textContent=`エラー: 商品コード列が見つかりません。列名: ${h.join(", ")}`);return}let S=0,C=0,L=0;for(const I of b){const T=(I[$]??"").trim();if(!T)continue;const j=a.productionPlan.find(M=>M.productCode===T);if(j){if(S++,E&&I[E]!==void 0&&I[E]!==""){const M=parseFloat(I[E])||0;j.openingStock=M,j.requiredProduction=Math.max(0,j.demandForecast+j.safetyStockTarget-M),j.plannedQty>0&&!k&&(j.plannedQty=j.requiredProduction),C++}k&&I[k]!==void 0&&I[k]!==""&&(j.plannedQty=parseFloat(I[k])||0,L++)}}x&&(x.style.display="block",S===0?(x.style.background="rgba(183,121,31,0.1)",x.style.color="#b7791f",x.textContent=`一致する商品コードが見つかりませんでした（CSV: ${b.length}行）`):(x.style.background="rgba(47,133,90,0.1)",x.style.color="#2f855a",x.textContent=`${S}商品に反映: 在庫${C}件${L>0?` / 計画${L}件`:""} 更新`),setTimeout(()=>{x.style.display="none"},5e3)),_()},c.readAsText(i,"UTF-8"),o.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(c=>{const m=c.dataset.code??"",h=a.productionPlan.find(b=>b.productCode===m);h&&(h.plannedQty=parseFloat(c.value)||0)});const{saveProductionPlan:o}=await q(async()=>{const{saveProductionPlan:c}=await Promise.resolve().then(()=>N);return{saveProductionPlan:c}},void 0);await Promise.all(a.productionPlan.map(c=>o(c)));const{fetchProductionPlan:i}=await q(async()=>{const{fetchProductionPlan:c}=await Promise.resolve().then(()=>N);return{fetchProductionPlan:c}},void 0);a.productionPlan=await i(a.demandPlanYearMonth),_()}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.date??"",c=a.calendarShifts.find(m=>m.date===i);c&&(c.confirmed?a.calendarSelectedDate=a.calendarSelectedDate===i?null:i:c.partTimers>0||c.employees>0?(c.partTimers=0,c.employees=0,qe(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=i):(c.partTimers=1,c.employees=0,qe(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=i),_())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async o=>{const i=o.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveLabelExclusions:c}=await q(async()=>{const{saveLabelExclusions:b}=await Promise.resolve().then(()=>N);return{saveLabelExclusions:b}},void 0),m=[...a.calendarLabelExcluded],h=await c(a.demandPlanYearMonth,m);i.disabled=!1,i.textContent=h?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.code??"",m=document.getElementById("cal-label-list")?.scrollTop??0;o.checked?a.calendarLabelExcluded.delete(i):a.calendarLabelExcluded.add(i);const h=a.productionPlan.filter(b=>!a.calendarLabelExcluded.has(b.productCode));qe(a.calendarShifts,h,a.calendarCapacity),_(),requestAnimationFrame(()=>{const b=document.getElementById("cal-label-list");b&&(b.scrollTop=m)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.type??"",m=document.getElementById("cal-label-list")?.scrollTop??0,h=a.productionPlan.filter(x=>x.productionType===i);if(o.checked)for(const x of h)a.calendarLabelExcluded.delete(x.productCode);else for(const x of h)a.calendarLabelExcluded.add(x.productCode);const b=a.productionPlan.filter(x=>!a.calendarLabelExcluded.has(x.productCode));qe(a.calendarShifts,b,a.calendarCapacity),_(),requestAnimationFrame(()=>{const x=document.getElementById("cal-label-list");x&&(x.scrollTop=m)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",o=>{const i=parseInt(o.target.value)||it;a.calendarCapacity.partCapacity=i;const c=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));qe(a.calendarShifts,c,a.calendarCapacity),_()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",o=>{const i=parseInt(o.target.value)||lt;a.calendarCapacity.empCapacity=i;const c=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));qe(a.calendarShifts,c,a.calendarCapacity),_()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.date??"",c=parseInt(o.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.partTimers=c),_()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.date??"",c=parseInt(o.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.employees=c),_()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async o=>{const i=o.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarSelectedDate=null,a.calendarShifts=zt(i,1,0);const{fetchProductionPlan:c,fetchLabelExclusions:m}=await q(async()=>{const{fetchProductionPlan:x,fetchLabelExclusions:$}=await Promise.resolve().then(()=>N);return{fetchProductionPlan:x,fetchLabelExclusions:$}},void 0),[h,b]=await Promise.all([c(i),m(i)]);a.productionPlan=h.length>0?h:g(i),a.calendarLabelExcluded=new Set(b),qe(a.calendarShifts,a.productionPlan.filter(x=>!a.calendarLabelExcluded.has(x.productCode)),a.calendarCapacity),_()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",o=>{const i=parseInt(o.target.value)||0;a.calendarDefaultPart=i;for(const c of a.calendarShifts)if(!c.confirmed){const m=new Date(c.date).getDay()===0||new Date(c.date).getDay()===6;c.partTimers=m?0:i}_()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",o=>{const i=parseInt(o.target.value)||0;a.calendarDefaultEmp=i;for(const c of a.calendarShifts)if(!c.confirmed){const m=new Date(c.date).getDay()===0||new Date(c.date).getDay()===6;c.employees=m?0:i}_()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=zt(a.demandPlanYearMonth,1,0),qe(a.calendarShifts,a.productionPlan.filter(o=>!a.calendarLabelExcluded.has(o.productCode)),a.calendarCapacity),_()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const o of a.calendarShifts)o.confirmed=!0;_()}),e.querySelectorAll("[data-action='select-month']").forEach(o=>{o.addEventListener("click",()=>{const i=parseInt(o.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=i,_())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterArea=o.target.value,_())}),e.querySelector("#visit-filter-score")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(o.target.value)||0,_())}),e.querySelectorAll("[data-sort-col]").forEach(o=>{o.addEventListener("click",i=>{const c=o.dataset.sortCol??"",m=i.shiftKey;a.route==="/product-power"?a.productSortState=ct(a.productSortState,c,m):a.route==="/customer-efficiency"?a.customerSortState=ct(a.customerSortState,c,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=ct(a.dashboardSortState,c,m):a.route==="/master"?a.masterSortState=ct(a.masterSortState,c,m):a.route==="/analytics"&&(a.analyticsSortState=ct(a.analyticsSortState,c,m)),_()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(o=>{o.addEventListener("click",async()=>{const i=parseInt(o.dataset.year??"",10);i&&(a.customerEfficiencyYear=i,a.customerEfficiency=await vt(i,a.customerEfficiencyGroupBy),_())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async o=>{const i=parseInt(o.target.value,10);i&&(a.customerEfficiencyYear=i,a.customerEfficiency=await vt(i,a.customerEfficiencyGroupBy),_())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.groupby??"billing";a.customerEfficiencyGroupBy=i,a.customerEfficiency=await vt(a.customerEfficiencyYear,i),_()})}),e.querySelectorAll("[data-product-period]").forEach(o=>{o.addEventListener("click",()=>{a.productPeriod=o.dataset.productPeriod??"year",_()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const o=document.getElementById("pp-range-start")?.value??"",i=document.getElementById("pp-range-end")?.value??"";o&&i&&(a.productCustomStart=o,a.productCustomEnd=i,a.productPeriod="custom",_())}),e.querySelectorAll("[data-product-filter]").forEach(o=>{o.addEventListener("click",()=>{a.productFilter=o.dataset.productFilter??"all",_()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async o=>{const i=o.currentTarget;i.disabled=!0,i.textContent="更新中…",await st(),i.disabled=!1,i.textContent="↻ 更新",O("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const o=e.querySelector("#sales-start")?.value??"",i=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:o,endDate:i},eu()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const o={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=o,tu(o)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const o=e.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=o.trim().toUpperCase(),au(a.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{a.masterTab=o.dataset.tab,a.masterFilter={...Ka},_()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",tradeType:e.querySelector("#master-trade-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},_()}),e.querySelector("#master-search")?.addEventListener("keydown",o=>{o.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(o=>{o.addEventListener("click",()=>{const i=Number(o.dataset.page);i>=1&&(a.masterFilter={...a.masterFilter,page:i},_())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.table;if(!i)return;a.rawSelectedTable=i,a.rawPage=1;const c=await jt(i,1);a.rawRecords=c.records,a.rawTotalCount=c.total,_()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const o=await jt(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,_()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const o=await jt(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,_()}),e.querySelectorAll("[data-analytics-tab]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsTab=o.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:c}=await q(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}=await Promise.resolve().then(()=>N);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}},void 0);a.analyticsPeriodOptions=await c(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await i(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}_()})}),e.querySelectorAll("[data-analytics-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:c,fetchPeriodChartData:m,prevYearFilter:h}=await q(async()=>{const{fetchAnalyticsByPeriod:x,fetchAvailablePeriods:$,fetchPeriodChartData:E,prevYearFilter:k}=await Promise.resolve().then(()=>N);return{fetchAnalyticsByPeriod:x,fetchAvailablePeriods:$,fetchPeriodChartData:E,prevYearFilter:k}},void 0),b=o.dataset.analyticsPeriod;if(a.analyticsPeriod=b,a.analyticsDrilldown=null,b==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await c(a.analyticsTab,b),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const x=a.analyticsPeriodFilter,[$,E,k]=await Promise.all([i(a.analyticsTab,b,x),m(b,x),m(b,h(x))]);a.analyticsPeriodRows=$,a.analyticsPeriodChartData=E,a.analyticsPrevYearChartData=k}_()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async o=>{const{fetchAnalyticsByPeriod:i,fetchPeriodChartData:c,prevYearFilter:m}=await q(async()=>{const{fetchAnalyticsByPeriod:x,fetchPeriodChartData:$,prevYearFilter:E}=await Promise.resolve().then(()=>N);return{fetchAnalyticsByPeriod:x,fetchPeriodChartData:$,prevYearFilter:E}},void 0);a.analyticsPeriodFilter=o.target.value,a.analyticsDrilldown=null;const h=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:x}=await q(async()=>{const{fiscalYearToDateRange:T}=await Promise.resolve().then(()=>Sn);return{fiscalYearToDateRange:T}},void 0),$=parseInt(h),E=x($);x($-1);const k=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:S}=await q(async()=>{const{supabaseRpc:T}=await Promise.resolve().then(()=>Z);return{supabaseRpc:T}},void 0),[C,L,I]=await Promise.all([S(k,{p_date_from:E.from,p_date_to:E.to}),c("yearly",h),c("yearly",String($-1))]);a.analyticsPeriodRows=(C??[]).map(T=>({code:String(T.code??""),name:String(T.name??""),amount:Number(T.amount??0),quantity:Number(T.quantity??0),documents:Number(T.documents??0),volumeMl:Number(T.volume_ml??0)})),a.analyticsPeriodChartData=(L??[]).map(T=>({...T})),a.analyticsPrevYearChartData=(I??[]).map(T=>({...T}))}else{const[x,$,E]=await Promise.all([i(a.analyticsTab,a.analyticsPeriod,h),c(a.analyticsPeriod,h),c(a.analyticsPeriod,m(h))]);a.analyticsPeriodRows=x,a.analyticsPeriodChartData=$,a.analyticsPrevYearChartData=E}_()}),e.querySelectorAll("[data-fiscal-mode]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsFiscalMode=o.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:i}=await q(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>Sn);return{monthToFiscalYear:m}},void 0),c=new Set;for(const m of a.salesAnalytics.monthlySales)c.add(i(m.month));a.analyticsPeriodOptions=[...c].sort((m,h)=>h-m).map(String)}else{const{fetchAvailablePeriods:i}=await q(async()=>{const{fetchAvailablePeriods:c}=await Promise.resolve().then(()=>N);return{fetchAvailablePeriods:c}},void 0);a.analyticsPeriodOptions=await i(a.analyticsTab,"yearly")}_()})}),e.querySelectorAll("[data-chart-metric]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsChartMetric=o.dataset.chartMetric,_()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.analyticsDrilldown??"",c=o.dataset.drilldownName??i,m=a.analyticsTab,{fetchCustomerProductBreakdown:h,fetchProductCustomerBreakdown:b,fetchEntityMonthlySales:x,periodToDateRange:$}=await q(async()=>{const{fetchCustomerProductBreakdown:C,fetchProductCustomerBreakdown:L,fetchEntityMonthlySales:I,periodToDateRange:T}=await Promise.resolve().then(()=>N);return{fetchCustomerProductBreakdown:C,fetchProductCustomerBreakdown:L,fetchEntityMonthlySales:I,periodToDateRange:T}},void 0),E=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?$(a.analyticsPeriod,a.analyticsPeriodFilter):null,[k,S]=await Promise.all([x(i,m==="customers"?"customer":"product"),m==="customers"?h(i,E?.from,E?.to):b(i,E?.from,E?.to)]);a.analyticsDrilldown={tab:m,code:i,name:c,monthlySales:k,breakdownRows:S},_()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,_()}),e.querySelector("#staff-filter-input")?.addEventListener("input",o=>{a.analyticsStaffFilter=o.target.value,_()}),e.querySelectorAll("[data-staff-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.staffDrilldown??"",c=o.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:h,periodToDateRange:b}=await q(async()=>{const{fetchStaffCustomerBreakdown:S,fetchStaffProductBreakdown:C,periodToDateRange:L}=await Promise.resolve().then(()=>N);return{fetchStaffCustomerBreakdown:S,fetchStaffProductBreakdown:C,periodToDateRange:L}},void 0),x=b(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),$=a.analyticsStaffDrilldown?.breakdownTab??"customers",[E,k]=await Promise.all([m(i,x?.from,x?.to),h(i,x?.from,x?.to)]);a.analyticsStaffDrilldown={code:i,name:c,breakdownTab:$,customerRows:E,productRows:k},_()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:o.dataset.staffBreakdownTab},_())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,_()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",o=>{a.analyticsTagFilter=o.target.value,_()}),e.querySelectorAll("[data-staff-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAvailablePeriods:i,fetchStaffTotalsByPeriod:c,periodToDateRange:m}=await q(async()=>{const{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:x,periodToDateRange:$}=await Promise.resolve().then(()=>N);return{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:x,periodToDateRange:$}},void 0),h=o.dataset.staffPeriod;if(a.analyticsStaffPeriod=h,a.analyticsStaffDrilldown=null,h==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await i("staff",h),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const b=m(h,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await c(b?.from,b?.to)}_()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async o=>{const{fetchStaffTotalsByPeriod:i,periodToDateRange:c}=await q(async()=>{const{fetchStaffTotalsByPeriod:h,periodToDateRange:b}=await Promise.resolve().then(()=>N);return{fetchStaffTotalsByPeriod:h,periodToDateRange:b}},void 0);a.analyticsStaffPeriodFilter=o.target.value;const m=c(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await i(m?.from,m?.to),a.analyticsStaffDrilldown=null,_()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Ie(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},_()}),e.querySelectorAll("[data-action='remove-line']").forEach(o=>{o.addEventListener("click",()=>{Ie(e);const i=parseInt(o.dataset.line??"0",10);a.invoiceForm.lines.splice(i,1),a.invoiceErrors=ao(a.invoiceForm),_()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(o=>{o.addEventListener("click",()=>{Ie(e),Yp(parseInt(o.dataset.line??"0",10)),a.invoiceErrors={},_()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Up(),_()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Ie(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,_()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(o=>{o.addEventListener("click",()=>{Ie(e);const i=parseInt(o.dataset.line??"0",10),c=a.invoiceForm.lines[i];a.pickerMode="product",a.pickerTargetLine=i,a.pickerQuery=c?c.productCode||c.productName:"",_()})}),e.querySelectorAll("[data-action='modal-close']").forEach(o=>{o.addEventListener("click",i=>{o.classList.contains("modal-backdrop")&&i.target instanceof HTMLElement&&!i.target.classList.contains("modal-backdrop")||(Qt(),_())})}),e.querySelectorAll("[data-action='picker-select']").forEach(o=>{const i=async()=>{const c=o.dataset.code??"",m=o.dataset.name??"";if(a.pickerMode==="customer"){a.invoiceForm.customerCode=c,a.invoiceForm.customerName=m,delete a.invoiceErrors.customerCode;const h=a.masterStats?.customers.find(b=>b.code===c);a.invoicePriceGroup=h?.priceGroup||"",!a.invoicePriceGroup&&c&&(a.invoicePriceGroup=await xa(c))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const h=a.invoiceForm.lines[a.pickerTargetLine];if(h){h.productCode=c,h.productName=m;const b=await Ps(a.invoicePriceGroup,c);b>0&&(h.unitPrice=b),h.amount=h.quantity*h.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}Qt(),_()};o.addEventListener("click",i),o.addEventListener("keydown",c=>{c.key==="Enter"&&i()})}),e.querySelector("#modal-search")?.addEventListener("input",o=>{a.pickerQuery=o.target.value,_()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{to(),_()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{no(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Ie(e),Jp(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await xa(a.invoiceForm.customerCode)),_())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Ie(e),Qp(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,_())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(o=>{o.addEventListener("input",()=>{Ie(e),a.invoiceSavedDocNo=null;const i=o.dataset.field;(i==="quantity"||i==="unitPrice")&&_()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Ie(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const o=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=o.trim(),a.deliveryNote=null,a.actionLoading=!0,_(),!a.deliverySearchDocNo){O("伝票番号を入力してください","error"),a.actionLoading=!1,_();return}Ba(a.deliverySearchDocNo).then(i=>{a.deliveryNote=i,a.actionLoading=!1,_()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const o=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=o,a.billingSummary=null,a.actionLoading=!0,_(),za(o).then(i=>{a.billingSummary=i,a.actionLoading=!1,_()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const o=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),i=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=o,a.taxMonth=i,a.taxDeclaration=null,a.actionLoading=!0,_(),Va(o,i).then(c=>{a.taxDeclaration=c,a.actionLoading=!1,_()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:o}=await q(async()=>{const{generateTaxXML:b}=await Promise.resolve().then(()=>N);return{generateTaxXML:b}},void 0),i=o(a.taxDeclaration),c=new Blob([i],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:o}=await q(async()=>{const{generateTaxCSV:b}=await Promise.resolve().then(()=>N);return{generateTaxCSV:b}},void 0),i=o(a.taxDeclaration),c=new Blob([i],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:o}=await q(async()=>{const{saveTaxDeclaration:i}=await Promise.resolve().then(()=>N);return{saveTaxDeclaration:i}},void 0);try{await o(a.taxDeclaration),O("下書き保存しました")}catch(i){O("保存に失敗: "+(i instanceof Error?i.message:String(i)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(o=>{o.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const i=Number(o.dataset.taxRow),c=o.dataset.taxField,m=o.type==="number"?Number(o.value)||0:o.value,h=[...a.taxDeclaration.rows];h[i]={...h[i],[c]:m};const{recalculateTaxDeclaration:b}=await q(async()=>{const{recalculateTaxDeclaration:x}=await Promise.resolve().then(()=>N);return{recalculateTaxDeclaration:x}},void 0);a.taxDeclaration=b({...a.taxDeclaration,rows:h}),_()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=Number(o.dataset.dedRow),c=o.dataset.dedField,m=o.type==="number"?Number(o.value)||0:o.value,h=[...a.taxDeclaration.deductions];h[i]={...h[i],[c]:m},a.taxDeclaration={...a.taxDeclaration,deductions:h},_()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=o.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[i]:o.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:o,TAX_RATE_CATEGORIES:i}=await q(async()=>{const{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}=await Promise.resolve().then(()=>N);return{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}},void 0),c=i[0],m={taxCategory:c.code,taxCategoryName:c.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:c.taxRatePerLiter,taxAmount:0};a.taxDeclaration=o({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),_()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(o=>{o.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const i=Number(o.dataset.taxRow),{recalculateTaxDeclaration:c}=await q(async()=>{const{recalculateTaxDeclaration:h}=await Promise.resolve().then(()=>N);return{recalculateTaxDeclaration:h}},void 0),m=a.taxDeclaration.rows.filter((h,b)=>b!==i);a.taxDeclaration=c({...a.taxDeclaration,rows:m}),_()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const o={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,o]},_()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(o=>{o.addEventListener("click",()=>{if(!a.taxDeclaration)return;const i=Number(o.dataset.dedRow),c=a.taxDeclaration.deductions.filter((m,h)=>h!==i);a.taxDeclaration={...a.taxDeclaration,deductions:c},_()})}),e.querySelectorAll("[data-store-tab]").forEach(o=>{o.addEventListener("click",()=>{a.storeTab=o.dataset.storeTab,_()})}),e.querySelectorAll("[data-import-entity]").forEach(o=>{o.addEventListener("click",()=>{a.importEntity=o.dataset.importEntity,a.importPreview=null,a.importResult=null,_()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const o=Qs(a.importEntity),i=new Blob([o],{type:"text/csv;charset=utf-8"}),c=URL.createObjectURL(i),m=document.createElement("a");m.href=c,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(c)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const i=e.querySelector("#import-file")?.files?.[0];if(!i){O("CSVファイルを選択してください","warning");return}const c=new FileReader;c.onload=()=>{const m=String(c.result??""),{columns:h,rows:b}=Us(m);a.importPreview=Js(a.importEntity,h,b),a.importResult=null,_()},c.readAsText(i,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,_()}),e.querySelectorAll("[data-print-template]").forEach(o=>{o.addEventListener("click",()=>{a.printTemplate=o.dataset.printTemplate,_()})}),e.querySelectorAll("[data-print-field]").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.printField;let c=o.value;(i==="taxRate"||i==="previousBalance"||i==="paymentAmount")&&(c=Number(o.value)||0),a.printData={...a.printData,[i]:c},_()})}),e.querySelectorAll("[data-print-opt]").forEach(o=>{const i=()=>{const c=o.dataset.printOpt;let m;o.type==="checkbox"?m=o.checked:c==="copies"?m=Number(o.value)||1:c==="overlayOpacity"||c==="calibrationOffsetX"||c==="calibrationOffsetY"?m=Number(o.value)||0:m=o.value,a.printOptions={...a.printOptions,[c]:m},_()};o.addEventListener("change",i),o.type==="range"&&o.addEventListener("input",i)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(o=>{o.addEventListener("change",()=>{const i=Number(o.dataset.printLine),c=o.dataset.printLfield,m=[...a.printData.lines];let h=o.value;(c==="quantity"||c==="unitPrice")&&(h=Number(o.value)||0),m[i]={...m[i],[c]:h},m[i].amount=(Number(m[i].quantity)||0)*(Number(m[i].unitPrice)||0),a.printData={...a.printData,lines:m},_()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},_()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(o=>{o.addEventListener("click",()=>{const i=Number(o.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((c,m)=>m!==i)},_()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),O("印刷設定を保存しました")}catch(o){O("保存失敗: "+(o instanceof Error?o.message:String(o)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const o=a.printCompany,i=prompt("会社名",o.name);if(i===null)return;const c=prompt("郵便番号",o.postalCode)??o.postalCode,m=prompt("住所",o.address1)??o.address1,h=prompt("TEL",o.tel)??o.tel,b=prompt("FAX",o.fax)??o.fax,x=prompt("適格請求書登録番号 (T+13桁)",o.registrationNo)??o.registrationNo,$=prompt("取引銀行名",o.bankName)??o.bankName,E=prompt("支店名",o.bankBranch)??o.bankBranch,k=prompt("口座番号",o.bankAccountNo)??o.bankAccountNo,S=prompt("口座名義",o.bankAccountHolder)??o.bankAccountHolder;a.printCompany={...o,name:i,postalCode:c,address1:m,tel:h,fax:b,registrationNo:x,bankName:$,bankBranch:E,bankAccountNo:k,bankAccountHolder:S},_()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,_()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const c=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=ra(o),{savePrintLayout:h}=await q(async()=>{const{savePrintLayout:x}=await Promise.resolve().then(()=>N);return{savePrintLayout:x}},void 0),b={id:`bp1701_${c.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:c,templateKey:"chain_store",positions:m};try{await h(b)?(O(`クラウド保存成功: ${c}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),_()):(O("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(x){O("保存エラー: "+(x instanceof Error?x.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const i=ra(o);a.fdSavedPositions=i;try{localStorage.setItem("sake_fd_positions",JSON.stringify(i)),O(`ローカル保存完了: ${Object.keys(i).length}件`)}catch(c){O("保存失敗: "+(c instanceof Error?c.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const c={templateKey:"chain_store",positions:ra(o),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(c,null,2)],{type:"application/json"}),h=URL.createObjectURL(m),b=document.createElement("a");b.href=h,b.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,b.click(),URL.revokeObjectURL(h)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async o=>{const i=o.target.files?.[0];if(i)try{const c=await i.text(),h=JSON.parse(c).positions;if(!h)throw new Error("positions field not found");a.fdSavedPositions=h,localStorage.setItem("sake_fd_positions",JSON.stringify(h)),O(`インポート成功: ${Object.keys(h).length}件`),_()}catch(c){O("インポート失敗: "+(c instanceof Error?c.message:""),"error")}});const w=e.querySelector("#fd-saved-layouts");w&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:o}=await q(async()=>{const{fetchPrintLayouts:c}=await Promise.resolve().then(()=>N);return{fetchPrintLayouts:c}},void 0),i=await o("chain_store");i.length===0?w.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(w.innerHTML=`☁️ クラウド保存済み (${i.length}件):<br/>`+i.map(c=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${c.id}" style="margin:4px 4px 0 0;">${c.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${c.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),w.querySelectorAll("[data-action='fd-load-layout']").forEach(c=>{c.addEventListener("click",()=>{const m=c.dataset.layoutId,h=i.find(b=>b.id===m);h&&(a.fdSavedPositions=h.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(h.positions)),O(`読込完了: ${h.name}`),_())})}),w.querySelectorAll("[data-action='fd-delete-layout']").forEach(c=>{c.addEventListener("click",async()=>{const m=c.dataset.layoutId;if(!m||!await Pe("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:h}=await q(async()=>{const{deletePrintLayout:x}=await Promise.resolve().then(()=>N);return{deletePrintLayout:x}},void 0);await h(m)?(O("削除しました"),_()):O("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await Pe("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),_())});const P=e.querySelector("#fd-sel-x"),A=e.querySelector("#fd-sel-y");[P,A].forEach(o=>{o?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const i=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);i&&(P&&(i.style.left=P.value+"mm"),A&&(i.style.top=A.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(o=>{o.addEventListener("dragstart",i=>{o.classList.add("wf-dragging"),i.dataTransfer?.setData("text/plain",o.dataset.wfOrder??"")}),o.addEventListener("dragend",()=>o.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(o=>{o.addEventListener("dragover",i=>i.preventDefault()),o.addEventListener("drop",i=>{i.preventDefault();const c=i.dataTransfer?.getData("text/plain"),m=o.dataset.wfStage;if(!c||!m)return;const h=a.workflowOrders.find(b=>b.id===c);h&&(h.stage=m,_())})}),e.querySelectorAll("[data-mo-step]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.moStep;o.disabled||(a.mobileOrder.step=i,_())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",o=>{a.mobileOrder.customerQuery=o.target.value,_()}),e.querySelector("#mo-product-q")?.addEventListener("input",o=>{a.mobileOrder.productQuery=o.target.value,_()}),e.querySelectorAll("[data-mo-select-customer]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.moSelectCustomer,c=a.masterStats?.customers.find(m=>m.id===i);c&&(a.mobileOrder.selectedCustomer=c),_()})}),e.querySelectorAll("[data-mo-add-product]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.moAddProduct,c=a.masterStats?.products.find(h=>h.code===i);if(!c)return;const m=1800;a.mobileOrder.cart.push({productCode:c.code,productName:c.name,quantity:1,unit:"本",unitPrice:m,amount:m}),_()})}),e.querySelectorAll("[data-mo-qty]").forEach(o=>{o.addEventListener("click",()=>{const i=Number(o.dataset.moQty),c=o.dataset.moProduct,m=a.mobileOrder.cart.find(h=>h.productCode===c);m&&(m.quantity=Math.max(0,m.quantity+i),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(h=>h.productCode!==c)),_())})}),e.querySelectorAll("[data-mo-remove]").forEach(o=>{o.addEventListener("click",()=>{const i=Number(o.dataset.moRemove);a.mobileOrder.cart.splice(i,1),_()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const o=e.querySelector("#mo-memo");a.mobileOrder.memo=o?.value??"";const i="MO"+Date.now().toString().slice(-8),c=e.querySelector("[data-action='mo-submit']");c&&(c.disabled=!0,c.textContent="送信中…");const m=a.mobileOrder.cart.reduce((h,b)=>h+b.amount,0);try{const{saveStoreOrder:h}=await q(async()=>{const{saveStoreOrder:b}=await Promise.resolve().then(()=>N);return{saveStoreOrder:b}},void 0);await h(i,a.mobileOrder.selectedCustomer?.name??"不明",a.mobileOrder.selectedCustomer?.code??null,m,a.mobileOrder.memo,a.mobileOrder.cart)}catch(h){console.error("受注保存失敗:",h),O("送信に失敗しました","error"),c&&(c.disabled=!1,c.textContent="受注を送信");return}a.mobileOrder.submittedDocNo=i,a.mobileOrder.step="done",_()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},_()}),e.querySelectorAll("[data-tour-id]").forEach(o=>{o.addEventListener("click",()=>{a.tourActiveId=o.dataset.tourId??null,_()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(o=>{o.addEventListener("click",()=>{const i=a.tourInquiries.find(x=>x.id===a.tourActiveId);if(!i)return;const c=o.dataset.template==="confirm"?Jc:Qc,m=e.querySelector("#tour-confirmed-time"),h=c.replaceAll("{name}",i.name).replaceAll("{partySize}",String(i.partySize)).replaceAll("{confirmedTime}",m?.value??i.visitDate),b=e.querySelector("#tour-reply-body");b&&(b.value=h)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const o=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",i=a.tourInquiries.find(m=>m.id===o);if(!i)return;const c=e.querySelector("#tour-confirmed-time");i.status="confirmed",i.repliedAt=new Date().toISOString(),i.confirmedTime=c?.value??"",O("返信メールを下書き保存し、ステータスを確定にしました"),_()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const o=e.querySelector("#lb-type")?.value??"",i=e.querySelector("#lb-area")?.value??"",c=e.querySelector("#lb-keyword")?.value??"";if(!o&&!c){O("業種かキーワードを入力してください","warning");return}a.leadSearchType=o,a.leadSearchArea=i,a.leadSearchQuery=c,a.leadSearching=!0,_();const m=a.integrations.find($=>$.provider==="google_maps");if(!m||!m.config.api_key){O("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,_();return}const{searchPlaces:h}=await q(async()=>{const{searchPlaces:$}=await Promise.resolve().then(()=>N);return{searchPlaces:$}},void 0),b=[o,c].filter(Boolean).join(" "),x=await h(m,b,i);a.leadSearching=!1,x.error?O("検索失敗: "+x.error,"error"):a.leadSearchResults=x.results,_()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],_()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const o=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!o)return;const i=`ll_${Date.now()}`,c={id:i,name:o,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:h,fetchLeadLists:b,fetchLeadItems:x}=await q(async()=>{const{saveLeadList:k,saveLeadItem:S,fetchLeadLists:C,fetchLeadItems:L}=await Promise.resolve().then(()=>N);return{saveLeadList:k,saveLeadItem:S,fetchLeadLists:C,fetchLeadItems:L}},void 0);await m(c);const $=e.querySelectorAll(".lb-search-check:checked"),E=Array.from($).map(k=>Number(k.dataset.idx));for(const k of E){const S=a.leadSearchResults[k];S&&await h({...S,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:i,businessType:a.leadSearchType})}a.leadLists=await b(),a.leadActiveListId=i,a.leadItems=await x(i),a.leadSearchResults=[],O(`${E.length}件を「${o}」として保存しました`),_()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??null;if(a.leadActiveListId=i,i){const{fetchLeadItems:c}=await q(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>N);return{fetchLeadItems:m}},void 0);a.leadItems=await c(i)}_()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",c=a.leadItems.find(b=>b.id===i);if(!c)return;const{saveLeadItem:m,fetchLeadItems:h}=await q(async()=>{const{saveLeadItem:b,fetchLeadItems:x}=await Promise.resolve().then(()=>N);return{saveLeadItem:b,fetchLeadItems:x}},void 0);await m({...c,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),_()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",c=a.leadItems.find(x=>x.id===i);if(!c)return;const{convertLeadToProspect:m,fetchLeadItems:h}=await q(async()=>{const{convertLeadToProspect:x,fetchLeadItems:$}=await Promise.resolve().then(()=>N);return{convertLeadToProspect:x,fetchLeadItems:$}},void 0);await m(c)&&(O("見込客に追加しました: "+c.companyName),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),_())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const o=e.querySelectorAll(".lb-item-check:checked");if(o.length===0&&!await Pe("全ての新規アイテムを見込客に変換しますか？"))return;const i=o.length>0?Array.from(o).map(b=>b.dataset.id):a.leadItems.filter(b=>b.status==="new").map(b=>b.id),{convertLeadToProspect:c,fetchLeadItems:m}=await q(async()=>{const{convertLeadToProspect:b,fetchLeadItems:x}=await Promise.resolve().then(()=>N);return{convertLeadToProspect:b,fetchLeadItems:x}},void 0);let h=0;for(const b of i){const x=a.leadItems.find($=>$.id===b);x&&x.status==="new"&&await c(x)&&h++}O(`${h}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),_()}),e.querySelectorAll("[data-map-filter]").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.mapFilter;let c;o.type==="checkbox"?c=o.checked:c=o.value,a.mapFilters={...a.mapFilters,[i]:c},_()})}),e.querySelectorAll(".churn-reason-select").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.churnCode??"",c=o.value;try{const{saveChurnNote:m}=await q(async()=>{const{saveChurnNote:x}=await Promise.resolve().then(()=>N);return{saveChurnNote:x}},void 0);await m({customerCode:i,reason:c,memo:"",actionedAt:null});const h=a.churnNotes.find(x=>x.customerCode===i);h?h.reason=c:a.churnNotes.push({customerCode:i,reason:c,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const b=o.closest("tr");if(b){const x=b.querySelector("td:nth-child(2)");if(x){let $=x.querySelector(".reason-badge");!$&&c&&($=document.createElement("span"),$.className="status-pill info reason-badge",$.style.fontSize="0.72rem",x.appendChild($)),$&&($.textContent=c?Tp[c]??"":"")}}O("理由を保存しました")}catch(m){O("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.churnCode??"",c=o.checked,m=o.closest("tr");m&&(m.style.opacity=c?"0.45":"",m.setAttribute("data-actioned",c?"1":"0"));try{const{saveChurnNote:h}=await q(async()=>{const{saveChurnNote:E}=await Promise.resolve().then(()=>N);return{saveChurnNote:E}},void 0),b=a.churnNotes.find(E=>E.customerCode===i),x=b?.reason??"",$=new Date().toISOString().slice(0,10);await h({customerCode:i,reason:x,memo:"",actionedAt:c?$:null}),b?b.actionedAt=c?$:null:a.churnNotes.push({customerCode:i,reason:x,memo:"",actionedAt:c?$:null,updatedAt:new Date().toISOString()}),O(c?"対応済みにしました":"対応済みを解除しました")}catch(h){O("保存に失敗しました","error"),console.error(h)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const o=a.integrations.find(h=>h.provider==="ivry");if(!o||!o.isEnabled){O("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:i,fetchCallLogs:c}=await q(async()=>{const{syncIvryCallLogs:h,fetchCallLogs:b}=await Promise.resolve().then(()=>N);return{syncIvryCallLogs:h,fetchCallLogs:b}},void 0),m=await i(o);m.error?O("同期失敗: "+m.error,"error"):(O(`${m.count}件の通話履歴を同期しました`),a.callLogs=await c(100),_())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const o=a.integrations.find(h=>h.provider==="ivry");if(!o||!o.isEnabled){O("IVRy連携が無効です","warning");return}if(!await Pe("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:i}=await q(async()=>{const{syncPhoneBookToIvry:h}=await Promise.resolve().then(()=>N);return{syncPhoneBookToIvry:h}},void 0),c=[];a.masterStats?.customers.forEach(h=>{c.push({name:h.name,phone:"",customerCode:h.code,note:"既存取引先"})}),a.prospects.forEach(h=>{h.phone&&c.push({name:h.companyName,phone:h.phone,customerCode:h.id,note:`見込客 (${h.stage})`})});const m=await i(o,c);m.error?O("送信失敗: "+m.error,"error"):O(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",c=o.dataset.phone??"",m=prompt(`電話番号 ${c} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const h=a.callLogs.find($=>$.id===i);if(!h)return;const{saveCallLog:b,fetchCallLogs:x}=await q(async()=>{const{saveCallLog:$,fetchCallLogs:E}=await Promise.resolve().then(()=>N);return{saveCallLog:$,fetchCallLogs:E}},void 0);await b({...h,matchedCustomerCode:m}),a.callLogs=await x(100),_()})}),e.querySelectorAll("[data-action='call-memo']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",c=a.callLogs.find(x=>x.id===i);if(!c)return;const m=prompt("メモを入力:",c.notes??"");if(m===null)return;const{saveCallLog:h,fetchCallLogs:b}=await q(async()=>{const{saveCallLog:x,fetchCallLogs:$}=await Promise.resolve().then(()=>N);return{saveCallLog:x,fetchCallLogs:$}},void 0);await h({...c,notes:m}),a.callLogs=await b(100),_()})}),e.querySelectorAll("[data-prospect-view]").forEach(o=>{o.addEventListener("click",()=>{a.prospectViewMode=o.dataset.prospectView,_()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",_()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:c}=await q(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>N);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await c(i)}_()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.prospectId??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:c}=await q(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>N);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await c(i)}_()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(o=>{o.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],_())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const o=a.prospectEditingId==="__new__",i=o?`p_${Date.now()}`:a.prospectEditingId??"",c={id:i,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!c.companyName){O("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:h,recordAudit:b,sendSlackNotification:x}=await q(async()=>{const{saveProspect:E,fetchProspects:k,recordAudit:S,sendSlackNotification:C}=await Promise.resolve().then(()=>N);return{saveProspect:E,fetchProspects:k,recordAudit:S,sendSlackNotification:C}},void 0);await m(c)?(o&&await x("new_prospect",`新規見込客: ${c.companyName} / 想定 ¥${c.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await b({action:o?"prospect_create":"prospect_update",entityType:"prospect",entityId:i,userEmail:a.user?.email}),a.prospects=await h(),a.prospectEditingId=null,_()):O("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=o.dataset.id??"",{deleteProspect:c,fetchProspects:m}=await q(async()=>{const{deleteProspect:h,fetchProspects:b}=await Promise.resolve().then(()=>N);return{deleteProspect:h,fetchProspects:b}},void 0);await c(i)&&(a.prospects=await m(),_())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(o=>{o.addEventListener("click",i=>{i.stopPropagation();const c=o.dataset.id??"",m=o.dataset.name??"",h=o.dataset.addr??"";a.quoteState=Ut(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=m,a.quoteState.customerAddress=h,a.quoteState.isProspect=!0,a.quoteState.prospectId=c,a.quotePricing=null,a.quoteEditId="new",fa("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",i=e.querySelector("#prospect-activity-type")?.value??"call",c=e.querySelector("#prospect-activity-title")?.value??"";if(!c){O("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:h}=await q(async()=>{const{saveProspectActivity:b,fetchProspectActivities:x}=await Promise.resolve().then(()=>N);return{saveProspectActivity:b,fetchProspectActivities:x}},void 0);await m({id:`act_${Date.now()}`,prospectId:o,activityType:i,title:c,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await h(o),_()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("dragstart",i=>{i.dataTransfer?.setData("text/plain",o.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(o=>{o.addEventListener("dragover",i=>i.preventDefault()),o.addEventListener("drop",async i=>{i.preventDefault();const c=i.dataTransfer?.getData("text/plain"),m=o.dataset.prospectStage;if(!c)return;const h=a.prospects.find(b=>b.id===c);if(h&&h.stage!==m){const b={...h,stage:m},{saveProspect:x}=await q(async()=>{const{saveProspect:$}=await Promise.resolve().then(()=>N);return{saveProspect:$}},void 0);await x(b),h.stage=m,_()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:o,saveIntegrationSetting:i}=await q(async()=>{const{fetchIntegrationSettings:$,saveIntegrationSetting:E}=await Promise.resolve().then(()=>N);return{fetchIntegrationSettings:$,saveIntegrationSetting:E}},void 0),m=(a.integrations.length>0?a.integrations:await o()).find($=>$.provider==="slack");if(!m)return;const h=e.querySelector("#slack-webhook")?.value??"",b=e.querySelector("#slack-default-channel")?.value??"",x=e.querySelector("#slack-enabled")?.checked??!1;await i({...m,config:{...m.config,webhook_url:h,default_channel:b},isEnabled:x}),a.integrations=await o(),O("保存しました"),_()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:o,fetchSlackRules:i}=await q(async()=>{const{saveSlackRule:c,fetchSlackRules:m}=await Promise.resolve().then(()=>N);return{saveSlackRule:c,fetchSlackRules:m}},void 0);for(const c of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${c.id}"][data-slack-field="enabled"]`)?.checked??c.enabled,h=e.querySelector(`[data-slack-rule-id="${c.id}"][data-slack-field="channel"]`)?.value??c.channel;await o({...c,enabled:m,channel:h})}a.slackRules=await i(),O("ルールを保存しました"),_()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:o}=await q(async()=>{const{sendSlackNotification:c}=await Promise.resolve().then(()=>N);return{sendSlackNotification:c}},void 0),i=await o("new_order","🧪 これはテスト通知です (syusen-cloud)");i.ok?O("テスト送信成功"):O("送信失敗: "+(i.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,_()}),e.querySelectorAll("[data-action='material-adjust']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.id??"",c=a.materialList.find(m=>m.id===i);c&&(a.materialEditing=c,a.materialEditingIsNew=!1,_())})}),e.querySelectorAll("[data-action='material-close']").forEach(o=>{o.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,_())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const i={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(i.materialType=e.querySelector("#mat-type")?.value??"",!i.code||!i.name){O("コードと品名は必須です","warning");return}const{saveMaterial:c,fetchMaterialList:m}=await q(async()=>{const{saveMaterial:b,fetchMaterialList:x}=await Promise.resolve().then(()=>N);return{saveMaterial:b,fetchMaterialList:x}},void 0);await c(i)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,O("保存しました"),_()):O("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!o||!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:i,fetchMaterialList:c}=await q(async()=>{const{deleteMaterial:m,fetchMaterialList:h}=await Promise.resolve().then(()=>N);return{deleteMaterial:m,fetchMaterialList:h}},void 0);await i(o)&&(a.materialList=await c(),a.materialEditing=null,_())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",_()}),e.querySelectorAll("[data-action='user-edit']").forEach(o=>{o.addEventListener("click",()=>{a.userEditingId=o.dataset.id??null,_()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,_()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const o=a.userEditingId==="__new__",i=o?crypto.randomUUID():a.userEditingId??"",c=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!c||!m){O("名前とメールアドレスは必須です","warning");return}const h={id:i,email:c,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(o){const k=e.querySelector("#user-password")?.value??"";if(k.length<8){O("パスワードは8文字以上必要です","warning");return}try{await sn(c,k)}catch(S){O("Auth登録失敗: "+(S instanceof Error?S.message:""),"error");return}}const{saveUserProfile:b,fetchUserProfiles:x,recordAudit:$}=await q(async()=>{const{saveUserProfile:k,fetchUserProfiles:S,recordAudit:C}=await Promise.resolve().then(()=>N);return{saveUserProfile:k,fetchUserProfiles:S,recordAudit:C}},void 0);await b(h)?(await $({action:o?"user_create":"user_update",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await x(),a.userEditingId=null,O("保存しました"),_()):O("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=o.dataset.id??"",{deleteUserProfile:c,fetchUserProfiles:m,recordAudit:h}=await q(async()=>{const{deleteUserProfile:x,fetchUserProfiles:$,recordAudit:E}=await Promise.resolve().then(()=>N);return{deleteUserProfile:x,fetchUserProfiles:$,recordAudit:E}},void 0);await c(i)?(await h({action:"user_delete",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await m(),_()):O("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const o=e.querySelector("#profile-sender")?.value??"",i={...a.myProfile,defaultMailSenderId:o},{saveUserProfile:c}=await q(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>N);return{saveUserProfile:m}},void 0);await c(i),a.myProfile=i,O("保存しました"),_()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const o=e.querySelector("#profile-new-password")?.value??"";if(o.length<8){O("8文字以上のパスワードを入力してください","warning");return}try{await go(o),O("パスワードを変更しました")}catch(i){O("変更失敗: "+(i instanceof Error?i.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(o=>{o.addEventListener("click",()=>{a.integrationEditingId=o.dataset.id??null,_()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,_()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='int-save']")?.dataset.id??"",i=a.integrations.find($=>$.id===o);if(!i)return;const c={...i.config};Object.keys(c).forEach($=>{const E=e.querySelector(`#int-${$}`);E&&(c[$]=E.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:h,fetchIntegrationSettings:b}=await q(async()=>{const{saveIntegrationSetting:$,fetchIntegrationSettings:E}=await Promise.resolve().then(()=>N);return{saveIntegrationSetting:$,fetchIntegrationSettings:E}},void 0);await h({...i,config:c,isEnabled:m})?(a.integrations=await b(),a.integrationEditingId=null,O("保存しました"),_()):O("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(o=>{o.addEventListener("click",async()=>{const i=a.integrations.find(b=>b.provider==="shopify");if(!i){O("Shopify連携が未設定です","warning");return}o.textContent="同期中…",o.disabled=!0;const{syncShopifyOrders:c,fetchShopifyOrders:m}=await q(async()=>{const{syncShopifyOrders:b,fetchShopifyOrders:x}=await Promise.resolve().then(()=>N);return{syncShopifyOrders:b,fetchShopifyOrders:x}},void 0),h=await c(i);h.error?O("同期失敗: "+h.error,"error"):(O(`${h.count}件を同期しました`),a.shopifyOrders=await m()),_()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(o=>{o.addEventListener("click",async()=>{const i=a.integrations.find(b=>b.provider==="google_calendar");if(!i)return;o.textContent="同期中…",o.disabled=!0;const{syncGoogleCalendar:c,fetchCalendarEvents:m}=await q(async()=>{const{syncGoogleCalendar:b,fetchCalendarEvents:x}=await Promise.resolve().then(()=>N);return{syncGoogleCalendar:b,fetchCalendarEvents:x}},void 0),h=await c(i);h.error?O("同期失敗: "+h.error,"error"):(O(`${h.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),_()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const i=e.querySelector("#fax-file")?.files?.[0];if(!i){O("FAX画像を選択してください","warning");return}const c=a.integrations.find(m=>m.provider==="cloud_vision");if(!c||!c.config.api_key){O("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,_();try{const m=new FileReader;m.onload=async()=>{const h=String(m.result??""),{ocrFaxImage:b,saveFaxRecord:x,fetchFaxInbox:$}=await q(async()=>{const{ocrFaxImage:C,saveFaxRecord:L,fetchFaxInbox:I}=await Promise.resolve().then(()=>N);return{ocrFaxImage:C,saveFaxRecord:L,fetchFaxInbox:I}},void 0),E=await b(c,h),k=e.querySelector("#fax-sender-name")?.value??"",S=e.querySelector("#fax-sender-phone")?.value??"";await x({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:k,senderPhone:S,ocrStatus:E.error?"failed":"done",ocrText:E.text}),a.faxOcrText=E.error?`エラー: ${E.error}`:E.text,a.faxRecords=await $(),a.faxProcessing=!1,_()},m.readAsDataURL(i)}catch(m){O("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,_()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",_()}),e.querySelectorAll("[data-action='ms-edit']").forEach(o=>{o.addEventListener("click",()=>{a.mailSenderEditingId=o.dataset.id??null,_()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,_()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,i={id:o,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(b=>b.id===o)?.isVerified??!1};if(!i.name||!i.email){O("名前とメールアドレスは必須です","warning");return}const{saveMailSender:c,fetchMailSenders:m}=await q(async()=>{const{saveMailSender:b,fetchMailSenders:x}=await Promise.resolve().then(()=>N);return{saveMailSender:b,fetchMailSenders:x}},void 0);await c(i)?(a.mailSenders=await m(),a.mailSenderEditingId=null,O("保存しました"),_()):O("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=o.dataset.id??"",{deleteMailSender:c,fetchMailSenders:m}=await q(async()=>{const{deleteMailSender:b,fetchMailSenders:x}=await Promise.resolve().then(()=>N);return{deleteMailSender:b,fetchMailSenders:x}},void 0);await c(i)?(a.mailSenders=await m(),_()):O("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(o=>{o.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){O("データなし","error");return}const o=a.demandAnalysis,i=Object.entries(o.matrix).map(([m,h])=>{const b={productCode:m};return o.months.forEach(x=>{b[x]=h[x]??0}),b}),c=[{key:"productCode",label:"商品コード"},...o.months.map(m=>({key:m,label:m}))];Da("demand-analysis.csv",i,c)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){O("データなし","error");return}const o=a.productionPlan.map(c=>({...c}));Da("production-plan.csv",o,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await Pe("当月の全請求を締め切りますか？")&&O("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async o=>{const i=parseInt(o.target.value);a.brewingPlanFY=i;const{fetchBrewingPlanSummary:c,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:h,fetchBrewingProductDetail:b,fetchBrewingCustomCategories:x,fetchBrewingCategoryOverrides:$,fetchAllBrewingStockEntries:E}=await q(async()=>{const{fetchBrewingPlanSummary:M,fetchBrewingMonthlyTrend:z,fetchBrewingSchedule:F,fetchBrewingProductDetail:B,fetchBrewingCustomCategories:U,fetchBrewingCategoryOverrides:J,fetchAllBrewingStockEntries:H}=await Promise.resolve().then(()=>N);return{fetchBrewingPlanSummary:M,fetchBrewingMonthlyTrend:z,fetchBrewingSchedule:F,fetchBrewingProductDetail:B,fetchBrewingCustomCategories:U,fetchBrewingCategoryOverrides:J,fetchAllBrewingStockEntries:H}},void 0),[k,S,C,L,I,T,j]=await Promise.all([c(`${i}-10-01`,`${i+1}-09-30`),m(`${i}-10-01`,`${i+1}-09-30`),h(i),b(`${i}-10-01`,`${i+1}-09-30`),x(),$(),E()]);a.brewingPlanData=k,a.brewingMonthlyTrend=S,a.brewingSchedule=C,a.brewingProductDetail=L,a.brewingStockEntries=j,a.brewingCustomCategories=I,a.brewingOverrides=T,a.brewingExcludedProducts=new Set,_()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.code??"",c=o.dataset.parent??"";if(!i||!c)return;if(o.checked){a.brewingExcludedProducts.delete(i),_();return}a.brewingExcludedProducts.add(i);const m=a.brewingCustomCategories.filter(h=>h.parentCategory===c);if(m.length===1){const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:x,fetchBrewingCategoryOverrides:$}=await q(async()=>{const{setBrewingCategoryOverride:T,fetchBrewingPlanSummary:j,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:z}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:T,fetchBrewingPlanSummary:j,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:z}},void 0);await h(i,m[0].name);const E=a.brewingPlanFY,{fetchBrewingYearlyShipments:k}=await q(async()=>{const{fetchBrewingYearlyShipments:T}=await Promise.resolve().then(()=>N);return{fetchBrewingYearlyShipments:T}},void 0),[S,C,L,I]=await Promise.all([b(`${E}-10-01`,`${E+1}-09-30`),x(`${E}-10-01`,`${E+1}-09-30`),$(),k()]);a.brewingPlanData=S,a.brewingProductDetail=C,a.brewingOverrides=L,a.brewingYearlyShipments=I,a.brewingExcludedProducts.delete(i)}_()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.code??"",c=o.dataset.cat??"";if(!i||!c)return;const{setBrewingCategoryOverride:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:x,fetchBrewingYearlyShipments:$}=await q(async()=>{const{setBrewingCategoryOverride:I,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:M,fetchBrewingYearlyShipments:z}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:I,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:M,fetchBrewingYearlyShipments:z}},void 0);await m(i,c);const E=a.brewingPlanFY,[k,S,C,L]=await Promise.all([h(`${E}-10-01`,`${E+1}-09-30`),b(`${E}-10-01`,`${E+1}-09-30`),x(),$()]);a.brewingPlanData=k,a.brewingProductDetail=S,a.brewingOverrides=C,a.brewingYearlyShipments=L,_()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.code??"";if(!i)return;const{setBrewingCategoryOverride:c,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h,fetchBrewingCategoryOverrides:b,fetchBrewingYearlyShipments:x}=await q(async()=>{const{setBrewingCategoryOverride:L,fetchBrewingPlanSummary:I,fetchBrewingProductDetail:T,fetchBrewingCategoryOverrides:j,fetchBrewingYearlyShipments:M}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:L,fetchBrewingPlanSummary:I,fetchBrewingProductDetail:T,fetchBrewingCategoryOverrides:j,fetchBrewingYearlyShipments:M}},void 0);await c(i,null);const $=a.brewingPlanFY,[E,k,S,C]=await Promise.all([m(`${$}-10-01`,`${$+1}-09-30`),h(`${$}-10-01`,`${$+1}-09-30`),b(),x()]);a.brewingPlanData=E,a.brewingProductDetail=k,a.brewingOverrides=S,a.brewingYearlyShipments=C,_()})}),(()=>{const o=e.querySelector("#gantt-timeline");if(!o)return;const i=[9,10,11,12,1,2,3,4,5],c=i.length;let m=null,h=null;o.querySelectorAll(".gantt-bar").forEach(S=>{S.style.pointerEvents="auto"});function b(S){return"touches"in S?S.touches[0].clientX:S.clientX}function x(S){const C=S.target,L=C.closest(".gantt-bar");if(!L)return;const I=L.parentElement,T=L.dataset.cat??"",j=parseInt(L.dataset.month??"0"),M=parseInt(L.dataset.dur??"1"),z=parseInt(L.dataset.vol??"0"),F=I.offsetWidth/c;let B="move";C.classList.contains("gantt-resize-right")?B="resize-right":C.classList.contains("gantt-resize-left")&&(B="resize-left"),L.style.cursor=B==="move"?"grabbing":"ew-resize",L.style.opacity="0.8",L.style.zIndex="10",m={bar:L,mode:B,cat:T,origMonth:j,origDur:M,origVol:z,startX:b(S),cellW:F,origLeftPct:parseFloat(L.style.left),origWidthPct:parseFloat(L.style.width)},S.preventDefault()}function $(S){if(!m)return;const{bar:C,mode:L,origDur:I,startX:T,cellW:j,origLeftPct:M,origWidthPct:z}=m,F=b(S)-T,B=Math.round(F/j),U=Math.round(M/100*c);if(L==="move"){const J=Math.max(0,Math.min(c-I,U+B));C.style.left=(J/c*100).toFixed(2)+"%"}else if(L==="resize-right"){const J=Math.max(1,Math.min(c-U,I+B));C.style.width=(J/c*100).toFixed(2)+"%"}else if(L==="resize-left"){const J=Math.max(0,Math.min(U+I-1,U+B)),H=I-(J-U);C.style.left=(J/c*100).toFixed(2)+"%",C.style.width=(H/c*100).toFixed(2)+"%"}}async function E(S){if(!m)return;const{bar:C,cat:L,origMonth:I,origDur:T,origVol:j}=m,M=Math.round(parseFloat(C.style.left)/100*c),z=Math.max(1,Math.round(parseFloat(C.style.width)/100*c)),F=i[Math.max(0,Math.min(c-1,M))];if(C.style.cursor="grab",C.style.opacity="1",C.style.zIndex="",m=null,F===I&&z===T)return;const{saveBrewingSchedule:B,fetchBrewingSchedule:U}=await q(async()=>{const{saveBrewingSchedule:H,fetchBrewingSchedule:K}=await Promise.resolve().then(()=>N);return{saveBrewingSchedule:H,fetchBrewingSchedule:K}},void 0),J=a.brewingSchedule.filter(H=>H.brewCategory===L).map(H=>H.brewMonth===I?{brewMonth:F,durationMonths:z,plannedVolumeL:j}:{brewMonth:H.brewMonth,durationMonths:H.durationMonths,plannedVolumeL:H.plannedVolumeL});await B(L,a.brewingPlanFY,J),a.brewingSchedule=await U(a.brewingPlanFY),_()}o.addEventListener("mousedown",x),o.addEventListener("touchstart",x,{passive:!1}),document.addEventListener("mousemove",$),document.addEventListener("touchmove",$,{passive:!1}),document.addEventListener("mouseup",E),document.addEventListener("touchend",E);function k(S){const C=S.dataset.cat??"",L=parseInt(S.dataset.month??"0"),I=parseInt(S.dataset.vol??"0"),T=parseInt(S.dataset.max??"99999"),j=S.querySelector(".gantt-bar-label");if(!j||j.querySelector("input"))return;const M=document.createElement("input");M.type="number",M.min="0",M.max=String(T),M.step="100",M.value=String(I),M.style.cssText="width:60px;height:24px;font-size:12px;text-align:center;border:1px solid #2563eb;border-radius:3px;pointer-events:auto;",j.textContent="",j.style.pointerEvents="auto",j.appendChild(M),M.focus(),M.select();const z=async()=>{const F=parseFloat(M.value)||0;if(j.style.pointerEvents="none",j.textContent=R(Math.round(F))+"L",Math.abs(F-I)<1)return;const{saveBrewingSchedule:B,fetchBrewingSchedule:U}=await q(async()=>{const{saveBrewingSchedule:H,fetchBrewingSchedule:K}=await Promise.resolve().then(()=>N);return{saveBrewingSchedule:H,fetchBrewingSchedule:K}},void 0),J=a.brewingSchedule.filter(H=>H.brewCategory===C).map(H=>({brewMonth:H.brewMonth,durationMonths:H.durationMonths,plannedVolumeL:H.brewMonth===L?F:H.plannedVolumeL}));await B(C,a.brewingPlanFY,J),a.brewingSchedule=await U(a.brewingPlanFY),_()};M.addEventListener("blur",z),M.addEventListener("keydown",F=>{F.key==="Enter"&&M.blur()})}o.addEventListener("dblclick",S=>{const C=S.target.closest(".gantt-bar");C&&k(C)}),o.addEventListener("touchstart",S=>{const C=S.target.closest(".gantt-bar");if(C){if(h){clearTimeout(h),h=null,k(C);return}h=setTimeout(()=>{h=null},300)}},{passive:!0}),o.querySelectorAll(".gantt-bar-container").forEach(S=>{S.style.pointerEvents="auto";const C=async L=>{if(m)return;const I=S.dataset.cat??"",T=parseInt(S.dataset.max??"0"),j=S.getBoundingClientRect(),M=L-j.left,z=Math.floor(M/(j.width/c)),F=i[Math.max(0,Math.min(c-1,z))];if(a.brewingSchedule.some(K=>K.brewCategory===I&&K.brewMonth===F))return;const B=Math.round(T*.3)||500,{saveBrewingSchedule:U,fetchBrewingSchedule:J}=await q(async()=>{const{saveBrewingSchedule:K,fetchBrewingSchedule:G}=await Promise.resolve().then(()=>N);return{saveBrewingSchedule:K,fetchBrewingSchedule:G}},void 0),H=[...a.brewingSchedule.filter(K=>K.brewCategory===I).map(K=>({brewMonth:K.brewMonth,durationMonths:K.durationMonths,plannedVolumeL:K.plannedVolumeL})),{brewMonth:F,durationMonths:2,plannedVolumeL:B}];await U(I,a.brewingPlanFY,H),a.brewingSchedule=await J(a.brewingPlanFY),_()};S.addEventListener("click",L=>{L.target.closest(".gantt-bar")||C(L.clientX)})})})();function R(o){return o.toLocaleString("ja-JP")}e.querySelector("[data-action='bp-show-new-form']")?.addEventListener("click",()=>{a.bpShowNewForm=!a.bpShowNewForm,_()}),e.querySelector("[data-action='bp-create-batch']")?.addEventListener("click",async()=>{const o=e.querySelector("#bp-new-cat")?.value??"",i=e.querySelector("#bp-new-code")?.value?.trim()??"",c=parseFloat(e.querySelector("#bp-new-vol")?.value??"0"),m=e.querySelector("#bp-new-date")?.value??"";if(!o||!i||!m)return;const{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:x}=await q(async()=>{const{createBrewingBatch:$,fetchBrewingBatches:E,fetchBrewingProcessSteps:k}=await Promise.resolve().then(()=>N);return{createBrewingBatch:$,fetchBrewingBatches:E,fetchBrewingProcessSteps:k}},void 0);await h(o,i,a.brewingPlanFY,c,m),a.brewingBatches=await b(a.brewingPlanFY),a.brewingProcessSteps=await x(a.brewingBatches.map($=>$.id)),a.bpShowNewForm=!1,_()}),e.querySelectorAll("[data-action='bp-toggle-detail']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.batchId??"";a.bpExpandedBatchId=a.bpExpandedBatchId===i?"":i,_()})}),e.querySelectorAll("[data-action='bp-step-status']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:c}=await q(async()=>{const{updateBrewingProcessStep:b}=await Promise.resolve().then(()=>N);return{updateBrewingProcessStep:b}},void 0),m={status:o.value};o.value==="進行中"&&!o.dataset.actualStart&&(m.actual_start=new Date().toISOString().split("T")[0]),o.value==="完了"&&!o.dataset.actualEnd&&(m.actual_end=new Date().toISOString().split("T")[0]),await c(i,m);const{fetchBrewingProcessSteps:h}=await q(async()=>{const{fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>N);return{fetchBrewingProcessSteps:b}},void 0);a.brewingProcessSteps=await h(a.brewingBatches.map(b=>b.id)),_()})}),e.querySelectorAll("[data-action='bp-step-temp']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:c}=await q(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>N);return{updateBrewingProcessStep:m}},void 0);await c(i,{temperature:parseFloat(o.value)||null})})}),e.querySelectorAll("[data-action='bp-step-notes']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:c}=await q(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>N);return{updateBrewingProcessStep:m}},void 0);await c(i,{notes:o.value})})}),e.querySelectorAll("[data-action='proc-add-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c=e.querySelector(`[data-action='proc-add-month-select'][data-cat='${i}']`),m=e.querySelector(`[data-action='proc-add-month-vol'][data-cat='${i}']`),h=parseInt(c?.value??"0"),b=parseFloat(m?.value??"0");if(!i||!h||b<=0)return;const $=[...a.brewingSchedule.filter(S=>S.brewCategory===i).map(S=>({brewMonth:S.brewMonth,durationMonths:S.durationMonths,plannedVolumeL:S.plannedVolumeL})),{brewMonth:h,durationMonths:2,plannedVolumeL:b}],{saveBrewingSchedule:E,fetchBrewingSchedule:k}=await q(async()=>{const{saveBrewingSchedule:S,fetchBrewingSchedule:C}=await Promise.resolve().then(()=>N);return{saveBrewingSchedule:S,fetchBrewingSchedule:C}},void 0);await E(i,a.brewingPlanFY,$),a.brewingSchedule=await k(a.brewingPlanFY),_()})}),e.querySelectorAll("[data-action='proc-remove-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c=parseInt(o.dataset.month??"0");if(!i||!c)return;const m=a.brewingSchedule.filter(x=>x.brewCategory===i&&x.brewMonth!==c).map(x=>({brewMonth:x.brewMonth,durationMonths:x.durationMonths,plannedVolumeL:x.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await q(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>N);return{saveBrewingSchedule:x,fetchBrewingSchedule:$}},void 0);await h(i,a.brewingPlanFY,m),a.brewingSchedule=await b(a.brewingPlanFY),_()})}),e.querySelectorAll("[data-action='proc-sched-remove']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c=parseInt(o.dataset.month??"0");if(!i||!c)return;const m=a.brewingSchedule.filter(x=>x.brewCategory===i&&x.brewMonth!==c).map(x=>({brewMonth:x.brewMonth,durationMonths:x.durationMonths,plannedVolumeL:x.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await q(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>N);return{saveBrewingSchedule:x,fetchBrewingSchedule:$}},void 0);await h(i,a.brewingPlanFY,m),a.brewingSchedule=await b(a.brewingPlanFY),_()})}),e.querySelectorAll("[data-action='proc-sched-edit-vol']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.cat??"",c=parseInt(o.dataset.month??"0"),m=parseFloat(o.value)||0;if(!i||!c)return;const h=a.brewingSchedule.filter($=>$.brewCategory===i).map($=>({brewMonth:$.brewMonth,durationMonths:$.durationMonths,plannedVolumeL:$.brewMonth===c?m:$.plannedVolumeL})),{saveBrewingSchedule:b,fetchBrewingSchedule:x}=await q(async()=>{const{saveBrewingSchedule:$,fetchBrewingSchedule:E}=await Promise.resolve().then(()=>N);return{saveBrewingSchedule:$,fetchBrewingSchedule:E}},void 0);await b(i,a.brewingPlanFY,h),a.brewingSchedule=await x(a.brewingPlanFY),_()})}),e.querySelectorAll("[data-action='proc-edit-vol']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.cat??"",c=parseFloat(o.value)||0;if(!i)return;const{saveProcurementDecision:m}=await q(async()=>{const{saveProcurementDecision:h}=await Promise.resolve().then(()=>N);return{saveProcurementDecision:h}},void 0);await m(i,a.brewingPlanFY,c),a.procurementDecisions[i]=c,_()})}),e.querySelector("[data-action='proc-add-commitment']")?.addEventListener("click",async()=>{const o=(e.querySelector("#proc-commit-variety")?.value??"").trim(),i=parseFloat(e.querySelector("#proc-commit-bales")?.value??"0"),c=parseFloat(e.querySelector("#proc-commit-price")?.value??"0"),m=parseInt(e.querySelector("#proc-commit-month")?.value??"0")||null,h=(e.querySelector("#proc-commit-supplier")?.value??"").trim();if(!o||i<=0)return;const{saveRicePurchaseCommitment:b,fetchRicePurchaseCommitments:x}=await q(async()=>{const{saveRicePurchaseCommitment:$,fetchRicePurchaseCommitments:E}=await Promise.resolve().then(()=>N);return{saveRicePurchaseCommitment:$,fetchRicePurchaseCommitments:E}},void 0);await b({varietyName:o,committedBales:i,pricePerKg:c,deliveryMonth:m,supplier:h,fy:a.brewingPlanFY}),a.ricePurchaseCommitments=await x(a.brewingPlanFY),_()}),e.querySelector("[data-action='proc-add-variety']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-variety-name"),i=e.querySelector("#proc-variety-price"),c=o?.value.trim()??"",m=parseFloat(i?.value??"400")||400;if(!c)return;const{addRiceVariety:h,fetchRiceVarieties:b}=await q(async()=>{const{addRiceVariety:$,fetchRiceVarieties:E}=await Promise.resolve().then(()=>N);return{addRiceVariety:$,fetchRiceVarieties:E}},void 0);await h(c,m)&&(a.riceVarieties=await b(),o&&(o.value=""),i&&(i.value=""),O(`「${c}」を追加しました`)),_()}),e.querySelectorAll("[data-action='proc-delete-variety']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",{deleteRiceVariety:c,fetchRiceVarieties:m}=await q(async()=>{const{deleteRiceVariety:b,fetchRiceVarieties:x}=await Promise.resolve().then(()=>N);return{deleteRiceVariety:b,fetchRiceVarieties:x}},void 0);await c(i)&&(a.riceVarieties=await m()),_()})}),e.querySelectorAll("[data-action='brew-rice-variety-select']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.cat??"",c=o.dataset.field??"",m=o.value;if(!i||!c)return;const h=a.brewingRiceParams[i]??{brewCategory:i,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[c]=m;const b=a.riceVarieties.find($=>$.name===m);b&&(c==="kojiVariety"&&(h.kojiPricePerKg=b.defaultPricePerKg),c==="kakeVariety"&&(h.kakePricePerKg=b.defaultPricePerKg)),a.brewingRiceParams[i]=h;const{saveBrewingRiceParams:x}=await q(async()=>{const{saveBrewingRiceParams:$}=await Promise.resolve().then(()=>N);return{saveBrewingRiceParams:$}},void 0);await x(i,h),_()})}),e.querySelector("[data-action='proc-add-new-cat']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-new-cat-name"),i=e.querySelector("#proc-new-cat-vol"),c=o?.value.trim()??"",m=parseFloat(i?.value??"0");if(!c){O("区分名を入力してください","warning");return}if(m<=0){O("醸造予定量を入力してください","warning");return}const{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await q(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>N);return{saveBrewingSchedule:x,fetchBrewingSchedule:$}},void 0);await h(c,a.brewingPlanFY,[{brewMonth:10,durationMonths:2,plannedVolumeL:m}]),a.brewingSchedule=await b(a.brewingPlanFY),o&&(o.value=""),i&&(i.value=""),O(`「${c}」を追加しました`),_()}),e.querySelector("[data-action='brew-rice-bulk-apply']")?.addEventListener("click",async()=>{const o=parseFloat(e.querySelector("#rice-bulk-per-l")?.value??"0.50"),i=parseFloat(e.querySelector("#rice-bulk-koji")?.value??"0.30");if(isNaN(o)||isNaN(i))return;const{saveBrewingRiceParams:c}=await q(async()=>{const{saveBrewingRiceParams:b}=await Promise.resolve().then(()=>N);return{saveBrewingRiceParams:b}},void 0),m=Object.keys(a.brewingRiceParams),h=new Set([...m,...a.brewingYearlyShipments.map(b=>b.brewCategory)]);for(const b of h){const x=a.brewingRiceParams[b]??{brewCategory:b,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};x.ricePerLiterKg=o,x.kojiRatio=i,a.brewingRiceParams[b]=x,await c(b,x)}_()}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.cat??"",c=o.dataset.field??"",m=parseFloat(o.value);if(!i||!c||isNaN(m))return;const h=a.brewingRiceParams[i]??{brewCategory:i,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[c]=m,a.brewingRiceParams[i]=h;const{saveBrewingRiceParams:b}=await q(async()=>{const{saveBrewingRiceParams:x}=await Promise.resolve().then(()=>N);return{saveBrewingRiceParams:x}},void 0);await b(i,h),_()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.cat??"",c=parseFloat(o.value);if(!i)return;const{saveBrewingForecastOverride:m}=await q(async()=>{const{saveBrewingForecastOverride:h}=await Promise.resolve().then(()=>N);return{saveBrewingForecastOverride:h}},void 0);if(isNaN(c))await m(i,null),delete a.brewingForecastOverrides[i];else{const h=c/100;await m(i,h),a.brewingForecastOverrides[i]=h}_()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c="bc-"+encodeURIComponent(i).replace(/%/g,"-"),m=e.querySelector(`#alc-raw-${c}`),h=e.querySelector(`#alc-target-${c}`),b=parseFloat(m?.value??"18")||18,x=parseFloat(h?.value??"15")||15,{saveBrewingAlcoholSetting:$}=await q(async()=>{const{saveBrewingAlcoholSetting:k}=await Promise.resolve().then(()=>N);return{saveBrewingAlcoholSetting:k}},void 0);await $(i,b,x)&&(a.brewingAlcoholSettings[i]={brewCategory:i,rawAlcoholPct:b,targetAlcoholPct:x}),_()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.code??"",c=o.value,m=o.dataset.current??"";if(c===m)return;const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:x,fetchBrewingCategoryOverrides:$}=await q(async()=>{const{setBrewingCategoryOverride:k,fetchBrewingPlanSummary:S,fetchBrewingProductDetail:C,fetchBrewingCategoryOverrides:L}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:k,fetchBrewingPlanSummary:S,fetchBrewingProductDetail:C,fetchBrewingCategoryOverrides:L}},void 0);if(await h(i,c)){const k=a.brewingPlanFY,[S,C,L]=await Promise.all([b(`${k}-10-01`,`${k+1}-09-30`),x(`${k}-10-01`,`${k+1}-09-30`),$()]);a.brewingPlanData=S,a.brewingProductDetail=C,a.brewingOverrides=L}_()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.cat??"",c=o.value;if(!i||!c)return;const{linkTypeToCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:x,fetchCategoryTypeLinks:$}=await q(async()=>{const{linkTypeToCategory:I,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:M,fetchCategoryTypeLinks:z}=await Promise.resolve().then(()=>N);return{linkTypeToCategory:I,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:M,fetchCategoryTypeLinks:z}},void 0);await m(i,c);const E=a.brewingPlanFY,[k,S,C,L]=await Promise.all([h(`${E}-10-01`,`${E+1}-09-30`),b(`${E}-10-01`,`${E+1}-09-30`),x(),$()]);a.brewingPlanData=k,a.brewingProductDetail=S,a.brewingOverrides=C,a.brewingTypeLinks=L,_()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c=o.dataset.type??"";if(!i||!c)return;const{unlinkTypeFromCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:x,fetchCategoryTypeLinks:$}=await q(async()=>{const{unlinkTypeFromCategory:I,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:M,fetchCategoryTypeLinks:z}=await Promise.resolve().then(()=>N);return{unlinkTypeFromCategory:I,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:M,fetchCategoryTypeLinks:z}},void 0);await m(i,c);const E=a.brewingPlanFY,[k,S,C,L]=await Promise.all([h(`${E}-10-01`,`${E+1}-09-30`),b(`${E}-10-01`,`${E+1}-09-30`),x(),$()]);a.brewingPlanData=k,a.brewingProductDetail=S,a.brewingOverrides=C,a.brewingTypeLinks=L,_()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const o=e.querySelector("#brew-new-category-name"),i=e.querySelector("#brew-new-category-parent"),c=o?.value.trim()??"",m=i?.value??"";if(!c)return;if(!m){O("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map($=>$.name)].includes(c)){O("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:b}=await q(async()=>{const{addBrewingCustomCategory:$}=await Promise.resolve().then(()=>N);return{addBrewingCustomCategory:$}},void 0);await b(c,m)?(a.brewingCustomCategories.push({name:c,parentCategory:m}),o&&(o.value=""),O(`「${c}」を追加しました（${m}系）`)):O("追加に失敗しました","error"),_()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"";if(!i)return;const{deleteBrewingCustomCategory:c,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h}=await q(async()=>{const{deleteBrewingCustomCategory:x,fetchBrewingPlanSummary:$,fetchBrewingProductDetail:E}=await Promise.resolve().then(()=>N);return{deleteBrewingCustomCategory:x,fetchBrewingPlanSummary:$,fetchBrewingProductDetail:E}},void 0);if(await c(i)){a.brewingCustomCategories=a.brewingCustomCategories.filter(k=>k.name!==i);for(const[k,S]of Object.entries(a.brewingOverrides))S===i&&delete a.brewingOverrides[k];const x=a.brewingPlanFY,[$,E]=await Promise.all([m(`${x}-10-01`,`${x+1}-09-30`),h(`${x}-10-01`,`${x+1}-09-30`)]);a.brewingPlanData=$,a.brewingProductDetail=E,O(`「${i}」を削除しました`)}_()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c=o.dataset.catId??"",h=e.querySelector(`#new-entry-target-${c}`)?.value??i,b=e.querySelector(`#new-entry-label-${c}`),x=e.querySelector(`#new-entry-vol-${c}`),$=b?.value.trim()??"",E=parseFloat(x?.value??"0");if(E<=0)return;const{addBrewingStockEntry:k,fetchBrewingPlanSummary:S,fetchAllBrewingStockEntries:C}=await q(async()=>{const{addBrewingStockEntry:I,fetchBrewingPlanSummary:T,fetchAllBrewingStockEntries:j}=await Promise.resolve().then(()=>N);return{addBrewingStockEntry:I,fetchBrewingPlanSummary:T,fetchAllBrewingStockEntries:j}},void 0);if(await k(h,$||`タンク${a.brewingStockEntries.filter(I=>I.brewCategory===h).length+1}`,E)){const I=a.brewingPlanFY,[T,j]=await Promise.all([S(`${I}-10-01`,`${I+1}-09-30`),C()]);a.brewingPlanData=T,a.brewingStockEntries=j}_(),requestAnimationFrame(()=>{const I=document.getElementById(`stock-display-${c}`),T=document.getElementById(`stock-edit-${c}`),j=document.querySelector(`.btn-edit-stock[data-cat-id="${c}"]`);I&&(I.style.display="none"),T&&(T.style.display=""),j&&(j.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.id??"",c=o.value;if(!i||!c)return;const{reassignBrewingStockEntry:m,fetchBrewingPlanSummary:h,fetchAllBrewingStockEntries:b}=await q(async()=>{const{reassignBrewingStockEntry:$,fetchBrewingPlanSummary:E,fetchAllBrewingStockEntries:k}=await Promise.resolve().then(()=>N);return{reassignBrewingStockEntry:$,fetchBrewingPlanSummary:E,fetchAllBrewingStockEntries:k}},void 0);if(await m(i,c)){const $=a.brewingPlanFY,[E,k]=await Promise.all([h(`${$}-10-01`,`${$+1}-09-30`),b()]);a.brewingPlanData=E,a.brewingStockEntries=k}_(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach($=>{const E=document.getElementById(`stock-display-${$.dataset.catId}`),k=document.getElementById(`stock-edit-${$.dataset.catId}`);k&&k.querySelector(`[data-id="${i}"]`)&&(E&&(E.style.display="none"),k.style.display="",$.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",c=o.dataset.cat??"",m="bc-"+encodeURIComponent(c).replace(/%/g,"-"),{deleteBrewingStockEntry:h,fetchBrewingPlanSummary:b,fetchAllBrewingStockEntries:x}=await q(async()=>{const{deleteBrewingStockEntry:E,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:S}=await Promise.resolve().then(()=>N);return{deleteBrewingStockEntry:E,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:S}},void 0);if(await h(i)){const E=a.brewingPlanFY,[k,S]=await Promise.all([b(`${E}-10-01`,`${E+1}-09-30`),x()]);a.brewingPlanData=k,a.brewingStockEntries=S}_(),requestAnimationFrame(()=>{const E=document.getElementById(`stock-display-${m}`),k=document.getElementById(`stock-edit-${m}`),S=document.querySelector(`.btn-edit-stock[data-cat-id="${m}"]`);E&&(E.style.display="none"),k&&(k.style.display=""),S&&(S.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.catId??"",c=e.querySelector(`#stock-display-${i}`),m=e.querySelector(`#stock-edit-${i}`);c&&(c.style.display="none"),m&&(m.style.display=""),o.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.catId??"",c=e.querySelector(`#stock-display-${i}`),m=e.querySelector(`#stock-edit-${i}`),h=e.querySelector(`.btn-edit-stock[data-cat-id="${i}"]`);c&&(c.style.display=""),m&&(m.style.display="none"),h&&(h.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.catId??"",c=e.querySelector(`#schedule-rows-${i}`);if(!c)return;const m=c.querySelectorAll(".schedule-edit-row").length,h=document.createElement("div");h.innerHTML=buildScheduleEditRowHTML(i,m,9,2,0,"");const b=h.firstElementChild;c.appendChild(b),b.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>b.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(o=>{o.addEventListener("click",()=>o.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c=o.dataset.catId??"",m=e.querySelector(`#stock-input-${c}`),h=parseFloat(m?.value??"");if(isNaN(h)||h<0){alert("有効な数値を入力してください");return}o.textContent="保存中...",o.setAttribute("disabled","true");try{const{upsertBrewingStock:b,fetchBrewingPlanSummary:x,fetchBrewingMonthlyTrend:$}=await q(async()=>{const{upsertBrewingStock:C,fetchBrewingPlanSummary:L,fetchBrewingMonthlyTrend:I}=await Promise.resolve().then(()=>N);return{upsertBrewingStock:C,fetchBrewingPlanSummary:L,fetchBrewingMonthlyTrend:I}},void 0),E=a.brewingPlanFY;await b(i,h,0);const[k,S]=await Promise.all([x(`${E}-10-01`,`${E+1}-09-30`),$(`${E}-10-01`,`${E+1}-09-30`)]);a.brewingPlanData=k,a.brewingMonthlyTrend=S,_()}catch(b){console.error("[brewing save]",b),alert(`保存エラー: ${String(b)}`),o.textContent="保存",o.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.toggleCat??"",c=`sub-row-${"bc-"+encodeURIComponent(i).replace(/%/g,"-")}`,m=e.querySelectorAll(`.${c}`),h=o.querySelector(".toggle-icon"),b=m[0]?.style.display!=="none";m.forEach(x=>{x.style.display=b?"none":""}),h&&(h.innerHTML=b?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{O("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{O("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(o=>{o.addEventListener("click",()=>{O("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{O("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(o=>{o.addEventListener("click",async()=>{await Pe("この買掛を入金済みにしますか？")&&O("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(o=>{o.addEventListener("click",()=>{O("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{O("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(o=>{o.addEventListener("click",()=>{const i=o.closest("tr")?.querySelector("td")?.textContent??"";O(`タンク ${i} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{O("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(o=>{o.addEventListener("click",()=>{const i=o.closest("tr")?.querySelector("td")?.textContent??"";O(`注文 ${i} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{O("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(o=>{o.addEventListener("click",()=>{O("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{O("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.customer??"";O(`得意先 ${i} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{O("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!o||!await Pe("このリストを削除しますか？"))return;const{supabaseDelete:c}=await q(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>Z);return{supabaseDelete:h}},void 0);if(await c("lead_lists",o)){const{fetchLeadLists:h}=await q(async()=>{const{fetchLeadLists:b}=await Promise.resolve().then(()=>N);return{fetchLeadLists:b}},void 0);a.leadLists=await h(),O("削除しました","success"),_()}else O("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{O("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.scYm;if(!i)return;a.shipmentCalendarYearMonth=i,a.shipmentCalendarData=null,a.shipmentCalendarSelectedDate=null,_();const{fetchShipmentCalendar:c}=await q(async()=>{const{fetchShipmentCalendar:m}=await Promise.resolve().then(()=>N);return{fetchShipmentCalendar:m}},void 0);a.shipmentCalendarData=await c(i),_()})}),e.querySelectorAll("[data-sc-date]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.scDate;i&&(a.shipmentCalendarSelectedDate=a.shipmentCalendarSelectedDate===i?null:i,_())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(o=>{o.addEventListener("click",async()=>{a.calendarYearMonth=o.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:i}=await q(async()=>{const{fetchCalendarEvents:c}=await Promise.resolve().then(()=>N);return{fetchCalendarEvents:c}},void 0);a.calendarEvents=await i(a.calendarYearMonth),_()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async o=>{a.calendarYearMonth=o.target.value;const{fetchCalendarEvents:i}=await q(async()=>{const{fetchCalendarEvents:c}=await Promise.resolve().then(()=>N);return{fetchCalendarEvents:c}},void 0);a.calendarEvents=await i(a.calendarYearMonth),_()}),e.querySelector("#cal-filter-category")?.addEventListener("change",o=>{a.calendarFilterCategory=o.target.value,_()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const o=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(o.getTime()+3600*1e3).toISOString(),isAllDay:!1}},_()}),e.querySelectorAll("[data-cal-date]").forEach(o=>{o.tagName!=="BUTTON"&&o.addEventListener("click",i=>{if(i.target.closest(".cal-event"))return;const c=o.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${c}T10:00:00`,isAllDay:!1}},_()})}),e.querySelectorAll("[data-cal-event-id]").forEach(o=>{o.addEventListener("click",i=>{i.stopPropagation();const c=o.dataset.calEventId,m=a.calendarEvents.find(h=>h.id===c);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},_())})}),e.querySelectorAll("[data-action='cal-close']").forEach(o=>{o.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.calendarEdit=null,_())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:o,fetchCalendarEvents:i,CALENDAR_CATEGORY_COLORS:c}=await q(async()=>{const{saveCalendarEvent:$,fetchCalendarEvents:E,CALENDAR_CATEGORY_COLORS:k}=await Promise.resolve().then(()=>N);return{saveCalendarEvent:$,fetchCalendarEvents:E,CALENDAR_CATEGORY_COLORS:k}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,h=e.querySelector("#cal-category")?.value??"general",b={id:m,title:e.querySelector("#cal-title")?.value??"",category:h,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:c[h]};if(!b.title){O("タイトルは必須です","warning");return}await o(b)?(a.calendarEvents=await i(a.calendarYearMonth),a.calendarEdit=null,O("保存しました"),_()):O("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!o||!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:i,fetchCalendarEvents:c}=await q(async()=>{const{deleteCalendarEvent:h,fetchCalendarEvents:b}=await Promise.resolve().then(()=>N);return{deleteCalendarEvent:h,fetchCalendarEvents:b}},void 0);await i(o)?(a.calendarEvents=await c(a.calendarYearMonth),a.calendarEdit=null,O("削除しました"),_()):O("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,_();try{const o=a.importPreview.rows.filter(c=>c._valid),i=await Hs(a.importEntity,o);a.importResult=`取り込み完了: ${i.inserted}件成功 / ${i.failed}件失敗`,a.importPreview=null}catch(o){a.importResult=`エラー: ${o instanceof Error?o.message:String(o)}`}finally{a.importing=!1,_()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const o=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=o,a.storeSales=[],a.actionLoading=!0,_(),Ya(o).then(i=>{a.storeSales=i,a.actionLoading=!1,_()})}),e.querySelectorAll("[data-action='copy-config']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.configValue??"";if(i)try{await navigator.clipboard.writeText(i),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(c){console.warn("Clipboard copy failed",c)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const i=JSON.stringify({supabase_url:xe,supabase_anon_key:re,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),c=new Blob([i],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download="relay_config.json",h.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.code??"";if(i)try{await navigator.clipboard.writeText(decodeURIComponent(i)),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(c){console.warn("Clipboard code copy failed",c)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(o=>{o.addEventListener("change",()=>{He(e),a.emailSaveMessage=null,_()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(o=>{o.addEventListener("change",()=>{He(e),a.emailSaveMessage=null,_()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{He(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{He(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(o=>{o.addEventListener("click",()=>{a.emailTemplateId=o.dataset.templateId??"custom";const i=Zs(a.emailTemplateId);a.emailSubject=i.subject,a.emailBody=i.body,a.emailSaveMessage=null,_()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{He(e);const o=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${o}`),a.emailSaveMessage=null,_()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{He(e),a.actionLoading=!0,_(),Ot(ha("draft")).then(o=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(o.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,_()})}),e.querySelector("#email-sender")?.addEventListener("change",o=>{a.emailSenderId=o.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{He(e),a.actionLoading=!0,a.emailSending=!0,_();const o=ha("sent");a.mailSenders.find(i=>i.id===a.emailSenderId),vs().then(async i=>{await Ot({...o,recipientCount:i.sent}),a.emailSaveMessage=`${i.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,_(),O(`${i.sent}件送信完了`)}).catch(async()=>{await Ot(ha("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,_(),O("APIキー未設定のため下書き保存しました","warning")})})}function _(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=Zp()}catch(n){console.error("[renderApp] render error:",n),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(n)}

${n?.stack??""}</div>`;return}nu(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),tn()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const n of["fd-scaler","print-scaler","q-preview-scaler"]){const s=e.querySelector(`#${n}`),r=s?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),l=r?.querySelector(".print-page")??r;if(!s||!l)continue;const d=s.parentElement?.clientWidth??0,p=l.offsetWidth;if(d>0&&p>0&&p>d-24){const u=(d-24)/p;s.style.transform=`scale(${u})`,s.style.transformOrigin="top left",s.style.height=`${(l.offsetHeight+48)*u}px`}else s.style.transform="",s.style.height=""}});const t=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=t?"hidden":"",document.body.style.touchAction=t?"none":""}const ro="sake-cloud-cache",su=300*1e3;function ou(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(ro,JSON.stringify(e))}catch{}}function ru(){try{const e=localStorage.getItem(ro);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>su?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let io=0;async function st(){const e=ru();e&&(a.loading=!1,_()),a.loading=!e,e||_();try{const[t,n,s,r,l,d,p,u,y]=await Promise.all([Hn(),Kn(),Ra(),Gn(),$t(a.invoiceFilter),Oa(a.ledgerCustomerCode),ja(),Wn(),Qn("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=s,a.pipelineMeta=r,a.invoiceRecords=l,a.customerLedger=d,a.salesAnalytics=p,a.syncDashboard=u,y){const v={...Bt,...$a(),...y};a.quoteCompanySettings=v,Ge(v)}if(ts().then(v=>{a.announcements=v,_()}),nt.length===0&&Np(),a.rawTableList.length===0&&ks().then(v=>{a.rawTableList=v,a.route==="/raw-browser"&&_()}),!a.salesFilter.startDate||!a.salesFilter.endDate){const g=[...t.salesRecords].sort((A,R)=>new Date(R.date).getTime()-new Date(A.date).getTime())[0]?.date??new Date().toISOString(),w=new Date(g),P=new Date(w);P.setDate(w.getDate()-30),a.salesFilter={startDate:Bn(P.toISOString()),endDate:Bn(w.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await $t(a.invoiceFilter)),a.error=null,ou()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,_(),an(a.route),io=Date.now()}}window.addEventListener("popstate",()=>{a.route=eo(location.pathname),a.currentCategory=en(a.route),a.sidebarOpen=!1,_t(),an(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,_();return}if(e.key==="Escape"){if(a.globalSearchOpen){_t(),_();return}if(a.pickerMode){Qt(),_();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(to(),_());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&no(t)}});a.user=Ht()?fo():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await q(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>N);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),_()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,s=0,r=0,l=0,d=1;document.addEventListener("mousedown",p=>{const u=p.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;p.preventDefault();const y=u.closest(".fd-canvas");if(!y)return;const v=y.getBoundingClientRect();if(v.width===0)return;d=228.6/v.width,t=u,n=p.clientX,s=p.clientY,r=parseFloat(u.style.left)||0,l=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(A=>A.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const g=document.querySelector("#fd-selected-info");g&&(g.textContent=`選択中: ${u.title}`);const w=document.querySelector("#fd-sel-x"),P=document.querySelector("#fd-sel-y");w&&(w.value=String(r)),P&&(P.value=String(l))}),document.addEventListener("mousemove",p=>{if(!t)return;const u=(p.clientX-n)*d,y=(p.clientY-s)*d,v=Math.round((r+u)*2)/2,g=Math.round((l+y)*2)/2;t.style.left=v+"mm",t.style.top=g+"mm";const w=document.querySelector("#fd-sel-x"),P=document.querySelector("#fd-sel-y");w&&(w.value=String(v)),P&&(P.value=String(g))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",p=>{if(!a.fdDesignMode||!a.fdActiveFieldId||p.key!=="ArrowLeft"&&p.key!=="ArrowRight"&&p.key!=="ArrowUp"&&p.key!=="ArrowDown"||p.target.tagName==="INPUT"||p.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;p.preventDefault();const y=.5;let v=parseFloat(u.style.left)||0,g=parseFloat(u.style.top)||0;p.key==="ArrowLeft"?v-=y:p.key==="ArrowRight"?v+=y:p.key==="ArrowUp"?g-=y:p.key==="ArrowDown"&&(g+=y),u.style.left=v+"mm",u.style.top=g+"mm";const w=document.querySelector("#fd-sel-x"),P=document.querySelector("#fd-sel-y");w&&(w.value=String(v)),P&&(P.value=String(g))})})();st();const iu=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&st()},iu);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-io>60*1e3&&st()});let qa="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{qa=e}).catch(()=>{});setInterval(async()=>{if(!(!qa||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==qa&&!a.updateAvailable&&(a.updateAvailable=!0,_())}catch{}},120*1e3);export{q as _};
