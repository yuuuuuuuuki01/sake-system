(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const r of l)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(l){const r={};return l.integrity&&(r.integrity=l.integrity),l.referrerPolicy&&(r.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?r.credentials="include":l.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(l){if(l.ep)return;l.ep=!0;const r=s(l);fetch(l.href,r)}})();const jn="modulepreload",Fn=function(e){return"/"+e},Ma={},x=function(t,s,o){let l=Promise.resolve();if(s&&s.length>0){let y=function(n){return Promise.all(n.map(i=>Promise.resolve(i).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};var d=y;document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),u=p?.nonce||p?.getAttribute("nonce");l=y(s.map(n=>{if(n=Fn(n),n in Ma)return;Ma[n]=!0;const i=n.endsWith(".css"),c=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${c}`))return;const m=document.createElement("link");if(m.rel=i?"stylesheet":jn,i||(m.as="script"),m.crossOrigin="",m.href=n,u&&m.setAttribute("nonce",u),document.head.appendChild(m),i)return new Promise((h,g)=>{m.addEventListener("load",h),m.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${n}`)))})}))}function r(p){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=p,window.dispatchEvent(u),!u.defaultPrevented)throw p}return l.then(p=>{for(const u of p||[])u.status==="rejected"&&r(u.reason);return t().catch(r)})},ne="https://loarwnuyvfxiscjjsmiz.supabase.co",X="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";async function At(e,t){try{const s=new URL(`/rest/v1/${e}`,ne),o=await fetch(s.toString(),{method:"POST",headers:{apikey:X,Authorization:`Bearer ${X}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(s){return console.warn(`Failed to insert into Supabase table ${e}`,s),null}}async function $s(e,t){try{const s=new URL(`/rest/v1/${e}`,ne),o=await fetch(s.toString(),{method:"POST",headers:{apikey:X,Authorization:`Bearer ${X}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(s){return console.warn(`Failed to upsert into Supabase table ${e}`,s),null}}async function pa(e,t,s){try{const o=new URL(`/rest/v1/${e}?id=eq.${t}`,ne);return(await fetch(o.toString(),{method:"PATCH",headers:{apikey:X,Authorization:`Bearer ${X}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(s)})).ok}catch{return!1}}async function re(e,t={}){try{const s=new URL(`/rest/v1/rpc/${e}`,ne),o=await fetch(s.toString(),{method:"POST",headers:{apikey:X,Authorization:`Bearer ${X}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(s){return console.warn(`Failed to call Supabase RPC ${e}`,s),null}}async function ma(e){try{const t=new URL(`/rest/v1/${e}`,ne);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const s=await fetch(t.toString(),{method:"GET",headers:{apikey:X,Authorization:`Bearer ${X}`,Accept:"application/json",Prefer:"count=exact"}});if(!s.ok)return 0;const o=s.headers.get("Content-Range");if(o){const l=o.match(/\/(\d+)/);if(l)return parseInt(l[1],10)}return 0}catch{return 0}}async function q(e,t={}){try{const s=new URL(`/rest/v1/${e}`,ne);Object.entries(t).forEach(([l,r])=>{s.searchParams.set(l,r)});const o=await fetch(s.toString(),{method:"GET",headers:{apikey:X,Authorization:`Bearer ${X}`,Accept:"application/json",Prefer:"return=representation"}});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(s){return console.warn(`Failed to query Supabase table ${e}`,s),[]}}async function _s(e,t){try{const s=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,ne);return(await fetch(s.toString(),{method:"DELETE",headers:{apikey:X,Authorization:`Bearer ${X}`}})).ok}catch{return!1}}async function Z(e,t={},s=1e3){const o=[];let l=0;try{for(;;){const r=new URL(`/rest/v1/${e}`,ne);Object.entries(t).forEach(([u,y])=>{r.searchParams.set(u,y)}),r.searchParams.set("limit",String(s)),r.searchParams.set("offset",String(l));const d=await fetch(r.toString(),{method:"GET",headers:{apikey:X,Authorization:`Bearer ${X}`,Accept:"application/json",Prefer:"return=representation"}});if(!d.ok)throw new Error(`HTTP ${d.status}`);const p=await d.json();if(o.push(...p),p.length<s)break;l+=s}return o}catch(r){return console.warn(`Failed to query all rows from Supabase table ${e}`,r),o.length>0?o:[]}}const F=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:X,SUPABASE_URL:ne,supabaseCount:ma,supabaseDelete:_s,supabaseInsert:At,supabaseQuery:q,supabaseQueryAll:Z,supabaseRpc:re,supabaseUpdate:pa,supabaseUpsert:$s},Symbol.toStringTag,{value:"Module"})),ya="sake_auth";function ws(e){localStorage.setItem(ya,JSON.stringify(e))}function xs(){return{apikey:X,"Content-Type":"application/json"}}function zn(e){try{const[,t]=e.split(".");if(!t)return null;const s=t.replaceAll("-","+").replaceAll("_","/"),o=s.padEnd(Math.ceil(s.length/4)*4,"=");return JSON.parse(atob(o))}catch{return null}}async function Ss(e,t){const s=await fetch(`${ne}/auth/v1/${e}`,{method:"POST",headers:xs(),body:JSON.stringify(t)}),o=await s.json().catch(()=>({}));if(!s.ok)throw new Error(o.error_description??o.msg??`HTTP ${s.status}`);return o}async function Bn(e,t){const s=await Ss("token?grant_type=password",{email:e,password:t});return ws({access_token:s.access_token,refresh_token:s.refresh_token}),{email:s.user?.email??e}}async function Ra(e,t){const s=await Ss("signup",{email:e,password:t});return s.access_token&&s.refresh_token&&ws({access_token:s.access_token,refresh_token:s.refresh_token}),{email:s.user?.email??e}}async function Vn(){const e=Ct();if(localStorage.removeItem(ya),!!e?.access_token)try{await fetch(`${ne}/auth/v1/logout`,{method:"POST",headers:{...xs(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function Ct(){const e=localStorage.getItem(ya);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function Jn(){const e=Ct();if(!e)return null;const t=zn(e.access_token),s=typeof t?.email=="string"?t.email:null;return s?{email:s}:null}async function Yn(e){const t=Ct();if(!t)throw new Error("not signed in");const s=await fetch(`${ne}/auth/v1/user`,{method:"PUT",headers:{apikey:X,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!s.ok){const o=await s.json().catch(()=>({}));throw new Error(o.msg??`HTTP ${s.status}`)}}const ha={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},ks={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},Un={generatedAt:new Date().toISOString(),records:[]},Se={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},Qn={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},Hn={},Gn={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function B(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function Xn(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Kn(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function f(e,t,s=""){for(const o of t){const l=e[o];if(typeof l=="string"&&l.length>0)return l}return s}function w(e,t,s=0){for(const o of t)if(o in e)return B(e[o]);return s}function ee(e,t,s=!0){for(const o of t)if(o in e)return Kn(e[o]);return s}function W(e,t,s){for(const o of t){const l=e[o];if(typeof l!="string"||l.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(l))return new Date(`${l}T00:00:00Z`).toISOString();const r=new Date(l);if(!Number.isNaN(r.getTime()))return r.toISOString()}return s}function Wn(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:W(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:B(e.total_amount??e.billed_amount)}}function Oa(e){const t=e.trim().toUpperCase(),s=Hn[t];if(s)return s;const o=ks.salesRecords.find(l=>l.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:o?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function Ps(){const e=await Z("daily_sales_detail",{select:"sales_date,amount,document_count,bottles,volume_ml,price_per_bottle,price_per_liter",order:"sales_date.desc"});if(e.length>0){const[t,s]=await Promise.all([q("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),q("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),l=new Date().toISOString().slice(0,10),r=l.slice(0,7),d=[...e].sort((m,h)=>m.sales_date.localeCompare(h.sales_date)).map(m=>({date:new Date(`${m.sales_date}T00:00:00Z`).toISOString(),amount:B(m.amount??m.sales_amount),bottles:B(m.bottles),volumeMl:B(m.volume_ml),pricePerBottle:B(m.price_per_bottle),pricePerLiter:B(m.price_per_liter)})),p=d.slice(-30),u=m=>B(m.amount??m.sales_amount),y=e.reduce((m,h)=>h.sales_date===l?m+u(h):m,0),n=e.reduce((m,h)=>h.sales_date.startsWith(r)?m+u(h):m,0),i=t.filter(m=>B(m.balance_amount)>0),c=s.map((m,h)=>({id:String(m.id??`sale-${h+1}`),documentNo:m.document_no??m.legacy_document_no??"",date:m.sales_date??"",customerCode:m.legacy_customer_code??"",customerName:m.customer_name??m.legacy_customer_code??"",amount:B(m.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:y,todayDelta:0,monthSales:n,monthDelta:0,unpaidCount:i.length,unpaidAmount:i.reduce((m,h)=>m+B(h.balance_amount),0)},dailySales:p,allDailySales:d,salesRecords:c}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),ks}async function As(){const e=await Z("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,s)=>{const o=t.legacy_customer_code??`UNKNOWN-${s+1}`;return{id:`payment-${o}-${s+1}`,customerCode:o,customerName:o,billedAmount:B(t.billed_amount),paymentAmount:B(t.paid_amount),balanceAmount:B(t.balance_amount),lastPaymentDate:null,status:Xn(t.payment_status)}})}:Un}async function fa(){const[e,t]=await Promise.all([Z("customers"),Z("products")]);if(e.length>0||t.length>0){const s=e.length?e.map((l,r)=>{const d=typeof l.memo=="string"?JSON.parse(l.memo||"{}"):l.memo??{};return{id:f(l,["id","customer_id","code"],`customer-${r+1}`),code:f(l,["code","customer_code","legacy_customer_code"],`C${String(r+1).padStart(4,"0")}`),name:f(l,["name","customer_name","display_name"],`Customer ${r+1}`),kanaName:f(l,["kana_name"],""),shortName:f(l,["short_name"],""),postalCode:f(l,["postal_code"],""),address1:f(l,["address1"],""),address2:f(l,["address2"],""),phone:f(l,["phone"],""),fax:f(l,["fax"],""),email:f(l,["email"],""),staffCode:f(l,["staff_code"],""),businessType:f(l,["business_type"],""),areaCode:f(l,["delivery_area_code"],""),salesCategory:String(d.sales_category??""),closingDay:w(l,["closing_day","close_day"],31),paymentDay:w(l,["payment_day","due_day"],15),paymentMonth:Number(d.payment_month??0),paymentCycle:f(l,["payment_cycle"],""),billingCycleType:f(l,["billing_cycle_type"],""),billingCode:String(d.billing_code??""),creditLimit:w(l,["credit_limit"],0),taxMode:f(l,["tax_mode"],""),taxRound:String(d.tax_round??""),invoiceIssue:String(d.invoice_issue??""),invoiceType:f(l,["invoice_type"],""),priceGroup:String(d.price_group??""),priceType:String(d.price_type??""),customerGroup1:String(d.customer_group1??""),customerGroup2:String(d.customer_group2??""),bankName:f(l,["bank_name"],""),bankBranch:f(l,["bank_branch"],""),bankAccount:f(l,["bank_account"],""),isActive:ee(l,["is_active","active","enabled"],!0),lat:l.lat?Number(l.lat):void 0,lng:l.lng?Number(l.lng):void 0}}):Se.customers,o=t.length?t.map((l,r)=>({id:f(l,["id","product_id","product_code","legacy_product_code"],`product-${r+1}`),code:f(l,["product_code","legacy_product_code","code"],`P${String(r+1).padStart(5,"0")}`),janCode:f(l,["jan_code","jan","barcode"],""),name:f(l,["name","product_name","display_name"],`Product ${r+1}`),kanaName:f(l,["kana_name"],""),shortName:f(l,["short_name"],""),category:f(l,["category_code","category","category_name"],"未分類"),taxCategoryCode:f(l,["tax_code","tax_category_code"],""),isActive:ee(l,["is_active","active","enabled"],!0),listPrice:w(l,["list_price"],0),purchasePrice:w(l,["purchase_price"],0),salePrice:w(l,["default_sale_price","sale_price"],0),costPrice:w(l,["default_cost_price"],0),alcoholDegree:l.alcohol_degree!=null?Number(l.alcohol_degree):null,volumeMl:l.volume_ml!=null?Number(l.volume_ml):null,unit:f(l,["unit_name","unit"],"本"),caseQty:l.case_qty!=null?Number(l.case_qty):null,bottleType:f(l,["bottle_type"],""),containerCode:f(l,["container_code"],""),polishRate:l.polish_rate!=null?Number(l.polish_rate):null,riceType:f(l,["rice_type"],""),season:f(l,["season"],""),agingYears:w(l,["aging_years"],0)})):Se.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||Se.summary.customerCount,activeCustomerCount:e.length?s.filter(l=>l.isActive).length:Se.summary.activeCustomerCount,productCount:t.length||Se.summary.productCount,activeProductCount:t.length?o.filter(l=>l.isActive).length:Se.summary.activeProductCount},customers:s,products:o}}return Se}async function Cs(){const[e,t]=await Promise.all([q("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),q("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),s=t.length>0?W(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const o=e[0],l=f(o,["status"],"success"),r=o.errors,d=Array.isArray(r)?r.length>0:!!r;return{generatedAt:new Date().toISOString(),lastSyncAt:W(o,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:s,status:d?"warning":l==="error"?"error":"success",jobName:f(o,["agent_hostname"],"sake-relay"),message:`${w(o,["rows_upserted"],0)}行同期 / ${w(o,["files_updated"],0)}ファイル更新`}}return{...Qn,lastDataAt:s}}async function Es(){const e=await re("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function nt(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount,line_count",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const s=[];e.customerCode.trim()&&s.push(`customer_code.ilike.*${e.customerCode.trim()}*`,`legacy_customer_code.ilike.*${e.customerCode.trim()}*`),e.documentNo.trim()&&s.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),s.length>0&&(t.or=`(${s.join(",")})`);const o=await q("mv_invoice_with_line_count",t);return o.length>0?o.map((l,r)=>({id:f(l,["id"],`invoice-${r}`),documentNo:f(l,["document_no","legacy_document_no"],""),date:W(l,["sales_date"],""),customerCode:f(l,["legacy_customer_code","customer_code"],""),customerName:f(l,["customer_name","legacy_customer_code"],""),itemCount:w(l,["line_count"],0),amount:w(l,["total_amount","billed_amount"],0)})):[]}async function va(e){const t=e.trim().toUpperCase();if(!t)return Oa("");const[s,o,l]=await Promise.all([q("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),q("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),q("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(s.length>0||o.length>0){const r=s.map((u,y)=>{const n=Wn(u,y);return{id:n.id,date:n.date,documentNo:n.documentNo,amount:n.amount}}),d=o.map((u,y)=>({id:String(u.id??`payment-${y+1}`),date:W(u,["payment_date","received_date"],new Date().toISOString()),amount:B(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),p=l.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:s[0]?.customer_name??s[0]?.customer_code??s[0]?.legacy_customer_code??t,balanceAmount:B(p?.balance_amount),salesTotal:r.reduce((u,y)=>u+y.amount,0),paymentTotal:d.reduce((u,y)=>u+y.amount,0),salesHistory:r,paymentHistory:d}}return Oa(t)}async function ga(){const[e,t,s,o]=await Promise.all([q("mv_monthly_sales",{order:"month.asc"}),q("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),q("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),q("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(l=>({month:f(l,["month"],""),amount:w(l,["amount"],0),quantity:w(l,["quantity"],0),volumeMl:w(l,["volume_ml"],0)})),productTotals:s.map(l=>({code:f(l,["code"],""),name:f(l,["name"],""),amount:w(l,["amount"],0),quantity:w(l,["quantity"],0),documents:w(l,["documents"],0),volumeMl:w(l,["volume_ml"],0)})),customerTotals:t.map(l=>({code:f(l,["code"],""),name:f(l,["name"],""),amount:w(l,["amount"],0),quantity:w(l,["quantity"],0),documents:w(l,["documents"],0),volumeMl:w(l,["volume_ml"],0)})),staffTotals:o.map(l=>({code:f(l,["code"],""),name:f(l,["name"],""),amount:w(l,["amount"],0),quantity:w(l,["quantity"],0),documents:w(l,["documents"],0),volumeMl:0}))}:Gn}async function Zn(e,t,s){if(t==="all")return[];const o=s?Ls(t,s):null,r=await re(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:o?.from??null,p_date_to:o?.to??null});return r?r.map(d=>({code:f(d,["code"],""),name:f(d,["name"],""),amount:w(d,["amount"],0),quantity:w(d,["quantity"],0),documents:w(d,["documents"],0),volumeMl:w(d,["volume_ml"],0)})):[]}async function eo(e,t){if(t==="all")return[];const s=await re("get_available_periods",{p_type:t});return!s||s.length===0?[]:s.map(o=>o.period_val).filter(Boolean)}function Ls(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[s,o]=t.split("-").map(Number),l=`${s}-${String(o).padStart(2,"0")}-01`,r=new Date(s,o,0).getDate(),d=`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`;return{from:l,to:d}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const s=t.match(/^(\d{4})-W(\d{2})$/);if(!s)return null;const o=parseInt(s[1]),l=parseInt(s[2]),r=new Date(o,0,4),d=r.getDay()||7,p=new Date(r);p.setDate(r.getDate()-d+1);const u=new Date(p);u.setDate(p.getDate()+(l-1)*7);const y=new Date(u);return y.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:y.toISOString().slice(0,10)}}return null}function Ds(e){return e.map(t=>({staffCode:f(t,["staff_code"],""),staffName:f(t,["staff_name"],""),code:f(t,["code"],""),name:f(t,["name"],""),tag:f(t,["tag"],""),amount:w(t,["amount"],0),quantity:w(t,["quantity"],0),documents:w(t,["documents"],0)}))}async function to(e,t){const s=await re("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return s?s.map(o=>({code:f(o,["code"],""),name:f(o,["name"],""),amount:w(o,["amount"],0),quantity:w(o,["quantity"],0),documents:w(o,["documents"],0)})):[]}async function ao(e,t,s){const o=await re("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:s??null});return o?Ds(o):[]}async function so(e,t,s){const o=await re("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:s??null});return o?Ds(o):[]}async function no(e,t){if(e==="all"||!t)return[];const s=await re("get_period_chart_data",{p_period:e,p_filter:t});return s?s.map(o=>({month:f(o,["label"],""),amount:w(o,["amount"],0),quantity:w(o,["quantity"],0),volumeMl:w(o,["volume_ml"],0)})):[]}function oo(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function io(e,t,s){const o=await re("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:s??null});return o?o.map(l=>({code:f(l,["code"],""),name:f(l,["name"],""),tag:f(l,["tag"],""),amount:w(l,["amount"],0),quantity:w(l,["quantity"],0),documents:w(l,["documents"],0),volumeMl:w(l,["volume_ml"],0)})):[]}async function lo(e,t,s){const o=await re("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:s??null});return o?o.map(l=>({code:f(l,["code"],""),name:f(l,["name"],""),tag:f(l,["tag"],""),amount:w(l,["amount"],0),quantity:w(l,["quantity"],0),documents:w(l,["documents"],0),volumeMl:w(l,["volume_ml"],0)})):[]}async function ro(e,t){const s=await re("get_entity_monthly_sales",{p_code:e,p_type:t});return s?s.map(o=>({month:f(o,["month"],""),amount:w(o,["amount"],0),quantity:w(o,["quantity"],0),volumeMl:w(o,["volume_ml"],0)})):[]}async function co(e,t){const s=await re("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return s?s.map(o=>({brewCategory:f(o,["brew_category"],""),subCategory:f(o,["sub_category"],""),productCount:w(o,["product_count"],0),totalShipmentQty:w(o,["total_shipment_qty"],0),totalShipmentMl:w(o,["total_shipment_ml"],0),monthlyAvgQty:w(o,["monthly_avg_qty"],0),monthlyAvgMl:w(o,["monthly_avg_ml"],0),currentStockL:w(o,["current_stock_l"],0),monthsRemaining:w(o,["months_remaining"],0),costPerL:w(o,["cost_per_l"],0)})):[]}async function uo(e,t){const s=await re("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return s?s.map(o=>({month:f(o,["month"],""),brewCategory:f(o,["brew_category"],""),shipmentMl:w(o,["shipment_ml"],0)})):[]}async function po(e){return(await q("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(s=>({id:f(s,["id"],""),brewCategory:f(s,["brew_category"],""),fy:w(s,["fy"],e),brewMonth:w(s,["brew_month"],0),durationMonths:w(s,["duration_months"],2),plannedVolumeL:w(s,["planned_volume_l"],0),notes:f(s,["notes"],"")}))}async function mo(e,t,s){return await re("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:s.map(l=>({brew_month:l.brewMonth,duration_months:l.durationMonths,planned_volume_l:l.plannedVolumeL,notes:l.notes??null}))})!==null}async function yo(e,t,s,o){return await $s("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:s,notes:o??null,updated_at:new Date().toISOString()})!==null}const Xt={sales:"売上",return:"返品",export_return:"輸出戻入"};async function qs(e){const t=e.lines.reduce((l,r)=>l+r.amount,0),s=`D${Date.now().toString().slice(-6)}`;return{id:(await At("sales_document_headers",{legacy_document_no:s,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${s}`,documentNo:s,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const ja={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function ba(e){const t=await q("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const s=t[0],o=B(s.total_amount);return{documentNo:e,invoiceDate:f(s,["sales_date","document_date"],""),customerCode:f(s,["legacy_customer_code","customer_code"],""),customerName:f(s,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:o,taxAmount:Math.floor(o*10/110),note:""}}return{...ja,documentNo:e||ja.documentNo}}const ho={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function $a(e){const t=await q("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const s=t.map(l=>{const r=w(l,["sales_amount"],0),d=w(l,["tax_amount"],0);return{customerCode:f(l,["customer_code"],""),customerName:f(l,["customer_name"],""),closingDay:31,salesAmount:r,taxAmount:d,prevBalance:0,paymentAmount:0,billingAmount:r,status:"open"}}),o=s.reduce((l,r)=>l+r.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:o,customers:s}}return{...ho,targetYearMonth:e}}const fo={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function Et(){const[e,t,s]=await Promise.all([q("mv_monthly_sales",{order:"month.asc"}),q("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),q("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return fo;const o=e.slice(-12).map(u=>f(u,["month"],"")),l=new Map;t.forEach(u=>{const y=f(u,["code"],"");l.has(y)||l.set(y,{name:f(u,["name"],y),monthValues:new Map}),l.get(y).monthValues.set(f(u,["month"],""),w(u,["amount"],0))});const d=Array.from(l.entries()).map(([u,y])=>({code:u,name:y.name,total:o.reduce((n,i)=>n+(y.monthValues.get(i)??0),0),monthValues:y.monthValues})).sort((u,y)=>y.total-u.total).slice(0,10).map(u=>({label:u.name,values:o.map(y=>u.monthValues.get(y)??0)})),p=s.map(u=>({label:f(u,["name"],""),values:o.map(()=>Math.round(w(u,["amount"],0)/o.length))}));return{generatedAt:new Date().toISOString(),months:o,salesByProduct:d,salesByCustomer:p,costSimulation:[]}}async function vo(){const e=await Z("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(s=>{const o=f(s,["code"],"");if(!o)return;const l=f(s,["month"],""),r=parseInt(l.slice(5,7))-1;if(r<0||r>11)return;let d=t.get(o);d||(d={name:f(s,["name"],o),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(o,d)),d.qty[r]+=w(s,["quantity"],0),d.amt[r]+=w(s,["amount"],0)}),Array.from(t.entries()).map(([s,o])=>({code:s,name:o.name,monthlyQuantity:o.qty,monthlyAmount:o.amt,totalQuantity:o.qty.reduce((l,r)=>l+r,0),totalAmount:o.amt.reduce((l,r)=>l+r,0)})).filter(s=>s.totalQuantity>0).sort((s,o)=>o.totalAmount-s.totalAmount)}async function go(){return(await q("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:f(t,["product_code"],""),productName:f(t,["product_name"],""),forecastMonth:f(t,["forecast_month"],""),segment:f(t,["segment"],"monthly"),avgMonthly:w(t,["avg_monthly"],0),forecastQuantity:w(t,["forecast_quantity"],0),forecastAmount:w(t,["forecast_amount"],0),safetyStock:w(t,["safety_stock"],0),calculatedAt:W(t,["calculated_at"],"")}))}async function bo(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),s=await Z("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(s.length===0)return[];s.map(d=>String(d.id)).filter(Boolean);const o=await Z("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),l=new Map;s.forEach(d=>{d.id&&l.set(String(d.id),d)});const r=[];return o.forEach(d=>{const p=String(d.header_id??d.document_header_id??""),u=l.get(p);if(!u)return;const y=u.sales_date??u.document_date??"";!y||y<t||r.push({date:y.slice(0,10),customerName:u.customer_name??"不明",productName:d.product_name??"不明",quantity:B(d.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),r.sort((d,p)=>d.date.localeCompare(p.date))}async function Is(){const e=new Date().toISOString();return(await q("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(s=>({id:f(s,["id"],""),message:f(s,["message"],""),level:f(s,["level"],"info"),startsAt:W(s,["starts_at"],""),endsAt:s.ends_at?W(s,["ends_at"],""):null,dismissible:ee(s,["dismissible"],!0)}))}async function $o(){const e=await Z("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:f(t,["customer_code"],""),customer_name:f(t,["customer_name"],""),business_type:f(t,["business_type"],""),area_code:f(t,["area_code"],""),phone:f(t,["phone"],""),last_order_date:f(t,["last_order_date"],""),days_since_order:w(t,["days_since_order"],0),amount_12m:w(t,["amount_12m"],0),amount_3m:w(t,["amount_3m"],0),amount_this_month:w(t,["amount_this_month"],0),amount_last_year_same_month:w(t,["amount_last_year_same_month"],0),annual_revenue:w(t,["annual_revenue"],0),is_dormant:ee(t,["is_dormant"],!1),is_at_risk:ee(t,["is_at_risk"],!1)})):[]}async function _o(){return(await Z("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:f(t,["customer_code"],""),customer_name:f(t,["customer_name"],""),phone:f(t,["phone"],""),address:f(t,["address"],""),area_code:f(t,["area_code"],""),business_type:f(t,["business_type"],""),priority_score:w(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:f(t,["last_order_date"],""),days_since_order:w(t,["days_since_order"],0),annual_revenue:w(t,["annual_revenue"],0),recommended_action:f(t,["recommended_action"],"")}))}async function wo(){return(await Z("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:f(t,["product_code"],""),product_name:f(t,["product_name"],""),season_type:f(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:w(t,["avg_monthly_qty"],0)}))}async function xo(){return(await Z("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:f(t,["product_code"],""),name:f(t,["product_name"],""),monthlyQuantity:[w(t,["m01"],0),w(t,["m02"],0),w(t,["m03"],0),w(t,["m04"],0),w(t,["m05"],0),w(t,["m06"],0),w(t,["m07"],0),w(t,["m08"],0),w(t,["m09"],0),w(t,["m10"],0),w(t,["m11"],0),w(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:w(t,["total_quantity"],0),totalAmount:w(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Ts(e,t,s){try{return await At("feature_requests",{title:e,category:t,description:s}),!0}catch{return!1}}async function Ns(e,t){return pa("customers",e,t)}async function Ms(e,t){return pa("products",e,t)}async function Kt(e,t){const s=e.find(d=>d.code===t);s?.priceGroup;const o=s?.priceGroup||t;let l="";try{const d=await q("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});d[0]?.memo&&(l=(typeof d[0].memo=="string"?JSON.parse(d[0].memo):d[0].memo)?.price_type??"")}catch{}const r=new Map;if(o){const d=await q("customer_product_prices",{price_group:`eq.${o}`,select:"legacy_product_code,special_price"});for(const p of d)r.set(p.legacy_product_code,p.special_price)}return{priceType:l,priceGroup:o,individualPrices:r}}function _a(e,t){const s=t.individualPrices.get(e.code);if(s!=null&&s>0)return{price:s,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"標準価格"}}async function Rs(){return(await q("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function So(){return(await Z("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Os(){return(await q("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function js(){const[e,t]=await Promise.all([q("mv_customer_abc",{order:"amount.desc"}),Et()]),s=e.map(o=>({code:f(o,["code"],""),name:f(o,["name"],""),amount:w(o,["amount"],0),documents:w(o,["documents"],0),ratio:w(o,["ratio"],0),cumRatio:w(o,["cum_ratio"],0),abcRank:f(o,["abc_rank"],"C")}));return{generatedAt:new Date().toISOString(),ranking:s,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function ko(){const[e,t]=await Promise.all([q("mv_product_abc",{order:"amount.desc"}),Et()]),s=e.map(d=>({code:f(d,["code"],""),name:f(d,["name"],""),amount:w(d,["amount"],0),quantity:w(d,["quantity"],0),ratio:w(d,["ratio"],0),cumRatio:w(d,["cum_ratio"],0),abcRank:f(d,["abc_rank"],"C")})),o=s.reduce((d,p)=>d+p.amount,0),l=new Set(s.filter(d=>d.abcRank==="A").map(d=>d.name)),r=t.salesByProduct.filter(d=>l.has(d.label));return{generatedAt:new Date().toISOString(),totalAmount:o,ranking:s,months:t.months,monthlyByProduct:r.length>0?r:t.salesByProduct}}const Fs={planned:"計画中",active:"仕込中",done:"完了"};async function zs(){const e=await q("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),jikomiNo:f(t,["batch_no","legacy_batch_no"],""),productName:f(t,["brand_name"],""),riceType:f(t,["rice_type"],""),plannedKg:w(t,["planned_rice_kg"],0),actualKg:w(t,["actual_rice_kg"],0),startDate:W(t,["start_date"],""),expectedDoneDate:W(t,["expected_done_date"],""),status:f(t,["status"],"planned"),tankNo:f(t,["tank_no"],""),note:f(t,["remarks"],"")})):[]}async function Bs(){const e=await q("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),tankNo:f(t,["tank_no"],""),capacity:w(t,["capacity_l"],0),currentVolume:w(t,["current_volume_l"],0),productName:f(t,["current_product_code"],""),jikomiNo:f(t,["current_batch_id"],""),status:f(t,["status"],"empty"),lastUpdated:W(t,["last_updated_at"],"")})):[]}async function Vs(){const e=await q("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),kenteiNo:f(t,["kentei_no"],""),jikomiNo:f(t,["batch_id"],""),productName:f(t,["product_code"],""),kenteiDate:W(t,["kentei_date"],""),alcoholDegree:w(t,["alcohol_degree"],0),extractDegree:w(t,["extract_degree"],0),sakaMeterValue:w(t,["sakemeter_value"],0),volume:w(t,["volume_l"],0),taxCategory:f(t,["tax_category_code"],""),status:f(t,["status"],"pending")})):[]}async function Wt(){const e=await q("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),code:f(t,["material_code","legacy_material_code"],""),name:f(t,["name"],""),unit:f(t,["unit"],""),currentStock:w(t,["current_stock"],0),minimumStock:w(t,["minimum_stock"],0),unitCost:w(t,["unit_cost"],0),lastUpdated:W(t,["updated_at"],"")})):[]}async function Js(){const e=await q("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),documentNo:f(t,["document_no","legacy_document_no"],""),purchaseDate:W(t,["purchase_date"],""),supplierCode:f(t,["supplier_code","legacy_supplier_code"],""),supplierName:f(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:w(t,["total_amount"],0),status:f(t,["payment_status"],"pending")})):[]}async function Ys(){const e=await q("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:f(t,["supplier_code","legacy_supplier_code"],""),supplierName:f(t,["legacy_supplier_code"],""),totalPurchase:w(t,["total_purchase"],0),paidAmount:w(t,["paid_amount"],0),balance:w(t,["balance"],0),nextPaymentDate:W(t,["next_payment_date"],""),status:f(t,["status"],"unpaid")})):[]}async function Us(){const e=await q("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),billNo:f(t,["bill_no"],""),supplierName:f(t,["counterparty_name"],""),amount:w(t,["amount"],0),issueDate:W(t,["issue_date"],""),dueDate:W(t,["due_date"],""),status:f(t,["status"],"holding")})):[]}async function Qs(){const e=await q("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:f(t,["material_code","legacy_material_code"],""),name:f(t,["name"],""),unit:f(t,["unit"],""),currentStock:w(t,["current_stock"],0),minimumStock:w(t,["minimum_stock"],0),lastPurchaseDate:W(t,["last_purchase_date"],""),unitCost:w(t,["unit_cost"],0)})):[]}const Hs=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],Zt={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Po={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function wa(e,t){const s=await q("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(s.length>0){const o=s[0],l=f(o,["id"],""),[r,d]=await Promise.all([q("tax_declaration_rows",{declaration_id:`eq.${l}`,order:"tax_category_code.asc"}),q("tax_deductions",{declaration_id:`eq.${l}`})]),p=r.map(y=>({taxCategory:f(y,["tax_category_code"],""),taxCategoryName:f(y,["tax_category_name"],""),alcoholDegree:w(y,["alcohol_degree"],0),volume:w(y,["taxable_volume"],0),taxRate:w(y,["tax_rate"],0),taxAmount:w(y,["tax_amount"],0),productionVolume:w(y,["production_volume"],0),previousBalance:w(y,["previous_balance"],0),currentAdjustment:w(y,["current_adjustment"],0),exportDeduction:w(y,["export_deduction"],0),sampleDeduction:w(y,["sample_deduction"],0),taxableVolume:w(y,["taxable_volume"],0)})),u=d.map(y=>({type:f(y,["deduction_type"],"sample"),categoryCode:f(y,["tax_category_code"],""),volume:w(y,["volume"],0),reason:f(y,["reason"],""),documentNo:f(y,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:f(o,["company_name"],""),companyNo:f(o,["company_no"],""),companyAddress:f(o,["company_address"],""),companyRepresentative:f(o,["company_representative"],""),taxOffice:f(o,["tax_office"],""),rows:p,deductions:u,totalVolume:w(o,["total_taxable_volume"],0),totalTax:w(o,["total_tax_amount"],0),status:f(o,["status"],"draft"),submittedAt:f(o,["submitted_at"],"")||null}}return{...Po,targetYear:e,targetMonth:t}}function me(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Gs(e){const t=e.rows.map(o=>`    <Category>
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
`),s=e.deductions.map(o=>`    <Deduction type="${me(o.type)}">
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
${s}
  </Deductions>
  <Total>
    <TotalVolume>${e.totalVolume}</TotalVolume>
    <TotalTax>${e.totalTax}</TotalTax>
  </Total>
</TaxDeclaration>
`}function Ao(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function Co(e){const s=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),o=e.rows.map(r=>[r.taxCategory,r.taxCategoryName,r.alcoholDegree,r.productionVolume,r.previousBalance,r.currentAdjustment,r.exportDeduction,r.sampleDeduction,r.taxableVolume,r.taxRate,r.taxAmount].map(Ao).join(",")),l=`,合計,,${e.rows.reduce((r,d)=>r+d.productionVolume,0)},,,${e.rows.reduce((r,d)=>r+d.exportDeduction,0)},${e.rows.reduce((r,d)=>r+d.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[s,...o,l].join(`
`)+`
`}function Eo(e){const t=e.rows.map(l=>{const r=Math.max(0,l.productionVolume+l.previousBalance+l.currentAdjustment-l.exportDeduction-l.sampleDeduction),d=Math.round(r*l.taxRate);return{...l,taxableVolume:r,volume:r,taxAmount:d}}),s=t.reduce((l,r)=>l+r.taxableVolume,0),o=t.reduce((l,r)=>l+r.taxAmount,0);return{...e,rows:t,totalVolume:s,totalTax:o}}async function Lo(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>F);return{supabaseInsert:s}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:Gs(e),submitted_at:e.submittedAt})}async function xa(e){const t=await q("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(s=>({id:f(s,["id"],""),saleDate:f(s,["sale_date"],e),saleTime:f(s,["sale_time"],""),productCode:f(s,["product_code"],""),productName:f(s,["product_name"],""),quantity:w(s,["quantity"],0),unitPrice:w(s,["unit_price"],0),amount:w(s,["amount"],0),paymentMethod:f(s,["payment_method"],"cash")})):[]}async function Xs(){const e=await q("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:f(t,["id"],""),orderNo:f(t,["order_no"],""),orderDate:W(t,["order_date"],""),customerName:f(t,["customer_name"],""),postalCode:f(t,["postal_code"],""),address:f(t,["shipping_address"],""),items:[],totalAmount:w(t,["total_amount"],0),status:f(t,["status"],"new"),shippingDate:W(t,["shipping_date"],"")})):[]}async function $t(e){const t=await At("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Ks(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Do(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await q("print_layouts",t)).map(o=>({id:f(o,["id"],""),name:f(o,["name"],""),templateKey:f(o,["template_key"],""),positions:o.positions??{},isDefault:ee(o,["is_default"],!1),note:f(o,["note"],""),updatedAt:f(o,["updated_at"],"")}))}async function qo(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>F);return{supabaseInsert:l}},void 0),s={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},o=await t("print_layouts",s);return o?{id:f(o,["id"],e.id),name:f(o,["name"],e.name),templateKey:f(o,["template_key"],e.templateKey),positions:o.positions??e.positions,isDefault:ee(o,["is_default"],!1),note:f(o,["note"],""),updatedAt:f(o,["updated_at"],"")}:null}async function Io(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const s="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok}catch{return!1}}async function To(){return(await q("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),email:f(t,["email"],""),displayName:f(t,["display_name"],""),signature:f(t,["signature"],""),replyTo:f(t,["reply_to"],""),isDefault:ee(t,["is_default"],!1),isVerified:ee(t,["is_verified"],!1),note:f(t,["note"],"")}))}async function No(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0),s=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return s?{id:f(s,["id"],e.id),name:f(s,["name"],e.name),email:f(s,["email"],e.email),displayName:f(s,["display_name"],""),signature:f(s,["signature"],""),replyTo:f(s,["reply_to"],""),isDefault:ee(s,["is_default"],!1),isVerified:ee(s,["is_verified"],!1)}:null}async function Mo(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const s=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const Sa={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},ka={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function Ro(e){const t=`${e}-01T00:00:00Z`,[s,o]=e.split("-").map(p=>parseInt(p,10)),l=new Date(s,o,0).getDate(),r=`${e}-${String(l).padStart(2,"0")}T23:59:59Z`;return(await q("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${r})`,order:"starts_at.asc"})).map(p=>({id:f(p,["id"],""),title:f(p,["title"],""),description:f(p,["description"],""),category:f(p,["category"],"general")||"general",startsAt:f(p,["starts_at"],new Date().toISOString()),endsAt:f(p,["ends_at"],""),isAllDay:ee(p,["is_all_day"],!1),location:f(p,["location"],""),attendees:p.attendees??[],relatedCustomerCode:f(p,["related_customer_code"],""),relatedOrderId:f(p,["related_order_id"],""),color:f(p,["color"],""),googleEventId:f(p,["google_event_id"],"")}))}async function Oo(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??ka[e.category],updated_at:new Date().toISOString()})?e:null}async function jo(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const s=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Ws(){return(await q("integration_settings",{order:"name.asc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),provider:f(t,["provider"],""),config:t.config??{},isEnabled:ee(t,["is_enabled"],!1),lastSyncAt:f(t,["last_sync_at"],""),lastStatus:f(t,["last_status"],"")}))}async function lt(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function Fo(e){const t=e.config.shop_domain,s=e.config.admin_token;if(!t||!s)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const o=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,l=await fetch(o,{headers:{"X-Shopify-Access-Token":s,"Content-Type":"application/json"}});if(!l.ok)return{count:0,error:`HTTP ${l.status}`};const r=await l.json(),{supabaseInsert:d}=await x(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>F);return{supabaseInsert:u}},void 0);let p=0;for(const u of r.orders){const y=`shopify_${u.id}`;await d("shopify_orders",{id:y,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),p++}return await lt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得成功`}),{count:p}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function zo(){return(await q("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:f(t,["id"],""),shopifyOrderId:f(t,["shopify_order_id"],""),orderNumber:f(t,["order_number"],""),orderDate:f(t,["order_date"],""),customerName:f(t,["customer_name"],""),customerEmail:f(t,["customer_email"],""),totalAmount:B(t.total_amount),financialStatus:f(t,["financial_status"],""),fulfillmentStatus:f(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function Bo(e){const t=e.config.refresh_token,s=e.config.client_id,o=e.config.client_secret;if(!t||!s||!o)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const l=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:s,client_secret:o})});if(!l.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${l.status}`};const d=(await l.json()).access_token;return await lt({...e,config:{...e.config,oauth_token:d}}),e.config.oauth_token=d,{token:d}}async function Vo(e){let t=e.config.oauth_token;const s=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const o=new Date().toISOString(),l=new Date(Date.now()+30*86400*1e3).toISOString(),r=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(s)}/events?timeMin=${o}&timeMax=${l}&singleEvents=true&orderBy=startTime`;let d=await fetch(r,{headers:{Authorization:`Bearer ${t}`}});if(d.status===401){const n=await Bo(e);if(n.error)return{count:0,error:n.error};t=n.token,d=await fetch(r,{headers:{Authorization:`Bearer ${t}`}})}if(!d.ok)return{count:0,error:`HTTP ${d.status}`};const p=await d.json(),{supabaseInsert:u}=await x(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>F);return{supabaseInsert:n}},void 0);let y=0;for(const n of p.items){const i=`gcal_${n.id}`,c=n.start?.dateTime??n.start?.date??"",m=n.end?.dateTime??n.end?.date??"";await u("calendar_events",{id:i,title:String(n.summary??"(無題)"),description:String(n.description??""),category:"general",starts_at:String(c),ends_at:String(m),location:String(n.location??""),google_event_id:String(n.id??""),updated_at:new Date().toISOString()}),y++}return await lt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${y}件取得`}),{count:y}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function Jo(){return(await q("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:f(t,["id"],""),receivedAt:f(t,["received_at"],""),senderPhone:f(t,["sender_phone"],""),senderName:f(t,["sender_name"],""),imageUrl:f(t,["image_url"],""),ocrStatus:f(t,["ocr_status"],"pending")||"pending",ocrText:f(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:f(t,["linked_invoice_id"],"")}))}async function Yo(e,t){const s=e.config.api_key;if(!s)return{text:"",error:"Cloud Vision API key 未設定"};try{const o=`https://vision.googleapis.com/v1/images:annotate?key=${s}`,l=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return l.ok?{text:(await l.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${l.status}`}}catch(o){return{text:"",error:o instanceof Error?o.message:String(o)}}}async function Uo(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const xt={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},St={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function Qo(){return(await q("user_profiles",{order:"display_name.asc"})).map(t=>({id:f(t,["id"],""),email:f(t,["email"],""),displayName:f(t,["display_name"],""),staffCode:f(t,["staff_code"],""),department:f(t,["department"],"all")||"all",role:f(t,["role"],"staff")||"staff",defaultMailSenderId:f(t,["default_mail_sender_id"],""),phone:f(t,["phone"],""),avatarUrl:f(t,["avatar_url"],""),isActive:ee(t,["is_active"],!0),lastSignInAt:f(t,["last_sign_in_at"],""),createdAt:f(t,["created_at"],"")}))}async function Ho(e){if(!e)return null;const t=await q("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const s=t[0];return{id:f(s,["id"],""),email:f(s,["email"],""),displayName:f(s,["display_name"],""),staffCode:f(s,["staff_code"],""),department:f(s,["department"],"all")||"all",role:f(s,["role"],"staff")||"staff",defaultMailSenderId:f(s,["default_mail_sender_id"],""),phone:f(s,["phone"],""),avatarUrl:f(s,["avatar_url"],""),isActive:ee(s,["is_active"],!0),lastSignInAt:f(s,["last_sign_in_at"],"")}}async function Go(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function Xo(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const s=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Ko(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>F);return{supabaseInsert:s}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function Wo(e=100){return(await q("audit_logs",{order:"created_at.desc",limit:String(e)})).map(s=>({id:f(s,["id"],""),action:f(s,["action"],""),entityType:f(s,["entity_type"],""),entityId:f(s,["entity_id"],""),userEmail:f(s,["user_email"],""),changes:s.changes??{},createdAt:f(s,["created_at"],"")}))}const kt={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function Zs(){return(await q("slack_notifications",{order:"event_type.asc"})).map(t=>({id:f(t,["id"],""),eventType:f(t,["event_type"],"new_order"),enabled:ee(t,["enabled"],!0),channel:f(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:f(t,["last_triggered_at"],"")}))}async function Zo(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function ei(e=50){return(await q("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(s=>({id:f(s,["id"],""),eventType:f(s,["event_type"],""),channel:f(s,["channel"],""),message:f(s,["message"],""),status:f(s,["status"],"sent"),error:f(s,["error"],""),sentAt:f(s,["sent_at"],"")}))}async function ti(e,t,s){const l=(await Ws()).find(y=>y.provider==="slack");if(!l||!l.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const r=l.config.webhook_url;if(!r)return{ok:!1,error:"Webhook URL未設定"};const p=(await Zs()).find(y=>y.eventType===e&&y.enabled);if(!p)return{ok:!1,error:"通知ルールが無効"};const u=s??p.channel??l.config.default_channel??"#general";try{const y=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${kt[e]} ${t}`,channel:u})}),n=y.ok,{supabaseInsert:i}=await x(async()=>{const{supabaseInsert:c}=await Promise.resolve().then(()=>F);return{supabaseInsert:c}},void 0);return await i("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:n?"sent":"failed",error:n?null:`HTTP ${y.status}`}),n?{ok:!0}:{ok:!1,error:`HTTP ${y.status}`}}catch(y){return{ok:!1,error:y instanceof Error?y.message:String(y)}}}const Lt={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},Pa={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function ai(){return(await q("prospects",{order:"updated_at.desc"})).map(t=>({id:f(t,["id"],""),companyName:f(t,["company_name"],""),contactName:f(t,["contact_name"],""),email:f(t,["email"],""),phone:f(t,["phone"],""),address:f(t,["address"],""),website:f(t,["website"],""),businessType:f(t,["business_type"],""),stage:f(t,["stage"],"cold"),source:f(t,["source"],""),expectedAmount:B(t.expected_amount),probability:B(t.probability),assignedStaffCode:f(t,["assigned_staff_code"],""),nextActionDate:f(t,["next_action_date"],""),nextAction:f(t,["next_action"],""),note:f(t,["note"],""),lastContactAt:f(t,["last_contact_at"],""),wonAt:f(t,["won_at"],""),lostAt:f(t,["lost_at"],""),lostReason:f(t,["lost_reason"],""),convertedCustomerCode:f(t,["converted_customer_code"],""),createdAt:f(t,["created_at"],"")}))}async function en(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()})?e:null}async function si(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const s=new URL("/rest/v1/prospects","https://loarwnuyvfxiscjjsmiz.supabase.co");return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ni(e){return(await q("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(s=>({id:f(s,["id"],""),prospectId:f(s,["prospect_id"],""),activityType:f(s,["activity_type"],"call"),title:f(s,["title"],""),description:f(s,["description"],""),activityDate:f(s,["activity_date"],""),result:f(s,["result"],""),staffCode:f(s,["staff_code"],"")}))}async function oi(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const tn=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function ii(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function li(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const s=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ri(){return(await Z("v_customer_map")).filter(t=>t.lat&&t.lng).map(t=>({customerCode:f(t,["customer_code"],""),name:f(t,["name"],""),phone:f(t,["phone"],""),areaCode:f(t,["area_code"],""),businessType:f(t,["business_type"],""),businessTypeName:f(t,["business_type_name"],""),address1:f(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:ee(t,["is_at_risk"],!1),isDormant:ee(t,["is_dormant"],!1),amount12m:w(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}const Dt=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function ci(){return(await Z("customer_churn_notes")).map(t=>({customerCode:f(t,["customer_code"],""),reason:f(t,["reason"],""),memo:f(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:f(t,["updated_at"],"")}))}async function di(e){const{supabaseUpsert:t}=await x(async()=>{const{supabaseUpsert:s}=await Promise.resolve().then(()=>F);return{supabaseUpsert:s}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function ui(){return(await q("delivery_locations",{order:"name.asc"})).map(t=>({id:f(t,["id"],""),customerCode:f(t,["customer_code"],""),name:f(t,["name"],""),postalCode:f(t,["postal_code"],""),address:f(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:f(t,["contact_name"],""),phone:f(t,["phone"],""),deliveryNote:f(t,["delivery_note"],""),isActive:ee(t,["is_active"],!0)}))}async function pi(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function mi(e=50){return(await q("call_logs",{order:"started_at.desc",limit:String(e)})).map(s=>({id:f(s,["id"],""),callDirection:f(s,["call_direction"],"inbound"),fromNumber:f(s,["from_number"],""),toNumber:f(s,["to_number"],""),matchedCustomerCode:f(s,["matched_customer_code"],""),matchedProspectId:f(s,["matched_prospect_id"],""),durationSeconds:B(s.duration_seconds),callStatus:f(s,["call_status"],"answered"),recordingUrl:f(s,["recording_url"],""),transcript:f(s,["transcript"],""),ivryCallId:f(s,["ivry_call_id"],""),startedAt:f(s,["started_at"],""),endedAt:f(s,["ended_at"],""),notes:f(s,["notes"],"")}))}async function an(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function yi(e){const t=e.config.api_key,s=e.config.team_id;if(!t||!s)return{count:0,error:"IVRy API key または team_id 未設定"};try{const o=`https://api.ivry.jp/v1/teams/${s}/calls?limit=100`,l=await fetch(o,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!l.ok)return{count:0,error:`HTTP ${l.status}`};const d=(await l.json()).calls??[];let p=0;for(const u of d)await an({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),p++;return await lt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得`}),{count:p}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function hi(e,t){const s=e.config.api_key,o=e.config.team_id;if(!s||!o)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let l=0;for(const r of t){if(!r.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${o}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({name:r.name,phone_number:r.phone,external_id:r.customerCode??"",note:r.note??""})})).ok&&l++}return{synced:l}}catch(l){return{synced:0,error:l instanceof Error?l.message:String(l)}}}async function fi(){return(await q("lead_lists",{order:"created_at.desc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),query:f(t,["query"],""),area:f(t,["area"],""),businessType:f(t,["business_type"],""),totalCount:B(t.total_count),source:f(t,["source"],"manual"),createdAt:f(t,["created_at"],"")}))}async function vi(e){return(await q("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(s=>({id:f(s,["id"],""),listId:f(s,["list_id"],""),companyName:f(s,["company_name"],""),address:f(s,["address"],""),phone:f(s,["phone"],""),website:f(s,["website"],""),email:f(s,["email"],""),businessType:f(s,["business_type"],""),rating:s.rating?Number(s.rating):void 0,reviewCount:B(s.review_count),lat:s.lat?Number(s.lat):void 0,lng:s.lng?Number(s.lng):void 0,placeId:f(s,["place_id"],""),status:f(s,["status"],"new"),convertedProspectId:f(s,["converted_prospect_id"],""),note:f(s,["note"],"")}))}async function gi(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function sn(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function bi(e,t,s){const o=e.config.api_key;if(!o)return{results:[],error:"Google Maps API key 未設定"};const l=`${t} ${s}`.trim(),r=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(l)}&language=ja&key=${o}`;try{const d=await fetch(r);if(!d.ok)return{results:[],error:`HTTP ${d.status}`};const p=await d.json();return p.status!=="OK"&&p.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${p.status}`}:{results:p.results.map(y=>{const n=y.geometry?.location;return{id:`place_${y.place_id}`,listId:"",companyName:String(y.name??""),address:String(y.formatted_address??""),rating:y.rating?Number(y.rating):void 0,reviewCount:y.user_ratings_total?Number(y.user_ratings_total):void 0,lat:n?.lat,lng:n?.lng,placeId:String(y.place_id??""),status:"new"}})}}catch(d){return{results:[],error:d instanceof Error?d.message:String(d)}}}async function $i(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},s=await en(t);return s&&await sn({...e,status:"imported",convertedProspectId:t.id}),s}async function _i(){return(await q("workflow_orders",{order:"order_date.desc"})).map(t=>({id:f(t,["id"],""),orderNo:f(t,["order_no"],""),customerName:f(t,["customer_name"],""),customerCode:f(t,["customer_code"],""),orderDate:f(t,["order_date"],""),deliveryDate:f(t,["delivery_date"],""),stage:f(t,["stage"],"new"),totalAmount:B(t.total_amount),itemCount:B(t.item_count),priority:f(t,["priority"],"normal"),staffName:f(t,["staff_name"],""),notes:f(t,["notes"],"")}))}async function wi(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function xi(){return(await q("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),email:f(t,["email"],""),phone:f(t,["phone"],""),visitDate:f(t,["visit_date"],""),partySize:B(t.party_size)||1,language:f(t,["language"],"ja"),purpose:f(t,["purpose"],""),message:f(t,["message"],""),status:f(t,["status"],"new"),repliedAt:f(t,["replied_at"],""),confirmedTime:f(t,["confirmed_time"],""),createdAt:f(t,["created_at"],new Date().toISOString())}))}async function Si(e){const{supabaseInsert:t}=await x(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>F);return{supabaseInsert:o}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const ki=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function nn(){return(await Promise.all(ki.map(async t=>{const[s,o]=await Promise.all([ma(t.table),q(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:s,lastSyncAt:o[0]?._synced_at??null}}))).sort((t,s)=>s.rowCount-t.rowCount)}async function _t(e,t,s=100){const o=(t-1)*s,[l,r]=await Promise.all([q(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(s),offset:String(o)}),ma(e)]);return{records:l,total:r}}async function ea(e){const t=await q("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const s=t[0].memo;if(typeof s=="string"&&s)try{const o=JSON.parse(s);return String(o.price_group??"")}catch{return""}return""}async function on(e,t){if(e){const o=await q("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(o.length>0&&o[0].special_price)return B(o[0].special_price)}const s=await q("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return s.length>0&&s[0].default_sale_price?B(s[0].default_sale_price):0}const Pi=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],Ai=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],Ci={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function Ei(){const e=new Date,t=[];for(let u=11;u>=0;u--){const y=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`)}const s=Pi,o={},l={};for(const u of s){o[u.code]={};for(const y of t){const n=parseInt(y.split("-")[1])-1,i=Ci[u.code]??100,c=Math.round(i*Ai[n]*(.85+Math.random()*.3));o[u.code][y]=c,l[y]=(l[y]??0)+c}}const r={},d={},p={};for(const u of s){const y=t.map(c=>o[u.code][c]??0),n=y.reduce((c,m)=>c+m,0)/y.length,i=y.reduce((c,m)=>c+(m-n)**2,0)/y.length;r[u.code]=y.reduce((c,m)=>c+m,0),d[u.code]=n,p[u.code]=Math.sqrt(i)}return{months:t,products:s,matrix:o,totals:l,productTotals:r,productAvg:d,productStdDev:p}}async function Li(e=36){const t=(()=>{const c=new Date;return c.setMonth(c.getMonth()-e),`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`})(),s=await Z("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"});if(s.length===0)return Ei();const o=new Set,l=new Map,r={},d={};for(const c of s){const m=f(c,["year_month"],""),h=f(c,["product_code"],""),g=f(c,["product_name"],h),v=w(c,["quantity"],0);!m||!h||(o.add(m),l.set(h,g),r[h]||(r[h]={}),r[h][m]=v,d[m]=(d[m]??0)+v)}const p=[...o].sort(),u=[...l.entries()].map(([c,m])=>({code:c,name:m})),y={},n={},i={};for(const c of u){const m=p.map(v=>r[c.code]?.[v]??0),h=m.reduce((v,_)=>v+_,0)/(m.length||1),g=m.reduce((v,_)=>v+(_-h)**2,0)/(m.length||1);y[c.code]=m.reduce((v,_)=>v+_,0),n[c.code]=h,i[c.code]=Math.sqrt(g)}return{months:p,products:u,matrix:r,totals:d,productTotals:y,productAvg:n,productStdDev:i}}async function Di(){return(await q("product_safety_stock_params",{order:"product_code.asc"})).map(t=>({productCode:f(t,["product_code"],""),productName:f(t,["product_name"],""),unit:f(t,["unit"],"本"),avgMonthlyDemand:w(t,["avg_monthly_demand"],0),demandStdDev:w(t,["demand_std_dev"],0),leadTimeDays:w(t,["lead_time_days"],30),serviceLevel:w(t,["service_level"],.95),safetyStockQty:w(t,["safety_stock_qty"],0),reorderPoint:w(t,["reorder_point"],0),memo:f(t,["memo"],""),productionType:f(t,["production_type"],"monthly")}))}async function qi(e){return(await q("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(s=>({id:f(s,["id"],""),yearMonth:f(s,["year_month"],e),productCode:f(s,["product_code"],""),productName:f(s,["product_name"],""),demandForecast:w(s,["demand_forecast"],0),safetyStockTarget:w(s,["safety_stock_target"],0),openingStock:w(s,["opening_stock"],0),requiredProduction:w(s,["required_production"],0),plannedQty:w(s,["planned_qty"],0),actualQty:w(s,["actual_qty"],0),status:f(s,["status"],"draft"),productionType:f(s,["production_type"],"monthly"),notes:f(s,["notes"],"")}))}async function Ii(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:s}=await x(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>F);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:l}},void 0);if(!s||e.length===0)return!1;try{const o=e.map(d=>({product_code:d.productCode,product_name:d.productName,unit:d.unit,avg_monthly_demand:d.avgMonthlyDemand,demand_std_dev:d.demandStdDev,lead_time_days:d.leadTimeDays,service_level:d.serviceLevel,safety_stock_qty:d.safetyStockQty,reorder_point:d.reorderPoint,production_type:d.productionType,memo:d.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),l=new URL("/rest/v1/product_safety_stock_params",t),r=await fetch(l.toString(),{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(o)});if(!r.ok){const d=await r.text();return console.error("saveSafetyStockParamsBulk failed:",r.status,d),!1}return!0}catch(o){return console.error("saveSafetyStockParamsBulk error:",o),!1}}async function Ti(e){const{supabaseUpsert:t}=await x(async()=>{const{supabaseUpsert:o}=await Promise.resolve().then(()=>F);return{supabaseUpsert:o}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function Ni(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),s=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return s?s[1]:t.substring(0,6)}async function Mi(e){const[t,s]=e.split("-").map(Number),o=`${e}-01`,l=new Date(t,s,0).getDate(),r=`${e}-${String(l).padStart(2,"0")}`,d=await Z("sales_document_headers",{select:"sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${o},sales_date.lte.${r})`,order:"sales_date.asc"}),p=await Z("customers",{select:"id,address1",address1:"not.is.null"}),u={};for(const n of p)n.address1&&(u[n.id]=Ni(n.address1));const y={};for(const n of d){const i=n.sales_date;if(!i)continue;const c=u[n.legacy_customer_code]||"住所未登録",m=Number(n.total_amount)||0;y[i]||(y[i]={date:i,entries:[],cityGroups:[],totalAmount:0,count:0}),y[i].entries.push({customerCode:n.legacy_customer_code||"",customerName:n.customer_name||"",city:c,amount:m}),y[i].totalAmount+=m,y[i].count++}for(const n of Object.values(y)){const i={};for(const c of n.entries)i[c.city]=(i[c.city]||0)+1;n.cityGroups=Object.entries(i).sort((c,m)=>m[1]-c[1]).map(([c,m])=>({city:c,count:m}))}return y}async function Aa(){return q("quotes",{select:"id,quote_no,quote_date,valid_until,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function ln(e){const t=await q("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const s=await q("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:s}}async function Ri(){const e=new Date().toISOString().slice(0,7)+"-01";return Z("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}const C=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:ka,CALENDAR_CATEGORY_LABELS:Sa,CHURN_REASONS:Dt,DEPT_LABELS:St,INVOICE_TYPE_LABELS:Xt,JIKOMI_STATUS_LABELS:Fs,MATERIAL_CATEGORIES:tn,PROSPECT_STAGE_COLORS:Pa,PROSPECT_STAGE_LABELS:Lt,ROLE_LABELS:xt,SEASONAL_TEMPLATES:ha,SLACK_EVENT_LABELS:kt,TAX_DEDUCTION_LABELS:Zt,TAX_RATE_CATEGORIES:Hs,convertLeadToProspect:$i,deleteCalendarEvent:jo,deleteMailSender:Mo,deleteMaterial:li,deletePrintLayout:Io,deleteProspect:si,deleteUserProfile:Xo,fetchAnalyticsByPeriod:Zn,fetchAnnouncements:Is,fetchAuditLogs:Wo,fetchAvailablePeriods:eo,fetchBillList:Us,fetchBillingSummary:$a,fetchBrewingMonthlyTrend:uo,fetchBrewingPlanSummary:co,fetchBrewingSchedule:po,fetchCalendarEvents:Ro,fetchCallLogs:mi,fetchChurnAlerts:$o,fetchChurnNotes:ci,fetchCustomerAnalysis:js,fetchCustomerEfficiency:Os,fetchCustomerLedger:va,fetchCustomerPriceGroup:ea,fetchCustomerPricing:Kt,fetchCustomerProductBreakdown:io,fetchDeliveryLocations:ui,fetchDeliveryNote:ba,fetchDeliverySchedule:bo,fetchDemandAnalysis:Li,fetchDemandForecasts:go,fetchEntityMonthlySales:ro,fetchFaxInbox:Jo,fetchIntegrationSettings:Ws,fetchInvoices:nt,fetchJikomiList:zs,fetchKenteiList:Vs,fetchLeadItems:vi,fetchLeadLists:fi,fetchMailSenders:To,fetchMapCustomers:ri,fetchMasterStats:fa,fetchMaterialList:Wt,fetchMyProfile:Ho,fetchOrderHeaders:Ri,fetchPayableList:Ys,fetchPaymentStatus:As,fetchPeriodChartData:no,fetchPipelineMeta:Cs,fetchPrintLayouts:Do,fetchProductABC:ko,fetchProductCustomerBreakdown:lo,fetchProductDaily:So,fetchProductMonthlyShipments:vo,fetchProductPower:Rs,fetchProductPrice:on,fetchProductShipmentsFromTable:xo,fetchProductionPlan:qi,fetchProspectActivities:ni,fetchProspects:ai,fetchPurchaseList:Js,fetchQuoteList:Aa,fetchQuoteWithLines:ln,fetchRawMaterialStock:Qs,fetchRawRecords:_t,fetchRawTableList:nn,fetchSafetyStockParams:Di,fetchSalesAnalytics:ga,fetchSalesReport:Et,fetchSalesSummary:Ps,fetchSeasonalProfiles:wo,fetchShipmentCalendar:Mi,fetchShopifyOrders:zo,fetchSlackLogs:ei,fetchSlackRules:Zs,fetchStaffCustomerBreakdown:ao,fetchStaffProductBreakdown:so,fetchStaffTotalsByPeriod:to,fetchStoreOrders:Xs,fetchStoreSales:xa,fetchSyncDashboard:Es,fetchTankList:Bs,fetchTaxDeclaration:wa,fetchTourInquiriesFromDb:xi,fetchUserProfiles:Qo,fetchVisitPriorities:_o,fetchWorkflowOrdersFromDb:_i,generateTaxCSV:Co,generateTaxXML:Gs,ocrFaxImage:Yo,periodToDateRange:Ls,prevYearFilter:oo,recalculateTaxDeclaration:Eo,recordAudit:Ko,resolveProductPrice:_a,saveBrewingSchedule:mo,saveCalendarEvent:Oo,saveCallLog:an,saveChurnNote:di,saveDeliveryLocation:pi,saveEmailCampaign:$t,saveFaxRecord:Uo,saveIntegrationSetting:lt,saveInvoice:qs,saveLeadItem:sn,saveLeadList:gi,saveMailSender:No,saveMaterial:ii,savePrintLayout:qo,saveProductionPlan:Ti,saveProspect:en,saveProspectActivity:oi,saveSafetyStockParamsBulk:Ii,saveSlackRule:Zo,saveTaxDeclaration:Lo,saveTourInquiry:Si,saveUserProfile:Go,saveWorkflowOrder:wi,searchPlaces:bi,sendEmailCampaign:Ks,sendSlackNotification:ti,submitFeatureRequest:Ts,syncGoogleCalendar:Vo,syncIvryCallLogs:yi,syncPhoneBookToIvry:hi,syncShopifyOrders:Fo,updateCustomer:Ns,updateProduct:Ms,upsertBrewingStock:yo},Symbol.toStringTag,{value:"Module"}));function Te(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Oi={open:"未締め",closed:"締め済"};function ji(e,t){const s=e.customers.map(o=>`
      <tr>
        <td>
          <div class="table-title">${o.customerName}</div>
          <div class="table-sub mono">${o.customerCode}</div>
        </td>
        <td class="numeric">${o.closingDay}日</td>
        <td class="numeric">${Te(o.salesAmount)}</td>
        <td class="numeric">${Te(o.taxAmount)}</td>
        <td class="numeric">${Te(o.prevBalance)}</td>
        <td class="numeric">${Te(o.paymentAmount)}</td>
        <td class="numeric"><strong>${Te(o.billingAmount)}</strong></td>
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
        <p class="kpi-value">${Te(e.totalBilling)}</p>
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
          <tbody>${s}</tbody>
        </table>
      </div>
    </section>
  `}const Fi={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},zi={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function Fa(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ct(e){const t=zi[e],s=Fi[e].map(o=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Fa(o.title)}</p>
            <p class="category-card-description">${Fa(o.description)}</p>
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
      ${s}
    </section>
  `}function rn(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function tt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Bi(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${rn(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${tt(t.amount)}</td>
        </tr>
      `).join("")}function Vi(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${rn(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${tt(t.amount)}</td>
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
  `}function Qe(e,t,s){const o=e.findIndex(r=>r.column===t);if(o>=0){if(e[o].direction==="asc"){const d=[...e];return d[o]={column:t,direction:"desc"},d}return e.filter((d,p)=>p!==o)}const l={column:t,direction:"asc"};return s?[...e,l]:[l]}function Yi(e,t){const s=e.findIndex(r=>r.column===t);if(s<0)return'<span class="sort-icon">⇅</span>';const o=e[s].direction==="asc"?"↑":"↓",l=e.length>1?`<small class="sort-badge">${s+1}</small>`:"";return`<span class="sort-icon active">${o}${l}</span>`}function O(e,t,s,o=""){return`<th class="sortable ${o}" data-sort-col="${e}">${t} ${Yi(s,e)}</th>`}function za(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),s=Number(t);return Number.isFinite(s)?s:t.toLowerCase()}function Je(e,t,s){return t.length===0?e:[...e].sort((o,l)=>{for(const{column:r,direction:d}of t){const p=s[r];if(!p)continue;const u=za(o[p]),y=za(l[p]);let n=0;if(typeof u=="number"&&typeof y=="number"?n=u-y:n=String(u).localeCompare(String(y),"ja"),n!==0)return d==="asc"?n:-n}return 0})}const Ui={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},Ba={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},He={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function Qi(e){const t=new Date().toISOString().slice(0,10);return e.map(s=>({date:s.date,customerName:s.customerName,productName:s.productName,quantity:s.quantity,status:s.date>t?"scheduled":"delivered"}))}function Hi(e){const[t,s]=e.split("-").map(Number);return new Date(t,s,0).getDate()}function Gi(e){const[t,s]=e.split("-").map(Number);return new Date(t,s-1,1).getDay()}function cn(e,t){const s=Hi(t),o=Gi(t),[l,r]=t.split("-").map(Number),d=new Map;e.forEach(L=>{if(L.date.slice(0,7)===t){const D=L.date.slice(0,10);d.has(D)||d.set(D,[]),d.get(D).push(L)}});const p=e.filter(L=>L.date.slice(0,7)===t),u=p.reduce((L,D)=>L+D.quantity,0),y=new Set(p.map(L=>L.date)).size,n=new Date().toISOString().slice(0,10),i=["日","月","火","水","木","金","土"].map(L=>`<th class="dcal-header">${L}</th>`).join("");let c="",m=1;for(let L=0;L<6&&!(m>s&&L>0);L++){c+="<tr>";for(let D=0;D<7;D++)if(L===0&&D<o||m>s)c+='<td class="dcal-cell dcal-empty"></td>';else{const N=`${l}-${String(r).padStart(2,"0")}-${String(m).padStart(2,"0")}`,E=d.get(N)||[],P=N===n,R=E.reduce((A,I)=>A+I.quantity,0);c+=`
          <td class="dcal-cell ${P?"dcal-today":""}">
            <div class="dcal-day">${m}</div>
            ${E.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${E[0].status}">${E.length}件 ${R}本</div>
              </div>
            `:""}
          </td>`,m++}c+="</tr>"}const[h,g]=r===1?[l-1,12]:[l,r-1],[v,_]=r===12?[l+1,1]:[l,r+1],$=`${h}-${String(g).padStart(2,"0")}`,S=`${v}-${String(_).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${l}年${r}月: ${y}日稼働 / ${p.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${$}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${l}年${r}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${S}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${i}</tr></thead>
        <tbody>${c}</tbody>
      </table>
    </section>
  `}function Xi(e,t){const s=t==="all"?e:e.filter(p=>p.segment===t),o={all:e.length};e.forEach(p=>{o[p.segment]=(o[p.segment]??0)+1});const r=["all",...[...new Set(e.map(p=>p.segment))]].map(p=>`
      <button class="button ${t===p?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${p}">
        ${p==="all"?"全て":Ba[p]??p} (${o[p]??0})
      </button>
    `).join(""),d=s.map(p=>`
      <tr>
        <td class="mono">${p.code}</td>
        <td>${p.name}</td>
        <td><span class="segment-badge" style="background:${He[p.segment]??"#718096"};">${Ba[p.segment]??p.segment}</span></td>
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
          <tbody>${d}</tbody>
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
  `}function Wi(e,t){return cn(e,t)}const dt={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function Va(e,t){const s=new Date(e);return s.setFullYear(s.getFullYear()+t),s.toISOString()}function Nt(e,t,s){if(t==="all")return e;const o=new Date,l=o.toISOString().slice(0,10),r=new Date(o);switch(t){case"today":return e.filter(d=>d.date.slice(0,10)===l);case"month":return e.filter(d=>d.date.slice(0,7)===l.slice(0,7));case"future":{const d=new Date(o.getFullYear(),o.getMonth(),1).toISOString().slice(0,10);return e.filter(p=>p.date.slice(0,10)>=d)}case"90days":return r.setDate(r.getDate()-90),e.filter(d=>d.date>=r.toISOString());case"year":return r.setFullYear(r.getFullYear()-1),e.filter(d=>d.date>=r.toISOString());case"custom":return!s?.start||!s?.end?e:e.filter(d=>{const p=d.date.slice(0,10);return p>=s.start&&p<=s.end})}}function ie(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Mt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Zi(e){const o={top:20,right:20,bottom:30,left:50},l=760-o.left-o.right,r=260-o.top-o.bottom,d=Math.max(...e.map(n=>n.amount),1),p=l/e.length,u=e.map((n,i)=>{const c=n.amount/d*r,m=o.left+i*p+4,h=o.top+r-c,g=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(n.date));return`
        <g>
          <rect x="${m}" y="${h}" width="${Math.max(p-8,8)}" height="${c}" rx="4" fill="#0F5B8D" opacity="${.58+i/e.length*.34}" />
          ${i%5===0?`<text x="${m+6}" y="252" class="chart-axis">${g}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(n=>{const i=o.top+r-r*n,c=Math.round(d*n/1e3);return`
        <g>
          <line x1="${o.left}" y1="${i}" x2="${760-o.right}" y2="${i}" class="chart-grid" />
          <text x="6" y="${i+4}" class="chart-axis">${c.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function el(e,t,s,o,l="month",r,d=[]){const p={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=Nt(e.allDailySales,l,r),y=u.reduce((T,G)=>T+G.amount,0),n=u.reduce((T,G)=>T+G.bottles,0),i=u.reduce((T,G)=>T+G.volumeMl,0),c=u.length,m=n>0?Math.round(y/n):0,h=i>0?Math.round(y/(i/1e3)):0,g=new Date,v=g.toISOString().slice(0,10),_=v.slice(0,7),$=Nt(e.allDailySales,"month").filter(T=>T.date.slice(0,10)<=v),S=$.reduce((T,G)=>T+G.amount,0);$.reduce((T,G)=>T+G.bottles,0);const L=g.getDate();new Date(g.getFullYear(),g.getMonth()+1,0).getDate();const N=(o?.orderHeaders??[]).filter(T=>T.sales_date.slice(0,7)===_),E=N.reduce((T,G)=>T+Number(G.total_amount),0),P=N.length,R=Nt(e.allDailySales,"month"),A=R.reduce((T,G)=>T+G.bottles,0),I=E>0?E:R.reduce((T,G)=>T+G.amount,0),j=E>0?"orders":"extrapolation",H=(u.length>0?e.allDailySales.filter(T=>{const G=u[0]?.date??"",Ue=u[u.length-1]?.date??"",De=Va(G,-1),qe=Va(Ue,-1);return T.date>=De&&T.date<=qe}):[]).reduce((T,G)=>T+G.amount,0),ae=H>0?(y-H)/H*100:0,ce=ae>0?"+":"",ge=e.salesRecords.slice(0,10).map(T=>`
            <tr>
              <td class="mono">${T.documentNo}</td>
              <td>${Mt(T.date)}</td>
              <td>${T.customerName}</td>
              <td class="numeric">${ie(T.amount)}</td>
            </tr>
          `).join(""),de=["today","month","future","90days","year","all"].map(T=>`<button class="button ${T===l?"primary":"secondary"} small" type="button" data-period="${T}">${dt[T]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${p[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${Mt(t.lastSyncAt)}</span>
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
        <p class="kpi-value">${ie(S)}</p>
        <p class="kpi-sub">${L}日経過 / ${$.length}営業日 / 日平均 ${$.length>0?ie(Math.round(S/$.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${ie(I)}</p>
        <p class="kpi-sub">${j==="orders"?`受注確定 ${P}件`:`出荷見込 ${A.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${ae>=0?"#2f855a":"#c53d3d"}">${H>0?`${ce}${ae.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${H>0?ie(H):"データなし"}</p>
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
        <p class="panel-title">${dt[l]}売上</p>
        <p class="kpi-value">${ie(y)}</p>
        <p class="kpi-sub">${c}日間${c>0?` / 日平均 ${ie(Math.round(y/c))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${n.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${ie(m)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(i/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${ie(h)}</p>
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
            <p class="panel-caption">${dt[l]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${Zi(u.length>0?u:e.dailySales)}
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
              <dd>${Mt(t.lastSyncAt)}</dd>
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
          <p class="panel-caption">${dt[l]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${O("date","日付",d)}
              ${O("amount","売上",d,"numeric")}
              ${O("bottles","本数",d,"numeric")}
              ${O("volumeMl","液体量(L)",d,"numeric")}
              ${O("pricePerBottle","本単価",d,"numeric")}
              ${O("pricePerLiter","L単価",d,"numeric")}
            </tr>
          </thead>
          <tbody>${Je(d.length>0?u:u.slice().reverse(),d,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(T=>`
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
  `}function tl(e){const t=new Date().toISOString().slice(0,10),s=e.upcomingEvents.filter(p=>p.startsAt.slice(0,10)>=t).slice(0,5),o=e.tourInquiries.filter(p=>p.status==="new").length,l=e.churnSummary,r=l?l.atRiskCount+l.dormantCount+l.decliningCount:null,d=l?`<article class="panel kpi-card ${l.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
        <p class="panel-title">🔴 要対応顧客</p>
        <p class="kpi-value">${r}社</p>
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
      ${d}
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
        ${s.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${s.map(p=>{const u=new Date(p.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${p.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${u.getMonth()+1}/${u.getDate()} ${p.isAllDay?"終日":u.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${p.title}</div>
                  ${p.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${p.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>

    ${e.deliveries&&e.deliveries.length>0?Wi(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?al(e.orderHeaders):""}
  `}function al(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),o=new Date().toISOString().slice(0,10),l=o.slice(0,7),r=new Map;for(const i of e){const c=i.sales_date.slice(0,7),m=r.get(c)??{count:0,total:0};r.set(c,{count:m.count+1,total:m.total+Number(i.total_amount)})}const d=[...r.keys()].sort(),p=e.reduce((i,c)=>i+Number(c.total_amount),0),u=d.map(i=>{const{count:c,total:m}=r.get(i);return`<tr>
      <td class="mono" style="font-weight:700;">${i===l?`${i}（当月）`:i}</td>
      <td class="numeric">${c.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(m)}</td>
    </tr>`}).join(""),y=e.filter(i=>i.sales_date>=o).slice(0,30),n=y.map(i=>`<tr>
    <td class="mono">${i.sales_date}</td>
    <td>${i.customer_name||"―"}</td>
    <td class="numeric">${t.format(Number(i.total_amount))}</td>
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
          <tbody>${n}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function sl(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function Ne(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function nl(e,t){const s=e.lines.length?e.lines.map((l,r)=>`
          <tr>
            <td class="numeric">${r+1}</td>
            <td class="mono">${l.productCode}</td>
            <td>${l.productName}</td>
            <td class="numeric">${l.quantity.toLocaleString("ja-JP")}</td>
            <td>${l.unit}</td>
            <td class="numeric">${Ne(l.unitPrice)}</td>
            <td class="numeric">${Ne(l.amount)}</td>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${Ne(o)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${Ne(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${Ne(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function he(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ol(e){return he(e).replaceAll(`
`,"<br />")}function il(e){const s=[...Object.values(ha),{id:"custom",season:"カスタム",subject:"",body:""}].map(l=>`
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
  `}function ye(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ut(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function ll(e,t){const s=[ut("得意先",t.customers.map(l=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${ye(l.name)}</strong>
            <span class="table-sub mono">${ye(l.code)}</span>
          </button>
        `)),ut("商品",t.products.map(l=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${ye(l.name)}</strong>
            <span class="table-sub mono">${ye(l.code)}</span>
          </button>
        `)),ut("伝票",t.documents.map(l=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${ye(l.documentNo)}</strong>
            <span class="table-sub">${ye(l.customerName)} / ${ye(l.date)}</span>
          </button>
        `)),ut("ページ",t.pages.map(l=>`
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
            ${s||o}
          </div>
        </div>
      </div>
    </div>
  `}function Ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function dn(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${Ge(e.emptyMessage??"該当データがありません。")}</p>`;return`
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
  `}function pt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ja(e){return e.trim().toLowerCase()}function rl(e,t){const s=Ja(t),o=e.filter(r=>s?[r.code,r.name,r.name].map(Ja).some(d=>d.includes(s)):!0).slice(0,50),l=o.length?`
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
              ${o.map(r=>`
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
      `:"";return dn({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:l,emptyMessage:"該当する得意先が見つかりません。"})}function cl(e){return e.toISOString().slice(0,10)}function Le(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ke(e,t){return e[t]?`<div class="field-error">${Le(e[t])}</div>`:""}function Me(e,t,s=""){return[s,e[t]?"has-error":""].filter(Boolean).join(" ")}function dl(e,t,s,o){const l=Object.keys(Xt).map(u=>`<option value="${u}" ${e.invoiceType===u?"selected":""}>${Xt[u]}</option>`).join(""),r=e.lines.map((u,y)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${Me(o,`lines.${y}.productCode`,"input-cell")}" type="text" data-line="${y}" data-field="productCode" value="${Le(u.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${y}" aria-label="商品検索">🔍</button>
          </div>
          ${ke(o,`lines.${y}.productCode`)}
        </td>
        <td>
          <input class="${Me(o,`lines.${y}.productName`,"input-cell")}" type="text" data-line="${y}" data-field="productName" value="${Le(u.productName)}" placeholder="商品名" />
          ${ke(o,`lines.${y}.productName`)}
        </td>
        <td>
          <input class="${Me(o,`lines.${y}.quantity`,"input-cell numeric")}" type="number" data-line="${y}" data-field="quantity" value="${u.quantity}" min="0" />
          ${ke(o,`lines.${y}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${y}" data-field="unit" value="${u.unit}" placeholder="本" /></td>
        <td>
          <input class="${Me(o,`lines.${y}.unitPrice`,"input-cell numeric")}" type="number" data-line="${y}" data-field="unitPrice" value="${u.unitPrice}" min="0" />
          ${ke(o,`lines.${y}.unitPrice`)}
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
          <select id="inv-type">${l}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${Me(o,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||cl(new Date)}" />
          ${ke(o,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${Me(o,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${Le(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${ke(o,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${Le(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${Le(e.staffCode)}" />
        </label>
      </div>
      ${ke(o,"lines")}
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
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${Le(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${s?"disabled":""}>
        ${s?"保存中…":"保存する"}
      </button>
    </div>
  `}function ul(e){return"¥"+e.toLocaleString("ja-JP")}function pl(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const ml={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},yl={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},hl={sake:"酒販用",standard:"通常"};function fl(e,t){return`
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
  `}const un="kanei-quote-settings",pn=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Rt={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",billingName:"株式会社金井酒造",billingPostal:"257-0014",billingAddress:"神奈川県秦野市堀山下182",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function Ya(){try{const e=localStorage.getItem(un);if(e)return{...Rt,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Rt,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Rt}}function Re(e){localStorage.setItem(un,JSON.stringify(e))}function $e(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function le(e,t,s,o="text",l=""){return`<div class="form-row"><label>${t}</label><input type="${o}" id="${e}" value="${$e(s)}" placeholder="${$e(l)}" /></div>`}function vl(e){return`
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
  `}function gl(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function Ca(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:gl(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}Ca();function M(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function pe(e){return"¥"+e.toLocaleString("ja-JP")}function Ot(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function mn(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function yn(e,t,s){return"#"+[e,t,s].map(o=>Math.max(0,Math.min(255,Math.round(o))).toString(16).padStart(2,"0")).join("")}function we(e,t){const[s,o,l]=mn(e);return yn(s+(255-s)*t,o+(255-o)*t,l+(255-l)*t)}function hn(e,t){const[s,o,l]=mn(e);return yn(s*(1-t),o*(1-t),l*(1-t))}function bl(e){const t=hn(e,.15),s=we(e,.88),o=we(e,.96),l=we(e,.94),r=we(e,.62);return`
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
.q-seller { width:195px; background:${l}; border:1px solid ${r}; border-radius:4px; padding:10px 12px; font-size:10px; min-height:90px; }
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
.q-total-row td { font-weight:700; font-size:12px; background:${s}; border-top:2px solid ${e}; }
.q-conditions { width:55%; border-collapse:collapse; margin-bottom:12px; font-size:10px; }
.q-conditions th { background:#f0f0f0; padding:4px 8px; text-align:left; border:1px solid #ccc; width:90px; font-weight:600; }
.q-conditions td { padding:4px 8px; border:1px solid #ccc; }
.q-remarks { border:1px solid #ddd; padding:8px; font-size:10px; margin-bottom:10px; border-radius:3px; }
.q-remarks-label { font-weight:700; margin-bottom:3px; }
.q-footer-note { font-size:9px; color:#777; margin-bottom:8px; }
.billing-box { border-top:1px solid #e0e0e0; padding-top:8px; font-size:10px; color:#555; line-height:1.6; }
@media print { body { padding:10mm 12mm; } }
`}function $l(e){const t=hn(e,.15),s=we(e,.88),o=we(e,.96),l=we(e,.94),r=we(e,.62);return`
.q-doc { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:13px; color:#1a1a2e; max-width:720px; margin:0 auto; }
.q-doc * { box-sizing:border-box; margin:0; padding:0; }
.q-doc .q-title-row { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; border-bottom:3px solid ${e}; padding-bottom:8px; }
.q-doc .q-title { font-size:22px; font-weight:700; letter-spacing:0.3em; color:${e}; }
.q-doc .q-meta-table { font-size:12px; border-collapse:collapse; }
.q-doc .q-meta-table th { text-align:right; padding:2px 8px 2px 0; color:#555; white-space:nowrap; }
.q-doc .q-meta-table td { font-weight:600; text-align:right; }
.q-doc .q-parties { display:flex; justify-content:space-between; gap:16px; margin-bottom:16px; }
.q-doc .q-customer { flex:1; }
.q-doc .q-customer-name { font-size:18px; font-weight:700; border-bottom:1px solid #333; padding-bottom:4px; margin-bottom:4px; }
.q-doc .q-customer-addr { font-size:12px; color:#555; }
.q-doc .q-seller { width:200px; background:${l}; border:1px solid ${r}; border-radius:4px; padding:12px; font-size:12px; min-height:90px; }
.q-doc .q-seller-name { font-size:14px; font-weight:700; margin-bottom:4px; }
.q-doc .q-seller-sub { color:#444; margin-top:2px; }
.q-doc .q-regno { color:#777; font-size:11px; }
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
  .q-doc .q-title { font-size:18px; letter-spacing:0.15em; }
  .q-doc .q-title-row { flex-direction:column-reverse; gap:10px; }
  .q-doc .q-meta-table { width:100%; }
  .q-doc .q-meta-table th { text-align:left; }
  .q-doc .q-meta-table td { text-align:left; }
  .q-doc .q-parties { flex-direction:column; gap:12px; }
  .q-doc .q-seller { width:100%; min-height:auto; }
  .q-doc .q-customer-name { font-size:16px; }
  .q-doc .q-total-banner { padding:10px 14px; }
  .q-doc .q-total-amount { font-size:20px; }
  .q-doc .q-conditions { max-width:100%; }
  .q-doc .q-items { min-width:380px; font-size:11px; }
  .q-doc .q-items th, .q-doc .q-items td { padding:5px 5px; }
}
`}function fn(e,t){const s=e.lines.reduce((c,m)=>c+m.amount,0),o=Math.round(s*e.taxRate/100),l=s+o,r=e.templateType==="sake",d=r?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",p=r?9:6,u=e.lines.map((c,m)=>{const h=r?`<td style="font-size:9px;">${M(c.janCode)}</td><td style="text-align:center;">${c.caseQty??""}</td><td style="text-align:right;">${c.retailPrice!=null?pe(c.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${m+1}</td>
      <td class="mono" style="font-size:9px;">${M(c.productCode)}</td>
      <td>${M(c.productName)}</td>
      ${h}
      <td style="text-align:right;">${c.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${M(c.unit)}</td>
      <td style="text-align:right;">${pe(c.unitPrice)}</td>
      <td style="text-align:right;">${pe(c.amount)}</td>
    </tr>`}).join("")||`<tr><td colspan="${p}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,y=[];e.validUntil&&y.push(`<tr><th>有効期限</th><td>${Ot(e.validUntil)}</td></tr>`),e.paymentTerms&&y.push(`<tr><th>支払条件</th><td>${M(e.paymentTerms)}</td></tr>`),e.deliveryDate&&y.push(`<tr><th>納期</th><td>${M(e.deliveryDate)}</td></tr>`),e.deliveryPlace&&y.push(`<tr><th>納品場所</th><td>${M(e.deliveryPlace)}</td></tr>`);const n=t.billingName||t.billingAddress?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【請求書送付先】</p>
      ${t.billingPostal?`<p>〒${M(t.billingPostal)}</p>`:""}
      ${t.billingAddress?`<p>${M(t.billingAddress)}</p>`:""}
      ${t.billingName?`<p>${M(t.billingName)}</p>`:""}
    </div>
  `:"",i=t.sealImageDataUrl?`
    <div style="position:absolute;right:0;top:0;">
      <img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;border-radius:0;opacity:0.9;" />
    </div>`:"";return`
<div class="q-doc">
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <table class="q-meta-table">
      ${e.quoteNo?`<tr><th>見積番号</th><td style="text-align:right;">${M(e.quoteNo)}</td></tr>`:""}
      <tr><th>見積日</th><td style="text-align:right;">${Ot(e.quoteDate)}</td></tr>
      ${e.validUntil?`<tr><th>有効期限</th><td style="text-align:right;">${Ot(e.validUntil)}</td></tr>`:""}
    </table>
  </div>

  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${M(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${M(e.customerAddress)}</p>`:""}
    </div>
    <div class="q-seller" style="position:relative;">
      ${i}
      <p class="q-seller-name">${M(t.companyName)}</p>
      ${t.companyPostal?`<p class="q-seller-sub">〒${M(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${M(t.companyAddress1)}${t.companyAddress2?" "+M(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${M(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${M(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${M(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${pe(l)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${M(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${M(t.defaultHeaderNote)}</p>`:""}

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
        <th style="width:80px;">${r?"納入価格":"単価"}</th>
        <th style="width:90px;">金額</th>
      </tr>
    </thead>
    <tbody>${u}</tbody>
    <tfoot>
      <tr><td colspan="${p-1}" style="text-align:right;">小計</td><td style="text-align:right;">${pe(s)}</td></tr>
      <tr><td colspan="${p-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${pe(o)}</td></tr>
      <tr class="q-total-row"><td colspan="${p-1}" style="text-align:right;">合計</td><td style="text-align:right;">${pe(l)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${y.length>0?`<table class="q-conditions">${y.join("")}</table>`:""}

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${M(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${M(t.defaultFooterNote)}</p>`:""}

  ${n}
</div>`}function vn(e,t,s,o,l,r,d){const p=e.lines.reduce((h,g)=>h+g.amount,0),u=Math.round(p*e.taxRate/100),y=p+u,n=e.templateType==="sake",i=o.length>=1?t.filter(h=>h.name.includes(o)||h.code.includes(o)).slice(0,8):[],c=l.length>=1?s.filter(h=>h.name.includes(l)||h.code.includes(l)).slice(0,8):[];if(e.previewMode){const h=d.accentColor||"#0968e5";return`
      <section class="page-head">
        <div><p class="eyebrow">見積書</p><h1>プレビュー</h1></div>
        <div class="meta-stack">
          <button class="button secondary" type="button" data-action="quote-edit-mode">← 編集に戻る</button>
          <button class="button primary" type="button" data-action="quote-download-pdf">PDF ダウンロード</button>
          <button class="button secondary" type="button" data-action="save-quote">保存</button>
        </div>
      </section>
      <style>${$l(h)}</style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${fn(e,d)}
      </div>
    `}const m=e.lines.map((h,g)=>{const v=n?`
      <td><input type="text" class="jan-input" data-line-idx="${g}" value="${M(h.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${g}" value="${h.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${g}" value="${h.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${M(h.productCode)}</td>
      <td>${M(h.productName)}</td>
      ${v}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${g}" value="${h.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${M(h.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${g}" value="${h.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${pe(h.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${g}">×</button></td>
    </tr>`}).join("")||`<tr><td colspan="${n?10:7}" style="text-align:center;color:var(--text-secondary);padding:20px;">商品を検索して追加</td></tr>`;return`
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
          ${pn.map(h=>`
            <button type="button" data-action="set-accent-color" data-color="${M(h.value)}" title="${M(h.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${d.accentColor===h.value?"#333":"transparent"};background:${M(h.value)};cursor:pointer;"></button>
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
          <input type="text" id="q-no" value="${M(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${M(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${M(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${M(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${M(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${M(o)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${i.length>0?`<div class="search-results">${i.map(h=>`
        <button class="search-item" type="button" data-select-customer="${h.code}" data-cust-name="${M(h.name)}" data-cust-addr="${M(h.address1||"")}">
          <span class="mono">${h.code}</span> ${M(h.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName?`<div class="selected-item"><span class="mono">${M(e.customerCode)}</span> <strong>${M(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${M(e.customerAddress)}</span>`:""}</div>`:""}
    </section>

    <section class="panel">
      <div class="panel-header"><h2>明細</h2></div>
      <div class="form-row">
        <input type="text" id="q-prod-search" value="${M(l)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${c.length>0?`<div class="search-results">${c.map(h=>{const g=r?_a(h,r):{price:h.salePrice||0,label:"標準価格"},v=g.label!=="標準価格";return`<button class="search-item" type="button" data-add-product="${h.code}" data-prod-name="${M(h.name)}" data-prod-price="${g.price}" data-prod-jan="${M(h.janCode??"")}" data-prod-case="${h.caseQty??""}">
          <span class="mono">${h.code}</span> ${M(h.name)}
          <span class="numeric" ${v?'style="color:#2f855a;font-weight:700;"':""}>${g.price?pe(g.price):""} <small>(${g.label})</small></span>
        </button>`}).join("")}</div>`:""}

      <div class="table-wrap" style="margin-top:10px;">
        <table>
          <thead>
            <tr>
              <th>品番</th><th>品名</th>
              ${n?'<th>JANコード</th><th>入数</th><th class="numeric">希望小売価格</th>':""}
              <th class="numeric">数量</th><th>単位</th><th class="numeric">${n?"納入価格":"単価"}</th><th class="numeric">金額</th><th></th>
            </tr>
          </thead>
          <tbody>${m}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="3">${M(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${pe(p)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${pe(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${pe(y)}</span></div>
        </div>
      </div>
    </section>
  `}function _l(e,t){const s=fn(e,t),o=window.open("","_blank","width=860,height=1100");if(!o){alert("ポップアップがブロックされました。許可してください。");return}o.document.write(`<!DOCTYPE html>
<html lang="ja"><head><meta charset="UTF-8" />
<title>見積書 ${e.quoteNo||""}</title>
<style>${bl(t.accentColor||"#0968e5")}</style>
</head><body>${s}
<script>window.onload=function(){window.print();}<\/script>
</body></html>`),o.document.close()}function mt(e){const t=s=>document.getElementById(s)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function gn(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function bn(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function $n(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function wl(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function xl(e,t,s,o,l){const r=new Map,d=new Map;for(const n of e){if(n.date>=t&&n.date<=s){const i=r.get(n.productCode);i?(i.amt+=n.amount,i.qty+=n.qty):r.set(n.productCode,{name:n.productName,vol:n.volumeMl,amt:n.amount,qty:n.qty})}n.date>=o&&n.date<=l&&d.set(n.productCode,(d.get(n.productCode)??0)+n.amount)}const p=[...r.entries()].map(([n,i])=>({code:n,...i})).sort((n,i)=>i.amt-n.amt),u=p.reduce((n,i)=>n+i.amt,0);let y=0;return p.map(n=>{y+=n.amt;const i=u>0?Math.round(n.amt*1e4/u)/100:0,c=y<=u*.7?"A":y<=u*.9?"B":"C",m=d.get(n.code)??0,h=m>0?Math.round((n.amt-m)/m*1e3)/10:null;return{code:n.code,name:n.name,volumeMl:n.vol,amount:n.amt,qty:n.qty,sharePct:i,rank:c,prevAmount:m,growthRate:h}})}function Sl(e,t,s){const o=new Date,l=o.toISOString().slice(0,10);let r=l,d=l,p="";switch(e){case"week":{const n=new Date(o);n.setDate(n.getDate()-7),r=n.toISOString().slice(0,10),d=l,p="直近7日間";break}case"month":{r=l.slice(0,7)+"-01",d=l,p="当月";break}case"90days":{const n=new Date(o);n.setDate(n.getDate()-90),r=n.toISOString().slice(0,10),d=l,p="直近90日間";break}case"year":{const n=new Date(o);n.setFullYear(n.getFullYear()-1),r=n.toISOString().slice(0,10),d=l,p="直近1年間";break}case"custom":{r=t||l,d=s||l,p=`${r} 〜 ${d}`;break}}const u=new Date(r);u.setFullYear(u.getFullYear()-1);const y=new Date(d);return y.setFullYear(y.getFullYear()-1),{start:r,end:d,prevStart:u.toISOString().slice(0,10),prevEnd:y.toISOString().slice(0,10),label:p}}function kl(e,t="all",s=[],o="year",l,r,d=[]){const p=Sl(o,l,r),u=s.length>0?xl(s,p.start,p.end,p.prevStart,p.prevEnd):e.map($=>({code:$.code,name:$.name,volumeMl:$.volumeMl,amount:$.yearAmount,qty:$.yearQty,sharePct:$.sharePct,rank:$.rank,prevAmount:$.prevAmount,growthRate:$.growthRate})),y=u.filter($=>$.rank==="A").length,n=u.filter($=>$.rank==="B").length,i=u.filter($=>$.rank==="C").length,c=u.filter($=>$.growthRate!=null&&$.growthRate>10),m=u.filter($=>$.growthRate!=null&&$.growthRate<-10);let h=u,g="全商品";switch(t){case"A":h=u.filter($=>$.rank==="A"),g="Aランク";break;case"B":h=u.filter($=>$.rank==="B"),g="Bランク";break;case"C":h=u.filter($=>$.rank==="C"),g="Cランク";break;case"growing":h=c,g="成長商品(+10%以上)";break;case"declining":h=m,g="衰退商品(-10%以下)";break}const v=($,S,L)=>`<button class="button ${t===$?"primary":"secondary"} small" data-product-filter="${$}">${S} (${L})</button>`,_=($,S)=>`<button class="button ${o===$?"primary":"secondary"} small" data-product-period="${$}">${S}</button>`;return`
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
        <input type="date" id="pp-range-start" class="range-input" value="${l||""}" />
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
        <p class="kpi-value">${n} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${c.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${m.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${g} (${h.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${v("all","全て",u.length)}
        ${v("A","A",y)}
        ${v("B","B",n)}
        ${v("C","C",i)}
        ${v("growing","成長",c.length)}
        ${v("declining","衰退",m.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${O("rank","ABC",d)}
              ${O("name","商品名",d)}
              ${O("amount","売上",d,"numeric")}
              ${O("sharePct","構成比",d,"numeric")}
              ${O("qty","本数",d,"numeric")}
              ${O("growthRate","前年同期比",d,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${Je(h,d,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map($=>`
              <tr>
                <td>${bn($.rank)}</td>
                <td>${$.name?$.name.slice(0,25):$.code}${$.volumeMl?` <small>${$.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${gn($.amount)}</td>
                <td class="numeric">${$.sharePct}%</td>
                <td class="numeric">${$.qty.toLocaleString()}</td>
                <td class="numeric">${$n($.growthRate)}</td>
              </tr>
            `).join("")}
            ${h.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Pl(e,t=[]){const s=e.filter(r=>r.currentRank==="A").length,o=e.filter(r=>r.prevRank&&r.currentRank<r.prevRank).length,l=e.filter(r=>r.prevRank&&r.currentRank>r.prevRank).length;return`
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
            ${Je(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).slice(0,50).map(r=>`
              <tr>
                <td>${bn(r.currentRank)}</td>
                <td>${r.name||r.code}</td>
                <td class="numeric">${gn(r.yearAmount)}</td>
                <td class="numeric">${r.sharePct}%</td>
                <td class="numeric">${r.orderDays}日</td>
                <td class="numeric">${$n(r.growthRate)}</td>
                <td>${wl(r.currentRank,r.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Al(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Cl(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function El(e,t){const s=e.length?e.map(o=>`
            <tr>
              <td class="mono">${o.documentNo}</td>
              <td>${Al(o.date)}</td>
              <td>
                <div class="table-title">${o.customerName}</div>
                <div class="table-sub mono">${o.customerCode}</div>
              </td>
              <td class="numeric">${o.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Cl(o.amount)}</td>
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
  `}function Ll(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Dl(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function _n(e,t){const s=new Date(e);return s.setDate(s.getDate()+t),s}function wn(e){const t=new Date(e),s=t.getDay();return t.setDate(t.getDate()-s),t.setHours(0,0,0,0),t}function Ua(e){const t=_n(wn(e),6);return t.setHours(23,59,59,999),t}function Qa(e){return new Date(`${e}T00:00:00`)}function Ha(e){return`${e.getMonth()+1}/${e.getDate()}`}function ql(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Il(){const e=new Date,t=wn(Dl(Ll(e),-3)),s=Ua(new Date(e.getFullYear(),e.getMonth()+4,0)),o=[];let l=new Date(t);for(;l<=s;){const r=Ua(l);o.push({start:new Date(l),end:r,label:`${Ha(l)} - ${Ha(r)}`}),l=_n(l,7)}return o}function Tl(e){const t=Il(),s=`160px repeat(${t.length}, minmax(56px, 1fr))`,o=t.map(r=>`
        <div class="gantt-week">
          <span>${r.label}</span>
        </div>
      `).join(""),l=e.length?e.map(r=>{const d=Qa(r.startDate),p=Qa(r.expectedDoneDate),u=Math.max(0,t.findIndex(i=>i.end>=d)),y=Math.max(u,t.reduce((i,c,m)=>c.start<=p?m:i,u)),n=[`仕込番号: ${r.jikomiNo}`,`銘柄: ${r.productName}`,`期間: ${r.startDate} - ${r.expectedDoneDate}`,`タンク: ${r.tankNo}`,`備考: ${r.note||"なし"}`].join(`
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
                  title="${ql(n)}"
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
          ${o}
        </div>
        ${l}
      </div>
    </section>
  `}function Ga(e,t){const s={planned:"neutral",active:"warning",done:"success"},o=e.map(p=>`
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
          <span class="status-pill ${s[p.status]}">${Fs[p.status]}</span>
        </td>
        <td>${p.note||"―"}</td>
      </tr>
    `).join(""),l=e.filter(p=>p.status==="active").length,r=e.filter(p=>p.status==="done").length,d=e.filter(p=>p.status==="planned").length;return`
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
        <p class="kpi-value">${d} 本</p>
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
          <tbody>${o||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Nl(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},s={pending:"neutral",submitted:"warning",approved:"success"},o=e.map(u=>`
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
    `).join(""),l=e.filter(u=>u.status==="approved").length,r=e.filter(u=>u.status==="submitted").length,d=e.filter(u=>u.status==="pending").length;return`
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
        <p class="kpi-value">${d} 件</p>
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
  `}function Ml(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Rl(e,t){return`
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
        ${e?`<p class="field-error">${Ml(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function Ol(e){return`
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
  `}function jl(e){return`
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
  `}const Ea={query:"",businessType:"",areaCode:"",activeOnly:"",page:1},at=50;function Fl(e,t){let s=e;if(t.query){const p=t.query.toLowerCase();s=s.filter(u=>u.code.toLowerCase().includes(p)||u.name.toLowerCase().includes(p)||u.kanaName&&u.kanaName.toLowerCase().includes(p)||u.address1&&u.address1.toLowerCase().includes(p)||u.phone&&u.phone.toLowerCase().includes(p))}t.businessType&&(s=s.filter(p=>p.businessType===t.businessType)),t.areaCode&&(s=s.filter(p=>p.areaCode===t.areaCode)),t.activeOnly==="active"?s=s.filter(p=>p.isActive):t.activeOnly==="inactive"&&(s=s.filter(p=>!p.isActive));const o=Math.max(1,Math.ceil(s.length/at)),r=(Math.min(t.page,o)-1)*at,d=s.slice(r,r+at);return{filtered:s,paged:d,totalPages:o}}function Xa(e,t,s){if(s<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const o=(t-1)*at+1,l=Math.min(t*at,e),r=[];for(let d=1;d<=s;d++)d===1||d===s||d>=t-2&&d<=t+2?r.push(`<button class="button ${d===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${d}" style="min-width:36px;padding:4px 8px;">${d}</button>`):(d===t-3||d===t+3)&&r.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${o}-${l} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${r.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=s?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function zl(e,t){const s=[...new Set(e.map(l=>l.businessType).filter(Boolean))].sort(),o=[...new Set(e.map(l=>l.areaCode).filter(Boolean))].sort();return`
    <div style="display:flex;gap:8px;align-items:end;flex-wrap:wrap;padding:12px 0;">
      <div class="form-group" style="flex:1;min-width:200px;">
        <label class="form-label">検索</label>
        <input type="text" id="master-search" class="form-input" placeholder="コード・名前・カナ・住所・電話" value="${t.query}">
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">業態</label>
        <select id="master-business-type" class="form-input">
          <option value="">すべて</option>
          ${s.map(l=>`<option value="${l}" ${t.businessType===l?"selected":""}>${l}</option>`).join("")}
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
  `}function ta(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Bl(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}function Vl(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${Bl(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${ta(t.address1||"",16)}</td>
          <td>${ta(t.address2||"",12)}</td>
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
      `).join("")}function yt(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function Jl(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${ta(t.name,20)}</td>
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
      `).join("")}function Yl(e,t,s=Ea,o=[]){const{filtered:l,paged:r,totalPages:d}=Fl(e.customers,s);return`
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
        ${zl(e.customers,s)}
        ${Xa(l.length,s.page,d)}
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
            <tbody>${Vl(Je(r,o,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${Xa(l.length,s.page,d)}
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
            <tbody>${Jl(Je(e.products,o,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function jt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ul(e,t){if(!e&&!t)return"";const s=e;return`
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
                ${tn.map(o=>`<option ${s?.materialType===o?"selected":""}>${o}</option>`).join("")}
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
  `}function Ql(e){const t=e.map(l=>{const d=(l.minimumStock>0?l.currentStock/l.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${l.code}</td>
          <td>${l.name}</td>
          <td class="numeric ${d?"text-danger":""}">
            ${l.currentStock.toLocaleString("ja-JP")} ${l.unit}
            ${d?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${l.minimumStock.toLocaleString("ja-JP")} ${l.unit}</td>
          <td class="numeric">${jt(l.unitCost)}</td>
          <td class="numeric">${jt(l.currentStock*l.unitCost)}</td>
          <td>${l.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${l.id}">調整</button>
          </td>
        </tr>
      `}).join(""),s=e.filter(l=>l.minimumStock>0&&l.currentStock/l.minimumStock<1.5).length,o=e.reduce((l,r)=>l+r.currentStock*r.unitCost,0);return`
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
  `}function Hl(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function Ft(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Gl={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Xl(e){return`
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
          <td class="numeric">${Ft(s.billedAmount)}</td>
          <td class="numeric">${Ft(s.paymentAmount)}</td>
          <td class="numeric">${Ft(s.balanceAmount)}</td>
          <td>${Hl(s.lastPaymentDate)}</td>
          <td><span class="status-pill ${s.status==="paid"?"success":s.status==="partial"?"warning":"danger"}">${Gl[s.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function Oe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ka(e){return e.trim().toLowerCase()}function Kl(e,t){const s=Ka(t),o=e.filter(r=>s?[r.code,r.name,r.janCode].map(Ka).some(d=>d.includes(s)):!0),l=o.length?`
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
              ${o.map(r=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${Oe(r.code)}"
                      data-name="${Oe(r.name)}"
                    >
                      <td class="mono">${Oe(r.code)}</td>
                      <td>${Oe(r.name)}</td>
                      <td class="mono">${Oe(r.janCode)}</td>
                      <td>${Oe(r.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return dn({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:l,emptyMessage:"該当する商品が見つかりません。"})}function Pe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Wl(e,t){const s={pending:"未確定",confirmed:"確定",paid:"支払済"},o={pending:"warning",confirmed:"neutral",paid:"success"},l={unpaid:"未払い",partial:"一部支払",paid:"支払済"},r={unpaid:"warning",partial:"neutral",paid:"success"},d=e.map(i=>`
      <tr>
        <td class="mono">${i.documentNo}</td>
        <td>${i.purchaseDate}</td>
        <td class="mono">${i.supplierCode}</td>
        <td>${i.supplierName}</td>
        <td>${i.itemName}</td>
        <td class="numeric">${i.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${Pe(i.unitPrice)}</td>
        <td class="numeric"><strong>${Pe(i.amount)}</strong></td>
        <td>
          <span class="status-pill ${o[i.status]}">${s[i.status]}</span>
        </td>
      </tr>
    `).join(""),p=t.map(i=>`
      <tr>
        <td class="mono">${i.supplierCode}</td>
        <td>${i.supplierName}</td>
        <td class="numeric">${Pe(i.totalPurchase)}</td>
        <td class="numeric">${Pe(i.paidAmount)}</td>
        <td class="numeric"><strong>${Pe(i.balance)}</strong></td>
        <td>${i.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${r[i.status]}">${l[i.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${i.supplierCode}" ${i.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),u=e.reduce((i,c)=>i+c.amount,0),y=t.reduce((i,c)=>i+c.balance,0),n=t.filter(i=>i.status!=="paid").length;return`
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
        <p class="kpi-value">${Pe(u)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${Pe(y)}</p>
        <p class="kpi-sub">未払い ${n} 社</p>
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
  `}function Xe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Zl(e,t){const s={holding:"保有中",due:"期日到来",cleared:"決済済"},o={holding:"neutral",due:"warning",cleared:"success"},l=e.map(n=>`
      <tr>
        <td class="mono">${n.billNo}</td>
        <td>${n.supplierName}</td>
        <td class="numeric">${Xe(n.amount)}</td>
        <td>${n.issueDate}</td>
        <td>${n.dueDate}</td>
        <td>
          <span class="status-pill ${o[n.status]}">${s[n.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${n.id}" ${n.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),r=t.map(n=>{const i=n.minimumStock>0&&n.currentStock<n.minimumStock*1.2;return`
        <tr>
          <td class="mono">${n.code}</td>
          <td>${n.name}</td>
          <td class="numeric ${i?"text-danger":""}">
            ${n.currentStock.toLocaleString("ja-JP")} ${n.unit}
            ${i?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${n.minimumStock.toLocaleString("ja-JP")} ${n.unit}</td>
          <td class="numeric">${Xe(n.unitCost)}</td>
          <td class="numeric">${Xe(n.currentStock*n.unitCost)}</td>
          <td>${n.lastPurchaseDate}</td>
        </tr>
      `}).join(""),d=e.filter(n=>n.status==="holding"),p=d.reduce((n,i)=>n+i.amount,0),u=t.reduce((n,i)=>n+i.currentStock*i.unitCost,0),y=t.filter(n=>n.minimumStock>0&&n.currentStock<n.minimumStock*1.2).length;return`
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
        <p class="kpi-sub">${d.length} 枚保有中</p>
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
          <tbody>${r||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function aa(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function se(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function sa(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${se(e)}</pre>
    </div>
  `}function er(e){return`
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
      <code class="inline-code">${se(e)}</code>
      ${er(e)}
    </div>
  `}function je(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${se(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${se(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${se(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?sa(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${se(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${se(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function ft(e){return`
    <div class="setup-step setup-step-compact" data-step="${se(e.stepLabel)}">
      <h3>${se(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${se(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function vt(e){if(!e)return"error";const s=(Date.now()-new Date(e).getTime())/(1e3*60*60);return s<1?"success":s<24?"warning":"error"}function Wa(e){if(!e)return"未同期";const s=(Date.now()-new Date(e).getTime())/(1e3*60*60);return s<1?"正常":s<24?"注意":"要確認"}function tr(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?aa(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${vt(e.lastOverallSync)}">${Wa(e.lastOverallSync)}</span>
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
              <td>${se(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?aa(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${vt(t.lastSyncAt)}">${Wa(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function ar(e,t,s,o){const l={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${o?tr(o):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${aa(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${l[e.status]}</span>
        </p>
        <p class="kpi-sub">${se(e.message)}</p>
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
      ${je({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${je({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${je({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${je({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${je({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${je({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${sa(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${sa(`{
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
            <span class="config-value">${se(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${se(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${se(s)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${se(s)}"
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
  `}function et(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function sr(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function nr(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),s=Math.max(...t.map(i=>i.amount),1),o=28,l=6,r=140,d=100,p=760,u=p-r-d,y=t.length*(o+l)+16,n=t.map((i,c)=>{const m=i.amount/s*u,h=c*(o+l)+8,g=i.abcRank==="A"?"#2F855A":i.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${r-8}" y="${h+o/2+5}" class="chart-axis" text-anchor="end">${i.name.length>10?i.name.slice(0,10)+"…":i.name}</text>
          <rect x="${r}" y="${h}" width="${m}" height="${o}" rx="4" fill="${g}" opacity="0.85" />
          <text x="${r+m+8}" y="${h+o/2+5}" class="chart-axis">${(i.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${p} ${y}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${n}
    </svg>
  `}function or(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(o=>`<th class="numeric">${o}</th>`).join(""),s=e.monthlyByCustomer.map(o=>{const l=o.values.reduce((d,p)=>d+p,0),r=o.values.map(d=>`<td class="numeric">${d>0?(d/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${o.label}</td>
          ${r}
          <td class="numeric"><strong>${et(l)}</strong></td>
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
  `}function ir(e){e.ranking.reduce((u,y)=>u+y.amount,0);const t=e.ranking.filter(u=>u.abcRank==="A").length,s=e.ranking.filter(u=>u.abcRank==="B").length,o=e.ranking.filter(u=>u.abcRank==="C").length,l=e.ranking.filter(u=>u.abcRank==="A").reduce((u,y)=>u+y.amount,0),r=e.ranking.filter(u=>u.abcRank==="B").reduce((u,y)=>u+y.amount,0),d=e.ranking.filter(u=>u.abcRank==="C").reduce((u,y)=>u+y.amount,0),p=e.ranking.map(u=>`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric">${et(u.amount)}</td>
          <td class="numeric">${u.ratio.toFixed(1)}%</td>
          <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${sr(u.abcRank)}">${u.abcRank}</span></td>
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
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${et(l)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${s}社 <span class="kpi-sub">${et(r)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${o}社 <span class="kpi-sub">${et(d)}</span></div>
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
        ${nr(e.ranking)}
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
      ${or(e)}
    </section>
  `}const lr={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},Za={amount:"売上額",quantity:"出荷本数",volume:"移出量"},na=10;function La(e){const[t,s]=e.split("-").map(Number);return s>=na?t:t-1}function rr(e){const t=na-1,s=new Date(e+1,t,0).getDate();return{from:`${e}-${String(na).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(s).padStart(2,"0")}`}}function cr(e,t,s){const o=d=>t==="quantity"?d.quantity:t==="volume"?d.volumeMl:d.amount,l=new Map;for(const d of e){const p=s==="fiscal"?`${La(d.month)}年度`:d.month.slice(0,4);l.set(p,(l.get(p)??0)+o(d))}return{curr:[...l.entries()].sort((d,p)=>d[0].localeCompare(p[0])).map(([d,p])=>({month:d,amount:p}))}}function dr(e){const t=new Set;for(const s of e)t.add(La(s.month));return[...t].sort((s,o)=>o-s).map(String)}function Ye(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ur(e){return e.replace("-","/")}const es={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function pr(e,t="#0F5B8D",s=[],o="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const l=s.length>0&&s.some($=>$.amount>0),r=760,d=280,p={top:16,right:24,bottom:36,left:o==="amount"?64:56},u=r-p.left-p.right,y=d-p.top-p.bottom,n=[...e.map($=>$.amount),...s.map($=>$.amount)],i=Math.max(...n,1),c=u/e.length;function m($){if(o==="quantity")return $>=1e4?`${($/1e4).toFixed(1)}万本`:`${Math.round($).toLocaleString()}本`;if(o==="volume"){const S=$/1e3;return S>=1e4?`${(S/1e3).toFixed(0)}kL`:`${Math.round(S).toLocaleString()} L`}return`${Math.round($/1e4).toLocaleString("ja-JP")}万円`}function h($){return o==="quantity"?`${$.toLocaleString()}本`:o==="volume"?qt($):Ye($)}const g=[0,.25,.5,.75,1].map($=>{const S=p.top+y-y*$,L=m(i*$);return`<g>
        <line x1="${p.left}" y1="${S}" x2="${r-p.right}" y2="${S}" class="chart-grid" />
        <text x="4" y="${S+4}" class="chart-axis">${L}</text>
      </g>`}).join(""),v=e.map(($,S)=>{const L=l?Math.max((c-18)/2,10):Math.max(c-18,24),D=l?2:0,N=p.left+S*c+(c-(l?L*2+D:L))/2,E=$.amount/i*y,P=p.top+y-E,R=s[S]?.amount??0,A=R/i*y,I=p.top+y-A,j=l?`<rect x="${N}" y="${I}" width="${L}" height="${A}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${h(R)}</title></rect>`:"",K=l?N+L+D:N;return`<g>
      ${j}
      <rect x="${K}" y="${P}" width="${L}" height="${E}" rx="4" fill="${t}" opacity="${.6+S/e.length*.35}"><title>${h($.amount)}</title></rect>
      <text x="${p.left+S*c+c/2}" y="${d-8}" class="chart-axis centered-axis">${ur($.month)}</text>
    </g>`}).join(""),_=l?`
    <g transform="translate(${r-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${r} ${d}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${g}${v}${_}
    </svg>
  `}function qt(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function mr(e,t=!1){const s=t?7:6;return e.length===0?`<tr><td colspan="${s}" class="empty-row">データなし</td></tr>`:e.map(o=>`
    <tr>
      <td class="mono">${o.code}</td>
      <td>${o.name}</td>
      <td class="numeric">${Ye(o.amount)}</td>
      <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${qt(o.volumeMl)}</td>
      <td class="numeric">${o.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${o.code}" data-drilldown-name="${o.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function yr(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${Ye(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${qt(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function ts(e,t,s){const o=t?e.filter(r=>r.tag.includes(t)||r.name.includes(t)):e,l=o.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':o.map(r=>`
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
        <tbody>${l}</tbody>
      </table>
    </div>
  `}function xn(e,t,s="all",o="",l=[],r=[],d="",p="",u=null,y="all",n="",i=[],c=[],m=[],h=null,g=[],v=[],_="amount",$="calendar"){const S=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",L=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,N=s!=="all"&&l.length>0&&t!=="staff"?l:L,E=Je(N,m,lr),P={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},R=Za[_],A=z=>_==="quantity"?z.quantity:_==="volume"?z.volumeMl:z.amount,I=z=>_==="quantity"?`${z.toLocaleString()}本`:_==="volume"?qt(z):Ye(z);let j,K=[],H,ae,ce;if(h&&h.monthlySales.length>0)j=h.monthlySales.slice(-24).map(z=>({month:z.month,amount:A(z)})),H=`${h.name} の月別${R}`,ae=`${h.tab==="customers"?"得意先":"商品"}: ${h.code}`,ce="#0968e5";else if(g.length>0&&s!=="all"){j=g.map(oe=>({month:oe.month,amount:A(oe)})),K=v.map(oe=>({month:oe.month,amount:A(oe)}));const z=j.reduce((oe,Y)=>oe+Y.amount,0),be=K.reduce((oe,Y)=>oe+Y.amount,0),rt=be>0?(z-be)/be*100:0,Ie=rt>0?"+":"";H=`${P[s]} ${R}（${o}）`,ae=`${I(z)}${be>0?` / 前年比 ${Ie}${rt.toFixed(1)}%`:""}`,ce="#2f855a"}else{j=cr(e.monthlySales,_,$).curr,K=[];const be=j.reduce((Ie,oe)=>Ie+oe.amount,0);H=`${$==="fiscal"?"決算年度別":"暦年別"}${R}`,ae=`累計 ${I(be)}（${j.length}${$==="fiscal"?"期":"年"}）`,ce="#0F5B8D"}const ge=["amount","quantity","volume"].map(z=>`<button class="tab-button ${z===_?"active":""}" data-chart-metric="${z}">${Za[z]}</button>`).join(""),de=["all","yearly","monthly","weekly","daily"].map(z=>`<button class="button ${z===s?"primary":"secondary"} small" type="button" data-analytics-period="${z}">${es[z]}</button>`).join(""),T=$==="fiscal"&&s==="yearly"?dr(e.monthlySales):r,G=$==="fiscal"&&s==="yearly"&&!T.includes(o)?T[0]??"":o,Ue=s!=="all"&&T.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${T.map(z=>`<option value="${z}" ${z===G?"selected":""}>${$==="fiscal"&&s==="yearly"?z+"年度":z}</option>`).join("")}
      </select>`:"";let De="",qe="";if(t==="staff"){const z=["all","yearly","monthly","weekly","daily"].map(Y=>`<button class="button ${Y===y?"primary":"secondary"} small" type="button" data-staff-period="${Y}">${es[Y]}</button>`).join(""),be=y!=="all"&&i.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${i.map(Y=>`<option value="${Y}" ${Y===n?"selected":""}>${Y}</option>`).join("")}
        </select>`:"",Ie=(c.length>0?c:e.staffTotals).filter(Y=>!d||Y.name.includes(d)||Y.code.includes(d)),oe=y!=="all"&&n?` (${n})`:"";if(De=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${z}</div>
        ${be}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${d}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
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
                  <td class="numeric">${Ye(Y.amount)}</td>
                  <td class="numeric">${Y.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${Y.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${Y.code}" data-staff-name="${Y.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const Y=u.breakdownTab,On=y!=="all"&&n?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${n}</span>`:"";qe=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${u.name} の内訳${On}</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>

          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div class="tab-group">
              <button class="tab-button ${Y==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${Y==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${p}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${Y==="customers"?ts(u.customerRows,p,"得意先名"):ts(u.productRows,p,"商品名")}
        </article>
      `}}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group" style="font-size:12px;">
          <button class="tab-button ${$==="calendar"?"active":""}" data-fiscal-mode="calendar">暦年（1〜12月）</button>
          <button class="tab-button ${$==="fiscal"?"active":""}" data-fiscal-mode="fiscal">決算期（10〜9月）</button>
        </div>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <h2>${H}</h2>
            <p class="panel-caption">${ae}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${ge}</div>
            ${h?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${pr(j,ce,K,_)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${S}</h2>
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
            ${Ue}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${O("code","コード",m,"mono")}
                  ${O("name","名称",m)}
                  ${O("amount","売上額",m,"numeric")}
                  ${O("quantity","本数",m,"numeric")}
                  ${O("volumeMl","移出量",m,"numeric")}
                  ${O("documents","伝票数",m,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${mr(E,!0)}</tbody>
            </table>
          </div>
        `:De}
      </article>
    </section>

    ${h?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${h.name} の${h.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${h.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${h.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${yr(h.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${qe}
  `}const as=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:rr,monthToFiscalYear:La,renderSalesAnalytics:xn},Symbol.toStringTag,{value:"Module"}));function Ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function hr(e){const t=Math.max(...e.salesByProduct.flatMap(r=>r.values),1),s=e.salesByProduct.map(r=>{const d=r.values.map((p,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(p/t*120)}px" title="${e.months[u]}: ${Ke(p)}"></div>
            <span class="bar-label">${e.months[u].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${r.label}</p>
          <div class="bar-chart">${d}</div>
        </div>
      `}).join(""),o=e.costSimulation.map(r=>`
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
    `).join(""),l=e.salesByCustomer.map(r=>{const d=r.values.reduce((p,u)=>p+u,0);return`
        <tr>
          <td>${r.label}</td>
          ${r.values.map(p=>`<td class="numeric">${(p/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${Ke(d)}</strong></td>
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
  `}function fr(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function vr(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ss(e){return e.toISOString().slice(0,10)}function gr(e,t,s){const o=e.length?e.map(l=>`
            <tr>
              <td class="mono">${l.documentNo}</td>
              <td>${fr(l.date)}</td>
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
          <input id="sales-start" type="date" value="${t||ss(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${s||ss(new Date)}" />
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
  `}function gt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function br(e,t,s,o){const l={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},r={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},d={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},p=e.map(i=>`
      <tr>
        <td>${i.saleTime}</td>
        <td class="mono">${i.productCode}</td>
        <td>${i.productName}</td>
        <td class="numeric">${i.quantity}</td>
        <td class="numeric">${gt(i.unitPrice)}</td>
        <td class="numeric"><strong>${gt(i.amount)}</strong></td>
        <td>${l[i.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(i=>`
      <tr>
        <td class="mono">${i.orderNo}</td>
        <td>${i.orderDate}</td>
        <td>${i.customerName}</td>
        <td>${i.postalCode} ${i.address}</td>
        <td>${i.items.map(c=>`${c.productName} ×${c.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${gt(i.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${d[i.status]}">${r[i.status]}</span>
        </td>
        <td>${i.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${i.id}">詳細</button>
        </td>
      </tr>
    `).join(""),y=e.reduce((i,c)=>i+c.amount,0),n=t.filter(i=>i.status==="new").length;return`
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
        <p class="kpi-sub">${e.length} 件 / ${o}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${n} 件</p>
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
  `}const zt={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},$r={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function _r(e,t,s,o){const l=$r[e],r=Object.keys(zt).map(p=>`
      <button class="tab-button ${e===p?"active":""}" data-import-entity="${p}">
        ${zt[p]}
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
        <h2>${zt[e]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${l.required.map(p=>`<code class="config-value">${p}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${l.optional.map(p=>`<code class="config-value">${p}</code>`).join(" / ")}</dd>
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

    ${o?`<section class="panel"><p class="sync-message">${o}</p></section>`:""}
  `}const Q={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function wr(e,t,s){const o=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:Q.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:Q.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:Q.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:Q.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:Q.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:Q.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:Q.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:Q.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:Q.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:Q.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:Q.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:Q.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:Q.date}];e.lines.slice(0,6).forEach((d,p)=>{const u=33+p*8.5;o.push({id:`line${p}_name`,label:`明細${p+1} 品名`,x:5,y:u,fontSize:7.5,value:d.productName+(d.spec?` ${d.spec}`:""),color:Q.detail},{id:`line${p}_code`,label:`明細${p+1} CD`,x:64,y:u,fontSize:7.5,value:d.productCode,color:Q.detail},{id:`line${p}_qty`,label:`明細${p+1} 数量`,x:124,y:u,fontSize:8,value:d.quantity>0?String(d.quantity):"",color:Q.detail},{id:`line${p}_price`,label:`明細${p+1} 原単価`,x:163,y:u,fontSize:8,value:d.unitPrice>0?d.unitPrice.toLocaleString("ja-JP"):"",color:Q.detail},{id:`line${p}_amount`,label:`明細${p+1} 原価金額`,x:176,y:u,fontSize:8,value:d.amount>0?d.amount.toLocaleString("ja-JP"):"",color:Q.detail},{id:`line${p}_retail`,label:`明細${p+1} 売単価`,x:193,y:u,fontSize:8,value:d.retailPrice?d.retailPrice.toLocaleString("ja-JP"):"",color:Q.detail})});const l=e.lines.reduce((d,p)=>d+(p.amount||0),0),r=e.lines.reduce((d,p)=>d+p.quantity,0);return o.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(r),color:Q.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:l.toLocaleString("ja-JP"),color:Q.total}),s&&o.forEach(d=>{const p=s[d.id];p&&(d.x=p.x,d.y=p.y)}),o}function xr(e,t,s,o,l){const d=wr(e,t,o).map(u=>`
      <div class="fd-field ${l?"fd-draggable":""}"
           data-fd-id="${u.id}"
           style="left:${u.x}mm; top:${u.y}mm; font-size:${u.fontSize}pt; --fd-color:${u.color};"
           title="${u.label} (${u.x.toFixed(1)}, ${u.y.toFixed(1)})">
        ${l?`<span class="fd-badge">${u.label}</span>`:""}
        <span class="fd-value">${u.value}</span>
      </div>
    `).join(""),p=s.showReferenceOverlay&&s.overlayImageUrl?`background-image: url('${s.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
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
        <div class="fd-canvas" style="${p}">
          ${d}
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
        <label><input type="checkbox" data-print-opt="showReferenceOverlay" ${s.showReferenceOverlay?"checked":""} /> 参考画像表示</label>
        <label style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px;">濃さ</span>
          <input type="range" min="0" max="1" step="0.05" value="${s.overlayOpacity}" data-print-opt="overlayOpacity" style="width:140px;" />
        </label>
      </div>
    </section>
  `}function Bt(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(s=>{const o=s.dataset.fdId??"",l=parseFloat(s.style.left)||0,r=parseFloat(s.style.top)||0;t[o]={x:l,y:r}}),t}function Sr(e,t,s){const o=[...new Set(e.map(c=>c.areaCode).filter(Boolean))].sort(),l=[...new Set(e.map(c=>c.businessTypeName||c.businessType).filter(Boolean))].sort(),r=e.filter(c=>c.isAtRisk),d=e.filter(c=>!c.isAtRisk&&c.isDormant),p=e.filter(c=>!c.isAtRisk&&!c.isDormant&&c.amount12m>0),u=e.filter(c=>!c.isAtRisk&&!c.isDormant&&c.amount12m===0),y=t.filter(c=>c.lat&&c.lng),n=JSON.stringify(e),i=JSON.stringify(y.map(c=>({name:c.name,address:c.address,lat:c.lat,lng:c.lng,phone:c.phone})));return`
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
      <button class="button ${s.filterStatus==="all"?"primary":"secondary"} small" type="button" data-map-status="all">すべて</button>
      <button class="button ${s.filterStatus==="at-risk"?"primary":"secondary"} small" type="button" data-map-status="at-risk">🔴 離反リスク</button>
      <button class="button ${s.filterStatus==="dormant"?"primary":"secondary"} small" type="button" data-map-status="dormant">🟠 休眠</button>
      <button class="button ${s.filterStatus==="active"?"primary":"secondary"} small" type="button" data-map-status="active">🔵 取引中</button>
      <button class="button ${s.filterStatus==="inactive"?"primary":"secondary"} small" type="button" data-map-status="inactive">⚪ 売上なし</button>
      <select id="map-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${o.map(c=>`<option value="${c}" ${s.filterArea===c?"selected":""}>${c}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${l.map(c=>`<option value="${c}" ${s.filterBiz===c?"selected":""}>${c}</option>`).join("")}
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
      const ALL_CUSTOMERS = ${n};
      const DELIVERIES    = ${i};

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
    <\/script>`}const kr={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},Pr=["new","picking","packed","shipped","delivered"];function Ar(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(r=>t[r.stage].push(r));const s=Pr.map(r=>{const d=kr[r],p=t[r];return`
      <div class="wf-col" data-wf-stage="${r}">
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
    `}).join(""),o=e.reduce((r,d)=>r+d.totalAmount,0),l=e.filter(r=>r.priority==="urgent").length;return`
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
        ${s}
      </div>
    </section>
  `}function Cr(e,t,s){const o=e.cart.reduce((r,d)=>r+d.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((r,d)=>r+d.quantity,0)}<br/>
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

      ${Er(e,t,s)}
    </div>
  `}function Er(e,t,s){if(e.step==="customer"){const o=e.customerQuery.toLowerCase(),l=o?t.filter(r=>r.name.toLowerCase().includes(o)||r.code.toLowerCase().includes(o)):t.slice(0,20);return`
      <section class="panel">
        <input id="mo-customer-q" type="text" placeholder="顧客名・コード検索" value="${e.customerQuery}" class="mo-search" />
        <div class="mo-list">
          ${l.slice(0,30).map(r=>`
            <button class="mo-item ${e.selectedCustomer?.id===r.id?"selected":""}" data-mo-select-customer="${r.id}">
              <div class="mo-item-title">${r.name}</div>
              <div class="mo-item-sub mono">${r.code}</div>
            </button>
          `).join("")}
        </div>
      </section>
      ${e.selectedCustomer?'<div class="mo-footer"><button class="button primary mo-next" data-mo-step="products">商品選択へ ▶</button></div>':""}
    `}if(e.step==="products"){const o=e.productQuery.toLowerCase(),l=o?s.filter(r=>r.name.toLowerCase().includes(o)||r.code.toLowerCase().includes(o)):s.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${l.slice(0,50).map(r=>{const d=e.cart.find(p=>p.productCode===r.code);return`
              <div class="mo-item mo-product-item">
                <div style="flex:1;">
                  <div class="mo-item-title">${r.name}</div>
                  <div class="mo-item-sub">${r.category} / JAN ${r.janCode||"―"}</div>
                </div>
                ${d?`<div class="mo-qty-ctrl">
                      <button data-mo-qty="-1" data-mo-product="${r.code}">−</button>
                      <span>${d.quantity}</span>
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
  `}const ns={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},os={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},is={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function Lr(e,t){const s=e.find(r=>r.id===t)??e[0],o=e.filter(r=>r.status==="new").length,l=e.filter(r=>r.status==="confirmed").length;return`
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
          ${e.map(r=>`
            <button class="tour-item ${s?.id===r.id?"active":""}" data-tour-id="${r.id}">
              <div class="tour-item-head">
                <strong>${r.name}</strong>
                <span class="status-pill ${os[r.status]}">${ns[r.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${is[r.language]} · 👥 ${r.partySize}名
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
            <span class="status-pill ${os[s.status]}">${ns[s.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${s.email}${s.phone?` / ${s.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${s.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${s.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${is[s.language]}</dd></div>
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
  `}const Dr=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,qr=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Ir(e,t){const s=t?e.find(l=>l.id===t):null,o=t==="__new__";return`
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

    ${s||o?`
      <section class="panel">
        <div class="panel-header">
          <h2>${o?"新規送信元":"編集"}: ${s?.name??""}</h2>
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
  `}function Tr(e,t,s,o){const[l,r]=t.split("-").map(D=>parseInt(D,10)),d=new Date(l,r-1,1),p=new Date(l,r,0),u=d.getDay(),y=p.getDate(),n=[];for(let D=0;D<u;D++)n.push({isOutside:!0});for(let D=1;D<=y;D++)n.push({date:new Date(l,r-1,D)});for(;n.length%7!==0;)n.push({isOutside:!0});const i=s?e.filter(D=>D.category===s):e,c={};i.forEach(D=>{const N=D.startsAt.slice(0,10);c[N]??=[],c[N].push(D)});const m=new Date().toISOString().slice(0,10),h=n.map(D=>{if(D.isOutside)return'<div class="cal-cell cal-outside"></div>';const N=D.date,E=`${N.getFullYear()}-${String(N.getMonth()+1).padStart(2,"0")}-${String(N.getDate()).padStart(2,"0")}`,P=c[E]??[],R=E===m,A=N.getDay();return`
        <div class="cal-cell ${R?"cal-today":""} ${A===0?"cal-sun":A===6?"cal-sat":""}"
             data-cal-date="${E}">
          <div class="cal-day-num">${N.getDate()}</div>
          <div class="cal-events">
            ${P.slice(0,3).map(I=>`
              <button class="cal-event" data-cal-event-id="${I.id}"
                      style="background:${I.color||ka[I.category]||"#0F5B8D"};"
                      title="${I.title}">
                <span class="cal-event-time">${I.isAllDay?"終日":new Date(I.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${I.title}</span>
              </button>
            `).join("")}
            ${P.length>3?`<button class="cal-event-more" data-cal-date="${E}">+${P.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),g=o?.isOpen?Nr(o):"",v=new Date(l,r-2,1),_=new Date(l,r,1),$=`${v.getFullYear()}-${String(v.getMonth()+1).padStart(2,"0")}`,S=`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`,L=(()=>{const D=new Date;return`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}`})();return`
    <section class="page-head">
      <div>
        <p class="eyebrow">カレンダー</p>
        <h1>${l}年 ${r}月</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="cal-new">＋ 予定追加</button>
      </div>
    </section>

    <section class="panel">
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="button secondary" data-action="cal-prev" data-ym="${$}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${L}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${S}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(Sa).map(([D,N])=>`<option value="${D}" ${s===D?"selected":""}>${N}</option>`).join("")}
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
        ${h}
      </div>
    </section>

    ${g}
  `}function Nr(e){const t=e.event;return`
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
                ${Object.entries(Sa).map(([s,o])=>`<option value="${s}" ${t.category===s?"selected":""}>${o}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?ls(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?ls(t.endsAt):""}" />
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
  `}function ls(e){const t=new Date(e),s=o=>String(o).padStart(2,"0");return`${t.getFullYear()}-${s(t.getMonth()+1)}-${s(t.getDate())}T${s(t.getHours())}:${s(t.getMinutes())}`}const We={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function Mr(e,t){const s=t?e.find(o=>o.id===t):null;return`
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

    ${s?`
      <section class="panel">
        <div class="panel-header">
          <h2>${s.name} の設定</h2>
        </div>
        <p class="form-hint">${We[s.provider]?.description??""}</p>
        ${We[s.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${We[s.provider].setupUrl}" target="_blank">${We[s.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(We[s.provider]?.fields??[]).map(o=>`
            <label class="field" style="flex:1 1 100%;">
              <span>${o.label}</span>
              <input id="int-${o.key}" type="text" value="${s.config[o.key]??""}" placeholder="${o.placeholder}" />
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
  `}function Rr(e,t){const s=e.reduce((r,d)=>r+d.totalAmount,0),o=e.filter(r=>r.financialStatus==="paid").length,l=e.filter(r=>r.fulfillmentStatus!=="fulfilled"&&r.fulfillmentStatus!=="shipped").length;return`
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
                <td style="font-size:12px;">${r.lineItems.map(d=>`${d.name} ×${d.quantity}`).join("<br/>")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Or(e,t,s){return`
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
  `}function jr(e,t,s){const o=t==="__new__"?null:e.find(d=>d.id===t),l=t==="__new__";return s?.role==="admin"?`
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
                <td><strong>${d.displayName}</strong>${d.id===s?.id?'<span style="color:var(--primary);font-size:11px;"> (あなた)</span>':""}</td>
                <td class="mono" style="font-size:12px;">${d.email}</td>
                <td>${St[d.department]}</td>
                <td>${xt[d.role]}</td>
                <td style="font-size:12px;">${d.lastSignInAt?d.lastSignInAt.slice(0,16).replace("T"," "):"―"}</td>
                <td>${d.isActive?'<span class="status-pill success">有効</span>':'<span class="status-pill neutral">無効</span>'}</td>
                <td>
                  <button class="button-sm secondary" data-action="user-edit" data-id="${d.id}">編集</button>
                  ${d.id!==s?.id?`<button class="button-sm secondary" data-action="user-delete" data-id="${d.id}" style="color:var(--danger);">削除</button>`:""}
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
              ${Object.entries(St).map(([d,p])=>`<option value="${d}" ${o?.department===d?"selected":""}>${p}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(xt).map(([d,p])=>`<option value="${d}" ${o?.role===d?"selected":""}>${p}</option>`).join("")}
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
    `}function Fr(e,t,s){return e?`
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
        <div><dt>部署</dt><dd>${St[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${xt[e.role]}</dd></div>
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
          ${s.map(o=>`<option value="${o.id}" ${e.defaultMailSenderId===o.id?"selected":""}>${o.name} &lt;${o.email}&gt;</option>`).join("")}
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
    `}function zr(e){const t={};return e.forEach(s=>{const o=s.userEmail??"(anonymous)";t[o]=(t[o]??0)+1}),`
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
  `}function Br(e){const t=e.prospects.reduce((r,d)=>r+d.expectedAmount,0),s=e.prospects.reduce((r,d)=>r+d.expectedAmount*d.probability/100,0),o=e.prospects.filter(r=>r.stage==="won").length,l=e.prospects.filter(r=>r.stage==="hot"||r.stage==="negotiating").length;return`
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

    ${e.viewMode==="kanban"?Vr(e.prospects):Jr(e.prospects)}

    ${Yr(e)}
  `}function Vr(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(o=>{const l=e.filter(d=>d.stage===o),r=l.reduce((d,p)=>d+p.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${o}">
          <div class="pk-col-header" style="--pk-color:${Pa[o]};">
            <span class="pk-col-label">${Lt[o]}</span>
            <span class="pk-col-count">${l.length}</span>
          </div>
          <div class="pk-col-sub">¥${r.toLocaleString("ja-JP")}</div>
          <div class="pk-col-body">
            ${l.length===0?'<div class="wf-empty">―</div>':l.map(d=>`
              <div class="pk-card" data-prospect-id="${d.id}" draggable="true">
                <div class="pk-card-company">${d.companyName}</div>
                <div class="pk-card-meta">${d.businessType??""} ${d.contactName?"· "+d.contactName:""}</div>
                <div class="pk-card-amount">¥${d.expectedAmount.toLocaleString("ja-JP")} <span style="color:var(--text-secondary);">(${d.probability}%)</span></div>
                ${d.nextAction?`<div class="pk-card-action">🎯 ${d.nextAction}${d.nextActionDate?" ("+d.nextActionDate+")":""}</div>`:""}
                ${d.assignedStaffCode?`<div class="pk-card-staff">👤 ${d.assignedStaffCode}</div>`:""}
              </div>
            `).join("")}
          </div>
        </div>
      `}).join("")}</div>
    </section>
  `}function Jr(e){return`
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
                <td><span class="status-pill" style="background:${Pa[t.stage]};color:white;">${Lt[t.stage]}</span></td>
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
  `}function Yr(e){if(!e.editingId)return"";const t=e.editingId==="__new__",s=t?null:e.prospects.find(o=>o.id===e.editingId);return!t&&!s?"":`
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
                ${["","飲食店","酒店","百貨店","スーパー","宿泊","小売","卸","その他"].map(o=>`<option value="${o}" ${s?.businessType===o?"selected":""}>${o||"―"}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>ステージ</span>
              <select id="prospect-stage">
                ${Object.entries(Lt).map(([o,l])=>`<option value="${o}" ${s?.stage===o?"selected":""}>${l}</option>`).join("")}
              </select>
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>流入元</span>
              <select id="prospect-source">
                ${["","展示会","紹介","WEB","コールド","問合せ","リピート"].map(o=>`<option value="${o}" ${s?.source===o?"selected":""}>${o||"―"}</option>`).join("")}
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
          ${t?"":`<button class="button secondary" data-action="prospect-convert" data-id="${s.id}" style="margin-right:auto;">🎯 得意先化</button>`}
          <button class="button secondary" data-action="prospect-close">キャンセル</button>
          <button class="button primary" data-action="prospect-save" data-id="${s?.id??""}">保存</button>
        </div>
      </div>
    </div>
  `}function Ur(e,t,s){const o=e?.config.webhook_url??"",l=e?.config.default_channel??"#general";return`
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
            ${t.map(r=>`
              <tr>
                <td>${kt[r.eventType]||r.eventType}</td>
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
                <td>${kt[r.eventType]||r.eventType}</td>
                <td class="mono" style="font-size:12px;">${r.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${r.message}</td>
                <td><span class="status-pill ${r.status==="sent"?"success":"warning"}">${r.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Qr(e,t,s,o){const l=new Map(t.map(i=>[i.code,i])),r=e.filter(i=>i.callDirection==="inbound").length,d=e.filter(i=>i.callDirection==="outbound").length,p=e.filter(i=>i.callStatus==="missed").length,u=e.reduce((i,c)=>i+(c.durationSeconds??0),0),y=i=>{if(i===0)return"―";const c=Math.floor(i/60),m=i%60;return c>0?`${c}分${m}秒`:`${m}秒`},n=i=>{if(i.matchedCustomerCode){const c=l.get(i.matchedCustomerCode);if(c)return`${c.name} (既存)`}return"未登録番号"};return`
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
        <p class="kpi-value">${r}件</p>
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
            ${e.map(i=>`
              <tr>
                <td style="font-size:12px;">${i.startedAt?new Date(i.startedAt).toLocaleString("ja-JP"):"―"}</td>
                <td>
                  ${i.callDirection==="inbound"?'<span class="status-pill neutral">📞 着信</span>':'<span class="status-pill neutral">📤 発信</span>'}
                </td>
                <td>
                  <strong>${n(i)}</strong>
                  ${i.matchedCustomerCode?`<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${i.matchedCustomerCode}</span>`:""}
                </td>
                <td class="mono" style="font-size:12px;">${i.callDirection==="inbound"?i.fromNumber:i.toNumber}</td>
                <td>
                  ${i.callStatus==="missed"?'<span class="status-pill warning">不在着信</span>':i.callStatus==="answered"?'<span class="status-pill success">応答</span>':`<span class="status-pill neutral">${i.callStatus}</span>`}
                </td>
                <td>${y(i.durationSeconds??0)}</td>
                <td>${i.recordingUrl?`<a href="${i.recordingUrl}" target="_blank" class="button-sm secondary">🎧 再生</a>`:"―"}</td>
                <td>
                  ${i.matchedCustomerCode?"":`<button class="button-sm secondary" data-action="call-link-customer" data-id="${i.id}" data-phone="${i.callDirection==="inbound"?i.fromNumber:i.toNumber}">顧客に紐付け</button>`}
                  <button class="button-sm secondary" data-action="call-memo" data-id="${i.id}">メモ</button>
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
  `}const Hr=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function Gr(e){const t=e.activeListId?e.lists.find(r=>r.id===e.activeListId):null,s=e.items.filter(r=>r.status==="new").length,o=e.items.filter(r=>r.status==="imported").length,l=e.items.filter(r=>r.status==="excluded").length;return`
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
            ${Hr.map(r=>`<option value="${r}" ${e.searchBusinessType===r?"selected":""}>${r}</option>`).join("")}
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
                ${e.searchResults.map((r,d)=>`
                  <tr>
                    <td><input type="checkbox" class="lb-search-check" data-idx="${d}" checked /></td>
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
            <span>✅ 取込済: <strong>${o}</strong></span>
            <span>❌ 除外: <strong>${l}</strong></span>
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
  `}const rs={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Xr={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},Kr={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function te(e){return"¥"+e.toLocaleString("ja-JP")}function st(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Sn(e,t){const s=e.reduce((r,d)=>r+d.amount,0),o=Math.floor(s*t),l=s+o;return{subtotal:s,taxAmount:o,total:l}}const V={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function U(e,t){const s=e.align??"left",o=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${s}`,`font-size:${o}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function Vt(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),s=t.getFullYear(),o=s-2018;return{y:o>0?String(o).padStart(2,"0"):String(s).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function Wr(e,t,s){const o=Vt(e.documentDate),l=Vt(e.orderDate??e.documentDate),r=Vt(e.deliveryDate??e.documentDate),d=e.lines.slice(0,6).map((v,_)=>{const $=V.detailStartY+_*V.detailRowH,S=V.detailCols,L=[],D=(N,E)=>{E&&L.push(U({...N,y:$,x:N.x+0},E))};return D(S.productName,v.productName+(v.spec?` ${v.spec}`:"")),D(S.productCode,v.productCode),D(S.color,v.color??""),D(S.size,[v.size,v.caseQty?`×${v.caseQty}`:""].filter(Boolean).join(" ")),D(S.unit,v.unit),D(S.quantity,v.quantity>0?v.quantity.toLocaleString("ja-JP"):""),D(S.correctedQty,v.correctedQuantity?v.correctedQuantity.toLocaleString("ja-JP"):""),D(S.discount,v.discount?v.discount.toLocaleString("ja-JP"):""),D(S.unitPrice,v.unitPrice>0?v.unitPrice.toLocaleString("ja-JP"):""),D(S.costAmount,v.amount>0?v.amount.toLocaleString("ja-JP"):""),D(S.retailPrice,v.retailPrice?v.retailPrice.toLocaleString("ja-JP"):""),D(S.note,v.receivedAmount?v.receivedAmount.toLocaleString("ja-JP"):""),L.join("")}).join(""),p=e.lines.reduce((v,_)=>v+(_.amount||0),0),u=e.lines.reduce((v,_)=>v+(_.retailPrice||0)*(_.correctedQuantity??_.quantity),0),y=e.lines.reduce((v,_)=>v+(_.receivedAmount||0),0),n=e.lines.reduce((v,_)=>v+(_.returnAmount||0),0),i=e.lines.reduce((v,_)=>v+_.quantity,0),c=s.showReferenceOverlay?`background-image: url('${s.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",m=s.calibrationOffsetX||0,h=s.calibrationOffsetY||0,g=`transform: translate(${m}mm, ${h}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${c}">
        ${s.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-s.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${g}">
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
        ${U(V.deliveryDateY,r.y)}
        ${U(V.deliveryDateM,r.m)}
        ${U(V.deliveryDateD,r.d)}
        ${U(V.orderNo,e.orderNo??"")}
        ${U(V.partnerCode,e.vendorCode??"")}

        ${d}

        ${U(V.totalQty,i.toLocaleString("ja-JP"))}
        ${U(V.receivedTotal,y.toLocaleString("ja-JP"))}
        ${U(V.returnTotal,n.toLocaleString("ja-JP"))}
        ${U(V.correctedCostTotal,p.toLocaleString("ja-JP"))}
        ${U(V.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function Zr(e,t,s){const{subtotal:o,taxAmount:l,total:r}=Sn(e.lines,e.taxRate),d=e.previousBalance??0,p=e.paymentAmount??0,u=d-p+r,y=e.lines.map(i=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${i.note??""}</td>
        <td>${i.productName}${i.spec?` <span style="color:#636e72;font-size:9pt;">/ ${i.spec}</span>`:""}</td>
        <td class="numeric">${i.quantity.toLocaleString("ja-JP")}</td>
        ${s.showUnit?`<td>${i.unit}</td>`:""}
        <td class="numeric">${te(i.unitPrice)}</td>
        <td class="numeric">${te(i.amount)}</td>
      </tr>
    `).join(""),n=Array.from({length:Math.max(0,6-e.lines.length)}).map(()=>`
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
        <tbody>${y}${n}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${s.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${te(o)} / 消費税: ${te(l)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${d?`<tr><th>前回御請求額</th><td>${te(d)}</td></tr>`:""}
          ${p?`<tr><th>ご入金額</th><td>▲ ${te(p)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${te(o)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${te(l)}</td></tr>
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
  `}function ec(e,t,s){const{subtotal:o,taxAmount:l,total:r}=Sn(e.lines,e.taxRate),d=e.lines.map(u=>`
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
        <tbody>${d}${p}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${s.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${te(o)} / 消費税: ${te(l)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${te(o)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${te(l)}</td></tr>
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
  `}function tc(e,t,s,o){let l="";switch(e){case"chain_store":l=Wr(o,s,t);break;case"quotation":l=ec(o,s,t);break;case"invoice_monthly":l=Zr(o,s,t);break}const r=Object.keys(rs).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${rs[u]}</button>`).join(""),d=o.lines.map((u,y)=>`
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
  `}const ac={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},sc={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function nc(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let s=[],o="",l=!1;for(let p=0;p<e.length;p++){const u=e[p];l?u==='"'?e[p+1]==='"'?(o+='"',p++):l=!1:o+=u:u==='"'?l=!0:u===","?(s.push(o),o=""):u===`
`||u==="\r"?(u==="\r"&&e[p+1]===`
`&&p++,s.push(o),s.some(y=>y!=="")&&t.push(s),s=[],o=""):o+=u}if((o!==""||s.length>0)&&(s.push(o),s.some(p=>p!=="")&&t.push(s)),t.length===0)return{columns:[],rows:[]};const r=t[0].map(p=>p.trim()),d=[];for(let p=1;p<t.length;p++){const u={};r.forEach((y,n)=>{u[y]=(t[p][n]??"").trim()}),d.push(u)}return{columns:r,rows:d}}function oc(e,t,s){const o=ac[e],l=o.filter(p=>!t.includes(p)),r=s.map(p=>{const u=[];l.length>0&&u.push(`必須列欠損: ${l.join(",")}`);for(const y of o)t.includes(y)&&!p[y]&&u.push(`${y}が空`);return{...p,_valid:u.length===0,_error:u[0]}}),d=r.filter(p=>p._valid).length;return{entity:e,columns:t,rows:r,totalRows:s.length,validRows:d,invalidRows:r.length-d}}function ic(e){const s=sc[e],l={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+s.join(",")+`
`+l.join(",")+`
`}async function lc(e,t){const{supabaseInsert:s}=await x(async()=>{const{supabaseInsert:p}=await Promise.resolve().then(()=>F);return{supabaseInsert:p}},void 0);let o=0,l=0;const d={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const p of t){if(!p._valid)continue;const{_valid:u,_error:y,...n}=p,i={...n};if(!i.id){const c=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";i.id=String(n[c]??`${e}-${Date.now()}-${o+l}`)}for(const c of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof i[c]=="string"&&i[c]!==""){const m=Number(i[c]);Number.isFinite(m)&&(i[c]=m)}try{await s(d,i)!==null?o++:l++}catch{l++}}return{inserted:o,failed:l}}function Jt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function rc(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function cc(e,t,s,o,l){const r=s.reduce((y,n)=>y+n.rowCount,0),d=s.map(y=>y.lastSyncAt).filter(y=>y!==null).sort().reverse()[0]??null,p=100,u=Math.max(1,Math.ceil(l/p));return`
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
        <p class="kpi-value">${d?Jt(d):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${y.lastSyncAt?Jt(y.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${s.find(y=>y.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${l.toLocaleString("ja-JP")}件中 ${((o-1)*p+1).toLocaleString("ja-JP")}-${Math.min(o*p,l).toLocaleString("ja-JP")} を表示</p>
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
              <td>${y._synced_at?Jt(y._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${y._raw_b64?y._raw_b64.slice(0,200):""}">${rc(y._raw_b64)}</td>
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
  `}const oa=400,ia=240;function J(e){return e.toLocaleString("ja-JP")}function Yt(e){const[t,s]=e.split("-");return`${t.slice(2)}/${s}`}function dc(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function fe(e,t,s,o=""){return`<th class="${o}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${dc(s,t)}</th>`}function Ze(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function uc(e){const{months:t,matrix:s}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const o=e.products.slice().sort((_,$)=>(e.productTotals[$.code]??0)-(e.productTotals[_.code]??0)).slice(0,6),l=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],r=820,d=280,p={top:20,right:20,bottom:40,left:60},u=r-p.left-p.right,y=d-p.top-p.bottom,n=t.map(_=>o.reduce(($,S)=>$+(s[S.code]?.[_]??0),0)),i=Math.max(...n,1),c=u/t.length,m=Math.max(c-10,14),h=[0,.25,.5,.75,1].map(_=>{const $=p.top+y-y*_,S=`${Math.round(i*_/100)*100}`;return`
      <line x1="${p.left}" y1="${$}" x2="${r-p.right}" y2="${$}" class="chart-grid" />
      <text x="6" y="${$+4}" class="chart-axis">${Number(S).toLocaleString("ja-JP")}</text>
    `}).join(""),g=t.map((_,$)=>{let S=p.top+y;const L=p.left+$*c+(c-m)/2,D=o.map((I,j)=>{const H=(s[I.code]?.[_]??0)/i*y;return S-=H,`<rect x="${L}" y="${S}" width="${m}" height="${H}" fill="${l[j%l.length]}" opacity="0.85" rx="${j===o.length-1?3:0}" />`}).join(""),[N,E]=_.split("-"),P=parseInt(E),R=P===1||$%3===0,A=P===1?`${N.slice(2)}年`:`${P}月`;return`<g>${D}${R?`<text x="${L+m/2}" y="${d-10}" class="chart-axis centered-axis">${A}</text>`:""}</g>`}).join(""),v=o.map((_,$)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${l[$%l.length]};"></span>
       ${_.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${d}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${h}${g}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${p.left}px;display:flex;flex-wrap:wrap;">${v}</div>
  `}function pc(e){const{months:t,products:s}=e,o=s.slice().sort((d,p)=>(e.productTotals[p.code]??0)-(e.productTotals[d.code]??0)).slice(0,50),l=t.map(d=>{const[p,u]=d.split("-"),y=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${y===1?`${p.slice(2)}年1月`:`${y}月`}</th>`}).join(""),r=o.map(d=>{const p=t.map(u=>{const y=e.matrix[d.code]?.[u]??0;return`<td class="numeric">${y>0?J(y):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${d.code}</td>
        <td style="white-space:nowrap;">${d.name}</td>
        ${p}
        <td class="numeric"><strong>${J(e.productTotals[d.code]??0)}</strong></td>
        <td class="numeric">${J(Math.round(e.productAvg[d.code]??0))}</td>
        <td class="numeric">${J(Math.round(e.productStdDev[d.code]??0))}</td>
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
        <tbody>${r||`<tr><td colspan="${t.length+5}" class="empty-row">データなし</td></tr>`}</tbody>
      </table>
    </div>
  `}function mc(e,t){const s=e.months[e.months.length-1]??"",o=e.months[e.months.length-2]??"",l=e.months.length-13,r=l>=0?e.months[l]:"",d=e.products.reduce((m,h)=>m+(e.matrix[h.code]?.[s]??0),0),p=e.products.reduce((m,h)=>m+(e.matrix[h.code]?.[o]??0),0),u=r?e.products.reduce((m,h)=>m+(e.matrix[h.code]?.[r]??0),0):0,y=p>0?(d-p)/p*100:0,n=u>0?(d-u)/u*100:0,i=m=>m>=0?"+":"",c=[1,2,3,5].map(m=>`<option value="${m}" ${m===t?"selected":""}>${m}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${J(d)} 本</p>
        <p class="kpi-sub">${Yt(s)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${y>=0?"":"text-danger"}">${i(y)}${y.toFixed(1)}%</p>
        <p class="kpi-sub">${Yt(o)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${n>=0?"":"text-danger"}">${u>0?`${i(n)}${n.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${r?`${Yt(r)} 比`:"前年データなし"}</p>
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
            <select data-action="demand-years-back" style="width:80px;">${c}</select>
          </label>
          <button class="button secondary" type="button" data-action="demand-csv-export">CSV出力</button>
        </div>
      </div>
      ${uc(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${pc(e)}
    </section>
  `}function yc(e,t){const o=e.slice().sort((r,d)=>{if(!t)return 0;const p=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return p*r.productName.localeCompare(d.productName,"ja");case"ss-avg":return p*(r.avgMonthlyDemand-d.avgMonthlyDemand);case"ss-std":return p*(r.demandStdDev-d.demandStdDev);case"ss-ss":{const u=Math.ceil(Ze(r.serviceLevel)*r.demandStdDev*Math.sqrt(r.leadTimeDays/30)),y=Math.ceil(Ze(d.serviceLevel)*d.demandStdDev*Math.sqrt(d.leadTimeDays/30));return p*(u-y)}case"ss-rop":{const u=Math.ceil(r.avgMonthlyDemand*(r.leadTimeDays/30)+Ze(r.serviceLevel)*r.demandStdDev*Math.sqrt(r.leadTimeDays/30)),y=Math.ceil(d.avgMonthlyDemand*(d.leadTimeDays/30)+Ze(d.serviceLevel)*d.demandStdDev*Math.sqrt(d.leadTimeDays/30));return p*(u-y)}default:return 0}}).map(r=>{const d=Ze(r.serviceLevel),p=r.leadTimeDays/30,u=Math.ceil(d*r.demandStdDev*Math.sqrt(p)),y=Math.ceil(r.avgMonthlyDemand*p+u),n=u-r.safetyStockQty,i=n>0?"text-danger":n<-u*.3?"text-warning":"",c=[.9,.95,.99].map(m=>`<option value="${m}" ${Math.abs(r.serviceLevel-m)<.01?"selected":""}>${(m*100).toFixed(0)}%</option>`).join("");return`
      <tr>
        <td style="white-space:nowrap;">${r.productName}</td>
        <td class="numeric">${J(Math.round(r.avgMonthlyDemand))}</td>
        <td class="numeric">${J(Math.round(r.demandStdDev))}</td>
        <td>
          <input class="input-sm" type="number" min="1" max="180"
            value="${r.leadTimeDays}"
            data-action="ss-lead-time" data-code="${r.productCode}"
            style="width:60px;text-align:right;" />
        </td>
        <td>
          <select class="input-sm" data-action="ss-service-level" data-code="${r.productCode}"
            style="width:64px;">${c}</select>
        </td>
        <td class="numeric"><strong>${J(u)}</strong></td>
        <td class="numeric">${J(y)}</td>
        <td class="numeric ${i}">
          ${n>0?`+${J(n)}`:J(n)}
          ${n>0?'<span class="status-pill warning" style="margin-left:4px">不足</span>':""}
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
          <tbody>${o||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const hc={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function fc(e,t,s,o){const l={draft:"下書き",confirmed:"確定",actual:"実績入力済"},r={draft:"neutral",confirmed:"info",actual:"success"},d=E=>Object.entries(hc).map(([P,R])=>`<option value="${P}" ${P===E?"selected":""}>${R}</option>`).join(""),p=640,u=E=>E.map(P=>{const R=Math.max(0,P.demandForecast+P.safetyStockTarget-P.openingStock),A=P.plannedQty>0?P.plannedQty:Math.round(R),I=A>0?Math.ceil(A/p*10)/10:0,j=P.plannedQty>0?(P.actualQty-P.plannedQty)/P.plannedQty*100:null,K=j!==null?j>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${P.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${P.productCode}"
            style="width:92px;">${d(P.productionType)}</select>
        </td>
        <td class="numeric">${J(Math.round(P.demandForecast))}</td>
        <td class="numeric">${J(Math.round(P.safetyStockTarget))}</td>
        <td class="numeric">${J(Math.round(P.openingStock))}</td>
        <td class="numeric"><strong>${J(Math.round(R))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${P.plannedQty}"
            data-action="plan-qty" data-code="${P.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">${P.actualQty>0?J(P.actualQty):"—"}</td>
        <td class="numeric ${K}">
          ${j!==null?`${j>=0?"+":""}${j.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${I>0?`${I.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${r[P.status]??"neutral"}">${l[P.status]??P.status}</span>
        </td>
      </tr>
    `}).join(""),n=(s==="all"?e:e.filter(E=>E.productionType===s)).slice().sort((E,P)=>{if(!o)return 0;const R=o.dir==="asc"?1:-1,A=Math.max(0,E.demandForecast+E.safetyStockTarget-E.openingStock),I=Math.max(0,P.demandForecast+P.safetyStockTarget-P.openingStock);switch(o.column){case"plan-name":return R*E.productName.localeCompare(P.productName,"ja");case"plan-forecast":return R*(E.demandForecast-P.demandForecast);case"plan-required":return R*(A-I);case"plan-planned":return R*(E.plannedQty-P.plannedQty);case"plan-actual":return R*(E.actualQty-P.actualQty);case"plan-label":{const j=E.plannedQty>0?E.plannedQty:Math.round(A),K=P.plannedQty>0?P.plannedQty:Math.round(I);return R*(j-K)}default:return 0}}),i=u(n),c=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],m=E=>{const R=(E==="all"?e:e.filter(A=>A.productionType===E)).reduce((A,I)=>{const j=Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock);return A+(I.plannedQty>0?I.plannedQty:Math.round(j))},0);return Math.ceil(R/p*10)/10},h=c.filter(E=>E.key!=="all").map(E=>{const P=m(E.key),R=e.filter(I=>I.productionType===E.key).length,A=E.key==="make_to_order"?e.filter(I=>I.productionType==="make_to_order"&&I.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${E.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${P>0?P.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${R}商品${A!==null?` · 受注${A}件`:""}</p>
      </div>
    `}).join(""),g=n.reduce((E,P)=>E+P.demandForecast,0),v=n.reduce((E,P)=>E+Math.max(0,P.demandForecast+P.safetyStockTarget-P.openingStock),0),_=n.reduce((E,P)=>E+P.plannedQty,0),$=n.reduce((E,P)=>E+P.actualQty,0),S=m(s),L=new Date,D=Array.from({length:24},(E,P)=>{const R=new Date(L.getFullYear(),L.getMonth()-6+P,1),A=`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}`;return`<option value="${A}" ${A===t?"selected":""}>${A.replace("-","年")}月</option>`}).join(""),N=c.map(E=>`<button class="button ${s===E.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${E.key}"
       style="padding:4px 12px;font-size:13px;">${E.label}</button>`).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${D}</select>
      </label>
      <button class="button secondary" type="button" data-action="plan-recalc">需要予測を再計算</button>
    </div>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>ラベル工数サマリ</h2><p class="panel-caption">表+裏 手貼り 80本/時 × 8h = 640本/人日</p></div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${h}</div>
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
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${N}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${fe("商品名","plan-name",o)}
              <th>生産区分</th>
              ${fe("需要予測","plan-forecast",o,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${fe("必要生産数","plan-required",o,"numeric")}
              ${fe("計画数","plan-planned",o,"numeric")}
              ${fe("実績数","plan-actual",o,"numeric")}
              <th class="numeric">達成率</th>
              ${fe("ラベル工数","plan-label",o,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${i||'<tr><td colspan="11" class="empty-row">データなし</td></tr>'}
            ${n.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${J(Math.round(g))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${J(Math.round(v))}</td>
                <td class="numeric">${J(_)}</td>
                <td class="numeric">${$>0?J($):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${S.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function kn(e){const[t,s]=e.split("-").map(Number),o=new Date(t,s,0).getDate();return Array.from({length:o},(l,r)=>{const d=r+1;return`${e}-${String(d).padStart(2,"0")}`})}function cs(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function ds(e){const t=new Date(e).getDay();return t===0||t===6}function vc(e){return e.partTimers*oa+e.employees*ia}function Pn(e){return e.partTimers+e.employees}function gc(e,t){const s=t.filter(d=>Pn(d)>0).map(d=>d.date).sort();if(s.length===0)return t.map(d=>({date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const o={monthly:0,november:1,annual:2,make_to_order:3},l=e.filter(d=>d.plannedQty>0||Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)>0).map(d=>({productCode:d.productCode,productName:d.productName,productionType:d.productionType,remaining:d.plannedQty>0?d.plannedQty:Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)})).filter(d=>d.remaining>0).sort((d,p)=>(o[d.productionType]??99)-(o[p.productionType]??99)||p.remaining-d.remaining),r=new Map;for(const d of t){const p=vc(d);r.set(d.date,{date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:p,items:[],totalQty:0,utilization:0})}for(const d of l){let p=d.remaining;if(p<=0)continue;if(s.reduce((y,n)=>{const i=r.get(n);return y+Math.max(0,i.capacity-i.totalQty)},0)<=0)break;for(const y of s){if(p<=0)break;const n=r.get(y),i=Math.max(0,n.capacity-n.totalQty);if(i<=0)continue;const c=Math.min(p,i);n.items.push({productCode:d.productCode,productName:d.productName,productionType:d.productionType,qty:c}),n.totalQty+=c,n.utilization=n.capacity>0?n.totalQty/n.capacity:0,p-=c}}return t.map(d=>r.get(d.date))}function wt(e,t=1,s=1){return kn(e).map(o=>({date:o,partTimers:ds(o)?0:t,employees:ds(o)?0:s,confirmed:!1}))}function bc(e,t,s,o=null){const l=kn(t),r=gc(e,s),d=new Map(r.map(A=>[A.date,A])),p=e.reduce((A,I)=>A+(I.plannedQty>0?I.plannedQty:Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock)),0),u=r.reduce((A,I)=>A+I.totalQty,0),y=s.filter(A=>Pn(A)>0).length,n=r.reduce((A,I)=>A+I.capacity,0),i=s.reduce((A,I)=>A+I.partTimers,0),c=s.reduce((A,I)=>A+I.employees,0),m=s.find(A=>A.partTimers>0)?.partTimers??1,h=s.find(A=>A.employees>0)?.employees??1,g=[0,1,2,3,4,5].map(A=>`<option value="${A}" ${A===m?"selected":""}>${A}</option>`).join(""),v=[0,1,2,3].map(A=>`<option value="${A}" ${A===h?"selected":""}>${A}</option>`).join(""),_=new Date,$=Array.from({length:24},(A,I)=>{const j=new Date(_.getFullYear(),_.getMonth()-6+I,1),K=`${j.getFullYear()}-${String(j.getMonth()+1).padStart(2,"0")}`;return`<option value="${K}" ${K===t?"selected":""}>${K.replace("-","年")}月</option>`}).join(""),S=new Date(l[0]).getDay(),L=[];for(let A=0;A<S;A++)L.push('<div style="min-height:44px;"></div>');for(const A of l){const I=d.get(A),j=new Date(A).getDay(),K=parseInt(A.split("-")[2]),H=I?.partTimers??0,ae=I?.employees??0,ce=H+ae,ge=I?.totalQty??0,de=I?.utilization??0,T=A===o,G=ce===0?"var(--surface-alt)":de>.95?"rgba(197,61,61,0.12)":de>.7?"rgba(183,121,31,0.10)":de>0?"rgba(47,133,90,0.08)":"var(--surface)",Ue=ce===0?"transparent":de>.95?"#c53d3d":de>.7?"#b7791f":de>0?"#2f855a":"var(--border)",De=j===0?"#c53d3d":j===6?"#0F5B8D":"var(--text)",qe=ce>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${H>0?`パ${H}`:""}${ae>0?`社${ae}`:""}</span>`:"";L.push(`
      <div data-action="cal-select-day" data-date="${A}"
        style="min-height:44px;padding:3px;border:${T?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${G};cursor:pointer;display:flex;flex-direction:column;
          ${T?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${De};line-height:1;">${K}</span>
          ${qe}
        </div>
        ${ce>0?`
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${ge>0?J(ge):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(de*100,100)}%;background:${Ue};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const N=L.length%7;if(N>0)for(let A=0;A<7-N;A++)L.push('<div style="min-height:44px;"></div>');const E=o?d.get(o):null;o&&s.find(A=>A.date===o);const P=o&&E?(()=>{const A=E,I=parseInt(o.split("-")[2]),j=cs(o),K=Math.round(A.utilization*100),H=s.find(T=>T.date===o),ae={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},ce={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},ge=A.items.map(T=>`
      <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
        <span style="width:8px;height:8px;border-radius:50%;background:${ae[T.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${T.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${ce[T.productionType]??T.productionType}</div>
        </div>
        <div style="font-size:14px;font-weight:700;white-space:nowrap;">${J(T.qty)}<span style="font-size:11px;font-weight:400;">本</span></div>
      </div>
    `).join(""),de=`パート${A.partTimers}人×${oa} + 社員${A.employees}人×${ia} = ${J(A.capacity)}本`;return`
      <section class="panel" style="margin-top:12px;border:2px solid #0F5B8D;">
        <div class="panel-header" style="padding-bottom:8px;">
          <h2>${I}日（${j}）の生産内訳</h2>
          <p class="panel-caption">${de} ・ 稼働率${K}%</p>
        </div>
        <div style="display:flex;gap:12px;padding:0 4px 8px;flex-wrap:wrap;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="${H?.partTimers??0}"
              data-action="cal-shift-part" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="${H?.employees??0}"
              data-action="cal-shift-emp" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
        ${A.items.length>0?`
          <div style="padding:0 4px;">
            ${ge}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${J(A.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():o?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(o.split("-")[2])}日（${cs(o)}）— 休日</p>
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
  `:"",R=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(A=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${A.color};"></span>${A.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${$}</select>
      </label>
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>パート</span>
        <select data-action="cal-default-part" style="width:54px;">${g}</select>
      </label>
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>社員</span>
        <select data-action="cal-default-emp" style="width:54px;">${v}</select>
      </label>
      <button class="button secondary" type="button" data-action="cal-reset-shifts"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">リセット</button>
      <button class="button primary" type="button" data-action="cal-confirm-all"
        style="margin-top:auto;padding:6px 10px;font-size:12px;">全日確定</button>
    </div>

    <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;font-size:12px;">
      <span><strong>${J(Math.round(p))}</strong>本予定</span>
      <span><strong>${J(Math.round(u))}</strong>本配分${p>0?`（${Math.round(u/p*100)}%）`:""}</span>
      <span><strong>${y}</strong>日稼働</span>
      <span>パ<strong>${i}</strong> 社<strong>${c}</strong>人日</span>
      <span>キャパ<strong>${J(n)}</strong>本</span>
    </div>
    <div style="font-size:10px;color:var(--text-secondary);margin-bottom:8px;">
      パート: 80本/時×5h=<strong>${oa}</strong>本/人日　社員: 80本/時×3h=<strong>${ia}</strong>本/人日
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${R}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((A,I)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${I===0?"#c53d3d":I===6?"#0F5B8D":"var(--text-secondary)"};">${A}</div>`).join("")}
        ${L.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">日付をタップで詳細表示</p>
    </section>

    ${P}
  `}function $c(e,t,s,o,l,r,d="all",p=null,u=[],y=null){const i=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(m=>`<button class="tab-button ${o===m.key?"active":""}"
       data-demand-tab="${m.key}">${m.label}</button>`).join("");let c="";if(o==="demand")c=e?mc(e,r):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(o==="safety")c=yc(t,p);else if(o==="plan")c=fc(s,l,d,p);else if(o==="calendar")try{c=bc(s,l,u,y)}catch(m){console.error("[renderCalendarTab] error:",m),c=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(m)}
${m?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${i}
    </div>

    ${c}
  `}const ot={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},It=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function Fe(e){return e.toLocaleString("ja-JP")}function ze(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function Da(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function _c(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function wc(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(v=>v.month))].sort(),s=It.filter(v=>e.some(_=>_.brewCategory===v)),o={};for(const v of e)o[v.month]||(o[v.month]={}),o[v.month][v.brewCategory]=v.shipmentMl;const l=820,r=300,d={top:20,right:20,bottom:50,left:70},p=l-d.left-d.right,u=r-d.top-d.bottom,y=t.map(v=>s.reduce((_,$)=>_+(o[v]?.[$]??0),0)),n=Math.max(...y,1),i=p/t.length,c=Math.max(i-8,14),m=[0,.25,.5,.75,1].map(v=>{const _=d.top+u-u*v,$=n*v/1e3;return`
      <line x1="${d.left}" y1="${_}" x2="${l-d.right}" y2="${_}" class="chart-grid" />
      <text x="6" y="${_+4}" class="chart-axis">${Math.round($).toLocaleString("ja-JP")}L</text>
    `}).join(""),h=t.map((v,_)=>{let $=d.top+u;const S=d.left+_*i+(i-c)/2,L=s.map(A=>{const I=o[v]?.[A]??0,j=I/n*u;return $-=j,j>0?`<rect x="${S}" y="${$}" width="${c}" height="${j}" fill="${ot[A]??"#9ca3af"}" opacity="0.85" rx="1"><title>${A}: ${ze(I)}L</title></rect>`:""}).join(""),[D,N]=v.split("-"),E=parseInt(N),P=E===10||_%2===0,R=E===10?`${D}年度`:`${E}月`;return`<g>${L}${P?`<text x="${S+c/2}" y="${r-12}" class="chart-axis centered-axis" style="font-size:10px;">${R}</text>`:""}</g>`}).join(""),g=s.map(v=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${ot[v]??"#9ca3af"};"></span>
       ${v}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${l} ${r}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${m}${h}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${d.left}px;display:flex;flex-wrap:wrap;">${g}</div>
  `}function xc(e){const t=new Map;for(const o of e){const l=o.brewCategory;t.has(l)||t.set(l,{rows:[],totalMl:0,avgMl:0,stockL:0,months:0});const r=t.get(l);r.rows.push(o),r.totalMl+=o.totalShipmentMl,r.avgMl+=o.monthlyAvgMl,r.stockL=o.currentStockL,r.months=o.monthsRemaining}for(const[,o]of t)o.avgMl>0&&(o.months=Math.round(o.stockL*1e3/o.avgMl*10)/10);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${It.filter(o=>t.has(o)).map(o=>{const l=t.get(o),r=ot[o]??"#9ca3af",d=Da(l.months),p=_c(l.months),u=Math.min(l.months/6*100,100);return`
        <div class="card" style="border-top:3px solid ${r};min-width:220px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${r};">${o}</h4>
            <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${d}20;color:${d};font-weight:600;">${p}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:12px;margin-bottom:8px;">
            <div><span style="color:#6b7280;">現在庫</span><br><strong>${Fe(l.stockL)}L</strong></div>
            <div><span style="color:#6b7280;">月平均移出</span><br><strong>${ze(l.avgMl)}L</strong></div>
          </div>
          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数</span>
            <span style="font-weight:600;color:${d};">${l.months.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${d};height:100%;width:${u}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function Sc(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const l of e)t.has(l.brewCategory)||t.set(l.brewCategory,[]),t.get(l.brewCategory).push(l);const s=`
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
  `,o=[];for(const l of It){const r=t.get(l);if(!r)continue;const d=ot[l]??"#9ca3af",p=r.length>1,u=r.reduce((v,_)=>v+_.totalShipmentQty,0),y=r.reduce((v,_)=>v+_.totalShipmentMl,0),n=r.reduce((v,_)=>v+_.monthlyAvgQty,0),i=r.reduce((v,_)=>v+_.monthlyAvgMl,0),c=r.reduce((v,_)=>v+_.productCount,0),m=r[0].currentStockL,h=i>0?Math.round(m*1e3/i*10)/10:0,g=Da(h);if(o.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${p?"pointer":"default"};" ${p?`data-toggle-cat="${l}"`:""}>
        <td style="color:${d};">
          ${p?`<span class="toggle-icon" data-cat="${l}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${l}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${c}</td>
        <td style="text-align:right;">${Fe(u)}</td>
        <td style="text-align:right;">${ze(y)}</td>
        <td style="text-align:right;">${Fe(n)}</td>
        <td style="text-align:right;">${ze(i)}</td>
        <td style="text-align:right;">${Fe(m)}</td>
        <td style="text-align:right;color:${g};font-weight:700;">${h.toFixed(1)}</td>
      </tr>
    `),p)for(const v of r)o.push(`
          <tr class="sub-row-${l.replace(/[^a-zA-Z0-9]/g,"_")}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${v.subCategory}</td>
            <td style="text-align:right;">${v.productCount}</td>
            <td style="text-align:right;">${Fe(v.totalShipmentQty)}</td>
            <td style="text-align:right;">${ze(v.totalShipmentMl)}</td>
            <td style="text-align:right;">${Fe(v.monthlyAvgQty)}</td>
            <td style="text-align:right;">${ze(v.monthlyAvgMl)}</td>
            <td style="text-align:right;color:#9ca3af;">--</td>
            <td style="text-align:right;color:#9ca3af;">--</td>
          </tr>
        `)}return`
    <div class="table-wrap">
      <table class="data-table">
        <thead>${s}</thead>
        <tbody>${o.join("")}</tbody>
      </table>
    </div>
  `}function kc(e){const t=new Map;for(const o of e)t.has(o.brewCategory)||t.set(o.brewCategory,{avgMl:0,stockL:o.currentStockL}),t.get(o.brewCategory).avgMl+=o.monthlyAvgMl;return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫残月数プロジェクション</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕あり</span>
      </div>
      ${It.filter(o=>t.has(o)).map(o=>{const l=t.get(o),r=l.avgMl>0?Math.round(l.stockL*1e3/l.avgMl*10)/10:0,d=ot[o]??"#9ca3af",p=Da(r),u=Math.min(r/8*100,100);return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:80px;font-size:12px;font-weight:500;color:${d};text-align:right;">${o}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:20px;overflow:hidden;position:relative;">
            <div style="background:${p};height:100%;width:${u}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:2px;left:8px;font-size:11px;font-weight:600;color:#374151;">${r.toFixed(1)}ヶ月</span>
          </div>
        </div>
      `}).join("")}
    </div>
  `}function Pc(e,t,s){const o=new Date,l=o.getMonth()>=9?o.getFullYear():o.getFullYear()-1,r=Array.from({length:5},(p,u)=>{const y=l-u;return`<option value="${y}" ${y===s?"selected":""}>${y}年度 (${y}/10-${y+1}/9)</option>`}).join(""),d=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return d||`
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
        ${wc(t)}
      </div>

      ${xc(e)}

      ${kc(e)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${Sc(e)}
      </div>
    </section>
  `}function la(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function Ac(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function An(e){return e?Dt.find(t=>t.value===e)?.label??e:""}function Cc(e){const t=[],s=[],o=[];for(const l of e){const r=l.amount_last_year_same_month>0?l.amount_this_month/l.amount_last_year_same_month:1,d={code:l.customer_code,name:l.customer_name,businessType:l.business_type,areaCode:l.area_code,phone:l.phone,lastOrderDate:l.last_order_date,daysSinceLastOrder:l.days_since_order,totalAmountLast12m:l.amount_12m,amount3m:l.amount_3m,amountThisMonth:l.amount_this_month,amountLastYearSameMonth:l.amount_last_year_same_month,annualRevenue:l.annual_revenue,yoyRatio:r,status:"dormant"};l.is_at_risk?t.push({...d,status:"at-risk"}):l.is_dormant?s.push({...d,status:"dormant"}):l.amount_last_year_same_month>0&&r<.8&&o.push({...d,status:"declining"})}return t.sort((l,r)=>r.totalAmountLast12m-l.totalAmountLast12m),s.sort((l,r)=>r.daysSinceLastOrder-l.daysSinceLastOrder),o.sort((l,r)=>l.yoyRatio-r.yoyRatio),{atRiskCustomers:t,dormantCustomers:s,decliningCustomers:o}}function Ec(e,t){const s=t?.reason??"",o=Dt.map(l=>`<option value="${l.value}" ${s===l.value?"selected":""}>${l.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${o}
    </select>`}function Lc(e,t){const s={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],o=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',l=!!t?.actionedAt,r=l?'style="opacity:0.45;"':"",d=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${An(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${l?"1":"0"}" ${r}>
      <td><span class="status-pill ${s.cls}">${s.label}</span></td>
      <td>${e.name}${d}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${o}
      <td class="numeric">${la(e.totalAmountLast12m)}</td>
      <td>${Ec(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${l?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function Ut(e,t,s,o,l,r,d,p){if(l.length===0)return"";const u=l.map(y=>Lc(y,p.get(y.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${o}" style="margin-right:8px;">${l.length}社</span>${t}</h2>
          <p class="panel-caption">${s} — 対象売上合計: ${Ac(r)}</p>
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
    </section>`}function Dc(e,t=[]){const{atRiskCustomers:s,dormantCustomers:o,decliningCustomers:l}=e,r=s.length+o.length+l.length,d=s.reduce((v,_)=>v+_.totalAmountLast12m,0),p=o.reduce((v,_)=>v+_.totalAmountLast12m,0),u=l.reduce((v,_)=>v+_.totalAmountLast12m,0),y=[...s,...o,...l],n=[...new Set(y.map(v=>v.areaCode).filter(Boolean))].sort(),i=[...new Set(y.map(v=>v.businessType).filter(Boolean))].sort(),c=new Map(t.map(v=>[v.customerCode,v])),m=t.filter(v=>v.actionedAt).length,h=new Map;t.forEach(v=>{v.reason&&h.set(v.reason,(h.get(v.reason)??0)+1)});const g=[...h.entries()].sort((v,_)=>_[1]-v[1]).slice(0,5).map(([v,_])=>`<span class="status-pill info" style="font-size:0.75rem;">${An(v)} ${_}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${la(d)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${o.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${la(p)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${l.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${m}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-muted);">${r}社中</div>
      </div>
    </section>

    ${g?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${g}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${r})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${s.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${o.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${l.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${n.map(v=>`<option value="${v}">${v}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${i.map(v=>`<option value="${v}">${v}</option>`).join("")}
      </select>
    </div>

    ${Ut("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",s,d,"状況",c)}
    ${Ut("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",o,p,"経過日数",c)}
    ${Ut("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",l,u,"前年同月比",c)}

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
    <\/script>`}const xe=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],ra={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},_e={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function qc(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ic(e){const t=e.reduce((r,d)=>r+d,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const o=Math.max(...e);return e.filter(r=>r>o*.1).length<=6?"seasonal":"year-round"}function Tc(e){const t=e.reduce((r,d)=>r+d,0);if(t===0)return[];const o=t/12*1.5,l=[];for(let r=0;r<12;r++)e[r]>o&&l.push(r);if(l.length===0){const r=Math.max(...e);r>0&&l.push(e.indexOf(r))}return l.sort((r,d)=>r-d)}function Nc(e){return e.length===0?0:(e[0]-2+12)%12}function us(e){const t=new Date().getMonth(),s=e.map(l=>{const r=Ic(l.monthlyQuantity),d=Tc(l.monthlyQuantity),p=Nc(d);return{code:l.code,name:l.name,category:l.category,peakMonths:d,proposalStartMonth:p,seasonType:r,monthlyQuantity:l.monthlyQuantity}}),o=[];for(let l=0;l<12;l++){const r=s.filter(d=>{if(d.peakMonths.length===0)return!1;const p=d.proposalStartMonth,u=d.peakMonths[0];return p<=u?l>=p&&l<=u:l>=p||l<=u});o.push({month:l,products:r,targetCustomers:[]})}return{products:s,proposals:o,selectedMonth:t}}function Mc(e){const{products:t,proposals:s,selectedMonth:o}=e,l=new Date().getMonth(),r={"year-round":[],seasonal:[],"year-end":[]};t.forEach(i=>r[i.seasonType].push(i));const d=s[o],p=t.length,u=d?.products.length??0,y=t.filter(i=>i.peakMonths.includes(o)).length,n=d?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${xe[o]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${xe[o]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${y}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${n}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${xe.map((i,c)=>{const m=c===l,h=c===o;return`<button class="button" style="padding:4px 10px;background:${h?"#0F5B8D":m?"#e2e8f0":"transparent"};color:${h?"#fff":"#333"};border:${m&&!h?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${c}">${i}${m?" ●":""}</button>`}).join("")}
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
            ${xe.map((i,c)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${c===l?"background:#f0f7ff;":""}">${i.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${Rc(r,l)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${Oc(r,o)}

  <!-- Target customer list for selected month -->
  ${jc(d)}
</div>`}function Rc(e,t){const s=[],o=["year-round","seasonal","year-end"];for(const l of o){const r=e[l];if(r.length!==0){s.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${_e[l]}15;color:${_e[l]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${ra[l]}</span>
    </td></tr>`);for(const d of r){const p=xe.map((u,y)=>{const n=d.peakMonths.includes(y),i=Cn(d,y),c=y===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let m="transparent";n?m=_e[d.seasonType]:i&&(m=_e[d.seasonType]+"40");const h=n||i?`background:${m};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${c}"><div style="${h}" title="${n?"ピーク":i?"提案期間":""}"></div></td>`}).join("");s.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${d.name}"><span class="mono" style="font-size:0.7rem;color:#888">${d.code}</span> ${d.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${_e[d.seasonType]}15;color:${_e[d.seasonType]}">${ra[d.seasonType]}</span></td>
        ${p}
      </tr>`)}}}return s.join("")}function Cn(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const s=e.proposalStartMonth,o=e.peakMonths[0];return s<=o?t>=s&&t<o:t>=s||t<o}function Oc(e,t){const o=["year-round","seasonal","year-end"].map(l=>{const r=e[l];if(r.length===0)return"";const d=r.filter(u=>u.peakMonths.includes(t)||Cn(u,t));if(d.length===0)return"";const p=d.map(u=>{const n=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',i=u.monthlyQuantity.reduce((c,m)=>c+m,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${n}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${i.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map(c=>xe[c]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${_e[l]}15;color:${_e[l]}">${ra[l]}</span>
        <span style="font-size:0.85rem;color:#666">${xe[t]}の対象: ${d.length}品</span>
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
    </div>`}).filter(Boolean);return o.length===0?`<div style="padding:1rem;color:#666;text-align:center">${xe[t]}に提案対象の商品はありません</div>`:o.join("")}function jc(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${qc(s.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${s.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const Fc=["日","月","火","水","木","金","土"];function zc(e){const[t,s]=e.split("-").map(Number),o=new Date(t,s-1,1),l=new Date(t,s,0),r=[];for(let d=0;d<o.getDay();d++)r.push({outside:!0});for(let d=1;d<=l.getDate();d++)r.push({date:`${e}-${String(d).padStart(2,"0")}`});for(;r.length%7!==0;)r.push({outside:!0});return r}function Bc(e,t,s){const[o,l]=t.split("-").map(Number),r=new Date(o,l-2,1),d=new Date(o,l,1),p=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`,u=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,y=new Date().toISOString().slice(0,10),i=zc(t).map(g=>{if(g.outside)return'<div class="sc-cell sc-outside"></div>';const v=g.date,_=Number(v.split("-")[2]),$=new Date(`${v}T00:00:00`).getDay(),S=e?.[v],L=v===y,D=v===s;let N="",E="";return S&&(N=`<span class="sc-badge">${S.count}件</span>`,E=S.cityGroups.slice(0,3).map(P=>`<span class="sc-city-tag">${P.city}<em>${P.count}</em></span>`).join(""),S.cityGroups.length>3&&(E+=`<span class="sc-city-more">+${S.cityGroups.length-3}</span>`)),`
      <div class="sc-cell ${L?"sc-today":""} ${D?"sc-selected":""} ${S?"sc-has-data":""}"
           data-sc-date="${v}">
        <div class="sc-day-header">
          <span class="sc-day-num ${$===0?"sc-sun":$===6?"sc-sat":""}">${_}</span>
          ${N}
        </div>
        <div class="sc-cities">${E}</div>
      </div>
    `}).join(""),c=s&&e?.[s]?Vc(e[s]):s?`<div class="sc-detail-empty"><p>📦 ${s.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',m=Object.values(e??{}).reduce((g,v)=>g+v.count,0),h=Object.values(e??{}).reduce((g,v)=>g+v.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${m>0?`月計: <strong>${m}件</strong> / <strong>¥${h.toLocaleString()}</strong>`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${p}">◀</button>
          <span class="sc-month-label">${o}年${l}月</span>
          <button class="sc-nav-btn" data-sc-ym="${u}">▶</button>
        </div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays">
            ${Fc.map((g,v)=>`<div class="sc-weekday ${v===0?"sc-sun":v===6?"sc-sat":""}">${g}</div>`).join("")}
          </div>
          <div class="sc-grid">
            ${e===null?'<div class="sc-loading"><div class="loading-spinner"></div><p>読み込み中…</p></div>':i}
          </div>
        </div>

        <div class="sc-detail-col">
          ${c}
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
  `}function Vc(e){const t=e.date.replace(/-/g,"/").slice(5),s={};for(const l of e.entries)(s[l.city]??=[]).push(l);const o=Object.entries(s).sort((l,r)=>r[1].length-l[1].length).map(([l,r])=>{const d=r.sort((p,u)=>u.amount-p.amount).map(p=>`
          <div class="sc-customer-row">
            <span class="sc-customer-name" title="${p.customerName}">${p.customerName}</span>
            <span class="sc-customer-amt">${p.amount>0?`¥${p.amount.toLocaleString()}`:"-"}</span>
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${l}（${r.length}件）</div>
          ${d}
        </div>`}).join("");return`
    <p class="sc-detail-date">${t}の出荷</p>
    <p class="sc-detail-meta">${e.count}件 / ¥${e.totalAmount.toLocaleString()}</p>
    ${o}
  `}const Jc=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),Qt=["月","火","水","木","金"],ps=6;function Yc(e,t){if(!e)return 9999;const s=new Date(e);return isNaN(s.getTime())?9999:Math.floor((t.getTime()-s.getTime())/(1e3*60*60*24))}function Uc(e,t){if(t.length===0)return 0;const s=[...t].sort((l,r)=>l-r);return s.filter(l=>l<=e).length/s.length}function Qc(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function ms(e){const t=new Date,s=e.map(u=>u.annualRevenue),o=e.map(u=>{const y=Yc(u.lastOrderDate,t);let n=0;const i=[];y>=60&&(n+=50,i.push("離反リスク")),u.hasSeasonalProposal&&(n+=30,i.push("季節提案タイミング")),y>=30&&y<60&&(n+=20,i.push("定期巡回"));const c=Uc(u.annualRevenue,s),m=Math.round(c*20);m>0&&(n+=m,i.push("金額ウェイト"));const h=Qc(i,y);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:n,reasons:i,lastOrderDate:u.lastOrderDate,daysSinceOrder:y,annualRevenue:u.annualRevenue,recommendedAction:h}}).filter(u=>u.priorityScore>0).sort((u,y)=>y.priorityScore-u.priorityScore),l=new Map;for(const u of o){const y=u.areaCode||"その他";l.has(y)||l.set(y,[]),l.get(y).push(u)}const r=[...l.entries()].sort((u,y)=>y[1].reduce((n,i)=>n+i.priorityScore,0)-u[1].reduce((n,i)=>n+i.priorityScore,0)),d=[];let p=0;for(const[u,y]of r){const n=y.sort((i,c)=>c.priorityScore-i.priorityScore);for(let i=0;i<n.length&&!(p>=Qt.length);i+=ps){const c=n.slice(i,i+ps);d.push({dayLabel:Qt[p],area:u,visits:c}),p++}if(p>=Qt.length)break}return{candidates:o,weekPlan:d,filterArea:"",filterMinScore:0}}function Hc(e){const{candidates:t,weekPlan:s,filterArea:o,filterMinScore:l}=e,r=t.filter(i=>!(o&&i.areaCode!==o||l>0&&i.priorityScore<l)),d=Array.from(new Set(t.map(i=>i.areaCode))).sort(),p=r.length,u=r.filter(i=>i.priorityScore>=50).length,y=r.filter(i=>i.reasons.includes("離反リスク")).length,n=s.reduce((i,c)=>i+c.visits.length,0);return`
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
        <div class="kpi-value">${n}</div>
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
            ${d.map(i=>`<option value="${i}"${o===i?" selected":""}>${i}</option>`).join("")}
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
      ${s.length===0?"<p>訪問候補がありません。</p>":Gc(s)}
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
            ${r.map(i=>Xc(i)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Gc(e){return`
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
  `}function Xc(e){return`
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
      <td class="numeric">${Jc.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function Kc(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},s={empty:"neutral",in_use:"warning",aging:"success"},o=e.map(y=>{const n=y.capacity>0?Math.round(y.currentVolume/y.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${y.tankNo}</strong></td>
          <td class="numeric">${y.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${y.currentVolume>0?y.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${n}%"></div>
            </div>
            <span class="progress-label">${n}%</span>
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
      `}).join(""),l=e.filter(y=>y.status==="in_use").length,r=e.filter(y=>y.status==="aging").length,d=e.filter(y=>y.status==="empty").length,p=e.reduce((y,n)=>y+n.capacity,0),u=e.reduce((y,n)=>y+n.currentVolume,0);return`
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
        <p class="kpi-value">${l} 基</p>
        <p class="kpi-sub">熟成中 ${r} 基</p>
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
          <tbody>${o||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ht(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Wc(e,t,s){const o=e.rows.map((y,n)=>`
      <tr>
        <td class="mono">${y.taxCategory}</td>
        <td>${y.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${n}" data-tax-field="alcoholDegree" value="${y.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${n}" data-tax-field="productionVolume" value="${y.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${n}" data-tax-field="previousBalance" value="${y.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${n}" data-tax-field="exportDeduction" value="${y.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${n}" data-tax-field="sampleDeduction" value="${y.sampleDeduction}" />
        </td>
        <td class="numeric">${y.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${y.taxRate}</td>
        <td class="numeric"><strong>${Ht(y.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${n}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),l=e.deductions.map((y,n)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${n}" data-ded-field="type">
            ${Object.keys(Zt).map(i=>`<option value="${i}" ${i===y.type?"selected":""}>${Zt[i]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${n}" data-ded-field="categoryCode">
            ${Hs.map(i=>`<option value="${i.code}" ${i.code===y.categoryCode?"selected":""}>${i.code}:${i.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${n}" data-ded-field="volume" value="${y.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${n}" data-ded-field="reason" value="${y.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${n}" data-ded-field="documentNo" value="${y.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${n}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),r=Array.from({length:12},(y,n)=>n+1),d=e.rows.reduce((y,n)=>y+n.exportDeduction+n.sampleDeduction,0),p=e.rows.reduce((y,n)=>y+n.productionVolume,0),u=p>0?d/p*100:0;return`
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
  `}const Zc={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let Ae=null,ed=0;const ca=[];function td(){return Ae&&document.body.contains(Ae)||(Ae=document.createElement("div"),Ae.className="toast-container",document.body.appendChild(Ae)),Ae}function k(e,t="success",s){const o=td(),l=++ed,r=t==="error"?5e3:t==="warning"?4e3:3e3,d=document.createElement("div");d.className=`toast toast-${t}`,d.setAttribute("role","status"),d.setAttribute("aria-live","polite"),d.innerHTML=`
    <span class="toast-icon">${Zc[t]}</span>
    <span class="toast-msg">${sd(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const p={id:l,message:e,type:t,el:d};ca.push(p),o.appendChild(d),requestAnimationFrame(()=>{d.classList.add("toast-enter")});const u=()=>ad(p);d.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{d.classList.add("toast-exit"),d.addEventListener("animationend",u,{once:!0})},r)}function ad(e){const t=ca.indexOf(e);t!==-1&&(ca.splice(t,1),e.el.remove())}function sd(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ue(e,t={}){const{title:s="確認",confirmLabel:o="OK",cancelLabel:l="キャンセル",variant:r="primary"}=t;return new Promise(d=>{const p=document.createElement("div");p.className="modal-backdrop confirm-backdrop",p.setAttribute("role","dialog"),p.setAttribute("aria-modal","true"),p.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${r}">
            ${r==="danger"?nd:od}
          </div>
          <h3 class="confirm-title">${bt(s)}</h3>
          <p class="confirm-message">${bt(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${bt(l)}</button>
          <button class="button ${r} confirm-ok">${bt(o)}</button>
        </div>
      </div>
    `;const u=n=>{p.classList.add("confirm-exit"),p.addEventListener("animationend",()=>{p.remove()},{once:!0}),d(n)};p.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),p.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),p.addEventListener("click",n=>{n.target===p&&u(!1)});const y=n=>{n.key==="Escape"&&(document.removeEventListener("keydown",y),u(!1))};document.addEventListener("keydown",y),document.body.appendChild(p),requestAnimationFrame(()=>{p.querySelector(".confirm-ok")?.focus()})})}const nd=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,od=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function bt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ys(e){const s=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(s)?`"${s}"`:s}function da(e,t,s){if(t.length===0&&(!s||s.length===0))return;const o=s&&s.length>0?s:Object.keys(t[0]??{}).map(y=>({key:y,label:y})),r=`\uFEFF${[o.map(y=>ys(y.label)).join(","),...t.map(y=>o.map(n=>ys(y[n.key])).join(","))].join(`\r
`)}`,d=new Blob([r],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(d),u=document.createElement("a");u.href=p,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(p),0)}const id=Object.fromEntries(Dt.map(e=>[e.value,e.label])),ld=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan"];let Be=[];async function rd(){const{supabaseQueryAll:e}=await x(async()=>{const{supabaseQueryAll:s}=await Promise.resolve().then(()=>F);return{supabaseQueryAll:s}},void 0);Be=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(s=>typeof s.email=="string"&&s.email.length>0).map(s=>({name:String(s.name??""),email:String(s.email??""),area:String(s.delivery_area_code??""),historySegment:"seasonal"}))}const hs=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"}];function En(e){const t=ha[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function qa(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function cd(){const e=En("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const Tt=new Date,dd=Tt.toISOString().slice(0,7),ud=Tt.getFullYear(),pd=Tt.getMonth()+1,md=Tt.toISOString().slice(0,10),yd="C0011",Ce=cd();function Ln(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",s=e.startsWith(t)?e.slice(t.length)||"/":e;return ld.includes(s)?s:"/"}function Ia(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const fs=Ln(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:qa(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:dd,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:ud,taxMonth:pd,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...Xr,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...Kr},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:md,route:fs,currentCategory:Ia(fs),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:yd,salesPeriod:"month",customRange:{start:"",end:""},quoteState:Ca(Ya()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCompanySettings:Ya(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],masterTab:"customers",masterFilter:{...Ea},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:Ce.mode,emailRegion:Ce.region,emailHistorySegment:Ce.historySegment,emailTemplateId:Ce.templateId,emailSubject:Ce.subject,emailBody:Ce.body,emailSaveMessage:Ce.saveMessage,emailSending:!1,demandForecast:{...Ui},shipmentCalendarData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:wt(new Date().toISOString().slice(0,7),1,1),calendarDefaultPart:1,calendarDefaultEmp:1,calendarSelectedDate:null,brewingSchedule:[],globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function vs(e){return e.slice(0,10)}function hd(e){return{...e}}function Pt(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Dn(){a.invoiceForm=qa(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},Pt()}function qn(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((s,o)=>{s.productCode.trim()||(t[`lines.${o}.productCode`]="商品コードは必須です。"),s.productName.trim()||(t[`lines.${o}.productName`]="商品名は必須です。"),s.quantity<=0&&(t[`lines.${o}.quantity`]="数量は1以上を入力してください。"),s.unitPrice<0&&(t[`lines.${o}.unitPrice`]="単価は0円以上で入力してください。")}),t}function fd(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,hd(t))}function vd(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],s=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:s.map((o,l)=>{const r=l===0?1:2,d=1200*(l+1);return{productCode:o.code,productName:o.name,quantity:r,unitPrice:d,unit:"本",amount:r*d}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function gd(e){const t=a.masterStats?.customers.find(s=>s.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function bd(e){const t=a.masterStats?.customers.find(s=>s.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function In(e){if(ve(e),a.invoiceErrors=qn(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){b();return}a.invoiceSaving=!0,b(),qs(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=qa(),b()}).catch(()=>{a.invoiceSaving=!1,b()})}function Tn(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,s=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((o,l)=>new Date(l.date).getTime()-new Date(o.date).getTime()).filter(o=>{const l=new Date(o.date);return!(t&&l<t||s&&l>s)})}function Nn(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?Be:Be.filter(e=>e.area===a.emailRegion);case"history":return Be.filter(e=>e.historySegment===a.emailHistorySegment);default:return Be}}function $d(){const e=Nn();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function Gt(e){const t=Nn(),s=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:s,recipientCount:t.length,recipients:t.map(o=>o.email),status:e}}function Ta(){return a.user,!1}function it(){a.globalSearchOpen=!1,a.globalQuery=""}function _d(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:hs.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:hs}}function wd(){let e=[],t,s="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?Tn(a.salesSummary):[]).map(o=>({documentNo:o.documentNo,date:o.date,customerCode:o.customerCode,customerName:o.customerName,amount:o.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],s="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((o,l)=>l.balanceAmount-o.balanceAmount).map(o=>({...o})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],s="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],s="invoices.csv";break;case"/purchase":e=a.purchaseList.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],s="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(o=>({...o})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],s="jikomi.csv";break;case"/tanks":e=a.tankList.map(o=>({...o})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],s="tanks.csv";break;case"/kentei":e=a.kenteiList.map(o=>({...o})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],s="kentei.csv";break;case"/materials":e=a.materialList.map(o=>({...o})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],s="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(o=>({...o}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],s="master-customers.csv"):(e=a.masterStats?.products.map(o=>({...o}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],s="master-products.csv");break;default:return}da(s,e,t)}function gs(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=Ia(e),a.sidebarOpen=!1,it(),Na(e)}async function Na(e){a.actionLoading=!0,b();try{switch(e){case"/quote":a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,b(),a.quoteList=await Aa(),a.quoteListLoading=!1);break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await nt(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await ga());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await ba(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await x(async()=>{const{fetchShipmentCalendar:s}=await Promise.resolve().then(()=>C);return{fetchShipmentCalendar:s}},void 0);a.shipmentCalendarData=await t(a.shipmentCalendarYearMonth);break}case"/billing":a.billingSummary||(a.billingSummary=await $a(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Et());break;case"/product-power":a.productPower.length===0&&(a.productPower=await Rs());break;case"/customer-efficiency":a.customerEfficiency.length===0&&(a.customerEfficiency=await Os());break;case"/customer-analysis":a.customerAnalysis||(a.customerAnalysis=await js());break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:s}=await x(async()=>{const{fetchDemandForecasts:r,fetchDeliverySchedule:d}=await Promise.resolve().then(()=>C);return{fetchDemandForecasts:r,fetchDeliverySchedule:d}},void 0),[o,l]=await Promise.all([t(),s()]);a.demandForecast.forecasts=o.map(r=>({code:r.productCode,name:r.productName,segment:r.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(r.avgMonthly),adjustedAvg:Math.round(r.avgMonthly),nextMonthForecast:Math.round(r.forecastQuantity),annualForecast:Math.round(r.avgMonthly*12),safetyStock:Math.round(r.safetyStock)})),a.demandForecast.deliveries=Qi(l)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:s}=await x(async()=>{const{fetchChurnAlerts:o,fetchChurnNotes:l}=await Promise.resolve().then(()=>C);return{fetchChurnAlerts:o,fetchChurnNotes:l}},void 0);if(!a.churnAlert){const o=await t();a.churnAlert=Cc(o)}a.churnNotes=await s();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await x(async()=>{const{fetchProductShipmentsFromTable:o}=await Promise.resolve().then(()=>C);return{fetchProductShipmentsFromTable:o}},void 0),s=await t();if(s.length>0)a.seasonalCalendar=us(s.map(o=>({code:o.code,name:o.name,category:"",monthlyQuantity:o.monthlyQuantity})));else{const{fetchProductMonthlyShipments:o}=await x(async()=>{const{fetchProductMonthlyShipments:r}=await Promise.resolve().then(()=>C);return{fetchProductMonthlyShipments:r}},void 0),l=await o();a.seasonalCalendar=us(l.map(r=>({code:r.code,name:r.name,category:"",monthlyQuantity:r.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:t}=await x(async()=>{const{fetchVisitPriorities:o}=await Promise.resolve().then(()=>C);return{fetchVisitPriorities:o}},void 0),s=await t();if(s.length>0)a.visitPlanner={candidates:s.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address:o.address,areaCode:o.area_code,businessType:o.business_type,priorityScore:o.priority_score,reasons:o.reasons,lastOrderDate:o.last_order_date,daysSinceOrder:o.days_since_order,annualRevenue:o.annual_revenue,recommendedAction:o.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=ms(s.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address1:o.address,areaCode:o.area_code,businessType:o.business_type,annualRevenue:o.annual_revenue,lastOrderDate:o.last_order_date,hasSeasonalProposal:o.reasons.some(l=>l.includes("季節"))})));else{const{supabaseQueryAll:o}=await x(async()=>{const{supabaseQueryAll:u}=await Promise.resolve().then(()=>F);return{supabaseQueryAll:u}},void 0),[l,r]=await Promise.all([o("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):fa().then(u=>u.customers)]),d=a.masterStats?.customers??r,p=new Map;l.forEach(u=>{const y=u.legacy_customer_code||"",n=u.sales_date||"",i=Number(u.total_amount)||0,c=p.get(y);!c||n>c.lastDate?p.set(y,{lastDate:n,total:(c?.total??0)+i}):c.total+=i}),a.visitPlanner=ms(d.filter(u=>u.isActive).map(u=>({code:u.code,name:u.name,phone:u.phone,address1:u.address1,areaCode:u.areaCode,businessType:u.businessType,annualRevenue:p.get(u.code)?.total??0,lastOrderDate:p.get(u.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:s,fetchProductionPlan:o}=await x(async()=>{const{fetchDemandAnalysis:l,fetchSafetyStockParams:r,fetchProductionPlan:d}=await Promise.resolve().then(()=>C);return{fetchDemandAnalysis:l,fetchSafetyStockParams:r,fetchProductionPlan:d}},void 0);if(!a.demandAnalysis){const[l,r]=await Promise.all([t(a.demandYearsBack*12),s()]);a.demandAnalysis=l,a.safetyStockParams=r}if(a.productionPlan.length===0){const l=await o(a.demandPlanYearMonth);if(l.length>0)a.productionPlan=l;else if(a.demandAnalysis&&a.safetyStockParams.length>0){const r=a.demandPlanYearMonth,d=a.demandAnalysis.months.filter(p=>p<r).slice(-3);a.productionPlan=a.safetyStockParams.map(p=>{const u=p.productionType==="make_to_order",y=d.map(m=>a.demandAnalysis.matrix[p.productCode]?.[m]??0),n=u?0:y.length>0?Math.ceil(y.reduce((m,h)=>m+h,0)/y.length):Math.ceil(p.avgMonthlyDemand),i=u?0:Math.ceil(p.safetyStockQty),c=Math.max(0,n+i);return{id:"",yearMonth:r,productCode:p.productCode,productName:p.productName,demandForecast:n,safetyStockTarget:i,openingStock:0,requiredProduction:c,plannedQty:u?0:c,actualQty:0,status:"draft",productionType:p.productionType??"monthly",notes:""}})}}break}case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:s,fetchBrewingSchedule:o}=await x(async()=>{const{fetchBrewingPlanSummary:n,fetchBrewingMonthlyTrend:i,fetchBrewingSchedule:c}=await Promise.resolve().then(()=>C);return{fetchBrewingPlanSummary:n,fetchBrewingMonthlyTrend:i,fetchBrewingSchedule:c}},void 0),l=a.brewingPlanFY,r=`${l}-10-01`,d=`${l+1}-09-30`,[p,u,y]=await Promise.all([t(r,d),s(r,d),o(l)]);a.brewingPlanData=p,a.brewingMonthlyTrend=u,a.brewingSchedule=y;break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await zs());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Bs());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await Vs());break;case"/materials":a.materialList.length===0&&(a.materialList=await Wt());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Js(),Ys()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([Us(),Qs()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await wa(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([xa(a.storeSalesDate),Xs()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await x(async()=>{const{fetchMailSenders:s}=await Promise.resolve().then(()=>C);return{fetchMailSenders:s}},void 0);if(a.mailSenders=await t(),!a.emailSenderId||!a.mailSenders.find(s=>s.id===a.emailSenderId)){const s=a.mailSenders.find(o=>o.isDefault)??a.mailSenders[0];s&&(a.emailSenderId=s.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await x(async()=>{const{fetchCalendarEvents:s}=await Promise.resolve().then(()=>C);return{fetchCalendarEvents:s}},void 0);a.calendarEvents=await t(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await x(async()=>{const{fetchIntegrationSettings:s}=await Promise.resolve().then(()=>C);return{fetchIntegrationSettings:s}},void 0);a.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:s}=await x(async()=>{const{fetchShopifyOrders:o,fetchIntegrationSettings:l}=await Promise.resolve().then(()=>C);return{fetchShopifyOrders:o,fetchIntegrationSettings:l}},void 0);a.shopifyOrders=await t(),a.integrations.length===0&&(a.integrations=await s())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:s}=await x(async()=>{const{fetchFaxInbox:o,fetchIntegrationSettings:l}=await Promise.resolve().then(()=>C);return{fetchFaxInbox:o,fetchIntegrationSettings:l}},void 0);a.faxRecords=await t(),a.integrations.length===0&&(a.integrations=await s())}break;case"/users":{const{fetchUserProfiles:t}=await x(async()=>{const{fetchUserProfiles:s}=await Promise.resolve().then(()=>C);return{fetchUserProfiles:s}},void 0);a.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:s,fetchMailSenders:o}=await x(async()=>{const{fetchMyProfile:r,fetchAuditLogs:d,fetchMailSenders:p}=await Promise.resolve().then(()=>C);return{fetchMyProfile:r,fetchAuditLogs:d,fetchMailSenders:p}},void 0),l=a.user?.email??a.myProfile?.email??"";l&&(a.myProfile=await t(l)),a.mailSenders.length===0&&(a.mailSenders=await o()),a.auditLogs=await s(50)}break;case"/audit":{const{fetchAuditLogs:t}=await x(async()=>{const{fetchAuditLogs:s}=await Promise.resolve().then(()=>C);return{fetchAuditLogs:s}},void 0);a.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await x(async()=>{const{fetchProspects:s}=await Promise.resolve().then(()=>C);return{fetchProspects:s}},void 0);a.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:s}=await x(async()=>{const{fetchMapCustomers:r,fetchDeliveryLocations:d}=await Promise.resolve().then(()=>C);return{fetchMapCustomers:r,fetchDeliveryLocations:d}},void 0),[o,l]=await Promise.all([t(),s()]);a.mapCustomers=o,a.deliveryLocations=l}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:s}=await x(async()=>{const{fetchCallLogs:o,fetchIntegrationSettings:l}=await Promise.resolve().then(()=>C);return{fetchCallLogs:o,fetchIntegrationSettings:l}},void 0);a.callLogs=await t(100),a.integrations.length===0&&(a.integrations=await s())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:s}=await x(async()=>{const{fetchLeadLists:o,fetchIntegrationSettings:l}=await Promise.resolve().then(()=>C);return{fetchLeadLists:o,fetchIntegrationSettings:l}},void 0);a.leadLists=await t(),a.integrations.length===0&&(a.integrations=await s())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await x(async()=>{const{fetchWorkflowOrdersFromDb:s}=await Promise.resolve().then(()=>C);return{fetchWorkflowOrdersFromDb:s}},void 0);a.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await x(async()=>{const{fetchTourInquiriesFromDb:s}=await Promise.resolve().then(()=>C);return{fetchTourInquiriesFromDb:s}},void 0);a.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:s,fetchIntegrationSettings:o}=await x(async()=>{const{fetchSlackRules:l,fetchSlackLogs:r,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>C);return{fetchSlackRules:l,fetchSlackLogs:r,fetchIntegrationSettings:d}},void 0);a.slackRules=await t(),a.slackLogs=await s(50),a.integrations.length===0&&(a.integrations=await o())}break;case"/":{const{fetchProspects:t,fetchCalendarEvents:s,fetchWorkflowOrdersFromDb:o,fetchTourInquiriesFromDb:l,fetchOrderHeaders:r}=await x(async()=>{const{fetchProspects:d,fetchCalendarEvents:p,fetchWorkflowOrdersFromDb:u,fetchTourInquiriesFromDb:y,fetchOrderHeaders:n}=await Promise.resolve().then(()=>C);return{fetchProspects:d,fetchCalendarEvents:p,fetchWorkflowOrdersFromDb:u,fetchTourInquiriesFromDb:y,fetchOrderHeaders:n}},void 0);a.prospects.length===0&&(a.prospects=await t()),a.calendarEvents.length===0&&(a.calendarEvents=await s(a.calendarYearMonth)),a.materialList.length===0&&(a.materialList=await Wt()),a.workflowOrders.length===0&&(a.workflowOrders=await o()),a.tourInquiries.length===0&&(a.tourInquiries=await l()),a.orderHeaders.length===0&&(a.orderHeaders=await r())}break;default:break}}catch(t){console.error("Route data load error:",e,t),k(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{a.actionLoading=!1,b()}}function bs(){if(Ta())return Rl(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return ct("sales");case"/cat/brewery":return ct("brewery");case"/cat/purchase":return ct("purchase");case"/cat/more":return ct("more");case"/invoice-entry":return dl(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/quote":return a.quoteEditId===null?fl(a.quoteList,a.quoteListLoading):vn(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return vl(a.quoteCompanySettings);case"/email":return il($d());case"/delivery":return a.deliveryNote?nl(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return Bc(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate);case"/billing":return a.billingSummary?ji(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?hr(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return kl(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return Pl(a.customerEfficiency,a.customerSortState);case"/customer-analysis":return a.customerAnalysis?ir(a.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return Ki(a.demandForecast);case"/demand":return $c(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate);case"/brewing-plan":return Pc(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY);case"/churn-alert":return a.churnAlert?Dc(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?Mc(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?Hc(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/jikomi":return a.jikomiView==="calendar"?`${Ga(a.jikomiList,a.jikomiView)}${Tl(a.jikomiList)}`:Ga(a.jikomiList,a.jikomiView);case"/tanks":return Kc(a.tankList);case"/kentei":return Nl(a.kenteiList);case"/materials":return Ql(a.materialList)+Ul(a.materialEditing,a.materialEditingIsNew);case"/purchase":return Wl(a.purchaseList,a.payableList);case"/raw-material":return Zl(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Wc(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return br(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?ar(a.pipelineMeta,ne,X,a.syncDashboard):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return cc(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return _r(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return tc(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return xr(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapCustomers.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>':Sr(a.mapCustomers,a.deliveryLocations,a.mapFilters);case"/workflow":return Ar(a.workflowOrders);case"/mobile-order":return Cr(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return Lr(a.tourInquiries,a.tourActiveId);case"/mail-senders":return Ir(a.mailSenders,a.mailSenderEditingId);case"/calendar":return Tr(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return Mr(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return Rr(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Or(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/users":return jr(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return Fr(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return zr(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return Br(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return Ur(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return Qr(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return Gr(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return gr(Tn(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return Xl([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return Yl(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return El(a.invoiceRecords,a.invoiceFilter);case"/ledger":return Ji(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return xn(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return Sd();default:return el(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function xd(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},s=a.announcements.filter(l=>!a.dismissedAnnouncements.has(l.id)).map(l=>{const r=e[l.level]??e.info;return`
      <div class="announcement-bar" style="background:${r.bg};border-bottom:2px solid ${r.border};">
        <span class="announcement-text">${r.icon} ${l.message}</span>
        ${l.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${l.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),o=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return s+o}function Sd(){function e(s,o,l,r){return`<a href="${`${"/".replace(/\/$/,"")||"/"}${s}`}" data-link="${s}" class="home-card">
      <span class="home-card-icon">${o}</span>
      <span class="home-card-label">${l}</span>
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
  `}function kd(){if(Ta())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${bs()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",s=e[a.route]??"",o=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?rl(a.masterStats.customers,a.pickerQuery):Kl(a.masterStats.products,a.pickerQuery):"",l=a.globalSearchOpen?ll(a.globalQuery,_d()):"",r=a.user?`<span class="app-header-user">${a.user.email}</span>
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
      ${xd()}
      <main class="main-v2">
        <div class="view ${a.actionLoading?"is-busy":""}">${bs()}</div>
        <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
      </main>
      ${o}
      ${l}
    </div>
  `}async function Pd(){a.actionLoading=!0,b();try{const{fetchSalesSummary:e}=await x(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>C);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,b()}}async function Ad(e){a.actionLoading=!0,b();try{a.invoiceRecords=await nt(e)}finally{a.actionLoading=!1,b()}}async function Cd(e){a.actionLoading=!0,b();try{a.customerLedger=await va(e)}finally{a.actionLoading=!1,b()}}function ve(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,s)=>{const o=parseFloat(e.querySelector(`[data-line="${s}"][data-field="quantity"]`)?.value??"")||0,l=parseFloat(e.querySelector(`[data-line="${s}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${s}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${s}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${s}"][data-field="unit"]`)?.value??t.unit,quantity:o,unitPrice:l,amount:o*l}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function Ee(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function Ed(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,b()}),e.querySelectorAll("[data-action='global-search-close']").forEach(n=>{n.addEventListener("click",i=>{n.classList.contains("global-search")&&i.target instanceof HTMLElement&&!i.target.classList.contains("global-search")||(it(),b())})}),e.querySelector("#global-search-input")?.addEventListener("input",n=>{a.globalQuery=n.target.value,b()}),e.querySelectorAll("[data-action='global-nav']").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.path;i&&(it(),gs(i))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{wd()}),e.querySelectorAll("[data-jikomi-tab]").forEach(n=>{n.addEventListener("click",()=>{a.jikomiView=n.dataset.jikomiTab,b()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const n=e.querySelector("#auth-email")?.value.trim()??"",i=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,b(),Bn(n,i).then(async c=>{a.user=c,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:h}=await x(async()=>{const{fetchMyProfile:g,recordAudit:v}=await Promise.resolve().then(()=>C);return{fetchMyProfile:g,recordAudit:v}},void 0);a.myProfile=await m(c.email),await h({action:"sign_in",userEmail:c.email}),b()}).catch(async c=>{try{const m=await Ra(n,i);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:h}=await x(async()=>{const{fetchMyProfile:g}=await Promise.resolve().then(()=>C);return{fetchMyProfile:g}},void 0);a.myProfile=await h(m.email)}catch{a.authError=c instanceof Error?c.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,b()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,b()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{Vn().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,b()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(n=>{n.addEventListener("click",()=>{a.sidebarOpen=!1,b()})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let n=0;t.addEventListener("touchstart",i=>{n=i.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",i=>{i.changedTouches[0].clientX-n<-60&&(a.sidebarOpen=!1,b())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.id??"";a.dismissedAnnouncements.add(i),b()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelectorAll("[data-link]").forEach(n=>{n.addEventListener("click",i=>{i.preventDefault(),gs(n.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async n=>{n.preventDefault();const i=e.querySelector("#fr-title")?.value??"",c=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",h=e.querySelector("#fr-result");if(!i.trim())return;const g=await Ts(i,c,m);if(h&&(h.textContent=g?"送信しました":"送信に失敗しました",h.className=`fr-result ${g?"success":"error"}`),g){const v=e.querySelector("#feature-request-form");v&&v.reset()}}),e.querySelectorAll("[data-period]").forEach(n=>{n.addEventListener("click",()=>{a.salesPeriod=n.dataset.period,b()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const n=e.querySelector("#range-start")?.value??"",i=e.querySelector("#range-end")?.value??"";n&&i&&(a.customRange={start:n,end:i},a.salesPeriod="custom",b())}),e.querySelectorAll("[data-edit-customer]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.editCustomer??"",c=a.masterStats?.customers.find(h=>h.id===i);if(!c)return;const m=document.createElement("div");m.innerHTML=Ol(c),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async h=>{h.preventDefault();const g=document.getElementById("edit-result"),v=await Ns(i,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,manual_override:!0});g&&(g.textContent=v?"保存しました":"保存に失敗",g.className=`fr-result ${v?"success":"error"}`),v&&(document.getElementById("edit-modal")?.remove(),Ve())})})}),e.querySelectorAll("[data-edit-product]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.editProduct??"",c=a.masterStats?.products.find(h=>h.id===i);if(!c)return;const m=document.createElement("div");m.innerHTML=jl(c),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async h=>{h.preventDefault();const g=document.getElementById("edit-result"),v=await Ms(i,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});g&&(g.textContent=v?"保存しました":"保存に失敗",g.className=`fr-result ${v?"success":"error"}`),v&&(document.getElementById("edit-modal")?.remove(),Ve())})})}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=Ca(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,b()}),e.querySelectorAll("[data-open-quote]").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.openQuote,c=await ln(i);if(!c){k("見積の読み込みに失敗しました","error");return}a.quoteState={id:c.id,quoteNo:c.quote_no,quoteDate:c.quote_date,validUntil:c.valid_until??"",customerCode:c.legacy_customer_code??"",customerName:c.customer_name,customerAddress:c.customer_address,subject:c.subject,lines:c.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:c.remarks,taxRate:c.tax_rate,deliveryDate:c.delivery_date,paymentTerms:c.payment_terms,deliveryPlace:c.delivery_place,templateType:c.template_type??"sake",previewMode:!1},a.quoteEditId=i,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,b()})}),e.querySelectorAll("[data-delete-quote]").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.deleteQuote,c=n.dataset.quoteNo??i;if(!await ue(`見積 ${c} を削除しますか？`))return;await _s("quotes",i)?(a.quoteList=a.quoteList.filter(g=>g.id!==i),k("削除しました","success"),b()):k("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,b(),Aa().then(n=>{a.quoteList=n,a.quoteListLoading=!1,b()})}),e.querySelectorAll("[name='q-template']").forEach(n=>{n.addEventListener("change",()=>{a.quoteState.templateType=n.value,b()})});function s(n){return(n??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function o(n){const i=e.querySelector("#q-cust-search")?.closest("section.panel");if(!i||(i.querySelector(".search-results")?.remove(),n.length<1))return;const c=a.masterStats?.customers??[],m=n.toLowerCase(),h=c.filter(v=>v.name.includes(n)||v.kanaName.includes(n)||v.code.includes(n)||v.name.toLowerCase().includes(m)||v.kanaName.toLowerCase().includes(m)).slice(0,30);if(h.length===0)return;const g=document.createElement("div");g.className="search-results",g.innerHTML=h.map(v=>`<button class="search-item" type="button" data-select-customer="${s(v.code)}" data-cust-name="${s(v.name)}" data-cust-addr="${s(v.address1||"")}"><span class="mono">${s(v.code)}</span><span style="font-size:13px;font-weight:600;">${s(v.name)}</span></button>`).join(""),i.querySelector(".form-row")?.after(g),g.querySelectorAll("[data-select-customer]").forEach(v=>{v.addEventListener("click",async()=>{const _=v.dataset.selectCustomer??"";a.quoteState.customerCode=_,a.quoteState.customerName=v.dataset.custName??"",a.quoteState.customerAddress=v.dataset.custAddr??"",a.quoteCustomerQuery="",a.quotePricing=await Kt(a.masterStats?.customers??[],_),b()})})}function l(n){const i=e.querySelector("#q-prod-search")?.closest("section.panel");if(!i||(i.querySelector(".search-results")?.remove(),n.length<1))return;if(!a.masterStats){const $=document.createElement("div");$.className="search-results",$.innerHTML='<p style="padding:8px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';const S=i.querySelector(".form-row");S?S.after($):i.appendChild($);return}const c=a.masterStats.products,m=n.toLowerCase(),h=c.filter($=>$.name.includes(n)||$.kanaName.includes(n)||$.code.includes(n)||$.name.toLowerCase().includes(m)||$.kanaName.toLowerCase().includes(m)).slice(0,30);if(h.length===0)return;const g=a.quotePricing,v=document.createElement("div");v.className="search-results",v.innerHTML=h.map($=>{const S=g?_a($,g):{price:$.salePrice||0,label:"標準価格"},L=S.label!=="標準価格";return`<button class="search-item" type="button" data-add-product="${s($.code)}" data-prod-name="${s($.name)}" data-prod-price="${S.price}" data-prod-jan="${s($.janCode??"")}" data-prod-unit="${s($.unit)}" data-prod-case="${$.caseQty??""}"><span class="mono">${s($.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${s($.name)}</span><span class="numeric"${L?' style="color:#2f855a;font-weight:700;"':""}>${S.price?"¥"+S.price.toLocaleString("ja-JP"):"価格未設定"} <small style="font-weight:400;">(${s(S.label)})</small></span></button>`}).join(""),v.querySelectorAll("[data-add-product]").forEach($=>{$.addEventListener("click",()=>{const S=$.dataset.addProduct??"",L=$.dataset.prodName??"",D=parseInt($.dataset.prodPrice??"0"),N=$.dataset.prodJan??"",E=$.dataset.prodUnit||"本",P=$.dataset.prodCase??"",R=P?parseInt(P):null;a.quoteState.lines.push({productCode:S,productName:L,janCode:N,caseQty:R,quantity:1,unit:E,unitPrice:D,retailPrice:null,amount:D}),a.quoteProductQuery="",b()})});const _=i.querySelector(".form-row");_?_.after(v):i.appendChild(v)}(function(){const n=e.querySelector("#q-cust-search");n&&(n.addEventListener("compositionend",()=>{const i=n.value;a.quoteCustomerQuery=i,o(i)}),n.addEventListener("input",i=>{if(i.isComposing)return;const c=n.value;a.quoteCustomerQuery=c,o(c)}))})(),(function(){const n=e.querySelector("#q-prod-search");n&&(n.addEventListener("compositionend",()=>{const i=n.value;a.quoteProductQuery=i,l(i)}),n.addEventListener("input",i=>{if(i.isComposing)return;const c=n.value;a.quoteProductQuery=c,l(c)}))})(),e.querySelectorAll("[data-select-customer]").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.selectCustomer??"";a.quoteState.customerCode=i,a.quoteState.customerName=n.dataset.custName??"",a.quoteState.customerAddress=n.dataset.custAddr??"",a.quoteCustomerQuery="",a.quotePricing=await Kt(a.masterStats?.customers??[],i),b()})}),e.querySelectorAll("[data-add-product]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.addProduct??"",c=n.dataset.prodName??"",m=parseInt(n.dataset.prodPrice??"0"),h=n.dataset.prodJan??"",g=n.dataset.prodCase??"",v=g?parseInt(g):null;a.quoteState.lines.push({productCode:i,productName:c,janCode:h,caseQty:v,quantity:1,unit:"本",unitPrice:m,retailPrice:null,amount:m}),a.quoteProductQuery="",b()})});function r(){mt(a.quoteState);const n=e.querySelector("#q-preview-scaler");if(!n)return;n.innerHTML=vn(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const i=n.querySelector(".q-preview-doc"),c=n.parentElement?.clientWidth??0,m=i?.offsetWidth??0;if(c>0&&m>0&&m>c-24){const h=(c-24)/m;n.style.transform=`scale(${h})`,n.style.transformOrigin="top left",n.style.height=`${((i?.offsetHeight??0)+48)*h}px`}else n.style.transform="",n.style.height=""}for(const n of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${n}`)?.addEventListener("input",r);e.querySelector("#q-remarks")?.addEventListener("input",r),e.querySelectorAll(".qty-input").forEach(n=>{n.addEventListener("change",()=>{const i=parseInt(n.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.quantity=parseFloat(n.value)||0,c.amount=c.quantity*c.unitPrice,r())})}),e.querySelectorAll(".price-input").forEach(n=>{n.addEventListener("change",()=>{const i=parseInt(n.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.unitPrice=parseInt(n.value)||0,c.amount=c.quantity*c.unitPrice,r())})}),e.querySelectorAll(".jan-input").forEach(n=>{n.addEventListener("change",()=>{const i=parseInt(n.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.janCode=n.value,r())})}),e.querySelectorAll(".case-qty-input").forEach(n=>{n.addEventListener("change",()=>{const i=parseInt(n.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.caseQty=n.value?parseInt(n.value):null,r())})}),e.querySelectorAll(".retail-price-input").forEach(n=>{n.addEventListener("change",()=>{const i=parseInt(n.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.retailPrice=n.value?parseInt(n.value):null,r())})}),e.querySelectorAll("[data-remove-line]").forEach(n=>{n.addEventListener("click",()=>{const i=parseInt(n.dataset.removeLine??"0");a.quoteState.lines.splice(i,1),b()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{mt(a.quoteState),a.quoteState.previewMode=!0,b()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,b()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",()=>{mt(a.quoteState),_l(a.quoteState,a.quoteCompanySettings)}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{mt(a.quoteState);const n=a.quoteState,{supabaseInsert:i,supabaseUpdate:c}=await x(async()=>{const{supabaseInsert:$,supabaseUpdate:S}=await Promise.resolve().then(()=>F);return{supabaseInsert:$,supabaseUpdate:S}},void 0),m=n.lines.reduce(($,S)=>$+S.amount,0),h=Math.round(m*n.taxRate/100),g=m+h;if(!n.quoteNo){const{supabaseRpc:$}=await x(async()=>{const{supabaseRpc:L}=await Promise.resolve().then(()=>F);return{supabaseRpc:L}},void 0),S=await $("generate_quote_no",{});n.quoteNo=S??`Q${Date.now().toString(36).toUpperCase()}`}const v={quote_no:n.quoteNo,quote_date:n.quoteDate,valid_until:n.validUntil||null,legacy_customer_code:n.customerCode||null,customer_name:n.customerName,customer_address:n.customerAddress,subject:n.subject,template_type:n.templateType,subtotal:m,tax_amount:h,total_amount:g,tax_rate:n.taxRate,remarks:n.remarks,delivery_date:n.deliveryDate,payment_terms:n.paymentTerms,delivery_place:n.deliveryPlace,updated_at:new Date().toISOString()};let _=n.id;if(n.id)await c("quotes",n.id,v),await fetch(`${ne}/rest/v1/quote_lines?quote_id=eq.${n.id}`,{method:"DELETE",headers:{apikey:X,Authorization:`Bearer ${X}`}});else{const $=await i("quotes",v);if(!$?.id){k("保存に失敗しました","error");return}_=$.id,n.id=_}for(let $=0;$<n.lines.length;$++){const S=n.lines[$];await i("quote_lines",{quote_id:_,line_no:$+1,legacy_product_code:S.productCode||null,product_name:S.productName,jan_code:S.janCode||null,case_qty:S.caseQty??null,quantity:S.quantity,unit:S.unit,unit_price:S.unitPrice,retail_price:S.retailPrice??null,amount:S.amount})}k(`見積 ${n.quoteNo} を保存しました`,"success"),b()}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const n=c=>document.getElementById(c)?.value??"",i={...a.quoteCompanySettings,companyName:n("qs-company-name"),companyPostal:n("qs-company-postal"),companyAddress1:n("qs-company-addr1"),companyAddress2:n("qs-company-addr2"),companyTel:n("qs-company-tel"),companyFax:n("qs-company-fax"),companyEmail:n("qs-company-email"),companyRegistrationNo:n("qs-company-regno"),billingName:n("qs-billing-name"),billingPostal:n("qs-billing-postal"),billingAddress:n("qs-billing-address"),defaultPaymentTerms:n("qs-payment-terms"),defaultHeaderNote:n("qs-header-note"),defaultFooterNote:n("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};Re(i),a.quoteCompanySettings=i,k("設定を保存しました","success"),b()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},Re(a.quoteCompanySettings),b()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",n=>{const i=n.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},Re(a.quoteCompanySettings),b()}),e.querySelector("#qs-seal-file")?.addEventListener("change",n=>{const i=n.target.files?.[0];if(!i)return;const c=new FileReader;c.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:c.result},Re(a.quoteCompanySettings),b()},c.readAsDataURL(i)}),e.querySelector("#qs-seal-size")?.addEventListener("input",n=>{const i=parseInt(n.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:i},Re(a.quoteCompanySettings),b()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},Re(a.quoteCompanySettings),b()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.month;i&&(a.demandForecast.calendarMonth=i,b())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.segment;a.demandForecast.selectedSegment=i,b()})}),e.querySelectorAll("[data-demand-tab]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.demandTab;i&&(a.demandTab=i,b())})});function d(n){const i=a.demandAnalysis,c=a.safetyStockParams;if(!i||c.length===0)return[];const m=i.months.filter(h=>h<n).slice(-3);return c.map(h=>{const g=h.productionType==="make_to_order",v=m.map(L=>i.matrix[h.productCode]?.[L]??0),_=g?0:v.length>0?Math.ceil(v.reduce((L,D)=>L+D,0)/v.length):Math.ceil(h.avgMonthlyDemand),$=g?0:Math.ceil(h.safetyStockQty),S=Math.max(0,_+$);return{id:"",yearMonth:n,productCode:h.productCode,productName:h.productName,demandForecast:_,safetyStockTarget:$,openingStock:0,requiredProduction:S,plannedQty:g?0:S,actualQty:0,status:"draft",productionType:h.productionType??"monthly",notes:""}})}e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async n=>{const i=parseInt(n.target.value)||3;a.demandYearsBack=i,a.demandAnalysis=null;const{fetchDemandAnalysis:c}=await x(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>C);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await c(i*12),b()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(n=>{n.addEventListener("change",()=>{const i=n.dataset.code??"",c=parseInt(n.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,g=c/30,v=Math.ceil(h*m.demandStdDev*Math.sqrt(g)),_=Math.ceil(m.avgMonthlyDemand*g+v);return{...m,leadTimeDays:c,safetyStockQty:v,reorderPoint:_}}),b()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(n=>{n.addEventListener("change",()=>{const i=n.dataset.code??"",c=parseFloat(n.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=c>=.99?2.33:c>=.97?1.88:c>=.95?1.65:c>=.9?1.28:1.04,g=m.leadTimeDays/30,v=Math.ceil(h*m.demandStdDev*Math.sqrt(g)),_=Math.ceil(m.avgMonthlyDemand*g+v);return{...m,serviceLevel:c,safetyStockQty:v,reorderPoint:_}}),b()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async n=>{if(a.safetyStockParams.length===0)return;const i=n.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveSafetyStockParamsBulk:c}=await x(async()=>{const{saveSafetyStockParamsBulk:h}=await Promise.resolve().then(()=>C);return{saveSafetyStockParamsBulk:h}},void 0),m=await c(a.safetyStockParams);i.disabled=!1,i.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const n=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),i=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(c=>{const m=n>=.99?2.33:n>=.97?1.88:n>=.95?1.65:n>=.9?1.28:1.04,h=i/30,g=Math.ceil(m*c.demandStdDev*Math.sqrt(h)),v=Math.ceil(c.avgMonthlyDemand*h+g);return{...c,serviceLevel:n,leadTimeDays:i,safetyStockQty:g,reorderPoint:v}}),b()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(n=>{n.addEventListener("change",()=>{const i=n.dataset.code??"",c=n.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===i?{...m,productionType:c}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async n=>{const i=n.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarShifts=wt(i,a.calendarDefaultPart,a.calendarDefaultEmp);const{fetchProductionPlan:c}=await x(async()=>{const{fetchProductionPlan:h}=await Promise.resolve().then(()=>C);return{fetchProductionPlan:h}},void 0),m=await c(i);a.productionPlan=m.length>0?m:d(i),b()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(n=>{n.addEventListener("click",()=>{a.demandPlanTypeFilter=n.dataset.filter??"all",b()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.sortCol??"";a.demandSort?.column===i?a.demandSort=a.demandSort.dir==="desc"?{column:i,dir:"asc"}:null:a.demandSort={column:i,dir:"desc"},b()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=d(a.demandPlanYearMonth),b()}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(c=>{const m=c.dataset.code??"",h=a.productionPlan.find(g=>g.productCode===m);h&&(h.plannedQty=parseFloat(c.value)||0)});const{saveProductionPlan:n}=await x(async()=>{const{saveProductionPlan:c}=await Promise.resolve().then(()=>C);return{saveProductionPlan:c}},void 0);await Promise.all(a.productionPlan.map(c=>n(c)));const{fetchProductionPlan:i}=await x(async()=>{const{fetchProductionPlan:c}=await Promise.resolve().then(()=>C);return{fetchProductionPlan:c}},void 0);a.productionPlan=await i(a.demandPlanYearMonth),b()}),e.querySelectorAll("[data-action='cal-select-day']").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.date??"";a.calendarSelectedDate=a.calendarSelectedDate===i?null:i,b()})}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(n=>{n.addEventListener("change",()=>{const i=n.dataset.date??"",c=parseInt(n.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.partTimers=c),b()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(n=>{n.addEventListener("change",()=>{const i=n.dataset.date??"",c=parseInt(n.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.employees=c),b()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async n=>{const i=n.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarSelectedDate=null,a.calendarShifts=wt(i,a.calendarDefaultPart,a.calendarDefaultEmp);const{fetchProductionPlan:c}=await x(async()=>{const{fetchProductionPlan:h}=await Promise.resolve().then(()=>C);return{fetchProductionPlan:h}},void 0),m=await c(i);a.productionPlan=m.length>0?m:d(i),b()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",n=>{const i=parseInt(n.target.value)||0;a.calendarDefaultPart=i;for(const c of a.calendarShifts)if(!c.confirmed){const m=new Date(c.date).getDay()===0||new Date(c.date).getDay()===6;c.partTimers=m?0:i}b()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",n=>{const i=parseInt(n.target.value)||0;a.calendarDefaultEmp=i;for(const c of a.calendarShifts)if(!c.confirmed){const m=new Date(c.date).getDay()===0||new Date(c.date).getDay()===6;c.employees=m?0:i}b()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=wt(a.demandPlanYearMonth,a.calendarDefaultPart,a.calendarDefaultEmp),b()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const n of a.calendarShifts)n.confirmed=!0;b()}),e.querySelectorAll("[data-action='select-month']").forEach(n=>{n.addEventListener("click",()=>{const i=parseInt(n.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=i,b())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",n=>{a.visitPlanner&&(a.visitPlanner.filterArea=n.target.value,b())}),e.querySelector("#visit-filter-score")?.addEventListener("change",n=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(n.target.value)||0,b())}),e.querySelectorAll("[data-sort-col]").forEach(n=>{n.addEventListener("click",i=>{const c=n.dataset.sortCol??"",m=i.shiftKey;a.route==="/product-power"?a.productSortState=Qe(a.productSortState,c,m):a.route==="/customer-efficiency"?a.customerSortState=Qe(a.customerSortState,c,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=Qe(a.dashboardSortState,c,m):a.route==="/master"?a.masterSortState=Qe(a.masterSortState,c,m):a.route==="/analytics"&&(a.analyticsSortState=Qe(a.analyticsSortState,c,m)),b()})}),e.querySelectorAll("[data-product-period]").forEach(n=>{n.addEventListener("click",()=>{a.productPeriod=n.dataset.productPeriod??"year",b()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const n=document.getElementById("pp-range-start")?.value??"",i=document.getElementById("pp-range-end")?.value??"";n&&i&&(a.productCustomStart=n,a.productCustomEnd=i,a.productPeriod="custom",b())}),e.querySelectorAll("[data-product-filter]").forEach(n=>{n.addEventListener("click",()=>{a.productFilter=n.dataset.productFilter??"all",b()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async n=>{const i=n.currentTarget;i.disabled=!0,i.textContent="更新中…",await Ve(),i.disabled=!1,i.textContent="↻ 更新",k("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const n=e.querySelector("#sales-start")?.value??"",i=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:n,endDate:i},Pd()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const n={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=n,Ad(n)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const n=e.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=n.trim().toUpperCase(),Cd(a.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(n=>{n.addEventListener("click",()=>{a.masterTab=n.dataset.tab,a.masterFilter={...Ea},b()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},b()}),e.querySelector("#master-search")?.addEventListener("keydown",n=>{n.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(n=>{n.addEventListener("click",()=>{const i=Number(n.dataset.page);i>=1&&(a.masterFilter={...a.masterFilter,page:i},b())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.table;if(!i)return;a.rawSelectedTable=i,a.rawPage=1;const c=await _t(i,1);a.rawRecords=c.records,a.rawTotalCount=c.total,b()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const n=await _t(a.rawSelectedTable,a.rawPage);a.rawRecords=n.records,a.rawTotalCount=n.total,b()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const n=await _t(a.rawSelectedTable,a.rawPage);a.rawRecords=n.records,a.rawTotalCount=n.total,b()}),e.querySelectorAll("[data-analytics-tab]").forEach(n=>{n.addEventListener("click",async()=>{if(a.analyticsTab=n.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:c}=await x(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}=await Promise.resolve().then(()=>C);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}},void 0);a.analyticsPeriodOptions=await c(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await i(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}b()})}),e.querySelectorAll("[data-analytics-period]").forEach(n=>{n.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:c,fetchPeriodChartData:m,prevYearFilter:h}=await x(async()=>{const{fetchAnalyticsByPeriod:v,fetchAvailablePeriods:_,fetchPeriodChartData:$,prevYearFilter:S}=await Promise.resolve().then(()=>C);return{fetchAnalyticsByPeriod:v,fetchAvailablePeriods:_,fetchPeriodChartData:$,prevYearFilter:S}},void 0),g=n.dataset.analyticsPeriod;if(a.analyticsPeriod=g,a.analyticsDrilldown=null,g==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await c(a.analyticsTab,g),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const v=a.analyticsPeriodFilter,[_,$,S]=await Promise.all([i(a.analyticsTab,g,v),m(g,v),m(g,h(v))]);a.analyticsPeriodRows=_,a.analyticsPeriodChartData=$,a.analyticsPrevYearChartData=S}b()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async n=>{const{fetchAnalyticsByPeriod:i,fetchPeriodChartData:c,prevYearFilter:m}=await x(async()=>{const{fetchAnalyticsByPeriod:v,fetchPeriodChartData:_,prevYearFilter:$}=await Promise.resolve().then(()=>C);return{fetchAnalyticsByPeriod:v,fetchPeriodChartData:_,prevYearFilter:$}},void 0);a.analyticsPeriodFilter=n.target.value,a.analyticsDrilldown=null;const h=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:v}=await x(async()=>{const{fiscalYearToDateRange:P}=await Promise.resolve().then(()=>as);return{fiscalYearToDateRange:P}},void 0),_=parseInt(h),$=v(_);v(_-1);const S=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:L}=await x(async()=>{const{supabaseRpc:P}=await Promise.resolve().then(()=>F);return{supabaseRpc:P}},void 0),[D,N,E]=await Promise.all([L(S,{p_date_from:$.from,p_date_to:$.to}),c("yearly",h),c("yearly",String(_-1))]);a.analyticsPeriodRows=(D??[]).map(P=>({code:String(P.code??""),name:String(P.name??""),amount:Number(P.amount??0),quantity:Number(P.quantity??0),documents:Number(P.documents??0),volumeMl:Number(P.volume_ml??0)})),a.analyticsPeriodChartData=(N??[]).map(P=>({...P})),a.analyticsPrevYearChartData=(E??[]).map(P=>({...P}))}else{const[v,_,$]=await Promise.all([i(a.analyticsTab,a.analyticsPeriod,h),c(a.analyticsPeriod,h),c(a.analyticsPeriod,m(h))]);a.analyticsPeriodRows=v,a.analyticsPeriodChartData=_,a.analyticsPrevYearChartData=$}b()}),e.querySelectorAll("[data-fiscal-mode]").forEach(n=>{n.addEventListener("click",async()=>{if(a.analyticsFiscalMode=n.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:i}=await x(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>as);return{monthToFiscalYear:m}},void 0),c=new Set;for(const m of a.salesAnalytics.monthlySales)c.add(i(m.month));a.analyticsPeriodOptions=[...c].sort((m,h)=>h-m).map(String)}else{const{fetchAvailablePeriods:i}=await x(async()=>{const{fetchAvailablePeriods:c}=await Promise.resolve().then(()=>C);return{fetchAvailablePeriods:c}},void 0);a.analyticsPeriodOptions=await i(a.analyticsTab,"yearly")}b()})}),e.querySelectorAll("[data-chart-metric]").forEach(n=>{n.addEventListener("click",()=>{a.analyticsChartMetric=n.dataset.chartMetric,b()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.analyticsDrilldown??"",c=n.dataset.drilldownName??i,m=a.analyticsTab,{fetchCustomerProductBreakdown:h,fetchProductCustomerBreakdown:g,fetchEntityMonthlySales:v,periodToDateRange:_}=await x(async()=>{const{fetchCustomerProductBreakdown:D,fetchProductCustomerBreakdown:N,fetchEntityMonthlySales:E,periodToDateRange:P}=await Promise.resolve().then(()=>C);return{fetchCustomerProductBreakdown:D,fetchProductCustomerBreakdown:N,fetchEntityMonthlySales:E,periodToDateRange:P}},void 0),$=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?_(a.analyticsPeriod,a.analyticsPeriodFilter):null,[S,L]=await Promise.all([v(i,m==="customers"?"customer":"product"),m==="customers"?h(i,$?.from,$?.to):g(i,$?.from,$?.to)]);a.analyticsDrilldown={tab:m,code:i,name:c,monthlySales:S,breakdownRows:L},b()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,b()}),e.querySelector("#staff-filter-input")?.addEventListener("input",n=>{a.analyticsStaffFilter=n.target.value,b()}),e.querySelectorAll("[data-staff-drilldown]").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.staffDrilldown??"",c=n.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:h,periodToDateRange:g}=await x(async()=>{const{fetchStaffCustomerBreakdown:L,fetchStaffProductBreakdown:D,periodToDateRange:N}=await Promise.resolve().then(()=>C);return{fetchStaffCustomerBreakdown:L,fetchStaffProductBreakdown:D,periodToDateRange:N}},void 0),v=g(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),_=a.analyticsStaffDrilldown?.breakdownTab??"customers",[$,S]=await Promise.all([m(i,v?.from,v?.to),h(i,v?.from,v?.to)]);a.analyticsStaffDrilldown={code:i,name:c,breakdownTab:_,customerRows:$,productRows:S},b()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(n=>{n.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:n.dataset.staffBreakdownTab},b())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,b()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",n=>{a.analyticsTagFilter=n.target.value,b()}),e.querySelectorAll("[data-staff-period]").forEach(n=>{n.addEventListener("click",async()=>{const{fetchAvailablePeriods:i,fetchStaffTotalsByPeriod:c,periodToDateRange:m}=await x(async()=>{const{fetchAvailablePeriods:g,fetchStaffTotalsByPeriod:v,periodToDateRange:_}=await Promise.resolve().then(()=>C);return{fetchAvailablePeriods:g,fetchStaffTotalsByPeriod:v,periodToDateRange:_}},void 0),h=n.dataset.staffPeriod;if(a.analyticsStaffPeriod=h,a.analyticsStaffDrilldown=null,h==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await i("staff",h),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const g=m(h,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await c(g?.from,g?.to)}b()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async n=>{const{fetchStaffTotalsByPeriod:i,periodToDateRange:c}=await x(async()=>{const{fetchStaffTotalsByPeriod:h,periodToDateRange:g}=await Promise.resolve().then(()=>C);return{fetchStaffTotalsByPeriod:h,periodToDateRange:g}},void 0);a.analyticsStaffPeriodFilter=n.target.value;const m=c(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await i(m?.from,m?.to),a.analyticsStaffDrilldown=null,b()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{ve(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},b()}),e.querySelectorAll("[data-action='remove-line']").forEach(n=>{n.addEventListener("click",()=>{ve(e);const i=parseInt(n.dataset.line??"0",10);a.invoiceForm.lines.splice(i,1),a.invoiceErrors=qn(a.invoiceForm),b()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(n=>{n.addEventListener("click",()=>{ve(e),fd(parseInt(n.dataset.line??"0",10)),a.invoiceErrors={},b()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{vd(),b()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{ve(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,b()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(n=>{n.addEventListener("click",()=>{ve(e);const i=parseInt(n.dataset.line??"0",10),c=a.invoiceForm.lines[i];a.pickerMode="product",a.pickerTargetLine=i,a.pickerQuery=c?c.productCode||c.productName:"",b()})}),e.querySelectorAll("[data-action='modal-close']").forEach(n=>{n.addEventListener("click",i=>{n.classList.contains("modal-backdrop")&&i.target instanceof HTMLElement&&!i.target.classList.contains("modal-backdrop")||(Pt(),b())})}),e.querySelectorAll("[data-action='picker-select']").forEach(n=>{const i=async()=>{const c=n.dataset.code??"",m=n.dataset.name??"";if(a.pickerMode==="customer"){a.invoiceForm.customerCode=c,a.invoiceForm.customerName=m,delete a.invoiceErrors.customerCode;const h=a.masterStats?.customers.find(g=>g.code===c);a.invoicePriceGroup=h?.priceGroup||"",!a.invoicePriceGroup&&c&&(a.invoicePriceGroup=await ea(c))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const h=a.invoiceForm.lines[a.pickerTargetLine];if(h){h.productCode=c,h.productName=m;const g=await on(a.invoicePriceGroup,c);g>0&&(h.unitPrice=g),h.amount=h.quantity*h.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}Pt(),b()};n.addEventListener("click",i),n.addEventListener("keydown",c=>{c.key==="Enter"&&i()})}),e.querySelector("#modal-search")?.addEventListener("input",n=>{a.pickerQuery=n.target.value,b()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Dn(),b()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{In(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{ve(e),gd(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await ea(a.invoiceForm.customerCode)),b())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{ve(e),bd(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,b())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(n=>{n.addEventListener("input",()=>{ve(e),a.invoiceSavedDocNo=null;const i=n.dataset.field;(i==="quantity"||i==="unitPrice")&&b()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{ve(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const n=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=n.trim(),a.deliveryNote=null,a.actionLoading=!0,b(),!a.deliverySearchDocNo){k("伝票番号を入力してください","error"),a.actionLoading=!1,b();return}ba(a.deliverySearchDocNo).then(i=>{a.deliveryNote=i,a.actionLoading=!1,b()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const n=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=n,a.billingSummary=null,a.actionLoading=!0,b(),$a(n).then(i=>{a.billingSummary=i,a.actionLoading=!1,b()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const n=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),i=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=n,a.taxMonth=i,a.taxDeclaration=null,a.actionLoading=!0,b(),wa(n,i).then(c=>{a.taxDeclaration=c,a.actionLoading=!1,b()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:n}=await x(async()=>{const{generateTaxXML:g}=await Promise.resolve().then(()=>C);return{generateTaxXML:g}},void 0),i=n(a.taxDeclaration),c=new Blob([i],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:n}=await x(async()=>{const{generateTaxCSV:g}=await Promise.resolve().then(()=>C);return{generateTaxCSV:g}},void 0),i=n(a.taxDeclaration),c=new Blob([i],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:n}=await x(async()=>{const{saveTaxDeclaration:i}=await Promise.resolve().then(()=>C);return{saveTaxDeclaration:i}},void 0);try{await n(a.taxDeclaration),k("下書き保存しました")}catch(i){k("保存に失敗: "+(i instanceof Error?i.message:String(i)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(n=>{n.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const i=Number(n.dataset.taxRow),c=n.dataset.taxField,m=n.type==="number"?Number(n.value)||0:n.value,h=[...a.taxDeclaration.rows];h[i]={...h[i],[c]:m};const{recalculateTaxDeclaration:g}=await x(async()=>{const{recalculateTaxDeclaration:v}=await Promise.resolve().then(()=>C);return{recalculateTaxDeclaration:v}},void 0);a.taxDeclaration=g({...a.taxDeclaration,rows:h}),b()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(n=>{n.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=Number(n.dataset.dedRow),c=n.dataset.dedField,m=n.type==="number"?Number(n.value)||0:n.value,h=[...a.taxDeclaration.deductions];h[i]={...h[i],[c]:m},a.taxDeclaration={...a.taxDeclaration,deductions:h},b()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(n=>{n.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=n.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[i]:n.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:n,TAX_RATE_CATEGORIES:i}=await x(async()=>{const{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:g}=await Promise.resolve().then(()=>C);return{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:g}},void 0),c=i[0],m={taxCategory:c.code,taxCategoryName:c.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:c.taxRatePerLiter,taxAmount:0};a.taxDeclaration=n({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),b()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(n=>{n.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const i=Number(n.dataset.taxRow),{recalculateTaxDeclaration:c}=await x(async()=>{const{recalculateTaxDeclaration:h}=await Promise.resolve().then(()=>C);return{recalculateTaxDeclaration:h}},void 0),m=a.taxDeclaration.rows.filter((h,g)=>g!==i);a.taxDeclaration=c({...a.taxDeclaration,rows:m}),b()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const n={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,n]},b()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(n=>{n.addEventListener("click",()=>{if(!a.taxDeclaration)return;const i=Number(n.dataset.dedRow),c=a.taxDeclaration.deductions.filter((m,h)=>h!==i);a.taxDeclaration={...a.taxDeclaration,deductions:c},b()})}),e.querySelectorAll("[data-store-tab]").forEach(n=>{n.addEventListener("click",()=>{a.storeTab=n.dataset.storeTab,b()})}),e.querySelectorAll("[data-import-entity]").forEach(n=>{n.addEventListener("click",()=>{a.importEntity=n.dataset.importEntity,a.importPreview=null,a.importResult=null,b()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const n=ic(a.importEntity),i=new Blob([n],{type:"text/csv;charset=utf-8"}),c=URL.createObjectURL(i),m=document.createElement("a");m.href=c,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(c)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const i=e.querySelector("#import-file")?.files?.[0];if(!i){k("CSVファイルを選択してください","warning");return}const c=new FileReader;c.onload=()=>{const m=String(c.result??""),{columns:h,rows:g}=nc(m);a.importPreview=oc(a.importEntity,h,g),a.importResult=null,b()},c.readAsText(i,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,b()}),e.querySelectorAll("[data-print-template]").forEach(n=>{n.addEventListener("click",()=>{a.printTemplate=n.dataset.printTemplate,b()})}),e.querySelectorAll("[data-print-field]").forEach(n=>{n.addEventListener("change",()=>{const i=n.dataset.printField;let c=n.value;(i==="taxRate"||i==="previousBalance"||i==="paymentAmount")&&(c=Number(n.value)||0),a.printData={...a.printData,[i]:c},b()})}),e.querySelectorAll("[data-print-opt]").forEach(n=>{const i=()=>{const c=n.dataset.printOpt;let m;n.type==="checkbox"?m=n.checked:c==="copies"?m=Number(n.value)||1:c==="overlayOpacity"||c==="calibrationOffsetX"||c==="calibrationOffsetY"?m=Number(n.value)||0:m=n.value,a.printOptions={...a.printOptions,[c]:m},b()};n.addEventListener("change",i),n.type==="range"&&n.addEventListener("input",i)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(n=>{n.addEventListener("change",()=>{const i=Number(n.dataset.printLine),c=n.dataset.printLfield,m=[...a.printData.lines];let h=n.value;(c==="quantity"||c==="unitPrice")&&(h=Number(n.value)||0),m[i]={...m[i],[c]:h},m[i].amount=(Number(m[i].quantity)||0)*(Number(m[i].unitPrice)||0),a.printData={...a.printData,lines:m},b()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},b()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(n=>{n.addEventListener("click",()=>{const i=Number(n.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((c,m)=>m!==i)},b()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),k("印刷設定を保存しました")}catch(n){k("保存失敗: "+(n instanceof Error?n.message:String(n)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const n=a.printCompany,i=prompt("会社名",n.name);if(i===null)return;const c=prompt("郵便番号",n.postalCode)??n.postalCode,m=prompt("住所",n.address1)??n.address1,h=prompt("TEL",n.tel)??n.tel,g=prompt("FAX",n.fax)??n.fax,v=prompt("適格請求書登録番号 (T+13桁)",n.registrationNo)??n.registrationNo,_=prompt("取引銀行名",n.bankName)??n.bankName,$=prompt("支店名",n.bankBranch)??n.bankBranch,S=prompt("口座番号",n.bankAccountNo)??n.bankAccountNo,L=prompt("口座名義",n.bankAccountHolder)??n.bankAccountHolder;a.printCompany={...n,name:i,postalCode:c,address1:m,tel:h,fax:g,registrationNo:v,bankName:_,bankBranch:$,bankAccountNo:S,bankAccountHolder:L},b()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,b()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const n=e.querySelector(".fd-canvas");if(!n)return;const c=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=Bt(n),{savePrintLayout:h}=await x(async()=>{const{savePrintLayout:v}=await Promise.resolve().then(()=>C);return{savePrintLayout:v}},void 0),g={id:`bp1701_${c.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:c,templateKey:"chain_store",positions:m};try{await h(g)?(k(`クラウド保存成功: ${c}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),b()):(k("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(v){k("保存エラー: "+(v instanceof Error?v.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const n=e.querySelector(".fd-canvas");if(!n)return;const i=Bt(n);a.fdSavedPositions=i;try{localStorage.setItem("sake_fd_positions",JSON.stringify(i)),k(`ローカル保存完了: ${Object.keys(i).length}件`)}catch(c){k("保存失敗: "+(c instanceof Error?c.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const n=e.querySelector(".fd-canvas");if(!n)return;const c={templateKey:"chain_store",positions:Bt(n),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(c,null,2)],{type:"application/json"}),h=URL.createObjectURL(m),g=document.createElement("a");g.href=h,g.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,g.click(),URL.revokeObjectURL(h)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async n=>{const i=n.target.files?.[0];if(i)try{const c=await i.text(),h=JSON.parse(c).positions;if(!h)throw new Error("positions field not found");a.fdSavedPositions=h,localStorage.setItem("sake_fd_positions",JSON.stringify(h)),k(`インポート成功: ${Object.keys(h).length}件`),b()}catch(c){k("インポート失敗: "+(c instanceof Error?c.message:""),"error")}});const p=e.querySelector("#fd-saved-layouts");p&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:n}=await x(async()=>{const{fetchPrintLayouts:c}=await Promise.resolve().then(()=>C);return{fetchPrintLayouts:c}},void 0),i=await n("chain_store");i.length===0?p.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(p.innerHTML=`☁️ クラウド保存済み (${i.length}件):<br/>`+i.map(c=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${c.id}" style="margin:4px 4px 0 0;">${c.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${c.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),p.querySelectorAll("[data-action='fd-load-layout']").forEach(c=>{c.addEventListener("click",()=>{const m=c.dataset.layoutId,h=i.find(g=>g.id===m);h&&(a.fdSavedPositions=h.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(h.positions)),k(`読込完了: ${h.name}`),b())})}),p.querySelectorAll("[data-action='fd-delete-layout']").forEach(c=>{c.addEventListener("click",async()=>{const m=c.dataset.layoutId;if(!m||!await ue("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:h}=await x(async()=>{const{deletePrintLayout:v}=await Promise.resolve().then(()=>C);return{deletePrintLayout:v}},void 0);await h(m)?(k("削除しました"),b()):k("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await ue("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),b())});const u=e.querySelector("#fd-sel-x"),y=e.querySelector("#fd-sel-y");[u,y].forEach(n=>{n?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const i=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);i&&(u&&(i.style.left=u.value+"mm"),y&&(i.style.top=y.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(n=>{n.addEventListener("dragstart",i=>{n.classList.add("wf-dragging"),i.dataTransfer?.setData("text/plain",n.dataset.wfOrder??"")}),n.addEventListener("dragend",()=>n.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(n=>{n.addEventListener("dragover",i=>i.preventDefault()),n.addEventListener("drop",i=>{i.preventDefault();const c=i.dataTransfer?.getData("text/plain"),m=n.dataset.wfStage;if(!c||!m)return;const h=a.workflowOrders.find(g=>g.id===c);h&&(h.stage=m,b())})}),e.querySelectorAll("[data-mo-step]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.moStep;n.disabled||(a.mobileOrder.step=i,b())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",n=>{a.mobileOrder.customerQuery=n.target.value,b()}),e.querySelector("#mo-product-q")?.addEventListener("input",n=>{a.mobileOrder.productQuery=n.target.value,b()}),e.querySelectorAll("[data-mo-select-customer]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.moSelectCustomer,c=a.masterStats?.customers.find(m=>m.id===i);c&&(a.mobileOrder.selectedCustomer=c),b()})}),e.querySelectorAll("[data-mo-add-product]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.moAddProduct,c=a.masterStats?.products.find(h=>h.code===i);if(!c)return;const m=1800;a.mobileOrder.cart.push({productCode:c.code,productName:c.name,quantity:1,unit:"本",unitPrice:m,amount:m}),b()})}),e.querySelectorAll("[data-mo-qty]").forEach(n=>{n.addEventListener("click",()=>{const i=Number(n.dataset.moQty),c=n.dataset.moProduct,m=a.mobileOrder.cart.find(h=>h.productCode===c);m&&(m.quantity=Math.max(0,m.quantity+i),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(h=>h.productCode!==c)),b())})}),e.querySelectorAll("[data-mo-remove]").forEach(n=>{n.addEventListener("click",()=>{const i=Number(n.dataset.moRemove);a.mobileOrder.cart.splice(i,1),b()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const n=e.querySelector("#mo-memo");a.mobileOrder.memo=n?.value??"";const i="MO"+Date.now().toString().slice(-8);a.mobileOrder.submittedDocNo=i,a.mobileOrder.step="done",b()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},b()}),e.querySelectorAll("[data-tour-id]").forEach(n=>{n.addEventListener("click",()=>{a.tourActiveId=n.dataset.tourId??null,b()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(n=>{n.addEventListener("click",()=>{const i=a.tourInquiries.find(v=>v.id===a.tourActiveId);if(!i)return;const c=n.dataset.template==="confirm"?Dr:qr,m=e.querySelector("#tour-confirmed-time"),h=c.replaceAll("{name}",i.name).replaceAll("{partySize}",String(i.partySize)).replaceAll("{confirmedTime}",m?.value??i.visitDate),g=e.querySelector("#tour-reply-body");g&&(g.value=h)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const n=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",i=a.tourInquiries.find(m=>m.id===n);if(!i)return;const c=e.querySelector("#tour-confirmed-time");i.status="confirmed",i.repliedAt=new Date().toISOString(),i.confirmedTime=c?.value??"",k("返信メールを下書き保存し、ステータスを確定にしました"),b()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const n=e.querySelector("#lb-type")?.value??"",i=e.querySelector("#lb-area")?.value??"",c=e.querySelector("#lb-keyword")?.value??"";if(!n&&!c){k("業種かキーワードを入力してください","warning");return}a.leadSearchType=n,a.leadSearchArea=i,a.leadSearchQuery=c,a.leadSearching=!0,b();const m=a.integrations.find(_=>_.provider==="google_maps");if(!m||!m.config.api_key){k("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,b();return}const{searchPlaces:h}=await x(async()=>{const{searchPlaces:_}=await Promise.resolve().then(()=>C);return{searchPlaces:_}},void 0),g=[n,c].filter(Boolean).join(" "),v=await h(m,g,i);a.leadSearching=!1,v.error?k("検索失敗: "+v.error,"error"):a.leadSearchResults=v.results,b()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],b()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const n=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!n)return;const i=`ll_${Date.now()}`,c={id:i,name:n,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:h,fetchLeadLists:g,fetchLeadItems:v}=await x(async()=>{const{saveLeadList:S,saveLeadItem:L,fetchLeadLists:D,fetchLeadItems:N}=await Promise.resolve().then(()=>C);return{saveLeadList:S,saveLeadItem:L,fetchLeadLists:D,fetchLeadItems:N}},void 0);await m(c);const _=e.querySelectorAll(".lb-search-check:checked"),$=Array.from(_).map(S=>Number(S.dataset.idx));for(const S of $){const L=a.leadSearchResults[S];L&&await h({...L,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:i,businessType:a.leadSearchType})}a.leadLists=await g(),a.leadActiveListId=i,a.leadItems=await v(i),a.leadSearchResults=[],k(`${$.length}件を「${n}」として保存しました`),b()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.id??null;if(a.leadActiveListId=i,i){const{fetchLeadItems:c}=await x(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>C);return{fetchLeadItems:m}},void 0);a.leadItems=await c(i)}b()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.id??"",c=a.leadItems.find(g=>g.id===i);if(!c)return;const{saveLeadItem:m,fetchLeadItems:h}=await x(async()=>{const{saveLeadItem:g,fetchLeadItems:v}=await Promise.resolve().then(()=>C);return{saveLeadItem:g,fetchLeadItems:v}},void 0);await m({...c,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),b()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.id??"",c=a.leadItems.find(v=>v.id===i);if(!c)return;const{convertLeadToProspect:m,fetchLeadItems:h}=await x(async()=>{const{convertLeadToProspect:v,fetchLeadItems:_}=await Promise.resolve().then(()=>C);return{convertLeadToProspect:v,fetchLeadItems:_}},void 0);await m(c)&&(k("見込客に追加しました: "+c.companyName),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),b())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const n=e.querySelectorAll(".lb-item-check:checked");if(n.length===0&&!await ue("全ての新規アイテムを見込客に変換しますか？"))return;const i=n.length>0?Array.from(n).map(g=>g.dataset.id):a.leadItems.filter(g=>g.status==="new").map(g=>g.id),{convertLeadToProspect:c,fetchLeadItems:m}=await x(async()=>{const{convertLeadToProspect:g,fetchLeadItems:v}=await Promise.resolve().then(()=>C);return{convertLeadToProspect:g,fetchLeadItems:v}},void 0);let h=0;for(const g of i){const v=a.leadItems.find(_=>_.id===g);v&&v.status==="new"&&await c(v)&&h++}k(`${h}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),b()}),e.querySelectorAll("[data-map-filter]").forEach(n=>{n.addEventListener("change",()=>{const i=n.dataset.mapFilter;let c;n.type==="checkbox"?c=n.checked:c=n.value,a.mapFilters={...a.mapFilters,[i]:c},b()})}),e.querySelectorAll(".churn-reason-select").forEach(n=>{n.addEventListener("change",async()=>{const i=n.dataset.churnCode??"",c=n.value;try{const{saveChurnNote:m}=await x(async()=>{const{saveChurnNote:v}=await Promise.resolve().then(()=>C);return{saveChurnNote:v}},void 0);await m({customerCode:i,reason:c,memo:"",actionedAt:null});const h=a.churnNotes.find(v=>v.customerCode===i);h?h.reason=c:a.churnNotes.push({customerCode:i,reason:c,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const g=n.closest("tr");if(g){const v=g.querySelector("td:nth-child(2)");if(v){let _=v.querySelector(".reason-badge");!_&&c&&(_=document.createElement("span"),_.className="status-pill info reason-badge",_.style.fontSize="0.72rem",v.appendChild(_)),_&&(_.textContent=c?id[c]??"":"")}}k("理由を保存しました")}catch(m){k("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(n=>{n.addEventListener("change",async()=>{const i=n.dataset.churnCode??"",c=n.checked,m=n.closest("tr");m&&(m.style.opacity=c?"0.45":"",m.setAttribute("data-actioned",c?"1":"0"));try{const{saveChurnNote:h}=await x(async()=>{const{saveChurnNote:$}=await Promise.resolve().then(()=>C);return{saveChurnNote:$}},void 0),g=a.churnNotes.find($=>$.customerCode===i),v=g?.reason??"",_=new Date().toISOString().slice(0,10);await h({customerCode:i,reason:v,memo:"",actionedAt:c?_:null}),g?g.actionedAt=c?_:null:a.churnNotes.push({customerCode:i,reason:v,memo:"",actionedAt:c?_:null,updatedAt:new Date().toISOString()}),k(c?"対応済みにしました":"対応済みを解除しました")}catch(h){k("保存に失敗しました","error"),console.error(h)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const n=a.integrations.find(h=>h.provider==="ivry");if(!n||!n.isEnabled){k("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:i,fetchCallLogs:c}=await x(async()=>{const{syncIvryCallLogs:h,fetchCallLogs:g}=await Promise.resolve().then(()=>C);return{syncIvryCallLogs:h,fetchCallLogs:g}},void 0),m=await i(n);m.error?k("同期失敗: "+m.error,"error"):(k(`${m.count}件の通話履歴を同期しました`),a.callLogs=await c(100),b())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const n=a.integrations.find(h=>h.provider==="ivry");if(!n||!n.isEnabled){k("IVRy連携が無効です","warning");return}if(!await ue("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:i}=await x(async()=>{const{syncPhoneBookToIvry:h}=await Promise.resolve().then(()=>C);return{syncPhoneBookToIvry:h}},void 0),c=[];a.masterStats?.customers.forEach(h=>{c.push({name:h.name,phone:"",customerCode:h.code,note:"既存取引先"})}),a.prospects.forEach(h=>{h.phone&&c.push({name:h.companyName,phone:h.phone,customerCode:h.id,note:`見込客 (${h.stage})`})});const m=await i(n,c);m.error?k("送信失敗: "+m.error,"error"):k(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.id??"",c=n.dataset.phone??"",m=prompt(`電話番号 ${c} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const h=a.callLogs.find(_=>_.id===i);if(!h)return;const{saveCallLog:g,fetchCallLogs:v}=await x(async()=>{const{saveCallLog:_,fetchCallLogs:$}=await Promise.resolve().then(()=>C);return{saveCallLog:_,fetchCallLogs:$}},void 0);await g({...h,matchedCustomerCode:m}),a.callLogs=await v(100),b()})}),e.querySelectorAll("[data-action='call-memo']").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.id??"",c=a.callLogs.find(v=>v.id===i);if(!c)return;const m=prompt("メモを入力:",c.notes??"");if(m===null)return;const{saveCallLog:h,fetchCallLogs:g}=await x(async()=>{const{saveCallLog:v,fetchCallLogs:_}=await Promise.resolve().then(()=>C);return{saveCallLog:v,fetchCallLogs:_}},void 0);await h({...c,notes:m}),a.callLogs=await g(100),b()})}),e.querySelectorAll("[data-prospect-view]").forEach(n=>{n.addEventListener("click",()=>{a.prospectViewMode=n.dataset.prospectView,b()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",b()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.id??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:c}=await x(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>C);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await c(i)}b()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.prospectId??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:c}=await x(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>C);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await c(i)}b()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(n=>{n.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],b())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const n=a.prospectEditingId==="__new__",i=n?`p_${Date.now()}`:a.prospectEditingId??"",c={id:i,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!c.companyName){k("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:h,recordAudit:g,sendSlackNotification:v}=await x(async()=>{const{saveProspect:$,fetchProspects:S,recordAudit:L,sendSlackNotification:D}=await Promise.resolve().then(()=>C);return{saveProspect:$,fetchProspects:S,recordAudit:L,sendSlackNotification:D}},void 0);await m(c)?(n&&await v("new_prospect",`新規見込客: ${c.companyName} / 想定 ¥${c.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await g({action:n?"prospect_create":"prospect_update",entityType:"prospect",entityId:i,userEmail:a.user?.email}),a.prospects=await h(),a.prospectEditingId=null,b()):k("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(n=>{n.addEventListener("click",async()=>{if(!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=n.dataset.id??"",{deleteProspect:c,fetchProspects:m}=await x(async()=>{const{deleteProspect:h,fetchProspects:g}=await Promise.resolve().then(()=>C);return{deleteProspect:h,fetchProspects:g}},void 0);await c(i)&&(a.prospects=await m(),b())})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const n=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",i=e.querySelector("#prospect-activity-type")?.value??"call",c=e.querySelector("#prospect-activity-title")?.value??"";if(!c){k("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:h}=await x(async()=>{const{saveProspectActivity:g,fetchProspectActivities:v}=await Promise.resolve().then(()=>C);return{saveProspectActivity:g,fetchProspectActivities:v}},void 0);await m({id:`act_${Date.now()}`,prospectId:n,activityType:i,title:c,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await h(n),b()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(n=>{n.addEventListener("dragstart",i=>{i.dataTransfer?.setData("text/plain",n.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(n=>{n.addEventListener("dragover",i=>i.preventDefault()),n.addEventListener("drop",async i=>{i.preventDefault();const c=i.dataTransfer?.getData("text/plain"),m=n.dataset.prospectStage;if(!c)return;const h=a.prospects.find(g=>g.id===c);if(h&&h.stage!==m){const g={...h,stage:m},{saveProspect:v}=await x(async()=>{const{saveProspect:_}=await Promise.resolve().then(()=>C);return{saveProspect:_}},void 0);await v(g),h.stage=m,b()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:n,saveIntegrationSetting:i}=await x(async()=>{const{fetchIntegrationSettings:_,saveIntegrationSetting:$}=await Promise.resolve().then(()=>C);return{fetchIntegrationSettings:_,saveIntegrationSetting:$}},void 0),m=(a.integrations.length>0?a.integrations:await n()).find(_=>_.provider==="slack");if(!m)return;const h=e.querySelector("#slack-webhook")?.value??"",g=e.querySelector("#slack-default-channel")?.value??"",v=e.querySelector("#slack-enabled")?.checked??!1;await i({...m,config:{...m.config,webhook_url:h,default_channel:g},isEnabled:v}),a.integrations=await n(),k("保存しました"),b()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:n,fetchSlackRules:i}=await x(async()=>{const{saveSlackRule:c,fetchSlackRules:m}=await Promise.resolve().then(()=>C);return{saveSlackRule:c,fetchSlackRules:m}},void 0);for(const c of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${c.id}"][data-slack-field="enabled"]`)?.checked??c.enabled,h=e.querySelector(`[data-slack-rule-id="${c.id}"][data-slack-field="channel"]`)?.value??c.channel;await n({...c,enabled:m,channel:h})}a.slackRules=await i(),k("ルールを保存しました"),b()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:n}=await x(async()=>{const{sendSlackNotification:c}=await Promise.resolve().then(()=>C);return{sendSlackNotification:c}},void 0),i=await n("new_order","🧪 これはテスト通知です (syusen-cloud)");i.ok?k("テスト送信成功"):k("送信失敗: "+(i.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,b()}),e.querySelectorAll("[data-action='material-adjust']").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.id??"",c=a.materialList.find(m=>m.id===i);c&&(a.materialEditing=c,a.materialEditingIsNew=!1,b())})}),e.querySelectorAll("[data-action='material-close']").forEach(n=>{n.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,b())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const i={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(i.materialType=e.querySelector("#mat-type")?.value??"",!i.code||!i.name){k("コードと品名は必須です","warning");return}const{saveMaterial:c,fetchMaterialList:m}=await x(async()=>{const{saveMaterial:g,fetchMaterialList:v}=await Promise.resolve().then(()=>C);return{saveMaterial:g,fetchMaterialList:v}},void 0);await c(i)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,k("保存しました"),b()):k("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const n=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!n||!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:i,fetchMaterialList:c}=await x(async()=>{const{deleteMaterial:m,fetchMaterialList:h}=await Promise.resolve().then(()=>C);return{deleteMaterial:m,fetchMaterialList:h}},void 0);await i(n)&&(a.materialList=await c(),a.materialEditing=null,b())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",b()}),e.querySelectorAll("[data-action='user-edit']").forEach(n=>{n.addEventListener("click",()=>{a.userEditingId=n.dataset.id??null,b()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,b()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const n=a.userEditingId==="__new__",i=n?crypto.randomUUID():a.userEditingId??"",c=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!c||!m){k("名前とメールアドレスは必須です","warning");return}const h={id:i,email:c,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(n){const S=e.querySelector("#user-password")?.value??"";if(S.length<8){k("パスワードは8文字以上必要です","warning");return}try{await Ra(c,S)}catch(L){k("Auth登録失敗: "+(L instanceof Error?L.message:""),"error");return}}const{saveUserProfile:g,fetchUserProfiles:v,recordAudit:_}=await x(async()=>{const{saveUserProfile:S,fetchUserProfiles:L,recordAudit:D}=await Promise.resolve().then(()=>C);return{saveUserProfile:S,fetchUserProfiles:L,recordAudit:D}},void 0);await g(h)?(await _({action:n?"user_create":"user_update",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await v(),a.userEditingId=null,k("保存しました"),b()):k("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(n=>{n.addEventListener("click",async()=>{if(!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=n.dataset.id??"",{deleteUserProfile:c,fetchUserProfiles:m,recordAudit:h}=await x(async()=>{const{deleteUserProfile:v,fetchUserProfiles:_,recordAudit:$}=await Promise.resolve().then(()=>C);return{deleteUserProfile:v,fetchUserProfiles:_,recordAudit:$}},void 0);await c(i)?(await h({action:"user_delete",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await m(),b()):k("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const n=e.querySelector("#profile-sender")?.value??"",i={...a.myProfile,defaultMailSenderId:n},{saveUserProfile:c}=await x(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>C);return{saveUserProfile:m}},void 0);await c(i),a.myProfile=i,k("保存しました"),b()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const n=e.querySelector("#profile-new-password")?.value??"";if(n.length<8){k("8文字以上のパスワードを入力してください","warning");return}try{await Yn(n),k("パスワードを変更しました")}catch(i){k("変更失敗: "+(i instanceof Error?i.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(n=>{n.addEventListener("click",()=>{a.integrationEditingId=n.dataset.id??null,b()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,b()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const n=document.querySelector("[data-action='int-save']")?.dataset.id??"",i=a.integrations.find(_=>_.id===n);if(!i)return;const c={...i.config};Object.keys(c).forEach(_=>{const $=e.querySelector(`#int-${_}`);$&&(c[_]=$.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:h,fetchIntegrationSettings:g}=await x(async()=>{const{saveIntegrationSetting:_,fetchIntegrationSettings:$}=await Promise.resolve().then(()=>C);return{saveIntegrationSetting:_,fetchIntegrationSettings:$}},void 0);await h({...i,config:c,isEnabled:m})?(a.integrations=await g(),a.integrationEditingId=null,k("保存しました"),b()):k("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(n=>{n.addEventListener("click",async()=>{const i=a.integrations.find(g=>g.provider==="shopify");if(!i){k("Shopify連携が未設定です","warning");return}n.textContent="同期中…",n.disabled=!0;const{syncShopifyOrders:c,fetchShopifyOrders:m}=await x(async()=>{const{syncShopifyOrders:g,fetchShopifyOrders:v}=await Promise.resolve().then(()=>C);return{syncShopifyOrders:g,fetchShopifyOrders:v}},void 0),h=await c(i);h.error?k("同期失敗: "+h.error,"error"):(k(`${h.count}件を同期しました`),a.shopifyOrders=await m()),b()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(n=>{n.addEventListener("click",async()=>{const i=a.integrations.find(g=>g.provider==="google_calendar");if(!i)return;n.textContent="同期中…",n.disabled=!0;const{syncGoogleCalendar:c,fetchCalendarEvents:m}=await x(async()=>{const{syncGoogleCalendar:g,fetchCalendarEvents:v}=await Promise.resolve().then(()=>C);return{syncGoogleCalendar:g,fetchCalendarEvents:v}},void 0),h=await c(i);h.error?k("同期失敗: "+h.error,"error"):(k(`${h.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),b()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const i=e.querySelector("#fax-file")?.files?.[0];if(!i){k("FAX画像を選択してください","warning");return}const c=a.integrations.find(m=>m.provider==="cloud_vision");if(!c||!c.config.api_key){k("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,b();try{const m=new FileReader;m.onload=async()=>{const h=String(m.result??""),{ocrFaxImage:g,saveFaxRecord:v,fetchFaxInbox:_}=await x(async()=>{const{ocrFaxImage:D,saveFaxRecord:N,fetchFaxInbox:E}=await Promise.resolve().then(()=>C);return{ocrFaxImage:D,saveFaxRecord:N,fetchFaxInbox:E}},void 0),$=await g(c,h),S=e.querySelector("#fax-sender-name")?.value??"",L=e.querySelector("#fax-sender-phone")?.value??"";await v({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:S,senderPhone:L,ocrStatus:$.error?"failed":"done",ocrText:$.text}),a.faxOcrText=$.error?`エラー: ${$.error}`:$.text,a.faxRecords=await _(),a.faxProcessing=!1,b()},m.readAsDataURL(i)}catch(m){k("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,b()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",b()}),e.querySelectorAll("[data-action='ms-edit']").forEach(n=>{n.addEventListener("click",()=>{a.mailSenderEditingId=n.dataset.id??null,b()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,b()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const n=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,i={id:n,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(g=>g.id===n)?.isVerified??!1};if(!i.name||!i.email){k("名前とメールアドレスは必須です","warning");return}const{saveMailSender:c,fetchMailSenders:m}=await x(async()=>{const{saveMailSender:g,fetchMailSenders:v}=await Promise.resolve().then(()=>C);return{saveMailSender:g,fetchMailSenders:v}},void 0);await c(i)?(a.mailSenders=await m(),a.mailSenderEditingId=null,k("保存しました"),b()):k("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(n=>{n.addEventListener("click",async()=>{if(!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=n.dataset.id??"",{deleteMailSender:c,fetchMailSenders:m}=await x(async()=>{const{deleteMailSender:g,fetchMailSenders:v}=await Promise.resolve().then(()=>C);return{deleteMailSender:g,fetchMailSenders:v}},void 0);await c(i)?(a.mailSenders=await m(),b()):k("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(n=>{n.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){k("データなし","error");return}const n=a.demandAnalysis,i=Object.entries(n.matrix).map(([m,h])=>{const g={productCode:m};return n.months.forEach(v=>{g[v]=h[v]??0}),g}),c=[{key:"productCode",label:"商品コード"},...n.months.map(m=>({key:m,label:m}))];da("demand-analysis.csv",i,c)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){k("データなし","error");return}const n=a.productionPlan.map(c=>({...c}));da("production-plan.csv",n,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数量"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await ue("当月の全請求を締め切りますか？")&&k("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async n=>{const i=parseInt(n.target.value);a.brewingPlanFY=i;const{fetchBrewingPlanSummary:c,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:h}=await x(async()=>{const{fetchBrewingPlanSummary:$,fetchBrewingMonthlyTrend:S,fetchBrewingSchedule:L}=await Promise.resolve().then(()=>C);return{fetchBrewingPlanSummary:$,fetchBrewingMonthlyTrend:S,fetchBrewingSchedule:L}},void 0),[g,v,_]=await Promise.all([c(`${i}-10-01`,`${i+1}-09-30`),m(`${i}-10-01`,`${i+1}-09-30`),h(i)]);a.brewingPlanData=g,a.brewingMonthlyTrend=v,a.brewingSchedule=_,b()}),e.querySelectorAll(".btn-edit-stock").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.catId??"";e.querySelector(`#stock-display-${i}`).style.display="none",e.querySelector(`#stock-edit-${i}`).style.display="",n.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.catId??"";e.querySelector(`#stock-display-${i}`).style.display="",e.querySelector(`#stock-edit-${i}`).style.display="none",e.querySelector(`.btn-edit-stock[data-cat-id="${i}"]`).style.display=""})}),e.querySelectorAll(".btn-add-schedule-row").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.catId??"",c=e.querySelector(`#schedule-rows-${i}`);if(!c)return;const m=c.querySelectorAll(".schedule-edit-row").length,h=document.createElement("div");h.innerHTML=buildScheduleEditRowHTML(i,m,9,2,0,"");const g=h.firstElementChild;c.appendChild(g),g.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>g.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(n=>{n.addEventListener("click",()=>n.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.cat??"",c=n.dataset.catId??"",m=e.querySelector(`#stock-input-${c}`),h=e.querySelector(`#cost-input-${c}`),g=parseFloat(m?.value??""),v=parseFloat(h?.value??"0")||0;if(isNaN(g)||g<0){alert("有効な数値を入力してください");return}const _=[...e.querySelectorAll(`#schedule-rows-${c} .schedule-edit-row`)].map($=>({brewMonth:parseInt($.querySelector(".schedule-month")?.value??"0"),durationMonths:parseInt($.querySelector(".schedule-duration")?.value??"2"),plannedVolumeL:parseFloat($.querySelector(".schedule-volume")?.value??"0")})).filter($=>$.brewMonth>=1&&$.brewMonth<=12);n.textContent="保存中...",n.setAttribute("disabled","true");try{const{upsertBrewingStock:$,saveBrewingSchedule:S,fetchBrewingPlanSummary:L,fetchBrewingMonthlyTrend:D,fetchBrewingSchedule:N}=await x(async()=>{const{upsertBrewingStock:I,saveBrewingSchedule:j,fetchBrewingPlanSummary:K,fetchBrewingMonthlyTrend:H,fetchBrewingSchedule:ae}=await Promise.resolve().then(()=>C);return{upsertBrewingStock:I,saveBrewingSchedule:j,fetchBrewingPlanSummary:K,fetchBrewingMonthlyTrend:H,fetchBrewingSchedule:ae}},void 0),E=a.brewingPlanFY;await Promise.all([$(i,g,v),S(i,E,_)]);const[P,R,A]=await Promise.all([L(`${E}-10-01`,`${E+1}-09-30`),D(`${E}-10-01`,`${E+1}-09-30`),N(E)]);a.brewingPlanData=P,a.brewingMonthlyTrend=R,a.brewingSchedule=A,b()}catch($){console.error("[brewing save]",$),alert(`保存エラー: ${String($)}`),n.textContent="保存",n.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(n=>{n.addEventListener("click",()=>{const c=`sub-row-${(n.dataset.toggleCat??"").replace(/[^a-zA-Z0-9]/g,"_")}`,m=e.querySelectorAll(`.${c}`),h=n.querySelector(".toggle-icon"),g=m[0]?.style.display!=="none";m.forEach(v=>{v.style.display=g?"none":""}),h&&(h.innerHTML=g?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{k("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{k("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(n=>{n.addEventListener("click",()=>{k("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{k("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(n=>{n.addEventListener("click",async()=>{await ue("この買掛を入金済みにしますか？")&&k("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(n=>{n.addEventListener("click",()=>{k("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{k("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(n=>{n.addEventListener("click",()=>{const i=n.closest("tr")?.querySelector("td")?.textContent??"";k(`タンク ${i} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{k("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(n=>{n.addEventListener("click",()=>{const i=n.closest("tr")?.querySelector("td")?.textContent??"";k(`注文 ${i} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{k("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(n=>{n.addEventListener("click",()=>{k("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{k("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.customer??"";k(`得意先 ${i} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{k("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const n=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!n||!await ue("このリストを削除しますか？"))return;const{supabaseDelete:c}=await x(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>F);return{supabaseDelete:h}},void 0);if(await c("lead_lists",n)){const{fetchLeadLists:h}=await x(async()=>{const{fetchLeadLists:g}=await Promise.resolve().then(()=>C);return{fetchLeadLists:g}},void 0);a.leadLists=await h(),k("削除しました","success"),b()}else k("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{k("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.scYm;if(!i)return;a.shipmentCalendarYearMonth=i,a.shipmentCalendarData=null,a.shipmentCalendarSelectedDate=null,b();const{fetchShipmentCalendar:c}=await x(async()=>{const{fetchShipmentCalendar:m}=await Promise.resolve().then(()=>C);return{fetchShipmentCalendar:m}},void 0);a.shipmentCalendarData=await c(i),b()})}),e.querySelectorAll("[data-sc-date]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.scDate;i&&(a.shipmentCalendarSelectedDate=a.shipmentCalendarSelectedDate===i?null:i,b())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(n=>{n.addEventListener("click",async()=>{a.calendarYearMonth=n.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:i}=await x(async()=>{const{fetchCalendarEvents:c}=await Promise.resolve().then(()=>C);return{fetchCalendarEvents:c}},void 0);a.calendarEvents=await i(a.calendarYearMonth),b()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async n=>{a.calendarYearMonth=n.target.value;const{fetchCalendarEvents:i}=await x(async()=>{const{fetchCalendarEvents:c}=await Promise.resolve().then(()=>C);return{fetchCalendarEvents:c}},void 0);a.calendarEvents=await i(a.calendarYearMonth),b()}),e.querySelector("#cal-filter-category")?.addEventListener("change",n=>{a.calendarFilterCategory=n.target.value,b()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const n=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(n.getTime()+3600*1e3).toISOString(),isAllDay:!1}},b()}),e.querySelectorAll("[data-cal-date]").forEach(n=>{n.tagName!=="BUTTON"&&n.addEventListener("click",i=>{if(i.target.closest(".cal-event"))return;const c=n.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${c}T10:00:00`,isAllDay:!1}},b()})}),e.querySelectorAll("[data-cal-event-id]").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const c=n.dataset.calEventId,m=a.calendarEvents.find(h=>h.id===c);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},b())})}),e.querySelectorAll("[data-action='cal-close']").forEach(n=>{n.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.calendarEdit=null,b())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:n,fetchCalendarEvents:i,CALENDAR_CATEGORY_COLORS:c}=await x(async()=>{const{saveCalendarEvent:_,fetchCalendarEvents:$,CALENDAR_CATEGORY_COLORS:S}=await Promise.resolve().then(()=>C);return{saveCalendarEvent:_,fetchCalendarEvents:$,CALENDAR_CATEGORY_COLORS:S}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,h=e.querySelector("#cal-category")?.value??"general",g={id:m,title:e.querySelector("#cal-title")?.value??"",category:h,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:c[h]};if(!g.title){k("タイトルは必須です","warning");return}await n(g)?(a.calendarEvents=await i(a.calendarYearMonth),a.calendarEdit=null,k("保存しました"),b()):k("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const n=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!n||!await ue("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:i,fetchCalendarEvents:c}=await x(async()=>{const{deleteCalendarEvent:h,fetchCalendarEvents:g}=await Promise.resolve().then(()=>C);return{deleteCalendarEvent:h,fetchCalendarEvents:g}},void 0);await i(n)?(a.calendarEvents=await c(a.calendarYearMonth),a.calendarEdit=null,k("削除しました"),b()):k("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,b();try{const n=a.importPreview.rows.filter(c=>c._valid),i=await lc(a.importEntity,n);a.importResult=`取り込み完了: ${i.inserted}件成功 / ${i.failed}件失敗`,a.importPreview=null}catch(n){a.importResult=`エラー: ${n instanceof Error?n.message:String(n)}`}finally{a.importing=!1,b()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const n=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=n,a.storeSales=[],a.actionLoading=!0,b(),xa(n).then(i=>{a.storeSales=i,a.actionLoading=!1,b()})}),e.querySelectorAll("[data-action='copy-config']").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.configValue??"";if(i)try{await navigator.clipboard.writeText(i),n.textContent="コピー済み",window.setTimeout(()=>{n.textContent="コピー"},1600)}catch(c){console.warn("Clipboard copy failed",c)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const i=JSON.stringify({supabase_url:ne,supabase_anon_key:X,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),c=new Blob([i],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download="relay_config.json",h.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(n=>{n.addEventListener("click",async()=>{const i=n.dataset.code??"";if(i)try{await navigator.clipboard.writeText(decodeURIComponent(i)),n.textContent="コピー済み",window.setTimeout(()=>{n.textContent="コピー"},1600)}catch(c){console.warn("Clipboard code copy failed",c)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(n=>{n.addEventListener("change",()=>{Ee(e),a.emailSaveMessage=null,b()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(n=>{n.addEventListener("change",()=>{Ee(e),a.emailSaveMessage=null,b()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{Ee(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{Ee(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(n=>{n.addEventListener("click",()=>{a.emailTemplateId=n.dataset.templateId??"custom";const i=En(a.emailTemplateId);a.emailSubject=i.subject,a.emailBody=i.body,a.emailSaveMessage=null,b()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{Ee(e);const n=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${n}`),a.emailSaveMessage=null,b()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{Ee(e),a.actionLoading=!0,b(),$t(Gt("draft")).then(n=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(n.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,b()})}),e.querySelector("#email-sender")?.addEventListener("change",n=>{a.emailSenderId=n.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{Ee(e),a.actionLoading=!0,a.emailSending=!0,b();const n=Gt("sent");a.mailSenders.find(i=>i.id===a.emailSenderId),Ks().then(async i=>{await $t({...n,recipientCount:i.sent}),a.emailSaveMessage=`${i.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,b(),k(`${i.sent}件送信完了`)}).catch(async()=>{await $t(Gt("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,b(),k("APIキー未設定のため下書き保存しました","warning")})})}function b(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=kd()}catch(s){console.error("[renderApp] render error:",s),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(s)}

${s?.stack??""}</div>`;return}Ed(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),Ta()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const s of["fd-scaler","print-scaler","q-preview-scaler"]){const o=e.querySelector(`#${s}`),l=o?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),r=l?.querySelector(".print-page")??l;if(!o||!r)continue;const d=o.parentElement?.clientWidth??0,p=r.offsetWidth;if(d>0&&p>0&&p>d-24){const u=(d-24)/p;o.style.transform=`scale(${u})`,o.style.transformOrigin="top left",o.style.height=`${(r.offsetHeight+48)*u}px`}else o.style.transform="",o.style.height=""}});const t=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=t?"hidden":"",document.body.style.touchAction=t?"none":""}const Mn="sake-cloud-cache",Ld=300*1e3;function Dd(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(Mn,JSON.stringify(e))}catch{}}function qd(){try{const e=localStorage.getItem(Mn);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>Ld?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let Rn=0;async function Ve(){const e=qd();e&&(a.loading=!1,b()),a.loading=!e,e||b();try{const[t,s,o,l,r,d,p,u]=await Promise.all([Ps(),As(),fa(),Cs(),nt(a.invoiceFilter),va(a.ledgerCustomerCode),ga(),Es()]);if(a.salesSummary=t,a.paymentStatus=s,a.masterStats=o,a.pipelineMeta=l,a.invoiceRecords=r,a.customerLedger=d,a.salesAnalytics=p,a.syncDashboard=u,Is().then(y=>{a.announcements=y,b()}),Be.length===0&&rd(),a.rawTableList.length===0&&nn().then(y=>{a.rawTableList=y,a.route==="/raw-browser"&&b()}),!a.salesFilter.startDate||!a.salesFilter.endDate){const n=[...t.salesRecords].sort((m,h)=>new Date(h.date).getTime()-new Date(m.date).getTime())[0]?.date??new Date().toISOString(),i=new Date(n),c=new Date(i);c.setDate(i.getDate()-30),a.salesFilter={startDate:vs(c.toISOString()),endDate:vs(i.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await nt(a.invoiceFilter)),a.error=null,Dd()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,b(),Na(a.route),Rn=Date.now()}}window.addEventListener("popstate",()=>{a.route=Ln(location.pathname),a.currentCategory=Ia(a.route),a.sidebarOpen=!1,it(),Na(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,b();return}if(e.key==="Escape"){if(a.globalSearchOpen){it(),b();return}if(a.pickerMode){Pt(),b();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Dn(),b());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&In(t)}});a.user=Ct()?Jn():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await x(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>C);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),b()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const s=localStorage.getItem("sake_fd_positions");s&&(a.fdSavedPositions=JSON.parse(s))}catch{}(function(){let t=null,s=0,o=0,l=0,r=0,d=1;document.addEventListener("mousedown",p=>{const u=p.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;p.preventDefault();const y=u.closest(".fd-canvas");if(!y)return;const n=y.getBoundingClientRect();if(n.width===0)return;d=228.6/n.width,t=u,s=p.clientX,o=p.clientY,l=parseFloat(u.style.left)||0,r=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(h=>h.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const i=document.querySelector("#fd-selected-info");i&&(i.textContent=`選択中: ${u.title}`);const c=document.querySelector("#fd-sel-x"),m=document.querySelector("#fd-sel-y");c&&(c.value=String(l)),m&&(m.value=String(r))}),document.addEventListener("mousemove",p=>{if(!t)return;const u=(p.clientX-s)*d,y=(p.clientY-o)*d,n=Math.round((l+u)*2)/2,i=Math.round((r+y)*2)/2;t.style.left=n+"mm",t.style.top=i+"mm";const c=document.querySelector("#fd-sel-x"),m=document.querySelector("#fd-sel-y");c&&(c.value=String(n)),m&&(m.value=String(i))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",p=>{if(!a.fdDesignMode||!a.fdActiveFieldId||p.key!=="ArrowLeft"&&p.key!=="ArrowRight"&&p.key!=="ArrowUp"&&p.key!=="ArrowDown"||p.target.tagName==="INPUT"||p.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;p.preventDefault();const y=.5;let n=parseFloat(u.style.left)||0,i=parseFloat(u.style.top)||0;p.key==="ArrowLeft"?n-=y:p.key==="ArrowRight"?n+=y:p.key==="ArrowUp"?i-=y:p.key==="ArrowDown"&&(i+=y),u.style.left=n+"mm",u.style.top=i+"mm";const c=document.querySelector("#fd-sel-x"),m=document.querySelector("#fd-sel-y");c&&(c.value=String(n)),m&&(m.value=String(i))})})();Ve();const Id=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&Ve()},Id);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-Rn>60*1e3&&Ve()});let ua="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{ua=e}).catch(()=>{});setInterval(async()=>{if(!(!ua||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==ua&&!a.updateAvailable&&(a.updateAvailable=!0,b())}catch{}},120*1e3);
