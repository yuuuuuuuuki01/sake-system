(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const oo="modulepreload",ro=function(e){return"/"+e},Xa={},I=function(t,n,s){let r=Promise.resolve();if(n&&n.length>0){let u=function(y){return Promise.all(y.map(v=>Promise.resolve(v).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),p=d?.nonce||d?.getAttribute("nonce");r=u(n.map(y=>{if(y=ro(y),y in Xa)return;Xa[y]=!0;const v=y.endsWith(".css"),g=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${g}`))return;const w=document.createElement("link");if(w.rel=v?"stylesheet":oo,v||(w.as="script"),w.crossOrigin="",w.href=y,p&&w.setAttribute("nonce",p),document.head.appendChild(w),v)return new Promise((P,E)=>{w.addEventListener("load",P),w.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${y}`)))})}))}function l(d){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=d,window.dispatchEvent(p),!p.defaultPrevented)throw d}return r.then(d=>{for(const p of d||[])p.status==="rejected"&&l(p.reason);return t().catch(l)})},ve="https://ridspyczkxwkcbmwndhm.supabase.co",io="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHNweWN6a3h3a2NibXduZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzkwODAsImV4cCI6MjA5MzUxNTA4MH0.ppWbfEsrUdUL8sRPO3BPHWA-r12ueMgJ3C44n1FvK3o",re=io;async function Te(e,t){try{const n=new URL(`/rest/v1/${e}`,ve),s=await fetch(n.toString(),{method:"POST",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function Pa(e,t){try{const n=new URL(`/rest/v1/${e}`,ve),s=await fetch(n.toString(),{method:"POST",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function Ea(e,t,n){try{const s=new URL(`/rest/v1/${e}?id=eq.${t}`,ve);return(await fetch(s.toString(),{method:"PATCH",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function ue(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,ve),s=await fetch(n.toString(),{method:"POST",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function Aa(e){try{const t=new URL(`/rest/v1/${e}`,ve);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:re,Authorization:`Bearer ${re}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const s=n.headers.get("Content-Range");if(s){const r=s.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function B(e,t={}){try{const n=new URL(`/rest/v1/${e}`,ve);Object.entries(t).forEach(([r,l])=>{n.searchParams.set(r,l)});const s=await fetch(n.toString(),{method:"GET",headers:{apikey:re,Authorization:`Bearer ${re}`,Accept:"application/json",Prefer:"return=representation"}});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function Nn(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,ve);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:re,Authorization:`Bearer ${re}`}})).ok}catch{return!1}}async function he(e,t={},n=1e3){const s=[];let r=0;try{for(;;){const l=new URL(`/rest/v1/${e}`,ve);Object.entries(t).forEach(([u,y])=>{l.searchParams.set(u,y)}),l.searchParams.set("limit",String(n)),l.searchParams.set("offset",String(r));const d=await fetch(l.toString(),{method:"GET",headers:{apikey:re,Authorization:`Bearer ${re}`,Accept:"application/json",Prefer:"return=representation"}});if(!d.ok)throw new Error(`HTTP ${d.status}`);const p=await d.json();if(s.push(...p),p.length<n)break;r+=n}return s}catch(l){return console.warn(`Failed to query all rows from Supabase table ${e}`,l),s.length>0?s:[]}}const H=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:re,SUPABASE_URL:ve,supabaseCount:Aa,supabaseDelete:Nn,supabaseInsert:Te,supabaseQuery:B,supabaseQueryAll:he,supabaseRpc:ue,supabaseUpdate:Ea,supabaseUpsert:Pa},Symbol.toStringTag,{value:"Module"})),Ca="sake_auth";function Mn(e){localStorage.setItem(Ca,JSON.stringify(e))}function Rn(){return{apikey:re,"Content-Type":"application/json"}}function lo(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),s=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(s))}catch{return null}}async function On(e,t){const n=await fetch(`${ve}/auth/v1/${e}`,{method:"POST",headers:Rn(),body:JSON.stringify(t)}),s=await n.json().catch(()=>({}));if(!n.ok)throw new Error(s.error_description??s.msg??`HTTP ${n.status}`);return s}async function co(e,t){const n=await On("token?grant_type=password",{email:e,password:t});return Mn({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Wa(e,t){const n=await On("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&Mn({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function po(){const e=Vt();if(localStorage.removeItem(Ca),!!e?.access_token)try{await fetch(`${ve}/auth/v1/logout`,{method:"POST",headers:{...Rn(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function Vt(){const e=localStorage.getItem(Ca);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function uo(){const e=Vt();if(!e)return null;const t=lo(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function mo(e){const t=Vt();if(!t)throw new Error("not signed in");const n=await fetch(`${ve}/auth/v1/user`,{method:"PUT",headers:{apikey:re,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const s=await n.json().catch(()=>({}));throw new Error(s.msg??`HTTP ${n.status}`)}}const La={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},jn={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},yo={generatedAt:new Date().toISOString(),records:[]},je={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},ho={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},fo={},go={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function ie(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function vo(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function bo(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function f(e,t,n=""){for(const s of t){const r=e[s];if(typeof r=="string"&&r.length>0)return r}return n}function D(e,t,n=0){for(const s of t)if(s in e)return ie(e[s]);return n}function fe(e,t,n=!0){for(const s of t)if(s in e)return bo(e[s]);return n}function me(e,t,n){for(const s of t){const r=e[s];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const l=new Date(r);if(!Number.isNaN(l.getTime()))return l.toISOString()}return n}function wo(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:me(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:ie(e.total_amount??e.billed_amount)}}function Za(e){const t=e.trim().toUpperCase(),n=fo[t];if(n)return n;const s=jn.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function Bn(e){try{return(await B("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function Ze(e,t){await Pa("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function zn(){const e=await he("daily_sales_detail",{select:"sales_date,amount,document_count,bottles,volume_ml,price_per_bottle,price_per_liter",order:"sales_date.desc"});if(e.length>0){const[t,n]=await Promise.all([B("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),B("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),r=new Date().toISOString().slice(0,10),l=r.slice(0,7),d=[...e].sort((P,E)=>P.sales_date.localeCompare(E.sales_date)).map(P=>({date:new Date(`${P.sales_date}T00:00:00Z`).toISOString(),amount:ie(P.amount??P.sales_amount),bottles:ie(P.bottles),volumeMl:ie(P.volume_ml),pricePerBottle:ie(P.price_per_bottle),pricePerLiter:ie(P.price_per_liter)})),p=d.slice(-30),u=P=>ie(P.amount??P.sales_amount),y=e.reduce((P,E)=>E.sales_date===r?P+u(E):P,0),v=e.reduce((P,E)=>E.sales_date.startsWith(l)?P+u(E):P,0),g=t.filter(P=>ie(P.balance_amount)>0),w=n.map((P,E)=>({id:String(P.id??`sale-${E+1}`),documentNo:P.document_no??P.legacy_document_no??"",date:P.sales_date??"",customerCode:P.legacy_customer_code??"",customerName:P.customer_name??P.legacy_customer_code??"",amount:ie(P.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:y,todayDelta:0,monthSales:v,monthDelta:0,unpaidCount:g.length,unpaidAmount:g.reduce((P,E)=>P+ie(E.balance_amount),0)},dailySales:p,allDailySales:d,salesRecords:w}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),jn}async function Fn(){const e=await he("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const s=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:ie(t.billed_amount),paymentAmount:ie(t.paid_amount),balanceAmount:ie(t.balance_amount),lastPaymentDate:null,status:vo(t.payment_status)}})}:yo}async function Da(){const[e,t]=await Promise.all([he("customers"),he("products")]);if(e.length>0||t.length>0){const n=e.length?e.map((r,l)=>{const d=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:f(r,["id","customer_id","code"],`customer-${l+1}`),code:f(r,["code","customer_code","legacy_customer_code"],`C${String(l+1).padStart(4,"0")}`),name:f(r,["name","customer_name","display_name"],`Customer ${l+1}`),kanaName:f(r,["kana_name"],""),shortName:f(r,["short_name"],""),postalCode:f(r,["postal_code"],""),address1:f(r,["address1"],""),address2:f(r,["address2"],""),phone:f(r,["phone"],""),fax:f(r,["fax"],""),email:f(r,["email"],""),staffCode:f(r,["staff_code"],""),businessType:f(r,["business_type"],""),areaCode:f(r,["delivery_area_code"],""),salesCategory:String(d.sales_category??""),closingDay:D(r,["closing_day","close_day"],31),paymentDay:D(r,["payment_day","due_day"],15),paymentMonth:Number(d.payment_month??0),paymentCycle:f(r,["payment_cycle"],""),billingCycleType:f(r,["billing_cycle_type"],""),billingCode:String(d.billing_code??""),creditLimit:D(r,["credit_limit"],0),taxMode:f(r,["tax_mode"],""),taxRound:String(d.tax_round??""),invoiceIssue:String(d.invoice_issue??""),invoiceType:f(r,["invoice_type"],""),priceGroup:String(d.price_group??""),priceType:String(d.price_type??""),tradeType:(()=>{const p=f(r,["trade_type"],"");if(p)return p;const u=String(d.price_type??"");return u==="000"?"B2B2C":u==="001"?"B2C":"B2B"})(),customerGroup1:String(d.customer_group1??""),customerGroup2:String(d.customer_group2??""),bankName:f(r,["bank_name"],""),bankBranch:f(r,["bank_branch"],""),bankAccount:f(r,["bank_account"],""),isActive:fe(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):je.customers,s=t.length?t.map((r,l)=>({id:f(r,["id","product_id","product_code","legacy_product_code"],`product-${l+1}`),code:f(r,["product_code","legacy_product_code","code"],`P${String(l+1).padStart(5,"0")}`),janCode:f(r,["jan_code","jan","barcode"],""),name:f(r,["name","product_name","display_name"],`Product ${l+1}`),kanaName:f(r,["kana_name"],""),shortName:f(r,["short_name"],""),category:f(r,["category_code","category","category_name"],"未分類"),taxCategoryCode:f(r,["tax_code","tax_category_code"],""),isActive:fe(r,["is_active","active","enabled"],!0),listPrice:D(r,["list_price"],0),purchasePrice:D(r,["purchase_price"],0),salePrice:D(r,["default_sale_price","sale_price"],0),costPrice:D(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:f(r,["unit_name","unit"],"本"),caseQty:r.case_qty!=null?Number(r.case_qty):null,bottleType:f(r,["bottle_type"],""),containerCode:f(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:f(r,["rice_type"],""),season:f(r,["season"],""),agingYears:D(r,["aging_years"],0)})):je.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||je.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:je.summary.activeCustomerCount,productCount:t.length||je.summary.productCount,activeProductCount:t.length?s.filter(r=>r.isActive).length:je.summary.activeProductCount},customers:n,products:s}}return je}async function Vn(){const[e,t]=await Promise.all([B("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),B("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?me(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const s=e[0],r=f(s,["status"],"success"),l=s.errors,d=Array.isArray(l)?l.length>0:!!l;return{generatedAt:new Date().toISOString(),lastSyncAt:me(s,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:d?"warning":r==="error"?"error":"success",jobName:f(s,["agent_hostname"],"sake-relay"),message:`${D(s,["rows_upserted"],0)}行同期 / ${D(s,["files_updated"],0)}ファイル更新`}}return{...ho,lastDataAt:n}}async function Yn(){const e=await ue("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function bt(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount,line_count",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];e.customerCode.trim()&&n.push(`customer_code.ilike.*${e.customerCode.trim()}*`,`legacy_customer_code.ilike.*${e.customerCode.trim()}*`),e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const s=await B("mv_invoice_with_line_count",t);return s.length>0?s.map((r,l)=>({id:f(r,["id"],`invoice-${l}`),documentNo:f(r,["document_no","legacy_document_no"],""),date:me(r,["sales_date"],""),customerCode:f(r,["legacy_customer_code","customer_code"],""),customerName:f(r,["customer_name","legacy_customer_code"],""),itemCount:D(r,["line_count"],0),amount:D(r,["total_amount","billed_amount"],0)})):[]}async function qa(e){const t=e.trim().toUpperCase();if(!t)return Za("");const[n,s,r]=await Promise.all([B("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),B("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),B("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||s.length>0){const l=n.map((u,y)=>{const v=wo(u,y);return{id:v.id,date:v.date,documentNo:v.documentNo,amount:v.amount}}),d=s.map((u,y)=>({id:String(u.id??`payment-${y+1}`),date:me(u,["payment_date","received_date"],new Date().toISOString()),amount:ie(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),p=r.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:ie(p?.balance_amount),salesTotal:l.reduce((u,y)=>u+y.amount,0),paymentTotal:d.reduce((u,y)=>u+y.amount,0),salesHistory:l,paymentHistory:d}}return Za(t)}async function Ia(){const[e,t,n,s]=await Promise.all([B("mv_monthly_sales",{order:"month.asc"}),B("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),B("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),B("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(r=>({month:f(r,["month"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),volumeMl:D(r,["volume_ml"],0)})),productTotals:n.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})),customerTotals:t.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})),staffTotals:s.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:0}))}:go}async function $o(e,t,n){if(t==="all")return[];const s=n?Un(t,n):null,l=await ue(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:s?.from??null,p_date_to:s?.to??null});return l?l.map(d=>({code:f(d,["code"],""),name:f(d,["name"],""),amount:D(d,["amount"],0),quantity:D(d,["quantity"],0),documents:D(d,["documents"],0),volumeMl:D(d,["volume_ml"],0)})):[]}async function xo(e,t){if(t==="all")return[];const n=await ue("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(s=>s.period_val).filter(Boolean)}function Un(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,s]=t.split("-").map(Number),r=`${n}-${String(s).padStart(2,"0")}-01`,l=new Date(n,s,0).getDate(),d=`${n}-${String(s).padStart(2,"0")}-${String(l).padStart(2,"0")}`;return{from:r,to:d}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const s=parseInt(n[1]),r=parseInt(n[2]),l=new Date(s,0,4),d=l.getDay()||7,p=new Date(l);p.setDate(l.getDate()-d+1);const u=new Date(p);u.setDate(p.getDate()+(r-1)*7);const y=new Date(u);return y.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:y.toISOString().slice(0,10)}}return null}function Jn(e){return e.map(t=>({staffCode:f(t,["staff_code"],""),staffName:f(t,["staff_name"],""),code:f(t,["code"],""),name:f(t,["name"],""),tag:f(t,["tag"],""),amount:D(t,["amount"],0),quantity:D(t,["quantity"],0),documents:D(t,["documents"],0)}))}async function _o(e,t){const n=await ue("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(s=>({code:f(s,["code"],""),name:f(s,["name"],""),amount:D(s,["amount"],0),quantity:D(s,["quantity"],0),documents:D(s,["documents"],0)})):[]}async function So(e,t,n){const s=await ue("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?Jn(s):[]}async function ko(e,t,n){const s=await ue("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?Jn(s):[]}async function Po(e,t){if(e==="all"||!t)return[];const n=await ue("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(s=>({month:f(s,["label"],""),amount:D(s,["amount"],0),quantity:D(s,["quantity"],0),volumeMl:D(s,["volume_ml"],0)})):[]}function Eo(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function Ao(e,t,n){const s=await ue("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),tag:f(r,["tag"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})):[]}async function Co(e,t,n){const s=await ue("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),tag:f(r,["tag"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})):[]}async function Lo(e,t){const n=await ue("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(s=>({month:f(s,["month"],""),amount:D(s,["amount"],0),quantity:D(s,["quantity"],0),volumeMl:D(s,["volume_ml"],0)})):[]}async function Do(e,t){const n=await ue("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:f(s,["brew_category"],""),subCategory:f(s,["sub_category"],""),productCount:D(s,["product_count"],0),totalShipmentQty:D(s,["total_shipment_qty"],0),totalShipmentMl:D(s,["total_shipment_ml"],0),monthlyAvgQty:D(s,["monthly_avg_qty"],0),monthlyAvgMl:D(s,["monthly_avg_ml"],0),currentStockL:D(s,["current_stock_l"],0),monthsRemaining:D(s,["months_remaining"],0),costPerL:D(s,["cost_per_l"],0)})):[]}async function qo(e,t){const n=await ue("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({month:f(s,["month"],""),brewCategory:f(s,["brew_category"],""),shipmentMl:D(s,["shipment_ml"],0)})):[]}async function Io(e,t){const n=await ue("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:f(s,["brew_category"],""),subCategory:f(s,["sub_category"],""),productCode:f(s,["product_code"],""),productName:f(s,["product_name"],""),volumeMl:D(s,["volume_ml"],0),annualQty:D(s,["annual_qty"],0),annualMl:D(s,["annual_ml"],0),monthlyAvgQty:D(s,["monthly_avg_qty"],0),monthlyAvgMl:D(s,["monthly_avg_ml"],0)})):[]}async function To(e){return(await B("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:f(n,["id"],""),brewCategory:f(n,["brew_category"],""),fy:D(n,["fy"],e),brewMonth:D(n,["brew_month"],0),durationMonths:D(n,["duration_months"],2),plannedVolumeL:D(n,["planned_volume_l"],0),notes:f(n,["notes"],"")}))}async function No(e,t,n){return await ue("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(r=>({brew_month:r.brewMonth,duration_months:r.durationMonths,planned_volume_l:r.plannedVolumeL,notes:r.notes??null}))})!==null}async function Mo(e,t,n,s){return await Pa("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:s??null,updated_at:new Date().toISOString()})!==null}async function Ro(){const e=await B("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const s=f(n,["category_name"],""),r=f(n,["production_type_name"],"");!s||!r||(t[s]||(t[s]=[]),t[s].push(r))}return t}async function Oo(e,t){return await ue("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function jo(e,t){return await ue("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function Bo(){const e=await B("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>f(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function zo(){const e=await B("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const s=f(n,["brew_category"],"");s&&(t[s]={brewCategory:s,rawAlcoholPct:D(n,["raw_alcohol_pct"],18),targetAlcoholPct:D(n,["target_alcohol_pct"],15)})}return t}async function Fo(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await I(async()=>{const{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}},void 0);return r?(await fetch(`${s}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function Vo(){const e=await ue("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:D(t,["fy"],0),brewCategory:f(t,["brew_category"],""),shipmentL:D(t,["shipment_l"],0),monthsElapsed:D(t,["months_elapsed"],12),annualizedL:D(t,["annualized_l"],0)})):[]}async function Yo(){const e=await B("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const s=f(n,["brew_category"],""),r=D(n,["growth_rate"],NaN);s&&!isNaN(r)&&(t[s]=r)}return t}async function Uo(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}},void 0);return s?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function Jo(){const e=await B("brewing_rice_params",{}),t={};for(const n of e??[]){const s=f(n,["brew_category"],"");s&&(t[s]={brewCategory:s,polishingRatio:D(n,["polishing_ratio"],.7),ricePerLiterKg:D(n,["rice_per_liter_kg"],.5),kojiRatio:D(n,["koji_ratio"],.3),kojiVariety:f(n,["koji_variety"],"山田錦"),kojiPricePerKg:D(n,["koji_price_per_kg"],600),kakeVariety:f(n,["kake_variety"],"一般米"),kakePricePerKg:D(n,["kake_price_per_kg"],350),alcoholAdditionRatio:D(n,["alcohol_addition_ratio"],0)})}return t}async function Qo(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,koji_ratio:t.kojiRatio,koji_variety:t.kojiVariety,koji_price_per_kg:t.kojiPricePerKg,kake_variety:t.kakeVariety,kake_price_per_kg:t.kakePricePerKg,alcohol_addition_ratio:t.alcoholAdditionRatio??0,updated_at:new Date().toISOString()})})).ok:!1}async function Ho(){const e=await ue("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:f(t,["brew_category"],""),monthNum:D(t,["month_num"],0),avgMonthlyL:D(t,["avg_monthly_l"],0)})):[]}async function Ko(e){const t=await B("procurement_decisions",{fy:`eq.${e}`}),n={};for(const s of t??[]){const r=f(s,["brew_category"],""),l=D(s,["decided_brewing_l"],-1);r&&l>=0&&(n[r]=l)}return n}async function Go(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await I(async()=>{const{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}},void 0);return r?(await fetch(`${s}/rest/v1/procurement_decisions`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,fy:t,decided_brewing_l:n,updated_at:new Date().toISOString()})})).ok:!1}async function Xo(e){return(await B("rice_purchase_commitments",{fy:`eq.${e}`,order:"variety_name.asc"})??[]).map(n=>({id:f(n,["id"],""),varietyName:f(n,["variety_name"],""),committedBales:D(n,["committed_bales"],0),pricePerKg:D(n,["price_per_kg"],0),supplier:f(n,["supplier"],""),deliveryMonth:D(n,["delivery_month"],0)||null,fy:D(n,["fy"],e),notes:f(n,["notes"],"")}))}async function Wo(e){return await Te("rice_purchase_commitments",{variety_name:e.varietyName,committed_bales:e.committedBales??0,price_per_kg:e.pricePerKg??0,supplier:e.supplier??"",delivery_month:e.deliveryMonth??null,fy:e.fy,notes:e.notes??""})!==null}async function Zo(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_purchase_commitments?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function er(){return(await B("rice_varieties",{order:"sort_order.asc,name.asc"})??[]).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),defaultPricePerKg:D(t,["default_price_per_kg"],400),region:f(t,["region"],"")}))}async function tr(e,t,n=""){return await Te("rice_varieties",{name:e,default_price_per_kg:t,region:n})!==null}async function ar(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_varieties?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function nr(e){return(await B("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:f(n,["id"],""),brewCategory:f(n,["brew_category"],""),label:f(n,["label"],""),volumeL:D(n,["volume_l"],0)}))}async function sr(){return(await B("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:f(t,["id"],""),brewCategory:f(t,["brew_category"],""),label:f(t,["label"],""),volumeL:D(t,["volume_l"],0)}))}async function or(e,t,n){return await Te("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function rr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function ir(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function lr(){return(await B("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:f(t,["name"],""),parentCategory:f(t,["parent_category"],"")})).filter(t=>t.name)}async function cr(e,t){return await Te("brewing_custom_categories",{name:e,parent_category:t})!==null}async function dr(e){const t=await ue("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:f(n,["production_type_name"],""),count:D(n,["product_count"],0)})).filter(n=>n.name):[]}async function pr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function ur(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);if(!s)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function mr(){const e=await B("brewing_category_overrides",{}),t={};for(const n of e??[]){const s=f(n,["product_code"],""),r=f(n,["brew_category"],"");s&&r&&(t[s]=r)}return t}async function yr(e){return(await B("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>f(n,["product_code"],"")).filter(Boolean)}async function hr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);if(!s)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}}),t.length===0)return!0;const r=t.map(d=>({year_month:e,product_code:d}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(r)})).ok}catch{return!1}}const pa={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Qn(e){const t=e.lines.reduce((r,l)=>r+l.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Te("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const en={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function Ta(e){const t=await B("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],s=ie(n.total_amount);return{documentNo:e,invoiceDate:f(n,["sales_date","document_date"],""),customerCode:f(n,["legacy_customer_code","customer_code"],""),customerName:f(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...en,documentNo:e||en.documentNo}}const fr={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function Na(e){const t=await B("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const l=D(r,["sales_amount"],0),d=D(r,["tax_amount"],0);return{customerCode:f(r,["customer_code"],""),customerName:f(r,["customer_name"],""),closingDay:31,salesAmount:l,taxAmount:d,prevBalance:0,paymentAmount:0,billingAmount:l,status:"open"}}),s=n.reduce((r,l)=>r+l.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:s,customers:n}}return{...fr,targetYearMonth:e}}const gr={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function Yt(){const[e,t,n]=await Promise.all([B("mv_monthly_sales",{order:"month.asc"}),B("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),B("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return gr;const s=e.slice(-12).map(u=>f(u,["month"],"")),r=new Map;t.forEach(u=>{const y=f(u,["code"],"");r.has(y)||r.set(y,{name:f(u,["name"],y),monthValues:new Map}),r.get(y).monthValues.set(f(u,["month"],""),D(u,["amount"],0))});const d=Array.from(r.entries()).map(([u,y])=>({code:u,name:y.name,total:s.reduce((v,g)=>v+(y.monthValues.get(g)??0),0),monthValues:y.monthValues})).sort((u,y)=>y.total-u.total).slice(0,10).map(u=>({label:u.name,values:s.map(y=>u.monthValues.get(y)??0)})),p=n.map(u=>({label:f(u,["name"],""),values:s.map(()=>Math.round(D(u,["amount"],0)/s.length))}));return{generatedAt:new Date().toISOString(),months:s,salesByProduct:d,salesByCustomer:p,costSimulation:[]}}async function vr(){const e=await he("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const s=f(n,["code"],"");if(!s)return;const r=f(n,["month"],""),l=parseInt(r.slice(5,7))-1;if(l<0||l>11)return;let d=t.get(s);d||(d={name:f(n,["name"],s),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(s,d)),d.qty[l]+=D(n,["quantity"],0),d.amt[l]+=D(n,["amount"],0)}),Array.from(t.entries()).map(([n,s])=>({code:n,name:s.name,monthlyQuantity:s.qty,monthlyAmount:s.amt,totalQuantity:s.qty.reduce((r,l)=>r+l,0),totalAmount:s.amt.reduce((r,l)=>r+l,0)})).filter(n=>n.totalQuantity>0).sort((n,s)=>s.totalAmount-n.totalAmount)}async function br(){return(await B("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:f(t,["product_code"],""),productName:f(t,["product_name"],""),forecastMonth:f(t,["forecast_month"],""),segment:f(t,["segment"],"monthly"),avgMonthly:D(t,["avg_monthly"],0),forecastQuantity:D(t,["forecast_quantity"],0),forecastAmount:D(t,["forecast_amount"],0),safetyStock:D(t,["safety_stock"],0),calculatedAt:me(t,["calculated_at"],"")}))}async function wr(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await he("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(d=>String(d.id)).filter(Boolean);const s=await he("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(d=>{d.id&&r.set(String(d.id),d)});const l=[];return s.forEach(d=>{const p=String(d.header_id??d.document_header_id??""),u=r.get(p);if(!u)return;const y=u.sales_date??u.document_date??"";!y||y<t||l.push({date:y.slice(0,10),customerName:u.customer_name??"不明",productName:d.product_name??"不明",quantity:ie(d.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),l.sort((d,p)=>d.date.localeCompare(p.date))}async function Hn(){const e=new Date().toISOString();return(await B("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:f(n,["id"],""),message:f(n,["message"],""),level:f(n,["level"],"info"),startsAt:me(n,["starts_at"],""),endsAt:n.ends_at?me(n,["ends_at"],""):null,dismissible:fe(n,["dismissible"],!0)}))}async function $r(){const e=await he("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:f(t,["customer_code"],""),customer_name:f(t,["customer_name"],""),business_type:f(t,["business_type"],""),area_code:f(t,["area_code"],""),phone:f(t,["phone"],""),last_order_date:f(t,["last_order_date"],""),days_since_order:D(t,["days_since_order"],0),amount_12m:D(t,["amount_12m"],0),amount_3m:D(t,["amount_3m"],0),amount_this_month:D(t,["amount_this_month"],0),amount_last_year_same_month:D(t,["amount_last_year_same_month"],0),annual_revenue:D(t,["annual_revenue"],0),is_dormant:fe(t,["is_dormant"],!1),is_at_risk:fe(t,["is_at_risk"],!1)})):[]}async function xr(){return(await he("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:f(t,["customer_code"],""),customer_name:f(t,["customer_name"],""),phone:f(t,["phone"],""),address:f(t,["address"],""),area_code:f(t,["area_code"],""),business_type:f(t,["business_type"],""),priority_score:D(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:f(t,["last_order_date"],""),days_since_order:D(t,["days_since_order"],0),annual_revenue:D(t,["annual_revenue"],0),recommended_action:f(t,["recommended_action"],"")}))}async function _r(){return(await he("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:f(t,["product_code"],""),product_name:f(t,["product_name"],""),season_type:f(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:D(t,["avg_monthly_qty"],0)}))}async function Sr(){return(await he("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:f(t,["product_code"],""),name:f(t,["product_name"],""),monthlyQuantity:[D(t,["m01"],0),D(t,["m02"],0),D(t,["m03"],0),D(t,["m04"],0),D(t,["m05"],0),D(t,["m06"],0),D(t,["m07"],0),D(t,["m08"],0),D(t,["m09"],0),D(t,["m10"],0),D(t,["m11"],0),D(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:D(t,["total_quantity"],0),totalAmount:D(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Kn(e,t,n){try{return await Te("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function Gn(e,t){return Ea("customers",e,t)}async function Xn(e,t){return Ea("products",e,t)}async function ua(e,t){const n=e.find(d=>d.code===t);n?.priceGroup;const s=n?.priceGroup||t;let r="";try{const d=await B("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});d[0]?.memo&&(r=(typeof d[0].memo=="string"?JSON.parse(d[0].memo):d[0].memo)?.price_type??"")}catch{}const l=new Map;if(s){const d=await B("customer_product_prices",{price_group:`eq.${s}`,select:"legacy_product_code,special_price"});for(const p of d)l.set(p.legacy_product_code,p.special_price)}return{priceType:r,priceGroup:s,individualPrices:l}}function Ma(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function Wn(){return(await B("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function kr(){return(await he("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Pr(){return(await B("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function ht(e,t="billing"){const n=await ue("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t});return n?n.map(s=>({code:String(s.legacy_customer_code??""),name:String(s.customer_name??""),address:String(s.address1??""),yearAmount:Number(s.year_amount??0),sharePct:Number(s.share_pct??0),orderDays:Number(s.order_days??0),prevAmount:Number(s.prev_amount??0),growthRate:s.growth_rate!=null?Number(s.growth_rate):null,currentRank:String(s.current_rank??"C"),prevRank:String(s.prev_rank??"")})):[]}async function Zn(){const[e,t]=await Promise.all([B("mv_customer_abc",{order:"amount.desc"}),Yt()]),n=e.map(s=>({code:f(s,["code"],""),name:f(s,["name"],""),amount:D(s,["amount"],0),documents:D(s,["documents"],0),ratio:D(s,["ratio"],0),cumRatio:D(s,["cum_ratio"],0),abcRank:f(s,["abc_rank"],"C")}));return{generatedAt:new Date().toISOString(),ranking:n,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function Er(){const[e,t]=await Promise.all([B("mv_product_abc",{order:"amount.desc"}),Yt()]),n=e.map(d=>({code:f(d,["code"],""),name:f(d,["name"],""),amount:D(d,["amount"],0),quantity:D(d,["quantity"],0),ratio:D(d,["ratio"],0),cumRatio:D(d,["cum_ratio"],0),abcRank:f(d,["abc_rank"],"C")})),s=n.reduce((d,p)=>d+p.amount,0),r=new Set(n.filter(d=>d.abcRank==="A").map(d=>d.name)),l=t.salesByProduct.filter(d=>r.has(d.label));return{generatedAt:new Date().toISOString(),totalAmount:s,ranking:n,months:t.months,monthlyByProduct:l.length>0?l:t.salesByProduct}}const es={planned:"計画中",active:"仕込中",done:"完了"};async function ts(){const e=await B("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),jikomiNo:f(t,["batch_no","legacy_batch_no"],""),productName:f(t,["brand_name"],""),riceType:f(t,["rice_type"],""),plannedKg:D(t,["planned_rice_kg"],0),actualKg:D(t,["actual_rice_kg"],0),startDate:me(t,["start_date"],""),expectedDoneDate:me(t,["expected_done_date"],""),status:f(t,["status"],"planned"),tankNo:f(t,["tank_no"],""),note:f(t,["remarks"],"")})):[]}async function as(){const e=await B("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),tankNo:f(t,["tank_no"],""),capacity:D(t,["capacity_l"],0),currentVolume:D(t,["current_volume_l"],0),productName:f(t,["current_product_code"],""),jikomiNo:f(t,["current_batch_id"],""),status:f(t,["status"],"empty"),lastUpdated:me(t,["last_updated_at"],"")})):[]}async function ns(){const e=await B("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),kenteiNo:f(t,["kentei_no"],""),jikomiNo:f(t,["batch_id"],""),productName:f(t,["product_code"],""),kenteiDate:me(t,["kentei_date"],""),alcoholDegree:D(t,["alcohol_degree"],0),extractDegree:D(t,["extract_degree"],0),sakaMeterValue:D(t,["sakemeter_value"],0),volume:D(t,["volume_l"],0),taxCategory:f(t,["tax_category_code"],""),status:f(t,["status"],"pending")})):[]}async function ma(){const e=await B("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),code:f(t,["material_code","legacy_material_code"],""),name:f(t,["name"],""),unit:f(t,["unit"],""),currentStock:D(t,["current_stock"],0),minimumStock:D(t,["minimum_stock"],0),unitCost:D(t,["unit_cost"],0),lastUpdated:me(t,["updated_at"],"")})):[]}async function ss(){const e=await B("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),documentNo:f(t,["document_no","legacy_document_no"],""),purchaseDate:me(t,["purchase_date"],""),supplierCode:f(t,["supplier_code","legacy_supplier_code"],""),supplierName:f(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:D(t,["total_amount"],0),status:f(t,["payment_status"],"pending")})):[]}async function os(){const e=await B("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:f(t,["supplier_code","legacy_supplier_code"],""),supplierName:f(t,["legacy_supplier_code"],""),totalPurchase:D(t,["total_purchase"],0),paidAmount:D(t,["paid_amount"],0),balance:D(t,["balance"],0),nextPaymentDate:me(t,["next_payment_date"],""),status:f(t,["status"],"unpaid")})):[]}async function rs(){const e=await B("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),billNo:f(t,["bill_no"],""),supplierName:f(t,["counterparty_name"],""),amount:D(t,["amount"],0),issueDate:me(t,["issue_date"],""),dueDate:me(t,["due_date"],""),status:f(t,["status"],"holding")})):[]}async function is(){const e=await B("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:f(t,["material_code","legacy_material_code"],""),name:f(t,["name"],""),unit:f(t,["unit"],""),currentStock:D(t,["current_stock"],0),minimumStock:D(t,["minimum_stock"],0),lastPurchaseDate:me(t,["last_purchase_date"],""),unitCost:D(t,["unit_cost"],0)})):[]}const ls=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],ya={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Ar={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function Ra(e,t){const n=await B("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const s=n[0],r=f(s,["id"],""),[l,d]=await Promise.all([B("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),B("tax_deductions",{declaration_id:`eq.${r}`})]),p=l.map(y=>({taxCategory:f(y,["tax_category_code"],""),taxCategoryName:f(y,["tax_category_name"],""),alcoholDegree:D(y,["alcohol_degree"],0),volume:D(y,["taxable_volume"],0),taxRate:D(y,["tax_rate"],0),taxAmount:D(y,["tax_amount"],0),productionVolume:D(y,["production_volume"],0),previousBalance:D(y,["previous_balance"],0),currentAdjustment:D(y,["current_adjustment"],0),exportDeduction:D(y,["export_deduction"],0),sampleDeduction:D(y,["sample_deduction"],0),taxableVolume:D(y,["taxable_volume"],0)})),u=d.map(y=>({type:f(y,["deduction_type"],"sample"),categoryCode:f(y,["tax_category_code"],""),volume:D(y,["volume"],0),reason:f(y,["reason"],""),documentNo:f(y,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:f(s,["company_name"],""),companyNo:f(s,["company_no"],""),companyAddress:f(s,["company_address"],""),companyRepresentative:f(s,["company_representative"],""),taxOffice:f(s,["tax_office"],""),rows:p,deductions:u,totalVolume:D(s,["total_taxable_volume"],0),totalTax:D(s,["total_tax_amount"],0),status:f(s,["status"],"draft"),submittedAt:f(s,["submitted_at"],"")||null}}return{...Ar,targetYear:e,targetMonth:t}}function Pe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function cs(e){const t=e.rows.map(s=>`    <Category>
      <Code>${Pe(s.taxCategory)}</Code>
      <Name>${Pe(s.taxCategoryName)}</Name>
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
`),n=e.deductions.map(s=>`    <Deduction type="${Pe(s.type)}">
      <CategoryCode>${Pe(s.categoryCode)}</CategoryCode>
      <Volume>${s.volume}</Volume>
      <Reason>${Pe(s.reason)}</Reason>${s.documentNo?`
      <DocumentNo>${Pe(s.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${Pe(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${Pe(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${Pe(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${Pe(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${Pe(e.taxOffice)}</TaxOffice>
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
`}function Cr(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function Lr(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),s=e.rows.map(l=>[l.taxCategory,l.taxCategoryName,l.alcoholDegree,l.productionVolume,l.previousBalance,l.currentAdjustment,l.exportDeduction,l.sampleDeduction,l.taxableVolume,l.taxRate,l.taxAmount].map(Cr).join(",")),r=`,合計,,${e.rows.reduce((l,d)=>l+d.productionVolume,0)},,,${e.rows.reduce((l,d)=>l+d.exportDeduction,0)},${e.rows.reduce((l,d)=>l+d.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...s,r].join(`
`)+`
`}function Dr(e){const t=e.rows.map(r=>{const l=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),d=Math.round(l*r.taxRate);return{...r,taxableVolume:l,volume:l,taxAmount:d}}),n=t.reduce((r,l)=>r+l.taxableVolume,0),s=t.reduce((r,l)=>r+l.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:s}}async function qr(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>H);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:cs(e),submitted_at:e.submittedAt})}async function Oa(e){const t=await B("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:f(n,["id"],""),saleDate:f(n,["sale_date"],e),saleTime:f(n,["sale_time"],""),productCode:f(n,["product_code"],""),productName:f(n,["product_name"],""),quantity:D(n,["quantity"],0),unitPrice:D(n,["unit_price"],0),amount:D(n,["amount"],0),paymentMethod:f(n,["payment_method"],"cash")})):[]}async function ds(){const e=await B("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:f(t,["id"],""),orderNo:f(t,["order_no"],""),orderDate:me(t,["order_date"],""),customerName:f(t,["customer_name"],""),postalCode:f(t,["postal_code"],""),address:f(t,["shipping_address"],""),items:[],totalAmount:D(t,["total_amount"],0),status:f(t,["status"],"new"),shippingDate:me(t,["shipping_date"],"")})):[]}async function Ir(e,t,n,s,r,l){const d=await Te("store_orders",{order_no:e,order_date:new Date().toISOString().slice(0,10),channel:"mobile",customer_name:t,legacy_customer_code:n||null,total_amount:s,status:"new",remarks:r||null});if(!d)return null;const p=d.id;for(let u=0;u<l.length;u++){const y=l[u];await Te("store_order_lines",{order_id:p,line_no:u+1,product_code:y.productCode,product_name:y.productName,quantity:y.quantity,unit_price:y.unitPrice,amount:y.amount})}return p}async function It(e){const t=await Te("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function ps(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Tr(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await B("print_layouts",t)).map(s=>({id:f(s,["id"],""),name:f(s,["name"],""),templateKey:f(s,["template_key"],""),positions:s.positions??{},isDefault:fe(s,["is_default"],!1),note:f(s,["note"],""),updatedAt:f(s,["updated_at"],"")}))}async function Nr(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>H);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},s=await t("print_layouts",n);return s?{id:f(s,["id"],e.id),name:f(s,["name"],e.name),templateKey:f(s,["template_key"],e.templateKey),positions:s.positions??e.positions,isDefault:fe(s,["is_default"],!1),note:f(s,["note"],""),updatedAt:f(s,["updated_at"],"")}:null}async function Mr(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Rr(){return(await B("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),email:f(t,["email"],""),displayName:f(t,["display_name"],""),signature:f(t,["signature"],""),replyTo:f(t,["reply_to"],""),isDefault:fe(t,["is_default"],!1),isVerified:fe(t,["is_verified"],!1),note:f(t,["note"],"")}))}async function Or(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:f(n,["id"],e.id),name:f(n,["name"],e.name),email:f(n,["email"],e.email),displayName:f(n,["display_name"],""),signature:f(n,["signature"],""),replyTo:f(n,["reply_to"],""),isDefault:fe(n,["is_default"],!1),isVerified:fe(n,["is_verified"],!1)}:null}async function jr(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const ja={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},Ba={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function Br(e){const t=`${e}-01T00:00:00Z`,[n,s]=e.split("-").map(p=>parseInt(p,10)),r=new Date(n,s,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await B("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${l})`,order:"starts_at.asc"})).map(p=>({id:f(p,["id"],""),title:f(p,["title"],""),description:f(p,["description"],""),category:f(p,["category"],"general")||"general",startsAt:f(p,["starts_at"],new Date().toISOString()),endsAt:f(p,["ends_at"],""),isAllDay:fe(p,["is_all_day"],!1),location:f(p,["location"],""),attendees:p.attendees??[],relatedCustomerCode:f(p,["related_customer_code"],""),relatedOrderId:f(p,["related_order_id"],""),color:f(p,["color"],""),googleEventId:f(p,["google_event_id"],"")}))}async function zr(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??Ba[e.category],updated_at:new Date().toISOString()})?e:null}async function Fr(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function us(){return(await B("integration_settings",{order:"name.asc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),provider:f(t,["provider"],""),config:t.config??{},isEnabled:fe(t,["is_enabled"],!1),lastSyncAt:f(t,["last_sync_at"],""),lastStatus:f(t,["last_status"],"")}))}async function $t(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function Vr(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const s=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(s,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const l=await r.json(),{supabaseInsert:d}=await I(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>H);return{supabaseInsert:u}},void 0);let p=0;for(const u of l.orders){const y=`shopify_${u.id}`;await d("shopify_orders",{id:y,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),p++}return await $t({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得成功`}),{count:p}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function Yr(){return(await B("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:f(t,["id"],""),shopifyOrderId:f(t,["shopify_order_id"],""),orderNumber:f(t,["order_number"],""),orderDate:f(t,["order_date"],""),customerName:f(t,["customer_name"],""),customerEmail:f(t,["customer_email"],""),totalAmount:ie(t.total_amount),financialStatus:f(t,["financial_status"],""),fulfillmentStatus:f(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function Ur(e){const t=e.config.refresh_token,n=e.config.client_id,s=e.config.client_secret;if(!t||!n||!s)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:s})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const d=(await r.json()).access_token;return await $t({...e,config:{...e.config,oauth_token:d}}),e.config.oauth_token=d,{token:d}}async function Jr(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const s=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),l=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${s}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let d=await fetch(l,{headers:{Authorization:`Bearer ${t}`}});if(d.status===401){const v=await Ur(e);if(v.error)return{count:0,error:v.error};t=v.token,d=await fetch(l,{headers:{Authorization:`Bearer ${t}`}})}if(!d.ok)return{count:0,error:`HTTP ${d.status}`};const p=await d.json(),{supabaseInsert:u}=await I(async()=>{const{supabaseInsert:v}=await Promise.resolve().then(()=>H);return{supabaseInsert:v}},void 0);let y=0;for(const v of p.items){const g=`gcal_${v.id}`,w=v.start?.dateTime??v.start?.date??"",P=v.end?.dateTime??v.end?.date??"";await u("calendar_events",{id:g,title:String(v.summary??"(無題)"),description:String(v.description??""),category:"general",starts_at:String(w),ends_at:String(P),location:String(v.location??""),google_event_id:String(v.id??""),updated_at:new Date().toISOString()}),y++}return await $t({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${y}件取得`}),{count:y}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function Qr(){return(await B("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:f(t,["id"],""),receivedAt:f(t,["received_at"],""),senderPhone:f(t,["sender_phone"],""),senderName:f(t,["sender_name"],""),imageUrl:f(t,["image_url"],""),ocrStatus:f(t,["ocr_status"],"pending")||"pending",ocrText:f(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:f(t,["linked_invoice_id"],"")}))}async function Hr(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const s=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(s){return{text:"",error:s instanceof Error?s.message:String(s)}}}async function Kr(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Rt={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},Ot={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function Gr(){return(await B("user_profiles",{order:"display_name.asc"})).map(t=>({id:f(t,["id"],""),email:f(t,["email"],""),displayName:f(t,["display_name"],""),staffCode:f(t,["staff_code"],""),department:f(t,["department"],"all")||"all",role:f(t,["role"],"staff")||"staff",defaultMailSenderId:f(t,["default_mail_sender_id"],""),phone:f(t,["phone"],""),avatarUrl:f(t,["avatar_url"],""),isActive:fe(t,["is_active"],!0),lastSignInAt:f(t,["last_sign_in_at"],""),createdAt:f(t,["created_at"],"")}))}async function Xr(e){if(!e)return null;const t=await B("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:f(n,["id"],""),email:f(n,["email"],""),displayName:f(n,["display_name"],""),staffCode:f(n,["staff_code"],""),department:f(n,["department"],"all")||"all",role:f(n,["role"],"staff")||"staff",defaultMailSenderId:f(n,["default_mail_sender_id"],""),phone:f(n,["phone"],""),avatarUrl:f(n,["avatar_url"],""),isActive:fe(n,["is_active"],!0),lastSignInAt:f(n,["last_sign_in_at"],"")}}async function Wr(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function Zr(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ei(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>H);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function ti(e=100){return(await B("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:f(n,["id"],""),action:f(n,["action"],""),entityType:f(n,["entity_type"],""),entityId:f(n,["entity_id"],""),userEmail:f(n,["user_email"],""),changes:n.changes??{},createdAt:f(n,["created_at"],"")}))}const jt={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function ms(){return(await B("slack_notifications",{order:"event_type.asc"})).map(t=>({id:f(t,["id"],""),eventType:f(t,["event_type"],"new_order"),enabled:fe(t,["enabled"],!0),channel:f(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:f(t,["last_triggered_at"],"")}))}async function ai(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function ni(e=50){return(await B("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:f(n,["id"],""),eventType:f(n,["event_type"],""),channel:f(n,["channel"],""),message:f(n,["message"],""),status:f(n,["status"],"sent"),error:f(n,["error"],""),sentAt:f(n,["sent_at"],"")}))}async function si(e,t,n){const r=(await us()).find(y=>y.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const l=r.config.webhook_url;if(!l)return{ok:!1,error:"Webhook URL未設定"};const p=(await ms()).find(y=>y.eventType===e&&y.enabled);if(!p)return{ok:!1,error:"通知ルールが無効"};const u=n??p.channel??r.config.default_channel??"#general";try{const y=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${jt[e]} ${t}`,channel:u})}),v=y.ok,{supabaseInsert:g}=await I(async()=>{const{supabaseInsert:w}=await Promise.resolve().then(()=>H);return{supabaseInsert:w}},void 0);return await g("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:v?"sent":"failed",error:v?null:`HTTP ${y.status}`}),v?{ok:!0}:{ok:!1,error:`HTTP ${y.status}`}}catch(y){return{ok:!1,error:y instanceof Error?y.message:String(y)}}}const Ut={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},za={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function oi(){return(await B("prospects",{order:"updated_at.desc"})).map(t=>({id:f(t,["id"],""),companyName:f(t,["company_name"],""),contactName:f(t,["contact_name"],""),email:f(t,["email"],""),phone:f(t,["phone"],""),address:f(t,["address"],""),website:f(t,["website"],""),businessType:f(t,["business_type"],""),stage:f(t,["stage"],"cold"),source:f(t,["source"],""),expectedAmount:ie(t.expected_amount),probability:ie(t.probability),assignedStaffCode:f(t,["assigned_staff_code"],""),nextActionDate:f(t,["next_action_date"],""),nextAction:f(t,["next_action"],""),note:f(t,["note"],""),lastContactAt:f(t,["last_contact_at"],""),wonAt:f(t,["won_at"],""),lostAt:f(t,["lost_at"],""),lostReason:f(t,["lost_reason"],""),convertedCustomerCode:f(t,["converted_customer_code"],""),createdAt:f(t,["created_at"],"")}))}async function ys(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()})?e:null}async function ri(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/prospects","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ii(e){return(await B("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:f(n,["id"],""),prospectId:f(n,["prospect_id"],""),activityType:f(n,["activity_type"],"call"),title:f(n,["title"],""),description:f(n,["description"],""),activityDate:f(n,["activity_date"],""),result:f(n,["result"],""),staffCode:f(n,["staff_code"],"")}))}async function li(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const hs=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function ci(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function di(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function pi(){return(await he("v_customer_map")).filter(t=>t.lat&&t.lng).map(t=>({customerCode:f(t,["customer_code"],""),name:f(t,["name"],""),phone:f(t,["phone"],""),areaCode:f(t,["area_code"],""),businessType:f(t,["business_type"],""),businessTypeName:f(t,["business_type_name"],""),address1:f(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:fe(t,["is_at_risk"],!1),isDormant:fe(t,["is_dormant"],!1),amount12m:D(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}const Jt=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function ui(){return(await he("customer_churn_notes")).map(t=>({customerCode:f(t,["customer_code"],""),reason:f(t,["reason"],""),memo:f(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:f(t,["updated_at"],"")}))}async function mi(e){const{supabaseUpsert:t}=await I(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>H);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function yi(){return(await B("delivery_locations",{order:"name.asc"})).map(t=>({id:f(t,["id"],""),customerCode:f(t,["customer_code"],""),name:f(t,["name"],""),postalCode:f(t,["postal_code"],""),address:f(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:f(t,["contact_name"],""),phone:f(t,["phone"],""),deliveryNote:f(t,["delivery_note"],""),isActive:fe(t,["is_active"],!0)}))}async function hi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function fi(e=50){return(await B("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:f(n,["id"],""),callDirection:f(n,["call_direction"],"inbound"),fromNumber:f(n,["from_number"],""),toNumber:f(n,["to_number"],""),matchedCustomerCode:f(n,["matched_customer_code"],""),matchedProspectId:f(n,["matched_prospect_id"],""),durationSeconds:ie(n.duration_seconds),callStatus:f(n,["call_status"],"answered"),recordingUrl:f(n,["recording_url"],""),transcript:f(n,["transcript"],""),ivryCallId:f(n,["ivry_call_id"],""),startedAt:f(n,["started_at"],""),endedAt:f(n,["ended_at"],""),notes:f(n,["notes"],"")}))}async function fs(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function gi(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const s=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(s,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const d=(await r.json()).calls??[];let p=0;for(const u of d)await fs({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),p++;return await $t({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得`}),{count:p}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function vi(e,t){const n=e.config.api_key,s=e.config.team_id;if(!n||!s)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const l of t){if(!l.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${s}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:l.name,phone_number:l.phone,external_id:l.customerCode??"",note:l.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function bi(){return(await B("lead_lists",{order:"created_at.desc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),query:f(t,["query"],""),area:f(t,["area"],""),businessType:f(t,["business_type"],""),totalCount:ie(t.total_count),source:f(t,["source"],"manual"),createdAt:f(t,["created_at"],"")}))}async function wi(e){return(await B("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:f(n,["id"],""),listId:f(n,["list_id"],""),companyName:f(n,["company_name"],""),address:f(n,["address"],""),phone:f(n,["phone"],""),website:f(n,["website"],""),email:f(n,["email"],""),businessType:f(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:ie(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:f(n,["place_id"],""),status:f(n,["status"],"new"),convertedProspectId:f(n,["converted_prospect_id"],""),note:f(n,["note"],"")}))}async function $i(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function gs(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function xi(e,t,n){const s=e.config.api_key;if(!s)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),l=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${s}`;try{const d=await fetch(l);if(!d.ok)return{results:[],error:`HTTP ${d.status}`};const p=await d.json();return p.status!=="OK"&&p.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${p.status}`}:{results:p.results.map(y=>{const v=y.geometry?.location;return{id:`place_${y.place_id}`,listId:"",companyName:String(y.name??""),address:String(y.formatted_address??""),rating:y.rating?Number(y.rating):void 0,reviewCount:y.user_ratings_total?Number(y.user_ratings_total):void 0,lat:v?.lat,lng:v?.lng,placeId:String(y.place_id??""),status:"new"}})}}catch(d){return{results:[],error:d instanceof Error?d.message:String(d)}}}async function _i(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await ys(t);return n&&await gs({...e,status:"imported",convertedProspectId:t.id}),n}async function Si(){return(await B("workflow_orders",{order:"order_date.desc"})).map(t=>({id:f(t,["id"],""),orderNo:f(t,["order_no"],""),customerName:f(t,["customer_name"],""),customerCode:f(t,["customer_code"],""),orderDate:f(t,["order_date"],""),deliveryDate:f(t,["delivery_date"],""),stage:f(t,["stage"],"new"),totalAmount:ie(t.total_amount),itemCount:ie(t.item_count),priority:f(t,["priority"],"normal"),staffName:f(t,["staff_name"],""),notes:f(t,["notes"],"")}))}async function ki(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function Pi(){return(await B("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),email:f(t,["email"],""),phone:f(t,["phone"],""),visitDate:f(t,["visit_date"],""),partySize:ie(t.party_size)||1,language:f(t,["language"],"ja"),purpose:f(t,["purpose"],""),message:f(t,["message"],""),status:f(t,["status"],"new"),repliedAt:f(t,["replied_at"],""),confirmedTime:f(t,["confirmed_time"],""),createdAt:f(t,["created_at"],new Date().toISOString())}))}async function Ei(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>H);return{supabaseInsert:s}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const Ai=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function vs(){return(await Promise.all(Ai.map(async t=>{const[n,s]=await Promise.all([Aa(t.table),B(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:s[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Tt(e,t,n=100){const s=(t-1)*n,[r,l]=await Promise.all([B(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(s)}),Aa(e)]);return{records:r,total:l}}async function ha(e){const t=await B("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const s=JSON.parse(n);return String(s.price_group??"")}catch{return""}return""}async function bs(e,t){if(e){const s=await B("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(s.length>0&&s[0].special_price)return ie(s[0].special_price)}const n=await B("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?ie(n[0].default_sale_price):0}const Ci=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],Li=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],Di={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function qi(){const e=new Date,t=[];for(let u=11;u>=0;u--){const y=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`)}const n=Ci,s={},r={};for(const u of n){s[u.code]={};for(const y of t){const v=parseInt(y.split("-")[1])-1,g=Di[u.code]??100,w=Math.round(g*Li[v]*(.85+Math.random()*.3));s[u.code][y]=w,r[y]=(r[y]??0)+w}}const l={},d={},p={};for(const u of n){const y=t.map(w=>s[u.code][w]??0),v=y.reduce((w,P)=>w+P,0)/y.length,g=y.reduce((w,P)=>w+(P-v)**2,0)/y.length;l[u.code]=y.reduce((w,P)=>w+P,0),d[u.code]=v,p[u.code]=Math.sqrt(g)}return{months:t,products:n,matrix:s,totals:r,productTotals:l,productAvg:d,productStdDev:p}}async function Ii(e=36){const t=(()=>{const w=new Date;return w.setMonth(w.getMonth()-e),`${w.getFullYear()}-${String(w.getMonth()+1).padStart(2,"0")}`})(),n=await he("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"});if(n.length===0)return qi();const s=new Set,r=new Map,l={},d={};for(const w of n){const P=f(w,["year_month"],""),E=f(w,["product_code"],""),o=f(w,["product_name"],E),i=D(w,["quantity"],0);!P||!E||(s.add(P),r.set(E,o),l[E]||(l[E]={}),l[E][P]=i,d[P]=(d[P]??0)+i)}const p=[...s].sort(),u=[...r.entries()].map(([w,P])=>({code:w,name:P})),y={},v={},g={};for(const w of u){const P=p.map(i=>l[w.code]?.[i]??0),E=P.reduce((i,c)=>i+c,0)/(P.length||1),o=P.reduce((i,c)=>i+(c-E)**2,0)/(P.length||1);y[w.code]=P.reduce((i,c)=>i+c,0),v[w.code]=E,g[w.code]=Math.sqrt(o)}return{months:p,products:u,matrix:l,totals:d,productTotals:y,productAvg:v,productStdDev:g}}async function Ti(){return(await B("product_safety_stock_params",{order:"product_code.asc"})).map(t=>({productCode:f(t,["product_code"],""),productName:f(t,["product_name"],""),unit:f(t,["unit"],"本"),avgMonthlyDemand:D(t,["avg_monthly_demand"],0),demandStdDev:D(t,["demand_std_dev"],0),leadTimeDays:D(t,["lead_time_days"],30),serviceLevel:D(t,["service_level"],.95),safetyStockQty:D(t,["safety_stock_qty"],0),reorderPoint:D(t,["reorder_point"],0),memo:f(t,["memo"],""),productionType:f(t,["production_type"],"monthly")}))}async function Ni(e){return(await B("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:f(n,["id"],""),yearMonth:f(n,["year_month"],e),productCode:f(n,["product_code"],""),productName:f(n,["product_name"],""),demandForecast:D(n,["demand_forecast"],0),safetyStockTarget:D(n,["safety_stock_target"],0),openingStock:D(n,["opening_stock"],0),requiredProduction:D(n,["required_production"],0),plannedQty:D(n,["planned_qty"],0),actualQty:D(n,["actual_qty"],0),status:f(n,["status"],"draft"),productionType:f(n,["production_type"],"monthly"),notes:f(n,["notes"],"")}))}async function Mi(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>H);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n||e.length===0)return!1;try{const s=e.map(d=>({product_code:d.productCode,product_name:d.productName,unit:d.unit,avg_monthly_demand:d.avgMonthlyDemand,demand_std_dev:d.demandStdDev,lead_time_days:d.leadTimeDays,service_level:d.serviceLevel,safety_stock_qty:d.safetyStockQty,reorder_point:d.reorderPoint,production_type:d.productionType,memo:d.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),r=new URL("/rest/v1/product_safety_stock_params",t),l=await fetch(r.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(s)});if(!l.ok){const d=await l.text();return console.error("saveSafetyStockParamsBulk failed:",l.status,d),!1}return!0}catch(s){return console.error("saveSafetyStockParamsBulk error:",s),!1}}async function Ri(e){const{supabaseUpsert:t}=await I(async()=>{const{supabaseUpsert:s}=await Promise.resolve().then(()=>H);return{supabaseUpsert:s}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function Oi(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}async function ji(e){const[t,n]=e.split("-").map(Number),s=`${e}-01`,r=new Date(t,n,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}`,d=await he("sales_document_headers",{select:"sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${s},sales_date.lte.${l})`,order:"sales_date.asc"}),p=await he("customers",{select:"id,address1",address1:"not.is.null"}),u={};for(const v of p)v.address1&&(u[v.id]=Oi(v.address1));const y={};for(const v of d){const g=v.sales_date;if(!g)continue;const w=u[v.legacy_customer_code]||"住所未登録",P=Number(v.total_amount)||0;y[g]||(y[g]={date:g,entries:[],cityGroups:[],totalAmount:0,count:0}),y[g].entries.push({customerCode:v.legacy_customer_code||"",customerName:v.customer_name||"",city:w,amount:P}),y[g].totalAmount+=P,y[g].count++}for(const v of Object.values(y)){const g={};for(const w of v.entries)g[w.city]=(g[w.city]||0)+1;v.cityGroups=Object.entries(g).sort((w,P)=>P[1]-w[1]).map(([w,P])=>({city:w,count:P}))}return y}async function Fa(){return B("quotes",{select:"id,quote_no,quote_date,valid_until,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function ws(e){const t=await B("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await B("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function Bi(){const e=new Date().toISOString().slice(0,7)+"-01";return he("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}const N=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:Ba,CALENDAR_CATEGORY_LABELS:ja,CHURN_REASONS:Jt,DEPT_LABELS:Ot,INVOICE_TYPE_LABELS:pa,JIKOMI_STATUS_LABELS:es,MATERIAL_CATEGORIES:hs,PROSPECT_STAGE_COLORS:za,PROSPECT_STAGE_LABELS:Ut,ROLE_LABELS:Rt,SEASONAL_TEMPLATES:La,SLACK_EVENT_LABELS:jt,TAX_DEDUCTION_LABELS:ya,TAX_RATE_CATEGORIES:ls,addBrewingCustomCategory:cr,addBrewingStockEntry:or,addRiceVariety:tr,convertLeadToProspect:_i,deleteBrewingCustomCategory:pr,deleteBrewingStockEntry:ir,deleteCalendarEvent:Fr,deleteMailSender:jr,deleteMaterial:di,deletePrintLayout:Mr,deleteProspect:ri,deleteRicePurchaseCommitment:Zo,deleteRiceVariety:ar,deleteUserProfile:Zr,fetchAllBrewingStockEntries:sr,fetchAnalyticsByPeriod:$o,fetchAnnouncements:Hn,fetchAuditLogs:ti,fetchAvailablePeriods:xo,fetchAvailableProductionTypes:Bo,fetchBillList:rs,fetchBillingSummary:Na,fetchBrewingAlcoholSettings:zo,fetchBrewingCategoryOverrides:mr,fetchBrewingCustomCategories:lr,fetchBrewingForecastOverrides:Yo,fetchBrewingMonthlyTrend:qo,fetchBrewingPlanSummary:Do,fetchBrewingProductDetail:Io,fetchBrewingRiceParams:Jo,fetchBrewingSchedule:To,fetchBrewingSeasonalPattern:Ho,fetchBrewingStockEntries:nr,fetchBrewingYearlyShipments:Vo,fetchCalendarEvents:Br,fetchCallLogs:fi,fetchCategoryTypeLinks:Ro,fetchChurnAlerts:$r,fetchChurnNotes:ui,fetchCustomerAnalysis:Zn,fetchCustomerEfficiency:Pr,fetchCustomerEfficiencyByYear:ht,fetchCustomerLedger:qa,fetchCustomerPriceGroup:ha,fetchCustomerPricing:ua,fetchCustomerProductBreakdown:Ao,fetchDeliveryLocations:yi,fetchDeliveryNote:Ta,fetchDeliverySchedule:wr,fetchDemandAnalysis:Ii,fetchDemandForecasts:br,fetchEntityMonthlySales:Lo,fetchFaxInbox:Qr,fetchIntegrationSettings:us,fetchInvoices:bt,fetchJikomiList:ts,fetchKenteiList:ns,fetchLabelExclusions:yr,fetchLeadItems:wi,fetchLeadLists:bi,fetchMailSenders:Rr,fetchMapCustomers:pi,fetchMasterStats:Da,fetchMaterialList:ma,fetchMyProfile:Xr,fetchOrderHeaders:Bi,fetchPayableList:os,fetchPaymentStatus:Fn,fetchPeriodChartData:Po,fetchPipelineMeta:Vn,fetchPrintLayouts:Tr,fetchProcurementDecisions:Ko,fetchProductABC:Er,fetchProductCustomerBreakdown:Co,fetchProductDaily:kr,fetchProductMonthlyShipments:vr,fetchProductPower:Wn,fetchProductPrice:bs,fetchProductShipmentsFromTable:Sr,fetchProductionPlan:Ni,fetchProspectActivities:ii,fetchProspects:oi,fetchPurchaseList:ss,fetchQuoteList:Fa,fetchQuoteWithLines:ws,fetchRawMaterialStock:is,fetchRawRecords:Tt,fetchRawTableList:vs,fetchRicePurchaseCommitments:Xo,fetchRiceVarieties:er,fetchSafetyStockParams:Ti,fetchSalesAnalytics:Ia,fetchSalesReport:Yt,fetchSalesSummary:zn,fetchSeasonalProfiles:_r,fetchShipmentCalendar:ji,fetchShopifyOrders:Yr,fetchSlackLogs:ni,fetchSlackRules:ms,fetchStaffCustomerBreakdown:So,fetchStaffProductBreakdown:ko,fetchStaffTotalsByPeriod:_o,fetchStoreOrders:ds,fetchStoreSales:Oa,fetchSyncDashboard:Yn,fetchSystemSetting:Bn,fetchTankList:as,fetchTaxDeclaration:Ra,fetchTourInquiriesFromDb:Pi,fetchTypesInCategory:dr,fetchUserProfiles:Gr,fetchVisitPriorities:xr,fetchWorkflowOrdersFromDb:Si,generateTaxCSV:Lr,generateTaxXML:cs,linkTypeToCategory:Oo,ocrFaxImage:Hr,periodToDateRange:Un,prevYearFilter:Eo,reassignBrewingStockEntry:rr,recalculateTaxDeclaration:Dr,recordAudit:ei,resolveProductPrice:Ma,saveBrewingAlcoholSetting:Fo,saveBrewingForecastOverride:Uo,saveBrewingRiceParams:Qo,saveBrewingSchedule:No,saveCalendarEvent:zr,saveCallLog:fs,saveChurnNote:mi,saveDeliveryLocation:hi,saveEmailCampaign:It,saveFaxRecord:Kr,saveIntegrationSetting:$t,saveInvoice:Qn,saveLabelExclusions:hr,saveLeadItem:gs,saveLeadList:$i,saveMailSender:Or,saveMaterial:ci,savePrintLayout:Nr,saveProcurementDecision:Go,saveProductionPlan:Ri,saveProspect:ys,saveProspectActivity:li,saveRicePurchaseCommitment:Wo,saveSafetyStockParamsBulk:Mi,saveSlackRule:ai,saveStoreOrder:Ir,saveTaxDeclaration:qr,saveTourInquiry:Ei,saveUserProfile:Wr,saveWorkflowOrder:ki,searchPlaces:xi,sendEmailCampaign:ps,sendSlackNotification:si,setBrewingCategoryOverride:ur,submitFeatureRequest:Kn,syncGoogleCalendar:Jr,syncIvryCallLogs:gi,syncPhoneBookToIvry:vi,syncShopifyOrders:Vr,unlinkTypeFromCategory:jo,updateCustomer:Gn,updateProduct:Xn,upsertBrewingStock:Mo,upsertSystemSetting:Ze},Symbol.toStringTag,{value:"Module"}));function He(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const zi={open:"未締め",closed:"締め済"};function Fi(e,t){const n=e.customers.map(s=>`
      <tr>
        <td>
          <div class="table-title">${s.customerName}</div>
          <div class="table-sub mono">${s.customerCode}</div>
        </td>
        <td class="numeric">${s.closingDay}日</td>
        <td class="numeric">${He(s.salesAmount)}</td>
        <td class="numeric">${He(s.taxAmount)}</td>
        <td class="numeric">${He(s.prevBalance)}</td>
        <td class="numeric">${He(s.paymentAmount)}</td>
        <td class="numeric"><strong>${He(s.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${zi[s.status]}</span>
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
        <p class="kpi-value">${He(e.totalBilling)}</p>
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
  `}const Vi={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},Yi={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function tn(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function xt(e){const t=Yi[e],n=Vi[e].map(s=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${tn(s.title)}</p>
            <p class="category-card-description">${tn(s.description)}</p>
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
  `}function $s(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function ft(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ui(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${$s(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${ft(t.amount)}</td>
        </tr>
      `).join("")}function Ji(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${$s(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${ft(t.amount)}</td>
        </tr>
      `).join("")}function Qi(e,t){return`
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
            <dd>${ft(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${ft(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${ft(e.balanceAmount)}</dd>
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
            <tbody>${Ui(e)}</tbody>
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
            <tbody>${Ji(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function it(e,t,n){const s=e.findIndex(l=>l.column===t);if(s>=0){if(e[s].direction==="asc"){const d=[...e];return d[s]={column:t,direction:"desc"},d}return e.filter((d,p)=>p!==s)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function Hi(e,t){const n=e.findIndex(l=>l.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const s=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${s}${r}</span>`}function X(e,t,n,s=""){return`<th class="sortable ${s}" data-sort-col="${e}">${t} ${Hi(n,e)}</th>`}function an(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function at(e,t,n){return t.length===0?e:[...e].sort((s,r)=>{for(const{column:l,direction:d}of t){const p=n[l];if(!p)continue;const u=an(s[p]),y=an(r[p]);let v=0;if(typeof u=="number"&&typeof y=="number"?v=u-y:v=String(u).localeCompare(String(y),"ja"),v!==0)return d==="asc"?v:-v}return 0})}const Ki={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},nn={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},lt={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function Gi(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function Xi(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function Wi(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function xs(e,t){const n=Xi(t),s=Wi(t),[r,l]=t.split("-").map(Number),d=new Map;e.forEach(b=>{if(b.date.slice(0,7)===t){const $=b.date.slice(0,10);d.has($)||d.set($,[]),d.get($).push(b)}});const p=e.filter(b=>b.date.slice(0,7)===t),u=p.reduce((b,$)=>b+$.quantity,0),y=new Set(p.map(b=>b.date)).size,v=new Date().toISOString().slice(0,10),g=["日","月","火","水","木","金","土"].map(b=>`<th class="dcal-header">${b}</th>`).join("");let w="",P=1;for(let b=0;b<6&&!(P>n&&b>0);b++){w+="<tr>";for(let $=0;$<7;$++)if(b===0&&$<s||P>n)w+='<td class="dcal-cell dcal-empty"></td>';else{const _=`${r}-${String(l).padStart(2,"0")}-${String(P).padStart(2,"0")}`,S=d.get(_)||[],L=_===v,k=S.reduce((A,q)=>A+q.quantity,0);w+=`
          <td class="dcal-cell ${L?"dcal-today":""}">
            <div class="dcal-day">${P}</div>
            ${S.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${S[0].status}">${S.length}件 ${k}本</div>
              </div>
            `:""}
          </td>`,P++}w+="</tr>"}const[E,o]=l===1?[r-1,12]:[r,l-1],[i,c]=l===12?[r+1,1]:[r,l+1],m=`${E}-${String(o).padStart(2,"0")}`,h=`${i}-${String(c).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${l}月: ${y}日稼働 / ${p.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${m}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${r}年${l}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${h}">▶</button>
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
  `}function Zi(e,t){const n=t==="all"?e:e.filter(p=>p.segment===t),s={all:e.length};e.forEach(p=>{s[p.segment]=(s[p.segment]??0)+1});const l=["all",...[...new Set(e.map(p=>p.segment))]].map(p=>`
      <button class="button ${t===p?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${p}">
        ${p==="all"?"全て":nn[p]??p} (${s[p]??0})
      </button>
    `).join(""),d=n.map(p=>`
      <tr>
        <td class="mono">${p.code}</td>
        <td>${p.name}</td>
        <td><span class="segment-badge" style="background:${lt[p.segment]??"#718096"};">${nn[p.segment]??p.segment}</span></td>
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
            <li><span class="segment-badge" style="background:${lt.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${lt["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${lt["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${lt["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
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
  `}function el(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${xs(e.deliveries,e.calendarMonth)}
    ${Zi(e.forecasts,e.selectedSegment)}
  `}function tl(e,t){return xs(e,t)}const _t={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function sn(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function Kt(e,t,n){if(t==="all")return e;const s=new Date,r=s.toISOString().slice(0,10),l=new Date(s);switch(t){case"today":return e.filter(d=>d.date.slice(0,10)===r);case"month":return e.filter(d=>d.date.slice(0,7)===r.slice(0,7));case"future":{const d=new Date(s.getFullYear(),s.getMonth(),1).toISOString().slice(0,10);return e.filter(p=>p.date.slice(0,10)>=d)}case"90days":return l.setDate(l.getDate()-90),e.filter(d=>d.date>=l.toISOString());case"year":return l.setFullYear(l.getFullYear()-1),e.filter(d=>d.date>=l.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(d=>{const p=d.date.slice(0,10);return p>=n.start&&p<=n.end})}}function _e(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Gt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function al(e){const s={top:20,right:20,bottom:30,left:50},r=760-s.left-s.right,l=260-s.top-s.bottom,d=Math.max(...e.map(v=>v.amount),1),p=r/e.length,u=e.map((v,g)=>{const w=v.amount/d*l,P=s.left+g*p+4,E=s.top+l-w,o=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(v.date));return`
        <g>
          <rect x="${P}" y="${E}" width="${Math.max(p-8,8)}" height="${w}" rx="4" fill="#0F5B8D" opacity="${.58+g/e.length*.34}" />
          ${g%5===0?`<text x="${P+6}" y="252" class="chart-axis">${o}</text>`:""}
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
  `}function nl(e,t,n,s,r="month",l,d=[]){const p={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=Kt(e.allDailySales,r,l),y=u.reduce((j,J)=>j+J.amount,0),v=u.reduce((j,J)=>j+J.bottles,0),g=u.reduce((j,J)=>j+J.volumeMl,0),w=u.length,P=v>0?Math.round(y/v):0,E=g>0?Math.round(y/(g/1e3)):0,o=new Date,i=o.toISOString().slice(0,10),c=i.slice(0,7),m=Kt(e.allDailySales,"month").filter(j=>j.date.slice(0,10)<=i),h=m.reduce((j,J)=>j+J.amount,0);m.reduce((j,J)=>j+J.bottles,0);const b=o.getDate();new Date(o.getFullYear(),o.getMonth()+1,0).getDate();const _=(s?.orderHeaders??[]).filter(j=>j.sales_date.slice(0,7)===c),S=_.reduce((j,J)=>j+Number(J.total_amount),0),L=_.length,k=Kt(e.allDailySales,"month"),A=k.reduce((j,J)=>j+J.bottles,0),q=S>0?S:k.reduce((j,J)=>j+J.amount,0),C=S>0?"orders":"extrapolation",R=(u.length>0?e.allDailySales.filter(j=>{const J=u[0]?.date??"",W=u[u.length-1]?.date??"",oe=sn(J,-1),ee=sn(W,-1);return j.date>=oe&&j.date<=ee}):[]).reduce((j,J)=>j+J.amount,0),z=R>0?(y-R)/R*100:0,O=z>0?"+":"",F=e.salesRecords.slice(0,10).map(j=>`
            <tr>
              <td class="mono">${j.documentNo}</td>
              <td>${Gt(j.date)}</td>
              <td>${j.customerName}</td>
              <td class="numeric">${_e(j.amount)}</td>
            </tr>
          `).join(""),V=["today","month","future","90days","year","all"].map(j=>`<button class="button ${j===r?"primary":"secondary"} small" type="button" data-period="${j}">${_t[j]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${p[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${Gt(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${V}</div>
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
        <p class="kpi-value">${_e(e.kpis.todaySales)}</p>
        <p class="kpi-sub">${e.kpis.todaySales>0?`${new Date().getMonth()+1}/${new Date().getDate()} 時点`:"本日データなし"}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月実績（本日まで）</p>
        <p class="kpi-value">${_e(h)}</p>
        <p class="kpi-sub">${b}日経過 / ${m.length}営業日 / 日平均 ${m.length>0?_e(Math.round(h/m.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${_e(q)}</p>
        <p class="kpi-sub">${C==="orders"?`受注確定 ${L}件`:`出荷見込 ${A.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${z>=0?"#2f855a":"#c53d3d"}">${R>0?`${O}${z.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${R>0?_e(R):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${_e(e.kpis.unpaidAmount)}</p>
      </article>
    </section>

    ${r!=="month"?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">${_t[r]}売上</p>
        <p class="kpi-value">${_e(y)}</p>
        <p class="kpi-sub">${w}日間${w>0?` / 日平均 ${_e(Math.round(y/w))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${v.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${_e(P)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(g/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${_e(E)}</p>
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
            <p class="panel-caption">${_t[r]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${al(u.length>0?u:e.dailySales)}
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
              <dd>${Gt(t.lastSyncAt)}</dd>
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
          <tbody>${F}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${_t[r]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${X("date","日付",d)}
              ${X("amount","売上",d,"numeric")}
              ${X("bottles","本数",d,"numeric")}
              ${X("volumeMl","液体量(L)",d,"numeric")}
              ${X("pricePerBottle","本単価",d,"numeric")}
              ${X("pricePerLiter","L単価",d,"numeric")}
            </tr>
          </thead>
          <tbody>${at(d.length>0?u:u.slice().reverse(),d,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(j=>`
            <tr>
              <td class="mono">${j.date.slice(0,10)}</td>
              <td class="numeric">${_e(j.amount)}</td>
              <td class="numeric">${j.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(j.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${_e(j.pricePerBottle)}</td>
              <td class="numeric">${_e(j.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${s?sl(s):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function sl(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(p=>p.startsAt.slice(0,10)>=t).slice(0,5),s=e.tourInquiries.filter(p=>p.status==="new").length,r=e.churnSummary,l=r?r.atRiskCount+r.dormantCount+r.decliningCount:null,d=r?`<article class="panel kpi-card ${r.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
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

    ${e.deliveries&&e.deliveries.length>0?tl(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?ol(e.orderHeaders):""}
  `}function ol(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),s=new Date().toISOString().slice(0,10),r=s.slice(0,7),l=new Map;for(const g of e){const w=g.sales_date.slice(0,7),P=l.get(w)??{count:0,total:0};l.set(w,{count:P.count+1,total:P.total+Number(g.total_amount)})}const d=[...l.keys()].sort(),p=e.reduce((g,w)=>g+Number(w.total_amount),0),u=d.map(g=>{const{count:w,total:P}=l.get(g);return`<tr>
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
  `}function rl(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function Ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function il(e,t){const n=e.lines.length?e.lines.map((r,l)=>`
          <tr>
            <td class="numeric">${l+1}</td>
            <td class="mono">${r.productCode}</td>
            <td>${r.productName}</td>
            <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
            <td>${r.unit}</td>
            <td class="numeric">${Ke(r.unitPrice)}</td>
            <td class="numeric">${Ke(r.amount)}</td>
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
            <tr><th>納品日</th><td>${rl(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${Ke(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${Ke(s)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${Ke(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${Ke(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function Ae(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ll(e){return Ae(e).replaceAll(`
`,"<br />")}function cl(e){const n=[...Object.values(La),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${Ae(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),s=e.previewRecipients.length?e.previewRecipients.map(r=>`
            <li>
              <span>${Ae(r.name)}</span>
              <span class="table-sub">${Ae(r.email)} / ${Ae(r.area)}</span>
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
          <input id="email-subject" type="text" value="${Ae(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${Ae(e.body)}</textarea>
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
            ${e.senders.map(r=>`<option value="${r.id}" ${r.id===e.senderId?"selected":""}>${Ae(r.name)} &lt;${Ae(r.email)}&gt;${r.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${Ae(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?ll(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${Ae(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function Ee(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function St(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function dl(e,t){const n=[St("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Ee(r.name)}</strong>
            <span class="table-sub mono">${Ee(r.code)}</span>
          </button>
        `)),St("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Ee(r.name)}</strong>
            <span class="table-sub mono">${Ee(r.code)}</span>
          </button>
        `)),St("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${Ee(r.documentNo)}</strong>
            <span class="table-sub">${Ee(r.customerName)} / ${Ee(r.date)}</span>
          </button>
        `)),St("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${Ee(r.path)}"
          >
            <strong>${Ee(r.title)}</strong>
            <span class="table-sub mono">${Ee(r.path)}</span>
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
            value="${Ee(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||s}
          </div>
        </div>
      </div>
    </div>
  `}function ct(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function _s(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${ct(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${ct(e.title)}">
        <div class="modal-header">
          <h2>${ct(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${ct(e.placeholder)}"
            value="${ct(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function kt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function on(e){return e.trim().toLowerCase()}function pl(e,t){const n=on(t),s=e.filter(l=>n?[l.code,l.name,l.name].map(on).some(d=>d.includes(n)):!0).slice(0,50),r=s.length?`
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
                      data-code="${kt(l.code)}"
                      data-name="${kt(l.name)}"
                    >
                      <td class="mono">${kt(l.code)}</td>
                      <td>${kt(l.name)}</td>
                      <td>${l.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return _s({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:r,emptyMessage:"該当する得意先が見つかりません。"})}function ul(e){return e.toISOString().slice(0,10)}function Je(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Be(e,t){return e[t]?`<div class="field-error">${Je(e[t])}</div>`:""}function Ge(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function ml(e,t,n,s){const r=Object.keys(pa).map(u=>`<option value="${u}" ${e.invoiceType===u?"selected":""}>${pa[u]}</option>`).join(""),l=e.lines.map((u,y)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${Ge(s,`lines.${y}.productCode`,"input-cell")}" type="text" data-line="${y}" data-field="productCode" value="${Je(u.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${y}" aria-label="商品検索">🔍</button>
          </div>
          ${Be(s,`lines.${y}.productCode`)}
        </td>
        <td>
          <input class="${Ge(s,`lines.${y}.productName`,"input-cell")}" type="text" data-line="${y}" data-field="productName" value="${Je(u.productName)}" placeholder="商品名" />
          ${Be(s,`lines.${y}.productName`)}
        </td>
        <td>
          <input class="${Ge(s,`lines.${y}.quantity`,"input-cell numeric")}" type="number" data-line="${y}" data-field="quantity" value="${u.quantity}" min="0" />
          ${Be(s,`lines.${y}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${y}" data-field="unit" value="${u.unit}" placeholder="本" /></td>
        <td>
          <input class="${Ge(s,`lines.${y}.unitPrice`,"input-cell numeric")}" type="number" data-line="${y}" data-field="unitPrice" value="${u.unitPrice}" min="0" />
          ${Be(s,`lines.${y}.unitPrice`)}
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
          <input class="${Ge(s,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||ul(new Date)}" />
          ${Be(s,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${Ge(s,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${Je(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${Be(s,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${Je(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${Je(e.staffCode)}" />
        </label>
      </div>
      ${Be(s,"lines")}
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
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${Je(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function yl(e){return"¥"+e.toLocaleString("ja-JP")}function hl(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const fl={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},gl={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},vl={sake:"酒販用",standard:"通常"};function bl(e,t){return`
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
        <td>${hl(s.quote_date)}</td>
        <td>${s.customer_name||"（未選択）"}</td>
        <td>${s.subject||""}</td>
        <td class="numeric">${yl(s.total_amount)}</td>
        <td><span class="badge ${gl[s.status]??"badge-gray"}">${fl[s.status]??s.status}</span></td>
        <td>${vl[s.template_type]??s.template_type}</td>
        <td>
          <button class="button secondary small" data-open-quote="${s.id}">開く</button>
          <button class="button secondary small danger" data-delete-quote="${s.id}" data-quote-no="${s.quote_no}">削除</button>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}const Ss="kanei-quote-settings",ks=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Nt={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function fa(){try{const e=localStorage.getItem(Ss);if(e)return{...Nt,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Nt,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Nt}}function Qe(e){localStorage.setItem(Ss,JSON.stringify(e))}function qe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function xe(e,t,n,s="text",r=""){return`<div class="form-row"><label>${t}</label><input type="${s}" id="${e}" value="${qe(n)}" placeholder="${qe(r)}" /></div>`}function wl(e,t,n,s){const r=s.map(l=>`<option value="${qe(l)}" ${n===l?"selected":""}>${qe(l)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${r}</select></div>`}function $l(e){return`
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
        ${xe("qs-company-name","会社名",e.companyName)}
        ${xe("qs-company-postal","郵便番号",e.companyPostal,"text","257-0014")}
        ${xe("qs-company-addr1","住所1",e.companyAddress1)}
        ${xe("qs-company-addr2","住所2",e.companyAddress2,"text","建物名等")}
        ${xe("qs-company-tel","電話番号",e.companyTel)}
        ${xe("qs-company-fax","FAX番号",e.companyFax)}
        ${xe("qs-company-email","メール",e.companyEmail,"email")}
        ${xe("qs-company-regno","適格請求書番号",e.companyRegistrationNo,"text","T1234567890123")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>振込口座</h2></div>
      <div class="form-grid-2">
        ${xe("qs-bank-name","銀行名",e.bankName,"text","横浜銀行")}
        ${xe("qs-bank-branch","支店名",e.bankBranch,"text","秦野支店")}
        ${wl("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
        ${xe("qs-bank-no","口座番号",e.bankAccountNo,"text","1234567")}
        ${xe("qs-bank-holder","口座名義（カナ）",e.bankAccountHolder,"text","カ）カナイシュゾウテン")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>見積書デフォルト設定</h2></div>
      <div class="form-grid-2">
        ${xe("qs-payment-terms","支払条件",e.defaultPaymentTerms,"text","月末締め翌月末払い")}
        ${xe("qs-header-note","書類上部メモ",e.defaultHeaderNote,"text","下記のとおりお見積り申し上げます。")}
        ${xe("qs-footer-note","書類下部メモ",e.defaultFooterNote)}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>カラーテーマ</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;">見積書のアクセントカラーを設定します。プリセットから選ぶか、カスタムカラーを指定してください。</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px;">
        ${ks.map(t=>`
          <button
            type="button"
            data-action="set-accent-color"
            data-color="${qe(t.value)}"
            title="${qe(t.label)}"
            style="width:36px;height:36px;border-radius:6px;border:3px solid ${e.accentColor===t.value?"#333":"transparent"};background:${qe(t.value)};cursor:pointer;transition:border-color 0.15s;"
          ></button>
        `).join("")}
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
          カスタム
          <input type="color" id="qs-accent-color" value="${qe(e.accentColor||"#0968e5")}" style="width:36px;height:36px;border:none;border-radius:4px;cursor:pointer;padding:2px;" />
        </label>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:12px;color:var(--text-secondary);">現在の色:</span>
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:${qe(e.accentColor||"#0968e5")};border:1px solid rgba(0,0,0,0.15);"></span>
          <code style="font-size:12px;">${qe(e.accentColor||"#0968e5")}</code>
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
  `}function xl(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function Bt(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:xl(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}Bt();function Q(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ke(e){return"¥"+e.toLocaleString("ja-JP")}function rn(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Ps(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function Es(e,t,n){return"#"+[e,t,n].map(s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0")).join("")}function zt(e,t){const[n,s,r]=Ps(e);return Es(n+(255-n)*t,s+(255-s)*t,r+(255-r)*t)}function As(e,t){const[n,s,r]=Ps(e);return Es(n*(1-t),s*(1-t),r*(1-t))}function _l(e){const t=As(e,.15),n=zt(e,.88),s=zt(e,.96);return`
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
`}function Sl(e){const t=As(e,.15),n=zt(e,.88),s=zt(e,.96);return`
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
`}function Cs(e,t){const n=e.lines.reduce((E,o)=>E+o.amount,0),s=Math.round(n*e.taxRate/100),r=n+s,l=e.templateType==="sake",d=l?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",p=l?9:6,u=e.lines.map((E,o)=>{const i=l?`<td style="font-size:9px;">${Q(E.janCode)}</td><td style="text-align:center;">${E.caseQty??""}</td><td style="text-align:right;">${E.retailPrice!=null?ke(E.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${o+1}</td>
      <td class="mono" style="font-size:9px;">${Q(E.productCode)}</td>
      <td>${Q(E.productName)}</td>
      ${i}
      <td style="text-align:right;">${E.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${Q(E.unit)}</td>
      <td style="text-align:right;">${ke(E.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${p}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,y=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),v=y?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${Q(y)}</p>
    </div>
  `:"",g=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",w=[];e.validUntil&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${rn(e.validUntil)}</div></div>`),e.paymentTerms&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${Q(e.paymentTerms)}</div></div>`),e.deliveryDate&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${Q(e.deliveryDate)}</div></div>`),e.deliveryPlace&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${Q(e.deliveryPlace)}</div></div>`);const P=w.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min(w.length,4)},1fr);">${w.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <table class="q-meta-table">
      ${e.quoteNo?`<tr><th>見積番号</th><td>${Q(e.quoteNo)}</td></tr>`:""}
      <tr><th>見積日</th><td>${rn(e.quoteDate)}</td></tr>
    </table>
  </div>

  <!-- 取引先（左）・自社情報（右） -->
  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${Q(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${Q(e.customerAddress)}</p>`:""}
    </div>
    <div class="q-seller-col">
      <!-- 自社情報: 社名の右に印鑑 -->
      <div class="q-seller-name-row">
        <span class="q-seller-name">${Q(t.companyName)}</span>
        ${g}
      </div>
      ${t.companyPostal?`<p class="q-seller-sub">〒${Q(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${Q(t.companyAddress1)}${t.companyAddress2?" "+Q(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${Q(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${Q(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${Q(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  ${P}

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${ke(r)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${Q(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${Q(t.defaultHeaderNote)}</p>`:""}

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
      <tr><td colspan="${p-1}" style="text-align:right;">小計</td><td style="text-align:right;">${ke(n)}</td></tr>
      <tr><td colspan="${p-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${ke(s)}</td></tr>
      <tr class="q-total-row"><td colspan="${p-1}" style="text-align:right;">合計</td><td style="text-align:right;">${ke(r)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${Q(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${Q(t.defaultFooterNote)}</p>`:""}

  ${v}
</div>`}function Ls(e,t,n,s,r,l,d){const p=e.lines.reduce((E,o)=>E+o.amount,0),u=Math.round(p*e.taxRate/100),y=p+u,v=e.templateType==="sake",g=s.length>=1?t.filter(E=>E.name.includes(s)||E.code.includes(s)).slice(0,8):[],w=r.length>=1?n.filter(E=>E.name.includes(r)||E.code.includes(r)).slice(0,8):[];if(e.previewMode){const E=d.accentColor||"#0968e5";return`
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
        ${Sl(E)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${Cs(e,d)}
      </div>
    `}const P=e.lines.map((E,o)=>{const i=v?`
      <td><input type="text" class="jan-input" data-line-idx="${o}" value="${Q(E.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${o}" value="${E.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${o}" value="${E.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${Q(E.productCode)}</td>
      <td>${Q(E.productName)}</td>
      ${i}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${o}" value="${E.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${Q(E.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${o}" value="${E.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${ke(E.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${o}">×</button></td>
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
          ${ks.map(E=>`
            <button type="button" data-action="set-accent-color" data-color="${Q(E.value)}" title="${Q(E.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${d.accentColor===E.value?"#333":"transparent"};background:${Q(E.value)};cursor:pointer;"></button>
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
          <input type="text" id="q-no" value="${Q(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${Q(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${Q(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${Q(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${Q(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">既存得意先</p>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${Q(s)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${g.length>0?`<div class="search-results">${g.map(E=>`
        <button class="search-item" type="button" data-select-customer="${E.code}" data-cust-name="${Q(E.name)}" data-cust-addr="${Q(E.address1||"")}">
          <span class="mono">${E.code}</span> ${Q(E.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName&&!e.isProspect?`<div class="selected-item"><span class="mono">${Q(e.customerCode)}</span> <strong>${Q(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${Q(e.customerAddress)}</span>`:""}</div>`:""}

      <div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--border);">
        <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">見込み顧客から選択</p>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="q-prospect-search" placeholder="見込み顧客名で検索…" style="flex:1;" />
          <button type="button" class="button secondary small" data-action="new-prospect-from-quote">＋ 新規登録</button>
        </div>
        <div id="q-prospect-results"></div>
        ${e.customerName&&e.isProspect?`<div class="selected-item" style="border-left:3px solid #48bb78;"><span style="font-size:11px;background:#48bb78;color:white;border-radius:3px;padding:1px 5px;margin-right:6px;">見込</span> <strong>${Q(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${Q(e.customerAddress)}</span>`:""}</div>`:""}
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
        <input type="text" id="q-prod-search" value="${Q(r)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${w.length>0?`<div class="search-results">${w.map(E=>{const o=l?Ma(E,l):{price:E.salePrice||0,label:"卸価格"},i=E.listPrice||0,c=o.label!=="標準価格"&&o.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${E.code}" data-prod-name="${Q(E.name)}" data-prod-price="${o.price}" data-prod-retail="${i}" data-prod-jan="${Q(E.janCode??"")}" data-prod-unit="${Q(E.unit??"本")}" data-prod-case="${E.caseQty??""}">
          <span class="mono">${E.code}</span> ${Q(E.name)}
          <span class="numeric" ${c?'style="color:#2f855a;font-weight:700;"':""}>納入 ${o.price?ke(o.price):"未設定"} <small>(${o.label})</small>${i?`　定価 ${ke(i)}`:""}</span>
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
          <textarea id="q-remarks" rows="3">${Q(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${ke(p)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${ke(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${ke(y)}</span></div>
        </div>
      </div>
    </section>
  `}async function kl(e,t){const n=t.accentColor||"#0968e5",s=document.createElement("div");s.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",s.innerHTML=`<style>${_l(n)}</style>${Cs(e,t)}`,document.body.appendChild(s);try{const[{default:r},{jsPDF:l}]=await Promise.all([I(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),I(()=>import("./jspdf.es.min-Cajb-WQT.js").then(E=>E.j),[])]),d=await r(s,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),p=210,u=297,y=d.width/p,v=u*y,g=new l({orientation:"portrait",unit:"mm",format:"a4"});let w=0,P=0;for(;w<d.height;){P>0&&g.addPage();const E=Math.min(v,d.height-w),o=document.createElement("canvas");o.width=d.width,o.height=Math.ceil(E);const i=o.getContext("2d");i.fillStyle="#ffffff",i.fillRect(0,0,o.width,o.height),i.drawImage(d,0,w,d.width,E,0,0,d.width,E);const c=o.toDataURL("image/jpeg",.95),m=E/y;g.addImage(c,"JPEG",0,0,p,m),w+=v,P++}g.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(s)}}function Pt(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function Ds(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function qs(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function Is(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function Pl(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function El(e,t,n,s,r){const l=new Map,d=new Map;for(const v of e){if(v.date>=t&&v.date<=n){const g=l.get(v.productCode);g?(g.amt+=v.amount,g.qty+=v.qty):l.set(v.productCode,{name:v.productName,vol:v.volumeMl,amt:v.amount,qty:v.qty})}v.date>=s&&v.date<=r&&d.set(v.productCode,(d.get(v.productCode)??0)+v.amount)}const p=[...l.entries()].map(([v,g])=>({code:v,...g})).sort((v,g)=>g.amt-v.amt),u=p.reduce((v,g)=>v+g.amt,0);let y=0;return p.map(v=>{y+=v.amt;const g=u>0?Math.round(v.amt*1e4/u)/100:0,w=y<=u*.7?"A":y<=u*.9?"B":"C",P=d.get(v.code)??0,E=P>0?Math.round((v.amt-P)/P*1e3)/10:null;return{code:v.code,name:v.name,volumeMl:v.vol,amount:v.amt,qty:v.qty,sharePct:g,rank:w,prevAmount:P,growthRate:E}})}function Al(e,t,n){const s=new Date,r=s.toISOString().slice(0,10);let l=r,d=r,p="";switch(e){case"week":{const v=new Date(s);v.setDate(v.getDate()-7),l=v.toISOString().slice(0,10),d=r,p="直近7日間";break}case"month":{l=r.slice(0,7)+"-01",d=r,p="当月";break}case"90days":{const v=new Date(s);v.setDate(v.getDate()-90),l=v.toISOString().slice(0,10),d=r,p="直近90日間";break}case"year":{const v=new Date(s);v.setFullYear(v.getFullYear()-1),l=v.toISOString().slice(0,10),d=r,p="直近1年間";break}case"custom":{l=t||r,d=n||r,p=`${l} 〜 ${d}`;break}}const u=new Date(l);u.setFullYear(u.getFullYear()-1);const y=new Date(d);return y.setFullYear(y.getFullYear()-1),{start:l,end:d,prevStart:u.toISOString().slice(0,10),prevEnd:y.toISOString().slice(0,10),label:p}}function Cl(e,t="all",n=[],s="year",r,l,d=[]){const p=Al(s,r,l),u=n.length>0?El(n,p.start,p.end,p.prevStart,p.prevEnd):e.map(m=>({code:m.code,name:m.name,volumeMl:m.volumeMl,amount:m.yearAmount,qty:m.yearQty,sharePct:m.sharePct,rank:m.rank,prevAmount:m.prevAmount,growthRate:m.growthRate})),y=u.filter(m=>m.rank==="A").length,v=u.filter(m=>m.rank==="B").length,g=u.filter(m=>m.rank==="C").length,w=u.filter(m=>m.growthRate!=null&&m.growthRate>10),P=u.filter(m=>m.growthRate!=null&&m.growthRate<-10);let E=u,o="全商品";switch(t){case"A":E=u.filter(m=>m.rank==="A"),o="Aランク";break;case"B":E=u.filter(m=>m.rank==="B"),o="Bランク";break;case"C":E=u.filter(m=>m.rank==="C"),o="Cランク";break;case"growing":E=w,o="成長商品(+10%以上)";break;case"declining":E=P,o="衰退商品(-10%以下)";break}const i=(m,h,b)=>`<button class="button ${t===m?"primary":"secondary"} small" data-product-filter="${m}">${h} (${b})</button>`,c=(m,h)=>`<button class="button ${s===m?"primary":"secondary"} small" data-product-period="${m}">${h}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${c("week","週次")}
        ${c("month","月次")}
        ${c("90days","90日")}
        ${c("year","年間")}
        ${c("custom","指定期間")}
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
        <h2>${o} (${E.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${i("all","全て",u.length)}
        ${i("A","A",y)}
        ${i("B","B",v)}
        ${i("C","C",g)}
        ${i("growing","成長",w.length)}
        ${i("declining","衰退",P.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${X("rank","ABC",d)}
              ${X("name","商品名",d)}
              ${X("amount","売上",d,"numeric")}
              ${X("sharePct","構成比",d,"numeric")}
              ${X("qty","本数",d,"numeric")}
              ${X("growthRate","前年同期比",d,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${at(E,d,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(m=>`
              <tr>
                <td>${qs(m.rank)}</td>
                <td>${m.name?m.name.slice(0,25):m.code}${m.volumeMl?` <small>${m.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${Ds(m.amount)}</td>
                <td class="numeric">${m.sharePct}%</td>
                <td class="numeric">${m.qty.toLocaleString()}</td>
                <td class="numeric">${Is(m.growthRate)}</td>
              </tr>
            `).join("")}
            ${E.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ll(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,s="billing"){const r=e.filter(w=>w.currentRank==="A").length,l=e.filter(w=>w.prevRank&&w.currentRank<w.prevRank).length,d=e.filter(w=>w.prevRank&&w.currentRank>w.prevRank).length,p=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,u=2011,y=[];for(let w=p;w>=u&&y.length<6;w--)y.push(w);const v=`
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
              ${X("currentRank","ABC",t)}
              ${X("name","得意先名",t)}
              ${X("yearAmount","年間売上",t,"numeric")}
              ${X("sharePct","構成比",t,"numeric")}
              ${X("orderDays","受注日数",t,"numeric")}
              ${X("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${at(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(w=>`
              <tr>
                <td>${qs(w.currentRank)}</td>
                <td>${w.name||w.code}</td>
                <td class="numeric">${Ds(w.yearAmount)}</td>
                <td class="numeric">${w.sharePct}%</td>
                <td class="numeric">${w.orderDays}日</td>
                <td class="numeric">${Is(w.growthRate)}</td>
                <td>${Pl(w.currentRank,w.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Dl(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function ql(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Il(e,t){const n=e.length?e.map(s=>`
            <tr>
              <td class="mono">${s.documentNo}</td>
              <td>${Dl(s.date)}</td>
              <td>
                <div class="table-title">${s.customerName}</div>
                <div class="table-sub mono">${s.customerCode}</div>
              </td>
              <td class="numeric">${s.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${ql(s.amount)}</td>
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
  `}function Tl(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Nl(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function Ts(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function Ns(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function ln(e){const t=Ts(Ns(e),6);return t.setHours(23,59,59,999),t}function cn(e){return new Date(`${e}T00:00:00`)}function dn(e){return`${e.getMonth()+1}/${e.getDate()}`}function Ml(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Rl(){const e=new Date,t=Ns(Nl(Tl(e),-3)),n=ln(new Date(e.getFullYear(),e.getMonth()+4,0)),s=[];let r=new Date(t);for(;r<=n;){const l=ln(r);s.push({start:new Date(r),end:l,label:`${dn(r)} - ${dn(l)}`}),r=Ts(r,7)}return s}function Ol(e){const t=Rl(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,s=t.map(l=>`
        <div class="gantt-week">
          <span>${l.label}</span>
        </div>
      `).join(""),r=e.length?e.map(l=>{const d=cn(l.startDate),p=cn(l.expectedDoneDate),u=Math.max(0,t.findIndex(g=>g.end>=d)),y=Math.max(u,t.reduce((g,w,P)=>w.start<=p?P:g,u)),v=[`仕込番号: ${l.jikomiNo}`,`銘柄: ${l.productName}`,`期間: ${l.startDate} - ${l.expectedDoneDate}`,`タンク: ${l.tankNo}`,`備考: ${l.note||"なし"}`].join(`
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
                  title="${Ml(v)}"
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
  `}function pn(e,t){const n={planned:"neutral",active:"warning",done:"success"},s=e.map(p=>`
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
          <span class="status-pill ${n[p.status]}">${es[p.status]}</span>
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
  `}function jl(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},s=e.map(u=>`
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
  `}function Bl(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function zl(e,t){return`
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
        ${e?`<p class="field-error">${Bl(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function Fl(e){return`
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
  `}function Vl(e){return`
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
  `}const Va={query:"",businessType:"",tradeType:"",areaCode:"",activeOnly:"",page:1},gt=50;function Yl(e,t){let n=e;if(t.query){const p=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(p)||u.name.toLowerCase().includes(p)||u.kanaName&&u.kanaName.toLowerCase().includes(p)||u.address1&&u.address1.toLowerCase().includes(p)||u.phone&&u.phone.toLowerCase().includes(p))}t.businessType&&(n=n.filter(p=>p.businessType===t.businessType)),t.tradeType&&(n=n.filter(p=>p.tradeType===t.tradeType)),t.areaCode&&(n=n.filter(p=>p.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(p=>p.isActive):t.activeOnly==="inactive"&&(n=n.filter(p=>!p.isActive));const s=Math.max(1,Math.ceil(n.length/gt)),l=(Math.min(t.page,s)-1)*gt,d=n.slice(l,l+gt);return{filtered:n,paged:d,totalPages:s}}function un(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const s=(t-1)*gt+1,r=Math.min(t*gt,e),l=[];for(let d=1;d<=n;d++)d===1||d===n||d>=t-2&&d<=t+2?l.push(`<button class="button ${d===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${d}" style="min-width:36px;padding:4px 8px;">${d}</button>`):(d===t-3||d===t+3)&&l.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${s}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${l.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function Ul(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),s=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
          ${Object.entries(Ql).map(([r,l])=>`<option value="${r}" ${t.tradeType===r?"selected":""}>${l}</option>`).join("")}
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
  `}function ga(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Jl(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}const Ql={B2B:"B2B（卸）",B2B2C:"B2B2C（生産者）",B2C:"B2C（小売）"};function Hl(e){return e?`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${{B2B:"#3b82f6",B2B2C:"#8b5cf6",B2C:"#10b981"}[e]??"#999"};">${e}</span>`:"―"}function Kl(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${Hl(t.tradeType)}</td>
          <td>${Jl(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${ga(t.address1||"",16)}</td>
          <td>${ga(t.address2||"",12)}</td>
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
      `).join("")}function Et(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function Gl(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${ga(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${Et(t.purchasePrice)}</td>
          <td class="numeric">${Et(t.salePrice)}</td>
          <td class="numeric">${Et(t.listPrice)}</td>
          <td class="numeric">${Et(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function Xl(e,t,n=Va,s=[]){const{filtered:r,paged:l,totalPages:d}=Yl(e.customers,n);return`
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
        ${Ul(e.customers,n)}
        ${un(r.length,n.page,d)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${X("code","コード",s)}
                ${X("name","得意先名",s)}
                ${X("kanaName","カナ",s)}
                <th>略称</th>
                ${X("businessType","業態",s)}
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
                ${X("areaName","地区",s)}
                ${X("closingDay","締日",s,"numeric")}
                ${X("paymentDay","支払日",s,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Kl(at(l,s,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${un(r.length,n.page,d)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${X("code","コード",s)}
                ${X("name","商品名",s)}
                <th>カナ</th>
                ${X("category","分類",s)}
                <th>酒税区分</th>
                ${X("alcoholDegree","度数",s,"numeric")}
                ${X("volumeMl","容量ml",s,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${X("purchasePrice","生産者価格",s,"numeric")}
                ${X("salePrice","卸価格",s,"numeric")}
                ${X("listPrice","定価(小売)",s,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Gl(at(e.products,s,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function Xt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Wl(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${hs.map(s=>`<option ${n?.materialType===s?"selected":""}>${s}</option>`).join("")}
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
  `}function Zl(e){const t=e.map(r=>{const d=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${d?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${d?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${Xt(r.unitCost)}</td>
          <td class="numeric">${Xt(r.currentStock*r.unitCost)}</td>
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
        <p class="kpi-value">${Xt(s)}</p>
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
  `}function ec(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function Wt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const tc={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function ac(e){return`
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
          <td class="numeric">${Wt(n.billedAmount)}</td>
          <td class="numeric">${Wt(n.paymentAmount)}</td>
          <td class="numeric">${Wt(n.balanceAmount)}</td>
          <td>${ec(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${tc[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function Xe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function mn(e){return e.trim().toLowerCase()}function nc(e,t){const n=mn(t),s=e.filter(l=>n?[l.code,l.name,l.janCode].map(mn).some(d=>d.includes(n)):!0),r=s.length?`
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
                      data-code="${Xe(l.code)}"
                      data-name="${Xe(l.name)}"
                    >
                      <td class="mono">${Xe(l.code)}</td>
                      <td>${Xe(l.name)}</td>
                      <td class="mono">${Xe(l.janCode)}</td>
                      <td>${Xe(l.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return _s({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:r,emptyMessage:"該当する商品が見つかりません。"})}function ze(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function sc(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},l={unpaid:"warning",partial:"neutral",paid:"success"},d=e.map(g=>`
      <tr>
        <td class="mono">${g.documentNo}</td>
        <td>${g.purchaseDate}</td>
        <td class="mono">${g.supplierCode}</td>
        <td>${g.supplierName}</td>
        <td>${g.itemName}</td>
        <td class="numeric">${g.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${ze(g.unitPrice)}</td>
        <td class="numeric"><strong>${ze(g.amount)}</strong></td>
        <td>
          <span class="status-pill ${s[g.status]}">${n[g.status]}</span>
        </td>
      </tr>
    `).join(""),p=t.map(g=>`
      <tr>
        <td class="mono">${g.supplierCode}</td>
        <td>${g.supplierName}</td>
        <td class="numeric">${ze(g.totalPurchase)}</td>
        <td class="numeric">${ze(g.paidAmount)}</td>
        <td class="numeric"><strong>${ze(g.balance)}</strong></td>
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
        <p class="kpi-value">${ze(u)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${ze(y)}</p>
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
  `}function dt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function oc(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},r=e.map(v=>`
      <tr>
        <td class="mono">${v.billNo}</td>
        <td>${v.supplierName}</td>
        <td class="numeric">${dt(v.amount)}</td>
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
          <td class="numeric">${dt(v.unitCost)}</td>
          <td class="numeric">${dt(v.currentStock*v.unitCost)}</td>
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
        <p class="kpi-value">${dt(p)}</p>
        <p class="kpi-sub">${d.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${dt(u)}</p>
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
  `}function va(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function $e(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ba(e){return`
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
  `}function rc(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function At(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${$e(e)}</code>
      ${rc(e)}
    </div>
  `}function We(e){return`
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
      ${e.code?ba(e.code):""}
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
  `}function Ct(e){return`
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
  `}function Lt(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function yn(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function ic(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?va(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Lt(e.lastOverallSync)}">${yn(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${Lt(e.lastOverallSync)==="success"?"1時間以内":Lt(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${t.lastSyncAt?va(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Lt(t.lastSyncAt)}">${yn(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function lc(e,t,n,s){const r={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${s?ic(s):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${va(e.lastSyncAt)}</p>
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
      ${Ct({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${At("git --version")}
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
      ${Ct({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${At("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${Ct({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${At("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${At("python get-pip.py")}
        `})}
      ${Ct({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${We({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${We({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${We({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${We({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${We({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${We({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${ba(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${ba(`{
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
  `}function yt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function cc(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function dc(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(g=>g.amount),1),s=28,r=6,l=140,d=100,p=760,u=p-l-d,y=t.length*(s+r)+16,v=t.map((g,w)=>{const P=g.amount/n*u,E=w*(s+r)+8,o=g.abcRank==="A"?"#2F855A":g.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${l-8}" y="${E+s/2+5}" class="chart-axis" text-anchor="end">${g.name.length>10?g.name.slice(0,10)+"…":g.name}</text>
          <rect x="${l}" y="${E}" width="${P}" height="${s}" rx="4" fill="${o}" opacity="0.85" />
          <text x="${l+P+8}" y="${E+s/2+5}" class="chart-axis">${(g.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${p} ${y}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${v}
    </svg>
  `}function pc(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(s=>`<th class="numeric">${s}</th>`).join(""),n=e.monthlyByCustomer.map(s=>{const r=s.values.reduce((d,p)=>d+p,0),l=s.values.map(d=>`<td class="numeric">${d>0?(d/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${s.label}</td>
          ${l}
          <td class="numeric"><strong>${yt(r)}</strong></td>
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
  `}function uc(e){e.ranking.reduce((u,y)=>u+y.amount,0);const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,s=e.ranking.filter(u=>u.abcRank==="C").length,r=e.ranking.filter(u=>u.abcRank==="A").reduce((u,y)=>u+y.amount,0),l=e.ranking.filter(u=>u.abcRank==="B").reduce((u,y)=>u+y.amount,0),d=e.ranking.filter(u=>u.abcRank==="C").reduce((u,y)=>u+y.amount,0),p=e.ranking.map(u=>`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric">${yt(u.amount)}</td>
          <td class="numeric">${u.ratio.toFixed(1)}%</td>
          <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${cc(u.abcRank)}">${u.abcRank}</span></td>
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
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${yt(r)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${yt(l)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${s}社 <span class="kpi-sub">${yt(d)}</span></div>
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
        ${dc(e.ranking)}
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
      ${pc(e)}
    </section>
  `}const mc={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},hn={amount:"売上額",quantity:"出荷本数",volume:"移出量"},wa=10;function Ya(e){const[t,n]=e.split("-").map(Number);return n>=wa?t:t-1}function yc(e){const t=wa-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(wa).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function hc(e,t,n){const s=d=>t==="quantity"?d.quantity:t==="volume"?d.volumeMl:d.amount,r=new Map;for(const d of e){const p=n==="fiscal"?`${Ya(d.month)}年度`:d.month.slice(0,4);r.set(p,(r.get(p)??0)+s(d))}return{curr:[...r.entries()].sort((d,p)=>d[0].localeCompare(p[0])).map(([d,p])=>({month:d,amount:p}))}}function fc(e){const t=new Set;for(const n of e)t.add(Ya(n.month));return[...t].sort((n,s)=>s-n).map(String)}function nt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function gc(e){return e.replace("-","/")}const fn={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function vc(e,t="#0F5B8D",n=[],s="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const r=n.length>0&&n.some(m=>m.amount>0),l=760,d=280,p={top:16,right:24,bottom:36,left:s==="amount"?64:56},u=l-p.left-p.right,y=d-p.top-p.bottom,v=[...e.map(m=>m.amount),...n.map(m=>m.amount)],g=Math.max(...v,1),w=u/e.length;function P(m){if(s==="quantity")return m>=1e4?`${(m/1e4).toFixed(1)}万本`:`${Math.round(m).toLocaleString()}本`;if(s==="volume"){const h=m/1e3;return h>=1e4?`${(h/1e3).toFixed(0)}kL`:`${Math.round(h).toLocaleString()} L`}return`${Math.round(m/1e4).toLocaleString("ja-JP")}万円`}function E(m){return s==="quantity"?`${m.toLocaleString()}本`:s==="volume"?Qt(m):nt(m)}const o=[0,.25,.5,.75,1].map(m=>{const h=p.top+y-y*m,b=P(g*m);return`<g>
        <line x1="${p.left}" y1="${h}" x2="${l-p.right}" y2="${h}" class="chart-grid" />
        <text x="4" y="${h+4}" class="chart-axis">${b}</text>
      </g>`}).join(""),i=e.map((m,h)=>{const b=r?Math.max((w-18)/2,10):Math.max(w-18,24),$=r?2:0,_=p.left+h*w+(w-(r?b*2+$:b))/2,S=m.amount/g*y,L=p.top+y-S,k=n[h]?.amount??0,A=k/g*y,q=p.top+y-A,C=r?`<rect x="${_}" y="${q}" width="${b}" height="${A}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${E(k)}</title></rect>`:"",T=r?_+b+$:_;return`<g>
      ${C}
      <rect x="${T}" y="${L}" width="${b}" height="${S}" rx="4" fill="${t}" opacity="${.6+h/e.length*.35}"><title>${E(m.amount)}</title></rect>
      <text x="${p.left+h*w+w/2}" y="${d-8}" class="chart-axis centered-axis">${gc(m.month)}</text>
    </g>`}).join(""),c=r?`
    <g transform="translate(${l-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${l} ${d}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${o}${i}${c}
    </svg>
  `}function Qt(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function bc(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(s=>`
    <tr>
      <td class="mono">${s.code}</td>
      <td>${s.name}</td>
      <td class="numeric">${nt(s.amount)}</td>
      <td class="numeric">${s.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Qt(s.volumeMl)}</td>
      <td class="numeric">${s.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${s.code}" data-drilldown-name="${s.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function wc(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${nt(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Qt(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function gn(e,t,n){const s=t?e.filter(l=>l.tag.includes(t)||l.name.includes(t)):e,r=s.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':s.map(l=>`
        <tr>
          <td class="mono">${l.code||"―"}</td>
          <td>${l.name||"未設定"}</td>
          <td class="mono">${l.tag||"―"}</td>
          <td class="numeric">${nt(l.amount)}</td>
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
  `}function Ms(e,t,n="all",s="",r=[],l=[],d="",p="",u=null,y="all",v="",g=[],w=[],P=[],E=null,o=[],i=[],c="amount",m="calendar"){const h=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",b=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,_=n!=="all"&&r.length>0&&t!=="staff"?r:b,S=at(_,P,mc),L={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},k=hn[c],A=Y=>c==="quantity"?Y.quantity:c==="volume"?Y.volumeMl:Y.amount,q=Y=>c==="quantity"?`${Y.toLocaleString()}本`:c==="volume"?Qt(Y):nt(Y);let C,T=[],R,z,O;if(E&&E.monthlySales.length>0)C=E.monthlySales.slice(-24).map(Y=>({month:Y.month,amount:A(Y)})),R=`${E.name} の月別${k}`,z=`${E.tab==="customers"?"得意先":"商品"}: ${E.code}`,O="#0968e5";else if(o.length>0&&n!=="all"){C=o.map(U=>({month:U.month,amount:A(U)})),T=i.map(U=>({month:U.month,amount:A(U)}));const Y=C.reduce((U,K)=>U+K.amount,0),te=T.reduce((U,K)=>U+K.amount,0),be=te>0?(Y-te)/te*100:0,ye=be>0?"+":"";R=`${L[n]} ${k}（${s}）`,z=`${q(Y)}${te>0?` / 前年比 ${ye}${be.toFixed(1)}%`:""}`,O="#2f855a"}else{C=hc(e.monthlySales,c,m).curr,T=[];const te=C.reduce((ye,U)=>ye+U.amount,0);R=`${m==="fiscal"?"決算年度別":"暦年別"}${k}`,z=`累計 ${q(te)}（${C.length}${m==="fiscal"?"期":"年"}）`,O="#0F5B8D"}const F=["amount","quantity","volume"].map(Y=>`<button class="tab-button ${Y===c?"active":""}" data-chart-metric="${Y}">${hn[Y]}</button>`).join(""),V=["all","yearly","monthly","weekly","daily"].map(Y=>`<button class="button ${Y===n?"primary":"secondary"} small" type="button" data-analytics-period="${Y}">${fn[Y]}</button>`).join(""),j=m==="fiscal"&&n==="yearly"?fc(e.monthlySales):l,J=m==="fiscal"&&n==="yearly"&&!j.includes(s)?j[0]??"":s,W=n!=="all"&&j.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${j.map(Y=>`<option value="${Y}" ${Y===J?"selected":""}>${m==="fiscal"&&n==="yearly"?Y+"年度":Y}</option>`).join("")}
      </select>`:"";let oe="",ee="";if(t==="staff"){const Y=["all","yearly","monthly","weekly","daily"].map(K=>`<button class="button ${K===y?"primary":"secondary"} small" type="button" data-staff-period="${K}">${fn[K]}</button>`).join(""),te=y!=="all"&&g.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${g.map(K=>`<option value="${K}" ${K===v?"selected":""}>${K}</option>`).join("")}
        </select>`:"",ye=(w.length>0?w:e.staffTotals).filter(K=>!d||K.name.includes(d)||K.code.includes(d)),U=y!=="all"&&v?` (${v})`:"";if(oe=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${Y}</div>
        ${te}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${d}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${U?`<span style="font-size:12px;color:var(--text-secondary);">${U}</span>`:""}
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
            ${ye.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':ye.map(K=>`
                <tr>
                  <td class="mono">${K.code||"―"}</td>
                  <td>${K.name||"未設定"}</td>
                  <td class="numeric">${nt(K.amount)}</td>
                  <td class="numeric">${K.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${K.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${K.code}" data-staff-name="${K.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const K=u.breakdownTab,ne=y!=="all"&&v?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${v}</span>`:"";ee=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${u.name} の内訳${ne}</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>

          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div class="tab-group">
              <button class="tab-button ${K==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${K==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${p}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${K==="customers"?gn(u.customerRows,p,"得意先名"):gn(u.productRows,p,"商品名")}
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
            <h2>${R}</h2>
            <p class="panel-caption">${z}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${F}</div>
            ${E?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${vc(C,O,T,c)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${h}</h2>
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
            <div class="button-group">${V}</div>
            ${W}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${X("code","コード",P,"mono")}
                  ${X("name","名称",P)}
                  ${X("amount","売上額",P,"numeric")}
                  ${X("quantity","本数",P,"numeric")}
                  ${X("volumeMl","移出量",P,"numeric")}
                  ${X("documents","伝票数",P,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${bc(S,!0)}</tbody>
            </table>
          </div>
        `:oe}
      </article>
    </section>

    ${E?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${E.name} の${E.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${E.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${E.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${wc(E.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${ee}
  `}const vn=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:yc,monthToFiscalYear:Ya,renderSalesAnalytics:Ms},Symbol.toStringTag,{value:"Module"}));function pt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function $c(e){const t=Math.max(...e.salesByProduct.flatMap(l=>l.values),1),n=e.salesByProduct.map(l=>{const d=l.values.map((p,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(p/t*120)}px" title="${e.months[u]}: ${pt(p)}"></div>
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
        <td class="numeric">${pt(l.costPrice)}</td>
        <td class="numeric">${pt(l.sellPrice)}</td>
        <td class="numeric">${pt(l.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${l.marginRate>=40?"success":"warning"}">${l.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(l=>{const d=l.values.reduce((p,u)=>p+u,0);return`
        <tr>
          <td>${l.label}</td>
          ${l.values.map(p=>`<td class="numeric">${(p/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${pt(d)}</strong></td>
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
  `}function xc(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function _c(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function bn(e){return e.toISOString().slice(0,10)}function Sc(e,t,n){const s=e.length?e.map(r=>`
            <tr>
              <td class="mono">${r.documentNo}</td>
              <td>${xc(r.date)}</td>
              <td>
                <div class="table-title">${r.customerName}</div>
                <div class="table-sub mono">${r.customerCode}</div>
              </td>
              <td class="numeric">${_c(r.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||bn(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||bn(new Date)}" />
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
  `}function Dt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function kc(e,t,n,s){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},l={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},d={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},p=e.map(g=>`
      <tr>
        <td>${g.saleTime}</td>
        <td class="mono">${g.productCode}</td>
        <td>${g.productName}</td>
        <td class="numeric">${g.quantity}</td>
        <td class="numeric">${Dt(g.unitPrice)}</td>
        <td class="numeric"><strong>${Dt(g.amount)}</strong></td>
        <td>${r[g.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(g=>`
      <tr>
        <td class="mono">${g.orderNo}</td>
        <td>${g.orderDate}</td>
        <td>${g.customerName}</td>
        <td>${g.postalCode} ${g.address}</td>
        <td>${g.items.map(w=>`${w.productName} ×${w.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Dt(g.totalAmount)}</strong></td>
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
        <p class="kpi-value">${Dt(y)}</p>
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
  `}const Zt={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Pc={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Ec(e,t,n,s){const r=Pc[e],l=Object.keys(Zt).map(p=>`
      <button class="tab-button ${e===p?"active":""}" data-import-entity="${p}">
        ${Zt[p]}
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
        <h2>${Zt[e]} のCSV形式</h2>
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
  `}const de={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function Ac(e,t,n){const s=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:de.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:de.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:de.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:de.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:de.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:de.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:de.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:de.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:de.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:de.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:de.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:de.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:de.date}];e.lines.slice(0,6).forEach((d,p)=>{const u=33+p*8.5;s.push({id:`line${p}_name`,label:`明細${p+1} 品名`,x:5,y:u,fontSize:7.5,value:d.productName+(d.spec?` ${d.spec}`:""),color:de.detail},{id:`line${p}_code`,label:`明細${p+1} CD`,x:64,y:u,fontSize:7.5,value:d.productCode,color:de.detail},{id:`line${p}_qty`,label:`明細${p+1} 数量`,x:124,y:u,fontSize:8,value:d.quantity>0?String(d.quantity):"",color:de.detail},{id:`line${p}_price`,label:`明細${p+1} 原単価`,x:163,y:u,fontSize:8,value:d.unitPrice>0?d.unitPrice.toLocaleString("ja-JP"):"",color:de.detail},{id:`line${p}_amount`,label:`明細${p+1} 原価金額`,x:176,y:u,fontSize:8,value:d.amount>0?d.amount.toLocaleString("ja-JP"):"",color:de.detail},{id:`line${p}_retail`,label:`明細${p+1} 売単価`,x:193,y:u,fontSize:8,value:d.retailPrice?d.retailPrice.toLocaleString("ja-JP"):"",color:de.detail})});const r=e.lines.reduce((d,p)=>d+(p.amount||0),0),l=e.lines.reduce((d,p)=>d+p.quantity,0);return s.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(l),color:de.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:de.total}),n&&s.forEach(d=>{const p=n[d.id];p&&(d.x=p.x,d.y=p.y)}),s}function Cc(e,t,n,s,r){const d=Ac(e,t,s).map(u=>`
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
        色: <span style="color:${de.header}">■ヘッダ</span>
        <span style="color:${de.code}">■コード</span>
        <span style="color:${de.date}">■日付</span>
        <span style="color:${de.detail}">■明細</span>
        <span style="color:${de.total}">■合計</span>
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
  `}function ea(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const s=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,l=parseFloat(n.style.top)||0;t[s]={x:r,y:l}}),t}function Lc(e,t,n){const s=[...new Set(e.map(w=>w.areaCode).filter(Boolean))].sort(),r=[...new Set(e.map(w=>w.businessTypeName||w.businessType).filter(Boolean))].sort(),l=e.filter(w=>w.isAtRisk),d=e.filter(w=>!w.isAtRisk&&w.isDormant),p=e.filter(w=>!w.isAtRisk&&!w.isDormant&&w.amount12m>0),u=e.filter(w=>!w.isAtRisk&&!w.isDormant&&w.amount12m===0),y=t.filter(w=>w.lat&&w.lng),v=JSON.stringify(e),g=JSON.stringify(y.map(w=>({name:w.name,address:w.address,lat:w.lat,lng:w.lng,phone:w.phone})));return`
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
    <\/script>`}const Dc={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},qc=["new","picking","packed","shipped","delivered"];function Ic(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(l=>t[l.stage].push(l));const n=qc.map(l=>{const d=Dc[l],p=t[l];return`
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
  `}function Tc(e,t,n){const s=e.cart.reduce((l,d)=>l+d.amount,0);return`
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

      ${Nc(e,t,n)}
    </div>
  `}function Nc(e,t,n){if(e.step==="customer"){const s=e.customerQuery.toLowerCase(),r=s?t.filter(l=>l.name.toLowerCase().includes(s)||l.code.toLowerCase().includes(s)):t.slice(0,20);return`
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
  `}const wn={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},$n={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},xn={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function Mc(e,t){const n=e.find(l=>l.id===t)??e[0],s=e.filter(l=>l.status==="new").length,r=e.filter(l=>l.status==="confirmed").length;return`
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
                <span class="status-pill ${$n[l.status]}">${wn[l.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${xn[l.language]} · 👥 ${l.partySize}名
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
            <span class="status-pill ${$n[n.status]}">${wn[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${xn[n.language]}</dd></div>
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
  `}const Rc=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,Oc=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function jc(e,t){const n=t?e.find(r=>r.id===t):null,s=t==="__new__";return`
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
  `}function Bc(e,t,n,s){const[r,l]=t.split("-").map($=>parseInt($,10)),d=new Date(r,l-1,1),p=new Date(r,l,0),u=d.getDay(),y=p.getDate(),v=[];for(let $=0;$<u;$++)v.push({isOutside:!0});for(let $=1;$<=y;$++)v.push({date:new Date(r,l-1,$)});for(;v.length%7!==0;)v.push({isOutside:!0});const g=n?e.filter($=>$.category===n):e,w={};g.forEach($=>{const _=$.startsAt.slice(0,10);w[_]??=[],w[_].push($)});const P=new Date().toISOString().slice(0,10),E=v.map($=>{if($.isOutside)return'<div class="cal-cell cal-outside"></div>';const _=$.date,S=`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}-${String(_.getDate()).padStart(2,"0")}`,L=w[S]??[],k=S===P,A=_.getDay();return`
        <div class="cal-cell ${k?"cal-today":""} ${A===0?"cal-sun":A===6?"cal-sat":""}"
             data-cal-date="${S}">
          <div class="cal-day-num">${_.getDate()}</div>
          <div class="cal-events">
            ${L.slice(0,3).map(q=>`
              <button class="cal-event" data-cal-event-id="${q.id}"
                      style="background:${q.color||Ba[q.category]||"#0F5B8D"};"
                      title="${q.title}">
                <span class="cal-event-time">${q.isAllDay?"終日":new Date(q.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${q.title}</span>
              </button>
            `).join("")}
            ${L.length>3?`<button class="cal-event-more" data-cal-date="${S}">+${L.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),o=s?.isOpen?zc(s):"",i=new Date(r,l-2,1),c=new Date(r,l,1),m=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`,h=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,b=(()=>{const $=new Date;return`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`})();return`
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
          <button class="button secondary" data-action="cal-prev" data-ym="${m}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${b}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${h}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(ja).map(([$,_])=>`<option value="${$}" ${n===$?"selected":""}>${_}</option>`).join("")}
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
        ${E}
      </div>
    </section>

    ${o}
  `}function zc(e){const t=e.event;return`
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
                ${Object.entries(ja).map(([n,s])=>`<option value="${n}" ${t.category===n?"selected":""}>${s}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?_n(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?_n(t.endsAt):""}" />
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
  `}function _n(e){const t=new Date(e),n=s=>String(s).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const ut={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function Fc(e,t){const n=t?e.find(s=>s.id===t):null;return`
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
        <p class="form-hint">${ut[n.provider]?.description??""}</p>
        ${ut[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${ut[n.provider].setupUrl}" target="_blank">${ut[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(ut[n.provider]?.fields??[]).map(s=>`
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
  `}function Vc(e,t){const n=e.reduce((l,d)=>l+d.totalAmount,0),s=e.filter(l=>l.financialStatus==="paid").length,r=e.filter(l=>l.fulfillmentStatus!=="fulfilled"&&l.fulfillmentStatus!=="shipped").length;return`
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
  `}function Yc(e,t,n){return`
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
  `}function Uc(e,t,n){const s=t==="__new__"?null:e.find(d=>d.id===t),r=t==="__new__";return n?.role==="admin"?`
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
                <td>${Ot[d.department]}</td>
                <td>${Rt[d.role]}</td>
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
              ${Object.entries(Ot).map(([d,p])=>`<option value="${d}" ${s?.department===d?"selected":""}>${p}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Rt).map(([d,p])=>`<option value="${d}" ${s?.role===d?"selected":""}>${p}</option>`).join("")}
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
    `}function Jc(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${Ot[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Rt[e.role]}</dd></div>
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
    `}function Qc(e){const t={};return e.forEach(n=>{const s=n.userEmail??"(anonymous)";t[s]=(t[s]??0)+1}),`
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
  `}function Hc(e){const t=e.prospects.reduce((l,d)=>l+d.expectedAmount,0),n=e.prospects.reduce((l,d)=>l+d.expectedAmount*d.probability/100,0),s=e.prospects.filter(l=>l.stage==="won").length,r=e.prospects.filter(l=>l.stage==="hot"||l.stage==="negotiating").length;return`
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

    ${e.viewMode==="kanban"?Kc(e.prospects):Gc(e.prospects)}

    ${Xc(e)}
  `}function Kc(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(s=>{const r=e.filter(d=>d.stage===s),l=r.reduce((d,p)=>d+p.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${s}">
          <div class="pk-col-header" style="--pk-color:${za[s]};">
            <span class="pk-col-label">${Ut[s]}</span>
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
  `}function Gc(e){return`
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
                <td><span class="status-pill" style="background:${za[t.stage]};color:white;">${Ut[t.stage]}</span></td>
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
  `}function Xc(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(s=>s.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(Ut).map(([s,r])=>`<option value="${s}" ${n?.stage===s?"selected":""}>${r}</option>`).join("")}
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
  `}function Wc(e,t,n){const s=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
                <td>${jt[l.eventType]||l.eventType}</td>
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
                <td>${jt[l.eventType]||l.eventType}</td>
                <td class="mono" style="font-size:12px;">${l.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${l.message}</td>
                <td><span class="status-pill ${l.status==="sent"?"success":"warning"}">${l.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Zc(e,t,n,s){const r=new Map(t.map(g=>[g.code,g])),l=e.filter(g=>g.callDirection==="inbound").length,d=e.filter(g=>g.callDirection==="outbound").length,p=e.filter(g=>g.callStatus==="missed").length,u=e.reduce((g,w)=>g+(w.durationSeconds??0),0),y=g=>{if(g===0)return"―";const w=Math.floor(g/60),P=g%60;return w>0?`${w}分${P}秒`:`${P}秒`},v=g=>{if(g.matchedCustomerCode){const w=r.get(g.matchedCustomerCode);if(w)return`${w.name} (既存)`}return"未登録番号"};return`
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
  `}const ed=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function td(e){const t=e.activeListId?e.lists.find(l=>l.id===e.activeListId):null,n=e.items.filter(l=>l.status==="new").length,s=e.items.filter(l=>l.status==="imported").length,r=e.items.filter(l=>l.status==="excluded").length;return`
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
            ${ed.map(l=>`<option value="${l}" ${e.searchBusinessType===l?"selected":""}>${l}</option>`).join("")}
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
  `}const Sn={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},ad={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},nd={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function ge(e){return"¥"+e.toLocaleString("ja-JP")}function vt(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Rs(e,t){const n=e.reduce((l,d)=>l+d.amount,0),s=Math.floor(n*t),r=n+s;return{subtotal:n,taxAmount:s,total:r}}const le={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function ce(e,t){const n=e.align??"left",s=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${s}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function ta(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),s=n-2018;return{y:s>0?String(s).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function sd(e,t,n){const s=ta(e.documentDate),r=ta(e.orderDate??e.documentDate),l=ta(e.deliveryDate??e.documentDate),d=e.lines.slice(0,6).map((i,c)=>{const m=le.detailStartY+c*le.detailRowH,h=le.detailCols,b=[],$=(_,S)=>{S&&b.push(ce({..._,y:m,x:_.x+0},S))};return $(h.productName,i.productName+(i.spec?` ${i.spec}`:"")),$(h.productCode,i.productCode),$(h.color,i.color??""),$(h.size,[i.size,i.caseQty?`×${i.caseQty}`:""].filter(Boolean).join(" ")),$(h.unit,i.unit),$(h.quantity,i.quantity>0?i.quantity.toLocaleString("ja-JP"):""),$(h.correctedQty,i.correctedQuantity?i.correctedQuantity.toLocaleString("ja-JP"):""),$(h.discount,i.discount?i.discount.toLocaleString("ja-JP"):""),$(h.unitPrice,i.unitPrice>0?i.unitPrice.toLocaleString("ja-JP"):""),$(h.costAmount,i.amount>0?i.amount.toLocaleString("ja-JP"):""),$(h.retailPrice,i.retailPrice?i.retailPrice.toLocaleString("ja-JP"):""),$(h.note,i.receivedAmount?i.receivedAmount.toLocaleString("ja-JP"):""),b.join("")}).join(""),p=e.lines.reduce((i,c)=>i+(c.amount||0),0),u=e.lines.reduce((i,c)=>i+(c.retailPrice||0)*(c.correctedQuantity??c.quantity),0),y=e.lines.reduce((i,c)=>i+(c.receivedAmount||0),0),v=e.lines.reduce((i,c)=>i+(c.returnAmount||0),0),g=e.lines.reduce((i,c)=>i+c.quantity,0),w=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",P=n.calibrationOffsetX||0,E=n.calibrationOffsetY||0,o=`transform: translate(${P}mm, ${E}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${w}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${o}">
        ${ce(le.currentDateY,s.y)}
        ${ce(le.currentDateM,s.m)}
        ${ce(le.currentDateD,s.d)}
        ${ce(le.documentNo,e.documentNo)}
        ${e.settlementPrint?ce(le.settlementCheck,"✓"):""}

        ${ce(le.vendorName,t.name)}
        ${ce(le.vendorAddress,t.address1)}
        ${ce(le.chainStoreCode,e.chainStoreCode??"")}
        ${ce(le.categoryCode,e.categoryCode??"")}
        ${ce(le.slipNumber,e.documentNo)}
        ${ce(le.vendorCode,e.slipTypeCode??"")}

        ${ce(le.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${ce(le.orderDateY,r.y)}
        ${ce(le.orderDateM,r.m)}
        ${ce(le.orderDateD,r.d)}
        ${ce(le.deliveryDateY,l.y)}
        ${ce(le.deliveryDateM,l.m)}
        ${ce(le.deliveryDateD,l.d)}
        ${ce(le.orderNo,e.orderNo??"")}
        ${ce(le.partnerCode,e.vendorCode??"")}

        ${d}

        ${ce(le.totalQty,g.toLocaleString("ja-JP"))}
        ${ce(le.receivedTotal,y.toLocaleString("ja-JP"))}
        ${ce(le.returnTotal,v.toLocaleString("ja-JP"))}
        ${ce(le.correctedCostTotal,p.toLocaleString("ja-JP"))}
        ${ce(le.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function od(e,t,n){const{subtotal:s,taxAmount:r,total:l}=Rs(e.lines,e.taxRate),d=e.previousBalance??0,p=e.paymentAmount??0,u=d-p+l,y=e.lines.map(g=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${g.note??""}</td>
        <td>${g.productName}${g.spec?` <span style="color:#636e72;font-size:9pt;">/ ${g.spec}</span>`:""}</td>
        <td class="numeric">${g.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${g.unit}</td>`:""}
        <td class="numeric">${ge(g.unitPrice)}</td>
        <td class="numeric">${ge(g.amount)}</td>
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
        <div><dt>請求日</dt><dd>${vt(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${vt(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${ge(u)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${ge(s)} / 消費税: ${ge(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${d?`<tr><th>前回御請求額</th><td>${ge(d)}</td></tr>`:""}
          ${p?`<tr><th>ご入金額</th><td>▲ ${ge(p)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${ge(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${ge(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${ge(u)}</td></tr>
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
  `}function rd(e,t,n){const{subtotal:s,taxAmount:r,total:l}=Rs(e.lines,e.taxRate),d=e.lines.map(u=>`
      <tr>
        <td>${u.productName}${u.spec?` <span style="color:#636e72;font-size:9pt;">/ ${u.spec}</span>`:""}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${u.unit}</td>`:""}
        <td class="numeric">${ge(u.unitPrice)}</td>
        <td class="numeric">${ge(u.amount)}</td>
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
        <div><dt>見積日</dt><dd>${vt(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${vt(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${ge(l)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${ge(s)} / 消費税: ${ge(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${ge(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${ge(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${ge(l)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?vt(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function id(e,t,n,s){let r="";switch(e){case"chain_store":r=sd(s,n,t);break;case"quotation":r=rd(s,n,t);break;case"invoice_monthly":r=od(s,n,t);break}const l=Object.keys(Sn).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${Sn[u]}</button>`).join(""),d=s.lines.map((u,y)=>`
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
  `}const ld={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},cd={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Os(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],s="",r=!1;for(let p=0;p<e.length;p++){const u=e[p];r?u==='"'?e[p+1]==='"'?(s+='"',p++):r=!1:s+=u:u==='"'?r=!0:u===","?(n.push(s),s=""):u===`
`||u==="\r"?(u==="\r"&&e[p+1]===`
`&&p++,n.push(s),n.some(y=>y!=="")&&t.push(n),n=[],s=""):s+=u}if((s!==""||n.length>0)&&(n.push(s),n.some(p=>p!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const l=t[0].map(p=>p.trim()),d=[];for(let p=1;p<t.length;p++){const u={};l.forEach((y,v)=>{u[y]=(t[p][v]??"").trim()}),d.push(u)}return{columns:l,rows:d}}function js(e,t,n){const s=ld[e],r=s.filter(p=>!t.includes(p)),l=n.map(p=>{const u=[];r.length>0&&u.push(`必須列欠損: ${r.join(",")}`);for(const y of s)t.includes(y)&&!p[y]&&u.push(`${y}が空`);return{...p,_valid:u.length===0,_error:u[0]}}),d=l.filter(p=>p._valid).length;return{entity:e,columns:t,rows:l,totalRows:n.length,validRows:d,invalidRows:l.length-d}}function Bs(e){const n=cd[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function zs(e,t){const{supabaseInsert:n}=await I(async()=>{const{supabaseInsert:p}=await Promise.resolve().then(()=>H);return{supabaseInsert:p}},void 0);let s=0,r=0;const d={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const p of t){if(!p._valid)continue;const{_valid:u,_error:y,...v}=p,g={...v};if(!g.id){const w=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";g.id=String(v[w]??`${e}-${Date.now()}-${s+r}`)}for(const w of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof g[w]=="string"&&g[w]!==""){const P=Number(g[w]);Number.isFinite(P)&&(g[w]=P)}try{await n(d,g)!==null?s++:r++}catch{r++}}return{inserted:s,failed:r}}const dd=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:Bs,importToSupabase:zs,parseCSV:Os,validateImport:js},Symbol.toStringTag,{value:"Module"}));function aa(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function pd(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function ud(e,t,n,s,r){const l=n.reduce((y,v)=>y+v.rowCount,0),d=n.map(y=>y.lastSyncAt).filter(y=>y!==null).sort().reverse()[0]??null,p=100,u=Math.max(1,Math.ceil(r/p));return`
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
        <p class="kpi-value">${d?aa(d):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${y.lastSyncAt?aa(y.lastSyncAt):"未同期"}</p>
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
              <td>${y._synced_at?aa(y._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${y._raw_b64?y._raw_b64.slice(0,200):""}">${pd(y._raw_b64)}</td>
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
  `}const st=400,ot=240;function Z(e){return e.toLocaleString("ja-JP")}function na(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function md(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function Ce(e,t,n,s=""){return`<th class="${s}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${md(n,t)}</th>`}function mt(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function yd(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const s=e.products.slice().sort((c,m)=>(e.productTotals[m.code]??0)-(e.productTotals[c.code]??0)).slice(0,6),r=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],l=820,d=280,p={top:20,right:20,bottom:40,left:60},u=l-p.left-p.right,y=d-p.top-p.bottom,v=t.map(c=>s.reduce((m,h)=>m+(n[h.code]?.[c]??0),0)),g=Math.max(...v,1),w=u/t.length,P=Math.max(w-10,14),E=[0,.25,.5,.75,1].map(c=>{const m=p.top+y-y*c,h=`${Math.round(g*c/100)*100}`;return`
      <line x1="${p.left}" y1="${m}" x2="${l-p.right}" y2="${m}" class="chart-grid" />
      <text x="6" y="${m+4}" class="chart-axis">${Number(h).toLocaleString("ja-JP")}</text>
    `}).join(""),o=t.map((c,m)=>{let h=p.top+y;const b=p.left+m*w+(w-P)/2,$=s.map((q,C)=>{const R=(n[q.code]?.[c]??0)/g*y;return h-=R,`<rect x="${b}" y="${h}" width="${P}" height="${R}" fill="${r[C%r.length]}" opacity="0.85" rx="${C===s.length-1?3:0}" />`}).join(""),[_,S]=c.split("-"),L=parseInt(S),k=L===1||m%3===0,A=L===1?`${_.slice(2)}年`:`${L}月`;return`<g>${$}${k?`<text x="${b+P/2}" y="${d-10}" class="chart-axis centered-axis">${A}</text>`:""}</g>`}).join(""),i=s.map((c,m)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${r[m%r.length]};"></span>
       ${c.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${l} ${d}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${E}${o}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${p.left}px;display:flex;flex-wrap:wrap;">${i}</div>
  `}function hd(e){const{months:t,products:n}=e,s=n.slice().sort((d,p)=>(e.productTotals[p.code]??0)-(e.productTotals[d.code]??0)).slice(0,50),r=t.map(d=>{const[p,u]=d.split("-"),y=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${y===1?`${p.slice(2)}年1月`:`${y}月`}</th>`}).join(""),l=s.map(d=>{const p=t.map(u=>{const y=e.matrix[d.code]?.[u]??0;return`<td class="numeric">${y>0?Z(y):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${d.code}</td>
        <td style="white-space:nowrap;">${d.name}</td>
        ${p}
        <td class="numeric"><strong>${Z(e.productTotals[d.code]??0)}</strong></td>
        <td class="numeric">${Z(Math.round(e.productAvg[d.code]??0))}</td>
        <td class="numeric">${Z(Math.round(e.productStdDev[d.code]??0))}</td>
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
  `}function fd(e,t){const n=e.months[e.months.length-1]??"",s=e.months[e.months.length-2]??"",r=e.months.length-13,l=r>=0?e.months[r]:"",d=e.products.reduce((P,E)=>P+(e.matrix[E.code]?.[n]??0),0),p=e.products.reduce((P,E)=>P+(e.matrix[E.code]?.[s]??0),0),u=l?e.products.reduce((P,E)=>P+(e.matrix[E.code]?.[l]??0),0):0,y=p>0?(d-p)/p*100:0,v=u>0?(d-u)/u*100:0,g=P=>P>=0?"+":"",w=[1,2,3,5].map(P=>`<option value="${P}" ${P===t?"selected":""}>${P}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${Z(d)} 本</p>
        <p class="kpi-sub">${na(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${y>=0?"":"text-danger"}">${g(y)}${y.toFixed(1)}%</p>
        <p class="kpi-sub">${na(s)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${v>=0?"":"text-danger"}">${u>0?`${g(v)}${v.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${l?`${na(l)} 比`:"前年データなし"}</p>
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
      ${yd(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${hd(e)}
    </section>
  `}function gd(e,t){const s=e.slice().sort((l,d)=>{if(!t)return 0;const p=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return p*l.productName.localeCompare(d.productName,"ja");case"ss-avg":return p*(l.avgMonthlyDemand-d.avgMonthlyDemand);case"ss-std":return p*(l.demandStdDev-d.demandStdDev);case"ss-ss":{const u=Math.ceil(mt(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(mt(d.serviceLevel)*d.demandStdDev*Math.sqrt(d.leadTimeDays/30));return p*(u-y)}case"ss-rop":{const u=Math.ceil(l.avgMonthlyDemand*(l.leadTimeDays/30)+mt(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(d.avgMonthlyDemand*(d.leadTimeDays/30)+mt(d.serviceLevel)*d.demandStdDev*Math.sqrt(d.leadTimeDays/30));return p*(u-y)}default:return 0}}).map(l=>{const d=mt(l.serviceLevel),p=l.leadTimeDays/30,u=Math.ceil(d*l.demandStdDev*Math.sqrt(p)),y=Math.ceil(l.avgMonthlyDemand*p+u),v=u-l.safetyStockQty,g=v>0?"text-danger":v<-u*.3?"text-warning":"",w=[.9,.95,.99].map(P=>`<option value="${P}" ${Math.abs(l.serviceLevel-P)<.01?"selected":""}>${(P*100).toFixed(0)}%</option>`).join("");return`
      <tr>
        <td style="white-space:nowrap;">${l.productName}</td>
        <td class="numeric">${Z(Math.round(l.avgMonthlyDemand))}</td>
        <td class="numeric">${Z(Math.round(l.demandStdDev))}</td>
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
        <td class="numeric"><strong>${Z(u)}</strong></td>
        <td class="numeric">${Z(y)}</td>
        <td class="numeric ${g}">
          ${v>0?`+${Z(v)}`:Z(v)}
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
              ${Ce("商品名","ss-name",t)}
              ${Ce("月平均需要","ss-avg",t,"numeric")}
              ${Ce("標準偏差","ss-std",t,"numeric")}
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              ${Ce("安全在庫[算出]","ss-ss",t,"numeric")}
              ${Ce("発注点","ss-rop",t,"numeric")}
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const vd={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function bd(e,t,n,s){const r={draft:"下書き",confirmed:"確定",actual:"実績入力済"},l={draft:"neutral",confirmed:"info",actual:"success"},d=S=>Object.entries(vd).map(([L,k])=>`<option value="${L}" ${L===S?"selected":""}>${k}</option>`).join(""),p=640,u=S=>S.map(L=>{const k=Math.max(0,L.demandForecast+L.safetyStockTarget-L.openingStock),A=L.plannedQty>0?L.plannedQty:Math.round(k),q=A>0?Math.ceil(A/p*10)/10:0,C=L.plannedQty>0?(L.actualQty-L.plannedQty)/L.plannedQty*100:null,T=C!==null?C>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${L.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${L.productCode}"
            style="width:92px;">${d(L.productionType)}</select>
        </td>
        <td class="numeric">${Z(Math.round(L.demandForecast))}</td>
        <td class="numeric">${Z(Math.round(L.safetyStockTarget))}</td>
        <td class="numeric">${Z(Math.round(L.openingStock))}</td>
        <td class="numeric"><strong>${Z(Math.round(k))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${L.plannedQty}"
            data-action="plan-qty" data-code="${L.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">${L.actualQty>0?Z(L.actualQty):"—"}</td>
        <td class="numeric ${T}">
          ${C!==null?`${C>=0?"+":""}${C.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${q>0?`${q.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${l[L.status]??"neutral"}">${r[L.status]??L.status}</span>
        </td>
      </tr>
    `}).join(""),v=(n==="all"?e:e.filter(S=>S.productionType===n)).slice().sort((S,L)=>{if(!s)return 0;const k=s.dir==="asc"?1:-1,A=Math.max(0,S.demandForecast+S.safetyStockTarget-S.openingStock),q=Math.max(0,L.demandForecast+L.safetyStockTarget-L.openingStock);switch(s.column){case"plan-name":return k*S.productName.localeCompare(L.productName,"ja");case"plan-forecast":return k*(S.demandForecast-L.demandForecast);case"plan-required":return k*(A-q);case"plan-planned":return k*(S.plannedQty-L.plannedQty);case"plan-actual":return k*(S.actualQty-L.actualQty);case"plan-label":{const C=S.plannedQty>0?S.plannedQty:Math.round(A),T=L.plannedQty>0?L.plannedQty:Math.round(q);return k*(C-T)}default:return 0}}),g=u(v),w=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],P=S=>{const k=(S==="all"?e:e.filter(A=>A.productionType===S)).reduce((A,q)=>{const C=Math.max(0,q.demandForecast+q.safetyStockTarget-q.openingStock);return A+(q.plannedQty>0?q.plannedQty:Math.round(C))},0);return Math.ceil(k/p*10)/10},E=w.filter(S=>S.key!=="all").map(S=>{const L=P(S.key),k=e.filter(q=>q.productionType===S.key).length,A=S.key==="make_to_order"?e.filter(q=>q.productionType==="make_to_order"&&q.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${S.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${L>0?L.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${k}商品${A!==null?` · 受注${A}件`:""}</p>
      </div>
    `}).join(""),o=v.reduce((S,L)=>S+L.demandForecast,0),i=v.reduce((S,L)=>S+Math.max(0,L.demandForecast+L.safetyStockTarget-L.openingStock),0),c=v.reduce((S,L)=>S+L.plannedQty,0),m=v.reduce((S,L)=>S+L.actualQty,0),h=P(n),b=new Date,$=Array.from({length:24},(S,L)=>{const k=new Date(b.getFullYear(),b.getMonth()-6+L,1),A=`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`;return`<option value="${A}" ${A===t?"selected":""}>${A.replace("-","年")}月</option>`}).join(""),_=w.map(S=>`<button class="button ${n===S.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${S.key}"
       style="padding:4px 12px;font-size:13px;">${S.label}</button>`).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${$}</select>
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
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${E}</div>
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
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${_}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${Ce("商品名","plan-name",s)}
              <th>生産区分</th>
              ${Ce("需要予測","plan-forecast",s,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${Ce("必要生産数","plan-required",s,"numeric")}
              ${Ce("計画数","plan-planned",s,"numeric")}
              ${Ce("実績数","plan-actual",s,"numeric")}
              <th class="numeric">達成率</th>
              ${Ce("ラベル工数","plan-label",s,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${g||'<tr><td colspan="11" class="empty-row">データなし</td></tr>'}
            ${v.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${Z(Math.round(o))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${Z(Math.round(i))}</td>
                <td class="numeric">${Z(c)}</td>
                <td class="numeric">${m>0?Z(m):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${h.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Fs(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n,0).getDate();return Array.from({length:s},(r,l)=>{const d=l+1;return`${e}-${String(d).padStart(2,"0")}`})}function kn(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function Pn(e){const t=new Date(e).getDay();return t===0||t===6}function wd(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function Vs(e){return e.partTimers+e.employees}function Le(e,t,n={partCapacity:st,empCapacity:ot}){const s=e.filter(v=>v.partTimers>0||v.employees>0);if(s.length===0)return;const r=t.reduce((v,g)=>{const w=g.plannedQty>0?g.plannedQty:Math.max(0,g.demandForecast+g.safetyStockTarget-g.openingStock);return v+w},0);if(r<=0)return;const l=r/s.length;let d=0,p=0,u=1/0;const y=Math.ceil(l/n.partCapacity);for(let v=0;v<=y;v++){const g=l-v*n.partCapacity,w=g>0?Math.ceil(g/n.empCapacity):0,P=v+w;P<u&&(u=P,d=v,p=w)}for(const v of e)v.confirmed||(v.partTimers>0||v.employees>0)&&(v.partTimers=d,v.employees=p)}function $d(e,t,n={partCapacity:st,empCapacity:ot}){const s=t.filter(p=>Vs(p)>0).map(p=>p.date).sort();if(s.length===0)return t.map(p=>({date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const r={monthly:0,november:1,annual:2,make_to_order:3},l=e.filter(p=>p.plannedQty>0||Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)>0).map(p=>({productCode:p.productCode,productName:p.productName,productionType:p.productionType,remaining:p.plannedQty>0?p.plannedQty:Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)})).filter(p=>p.remaining>0).sort((p,u)=>(r[p.productionType]??99)-(r[u.productionType]??99)||u.remaining-p.remaining),d=new Map;for(const p of t){const u=wd(p,n);d.set(p.date,{date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const p of l){let u=p.remaining;if(u<=0)continue;if(s.reduce((v,g)=>{const w=d.get(g);return v+Math.max(0,w.capacity-w.totalQty)},0)<=0)break;for(const v of s){if(u<=0)break;const g=d.get(v),w=Math.max(0,g.capacity-g.totalQty);if(w<=0)continue;const P=Math.min(u,w);g.items.push({productCode:p.productCode,productName:p.productName,productionType:p.productionType,qty:P}),g.totalQty+=P,g.utilization=g.capacity>0?g.totalQty/g.capacity:0,u-=P}}return t.map(p=>d.get(p.date))}function Mt(e,t=1,n=1){return Fs(e).map(s=>({date:s,partTimers:Pn(s)?0:t,employees:Pn(s)?0:n,confirmed:!1}))}function xd(e,t,n,s=null,r=new Set,l={partCapacity:st,empCapacity:ot}){const d=Fs(t),p=e.filter(C=>!r.has(C.productCode)),u=$d(p,n,l),y=new Map(u.map(C=>[C.date,C])),v=p.reduce((C,T)=>C+(T.plannedQty>0?T.plannedQty:Math.max(0,T.demandForecast+T.safetyStockTarget-T.openingStock)),0),w=e.reduce((C,T)=>C+(T.plannedQty>0?T.plannedQty:Math.max(0,T.demandForecast+T.safetyStockTarget-T.openingStock)),0)-v,P=u.reduce((C,T)=>C+T.totalQty,0),E=n.filter(C=>Vs(C)>0).length,o=u.reduce((C,T)=>C+T.capacity,0),i=n.reduce((C,T)=>C+T.partTimers,0),c=n.reduce((C,T)=>C+T.employees,0),m=E>0?Math.ceil(v/E):0,h=new Date,b=Array.from({length:24},(C,T)=>{const R=new Date(h.getFullYear(),h.getMonth()-6+T,1),z=`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}`;return`<option value="${z}" ${z===t?"selected":""}>${z.replace("-","年")}月</option>`}).join(""),$=new Date(d[0]).getDay(),_=[];for(let C=0;C<$;C++)_.push('<div style="min-height:44px;"></div>');for(const C of d){const T=y.get(C),R=new Date(C).getDay(),z=parseInt(C.split("-")[2]),O=T?.partTimers??0,F=T?.employees??0,V=O+F,j=T?.totalQty??0,J=T?.utilization??0,W=C===s,oe=V===0?"var(--surface-alt)":J>.95?"rgba(197,61,61,0.12)":J>.7?"rgba(183,121,31,0.10)":J>0?"rgba(47,133,90,0.08)":"var(--surface)",ee=V===0?"transparent":J>.95?"#c53d3d":J>.7?"#b7791f":J>0?"#2f855a":"var(--border)",Y=R===0?"#c53d3d":R===6?"#0F5B8D":"var(--text)",te=V>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${O>0?`パ${O}`:""}${F>0?`社${F}`:""}</span>`:"";_.push(`
      <div data-action="cal-toggle-day" data-date="${C}"
        style="min-height:44px;padding:3px;border:${W?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${oe};cursor:pointer;display:flex;flex-direction:column;
          ${W?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${Y};line-height:1;">${z}</span>
          ${te}
        </div>
        ${V>0?`
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${j>0?Z(j):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(J*100,100)}%;background:${ee};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const L=_.length%7;if(L>0)for(let C=0;C<7-L;C++)_.push('<div style="min-height:44px;"></div>');const k=s?y.get(s):null;s&&n.find(C=>C.date===s);const A=s&&k?(()=>{const C=k,T=parseInt(s.split("-")[2]),R=kn(s),z=Math.round(C.utilization*100),O=n.find(U=>U.date===s),F=s===new Date().toISOString().slice(0,10),V={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},j={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},J=C.items.map(U=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${V[U.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${U.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${j[U.productionType]??U.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${Z(U.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),W=`パ${C.partTimers}×${l.partCapacity} 社${C.employees}×${l.empCapacity} = ${Z(C.capacity)}本`,oe=C.totalQty>0?Math.ceil(C.totalQty/l.partCapacity):0,ee=[];if(C.totalQty>0)for(let U=0;U<=oe;U++){const K=C.totalQty-U*l.partCapacity;if(K<=0){ee.push({p:U,e:0});break}const ne=Math.ceil(K/l.empCapacity);ee.push({p:U,e:ne})}const Y=C.totalQty-C.capacity,te=C.totalQty===0?"":Y>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${Z(Y)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',be=ee.filter(U=>U.p+U.e>0).sort((U,K)=>U.p+U.e-(K.p+K.e)).slice(0,3),ye=C.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${Z(C.totalQty)}本を収めるには ${te}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${be.map((U,K)=>{const ne=U.p===C.partTimers&&U.e===C.employees;return`<button data-action="cal-apply-pattern" data-date="${s}" data-part="${U.p}" data-emp="${U.e}"
              style="font-size:11px;padding:4px 10px;border:1px solid ${ne?"#2f855a":"var(--border)"};
                border-radius:4px;background:${ne?"rgba(47,133,90,0.08)":"var(--surface)"};
                cursor:pointer;white-space:nowrap;${ne?"font-weight:600;":""}">
              パ${U.p}社${U.e}＝${U.p+U.e}人
              <span style="color:var(--text-secondary);margin-left:2px;">${Z(U.p*l.partCapacity+U.e*l.empCapacity)}本</span>
            </button>`}).join("")}
        </div>
      </div>
    `:"";return`
      <section class="panel" style="margin-top:12px;border:2px solid ${F?"#2f855a":"#0F5B8D"};">
        <div style="padding:12px 16px 8px;${F?"background:rgba(47,133,90,0.06);":""}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            ${F?'<span style="background:#2f855a;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;">TODAY</span>':""}
            <h2 style="margin:0;font-size:16px;">${T}日（${R}）${F?"":"の生産内訳"}</h2>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${W} ・ 稼働率${z}%</div>
          ${C.totalQty>0?`<div style="font-size:20px;font-weight:700;margin-top:6px;">${Z(C.totalQty)}<span style="font-size:13px;font-weight:400;">本</span> <span style="font-size:13px;font-weight:400;">/ ${C.items.length}品</span></div>`:""}
        </div>
        ${ye}
        <div style="display:flex;gap:12px;padding:0 4px 8px;flex-wrap:wrap;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="${O?.partTimers??0}"
              data-action="cal-shift-part" data-date="${s}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="${O?.employees??0}"
              data-action="cal-shift-emp" data-date="${s}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
        ${C.items.length>0?`
          <div style="padding:0 4px;">
            ${J}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${Z(C.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():s?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(s.split("-")[2])}日（${kn(s)}）— 休日</p>
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
  `:"",q=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(C=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${C.color};"></span>${C.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${b}</select>
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
      <div><strong>${Z(Math.round(v))}</strong>本 ÷ <strong>${E}</strong>稼働日 = 日当たり<strong>${Z(m)}</strong>本</div>
      <div>→ パ<strong>${i}</strong> 社<strong>${c}</strong>人日 ・ キャパ<strong>${Z(o)}</strong>本
        ${P<v?` <span style="color:#c53d3d;">（${Z(Math.round(v-P))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
      </div>
      <div style="color:var(--text-secondary);font-size:10px;">日付タップで稼働ON/OFF → 人数自動計算</div>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${q}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((C,T)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${T===0?"#c53d3d":T===6?"#0F5B8D":"var(--text-secondary)"};">${C}</div>`).join("")}
        ${_.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">日付タップで稼働ON/OFF</p>
    </section>

    ${A}

    <section class="panel" style="margin-top:12px;" id="cal-label-section">
      <div class="panel-header" style="padding-bottom:4px;">
        <div>
          <h2 style="font-size:14px;">ラベル対象商品</h2>
          <p class="panel-caption">区分ごとにまとめて外す or 個別に外せます${r.size>0?`（<strong>${r.size}</strong>品除外中 = ${Z(Math.round(w))}本）`:""}</p>
        </div>
        <button class="button primary" type="button" data-action="cal-save-exclusions"
          style="padding:6px 14px;font-size:12px;">設定を保存</button>
      </div>
      <div id="cal-label-list" style="max-height:500px;overflow-y:auto;">
        ${(()=>{const C=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],T=new Map;for(const R of e){if((R.plannedQty>0?R.plannedQty:Math.max(0,R.demandForecast+R.safetyStockTarget-R.openingStock))<=0)continue;const O=R.productionType||"monthly";T.has(O)||T.set(O,[]),T.get(O).push(R)}return C.filter(R=>T.has(R.key)).map(R=>{const z=T.get(R.key),O=z.reduce((W,oe)=>W+(oe.plannedQty>0?oe.plannedQty:Math.max(0,oe.demandForecast+oe.safetyStockTarget-oe.openingStock)),0),F=z.filter(W=>r.has(W.productCode)).length,V=F===z.length,j=F===0,J=z.map(W=>{const oe=W.plannedQty>0?W.plannedQty:Math.max(0,W.demandForecast+W.safetyStockTarget-W.openingStock),ee=r.has(W.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${ee?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${W.productCode}"
                    ${ee?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${ee?"text-decoration:line-through;":""}">${W.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${Z(Math.round(oe))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${R.key}"
                    ${V?"":"checked"} ${!j&&!V?'class="indeterminate"':""}
                    style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${R.color};flex-shrink:0;"></span>
                  <div style="flex:1;font-size:13px;font-weight:600;">${R.label}<span style="font-weight:400;color:var(--text-secondary);margin-left:6px;">${z.length}品 ${Z(Math.round(O))}本</span></div>
                  ${F>0&&!V?`<span style="font-size:11px;color:#b7791f;">${F}品除外</span>`:""}
                  ${V?'<span style="font-size:11px;color:var(--text-secondary);">全除外</span>':""}
                </div>
                ${J}
              </div>
            `}).join("")})()}
      </div>
    </section>
  `}function _d(e,t,n,s,r,l,d="all",p=null,u=[],y=null,v=new Set,g={partCapacity:st,empCapacity:ot}){const P=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(o=>`<button class="tab-button ${s===o.key?"active":""}"
       data-demand-tab="${o.key}">${o.label}</button>`).join("");let E="";if(s==="demand")E=e?fd(e,l):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(s==="safety")E=gd(t,p);else if(s==="plan")E=bd(n,r,d,p);else if(s==="calendar")try{E=xd(n,r,u,y,v,g)}catch(o){console.error("[renderCalendarTab] error:",o),E=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(o)}
${o?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${P}
    </div>

    ${E}
  `}const Oe={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Ie=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function se(e){return e.toLocaleString("ja-JP")}function pe(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function Ua(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function Sd(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function Ja(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function kd(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(i=>i.month))].sort(),n=Ie.filter(i=>e.some(c=>c.brewCategory===i)),s={};for(const i of e)s[i.month]||(s[i.month]={}),s[i.month][i.brewCategory]=i.shipmentMl;const r=820,l=300,d={top:20,right:20,bottom:50,left:70},p=r-d.left-d.right,u=l-d.top-d.bottom,y=t.map(i=>n.reduce((c,m)=>c+(s[i]?.[m]??0),0)),v=Math.max(...y,1),g=p/t.length,w=Math.max(g-8,14),P=[0,.25,.5,.75,1].map(i=>{const c=d.top+u-u*i,m=v*i/1e3;return`
      <line x1="${d.left}" y1="${c}" x2="${r-d.right}" y2="${c}" class="chart-grid" />
      <text x="6" y="${c+4}" class="chart-axis">${Math.round(m).toLocaleString("ja-JP")}L</text>
    `}).join(""),E=t.map((i,c)=>{let m=d.top+u;const h=d.left+c*g+(g-w)/2,b=n.map(A=>{const q=s[i]?.[A]??0,C=q/v*u;return m-=C,C>0?`<rect x="${h}" y="${m}" width="${w}" height="${C}" fill="${Oe[A]??"#9ca3af"}" opacity="0.85" rx="1"><title>${A}: ${pe(q)}L</title></rect>`:""}).join(""),[$,_]=i.split("-"),S=parseInt(_),L=S===10||c%2===0,k=S===10?`${$}年度`:`${S}月`;return`<g>${b}${L?`<text x="${h+w/2}" y="${l-12}" class="chart-axis centered-axis" style="font-size:10px;">${k}</text>`:""}</g>`}).join(""),o=n.map(i=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${Oe[i]??"#9ca3af"};"></span>
       ${i}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${l}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${P}${E}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${d.left}px;display:flex;flex-wrap:wrap;">${o}</div>
  `}function Pd(e,t,n,s){const r=new Map;for(const p of e){const u=p.brewCategory;r.has(u)||r.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const y=r.get(u);y.rows.push(p),y.totalMl+=p.totalShipmentMl,y.avgMl+=p.monthlyAvgMl,y.stockL=p.currentStockL}const l=new Map;for(const p of t)l.has(p.brewCategory)||l.set(p.brewCategory,[]),l.get(p.brewCategory).push(p);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${Ie.filter(p=>r.has(p)).map(p=>{const u=r.get(p),y=Oe[p]??"#9ca3af",v=Ja(p);l.get(p);const g=n[p]??{rawAlcoholPct:18,targetAlcoholPct:15},w=g.targetAlcoholPct>0?g.rawAlcoholPct/g.targetAlcoholPct:1;u.stockL*1e3;const P=u.totalMl,E=u.avgMl,o=P/1e3,i=Math.round(u.stockL*w*10)/10,c=i*1e3,m=E>0?Math.round(c/E*10)/10:0,h=i-o,b=E>0?Math.round(E*2/1e3*10)/10:0,$=i<b,_=Ua(m),S=Sd(m),L=Math.min(m/12*100,100),k=h>=0?"#22c55e":"#ef4444",A=h>=0?`+${se(Math.round(h))}L 余裕`:`${se(Math.round(h))}L 不足`,q=w>1.001;return`
        <div class="card" style="border-top:3px solid ${y};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${y};">${p}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${_}20;color:${_};font-weight:600;">${S}</span>
              <button class="btn-edit-stock" data-cat-id="${v}" data-cat="${p}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${v}">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;font-size:11px;margin-bottom:4px;">
              <div><span style="color:#6b7280;">原酒在庫</span><br><strong style="font-size:15px;">${se(u.stockL)}L</strong></div>
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${se(Math.round(o))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${pe(E)}L</strong></div>
            </div>
            ${q?`
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${se(i)}L</div>
                <div style="color:#6b7280;">${g.rawAlcoholPct}% → ${g.targetAlcoholPct}%（×${w.toFixed(2)}）・残<strong>${m.toFixed(1)}</strong>ヶ月</div>
              </div>
            `:""}
            ${(()=>{const C=s.filter(T=>T.parentCategory===p);return C.length===0?"":C.map(T=>{const z=t.filter(O=>O.brewCategory===T.name).reduce((O,F)=>O+F.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${T.name}</span>
                  ${z>0?`<span style="margin-left:4px;">${se(z)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${v}" style="display:none;margin-bottom:8px;">
            ${(()=>{const C=s.filter(O=>O.parentCategory===p),T=[{name:p,label:p},...C.map(O=>({name:O.name,label:O.name}))],R=T.flatMap(O=>t.filter(V=>V.brewCategory===O.name).map(V=>({...V,catLabel:O.label}))),z=T.map(O=>`<option value="${O.name}">${O.label}</option>`).join("");return`
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${R.map(O=>`
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                      <span style="font-size:11px;flex:1;min-width:60px;">${O.label||"タンク"}</span>
                      <strong style="font-size:13px;">${se(O.volumeL)}L</strong>
                      ${T.length>1?`
                        <select data-action="brew-reassign-entry" data-id="${O.id}"
                          style="font-size:10px;padding:1px 4px;border:1px solid var(--border);border-radius:3px;max-width:100px;">
                          ${T.map(F=>`<option value="${F.name}" ${F.name===O.brewCategory?"selected":""}>${F.label}</option>`).join("")}
                        </select>
                      `:`<span style="font-size:10px;color:var(--text-secondary);">${O.catLabel}</span>`}
                      <button data-action="brew-delete-entry" data-id="${O.id}" data-cat="${O.brewCategory}"
                        style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                    </div>
                  `).join("")||'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">タンクなし</div>'}
                </div>
                <div style="display:flex;gap:4px;align-items:center;margin-top:6px;flex-wrap:wrap;">
                  ${T.length>1?`<select id="new-entry-target-${v}" style="height:28px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">${z}</select>`:""}
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
            <span style="color:${k};font-weight:600;">年間比 ${A}</span>
            <span style="color:${$?"#ef4444":"#6b7280"};">安全在庫${se(b)}L${$?" ⚠下回り":" ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${q?"（加水後）":""}</span>
            <span style="font-weight:600;color:${_};">${m.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${_};height:100%;width:${L}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function Ed(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const r of e)t.has(r.brewCategory)||t.set(r.brewCategory,[]),t.get(r.brewCategory).push(r);const n=`
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
  `,s=[];for(const r of Ie){const l=t.get(r);if(!l)continue;const d=Oe[r]??"#9ca3af",p=l.length>1,u=l.reduce((i,c)=>i+c.totalShipmentQty,0),y=l.reduce((i,c)=>i+c.totalShipmentMl,0),v=l.reduce((i,c)=>i+c.monthlyAvgQty,0),g=l.reduce((i,c)=>i+c.monthlyAvgMl,0),w=l.reduce((i,c)=>i+c.productCount,0),P=l[0].currentStockL,E=g>0?Math.round(P*1e3/g*10)/10:0,o=Ua(E);if(s.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${p?"pointer":"default"};" ${p?`data-toggle-cat="${r}"`:""}>
        <td style="color:${d};">
          ${p?`<span class="toggle-icon" data-cat="${r}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${r}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${w}</td>
        <td style="text-align:right;">${se(u)}</td>
        <td style="text-align:right;">${pe(y)}</td>
        <td style="text-align:right;">${se(v)}</td>
        <td style="text-align:right;">${pe(g)}</td>
        <td style="text-align:right;">${se(P)}</td>
        <td style="text-align:right;color:${o};font-weight:700;">${E.toFixed(1)}</td>
      </tr>
    `),p)for(const i of l)s.push(`
          <tr class="sub-row-${Ja(r)}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${i.subCategory}</td>
            <td style="text-align:right;">${i.productCount}</td>
            <td style="text-align:right;">${se(i.totalShipmentQty)}</td>
            <td style="text-align:right;">${pe(i.totalShipmentMl)}</td>
            <td style="text-align:right;">${se(i.monthlyAvgQty)}</td>
            <td style="text-align:right;">${pe(i.monthlyAvgMl)}</td>
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
  `}function Ad(e,t,n,s,r,l={}){const d={html:"",needByCategory:{}};if(e.length===0)return d;const p={},u=new Date,y=u.getMonth()+1,v=y>=10?u.getFullYear():u.getFullYear()-1,g=v+1,w=new Map;for(const A of e)w.has(A.brewCategory)||w.set(A.brewCategory,new Map),w.get(A.brewCategory).set(A.fy,{shipL:A.shipmentL,annualL:A.annualizedL});const P=new Map;for(const A of r)P.has(A.brewCategory)||P.set(A.brewCategory,new Map),P.get(A.brewCategory).set(A.monthNum,A.avgMonthlyL);const E=[...new Set(e.map(A=>A.fy))].sort(),o=[...w.keys()].sort((A,q)=>{const C=[...Ie,...s.map(T=>T.name)];return(C.indexOf(A)===-1?99:C.indexOf(A))-(C.indexOf(q)===-1?99:C.indexOf(q))}),i=[];for(let A=y;A<=9;A++)i.push(A);if(y>=10)for(let A=1;A<=9;A++)i.push(A);const c=E.filter(A=>A<v),m=E.includes(v),h=o.map(A=>{const q=w.get(A);E.filter(G=>q.has(G));const C=Oe[A]??"#6366f1",T=P.get(A)??new Map,R=c.filter(G=>q.has(G)).map(G=>q.get(G).shipL);let z=0;if(R.length>=2){const G=[];for(let we=1;we<R.length;we++)R[we-1]>0&&G.push((R[we]-R[we-1])/R[we-1]);z=G.length>0?G.reduce((we,rt)=>we+rt,0)/G.length:0}const O=R.length>0?R[R.length-1]:q.get(v)?.annualL??0,F=i.reduce((G,we)=>G+(T.get(we)??0),0),V=t.filter(G=>G.brewCategory===A).reduce((G,we)=>G+we.volumeL,0),j=n[A],J=j&&j.targetAlcoholPct>0?j.rawAlcoholPct/j.targetAlcoholPct:1,W=Math.round(V*J),oe=Math.max(0,W-Math.round(F)),ee=A in l,Y=ee?l[A]:z,te=Math.round(Y*100),be=Math.round(O*(1+Y)),ye=Math.max(0,be-oe);p[A]=ye;const U=te>0?"#22c55e":te<0?"#ef4444":"#6b7280",K=Math.round(z*100),ne=q.get(v)?.annualL??0;return`
      <tr>
        <td style="color:${C};font-weight:600;white-space:nowrap;">${A}</td>
        ${c.map(G=>`<td style="text-align:right;">${q.has(G)?se(Math.round(q.get(G).shipL)):"—"}</td>`).join("")}
        ${m?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${se(Math.round(ne))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${te}"
            data-action="brew-growth-edit" data-cat="${A}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${ee?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${U};font-weight:600;${ee?"background:rgba(37,99,235,0.06);":""}"
            title="${ee?`手動設定（自動: ${R.length>=2?K+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${se(W)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${se(Math.round(F))}</td>
        <td style="text-align:right;font-weight:600;">${se(oe)}</td>
        <td style="text-align:right;">${se(be)}</td>
        <td style="text-align:right;color:${ye>0?"#ef4444":"#22c55e"};font-weight:700;">${ye>0?se(ye):"余裕"}</td>
      </tr>
    `}).join("");let b=0,$=0,_=0,S=0,L=0;for(const A of o){const q=w.get(A),C=P.get(A)??new Map,T=c.filter(Y=>q.has(Y)).map(Y=>q.get(Y).shipL);let R=0;if(T.length>=2){const Y=[];for(let te=1;te<T.length;te++)T[te-1]>0&&Y.push((T[te]-T[te-1])/T[te-1]);R=Y.length>0?Y.reduce((te,be)=>te+be,0)/Y.length:0}const z=T.length>0?T[T.length-1]:q.get(v)?.annualL??0,O=t.filter(Y=>Y.brewCategory===A).reduce((Y,te)=>Y+te.volumeL,0),F=n[A],V=F&&F.targetAlcoholPct>0?F.rawAlcoholPct/F.targetAlcoholPct:1,j=Math.round(O*V),J=i.reduce((Y,te)=>Y+(C.get(te)??0),0),W=Math.max(0,j-Math.round(J)),oe=A in l?l[A]:R,ee=Math.round(z*(1+oe));b+=j,$+=Math.round(J),_+=W,S+=ee,L+=Math.max(0,ee-W)}const k=y<=9?`${y}月〜9月`:`${y}月〜翌9月`;return{needByCategory:p,html:`
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
              ${c.map(A=>`<th style="text-align:right;">${A}(L)</th>`).join("")}
              ${m?`<th style="text-align:right;">${v}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${k}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${g}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${h}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${c.map(()=>"<td></td>").join("")}
              ${m?"<td></td>":""}
              <td></td>
              <td style="text-align:right;">${se(b)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${se($)}</td>
              <td style="text-align:right;">${se(_)}</td>
              <td style="text-align:right;">${se(S)}</td>
              <td style="text-align:right;color:#ef4444;">${se(L)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}}function Cd(e,t,n,s,r){if(e.length===0)return"";const l=new Date,d=l.getMonth()+1,p=l.getFullYear(),u=[];let y=d,v=p;for(let c=0;c<4;c++){const m=[];for(let $=0;$<3;$++)m.push({y:v,m:y}),y++,y>12&&(y=1,v++);const h=`${m[0].y}/${m[0].m}`,b=`${m[2].y}/${m[2].m}`;u.push({label:`${h}-${b}`,months:m})}const g=new Map;for(const c of n)g.has(c.brewCategory)||g.set(c.brewCategory,new Map),g.get(c.brewCategory).set(c.monthNum,c.avgMonthlyL);const w=new Map;for(const c of e)w.has(c.brewCategory)||w.set(c.brewCategory,c.currentStockL);for(const c of r){const m=t.filter(h=>h.brewCategory===c.name).reduce((h,b)=>h+b.volumeL,0);m>0&&w.set(c.name,m)}const P=new Map;for(const c of r)P.has(c.parentCategory)||P.set(c.parentCategory,[]),P.get(c.parentCategory).push(c);const E=[];for(const c of Ie){(w.has(c)||(g.get(c)?.size??0)>0)&&E.push({cat:c,isChild:!1});for(const m of P.get(c)??[])(w.has(m.name)||(g.get(m.name)?.size??0)>0)&&E.push({cat:m.name,isChild:!0})}function o(c,m){const h=s[c],b=h&&h.targetAlcoholPct>0?h.rawAlcoholPct/h.targetAlcoholPct:1;let $=(w.get(c)??0)*b;const _=g.get(c)??new Map,S=Oe[c]??(m?"#6366f1":"#9ca3af");let L="";const k=[];for(const A of u){const q=A.months.reduce((z,{m:O})=>z+(_.get(O)??0),0),C=$;$=Math.max(0,$-q),C>0&&$<=0&&!L&&(L=A.label);const R=$<=0?"#ef4444":$<q?"#eab308":"#22c55e";k.push(`<td style="text-align:right;padding:4px 6px;color:${R};font-weight:${$<=0?"700":"400"};">${$>0?se(Math.round($)):"枯渇"}</td>`)}return`
      <tr style="${m?"background:rgba(99,102,241,0.02);":""}">
        <td style="color:${S};font-weight:${m?"500":"600"};padding:4px 6px;white-space:nowrap;${m?"padding-left:20px;font-size:11px;":""}">${m?"┗ ":""}${c}</td>
        <td style="text-align:right;padding:4px 6px;">${se(Math.round((w.get(c)??0)*b))}</td>
        ${k.join("")}
        <td style="padding:4px 6px;font-size:11px;color:${L?"#ef4444":"#22c55e"};font-weight:600;">
          ${L?`⚠ ${L}`:"12ヶ月+"}
        </td>
      </tr>
    `}const i=E.map(({cat:c,isChild:m})=>o(c,m)).join("");return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 8px 0;">四半期別 在庫枯渇予測</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 10px;">現在庫（加水後）から季節出荷を差し引いた残量推移</p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th style="padding:4px 6px;">区分</th>
              <th style="text-align:right;padding:4px 6px;">現在庫(L)</th>
              ${u.map(c=>`<th style="text-align:right;padding:4px 6px;font-size:10px;">${c.label}</th>`).join("")}
              <th style="padding:4px 6px;">枯渇時期</th>
            </tr>
          </thead>
          <tbody>${i}</tbody>
        </table>
      </div>
    </div>
  `}function Ld(e,t,n){const s=new Map;for(const d of e){s.has(d.brewCategory)||s.set(d.brewCategory,{avgMl:0,totalMl:0,stockL:d.currentStockL});const p=s.get(d.brewCategory);p.avgMl+=d.monthlyAvgMl,p.totalMl+=d.totalShipmentMl}for(const d of n){const p=t.filter(u=>u.brewCategory===d.name).reduce((u,y)=>u+y.volumeL,0);(p>0||s.has(d.name))&&(s.has(d.name)?s.get(d.name).stockL=p:(s.get(d.parentCategory),s.set(d.name,{avgMl:0,totalMl:0,stockL:p})))}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${[...Ie,...n.map(d=>d.name)].filter(d=>s.has(d)&&(s.get(d).stockL>0||s.get(d).totalMl>0)).map(d=>{const p=s.get(d),u=p.avgMl>0?Math.round(p.stockL*1e3/p.avgMl*10)/10:0,y=p.totalMl/1e3,v=y>0?Math.round(p.stockL/y*100):0,g=n.some(i=>i.name===d),w=Oe[d]??(g?"#6366f1":"#9ca3af"),P=p.avgMl>0?Ua(u):p.stockL>0?"#22c55e":"#9ca3af",E=p.avgMl>0?Math.min(u/12*100,100):p.stockL>0?100:0,o=p.avgMl>0?`${u.toFixed(1)}ヶ月 / 年間の${v}%`:`${se(p.stockL)}L在庫`;return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:100px;font-size:12px;font-weight:500;color:${w};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${d}">${g?"┗ ":""}${d}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${P};height:100%;width:${E}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">${o}</span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${p.stockL>0?"var(--text)":"#ef4444"};">${se(p.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function Dd(e,t,n,s,r){if(e.length===0)return"";const l=n.map(g=>g.name);[...Ie,...l];const d=new Map;for(const g of n)d.has(g.parentCategory)||d.set(g.parentCategory,[]),d.get(g.parentCategory).push(g);const p=new Map;for(const g of e)p.has(g.brewCategory)||p.set(g.brewCategory,[]),p.get(g.brewCategory).push(g);for(const g of l)p.has(g)||p.set(g,[]);const u=new Set;for(const g of n)for(const w of p.get(g.name)??[])u.add(w.productCode);const y=new Map;for(const g of Ie)y.set(g,p.get(g)??[]);const v=Ie.filter(g=>p.has(g)).map(g=>{const w=p.get(g)??[],P=Oe[g]??"#9ca3af",E=d.get(g)??[],o=E.length>0,i=w.reduce((k,A)=>k+A.annualMl,0),c=w.reduce((k,A)=>k+A.monthlyAvgMl,0),m=w.filter(k=>!u.has(k.productCode)),h=m.filter(k=>!t.has(k.productCode)),b=h.reduce((k,A)=>k+A.annualMl,0),$=h.reduce((k,A)=>k+A.monthlyAvgMl,0),_=m.filter(k=>t.has(k.productCode)),S=m.map(k=>{const A=t.has(k.productCode);return`
          <tr style="${A?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${o?`<input type="checkbox" ${A?"":"checked"} data-action="brew-move-to-child" data-code="${k.productCode}" data-parent="${g}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${A?"color:#b7791f;":""}" title="${k.productName}">
              ${k.productName}${A?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${k.subCategory}</td>
            <td style="text-align:right;">${pe(k.annualMl)}</td>
            <td style="text-align:right;">${pe(k.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),L=E.map(k=>{const A=p.get(k.name)??[],q=A.reduce((V,j)=>V+j.annualMl,0),C=A.reduce((V,j)=>V+j.monthlyAvgMl,0),T=r.filter(V=>V.brewCategory===k.name),R=T.reduce((V,j)=>V+j.volumeL,0),z=Ja(k.name),O=A.map(V=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${V.productCode}" data-cat="${k.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${V.productName}"><strong>${V.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${V.subCategory}</td>
            <td style="text-align:right;">${pe(V.annualMl)}</td>
            <td style="text-align:right;">${pe(V.monthlyAvgMl)}</td>
          </tr>
        `).join(""),F=_.filter(V=>!A.some(j=>j.productCode===V.productCode)).map(V=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${V.productCode}" data-cat="${k.name}"
                  style="cursor:pointer;" />
              </td>
              <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${V.productName}">${V.productName}</td>
              <td style="font-size:11px;color:var(--text-secondary);">${V.subCategory}</td>
              <td style="text-align:right;color:var(--text-secondary);">${pe(V.annualMl)}</td>
              <td style="text-align:right;color:var(--text-secondary);">${pe(V.monthlyAvgMl)}</td>
            </tr>
          `).join("");return`
          <tr><td colspan="5" style="padding:0;">
            <div style="border-left:3px solid #6366f1;margin:8px 0 8px 16px;padding:6px 0 6px 12px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <strong style="font-size:12px;color:#6366f1;">${k.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${A.length}品 ・ ${pe(q)}L/年${R>0?` ・ 在庫${se(R)}L`:""}</span>
                <button class="btn-edit-stock" data-cat-id="${z}" data-cat="${k.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${k.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${z}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${T.map(V=>`
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${V.label||"タンク"}</span>
                    <strong style="font-size:11px;">${se(V.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${V.id}" data-cat="${k.name}"
                      style="font-size:9px;padding:1px 4px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">×</button>
                  </div>
                `).join("")}
                <div style="display:flex;gap:3px;align-items:center;margin-top:3px;">
                  <input id="new-entry-label-${z}" type="text" placeholder="名前" style="width:70px;height:22px;font-size:10px;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <input id="new-entry-vol-${z}" type="number" min="0" placeholder="L" style="width:50px;height:22px;font-size:10px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <button data-action="brew-add-entry" data-cat="${k.name}" data-cat-id="${z}"
                    style="font-size:9px;padding:2px 6px;border:none;border-radius:3px;background:#0F5B8D;color:#fff;cursor:pointer;">追加</button>
                </div>
                <button class="btn-cancel-stock" data-cat-id="${z}" style="font-size:9px;padding:2px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;margin-top:3px;">閉じる</button>
              </div>
              ${O.length>0||F.length>0?`
                <table class="data-table" style="font-size:11px;margin:0;">
                  <tbody>
                    ${O}
                    ${F}
                  </tbody>
                  ${A.length>0?`<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${pe(q)}</td><td style="text-align:right;">${pe(C)}</td>
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
              全${w.length}銘柄 ・ 年間${pe(i)}L
              ${o?`（内 ${E.map(k=>`${k.name}:${(p.get(k.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${o?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${S}
                ${L}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${pe(i)}</td><td style="text-align:right;">${pe(c)}</td></tr>
                ${o?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${pe(b)}</td><td style="text-align:right;">${pe($)}</td></tr>`:""}
                ${_.length>0?`<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${_.length}品</td>
                  <td style="text-align:right;">${pe(_.reduce((k,A)=>k+A.annualMl,0))}</td>
                  <td style="text-align:right;">${pe(_.reduce((k,A)=>k+A.monthlyAvgMl,0))}</td></tr>`:""}
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
            ${Ie.filter(g=>g!=="その他").map(g=>`<option value="${g}">${g}</option>`).join("")}
          </select>
          <input id="brew-new-category-name" type="text" placeholder="新しい区分名"
            style="font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;width:120px;" />
          <button data-action="brew-add-category" class="button primary"
            style="font-size:12px;padding:4px 12px;">追加</button>
        </div>
      </div>
      ${v}
    </div>
  `}function qd(e,t,n,s=[],r=new Set,l=[],d={},p=[],u={},y=[],v=[],g={},w={}){const P=new Date,E=P.getMonth()>=9?P.getFullYear():P.getFullYear()-1,o=Array.from({length:5},(c,m)=>{const h=E-m;return`<option value="${h}" ${h===n?"selected":""}>${h}年度 (${h}/10-${h+1}/9)</option>`}).join(""),i=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return i||`
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div>
          <h2 style="margin:0;font-size:18px;">醸造計画</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;">特定名称酒区分別の出荷実績と在庫状況</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <label for="brewing-fy-select" style="font-size:13px;font-weight:500;">会計年度:</label>
          <select id="brewing-fy-select" class="input" style="width:auto;min-width:200px;">
            ${o}
          </select>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:14px;margin:0 0 8px 0;">月次移出推移（区分別）</h3>
        ${kd(t)}
      </div>

      ${Pd(e,p,u,l)}

      ${Ad(y,p,u,l,v,g).html}

      ${Ld(e,p,l)}

      ${Cd(e,p,v,u,l)}

      ${Dd(s,r,l,d,p)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${Ed(e)}
      </div>
    </section>
  `}const sa={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Id=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"],Fe=[10,11,12,1,2,3,4,5,6,7,8,9],oa=["10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月","9月"];function ae(e){return e.toLocaleString("ja-JP")}function Td(e,t,n,s=[],r=2026,l=[],d=[],p={}){const y=[...new Set([...Object.keys(e).filter(k=>e[k]>0),...s.filter(k=>k.plannedVolumeL>0).map(k=>k.brewCategory)])];if(y.length===0)return'<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>';const v=[...Id,...n.map(k=>k.name)];y.sort((k,A)=>(v.indexOf(k)===-1?99:v.indexOf(k))-(v.indexOf(A)===-1?99:v.indexOf(A)));const g={polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0},w=new Map;for(const k of s)w.has(k.brewCategory)||w.set(k.brewCategory,[]),w.get(k.brewCategory).push(k);const P=(k,A,q,C,T)=>`<input type="number" step="${T}" value="${q}" data-action="brew-rice-edit" data-cat="${A}" data-field="${k}"
        style="width:${C};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`,E=(k,A,q)=>`<select data-action="brew-rice-variety-select" data-cat="${A}" data-field="${k}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${l.map(C=>`<option value="${C.name}" ${C.name===q?"selected":""}>${C.name}${C.region?` (${C.region})`:""}</option>`).join("")}
      ${!l.some(C=>C.name===q)&&q?`<option value="${q}" selected>${q}</option>`:""}
    </select>`;let o=0,i=0,c=0,m=0;const h=Fe.map(()=>0),b=new Map,$=y.map(k=>{const A=e[k]??0,q=t[k]??g,C=sa[k]??"#6366f1",T=w.get(k)??[],R=k in p,z=T.reduce((ne,G)=>ne+G.plannedVolumeL,0),O=T.length>0,F=R?p[k]:O?z:A,V=q.alcoholAdditionRatio??0,j=F*(1-V),J=Math.round(j*q.ricePerLiterKg),W=Math.round(J*q.kojiRatio),oe=J-W,ee=Math.round(W/q.polishingRatio),Y=Math.round(oe/q.polishingRatio),te=ee+Y,be=Math.round(ee*q.kojiPricePerKg),ye=Math.round(Y*q.kakePricePerKg);o+=ee,i+=Y,c+=be,m+=ye;for(const[ne,G,we,rt]of[[q.kojiVariety,ee,q.kojiPricePerKg,"麹米"],[q.kakeVariety,Y,q.kakePricePerKg,"掛米"]]){if(G<=0)continue;b.has(ne)||b.set(ne,{brownKg:0,pricePerKg:we,cost:0,usage:[]});const Ne=b.get(ne);Ne.brownKg+=G,Ne.cost+=Math.round(G*we),Ne.pricePerKg=Math.round(Ne.cost/Ne.brownKg),Ne.usage.push({cat:k,type:rt,kg:G})}const U=Fe.map(()=>0);if(T.length>0)for(const ne of T){const G=Fe.indexOf(ne.brewMonth);G>=0&&(U[G]+=ne.plannedVolumeL)}else{const ne=F/12;for(let G=0;G<12;G++)U[G]=ne}const K=U.reduce((ne,G)=>ne+G,0)||1;for(let ne=0;ne<12;ne++){const G=U[ne]/K;h[ne]+=Math.round(te*G)}return`
      <div class="card" style="border-top:3px solid ${C};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${C};">${k}</h4>
          <div style="font-size:12px;">${F>0?`予算 <strong>¥${ae(be+ye)}</strong>`:'<span style="color:#6b7280;font-weight:600;">醸造しない</span>'}</div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(F)}"
              data-action="proc-edit-vol" data-cat="${k}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid ${R?"#2563eb":"var(--border)"};border-radius:4px;padding:0 4px;font-weight:600;${R?"background:rgba(37,99,235,0.04);":""}" />L
          </label>
          ${V>0?`<span style="color:var(--text-secondary);">−${Math.round(V*100)}%→${ae(Math.round(j))}L</span>`:""}
          ${A>0&&Math.abs(A-F)>10?`<span style="color:var(--text-secondary);font-size:11px;">(予測${ae(Math.round(A))})</span>`:""}
          ${T.length>0?T.map(ne=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${C}12;color:${C};">${ne.brewMonth}月</span>`).join(""):""}
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${P("ricePerLiterKg",k,q.ricePerLiterKg,"48px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${P("kojiRatio",k,q.kojiRatio,"44px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${P("polishingRatio",k,q.polishingRatio,"44px","0.01")}</label>
          ${V>0||k==="本醸造"||k==="普通酒"?`<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${P("alcoholAdditionRatio",k,q.alcoholAdditionRatio??0,"44px","0.01")}</label>`:""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${E("kojiVariety",k,q.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${P("kojiPricePerKg",k,q.kojiPricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${ae(ee)}kg</strong> <span style="color:var(--text-secondary);">(${(ee/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${ae(be)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${E("kakeVariety",k,q.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${P("kakePricePerKg",k,q.kakePricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${ae(Y)}kg</strong> <span style="color:var(--text-secondary);">(${(Y/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${ae(ye)}</div>
          </div>
        </div>
      </div>
    `}).join(""),_=o+i,S=c+m,L=Math.max(...h,1);return Fe.map((k,A)=>{const q=h[A];return`
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${q/L*100}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${q>0?2:0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${oa[A]}</div>
        <div style="font-size:10px;font-weight:600;">${q>0?ae(q):""}</div>
        <div style="font-size:9px;color:var(--text-secondary);">${q>0?(q/60).toFixed(0)+"俵":""}</div>
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
      <div class="panel-header"><h2>年間タイムライン</h2><p class="panel-caption">米入荷と醸造の月別スケジュール</p></div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:11px;min-width:600px;">
          <thead>
            <tr>
              <th style="width:90px;text-align:left;padding:4px;">区分/品種</th>
              ${oa.map(k=>`<th style="text-align:center;padding:4px;min-width:40px;">${k}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${(()=>{const k=[],A=new Map;for(const q of d)q.deliveryMonth&&(A.has(q.varietyName)||A.set(q.varietyName,[]),A.get(q.varietyName).push(q.deliveryMonth));for(const[q,C]of A){const T=Fe.map(R=>{const z=C.includes(R),O=d.filter(F=>F.varietyName===q&&F.deliveryMonth===R).reduce((F,V)=>F+V.committedBales,0);return`<td style="text-align:center;padding:3px;${z?"background:#dcfce7;":""}">
                    ${z?`<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${O}俵</div>`:""}
                  </td>`}).join("");k.push(`<tr><td style="padding:4px;color:#16a34a;font-weight:500;">📥 ${q}</td>${T}</tr>`)}for(const q of y){const C=w.get(q)??[];if(C.length===0)continue;const T=sa[q]??"#6366f1",R=Fe.map(z=>{const O=C.find(F=>F.brewMonth===z);return`<td style="text-align:center;padding:3px;${O?`background:${T}12;`:""}">
                    ${O?`<div style="font-size:9px;font-weight:600;color:${T};">${ae(Math.round(O.plannedVolumeL))}L</div>`:""}
                  </td>`}).join("");k.push(`<tr><td style="padding:4px;color:${T};font-weight:500;">🍶 ${q}</td>${R}</tr>`)}return k.join("")||'<tr><td colspan="13" style="text-align:center;color:var(--text-secondary);padding:12px;">スケジュール・入荷予定を登録すると表示されます</td></tr>'})()}
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(()=>{const k=y.map(q=>{const C=t[q]??g,T=w.get(q)??[],R=q in p,z=T.reduce((W,oe)=>W+oe.plannedVolumeL,0),O=T.length>0,F=R?p[q]:O?z:e[q]??0,V=F*(1-(C.alcoholAdditionRatio??0)),j=Math.round(V*C.ricePerLiterKg),J=Math.round(j/C.polishingRatio);return{cat:q,brewingL:F,brownKg:J,color:sa[q]??"#6366f1"}}).filter(q=>q.brewingL>0||q.brownKg>0),A=Math.max(...k.map(q=>q.brownKg),1);return k.map(q=>{const C=Math.min(q.brownKg/A*100,100);return`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="width:90px;font-size:11px;font-weight:500;color:${q.color};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${q.cat}</span>
              <div style="flex:1;background:#e5e7eb;border-radius:3px;height:20px;overflow:hidden;position:relative;">
                <div style="background:${q.color};opacity:0.7;height:100%;width:${C}%;border-radius:3px;"></div>
                <span style="position:absolute;top:2px;left:6px;font-size:10px;font-weight:600;color:#374151;">${ae(q.brownKg)}kg (${Math.ceil(q.brownKg/60)}俵)</span>
              </div>
              <span style="width:60px;font-size:10px;text-align:right;color:var(--text-secondary);">${ae(Math.round(q.brewingL))}L</span>
            </div>
          `}).join("")})()}
    </section>

    ${$}

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
            ${[...b.entries()].sort((k,A)=>A[1].brownKg-k[1].brownKg).map(([k,A])=>{const q=(A.brownKg/60).toFixed(1),C=A.usage.map(T=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${T.type==="麹米"?"rgba(99,102,241,0.08)":"rgba(183,121,31,0.08)"};margin-right:3px;">${T.cat}/${T.type} ${ae(T.kg)}kg</span>`).join("");return`
                <tr>
                  <td style="font-weight:600;">${k}</td>
                  <td style="text-align:right;font-weight:600;">${ae(A.brownKg)}</td>
                  <td style="text-align:right;">${q}</td>
                  <td style="text-align:right;">¥${ae(A.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${ae(A.cost)}</td>
                  <td style="max-width:300px;overflow-x:auto;">${C}</td>
                </tr>
              `}).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              <td style="text-align:right;">${ae(_)}</td>
              <td style="text-align:right;">${Math.ceil(_/60)}</td>
              <td></td>
              <td style="text-align:right;">¥${ae(S)}</td>
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
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${ae(o)}kg</strong> <span style="color:var(--text-secondary);">(${(o/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${ae(c)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${ae(i)}kg</strong> <span style="color:var(--text-secondary);">(${(i/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${ae(m)}</div>
        </div>
        <div style="background:var(--surface-alt);border-radius:8px;padding:14px;border:2px solid var(--border);">
          <div style="font-size:11px;font-weight:600;">総合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${ae(_)}kg</strong> <span style="color:var(--text-secondary);">(${Math.ceil(_/60)}俵)</span></div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">¥${ae(S)}<span style="font-size:13px;font-weight:400;margin-left:4px;">(${(S/1e4).toFixed(0)}万)</span></div>
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
      ${(()=>{const k=new Map;for(const[O,F]of b)k.set(O,F.brownKg);const A=new Map;for(const O of d){A.has(O.varietyName)||A.set(O.varietyName,{bales:0,kg:0,cost:0,suppliers:[]});const F=A.get(O.varietyName);F.bales+=O.committedBales,F.kg+=O.committedBales*60,F.cost+=O.committedBales*60*O.pricePerKg,O.supplier&&!F.suppliers.includes(O.supplier)&&F.suppliers.push(O.supplier)}const q=[...new Set([...k.keys(),...A.keys()])];let C=0,T=0;const R=q.map(O=>{const F=k.get(O)??0,V=A.get(O),j=V?.kg??0,J=j-F;C+=j,T+=F;const W=J>=0?"#22c55e":"#ef4444",oe=J>=0?`+${ae(Math.round(J))}kg余裕`:`${ae(Math.round(J))}kg不足`,ee=j>0?Math.min(F/j*100,100):0;return`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${O}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${ae(Math.round(j))}kg (${V?.bales??0}俵)</span>
                  <span>必要 ${ae(Math.round(F))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${ee}%;background:${j>0?J>=0?"#22c55e":"#ef4444":"#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${W};">${j>0?oe:"未確保"}</span>
            </div>
          `}).join(""),z=C-T;return`
          <div style="margin-bottom:12px;">
            ${R||'<p style="color:var(--text-secondary);text-align:center;padding:12px;">作付け予定が未登録です</p>'}
          </div>
          ${C>0?`
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;padding:8px;background:var(--surface-alt);border-radius:6px;">
              <span>確保合計: <strong>${ae(Math.round(C))}kg</strong> (${Math.ceil(C/60)}俵)</span>
              <span>必要合計: <strong>${ae(Math.round(T))}kg</strong></span>
              <span style="color:${z>=0?"#22c55e":"#ef4444"};font-weight:600;">
                ${z>=0?`余裕 ${ae(Math.round(z))}kg`:`不足 ${ae(Math.round(-z))}kg`}
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
              ${Fe.map((O,F)=>`<option value="${O}">${oa[F]}</option>`).join("")}
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
  `}function $a(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function Nd(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ys(e){return e?Jt.find(t=>t.value===e)?.label??e:""}function Md(e){const t=[],n=[],s=[];for(const r of e){const l=r.amount_last_year_same_month>0?r.amount_this_month/r.amount_last_year_same_month:1,d={code:r.customer_code,name:r.customer_name,businessType:r.business_type,areaCode:r.area_code,phone:r.phone,lastOrderDate:r.last_order_date,daysSinceLastOrder:r.days_since_order,totalAmountLast12m:r.amount_12m,amount3m:r.amount_3m,amountThisMonth:r.amount_this_month,amountLastYearSameMonth:r.amount_last_year_same_month,annualRevenue:r.annual_revenue,yoyRatio:l,status:"dormant"};r.is_at_risk?t.push({...d,status:"at-risk"}):r.is_dormant?n.push({...d,status:"dormant"}):r.amount_last_year_same_month>0&&l<.8&&s.push({...d,status:"declining"})}return t.sort((r,l)=>l.totalAmountLast12m-r.totalAmountLast12m),n.sort((r,l)=>l.daysSinceLastOrder-r.daysSinceLastOrder),s.sort((r,l)=>r.yoyRatio-l.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:s}}function Rd(e,t){const n=t?.reason??"",s=Jt.map(r=>`<option value="${r.value}" ${n===r.value?"selected":""}>${r.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${s}
    </select>`}function Od(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],s=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',r=!!t?.actionedAt,l=r?'style="opacity:0.45;"':"",d=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${Ys(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${r?"1":"0"}" ${l}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${d}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${s}
      <td class="numeric">${$a(e.totalAmountLast12m)}</td>
      <td>${Rd(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${r?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function ra(e,t,n,s,r,l,d,p){if(r.length===0)return"";const u=r.map(y=>Od(y,p.get(y.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${s}" style="margin-right:8px;">${r.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${Nd(l)}</p>
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
    </section>`}function jd(e,t=[]){const{atRiskCustomers:n,dormantCustomers:s,decliningCustomers:r}=e,l=n.length+s.length+r.length,d=n.reduce((i,c)=>i+c.totalAmountLast12m,0),p=s.reduce((i,c)=>i+c.totalAmountLast12m,0),u=r.reduce((i,c)=>i+c.totalAmountLast12m,0),y=[...n,...s,...r],v=[...new Set(y.map(i=>i.areaCode).filter(Boolean))].sort(),g=[...new Set(y.map(i=>i.businessType).filter(Boolean))].sort(),w=new Map(t.map(i=>[i.customerCode,i])),P=t.filter(i=>i.actionedAt).length,E=new Map;t.forEach(i=>{i.reason&&E.set(i.reason,(E.get(i.reason)??0)+1)});const o=[...E.entries()].sort((i,c)=>c[1]-i[1]).slice(0,5).map(([i,c])=>`<span class="status-pill info" style="font-size:0.75rem;">${Ys(i)} ${c}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${$a(d)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${s.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${$a(p)} 相当</div>
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

    ${o?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${o}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${l})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${s.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${r.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${v.map(i=>`<option value="${i}">${i}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${g.map(i=>`<option value="${i}">${i}</option>`).join("")}
      </select>
    </div>

    ${ra("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,d,"状況",w)}
    ${ra("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",s,p,"経過日数",w)}
    ${ra("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",r,u,"前年同月比",w)}

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
    <\/script>`}const Re=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],xa={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},Me={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function Bd(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function zd(e){const t=e.reduce((l,d)=>l+d,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const s=Math.max(...e);return e.filter(l=>l>s*.1).length<=6?"seasonal":"year-round"}function Fd(e){const t=e.reduce((l,d)=>l+d,0);if(t===0)return[];const s=t/12*1.5,r=[];for(let l=0;l<12;l++)e[l]>s&&r.push(l);if(r.length===0){const l=Math.max(...e);l>0&&r.push(e.indexOf(l))}return r.sort((l,d)=>l-d)}function Vd(e){return e.length===0?0:(e[0]-2+12)%12}function En(e){const t=new Date().getMonth(),n=e.map(r=>{const l=zd(r.monthlyQuantity),d=Fd(r.monthlyQuantity),p=Vd(d);return{code:r.code,name:r.name,category:r.category,peakMonths:d,proposalStartMonth:p,seasonType:l,monthlyQuantity:r.monthlyQuantity}}),s=[];for(let r=0;r<12;r++){const l=n.filter(d=>{if(d.peakMonths.length===0)return!1;const p=d.proposalStartMonth,u=d.peakMonths[0];return p<=u?r>=p&&r<=u:r>=p||r<=u});s.push({month:r,products:l,targetCustomers:[]})}return{products:n,proposals:s,selectedMonth:t}}function Yd(e){const{products:t,proposals:n,selectedMonth:s}=e,r=new Date().getMonth(),l={"year-round":[],seasonal:[],"year-end":[]};t.forEach(g=>l[g.seasonType].push(g));const d=n[s],p=t.length,u=d?.products.length??0,y=t.filter(g=>g.peakMonths.includes(s)).length,v=d?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${Re[s]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${Re[s]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${y}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${v}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${Re.map((g,w)=>{const P=w===r,E=w===s;return`<button class="button" style="padding:4px 10px;background:${E?"#0F5B8D":P?"#e2e8f0":"transparent"};color:${E?"#fff":"#333"};border:${P&&!E?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${w}">${g}${P?" ●":""}</button>`}).join("")}
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
            ${Re.map((g,w)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${w===r?"background:#f0f7ff;":""}">${g.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${Ud(l,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${Jd(l,s)}

  <!-- Target customer list for selected month -->
  ${Qd(d)}
</div>`}function Ud(e,t){const n=[],s=["year-round","seasonal","year-end"];for(const r of s){const l=e[r];if(l.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${Me[r]}15;color:${Me[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${xa[r]}</span>
    </td></tr>`);for(const d of l){const p=Re.map((u,y)=>{const v=d.peakMonths.includes(y),g=Us(d,y),w=y===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let P="transparent";v?P=Me[d.seasonType]:g&&(P=Me[d.seasonType]+"40");const E=v||g?`background:${P};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${w}"><div style="${E}" title="${v?"ピーク":g?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${d.name}"><span class="mono" style="font-size:0.7rem;color:#888">${d.code}</span> ${d.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${Me[d.seasonType]}15;color:${Me[d.seasonType]}">${xa[d.seasonType]}</span></td>
        ${p}
      </tr>`)}}}return n.join("")}function Us(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,s=e.peakMonths[0];return n<=s?t>=n&&t<s:t>=n||t<s}function Jd(e,t){const s=["year-round","seasonal","year-end"].map(r=>{const l=e[r];if(l.length===0)return"";const d=l.filter(u=>u.peakMonths.includes(t)||Us(u,t));if(d.length===0)return"";const p=d.map(u=>{const v=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',g=u.monthlyQuantity.reduce((w,P)=>w+P,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${v}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${g.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map(w=>Re[w]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${Me[r]}15;color:${Me[r]}">${xa[r]}</span>
        <span style="font-size:0.85rem;color:#666">${Re[t]}の対象: ${d.length}品</span>
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
    </div>`}).filter(Boolean);return s.length===0?`<div style="padding:1rem;color:#666;text-align:center">${Re[t]}に提案対象の商品はありません</div>`:s.join("")}function Qd(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${Bd(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const Hd=["日","月","火","水","木","金","土"];function Kd(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n-1,1),r=new Date(t,n,0),l=[];for(let d=0;d<s.getDay();d++)l.push({outside:!0});for(let d=1;d<=r.getDate();d++)l.push({date:`${e}-${String(d).padStart(2,"0")}`});for(;l.length%7!==0;)l.push({outside:!0});return l}function Gd(e,t,n){const[s,r]=t.split("-").map(Number),l=new Date(s,r-2,1),d=new Date(s,r,1),p=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}`,u=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,y=new Date().toISOString().slice(0,10),g=Kd(t).map(o=>{if(o.outside)return'<div class="sc-cell sc-outside"></div>';const i=o.date,c=Number(i.split("-")[2]),m=new Date(`${i}T00:00:00`).getDay(),h=e?.[i],b=i===y,$=i===n;let _="",S="";return h&&(_=`<span class="sc-badge">${h.count}件</span>`,S=h.cityGroups.slice(0,3).map(L=>`<span class="sc-city-tag">${L.city}<em>${L.count}</em></span>`).join(""),h.cityGroups.length>3&&(S+=`<span class="sc-city-more">+${h.cityGroups.length-3}</span>`)),`
      <div class="sc-cell ${b?"sc-today":""} ${$?"sc-selected":""} ${h?"sc-has-data":""}"
           data-sc-date="${i}">
        <div class="sc-day-header">
          <span class="sc-day-num ${m===0?"sc-sun":m===6?"sc-sat":""}">${c}</span>
          ${_}
        </div>
        <div class="sc-cities">${S}</div>
      </div>
    `}).join(""),w=n&&e?.[n]?Xd(e[n]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',P=Object.values(e??{}).reduce((o,i)=>o+i.count,0),E=Object.values(e??{}).reduce((o,i)=>o+i.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${P>0?`月計: <strong>${P}件</strong> / <strong>¥${E.toLocaleString()}</strong>`:""}
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
            ${Hd.map((o,i)=>`<div class="sc-weekday ${i===0?"sc-sun":i===6?"sc-sat":""}">${o}</div>`).join("")}
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
  `}function Xd(e){const t=e.date.replace(/-/g,"/").slice(5),n={};for(const r of e.entries)(n[r.city]??=[]).push(r);const s=Object.entries(n).sort((r,l)=>l[1].length-r[1].length).map(([r,l])=>{const d=l.sort((p,u)=>u.amount-p.amount).map(p=>`
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
  `}const Wd=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),ia=["月","火","水","木","金"],An=6;function Zd(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function ep(e,t){if(t.length===0)return 0;const n=[...t].sort((r,l)=>r-l);return n.filter(r=>r<=e).length/n.length}function tp(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function Cn(e){const t=new Date,n=e.map(u=>u.annualRevenue),s=e.map(u=>{const y=Zd(u.lastOrderDate,t);let v=0;const g=[];y>=60&&(v+=50,g.push("離反リスク")),u.hasSeasonalProposal&&(v+=30,g.push("季節提案タイミング")),y>=30&&y<60&&(v+=20,g.push("定期巡回"));const w=ep(u.annualRevenue,n),P=Math.round(w*20);P>0&&(v+=P,g.push("金額ウェイト"));const E=tp(g,y);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:v,reasons:g,lastOrderDate:u.lastOrderDate,daysSinceOrder:y,annualRevenue:u.annualRevenue,recommendedAction:E}}).filter(u=>u.priorityScore>0).sort((u,y)=>y.priorityScore-u.priorityScore),r=new Map;for(const u of s){const y=u.areaCode||"その他";r.has(y)||r.set(y,[]),r.get(y).push(u)}const l=[...r.entries()].sort((u,y)=>y[1].reduce((v,g)=>v+g.priorityScore,0)-u[1].reduce((v,g)=>v+g.priorityScore,0)),d=[];let p=0;for(const[u,y]of l){const v=y.sort((g,w)=>w.priorityScore-g.priorityScore);for(let g=0;g<v.length&&!(p>=ia.length);g+=An){const w=v.slice(g,g+An);d.push({dayLabel:ia[p],area:u,visits:w}),p++}if(p>=ia.length)break}return{candidates:s,weekPlan:d,filterArea:"",filterMinScore:0}}function ap(e){const{candidates:t,weekPlan:n,filterArea:s,filterMinScore:r}=e,l=t.filter(g=>!(s&&g.areaCode!==s||r>0&&g.priorityScore<r)),d=Array.from(new Set(t.map(g=>g.areaCode))).sort(),p=l.length,u=l.filter(g=>g.priorityScore>=50).length,y=l.filter(g=>g.reasons.includes("離反リスク")).length,v=n.reduce((g,w)=>g+w.visits.length,0);return`
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
      ${n.length===0?"<p>訪問候補がありません。</p>":np(n)}
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
            ${l.map(g=>sp(g)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function np(e){return`
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
  `}function sp(e){return`
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
      <td class="numeric">${Wd.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function op(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=e.map(y=>{const v=y.capacity>0?Math.round(y.currentVolume/y.capacity*100):0;return`
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
  `}function la(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function rp(e,t,n){const s=e.rows.map((y,v)=>`
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
        <td class="numeric"><strong>${la(y.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${v}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),r=e.deductions.map((y,v)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${v}" data-ded-field="type">
            ${Object.keys(ya).map(g=>`<option value="${g}" ${g===y.type?"selected":""}>${ya[g]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${v}" data-ded-field="categoryCode">
            ${ls.map(g=>`<option value="${g.code}" ${g.code===y.categoryCode?"selected":""}>${g.code}:${g.name}</option>`).join("")}
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
        <p class="kpi-value">${la(e.totalTax)}</p>
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
              <th class="numeric">${la(e.totalTax)}</th>
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
  `}const ip={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let Ve=null,lp=0;const _a=[];function cp(){return Ve&&document.body.contains(Ve)||(Ve=document.createElement("div"),Ve.className="toast-container",document.body.appendChild(Ve)),Ve}function M(e,t="success",n){const s=cp(),r=++lp,l=t==="error"?5e3:t==="warning"?4e3:3e3,d=document.createElement("div");d.className=`toast toast-${t}`,d.setAttribute("role","status"),d.setAttribute("aria-live","polite"),d.innerHTML=`
    <span class="toast-icon">${ip[t]}</span>
    <span class="toast-msg">${pp(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const p={id:r,message:e,type:t,el:d};_a.push(p),s.appendChild(d),requestAnimationFrame(()=>{d.classList.add("toast-enter")});const u=()=>dp(p);d.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{d.classList.add("toast-exit"),d.addEventListener("animationend",u,{once:!0})},l)}function dp(e){const t=_a.indexOf(e);t!==-1&&(_a.splice(t,1),e.el.remove())}function pp(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Se(e,t={}){const{title:n="確認",confirmLabel:s="OK",cancelLabel:r="キャンセル",variant:l="primary"}=t;return new Promise(d=>{const p=document.createElement("div");p.className="modal-backdrop confirm-backdrop",p.setAttribute("role","dialog"),p.setAttribute("aria-modal","true"),p.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${l}">
            ${l==="danger"?up:mp}
          </div>
          <h3 class="confirm-title">${qt(n)}</h3>
          <p class="confirm-message">${qt(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${qt(r)}</button>
          <button class="button ${l} confirm-ok">${qt(s)}</button>
        </div>
      </div>
    `;const u=v=>{p.classList.add("confirm-exit"),p.addEventListener("animationend",()=>{p.remove()},{once:!0}),d(v)};p.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),p.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),p.addEventListener("click",v=>{v.target===p&&u(!1)});const y=v=>{v.key==="Escape"&&(document.removeEventListener("keydown",y),u(!1))};document.addEventListener("keydown",y),document.body.appendChild(p),requestAnimationFrame(()=>{p.querySelector(".confirm-ok")?.focus()})})}const up=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,mp=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function qt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ln(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Sa(e,t,n){if(t.length===0&&(!n||n.length===0))return;const s=n&&n.length>0?n:Object.keys(t[0]??{}).map(y=>({key:y,label:y})),l=`\uFEFF${[s.map(y=>Ln(y.label)).join(","),...t.map(y=>s.map(v=>Ln(y[v.key])).join(","))].join(`\r
`)}`,d=new Blob([l],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(d),u=document.createElement("a");u.href=p,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(p),0)}const yp=Object.fromEntries(Jt.map(e=>[e.value,e.label])),hp=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan","/procurement"];let et=[];async function fp(){const{supabaseQueryAll:e}=await I(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>H);return{supabaseQueryAll:n}},void 0);et=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const Dn=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"},{path:"/procurement",title:"調達計画"}];function Js(e){const t=La[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function Qa(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function gp(){const e=Js("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const Ht=new Date,vp=Ht.toISOString().slice(0,7),bp=Ht.getFullYear(),wp=Ht.getMonth()+1,$p=Ht.toISOString().slice(0,10),xp="C0011",Ye=gp();function Qs(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return hp.includes(n)?n:"/"}function Ha(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":case"/procurement":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const qn=Qs(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:Qa(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:vp,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:bp,taxMonth:wp,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...ad,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...nd},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:$p,route:qn,currentCategory:Ha(qn),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:xp,salesPeriod:"month",customRange:{start:"",end:""},quoteState:Bt(fa()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCompanySettings:fa(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...Va},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:Ye.mode,emailRegion:Ye.region,emailHistorySegment:Ye.historySegment,emailTemplateId:Ye.templateId,emailSubject:Ye.subject,emailBody:Ye.body,emailSaveMessage:Ye.saveMessage,emailSending:!1,demandForecast:{...Ki},shipmentCalendarData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:Mt(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:st,empCapacity:ot},brewingSchedule:[],brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},riceVarieties:[],ricePurchaseCommitments:[],procurementDecisions:{},globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function In(e){return e.slice(0,10)}function _p(e){return{...e}}function Ft(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Hs(){a.invoiceForm=Qa(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},Ft()}function Ks(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,s)=>{n.productCode.trim()||(t[`lines.${s}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${s}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${s}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${s}.unitPrice`]="単価は0円以上で入力してください。")}),t}function Sp(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,_p(t))}function kp(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((s,r)=>{const l=r===0?1:2,d=1200*(r+1);return{productCode:s.code,productName:s.name,quantity:l,unitPrice:d,unit:"本",amount:l*d}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function Pp(e){const t=a.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Ep(e){const t=a.masterStats?.customers.find(n=>n.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Gs(e){if(De(e),a.invoiceErrors=Ks(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){x();return}a.invoiceSaving=!0,x(),Qn(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=Qa(),x()}).catch(()=>{a.invoiceSaving=!1,x()})}function Xs(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((s,r)=>new Date(r.date).getTime()-new Date(s.date).getTime()).filter(s=>{const r=new Date(s.date);return!(t&&r<t||n&&r>n)})}function Ws(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?et:et.filter(e=>e.area===a.emailRegion);case"history":return et.filter(e=>e.historySegment===a.emailHistorySegment);default:return et}}function Ap(){const e=Ws();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function ca(e){const t=Ws(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(s=>s.email),status:e}}function Ka(){return a.user,!1}function wt(){a.globalSearchOpen=!1,a.globalQuery=""}function Cp(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:Dn.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:Dn}}function Lp(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?Xs(a.salesSummary):[]).map(s=>({documentNo:s.documentNo,date:s.date,customerCode:s.customerCode,customerName:s.customerName,amount:s.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((s,r)=>r.balanceAmount-s.balanceAmount).map(s=>({...s})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(s=>({...s})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(s=>({...s})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(s=>({...s})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(s=>({...s})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(s=>({...s}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(s=>({...s}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Sa(n,e,t)}function da(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=Ha(e),a.sidebarOpen=!1,wt(),Ga(e)}async function Ga(e){a.actionLoading=!0,x();try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,x(),a.quoteList=await Fa(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:t}=await I(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>N);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await bt(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await Ia());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await Ta(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await I(async()=>{const{fetchShipmentCalendar:n}=await Promise.resolve().then(()=>N);return{fetchShipmentCalendar:n}},void 0);a.shipmentCalendarData=await t(a.shipmentCalendarYearMonth);break}case"/billing":a.billingSummary||(a.billingSummary=await Na(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Yt());break;case"/product-power":a.productPower.length===0&&(a.productPower=await Wn());break;case"/customer-efficiency":a.customerEfficiency=await ht(a.customerEfficiencyYear,a.customerEfficiencyGroupBy);break;case"/customer-analysis":a.customerAnalysis||(a.customerAnalysis=await Zn());break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await I(async()=>{const{fetchDemandForecasts:l,fetchDeliverySchedule:d}=await Promise.resolve().then(()=>N);return{fetchDemandForecasts:l,fetchDeliverySchedule:d}},void 0),[s,r]=await Promise.all([t(),n()]);a.demandForecast.forecasts=s.map(l=>({code:l.productCode,name:l.productName,segment:l.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(l.avgMonthly),adjustedAvg:Math.round(l.avgMonthly),nextMonthForecast:Math.round(l.forecastQuantity),annualForecast:Math.round(l.avgMonthly*12),safetyStock:Math.round(l.safetyStock)})),a.demandForecast.deliveries=Gi(r)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:n}=await I(async()=>{const{fetchChurnAlerts:s,fetchChurnNotes:r}=await Promise.resolve().then(()=>N);return{fetchChurnAlerts:s,fetchChurnNotes:r}},void 0);if(!a.churnAlert){const s=await t();a.churnAlert=Md(s)}a.churnNotes=await n();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await I(async()=>{const{fetchProductShipmentsFromTable:s}=await Promise.resolve().then(()=>N);return{fetchProductShipmentsFromTable:s}},void 0),n=await t();if(n.length>0)a.seasonalCalendar=En(n.map(s=>({code:s.code,name:s.name,category:"",monthlyQuantity:s.monthlyQuantity})));else{const{fetchProductMonthlyShipments:s}=await I(async()=>{const{fetchProductMonthlyShipments:l}=await Promise.resolve().then(()=>N);return{fetchProductMonthlyShipments:l}},void 0),r=await s();a.seasonalCalendar=En(r.map(l=>({code:l.code,name:l.name,category:"",monthlyQuantity:l.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:t}=await I(async()=>{const{fetchVisitPriorities:s}=await Promise.resolve().then(()=>N);return{fetchVisitPriorities:s}},void 0),n=await t();if(n.length>0)a.visitPlanner={candidates:n.map(s=>({code:s.customer_code,name:s.customer_name,phone:s.phone,address:s.address,areaCode:s.area_code,businessType:s.business_type,priorityScore:s.priority_score,reasons:s.reasons,lastOrderDate:s.last_order_date,daysSinceOrder:s.days_since_order,annualRevenue:s.annual_revenue,recommendedAction:s.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=Cn(n.map(s=>({code:s.customer_code,name:s.customer_name,phone:s.phone,address1:s.address,areaCode:s.area_code,businessType:s.business_type,annualRevenue:s.annual_revenue,lastOrderDate:s.last_order_date,hasSeasonalProposal:s.reasons.some(r=>r.includes("季節"))})));else{const{supabaseQueryAll:s}=await I(async()=>{const{supabaseQueryAll:u}=await Promise.resolve().then(()=>H);return{supabaseQueryAll:u}},void 0),[r,l]=await Promise.all([s("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):Da().then(u=>u.customers)]),d=a.masterStats?.customers??l,p=new Map;r.forEach(u=>{const y=u.legacy_customer_code||"",v=u.sales_date||"",g=Number(u.total_amount)||0,w=p.get(y);!w||v>w.lastDate?p.set(y,{lastDate:v,total:(w?.total??0)+g}):w.total+=g}),a.visitPlanner=Cn(d.filter(u=>u.isActive).map(u=>({code:u.code,name:u.name,phone:u.phone,address1:u.address1,areaCode:u.areaCode,businessType:u.businessType,annualRevenue:p.get(u.code)?.total??0,lastOrderDate:p.get(u.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:n,fetchProductionPlan:s,fetchLabelExclusions:r}=await I(async()=>{const{fetchDemandAnalysis:d,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}=await Promise.resolve().then(()=>N);return{fetchDemandAnalysis:d,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}},void 0);if(!a.demandAnalysis){const[d,p]=await Promise.all([t(a.demandYearsBack*12),n()]);a.demandAnalysis=d,a.safetyStockParams=p}if(a.productionPlan.length===0){const d=await s(a.demandPlanYearMonth);d.length>0?a.productionPlan=d:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=buildPlanFromAnalysis(a.demandPlanYearMonth))}const l=await r(a.demandPlanYearMonth);if(a.calendarLabelExcluded=new Set(l),a.productionPlan.length>0){const d=a.productionPlan.filter(p=>!a.calendarLabelExcluded.has(p.productCode));Le(a.calendarShifts,d,a.calendarCapacity)}break}case"/procurement":case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:n,fetchBrewingSchedule:s,fetchBrewingProductDetail:r,fetchBrewingCustomCategories:l,fetchBrewingCategoryOverrides:d,fetchAllBrewingStockEntries:p,fetchCategoryTypeLinks:u,fetchAvailableProductionTypes:y,fetchBrewingAlcoholSettings:v,fetchBrewingYearlyShipments:g,fetchBrewingSeasonalPattern:w,fetchBrewingForecastOverrides:P,fetchBrewingRiceParams:E,fetchRiceVarieties:o,fetchRicePurchaseCommitments:i,fetchProcurementDecisions:c}=await I(async()=>{const{fetchBrewingPlanSummary:oe,fetchBrewingMonthlyTrend:ee,fetchBrewingSchedule:Y,fetchBrewingProductDetail:te,fetchBrewingCustomCategories:be,fetchBrewingCategoryOverrides:ye,fetchAllBrewingStockEntries:U,fetchCategoryTypeLinks:K,fetchAvailableProductionTypes:ne,fetchBrewingAlcoholSettings:G,fetchBrewingYearlyShipments:we,fetchBrewingSeasonalPattern:rt,fetchBrewingForecastOverrides:Ne,fetchBrewingRiceParams:to,fetchRiceVarieties:ao,fetchRicePurchaseCommitments:no,fetchProcurementDecisions:so}=await Promise.resolve().then(()=>N);return{fetchBrewingPlanSummary:oe,fetchBrewingMonthlyTrend:ee,fetchBrewingSchedule:Y,fetchBrewingProductDetail:te,fetchBrewingCustomCategories:be,fetchBrewingCategoryOverrides:ye,fetchAllBrewingStockEntries:U,fetchCategoryTypeLinks:K,fetchAvailableProductionTypes:ne,fetchBrewingAlcoholSettings:G,fetchBrewingYearlyShipments:we,fetchBrewingSeasonalPattern:rt,fetchBrewingForecastOverrides:Ne,fetchBrewingRiceParams:to,fetchRiceVarieties:ao,fetchRicePurchaseCommitments:no,fetchProcurementDecisions:so}},void 0),m=a.brewingPlanFY,h=`${m}-10-01`,b=`${m+1}-09-30`,[$,_,S,L,k,A,q,C,T,R,z,O,F,V,j,J,W]=await Promise.all([t(h,b).catch(()=>[]),n(h,b).catch(()=>[]),s(m).catch(()=>[]),r(h,b).catch(()=>[]),l().catch(()=>[]),d().catch(()=>({})),p().catch(()=>[]),u().catch(()=>({})),y().catch(()=>[]),v().catch(()=>({})),g().catch(()=>[]),w().catch(()=>[]),P().catch(()=>({})),E().catch(()=>({})),o().catch(()=>[]),i(m).catch(()=>[]),c(m).catch(()=>({}))]);a.brewingPlanData=$,a.brewingMonthlyTrend=_,a.brewingSchedule=S,a.brewingProductDetail=L,a.brewingCustomCategories=k,a.brewingOverrides=A,a.brewingStockEntries=q,a.brewingTypeLinks=C,a.brewingAvailableTypes=T,a.brewingYearlyShipments=z,a.brewingSeasonalPattern=O,a.brewingForecastOverrides=F,a.brewingRiceParams=V,a.riceVarieties=j,a.ricePurchaseCommitments=J,a.procurementDecisions=W,a.brewingAlcoholSettings=R;break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await ts());break;case"/tanks":a.tankList.length===0&&(a.tankList=await as());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await ns());break;case"/materials":a.materialList.length===0&&(a.materialList=await ma());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([ss(),os()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([rs(),is()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await Ra(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Oa(a.storeSalesDate),ds()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await I(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>N);return{fetchMailSenders:n}},void 0);if(a.mailSenders=await t(),!a.emailSenderId||!a.mailSenders.find(n=>n.id===a.emailSenderId)){const n=a.mailSenders.find(s=>s.isDefault)??a.mailSenders[0];n&&(a.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await I(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>N);return{fetchCalendarEvents:n}},void 0);a.calendarEvents=await t(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await I(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>N);return{fetchIntegrationSettings:n}},void 0);a.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchShopifyOrders:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>N);return{fetchShopifyOrders:s,fetchIntegrationSettings:r}},void 0);a.shopifyOrders=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchFaxInbox:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>N);return{fetchFaxInbox:s,fetchIntegrationSettings:r}},void 0);a.faxRecords=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/users":{const{fetchUserProfiles:t}=await I(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>N);return{fetchUserProfiles:n}},void 0);a.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:s}=await I(async()=>{const{fetchMyProfile:l,fetchAuditLogs:d,fetchMailSenders:p}=await Promise.resolve().then(()=>N);return{fetchMyProfile:l,fetchAuditLogs:d,fetchMailSenders:p}},void 0),r=a.user?.email??a.myProfile?.email??"";r&&(a.myProfile=await t(r)),a.mailSenders.length===0&&(a.mailSenders=await s()),a.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await I(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>N);return{fetchAuditLogs:n}},void 0);a.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await I(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>N);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:n}=await I(async()=>{const{fetchMapCustomers:l,fetchDeliveryLocations:d}=await Promise.resolve().then(()=>N);return{fetchMapCustomers:l,fetchDeliveryLocations:d}},void 0),[s,r]=await Promise.all([t(),n()]);a.mapCustomers=s,a.deliveryLocations=r}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchCallLogs:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>N);return{fetchCallLogs:s,fetchIntegrationSettings:r}},void 0);a.callLogs=await t(100),a.integrations.length===0&&(a.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchLeadLists:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>N);return{fetchLeadLists:s,fetchIntegrationSettings:r}},void 0);a.leadLists=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await I(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>N);return{fetchWorkflowOrdersFromDb:n}},void 0);a.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await I(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>N);return{fetchTourInquiriesFromDb:n}},void 0);a.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:s}=await I(async()=>{const{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>N);return{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:d}},void 0);a.slackRules=await t(),a.slackLogs=await n(50),a.integrations.length===0&&(a.integrations=await s())}break;case"/":{const{fetchProspects:t,fetchCalendarEvents:n,fetchWorkflowOrdersFromDb:s,fetchTourInquiriesFromDb:r,fetchOrderHeaders:l}=await I(async()=>{const{fetchProspects:d,fetchCalendarEvents:p,fetchWorkflowOrdersFromDb:u,fetchTourInquiriesFromDb:y,fetchOrderHeaders:v}=await Promise.resolve().then(()=>N);return{fetchProspects:d,fetchCalendarEvents:p,fetchWorkflowOrdersFromDb:u,fetchTourInquiriesFromDb:y,fetchOrderHeaders:v}},void 0);a.prospects.length===0&&(a.prospects=await t()),a.calendarEvents.length===0&&(a.calendarEvents=await n(a.calendarYearMonth)),a.materialList.length===0&&(a.materialList=await ma()),a.workflowOrders.length===0&&(a.workflowOrders=await s()),a.tourInquiries.length===0&&(a.tourInquiries=await r()),a.orderHeaders.length===0&&(a.orderHeaders=await l())}break;default:break}}catch(t){console.error("Route data load error:",e,t),M(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{a.actionLoading=!1,x()}}function Tn(){if(Ka())return zl(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return xt("sales");case"/cat/brewery":return xt("brewery");case"/cat/purchase":return xt("purchase");case"/cat/more":return xt("more");case"/invoice-entry":return ml(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/quote":return a.quoteEditId===null?bl(a.quoteList,a.quoteListLoading):Ls(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return $l(a.quoteCompanySettings);case"/email":return cl(Ap());case"/delivery":return a.deliveryNote?il(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return Gd(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate);case"/billing":return a.billingSummary?Fi(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?$c(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Cl(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return Ll(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy);case"/customer-analysis":return a.customerAnalysis?uc(a.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return el(a.demandForecast);case"/demand":return _d(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return qd(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/procurement":{const e={};if(a.brewingYearlyShipments.length>0){const t=new Date,n=t.getMonth()+1,s=n>=10?t.getFullYear():t.getFullYear()-1,r=[...new Set(a.brewingYearlyShipments.map(u=>u.fy))].filter(u=>u<s).sort(),l=new Map;for(const u of a.brewingSeasonalPattern)l.has(u.brewCategory)||l.set(u.brewCategory,new Map),l.get(u.brewCategory).set(u.monthNum,u.avgMonthlyL);const d=[];for(let u=n;u<=9;u++)d.push(u);if(n>=10)for(let u=1;u<=9;u++)d.push(u);const p=new Map;for(const u of a.brewingYearlyShipments)p.has(u.brewCategory)||p.set(u.brewCategory,new Map),p.get(u.brewCategory).set(u.fy,{shipL:u.shipmentL,annualL:u.annualizedL});for(const[u,y]of p){const v=r.filter(_=>y.has(_)).map(_=>y.get(_).shipL);let g=0;if(v.length>=2){const _=[];for(let S=1;S<v.length;S++)v[S-1]>0&&_.push((v[S]-v[S-1])/v[S-1]);g=_.length>0?_.reduce((S,L)=>S+L,0)/_.length:0}const w=u in a.brewingForecastOverrides?a.brewingForecastOverrides[u]:g,P=v.length>0?v[v.length-1]:y.get(s)?.annualL??0,E=l.get(u)??new Map,o=d.reduce((_,S)=>_+(E.get(S)??0),0),i=a.brewingStockEntries.filter(_=>_.brewCategory===u).reduce((_,S)=>_+S.volumeL,0),c=a.brewingAlcoholSettings[u],m=c&&c.targetAlcoholPct>0?c.rawAlcoholPct/c.targetAlcoholPct:1,h=Math.round(i*m),b=Math.max(0,h-Math.round(o)),$=Math.round(P*(1+w));e[u]=Math.max(0,$-b)}}return Td(e,a.brewingRiceParams,a.brewingCustomCategories,a.brewingSchedule,a.brewingPlanFY,a.riceVarieties,a.ricePurchaseCommitments,a.procurementDecisions)}case"/churn-alert":return a.churnAlert?jd(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?Yd(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?ap(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/jikomi":return a.jikomiView==="calendar"?`${pn(a.jikomiList,a.jikomiView)}${Ol(a.jikomiList)}`:pn(a.jikomiList,a.jikomiView);case"/tanks":return op(a.tankList);case"/kentei":return jl(a.kenteiList);case"/materials":return Zl(a.materialList)+Wl(a.materialEditing,a.materialEditingIsNew);case"/purchase":return sc(a.purchaseList,a.payableList);case"/raw-material":return oc(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?rp(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return kc(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?lc(a.pipelineMeta,ve,re,a.syncDashboard):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return ud(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return Ec(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return id(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return Cc(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapCustomers.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>':Lc(a.mapCustomers,a.deliveryLocations,a.mapFilters);case"/workflow":return Ic(a.workflowOrders);case"/mobile-order":return Tc(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return Mc(a.tourInquiries,a.tourActiveId);case"/mail-senders":return jc(a.mailSenders,a.mailSenderEditingId);case"/calendar":return Bc(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return Fc(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return Vc(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Yc(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/users":return Uc(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return Jc(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return Qc(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return Hc(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return Wc(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return Zc(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return td(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return Sc(Xs(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return ac([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return Xl(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return Il(a.invoiceRecords,a.invoiceFilter);case"/ledger":return Qi(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return Ms(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return qp();default:return nl(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function Dp(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(r=>!a.dismissedAnnouncements.has(r.id)).map(r=>{const l=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${l.bg};border-bottom:2px solid ${l.border};">
        <span class="announcement-text">${l.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),s=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+s}function qp(){function e(n,s,r,l){return`<a href="${`${"/".replace(/\/$/,"")||"/"}${n}`}" data-link="${n}" class="home-card">
      <span class="home-card-icon">${s}</span>
      <span class="home-card-label">${r}</span>
      <span class="home-card-desc">${l}</span>
    </a>`}const t=[{title:"販売業務",color:"#1a56db",cards:[e("/invoice-entry","📝","伝票入力","売上・返品を入力"),e("/quote","📄","見積作成","見積書の作成・管理"),e("/invoice","🔍","伝票照会","過去伝票の照会"),e("/delivery","🚚","納品書","納品書の発行"),e("/billing","💳","月次請求","請求書・入金管理"),e("/ledger","📒","得意先台帳","取引履歴の確認")].join("")},{title:"分析・レポート",color:"#7e3af2",cards:[e("/analytics","📊","売上分析","期間・商品・得意先別"),e("/customer-analysis","👥","得意先分析","ABC分析・ランク"),e("/product-power","📦","商品力分析","商品別販売力"),e("/customer-efficiency","⚡","営業効率","訪問効率・コスト"),e("/report","📈","集計帳票","各種集計帳票"),e("/sales","📋","売上一覧","売上明細一覧")].join("")},{title:"営業・顧客管理",color:"#0e9f6e",cards:[e("/churn-alert","🎯","営業アクション","離反リスク・フォロー"),e("/visit-planner","📅","訪問計画","訪問スケジュール"),e("/map","🗺️","取引先マップ","地図で取引先を確認"),e("/prospects","🌱","新規営業","新規開拓の進捗"),e("/email","✉️","メール配信","一斉メール配信"),e("/seasonal-calendar","🌸","季節提案","季節別提案管理")].join("")},{title:"受注・仕入",color:"#e3a008",cards:[e("/workflow","🔄","受注ワークフロー","受注から出荷まで"),e("/shopify","🛒","Shopify注文","EC受注の確認"),e("/purchase","📥","仕入・買掛","仕入管理・買掛金"),e("/payment","💰","入金状況","入金・回収状況")].join("")},{title:"製造管理",color:"#e02424",cards:[e("/jikomi","🍶","仕込管理","仕込帳・製造記録"),e("/tanks","🛢️","タンク管理","タンク在庫の管理"),e("/tax","📋","酒税申告","酒税申告書の作成"),e("/demand","📆","需要・生産計画","需要予測・生産計画"),e("/brewing-plan","🗓️","醸造計画","年間醸造スケジュール"),e("/procurement","🌾","調達計画","原料米の調達・予算")].join("")},{title:"マスタ・設定",color:"#6b7280",cards:[e("/master","⚙️","マスタ管理","商品・得意先マスタ"),e("/store","🏪","店舗・直売所","直売所の販売管理"),e("/tour","🏯","酒蔵見学","見学予約の管理"),e("/setup","🔗","連動設定","酒仙iとの連動"),e("/import","📤","データ取込","CSVデータ取込"),e("/users","👤","ユーザー管理","アカウント管理")].join("")}];return`
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
  `}function Ip(){if(Ka())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${Tn()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/procurement":"調達計画","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",s=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?pl(a.masterStats.customers,a.pickerQuery):nc(a.masterStats.products,a.pickerQuery):"",r=a.globalSearchOpen?dl(a.globalQuery,Cp()):"",l=a.user?`<span class="app-header-user">${a.user.email}</span>
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
      ${Dp()}
      <main class="main-v2">
        <div class="view ${a.actionLoading?"is-busy":""}">${Tn()}</div>
        <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
      </main>
      ${s}
      ${r}
    </div>
  `}async function Tp(){a.actionLoading=!0,x();try{const{fetchSalesSummary:e}=await I(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>N);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,x()}}async function Np(e){a.actionLoading=!0,x();try{a.invoiceRecords=await bt(e)}finally{a.actionLoading=!1,x()}}async function Mp(e){a.actionLoading=!0,x();try{a.customerLedger=await qa(e)}finally{a.actionLoading=!1,x()}}function De(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,n)=>{const s=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:s,unitPrice:r,amount:s*r}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function Ue(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function Rp(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,x()}),e.querySelectorAll("[data-action='global-search-close']").forEach(o=>{o.addEventListener("click",i=>{o.classList.contains("global-search")&&i.target instanceof HTMLElement&&!i.target.classList.contains("global-search")||(wt(),x())})}),e.querySelector("#global-search-input")?.addEventListener("input",o=>{a.globalQuery=o.target.value,x()}),e.querySelectorAll("[data-action='global-nav']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.path;i&&(wt(),da(i))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{Lp()}),e.querySelectorAll("[data-jikomi-tab]").forEach(o=>{o.addEventListener("click",()=>{a.jikomiView=o.dataset.jikomiTab,x()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const o=e.querySelector("#auth-email")?.value.trim()??"",i=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,x(),co(o,i).then(async c=>{a.user=c,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:h}=await I(async()=>{const{fetchMyProfile:b,recordAudit:$}=await Promise.resolve().then(()=>N);return{fetchMyProfile:b,recordAudit:$}},void 0);a.myProfile=await m(c.email),await h({action:"sign_in",userEmail:c.email}),x()}).catch(async c=>{try{const m=await Wa(o,i);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:h}=await I(async()=>{const{fetchMyProfile:b}=await Promise.resolve().then(()=>N);return{fetchMyProfile:b}},void 0);a.myProfile=await h(m.email)}catch{a.authError=c instanceof Error?c.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,x()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,x()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{po().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,x()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(o=>{o.addEventListener("click",()=>{a.sidebarOpen=!1,x()})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let o=0;t.addEventListener("touchstart",i=>{o=i.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",i=>{i.changedTouches[0].clientX-o<-60&&(a.sidebarOpen=!1,x())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.id??"";a.dismissedAnnouncements.add(i),x()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelectorAll("[data-link]").forEach(o=>{o.addEventListener("click",i=>{i.preventDefault(),da(o.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async o=>{o.preventDefault();const i=e.querySelector("#fr-title")?.value??"",c=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",h=e.querySelector("#fr-result");if(!i.trim())return;const b=await Kn(i,c,m);if(h&&(h.textContent=b?"送信しました":"送信に失敗しました",h.className=`fr-result ${b?"success":"error"}`),b){const $=e.querySelector("#feature-request-form");$&&$.reset()}}),e.querySelectorAll("[data-period]").forEach(o=>{o.addEventListener("click",()=>{a.salesPeriod=o.dataset.period,x()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const o=e.querySelector("#range-start")?.value??"",i=e.querySelector("#range-end")?.value??"";o&&i&&(a.customRange={start:o,end:i},a.salesPeriod="custom",x())}),e.querySelectorAll("[data-edit-customer]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.editCustomer??"",c=a.masterStats?.customers.find(h=>h.id===i);if(!c)return;const m=document.createElement("div");m.innerHTML=Fl(c),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),$=document.getElementById("ec-trade-type")?.value||null,_=await Gn(i,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,trade_type:$,manual_override:!0});b&&(b.textContent=_?"保存しました":"保存に失敗",b.className=`fr-result ${_?"success":"error"}`),_&&(document.getElementById("edit-modal")?.remove(),tt())})})}),e.querySelectorAll("[data-edit-product]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.editProduct??"",c=a.masterStats?.products.find(h=>h.id===i);if(!c)return;const m=document.createElement("div");m.innerHTML=Vl(c),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),$=await Xn(i,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});b&&(b.textContent=$?"保存しました":"保存に失敗",b.className=`fr-result ${$?"success":"error"}`),$&&(document.getElementById("edit-modal")?.remove(),tt())})})}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=Bt(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,x()}),e.querySelectorAll("[data-open-quote]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.openQuote,c=await ws(i);if(!c){M("見積の読み込みに失敗しました","error");return}a.quoteState={id:c.id,quoteNo:c.quote_no,quoteDate:c.quote_date,validUntil:c.valid_until??"",customerCode:c.legacy_customer_code??"",customerName:c.customer_name,customerAddress:c.customer_address,subject:c.subject,lines:c.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:c.remarks,taxRate:c.tax_rate,deliveryDate:c.delivery_date,paymentTerms:c.payment_terms,deliveryPlace:c.delivery_place,templateType:c.template_type??"sake",previewMode:!1},a.quoteEditId=i,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,x()})}),e.querySelectorAll("[data-delete-quote]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.deleteQuote,c=o.dataset.quoteNo??i;if(!await Se(`見積 ${c} を削除しますか？`))return;await Nn("quotes",i)?(a.quoteList=a.quoteList.filter(b=>b.id!==i),M("削除しました","success"),x()):M("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,x(),Fa().then(o=>{a.quoteList=o,a.quoteListLoading=!1,x()})}),e.querySelectorAll("[name='q-template']").forEach(o=>{o.addEventListener("change",()=>{a.quoteState.templateType=o.value,x()})});function n(o){return(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function s(o){return o.length?o.map(i=>`<button class="search-item" type="button" data-select-customer="${n(i.code)}" data-cust-name="${n(i.name)}" data-cust-addr="${n(i.address1||"")}"><span class="mono">${n(i.code)}</span><span style="font-size:13px;font-weight:600;">${n(i.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function r(o){o.querySelectorAll("[data-select-customer]").forEach(i=>{i.addEventListener("click",async()=>{const c=i.dataset.selectCustomer??"";a.quoteState.customerCode=c,a.quoteState.customerName=i.dataset.custName??"",a.quoteState.customerAddress=i.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),o.remove(),a.quotePricing=await ua(a.masterStats?.customers??[],c),x()})})}function l(o){const i=e.querySelector("#q-cust-search")?.closest(".form-row");if(!i)return;let c=document.getElementById("cust-search-results");c||(c=document.createElement("div"),c.id="cust-search-results",c.className="search-results",i.after(c));const m=a.masterStats?.customers??[],h=o.trim().toLowerCase(),b=h.length===0?m:m.filter($=>$.name.includes(o)||$.kanaName.includes(o)||$.code.includes(o)||$.name.toLowerCase().includes(h)||$.kanaName.toLowerCase().includes(h));c.innerHTML=s(b),r(c)}function d(o,i){return o.length?o.map(c=>{const m=i?Ma(c,i):{price:c.salePrice||0,label:"卸価格"},h=c.listPrice||0,b=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${n(c.code)}" data-prod-name="${n(c.name)}" data-prod-price="${m.price}" data-prod-retail="${h}" data-prod-jan="${n(c.janCode??"")}" data-prod-unit="${n(c.unit)}" data-prod-case="${c.caseQty??""}"><span class="mono">${n(c.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${n(c.name)}</span><span class="numeric"${b?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${n(m.label)})</small>${h?`　定価 ¥${h.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function p(o){o.querySelectorAll("[data-add-product]").forEach(i=>{i.addEventListener("click",()=>{const c=i.dataset.addProduct??"",m=i.dataset.prodName??"",h=parseInt(i.dataset.prodPrice??"0"),b=parseInt(i.dataset.prodRetail??"0")||null,$=i.dataset.prodJan??"",_=i.dataset.prodUnit||"本",S=i.dataset.prodCase??"",L=S?parseInt(S):null;a.quoteState.lines.push({productCode:c,productName:m,janCode:$,caseQty:L,quantity:1,unit:_,unitPrice:h,retailPrice:b,amount:h}),a.quoteProductQuery="";const k=e.querySelector("#q-prod-search");k&&(k.value=""),x()})})}function u(o){const i=e.querySelector("#q-prod-search")?.closest(".form-row");if(!i)return;let c=document.getElementById("prod-search-results");if(c||(c=document.createElement("div"),c.id="prod-search-results",c.className="search-results",i.after(c)),!a.masterStats){c.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,h=o.trim().toLowerCase(),b=h.length===0?m:m.filter($=>$.name.includes(o)||$.kanaName.includes(o)||$.code.includes(o)||$.name.toLowerCase().includes(h)||$.kanaName.toLowerCase().includes(h));c.innerHTML=d(b,a.quotePricing),p(c)}function y(o,i){let c=null;function m(){c||(c=h=>{const b=document.getElementById(i);if(!b){document.removeEventListener("touchstart",c),document.removeEventListener("mousedown",c),c=null;return}o.contains(h.target)||b.contains(h.target)||(b.remove(),document.removeEventListener("touchstart",c),document.removeEventListener("mousedown",c),c=null)},document.addEventListener("touchstart",c,{passive:!0}),document.addEventListener("mousedown",c))}return m}(function(){const o=e.querySelector("#q-cust-search");if(!o)return;const i=y(o,"cust-search-results");o.addEventListener("focus",()=>{l(o.value),i()}),o.addEventListener("compositionend",()=>{a.quoteCustomerQuery=o.value,l(o.value)}),o.addEventListener("input",c=>{c.isComposing||(a.quoteCustomerQuery=o.value,l(o.value))}),o.value&&l(o.value)})(),(function(){const o=e.querySelector("#q-prod-search");if(!o)return;const i=y(o,"prod-search-results");o.addEventListener("focus",()=>{u(o.value),i()}),o.addEventListener("compositionend",()=>{a.quoteProductQuery=o.value,u(o.value)}),o.addEventListener("input",c=>{c.isComposing||(a.quoteProductQuery=o.value,u(o.value))}),o.value&&u(o.value)})(),e.querySelectorAll("[data-select-customer]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.selectCustomer??"";a.quoteState.customerCode=i,a.quoteState.customerName=o.dataset.custName??"",a.quoteState.customerAddress=o.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await ua(a.masterStats?.customers??[],i),x()})}),e.querySelector("#q-price-type")?.addEventListener("change",o=>{const i=o.target.value;a.quoteState.manualPriceType=i,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:i}:a.quotePricing={priceType:i,priceGroup:"",individualPrices:new Map},x()}),e.querySelectorAll("[data-add-product]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.addProduct??"",c=o.dataset.prodName??"",m=parseInt(o.dataset.prodPrice??"0"),h=parseInt(o.dataset.prodRetail??"0")||null,b=o.dataset.prodJan??"",$=o.dataset.prodUnit||"本",_=o.dataset.prodCase??"",S=_?parseInt(_):null;a.quoteState.lines.push({productCode:i,productName:c,janCode:b,caseQty:S,quantity:1,unit:$,unitPrice:m,retailPrice:h,amount:m}),a.quoteProductQuery="",x()})}),(()=>{const o=e.querySelector("#q-prospect-search");if(!o)return;const i=y(o,"q-prospect-results");function c(m){let h=document.getElementById("q-prospect-results");if(!h)return;const b=m.trim(),$=b.length===0?a.prospects.slice(0,8):a.prospects.filter(_=>_.companyName.includes(b)||(_.contactName??"").includes(b)).slice(0,8);if($.length===0){h.innerHTML="";return}h.className="search-results",h.innerHTML=$.map(_=>`<button class="search-item" type="button" data-select-prospect="${_.id}" data-prospect-name="${n(_.companyName)}" data-prospect-addr="${n(_.address??"")}"><span style="font-size:13px;font-weight:600;">${n(_.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${n(_.contactName??"")} ${_.address?"· "+_.address.slice(0,20):""}</span></button>`).join(""),h.querySelectorAll("[data-select-prospect]").forEach(_=>{_.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=_.dataset.prospectName??"",a.quoteState.customerAddress=_.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=_.dataset.selectProspect??"";const S=a.quoteState.manualPriceType??"";a.quotePricing={priceType:S,priceGroup:"",individualPrices:new Map},o.value="",h&&(h.innerHTML=""),x()})})}o.addEventListener("focus",()=>{c(o.value),i()}),o.addEventListener("input",m=>{m.isComposing||c(o.value)}),o.addEventListener("compositionend",()=>c(o.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const o=e.querySelector("#q-prospect-search")?.value.trim()??"",i=document.createElement("div");i.className="modal-backdrop",i.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",i.innerHTML=`
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
    `,document.body.appendChild(i),i.querySelector("#pq-company")?.focus();const c=()=>i.remove();i.addEventListener("click",m=>{m.target===i&&c()}),i.querySelector("#prospect-quick-close")?.addEventListener("click",c),i.querySelector("#prospect-quick-close2")?.addEventListener("click",c),i.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const m=(i.querySelector("#pq-company")?.value??"").trim();if(!m){M("会社名は必須です","warning");return}const h={id:`p_${Date.now()}`,companyName:m,contactName:i.querySelector("#pq-contact")?.value.trim()||void 0,address:i.querySelector("#pq-address")?.value.trim()||void 0,phone:i.querySelector("#pq-phone")?.value.trim()||void 0,note:i.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:b,fetchProspects:$}=await I(async()=>{const{saveProspect:L,fetchProspects:k}=await Promise.resolve().then(()=>N);return{saveProspect:L,fetchProspects:k}},void 0),_=await b(h);if(!_){M("登録失敗","error");return}a.prospects=await $(),a.quoteState.customerCode="",a.quoteState.customerName=_.companyName,a.quoteState.customerAddress=_.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=_.id;const S=a.quoteState.manualPriceType??"";a.quotePricing={priceType:S,priceGroup:"",individualPrices:new Map},c(),M(`${_.companyName} を見込み顧客として登録しました`,"success"),x()})});function v(){Pt(a.quoteState);const o=e.querySelector("#q-preview-scaler");if(!o)return;o.innerHTML=Ls(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const i=o.querySelector(".q-preview-doc"),c=o.parentElement?.clientWidth??0,m=i?.offsetWidth??0;if(c>0&&m>0&&m>c-24){const h=(c-24)/m;o.style.transform=`scale(${h})`,o.style.transformOrigin="top left",o.style.height=`${((i?.offsetHeight??0)+48)*h}px`}else o.style.transform="",o.style.height=""}for(const o of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${o}`)?.addEventListener("input",v);e.querySelector("#q-remarks")?.addEventListener("input",v),e.querySelectorAll(".qty-input").forEach(o=>{o.addEventListener("change",()=>{const i=parseInt(o.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.quantity=parseFloat(o.value)||0,c.amount=c.quantity*c.unitPrice,v())})}),e.querySelectorAll(".price-input").forEach(o=>{o.addEventListener("change",()=>{const i=parseInt(o.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.unitPrice=parseInt(o.value)||0,c.amount=c.quantity*c.unitPrice,v())})}),e.querySelectorAll(".jan-input").forEach(o=>{o.addEventListener("change",()=>{const i=parseInt(o.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.janCode=o.value,v())})}),e.querySelectorAll(".case-qty-input").forEach(o=>{o.addEventListener("change",()=>{const i=parseInt(o.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.caseQty=o.value?parseInt(o.value):null,v())})}),e.querySelectorAll(".retail-price-input").forEach(o=>{o.addEventListener("change",()=>{const i=parseInt(o.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.retailPrice=o.value?parseInt(o.value):null,v())})}),e.querySelectorAll("[data-remove-line]").forEach(o=>{o.addEventListener("click",()=>{const i=parseInt(o.dataset.removeLine??"0");a.quoteState.lines.splice(i,1),x()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{Pt(a.quoteState),a.quoteState.previewMode=!0,x()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,x()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async o=>{const i=o.currentTarget;i.disabled=!0,i.textContent="生成中…",Pt(a.quoteState);try{await kl(a.quoteState,a.quoteCompanySettings)}finally{i.disabled=!1,i.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{Pt(a.quoteState);const o=a.quoteState,i=o.lines.reduce((_,S)=>_+S.amount,0),c=Math.round(i*o.taxRate/100),m=i+c;if(!o.quoteNo)try{const{supabaseRpc:_}=await I(async()=>{const{supabaseRpc:L}=await Promise.resolve().then(()=>H);return{supabaseRpc:L}},void 0),S=await _("generate_quote_no",{});o.quoteNo=S??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{o.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const h=new Date().toISOString().slice(0,10),b=o.templateType==="sake"||o.templateType==="standard"?o.templateType:"sake",$={quote_no:o.quoteNo,quote_date:o.quoteDate||h,valid_until:o.validUntil||null,legacy_customer_code:o.customerCode||null,customer_name:o.customerName||"",customer_address:o.customerAddress||"",subject:o.subject||"",template_type:b,subtotal:i,tax_amount:c,total_amount:m,tax_rate:o.taxRate||10,remarks:o.remarks||"",delivery_date:o.deliveryDate||"",payment_terms:o.paymentTerms||"",delivery_place:o.deliveryPlace||"",updated_at:new Date().toISOString()};try{let _=o.id;if(o.id){const S=await fetch(`${ve}/rest/v1/quotes?id=eq.${encodeURIComponent(o.id)}`,{method:"PATCH",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify($)});if(!S.ok){const L=await S.text();throw new Error(`quotes更新失敗 ${S.status}: ${L}`)}await fetch(`${ve}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(o.id)}`,{method:"DELETE",headers:{apikey:re,Authorization:`Bearer ${re}`}})}else{const S=await fetch(`${ve}/rest/v1/quotes`,{method:"POST",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify($)});if(!S.ok){const k=await S.text();throw new Error(`quotes作成失敗 ${S.status}: ${k}`)}const L=await S.json();if(!L?.[0]?.id)throw new Error("IDが返りませんでした");_=L[0].id,o.id=_}if(o.lines.length>0){const S=o.lines.map((k,A)=>({quote_id:_,line_no:A+1,legacy_product_code:k.productCode||null,product_name:k.productName,jan_code:k.janCode||null,case_qty:k.caseQty??null,quantity:k.quantity,unit:k.unit,unit_price:k.unitPrice,retail_price:k.retailPrice??null,amount:k.amount})),L=await fetch(`${ve}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:re,Authorization:`Bearer ${re}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(S)});if(!L.ok){const k=await L.text();throw new Error(`明細保存失敗 ${L.status}: ${k}`)}}M(`見積 ${o.quoteNo} を保存しました`,"success"),x()}catch(_){console.error("[save-quote]",_),M(`保存失敗: ${String(_).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const o=c=>document.getElementById(c)?.value??"",i={...a.quoteCompanySettings,companyName:o("qs-company-name"),companyPostal:o("qs-company-postal"),companyAddress1:o("qs-company-addr1"),companyAddress2:o("qs-company-addr2"),companyTel:o("qs-company-tel"),companyFax:o("qs-company-fax"),companyEmail:o("qs-company-email"),companyRegistrationNo:o("qs-company-regno"),bankName:o("qs-bank-name"),bankBranch:o("qs-bank-branch"),bankAccountType:o("qs-bank-type"),bankAccountNo:o("qs-bank-no"),bankAccountHolder:o("qs-bank-holder"),defaultPaymentTerms:o("qs-payment-terms"),defaultHeaderNote:o("qs-header-note"),defaultFooterNote:o("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};Qe(i),Ze("quote_company",i),a.quoteCompanySettings=i,M("設定を保存しました","success"),x()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},Qe(a.quoteCompanySettings),Ze("quote_company",a.quoteCompanySettings),x()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",o=>{const i=o.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},Qe(a.quoteCompanySettings),x()}),e.querySelector("#qs-seal-file")?.addEventListener("change",o=>{const i=o.target.files?.[0];if(!i)return;const c=new FileReader;c.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:c.result},Qe(a.quoteCompanySettings),Ze("quote_company",a.quoteCompanySettings),x()},c.readAsDataURL(i)}),e.querySelector("#qs-seal-size")?.addEventListener("input",o=>{const i=parseInt(o.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:i},Qe(a.quoteCompanySettings),Ze("quote_company",a.quoteCompanySettings),x()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},Qe(a.quoteCompanySettings),Ze("quote_company",a.quoteCompanySettings),x()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.month;i&&(a.demandForecast.calendarMonth=i,x())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.segment;a.demandForecast.selectedSegment=i,x()})}),e.querySelectorAll("[data-demand-tab]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.demandTab;if(i){if(a.demandTab=i,i==="calendar"){const c=new Date().toISOString().slice(0,10);c.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=c)}x()}})});function g(o){const i=a.demandAnalysis,c=a.safetyStockParams;if(!i||c.length===0)return[];const[m,h]=o.split("-"),b=`${parseInt(m)-1}-${h}`,$=i.months.filter(_=>_<o).slice(-3);return c.map(_=>{const S=_.productionType==="make_to_order",L=i.matrix[_.productCode]?.[b]??0,k=$.map(R=>i.matrix[_.productCode]?.[R]??0),A=k.length>0?k.reduce((R,z)=>R+z,0)/k.length:_.avgMonthlyDemand,q=S?0:L>0?Math.ceil(L):Math.ceil(A),C=S?0:Math.ceil(_.safetyStockQty),T=Math.max(0,q+C);return{id:"",yearMonth:o,productCode:_.productCode,productName:_.productName,demandForecast:q,safetyStockTarget:C,openingStock:0,requiredProduction:T,plannedQty:S?0:T,actualQty:0,status:"draft",productionType:_.productionType??"monthly",notes:""}})}e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async o=>{const i=parseInt(o.target.value)||3;a.demandYearsBack=i,a.demandAnalysis=null;const{fetchDemandAnalysis:c}=await I(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>N);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await c(i*12),x()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.code??"",c=parseInt(o.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,b=c/30,$=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),_=Math.ceil(m.avgMonthlyDemand*b+$);return{...m,leadTimeDays:c,safetyStockQty:$,reorderPoint:_}}),x()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.code??"",c=parseFloat(o.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=c>=.99?2.33:c>=.97?1.88:c>=.95?1.65:c>=.9?1.28:1.04,b=m.leadTimeDays/30,$=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),_=Math.ceil(m.avgMonthlyDemand*b+$);return{...m,serviceLevel:c,safetyStockQty:$,reorderPoint:_}}),x()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async o=>{if(a.safetyStockParams.length===0)return;const i=o.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveSafetyStockParamsBulk:c}=await I(async()=>{const{saveSafetyStockParamsBulk:h}=await Promise.resolve().then(()=>N);return{saveSafetyStockParamsBulk:h}},void 0),m=await c(a.safetyStockParams);i.disabled=!1,i.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const o=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),i=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(c=>{const m=o>=.99?2.33:o>=.97?1.88:o>=.95?1.65:o>=.9?1.28:1.04,h=i/30,b=Math.ceil(m*c.demandStdDev*Math.sqrt(h)),$=Math.ceil(c.avgMonthlyDemand*h+b);return{...c,serviceLevel:o,leadTimeDays:i,safetyStockQty:b,reorderPoint:$}}),x()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.code??"",c=o.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===i?{...m,productionType:c}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async o=>{const i=o.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarShifts=Mt(i,1,0);const{fetchProductionPlan:c}=await I(async()=>{const{fetchProductionPlan:h}=await Promise.resolve().then(()=>N);return{fetchProductionPlan:h}},void 0),m=await c(i);a.productionPlan=m.length>0?m:g(i),Le(a.calendarShifts,a.productionPlan.filter(h=>!a.calendarLabelExcluded.has(h.productCode)),a.calendarCapacity),x()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(o=>{o.addEventListener("click",()=>{a.demandPlanTypeFilter=o.dataset.filter??"all",x()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.sortCol??"";a.demandSort?.column===i?a.demandSort=a.demandSort.dir==="desc"?{column:i,dir:"asc"}:null:a.demandSort={column:i,dir:"desc"},x()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=g(a.demandPlanYearMonth),x()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",o=>{const i=o.target.files?.[0];if(!i)return;const c=new FileReader;c.onload=async()=>{const{parseCSV:m}=await I(async()=>{const{parseCSV:C}=await Promise.resolve().then(()=>dd);return{parseCSV:C}},void 0),{columns:h,rows:b}=m(c.result),$=document.getElementById("csv-import-status"),_=h.find(C=>/商品コード|product_code|code|コード/i.test(C)),S=h.find(C=>/在庫|stock|期首|opening/i.test(C)),L=h.find(C=>/計画|plan|planned|生産/i.test(C));if(!_){$&&($.style.display="block",$.style.background="rgba(197,61,61,0.1)",$.style.color="#c53d3d",$.textContent=`エラー: 商品コード列が見つかりません。列名: ${h.join(", ")}`);return}let k=0,A=0,q=0;for(const C of b){const T=(C[_]??"").trim();if(!T)continue;const R=a.productionPlan.find(z=>z.productCode===T);if(R){if(k++,S&&C[S]!==void 0&&C[S]!==""){const z=parseFloat(C[S])||0;R.openingStock=z,R.requiredProduction=Math.max(0,R.demandForecast+R.safetyStockTarget-z),R.plannedQty>0&&!L&&(R.plannedQty=R.requiredProduction),A++}L&&C[L]!==void 0&&C[L]!==""&&(R.plannedQty=parseFloat(C[L])||0,q++)}}$&&($.style.display="block",k===0?($.style.background="rgba(183,121,31,0.1)",$.style.color="#b7791f",$.textContent=`一致する商品コードが見つかりませんでした（CSV: ${b.length}行）`):($.style.background="rgba(47,133,90,0.1)",$.style.color="#2f855a",$.textContent=`${k}商品に反映: 在庫${A}件${q>0?` / 計画${q}件`:""} 更新`),setTimeout(()=>{$.style.display="none"},5e3)),x()},c.readAsText(i,"UTF-8"),o.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(c=>{const m=c.dataset.code??"",h=a.productionPlan.find(b=>b.productCode===m);h&&(h.plannedQty=parseFloat(c.value)||0)});const{saveProductionPlan:o}=await I(async()=>{const{saveProductionPlan:c}=await Promise.resolve().then(()=>N);return{saveProductionPlan:c}},void 0);await Promise.all(a.productionPlan.map(c=>o(c)));const{fetchProductionPlan:i}=await I(async()=>{const{fetchProductionPlan:c}=await Promise.resolve().then(()=>N);return{fetchProductionPlan:c}},void 0);a.productionPlan=await i(a.demandPlanYearMonth),x()}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.date??"",c=a.calendarShifts.find(m=>m.date===i);c&&(c.confirmed?a.calendarSelectedDate=a.calendarSelectedDate===i?null:i:c.partTimers>0||c.employees>0?(c.partTimers=0,c.employees=0,Le(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=i):(c.partTimers=1,c.employees=0,Le(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=i),x())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async o=>{const i=o.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveLabelExclusions:c}=await I(async()=>{const{saveLabelExclusions:b}=await Promise.resolve().then(()=>N);return{saveLabelExclusions:b}},void 0),m=[...a.calendarLabelExcluded],h=await c(a.demandPlanYearMonth,m);i.disabled=!1,i.textContent=h?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.code??"",m=document.getElementById("cal-label-list")?.scrollTop??0;o.checked?a.calendarLabelExcluded.delete(i):a.calendarLabelExcluded.add(i);const h=a.productionPlan.filter(b=>!a.calendarLabelExcluded.has(b.productCode));Le(a.calendarShifts,h,a.calendarCapacity),x(),requestAnimationFrame(()=>{const b=document.getElementById("cal-label-list");b&&(b.scrollTop=m)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.type??"",m=document.getElementById("cal-label-list")?.scrollTop??0,h=a.productionPlan.filter($=>$.productionType===i);if(o.checked)for(const $ of h)a.calendarLabelExcluded.delete($.productCode);else for(const $ of h)a.calendarLabelExcluded.add($.productCode);const b=a.productionPlan.filter($=>!a.calendarLabelExcluded.has($.productCode));Le(a.calendarShifts,b,a.calendarCapacity),x(),requestAnimationFrame(()=>{const $=document.getElementById("cal-label-list");$&&($.scrollTop=m)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",o=>{const i=parseInt(o.target.value)||st;a.calendarCapacity.partCapacity=i;const c=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Le(a.calendarShifts,c,a.calendarCapacity),x()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",o=>{const i=parseInt(o.target.value)||ot;a.calendarCapacity.empCapacity=i;const c=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Le(a.calendarShifts,c,a.calendarCapacity),x()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.date??"",c=parseInt(o.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.partTimers=c),x()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.date??"",c=parseInt(o.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.employees=c),x()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async o=>{const i=o.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarSelectedDate=null,a.calendarShifts=Mt(i,1,0);const{fetchProductionPlan:c,fetchLabelExclusions:m}=await I(async()=>{const{fetchProductionPlan:$,fetchLabelExclusions:_}=await Promise.resolve().then(()=>N);return{fetchProductionPlan:$,fetchLabelExclusions:_}},void 0),[h,b]=await Promise.all([c(i),m(i)]);a.productionPlan=h.length>0?h:g(i),a.calendarLabelExcluded=new Set(b),Le(a.calendarShifts,a.productionPlan.filter($=>!a.calendarLabelExcluded.has($.productCode)),a.calendarCapacity),x()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",o=>{const i=parseInt(o.target.value)||0;a.calendarDefaultPart=i;for(const c of a.calendarShifts)if(!c.confirmed){const m=new Date(c.date).getDay()===0||new Date(c.date).getDay()===6;c.partTimers=m?0:i}x()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",o=>{const i=parseInt(o.target.value)||0;a.calendarDefaultEmp=i;for(const c of a.calendarShifts)if(!c.confirmed){const m=new Date(c.date).getDay()===0||new Date(c.date).getDay()===6;c.employees=m?0:i}x()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=Mt(a.demandPlanYearMonth,1,0),Le(a.calendarShifts,a.productionPlan.filter(o=>!a.calendarLabelExcluded.has(o.productCode)),a.calendarCapacity),x()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const o of a.calendarShifts)o.confirmed=!0;x()}),e.querySelectorAll("[data-action='select-month']").forEach(o=>{o.addEventListener("click",()=>{const i=parseInt(o.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=i,x())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterArea=o.target.value,x())}),e.querySelector("#visit-filter-score")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(o.target.value)||0,x())}),e.querySelectorAll("[data-sort-col]").forEach(o=>{o.addEventListener("click",i=>{const c=o.dataset.sortCol??"",m=i.shiftKey;a.route==="/product-power"?a.productSortState=it(a.productSortState,c,m):a.route==="/customer-efficiency"?a.customerSortState=it(a.customerSortState,c,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=it(a.dashboardSortState,c,m):a.route==="/master"?a.masterSortState=it(a.masterSortState,c,m):a.route==="/analytics"&&(a.analyticsSortState=it(a.analyticsSortState,c,m)),x()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(o=>{o.addEventListener("click",async()=>{const i=parseInt(o.dataset.year??"",10);i&&(a.customerEfficiencyYear=i,a.customerEfficiency=await ht(i,a.customerEfficiencyGroupBy),x())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async o=>{const i=parseInt(o.target.value,10);i&&(a.customerEfficiencyYear=i,a.customerEfficiency=await ht(i,a.customerEfficiencyGroupBy),x())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.groupby??"billing";a.customerEfficiencyGroupBy=i,a.customerEfficiency=await ht(a.customerEfficiencyYear,i),x()})}),e.querySelectorAll("[data-product-period]").forEach(o=>{o.addEventListener("click",()=>{a.productPeriod=o.dataset.productPeriod??"year",x()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const o=document.getElementById("pp-range-start")?.value??"",i=document.getElementById("pp-range-end")?.value??"";o&&i&&(a.productCustomStart=o,a.productCustomEnd=i,a.productPeriod="custom",x())}),e.querySelectorAll("[data-product-filter]").forEach(o=>{o.addEventListener("click",()=>{a.productFilter=o.dataset.productFilter??"all",x()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async o=>{const i=o.currentTarget;i.disabled=!0,i.textContent="更新中…",await tt(),i.disabled=!1,i.textContent="↻ 更新",M("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const o=e.querySelector("#sales-start")?.value??"",i=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:o,endDate:i},Tp()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const o={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=o,Np(o)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const o=e.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=o.trim().toUpperCase(),Mp(a.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{a.masterTab=o.dataset.tab,a.masterFilter={...Va},x()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",tradeType:e.querySelector("#master-trade-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},x()}),e.querySelector("#master-search")?.addEventListener("keydown",o=>{o.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(o=>{o.addEventListener("click",()=>{const i=Number(o.dataset.page);i>=1&&(a.masterFilter={...a.masterFilter,page:i},x())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.table;if(!i)return;a.rawSelectedTable=i,a.rawPage=1;const c=await Tt(i,1);a.rawRecords=c.records,a.rawTotalCount=c.total,x()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const o=await Tt(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,x()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const o=await Tt(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,x()}),e.querySelectorAll("[data-analytics-tab]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsTab=o.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:c}=await I(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}=await Promise.resolve().then(()=>N);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}},void 0);a.analyticsPeriodOptions=await c(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await i(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}x()})}),e.querySelectorAll("[data-analytics-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:c,fetchPeriodChartData:m,prevYearFilter:h}=await I(async()=>{const{fetchAnalyticsByPeriod:$,fetchAvailablePeriods:_,fetchPeriodChartData:S,prevYearFilter:L}=await Promise.resolve().then(()=>N);return{fetchAnalyticsByPeriod:$,fetchAvailablePeriods:_,fetchPeriodChartData:S,prevYearFilter:L}},void 0),b=o.dataset.analyticsPeriod;if(a.analyticsPeriod=b,a.analyticsDrilldown=null,b==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await c(a.analyticsTab,b),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const $=a.analyticsPeriodFilter,[_,S,L]=await Promise.all([i(a.analyticsTab,b,$),m(b,$),m(b,h($))]);a.analyticsPeriodRows=_,a.analyticsPeriodChartData=S,a.analyticsPrevYearChartData=L}x()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async o=>{const{fetchAnalyticsByPeriod:i,fetchPeriodChartData:c,prevYearFilter:m}=await I(async()=>{const{fetchAnalyticsByPeriod:$,fetchPeriodChartData:_,prevYearFilter:S}=await Promise.resolve().then(()=>N);return{fetchAnalyticsByPeriod:$,fetchPeriodChartData:_,prevYearFilter:S}},void 0);a.analyticsPeriodFilter=o.target.value,a.analyticsDrilldown=null;const h=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:$}=await I(async()=>{const{fiscalYearToDateRange:T}=await Promise.resolve().then(()=>vn);return{fiscalYearToDateRange:T}},void 0),_=parseInt(h),S=$(_);$(_-1);const L=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:k}=await I(async()=>{const{supabaseRpc:T}=await Promise.resolve().then(()=>H);return{supabaseRpc:T}},void 0),[A,q,C]=await Promise.all([k(L,{p_date_from:S.from,p_date_to:S.to}),c("yearly",h),c("yearly",String(_-1))]);a.analyticsPeriodRows=(A??[]).map(T=>({code:String(T.code??""),name:String(T.name??""),amount:Number(T.amount??0),quantity:Number(T.quantity??0),documents:Number(T.documents??0),volumeMl:Number(T.volume_ml??0)})),a.analyticsPeriodChartData=(q??[]).map(T=>({...T})),a.analyticsPrevYearChartData=(C??[]).map(T=>({...T}))}else{const[$,_,S]=await Promise.all([i(a.analyticsTab,a.analyticsPeriod,h),c(a.analyticsPeriod,h),c(a.analyticsPeriod,m(h))]);a.analyticsPeriodRows=$,a.analyticsPeriodChartData=_,a.analyticsPrevYearChartData=S}x()}),e.querySelectorAll("[data-fiscal-mode]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsFiscalMode=o.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:i}=await I(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>vn);return{monthToFiscalYear:m}},void 0),c=new Set;for(const m of a.salesAnalytics.monthlySales)c.add(i(m.month));a.analyticsPeriodOptions=[...c].sort((m,h)=>h-m).map(String)}else{const{fetchAvailablePeriods:i}=await I(async()=>{const{fetchAvailablePeriods:c}=await Promise.resolve().then(()=>N);return{fetchAvailablePeriods:c}},void 0);a.analyticsPeriodOptions=await i(a.analyticsTab,"yearly")}x()})}),e.querySelectorAll("[data-chart-metric]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsChartMetric=o.dataset.chartMetric,x()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.analyticsDrilldown??"",c=o.dataset.drilldownName??i,m=a.analyticsTab,{fetchCustomerProductBreakdown:h,fetchProductCustomerBreakdown:b,fetchEntityMonthlySales:$,periodToDateRange:_}=await I(async()=>{const{fetchCustomerProductBreakdown:A,fetchProductCustomerBreakdown:q,fetchEntityMonthlySales:C,periodToDateRange:T}=await Promise.resolve().then(()=>N);return{fetchCustomerProductBreakdown:A,fetchProductCustomerBreakdown:q,fetchEntityMonthlySales:C,periodToDateRange:T}},void 0),S=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?_(a.analyticsPeriod,a.analyticsPeriodFilter):null,[L,k]=await Promise.all([$(i,m==="customers"?"customer":"product"),m==="customers"?h(i,S?.from,S?.to):b(i,S?.from,S?.to)]);a.analyticsDrilldown={tab:m,code:i,name:c,monthlySales:L,breakdownRows:k},x()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,x()}),e.querySelector("#staff-filter-input")?.addEventListener("input",o=>{a.analyticsStaffFilter=o.target.value,x()}),e.querySelectorAll("[data-staff-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.staffDrilldown??"",c=o.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:h,periodToDateRange:b}=await I(async()=>{const{fetchStaffCustomerBreakdown:k,fetchStaffProductBreakdown:A,periodToDateRange:q}=await Promise.resolve().then(()=>N);return{fetchStaffCustomerBreakdown:k,fetchStaffProductBreakdown:A,periodToDateRange:q}},void 0),$=b(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),_=a.analyticsStaffDrilldown?.breakdownTab??"customers",[S,L]=await Promise.all([m(i,$?.from,$?.to),h(i,$?.from,$?.to)]);a.analyticsStaffDrilldown={code:i,name:c,breakdownTab:_,customerRows:S,productRows:L},x()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:o.dataset.staffBreakdownTab},x())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,x()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",o=>{a.analyticsTagFilter=o.target.value,x()}),e.querySelectorAll("[data-staff-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAvailablePeriods:i,fetchStaffTotalsByPeriod:c,periodToDateRange:m}=await I(async()=>{const{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:$,periodToDateRange:_}=await Promise.resolve().then(()=>N);return{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:$,periodToDateRange:_}},void 0),h=o.dataset.staffPeriod;if(a.analyticsStaffPeriod=h,a.analyticsStaffDrilldown=null,h==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await i("staff",h),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const b=m(h,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await c(b?.from,b?.to)}x()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async o=>{const{fetchStaffTotalsByPeriod:i,periodToDateRange:c}=await I(async()=>{const{fetchStaffTotalsByPeriod:h,periodToDateRange:b}=await Promise.resolve().then(()=>N);return{fetchStaffTotalsByPeriod:h,periodToDateRange:b}},void 0);a.analyticsStaffPeriodFilter=o.target.value;const m=c(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await i(m?.from,m?.to),a.analyticsStaffDrilldown=null,x()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{De(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},x()}),e.querySelectorAll("[data-action='remove-line']").forEach(o=>{o.addEventListener("click",()=>{De(e);const i=parseInt(o.dataset.line??"0",10);a.invoiceForm.lines.splice(i,1),a.invoiceErrors=Ks(a.invoiceForm),x()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(o=>{o.addEventListener("click",()=>{De(e),Sp(parseInt(o.dataset.line??"0",10)),a.invoiceErrors={},x()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{kp(),x()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{De(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,x()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(o=>{o.addEventListener("click",()=>{De(e);const i=parseInt(o.dataset.line??"0",10),c=a.invoiceForm.lines[i];a.pickerMode="product",a.pickerTargetLine=i,a.pickerQuery=c?c.productCode||c.productName:"",x()})}),e.querySelectorAll("[data-action='modal-close']").forEach(o=>{o.addEventListener("click",i=>{o.classList.contains("modal-backdrop")&&i.target instanceof HTMLElement&&!i.target.classList.contains("modal-backdrop")||(Ft(),x())})}),e.querySelectorAll("[data-action='picker-select']").forEach(o=>{const i=async()=>{const c=o.dataset.code??"",m=o.dataset.name??"";if(a.pickerMode==="customer"){a.invoiceForm.customerCode=c,a.invoiceForm.customerName=m,delete a.invoiceErrors.customerCode;const h=a.masterStats?.customers.find(b=>b.code===c);a.invoicePriceGroup=h?.priceGroup||"",!a.invoicePriceGroup&&c&&(a.invoicePriceGroup=await ha(c))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const h=a.invoiceForm.lines[a.pickerTargetLine];if(h){h.productCode=c,h.productName=m;const b=await bs(a.invoicePriceGroup,c);b>0&&(h.unitPrice=b),h.amount=h.quantity*h.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}Ft(),x()};o.addEventListener("click",i),o.addEventListener("keydown",c=>{c.key==="Enter"&&i()})}),e.querySelector("#modal-search")?.addEventListener("input",o=>{a.pickerQuery=o.target.value,x()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Hs(),x()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Gs(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{De(e),Pp(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await ha(a.invoiceForm.customerCode)),x())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{De(e),Ep(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,x())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(o=>{o.addEventListener("input",()=>{De(e),a.invoiceSavedDocNo=null;const i=o.dataset.field;(i==="quantity"||i==="unitPrice")&&x()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{De(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const o=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=o.trim(),a.deliveryNote=null,a.actionLoading=!0,x(),!a.deliverySearchDocNo){M("伝票番号を入力してください","error"),a.actionLoading=!1,x();return}Ta(a.deliverySearchDocNo).then(i=>{a.deliveryNote=i,a.actionLoading=!1,x()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const o=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=o,a.billingSummary=null,a.actionLoading=!0,x(),Na(o).then(i=>{a.billingSummary=i,a.actionLoading=!1,x()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const o=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),i=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=o,a.taxMonth=i,a.taxDeclaration=null,a.actionLoading=!0,x(),Ra(o,i).then(c=>{a.taxDeclaration=c,a.actionLoading=!1,x()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:o}=await I(async()=>{const{generateTaxXML:b}=await Promise.resolve().then(()=>N);return{generateTaxXML:b}},void 0),i=o(a.taxDeclaration),c=new Blob([i],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:o}=await I(async()=>{const{generateTaxCSV:b}=await Promise.resolve().then(()=>N);return{generateTaxCSV:b}},void 0),i=o(a.taxDeclaration),c=new Blob([i],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:o}=await I(async()=>{const{saveTaxDeclaration:i}=await Promise.resolve().then(()=>N);return{saveTaxDeclaration:i}},void 0);try{await o(a.taxDeclaration),M("下書き保存しました")}catch(i){M("保存に失敗: "+(i instanceof Error?i.message:String(i)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(o=>{o.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const i=Number(o.dataset.taxRow),c=o.dataset.taxField,m=o.type==="number"?Number(o.value)||0:o.value,h=[...a.taxDeclaration.rows];h[i]={...h[i],[c]:m};const{recalculateTaxDeclaration:b}=await I(async()=>{const{recalculateTaxDeclaration:$}=await Promise.resolve().then(()=>N);return{recalculateTaxDeclaration:$}},void 0);a.taxDeclaration=b({...a.taxDeclaration,rows:h}),x()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=Number(o.dataset.dedRow),c=o.dataset.dedField,m=o.type==="number"?Number(o.value)||0:o.value,h=[...a.taxDeclaration.deductions];h[i]={...h[i],[c]:m},a.taxDeclaration={...a.taxDeclaration,deductions:h},x()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=o.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[i]:o.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:o,TAX_RATE_CATEGORIES:i}=await I(async()=>{const{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}=await Promise.resolve().then(()=>N);return{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}},void 0),c=i[0],m={taxCategory:c.code,taxCategoryName:c.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:c.taxRatePerLiter,taxAmount:0};a.taxDeclaration=o({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),x()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(o=>{o.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const i=Number(o.dataset.taxRow),{recalculateTaxDeclaration:c}=await I(async()=>{const{recalculateTaxDeclaration:h}=await Promise.resolve().then(()=>N);return{recalculateTaxDeclaration:h}},void 0),m=a.taxDeclaration.rows.filter((h,b)=>b!==i);a.taxDeclaration=c({...a.taxDeclaration,rows:m}),x()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const o={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,o]},x()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(o=>{o.addEventListener("click",()=>{if(!a.taxDeclaration)return;const i=Number(o.dataset.dedRow),c=a.taxDeclaration.deductions.filter((m,h)=>h!==i);a.taxDeclaration={...a.taxDeclaration,deductions:c},x()})}),e.querySelectorAll("[data-store-tab]").forEach(o=>{o.addEventListener("click",()=>{a.storeTab=o.dataset.storeTab,x()})}),e.querySelectorAll("[data-import-entity]").forEach(o=>{o.addEventListener("click",()=>{a.importEntity=o.dataset.importEntity,a.importPreview=null,a.importResult=null,x()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const o=Bs(a.importEntity),i=new Blob([o],{type:"text/csv;charset=utf-8"}),c=URL.createObjectURL(i),m=document.createElement("a");m.href=c,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(c)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const i=e.querySelector("#import-file")?.files?.[0];if(!i){M("CSVファイルを選択してください","warning");return}const c=new FileReader;c.onload=()=>{const m=String(c.result??""),{columns:h,rows:b}=Os(m);a.importPreview=js(a.importEntity,h,b),a.importResult=null,x()},c.readAsText(i,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,x()}),e.querySelectorAll("[data-print-template]").forEach(o=>{o.addEventListener("click",()=>{a.printTemplate=o.dataset.printTemplate,x()})}),e.querySelectorAll("[data-print-field]").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.printField;let c=o.value;(i==="taxRate"||i==="previousBalance"||i==="paymentAmount")&&(c=Number(o.value)||0),a.printData={...a.printData,[i]:c},x()})}),e.querySelectorAll("[data-print-opt]").forEach(o=>{const i=()=>{const c=o.dataset.printOpt;let m;o.type==="checkbox"?m=o.checked:c==="copies"?m=Number(o.value)||1:c==="overlayOpacity"||c==="calibrationOffsetX"||c==="calibrationOffsetY"?m=Number(o.value)||0:m=o.value,a.printOptions={...a.printOptions,[c]:m},x()};o.addEventListener("change",i),o.type==="range"&&o.addEventListener("input",i)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(o=>{o.addEventListener("change",()=>{const i=Number(o.dataset.printLine),c=o.dataset.printLfield,m=[...a.printData.lines];let h=o.value;(c==="quantity"||c==="unitPrice")&&(h=Number(o.value)||0),m[i]={...m[i],[c]:h},m[i].amount=(Number(m[i].quantity)||0)*(Number(m[i].unitPrice)||0),a.printData={...a.printData,lines:m},x()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},x()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(o=>{o.addEventListener("click",()=>{const i=Number(o.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((c,m)=>m!==i)},x()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),M("印刷設定を保存しました")}catch(o){M("保存失敗: "+(o instanceof Error?o.message:String(o)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const o=a.printCompany,i=prompt("会社名",o.name);if(i===null)return;const c=prompt("郵便番号",o.postalCode)??o.postalCode,m=prompt("住所",o.address1)??o.address1,h=prompt("TEL",o.tel)??o.tel,b=prompt("FAX",o.fax)??o.fax,$=prompt("適格請求書登録番号 (T+13桁)",o.registrationNo)??o.registrationNo,_=prompt("取引銀行名",o.bankName)??o.bankName,S=prompt("支店名",o.bankBranch)??o.bankBranch,L=prompt("口座番号",o.bankAccountNo)??o.bankAccountNo,k=prompt("口座名義",o.bankAccountHolder)??o.bankAccountHolder;a.printCompany={...o,name:i,postalCode:c,address1:m,tel:h,fax:b,registrationNo:$,bankName:_,bankBranch:S,bankAccountNo:L,bankAccountHolder:k},x()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,x()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const c=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=ea(o),{savePrintLayout:h}=await I(async()=>{const{savePrintLayout:$}=await Promise.resolve().then(()=>N);return{savePrintLayout:$}},void 0),b={id:`bp1701_${c.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:c,templateKey:"chain_store",positions:m};try{await h(b)?(M(`クラウド保存成功: ${c}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),x()):(M("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch($){M("保存エラー: "+($ instanceof Error?$.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const i=ea(o);a.fdSavedPositions=i;try{localStorage.setItem("sake_fd_positions",JSON.stringify(i)),M(`ローカル保存完了: ${Object.keys(i).length}件`)}catch(c){M("保存失敗: "+(c instanceof Error?c.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const c={templateKey:"chain_store",positions:ea(o),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(c,null,2)],{type:"application/json"}),h=URL.createObjectURL(m),b=document.createElement("a");b.href=h,b.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,b.click(),URL.revokeObjectURL(h)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async o=>{const i=o.target.files?.[0];if(i)try{const c=await i.text(),h=JSON.parse(c).positions;if(!h)throw new Error("positions field not found");a.fdSavedPositions=h,localStorage.setItem("sake_fd_positions",JSON.stringify(h)),M(`インポート成功: ${Object.keys(h).length}件`),x()}catch(c){M("インポート失敗: "+(c instanceof Error?c.message:""),"error")}});const w=e.querySelector("#fd-saved-layouts");w&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:o}=await I(async()=>{const{fetchPrintLayouts:c}=await Promise.resolve().then(()=>N);return{fetchPrintLayouts:c}},void 0),i=await o("chain_store");i.length===0?w.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(w.innerHTML=`☁️ クラウド保存済み (${i.length}件):<br/>`+i.map(c=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${c.id}" style="margin:4px 4px 0 0;">${c.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${c.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),w.querySelectorAll("[data-action='fd-load-layout']").forEach(c=>{c.addEventListener("click",()=>{const m=c.dataset.layoutId,h=i.find(b=>b.id===m);h&&(a.fdSavedPositions=h.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(h.positions)),M(`読込完了: ${h.name}`),x())})}),w.querySelectorAll("[data-action='fd-delete-layout']").forEach(c=>{c.addEventListener("click",async()=>{const m=c.dataset.layoutId;if(!m||!await Se("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:h}=await I(async()=>{const{deletePrintLayout:$}=await Promise.resolve().then(()=>N);return{deletePrintLayout:$}},void 0);await h(m)?(M("削除しました"),x()):M("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await Se("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),x())});const P=e.querySelector("#fd-sel-x"),E=e.querySelector("#fd-sel-y");[P,E].forEach(o=>{o?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const i=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);i&&(P&&(i.style.left=P.value+"mm"),E&&(i.style.top=E.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(o=>{o.addEventListener("dragstart",i=>{o.classList.add("wf-dragging"),i.dataTransfer?.setData("text/plain",o.dataset.wfOrder??"")}),o.addEventListener("dragend",()=>o.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(o=>{o.addEventListener("dragover",i=>i.preventDefault()),o.addEventListener("drop",i=>{i.preventDefault();const c=i.dataTransfer?.getData("text/plain"),m=o.dataset.wfStage;if(!c||!m)return;const h=a.workflowOrders.find(b=>b.id===c);h&&(h.stage=m,x())})}),e.querySelectorAll("[data-mo-step]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.moStep;o.disabled||(a.mobileOrder.step=i,x())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",o=>{a.mobileOrder.customerQuery=o.target.value,x()}),e.querySelector("#mo-product-q")?.addEventListener("input",o=>{a.mobileOrder.productQuery=o.target.value,x()}),e.querySelectorAll("[data-mo-select-customer]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.moSelectCustomer,c=a.masterStats?.customers.find(m=>m.id===i);c&&(a.mobileOrder.selectedCustomer=c),x()})}),e.querySelectorAll("[data-mo-add-product]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.moAddProduct,c=a.masterStats?.products.find(h=>h.code===i);if(!c)return;const m=1800;a.mobileOrder.cart.push({productCode:c.code,productName:c.name,quantity:1,unit:"本",unitPrice:m,amount:m}),x()})}),e.querySelectorAll("[data-mo-qty]").forEach(o=>{o.addEventListener("click",()=>{const i=Number(o.dataset.moQty),c=o.dataset.moProduct,m=a.mobileOrder.cart.find(h=>h.productCode===c);m&&(m.quantity=Math.max(0,m.quantity+i),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(h=>h.productCode!==c)),x())})}),e.querySelectorAll("[data-mo-remove]").forEach(o=>{o.addEventListener("click",()=>{const i=Number(o.dataset.moRemove);a.mobileOrder.cart.splice(i,1),x()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const o=e.querySelector("#mo-memo");a.mobileOrder.memo=o?.value??"";const i="MO"+Date.now().toString().slice(-8),c=e.querySelector("[data-action='mo-submit']");c&&(c.disabled=!0,c.textContent="送信中…");const m=a.mobileOrder.cart.reduce((h,b)=>h+b.amount,0);try{const{saveStoreOrder:h}=await I(async()=>{const{saveStoreOrder:b}=await Promise.resolve().then(()=>N);return{saveStoreOrder:b}},void 0);await h(i,a.mobileOrder.selectedCustomer?.name??"不明",a.mobileOrder.selectedCustomer?.code??null,m,a.mobileOrder.memo,a.mobileOrder.cart)}catch(h){console.error("受注保存失敗:",h),M("送信に失敗しました","error"),c&&(c.disabled=!1,c.textContent="受注を送信");return}a.mobileOrder.submittedDocNo=i,a.mobileOrder.step="done",x()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},x()}),e.querySelectorAll("[data-tour-id]").forEach(o=>{o.addEventListener("click",()=>{a.tourActiveId=o.dataset.tourId??null,x()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(o=>{o.addEventListener("click",()=>{const i=a.tourInquiries.find($=>$.id===a.tourActiveId);if(!i)return;const c=o.dataset.template==="confirm"?Rc:Oc,m=e.querySelector("#tour-confirmed-time"),h=c.replaceAll("{name}",i.name).replaceAll("{partySize}",String(i.partySize)).replaceAll("{confirmedTime}",m?.value??i.visitDate),b=e.querySelector("#tour-reply-body");b&&(b.value=h)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const o=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",i=a.tourInquiries.find(m=>m.id===o);if(!i)return;const c=e.querySelector("#tour-confirmed-time");i.status="confirmed",i.repliedAt=new Date().toISOString(),i.confirmedTime=c?.value??"",M("返信メールを下書き保存し、ステータスを確定にしました"),x()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const o=e.querySelector("#lb-type")?.value??"",i=e.querySelector("#lb-area")?.value??"",c=e.querySelector("#lb-keyword")?.value??"";if(!o&&!c){M("業種かキーワードを入力してください","warning");return}a.leadSearchType=o,a.leadSearchArea=i,a.leadSearchQuery=c,a.leadSearching=!0,x();const m=a.integrations.find(_=>_.provider==="google_maps");if(!m||!m.config.api_key){M("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,x();return}const{searchPlaces:h}=await I(async()=>{const{searchPlaces:_}=await Promise.resolve().then(()=>N);return{searchPlaces:_}},void 0),b=[o,c].filter(Boolean).join(" "),$=await h(m,b,i);a.leadSearching=!1,$.error?M("検索失敗: "+$.error,"error"):a.leadSearchResults=$.results,x()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],x()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const o=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!o)return;const i=`ll_${Date.now()}`,c={id:i,name:o,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:h,fetchLeadLists:b,fetchLeadItems:$}=await I(async()=>{const{saveLeadList:L,saveLeadItem:k,fetchLeadLists:A,fetchLeadItems:q}=await Promise.resolve().then(()=>N);return{saveLeadList:L,saveLeadItem:k,fetchLeadLists:A,fetchLeadItems:q}},void 0);await m(c);const _=e.querySelectorAll(".lb-search-check:checked"),S=Array.from(_).map(L=>Number(L.dataset.idx));for(const L of S){const k=a.leadSearchResults[L];k&&await h({...k,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:i,businessType:a.leadSearchType})}a.leadLists=await b(),a.leadActiveListId=i,a.leadItems=await $(i),a.leadSearchResults=[],M(`${S.length}件を「${o}」として保存しました`),x()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??null;if(a.leadActiveListId=i,i){const{fetchLeadItems:c}=await I(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>N);return{fetchLeadItems:m}},void 0);a.leadItems=await c(i)}x()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",c=a.leadItems.find(b=>b.id===i);if(!c)return;const{saveLeadItem:m,fetchLeadItems:h}=await I(async()=>{const{saveLeadItem:b,fetchLeadItems:$}=await Promise.resolve().then(()=>N);return{saveLeadItem:b,fetchLeadItems:$}},void 0);await m({...c,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),x()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",c=a.leadItems.find($=>$.id===i);if(!c)return;const{convertLeadToProspect:m,fetchLeadItems:h}=await I(async()=>{const{convertLeadToProspect:$,fetchLeadItems:_}=await Promise.resolve().then(()=>N);return{convertLeadToProspect:$,fetchLeadItems:_}},void 0);await m(c)&&(M("見込客に追加しました: "+c.companyName),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),x())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const o=e.querySelectorAll(".lb-item-check:checked");if(o.length===0&&!await Se("全ての新規アイテムを見込客に変換しますか？"))return;const i=o.length>0?Array.from(o).map(b=>b.dataset.id):a.leadItems.filter(b=>b.status==="new").map(b=>b.id),{convertLeadToProspect:c,fetchLeadItems:m}=await I(async()=>{const{convertLeadToProspect:b,fetchLeadItems:$}=await Promise.resolve().then(()=>N);return{convertLeadToProspect:b,fetchLeadItems:$}},void 0);let h=0;for(const b of i){const $=a.leadItems.find(_=>_.id===b);$&&$.status==="new"&&await c($)&&h++}M(`${h}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),x()}),e.querySelectorAll("[data-map-filter]").forEach(o=>{o.addEventListener("change",()=>{const i=o.dataset.mapFilter;let c;o.type==="checkbox"?c=o.checked:c=o.value,a.mapFilters={...a.mapFilters,[i]:c},x()})}),e.querySelectorAll(".churn-reason-select").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.churnCode??"",c=o.value;try{const{saveChurnNote:m}=await I(async()=>{const{saveChurnNote:$}=await Promise.resolve().then(()=>N);return{saveChurnNote:$}},void 0);await m({customerCode:i,reason:c,memo:"",actionedAt:null});const h=a.churnNotes.find($=>$.customerCode===i);h?h.reason=c:a.churnNotes.push({customerCode:i,reason:c,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const b=o.closest("tr");if(b){const $=b.querySelector("td:nth-child(2)");if($){let _=$.querySelector(".reason-badge");!_&&c&&(_=document.createElement("span"),_.className="status-pill info reason-badge",_.style.fontSize="0.72rem",$.appendChild(_)),_&&(_.textContent=c?yp[c]??"":"")}}M("理由を保存しました")}catch(m){M("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.churnCode??"",c=o.checked,m=o.closest("tr");m&&(m.style.opacity=c?"0.45":"",m.setAttribute("data-actioned",c?"1":"0"));try{const{saveChurnNote:h}=await I(async()=>{const{saveChurnNote:S}=await Promise.resolve().then(()=>N);return{saveChurnNote:S}},void 0),b=a.churnNotes.find(S=>S.customerCode===i),$=b?.reason??"",_=new Date().toISOString().slice(0,10);await h({customerCode:i,reason:$,memo:"",actionedAt:c?_:null}),b?b.actionedAt=c?_:null:a.churnNotes.push({customerCode:i,reason:$,memo:"",actionedAt:c?_:null,updatedAt:new Date().toISOString()}),M(c?"対応済みにしました":"対応済みを解除しました")}catch(h){M("保存に失敗しました","error"),console.error(h)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const o=a.integrations.find(h=>h.provider==="ivry");if(!o||!o.isEnabled){M("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:i,fetchCallLogs:c}=await I(async()=>{const{syncIvryCallLogs:h,fetchCallLogs:b}=await Promise.resolve().then(()=>N);return{syncIvryCallLogs:h,fetchCallLogs:b}},void 0),m=await i(o);m.error?M("同期失敗: "+m.error,"error"):(M(`${m.count}件の通話履歴を同期しました`),a.callLogs=await c(100),x())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const o=a.integrations.find(h=>h.provider==="ivry");if(!o||!o.isEnabled){M("IVRy連携が無効です","warning");return}if(!await Se("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:i}=await I(async()=>{const{syncPhoneBookToIvry:h}=await Promise.resolve().then(()=>N);return{syncPhoneBookToIvry:h}},void 0),c=[];a.masterStats?.customers.forEach(h=>{c.push({name:h.name,phone:"",customerCode:h.code,note:"既存取引先"})}),a.prospects.forEach(h=>{h.phone&&c.push({name:h.companyName,phone:h.phone,customerCode:h.id,note:`見込客 (${h.stage})`})});const m=await i(o,c);m.error?M("送信失敗: "+m.error,"error"):M(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",c=o.dataset.phone??"",m=prompt(`電話番号 ${c} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const h=a.callLogs.find(_=>_.id===i);if(!h)return;const{saveCallLog:b,fetchCallLogs:$}=await I(async()=>{const{saveCallLog:_,fetchCallLogs:S}=await Promise.resolve().then(()=>N);return{saveCallLog:_,fetchCallLogs:S}},void 0);await b({...h,matchedCustomerCode:m}),a.callLogs=await $(100),x()})}),e.querySelectorAll("[data-action='call-memo']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",c=a.callLogs.find($=>$.id===i);if(!c)return;const m=prompt("メモを入力:",c.notes??"");if(m===null)return;const{saveCallLog:h,fetchCallLogs:b}=await I(async()=>{const{saveCallLog:$,fetchCallLogs:_}=await Promise.resolve().then(()=>N);return{saveCallLog:$,fetchCallLogs:_}},void 0);await h({...c,notes:m}),a.callLogs=await b(100),x()})}),e.querySelectorAll("[data-prospect-view]").forEach(o=>{o.addEventListener("click",()=>{a.prospectViewMode=o.dataset.prospectView,x()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",x()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:c}=await I(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>N);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await c(i)}x()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.prospectId??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:c}=await I(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>N);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await c(i)}x()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(o=>{o.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],x())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const o=a.prospectEditingId==="__new__",i=o?`p_${Date.now()}`:a.prospectEditingId??"",c={id:i,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!c.companyName){M("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:h,recordAudit:b,sendSlackNotification:$}=await I(async()=>{const{saveProspect:S,fetchProspects:L,recordAudit:k,sendSlackNotification:A}=await Promise.resolve().then(()=>N);return{saveProspect:S,fetchProspects:L,recordAudit:k,sendSlackNotification:A}},void 0);await m(c)?(o&&await $("new_prospect",`新規見込客: ${c.companyName} / 想定 ¥${c.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await b({action:o?"prospect_create":"prospect_update",entityType:"prospect",entityId:i,userEmail:a.user?.email}),a.prospects=await h(),a.prospectEditingId=null,x()):M("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Se("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=o.dataset.id??"",{deleteProspect:c,fetchProspects:m}=await I(async()=>{const{deleteProspect:h,fetchProspects:b}=await Promise.resolve().then(()=>N);return{deleteProspect:h,fetchProspects:b}},void 0);await c(i)&&(a.prospects=await m(),x())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(o=>{o.addEventListener("click",i=>{i.stopPropagation();const c=o.dataset.id??"",m=o.dataset.name??"",h=o.dataset.addr??"";a.quoteState=Bt(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=m,a.quoteState.customerAddress=h,a.quoteState.isProspect=!0,a.quoteState.prospectId=c,a.quotePricing=null,a.quoteEditId="new",da("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",i=e.querySelector("#prospect-activity-type")?.value??"call",c=e.querySelector("#prospect-activity-title")?.value??"";if(!c){M("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:h}=await I(async()=>{const{saveProspectActivity:b,fetchProspectActivities:$}=await Promise.resolve().then(()=>N);return{saveProspectActivity:b,fetchProspectActivities:$}},void 0);await m({id:`act_${Date.now()}`,prospectId:o,activityType:i,title:c,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await h(o),x()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("dragstart",i=>{i.dataTransfer?.setData("text/plain",o.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(o=>{o.addEventListener("dragover",i=>i.preventDefault()),o.addEventListener("drop",async i=>{i.preventDefault();const c=i.dataTransfer?.getData("text/plain"),m=o.dataset.prospectStage;if(!c)return;const h=a.prospects.find(b=>b.id===c);if(h&&h.stage!==m){const b={...h,stage:m},{saveProspect:$}=await I(async()=>{const{saveProspect:_}=await Promise.resolve().then(()=>N);return{saveProspect:_}},void 0);await $(b),h.stage=m,x()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:o,saveIntegrationSetting:i}=await I(async()=>{const{fetchIntegrationSettings:_,saveIntegrationSetting:S}=await Promise.resolve().then(()=>N);return{fetchIntegrationSettings:_,saveIntegrationSetting:S}},void 0),m=(a.integrations.length>0?a.integrations:await o()).find(_=>_.provider==="slack");if(!m)return;const h=e.querySelector("#slack-webhook")?.value??"",b=e.querySelector("#slack-default-channel")?.value??"",$=e.querySelector("#slack-enabled")?.checked??!1;await i({...m,config:{...m.config,webhook_url:h,default_channel:b},isEnabled:$}),a.integrations=await o(),M("保存しました"),x()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:o,fetchSlackRules:i}=await I(async()=>{const{saveSlackRule:c,fetchSlackRules:m}=await Promise.resolve().then(()=>N);return{saveSlackRule:c,fetchSlackRules:m}},void 0);for(const c of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${c.id}"][data-slack-field="enabled"]`)?.checked??c.enabled,h=e.querySelector(`[data-slack-rule-id="${c.id}"][data-slack-field="channel"]`)?.value??c.channel;await o({...c,enabled:m,channel:h})}a.slackRules=await i(),M("ルールを保存しました"),x()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:o}=await I(async()=>{const{sendSlackNotification:c}=await Promise.resolve().then(()=>N);return{sendSlackNotification:c}},void 0),i=await o("new_order","🧪 これはテスト通知です (syusen-cloud)");i.ok?M("テスト送信成功"):M("送信失敗: "+(i.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,x()}),e.querySelectorAll("[data-action='material-adjust']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.id??"",c=a.materialList.find(m=>m.id===i);c&&(a.materialEditing=c,a.materialEditingIsNew=!1,x())})}),e.querySelectorAll("[data-action='material-close']").forEach(o=>{o.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,x())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const i={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(i.materialType=e.querySelector("#mat-type")?.value??"",!i.code||!i.name){M("コードと品名は必須です","warning");return}const{saveMaterial:c,fetchMaterialList:m}=await I(async()=>{const{saveMaterial:b,fetchMaterialList:$}=await Promise.resolve().then(()=>N);return{saveMaterial:b,fetchMaterialList:$}},void 0);await c(i)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,M("保存しました"),x()):M("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!o||!await Se("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:i,fetchMaterialList:c}=await I(async()=>{const{deleteMaterial:m,fetchMaterialList:h}=await Promise.resolve().then(()=>N);return{deleteMaterial:m,fetchMaterialList:h}},void 0);await i(o)&&(a.materialList=await c(),a.materialEditing=null,x())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",x()}),e.querySelectorAll("[data-action='user-edit']").forEach(o=>{o.addEventListener("click",()=>{a.userEditingId=o.dataset.id??null,x()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,x()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const o=a.userEditingId==="__new__",i=o?crypto.randomUUID():a.userEditingId??"",c=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!c||!m){M("名前とメールアドレスは必須です","warning");return}const h={id:i,email:c,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(o){const L=e.querySelector("#user-password")?.value??"";if(L.length<8){M("パスワードは8文字以上必要です","warning");return}try{await Wa(c,L)}catch(k){M("Auth登録失敗: "+(k instanceof Error?k.message:""),"error");return}}const{saveUserProfile:b,fetchUserProfiles:$,recordAudit:_}=await I(async()=>{const{saveUserProfile:L,fetchUserProfiles:k,recordAudit:A}=await Promise.resolve().then(()=>N);return{saveUserProfile:L,fetchUserProfiles:k,recordAudit:A}},void 0);await b(h)?(await _({action:o?"user_create":"user_update",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await $(),a.userEditingId=null,M("保存しました"),x()):M("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Se("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=o.dataset.id??"",{deleteUserProfile:c,fetchUserProfiles:m,recordAudit:h}=await I(async()=>{const{deleteUserProfile:$,fetchUserProfiles:_,recordAudit:S}=await Promise.resolve().then(()=>N);return{deleteUserProfile:$,fetchUserProfiles:_,recordAudit:S}},void 0);await c(i)?(await h({action:"user_delete",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await m(),x()):M("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const o=e.querySelector("#profile-sender")?.value??"",i={...a.myProfile,defaultMailSenderId:o},{saveUserProfile:c}=await I(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>N);return{saveUserProfile:m}},void 0);await c(i),a.myProfile=i,M("保存しました"),x()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const o=e.querySelector("#profile-new-password")?.value??"";if(o.length<8){M("8文字以上のパスワードを入力してください","warning");return}try{await mo(o),M("パスワードを変更しました")}catch(i){M("変更失敗: "+(i instanceof Error?i.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(o=>{o.addEventListener("click",()=>{a.integrationEditingId=o.dataset.id??null,x()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,x()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='int-save']")?.dataset.id??"",i=a.integrations.find(_=>_.id===o);if(!i)return;const c={...i.config};Object.keys(c).forEach(_=>{const S=e.querySelector(`#int-${_}`);S&&(c[_]=S.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:h,fetchIntegrationSettings:b}=await I(async()=>{const{saveIntegrationSetting:_,fetchIntegrationSettings:S}=await Promise.resolve().then(()=>N);return{saveIntegrationSetting:_,fetchIntegrationSettings:S}},void 0);await h({...i,config:c,isEnabled:m})?(a.integrations=await b(),a.integrationEditingId=null,M("保存しました"),x()):M("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(o=>{o.addEventListener("click",async()=>{const i=a.integrations.find(b=>b.provider==="shopify");if(!i){M("Shopify連携が未設定です","warning");return}o.textContent="同期中…",o.disabled=!0;const{syncShopifyOrders:c,fetchShopifyOrders:m}=await I(async()=>{const{syncShopifyOrders:b,fetchShopifyOrders:$}=await Promise.resolve().then(()=>N);return{syncShopifyOrders:b,fetchShopifyOrders:$}},void 0),h=await c(i);h.error?M("同期失敗: "+h.error,"error"):(M(`${h.count}件を同期しました`),a.shopifyOrders=await m()),x()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(o=>{o.addEventListener("click",async()=>{const i=a.integrations.find(b=>b.provider==="google_calendar");if(!i)return;o.textContent="同期中…",o.disabled=!0;const{syncGoogleCalendar:c,fetchCalendarEvents:m}=await I(async()=>{const{syncGoogleCalendar:b,fetchCalendarEvents:$}=await Promise.resolve().then(()=>N);return{syncGoogleCalendar:b,fetchCalendarEvents:$}},void 0),h=await c(i);h.error?M("同期失敗: "+h.error,"error"):(M(`${h.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),x()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const i=e.querySelector("#fax-file")?.files?.[0];if(!i){M("FAX画像を選択してください","warning");return}const c=a.integrations.find(m=>m.provider==="cloud_vision");if(!c||!c.config.api_key){M("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,x();try{const m=new FileReader;m.onload=async()=>{const h=String(m.result??""),{ocrFaxImage:b,saveFaxRecord:$,fetchFaxInbox:_}=await I(async()=>{const{ocrFaxImage:A,saveFaxRecord:q,fetchFaxInbox:C}=await Promise.resolve().then(()=>N);return{ocrFaxImage:A,saveFaxRecord:q,fetchFaxInbox:C}},void 0),S=await b(c,h),L=e.querySelector("#fax-sender-name")?.value??"",k=e.querySelector("#fax-sender-phone")?.value??"";await $({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:L,senderPhone:k,ocrStatus:S.error?"failed":"done",ocrText:S.text}),a.faxOcrText=S.error?`エラー: ${S.error}`:S.text,a.faxRecords=await _(),a.faxProcessing=!1,x()},m.readAsDataURL(i)}catch(m){M("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,x()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",x()}),e.querySelectorAll("[data-action='ms-edit']").forEach(o=>{o.addEventListener("click",()=>{a.mailSenderEditingId=o.dataset.id??null,x()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,x()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,i={id:o,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(b=>b.id===o)?.isVerified??!1};if(!i.name||!i.email){M("名前とメールアドレスは必須です","warning");return}const{saveMailSender:c,fetchMailSenders:m}=await I(async()=>{const{saveMailSender:b,fetchMailSenders:$}=await Promise.resolve().then(()=>N);return{saveMailSender:b,fetchMailSenders:$}},void 0);await c(i)?(a.mailSenders=await m(),a.mailSenderEditingId=null,M("保存しました"),x()):M("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Se("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=o.dataset.id??"",{deleteMailSender:c,fetchMailSenders:m}=await I(async()=>{const{deleteMailSender:b,fetchMailSenders:$}=await Promise.resolve().then(()=>N);return{deleteMailSender:b,fetchMailSenders:$}},void 0);await c(i)?(a.mailSenders=await m(),x()):M("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(o=>{o.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){M("データなし","error");return}const o=a.demandAnalysis,i=Object.entries(o.matrix).map(([m,h])=>{const b={productCode:m};return o.months.forEach($=>{b[$]=h[$]??0}),b}),c=[{key:"productCode",label:"商品コード"},...o.months.map(m=>({key:m,label:m}))];Sa("demand-analysis.csv",i,c)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){M("データなし","error");return}const o=a.productionPlan.map(c=>({...c}));Sa("production-plan.csv",o,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await Se("当月の全請求を締め切りますか？")&&M("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async o=>{const i=parseInt(o.target.value);a.brewingPlanFY=i;const{fetchBrewingPlanSummary:c,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:h,fetchBrewingProductDetail:b,fetchBrewingCustomCategories:$,fetchBrewingCategoryOverrides:_,fetchAllBrewingStockEntries:S}=await I(async()=>{const{fetchBrewingPlanSummary:z,fetchBrewingMonthlyTrend:O,fetchBrewingSchedule:F,fetchBrewingProductDetail:V,fetchBrewingCustomCategories:j,fetchBrewingCategoryOverrides:J,fetchAllBrewingStockEntries:W}=await Promise.resolve().then(()=>N);return{fetchBrewingPlanSummary:z,fetchBrewingMonthlyTrend:O,fetchBrewingSchedule:F,fetchBrewingProductDetail:V,fetchBrewingCustomCategories:j,fetchBrewingCategoryOverrides:J,fetchAllBrewingStockEntries:W}},void 0),[L,k,A,q,C,T,R]=await Promise.all([c(`${i}-10-01`,`${i+1}-09-30`),m(`${i}-10-01`,`${i+1}-09-30`),h(i),b(`${i}-10-01`,`${i+1}-09-30`),$(),_(),S()]);a.brewingPlanData=L,a.brewingMonthlyTrend=k,a.brewingSchedule=A,a.brewingProductDetail=q,a.brewingStockEntries=R,a.brewingCustomCategories=C,a.brewingOverrides=T,a.brewingExcludedProducts=new Set,x()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.code??"",c=o.dataset.parent??"";if(!i||!c)return;if(o.checked){a.brewingExcludedProducts.delete(i),x();return}a.brewingExcludedProducts.add(i);const m=a.brewingCustomCategories.filter(h=>h.parentCategory===c);if(m.length===1){const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:$,fetchBrewingCategoryOverrides:_}=await I(async()=>{const{setBrewingCategoryOverride:T,fetchBrewingPlanSummary:R,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:O}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:T,fetchBrewingPlanSummary:R,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:O}},void 0);await h(i,m[0].name);const S=a.brewingPlanFY,{fetchBrewingYearlyShipments:L}=await I(async()=>{const{fetchBrewingYearlyShipments:T}=await Promise.resolve().then(()=>N);return{fetchBrewingYearlyShipments:T}},void 0),[k,A,q,C]=await Promise.all([b(`${S}-10-01`,`${S+1}-09-30`),$(`${S}-10-01`,`${S+1}-09-30`),_(),L()]);a.brewingPlanData=k,a.brewingProductDetail=A,a.brewingOverrides=q,a.brewingYearlyShipments=C,a.brewingExcludedProducts.delete(i)}x()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.code??"",c=o.dataset.cat??"";if(!i||!c)return;const{setBrewingCategoryOverride:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:$,fetchBrewingYearlyShipments:_}=await I(async()=>{const{setBrewingCategoryOverride:C,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:z,fetchBrewingYearlyShipments:O}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:C,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:z,fetchBrewingYearlyShipments:O}},void 0);await m(i,c);const S=a.brewingPlanFY,[L,k,A,q]=await Promise.all([h(`${S}-10-01`,`${S+1}-09-30`),b(`${S}-10-01`,`${S+1}-09-30`),$(),_()]);a.brewingPlanData=L,a.brewingProductDetail=k,a.brewingOverrides=A,a.brewingYearlyShipments=q,x()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.code??"";if(!i)return;const{setBrewingCategoryOverride:c,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h,fetchBrewingCategoryOverrides:b,fetchBrewingYearlyShipments:$}=await I(async()=>{const{setBrewingCategoryOverride:q,fetchBrewingPlanSummary:C,fetchBrewingProductDetail:T,fetchBrewingCategoryOverrides:R,fetchBrewingYearlyShipments:z}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:q,fetchBrewingPlanSummary:C,fetchBrewingProductDetail:T,fetchBrewingCategoryOverrides:R,fetchBrewingYearlyShipments:z}},void 0);await c(i,null);const _=a.brewingPlanFY,[S,L,k,A]=await Promise.all([m(`${_}-10-01`,`${_+1}-09-30`),h(`${_}-10-01`,`${_+1}-09-30`),b(),$()]);a.brewingPlanData=S,a.brewingProductDetail=L,a.brewingOverrides=k,a.brewingYearlyShipments=A,x()})}),e.querySelectorAll("[data-action='proc-add-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c=e.querySelector(`[data-action='proc-add-month-select'][data-cat='${i}']`),m=e.querySelector(`[data-action='proc-add-month-vol'][data-cat='${i}']`),h=parseInt(c?.value??"0"),b=parseFloat(m?.value??"0");if(!i||!h||b<=0)return;const _=[...a.brewingSchedule.filter(k=>k.brewCategory===i).map(k=>({brewMonth:k.brewMonth,durationMonths:k.durationMonths,plannedVolumeL:k.plannedVolumeL})),{brewMonth:h,durationMonths:2,plannedVolumeL:b}],{saveBrewingSchedule:S,fetchBrewingSchedule:L}=await I(async()=>{const{saveBrewingSchedule:k,fetchBrewingSchedule:A}=await Promise.resolve().then(()=>N);return{saveBrewingSchedule:k,fetchBrewingSchedule:A}},void 0);await S(i,a.brewingPlanFY,_),a.brewingSchedule=await L(a.brewingPlanFY),x()})}),e.querySelectorAll("[data-action='proc-remove-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c=parseInt(o.dataset.month??"0");if(!i||!c)return;const m=a.brewingSchedule.filter($=>$.brewCategory===i&&$.brewMonth!==c).map($=>({brewMonth:$.brewMonth,durationMonths:$.durationMonths,plannedVolumeL:$.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await I(async()=>{const{saveBrewingSchedule:$,fetchBrewingSchedule:_}=await Promise.resolve().then(()=>N);return{saveBrewingSchedule:$,fetchBrewingSchedule:_}},void 0);await h(i,a.brewingPlanFY,m),a.brewingSchedule=await b(a.brewingPlanFY),x()})}),e.querySelectorAll("[data-action='proc-edit-vol']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.cat??"",c=parseFloat(o.value)||0;if(!i)return;const{saveProcurementDecision:m}=await I(async()=>{const{saveProcurementDecision:h}=await Promise.resolve().then(()=>N);return{saveProcurementDecision:h}},void 0);await m(i,a.brewingPlanFY,c),a.procurementDecisions[i]=c,x()})}),e.querySelector("[data-action='proc-add-commitment']")?.addEventListener("click",async()=>{const o=(e.querySelector("#proc-commit-variety")?.value??"").trim(),i=parseFloat(e.querySelector("#proc-commit-bales")?.value??"0"),c=parseFloat(e.querySelector("#proc-commit-price")?.value??"0"),m=parseInt(e.querySelector("#proc-commit-month")?.value??"0")||null,h=(e.querySelector("#proc-commit-supplier")?.value??"").trim();if(!o||i<=0)return;const{saveRicePurchaseCommitment:b,fetchRicePurchaseCommitments:$}=await I(async()=>{const{saveRicePurchaseCommitment:_,fetchRicePurchaseCommitments:S}=await Promise.resolve().then(()=>N);return{saveRicePurchaseCommitment:_,fetchRicePurchaseCommitments:S}},void 0);await b({varietyName:o,committedBales:i,pricePerKg:c,deliveryMonth:m,supplier:h,fy:a.brewingPlanFY}),a.ricePurchaseCommitments=await $(a.brewingPlanFY),x()}),e.querySelector("[data-action='proc-add-variety']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-variety-name"),i=e.querySelector("#proc-variety-price"),c=o?.value.trim()??"",m=parseFloat(i?.value??"400")||400;if(!c)return;const{addRiceVariety:h,fetchRiceVarieties:b}=await I(async()=>{const{addRiceVariety:_,fetchRiceVarieties:S}=await Promise.resolve().then(()=>N);return{addRiceVariety:_,fetchRiceVarieties:S}},void 0);await h(c,m)&&(a.riceVarieties=await b(),o&&(o.value=""),i&&(i.value=""),M(`「${c}」を追加しました`)),x()}),e.querySelectorAll("[data-action='proc-delete-variety']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",{deleteRiceVariety:c,fetchRiceVarieties:m}=await I(async()=>{const{deleteRiceVariety:b,fetchRiceVarieties:$}=await Promise.resolve().then(()=>N);return{deleteRiceVariety:b,fetchRiceVarieties:$}},void 0);await c(i)&&(a.riceVarieties=await m()),x()})}),e.querySelectorAll("[data-action='brew-rice-variety-select']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.cat??"",c=o.dataset.field??"",m=o.value;if(!i||!c)return;const h=a.brewingRiceParams[i]??{brewCategory:i,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[c]=m;const b=a.riceVarieties.find(_=>_.name===m);b&&(c==="kojiVariety"&&(h.kojiPricePerKg=b.defaultPricePerKg),c==="kakeVariety"&&(h.kakePricePerKg=b.defaultPricePerKg)),a.brewingRiceParams[i]=h;const{saveBrewingRiceParams:$}=await I(async()=>{const{saveBrewingRiceParams:_}=await Promise.resolve().then(()=>N);return{saveBrewingRiceParams:_}},void 0);await $(i,h),x()})}),e.querySelector("[data-action='proc-add-new-cat']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-new-cat-name"),i=e.querySelector("#proc-new-cat-vol"),c=o?.value.trim()??"",m=parseFloat(i?.value??"0");if(!c){M("区分名を入力してください","warning");return}if(m<=0){M("醸造予定量を入力してください","warning");return}const{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await I(async()=>{const{saveBrewingSchedule:$,fetchBrewingSchedule:_}=await Promise.resolve().then(()=>N);return{saveBrewingSchedule:$,fetchBrewingSchedule:_}},void 0);await h(c,a.brewingPlanFY,[{brewMonth:10,durationMonths:2,plannedVolumeL:m}]),a.brewingSchedule=await b(a.brewingPlanFY),o&&(o.value=""),i&&(i.value=""),M(`「${c}」を追加しました`),x()}),e.querySelector("[data-action='brew-rice-bulk-apply']")?.addEventListener("click",async()=>{const o=parseFloat(e.querySelector("#rice-bulk-per-l")?.value??"0.50"),i=parseFloat(e.querySelector("#rice-bulk-koji")?.value??"0.30");if(isNaN(o)||isNaN(i))return;const{saveBrewingRiceParams:c}=await I(async()=>{const{saveBrewingRiceParams:b}=await Promise.resolve().then(()=>N);return{saveBrewingRiceParams:b}},void 0),m=Object.keys(a.brewingRiceParams),h=new Set([...m,...a.brewingYearlyShipments.map(b=>b.brewCategory)]);for(const b of h){const $=a.brewingRiceParams[b]??{brewCategory:b,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};$.ricePerLiterKg=o,$.kojiRatio=i,a.brewingRiceParams[b]=$,await c(b,$)}x()}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.cat??"",c=o.dataset.field??"",m=parseFloat(o.value);if(!i||!c||isNaN(m))return;const h=a.brewingRiceParams[i]??{brewCategory:i,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[c]=m,a.brewingRiceParams[i]=h;const{saveBrewingRiceParams:b}=await I(async()=>{const{saveBrewingRiceParams:$}=await Promise.resolve().then(()=>N);return{saveBrewingRiceParams:$}},void 0);await b(i,h),x()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.cat??"",c=parseFloat(o.value);if(!i)return;const{saveBrewingForecastOverride:m}=await I(async()=>{const{saveBrewingForecastOverride:h}=await Promise.resolve().then(()=>N);return{saveBrewingForecastOverride:h}},void 0);if(isNaN(c))await m(i,null),delete a.brewingForecastOverrides[i];else{const h=c/100;await m(i,h),a.brewingForecastOverrides[i]=h}x()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c="bc-"+encodeURIComponent(i).replace(/%/g,"-"),m=e.querySelector(`#alc-raw-${c}`),h=e.querySelector(`#alc-target-${c}`),b=parseFloat(m?.value??"18")||18,$=parseFloat(h?.value??"15")||15,{saveBrewingAlcoholSetting:_}=await I(async()=>{const{saveBrewingAlcoholSetting:L}=await Promise.resolve().then(()=>N);return{saveBrewingAlcoholSetting:L}},void 0);await _(i,b,$)&&(a.brewingAlcoholSettings[i]={brewCategory:i,rawAlcoholPct:b,targetAlcoholPct:$}),x()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.code??"",c=o.value,m=o.dataset.current??"";if(c===m)return;const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:$,fetchBrewingCategoryOverrides:_}=await I(async()=>{const{setBrewingCategoryOverride:L,fetchBrewingPlanSummary:k,fetchBrewingProductDetail:A,fetchBrewingCategoryOverrides:q}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:L,fetchBrewingPlanSummary:k,fetchBrewingProductDetail:A,fetchBrewingCategoryOverrides:q}},void 0);if(await h(i,c)){const L=a.brewingPlanFY,[k,A,q]=await Promise.all([b(`${L}-10-01`,`${L+1}-09-30`),$(`${L}-10-01`,`${L+1}-09-30`),_()]);a.brewingPlanData=k,a.brewingProductDetail=A,a.brewingOverrides=q}x()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.cat??"",c=o.value;if(!i||!c)return;const{linkTypeToCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:$,fetchCategoryTypeLinks:_}=await I(async()=>{const{linkTypeToCategory:C,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:z,fetchCategoryTypeLinks:O}=await Promise.resolve().then(()=>N);return{linkTypeToCategory:C,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:z,fetchCategoryTypeLinks:O}},void 0);await m(i,c);const S=a.brewingPlanFY,[L,k,A,q]=await Promise.all([h(`${S}-10-01`,`${S+1}-09-30`),b(`${S}-10-01`,`${S+1}-09-30`),$(),_()]);a.brewingPlanData=L,a.brewingProductDetail=k,a.brewingOverrides=A,a.brewingTypeLinks=q,x()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c=o.dataset.type??"";if(!i||!c)return;const{unlinkTypeFromCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:$,fetchCategoryTypeLinks:_}=await I(async()=>{const{unlinkTypeFromCategory:C,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:z,fetchCategoryTypeLinks:O}=await Promise.resolve().then(()=>N);return{unlinkTypeFromCategory:C,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:z,fetchCategoryTypeLinks:O}},void 0);await m(i,c);const S=a.brewingPlanFY,[L,k,A,q]=await Promise.all([h(`${S}-10-01`,`${S+1}-09-30`),b(`${S}-10-01`,`${S+1}-09-30`),$(),_()]);a.brewingPlanData=L,a.brewingProductDetail=k,a.brewingOverrides=A,a.brewingTypeLinks=q,x()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const o=e.querySelector("#brew-new-category-name"),i=e.querySelector("#brew-new-category-parent"),c=o?.value.trim()??"",m=i?.value??"";if(!c)return;if(!m){M("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map(_=>_.name)].includes(c)){M("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:b}=await I(async()=>{const{addBrewingCustomCategory:_}=await Promise.resolve().then(()=>N);return{addBrewingCustomCategory:_}},void 0);await b(c,m)?(a.brewingCustomCategories.push({name:c,parentCategory:m}),o&&(o.value=""),M(`「${c}」を追加しました（${m}系）`)):M("追加に失敗しました","error"),x()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"";if(!i)return;const{deleteBrewingCustomCategory:c,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h}=await I(async()=>{const{deleteBrewingCustomCategory:$,fetchBrewingPlanSummary:_,fetchBrewingProductDetail:S}=await Promise.resolve().then(()=>N);return{deleteBrewingCustomCategory:$,fetchBrewingPlanSummary:_,fetchBrewingProductDetail:S}},void 0);if(await c(i)){a.brewingCustomCategories=a.brewingCustomCategories.filter(L=>L.name!==i);for(const[L,k]of Object.entries(a.brewingOverrides))k===i&&delete a.brewingOverrides[L];const $=a.brewingPlanFY,[_,S]=await Promise.all([m(`${$}-10-01`,`${$+1}-09-30`),h(`${$}-10-01`,`${$+1}-09-30`)]);a.brewingPlanData=_,a.brewingProductDetail=S,M(`「${i}」を削除しました`)}x()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c=o.dataset.catId??"",h=e.querySelector(`#new-entry-target-${c}`)?.value??i,b=e.querySelector(`#new-entry-label-${c}`),$=e.querySelector(`#new-entry-vol-${c}`),_=b?.value.trim()??"",S=parseFloat($?.value??"0");if(S<=0)return;const{addBrewingStockEntry:L,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:A}=await I(async()=>{const{addBrewingStockEntry:C,fetchBrewingPlanSummary:T,fetchAllBrewingStockEntries:R}=await Promise.resolve().then(()=>N);return{addBrewingStockEntry:C,fetchBrewingPlanSummary:T,fetchAllBrewingStockEntries:R}},void 0);if(await L(h,_||`タンク${a.brewingStockEntries.filter(C=>C.brewCategory===h).length+1}`,S)){const C=a.brewingPlanFY,[T,R]=await Promise.all([k(`${C}-10-01`,`${C+1}-09-30`),A()]);a.brewingPlanData=T,a.brewingStockEntries=R}x(),requestAnimationFrame(()=>{const C=document.getElementById(`stock-display-${c}`),T=document.getElementById(`stock-edit-${c}`),R=document.querySelector(`.btn-edit-stock[data-cat-id="${c}"]`);C&&(C.style.display="none"),T&&(T.style.display=""),R&&(R.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.id??"",c=o.value;if(!i||!c)return;const{reassignBrewingStockEntry:m,fetchBrewingPlanSummary:h,fetchAllBrewingStockEntries:b}=await I(async()=>{const{reassignBrewingStockEntry:_,fetchBrewingPlanSummary:S,fetchAllBrewingStockEntries:L}=await Promise.resolve().then(()=>N);return{reassignBrewingStockEntry:_,fetchBrewingPlanSummary:S,fetchAllBrewingStockEntries:L}},void 0);if(await m(i,c)){const _=a.brewingPlanFY,[S,L]=await Promise.all([h(`${_}-10-01`,`${_+1}-09-30`),b()]);a.brewingPlanData=S,a.brewingStockEntries=L}x(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach(_=>{const S=document.getElementById(`stock-display-${_.dataset.catId}`),L=document.getElementById(`stock-edit-${_.dataset.catId}`);L&&L.querySelector(`[data-id="${i}"]`)&&(S&&(S.style.display="none"),L.style.display="",_.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.id??"",c=o.dataset.cat??"",m="bc-"+encodeURIComponent(c).replace(/%/g,"-"),{deleteBrewingStockEntry:h,fetchBrewingPlanSummary:b,fetchAllBrewingStockEntries:$}=await I(async()=>{const{deleteBrewingStockEntry:S,fetchBrewingPlanSummary:L,fetchAllBrewingStockEntries:k}=await Promise.resolve().then(()=>N);return{deleteBrewingStockEntry:S,fetchBrewingPlanSummary:L,fetchAllBrewingStockEntries:k}},void 0);if(await h(i)){const S=a.brewingPlanFY,[L,k]=await Promise.all([b(`${S}-10-01`,`${S+1}-09-30`),$()]);a.brewingPlanData=L,a.brewingStockEntries=k}x(),requestAnimationFrame(()=>{const S=document.getElementById(`stock-display-${m}`),L=document.getElementById(`stock-edit-${m}`),k=document.querySelector(`.btn-edit-stock[data-cat-id="${m}"]`);S&&(S.style.display="none"),L&&(L.style.display=""),k&&(k.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.catId??"",c=e.querySelector(`#stock-display-${i}`),m=e.querySelector(`#stock-edit-${i}`);c&&(c.style.display="none"),m&&(m.style.display=""),o.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.catId??"",c=e.querySelector(`#stock-display-${i}`),m=e.querySelector(`#stock-edit-${i}`),h=e.querySelector(`.btn-edit-stock[data-cat-id="${i}"]`);c&&(c.style.display=""),m&&(m.style.display="none"),h&&(h.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.catId??"",c=e.querySelector(`#schedule-rows-${i}`);if(!c)return;const m=c.querySelectorAll(".schedule-edit-row").length,h=document.createElement("div");h.innerHTML=buildScheduleEditRowHTML(i,m,9,2,0,"");const b=h.firstElementChild;c.appendChild(b),b.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>b.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(o=>{o.addEventListener("click",()=>o.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.cat??"",c=o.dataset.catId??"",m=e.querySelector(`#stock-input-${c}`),h=parseFloat(m?.value??"");if(isNaN(h)||h<0){alert("有効な数値を入力してください");return}o.textContent="保存中...",o.setAttribute("disabled","true");try{const{upsertBrewingStock:b,fetchBrewingPlanSummary:$,fetchBrewingMonthlyTrend:_}=await I(async()=>{const{upsertBrewingStock:A,fetchBrewingPlanSummary:q,fetchBrewingMonthlyTrend:C}=await Promise.resolve().then(()=>N);return{upsertBrewingStock:A,fetchBrewingPlanSummary:q,fetchBrewingMonthlyTrend:C}},void 0),S=a.brewingPlanFY;await b(i,h,0);const[L,k]=await Promise.all([$(`${S}-10-01`,`${S+1}-09-30`),_(`${S}-10-01`,`${S+1}-09-30`)]);a.brewingPlanData=L,a.brewingMonthlyTrend=k,x()}catch(b){console.error("[brewing save]",b),alert(`保存エラー: ${String(b)}`),o.textContent="保存",o.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.toggleCat??"",c=`sub-row-${"bc-"+encodeURIComponent(i).replace(/%/g,"-")}`,m=e.querySelectorAll(`.${c}`),h=o.querySelector(".toggle-icon"),b=m[0]?.style.display!=="none";m.forEach($=>{$.style.display=b?"none":""}),h&&(h.innerHTML=b?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{M("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{M("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(o=>{o.addEventListener("click",()=>{M("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{M("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(o=>{o.addEventListener("click",async()=>{await Se("この買掛を入金済みにしますか？")&&M("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(o=>{o.addEventListener("click",()=>{M("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{M("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(o=>{o.addEventListener("click",()=>{const i=o.closest("tr")?.querySelector("td")?.textContent??"";M(`タンク ${i} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{M("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(o=>{o.addEventListener("click",()=>{const i=o.closest("tr")?.querySelector("td")?.textContent??"";M(`注文 ${i} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{M("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(o=>{o.addEventListener("click",()=>{M("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{M("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.customer??"";M(`得意先 ${i} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{M("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!o||!await Se("このリストを削除しますか？"))return;const{supabaseDelete:c}=await I(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>H);return{supabaseDelete:h}},void 0);if(await c("lead_lists",o)){const{fetchLeadLists:h}=await I(async()=>{const{fetchLeadLists:b}=await Promise.resolve().then(()=>N);return{fetchLeadLists:b}},void 0);a.leadLists=await h(),M("削除しました","success"),x()}else M("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{M("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.scYm;if(!i)return;a.shipmentCalendarYearMonth=i,a.shipmentCalendarData=null,a.shipmentCalendarSelectedDate=null,x();const{fetchShipmentCalendar:c}=await I(async()=>{const{fetchShipmentCalendar:m}=await Promise.resolve().then(()=>N);return{fetchShipmentCalendar:m}},void 0);a.shipmentCalendarData=await c(i),x()})}),e.querySelectorAll("[data-sc-date]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.scDate;i&&(a.shipmentCalendarSelectedDate=a.shipmentCalendarSelectedDate===i?null:i,x())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(o=>{o.addEventListener("click",async()=>{a.calendarYearMonth=o.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:i}=await I(async()=>{const{fetchCalendarEvents:c}=await Promise.resolve().then(()=>N);return{fetchCalendarEvents:c}},void 0);a.calendarEvents=await i(a.calendarYearMonth),x()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async o=>{a.calendarYearMonth=o.target.value;const{fetchCalendarEvents:i}=await I(async()=>{const{fetchCalendarEvents:c}=await Promise.resolve().then(()=>N);return{fetchCalendarEvents:c}},void 0);a.calendarEvents=await i(a.calendarYearMonth),x()}),e.querySelector("#cal-filter-category")?.addEventListener("change",o=>{a.calendarFilterCategory=o.target.value,x()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const o=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(o.getTime()+3600*1e3).toISOString(),isAllDay:!1}},x()}),e.querySelectorAll("[data-cal-date]").forEach(o=>{o.tagName!=="BUTTON"&&o.addEventListener("click",i=>{if(i.target.closest(".cal-event"))return;const c=o.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${c}T10:00:00`,isAllDay:!1}},x()})}),e.querySelectorAll("[data-cal-event-id]").forEach(o=>{o.addEventListener("click",i=>{i.stopPropagation();const c=o.dataset.calEventId,m=a.calendarEvents.find(h=>h.id===c);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},x())})}),e.querySelectorAll("[data-action='cal-close']").forEach(o=>{o.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.calendarEdit=null,x())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:o,fetchCalendarEvents:i,CALENDAR_CATEGORY_COLORS:c}=await I(async()=>{const{saveCalendarEvent:_,fetchCalendarEvents:S,CALENDAR_CATEGORY_COLORS:L}=await Promise.resolve().then(()=>N);return{saveCalendarEvent:_,fetchCalendarEvents:S,CALENDAR_CATEGORY_COLORS:L}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,h=e.querySelector("#cal-category")?.value??"general",b={id:m,title:e.querySelector("#cal-title")?.value??"",category:h,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:c[h]};if(!b.title){M("タイトルは必須です","warning");return}await o(b)?(a.calendarEvents=await i(a.calendarYearMonth),a.calendarEdit=null,M("保存しました"),x()):M("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!o||!await Se("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:i,fetchCalendarEvents:c}=await I(async()=>{const{deleteCalendarEvent:h,fetchCalendarEvents:b}=await Promise.resolve().then(()=>N);return{deleteCalendarEvent:h,fetchCalendarEvents:b}},void 0);await i(o)?(a.calendarEvents=await c(a.calendarYearMonth),a.calendarEdit=null,M("削除しました"),x()):M("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,x();try{const o=a.importPreview.rows.filter(c=>c._valid),i=await zs(a.importEntity,o);a.importResult=`取り込み完了: ${i.inserted}件成功 / ${i.failed}件失敗`,a.importPreview=null}catch(o){a.importResult=`エラー: ${o instanceof Error?o.message:String(o)}`}finally{a.importing=!1,x()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const o=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=o,a.storeSales=[],a.actionLoading=!0,x(),Oa(o).then(i=>{a.storeSales=i,a.actionLoading=!1,x()})}),e.querySelectorAll("[data-action='copy-config']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.configValue??"";if(i)try{await navigator.clipboard.writeText(i),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(c){console.warn("Clipboard copy failed",c)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const i=JSON.stringify({supabase_url:ve,supabase_anon_key:re,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),c=new Blob([i],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download="relay_config.json",h.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.code??"";if(i)try{await navigator.clipboard.writeText(decodeURIComponent(i)),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(c){console.warn("Clipboard code copy failed",c)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(o=>{o.addEventListener("change",()=>{Ue(e),a.emailSaveMessage=null,x()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(o=>{o.addEventListener("change",()=>{Ue(e),a.emailSaveMessage=null,x()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{Ue(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{Ue(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(o=>{o.addEventListener("click",()=>{a.emailTemplateId=o.dataset.templateId??"custom";const i=Js(a.emailTemplateId);a.emailSubject=i.subject,a.emailBody=i.body,a.emailSaveMessage=null,x()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{Ue(e);const o=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${o}`),a.emailSaveMessage=null,x()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{Ue(e),a.actionLoading=!0,x(),It(ca("draft")).then(o=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(o.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,x()})}),e.querySelector("#email-sender")?.addEventListener("change",o=>{a.emailSenderId=o.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{Ue(e),a.actionLoading=!0,a.emailSending=!0,x();const o=ca("sent");a.mailSenders.find(i=>i.id===a.emailSenderId),ps().then(async i=>{await It({...o,recipientCount:i.sent}),a.emailSaveMessage=`${i.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,x(),M(`${i.sent}件送信完了`)}).catch(async()=>{await It(ca("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,x(),M("APIキー未設定のため下書き保存しました","warning")})})}function x(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=Ip()}catch(n){console.error("[renderApp] render error:",n),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(n)}

${n?.stack??""}</div>`;return}Rp(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),Ka()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const n of["fd-scaler","print-scaler","q-preview-scaler"]){const s=e.querySelector(`#${n}`),r=s?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),l=r?.querySelector(".print-page")??r;if(!s||!l)continue;const d=s.parentElement?.clientWidth??0,p=l.offsetWidth;if(d>0&&p>0&&p>d-24){const u=(d-24)/p;s.style.transform=`scale(${u})`,s.style.transformOrigin="top left",s.style.height=`${(l.offsetHeight+48)*u}px`}else s.style.transform="",s.style.height=""}});const t=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=t?"hidden":"",document.body.style.touchAction=t?"none":""}const Zs="sake-cloud-cache",Op=300*1e3;function jp(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(Zs,JSON.stringify(e))}catch{}}function Bp(){try{const e=localStorage.getItem(Zs);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>Op?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let eo=0;async function tt(){const e=Bp();e&&(a.loading=!1,x()),a.loading=!e,e||x();try{const[t,n,s,r,l,d,p,u,y]=await Promise.all([zn(),Fn(),Da(),Vn(),bt(a.invoiceFilter),qa(a.ledgerCustomerCode),Ia(),Yn(),Bn("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=s,a.pipelineMeta=r,a.invoiceRecords=l,a.customerLedger=d,a.salesAnalytics=p,a.syncDashboard=u,y){const v={...Nt,...fa(),...y};a.quoteCompanySettings=v,Qe(v)}if(Hn().then(v=>{a.announcements=v,x()}),et.length===0&&fp(),a.rawTableList.length===0&&vs().then(v=>{a.rawTableList=v,a.route==="/raw-browser"&&x()}),!a.salesFilter.startDate||!a.salesFilter.endDate){const g=[...t.salesRecords].sort((E,o)=>new Date(o.date).getTime()-new Date(E.date).getTime())[0]?.date??new Date().toISOString(),w=new Date(g),P=new Date(w);P.setDate(w.getDate()-30),a.salesFilter={startDate:In(P.toISOString()),endDate:In(w.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await bt(a.invoiceFilter)),a.error=null,jp()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,x(),Ga(a.route),eo=Date.now()}}window.addEventListener("popstate",()=>{a.route=Qs(location.pathname),a.currentCategory=Ha(a.route),a.sidebarOpen=!1,wt(),Ga(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,x();return}if(e.key==="Escape"){if(a.globalSearchOpen){wt(),x();return}if(a.pickerMode){Ft(),x();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Hs(),x());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&Gs(t)}});a.user=Vt()?uo():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await I(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>N);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),x()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,s=0,r=0,l=0,d=1;document.addEventListener("mousedown",p=>{const u=p.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;p.preventDefault();const y=u.closest(".fd-canvas");if(!y)return;const v=y.getBoundingClientRect();if(v.width===0)return;d=228.6/v.width,t=u,n=p.clientX,s=p.clientY,r=parseFloat(u.style.left)||0,l=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(E=>E.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const g=document.querySelector("#fd-selected-info");g&&(g.textContent=`選択中: ${u.title}`);const w=document.querySelector("#fd-sel-x"),P=document.querySelector("#fd-sel-y");w&&(w.value=String(r)),P&&(P.value=String(l))}),document.addEventListener("mousemove",p=>{if(!t)return;const u=(p.clientX-n)*d,y=(p.clientY-s)*d,v=Math.round((r+u)*2)/2,g=Math.round((l+y)*2)/2;t.style.left=v+"mm",t.style.top=g+"mm";const w=document.querySelector("#fd-sel-x"),P=document.querySelector("#fd-sel-y");w&&(w.value=String(v)),P&&(P.value=String(g))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",p=>{if(!a.fdDesignMode||!a.fdActiveFieldId||p.key!=="ArrowLeft"&&p.key!=="ArrowRight"&&p.key!=="ArrowUp"&&p.key!=="ArrowDown"||p.target.tagName==="INPUT"||p.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;p.preventDefault();const y=.5;let v=parseFloat(u.style.left)||0,g=parseFloat(u.style.top)||0;p.key==="ArrowLeft"?v-=y:p.key==="ArrowRight"?v+=y:p.key==="ArrowUp"?g-=y:p.key==="ArrowDown"&&(g+=y),u.style.left=v+"mm",u.style.top=g+"mm";const w=document.querySelector("#fd-sel-x"),P=document.querySelector("#fd-sel-y");w&&(w.value=String(v)),P&&(P.value=String(g))})})();tt();const zp=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&tt()},zp);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-eo>60*1e3&&tt()});let ka="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{ka=e}).catch(()=>{});setInterval(async()=>{if(!(!ka||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==ka&&!a.updateAvailable&&(a.updateAvailable=!0,x())}catch{}},120*1e3);export{I as _};
