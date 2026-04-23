(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const qs="modulepreload",Ns=function(e){return"/sake-system/"+e},Yt={},_=function(t,n,i){let r=Promise.resolve();if(n&&n.length>0){let c=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};var d=c;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");r=c(n.map(u=>{if(u=Ns(u),u in Yt)return;Yt[u]=!0;const p=u.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${y}`))return;const h=document.createElement("link");if(h.rel=p?"stylesheet":qs,p||(h.as="script"),h.crossOrigin="",h.href=u,o&&h.setAttribute("nonce",o),document.head.appendChild(h),p)return new Promise((f,g)=>{h.addEventListener("load",f),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function l(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&l(o.reason);return t().catch(l)})},G="https://loarwnuyvfxiscjjsmiz.supabase.co",V="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";async function et(e,t){try{const n=new URL(`/rest/v1/${e}`,G),i=await fetch(n.toString(),{method:"POST",headers:{apikey:V,Authorization:`Bearer ${V}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!i.ok)throw new Error(`HTTP ${i.status}`);return(await i.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function Rs(e,t){try{const n=new URL(`/rest/v1/${e}`,G),i=await fetch(n.toString(),{method:"POST",headers:{apikey:V,Authorization:`Bearer ${V}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!i.ok)throw new Error(`HTTP ${i.status}`);return(await i.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function At(e,t,n){try{const i=new URL(`/rest/v1/${e}?id=eq.${t}`,G);return(await fetch(i.toString(),{method:"PATCH",headers:{apikey:V,Authorization:`Bearer ${V}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function $e(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,G),i=await fetch(n.toString(),{method:"POST",headers:{apikey:V,Authorization:`Bearer ${V}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!i.ok)throw new Error(`HTTP ${i.status}`);return await i.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function Dt(e){try{const t=new URL(`/rest/v1/${e}`,G);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:V,Authorization:`Bearer ${V}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const i=n.headers.get("Content-Range");if(i){const r=i.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function A(e,t={}){try{const n=new URL(`/rest/v1/${e}`,G);Object.entries(t).forEach(([r,l])=>{n.searchParams.set(r,l)});const i=await fetch(n.toString(),{method:"GET",headers:{apikey:V,Authorization:`Bearer ${V}`,Accept:"application/json",Prefer:"return=representation"}});if(!i.ok)throw new Error(`HTTP ${i.status}`);return await i.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function H(e,t={},n=1e3){const i=[];let r=0;try{for(;;){const l=new URL(`/rest/v1/${e}`,G);Object.entries(t).forEach(([o,c])=>{l.searchParams.set(o,c)}),l.searchParams.set("limit",String(n)),l.searchParams.set("offset",String(r));const d=await fetch(l.toString(),{method:"GET",headers:{apikey:V,Authorization:`Bearer ${V}`,Accept:"application/json",Prefer:"return=representation"}});if(!d.ok)throw new Error(`HTTP ${d.status}`);const a=await d.json();if(i.push(...a),a.length<n)break;r+=n}return i}catch(l){return console.warn(`Failed to query all rows from Supabase table ${e}`,l),i.length>0?i:[]}}const R=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:V,SUPABASE_URL:G,supabaseCount:Dt,supabaseInsert:et,supabaseQuery:A,supabaseQueryAll:H,supabaseRpc:$e,supabaseUpdate:At,supabaseUpsert:Rs},Symbol.toStringTag,{value:"Module"})),Et="sake_auth";function xa(e){localStorage.setItem(Et,JSON.stringify(e))}function Pa(){return{apikey:V,"Content-Type":"application/json"}}function Os(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),i=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(i))}catch{return null}}async function Aa(e,t){const n=await fetch(`${G}/auth/v1/${e}`,{method:"POST",headers:Pa(),body:JSON.stringify(t)}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i.error_description??i.msg??`HTTP ${n.status}`);return i}async function Ms(e,t){const n=await Aa("token?grant_type=password",{email:e,password:t});return xa({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Ut(e,t){const n=await Aa("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&xa({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function js(){const e=tt();if(localStorage.removeItem(Et),!!e?.access_token)try{await fetch(`${G}/auth/v1/logout`,{method:"POST",headers:{...Pa(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function tt(){const e=localStorage.getItem(Et);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function Fs(){const e=tt();if(!e)return null;const t=Os(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function Bs(e){const t=tt();if(!t)throw new Error("not signed in");const n=await fetch(`${G}/auth/v1/user`,{method:"PUT",headers:{apikey:V,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const i=await n.json().catch(()=>({}));throw new Error(i.msg??`HTTP ${n.status}`)}}const Ct={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},Da={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},zs={generatedAt:new Date().toISOString(),records:[]},oe={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},Vs={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},Js={},Ys={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function q(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function Us(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Qs(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function m(e,t,n=""){for(const i of t){const r=e[i];if(typeof r=="string"&&r.length>0)return r}return n}function $(e,t,n=0){for(const i of t)if(i in e)return q(e[i]);return n}function Y(e,t,n=!0){for(const i of t)if(i in e)return Qs(e[i]);return n}function z(e,t,n){for(const i of t){const r=e[i];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const l=new Date(r);if(!Number.isNaN(l.getTime()))return l.toISOString()}return n}function Hs(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:z(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:q(e.total_amount??e.billed_amount)}}function Qt(e){const t=e.trim().toUpperCase(),n=Js[t];if(n)return n;const i=Da.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:i?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function Ea(){const e=await H("daily_sales_detail",{select:"sales_date,amount,document_count,bottles,volume_ml,price_per_bottle,price_per_liter",order:"sales_date.desc"});if(e.length>0){const[t,n]=await Promise.all([A("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),A("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),r=new Date().toISOString().slice(0,10),l=r.slice(0,7),d=[...e].sort((h,f)=>h.sales_date.localeCompare(f.sales_date)).map(h=>({date:new Date(`${h.sales_date}T00:00:00Z`).toISOString(),amount:q(h.amount??h.sales_amount),bottles:q(h.bottles),volumeMl:q(h.volume_ml),pricePerBottle:q(h.price_per_bottle),pricePerLiter:q(h.price_per_liter)})),a=d.slice(-30),o=h=>q(h.amount??h.sales_amount),c=e.reduce((h,f)=>f.sales_date===r?h+o(f):h,0),u=e.reduce((h,f)=>f.sales_date.startsWith(l)?h+o(f):h,0),p=t.filter(h=>q(h.balance_amount)>0),y=n.map((h,f)=>({id:String(h.id??`sale-${f+1}`),documentNo:h.document_no??h.legacy_document_no??"",date:h.sales_date??"",customerCode:h.legacy_customer_code??"",customerName:h.customer_name??h.legacy_customer_code??"",amount:q(h.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:c,todayDelta:0,monthSales:u,monthDelta:0,unpaidCount:p.length,unpaidAmount:p.reduce((h,f)=>h+q(f.balance_amount),0)},dailySales:a,allDailySales:d,salesRecords:y}}return Da}async function Ca(){const e=await H("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const i=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${i}-${n+1}`,customerCode:i,customerName:i,billedAmount:q(t.billed_amount),paymentAmount:q(t.paid_amount),balanceAmount:q(t.balance_amount),lastPaymentDate:null,status:Us(t.payment_status)}})}:zs}async function He(){const[e,t]=await Promise.all([H("customers"),H("products")]);if(e.length>0||t.length>0){const n=e.length?e.map((r,l)=>{const d=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:m(r,["id","customer_id","code"],`customer-${l+1}`),code:m(r,["code","customer_code","legacy_customer_code"],`C${String(l+1).padStart(4,"0")}`),name:m(r,["name","customer_name","display_name"],`Customer ${l+1}`),kanaName:m(r,["kana_name"],""),shortName:m(r,["short_name"],""),postalCode:m(r,["postal_code"],""),address1:m(r,["address1"],""),address2:m(r,["address2"],""),phone:m(r,["phone"],""),fax:m(r,["fax"],""),email:m(r,["email"],""),staffCode:m(r,["staff_code"],""),businessType:m(r,["business_type"],""),areaCode:m(r,["delivery_area_code"],""),salesCategory:String(d.sales_category??""),closingDay:$(r,["closing_day","close_day"],31),paymentDay:$(r,["payment_day","due_day"],15),paymentMonth:Number(d.payment_month??0),paymentCycle:m(r,["payment_cycle"],""),billingCycleType:m(r,["billing_cycle_type"],""),billingCode:String(d.billing_code??""),creditLimit:$(r,["credit_limit"],0),taxMode:m(r,["tax_mode"],""),taxRound:String(d.tax_round??""),invoiceIssue:String(d.invoice_issue??""),invoiceType:m(r,["invoice_type"],""),priceGroup:String(d.price_group??""),priceType:String(d.price_type??""),customerGroup1:String(d.customer_group1??""),customerGroup2:String(d.customer_group2??""),bankName:m(r,["bank_name"],""),bankBranch:m(r,["bank_branch"],""),bankAccount:m(r,["bank_account"],""),isActive:Y(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):oe.customers,i=t.length?t.map((r,l)=>({id:m(r,["id","product_id","code"],`product-${l+1}`),code:m(r,["code","product_code","legacy_product_code"],`P${String(l+1).padStart(5,"0")}`),janCode:m(r,["jan_code","jan","barcode"],""),name:m(r,["name","product_name","display_name"],`Product ${l+1}`),kanaName:m(r,["kana_name"],""),shortName:m(r,["short_name"],""),category:m(r,["category","category_name","category_code"],"未分類"),taxCategoryCode:m(r,["tax_category_code"],""),isActive:Y(r,["is_active","active","enabled"],!0),listPrice:$(r,["list_price"],0),purchasePrice:$(r,["purchase_price"],0),salePrice:$(r,["default_sale_price","sale_price"],0),costPrice:$(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:m(r,["unit"],"本"),bottleType:m(r,["bottle_type"],""),containerCode:m(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:m(r,["rice_type"],""),season:m(r,["season"],""),agingYears:$(r,["aging_years"],0)})):oe.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||oe.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:oe.summary.activeCustomerCount,productCount:t.length||oe.summary.productCount,activeProductCount:t.length?i.filter(r=>r.isActive).length:oe.summary.activeProductCount},customers:n,products:i}}return oe}async function La(){const[e,t]=await Promise.all([A("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),A("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?z(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const i=e[0],r=m(i,["status"],"success"),l=i.errors,d=Array.isArray(l)?l.length>0:!!l;return{generatedAt:new Date().toISOString(),lastSyncAt:z(i,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:d?"warning":r==="error"?"error":"success",jobName:m(i,["agent_hostname"],"sake-relay"),message:`${$(i,["rows_upserted"],0)}行同期 / ${$(i,["files_updated"],0)}ファイル更新`}}return{...Vs,lastDataAt:n}}async function Ia(){const e=await $e("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function Ge(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount,line_count",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];e.customerCode.trim()&&n.push(`customer_code.ilike.*${e.customerCode.trim()}*`,`legacy_customer_code.ilike.*${e.customerCode.trim()}*`),e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const i=await A("mv_invoice_with_line_count",t);return i.length>0?i.map((r,l)=>({id:m(r,["id"],`invoice-${l}`),documentNo:m(r,["document_no","legacy_document_no"],""),date:z(r,["sales_date"],""),customerCode:m(r,["legacy_customer_code","customer_code"],""),customerName:m(r,["customer_name","legacy_customer_code"],""),itemCount:$(r,["line_count"],0),amount:$(r,["total_amount","billed_amount"],0)})):[]}async function Lt(e){const t=e.trim().toUpperCase();if(!t)return Qt("");const[n,i,r]=await Promise.all([A("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),A("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),A("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||i.length>0){const l=n.map((o,c)=>{const u=Hs(o,c);return{id:u.id,date:u.date,documentNo:u.documentNo,amount:u.amount}}),d=i.map((o,c)=>({id:String(o.id??`payment-${c+1}`),date:z(o,["payment_date","received_date"],new Date().toISOString()),amount:q(o.payment_amount??o.amount),method:o.payment_method??o.method??"入金"})),a=r.find(o=>(o.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:q(a?.balance_amount),salesTotal:l.reduce((o,c)=>o+c.amount,0),paymentTotal:d.reduce((o,c)=>o+c.amount,0),salesHistory:l,paymentHistory:d}}return Qt(t)}async function Ta(){const[e,t,n,i]=await Promise.all([A("mv_monthly_sales",{order:"month.asc"}),A("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),A("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),A("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.slice(-12).map(r=>({month:m(r,["month"],""),amount:$(r,["amount"],0)})),productTotals:n.map(r=>({code:m(r,["code"],""),name:m(r,["name"],""),amount:$(r,["amount"],0),quantity:$(r,["quantity"],0),documents:$(r,["documents"],0)})),customerTotals:t.map(r=>({code:m(r,["code"],""),name:m(r,["name"],""),amount:$(r,["amount"],0),quantity:$(r,["quantity"],0),documents:$(r,["documents"],0)})),staffTotals:i.map(r=>({code:m(r,["code"],""),name:m(r,["name"],""),amount:$(r,["amount"],0),quantity:$(r,["quantity"],0),documents:$(r,["documents"],0)}))}:Ys}const qa={all:{products:"mv_product_sales_totals",customers:"mv_customer_sales_totals",staff:"mv_staff_sales_totals"},yearly:{products:"mv_product_sales_yearly",customers:"mv_customer_sales_yearly",staff:"mv_staff_sales_totals"},monthly:{products:"mv_product_sales_monthly",customers:"mv_customer_sales_monthly",staff:"mv_staff_sales_totals"},weekly:{products:"mv_product_sales_weekly",customers:"mv_customer_sales_weekly",staff:"mv_staff_sales_totals"},daily:{products:"mv_product_sales_daily",customers:"mv_customer_sales_daily",staff:"mv_staff_sales_totals"}};async function Gs(e,t,n){const i=qa[t][e],r={order:"amount.desc",limit:"200"};return n&&t!=="all"&&(r.period=`eq.${n}`),(await A(i,r)).map(d=>({code:m(d,["code"],""),name:m(d,["name"],""),period:m(d,["period"],""),amount:$(d,["amount"],0),quantity:$(d,["quantity"],0),documents:$(d,["documents"],0)}))}async function Xs(e,t){if(t==="all")return[];const n=e==="staff"?"customers":e,i=qa[t][n],r=await $e("get_distinct_periods",{view_name:i});if(r&&r.length>0)return r.map(a=>a.period).filter(Boolean).sort().reverse();const l=await A(i,{select:"period",order:"period.desc",limit:"1000"});return[...new Set(l.map(a=>m(a,["period"],"")))].filter(Boolean).sort().reverse()}function Ks(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,i]=t.split("-").map(Number),r=`${n}-${String(i).padStart(2,"0")}-01`,l=new Date(n,i,0).getDate(),d=`${n}-${String(i).padStart(2,"0")}-${String(l).padStart(2,"0")}`;return{from:r,to:d}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const i=parseInt(n[1]),r=parseInt(n[2]),l=new Date(i,0,4),d=l.getDay()||7,a=new Date(l);a.setDate(l.getDate()-d+1);const o=new Date(a);o.setDate(a.getDate()+(r-1)*7);const c=new Date(o);return c.setDate(o.getDate()+6),{from:o.toISOString().slice(0,10),to:c.toISOString().slice(0,10)}}return null}function Na(e){return e.map(t=>({staffCode:m(t,["staff_code"],""),staffName:m(t,["staff_name"],""),code:m(t,["code"],""),name:m(t,["name"],""),tag:m(t,["tag"],""),amount:$(t,["amount"],0),quantity:$(t,["quantity"],0),documents:$(t,["documents"],0)}))}async function Ws(e,t){const n=await $e("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(i=>({code:m(i,["code"],""),name:m(i,["name"],""),amount:$(i,["amount"],0),quantity:$(i,["quantity"],0),documents:$(i,["documents"],0)})):[]}async function Zs(e,t,n){const i=await $e("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return i?Na(i):[]}async function en(e,t,n){const i=await $e("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return i?Na(i):[]}const ft={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Ra(e){const t=e.lines.reduce((r,l)=>r+l.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await et("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const Ht={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function It(e){const t=await A("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],i=q(n.total_amount);return{documentNo:e,invoiceDate:m(n,["sales_date","document_date"],""),customerCode:m(n,["legacy_customer_code","customer_code"],""),customerName:m(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:i,taxAmount:Math.floor(i*10/110),note:""}}return{...Ht,documentNo:e||Ht.documentNo}}const tn={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function Tt(e){const t=await A("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const l=$(r,["sales_amount"],0),d=$(r,["tax_amount"],0);return{customerCode:m(r,["customer_code"],""),customerName:m(r,["customer_name"],""),closingDay:31,salesAmount:l,taxAmount:d,prevBalance:0,paymentAmount:0,billingAmount:l,status:"open"}}),i=n.reduce((r,l)=>r+l.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:i,customers:n}}return{...tn,targetYearMonth:e}}const an={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function at(){const[e,t,n]=await Promise.all([A("mv_monthly_sales",{order:"month.asc"}),A("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),A("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return an;const i=e.slice(-12).map(o=>m(o,["month"],"")),r=new Map;t.forEach(o=>{const c=m(o,["code"],"");r.has(c)||r.set(c,{name:m(o,["name"],c),monthValues:new Map}),r.get(c).monthValues.set(m(o,["month"],""),$(o,["amount"],0))});const d=Array.from(r.entries()).map(([o,c])=>({code:o,name:c.name,total:i.reduce((u,p)=>u+(c.monthValues.get(p)??0),0),monthValues:c.monthValues})).sort((o,c)=>c.total-o.total).slice(0,10).map(o=>({label:o.name,values:i.map(c=>o.monthValues.get(c)??0)})),a=n.map(o=>({label:m(o,["name"],""),values:i.map(()=>Math.round($(o,["amount"],0)/i.length))}));return{generatedAt:new Date().toISOString(),months:i,salesByProduct:d,salesByCustomer:a,costSimulation:[]}}async function sn(){const e=await H("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const i=m(n,["code"],"");if(!i)return;const r=m(n,["month"],""),l=parseInt(r.slice(5,7))-1;if(l<0||l>11)return;let d=t.get(i);d||(d={name:m(n,["name"],i),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(i,d)),d.qty[l]+=$(n,["quantity"],0),d.amt[l]+=$(n,["amount"],0)}),Array.from(t.entries()).map(([n,i])=>({code:n,name:i.name,monthlyQuantity:i.qty,monthlyAmount:i.amt,totalQuantity:i.qty.reduce((r,l)=>r+l,0),totalAmount:i.amt.reduce((r,l)=>r+l,0)})).filter(n=>n.totalQuantity>0).sort((n,i)=>i.totalAmount-n.totalAmount)}async function nn(){return(await A("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:m(t,["product_code"],""),productName:m(t,["product_name"],""),forecastMonth:m(t,["forecast_month"],""),segment:m(t,["segment"],"monthly"),avgMonthly:$(t,["avg_monthly"],0),forecastQuantity:$(t,["forecast_quantity"],0),forecastAmount:$(t,["forecast_amount"],0),safetyStock:$(t,["safety_stock"],0),calculatedAt:z(t,["calculated_at"],"")}))}async function on(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await H("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(d=>String(d.id)).filter(Boolean);const i=await H("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(d=>{d.id&&r.set(String(d.id),d)});const l=[];return i.forEach(d=>{const a=String(d.header_id??d.document_header_id??""),o=r.get(a);if(!o)return;const c=o.sales_date??o.document_date??"";!c||c<t||l.push({date:c.slice(0,10),customerName:o.customer_name??"不明",productName:d.product_name??"不明",quantity:q(d.quantity),documentNo:o.document_no??o.legacy_document_no??""})}),l.sort((d,a)=>d.date.localeCompare(a.date))}async function Oa(){const e=new Date().toISOString();return(await A("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:m(n,["id"],""),message:m(n,["message"],""),level:m(n,["level"],"info"),startsAt:z(n,["starts_at"],""),endsAt:n.ends_at?z(n,["ends_at"],""):null,dismissible:Y(n,["dismissible"],!0)}))}async function ln(){const e=await H("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,is_dormant,is_at_risk",or:"(is_dormant.eq.true,is_at_risk.eq.true)"});return e.length>0?e.map(t=>({customer_code:m(t,["customer_code"],""),customer_name:m(t,["customer_name"],""),business_type:m(t,["business_type"],""),area_code:m(t,["area_code"],""),phone:m(t,["phone"],""),last_order_date:m(t,["last_order_date"],""),days_since_order:$(t,["days_since_order"],0),amount_12m:$(t,["amount_12m"],0),is_dormant:Y(t,["is_dormant"],!1),is_at_risk:Y(t,["is_at_risk"],!1)})):[]}async function rn(){return(await H("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:m(t,["customer_code"],""),customer_name:m(t,["customer_name"],""),phone:m(t,["phone"],""),address:m(t,["address"],""),area_code:m(t,["area_code"],""),business_type:m(t,["business_type"],""),priority_score:$(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:m(t,["last_order_date"],""),days_since_order:$(t,["days_since_order"],0),annual_revenue:$(t,["annual_revenue"],0),recommended_action:m(t,["recommended_action"],"")}))}async function cn(){return(await H("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:m(t,["product_code"],""),product_name:m(t,["product_name"],""),season_type:m(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:$(t,["avg_monthly_qty"],0)}))}async function dn(){return(await H("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:m(t,["product_code"],""),name:m(t,["product_name"],""),monthlyQuantity:[$(t,["m01"],0),$(t,["m02"],0),$(t,["m03"],0),$(t,["m04"],0),$(t,["m05"],0),$(t,["m06"],0),$(t,["m07"],0),$(t,["m08"],0),$(t,["m09"],0),$(t,["m10"],0),$(t,["m11"],0),$(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:$(t,["total_quantity"],0),totalAmount:$(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Ma(e,t,n){try{return await et("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function ja(e,t){return At("customers",e,t)}async function Fa(e,t){return At("products",e,t)}async function Ba(e,t){const n=e.find(d=>d.code===t);n?.priceGroup;const i=n?.priceGroup||t;let r="";try{const d=await A("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});d[0]?.memo&&(r=(typeof d[0].memo=="string"?JSON.parse(d[0].memo):d[0].memo)?.price_type??"")}catch{}const l=new Map;if(i){const d=await A("customer_product_prices",{price_group:`eq.${i}`,select:"legacy_product_code,special_price"});for(const a of d)l.set(a.legacy_product_code,a.special_price)}return{priceType:r,priceGroup:i,individualPrices:l}}function za(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"標準価格"}}async function Va(){return(await A("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function un(){return(await H("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Ja(){return(await A("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function Ya(){const[e,t]=await Promise.all([A("mv_customer_abc",{order:"amount.desc"}),at()]),n=e.map(i=>({code:m(i,["code"],""),name:m(i,["name"],""),amount:$(i,["amount"],0),documents:$(i,["documents"],0),ratio:$(i,["ratio"],0),cumRatio:$(i,["cum_ratio"],0),abcRank:m(i,["abc_rank"],"C")}));return{generatedAt:new Date().toISOString(),ranking:n,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function pn(){const[e,t]=await Promise.all([A("mv_product_abc",{order:"amount.desc"}),at()]),n=e.map(d=>({code:m(d,["code"],""),name:m(d,["name"],""),amount:$(d,["amount"],0),quantity:$(d,["quantity"],0),ratio:$(d,["ratio"],0),cumRatio:$(d,["cum_ratio"],0),abcRank:m(d,["abc_rank"],"C")})),i=n.reduce((d,a)=>d+a.amount,0),r=new Set(n.filter(d=>d.abcRank==="A").map(d=>d.name)),l=t.salesByProduct.filter(d=>r.has(d.label));return{generatedAt:new Date().toISOString(),totalAmount:i,ranking:n,months:t.months,monthlyByProduct:l.length>0?l:t.salesByProduct}}const Ua={planned:"計画中",active:"仕込中",done:"完了"};async function Qa(){const e=await A("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),jikomiNo:m(t,["batch_no","legacy_batch_no"],""),productName:m(t,["brand_name"],""),riceType:m(t,["rice_type"],""),plannedKg:$(t,["planned_rice_kg"],0),actualKg:$(t,["actual_rice_kg"],0),startDate:z(t,["start_date"],""),expectedDoneDate:z(t,["expected_done_date"],""),status:m(t,["status"],"planned"),tankNo:m(t,["tank_no"],""),note:m(t,["remarks"],"")})):[]}async function Ha(){const e=await A("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),tankNo:m(t,["tank_no"],""),capacity:$(t,["capacity_l"],0),currentVolume:$(t,["current_volume_l"],0),productName:m(t,["current_product_code"],""),jikomiNo:m(t,["current_batch_id"],""),status:m(t,["status"],"empty"),lastUpdated:z(t,["last_updated_at"],"")})):[]}async function Ga(){const e=await A("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),kenteiNo:m(t,["kentei_no"],""),jikomiNo:m(t,["batch_id"],""),productName:m(t,["product_code"],""),kenteiDate:z(t,["kentei_date"],""),alcoholDegree:$(t,["alcohol_degree"],0),extractDegree:$(t,["extract_degree"],0),sakaMeterValue:$(t,["sakemeter_value"],0),volume:$(t,["volume_l"],0),taxCategory:m(t,["tax_category_code"],""),status:m(t,["status"],"pending")})):[]}async function bt(){const e=await A("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),code:m(t,["material_code","legacy_material_code"],""),name:m(t,["name"],""),unit:m(t,["unit"],""),currentStock:$(t,["current_stock"],0),minimumStock:$(t,["minimum_stock"],0),unitCost:$(t,["unit_cost"],0),lastUpdated:z(t,["updated_at"],"")})):[]}async function Xa(){const e=await A("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),documentNo:m(t,["document_no","legacy_document_no"],""),purchaseDate:z(t,["purchase_date"],""),supplierCode:m(t,["supplier_code","legacy_supplier_code"],""),supplierName:m(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:$(t,["total_amount"],0),status:m(t,["payment_status"],"pending")})):[]}async function Ka(){const e=await A("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:m(t,["supplier_code","legacy_supplier_code"],""),supplierName:m(t,["legacy_supplier_code"],""),totalPurchase:$(t,["total_purchase"],0),paidAmount:$(t,["paid_amount"],0),balance:$(t,["balance"],0),nextPaymentDate:z(t,["next_payment_date"],""),status:m(t,["status"],"unpaid")})):[]}async function Wa(){const e=await A("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:m(t,["id"],""),billNo:m(t,["bill_no"],""),supplierName:m(t,["counterparty_name"],""),amount:$(t,["amount"],0),issueDate:z(t,["issue_date"],""),dueDate:z(t,["due_date"],""),status:m(t,["status"],"holding")})):[]}async function Za(){const e=await A("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:m(t,["material_code","legacy_material_code"],""),name:m(t,["name"],""),unit:m(t,["unit"],""),currentStock:$(t,["current_stock"],0),minimumStock:$(t,["minimum_stock"],0),lastPurchaseDate:z(t,["last_purchase_date"],""),unitCost:$(t,["unit_cost"],0)})):[]}const es=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],gt={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},mn={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function qt(e,t){const n=await A("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const i=n[0],r=m(i,["id"],""),[l,d]=await Promise.all([A("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),A("tax_deductions",{declaration_id:`eq.${r}`})]),a=l.map(c=>({taxCategory:m(c,["tax_category_code"],""),taxCategoryName:m(c,["tax_category_name"],""),alcoholDegree:$(c,["alcohol_degree"],0),volume:$(c,["taxable_volume"],0),taxRate:$(c,["tax_rate"],0),taxAmount:$(c,["tax_amount"],0),productionVolume:$(c,["production_volume"],0),previousBalance:$(c,["previous_balance"],0),currentAdjustment:$(c,["current_adjustment"],0),exportDeduction:$(c,["export_deduction"],0),sampleDeduction:$(c,["sample_deduction"],0),taxableVolume:$(c,["taxable_volume"],0)})),o=d.map(c=>({type:m(c,["deduction_type"],"sample"),categoryCode:m(c,["tax_category_code"],""),volume:$(c,["volume"],0),reason:m(c,["reason"],""),documentNo:m(c,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:m(i,["company_name"],""),companyNo:m(i,["company_no"],""),companyAddress:m(i,["company_address"],""),companyRepresentative:m(i,["company_representative"],""),taxOffice:m(i,["tax_office"],""),rows:a,deductions:o,totalVolume:$(i,["total_taxable_volume"],0),totalTax:$(i,["total_tax_amount"],0),status:m(i,["status"],"draft"),submittedAt:m(i,["submitted_at"],"")||null}}return{...mn,targetYear:e,targetMonth:t}}function K(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function ts(e){const t=e.rows.map(i=>`    <Category>
      <Code>${K(i.taxCategory)}</Code>
      <Name>${K(i.taxCategoryName)}</Name>
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
`),n=e.deductions.map(i=>`    <Deduction type="${K(i.type)}">
      <CategoryCode>${K(i.categoryCode)}</CategoryCode>
      <Volume>${i.volume}</Volume>
      <Reason>${K(i.reason)}</Reason>${i.documentNo?`
      <DocumentNo>${K(i.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${K(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${K(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${K(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${K(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${K(e.taxOffice)}</TaxOffice>
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
`}function yn(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function hn(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),i=e.rows.map(l=>[l.taxCategory,l.taxCategoryName,l.alcoholDegree,l.productionVolume,l.previousBalance,l.currentAdjustment,l.exportDeduction,l.sampleDeduction,l.taxableVolume,l.taxRate,l.taxAmount].map(yn).join(",")),r=`,合計,,${e.rows.reduce((l,d)=>l+d.productionVolume,0)},,,${e.rows.reduce((l,d)=>l+d.exportDeduction,0)},${e.rows.reduce((l,d)=>l+d.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...i,r].join(`
`)+`
`}function vn(e){const t=e.rows.map(r=>{const l=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),d=Math.round(l*r.taxRate);return{...r,taxableVolume:l,volume:l,taxAmount:d}}),n=t.reduce((r,l)=>r+l.taxableVolume,0),i=t.reduce((r,l)=>r+l.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:i}}async function fn(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>R);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:ts(e),submitted_at:e.submittedAt})}async function Nt(e){const t=await A("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:m(n,["id"],""),saleDate:m(n,["sale_date"],e),saleTime:m(n,["sale_time"],""),productCode:m(n,["product_code"],""),productName:m(n,["product_name"],""),quantity:$(n,["quantity"],0),unitPrice:$(n,["unit_price"],0),amount:$(n,["amount"],0),paymentMethod:m(n,["payment_method"],"cash")})):[]}async function as(){const e=await A("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:m(t,["id"],""),orderNo:m(t,["order_no"],""),orderDate:z(t,["order_date"],""),customerName:m(t,["customer_name"],""),postalCode:m(t,["postal_code"],""),address:m(t,["shipping_address"],""),items:[],totalAmount:$(t,["total_amount"],0),status:m(t,["status"],"new"),shippingDate:z(t,["shipping_date"],"")})):[]}async function Ue(e){const t=await et("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function ss(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function bn(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await A("print_layouts",t)).map(i=>({id:m(i,["id"],""),name:m(i,["name"],""),templateKey:m(i,["template_key"],""),positions:i.positions??{},isDefault:Y(i,["is_default"],!1),note:m(i,["note"],""),updatedAt:m(i,["updated_at"],"")}))}async function gn(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>R);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},i=await t("print_layouts",n);return i?{id:m(i,["id"],e.id),name:m(i,["name"],e.name),templateKey:m(i,["template_key"],e.templateKey),positions:i.positions??e.positions,isDefault:Y(i,["is_default"],!1),note:m(i,["note"],""),updatedAt:m(i,["updated_at"],"")}:null}async function $n(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function _n(){return(await A("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),email:m(t,["email"],""),displayName:m(t,["display_name"],""),signature:m(t,["signature"],""),replyTo:m(t,["reply_to"],""),isDefault:Y(t,["is_default"],!1),isVerified:Y(t,["is_verified"],!1),note:m(t,["note"],"")}))}async function wn(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:m(n,["id"],e.id),name:m(n,["name"],e.name),email:m(n,["email"],e.email),displayName:m(n,["display_name"],""),signature:m(n,["signature"],""),replyTo:m(n,["reply_to"],""),isDefault:Y(n,["is_default"],!1),isVerified:Y(n,["is_verified"],!1)}:null}async function kn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const Rt={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},Ot={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function Sn(e){const t=`${e}-01T00:00:00Z`,[n,i]=e.split("-").map(a=>parseInt(a,10)),r=new Date(n,i,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await A("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${l})`,order:"starts_at.asc"})).map(a=>({id:m(a,["id"],""),title:m(a,["title"],""),description:m(a,["description"],""),category:m(a,["category"],"general")||"general",startsAt:m(a,["starts_at"],new Date().toISOString()),endsAt:m(a,["ends_at"],""),isAllDay:Y(a,["is_all_day"],!1),location:m(a,["location"],""),attendees:a.attendees??[],relatedCustomerCode:m(a,["related_customer_code"],""),relatedOrderId:m(a,["related_order_id"],""),color:m(a,["color"],""),googleEventId:m(a,["google_event_id"],"")}))}async function xn(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??Ot[e.category],updated_at:new Date().toISOString()})?e:null}async function Pn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ns(){return(await A("integration_settings",{order:"name.asc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),provider:m(t,["provider"],""),config:t.config??{},isEnabled:Y(t,["is_enabled"],!1),lastSyncAt:m(t,["last_sync_at"],""),lastStatus:m(t,["last_status"],"")}))}async function Te(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function An(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const i=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(i,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const l=await r.json(),{supabaseInsert:d}=await _(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>R);return{supabaseInsert:o}},void 0);let a=0;for(const o of l.orders){const c=`shopify_${o.id}`;await d("shopify_orders",{id:c,shopify_order_id:String(o.id),order_number:String(o.order_number??""),order_date:String(o.created_at??new Date().toISOString()),customer_name:String(o.customer?.first_name??"")+" "+String(o.customer?.last_name??""),customer_email:String(o.customer?.email??""),total_amount:Math.round(parseFloat(String(o.total_price??"0"))),financial_status:String(o.financial_status??""),fulfillment_status:String(o.fulfillment_status??"unfulfilled"),line_items:o.line_items??[],shipping_address:o.shipping_address??null,raw_payload:o}),a++}return await Te({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${a}件取得成功`}),{count:a}}catch(i){return{count:0,error:i instanceof Error?i.message:String(i)}}}async function Dn(){return(await A("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:m(t,["id"],""),shopifyOrderId:m(t,["shopify_order_id"],""),orderNumber:m(t,["order_number"],""),orderDate:m(t,["order_date"],""),customerName:m(t,["customer_name"],""),customerEmail:m(t,["customer_email"],""),totalAmount:q(t.total_amount),financialStatus:m(t,["financial_status"],""),fulfillmentStatus:m(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function En(e){const t=e.config.refresh_token,n=e.config.client_id,i=e.config.client_secret;if(!t||!n||!i)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:i})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const d=(await r.json()).access_token;return await Te({...e,config:{...e.config,oauth_token:d}}),e.config.oauth_token=d,{token:d}}async function Cn(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const i=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),l=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${i}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let d=await fetch(l,{headers:{Authorization:`Bearer ${t}`}});if(d.status===401){const u=await En(e);if(u.error)return{count:0,error:u.error};t=u.token,d=await fetch(l,{headers:{Authorization:`Bearer ${t}`}})}if(!d.ok)return{count:0,error:`HTTP ${d.status}`};const a=await d.json(),{supabaseInsert:o}=await _(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>R);return{supabaseInsert:u}},void 0);let c=0;for(const u of a.items){const p=`gcal_${u.id}`,y=u.start?.dateTime??u.start?.date??"",h=u.end?.dateTime??u.end?.date??"";await o("calendar_events",{id:p,title:String(u.summary??"(無題)"),description:String(u.description??""),category:"general",starts_at:String(y),ends_at:String(h),location:String(u.location??""),google_event_id:String(u.id??""),updated_at:new Date().toISOString()}),c++}return await Te({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${c}件取得`}),{count:c}}catch(i){return{count:0,error:i instanceof Error?i.message:String(i)}}}async function Ln(){return(await A("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:m(t,["id"],""),receivedAt:m(t,["received_at"],""),senderPhone:m(t,["sender_phone"],""),senderName:m(t,["sender_name"],""),imageUrl:m(t,["image_url"],""),ocrStatus:m(t,["ocr_status"],"pending")||"pending",ocrText:m(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:m(t,["linked_invoice_id"],"")}))}async function In(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const i=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(i){return{text:"",error:i instanceof Error?i.message:String(i)}}}async function Tn(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Xe={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},Ke={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function qn(){return(await A("user_profiles",{order:"display_name.asc"})).map(t=>({id:m(t,["id"],""),email:m(t,["email"],""),displayName:m(t,["display_name"],""),staffCode:m(t,["staff_code"],""),department:m(t,["department"],"all")||"all",role:m(t,["role"],"staff")||"staff",defaultMailSenderId:m(t,["default_mail_sender_id"],""),phone:m(t,["phone"],""),avatarUrl:m(t,["avatar_url"],""),isActive:Y(t,["is_active"],!0),lastSignInAt:m(t,["last_sign_in_at"],""),createdAt:m(t,["created_at"],"")}))}async function Nn(e){if(!e)return null;const t=await A("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:m(n,["id"],""),email:m(n,["email"],""),displayName:m(n,["display_name"],""),staffCode:m(n,["staff_code"],""),department:m(n,["department"],"all")||"all",role:m(n,["role"],"staff")||"staff",defaultMailSenderId:m(n,["default_mail_sender_id"],""),phone:m(n,["phone"],""),avatarUrl:m(n,["avatar_url"],""),isActive:Y(n,["is_active"],!0),lastSignInAt:m(n,["last_sign_in_at"],"")}}async function Rn(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function On(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Mn(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>R);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function jn(e=100){return(await A("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),action:m(n,["action"],""),entityType:m(n,["entity_type"],""),entityId:m(n,["entity_id"],""),userEmail:m(n,["user_email"],""),changes:n.changes??{},createdAt:m(n,["created_at"],"")}))}const We={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function is(){return(await A("slack_notifications",{order:"event_type.asc"})).map(t=>({id:m(t,["id"],""),eventType:m(t,["event_type"],"new_order"),enabled:Y(t,["enabled"],!0),channel:m(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:m(t,["last_triggered_at"],"")}))}async function Fn(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function Bn(e=50){return(await A("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),eventType:m(n,["event_type"],""),channel:m(n,["channel"],""),message:m(n,["message"],""),status:m(n,["status"],"sent"),error:m(n,["error"],""),sentAt:m(n,["sent_at"],"")}))}async function zn(e,t,n){const r=(await ns()).find(c=>c.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const l=r.config.webhook_url;if(!l)return{ok:!1,error:"Webhook URL未設定"};const a=(await is()).find(c=>c.eventType===e&&c.enabled);if(!a)return{ok:!1,error:"通知ルールが無効"};const o=n??a.channel??r.config.default_channel??"#general";try{const c=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${We[e]} ${t}`,channel:o})}),u=c.ok,{supabaseInsert:p}=await _(async()=>{const{supabaseInsert:y}=await Promise.resolve().then(()=>R);return{supabaseInsert:y}},void 0);return await p("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:o,message:t,status:u?"sent":"failed",error:u?null:`HTTP ${c.status}`}),u?{ok:!0}:{ok:!1,error:`HTTP ${c.status}`}}catch(c){return{ok:!1,error:c instanceof Error?c.message:String(c)}}}const qe={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},st={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function Vn(){return(await A("prospects",{order:"updated_at.desc"})).map(t=>({id:m(t,["id"],""),companyName:m(t,["company_name"],""),contactName:m(t,["contact_name"],""),email:m(t,["email"],""),phone:m(t,["phone"],""),address:m(t,["address"],""),website:m(t,["website"],""),businessType:m(t,["business_type"],""),stage:m(t,["stage"],"cold"),source:m(t,["source"],""),expectedAmount:q(t.expected_amount),probability:q(t.probability),assignedStaffCode:m(t,["assigned_staff_code"],""),nextActionDate:m(t,["next_action_date"],""),nextAction:m(t,["next_action"],""),note:m(t,["note"],""),lastContactAt:m(t,["last_contact_at"],""),wonAt:m(t,["won_at"],""),lostAt:m(t,["lost_at"],""),lostReason:m(t,["lost_reason"],""),convertedCustomerCode:m(t,["converted_customer_code"],""),createdAt:m(t,["created_at"],"")}))}async function os(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()})?e:null}async function Jn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/prospects","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Yn(e){return(await A("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:m(n,["id"],""),prospectId:m(n,["prospect_id"],""),activityType:m(n,["activity_type"],"call"),title:m(n,["title"],""),description:m(n,["description"],""),activityDate:m(n,["activity_date"],""),result:m(n,["result"],""),staffCode:m(n,["staff_code"],"")}))}async function Un(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const ls=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function Qn(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function Hn(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Gn(){return(await A("delivery_locations",{order:"name.asc"})).map(t=>({id:m(t,["id"],""),customerCode:m(t,["customer_code"],""),name:m(t,["name"],""),postalCode:m(t,["postal_code"],""),address:m(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:m(t,["contact_name"],""),phone:m(t,["phone"],""),deliveryNote:m(t,["delivery_note"],""),isActive:Y(t,["is_active"],!0)}))}async function Xn(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function Kn(e=50){return(await A("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:m(n,["id"],""),callDirection:m(n,["call_direction"],"inbound"),fromNumber:m(n,["from_number"],""),toNumber:m(n,["to_number"],""),matchedCustomerCode:m(n,["matched_customer_code"],""),matchedProspectId:m(n,["matched_prospect_id"],""),durationSeconds:q(n.duration_seconds),callStatus:m(n,["call_status"],"answered"),recordingUrl:m(n,["recording_url"],""),transcript:m(n,["transcript"],""),ivryCallId:m(n,["ivry_call_id"],""),startedAt:m(n,["started_at"],""),endedAt:m(n,["ended_at"],""),notes:m(n,["notes"],"")}))}async function rs(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function Wn(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const i=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(i,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const d=(await r.json()).calls??[];let a=0;for(const o of d)await rs({id:`ivry_${o.id}`,callDirection:String(o.direction??"inbound"),fromNumber:String(o.from??""),toNumber:String(o.to??""),durationSeconds:Number(o.duration??0),callStatus:String(o.status??"answered"),recordingUrl:String(o.recording_url??""),startedAt:String(o.started_at??""),endedAt:String(o.ended_at??""),ivryCallId:String(o.id??"")}),a++;return await Te({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${a}件取得`}),{count:a}}catch(i){return{count:0,error:i instanceof Error?i.message:String(i)}}}async function Zn(e,t){const n=e.config.api_key,i=e.config.team_id;if(!n||!i)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const l of t){if(!l.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${i}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:l.name,phone_number:l.phone,external_id:l.customerCode??"",note:l.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function ei(){return(await A("lead_lists",{order:"created_at.desc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),query:m(t,["query"],""),area:m(t,["area"],""),businessType:m(t,["business_type"],""),totalCount:q(t.total_count),source:m(t,["source"],"manual"),createdAt:m(t,["created_at"],"")}))}async function ti(e){return(await A("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:m(n,["id"],""),listId:m(n,["list_id"],""),companyName:m(n,["company_name"],""),address:m(n,["address"],""),phone:m(n,["phone"],""),website:m(n,["website"],""),email:m(n,["email"],""),businessType:m(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:q(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:m(n,["place_id"],""),status:m(n,["status"],"new"),convertedProspectId:m(n,["converted_prospect_id"],""),note:m(n,["note"],"")}))}async function ai(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function cs(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function si(e,t,n){const i=e.config.api_key;if(!i)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),l=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${i}`;try{const d=await fetch(l);if(!d.ok)return{results:[],error:`HTTP ${d.status}`};const a=await d.json();return a.status!=="OK"&&a.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${a.status}`}:{results:a.results.map(c=>{const u=c.geometry?.location;return{id:`place_${c.place_id}`,listId:"",companyName:String(c.name??""),address:String(c.formatted_address??""),rating:c.rating?Number(c.rating):void 0,reviewCount:c.user_ratings_total?Number(c.user_ratings_total):void 0,lat:u?.lat,lng:u?.lng,placeId:String(c.place_id??""),status:"new"}})}}catch(d){return{results:[],error:d instanceof Error?d.message:String(d)}}}async function ni(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await os(t);return n&&await cs({...e,status:"imported",convertedProspectId:t.id}),n}async function ii(){return(await A("workflow_orders",{order:"order_date.desc"})).map(t=>({id:m(t,["id"],""),orderNo:m(t,["order_no"],""),customerName:m(t,["customer_name"],""),customerCode:m(t,["customer_code"],""),orderDate:m(t,["order_date"],""),deliveryDate:m(t,["delivery_date"],""),stage:m(t,["stage"],"new"),totalAmount:q(t.total_amount),itemCount:q(t.item_count),priority:m(t,["priority"],"normal"),staffName:m(t,["staff_name"],""),notes:m(t,["notes"],"")}))}async function oi(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function li(){return(await A("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:m(t,["id"],""),name:m(t,["name"],""),email:m(t,["email"],""),phone:m(t,["phone"],""),visitDate:m(t,["visit_date"],""),partySize:q(t.party_size)||1,language:m(t,["language"],"ja"),purpose:m(t,["purpose"],""),message:m(t,["message"],""),status:m(t,["status"],"new"),repliedAt:m(t,["replied_at"],""),confirmedTime:m(t,["confirmed_time"],""),createdAt:m(t,["created_at"],new Date().toISOString())}))}async function ri(e){const{supabaseInsert:t}=await _(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>R);return{supabaseInsert:i}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const ci=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function ds(){return(await Promise.all(ci.map(async t=>{const[n,i]=await Promise.all([Dt(t.table),A(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:i[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Qe(e,t,n=100){const i=(t-1)*n,[r,l]=await Promise.all([A(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(i)}),Dt(e)]);return{records:r,total:l}}async function $t(e){const t=await A("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const i=JSON.parse(n);return String(i.price_group??"")}catch{return""}return""}async function us(e,t){if(e){const i=await A("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(i.length>0&&i[0].special_price)return q(i[0].special_price)}const n=await A("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?q(n[0].default_sale_price):0}const di=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],ui=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],pi={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function mi(){const e=new Date,t=[];for(let o=11;o>=0;o--){const c=new Date(e.getFullYear(),e.getMonth()-o,1);t.push(`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`)}const n=di,i={},r={};for(const o of n){i[o.code]={};for(const c of t){const u=parseInt(c.split("-")[1])-1,p=pi[o.code]??100,y=Math.round(p*ui[u]*(.85+Math.random()*.3));i[o.code][c]=y,r[c]=(r[c]??0)+y}}const l={},d={},a={};for(const o of n){const c=t.map(y=>i[o.code][y]??0),u=c.reduce((y,h)=>y+h,0)/c.length,p=c.reduce((y,h)=>y+(h-u)**2,0)/c.length;l[o.code]=c.reduce((y,h)=>y+h,0),d[o.code]=u,a[o.code]=Math.sqrt(p)}return{months:t,products:n,matrix:i,totals:r,productTotals:l,productAvg:d,productStdDev:a}}async function yi(e=36){const t=(()=>{const y=new Date;return y.setMonth(y.getMonth()-e),`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`})(),n=await H("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"});if(n.length===0)return mi();const i=new Set,r=new Map,l={},d={};for(const y of n){const h=m(y,["year_month"],""),f=m(y,["product_code"],""),g=m(y,["product_name"],f),b=$(y,["quantity"],0);!h||!f||(i.add(h),r.set(f,g),l[f]||(l[f]={}),l[f][h]=b,d[h]=(d[h]??0)+b)}const a=[...i].sort(),o=[...r.entries()].map(([y,h])=>({code:y,name:h})),c={},u={},p={};for(const y of o){const h=a.map(b=>l[y.code]?.[b]??0),f=h.reduce((b,k)=>b+k,0)/(h.length||1),g=h.reduce((b,k)=>b+(k-f)**2,0)/(h.length||1);c[y.code]=h.reduce((b,k)=>b+k,0),u[y.code]=f,p[y.code]=Math.sqrt(g)}return{months:a,products:o,matrix:l,totals:d,productTotals:c,productAvg:u,productStdDev:p}}async function hi(){return(await A("product_safety_stock_params",{order:"product_code.asc"})).map(t=>({productCode:m(t,["product_code"],""),productName:m(t,["product_name"],""),unit:m(t,["unit"],"本"),avgMonthlyDemand:$(t,["avg_monthly_demand"],0),demandStdDev:$(t,["demand_std_dev"],0),leadTimeDays:$(t,["lead_time_days"],30),serviceLevel:$(t,["service_level"],.95),safetyStockQty:$(t,["safety_stock_qty"],0),reorderPoint:$(t,["reorder_point"],0),memo:m(t,["memo"],""),productionType:m(t,["production_type"],"monthly")}))}async function vi(e){return(await A("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:m(n,["id"],""),yearMonth:m(n,["year_month"],e),productCode:m(n,["product_code"],""),productName:m(n,["product_name"],""),demandForecast:$(n,["demand_forecast"],0),safetyStockTarget:$(n,["safety_stock_target"],0),openingStock:$(n,["opening_stock"],0),requiredProduction:$(n,["required_production"],0),plannedQty:$(n,["planned_qty"],0),actualQty:$(n,["actual_qty"],0),status:m(n,["status"],"draft"),productionType:m(n,["production_type"],"monthly"),notes:m(n,["notes"],"")}))}async function fi(e){const{supabaseUpsert:t}=await _(async()=>{const{supabaseUpsert:i}=await Promise.resolve().then(()=>R);return{supabaseUpsert:i}},void 0);return await t("product_safety_stock_params",{product_code:e.productCode,product_name:e.productName,unit:e.unit,avg_monthly_demand:e.avgMonthlyDemand,demand_std_dev:e.demandStdDev,lead_time_days:e.leadTimeDays,service_level:e.serviceLevel,safety_stock_qty:e.safetyStockQty,reorder_point:e.reorderPoint,memo:e.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})!==null}async function bi(e){const{supabaseUpsert:t}=await _(async()=>{const{supabaseUpsert:i}=await Promise.resolve().then(()=>R);return{supabaseUpsert:i}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function gi(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}async function $i(e){const[t,n]=e.split("-").map(Number),i=`${e}-01`,r=new Date(t,n,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}`,d=await H("sales_document_headers",{select:"sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${i},sales_date.lte.${l})`,order:"sales_date.asc"}),a=await H("customers",{select:"id,address1",address1:"not.is.null"}),o={};for(const u of a)u.address1&&(o[u.id]=gi(u.address1));const c={};for(const u of d){const p=u.sales_date;if(!p)continue;const y=o[u.legacy_customer_code]||"住所未登録",h=Number(u.total_amount)||0;c[p]||(c[p]={date:p,entries:[],cityGroups:[],totalAmount:0,count:0}),c[p].entries.push({customerCode:u.legacy_customer_code||"",customerName:u.customer_name||"",city:y,amount:h}),c[p].totalAmount+=h,c[p].count++}for(const u of Object.values(c)){const p={};for(const y of u.entries)p[y.city]=(p[y.city]||0)+1;u.cityGroups=Object.entries(p).sort((y,h)=>h[1]-y[1]).map(([y,h])=>({city:y,count:h}))}return c}const x=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:Ot,CALENDAR_CATEGORY_LABELS:Rt,DEPT_LABELS:Ke,INVOICE_TYPE_LABELS:ft,JIKOMI_STATUS_LABELS:Ua,MATERIAL_CATEGORIES:ls,PROSPECT_STAGE_COLORS:st,PROSPECT_STAGE_LABELS:qe,ROLE_LABELS:Xe,SEASONAL_TEMPLATES:Ct,SLACK_EVENT_LABELS:We,TAX_DEDUCTION_LABELS:gt,TAX_RATE_CATEGORIES:es,convertLeadToProspect:ni,deleteCalendarEvent:Pn,deleteMailSender:kn,deleteMaterial:Hn,deletePrintLayout:$n,deleteProspect:Jn,deleteUserProfile:On,fetchAnalyticsByPeriod:Gs,fetchAnnouncements:Oa,fetchAuditLogs:jn,fetchAvailablePeriods:Xs,fetchBillList:Wa,fetchBillingSummary:Tt,fetchCalendarEvents:Sn,fetchCallLogs:Kn,fetchChurnAlerts:ln,fetchCustomerAnalysis:Ya,fetchCustomerEfficiency:Ja,fetchCustomerLedger:Lt,fetchCustomerPriceGroup:$t,fetchCustomerPricing:Ba,fetchDeliveryLocations:Gn,fetchDeliveryNote:It,fetchDeliverySchedule:on,fetchDemandAnalysis:yi,fetchDemandForecasts:nn,fetchFaxInbox:Ln,fetchIntegrationSettings:ns,fetchInvoices:Ge,fetchJikomiList:Qa,fetchKenteiList:Ga,fetchLeadItems:ti,fetchLeadLists:ei,fetchMailSenders:_n,fetchMasterStats:He,fetchMaterialList:bt,fetchMyProfile:Nn,fetchPayableList:Ka,fetchPaymentStatus:Ca,fetchPipelineMeta:La,fetchPrintLayouts:bn,fetchProductABC:pn,fetchProductDaily:un,fetchProductMonthlyShipments:sn,fetchProductPower:Va,fetchProductPrice:us,fetchProductShipmentsFromTable:dn,fetchProductionPlan:vi,fetchProspectActivities:Yn,fetchProspects:Vn,fetchPurchaseList:Xa,fetchRawMaterialStock:Za,fetchRawRecords:Qe,fetchRawTableList:ds,fetchSafetyStockParams:hi,fetchSalesAnalytics:Ta,fetchSalesReport:at,fetchSalesSummary:Ea,fetchSeasonalProfiles:cn,fetchShipmentCalendar:$i,fetchShopifyOrders:Dn,fetchSlackLogs:Bn,fetchSlackRules:is,fetchStaffCustomerBreakdown:Zs,fetchStaffProductBreakdown:en,fetchStaffTotalsByPeriod:Ws,fetchStoreOrders:as,fetchStoreSales:Nt,fetchSyncDashboard:Ia,fetchTankList:Ha,fetchTaxDeclaration:qt,fetchTourInquiriesFromDb:li,fetchUserProfiles:qn,fetchVisitPriorities:rn,fetchWorkflowOrdersFromDb:ii,generateTaxCSV:hn,generateTaxXML:ts,ocrFaxImage:In,periodToDateRange:Ks,recalculateTaxDeclaration:vn,recordAudit:Mn,resolveProductPrice:za,saveCalendarEvent:xn,saveCallLog:rs,saveDeliveryLocation:Xn,saveEmailCampaign:Ue,saveFaxRecord:Tn,saveIntegrationSetting:Te,saveInvoice:Ra,saveLeadItem:cs,saveLeadList:ai,saveMailSender:wn,saveMaterial:Qn,savePrintLayout:gn,saveProductionPlan:bi,saveProspect:os,saveProspectActivity:Un,saveSafetyStockParams:fi,saveSlackRule:Fn,saveTaxDeclaration:fn,saveTourInquiry:ri,saveUserProfile:Rn,saveWorkflowOrder:oi,searchPlaces:si,sendEmailCampaign:ss,sendSlackNotification:zn,submitFeatureRequest:Ma,syncGoogleCalendar:Cn,syncIvryCallLogs:Wn,syncPhoneBookToIvry:Zn,syncShopifyOrders:An,updateCustomer:ja,updateProduct:Fa},Symbol.toStringTag,{value:"Module"}));function me(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const _i={open:"未締め",closed:"締め済"};function wi(e,t){const n=e.customers.map(i=>`
      <tr>
        <td>
          <div class="table-title">${i.customerName}</div>
          <div class="table-sub mono">${i.customerCode}</div>
        </td>
        <td class="numeric">${i.closingDay}日</td>
        <td class="numeric">${me(i.salesAmount)}</td>
        <td class="numeric">${me(i.taxAmount)}</td>
        <td class="numeric">${me(i.prevBalance)}</td>
        <td class="numeric">${me(i.paymentAmount)}</td>
        <td class="numeric"><strong>${me(i.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${i.status==="closed"?"success":"warning"}">${_i[i.status]}</span>
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
        <p class="kpi-value">${me(e.totalBilling)}</p>
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
  `}const ki={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},Si={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function Gt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ne(e){const t=Si[e],n=ki[e].map(i=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Gt(i.title)}</p>
            <p class="category-card-description">${Gt(i.description)}</p>
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
  `}function ps(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function De(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function xi(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${ps(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${De(t.amount)}</td>
        </tr>
      `).join("")}function Pi(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${ps(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${De(t.amount)}</td>
        </tr>
      `).join("")}function Ai(e,t){return`
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
            <dd>${De(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${De(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${De(e.balanceAmount)}</dd>
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
            <tbody>${xi(e)}</tbody>
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
            <tbody>${Pi(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function Re(e,t,n){const i=e.findIndex(l=>l.column===t);if(i>=0){if(e[i].direction==="asc"){const d=[...e];return d[i]={column:t,direction:"desc"},d}return e.filter((d,a)=>a!==i)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function Di(e,t){const n=e.findIndex(l=>l.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const i=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${i}${r}</span>`}function I(e,t,n,i=""){return`<th class="sortable ${i}" data-sort-col="${e}">${t} ${Di(n,e)}</th>`}function Xt(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function Le(e,t,n){return t.length===0?e:[...e].sort((i,r)=>{for(const{column:l,direction:d}of t){const a=n[l];if(!a)continue;const o=Xt(i[a]),c=Xt(r[a]);let u=0;if(typeof o=="number"&&typeof c=="number"?u=o-c:u=String(o).localeCompare(String(c),"ja"),u!==0)return d==="asc"?u:-u}return 0})}const Ei={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},Kt={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},_e={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function Ci(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function Li(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function Ii(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function ms(e,t){const n=Li(t),i=Ii(t),[r,l]=t.split("-").map(Number),d=new Map;e.forEach(E=>{if(E.date.slice(0,7)===t){const S=E.date.slice(0,10);d.has(S)||d.set(S,[]),d.get(S).push(E)}});const a=e.filter(E=>E.date.slice(0,7)===t),o=a.reduce((E,S)=>E+S.quantity,0),c=new Set(a.map(E=>E.date)).size,u=new Date().toISOString().slice(0,10),p=["日","月","火","水","木","金","土"].map(E=>`<th class="dcal-header">${E}</th>`).join("");let y="",h=1;for(let E=0;E<6&&!(h>n&&E>0);E++){y+="<tr>";for(let S=0;S<7;S++)if(E===0&&S<i||h>n)y+='<td class="dcal-cell dcal-empty"></td>';else{const C=`${r}-${String(l).padStart(2,"0")}-${String(h).padStart(2,"0")}`,O=d.get(C)||[],F=C===u,L=O.reduce((U,X)=>U+X.quantity,0);y+=`
          <td class="dcal-cell ${F?"dcal-today":""}">
            <div class="dcal-day">${h}</div>
            ${O.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${O[0].status}">${O.length}件 ${L}本</div>
              </div>
            `:""}
          </td>`,h++}y+="</tr>"}const[f,g]=l===1?[r-1,12]:[r,l-1],[b,k]=l===12?[r+1,1]:[r,l+1],w=`${f}-${String(g).padStart(2,"0")}`,D=`${b}-${String(k).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${l}月: ${c}日稼働 / ${a.length}件 / 合計${o.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${w}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${r}年${l}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${D}">▶</button>
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
  `}function Ti(e,t){const n=t==="all"?e:e.filter(a=>a.segment===t),i={all:e.length};e.forEach(a=>{i[a.segment]=(i[a.segment]??0)+1});const l=["all",...[...new Set(e.map(a=>a.segment))]].map(a=>`
      <button class="button ${t===a?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${a}">
        ${a==="all"?"全て":Kt[a]??a} (${i[a]??0})
      </button>
    `).join(""),d=n.map(a=>`
      <tr>
        <td class="mono">${a.code}</td>
        <td>${a.name}</td>
        <td><span class="segment-badge" style="background:${_e[a.segment]??"#718096"};">${Kt[a.segment]??a.segment}</span></td>
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
            <li><span class="segment-badge" style="background:${_e.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${_e["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${_e["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${_e["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
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
  `}function qi(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${ms(e.deliveries,e.calendarMonth)}
    ${Ti(e.forecasts,e.selectedSegment)}
  `}function Ni(e,t){return ms(e,t)}const Oe={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間"};function Wt(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function Ri(e,t,n){if(t==="all")return e;const i=new Date,r=i.toISOString().slice(0,10),l=new Date(i);switch(t){case"today":return e.filter(d=>d.date.slice(0,10)===r);case"month":return e.filter(d=>d.date.slice(0,7)===r.slice(0,7));case"90days":return l.setDate(l.getDate()-90),e.filter(d=>d.date>=l.toISOString());case"year":return l.setFullYear(l.getFullYear()-1),e.filter(d=>d.date>=l.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(d=>{const a=d.date.slice(0,10);return a>=n.start&&a<=n.end})}}function W(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ot(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function we(e,t){for(const n of t){const i=e[n];if(typeof i=="number"&&Number.isFinite(i))return i;if(typeof i=="string"){const r=Number(i);if(Number.isFinite(r))return r}}return null}function Oi(e){const t=e?.productTotals;if(!t||t.length===0)return"―";const n=t.reduce((r,l)=>{const d=we(l,["amount","salesAmount"]),a=we(l,["marginRate","grossMarginRate"]);return d===null||d<=0||a===null?r:{weightedAmount:r.weightedAmount+d,weightedRate:r.weightedRate+d*a}},{weightedAmount:0,weightedRate:0});if(n.weightedAmount>0)return`${(n.weightedRate/n.weightedAmount).toFixed(1)}%`;const i=t.reduce((r,l)=>{const d=l,a=we(d,["amount","salesAmount"]),o=we(d,["grossProfit","grossAmount","margin"]),c=we(d,["costAmount","cost","costPrice"]);if(a===null||a<=0)return r;const u=o??(c!==null?a-c:null);return u===null?r:{sales:r.sales+a,gross:r.gross+u}},{sales:0,gross:0});return i.sales>0?`${(i.gross/i.sales*100).toFixed(1)}%`:"―"}function Mi(e){const i={top:20,right:20,bottom:30,left:50},r=760-i.left-i.right,l=260-i.top-i.bottom,d=Math.max(...e.map(u=>u.amount),1),a=r/e.length,o=e.map((u,p)=>{const y=u.amount/d*l,h=i.left+p*a+4,f=i.top+l-y,g=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(u.date));return`
        <g>
          <rect x="${h}" y="${f}" width="${Math.max(a-8,8)}" height="${y}" rx="4" fill="#0F5B8D" opacity="${.58+p/e.length*.34}" />
          ${p%5===0?`<text x="${h+6}" y="252" class="chart-axis">${g}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(u=>{const p=i.top+l-l*u,y=Math.round(d*u/1e3);return`
        <g>
          <line x1="${i.left}" y1="${p}" x2="${760-i.right}" y2="${p}" class="chart-grid" />
          <text x="6" y="${p+4}" class="chart-axis">${y.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${o}
    </svg>
  `}function ji(e,t,n,i,r="month",l,d=[]){const a={success:"正常",warning:"注意",error:"異常",running:"実行中"},o=Ri(e.allDailySales,r,l),c=o.reduce((S,C)=>S+C.amount,0),u=o.reduce((S,C)=>S+C.bottles,0),p=o.reduce((S,C)=>S+C.volumeMl,0),y=o.length,h=u>0?Math.round(c/u):0,f=p>0?Math.round(c/(p/1e3)):0,b=(o.length>0?e.allDailySales.filter(S=>{const C=o[0]?.date??"",O=o[o.length-1]?.date??"",F=Wt(C,-1),L=Wt(O,-1);return S.date>=F&&S.date<=L}):[]).reduce((S,C)=>S+C.amount,0),k=b>0?(c-b)/b*100:0,w=k>0?"+":"",D=e.salesRecords.slice(0,10).map(S=>`
            <tr>
              <td class="mono">${S.documentNo}</td>
              <td>${ot(S.date)}</td>
              <td>${S.customerName}</td>
              <td class="numeric">${W(S.amount)}</td>
            </tr>
          `).join(""),E=["today","month","90days","year","all"].map(S=>`<button class="button ${S===r?"primary":"secondary"} small" type="button" data-period="${S}">${Oe[S]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${a[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${ot(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${E}</div>
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
        <p class="kpi-value">${W(e.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${e.kpis.todayDelta>0?"+":""}${e.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">${Oe[r]}売上</p>
        <p class="kpi-value">${W(c)}</p>
        <p class="kpi-sub">${y}日間${y>0?` / 日平均 ${W(Math.round(c/y))}`:""}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${k>=0?"#2f855a":"#c53d3d"}">${b>0?`${w}${k.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${b>0?W(b):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${W(e.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${Oi(n)}</p>
        <p class="kpi-sub">売上分析データから集計</p>
      </article>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${u.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${W(h)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(p/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${W(f)}</p>
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
            <p class="panel-caption">${Oe[r]} (${o.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${Mi(o.length>0?o:e.dailySales)}
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
              <dd>${ot(t.lastSyncAt)}</dd>
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
          <tbody>${D}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${Oe[r]} — 売上・本数・液体量・単価（${o.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${I("date","日付",d)}
              ${I("amount","売上",d,"numeric")}
              ${I("bottles","本数",d,"numeric")}
              ${I("volumeMl","液体量(L)",d,"numeric")}
              ${I("pricePerBottle","本単価",d,"numeric")}
              ${I("pricePerLiter","L単価",d,"numeric")}
            </tr>
          </thead>
          <tbody>${Le(d.length>0?o:o.slice().reverse(),d,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(S=>`
            <tr>
              <td class="mono">${S.date.slice(0,10)}</td>
              <td class="numeric">${W(S.amount)}</td>
              <td class="numeric">${S.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(S.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${W(S.pricePerBottle)}</td>
              <td class="numeric">${W(S.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${i?Fi(i):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function Fi(e){const t=e.prospects.reduce((d,a)=>d+a.expectedAmount*a.probability/100,0),n=e.prospects.filter(d=>d.stage==="hot"||d.stage==="negotiating").length,i=new Date().toISOString().slice(0,10),r=e.upcomingEvents.filter(d=>d.startsAt.slice(0,10)>=i).slice(0,5),l=e.tourInquiries.filter(d=>d.status==="new").length;return`
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
      <article class="panel kpi-card ${l>0?"kpi-alert":""}">
        <p class="panel-title">未対応問合せ</p>
        <p class="kpi-value">${l}件</p>
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
          ${["cold","warm","hot","contacted","negotiating","won"].map(d=>{const a=e.prospects.filter(c=>c.stage===d).length,o=e.prospects.filter(c=>c.stage===d).reduce((c,u)=>c+u.expectedAmount,0);return`
              <div style="background:${st[d]};color:white;padding:12px;border-radius:6px;text-align:center;">
                <div style="font-size:11px;">${qe[d]}</div>
                <div style="font-size:20px;font-weight:700;margin:4px 0;">${a}</div>
                <div style="font-size:10px;opacity:0.9;">¥${(o/1e4).toFixed(0)}万</div>
              </div>
            `}).join("")}
        </div>
      </article>

      <aside class="panel">
        <div class="panel-header">
          <div><h2>📅 直近の予定</h2></div>
          <button class="button secondary" data-link="/calendar">カレンダー</button>
        </div>
        ${r.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${r.map(d=>{const a=new Date(d.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${d.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${a.getMonth()+1}/${a.getDate()} ${d.isAllDay?"終日":a.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${d.title}</div>
                  ${d.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${d.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>

    ${e.deliveries&&e.deliveries.length>0?Ni(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}
  `}function Bi(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function ye(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function zi(e,t){const n=e.lines.length?e.lines.map((r,l)=>`
          <tr>
            <td class="numeric">${l+1}</td>
            <td class="mono">${r.productCode}</td>
            <td>${r.productName}</td>
            <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
            <td>${r.unit}</td>
            <td class="numeric">${ye(r.unitPrice)}</td>
            <td class="numeric">${ye(r.amount)}</td>
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
            <tr><th>納品日</th><td>${Bi(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${ye(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${ye(i)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${ye(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${ye(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function ee(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Vi(e){return ee(e).replaceAll(`
`,"<br />")}function Ji(e){const n=[...Object.values(Ct),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${ee(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),i=e.previewRecipients.length?e.previewRecipients.map(r=>`
            <li>
              <span>${ee(r.name)}</span>
              <span class="table-sub">${ee(r.email)} / ${ee(r.area)}</span>
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
          <input id="email-subject" type="text" value="${ee(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${ee(e.body)}</textarea>
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
            ${e.senders.map(r=>`<option value="${r.id}" ${r.id===e.senderId?"selected":""}>${ee(r.name)} &lt;${ee(r.email)}&gt;${r.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${ee(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?Vi(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${ee(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function Z(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Me(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function Yi(e,t){const n=[Me("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Z(r.name)}</strong>
            <span class="table-sub mono">${Z(r.code)}</span>
          </button>
        `)),Me("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Z(r.name)}</strong>
            <span class="table-sub mono">${Z(r.code)}</span>
          </button>
        `)),Me("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${Z(r.documentNo)}</strong>
            <span class="table-sub">${Z(r.customerName)} / ${Z(r.date)}</span>
          </button>
        `)),Me("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${Z(r.path)}"
          >
            <strong>${Z(r.title)}</strong>
            <span class="table-sub mono">${Z(r.path)}</span>
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
            value="${Z(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||i}
          </div>
        </div>
      </div>
    </div>
  `}function ke(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ys(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${ke(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${ke(e.title)}">
        <div class="modal-header">
          <h2>${ke(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${ke(e.placeholder)}"
            value="${ke(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function je(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Zt(e){return e.trim().toLowerCase()}function Ui(e,t){const n=Zt(t),i=e.filter(l=>n?[l.code,l.name,l.name].map(Zt).some(d=>d.includes(n)):!0).slice(0,50),r=i.length?`
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
              ${i.map(l=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${je(l.code)}"
                      data-name="${je(l.name)}"
                    >
                      <td class="mono">${je(l.code)}</td>
                      <td>${je(l.name)}</td>
                      <td>${l.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return ys({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:r,emptyMessage:"該当する得意先が見つかりません。"})}function Qi(e){return e.toISOString().slice(0,10)}function pe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function le(e,t){return e[t]?`<div class="field-error">${pe(e[t])}</div>`:""}function he(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function Hi(e,t,n,i){const r=Object.keys(ft).map(o=>`<option value="${o}" ${e.invoiceType===o?"selected":""}>${ft[o]}</option>`).join(""),l=e.lines.map((o,c)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${he(i,`lines.${c}.productCode`,"input-cell")}" type="text" data-line="${c}" data-field="productCode" value="${pe(o.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${c}" aria-label="商品検索">🔍</button>
          </div>
          ${le(i,`lines.${c}.productCode`)}
        </td>
        <td>
          <input class="${he(i,`lines.${c}.productName`,"input-cell")}" type="text" data-line="${c}" data-field="productName" value="${pe(o.productName)}" placeholder="商品名" />
          ${le(i,`lines.${c}.productName`)}
        </td>
        <td>
          <input class="${he(i,`lines.${c}.quantity`,"input-cell numeric")}" type="number" data-line="${c}" data-field="quantity" value="${o.quantity}" min="0" />
          ${le(i,`lines.${c}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${c}" data-field="unit" value="${o.unit}" placeholder="本" /></td>
        <td>
          <input class="${he(i,`lines.${c}.unitPrice`,"input-cell numeric")}" type="number" data-line="${c}" data-field="unitPrice" value="${o.unitPrice}" min="0" />
          ${le(i,`lines.${c}.unitPrice`)}
        </td>
        <td class="numeric">${o.amount>0?o.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${c}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${c}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),d=e.lines.reduce((o,c)=>o+c.amount,0),a=Math.floor(d*10/110);return`
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
          <input class="${he(i,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Qi(new Date)}" />
          ${le(i,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${he(i,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${pe(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${le(i,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${pe(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${pe(e.staffCode)}" />
        </label>
      </div>
      ${le(i,"lines")}
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
          <span class="total-value">${(d-a).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${a.toLocaleString("ja-JP")} 円</span>
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
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${pe(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}const Gi={showQuoteNo:!0,showValidUntil:!0,showSubject:!0,showDeliveryDate:!1,showPaymentTerms:!0,showDeliveryPlace:!1,showRemarks:!0,showSeal:!0,headerNote:"",footerNote:""},hs={quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:"",customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:"月末締め翌月末払い",deliveryPlace:"",previewMode:!1,sealSettings:null,fieldConfig:{...Gi}};function te(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function T(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function vs(e){const t=e.lines.reduce((d,a)=>d+a.amount,0),n=Math.round(t*e.taxRate/100),i=t+n,r=e.fieldConfig,l=[];return r.showValidUntil&&e.validUntil&&l.push(`<tr><th>有効期限</th><td>${e.validUntil}</td></tr>`),r.showDeliveryDate&&e.deliveryDate&&l.push(`<tr><th>納期</th><td>${T(e.deliveryDate)}</td></tr>`),r.showPaymentTerms&&e.paymentTerms&&l.push(`<tr><th>支払条件</th><td>${T(e.paymentTerms)}</td></tr>`),r.showDeliveryPlace&&e.deliveryPlace&&l.push(`<tr><th>納品場所</th><td>${T(e.deliveryPlace)}</td></tr>`),`
    <div class="quote-preview" id="quote-preview-area">
      <div class="quote-preview-inner">
        <h2 class="quote-preview-title">御 見 積 書</h2>

        <div class="quote-preview-meta">
          <div class="quote-preview-customer">
            <p class="quote-preview-customer-name">${T(e.customerName||"（得意先未選択）")} 御中</p>
            ${e.customerAddress?`<p class="quote-preview-addr">${T(e.customerAddress)}</p>`:""}
          </div>
          <div class="quote-preview-info">
            ${r.showQuoteNo&&e.quoteNo?`<p>No. ${T(e.quoteNo)}</p>`:""}
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

        ${r.headerNote?`<p class="quote-preview-note">${T(r.headerNote)}</p>`:""}

        ${r.showSubject&&e.subject?`<p class="quote-preview-subject">件名: ${T(e.subject)}</p>`:""}

        <div class="quote-preview-total-banner">
          <span>合計金額</span>
          <span class="quote-preview-total-value">${te(i)}（税込）</span>
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
            ${e.lines.map((d,a)=>`
              <tr>
                <td style="text-align:center;">${a+1}</td>
                <td>${T(d.productName)}</td>
                <td style="text-align:right;">${d.quantity.toLocaleString()}</td>
                <td style="text-align:center;">${T(d.unit)}</td>
                <td style="text-align:right;">${te(d.unitPrice)}</td>
                <td style="text-align:right;">${te(d.amount)}</td>
              </tr>
            `).join("")}
            ${e.lines.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:#999;">明細なし</td></tr>':""}
          </tbody>
          <tfoot>
            <tr><td colspan="5" style="text-align:right;font-weight:700;">小計</td><td style="text-align:right;">${te(t)}</td></tr>
            <tr><td colspan="5" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${te(n)}</td></tr>
            <tr class="quote-preview-total-row"><td colspan="5" style="text-align:right;font-weight:700;">合計</td><td style="text-align:right;font-weight:700;">${te(i)}</td></tr>
          </tfoot>
        </table>

        ${l.length>0?`
          <table class="quote-preview-conditions">
            ${l.join("")}
          </table>
        `:""}

        ${r.showRemarks&&e.remarks?`
          <div class="quote-preview-remarks">
            <p class="quote-preview-remarks-label">備考</p>
            <p>${T(e.remarks).replace(/\n/g,"<br/>")}</p>
          </div>
        `:""}

        ${r.footerNote?`<p class="quote-preview-footer-note">${T(r.footerNote)}</p>`:""}
      </div>
    </div>
  `}function Xi(e){const t=(n,i,r)=>`
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
          <input type="text" id="q-header-note" value="${T(e.headerNote)}" placeholder="例: 下記のとおりお見積り申し上げます" />
        </div>
        <div class="form-row">
          <label>フッターメモ（見積書���部に表示）</label>
          <input type="text" id="q-footer-note" value="${T(e.footerNote)}" placeholder="例: 本見積書に関するご不明点はお気軽にお問合せください" />
        </div>
      </div>
    </section>
  `}function Ki(e){return`
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
  `}function Wi(e,t,n,i,r,l){const d=e.lines.reduce((y,h)=>y+h.amount,0),a=Math.round(d*e.taxRate/100),o=d+a,c=i.length>=1?t.filter(y=>y.name.includes(i)||y.code.includes(i)).slice(0,8):[],u=r.length>=1?n.filter(y=>y.name.includes(r)||y.code.includes(r)).slice(0,8):[],p=e.fieldConfig;return e.previewMode?`
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
      ${vs(e)}
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
          <input type="text" id="q-no" value="${T(e.quoteNo)}" placeholder="自動採番" />
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
          <input type="text" id="q-subject" value="${T(e.subject)}" placeholder="御見積の件" />
        </div>`:""}
        ${p.showDeliveryDate?`
        <div class="form-row">
          <label>納期</label>
          <input type="text" id="q-delivery-date" value="${T(e.deliveryDate)}" placeholder="例: 受注後2週間" />
        </div>`:""}
        ${p.showPaymentTerms?`
        <div class="form-row">
          <label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${T(e.paymentTerms)}" placeholder="月末締め翌月末���い" />
        </div>`:""}
        ${p.showDeliveryPlace?`
        <div class="form-row">
          <label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${T(e.deliveryPlace)}" placeholder="例: 貴社指定場所" />
        </div>`:""}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${T(i)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${c.length>0?`
        <div class="search-results">
          ${c.map(y=>`
            <button class="search-item" type="button" data-select-customer="${y.code}" data-cust-name="${T(y.name)}" data-cust-addr="${T(y.address1||"")}">
              <span class="mono">${y.code}</span> ${T(y.name)}
            </button>
          `).join("")}
        </div>
      `:""}
      ${e.customerName?`
        <div class="selected-item">
          <span class="mono">${e.customerCode}</span> <strong>${T(e.customerName)}</strong>
          ${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${T(e.customerAddress)}</span>`:""}
        </div>
      `:""}
    </section>

    <section class="panel">
      <div class="panel-header"><h2>明細</h2></div>
      <div class="form-row">
        <input type="text" id="q-prod-search" value="${T(r)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${u.length>0?`
        <div class="search-results">
          ${u.map(y=>{const h=l?za(y,l):{price:y.salePrice||0,label:"標準価格"},f=h.label!=="標準価格";return`
            <button class="search-item" type="button" data-add-product="${y.code}" data-prod-name="${T(y.name)}" data-prod-price="${h.price}">
              <span class="mono">${y.code}</span> ${T(y.name)}
              <span class="numeric" ${f?'style="color:#2f855a;font-weight:700;"':""}>${h.price?te(h.price):""} <small>(${h.label})</small></span>
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
            ${e.lines.map((y,h)=>`
              <tr>
                <td class="mono">${y.productCode}</td>
                <td>${T(y.productName)}</td>
                <td class="numeric"><input type="number" class="qty-input" data-line-idx="${h}" value="${y.quantity}" min="0" style="width:60px;text-align:right;" /></td>
                <td>${T(y.unit)}</td>
                <td class="numeric"><input type="number" class="price-input" data-line-idx="${h}" value="${y.unitPrice}" min="0" style="width:80px;text-align:right;" /></td>
                <td class="numeric">${te(y.amount)}</td>
                <td><button class="button secondary small" data-remove-line="${h}">×</button></td>
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
          <textarea id="q-remarks" rows="2">${T(e.remarks)}</textarea>
        </div>`:""}
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${te(d)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${te(a)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${te(o)}</span></div>
        </div>
      </div>
    </section>

    ${Xi(p)}
    ${Ki(e.sealSettings)}
  `}function Zi(e){const t=vs(e),n=window.open("","_blank","width=800,height=1100");if(!n){alert("ポップアップがブロックされました。許可してください。");return}n.document.write(`<!DOCTYPE html>
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
</html>`),n.document.close()}function fs(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function bs(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function gs(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function eo(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function to(e,t,n,i,r){const l=new Map,d=new Map;for(const u of e){if(u.date>=t&&u.date<=n){const p=l.get(u.productCode);p?(p.amt+=u.amount,p.qty+=u.qty):l.set(u.productCode,{name:u.productName,vol:u.volumeMl,amt:u.amount,qty:u.qty})}u.date>=i&&u.date<=r&&d.set(u.productCode,(d.get(u.productCode)??0)+u.amount)}const a=[...l.entries()].map(([u,p])=>({code:u,...p})).sort((u,p)=>p.amt-u.amt),o=a.reduce((u,p)=>u+p.amt,0);let c=0;return a.map(u=>{c+=u.amt;const p=o>0?Math.round(u.amt*1e4/o)/100:0,y=c<=o*.7?"A":c<=o*.9?"B":"C",h=d.get(u.code)??0,f=h>0?Math.round((u.amt-h)/h*1e3)/10:null;return{code:u.code,name:u.name,volumeMl:u.vol,amount:u.amt,qty:u.qty,sharePct:p,rank:y,prevAmount:h,growthRate:f}})}function ao(e,t,n){const i=new Date,r=i.toISOString().slice(0,10);let l=r,d=r,a="";switch(e){case"week":{const u=new Date(i);u.setDate(u.getDate()-7),l=u.toISOString().slice(0,10),d=r,a="直近7日間";break}case"month":{l=r.slice(0,7)+"-01",d=r,a="当月";break}case"90days":{const u=new Date(i);u.setDate(u.getDate()-90),l=u.toISOString().slice(0,10),d=r,a="直近90日間";break}case"year":{const u=new Date(i);u.setFullYear(u.getFullYear()-1),l=u.toISOString().slice(0,10),d=r,a="直近1年間";break}case"custom":{l=t||r,d=n||r,a=`${l} 〜 ${d}`;break}}const o=new Date(l);o.setFullYear(o.getFullYear()-1);const c=new Date(d);return c.setFullYear(c.getFullYear()-1),{start:l,end:d,prevStart:o.toISOString().slice(0,10),prevEnd:c.toISOString().slice(0,10),label:a}}function so(e,t="all",n=[],i="year",r,l,d=[]){const a=ao(i,r,l),o=n.length>0?to(n,a.start,a.end,a.prevStart,a.prevEnd):e.map(w=>({code:w.code,name:w.name,volumeMl:w.volumeMl,amount:w.yearAmount,qty:w.yearQty,sharePct:w.sharePct,rank:w.rank,prevAmount:w.prevAmount,growthRate:w.growthRate})),c=o.filter(w=>w.rank==="A").length,u=o.filter(w=>w.rank==="B").length,p=o.filter(w=>w.rank==="C").length,y=o.filter(w=>w.growthRate!=null&&w.growthRate>10),h=o.filter(w=>w.growthRate!=null&&w.growthRate<-10);let f=o,g="全商品";switch(t){case"A":f=o.filter(w=>w.rank==="A"),g="Aランク";break;case"B":f=o.filter(w=>w.rank==="B"),g="Bランク";break;case"C":f=o.filter(w=>w.rank==="C"),g="Cランク";break;case"growing":f=y,g="成長商品(+10%以上)";break;case"declining":f=h,g="衰退商品(-10%以下)";break}const b=(w,D,E)=>`<button class="button ${t===w?"primary":"secondary"} small" data-product-filter="${w}">${D} (${E})</button>`,k=(w,D)=>`<button class="button ${i===w?"primary":"secondary"} small" data-product-period="${w}">${D}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${k("week","週次")}
        ${k("month","月次")}
        ${k("90days","90日")}
        ${k("year","年間")}
        ${k("custom","指定期間")}
      </div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="pp-range-start" class="range-input" value="${r||""}" />
        <span>〜</span>
        <input type="date" id="pp-range-end" class="range-input" value="${l||""}" />
        <button class="button secondary small" type="button" data-action="pp-apply-range">適用</button>
        <span style="color:var(--text-secondary);font-size:13px;margin-left:8px;">${a.label}</span>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${c} 商品</p>
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
        <p class="kpi-value">${h.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${g} (${f.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${b("all","全て",o.length)}
        ${b("A","A",c)}
        ${b("B","B",u)}
        ${b("C","C",p)}
        ${b("growing","成長",y.length)}
        ${b("declining","衰退",h.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${I("rank","ABC",d)}
              ${I("name","商品名",d)}
              ${I("amount","売上",d,"numeric")}
              ${I("sharePct","構成比",d,"numeric")}
              ${I("qty","本数",d,"numeric")}
              ${I("growthRate","前年同期比",d,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${Le(f,d,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(w=>`
              <tr>
                <td>${bs(w.rank)}</td>
                <td>${w.name?w.name.slice(0,25):w.code}${w.volumeMl?` <small>${w.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${fs(w.amount)}</td>
                <td class="numeric">${w.sharePct}%</td>
                <td class="numeric">${w.qty.toLocaleString()}</td>
                <td class="numeric">${gs(w.growthRate)}</td>
              </tr>
            `).join("")}
            ${f.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function no(e,t=[]){const n=e.filter(l=>l.currentRank==="A").length,i=e.filter(l=>l.prevRank&&l.currentRank<l.prevRank).length,r=e.filter(l=>l.prevRank&&l.currentRank>l.prevRank).length;return`
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
              ${I("currentRank","ABC",t)}
              ${I("name","得意先名",t)}
              ${I("yearAmount","年間売上",t,"numeric")}
              ${I("sharePct","構成比",t,"numeric")}
              ${I("orderDays","受注日数",t,"numeric")}
              ${I("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${Le(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).slice(0,50).map(l=>`
              <tr>
                <td>${bs(l.currentRank)}</td>
                <td>${l.name||l.code}</td>
                <td class="numeric">${fs(l.yearAmount)}</td>
                <td class="numeric">${l.sharePct}%</td>
                <td class="numeric">${l.orderDays}日</td>
                <td class="numeric">${gs(l.growthRate)}</td>
                <td>${eo(l.currentRank,l.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function io(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function oo(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function lo(e,t){const n=e.length?e.map(i=>`
            <tr>
              <td class="mono">${i.documentNo}</td>
              <td>${io(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${i.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${oo(i.amount)}</td>
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
  `}function ro(e){return new Date(e.getFullYear(),e.getMonth(),1)}function co(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function $s(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function _s(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function ea(e){const t=$s(_s(e),6);return t.setHours(23,59,59,999),t}function ta(e){return new Date(`${e}T00:00:00`)}function aa(e){return`${e.getMonth()+1}/${e.getDate()}`}function uo(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function po(){const e=new Date,t=_s(co(ro(e),-3)),n=ea(new Date(e.getFullYear(),e.getMonth()+4,0)),i=[];let r=new Date(t);for(;r<=n;){const l=ea(r);i.push({start:new Date(r),end:l,label:`${aa(r)} - ${aa(l)}`}),r=$s(r,7)}return i}function mo(e){const t=po(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,i=t.map(l=>`
        <div class="gantt-week">
          <span>${l.label}</span>
        </div>
      `).join(""),r=e.length?e.map(l=>{const d=ta(l.startDate),a=ta(l.expectedDoneDate),o=Math.max(0,t.findIndex(p=>p.end>=d)),c=Math.max(o,t.reduce((p,y,h)=>y.start<=a?h:p,o)),u=[`仕込番号: ${l.jikomiNo}`,`銘柄: ${l.productName}`,`期間: ${l.startDate} - ${l.expectedDoneDate}`,`タンク: ${l.tankNo}`,`備考: ${l.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${l.jikomiNo}</strong>
                <span class="table-sub">${l.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${l.status}"
                  style="grid-column:${o+1} / ${c+2}"
                  title="${uo(u)}"
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
          ${i}
        </div>
        ${r}
      </div>
    </section>
  `}function sa(e,t){const n={planned:"neutral",active:"warning",done:"success"},i=e.map(a=>`
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
          <span class="status-pill ${n[a.status]}">${Ua[a.status]}</span>
        </td>
        <td>${a.note||"―"}</td>
      </tr>
    `).join(""),r=e.filter(a=>a.status==="active").length,l=e.filter(a=>a.status==="done").length,d=e.filter(a=>a.status==="planned").length;return`
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
          <tbody>${i||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function yo(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},i=e.map(o=>`
      <tr>
        <td class="mono">${o.kenteiNo}</td>
        <td class="mono">${o.jikomiNo}</td>
        <td>${o.productName}</td>
        <td>${o.kenteiDate}</td>
        <td class="numeric">${o.alcoholDegree>0?o.alcoholDegree.toFixed(1)+"度":"―"}</td>
        <td class="numeric">${o.extractDegree>0?o.extractDegree.toFixed(1):"―"}</td>
        <td class="numeric">${o.sakaMeterValue!==0?o.sakaMeterValue.toFixed(1):"―"}</td>
        <td class="numeric">${o.volume>0?o.volume.toLocaleString("ja-JP")+" L":"―"}</td>
        <td>${o.taxCategory}</td>
        <td>
          <span class="status-pill ${n[o.status]}">${t[o.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${o.id}">
            ${o.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),r=e.filter(o=>o.status==="approved").length,l=e.filter(o=>o.status==="submitted").length,d=e.filter(o=>o.status==="pending").length;return`
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
        <p class="kpi-value">${e.filter(o=>o.status==="approved").reduce((o,c)=>o+c.volume,0).toLocaleString("ja-JP")} L</p>
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
          <tbody>${i||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ho(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function vo(e,t){return`
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
        ${e?`<p class="field-error">${ho(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function fo(e){return`
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
  `}function bo(e){return`
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
  `}const Mt={query:"",businessType:"",areaCode:"",activeOnly:"",page:1},Ee=50;function go(e,t){let n=e;if(t.query){const a=t.query.toLowerCase();n=n.filter(o=>o.code.toLowerCase().includes(a)||o.name.toLowerCase().includes(a)||o.kanaName&&o.kanaName.toLowerCase().includes(a)||o.address1&&o.address1.toLowerCase().includes(a)||o.phone&&o.phone.toLowerCase().includes(a))}t.businessType&&(n=n.filter(a=>a.businessType===t.businessType)),t.areaCode&&(n=n.filter(a=>a.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(a=>a.isActive):t.activeOnly==="inactive"&&(n=n.filter(a=>!a.isActive));const i=Math.max(1,Math.ceil(n.length/Ee)),l=(Math.min(t.page,i)-1)*Ee,d=n.slice(l,l+Ee);return{filtered:n,paged:d,totalPages:i}}function na(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const i=(t-1)*Ee+1,r=Math.min(t*Ee,e),l=[];for(let d=1;d<=n;d++)d===1||d===n||d>=t-2&&d<=t+2?l.push(`<button class="button ${d===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${d}" style="min-width:36px;padding:4px 8px;">${d}</button>`):(d===t-3||d===t+3)&&l.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${i}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${l.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function $o(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),i=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
  `}function _t(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function _o(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}function wo(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${_o(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${_t(t.address1||"",16)}</td>
          <td>${_t(t.address2||"",12)}</td>
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
      `).join("")}function Fe(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function ko(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${_t(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${Fe(t.purchasePrice)}</td>
          <td class="numeric">${Fe(t.salePrice)}</td>
          <td class="numeric">${Fe(t.listPrice)}</td>
          <td class="numeric">${Fe(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function So(e,t,n=Mt,i=[]){const{filtered:r,paged:l,totalPages:d}=go(e.customers,n);return`
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
        ${$o(e.customers,n)}
        ${na(r.length,n.page,d)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${I("code","コード",i)}
                ${I("name","得意先名",i)}
                ${I("kanaName","カナ",i)}
                <th>略称</th>
                ${I("businessType","業態",i)}
                <th>販売区分</th>
                <th>価格区分</th>
                <th>単価G</th>
                <th>電話</th>
                <th>FAX</th>
                <th>〒</th>
                <th>住所1</th>
                <th>住所2</th>
                <th>担当</th>
                ${I("areaName","地区",i)}
                ${I("closingDay","締日",i,"numeric")}
                ${I("paymentDay","支払日",i,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${wo(Le(l,i,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${na(r.length,n.page,d)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${I("code","コード",i)}
                ${I("name","商品名",i)}
                <th>カナ</th>
                ${I("category","分類",i)}
                <th>酒税区分</th>
                ${I("alcoholDegree","度数",i,"numeric")}
                ${I("volumeMl","容量ml",i,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${I("purchasePrice","生産者価格",i,"numeric")}
                ${I("salePrice","卸価格",i,"numeric")}
                ${I("listPrice","定価(小売)",i,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${ko(Le(e.products,i,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function lt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function xo(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${ls.map(i=>`<option ${n?.materialType===i?"selected":""}>${i}</option>`).join("")}
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
  `}function Po(e){const t=e.map(r=>{const d=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${d?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${d?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${lt(r.unitCost)}</td>
          <td class="numeric">${lt(r.currentStock*r.unitCost)}</td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${r.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(r=>r.minimumStock>0&&r.currentStock/r.minimumStock<1.5).length,i=e.reduce((r,l)=>r+l.currentStock*l.unitCost,0);return`
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
        <p class="kpi-value">${lt(i)}</p>
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
  `}function Ao(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function rt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Do={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Eo(e){return`
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
          <td class="numeric">${rt(n.billedAmount)}</td>
          <td class="numeric">${rt(n.paymentAmount)}</td>
          <td class="numeric">${rt(n.balanceAmount)}</td>
          <td>${Ao(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${Do[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function ve(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ia(e){return e.trim().toLowerCase()}function Co(e,t){const n=ia(t),i=e.filter(l=>n?[l.code,l.name,l.janCode].map(ia).some(d=>d.includes(n)):!0),r=i.length?`
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
              ${i.map(l=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${ve(l.code)}"
                      data-name="${ve(l.name)}"
                    >
                      <td class="mono">${ve(l.code)}</td>
                      <td>${ve(l.name)}</td>
                      <td class="mono">${ve(l.janCode)}</td>
                      <td>${ve(l.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return ys({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:r,emptyMessage:"該当する商品が見つかりません。"})}function re(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Lo(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},i={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},l={unpaid:"warning",partial:"neutral",paid:"success"},d=e.map(p=>`
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${re(p.unitPrice)}</td>
        <td class="numeric"><strong>${re(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${i[p.status]}">${n[p.status]}</span>
        </td>
      </tr>
    `).join(""),a=t.map(p=>`
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${re(p.totalPurchase)}</td>
        <td class="numeric">${re(p.paidAmount)}</td>
        <td class="numeric"><strong>${re(p.balance)}</strong></td>
        <td>${p.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${l[p.status]}">${r[p.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${p.supplierCode}" ${p.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),o=e.reduce((p,y)=>p+y.amount,0),c=t.reduce((p,y)=>p+y.balance,0),u=t.filter(p=>p.status!=="paid").length;return`
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
        <p class="kpi-value">${re(o)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${re(c)}</p>
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
          <tbody>${a||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Se(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Io(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},i={holding:"neutral",due:"warning",cleared:"success"},r=e.map(u=>`
      <tr>
        <td class="mono">${u.billNo}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${Se(u.amount)}</td>
        <td>${u.issueDate}</td>
        <td>${u.dueDate}</td>
        <td>
          <span class="status-pill ${i[u.status]}">${n[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${u.id}" ${u.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),l=t.map(u=>{const p=u.minimumStock>0&&u.currentStock<u.minimumStock*1.2;return`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric ${p?"text-danger":""}">
            ${u.currentStock.toLocaleString("ja-JP")} ${u.unit}
            ${p?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${u.minimumStock.toLocaleString("ja-JP")} ${u.unit}</td>
          <td class="numeric">${Se(u.unitCost)}</td>
          <td class="numeric">${Se(u.currentStock*u.unitCost)}</td>
          <td>${u.lastPurchaseDate}</td>
        </tr>
      `}).join(""),d=e.filter(u=>u.status==="holding"),a=d.reduce((u,p)=>u+p.amount,0),o=t.reduce((u,p)=>u+p.currentStock*p.unitCost,0),c=t.filter(u=>u.minimumStock>0&&u.currentStock<u.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${Se(a)}</p>
        <p class="kpi-sub">${d.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${Se(o)}</p>
        <p class="kpi-sub">要補充 ${c} 品目</p>
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
  `}function wt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Q(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function kt(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${Q(e)}</pre>
    </div>
  `}function To(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function Be(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${Q(e)}</code>
      ${To(e)}
    </div>
  `}function fe(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${Q(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${Q(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${Q(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?kt(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${Q(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${Q(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function ze(e){return`
    <div class="setup-step setup-step-compact" data-step="${Q(e.stepLabel)}">
      <h3>${Q(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${Q(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function Ve(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function oa(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function qo(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?wt(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Ve(e.lastOverallSync)}">${oa(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${Ve(e.lastOverallSync)==="success"?"1時間以内":Ve(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${Q(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?wt(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Ve(t.lastSyncAt)}">${oa(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function No(e,t,n,i){const r={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${i?qo(i):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${wt(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${r[e.status]}</span>
        </p>
        <p class="kpi-sub">${Q(e.message)}</p>
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
      ${ze({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${Be("git --version")}
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
      ${ze({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${Be("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${ze({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${Be("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${Be("python get-pip.py")}
        `})}
      ${ze({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${fe({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${fe({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${fe({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${fe({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${fe({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${fe({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${kt(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${kt(`{
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
            <span class="config-value">${Q(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${Q(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${Q(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${Q(n)}"
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
  `}function Ae(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ro(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function Oo(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(p=>p.amount),1),i=28,r=6,l=140,d=100,a=760,o=a-l-d,c=t.length*(i+r)+16,u=t.map((p,y)=>{const h=p.amount/n*o,f=y*(i+r)+8,g=p.abcRank==="A"?"#2F855A":p.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${l-8}" y="${f+i/2+5}" class="chart-axis" text-anchor="end">${p.name.length>10?p.name.slice(0,10)+"…":p.name}</text>
          <rect x="${l}" y="${f}" width="${h}" height="${i}" rx="4" fill="${g}" opacity="0.85" />
          <text x="${l+h+8}" y="${f+i/2+5}" class="chart-axis">${(p.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${a} ${c}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${u}
    </svg>
  `}function Mo(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(i=>`<th class="numeric">${i}</th>`).join(""),n=e.monthlyByCustomer.map(i=>{const r=i.values.reduce((d,a)=>d+a,0),l=i.values.map(d=>`<td class="numeric">${d>0?(d/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${i.label}</td>
          ${l}
          <td class="numeric"><strong>${Ae(r)}</strong></td>
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
  `}function jo(e){e.ranking.reduce((o,c)=>o+c.amount,0);const t=e.ranking.filter(o=>o.abcRank==="A").length,n=e.ranking.filter(o=>o.abcRank==="B").length,i=e.ranking.filter(o=>o.abcRank==="C").length,r=e.ranking.filter(o=>o.abcRank==="A").reduce((o,c)=>o+c.amount,0),l=e.ranking.filter(o=>o.abcRank==="B").reduce((o,c)=>o+c.amount,0),d=e.ranking.filter(o=>o.abcRank==="C").reduce((o,c)=>o+c.amount,0),a=e.ranking.map(o=>`
        <tr>
          <td class="mono">${o.code}</td>
          <td>${o.name}</td>
          <td class="numeric">${Ae(o.amount)}</td>
          <td class="numeric">${o.ratio.toFixed(1)}%</td>
          <td class="numeric">${o.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${o.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${Ro(o.abcRank)}">${o.abcRank}</span></td>
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
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${Ae(r)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${Ae(l)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${i}社 <span class="kpi-sub">${Ae(d)}</span></div>
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
        ${Oo(e.ranking)}
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
      ${Mo(e)}
    </section>
  `}function nt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Fo(e){return e.replace("-","/")}const la={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function Bo(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=760,n=280,i={top:16,right:24,bottom:36,left:64},r=t-i.left-i.right,l=n-i.top-i.bottom,d=Math.max(...e.map(u=>u.amount),1),a=r/e.length,o=[0,.25,.5,.75,1].map(u=>{const p=i.top+l-l*u,y=`${Math.round(d*u/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${i.left}" y1="${p}" x2="${t-i.right}" y2="${p}" class="chart-grid" />
          <text x="8" y="${p+4}" class="chart-axis">${y}</text>
        </g>
      `}).join(""),c=e.map((u,p)=>{const y=u.amount/d*l,h=Math.max(a-18,24),f=i.left+p*a+(a-h)/2,g=i.top+l-y;return`
        <g>
          <rect x="${f}" y="${g}" width="${h}" height="${y}" rx="6" class="analytics-bar" />
          <text x="${f+h/2}" y="${n-10}" class="chart-axis centered-axis">${Fo(u.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${t} ${n}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${o}
      ${c}
    </svg>
  `}function zo(e){return e.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="numeric">${nt(t.amount)}</td>
          <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function Vo(e){return e.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="mono">${t.period}</td>
          <td class="numeric">${nt(t.amount)}</td>
          <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function ra(e,t,n){const i=t?e.filter(l=>l.tag.includes(t)||l.name.includes(t)):e,r=i.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':i.map(l=>`
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
  `}function Jo(e,t,n="all",i="",r=[],l=[],d="",a="",o=null,c="all",u="",p=[],y=[]){const h=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",f=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,g=n!=="all"&&r.length>0&&t!=="staff",b=["all","yearly","monthly","weekly","daily"].map(E=>`<button class="button ${E===n?"primary":"secondary"} small" type="button" data-analytics-period="${E}">${la[E]}</button>`).join(""),k=n!=="all"&&l.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${l.map(E=>`<option value="${E}" ${E===i?"selected":""}>${E}</option>`).join("")}
      </select>`:"";let w="",D="";if(t==="staff"){const E=["all","yearly","monthly","weekly","daily"].map(L=>`<button class="button ${L===c?"primary":"secondary"} small" type="button" data-staff-period="${L}">${la[L]}</button>`).join(""),S=c!=="all"&&p.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${p.map(L=>`<option value="${L}" ${L===u?"selected":""}>${L}</option>`).join("")}
        </select>`:"",O=(y.length>0?y:e.staffTotals).filter(L=>!d||L.name.includes(d)||L.code.includes(d)),F=c!=="all"&&u?` (${u})`:"";if(w=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${E}</div>
        ${S}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${d}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${F?`<span style="font-size:12px;color:var(--text-secondary);">${F}</span>`:""}
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
            ${O.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':O.map(L=>`
                <tr>
                  <td class="mono">${L.code||"―"}</td>
                  <td>${L.name||"未設定"}</td>
                  <td class="numeric">${nt(L.amount)}</td>
                  <td class="numeric">${L.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${L.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${L.code}" data-staff-name="${L.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,o){const L=o.breakdownTab,U=c!=="all"&&u?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${u}</span>`:"";D=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${o.name} の内訳${U}</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>

          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div class="tab-group">
              <button class="tab-button ${L==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${L==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${a}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${L==="customers"?ra(o.customerRows,a,"得意先名"):ra(o.productRows,a,"商品名")}
        </article>
      `}}return`
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
          ${Bo(e.monthlySales)}
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
            <div class="button-group">${b}</div>
            ${k}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>コード</th>
                  <th>名称</th>
                  ${g?"<th>期間</th>":""}
                  <th class="numeric">売上額</th>
                  <th class="numeric">数量</th>
                  <th class="numeric">伝票数</th>
                </tr>
              </thead>
              <tbody>${g?Vo(r):zo(f)}</tbody>
            </table>
          </div>
        `:w}
      </article>
    </section>
    ${D}
  `}function xe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Yo(e){const t=Math.max(...e.salesByProduct.flatMap(l=>l.values),1),n=e.salesByProduct.map(l=>{const d=l.values.map((a,o)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(a/t*120)}px" title="${e.months[o]}: ${xe(a)}"></div>
            <span class="bar-label">${e.months[o].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${l.label}</p>
          <div class="bar-chart">${d}</div>
        </div>
      `}).join(""),i=e.costSimulation.map(l=>`
      <tr>
        <td class="mono">${l.productCode}</td>
        <td>${l.productName}</td>
        <td class="numeric">${xe(l.costPrice)}</td>
        <td class="numeric">${xe(l.sellPrice)}</td>
        <td class="numeric">${xe(l.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${l.marginRate>=40?"success":"warning"}">${l.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(l=>{const d=l.values.reduce((a,o)=>a+o,0);return`
        <tr>
          <td>${l.label}</td>
          ${l.values.map(a=>`<td class="numeric">${(a/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${xe(d)}</strong></td>
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
          <tbody>${i}</tbody>
        </table>
      </div>
    </section>
  `}function Uo(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Qo(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ca(e){return e.toISOString().slice(0,10)}function Ho(e,t,n){const i=e.length?e.map(r=>`
            <tr>
              <td class="mono">${r.documentNo}</td>
              <td>${Uo(r.date)}</td>
              <td>
                <div class="table-title">${r.customerName}</div>
                <div class="table-sub mono">${r.customerCode}</div>
              </td>
              <td class="numeric">${Qo(r.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||ca(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||ca(new Date)}" />
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
  `}function Je(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Go(e,t,n,i){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},l={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},d={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},a=e.map(p=>`
      <tr>
        <td>${p.saleTime}</td>
        <td class="mono">${p.productCode}</td>
        <td>${p.productName}</td>
        <td class="numeric">${p.quantity}</td>
        <td class="numeric">${Je(p.unitPrice)}</td>
        <td class="numeric"><strong>${Je(p.amount)}</strong></td>
        <td>${r[p.paymentMethod]}</td>
      </tr>
    `).join(""),o=t.map(p=>`
      <tr>
        <td class="mono">${p.orderNo}</td>
        <td>${p.orderDate}</td>
        <td>${p.customerName}</td>
        <td>${p.postalCode} ${p.address}</td>
        <td>${p.items.map(y=>`${y.productName} ×${y.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Je(p.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${d[p.status]}">${l[p.status]}</span>
        </td>
        <td>${p.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${p.id}">詳細</button>
        </td>
      </tr>
    `).join(""),c=e.reduce((p,y)=>p+y.amount,0),u=t.filter(p=>p.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${Je(c)}</p>
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
            <tbody>${o||'<tr><td colspan="9" class="empty-row">受注データがありません。</td></tr>'}</tbody>
          </table>
        </div>
        `}
    </section>
  `}const ct={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Xo={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Ko(e,t,n,i){const r=Xo[e],l=Object.keys(ct).map(a=>`
      <button class="tab-button ${e===a?"active":""}" data-import-entity="${a}">
        ${ct[a]}
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
              ${t.columns.map(a=>`<th>${a}</th>`).join("")}
              <th>検証</th>
            </tr>
          </thead>
          <tbody>
            ${t.rows.slice(0,10).map((a,o)=>`
              <tr class="${a._valid?"":"has-error"}">
                <td>${o+1}</td>
                ${t.columns.map(c=>`<td>${String(a[c]??"")}</td>`).join("")}
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
      <div class="tab-group" style="flex-wrap: wrap;">${l}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${ct[e]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${r.required.map(a=>`<code class="config-value">${a}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${r.optional.map(a=>`<code class="config-value">${a}</code>`).join(" / ")}</dd>
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

    ${i?`<section class="panel"><p class="sync-message">${i}</p></section>`:""}
  `}const j={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function Wo(e,t,n){const i=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:j.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:j.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:j.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:j.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:j.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:j.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:j.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:j.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:j.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:j.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:j.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:j.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:j.date}];e.lines.slice(0,6).forEach((d,a)=>{const o=33+a*8.5;i.push({id:`line${a}_name`,label:`明細${a+1} 品名`,x:5,y:o,fontSize:7.5,value:d.productName+(d.spec?` ${d.spec}`:""),color:j.detail},{id:`line${a}_code`,label:`明細${a+1} CD`,x:64,y:o,fontSize:7.5,value:d.productCode,color:j.detail},{id:`line${a}_qty`,label:`明細${a+1} 数量`,x:124,y:o,fontSize:8,value:d.quantity>0?String(d.quantity):"",color:j.detail},{id:`line${a}_price`,label:`明細${a+1} 原単価`,x:163,y:o,fontSize:8,value:d.unitPrice>0?d.unitPrice.toLocaleString("ja-JP"):"",color:j.detail},{id:`line${a}_amount`,label:`明細${a+1} 原価金額`,x:176,y:o,fontSize:8,value:d.amount>0?d.amount.toLocaleString("ja-JP"):"",color:j.detail},{id:`line${a}_retail`,label:`明細${a+1} 売単価`,x:193,y:o,fontSize:8,value:d.retailPrice?d.retailPrice.toLocaleString("ja-JP"):"",color:j.detail})});const r=e.lines.reduce((d,a)=>d+(a.amount||0),0),l=e.lines.reduce((d,a)=>d+a.quantity,0);return i.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(l),color:j.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:j.total}),n&&i.forEach(d=>{const a=n[d.id];a&&(d.x=a.x,d.y=a.y)}),i}function Zo(e,t,n,i,r){const d=Wo(e,t,i).map(o=>`
      <div class="fd-field ${r?"fd-draggable":""}"
           data-fd-id="${o.id}"
           style="left:${o.x}mm; top:${o.y}mm; font-size:${o.fontSize}pt; --fd-color:${o.color};"
           title="${o.label} (${o.x.toFixed(1)}, ${o.y.toFixed(1)})">
        ${r?`<span class="fd-badge">${o.label}</span>`:""}
        <span class="fd-value">${o.value}</span>
      </div>
    `).join(""),a=n.showReferenceOverlay&&n.overlayImageUrl?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
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
        色: <span style="color:${j.header}">■ヘッダ</span>
        <span style="color:${j.code}">■コード</span>
        <span style="color:${j.date}">■日付</span>
        <span style="color:${j.detail}">■明細</span>
        <span style="color:${j.total}">■合計</span>
      </p>
    </section>
    `:""}

    <section class="panel fd-canvas-panel">
      <div class="fd-canvas-scaler" id="fd-scaler">
        <div class="fd-canvas" style="${a}">
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
  `}function dt(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const i=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,l=parseFloat(n.style.top)||0;t[i]={x:r,y:l}}),t}function el(e,t,n,i,r){const l=Array.from(new Set([...e.map(c=>c.businessType??""),...t.map(c=>c.businessType??"")].filter(Boolean))),d=e.filter(c=>c.lat&&c.lng).length,a=t.filter(c=>c.lat&&c.lng).length,o=n.filter(c=>c.lat&&c.lng).length;return`
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
        <p class="kpi-value">${d}</p>
        <p class="kpi-sub">/ ${e.length}件 (位置取得済)</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #4CAF50;">
        <p class="panel-title">🟢 新規見込客</p>
        <p class="kpi-value">${a}</p>
        <p class="kpi-sub">/ ${t.length}件</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #FF9800;">
        <p class="panel-title">🟠 納品先</p>
        <p class="kpi-value">${o}</p>
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
            ${l.map(c=>`<option value="${c}" ${i.filterBusinessType===c?"selected":""}>${c}</option>`).join("")}
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
            ${e.filter(c=>!c.lat||!c.lng).slice(0,5).map(c=>`
              <tr>
                <td>🔵 既存</td>
                <td>${c.name}</td>
                <td>${c.address1??"住所未設定"}</td>
                <td><span class="status-pill warning">位置未取得</span></td>
              </tr>
            `).join("")}
            ${t.filter(c=>!c.lat||!c.lng).slice(0,5).map(c=>`
              <tr>
                <td>🟢 新規</td>
                <td>${c.companyName}</td>
                <td>${c.address??"住所未設定"}</td>
                <td><span class="status-pill warning">位置未取得</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}const tl={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},al=["new","picking","packed","shipped","delivered"];function sl(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(l=>t[l.stage].push(l));const n=al.map(l=>{const d=tl[l],a=t[l];return`
      <div class="wf-col" data-wf-stage="${l}">
        <div class="wf-col-header" style="--wf-color:${d.color};">
          <span class="wf-col-icon">${d.icon}</span>
          <span class="wf-col-label">${d.label}</span>
          <span class="wf-col-count">${a.length}</span>
        </div>
        <div class="wf-col-body">
          ${a.length===0?'<div class="wf-empty">―</div>':a.map(o=>`
            <div class="wf-card ${o.priority==="urgent"?"wf-urgent":""}" data-wf-order="${o.id}" draggable="true">
              <div class="wf-card-header">
                <span class="wf-card-no mono">${o.orderNo}</span>
                ${o.priority==="urgent"?'<span class="wf-card-priority">🔥 急</span>':""}
              </div>
              <div class="wf-card-customer">${o.customerName}</div>
              <div class="wf-card-meta">
                <span>📅 ${o.orderDate}</span>
                ${o.deliveryDate?`<span>🚚 ${o.deliveryDate}</span>`:""}
              </div>
              <div class="wf-card-footer">
                <span>${o.itemCount}品</span>
                <strong>¥${o.totalAmount.toLocaleString("ja-JP")}</strong>
              </div>
              ${o.staffName?`<div class="wf-card-staff">👤 ${o.staffName}</div>`:""}
            </div>
          `).join("")}
        </div>
      </div>
    `}).join(""),i=e.reduce((l,d)=>l+d.totalAmount,0),r=e.filter(l=>l.priority==="urgent").length;return`
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
  `}function nl(e,t,n){const i=e.cart.reduce((l,d)=>l+d.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((l,d)=>l+d.quantity,0)}<br/>
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

      ${il(e,t,n)}
    </div>
  `}function il(e,t,n){if(e.step==="customer"){const i=e.customerQuery.toLowerCase(),r=i?t.filter(l=>l.name.toLowerCase().includes(i)||l.code.toLowerCase().includes(i)):t.slice(0,20);return`
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
    `}if(e.step==="products"){const i=e.productQuery.toLowerCase(),r=i?n.filter(l=>l.name.toLowerCase().includes(i)||l.code.toLowerCase().includes(i)):n.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${r.slice(0,50).map(l=>{const d=e.cart.find(a=>a.productCode===l.code);return`
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
  `}const da={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},ua={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},pa={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function ol(e,t){const n=e.find(l=>l.id===t)??e[0],i=e.filter(l=>l.status==="new").length,r=e.filter(l=>l.status==="confirmed").length;return`
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
          ${e.map(l=>`
            <button class="tour-item ${n?.id===l.id?"active":""}" data-tour-id="${l.id}">
              <div class="tour-item-head">
                <strong>${l.name}</strong>
                <span class="status-pill ${ua[l.status]}">${da[l.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${pa[l.language]} · 👥 ${l.partySize}名
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
            <span class="status-pill ${ua[n.status]}">${da[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${pa[n.language]}</dd></div>
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
  `}const ll=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,rl=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function cl(e,t){const n=t?e.find(r=>r.id===t):null,i=t==="__new__";return`
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
  `}function dl(e,t,n,i){const[r,l]=t.split("-").map(S=>parseInt(S,10)),d=new Date(r,l-1,1),a=new Date(r,l,0),o=d.getDay(),c=a.getDate(),u=[];for(let S=0;S<o;S++)u.push({isOutside:!0});for(let S=1;S<=c;S++)u.push({date:new Date(r,l-1,S)});for(;u.length%7!==0;)u.push({isOutside:!0});const p=n?e.filter(S=>S.category===n):e,y={};p.forEach(S=>{const C=S.startsAt.slice(0,10);y[C]??=[],y[C].push(S)});const h=new Date().toISOString().slice(0,10),f=u.map(S=>{if(S.isOutside)return'<div class="cal-cell cal-outside"></div>';const C=S.date,O=`${C.getFullYear()}-${String(C.getMonth()+1).padStart(2,"0")}-${String(C.getDate()).padStart(2,"0")}`,F=y[O]??[],L=O===h,U=C.getDay();return`
        <div class="cal-cell ${L?"cal-today":""} ${U===0?"cal-sun":U===6?"cal-sat":""}"
             data-cal-date="${O}">
          <div class="cal-day-num">${C.getDate()}</div>
          <div class="cal-events">
            ${F.slice(0,3).map(X=>`
              <button class="cal-event" data-cal-event-id="${X.id}"
                      style="background:${X.color||Ot[X.category]||"#0F5B8D"};"
                      title="${X.title}">
                <span class="cal-event-time">${X.isAllDay?"終日":new Date(X.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${X.title}</span>
              </button>
            `).join("")}
            ${F.length>3?`<button class="cal-event-more" data-cal-date="${O}">+${F.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),g=i?.isOpen?ul(i):"",b=new Date(r,l-2,1),k=new Date(r,l,1),w=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`,D=`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`,E=(()=>{const S=new Date;return`${S.getFullYear()}-${String(S.getMonth()+1).padStart(2,"0")}`})();return`
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
          <button class="button secondary" data-action="cal-prev" data-ym="${w}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${E}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${D}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(Rt).map(([S,C])=>`<option value="${S}" ${n===S?"selected":""}>${C}</option>`).join("")}
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

    ${g}
  `}function ul(e){const t=e.event;return`
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
                ${Object.entries(Rt).map(([n,i])=>`<option value="${n}" ${t.category===n?"selected":""}>${i}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?ma(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?ma(t.endsAt):""}" />
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
  `}function ma(e){const t=new Date(e),n=i=>String(i).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const Pe={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function pl(e,t){const n=t?e.find(i=>i.id===t):null;return`
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
        <p class="form-hint">${Pe[n.provider]?.description??""}</p>
        ${Pe[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${Pe[n.provider].setupUrl}" target="_blank">${Pe[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(Pe[n.provider]?.fields??[]).map(i=>`
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
  `}function ml(e,t){const n=e.reduce((l,d)=>l+d.totalAmount,0),i=e.filter(l=>l.financialStatus==="paid").length,r=e.filter(l=>l.fulfillmentStatus!=="fulfilled"&&l.fulfillmentStatus!=="shipped").length;return`
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
  `}function yl(e,t,n){return`
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
  `}function hl(e,t,n){const i=t==="__new__"?null:e.find(d=>d.id===t),r=t==="__new__";return n?.role==="admin"?`
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
                <td>${Ke[d.department]}</td>
                <td>${Xe[d.role]}</td>
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
              ${Object.entries(Ke).map(([d,a])=>`<option value="${d}" ${i?.department===d?"selected":""}>${a}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Xe).map(([d,a])=>`<option value="${d}" ${i?.role===d?"selected":""}>${a}</option>`).join("")}
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
    `}function vl(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${Ke[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Xe[e.role]}</dd></div>
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
    `}function fl(e){const t={};return e.forEach(n=>{const i=n.userEmail??"(anonymous)";t[i]=(t[i]??0)+1}),`
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
  `}function bl(e){const t=e.prospects.reduce((l,d)=>l+d.expectedAmount,0),n=e.prospects.reduce((l,d)=>l+d.expectedAmount*d.probability/100,0),i=e.prospects.filter(l=>l.stage==="won").length,r=e.prospects.filter(l=>l.stage==="hot"||l.stage==="negotiating").length;return`
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

    ${e.viewMode==="kanban"?gl(e.prospects):$l(e.prospects)}

    ${_l(e)}
  `}function gl(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(i=>{const r=e.filter(d=>d.stage===i),l=r.reduce((d,a)=>d+a.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${i}">
          <div class="pk-col-header" style="--pk-color:${st[i]};">
            <span class="pk-col-label">${qe[i]}</span>
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
              </div>
            `).join("")}
          </div>
        </div>
      `}).join("")}</div>
    </section>
  `}function $l(e){return`
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
                <td><span class="status-pill" style="background:${st[t.stage]};color:white;">${qe[t.stage]}</span></td>
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
  `}function _l(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(i=>i.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(qe).map(([i,r])=>`<option value="${i}" ${n?.stage===i?"selected":""}>${r}</option>`).join("")}
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
  `}function wl(e,t,n){const i=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
            ${t.map(l=>`
              <tr>
                <td>${We[l.eventType]||l.eventType}</td>
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
                <td>${We[l.eventType]||l.eventType}</td>
                <td class="mono" style="font-size:12px;">${l.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${l.message}</td>
                <td><span class="status-pill ${l.status==="sent"?"success":"warning"}">${l.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function kl(e,t,n,i){const r=new Map(t.map(p=>[p.code,p])),l=e.filter(p=>p.callDirection==="inbound").length,d=e.filter(p=>p.callDirection==="outbound").length,a=e.filter(p=>p.callStatus==="missed").length,o=e.reduce((p,y)=>p+(y.durationSeconds??0),0),c=p=>{if(p===0)return"―";const y=Math.floor(p/60),h=p%60;return y>0?`${y}分${h}秒`:`${h}秒`},u=p=>{if(p.matchedCustomerCode){const y=r.get(p.matchedCustomerCode);if(y)return`${y.name} (既存)`}return"未登録番号"};return`
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
        <p class="kpi-value">${l}件</p>
        <p class="kpi-sub">不在 ${a}件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">発信</p>
        <p class="kpi-value">${d}件</p>
        <p class="kpi-sub">直近50件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">通話時間合計</p>
        <p class="kpi-value">${c(o)}</p>
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
                <td>${c(p.durationSeconds??0)}</td>
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
  `}const Sl=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function xl(e){const t=e.activeListId?e.lists.find(l=>l.id===e.activeListId):null,n=e.items.filter(l=>l.status==="new").length,i=e.items.filter(l=>l.status==="imported").length,r=e.items.filter(l=>l.status==="excluded").length;return`
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
            ${Sl.map(l=>`<option value="${l}" ${e.searchBusinessType===l?"selected":""}>${l}</option>`).join("")}
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
  `}const ya={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Pl={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},Al={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function J(e){return"¥"+e.toLocaleString("ja-JP")}function Ce(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function ws(e,t){const n=e.reduce((l,d)=>l+d.amount,0),i=Math.floor(n*t),r=n+i;return{subtotal:n,taxAmount:i,total:r}}const N={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function M(e,t){const n=e.align??"left",i=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${i}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function ut(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),i=n-2018;return{y:i>0?String(i).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function Dl(e,t,n){const i=ut(e.documentDate),r=ut(e.orderDate??e.documentDate),l=ut(e.deliveryDate??e.documentDate),d=e.lines.slice(0,6).map((b,k)=>{const w=N.detailStartY+k*N.detailRowH,D=N.detailCols,E=[],S=(C,O)=>{O&&E.push(M({...C,y:w,x:C.x+0},O))};return S(D.productName,b.productName+(b.spec?` ${b.spec}`:"")),S(D.productCode,b.productCode),S(D.color,b.color??""),S(D.size,[b.size,b.caseQty?`×${b.caseQty}`:""].filter(Boolean).join(" ")),S(D.unit,b.unit),S(D.quantity,b.quantity>0?b.quantity.toLocaleString("ja-JP"):""),S(D.correctedQty,b.correctedQuantity?b.correctedQuantity.toLocaleString("ja-JP"):""),S(D.discount,b.discount?b.discount.toLocaleString("ja-JP"):""),S(D.unitPrice,b.unitPrice>0?b.unitPrice.toLocaleString("ja-JP"):""),S(D.costAmount,b.amount>0?b.amount.toLocaleString("ja-JP"):""),S(D.retailPrice,b.retailPrice?b.retailPrice.toLocaleString("ja-JP"):""),S(D.note,b.receivedAmount?b.receivedAmount.toLocaleString("ja-JP"):""),E.join("")}).join(""),a=e.lines.reduce((b,k)=>b+(k.amount||0),0),o=e.lines.reduce((b,k)=>b+(k.retailPrice||0)*(k.correctedQuantity??k.quantity),0),c=e.lines.reduce((b,k)=>b+(k.receivedAmount||0),0),u=e.lines.reduce((b,k)=>b+(k.returnAmount||0),0),p=e.lines.reduce((b,k)=>b+k.quantity,0),y=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",h=n.calibrationOffsetX||0,f=n.calibrationOffsetY||0,g=`transform: translate(${h}mm, ${f}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${y}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${g}">
        ${M(N.currentDateY,i.y)}
        ${M(N.currentDateM,i.m)}
        ${M(N.currentDateD,i.d)}
        ${M(N.documentNo,e.documentNo)}
        ${e.settlementPrint?M(N.settlementCheck,"✓"):""}

        ${M(N.vendorName,t.name)}
        ${M(N.vendorAddress,t.address1)}
        ${M(N.chainStoreCode,e.chainStoreCode??"")}
        ${M(N.categoryCode,e.categoryCode??"")}
        ${M(N.slipNumber,e.documentNo)}
        ${M(N.vendorCode,e.slipTypeCode??"")}

        ${M(N.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${M(N.orderDateY,r.y)}
        ${M(N.orderDateM,r.m)}
        ${M(N.orderDateD,r.d)}
        ${M(N.deliveryDateY,l.y)}
        ${M(N.deliveryDateM,l.m)}
        ${M(N.deliveryDateD,l.d)}
        ${M(N.orderNo,e.orderNo??"")}
        ${M(N.partnerCode,e.vendorCode??"")}

        ${d}

        ${M(N.totalQty,p.toLocaleString("ja-JP"))}
        ${M(N.receivedTotal,c.toLocaleString("ja-JP"))}
        ${M(N.returnTotal,u.toLocaleString("ja-JP"))}
        ${M(N.correctedCostTotal,a.toLocaleString("ja-JP"))}
        ${M(N.correctedRetailTotal,o.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function El(e,t,n){const{subtotal:i,taxAmount:r,total:l}=ws(e.lines,e.taxRate),d=e.previousBalance??0,a=e.paymentAmount??0,o=d-a+l,c=e.lines.map(p=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${p.note??""}</td>
        <td>${p.productName}${p.spec?` <span style="color:#636e72;font-size:9pt;">/ ${p.spec}</span>`:""}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${p.unit}</td>`:""}
        <td class="numeric">${J(p.unitPrice)}</td>
        <td class="numeric">${J(p.amount)}</td>
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
        <div><dt>請求日</dt><dd>${Ce(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${Ce(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${J(o)}</span>
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
        <tbody>${c}${u}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${J(i)} / 消費税: ${J(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${d?`<tr><th>前回御請求額</th><td>${J(d)}</td></tr>`:""}
          ${a?`<tr><th>ご入金額</th><td>▲ ${J(a)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${J(i)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${J(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${J(o)}</td></tr>
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
  `}function Cl(e,t,n){const{subtotal:i,taxAmount:r,total:l}=ws(e.lines,e.taxRate),d=e.lines.map(o=>`
      <tr>
        <td>${o.productName}${o.spec?` <span style="color:#636e72;font-size:9pt;">/ ${o.spec}</span>`:""}</td>
        <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${o.unit}</td>`:""}
        <td class="numeric">${J(o.unitPrice)}</td>
        <td class="numeric">${J(o.amount)}</td>
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
        <div><dt>見積日</dt><dd>${Ce(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${Ce(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${J(l)}</span>
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
        <tbody>${d}${a}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${J(i)} / 消費税: ${J(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${J(i)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${J(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${J(l)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?Ce(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function Ll(e,t,n,i){let r="";switch(e){case"chain_store":r=Dl(i,n,t);break;case"quotation":r=Cl(i,n,t);break;case"invoice_monthly":r=El(i,n,t);break}const l=Object.keys(ya).map(o=>`<button class="tab-button ${e===o?"active":""}" data-print-template="${o}">${ya[o]}</button>`).join(""),d=i.lines.map((o,c)=>`
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${c}" data-print-lfield="productName" value="${o.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${c}" data-print-lfield="quantity" value="${o.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${c}" data-print-lfield="unitPrice" value="${o.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${o.amount>0?o.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${c}">✕</button></td>
      </tr>`).join(""),a=[{key:"showSeal",label:"印影"},{key:"showRegistrationNo",label:"登録番号"},{key:"showBankInfo",label:"振込先"},{key:"showJanCode",label:"JAN"},{key:"showRemarks",label:"備考"}].map(o=>`<label style="font-size:12px;"><input type="checkbox" data-print-opt="${o.key}" ${t[o.key]?"checked":""} /> ${o.label}</label>`).join(" ");return`
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
              <tbody>${d||'<tr><td colspan="5" class="empty-row">行追加してください</td></tr>'}</tbody>
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
  `}const Il={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},Tl={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function ql(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],i="",r=!1;for(let a=0;a<e.length;a++){const o=e[a];r?o==='"'?e[a+1]==='"'?(i+='"',a++):r=!1:i+=o:o==='"'?r=!0:o===","?(n.push(i),i=""):o===`
`||o==="\r"?(o==="\r"&&e[a+1]===`
`&&a++,n.push(i),n.some(c=>c!=="")&&t.push(n),n=[],i=""):i+=o}if((i!==""||n.length>0)&&(n.push(i),n.some(a=>a!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const l=t[0].map(a=>a.trim()),d=[];for(let a=1;a<t.length;a++){const o={};l.forEach((c,u)=>{o[c]=(t[a][u]??"").trim()}),d.push(o)}return{columns:l,rows:d}}function Nl(e,t,n){const i=Il[e],r=i.filter(a=>!t.includes(a)),l=n.map(a=>{const o=[];r.length>0&&o.push(`必須列欠損: ${r.join(",")}`);for(const c of i)t.includes(c)&&!a[c]&&o.push(`${c}が空`);return{...a,_valid:o.length===0,_error:o[0]}}),d=l.filter(a=>a._valid).length;return{entity:e,columns:t,rows:l,totalRows:n.length,validRows:d,invalidRows:l.length-d}}function Rl(e){const n=Tl[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function Ol(e,t){const{supabaseInsert:n}=await _(async()=>{const{supabaseInsert:a}=await Promise.resolve().then(()=>R);return{supabaseInsert:a}},void 0);let i=0,r=0;const d={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const a of t){if(!a._valid)continue;const{_valid:o,_error:c,...u}=a,p={...u};if(!p.id){const y=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";p.id=String(u[y]??`${e}-${Date.now()}-${i+r}`)}for(const y of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof p[y]=="string"&&p[y]!==""){const h=Number(p[y]);Number.isFinite(h)&&(p[y]=h)}try{await n(d,p)!==null?i++:r++}catch{r++}}return{inserted:i,failed:r}}function pt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Ml(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function jl(e,t,n,i,r){const l=n.reduce((c,u)=>c+u.rowCount,0),d=n.map(c=>c.lastSyncAt).filter(c=>c!==null).sort().reverse()[0]??null,a=100,o=Math.max(1,Math.ceil(r/a));return`
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
        <p class="kpi-value">${d?pt(d):"---"}</p>
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
        ${n.map(c=>`
          <button
            class="panel kpi-card ${e===c.tableName?"kpi-alert":""}"
            type="button"
            data-action="raw-select-table"
            data-table="${c.tableName}"
            style="cursor:pointer;text-align:left;border:2px solid ${e===c.tableName?"var(--primary)":"transparent"};transition:border-color .15s;"
          >
            <p class="panel-title" style="font-size:12px;">${c.displayName}</p>
            <p class="kpi-value" style="font-size:18px;">${c.rowCount.toLocaleString("ja-JP")}</p>
            <p class="kpi-sub" style="font-size:11px;">${c.lastSyncAt?pt(c.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(c=>c.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${r.toLocaleString("ja-JP")}件中 ${((i-1)*a+1).toLocaleString("ja-JP")}-${Math.min(i*a,r).toLocaleString("ja-JP")} を表示</p>
        </div>
        <div class="panel-header-actions">
          <button class="button secondary" type="button" data-action="raw-page-prev" ${i<=1?"disabled":""}>← 前</button>
          <span style="padding:0 8px;">${i} / ${o}</span>
          <button class="button secondary" type="button" data-action="raw-page-next" ${i>=o?"disabled":""}>次 →</button>
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
            ${t.map(c=>`
            <tr>
              <td class="numeric mono">${c._record_index}</td>
              <td class="mono">${c._source_file||""}</td>
              <td class="numeric">${c._record_size??""} B</td>
              <td>${c._synced_at?pt(c._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${c._raw_b64?c._raw_b64.slice(0,200):""}">${Ml(c._raw_b64)}</td>
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
  `}function B(e){return e.toLocaleString("ja-JP")}function mt(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function Fl(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function Bl(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const i=e.products.slice().sort((k,w)=>(e.productTotals[w.code]??0)-(e.productTotals[k.code]??0)).slice(0,6),r=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],l=820,d=280,a={top:20,right:20,bottom:40,left:60},o=l-a.left-a.right,c=d-a.top-a.bottom,u=t.map(k=>i.reduce((w,D)=>w+(n[D.code]?.[k]??0),0)),p=Math.max(...u,1),y=o/t.length,h=Math.max(y-10,14),f=[0,.25,.5,.75,1].map(k=>{const w=a.top+c-c*k,D=`${Math.round(p*k/100)*100}`;return`
      <line x1="${a.left}" y1="${w}" x2="${l-a.right}" y2="${w}" class="chart-grid" />
      <text x="6" y="${w+4}" class="chart-axis">${Number(D).toLocaleString("ja-JP")}</text>
    `}).join(""),g=t.map((k,w)=>{let D=a.top+c;const E=a.left+w*y+(y-h)/2,S=i.map((X,Vt)=>{const Jt=(n[X.code]?.[k]??0)/p*c;return D-=Jt,`<rect x="${E}" y="${D}" width="${h}" height="${Jt}" fill="${r[Vt%r.length]}" opacity="0.85" rx="${Vt===i.length-1?3:0}" />`}).join(""),[C,O]=k.split("-"),F=parseInt(O),L=F===1||w%3===0,U=F===1?`${C.slice(2)}年`:`${F}月`;return`<g>${S}${L?`<text x="${E+h/2}" y="${d-10}" class="chart-axis centered-axis">${U}</text>`:""}</g>`}).join(""),b=i.map((k,w)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${r[w%r.length]};"></span>
       ${k.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${l} ${d}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${f}${g}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${a.left}px;display:flex;flex-wrap:wrap;">${b}</div>
  `}function zl(e){const{months:t,products:n}=e,i=n.slice().sort((d,a)=>(e.productTotals[a.code]??0)-(e.productTotals[d.code]??0)).slice(0,50),r=t.map(d=>{const[a,o]=d.split("-"),c=parseInt(o);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${c===1?`${a.slice(2)}年1月`:`${c}月`}</th>`}).join(""),l=i.map(d=>{const a=t.map(o=>{const c=e.matrix[d.code]?.[o]??0;return`<td class="numeric">${c>0?B(c):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${d.code}</td>
        <td style="white-space:nowrap;">${d.name}</td>
        ${a}
        <td class="numeric"><strong>${B(e.productTotals[d.code]??0)}</strong></td>
        <td class="numeric">${B(Math.round(e.productAvg[d.code]??0))}</td>
        <td class="numeric">${B(Math.round(e.productStdDev[d.code]??0))}</td>
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
  `}function Vl(e,t){const n=e.months[e.months.length-1]??"",i=e.months[e.months.length-2]??"",r=e.months.length-13,l=r>=0?e.months[r]:"",d=e.products.reduce((h,f)=>h+(e.matrix[f.code]?.[n]??0),0),a=e.products.reduce((h,f)=>h+(e.matrix[f.code]?.[i]??0),0),o=l?e.products.reduce((h,f)=>h+(e.matrix[f.code]?.[l]??0),0):0,c=a>0?(d-a)/a*100:0,u=o>0?(d-o)/o*100:0,p=h=>h>=0?"+":"",y=[1,2,3,5].map(h=>`<option value="${h}" ${h===t?"selected":""}>${h}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${B(d)} 本</p>
        <p class="kpi-sub">${mt(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${c>=0?"":"text-danger"}">${p(c)}${c.toFixed(1)}%</p>
        <p class="kpi-sub">${mt(i)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${u>=0?"":"text-danger"}">${o>0?`${p(u)}${u.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${l?`${mt(l)} 比`:"前年データなし"}</p>
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
            <select data-action="demand-years-back" style="width:80px;">${y}</select>
          </label>
          <button class="button secondary" type="button" data-action="demand-csv-export">CSV出力</button>
        </div>
      </div>
      ${Bl(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${zl(e)}
    </section>
  `}function Jl(e){const t=e.map(i=>{const r=Fl(i.serviceLevel),l=i.leadTimeDays/30,d=Math.ceil(r*i.demandStdDev*Math.sqrt(l)),a=Math.ceil(i.avgMonthlyDemand*l+d),o=d-i.safetyStockQty,c=o>0?"text-danger":o<-d*.3?"text-warning":"",u=[.9,.95,.99].map(p=>`<option value="${p}" ${Math.abs(i.serviceLevel-p)<.01?"selected":""}>${(p*100).toFixed(0)}%</option>`).join("");return`
      <tr>
        <td style="white-space:nowrap;">${i.productName}</td>
        <td class="numeric">${B(Math.round(i.avgMonthlyDemand))}</td>
        <td class="numeric">${B(Math.round(i.demandStdDev))}</td>
        <td>
          <input class="input-sm" type="number" min="1" max="180"
            value="${i.leadTimeDays}"
            data-action="ss-lead-time" data-code="${i.productCode}"
            style="width:60px;text-align:right;" />
        </td>
        <td>
          <select class="input-sm" data-action="ss-service-level" data-code="${i.productCode}"
            style="width:64px;">${u}</select>
        </td>
        <td class="numeric"><strong>${B(d)}</strong></td>
        <td class="numeric">${B(a)}</td>
        <td class="numeric ${c}">
          ${o>0?`+${B(o)}`:B(o)}
          ${o>0?'<span class="status-pill warning" style="margin-left:4px">不足</span>':""}
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
              <th>商品名</th>
              <th class="numeric">月平均需要</th>
              <th class="numeric">標準偏差</th>
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              <th class="numeric">安全在庫[算出]</th>
              <th class="numeric">発注点</th>
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${t||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const Yl={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function Ul(e,t){const n={draft:"下書き",confirmed:"確定",actual:"実績入力済"},i={draft:"neutral",confirmed:"info",actual:"success"},r=g=>Object.entries(Yl).map(([b,k])=>`<option value="${b}" ${b===g?"selected":""}>${k}</option>`).join(""),l=640,d=e.map(g=>{const b=Math.max(0,g.demandForecast+g.safetyStockTarget-g.openingStock),k=g.plannedQty>0?g.plannedQty:Math.round(b),w=k>0?Math.ceil(k/l*10)/10:0,D=g.plannedQty>0?(g.actualQty-g.plannedQty)/g.plannedQty*100:null,E=D!==null?D>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${g.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${g.productCode}"
            style="width:92px;">${r(g.productionType)}</select>
        </td>
        <td class="numeric">${B(Math.round(g.demandForecast))}</td>
        <td class="numeric">${B(Math.round(g.safetyStockTarget))}</td>
        <td class="numeric">${B(Math.round(g.openingStock))}</td>
        <td class="numeric"><strong>${B(Math.round(b))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${g.plannedQty}"
            data-action="plan-qty" data-code="${g.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">${g.actualQty>0?B(g.actualQty):"—"}</td>
        <td class="numeric ${E}">
          ${D!==null?`${D>=0?"+":""}${D.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${w>0?`${w.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${i[g.status]??"neutral"}">${n[g.status]??g.status}</span>
        </td>
      </tr>
    `}).join(""),a=e.reduce((g,b)=>g+b.demandForecast,0),o=e.reduce((g,b)=>g+Math.max(0,b.demandForecast+b.safetyStockTarget-b.openingStock),0),c=e.reduce((g,b)=>g+b.plannedQty,0),u=e.reduce((g,b)=>g+b.actualQty,0),p=e.reduce((g,b)=>{const k=Math.max(0,b.demandForecast+b.safetyStockTarget-b.openingStock);return g+(b.plannedQty>0?b.plannedQty:Math.round(k))},0),y=Math.ceil(p/l*10)/10,h=new Date;return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${Array.from({length:24},(g,b)=>{const k=new Date(h.getFullYear(),h.getMonth()-6+b,1),w=`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`;return`<option value="${w}" ${w===t?"selected":""}>${w.replace("-","年")}月</option>`}).join("")}</select>
      </label>
      <button class="button secondary" type="button" data-action="plan-recalc">需要予測を再計算</button>
    </div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>月次生産計画 — ${t.replace("-","年")}月</h2>
          <p class="panel-caption">必要生産数 = 需要予測 + 安全在庫目標 − 期首在庫</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="button secondary" type="button" data-action="plan-csv-export">CSV出力</button>
          <button class="button primary" type="button" data-action="plan-save">計画を保存</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>商品名</th>
              <th>生産区分</th>
              <th class="numeric">需要予測</th>
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              <th class="numeric">必要生産数</th>
              <th class="numeric">計画数</th>
              <th class="numeric">実績数</th>
              <th class="numeric">達成率</th>
              <th class="numeric" title="表+裏の手貼り 80本/時×8h=640本/人日">ラベル工数</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${d||'<tr><td colspan="11" class="empty-row">データなし</td></tr>'}
            ${e.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${B(Math.round(a))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${B(Math.round(o))}</td>
                <td class="numeric">${B(c)}</td>
                <td class="numeric">${u>0?B(u):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${y.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ql(e,t,n,i,r,l){const a=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"}].map(c=>`<button class="tab-button ${i===c.key?"active":""}"
       data-demand-tab="${c.key}">${c.label}</button>`).join("");let o="";return i==="demand"?o=e?Vl(e,l):'<section class="panel"><p>データを読み込んでいます…</p></section>':i==="safety"?o=Jl(t):o=Ul(n,r),`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${a}
    </div>

    ${o}
  `}function ha(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Hl(e,t){return Math.floor(Math.abs(t.getTime()-e.getTime())/(1e3*60*60*24))}function Gl(e){return e==="dormant"?"休眠":"離反リスク"}function Xl(e){return e==="dormant"?"warning":"danger"}function Kl(e,t){const n=new Date,i=new Date(n);i.setMonth(i.getMonth()-3);const r=new Date(n);r.setMonth(r.getMonth()-12);const l=new Date(n);l.setFullYear(l.getFullYear()-1);const d=new Date(l.getFullYear(),l.getMonth(),1),a=new Date(l.getFullYear(),l.getMonth()+1,0),o=new Date(n.getFullYear(),n.getMonth(),1),c=new Map(t.map(f=>[f.code,f])),u=new Map;for(const f of e){if(!f.legacy_customer_code)continue;const g=u.get(f.legacy_customer_code)||[];g.push(f),u.set(f.legacy_customer_code,g)}const p=[],y=[],h=new Set;for(const[f,g]of u.entries()){const b=c.get(f),k=b?.name||(g[0]?.customer_name??f);let w=null,D=0,E=!1,S=!1,C=!1,O=!1;for(const L of g){const U=new Date(L.sales_date);(!w||U>w)&&(w=U),U>=r&&(S=!0,D+=L.total_amount),U>=i&&(E=!0),U>=d&&U<=a&&(C=!0),U>=o&&(O=!0)}if(!w)continue;const F={code:f,name:k,businessType:b?.businessType??"",areaCode:b?.areaCode??"",phone:b?.phone??"",lastOrderDate:w.toISOString().slice(0,10),daysSinceLastOrder:Hl(w,n),totalAmountLast12m:D,status:"dormant"};S&&!E&&(p.push({...F,status:"dormant"}),h.add(f)),C&&!O&&!h.has(f)&&y.push({...F,status:"at-risk"})}return p.sort((f,g)=>g.daysSinceLastOrder-f.daysSinceLastOrder),y.sort((f,g)=>g.totalAmountLast12m-f.totalAmountLast12m),{dormantCustomers:p,atRiskCustomers:y}}function Wl(e){const t=[...e.dormantCustomers,...e.atRiskCustomers],n=e.dormantCustomers.length,i=e.atRiskCustomers.length,r=e.dormantCustomers.reduce((u,p)=>u+p.totalAmountLast12m,0),l=t.map(u=>`
        <tr data-status="${u.status}" data-area="${u.areaCode}" data-biz="${u.businessType}">
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td>${u.businessType}</td>
          <td>${u.areaCode}</td>
          <td class="mono">${u.lastOrderDate}</td>
          <td class="numeric">${u.daysSinceLastOrder}日</td>
          <td class="numeric">${ha(u.totalAmountLast12m)}</td>
          <td><span class="status-pill ${Xl(u.status)}">${Gl(u.status)}</span></td>
        </tr>
      `).join(""),d=[...new Set(t.map(u=>u.areaCode).filter(Boolean))].sort(),a=[...new Set(t.map(u=>u.businessType).filter(Boolean))].sort(),o=d.map(u=>`<option value="${u}">${u}</option>`).join(""),c=a.map(u=>`<option value="${u}">${u}</option>`).join("");return`
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
        <div class="kpi-value">${ha(r)}</div>
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
            ${o}
          </select>
          <select id="churn-filter-biz" class="input-sm">
            <option value="">業種: すべて</option>
            ${c}
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
            ${l}
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
  `}const ie=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],St={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},ne={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function Zl(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function er(e){const t=e.reduce((l,d)=>l+d,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const i=Math.max(...e);return e.filter(l=>l>i*.1).length<=6?"seasonal":"year-round"}function tr(e){const t=e.reduce((l,d)=>l+d,0);if(t===0)return[];const i=t/12*1.5,r=[];for(let l=0;l<12;l++)e[l]>i&&r.push(l);if(r.length===0){const l=Math.max(...e);l>0&&r.push(e.indexOf(l))}return r.sort((l,d)=>l-d)}function ar(e){return e.length===0?0:(e[0]-2+12)%12}function va(e){const t=new Date().getMonth(),n=e.map(r=>{const l=er(r.monthlyQuantity),d=tr(r.monthlyQuantity),a=ar(d);return{code:r.code,name:r.name,category:r.category,peakMonths:d,proposalStartMonth:a,seasonType:l,monthlyQuantity:r.monthlyQuantity}}),i=[];for(let r=0;r<12;r++){const l=n.filter(d=>{if(d.peakMonths.length===0)return!1;const a=d.proposalStartMonth,o=d.peakMonths[0];return a<=o?r>=a&&r<=o:r>=a||r<=o});i.push({month:r,products:l,targetCustomers:[]})}return{products:n,proposals:i,selectedMonth:t}}function sr(e){const{products:t,proposals:n,selectedMonth:i}=e,r=new Date().getMonth(),l={"year-round":[],seasonal:[],"year-end":[]};t.forEach(p=>l[p.seasonType].push(p));const d=n[i],a=t.length,o=d?.products.length??0,c=t.filter(p=>p.peakMonths.includes(i)).length,u=d?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${ie[i]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${o}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${ie[i]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${c}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${u}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${ie.map((p,y)=>{const h=y===r,f=y===i;return`<button class="button" style="padding:4px 10px;background:${f?"#0F5B8D":h?"#e2e8f0":"transparent"};color:${f?"#fff":"#333"};border:${h&&!f?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${y}">${p}${h?" ●":""}</button>`}).join("")}
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
            ${ie.map((p,y)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${y===r?"background:#f0f7ff;":""}">${p.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${nr(l,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${ir(l,i)}

  <!-- Target customer list for selected month -->
  ${or(d)}
</div>`}function nr(e,t){const n=[],i=["year-round","seasonal","year-end"];for(const r of i){const l=e[r];if(l.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${ne[r]}15;color:${ne[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${St[r]}</span>
    </td></tr>`);for(const d of l){const a=ie.map((o,c)=>{const u=d.peakMonths.includes(c),p=ks(d,c),y=c===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let h="transparent";u?h=ne[d.seasonType]:p&&(h=ne[d.seasonType]+"40");const f=u||p?`background:${h};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${y}"><div style="${f}" title="${u?"ピーク":p?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${d.name}"><span class="mono" style="font-size:0.7rem;color:#888">${d.code}</span> ${d.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${ne[d.seasonType]}15;color:${ne[d.seasonType]}">${St[d.seasonType]}</span></td>
        ${a}
      </tr>`)}}}return n.join("")}function ks(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,i=e.peakMonths[0];return n<=i?t>=n&&t<i:t>=n||t<i}function ir(e,t){const i=["year-round","seasonal","year-end"].map(r=>{const l=e[r];if(l.length===0)return"";const d=l.filter(o=>o.peakMonths.includes(t)||ks(o,t));if(d.length===0)return"";const a=d.map(o=>{const u=o.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',p=o.monthlyQuantity.reduce((y,h)=>y+h,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${o.code}</td>
        <td style="padding:6px 8px">${o.name}</td>
        <td style="padding:6px 8px">${u}</td>
        <td class="mono numeric" style="padding:6px 8px">${o.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${p.toLocaleString()}</td>
        <td style="padding:6px 8px">${o.peakMonths.map(y=>ie[y]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${ne[r]}15;color:${ne[r]}">${St[r]}</span>
        <span style="font-size:0.85rem;color:#666">${ie[t]}の対象: ${d.length}品</span>
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
    </div>`}).filter(Boolean);return i.length===0?`<div style="padding:1rem;color:#666;text-align:center">${ie[t]}に提案対象の商品はありません</div>`:i.join("")}function or(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${Zl(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const lr=["日","月","火","水","木","金","土"];function rr(e){const[t,n]=e.split("-").map(Number),i=new Date(t,n-1,1),r=new Date(t,n,0),l=[];for(let d=0;d<i.getDay();d++)l.push({outside:!0});for(let d=1;d<=r.getDate();d++)l.push({date:`${e}-${String(d).padStart(2,"0")}`});for(;l.length%7!==0;)l.push({outside:!0});return l}function cr(e,t,n){const[i,r]=t.split("-").map(Number),l=new Date(i,r-2,1),d=new Date(i,r,1),a=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}`,o=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,c=new Date().toISOString().slice(0,10),p=rr(t).map(g=>{if(g.outside)return'<div class="sc-cell sc-outside"></div>';const b=g.date,k=Number(b.split("-")[2]),w=new Date(`${b}T00:00:00`).getDay(),D=e?.[b],E=b===c,S=b===n;let C="",O="";return D&&(C=`<span class="sc-badge">${D.count}件</span>`,O=D.cityGroups.slice(0,3).map(F=>`<span class="sc-city-tag">${F.city}<em>${F.count}</em></span>`).join(""),D.cityGroups.length>3&&(O+=`<span class="sc-city-more">+${D.cityGroups.length-3}</span>`)),`
      <div class="sc-cell ${E?"sc-today":""} ${S?"sc-selected":""} ${D?"sc-has-data":""}"
           data-sc-date="${b}">
        <div class="sc-day-header">
          <span class="sc-day-num ${w===0?"sc-sun":w===6?"sc-sat":""}">${k}</span>
          ${C}
        </div>
        <div class="sc-cities">${O}</div>
      </div>
    `}).join(""),y=n&&e?.[n]?dr(e[n]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',h=Object.values(e??{}).reduce((g,b)=>g+b.count,0),f=Object.values(e??{}).reduce((g,b)=>g+b.totalAmount,0);return`
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
          <span class="sc-month-label">${i}年${r}月</span>
          <button class="sc-nav-btn" data-sc-ym="${o}">▶</button>
        </div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays">
            ${lr.map((g,b)=>`<div class="sc-weekday ${b===0?"sc-sun":b===6?"sc-sat":""}">${g}</div>`).join("")}
          </div>
          <div class="sc-grid">
            ${e===null?'<div class="sc-loading"><div class="loading-spinner"></div><p>読み込み中…</p></div>':p}
          </div>
        </div>

        <div class="sc-detail-col">
          ${y}
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
  `}function dr(e){const t=e.date.replace(/-/g,"/").slice(5),n={};for(const r of e.entries)(n[r.city]??=[]).push(r);const i=Object.entries(n).sort((r,l)=>l[1].length-r[1].length).map(([r,l])=>{const d=l.sort((a,o)=>o.amount-a.amount).map(a=>`
          <div class="sc-customer-row">
            <span class="sc-customer-name" title="${a.customerName}">${a.customerName}</span>
            <span class="sc-customer-amt">${a.amount>0?`¥${a.amount.toLocaleString()}`:"-"}</span>
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${r}（${l.length}件）</div>
          ${d}
        </div>`}).join("");return`
    <p class="sc-detail-date">${t}の出荷</p>
    <p class="sc-detail-meta">${e.count}件 / ¥${e.totalAmount.toLocaleString()}</p>
    ${i}
  `}const ur=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),yt=["月","火","水","木","金"],fa=6;function pr(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function mr(e,t){if(t.length===0)return 0;const n=[...t].sort((r,l)=>r-l);return n.filter(r=>r<=e).length/n.length}function yr(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function ba(e){const t=new Date,n=e.map(o=>o.annualRevenue),i=e.map(o=>{const c=pr(o.lastOrderDate,t);let u=0;const p=[];c>=60&&(u+=50,p.push("離反リスク")),o.hasSeasonalProposal&&(u+=30,p.push("季節提案タイミング")),c>=30&&c<60&&(u+=20,p.push("定期巡回"));const y=mr(o.annualRevenue,n),h=Math.round(y*20);h>0&&(u+=h,p.push("金額ウェイト"));const f=yr(p,c);return{code:o.code,name:o.name,phone:o.phone,address:o.address1,areaCode:o.areaCode,businessType:o.businessType,priorityScore:u,reasons:p,lastOrderDate:o.lastOrderDate,daysSinceOrder:c,annualRevenue:o.annualRevenue,recommendedAction:f}}).filter(o=>o.priorityScore>0).sort((o,c)=>c.priorityScore-o.priorityScore),r=new Map;for(const o of i){const c=o.areaCode||"その他";r.has(c)||r.set(c,[]),r.get(c).push(o)}const l=[...r.entries()].sort((o,c)=>c[1].reduce((u,p)=>u+p.priorityScore,0)-o[1].reduce((u,p)=>u+p.priorityScore,0)),d=[];let a=0;for(const[o,c]of l){const u=c.sort((p,y)=>y.priorityScore-p.priorityScore);for(let p=0;p<u.length&&!(a>=yt.length);p+=fa){const y=u.slice(p,p+fa);d.push({dayLabel:yt[a],area:o,visits:y}),a++}if(a>=yt.length)break}return{candidates:i,weekPlan:d,filterArea:"",filterMinScore:0}}function hr(e){const{candidates:t,weekPlan:n,filterArea:i,filterMinScore:r}=e,l=t.filter(p=>!(i&&p.areaCode!==i||r>0&&p.priorityScore<r)),d=Array.from(new Set(t.map(p=>p.areaCode))).sort(),a=l.length,o=l.filter(p=>p.priorityScore>=50).length,c=l.filter(p=>p.reasons.includes("離反リスク")).length,u=n.reduce((p,y)=>p+y.visits.length,0);return`
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
        <div class="kpi-value">${o}</div>
        <div>高優先度 (50+)</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">${c}</div>
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
            ${d.map(p=>`<option value="${p}"${i===p?" selected":""}>${p}</option>`).join("")}
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
      ${n.length===0?"<p>訪問候補がありません。</p>":vr(n)}
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
            ${l.map(p=>fr(p)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function vr(e){return`
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
  `}function fr(e){return`
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
      <td class="numeric">${ur.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function br(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},i=e.map(c=>{const u=c.capacity>0?Math.round(c.currentVolume/c.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${c.tankNo}</strong></td>
          <td class="numeric">${c.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${c.currentVolume>0?c.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${u}%"></div>
            </div>
            <span class="progress-label">${u}%</span>
          </td>
          <td>${c.productName||"―"}</td>
          <td class="mono">${c.jikomiNo||"―"}</td>
          <td>
            <span class="status-pill ${n[c.status]}">${t[c.status]}</span>
          </td>
          <td>${c.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${c.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),r=e.filter(c=>c.status==="in_use").length,l=e.filter(c=>c.status==="aging").length,d=e.filter(c=>c.status==="empty").length,a=e.reduce((c,u)=>c+u.capacity,0),o=e.reduce((c,u)=>c+u.currentVolume,0);return`
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
        <p class="kpi-sub">使用率 ${a>0?Math.round(o/a*100):0}%</p>
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
          <tbody>${i||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ht(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function gr(e,t,n){const i=e.rows.map((c,u)=>`
      <tr>
        <td class="mono">${c.taxCategory}</td>
        <td>${c.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${u}" data-tax-field="alcoholDegree" value="${c.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="productionVolume" value="${c.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="previousBalance" value="${c.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="exportDeduction" value="${c.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="sampleDeduction" value="${c.sampleDeduction}" />
        </td>
        <td class="numeric">${c.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${c.taxRate}</td>
        <td class="numeric"><strong>${ht(c.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),r=e.deductions.map((c,u)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="type">
            ${Object.keys(gt).map(p=>`<option value="${p}" ${p===c.type?"selected":""}>${gt[p]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="categoryCode">
            ${es.map(p=>`<option value="${p.code}" ${p.code===c.categoryCode?"selected":""}>${p.code}:${p.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${u}" data-ded-field="volume" value="${c.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${u}" data-ded-field="reason" value="${c.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${u}" data-ded-field="documentNo" value="${c.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),l=Array.from({length:12},(c,u)=>u+1),d=e.rows.reduce((c,u)=>c+u.exportDeduction+u.sampleDeduction,0),a=e.rows.reduce((c,u)=>c+u.productionVolume,0),o=a>0?d/a*100:0;return`
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
            ${[2025,2026,2027].map(c=>`<option value="${c}" ${t===c?"selected":""}>${c}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${l.map(c=>`<option value="${c}" ${n===c?"selected":""}>${c}月</option>`).join("")}
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
        <p class="kpi-value">${ht(e.totalTax)}</p>
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
      <article class="panel kpi-card ${o>3?"kpi-alert":""}">
        <p class="panel-title">控除率</p>
        <p class="kpi-value">${o.toFixed(1)}%</p>
        <p class="kpi-sub">${o>3?"⚠ 見本/試験3%上限注意":"上限内"}</p>
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
              <th class="numeric">${ht(e.totalTax)}</th>
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
  `}const $r={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let ce=null,_r=0;const xt=[];function wr(){return ce&&document.body.contains(ce)||(ce=document.createElement("div"),ce.className="toast-container",document.body.appendChild(ce)),ce}function P(e,t="success",n){const i=wr(),r=++_r,l=t==="error"?5e3:t==="warning"?4e3:3e3,d=document.createElement("div");d.className=`toast toast-${t}`,d.setAttribute("role","status"),d.setAttribute("aria-live","polite"),d.innerHTML=`
    <span class="toast-icon">${$r[t]}</span>
    <span class="toast-msg">${Sr(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const a={id:r,message:e,type:t,el:d};xt.push(a),i.appendChild(d),requestAnimationFrame(()=>{d.classList.add("toast-enter")});const o=()=>kr(a);d.querySelector(".toast-dismiss").addEventListener("click",o),setTimeout(()=>{d.classList.add("toast-exit"),d.addEventListener("animationend",o,{once:!0})},l)}function kr(e){const t=xt.indexOf(e);t!==-1&&(xt.splice(t,1),e.el.remove())}function Sr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function se(e,t={}){const{title:n="確認",confirmLabel:i="OK",cancelLabel:r="キャンセル",variant:l="primary"}=t;return new Promise(d=>{const a=document.createElement("div");a.className="modal-backdrop confirm-backdrop",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${l}">
            ${l==="danger"?xr:Pr}
          </div>
          <h3 class="confirm-title">${Ye(n)}</h3>
          <p class="confirm-message">${Ye(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${Ye(r)}</button>
          <button class="button ${l} confirm-ok">${Ye(i)}</button>
        </div>
      </div>
    `;const o=u=>{a.classList.add("confirm-exit"),a.addEventListener("animationend",()=>{a.remove()},{once:!0}),d(u)};a.querySelector(".confirm-cancel").addEventListener("click",()=>o(!1)),a.querySelector(".confirm-ok").addEventListener("click",()=>o(!0)),a.addEventListener("click",u=>{u.target===a&&o(!1)});const c=u=>{u.key==="Escape"&&(document.removeEventListener("keydown",c),o(!1))};document.addEventListener("keydown",c),document.body.appendChild(a),requestAnimationFrame(()=>{a.querySelector(".confirm-ok")?.focus()})})}const xr=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,Pr=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function Ye(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ga(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Ar(e,t,n){if(t.length===0&&(!n||n.length===0))return;const i=n&&n.length>0?n:Object.keys(t[0]??{}).map(c=>({key:c,label:c})),l=`\uFEFF${[i.map(c=>ga(c.label)).join(","),...t.map(c=>i.map(u=>ga(c[u.key])).join(","))].join(`\r
`)}`,d=new Blob([l],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(d),o=document.createElement("a");o.href=a,o.download=e,document.body.append(o),o.click(),o.remove(),window.setTimeout(()=>URL.revokeObjectURL(a),0)}const Dr=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar"];let be=[];async function Er(){const{supabaseQueryAll:e}=await _(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>R);return{supabaseQueryAll:n}},void 0);be=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const $a=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"}];function Ss(e){const t=Ct[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function jt(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Cr(){const e=Ss("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const it=new Date,Lr=it.toISOString().slice(0,7),Ir=it.getFullYear(),Tr=it.getMonth()+1,qr=it.toISOString().slice(0,10),Nr="C0011",de=Cr();function xs(e){const t="/sake-system/".endsWith("/")?"/sake-system/".slice(0,-1):"/sake-system/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return Dr.includes(n)?n:"/"}function Ft(e){switch(e){case"/invoice-entry":case"/quote":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const _a=xs(location.pathname),s={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:jt(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Lr,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Ir,taxMonth:Tr,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],callLogs:[],mapFilters:{showCustomers:!0,showProspects:!0,showDelivery:!0,filterRegion:"",filterBusinessType:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...Pl,overlayImageUrl:`${"/sake-system/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...Al},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:qr,route:_a,currentCategory:Ft(_a),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:Nr,salesPeriod:"month",customRange:{start:"",end:""},quoteState:(()=>{const e={...hs};try{const t=localStorage.getItem("quote-seal");t&&(e.sealSettings=JSON.parse(t))}catch{}return e})(),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],customerEfficiency:[],masterTab:"customers",masterFilter:{...Mt},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,emailAudienceMode:de.mode,emailRegion:de.region,emailHistorySegment:de.historySegment,emailTemplateId:de.templateId,emailSubject:de.subject,emailBody:de.body,emailSaveMessage:de.saveMessage,emailSending:!1,demandForecast:{...Ei},shipmentCalendarData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,globalSearchOpen:!1,globalQuery:"",authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function wa(e){return e.slice(0,10)}function Rr(e){return{...e}}function Ze(){s.pickerMode=null,s.pickerQuery="",s.pickerTargetLine=null}function Ps(){s.invoiceForm=jt(),s.invoiceSavedDocNo=null,s.invoicePriceGroup="",s.invoiceErrors={},Ze()}function As(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,i)=>{n.productCode.trim()||(t[`lines.${i}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${i}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${i}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${i}.unitPrice`]="単価は0円以上で入力してください。")}),t}function Or(e){const t=s.invoiceForm.lines[e];t&&s.invoiceForm.lines.splice(e+1,0,Rr(t))}function Mr(){const e=s.invoiceRecords[0],t=s.masterStats?.customers[0],n=s.masterStats?.products.slice(0,2)??[];s.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:s.invoiceForm.staffCode||"S001",lines:n.map((i,r)=>{const l=r===0?1:2,d=1200*(r+1);return{productCode:i.code,productName:i.name,quantity:l,unitPrice:d,unit:"本",amount:l*d}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},s.invoiceSavedDocNo=null,s.invoiceErrors={}}function jr(e){const t=s.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,s.invoicePriceGroup=t.priceGroup||"",!0):!1}function Fr(e){const t=s.masterStats?.customers.find(n=>n.name===e.trim());return t?(s.invoiceForm.customerCode=t.code,s.invoiceForm.customerName=t.name,s.invoicePriceGroup=t.priceGroup||"",!0):!1}function Ds(e){if(ae(e),s.invoiceErrors=As(s.invoiceForm),Object.keys(s.invoiceErrors).length>0){v();return}s.invoiceSaving=!0,v(),Ra(s.invoiceForm).then(t=>{s.invoiceSavedDocNo=t.documentNo,s.invoiceSaving=!1,s.invoiceErrors={},s.invoiceForm=jt(),v()}).catch(()=>{s.invoiceSaving=!1,v()})}function Es(e){const t=s.salesFilter.startDate?new Date(s.salesFilter.startDate):null,n=s.salesFilter.endDate?new Date(`${s.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((i,r)=>new Date(r.date).getTime()-new Date(i.date).getTime()).filter(i=>{const r=new Date(i.date);return!(t&&r<t||n&&r>n)})}function Cs(){switch(s.emailAudienceMode){case"area":return s.emailRegion==="all"?be:be.filter(e=>e.area===s.emailRegion);case"history":return be.filter(e=>e.historySegment===s.emailHistorySegment);default:return be}}function Br(){const e=Cs();return{audienceMode:s.emailAudienceMode,region:s.emailRegion,historySegment:s.emailHistorySegment,selectedTemplateId:s.emailTemplateId,subject:s.emailSubject,body:s.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:s.emailSaveMessage,sending:s.emailSending,senderId:s.emailSenderId,senders:s.mailSenders}}function vt(e){const t=Cs(),n=s.emailAudienceMode==="area"?s.emailRegion:s.emailAudienceMode==="history"?s.emailHistorySegment:"all";return{subject:s.emailSubject.trim(),body:s.emailBody.trim(),templateId:s.emailTemplateId,audienceMode:s.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(i=>i.email),status:e}}function Bt(){return s.user,!1}function Ie(){s.globalSearchOpen=!1,s.globalQuery=""}function zr(){const e=s.globalQuery.trim().toLowerCase();return e?{customers:s.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:s.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:s.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:$a.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:$a}}function Vr(){let e=[],t,n="export.csv";switch(s.route){case"/sales":e=(s.salesSummary?Es(s.salesSummary):[]).map(i=>({documentNo:i.documentNo,date:i.date,customerCode:i.customerCode,customerName:i.customerName,amount:i.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...s.paymentStatus?.records??[]].sort((i,r)=>r.balanceAmount-i.balanceAmount).map(i=>({...i})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=s.invoiceRecords.map(i=>({...i})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=s.purchaseList.map(i=>({...i})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=s.jikomiList.map(i=>({...i})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=s.tankList.map(i=>({...i})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=s.kenteiList.map(i=>({...i})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=s.materialList.map(i=>({...i})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":s.masterTab==="customers"?(e=s.masterStats?.customers.map(i=>({...i}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=s.masterStats?.products.map(i=>({...i}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Ar(n,e,t)}function ka(e){const t=`${"/sake-system/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),s.route=e,s.currentCategory=Ft(e),s.sidebarOpen=!1,Ie(),zt(e)}async function zt(e){s.actionLoading=!0,v();try{switch(e){case"/delivery":s.deliveryNote||(s.deliveryNote=await It(s.deliverySearchDocNo||"D240122"));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await _(async()=>{const{fetchShipmentCalendar:n}=await Promise.resolve().then(()=>x);return{fetchShipmentCalendar:n}},void 0);s.shipmentCalendarData=await t(s.shipmentCalendarYearMonth);break}case"/billing":s.billingSummary||(s.billingSummary=await Tt(s.billingYearMonth));break;case"/report":s.salesReport||(s.salesReport=await at());break;case"/product-power":s.productPower.length===0&&(s.productPower=await Va());break;case"/customer-efficiency":s.customerEfficiency.length===0&&(s.customerEfficiency=await Ja());break;case"/customer-analysis":s.customerAnalysis||(s.customerAnalysis=await Ya());break;case"/demand-forecast":if(s.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await _(async()=>{const{fetchDemandForecasts:l,fetchDeliverySchedule:d}=await Promise.resolve().then(()=>x);return{fetchDemandForecasts:l,fetchDeliverySchedule:d}},void 0),[i,r]=await Promise.all([t(),n()]);s.demandForecast.forecasts=i.map(l=>({code:l.productCode,name:l.productName,segment:l.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(l.avgMonthly),adjustedAvg:Math.round(l.avgMonthly),nextMonthForecast:Math.round(l.forecastQuantity),annualForecast:Math.round(l.avgMonthly*12),safetyStock:Math.round(l.safetyStock)})),s.demandForecast.deliveries=Ci(r)}break;case"/churn-alert":if(!s.churnAlert){const{fetchChurnAlerts:t}=await _(async()=>{const{fetchChurnAlerts:i}=await Promise.resolve().then(()=>x);return{fetchChurnAlerts:i}},void 0),n=await t();if(n.length>0){const i=n.filter(l=>l.is_dormant).map(l=>({code:l.customer_code,name:l.customer_name,businessType:l.business_type,areaCode:l.area_code,phone:l.phone,lastOrderDate:l.last_order_date,daysSinceLastOrder:l.days_since_order,totalAmountLast12m:l.amount_12m,status:"dormant"})),r=n.filter(l=>l.is_at_risk).map(l=>({code:l.customer_code,name:l.customer_name,businessType:l.business_type,areaCode:l.area_code,phone:l.phone,lastOrderDate:l.last_order_date,daysSinceLastOrder:l.days_since_order,totalAmountLast12m:l.amount_12m,status:"at-risk"}));s.churnAlert={dormantCustomers:i,atRiskCustomers:r}}else{const{supabaseQueryAll:i}=await _(async()=>{const{supabaseQueryAll:d}=await Promise.resolve().then(()=>R);return{supabaseQueryAll:d}},void 0),[r,l]=await Promise.all([i("sales_document_headers",{select:"sales_date,legacy_customer_code,customer_name,total_amount"}),s.masterStats?Promise.resolve(s.masterStats.customers):He().then(d=>d.customers)]);s.churnAlert=Kl(r.map(d=>({sales_date:d.sales_date||"",legacy_customer_code:d.legacy_customer_code||"",customer_name:d.customer_name||"",total_amount:Number(d.total_amount)||0})),(s.masterStats?.customers??l).map(d=>({code:d.code,name:d.name,businessType:d.businessType,areaCode:d.areaCode,phone:d.phone})))}}break;case"/seasonal-calendar":if(!s.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await _(async()=>{const{fetchProductShipmentsFromTable:i}=await Promise.resolve().then(()=>x);return{fetchProductShipmentsFromTable:i}},void 0),n=await t();if(n.length>0)s.seasonalCalendar=va(n.map(i=>({code:i.code,name:i.name,category:"",monthlyQuantity:i.monthlyQuantity})));else{const{fetchProductMonthlyShipments:i}=await _(async()=>{const{fetchProductMonthlyShipments:l}=await Promise.resolve().then(()=>x);return{fetchProductMonthlyShipments:l}},void 0),r=await i();s.seasonalCalendar=va(r.map(l=>({code:l.code,name:l.name,category:"",monthlyQuantity:l.monthlyQuantity})))}}break;case"/visit-planner":if(!s.visitPlanner){const{fetchVisitPriorities:t}=await _(async()=>{const{fetchVisitPriorities:i}=await Promise.resolve().then(()=>x);return{fetchVisitPriorities:i}},void 0),n=await t();if(n.length>0)s.visitPlanner={candidates:n.map(i=>({code:i.customer_code,name:i.customer_name,phone:i.phone,address:i.address,areaCode:i.area_code,businessType:i.business_type,priorityScore:i.priority_score,reasons:i.reasons,lastOrderDate:i.last_order_date,daysSinceOrder:i.days_since_order,annualRevenue:i.annual_revenue,recommendedAction:i.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},s.visitPlanner=ba(n.map(i=>({code:i.customer_code,name:i.customer_name,phone:i.phone,address1:i.address,areaCode:i.area_code,businessType:i.business_type,annualRevenue:i.annual_revenue,lastOrderDate:i.last_order_date,hasSeasonalProposal:i.reasons.some(r=>r.includes("季節"))})));else{const{supabaseQueryAll:i}=await _(async()=>{const{supabaseQueryAll:o}=await Promise.resolve().then(()=>R);return{supabaseQueryAll:o}},void 0),[r,l]=await Promise.all([i("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),s.masterStats?Promise.resolve(s.masterStats.customers):He().then(o=>o.customers)]),d=s.masterStats?.customers??l,a=new Map;r.forEach(o=>{const c=o.legacy_customer_code||"",u=o.sales_date||"",p=Number(o.total_amount)||0,y=a.get(c);!y||u>y.lastDate?a.set(c,{lastDate:u,total:(y?.total??0)+p}):y.total+=p}),s.visitPlanner=ba(d.filter(o=>o.isActive).map(o=>({code:o.code,name:o.name,phone:o.phone,address1:o.address1,areaCode:o.areaCode,businessType:o.businessType,annualRevenue:a.get(o.code)?.total??0,lastOrderDate:a.get(o.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:n,fetchProductionPlan:i}=await _(async()=>{const{fetchDemandAnalysis:r,fetchSafetyStockParams:l,fetchProductionPlan:d}=await Promise.resolve().then(()=>x);return{fetchDemandAnalysis:r,fetchSafetyStockParams:l,fetchProductionPlan:d}},void 0);if(!s.demandAnalysis){const[r,l]=await Promise.all([t(s.demandYearsBack*12),n()]);s.demandAnalysis=r,s.safetyStockParams=l}if(s.productionPlan.length===0){const r=await i(s.demandPlanYearMonth);if(r.length>0)s.productionPlan=r;else if(s.demandAnalysis&&s.safetyStockParams.length>0){const l=s.demandPlanYearMonth,d=s.demandAnalysis.months.filter(a=>a<l).slice(-3);s.productionPlan=s.safetyStockParams.filter(a=>(s.demandAnalysis.productAvg[a.productCode]??0)>=10).map(a=>{const o=d.map(p=>s.demandAnalysis.matrix[a.productCode]?.[p]??0),c=o.length>0?Math.ceil(o.reduce((p,y)=>p+y,0)/o.length):Math.ceil(a.avgMonthlyDemand),u=Math.ceil(a.safetyStockQty);return{id:"",yearMonth:l,productCode:a.productCode,productName:a.productName,demandForecast:c,safetyStockTarget:u,openingStock:0,requiredProduction:Math.max(0,c+u),plannedQty:Math.max(0,c+u),actualQty:0,status:"draft",productionType:"monthly",notes:""}})}}break}case"/jikomi":s.jikomiList.length===0&&(s.jikomiList=await Qa());break;case"/tanks":s.tankList.length===0&&(s.tankList=await Ha());break;case"/kentei":s.kenteiList.length===0&&(s.kenteiList=await Ga());break;case"/materials":s.materialList.length===0&&(s.materialList=await bt());break;case"/purchase":(s.purchaseList.length===0||s.payableList.length===0)&&([s.purchaseList,s.payableList]=await Promise.all([Xa(),Ka()]));break;case"/raw-material":(s.billList.length===0||s.rawStockList.length===0)&&([s.billList,s.rawStockList]=await Promise.all([Wa(),Za()]));break;case"/tax":s.taxDeclaration||(s.taxDeclaration=await qt(s.taxYear,s.taxMonth));break;case"/store":(s.storeSales.length===0||s.storeOrders.length===0)&&([s.storeSales,s.storeOrders]=await Promise.all([Nt(s.storeSalesDate),as()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await _(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>x);return{fetchMailSenders:n}},void 0);if(s.mailSenders=await t(),!s.emailSenderId||!s.mailSenders.find(n=>n.id===s.emailSenderId)){const n=s.mailSenders.find(i=>i.isDefault)??s.mailSenders[0];n&&(s.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await _(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>x);return{fetchCalendarEvents:n}},void 0);s.calendarEvents=await t(s.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await _(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>x);return{fetchIntegrationSettings:n}},void 0);s.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await _(async()=>{const{fetchShopifyOrders:i,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>x);return{fetchShopifyOrders:i,fetchIntegrationSettings:r}},void 0);s.shopifyOrders=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await _(async()=>{const{fetchFaxInbox:i,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>x);return{fetchFaxInbox:i,fetchIntegrationSettings:r}},void 0);s.faxRecords=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/users":{const{fetchUserProfiles:t}=await _(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>x);return{fetchUserProfiles:n}},void 0);s.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:i}=await _(async()=>{const{fetchMyProfile:l,fetchAuditLogs:d,fetchMailSenders:a}=await Promise.resolve().then(()=>x);return{fetchMyProfile:l,fetchAuditLogs:d,fetchMailSenders:a}},void 0),r=s.user?.email??s.myProfile?.email??"";r&&(s.myProfile=await t(r)),s.mailSenders.length===0&&(s.mailSenders=await i()),s.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await _(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>x);return{fetchAuditLogs:n}},void 0);s.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await _(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>x);return{fetchProspects:n}},void 0);s.prospects=await t()}break;case"/map":{const{fetchProspects:t,fetchDeliveryLocations:n,fetchIntegrationSettings:i}=await _(async()=>{const{fetchProspects:r,fetchDeliveryLocations:l,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>x);return{fetchProspects:r,fetchDeliveryLocations:l,fetchIntegrationSettings:d}},void 0);s.prospects=await t(),s.deliveryLocations=await n(),s.integrations.length===0&&(s.integrations=await i())}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await _(async()=>{const{fetchCallLogs:i,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>x);return{fetchCallLogs:i,fetchIntegrationSettings:r}},void 0);s.callLogs=await t(100),s.integrations.length===0&&(s.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await _(async()=>{const{fetchLeadLists:i,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>x);return{fetchLeadLists:i,fetchIntegrationSettings:r}},void 0);s.leadLists=await t(),s.integrations.length===0&&(s.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await _(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>x);return{fetchWorkflowOrdersFromDb:n}},void 0);s.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await _(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>x);return{fetchTourInquiriesFromDb:n}},void 0);s.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:i}=await _(async()=>{const{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>x);return{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:d}},void 0);s.slackRules=await t(),s.slackLogs=await n(50),s.integrations.length===0&&(s.integrations=await i())}break;case"/":{const{fetchProspects:t,fetchCalendarEvents:n,fetchWorkflowOrdersFromDb:i,fetchTourInquiriesFromDb:r}=await _(async()=>{const{fetchProspects:l,fetchCalendarEvents:d,fetchWorkflowOrdersFromDb:a,fetchTourInquiriesFromDb:o}=await Promise.resolve().then(()=>x);return{fetchProspects:l,fetchCalendarEvents:d,fetchWorkflowOrdersFromDb:a,fetchTourInquiriesFromDb:o}},void 0);s.prospects.length===0&&(s.prospects=await t()),s.calendarEvents.length===0&&(s.calendarEvents=await n(s.calendarYearMonth)),s.materialList.length===0&&(s.materialList=await bt()),s.workflowOrders.length===0&&(s.workflowOrders=await i()),s.tourInquiries.length===0&&(s.tourInquiries=await r())}break;default:break}}catch(t){console.warn("Route data load error",t)}finally{s.actionLoading=!1,v()}}function Sa(){if(Bt())return vo(s.authError,s.authSubmitting);if(s.loading)return`
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
    `;switch(s.route){case"/cat/sales":return Ne("sales");case"/cat/brewery":return Ne("brewery");case"/cat/purchase":return Ne("purchase");case"/cat/more":return Ne("more");case"/invoice-entry":return Hi(s.invoiceForm,s.invoiceSavedDocNo,s.invoiceSaving,s.invoiceErrors);case"/quote":return Wi(s.quoteState,s.masterStats?.customers??[],s.masterStats?.products??[],s.quoteCustomerQuery,s.quoteProductQuery,s.quotePricing);case"/email":return Ji(Br());case"/delivery":return s.deliveryNote?zi(s.deliveryNote,s.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return cr(s.shipmentCalendarData,s.shipmentCalendarYearMonth,s.shipmentCalendarSelectedDate);case"/billing":return s.billingSummary?wi(s.billingSummary,s.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return s.salesReport?Yo(s.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return so(s.productPower,s.productFilter,s.productDaily,s.productPeriod,s.productCustomStart,s.productCustomEnd,s.productSortState);case"/customer-efficiency":return no(s.customerEfficiency,s.customerSortState);case"/customer-analysis":return s.customerAnalysis?jo(s.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":case"/customer-efficiency":return'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return qi(s.demandForecast);case"/demand":return Ql(s.demandAnalysis,s.safetyStockParams,s.productionPlan,s.demandTab,s.demandPlanYearMonth,s.demandYearsBack);case"/churn-alert":return s.churnAlert?Wl(s.churnAlert):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return s.seasonalCalendar?sr(s.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return s.visitPlanner?hr(s.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/jikomi":return s.jikomiView==="calendar"?`${sa(s.jikomiList,s.jikomiView)}${mo(s.jikomiList)}`:sa(s.jikomiList,s.jikomiView);case"/tanks":return br(s.tankList);case"/kentei":return yo(s.kenteiList);case"/materials":return Po(s.materialList)+xo(s.materialEditing,s.materialEditingIsNew);case"/purchase":return Lo(s.purchaseList,s.payableList);case"/raw-material":return Io(s.billList,s.rawStockList);case"/tax":return s.taxDeclaration?gr(s.taxDeclaration,s.taxYear,s.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return Go(s.storeSales,s.storeOrders,s.storeTab,s.storeSalesDate);case"/setup":return s.pipelineMeta?No(s.pipelineMeta,G,V,s.syncDashboard):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return jl(s.rawSelectedTable,s.rawRecords,s.rawTableList,s.rawPage,s.rawTotalCount);case"/import":return Ko(s.importEntity,s.importPreview,s.importing,s.importResult);case"/print":return Ll(s.printTemplate,s.printOptions,s.printCompany,s.printData);case"/form-designer":return Zo(s.printData,s.printCompany,s.printOptions,s.fdSavedPositions,s.fdDesignMode);case"/map":{const e=(s.masterStats?.customers??[]).slice(0,200).map((i,r)=>{const l=i;return{...i,lat:l.lat??35.37+r%12*.05+(Math.random()-.5)*.02,lng:l.lng??139.29+Math.floor(r/12)*.05+(Math.random()-.5)*.02,address1:l.address1??"",businessType:l.businessType??"",lastOrderAmount:0}}),n=!!s.integrations.find(i=>i.provider==="google_maps")?.config.api_key;return el(e,s.prospects,s.deliveryLocations,s.mapFilters,n)}case"/workflow":return sl(s.workflowOrders);case"/mobile-order":return nl(s.mobileOrder,s.masterStats?.customers??[],s.masterStats?.products??[]);case"/tour":return ol(s.tourInquiries,s.tourActiveId);case"/mail-senders":return cl(s.mailSenders,s.mailSenderEditingId);case"/calendar":return dl(s.calendarEvents,s.calendarYearMonth,s.calendarFilterCategory,s.calendarEdit);case"/integrations":return pl(s.integrations,s.integrationEditingId);case"/shopify":{const e=s.integrations.find(t=>t.id==="shopify");return ml(s.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return yl(s.faxRecords,s.faxProcessing,s.faxOcrText);case"/users":return hl(s.userProfiles,s.userEditingId,s.myProfile);case"/profile":return vl(s.myProfile,s.auditLogs.filter(e=>e.userEmail===s.myProfile?.email),s.mailSenders);case"/audit":return fl(s.auditLogs);case"/prospects":{const e={prospects:s.prospects,activities:s.prospectActivities,editingId:s.prospectEditingId,viewMode:s.prospectViewMode};return bl(e)}case"/slack":{const e=s.integrations.find(t=>t.provider==="slack")??null;return wl(e,s.slackRules,s.slackLogs)}case"/calls":{const e=s.integrations.find(t=>t.provider==="ivry");return kl(s.callLogs,s.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:s.leadLists,activeListId:s.leadActiveListId,items:s.leadItems,searchQuery:s.leadSearchQuery,searchArea:s.leadSearchArea,searchBusinessType:s.leadSearchType,searching:s.leadSearching,searchResults:s.leadSearchResults};return xl(e)}}if(!s.salesSummary||!s.paymentStatus||!s.masterStats||!s.pipelineMeta||!s.customerLedger||!s.salesAnalytics)return"";switch(s.route){case"/sales":return Ho(Es(s.salesSummary),s.salesFilter.startDate,s.salesFilter.endDate);case"/payment":return Eo([...s.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return So(s.masterStats,s.masterTab,s.masterFilter,s.masterSortState);case"/invoice":return lo(s.invoiceRecords,s.invoiceFilter);case"/ledger":return Ai(s.customerLedger,s.ledgerCustomerCode);case"/analytics":return Jo(s.salesAnalytics,s.analyticsTab,s.analyticsPeriod,s.analyticsPeriodFilter,s.analyticsPeriodRows,s.analyticsPeriodOptions,s.analyticsStaffFilter,s.analyticsTagFilter,s.analyticsStaffDrilldown,s.analyticsStaffPeriod,s.analyticsStaffPeriodFilter,s.analyticsStaffPeriodOptions,s.analyticsStaffTotals);default:return ji(s.salesSummary,s.pipelineMeta,s.salesAnalytics,{prospects:s.prospects,upcomingEvents:s.calendarEvents,tourInquiries:s.tourInquiries,workflowOrdersCount:{new:s.workflowOrders.filter(e=>e.stage==="new").length,picking:s.workflowOrders.filter(e=>e.stage==="picking").length,packed:s.workflowOrders.filter(e=>e.stage==="packed").length,shipped:s.workflowOrders.filter(e=>e.stage==="shipped").length,total:s.workflowOrders.length},lowStockCount:s.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:s.masterStats?{customers:s.masterStats.summary.customerCount,products:s.masterStats.summary.productCount,suppliers:s.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:s.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0},s.salesPeriod,s.customRange,s.dashboardSortState)}}function Jr(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=s.announcements.filter(r=>!s.dismissedAnnouncements.has(r.id)).map(r=>{const l=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${l.bg};border-bottom:2px solid ${l.border};">
        <span class="announcement-text">${l.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),i=s.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+i}function Yr(){if(Bt())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${Sa()}</div>
        </main>
      </div>
    `;const e={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売業務",items:[{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/quote",label:"見積作成",kicker:"Quote"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/shipment-calendar",label:"出荷カレンダー",kicker:"ShipCal"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],analytics:[{label:"分析",items:[{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/customer-analysis",label:"得意先分析",kicker:"CustABC"},{path:"/product-power",label:"商品力分析",kicker:"Power"},{path:"/customer-efficiency",label:"営業効率",kicker:"Efficiency"},{path:"/report",label:"集計帳票",kicker:"Report"}]}],crm:[{label:"営業ツール",items:[{path:"/churn-alert",label:"離反アラート",kicker:"Churn"},{path:"/seasonal-calendar",label:"季節提案",kicker:"Season"},{path:"/visit-planner",label:"訪問計画",kicker:"Visit"},{path:"/prospects",label:"新規営業",kicker:"Prospects"},{path:"/map",label:"取引先マップ",kicker:"Map"},{path:"/list-builder",label:"リスト取得",kicker:"ListBuild"},{path:"/calls",label:"通話履歴",kicker:"Calls"},{path:"/email",label:"メール配信",kicker:"Mail"}]},{label:"受注・出荷",items:[{path:"/workflow",label:"受注ワークフロー",kicker:"Workflow"},{path:"/mobile-order",label:"モバイル受注",kicker:"Mobile"},{path:"/shopify",label:"Shopify注文",kicker:"Shopify"},{path:"/fax",label:"FAX OCR",kicker:"FAX"}]}],orders:[{label:"仕入・調達",items:[{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],brewery:[{label:"製造管理",items:[{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"},{path:"/tax",label:"酒税申告",kicker:"Tax"},{path:"/demand",label:"需要・生産計画",kicker:"Demand"}]}],master:[{label:"マスタ・ツール",items:[{path:"/master",label:"マスタ管理",kicker:"Master"},{path:"/calendar",label:"カレンダー",kicker:"Calendar"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/tour",label:"酒蔵見学",kicker:"Tour"},{path:"/print",label:"印刷",kicker:"Print"}]}],settings:[{label:"システム設定",items:[{path:"/setup",label:"連動設定",kicker:"Setup"},{path:"/integrations",label:"外部連携",kicker:"API"},{path:"/slack",label:"Slack通知",kicker:"Slack"},{path:"/import",label:"データ取込",kicker:"Import"},{path:"/raw-browser",label:"データブラウザ",kicker:"RawData"},{path:"/users",label:"ユーザー管理",kicker:"Users"},{path:"/profile",label:"プロフィール",kicker:"Profile"},{path:"/audit",label:"操作ログ",kicker:"Audit"}]}]},t=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/invoice-entry",label:"販売"},{category:"analytics",path:"/analytics",label:"分析"},{category:"crm",path:"/prospects",label:"営業"},{category:"orders",path:"/purchase",label:"仕入"},{category:"brewery",path:"/jikomi",label:"製造"},{category:"master",path:"/master",label:"マスタ"},{category:"settings",path:"/setup",label:"設定"}],n=e[s.currentCategory].map(a=>`
        <div class="nav-group">
          <p class="nav-group-label">${a.label}</p>
          ${a.items.map(o=>`
                <a
                  href="${"/sake-system/".replace(/\/$/,"")}${o.path==="/"?"/":o.path}"
                  class="nav-link ${s.route===o.path?"active":""}"
                  data-link="${o.path}"
                >
                  <div>
                    <div class="nav-kicker">${o.kicker}</div>
                    <div class="nav-label">${o.label}</div>
                  </div>
                </a>
              `).join("")}
        </div>
      `).join(""),i=t.map(a=>`
        <a
          href="${"/sake-system/".replace(/\/$/,"")}${a.path==="/"?"/":a.path}"
          class="category-link ${s.currentCategory===a.category?"active":""}"
          data-link="${a.path}"
        >
          ${a.label}
        </a>
      `).join(""),r=s.pickerMode&&s.masterStats?s.pickerMode==="customer"?Ui(s.masterStats.customers,s.pickerQuery):Co(s.masterStats.products,s.pickerQuery):"",l=s.globalSearchOpen?Yi(s.globalQuery,zr()):"",d=s.user?`
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
          ${d}
        </header>
        ${Jr()}
        <div class="view ${s.actionLoading?"is-busy":""}">${Sa()}</div>
      </main>
      ${r}
      ${l}
    </div>
  `}async function Ur(){s.actionLoading=!0,v();try{const{fetchSalesSummary:e}=await _(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>x);return{fetchSalesSummary:t}},void 0);s.salesSummary=await e()}finally{s.actionLoading=!1,v()}}async function Qr(e){s.actionLoading=!0,v();try{s.invoiceRecords=await Ge(e)}finally{s.actionLoading=!1,v()}}async function Hr(e){s.actionLoading=!0,v();try{s.customerLedger=await Lt(e)}finally{s.actionLoading=!1,v()}}function ae(e){s.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??s.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??s.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??s.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??s.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??s.invoiceForm.staffCode,lines:s.invoiceForm.lines.map((t,n)=>{const i=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:i,unitPrice:r,amount:i*r}}),note:e.querySelector("#inv-note")?.value??s.invoiceForm.note},s.invoiceForm.customerCode=s.invoiceForm.customerCode.trim().toUpperCase(),s.invoiceForm.customerName=s.invoiceForm.customerName.trim()}function ue(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??s.emailAudienceMode;s.emailAudienceMode=t,s.emailRegion=e.querySelector("#email-region")?.value??s.emailRegion,s.emailHistorySegment=e.querySelector("#email-history-segment")?.value??s.emailHistorySegment,s.emailSubject=e.querySelector("#email-subject")?.value??s.emailSubject,s.emailBody=e.querySelector("#email-body")?.value??s.emailBody}function Gr(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{s.globalSearchOpen=!0,v()}),e.querySelectorAll("[data-action='global-search-close']").forEach(a=>{a.addEventListener("click",o=>{a.classList.contains("global-search")&&o.target instanceof HTMLElement&&!o.target.classList.contains("global-search")||(Ie(),v())})}),e.querySelector("#global-search-input")?.addEventListener("input",a=>{s.globalQuery=a.target.value,v()}),e.querySelectorAll("[data-action='global-nav']").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.path;o&&(Ie(),ka(o))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{Vr()}),e.querySelectorAll("[data-jikomi-tab]").forEach(a=>{a.addEventListener("click",()=>{s.jikomiView=a.dataset.jikomiTab,v()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const a=e.querySelector("#auth-email")?.value.trim()??"",o=e.querySelector("#auth-password")?.value??"";s.authSubmitting=!0,s.authError=null,v(),Ms(a,o).then(async c=>{s.user=c,s.authSkipped=!1,s.authSubmitting=!1,s.authError=null;const{fetchMyProfile:u,recordAudit:p}=await _(async()=>{const{fetchMyProfile:y,recordAudit:h}=await Promise.resolve().then(()=>x);return{fetchMyProfile:y,recordAudit:h}},void 0);s.myProfile=await u(c.email),await p({action:"sign_in",userEmail:c.email}),v()}).catch(async c=>{try{const u=await Ut(a,o);s.user=u,s.authSkipped=!1,s.authError=null;const{fetchMyProfile:p}=await _(async()=>{const{fetchMyProfile:y}=await Promise.resolve().then(()=>x);return{fetchMyProfile:y}},void 0);s.myProfile=await p(u.email)}catch{s.authError=c instanceof Error?c.message:"ログインに失敗しました。"}finally{s.authSubmitting=!1,v()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{s.authSkipped=!0,s.authError=null,v()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{js().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{s.sidebarOpen=!0,v()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(a=>{a.addEventListener("click",()=>{s.sidebarOpen=!1,v()})});const t=e.querySelector(".sidebar");if(t&&s.sidebarOpen){let a=0;t.addEventListener("touchstart",o=>{a=o.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",o=>{o.changedTouches[0].clientX-a<-60&&(s.sidebarOpen=!1,v())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.id??"";s.dismissedAnnouncements.add(o),v()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelectorAll("[data-link]").forEach(a=>{a.addEventListener("click",o=>{o.preventDefault(),ka(a.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async a=>{a.preventDefault();const o=e.querySelector("#fr-title")?.value??"",c=e.querySelector("#fr-category")?.value??"feature",u=e.querySelector("#fr-description")?.value??"",p=e.querySelector("#fr-result");if(!o.trim())return;const y=await Ma(o,c,u);if(p&&(p.textContent=y?"送信しました":"送信に失敗しました",p.className=`fr-result ${y?"success":"error"}`),y){const h=e.querySelector("#feature-request-form");h&&h.reset()}}),e.querySelectorAll("[data-period]").forEach(a=>{a.addEventListener("click",()=>{s.salesPeriod=a.dataset.period,v()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const a=e.querySelector("#range-start")?.value??"",o=e.querySelector("#range-end")?.value??"";a&&o&&(s.customRange={start:a,end:o},s.salesPeriod="custom",v())}),e.querySelectorAll("[data-edit-customer]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.editCustomer??"",c=s.masterStats?.customers.find(p=>p.id===o);if(!c)return;const u=document.createElement("div");u.innerHTML=fo(c),document.body.appendChild(u.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async p=>{p.preventDefault();const y=document.getElementById("edit-result"),h=await ja(o,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,manual_override:!0});y&&(y.textContent=h?"保存しました":"保存に失敗",y.className=`fr-result ${h?"success":"error"}`),h&&(document.getElementById("edit-modal")?.remove(),ge())})})}),e.querySelectorAll("[data-edit-product]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.editProduct??"",c=s.masterStats?.products.find(p=>p.id===o);if(!c)return;const u=document.createElement("div");u.innerHTML=bo(c),document.body.appendChild(u.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async p=>{p.preventDefault();const y=document.getElementById("edit-result"),h=await Fa(o,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});y&&(y.textContent=h?"保存しました":"保存に失敗",y.className=`fr-result ${h?"success":"error"}`),h&&(document.getElementById("edit-modal")?.remove(),ge())})})}),e.querySelector("#q-cust-search")?.addEventListener("input",a=>{s.quoteCustomerQuery=a.target.value,v()}),e.querySelector("#q-prod-search")?.addEventListener("input",a=>{s.quoteProductQuery=a.target.value,v()}),e.querySelectorAll("[data-select-customer]").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.selectCustomer??"";s.quoteState.customerCode=o,s.quoteState.customerName=a.dataset.custName??"",s.quoteState.customerAddress=a.dataset.custAddr??"",s.quoteCustomerQuery="",s.quotePricing=await Ba(s.masterStats?.customers??[],o),v()})}),e.querySelectorAll("[data-add-product]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.addProduct??"",c=a.dataset.prodName??"",u=parseInt(a.dataset.prodPrice??"0");s.quoteState.lines.push({productCode:o,productName:c,quantity:1,unit:"本",unitPrice:u,amount:u}),s.quoteProductQuery="",v()})}),e.querySelectorAll(".qty-input").forEach(a=>{a.addEventListener("change",()=>{const o=parseInt(a.dataset.lineIdx??"0"),c=s.quoteState.lines[o];c&&(c.quantity=parseInt(a.value)||0,c.amount=c.quantity*c.unitPrice,v())})}),e.querySelectorAll(".price-input").forEach(a=>{a.addEventListener("change",()=>{const o=parseInt(a.dataset.lineIdx??"0"),c=s.quoteState.lines[o];c&&(c.unitPrice=parseInt(a.value)||0,c.amount=c.quantity*c.unitPrice,v())})}),e.querySelectorAll("[data-remove-line]").forEach(a=>{a.addEventListener("click",()=>{const o=parseInt(a.dataset.removeLine??"0");s.quoteState.lines.splice(o,1),v()})}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{const a=s.quoteState;a.quoteNo=a.quoteNo||`Q${Date.now().toString(36).toUpperCase()}`,a.quoteDate=document.getElementById("q-date")?.value??a.quoteDate,a.validUntil=document.getElementById("q-valid")?.value??"",a.subject=document.getElementById("q-subject")?.value??"",a.remarks=document.getElementById("q-remarks")?.value??"",a.deliveryDate=document.getElementById("q-delivery-date")?.value??a.deliveryDate,a.paymentTerms=document.getElementById("q-payment-terms")?.value??a.paymentTerms,a.deliveryPlace=document.getElementById("q-delivery-place")?.value??a.deliveryPlace,a.fieldConfig.headerNote=document.getElementById("q-header-note")?.value??a.fieldConfig.headerNote,a.fieldConfig.footerNote=document.getElementById("q-footer-note")?.value??a.fieldConfig.footerNote;const o=a.lines.reduce((y,h)=>y+h.amount,0),c=Math.round(o*a.taxRate/100),{supabaseInsert:u}=await _(async()=>{const{supabaseInsert:y}=await Promise.resolve().then(()=>R);return{supabaseInsert:y}},void 0),p=await u("quotes",{quote_no:a.quoteNo,quote_date:a.quoteDate,valid_until:a.validUntil||null,legacy_customer_code:a.customerCode,customer_name:a.customerName,customer_address:a.customerAddress,subject:a.subject,subtotal:o,tax_amount:c,total_amount:o+c,remarks:a.remarks});if(p?.id){for(let y=0;y<a.lines.length;y++){const h=a.lines[y];await u("quote_lines",{quote_id:p.id,line_no:y+1,legacy_product_code:h.productCode,product_name:h.productName,quantity:h.quantity,unit:h.unit,unit_price:h.unitPrice,amount:h.amount})}alert(`見積 ${a.quoteNo} を保存しました`),s.quoteState={...hs},v()}}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{const a=s.quoteState;a.quoteDate=document.getElementById("q-date")?.value??a.quoteDate,a.validUntil=document.getElementById("q-valid")?.value??a.validUntil,a.subject=document.getElementById("q-subject")?.value??a.subject,a.remarks=document.getElementById("q-remarks")?.value??a.remarks,a.quoteNo=document.getElementById("q-no")?.value??a.quoteNo,a.deliveryDate=document.getElementById("q-delivery-date")?.value??a.deliveryDate,a.paymentTerms=document.getElementById("q-payment-terms")?.value??a.paymentTerms,a.deliveryPlace=document.getElementById("q-delivery-place")?.value??a.deliveryPlace,a.fieldConfig.headerNote=document.getElementById("q-header-note")?.value??a.fieldConfig.headerNote,a.fieldConfig.footerNote=document.getElementById("q-footer-note")?.value??a.fieldConfig.footerNote,a.previewMode=!0,v()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{s.quoteState.previewMode=!1,v()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",()=>{const a=s.quoteState;a.previewMode||(a.quoteDate=document.getElementById("q-date")?.value??a.quoteDate,a.validUntil=document.getElementById("q-valid")?.value??a.validUntil,a.subject=document.getElementById("q-subject")?.value??a.subject,a.remarks=document.getElementById("q-remarks")?.value??a.remarks,a.quoteNo=document.getElementById("q-no")?.value??a.quoteNo,a.deliveryDate=document.getElementById("q-delivery-date")?.value??a.deliveryDate,a.paymentTerms=document.getElementById("q-payment-terms")?.value??a.paymentTerms,a.deliveryPlace=document.getElementById("q-delivery-place")?.value??a.deliveryPlace,a.fieldConfig.headerNote=document.getElementById("q-header-note")?.value??a.fieldConfig.headerNote,a.fieldConfig.footerNote=document.getElementById("q-footer-note")?.value??a.fieldConfig.footerNote),Zi(a)}),e.querySelectorAll("[data-field-toggle]").forEach(a=>{a.addEventListener("change",()=>{const o=a.dataset.fieldToggle;o&&typeof s.quoteState.fieldConfig[o]=="boolean"&&(s.quoteState.fieldConfig[o]=a.checked,v())})}),e.querySelector("#q-seal-file")?.addEventListener("change",a=>{const o=a.target.files?.[0];if(!o)return;const c=new FileReader;c.onload=()=>{s.quoteState.sealSettings={imageDataUrl:c.result,size:72},localStorage.setItem("quote-seal",JSON.stringify(s.quoteState.sealSettings)),v()},c.readAsDataURL(o)}),e.querySelector("#q-seal-size")?.addEventListener("input",a=>{const o=parseInt(a.target.value);s.quoteState.sealSettings&&(s.quoteState.sealSettings.size=o,localStorage.setItem("quote-seal",JSON.stringify(s.quoteState.sealSettings)),v())}),e.querySelector("[data-action='remove-seal']")?.addEventListener("click",()=>{s.quoteState.sealSettings=null,localStorage.removeItem("quote-seal"),v()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.month;o&&(s.demandForecast.calendarMonth=o,v())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.segment;s.demandForecast.selectedSegment=o,v()})}),e.querySelectorAll("[data-demand-tab]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.demandTab;o&&(s.demandTab=o,v())})});function n(a){const o=s.demandAnalysis,c=s.safetyStockParams;if(!o||c.length===0)return[];const u=o.months.filter(p=>p<a).slice(-3);return c.filter(p=>(o.productAvg[p.productCode]??0)>=10).map(p=>{const y=u.map(b=>o.matrix[p.productCode]?.[b]??0),h=y.length>0?Math.ceil(y.reduce((b,k)=>b+k,0)/y.length):Math.ceil(p.avgMonthlyDemand),f=Math.ceil(p.safetyStockQty),g=Math.max(0,h+f);return{id:"",yearMonth:a,productCode:p.productCode,productName:p.productName,demandForecast:h,safetyStockTarget:f,openingStock:0,requiredProduction:g,plannedQty:g,actualQty:0,status:"draft",productionType:p.productionType??"monthly",notes:""}})}e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async a=>{const o=parseInt(a.target.value)||3;s.demandYearsBack=o,s.demandAnalysis=null;const{fetchDemandAnalysis:c}=await _(async()=>{const{fetchDemandAnalysis:u}=await Promise.resolve().then(()=>x);return{fetchDemandAnalysis:u}},void 0);s.demandAnalysis=await c(o*12),v()}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const a=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),o=parseInt(document.getElementById("bulk-lead-time")?.value??"30");s.safetyStockParams=s.safetyStockParams.map(c=>{const u=a>=.99?2.33:a>=.97?1.88:a>=.95?1.65:a>=.9?1.28:1.04,p=o/30,y=Math.ceil(u*c.demandStdDev*Math.sqrt(p)),h=Math.ceil(c.avgMonthlyDemand*p+y);return{...c,serviceLevel:a,leadTimeDays:o,safetyStockQty:y,reorderPoint:h}}),v()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(a=>{a.addEventListener("change",()=>{const o=a.dataset.code??"",c=a.value;s.productionPlan=s.productionPlan.map(u=>u.productCode===o?{...u,productionType:c}:u)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async a=>{const o=a.target.value;if(!o)return;s.demandPlanYearMonth=o;const{fetchProductionPlan:c}=await _(async()=>{const{fetchProductionPlan:p}=await Promise.resolve().then(()=>x);return{fetchProductionPlan:p}},void 0),u=await c(o);s.productionPlan=u.length>0?u:n(o),v()}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{s.productionPlan=n(s.demandPlanYearMonth),v()}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(s.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(c=>{const u=c.dataset.code??"",p=s.productionPlan.find(y=>y.productCode===u);p&&(p.plannedQty=parseFloat(c.value)||0)});const{saveProductionPlan:a}=await _(async()=>{const{saveProductionPlan:c}=await Promise.resolve().then(()=>x);return{saveProductionPlan:c}},void 0);await Promise.all(s.productionPlan.map(c=>a(c)));const{fetchProductionPlan:o}=await _(async()=>{const{fetchProductionPlan:c}=await Promise.resolve().then(()=>x);return{fetchProductionPlan:c}},void 0);s.productionPlan=await o(s.demandPlanYearMonth),v()}),e.querySelectorAll("[data-action='select-month']").forEach(a=>{a.addEventListener("click",()=>{const o=parseInt(a.dataset.month??"0");s.seasonalCalendar&&(s.seasonalCalendar.selectedMonth=o,v())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",a=>{s.visitPlanner&&(s.visitPlanner.filterArea=a.target.value,v())}),e.querySelector("#visit-filter-score")?.addEventListener("change",a=>{s.visitPlanner&&(s.visitPlanner.filterMinScore=parseInt(a.target.value)||0,v())}),e.querySelectorAll("[data-sort-col]").forEach(a=>{a.addEventListener("click",o=>{const c=a.dataset.sortCol??"",u=o.shiftKey;s.route==="/product-power"?s.productSortState=Re(s.productSortState,c,u):s.route==="/customer-efficiency"?s.customerSortState=Re(s.customerSortState,c,u):s.route==="/"||s.route==="/sales"?s.dashboardSortState=Re(s.dashboardSortState,c,u):s.route==="/master"&&(s.masterSortState=Re(s.masterSortState,c,u)),v()})}),e.querySelectorAll("[data-product-period]").forEach(a=>{a.addEventListener("click",()=>{s.productPeriod=a.dataset.productPeriod??"year",v()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const a=document.getElementById("pp-range-start")?.value??"",o=document.getElementById("pp-range-end")?.value??"";a&&o&&(s.productCustomStart=a,s.productCustomEnd=o,s.productPeriod="custom",v())}),e.querySelectorAll("[data-product-filter]").forEach(a=>{a.addEventListener("click",()=>{s.productFilter=a.dataset.productFilter??"all",v()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async a=>{const o=a.currentTarget;o.disabled=!0,o.textContent="更新中…",await ge(),o.disabled=!1,o.textContent="↻ 更新",P("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const a=e.querySelector("#sales-start")?.value??"",o=e.querySelector("#sales-end")?.value??"";s.salesFilter={startDate:a,endDate:o},Ur()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const a={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};s.invoiceFilter=a,Qr(a)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const a=e.querySelector("#ledger-customer-code")?.value??"";s.ledgerCustomerCode=a.trim().toUpperCase(),Hr(s.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{s.masterTab=a.dataset.tab,s.masterFilter={...Mt},v()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{s.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},v()}),e.querySelector("#master-search")?.addEventListener("keydown",a=>{a.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.page);o>=1&&(s.masterFilter={...s.masterFilter,page:o},v())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.table;if(!o)return;s.rawSelectedTable=o,s.rawPage=1;const c=await Qe(o,1);s.rawRecords=c.records,s.rawTotalCount=c.total,v()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!s.rawSelectedTable||s.rawPage<=1)return;s.rawPage-=1;const a=await Qe(s.rawSelectedTable,s.rawPage);s.rawRecords=a.records,s.rawTotalCount=a.total,v()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!s.rawSelectedTable)return;s.rawPage+=1;const a=await Qe(s.rawSelectedTable,s.rawPage);s.rawRecords=a.records,s.rawTotalCount=a.total,v()}),e.querySelectorAll("[data-analytics-tab]").forEach(a=>{a.addEventListener("click",async()=>{if(s.analyticsTab=a.dataset.analyticsTab,s.analyticsStaffDrilldown=null,s.analyticsTab!=="staff"){if(s.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:o,fetchAvailablePeriods:c}=await _(async()=>{const{fetchAnalyticsByPeriod:u,fetchAvailablePeriods:p}=await Promise.resolve().then(()=>x);return{fetchAnalyticsByPeriod:u,fetchAvailablePeriods:p}},void 0);s.analyticsPeriodOptions=await c(s.analyticsTab,s.analyticsPeriod),s.analyticsPeriodFilter=s.analyticsPeriodOptions[0]??"",s.analyticsPeriodRows=await o(s.analyticsTab,s.analyticsPeriod,s.analyticsPeriodFilter)}}v()})}),e.querySelectorAll("[data-analytics-period]").forEach(a=>{a.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:o,fetchAvailablePeriods:c}=await _(async()=>{const{fetchAnalyticsByPeriod:p,fetchAvailablePeriods:y}=await Promise.resolve().then(()=>x);return{fetchAnalyticsByPeriod:p,fetchAvailablePeriods:y}},void 0),u=a.dataset.analyticsPeriod;s.analyticsPeriod=u,u==="all"?(s.analyticsPeriodRows=[],s.analyticsPeriodOptions=[],s.analyticsPeriodFilter=""):(s.analyticsPeriodOptions=await c(s.analyticsTab,u),s.analyticsPeriodFilter=s.analyticsPeriodOptions[0]??"",s.analyticsPeriodRows=await o(s.analyticsTab,u,s.analyticsPeriodFilter)),v()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async a=>{const{fetchAnalyticsByPeriod:o}=await _(async()=>{const{fetchAnalyticsByPeriod:c}=await Promise.resolve().then(()=>x);return{fetchAnalyticsByPeriod:c}},void 0);s.analyticsPeriodFilter=a.target.value,s.analyticsPeriodRows=await o(s.analyticsTab,s.analyticsPeriod,s.analyticsPeriodFilter),v()}),e.querySelector("#staff-filter-input")?.addEventListener("input",a=>{s.analyticsStaffFilter=a.target.value,v()}),e.querySelectorAll("[data-staff-drilldown]").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.staffDrilldown??"",c=a.dataset.staffName??"",{fetchStaffCustomerBreakdown:u,fetchStaffProductBreakdown:p,periodToDateRange:y}=await _(async()=>{const{fetchStaffCustomerBreakdown:k,fetchStaffProductBreakdown:w,periodToDateRange:D}=await Promise.resolve().then(()=>x);return{fetchStaffCustomerBreakdown:k,fetchStaffProductBreakdown:w,periodToDateRange:D}},void 0),h=y(s.analyticsStaffPeriod,s.analyticsStaffPeriodFilter),f=s.analyticsStaffDrilldown?.breakdownTab??"customers",[g,b]=await Promise.all([u(o,h?.from,h?.to),p(o,h?.from,h?.to)]);s.analyticsStaffDrilldown={code:o,name:c,breakdownTab:f,customerRows:g,productRows:b},v()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(a=>{a.addEventListener("click",()=>{s.analyticsStaffDrilldown&&(s.analyticsStaffDrilldown={...s.analyticsStaffDrilldown,breakdownTab:a.dataset.staffBreakdownTab},v())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{s.analyticsStaffDrilldown=null,v()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",a=>{s.analyticsTagFilter=a.target.value,v()}),e.querySelectorAll("[data-staff-period]").forEach(a=>{a.addEventListener("click",async()=>{const{fetchAvailablePeriods:o,fetchStaffTotalsByPeriod:c,periodToDateRange:u}=await _(async()=>{const{fetchAvailablePeriods:y,fetchStaffTotalsByPeriod:h,periodToDateRange:f}=await Promise.resolve().then(()=>x);return{fetchAvailablePeriods:y,fetchStaffTotalsByPeriod:h,periodToDateRange:f}},void 0),p=a.dataset.staffPeriod;if(s.analyticsStaffPeriod=p,s.analyticsStaffDrilldown=null,p==="all")s.analyticsStaffPeriodFilter="",s.analyticsStaffPeriodOptions=[],s.analyticsStaffTotals=[];else{s.analyticsStaffPeriodOptions=await o("staff",p),s.analyticsStaffPeriodFilter=s.analyticsStaffPeriodOptions[0]??"";const y=u(p,s.analyticsStaffPeriodFilter);s.analyticsStaffTotals=await c(y?.from,y?.to)}v()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async a=>{const{fetchStaffTotalsByPeriod:o,periodToDateRange:c}=await _(async()=>{const{fetchStaffTotalsByPeriod:p,periodToDateRange:y}=await Promise.resolve().then(()=>x);return{fetchStaffTotalsByPeriod:p,periodToDateRange:y}},void 0);s.analyticsStaffPeriodFilter=a.target.value;const u=c(s.analyticsStaffPeriod,s.analyticsStaffPeriodFilter);s.analyticsStaffTotals=await o(u?.from,u?.to),s.analyticsStaffDrilldown=null,v()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{ae(e),s.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),s.invoiceErrors={},v()}),e.querySelectorAll("[data-action='remove-line']").forEach(a=>{a.addEventListener("click",()=>{ae(e);const o=parseInt(a.dataset.line??"0",10);s.invoiceForm.lines.splice(o,1),s.invoiceErrors=As(s.invoiceForm),v()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(a=>{a.addEventListener("click",()=>{ae(e),Or(parseInt(a.dataset.line??"0",10)),s.invoiceErrors={},v()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Mr(),v()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{ae(e),s.pickerMode="customer",s.pickerTargetLine=null,s.pickerQuery=s.invoiceForm.customerCode||s.invoiceForm.customerName,v()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(a=>{a.addEventListener("click",()=>{ae(e);const o=parseInt(a.dataset.line??"0",10),c=s.invoiceForm.lines[o];s.pickerMode="product",s.pickerTargetLine=o,s.pickerQuery=c?c.productCode||c.productName:"",v()})}),e.querySelectorAll("[data-action='modal-close']").forEach(a=>{a.addEventListener("click",o=>{a.classList.contains("modal-backdrop")&&o.target instanceof HTMLElement&&!o.target.classList.contains("modal-backdrop")||(Ze(),v())})}),e.querySelectorAll("[data-action='picker-select']").forEach(a=>{const o=async()=>{const c=a.dataset.code??"",u=a.dataset.name??"";if(s.pickerMode==="customer"){s.invoiceForm.customerCode=c,s.invoiceForm.customerName=u,delete s.invoiceErrors.customerCode;const p=s.masterStats?.customers.find(y=>y.code===c);s.invoicePriceGroup=p?.priceGroup||"",!s.invoicePriceGroup&&c&&(s.invoicePriceGroup=await $t(c))}else if(s.pickerMode==="product"&&s.pickerTargetLine!==null){const p=s.invoiceForm.lines[s.pickerTargetLine];if(p){p.productCode=c,p.productName=u;const y=await us(s.invoicePriceGroup,c);y>0&&(p.unitPrice=y),p.amount=p.quantity*p.unitPrice,delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productCode`],delete s.invoiceErrors[`lines.${s.pickerTargetLine}.productName`]}}Ze(),v()};a.addEventListener("click",o),a.addEventListener("keydown",c=>{c.key==="Enter"&&o()})}),e.querySelector("#modal-search")?.addEventListener("input",a=>{s.pickerQuery=a.target.value,v()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Ps(),v()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Ds(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{ae(e),jr(s.invoiceForm.customerCode)&&(delete s.invoiceErrors.customerCode,!s.invoicePriceGroup&&s.invoiceForm.customerCode&&(s.invoicePriceGroup=await $t(s.invoiceForm.customerCode)),v())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{ae(e),Fr(s.invoiceForm.customerName)&&(delete s.invoiceErrors.customerCode,v())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(a=>{a.addEventListener("input",()=>{ae(e),s.invoiceSavedDocNo=null;const o=a.dataset.field;(o==="quantity"||o==="unitPrice")&&v()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{ae(e),s.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const a=e.querySelector("#delivery-docno")?.value??"";s.deliverySearchDocNo=a.trim(),s.deliveryNote=null,s.actionLoading=!0,v(),It(s.deliverySearchDocNo||"D240122").then(o=>{s.deliveryNote=o,s.actionLoading=!1,v()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const a=e.querySelector("#billing-month")?.value??s.billingYearMonth;s.billingYearMonth=a,s.billingSummary=null,s.actionLoading=!0,v(),Tt(a).then(o=>{s.billingSummary=o,s.actionLoading=!1,v()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const a=parseInt(e.querySelector("#tax-year")?.value??String(s.taxYear),10),o=parseInt(e.querySelector("#tax-month")?.value??String(s.taxMonth),10);s.taxYear=a,s.taxMonth=o,s.taxDeclaration=null,s.actionLoading=!0,v(),qt(a,o).then(c=>{s.taxDeclaration=c,s.actionLoading=!1,v()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxXML:a}=await _(async()=>{const{generateTaxXML:y}=await Promise.resolve().then(()=>x);return{generateTaxXML:y}},void 0),o=a(s.taxDeclaration),c=new Blob([o],{type:"application/xml;charset=utf-8"}),u=URL.createObjectURL(c),p=document.createElement("a");p.href=u,p.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.xml`,p.click(),URL.revokeObjectURL(u)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{generateTaxCSV:a}=await _(async()=>{const{generateTaxCSV:y}=await Promise.resolve().then(()=>x);return{generateTaxCSV:y}},void 0),o=a(s.taxDeclaration),c=new Blob([o],{type:"text/csv;charset=utf-8"}),u=URL.createObjectURL(c),p=document.createElement("a");p.href=u,p.download=`tax-${s.taxYear}-${String(s.taxMonth).padStart(2,"0")}.csv`,p.click(),URL.revokeObjectURL(u)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{saveTaxDeclaration:a}=await _(async()=>{const{saveTaxDeclaration:o}=await Promise.resolve().then(()=>x);return{saveTaxDeclaration:o}},void 0);try{await a(s.taxDeclaration),P("下書き保存しました")}catch(o){P("保存に失敗: "+(o instanceof Error?o.message:String(o)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(a=>{a.addEventListener("change",async()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.taxRow),c=a.dataset.taxField,u=a.type==="number"?Number(a.value)||0:a.value,p=[...s.taxDeclaration.rows];p[o]={...p[o],[c]:u};const{recalculateTaxDeclaration:y}=await _(async()=>{const{recalculateTaxDeclaration:h}=await Promise.resolve().then(()=>x);return{recalculateTaxDeclaration:h}},void 0);s.taxDeclaration=y({...s.taxDeclaration,rows:p}),v()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.dedRow),c=a.dataset.dedField,u=a.type==="number"?Number(a.value)||0:a.value,p=[...s.taxDeclaration.deductions];p[o]={...p[o],[c]:u},s.taxDeclaration={...s.taxDeclaration,deductions:p},v()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(a=>{a.addEventListener("change",()=>{if(!s.taxDeclaration)return;const o=a.dataset.taxField;s.taxDeclaration={...s.taxDeclaration,[o]:a.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const{recalculateTaxDeclaration:a,TAX_RATE_CATEGORIES:o}=await _(async()=>{const{recalculateTaxDeclaration:p,TAX_RATE_CATEGORIES:y}=await Promise.resolve().then(()=>x);return{recalculateTaxDeclaration:p,TAX_RATE_CATEGORIES:y}},void 0),c=o[0],u={taxCategory:c.code,taxCategoryName:c.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:c.taxRatePerLiter,taxAmount:0};s.taxDeclaration=a({...s.taxDeclaration,rows:[...s.taxDeclaration.rows,u]}),v()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(a=>{a.addEventListener("click",async()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.taxRow),{recalculateTaxDeclaration:c}=await _(async()=>{const{recalculateTaxDeclaration:p}=await Promise.resolve().then(()=>x);return{recalculateTaxDeclaration:p}},void 0),u=s.taxDeclaration.rows.filter((p,y)=>y!==o);s.taxDeclaration=c({...s.taxDeclaration,rows:u}),v()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!s.taxDeclaration)return;const a={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};s.taxDeclaration={...s.taxDeclaration,deductions:[...s.taxDeclaration.deductions,a]},v()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(a=>{a.addEventListener("click",()=>{if(!s.taxDeclaration)return;const o=Number(a.dataset.dedRow),c=s.taxDeclaration.deductions.filter((u,p)=>p!==o);s.taxDeclaration={...s.taxDeclaration,deductions:c},v()})}),e.querySelectorAll("[data-store-tab]").forEach(a=>{a.addEventListener("click",()=>{s.storeTab=a.dataset.storeTab,v()})}),e.querySelectorAll("[data-import-entity]").forEach(a=>{a.addEventListener("click",()=>{s.importEntity=a.dataset.importEntity,s.importPreview=null,s.importResult=null,v()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const a=Rl(s.importEntity),o=new Blob([a],{type:"text/csv;charset=utf-8"}),c=URL.createObjectURL(o),u=document.createElement("a");u.href=c,u.download=`template_${s.importEntity}.csv`,u.click(),URL.revokeObjectURL(c)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const o=e.querySelector("#import-file")?.files?.[0];if(!o){P("CSVファイルを選択してください","warning");return}const c=new FileReader;c.onload=()=>{const u=String(c.result??""),{columns:p,rows:y}=ql(u);s.importPreview=Nl(s.importEntity,p,y),s.importResult=null,v()},c.readAsText(o,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{s.importPreview=null,s.importResult=null,v()}),e.querySelectorAll("[data-print-template]").forEach(a=>{a.addEventListener("click",()=>{s.printTemplate=a.dataset.printTemplate,v()})}),e.querySelectorAll("[data-print-field]").forEach(a=>{a.addEventListener("change",()=>{const o=a.dataset.printField;let c=a.value;(o==="taxRate"||o==="previousBalance"||o==="paymentAmount")&&(c=Number(a.value)||0),s.printData={...s.printData,[o]:c},v()})}),e.querySelectorAll("[data-print-opt]").forEach(a=>{const o=()=>{const c=a.dataset.printOpt;let u;a.type==="checkbox"?u=a.checked:c==="copies"?u=Number(a.value)||1:c==="overlayOpacity"||c==="calibrationOffsetX"||c==="calibrationOffsetY"?u=Number(a.value)||0:u=a.value,s.printOptions={...s.printOptions,[c]:u},v()};a.addEventListener("change",o),a.type==="range"&&a.addEventListener("input",o)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(a=>{a.addEventListener("change",()=>{const o=Number(a.dataset.printLine),c=a.dataset.printLfield,u=[...s.printData.lines];let p=a.value;(c==="quantity"||c==="unitPrice")&&(p=Number(a.value)||0),u[o]={...u[o],[c]:p},u[o].amount=(Number(u[o].quantity)||0)*(Number(u[o].unitPrice)||0),s.printData={...s.printData,lines:u},v()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{s.printData={...s.printData,lines:[...s.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},v()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.printLine);s.printData={...s.printData,lines:s.printData.lines.filter((c,u)=>u!==o)},v()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(s.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(s.printCompany)),P("印刷設定を保存しました")}catch(a){P("保存失敗: "+(a instanceof Error?a.message:String(a)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const a=s.printCompany,o=prompt("会社名",a.name);if(o===null)return;const c=prompt("郵便番号",a.postalCode)??a.postalCode,u=prompt("住所",a.address1)??a.address1,p=prompt("TEL",a.tel)??a.tel,y=prompt("FAX",a.fax)??a.fax,h=prompt("適格請求書登録番号 (T+13桁)",a.registrationNo)??a.registrationNo,f=prompt("取引銀行名",a.bankName)??a.bankName,g=prompt("支店名",a.bankBranch)??a.bankBranch,b=prompt("口座番号",a.bankAccountNo)??a.bankAccountNo,k=prompt("口座名義",a.bankAccountHolder)??a.bankAccountHolder;s.printCompany={...a,name:o,postalCode:c,address1:u,tel:p,fax:y,registrationNo:h,bankName:f,bankBranch:g,bankAccountNo:b,bankAccountHolder:k},v()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{s.fdDesignMode=!s.fdDesignMode,v()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const c=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",u=dt(a),{savePrintLayout:p}=await _(async()=>{const{savePrintLayout:h}=await Promise.resolve().then(()=>x);return{savePrintLayout:h}},void 0),y={id:`bp1701_${c.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:c,templateKey:"chain_store",positions:u};try{await p(y)?(P(`クラウド保存成功: ${c}`),s.fdSavedPositions=u,localStorage.setItem("sake_fd_positions",JSON.stringify(u)),v()):(P("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(u)))}catch(h){P("保存エラー: "+(h instanceof Error?h.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const o=dt(a);s.fdSavedPositions=o;try{localStorage.setItem("sake_fd_positions",JSON.stringify(o)),P(`ローカル保存完了: ${Object.keys(o).length}件`)}catch(c){P("保存失敗: "+(c instanceof Error?c.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const a=e.querySelector(".fd-canvas");if(!a)return;const c={templateKey:"chain_store",positions:dt(a),exportedAt:new Date().toISOString()},u=new Blob([JSON.stringify(c,null,2)],{type:"application/json"}),p=URL.createObjectURL(u),y=document.createElement("a");y.href=p,y.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,y.click(),URL.revokeObjectURL(p)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async a=>{const o=a.target.files?.[0];if(o)try{const c=await o.text(),p=JSON.parse(c).positions;if(!p)throw new Error("positions field not found");s.fdSavedPositions=p,localStorage.setItem("sake_fd_positions",JSON.stringify(p)),P(`インポート成功: ${Object.keys(p).length}件`),v()}catch(c){P("インポート失敗: "+(c instanceof Error?c.message:""),"error")}});const i=e.querySelector("#fd-saved-layouts");i&&s.route==="/form-designer"&&s.fdDesignMode&&(async()=>{const{fetchPrintLayouts:a}=await _(async()=>{const{fetchPrintLayouts:c}=await Promise.resolve().then(()=>x);return{fetchPrintLayouts:c}},void 0),o=await a("chain_store");o.length===0?i.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(i.innerHTML=`☁️ クラウド保存済み (${o.length}件):<br/>`+o.map(c=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${c.id}" style="margin:4px 4px 0 0;">${c.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${c.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),i.querySelectorAll("[data-action='fd-load-layout']").forEach(c=>{c.addEventListener("click",()=>{const u=c.dataset.layoutId,p=o.find(y=>y.id===u);p&&(s.fdSavedPositions=p.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(p.positions)),P(`読込完了: ${p.name}`),v())})}),i.querySelectorAll("[data-action='fd-delete-layout']").forEach(c=>{c.addEventListener("click",async()=>{const u=c.dataset.layoutId;if(!u||!await se("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:p}=await _(async()=>{const{deletePrintLayout:h}=await Promise.resolve().then(()=>x);return{deletePrintLayout:h}},void 0);await p(u)?(P("削除しました"),v()):P("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await se("フィールド位置を初期値に戻しますか？")&&(s.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),v())});const r=e.querySelector("#fd-sel-x"),l=e.querySelector("#fd-sel-y");[r,l].forEach(a=>{a?.addEventListener("change",()=>{if(!s.fdActiveFieldId)return;const o=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);o&&(r&&(o.style.left=r.value+"mm"),l&&(o.style.top=l.value+"mm"))})});const d=e.querySelector("#customer-map");d&&s.route==="/map"&&Ts(d),e.querySelectorAll(".wf-card").forEach(a=>{a.addEventListener("dragstart",o=>{a.classList.add("wf-dragging"),o.dataTransfer?.setData("text/plain",a.dataset.wfOrder??"")}),a.addEventListener("dragend",()=>a.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(a=>{a.addEventListener("dragover",o=>o.preventDefault()),a.addEventListener("drop",o=>{o.preventDefault();const c=o.dataTransfer?.getData("text/plain"),u=a.dataset.wfStage;if(!c||!u)return;const p=s.workflowOrders.find(y=>y.id===c);p&&(p.stage=u,v())})}),e.querySelectorAll("[data-mo-step]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.moStep;a.disabled||(s.mobileOrder.step=o,v())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",a=>{s.mobileOrder.customerQuery=a.target.value,v()}),e.querySelector("#mo-product-q")?.addEventListener("input",a=>{s.mobileOrder.productQuery=a.target.value,v()}),e.querySelectorAll("[data-mo-select-customer]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.moSelectCustomer,c=s.masterStats?.customers.find(u=>u.id===o);c&&(s.mobileOrder.selectedCustomer=c),v()})}),e.querySelectorAll("[data-mo-add-product]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.moAddProduct,c=s.masterStats?.products.find(p=>p.code===o);if(!c)return;const u=1800;s.mobileOrder.cart.push({productCode:c.code,productName:c.name,quantity:1,unit:"本",unitPrice:u,amount:u}),v()})}),e.querySelectorAll("[data-mo-qty]").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.moQty),c=a.dataset.moProduct,u=s.mobileOrder.cart.find(p=>p.productCode===c);u&&(u.quantity=Math.max(0,u.quantity+o),u.amount=u.quantity*u.unitPrice,u.quantity===0&&(s.mobileOrder.cart=s.mobileOrder.cart.filter(p=>p.productCode!==c)),v())})}),e.querySelectorAll("[data-mo-remove]").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.moRemove);s.mobileOrder.cart.splice(o,1),v()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const a=e.querySelector("#mo-memo");s.mobileOrder.memo=a?.value??"";const o="MO"+Date.now().toString().slice(-8);s.mobileOrder.submittedDocNo=o,s.mobileOrder.step="done",v()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{s.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},v()}),e.querySelectorAll("[data-tour-id]").forEach(a=>{a.addEventListener("click",()=>{s.tourActiveId=a.dataset.tourId??null,v()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(a=>{a.addEventListener("click",()=>{const o=s.tourInquiries.find(h=>h.id===s.tourActiveId);if(!o)return;const c=a.dataset.template==="confirm"?ll:rl,u=e.querySelector("#tour-confirmed-time"),p=c.replaceAll("{name}",o.name).replaceAll("{partySize}",String(o.partySize)).replaceAll("{confirmedTime}",u?.value??o.visitDate),y=e.querySelector("#tour-reply-body");y&&(y.value=p)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const a=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",o=s.tourInquiries.find(u=>u.id===a);if(!o)return;const c=e.querySelector("#tour-confirmed-time");o.status="confirmed",o.repliedAt=new Date().toISOString(),o.confirmedTime=c?.value??"",P("返信メールを下書き保存し、ステータスを確定にしました"),v()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const a=e.querySelector("#lb-type")?.value??"",o=e.querySelector("#lb-area")?.value??"",c=e.querySelector("#lb-keyword")?.value??"";if(!a&&!c){P("業種かキーワードを入力してください","warning");return}s.leadSearchType=a,s.leadSearchArea=o,s.leadSearchQuery=c,s.leadSearching=!0,v();const u=s.integrations.find(f=>f.provider==="google_maps");if(!u||!u.config.api_key){P("Google Maps APIキーが /integrations で未設定です","warning"),s.leadSearching=!1,v();return}const{searchPlaces:p}=await _(async()=>{const{searchPlaces:f}=await Promise.resolve().then(()=>x);return{searchPlaces:f}},void 0),y=[a,c].filter(Boolean).join(" "),h=await p(u,y,o);s.leadSearching=!1,h.error?P("検索失敗: "+h.error,"error"):s.leadSearchResults=h.results,v()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{s.leadSearchResults=[],v()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(s.leadSearchResults.length===0)return;const a=prompt("リスト名を入力:",`${s.leadSearchType} ${s.leadSearchArea}`);if(!a)return;const o=`ll_${Date.now()}`,c={id:o,name:a,query:s.leadSearchQuery,area:s.leadSearchArea,businessType:s.leadSearchType,totalCount:s.leadSearchResults.length,source:"google_places"},{saveLeadList:u,saveLeadItem:p,fetchLeadLists:y,fetchLeadItems:h}=await _(async()=>{const{saveLeadList:b,saveLeadItem:k,fetchLeadLists:w,fetchLeadItems:D}=await Promise.resolve().then(()=>x);return{saveLeadList:b,saveLeadItem:k,fetchLeadLists:w,fetchLeadItems:D}},void 0);await u(c);const f=e.querySelectorAll(".lb-search-check:checked"),g=Array.from(f).map(b=>Number(b.dataset.idx));for(const b of g){const k=s.leadSearchResults[b];k&&await p({...k,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:o,businessType:s.leadSearchType})}s.leadLists=await y(),s.leadActiveListId=o,s.leadItems=await h(o),s.leadSearchResults=[],P(`${g.length}件を「${a}」として保存しました`),v()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??null;if(s.leadActiveListId=o,o){const{fetchLeadItems:c}=await _(async()=>{const{fetchLeadItems:u}=await Promise.resolve().then(()=>x);return{fetchLeadItems:u}},void 0);s.leadItems=await c(o)}v()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??"",c=s.leadItems.find(y=>y.id===o);if(!c)return;const{saveLeadItem:u,fetchLeadItems:p}=await _(async()=>{const{saveLeadItem:y,fetchLeadItems:h}=await Promise.resolve().then(()=>x);return{saveLeadItem:y,fetchLeadItems:h}},void 0);await u({...c,status:"excluded"}),s.leadActiveListId&&(s.leadItems=await p(s.leadActiveListId)),v()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??"",c=s.leadItems.find(h=>h.id===o);if(!c)return;const{convertLeadToProspect:u,fetchLeadItems:p}=await _(async()=>{const{convertLeadToProspect:h,fetchLeadItems:f}=await Promise.resolve().then(()=>x);return{convertLeadToProspect:h,fetchLeadItems:f}},void 0);await u(c)&&(P("見込客に追加しました: "+c.companyName),s.leadActiveListId&&(s.leadItems=await p(s.leadActiveListId)),v())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const a=e.querySelectorAll(".lb-item-check:checked");if(a.length===0&&!await se("全ての新規アイテムを見込客に変換しますか？"))return;const o=a.length>0?Array.from(a).map(y=>y.dataset.id):s.leadItems.filter(y=>y.status==="new").map(y=>y.id),{convertLeadToProspect:c,fetchLeadItems:u}=await _(async()=>{const{convertLeadToProspect:y,fetchLeadItems:h}=await Promise.resolve().then(()=>x);return{convertLeadToProspect:y,fetchLeadItems:h}},void 0);let p=0;for(const y of o){const h=s.leadItems.find(f=>f.id===y);h&&h.status==="new"&&await c(h)&&p++}P(`${p}件を見込客に変換しました`),s.leadActiveListId&&(s.leadItems=await u(s.leadActiveListId)),v()}),e.querySelectorAll("[data-map-filter]").forEach(a=>{a.addEventListener("change",()=>{const o=a.dataset.mapFilter;let c;a.type==="checkbox"?c=a.checked:c=a.value,s.mapFilters={...s.mapFilters,[o]:c},v()})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const a=s.integrations.find(p=>p.provider==="ivry");if(!a||!a.isEnabled){P("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:o,fetchCallLogs:c}=await _(async()=>{const{syncIvryCallLogs:p,fetchCallLogs:y}=await Promise.resolve().then(()=>x);return{syncIvryCallLogs:p,fetchCallLogs:y}},void 0),u=await o(a);u.error?P("同期失敗: "+u.error,"error"):(P(`${u.count}件の通話履歴を同期しました`),s.callLogs=await c(100),v())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const a=s.integrations.find(p=>p.provider==="ivry");if(!a||!a.isEnabled){P("IVRy連携が無効です","warning");return}if(!await se("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:o}=await _(async()=>{const{syncPhoneBookToIvry:p}=await Promise.resolve().then(()=>x);return{syncPhoneBookToIvry:p}},void 0),c=[];s.masterStats?.customers.forEach(p=>{c.push({name:p.name,phone:"",customerCode:p.code,note:"既存取引先"})}),s.prospects.forEach(p=>{p.phone&&c.push({name:p.companyName,phone:p.phone,customerCode:p.id,note:`見込客 (${p.stage})`})});const u=await o(a,c);u.error?P("送信失敗: "+u.error,"error"):P(`${u.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??"",c=a.dataset.phone??"",u=prompt(`電話番号 ${c} を顧客コードに紐付け
顧客コードを入力:`);if(!u)return;const p=s.callLogs.find(f=>f.id===o);if(!p)return;const{saveCallLog:y,fetchCallLogs:h}=await _(async()=>{const{saveCallLog:f,fetchCallLogs:g}=await Promise.resolve().then(()=>x);return{saveCallLog:f,fetchCallLogs:g}},void 0);await y({...p,matchedCustomerCode:u}),s.callLogs=await h(100),v()})}),e.querySelectorAll("[data-action='call-memo']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??"",c=s.callLogs.find(h=>h.id===o);if(!c)return;const u=prompt("メモを入力:",c.notes??"");if(u===null)return;const{saveCallLog:p,fetchCallLogs:y}=await _(async()=>{const{saveCallLog:h,fetchCallLogs:f}=await Promise.resolve().then(()=>x);return{saveCallLog:h,fetchCallLogs:f}},void 0);await p({...c,notes:u}),s.callLogs=await y(100),v()})}),e.querySelectorAll("[data-prospect-view]").forEach(a=>{a.addEventListener("click",()=>{s.prospectViewMode=a.dataset.prospectView,v()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{s.prospectEditingId="__new__",v()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.id??null;if(s.prospectEditingId=o,o){const{fetchProspectActivities:c}=await _(async()=>{const{fetchProspectActivities:u}=await Promise.resolve().then(()=>x);return{fetchProspectActivities:u}},void 0);s.prospectActivities=await c(o)}v()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.prospectId??null;if(s.prospectEditingId=o,o){const{fetchProspectActivities:c}=await _(async()=>{const{fetchProspectActivities:u}=await Promise.resolve().then(()=>x);return{fetchProspectActivities:u}},void 0);s.prospectActivities=await c(o)}v()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(a=>{a.addEventListener("click",o=>{o.currentTarget!==o.target&&!o.target.matches("button")||(s.prospectEditingId=null,s.prospectActivities=[],v())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const a=s.prospectEditingId==="__new__",o=a?`p_${Date.now()}`:s.prospectEditingId??"",c={id:o,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!c.companyName){P("会社名は必須です","warning");return}const{saveProspect:u,fetchProspects:p,recordAudit:y,sendSlackNotification:h}=await _(async()=>{const{saveProspect:g,fetchProspects:b,recordAudit:k,sendSlackNotification:w}=await Promise.resolve().then(()=>x);return{saveProspect:g,fetchProspects:b,recordAudit:k,sendSlackNotification:w}},void 0);await u(c)?(a&&await h("new_prospect",`新規見込客: ${c.companyName} / 想定 ¥${c.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await y({action:a?"prospect_create":"prospect_update",entityType:"prospect",entityId:o,userEmail:s.user?.email}),s.prospects=await p(),s.prospectEditingId=null,v()):P("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await se("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const o=a.dataset.id??"",{deleteProspect:c,fetchProspects:u}=await _(async()=>{const{deleteProspect:p,fetchProspects:y}=await Promise.resolve().then(()=>x);return{deleteProspect:p,fetchProspects:y}},void 0);await c(o)&&(s.prospects=await u(),v())})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",o=e.querySelector("#prospect-activity-type")?.value??"call",c=e.querySelector("#prospect-activity-title")?.value??"";if(!c){P("内容を入力してください","warning");return}const{saveProspectActivity:u,fetchProspectActivities:p}=await _(async()=>{const{saveProspectActivity:y,fetchProspectActivities:h}=await Promise.resolve().then(()=>x);return{saveProspectActivity:y,fetchProspectActivities:h}},void 0);await u({id:`act_${Date.now()}`,prospectId:a,activityType:o,title:c,activityDate:new Date().toISOString(),staffCode:s.myProfile?.staffCode}),s.prospectActivities=await p(a),v()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(a=>{a.addEventListener("dragstart",o=>{o.dataTransfer?.setData("text/plain",a.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(a=>{a.addEventListener("dragover",o=>o.preventDefault()),a.addEventListener("drop",async o=>{o.preventDefault();const c=o.dataTransfer?.getData("text/plain"),u=a.dataset.prospectStage;if(!c)return;const p=s.prospects.find(y=>y.id===c);if(p&&p.stage!==u){const y={...p,stage:u},{saveProspect:h}=await _(async()=>{const{saveProspect:f}=await Promise.resolve().then(()=>x);return{saveProspect:f}},void 0);await h(y),p.stage=u,v()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:a,saveIntegrationSetting:o}=await _(async()=>{const{fetchIntegrationSettings:f,saveIntegrationSetting:g}=await Promise.resolve().then(()=>x);return{fetchIntegrationSettings:f,saveIntegrationSetting:g}},void 0),u=(s.integrations.length>0?s.integrations:await a()).find(f=>f.provider==="slack");if(!u)return;const p=e.querySelector("#slack-webhook")?.value??"",y=e.querySelector("#slack-default-channel")?.value??"",h=e.querySelector("#slack-enabled")?.checked??!1;await o({...u,config:{...u.config,webhook_url:p,default_channel:y},isEnabled:h}),s.integrations=await a(),P("保存しました"),v()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:a,fetchSlackRules:o}=await _(async()=>{const{saveSlackRule:c,fetchSlackRules:u}=await Promise.resolve().then(()=>x);return{saveSlackRule:c,fetchSlackRules:u}},void 0);for(const c of s.slackRules){const u=e.querySelector(`[data-slack-rule-id="${c.id}"][data-slack-field="enabled"]`)?.checked??c.enabled,p=e.querySelector(`[data-slack-rule-id="${c.id}"][data-slack-field="channel"]`)?.value??c.channel;await a({...c,enabled:u,channel:p})}s.slackRules=await o(),P("ルールを保存しました"),v()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:a}=await _(async()=>{const{sendSlackNotification:c}=await Promise.resolve().then(()=>x);return{sendSlackNotification:c}},void 0),o=await a("new_order","🧪 これはテスト通知です (syusen-cloud)");o.ok?P("テスト送信成功"):P("送信失敗: "+(o.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{s.materialEditing=null,s.materialEditingIsNew=!0,v()}),e.querySelectorAll("[data-action='material-adjust']").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.id??"",c=s.materialList.find(u=>u.id===o);c&&(s.materialEditing=c,s.materialEditingIsNew=!1,v())})}),e.querySelectorAll("[data-action='material-close']").forEach(a=>{a.addEventListener("click",o=>{o.currentTarget!==o.target&&!o.target.matches("button")||(s.materialEditing=null,s.materialEditingIsNew=!1,v())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const o={id:s.materialEditingIsNew?`mat_${Date.now()}`:s.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(o.materialType=e.querySelector("#mat-type")?.value??"",!o.code||!o.name){P("コードと品名は必須です","warning");return}const{saveMaterial:c,fetchMaterialList:u}=await _(async()=>{const{saveMaterial:y,fetchMaterialList:h}=await Promise.resolve().then(()=>x);return{saveMaterial:y,fetchMaterialList:h}},void 0);await c(o)?(s.materialList=await u(),s.materialEditing=null,s.materialEditingIsNew=!1,P("保存しました"),v()):P("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!a||!await se("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:o,fetchMaterialList:c}=await _(async()=>{const{deleteMaterial:u,fetchMaterialList:p}=await Promise.resolve().then(()=>x);return{deleteMaterial:u,fetchMaterialList:p}},void 0);await o(a)&&(s.materialList=await c(),s.materialEditing=null,v())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{s.userEditingId="__new__",v()}),e.querySelectorAll("[data-action='user-edit']").forEach(a=>{a.addEventListener("click",()=>{s.userEditingId=a.dataset.id??null,v()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{s.userEditingId=null,v()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const a=s.userEditingId==="__new__",o=a?crypto.randomUUID():s.userEditingId??"",c=e.querySelector("#user-email")?.value.trim()??"",u=e.querySelector("#user-name")?.value.trim()??"";if(!c||!u){P("名前とメールアドレスは必須です","warning");return}const p={id:o,email:c,displayName:u,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(a){const b=e.querySelector("#user-password")?.value??"";if(b.length<8){P("パスワードは8文字以上必要です","warning");return}try{await Ut(c,b)}catch(k){P("Auth登録失敗: "+(k instanceof Error?k.message:""),"error");return}}const{saveUserProfile:y,fetchUserProfiles:h,recordAudit:f}=await _(async()=>{const{saveUserProfile:b,fetchUserProfiles:k,recordAudit:w}=await Promise.resolve().then(()=>x);return{saveUserProfile:b,fetchUserProfiles:k,recordAudit:w}},void 0);await y(p)?(await f({action:a?"user_create":"user_update",entityType:"user",entityId:o,userEmail:s.user?.email}),s.userProfiles=await h(),s.userEditingId=null,P("保存しました"),v()):P("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await se("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const o=a.dataset.id??"",{deleteUserProfile:c,fetchUserProfiles:u,recordAudit:p}=await _(async()=>{const{deleteUserProfile:h,fetchUserProfiles:f,recordAudit:g}=await Promise.resolve().then(()=>x);return{deleteUserProfile:h,fetchUserProfiles:f,recordAudit:g}},void 0);await c(o)?(await p({action:"user_delete",entityType:"user",entityId:o,userEmail:s.user?.email}),s.userProfiles=await u(),v()):P("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!s.myProfile)return;const a=e.querySelector("#profile-sender")?.value??"",o={...s.myProfile,defaultMailSenderId:a},{saveUserProfile:c}=await _(async()=>{const{saveUserProfile:u}=await Promise.resolve().then(()=>x);return{saveUserProfile:u}},void 0);await c(o),s.myProfile=o,P("保存しました"),v()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const a=e.querySelector("#profile-new-password")?.value??"";if(a.length<8){P("8文字以上のパスワードを入力してください","warning");return}try{await Bs(a),P("パスワードを変更しました")}catch(o){P("変更失敗: "+(o instanceof Error?o.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(a=>{a.addEventListener("click",()=>{s.integrationEditingId=a.dataset.id??null,v()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{s.integrationEditingId=null,v()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='int-save']")?.dataset.id??"",o=s.integrations.find(f=>f.id===a);if(!o)return;const c={...o.config};Object.keys(c).forEach(f=>{const g=e.querySelector(`#int-${f}`);g&&(c[f]=g.value)});const u=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:p,fetchIntegrationSettings:y}=await _(async()=>{const{saveIntegrationSetting:f,fetchIntegrationSettings:g}=await Promise.resolve().then(()=>x);return{saveIntegrationSetting:f,fetchIntegrationSettings:g}},void 0);await p({...o,config:c,isEnabled:u})?(s.integrations=await y(),s.integrationEditingId=null,P("保存しました"),v()):P("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(a=>{a.addEventListener("click",async()=>{const o=s.integrations.find(y=>y.provider==="shopify");if(!o){P("Shopify連携が未設定です","warning");return}a.textContent="同期中…",a.disabled=!0;const{syncShopifyOrders:c,fetchShopifyOrders:u}=await _(async()=>{const{syncShopifyOrders:y,fetchShopifyOrders:h}=await Promise.resolve().then(()=>x);return{syncShopifyOrders:y,fetchShopifyOrders:h}},void 0),p=await c(o);p.error?P("同期失敗: "+p.error,"error"):(P(`${p.count}件を同期しました`),s.shopifyOrders=await u()),v()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(a=>{a.addEventListener("click",async()=>{const o=s.integrations.find(y=>y.provider==="google_calendar");if(!o)return;a.textContent="同期中…",a.disabled=!0;const{syncGoogleCalendar:c,fetchCalendarEvents:u}=await _(async()=>{const{syncGoogleCalendar:y,fetchCalendarEvents:h}=await Promise.resolve().then(()=>x);return{syncGoogleCalendar:y,fetchCalendarEvents:h}},void 0),p=await c(o);p.error?P("同期失敗: "+p.error,"error"):(P(`${p.count}件を同期しました`),s.calendarEvents=await u(s.calendarYearMonth)),v()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const o=e.querySelector("#fax-file")?.files?.[0];if(!o){P("FAX画像を選択してください","warning");return}const c=s.integrations.find(u=>u.provider==="cloud_vision");if(!c||!c.config.api_key){P("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}s.faxProcessing=!0,s.faxOcrText=null,v();try{const u=new FileReader;u.onload=async()=>{const p=String(u.result??""),{ocrFaxImage:y,saveFaxRecord:h,fetchFaxInbox:f}=await _(async()=>{const{ocrFaxImage:w,saveFaxRecord:D,fetchFaxInbox:E}=await Promise.resolve().then(()=>x);return{ocrFaxImage:w,saveFaxRecord:D,fetchFaxInbox:E}},void 0),g=await y(c,p),b=e.querySelector("#fax-sender-name")?.value??"",k=e.querySelector("#fax-sender-phone")?.value??"";await h({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:b,senderPhone:k,ocrStatus:g.error?"failed":"done",ocrText:g.text}),s.faxOcrText=g.error?`エラー: ${g.error}`:g.text,s.faxRecords=await f(),s.faxProcessing=!1,v()},u.readAsDataURL(o)}catch(u){P("OCR失敗: "+(u instanceof Error?u.message:""),"error"),s.faxProcessing=!1,v()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{s.mailSenderEditingId="__new__",v()}),e.querySelectorAll("[data-action='ms-edit']").forEach(a=>{a.addEventListener("click",()=>{s.mailSenderEditingId=a.dataset.id??null,v()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{s.mailSenderEditingId=null,v()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const a=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,o={id:a,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:s.mailSenders.find(y=>y.id===a)?.isVerified??!1};if(!o.name||!o.email){P("名前とメールアドレスは必須です","warning");return}const{saveMailSender:c,fetchMailSenders:u}=await _(async()=>{const{saveMailSender:y,fetchMailSenders:h}=await Promise.resolve().then(()=>x);return{saveMailSender:y,fetchMailSenders:h}},void 0);await c(o)?(s.mailSenders=await u(),s.mailSenderEditingId=null,P("保存しました"),v()):P("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(a=>{a.addEventListener("click",async()=>{if(!await se("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const o=a.dataset.id??"",{deleteMailSender:c,fetchMailSenders:u}=await _(async()=>{const{deleteMailSender:y,fetchMailSenders:h}=await Promise.resolve().then(()=>x);return{deleteMailSender:y,fetchMailSenders:h}},void 0);await c(o)?(s.mailSenders=await u(),v()):P("削除失敗","error")})}),e.querySelectorAll("[data-sc-ym]").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.scYm;if(!o)return;s.shipmentCalendarYearMonth=o,s.shipmentCalendarData=null,s.shipmentCalendarSelectedDate=null,v();const{fetchShipmentCalendar:c}=await _(async()=>{const{fetchShipmentCalendar:u}=await Promise.resolve().then(()=>x);return{fetchShipmentCalendar:u}},void 0);s.shipmentCalendarData=await c(o),v()})}),e.querySelectorAll("[data-sc-date]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.scDate;o&&(s.shipmentCalendarSelectedDate=s.shipmentCalendarSelectedDate===o?null:o,v())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(a=>{a.addEventListener("click",async()=>{s.calendarYearMonth=a.dataset.ym??s.calendarYearMonth;const{fetchCalendarEvents:o}=await _(async()=>{const{fetchCalendarEvents:c}=await Promise.resolve().then(()=>x);return{fetchCalendarEvents:c}},void 0);s.calendarEvents=await o(s.calendarYearMonth),v()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async a=>{s.calendarYearMonth=a.target.value;const{fetchCalendarEvents:o}=await _(async()=>{const{fetchCalendarEvents:c}=await Promise.resolve().then(()=>x);return{fetchCalendarEvents:c}},void 0);s.calendarEvents=await o(s.calendarYearMonth),v()}),e.querySelector("#cal-filter-category")?.addEventListener("change",a=>{s.calendarFilterCategory=a.target.value,v()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const a=new Date;s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(a.getTime()+3600*1e3).toISOString(),isAllDay:!1}},v()}),e.querySelectorAll("[data-cal-date]").forEach(a=>{a.tagName!=="BUTTON"&&a.addEventListener("click",o=>{if(o.target.closest(".cal-event"))return;const c=a.dataset.calDate??"";s.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${c}T10:00:00`,isAllDay:!1}},v()})}),e.querySelectorAll("[data-cal-event-id]").forEach(a=>{a.addEventListener("click",o=>{o.stopPropagation();const c=a.dataset.calEventId,u=s.calendarEvents.find(p=>p.id===c);u&&(s.calendarEdit={isOpen:!0,isNew:!1,event:{...u}},v())})}),e.querySelectorAll("[data-action='cal-close']").forEach(a=>{a.addEventListener("click",o=>{o.currentTarget!==o.target&&!o.target.matches("button")||(s.calendarEdit=null,v())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!s.calendarEdit)return;const{saveCalendarEvent:a,fetchCalendarEvents:o,CALENDAR_CATEGORY_COLORS:c}=await _(async()=>{const{saveCalendarEvent:f,fetchCalendarEvents:g,CALENDAR_CATEGORY_COLORS:b}=await Promise.resolve().then(()=>x);return{saveCalendarEvent:f,fetchCalendarEvents:g,CALENDAR_CATEGORY_COLORS:b}},void 0),u=document.querySelector("[data-action='cal-save']")?.dataset.id||s.calendarEdit.event.id||`evt_${Date.now()}`,p=e.querySelector("#cal-category")?.value??"general",y={id:u,title:e.querySelector("#cal-title")?.value??"",category:p,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:c[p]};if(!y.title){P("タイトルは必須です","warning");return}await a(y)?(s.calendarEvents=await o(s.calendarYearMonth),s.calendarEdit=null,P("保存しました"),v()):P("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const a=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!a||!await se("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:o,fetchCalendarEvents:c}=await _(async()=>{const{deleteCalendarEvent:p,fetchCalendarEvents:y}=await Promise.resolve().then(()=>x);return{deleteCalendarEvent:p,fetchCalendarEvents:y}},void 0);await o(a)?(s.calendarEvents=await c(s.calendarYearMonth),s.calendarEdit=null,P("削除しました"),v()):P("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(s.importPreview){s.importing=!0,v();try{const a=s.importPreview.rows.filter(c=>c._valid),o=await Ol(s.importEntity,a);s.importResult=`取り込み完了: ${o.inserted}件成功 / ${o.failed}件失敗`,s.importPreview=null}catch(a){s.importResult=`エラー: ${a instanceof Error?a.message:String(a)}`}finally{s.importing=!1,v()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const a=e.querySelector("#store-date")?.value??s.storeSalesDate;s.storeSalesDate=a,s.storeSales=[],s.actionLoading=!0,v(),Nt(a).then(o=>{s.storeSales=o,s.actionLoading=!1,v()})}),e.querySelectorAll("[data-action='copy-config']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.configValue??"";if(o)try{await navigator.clipboard.writeText(o),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(c){console.warn("Clipboard copy failed",c)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const o=JSON.stringify({supabase_url:G,supabase_anon_key:V,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),c=new Blob([o],{type:"application/json;charset=utf-8"}),u=URL.createObjectURL(c),p=document.createElement("a");p.href=u,p.download="relay_config.json",p.click(),URL.revokeObjectURL(u)}),e.querySelectorAll("[data-action='copy-code']").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.code??"";if(o)try{await navigator.clipboard.writeText(decodeURIComponent(o)),a.textContent="コピー済み",window.setTimeout(()=>{a.textContent="コピー"},1600)}catch(c){console.warn("Clipboard code copy failed",c)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(a=>{a.addEventListener("change",()=>{ue(e),s.emailSaveMessage=null,v()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(a=>{a.addEventListener("change",()=>{ue(e),s.emailSaveMessage=null,v()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{ue(e),s.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{ue(e),s.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(a=>{a.addEventListener("click",()=>{s.emailTemplateId=a.dataset.templateId??"custom";const o=Ss(s.emailTemplateId);s.emailSubject=o.subject,s.emailBody=o.body,s.emailSaveMessage=null,v()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{ue(e);const a=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;s.emailBody.includes("https://kaneishuzo.co.jp/products")||(s.emailBody=`${s.emailBody.trimEnd()}${a}`),s.emailSaveMessage=null,v()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{ue(e),s.actionLoading=!0,v(),Ue(vt("draft")).then(a=>{s.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(a.updatedAt??new Date().toISOString()))}`,s.actionLoading=!1,v()})}),e.querySelector("#email-sender")?.addEventListener("change",a=>{s.emailSenderId=a.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{ue(e),s.actionLoading=!0,s.emailSending=!0,v();const a=vt("sent");s.mailSenders.find(o=>o.id===s.emailSenderId),ss().then(async o=>{await Ue({...a,recipientCount:o.sent}),s.emailSaveMessage=`${o.sent.toLocaleString("ja-JP")} 件送信しました。`,s.actionLoading=!1,s.emailSending=!1,v(),P(`${o.sent}件送信完了`)}).catch(async()=>{await Ue(vt("draft")),s.emailSaveMessage="APIキー未設定のため下書きを保存しました。",s.actionLoading=!1,s.emailSending=!1,v(),P("APIキー未設定のため下書き保存しました","warning")})})}function v(){const e=document.querySelector("#app");if(!e)return;e.innerHTML=Yr(),Gr(e),s.pickerMode&&e.querySelector("#modal-search")?.focus(),s.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),Bt()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const n of["fd-scaler","print-scaler"]){const i=e.querySelector(`#${n}`),r=i?.querySelector(".fd-canvas, .print-preview"),l=r?.querySelector(".print-page")??r;if(!i||!l)continue;const d=i.parentElement?.clientWidth??0,a=l.offsetWidth;if(d>0&&a>0&&a>d-24){const o=(d-24)/a;i.style.transform=`scale(${o})`,i.style.transformOrigin="top left",i.style.height=`${(l.offsetHeight+48)*o}px`}else i.style.transform="",i.style.height=""}});const t=s.sidebarOpen||s.pickerMode!==null||s.globalSearchOpen;document.body.style.overflow=t?"hidden":"",document.body.style.touchAction=t?"none":""}const Ls="sake-cloud-cache",Xr=300*1e3;function Kr(){try{const e={ts:Date.now(),masterStats:s.masterStats,pipelineMeta:s.pipelineMeta};localStorage.setItem(Ls,JSON.stringify(e))}catch{}}function Wr(){try{const e=localStorage.getItem(Ls);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>Xr?!1:(t.masterStats&&(s.masterStats=t.masterStats),t.pipelineMeta&&(s.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let Is=0;async function ge(){const e=Wr();e&&(s.loading=!1,v()),s.loading=!e,e||v();try{const[t,n,i,r,l,d,a,o]=await Promise.all([Ea(),Ca(),He(),La(),Ge(s.invoiceFilter),Lt(s.ledgerCustomerCode),Ta(),Ia()]);if(s.salesSummary=t,s.paymentStatus=n,s.masterStats=i,s.pipelineMeta=r,s.invoiceRecords=l,s.customerLedger=d,s.salesAnalytics=a,s.syncDashboard=o,Oa().then(c=>{s.announcements=c,v()}),be.length===0&&Er(),s.rawTableList.length===0&&ds().then(c=>{s.rawTableList=c,s.route==="/raw-browser"&&v()}),!s.salesFilter.startDate||!s.salesFilter.endDate){const u=[...t.salesRecords].sort((h,f)=>new Date(f.date).getTime()-new Date(h.date).getTime())[0]?.date??new Date().toISOString(),p=new Date(u),y=new Date(p);y.setDate(p.getDate()-30),s.salesFilter={startDate:wa(y.toISOString()),endDate:wa(p.toISOString())}}(!s.invoiceFilter.startDate||!s.invoiceFilter.endDate)&&(s.invoiceFilter={...s.invoiceFilter,startDate:s.salesFilter.startDate,endDate:s.salesFilter.endDate},s.invoiceRecords=await Ge(s.invoiceFilter)),s.error=null,Kr()}catch(t){e||(s.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{s.loading=!1,v(),zt(s.route),Is=Date.now()}}window.addEventListener("popstate",()=>{s.route=xs(location.pathname),s.currentCategory=Ft(s.route),s.sidebarOpen=!1,Ie(),zt(s.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),s.globalSearchOpen=!0,v();return}if(e.key==="Escape"){if(s.globalSearchOpen){Ie(),v();return}if(s.pickerMode){Ze(),v();return}s.route==="/invoice-entry"&&!s.invoiceSaving&&(Ps(),v());return}if(s.route==="/invoice-entry"&&!s.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&Ds(t)}});s.user=tt()?Fs():null;s.user?.email&&(async()=>{const{fetchMyProfile:e}=await _(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>x);return{fetchMyProfile:t}},void 0);s.myProfile=await e(s.user.email),v()})();try{const e=localStorage.getItem("sake_print_options");e&&(s.printOptions={...s.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(s.printCompany={...s.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(s.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,i=0,r=0,l=0,d=1;document.addEventListener("mousedown",a=>{const o=a.target.closest(".fd-draggable");if(!o||!s.fdDesignMode)return;a.preventDefault();const c=o.closest(".fd-canvas");if(!c)return;const u=c.getBoundingClientRect();if(u.width===0)return;d=228.6/u.width,t=o,n=a.clientX,i=a.clientY,r=parseFloat(o.style.left)||0,l=parseFloat(o.style.top)||0,document.querySelectorAll(".fd-active").forEach(f=>f.classList.remove("fd-active")),o.classList.add("fd-active","fd-dragging"),s.fdActiveFieldId=o.dataset.fdId??null;const p=document.querySelector("#fd-selected-info");p&&(p.textContent=`選択中: ${o.title}`);const y=document.querySelector("#fd-sel-x"),h=document.querySelector("#fd-sel-y");y&&(y.value=String(r)),h&&(h.value=String(l))}),document.addEventListener("mousemove",a=>{if(!t)return;const o=(a.clientX-n)*d,c=(a.clientY-i)*d,u=Math.round((r+o)*2)/2,p=Math.round((l+c)*2)/2;t.style.left=u+"mm",t.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),h=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),h&&(h.value=String(p))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",a=>{if(!s.fdDesignMode||!s.fdActiveFieldId||a.key!=="ArrowLeft"&&a.key!=="ArrowRight"&&a.key!=="ArrowUp"&&a.key!=="ArrowDown"||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA")return;const o=document.querySelector(`[data-fd-id="${s.fdActiveFieldId}"]`);if(!o)return;a.preventDefault();const c=.5;let u=parseFloat(o.style.left)||0,p=parseFloat(o.style.top)||0;a.key==="ArrowLeft"?u-=c:a.key==="ArrowRight"?u+=c:a.key==="ArrowUp"?p-=c:a.key==="ArrowDown"&&(p+=c),o.style.left=u+"mm",o.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),h=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),h&&(h.value=String(p))})})();function Ts(e){const t=window.google?.maps;if(!t){e.innerHTML='<div style="padding:40px;text-align:center;color:var(--text-secondary);">Google Maps 読込中…</div>',setTimeout(()=>Ts(e),500);return}e.innerHTML="";const n=new t.Map(e,{center:{lat:35.45,lng:139.4},zoom:10,mapId:"sake-system-map",gestureHandling:"greedy"}),i=new t.InfoWindow;function r(l,d,a,o,c){const u=new t.marker.AdvancedMarkerElement({map:n,position:{lat:l,lng:d},content:(()=>{const p=document.createElement("div");return p.style.cssText=`background:${a};color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-weight:700;font-size:11px;cursor:pointer;`,p.textContent=o,p})()});u.addListener("click",()=>{i.setContent(c),i.open({anchor:u,map:n})})}s.mapFilters.showCustomers&&(s.masterStats?.customers??[]).forEach(d=>{!d.lat||!d.lng||s.mapFilters.filterBusinessType&&d.businessType!==s.mapFilters.filterBusinessType||r(d.lat,d.lng,"#2196F3","既",`<div style="min-width:180px;"><strong>${d.name}</strong><br/><span style="color:#666;font-size:11px;">${d.code}</span><br/>既存取引先<br/>締日${d.closingDay}日 / 支払日${d.paymentDay}日${d.address1?`<br/>${d.address1}`:""}</div>`)}),s.mapFilters.showProspects&&s.prospects.forEach(l=>{if(!l.lat||!l.lng||s.mapFilters.filterBusinessType&&l.businessType!==s.mapFilters.filterBusinessType)return;const d=l.stage==="hot"||l.stage==="negotiating"?"#EF5350":l.stage==="won"?"#66BB6A":"#4CAF50";r(l.lat,l.lng,d,"新",`<div style="min-width:200px;"><strong>${l.companyName}</strong><br/><span style="color:#666;font-size:11px;">${l.contactName??""}</span><br/>新規見込客 (${l.stage})<br/>想定 ¥${l.expectedAmount.toLocaleString("ja-JP")} / 確度 ${l.probability}%${l.nextAction?`<br/>${l.nextAction}`:""}</div>`)}),s.mapFilters.showDelivery&&s.deliveryLocations.forEach(l=>{!l.lat||!l.lng||r(l.lat,l.lng,"#FF9800","納",`<div style="min-width:180px;"><strong>${l.name}</strong><br/>納品先${l.customerCode?` (${l.customerCode})`:""}<br/>${l.address??""}${l.contactName?`<br/>${l.contactName}`:""}${l.deliveryNote?`<br/>${l.deliveryNote}`:""}</div>`)})}ge();const Zr=300*1e3;setInterval(()=>{!s.loading&&!document.hidden&&ge()},Zr);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-Is>60*1e3&&ge()});let Pt="";fetch(`${location.origin}/sake-system/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{Pt=e}).catch(()=>{});setInterval(async()=>{if(!(!Pt||document.hidden))try{await(await fetch(`${location.origin}/sake-system/index.html?_t=${Date.now()}`)).text()!==Pt&&!s.updateAvailable&&(s.updateAvailable=!0,v())}catch{}},120*1e3);
