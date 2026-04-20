(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();const ws="modulepreload",ks=function(e){return"/"+e},Ot={},b=function(t,n,i){let o=Promise.resolve();if(n&&n.length>0){let d=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};var a=d;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),r=l?.nonce||l?.getAttribute("nonce");o=d(n.map(u=>{if(u=ks(u),u in Ot)return;Ot[u]=!0;const p=u.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${y}`))return;const v=document.createElement("link");if(v.rel=p?"stylesheet":ws,p||(v.as="script"),v.crossOrigin="",v.href=u,r&&v.setAttribute("nonce",r),document.head.appendChild(v),p)return new Promise((f,A)=>{v.addEventListener("load",f),v.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${u}`)))})}))}function c(l){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=l,window.dispatchEvent(r),!r.defaultPrevented)throw l}return o.then(l=>{for(const r of l||[])r.status==="rejected"&&c(r.reason);return t().catch(c)})},J="https://loarwnuyvfxiscjjsmiz.supabase.co",F="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";async function Qe(e,t){try{const n=new URL(`/rest/v1/${e}`,J),i=await fetch(n.toString(),{method:"POST",headers:{apikey:F,Authorization:`Bearer ${F}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!i.ok)throw new Error(`HTTP ${i.status}`);return(await i.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function $t(e,t,n){try{const i=new URL(`/rest/v1/${e}?id=eq.${t}`,J);return(await fetch(i.toString(),{method:"PATCH",headers:{apikey:F,Authorization:`Bearer ${F}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function _t(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,J),i=await fetch(n.toString(),{method:"POST",headers:{apikey:F,Authorization:`Bearer ${F}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!i.ok)throw new Error(`HTTP ${i.status}`);return await i.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function wt(e){try{const t=new URL(`/rest/v1/${e}`,J);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:F,Authorization:`Bearer ${F}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const i=n.headers.get("Content-Range");if(i){const o=i.match(/\/(\d+)/);if(o)return parseInt(o[1],10)}return 0}catch{return 0}}async function S(e,t={}){try{const n=new URL(`/rest/v1/${e}`,J);Object.entries(t).forEach(([o,c])=>{n.searchParams.set(o,c)});const i=await fetch(n.toString(),{method:"GET",headers:{apikey:F,Authorization:`Bearer ${F}`,Accept:"application/json",Prefer:"return=representation"}});if(!i.ok)throw new Error(`HTTP ${i.status}`);return await i.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function ee(e,t={},n=1e3){const i=[];let o=0;try{for(;;){const c=new URL(`/rest/v1/${e}`,J);Object.entries(t).forEach(([r,d])=>{c.searchParams.set(r,d)}),c.searchParams.set("limit",String(n)),c.searchParams.set("offset",String(o));const a=await fetch(c.toString(),{method:"GET",headers:{apikey:F,Authorization:`Bearer ${F}`,Accept:"application/json",Prefer:"return=representation"}});if(!a.ok)throw new Error(`HTTP ${a.status}`);const l=await a.json();if(i.push(...l),l.length<n)break;o+=n}return i}catch(c){return console.warn(`Failed to query all rows from Supabase table ${e}`,c),i.length>0?i:[]}}const T=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:F,SUPABASE_URL:J,supabaseCount:wt,supabaseInsert:Qe,supabaseQuery:S,supabaseQueryAll:ee,supabaseRpc:_t,supabaseUpdate:$t},Symbol.toStringTag,{value:"Module"})),kt="sake_auth";function ma(e){localStorage.setItem(kt,JSON.stringify(e))}function ya(){return{apikey:F,"Content-Type":"application/json"}}function Ss(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),i=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(i))}catch{return null}}async function ha(e,t){const n=await fetch(`${J}/auth/v1/${e}`,{method:"POST",headers:ya(),body:JSON.stringify(t)}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i.error_description??i.msg??`HTTP ${n.status}`);return i}async function xs(e,t){const n=await ha("token?grant_type=password",{email:e,password:t});return ma({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function jt(e,t){const n=await ha("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&ma({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function As(){const e=We();if(localStorage.removeItem(kt),!!e?.access_token)try{await fetch(`${J}/auth/v1/logout`,{method:"POST",headers:{...ya(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function We(){const e=localStorage.getItem(kt);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function Es(){const e=We();if(!e)return null;const t=Ss(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function Ps(e){const t=We();if(!t)throw new Error("not signed in");const n=await fetch(`${J}/auth/v1/user`,{method:"PUT",headers:{apikey:F,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const i=await n.json().catch(()=>({}));throw new Error(i.msg??`HTTP ${n.status}`)}}const St={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},va={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},Cs={generatedAt:new Date().toISOString(),records:[]},se={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},Ls={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},Is={},Ds={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[]};function C(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function Ts(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Ns(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function m(e,t,n=""){for(const i of t){const o=e[i];if(typeof o=="string"&&o.length>0)return o}return n}function $(e,t,n=0){for(const i of t)if(i in e)return C(e[i]);return n}function z(e,t,n=!0){for(const i of t)if(i in e)return Ns(e[i]);return n}function j(e,t,n){for(const i of t){const o=e[i];if(typeof o!="string"||o.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(o))return new Date(`${o}T00:00:00Z`).toISOString();const c=new Date(o);if(!Number.isNaN(c.getTime()))return c.toISOString()}return n}function qs(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:j(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:C(e.total_amount??e.billed_amount)}}function Mt(e){const t=e.trim().toUpperCase(),n=Is[t];if(n)return n;const i=va.salesRecords.find(o=>o.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:i?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function fa(){const e=await ee("daily_sales_detail",{select:"sales_date,amount,document_count,bottles,volume_ml,price_per_bottle,price_per_liter",order:"sales_date.desc"});if(e.length>0){const[t,n]=await Promise.all([S("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),S("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"20"})]),o=new Date().toISOString().slice(0,10),c=o.slice(0,7),a=[...e].sort((v,f)=>v.sales_date.localeCompare(f.sales_date)).map(v=>({date:new Date(`${v.sales_date}T00:00:00Z`).toISOString(),amount:C(v.amount??v.sales_amount),bottles:C(v.bottles),volumeMl:C(v.volume_ml),pricePerBottle:C(v.price_per_bottle),pricePerLiter:C(v.price_per_liter)})),l=a.slice(-30),r=v=>C(v.amount??v.sales_amount),d=e.reduce((v,f)=>f.sales_date===o?v+r(f):v,0),u=e.reduce((v,f)=>f.sales_date.startsWith(c)?v+r(f):v,0),p=t.filter(v=>C(v.balance_amount)>0),y=n.map((v,f)=>({id:String(v.id??`sale-${f+1}`),documentNo:v.document_no??v.legacy_document_no??"",date:v.sales_date??"",customerCode:v.legacy_customer_code??"",customerName:v.customer_name??v.legacy_customer_code??"",amount:C(v.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:d,todayDelta:0,monthSales:u,monthDelta:0,unpaidCount:p.length,unpaidAmount:p.reduce((v,f)=>v+C(f.balance_amount),0)},dailySales:l,allDailySales:a,salesRecords:y}}return va}async function ba(){const e=await ee("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const i=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${i}-${n+1}`,customerCode:i,customerName:i,billedAmount:C(t.billed_amount),paymentAmount:C(t.paid_amount),balanceAmount:C(t.balance_amount),lastPaymentDate:null,status:Ts(t.payment_status)}})}:Cs}async function Je(){const[e,t]=await Promise.all([ee("customers"),ee("products")]);if(e.length>0||t.length>0){const n=e.length?e.map((o,c)=>{const a=typeof o.memo=="string"?JSON.parse(o.memo||"{}"):o.memo??{};return{id:m(o,["id","customer_id","code"],`customer-${c+1}`),code:m(o,["code","customer_code","legacy_customer_code"],`C${String(c+1).padStart(4,"0")}`),name:m(o,["name","customer_name","display_name"],`Customer ${c+1}`),kanaName:m(o,["kana_name"],""),shortName:m(o,["short_name"],""),postalCode:m(o,["postal_code"],""),address1:m(o,["address1"],""),address2:m(o,["address2"],""),phone:m(o,["phone"],""),fax:m(o,["fax"],""),email:m(o,["email"],""),staffCode:m(o,["staff_code"],""),businessType:m(o,["business_type"],""),areaCode:m(o,["delivery_area_code"],""),salesCategory:String(a.sales_category??""),closingDay:$(o,["closing_day","close_day"],31),paymentDay:$(o,["payment_day","due_day"],15),paymentMonth:Number(a.payment_month??0),paymentCycle:m(o,["payment_cycle"],""),billingCycleType:m(o,["billing_cycle_type"],""),billingCode:String(a.billing_code??""),creditLimit:$(o,["credit_limit"],0),taxMode:m(o,["tax_mode"],""),taxRound:String(a.tax_round??""),invoiceIssue:String(a.invoice_issue??""),invoiceType:m(o,["invoice_type"],""),priceGroup:String(a.price_group??""),priceType:String(a.price_type??""),customerGroup1:String(a.customer_group1??""),customerGroup2:String(a.customer_group2??""),bankName:m(o,["bank_name"],""),bankBranch:m(o,["bank_branch"],""),bankAccount:m(o,["bank_account"],""),isActive:z(o,["is_active","active","enabled"],!0),lat:o.lat?Number(o.lat):void 0,lng:o.lng?Number(o.lng):void 0}}):se.customers,i=t.length?t.map((o,c)=>({id:m(o,["id","product_id","code"],`product-${c+1}`),code:m(o,["code","product_code","legacy_product_code"],`P${String(c+1).padStart(5,"0")}`),janCode:m(o,["jan_code","jan","barcode"],""),name:m(o,["name","product_name","display_name"],`Product ${c+1}`),kanaName:m(o,["kana_name"],""),shortName:m(o,["short_name"],""),category:m(o,["category","category_name","category_code"],"未分類"),taxCategoryCode:m(o,["tax_category_code"],""),isActive:z(o,["is_active","active","enabled"],!0),listPrice:$(o,["list_price"],0),purchasePrice:$(o,["purchase_price"],0),salePrice:$(o,["default_sale_price","sale_price"],0),costPrice:$(o,["default_cost_price"],0),alcoholDegree:o.alcohol_degree!=null?Number(o.alcohol_degree):null,volumeMl:o.volume_ml!=null?Number(o.volume_ml):null,unit:m(o,["unit"],"本"),bottleType:m(o,["bottle_type"],""),containerCode:m(o,["container_code"],""),polishRate:o.polish_rate!=null?Number(o.polish_rate):null,riceType:m(o,["rice_type"],""),season:m(o,["season"],""),agingYears:$(o,["aging_years"],0)})):se.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||se.summary.customerCount,activeCustomerCount:e.length?n.filter(o=>o.isActive).length:se.summary.activeCustomerCount,productCount:t.length||se.summary.productCount,activeProductCount:t.length?i.filter(o=>o.isActive).length:se.summary.activeProductCount},customers:n,products:i}}return se}async function ga(){const e=await S("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"});if(e.length>0){const t=e[0],n=m(t,["status"],"success"),i=t.errors,o=Array.isArray(i)?i.length>0:!!i;return{generatedAt:new Date().toISOString(),lastSyncAt:j(t,["sync_ended_at","sync_started_at"],new Date().toISOString()),status:o?"warning":n==="error"?"error":"success",jobName:m(t,["agent_hostname"],"sake-relay"),message:`${$(t,["rows_upserted"],0)}行同期 / ${$(t,["files_updated"],0)}ファイル更新`}}return Ls}async function $a(){const e=await _t("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function Ue(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount,line_count",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];e.customerCode.trim()&&n.push(`customer_code.ilike.*${e.customerCode.trim()}*`,`legacy_customer_code.ilike.*${e.customerCode.trim()}*`),e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const i=await S("mv_invoice_with_line_count",t);return i.length>0?i.map((o,c)=>({id:m(o,["id"],`invoice-${c}`),documentNo:m(o,["document_no","legacy_document_no"],""),date:j(o,["sales_date"],""),customerCode:m(o,["legacy_customer_code","customer_code"],""),customerName:m(o,["customer_name","legacy_customer_code"],""),itemCount:$(o,["line_count"],0),amount:$(o,["total_amount","billed_amount"],0)})):[]}async function xt(e){const t=e.trim().toUpperCase();if(!t)return Mt("");const[n,i,o]=await Promise.all([S("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),S("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),S("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||i.length>0){const c=n.map((r,d)=>{const u=qs(r,d);return{id:u.id,date:u.date,documentNo:u.documentNo,amount:u.amount}}),a=i.map((r,d)=>({id:String(r.id??`payment-${d+1}`),date:j(r,["payment_date","received_date"],new Date().toISOString()),amount:C(r.payment_amount??r.amount),method:r.payment_method??r.method??"入金"})),l=o.find(r=>(r.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:C(l?.balance_amount),salesTotal:c.reduce((r,d)=>r+d.amount,0),paymentTotal:a.reduce((r,d)=>r+d.amount,0),salesHistory:c,paymentHistory:a}}return Mt(t)}async function _a(){const[e,t,n]=await Promise.all([S("mv_monthly_sales",{order:"month.asc"}),S("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),S("mv_product_sales_totals",{order:"amount.desc",limit:"100"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.slice(-12).map(i=>({month:m(i,["month"],""),amount:$(i,["amount"],0)})),productTotals:n.map(i=>({code:m(i,["code"],""),name:m(i,["name"],""),amount:$(i,["amount"],0),quantity:$(i,["quantity"],0),documents:$(i,["documents"],0)})),customerTotals:t.map(i=>({code:m(i,["code"],""),name:m(i,["name"],""),amount:$(i,["amount"],0),quantity:$(i,["quantity"],0),documents:$(i,["documents"],0)}))}:Ds}const wa={all:{products:"mv_product_sales_totals",customers:"mv_customer_sales_totals"},yearly:{products:"mv_product_sales_yearly",customers:"mv_customer_sales_yearly"},monthly:{products:"mv_product_sales_monthly",customers:"mv_customer_sales_monthly"},weekly:{products:"mv_product_sales_weekly",customers:"mv_customer_sales_weekly"},daily:{products:"mv_product_sales_daily",customers:"mv_customer_sales_daily"}};async function Rs(e,t,n){const i=wa[t][e],o={order:"amount.desc",limit:"200"};return n&&t!=="all"&&(o.period=`eq.${n}`),(await S(i,o)).map(a=>({code:m(a,["code"],""),name:m(a,["name"],""),period:m(a,["period"],""),amount:$(a,["amount"],0),quantity:$(a,["quantity"],0),documents:$(a,["documents"],0)}))}async function Os(e,t){if(t==="all")return[];const n=wa[t][e],i=await _t("get_distinct_periods",{view_name:n});if(i&&i.length>0)return i.map(a=>a.period).filter(Boolean).sort().reverse();const o=await S(n,{select:"period",order:"period.desc",limit:"1000"});return[...new Set(o.map(a=>m(a,["period"],"")))].filter(Boolean).sort().reverse()}const dt={sales:"売上",return:"返品",export_return:"輸出戻入"};async function ka(e){const t=e.lines.reduce((o,c)=>o+c.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Qe("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const Ft={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function At(e){const t=await S("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],i=C(n.total_amount);return{documentNo:e,invoiceDate:m(n,["sales_date","document_date"],""),customerCode:m(n,["legacy_customer_code","customer_code"],""),customerName:m(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:i,taxAmount:Math.floor(i*10/110),note:""}}return{...Ft,documentNo:e||Ft.documentNo}}const js={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function Et(e){const t=await S("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(o=>{const c=$(o,["sales_amount"],0),a=$(o,["tax_amount"],0);return{customerCode:m(o,["customer_code"],""),customerName:m(o,["customer_name"],""),closingDay:31,salesAmount:c,taxAmount:a,prevBalance:0,paymentAmount:0,billingAmount:c,status:"open"}}),i=n.reduce((o,c)=>o+c.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:i,customers:n}}return{...js,targetYearMonth:e}}const Ms={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function Ke(){const[e,t,n]=await Promise.all([S("mv_monthly_sales",{order:"month.asc"}),S("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),S("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return Ms;const i=e.slice(-12).map(r=>m(r,["month"],"")),o=new Map;t.forEach(r=>{const d=m(r,["code"],"");o.has(d)||o.set(d,{name:m(r,["name"],d),monthValues:new Map}),o.get(d).monthValues.set(m(r,["month"],""),$(r,["amount"],0))});const a=Array.from(o.entries()).map(([r,d])=>({code:r,name:d.name,total:i.reduce((u,p)=>u+(d.monthValues.get(p)??0),0),monthValues:d.monthValues})).sort((r,d)=>d.total-r.total).slice(0,10).map(r=>({label:r.name,values:i.map(d=>r.monthValues.get(d)??0)})),l=n.map(r=>({label:m(r,["name"],""),values:i.map(()=>Math.round($(r,["amount"],0)/i.length))}));return{generatedAt:new Date().toISOString(),months:i,salesByProduct:a,salesByCustomer:l,costSimulation:[]}}async function Fs(){const e=await ee("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const i=m(n,["code"],"");if(!i)return;const o=m(n,["month"],""),c=parseInt(o.slice(5,7))-1;if(c<0||c>11)return;let a=t.get(i);a||(a={name:m(n,["name"],i),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(i,a)),a.qty[c]+=$(n,["quantity"],0),a.amt[c]+=$(n,["amount"],0)}),Array.from(t.entries()).map(([n,i])=>({code:n,name:i.name,monthlyQuantity:i.qty,monthlyAmount:i.amt,totalQuantity:i.qty.reduce((o,c)=>o+c,0),totalAmount:i.amt.reduce((o,c)=>o+c,0)})).filter(n=>n.totalQuantity>0).sort((n,i)=>i.totalAmount-n.totalAmount)}async function Bs(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await ee("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(a=>String(a.id)).filter(Boolean);const i=await ee("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),o=new Map;n.forEach(a=>{a.id&&o.set(String(a.id),a)});const c=[];return i.forEach(a=>{const l=String(a.header_id??a.document_header_id??""),r=o.get(l);if(!r)return;const d=r.sales_date??r.document_date??"";!d||d<t||c.push({date:d.slice(0,10),customerName:r.customer_name??"不明",productName:a.product_name??"不明",quantity:C(a.quantity),documentNo:r.document_no??r.legacy_document_no??""})}),c.sort((a,l)=>a.date.localeCompare(l.date))}async function Sa(){const e=new Date().toISOString();return(await S("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:m(n,["id"],""),message:m(n,["message"],""),level:m(n,["level"],"info"),startsAt:j(n,["starts_at"],""),endsAt:n.ends_at?j(n,["ends_at"],""):null,dismissible:z(n,["dismissible"],!0)}))}async function xa(e,t,n){try{return await Qe("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function Aa(e,t){return $t("customers",e,t)}async function Ea(e,t){return $t("products",e,t)}async function Pa(e,t){const n=e.find(a=>a.code===t);n?.priceGroup;const i=n?.priceGroup||t;let o="";try{const a=await S("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});a[0]?.memo&&(o=(typeof a[0].memo=="string"?JSON.parse(a[0].memo):a[0].memo)?.price_type??"")}catch{}const c=new Map;if(i){const a=await S("customer_product_prices",{price_group:`eq.${i}`,select:"legacy_product_code,special_price"});for(const l of a)c.set(l.legacy_product_code,l.special_price)}return{priceType:o,priceGroup:i,individualPrices:c}}function Ca(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"標準価格"}}async function La(){return(await S("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function zs(){return(await ee("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Ia(){return(await S("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function Da(){const[e,t]=await Promise.all([S("mv_customer_abc",{order:"amount.desc"}),Ke()]),n=e.map(i=>({code:m(i,["code"],""),name:m(i,["name"],""),amount:$(i,["amount"],0),documents:$(i,["documents"],0),ratio:$(i,["ratio"],0),cumRatio:$(i,["cum_ratio"],0),abcRank:m(i,["abc_rank"],"C")}));return{generatedAt:new Date().toISOString(),ranking:n,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function Vs(){const[e,t]=await Promise.all([S("mv_product_abc",{order:"amount.desc"}),Ke()]),n=e.map(a=>({code:m(a,["code"],""),name:m(a,["name"],""),amount:$(a,["amount"],0),quantity:$(a,["quantity"],0),ratio:$(a,["ratio"],0),cumRatio:$(a,["cum_ratio"],0),abcRank:m(a,["abc_rank"],"C")})),i=n.reduce((a,l)=>a+l.amount,0),o=new Set(n.filter(a=>a.abcRank==="A").map(a=>a.name)),c=t.salesByProduct.filter(a=>o.has(a.label));return{generatedAt:new Date().toISOString(),totalAmount:i,ranking:n,months:t.months,monthlyByProduct:c.length>0?c:t.salesByProduct}}const Ta={planned:"計画中",active:"仕込中",done:"完了"};async function Na(){const e=await S("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),jikomiNo:m(t,["batch_no","legacy_batch_no"],""),productName:m(t,["brand_name"],""),riceType:m(t,["rice_type"],""),plannedKg:$(t,["planned_rice_kg"],0),actualKg:$(t,["actual_rice_kg"],0),startDate:j(t,["start_date"],""),expectedDoneDate:j(t,["expected_done_date"],""),status:m(t,["status"],"planned"),tankNo:m(t,["tank_no"],""),note:m(t,["remarks"],"")})):[]}async function qa(){const e=await S("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),tankNo:m(t,["tank_no"],""),capacity:$(t,["capacity_l"],0),currentVolume:$(t,["current_volume_l"],0),productName:m(t,["current_product_code"],""),jikomiNo:m(t,["current_batch_id"],""),status:m(t,["status"],"empty"),lastUpdated:j(t,["last_updated_at"],"")})):[]}async function Ra(){const e=await S("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),kenteiNo:m(t,["kentei_no"],""),jikomiNo:m(t,["batch_id"],""),productName:m(t,["product_code"],""),kenteiDate:j(t,["kentei_date"],""),alcoholDegree:$(t,["alcohol_degree"],0),extractDegree:$(t,["extract_degree"],0),sakaMeterValue:$(t,["sakemeter_value"],0),volume:$(t,["volume_l"],0),taxCategory:m(t,["tax_category_code"],""),status:m(t,["status"],"pending")})):[]}async function ut(){const e=await S("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),code:m(t,["material_code","legacy_material_code"],""),name:m(t,["name"],""),unit:m(t,["unit"],""),currentStock:$(t,["current_stock"],0),minimumStock:$(t,["minimum_stock"],0),unitCost:$(t,["unit_cost"],0),lastUpdated:j(t,["updated_at"],"")})):[]}async function Oa(){const e=await S("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),documentNo:m(t,["document_no","legacy_document_no"],""),purchaseDate:j(t,["purchase_date"],""),supplierCode:m(t,["supplier_code","legacy_supplier_code"],""),supplierName:m(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:$(t,["total_amount"],0),status:m(t,["payment_status"],"pending")})):[]}async function ja(){const e=await S("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:m(t,["supplier_code","legacy_supplier_code"],""),supplierName:m(t,["legacy_supplier_code"],""),totalPurchase:$(t,["total_purchase"],0),paidAmount:$(t,["paid_amount"],0),balance:$(t,["balance"],0),nextPaymentDate:j(t,["next_payment_date"],""),status:m(t,["status"],"unpaid")})):[]}async function Ma(){const e=await S("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),billNo:m(t,["bill_no"],""),supplierName:m(t,["counterparty_name"],""),amount:$(t,["amount"],0),issueDate:j(t,["issue_date"],""),dueDate:j(t,["due_date"],""),status:m(t,["status"],"holding")})):[]}async function Fa(){const e=await S("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:m(t,["material_code","legacy_material_code"],""),name:m(t,["name"],""),unit:m(t,["unit"],""),currentStock:$(t,["current_stock"],0),minimumStock:$(t,["minimum_stock"],0),lastPurchaseDate:j(t,["last_purchase_date"],""),unitCost:$(t,["unit_cost"],0)})):[]}const Ba=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],pt={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Js={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function Pt(e,t){const n=await S("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const i=n[0],o=m(i,["id"],""),[c,a]=await Promise.all([S("tax_declaration_rows",{declaration_id:`eq.${o}`,order:"tax_category_code.asc"}),S("tax_deductions",{declaration_id:`eq.${o}`})]),l=c.map(d=>({taxCategory:m(d,["tax_category_code"],""),taxCategoryName:m(d,["tax_category_name"],""),alcoholDegree:$(d,["alcohol_degree"],0),volume:$(d,["taxable_volume"],0),taxRate:$(d,["tax_rate"],0),taxAmount:$(d,["tax_amount"],0),productionVolume:$(d,["production_volume"],0),previousBalance:$(d,["previous_balance"],0),currentAdjustment:$(d,["current_adjustment"],0),exportDeduction:$(d,["export_deduction"],0),sampleDeduction:$(d,["sample_deduction"],0),taxableVolume:$(d,["taxable_volume"],0)})),r=a.map(d=>({type:m(d,["deduction_type"],"sample"),categoryCode:m(d,["tax_category_code"],""),volume:$(d,["volume"],0),reason:m(d,["reason"],""),documentNo:m(d,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:m(i,["company_name"],""),companyNo:m(i,["company_no"],""),companyAddress:m(i,["company_address"],""),companyRepresentative:m(i,["company_representative"],""),taxOffice:m(i,["tax_office"],""),rows:l,deductions:r,totalVolume:$(i,["total_taxable_volume"],0),totalTax:$(i,["total_tax_amount"],0),status:m(i,["status"],"draft"),submittedAt:m(i,["submitted_at"],"")||null}}return{...Js,targetYear:e,targetMonth:t}}function U(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function za(e){const t=e.rows.map(i=>`    <Category>
      <Code>${U(i.taxCategory)}</Code>
      <Name>${U(i.taxCategoryName)}</Name>
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
`),n=e.deductions.map(i=>`    <Deduction type="${U(i.type)}">
      <CategoryCode>${U(i.categoryCode)}</CategoryCode>
      <Volume>${i.volume}</Volume>
      <Reason>${U(i.reason)}</Reason>${i.documentNo?`
      <DocumentNo>${U(i.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${U(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${U(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${U(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${U(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${U(e.taxOffice)}</TaxOffice>
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
`}function Us(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function Ys(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),i=e.rows.map(c=>[c.taxCategory,c.taxCategoryName,c.alcoholDegree,c.productionVolume,c.previousBalance,c.currentAdjustment,c.exportDeduction,c.sampleDeduction,c.taxableVolume,c.taxRate,c.taxAmount].map(Us).join(",")),o=`,合計,,${e.rows.reduce((c,a)=>c+a.productionVolume,0)},,,${e.rows.reduce((c,a)=>c+a.exportDeduction,0)},${e.rows.reduce((c,a)=>c+a.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...i,o].join(`
`)+`
`}function Hs(e){const t=e.rows.map(o=>{const c=Math.max(0,o.productionVolume+o.previousBalance+o.currentAdjustment-o.exportDeduction-o.sampleDeduction),a=Math.round(c*o.taxRate);return{...o,taxableVolume:c,volume:c,taxAmount:a}}),n=t.reduce((o,c)=>o+c.taxableVolume,0),i=t.reduce((o,c)=>o+c.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:i}}async function Gs(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>T);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:za(e),submitted_at:e.submittedAt})}async function Ct(e){const t=await S("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:m(n,["id"],""),saleDate:m(n,["sale_date"],e),saleTime:m(n,["sale_time"],""),productCode:m(n,["product_code"],""),productName:m(n,["product_name"],""),quantity:$(n,["quantity"],0),unitPrice:$(n,["unit_price"],0),amount:$(n,["amount"],0),paymentMethod:m(n,["payment_method"],"cash")})):[]}async function Va(){const e=await S("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:m(t,["id"],""),orderNo:m(t,["order_no"],""),orderDate:j(t,["order_date"],""),customerName:m(t,["customer_name"],""),postalCode:m(t,["postal_code"],""),address:m(t,["shipping_address"],""),items:[],totalAmount:$(t,["total_amount"],0),status:m(t,["status"],"new"),shippingDate:j(t,["shipping_date"],"")})):[]}async function ze(e){const t=await Qe("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Ja(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Xs(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await S("print_layouts",t)).map(i=>({id:m(i,["id"],""),name:m(i,["name"],""),templateKey:m(i,["template_key"],""),positions:i.positions??{},isDefault:z(i,["is_default"],!1),note:m(i,["note"],""),updatedAt:m(i,["updated_at"],"")}))}async function Qs(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>T);return{supabaseInsert:o}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},i=await t("print_layouts",n);return i?{id:m(i,["id"],e.id),name:m(i,["name"],e.name),templateKey:m(i,["template_key"],e.templateKey),positions:i.positions??e.positions,isDefault:z(i,["is_default"],!1),note:m(i,["note"],""),updatedAt:m(i,["updated_at"],"")}:null}async function Ws(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Ks(){return(await S("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),email:m(t,["email"],""),displayName:m(t,["display_name"],""),signature:m(t,["signature"],""),replyTo:m(t,["reply_to"],""),isDefault:z(t,["is_default"],!1),isVerified:z(t,["is_verified"],!1),note:m(t,["note"],"")}))}async function Zs(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:m(n,["id"],e.id),name:m(n,["name"],e.name),email:m(n,["email"],e.email),displayName:m(n,["display_name"],""),signature:m(n,["signature"],""),replyTo:m(n,["reply_to"],""),isDefault:z(n,["is_default"],!1),isVerified:z(n,["is_verified"],!1)}:null}async function en(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const Lt={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},It={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function tn(e){const t=`${e}-01T00:00:00Z`,[n,i]=e.split("-").map(l=>parseInt(l,10)),o=new Date(n,i,0).getDate(),c=`${e}-${String(o).padStart(2,"0")}T23:59:59Z`;return(await S("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${c})`,order:"starts_at.asc"})).map(l=>({id:m(l,["id"],""),title:m(l,["title"],""),description:m(l,["description"],""),category:m(l,["category"],"general")||"general",startsAt:m(l,["starts_at"],new Date().toISOString()),endsAt:m(l,["ends_at"],""),isAllDay:z(l,["is_all_day"],!1),location:m(l,["location"],""),attendees:l.attendees??[],relatedCustomerCode:m(l,["related_customer_code"],""),relatedOrderId:m(l,["related_order_id"],""),color:m(l,["color"],""),googleEventId:m(l,["google_event_id"],"")}))}async function an(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??It[e.category],updated_at:new Date().toISOString()})?e:null}async function sn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Ua(){return(await S("integration_settings",{order:"name.asc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),provider:m(t,["provider"],""),config:t.config??{},isEnabled:z(t,["is_enabled"],!1),lastSyncAt:m(t,["last_sync_at"],""),lastStatus:m(t,["last_status"],"")}))}async function Ce(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function nn(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const i=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,o=await fetch(i,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!o.ok)return{count:0,error:`HTTP ${o.status}`};const c=await o.json(),{supabaseInsert:a}=await b(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>T);return{supabaseInsert:r}},void 0);let l=0;for(const r of c.orders){const d=`shopify_${r.id}`;await a("shopify_orders",{id:d,shopify_order_id:String(r.id),order_number:String(r.order_number??""),order_date:String(r.created_at??new Date().toISOString()),customer_name:String(r.customer?.first_name??"")+" "+String(r.customer?.last_name??""),customer_email:String(r.customer?.email??""),total_amount:Math.round(parseFloat(String(r.total_price??"0"))),financial_status:String(r.financial_status??""),fulfillment_status:String(r.fulfillment_status??"unfulfilled"),line_items:r.line_items??[],shipping_address:r.shipping_address??null,raw_payload:r}),l++}return await Ce({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${l}件取得成功`}),{count:l}}catch(i){return{count:0,error:i instanceof Error?i.message:String(i)}}}async function ln(){return(await S("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:m(t,["id"],""),shopifyOrderId:m(t,["shopify_order_id"],""),orderNumber:m(t,["order_number"],""),orderDate:m(t,["order_date"],""),customerName:m(t,["customer_name"],""),customerEmail:m(t,["customer_email"],""),totalAmount:C(t.total_amount),financialStatus:m(t,["financial_status"],""),fulfillmentStatus:m(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function on(e){const t=e.config.refresh_token,n=e.config.client_id,i=e.config.client_secret;if(!t||!n||!i)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const o=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:i})});if(!o.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${o.status}`};const a=(await o.json()).access_token;return await Ce({...e,config:{...e.config,oauth_token:a}}),e.config.oauth_token=a,{token:a}}async function rn(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const i=new Date().toISOString(),o=new Date(Date.now()+30*86400*1e3).toISOString(),c=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${i}&timeMax=${o}&singleEvents=true&orderBy=startTime`;let a=await fetch(c,{headers:{Authorization:`Bearer ${t}`}});if(a.status===401){const u=await on(e);if(u.error)return{count:0,error:u.error};t=u.token,a=await fetch(c,{headers:{Authorization:`Bearer ${t}`}})}if(!a.ok)return{count:0,error:`HTTP ${a.status}`};const l=await a.json(),{supabaseInsert:r}=await b(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>T);return{supabaseInsert:u}},void 0);let d=0;for(const u of l.items){const p=`gcal_${u.id}`,y=u.start?.dateTime??u.start?.date??"",v=u.end?.dateTime??u.end?.date??"";await r("calendar_events",{id:p,title:String(u.summary??"(無題)"),description:String(u.description??""),category:"general",starts_at:String(y),ends_at:String(v),location:String(u.location??""),google_event_id:String(u.id??""),updated_at:new Date().toISOString()}),d++}return await Ce({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得`}),{count:d}}catch(i){return{count:0,error:i instanceof Error?i.message:String(i)}}}async function cn(){return(await S("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:m(t,["id"],""),receivedAt:m(t,["received_at"],""),senderPhone:m(t,["sender_phone"],""),senderName:m(t,["sender_name"],""),imageUrl:m(t,["image_url"],""),ocrStatus:m(t,["ocr_status"],"pending")||"pending",ocrText:m(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:m(t,["linked_invoice_id"],"")}))}async function dn(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const i=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,o=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return o.ok?{text:(await o.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${o.status}`}}catch(i){return{text:"",error:i instanceof Error?i.message:String(i)}}}async function un(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Ye={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},He={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function pn(){return(await S("user_profiles",{order:"display_name.asc"})).map(t=>({id:m(t,["id"],""),email:m(t,["email"],""),displayName:m(t,["display_name"],""),staffCode:m(t,["staff_code"],""),department:m(t,["department"],"all")||"all",role:m(t,["role"],"staff")||"staff",defaultMailSenderId:m(t,["default_mail_sender_id"],""),phone:m(t,["phone"],""),avatarUrl:m(t,["avatar_url"],""),isActive:z(t,["is_active"],!0),lastSignInAt:m(t,["last_sign_in_at"],""),createdAt:m(t,["created_at"],"")}))}async function mn(e){if(!e)return null;const t=await S("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:m(n,["id"],""),email:m(n,["email"],""),displayName:m(n,["display_name"],""),staffCode:m(n,["staff_code"],""),department:m(n,["department"],"all")||"all",role:m(n,["role"],"staff")||"staff",defaultMailSenderId:m(n,["default_mail_sender_id"],""),phone:m(n,["phone"],""),avatarUrl:m(n,["avatar_url"],""),isActive:z(n,["is_active"],!0),lastSignInAt:m(n,["last_sign_in_at"],"")}}async function yn(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function hn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function vn(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>T);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function fn(e=100){return(await S("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),action:m(n,["action"],""),entityType:m(n,["entity_type"],""),entityId:m(n,["entity_id"],""),userEmail:m(n,["user_email"],""),changes:n.changes??{},createdAt:m(n,["created_at"],"")}))}const Ge={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function Ya(){return(await S("slack_notifications",{order:"event_type.asc"})).map(t=>({id:m(t,["id"],""),eventType:m(t,["event_type"],"new_order"),enabled:z(t,["enabled"],!0),channel:m(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:m(t,["last_triggered_at"],"")}))}async function bn(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function gn(e=50){return(await S("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),eventType:m(n,["event_type"],""),channel:m(n,["channel"],""),message:m(n,["message"],""),status:m(n,["status"],"sent"),error:m(n,["error"],""),sentAt:m(n,["sent_at"],"")}))}async function $n(e,t,n){const o=(await Ua()).find(d=>d.provider==="slack");if(!o||!o.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const c=o.config.webhook_url;if(!c)return{ok:!1,error:"Webhook URL未設定"};const l=(await Ya()).find(d=>d.eventType===e&&d.enabled);if(!l)return{ok:!1,error:"通知ルールが無効"};const r=n??l.channel??o.config.default_channel??"#general";try{const d=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${Ge[e]} ${t}`,channel:r})}),u=d.ok,{supabaseInsert:p}=await b(async()=>{const{supabaseInsert:y}=await Promise.resolve().then(()=>T);return{supabaseInsert:y}},void 0);return await p("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:r,message:t,status:u?"sent":"failed",error:u?null:`HTTP ${d.status}`}),u?{ok:!0}:{ok:!1,error:`HTTP ${d.status}`}}catch(d){return{ok:!1,error:d instanceof Error?d.message:String(d)}}}const Le={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},Ze={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function _n(){return(await S("prospects",{order:"updated_at.desc"})).map(t=>({id:m(t,["id"],""),companyName:m(t,["company_name"],""),contactName:m(t,["contact_name"],""),email:m(t,["email"],""),phone:m(t,["phone"],""),address:m(t,["address"],""),website:m(t,["website"],""),businessType:m(t,["business_type"],""),stage:m(t,["stage"],"cold"),source:m(t,["source"],""),expectedAmount:C(t.expected_amount),probability:C(t.probability),assignedStaffCode:m(t,["assigned_staff_code"],""),nextActionDate:m(t,["next_action_date"],""),nextAction:m(t,["next_action"],""),note:m(t,["note"],""),lastContactAt:m(t,["last_contact_at"],""),wonAt:m(t,["won_at"],""),lostAt:m(t,["lost_at"],""),lostReason:m(t,["lost_reason"],""),convertedCustomerCode:m(t,["converted_customer_code"],""),createdAt:m(t,["created_at"],"")}))}async function Ha(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()})?e:null}async function wn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/prospects","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function kn(e){return(await S("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:m(n,["id"],""),prospectId:m(n,["prospect_id"],""),activityType:m(n,["activity_type"],"call"),title:m(n,["title"],""),description:m(n,["description"],""),activityDate:m(n,["activity_date"],""),result:m(n,["result"],""),staffCode:m(n,["staff_code"],"")}))}async function Sn(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const Ga=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function xn(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function An(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function En(){return(await S("delivery_locations",{order:"name.asc"})).map(t=>({id:m(t,["id"],""),customerCode:m(t,["customer_code"],""),name:m(t,["name"],""),postalCode:m(t,["postal_code"],""),address:m(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:m(t,["contact_name"],""),phone:m(t,["phone"],""),deliveryNote:m(t,["delivery_note"],""),isActive:z(t,["is_active"],!0)}))}async function Pn(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function Cn(e=50){return(await S("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),callDirection:m(n,["call_direction"],"inbound"),fromNumber:m(n,["from_number"],""),toNumber:m(n,["to_number"],""),matchedCustomerCode:m(n,["matched_customer_code"],""),matchedProspectId:m(n,["matched_prospect_id"],""),durationSeconds:C(n.duration_seconds),callStatus:m(n,["call_status"],"answered"),recordingUrl:m(n,["recording_url"],""),transcript:m(n,["transcript"],""),ivryCallId:m(n,["ivry_call_id"],""),startedAt:m(n,["started_at"],""),endedAt:m(n,["ended_at"],""),notes:m(n,["notes"],"")}))}async function Xa(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function Ln(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const i=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,o=await fetch(i,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!o.ok)return{count:0,error:`HTTP ${o.status}`};const a=(await o.json()).calls??[];let l=0;for(const r of a)await Xa({id:`ivry_${r.id}`,callDirection:String(r.direction??"inbound"),fromNumber:String(r.from??""),toNumber:String(r.to??""),durationSeconds:Number(r.duration??0),callStatus:String(r.status??"answered"),recordingUrl:String(r.recording_url??""),startedAt:String(r.started_at??""),endedAt:String(r.ended_at??""),ivryCallId:String(r.id??"")}),l++;return await Ce({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${l}件取得`}),{count:l}}catch(i){return{count:0,error:i instanceof Error?i.message:String(i)}}}async function In(e,t){const n=e.config.api_key,i=e.config.team_id;if(!n||!i)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let o=0;for(const c of t){if(!c.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${i}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:c.name,phone_number:c.phone,external_id:c.customerCode??"",note:c.note??""})})).ok&&o++}return{synced:o}}catch(o){return{synced:0,error:o instanceof Error?o.message:String(o)}}}async function Dn(){return(await S("lead_lists",{order:"created_at.desc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),query:m(t,["query"],""),area:m(t,["area"],""),businessType:m(t,["business_type"],""),totalCount:C(t.total_count),source:m(t,["source"],"manual"),createdAt:m(t,["created_at"],"")}))}async function Tn(e){return(await S("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:m(n,["id"],""),listId:m(n,["list_id"],""),companyName:m(n,["company_name"],""),address:m(n,["address"],""),phone:m(n,["phone"],""),website:m(n,["website"],""),email:m(n,["email"],""),businessType:m(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:C(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:m(n,["place_id"],""),status:m(n,["status"],"new"),convertedProspectId:m(n,["converted_prospect_id"],""),note:m(n,["note"],"")}))}async function Nn(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function Qa(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function qn(e,t,n){const i=e.config.api_key;if(!i)return{results:[],error:"Google Maps API key 未設定"};const o=`${t} ${n}`.trim(),c=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(o)}&language=ja&key=${i}`;try{const a=await fetch(c);if(!a.ok)return{results:[],error:`HTTP ${a.status}`};const l=await a.json();return l.status!=="OK"&&l.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${l.status}`}:{results:l.results.map(d=>{const u=d.geometry?.location;return{id:`place_${d.place_id}`,listId:"",companyName:String(d.name??""),address:String(d.formatted_address??""),rating:d.rating?Number(d.rating):void 0,reviewCount:d.user_ratings_total?Number(d.user_ratings_total):void 0,lat:u?.lat,lng:u?.lng,placeId:String(d.place_id??""),status:"new"}})}}catch(a){return{results:[],error:a instanceof Error?a.message:String(a)}}}async function Rn(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await Ha(t);return n&&await Qa({...e,status:"imported",convertedProspectId:t.id}),n}async function On(){return(await S("workflow_orders",{order:"order_date.desc"})).map(t=>({id:m(t,["id"],""),orderNo:m(t,["order_no"],""),customerName:m(t,["customer_name"],""),customerCode:m(t,["customer_code"],""),orderDate:m(t,["order_date"],""),deliveryDate:m(t,["delivery_date"],""),stage:m(t,["stage"],"new"),totalAmount:C(t.total_amount),itemCount:C(t.item_count),priority:m(t,["priority"],"normal"),staffName:m(t,["staff_name"],""),notes:m(t,["notes"],"")}))}async function jn(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function Mn(){return(await S("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),email:m(t,["email"],""),phone:m(t,["phone"],""),visitDate:m(t,["visit_date"],""),partySize:C(t.party_size)||1,language:m(t,["language"],"ja"),purpose:m(t,["purpose"],""),message:m(t,["message"],""),status:m(t,["status"],"new"),repliedAt:m(t,["replied_at"],""),confirmedTime:m(t,["confirmed_time"],""),createdAt:m(t,["created_at"],new Date().toISOString())}))}async function Fn(e){const{supabaseInsert:t}=await b(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>T);return{supabaseInsert:i}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const Bn=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function Wa(){return(await Promise.all(Bn.map(async t=>{const[n,i]=await Promise.all([wt(t.table),S(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:i[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Ve(e,t,n=100){const i=(t-1)*n,[o,c]=await Promise.all([S(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(i)}),wt(e)]);return{records:o,total:c}}async function mt(e){const t=await S("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const i=JSON.parse(n);return String(i.price_group??"")}catch{return""}return""}async function Ka(e,t){if(e){const i=await S("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(i.length>0&&i[0].special_price)return C(i[0].special_price)}const n=await S("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?C(n[0].default_sale_price):0}const k=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:It,CALENDAR_CATEGORY_LABELS:Lt,DEPT_LABELS:He,INVOICE_TYPE_LABELS:dt,JIKOMI_STATUS_LABELS:Ta,MATERIAL_CATEGORIES:Ga,PROSPECT_STAGE_COLORS:Ze,PROSPECT_STAGE_LABELS:Le,ROLE_LABELS:Ye,SEASONAL_TEMPLATES:St,SLACK_EVENT_LABELS:Ge,TAX_DEDUCTION_LABELS:pt,TAX_RATE_CATEGORIES:Ba,convertLeadToProspect:Rn,deleteCalendarEvent:sn,deleteMailSender:en,deleteMaterial:An,deletePrintLayout:Ws,deleteProspect:wn,deleteUserProfile:hn,fetchAnalyticsByPeriod:Rs,fetchAnnouncements:Sa,fetchAuditLogs:fn,fetchAvailablePeriods:Os,fetchBillList:Ma,fetchBillingSummary:Et,fetchCalendarEvents:tn,fetchCallLogs:Cn,fetchCustomerAnalysis:Da,fetchCustomerEfficiency:Ia,fetchCustomerLedger:xt,fetchCustomerPriceGroup:mt,fetchCustomerPricing:Pa,fetchDeliveryLocations:En,fetchDeliveryNote:At,fetchDeliverySchedule:Bs,fetchFaxInbox:cn,fetchIntegrationSettings:Ua,fetchInvoices:Ue,fetchJikomiList:Na,fetchKenteiList:Ra,fetchLeadItems:Tn,fetchLeadLists:Dn,fetchMailSenders:Ks,fetchMasterStats:Je,fetchMaterialList:ut,fetchMyProfile:mn,fetchPayableList:ja,fetchPaymentStatus:ba,fetchPipelineMeta:ga,fetchPrintLayouts:Xs,fetchProductABC:Vs,fetchProductDaily:zs,fetchProductMonthlyShipments:Fs,fetchProductPower:La,fetchProductPrice:Ka,fetchProspectActivities:kn,fetchProspects:_n,fetchPurchaseList:Oa,fetchRawMaterialStock:Fa,fetchRawRecords:Ve,fetchRawTableList:Wa,fetchSalesAnalytics:_a,fetchSalesReport:Ke,fetchSalesSummary:fa,fetchShopifyOrders:ln,fetchSlackLogs:gn,fetchSlackRules:Ya,fetchStoreOrders:Va,fetchStoreSales:Ct,fetchSyncDashboard:$a,fetchTankList:qa,fetchTaxDeclaration:Pt,fetchTourInquiriesFromDb:Mn,fetchUserProfiles:pn,fetchWorkflowOrdersFromDb:On,generateTaxCSV:Ys,generateTaxXML:za,ocrFaxImage:dn,recalculateTaxDeclaration:Hs,recordAudit:vn,resolveProductPrice:Ca,saveCalendarEvent:an,saveCallLog:Xa,saveDeliveryLocation:Pn,saveEmailCampaign:ze,saveFaxRecord:un,saveIntegrationSetting:Ce,saveInvoice:ka,saveLeadItem:Qa,saveLeadList:Nn,saveMailSender:Zs,saveMaterial:xn,savePrintLayout:Qs,saveProspect:Ha,saveProspectActivity:Sn,saveSlackRule:bn,saveTaxDeclaration:Gs,saveTourInquiry:Fn,saveUserProfile:yn,saveWorkflowOrder:jn,searchPlaces:qn,sendEmailCampaign:Ja,sendSlackNotification:$n,submitFeatureRequest:xa,syncGoogleCalendar:rn,syncIvryCallLogs:Ln,syncPhoneBookToIvry:In,syncShopifyOrders:nn,updateCustomer:Aa,updateProduct:Ea},Symbol.toStringTag,{value:"Module"}));function ue(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const zn={open:"未締め",closed:"締め済"};function Vn(e,t){const n=e.customers.map(i=>`
      <tr>
        <td>
          <div class="table-title">${i.customerName}</div>
          <div class="table-sub mono">${i.customerCode}</div>
        </td>
        <td class="numeric">${i.closingDay}日</td>
        <td class="numeric">${ue(i.salesAmount)}</td>
        <td class="numeric">${ue(i.taxAmount)}</td>
        <td class="numeric">${ue(i.prevBalance)}</td>
        <td class="numeric">${ue(i.paymentAmount)}</td>
        <td class="numeric"><strong>${ue(i.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${i.status==="closed"?"success":"warning"}">${zn[i.status]}</span>
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
        <p class="kpi-value">${ue(e.totalBilling)}</p>
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
  `}const Jn={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},Un={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function Bt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ie(e){const t=Un[e],n=Jn[e].map(i=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Bt(i.title)}</p>
            <p class="category-card-description">${Bt(i.description)}</p>
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
  `}function Za(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Se(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Yn(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${Za(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${Se(t.amount)}</td>
        </tr>
      `).join("")}function Hn(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${Za(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${Se(t.amount)}</td>
        </tr>
      `).join("")}function Gn(e,t){return`
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
            <dd>${Se(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${Se(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${Se(e.balanceAmount)}</dd>
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
            <tbody>${Yn(e)}</tbody>
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
            <tbody>${Hn(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}const Xn={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},zt={monthly:"月次生産","made-to-order":"受注生産","november-only":"11月限定","annual-batch":"年間一括"},fe={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a"};function Qn(e){const t=e.filter(o=>o>0).length,n=e.reduce((o,c)=>o+c,0);if(n===0)return"made-to-order";const i=e[10]/n;return e[11]/n,i>.5?"november-only":t<=3?"made-to-order":t<=4&&i<.3?"annual-batch":"monthly"}function es(e,t){if(t==="monthly"){const o=e.filter((a,l)=>l!==11).filter(a=>a>0);if(o.length===0)return 0;const c=[...o].sort((a,l)=>a-l);if(c.length>2){const a=c.slice(0,-1);return Math.round(a.reduce((l,r)=>l+r,0)/a.length)}return Math.round(o.reduce((a,l)=>a+l,0)/o.length)}if(t==="november-only")return e[10];if(t==="annual-batch")return e.reduce((i,o)=>i+o,0);const n=e.filter(i=>i>0);return n.length>0?Math.round(n.reduce((i,o)=>i+o,0)/n.length):0}function Wn(e,t){const n=(new Date().getMonth()+1)%12;if(t==="november-only")return n===10?e[10]:0;if(t==="annual-batch"){const i=e.indexOf(Math.max(...e));return n===i?e.reduce((o,c)=>o+c,0):0}return t==="made-to-order"?0:e[n]>0?e[n]:es(e,t)}function Kn(e){return e.slice(0,50).map(t=>{const n=t.monthlyQuantity,i=Qn(n),o=Math.round(t.totalQuantity/12),c=es(n,i),a=Wn(n,i),l=i==="monthly"?c*11+n[11]:t.totalQuantity,r=i==="monthly"?Math.round(c*1.5):i==="november-only"?Math.round(n[10]*.1):0;return{code:t.code,name:t.name,segment:i,monthlyQuantity:n,avgMonthly:o,adjustedAvg:c,nextMonthForecast:a,annualForecast:l,safetyStock:r}})}function Zn(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function ei(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function ti(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function ts(e,t){const n=ei(t),i=ti(t),[o,c]=t.split("-").map(Number),a=new Map;e.forEach(E=>{if(E.date.slice(0,7)===t){const x=E.date.slice(0,10);a.has(x)||a.set(x,[]),a.get(x).push(E)}});const l=e.filter(E=>E.date.slice(0,7)===t),r=l.reduce((E,x)=>E+x.quantity,0),d=new Set(l.map(E=>E.date)).size,u=new Date().toISOString().slice(0,10),p=["日","月","火","水","木","金","土"].map(E=>`<th class="dcal-header">${E}</th>`).join("");let y="",v=1;for(let E=0;E<6&&!(v>n&&E>0);E++){y+="<tr>";for(let x=0;x<7;x++)if(E===0&&x<i||v>n)y+='<td class="dcal-cell dcal-empty"></td>';else{const R=`${o}-${String(c).padStart(2,"0")}-${String(v).padStart(2,"0")}`,M=a.get(R)||[],Q=R===u,de=M.reduce((V,K)=>V+K.quantity,0);y+=`
          <td class="dcal-cell ${Q?"dcal-today":""}">
            <div class="dcal-day">${v}</div>
            ${M.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${M[0].status}">${M.length}件 ${de}本</div>
              </div>
            `:""}
          </td>`,v++}y+="</tr>"}const[f,A]=c===1?[o-1,12]:[o,c-1],[_,g]=c===12?[o+1,1]:[o,c+1],q=`${f}-${String(A).padStart(2,"0")}`,N=`${_}-${String(g).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${o}年${c}月: ${d}日稼働 / ${l.length}件 / 合計${r.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${q}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${o}年${c}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${N}">▶</button>
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
  `}const Vt=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];function ai(e,t){const n=t==="all"?e:e.filter(l=>l.segment===t),i={all:e.length,monthly:e.filter(l=>l.segment==="monthly").length,"made-to-order":e.filter(l=>l.segment==="made-to-order").length,"november-only":e.filter(l=>l.segment==="november-only").length,"annual-batch":e.filter(l=>l.segment==="annual-batch").length},o=["all","monthly","made-to-order","november-only","annual-batch"].map(l=>`
      <button class="button ${t===l?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${l}">
        ${l==="all"?"全て":zt[l]} (${i[l]})
      </button>
    `).join(""),c=new Date().getMonth(),a=n.map(l=>{const r=Math.max(...l.monthlyQuantity,1),d=l.monthlyQuantity.map((u,p)=>{const y=u/r;return`<td class="forecast-heat" style="background:${p===c?`rgba(15,91,141,${.15+y*.55})`:p===11?`rgba(200,50,50,${y*.4})`:`rgba(100,100,100,${y*.35})`};" title="${Vt[p]}: ${u.toLocaleString()}本">${u>0?u.toLocaleString():"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${l.code}</td>
        <td>${l.name}</td>
        <td><span class="segment-badge" style="background:${fe[l.segment]};">${zt[l.segment]}</span></td>
        ${d}
        <td class="numeric" style="font-weight:700;">${l.nextMonthForecast.toLocaleString()}</td>
        <td class="numeric">${l.adjustedAvg.toLocaleString()}</td>
        <td class="numeric">${l.safetyStock.toLocaleString()}</td>
      </tr>
    `}).join("");return e.length===0?`
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
            <li><span class="segment-badge" style="background:${fe.monthly};">月次生産</span> 通年出荷品。12月を除いたトリム平均で予測</li>
            <li><span class="segment-badge" style="background:${fe["made-to-order"]};">受注生産</span> 年3回以下の不定期出荷品。予測不可</li>
            <li><span class="segment-badge" style="background:${fe["november-only"]};">11月限定</span> 歳暮等の年末商戦品（11月出荷50%超）</li>
            <li><span class="segment-badge" style="background:${fe["annual-batch"]};">年間一括</span> 年1〜4回の集中出荷品</li>
          </ul>
        </div>
      </div>

      <div class="button-group" style="margin-bottom:12px;">${o}</div>

      <div class="table-wrap">
        <table class="forecast-table">
          <thead>
            <tr>
              <th>コード</th>
              <th>商品名</th>
              <th>区分</th>
              ${Vt.map((l,r)=>`<th class="forecast-month-th ${r===c?"current-month":""}">${l}</th>`).join("")}
              <th class="numeric">翌月予測</th>
              <th class="numeric">補正平均</th>
              <th class="numeric">安全在庫</th>
            </tr>
          </thead>
          <tbody>${a}</tbody>
        </table>
      </div>
    </section>
  `}function si(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${ts(e.deliveries,e.calendarMonth)}
    ${ai(e.forecasts,e.selectedSegment)}
  `}function ni(e,t){return ts(e,t)}const De={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間"};function Jt(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function ii(e,t,n){if(t==="all")return e;const i=new Date,o=i.toISOString().slice(0,10),c=new Date(i);switch(t){case"today":return e.filter(a=>a.date.slice(0,10)===o);case"month":return e.filter(a=>a.date.slice(0,7)===o.slice(0,7));case"90days":return c.setDate(c.getDate()-90),e.filter(a=>a.date>=c.toISOString());case"year":return c.setFullYear(c.getFullYear()-1),e.filter(a=>a.date>=c.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(a=>{const l=a.date.slice(0,10);return l>=n.start&&l<=n.end})}}function Y(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Te(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function be(e,t){for(const n of t){const i=e[n];if(typeof i=="number"&&Number.isFinite(i))return i;if(typeof i=="string"){const o=Number(i);if(Number.isFinite(o))return o}}return null}function li(e){const t=e?.productTotals;if(!t||t.length===0)return"―";const n=t.reduce((o,c)=>{const a=be(c,["amount","salesAmount"]),l=be(c,["marginRate","grossMarginRate"]);return a===null||a<=0||l===null?o:{weightedAmount:o.weightedAmount+a,weightedRate:o.weightedRate+a*l}},{weightedAmount:0,weightedRate:0});if(n.weightedAmount>0)return`${(n.weightedRate/n.weightedAmount).toFixed(1)}%`;const i=t.reduce((o,c)=>{const a=c,l=be(a,["amount","salesAmount"]),r=be(a,["grossProfit","grossAmount","margin"]),d=be(a,["costAmount","cost","costPrice"]);if(l===null||l<=0)return o;const u=r??(d!==null?l-d:null);return u===null?o:{sales:o.sales+l,gross:o.gross+u}},{sales:0,gross:0});return i.sales>0?`${(i.gross/i.sales*100).toFixed(1)}%`:"―"}function oi(e){const i={top:20,right:20,bottom:30,left:50},o=760-i.left-i.right,c=260-i.top-i.bottom,a=Math.max(...e.map(u=>u.amount),1),l=o/e.length,r=e.map((u,p)=>{const y=u.amount/a*c,v=i.left+p*l+4,f=i.top+c-y,A=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(u.date));return`
        <g>
          <rect x="${v}" y="${f}" width="${Math.max(l-8,8)}" height="${y}" rx="4" fill="#0F5B8D" opacity="${.58+p/e.length*.34}" />
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
      ${r}
    </svg>
  `}function ri(e,t,n,i,o="month",c){const a={success:"正常",warning:"注意",error:"異常",running:"実行中"},l=ii(e.allDailySales,o,c),r=l.reduce((E,x)=>E+x.amount,0),d=l.reduce((E,x)=>E+x.bottles,0),u=l.reduce((E,x)=>E+x.volumeMl,0),p=l.length,y=d>0?Math.round(r/d):0,v=u>0?Math.round(r/(u/1e3)):0,A=(l.length>0?e.allDailySales.filter(E=>{const x=l[0]?.date??"",R=l[l.length-1]?.date??"",M=Jt(x,-1),Q=Jt(R,-1);return E.date>=M&&E.date<=Q}):[]).reduce((E,x)=>E+x.amount,0),_=A>0?(r-A)/A*100:0,g=_>0?"+":"",q=e.salesRecords.slice(0,10).map(E=>`
            <tr>
              <td class="mono">${E.documentNo}</td>
              <td>${Te(E.date)}</td>
              <td>${E.customerName}</td>
              <td class="numeric">${Y(E.amount)}</td>
            </tr>
          `).join(""),N=["today","month","90days","year","all"].map(E=>`<button class="button ${E===o?"primary":"secondary"} small" type="button" data-period="${E}">${De[E]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${a[t.status]}</span>
        <span class="meta-note">最終同期 ${Te(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${N}</div>
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
        <p class="kpi-value">${Y(e.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${e.kpis.todayDelta>0?"+":""}${e.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">${De[o]}売上</p>
        <p class="kpi-value">${Y(r)}</p>
        <p class="kpi-sub">${p}日間${p>0?` / 日平均 ${Y(Math.round(r/p))}`:""}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${_>=0?"#2f855a":"#c53d3d"}">${A>0?`${g}${_.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${A>0?Y(A):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${Y(e.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${li(n)}</p>
        <p class="kpi-sub">売上分析データから集計</p>
      </article>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${d.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${Y(y)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(u/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${Y(v)}</p>
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
            <p class="panel-caption">${De[o]} (${l.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${oi(l.length>0?l:e.dailySales)}
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
              <dt>ジョブ</dt>
              <dd>${t.jobName}</dd>
            </div>
            <div>
              <dt>最終同期</dt>
              <dd>${Te(t.lastSyncAt)}</dd>
            </div>
            <div>
              <dt>更新時刻</dt>
              <dd>${Te(t.generatedAt)}</dd>
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
          <p class="panel-caption">${De[o]} — 売上・本数・液体量・単価（${l.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th class="numeric">売上</th>
              <th class="numeric">本数</th>
              <th class="numeric">液体量(L)</th>
              <th class="numeric">本単価</th>
              <th class="numeric">L単価</th>
            </tr>
          </thead>
          <tbody>${l.slice().reverse().slice(0,31).map(E=>`
            <tr>
              <td class="mono">${E.date.slice(0,10)}</td>
              <td class="numeric">${Y(E.amount)}</td>
              <td class="numeric">${E.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(E.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${Y(E.pricePerBottle)}</td>
              <td class="numeric">${Y(E.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${i?ci(i):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function ci(e){const t=e.prospects.reduce((a,l)=>a+l.expectedAmount*l.probability/100,0),n=e.prospects.filter(a=>a.stage==="hot"||a.stage==="negotiating").length,i=new Date().toISOString().slice(0,10),o=e.upcomingEvents.filter(a=>a.startsAt.slice(0,10)>=i).slice(0,5),c=e.tourInquiries.filter(a=>a.status==="new").length;return`
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
          ${["cold","warm","hot","contacted","negotiating","won"].map(a=>{const l=e.prospects.filter(d=>d.stage===a).length,r=e.prospects.filter(d=>d.stage===a).reduce((d,u)=>d+u.expectedAmount,0);return`
              <div style="background:${Ze[a]};color:white;padding:12px;border-radius:6px;text-align:center;">
                <div style="font-size:11px;">${Le[a]}</div>
                <div style="font-size:20px;font-weight:700;margin:4px 0;">${l}</div>
                <div style="font-size:10px;opacity:0.9;">¥${(r/1e4).toFixed(0)}万</div>
              </div>
            `}).join("")}
        </div>
      </article>

      <aside class="panel">
        <div class="panel-header">
          <div><h2>📅 直近の予定</h2></div>
          <button class="button secondary" data-link="/calendar">カレンダー</button>
        </div>
        ${o.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${o.map(a=>{const l=new Date(a.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${a.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${l.getMonth()+1}/${l.getDate()} ${a.isAllDay?"終日":l.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${a.title}</div>
                  ${a.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${a.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>

    ${e.deliveries&&e.deliveries.length>0?ni(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}
  `}function di(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function pe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ui(e,t){const n=e.lines.length?e.lines.map((o,c)=>`
          <tr>
            <td class="numeric">${c+1}</td>
            <td class="mono">${o.productCode}</td>
            <td>${o.productName}</td>
            <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
            <td>${o.unit}</td>
            <td class="numeric">${pe(o.unitPrice)}</td>
            <td class="numeric">${pe(o.amount)}</td>
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
            <tr><th>納品日</th><td>${di(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${pe(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${pe(i)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${pe(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${pe(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function G(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function pi(e){return G(e).replaceAll(`
`,"<br />")}function mi(e){const n=[...Object.values(St),{id:"custom",season:"カスタム",subject:"",body:""}].map(o=>`
        <button
          class="template-card ${e.selectedTemplateId===o.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${o.id}"
        >
          <span class="template-card-kicker">${o.season}</span>
          <strong>${G(o.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),i=e.previewRecipients.length?e.previewRecipients.map(o=>`
            <li>
              <span>${G(o.name)}</span>
              <span class="table-sub">${G(o.email)} / ${G(o.area)}</span>
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
          <input id="email-subject" type="text" value="${G(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${G(e.body)}</textarea>
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
            ${e.senders.map(o=>`<option value="${o.id}" ${o.id===e.senderId?"selected":""}>${G(o.name)} &lt;${G(o.email)}&gt;${o.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${G(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?pi(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${G(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function H(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ne(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function yi(e,t){const n=[Ne("得意先",t.customers.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${H(o.name)}</strong>
            <span class="table-sub mono">${H(o.code)}</span>
          </button>
        `)),Ne("商品",t.products.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${H(o.name)}</strong>
            <span class="table-sub mono">${H(o.code)}</span>
          </button>
        `)),Ne("伝票",t.documents.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${H(o.documentNo)}</strong>
            <span class="table-sub">${H(o.customerName)} / ${H(o.date)}</span>
          </button>
        `)),Ne("ページ",t.pages.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${H(o.path)}"
          >
            <strong>${H(o.title)}</strong>
            <span class="table-sub mono">${H(o.path)}</span>
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
            value="${H(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||i}
          </div>
        </div>
      </div>
    </div>
  `}function ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function as(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${ge(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${ge(e.title)}">
        <div class="modal-header">
          <h2>${ge(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${ge(e.placeholder)}"
            value="${ge(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function qe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ut(e){return e.trim().toLowerCase()}function hi(e,t){const n=Ut(t),i=e.filter(c=>n?[c.code,c.name,c.name].map(Ut).some(a=>a.includes(n)):!0).slice(0,50),o=i.length?`
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
                      data-code="${qe(c.code)}"
                      data-name="${qe(c.name)}"
                    >
                      <td class="mono">${qe(c.code)}</td>
                      <td>${qe(c.name)}</td>
                      <td>${c.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return as({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:o,emptyMessage:"該当する得意先が見つかりません。"})}function vi(e){return e.toISOString().slice(0,10)}function ce(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ne(e,t){return e[t]?`<div class="field-error">${ce(e[t])}</div>`:""}function me(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function fi(e,t,n,i){const o=Object.keys(dt).map(r=>`<option value="${r}" ${e.invoiceType===r?"selected":""}>${dt[r]}</option>`).join(""),c=e.lines.map((r,d)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${me(i,`lines.${d}.productCode`,"input-cell")}" type="text" data-line="${d}" data-field="productCode" value="${ce(r.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${d}" aria-label="商品検索">🔍</button>
          </div>
          ${ne(i,`lines.${d}.productCode`)}
        </td>
        <td>
          <input class="${me(i,`lines.${d}.productName`,"input-cell")}" type="text" data-line="${d}" data-field="productName" value="${ce(r.productName)}" placeholder="商品名" />
          ${ne(i,`lines.${d}.productName`)}
        </td>
        <td>
          <input class="${me(i,`lines.${d}.quantity`,"input-cell numeric")}" type="number" data-line="${d}" data-field="quantity" value="${r.quantity}" min="0" />
          ${ne(i,`lines.${d}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${d}" data-field="unit" value="${r.unit}" placeholder="本" /></td>
        <td>
          <input class="${me(i,`lines.${d}.unitPrice`,"input-cell numeric")}" type="number" data-line="${d}" data-field="unitPrice" value="${r.unitPrice}" min="0" />
          ${ne(i,`lines.${d}.unitPrice`)}
        </td>
        <td class="numeric">${r.amount>0?r.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${d}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${d}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),a=e.lines.reduce((r,d)=>r+d.amount,0),l=Math.floor(a*10/110);return`
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
          <select id="inv-type">${o}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${me(i,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||vi(new Date)}" />
          ${ne(i,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${me(i,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${ce(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${ne(i,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${ce(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${ce(e.staffCode)}" />
        </label>
      </div>
      ${ne(i,"lines")}
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
          <span class="total-value">${(a-l).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${l.toLocaleString("ja-JP")} 円</span>
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
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${ce(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}const bi={showQuoteNo:!0,showValidUntil:!0,showSubject:!0,showDeliveryDate:!1,showPaymentTerms:!0,showDeliveryPlace:!1,showRemarks:!0,showSeal:!0,headerNote:"",footerNote:""},ss={quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:"",customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:"月末締め翌月末払い",deliveryPlace:"",previewMode:!1,sealSettings:null,fieldConfig:{...bi}};function X(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function P(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ns(e){const t=e.lines.reduce((a,l)=>a+l.amount,0),n=Math.round(t*e.taxRate/100),i=t+n,o=e.fieldConfig,c=[];return o.showValidUntil&&e.validUntil&&c.push(`<tr><th>有効期限</th><td>${e.validUntil}</td></tr>`),o.showDeliveryDate&&e.deliveryDate&&c.push(`<tr><th>納期</th><td>${P(e.deliveryDate)}</td></tr>`),o.showPaymentTerms&&e.paymentTerms&&c.push(`<tr><th>支払条件</th><td>${P(e.paymentTerms)}</td></tr>`),o.showDeliveryPlace&&e.deliveryPlace&&c.push(`<tr><th>納品場所</th><td>${P(e.deliveryPlace)}</td></tr>`),`
    <div class="quote-preview" id="quote-preview-area">
      <div class="quote-preview-inner">
        <h2 class="quote-preview-title">御 見 積 書</h2>

        <div class="quote-preview-meta">
          <div class="quote-preview-customer">
            <p class="quote-preview-customer-name">${P(e.customerName||"（得意先未選択）")} 御中</p>
            ${e.customerAddress?`<p class="quote-preview-addr">${P(e.customerAddress)}</p>`:""}
          </div>
          <div class="quote-preview-info">
            ${o.showQuoteNo&&e.quoteNo?`<p>No. ${P(e.quoteNo)}</p>`:""}
            <p>${e.quoteDate}</p>
            <p class="quote-preview-company">金井酒造店</p>
            <p class="quote-preview-company-sub">〒259-1205 神奈川県平塚市土屋2556</p>
            <p class="quote-preview-company-sub">TEL 0463-58-0006</p>
            ${o.showSeal&&e.sealSettings?.imageDataUrl?`
              <div class="quote-preview-seal">
                <img src="${e.sealSettings.imageDataUrl}" alt="社印" style="width:${e.sealSettings.size}px;height:${e.sealSettings.size}px;" />
              </div>
            `:""}
          </div>
        </div>

        ${o.headerNote?`<p class="quote-preview-note">${P(o.headerNote)}</p>`:""}

        ${o.showSubject&&e.subject?`<p class="quote-preview-subject">件名: ${P(e.subject)}</p>`:""}

        <div class="quote-preview-total-banner">
          <span>合計金額</span>
          <span class="quote-preview-total-value">${X(i)}（税込）</span>
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
            ${e.lines.map((a,l)=>`
              <tr>
                <td style="text-align:center;">${l+1}</td>
                <td>${P(a.productName)}</td>
                <td style="text-align:right;">${a.quantity.toLocaleString()}</td>
                <td style="text-align:center;">${P(a.unit)}</td>
                <td style="text-align:right;">${X(a.unitPrice)}</td>
                <td style="text-align:right;">${X(a.amount)}</td>
              </tr>
            `).join("")}
            ${e.lines.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:#999;">明細なし</td></tr>':""}
          </tbody>
          <tfoot>
            <tr><td colspan="5" style="text-align:right;font-weight:700;">小計</td><td style="text-align:right;">${X(t)}</td></tr>
            <tr><td colspan="5" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${X(n)}</td></tr>
            <tr class="quote-preview-total-row"><td colspan="5" style="text-align:right;font-weight:700;">合計</td><td style="text-align:right;font-weight:700;">${X(i)}</td></tr>
          </tfoot>
        </table>

        ${c.length>0?`
          <table class="quote-preview-conditions">
            ${c.join("")}
          </table>
        `:""}

        ${o.showRemarks&&e.remarks?`
          <div class="quote-preview-remarks">
            <p class="quote-preview-remarks-label">備考</p>
            <p>${P(e.remarks).replace(/\n/g,"<br/>")}</p>
          </div>
        `:""}

        ${o.footerNote?`<p class="quote-preview-footer-note">${P(o.footerNote)}</p>`:""}
      </div>
    </div>
  `}function gi(e){const t=(n,i,o)=>`
    <label class="quote-field-toggle">
      <input type="checkbox" data-field-toggle="${n}" ${o?"checked":""} />
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
          <input type="text" id="q-header-note" value="${P(e.headerNote)}" placeholder="例: 下記のとおりお見積り申し上げます" />
        </div>
        <div class="form-row">
          <label>フッターメモ（見積書���部に表示）</label>
          <input type="text" id="q-footer-note" value="${P(e.footerNote)}" placeholder="例: 本見積書に関するご不明点はお気軽にお問合せください" />
        </div>
      </div>
    </section>
  `}function $i(e){return`
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
  `}function _i(e,t,n,i,o,c){const a=e.lines.reduce((y,v)=>y+v.amount,0),l=Math.round(a*e.taxRate/100),r=a+l,d=i.length>=1?t.filter(y=>y.name.includes(i)||y.code.includes(i)).slice(0,8):[],u=o.length>=1?n.filter(y=>y.name.includes(o)||y.code.includes(o)).slice(0,8):[],p=e.fieldConfig;return e.previewMode?`
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
      ${ns(e)}
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
          <input type="text" id="q-no" value="${P(e.quoteNo)}" placeholder="自動採番" />
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
          <input type="text" id="q-subject" value="${P(e.subject)}" placeholder="御見積の件" />
        </div>`:""}
        ${p.showDeliveryDate?`
        <div class="form-row">
          <label>納期</label>
          <input type="text" id="q-delivery-date" value="${P(e.deliveryDate)}" placeholder="例: 受注後2週間" />
        </div>`:""}
        ${p.showPaymentTerms?`
        <div class="form-row">
          <label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${P(e.paymentTerms)}" placeholder="月末締め翌月末���い" />
        </div>`:""}
        ${p.showDeliveryPlace?`
        <div class="form-row">
          <label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${P(e.deliveryPlace)}" placeholder="例: 貴社指定場所" />
        </div>`:""}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${P(i)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${d.length>0?`
        <div class="search-results">
          ${d.map(y=>`
            <button class="search-item" type="button" data-select-customer="${y.code}" data-cust-name="${P(y.name)}" data-cust-addr="${P(y.address1||"")}">
              <span class="mono">${y.code}</span> ${P(y.name)}
            </button>
          `).join("")}
        </div>
      `:""}
      ${e.customerName?`
        <div class="selected-item">
          <span class="mono">${e.customerCode}</span> <strong>${P(e.customerName)}</strong>
          ${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${P(e.customerAddress)}</span>`:""}
        </div>
      `:""}
    </section>

    <section class="panel">
      <div class="panel-header"><h2>明細</h2></div>
      <div class="form-row">
        <input type="text" id="q-prod-search" value="${P(o)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${u.length>0?`
        <div class="search-results">
          ${u.map(y=>{const v=c?Ca(y,c):{price:y.salePrice||0,label:"標準価格"},f=v.label!=="標準価格";return`
            <button class="search-item" type="button" data-add-product="${y.code}" data-prod-name="${P(y.name)}" data-prod-price="${v.price}">
              <span class="mono">${y.code}</span> ${P(y.name)}
              <span class="numeric" ${f?'style="color:#2f855a;font-weight:700;"':""}>${v.price?X(v.price):""} <small>(${v.label})</small></span>
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
                <td>${P(y.productName)}</td>
                <td class="numeric"><input type="number" class="qty-input" data-line-idx="${v}" value="${y.quantity}" min="0" style="width:60px;text-align:right;" /></td>
                <td>${P(y.unit)}</td>
                <td class="numeric"><input type="number" class="price-input" data-line-idx="${v}" value="${y.unitPrice}" min="0" style="width:80px;text-align:right;" /></td>
                <td class="numeric">${X(y.amount)}</td>
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
          <textarea id="q-remarks" rows="2">${P(e.remarks)}</textarea>
        </div>`:""}
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${X(a)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${X(l)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${X(r)}</span></div>
        </div>
      </div>
    </section>

    ${gi(p)}
    ${$i(e.sealSettings)}
  `}function wi(e){const t=ns(e),n=window.open("","_blank","width=800,height=1100");if(!n){alert("ポップアップがブロックされました。許可してください。");return}n.document.write(`<!DOCTYPE html>
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
</html>`),n.document.close()}function is(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ls(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function os(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function ki(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function Si(e,t,n,i,o){const c=new Map,a=new Map;for(const u of e){if(u.date>=t&&u.date<=n){const p=c.get(u.productCode);p?(p.amt+=u.amount,p.qty+=u.qty):c.set(u.productCode,{name:u.productName,vol:u.volumeMl,amt:u.amount,qty:u.qty})}u.date>=i&&u.date<=o&&a.set(u.productCode,(a.get(u.productCode)??0)+u.amount)}const l=[...c.entries()].map(([u,p])=>({code:u,...p})).sort((u,p)=>p.amt-u.amt),r=l.reduce((u,p)=>u+p.amt,0);let d=0;return l.map(u=>{d+=u.amt;const p=r>0?Math.round(u.amt*1e4/r)/100:0,y=d<=r*.7?"A":d<=r*.9?"B":"C",v=a.get(u.code)??0,f=v>0?Math.round((u.amt-v)/v*1e3)/10:null;return{code:u.code,name:u.name,volumeMl:u.vol,amount:u.amt,qty:u.qty,sharePct:p,rank:y,prevAmount:v,growthRate:f}})}function xi(e,t,n){const i=new Date,o=i.toISOString().slice(0,10);let c=o,a=o,l="";switch(e){case"week":{const u=new Date(i);u.setDate(u.getDate()-7),c=u.toISOString().slice(0,10),a=o,l="直近7日間";break}case"month":{c=o.slice(0,7)+"-01",a=o,l="当月";break}case"90days":{const u=new Date(i);u.setDate(u.getDate()-90),c=u.toISOString().slice(0,10),a=o,l="直近90日間";break}case"year":{const u=new Date(i);u.setFullYear(u.getFullYear()-1),c=u.toISOString().slice(0,10),a=o,l="直近1年間";break}case"custom":{c=t||o,a=n||o,l=`${c} 〜 ${a}`;break}}const r=new Date(c);r.setFullYear(r.getFullYear()-1);const d=new Date(a);return d.setFullYear(d.getFullYear()-1),{start:c,end:a,prevStart:r.toISOString().slice(0,10),prevEnd:d.toISOString().slice(0,10),label:l}}function Ai(e,t="all",n=[],i="year",o,c){const a=xi(i,o,c),l=n.length>0?Si(n,a.start,a.end,a.prevStart,a.prevEnd):e.map(g=>({code:g.code,name:g.name,volumeMl:g.volumeMl,amount:g.yearAmount,qty:g.yearQty,sharePct:g.sharePct,rank:g.rank,prevAmount:g.prevAmount,growthRate:g.growthRate})),r=l.filter(g=>g.rank==="A").length,d=l.filter(g=>g.rank==="B").length,u=l.filter(g=>g.rank==="C").length,p=l.filter(g=>g.growthRate!=null&&g.growthRate>10),y=l.filter(g=>g.growthRate!=null&&g.growthRate<-10);let v=l,f="全商品";switch(t){case"A":v=l.filter(g=>g.rank==="A"),f="Aランク";break;case"B":v=l.filter(g=>g.rank==="B"),f="Bランク";break;case"C":v=l.filter(g=>g.rank==="C"),f="Cランク";break;case"growing":v=p,f="成長商品(+10%以上)";break;case"declining":v=y,f="衰退商品(-10%以下)";break}const A=(g,q,N)=>`<button class="button ${t===g?"primary":"secondary"} small" data-product-filter="${g}">${q} (${N})</button>`,_=(g,q)=>`<button class="button ${i===g?"primary":"secondary"} small" data-product-period="${g}">${q}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${_("week","週次")}
        ${_("month","月次")}
        ${_("90days","90日")}
        ${_("year","年間")}
        ${_("custom","指定期間")}
      </div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="pp-range-start" class="range-input" value="${o||""}" />
        <span>〜</span>
        <input type="date" id="pp-range-end" class="range-input" value="${c||""}" />
        <button class="button secondary small" type="button" data-action="pp-apply-range">適用</button>
        <span style="color:var(--text-secondary);font-size:13px;margin-left:8px;">${a.label}</span>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${r} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">Bランク（70-90%）</p>
        <p class="kpi-value">${d} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${p.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${y.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${f} (${v.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${A("all","全て",l.length)}
        ${A("A","A",r)}
        ${A("B","B",d)}
        ${A("C","C",u)}
        ${A("growing","成長",p.length)}
        ${A("declining","衰退",y.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ABC</th>
              <th>商品名</th>
              <th class="numeric">売上</th>
              <th class="numeric">構成比</th>
              <th class="numeric">本数</th>
              <th class="numeric">前年同期比</th>
            </tr>
          </thead>
          <tbody>
            ${v.slice(0,100).map(g=>`
              <tr>
                <td>${ls(g.rank)}</td>
                <td>${g.name?g.name.slice(0,25):g.code}${g.volumeMl?` <small>${g.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${is(g.amount)}</td>
                <td class="numeric">${g.sharePct}%</td>
                <td class="numeric">${g.qty.toLocaleString()}</td>
                <td class="numeric">${os(g.growthRate)}</td>
              </tr>
            `).join("")}
            ${v.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ei(e){const t=e.filter(o=>o.currentRank==="A").length,n=e.filter(o=>o.prevRank&&o.currentRank<o.prevRank).length,i=e.filter(o=>o.prevRank&&o.currentRank>o.prevRank).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>営業効率分析</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${t} 社</p>
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
              <th>ABC</th>
              <th>得意先名</th>
              <th class="numeric">年間売上</th>
              <th class="numeric">構成比</th>
              <th class="numeric">受注日数</th>
              <th class="numeric">前年比</th>
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${e.slice(0,50).map(o=>`
              <tr>
                <td>${ls(o.currentRank)}</td>
                <td>${o.name||o.code}</td>
                <td class="numeric">${is(o.yearAmount)}</td>
                <td class="numeric">${o.sharePct}%</td>
                <td class="numeric">${o.orderDays}日</td>
                <td class="numeric">${os(o.growthRate)}</td>
                <td>${ki(o.currentRank,o.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Pi(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Ci(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Li(e,t){const n=e.length?e.map(i=>`
            <tr>
              <td class="mono">${i.documentNo}</td>
              <td>${Pi(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${i.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Ci(i.amount)}</td>
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
  `}function Ii(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Di(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function rs(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function cs(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function Yt(e){const t=rs(cs(e),6);return t.setHours(23,59,59,999),t}function Ht(e){return new Date(`${e}T00:00:00`)}function Gt(e){return`${e.getMonth()+1}/${e.getDate()}`}function Ti(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Ni(){const e=new Date,t=cs(Di(Ii(e),-3)),n=Yt(new Date(e.getFullYear(),e.getMonth()+4,0)),i=[];let o=new Date(t);for(;o<=n;){const c=Yt(o);i.push({start:new Date(o),end:c,label:`${Gt(o)} - ${Gt(c)}`}),o=rs(o,7)}return i}function qi(e){const t=Ni(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,i=t.map(c=>`
        <div class="gantt-week">
          <span>${c.label}</span>
        </div>
      `).join(""),o=e.length?e.map(c=>{const a=Ht(c.startDate),l=Ht(c.expectedDoneDate),r=Math.max(0,t.findIndex(p=>p.end>=a)),d=Math.max(r,t.reduce((p,y,v)=>y.start<=l?v:p,r)),u=[`仕込番号: ${c.jikomiNo}`,`銘柄: ${c.productName}`,`期間: ${c.startDate} - ${c.expectedDoneDate}`,`タンク: ${c.tankNo}`,`備考: ${c.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${c.jikomiNo}</strong>
                <span class="table-sub">${c.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${c.status}"
                  style="grid-column:${r+1} / ${d+2}"
                  title="${Ti(u)}"
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
        ${o}
      </div>
    </section>
  `}function Xt(e,t){const n={planned:"neutral",active:"warning",done:"success"},i=e.map(l=>`
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
          <span class="status-pill ${n[l.status]}">${Ta[l.status]}</span>
        </td>
        <td>${l.note||"―"}</td>
      </tr>
    `).join(""),o=e.filter(l=>l.status==="active").length,c=e.filter(l=>l.status==="done").length,a=e.filter(l=>l.status==="planned").length;return`
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
  `}function Ri(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},i=e.map(r=>`
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
          <span class="status-pill ${n[r.status]}">${t[r.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${r.id}">
            ${r.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),o=e.filter(r=>r.status==="approved").length,c=e.filter(r=>r.status==="submitted").length,a=e.filter(r=>r.status==="pending").length;return`
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
          <p class="panel-caption">承認済 ${o} 件 / 合計 ${e.length} 件</p>
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
  `}function Oi(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ji(e,t){return`
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
        ${e?`<p class="field-error">${Oi(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function Mi(e){return`
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
  `}function Fi(e){return`
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
  `}const Dt={query:"",businessType:"",areaCode:"",activeOnly:"",page:1},xe=50;function Bi(e,t){let n=e;if(t.query){const l=t.query.toLowerCase();n=n.filter(r=>r.code.toLowerCase().includes(l)||r.name.toLowerCase().includes(l)||r.kanaName&&r.kanaName.toLowerCase().includes(l)||r.address1&&r.address1.toLowerCase().includes(l)||r.phone&&r.phone.toLowerCase().includes(l))}t.businessType&&(n=n.filter(l=>l.businessType===t.businessType)),t.areaCode&&(n=n.filter(l=>l.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(l=>l.isActive):t.activeOnly==="inactive"&&(n=n.filter(l=>!l.isActive));const i=Math.max(1,Math.ceil(n.length/xe)),c=(Math.min(t.page,i)-1)*xe,a=n.slice(c,c+xe);return{filtered:n,paged:a,totalPages:i}}function Qt(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const i=(t-1)*xe+1,o=Math.min(t*xe,e),c=[];for(let a=1;a<=n;a++)a===1||a===n||a>=t-2&&a<=t+2?c.push(`<button class="button ${a===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${a}" style="min-width:36px;padding:4px 8px;">${a}</button>`):(a===t-3||a===t+3)&&c.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${i}-${o} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${c.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function zi(e,t){const n=[...new Set(e.map(o=>o.businessType).filter(Boolean))].sort(),i=[...new Set(e.map(o=>o.areaCode).filter(Boolean))].sort();return`
    <div style="display:flex;gap:8px;align-items:end;flex-wrap:wrap;padding:12px 0;">
      <div class="form-group" style="flex:1;min-width:200px;">
        <label class="form-label">検索</label>
        <input type="text" id="master-search" class="form-input" placeholder="コード・名前・カナ・住所・電話" value="${t.query}">
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">業態</label>
        <select id="master-business-type" class="form-input">
          <option value="">すべて</option>
          ${n.map(o=>`<option value="${o}" ${t.businessType===o?"selected":""}>${o}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">地区</label>
        <select id="master-area-code" class="form-input">
          <option value="">すべて</option>
          ${i.map(o=>`<option value="${o}" ${t.areaCode===o?"selected":""}>${o}</option>`).join("")}
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
  `}function yt(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Vi(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}function Ji(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${Vi(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${yt(t.address1||"",16)}</td>
          <td>${yt(t.address2||"",12)}</td>
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
      `).join("")}function Re(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function Ui(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${yt(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${Re(t.purchasePrice)}</td>
          <td class="numeric">${Re(t.salePrice)}</td>
          <td class="numeric">${Re(t.listPrice)}</td>
          <td class="numeric">${Re(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function Yi(e,t,n=Dt){const{filtered:i,paged:o,totalPages:c}=Bi(e.customers,n);return`
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
        ${zi(e.customers,n)}
        ${Qt(i.length,n.page,c)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>得意先名</th>
                <th>カナ</th>
                <th>略称</th>
                <th>業態</th>
                <th>販売区分</th>
                <th>価格区分</th>
                <th>単価G</th>
                <th>電話</th>
                <th>FAX</th>
                <th>〒</th>
                <th>住所1</th>
                <th>住所2</th>
                <th>担当</th>
                <th>地区</th>
                <th class="numeric">締日</th>
                <th class="numeric">支払日</th>
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Ji(o)}</tbody>
          </table>
        </div>
        ${Qt(i.length,n.page,c)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>商品名</th>
                <th>カナ</th>
                <th>分類</th>
                <th>酒税区分</th>
                <th class="numeric">度数</th>
                <th class="numeric">容量ml</th>
                <th>単位</th>
                <th>容器</th>
                <th class="numeric">生産者価格</th>
                <th class="numeric">卸価格</th>
                <th class="numeric">定価(小売)</th>
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Ui(e.products)}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function tt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Hi(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${Ga.map(i=>`<option ${n?.materialType===i?"selected":""}>${i}</option>`).join("")}
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
  `}function Gi(e){const t=e.map(o=>{const a=(o.minimumStock>0?o.currentStock/o.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${o.code}</td>
          <td>${o.name}</td>
          <td class="numeric ${a?"text-danger":""}">
            ${o.currentStock.toLocaleString("ja-JP")} ${o.unit}
            ${a?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${o.minimumStock.toLocaleString("ja-JP")} ${o.unit}</td>
          <td class="numeric">${tt(o.unitCost)}</td>
          <td class="numeric">${tt(o.currentStock*o.unitCost)}</td>
          <td>${o.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${o.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(o=>o.minimumStock>0&&o.currentStock/o.minimumStock<1.5).length,i=e.reduce((o,c)=>o+c.currentStock*c.unitCost,0);return`
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
        <p class="kpi-value">${tt(i)}</p>
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
  `}function Xi(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function at(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Qi={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Wi(e){return`
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
          <td class="numeric">${at(n.billedAmount)}</td>
          <td class="numeric">${at(n.paymentAmount)}</td>
          <td class="numeric">${at(n.balanceAmount)}</td>
          <td>${Xi(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${Qi[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function ye(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Wt(e){return e.trim().toLowerCase()}function Ki(e,t){const n=Wt(t),i=e.filter(c=>n?[c.code,c.name,c.janCode].map(Wt).some(a=>a.includes(n)):!0),o=i.length?`
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
                      data-code="${ye(c.code)}"
                      data-name="${ye(c.name)}"
                    >
                      <td class="mono">${ye(c.code)}</td>
                      <td>${ye(c.name)}</td>
                      <td class="mono">${ye(c.janCode)}</td>
                      <td>${ye(c.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return as({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:o,emptyMessage:"該当する商品が見つかりません。"})}function ie(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Zi(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},i={pending:"warning",confirmed:"neutral",paid:"success"},o={unpaid:"未払い",partial:"一部支払",paid:"支払済"},c={unpaid:"warning",partial:"neutral",paid:"success"},a=e.map(p=>`
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${ie(p.unitPrice)}</td>
        <td class="numeric"><strong>${ie(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${i[p.status]}">${n[p.status]}</span>
        </td>
      </tr>
    `).join(""),l=t.map(p=>`
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${ie(p.totalPurchase)}</td>
        <td class="numeric">${ie(p.paidAmount)}</td>
        <td class="numeric"><strong>${ie(p.balance)}</strong></td>
        <td>${p.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${c[p.status]}">${o[p.status]}</span>
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
        <p class="kpi-value">${ie(r)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${ie(d)}</p>
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
          <tbody>${l||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function $e(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function el(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},i={holding:"neutral",due:"warning",cleared:"success"},o=e.map(u=>`
      <tr>
        <td class="mono">${u.billNo}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${$e(u.amount)}</td>
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
          <td class="numeric">${$e(u.unitCost)}</td>
          <td class="numeric">${$e(u.currentStock*u.unitCost)}</td>
          <td>${u.lastPurchaseDate}</td>
        </tr>
      `}).join(""),a=e.filter(u=>u.status==="holding"),l=a.reduce((u,p)=>u+p.amount,0),r=t.reduce((u,p)=>u+p.currentStock*p.unitCost,0),d=t.filter(u=>u.minimumStock>0&&u.currentStock<u.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${$e(l)}</p>
        <p class="kpi-sub">${a.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${$e(r)}</p>
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
          <tbody>${o||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
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
  `}function ht(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function B(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function vt(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${B(e)}</pre>
    </div>
  `}function tl(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function Oe(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${B(e)}</code>
      ${tl(e)}
    </div>
  `}function he(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${B(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${B(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${B(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?vt(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${B(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${B(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function je(e){return`
    <div class="setup-step setup-step-compact" data-step="${B(e.stepLabel)}">
      <h3>${B(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${B(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function Me(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function Kt(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function al(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?ht(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Me(e.lastOverallSync)}">${Kt(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${Me(e.lastOverallSync)==="success"?"1時間以内":Me(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${B(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?ht(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Me(t.lastSyncAt)}">${Kt(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function sl(e,t,n,i){const o={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${i?al(i):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${ht(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${o[e.status]}</span>
        </p>
        <p class="kpi-sub">${B(e.message)}</p>
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
      ${je({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${Oe("git --version")}
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
      ${je({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${Oe("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${je({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${Oe("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${Oe("python get-pip.py")}
        `})}
      ${je({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${he({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${he({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${he({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${he({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${he({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${he({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${vt(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${vt(`{
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
            <span class="config-value">${B(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${B(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${B(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${B(n)}"
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
  `}function ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function nl(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function il(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(p=>p.amount),1),i=28,o=6,c=140,a=100,l=760,r=l-c-a,d=t.length*(i+o)+16,u=t.map((p,y)=>{const v=p.amount/n*r,f=y*(i+o)+8,A=p.abcRank==="A"?"#2F855A":p.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${c-8}" y="${f+i/2+5}" class="chart-axis" text-anchor="end">${p.name.length>10?p.name.slice(0,10)+"…":p.name}</text>
          <rect x="${c}" y="${f}" width="${v}" height="${i}" rx="4" fill="${A}" opacity="0.85" />
          <text x="${c+v+8}" y="${f+i/2+5}" class="chart-axis">${(p.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${l} ${d}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${u}
    </svg>
  `}function ll(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(i=>`<th class="numeric">${i}</th>`).join(""),n=e.monthlyByCustomer.map(i=>{const o=i.values.reduce((a,l)=>a+l,0),c=i.values.map(a=>`<td class="numeric">${a>0?(a/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${i.label}</td>
          ${c}
          <td class="numeric"><strong>${ke(o)}</strong></td>
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
  `}function ol(e){e.ranking.reduce((r,d)=>r+d.amount,0);const t=e.ranking.filter(r=>r.abcRank==="A").length,n=e.ranking.filter(r=>r.abcRank==="B").length,i=e.ranking.filter(r=>r.abcRank==="C").length,o=e.ranking.filter(r=>r.abcRank==="A").reduce((r,d)=>r+d.amount,0),c=e.ranking.filter(r=>r.abcRank==="B").reduce((r,d)=>r+d.amount,0),a=e.ranking.filter(r=>r.abcRank==="C").reduce((r,d)=>r+d.amount,0),l=e.ranking.map(r=>`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric">${ke(r.amount)}</td>
          <td class="numeric">${r.ratio.toFixed(1)}%</td>
          <td class="numeric">${r.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${r.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${nl(r.abcRank)}">${r.abcRank}</span></td>
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
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${ke(o)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${ke(c)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${i}社 <span class="kpi-sub">${ke(a)}</span></div>
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
        ${il(e.ranking)}
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
          <tbody>${l}</tbody>
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
  `}function ds(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function rl(e){return e.replace("-","/")}const cl={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function dl(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=760,n=280,i={top:16,right:24,bottom:36,left:64},o=t-i.left-i.right,c=n-i.top-i.bottom,a=Math.max(...e.map(u=>u.amount),1),l=o/e.length,r=[0,.25,.5,.75,1].map(u=>{const p=i.top+c-c*u,y=`${Math.round(a*u/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${i.left}" y1="${p}" x2="${t-i.right}" y2="${p}" class="chart-grid" />
          <text x="8" y="${p+4}" class="chart-axis">${y}</text>
        </g>
      `}).join(""),d=e.map((u,p)=>{const y=u.amount/a*c,v=Math.max(l-18,24),f=i.left+p*l+(l-v)/2,A=i.top+c-y;return`
        <g>
          <rect x="${f}" y="${A}" width="${v}" height="${y}" rx="6" class="analytics-bar" />
          <text x="${f+v/2}" y="${n-10}" class="chart-axis centered-axis">${rl(u.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${t} ${n}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${r}
      ${d}
    </svg>
  `}function ul(e){return e.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="numeric">${ds(t.amount)}</td>
          <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function pl(e){return e.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="mono">${t.period}</td>
          <td class="numeric">${ds(t.amount)}</td>
          <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function ml(e,t,n="all",i="",o=[],c=[]){const a=t==="products"?"商品別集計":"得意先別集計",l=t==="products"?e.productTotals:e.customerTotals,r=n!=="all"&&o.length>0,d=["all","yearly","monthly","weekly","daily"].map(p=>`<button class="button ${p===n?"primary":"secondary"} small" type="button" data-analytics-period="${p}">${cl[p]}</button>`).join(""),u=n!=="all"&&c.length>0?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${c.map(p=>`<option value="${p}" ${p===i?"selected":""}>${p}</option>`).join("")}
      </select>`:"";return`
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
          ${dl(e.monthlySales)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${a}</h2>
            <p class="panel-caption">売上金額順に表示</p>
          </div>
          <div class="tab-group">
            <button class="tab-button ${t==="products"?"active":""}" data-analytics-tab="products">商品別</button>
            <button class="tab-button ${t==="customers"?"active":""}" data-analytics-tab="customers">得意先別</button>
          </div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
          <div class="button-group">${d}</div>
          ${u}
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>名称</th>
                ${r?"<th>期間</th>":""}
                <th class="numeric">売上額</th>
                <th class="numeric">数量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${r?pl(o):ul(l)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function _e(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function yl(e){const t=Math.max(...e.salesByProduct.flatMap(c=>c.values),1),n=e.salesByProduct.map(c=>{const a=c.values.map((l,r)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(l/t*120)}px" title="${e.months[r]}: ${_e(l)}"></div>
            <span class="bar-label">${e.months[r].replace("月","")}</span>
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
        <td class="numeric">${_e(c.costPrice)}</td>
        <td class="numeric">${_e(c.sellPrice)}</td>
        <td class="numeric">${_e(c.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${c.marginRate>=40?"success":"warning"}">${c.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),o=e.salesByCustomer.map(c=>{const a=c.values.reduce((l,r)=>l+r,0);return`
        <tr>
          <td>${c.label}</td>
          ${c.values.map(l=>`<td class="numeric">${(l/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${_e(a)}</strong></td>
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
          <tbody>${i}</tbody>
        </table>
      </div>
    </section>
  `}function hl(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function vl(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Zt(e){return e.toISOString().slice(0,10)}function fl(e,t,n){const i=e.length?e.map(o=>`
            <tr>
              <td class="mono">${o.documentNo}</td>
              <td>${hl(o.date)}</td>
              <td>
                <div class="table-title">${o.customerName}</div>
                <div class="table-sub mono">${o.customerCode}</div>
              </td>
              <td class="numeric">${vl(o.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||Zt(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||Zt(new Date)}" />
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
  `}function Fe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function bl(e,t,n,i){const o={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},c={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},a={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},l=e.map(p=>`
      <tr>
        <td>${p.saleTime}</td>
        <td class="mono">${p.productCode}</td>
        <td>${p.productName}</td>
        <td class="numeric">${p.quantity}</td>
        <td class="numeric">${Fe(p.unitPrice)}</td>
        <td class="numeric"><strong>${Fe(p.amount)}</strong></td>
        <td>${o[p.paymentMethod]}</td>
      </tr>
    `).join(""),r=t.map(p=>`
      <tr>
        <td class="mono">${p.orderNo}</td>
        <td>${p.orderDate}</td>
        <td>${p.customerName}</td>
        <td>${p.postalCode} ${p.address}</td>
        <td>${p.items.map(y=>`${y.productName} ×${y.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Fe(p.totalAmount)}</strong></td>
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
        <p class="kpi-value">${Fe(d)}</p>
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
  `}const st={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},gl={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function $l(e,t,n,i){const o=gl[e],c=Object.keys(st).map(l=>`
      <button class="tab-button ${e===l?"active":""}" data-import-entity="${l}">
        ${st[l]}
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
        <h2>${st[e]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${o.required.map(l=>`<code class="config-value">${l}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${o.optional.map(l=>`<code class="config-value">${l}</code>`).join(" / ")}</dd>
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
  `}const D={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function _l(e,t,n){const i=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:D.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:D.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:D.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:D.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:D.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:D.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:D.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:D.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:D.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:D.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:D.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:D.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:D.date}];e.lines.slice(0,6).forEach((a,l)=>{const r=33+l*8.5;i.push({id:`line${l}_name`,label:`明細${l+1} 品名`,x:5,y:r,fontSize:7.5,value:a.productName+(a.spec?` ${a.spec}`:""),color:D.detail},{id:`line${l}_code`,label:`明細${l+1} CD`,x:64,y:r,fontSize:7.5,value:a.productCode,color:D.detail},{id:`line${l}_qty`,label:`明細${l+1} 数量`,x:124,y:r,fontSize:8,value:a.quantity>0?String(a.quantity):"",color:D.detail},{id:`line${l}_price`,label:`明細${l+1} 原単価`,x:163,y:r,fontSize:8,value:a.unitPrice>0?a.unitPrice.toLocaleString("ja-JP"):"",color:D.detail},{id:`line${l}_amount`,label:`明細${l+1} 原価金額`,x:176,y:r,fontSize:8,value:a.amount>0?a.amount.toLocaleString("ja-JP"):"",color:D.detail},{id:`line${l}_retail`,label:`明細${l+1} 売単価`,x:193,y:r,fontSize:8,value:a.retailPrice?a.retailPrice.toLocaleString("ja-JP"):"",color:D.detail})});const o=e.lines.reduce((a,l)=>a+(l.amount||0),0),c=e.lines.reduce((a,l)=>a+l.quantity,0);return i.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(c),color:D.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:o.toLocaleString("ja-JP"),color:D.total}),n&&i.forEach(a=>{const l=n[a.id];l&&(a.x=l.x,a.y=l.y)}),i}function wl(e,t,n,i,o){const a=_l(e,t,i).map(r=>`
      <div class="fd-field ${o?"fd-draggable":""}"
           data-fd-id="${r.id}"
           style="left:${r.x}mm; top:${r.y}mm; font-size:${r.fontSize}pt; --fd-color:${r.color};"
           title="${r.label} (${r.x.toFixed(1)}, ${r.y.toFixed(1)})">
        ${o?`<span class="fd-badge">${r.label}</span>`:""}
        <span class="fd-value">${r.value}</span>
      </div>
    `).join(""),l=n.showReferenceOverlay&&n.overlayImageUrl?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">帳票デザイナー</p>
        <h1>BP1701 フォーム配置</h1>
      </div>
      <div class="meta-stack">
        <button class="button ${o?"primary":"secondary"}" data-action="fd-toggle-design">
          ${o?"🔧 配置モードON":"▶ プレビューモード"}
        </button>
        <button class="button primary" onclick="window.print()">🖨️ 印刷</button>
      </div>
    </section>

    ${o?`
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
        <div class="fd-canvas" style="${l}">
          ${a}
        </div>
      </div>
    </section>

    ${o?`
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
  `}function nt(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const i=n.dataset.fdId??"",o=parseFloat(n.style.left)||0,c=parseFloat(n.style.top)||0;t[i]={x:o,y:c}}),t}function kl(e,t,n,i,o){const c=Array.from(new Set([...e.map(d=>d.businessType??""),...t.map(d=>d.businessType??"")].filter(Boolean))),a=e.filter(d=>d.lat&&d.lng).length,l=t.filter(d=>d.lat&&d.lng).length,r=n.filter(d=>d.lat&&d.lng).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">マップ</p>
        <h1>取引先マップ</h1>
      </div>
      <div class="meta-stack">
        <span class="panel-caption">${o?"Google Maps":"OpenStreetMap"}</span>
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
        <p class="kpi-value">${l}</p>
        <p class="kpi-sub">/ ${t.length}件</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #FF9800;">
        <p class="panel-title">🟠 納品先</p>
        <p class="kpi-value">${r}</p>
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
  `}const Sl={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},xl=["new","picking","packed","shipped","delivered"];function Al(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(c=>t[c.stage].push(c));const n=xl.map(c=>{const a=Sl[c],l=t[c];return`
      <div class="wf-col" data-wf-stage="${c}">
        <div class="wf-col-header" style="--wf-color:${a.color};">
          <span class="wf-col-icon">${a.icon}</span>
          <span class="wf-col-label">${a.label}</span>
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
    `}).join(""),i=e.reduce((c,a)=>c+a.totalAmount,0),o=e.filter(c=>c.priority==="urgent").length;return`
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
      <article class="panel kpi-card ${o>0?"kpi-alert":""}">
        <p class="panel-title">急ぎ</p>
        <p class="kpi-value">${o}件</p>
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
  `}function El(e,t,n){const i=e.cart.reduce((c,a)=>c+a.amount,0);return`
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

      ${Pl(e,t,n)}
    </div>
  `}function Pl(e,t,n){if(e.step==="customer"){const i=e.customerQuery.toLowerCase(),o=i?t.filter(c=>c.name.toLowerCase().includes(i)||c.code.toLowerCase().includes(i)):t.slice(0,20);return`
      <section class="panel">
        <input id="mo-customer-q" type="text" placeholder="顧客名・コード検索" value="${e.customerQuery}" class="mo-search" />
        <div class="mo-list">
          ${o.slice(0,30).map(c=>`
            <button class="mo-item ${e.selectedCustomer?.id===c.id?"selected":""}" data-mo-select-customer="${c.id}">
              <div class="mo-item-title">${c.name}</div>
              <div class="mo-item-sub mono">${c.code}</div>
            </button>
          `).join("")}
        </div>
      </section>
      ${e.selectedCustomer?'<div class="mo-footer"><button class="button primary mo-next" data-mo-step="products">商品選択へ ▶</button></div>':""}
    `}if(e.step==="products"){const i=e.productQuery.toLowerCase(),o=i?n.filter(c=>c.name.toLowerCase().includes(i)||c.code.toLowerCase().includes(i)):n.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${o.slice(0,50).map(c=>{const a=e.cart.find(l=>l.productCode===c.code);return`
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
          ${e.cart.map((i,o)=>`
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${i.productName}</div>
                <div class="mo-item-sub">${i.quantity} × ¥${i.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${i.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${o}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${e.cart.reduce((i,o)=>i+o.amount,0).toLocaleString("ja-JP")}</strong>
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
  `}const ea={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},ta={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},aa={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function Cl(e,t){const n=e.find(c=>c.id===t)??e[0],i=e.filter(c=>c.status==="new").length,o=e.filter(c=>c.status==="confirmed").length;return`
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
        <p class="kpi-value">${o}件</p>
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
                <span class="status-pill ${ta[c.status]}">${ea[c.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${aa[c.language]} · 👥 ${c.partySize}名
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
            <span class="status-pill ${ta[n.status]}">${ea[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${aa[n.language]}</dd></div>
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
  `}const Ll=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,Il=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Dl(e,t){const n=t?e.find(o=>o.id===t):null,i=t==="__new__";return`
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
            ${e.map(o=>`
              <tr>
                <td>
                  ${o.name}
                  ${o.isDefault?'<span class="status-pill success" style="margin-left:6px;">既定</span>':""}
                </td>
                <td class="mono">${o.email}</td>
                <td>${o.displayName??"―"}</td>
                <td>
                  ${o.isVerified?'<span class="status-pill success">✓認証済</span>':'<span class="status-pill warning">未認証</span>'}
                </td>
                <td>
                  <button class="button-sm secondary" data-action="ms-edit" data-id="${o.id}">編集</button>
                  <button class="button-sm secondary" data-action="ms-delete" data-id="${o.id}" style="color:var(--danger);">削除</button>
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
  `}function Tl(e,t,n,i){const[o,c]=t.split("-").map(x=>parseInt(x,10)),a=new Date(o,c-1,1),l=new Date(o,c,0),r=a.getDay(),d=l.getDate(),u=[];for(let x=0;x<r;x++)u.push({isOutside:!0});for(let x=1;x<=d;x++)u.push({date:new Date(o,c-1,x)});for(;u.length%7!==0;)u.push({isOutside:!0});const p=n?e.filter(x=>x.category===n):e,y={};p.forEach(x=>{const R=x.startsAt.slice(0,10);y[R]??=[],y[R].push(x)});const v=new Date().toISOString().slice(0,10),f=u.map(x=>{if(x.isOutside)return'<div class="cal-cell cal-outside"></div>';const R=x.date,M=`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}-${String(R.getDate()).padStart(2,"0")}`,Q=y[M]??[],de=M===v,V=R.getDay();return`
        <div class="cal-cell ${de?"cal-today":""} ${V===0?"cal-sun":V===6?"cal-sat":""}"
             data-cal-date="${M}">
          <div class="cal-day-num">${R.getDate()}</div>
          <div class="cal-events">
            ${Q.slice(0,3).map(K=>`
              <button class="cal-event" data-cal-event-id="${K.id}"
                      style="background:${K.color||It[K.category]||"#0F5B8D"};"
                      title="${K.title}">
                <span class="cal-event-time">${K.isAllDay?"終日":new Date(K.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${K.title}</span>
              </button>
            `).join("")}
            ${Q.length>3?`<button class="cal-event-more" data-cal-date="${M}">+${Q.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),A=i?.isOpen?Nl(i):"",_=new Date(o,c-2,1),g=new Date(o,c,1),q=`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`,N=`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}`,E=(()=>{const x=new Date;return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`})();return`
    <section class="page-head">
      <div>
        <p class="eyebrow">カレンダー</p>
        <h1>${o}年 ${c}月</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="cal-new">＋ 予定追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="button secondary" data-action="cal-prev" data-ym="${q}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${E}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${N}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(Lt).map(([x,R])=>`<option value="${x}" ${n===x?"selected":""}>${R}</option>`).join("")}
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
  `}function Nl(e){const t=e.event;return`
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
                ${Object.entries(Lt).map(([n,i])=>`<option value="${n}" ${t.category===n?"selected":""}>${i}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?sa(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?sa(t.endsAt):""}" />
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
  `}function sa(e){const t=new Date(e),n=i=>String(i).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const we={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function ql(e,t){const n=t?e.find(i=>i.id===t):null;return`
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
        <p class="form-hint">${we[n.provider]?.description??""}</p>
        ${we[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${we[n.provider].setupUrl}" target="_blank">${we[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(we[n.provider]?.fields??[]).map(i=>`
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
  `}function Rl(e,t){const n=e.reduce((c,a)=>c+a.totalAmount,0),i=e.filter(c=>c.financialStatus==="paid").length,o=e.filter(c=>c.fulfillmentStatus!=="fulfilled"&&c.fulfillmentStatus!=="shipped").length;return`
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
      <article class="panel kpi-card ${o>0?"kpi-alert":""}">
        <p class="panel-title">未発送</p>
        <p class="kpi-value">${o}件</p>
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
  `}function Ol(e,t,n){return`
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
  `}function jl(e,t,n){const i=t==="__new__"?null:e.find(a=>a.id===t),o=t==="__new__";return n?.role==="admin"?`
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
                <td>${He[a.department]}</td>
                <td>${Ye[a.role]}</td>
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

    ${i||o?`
      <section class="panel">
        <div class="panel-header">
          <h2>${o?"新規ユーザー":`${i?.displayName} 編集`}</h2>
        </div>
        ${o?'<p class="form-hint">新規ユーザーを追加するとSupabase Authに登録され、初期パスワードでログインできます。</p>':""}
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 *</span>
            <input id="user-name" type="text" value="${i?.displayName??""}" placeholder="金井 太郎" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス *</span>
            <input id="user-email" type="email" value="${i?.email??""}" placeholder="taro@kaneishuzo.co.jp" ${i?"readonly":""} />
          </label>
          ${o?`<label class="field" style="flex:1 1 200px;">
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
              ${Object.entries(He).map(([a,l])=>`<option value="${a}" ${i?.department===a?"selected":""}>${l}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Ye).map(([a,l])=>`<option value="${a}" ${i?.role===a?"selected":""}>${l}</option>`).join("")}
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
    `}function Ml(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${He[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Ye[e.role]}</dd></div>
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
    `}function Fl(e){const t={};return e.forEach(n=>{const i=n.userEmail??"(anonymous)";t[i]=(t[i]??0)+1}),`
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
  `}function Bl(e){const t=e.prospects.reduce((c,a)=>c+a.expectedAmount,0),n=e.prospects.reduce((c,a)=>c+a.expectedAmount*a.probability/100,0),i=e.prospects.filter(c=>c.stage==="won").length,o=e.prospects.filter(c=>c.stage==="hot"||c.stage==="negotiating").length;return`
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
      <article class="panel kpi-card ${o>0?"kpi-alert":""}">
        <p class="panel-title">ホット案件</p>
        <p class="kpi-value">${o}件</p>
        <p class="kpi-sub">見込み高 + 商談中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注</p>
        <p class="kpi-value">${i}件</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    ${e.viewMode==="kanban"?zl(e.prospects):Vl(e.prospects)}

    ${Jl(e)}
  `}function zl(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(i=>{const o=e.filter(a=>a.stage===i),c=o.reduce((a,l)=>a+l.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${i}">
          <div class="pk-col-header" style="--pk-color:${Ze[i]};">
            <span class="pk-col-label">${Le[i]}</span>
            <span class="pk-col-count">${o.length}</span>
          </div>
          <div class="pk-col-sub">¥${c.toLocaleString("ja-JP")}</div>
          <div class="pk-col-body">
            ${o.length===0?'<div class="wf-empty">―</div>':o.map(a=>`
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
  `}function Vl(e){return`
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
                <td><span class="status-pill" style="background:${Ze[t.stage]};color:white;">${Le[t.stage]}</span></td>
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
  `}function Jl(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(i=>i.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(Le).map(([i,o])=>`<option value="${i}" ${n?.stage===i?"selected":""}>${o}</option>`).join("")}
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
  `}function Ul(e,t,n){const i=e?.config.webhook_url??"",o=e?.config.default_channel??"#general";return`
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
          <input id="slack-default-channel" type="text" value="${o}" />
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
                <td>${Ge[c.eventType]||c.eventType}</td>
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
                <td>${Ge[c.eventType]||c.eventType}</td>
                <td class="mono" style="font-size:12px;">${c.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.message}</td>
                <td><span class="status-pill ${c.status==="sent"?"success":"warning"}">${c.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Yl(e,t,n,i){const o=new Map(t.map(p=>[p.code,p])),c=e.filter(p=>p.callDirection==="inbound").length,a=e.filter(p=>p.callDirection==="outbound").length,l=e.filter(p=>p.callStatus==="missed").length,r=e.reduce((p,y)=>p+(y.durationSeconds??0),0),d=p=>{if(p===0)return"―";const y=Math.floor(p/60),v=p%60;return y>0?`${y}分${v}秒`:`${v}秒`},u=p=>{if(p.matchedCustomerCode){const y=o.get(p.matchedCustomerCode);if(y)return`${y.name} (既存)`}return"未登録番号"};return`
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
        <p class="kpi-sub">不在 ${l}件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">発信</p>
        <p class="kpi-value">${a}件</p>
        <p class="kpi-sub">直近50件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">通話時間合計</p>
        <p class="kpi-value">${d(r)}</p>
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
  `}const Hl=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function Gl(e){const t=e.activeListId?e.lists.find(c=>c.id===e.activeListId):null,n=e.items.filter(c=>c.status==="new").length,i=e.items.filter(c=>c.status==="imported").length,o=e.items.filter(c=>c.status==="excluded").length;return`
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
            ${Hl.map(c=>`<option value="${c}" ${e.searchBusinessType===c?"selected":""}>${c}</option>`).join("")}
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
            <span>❌ 除外: <strong>${o}</strong></span>
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
  `}const na={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Xl={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},Ql={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function O(e){return"¥"+e.toLocaleString("ja-JP")}function Ae(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function us(e,t){const n=e.reduce((c,a)=>c+a.amount,0),i=Math.floor(n*t),o=n+i;return{subtotal:n,taxAmount:i,total:o}}const L={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function I(e,t){const n=e.align??"left",i=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${i}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function it(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),i=n-2018;return{y:i>0?String(i).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function Wl(e,t,n){const i=it(e.documentDate),o=it(e.orderDate??e.documentDate),c=it(e.deliveryDate??e.documentDate),a=e.lines.slice(0,6).map((_,g)=>{const q=L.detailStartY+g*L.detailRowH,N=L.detailCols,E=[],x=(R,M)=>{M&&E.push(I({...R,y:q,x:R.x+0},M))};return x(N.productName,_.productName+(_.spec?` ${_.spec}`:"")),x(N.productCode,_.productCode),x(N.color,_.color??""),x(N.size,[_.size,_.caseQty?`×${_.caseQty}`:""].filter(Boolean).join(" ")),x(N.unit,_.unit),x(N.quantity,_.quantity>0?_.quantity.toLocaleString("ja-JP"):""),x(N.correctedQty,_.correctedQuantity?_.correctedQuantity.toLocaleString("ja-JP"):""),x(N.discount,_.discount?_.discount.toLocaleString("ja-JP"):""),x(N.unitPrice,_.unitPrice>0?_.unitPrice.toLocaleString("ja-JP"):""),x(N.costAmount,_.amount>0?_.amount.toLocaleString("ja-JP"):""),x(N.retailPrice,_.retailPrice?_.retailPrice.toLocaleString("ja-JP"):""),x(N.note,_.receivedAmount?_.receivedAmount.toLocaleString("ja-JP"):""),E.join("")}).join(""),l=e.lines.reduce((_,g)=>_+(g.amount||0),0),r=e.lines.reduce((_,g)=>_+(g.retailPrice||0)*(g.correctedQuantity??g.quantity),0),d=e.lines.reduce((_,g)=>_+(g.receivedAmount||0),0),u=e.lines.reduce((_,g)=>_+(g.returnAmount||0),0),p=e.lines.reduce((_,g)=>_+g.quantity,0),y=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",v=n.calibrationOffsetX||0,f=n.calibrationOffsetY||0,A=`transform: translate(${v}mm, ${f}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${y}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${A}">
        ${I(L.currentDateY,i.y)}
        ${I(L.currentDateM,i.m)}
        ${I(L.currentDateD,i.d)}
        ${I(L.documentNo,e.documentNo)}
        ${e.settlementPrint?I(L.settlementCheck,"✓"):""}

        ${I(L.vendorName,t.name)}
        ${I(L.vendorAddress,t.address1)}
        ${I(L.chainStoreCode,e.chainStoreCode??"")}
        ${I(L.categoryCode,e.categoryCode??"")}
        ${I(L.slipNumber,e.documentNo)}
        ${I(L.vendorCode,e.slipTypeCode??"")}

        ${I(L.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${I(L.orderDateY,o.y)}
        ${I(L.orderDateM,o.m)}
        ${I(L.orderDateD,o.d)}
        ${I(L.deliveryDateY,c.y)}
        ${I(L.deliveryDateM,c.m)}
        ${I(L.deliveryDateD,c.d)}
        ${I(L.orderNo,e.orderNo??"")}
        ${I(L.partnerCode,e.vendorCode??"")}

        ${a}

        ${I(L.totalQty,p.toLocaleString("ja-JP"))}
        ${I(L.receivedTotal,d.toLocaleString("ja-JP"))}
        ${I(L.returnTotal,u.toLocaleString("ja-JP"))}
        ${I(L.correctedCostTotal,l.toLocaleString("ja-JP"))}
        ${I(L.correctedRetailTotal,r.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function Kl(e,t,n){const{subtotal:i,taxAmount:o,total:c}=us(e.lines,e.taxRate),a=e.previousBalance??0,l=e.paymentAmount??0,r=a-l+c,d=e.lines.map(p=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${p.note??""}</td>
        <td>${p.productName}${p.spec?` <span style="color:#636e72;font-size:9pt;">/ ${p.spec}</span>`:""}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${p.unit}</td>`:""}
        <td class="numeric">${O(p.unitPrice)}</td>
        <td class="numeric">${O(p.amount)}</td>
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
        <div><dt>請求日</dt><dd>${Ae(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${Ae(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${O(r)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${O(i)} / 消費税: ${O(o)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${a?`<tr><th>前回御請求額</th><td>${O(a)}</td></tr>`:""}
          ${l?`<tr><th>ご入金額</th><td>▲ ${O(l)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${O(i)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${O(o)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${O(r)}</td></tr>
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
  `}function Zl(e,t,n){const{subtotal:i,taxAmount:o,total:c}=us(e.lines,e.taxRate),a=e.lines.map(r=>`
      <tr>
        <td>${r.productName}${r.spec?` <span style="color:#636e72;font-size:9pt;">/ ${r.spec}</span>`:""}</td>
        <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${r.unit}</td>`:""}
        <td class="numeric">${O(r.unitPrice)}</td>
        <td class="numeric">${O(r.amount)}</td>
      </tr>
    `).join(""),l=Array.from({length:Math.max(0,5-e.lines.length)}).map(()=>`
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
        <div><dt>見積日</dt><dd>${Ae(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${Ae(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${O(c)}</span>
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
        <tbody>${a}${l}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${O(i)} / 消費税: ${O(o)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${O(i)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${O(o)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${O(c)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?Ae(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function eo(e,t,n,i){let o="";switch(e){case"chain_store":o=Wl(i,n,t);break;case"quotation":o=Zl(i,n,t);break;case"invoice_monthly":o=Kl(i,n,t);break}const c=Object.keys(na).map(r=>`<button class="tab-button ${e===r?"active":""}" data-print-template="${r}">${na[r]}</button>`).join(""),a=i.lines.map((r,d)=>`
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
              ${o}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 印刷時はプレビューだけ表示 -->
    <div class="print-only">
      <div class="print-preview ${t.colorMode}">
        ${o}
      </div>
    </div>
  `}const to={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},ao={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function so(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],i="",o=!1;for(let l=0;l<e.length;l++){const r=e[l];o?r==='"'?e[l+1]==='"'?(i+='"',l++):o=!1:i+=r:r==='"'?o=!0:r===","?(n.push(i),i=""):r===`
`||r==="\r"?(r==="\r"&&e[l+1]===`
`&&l++,n.push(i),n.some(d=>d!=="")&&t.push(n),n=[],i=""):i+=r}if((i!==""||n.length>0)&&(n.push(i),n.some(l=>l!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const c=t[0].map(l=>l.trim()),a=[];for(let l=1;l<t.length;l++){const r={};c.forEach((d,u)=>{r[d]=(t[l][u]??"").trim()}),a.push(r)}return{columns:c,rows:a}}function no(e,t,n){const i=to[e],o=i.filter(l=>!t.includes(l)),c=n.map(l=>{const r=[];o.length>0&&r.push(`必須列欠損: ${o.join(",")}`);for(const d of i)t.includes(d)&&!l[d]&&r.push(`${d}が空`);return{...l,_valid:r.length===0,_error:r[0]}}),a=c.filter(l=>l._valid).length;return{entity:e,columns:t,rows:c,totalRows:n.length,validRows:a,invalidRows:c.length-a}}function io(e){const n=ao[e],o={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+o.join(",")+`
`}async function lo(e,t){const{supabaseInsert:n}=await b(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>T);return{supabaseInsert:l}},void 0);let i=0,o=0;const a={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const l of t){if(!l._valid)continue;const{_valid:r,_error:d,...u}=l,p={...u};if(!p.id){const y=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";p.id=String(u[y]??`${e}-${Date.now()}-${i+o}`)}for(const y of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof p[y]=="string"&&p[y]!==""){const v=Number(p[y]);Number.isFinite(v)&&(p[y]=v)}try{await n(a,p)!==null?i++:o++}catch{o++}}return{inserted:i,failed:o}}function lt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function oo(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function ro(e,t,n,i,o){const c=n.reduce((d,u)=>d+u.rowCount,0),a=n.map(d=>d.lastSyncAt).filter(d=>d!==null).sort().reverse()[0]??null,l=100,r=Math.max(1,Math.ceil(o/l));return`
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
        <p class="kpi-value">${a?lt(a):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${d.lastSyncAt?lt(d.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(d=>d.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${o.toLocaleString("ja-JP")}件中 ${((i-1)*l+1).toLocaleString("ja-JP")}-${Math.min(i*l,o).toLocaleString("ja-JP")} を表示</p>
        </div>
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="raw-page-prev" ${i<=1?"disabled":""}>← 前</button>
          <span style="padding:0 8px;">${i} / ${r}</span>
          <button class="button secondary" type="button" data-action="raw-page-next" ${i>=r?"disabled":""}>次 →</button>
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
              <td>${d._synced_at?lt(d._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${d._raw_b64?d._raw_b64.slice(0,200):""}">${oo(d._raw_b64)}</td>
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
  `}function ia(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function co(e,t){return Math.floor(Math.abs(t.getTime()-e.getTime())/(1e3*60*60*24))}function uo(e){return e==="dormant"?"休眠":"離反リスク"}function po(e){return e==="dormant"?"warning":"danger"}function mo(e,t){const n=new Date,i=new Date(n);i.setMonth(i.getMonth()-3);const o=new Date(n);o.setMonth(o.getMonth()-12);const c=new Date(n);c.setFullYear(c.getFullYear()-1);const a=new Date(c.getFullYear(),c.getMonth(),1),l=new Date(c.getFullYear(),c.getMonth()+1,0),r=new Date(n.getFullYear(),n.getMonth(),1),d=new Map(t.map(f=>[f.code,f])),u=new Map;for(const f of e){if(!f.legacy_customer_code)continue;const A=u.get(f.legacy_customer_code)||[];A.push(f),u.set(f.legacy_customer_code,A)}const p=[],y=[],v=new Set;for(const[f,A]of u.entries()){const _=d.get(f),g=_?.name||(A[0]?.customer_name??f);let q=null,N=0,E=!1,x=!1,R=!1,M=!1;for(const de of A){const V=new Date(de.sales_date);(!q||V>q)&&(q=V),V>=o&&(x=!0,N+=de.total_amount),V>=i&&(E=!0),V>=a&&V<=l&&(R=!0),V>=r&&(M=!0)}if(!q)continue;const Q={code:f,name:g,businessType:_?.businessType??"",areaCode:_?.areaCode??"",phone:_?.phone??"",lastOrderDate:q.toISOString().slice(0,10),daysSinceLastOrder:co(q,n),totalAmountLast12m:N,status:"dormant"};x&&!E&&(p.push({...Q,status:"dormant"}),v.add(f)),R&&!M&&!v.has(f)&&y.push({...Q,status:"at-risk"})}return p.sort((f,A)=>A.daysSinceLastOrder-f.daysSinceLastOrder),y.sort((f,A)=>A.totalAmountLast12m-f.totalAmountLast12m),{dormantCustomers:p,atRiskCustomers:y}}function yo(e){const t=[...e.dormantCustomers,...e.atRiskCustomers],n=e.dormantCustomers.length,i=e.atRiskCustomers.length,o=e.dormantCustomers.reduce((u,p)=>u+p.totalAmountLast12m,0),c=t.map(u=>`
        <tr data-status="${u.status}" data-area="${u.areaCode}" data-biz="${u.businessType}">
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td>${u.businessType}</td>
          <td>${u.areaCode}</td>
          <td class="mono">${u.lastOrderDate}</td>
          <td class="numeric">${u.daysSinceLastOrder}日</td>
          <td class="numeric">${ia(u.totalAmountLast12m)}</td>
          <td><span class="status-pill ${po(u.status)}">${uo(u.status)}</span></td>
        </tr>
      `).join(""),a=[...new Set(t.map(u=>u.areaCode).filter(Boolean))].sort(),l=[...new Set(t.map(u=>u.businessType).filter(Boolean))].sort(),r=a.map(u=>`<option value="${u}">${u}</option>`).join(""),d=l.map(u=>`<option value="${u}">${u}</option>`).join("");return`
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
        <div class="kpi-value">${ia(o)}</div>
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
            ${r}
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
  `}const ae=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],ft={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},te={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function ho(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function vo(e){const t=e.reduce((c,a)=>c+a,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const i=Math.max(...e);return e.filter(c=>c>i*.1).length<=6?"seasonal":"year-round"}function fo(e){const t=e.reduce((c,a)=>c+a,0);if(t===0)return[];const i=t/12*1.5,o=[];for(let c=0;c<12;c++)e[c]>i&&o.push(c);if(o.length===0){const c=Math.max(...e);c>0&&o.push(e.indexOf(c))}return o.sort((c,a)=>c-a)}function bo(e){return e.length===0?0:(e[0]-2+12)%12}function go(e){const t=new Date().getMonth(),n=e.map(o=>{const c=vo(o.monthlyQuantity),a=fo(o.monthlyQuantity),l=bo(a);return{code:o.code,name:o.name,category:o.category,peakMonths:a,proposalStartMonth:l,seasonType:c,monthlyQuantity:o.monthlyQuantity}}),i=[];for(let o=0;o<12;o++){const c=n.filter(a=>{if(a.peakMonths.length===0)return!1;const l=a.proposalStartMonth,r=a.peakMonths[0];return l<=r?o>=l&&o<=r:o>=l||o<=r});i.push({month:o,products:c,targetCustomers:[]})}return{products:n,proposals:i,selectedMonth:t}}function $o(e){const{products:t,proposals:n,selectedMonth:i}=e,o=new Date().getMonth(),c={"year-round":[],seasonal:[],"year-end":[]};t.forEach(p=>c[p.seasonType].push(p));const a=n[i],l=t.length,r=a?.products.length??0,d=t.filter(p=>p.peakMonths.includes(i)).length,u=a?.targetCustomers.length??0;return`
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
      <div class="mono numeric" style="font-size:1.5rem">${l}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${ae[i]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${r}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${ae[i]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${d}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${u}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${ae.map((p,y)=>{const v=y===o,f=y===i;return`<button class="button" style="padding:4px 10px;background:${f?"#0F5B8D":v?"#e2e8f0":"transparent"};color:${f?"#fff":"#333"};border:${v&&!f?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${y}">${p}${v?" ●":""}</button>`}).join("")}
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
            ${ae.map((p,y)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${y===o?"background:#f0f7ff;":""}">${p.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${_o(c,o)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${wo(c,i)}

  <!-- Target customer list for selected month -->
  ${ko(a)}
</div>`}function _o(e,t){const n=[],i=["year-round","seasonal","year-end"];for(const o of i){const c=e[o];if(c.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${te[o]}15;color:${te[o]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${ft[o]}</span>
    </td></tr>`);for(const a of c){const l=ae.map((r,d)=>{const u=a.peakMonths.includes(d),p=ps(a,d),y=d===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let v="transparent";u?v=te[a.seasonType]:p&&(v=te[a.seasonType]+"40");const f=u||p?`background:${v};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${y}"><div style="${f}" title="${u?"ピーク":p?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${a.name}"><span class="mono" style="font-size:0.7rem;color:#888">${a.code}</span> ${a.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${te[a.seasonType]}15;color:${te[a.seasonType]}">${ft[a.seasonType]}</span></td>
        ${l}
      </tr>`)}}}return n.join("")}function ps(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,i=e.peakMonths[0];return n<=i?t>=n&&t<i:t>=n||t<i}function wo(e,t){const i=["year-round","seasonal","year-end"].map(o=>{const c=e[o];if(c.length===0)return"";const a=c.filter(r=>r.peakMonths.includes(t)||ps(r,t));if(a.length===0)return"";const l=a.map(r=>{const u=r.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',p=r.monthlyQuantity.reduce((y,v)=>y+v,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${r.code}</td>
        <td style="padding:6px 8px">${r.name}</td>
        <td style="padding:6px 8px">${u}</td>
        <td class="mono numeric" style="padding:6px 8px">${r.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${p.toLocaleString()}</td>
        <td style="padding:6px 8px">${r.peakMonths.map(y=>ae[y]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${te[o]}15;color:${te[o]}">${ft[o]}</span>
        <span style="font-size:0.85rem;color:#666">${ae[t]}の対象: ${a.length}品</span>
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
        <tbody>${l}</tbody>
      </table>
    </div>`}).filter(Boolean);return i.length===0?`<div style="padding:1rem;color:#666;text-align:center">${ae[t]}に提案対象の商品はありません</div>`:i.join("")}function ko(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${ho(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const So=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),ot=["月","火","水","木","金"],la=6;function xo(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function Ao(e,t){if(t.length===0)return 0;const n=[...t].sort((o,c)=>o-c);return n.filter(o=>o<=e).length/n.length}function Eo(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function Po(e){const t=new Date,n=e.map(r=>r.annualRevenue),i=e.map(r=>{const d=xo(r.lastOrderDate,t);let u=0;const p=[];d>=60&&(u+=50,p.push("離反リスク")),r.hasSeasonalProposal&&(u+=30,p.push("季節提案タイミング")),d>=30&&d<60&&(u+=20,p.push("定期巡回"));const y=Ao(r.annualRevenue,n),v=Math.round(y*20);v>0&&(u+=v,p.push("金額ウェイト"));const f=Eo(p,d);return{code:r.code,name:r.name,phone:r.phone,address:r.address1,areaCode:r.areaCode,businessType:r.businessType,priorityScore:u,reasons:p,lastOrderDate:r.lastOrderDate,daysSinceOrder:d,annualRevenue:r.annualRevenue,recommendedAction:f}}).filter(r=>r.priorityScore>0).sort((r,d)=>d.priorityScore-r.priorityScore),o=new Map;for(const r of i){const d=r.areaCode||"その他";o.has(d)||o.set(d,[]),o.get(d).push(r)}const c=[...o.entries()].sort((r,d)=>d[1].reduce((u,p)=>u+p.priorityScore,0)-r[1].reduce((u,p)=>u+p.priorityScore,0)),a=[];let l=0;for(const[r,d]of c){const u=d.sort((p,y)=>y.priorityScore-p.priorityScore);for(let p=0;p<u.length&&!(l>=ot.length);p+=la){const y=u.slice(p,p+la);a.push({dayLabel:ot[l],area:r,visits:y}),l++}if(l>=ot.length)break}return{candidates:i,weekPlan:a,filterArea:"",filterMinScore:0}}function Co(e){const{candidates:t,weekPlan:n,filterArea:i,filterMinScore:o}=e,c=t.filter(p=>!(i&&p.areaCode!==i||o>0&&p.priorityScore<o)),a=Array.from(new Set(t.map(p=>p.areaCode))).sort(),l=c.length,r=c.filter(p=>p.priorityScore>=50).length,d=c.filter(p=>p.reasons.includes("離反リスク")).length,u=n.reduce((p,y)=>p+y.visits.length,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業支援</p>
        <h1>訪問計画 / ルート最適化</h1>
      </div>
    </section>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-value">${l}</div>
        <div>訪問候補</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${r}</div>
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
          <input type="number" min="0" max="100" step="10" value="${o}" data-action="visit-filter-score" style="width:5rem;" />
        </label>
        <button class="button" data-action="visit-apply-filter">絞り込み</button>
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">週間訪問プラン</h2>
      ${n.length===0?"<p>訪問候補がありません。</p>":Lo(n)}
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
            ${c.map(p=>Io(p)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Lo(e){return`
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
  `}function Io(e){return`
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
      <td class="numeric">${So.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function Do(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},i=e.map(d=>{const u=d.capacity>0?Math.round(d.currentVolume/d.capacity*100):0;return`
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
      `}).join(""),o=e.filter(d=>d.status==="in_use").length,c=e.filter(d=>d.status==="aging").length,a=e.filter(d=>d.status==="empty").length,l=e.reduce((d,u)=>d+u.capacity,0),r=e.reduce((d,u)=>d+u.currentVolume,0);return`
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
        <p class="kpi-value">${o} 基</p>
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
  `}function rt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function To(e,t,n){const i=e.rows.map((d,u)=>`
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
        <td class="numeric"><strong>${rt(d.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),o=e.deductions.map((d,u)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="type">
            ${Object.keys(pt).map(p=>`<option value="${p}" ${p===d.type?"selected":""}>${pt[p]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="categoryCode">
            ${Ba.map(p=>`<option value="${p.code}" ${p.code===d.categoryCode?"selected":""}>${p.code}:${p.name}</option>`).join("")}
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
    `).join(""),c=Array.from({length:12},(d,u)=>u+1),a=e.rows.reduce((d,u)=>d+u.exportDeduction+u.sampleDeduction,0),l=e.rows.reduce((d,u)=>d+u.productionVolume,0),r=l>0?a/l*100:0;return`
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
        <p class="kpi-value">${rt(e.totalTax)}</p>
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
          <tbody>${i||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${e.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${rt(e.totalTax)}</th>
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
          <tbody>${o||'<tr><td colspan="6" class="empty-row">「＋控除追加」で控除を追加してください。</td></tr>'}</tbody>
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
  `}const No={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let le=null,qo=0;const bt=[];function Ro(){return le&&document.body.contains(le)||(le=document.createElement("div"),le.className="toast-container",document.body.appendChild(le)),le}function w(e,t="success",n){const i=Ro(),o=++qo,c=t==="error"?5e3:t==="warning"?4e3:3e3,a=document.createElement("div");a.className=`toast toast-${t}`,a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.innerHTML=`
    <span class="toast-icon">${No[t]}</span>
    <span class="toast-msg">${jo(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const l={id:o,message:e,type:t,el:a};bt.push(l),i.appendChild(a),requestAnimationFrame(()=>{a.classList.add("toast-enter")});const r=()=>Oo(l);a.querySelector(".toast-dismiss").addEventListener("click",r),setTimeout(()=>{a.classList.add("toast-exit"),a.addEventListener("animationend",r,{once:!0})},c)}function Oo(e){const t=bt.indexOf(e);t!==-1&&(bt.splice(t,1),e.el.remove())}function jo(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Z(e,t={}){const{title:n="確認",confirmLabel:i="OK",cancelLabel:o="キャンセル",variant:c="primary"}=t;return new Promise(a=>{const l=document.createElement("div");l.className="modal-backdrop confirm-backdrop",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),l.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${c}">
            ${c==="danger"?Mo:Fo}
          </div>
          <h3 class="confirm-title">${Be(n)}</h3>
          <p class="confirm-message">${Be(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${Be(o)}</button>
          <button class="button ${c} confirm-ok">${Be(i)}</button>
        </div>
      </div>
    `;const r=u=>{l.classList.add("confirm-exit"),l.addEventListener("animationend",()=>{l.remove()},{once:!0}),a(u)};l.querySelector(".confirm-cancel").addEventListener("click",()=>r(!1)),l.querySelector(".confirm-ok").addEventListener("click",()=>r(!0)),l.addEventListener("click",u=>{u.target===l&&r(!1)});const d=u=>{u.key==="Escape"&&(document.removeEventListener("keydown",d),r(!1))};document.addEventListener("keydown",d),document.body.appendChild(l),requestAnimationFrame(()=>{l.querySelector(".confirm-ok")?.focus()})})}const Mo=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,Fo=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function Be(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function oa(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Bo(e,t,n){if(t.length===0&&(!n||n.length===0))return;const i=n&&n.length>0?n:Object.keys(t[0]??{}).map(d=>({key:d,label:d})),c=`\uFEFF${[i.map(d=>oa(d.label)).join(","),...t.map(d=>i.map(u=>oa(d[u.key])).join(","))].join(`\r
`)}`,a=new Blob([c],{type:"text/csv;charset=utf-8;"}),l=URL.createObjectURL(a),r=document.createElement("a");r.href=l,r.download=e,document.body.append(r),r.click(),r.remove(),window.setTimeout(()=>URL.revokeObjectURL(l),0)}const zo=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner"];let ve=[];async function Vo(){const{supabaseQueryAll:e}=await b(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>T);return{supabaseQueryAll:n}},void 0);ve=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const ra=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/demand-forecast",title:"需要予測・納品カレンダー"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"}];function ms(e){const t=St[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function Tt(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Jo(){const e=ms("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const et=new Date,Uo=et.toISOString().slice(0,7),Yo=et.getFullYear(),Ho=et.getMonth()+1,Go=et.toISOString().slice(0,10),Xo="C0011",oe=Jo();function ys(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return zo.includes(n)?n:"/"}function Nt(e){switch(e){case"/invoice-entry":case"/quote":case"/delivery":case"/billing":case"/invoice":case"/ledger":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":case"/demand-forecast":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const ca=ys(location.pathname),s={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:Tt(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Uo,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Yo,taxMonth:Ho,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],callLogs:[],mapFilters:{showCustomers:!0,showProspects:!0,showDelivery:!0,filterRegion:"",filterBusinessType:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...Xl,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...Ql},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Go,route:ca,currentCategory:Nt(ca),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:Xo,salesPeriod:"month",customRange:{start:"",end:""},quoteState:(()=>{const e={...ss};try{const t=localStorage.getItem("quote-seal");t&&(e.sealSettings=JSON.parse(t))}catch{}return e})(),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",customerEfficiency:[],masterTab:"customers",masterFilter:{...Dt},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodOptions:[],emailAudienceMode:oe.mode,emailRegion:oe.region,emailHistorySegment:oe.historySegment,emailTemplateId:oe.templateId,emailSubject:oe.subject,emailBody:oe.body,emailSaveMessage:oe.saveMessage,emailSending:!1,demandForecast:{...Xn},churnAlert:null,seasonalCalendar:null,visitPlanner:null,globalSearchOpen:!1,globalQuery:"",authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function da(e){return e.slice(0,10)}function Qo(e){return{...e}}function Xe(){s.pickerMode=null,s.pickerQuery="",s.pickerTargetLine=null}function hs(){s.invoiceForm=Tt(),s.invoiceSavedDocNo=null,s.invoicePriceGroup="",s.invoiceErrors={},Xe()}function vs(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,i)=>{n.productCode.trim()||(t[`lines.${i}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${i}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${i}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${i}.unitPrice`]="単価は0円以上で入力してください。")}),t}function Wo(e){const t=s.invoiceForm.lines[e];t&&s.invoiceForm.lines.splice(e+1,0,Qo(t))}function Ko(){const e=s.invoiceRecords[0],t=s.masterStats?.customers[0],n=s.masterStats?.products.slice(0,2)??[];s.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:s.invoiceForm.staffCode||"S001",lines:n.map((i,o)=>{const c=o===0?1:2,a=1200*(o+1);return{productCode:i.code,productName:i.name,quantity:c,unitPrice:a,unit:"本",amount:c*a}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},s.invoiceSavedDocNo=null,s.invoiceErrors={}}function Zo(e){const t=s.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,s.invoicePriceGroup=t.priceGroup||"",!0):!1}function er(e){const t=s.masterStats?.customers.find(n=>n.name===e.trim());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,s.invoicePriceGroup=t.priceGroup||"",!0):!1}function fs(e){if(W(e),s.invoiceErrors=vs(s.invoiceForm),Object.keys(s.invoiceErrors).length>0){h();return}s.invoiceSaving=!0,h(),ka(s.invoiceForm).then(t=>{s.invoiceSavedDocNo=t.documentNo,s.invoiceSaving=!1,s.invoiceErrors={},s.invoiceForm=Tt(),h()}).catch(()=>{s.invoiceSaving=!1,h()})}function bs(e){const t=s.salesFilter.startDate?new Date(s.salesFilter.startDate):null,n=s.salesFilter.endDate?new Date(`${s.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((i,o)=>new Date(o.date).getTime()-new Date(i.date).getTime()).filter(i=>{const o=new Date(i.date);return!(t&&o<t||n&&o>n)})}function gs(){switch(s.emailAudienceMode){case"area":return s.emailRegion==="all"?ve:ve.filter(e=>e.area===s.emailRegion);case"history":return ve.filter(e=>e.historySegment===s.emailHistorySegment);default:return ve}}function tr(){const e=gs();return{audienceMode:s.emailAudienceMode,region:s.emailRegion,historySegment:s.emailHistorySegment,selectedTemplateId:s.emailTemplateId,subject:s.emailSubject,body:s.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:s.emailSaveMessage,sending:s.emailSending,senderId:s.emailSenderId,senders:s.mailSenders}}function ct(e){const t=gs(),n=s.emailAudienceMode==="area"?s.emailRegion:s.emailAudienceMode==="history"?s.emailHistorySegment:"all";return{subject:s.emailSubject.trim(),body:s.emailBody.trim(),templateId:s.emailTemplateId,audienceMode:s.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(i=>i.email),status:e}}function qt(){return s.user,!1}function Pe(){s.globalSearchOpen=!1,s.globalQuery=""}function ar(){const e=s.globalQuery.trim().toLowerCase();return e?{customers:s.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:s.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:s.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:ra.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:ra}}function sr(){let e=[],t,n="export.csv";switch(s.route){case"/sales":e=(s.salesSummary?bs(s.salesSummary):[]).map(i=>({documentNo:i.documentNo,date:i.date,customerCode:i.customerCode,customerName:i.customerName,amount:i.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...s.paymentStatus?.records??[]].sort((i,o)=>o.balanceAmount-i.balanceAmount).map(i=>({...i})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=s.invoiceRecords.map(i=>({...i})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=s.purchaseList.map(i=>({...i})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=s.jikomiList.map(i=>({...i})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=s.tankList.map(i=>({...i})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=s.kenteiList.map(i=>({...i})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=s.materialList.map(i=>({...i})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":s.masterTab==="customers"?(e=s.masterStats?.customers.map(i=>({...i}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=s.masterStats?.products.map(i=>({...i}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Bo(n,e,t)}function ua(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),s.route=e,s.currentCategory=Nt(e),s.sidebarOpen=!1,Pe(),Rt(e)}async function Rt(e){s.actionLoading=!0,h();try{switch(e){case"/delivery":s.deliveryNote||(s.deliveryNote=await At(s.deliverySearchDocNo||"D240122"));break;case"/billing":s.billingSummary||(s.billingSummary=await Et(s.billingYearMonth));break;case"/report":s.salesReport||(s.salesReport=await Ke());break;case"/product-power":s.productPower.length===0&&(s.productPower=await La());break;case"/customer-efficiency":s.customerEfficiency.length===0&&(s.customerEfficiency=await Ia());break;case"/customer-analysis":s.customerAnalysis||(s.customerAnalysis=await Da());break;case"/demand-forecast":if(s.demandForecast.forecasts.length===0){const{fetchProductMonthlyShipments:t,fetchDeliverySchedule:n}=await b(async()=>{const{fetchProductMonthlyShipments:c,fetchDeliverySchedule:a}=await Promise.resolve().then(()=>k);return{fetchProductMonthlyShipments:c,fetchDeliverySchedule:a}},void 0),[i,o]=await Promise.all([t(),n()]);s.demandForecast.forecasts=Kn(i),s.demandForecast.deliveries=Zn(o)}break;case"/churn-alert":if(!s.churnAlert){const{supabaseQueryAll:t}=await b(async()=>{const{supabaseQueryAll:o}=await Promise.resolve().then(()=>T);return{supabaseQueryAll:o}},void 0),[n,i]=await Promise.all([t("sales_document_headers",{select:"sales_date,legacy_customer_code,customer_name,total_amount"}),s.masterStats?Promise.resolve(s.masterStats.customers):Je().then(o=>o.customers)]);s.churnAlert=mo(n.map(o=>({sales_date:o.sales_date||"",legacy_customer_code:o.legacy_customer_code||"",customer_name:o.customer_name||"",total_amount:Number(o.total_amount)||0})),(s.masterStats?.customers??i).map(o=>({code:o.code,name:o.name,businessType:o.businessType,areaCode:o.areaCode,phone:o.phone})))}break;case"/seasonal-calendar":if(!s.seasonalCalendar){const{fetchProductMonthlyShipments:t}=await b(async()=>{const{fetchProductMonthlyShipments:i}=await Promise.resolve().then(()=>k);return{fetchProductMonthlyShipments:i}},void 0),n=await t();s.seasonalCalendar=go(n.map(i=>({code:i.code,name:i.name,category:"",monthlyQuantity:i.monthlyQuantity})))}break;case"/visit-planner":if(!s.visitPlanner){const{supabaseQueryAll:t}=await b(async()=>{const{supabaseQueryAll:a}=await Promise.resolve().then(()=>T);return{supabaseQueryAll:a}},void 0),[n,i]=await Promise.all([t("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),s.masterStats?Promise.resolve(s.masterStats.customers):Je().then(a=>a.customers)]),o=s.masterStats?.customers??i,c=new Map;n.forEach(a=>{const l=a.legacy_customer_code||"",r=a.sales_date||"",d=Number(a.total_amount)||0,u=c.get(l);!u||r>u.lastDate?c.set(l,{lastDate:r,total:(u?.total??0)+d}):u.total+=d}),s.visitPlanner=Po(o.filter(a=>a.isActive).map(a=>({code:a.code,name:a.name,phone:a.phone,address1:a.address1,areaCode:a.areaCode,businessType:a.businessType,annualRevenue:c.get(a.code)?.total??0,lastOrderDate:c.get(a.code)?.lastDate??"",hasSeasonalProposal:!1})))}break;case"/jikomi":s.jikomiList.length===0&&(s.jikomiList=await Na());break;case"/tanks":s.tankList.length===0&&(s.tankList=await qa());break;case"/kentei":s.kenteiList.length===0&&(s.kenteiList=await Ra());break;case"/materials":s.materialList.length===0&&(s.materialList=await ut());break;case"/purchase":(s.purchaseList.length===0||s.payableList.length===0)&&([s.purchaseList,s.payableList]=await Promise.all([Oa(),ja()]));break;case"/raw-material":(s.billList.length===0||s.rawStockList.length===0)&&([s.billList,s.rawStockList]=await Promise.all([Ma(),Fa()]));break;case"/tax":s.taxDeclaration||(s.taxDeclaration=await Pt(s.taxYear,s.taxMonth));break;case"/store":(s.storeSales.length===0||s.storeOrders.length===0)&&([s.storeSales,s.storeOrders]=await Promise.all([Ct(s.storeSalesDate),Va()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await b(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>k);return{fetchMailSenders:n}},void 0);if(s.mailSenders=await t(),!s.emailSenderId||!s.mailSenders.find(n=>n.id===s.emailSenderId)){const n=s.mailSenders.find(i=>i.isDefault)??s.mailSenders[0];n&&(s.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await b(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>k);return{fetchCalendarEvents:n}},void 0);s.calendarEvents=await t(s.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await b(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>k);return{fetchIntegrationSettings:n}},void 0);s.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await b(async()=>{const{fetchShopifyOrders:i,fetchIntegrationSettings:o}=await Promise.resolve().then(()=>k);return{fetchShopifyOrders:i,fetchIntegrationSettings:o}},void 0);s.shopifyOrders=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await b(async()=>{const{fetchFaxInbox:i,fetchIntegrationSettings:o}=await Promise.resolve().then(()=>k);return{fetchFaxInbox:i,fetchIntegrationSettings:o}},void 0);s.faxRecords=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/users":{const{fetchUserProfiles:t}=await b(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>k);return{fetchUserProfiles:n}},void 0);s.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:i}=await b(async()=>{const{fetchMyProfile:c,fetchAuditLogs:a,fetchMailSenders:l}=await Promise.resolve().then(()=>k);return{fetchMyProfile:c,fetchAuditLogs:a,fetchMailSenders:l}},void 0),o=s.user?.email??s.myProfile?.email??"";o&&(s.myProfile=await t(o)),s.mailSenders.length===0&&(s.mailSenders=await i()),s.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await b(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>k);return{fetchAuditLogs:n}},void 0);s.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await b(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>k);return{fetchProspects:n}},void 0);s.prospects=await t()}break;case"/map":{const{fetchProspects:t,fetchDeliveryLocations:n,fetchIntegrationSettings:i}=await b(async()=>{const{fetchProspects:o,fetchDeliveryLocations:c,fetchIntegrationSettings:a}=await Promise.resolve().then(()=>k);return{fetchProspects:o,fetchDeliveryLocations:c,fetchIntegrationSettings:a}},void 0);s.prospects=await t(),s.deliveryLocations=await n(),s.integrations.length===0&&(s.integrations=await i())}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await b(async()=>{const{fetchCallLogs:i,fetchIntegrationSettings:o}=await Promise.resolve().then(()=>k);return{fetchCallLogs:i,fetchIntegrationSettings:o}},void 0);s.callLogs=await t(100),s.integrations.length===0&&(s.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await b(async()=>{const{fetchLeadLists:i,fetchIntegrationSettings:o}=await Promise.resolve().then(()=>k);return{fetchLeadLists:i,fetchIntegrationSettings:o}},void 0);s.leadLists=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await b(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>k);return{fetchWorkflowOrdersFromDb:n}},void 0);s.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await b(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>k);return{fetchTourInquiriesFromDb:n}},void 0);s.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:i}=await b(async()=>{const{fetchSlackRules:o,fetchSlackLogs:c,fetchIntegrationSettings:a}=await Promise.resolve().then(()=>k);return{fetchSlackRules:o,fetchSlackLogs:c,fetchIntegrationSettings:a}},void 0);s.slackRules=await t(),s.slackLogs=await n(50),s.integrations.length===0&&(s.integrations=await i())}break;case"/":{const{fetchProspects:t,fetchCalendarEvents:n,fetchWorkflowOrdersFromDb:i,fetchTourInquiriesFromDb:o}=await b(async()=>{const{fetchProspects:c,fetchCalendarEvents:a,fetchWorkflowOrdersFromDb:l,fetchTourInquiriesFromDb:r}=await Promise.resolve().then(()=>k);return{fetchProspects:c,fetchCalendarEvents:a,fetchWorkflowOrdersFromDb:l,fetchTourInquiriesFromDb:r}},void 0);s.prospects.length===0&&(s.prospects=await t()),s.calendarEvents.length===0&&(s.calendarEvents=await n(s.calendarYearMonth)),s.materialList.length===0&&(s.materialList=await ut()),s.workflowOrders.length===0&&(s.workflowOrders=await i()),s.tourInquiries.length===0&&(s.tourInquiries=await o())}break;default:break}}catch(t){console.warn("Route data load error",t)}finally{s.actionLoading=!1,h()}}function pa(){if(qt())return ji(s.authError,s.authSubmitting);if(s.loading)return`
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
    `;switch(s.route){case"/cat/sales":return Ie("sales");case"/cat/brewery":return Ie("brewery");case"/cat/purchase":return Ie("purchase");case"/cat/more":return Ie("more");case"/invoice-entry":return fi(s.invoiceForm,s.invoiceSavedDocNo,s.invoiceSaving,s.invoiceErrors);case"/quote":return _i(s.quoteState,s.masterStats?.customers??[],s.masterStats?.products??[],s.quoteCustomerQuery,s.quoteProductQuery,s.quotePricing);case"/email":return mi(tr());case"/delivery":return s.deliveryNote?ui(s.deliveryNote,s.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/billing":return s.billingSummary?Vn(s.billingSummary,s.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return s.salesReport?yl(s.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Ai(s.productPower,s.productFilter,s.productDaily,s.productPeriod,s.productCustomStart,s.productCustomEnd);case"/customer-efficiency":return Ei(s.customerEfficiency);case"/customer-analysis":return s.customerAnalysis?ol(s.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":case"/customer-efficiency":return'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return si(s.demandForecast);case"/churn-alert":return s.churnAlert?yo(s.churnAlert):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return s.seasonalCalendar?$o(s.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return s.visitPlanner?Co(s.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/jikomi":return s.jikomiView==="calendar"?`${Xt(s.jikomiList,s.jikomiView)}${qi(s.jikomiList)}`:Xt(s.jikomiList,s.jikomiView);case"/tanks":return Do(s.tankList);case"/kentei":return Ri(s.kenteiList);case"/materials":return Gi(s.materialList)+Hi(s.materialEditing,s.materialEditingIsNew);case"/purchase":return Zi(s.purchaseList,s.payableList);case"/raw-material":return el(s.billList,s.rawStockList);case"/tax":return s.taxDeclaration?To(s.taxDeclaration,s.taxYear,s.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return bl(s.storeSales,s.storeOrders,s.storeTab,s.storeSalesDate);case"/setup":return s.pipelineMeta?sl(s.pipelineMeta,J,F,s.syncDashboard):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return ro(s.rawSelectedTable,s.rawRecords,s.rawTableList,s.rawPage,s.rawTotalCount);case"/import":return $l(s.importEntity,s.importPreview,s.importing,s.importResult);case"/print":return eo(s.printTemplate,s.printOptions,s.printCompany,s.printData);case"/form-designer":return wl(s.printData,s.printCompany,s.printOptions,s.fdSavedPositions,s.fdDesignMode);case"/map":{const e=(s.masterStats?.customers??[]).slice(0,200).map((i,o)=>{const c=i;return{...i,lat:c.lat??35.37+o%12*.05+(Math.random()-.5)*.02,lng:c.lng??139.29+Math.floor(o/12)*.05+(Math.random()-.5)*.02,address1:c.address1??"",businessType:c.businessType??"",lastOrderAmount:0}}),n=!!s.integrations.find(i=>i.provider==="google_maps")?.config.api_key;return kl(e,s.prospects,s.deliveryLocations,s.mapFilters,n)}case"/workflow":return Al(s.workflowOrders);case"/mobile-order":return El(s.mobileOrder,s.masterStats?.customers??[],s.masterStats?.products??[]);case"/tour":return Cl(s.tourInquiries,s.tourActiveId);case"/mail-senders":return Dl(s.mailSenders,s.mailSenderEditingId);case"/calendar":return Tl(s.calendarEvents,s.calendarYearMonth,s.calendarFilterCategory,s.calendarEdit);case"/integrations":return ql(s.integrations,s.integrationEditingId);case"/shopify":{const e=s.integrations.find(t=>t.id==="shopify");return Rl(s.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Ol(s.faxRecords,s.faxProcessing,s.faxOcrText);case"/users":return jl(s.userProfiles,s.userEditingId,s.myProfile);case"/profile":return Ml(s.myProfile,s.auditLogs.filter(e=>e.userEmail===s.myProfile?.email),s.mailSenders);case"/audit":return Fl(s.auditLogs);case"/prospects":{const e={prospects:s.prospects,activities:s.prospectActivities,editingId:s.prospectEditingId,viewMode:s.prospectViewMode};return Bl(e)}case"/slack":{const e=s.integrations.find(t=>t.provider==="slack")??null;return Ul(e,s.slackRules,s.slackLogs)}case"/calls":{const e=s.integrations.find(t=>t.provider==="ivry");return Yl(s.callLogs,s.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:s.leadLists,activeListId:s.leadActiveListId,items:s.leadItems,searchQuery:s.leadSearchQuery,searchArea:s.leadSearchArea,searchBusinessType:s.leadSearchType,searching:s.leadSearching,searchResults:s.leadSearchResults};return Gl(e)}}if(!s.salesSummary||!s.paymentStatus||!s.masterStats||!s.pipelineMeta||!s.customerLedger||!s.salesAnalytics)return"";switch(s.route){case"/sales":return fl(bs(s.salesSummary),s.salesFilter.startDate,s.salesFilter.endDate);case"/payment":return Wi([...s.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return Yi(s.masterStats,s.masterTab,s.masterFilter);case"/invoice":return Li(s.invoiceRecords,s.invoiceFilter);case"/ledger":return Gn(s.customerLedger,s.ledgerCustomerCode);case"/analytics":return ml(s.salesAnalytics,s.analyticsTab,s.analyticsPeriod,s.analyticsPeriodFilter,s.analyticsPeriodRows,s.analyticsPeriodOptions);default:return ri(s.salesSummary,s.pipelineMeta,s.salesAnalytics,{prospects:s.prospects,upcomingEvents:s.calendarEvents,tourInquiries:s.tourInquiries,workflowOrdersCount:{new:s.workflowOrders.filter(e=>e.stage==="new").length,picking:s.workflowOrders.filter(e=>e.stage==="picking").length,packed:s.workflowOrders.filter(e=>e.stage==="packed").length,shipped:s.workflowOrders.filter(e=>e.stage==="shipped").length,total:s.workflowOrders.length},lowStockCount:s.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:s.masterStats?{customers:s.masterStats.summary.customerCount,products:s.masterStats.summary.productCount,suppliers:s.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:s.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0},s.salesPeriod,s.customRange)}}function nr(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=s.announcements.filter(o=>!s.dismissedAnnouncements.has(o.id)).map(o=>{const c=e[o.level]??e.info;return`
      <div class="announcement-bar" style="background:${c.bg};border-bottom:2px solid ${c.border};">
        <span class="announcement-text">${c.icon} ${o.message}</span>
        ${o.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${o.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),i=s.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+i}function ir(){if(qt())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${pa()}</div>
        </main>
      </div>
    `;const e={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売業務",items:[{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/quote",label:"見積作成",kicker:"Quote"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],analytics:[{label:"分析",items:[{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/customer-analysis",label:"得意先分析",kicker:"CustABC"},{path:"/product-power",label:"商品力分析",kicker:"Power"},{path:"/customer-efficiency",label:"営業効率",kicker:"Efficiency"},{path:"/demand-forecast",label:"需要予測",kicker:"Forecast"},{path:"/report",label:"集計帳票",kicker:"Report"}]}],crm:[{label:"営業ツール",items:[{path:"/churn-alert",label:"離反アラート",kicker:"Churn"},{path:"/seasonal-calendar",label:"季節提案",kicker:"Season"},{path:"/visit-planner",label:"訪問計画",kicker:"Visit"},{path:"/prospects",label:"新規営業",kicker:"Prospects"},{path:"/map",label:"取引先マップ",kicker:"Map"},{path:"/list-builder",label:"リスト取得",kicker:"ListBuild"},{path:"/calls",label:"通話履歴",kicker:"Calls"},{path:"/email",label:"メール配信",kicker:"Mail"}]},{label:"受注・出荷",items:[{path:"/workflow",label:"受注ワークフロー",kicker:"Workflow"},{path:"/mobile-order",label:"モバイル受注",kicker:"Mobile"},{path:"/shopify",label:"Shopify注文",kicker:"Shopify"},{path:"/fax",label:"FAX OCR",kicker:"FAX"}]}],orders:[{label:"仕入・調達",items:[{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],brewery:[{label:"製造管理",items:[{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"},{path:"/tax",label:"酒税申告",kicker:"Tax"}]}],master:[{label:"マスタ・ツール",items:[{path:"/master",label:"マスタ管理",kicker:"Master"},{path:"/calendar",label:"カレンダー",kicker:"Calendar"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/tour",label:"酒蔵見学",kicker:"Tour"},{path:"/print",label:"印刷",kicker:"Print"}]}],settings:[{label:"システム設定",items:[{path:"/setup",label:"連動設定",kicker:"Setup"},{path:"/integrations",label:"外部連携",kicker:"API"},{path:"/slack",label:"Slack通知",kicker:"Slack"},{path:"/import",label:"データ取込",kicker:"Import"},{path:"/raw-browser",label:"データブラウザ",kicker:"RawData"},{path:"/users",label:"ユーザー管理",kicker:"Users"},{path:"/profile",label:"プロフィール",kicker:"Profile"},{path:"/audit",label:"操作ログ",kicker:"Audit"}]}]},t=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/invoice-entry",label:"販売"},{category:"analytics",path:"/analytics",label:"分析"},{category:"crm",path:"/prospects",label:"営業"},{category:"orders",path:"/purchase",label:"仕入"},{category:"brewery",path:"/jikomi",label:"製造"},{category:"master",path:"/master",label:"マスタ"},{category:"settings",path:"/setup",label:"設定"}],n=e[s.currentCategory].map(l=>`
        <div class="nav-group">
          <p class="nav-group-label">${l.label}</p>
          ${l.items.map(r=>`
                <a
                  href="${"/".replace(/\/$/,"")}${r.path==="/"?"/":r.path}"
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
      `).join(""),i=t.map(l=>`
        <a
          href="${"/".replace(/\/$/,"")}${l.path==="/"?"/":l.path}"
          class="category-link ${s.currentCategory===l.category?"active":""}"
          data-link="${l.path}"
        >
          ${l.label}
        </a>
      `).join(""),o=s.pickerMode&&s.masterStats?s.pickerMode==="customer"?hi(s.masterStats.customers,s.pickerQuery):Ki(s.masterStats.products,s.pickerQuery):"",c=s.globalSearchOpen?yi(s.globalQuery,ar()):"",a=s.user?`
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
        ${nr()}
        <div class="view ${s.actionLoading?"is-busy":""}">${pa()}</div>
      </main>
      ${o}
      ${c}
    </div>
  `}async function lr(e){s.actionLoading=!0,h();try{s.invoiceRecords=await Ue(e)}finally{s.actionLoading=!1,h()}}async function or(e){s.actionLoading=!0,h();try{s.customerLedger=await xt(e)}finally{s.actionLoading=!1,h()}}function W(e){s.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??s.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??s.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??s.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??s.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??s.invoiceForm.staffCode,lines:s.invoiceForm.lines.map((t,n)=>{const i=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,o=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:i,unitPrice:o,amount:i*o}}),note:e.querySelector("#inv-note")?.value??s.invoiceForm.note},s.invoiceForm.customerCode=s.invoiceForm.customerCode.trim().toUpperCase(),s.invoiceForm.customerName=s.invoiceForm.customerName.trim()}function re(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??s.emailAudienceMode;s.emailAudienceMode=t,s.emailRegion=e.querySelector("#email-region")?.value??s.emailRegion,s.emailHistorySegment=e.querySelector("#email-history-segment")?.value??s.emailHistorySegment,s.emailSubject=e.querySelector("#email-subject")?.value??s.emailSubject,s.emailBody=e.querySelector("#email-body")?.value??s.emailBody}function rr(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{s.globalSearchOpen=!0,h()}),e.querySelectorAll("[data-action='global-search-close']").forEach(a=>{a.addEventListener("click",l=>{a.classList.contains("global-search")&&l.target instanceof HTMLElement&&!l.target.classList.contains("global-search")||(Pe(),h())})}),e.querySelector("#global-search-input")?.addEventListener("input",a=>{s.globalQuery=a.target.value,h()}),e.querySelectorAll("[data-action='global-nav']").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.path;l&&(Pe(),ua(l))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{sr()}),e.querySelectorAll("[data-jikomi-tab]").forEach(a=>{a.addEventListener("click",()=>{s.jikomiView=a.dataset.jikomiTab,h()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const a=e.querySelector("#auth-email")?.value.trim()??"",l=e.querySelector("#auth-password")?.value??"";s.authSubmitting=!0,s.authError=null,h(),xs(a,l).then(async r=>{s.user=r,s.authSkipped=!1,s.authSubmitting=!1,s.authError=null;const{fetchMyProfile:d,recordAudit:u}=await b(async()=>{const{fetchMyProfile:p,recordAudit:y}=await Promise.resolve().then(()=>k);return{fetchMyProfile:p,recordAudit:y}},void 0);s.myProfile=await d(r.email),await u({action:"sign_in",userEmail:r.email}),h()}).catch(async r=>{try{const d=await jt(a,l);s.user=d,s.authSkipped=!1,s.authError=null;const{fetchMyProfile:u}=await b(async()=>{const{fetchMyProfile:p}=await Promise.resolve().then(()=>k);return{fetchMyProfile:p}},void 0);s.myProfile=await u(d.email)}catch{s.authError=r instanceof Error?r.message:"ログインに失敗しました。"}finally{s.authSubmitting=!1,h()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{s.authSkipped=!0,s.authError=null,h()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{As().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{s.sidebarOpen=!0,h()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(a=>{a.addEventListener("click",()=>{s.sidebarOpen=!1,h()})});const t=e.querySelector(".sidebar");if(t&&s.sidebarOpen){let a=0;t.addEventListener("touchstart",l=>{a=l.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",l=>{l.changedTouches[0].clientX-a<-60&&(s.sidebarOpen=!1,h())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.id??"";s.dismissedAnnouncements.add(l),h()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelectorAll("[data-link]").forEach(a=>{a.addEventListener("click",l=>{l.preventDefault(),ua(a.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async a=>{a.preventDefault();const l=e.querySelector("#fr-title")?.value??"",r=e.querySelector("#fr-category")?.value??"feature",d=e.querySelector("#fr-description")?.value??"",u=e.querySelector("#fr-result");if(!l.trim())return;const p=await xa(l,r,d);if(u&&(u.textContent=p?"送信しました":"送信に失敗しました",u.className=`fr-result ${p?"success":"error"}`),p){const y=e.querySelector("#feature-request-form");y&&y.reset()}}),e.querySelectorAll("[data-period]").forEach(a=>{a.addEventListener("click",()=>{s.salesPeriod=a.dataset.period,h()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const a=e.querySelector("#range-start")?.value??"",l=e.querySelector("#range-end")?.value??"";a&&l&&(s.customRange={start:a,end:l},s.salesPeriod="custom",h())}),e.querySelectorAll("[data-edit-customer]").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.editCustomer??"",r=s.masterStats?.customers.find(u=>u.id===l);if(!r)return;const d=document.createElement("div");d.innerHTML=Mi(r),document.body.appendChild(d.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async u=>{u.preventDefault();const p=document.getElementById("edit-result"),y=await Aa(l,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,manual_override:!0});p&&(p.textContent=y?"保存しました":"保存に失敗",p.className=`fr-result ${y?"success":"error"}`),y&&(document.getElementById("edit-modal")?.remove(),Ee())})})}),e.querySelectorAll("[data-edit-product]").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.editProduct??"",r=s.masterStats?.products.find(u=>u.id===l);if(!r)return;const d=document.createElement("div");d.innerHTML=Fi(r),document.body.appendChild(d.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async u=>{u.preventDefault();const p=document.getElementById("edit-result"),y=await Ea(l,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});p&&(p.textContent=y?"保存しました":"保存に失敗",p.className=`fr-result ${y?"success":"error"}`),y&&(document.getElementById("edit-modal")?.remove(),Ee())})})}),e.querySelector("#q-cust-search")?.addEventListener("input",a=>{s.quoteCustomerQuery=a.target.value,h()}),e.querySelector("#q-prod-search")?.addEventListener("input",a=>{s.quoteProductQuery=a.target.value,h()}),e.querySelectorAll("[data-select-customer]").forEach(a=>{a.addEventListener("click",async()=>{const l=a.dataset.selectCustomer??"";s.quoteState.customerCode=l,s.quoteState.customerName=a.dataset.custName??"",s.quoteState.customerAddress=a.dataset.custAddr??"",s.quoteCustomerQuery="",s.quotePricing=await Pa(s.masterStats?.customers??[],l),h()})}),e.querySelectorAll("[data-add-product]").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.addProduct??"",r=a.dataset.prodName??"",d=parseInt(a.dataset.prodPrice??"0");s.quoteState.lines.push({productCode:l,productName:r,quantity:1,unit:"本",unitPrice:d,amount:d}),s.quoteProductQuery="",h()})}),e.querySelectorAll(".qty-input").forEach(a=>{a.addEventListener("change",()=>{const l=parseInt(a.dataset.lineIdx??"0"),r=s.quoteState.lines[l];r&&(r.quantity=parseInt(a.value)||0,r.amount=r.quantity*r.unitPrice,h())})}),e.querySelectorAll(".price-input").forEach(a=>{a.addEventListener("change",()=>{const l=parseInt(a.dataset.lineIdx??"0"),r=s.quoteState.lines[l];r&&(r.unitPrice=parseInt(a.value)||0,r.amount=r.quantity*r.unitPrice,h())})}),e.querySelectorAll("[data-remove-line]").forEach(a=>{a.addEventListener("click",()=>{const l=parseInt(a.dataset.removeLine??"0");s.quoteState.lines.splice(l,1),h()})}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{const a=s.quoteState;a.quoteNo=a.quoteNo||`Q${Date.now().toString(36).toUpperCase()}`,a.quoteDate=document.getElementById("q-date")?.value??a.quoteDate,a.validUntil=document.getElementById("q-valid")?.value??"",a.subject=document.getElementById("q-subject")?.value??"",a.remarks=document.getElementById("q-remarks")?.value??"",a.deliveryDate=document.getElementById("q-delivery-date")?.value??a.deliveryDate,a.paymentTerms=document.getElementById("q-payment-terms")?.value??a.paymentTerms,a.deliveryPlace=document.getElementById("q-delivery-place")?.value??a.deliveryPlace,a.fieldConfig.headerNote=document.getElementById("q-header-note")?.value??a.fieldConfig.headerNote,a.fieldConfig.footerNote=document.getElementById("q-footer-note")?.value??a.fieldConfig.footerNote;const l=a.lines.reduce((p,y)=>p+y.amount,0),r=Math.round(l*a.taxRate/100),{supabaseInsert:d}=await b(async()=>{const{supabaseInsert:p}=await Promise.resolve().then(()=>T);return{supabaseInsert:p}},void 0),u=await d("quotes",{quote_no:a.quoteNo,quote_date:a.quoteDate,valid_until:a.validUntil||null,legacy_customer_code:a.customerCode,customer_name:a.customerName,customer_address:a.customerAddress,subject:a.subject,subtotal:l,tax_amount:r,total_amount:l+r,remarks:a.remarks});if(u?.id){for(let p=0;p<a.lines.length;p++){const y=a.lines[p];await d("quote_lines",{quote_id:u.id,line_no:p+1,legacy_product_code:y.productCode,product_name:y.productName,quantity:y.quantity,unit:y.unit,unit_price:y.unitPrice,amount:y.amount})}alert(`見積 ${a.quoteNo} を保存しました`),s.quoteState={...ss},h()}}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{const a=s.quoteState;a.quoteDate=document.getElementById("q-date")?.value??a.quoteDate,a.validUntil=document.getElementById("q-valid")?.value??a.validUntil,a.subject=document.getElementById("q-subject")?.value??a.subject,a.remarks=document.getElementById("q-remarks")?.value??a.remarks,a.quoteNo=document.getElementById("q-no")?.value??a.quoteNo,a.deliveryDate=document.getElementById("q-delivery-date")?.value??a.deliveryDate,a.paymentTerms=document.getElementById("q-payment-terms")?.value??a.paymentTerms,a.deliveryPlace=document.getElementById("q-delivery-place")?.value??a.deliveryPlace,a.fieldConfig.headerNote=document.getElementById("q-header-note")?.value??a.fieldConfig.headerNote,a.fieldConfig.footerNote=document.getElementById("q-footer-note")?.value??a.fieldConfig.footerNote,a.previewMode=!0,h()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{s.quoteState.previewMode=!1,h()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",()=>{const a=s.quoteState;a.previewMode||(a.quoteDate=document.getElementById("q-date")?.value??a.quoteDate,a.validUntil=document.getElementById("q-valid")?.value??a.validUntil,a.subject=document.getElementById("q-subject")?.value??a.subject,a.remarks=document.getElementById("q-remarks")?.value??a.remarks,a.quoteNo=document.getElementById("q-no")?.value??a.quoteNo,a.deliveryDate=document.getElementById("q-delivery-date")?.value??a.deliveryDate,a.paymentTerms=document.getElementById("q-payment-terms")?.value??a.paymentTerms,a.deliveryPlace=document.getElementById("q-delivery-place")?.value??a.deliveryPlace,a.fieldConfig.headerNote=document.getElementById("q-header-note")?.value??a.fieldConfig.headerNote,a.fieldConfig.footerNote=document.getElementById("q-footer-note")?.value??a.fieldConfig.footerNote),wi(a)}),e.querySelectorAll("[data-field-toggle]").forEach(a=>{a.addEventListener("change",()=>{const l=a.dataset.fieldToggle;l&&typeof s.quoteState.fieldConfig[l]=="boolean"&&(s.quoteState.fieldConfig[l]=a.checked,h())})}),e.querySelector("#q-seal-file")?.addEventListener("change",a=>{const l=a.target.files?.[0];if(!l)return;const r=new FileReader;r.onload=()=>{s.quoteState.sealSettings={imageDataUrl:r.result,size:72},localStorage.setItem("quote-seal",JSON.stringify(s.quoteState.sealSettings)),h()},r.readAsDataURL(l)}),e.querySelector("#q-seal-size")?.addEventListener("input",a=>{const l=parseInt(a.target.value);s.quoteState.sealSettings&&(s.quoteState.sealSettings.size=l,localStorage.setItem("quote-seal",JSON.stringify(s.quoteState.sealSettings)),h())}),e.querySelector("[data-action='remove-seal']")?.addEventListener("click",()=>{s.quoteState.sealSettings=null,localStorage.removeItem("quote-seal"),h()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.month;l&&(s.demandForecast.calendarMonth=l,h())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.segment;s.demandForecast.selectedSegment=l,h()})}),e.querySelectorAll("[data-action='select-month']").forEach(a=>{a.addEventListener("click",()=>{const l=parseInt(a.dataset.month??"0");s.seasonalCalendar&&(s.seasonalCalendar.selectedMonth=l,h())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",a=>{s.visitPlanner&&(s.visitPlanner.filterArea=a.target.value,h())}),e.querySelector("#visit-filter-score")?.addEventListener("change",a=>{s.visitPlanner&&(s.visitPlanner.filterMinScore=parseInt(a.target.value)||0,h())}),e.querySelectorAll("[data-product-period]").forEach(a=>{a.addEventListener("click",()=>{s.productPeriod=a.dataset.productPeriod??"year",h()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const a=document.getElementById("pp-range-start")?.value??"",l=document.getElementById("pp-range-end")?.value??"";a&&l&&(s.productCustomStart=a,s.productCustomEnd=l,s.productPeriod="custom",h())}),e.querySelectorAll("[data-product-filter]").forEach(a=>{a.addEventListener("click",()=>{s.productFilter=a.dataset.productFilter??"all",h()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async a=>{const l=a.currentTarget;l.disabled=!0,l.textContent="更新中…",await Ee(),l.disabled=!1,l.textContent="↻ 更新",w("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const a=e.querySelector("#sales-start")?.value??"",l=e.querySelector("#sales-end")?.value??"";s.salesFilter={startDate:a,endDate:l},h()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const a={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};s.invoiceFilter=a,lr(a)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const a=e.querySelector("#ledger-customer-code")?.value??"";s.ledgerCustomerCode=a.trim().toUpperCase(),or(s.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{s.masterTab=a.dataset.tab,s.masterFilter={...Dt},h()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{s.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},h()}),e.querySelector("#master-search")?.addEventListener("keydown",a=>{a.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(a=>{a.addEventListener("click",()=>{const l=Number(a.dataset.page);l>=1&&(s.masterFilter={...s.masterFilter,page:l},h())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(a=>{a.addEventListener("click",async()=>{const l=a.dataset.table;if(!l)return;s.rawSelectedTable=l,s.rawPage=1;const r=await Ve(l,1);s.rawRecords=r.records,s.rawTotalCount=r.total,h()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!s.rawSelectedTable||s.rawPage<=1)return;s.rawPage-=1;const a=await Ve(s.rawSelectedTable,s.rawPage);s.rawRecords=a.records,s.rawTotalCount=a.total,h()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!s.rawSelectedTable)return;s.rawPage+=1;const a=await Ve(s.rawSelectedTable,s.rawPage);s.rawRecords=a.records,s.rawTotalCount=a.total,h()}),e.querySelectorAll("[data-analytics-tab]").forEach(a=>{a.addEventListener("click",async()=>{if(s.analyticsTab=a.dataset.analyticsTab,s.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:r}=await b(async()=>{const{fetchAnalyticsByPeriod:d,fetchAvailablePeriods:u}=await Promise.resolve().then(()=>k);return{fetchAnalyticsByPeriod:d,fetchAvailablePeriods:u}},void 0);s.analyticsPeriodOptions=await r(s.analyticsTab,s.analyticsPeriod),s.analyticsPeriodFilter=s.analyticsPeriodOptions[0]??"",s.analyticsPeriodRows=await l(s.analyticsTab,s.analyticsPeriod,s.analyticsPeriodFilter)}h()})}),e.querySelectorAll("[data-analytics-period]").forEach(a=>{a.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:r}=await b(async()=>{const{fetchAnalyticsByPeriod:u,fetchAvailablePeriods:p}=await Promise.resolve().then(()=>k);return{fetchAnalyticsByPeriod:u,fetchAvailablePeriods:p}},void 0),d=a.dataset.analyticsPeriod;s.analyticsPeriod=d,d==="all"?(s.analyticsPeriodRows=[],s.analyticsPeriodOptions=[],s.analyticsPeriodFilter=""):(s.analyticsPeriodOptions=await r(s.analyticsTab,d),s.analyticsPeriodFilter=s.analyticsPeriodOptions[0]??"",s.analyticsPeriodRows=await l(s.analyticsTab,d,s.analyticsPeriodFilter)),h()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async a=>{const{fetchAnalyticsByPeriod:l}=await b(async()=>{const{fetchAnalyticsByPeriod:r}=await Promise.resolve().then(()=>k);return{fetchAnalyticsByPeriod:r}},void 0);s.analyticsPeriodFilter=a.target.value,s.analyticsPeriodRows=await l(s.analyticsTab,s.analyticsPeriod,s.analyticsPeriodFilter),h()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{W(e),s.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),s.invoiceErrors={},h()}),e.querySelectorAll("[data-action='remove-line']").forEach(a=>{a.addEventListener("click",()=>{W(e);const l=parseInt(a.dataset.line??"0",10);s.invoiceForm.lines.splice(l,1),s.invoiceErrors=vs(s.invoiceForm),h()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(a=>{a.addEventListener("click",()=>{W(e),Wo(parseInt(a.dataset.line??"0",10)),s.invoiceErrors={},h()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Ko(),h()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{W(e),s.pickerMode="customer",s.pickerTargetLine=null,s.pickerQuery=s.invoiceForm.customerCode||s.invoiceForm.customerName,h()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(a=>{a.addEventListener("click",()=>{W(e);const l=parseInt(a.dataset.line??"0",10),r=s.invoiceForm.lines[l];s.pickerMode="product",s.pickerTargetLine=l,s.pickerQuery=r?r.productCode||r.productName:"",h()})}),e.querySelectorAll("[data-action='modal-close']").forEach(a=>{a.addEventListener("click",l=>{a.classList.contains("modal-backdrop")&&l.target instanceof HTMLElement&&!l.target.classList.contains("modal-backdrop")||(Xe(),h())})}),e.querySelectorAll("[data-action='picker-select']").forEach(a=>{const l=async()=>{const r=a.dataset.code??"",d=a.dataset.name??"";if(s.pickerMode==="customer"){s.invoiceForm.customerCode=r,s.invoiceForm.customerName=d,delete s.invoiceErrors.customerCode;const u=s.masterStats?.customers.find(p=>p.code===r);s.invoicePriceGroup=u?.priceGroup||"",!s.invoicePriceGroup&&r&&(s.invoicePriceGroup=await mt(r))}else if(s.pickerMode==="product"&&s.pickerTargetLine!==null){const u=s.invoiceForm.lines[s.pickerTargetLine];if(u){u.productCode=r,u.productName=d;const p=await Ka(s.invoicePriceGroup,r);p>0&&(u.unitPrice=p),u.amount=u.quantity*u.unitPrice,delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productCode`],delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productName`]}}Xe(),h()};a.addEventListener("click",l),a.addEventListener("keydown",r=>{r.key==="Enter"&&l()})}),e.querySelector("#modal-search")?.addEventListener("input",a=>{s.pickerQuery=a.target.value,h()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{hs(),h()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{fs(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{W(e),Zo(s.invoiceForm.customerCode)&&(delete s.invoiceErrors.customerCode,!s.invoicePriceGroup&&s.invoiceForm.customerCode&&(s.invoicePriceGroup=await mt(s.invoiceForm.customerCode)),h())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{W(e),er(s.invoiceForm.customerName)&&(delete s.invoiceErrors.customerCode,h())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(a=>{a.addEventListener("input",()=>{W(e),s.invoiceSavedDocNo=null;const l=a.dataset.field;(l==="quantity"||l==="unitPrice")&&h()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{W(e),s.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const a=e.querySelector("#delivery-docno")?.value??"";s.deliverySearchDocNo=a.trim(),s.deliveryNote=null,s.actionLoading=!0,h(),At(s.deliverySearchDocNo||"D240122").then(l=>{s.deliveryNote=l,s.actionLoading=!1,h()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const a=e.querySelector("#billing-month")?.value??s.billingYearMonth;s.billingYearMonth=a,s.billingSummary=null,s.actionLoading=!0,h(),Et(a).then(l=>{s.billingSummary=l,s.actionLoading=!1,h()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const a=parseInt(e.querySelector("#tax-year")?.value??String(s.taxYear),10),l=parseInt(e.querySelector("#tax-month")?.value??String(s.taxMonth),10);s.taxYear=a,s.taxMonth=l,s.taxDeclaration=null,s.actionLoading=!0,h(),Pt(a,l).then(r=>{s.taxDeclaration=r,s.actionLoading=!1,h()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxXML:a}=await b(async()=>{const{generateTaxXML:p}=await Promise.resolve().then(()=>k);return{generateTaxXML:p}},void 0),l=a(s.taxDeclaration),r=new Blob([l],{type:"application/xml;charset=utf-8"}),d=URL.createObjectURL(r),u=document.createElement("a");u.href=d,u.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.xml`,u.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxCSV:a}=await b(async()=>{const{generateTaxCSV:p}=await Promise.resolve().then(()=>k);return{generateTaxCSV:p}},void 0),l=a(s.taxDeclaration),r=new Blob([l],{type:"text/csv;charset=utf-8"}),d=URL.createObjectURL(r),u=document.createElement("a");u.href=d,u.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.csv`,u.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{saveTaxDeclaration:a}=await b(async()=>{const{saveTaxDeclaration:l}=await Promise.resolve().then(()=>k);return{saveTaxDeclaration:l}},void 0);try{await a(s.taxDeclaration),w("下書き保存しました")}catch(l){w("保存に失敗: "+(l instanceof Error?l.message:String(l)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(a=>{a.addEventListener("change",async()=>{if(!s.taxDeclaration)return;const l=Number(a.dataset.taxRow),r=a.dataset.taxField,d=a.type==="number"?Number(a.value)||0:a.value,u=[...s.taxDeclaration.rows];u[l]={...u[l],[r]:d};const{recalculateTaxDeclaration:p}=await b(async()=>{const{recalculateTaxDeclaration:y}=await Promise.resolve().then(()=>k);return{recalculateTaxDeclaration:y}},void 0);s.taxDeclaration=p({...s.taxDeclaration,rows:u}),h()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const l=Number(a.dataset.dedRow),r=a.dataset.dedField,d=a.type==="number"?Number(a.value)||0:a.value,u=[...s.taxDeclaration.deductions];u[l]={...u[l],[r]:d},s.taxDeclaration={...s.taxDeclaration,deductions:u},h()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const l=a.dataset.taxField;s.taxDeclaration={...s.taxDeclaration,[l]:a.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{recalculateTaxDeclaration:a,TAX_RATE_CATEGORIES:l}=await b(async()=>{const{recalculateTaxDeclaration:u,TAX_RATE_CATEGORIES:p}=await Promise.resolve().then(()=>k);return{recalculateTaxDeclaration:u,TAX_RATE_CATEGORIES:p}},void 0),r=l[0],d={taxCategory:r.code,taxCategoryName:r.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:r.taxRatePerLiter,taxAmount:0};s.taxDeclaration=a({...s.taxDeclaration,rows:[...s.taxDeclaration.rows,d]}),h()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(a=>{a.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const l=Number(a.dataset.taxRow),{recalculateTaxDeclaration:r}=await b(async()=>{const{recalculateTaxDeclaration:u}=await Promise.resolve().then(()=>k);return{recalculateTaxDeclaration:u}},void 0),d=s.taxDeclaration.rows.filter((u,p)=>p!==l);s.taxDeclaration=r({...s.taxDeclaration,rows:d}),h()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!s.taxDeclaration)return;const a={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};s.taxDeclaration={...s.taxDeclaration,deductions:[...s.taxDeclaration.deductions,a]},h()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(a=>{a.addEventListener("click",()=>{if(!s.taxDeclaration)return;const l=Number(a.dataset.dedRow),r=s.taxDeclaration.deductions.filter((d,u)=>u!==l);s.taxDeclaration={...s.taxDeclaration,deductions:r},h()})}),e.querySelectorAll("[data-store-tab]").forEach(a=>{a.addEventListener("click",()=>{s.storeTab=a.dataset.storeTab,h()})}),e.querySelectorAll("[data-import-entity]").forEach(a=>{a.addEventListener("click",()=>{s.importEntity=a.dataset.importEntity,s.importPreview=null,s.importResult=null,h()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const a=io(s.importEntity),l=new Blob([a],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(l),d=document.createElement("a");d.href=r,d.download=`template_${s.importEntity}.csv`,d.click(),URL.revokeObjectURL(r)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const l=e.querySelector("#import-file")?.files?.[0];if(!l){w("CSVファイルを選択してください","warning");return}const r=new FileReader;r.onload=()=>{const d=String(r.result??""),{columns:u,rows:p}=so(d);s.importPreview=no(s.importEntity,u,p),s.importResult=null,h()},r.readAsText(l,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{s.importPreview=null,s.importResult=null,h()}),e.querySelectorAll("[data-print-template]").forEach(a=>{a.addEventListener("click",()=>{s.printTemplate=a.dataset.printTemplate,h()})}),e.querySelectorAll("[data-print-field]").forEach(a=>{a.addEventListener("change",()=>{const l=a.dataset.printField;let r=a.value;(l==="taxRate"||l==="previousBalance"||l==="paymentAmount")&&(r=Number(a.value)||0),s.printData={...s.printData,[l]:r},h()})}),e.querySelectorAll("[data-print-opt]").forEach(a=>{const l=()=>{const r=a.dataset.printOpt;let d;a.type==="checkbox"?d=a.checked:r==="copies"?d=Number(a.value)||1:r==="overlayOpacity"||r==="calibrationOffsetX"||r==="calibrationOffsetY"?d=Number(a.value)||0:d=a.value,s.printOptions={...s.printOptions,[r]:d},h()};a.addEventListener("change",l),a.type==="range"&&a.addEventListener("input",l)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(a=>{a.addEventListener("change",()=>{const l=Number(a.dataset.printLine),r=a.dataset.printLfield,d=[...s.printData.lines];let u=a.value;(r==="quantity"||r==="unitPrice")&&(u=Number(a.value)||0),d[l]={...d[l],[r]:u},d[l].amount=(Number(d[l].quantity)||0)*(Number(d[l].unitPrice)||0),s.printData={...s.printData,lines:d},h()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{s.printData={...s.printData,lines:[...s.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},h()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(a=>{a.addEventListener("click",()=>{const l=Number(a.dataset.printLine);s.printData={...s.printData,lines:s.printData.lines.filter((r,d)=>d!==l)},h()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(s.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(s.printCompany)),w("印刷設定を保存しました")}catch(a){w("保存失敗: "+(a instanceof Error?a.message:String(a)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const a=s.printCompany,l=prompt("会社名",a.name);if(l===null)return;const r=prompt("郵便番号",a.postalCode)??a.postalCode,d=prompt("住所",a.address1)??a.address1,u=prompt("TEL",a.tel)??a.tel,p=prompt("FAX",a.fax)??a.fax,y=prompt("適格請求書登録番号 (T+13桁)",a.registrationNo)??a.registrationNo,v=prompt("取引銀行名",a.bankName)??a.bankName,f=prompt("支店名",a.bankBranch)??a.bankBranch,A=prompt("口座番号",a.bankAccountNo)??a.bankAccountNo,_=prompt("口座名義",a.bankAccountHolder)??a.bankAccountHolder;s.printCompany={...a,name:l,postalCode:r,address1:d,tel:u,fax:p,registrationNo:y,bankName:v,bankBranch:f,bankAccountNo:A,bankAccountHolder:_},h()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{s.fdDesignMode=!s.fdDesignMode,h()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const r=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",d=nt(a),{savePrintLayout:u}=await b(async()=>{const{savePrintLayout:y}=await Promise.resolve().then(()=>k);return{savePrintLayout:y}},void 0),p={id:`bp1701_${r.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:r,templateKey:"chain_store",positions:d};try{await u(p)?(w(`クラウド保存成功: ${r}`),s.fdSavedPositions=d,localStorage.setItem("sake_fd_positions",JSON.stringify(d)),h()):(w("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(d)))}catch(y){w("保存エラー: "+(y instanceof Error?y.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const l=nt(a);s.fdSavedPositions=l;try{localStorage.setItem("sake_fd_positions",JSON.stringify(l)),w(`ローカル保存完了: ${Object.keys(l).length}件`)}catch(r){w("保存失敗: "+(r instanceof Error?r.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const r={templateKey:"chain_store",positions:nt(a),exportedAt:new Date().toISOString()},d=new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),u=URL.createObjectURL(d),p=document.createElement("a");p.href=u,p.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,p.click(),URL.revokeObjectURL(u)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async a=>{const l=a.target.files?.[0];if(l)try{const r=await l.text(),u=JSON.parse(r).positions;if(!u)throw new Error("positions field not found");s.fdSavedPositions=u,localStorage.setItem("sake_fd_positions",JSON.stringify(u)),w(`インポート成功: ${Object.keys(u).length}件`),h()}catch(r){w("インポート失敗: "+(r instanceof Error?r.message:""),"error")}});const n=e.querySelector("#fd-saved-layouts");n&&s.route==="/form-designer"&&s.fdDesignMode&&(async()=>{const{fetchPrintLayouts:a}=await b(async()=>{const{fetchPrintLayouts:r}=await Promise.resolve().then(()=>k);return{fetchPrintLayouts:r}},void 0),l=await a("chain_store");l.length===0?n.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(n.innerHTML=`☁️ クラウド保存済み (${l.length}件):<br/>`+l.map(r=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${r.id}" style="margin:4px 4px 0 0;">${r.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${r.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),n.querySelectorAll("[data-action='fd-load-layout']").forEach(r=>{r.addEventListener("click",()=>{const d=r.dataset.layoutId,u=l.find(p=>p.id===d);u&&(s.fdSavedPositions=u.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(u.positions)),w(`読込完了: ${u.name}`),h())})}),n.querySelectorAll("[data-action='fd-delete-layout']").forEach(r=>{r.addEventListener("click",async()=>{const d=r.dataset.layoutId;if(!d||!await Z("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:u}=await b(async()=>{const{deletePrintLayout:y}=await Promise.resolve().then(()=>k);return{deletePrintLayout:y}},void 0);await u(d)?(w("削除しました"),h()):w("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await Z("フィールド位置を初期値に戻しますか？")&&(s.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),h())});const i=e.querySelector("#fd-sel-x"),o=e.querySelector("#fd-sel-y");[i,o].forEach(a=>{a?.addEventListener("change",()=>{if(!s.fdActiveFieldId)return;const l=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);l&&(i&&(l.style.left=i.value+"mm"),o&&(l.style.top=o.value+"mm"))})});const c=e.querySelector("#customer-map");c&&s.route==="/map"&&_s(c),e.querySelectorAll(".wf-card").forEach(a=>{a.addEventListener("dragstart",l=>{a.classList.add("wf-dragging"),l.dataTransfer?.setData("text/plain",a.dataset.wfOrder??"")}),a.addEventListener("dragend",()=>a.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(a=>{a.addEventListener("dragover",l=>l.preventDefault()),a.addEventListener("drop",l=>{l.preventDefault();const r=l.dataTransfer?.getData("text/plain"),d=a.dataset.wfStage;if(!r||!d)return;const u=s.workflowOrders.find(p=>p.id===r);u&&(u.stage=d,h())})}),e.querySelectorAll("[data-mo-step]").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.moStep;a.disabled||(s.mobileOrder.step=l,h())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",a=>{s.mobileOrder.customerQuery=a.target.value,h()}),e.querySelector("#mo-product-q")?.addEventListener("input",a=>{s.mobileOrder.productQuery=a.target.value,h()}),e.querySelectorAll("[data-mo-select-customer]").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.moSelectCustomer,r=s.masterStats?.customers.find(d=>d.id===l);r&&(s.mobileOrder.selectedCustomer=r),h()})}),e.querySelectorAll("[data-mo-add-product]").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.moAddProduct,r=s.masterStats?.products.find(u=>u.code===l);if(!r)return;const d=1800;s.mobileOrder.cart.push({productCode:r.code,productName:r.name,quantity:1,unit:"本",unitPrice:d,amount:d}),h()})}),e.querySelectorAll("[data-mo-qty]").forEach(a=>{a.addEventListener("click",()=>{const l=Number(a.dataset.moQty),r=a.dataset.moProduct,d=s.mobileOrder.cart.find(u=>u.productCode===r);d&&(d.quantity=Math.max(0,d.quantity+l),d.amount=d.quantity*d.unitPrice,d.quantity===0&&(s.mobileOrder.cart=s.mobileOrder.cart.filter(u=>u.productCode!==r)),h())})}),e.querySelectorAll("[data-mo-remove]").forEach(a=>{a.addEventListener("click",()=>{const l=Number(a.dataset.moRemove);s.mobileOrder.cart.splice(l,1),h()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const a=e.querySelector("#mo-memo");s.mobileOrder.memo=a?.value??"";const l="MO"+Date.now().toString().slice(-8);s.mobileOrder.submittedDocNo=l,s.mobileOrder.step="done",h()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{s.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},h()}),e.querySelectorAll("[data-tour-id]").forEach(a=>{a.addEventListener("click",()=>{s.tourActiveId=a.dataset.tourId??null,h()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(a=>{a.addEventListener("click",()=>{const l=s.tourInquiries.find(y=>y.id===s.tourActiveId);if(!l)return;const r=a.dataset.template==="confirm"?Ll:Il,d=e.querySelector("#tour-confirmed-time"),u=r.replaceAll("{name}",l.name).replaceAll("{partySize}",String(l.partySize)).replaceAll("{confirmedTime}",d?.value??l.visitDate),p=e.querySelector("#tour-reply-body");p&&(p.value=u)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const a=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",l=s.tourInquiries.find(d=>d.id===a);if(!l)return;const r=e.querySelector("#tour-confirmed-time");l.status="confirmed",l.repliedAt=new Date().toISOString(),l.confirmedTime=r?.value??"",w("返信メールを下書き保存し、ステータスを確定にしました"),h()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const a=e.querySelector("#lb-type")?.value??"",l=e.querySelector("#lb-area")?.value??"",r=e.querySelector("#lb-keyword")?.value??"";if(!a&&!r){w("業種かキーワードを入力してください","warning");return}s.leadSearchType=a,s.leadSearchArea=l,s.leadSearchQuery=r,s.leadSearching=!0,h();const d=s.integrations.find(v=>v.provider==="google_maps");if(!d||!d.config.api_key){w("Google Maps APIキーが /integrations で未設定です","warning"),s.leadSearching=!1,h();return}const{searchPlaces:u}=await b(async()=>{const{searchPlaces:v}=await Promise.resolve().then(()=>k);return{searchPlaces:v}},void 0),p=[a,r].filter(Boolean).join(" "),y=await u(d,p,l);s.leadSearching=!1,y.error?w("検索失敗: "+y.error,"error"):s.leadSearchResults=y.results,h()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{s.leadSearchResults=[],h()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(s.leadSearchResults.length===0)return;const a=prompt("リスト名を入力:",`${s.leadSearchType} ${s.leadSearchArea}`);if(!a)return;const l=`ll_${Date.now()}`,r={id:l,name:a,query:s.leadSearchQuery,area:s.leadSearchArea,businessType:s.leadSearchType,totalCount:s.leadSearchResults.length,source:"google_places"},{saveLeadList:d,saveLeadItem:u,fetchLeadLists:p,fetchLeadItems:y}=await b(async()=>{const{saveLeadList:A,saveLeadItem:_,fetchLeadLists:g,fetchLeadItems:q}=await Promise.resolve().then(()=>k);return{saveLeadList:A,saveLeadItem:_,fetchLeadLists:g,fetchLeadItems:q}},void 0);await d(r);const v=e.querySelectorAll(".lb-search-check:checked"),f=Array.from(v).map(A=>Number(A.dataset.idx));for(const A of f){const _=s.leadSearchResults[A];_&&await u({..._,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:l,businessType:s.leadSearchType})}s.leadLists=await p(),s.leadActiveListId=l,s.leadItems=await y(l),s.leadSearchResults=[],w(`${f.length}件を「${a}」として保存しました`),h()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(a=>{a.addEventListener("click",async()=>{const l=a.dataset.id??null;if(s.leadActiveListId=l,l){const{fetchLeadItems:r}=await b(async()=>{const{fetchLeadItems:d}=await Promise.resolve().then(()=>k);return{fetchLeadItems:d}},void 0);s.leadItems=await r(l)}h()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(a=>{a.addEventListener("click",async()=>{const l=a.dataset.id??"",r=s.leadItems.find(p=>p.id===l);if(!r)return;const{saveLeadItem:d,fetchLeadItems:u}=await b(async()=>{const{saveLeadItem:p,fetchLeadItems:y}=await Promise.resolve().then(()=>k);return{saveLeadItem:p,fetchLeadItems:y}},void 0);await d({...r,status:"excluded"}),s.leadActiveListId&&(s.leadItems=await u(s.leadActiveListId)),h()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(a=>{a.addEventListener("click",async()=>{const l=a.dataset.id??"",r=s.leadItems.find(y=>y.id===l);if(!r)return;const{convertLeadToProspect:d,fetchLeadItems:u}=await b(async()=>{const{convertLeadToProspect:y,fetchLeadItems:v}=await Promise.resolve().then(()=>k);return{convertLeadToProspect:y,fetchLeadItems:v}},void 0);await d(r)&&(w("見込客に追加しました: "+r.companyName),s.leadActiveListId&&(s.leadItems=await u(s.leadActiveListId)),h())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const a=e.querySelectorAll(".lb-item-check:checked");if(a.length===0&&!await Z("全ての新規アイテムを見込客に変換しますか？"))return;const l=a.length>0?Array.from(a).map(p=>p.dataset.id):s.leadItems.filter(p=>p.status==="new").map(p=>p.id),{convertLeadToProspect:r,fetchLeadItems:d}=await b(async()=>{const{convertLeadToProspect:p,fetchLeadItems:y}=await Promise.resolve().then(()=>k);return{convertLeadToProspect:p,fetchLeadItems:y}},void 0);let u=0;for(const p of l){const y=s.leadItems.find(v=>v.id===p);y&&y.status==="new"&&await r(y)&&u++}w(`${u}件を見込客に変換しました`),s.leadActiveListId&&(s.leadItems=await d(s.leadActiveListId)),h()}),e.querySelectorAll("[data-map-filter]").forEach(a=>{a.addEventListener("change",()=>{const l=a.dataset.mapFilter;let r;a.type==="checkbox"?r=a.checked:r=a.value,s.mapFilters={...s.mapFilters,[l]:r},h()})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const a=s.integrations.find(u=>u.provider==="ivry");if(!a||!a.isEnabled){w("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:l,fetchCallLogs:r}=await b(async()=>{const{syncIvryCallLogs:u,fetchCallLogs:p}=await Promise.resolve().then(()=>k);return{syncIvryCallLogs:u,fetchCallLogs:p}},void 0),d=await l(a);d.error?w("同期失敗: "+d.error,"error"):(w(`${d.count}件の通話履歴を同期しました`),s.callLogs=await r(100),h())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const a=s.integrations.find(u=>u.provider==="ivry");if(!a||!a.isEnabled){w("IVRy連携が無効です","warning");return}if(!await Z("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:l}=await b(async()=>{const{syncPhoneBookToIvry:u}=await Promise.resolve().then(()=>k);return{syncPhoneBookToIvry:u}},void 0),r=[];s.masterStats?.customers.forEach(u=>{r.push({name:u.name,phone:"",customerCode:u.code,note:"既存取引先"})}),s.prospects.forEach(u=>{u.phone&&r.push({name:u.companyName,phone:u.phone,customerCode:u.id,note:`見込客 (${u.stage})`})});const d=await l(a,r);d.error?w("送信失敗: "+d.error,"error"):w(`${d.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(a=>{a.addEventListener("click",async()=>{const l=a.dataset.id??"",r=a.dataset.phone??"",d=prompt(`電話番号 ${r} を顧客コードに紐付け
顧客コードを入力:`);if(!d)return;const u=s.callLogs.find(v=>v.id===l);if(!u)return;const{saveCallLog:p,fetchCallLogs:y}=await b(async()=>{const{saveCallLog:v,fetchCallLogs:f}=await Promise.resolve().then(()=>k);return{saveCallLog:v,fetchCallLogs:f}},void 0);await p({...u,matchedCustomerCode:d}),s.callLogs=await y(100),h()})}),e.querySelectorAll("[data-action='call-memo']").forEach(a=>{a.addEventListener("click",async()=>{const l=a.dataset.id??"",r=s.callLogs.find(y=>y.id===l);if(!r)return;const d=prompt("メモを入力:",r.notes??"");if(d===null)return;const{saveCallLog:u,fetchCallLogs:p}=await b(async()=>{const{saveCallLog:y,fetchCallLogs:v}=await Promise.resolve().then(()=>k);return{saveCallLog:y,fetchCallLogs:v}},void 0);await u({...r,notes:d}),s.callLogs=await p(100),h()})}),e.querySelectorAll("[data-prospect-view]").forEach(a=>{a.addEventListener("click",()=>{s.prospectViewMode=a.dataset.prospectView,h()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{s.prospectEditingId="__new__",h()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(a=>{a.addEventListener("click",async()=>{const l=a.dataset.id??null;if(s.prospectEditingId=l,l){const{fetchProspectActivities:r}=await b(async()=>{const{fetchProspectActivities:d}=await Promise.resolve().then(()=>k);return{fetchProspectActivities:d}},void 0);s.prospectActivities=await r(l)}h()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(a=>{a.addEventListener("click",async()=>{const l=a.dataset.prospectId??null;if(s.prospectEditingId=l,l){const{fetchProspectActivities:r}=await b(async()=>{const{fetchProspectActivities:d}=await Promise.resolve().then(()=>k);return{fetchProspectActivities:d}},void 0);s.prospectActivities=await r(l)}h()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(a=>{a.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(s.prospectEditingId=null,s.prospectActivities=[],h())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const a=s.prospectEditingId==="__new__",l=a?`p_${Date.now()}`:s.prospectEditingId??"",r={id:l,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!r.companyName){w("会社名は必須です","warning");return}const{saveProspect:d,fetchProspects:u,recordAudit:p,sendSlackNotification:y}=await b(async()=>{const{saveProspect:f,fetchProspects:A,recordAudit:_,sendSlackNotification:g}=await Promise.resolve().then(()=>k);return{saveProspect:f,fetchProspects:A,recordAudit:_,sendSlackNotification:g}},void 0);await d(r)?(a&&await y("new_prospect",`新規見込客: ${r.companyName} / 想定 ¥${r.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await p({action:a?"prospect_create":"prospect_update",entityType:"prospect",entityId:l,userEmail:s.user?.email}),s.prospects=await u(),s.prospectEditingId=null,h()):w("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await Z("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=a.dataset.id??"",{deleteProspect:r,fetchProspects:d}=await b(async()=>{const{deleteProspect:u,fetchProspects:p}=await Promise.resolve().then(()=>k);return{deleteProspect:u,fetchProspects:p}},void 0);await r(l)&&(s.prospects=await d(),h())})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",l=e.querySelector("#prospect-activity-type")?.value??"call",r=e.querySelector("#prospect-activity-title")?.value??"";if(!r){w("内容を入力してください","warning");return}const{saveProspectActivity:d,fetchProspectActivities:u}=await b(async()=>{const{saveProspectActivity:p,fetchProspectActivities:y}=await Promise.resolve().then(()=>k);return{saveProspectActivity:p,fetchProspectActivities:y}},void 0);await d({id:`act_${Date.now()}`,prospectId:a,activityType:l,title:r,activityDate:new Date().toISOString(),staffCode:s.myProfile?.staffCode}),s.prospectActivities=await u(a),h()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(a=>{a.addEventListener("dragstart",l=>{l.dataTransfer?.setData("text/plain",a.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(a=>{a.addEventListener("dragover",l=>l.preventDefault()),a.addEventListener("drop",async l=>{l.preventDefault();const r=l.dataTransfer?.getData("text/plain"),d=a.dataset.prospectStage;if(!r)return;const u=s.prospects.find(p=>p.id===r);if(u&&u.stage!==d){const p={...u,stage:d},{saveProspect:y}=await b(async()=>{const{saveProspect:v}=await Promise.resolve().then(()=>k);return{saveProspect:v}},void 0);await y(p),u.stage=d,h()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:a,saveIntegrationSetting:l}=await b(async()=>{const{fetchIntegrationSettings:v,saveIntegrationSetting:f}=await Promise.resolve().then(()=>k);return{fetchIntegrationSettings:v,saveIntegrationSetting:f}},void 0),d=(s.integrations.length>0?s.integrations:await a()).find(v=>v.provider==="slack");if(!d)return;const u=e.querySelector("#slack-webhook")?.value??"",p=e.querySelector("#slack-default-channel")?.value??"",y=e.querySelector("#slack-enabled")?.checked??!1;await l({...d,config:{...d.config,webhook_url:u,default_channel:p},isEnabled:y}),s.integrations=await a(),w("保存しました"),h()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:a,fetchSlackRules:l}=await b(async()=>{const{saveSlackRule:r,fetchSlackRules:d}=await Promise.resolve().then(()=>k);return{saveSlackRule:r,fetchSlackRules:d}},void 0);for(const r of s.slackRules){const d=e.querySelector(`[data-slack-rule-id="${r.id}"][data-slack-field="enabled"]`)?.checked??r.enabled,u=e.querySelector(`[data-slack-rule-id="${r.id}"][data-slack-field="channel"]`)?.value??r.channel;await a({...r,enabled:d,channel:u})}s.slackRules=await l(),w("ルールを保存しました"),h()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:a}=await b(async()=>{const{sendSlackNotification:r}=await Promise.resolve().then(()=>k);return{sendSlackNotification:r}},void 0),l=await a("new_order","🧪 これはテスト通知です (syusen-cloud)");l.ok?w("テスト送信成功"):w("送信失敗: "+(l.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{s.materialEditing=null,s.materialEditingIsNew=!0,h()}),e.querySelectorAll("[data-action='material-adjust']").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.id??"",r=s.materialList.find(d=>d.id===l);r&&(s.materialEditing=r,s.materialEditingIsNew=!1,h())})}),e.querySelectorAll("[data-action='material-close']").forEach(a=>{a.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(s.materialEditing=null,s.materialEditingIsNew=!1,h())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const l={id:s.materialEditingIsNew?`mat_${Date.now()}`:s.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(l.materialType=e.querySelector("#mat-type")?.value??"",!l.code||!l.name){w("コードと品名は必須です","warning");return}const{saveMaterial:r,fetchMaterialList:d}=await b(async()=>{const{saveMaterial:p,fetchMaterialList:y}=await Promise.resolve().then(()=>k);return{saveMaterial:p,fetchMaterialList:y}},void 0);await r(l)?(s.materialList=await d(),s.materialEditing=null,s.materialEditingIsNew=!1,w("保存しました"),h()):w("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!a||!await Z("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:l,fetchMaterialList:r}=await b(async()=>{const{deleteMaterial:d,fetchMaterialList:u}=await Promise.resolve().then(()=>k);return{deleteMaterial:d,fetchMaterialList:u}},void 0);await l(a)&&(s.materialList=await r(),s.materialEditing=null,h())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{s.userEditingId="__new__",h()}),e.querySelectorAll("[data-action='user-edit']").forEach(a=>{a.addEventListener("click",()=>{s.userEditingId=a.dataset.id??null,h()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{s.userEditingId=null,h()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const a=s.userEditingId==="__new__",l=a?crypto.randomUUID():s.userEditingId??"",r=e.querySelector("#user-email")?.value.trim()??"",d=e.querySelector("#user-name")?.value.trim()??"";if(!r||!d){w("名前とメールアドレスは必須です","warning");return}const u={id:l,email:r,displayName:d,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(a){const A=e.querySelector("#user-password")?.value??"";if(A.length<8){w("パスワードは8文字以上必要です","warning");return}try{await jt(r,A)}catch(_){w("Auth登録失敗: "+(_ instanceof Error?_.message:""),"error");return}}const{saveUserProfile:p,fetchUserProfiles:y,recordAudit:v}=await b(async()=>{const{saveUserProfile:A,fetchUserProfiles:_,recordAudit:g}=await Promise.resolve().then(()=>k);return{saveUserProfile:A,fetchUserProfiles:_,recordAudit:g}},void 0);await p(u)?(await v({action:a?"user_create":"user_update",entityType:"user",entityId:l,userEmail:s.user?.email}),s.userProfiles=await y(),s.userEditingId=null,w("保存しました"),h()):w("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await Z("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=a.dataset.id??"",{deleteUserProfile:r,fetchUserProfiles:d,recordAudit:u}=await b(async()=>{const{deleteUserProfile:y,fetchUserProfiles:v,recordAudit:f}=await Promise.resolve().then(()=>k);return{deleteUserProfile:y,fetchUserProfiles:v,recordAudit:f}},void 0);await r(l)?(await u({action:"user_delete",entityType:"user",entityId:l,userEmail:s.user?.email}),s.userProfiles=await d(),h()):w("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!s.myProfile)return;const a=e.querySelector("#profile-sender")?.value??"",l={...s.myProfile,defaultMailSenderId:a},{saveUserProfile:r}=await b(async()=>{const{saveUserProfile:d}=await Promise.resolve().then(()=>k);return{saveUserProfile:d}},void 0);await r(l),s.myProfile=l,w("保存しました"),h()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const a=e.querySelector("#profile-new-password")?.value??"";if(a.length<8){w("8文字以上のパスワードを入力してください","warning");return}try{await Ps(a),w("パスワードを変更しました")}catch(l){w("変更失敗: "+(l instanceof Error?l.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(a=>{a.addEventListener("click",()=>{s.integrationEditingId=a.dataset.id??null,h()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{s.integrationEditingId=null,h()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='int-save']")?.dataset.id??"",l=s.integrations.find(v=>v.id===a);if(!l)return;const r={...l.config};Object.keys(r).forEach(v=>{const f=e.querySelector(`#int-${v}`);f&&(r[v]=f.value)});const d=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:u,fetchIntegrationSettings:p}=await b(async()=>{const{saveIntegrationSetting:v,fetchIntegrationSettings:f}=await Promise.resolve().then(()=>k);return{saveIntegrationSetting:v,fetchIntegrationSettings:f}},void 0);await u({...l,config:r,isEnabled:d})?(s.integrations=await p(),s.integrationEditingId=null,w("保存しました"),h()):w("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(a=>{a.addEventListener("click",async()=>{const l=s.integrations.find(p=>p.provider==="shopify");if(!l){w("Shopify連携が未設定です","warning");return}a.textContent="同期中…",a.disabled=!0;const{syncShopifyOrders:r,fetchShopifyOrders:d}=await b(async()=>{const{syncShopifyOrders:p,fetchShopifyOrders:y}=await Promise.resolve().then(()=>k);return{syncShopifyOrders:p,fetchShopifyOrders:y}},void 0),u=await r(l);u.error?w("同期失敗: "+u.error,"error"):(w(`${u.count}件を同期しました`),s.shopifyOrders=await d()),h()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(a=>{a.addEventListener("click",async()=>{const l=s.integrations.find(p=>p.provider==="google_calendar");if(!l)return;a.textContent="同期中…",a.disabled=!0;const{syncGoogleCalendar:r,fetchCalendarEvents:d}=await b(async()=>{const{syncGoogleCalendar:p,fetchCalendarEvents:y}=await Promise.resolve().then(()=>k);return{syncGoogleCalendar:p,fetchCalendarEvents:y}},void 0),u=await r(l);u.error?w("同期失敗: "+u.error,"error"):(w(`${u.count}件を同期しました`),s.calendarEvents=await d(s.calendarYearMonth)),h()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const l=e.querySelector("#fax-file")?.files?.[0];if(!l){w("FAX画像を選択してください","warning");return}const r=s.integrations.find(d=>d.provider==="cloud_vision");if(!r||!r.config.api_key){w("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}s.faxProcessing=!0,s.faxOcrText=null,h();try{const d=new FileReader;d.onload=async()=>{const u=String(d.result??""),{ocrFaxImage:p,saveFaxRecord:y,fetchFaxInbox:v}=await b(async()=>{const{ocrFaxImage:g,saveFaxRecord:q,fetchFaxInbox:N}=await Promise.resolve().then(()=>k);return{ocrFaxImage:g,saveFaxRecord:q,fetchFaxInbox:N}},void 0),f=await p(r,u),A=e.querySelector("#fax-sender-name")?.value??"",_=e.querySelector("#fax-sender-phone")?.value??"";await y({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:A,senderPhone:_,ocrStatus:f.error?"failed":"done",ocrText:f.text}),s.faxOcrText=f.error?`エラー: ${f.error}`:f.text,s.faxRecords=await v(),s.faxProcessing=!1,h()},d.readAsDataURL(l)}catch(d){w("OCR失敗: "+(d instanceof Error?d.message:""),"error"),s.faxProcessing=!1,h()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{s.mailSenderEditingId="__new__",h()}),e.querySelectorAll("[data-action='ms-edit']").forEach(a=>{a.addEventListener("click",()=>{s.mailSenderEditingId=a.dataset.id??null,h()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{s.mailSenderEditingId=null,h()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,l={id:a,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:s.mailSenders.find(p=>p.id===a)?.isVerified??!1};if(!l.name||!l.email){w("名前とメールアドレスは必須です","warning");return}const{saveMailSender:r,fetchMailSenders:d}=await b(async()=>{const{saveMailSender:p,fetchMailSenders:y}=await Promise.resolve().then(()=>k);return{saveMailSender:p,fetchMailSenders:y}},void 0);await r(l)?(s.mailSenders=await d(),s.mailSenderEditingId=null,w("保存しました"),h()):w("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await Z("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=a.dataset.id??"",{deleteMailSender:r,fetchMailSenders:d}=await b(async()=>{const{deleteMailSender:p,fetchMailSenders:y}=await Promise.resolve().then(()=>k);return{deleteMailSender:p,fetchMailSenders:y}},void 0);await r(l)?(s.mailSenders=await d(),h()):w("削除失敗","error")})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(a=>{a.addEventListener("click",async()=>{s.calendarYearMonth=a.dataset.ym??s.calendarYearMonth;const{fetchCalendarEvents:l}=await b(async()=>{const{fetchCalendarEvents:r}=await Promise.resolve().then(()=>k);return{fetchCalendarEvents:r}},void 0);s.calendarEvents=await l(s.calendarYearMonth),h()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async a=>{s.calendarYearMonth=a.target.value;const{fetchCalendarEvents:l}=await b(async()=>{const{fetchCalendarEvents:r}=await Promise.resolve().then(()=>k);return{fetchCalendarEvents:r}},void 0);s.calendarEvents=await l(s.calendarYearMonth),h()}),e.querySelector("#cal-filter-category")?.addEventListener("change",a=>{s.calendarFilterCategory=a.target.value,h()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const a=new Date;s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(a.getTime()+3600*1e3).toISOString(),isAllDay:!1}},h()}),e.querySelectorAll("[data-cal-date]").forEach(a=>{a.tagName!=="BUTTON"&&a.addEventListener("click",l=>{if(l.target.closest(".cal-event"))return;const r=a.dataset.calDate??"";s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${r}T10:00:00`,isAllDay:!1}},h()})}),e.querySelectorAll("[data-cal-event-id]").forEach(a=>{a.addEventListener("click",l=>{l.stopPropagation();const r=a.dataset.calEventId,d=s.calendarEvents.find(u=>u.id===r);d&&(s.calendarEdit={isOpen:!0,isNew:!1,event:{...d}},h())})}),e.querySelectorAll("[data-action='cal-close']").forEach(a=>{a.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(s.calendarEdit=null,h())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!s.calendarEdit)return;const{saveCalendarEvent:a,fetchCalendarEvents:l,CALENDAR_CATEGORY_COLORS:r}=await b(async()=>{const{saveCalendarEvent:v,fetchCalendarEvents:f,CALENDAR_CATEGORY_COLORS:A}=await Promise.resolve().then(()=>k);return{saveCalendarEvent:v,fetchCalendarEvents:f,CALENDAR_CATEGORY_COLORS:A}},void 0),d=document.querySelector("[data-action='cal-save']")?.dataset.id||s.calendarEdit.event.id||`evt_${Date.now()}`,u=e.querySelector("#cal-category")?.value??"general",p={id:d,title:e.querySelector("#cal-title")?.value??"",category:u,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:r[u]};if(!p.title){w("タイトルは必須です","warning");return}await a(p)?(s.calendarEvents=await l(s.calendarYearMonth),s.calendarEdit=null,w("保存しました"),h()):w("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!a||!await Z("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:l,fetchCalendarEvents:r}=await b(async()=>{const{deleteCalendarEvent:u,fetchCalendarEvents:p}=await Promise.resolve().then(()=>k);return{deleteCalendarEvent:u,fetchCalendarEvents:p}},void 0);await l(a)?(s.calendarEvents=await r(s.calendarYearMonth),s.calendarEdit=null,w("削除しました"),h()):w("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(s.importPreview){s.importing=!0,h();try{const a=s.importPreview.rows.filter(r=>r._valid),l=await lo(s.importEntity,a);s.importResult=`取り込み完了: ${l.inserted}件成功 / ${l.failed}件失敗`,s.importPreview=null}catch(a){s.importResult=`エラー: ${a instanceof Error?a.message:String(a)}`}finally{s.importing=!1,h()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const a=e.querySelector("#store-date")?.value??s.storeSalesDate;s.storeSalesDate=a,s.storeSales=[],s.actionLoading=!0,h(),Ct(a).then(l=>{s.storeSales=l,s.actionLoading=!1,h()})}),e.querySelectorAll("[data-action='copy-config']").forEach(a=>{a.addEventListener("click",async()=>{const l=a.dataset.configValue??"";if(l)try{await navigator.clipboard.writeText(l),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(r){console.warn("Clipboard copy failed",r)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const l=JSON.stringify({supabase_url:J,supabase_anon_key:F,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),r=new Blob([l],{type:"application/json;charset=utf-8"}),d=URL.createObjectURL(r),u=document.createElement("a");u.href=d,u.download="relay_config.json",u.click(),URL.revokeObjectURL(d)}),e.querySelectorAll("[data-action='copy-code']").forEach(a=>{a.addEventListener("click",async()=>{const l=a.dataset.code??"";if(l)try{await navigator.clipboard.writeText(decodeURIComponent(l)),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(r){console.warn("Clipboard code copy failed",r)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(a=>{a.addEventListener("change",()=>{re(e),s.emailSaveMessage=null,h()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(a=>{a.addEventListener("change",()=>{re(e),s.emailSaveMessage=null,h()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{re(e),s.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{re(e),s.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(a=>{a.addEventListener("click",()=>{s.emailTemplateId=a.dataset.templateId??"custom";const l=ms(s.emailTemplateId);s.emailSubject=l.subject,s.emailBody=l.body,s.emailSaveMessage=null,h()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{re(e);const a=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;s.emailBody.includes("https://kaneishuzo.co.jp/products")||(s.emailBody=`${s.emailBody.trimEnd()}${a}`),s.emailSaveMessage=null,h()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{re(e),s.actionLoading=!0,h(),ze(ct("draft")).then(a=>{s.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(a.updatedAt??new Date().toISOString()))}`,s.actionLoading=!1,h()})}),e.querySelector("#email-sender")?.addEventListener("change",a=>{s.emailSenderId=a.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{re(e),s.actionLoading=!0,s.emailSending=!0,h();const a=ct("sent");s.mailSenders.find(l=>l.id===s.emailSenderId),Ja().then(async l=>{await ze({...a,recipientCount:l.sent}),s.emailSaveMessage=`${l.sent.toLocaleString("ja-JP")} 件送信しました。`,s.actionLoading=!1,s.emailSending=!1,h(),w(`${l.sent}件送信完了`)}).catch(async()=>{await ze(ct("draft")),s.emailSaveMessage="APIキー未設定のため下書きを保存しました。",s.actionLoading=!1,s.emailSending=!1,h(),w("APIキー未設定のため下書き保存しました","warning")})})}function h(){const e=document.querySelector("#app");if(!e)return;e.innerHTML=ir(),rr(e),s.pickerMode&&e.querySelector("#modal-search")?.focus(),s.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),qt()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const n of["fd-scaler","print-scaler"]){const i=e.querySelector(`#${n}`),o=i?.querySelector(".fd-canvas, .print-preview"),c=o?.querySelector(".print-page")??o;if(!i||!c)continue;const a=i.parentElement?.clientWidth??0,l=c.offsetWidth;if(a>0&&l>0&&l>a-24){const r=(a-24)/l;i.style.transform=`scale(${r})`,i.style.transformOrigin="top left",i.style.height=`${(c.offsetHeight+48)*r}px`}else i.style.transform="",i.style.height=""}});const t=s.sidebarOpen||s.pickerMode!==null||s.globalSearchOpen;document.body.style.overflow=t?"hidden":"",document.body.style.touchAction=t?"none":""}const $s="sake-cloud-cache",cr=1800*1e3;function dr(){try{const e={ts:Date.now(),salesSummary:s.salesSummary,paymentStatus:s.paymentStatus,masterStats:s.masterStats,pipelineMeta:s.pipelineMeta,salesAnalytics:s.salesAnalytics};localStorage.setItem($s,JSON.stringify(e))}catch{}}function ur(){try{const e=localStorage.getItem($s);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>cr?!1:(t.salesSummary&&(s.salesSummary=t.salesSummary),t.paymentStatus&&(s.paymentStatus=t.paymentStatus),t.masterStats&&(s.masterStats=t.masterStats),t.pipelineMeta&&(s.pipelineMeta=t.pipelineMeta),t.salesAnalytics&&(s.salesAnalytics=t.salesAnalytics),!0)}catch{return!1}}async function Ee(){const e=ur();e&&(s.loading=!1,h()),s.loading=!e,e||h();try{const[t,n,i,o,c,a,l,r]=await Promise.all([fa(),ba(),Je(),ga(),Ue(s.invoiceFilter),xt(s.ledgerCustomerCode),_a(),$a()]);if(s.salesSummary=t,s.paymentStatus=n,s.masterStats=i,s.pipelineMeta=o,s.invoiceRecords=c,s.customerLedger=a,s.salesAnalytics=l,s.syncDashboard=r,Sa().then(d=>{s.announcements=d,h()}),ve.length===0&&Vo(),s.rawTableList.length===0&&Wa().then(d=>{s.rawTableList=d,s.route==="/raw-browser"&&h()}),!s.salesFilter.startDate||!s.salesFilter.endDate){const u=[...t.salesRecords].sort((v,f)=>new Date(f.date).getTime()-new Date(v.date).getTime())[0]?.date??new Date().toISOString(),p=new Date(u),y=new Date(p);y.setDate(p.getDate()-30),s.salesFilter={startDate:da(y.toISOString()),endDate:da(p.toISOString())}}(!s.invoiceFilter.startDate||!s.invoiceFilter.endDate)&&(s.invoiceFilter={...s.invoiceFilter,startDate:s.salesFilter.startDate,endDate:s.salesFilter.endDate},s.invoiceRecords=await Ue(s.invoiceFilter)),s.error=null,dr()}catch(t){e||(s.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{s.loading=!1,h(),Rt(s.route)}}window.addEventListener("popstate",()=>{s.route=ys(location.pathname),s.currentCategory=Nt(s.route),s.sidebarOpen=!1,Pe(),Rt(s.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),s.globalSearchOpen=!0,h();return}if(e.key==="Escape"){if(s.globalSearchOpen){Pe(),h();return}if(s.pickerMode){Xe(),h();return}s.route==="/invoice-entry"&&!s.invoiceSaving&&(hs(),h());return}if(s.route==="/invoice-entry"&&!s.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&fs(t)}});s.user=We()?Es():null;s.user?.email&&(async()=>{const{fetchMyProfile:e}=await b(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>k);return{fetchMyProfile:t}},void 0);s.myProfile=await e(s.user.email),h()})();try{const e=localStorage.getItem("sake_print_options");e&&(s.printOptions={...s.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(s.printCompany={...s.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(s.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,i=0,o=0,c=0,a=1;document.addEventListener("mousedown",l=>{const r=l.target.closest(".fd-draggable");if(!r||!s.fdDesignMode)return;l.preventDefault();const d=r.closest(".fd-canvas");if(!d)return;const u=d.getBoundingClientRect();if(u.width===0)return;a=228.6/u.width,t=r,n=l.clientX,i=l.clientY,o=parseFloat(r.style.left)||0,c=parseFloat(r.style.top)||0,document.querySelectorAll(".fd-active").forEach(f=>f.classList.remove("fd-active")),r.classList.add("fd-active","fd-dragging"),s.fdActiveFieldId=r.dataset.fdId??null;const p=document.querySelector("#fd-selected-info");p&&(p.textContent=`選択中: ${r.title}`);const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(o)),v&&(v.value=String(c))}),document.addEventListener("mousemove",l=>{if(!t)return;const r=(l.clientX-n)*a,d=(l.clientY-i)*a,u=Math.round((o+r)*2)/2,p=Math.round((c+d)*2)/2;t.style.left=u+"mm",t.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),v&&(v.value=String(p))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",l=>{if(!s.fdDesignMode||!s.fdActiveFieldId||l.key!=="ArrowLeft"&&l.key!=="ArrowRight"&&l.key!=="ArrowUp"&&l.key!=="ArrowDown"||l.target.tagName==="INPUT"||l.target.tagName==="TEXTAREA")return;const r=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);if(!r)return;l.preventDefault();const d=.5;let u=parseFloat(r.style.left)||0,p=parseFloat(r.style.top)||0;l.key==="ArrowLeft"?u-=d:l.key==="ArrowRight"?u+=d:l.key==="ArrowUp"?p-=d:l.key==="ArrowDown"&&(p+=d),r.style.left=u+"mm",r.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),v=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),v&&(v.value=String(p))})})();function _s(e){const t=window.google?.maps;if(!t){e.innerHTML='<div style="padding:40px;text-align:center;color:var(--text-secondary);">Google Maps 読込中…</div>',setTimeout(()=>_s(e),500);return}e.innerHTML="";const n=new t.Map(e,{center:{lat:35.45,lng:139.4},zoom:10,mapId:"sake-system-map",gestureHandling:"greedy"}),i=new t.InfoWindow;function o(c,a,l,r,d){const u=new t.marker.AdvancedMarkerElement({map:n,position:{lat:c,lng:a},content:(()=>{const p=document.createElement("div");return p.style.cssText=`background:${l};color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-weight:700;font-size:11px;cursor:pointer;`,p.textContent=r,p})()});u.addListener("click",()=>{i.setContent(d),i.open({anchor:u,map:n})})}s.mapFilters.showCustomers&&(s.masterStats?.customers??[]).forEach(a=>{!a.lat||!a.lng||s.mapFilters.filterBusinessType&&a.businessType!==s.mapFilters.filterBusinessType||o(a.lat,a.lng,"#2196F3","既",`<div style="min-width:180px;"><strong>${a.name}</strong><br/><span style="color:#666;font-size:11px;">${a.code}</span><br/>既存取引先<br/>締日${a.closingDay}日 / 支払日${a.paymentDay}日${a.address1?`<br/>${a.address1}`:""}</div>`)}),s.mapFilters.showProspects&&s.prospects.forEach(c=>{if(!c.lat||!c.lng||s.mapFilters.filterBusinessType&&c.businessType!==s.mapFilters.filterBusinessType)return;const a=c.stage==="hot"||c.stage==="negotiating"?"#EF5350":c.stage==="won"?"#66BB6A":"#4CAF50";o(c.lat,c.lng,a,"新",`<div style="min-width:200px;"><strong>${c.companyName}</strong><br/><span style="color:#666;font-size:11px;">${c.contactName??""}</span><br/>新規見込客 (${c.stage})<br/>想定 ¥${c.expectedAmount.toLocaleString("ja-JP")} / 確度 ${c.probability}%${c.nextAction?`<br/>${c.nextAction}`:""}</div>`)}),s.mapFilters.showDelivery&&s.deliveryLocations.forEach(c=>{!c.lat||!c.lng||o(c.lat,c.lng,"#FF9800","納",`<div style="min-width:180px;"><strong>${c.name}</strong><br/>納品先${c.customerCode?` (${c.customerCode})`:""}<br/>${c.address??""}${c.contactName?`<br/>${c.contactName}`:""}${c.deliveryNote?`<br/>${c.deliveryNote}`:""}</div>`)})}Ee();const pr=300*1e3;setInterval(()=>{s.route==="/"&&!s.loading&&!document.hidden&&Ee()},pr);let gt="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{gt=e}).catch(()=>{});setInterval(async()=>{if(!(!gt||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==gt&&!s.updateAvailable&&(s.updateAvailable=!0,h())}catch{}},120*1e3);
