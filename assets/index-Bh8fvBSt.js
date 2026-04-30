(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();const jn="modulepreload",Fn=function(e){return"/"+e},Ta={},x=function(t,n,o){let l=Promise.resolve();if(n&&n.length>0){let r=function(d){return Promise.all(d.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};var u=r;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),i=a?.nonce||a?.getAttribute("nonce");l=r(n.map(d=>{if(d=Fn(d),d in Ta)return;Ta[d]=!0;const p=d.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${m}`))return;const h=document.createElement("link");if(h.rel=p?"stylesheet":jn,p||(h.as="script"),h.crossOrigin="",h.href=d,i&&h.setAttribute("nonce",i),document.head.appendChild(h),p)return new Promise((f,$)=>{h.addEventListener("load",f),h.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${d}`)))})}))}function c(a){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=a,window.dispatchEvent(i),!i.defaultPrevented)throw a}return l.then(a=>{for(const i of a||[])i.status==="rejected"&&c(i.reason);return t().catch(c)})},se="https://loarwnuyvfxiscjjsmiz.supabase.co",G="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";async function Pt(e,t){try{const n=new URL(`/rest/v1/${e}`,se),o=await fetch(n.toString(),{method:"POST",headers:{apikey:G,Authorization:`Bearer ${G}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function gs(e,t){try{const n=new URL(`/rest/v1/${e}`,se),o=await fetch(n.toString(),{method:"POST",headers:{apikey:G,Authorization:`Bearer ${G}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function ua(e,t,n){try{const o=new URL(`/rest/v1/${e}?id=eq.${t}`,se);return(await fetch(o.toString(),{method:"PATCH",headers:{apikey:G,Authorization:`Bearer ${G}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function re(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,se),o=await fetch(n.toString(),{method:"POST",headers:{apikey:G,Authorization:`Bearer ${G}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function pa(e){try{const t=new URL(`/rest/v1/${e}`,se);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:G,Authorization:`Bearer ${G}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const o=n.headers.get("Content-Range");if(o){const l=o.match(/\/(\d+)/);if(l)return parseInt(l[1],10)}return 0}catch{return 0}}async function D(e,t={}){try{const n=new URL(`/rest/v1/${e}`,se);Object.entries(t).forEach(([l,c])=>{n.searchParams.set(l,c)});const o=await fetch(n.toString(),{method:"GET",headers:{apikey:G,Authorization:`Bearer ${G}`,Accept:"application/json",Prefer:"return=representation"}});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function bs(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,se);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:G,Authorization:`Bearer ${G}`}})).ok}catch{return!1}}async function Z(e,t={},n=1e3){const o=[];let l=0;try{for(;;){const c=new URL(`/rest/v1/${e}`,se);Object.entries(t).forEach(([i,r])=>{c.searchParams.set(i,r)}),c.searchParams.set("limit",String(n)),c.searchParams.set("offset",String(l));const u=await fetch(c.toString(),{method:"GET",headers:{apikey:G,Authorization:`Bearer ${G}`,Accept:"application/json",Prefer:"return=representation"}});if(!u.ok)throw new Error(`HTTP ${u.status}`);const a=await u.json();if(o.push(...a),a.length<n)break;l+=n}return o}catch(c){return console.warn(`Failed to query all rows from Supabase table ${e}`,c),o.length>0?o:[]}}const F=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:G,SUPABASE_URL:se,supabaseCount:pa,supabaseDelete:bs,supabaseInsert:Pt,supabaseQuery:D,supabaseQueryAll:Z,supabaseRpc:re,supabaseUpdate:ua,supabaseUpsert:gs},Symbol.toStringTag,{value:"Module"})),ma="sake_auth";function $s(e){localStorage.setItem(ma,JSON.stringify(e))}function _s(){return{apikey:G,"Content-Type":"application/json"}}function zn(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),o=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(o))}catch{return null}}async function ws(e,t){const n=await fetch(`${se}/auth/v1/${e}`,{method:"POST",headers:_s(),body:JSON.stringify(t)}),o=await n.json().catch(()=>({}));if(!n.ok)throw new Error(o.error_description??o.msg??`HTTP ${n.status}`);return o}async function Bn(e,t){const n=await ws("token?grant_type=password",{email:e,password:t});return $s({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Na(e,t){const n=await ws("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&$s({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Vn(){const e=At();if(localStorage.removeItem(ma),!!e?.access_token)try{await fetch(`${se}/auth/v1/logout`,{method:"POST",headers:{..._s(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function At(){const e=localStorage.getItem(ma);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function Jn(){const e=At();if(!e)return null;const t=zn(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function Yn(e){const t=At();if(!t)throw new Error("not signed in");const n=await fetch(`${se}/auth/v1/user`,{method:"PUT",headers:{apikey:G,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const o=await n.json().catch(()=>({}));throw new Error(o.msg??`HTTP ${n.status}`)}}const ya={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},xs={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},Un={generatedAt:new Date().toISOString(),records:[]},xe={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},Qn={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},Hn={},Gn={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function B(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function Xn(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Kn(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function y(e,t,n=""){for(const o of t){const l=e[o];if(typeof l=="string"&&l.length>0)return l}return n}function b(e,t,n=0){for(const o of t)if(o in e)return B(e[o]);return n}function ee(e,t,n=!0){for(const o of t)if(o in e)return Kn(e[o]);return n}function W(e,t,n){for(const o of t){const l=e[o];if(typeof l!="string"||l.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(l))return new Date(`${l}T00:00:00Z`).toISOString();const c=new Date(l);if(!Number.isNaN(c.getTime()))return c.toISOString()}return n}function Wn(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:W(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:B(e.total_amount??e.billed_amount)}}function Ma(e){const t=e.trim().toUpperCase(),n=Hn[t];if(n)return n;const o=xs.salesRecords.find(l=>l.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:o?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function Ss(){const e=await Z("daily_sales_detail",{select:"sales_date,amount,document_count,bottles,volume_ml,price_per_bottle,price_per_liter",order:"sales_date.desc"});if(e.length>0){const[t,n]=await Promise.all([D("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),D("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),l=new Date().toISOString().slice(0,10),c=l.slice(0,7),u=[...e].sort((h,f)=>h.sales_date.localeCompare(f.sales_date)).map(h=>({date:new Date(`${h.sales_date}T00:00:00Z`).toISOString(),amount:B(h.amount??h.sales_amount),bottles:B(h.bottles),volumeMl:B(h.volume_ml),pricePerBottle:B(h.price_per_bottle),pricePerLiter:B(h.price_per_liter)})),a=u.slice(-30),i=h=>B(h.amount??h.sales_amount),r=e.reduce((h,f)=>f.sales_date===l?h+i(f):h,0),d=e.reduce((h,f)=>f.sales_date.startsWith(c)?h+i(f):h,0),p=t.filter(h=>B(h.balance_amount)>0),m=n.map((h,f)=>({id:String(h.id??`sale-${f+1}`),documentNo:h.document_no??h.legacy_document_no??"",date:h.sales_date??"",customerCode:h.legacy_customer_code??"",customerName:h.customer_name??h.legacy_customer_code??"",amount:B(h.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:r,todayDelta:0,monthSales:d,monthDelta:0,unpaidCount:p.length,unpaidAmount:p.reduce((h,f)=>h+B(f.balance_amount),0)},dailySales:a,allDailySales:u,salesRecords:m}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),xs}async function ks(){const e=await Z("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const o=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${o}-${n+1}`,customerCode:o,customerName:o,billedAmount:B(t.billed_amount),paymentAmount:B(t.paid_amount),balanceAmount:B(t.balance_amount),lastPaymentDate:null,status:Xn(t.payment_status)}})}:Un}async function ha(){const[e,t]=await Promise.all([Z("customers"),Z("products")]);if(e.length>0||t.length>0){const n=e.length?e.map((l,c)=>{const u=typeof l.memo=="string"?JSON.parse(l.memo||"{}"):l.memo??{};return{id:y(l,["id","customer_id","code"],`customer-${c+1}`),code:y(l,["code","customer_code","legacy_customer_code"],`C${String(c+1).padStart(4,"0")}`),name:y(l,["name","customer_name","display_name"],`Customer ${c+1}`),kanaName:y(l,["kana_name"],""),shortName:y(l,["short_name"],""),postalCode:y(l,["postal_code"],""),address1:y(l,["address1"],""),address2:y(l,["address2"],""),phone:y(l,["phone"],""),fax:y(l,["fax"],""),email:y(l,["email"],""),staffCode:y(l,["staff_code"],""),businessType:y(l,["business_type"],""),areaCode:y(l,["delivery_area_code"],""),salesCategory:String(u.sales_category??""),closingDay:b(l,["closing_day","close_day"],31),paymentDay:b(l,["payment_day","due_day"],15),paymentMonth:Number(u.payment_month??0),paymentCycle:y(l,["payment_cycle"],""),billingCycleType:y(l,["billing_cycle_type"],""),billingCode:String(u.billing_code??""),creditLimit:b(l,["credit_limit"],0),taxMode:y(l,["tax_mode"],""),taxRound:String(u.tax_round??""),invoiceIssue:String(u.invoice_issue??""),invoiceType:y(l,["invoice_type"],""),priceGroup:String(u.price_group??""),priceType:String(u.price_type??""),customerGroup1:String(u.customer_group1??""),customerGroup2:String(u.customer_group2??""),bankName:y(l,["bank_name"],""),bankBranch:y(l,["bank_branch"],""),bankAccount:y(l,["bank_account"],""),isActive:ee(l,["is_active","active","enabled"],!0),lat:l.lat?Number(l.lat):void 0,lng:l.lng?Number(l.lng):void 0}}):xe.customers,o=t.length?t.map((l,c)=>({id:y(l,["id","product_id","code"],`product-${c+1}`),code:y(l,["code","product_code","legacy_product_code"],`P${String(c+1).padStart(5,"0")}`),janCode:y(l,["jan_code","jan","barcode"],""),name:y(l,["name","product_name","display_name"],`Product ${c+1}`),kanaName:y(l,["kana_name"],""),shortName:y(l,["short_name"],""),category:y(l,["category","category_name","category_code"],"未分類"),taxCategoryCode:y(l,["tax_category_code"],""),isActive:ee(l,["is_active","active","enabled"],!0),listPrice:b(l,["list_price"],0),purchasePrice:b(l,["purchase_price"],0),salePrice:b(l,["default_sale_price","sale_price"],0),costPrice:b(l,["default_cost_price"],0),alcoholDegree:l.alcohol_degree!=null?Number(l.alcohol_degree):null,volumeMl:l.volume_ml!=null?Number(l.volume_ml):null,unit:y(l,["unit"],"本"),bottleType:y(l,["bottle_type"],""),containerCode:y(l,["container_code"],""),polishRate:l.polish_rate!=null?Number(l.polish_rate):null,riceType:y(l,["rice_type"],""),season:y(l,["season"],""),agingYears:b(l,["aging_years"],0)})):xe.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||xe.summary.customerCount,activeCustomerCount:e.length?n.filter(l=>l.isActive).length:xe.summary.activeCustomerCount,productCount:t.length||xe.summary.productCount,activeProductCount:t.length?o.filter(l=>l.isActive).length:xe.summary.activeProductCount},customers:n,products:o}}return xe}async function Ps(){const[e,t]=await Promise.all([D("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),D("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?W(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const o=e[0],l=y(o,["status"],"success"),c=o.errors,u=Array.isArray(c)?c.length>0:!!c;return{generatedAt:new Date().toISOString(),lastSyncAt:W(o,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:u?"warning":l==="error"?"error":"success",jobName:y(o,["agent_hostname"],"sake-relay"),message:`${b(o,["rows_upserted"],0)}行同期 / ${b(o,["files_updated"],0)}ファイル更新`}}return{...Qn,lastDataAt:n}}async function As(){const e=await re("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function st(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount,line_count",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];e.customerCode.trim()&&n.push(`customer_code.ilike.*${e.customerCode.trim()}*`,`legacy_customer_code.ilike.*${e.customerCode.trim()}*`),e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const o=await D("mv_invoice_with_line_count",t);return o.length>0?o.map((l,c)=>({id:y(l,["id"],`invoice-${c}`),documentNo:y(l,["document_no","legacy_document_no"],""),date:W(l,["sales_date"],""),customerCode:y(l,["legacy_customer_code","customer_code"],""),customerName:y(l,["customer_name","legacy_customer_code"],""),itemCount:b(l,["line_count"],0),amount:b(l,["total_amount","billed_amount"],0)})):[]}async function va(e){const t=e.trim().toUpperCase();if(!t)return Ma("");const[n,o,l]=await Promise.all([D("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),D("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),D("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||o.length>0){const c=n.map((i,r)=>{const d=Wn(i,r);return{id:d.id,date:d.date,documentNo:d.documentNo,amount:d.amount}}),u=o.map((i,r)=>({id:String(i.id??`payment-${r+1}`),date:W(i,["payment_date","received_date"],new Date().toISOString()),amount:B(i.payment_amount??i.amount),method:i.payment_method??i.method??"入金"})),a=l.find(i=>(i.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:B(a?.balance_amount),salesTotal:c.reduce((i,r)=>i+r.amount,0),paymentTotal:u.reduce((i,r)=>i+r.amount,0),salesHistory:c,paymentHistory:u}}return Ma(t)}async function fa(){const[e,t,n,o]=await Promise.all([D("mv_monthly_sales",{order:"month.asc"}),D("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),D("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),D("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(l=>({month:y(l,["month"],""),amount:b(l,["amount"],0),quantity:b(l,["quantity"],0),volumeMl:b(l,["volume_ml"],0)})),productTotals:n.map(l=>({code:y(l,["code"],""),name:y(l,["name"],""),amount:b(l,["amount"],0),quantity:b(l,["quantity"],0),documents:b(l,["documents"],0),volumeMl:b(l,["volume_ml"],0)})),customerTotals:t.map(l=>({code:y(l,["code"],""),name:y(l,["name"],""),amount:b(l,["amount"],0),quantity:b(l,["quantity"],0),documents:b(l,["documents"],0),volumeMl:b(l,["volume_ml"],0)})),staffTotals:o.map(l=>({code:y(l,["code"],""),name:y(l,["name"],""),amount:b(l,["amount"],0),quantity:b(l,["quantity"],0),documents:b(l,["documents"],0),volumeMl:0}))}:Gn}async function Zn(e,t,n){if(t==="all")return[];const o=n?Cs(t,n):null,c=await re(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:o?.from??null,p_date_to:o?.to??null});return c?c.map(u=>({code:y(u,["code"],""),name:y(u,["name"],""),amount:b(u,["amount"],0),quantity:b(u,["quantity"],0),documents:b(u,["documents"],0),volumeMl:b(u,["volume_ml"],0)})):[]}async function eo(e,t){if(t==="all")return[];const n=await re("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(o=>o.period_val).filter(Boolean)}function Cs(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,o]=t.split("-").map(Number),l=`${n}-${String(o).padStart(2,"0")}-01`,c=new Date(n,o,0).getDate(),u=`${n}-${String(o).padStart(2,"0")}-${String(c).padStart(2,"0")}`;return{from:l,to:u}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const o=parseInt(n[1]),l=parseInt(n[2]),c=new Date(o,0,4),u=c.getDay()||7,a=new Date(c);a.setDate(c.getDate()-u+1);const i=new Date(a);i.setDate(a.getDate()+(l-1)*7);const r=new Date(i);return r.setDate(i.getDate()+6),{from:i.toISOString().slice(0,10),to:r.toISOString().slice(0,10)}}return null}function Es(e){return e.map(t=>({staffCode:y(t,["staff_code"],""),staffName:y(t,["staff_name"],""),code:y(t,["code"],""),name:y(t,["name"],""),tag:y(t,["tag"],""),amount:b(t,["amount"],0),quantity:b(t,["quantity"],0),documents:b(t,["documents"],0)}))}async function to(e,t){const n=await re("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(o=>({code:y(o,["code"],""),name:y(o,["name"],""),amount:b(o,["amount"],0),quantity:b(o,["quantity"],0),documents:b(o,["documents"],0)})):[]}async function ao(e,t,n){const o=await re("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?Es(o):[]}async function so(e,t,n){const o=await re("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?Es(o):[]}async function no(e,t){if(e==="all"||!t)return[];const n=await re("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(o=>({month:y(o,["label"],""),amount:b(o,["amount"],0),quantity:b(o,["quantity"],0),volumeMl:b(o,["volume_ml"],0)})):[]}function oo(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function io(e,t,n){const o=await re("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(l=>({code:y(l,["code"],""),name:y(l,["name"],""),tag:y(l,["tag"],""),amount:b(l,["amount"],0),quantity:b(l,["quantity"],0),documents:b(l,["documents"],0),volumeMl:b(l,["volume_ml"],0)})):[]}async function lo(e,t,n){const o=await re("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(l=>({code:y(l,["code"],""),name:y(l,["name"],""),tag:y(l,["tag"],""),amount:b(l,["amount"],0),quantity:b(l,["quantity"],0),documents:b(l,["documents"],0),volumeMl:b(l,["volume_ml"],0)})):[]}async function ro(e,t){const n=await re("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(o=>({month:y(o,["month"],""),amount:b(o,["amount"],0),quantity:b(o,["quantity"],0),volumeMl:b(o,["volume_ml"],0)})):[]}async function co(e,t){const n=await re("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({brewCategory:y(o,["brew_category"],""),subCategory:y(o,["sub_category"],""),productCount:b(o,["product_count"],0),totalShipmentQty:b(o,["total_shipment_qty"],0),totalShipmentMl:b(o,["total_shipment_ml"],0),monthlyAvgQty:b(o,["monthly_avg_qty"],0),monthlyAvgMl:b(o,["monthly_avg_ml"],0),currentStockL:b(o,["current_stock_l"],0),monthsRemaining:b(o,["months_remaining"],0),costPerL:b(o,["cost_per_l"],0)})):[]}async function uo(e,t){const n=await re("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({month:y(o,["month"],""),brewCategory:y(o,["brew_category"],""),shipmentMl:b(o,["shipment_ml"],0)})):[]}async function po(e){return(await D("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:y(n,["id"],""),brewCategory:y(n,["brew_category"],""),fy:b(n,["fy"],e),brewMonth:b(n,["brew_month"],0),durationMonths:b(n,["duration_months"],2),plannedVolumeL:b(n,["planned_volume_l"],0),notes:y(n,["notes"],"")}))}async function mo(e,t,n){return await re("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(l=>({brew_month:l.brewMonth,duration_months:l.durationMonths,planned_volume_l:l.plannedVolumeL,notes:l.notes??null}))})!==null}async function yo(e,t,n,o){return await gs("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:o??null,updated_at:new Date().toISOString()})!==null}const Xt={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Ls(e){const t=e.lines.reduce((l,c)=>l+c.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Pt("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const Ra={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function ga(e){const t=await D("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],o=B(n.total_amount);return{documentNo:e,invoiceDate:y(n,["sales_date","document_date"],""),customerCode:y(n,["legacy_customer_code","customer_code"],""),customerName:y(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:o,taxAmount:Math.floor(o*10/110),note:""}}return{...Ra,documentNo:e||Ra.documentNo}}const ho={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function ba(e){const t=await D("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(l=>{const c=b(l,["sales_amount"],0),u=b(l,["tax_amount"],0);return{customerCode:y(l,["customer_code"],""),customerName:y(l,["customer_name"],""),closingDay:31,salesAmount:c,taxAmount:u,prevBalance:0,paymentAmount:0,billingAmount:c,status:"open"}}),o=n.reduce((l,c)=>l+c.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:o,customers:n}}return{...ho,targetYearMonth:e}}const vo={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function Ct(){const[e,t,n]=await Promise.all([D("mv_monthly_sales",{order:"month.asc"}),D("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),D("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return vo;const o=e.slice(-12).map(i=>y(i,["month"],"")),l=new Map;t.forEach(i=>{const r=y(i,["code"],"");l.has(r)||l.set(r,{name:y(i,["name"],r),monthValues:new Map}),l.get(r).monthValues.set(y(i,["month"],""),b(i,["amount"],0))});const u=Array.from(l.entries()).map(([i,r])=>({code:i,name:r.name,total:o.reduce((d,p)=>d+(r.monthValues.get(p)??0),0),monthValues:r.monthValues})).sort((i,r)=>r.total-i.total).slice(0,10).map(i=>({label:i.name,values:o.map(r=>i.monthValues.get(r)??0)})),a=n.map(i=>({label:y(i,["name"],""),values:o.map(()=>Math.round(b(i,["amount"],0)/o.length))}));return{generatedAt:new Date().toISOString(),months:o,salesByProduct:u,salesByCustomer:a,costSimulation:[]}}async function fo(){const e=await Z("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const o=y(n,["code"],"");if(!o)return;const l=y(n,["month"],""),c=parseInt(l.slice(5,7))-1;if(c<0||c>11)return;let u=t.get(o);u||(u={name:y(n,["name"],o),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(o,u)),u.qty[c]+=b(n,["quantity"],0),u.amt[c]+=b(n,["amount"],0)}),Array.from(t.entries()).map(([n,o])=>({code:n,name:o.name,monthlyQuantity:o.qty,monthlyAmount:o.amt,totalQuantity:o.qty.reduce((l,c)=>l+c,0),totalAmount:o.amt.reduce((l,c)=>l+c,0)})).filter(n=>n.totalQuantity>0).sort((n,o)=>o.totalAmount-n.totalAmount)}async function go(){return(await D("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:y(t,["product_code"],""),productName:y(t,["product_name"],""),forecastMonth:y(t,["forecast_month"],""),segment:y(t,["segment"],"monthly"),avgMonthly:b(t,["avg_monthly"],0),forecastQuantity:b(t,["forecast_quantity"],0),forecastAmount:b(t,["forecast_amount"],0),safetyStock:b(t,["safety_stock"],0),calculatedAt:W(t,["calculated_at"],"")}))}async function bo(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await Z("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(u=>String(u.id)).filter(Boolean);const o=await Z("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),l=new Map;n.forEach(u=>{u.id&&l.set(String(u.id),u)});const c=[];return o.forEach(u=>{const a=String(u.header_id??u.document_header_id??""),i=l.get(a);if(!i)return;const r=i.sales_date??i.document_date??"";!r||r<t||c.push({date:r.slice(0,10),customerName:i.customer_name??"不明",productName:u.product_name??"不明",quantity:B(u.quantity),documentNo:i.document_no??i.legacy_document_no??""})}),c.sort((u,a)=>u.date.localeCompare(a.date))}async function Ds(){const e=new Date().toISOString();return(await D("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:y(n,["id"],""),message:y(n,["message"],""),level:y(n,["level"],"info"),startsAt:W(n,["starts_at"],""),endsAt:n.ends_at?W(n,["ends_at"],""):null,dismissible:ee(n,["dismissible"],!0)}))}async function $o(){const e=await Z("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:y(t,["customer_code"],""),customer_name:y(t,["customer_name"],""),business_type:y(t,["business_type"],""),area_code:y(t,["area_code"],""),phone:y(t,["phone"],""),last_order_date:y(t,["last_order_date"],""),days_since_order:b(t,["days_since_order"],0),amount_12m:b(t,["amount_12m"],0),amount_3m:b(t,["amount_3m"],0),amount_this_month:b(t,["amount_this_month"],0),amount_last_year_same_month:b(t,["amount_last_year_same_month"],0),annual_revenue:b(t,["annual_revenue"],0),is_dormant:ee(t,["is_dormant"],!1),is_at_risk:ee(t,["is_at_risk"],!1)})):[]}async function _o(){return(await Z("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:y(t,["customer_code"],""),customer_name:y(t,["customer_name"],""),phone:y(t,["phone"],""),address:y(t,["address"],""),area_code:y(t,["area_code"],""),business_type:y(t,["business_type"],""),priority_score:b(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:y(t,["last_order_date"],""),days_since_order:b(t,["days_since_order"],0),annual_revenue:b(t,["annual_revenue"],0),recommended_action:y(t,["recommended_action"],"")}))}async function wo(){return(await Z("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:y(t,["product_code"],""),product_name:y(t,["product_name"],""),season_type:y(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:b(t,["avg_monthly_qty"],0)}))}async function xo(){return(await Z("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:y(t,["product_code"],""),name:y(t,["product_name"],""),monthlyQuantity:[b(t,["m01"],0),b(t,["m02"],0),b(t,["m03"],0),b(t,["m04"],0),b(t,["m05"],0),b(t,["m06"],0),b(t,["m07"],0),b(t,["m08"],0),b(t,["m09"],0),b(t,["m10"],0),b(t,["m11"],0),b(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:b(t,["total_quantity"],0),totalAmount:b(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Is(e,t,n){try{return await Pt("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function qs(e,t){return ua("customers",e,t)}async function Ts(e,t){return ua("products",e,t)}async function Ns(e,t){const n=e.find(u=>u.code===t);n?.priceGroup;const o=n?.priceGroup||t;let l="";try{const u=await D("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});u[0]?.memo&&(l=(typeof u[0].memo=="string"?JSON.parse(u[0].memo):u[0].memo)?.price_type??"")}catch{}const c=new Map;if(o){const u=await D("customer_product_prices",{price_group:`eq.${o}`,select:"legacy_product_code,special_price"});for(const a of u)c.set(a.legacy_product_code,a.special_price)}return{priceType:l,priceGroup:o,individualPrices:c}}function Ms(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"標準価格"}}async function Rs(){return(await D("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function So(){return(await Z("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Os(){return(await D("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function js(){const[e,t]=await Promise.all([D("mv_customer_abc",{order:"amount.desc"}),Ct()]),n=e.map(o=>({code:y(o,["code"],""),name:y(o,["name"],""),amount:b(o,["amount"],0),documents:b(o,["documents"],0),ratio:b(o,["ratio"],0),cumRatio:b(o,["cum_ratio"],0),abcRank:y(o,["abc_rank"],"C")}));return{generatedAt:new Date().toISOString(),ranking:n,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function ko(){const[e,t]=await Promise.all([D("mv_product_abc",{order:"amount.desc"}),Ct()]),n=e.map(u=>({code:y(u,["code"],""),name:y(u,["name"],""),amount:b(u,["amount"],0),quantity:b(u,["quantity"],0),ratio:b(u,["ratio"],0),cumRatio:b(u,["cum_ratio"],0),abcRank:y(u,["abc_rank"],"C")})),o=n.reduce((u,a)=>u+a.amount,0),l=new Set(n.filter(u=>u.abcRank==="A").map(u=>u.name)),c=t.salesByProduct.filter(u=>l.has(u.label));return{generatedAt:new Date().toISOString(),totalAmount:o,ranking:n,months:t.months,monthlyByProduct:c.length>0?c:t.salesByProduct}}const Fs={planned:"計画中",active:"仕込中",done:"完了"};async function zs(){const e=await D("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:y(t,["id"],""),jikomiNo:y(t,["batch_no","legacy_batch_no"],""),productName:y(t,["brand_name"],""),riceType:y(t,["rice_type"],""),plannedKg:b(t,["planned_rice_kg"],0),actualKg:b(t,["actual_rice_kg"],0),startDate:W(t,["start_date"],""),expectedDoneDate:W(t,["expected_done_date"],""),status:y(t,["status"],"planned"),tankNo:y(t,["tank_no"],""),note:y(t,["remarks"],"")})):[]}async function Bs(){const e=await D("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:y(t,["id"],""),tankNo:y(t,["tank_no"],""),capacity:b(t,["capacity_l"],0),currentVolume:b(t,["current_volume_l"],0),productName:y(t,["current_product_code"],""),jikomiNo:y(t,["current_batch_id"],""),status:y(t,["status"],"empty"),lastUpdated:W(t,["last_updated_at"],"")})):[]}async function Vs(){const e=await D("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:y(t,["id"],""),kenteiNo:y(t,["kentei_no"],""),jikomiNo:y(t,["batch_id"],""),productName:y(t,["product_code"],""),kenteiDate:W(t,["kentei_date"],""),alcoholDegree:b(t,["alcohol_degree"],0),extractDegree:b(t,["extract_degree"],0),sakaMeterValue:b(t,["sakemeter_value"],0),volume:b(t,["volume_l"],0),taxCategory:y(t,["tax_category_code"],""),status:y(t,["status"],"pending")})):[]}async function Kt(){const e=await D("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:y(t,["id"],""),code:y(t,["material_code","legacy_material_code"],""),name:y(t,["name"],""),unit:y(t,["unit"],""),currentStock:b(t,["current_stock"],0),minimumStock:b(t,["minimum_stock"],0),unitCost:b(t,["unit_cost"],0),lastUpdated:W(t,["updated_at"],"")})):[]}async function Js(){const e=await D("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:y(t,["id"],""),documentNo:y(t,["document_no","legacy_document_no"],""),purchaseDate:W(t,["purchase_date"],""),supplierCode:y(t,["supplier_code","legacy_supplier_code"],""),supplierName:y(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:b(t,["total_amount"],0),status:y(t,["payment_status"],"pending")})):[]}async function Ys(){const e=await D("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:y(t,["supplier_code","legacy_supplier_code"],""),supplierName:y(t,["legacy_supplier_code"],""),totalPurchase:b(t,["total_purchase"],0),paidAmount:b(t,["paid_amount"],0),balance:b(t,["balance"],0),nextPaymentDate:W(t,["next_payment_date"],""),status:y(t,["status"],"unpaid")})):[]}async function Us(){const e=await D("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:y(t,["id"],""),billNo:y(t,["bill_no"],""),supplierName:y(t,["counterparty_name"],""),amount:b(t,["amount"],0),issueDate:W(t,["issue_date"],""),dueDate:W(t,["due_date"],""),status:y(t,["status"],"holding")})):[]}async function Qs(){const e=await D("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:y(t,["material_code","legacy_material_code"],""),name:y(t,["name"],""),unit:y(t,["unit"],""),currentStock:b(t,["current_stock"],0),minimumStock:b(t,["minimum_stock"],0),lastPurchaseDate:W(t,["last_purchase_date"],""),unitCost:b(t,["unit_cost"],0)})):[]}const Hs=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],Wt={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Po={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function $a(e,t){const n=await D("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const o=n[0],l=y(o,["id"],""),[c,u]=await Promise.all([D("tax_declaration_rows",{declaration_id:`eq.${l}`,order:"tax_category_code.asc"}),D("tax_deductions",{declaration_id:`eq.${l}`})]),a=c.map(r=>({taxCategory:y(r,["tax_category_code"],""),taxCategoryName:y(r,["tax_category_name"],""),alcoholDegree:b(r,["alcohol_degree"],0),volume:b(r,["taxable_volume"],0),taxRate:b(r,["tax_rate"],0),taxAmount:b(r,["tax_amount"],0),productionVolume:b(r,["production_volume"],0),previousBalance:b(r,["previous_balance"],0),currentAdjustment:b(r,["current_adjustment"],0),exportDeduction:b(r,["export_deduction"],0),sampleDeduction:b(r,["sample_deduction"],0),taxableVolume:b(r,["taxable_volume"],0)})),i=u.map(r=>({type:y(r,["deduction_type"],"sample"),categoryCode:y(r,["tax_category_code"],""),volume:b(r,["volume"],0),reason:y(r,["reason"],""),documentNo:y(r,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:y(o,["company_name"],""),companyNo:y(o,["company_no"],""),companyAddress:y(o,["company_address"],""),companyRepresentative:y(o,["company_representative"],""),taxOffice:y(o,["tax_office"],""),rows:a,deductions:i,totalVolume:b(o,["total_taxable_volume"],0),totalTax:b(o,["total_tax_amount"],0),status:y(o,["status"],"draft"),submittedAt:y(o,["submitted_at"],"")||null}}return{...Po,targetYear:e,targetMonth:t}}function me(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Gs(e){const t=e.rows.map(o=>`    <Category>
      <Code>${me(o.taxCategory)}</Code>
      <Name>${me(o.taxCategoryName)}</Name>
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
`),n=e.deductions.map(o=>`    <Deduction type="${me(o.type)}">
      <CategoryCode>${me(o.categoryCode)}</CategoryCode>
      <Volume>${o.volume}</Volume>
      <Reason>${me(o.reason)}</Reason>${o.documentNo?`
      <DocumentNo>${me(o.documentNo)}</DocumentNo>`:""}
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
${n}
  </Deductions>
  <Total>
    <TotalVolume>${e.totalVolume}</TotalVolume>
    <TotalTax>${e.totalTax}</TotalTax>
  </Total>
</TaxDeclaration>
`}function Ao(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function Co(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),o=e.rows.map(c=>[c.taxCategory,c.taxCategoryName,c.alcoholDegree,c.productionVolume,c.previousBalance,c.currentAdjustment,c.exportDeduction,c.sampleDeduction,c.taxableVolume,c.taxRate,c.taxAmount].map(Ao).join(",")),l=`,合計,,${e.rows.reduce((c,u)=>c+u.productionVolume,0)},,,${e.rows.reduce((c,u)=>c+u.exportDeduction,0)},${e.rows.reduce((c,u)=>c+u.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...o,l].join(`
`)+`
`}function Eo(e){const t=e.rows.map(l=>{const c=Math.max(0,l.productionVolume+l.previousBalance+l.currentAdjustment-l.exportDeduction-l.sampleDeduction),u=Math.round(c*l.taxRate);return{...l,taxableVolume:c,volume:c,taxAmount:u}}),n=t.reduce((l,c)=>l+c.taxableVolume,0),o=t.reduce((l,c)=>l+c.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:o}}async function Lo(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>F);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:Gs(e),submitted_at:e.submittedAt})}async function _a(e){const t=await D("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:y(n,["id"],""),saleDate:y(n,["sale_date"],e),saleTime:y(n,["sale_time"],""),productCode:y(n,["product_code"],""),productName:y(n,["product_name"],""),quantity:b(n,["quantity"],0),unitPrice:b(n,["unit_price"],0),amount:b(n,["amount"],0),paymentMethod:y(n,["payment_method"],"cash")})):[]}async function Xs(){const e=await D("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:y(t,["id"],""),orderNo:y(t,["order_no"],""),orderDate:W(t,["order_date"],""),customerName:y(t,["customer_name"],""),postalCode:y(t,["postal_code"],""),address:y(t,["shipping_address"],""),items:[],totalAmount:b(t,["total_amount"],0),status:y(t,["status"],"new"),shippingDate:W(t,["shipping_date"],"")})):[]}async function bt(e){const t=await Pt("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Ks(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Do(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await D("print_layouts",t)).map(o=>({id:y(o,["id"],""),name:y(o,["name"],""),templateKey:y(o,["template_key"],""),positions:o.positions??{},isDefault:ee(o,["is_default"],!1),note:y(o,["note"],""),updatedAt:y(o,["updated_at"],"")}))}async function Io(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>F);return{supabaseInsert:l}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},o=await t("print_layouts",n);return o?{id:y(o,["id"],e.id),name:y(o,["name"],e.name),templateKey:y(o,["template_key"],e.templateKey),positions:o.positions??e.positions,isDefault:ee(o,["is_default"],!1),note:y(o,["note"],""),updatedAt:y(o,["updated_at"],"")}:null}async function qo(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function To(){return(await D("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:y(t,["id"],""),name:y(t,["name"],""),email:y(t,["email"],""),displayName:y(t,["display_name"],""),signature:y(t,["signature"],""),replyTo:y(t,["reply_to"],""),isDefault:ee(t,["is_default"],!1),isVerified:ee(t,["is_verified"],!1),note:y(t,["note"],"")}))}async function No(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:y(n,["id"],e.id),name:y(n,["name"],e.name),email:y(n,["email"],e.email),displayName:y(n,["display_name"],""),signature:y(n,["signature"],""),replyTo:y(n,["reply_to"],""),isDefault:ee(n,["is_default"],!1),isVerified:ee(n,["is_verified"],!1)}:null}async function Mo(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const wa={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},xa={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function Ro(e){const t=`${e}-01T00:00:00Z`,[n,o]=e.split("-").map(a=>parseInt(a,10)),l=new Date(n,o,0).getDate(),c=`${e}-${String(l).padStart(2,"0")}T23:59:59Z`;return(await D("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${c})`,order:"starts_at.asc"})).map(a=>({id:y(a,["id"],""),title:y(a,["title"],""),description:y(a,["description"],""),category:y(a,["category"],"general")||"general",startsAt:y(a,["starts_at"],new Date().toISOString()),endsAt:y(a,["ends_at"],""),isAllDay:ee(a,["is_all_day"],!1),location:y(a,["location"],""),attendees:a.attendees??[],relatedCustomerCode:y(a,["related_customer_code"],""),relatedOrderId:y(a,["related_order_id"],""),color:y(a,["color"],""),googleEventId:y(a,["google_event_id"],"")}))}async function Oo(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??xa[e.category],updated_at:new Date().toISOString()})?e:null}async function jo(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Ws(){return(await D("integration_settings",{order:"name.asc"})).map(t=>({id:y(t,["id"],""),name:y(t,["name"],""),provider:y(t,["provider"],""),config:t.config??{},isEnabled:ee(t,["is_enabled"],!1),lastSyncAt:y(t,["last_sync_at"],""),lastStatus:y(t,["last_status"],"")}))}async function it(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function Fo(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const o=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,l=await fetch(o,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!l.ok)return{count:0,error:`HTTP ${l.status}`};const c=await l.json(),{supabaseInsert:u}=await x(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>F);return{supabaseInsert:i}},void 0);let a=0;for(const i of c.orders){const r=`shopify_${i.id}`;await u("shopify_orders",{id:r,shopify_order_id:String(i.id),order_number:String(i.order_number??""),order_date:String(i.created_at??new Date().toISOString()),customer_name:String(i.customer?.first_name??"")+" "+String(i.customer?.last_name??""),customer_email:String(i.customer?.email??""),total_amount:Math.round(parseFloat(String(i.total_price??"0"))),financial_status:String(i.financial_status??""),fulfillment_status:String(i.fulfillment_status??"unfulfilled"),line_items:i.line_items??[],shipping_address:i.shipping_address??null,raw_payload:i}),a++}return await it({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${a}件取得成功`}),{count:a}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function zo(){return(await D("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:y(t,["id"],""),shopifyOrderId:y(t,["shopify_order_id"],""),orderNumber:y(t,["order_number"],""),orderDate:y(t,["order_date"],""),customerName:y(t,["customer_name"],""),customerEmail:y(t,["customer_email"],""),totalAmount:B(t.total_amount),financialStatus:y(t,["financial_status"],""),fulfillmentStatus:y(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function Bo(e){const t=e.config.refresh_token,n=e.config.client_id,o=e.config.client_secret;if(!t||!n||!o)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const l=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:o})});if(!l.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${l.status}`};const u=(await l.json()).access_token;return await it({...e,config:{...e.config,oauth_token:u}}),e.config.oauth_token=u,{token:u}}async function Vo(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const o=new Date().toISOString(),l=new Date(Date.now()+30*86400*1e3).toISOString(),c=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${o}&timeMax=${l}&singleEvents=true&orderBy=startTime`;let u=await fetch(c,{headers:{Authorization:`Bearer ${t}`}});if(u.status===401){const d=await Bo(e);if(d.error)return{count:0,error:d.error};t=d.token,u=await fetch(c,{headers:{Authorization:`Bearer ${t}`}})}if(!u.ok)return{count:0,error:`HTTP ${u.status}`};const a=await u.json(),{supabaseInsert:i}=await x(async()=>{const{supabaseInsert:d}=await Promise.resolve().then(()=>F);return{supabaseInsert:d}},void 0);let r=0;for(const d of a.items){const p=`gcal_${d.id}`,m=d.start?.dateTime??d.start?.date??"",h=d.end?.dateTime??d.end?.date??"";await i("calendar_events",{id:p,title:String(d.summary??"(無題)"),description:String(d.description??""),category:"general",starts_at:String(m),ends_at:String(h),location:String(d.location??""),google_event_id:String(d.id??""),updated_at:new Date().toISOString()}),r++}return await it({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${r}件取得`}),{count:r}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function Jo(){return(await D("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:y(t,["id"],""),receivedAt:y(t,["received_at"],""),senderPhone:y(t,["sender_phone"],""),senderName:y(t,["sender_name"],""),imageUrl:y(t,["image_url"],""),ocrStatus:y(t,["ocr_status"],"pending")||"pending",ocrText:y(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:y(t,["linked_invoice_id"],"")}))}async function Yo(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const o=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,l=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return l.ok?{text:(await l.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${l.status}`}}catch(o){return{text:"",error:o instanceof Error?o.message:String(o)}}}async function Uo(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const wt={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},xt={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function Qo(){return(await D("user_profiles",{order:"display_name.asc"})).map(t=>({id:y(t,["id"],""),email:y(t,["email"],""),displayName:y(t,["display_name"],""),staffCode:y(t,["staff_code"],""),department:y(t,["department"],"all")||"all",role:y(t,["role"],"staff")||"staff",defaultMailSenderId:y(t,["default_mail_sender_id"],""),phone:y(t,["phone"],""),avatarUrl:y(t,["avatar_url"],""),isActive:ee(t,["is_active"],!0),lastSignInAt:y(t,["last_sign_in_at"],""),createdAt:y(t,["created_at"],"")}))}async function Ho(e){if(!e)return null;const t=await D("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:y(n,["id"],""),email:y(n,["email"],""),displayName:y(n,["display_name"],""),staffCode:y(n,["staff_code"],""),department:y(n,["department"],"all")||"all",role:y(n,["role"],"staff")||"staff",defaultMailSenderId:y(n,["default_mail_sender_id"],""),phone:y(n,["phone"],""),avatarUrl:y(n,["avatar_url"],""),isActive:ee(n,["is_active"],!0),lastSignInAt:y(n,["last_sign_in_at"],"")}}async function Go(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function Xo(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Ko(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>F);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function Wo(e=100){return(await D("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:y(n,["id"],""),action:y(n,["action"],""),entityType:y(n,["entity_type"],""),entityId:y(n,["entity_id"],""),userEmail:y(n,["user_email"],""),changes:n.changes??{},createdAt:y(n,["created_at"],"")}))}const St={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function Zs(){return(await D("slack_notifications",{order:"event_type.asc"})).map(t=>({id:y(t,["id"],""),eventType:y(t,["event_type"],"new_order"),enabled:ee(t,["enabled"],!0),channel:y(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:y(t,["last_triggered_at"],"")}))}async function Zo(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function ei(e=50){return(await D("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:y(n,["id"],""),eventType:y(n,["event_type"],""),channel:y(n,["channel"],""),message:y(n,["message"],""),status:y(n,["status"],"sent"),error:y(n,["error"],""),sentAt:y(n,["sent_at"],"")}))}async function ti(e,t,n){const l=(await Ws()).find(r=>r.provider==="slack");if(!l||!l.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const c=l.config.webhook_url;if(!c)return{ok:!1,error:"Webhook URL未設定"};const a=(await Zs()).find(r=>r.eventType===e&&r.enabled);if(!a)return{ok:!1,error:"通知ルールが無効"};const i=n??a.channel??l.config.default_channel??"#general";try{const r=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${St[e]} ${t}`,channel:i})}),d=r.ok,{supabaseInsert:p}=await x(async()=>{const{supabaseInsert:m}=await Promise.resolve().then(()=>F);return{supabaseInsert:m}},void 0);return await p("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:i,message:t,status:d?"sent":"failed",error:d?null:`HTTP ${r.status}`}),d?{ok:!0}:{ok:!1,error:`HTTP ${r.status}`}}catch(r){return{ok:!1,error:r instanceof Error?r.message:String(r)}}}const Et={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},Sa={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function ai(){return(await D("prospects",{order:"updated_at.desc"})).map(t=>({id:y(t,["id"],""),companyName:y(t,["company_name"],""),contactName:y(t,["contact_name"],""),email:y(t,["email"],""),phone:y(t,["phone"],""),address:y(t,["address"],""),website:y(t,["website"],""),businessType:y(t,["business_type"],""),stage:y(t,["stage"],"cold"),source:y(t,["source"],""),expectedAmount:B(t.expected_amount),probability:B(t.probability),assignedStaffCode:y(t,["assigned_staff_code"],""),nextActionDate:y(t,["next_action_date"],""),nextAction:y(t,["next_action"],""),note:y(t,["note"],""),lastContactAt:y(t,["last_contact_at"],""),wonAt:y(t,["won_at"],""),lostAt:y(t,["lost_at"],""),lostReason:y(t,["lost_reason"],""),convertedCustomerCode:y(t,["converted_customer_code"],""),createdAt:y(t,["created_at"],"")}))}async function en(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()})?e:null}async function si(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/prospects","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ni(e){return(await D("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:y(n,["id"],""),prospectId:y(n,["prospect_id"],""),activityType:y(n,["activity_type"],"call"),title:y(n,["title"],""),description:y(n,["description"],""),activityDate:y(n,["activity_date"],""),result:y(n,["result"],""),staffCode:y(n,["staff_code"],"")}))}async function oi(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const tn=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function ii(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function li(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ri(){return(await Z("v_customer_map")).filter(t=>t.lat&&t.lng).map(t=>({customerCode:y(t,["customer_code"],""),name:y(t,["name"],""),phone:y(t,["phone"],""),areaCode:y(t,["area_code"],""),businessType:y(t,["business_type"],""),businessTypeName:y(t,["business_type_name"],""),address1:y(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:ee(t,["is_at_risk"],!1),isDormant:ee(t,["is_dormant"],!1),amount12m:b(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}const Lt=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function ci(){return(await Z("customer_churn_notes")).map(t=>({customerCode:y(t,["customer_code"],""),reason:y(t,["reason"],""),memo:y(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:y(t,["updated_at"],"")}))}async function di(e){const{supabaseUpsert:t}=await x(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>F);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function ui(){return(await D("delivery_locations",{order:"name.asc"})).map(t=>({id:y(t,["id"],""),customerCode:y(t,["customer_code"],""),name:y(t,["name"],""),postalCode:y(t,["postal_code"],""),address:y(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:y(t,["contact_name"],""),phone:y(t,["phone"],""),deliveryNote:y(t,["delivery_note"],""),isActive:ee(t,["is_active"],!0)}))}async function pi(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function mi(e=50){return(await D("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:y(n,["id"],""),callDirection:y(n,["call_direction"],"inbound"),fromNumber:y(n,["from_number"],""),toNumber:y(n,["to_number"],""),matchedCustomerCode:y(n,["matched_customer_code"],""),matchedProspectId:y(n,["matched_prospect_id"],""),durationSeconds:B(n.duration_seconds),callStatus:y(n,["call_status"],"answered"),recordingUrl:y(n,["recording_url"],""),transcript:y(n,["transcript"],""),ivryCallId:y(n,["ivry_call_id"],""),startedAt:y(n,["started_at"],""),endedAt:y(n,["ended_at"],""),notes:y(n,["notes"],"")}))}async function an(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function yi(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const o=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,l=await fetch(o,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!l.ok)return{count:0,error:`HTTP ${l.status}`};const u=(await l.json()).calls??[];let a=0;for(const i of u)await an({id:`ivry_${i.id}`,callDirection:String(i.direction??"inbound"),fromNumber:String(i.from??""),toNumber:String(i.to??""),durationSeconds:Number(i.duration??0),callStatus:String(i.status??"answered"),recordingUrl:String(i.recording_url??""),startedAt:String(i.started_at??""),endedAt:String(i.ended_at??""),ivryCallId:String(i.id??"")}),a++;return await it({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${a}件取得`}),{count:a}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function hi(e,t){const n=e.config.api_key,o=e.config.team_id;if(!n||!o)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let l=0;for(const c of t){if(!c.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${o}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:c.name,phone_number:c.phone,external_id:c.customerCode??"",note:c.note??""})})).ok&&l++}return{synced:l}}catch(l){return{synced:0,error:l instanceof Error?l.message:String(l)}}}async function vi(){return(await D("lead_lists",{order:"created_at.desc"})).map(t=>({id:y(t,["id"],""),name:y(t,["name"],""),query:y(t,["query"],""),area:y(t,["area"],""),businessType:y(t,["business_type"],""),totalCount:B(t.total_count),source:y(t,["source"],"manual"),createdAt:y(t,["created_at"],"")}))}async function fi(e){return(await D("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:y(n,["id"],""),listId:y(n,["list_id"],""),companyName:y(n,["company_name"],""),address:y(n,["address"],""),phone:y(n,["phone"],""),website:y(n,["website"],""),email:y(n,["email"],""),businessType:y(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:B(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:y(n,["place_id"],""),status:y(n,["status"],"new"),convertedProspectId:y(n,["converted_prospect_id"],""),note:y(n,["note"],"")}))}async function gi(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function sn(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function bi(e,t,n){const o=e.config.api_key;if(!o)return{results:[],error:"Google Maps API key 未設定"};const l=`${t} ${n}`.trim(),c=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(l)}&language=ja&key=${o}`;try{const u=await fetch(c);if(!u.ok)return{results:[],error:`HTTP ${u.status}`};const a=await u.json();return a.status!=="OK"&&a.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${a.status}`}:{results:a.results.map(r=>{const d=r.geometry?.location;return{id:`place_${r.place_id}`,listId:"",companyName:String(r.name??""),address:String(r.formatted_address??""),rating:r.rating?Number(r.rating):void 0,reviewCount:r.user_ratings_total?Number(r.user_ratings_total):void 0,lat:d?.lat,lng:d?.lng,placeId:String(r.place_id??""),status:"new"}})}}catch(u){return{results:[],error:u instanceof Error?u.message:String(u)}}}async function $i(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await en(t);return n&&await sn({...e,status:"imported",convertedProspectId:t.id}),n}async function _i(){return(await D("workflow_orders",{order:"order_date.desc"})).map(t=>({id:y(t,["id"],""),orderNo:y(t,["order_no"],""),customerName:y(t,["customer_name"],""),customerCode:y(t,["customer_code"],""),orderDate:y(t,["order_date"],""),deliveryDate:y(t,["delivery_date"],""),stage:y(t,["stage"],"new"),totalAmount:B(t.total_amount),itemCount:B(t.item_count),priority:y(t,["priority"],"normal"),staffName:y(t,["staff_name"],""),notes:y(t,["notes"],"")}))}async function wi(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function xi(){return(await D("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:y(t,["id"],""),name:y(t,["name"],""),email:y(t,["email"],""),phone:y(t,["phone"],""),visitDate:y(t,["visit_date"],""),partySize:B(t.party_size)||1,language:y(t,["language"],"ja"),purpose:y(t,["purpose"],""),message:y(t,["message"],""),status:y(t,["status"],"new"),repliedAt:y(t,["replied_at"],""),confirmedTime:y(t,["confirmed_time"],""),createdAt:y(t,["created_at"],new Date().toISOString())}))}async function Si(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const ki=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function nn(){return(await Promise.all(ki.map(async t=>{const[n,o]=await Promise.all([pa(t.table),D(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:o[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function $t(e,t,n=100){const o=(t-1)*n,[l,c]=await Promise.all([D(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(o)}),pa(e)]);return{records:l,total:c}}async function Zt(e){const t=await D("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const o=JSON.parse(n);return String(o.price_group??"")}catch{return""}return""}async function on(e,t){if(e){const o=await D("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(o.length>0&&o[0].special_price)return B(o[0].special_price)}const n=await D("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?B(n[0].default_sale_price):0}const Pi=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],Ai=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],Ci={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function Ei(){const e=new Date,t=[];for(let i=11;i>=0;i--){const r=new Date(e.getFullYear(),e.getMonth()-i,1);t.push(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`)}const n=Pi,o={},l={};for(const i of n){o[i.code]={};for(const r of t){const d=parseInt(r.split("-")[1])-1,p=Ci[i.code]??100,m=Math.round(p*Ai[d]*(.85+Math.random()*.3));o[i.code][r]=m,l[r]=(l[r]??0)+m}}const c={},u={},a={};for(const i of n){const r=t.map(m=>o[i.code][m]??0),d=r.reduce((m,h)=>m+h,0)/r.length,p=r.reduce((m,h)=>m+(h-d)**2,0)/r.length;c[i.code]=r.reduce((m,h)=>m+h,0),u[i.code]=d,a[i.code]=Math.sqrt(p)}return{months:t,products:n,matrix:o,totals:l,productTotals:c,productAvg:u,productStdDev:a}}async function Li(e=36){const t=(()=>{const m=new Date;return m.setMonth(m.getMonth()-e),`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`})(),n=await Z("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"});if(n.length===0)return Ei();const o=new Set,l=new Map,c={},u={};for(const m of n){const h=y(m,["year_month"],""),f=y(m,["product_code"],""),$=y(m,["product_name"],f),g=b(m,["quantity"],0);!h||!f||(o.add(h),l.set(f,$),c[f]||(c[f]={}),c[f][h]=g,u[h]=(u[h]??0)+g)}const a=[...o].sort(),i=[...l.entries()].map(([m,h])=>({code:m,name:h})),r={},d={},p={};for(const m of i){const h=a.map(g=>c[m.code]?.[g]??0),f=h.reduce((g,w)=>g+w,0)/(h.length||1),$=h.reduce((g,w)=>g+(w-f)**2,0)/(h.length||1);r[m.code]=h.reduce((g,w)=>g+w,0),d[m.code]=f,p[m.code]=Math.sqrt($)}return{months:a,products:i,matrix:c,totals:u,productTotals:r,productAvg:d,productStdDev:p}}async function Di(){return(await D("product_safety_stock_params",{order:"product_code.asc"})).map(t=>({productCode:y(t,["product_code"],""),productName:y(t,["product_name"],""),unit:y(t,["unit"],"本"),avgMonthlyDemand:b(t,["avg_monthly_demand"],0),demandStdDev:b(t,["demand_std_dev"],0),leadTimeDays:b(t,["lead_time_days"],30),serviceLevel:b(t,["service_level"],.95),safetyStockQty:b(t,["safety_stock_qty"],0),reorderPoint:b(t,["reorder_point"],0),memo:y(t,["memo"],""),productionType:y(t,["production_type"],"monthly")}))}async function Ii(e){return(await D("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:y(n,["id"],""),yearMonth:y(n,["year_month"],e),productCode:y(n,["product_code"],""),productName:y(n,["product_name"],""),demandForecast:b(n,["demand_forecast"],0),safetyStockTarget:b(n,["safety_stock_target"],0),openingStock:b(n,["opening_stock"],0),requiredProduction:b(n,["required_production"],0),plannedQty:b(n,["planned_qty"],0),actualQty:b(n,["actual_qty"],0),status:y(n,["status"],"draft"),productionType:y(n,["production_type"],"monthly"),notes:y(n,["notes"],"")}))}async function qi(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await x(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>F);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:l}},void 0);if(!n||e.length===0)return!1;try{const o=e.map(u=>({product_code:u.productCode,product_name:u.productName,unit:u.unit,avg_monthly_demand:u.avgMonthlyDemand,demand_std_dev:u.demandStdDev,lead_time_days:u.leadTimeDays,service_level:u.serviceLevel,safety_stock_qty:u.safetyStockQty,reorder_point:u.reorderPoint,production_type:u.productionType,memo:u.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),l=new URL("/rest/v1/product_safety_stock_params",t),c=await fetch(l.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(o)});if(!c.ok){const u=await c.text();return console.error("saveSafetyStockParamsBulk failed:",c.status,u),!1}return!0}catch(o){return console.error("saveSafetyStockParamsBulk error:",o),!1}}async function Ti(e){const{supabaseUpsert:t}=await x(async()=>{const{supabaseUpsert:o}=await Promise.resolve().then(()=>F);return{supabaseUpsert:o}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function Ni(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}async function Mi(e){const[t,n]=e.split("-").map(Number),o=`${e}-01`,l=new Date(t,n,0).getDate(),c=`${e}-${String(l).padStart(2,"0")}`,u=await Z("sales_document_headers",{select:"sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${o},sales_date.lte.${c})`,order:"sales_date.asc"}),a=await Z("customers",{select:"id,address1",address1:"not.is.null"}),i={};for(const d of a)d.address1&&(i[d.id]=Ni(d.address1));const r={};for(const d of u){const p=d.sales_date;if(!p)continue;const m=i[d.legacy_customer_code]||"住所未登録",h=Number(d.total_amount)||0;r[p]||(r[p]={date:p,entries:[],cityGroups:[],totalAmount:0,count:0}),r[p].entries.push({customerCode:d.legacy_customer_code||"",customerName:d.customer_name||"",city:m,amount:h}),r[p].totalAmount+=h,r[p].count++}for(const d of Object.values(r)){const p={};for(const m of d.entries)p[m.city]=(p[m.city]||0)+1;d.cityGroups=Object.entries(p).sort((m,h)=>h[1]-m[1]).map(([m,h])=>({city:m,count:h}))}return r}async function ka(){return D("quotes",{select:"id,quote_no,quote_date,valid_until,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function ln(e){const t=await D("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await D("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function Ri(){const e=new Date().toISOString().slice(0,7)+"-01";return Z("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}const P=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:xa,CALENDAR_CATEGORY_LABELS:wa,CHURN_REASONS:Lt,DEPT_LABELS:xt,INVOICE_TYPE_LABELS:Xt,JIKOMI_STATUS_LABELS:Fs,MATERIAL_CATEGORIES:tn,PROSPECT_STAGE_COLORS:Sa,PROSPECT_STAGE_LABELS:Et,ROLE_LABELS:wt,SEASONAL_TEMPLATES:ya,SLACK_EVENT_LABELS:St,TAX_DEDUCTION_LABELS:Wt,TAX_RATE_CATEGORIES:Hs,convertLeadToProspect:$i,deleteCalendarEvent:jo,deleteMailSender:Mo,deleteMaterial:li,deletePrintLayout:qo,deleteProspect:si,deleteUserProfile:Xo,fetchAnalyticsByPeriod:Zn,fetchAnnouncements:Ds,fetchAuditLogs:Wo,fetchAvailablePeriods:eo,fetchBillList:Us,fetchBillingSummary:ba,fetchBrewingMonthlyTrend:uo,fetchBrewingPlanSummary:co,fetchBrewingSchedule:po,fetchCalendarEvents:Ro,fetchCallLogs:mi,fetchChurnAlerts:$o,fetchChurnNotes:ci,fetchCustomerAnalysis:js,fetchCustomerEfficiency:Os,fetchCustomerLedger:va,fetchCustomerPriceGroup:Zt,fetchCustomerPricing:Ns,fetchCustomerProductBreakdown:io,fetchDeliveryLocations:ui,fetchDeliveryNote:ga,fetchDeliverySchedule:bo,fetchDemandAnalysis:Li,fetchDemandForecasts:go,fetchEntityMonthlySales:ro,fetchFaxInbox:Jo,fetchIntegrationSettings:Ws,fetchInvoices:st,fetchJikomiList:zs,fetchKenteiList:Vs,fetchLeadItems:fi,fetchLeadLists:vi,fetchMailSenders:To,fetchMapCustomers:ri,fetchMasterStats:ha,fetchMaterialList:Kt,fetchMyProfile:Ho,fetchOrderHeaders:Ri,fetchPayableList:Ys,fetchPaymentStatus:ks,fetchPeriodChartData:no,fetchPipelineMeta:Ps,fetchPrintLayouts:Do,fetchProductABC:ko,fetchProductCustomerBreakdown:lo,fetchProductDaily:So,fetchProductMonthlyShipments:fo,fetchProductPower:Rs,fetchProductPrice:on,fetchProductShipmentsFromTable:xo,fetchProductionPlan:Ii,fetchProspectActivities:ni,fetchProspects:ai,fetchPurchaseList:Js,fetchQuoteList:ka,fetchQuoteWithLines:ln,fetchRawMaterialStock:Qs,fetchRawRecords:$t,fetchRawTableList:nn,fetchSafetyStockParams:Di,fetchSalesAnalytics:fa,fetchSalesReport:Ct,fetchSalesSummary:Ss,fetchSeasonalProfiles:wo,fetchShipmentCalendar:Mi,fetchShopifyOrders:zo,fetchSlackLogs:ei,fetchSlackRules:Zs,fetchStaffCustomerBreakdown:ao,fetchStaffProductBreakdown:so,fetchStaffTotalsByPeriod:to,fetchStoreOrders:Xs,fetchStoreSales:_a,fetchSyncDashboard:As,fetchTankList:Bs,fetchTaxDeclaration:$a,fetchTourInquiriesFromDb:xi,fetchUserProfiles:Qo,fetchVisitPriorities:_o,fetchWorkflowOrdersFromDb:_i,generateTaxCSV:Co,generateTaxXML:Gs,ocrFaxImage:Yo,periodToDateRange:Cs,prevYearFilter:oo,recalculateTaxDeclaration:Eo,recordAudit:Ko,resolveProductPrice:Ms,saveBrewingSchedule:mo,saveCalendarEvent:Oo,saveCallLog:an,saveChurnNote:di,saveDeliveryLocation:pi,saveEmailCampaign:bt,saveFaxRecord:Uo,saveIntegrationSetting:it,saveInvoice:Ls,saveLeadItem:sn,saveLeadList:gi,saveMailSender:No,saveMaterial:ii,savePrintLayout:Io,saveProductionPlan:Ti,saveProspect:en,saveProspectActivity:oi,saveSafetyStockParamsBulk:qi,saveSlackRule:Zo,saveTaxDeclaration:Lo,saveTourInquiry:Si,saveUserProfile:Go,saveWorkflowOrder:wi,searchPlaces:bi,sendEmailCampaign:Ks,sendSlackNotification:ti,submitFeatureRequest:Is,syncGoogleCalendar:Vo,syncIvryCallLogs:yi,syncPhoneBookToIvry:hi,syncShopifyOrders:Fo,updateCustomer:qs,updateProduct:Ts,upsertBrewingStock:yo},Symbol.toStringTag,{value:"Module"}));function qe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Oi={open:"未締め",closed:"締め済"};function ji(e,t){const n=e.customers.map(o=>`
      <tr>
        <td>
          <div class="table-title">${o.customerName}</div>
          <div class="table-sub mono">${o.customerCode}</div>
        </td>
        <td class="numeric">${o.closingDay}日</td>
        <td class="numeric">${qe(o.salesAmount)}</td>
        <td class="numeric">${qe(o.taxAmount)}</td>
        <td class="numeric">${qe(o.prevBalance)}</td>
        <td class="numeric">${qe(o.paymentAmount)}</td>
        <td class="numeric"><strong>${qe(o.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${o.status==="closed"?"success":"warning"}">${Oi[o.status]}</span>
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
        <p class="kpi-value">${qe(e.totalBilling)}</p>
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
  `}const Fi={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},zi={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function Oa(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function rt(e){const t=zi[e],n=Fi[e].map(o=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Oa(o.title)}</p>
            <p class="category-card-description">${Oa(o.description)}</p>
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
  `}function rn(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function et(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Bi(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${rn(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${et(t.amount)}</td>
        </tr>
      `).join("")}function Vi(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${rn(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${et(t.amount)}</td>
        </tr>
      `).join("")}function Ji(e,t){return`
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
            <dd>${et(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${et(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${et(e.balanceAmount)}</dd>
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
            <tbody>${Bi(e)}</tbody>
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
            <tbody>${Vi(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function Ue(e,t,n){const o=e.findIndex(c=>c.column===t);if(o>=0){if(e[o].direction==="asc"){const u=[...e];return u[o]={column:t,direction:"desc"},u}return e.filter((u,a)=>a!==o)}const l={column:t,direction:"asc"};return n?[...e,l]:[l]}function Yi(e,t){const n=e.findIndex(c=>c.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const o=e[n].direction==="asc"?"↑":"↓",l=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${o}${l}</span>`}function O(e,t,n,o=""){return`<th class="sortable ${o}" data-sort-col="${e}">${t} ${Yi(n,e)}</th>`}function ja(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function Ve(e,t,n){return t.length===0?e:[...e].sort((o,l)=>{for(const{column:c,direction:u}of t){const a=n[c];if(!a)continue;const i=ja(o[a]),r=ja(l[a]);let d=0;if(typeof i=="number"&&typeof r=="number"?d=i-r:d=String(i).localeCompare(String(r),"ja"),d!==0)return u==="asc"?d:-d}return 0})}const Ui={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},Fa={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},Qe={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function Qi(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function Hi(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function Gi(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function cn(e,t){const n=Hi(t),o=Gi(t),[l,c]=t.split("-").map(Number),u=new Map;e.forEach(q=>{if(q.date.slice(0,7)===t){const A=q.date.slice(0,10);u.has(A)||u.set(A,[]),u.get(A).push(q)}});const a=e.filter(q=>q.date.slice(0,7)===t),i=a.reduce((q,A)=>q+A.quantity,0),r=new Set(a.map(q=>q.date)).size,d=new Date().toISOString().slice(0,10),p=["日","月","火","水","木","金","土"].map(q=>`<th class="dcal-header">${q}</th>`).join("");let m="",h=1;for(let q=0;q<6&&!(h>n&&q>0);q++){m+="<tr>";for(let A=0;A<7;A++)if(q===0&&A<o||h>n)m+='<td class="dcal-cell dcal-empty"></td>';else{const R=`${l}-${String(c).padStart(2,"0")}-${String(h).padStart(2,"0")}`,E=u.get(R)||[],C=R===d,M=E.reduce((k,I)=>k+I.quantity,0);m+=`
          <td class="dcal-cell ${C?"dcal-today":""}">
            <div class="dcal-day">${h}</div>
            ${E.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${E[0].status}">${E.length}件 ${M}本</div>
              </div>
            `:""}
          </td>`,h++}m+="</tr>"}const[f,$]=c===1?[l-1,12]:[l,c-1],[g,w]=c===12?[l+1,1]:[l,c+1],_=`${f}-${String($).padStart(2,"0")}`,L=`${g}-${String(w).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${l}年${c}月: ${r}日稼働 / ${a.length}件 / 合計${i.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${_}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${l}年${c}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${L}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${p}</tr></thead>
        <tbody>${m}</tbody>
      </table>
    </section>
  `}function Xi(e,t){const n=t==="all"?e:e.filter(a=>a.segment===t),o={all:e.length};e.forEach(a=>{o[a.segment]=(o[a.segment]??0)+1});const c=["all",...[...new Set(e.map(a=>a.segment))]].map(a=>`
      <button class="button ${t===a?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${a}">
        ${a==="all"?"全て":Fa[a]??a} (${o[a]??0})
      </button>
    `).join(""),u=n.map(a=>`
      <tr>
        <td class="mono">${a.code}</td>
        <td>${a.name}</td>
        <td><span class="segment-badge" style="background:${Qe[a.segment]??"#718096"};">${Fa[a.segment]??a.segment}</span></td>
        <td class="numeric">${a.avgMonthly>0?a.avgMonthly.toLocaleString():"—"}</td>
        <td class="numeric" style="font-weight:700;">${a.nextMonthForecast>0?a.nextMonthForecast.toLocaleString():"—"}</td>
        <td class="numeric">${a.annualForecast>0?a.annualForecast.toLocaleString():"—"}</td>
        <td class="numeric">${a.safetyStock>0?a.safetyStock.toLocaleString():"—"}</td>
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
            <li><span class="segment-badge" style="background:${Qe.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${Qe["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${Qe["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${Qe["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
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
          <tbody>${u}</tbody>
        </table>
      </div>
    </section>
  `}function Ki(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${cn(e.deliveries,e.calendarMonth)}
    ${Xi(e.forecasts,e.selectedSegment)}
  `}function Wi(e,t){return cn(e,t)}const ct={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function za(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function Tt(e,t,n){if(t==="all")return e;const o=new Date,l=o.toISOString().slice(0,10),c=new Date(o);switch(t){case"today":return e.filter(u=>u.date.slice(0,10)===l);case"month":return e.filter(u=>u.date.slice(0,7)===l.slice(0,7));case"future":{const u=new Date(o.getFullYear(),o.getMonth(),1).toISOString().slice(0,10);return e.filter(a=>a.date.slice(0,10)>=u)}case"90days":return c.setDate(c.getDate()-90),e.filter(u=>u.date>=c.toISOString());case"year":return c.setFullYear(c.getFullYear()-1),e.filter(u=>u.date>=c.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(u=>{const a=u.date.slice(0,10);return a>=n.start&&a<=n.end})}}function ie(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Nt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Zi(e){const o={top:20,right:20,bottom:30,left:50},l=760-o.left-o.right,c=260-o.top-o.bottom,u=Math.max(...e.map(d=>d.amount),1),a=l/e.length,i=e.map((d,p)=>{const m=d.amount/u*c,h=o.left+p*a+4,f=o.top+c-m,$=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(d.date));return`
        <g>
          <rect x="${h}" y="${f}" width="${Math.max(a-8,8)}" height="${m}" rx="4" fill="#0F5B8D" opacity="${.58+p/e.length*.34}" />
          ${p%5===0?`<text x="${h+6}" y="252" class="chart-axis">${$}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(d=>{const p=o.top+c-c*d,m=Math.round(u*d/1e3);return`
        <g>
          <line x1="${o.left}" y1="${p}" x2="${760-o.right}" y2="${p}" class="chart-grid" />
          <text x="6" y="${p+4}" class="chart-axis">${m.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${i}
    </svg>
  `}function el(e,t,n,o,l="month",c,u=[]){const a={success:"正常",warning:"注意",error:"異常",running:"実行中"},i=Tt(e.allDailySales,l,c),r=i.reduce((T,H)=>T+H.amount,0),d=i.reduce((T,H)=>T+H.bottles,0),p=i.reduce((T,H)=>T+H.volumeMl,0),m=i.length,h=d>0?Math.round(r/d):0,f=p>0?Math.round(r/(p/1e3)):0,$=new Date,g=$.toISOString().slice(0,10),w=g.slice(0,7),_=Tt(e.allDailySales,"month").filter(T=>T.date.slice(0,10)<=g),L=_.reduce((T,H)=>T+H.amount,0);_.reduce((T,H)=>T+H.bottles,0);const q=$.getDate();new Date($.getFullYear(),$.getMonth()+1,0).getDate();const R=(o?.orderHeaders??[]).filter(T=>T.sales_date.slice(0,7)===w),E=R.reduce((T,H)=>T+Number(H.total_amount),0),C=R.length,M=Tt(e.allDailySales,"month"),k=M.reduce((T,H)=>T+H.bottles,0),I=E>0?E:M.reduce((T,H)=>T+H.amount,0),j=E>0?"orders":"extrapolation",X=(i.length>0?e.allDailySales.filter(T=>{const H=i[0]?.date??"",Ye=i[i.length-1]?.date??"",Le=za(H,-1),De=za(Ye,-1);return T.date>=Le&&T.date<=De}):[]).reduce((T,H)=>T+H.amount,0),ne=X>0?(r-X)/X*100:0,ce=ne>0?"+":"",ge=e.salesRecords.slice(0,10).map(T=>`
            <tr>
              <td class="mono">${T.documentNo}</td>
              <td>${Nt(T.date)}</td>
              <td>${T.customerName}</td>
              <td class="numeric">${ie(T.amount)}</td>
            </tr>
          `).join(""),de=["today","month","future","90days","year","all"].map(T=>`<button class="button ${T===l?"primary":"secondary"} small" type="button" data-period="${T}">${ct[T]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${a[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${Nt(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${de}</div>
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
        <p class="kpi-value">${ie(e.kpis.todaySales)}</p>
        <p class="kpi-sub">${e.kpis.todaySales>0?`${new Date().getMonth()+1}/${new Date().getDate()} 時点`:"本日データなし"}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月実績（本日まで）</p>
        <p class="kpi-value">${ie(L)}</p>
        <p class="kpi-sub">${q}日経過 / ${_.length}営業日 / 日平均 ${_.length>0?ie(Math.round(L/_.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${ie(I)}</p>
        <p class="kpi-sub">${j==="orders"?`受注確定 ${C}件`:`出荷見込 ${k.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${ne>=0?"#2f855a":"#c53d3d"}">${X>0?`${ce}${ne.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${X>0?ie(X):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${ie(e.kpis.unpaidAmount)}</p>
      </article>
    </section>

    ${l!=="month"?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">${ct[l]}売上</p>
        <p class="kpi-value">${ie(r)}</p>
        <p class="kpi-sub">${m}日間${m>0?` / 日平均 ${ie(Math.round(r/m))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${d.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${ie(h)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(p/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${ie(f)}</p>
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
            <p class="panel-caption">${ct[l]} (${i.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${Zi(i.length>0?i:e.dailySales)}
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
              <dd>${Nt(t.lastSyncAt)}</dd>
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
          <tbody>${ge}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${ct[l]} — 売上・本数・液体量・単価（${i.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${O("date","日付",u)}
              ${O("amount","売上",u,"numeric")}
              ${O("bottles","本数",u,"numeric")}
              ${O("volumeMl","液体量(L)",u,"numeric")}
              ${O("pricePerBottle","本単価",u,"numeric")}
              ${O("pricePerLiter","L単価",u,"numeric")}
            </tr>
          </thead>
          <tbody>${Ve(u.length>0?i:i.slice().reverse(),u,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(T=>`
            <tr>
              <td class="mono">${T.date.slice(0,10)}</td>
              <td class="numeric">${ie(T.amount)}</td>
              <td class="numeric">${T.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(T.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${ie(T.pricePerBottle)}</td>
              <td class="numeric">${ie(T.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${o?tl(o):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function tl(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(a=>a.startsAt.slice(0,10)>=t).slice(0,5),o=e.tourInquiries.filter(a=>a.status==="new").length,l=e.churnSummary,c=l?l.atRiskCount+l.dormantCount+l.decliningCount:null,u=l?`<article class="panel kpi-card ${l.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
        <p class="panel-title">🔴 要対応顧客</p>
        <p class="kpi-value">${c}社</p>
        <p class="kpi-sub">離反${l.atRiskCount} / 休眠${l.dormantCount} / 下落${l.decliningCount}</p>
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
      ${u}
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
        ${l?`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
              <div style="background:#fff5f5;border:1px solid #fed7d7;padding:16px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#c53030;font-weight:600;margin-bottom:4px;">🔴 離反リスク</div>
                <div style="font-size:32px;font-weight:700;color:#c53030;">${l.atRiskCount}</div>
                <div style="font-size:11px;color:#888;">社</div>
              </div>
              <div style="background:#fffaf0;border:1px solid #fbd38d;padding:16px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#c05621;font-weight:600;margin-bottom:4px;">🟠 休眠</div>
                <div style="font-size:32px;font-weight:700;color:#c05621;">${l.dormantCount}</div>
                <div style="font-size:11px;color:#888;">社</div>
              </div>
              <div style="background:#fffff0;border:1px solid #f6e05e;padding:16px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:#975a16;font-weight:600;margin-bottom:4px;">🟡 下落中</div>
                <div style="font-size:32px;font-weight:700;color:#975a16;">${l.decliningCount}</div>
                <div style="font-size:11px;color:#888;">社</div>
              </div>
            </div>
            <p style="margin:12px 0 0;font-size:12px;color:var(--text-secondary);">対象売上合計リスク: <strong>${new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(l.totalImpact)}</strong></p>`:'<p class="empty-note" style="cursor:pointer;" data-link="/churn-alert">クリックして詳細を確認</p>'}
      </article>

      <aside class="panel">
        <div class="panel-header">
          <div><h2>📅 直近の予定</h2></div>
          <button class="button secondary" data-link="/calendar">カレンダー</button>
        </div>
        ${n.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${n.map(a=>{const i=new Date(a.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${a.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${i.getMonth()+1}/${i.getDate()} ${a.isAllDay?"終日":i.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${a.title}</div>
                  ${a.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${a.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>

    ${e.deliveries&&e.deliveries.length>0?Wi(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?al(e.orderHeaders):""}
  `}function al(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),o=new Date().toISOString().slice(0,10),l=o.slice(0,7),c=new Map;for(const p of e){const m=p.sales_date.slice(0,7),h=c.get(m)??{count:0,total:0};c.set(m,{count:h.count+1,total:h.total+Number(p.total_amount)})}const u=[...c.keys()].sort(),a=e.reduce((p,m)=>p+Number(m.total_amount),0),i=u.map(p=>{const{count:m,total:h}=c.get(p);return`<tr>
      <td class="mono" style="font-weight:700;">${p===l?`${p}（当月）`:p}</td>
      <td class="numeric">${m.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(h)}</td>
    </tr>`}).join(""),r=e.filter(p=>p.sales_date>=o).slice(0,30),d=r.map(p=>`<tr>
    <td class="mono">${p.sales_date}</td>
    <td>${p.customer_name||"―"}</td>
    <td class="numeric">${t.format(Number(p.total_amount))}</td>
  </tr>`).join("");return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>受注明細サマリー</h2>
          <p class="panel-caption">当月以降の受注 ${e.length}件</p>
        </div>
        <span style="font-size:1.2rem;font-weight:700;color:var(--accent);">${t.format(a)}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>月</th><th class="numeric">件数</th><th class="numeric">受注高</th></tr></thead>
          <tbody>${i}</tbody>
        </table>
      </div>
      ${r.length>0?`
      <div class="panel-header" style="margin-top:16px;">
        <div><h3 style="font-size:13px;font-weight:600;">本日以降の受注（${r.length}件）</h3></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>受注日</th><th>得意先</th><th class="numeric">金額</th></tr></thead>
          <tbody>${d}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function sl(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function Te(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function nl(e,t){const n=e.lines.length?e.lines.map((l,c)=>`
          <tr>
            <td class="numeric">${c+1}</td>
            <td class="mono">${l.productCode}</td>
            <td>${l.productName}</td>
            <td class="numeric">${l.quantity.toLocaleString("ja-JP")}</td>
            <td>${l.unit}</td>
            <td class="numeric">${Te(l.unitPrice)}</td>
            <td class="numeric">${Te(l.amount)}</td>
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
            <tr><th>納品日</th><td>${sl(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${Te(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${Te(o)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${Te(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${Te(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function he(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ol(e){return he(e).replaceAll(`
`,"<br />")}function il(e){const n=[...Object.values(ya),{id:"custom",season:"カスタム",subject:"",body:""}].map(l=>`
        <button
          class="template-card ${e.selectedTemplateId===l.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${l.id}"
        >
          <span class="template-card-kicker">${l.season}</span>
          <strong>${he(l.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),o=e.previewRecipients.length?e.previewRecipients.map(l=>`
            <li>
              <span>${he(l.name)}</span>
              <span class="table-sub">${he(l.email)} / ${he(l.area)}</span>
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
            ${e.senders.map(l=>`<option value="${l.id}" ${l.id===e.senderId?"selected":""}>${he(l.name)} &lt;${he(l.email)}&gt;${l.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${he(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?ol(e.body):"本文未入力"}</div>
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
  `}function ye(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function dt(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function ll(e,t){const n=[dt("得意先",t.customers.map(l=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${ye(l.name)}</strong>
            <span class="table-sub mono">${ye(l.code)}</span>
          </button>
        `)),dt("商品",t.products.map(l=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${ye(l.name)}</strong>
            <span class="table-sub mono">${ye(l.code)}</span>
          </button>
        `)),dt("伝票",t.documents.map(l=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${ye(l.documentNo)}</strong>
            <span class="table-sub">${ye(l.customerName)} / ${ye(l.date)}</span>
          </button>
        `)),dt("ページ",t.pages.map(l=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${ye(l.path)}"
          >
            <strong>${ye(l.title)}</strong>
            <span class="table-sub mono">${ye(l.path)}</span>
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
            value="${ye(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||o}
          </div>
        </div>
      </div>
    </div>
  `}function He(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function dn(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${He(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${He(e.title)}">
        <div class="modal-header">
          <h2>${He(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${He(e.placeholder)}"
            value="${He(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function ut(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ba(e){return e.trim().toLowerCase()}function rl(e,t){const n=Ba(t),o=e.filter(c=>n?[c.code,c.name,c.name].map(Ba).some(u=>u.includes(n)):!0).slice(0,50),l=o.length?`
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
              ${o.map(c=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${ut(c.code)}"
                      data-name="${ut(c.name)}"
                    >
                      <td class="mono">${ut(c.code)}</td>
                      <td>${ut(c.name)}</td>
                      <td>${c.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return dn({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:l,emptyMessage:"該当する得意先が見つかりません。"})}function cl(e){return e.toISOString().slice(0,10)}function Ee(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Se(e,t){return e[t]?`<div class="field-error">${Ee(e[t])}</div>`:""}function Ne(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function dl(e,t,n,o){const l=Object.keys(Xt).map(i=>`<option value="${i}" ${e.invoiceType===i?"selected":""}>${Xt[i]}</option>`).join(""),c=e.lines.map((i,r)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${Ne(o,`lines.${r}.productCode`,"input-cell")}" type="text" data-line="${r}" data-field="productCode" value="${Ee(i.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${r}" aria-label="商品検索">🔍</button>
          </div>
          ${Se(o,`lines.${r}.productCode`)}
        </td>
        <td>
          <input class="${Ne(o,`lines.${r}.productName`,"input-cell")}" type="text" data-line="${r}" data-field="productName" value="${Ee(i.productName)}" placeholder="商品名" />
          ${Se(o,`lines.${r}.productName`)}
        </td>
        <td>
          <input class="${Ne(o,`lines.${r}.quantity`,"input-cell numeric")}" type="number" data-line="${r}" data-field="quantity" value="${i.quantity}" min="0" />
          ${Se(o,`lines.${r}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${r}" data-field="unit" value="${i.unit}" placeholder="本" /></td>
        <td>
          <input class="${Ne(o,`lines.${r}.unitPrice`,"input-cell numeric")}" type="number" data-line="${r}" data-field="unitPrice" value="${i.unitPrice}" min="0" />
          ${Se(o,`lines.${r}.unitPrice`)}
        </td>
        <td class="numeric">${i.amount>0?i.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${r}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${r}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),u=e.lines.reduce((i,r)=>i+r.amount,0),a=Math.floor(u*10/110);return`
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
          <select id="inv-type">${l}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${Ne(o,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||cl(new Date)}" />
          ${Se(o,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${Ne(o,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${Ee(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${Se(o,"customerCode")}
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
      ${Se(o,"lines")}
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
          <span class="total-value">${(u-a).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${a.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${u.toLocaleString("ja-JP")} 円</span>
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
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function ul(e){return"¥"+e.toLocaleString("ja-JP")}function pl(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const ml={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},yl={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},hl={sake:"酒販用",standard:"通常"};function vl(e,t){return`
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
          <tbody>${t?'<tr><td colspan="8" class="empty-row">読み込み中…</td></tr>':e.length===0?'<tr><td colspan="8" class="empty-row">見積書がありません</td></tr>':e.map(o=>`
      <tr>
        <td class="mono">${o.quote_no}</td>
        <td>${pl(o.quote_date)}</td>
        <td>${o.customer_name||"（未選択）"}</td>
        <td>${o.subject||""}</td>
        <td class="numeric">${ul(o.total_amount)}</td>
        <td><span class="badge ${yl[o.status]??"badge-gray"}">${ml[o.status]??o.status}</span></td>
        <td>${hl[o.template_type]??o.template_type}</td>
        <td>
          <button class="button secondary small" data-open-quote="${o.id}">開く</button>
          <button class="button secondary small danger" data-delete-quote="${o.id}" data-quote-no="${o.quote_no}">削除</button>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}const un="kanei-quote-settings",pn=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Mt={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",billingName:"株式会社金井酒造",billingPostal:"257-0014",billingAddress:"神奈川県秦野市堀山下182",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function Va(){try{const e=localStorage.getItem(un);if(e)return{...Mt,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Mt,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Mt}}function Me(e){localStorage.setItem(un,JSON.stringify(e))}function $e(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function le(e,t,n,o="text",l=""){return`<div class="form-row"><label>${t}</label><input type="${o}" id="${e}" value="${$e(n)}" placeholder="${$e(l)}" /></div>`}function fl(e){return`
    <section class="page-head">
      <div><p class="eyebrow">見積書</p><h1>会社・請求先設定</h1></div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="save-quote-settings">保存</button>
        <a class="button secondary" href="/quote" data-link="/quote">← 見積一覧</a>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>発行元（自社情報）</h2></div>
      <div class="form-grid-2">
        ${le("qs-company-name","会社名",e.companyName)}
        ${le("qs-company-postal","郵便番号",e.companyPostal,"text","257-0014")}
        ${le("qs-company-addr1","住所1",e.companyAddress1)}
        ${le("qs-company-addr2","住所2",e.companyAddress2,"text","建物名等")}
        ${le("qs-company-tel","電話番号",e.companyTel)}
        ${le("qs-company-fax","FAX番号",e.companyFax)}
        ${le("qs-company-email","メール",e.companyEmail,"email")}
        ${le("qs-company-regno","適格請求書番号",e.companyRegistrationNo,"text","T1234567890123")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>請求書送付先</h2></div>
      <div class="form-grid-2">
        ${le("qs-billing-name","宛名",e.billingName)}
        ${le("qs-billing-postal","郵便番号",e.billingPostal)}
        ${le("qs-billing-address","住所",e.billingAddress)}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>見積書デフォルト設定</h2></div>
      <div class="form-grid-2">
        ${le("qs-payment-terms","支払条件",e.defaultPaymentTerms,"text","月末締め翌月末払い")}
        ${le("qs-header-note","書類上部メモ",e.defaultHeaderNote,"text","下記のとおりお見積り申し上げます。")}
        ${le("qs-footer-note","書類下部メモ",e.defaultFooterNote)}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>カラーテーマ</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;">見積書のアクセントカラーを設定します。プリセットから選ぶか、カスタムカラーを指定してください。</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px;">
        ${pn.map(t=>`
          <button
            type="button"
            data-action="set-accent-color"
            data-color="${$e(t.value)}"
            title="${$e(t.label)}"
            style="width:36px;height:36px;border-radius:6px;border:3px solid ${e.accentColor===t.value?"#333":"transparent"};background:${$e(t.value)};cursor:pointer;transition:border-color 0.15s;"
          ></button>
        `).join("")}
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
          カスタム
          <input type="color" id="qs-accent-color" value="${$e(e.accentColor||"#0968e5")}" style="width:36px;height:36px;border:none;border-radius:4px;cursor:pointer;padding:2px;" />
        </label>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:12px;color:var(--text-secondary);">現在の色:</span>
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:${$e(e.accentColor||"#0968e5")};border:1px solid rgba(0,0,0,0.15);"></span>
          <code style="font-size:12px;">${$e(e.accentColor||"#0968e5")}</code>
        </span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>社印</h2></div>
      <div class="quote-seal-area">
        ${e.sealImageDataUrl?`
          <div class="quote-seal-preview">
            <img src="${e.sealImageDataUrl}" alt="社印" style="width:${e.sealSize}px;height:${e.sealSize}px;border-radius:50%;" />
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
  `}function gl(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function Pa(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:gl(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}Pa();function N(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function pe(e){return"¥"+e.toLocaleString("ja-JP")}function Rt(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function mn(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function yn(e,t,n){return"#"+[e,t,n].map(o=>Math.max(0,Math.min(255,Math.round(o))).toString(16).padStart(2,"0")).join("")}function pt(e,t){const[n,o,l]=mn(e);return yn(n+(255-n)*t,o+(255-o)*t,l+(255-l)*t)}function bl(e,t){const[n,o,l]=mn(e);return yn(n*(1-t),o*(1-t),l*(1-t))}function hn(e){const t=bl(e,.15),n=pt(e,.88),o=pt(e,.96),l=pt(e,.94),c=pt(e,.62);return`
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:11px; color:#1a1a2e; padding:16mm 18mm; }
.q-doc { max-width: 720px; margin: 0 auto; }
.q-title-row { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; border-bottom:3px solid ${e}; padding-bottom:8px; }
.q-title { font-size:20px; font-weight:700; letter-spacing:0.3em; color:${e}; }
.q-meta-table { font-size:10px; border-collapse:collapse; }
.q-meta-table th { text-align:right; padding:1px 6px 1px 0; color:#555; white-space:nowrap; }
.q-meta-table td { font-weight:600; text-align:right; }
.q-parties { display:flex; justify-content:space-between; gap:16px; margin-bottom:14px; }
.q-customer { flex:1; }
.q-customer-name { font-size:16px; font-weight:700; border-bottom:1px solid #333; padding-bottom:3px; margin-bottom:3px; }
.q-customer-addr { font-size:10px; color:#555; }
.q-seller { width:195px; background:${l}; border:1px solid ${c}; border-radius:4px; padding:10px 12px 10px 12px; font-size:10px; min-height:90px; }
.q-seller-name { font-size:13px; font-weight:700; margin-bottom:4px; }
.q-seller-sub { color:#444; margin-top:1px; }
.q-regno { color:#777; font-size:9px; }
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
.q-conditions { width:55%; border-collapse:collapse; margin-bottom:12px; font-size:10px; }
.q-conditions th { background:#f0f0f0; padding:4px 8px; text-align:left; border:1px solid #ccc; width:90px; font-weight:600; }
.q-conditions td { padding:4px 8px; border:1px solid #ccc; }
.q-remarks { border:1px solid #ddd; padding:8px; font-size:10px; margin-bottom:10px; border-radius:3px; }
.q-remarks-label { font-weight:700; margin-bottom:3px; }
.q-footer-note { font-size:9px; color:#777; margin-bottom:8px; }
.billing-box { border-top:1px solid #e0e0e0; padding-top:8px; font-size:10px; color:#555; line-height:1.6; }
@media print { body { padding:10mm 12mm; } }
`}function vn(e,t){const n=e.lines.reduce((m,h)=>m+h.amount,0),o=Math.round(n*e.taxRate/100),l=n+o,c=e.templateType==="sake",u=c?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",a=c?9:6,i=e.lines.map((m,h)=>{const f=c?`<td style="font-size:9px;">${N(m.janCode)}</td><td style="text-align:center;">${m.caseQty??""}</td><td style="text-align:right;">${m.retailPrice!=null?pe(m.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${h+1}</td>
      <td class="mono" style="font-size:9px;">${N(m.productCode)}</td>
      <td>${N(m.productName)}</td>
      ${f}
      <td style="text-align:right;">${m.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${N(m.unit)}</td>
      <td style="text-align:right;">${pe(m.unitPrice)}</td>
      <td style="text-align:right;">${pe(m.amount)}</td>
    </tr>`}).join("")||`<tr><td colspan="${a}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,r=[];e.validUntil&&r.push(`<tr><th>有効期限</th><td>${Rt(e.validUntil)}</td></tr>`),e.paymentTerms&&r.push(`<tr><th>支払条件</th><td>${N(e.paymentTerms)}</td></tr>`),e.deliveryDate&&r.push(`<tr><th>納期</th><td>${N(e.deliveryDate)}</td></tr>`),e.deliveryPlace&&r.push(`<tr><th>納品場所</th><td>${N(e.deliveryPlace)}</td></tr>`);const d=t.billingName||t.billingAddress?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【請求書送付先】</p>
      ${t.billingPostal?`<p>〒${N(t.billingPostal)}</p>`:""}
      ${t.billingAddress?`<p>${N(t.billingAddress)}</p>`:""}
      ${t.billingName?`<p>${N(t.billingName)}</p>`:""}
    </div>
  `:"",p=t.sealImageDataUrl?`
    <div style="position:absolute;right:0;top:0;">
      <img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;border-radius:0;opacity:0.9;" />
    </div>`:"";return`
<div class="q-doc">
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <table class="q-meta-table">
      ${e.quoteNo?`<tr><th>見積番号</th><td style="text-align:right;">${N(e.quoteNo)}</td></tr>`:""}
      <tr><th>見積日</th><td style="text-align:right;">${Rt(e.quoteDate)}</td></tr>
      ${e.validUntil?`<tr><th>有効期限</th><td style="text-align:right;">${Rt(e.validUntil)}</td></tr>`:""}
    </table>
  </div>

  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${N(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${N(e.customerAddress)}</p>`:""}
    </div>
    <div class="q-seller" style="position:relative;">
      ${p}
      <p class="q-seller-name">${N(t.companyName)}</p>
      ${t.companyPostal?`<p class="q-seller-sub">〒${N(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${N(t.companyAddress1)}${t.companyAddress2?" "+N(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${N(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${N(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${N(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${pe(l)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${N(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${N(t.defaultHeaderNote)}</p>`:""}

  <table class="q-items">
    <thead>
      <tr>
        <th style="width:28px;">No.</th>
        <th style="width:60px;">品番</th>
        <th>品名</th>
        ${u}
        <th style="width:42px;">数量</th>
        <th style="width:32px;">単位</th>
        <th style="width:80px;">${c?"納入価格":"単価"}</th>
        <th style="width:90px;">金額</th>
      </tr>
    </thead>
    <tbody>${i}</tbody>
    <tfoot>
      <tr><td colspan="${a-1}" style="text-align:right;">小計</td><td style="text-align:right;">${pe(n)}</td></tr>
      <tr><td colspan="${a-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${pe(o)}</td></tr>
      <tr class="q-total-row"><td colspan="${a-1}" style="text-align:right;">合計</td><td style="text-align:right;">${pe(l)}</td></tr>
    </tfoot>
  </table>

  ${r.length>0?`<table class="q-conditions">${r.join("")}</table>`:""}

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${N(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${N(t.defaultFooterNote)}</p>`:""}

  ${d}
</div>`}function fn(e,t,n,o,l,c,u){const a=e.lines.reduce((f,$)=>f+$.amount,0),i=Math.round(a*e.taxRate/100),r=a+i,d=e.templateType==="sake",p=o.length>=1?t.filter(f=>f.name.includes(o)||f.code.includes(o)).slice(0,8):[],m=l.length>=1?n.filter(f=>f.name.includes(l)||f.code.includes(l)).slice(0,8):[];if(e.previewMode)return`
      <section class="page-head">
        <div><p class="eyebrow">見積書</p><h1>プレビュー</h1></div>
        <div class="meta-stack">
          <button class="button secondary" type="button" data-action="quote-edit-mode">← 編集に戻る</button>
          <button class="button primary" type="button" data-action="quote-download-pdf">PDF ダウンロード</button>
          <button class="button secondary" type="button" data-action="save-quote">保存</button>
        </div>
      </section>
      <div style="background:white;border:1px solid #ddd;border-radius:6px;padding:24px;margin-top:8px;">
        ${vn(e,u)}
      </div>
      <style>${hn(u.accentColor||"#0968e5")}</style>
    `;const h=e.lines.map((f,$)=>{const g=d?`
      <td><input type="text" class="jan-input" data-line-idx="${$}" value="${N(f.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${$}" value="${f.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${$}" value="${f.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${N(f.productCode)}</td>
      <td>${N(f.productName)}</td>
      ${g}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${$}" value="${f.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${N(f.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${$}" value="${f.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${pe(f.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${$}">×</button></td>
    </tr>`}).join("")||`<tr><td colspan="${d?10:7}" style="text-align:center;color:var(--text-secondary);padding:20px;">商品を検索して追加</td></tr>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">見積書</p>
        <h1>${e.id?"見積編集":"新規見積"}</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" type="button" data-action="save-quote">保存</button>
        <button class="button secondary" type="button" data-action="quote-preview-mode">プレビュー</button>
        <button class="button secondary" type="button" data-action="quote-download-pdf">PDF</button>
        <button class="button secondary" type="button" data-action="quote-back-list">← 一覧</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>基本情報</h2></div>
      <div class="form-row" style="margin-bottom:12px;">
        <label>カラーテーマ</label>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;align-items:center;">
          ${pn.map(f=>`
            <button type="button" data-action="set-accent-color" data-color="${N(f.value)}" title="${N(f.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${u.accentColor===f.value?"#333":"transparent"};background:${N(f.value)};cursor:pointer;"></button>
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
          <input type="text" id="q-no" value="${N(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${N(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${N(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${N(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${N(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${N(o)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${p.length>0?`<div class="search-results">${p.map(f=>`
        <button class="search-item" type="button" data-select-customer="${f.code}" data-cust-name="${N(f.name)}" data-cust-addr="${N(f.address1||"")}">
          <span class="mono">${f.code}</span> ${N(f.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName?`<div class="selected-item"><span class="mono">${N(e.customerCode)}</span> <strong>${N(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${N(e.customerAddress)}</span>`:""}</div>`:""}
    </section>

    <section class="panel">
      <div class="panel-header"><h2>明細</h2></div>
      <div class="form-row">
        <input type="text" id="q-prod-search" value="${N(l)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${m.length>0?`<div class="search-results">${m.map(f=>{const $=c?Ms(f,c):{price:f.salePrice||0,label:"標準価格"},g=$.label!=="標準価格";return`<button class="search-item" type="button" data-add-product="${f.code}" data-prod-name="${N(f.name)}" data-prod-price="${$.price}" data-prod-jan="${N(f.janCode??"")}" data-prod-case="${f.caseQty??""}">
          <span class="mono">${f.code}</span> ${N(f.name)}
          <span class="numeric" ${g?'style="color:#2f855a;font-weight:700;"':""}>${$.price?pe($.price):""} <small>(${$.label})</small></span>
        </button>`}).join("")}</div>`:""}

      <div class="table-wrap" style="margin-top:10px;">
        <table>
          <thead>
            <tr>
              <th>品番</th><th>品名</th>
              ${d?'<th>JANコード</th><th>入数</th><th class="numeric">希望小売価格</th>':""}
              <th class="numeric">数量</th><th>単位</th><th class="numeric">${d?"納入価格":"単価"}</th><th class="numeric">金額</th><th></th>
            </tr>
          </thead>
          <tbody>${h}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="3">${N(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${pe(a)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${pe(i)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${pe(r)}</span></div>
        </div>
      </div>
    </section>
  `}function $l(e,t){const n=vn(e,t),o=window.open("","_blank","width=860,height=1100");if(!o){alert("ポップアップがブロックされました。許可してください。");return}o.document.write(`<!DOCTYPE html>
<html lang="ja"><head><meta charset="UTF-8" />
<title>見積書 ${e.quoteNo||""}</title>
<style>${hn(t.accentColor||"#0968e5")}</style>
</head><body>${n}
<script>window.onload=function(){window.print();}<\/script>
</body></html>`),o.document.close()}function Ot(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function gn(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function bn(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function $n(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function _l(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function wl(e,t,n,o,l){const c=new Map,u=new Map;for(const d of e){if(d.date>=t&&d.date<=n){const p=c.get(d.productCode);p?(p.amt+=d.amount,p.qty+=d.qty):c.set(d.productCode,{name:d.productName,vol:d.volumeMl,amt:d.amount,qty:d.qty})}d.date>=o&&d.date<=l&&u.set(d.productCode,(u.get(d.productCode)??0)+d.amount)}const a=[...c.entries()].map(([d,p])=>({code:d,...p})).sort((d,p)=>p.amt-d.amt),i=a.reduce((d,p)=>d+p.amt,0);let r=0;return a.map(d=>{r+=d.amt;const p=i>0?Math.round(d.amt*1e4/i)/100:0,m=r<=i*.7?"A":r<=i*.9?"B":"C",h=u.get(d.code)??0,f=h>0?Math.round((d.amt-h)/h*1e3)/10:null;return{code:d.code,name:d.name,volumeMl:d.vol,amount:d.amt,qty:d.qty,sharePct:p,rank:m,prevAmount:h,growthRate:f}})}function xl(e,t,n){const o=new Date,l=o.toISOString().slice(0,10);let c=l,u=l,a="";switch(e){case"week":{const d=new Date(o);d.setDate(d.getDate()-7),c=d.toISOString().slice(0,10),u=l,a="直近7日間";break}case"month":{c=l.slice(0,7)+"-01",u=l,a="当月";break}case"90days":{const d=new Date(o);d.setDate(d.getDate()-90),c=d.toISOString().slice(0,10),u=l,a="直近90日間";break}case"year":{const d=new Date(o);d.setFullYear(d.getFullYear()-1),c=d.toISOString().slice(0,10),u=l,a="直近1年間";break}case"custom":{c=t||l,u=n||l,a=`${c} 〜 ${u}`;break}}const i=new Date(c);i.setFullYear(i.getFullYear()-1);const r=new Date(u);return r.setFullYear(r.getFullYear()-1),{start:c,end:u,prevStart:i.toISOString().slice(0,10),prevEnd:r.toISOString().slice(0,10),label:a}}function Sl(e,t="all",n=[],o="year",l,c,u=[]){const a=xl(o,l,c),i=n.length>0?wl(n,a.start,a.end,a.prevStart,a.prevEnd):e.map(_=>({code:_.code,name:_.name,volumeMl:_.volumeMl,amount:_.yearAmount,qty:_.yearQty,sharePct:_.sharePct,rank:_.rank,prevAmount:_.prevAmount,growthRate:_.growthRate})),r=i.filter(_=>_.rank==="A").length,d=i.filter(_=>_.rank==="B").length,p=i.filter(_=>_.rank==="C").length,m=i.filter(_=>_.growthRate!=null&&_.growthRate>10),h=i.filter(_=>_.growthRate!=null&&_.growthRate<-10);let f=i,$="全商品";switch(t){case"A":f=i.filter(_=>_.rank==="A"),$="Aランク";break;case"B":f=i.filter(_=>_.rank==="B"),$="Bランク";break;case"C":f=i.filter(_=>_.rank==="C"),$="Cランク";break;case"growing":f=m,$="成長商品(+10%以上)";break;case"declining":f=h,$="衰退商品(-10%以下)";break}const g=(_,L,q)=>`<button class="button ${t===_?"primary":"secondary"} small" data-product-filter="${_}">${L} (${q})</button>`,w=(_,L)=>`<button class="button ${o===_?"primary":"secondary"} small" data-product-period="${_}">${L}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${w("week","週次")}
        ${w("month","月次")}
        ${w("90days","90日")}
        ${w("year","年間")}
        ${w("custom","指定期間")}
      </div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="pp-range-start" class="range-input" value="${l||""}" />
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
        <p class="kpi-value">${m.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${h.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${$} (${f.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${g("all","全て",i.length)}
        ${g("A","A",r)}
        ${g("B","B",d)}
        ${g("C","C",p)}
        ${g("growing","成長",m.length)}
        ${g("declining","衰退",h.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${O("rank","ABC",u)}
              ${O("name","商品名",u)}
              ${O("amount","売上",u,"numeric")}
              ${O("sharePct","構成比",u,"numeric")}
              ${O("qty","本数",u,"numeric")}
              ${O("growthRate","前年同期比",u,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${Ve(f,u,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(_=>`
              <tr>
                <td>${bn(_.rank)}</td>
                <td>${_.name?_.name.slice(0,25):_.code}${_.volumeMl?` <small>${_.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${gn(_.amount)}</td>
                <td class="numeric">${_.sharePct}%</td>
                <td class="numeric">${_.qty.toLocaleString()}</td>
                <td class="numeric">${$n(_.growthRate)}</td>
              </tr>
            `).join("")}
            ${f.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function kl(e,t=[]){const n=e.filter(c=>c.currentRank==="A").length,o=e.filter(c=>c.prevRank&&c.currentRank<c.prevRank).length,l=e.filter(c=>c.prevRank&&c.currentRank>c.prevRank).length;return`
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
        <p class="kpi-value">${o} 社</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${l} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先ABC分析（年間売上構成比）</h2></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${O("currentRank","ABC",t)}
              ${O("name","得意先名",t)}
              ${O("yearAmount","年間売上",t,"numeric")}
              ${O("sharePct","構成比",t,"numeric")}
              ${O("orderDays","受注日数",t,"numeric")}
              ${O("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${Ve(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).slice(0,50).map(c=>`
              <tr>
                <td>${bn(c.currentRank)}</td>
                <td>${c.name||c.code}</td>
                <td class="numeric">${gn(c.yearAmount)}</td>
                <td class="numeric">${c.sharePct}%</td>
                <td class="numeric">${c.orderDays}日</td>
                <td class="numeric">${$n(c.growthRate)}</td>
                <td>${_l(c.currentRank,c.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Pl(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Al(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Cl(e,t){const n=e.length?e.map(o=>`
            <tr>
              <td class="mono">${o.documentNo}</td>
              <td>${Pl(o.date)}</td>
              <td>
                <div class="table-title">${o.customerName}</div>
                <div class="table-sub mono">${o.customerCode}</div>
              </td>
              <td class="numeric">${o.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Al(o.amount)}</td>
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
  `}function El(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Ll(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function _n(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function wn(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function Ja(e){const t=_n(wn(e),6);return t.setHours(23,59,59,999),t}function Ya(e){return new Date(`${e}T00:00:00`)}function Ua(e){return`${e.getMonth()+1}/${e.getDate()}`}function Dl(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Il(){const e=new Date,t=wn(Ll(El(e),-3)),n=Ja(new Date(e.getFullYear(),e.getMonth()+4,0)),o=[];let l=new Date(t);for(;l<=n;){const c=Ja(l);o.push({start:new Date(l),end:c,label:`${Ua(l)} - ${Ua(c)}`}),l=_n(l,7)}return o}function ql(e){const t=Il(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,o=t.map(c=>`
        <div class="gantt-week">
          <span>${c.label}</span>
        </div>
      `).join(""),l=e.length?e.map(c=>{const u=Ya(c.startDate),a=Ya(c.expectedDoneDate),i=Math.max(0,t.findIndex(p=>p.end>=u)),r=Math.max(i,t.reduce((p,m,h)=>m.start<=a?h:p,i)),d=[`仕込番号: ${c.jikomiNo}`,`銘柄: ${c.productName}`,`期間: ${c.startDate} - ${c.expectedDoneDate}`,`タンク: ${c.tankNo}`,`備考: ${c.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${c.jikomiNo}</strong>
                <span class="table-sub">${c.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${c.status}"
                  style="grid-column:${i+1} / ${r+2}"
                  title="${Dl(d)}"
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
          ${o}
        </div>
        ${l}
      </div>
    </section>
  `}function Qa(e,t){const n={planned:"neutral",active:"warning",done:"success"},o=e.map(a=>`
      <tr>
        <td class="mono">${a.jikomiNo}</td>
        <td>${a.productName}</td>
        <td>${a.riceType}</td>
        <td class="numeric">${a.plannedKg.toLocaleString("ja-JP")} kg</td>
        <td class="numeric">${a.actualKg>0?a.actualKg.toLocaleString("ja-JP")+" kg":"―"}</td>
        <td>${a.startDate}</td>
        <td>${a.expectedDoneDate}</td>
        <td class="mono">${a.tankNo}</td>
        <td>
          <span class="status-pill ${n[a.status]}">${Fs[a.status]}</span>
        </td>
        <td>${a.note||"―"}</td>
      </tr>
    `).join(""),l=e.filter(a=>a.status==="active").length,c=e.filter(a=>a.status==="done").length,u=e.filter(a=>a.status==="planned").length;return`
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
        <p class="kpi-value">${l} 本</p>
        <p class="kpi-sub">アクティブ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">計画中</p>
        <p class="kpi-value">${u} 本</p>
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
          <tbody>${o||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Tl(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},o=e.map(i=>`
      <tr>
        <td class="mono">${i.kenteiNo}</td>
        <td class="mono">${i.jikomiNo}</td>
        <td>${i.productName}</td>
        <td>${i.kenteiDate}</td>
        <td class="numeric">${i.alcoholDegree>0?i.alcoholDegree.toFixed(1)+"度":"―"}</td>
        <td class="numeric">${i.extractDegree>0?i.extractDegree.toFixed(1):"―"}</td>
        <td class="numeric">${i.sakaMeterValue!==0?i.sakaMeterValue.toFixed(1):"―"}</td>
        <td class="numeric">${i.volume>0?i.volume.toLocaleString("ja-JP")+" L":"―"}</td>
        <td>${i.taxCategory}</td>
        <td>
          <span class="status-pill ${n[i.status]}">${t[i.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${i.id}">
            ${i.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),l=e.filter(i=>i.status==="approved").length,c=e.filter(i=>i.status==="submitted").length,u=e.filter(i=>i.status==="pending").length;return`
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
        <p class="kpi-value">${e.filter(i=>i.status==="approved").reduce((i,r)=>i+r.volume,0).toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">酒税対象</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">申請中</p>
        <p class="kpi-value">${c} 件</p>
        <p class="kpi-sub">税務署確認待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">未実施</p>
        <p class="kpi-value">${u} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>検定一覧</h2>
          <p class="panel-caption">承認済 ${l} 件 / 合計 ${e.length} 件</p>
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
  `}function Nl(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ml(e,t){return`
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
        ${e?`<p class="field-error">${Nl(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function Rl(e){return`
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
  `}function Ol(e){return`
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
  `}const Aa={query:"",businessType:"",areaCode:"",activeOnly:"",page:1},tt=50;function jl(e,t){let n=e;if(t.query){const a=t.query.toLowerCase();n=n.filter(i=>i.code.toLowerCase().includes(a)||i.name.toLowerCase().includes(a)||i.kanaName&&i.kanaName.toLowerCase().includes(a)||i.address1&&i.address1.toLowerCase().includes(a)||i.phone&&i.phone.toLowerCase().includes(a))}t.businessType&&(n=n.filter(a=>a.businessType===t.businessType)),t.areaCode&&(n=n.filter(a=>a.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(a=>a.isActive):t.activeOnly==="inactive"&&(n=n.filter(a=>!a.isActive));const o=Math.max(1,Math.ceil(n.length/tt)),c=(Math.min(t.page,o)-1)*tt,u=n.slice(c,c+tt);return{filtered:n,paged:u,totalPages:o}}function Ha(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const o=(t-1)*tt+1,l=Math.min(t*tt,e),c=[];for(let u=1;u<=n;u++)u===1||u===n||u>=t-2&&u<=t+2?c.push(`<button class="button ${u===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${u}" style="min-width:36px;padding:4px 8px;">${u}</button>`):(u===t-3||u===t+3)&&c.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${o}-${l} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${c.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function Fl(e,t){const n=[...new Set(e.map(l=>l.businessType).filter(Boolean))].sort(),o=[...new Set(e.map(l=>l.areaCode).filter(Boolean))].sort();return`
    <div style="display:flex;gap:8px;align-items:end;flex-wrap:wrap;padding:12px 0;">
      <div class="form-group" style="flex:1;min-width:200px;">
        <label class="form-label">検索</label>
        <input type="text" id="master-search" class="form-input" placeholder="コード・名前・カナ・住所・電話" value="${t.query}">
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">業態</label>
        <select id="master-business-type" class="form-input">
          <option value="">すべて</option>
          ${n.map(l=>`<option value="${l}" ${t.businessType===l?"selected":""}>${l}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">地区</label>
        <select id="master-area-code" class="form-input">
          <option value="">すべて</option>
          ${o.map(l=>`<option value="${l}" ${t.areaCode===l?"selected":""}>${l}</option>`).join("")}
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
  `}function ea(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function zl(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}function Bl(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${zl(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${ea(t.address1||"",16)}</td>
          <td>${ea(t.address2||"",12)}</td>
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
      `).join("")}function mt(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function Vl(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${ea(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${mt(t.purchasePrice)}</td>
          <td class="numeric">${mt(t.salePrice)}</td>
          <td class="numeric">${mt(t.listPrice)}</td>
          <td class="numeric">${mt(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function Jl(e,t,n=Aa,o=[]){const{filtered:l,paged:c,totalPages:u}=jl(e.customers,n);return`
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
        ${Fl(e.customers,n)}
        ${Ha(l.length,n.page,u)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${O("code","コード",o)}
                ${O("name","得意先名",o)}
                ${O("kanaName","カナ",o)}
                <th>略称</th>
                ${O("businessType","業態",o)}
                <th>販売区分</th>
                <th>価格区分</th>
                <th>単価G</th>
                <th>電話</th>
                <th>FAX</th>
                <th>〒</th>
                <th>住所1</th>
                <th>住所2</th>
                <th>担当</th>
                ${O("areaName","地区",o)}
                ${O("closingDay","締日",o,"numeric")}
                ${O("paymentDay","支払日",o,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Bl(Ve(c,o,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${Ha(l.length,n.page,u)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${O("code","コード",o)}
                ${O("name","商品名",o)}
                <th>カナ</th>
                ${O("category","分類",o)}
                <th>酒税区分</th>
                ${O("alcoholDegree","度数",o,"numeric")}
                ${O("volumeMl","容量ml",o,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${O("purchasePrice","生産者価格",o,"numeric")}
                ${O("salePrice","卸価格",o,"numeric")}
                ${O("listPrice","定価(小売)",o,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Vl(Ve(e.products,o,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function jt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Yl(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${tn.map(o=>`<option ${n?.materialType===o?"selected":""}>${o}</option>`).join("")}
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
  `}function Ul(e){const t=e.map(l=>{const u=(l.minimumStock>0?l.currentStock/l.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${l.code}</td>
          <td>${l.name}</td>
          <td class="numeric ${u?"text-danger":""}">
            ${l.currentStock.toLocaleString("ja-JP")} ${l.unit}
            ${u?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${l.minimumStock.toLocaleString("ja-JP")} ${l.unit}</td>
          <td class="numeric">${jt(l.unitCost)}</td>
          <td class="numeric">${jt(l.currentStock*l.unitCost)}</td>
          <td>${l.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${l.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(l=>l.minimumStock>0&&l.currentStock/l.minimumStock<1.5).length,o=e.reduce((l,c)=>l+c.currentStock*c.unitCost,0);return`
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
        <p class="kpi-value">${jt(o)}</p>
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
  `}function Ql(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function Ft(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Hl={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Gl(e){return`
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
          <td class="numeric">${Ft(n.billedAmount)}</td>
          <td class="numeric">${Ft(n.paymentAmount)}</td>
          <td class="numeric">${Ft(n.balanceAmount)}</td>
          <td>${Ql(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${Hl[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function Re(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ga(e){return e.trim().toLowerCase()}function Xl(e,t){const n=Ga(t),o=e.filter(c=>n?[c.code,c.name,c.janCode].map(Ga).some(u=>u.includes(n)):!0),l=o.length?`
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
              ${o.map(c=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${Re(c.code)}"
                      data-name="${Re(c.name)}"
                    >
                      <td class="mono">${Re(c.code)}</td>
                      <td>${Re(c.name)}</td>
                      <td class="mono">${Re(c.janCode)}</td>
                      <td>${Re(c.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return dn({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:l,emptyMessage:"該当する商品が見つかりません。"})}function ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Kl(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},o={pending:"warning",confirmed:"neutral",paid:"success"},l={unpaid:"未払い",partial:"一部支払",paid:"支払済"},c={unpaid:"warning",partial:"neutral",paid:"success"},u=e.map(p=>`
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${ke(p.unitPrice)}</td>
        <td class="numeric"><strong>${ke(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${o[p.status]}">${n[p.status]}</span>
        </td>
      </tr>
    `).join(""),a=t.map(p=>`
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${ke(p.totalPurchase)}</td>
        <td class="numeric">${ke(p.paidAmount)}</td>
        <td class="numeric"><strong>${ke(p.balance)}</strong></td>
        <td>${p.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${c[p.status]}">${l[p.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${p.supplierCode}" ${p.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),i=e.reduce((p,m)=>p+m.amount,0),r=t.reduce((p,m)=>p+m.balance,0),d=t.filter(p=>p.status!=="paid").length;return`
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
        <p class="kpi-value">${ke(i)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${ke(r)}</p>
        <p class="kpi-sub">未払い ${d} 社</p>
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
          <tbody>${u||'<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>'}</tbody>
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
          <tbody>${a||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ge(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Wl(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},o={holding:"neutral",due:"warning",cleared:"success"},l=e.map(d=>`
      <tr>
        <td class="mono">${d.billNo}</td>
        <td>${d.supplierName}</td>
        <td class="numeric">${Ge(d.amount)}</td>
        <td>${d.issueDate}</td>
        <td>${d.dueDate}</td>
        <td>
          <span class="status-pill ${o[d.status]}">${n[d.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${d.id}" ${d.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),c=t.map(d=>{const p=d.minimumStock>0&&d.currentStock<d.minimumStock*1.2;return`
        <tr>
          <td class="mono">${d.code}</td>
          <td>${d.name}</td>
          <td class="numeric ${p?"text-danger":""}">
            ${d.currentStock.toLocaleString("ja-JP")} ${d.unit}
            ${p?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${d.minimumStock.toLocaleString("ja-JP")} ${d.unit}</td>
          <td class="numeric">${Ge(d.unitCost)}</td>
          <td class="numeric">${Ge(d.currentStock*d.unitCost)}</td>
          <td>${d.lastPurchaseDate}</td>
        </tr>
      `}).join(""),u=e.filter(d=>d.status==="holding"),a=u.reduce((d,p)=>d+p.amount,0),i=t.reduce((d,p)=>d+p.currentStock*p.unitCost,0),r=t.filter(d=>d.minimumStock>0&&d.currentStock<d.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${Ge(a)}</p>
        <p class="kpi-sub">${u.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${Ge(i)}</p>
        <p class="kpi-sub">要補充 ${r} 品目</p>
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
          <tbody>${l||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
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
  `}function ta(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function ae(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function aa(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${ae(e)}</pre>
    </div>
  `}function Zl(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function yt(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${ae(e)}</code>
      ${Zl(e)}
    </div>
  `}function Oe(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${ae(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${ae(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${ae(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?aa(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${ae(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${ae(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function ht(e){return`
    <div class="setup-step setup-step-compact" data-step="${ae(e.stepLabel)}">
      <h3>${ae(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${ae(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function vt(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function Xa(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function er(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?ta(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${vt(e.lastOverallSync)}">${Xa(e.lastOverallSync)}</span>
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
              <td>${ae(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?ta(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${vt(t.lastSyncAt)}">${Xa(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function tr(e,t,n,o){const l={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${o?er(o):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${ta(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${l[e.status]}</span>
        </p>
        <p class="kpi-sub">${ae(e.message)}</p>
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
      ${ht({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${yt("git --version")}
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
      ${ht({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${yt("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${ht({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${yt("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${yt("python get-pip.py")}
        `})}
      ${ht({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
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
          ${aa(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${aa(`{
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
            <span class="config-value">${ae(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${ae(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${ae(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${ae(n)}"
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
  `}function Ze(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ar(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function sr(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(p=>p.amount),1),o=28,l=6,c=140,u=100,a=760,i=a-c-u,r=t.length*(o+l)+16,d=t.map((p,m)=>{const h=p.amount/n*i,f=m*(o+l)+8,$=p.abcRank==="A"?"#2F855A":p.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${c-8}" y="${f+o/2+5}" class="chart-axis" text-anchor="end">${p.name.length>10?p.name.slice(0,10)+"…":p.name}</text>
          <rect x="${c}" y="${f}" width="${h}" height="${o}" rx="4" fill="${$}" opacity="0.85" />
          <text x="${c+h+8}" y="${f+o/2+5}" class="chart-axis">${(p.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${a} ${r}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${d}
    </svg>
  `}function nr(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(o=>`<th class="numeric">${o}</th>`).join(""),n=e.monthlyByCustomer.map(o=>{const l=o.values.reduce((u,a)=>u+a,0),c=o.values.map(u=>`<td class="numeric">${u>0?(u/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${o.label}</td>
          ${c}
          <td class="numeric"><strong>${Ze(l)}</strong></td>
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
  `}function or(e){e.ranking.reduce((i,r)=>i+r.amount,0);const t=e.ranking.filter(i=>i.abcRank==="A").length,n=e.ranking.filter(i=>i.abcRank==="B").length,o=e.ranking.filter(i=>i.abcRank==="C").length,l=e.ranking.filter(i=>i.abcRank==="A").reduce((i,r)=>i+r.amount,0),c=e.ranking.filter(i=>i.abcRank==="B").reduce((i,r)=>i+r.amount,0),u=e.ranking.filter(i=>i.abcRank==="C").reduce((i,r)=>i+r.amount,0),a=e.ranking.map(i=>`
        <tr>
          <td class="mono">${i.code}</td>
          <td>${i.name}</td>
          <td class="numeric">${Ze(i.amount)}</td>
          <td class="numeric">${i.ratio.toFixed(1)}%</td>
          <td class="numeric">${i.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${i.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${ar(i.abcRank)}">${i.abcRank}</span></td>
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
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${Ze(l)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${Ze(c)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${o}社 <span class="kpi-sub">${Ze(u)}</span></div>
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
        ${sr(e.ranking)}
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
          <tbody>${a}</tbody>
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
      ${nr(e)}
    </section>
  `}const ir={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},Ka={amount:"売上額",quantity:"出荷本数",volume:"移出量"},sa=10;function Ca(e){const[t,n]=e.split("-").map(Number);return n>=sa?t:t-1}function lr(e){const t=sa-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(sa).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function rr(e,t,n){const o=u=>t==="quantity"?u.quantity:t==="volume"?u.volumeMl:u.amount,l=new Map;for(const u of e){const a=n==="fiscal"?`${Ca(u.month)}年度`:u.month.slice(0,4);l.set(a,(l.get(a)??0)+o(u))}return{curr:[...l.entries()].sort((u,a)=>u[0].localeCompare(a[0])).map(([u,a])=>({month:u,amount:a}))}}function cr(e){const t=new Set;for(const n of e)t.add(Ca(n.month));return[...t].sort((n,o)=>o-n).map(String)}function Je(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function dr(e){return e.replace("-","/")}const Wa={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function ur(e,t="#0F5B8D",n=[],o="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const l=n.length>0&&n.some(_=>_.amount>0),c=760,u=280,a={top:16,right:24,bottom:36,left:o==="amount"?64:56},i=c-a.left-a.right,r=u-a.top-a.bottom,d=[...e.map(_=>_.amount),...n.map(_=>_.amount)],p=Math.max(...d,1),m=i/e.length;function h(_){if(o==="quantity")return _>=1e4?`${(_/1e4).toFixed(1)}万本`:`${Math.round(_).toLocaleString()}本`;if(o==="volume"){const L=_/1e3;return L>=1e4?`${(L/1e3).toFixed(0)}kL`:`${Math.round(L).toLocaleString()} L`}return`${Math.round(_/1e4).toLocaleString("ja-JP")}万円`}function f(_){return o==="quantity"?`${_.toLocaleString()}本`:o==="volume"?Dt(_):Je(_)}const $=[0,.25,.5,.75,1].map(_=>{const L=a.top+r-r*_,q=h(p*_);return`<g>
        <line x1="${a.left}" y1="${L}" x2="${c-a.right}" y2="${L}" class="chart-grid" />
        <text x="4" y="${L+4}" class="chart-axis">${q}</text>
      </g>`}).join(""),g=e.map((_,L)=>{const q=l?Math.max((m-18)/2,10):Math.max(m-18,24),A=l?2:0,R=a.left+L*m+(m-(l?q*2+A:q))/2,E=_.amount/p*r,C=a.top+r-E,M=n[L]?.amount??0,k=M/p*r,I=a.top+r-k,j=l?`<rect x="${R}" y="${I}" width="${q}" height="${k}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${f(M)}</title></rect>`:"",K=l?R+q+A:R;return`<g>
      ${j}
      <rect x="${K}" y="${C}" width="${q}" height="${E}" rx="4" fill="${t}" opacity="${.6+L/e.length*.35}"><title>${f(_.amount)}</title></rect>
      <text x="${a.left+L*m+m/2}" y="${u-8}" class="chart-axis centered-axis">${dr(_.month)}</text>
    </g>`}).join(""),w=l?`
    <g transform="translate(${c-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${c} ${u}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${$}${g}${w}
    </svg>
  `}function Dt(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function pr(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(o=>`
    <tr>
      <td class="mono">${o.code}</td>
      <td>${o.name}</td>
      <td class="numeric">${Je(o.amount)}</td>
      <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Dt(o.volumeMl)}</td>
      <td class="numeric">${o.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${o.code}" data-drilldown-name="${o.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function mr(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${Je(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Dt(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function Za(e,t,n){const o=t?e.filter(c=>c.tag.includes(t)||c.name.includes(t)):e,l=o.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':o.map(c=>`
        <tr>
          <td class="mono">${c.code||"―"}</td>
          <td>${c.name||"未設定"}</td>
          <td class="mono">${c.tag||"―"}</td>
          <td class="numeric">${Je(c.amount)}</td>
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
        <tbody>${l}</tbody>
      </table>
    </div>
  `}function xn(e,t,n="all",o="",l=[],c=[],u="",a="",i=null,r="all",d="",p=[],m=[],h=[],f=null,$=[],g=[],w="amount",_="calendar"){const L=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",q=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,R=n!=="all"&&l.length>0&&t!=="staff"?l:q,E=Ve(R,h,ir),C={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},M=Ka[w],k=z=>w==="quantity"?z.quantity:w==="volume"?z.volumeMl:z.amount,I=z=>w==="quantity"?`${z.toLocaleString()}本`:w==="volume"?Dt(z):Je(z);let j,K=[],X,ne,ce;if(f&&f.monthlySales.length>0)j=f.monthlySales.slice(-24).map(z=>({month:z.month,amount:k(z)})),X=`${f.name} の月別${M}`,ne=`${f.tab==="customers"?"得意先":"商品"}: ${f.code}`,ce="#0968e5";else if($.length>0&&n!=="all"){j=$.map(oe=>({month:oe.month,amount:k(oe)})),K=g.map(oe=>({month:oe.month,amount:k(oe)}));const z=j.reduce((oe,Y)=>oe+Y.amount,0),be=K.reduce((oe,Y)=>oe+Y.amount,0),lt=be>0?(z-be)/be*100:0,Ie=lt>0?"+":"";X=`${C[n]} ${M}（${o}）`,ne=`${I(z)}${be>0?` / 前年比 ${Ie}${lt.toFixed(1)}%`:""}`,ce="#2f855a"}else{j=rr(e.monthlySales,w,_).curr,K=[];const be=j.reduce((Ie,oe)=>Ie+oe.amount,0);X=`${_==="fiscal"?"決算年度別":"暦年別"}${M}`,ne=`累計 ${I(be)}（${j.length}${_==="fiscal"?"期":"年"}）`,ce="#0F5B8D"}const ge=["amount","quantity","volume"].map(z=>`<button class="tab-button ${z===w?"active":""}" data-chart-metric="${z}">${Ka[z]}</button>`).join(""),de=["all","yearly","monthly","weekly","daily"].map(z=>`<button class="button ${z===n?"primary":"secondary"} small" type="button" data-analytics-period="${z}">${Wa[z]}</button>`).join(""),T=_==="fiscal"&&n==="yearly"?cr(e.monthlySales):c,H=_==="fiscal"&&n==="yearly"&&!T.includes(o)?T[0]??"":o,Ye=n!=="all"&&T.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${T.map(z=>`<option value="${z}" ${z===H?"selected":""}>${_==="fiscal"&&n==="yearly"?z+"年度":z}</option>`).join("")}
      </select>`:"";let Le="",De="";if(t==="staff"){const z=["all","yearly","monthly","weekly","daily"].map(Y=>`<button class="button ${Y===r?"primary":"secondary"} small" type="button" data-staff-period="${Y}">${Wa[Y]}</button>`).join(""),be=r!=="all"&&p.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${p.map(Y=>`<option value="${Y}" ${Y===d?"selected":""}>${Y}</option>`).join("")}
        </select>`:"",Ie=(m.length>0?m:e.staffTotals).filter(Y=>!u||Y.name.includes(u)||Y.code.includes(u)),oe=r!=="all"&&d?` (${d})`:"";if(Le=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${z}</div>
        ${be}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${u}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${oe?`<span style="font-size:12px;color:var(--text-secondary);">${oe}</span>`:""}
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
            ${Ie.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':Ie.map(Y=>`
                <tr>
                  <td class="mono">${Y.code||"―"}</td>
                  <td>${Y.name||"未設定"}</td>
                  <td class="numeric">${Je(Y.amount)}</td>
                  <td class="numeric">${Y.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${Y.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${Y.code}" data-staff-name="${Y.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,i){const Y=i.breakdownTab,On=r!=="all"&&d?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${d}</span>`:"";De=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${i.name} の内訳${On}</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>

          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div class="tab-group">
              <button class="tab-button ${Y==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${Y==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${a}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${Y==="customers"?Za(i.customerRows,a,"得意先名"):Za(i.productRows,a,"商品名")}
        </article>
      `}}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group" style="font-size:12px;">
          <button class="tab-button ${_==="calendar"?"active":""}" data-fiscal-mode="calendar">暦年（1〜12月）</button>
          <button class="tab-button ${_==="fiscal"?"active":""}" data-fiscal-mode="fiscal">決算期（10〜9月）</button>
        </div>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <h2>${X}</h2>
            <p class="panel-caption">${ne}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${ge}</div>
            ${f?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${ur(j,ce,K,w)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${L}</h2>
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
            <div class="button-group">${de}</div>
            ${Ye}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${O("code","コード",h,"mono")}
                  ${O("name","名称",h)}
                  ${O("amount","売上額",h,"numeric")}
                  ${O("quantity","本数",h,"numeric")}
                  ${O("volumeMl","移出量",h,"numeric")}
                  ${O("documents","伝票数",h,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${pr(E,!0)}</tbody>
            </table>
          </div>
        `:Le}
      </article>
    </section>

    ${f?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${f.name} の${f.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${f.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${f.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${mr(f.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${De}
  `}const es=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:lr,monthToFiscalYear:Ca,renderSalesAnalytics:xn},Symbol.toStringTag,{value:"Module"}));function Xe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function yr(e){const t=Math.max(...e.salesByProduct.flatMap(c=>c.values),1),n=e.salesByProduct.map(c=>{const u=c.values.map((a,i)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(a/t*120)}px" title="${e.months[i]}: ${Xe(a)}"></div>
            <span class="bar-label">${e.months[i].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${c.label}</p>
          <div class="bar-chart">${u}</div>
        </div>
      `}).join(""),o=e.costSimulation.map(c=>`
      <tr>
        <td class="mono">${c.productCode}</td>
        <td>${c.productName}</td>
        <td class="numeric">${Xe(c.costPrice)}</td>
        <td class="numeric">${Xe(c.sellPrice)}</td>
        <td class="numeric">${Xe(c.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${c.marginRate>=40?"success":"warning"}">${c.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),l=e.salesByCustomer.map(c=>{const u=c.values.reduce((a,i)=>a+i,0);return`
        <tr>
          <td>${c.label}</td>
          ${c.values.map(a=>`<td class="numeric">${(a/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${Xe(u)}</strong></td>
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
          <tbody>${l}</tbody>
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
  `}function hr(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function vr(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ts(e){return e.toISOString().slice(0,10)}function fr(e,t,n){const o=e.length?e.map(l=>`
            <tr>
              <td class="mono">${l.documentNo}</td>
              <td>${hr(l.date)}</td>
              <td>
                <div class="table-title">${l.customerName}</div>
                <div class="table-sub mono">${l.customerCode}</div>
              </td>
              <td class="numeric">${vr(l.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||ts(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||ts(new Date)}" />
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
          <tbody>${o}</tbody>
        </table>
      </div>
    </section>
  `}function ft(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function gr(e,t,n,o){const l={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},c={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},u={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},a=e.map(p=>`
      <tr>
        <td>${p.saleTime}</td>
        <td class="mono">${p.productCode}</td>
        <td>${p.productName}</td>
        <td class="numeric">${p.quantity}</td>
        <td class="numeric">${ft(p.unitPrice)}</td>
        <td class="numeric"><strong>${ft(p.amount)}</strong></td>
        <td>${l[p.paymentMethod]}</td>
      </tr>
    `).join(""),i=t.map(p=>`
      <tr>
        <td class="mono">${p.orderNo}</td>
        <td>${p.orderDate}</td>
        <td>${p.customerName}</td>
        <td>${p.postalCode} ${p.address}</td>
        <td>${p.items.map(m=>`${m.productName} ×${m.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${ft(p.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${u[p.status]}">${c[p.status]}</span>
        </td>
        <td>${p.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${p.id}">詳細</button>
        </td>
      </tr>
    `).join(""),r=e.reduce((p,m)=>p+m.amount,0),d=t.filter(p=>p.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${ft(r)}</p>
        <p class="kpi-sub">${e.length} 件 / ${o}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${d} 件</p>
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
            <tbody>${a||'<tr><td colspan="7" class="empty-row">販売データがありません。</td></tr>'}</tbody>
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
            <tbody>${i||'<tr><td colspan="9" class="empty-row">受注データがありません。</td></tr>'}</tbody>
          </table>
        </div>
        `}
    </section>
  `}const zt={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},br={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function $r(e,t,n,o){const l=br[e],c=Object.keys(zt).map(a=>`
      <button class="tab-button ${e===a?"active":""}" data-import-entity="${a}">
        ${zt[a]}
      </button>
    `).join(""),u=t?`
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
              ${t.columns.map(a=>`<th>${a}</th>`).join("")}
              <th>検証</th>
            </tr>
          </thead>
          <tbody>
            ${t.rows.slice(0,10).map((a,i)=>`
              <tr class="${a._valid?"":"has-error"}">
                <td>${i+1}</td>
                ${t.columns.map(r=>`<td>${String(a[r]??"")}</td>`).join("")}
                <td>${a._valid?'<span class="status-pill success">OK</span>':`<span class="status-pill warning">${a._error??"NG"}</span>`}</td>
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
        <h2>${zt[e]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${l.required.map(a=>`<code class="config-value">${a}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${l.optional.map(a=>`<code class="config-value">${a}</code>`).join(" / ")}</dd>
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

    ${u}

    ${o?`<section class="panel"><p class="sync-message">${o}</p></section>`:""}
  `}const Q={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function _r(e,t,n){const o=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:Q.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:Q.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:Q.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:Q.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:Q.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:Q.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:Q.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:Q.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:Q.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:Q.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:Q.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:Q.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:Q.date}];e.lines.slice(0,6).forEach((u,a)=>{const i=33+a*8.5;o.push({id:`line${a}_name`,label:`明細${a+1} 品名`,x:5,y:i,fontSize:7.5,value:u.productName+(u.spec?` ${u.spec}`:""),color:Q.detail},{id:`line${a}_code`,label:`明細${a+1} CD`,x:64,y:i,fontSize:7.5,value:u.productCode,color:Q.detail},{id:`line${a}_qty`,label:`明細${a+1} 数量`,x:124,y:i,fontSize:8,value:u.quantity>0?String(u.quantity):"",color:Q.detail},{id:`line${a}_price`,label:`明細${a+1} 原単価`,x:163,y:i,fontSize:8,value:u.unitPrice>0?u.unitPrice.toLocaleString("ja-JP"):"",color:Q.detail},{id:`line${a}_amount`,label:`明細${a+1} 原価金額`,x:176,y:i,fontSize:8,value:u.amount>0?u.amount.toLocaleString("ja-JP"):"",color:Q.detail},{id:`line${a}_retail`,label:`明細${a+1} 売単価`,x:193,y:i,fontSize:8,value:u.retailPrice?u.retailPrice.toLocaleString("ja-JP"):"",color:Q.detail})});const l=e.lines.reduce((u,a)=>u+(a.amount||0),0),c=e.lines.reduce((u,a)=>u+a.quantity,0);return o.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(c),color:Q.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:l.toLocaleString("ja-JP"),color:Q.total}),n&&o.forEach(u=>{const a=n[u.id];a&&(u.x=a.x,u.y=a.y)}),o}function wr(e,t,n,o,l){const u=_r(e,t,o).map(i=>`
      <div class="fd-field ${l?"fd-draggable":""}"
           data-fd-id="${i.id}"
           style="left:${i.x}mm; top:${i.y}mm; font-size:${i.fontSize}pt; --fd-color:${i.color};"
           title="${i.label} (${i.x.toFixed(1)}, ${i.y.toFixed(1)})">
        ${l?`<span class="fd-badge">${i.label}</span>`:""}
        <span class="fd-value">${i.value}</span>
      </div>
    `).join(""),a=n.showReferenceOverlay&&n.overlayImageUrl?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">帳票デザイナー</p>
        <h1>BP1701 フォーム配置</h1>
      </div>
      <div class="meta-stack">
        <button class="button ${l?"primary":"secondary"}" data-action="fd-toggle-design">
          ${l?"🔧 配置モードON":"▶ プレビューモード"}
        </button>
        <button class="button primary" onclick="window.print()">🖨️ 印刷</button>
      </div>
    </section>

    ${l?`
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
        色: <span style="color:${Q.header}">■ヘッダ</span>
        <span style="color:${Q.code}">■コード</span>
        <span style="color:${Q.date}">■日付</span>
        <span style="color:${Q.detail}">■明細</span>
        <span style="color:${Q.total}">■合計</span>
      </p>
    </section>
    `:""}

    <section class="panel fd-canvas-panel">
      <div class="fd-canvas-scaler" id="fd-scaler">
        <div class="fd-canvas" style="${a}">
          ${u}
        </div>
      </div>
    </section>

    ${l?`
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
  `}function Bt(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const o=n.dataset.fdId??"",l=parseFloat(n.style.left)||0,c=parseFloat(n.style.top)||0;t[o]={x:l,y:c}}),t}function xr(e,t,n){const o=[...new Set(e.map(m=>m.areaCode).filter(Boolean))].sort(),l=[...new Set(e.map(m=>m.businessTypeName||m.businessType).filter(Boolean))].sort(),c=e.filter(m=>m.isAtRisk),u=e.filter(m=>!m.isAtRisk&&m.isDormant),a=e.filter(m=>!m.isAtRisk&&!m.isDormant&&m.amount12m>0),i=e.filter(m=>!m.isAtRisk&&!m.isDormant&&m.amount12m===0),r=t.filter(m=>m.lat&&m.lng),d=JSON.stringify(e),p=JSON.stringify(r.map(m=>({name:m.name,address:m.address,lat:m.lat,lng:m.lng,phone:m.phone})));return`
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
        <div class="kpi-value">${c.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠</div>
        <div class="kpi-value">${u.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid #2196F3;">
        <div class="kpi-label">🔵 取引中</div>
        <div class="kpi-value">${a.length}<span class="kpi-sub">社</span></div>
      </div>
      <div class="kpi-card" style="border-top:3px solid #aaa;">
        <div class="kpi-label">⚪ 売上なし</div>
        <div class="kpi-value">${i.length}<span class="kpi-sub">社</span></div>
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
        ${o.map(m=>`<option value="${m}" ${n.filterArea===m?"selected":""}>${m}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${l.map(m=>`<option value="${m}" ${n.filterBiz===m?"selected":""}>${m}</option>`).join("")}
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
      const ALL_CUSTOMERS = ${d};
      const DELIVERIES    = ${p};

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
    <\/script>`}const Sr={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},kr=["new","picking","packed","shipped","delivered"];function Pr(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(c=>t[c.stage].push(c));const n=kr.map(c=>{const u=Sr[c],a=t[c];return`
      <div class="wf-col" data-wf-stage="${c}">
        <div class="wf-col-header" style="--wf-color:${u.color};">
          <span class="wf-col-icon">${u.icon}</span>
          <span class="wf-col-label">${u.label}</span>
          <span class="wf-col-count">${a.length}</span>
        </div>
        <div class="wf-col-body">
          ${a.length===0?'<div class="wf-empty">―</div>':a.map(i=>`
            <div class="wf-card ${i.priority==="urgent"?"wf-urgent":""}" data-wf-order="${i.id}" draggable="true">
              <div class="wf-card-header">
                <span class="wf-card-no mono">${i.orderNo}</span>
                ${i.priority==="urgent"?'<span class="wf-card-priority">🔥 急</span>':""}
              </div>
              <div class="wf-card-customer">${i.customerName}</div>
              <div class="wf-card-meta">
                <span>📅 ${i.orderDate}</span>
                ${i.deliveryDate?`<span>🚚 ${i.deliveryDate}</span>`:""}
              </div>
              <div class="wf-card-footer">
                <span>${i.itemCount}品</span>
                <strong>¥${i.totalAmount.toLocaleString("ja-JP")}</strong>
              </div>
              ${i.staffName?`<div class="wf-card-staff">👤 ${i.staffName}</div>`:""}
            </div>
          `).join("")}
        </div>
      </div>
    `}).join(""),o=e.reduce((c,u)=>c+u.totalAmount,0),l=e.filter(c=>c.priority==="urgent").length;return`
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
      <article class="panel kpi-card ${l>0?"kpi-alert":""}">
        <p class="panel-title">急ぎ</p>
        <p class="kpi-value">${l}件</p>
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
  `}function Ar(e,t,n){const o=e.cart.reduce((c,u)=>c+u.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((c,u)=>c+u.quantity,0)}<br/>
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

      ${Cr(e,t,n)}
    </div>
  `}function Cr(e,t,n){if(e.step==="customer"){const o=e.customerQuery.toLowerCase(),l=o?t.filter(c=>c.name.toLowerCase().includes(o)||c.code.toLowerCase().includes(o)):t.slice(0,20);return`
      <section class="panel">
        <input id="mo-customer-q" type="text" placeholder="顧客名・コード検索" value="${e.customerQuery}" class="mo-search" />
        <div class="mo-list">
          ${l.slice(0,30).map(c=>`
            <button class="mo-item ${e.selectedCustomer?.id===c.id?"selected":""}" data-mo-select-customer="${c.id}">
              <div class="mo-item-title">${c.name}</div>
              <div class="mo-item-sub mono">${c.code}</div>
            </button>
          `).join("")}
        </div>
      </section>
      ${e.selectedCustomer?'<div class="mo-footer"><button class="button primary mo-next" data-mo-step="products">商品選択へ ▶</button></div>':""}
    `}if(e.step==="products"){const o=e.productQuery.toLowerCase(),l=o?n.filter(c=>c.name.toLowerCase().includes(o)||c.code.toLowerCase().includes(o)):n.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${l.slice(0,50).map(c=>{const u=e.cart.find(a=>a.productCode===c.code);return`
              <div class="mo-item mo-product-item">
                <div style="flex:1;">
                  <div class="mo-item-title">${c.name}</div>
                  <div class="mo-item-sub">${c.category} / JAN ${c.janCode||"―"}</div>
                </div>
                ${u?`<div class="mo-qty-ctrl">
                      <button data-mo-qty="-1" data-mo-product="${c.code}">−</button>
                      <span>${u.quantity}</span>
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
          ${e.cart.map((o,l)=>`
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${o.productName}</div>
                <div class="mo-item-sub">${o.quantity} × ¥${o.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${o.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${l}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${e.cart.reduce((o,l)=>o+l.amount,0).toLocaleString("ja-JP")}</strong>
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
  `}const as={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},ss={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},ns={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function Er(e,t){const n=e.find(c=>c.id===t)??e[0],o=e.filter(c=>c.status==="new").length,l=e.filter(c=>c.status==="confirmed").length;return`
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
        <p class="kpi-value">${l}件</p>
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
                <span class="status-pill ${ss[c.status]}">${as[c.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${ns[c.language]} · 👥 ${c.partySize}名
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
            <span class="status-pill ${ss[n.status]}">${as[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${ns[n.language]}</dd></div>
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
  `}const Lr=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,Dr=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Ir(e,t){const n=t?e.find(l=>l.id===t):null,o=t==="__new__";return`
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
            ${e.map(l=>`
              <tr>
                <td>
                  ${l.name}
                  ${l.isDefault?'<span class="status-pill success" style="margin-left:6px;">既定</span>':""}
                </td>
                <td class="mono">${l.email}</td>
                <td>${l.displayName??"―"}</td>
                <td>
                  ${l.isVerified?'<span class="status-pill success">✓認証済</span>':'<span class="status-pill warning">未認証</span>'}
                </td>
                <td>
                  <button class="button-sm secondary" data-action="ms-edit" data-id="${l.id}">編集</button>
                  <button class="button-sm secondary" data-action="ms-delete" data-id="${l.id}" style="color:var(--danger);">削除</button>
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
  `}function qr(e,t,n,o){const[l,c]=t.split("-").map(A=>parseInt(A,10)),u=new Date(l,c-1,1),a=new Date(l,c,0),i=u.getDay(),r=a.getDate(),d=[];for(let A=0;A<i;A++)d.push({isOutside:!0});for(let A=1;A<=r;A++)d.push({date:new Date(l,c-1,A)});for(;d.length%7!==0;)d.push({isOutside:!0});const p=n?e.filter(A=>A.category===n):e,m={};p.forEach(A=>{const R=A.startsAt.slice(0,10);m[R]??=[],m[R].push(A)});const h=new Date().toISOString().slice(0,10),f=d.map(A=>{if(A.isOutside)return'<div class="cal-cell cal-outside"></div>';const R=A.date,E=`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}-${String(R.getDate()).padStart(2,"0")}`,C=m[E]??[],M=E===h,k=R.getDay();return`
        <div class="cal-cell ${M?"cal-today":""} ${k===0?"cal-sun":k===6?"cal-sat":""}"
             data-cal-date="${E}">
          <div class="cal-day-num">${R.getDate()}</div>
          <div class="cal-events">
            ${C.slice(0,3).map(I=>`
              <button class="cal-event" data-cal-event-id="${I.id}"
                      style="background:${I.color||xa[I.category]||"#0F5B8D"};"
                      title="${I.title}">
                <span class="cal-event-time">${I.isAllDay?"終日":new Date(I.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${I.title}</span>
              </button>
            `).join("")}
            ${C.length>3?`<button class="cal-event-more" data-cal-date="${E}">+${C.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),$=o?.isOpen?Tr(o):"",g=new Date(l,c-2,1),w=new Date(l,c,1),_=`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}`,L=`${w.getFullYear()}-${String(w.getMonth()+1).padStart(2,"0")}`,q=(()=>{const A=new Date;return`${A.getFullYear()}-${String(A.getMonth()+1).padStart(2,"0")}`})();return`
    <section class="page-head">
      <div>
        <p class="eyebrow">カレンダー</p>
        <h1>${l}年 ${c}月</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="cal-new">＋ 予定追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="button secondary" data-action="cal-prev" data-ym="${_}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${q}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${L}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(wa).map(([A,R])=>`<option value="${A}" ${n===A?"selected":""}>${R}</option>`).join("")}
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

    ${$}
  `}function Tr(e){const t=e.event;return`
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
                ${Object.entries(wa).map(([n,o])=>`<option value="${n}" ${t.category===n?"selected":""}>${o}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?os(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?os(t.endsAt):""}" />
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
  `}function os(e){const t=new Date(e),n=o=>String(o).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const Ke={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function Nr(e,t){const n=t?e.find(o=>o.id===t):null;return`
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
        <p class="form-hint">${Ke[n.provider]?.description??""}</p>
        ${Ke[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${Ke[n.provider].setupUrl}" target="_blank">${Ke[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(Ke[n.provider]?.fields??[]).map(o=>`
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
  `}function Mr(e,t){const n=e.reduce((c,u)=>c+u.totalAmount,0),o=e.filter(c=>c.financialStatus==="paid").length,l=e.filter(c=>c.fulfillmentStatus!=="fulfilled"&&c.fulfillmentStatus!=="shipped").length;return`
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
      <article class="panel kpi-card ${l>0?"kpi-alert":""}">
        <p class="panel-title">未発送</p>
        <p class="kpi-value">${l}件</p>
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
                <td style="font-size:12px;">${c.lineItems.map(u=>`${u.name} ×${u.quantity}`).join("<br/>")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Rr(e,t,n){return`
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
  `}function Or(e,t,n){const o=t==="__new__"?null:e.find(u=>u.id===t),l=t==="__new__";return n?.role==="admin"?`
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
        <p class="kpi-sub">有効 ${e.filter(u=>u.isActive).length}名</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">管理者</p>
        <p class="kpi-value">${e.filter(u=>u.role==="admin").length}名</p>
        <p class="kpi-sub">全権アクセス</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">部署数</p>
        <p class="kpi-value">${new Set(e.map(u=>u.department)).size}</p>
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
            ${e.map(u=>`
              <tr ${u.isActive?"":'style="opacity:0.5;"'}>
                <td class="mono">${u.staffCode??"―"}</td>
                <td><strong>${u.displayName}</strong>${u.id===n?.id?'<span style="color:var(--primary);font-size:11px;"> (あなた)</span>':""}</td>
                <td class="mono" style="font-size:12px;">${u.email}</td>
                <td>${xt[u.department]}</td>
                <td>${wt[u.role]}</td>
                <td style="font-size:12px;">${u.lastSignInAt?u.lastSignInAt.slice(0,16).replace("T"," "):"―"}</td>
                <td>${u.isActive?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}</td>
                <td>
                  <button class="button-sm secondary" data-action="user-edit" data-id="${u.id}">編集</button>
                  ${u.id!==n?.id?`<button class="button-sm secondary" data-action="user-delete" data-id="${u.id}" style="color:var(--danger);">削除</button>`:""}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    ${o||l?`
      <section class="panel">
        <div class="panel-header">
          <h2>${l?"新規ユーザー":`${o?.displayName} 編集`}</h2>
        </div>
        ${l?'<p class="form-hint">新規ユーザーを追加するとSupabase Authに登録され、初期パスワードでログインできます。</p>':""}
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 *</span>
            <input id="user-name" type="text" value="${o?.displayName??""}" placeholder="金井 太郎" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス *</span>
            <input id="user-email" type="email" value="${o?.email??""}" placeholder="taro@kaneishuzo.co.jp" ${o?"readonly":""} />
          </label>
          ${l?`<label class="field" style="flex:1 1 200px;">
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
              ${Object.entries(xt).map(([u,a])=>`<option value="${u}" ${o?.department===u?"selected":""}>${a}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(wt).map(([u,a])=>`<option value="${u}" ${o?.role===u?"selected":""}>${a}</option>`).join("")}
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
    `}function jr(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${xt[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${wt[e.role]}</dd></div>
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
    `}function Fr(e){const t={};return e.forEach(n=>{const o=n.userEmail??"(anonymous)";t[o]=(t[o]??0)+1}),`
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
  `}function zr(e){const t=e.prospects.reduce((c,u)=>c+u.expectedAmount,0),n=e.prospects.reduce((c,u)=>c+u.expectedAmount*u.probability/100,0),o=e.prospects.filter(c=>c.stage==="won").length,l=e.prospects.filter(c=>c.stage==="hot"||c.stage==="negotiating").length;return`
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
      <article class="panel kpi-card ${l>0?"kpi-alert":""}">
        <p class="panel-title">ホット案件</p>
        <p class="kpi-value">${l}件</p>
        <p class="kpi-sub">見込み高 + 商談中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注</p>
        <p class="kpi-value">${o}件</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    ${e.viewMode==="kanban"?Br(e.prospects):Vr(e.prospects)}

    ${Jr(e)}
  `}function Br(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(o=>{const l=e.filter(u=>u.stage===o),c=l.reduce((u,a)=>u+a.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${o}">
          <div class="pk-col-header" style="--pk-color:${Sa[o]};">
            <span class="pk-col-label">${Et[o]}</span>
            <span class="pk-col-count">${l.length}</span>
          </div>
          <div class="pk-col-sub">¥${c.toLocaleString("ja-JP")}</div>
          <div class="pk-col-body">
            ${l.length===0?'<div class="wf-empty">―</div>':l.map(u=>`
              <div class="pk-card" data-prospect-id="${u.id}" draggable="true">
                <div class="pk-card-company">${u.companyName}</div>
                <div class="pk-card-meta">${u.businessType??""} ${u.contactName?"· "+u.contactName:""}</div>
                <div class="pk-card-amount">¥${u.expectedAmount.toLocaleString("ja-JP")} <span style="color:var(--text-secondary);">(${u.probability}%)</span></div>
                ${u.nextAction?`<div class="pk-card-action">🎯 ${u.nextAction}${u.nextActionDate?" ("+u.nextActionDate+")":""}</div>`:""}
                ${u.assignedStaffCode?`<div class="pk-card-staff">👤 ${u.assignedStaffCode}</div>`:""}
              </div>
            `).join("")}
          </div>
        </div>
      `}).join("")}</div>
    </section>
  `}function Vr(e){return`
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
                <td><span class="status-pill" style="background:${Sa[t.stage]};color:white;">${Et[t.stage]}</span></td>
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
  `}function Jr(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(o=>o.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(Et).map(([o,l])=>`<option value="${o}" ${n?.stage===o?"selected":""}>${l}</option>`).join("")}
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
  `}function Yr(e,t,n){const o=e?.config.webhook_url??"",l=e?.config.default_channel??"#general";return`
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
          <input id="slack-default-channel" type="text" value="${l}" />
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
                <td>${St[c.eventType]||c.eventType}</td>
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
                <td>${St[c.eventType]||c.eventType}</td>
                <td class="mono" style="font-size:12px;">${c.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.message}</td>
                <td><span class="status-pill ${c.status==="sent"?"success":"warning"}">${c.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ur(e,t,n,o){const l=new Map(t.map(p=>[p.code,p])),c=e.filter(p=>p.callDirection==="inbound").length,u=e.filter(p=>p.callDirection==="outbound").length,a=e.filter(p=>p.callStatus==="missed").length,i=e.reduce((p,m)=>p+(m.durationSeconds??0),0),r=p=>{if(p===0)return"―";const m=Math.floor(p/60),h=p%60;return m>0?`${m}分${h}秒`:`${h}秒`},d=p=>{if(p.matchedCustomerCode){const m=l.get(p.matchedCustomerCode);if(m)return`${m.name} (既存)`}return"未登録番号"};return`
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
        <p class="kpi-value">${c}件</p>
        <p class="kpi-sub">不在 ${a}件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">発信</p>
        <p class="kpi-value">${u}件</p>
        <p class="kpi-sub">直近50件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">通話時間合計</p>
        <p class="kpi-value">${r(i)}</p>
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
                  <strong>${d(p)}</strong>
                  ${p.matchedCustomerCode?`<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${p.matchedCustomerCode}</span>`:""}
                </td>
                <td class="mono" style="font-size:12px;">${p.callDirection==="inbound"?p.fromNumber:p.toNumber}</td>
                <td>
                  ${p.callStatus==="missed"?'<span class="status-pill warning">不在着信</span>':p.callStatus==="answered"?'<span class="status-pill success">応答</span>':`<span class="status-pill neutral">${p.callStatus}</span>`}
                </td>
                <td>${r(p.durationSeconds??0)}</td>
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
  `}const Qr=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function Hr(e){const t=e.activeListId?e.lists.find(c=>c.id===e.activeListId):null,n=e.items.filter(c=>c.status==="new").length,o=e.items.filter(c=>c.status==="imported").length,l=e.items.filter(c=>c.status==="excluded").length;return`
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
            ${Qr.map(c=>`<option value="${c}" ${e.searchBusinessType===c?"selected":""}>${c}</option>`).join("")}
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
                ${e.searchResults.map((c,u)=>`
                  <tr>
                    <td><input type="checkbox" class="lb-search-check" data-idx="${u}" checked /></td>
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
            <span>✅ 取込済: <strong>${o}</strong></span>
            <span>❌ 除外: <strong>${l}</strong></span>
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
  `}const is={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Gr={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},Xr={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function te(e){return"¥"+e.toLocaleString("ja-JP")}function at(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Sn(e,t){const n=e.reduce((c,u)=>c+u.amount,0),o=Math.floor(n*t),l=n+o;return{subtotal:n,taxAmount:o,total:l}}const V={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function U(e,t){const n=e.align??"left",o=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${o}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function Vt(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),o=n-2018;return{y:o>0?String(o).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function Kr(e,t,n){const o=Vt(e.documentDate),l=Vt(e.orderDate??e.documentDate),c=Vt(e.deliveryDate??e.documentDate),u=e.lines.slice(0,6).map((g,w)=>{const _=V.detailStartY+w*V.detailRowH,L=V.detailCols,q=[],A=(R,E)=>{E&&q.push(U({...R,y:_,x:R.x+0},E))};return A(L.productName,g.productName+(g.spec?` ${g.spec}`:"")),A(L.productCode,g.productCode),A(L.color,g.color??""),A(L.size,[g.size,g.caseQty?`×${g.caseQty}`:""].filter(Boolean).join(" ")),A(L.unit,g.unit),A(L.quantity,g.quantity>0?g.quantity.toLocaleString("ja-JP"):""),A(L.correctedQty,g.correctedQuantity?g.correctedQuantity.toLocaleString("ja-JP"):""),A(L.discount,g.discount?g.discount.toLocaleString("ja-JP"):""),A(L.unitPrice,g.unitPrice>0?g.unitPrice.toLocaleString("ja-JP"):""),A(L.costAmount,g.amount>0?g.amount.toLocaleString("ja-JP"):""),A(L.retailPrice,g.retailPrice?g.retailPrice.toLocaleString("ja-JP"):""),A(L.note,g.receivedAmount?g.receivedAmount.toLocaleString("ja-JP"):""),q.join("")}).join(""),a=e.lines.reduce((g,w)=>g+(w.amount||0),0),i=e.lines.reduce((g,w)=>g+(w.retailPrice||0)*(w.correctedQuantity??w.quantity),0),r=e.lines.reduce((g,w)=>g+(w.receivedAmount||0),0),d=e.lines.reduce((g,w)=>g+(w.returnAmount||0),0),p=e.lines.reduce((g,w)=>g+w.quantity,0),m=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",h=n.calibrationOffsetX||0,f=n.calibrationOffsetY||0,$=`transform: translate(${h}mm, ${f}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${m}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${$}">
        ${U(V.currentDateY,o.y)}
        ${U(V.currentDateM,o.m)}
        ${U(V.currentDateD,o.d)}
        ${U(V.documentNo,e.documentNo)}
        ${e.settlementPrint?U(V.settlementCheck,"✓"):""}

        ${U(V.vendorName,t.name)}
        ${U(V.vendorAddress,t.address1)}
        ${U(V.chainStoreCode,e.chainStoreCode??"")}
        ${U(V.categoryCode,e.categoryCode??"")}
        ${U(V.slipNumber,e.documentNo)}
        ${U(V.vendorCode,e.slipTypeCode??"")}

        ${U(V.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${U(V.orderDateY,l.y)}
        ${U(V.orderDateM,l.m)}
        ${U(V.orderDateD,l.d)}
        ${U(V.deliveryDateY,c.y)}
        ${U(V.deliveryDateM,c.m)}
        ${U(V.deliveryDateD,c.d)}
        ${U(V.orderNo,e.orderNo??"")}
        ${U(V.partnerCode,e.vendorCode??"")}

        ${u}

        ${U(V.totalQty,p.toLocaleString("ja-JP"))}
        ${U(V.receivedTotal,r.toLocaleString("ja-JP"))}
        ${U(V.returnTotal,d.toLocaleString("ja-JP"))}
        ${U(V.correctedCostTotal,a.toLocaleString("ja-JP"))}
        ${U(V.correctedRetailTotal,i.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function Wr(e,t,n){const{subtotal:o,taxAmount:l,total:c}=Sn(e.lines,e.taxRate),u=e.previousBalance??0,a=e.paymentAmount??0,i=u-a+c,r=e.lines.map(p=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${p.note??""}</td>
        <td>${p.productName}${p.spec?` <span style="color:#636e72;font-size:9pt;">/ ${p.spec}</span>`:""}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${p.unit}</td>`:""}
        <td class="numeric">${te(p.unitPrice)}</td>
        <td class="numeric">${te(p.amount)}</td>
      </tr>
    `).join(""),d=Array.from({length:Math.max(0,6-e.lines.length)}).map(()=>`
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
        <div><dt>請求日</dt><dd>${at(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${at(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${te(i)}</span>
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
        <tbody>${r}${d}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${te(o)} / 消費税: ${te(l)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${u?`<tr><th>前回御請求額</th><td>${te(u)}</td></tr>`:""}
          ${a?`<tr><th>ご入金額</th><td>▲ ${te(a)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${te(o)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${te(l)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${te(i)}</td></tr>
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
  `}function Zr(e,t,n){const{subtotal:o,taxAmount:l,total:c}=Sn(e.lines,e.taxRate),u=e.lines.map(i=>`
      <tr>
        <td>${i.productName}${i.spec?` <span style="color:#636e72;font-size:9pt;">/ ${i.spec}</span>`:""}</td>
        <td class="numeric">${i.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${i.unit}</td>`:""}
        <td class="numeric">${te(i.unitPrice)}</td>
        <td class="numeric">${te(i.amount)}</td>
      </tr>
    `).join(""),a=Array.from({length:Math.max(0,5-e.lines.length)}).map(()=>`
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
        <div><dt>見積日</dt><dd>${at(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${at(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${te(c)}</span>
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
        <tbody>${u}${a}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${te(o)} / 消費税: ${te(l)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${te(o)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${te(l)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${te(c)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?at(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function ec(e,t,n,o){let l="";switch(e){case"chain_store":l=Kr(o,n,t);break;case"quotation":l=Zr(o,n,t);break;case"invoice_monthly":l=Wr(o,n,t);break}const c=Object.keys(is).map(i=>`<button class="tab-button ${e===i?"active":""}" data-print-template="${i}">${is[i]}</button>`).join(""),u=o.lines.map((i,r)=>`
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${r}" data-print-lfield="productName" value="${i.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${r}" data-print-lfield="quantity" value="${i.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${r}" data-print-lfield="unitPrice" value="${i.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${i.amount>0?i.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${r}">✕</button></td>
      </tr>`).join(""),a=[{key:"showSeal",label:"印影"},{key:"showRegistrationNo",label:"登録番号"},{key:"showBankInfo",label:"振込先"},{key:"showJanCode",label:"JAN"},{key:"showRemarks",label:"備考"}].map(i=>`<label style="font-size:12px;"><input type="checkbox" data-print-opt="${i.key}" ${t[i.key]?"checked":""} /> ${i.label}</label>`).join(" ");return`
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
              <tbody>${u||'<tr><td colspan="5" class="empty-row">行追加してください</td></tr>'}</tbody>
            </table>
          </div>
        </div>

        <details class="panel">
          <summary style="cursor:pointer;font-weight:700;font-size:14px;">⚙️ 表示オプション</summary>
          <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:12px;">
            ${a}
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
              ${l}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 印刷時はプレビューだけ表示 -->
    <div class="print-only">
      <div class="print-preview ${t.colorMode}">
        ${l}
      </div>
    </div>
  `}const tc={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},ac={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function sc(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],o="",l=!1;for(let a=0;a<e.length;a++){const i=e[a];l?i==='"'?e[a+1]==='"'?(o+='"',a++):l=!1:o+=i:i==='"'?l=!0:i===","?(n.push(o),o=""):i===`
`||i==="\r"?(i==="\r"&&e[a+1]===`
`&&a++,n.push(o),n.some(r=>r!=="")&&t.push(n),n=[],o=""):o+=i}if((o!==""||n.length>0)&&(n.push(o),n.some(a=>a!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const c=t[0].map(a=>a.trim()),u=[];for(let a=1;a<t.length;a++){const i={};c.forEach((r,d)=>{i[r]=(t[a][d]??"").trim()}),u.push(i)}return{columns:c,rows:u}}function nc(e,t,n){const o=tc[e],l=o.filter(a=>!t.includes(a)),c=n.map(a=>{const i=[];l.length>0&&i.push(`必須列欠損: ${l.join(",")}`);for(const r of o)t.includes(r)&&!a[r]&&i.push(`${r}が空`);return{...a,_valid:i.length===0,_error:i[0]}}),u=c.filter(a=>a._valid).length;return{entity:e,columns:t,rows:c,totalRows:n.length,validRows:u,invalidRows:c.length-u}}function oc(e){const n=ac[e],l={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+l.join(",")+`
`}async function ic(e,t){const{supabaseInsert:n}=await x(async()=>{const{supabaseInsert:a}=await Promise.resolve().then(()=>F);return{supabaseInsert:a}},void 0);let o=0,l=0;const u={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const a of t){if(!a._valid)continue;const{_valid:i,_error:r,...d}=a,p={...d};if(!p.id){const m=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";p.id=String(d[m]??`${e}-${Date.now()}-${o+l}`)}for(const m of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof p[m]=="string"&&p[m]!==""){const h=Number(p[m]);Number.isFinite(h)&&(p[m]=h)}try{await n(u,p)!==null?o++:l++}catch{l++}}return{inserted:o,failed:l}}function Jt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function lc(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function rc(e,t,n,o,l){const c=n.reduce((r,d)=>r+d.rowCount,0),u=n.map(r=>r.lastSyncAt).filter(r=>r!==null).sort().reverse()[0]??null,a=100,i=Math.max(1,Math.ceil(l/a));return`
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
        <p class="kpi-value">${u?Jt(u):"---"}</p>
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
        ${n.map(r=>`
          <button
            class="panel kpi-card ${e===r.tableName?"kpi-alert":""}"
            type="button"
            data-action="raw-select-table"
            data-table="${r.tableName}"
            style="cursor:pointer;text-align:left;border:2px solid ${e===r.tableName?"var(--primary)":"transparent"};transition:border-color .15s;"
          >
            <p class="panel-title" style="font-size:12px;">${r.displayName}</p>
            <p class="kpi-value" style="font-size:18px;">${r.rowCount.toLocaleString("ja-JP")}</p>
            <p class="kpi-sub" style="font-size:11px;">${r.lastSyncAt?Jt(r.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(r=>r.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${l.toLocaleString("ja-JP")}件中 ${((o-1)*a+1).toLocaleString("ja-JP")}-${Math.min(o*a,l).toLocaleString("ja-JP")} を表示</p>
        </div>
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="raw-page-prev" ${o<=1?"disabled":""}>← 前</button>
          <span style="padding:0 8px;">${o} / ${i}</span>
          <button class="button secondary" type="button" data-action="raw-page-next" ${o>=i?"disabled":""}>次 →</button>
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
            ${t.map(r=>`
            <tr>
              <td class="numeric mono">${r._record_index}</td>
              <td class="mono">${r._source_file||""}</td>
              <td class="numeric">${r._record_size??""} B</td>
              <td>${r._synced_at?Jt(r._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${r._raw_b64?r._raw_b64.slice(0,200):""}">${lc(r._raw_b64)}</td>
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
  `}const na=400,oa=240;function J(e){return e.toLocaleString("ja-JP")}function Yt(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function cc(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function ve(e,t,n,o=""){return`<th class="${o}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${cc(n,t)}</th>`}function We(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function dc(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const o=e.products.slice().sort((w,_)=>(e.productTotals[_.code]??0)-(e.productTotals[w.code]??0)).slice(0,6),l=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],c=820,u=280,a={top:20,right:20,bottom:40,left:60},i=c-a.left-a.right,r=u-a.top-a.bottom,d=t.map(w=>o.reduce((_,L)=>_+(n[L.code]?.[w]??0),0)),p=Math.max(...d,1),m=i/t.length,h=Math.max(m-10,14),f=[0,.25,.5,.75,1].map(w=>{const _=a.top+r-r*w,L=`${Math.round(p*w/100)*100}`;return`
      <line x1="${a.left}" y1="${_}" x2="${c-a.right}" y2="${_}" class="chart-grid" />
      <text x="6" y="${_+4}" class="chart-axis">${Number(L).toLocaleString("ja-JP")}</text>
    `}).join(""),$=t.map((w,_)=>{let L=a.top+r;const q=a.left+_*m+(m-h)/2,A=o.map((I,j)=>{const X=(n[I.code]?.[w]??0)/p*r;return L-=X,`<rect x="${q}" y="${L}" width="${h}" height="${X}" fill="${l[j%l.length]}" opacity="0.85" rx="${j===o.length-1?3:0}" />`}).join(""),[R,E]=w.split("-"),C=parseInt(E),M=C===1||_%3===0,k=C===1?`${R.slice(2)}年`:`${C}月`;return`<g>${A}${M?`<text x="${q+h/2}" y="${u-10}" class="chart-axis centered-axis">${k}</text>`:""}</g>`}).join(""),g=o.map((w,_)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${l[_%l.length]};"></span>
       ${w.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${c} ${u}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${f}${$}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${a.left}px;display:flex;flex-wrap:wrap;">${g}</div>
  `}function uc(e){const{months:t,products:n}=e,o=n.slice().sort((u,a)=>(e.productTotals[a.code]??0)-(e.productTotals[u.code]??0)).slice(0,50),l=t.map(u=>{const[a,i]=u.split("-"),r=parseInt(i);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${r===1?`${a.slice(2)}年1月`:`${r}月`}</th>`}).join(""),c=o.map(u=>{const a=t.map(i=>{const r=e.matrix[u.code]?.[i]??0;return`<td class="numeric">${r>0?J(r):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${u.code}</td>
        <td style="white-space:nowrap;">${u.name}</td>
        ${a}
        <td class="numeric"><strong>${J(e.productTotals[u.code]??0)}</strong></td>
        <td class="numeric">${J(Math.round(e.productAvg[u.code]??0))}</td>
        <td class="numeric">${J(Math.round(e.productStdDev[u.code]??0))}</td>
      </tr>
    `}).join("");return`
    <div class="table-wrap" style="overflow-x:auto;">
      <table>
        <thead>
          <tr>
            <th>コード</th>
            <th>商品名</th>
            ${l}
            <th class="numeric">合計</th>
            <th class="numeric">月平均</th>
            <th class="numeric">標準偏差</th>
          </tr>
        </thead>
        <tbody>${c||`<tr><td colspan="${t.length+5}" class="empty-row">データなし</td></tr>`}</tbody>
      </table>
    </div>
  `}function pc(e,t){const n=e.months[e.months.length-1]??"",o=e.months[e.months.length-2]??"",l=e.months.length-13,c=l>=0?e.months[l]:"",u=e.products.reduce((h,f)=>h+(e.matrix[f.code]?.[n]??0),0),a=e.products.reduce((h,f)=>h+(e.matrix[f.code]?.[o]??0),0),i=c?e.products.reduce((h,f)=>h+(e.matrix[f.code]?.[c]??0),0):0,r=a>0?(u-a)/a*100:0,d=i>0?(u-i)/i*100:0,p=h=>h>=0?"+":"",m=[1,2,3,5].map(h=>`<option value="${h}" ${h===t?"selected":""}>${h}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${J(u)} 本</p>
        <p class="kpi-sub">${Yt(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${r>=0?"":"text-danger"}">${p(r)}${r.toFixed(1)}%</p>
        <p class="kpi-sub">${Yt(o)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${d>=0?"":"text-danger"}">${i>0?`${p(d)}${d.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${c?`${Yt(c)} 比`:"前年データなし"}</p>
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
            <select data-action="demand-years-back" style="width:80px;">${m}</select>
          </label>
          <button class="button secondary" type="button" data-action="demand-csv-export">CSV出力</button>
        </div>
      </div>
      ${dc(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${uc(e)}
    </section>
  `}function mc(e,t){const o=e.slice().sort((c,u)=>{if(!t)return 0;const a=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return a*c.productName.localeCompare(u.productName,"ja");case"ss-avg":return a*(c.avgMonthlyDemand-u.avgMonthlyDemand);case"ss-std":return a*(c.demandStdDev-u.demandStdDev);case"ss-ss":{const i=Math.ceil(We(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30)),r=Math.ceil(We(u.serviceLevel)*u.demandStdDev*Math.sqrt(u.leadTimeDays/30));return a*(i-r)}case"ss-rop":{const i=Math.ceil(c.avgMonthlyDemand*(c.leadTimeDays/30)+We(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30)),r=Math.ceil(u.avgMonthlyDemand*(u.leadTimeDays/30)+We(u.serviceLevel)*u.demandStdDev*Math.sqrt(u.leadTimeDays/30));return a*(i-r)}default:return 0}}).map(c=>{const u=We(c.serviceLevel),a=c.leadTimeDays/30,i=Math.ceil(u*c.demandStdDev*Math.sqrt(a)),r=Math.ceil(c.avgMonthlyDemand*a+i),d=i-c.safetyStockQty,p=d>0?"text-danger":d<-i*.3?"text-warning":"",m=[.9,.95,.99].map(h=>`<option value="${h}" ${Math.abs(c.serviceLevel-h)<.01?"selected":""}>${(h*100).toFixed(0)}%</option>`).join("");return`
      <tr>
        <td style="white-space:nowrap;">${c.productName}</td>
        <td class="numeric">${J(Math.round(c.avgMonthlyDemand))}</td>
        <td class="numeric">${J(Math.round(c.demandStdDev))}</td>
        <td>
          <input class="input-sm" type="number" min="1" max="180"
            value="${c.leadTimeDays}"
            data-action="ss-lead-time" data-code="${c.productCode}"
            style="width:60px;text-align:right;" />
        </td>
        <td>
          <select class="input-sm" data-action="ss-service-level" data-code="${c.productCode}"
            style="width:64px;">${m}</select>
        </td>
        <td class="numeric"><strong>${J(i)}</strong></td>
        <td class="numeric">${J(r)}</td>
        <td class="numeric ${p}">
          ${d>0?`+${J(d)}`:J(d)}
          ${d>0?'<span class="status-pill warning" style="margin-left:4px">不足</span>':""}
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
          <select id="bulk-service-level" style="width:90px;">${[.9,.95,.99].map(c=>`<option value="${c}" ${c===.95?"selected":""}>${(c*100).toFixed(0)}%</option>`).join("")}</select>
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
              ${ve("商品名","ss-name",t)}
              ${ve("月平均需要","ss-avg",t,"numeric")}
              ${ve("標準偏差","ss-std",t,"numeric")}
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              ${ve("安全在庫[算出]","ss-ss",t,"numeric")}
              ${ve("発注点","ss-rop",t,"numeric")}
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${o||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const yc={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function hc(e,t,n,o){const l={draft:"下書き",confirmed:"確定",actual:"実績入力済"},c={draft:"neutral",confirmed:"info",actual:"success"},u=E=>Object.entries(yc).map(([C,M])=>`<option value="${C}" ${C===E?"selected":""}>${M}</option>`).join(""),a=640,i=E=>E.map(C=>{const M=Math.max(0,C.demandForecast+C.safetyStockTarget-C.openingStock),k=C.plannedQty>0?C.plannedQty:Math.round(M),I=k>0?Math.ceil(k/a*10)/10:0,j=C.plannedQty>0?(C.actualQty-C.plannedQty)/C.plannedQty*100:null,K=j!==null?j>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${C.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${C.productCode}"
            style="width:92px;">${u(C.productionType)}</select>
        </td>
        <td class="numeric">${J(Math.round(C.demandForecast))}</td>
        <td class="numeric">${J(Math.round(C.safetyStockTarget))}</td>
        <td class="numeric">${J(Math.round(C.openingStock))}</td>
        <td class="numeric"><strong>${J(Math.round(M))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${C.plannedQty}"
            data-action="plan-qty" data-code="${C.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">${C.actualQty>0?J(C.actualQty):"—"}</td>
        <td class="numeric ${K}">
          ${j!==null?`${j>=0?"+":""}${j.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${I>0?`${I.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${c[C.status]??"neutral"}">${l[C.status]??C.status}</span>
        </td>
      </tr>
    `}).join(""),d=(n==="all"?e:e.filter(E=>E.productionType===n)).slice().sort((E,C)=>{if(!o)return 0;const M=o.dir==="asc"?1:-1,k=Math.max(0,E.demandForecast+E.safetyStockTarget-E.openingStock),I=Math.max(0,C.demandForecast+C.safetyStockTarget-C.openingStock);switch(o.column){case"plan-name":return M*E.productName.localeCompare(C.productName,"ja");case"plan-forecast":return M*(E.demandForecast-C.demandForecast);case"plan-required":return M*(k-I);case"plan-planned":return M*(E.plannedQty-C.plannedQty);case"plan-actual":return M*(E.actualQty-C.actualQty);case"plan-label":{const j=E.plannedQty>0?E.plannedQty:Math.round(k),K=C.plannedQty>0?C.plannedQty:Math.round(I);return M*(j-K)}default:return 0}}),p=i(d),m=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],h=E=>{const M=(E==="all"?e:e.filter(k=>k.productionType===E)).reduce((k,I)=>{const j=Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock);return k+(I.plannedQty>0?I.plannedQty:Math.round(j))},0);return Math.ceil(M/a*10)/10},f=m.filter(E=>E.key!=="all").map(E=>{const C=h(E.key),M=e.filter(I=>I.productionType===E.key).length,k=E.key==="make_to_order"?e.filter(I=>I.productionType==="make_to_order"&&I.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${E.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${C>0?C.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${M}商品${k!==null?` · 受注${k}件`:""}</p>
      </div>
    `}).join(""),$=d.reduce((E,C)=>E+C.demandForecast,0),g=d.reduce((E,C)=>E+Math.max(0,C.demandForecast+C.safetyStockTarget-C.openingStock),0),w=d.reduce((E,C)=>E+C.plannedQty,0),_=d.reduce((E,C)=>E+C.actualQty,0),L=h(n),q=new Date,A=Array.from({length:24},(E,C)=>{const M=new Date(q.getFullYear(),q.getMonth()-6+C,1),k=`${M.getFullYear()}-${String(M.getMonth()+1).padStart(2,"0")}`;return`<option value="${k}" ${k===t?"selected":""}>${k.replace("-","年")}月</option>`}).join(""),R=m.map(E=>`<button class="button ${n===E.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${E.key}"
       style="padding:4px 12px;font-size:13px;">${E.label}</button>`).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${A}</select>
      </label>
      <button class="button secondary" type="button" data-action="plan-recalc">需要予測を再計算</button>
    </div>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>ラベル工数サマリ</h2><p class="panel-caption">表+裏 手貼り 80本/時 × 8h = 640本/人日</p></div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${f}</div>
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
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${R}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ve("商品名","plan-name",o)}
              <th>生産区分</th>
              ${ve("需要予測","plan-forecast",o,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${ve("必要生産数","plan-required",o,"numeric")}
              ${ve("計画数","plan-planned",o,"numeric")}
              ${ve("実績数","plan-actual",o,"numeric")}
              <th class="numeric">達成率</th>
              ${ve("ラベル工数","plan-label",o,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${p||'<tr><td colspan="11" class="empty-row">データなし</td></tr>'}
            ${d.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${J(Math.round($))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${J(Math.round(g))}</td>
                <td class="numeric">${J(w)}</td>
                <td class="numeric">${_>0?J(_):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${L.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function kn(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n,0).getDate();return Array.from({length:o},(l,c)=>{const u=c+1;return`${e}-${String(u).padStart(2,"0")}`})}function ls(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function rs(e){const t=new Date(e).getDay();return t===0||t===6}function vc(e){return e.partTimers*na+e.employees*oa}function Pn(e){return e.partTimers+e.employees}function fc(e,t){const n=t.filter(u=>Pn(u)>0).map(u=>u.date).sort();if(n.length===0)return t.map(u=>({date:u.date,partTimers:u.partTimers,employees:u.employees,confirmed:u.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const o={monthly:0,november:1,annual:2,make_to_order:3},l=e.filter(u=>u.plannedQty>0||Math.max(0,u.demandForecast+u.safetyStockTarget-u.openingStock)>0).map(u=>({productCode:u.productCode,productName:u.productName,productionType:u.productionType,remaining:u.plannedQty>0?u.plannedQty:Math.max(0,u.demandForecast+u.safetyStockTarget-u.openingStock)})).filter(u=>u.remaining>0).sort((u,a)=>(o[u.productionType]??99)-(o[a.productionType]??99)||a.remaining-u.remaining),c=new Map;for(const u of t){const a=vc(u);c.set(u.date,{date:u.date,partTimers:u.partTimers,employees:u.employees,confirmed:u.confirmed,capacity:a,items:[],totalQty:0,utilization:0})}for(const u of l){let a=u.remaining;if(a<=0)continue;if(n.reduce((r,d)=>{const p=c.get(d);return r+Math.max(0,p.capacity-p.totalQty)},0)<=0)break;for(const r of n){if(a<=0)break;const d=c.get(r),p=Math.max(0,d.capacity-d.totalQty);if(p<=0)continue;const m=Math.min(a,p);d.items.push({productCode:u.productCode,productName:u.productName,productionType:u.productionType,qty:m}),d.totalQty+=m,d.utilization=d.capacity>0?d.totalQty/d.capacity:0,a-=m}}return t.map(u=>c.get(u.date))}function _t(e,t=1,n=1){return kn(e).map(o=>({date:o,partTimers:rs(o)?0:t,employees:rs(o)?0:n,confirmed:!1}))}function gc(e,t,n,o=null){const l=kn(t),c=fc(e,n),u=new Map(c.map(k=>[k.date,k])),a=e.reduce((k,I)=>k+(I.plannedQty>0?I.plannedQty:Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock)),0),i=c.reduce((k,I)=>k+I.totalQty,0),r=n.filter(k=>Pn(k)>0).length,d=c.reduce((k,I)=>k+I.capacity,0),p=n.reduce((k,I)=>k+I.partTimers,0),m=n.reduce((k,I)=>k+I.employees,0),h=n.find(k=>k.partTimers>0)?.partTimers??1,f=n.find(k=>k.employees>0)?.employees??1,$=[0,1,2,3,4,5].map(k=>`<option value="${k}" ${k===h?"selected":""}>${k}</option>`).join(""),g=[0,1,2,3].map(k=>`<option value="${k}" ${k===f?"selected":""}>${k}</option>`).join(""),w=new Date,_=Array.from({length:24},(k,I)=>{const j=new Date(w.getFullYear(),w.getMonth()-6+I,1),K=`${j.getFullYear()}-${String(j.getMonth()+1).padStart(2,"0")}`;return`<option value="${K}" ${K===t?"selected":""}>${K.replace("-","年")}月</option>`}).join(""),L=new Date(l[0]).getDay(),q=[];for(let k=0;k<L;k++)q.push('<div style="min-height:44px;"></div>');for(const k of l){const I=u.get(k),j=new Date(k).getDay(),K=parseInt(k.split("-")[2]),X=I?.partTimers??0,ne=I?.employees??0,ce=X+ne,ge=I?.totalQty??0,de=I?.utilization??0,T=k===o,H=ce===0?"var(--surface-alt)":de>.95?"rgba(197,61,61,0.12)":de>.7?"rgba(183,121,31,0.10)":de>0?"rgba(47,133,90,0.08)":"var(--surface)",Ye=ce===0?"transparent":de>.95?"#c53d3d":de>.7?"#b7791f":de>0?"#2f855a":"var(--border)",Le=j===0?"#c53d3d":j===6?"#0F5B8D":"var(--text)",De=ce>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${X>0?`パ${X}`:""}${ne>0?`社${ne}`:""}</span>`:"";q.push(`
      <div data-action="cal-select-day" data-date="${k}"
        style="min-height:44px;padding:3px;border:${T?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${H};cursor:pointer;display:flex;flex-direction:column;
          ${T?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${Le};line-height:1;">${K}</span>
          ${De}
        </div>
        ${ce>0?`
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${ge>0?J(ge):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(de*100,100)}%;background:${Ye};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const R=q.length%7;if(R>0)for(let k=0;k<7-R;k++)q.push('<div style="min-height:44px;"></div>');const E=o?u.get(o):null;o&&n.find(k=>k.date===o);const C=o&&E?(()=>{const k=E,I=parseInt(o.split("-")[2]),j=ls(o),K=Math.round(k.utilization*100),X=n.find(T=>T.date===o),ne={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},ce={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},ge=k.items.map(T=>`
      <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
        <span style="width:8px;height:8px;border-radius:50%;background:${ne[T.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${T.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${ce[T.productionType]??T.productionType}</div>
        </div>
        <div style="font-size:14px;font-weight:700;white-space:nowrap;">${J(T.qty)}<span style="font-size:11px;font-weight:400;">本</span></div>
      </div>
    `).join(""),de=`パート${k.partTimers}人×${na} + 社員${k.employees}人×${oa} = ${J(k.capacity)}本`;return`
      <section class="panel" style="margin-top:12px;border:2px solid #0F5B8D;">
        <div class="panel-header" style="padding-bottom:8px;">
          <h2>${I}日（${j}）の生産内訳</h2>
          <p class="panel-caption">${de} ・ 稼働率${K}%</p>
        </div>
        <div style="display:flex;gap:12px;padding:0 4px 8px;flex-wrap:wrap;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="${X?.partTimers??0}"
              data-action="cal-shift-part" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="${X?.employees??0}"
              data-action="cal-shift-emp" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
        ${k.items.length>0?`
          <div style="padding:0 4px;">
            ${ge}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${J(k.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():o?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(o.split("-")[2])}日（${ls(o)}）— 休日</p>
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
  `:"",M=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(k=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${k.color};"></span>${k.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${_}</select>
      </label>
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>パート</span>
        <select data-action="cal-default-part" style="width:54px;">${$}</select>
      </label>
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>社員</span>
        <select data-action="cal-default-emp" style="width:54px;">${g}</select>
      </label>
      <button class="button secondary" type="button" data-action="cal-reset-shifts"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">リセット</button>
      <button class="button primary" type="button" data-action="cal-confirm-all"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">全日確定</button>
    </div>

    <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;font-size:12px;">
      <span><strong>${J(Math.round(a))}</strong>本予定</span>
      <span><strong>${J(Math.round(i))}</strong>本配分${a>0?`（${Math.round(i/a*100)}%）`:""}</span>
      <span><strong>${r}</strong>日稼働</span>
      <span>パ<strong>${p}</strong> 社<strong>${m}</strong>人日</span>
      <span>キャパ<strong>${J(d)}</strong>本</span>
    </div>
    <div style="font-size:10px;color:var(--text-secondary);margin-bottom:8px;">
      パート: 80本/時×5h=<strong>${na}</strong>本/人日　社員: 80本/時×3h=<strong>${oa}</strong>本/人日
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${M}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((k,I)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${I===0?"#c53d3d":I===6?"#0F5B8D":"var(--text-secondary)"};">${k}</div>`).join("")}
        ${q.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">日付をタップで詳細表示</p>
    </section>

    ${C}
  `}function bc(e,t,n,o,l,c,u="all",a=null,i=[],r=null){const p=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(h=>`<button class="tab-button ${o===h.key?"active":""}"
       data-demand-tab="${h.key}">${h.label}</button>`).join("");let m="";if(o==="demand")m=e?pc(e,c):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(o==="safety")m=mc(t,a);else if(o==="plan")m=hc(n,l,u,a);else if(o==="calendar")try{m=gc(n,l,i,r)}catch(h){console.error("[renderCalendarTab] error:",h),m=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(h)}
${h?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${p}
    </div>

    ${m}
  `}const nt={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},It=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function je(e){return e.toLocaleString("ja-JP")}function Fe(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function Ea(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function $c(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function _c(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(g=>g.month))].sort(),n=It.filter(g=>e.some(w=>w.brewCategory===g)),o={};for(const g of e)o[g.month]||(o[g.month]={}),o[g.month][g.brewCategory]=g.shipmentMl;const l=820,c=300,u={top:20,right:20,bottom:50,left:70},a=l-u.left-u.right,i=c-u.top-u.bottom,r=t.map(g=>n.reduce((w,_)=>w+(o[g]?.[_]??0),0)),d=Math.max(...r,1),p=a/t.length,m=Math.max(p-8,14),h=[0,.25,.5,.75,1].map(g=>{const w=u.top+i-i*g,_=d*g/1e3;return`
      <line x1="${u.left}" y1="${w}" x2="${l-u.right}" y2="${w}" class="chart-grid" />
      <text x="6" y="${w+4}" class="chart-axis">${Math.round(_).toLocaleString("ja-JP")}L</text>
    `}).join(""),f=t.map((g,w)=>{let _=u.top+i;const L=u.left+w*p+(p-m)/2,q=n.map(k=>{const I=o[g]?.[k]??0,j=I/d*i;return _-=j,j>0?`<rect x="${L}" y="${_}" width="${m}" height="${j}" fill="${nt[k]??"#9ca3af"}" opacity="0.85" rx="1"><title>${k}: ${Fe(I)}L</title></rect>`:""}).join(""),[A,R]=g.split("-"),E=parseInt(R),C=E===10||w%2===0,M=E===10?`${A}年度`:`${E}月`;return`<g>${q}${C?`<text x="${L+m/2}" y="${c-12}" class="chart-axis centered-axis" style="font-size:10px;">${M}</text>`:""}</g>`}).join(""),$=n.map(g=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${nt[g]??"#9ca3af"};"></span>
       ${g}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${l} ${c}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${h}${f}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${u.left}px;display:flex;flex-wrap:wrap;">${$}</div>
  `}function wc(e){const t=new Map;for(const o of e){const l=o.brewCategory;t.has(l)||t.set(l,{rows:[],totalMl:0,avgMl:0,stockL:0,months:0});const c=t.get(l);c.rows.push(o),c.totalMl+=o.totalShipmentMl,c.avgMl+=o.monthlyAvgMl,c.stockL=o.currentStockL,c.months=o.monthsRemaining}for(const[,o]of t)o.avgMl>0&&(o.months=Math.round(o.stockL*1e3/o.avgMl*10)/10);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${It.filter(o=>t.has(o)).map(o=>{const l=t.get(o),c=nt[o]??"#9ca3af",u=Ea(l.months),a=$c(l.months),i=Math.min(l.months/6*100,100);return`
        <div class="card" style="border-top:3px solid ${c};min-width:220px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${c};">${o}</h4>
            <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${u}20;color:${u};font-weight:600;">${a}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:12px;margin-bottom:8px;">
            <div><span style="color:#6b7280;">現在庫</span><br><strong>${je(l.stockL)}L</strong></div>
            <div><span style="color:#6b7280;">月平均移出</span><br><strong>${Fe(l.avgMl)}L</strong></div>
          </div>
          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数</span>
            <span style="font-weight:600;color:${u};">${l.months.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${u};height:100%;width:${i}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function xc(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const l of e)t.has(l.brewCategory)||t.set(l.brewCategory,[]),t.get(l.brewCategory).push(l);const n=`
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
  `,o=[];for(const l of It){const c=t.get(l);if(!c)continue;const u=nt[l]??"#9ca3af",a=c.length>1,i=c.reduce((g,w)=>g+w.totalShipmentQty,0),r=c.reduce((g,w)=>g+w.totalShipmentMl,0),d=c.reduce((g,w)=>g+w.monthlyAvgQty,0),p=c.reduce((g,w)=>g+w.monthlyAvgMl,0),m=c.reduce((g,w)=>g+w.productCount,0),h=c[0].currentStockL,f=p>0?Math.round(h*1e3/p*10)/10:0,$=Ea(f);if(o.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${a?"pointer":"default"};" ${a?`data-toggle-cat="${l}"`:""}>
        <td style="color:${u};">
          ${a?`<span class="toggle-icon" data-cat="${l}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${l}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${m}</td>
        <td style="text-align:right;">${je(i)}</td>
        <td style="text-align:right;">${Fe(r)}</td>
        <td style="text-align:right;">${je(d)}</td>
        <td style="text-align:right;">${Fe(p)}</td>
        <td style="text-align:right;">${je(h)}</td>
        <td style="text-align:right;color:${$};font-weight:700;">${f.toFixed(1)}</td>
      </tr>
    `),a)for(const g of c)o.push(`
          <tr class="sub-row-${l.replace(/[^a-zA-Z0-9]/g,"_")}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${g.subCategory}</td>
            <td style="text-align:right;">${g.productCount}</td>
            <td style="text-align:right;">${je(g.totalShipmentQty)}</td>
            <td style="text-align:right;">${Fe(g.totalShipmentMl)}</td>
            <td style="text-align:right;">${je(g.monthlyAvgQty)}</td>
            <td style="text-align:right;">${Fe(g.monthlyAvgMl)}</td>
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
  `}function Sc(e){const t=new Map;for(const o of e)t.has(o.brewCategory)||t.set(o.brewCategory,{avgMl:0,stockL:o.currentStockL}),t.get(o.brewCategory).avgMl+=o.monthlyAvgMl;return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫残月数プロジェクション</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕あり</span>
      </div>
      ${It.filter(o=>t.has(o)).map(o=>{const l=t.get(o),c=l.avgMl>0?Math.round(l.stockL*1e3/l.avgMl*10)/10:0,u=nt[o]??"#9ca3af",a=Ea(c),i=Math.min(c/8*100,100);return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:80px;font-size:12px;font-weight:500;color:${u};text-align:right;">${o}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:20px;overflow:hidden;position:relative;">
            <div style="background:${a};height:100%;width:${i}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:2px;left:8px;font-size:11px;font-weight:600;color:#374151;">${c.toFixed(1)}ヶ月</span>
          </div>
        </div>
      `}).join("")}
    </div>
  `}function kc(e,t,n){const o=new Date,l=o.getMonth()>=9?o.getFullYear():o.getFullYear()-1,c=Array.from({length:5},(a,i)=>{const r=l-i;return`<option value="${r}" ${r===n?"selected":""}>${r}年度 (${r}/10-${r+1}/9)</option>`}).join(""),u=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return u||`
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div>
          <h2 style="margin:0;font-size:18px;">醸造計画</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;">特定名称酒区分別の出荷実績と在庫状況</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <label for="brewing-fy-select" style="font-size:13px;font-weight:500;">会計年度:</label>
          <select id="brewing-fy-select" class="input" style="width:auto;min-width:200px;">
            ${c}
          </select>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:14px;margin:0 0 8px 0;">月次移出推移（区分別）</h3>
        ${_c(t)}
      </div>

      ${wc(e)}

      ${Sc(e)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${xc(e)}
      </div>
    </section>
  `}function ia(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function Pc(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function An(e){return e?Lt.find(t=>t.value===e)?.label??e:""}function Ac(e){const t=[],n=[],o=[];for(const l of e){const c=l.amount_last_year_same_month>0?l.amount_this_month/l.amount_last_year_same_month:1,u={code:l.customer_code,name:l.customer_name,businessType:l.business_type,areaCode:l.area_code,phone:l.phone,lastOrderDate:l.last_order_date,daysSinceLastOrder:l.days_since_order,totalAmountLast12m:l.amount_12m,amount3m:l.amount_3m,amountThisMonth:l.amount_this_month,amountLastYearSameMonth:l.amount_last_year_same_month,annualRevenue:l.annual_revenue,yoyRatio:c,status:"dormant"};l.is_at_risk?t.push({...u,status:"at-risk"}):l.is_dormant?n.push({...u,status:"dormant"}):l.amount_last_year_same_month>0&&c<.8&&o.push({...u,status:"declining"})}return t.sort((l,c)=>c.totalAmountLast12m-l.totalAmountLast12m),n.sort((l,c)=>c.daysSinceLastOrder-l.daysSinceLastOrder),o.sort((l,c)=>l.yoyRatio-c.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:o}}function Cc(e,t){const n=t?.reason??"",o=Lt.map(l=>`<option value="${l.value}" ${n===l.value?"selected":""}>${l.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${o}
    </select>`}function Ec(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],o=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',l=!!t?.actionedAt,c=l?'style="opacity:0.45;"':"",u=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${An(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${l?"1":"0"}" ${c}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${u}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${o}
      <td class="numeric">${ia(e.totalAmountLast12m)}</td>
      <td>${Cc(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${l?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function Ut(e,t,n,o,l,c,u,a){if(l.length===0)return"";const i=l.map(r=>Ec(r,a.get(r.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${o}" style="margin-right:8px;">${l.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${Pc(c)}</p>
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
              <th class="numeric">${u}</th>
              <th class="numeric" data-sort="amount12m">12M売上</th>
              <th>注文しない理由</th>
              <th>対応済</th>
              <th>電話</th>
            </tr>
          </thead>
          <tbody>${i}</tbody>
        </table>
      </div>
    </section>`}function Lc(e,t=[]){const{atRiskCustomers:n,dormantCustomers:o,decliningCustomers:l}=e,c=n.length+o.length+l.length,u=n.reduce((g,w)=>g+w.totalAmountLast12m,0),a=o.reduce((g,w)=>g+w.totalAmountLast12m,0),i=l.reduce((g,w)=>g+w.totalAmountLast12m,0),r=[...n,...o,...l],d=[...new Set(r.map(g=>g.areaCode).filter(Boolean))].sort(),p=[...new Set(r.map(g=>g.businessType).filter(Boolean))].sort(),m=new Map(t.map(g=>[g.customerCode,g])),h=t.filter(g=>g.actionedAt).length,f=new Map;t.forEach(g=>{g.reason&&f.set(g.reason,(f.get(g.reason)??0)+1)});const $=[...f.entries()].sort((g,w)=>w[1]-g[1]).slice(0,5).map(([g,w])=>`<span class="status-pill info" style="font-size:0.75rem;">${An(g)} ${w}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${ia(u)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${o.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${ia(a)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${l.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${h}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-muted);">${c}社中</div>
      </div>
    </section>

    ${$?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${$}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${c})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${o.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${l.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${d.map(g=>`<option value="${g}">${g}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${p.map(g=>`<option value="${g}">${g}</option>`).join("")}
      </select>
    </div>

    ${Ut("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,u,"状況",m)}
    ${Ut("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",o,a,"経過日数",m)}
    ${Ut("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",l,i,"前年同月比",m)}

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
    <\/script>`}const we=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],la={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},_e={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function Dc(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ic(e){const t=e.reduce((c,u)=>c+u,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const o=Math.max(...e);return e.filter(c=>c>o*.1).length<=6?"seasonal":"year-round"}function qc(e){const t=e.reduce((c,u)=>c+u,0);if(t===0)return[];const o=t/12*1.5,l=[];for(let c=0;c<12;c++)e[c]>o&&l.push(c);if(l.length===0){const c=Math.max(...e);c>0&&l.push(e.indexOf(c))}return l.sort((c,u)=>c-u)}function Tc(e){return e.length===0?0:(e[0]-2+12)%12}function cs(e){const t=new Date().getMonth(),n=e.map(l=>{const c=Ic(l.monthlyQuantity),u=qc(l.monthlyQuantity),a=Tc(u);return{code:l.code,name:l.name,category:l.category,peakMonths:u,proposalStartMonth:a,seasonType:c,monthlyQuantity:l.monthlyQuantity}}),o=[];for(let l=0;l<12;l++){const c=n.filter(u=>{if(u.peakMonths.length===0)return!1;const a=u.proposalStartMonth,i=u.peakMonths[0];return a<=i?l>=a&&l<=i:l>=a||l<=i});o.push({month:l,products:c,targetCustomers:[]})}return{products:n,proposals:o,selectedMonth:t}}function Nc(e){const{products:t,proposals:n,selectedMonth:o}=e,l=new Date().getMonth(),c={"year-round":[],seasonal:[],"year-end":[]};t.forEach(p=>c[p.seasonType].push(p));const u=n[o],a=t.length,i=u?.products.length??0,r=t.filter(p=>p.peakMonths.includes(o)).length,d=u?.targetCustomers.length??0;return`
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
      <div class="mono numeric" style="font-size:1.5rem">${a}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${we[o]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${i}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${we[o]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${r}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${d}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${we.map((p,m)=>{const h=m===l,f=m===o;return`<button class="button" style="padding:4px 10px;background:${f?"#0F5B8D":h?"#e2e8f0":"transparent"};color:${f?"#fff":"#333"};border:${h&&!f?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${m}">${p}${h?" ●":""}</button>`}).join("")}
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
            ${we.map((p,m)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${m===l?"background:#f0f7ff;":""}">${p.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${Mc(c,l)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${Rc(c,o)}

  <!-- Target customer list for selected month -->
  ${Oc(u)}
</div>`}function Mc(e,t){const n=[],o=["year-round","seasonal","year-end"];for(const l of o){const c=e[l];if(c.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${_e[l]}15;color:${_e[l]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${la[l]}</span>
    </td></tr>`);for(const u of c){const a=we.map((i,r)=>{const d=u.peakMonths.includes(r),p=Cn(u,r),m=r===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let h="transparent";d?h=_e[u.seasonType]:p&&(h=_e[u.seasonType]+"40");const f=d||p?`background:${h};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${m}"><div style="${f}" title="${d?"ピーク":p?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${u.name}"><span class="mono" style="font-size:0.7rem;color:#888">${u.code}</span> ${u.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${_e[u.seasonType]}15;color:${_e[u.seasonType]}">${la[u.seasonType]}</span></td>
        ${a}
      </tr>`)}}}return n.join("")}function Cn(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,o=e.peakMonths[0];return n<=o?t>=n&&t<o:t>=n||t<o}function Rc(e,t){const o=["year-round","seasonal","year-end"].map(l=>{const c=e[l];if(c.length===0)return"";const u=c.filter(i=>i.peakMonths.includes(t)||Cn(i,t));if(u.length===0)return"";const a=u.map(i=>{const d=i.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',p=i.monthlyQuantity.reduce((m,h)=>m+h,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${i.code}</td>
        <td style="padding:6px 8px">${i.name}</td>
        <td style="padding:6px 8px">${d}</td>
        <td class="mono numeric" style="padding:6px 8px">${i.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${p.toLocaleString()}</td>
        <td style="padding:6px 8px">${i.peakMonths.map(m=>we[m]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${_e[l]}15;color:${_e[l]}">${la[l]}</span>
        <span style="font-size:0.85rem;color:#666">${we[t]}の対象: ${u.length}品</span>
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
        <tbody>${a}</tbody>
      </table>
    </div>`}).filter(Boolean);return o.length===0?`<div style="padding:1rem;color:#666;text-align:center">${we[t]}に提案対象の商品はありません</div>`:o.join("")}function Oc(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${Dc(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const jc=["日","月","火","水","木","金","土"];function Fc(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n-1,1),l=new Date(t,n,0),c=[];for(let u=0;u<o.getDay();u++)c.push({outside:!0});for(let u=1;u<=l.getDate();u++)c.push({date:`${e}-${String(u).padStart(2,"0")}`});for(;c.length%7!==0;)c.push({outside:!0});return c}function zc(e,t,n){const[o,l]=t.split("-").map(Number),c=new Date(o,l-2,1),u=new Date(o,l,1),a=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,i=`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`,r=new Date().toISOString().slice(0,10),p=Fc(t).map($=>{if($.outside)return'<div class="sc-cell sc-outside"></div>';const g=$.date,w=Number(g.split("-")[2]),_=new Date(`${g}T00:00:00`).getDay(),L=e?.[g],q=g===r,A=g===n;let R="",E="";return L&&(R=`<span class="sc-badge">${L.count}件</span>`,E=L.cityGroups.slice(0,3).map(C=>`<span class="sc-city-tag">${C.city}<em>${C.count}</em></span>`).join(""),L.cityGroups.length>3&&(E+=`<span class="sc-city-more">+${L.cityGroups.length-3}</span>`)),`
      <div class="sc-cell ${q?"sc-today":""} ${A?"sc-selected":""} ${L?"sc-has-data":""}"
           data-sc-date="${g}">
        <div class="sc-day-header">
          <span class="sc-day-num ${_===0?"sc-sun":_===6?"sc-sat":""}">${w}</span>
          ${R}
        </div>
        <div class="sc-cities">${E}</div>
      </div>
    `}).join(""),m=n&&e?.[n]?Bc(e[n]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',h=Object.values(e??{}).reduce(($,g)=>$+g.count,0),f=Object.values(e??{}).reduce(($,g)=>$+g.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${h>0?`月計: <strong>${h}件</strong> / <strong>¥${f.toLocaleString()}</strong>`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${a}">◀</button>
          <span class="sc-month-label">${o}年${l}月</span>
          <button class="sc-nav-btn" data-sc-ym="${i}">▶</button>
        </div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays">
            ${jc.map(($,g)=>`<div class="sc-weekday ${g===0?"sc-sun":g===6?"sc-sat":""}">${$}</div>`).join("")}
          </div>
          <div class="sc-grid">
            ${e===null?'<div class="sc-loading"><div class="loading-spinner"></div><p>読み込み中…</p></div>':p}
          </div>
        </div>

        <div class="sc-detail-col">
          ${m}
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
  `}function Bc(e){const t=e.date.replace(/-/g,"/").slice(5),n={};for(const l of e.entries)(n[l.city]??=[]).push(l);const o=Object.entries(n).sort((l,c)=>c[1].length-l[1].length).map(([l,c])=>{const u=c.sort((a,i)=>i.amount-a.amount).map(a=>`
          <div class="sc-customer-row">
            <span class="sc-customer-name" title="${a.customerName}">${a.customerName}</span>
            <span class="sc-customer-amt">${a.amount>0?`¥${a.amount.toLocaleString()}`:"-"}</span>
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${l}（${c.length}件）</div>
          ${u}
        </div>`}).join("");return`
    <p class="sc-detail-date">${t}の出荷</p>
    <p class="sc-detail-meta">${e.count}件 / ¥${e.totalAmount.toLocaleString()}</p>
    ${o}
  `}const Vc=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),Qt=["月","火","水","木","金"],ds=6;function Jc(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function Yc(e,t){if(t.length===0)return 0;const n=[...t].sort((l,c)=>l-c);return n.filter(l=>l<=e).length/n.length}function Uc(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function us(e){const t=new Date,n=e.map(i=>i.annualRevenue),o=e.map(i=>{const r=Jc(i.lastOrderDate,t);let d=0;const p=[];r>=60&&(d+=50,p.push("離反リスク")),i.hasSeasonalProposal&&(d+=30,p.push("季節提案タイミング")),r>=30&&r<60&&(d+=20,p.push("定期巡回"));const m=Yc(i.annualRevenue,n),h=Math.round(m*20);h>0&&(d+=h,p.push("金額ウェイト"));const f=Uc(p,r);return{code:i.code,name:i.name,phone:i.phone,address:i.address1,areaCode:i.areaCode,businessType:i.businessType,priorityScore:d,reasons:p,lastOrderDate:i.lastOrderDate,daysSinceOrder:r,annualRevenue:i.annualRevenue,recommendedAction:f}}).filter(i=>i.priorityScore>0).sort((i,r)=>r.priorityScore-i.priorityScore),l=new Map;for(const i of o){const r=i.areaCode||"その他";l.has(r)||l.set(r,[]),l.get(r).push(i)}const c=[...l.entries()].sort((i,r)=>r[1].reduce((d,p)=>d+p.priorityScore,0)-i[1].reduce((d,p)=>d+p.priorityScore,0)),u=[];let a=0;for(const[i,r]of c){const d=r.sort((p,m)=>m.priorityScore-p.priorityScore);for(let p=0;p<d.length&&!(a>=Qt.length);p+=ds){const m=d.slice(p,p+ds);u.push({dayLabel:Qt[a],area:i,visits:m}),a++}if(a>=Qt.length)break}return{candidates:o,weekPlan:u,filterArea:"",filterMinScore:0}}function Qc(e){const{candidates:t,weekPlan:n,filterArea:o,filterMinScore:l}=e,c=t.filter(p=>!(o&&p.areaCode!==o||l>0&&p.priorityScore<l)),u=Array.from(new Set(t.map(p=>p.areaCode))).sort(),a=c.length,i=c.filter(p=>p.priorityScore>=50).length,r=c.filter(p=>p.reasons.includes("離反リスク")).length,d=n.reduce((p,m)=>p+m.visits.length,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業支援</p>
        <h1>訪問計画 / ルート最適化</h1>
      </div>
    </section>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-value">${a}</div>
        <div>訪問候補</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${i}</div>
        <div>高優先度 (50+)</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${r}</div>
        <div>離反リスク</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${d}</div>
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
            ${u.map(p=>`<option value="${p}"${o===p?" selected":""}>${p}</option>`).join("")}
          </select>
        </label>
        <label>
          最低スコア:
          <input type="number" min="0" max="100" step="10" value="${l}" data-action="visit-filter-score" style="width:5rem;" />
        </label>
        <button class="button" data-action="visit-apply-filter">絞り込み</button>
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">週間訪問プラン</h2>
      ${n.length===0?"<p>訪問候補がありません。</p>":Hc(n)}
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
            ${c.map(p=>Gc(p)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Hc(e){return`
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
  `}function Gc(e){return`
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
      <td class="numeric">${Vc.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function Xc(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},o=e.map(r=>{const d=r.capacity>0?Math.round(r.currentVolume/r.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${r.tankNo}</strong></td>
          <td class="numeric">${r.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${r.currentVolume>0?r.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${d}%"></div>
            </div>
            <span class="progress-label">${d}%</span>
          </td>
          <td>${r.productName||"―"}</td>
          <td class="mono">${r.jikomiNo||"―"}</td>
          <td>
            <span class="status-pill ${n[r.status]}">${t[r.status]}</span>
          </td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${r.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),l=e.filter(r=>r.status==="in_use").length,c=e.filter(r=>r.status==="aging").length,u=e.filter(r=>r.status==="empty").length,a=e.reduce((r,d)=>r+d.capacity,0),i=e.reduce((r,d)=>r+d.currentVolume,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>タンク管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${a.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">使用率 ${a>0?Math.round(i/a*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${l} 基</p>
        <p class="kpi-sub">熟成中 ${c} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${u} 基</p>
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
  `}function Ht(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Kc(e,t,n){const o=e.rows.map((r,d)=>`
      <tr>
        <td class="mono">${r.taxCategory}</td>
        <td>${r.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${d}" data-tax-field="alcoholDegree" value="${r.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${d}" data-tax-field="productionVolume" value="${r.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${d}" data-tax-field="previousBalance" value="${r.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${d}" data-tax-field="exportDeduction" value="${r.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${d}" data-tax-field="sampleDeduction" value="${r.sampleDeduction}" />
        </td>
        <td class="numeric">${r.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${r.taxRate}</td>
        <td class="numeric"><strong>${Ht(r.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${d}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),l=e.deductions.map((r,d)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${d}" data-ded-field="type">
            ${Object.keys(Wt).map(p=>`<option value="${p}" ${p===r.type?"selected":""}>${Wt[p]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${d}" data-ded-field="categoryCode">
            ${Hs.map(p=>`<option value="${p.code}" ${p.code===r.categoryCode?"selected":""}>${p.code}:${p.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${d}" data-ded-field="volume" value="${r.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${d}" data-ded-field="reason" value="${r.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${d}" data-ded-field="documentNo" value="${r.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${d}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),c=Array.from({length:12},(r,d)=>d+1),u=e.rows.reduce((r,d)=>r+d.exportDeduction+d.sampleDeduction,0),a=e.rows.reduce((r,d)=>r+d.productionVolume,0),i=a>0?u/a*100:0;return`
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
            ${[2025,2026,2027].map(r=>`<option value="${r}" ${t===r?"selected":""}>${r}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${c.map(r=>`<option value="${r}" ${n===r?"selected":""}>${r}月</option>`).join("")}
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
        <p class="kpi-value">${Ht(e.totalTax)}</p>
        <p class="kpi-sub">${e.targetYear}年${e.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${e.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.rows.length} 区分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">控除数量</p>
        <p class="kpi-value">${u.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.deductions.length} 件</p>
      </article>
      <article class="panel kpi-card ${i>3?"kpi-alert":""}">
        <p class="panel-title">控除率</p>
        <p class="kpi-value">${i.toFixed(1)}%</p>
        <p class="kpi-sub">${i>3?"⚠ 見本/試験3%上限注意":"上限内"}</p>
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
          <tbody>${o||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${e.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${Ht(e.totalTax)}</th>
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
  `}const Wc={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let Pe=null,Zc=0;const ra=[];function ed(){return Pe&&document.body.contains(Pe)||(Pe=document.createElement("div"),Pe.className="toast-container",document.body.appendChild(Pe)),Pe}function S(e,t="success",n){const o=ed(),l=++Zc,c=t==="error"?5e3:t==="warning"?4e3:3e3,u=document.createElement("div");u.className=`toast toast-${t}`,u.setAttribute("role","status"),u.setAttribute("aria-live","polite"),u.innerHTML=`
    <span class="toast-icon">${Wc[t]}</span>
    <span class="toast-msg">${ad(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const a={id:l,message:e,type:t,el:u};ra.push(a),o.appendChild(u),requestAnimationFrame(()=>{u.classList.add("toast-enter")});const i=()=>td(a);u.querySelector(".toast-dismiss").addEventListener("click",i),setTimeout(()=>{u.classList.add("toast-exit"),u.addEventListener("animationend",i,{once:!0})},c)}function td(e){const t=ra.indexOf(e);t!==-1&&(ra.splice(t,1),e.el.remove())}function ad(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ue(e,t={}){const{title:n="確認",confirmLabel:o="OK",cancelLabel:l="キャンセル",variant:c="primary"}=t;return new Promise(u=>{const a=document.createElement("div");a.className="modal-backdrop confirm-backdrop",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${c}">
            ${c==="danger"?sd:nd}
          </div>
          <h3 class="confirm-title">${gt(n)}</h3>
          <p class="confirm-message">${gt(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${gt(l)}</button>
          <button class="button ${c} confirm-ok">${gt(o)}</button>
        </div>
      </div>
    `;const i=d=>{a.classList.add("confirm-exit"),a.addEventListener("animationend",()=>{a.remove()},{once:!0}),u(d)};a.querySelector(".confirm-cancel").addEventListener("click",()=>i(!1)),a.querySelector(".confirm-ok").addEventListener("click",()=>i(!0)),a.addEventListener("click",d=>{d.target===a&&i(!1)});const r=d=>{d.key==="Escape"&&(document.removeEventListener("keydown",r),i(!1))};document.addEventListener("keydown",r),document.body.appendChild(a),requestAnimationFrame(()=>{a.querySelector(".confirm-ok")?.focus()})})}const sd=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,nd=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function gt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ps(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function ca(e,t,n){if(t.length===0&&(!n||n.length===0))return;const o=n&&n.length>0?n:Object.keys(t[0]??{}).map(r=>({key:r,label:r})),c=`\uFEFF${[o.map(r=>ps(r.label)).join(","),...t.map(r=>o.map(d=>ps(r[d.key])).join(","))].join(`\r
`)}`,u=new Blob([c],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(u),i=document.createElement("a");i.href=a,i.download=e,document.body.append(i),i.click(),i.remove(),window.setTimeout(()=>URL.revokeObjectURL(a),0)}const od=Object.fromEntries(Lt.map(e=>[e.value,e.label])),id=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan"];let ze=[];async function ld(){const{supabaseQueryAll:e}=await x(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>F);return{supabaseQueryAll:n}},void 0);ze=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const ms=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"}];function En(e){const t=ya[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function La(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function rd(){const e=En("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const qt=new Date,cd=qt.toISOString().slice(0,7),dd=qt.getFullYear(),ud=qt.getMonth()+1,pd=qt.toISOString().slice(0,10),md="C0011",Ae=rd();function Ln(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return id.includes(n)?n:"/"}function Da(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const ys=Ln(location.pathname),s={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:La(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:cd,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:dd,taxMonth:ud,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...Gr,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...Xr},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:pd,route:ys,currentCategory:Da(ys),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:md,salesPeriod:"month",customRange:{start:"",end:""},quoteState:Pa(Va()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCompanySettings:Va(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],masterTab:"customers",masterFilter:{...Aa},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:Ae.mode,emailRegion:Ae.region,emailHistorySegment:Ae.historySegment,emailTemplateId:Ae.templateId,emailSubject:Ae.subject,emailBody:Ae.body,emailSaveMessage:Ae.saveMessage,emailSending:!1,demandForecast:{...Ui},shipmentCalendarData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:_t(new Date().toISOString().slice(0,7),1,1),calendarDefaultPart:1,calendarDefaultEmp:1,calendarSelectedDate:null,brewingSchedule:[],globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function hs(e){return e.slice(0,10)}function yd(e){return{...e}}function kt(){s.pickerMode=null,s.pickerQuery="",s.pickerTargetLine=null}function Dn(){s.invoiceForm=La(),s.invoiceSavedDocNo=null,s.invoicePriceGroup="",s.invoiceErrors={},kt()}function In(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,o)=>{n.productCode.trim()||(t[`lines.${o}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${o}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${o}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${o}.unitPrice`]="単価は0円以上で入力してください。")}),t}function hd(e){const t=s.invoiceForm.lines[e];t&&s.invoiceForm.lines.splice(e+1,0,yd(t))}function vd(){const e=s.invoiceRecords[0],t=s.masterStats?.customers[0],n=s.masterStats?.products.slice(0,2)??[];s.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:s.invoiceForm.staffCode||"S001",lines:n.map((o,l)=>{const c=l===0?1:2,u=1200*(l+1);return{productCode:o.code,productName:o.name,quantity:c,unitPrice:u,unit:"本",amount:c*u}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},s.invoiceSavedDocNo=null,s.invoiceErrors={}}function fd(e){const t=s.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,s.invoicePriceGroup=t.priceGroup||"",!0):!1}function gd(e){const t=s.masterStats?.customers.find(n=>n.name===e.trim());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,s.invoicePriceGroup=t.priceGroup||"",!0):!1}function qn(e){if(fe(e),s.invoiceErrors=In(s.invoiceForm),Object.keys(s.invoiceErrors).length>0){v();return}s.invoiceSaving=!0,v(),Ls(s.invoiceForm).then(t=>{s.invoiceSavedDocNo=t.documentNo,s.invoiceSaving=!1,s.invoiceErrors={},s.invoiceForm=La(),v()}).catch(()=>{s.invoiceSaving=!1,v()})}function Tn(e){const t=s.salesFilter.startDate?new Date(s.salesFilter.startDate):null,n=s.salesFilter.endDate?new Date(`${s.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((o,l)=>new Date(l.date).getTime()-new Date(o.date).getTime()).filter(o=>{const l=new Date(o.date);return!(t&&l<t||n&&l>n)})}function Nn(){switch(s.emailAudienceMode){case"area":return s.emailRegion==="all"?ze:ze.filter(e=>e.area===s.emailRegion);case"history":return ze.filter(e=>e.historySegment===s.emailHistorySegment);default:return ze}}function bd(){const e=Nn();return{audienceMode:s.emailAudienceMode,region:s.emailRegion,historySegment:s.emailHistorySegment,selectedTemplateId:s.emailTemplateId,subject:s.emailSubject,body:s.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:s.emailSaveMessage,sending:s.emailSending,senderId:s.emailSenderId,senders:s.mailSenders}}function Gt(e){const t=Nn(),n=s.emailAudienceMode==="area"?s.emailRegion:s.emailAudienceMode==="history"?s.emailHistorySegment:"all";return{subject:s.emailSubject.trim(),body:s.emailBody.trim(),templateId:s.emailTemplateId,audienceMode:s.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(o=>o.email),status:e}}function Ia(){return s.user,!1}function ot(){s.globalSearchOpen=!1,s.globalQuery=""}function $d(){const e=s.globalQuery.trim().toLowerCase();return e?{customers:s.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:s.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:s.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:ms.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:ms}}function _d(){let e=[],t,n="export.csv";switch(s.route){case"/sales":e=(s.salesSummary?Tn(s.salesSummary):[]).map(o=>({documentNo:o.documentNo,date:o.date,customerCode:o.customerCode,customerName:o.customerName,amount:o.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...s.paymentStatus?.records??[]].sort((o,l)=>l.balanceAmount-o.balanceAmount).map(o=>({...o})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=s.invoiceRecords.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=s.purchaseList.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=s.jikomiList.map(o=>({...o})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=s.tankList.map(o=>({...o})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=s.kenteiList.map(o=>({...o})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=s.materialList.map(o=>({...o})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":s.masterTab==="customers"?(e=s.masterStats?.customers.map(o=>({...o}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=s.masterStats?.products.map(o=>({...o}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}ca(n,e,t)}function vs(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),s.route=e,s.currentCategory=Da(e),s.sidebarOpen=!1,ot(),qa(e)}async function qa(e){s.actionLoading=!0,v();try{switch(e){case"/quote":s.quoteEditId===null&&s.quoteList.length===0&&(s.quoteListLoading=!0,v(),s.quoteList=await ka(),s.quoteListLoading=!1);break;case"/invoice":s.invoiceRecords.length===0&&(s.invoiceRecords=await st(s.invoiceFilter));break;case"/analytics":(!s.salesAnalytics||s.salesAnalytics.monthlySales.length===0)&&(s.salesAnalytics=await fa());break;case"/delivery":s.deliveryNote||(s.deliveryNote=await ga(s.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await x(async()=>{const{fetchShipmentCalendar:n}=await Promise.resolve().then(()=>P);return{fetchShipmentCalendar:n}},void 0);s.shipmentCalendarData=await t(s.shipmentCalendarYearMonth);break}case"/billing":s.billingSummary||(s.billingSummary=await ba(s.billingYearMonth));break;case"/report":s.salesReport||(s.salesReport=await Ct());break;case"/product-power":s.productPower.length===0&&(s.productPower=await Rs());break;case"/customer-efficiency":s.customerEfficiency.length===0&&(s.customerEfficiency=await Os());break;case"/customer-analysis":s.customerAnalysis||(s.customerAnalysis=await js());break;case"/demand-forecast":if(s.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await x(async()=>{const{fetchDemandForecasts:c,fetchDeliverySchedule:u}=await Promise.resolve().then(()=>P);return{fetchDemandForecasts:c,fetchDeliverySchedule:u}},void 0),[o,l]=await Promise.all([t(),n()]);s.demandForecast.forecasts=o.map(c=>({code:c.productCode,name:c.productName,segment:c.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(c.avgMonthly),adjustedAvg:Math.round(c.avgMonthly),nextMonthForecast:Math.round(c.forecastQuantity),annualForecast:Math.round(c.avgMonthly*12),safetyStock:Math.round(c.safetyStock)})),s.demandForecast.deliveries=Qi(l)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:n}=await x(async()=>{const{fetchChurnAlerts:o,fetchChurnNotes:l}=await Promise.resolve().then(()=>P);return{fetchChurnAlerts:o,fetchChurnNotes:l}},void 0);if(!s.churnAlert){const o=await t();s.churnAlert=Ac(o)}s.churnNotes=await n();break}case"/seasonal-calendar":if(!s.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await x(async()=>{const{fetchProductShipmentsFromTable:o}=await Promise.resolve().then(()=>P);return{fetchProductShipmentsFromTable:o}},void 0),n=await t();if(n.length>0)s.seasonalCalendar=cs(n.map(o=>({code:o.code,name:o.name,category:"",monthlyQuantity:o.monthlyQuantity})));else{const{fetchProductMonthlyShipments:o}=await x(async()=>{const{fetchProductMonthlyShipments:c}=await Promise.resolve().then(()=>P);return{fetchProductMonthlyShipments:c}},void 0),l=await o();s.seasonalCalendar=cs(l.map(c=>({code:c.code,name:c.name,category:"",monthlyQuantity:c.monthlyQuantity})))}}break;case"/visit-planner":if(!s.visitPlanner){const{fetchVisitPriorities:t}=await x(async()=>{const{fetchVisitPriorities:o}=await Promise.resolve().then(()=>P);return{fetchVisitPriorities:o}},void 0),n=await t();if(n.length>0)s.visitPlanner={candidates:n.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address:o.address,areaCode:o.area_code,businessType:o.business_type,priorityScore:o.priority_score,reasons:o.reasons,lastOrderDate:o.last_order_date,daysSinceOrder:o.days_since_order,annualRevenue:o.annual_revenue,recommendedAction:o.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},s.visitPlanner=us(n.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address1:o.address,areaCode:o.area_code,businessType:o.business_type,annualRevenue:o.annual_revenue,lastOrderDate:o.last_order_date,hasSeasonalProposal:o.reasons.some(l=>l.includes("季節"))})));else{const{supabaseQueryAll:o}=await x(async()=>{const{supabaseQueryAll:i}=await Promise.resolve().then(()=>F);return{supabaseQueryAll:i}},void 0),[l,c]=await Promise.all([o("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),s.masterStats?Promise.resolve(s.masterStats.customers):ha().then(i=>i.customers)]),u=s.masterStats?.customers??c,a=new Map;l.forEach(i=>{const r=i.legacy_customer_code||"",d=i.sales_date||"",p=Number(i.total_amount)||0,m=a.get(r);!m||d>m.lastDate?a.set(r,{lastDate:d,total:(m?.total??0)+p}):m.total+=p}),s.visitPlanner=us(u.filter(i=>i.isActive).map(i=>({code:i.code,name:i.name,phone:i.phone,address1:i.address1,areaCode:i.areaCode,businessType:i.businessType,annualRevenue:a.get(i.code)?.total??0,lastOrderDate:a.get(i.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:n,fetchProductionPlan:o}=await x(async()=>{const{fetchDemandAnalysis:l,fetchSafetyStockParams:c,fetchProductionPlan:u}=await Promise.resolve().then(()=>P);return{fetchDemandAnalysis:l,fetchSafetyStockParams:c,fetchProductionPlan:u}},void 0);if(!s.demandAnalysis){const[l,c]=await Promise.all([t(s.demandYearsBack*12),n()]);s.demandAnalysis=l,s.safetyStockParams=c}if(s.productionPlan.length===0){const l=await o(s.demandPlanYearMonth);if(l.length>0)s.productionPlan=l;else if(s.demandAnalysis&&s.safetyStockParams.length>0){const c=s.demandPlanYearMonth,u=s.demandAnalysis.months.filter(a=>a<c).slice(-3);s.productionPlan=s.safetyStockParams.map(a=>{const i=a.productionType==="make_to_order",r=u.map(h=>s.demandAnalysis.matrix[a.productCode]?.[h]??0),d=i?0:r.length>0?Math.ceil(r.reduce((h,f)=>h+f,0)/r.length):Math.ceil(a.avgMonthlyDemand),p=i?0:Math.ceil(a.safetyStockQty),m=Math.max(0,d+p);return{id:"",yearMonth:c,productCode:a.productCode,productName:a.productName,demandForecast:d,safetyStockTarget:p,openingStock:0,requiredProduction:m,plannedQty:i?0:m,actualQty:0,status:"draft",productionType:a.productionType??"monthly",notes:""}})}}break}case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:n,fetchBrewingSchedule:o}=await x(async()=>{const{fetchBrewingPlanSummary:d,fetchBrewingMonthlyTrend:p,fetchBrewingSchedule:m}=await Promise.resolve().then(()=>P);return{fetchBrewingPlanSummary:d,fetchBrewingMonthlyTrend:p,fetchBrewingSchedule:m}},void 0),l=s.brewingPlanFY,c=`${l}-10-01`,u=`${l+1}-09-30`,[a,i,r]=await Promise.all([t(c,u),n(c,u),o(l)]);s.brewingPlanData=a,s.brewingMonthlyTrend=i,s.brewingSchedule=r;break}case"/jikomi":s.jikomiList.length===0&&(s.jikomiList=await zs());break;case"/tanks":s.tankList.length===0&&(s.tankList=await Bs());break;case"/kentei":s.kenteiList.length===0&&(s.kenteiList=await Vs());break;case"/materials":s.materialList.length===0&&(s.materialList=await Kt());break;case"/purchase":(s.purchaseList.length===0||s.payableList.length===0)&&([s.purchaseList,s.payableList]=await Promise.all([Js(),Ys()]));break;case"/raw-material":(s.billList.length===0||s.rawStockList.length===0)&&([s.billList,s.rawStockList]=await Promise.all([Us(),Qs()]));break;case"/tax":s.taxDeclaration||(s.taxDeclaration=await $a(s.taxYear,s.taxMonth));break;case"/store":(s.storeSales.length===0||s.storeOrders.length===0)&&([s.storeSales,s.storeOrders]=await Promise.all([_a(s.storeSalesDate),Xs()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await x(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>P);return{fetchMailSenders:n}},void 0);if(s.mailSenders=await t(),!s.emailSenderId||!s.mailSenders.find(n=>n.id===s.emailSenderId)){const n=s.mailSenders.find(o=>o.isDefault)??s.mailSenders[0];n&&(s.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await x(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>P);return{fetchCalendarEvents:n}},void 0);s.calendarEvents=await t(s.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await x(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>P);return{fetchIntegrationSettings:n}},void 0);s.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await x(async()=>{const{fetchShopifyOrders:o,fetchIntegrationSettings:l}=await Promise.resolve().then(()=>P);return{fetchShopifyOrders:o,fetchIntegrationSettings:l}},void 0);s.shopifyOrders=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await x(async()=>{const{fetchFaxInbox:o,fetchIntegrationSettings:l}=await Promise.resolve().then(()=>P);return{fetchFaxInbox:o,fetchIntegrationSettings:l}},void 0);s.faxRecords=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/users":{const{fetchUserProfiles:t}=await x(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>P);return{fetchUserProfiles:n}},void 0);s.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:o}=await x(async()=>{const{fetchMyProfile:c,fetchAuditLogs:u,fetchMailSenders:a}=await Promise.resolve().then(()=>P);return{fetchMyProfile:c,fetchAuditLogs:u,fetchMailSenders:a}},void 0),l=s.user?.email??s.myProfile?.email??"";l&&(s.myProfile=await t(l)),s.mailSenders.length===0&&(s.mailSenders=await o()),s.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await x(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>P);return{fetchAuditLogs:n}},void 0);s.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await x(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>P);return{fetchProspects:n}},void 0);s.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:n}=await x(async()=>{const{fetchMapCustomers:c,fetchDeliveryLocations:u}=await Promise.resolve().then(()=>P);return{fetchMapCustomers:c,fetchDeliveryLocations:u}},void 0),[o,l]=await Promise.all([t(),n()]);s.mapCustomers=o,s.deliveryLocations=l}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await x(async()=>{const{fetchCallLogs:o,fetchIntegrationSettings:l}=await Promise.resolve().then(()=>P);return{fetchCallLogs:o,fetchIntegrationSettings:l}},void 0);s.callLogs=await t(100),s.integrations.length===0&&(s.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await x(async()=>{const{fetchLeadLists:o,fetchIntegrationSettings:l}=await Promise.resolve().then(()=>P);return{fetchLeadLists:o,fetchIntegrationSettings:l}},void 0);s.leadLists=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await x(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>P);return{fetchWorkflowOrdersFromDb:n}},void 0);s.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await x(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>P);return{fetchTourInquiriesFromDb:n}},void 0);s.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:o}=await x(async()=>{const{fetchSlackRules:l,fetchSlackLogs:c,fetchIntegrationSettings:u}=await Promise.resolve().then(()=>P);return{fetchSlackRules:l,fetchSlackLogs:c,fetchIntegrationSettings:u}},void 0);s.slackRules=await t(),s.slackLogs=await n(50),s.integrations.length===0&&(s.integrations=await o())}break;case"/":{const{fetchProspects:t,fetchCalendarEvents:n,fetchWorkflowOrdersFromDb:o,fetchTourInquiriesFromDb:l,fetchOrderHeaders:c}=await x(async()=>{const{fetchProspects:u,fetchCalendarEvents:a,fetchWorkflowOrdersFromDb:i,fetchTourInquiriesFromDb:r,fetchOrderHeaders:d}=await Promise.resolve().then(()=>P);return{fetchProspects:u,fetchCalendarEvents:a,fetchWorkflowOrdersFromDb:i,fetchTourInquiriesFromDb:r,fetchOrderHeaders:d}},void 0);s.prospects.length===0&&(s.prospects=await t()),s.calendarEvents.length===0&&(s.calendarEvents=await n(s.calendarYearMonth)),s.materialList.length===0&&(s.materialList=await Kt()),s.workflowOrders.length===0&&(s.workflowOrders=await o()),s.tourInquiries.length===0&&(s.tourInquiries=await l()),s.orderHeaders.length===0&&(s.orderHeaders=await c())}break;default:break}}catch(t){console.error("Route data load error:",e,t),S(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{s.actionLoading=!1,v()}}function fs(){if(Ia())return Ml(s.authError,s.authSubmitting);if(s.loading)return`
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
    `;switch(s.route){case"/cat/sales":return rt("sales");case"/cat/brewery":return rt("brewery");case"/cat/purchase":return rt("purchase");case"/cat/more":return rt("more");case"/invoice-entry":return dl(s.invoiceForm,s.invoiceSavedDocNo,s.invoiceSaving,s.invoiceErrors);case"/quote":return s.quoteEditId===null?vl(s.quoteList,s.quoteListLoading):fn(s.quoteState,s.masterStats?.customers??[],s.masterStats?.products??[],s.quoteCustomerQuery,s.quoteProductQuery,s.quotePricing,s.quoteCompanySettings);case"/quote-settings":return fl(s.quoteCompanySettings);case"/email":return il(bd());case"/delivery":return s.deliveryNote?nl(s.deliveryNote,s.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return zc(s.shipmentCalendarData,s.shipmentCalendarYearMonth,s.shipmentCalendarSelectedDate);case"/billing":return s.billingSummary?ji(s.billingSummary,s.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return s.salesReport?yr(s.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Sl(s.productPower,s.productFilter,s.productDaily,s.productPeriod,s.productCustomStart,s.productCustomEnd,s.productSortState);case"/customer-efficiency":return kl(s.customerEfficiency,s.customerSortState);case"/customer-analysis":return s.customerAnalysis?or(s.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return Ki(s.demandForecast);case"/demand":return bc(s.demandAnalysis,s.safetyStockParams,s.productionPlan,s.demandTab,s.demandPlanYearMonth,s.demandYearsBack,s.demandPlanTypeFilter,s.demandSort,s.calendarShifts,s.calendarSelectedDate);case"/brewing-plan":return kc(s.brewingPlanData,s.brewingMonthlyTrend,s.brewingPlanFY);case"/churn-alert":return s.churnAlert?Lc(s.churnAlert,s.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return s.seasonalCalendar?Nc(s.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return s.visitPlanner?Qc(s.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/jikomi":return s.jikomiView==="calendar"?`${Qa(s.jikomiList,s.jikomiView)}${ql(s.jikomiList)}`:Qa(s.jikomiList,s.jikomiView);case"/tanks":return Xc(s.tankList);case"/kentei":return Tl(s.kenteiList);case"/materials":return Ul(s.materialList)+Yl(s.materialEditing,s.materialEditingIsNew);case"/purchase":return Kl(s.purchaseList,s.payableList);case"/raw-material":return Wl(s.billList,s.rawStockList);case"/tax":return s.taxDeclaration?Kc(s.taxDeclaration,s.taxYear,s.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return gr(s.storeSales,s.storeOrders,s.storeTab,s.storeSalesDate);case"/setup":return s.pipelineMeta?tr(s.pipelineMeta,se,G,s.syncDashboard):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return rc(s.rawSelectedTable,s.rawRecords,s.rawTableList,s.rawPage,s.rawTotalCount);case"/import":return $r(s.importEntity,s.importPreview,s.importing,s.importResult);case"/print":return ec(s.printTemplate,s.printOptions,s.printCompany,s.printData);case"/form-designer":return wr(s.printData,s.printCompany,s.printOptions,s.fdSavedPositions,s.fdDesignMode);case"/map":return s.mapCustomers.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>':xr(s.mapCustomers,s.deliveryLocations,s.mapFilters);case"/workflow":return Pr(s.workflowOrders);case"/mobile-order":return Ar(s.mobileOrder,s.masterStats?.customers??[],s.masterStats?.products??[]);case"/tour":return Er(s.tourInquiries,s.tourActiveId);case"/mail-senders":return Ir(s.mailSenders,s.mailSenderEditingId);case"/calendar":return qr(s.calendarEvents,s.calendarYearMonth,s.calendarFilterCategory,s.calendarEdit);case"/integrations":return Nr(s.integrations,s.integrationEditingId);case"/shopify":{const e=s.integrations.find(t=>t.id==="shopify");return Mr(s.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Rr(s.faxRecords,s.faxProcessing,s.faxOcrText);case"/users":return Or(s.userProfiles,s.userEditingId,s.myProfile);case"/profile":return jr(s.myProfile,s.auditLogs.filter(e=>e.userEmail===s.myProfile?.email),s.mailSenders);case"/audit":return Fr(s.auditLogs);case"/prospects":{const e={prospects:s.prospects,activities:s.prospectActivities,editingId:s.prospectEditingId,viewMode:s.prospectViewMode};return zr(e)}case"/slack":{const e=s.integrations.find(t=>t.provider==="slack")??null;return Yr(e,s.slackRules,s.slackLogs)}case"/calls":{const e=s.integrations.find(t=>t.provider==="ivry");return Ur(s.callLogs,s.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:s.leadLists,activeListId:s.leadActiveListId,items:s.leadItems,searchQuery:s.leadSearchQuery,searchArea:s.leadSearchArea,searchBusinessType:s.leadSearchType,searching:s.leadSearching,searchResults:s.leadSearchResults};return Hr(e)}}if(!s.salesSummary||!s.paymentStatus||!s.masterStats||!s.pipelineMeta||!s.customerLedger||!s.salesAnalytics)return"";switch(s.route){case"/sales":return fr(Tn(s.salesSummary),s.salesFilter.startDate,s.salesFilter.endDate);case"/payment":return Gl([...s.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return Jl(s.masterStats,s.masterTab,s.masterFilter,s.masterSortState);case"/invoice":return Cl(s.invoiceRecords,s.invoiceFilter);case"/ledger":return Ji(s.customerLedger,s.ledgerCustomerCode);case"/analytics":return xn(s.salesAnalytics,s.analyticsTab,s.analyticsPeriod,s.analyticsPeriodFilter,s.analyticsPeriodRows,s.analyticsPeriodOptions,s.analyticsStaffFilter,s.analyticsTagFilter,s.analyticsStaffDrilldown,s.analyticsStaffPeriod,s.analyticsStaffPeriodFilter,s.analyticsStaffPeriodOptions,s.analyticsStaffTotals,s.analyticsSortState,s.analyticsDrilldown,s.analyticsPeriodChartData,s.analyticsPrevYearChartData,s.analyticsChartMetric,s.analyticsFiscalMode);default:return el(s.salesSummary,s.pipelineMeta,s.salesAnalytics,{upcomingEvents:s.calendarEvents,tourInquiries:s.tourInquiries,workflowOrdersCount:{new:s.workflowOrders.filter(e=>e.stage==="new").length,picking:s.workflowOrders.filter(e=>e.stage==="picking").length,packed:s.workflowOrders.filter(e=>e.stage==="packed").length,shipped:s.workflowOrders.filter(e=>e.stage==="shipped").length,total:s.workflowOrders.length},lowStockCount:s.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:s.masterStats?{customers:s.masterStats.summary.customerCount,products:s.masterStats.summary.productCount,suppliers:s.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:s.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:s.churnAlert?{atRiskCount:s.churnAlert.atRiskCustomers.length,dormantCount:s.churnAlert.dormantCustomers.length,decliningCount:s.churnAlert.decliningCustomers.length,totalImpact:[...s.churnAlert.atRiskCustomers,...s.churnAlert.dormantCustomers,...s.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:s.orderHeaders},s.salesPeriod,s.customRange,s.dashboardSortState)}}function wd(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=s.announcements.filter(l=>!s.dismissedAnnouncements.has(l.id)).map(l=>{const c=e[l.level]??e.info;return`
      <div class="announcement-bar" style="background:${c.bg};border-bottom:2px solid ${c.border};">
        <span class="announcement-text">${c.icon} ${l.message}</span>
        ${l.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${l.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),o=s.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+o}function xd(){if(Ia())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${fs()}</div>
        </main>
      </div>
    `;const e={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売業務",items:[{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/quote",label:"見積作成",kicker:"Quote"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/shipment-calendar",label:"出荷カレンダー",kicker:"ShipCal"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],analytics:[{label:"分析",items:[{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/customer-analysis",label:"得意先分析",kicker:"CustABC"},{path:"/product-power",label:"商品力分析",kicker:"Power"},{path:"/customer-efficiency",label:"営業効率",kicker:"Efficiency"},{path:"/report",label:"集計帳票",kicker:"Report"}]}],crm:[{label:"既存顧客ケア",items:[{path:"/churn-alert",label:"営業アクション",kicker:"Action"},{path:"/visit-planner",label:"訪問計画",kicker:"Visit"},{path:"/seasonal-calendar",label:"季節提案",kicker:"Season"},{path:"/map",label:"取引先マップ",kicker:"Map"}]},{label:"新規開拓",items:[{path:"/prospects",label:"新規営業",kicker:"Prospects"},{path:"/list-builder",label:"リスト取得",kicker:"ListBuild"},{path:"/calls",label:"通話履歴",kicker:"Calls"},{path:"/email",label:"メール配信",kicker:"Mail"}]},{label:"受注・出荷",items:[{path:"/workflow",label:"受注ワークフロー",kicker:"Workflow"},{path:"/mobile-order",label:"モバイル受注",kicker:"Mobile"},{path:"/shopify",label:"Shopify注文",kicker:"Shopify"},{path:"/fax",label:"FAX OCR",kicker:"FAX"}]}],orders:[{label:"仕入・調達",items:[{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],brewery:[{label:"製造管理",items:[{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"},{path:"/tax",label:"酒税申告",kicker:"Tax"},{path:"/demand",label:"需要・生産計画",kicker:"Demand"},{path:"/brewing-plan",label:"醸造計画",kicker:"Brew"}]}],master:[{label:"マスタ・ツール",items:[{path:"/master",label:"マスタ管理",kicker:"Master"},{path:"/calendar",label:"カレンダー",kicker:"Calendar"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/tour",label:"酒蔵見学",kicker:"Tour"},{path:"/print",label:"印刷",kicker:"Print"}]}],settings:[{label:"システム設定",items:[{path:"/setup",label:"連動設定",kicker:"Setup"},{path:"/integrations",label:"外部連携",kicker:"API"},{path:"/slack",label:"Slack通知",kicker:"Slack"},{path:"/import",label:"データ取込",kicker:"Import"},{path:"/raw-browser",label:"データブラウザ",kicker:"RawData"},{path:"/users",label:"ユーザー管理",kicker:"Users"},{path:"/profile",label:"プロフィール",kicker:"Profile"},{path:"/audit",label:"操作ログ",kicker:"Audit"}]}]},t=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/invoice-entry",label:"販売"},{category:"analytics",path:"/analytics",label:"分析"},{category:"crm",path:"/churn-alert",label:"営業"},{category:"orders",path:"/purchase",label:"仕入"},{category:"brewery",path:"/jikomi",label:"製造"},{category:"master",path:"/master",label:"マスタ"},{category:"settings",path:"/setup",label:"設定"}],n=e[s.currentCategory].map(a=>`
        <div class="nav-group">
          <p class="nav-group-label">${a.label}</p>
          ${a.items.map(i=>`
                <a
                  href="${"/".replace(/\/$/,"")}${i.path==="/"?"/":i.path}"
                  class="nav-link ${s.route===i.path?"active":""}"
                  data-link="${i.path}"
                >
                  <div>
                    <div class="nav-kicker">${i.kicker}</div>
                    <div class="nav-label">${i.label}</div>
                  </div>
                </a>
              `).join("")}
        </div>
      `).join(""),o=t.map(a=>`
        <a
          href="${"/".replace(/\/$/,"")}${a.path==="/"?"/":a.path}"
          class="category-link ${s.currentCategory===a.category?"active":""}"
          data-link="${a.path}"
        >
          ${a.label}
        </a>
      `).join(""),l=s.pickerMode&&s.masterStats?s.pickerMode==="customer"?rl(s.masterStats.customers,s.pickerQuery):Xl(s.masterStats.products,s.pickerQuery):"",c=s.globalSearchOpen?ll(s.globalQuery,$d()):"",u=s.user?`
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
          <div class="category-nav">${o}</div>
          <div class="subnav">${n}</div>
        </nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <button class="button secondary" type="button" data-action="global-search-open">検索 (Ctrl+K)</button>
          ${u}
        </header>
        ${wd()}
        <div class="view ${s.actionLoading?"is-busy":""}">${fs()}</div>
        <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
      </main>
      ${l}
      ${c}
    </div>
  `}async function Sd(){s.actionLoading=!0,v();try{const{fetchSalesSummary:e}=await x(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>P);return{fetchSalesSummary:t}},void 0);s.salesSummary=await e()}finally{s.actionLoading=!1,v()}}async function kd(e){s.actionLoading=!0,v();try{s.invoiceRecords=await st(e)}finally{s.actionLoading=!1,v()}}async function Pd(e){s.actionLoading=!0,v();try{s.customerLedger=await va(e)}finally{s.actionLoading=!1,v()}}function fe(e){s.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??s.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??s.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??s.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??s.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??s.invoiceForm.staffCode,lines:s.invoiceForm.lines.map((t,n)=>{const o=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,l=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:o,unitPrice:l,amount:o*l}}),note:e.querySelector("#inv-note")?.value??s.invoiceForm.note},s.invoiceForm.customerCode=s.invoiceForm.customerCode.trim().toUpperCase(),s.invoiceForm.customerName=s.invoiceForm.customerName.trim()}function Ce(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??s.emailAudienceMode;s.emailAudienceMode=t,s.emailRegion=e.querySelector("#email-region")?.value??s.emailRegion,s.emailHistorySegment=e.querySelector("#email-history-segment")?.value??s.emailHistorySegment,s.emailSubject=e.querySelector("#email-subject")?.value??s.emailSubject,s.emailBody=e.querySelector("#email-body")?.value??s.emailBody}function Ad(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{s.globalSearchOpen=!0,v()}),e.querySelectorAll("[data-action='global-search-close']").forEach(a=>{a.addEventListener("click",i=>{a.classList.contains("global-search")&&i.target instanceof HTMLElement&&!i.target.classList.contains("global-search")||(ot(),v())})}),e.querySelector("#global-search-input")?.addEventListener("input",a=>{s.globalQuery=a.target.value,v()}),e.querySelectorAll("[data-action='global-nav']").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.path;i&&(ot(),vs(i))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{_d()}),e.querySelectorAll("[data-jikomi-tab]").forEach(a=>{a.addEventListener("click",()=>{s.jikomiView=a.dataset.jikomiTab,v()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const a=e.querySelector("#auth-email")?.value.trim()??"",i=e.querySelector("#auth-password")?.value??"";s.authSubmitting=!0,s.authError=null,v(),Bn(a,i).then(async r=>{s.user=r,s.authSkipped=!1,s.authSubmitting=!1,s.authError=null;const{fetchMyProfile:d,recordAudit:p}=await x(async()=>{const{fetchMyProfile:m,recordAudit:h}=await Promise.resolve().then(()=>P);return{fetchMyProfile:m,recordAudit:h}},void 0);s.myProfile=await d(r.email),await p({action:"sign_in",userEmail:r.email}),v()}).catch(async r=>{try{const d=await Na(a,i);s.user=d,s.authSkipped=!1,s.authError=null;const{fetchMyProfile:p}=await x(async()=>{const{fetchMyProfile:m}=await Promise.resolve().then(()=>P);return{fetchMyProfile:m}},void 0);s.myProfile=await p(d.email)}catch{s.authError=r instanceof Error?r.message:"ログインに失敗しました。"}finally{s.authSubmitting=!1,v()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{s.authSkipped=!0,s.authError=null,v()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{Vn().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{s.sidebarOpen=!0,v()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(a=>{a.addEventListener("click",()=>{s.sidebarOpen=!1,v()})});const t=e.querySelector(".sidebar");if(t&&s.sidebarOpen){let a=0;t.addEventListener("touchstart",i=>{a=i.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",i=>{i.changedTouches[0].clientX-a<-60&&(s.sidebarOpen=!1,v())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.id??"";s.dismissedAnnouncements.add(i),v()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelectorAll("[data-link]").forEach(a=>{a.addEventListener("click",i=>{i.preventDefault(),vs(a.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async a=>{a.preventDefault();const i=e.querySelector("#fr-title")?.value??"",r=e.querySelector("#fr-category")?.value??"feature",d=e.querySelector("#fr-description")?.value??"",p=e.querySelector("#fr-result");if(!i.trim())return;const m=await Is(i,r,d);if(p&&(p.textContent=m?"送信しました":"送信に失敗しました",p.className=`fr-result ${m?"success":"error"}`),m){const h=e.querySelector("#feature-request-form");h&&h.reset()}}),e.querySelectorAll("[data-period]").forEach(a=>{a.addEventListener("click",()=>{s.salesPeriod=a.dataset.period,v()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const a=e.querySelector("#range-start")?.value??"",i=e.querySelector("#range-end")?.value??"";a&&i&&(s.customRange={start:a,end:i},s.salesPeriod="custom",v())}),e.querySelectorAll("[data-edit-customer]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.editCustomer??"",r=s.masterStats?.customers.find(p=>p.id===i);if(!r)return;const d=document.createElement("div");d.innerHTML=Rl(r),document.body.appendChild(d.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async p=>{p.preventDefault();const m=document.getElementById("edit-result"),h=await qs(i,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,manual_override:!0});m&&(m.textContent=h?"保存しました":"保存に失敗",m.className=`fr-result ${h?"success":"error"}`),h&&(document.getElementById("edit-modal")?.remove(),Be())})})}),e.querySelectorAll("[data-edit-product]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.editProduct??"",r=s.masterStats?.products.find(p=>p.id===i);if(!r)return;const d=document.createElement("div");d.innerHTML=Ol(r),document.body.appendChild(d.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async p=>{p.preventDefault();const m=document.getElementById("edit-result"),h=await Ts(i,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});m&&(m.textContent=h?"保存しました":"保存に失敗",m.className=`fr-result ${h?"success":"error"}`),h&&(document.getElementById("edit-modal")?.remove(),Be())})})}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{s.quoteState=Pa(s.quoteCompanySettings),s.quoteEditId="new",s.quoteCustomerQuery="",s.quoteProductQuery="",s.quotePricing=null,v()}),e.querySelectorAll("[data-open-quote]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.openQuote,r=await ln(i);if(!r){S("見積の読み込みに失敗しました","error");return}s.quoteState={id:r.id,quoteNo:r.quote_no,quoteDate:r.quote_date,validUntil:r.valid_until??"",customerCode:r.legacy_customer_code??"",customerName:r.customer_name,customerAddress:r.customer_address,subject:r.subject,lines:r.lines.map(d=>({productCode:d.legacy_product_code??"",productName:d.product_name,janCode:d.jan_code??"",caseQty:d.case_qty,quantity:d.quantity,unit:d.unit,unitPrice:d.unit_price,retailPrice:d.retail_price,amount:d.amount})),remarks:r.remarks,taxRate:r.tax_rate,deliveryDate:r.delivery_date,paymentTerms:r.payment_terms,deliveryPlace:r.delivery_place,templateType:r.template_type??"sake",previewMode:!1},s.quoteEditId=i,s.quoteCustomerQuery="",s.quoteProductQuery="",s.quotePricing=null,v()})}),e.querySelectorAll("[data-delete-quote]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.deleteQuote,r=a.dataset.quoteNo??i;if(!await ue(`見積 ${r} を削除しますか？`))return;await bs("quotes",i)?(s.quoteList=s.quoteList.filter(m=>m.id!==i),S("削除しました","success"),v()):S("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{s.quoteEditId=null,s.quoteListLoading=!0,v(),ka().then(a=>{s.quoteList=a,s.quoteListLoading=!1,v()})}),e.querySelectorAll("[name='q-template']").forEach(a=>{a.addEventListener("change",()=>{s.quoteState.templateType=a.value,v()})}),(function(){const a=e.querySelector("#q-cust-search");a&&(a.addEventListener("compositionend",()=>{const i=a.value;s.quoteCustomerQuery=i;const r=a.selectionStart??i.length;v();const d=e.querySelector("#q-cust-search");d&&(d.focus(),d.setSelectionRange(r,r))}),a.addEventListener("input",i=>{if(i.isComposing)return;const r=a.value,d=a.selectionStart??r.length;s.quoteCustomerQuery=r,v();const p=e.querySelector("#q-cust-search");p&&(p.focus(),p.setSelectionRange(d,d))}))})(),(function(){const a=e.querySelector("#q-prod-search");a&&(a.addEventListener("compositionend",()=>{const i=a.value;s.quoteProductQuery=i;const r=a.selectionStart??i.length;v();const d=e.querySelector("#q-prod-search");d&&(d.focus(),d.setSelectionRange(r,r))}),a.addEventListener("input",i=>{if(i.isComposing)return;const r=a.value,d=a.selectionStart??r.length;s.quoteProductQuery=r,v();const p=e.querySelector("#q-prod-search");p&&(p.focus(),p.setSelectionRange(d,d))}))})(),e.querySelectorAll("[data-select-customer]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.selectCustomer??"";s.quoteState.customerCode=i,s.quoteState.customerName=a.dataset.custName??"",s.quoteState.customerAddress=a.dataset.custAddr??"",s.quoteCustomerQuery="",s.quotePricing=await Ns(s.masterStats?.customers??[],i),v()})}),e.querySelectorAll("[data-add-product]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.addProduct??"",r=a.dataset.prodName??"",d=parseInt(a.dataset.prodPrice??"0"),p=a.dataset.prodJan??"",m=a.dataset.prodCase??"",h=m?parseInt(m):null;s.quoteState.lines.push({productCode:i,productName:r,janCode:p,caseQty:h,quantity:1,unit:"本",unitPrice:d,retailPrice:null,amount:d}),s.quoteProductQuery="",v()})});function n(){Ot(s.quoteState);const a=e.querySelector("#q-preview-scaler");if(!a)return;a.innerHTML=fn(s.quoteState,s.masterStats?.customers??[],s.masterStats?.products??[],s.quoteCustomerQuery,s.quoteProductQuery,s.quotePricing,s.quoteCompanySettings);const i=a.querySelector(".q-preview-doc"),r=a.parentElement?.clientWidth??0,d=i?.offsetWidth??0;if(r>0&&d>0&&d>r-24){const p=(r-24)/d;a.style.transform=`scale(${p})`,a.style.transformOrigin="top left",a.style.height=`${((i?.offsetHeight??0)+48)*p}px`}else a.style.transform="",a.style.height=""}for(const a of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${a}`)?.addEventListener("input",n);e.querySelector("#q-remarks")?.addEventListener("input",n),e.querySelectorAll(".qty-input").forEach(a=>{a.addEventListener("change",()=>{const i=parseInt(a.dataset.lineIdx??"0"),r=s.quoteState.lines[i];r&&(r.quantity=parseFloat(a.value)||0,r.amount=r.quantity*r.unitPrice,n())})}),e.querySelectorAll(".price-input").forEach(a=>{a.addEventListener("change",()=>{const i=parseInt(a.dataset.lineIdx??"0"),r=s.quoteState.lines[i];r&&(r.unitPrice=parseInt(a.value)||0,r.amount=r.quantity*r.unitPrice,n())})}),e.querySelectorAll(".jan-input").forEach(a=>{a.addEventListener("change",()=>{const i=parseInt(a.dataset.lineIdx??"0"),r=s.quoteState.lines[i];r&&(r.janCode=a.value,n())})}),e.querySelectorAll(".case-qty-input").forEach(a=>{a.addEventListener("change",()=>{const i=parseInt(a.dataset.lineIdx??"0"),r=s.quoteState.lines[i];r&&(r.caseQty=a.value?parseInt(a.value):null,n())})}),e.querySelectorAll(".retail-price-input").forEach(a=>{a.addEventListener("change",()=>{const i=parseInt(a.dataset.lineIdx??"0"),r=s.quoteState.lines[i];r&&(r.retailPrice=a.value?parseInt(a.value):null,n())})}),e.querySelectorAll("[data-remove-line]").forEach(a=>{a.addEventListener("click",()=>{const i=parseInt(a.dataset.removeLine??"0");s.quoteState.lines.splice(i,1),v()})}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",()=>{Ot(s.quoteState),$l(s.quoteState,s.quoteCompanySettings)}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{Ot(s.quoteState);const a=s.quoteState,{supabaseInsert:i,supabaseUpdate:r}=await x(async()=>{const{supabaseInsert:$,supabaseUpdate:g}=await Promise.resolve().then(()=>F);return{supabaseInsert:$,supabaseUpdate:g}},void 0),d=a.lines.reduce(($,g)=>$+g.amount,0),p=Math.round(d*a.taxRate/100),m=d+p;if(!a.quoteNo){const{supabaseRpc:$}=await x(async()=>{const{supabaseRpc:w}=await Promise.resolve().then(()=>F);return{supabaseRpc:w}},void 0),g=await $("generate_quote_no",{});a.quoteNo=g??`Q${Date.now().toString(36).toUpperCase()}`}const h={quote_no:a.quoteNo,quote_date:a.quoteDate,valid_until:a.validUntil||null,legacy_customer_code:a.customerCode||null,customer_name:a.customerName,customer_address:a.customerAddress,subject:a.subject,template_type:a.templateType,subtotal:d,tax_amount:p,total_amount:m,tax_rate:a.taxRate,remarks:a.remarks,delivery_date:a.deliveryDate,payment_terms:a.paymentTerms,delivery_place:a.deliveryPlace,updated_at:new Date().toISOString()};let f=a.id;if(a.id)await r("quotes",a.id,h),await fetch(`${se}/rest/v1/quote_lines?quote_id=eq.${a.id}`,{method:"DELETE",headers:{apikey:G,Authorization:`Bearer ${G}`}});else{const $=await i("quotes",h);if(!$?.id){S("保存に失敗しました","error");return}f=$.id,a.id=f}for(let $=0;$<a.lines.length;$++){const g=a.lines[$];await i("quote_lines",{quote_id:f,line_no:$+1,legacy_product_code:g.productCode||null,product_name:g.productName,jan_code:g.janCode||null,case_qty:g.caseQty??null,quantity:g.quantity,unit:g.unit,unit_price:g.unitPrice,retail_price:g.retailPrice??null,amount:g.amount})}S(`見積 ${a.quoteNo} を保存しました`,"success"),v()}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const a=r=>document.getElementById(r)?.value??"",i={...s.quoteCompanySettings,companyName:a("qs-company-name"),companyPostal:a("qs-company-postal"),companyAddress1:a("qs-company-addr1"),companyAddress2:a("qs-company-addr2"),companyTel:a("qs-company-tel"),companyFax:a("qs-company-fax"),companyEmail:a("qs-company-email"),companyRegistrationNo:a("qs-company-regno"),billingName:a("qs-billing-name"),billingPostal:a("qs-billing-postal"),billingAddress:a("qs-billing-address"),defaultPaymentTerms:a("qs-payment-terms"),defaultHeaderNote:a("qs-header-note"),defaultFooterNote:a("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||s.quoteCompanySettings.accentColor||"#0968e5"};Me(i),s.quoteCompanySettings=i,S("設定を保存しました","success"),v()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.color??"#0968e5";s.quoteCompanySettings={...s.quoteCompanySettings,accentColor:i},Me(s.quoteCompanySettings),v()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",a=>{const i=a.target.value;s.quoteCompanySettings={...s.quoteCompanySettings,accentColor:i},Me(s.quoteCompanySettings),v()}),e.querySelector("#qs-seal-file")?.addEventListener("change",a=>{const i=a.target.files?.[0];if(!i)return;const r=new FileReader;r.onload=()=>{s.quoteCompanySettings={...s.quoteCompanySettings,sealImageDataUrl:r.result},Me(s.quoteCompanySettings),v()},r.readAsDataURL(i)}),e.querySelector("#qs-seal-size")?.addEventListener("input",a=>{const i=parseInt(a.target.value);s.quoteCompanySettings={...s.quoteCompanySettings,sealSize:i},Me(s.quoteCompanySettings),v()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{s.quoteCompanySettings={...s.quoteCompanySettings,sealImageDataUrl:""},Me(s.quoteCompanySettings),v()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.month;i&&(s.demandForecast.calendarMonth=i,v())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.segment;s.demandForecast.selectedSegment=i,v()})}),e.querySelectorAll("[data-demand-tab]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.demandTab;i&&(s.demandTab=i,v())})});function o(a){const i=s.demandAnalysis,r=s.safetyStockParams;if(!i||r.length===0)return[];const d=i.months.filter(p=>p<a).slice(-3);return r.map(p=>{const m=p.productionType==="make_to_order",h=d.map(w=>i.matrix[p.productCode]?.[w]??0),f=m?0:h.length>0?Math.ceil(h.reduce((w,_)=>w+_,0)/h.length):Math.ceil(p.avgMonthlyDemand),$=m?0:Math.ceil(p.safetyStockQty),g=Math.max(0,f+$);return{id:"",yearMonth:a,productCode:p.productCode,productName:p.productName,demandForecast:f,safetyStockTarget:$,openingStock:0,requiredProduction:g,plannedQty:m?0:g,actualQty:0,status:"draft",productionType:p.productionType??"monthly",notes:""}})}e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async a=>{const i=parseInt(a.target.value)||3;s.demandYearsBack=i,s.demandAnalysis=null;const{fetchDemandAnalysis:r}=await x(async()=>{const{fetchDemandAnalysis:d}=await Promise.resolve().then(()=>P);return{fetchDemandAnalysis:d}},void 0);s.demandAnalysis=await r(i*12),v()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(a=>{a.addEventListener("change",()=>{const i=a.dataset.code??"",r=parseInt(a.value)||30;s.safetyStockParams=s.safetyStockParams.map(d=>{if(d.productCode!==i)return d;const p=d.serviceLevel>=.99?2.33:d.serviceLevel>=.97?1.88:d.serviceLevel>=.95?1.65:d.serviceLevel>=.9?1.28:1.04,m=r/30,h=Math.ceil(p*d.demandStdDev*Math.sqrt(m)),f=Math.ceil(d.avgMonthlyDemand*m+h);return{...d,leadTimeDays:r,safetyStockQty:h,reorderPoint:f}}),v()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(a=>{a.addEventListener("change",()=>{const i=a.dataset.code??"",r=parseFloat(a.value)||.95;s.safetyStockParams=s.safetyStockParams.map(d=>{if(d.productCode!==i)return d;const p=r>=.99?2.33:r>=.97?1.88:r>=.95?1.65:r>=.9?1.28:1.04,m=d.leadTimeDays/30,h=Math.ceil(p*d.demandStdDev*Math.sqrt(m)),f=Math.ceil(d.avgMonthlyDemand*m+h);return{...d,serviceLevel:r,safetyStockQty:h,reorderPoint:f}}),v()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async a=>{if(s.safetyStockParams.length===0)return;const i=a.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveSafetyStockParamsBulk:r}=await x(async()=>{const{saveSafetyStockParamsBulk:p}=await Promise.resolve().then(()=>P);return{saveSafetyStockParamsBulk:p}},void 0),d=await r(s.safetyStockParams);i.disabled=!1,i.textContent=d?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const a=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),i=parseInt(document.getElementById("bulk-lead-time")?.value??"30");s.safetyStockParams=s.safetyStockParams.map(r=>{const d=a>=.99?2.33:a>=.97?1.88:a>=.95?1.65:a>=.9?1.28:1.04,p=i/30,m=Math.ceil(d*r.demandStdDev*Math.sqrt(p)),h=Math.ceil(r.avgMonthlyDemand*p+m);return{...r,serviceLevel:a,leadTimeDays:i,safetyStockQty:m,reorderPoint:h}}),v()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(a=>{a.addEventListener("change",()=>{const i=a.dataset.code??"",r=a.value;s.productionPlan=s.productionPlan.map(d=>d.productCode===i?{...d,productionType:r}:d)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async a=>{const i=a.target.value;if(!i)return;s.demandPlanYearMonth=i,s.calendarShifts=_t(i,s.calendarDefaultPart,s.calendarDefaultEmp);const{fetchProductionPlan:r}=await x(async()=>{const{fetchProductionPlan:p}=await Promise.resolve().then(()=>P);return{fetchProductionPlan:p}},void 0),d=await r(i);s.productionPlan=d.length>0?d:o(i),v()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(a=>{a.addEventListener("click",()=>{s.demandPlanTypeFilter=a.dataset.filter??"all",v()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.sortCol??"";s.demandSort?.column===i?s.demandSort=s.demandSort.dir==="desc"?{column:i,dir:"asc"}:null:s.demandSort={column:i,dir:"desc"},v()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{s.productionPlan=o(s.demandPlanYearMonth),v()}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(s.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(r=>{const d=r.dataset.code??"",p=s.productionPlan.find(m=>m.productCode===d);p&&(p.plannedQty=parseFloat(r.value)||0)});const{saveProductionPlan:a}=await x(async()=>{const{saveProductionPlan:r}=await Promise.resolve().then(()=>P);return{saveProductionPlan:r}},void 0);await Promise.all(s.productionPlan.map(r=>a(r)));const{fetchProductionPlan:i}=await x(async()=>{const{fetchProductionPlan:r}=await Promise.resolve().then(()=>P);return{fetchProductionPlan:r}},void 0);s.productionPlan=await i(s.demandPlanYearMonth),v()}),e.querySelectorAll("[data-action='cal-select-day']").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.date??"";s.calendarSelectedDate=s.calendarSelectedDate===i?null:i,v()})}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(a=>{a.addEventListener("change",()=>{const i=a.dataset.date??"",r=parseInt(a.value)||0,d=s.calendarShifts.find(p=>p.date===i);d&&(d.partTimers=r),v()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(a=>{a.addEventListener("change",()=>{const i=a.dataset.date??"",r=parseInt(a.value)||0,d=s.calendarShifts.find(p=>p.date===i);d&&(d.employees=r),v()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async a=>{const i=a.target.value;if(!i)return;s.demandPlanYearMonth=i,s.calendarSelectedDate=null,s.calendarShifts=_t(i,s.calendarDefaultPart,s.calendarDefaultEmp);const{fetchProductionPlan:r}=await x(async()=>{const{fetchProductionPlan:p}=await Promise.resolve().then(()=>P);return{fetchProductionPlan:p}},void 0),d=await r(i);s.productionPlan=d.length>0?d:o(i),v()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",a=>{const i=parseInt(a.target.value)||0;s.calendarDefaultPart=i;for(const r of s.calendarShifts)if(!r.confirmed){const d=new Date(r.date).getDay()===0||new Date(r.date).getDay()===6;r.partTimers=d?0:i}v()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",a=>{const i=parseInt(a.target.value)||0;s.calendarDefaultEmp=i;for(const r of s.calendarShifts)if(!r.confirmed){const d=new Date(r.date).getDay()===0||new Date(r.date).getDay()===6;r.employees=d?0:i}v()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{s.calendarShifts=_t(s.demandPlanYearMonth,s.calendarDefaultPart,s.calendarDefaultEmp),v()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const a of s.calendarShifts)a.confirmed=!0;v()}),e.querySelectorAll("[data-action='select-month']").forEach(a=>{a.addEventListener("click",()=>{const i=parseInt(a.dataset.month??"0");s.seasonalCalendar&&(s.seasonalCalendar.selectedMonth=i,v())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",a=>{s.visitPlanner&&(s.visitPlanner.filterArea=a.target.value,v())}),e.querySelector("#visit-filter-score")?.addEventListener("change",a=>{s.visitPlanner&&(s.visitPlanner.filterMinScore=parseInt(a.target.value)||0,v())}),e.querySelectorAll("[data-sort-col]").forEach(a=>{a.addEventListener("click",i=>{const r=a.dataset.sortCol??"",d=i.shiftKey;s.route==="/product-power"?s.productSortState=Ue(s.productSortState,r,d):s.route==="/customer-efficiency"?s.customerSortState=Ue(s.customerSortState,r,d):s.route==="/"||s.route==="/sales"?s.dashboardSortState=Ue(s.dashboardSortState,r,d):s.route==="/master"?s.masterSortState=Ue(s.masterSortState,r,d):s.route==="/analytics"&&(s.analyticsSortState=Ue(s.analyticsSortState,r,d)),v()})}),e.querySelectorAll("[data-product-period]").forEach(a=>{a.addEventListener("click",()=>{s.productPeriod=a.dataset.productPeriod??"year",v()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const a=document.getElementById("pp-range-start")?.value??"",i=document.getElementById("pp-range-end")?.value??"";a&&i&&(s.productCustomStart=a,s.productCustomEnd=i,s.productPeriod="custom",v())}),e.querySelectorAll("[data-product-filter]").forEach(a=>{a.addEventListener("click",()=>{s.productFilter=a.dataset.productFilter??"all",v()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async a=>{const i=a.currentTarget;i.disabled=!0,i.textContent="更新中…",await Be(),i.disabled=!1,i.textContent="↻ 更新",S("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const a=e.querySelector("#sales-start")?.value??"",i=e.querySelector("#sales-end")?.value??"";s.salesFilter={startDate:a,endDate:i},Sd()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const a={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};s.invoiceFilter=a,kd(a)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const a=e.querySelector("#ledger-customer-code")?.value??"";s.ledgerCustomerCode=a.trim().toUpperCase(),Pd(s.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{s.masterTab=a.dataset.tab,s.masterFilter={...Aa},v()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{s.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},v()}),e.querySelector("#master-search")?.addEventListener("keydown",a=>{a.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(a=>{a.addEventListener("click",()=>{const i=Number(a.dataset.page);i>=1&&(s.masterFilter={...s.masterFilter,page:i},v())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.table;if(!i)return;s.rawSelectedTable=i,s.rawPage=1;const r=await $t(i,1);s.rawRecords=r.records,s.rawTotalCount=r.total,v()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!s.rawSelectedTable||s.rawPage<=1)return;s.rawPage-=1;const a=await $t(s.rawSelectedTable,s.rawPage);s.rawRecords=a.records,s.rawTotalCount=a.total,v()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!s.rawSelectedTable)return;s.rawPage+=1;const a=await $t(s.rawSelectedTable,s.rawPage);s.rawRecords=a.records,s.rawTotalCount=a.total,v()}),e.querySelectorAll("[data-analytics-tab]").forEach(a=>{a.addEventListener("click",async()=>{if(s.analyticsTab=a.dataset.analyticsTab,s.analyticsStaffDrilldown=null,s.analyticsDrilldown=null,s.analyticsPeriodChartData=[],s.analyticsPrevYearChartData=[],s.analyticsTab!=="staff"){if(s.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:r}=await x(async()=>{const{fetchAnalyticsByPeriod:d,fetchAvailablePeriods:p}=await Promise.resolve().then(()=>P);return{fetchAnalyticsByPeriod:d,fetchAvailablePeriods:p}},void 0);s.analyticsPeriodOptions=await r(s.analyticsTab,s.analyticsPeriod),s.analyticsPeriodFilter=s.analyticsPeriodOptions[0]??"",s.analyticsPeriodRows=await i(s.analyticsTab,s.analyticsPeriod,s.analyticsPeriodFilter)}}v()})}),e.querySelectorAll("[data-analytics-period]").forEach(a=>{a.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:r,fetchPeriodChartData:d,prevYearFilter:p}=await x(async()=>{const{fetchAnalyticsByPeriod:h,fetchAvailablePeriods:f,fetchPeriodChartData:$,prevYearFilter:g}=await Promise.resolve().then(()=>P);return{fetchAnalyticsByPeriod:h,fetchAvailablePeriods:f,fetchPeriodChartData:$,prevYearFilter:g}},void 0),m=a.dataset.analyticsPeriod;if(s.analyticsPeriod=m,s.analyticsDrilldown=null,m==="all")s.analyticsPeriodRows=[],s.analyticsPeriodOptions=[],s.analyticsPeriodFilter="",s.analyticsPeriodChartData=[],s.analyticsPrevYearChartData=[];else{s.analyticsPeriodOptions=await r(s.analyticsTab,m),s.analyticsPeriodFilter=s.analyticsPeriodOptions[0]??"";const h=s.analyticsPeriodFilter,[f,$,g]=await Promise.all([i(s.analyticsTab,m,h),d(m,h),d(m,p(h))]);s.analyticsPeriodRows=f,s.analyticsPeriodChartData=$,s.analyticsPrevYearChartData=g}v()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async a=>{const{fetchAnalyticsByPeriod:i,fetchPeriodChartData:r,prevYearFilter:d}=await x(async()=>{const{fetchAnalyticsByPeriod:h,fetchPeriodChartData:f,prevYearFilter:$}=await Promise.resolve().then(()=>P);return{fetchAnalyticsByPeriod:h,fetchPeriodChartData:f,prevYearFilter:$}},void 0);s.analyticsPeriodFilter=a.target.value,s.analyticsDrilldown=null;const p=s.analyticsPeriodFilter;if(s.analyticsFiscalMode==="fiscal"&&s.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:h}=await x(async()=>{const{fiscalYearToDateRange:A}=await Promise.resolve().then(()=>es);return{fiscalYearToDateRange:A}},void 0),f=parseInt(p),$=h(f);h(f-1);const g=s.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:w}=await x(async()=>{const{supabaseRpc:A}=await Promise.resolve().then(()=>F);return{supabaseRpc:A}},void 0),[_,L,q]=await Promise.all([w(g,{p_date_from:$.from,p_date_to:$.to}),r("yearly",p),r("yearly",String(f-1))]);s.analyticsPeriodRows=(_??[]).map(A=>({code:String(A.code??""),name:String(A.name??""),amount:Number(A.amount??0),quantity:Number(A.quantity??0),documents:Number(A.documents??0),volumeMl:Number(A.volume_ml??0)})),s.analyticsPeriodChartData=(L??[]).map(A=>({...A})),s.analyticsPrevYearChartData=(q??[]).map(A=>({...A}))}else{const[h,f,$]=await Promise.all([i(s.analyticsTab,s.analyticsPeriod,p),r(s.analyticsPeriod,p),r(s.analyticsPeriod,d(p))]);s.analyticsPeriodRows=h,s.analyticsPeriodChartData=f,s.analyticsPrevYearChartData=$}v()}),e.querySelectorAll("[data-fiscal-mode]").forEach(a=>{a.addEventListener("click",async()=>{if(s.analyticsFiscalMode=a.dataset.fiscalMode,s.analyticsPeriod==="yearly")if(s.analyticsPeriodRows=[],s.analyticsPeriodChartData=[],s.analyticsPrevYearChartData=[],s.analyticsPeriodFilter="",s.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:i}=await x(async()=>{const{monthToFiscalYear:d}=await Promise.resolve().then(()=>es);return{monthToFiscalYear:d}},void 0),r=new Set;for(const d of s.salesAnalytics.monthlySales)r.add(i(d.month));s.analyticsPeriodOptions=[...r].sort((d,p)=>p-d).map(String)}else{const{fetchAvailablePeriods:i}=await x(async()=>{const{fetchAvailablePeriods:r}=await Promise.resolve().then(()=>P);return{fetchAvailablePeriods:r}},void 0);s.analyticsPeriodOptions=await i(s.analyticsTab,"yearly")}v()})}),e.querySelectorAll("[data-chart-metric]").forEach(a=>{a.addEventListener("click",()=>{s.analyticsChartMetric=a.dataset.chartMetric,v()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.analyticsDrilldown??"",r=a.dataset.drilldownName??i,d=s.analyticsTab,{fetchCustomerProductBreakdown:p,fetchProductCustomerBreakdown:m,fetchEntityMonthlySales:h,periodToDateRange:f}=await x(async()=>{const{fetchCustomerProductBreakdown:_,fetchProductCustomerBreakdown:L,fetchEntityMonthlySales:q,periodToDateRange:A}=await Promise.resolve().then(()=>P);return{fetchCustomerProductBreakdown:_,fetchProductCustomerBreakdown:L,fetchEntityMonthlySales:q,periodToDateRange:A}},void 0),$=s.analyticsPeriod!=="all"&&s.analyticsPeriodFilter?f(s.analyticsPeriod,s.analyticsPeriodFilter):null,[g,w]=await Promise.all([h(i,d==="customers"?"customer":"product"),d==="customers"?p(i,$?.from,$?.to):m(i,$?.from,$?.to)]);s.analyticsDrilldown={tab:d,code:i,name:r,monthlySales:g,breakdownRows:w},v()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{s.analyticsDrilldown=null,v()}),e.querySelector("#staff-filter-input")?.addEventListener("input",a=>{s.analyticsStaffFilter=a.target.value,v()}),e.querySelectorAll("[data-staff-drilldown]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.staffDrilldown??"",r=a.dataset.staffName??"",{fetchStaffCustomerBreakdown:d,fetchStaffProductBreakdown:p,periodToDateRange:m}=await x(async()=>{const{fetchStaffCustomerBreakdown:w,fetchStaffProductBreakdown:_,periodToDateRange:L}=await Promise.resolve().then(()=>P);return{fetchStaffCustomerBreakdown:w,fetchStaffProductBreakdown:_,periodToDateRange:L}},void 0),h=m(s.analyticsStaffPeriod,s.analyticsStaffPeriodFilter),f=s.analyticsStaffDrilldown?.breakdownTab??"customers",[$,g]=await Promise.all([d(i,h?.from,h?.to),p(i,h?.from,h?.to)]);s.analyticsStaffDrilldown={code:i,name:r,breakdownTab:f,customerRows:$,productRows:g},v()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(a=>{a.addEventListener("click",()=>{s.analyticsStaffDrilldown&&(s.analyticsStaffDrilldown={...s.analyticsStaffDrilldown,breakdownTab:a.dataset.staffBreakdownTab},v())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{s.analyticsStaffDrilldown=null,v()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",a=>{s.analyticsTagFilter=a.target.value,v()}),e.querySelectorAll("[data-staff-period]").forEach(a=>{a.addEventListener("click",async()=>{const{fetchAvailablePeriods:i,fetchStaffTotalsByPeriod:r,periodToDateRange:d}=await x(async()=>{const{fetchAvailablePeriods:m,fetchStaffTotalsByPeriod:h,periodToDateRange:f}=await Promise.resolve().then(()=>P);return{fetchAvailablePeriods:m,fetchStaffTotalsByPeriod:h,periodToDateRange:f}},void 0),p=a.dataset.staffPeriod;if(s.analyticsStaffPeriod=p,s.analyticsStaffDrilldown=null,p==="all")s.analyticsStaffPeriodFilter="",s.analyticsStaffPeriodOptions=[],s.analyticsStaffTotals=[];else{s.analyticsStaffPeriodOptions=await i("staff",p),s.analyticsStaffPeriodFilter=s.analyticsStaffPeriodOptions[0]??"";const m=d(p,s.analyticsStaffPeriodFilter);s.analyticsStaffTotals=await r(m?.from,m?.to)}v()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async a=>{const{fetchStaffTotalsByPeriod:i,periodToDateRange:r}=await x(async()=>{const{fetchStaffTotalsByPeriod:p,periodToDateRange:m}=await Promise.resolve().then(()=>P);return{fetchStaffTotalsByPeriod:p,periodToDateRange:m}},void 0);s.analyticsStaffPeriodFilter=a.target.value;const d=r(s.analyticsStaffPeriod,s.analyticsStaffPeriodFilter);s.analyticsStaffTotals=await i(d?.from,d?.to),s.analyticsStaffDrilldown=null,v()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{fe(e),s.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),s.invoiceErrors={},v()}),e.querySelectorAll("[data-action='remove-line']").forEach(a=>{a.addEventListener("click",()=>{fe(e);const i=parseInt(a.dataset.line??"0",10);s.invoiceForm.lines.splice(i,1),s.invoiceErrors=In(s.invoiceForm),v()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(a=>{a.addEventListener("click",()=>{fe(e),hd(parseInt(a.dataset.line??"0",10)),s.invoiceErrors={},v()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{vd(),v()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{fe(e),s.pickerMode="customer",s.pickerTargetLine=null,s.pickerQuery=s.invoiceForm.customerCode||s.invoiceForm.customerName,v()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(a=>{a.addEventListener("click",()=>{fe(e);const i=parseInt(a.dataset.line??"0",10),r=s.invoiceForm.lines[i];s.pickerMode="product",s.pickerTargetLine=i,s.pickerQuery=r?r.productCode||r.productName:"",v()})}),e.querySelectorAll("[data-action='modal-close']").forEach(a=>{a.addEventListener("click",i=>{a.classList.contains("modal-backdrop")&&i.target instanceof HTMLElement&&!i.target.classList.contains("modal-backdrop")||(kt(),v())})}),e.querySelectorAll("[data-action='picker-select']").forEach(a=>{const i=async()=>{const r=a.dataset.code??"",d=a.dataset.name??"";if(s.pickerMode==="customer"){s.invoiceForm.customerCode=r,s.invoiceForm.customerName=d,delete s.invoiceErrors.customerCode;const p=s.masterStats?.customers.find(m=>m.code===r);s.invoicePriceGroup=p?.priceGroup||"",!s.invoicePriceGroup&&r&&(s.invoicePriceGroup=await Zt(r))}else if(s.pickerMode==="product"&&s.pickerTargetLine!==null){const p=s.invoiceForm.lines[s.pickerTargetLine];if(p){p.productCode=r,p.productName=d;const m=await on(s.invoicePriceGroup,r);m>0&&(p.unitPrice=m),p.amount=p.quantity*p.unitPrice,delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productCode`],delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productName`]}}kt(),v()};a.addEventListener("click",i),a.addEventListener("keydown",r=>{r.key==="Enter"&&i()})}),e.querySelector("#modal-search")?.addEventListener("input",a=>{s.pickerQuery=a.target.value,v()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Dn(),v()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{qn(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{fe(e),fd(s.invoiceForm.customerCode)&&(delete s.invoiceErrors.customerCode,!s.invoicePriceGroup&&s.invoiceForm.customerCode&&(s.invoicePriceGroup=await Zt(s.invoiceForm.customerCode)),v())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{fe(e),gd(s.invoiceForm.customerName)&&(delete s.invoiceErrors.customerCode,v())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(a=>{a.addEventListener("input",()=>{fe(e),s.invoiceSavedDocNo=null;const i=a.dataset.field;(i==="quantity"||i==="unitPrice")&&v()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{fe(e),s.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const a=e.querySelector("#delivery-docno")?.value??"";if(s.deliverySearchDocNo=a.trim(),s.deliveryNote=null,s.actionLoading=!0,v(),!s.deliverySearchDocNo){S("伝票番号を入力してください","error"),s.actionLoading=!1,v();return}ga(s.deliverySearchDocNo).then(i=>{s.deliveryNote=i,s.actionLoading=!1,v()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const a=e.querySelector("#billing-month")?.value??s.billingYearMonth;s.billingYearMonth=a,s.billingSummary=null,s.actionLoading=!0,v(),ba(a).then(i=>{s.billingSummary=i,s.actionLoading=!1,v()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const a=parseInt(e.querySelector("#tax-year")?.value??String(s.taxYear),10),i=parseInt(e.querySelector("#tax-month")?.value??String(s.taxMonth),10);s.taxYear=a,s.taxMonth=i,s.taxDeclaration=null,s.actionLoading=!0,v(),$a(a,i).then(r=>{s.taxDeclaration=r,s.actionLoading=!1,v()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxXML:a}=await x(async()=>{const{generateTaxXML:m}=await Promise.resolve().then(()=>P);return{generateTaxXML:m}},void 0),i=a(s.taxDeclaration),r=new Blob([i],{type:"application/xml;charset=utf-8"}),d=URL.createObjectURL(r),p=document.createElement("a");p.href=d,p.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.xml`,p.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxCSV:a}=await x(async()=>{const{generateTaxCSV:m}=await Promise.resolve().then(()=>P);return{generateTaxCSV:m}},void 0),i=a(s.taxDeclaration),r=new Blob([i],{type:"text/csv;charset=utf-8"}),d=URL.createObjectURL(r),p=document.createElement("a");p.href=d,p.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.csv`,p.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{saveTaxDeclaration:a}=await x(async()=>{const{saveTaxDeclaration:i}=await Promise.resolve().then(()=>P);return{saveTaxDeclaration:i}},void 0);try{await a(s.taxDeclaration),S("下書き保存しました")}catch(i){S("保存に失敗: "+(i instanceof Error?i.message:String(i)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(a=>{a.addEventListener("change",async()=>{if(!s.taxDeclaration)return;const i=Number(a.dataset.taxRow),r=a.dataset.taxField,d=a.type==="number"?Number(a.value)||0:a.value,p=[...s.taxDeclaration.rows];p[i]={...p[i],[r]:d};const{recalculateTaxDeclaration:m}=await x(async()=>{const{recalculateTaxDeclaration:h}=await Promise.resolve().then(()=>P);return{recalculateTaxDeclaration:h}},void 0);s.taxDeclaration=m({...s.taxDeclaration,rows:p}),v()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const i=Number(a.dataset.dedRow),r=a.dataset.dedField,d=a.type==="number"?Number(a.value)||0:a.value,p=[...s.taxDeclaration.deductions];p[i]={...p[i],[r]:d},s.taxDeclaration={...s.taxDeclaration,deductions:p},v()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const i=a.dataset.taxField;s.taxDeclaration={...s.taxDeclaration,[i]:a.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{recalculateTaxDeclaration:a,TAX_RATE_CATEGORIES:i}=await x(async()=>{const{recalculateTaxDeclaration:p,TAX_RATE_CATEGORIES:m}=await Promise.resolve().then(()=>P);return{recalculateTaxDeclaration:p,TAX_RATE_CATEGORIES:m}},void 0),r=i[0],d={taxCategory:r.code,taxCategoryName:r.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:r.taxRatePerLiter,taxAmount:0};s.taxDeclaration=a({...s.taxDeclaration,rows:[...s.taxDeclaration.rows,d]}),v()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(a=>{a.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const i=Number(a.dataset.taxRow),{recalculateTaxDeclaration:r}=await x(async()=>{const{recalculateTaxDeclaration:p}=await Promise.resolve().then(()=>P);return{recalculateTaxDeclaration:p}},void 0),d=s.taxDeclaration.rows.filter((p,m)=>m!==i);s.taxDeclaration=r({...s.taxDeclaration,rows:d}),v()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!s.taxDeclaration)return;const a={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};s.taxDeclaration={...s.taxDeclaration,deductions:[...s.taxDeclaration.deductions,a]},v()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(a=>{a.addEventListener("click",()=>{if(!s.taxDeclaration)return;const i=Number(a.dataset.dedRow),r=s.taxDeclaration.deductions.filter((d,p)=>p!==i);s.taxDeclaration={...s.taxDeclaration,deductions:r},v()})}),e.querySelectorAll("[data-store-tab]").forEach(a=>{a.addEventListener("click",()=>{s.storeTab=a.dataset.storeTab,v()})}),e.querySelectorAll("[data-import-entity]").forEach(a=>{a.addEventListener("click",()=>{s.importEntity=a.dataset.importEntity,s.importPreview=null,s.importResult=null,v()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const a=oc(s.importEntity),i=new Blob([a],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(i),d=document.createElement("a");d.href=r,d.download=`template_${s.importEntity}.csv`,d.click(),URL.revokeObjectURL(r)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const i=e.querySelector("#import-file")?.files?.[0];if(!i){S("CSVファイルを選択してください","warning");return}const r=new FileReader;r.onload=()=>{const d=String(r.result??""),{columns:p,rows:m}=sc(d);s.importPreview=nc(s.importEntity,p,m),s.importResult=null,v()},r.readAsText(i,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{s.importPreview=null,s.importResult=null,v()}),e.querySelectorAll("[data-print-template]").forEach(a=>{a.addEventListener("click",()=>{s.printTemplate=a.dataset.printTemplate,v()})}),e.querySelectorAll("[data-print-field]").forEach(a=>{a.addEventListener("change",()=>{const i=a.dataset.printField;let r=a.value;(i==="taxRate"||i==="previousBalance"||i==="paymentAmount")&&(r=Number(a.value)||0),s.printData={...s.printData,[i]:r},v()})}),e.querySelectorAll("[data-print-opt]").forEach(a=>{const i=()=>{const r=a.dataset.printOpt;let d;a.type==="checkbox"?d=a.checked:r==="copies"?d=Number(a.value)||1:r==="overlayOpacity"||r==="calibrationOffsetX"||r==="calibrationOffsetY"?d=Number(a.value)||0:d=a.value,s.printOptions={...s.printOptions,[r]:d},v()};a.addEventListener("change",i),a.type==="range"&&a.addEventListener("input",i)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(a=>{a.addEventListener("change",()=>{const i=Number(a.dataset.printLine),r=a.dataset.printLfield,d=[...s.printData.lines];let p=a.value;(r==="quantity"||r==="unitPrice")&&(p=Number(a.value)||0),d[i]={...d[i],[r]:p},d[i].amount=(Number(d[i].quantity)||0)*(Number(d[i].unitPrice)||0),s.printData={...s.printData,lines:d},v()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{s.printData={...s.printData,lines:[...s.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},v()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(a=>{a.addEventListener("click",()=>{const i=Number(a.dataset.printLine);s.printData={...s.printData,lines:s.printData.lines.filter((r,d)=>d!==i)},v()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(s.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(s.printCompany)),S("印刷設定を保存しました")}catch(a){S("保存失敗: "+(a instanceof Error?a.message:String(a)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const a=s.printCompany,i=prompt("会社名",a.name);if(i===null)return;const r=prompt("郵便番号",a.postalCode)??a.postalCode,d=prompt("住所",a.address1)??a.address1,p=prompt("TEL",a.tel)??a.tel,m=prompt("FAX",a.fax)??a.fax,h=prompt("適格請求書登録番号 (T+13桁)",a.registrationNo)??a.registrationNo,f=prompt("取引銀行名",a.bankName)??a.bankName,$=prompt("支店名",a.bankBranch)??a.bankBranch,g=prompt("口座番号",a.bankAccountNo)??a.bankAccountNo,w=prompt("口座名義",a.bankAccountHolder)??a.bankAccountHolder;s.printCompany={...a,name:i,postalCode:r,address1:d,tel:p,fax:m,registrationNo:h,bankName:f,bankBranch:$,bankAccountNo:g,bankAccountHolder:w},v()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{s.fdDesignMode=!s.fdDesignMode,v()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const r=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",d=Bt(a),{savePrintLayout:p}=await x(async()=>{const{savePrintLayout:h}=await Promise.resolve().then(()=>P);return{savePrintLayout:h}},void 0),m={id:`bp1701_${r.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:r,templateKey:"chain_store",positions:d};try{await p(m)?(S(`クラウド保存成功: ${r}`),s.fdSavedPositions=d,localStorage.setItem("sake_fd_positions",JSON.stringify(d)),v()):(S("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(d)))}catch(h){S("保存エラー: "+(h instanceof Error?h.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const i=Bt(a);s.fdSavedPositions=i;try{localStorage.setItem("sake_fd_positions",JSON.stringify(i)),S(`ローカル保存完了: ${Object.keys(i).length}件`)}catch(r){S("保存失敗: "+(r instanceof Error?r.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const r={templateKey:"chain_store",positions:Bt(a),exportedAt:new Date().toISOString()},d=new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),p=URL.createObjectURL(d),m=document.createElement("a");m.href=p,m.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,m.click(),URL.revokeObjectURL(p)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async a=>{const i=a.target.files?.[0];if(i)try{const r=await i.text(),p=JSON.parse(r).positions;if(!p)throw new Error("positions field not found");s.fdSavedPositions=p,localStorage.setItem("sake_fd_positions",JSON.stringify(p)),S(`インポート成功: ${Object.keys(p).length}件`),v()}catch(r){S("インポート失敗: "+(r instanceof Error?r.message:""),"error")}});const l=e.querySelector("#fd-saved-layouts");l&&s.route==="/form-designer"&&s.fdDesignMode&&(async()=>{const{fetchPrintLayouts:a}=await x(async()=>{const{fetchPrintLayouts:r}=await Promise.resolve().then(()=>P);return{fetchPrintLayouts:r}},void 0),i=await a("chain_store");i.length===0?l.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(l.innerHTML=`☁️ クラウド保存済み (${i.length}件):<br/>`+i.map(r=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${r.id}" style="margin:4px 4px 0 0;">${r.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${r.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),l.querySelectorAll("[data-action='fd-load-layout']").forEach(r=>{r.addEventListener("click",()=>{const d=r.dataset.layoutId,p=i.find(m=>m.id===d);p&&(s.fdSavedPositions=p.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(p.positions)),S(`読込完了: ${p.name}`),v())})}),l.querySelectorAll("[data-action='fd-delete-layout']").forEach(r=>{r.addEventListener("click",async()=>{const d=r.dataset.layoutId;if(!d||!await ue("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:p}=await x(async()=>{const{deletePrintLayout:h}=await Promise.resolve().then(()=>P);return{deletePrintLayout:h}},void 0);await p(d)?(S("削除しました"),v()):S("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await ue("フィールド位置を初期値に戻しますか？")&&(s.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),v())});const c=e.querySelector("#fd-sel-x"),u=e.querySelector("#fd-sel-y");[c,u].forEach(a=>{a?.addEventListener("change",()=>{if(!s.fdActiveFieldId)return;const i=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);i&&(c&&(i.style.left=c.value+"mm"),u&&(i.style.top=u.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(a=>{a.addEventListener("dragstart",i=>{a.classList.add("wf-dragging"),i.dataTransfer?.setData("text/plain",a.dataset.wfOrder??"")}),a.addEventListener("dragend",()=>a.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(a=>{a.addEventListener("dragover",i=>i.preventDefault()),a.addEventListener("drop",i=>{i.preventDefault();const r=i.dataTransfer?.getData("text/plain"),d=a.dataset.wfStage;if(!r||!d)return;const p=s.workflowOrders.find(m=>m.id===r);p&&(p.stage=d,v())})}),e.querySelectorAll("[data-mo-step]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.moStep;a.disabled||(s.mobileOrder.step=i,v())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",a=>{s.mobileOrder.customerQuery=a.target.value,v()}),e.querySelector("#mo-product-q")?.addEventListener("input",a=>{s.mobileOrder.productQuery=a.target.value,v()}),e.querySelectorAll("[data-mo-select-customer]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.moSelectCustomer,r=s.masterStats?.customers.find(d=>d.id===i);r&&(s.mobileOrder.selectedCustomer=r),v()})}),e.querySelectorAll("[data-mo-add-product]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.moAddProduct,r=s.masterStats?.products.find(p=>p.code===i);if(!r)return;const d=1800;s.mobileOrder.cart.push({productCode:r.code,productName:r.name,quantity:1,unit:"本",unitPrice:d,amount:d}),v()})}),e.querySelectorAll("[data-mo-qty]").forEach(a=>{a.addEventListener("click",()=>{const i=Number(a.dataset.moQty),r=a.dataset.moProduct,d=s.mobileOrder.cart.find(p=>p.productCode===r);d&&(d.quantity=Math.max(0,d.quantity+i),d.amount=d.quantity*d.unitPrice,d.quantity===0&&(s.mobileOrder.cart=s.mobileOrder.cart.filter(p=>p.productCode!==r)),v())})}),e.querySelectorAll("[data-mo-remove]").forEach(a=>{a.addEventListener("click",()=>{const i=Number(a.dataset.moRemove);s.mobileOrder.cart.splice(i,1),v()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const a=e.querySelector("#mo-memo");s.mobileOrder.memo=a?.value??"";const i="MO"+Date.now().toString().slice(-8);s.mobileOrder.submittedDocNo=i,s.mobileOrder.step="done",v()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{s.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},v()}),e.querySelectorAll("[data-tour-id]").forEach(a=>{a.addEventListener("click",()=>{s.tourActiveId=a.dataset.tourId??null,v()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(a=>{a.addEventListener("click",()=>{const i=s.tourInquiries.find(h=>h.id===s.tourActiveId);if(!i)return;const r=a.dataset.template==="confirm"?Lr:Dr,d=e.querySelector("#tour-confirmed-time"),p=r.replaceAll("{name}",i.name).replaceAll("{partySize}",String(i.partySize)).replaceAll("{confirmedTime}",d?.value??i.visitDate),m=e.querySelector("#tour-reply-body");m&&(m.value=p)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const a=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",i=s.tourInquiries.find(d=>d.id===a);if(!i)return;const r=e.querySelector("#tour-confirmed-time");i.status="confirmed",i.repliedAt=new Date().toISOString(),i.confirmedTime=r?.value??"",S("返信メールを下書き保存し、ステータスを確定にしました"),v()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const a=e.querySelector("#lb-type")?.value??"",i=e.querySelector("#lb-area")?.value??"",r=e.querySelector("#lb-keyword")?.value??"";if(!a&&!r){S("業種かキーワードを入力してください","warning");return}s.leadSearchType=a,s.leadSearchArea=i,s.leadSearchQuery=r,s.leadSearching=!0,v();const d=s.integrations.find(f=>f.provider==="google_maps");if(!d||!d.config.api_key){S("Google Maps APIキーが /integrations で未設定です","warning"),s.leadSearching=!1,v();return}const{searchPlaces:p}=await x(async()=>{const{searchPlaces:f}=await Promise.resolve().then(()=>P);return{searchPlaces:f}},void 0),m=[a,r].filter(Boolean).join(" "),h=await p(d,m,i);s.leadSearching=!1,h.error?S("検索失敗: "+h.error,"error"):s.leadSearchResults=h.results,v()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{s.leadSearchResults=[],v()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(s.leadSearchResults.length===0)return;const a=prompt("リスト名を入力:",`${s.leadSearchType} ${s.leadSearchArea}`);if(!a)return;const i=`ll_${Date.now()}`,r={id:i,name:a,query:s.leadSearchQuery,area:s.leadSearchArea,businessType:s.leadSearchType,totalCount:s.leadSearchResults.length,source:"google_places"},{saveLeadList:d,saveLeadItem:p,fetchLeadLists:m,fetchLeadItems:h}=await x(async()=>{const{saveLeadList:g,saveLeadItem:w,fetchLeadLists:_,fetchLeadItems:L}=await Promise.resolve().then(()=>P);return{saveLeadList:g,saveLeadItem:w,fetchLeadLists:_,fetchLeadItems:L}},void 0);await d(r);const f=e.querySelectorAll(".lb-search-check:checked"),$=Array.from(f).map(g=>Number(g.dataset.idx));for(const g of $){const w=s.leadSearchResults[g];w&&await p({...w,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:i,businessType:s.leadSearchType})}s.leadLists=await m(),s.leadActiveListId=i,s.leadItems=await h(i),s.leadSearchResults=[],S(`${$.length}件を「${a}」として保存しました`),v()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??null;if(s.leadActiveListId=i,i){const{fetchLeadItems:r}=await x(async()=>{const{fetchLeadItems:d}=await Promise.resolve().then(()=>P);return{fetchLeadItems:d}},void 0);s.leadItems=await r(i)}v()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??"",r=s.leadItems.find(m=>m.id===i);if(!r)return;const{saveLeadItem:d,fetchLeadItems:p}=await x(async()=>{const{saveLeadItem:m,fetchLeadItems:h}=await Promise.resolve().then(()=>P);return{saveLeadItem:m,fetchLeadItems:h}},void 0);await d({...r,status:"excluded"}),s.leadActiveListId&&(s.leadItems=await p(s.leadActiveListId)),v()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??"",r=s.leadItems.find(h=>h.id===i);if(!r)return;const{convertLeadToProspect:d,fetchLeadItems:p}=await x(async()=>{const{convertLeadToProspect:h,fetchLeadItems:f}=await Promise.resolve().then(()=>P);return{convertLeadToProspect:h,fetchLeadItems:f}},void 0);await d(r)&&(S("見込客に追加しました: "+r.companyName),s.leadActiveListId&&(s.leadItems=await p(s.leadActiveListId)),v())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const a=e.querySelectorAll(".lb-item-check:checked");if(a.length===0&&!await ue("全ての新規アイテムを見込客に変換しますか？"))return;const i=a.length>0?Array.from(a).map(m=>m.dataset.id):s.leadItems.filter(m=>m.status==="new").map(m=>m.id),{convertLeadToProspect:r,fetchLeadItems:d}=await x(async()=>{const{convertLeadToProspect:m,fetchLeadItems:h}=await Promise.resolve().then(()=>P);return{convertLeadToProspect:m,fetchLeadItems:h}},void 0);let p=0;for(const m of i){const h=s.leadItems.find(f=>f.id===m);h&&h.status==="new"&&await r(h)&&p++}S(`${p}件を見込客に変換しました`),s.leadActiveListId&&(s.leadItems=await d(s.leadActiveListId)),v()}),e.querySelectorAll("[data-map-filter]").forEach(a=>{a.addEventListener("change",()=>{const i=a.dataset.mapFilter;let r;a.type==="checkbox"?r=a.checked:r=a.value,s.mapFilters={...s.mapFilters,[i]:r},v()})}),e.querySelectorAll(".churn-reason-select").forEach(a=>{a.addEventListener("change",async()=>{const i=a.dataset.churnCode??"",r=a.value;try{const{saveChurnNote:d}=await x(async()=>{const{saveChurnNote:h}=await Promise.resolve().then(()=>P);return{saveChurnNote:h}},void 0);await d({customerCode:i,reason:r,memo:"",actionedAt:null});const p=s.churnNotes.find(h=>h.customerCode===i);p?p.reason=r:s.churnNotes.push({customerCode:i,reason:r,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const m=a.closest("tr");if(m){const h=m.querySelector("td:nth-child(2)");if(h){let f=h.querySelector(".reason-badge");!f&&r&&(f=document.createElement("span"),f.className="status-pill info reason-badge",f.style.fontSize="0.72rem",h.appendChild(f)),f&&(f.textContent=r?od[r]??"":"")}}S("理由を保存しました")}catch(d){S("保存に失敗しました","error"),console.error(d)}})}),e.querySelectorAll(".churn-actioned-check").forEach(a=>{a.addEventListener("change",async()=>{const i=a.dataset.churnCode??"",r=a.checked,d=a.closest("tr");d&&(d.style.opacity=r?"0.45":"",d.setAttribute("data-actioned",r?"1":"0"));try{const{saveChurnNote:p}=await x(async()=>{const{saveChurnNote:$}=await Promise.resolve().then(()=>P);return{saveChurnNote:$}},void 0),m=s.churnNotes.find($=>$.customerCode===i),h=m?.reason??"",f=new Date().toISOString().slice(0,10);await p({customerCode:i,reason:h,memo:"",actionedAt:r?f:null}),m?m.actionedAt=r?f:null:s.churnNotes.push({customerCode:i,reason:h,memo:"",actionedAt:r?f:null,updatedAt:new Date().toISOString()}),S(r?"対応済みにしました":"対応済みを解除しました")}catch(p){S("保存に失敗しました","error"),console.error(p)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const a=s.integrations.find(p=>p.provider==="ivry");if(!a||!a.isEnabled){S("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:i,fetchCallLogs:r}=await x(async()=>{const{syncIvryCallLogs:p,fetchCallLogs:m}=await Promise.resolve().then(()=>P);return{syncIvryCallLogs:p,fetchCallLogs:m}},void 0),d=await i(a);d.error?S("同期失敗: "+d.error,"error"):(S(`${d.count}件の通話履歴を同期しました`),s.callLogs=await r(100),v())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const a=s.integrations.find(p=>p.provider==="ivry");if(!a||!a.isEnabled){S("IVRy連携が無効です","warning");return}if(!await ue("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:i}=await x(async()=>{const{syncPhoneBookToIvry:p}=await Promise.resolve().then(()=>P);return{syncPhoneBookToIvry:p}},void 0),r=[];s.masterStats?.customers.forEach(p=>{r.push({name:p.name,phone:"",customerCode:p.code,note:"既存取引先"})}),s.prospects.forEach(p=>{p.phone&&r.push({name:p.companyName,phone:p.phone,customerCode:p.id,note:`見込客 (${p.stage})`})});const d=await i(a,r);d.error?S("送信失敗: "+d.error,"error"):S(`${d.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??"",r=a.dataset.phone??"",d=prompt(`電話番号 ${r} を顧客コードに紐付け
顧客コードを入力:`);if(!d)return;const p=s.callLogs.find(f=>f.id===i);if(!p)return;const{saveCallLog:m,fetchCallLogs:h}=await x(async()=>{const{saveCallLog:f,fetchCallLogs:$}=await Promise.resolve().then(()=>P);return{saveCallLog:f,fetchCallLogs:$}},void 0);await m({...p,matchedCustomerCode:d}),s.callLogs=await h(100),v()})}),e.querySelectorAll("[data-action='call-memo']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??"",r=s.callLogs.find(h=>h.id===i);if(!r)return;const d=prompt("メモを入力:",r.notes??"");if(d===null)return;const{saveCallLog:p,fetchCallLogs:m}=await x(async()=>{const{saveCallLog:h,fetchCallLogs:f}=await Promise.resolve().then(()=>P);return{saveCallLog:h,fetchCallLogs:f}},void 0);await p({...r,notes:d}),s.callLogs=await m(100),v()})}),e.querySelectorAll("[data-prospect-view]").forEach(a=>{a.addEventListener("click",()=>{s.prospectViewMode=a.dataset.prospectView,v()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{s.prospectEditingId="__new__",v()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.id??null;if(s.prospectEditingId=i,i){const{fetchProspectActivities:r}=await x(async()=>{const{fetchProspectActivities:d}=await Promise.resolve().then(()=>P);return{fetchProspectActivities:d}},void 0);s.prospectActivities=await r(i)}v()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.prospectId??null;if(s.prospectEditingId=i,i){const{fetchProspectActivities:r}=await x(async()=>{const{fetchProspectActivities:d}=await Promise.resolve().then(()=>P);return{fetchProspectActivities:d}},void 0);s.prospectActivities=await r(i)}v()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(a=>{a.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(s.prospectEditingId=null,s.prospectActivities=[],v())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const a=s.prospectEditingId==="__new__",i=a?`p_${Date.now()}`:s.prospectEditingId??"",r={id:i,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!r.companyName){S("会社名は必須です","warning");return}const{saveProspect:d,fetchProspects:p,recordAudit:m,sendSlackNotification:h}=await x(async()=>{const{saveProspect:$,fetchProspects:g,recordAudit:w,sendSlackNotification:_}=await Promise.resolve().then(()=>P);return{saveProspect:$,fetchProspects:g,recordAudit:w,sendSlackNotification:_}},void 0);await d(r)?(a&&await h("new_prospect",`新規見込客: ${r.companyName} / 想定 ¥${r.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await m({action:a?"prospect_create":"prospect_update",entityType:"prospect",entityId:i,userEmail:s.user?.email}),s.prospects=await p(),s.prospectEditingId=null,v()):S("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=a.dataset.id??"",{deleteProspect:r,fetchProspects:d}=await x(async()=>{const{deleteProspect:p,fetchProspects:m}=await Promise.resolve().then(()=>P);return{deleteProspect:p,fetchProspects:m}},void 0);await r(i)&&(s.prospects=await d(),v())})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",i=e.querySelector("#prospect-activity-type")?.value??"call",r=e.querySelector("#prospect-activity-title")?.value??"";if(!r){S("内容を入力してください","warning");return}const{saveProspectActivity:d,fetchProspectActivities:p}=await x(async()=>{const{saveProspectActivity:m,fetchProspectActivities:h}=await Promise.resolve().then(()=>P);return{saveProspectActivity:m,fetchProspectActivities:h}},void 0);await d({id:`act_${Date.now()}`,prospectId:a,activityType:i,title:r,activityDate:new Date().toISOString(),staffCode:s.myProfile?.staffCode}),s.prospectActivities=await p(a),v()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(a=>{a.addEventListener("dragstart",i=>{i.dataTransfer?.setData("text/plain",a.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(a=>{a.addEventListener("dragover",i=>i.preventDefault()),a.addEventListener("drop",async i=>{i.preventDefault();const r=i.dataTransfer?.getData("text/plain"),d=a.dataset.prospectStage;if(!r)return;const p=s.prospects.find(m=>m.id===r);if(p&&p.stage!==d){const m={...p,stage:d},{saveProspect:h}=await x(async()=>{const{saveProspect:f}=await Promise.resolve().then(()=>P);return{saveProspect:f}},void 0);await h(m),p.stage=d,v()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:a,saveIntegrationSetting:i}=await x(async()=>{const{fetchIntegrationSettings:f,saveIntegrationSetting:$}=await Promise.resolve().then(()=>P);return{fetchIntegrationSettings:f,saveIntegrationSetting:$}},void 0),d=(s.integrations.length>0?s.integrations:await a()).find(f=>f.provider==="slack");if(!d)return;const p=e.querySelector("#slack-webhook")?.value??"",m=e.querySelector("#slack-default-channel")?.value??"",h=e.querySelector("#slack-enabled")?.checked??!1;await i({...d,config:{...d.config,webhook_url:p,default_channel:m},isEnabled:h}),s.integrations=await a(),S("保存しました"),v()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:a,fetchSlackRules:i}=await x(async()=>{const{saveSlackRule:r,fetchSlackRules:d}=await Promise.resolve().then(()=>P);return{saveSlackRule:r,fetchSlackRules:d}},void 0);for(const r of s.slackRules){const d=e.querySelector(`[data-slack-rule-id="${r.id}"][data-slack-field="enabled"]`)?.checked??r.enabled,p=e.querySelector(`[data-slack-rule-id="${r.id}"][data-slack-field="channel"]`)?.value??r.channel;await a({...r,enabled:d,channel:p})}s.slackRules=await i(),S("ルールを保存しました"),v()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:a}=await x(async()=>{const{sendSlackNotification:r}=await Promise.resolve().then(()=>P);return{sendSlackNotification:r}},void 0),i=await a("new_order","🧪 これはテスト通知です (syusen-cloud)");i.ok?S("テスト送信成功"):S("送信失敗: "+(i.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{s.materialEditing=null,s.materialEditingIsNew=!0,v()}),e.querySelectorAll("[data-action='material-adjust']").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.id??"",r=s.materialList.find(d=>d.id===i);r&&(s.materialEditing=r,s.materialEditingIsNew=!1,v())})}),e.querySelectorAll("[data-action='material-close']").forEach(a=>{a.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(s.materialEditing=null,s.materialEditingIsNew=!1,v())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const i={id:s.materialEditingIsNew?`mat_${Date.now()}`:s.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(i.materialType=e.querySelector("#mat-type")?.value??"",!i.code||!i.name){S("コードと品名は必須です","warning");return}const{saveMaterial:r,fetchMaterialList:d}=await x(async()=>{const{saveMaterial:m,fetchMaterialList:h}=await Promise.resolve().then(()=>P);return{saveMaterial:m,fetchMaterialList:h}},void 0);await r(i)?(s.materialList=await d(),s.materialEditing=null,s.materialEditingIsNew=!1,S("保存しました"),v()):S("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!a||!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:i,fetchMaterialList:r}=await x(async()=>{const{deleteMaterial:d,fetchMaterialList:p}=await Promise.resolve().then(()=>P);return{deleteMaterial:d,fetchMaterialList:p}},void 0);await i(a)&&(s.materialList=await r(),s.materialEditing=null,v())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{s.userEditingId="__new__",v()}),e.querySelectorAll("[data-action='user-edit']").forEach(a=>{a.addEventListener("click",()=>{s.userEditingId=a.dataset.id??null,v()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{s.userEditingId=null,v()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const a=s.userEditingId==="__new__",i=a?crypto.randomUUID():s.userEditingId??"",r=e.querySelector("#user-email")?.value.trim()??"",d=e.querySelector("#user-name")?.value.trim()??"";if(!r||!d){S("名前とメールアドレスは必須です","warning");return}const p={id:i,email:r,displayName:d,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(a){const g=e.querySelector("#user-password")?.value??"";if(g.length<8){S("パスワードは8文字以上必要です","warning");return}try{await Na(r,g)}catch(w){S("Auth登録失敗: "+(w instanceof Error?w.message:""),"error");return}}const{saveUserProfile:m,fetchUserProfiles:h,recordAudit:f}=await x(async()=>{const{saveUserProfile:g,fetchUserProfiles:w,recordAudit:_}=await Promise.resolve().then(()=>P);return{saveUserProfile:g,fetchUserProfiles:w,recordAudit:_}},void 0);await m(p)?(await f({action:a?"user_create":"user_update",entityType:"user",entityId:i,userEmail:s.user?.email}),s.userProfiles=await h(),s.userEditingId=null,S("保存しました"),v()):S("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=a.dataset.id??"",{deleteUserProfile:r,fetchUserProfiles:d,recordAudit:p}=await x(async()=>{const{deleteUserProfile:h,fetchUserProfiles:f,recordAudit:$}=await Promise.resolve().then(()=>P);return{deleteUserProfile:h,fetchUserProfiles:f,recordAudit:$}},void 0);await r(i)?(await p({action:"user_delete",entityType:"user",entityId:i,userEmail:s.user?.email}),s.userProfiles=await d(),v()):S("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!s.myProfile)return;const a=e.querySelector("#profile-sender")?.value??"",i={...s.myProfile,defaultMailSenderId:a},{saveUserProfile:r}=await x(async()=>{const{saveUserProfile:d}=await Promise.resolve().then(()=>P);return{saveUserProfile:d}},void 0);await r(i),s.myProfile=i,S("保存しました"),v()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const a=e.querySelector("#profile-new-password")?.value??"";if(a.length<8){S("8文字以上のパスワードを入力してください","warning");return}try{await Yn(a),S("パスワードを変更しました")}catch(i){S("変更失敗: "+(i instanceof Error?i.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(a=>{a.addEventListener("click",()=>{s.integrationEditingId=a.dataset.id??null,v()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{s.integrationEditingId=null,v()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='int-save']")?.dataset.id??"",i=s.integrations.find(f=>f.id===a);if(!i)return;const r={...i.config};Object.keys(r).forEach(f=>{const $=e.querySelector(`#int-${f}`);$&&(r[f]=$.value)});const d=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:p,fetchIntegrationSettings:m}=await x(async()=>{const{saveIntegrationSetting:f,fetchIntegrationSettings:$}=await Promise.resolve().then(()=>P);return{saveIntegrationSetting:f,fetchIntegrationSettings:$}},void 0);await p({...i,config:r,isEnabled:d})?(s.integrations=await m(),s.integrationEditingId=null,S("保存しました"),v()):S("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(a=>{a.addEventListener("click",async()=>{const i=s.integrations.find(m=>m.provider==="shopify");if(!i){S("Shopify連携が未設定です","warning");return}a.textContent="同期中…",a.disabled=!0;const{syncShopifyOrders:r,fetchShopifyOrders:d}=await x(async()=>{const{syncShopifyOrders:m,fetchShopifyOrders:h}=await Promise.resolve().then(()=>P);return{syncShopifyOrders:m,fetchShopifyOrders:h}},void 0),p=await r(i);p.error?S("同期失敗: "+p.error,"error"):(S(`${p.count}件を同期しました`),s.shopifyOrders=await d()),v()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(a=>{a.addEventListener("click",async()=>{const i=s.integrations.find(m=>m.provider==="google_calendar");if(!i)return;a.textContent="同期中…",a.disabled=!0;const{syncGoogleCalendar:r,fetchCalendarEvents:d}=await x(async()=>{const{syncGoogleCalendar:m,fetchCalendarEvents:h}=await Promise.resolve().then(()=>P);return{syncGoogleCalendar:m,fetchCalendarEvents:h}},void 0),p=await r(i);p.error?S("同期失敗: "+p.error,"error"):(S(`${p.count}件を同期しました`),s.calendarEvents=await d(s.calendarYearMonth)),v()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const i=e.querySelector("#fax-file")?.files?.[0];if(!i){S("FAX画像を選択してください","warning");return}const r=s.integrations.find(d=>d.provider==="cloud_vision");if(!r||!r.config.api_key){S("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}s.faxProcessing=!0,s.faxOcrText=null,v();try{const d=new FileReader;d.onload=async()=>{const p=String(d.result??""),{ocrFaxImage:m,saveFaxRecord:h,fetchFaxInbox:f}=await x(async()=>{const{ocrFaxImage:_,saveFaxRecord:L,fetchFaxInbox:q}=await Promise.resolve().then(()=>P);return{ocrFaxImage:_,saveFaxRecord:L,fetchFaxInbox:q}},void 0),$=await m(r,p),g=e.querySelector("#fax-sender-name")?.value??"",w=e.querySelector("#fax-sender-phone")?.value??"";await h({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:g,senderPhone:w,ocrStatus:$.error?"failed":"done",ocrText:$.text}),s.faxOcrText=$.error?`エラー: ${$.error}`:$.text,s.faxRecords=await f(),s.faxProcessing=!1,v()},d.readAsDataURL(i)}catch(d){S("OCR失敗: "+(d instanceof Error?d.message:""),"error"),s.faxProcessing=!1,v()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{s.mailSenderEditingId="__new__",v()}),e.querySelectorAll("[data-action='ms-edit']").forEach(a=>{a.addEventListener("click",()=>{s.mailSenderEditingId=a.dataset.id??null,v()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{s.mailSenderEditingId=null,v()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,i={id:a,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:s.mailSenders.find(m=>m.id===a)?.isVerified??!1};if(!i.name||!i.email){S("名前とメールアドレスは必須です","warning");return}const{saveMailSender:r,fetchMailSenders:d}=await x(async()=>{const{saveMailSender:m,fetchMailSenders:h}=await Promise.resolve().then(()=>P);return{saveMailSender:m,fetchMailSenders:h}},void 0);await r(i)?(s.mailSenders=await d(),s.mailSenderEditingId=null,S("保存しました"),v()):S("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=a.dataset.id??"",{deleteMailSender:r,fetchMailSenders:d}=await x(async()=>{const{deleteMailSender:m,fetchMailSenders:h}=await Promise.resolve().then(()=>P);return{deleteMailSender:m,fetchMailSenders:h}},void 0);await r(i)?(s.mailSenders=await d(),v()):S("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(a=>{a.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!s.demandAnalysis){S("データなし","error");return}const a=s.demandAnalysis,i=Object.entries(a.matrix).map(([d,p])=>{const m={productCode:d};return a.months.forEach(h=>{m[h]=p[h]??0}),m}),r=[{key:"productCode",label:"商品コード"},...a.months.map(d=>({key:d,label:d}))];ca("demand-analysis.csv",i,r)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(s.productionPlan.length===0){S("データなし","error");return}const a=s.productionPlan.map(r=>({...r}));ca("production-plan.csv",a,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数量"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await ue("当月の全請求を締め切りますか？")&&S("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async a=>{const i=parseInt(a.target.value);s.brewingPlanFY=i;const{fetchBrewingPlanSummary:r,fetchBrewingMonthlyTrend:d,fetchBrewingSchedule:p}=await x(async()=>{const{fetchBrewingPlanSummary:$,fetchBrewingMonthlyTrend:g,fetchBrewingSchedule:w}=await Promise.resolve().then(()=>P);return{fetchBrewingPlanSummary:$,fetchBrewingMonthlyTrend:g,fetchBrewingSchedule:w}},void 0),[m,h,f]=await Promise.all([r(`${i}-10-01`,`${i+1}-09-30`),d(`${i}-10-01`,`${i+1}-09-30`),p(i)]);s.brewingPlanData=m,s.brewingMonthlyTrend=h,s.brewingSchedule=f,v()}),e.querySelectorAll(".btn-edit-stock").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.catId??"";e.querySelector(`#stock-display-${i}`).style.display="none",e.querySelector(`#stock-edit-${i}`).style.display="",a.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.catId??"";e.querySelector(`#stock-display-${i}`).style.display="",e.querySelector(`#stock-edit-${i}`).style.display="none",e.querySelector(`.btn-edit-stock[data-cat-id="${i}"]`).style.display=""})}),e.querySelectorAll(".btn-add-schedule-row").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.catId??"",r=e.querySelector(`#schedule-rows-${i}`);if(!r)return;const d=r.querySelectorAll(".schedule-edit-row").length,p=document.createElement("div");p.innerHTML=buildScheduleEditRowHTML(i,d,9,2,0,"");const m=p.firstElementChild;r.appendChild(m),m.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>m.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(a=>{a.addEventListener("click",()=>a.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.cat??"",r=a.dataset.catId??"",d=e.querySelector(`#stock-input-${r}`),p=e.querySelector(`#cost-input-${r}`),m=parseFloat(d?.value??""),h=parseFloat(p?.value??"0")||0;if(isNaN(m)||m<0){alert("有効な数値を入力してください");return}const f=[...e.querySelectorAll(`#schedule-rows-${r} .schedule-edit-row`)].map($=>({brewMonth:parseInt($.querySelector(".schedule-month")?.value??"0"),durationMonths:parseInt($.querySelector(".schedule-duration")?.value??"2"),plannedVolumeL:parseFloat($.querySelector(".schedule-volume")?.value??"0")})).filter($=>$.brewMonth>=1&&$.brewMonth<=12);a.textContent="保存中...",a.setAttribute("disabled","true");try{const{upsertBrewingStock:$,saveBrewingSchedule:g,fetchBrewingPlanSummary:w,fetchBrewingMonthlyTrend:_,fetchBrewingSchedule:L}=await x(async()=>{const{upsertBrewingStock:C,saveBrewingSchedule:M,fetchBrewingPlanSummary:k,fetchBrewingMonthlyTrend:I,fetchBrewingSchedule:j}=await Promise.resolve().then(()=>P);return{upsertBrewingStock:C,saveBrewingSchedule:M,fetchBrewingPlanSummary:k,fetchBrewingMonthlyTrend:I,fetchBrewingSchedule:j}},void 0),q=s.brewingPlanFY;await Promise.all([$(i,m,h),g(i,q,f)]);const[A,R,E]=await Promise.all([w(`${q}-10-01`,`${q+1}-09-30`),_(`${q}-10-01`,`${q+1}-09-30`),L(q)]);s.brewingPlanData=A,s.brewingMonthlyTrend=R,s.brewingSchedule=E,v()}catch($){console.error("[brewing save]",$),alert(`保存エラー: ${String($)}`),a.textContent="保存",a.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(a=>{a.addEventListener("click",()=>{const r=`sub-row-${(a.dataset.toggleCat??"").replace(/[^a-zA-Z0-9]/g,"_")}`,d=e.querySelectorAll(`.${r}`),p=a.querySelector(".toggle-icon"),m=d[0]?.style.display!=="none";d.forEach(h=>{h.style.display=m?"none":""}),p&&(p.innerHTML=m?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{S("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{S("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(a=>{a.addEventListener("click",()=>{S("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{S("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(a=>{a.addEventListener("click",async()=>{await ue("この買掛を入金済みにしますか？")&&S("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(a=>{a.addEventListener("click",()=>{S("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{S("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(a=>{a.addEventListener("click",()=>{const i=a.closest("tr")?.querySelector("td")?.textContent??"";S(`タンク ${i} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{S("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(a=>{a.addEventListener("click",()=>{const i=a.closest("tr")?.querySelector("td")?.textContent??"";S(`注文 ${i} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{S("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(a=>{a.addEventListener("click",()=>{S("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{S("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.customer??"";S(`得意先 ${i} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{S("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!a||!await ue("このリストを削除しますか？"))return;const{supabaseDelete:r}=await x(async()=>{const{supabaseDelete:p}=await Promise.resolve().then(()=>F);return{supabaseDelete:p}},void 0);if(await r("lead_lists",a)){const{fetchLeadLists:p}=await x(async()=>{const{fetchLeadLists:m}=await Promise.resolve().then(()=>P);return{fetchLeadLists:m}},void 0);s.leadLists=await p(),S("削除しました","success"),v()}else S("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{S("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.scYm;if(!i)return;s.shipmentCalendarYearMonth=i,s.shipmentCalendarData=null,s.shipmentCalendarSelectedDate=null,v();const{fetchShipmentCalendar:r}=await x(async()=>{const{fetchShipmentCalendar:d}=await Promise.resolve().then(()=>P);return{fetchShipmentCalendar:d}},void 0);s.shipmentCalendarData=await r(i),v()})}),e.querySelectorAll("[data-sc-date]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.scDate;i&&(s.shipmentCalendarSelectedDate=s.shipmentCalendarSelectedDate===i?null:i,v())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(a=>{a.addEventListener("click",async()=>{s.calendarYearMonth=a.dataset.ym??s.calendarYearMonth;const{fetchCalendarEvents:i}=await x(async()=>{const{fetchCalendarEvents:r}=await Promise.resolve().then(()=>P);return{fetchCalendarEvents:r}},void 0);s.calendarEvents=await i(s.calendarYearMonth),v()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async a=>{s.calendarYearMonth=a.target.value;const{fetchCalendarEvents:i}=await x(async()=>{const{fetchCalendarEvents:r}=await Promise.resolve().then(()=>P);return{fetchCalendarEvents:r}},void 0);s.calendarEvents=await i(s.calendarYearMonth),v()}),e.querySelector("#cal-filter-category")?.addEventListener("change",a=>{s.calendarFilterCategory=a.target.value,v()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const a=new Date;s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(a.getTime()+3600*1e3).toISOString(),isAllDay:!1}},v()}),e.querySelectorAll("[data-cal-date]").forEach(a=>{a.tagName!=="BUTTON"&&a.addEventListener("click",i=>{if(i.target.closest(".cal-event"))return;const r=a.dataset.calDate??"";s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${r}T10:00:00`,isAllDay:!1}},v()})}),e.querySelectorAll("[data-cal-event-id]").forEach(a=>{a.addEventListener("click",i=>{i.stopPropagation();const r=a.dataset.calEventId,d=s.calendarEvents.find(p=>p.id===r);d&&(s.calendarEdit={isOpen:!0,isNew:!1,event:{...d}},v())})}),e.querySelectorAll("[data-action='cal-close']").forEach(a=>{a.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(s.calendarEdit=null,v())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!s.calendarEdit)return;const{saveCalendarEvent:a,fetchCalendarEvents:i,CALENDAR_CATEGORY_COLORS:r}=await x(async()=>{const{saveCalendarEvent:f,fetchCalendarEvents:$,CALENDAR_CATEGORY_COLORS:g}=await Promise.resolve().then(()=>P);return{saveCalendarEvent:f,fetchCalendarEvents:$,CALENDAR_CATEGORY_COLORS:g}},void 0),d=document.querySelector("[data-action='cal-save']")?.dataset.id||s.calendarEdit.event.id||`evt_${Date.now()}`,p=e.querySelector("#cal-category")?.value??"general",m={id:d,title:e.querySelector("#cal-title")?.value??"",category:p,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:r[p]};if(!m.title){S("タイトルは必須です","warning");return}await a(m)?(s.calendarEvents=await i(s.calendarYearMonth),s.calendarEdit=null,S("保存しました"),v()):S("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!a||!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:i,fetchCalendarEvents:r}=await x(async()=>{const{deleteCalendarEvent:p,fetchCalendarEvents:m}=await Promise.resolve().then(()=>P);return{deleteCalendarEvent:p,fetchCalendarEvents:m}},void 0);await i(a)?(s.calendarEvents=await r(s.calendarYearMonth),s.calendarEdit=null,S("削除しました"),v()):S("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(s.importPreview){s.importing=!0,v();try{const a=s.importPreview.rows.filter(r=>r._valid),i=await ic(s.importEntity,a);s.importResult=`取り込み完了: ${i.inserted}件成功 / ${i.failed}件失敗`,s.importPreview=null}catch(a){s.importResult=`エラー: ${a instanceof Error?a.message:String(a)}`}finally{s.importing=!1,v()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const a=e.querySelector("#store-date")?.value??s.storeSalesDate;s.storeSalesDate=a,s.storeSales=[],s.actionLoading=!0,v(),_a(a).then(i=>{s.storeSales=i,s.actionLoading=!1,v()})}),e.querySelectorAll("[data-action='copy-config']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.configValue??"";if(i)try{await navigator.clipboard.writeText(i),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(r){console.warn("Clipboard copy failed",r)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const i=JSON.stringify({supabase_url:se,supabase_anon_key:G,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),r=new Blob([i],{type:"application/json;charset=utf-8"}),d=URL.createObjectURL(r),p=document.createElement("a");p.href=d,p.download="relay_config.json",p.click(),URL.revokeObjectURL(d)}),e.querySelectorAll("[data-action='copy-code']").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.code??"";if(i)try{await navigator.clipboard.writeText(decodeURIComponent(i)),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(r){console.warn("Clipboard code copy failed",r)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(a=>{a.addEventListener("change",()=>{Ce(e),s.emailSaveMessage=null,v()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(a=>{a.addEventListener("change",()=>{Ce(e),s.emailSaveMessage=null,v()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{Ce(e),s.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{Ce(e),s.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(a=>{a.addEventListener("click",()=>{s.emailTemplateId=a.dataset.templateId??"custom";const i=En(s.emailTemplateId);s.emailSubject=i.subject,s.emailBody=i.body,s.emailSaveMessage=null,v()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{Ce(e);const a=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;s.emailBody.includes("https://kaneishuzo.co.jp/products")||(s.emailBody=`${s.emailBody.trimEnd()}${a}`),s.emailSaveMessage=null,v()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{Ce(e),s.actionLoading=!0,v(),bt(Gt("draft")).then(a=>{s.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(a.updatedAt??new Date().toISOString()))}`,s.actionLoading=!1,v()})}),e.querySelector("#email-sender")?.addEventListener("change",a=>{s.emailSenderId=a.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{Ce(e),s.actionLoading=!0,s.emailSending=!0,v();const a=Gt("sent");s.mailSenders.find(i=>i.id===s.emailSenderId),Ks().then(async i=>{await bt({...a,recipientCount:i.sent}),s.emailSaveMessage=`${i.sent.toLocaleString("ja-JP")} 件送信しました。`,s.actionLoading=!1,s.emailSending=!1,v(),S(`${i.sent}件送信完了`)}).catch(async()=>{await bt(Gt("draft")),s.emailSaveMessage="APIキー未設定のため下書きを保存しました。",s.actionLoading=!1,s.emailSending=!1,v(),S("APIキー未設定のため下書き保存しました","warning")})})}function v(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=xd()}catch(n){console.error("[renderApp] render error:",n),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(n)}

${n?.stack??""}</div>`;return}Ad(e),s.pickerMode&&e.querySelector("#modal-search")?.focus(),s.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),Ia()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const n of["fd-scaler","print-scaler","q-preview-scaler"]){const o=e.querySelector(`#${n}`),l=o?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),c=l?.querySelector(".print-page")??l;if(!o||!c)continue;const u=o.parentElement?.clientWidth??0,a=c.offsetWidth;if(u>0&&a>0&&a>u-24){const i=(u-24)/a;o.style.transform=`scale(${i})`,o.style.transformOrigin="top left",o.style.height=`${(c.offsetHeight+48)*i}px`}else o.style.transform="",o.style.height=""}});const t=s.sidebarOpen||s.pickerMode!==null||s.globalSearchOpen;document.body.style.overflow=t?"hidden":"",document.body.style.touchAction=t?"none":""}const Mn="sake-cloud-cache",Cd=300*1e3;function Ed(){try{const e={ts:Date.now(),masterStats:s.masterStats,pipelineMeta:s.pipelineMeta};localStorage.setItem(Mn,JSON.stringify(e))}catch{}}function Ld(){try{const e=localStorage.getItem(Mn);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>Cd?!1:(t.masterStats&&(s.masterStats=t.masterStats),t.pipelineMeta&&(s.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let Rn=0;async function Be(){const e=Ld();e&&(s.loading=!1,v()),s.loading=!e,e||v();try{const[t,n,o,l,c,u,a,i]=await Promise.all([Ss(),ks(),ha(),Ps(),st(s.invoiceFilter),va(s.ledgerCustomerCode),fa(),As()]);if(s.salesSummary=t,s.paymentStatus=n,s.masterStats=o,s.pipelineMeta=l,s.invoiceRecords=c,s.customerLedger=u,s.salesAnalytics=a,s.syncDashboard=i,Ds().then(r=>{s.announcements=r,v()}),ze.length===0&&ld(),s.rawTableList.length===0&&nn().then(r=>{s.rawTableList=r,s.route==="/raw-browser"&&v()}),!s.salesFilter.startDate||!s.salesFilter.endDate){const d=[...t.salesRecords].sort((h,f)=>new Date(f.date).getTime()-new Date(h.date).getTime())[0]?.date??new Date().toISOString(),p=new Date(d),m=new Date(p);m.setDate(p.getDate()-30),s.salesFilter={startDate:hs(m.toISOString()),endDate:hs(p.toISOString())}}(!s.invoiceFilter.startDate||!s.invoiceFilter.endDate)&&(s.invoiceFilter={...s.invoiceFilter,startDate:s.salesFilter.startDate,endDate:s.salesFilter.endDate},s.invoiceRecords=await st(s.invoiceFilter)),s.error=null,Ed()}catch(t){e||(s.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{s.loading=!1,v(),qa(s.route),Rn=Date.now()}}window.addEventListener("popstate",()=>{s.route=Ln(location.pathname),s.currentCategory=Da(s.route),s.sidebarOpen=!1,ot(),qa(s.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),s.globalSearchOpen=!0,v();return}if(e.key==="Escape"){if(s.globalSearchOpen){ot(),v();return}if(s.pickerMode){kt(),v();return}s.route==="/invoice-entry"&&!s.invoiceSaving&&(Dn(),v());return}if(s.route==="/invoice-entry"&&!s.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&qn(t)}});s.user=At()?Jn():null;s.user?.email&&(async()=>{const{fetchMyProfile:e}=await x(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>P);return{fetchMyProfile:t}},void 0);s.myProfile=await e(s.user.email),v()})();try{const e=localStorage.getItem("sake_print_options");e&&(s.printOptions={...s.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(s.printCompany={...s.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(s.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,o=0,l=0,c=0,u=1;document.addEventListener("mousedown",a=>{const i=a.target.closest(".fd-draggable");if(!i||!s.fdDesignMode)return;a.preventDefault();const r=i.closest(".fd-canvas");if(!r)return;const d=r.getBoundingClientRect();if(d.width===0)return;u=228.6/d.width,t=i,n=a.clientX,o=a.clientY,l=parseFloat(i.style.left)||0,c=parseFloat(i.style.top)||0,document.querySelectorAll(".fd-active").forEach(f=>f.classList.remove("fd-active")),i.classList.add("fd-active","fd-dragging"),s.fdActiveFieldId=i.dataset.fdId??null;const p=document.querySelector("#fd-selected-info");p&&(p.textContent=`選択中: ${i.title}`);const m=document.querySelector("#fd-sel-x"),h=document.querySelector("#fd-sel-y");m&&(m.value=String(l)),h&&(h.value=String(c))}),document.addEventListener("mousemove",a=>{if(!t)return;const i=(a.clientX-n)*u,r=(a.clientY-o)*u,d=Math.round((l+i)*2)/2,p=Math.round((c+r)*2)/2;t.style.left=d+"mm",t.style.top=p+"mm";const m=document.querySelector("#fd-sel-x"),h=document.querySelector("#fd-sel-y");m&&(m.value=String(d)),h&&(h.value=String(p))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",a=>{if(!s.fdDesignMode||!s.fdActiveFieldId||a.key!=="ArrowLeft"&&a.key!=="ArrowRight"&&a.key!=="ArrowUp"&&a.key!=="ArrowDown"||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA")return;const i=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);if(!i)return;a.preventDefault();const r=.5;let d=parseFloat(i.style.left)||0,p=parseFloat(i.style.top)||0;a.key==="ArrowLeft"?d-=r:a.key==="ArrowRight"?d+=r:a.key==="ArrowUp"?p-=r:a.key==="ArrowDown"&&(p+=r),i.style.left=d+"mm",i.style.top=p+"mm";const m=document.querySelector("#fd-sel-x"),h=document.querySelector("#fd-sel-y");m&&(m.value=String(d)),h&&(h.value=String(p))})})();Be();const Dd=300*1e3;setInterval(()=>{!s.loading&&!document.hidden&&Be()},Dd);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-Rn>60*1e3&&Be()});let da="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{da=e}).catch(()=>{});setInterval(async()=>{if(!(!da||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==da&&!s.updateAvailable&&(s.updateAvailable=!0,v())}catch{}},120*1e3);
