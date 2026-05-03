(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const Ks="modulepreload",Xs=function(e){return"/"+e},Ja={},q=function(t,n,s){let i=Promise.resolve();if(n&&n.length>0){let u=function(y){return Promise.all(y.map(g=>Promise.resolve(g).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),p=c?.nonce||c?.getAttribute("nonce");i=u(n.map(y=>{if(y=Xs(y),y in Ja)return;Ja[y]=!0;const g=y.endsWith(".css"),f=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${f}`))return;const b=document.createElement("link");if(b.rel=g?"stylesheet":Ks,g||(b.as="script"),b.crossOrigin="",b.href=y,p&&b.setAttribute("nonce",p),document.head.appendChild(b),g)return new Promise((S,P)=>{b.addEventListener("load",S),b.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${y}`)))})}))}function l(c){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=c,window.dispatchEvent(p),!p.defaultPrevented)throw c}return i.then(c=>{for(const p of c||[])p.status==="rejected"&&l(p.reason);return t().catch(l)})},he="https://loarwnuyvfxiscjjsmiz.supabase.co",te="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";async function et(e,t){try{const n=new URL(`/rest/v1/${e}`,he),s=await fetch(n.toString(),{method:"POST",headers:{apikey:te,Authorization:`Bearer ${te}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function wa(e,t){try{const n=new URL(`/rest/v1/${e}`,he),s=await fetch(n.toString(),{method:"POST",headers:{apikey:te,Authorization:`Bearer ${te}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function _a(e,t,n){try{const s=new URL(`/rest/v1/${e}?id=eq.${t}`,he);return(await fetch(s.toString(),{method:"PATCH",headers:{apikey:te,Authorization:`Bearer ${te}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function ce(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,he),s=await fetch(n.toString(),{method:"POST",headers:{apikey:te,Authorization:`Bearer ${te}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function xa(e){try{const t=new URL(`/rest/v1/${e}`,he);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:te,Authorization:`Bearer ${te}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const s=n.headers.get("Content-Range");if(s){const i=s.match(/\/(\d+)/);if(i)return parseInt(i[1],10)}return 0}catch{return 0}}async function R(e,t={}){try{const n=new URL(`/rest/v1/${e}`,he);Object.entries(t).forEach(([i,l])=>{n.searchParams.set(i,l)});const s=await fetch(n.toString(),{method:"GET",headers:{apikey:te,Authorization:`Bearer ${te}`,Accept:"application/json",Prefer:"return=representation"}});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function Cn(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,he);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:te,Authorization:`Bearer ${te}`}})).ok}catch{return!1}}async function ue(e,t={},n=1e3){const s=[];let i=0;try{for(;;){const l=new URL(`/rest/v1/${e}`,he);Object.entries(t).forEach(([u,y])=>{l.searchParams.set(u,y)}),l.searchParams.set("limit",String(n)),l.searchParams.set("offset",String(i));const c=await fetch(l.toString(),{method:"GET",headers:{apikey:te,Authorization:`Bearer ${te}`,Accept:"application/json",Prefer:"return=representation"}});if(!c.ok)throw new Error(`HTTP ${c.status}`);const p=await c.json();if(s.push(...p),p.length<n)break;i+=n}return s}catch(l){return console.warn(`Failed to query all rows from Supabase table ${e}`,l),s.length>0?s:[]}}const G=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:te,SUPABASE_URL:he,supabaseCount:xa,supabaseDelete:Cn,supabaseInsert:et,supabaseQuery:R,supabaseQueryAll:ue,supabaseRpc:ce,supabaseUpdate:_a,supabaseUpsert:wa},Symbol.toStringTag,{value:"Module"})),Sa="sake_auth";function Ln(e){localStorage.setItem(Sa,JSON.stringify(e))}function Dn(){return{apikey:te,"Content-Type":"application/json"}}function Ws(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),s=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(s))}catch{return null}}async function qn(e,t){const n=await fetch(`${he}/auth/v1/${e}`,{method:"POST",headers:Dn(),body:JSON.stringify(t)}),s=await n.json().catch(()=>({}));if(!n.ok)throw new Error(s.error_description??s.msg??`HTTP ${n.status}`);return s}async function Zs(e,t){const n=await qn("token?grant_type=password",{email:e,password:t});return Ln({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Ua(e,t){const n=await qn("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&Ln({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function eo(){const e=jt();if(localStorage.removeItem(Sa),!!e?.access_token)try{await fetch(`${he}/auth/v1/logout`,{method:"POST",headers:{...Dn(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function jt(){const e=localStorage.getItem(Sa);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function to(){const e=jt();if(!e)return null;const t=Ws(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function ao(e){const t=jt();if(!t)throw new Error("not signed in");const n=await fetch(`${he}/auth/v1/user`,{method:"PUT",headers:{apikey:te,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const s=await n.json().catch(()=>({}));throw new Error(s.msg??`HTTP ${n.status}`)}}const ka={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},In={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},no={generatedAt:new Date().toISOString(),records:[]},Oe={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},so={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},oo={},io={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function ae(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function ro(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function lo(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function h(e,t,n=""){for(const s of t){const i=e[s];if(typeof i=="string"&&i.length>0)return i}return n}function A(e,t,n=0){for(const s of t)if(s in e)return ae(e[s]);return n}function me(e,t,n=!0){for(const s of t)if(s in e)return lo(e[s]);return n}function de(e,t,n){for(const s of t){const i=e[s];if(typeof i!="string"||i.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(i))return new Date(`${i}T00:00:00Z`).toISOString();const l=new Date(i);if(!Number.isNaN(l.getTime()))return l.toISOString()}return n}function co(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:de(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:ae(e.total_amount??e.billed_amount)}}function Qa(e){const t=e.trim().toUpperCase(),n=oo[t];if(n)return n;const s=In.salesRecords.find(i=>i.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function Tn(e){try{return(await R("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function Ge(e,t){await wa("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function Nn(){const e=await ue("daily_sales_detail",{select:"sales_date,amount,document_count,bottles,volume_ml,price_per_bottle,price_per_liter",order:"sales_date.desc"});if(e.length>0){const[t,n]=await Promise.all([R("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),R("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),i=new Date().toISOString().slice(0,10),l=i.slice(0,7),c=[...e].sort((S,P)=>S.sales_date.localeCompare(P.sales_date)).map(S=>({date:new Date(`${S.sales_date}T00:00:00Z`).toISOString(),amount:ae(S.amount??S.sales_amount),bottles:ae(S.bottles),volumeMl:ae(S.volume_ml),pricePerBottle:ae(S.price_per_bottle),pricePerLiter:ae(S.price_per_liter)})),p=c.slice(-30),u=S=>ae(S.amount??S.sales_amount),y=e.reduce((S,P)=>P.sales_date===i?S+u(P):S,0),g=e.reduce((S,P)=>P.sales_date.startsWith(l)?S+u(P):S,0),f=t.filter(S=>ae(S.balance_amount)>0),b=n.map((S,P)=>({id:String(S.id??`sale-${P+1}`),documentNo:S.document_no??S.legacy_document_no??"",date:S.sales_date??"",customerCode:S.legacy_customer_code??"",customerName:S.customer_name??S.legacy_customer_code??"",amount:ae(S.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:y,todayDelta:0,monthSales:g,monthDelta:0,unpaidCount:f.length,unpaidAmount:f.reduce((S,P)=>S+ae(P.balance_amount),0)},dailySales:p,allDailySales:c,salesRecords:b}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),In}async function On(){const e=await ue("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const s=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:ae(t.billed_amount),paymentAmount:ae(t.paid_amount),balanceAmount:ae(t.balance_amount),lastPaymentDate:null,status:ro(t.payment_status)}})}:no}async function Pa(){const[e,t]=await Promise.all([ue("customers"),ue("products")]);if(e.length>0||t.length>0){const n=e.length?e.map((i,l)=>{const c=typeof i.memo=="string"?JSON.parse(i.memo||"{}"):i.memo??{};return{id:h(i,["id","customer_id","code"],`customer-${l+1}`),code:h(i,["code","customer_code","legacy_customer_code"],`C${String(l+1).padStart(4,"0")}`),name:h(i,["name","customer_name","display_name"],`Customer ${l+1}`),kanaName:h(i,["kana_name"],""),shortName:h(i,["short_name"],""),postalCode:h(i,["postal_code"],""),address1:h(i,["address1"],""),address2:h(i,["address2"],""),phone:h(i,["phone"],""),fax:h(i,["fax"],""),email:h(i,["email"],""),staffCode:h(i,["staff_code"],""),businessType:h(i,["business_type"],""),areaCode:h(i,["delivery_area_code"],""),salesCategory:String(c.sales_category??""),closingDay:A(i,["closing_day","close_day"],31),paymentDay:A(i,["payment_day","due_day"],15),paymentMonth:Number(c.payment_month??0),paymentCycle:h(i,["payment_cycle"],""),billingCycleType:h(i,["billing_cycle_type"],""),billingCode:String(c.billing_code??""),creditLimit:A(i,["credit_limit"],0),taxMode:h(i,["tax_mode"],""),taxRound:String(c.tax_round??""),invoiceIssue:String(c.invoice_issue??""),invoiceType:h(i,["invoice_type"],""),priceGroup:String(c.price_group??""),priceType:String(c.price_type??""),customerGroup1:String(c.customer_group1??""),customerGroup2:String(c.customer_group2??""),bankName:h(i,["bank_name"],""),bankBranch:h(i,["bank_branch"],""),bankAccount:h(i,["bank_account"],""),isActive:me(i,["is_active","active","enabled"],!0),lat:i.lat?Number(i.lat):void 0,lng:i.lng?Number(i.lng):void 0}}):Oe.customers,s=t.length?t.map((i,l)=>({id:h(i,["id","product_id","product_code","legacy_product_code"],`product-${l+1}`),code:h(i,["product_code","legacy_product_code","code"],`P${String(l+1).padStart(5,"0")}`),janCode:h(i,["jan_code","jan","barcode"],""),name:h(i,["name","product_name","display_name"],`Product ${l+1}`),kanaName:h(i,["kana_name"],""),shortName:h(i,["short_name"],""),category:h(i,["category_code","category","category_name"],"未分類"),taxCategoryCode:h(i,["tax_code","tax_category_code"],""),isActive:me(i,["is_active","active","enabled"],!0),listPrice:A(i,["list_price"],0),purchasePrice:A(i,["purchase_price"],0),salePrice:A(i,["default_sale_price","sale_price"],0),costPrice:A(i,["default_cost_price"],0),alcoholDegree:i.alcohol_degree!=null?Number(i.alcohol_degree):null,volumeMl:i.volume_ml!=null?Number(i.volume_ml):null,unit:h(i,["unit_name","unit"],"本"),caseQty:i.case_qty!=null?Number(i.case_qty):null,bottleType:h(i,["bottle_type"],""),containerCode:h(i,["container_code"],""),polishRate:i.polish_rate!=null?Number(i.polish_rate):null,riceType:h(i,["rice_type"],""),season:h(i,["season"],""),agingYears:A(i,["aging_years"],0)})):Oe.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||Oe.summary.customerCount,activeCustomerCount:e.length?n.filter(i=>i.isActive).length:Oe.summary.activeCustomerCount,productCount:t.length||Oe.summary.productCount,activeProductCount:t.length?s.filter(i=>i.isActive).length:Oe.summary.activeProductCount},customers:n,products:s}}return Oe}async function Mn(){const[e,t]=await Promise.all([R("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),R("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?de(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const s=e[0],i=h(s,["status"],"success"),l=s.errors,c=Array.isArray(l)?l.length>0:!!l;return{generatedAt:new Date().toISOString(),lastSyncAt:de(s,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:c?"warning":i==="error"?"error":"success",jobName:h(s,["agent_hostname"],"sake-relay"),message:`${A(s,["rows_upserted"],0)}行同期 / ${A(s,["files_updated"],0)}ファイル更新`}}return{...so,lastDataAt:n}}async function Rn(){const e=await ce("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function ht(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount,line_count",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];e.customerCode.trim()&&n.push(`customer_code.ilike.*${e.customerCode.trim()}*`,`legacy_customer_code.ilike.*${e.customerCode.trim()}*`),e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const s=await R("mv_invoice_with_line_count",t);return s.length>0?s.map((i,l)=>({id:h(i,["id"],`invoice-${l}`),documentNo:h(i,["document_no","legacy_document_no"],""),date:de(i,["sales_date"],""),customerCode:h(i,["legacy_customer_code","customer_code"],""),customerName:h(i,["customer_name","legacy_customer_code"],""),itemCount:A(i,["line_count"],0),amount:A(i,["total_amount","billed_amount"],0)})):[]}async function Ea(e){const t=e.trim().toUpperCase();if(!t)return Qa("");const[n,s,i]=await Promise.all([R("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),R("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),R("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||s.length>0){const l=n.map((u,y)=>{const g=co(u,y);return{id:g.id,date:g.date,documentNo:g.documentNo,amount:g.amount}}),c=s.map((u,y)=>({id:String(u.id??`payment-${y+1}`),date:de(u,["payment_date","received_date"],new Date().toISOString()),amount:ae(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),p=i.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:ae(p?.balance_amount),salesTotal:l.reduce((u,y)=>u+y.amount,0),paymentTotal:c.reduce((u,y)=>u+y.amount,0),salesHistory:l,paymentHistory:c}}return Qa(t)}async function Aa(){const[e,t,n,s]=await Promise.all([R("mv_monthly_sales",{order:"month.asc"}),R("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),R("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),R("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(i=>({month:h(i,["month"],""),amount:A(i,["amount"],0),quantity:A(i,["quantity"],0),volumeMl:A(i,["volume_ml"],0)})),productTotals:n.map(i=>({code:h(i,["code"],""),name:h(i,["name"],""),amount:A(i,["amount"],0),quantity:A(i,["quantity"],0),documents:A(i,["documents"],0),volumeMl:A(i,["volume_ml"],0)})),customerTotals:t.map(i=>({code:h(i,["code"],""),name:h(i,["name"],""),amount:A(i,["amount"],0),quantity:A(i,["quantity"],0),documents:A(i,["documents"],0),volumeMl:A(i,["volume_ml"],0)})),staffTotals:s.map(i=>({code:h(i,["code"],""),name:h(i,["name"],""),amount:A(i,["amount"],0),quantity:A(i,["quantity"],0),documents:A(i,["documents"],0),volumeMl:0}))}:io}async function po(e,t,n){if(t==="all")return[];const s=n?jn(t,n):null,l=await ce(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:s?.from??null,p_date_to:s?.to??null});return l?l.map(c=>({code:h(c,["code"],""),name:h(c,["name"],""),amount:A(c,["amount"],0),quantity:A(c,["quantity"],0),documents:A(c,["documents"],0),volumeMl:A(c,["volume_ml"],0)})):[]}async function uo(e,t){if(t==="all")return[];const n=await ce("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(s=>s.period_val).filter(Boolean)}function jn(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,s]=t.split("-").map(Number),i=`${n}-${String(s).padStart(2,"0")}-01`,l=new Date(n,s,0).getDate(),c=`${n}-${String(s).padStart(2,"0")}-${String(l).padStart(2,"0")}`;return{from:i,to:c}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const s=parseInt(n[1]),i=parseInt(n[2]),l=new Date(s,0,4),c=l.getDay()||7,p=new Date(l);p.setDate(l.getDate()-c+1);const u=new Date(p);u.setDate(p.getDate()+(i-1)*7);const y=new Date(u);return y.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:y.toISOString().slice(0,10)}}return null}function zn(e){return e.map(t=>({staffCode:h(t,["staff_code"],""),staffName:h(t,["staff_name"],""),code:h(t,["code"],""),name:h(t,["name"],""),tag:h(t,["tag"],""),amount:A(t,["amount"],0),quantity:A(t,["quantity"],0),documents:A(t,["documents"],0)}))}async function mo(e,t){const n=await ce("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(s=>({code:h(s,["code"],""),name:h(s,["name"],""),amount:A(s,["amount"],0),quantity:A(s,["quantity"],0),documents:A(s,["documents"],0)})):[]}async function yo(e,t,n){const s=await ce("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?zn(s):[]}async function ho(e,t,n){const s=await ce("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?zn(s):[]}async function fo(e,t){if(e==="all"||!t)return[];const n=await ce("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(s=>({month:h(s,["label"],""),amount:A(s,["amount"],0),quantity:A(s,["quantity"],0),volumeMl:A(s,["volume_ml"],0)})):[]}function go(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function vo(e,t,n){const s=await ce("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(i=>({code:h(i,["code"],""),name:h(i,["name"],""),tag:h(i,["tag"],""),amount:A(i,["amount"],0),quantity:A(i,["quantity"],0),documents:A(i,["documents"],0),volumeMl:A(i,["volume_ml"],0)})):[]}async function bo(e,t,n){const s=await ce("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(i=>({code:h(i,["code"],""),name:h(i,["name"],""),tag:h(i,["tag"],""),amount:A(i,["amount"],0),quantity:A(i,["quantity"],0),documents:A(i,["documents"],0),volumeMl:A(i,["volume_ml"],0)})):[]}async function $o(e,t){const n=await ce("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(s=>({month:h(s,["month"],""),amount:A(s,["amount"],0),quantity:A(s,["quantity"],0),volumeMl:A(s,["volume_ml"],0)})):[]}async function wo(e,t){const n=await ce("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:h(s,["brew_category"],""),subCategory:h(s,["sub_category"],""),productCount:A(s,["product_count"],0),totalShipmentQty:A(s,["total_shipment_qty"],0),totalShipmentMl:A(s,["total_shipment_ml"],0),monthlyAvgQty:A(s,["monthly_avg_qty"],0),monthlyAvgMl:A(s,["monthly_avg_ml"],0),currentStockL:A(s,["current_stock_l"],0),monthsRemaining:A(s,["months_remaining"],0),costPerL:A(s,["cost_per_l"],0)})):[]}async function _o(e,t){const n=await ce("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({month:h(s,["month"],""),brewCategory:h(s,["brew_category"],""),shipmentMl:A(s,["shipment_ml"],0)})):[]}async function xo(e,t){const n=await ce("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:h(s,["brew_category"],""),subCategory:h(s,["sub_category"],""),productCode:h(s,["product_code"],""),productName:h(s,["product_name"],""),volumeMl:A(s,["volume_ml"],0),annualQty:A(s,["annual_qty"],0),annualMl:A(s,["annual_ml"],0),monthlyAvgQty:A(s,["monthly_avg_qty"],0),monthlyAvgMl:A(s,["monthly_avg_ml"],0)})):[]}async function So(e){return(await R("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:h(n,["id"],""),brewCategory:h(n,["brew_category"],""),fy:A(n,["fy"],e),brewMonth:A(n,["brew_month"],0),durationMonths:A(n,["duration_months"],2),plannedVolumeL:A(n,["planned_volume_l"],0),notes:h(n,["notes"],"")}))}async function ko(e,t,n){return await ce("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(i=>({brew_month:i.brewMonth,duration_months:i.durationMonths,planned_volume_l:i.plannedVolumeL,notes:i.notes??null}))})!==null}async function Po(e,t,n,s){return await wa("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:s??null,updated_at:new Date().toISOString()})!==null}async function Eo(){const e=await R("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const s=h(n,["category_name"],""),i=h(n,["production_type_name"],"");!s||!i||(t[s]||(t[s]=[]),t[s].push(i))}return t}async function Ao(e,t){return await ce("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function Co(e,t){return await ce("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function Lo(){const e=await R("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>h(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function Do(){const e=await R("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const s=h(n,["brew_category"],"");s&&(t[s]={brewCategory:s,rawAlcoholPct:A(n,["raw_alcohol_pct"],18),targetAlcoholPct:A(n,["target_alcohol_pct"],15)})}return t}async function qo(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:i}=await q(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>G);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}},void 0);return i?(await fetch(`${s}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:i,Authorization:`Bearer ${i}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function Io(){const e=await ce("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:A(t,["fy"],0),brewCategory:h(t,["brew_category"],""),shipmentL:A(t,["shipment_l"],0),monthsElapsed:A(t,["months_elapsed"],12),annualizedL:A(t,["annualized_l"],0)})):[]}async function To(){const e=await R("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const s=h(n,["brew_category"],""),i=A(n,["growth_rate"],NaN);s&&!isNaN(i)&&(t[s]=i)}return t}async function No(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>G);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return s?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function Oo(){const e=await R("brewing_rice_params",{}),t={};for(const n of e??[]){const s=h(n,["brew_category"],"");s&&(t[s]={brewCategory:s,polishingRatio:A(n,["polishing_ratio"],.7),ricePerLiterKg:A(n,["rice_per_liter_kg"],.85),riceVariety:h(n,["rice_variety"],"一般米"),ricePricePerKg:A(n,["rice_price_per_kg"],400),kojiRatio:A(n,["koji_ratio"],.2)})}return t}async function Mo(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>G);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,rice_variety:t.riceVariety,rice_price_per_kg:t.ricePricePerKg,koji_ratio:t.kojiRatio,updated_at:new Date().toISOString()})})).ok:!1}async function Ro(){const e=await ce("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:h(t,["brew_category"],""),monthNum:A(t,["month_num"],0),avgMonthlyL:A(t,["avg_monthly_l"],0)})):[]}async function jo(e){return(await R("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:h(n,["id"],""),brewCategory:h(n,["brew_category"],""),label:h(n,["label"],""),volumeL:A(n,["volume_l"],0)}))}async function zo(){return(await R("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:h(t,["id"],""),brewCategory:h(t,["brew_category"],""),label:h(t,["label"],""),volumeL:A(t,["volume_l"],0)}))}async function Bo(e,t,n){return await et("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function Fo(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>G);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function Vo(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>G);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function Yo(){return(await R("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:h(t,["name"],""),parentCategory:h(t,["parent_category"],"")})).filter(t=>t.name)}async function Jo(e,t){return await et("brewing_custom_categories",{name:e,parent_category:t})!==null}async function Uo(e){const t=await ce("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:h(n,["production_type_name"],""),count:A(n,["product_count"],0)})).filter(n=>n.name):[]}async function Qo(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>G);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:i}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Ho(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await q(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>G);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}},void 0);if(!s)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function Go(){const e=await R("brewing_category_overrides",{}),t={};for(const n of e??[]){const s=h(n,["product_code"],""),i=h(n,["brew_category"],"");s&&i&&(t[s]=i)}return t}async function Ko(e){return(await R("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>h(n,["product_code"],"")).filter(Boolean)}async function Xo(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await q(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>G);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}},void 0);if(!s)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}}),t.length===0)return!0;const i=t.map(c=>({year_month:e,product_code:c}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(i)})).ok}catch{return!1}}const ia={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Bn(e){const t=e.lines.reduce((i,l)=>i+l.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await et("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const Ha={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function Ca(e){const t=await R("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],s=ae(n.total_amount);return{documentNo:e,invoiceDate:h(n,["sales_date","document_date"],""),customerCode:h(n,["legacy_customer_code","customer_code"],""),customerName:h(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...Ha,documentNo:e||Ha.documentNo}}const Wo={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function La(e){const t=await R("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(i=>{const l=A(i,["sales_amount"],0),c=A(i,["tax_amount"],0);return{customerCode:h(i,["customer_code"],""),customerName:h(i,["customer_name"],""),closingDay:31,salesAmount:l,taxAmount:c,prevBalance:0,paymentAmount:0,billingAmount:l,status:"open"}}),s=n.reduce((i,l)=>i+l.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:s,customers:n}}return{...Wo,targetYearMonth:e}}const Zo={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function zt(){const[e,t,n]=await Promise.all([R("mv_monthly_sales",{order:"month.asc"}),R("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),R("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return Zo;const s=e.slice(-12).map(u=>h(u,["month"],"")),i=new Map;t.forEach(u=>{const y=h(u,["code"],"");i.has(y)||i.set(y,{name:h(u,["name"],y),monthValues:new Map}),i.get(y).monthValues.set(h(u,["month"],""),A(u,["amount"],0))});const c=Array.from(i.entries()).map(([u,y])=>({code:u,name:y.name,total:s.reduce((g,f)=>g+(y.monthValues.get(f)??0),0),monthValues:y.monthValues})).sort((u,y)=>y.total-u.total).slice(0,10).map(u=>({label:u.name,values:s.map(y=>u.monthValues.get(y)??0)})),p=n.map(u=>({label:h(u,["name"],""),values:s.map(()=>Math.round(A(u,["amount"],0)/s.length))}));return{generatedAt:new Date().toISOString(),months:s,salesByProduct:c,salesByCustomer:p,costSimulation:[]}}async function ei(){const e=await ue("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const s=h(n,["code"],"");if(!s)return;const i=h(n,["month"],""),l=parseInt(i.slice(5,7))-1;if(l<0||l>11)return;let c=t.get(s);c||(c={name:h(n,["name"],s),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(s,c)),c.qty[l]+=A(n,["quantity"],0),c.amt[l]+=A(n,["amount"],0)}),Array.from(t.entries()).map(([n,s])=>({code:n,name:s.name,monthlyQuantity:s.qty,monthlyAmount:s.amt,totalQuantity:s.qty.reduce((i,l)=>i+l,0),totalAmount:s.amt.reduce((i,l)=>i+l,0)})).filter(n=>n.totalQuantity>0).sort((n,s)=>s.totalAmount-n.totalAmount)}async function ti(){return(await R("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:h(t,["product_code"],""),productName:h(t,["product_name"],""),forecastMonth:h(t,["forecast_month"],""),segment:h(t,["segment"],"monthly"),avgMonthly:A(t,["avg_monthly"],0),forecastQuantity:A(t,["forecast_quantity"],0),forecastAmount:A(t,["forecast_amount"],0),safetyStock:A(t,["safety_stock"],0),calculatedAt:de(t,["calculated_at"],"")}))}async function ai(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await ue("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(c=>String(c.id)).filter(Boolean);const s=await ue("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),i=new Map;n.forEach(c=>{c.id&&i.set(String(c.id),c)});const l=[];return s.forEach(c=>{const p=String(c.header_id??c.document_header_id??""),u=i.get(p);if(!u)return;const y=u.sales_date??u.document_date??"";!y||y<t||l.push({date:y.slice(0,10),customerName:u.customer_name??"不明",productName:c.product_name??"不明",quantity:ae(c.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),l.sort((c,p)=>c.date.localeCompare(p.date))}async function Fn(){const e=new Date().toISOString();return(await R("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:h(n,["id"],""),message:h(n,["message"],""),level:h(n,["level"],"info"),startsAt:de(n,["starts_at"],""),endsAt:n.ends_at?de(n,["ends_at"],""):null,dismissible:me(n,["dismissible"],!0)}))}async function ni(){const e=await ue("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:h(t,["customer_code"],""),customer_name:h(t,["customer_name"],""),business_type:h(t,["business_type"],""),area_code:h(t,["area_code"],""),phone:h(t,["phone"],""),last_order_date:h(t,["last_order_date"],""),days_since_order:A(t,["days_since_order"],0),amount_12m:A(t,["amount_12m"],0),amount_3m:A(t,["amount_3m"],0),amount_this_month:A(t,["amount_this_month"],0),amount_last_year_same_month:A(t,["amount_last_year_same_month"],0),annual_revenue:A(t,["annual_revenue"],0),is_dormant:me(t,["is_dormant"],!1),is_at_risk:me(t,["is_at_risk"],!1)})):[]}async function si(){return(await ue("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:h(t,["customer_code"],""),customer_name:h(t,["customer_name"],""),phone:h(t,["phone"],""),address:h(t,["address"],""),area_code:h(t,["area_code"],""),business_type:h(t,["business_type"],""),priority_score:A(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:h(t,["last_order_date"],""),days_since_order:A(t,["days_since_order"],0),annual_revenue:A(t,["annual_revenue"],0),recommended_action:h(t,["recommended_action"],"")}))}async function oi(){return(await ue("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:h(t,["product_code"],""),product_name:h(t,["product_name"],""),season_type:h(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:A(t,["avg_monthly_qty"],0)}))}async function ii(){return(await ue("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:h(t,["product_code"],""),name:h(t,["product_name"],""),monthlyQuantity:[A(t,["m01"],0),A(t,["m02"],0),A(t,["m03"],0),A(t,["m04"],0),A(t,["m05"],0),A(t,["m06"],0),A(t,["m07"],0),A(t,["m08"],0),A(t,["m09"],0),A(t,["m10"],0),A(t,["m11"],0),A(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:A(t,["total_quantity"],0),totalAmount:A(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Vn(e,t,n){try{return await et("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function Yn(e,t){return _a("customers",e,t)}async function Jn(e,t){return _a("products",e,t)}async function ra(e,t){const n=e.find(c=>c.code===t);n?.priceGroup;const s=n?.priceGroup||t;let i="";try{const c=await R("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});c[0]?.memo&&(i=(typeof c[0].memo=="string"?JSON.parse(c[0].memo):c[0].memo)?.price_type??"")}catch{}const l=new Map;if(s){const c=await R("customer_product_prices",{price_group:`eq.${s}`,select:"legacy_product_code,special_price"});for(const p of c)l.set(p.legacy_product_code,p.special_price)}return{priceType:i,priceGroup:s,individualPrices:l}}function Da(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function Un(){return(await R("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function ri(){return(await ue("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function li(){return(await R("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function pt(e,t="billing"){const n=await ce("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t});return n?n.map(s=>({code:String(s.legacy_customer_code??""),name:String(s.customer_name??""),address:String(s.address1??""),yearAmount:Number(s.year_amount??0),sharePct:Number(s.share_pct??0),orderDays:Number(s.order_days??0),prevAmount:Number(s.prev_amount??0),growthRate:s.growth_rate!=null?Number(s.growth_rate):null,currentRank:String(s.current_rank??"C"),prevRank:String(s.prev_rank??"")})):[]}async function Qn(){const[e,t]=await Promise.all([R("mv_customer_abc",{order:"amount.desc"}),zt()]),n=e.map(s=>({code:h(s,["code"],""),name:h(s,["name"],""),amount:A(s,["amount"],0),documents:A(s,["documents"],0),ratio:A(s,["ratio"],0),cumRatio:A(s,["cum_ratio"],0),abcRank:h(s,["abc_rank"],"C")}));return{generatedAt:new Date().toISOString(),ranking:n,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function ci(){const[e,t]=await Promise.all([R("mv_product_abc",{order:"amount.desc"}),zt()]),n=e.map(c=>({code:h(c,["code"],""),name:h(c,["name"],""),amount:A(c,["amount"],0),quantity:A(c,["quantity"],0),ratio:A(c,["ratio"],0),cumRatio:A(c,["cum_ratio"],0),abcRank:h(c,["abc_rank"],"C")})),s=n.reduce((c,p)=>c+p.amount,0),i=new Set(n.filter(c=>c.abcRank==="A").map(c=>c.name)),l=t.salesByProduct.filter(c=>i.has(c.label));return{generatedAt:new Date().toISOString(),totalAmount:s,ranking:n,months:t.months,monthlyByProduct:l.length>0?l:t.salesByProduct}}const Hn={planned:"計画中",active:"仕込中",done:"完了"};async function Gn(){const e=await R("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),jikomiNo:h(t,["batch_no","legacy_batch_no"],""),productName:h(t,["brand_name"],""),riceType:h(t,["rice_type"],""),plannedKg:A(t,["planned_rice_kg"],0),actualKg:A(t,["actual_rice_kg"],0),startDate:de(t,["start_date"],""),expectedDoneDate:de(t,["expected_done_date"],""),status:h(t,["status"],"planned"),tankNo:h(t,["tank_no"],""),note:h(t,["remarks"],"")})):[]}async function Kn(){const e=await R("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),tankNo:h(t,["tank_no"],""),capacity:A(t,["capacity_l"],0),currentVolume:A(t,["current_volume_l"],0),productName:h(t,["current_product_code"],""),jikomiNo:h(t,["current_batch_id"],""),status:h(t,["status"],"empty"),lastUpdated:de(t,["last_updated_at"],"")})):[]}async function Xn(){const e=await R("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),kenteiNo:h(t,["kentei_no"],""),jikomiNo:h(t,["batch_id"],""),productName:h(t,["product_code"],""),kenteiDate:de(t,["kentei_date"],""),alcoholDegree:A(t,["alcohol_degree"],0),extractDegree:A(t,["extract_degree"],0),sakaMeterValue:A(t,["sakemeter_value"],0),volume:A(t,["volume_l"],0),taxCategory:h(t,["tax_category_code"],""),status:h(t,["status"],"pending")})):[]}async function la(){const e=await R("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),code:h(t,["material_code","legacy_material_code"],""),name:h(t,["name"],""),unit:h(t,["unit"],""),currentStock:A(t,["current_stock"],0),minimumStock:A(t,["minimum_stock"],0),unitCost:A(t,["unit_cost"],0),lastUpdated:de(t,["updated_at"],"")})):[]}async function Wn(){const e=await R("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),documentNo:h(t,["document_no","legacy_document_no"],""),purchaseDate:de(t,["purchase_date"],""),supplierCode:h(t,["supplier_code","legacy_supplier_code"],""),supplierName:h(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:A(t,["total_amount"],0),status:h(t,["payment_status"],"pending")})):[]}async function Zn(){const e=await R("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:h(t,["supplier_code","legacy_supplier_code"],""),supplierName:h(t,["legacy_supplier_code"],""),totalPurchase:A(t,["total_purchase"],0),paidAmount:A(t,["paid_amount"],0),balance:A(t,["balance"],0),nextPaymentDate:de(t,["next_payment_date"],""),status:h(t,["status"],"unpaid")})):[]}async function es(){const e=await R("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:h(t,["id"],""),billNo:h(t,["bill_no"],""),supplierName:h(t,["counterparty_name"],""),amount:A(t,["amount"],0),issueDate:de(t,["issue_date"],""),dueDate:de(t,["due_date"],""),status:h(t,["status"],"holding")})):[]}async function ts(){const e=await R("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:h(t,["material_code","legacy_material_code"],""),name:h(t,["name"],""),unit:h(t,["unit"],""),currentStock:A(t,["current_stock"],0),minimumStock:A(t,["minimum_stock"],0),lastPurchaseDate:de(t,["last_purchase_date"],""),unitCost:A(t,["unit_cost"],0)})):[]}const as=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],ca={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},di={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function qa(e,t){const n=await R("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const s=n[0],i=h(s,["id"],""),[l,c]=await Promise.all([R("tax_declaration_rows",{declaration_id:`eq.${i}`,order:"tax_category_code.asc"}),R("tax_deductions",{declaration_id:`eq.${i}`})]),p=l.map(y=>({taxCategory:h(y,["tax_category_code"],""),taxCategoryName:h(y,["tax_category_name"],""),alcoholDegree:A(y,["alcohol_degree"],0),volume:A(y,["taxable_volume"],0),taxRate:A(y,["tax_rate"],0),taxAmount:A(y,["tax_amount"],0),productionVolume:A(y,["production_volume"],0),previousBalance:A(y,["previous_balance"],0),currentAdjustment:A(y,["current_adjustment"],0),exportDeduction:A(y,["export_deduction"],0),sampleDeduction:A(y,["sample_deduction"],0),taxableVolume:A(y,["taxable_volume"],0)})),u=c.map(y=>({type:h(y,["deduction_type"],"sample"),categoryCode:h(y,["tax_category_code"],""),volume:A(y,["volume"],0),reason:h(y,["reason"],""),documentNo:h(y,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:h(s,["company_name"],""),companyNo:h(s,["company_no"],""),companyAddress:h(s,["company_address"],""),companyRepresentative:h(s,["company_representative"],""),taxOffice:h(s,["tax_office"],""),rows:p,deductions:u,totalVolume:A(s,["total_taxable_volume"],0),totalTax:A(s,["total_tax_amount"],0),status:h(s,["status"],"draft"),submittedAt:h(s,["submitted_at"],"")||null}}return{...di,targetYear:e,targetMonth:t}}function Se(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function ns(e){const t=e.rows.map(s=>`    <Category>
      <Code>${Se(s.taxCategory)}</Code>
      <Name>${Se(s.taxCategoryName)}</Name>
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
`),n=e.deductions.map(s=>`    <Deduction type="${Se(s.type)}">
      <CategoryCode>${Se(s.categoryCode)}</CategoryCode>
      <Volume>${s.volume}</Volume>
      <Reason>${Se(s.reason)}</Reason>${s.documentNo?`
      <DocumentNo>${Se(s.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${Se(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${Se(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${Se(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${Se(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${Se(e.taxOffice)}</TaxOffice>
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
`}function pi(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function ui(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),s=e.rows.map(l=>[l.taxCategory,l.taxCategoryName,l.alcoholDegree,l.productionVolume,l.previousBalance,l.currentAdjustment,l.exportDeduction,l.sampleDeduction,l.taxableVolume,l.taxRate,l.taxAmount].map(pi).join(",")),i=`,合計,,${e.rows.reduce((l,c)=>l+c.productionVolume,0)},,,${e.rows.reduce((l,c)=>l+c.exportDeduction,0)},${e.rows.reduce((l,c)=>l+c.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...s,i].join(`
`)+`
`}function mi(e){const t=e.rows.map(i=>{const l=Math.max(0,i.productionVolume+i.previousBalance+i.currentAdjustment-i.exportDeduction-i.sampleDeduction),c=Math.round(l*i.taxRate);return{...i,taxableVolume:l,volume:l,taxAmount:c}}),n=t.reduce((i,l)=>i+l.taxableVolume,0),s=t.reduce((i,l)=>i+l.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:s}}async function yi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>G);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:ns(e),submitted_at:e.submittedAt})}async function Ia(e){const t=await R("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:h(n,["id"],""),saleDate:h(n,["sale_date"],e),saleTime:h(n,["sale_time"],""),productCode:h(n,["product_code"],""),productName:h(n,["product_name"],""),quantity:A(n,["quantity"],0),unitPrice:A(n,["unit_price"],0),amount:A(n,["amount"],0),paymentMethod:h(n,["payment_method"],"cash")})):[]}async function ss(){const e=await R("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:h(t,["id"],""),orderNo:h(t,["order_no"],""),orderDate:de(t,["order_date"],""),customerName:h(t,["customer_name"],""),postalCode:h(t,["postal_code"],""),address:h(t,["shipping_address"],""),items:[],totalAmount:A(t,["total_amount"],0),status:h(t,["status"],"new"),shippingDate:de(t,["shipping_date"],"")})):[]}async function Ct(e){const t=await et("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function os(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function hi(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await R("print_layouts",t)).map(s=>({id:h(s,["id"],""),name:h(s,["name"],""),templateKey:h(s,["template_key"],""),positions:s.positions??{},isDefault:me(s,["is_default"],!1),note:h(s,["note"],""),updatedAt:h(s,["updated_at"],"")}))}async function fi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>G);return{supabaseInsert:i}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},s=await t("print_layouts",n);return s?{id:h(s,["id"],e.id),name:h(s,["name"],e.name),templateKey:h(s,["template_key"],e.templateKey),positions:s.positions??e.positions,isDefault:me(s,["is_default"],!1),note:h(s,["note"],""),updatedAt:h(s,["updated_at"],"")}:null}async function gi(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function vi(){return(await R("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:h(t,["id"],""),name:h(t,["name"],""),email:h(t,["email"],""),displayName:h(t,["display_name"],""),signature:h(t,["signature"],""),replyTo:h(t,["reply_to"],""),isDefault:me(t,["is_default"],!1),isVerified:me(t,["is_verified"],!1),note:h(t,["note"],"")}))}async function bi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:h(n,["id"],e.id),name:h(n,["name"],e.name),email:h(n,["email"],e.email),displayName:h(n,["display_name"],""),signature:h(n,["signature"],""),replyTo:h(n,["reply_to"],""),isDefault:me(n,["is_default"],!1),isVerified:me(n,["is_verified"],!1)}:null}async function $i(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const Ta={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},Na={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function wi(e){const t=`${e}-01T00:00:00Z`,[n,s]=e.split("-").map(p=>parseInt(p,10)),i=new Date(n,s,0).getDate(),l=`${e}-${String(i).padStart(2,"0")}T23:59:59Z`;return(await R("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${l})`,order:"starts_at.asc"})).map(p=>({id:h(p,["id"],""),title:h(p,["title"],""),description:h(p,["description"],""),category:h(p,["category"],"general")||"general",startsAt:h(p,["starts_at"],new Date().toISOString()),endsAt:h(p,["ends_at"],""),isAllDay:me(p,["is_all_day"],!1),location:h(p,["location"],""),attendees:p.attendees??[],relatedCustomerCode:h(p,["related_customer_code"],""),relatedOrderId:h(p,["related_order_id"],""),color:h(p,["color"],""),googleEventId:h(p,["google_event_id"],"")}))}async function _i(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??Na[e.category],updated_at:new Date().toISOString()})?e:null}async function xi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function is(){return(await R("integration_settings",{order:"name.asc"})).map(t=>({id:h(t,["id"],""),name:h(t,["name"],""),provider:h(t,["provider"],""),config:t.config??{},isEnabled:me(t,["is_enabled"],!1),lastSyncAt:h(t,["last_sync_at"],""),lastStatus:h(t,["last_status"],"")}))}async function gt(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function Si(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const s=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,i=await fetch(s,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!i.ok)return{count:0,error:`HTTP ${i.status}`};const l=await i.json(),{supabaseInsert:c}=await q(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>G);return{supabaseInsert:u}},void 0);let p=0;for(const u of l.orders){const y=`shopify_${u.id}`;await c("shopify_orders",{id:y,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),p++}return await gt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得成功`}),{count:p}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function ki(){return(await R("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:h(t,["id"],""),shopifyOrderId:h(t,["shopify_order_id"],""),orderNumber:h(t,["order_number"],""),orderDate:h(t,["order_date"],""),customerName:h(t,["customer_name"],""),customerEmail:h(t,["customer_email"],""),totalAmount:ae(t.total_amount),financialStatus:h(t,["financial_status"],""),fulfillmentStatus:h(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function Pi(e){const t=e.config.refresh_token,n=e.config.client_id,s=e.config.client_secret;if(!t||!n||!s)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const i=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:s})});if(!i.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${i.status}`};const c=(await i.json()).access_token;return await gt({...e,config:{...e.config,oauth_token:c}}),e.config.oauth_token=c,{token:c}}async function Ei(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const s=new Date().toISOString(),i=new Date(Date.now()+30*86400*1e3).toISOString(),l=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${s}&timeMax=${i}&singleEvents=true&orderBy=startTime`;let c=await fetch(l,{headers:{Authorization:`Bearer ${t}`}});if(c.status===401){const g=await Pi(e);if(g.error)return{count:0,error:g.error};t=g.token,c=await fetch(l,{headers:{Authorization:`Bearer ${t}`}})}if(!c.ok)return{count:0,error:`HTTP ${c.status}`};const p=await c.json(),{supabaseInsert:u}=await q(async()=>{const{supabaseInsert:g}=await Promise.resolve().then(()=>G);return{supabaseInsert:g}},void 0);let y=0;for(const g of p.items){const f=`gcal_${g.id}`,b=g.start?.dateTime??g.start?.date??"",S=g.end?.dateTime??g.end?.date??"";await u("calendar_events",{id:f,title:String(g.summary??"(無題)"),description:String(g.description??""),category:"general",starts_at:String(b),ends_at:String(S),location:String(g.location??""),google_event_id:String(g.id??""),updated_at:new Date().toISOString()}),y++}return await gt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${y}件取得`}),{count:y}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function Ai(){return(await R("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:h(t,["id"],""),receivedAt:h(t,["received_at"],""),senderPhone:h(t,["sender_phone"],""),senderName:h(t,["sender_name"],""),imageUrl:h(t,["image_url"],""),ocrStatus:h(t,["ocr_status"],"pending")||"pending",ocrText:h(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:h(t,["linked_invoice_id"],"")}))}async function Ci(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const s=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,i=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return i.ok?{text:(await i.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${i.status}`}}catch(s){return{text:"",error:s instanceof Error?s.message:String(s)}}}async function Li(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const It={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},Tt={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function Di(){return(await R("user_profiles",{order:"display_name.asc"})).map(t=>({id:h(t,["id"],""),email:h(t,["email"],""),displayName:h(t,["display_name"],""),staffCode:h(t,["staff_code"],""),department:h(t,["department"],"all")||"all",role:h(t,["role"],"staff")||"staff",defaultMailSenderId:h(t,["default_mail_sender_id"],""),phone:h(t,["phone"],""),avatarUrl:h(t,["avatar_url"],""),isActive:me(t,["is_active"],!0),lastSignInAt:h(t,["last_sign_in_at"],""),createdAt:h(t,["created_at"],"")}))}async function qi(e){if(!e)return null;const t=await R("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:h(n,["id"],""),email:h(n,["email"],""),displayName:h(n,["display_name"],""),staffCode:h(n,["staff_code"],""),department:h(n,["department"],"all")||"all",role:h(n,["role"],"staff")||"staff",defaultMailSenderId:h(n,["default_mail_sender_id"],""),phone:h(n,["phone"],""),avatarUrl:h(n,["avatar_url"],""),isActive:me(n,["is_active"],!0),lastSignInAt:h(n,["last_sign_in_at"],"")}}async function Ii(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function Ti(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Ni(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>G);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function Oi(e=100){return(await R("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:h(n,["id"],""),action:h(n,["action"],""),entityType:h(n,["entity_type"],""),entityId:h(n,["entity_id"],""),userEmail:h(n,["user_email"],""),changes:n.changes??{},createdAt:h(n,["created_at"],"")}))}const Nt={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function rs(){return(await R("slack_notifications",{order:"event_type.asc"})).map(t=>({id:h(t,["id"],""),eventType:h(t,["event_type"],"new_order"),enabled:me(t,["enabled"],!0),channel:h(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:h(t,["last_triggered_at"],"")}))}async function Mi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function Ri(e=50){return(await R("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:h(n,["id"],""),eventType:h(n,["event_type"],""),channel:h(n,["channel"],""),message:h(n,["message"],""),status:h(n,["status"],"sent"),error:h(n,["error"],""),sentAt:h(n,["sent_at"],"")}))}async function ji(e,t,n){const i=(await is()).find(y=>y.provider==="slack");if(!i||!i.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const l=i.config.webhook_url;if(!l)return{ok:!1,error:"Webhook URL未設定"};const p=(await rs()).find(y=>y.eventType===e&&y.enabled);if(!p)return{ok:!1,error:"通知ルールが無効"};const u=n??p.channel??i.config.default_channel??"#general";try{const y=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${Nt[e]} ${t}`,channel:u})}),g=y.ok,{supabaseInsert:f}=await q(async()=>{const{supabaseInsert:b}=await Promise.resolve().then(()=>G);return{supabaseInsert:b}},void 0);return await f("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:g?"sent":"failed",error:g?null:`HTTP ${y.status}`}),g?{ok:!0}:{ok:!1,error:`HTTP ${y.status}`}}catch(y){return{ok:!1,error:y instanceof Error?y.message:String(y)}}}const Bt={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},Oa={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function zi(){return(await R("prospects",{order:"updated_at.desc"})).map(t=>({id:h(t,["id"],""),companyName:h(t,["company_name"],""),contactName:h(t,["contact_name"],""),email:h(t,["email"],""),phone:h(t,["phone"],""),address:h(t,["address"],""),website:h(t,["website"],""),businessType:h(t,["business_type"],""),stage:h(t,["stage"],"cold"),source:h(t,["source"],""),expectedAmount:ae(t.expected_amount),probability:ae(t.probability),assignedStaffCode:h(t,["assigned_staff_code"],""),nextActionDate:h(t,["next_action_date"],""),nextAction:h(t,["next_action"],""),note:h(t,["note"],""),lastContactAt:h(t,["last_contact_at"],""),wonAt:h(t,["won_at"],""),lostAt:h(t,["lost_at"],""),lostReason:h(t,["lost_reason"],""),convertedCustomerCode:h(t,["converted_customer_code"],""),createdAt:h(t,["created_at"],"")}))}async function ls(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()})?e:null}async function Bi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/prospects","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Fi(e){return(await R("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:h(n,["id"],""),prospectId:h(n,["prospect_id"],""),activityType:h(n,["activity_type"],"call"),title:h(n,["title"],""),description:h(n,["description"],""),activityDate:h(n,["activity_date"],""),result:h(n,["result"],""),staffCode:h(n,["staff_code"],"")}))}async function Vi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const cs=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function Yi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function Ji(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Ui(){return(await ue("v_customer_map")).filter(t=>t.lat&&t.lng).map(t=>({customerCode:h(t,["customer_code"],""),name:h(t,["name"],""),phone:h(t,["phone"],""),areaCode:h(t,["area_code"],""),businessType:h(t,["business_type"],""),businessTypeName:h(t,["business_type_name"],""),address1:h(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:me(t,["is_at_risk"],!1),isDormant:me(t,["is_dormant"],!1),amount12m:A(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}const Ft=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function Qi(){return(await ue("customer_churn_notes")).map(t=>({customerCode:h(t,["customer_code"],""),reason:h(t,["reason"],""),memo:h(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:h(t,["updated_at"],"")}))}async function Hi(e){const{supabaseUpsert:t}=await q(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>G);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function Gi(){return(await R("delivery_locations",{order:"name.asc"})).map(t=>({id:h(t,["id"],""),customerCode:h(t,["customer_code"],""),name:h(t,["name"],""),postalCode:h(t,["postal_code"],""),address:h(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:h(t,["contact_name"],""),phone:h(t,["phone"],""),deliveryNote:h(t,["delivery_note"],""),isActive:me(t,["is_active"],!0)}))}async function Ki(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function Xi(e=50){return(await R("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:h(n,["id"],""),callDirection:h(n,["call_direction"],"inbound"),fromNumber:h(n,["from_number"],""),toNumber:h(n,["to_number"],""),matchedCustomerCode:h(n,["matched_customer_code"],""),matchedProspectId:h(n,["matched_prospect_id"],""),durationSeconds:ae(n.duration_seconds),callStatus:h(n,["call_status"],"answered"),recordingUrl:h(n,["recording_url"],""),transcript:h(n,["transcript"],""),ivryCallId:h(n,["ivry_call_id"],""),startedAt:h(n,["started_at"],""),endedAt:h(n,["ended_at"],""),notes:h(n,["notes"],"")}))}async function ds(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function Wi(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const s=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,i=await fetch(s,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!i.ok)return{count:0,error:`HTTP ${i.status}`};const c=(await i.json()).calls??[];let p=0;for(const u of c)await ds({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),p++;return await gt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得`}),{count:p}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function Zi(e,t){const n=e.config.api_key,s=e.config.team_id;if(!n||!s)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let i=0;for(const l of t){if(!l.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${s}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:l.name,phone_number:l.phone,external_id:l.customerCode??"",note:l.note??""})})).ok&&i++}return{synced:i}}catch(i){return{synced:0,error:i instanceof Error?i.message:String(i)}}}async function er(){return(await R("lead_lists",{order:"created_at.desc"})).map(t=>({id:h(t,["id"],""),name:h(t,["name"],""),query:h(t,["query"],""),area:h(t,["area"],""),businessType:h(t,["business_type"],""),totalCount:ae(t.total_count),source:h(t,["source"],"manual"),createdAt:h(t,["created_at"],"")}))}async function tr(e){return(await R("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:h(n,["id"],""),listId:h(n,["list_id"],""),companyName:h(n,["company_name"],""),address:h(n,["address"],""),phone:h(n,["phone"],""),website:h(n,["website"],""),email:h(n,["email"],""),businessType:h(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:ae(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:h(n,["place_id"],""),status:h(n,["status"],"new"),convertedProspectId:h(n,["converted_prospect_id"],""),note:h(n,["note"],"")}))}async function ar(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function ps(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function nr(e,t,n){const s=e.config.api_key;if(!s)return{results:[],error:"Google Maps API key 未設定"};const i=`${t} ${n}`.trim(),l=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(i)}&language=ja&key=${s}`;try{const c=await fetch(l);if(!c.ok)return{results:[],error:`HTTP ${c.status}`};const p=await c.json();return p.status!=="OK"&&p.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${p.status}`}:{results:p.results.map(y=>{const g=y.geometry?.location;return{id:`place_${y.place_id}`,listId:"",companyName:String(y.name??""),address:String(y.formatted_address??""),rating:y.rating?Number(y.rating):void 0,reviewCount:y.user_ratings_total?Number(y.user_ratings_total):void 0,lat:g?.lat,lng:g?.lng,placeId:String(y.place_id??""),status:"new"}})}}catch(c){return{results:[],error:c instanceof Error?c.message:String(c)}}}async function sr(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await ls(t);return n&&await ps({...e,status:"imported",convertedProspectId:t.id}),n}async function or(){return(await R("workflow_orders",{order:"order_date.desc"})).map(t=>({id:h(t,["id"],""),orderNo:h(t,["order_no"],""),customerName:h(t,["customer_name"],""),customerCode:h(t,["customer_code"],""),orderDate:h(t,["order_date"],""),deliveryDate:h(t,["delivery_date"],""),stage:h(t,["stage"],"new"),totalAmount:ae(t.total_amount),itemCount:ae(t.item_count),priority:h(t,["priority"],"normal"),staffName:h(t,["staff_name"],""),notes:h(t,["notes"],"")}))}async function ir(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function rr(){return(await R("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:h(t,["id"],""),name:h(t,["name"],""),email:h(t,["email"],""),phone:h(t,["phone"],""),visitDate:h(t,["visit_date"],""),partySize:ae(t.party_size)||1,language:h(t,["language"],"ja"),purpose:h(t,["purpose"],""),message:h(t,["message"],""),status:h(t,["status"],"new"),repliedAt:h(t,["replied_at"],""),confirmedTime:h(t,["confirmed_time"],""),createdAt:h(t,["created_at"],new Date().toISOString())}))}async function lr(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>G);return{supabaseInsert:s}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const cr=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function us(){return(await Promise.all(cr.map(async t=>{const[n,s]=await Promise.all([xa(t.table),R(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:s[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Lt(e,t,n=100){const s=(t-1)*n,[i,l]=await Promise.all([R(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(s)}),xa(e)]);return{records:i,total:l}}async function da(e){const t=await R("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const s=JSON.parse(n);return String(s.price_group??"")}catch{return""}return""}async function ms(e,t){if(e){const s=await R("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(s.length>0&&s[0].special_price)return ae(s[0].special_price)}const n=await R("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?ae(n[0].default_sale_price):0}const dr=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],pr=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],ur={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function mr(){const e=new Date,t=[];for(let u=11;u>=0;u--){const y=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`)}const n=dr,s={},i={};for(const u of n){s[u.code]={};for(const y of t){const g=parseInt(y.split("-")[1])-1,f=ur[u.code]??100,b=Math.round(f*pr[g]*(.85+Math.random()*.3));s[u.code][y]=b,i[y]=(i[y]??0)+b}}const l={},c={},p={};for(const u of n){const y=t.map(b=>s[u.code][b]??0),g=y.reduce((b,S)=>b+S,0)/y.length,f=y.reduce((b,S)=>b+(S-g)**2,0)/y.length;l[u.code]=y.reduce((b,S)=>b+S,0),c[u.code]=g,p[u.code]=Math.sqrt(f)}return{months:t,products:n,matrix:s,totals:i,productTotals:l,productAvg:c,productStdDev:p}}async function yr(e=36){const t=(()=>{const b=new Date;return b.setMonth(b.getMonth()-e),`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`})(),n=await ue("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"});if(n.length===0)return mr();const s=new Set,i=new Map,l={},c={};for(const b of n){const S=h(b,["year_month"],""),P=h(b,["product_code"],""),o=h(b,["product_name"],P),r=A(b,["quantity"],0);!S||!P||(s.add(S),i.set(P,o),l[P]||(l[P]={}),l[P][S]=r,c[S]=(c[S]??0)+r)}const p=[...s].sort(),u=[...i.entries()].map(([b,S])=>({code:b,name:S})),y={},g={},f={};for(const b of u){const S=p.map(r=>l[b.code]?.[r]??0),P=S.reduce((r,d)=>r+d,0)/(S.length||1),o=S.reduce((r,d)=>r+(d-P)**2,0)/(S.length||1);y[b.code]=S.reduce((r,d)=>r+d,0),g[b.code]=P,f[b.code]=Math.sqrt(o)}return{months:p,products:u,matrix:l,totals:c,productTotals:y,productAvg:g,productStdDev:f}}async function hr(){return(await R("product_safety_stock_params",{order:"product_code.asc"})).map(t=>({productCode:h(t,["product_code"],""),productName:h(t,["product_name"],""),unit:h(t,["unit"],"本"),avgMonthlyDemand:A(t,["avg_monthly_demand"],0),demandStdDev:A(t,["demand_std_dev"],0),leadTimeDays:A(t,["lead_time_days"],30),serviceLevel:A(t,["service_level"],.95),safetyStockQty:A(t,["safety_stock_qty"],0),reorderPoint:A(t,["reorder_point"],0),memo:h(t,["memo"],""),productionType:h(t,["production_type"],"monthly")}))}async function fr(e){return(await R("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:h(n,["id"],""),yearMonth:h(n,["year_month"],e),productCode:h(n,["product_code"],""),productName:h(n,["product_name"],""),demandForecast:A(n,["demand_forecast"],0),safetyStockTarget:A(n,["safety_stock_target"],0),openingStock:A(n,["opening_stock"],0),requiredProduction:A(n,["required_production"],0),plannedQty:A(n,["planned_qty"],0),actualQty:A(n,["actual_qty"],0),status:h(n,["status"],"draft"),productionType:h(n,["production_type"],"monthly"),notes:h(n,["notes"],"")}))}async function gr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>G);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:i}},void 0);if(!n||e.length===0)return!1;try{const s=e.map(c=>({product_code:c.productCode,product_name:c.productName,unit:c.unit,avg_monthly_demand:c.avgMonthlyDemand,demand_std_dev:c.demandStdDev,lead_time_days:c.leadTimeDays,service_level:c.serviceLevel,safety_stock_qty:c.safetyStockQty,reorder_point:c.reorderPoint,production_type:c.productionType,memo:c.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),i=new URL("/rest/v1/product_safety_stock_params",t),l=await fetch(i.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(s)});if(!l.ok){const c=await l.text();return console.error("saveSafetyStockParamsBulk failed:",l.status,c),!1}return!0}catch(s){return console.error("saveSafetyStockParamsBulk error:",s),!1}}async function vr(e){const{supabaseUpsert:t}=await q(async()=>{const{supabaseUpsert:s}=await Promise.resolve().then(()=>G);return{supabaseUpsert:s}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function br(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}async function $r(e){const[t,n]=e.split("-").map(Number),s=`${e}-01`,i=new Date(t,n,0).getDate(),l=`${e}-${String(i).padStart(2,"0")}`,c=await ue("sales_document_headers",{select:"sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${s},sales_date.lte.${l})`,order:"sales_date.asc"}),p=await ue("customers",{select:"id,address1",address1:"not.is.null"}),u={};for(const g of p)g.address1&&(u[g.id]=br(g.address1));const y={};for(const g of c){const f=g.sales_date;if(!f)continue;const b=u[g.legacy_customer_code]||"住所未登録",S=Number(g.total_amount)||0;y[f]||(y[f]={date:f,entries:[],cityGroups:[],totalAmount:0,count:0}),y[f].entries.push({customerCode:g.legacy_customer_code||"",customerName:g.customer_name||"",city:b,amount:S}),y[f].totalAmount+=S,y[f].count++}for(const g of Object.values(y)){const f={};for(const b of g.entries)f[b.city]=(f[b.city]||0)+1;g.cityGroups=Object.entries(f).sort((b,S)=>S[1]-b[1]).map(([b,S])=>({city:b,count:S}))}return y}async function Ma(){return R("quotes",{select:"id,quote_no,quote_date,valid_until,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function ys(e){const t=await R("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await R("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function wr(){const e=new Date().toISOString().slice(0,7)+"-01";return ue("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}const N=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:Na,CALENDAR_CATEGORY_LABELS:Ta,CHURN_REASONS:Ft,DEPT_LABELS:Tt,INVOICE_TYPE_LABELS:ia,JIKOMI_STATUS_LABELS:Hn,MATERIAL_CATEGORIES:cs,PROSPECT_STAGE_COLORS:Oa,PROSPECT_STAGE_LABELS:Bt,ROLE_LABELS:It,SEASONAL_TEMPLATES:ka,SLACK_EVENT_LABELS:Nt,TAX_DEDUCTION_LABELS:ca,TAX_RATE_CATEGORIES:as,addBrewingCustomCategory:Jo,addBrewingStockEntry:Bo,convertLeadToProspect:sr,deleteBrewingCustomCategory:Qo,deleteBrewingStockEntry:Vo,deleteCalendarEvent:xi,deleteMailSender:$i,deleteMaterial:Ji,deletePrintLayout:gi,deleteProspect:Bi,deleteUserProfile:Ti,fetchAllBrewingStockEntries:zo,fetchAnalyticsByPeriod:po,fetchAnnouncements:Fn,fetchAuditLogs:Oi,fetchAvailablePeriods:uo,fetchAvailableProductionTypes:Lo,fetchBillList:es,fetchBillingSummary:La,fetchBrewingAlcoholSettings:Do,fetchBrewingCategoryOverrides:Go,fetchBrewingCustomCategories:Yo,fetchBrewingForecastOverrides:To,fetchBrewingMonthlyTrend:_o,fetchBrewingPlanSummary:wo,fetchBrewingProductDetail:xo,fetchBrewingRiceParams:Oo,fetchBrewingSchedule:So,fetchBrewingSeasonalPattern:Ro,fetchBrewingStockEntries:jo,fetchBrewingYearlyShipments:Io,fetchCalendarEvents:wi,fetchCallLogs:Xi,fetchCategoryTypeLinks:Eo,fetchChurnAlerts:ni,fetchChurnNotes:Qi,fetchCustomerAnalysis:Qn,fetchCustomerEfficiency:li,fetchCustomerEfficiencyByYear:pt,fetchCustomerLedger:Ea,fetchCustomerPriceGroup:da,fetchCustomerPricing:ra,fetchCustomerProductBreakdown:vo,fetchDeliveryLocations:Gi,fetchDeliveryNote:Ca,fetchDeliverySchedule:ai,fetchDemandAnalysis:yr,fetchDemandForecasts:ti,fetchEntityMonthlySales:$o,fetchFaxInbox:Ai,fetchIntegrationSettings:is,fetchInvoices:ht,fetchJikomiList:Gn,fetchKenteiList:Xn,fetchLabelExclusions:Ko,fetchLeadItems:tr,fetchLeadLists:er,fetchMailSenders:vi,fetchMapCustomers:Ui,fetchMasterStats:Pa,fetchMaterialList:la,fetchMyProfile:qi,fetchOrderHeaders:wr,fetchPayableList:Zn,fetchPaymentStatus:On,fetchPeriodChartData:fo,fetchPipelineMeta:Mn,fetchPrintLayouts:hi,fetchProductABC:ci,fetchProductCustomerBreakdown:bo,fetchProductDaily:ri,fetchProductMonthlyShipments:ei,fetchProductPower:Un,fetchProductPrice:ms,fetchProductShipmentsFromTable:ii,fetchProductionPlan:fr,fetchProspectActivities:Fi,fetchProspects:zi,fetchPurchaseList:Wn,fetchQuoteList:Ma,fetchQuoteWithLines:ys,fetchRawMaterialStock:ts,fetchRawRecords:Lt,fetchRawTableList:us,fetchSafetyStockParams:hr,fetchSalesAnalytics:Aa,fetchSalesReport:zt,fetchSalesSummary:Nn,fetchSeasonalProfiles:oi,fetchShipmentCalendar:$r,fetchShopifyOrders:ki,fetchSlackLogs:Ri,fetchSlackRules:rs,fetchStaffCustomerBreakdown:yo,fetchStaffProductBreakdown:ho,fetchStaffTotalsByPeriod:mo,fetchStoreOrders:ss,fetchStoreSales:Ia,fetchSyncDashboard:Rn,fetchSystemSetting:Tn,fetchTankList:Kn,fetchTaxDeclaration:qa,fetchTourInquiriesFromDb:rr,fetchTypesInCategory:Uo,fetchUserProfiles:Di,fetchVisitPriorities:si,fetchWorkflowOrdersFromDb:or,generateTaxCSV:ui,generateTaxXML:ns,linkTypeToCategory:Ao,ocrFaxImage:Ci,periodToDateRange:jn,prevYearFilter:go,reassignBrewingStockEntry:Fo,recalculateTaxDeclaration:mi,recordAudit:Ni,resolveProductPrice:Da,saveBrewingAlcoholSetting:qo,saveBrewingForecastOverride:No,saveBrewingRiceParams:Mo,saveBrewingSchedule:ko,saveCalendarEvent:_i,saveCallLog:ds,saveChurnNote:Hi,saveDeliveryLocation:Ki,saveEmailCampaign:Ct,saveFaxRecord:Li,saveIntegrationSetting:gt,saveInvoice:Bn,saveLabelExclusions:Xo,saveLeadItem:ps,saveLeadList:ar,saveMailSender:bi,saveMaterial:Yi,savePrintLayout:fi,saveProductionPlan:vr,saveProspect:ls,saveProspectActivity:Vi,saveSafetyStockParamsBulk:gr,saveSlackRule:Mi,saveTaxDeclaration:yi,saveTourInquiry:lr,saveUserProfile:Ii,saveWorkflowOrder:ir,searchPlaces:nr,sendEmailCampaign:os,sendSlackNotification:ji,setBrewingCategoryOverride:Ho,submitFeatureRequest:Vn,syncGoogleCalendar:Ei,syncIvryCallLogs:Wi,syncPhoneBookToIvry:Zi,syncShopifyOrders:Si,unlinkTypeFromCategory:Co,updateCustomer:Yn,updateProduct:Jn,upsertBrewingStock:Po,upsertSystemSetting:Ge},Symbol.toStringTag,{value:"Module"}));function Ye(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const _r={open:"未締め",closed:"締め済"};function xr(e,t){const n=e.customers.map(s=>`
      <tr>
        <td>
          <div class="table-title">${s.customerName}</div>
          <div class="table-sub mono">${s.customerCode}</div>
        </td>
        <td class="numeric">${s.closingDay}日</td>
        <td class="numeric">${Ye(s.salesAmount)}</td>
        <td class="numeric">${Ye(s.taxAmount)}</td>
        <td class="numeric">${Ye(s.prevBalance)}</td>
        <td class="numeric">${Ye(s.paymentAmount)}</td>
        <td class="numeric"><strong>${Ye(s.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${_r[s.status]}</span>
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
        <p class="kpi-value">${Ye(e.totalBilling)}</p>
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
  `}const Sr={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},kr={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function Ga(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function vt(e){const t=kr[e],n=Sr[e].map(s=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Ga(s.title)}</p>
            <p class="category-card-description">${Ga(s.description)}</p>
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
  `}function hs(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function ut(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Pr(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${hs(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${ut(t.amount)}</td>
        </tr>
      `).join("")}function Er(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${hs(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${ut(t.amount)}</td>
        </tr>
      `).join("")}function Ar(e,t){return`
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
            <dd>${ut(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${ut(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${ut(e.balanceAmount)}</dd>
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
            <tbody>${Pr(e)}</tbody>
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
            <tbody>${Er(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function nt(e,t,n){const s=e.findIndex(l=>l.column===t);if(s>=0){if(e[s].direction==="asc"){const c=[...e];return c[s]={column:t,direction:"desc"},c}return e.filter((c,p)=>p!==s)}const i={column:t,direction:"asc"};return n?[...e,i]:[i]}function Cr(e,t){const n=e.findIndex(l=>l.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const s=e[n].direction==="asc"?"↑":"↓",i=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${s}${i}</span>`}function H(e,t,n,s=""){return`<th class="sortable ${s}" data-sort-col="${e}">${t} ${Cr(n,e)}</th>`}function Ka(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function We(e,t,n){return t.length===0?e:[...e].sort((s,i)=>{for(const{column:l,direction:c}of t){const p=n[l];if(!p)continue;const u=Ka(s[p]),y=Ka(i[p]);let g=0;if(typeof u=="number"&&typeof y=="number"?g=u-y:g=String(u).localeCompare(String(y),"ja"),g!==0)return c==="asc"?g:-g}return 0})}const Lr={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},Xa={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},st={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function Dr(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function qr(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function Ir(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function fs(e,t){const n=qr(t),s=Ir(t),[i,l]=t.split("-").map(Number),c=new Map;e.forEach($=>{if($.date.slice(0,7)===t){const w=$.date.slice(0,10);c.has(w)||c.set(w,[]),c.get(w).push($)}});const p=e.filter($=>$.date.slice(0,7)===t),u=p.reduce(($,w)=>$+w.quantity,0),y=new Set(p.map($=>$.date)).size,g=new Date().toISOString().slice(0,10),f=["日","月","火","水","木","金","土"].map($=>`<th class="dcal-header">${$}</th>`).join("");let b="",S=1;for(let $=0;$<6&&!(S>n&&$>0);$++){b+="<tr>";for(let w=0;w<7;w++)if($===0&&w<s||S>n)b+='<td class="dcal-cell dcal-empty"></td>';else{const x=`${i}-${String(l).padStart(2,"0")}-${String(S).padStart(2,"0")}`,k=c.get(x)||[],E=x===g,C=k.reduce((D,O)=>D+O.quantity,0);b+=`
          <td class="dcal-cell ${E?"dcal-today":""}">
            <div class="dcal-day">${S}</div>
            ${k.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${k[0].status}">${k.length}件 ${C}本</div>
              </div>
            `:""}
          </td>`,S++}b+="</tr>"}const[P,o]=l===1?[i-1,12]:[i,l-1],[r,d]=l===12?[i+1,1]:[i,l+1],m=`${P}-${String(o).padStart(2,"0")}`,v=`${r}-${String(d).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${i}年${l}月: ${y}日稼働 / ${p.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${m}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${i}年${l}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${v}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${f}</tr></thead>
        <tbody>${b}</tbody>
      </table>
    </section>
  `}function Tr(e,t){const n=t==="all"?e:e.filter(p=>p.segment===t),s={all:e.length};e.forEach(p=>{s[p.segment]=(s[p.segment]??0)+1});const l=["all",...[...new Set(e.map(p=>p.segment))]].map(p=>`
      <button class="button ${t===p?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${p}">
        ${p==="all"?"全て":Xa[p]??p} (${s[p]??0})
      </button>
    `).join(""),c=n.map(p=>`
      <tr>
        <td class="mono">${p.code}</td>
        <td>${p.name}</td>
        <td><span class="segment-badge" style="background:${st[p.segment]??"#718096"};">${Xa[p.segment]??p.segment}</span></td>
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
            <li><span class="segment-badge" style="background:${st.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${st["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${st["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${st["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
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
  `}function Nr(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${fs(e.deliveries,e.calendarMonth)}
    ${Tr(e.forecasts,e.selectedSegment)}
  `}function Or(e,t){return fs(e,t)}const bt={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function Wa(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function Ut(e,t,n){if(t==="all")return e;const s=new Date,i=s.toISOString().slice(0,10),l=new Date(s);switch(t){case"today":return e.filter(c=>c.date.slice(0,10)===i);case"month":return e.filter(c=>c.date.slice(0,7)===i.slice(0,7));case"future":{const c=new Date(s.getFullYear(),s.getMonth(),1).toISOString().slice(0,10);return e.filter(p=>p.date.slice(0,10)>=c)}case"90days":return l.setDate(l.getDate()-90),e.filter(c=>c.date>=l.toISOString());case"year":return l.setFullYear(l.getFullYear()-1),e.filter(c=>c.date>=l.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(c=>{const p=c.date.slice(0,10);return p>=n.start&&p<=n.end})}}function be(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Qt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Mr(e){const s={top:20,right:20,bottom:30,left:50},i=760-s.left-s.right,l=260-s.top-s.bottom,c=Math.max(...e.map(g=>g.amount),1),p=i/e.length,u=e.map((g,f)=>{const b=g.amount/c*l,S=s.left+f*p+4,P=s.top+l-b,o=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(g.date));return`
        <g>
          <rect x="${S}" y="${P}" width="${Math.max(p-8,8)}" height="${b}" rx="4" fill="#0F5B8D" opacity="${.58+f/e.length*.34}" />
          ${f%5===0?`<text x="${S+6}" y="252" class="chart-axis">${o}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(g=>{const f=s.top+l-l*g,b=Math.round(c*g/1e3);return`
        <g>
          <line x1="${s.left}" y1="${f}" x2="${760-s.right}" y2="${f}" class="chart-grid" />
          <text x="6" y="${f+4}" class="chart-axis">${b.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function Rr(e,t,n,s,i="month",l,c=[]){const p={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=Ut(e.allDailySales,i,l),y=u.reduce((j,U)=>j+U.amount,0),g=u.reduce((j,U)=>j+U.bottles,0),f=u.reduce((j,U)=>j+U.volumeMl,0),b=u.length,S=g>0?Math.round(y/g):0,P=f>0?Math.round(y/(f/1e3)):0,o=new Date,r=o.toISOString().slice(0,10),d=r.slice(0,7),m=Ut(e.allDailySales,"month").filter(j=>j.date.slice(0,10)<=r),v=m.reduce((j,U)=>j+U.amount,0);m.reduce((j,U)=>j+U.bottles,0);const $=o.getDate();new Date(o.getFullYear(),o.getMonth()+1,0).getDate();const x=(s?.orderHeaders??[]).filter(j=>j.sales_date.slice(0,7)===d),k=x.reduce((j,U)=>j+Number(U.total_amount),0),E=x.length,C=Ut(e.allDailySales,"month"),D=C.reduce((j,U)=>j+U.bottles,0),O=k>0?k:C.reduce((j,U)=>j+U.amount,0),L=k>0?"orders":"extrapolation",M=(u.length>0?e.allDailySales.filter(j=>{const U=u[0]?.date??"",Z=u[u.length-1]?.date??"",re=Wa(U,-1),ie=Wa(Z,-1);return j.date>=re&&j.date<=ie}):[]).reduce((j,U)=>j+U.amount,0),B=M>0?(y-M)/M*100:0,z=B>0?"+":"",Q=e.salesRecords.slice(0,10).map(j=>`
            <tr>
              <td class="mono">${j.documentNo}</td>
              <td>${Qt(j.date)}</td>
              <td>${j.customerName}</td>
              <td class="numeric">${be(j.amount)}</td>
            </tr>
          `).join(""),F=["today","month","future","90days","year","all"].map(j=>`<button class="button ${j===i?"primary":"secondary"} small" type="button" data-period="${j}">${bt[j]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${p[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${Qt(t.lastSyncAt)}</span>
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
        <p class="kpi-value">${be(e.kpis.todaySales)}</p>
        <p class="kpi-sub">${e.kpis.todaySales>0?`${new Date().getMonth()+1}/${new Date().getDate()} 時点`:"本日データなし"}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月実績（本日まで）</p>
        <p class="kpi-value">${be(v)}</p>
        <p class="kpi-sub">${$}日経過 / ${m.length}営業日 / 日平均 ${m.length>0?be(Math.round(v/m.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${be(O)}</p>
        <p class="kpi-sub">${L==="orders"?`受注確定 ${E}件`:`出荷見込 ${D.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${B>=0?"#2f855a":"#c53d3d"}">${M>0?`${z}${B.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${M>0?be(M):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${be(e.kpis.unpaidAmount)}</p>
      </article>
    </section>

    ${i!=="month"?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">${bt[i]}売上</p>
        <p class="kpi-value">${be(y)}</p>
        <p class="kpi-sub">${b}日間${b>0?` / 日平均 ${be(Math.round(y/b))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${g.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${be(S)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(f/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${be(P)}</p>
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
            <p class="panel-caption">${bt[i]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${Mr(u.length>0?u:e.dailySales)}
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
              <dd>${Qt(t.lastSyncAt)}</dd>
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
          <tbody>${Q}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${bt[i]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${H("date","日付",c)}
              ${H("amount","売上",c,"numeric")}
              ${H("bottles","本数",c,"numeric")}
              ${H("volumeMl","液体量(L)",c,"numeric")}
              ${H("pricePerBottle","本単価",c,"numeric")}
              ${H("pricePerLiter","L単価",c,"numeric")}
            </tr>
          </thead>
          <tbody>${We(c.length>0?u:u.slice().reverse(),c,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(j=>`
            <tr>
              <td class="mono">${j.date.slice(0,10)}</td>
              <td class="numeric">${be(j.amount)}</td>
              <td class="numeric">${j.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(j.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${be(j.pricePerBottle)}</td>
              <td class="numeric">${be(j.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${s?jr(s):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function jr(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(p=>p.startsAt.slice(0,10)>=t).slice(0,5),s=e.tourInquiries.filter(p=>p.status==="new").length,i=e.churnSummary,l=i?i.atRiskCount+i.dormantCount+i.decliningCount:null,c=i?`<article class="panel kpi-card ${i.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
        <p class="panel-title">🔴 要対応顧客</p>
        <p class="kpi-value">${l}社</p>
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
        ${n.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${n.map(p=>{const u=new Date(p.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${p.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${u.getMonth()+1}/${u.getDate()} ${p.isAllDay?"終日":u.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${p.title}</div>
                  ${p.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${p.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>

    ${e.deliveries&&e.deliveries.length>0?Or(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?zr(e.orderHeaders):""}
  `}function zr(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),s=new Date().toISOString().slice(0,10),i=s.slice(0,7),l=new Map;for(const f of e){const b=f.sales_date.slice(0,7),S=l.get(b)??{count:0,total:0};l.set(b,{count:S.count+1,total:S.total+Number(f.total_amount)})}const c=[...l.keys()].sort(),p=e.reduce((f,b)=>f+Number(b.total_amount),0),u=c.map(f=>{const{count:b,total:S}=l.get(f);return`<tr>
      <td class="mono" style="font-weight:700;">${f===i?`${f}（当月）`:f}</td>
      <td class="numeric">${b.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(S)}</td>
    </tr>`}).join(""),y=e.filter(f=>f.sales_date>=s).slice(0,30),g=y.map(f=>`<tr>
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
          <tbody>${g}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function Br(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function Je(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Fr(e,t){const n=e.lines.length?e.lines.map((i,l)=>`
          <tr>
            <td class="numeric">${l+1}</td>
            <td class="mono">${i.productCode}</td>
            <td>${i.productName}</td>
            <td class="numeric">${i.quantity.toLocaleString("ja-JP")}</td>
            <td>${i.unit}</td>
            <td class="numeric">${Je(i.unitPrice)}</td>
            <td class="numeric">${Je(i.amount)}</td>
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
            <tr><th>納品日</th><td>${Br(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${Je(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${Je(s)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${Je(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${Je(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function Pe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Vr(e){return Pe(e).replaceAll(`
`,"<br />")}function Yr(e){const n=[...Object.values(ka),{id:"custom",season:"カスタム",subject:"",body:""}].map(i=>`
        <button
          class="template-card ${e.selectedTemplateId===i.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${i.id}"
        >
          <span class="template-card-kicker">${i.season}</span>
          <strong>${Pe(i.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),s=e.previewRecipients.length?e.previewRecipients.map(i=>`
            <li>
              <span>${Pe(i.name)}</span>
              <span class="table-sub">${Pe(i.email)} / ${Pe(i.area)}</span>
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
          <input id="email-subject" type="text" value="${Pe(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${Pe(e.body)}</textarea>
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
            ${e.senders.map(i=>`<option value="${i.id}" ${i.id===e.senderId?"selected":""}>${Pe(i.name)} &lt;${Pe(i.email)}&gt;${i.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${Pe(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?Vr(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${Pe(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function ke(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function $t(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function Jr(e,t){const n=[$t("得意先",t.customers.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${ke(i.name)}</strong>
            <span class="table-sub mono">${ke(i.code)}</span>
          </button>
        `)),$t("商品",t.products.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${ke(i.name)}</strong>
            <span class="table-sub mono">${ke(i.code)}</span>
          </button>
        `)),$t("伝票",t.documents.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${ke(i.documentNo)}</strong>
            <span class="table-sub">${ke(i.customerName)} / ${ke(i.date)}</span>
          </button>
        `)),$t("ページ",t.pages.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${ke(i.path)}"
          >
            <strong>${ke(i.title)}</strong>
            <span class="table-sub mono">${ke(i.path)}</span>
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
            value="${ke(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||s}
          </div>
        </div>
      </div>
    </div>
  `}function ot(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function gs(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${ot(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${ot(e.title)}">
        <div class="modal-header">
          <h2>${ot(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${ot(e.placeholder)}"
            value="${ot(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function wt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Za(e){return e.trim().toLowerCase()}function Ur(e,t){const n=Za(t),s=e.filter(l=>n?[l.code,l.name,l.name].map(Za).some(c=>c.includes(n)):!0).slice(0,50),i=s.length?`
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
                      data-code="${wt(l.code)}"
                      data-name="${wt(l.name)}"
                    >
                      <td class="mono">${wt(l.code)}</td>
                      <td>${wt(l.name)}</td>
                      <td>${l.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return gs({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:i,emptyMessage:"該当する得意先が見つかりません。"})}function Qr(e){return e.toISOString().slice(0,10)}function Fe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Me(e,t){return e[t]?`<div class="field-error">${Fe(e[t])}</div>`:""}function Ue(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function Hr(e,t,n,s){const i=Object.keys(ia).map(u=>`<option value="${u}" ${e.invoiceType===u?"selected":""}>${ia[u]}</option>`).join(""),l=e.lines.map((u,y)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${Ue(s,`lines.${y}.productCode`,"input-cell")}" type="text" data-line="${y}" data-field="productCode" value="${Fe(u.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${y}" aria-label="商品検索">🔍</button>
          </div>
          ${Me(s,`lines.${y}.productCode`)}
        </td>
        <td>
          <input class="${Ue(s,`lines.${y}.productName`,"input-cell")}" type="text" data-line="${y}" data-field="productName" value="${Fe(u.productName)}" placeholder="商品名" />
          ${Me(s,`lines.${y}.productName`)}
        </td>
        <td>
          <input class="${Ue(s,`lines.${y}.quantity`,"input-cell numeric")}" type="number" data-line="${y}" data-field="quantity" value="${u.quantity}" min="0" />
          ${Me(s,`lines.${y}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${y}" data-field="unit" value="${u.unit}" placeholder="本" /></td>
        <td>
          <input class="${Ue(s,`lines.${y}.unitPrice`,"input-cell numeric")}" type="number" data-line="${y}" data-field="unitPrice" value="${u.unitPrice}" min="0" />
          ${Me(s,`lines.${y}.unitPrice`)}
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
          <input class="${Ue(s,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Qr(new Date)}" />
          ${Me(s,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${Ue(s,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${Fe(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${Me(s,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${Fe(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${Fe(e.staffCode)}" />
        </label>
      </div>
      ${Me(s,"lines")}
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
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${Fe(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function Gr(e){return"¥"+e.toLocaleString("ja-JP")}function Kr(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const Xr={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},Wr={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},Zr={sake:"酒販用",standard:"通常"};function el(e,t){return`
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
        <td>${Kr(s.quote_date)}</td>
        <td>${s.customer_name||"（未選択）"}</td>
        <td>${s.subject||""}</td>
        <td class="numeric">${Gr(s.total_amount)}</td>
        <td><span class="badge ${Wr[s.status]??"badge-gray"}">${Xr[s.status]??s.status}</span></td>
        <td>${Zr[s.template_type]??s.template_type}</td>
        <td>
          <button class="button secondary small" data-open-quote="${s.id}">開く</button>
          <button class="button secondary small danger" data-delete-quote="${s.id}" data-quote-no="${s.quote_no}">削除</button>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}const vs="kanei-quote-settings",bs=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Dt={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function pa(){try{const e=localStorage.getItem(vs);if(e)return{...Dt,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Dt,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Dt}}function Ve(e){localStorage.setItem(vs,JSON.stringify(e))}function Le(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ve(e,t,n,s="text",i=""){return`<div class="form-row"><label>${t}</label><input type="${s}" id="${e}" value="${Le(n)}" placeholder="${Le(i)}" /></div>`}function tl(e,t,n,s){const i=s.map(l=>`<option value="${Le(l)}" ${n===l?"selected":""}>${Le(l)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${i}</select></div>`}function al(e){return`
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
        ${ve("qs-company-name","会社名",e.companyName)}
        ${ve("qs-company-postal","郵便番号",e.companyPostal,"text","257-0014")}
        ${ve("qs-company-addr1","住所1",e.companyAddress1)}
        ${ve("qs-company-addr2","住所2",e.companyAddress2,"text","建物名等")}
        ${ve("qs-company-tel","電話番号",e.companyTel)}
        ${ve("qs-company-fax","FAX番号",e.companyFax)}
        ${ve("qs-company-email","メール",e.companyEmail,"email")}
        ${ve("qs-company-regno","適格請求書番号",e.companyRegistrationNo,"text","T1234567890123")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>振込口座</h2></div>
      <div class="form-grid-2">
        ${ve("qs-bank-name","銀行名",e.bankName,"text","横浜銀行")}
        ${ve("qs-bank-branch","支店名",e.bankBranch,"text","秦野支店")}
        ${tl("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
        ${ve("qs-bank-no","口座番号",e.bankAccountNo,"text","1234567")}
        ${ve("qs-bank-holder","口座名義（カナ）",e.bankAccountHolder,"text","カ）カナイシュゾウテン")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>見積書デフォルト設定</h2></div>
      <div class="form-grid-2">
        ${ve("qs-payment-terms","支払条件",e.defaultPaymentTerms,"text","月末締め翌月末払い")}
        ${ve("qs-header-note","書類上部メモ",e.defaultHeaderNote,"text","下記のとおりお見積り申し上げます。")}
        ${ve("qs-footer-note","書類下部メモ",e.defaultFooterNote)}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>カラーテーマ</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;">見積書のアクセントカラーを設定します。プリセットから選ぶか、カスタムカラーを指定してください。</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px;">
        ${bs.map(t=>`
          <button
            type="button"
            data-action="set-accent-color"
            data-color="${Le(t.value)}"
            title="${Le(t.label)}"
            style="width:36px;height:36px;border-radius:6px;border:3px solid ${e.accentColor===t.value?"#333":"transparent"};background:${Le(t.value)};cursor:pointer;transition:border-color 0.15s;"
          ></button>
        `).join("")}
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
          カスタム
          <input type="color" id="qs-accent-color" value="${Le(e.accentColor||"#0968e5")}" style="width:36px;height:36px;border:none;border-radius:4px;cursor:pointer;padding:2px;" />
        </label>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:12px;color:var(--text-secondary);">現在の色:</span>
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:${Le(e.accentColor||"#0968e5")};border:1px solid rgba(0,0,0,0.15);"></span>
          <code style="font-size:12px;">${Le(e.accentColor||"#0968e5")}</code>
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
  `}function nl(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function Ot(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:nl(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}Ot();function Y(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function xe(e){return"¥"+e.toLocaleString("ja-JP")}function en(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function $s(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function ws(e,t,n){return"#"+[e,t,n].map(s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0")).join("")}function Mt(e,t){const[n,s,i]=$s(e);return ws(n+(255-n)*t,s+(255-s)*t,i+(255-i)*t)}function _s(e,t){const[n,s,i]=$s(e);return ws(n*(1-t),s*(1-t),i*(1-t))}function sl(e){const t=_s(e,.15),n=Mt(e,.88),s=Mt(e,.96);return`
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
`}function ol(e){const t=_s(e,.15),n=Mt(e,.88),s=Mt(e,.96);return`
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
`}function xs(e,t){const n=e.lines.reduce((P,o)=>P+o.amount,0),s=Math.round(n*e.taxRate/100),i=n+s,l=e.templateType==="sake",c=l?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",p=l?9:6,u=e.lines.map((P,o)=>{const r=l?`<td style="font-size:9px;">${Y(P.janCode)}</td><td style="text-align:center;">${P.caseQty??""}</td><td style="text-align:right;">${P.retailPrice!=null?xe(P.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${o+1}</td>
      <td class="mono" style="font-size:9px;">${Y(P.productCode)}</td>
      <td>${Y(P.productName)}</td>
      ${r}
      <td style="text-align:right;">${P.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${Y(P.unit)}</td>
      <td style="text-align:right;">${xe(P.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${p}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,y=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),g=y?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${Y(y)}</p>
    </div>
  `:"",f=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",b=[];e.validUntil&&b.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${en(e.validUntil)}</div></div>`),e.paymentTerms&&b.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${Y(e.paymentTerms)}</div></div>`),e.deliveryDate&&b.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${Y(e.deliveryDate)}</div></div>`),e.deliveryPlace&&b.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${Y(e.deliveryPlace)}</div></div>`);const S=b.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min(b.length,4)},1fr);">${b.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <table class="q-meta-table">
      ${e.quoteNo?`<tr><th>見積番号</th><td>${Y(e.quoteNo)}</td></tr>`:""}
      <tr><th>見積日</th><td>${en(e.quoteDate)}</td></tr>
    </table>
  </div>

  <!-- 取引先（左）・自社情報（右） -->
  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${Y(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${Y(e.customerAddress)}</p>`:""}
    </div>
    <div class="q-seller-col">
      <!-- 自社情報: 社名の右に印鑑 -->
      <div class="q-seller-name-row">
        <span class="q-seller-name">${Y(t.companyName)}</span>
        ${f}
      </div>
      ${t.companyPostal?`<p class="q-seller-sub">〒${Y(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${Y(t.companyAddress1)}${t.companyAddress2?" "+Y(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${Y(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${Y(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${Y(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  ${S}

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${xe(i)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${Y(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${Y(t.defaultHeaderNote)}</p>`:""}

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
      <tr><td colspan="${p-1}" style="text-align:right;">小計</td><td style="text-align:right;">${xe(n)}</td></tr>
      <tr><td colspan="${p-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${xe(s)}</td></tr>
      <tr class="q-total-row"><td colspan="${p-1}" style="text-align:right;">合計</td><td style="text-align:right;">${xe(i)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${Y(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${Y(t.defaultFooterNote)}</p>`:""}

  ${g}
</div>`}function Ss(e,t,n,s,i,l,c){const p=e.lines.reduce((P,o)=>P+o.amount,0),u=Math.round(p*e.taxRate/100),y=p+u,g=e.templateType==="sake",f=s.length>=1?t.filter(P=>P.name.includes(s)||P.code.includes(s)).slice(0,8):[],b=i.length>=1?n.filter(P=>P.name.includes(i)||P.code.includes(i)).slice(0,8):[];if(e.previewMode){const P=c.accentColor||"#0968e5";return`
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
        ${ol(P)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${xs(e,c)}
      </div>
    `}const S=e.lines.map((P,o)=>{const r=g?`
      <td><input type="text" class="jan-input" data-line-idx="${o}" value="${Y(P.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${o}" value="${P.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${o}" value="${P.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${Y(P.productCode)}</td>
      <td>${Y(P.productName)}</td>
      ${r}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${o}" value="${P.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${Y(P.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${o}" value="${P.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${xe(P.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${o}">×</button></td>
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
          ${bs.map(P=>`
            <button type="button" data-action="set-accent-color" data-color="${Y(P.value)}" title="${Y(P.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${c.accentColor===P.value?"#333":"transparent"};background:${Y(P.value)};cursor:pointer;"></button>
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
          <input type="text" id="q-no" value="${Y(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${Y(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${Y(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${Y(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${Y(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">既存得意先</p>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${Y(s)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${f.length>0?`<div class="search-results">${f.map(P=>`
        <button class="search-item" type="button" data-select-customer="${P.code}" data-cust-name="${Y(P.name)}" data-cust-addr="${Y(P.address1||"")}">
          <span class="mono">${P.code}</span> ${Y(P.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName&&!e.isProspect?`<div class="selected-item"><span class="mono">${Y(e.customerCode)}</span> <strong>${Y(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${Y(e.customerAddress)}</span>`:""}</div>`:""}

      <div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--border);">
        <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">見込み顧客から選択</p>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="q-prospect-search" placeholder="見込み顧客名で検索…" style="flex:1;" />
          <button type="button" class="button secondary small" data-action="new-prospect-from-quote">＋ 新規登録</button>
        </div>
        <div id="q-prospect-results"></div>
        ${e.customerName&&e.isProspect?`<div class="selected-item" style="border-left:3px solid #48bb78;"><span style="font-size:11px;background:#48bb78;color:white;border-radius:3px;padding:1px 5px;margin-right:6px;">見込</span> <strong>${Y(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${Y(e.customerAddress)}</span>`:""}</div>`:""}
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
        <input type="text" id="q-prod-search" value="${Y(i)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${b.length>0?`<div class="search-results">${b.map(P=>{const o=l?Da(P,l):{price:P.salePrice||0,label:"卸価格"},r=P.listPrice||0,d=o.label!=="標準価格"&&o.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${P.code}" data-prod-name="${Y(P.name)}" data-prod-price="${o.price}" data-prod-retail="${r}" data-prod-jan="${Y(P.janCode??"")}" data-prod-unit="${Y(P.unit??"本")}" data-prod-case="${P.caseQty??""}">
          <span class="mono">${P.code}</span> ${Y(P.name)}
          <span class="numeric" ${d?'style="color:#2f855a;font-weight:700;"':""}>納入 ${o.price?xe(o.price):"未設定"} <small>(${o.label})</small>${r?`　定価 ${xe(r)}`:""}</span>
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
          <textarea id="q-remarks" rows="3">${Y(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${xe(p)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${xe(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${xe(y)}</span></div>
        </div>
      </div>
    </section>
  `}async function il(e,t){const n=t.accentColor||"#0968e5",s=document.createElement("div");s.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",s.innerHTML=`<style>${sl(n)}</style>${xs(e,t)}`,document.body.appendChild(s);try{const[{default:i},{jsPDF:l}]=await Promise.all([q(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),q(()=>import("./jspdf.es.min-ByjtqovR.js").then(P=>P.j),[])]),c=await i(s,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),p=210,u=297,y=c.width/p,g=u*y,f=new l({orientation:"portrait",unit:"mm",format:"a4"});let b=0,S=0;for(;b<c.height;){S>0&&f.addPage();const P=Math.min(g,c.height-b),o=document.createElement("canvas");o.width=c.width,o.height=Math.ceil(P);const r=o.getContext("2d");r.fillStyle="#ffffff",r.fillRect(0,0,o.width,o.height),r.drawImage(c,0,b,c.width,P,0,0,c.width,P);const d=o.toDataURL("image/jpeg",.95),m=P/y;f.addImage(d,"JPEG",0,0,p,m),b+=g,S++}f.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(s)}}function _t(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function ks(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ps(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function Es(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function rl(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function ll(e,t,n,s,i){const l=new Map,c=new Map;for(const g of e){if(g.date>=t&&g.date<=n){const f=l.get(g.productCode);f?(f.amt+=g.amount,f.qty+=g.qty):l.set(g.productCode,{name:g.productName,vol:g.volumeMl,amt:g.amount,qty:g.qty})}g.date>=s&&g.date<=i&&c.set(g.productCode,(c.get(g.productCode)??0)+g.amount)}const p=[...l.entries()].map(([g,f])=>({code:g,...f})).sort((g,f)=>f.amt-g.amt),u=p.reduce((g,f)=>g+f.amt,0);let y=0;return p.map(g=>{y+=g.amt;const f=u>0?Math.round(g.amt*1e4/u)/100:0,b=y<=u*.7?"A":y<=u*.9?"B":"C",S=c.get(g.code)??0,P=S>0?Math.round((g.amt-S)/S*1e3)/10:null;return{code:g.code,name:g.name,volumeMl:g.vol,amount:g.amt,qty:g.qty,sharePct:f,rank:b,prevAmount:S,growthRate:P}})}function cl(e,t,n){const s=new Date,i=s.toISOString().slice(0,10);let l=i,c=i,p="";switch(e){case"week":{const g=new Date(s);g.setDate(g.getDate()-7),l=g.toISOString().slice(0,10),c=i,p="直近7日間";break}case"month":{l=i.slice(0,7)+"-01",c=i,p="当月";break}case"90days":{const g=new Date(s);g.setDate(g.getDate()-90),l=g.toISOString().slice(0,10),c=i,p="直近90日間";break}case"year":{const g=new Date(s);g.setFullYear(g.getFullYear()-1),l=g.toISOString().slice(0,10),c=i,p="直近1年間";break}case"custom":{l=t||i,c=n||i,p=`${l} 〜 ${c}`;break}}const u=new Date(l);u.setFullYear(u.getFullYear()-1);const y=new Date(c);return y.setFullYear(y.getFullYear()-1),{start:l,end:c,prevStart:u.toISOString().slice(0,10),prevEnd:y.toISOString().slice(0,10),label:p}}function dl(e,t="all",n=[],s="year",i,l,c=[]){const p=cl(s,i,l),u=n.length>0?ll(n,p.start,p.end,p.prevStart,p.prevEnd):e.map(m=>({code:m.code,name:m.name,volumeMl:m.volumeMl,amount:m.yearAmount,qty:m.yearQty,sharePct:m.sharePct,rank:m.rank,prevAmount:m.prevAmount,growthRate:m.growthRate})),y=u.filter(m=>m.rank==="A").length,g=u.filter(m=>m.rank==="B").length,f=u.filter(m=>m.rank==="C").length,b=u.filter(m=>m.growthRate!=null&&m.growthRate>10),S=u.filter(m=>m.growthRate!=null&&m.growthRate<-10);let P=u,o="全商品";switch(t){case"A":P=u.filter(m=>m.rank==="A"),o="Aランク";break;case"B":P=u.filter(m=>m.rank==="B"),o="Bランク";break;case"C":P=u.filter(m=>m.rank==="C"),o="Cランク";break;case"growing":P=b,o="成長商品(+10%以上)";break;case"declining":P=S,o="衰退商品(-10%以下)";break}const r=(m,v,$)=>`<button class="button ${t===m?"primary":"secondary"} small" data-product-filter="${m}">${v} (${$})</button>`,d=(m,v)=>`<button class="button ${s===m?"primary":"secondary"} small" data-product-period="${m}">${v}</button>`;return`
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
        <p class="kpi-value">${g} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${b.length}</p>
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
        <h2>${o} (${P.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${r("all","全て",u.length)}
        ${r("A","A",y)}
        ${r("B","B",g)}
        ${r("C","C",f)}
        ${r("growing","成長",b.length)}
        ${r("declining","衰退",S.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${H("rank","ABC",c)}
              ${H("name","商品名",c)}
              ${H("amount","売上",c,"numeric")}
              ${H("sharePct","構成比",c,"numeric")}
              ${H("qty","本数",c,"numeric")}
              ${H("growthRate","前年同期比",c,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${We(P,c,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(m=>`
              <tr>
                <td>${Ps(m.rank)}</td>
                <td>${m.name?m.name.slice(0,25):m.code}${m.volumeMl?` <small>${m.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${ks(m.amount)}</td>
                <td class="numeric">${m.sharePct}%</td>
                <td class="numeric">${m.qty.toLocaleString()}</td>
                <td class="numeric">${Es(m.growthRate)}</td>
              </tr>
            `).join("")}
            ${P.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function pl(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,s="billing"){const i=e.filter(b=>b.currentRank==="A").length,l=e.filter(b=>b.prevRank&&b.currentRank<b.prevRank).length,c=e.filter(b=>b.prevRank&&b.currentRank>b.prevRank).length,p=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,u=2011,y=[];for(let b=p;b>=u&&y.length<6;b--)y.push(b);const g=`
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;">
      <span style="font-size:13px;color:var(--text-secondary);margin-right:4px;">年度：</span>
      ${y.map(b=>`
        <button class="button ${b===n?"primary":"secondary"} small"
          data-action="efficiency-year-change" data-year="${b}"
          style="min-width:80px;">
          ${b}年度
        </button>
      `).join("")}
      <select data-action="efficiency-year-select"
        style="margin-left:8px;padding:4px 8px;border-radius:4px;border:1px solid var(--border);background:var(--surface);font-size:13px;">
        <option value="">過去年度…</option>
        ${Array.from({length:p-u+1},(b,S)=>p-S).filter(b=>!y.includes(b)).map(b=>`<option value="${b}" ${b===n?"selected":""}>${b}年度</option>`).join("")}
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
        <p class="kpi-value">${i} ${s==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">ランクアップ</p>
        <p class="kpi-value">${l} ${s==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${c} ${s==="billing"?"社":"店舗"}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>${s==="billing"?"得意先":"店舗（納品先）"}ABC分析（${n}年度・4月〜翌3月）</h2></div>
      ${g}
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${H("currentRank","ABC",t)}
              ${H("name","得意先名",t)}
              ${H("yearAmount","年間売上",t,"numeric")}
              ${H("sharePct","構成比",t,"numeric")}
              ${H("orderDays","受注日数",t,"numeric")}
              ${H("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${We(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(b=>`
              <tr>
                <td>${Ps(b.currentRank)}</td>
                <td>${b.name||b.code}</td>
                <td class="numeric">${ks(b.yearAmount)}</td>
                <td class="numeric">${b.sharePct}%</td>
                <td class="numeric">${b.orderDays}日</td>
                <td class="numeric">${Es(b.growthRate)}</td>
                <td>${rl(b.currentRank,b.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function ul(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function ml(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function yl(e,t){const n=e.length?e.map(s=>`
            <tr>
              <td class="mono">${s.documentNo}</td>
              <td>${ul(s.date)}</td>
              <td>
                <div class="table-title">${s.customerName}</div>
                <div class="table-sub mono">${s.customerCode}</div>
              </td>
              <td class="numeric">${s.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${ml(s.amount)}</td>
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
  `}function hl(e){return new Date(e.getFullYear(),e.getMonth(),1)}function fl(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function As(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function Cs(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function tn(e){const t=As(Cs(e),6);return t.setHours(23,59,59,999),t}function an(e){return new Date(`${e}T00:00:00`)}function nn(e){return`${e.getMonth()+1}/${e.getDate()}`}function gl(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function vl(){const e=new Date,t=Cs(fl(hl(e),-3)),n=tn(new Date(e.getFullYear(),e.getMonth()+4,0)),s=[];let i=new Date(t);for(;i<=n;){const l=tn(i);s.push({start:new Date(i),end:l,label:`${nn(i)} - ${nn(l)}`}),i=As(i,7)}return s}function bl(e){const t=vl(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,s=t.map(l=>`
        <div class="gantt-week">
          <span>${l.label}</span>
        </div>
      `).join(""),i=e.length?e.map(l=>{const c=an(l.startDate),p=an(l.expectedDoneDate),u=Math.max(0,t.findIndex(f=>f.end>=c)),y=Math.max(u,t.reduce((f,b,S)=>b.start<=p?S:f,u)),g=[`仕込番号: ${l.jikomiNo}`,`銘柄: ${l.productName}`,`期間: ${l.startDate} - ${l.expectedDoneDate}`,`タンク: ${l.tankNo}`,`備考: ${l.note||"なし"}`].join(`
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
                  title="${gl(g)}"
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
        ${i}
      </div>
    </section>
  `}function sn(e,t){const n={planned:"neutral",active:"warning",done:"success"},s=e.map(p=>`
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
          <span class="status-pill ${n[p.status]}">${Hn[p.status]}</span>
        </td>
        <td>${p.note||"―"}</td>
      </tr>
    `).join(""),i=e.filter(p=>p.status==="active").length,l=e.filter(p=>p.status==="done").length,c=e.filter(p=>p.status==="planned").length;return`
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
  `}function $l(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},s=e.map(u=>`
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
    `).join(""),i=e.filter(u=>u.status==="approved").length,l=e.filter(u=>u.status==="submitted").length,c=e.filter(u=>u.status==="pending").length;return`
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
          <tbody>${s||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function wl(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function _l(e,t){return`
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
        ${e?`<p class="field-error">${wl(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function xl(e){return`
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
  `}function Sl(e){return`
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
  `}const Ra={query:"",businessType:"",areaCode:"",activeOnly:"",page:1},mt=50;function kl(e,t){let n=e;if(t.query){const p=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(p)||u.name.toLowerCase().includes(p)||u.kanaName&&u.kanaName.toLowerCase().includes(p)||u.address1&&u.address1.toLowerCase().includes(p)||u.phone&&u.phone.toLowerCase().includes(p))}t.businessType&&(n=n.filter(p=>p.businessType===t.businessType)),t.areaCode&&(n=n.filter(p=>p.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(p=>p.isActive):t.activeOnly==="inactive"&&(n=n.filter(p=>!p.isActive));const s=Math.max(1,Math.ceil(n.length/mt)),l=(Math.min(t.page,s)-1)*mt,c=n.slice(l,l+mt);return{filtered:n,paged:c,totalPages:s}}function on(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const s=(t-1)*mt+1,i=Math.min(t*mt,e),l=[];for(let c=1;c<=n;c++)c===1||c===n||c>=t-2&&c<=t+2?l.push(`<button class="button ${c===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${c}" style="min-width:36px;padding:4px 8px;">${c}</button>`):(c===t-3||c===t+3)&&l.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${s}-${i} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${l.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function Pl(e,t){const n=[...new Set(e.map(i=>i.businessType).filter(Boolean))].sort(),s=[...new Set(e.map(i=>i.areaCode).filter(Boolean))].sort();return`
    <div style="display:flex;gap:8px;align-items:end;flex-wrap:wrap;padding:12px 0;">
      <div class="form-group" style="flex:1;min-width:200px;">
        <label class="form-label">検索</label>
        <input type="text" id="master-search" class="form-input" placeholder="コード・名前・カナ・住所・電話" value="${t.query}">
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">業態</label>
        <select id="master-business-type" class="form-input">
          <option value="">すべて</option>
          ${n.map(i=>`<option value="${i}" ${t.businessType===i?"selected":""}>${i}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">地区</label>
        <select id="master-area-code" class="form-input">
          <option value="">すべて</option>
          ${s.map(i=>`<option value="${i}" ${t.areaCode===i?"selected":""}>${i}</option>`).join("")}
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
  `}function ua(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function El(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}function Al(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${El(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${ua(t.address1||"",16)}</td>
          <td>${ua(t.address2||"",12)}</td>
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
      `).join("")}function xt(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function Cl(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${ua(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${xt(t.purchasePrice)}</td>
          <td class="numeric">${xt(t.salePrice)}</td>
          <td class="numeric">${xt(t.listPrice)}</td>
          <td class="numeric">${xt(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function Ll(e,t,n=Ra,s=[]){const{filtered:i,paged:l,totalPages:c}=kl(e.customers,n);return`
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
        ${Pl(e.customers,n)}
        ${on(i.length,n.page,c)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${H("code","コード",s)}
                ${H("name","得意先名",s)}
                ${H("kanaName","カナ",s)}
                <th>略称</th>
                ${H("businessType","業態",s)}
                <th>販売区分</th>
                <th>価格区分</th>
                <th>単価G</th>
                <th>電話</th>
                <th>FAX</th>
                <th>〒</th>
                <th>住所1</th>
                <th>住所2</th>
                <th>担当</th>
                ${H("areaName","地区",s)}
                ${H("closingDay","締日",s,"numeric")}
                ${H("paymentDay","支払日",s,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Al(We(l,s,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${on(i.length,n.page,c)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${H("code","コード",s)}
                ${H("name","商品名",s)}
                <th>カナ</th>
                ${H("category","分類",s)}
                <th>酒税区分</th>
                ${H("alcoholDegree","度数",s,"numeric")}
                ${H("volumeMl","容量ml",s,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${H("purchasePrice","生産者価格",s,"numeric")}
                ${H("salePrice","卸価格",s,"numeric")}
                ${H("listPrice","定価(小売)",s,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Cl(We(e.products,s,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function Ht(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Dl(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${cs.map(s=>`<option ${n?.materialType===s?"selected":""}>${s}</option>`).join("")}
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
  `}function ql(e){const t=e.map(i=>{const c=(i.minimumStock>0?i.currentStock/i.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${i.code}</td>
          <td>${i.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${i.currentStock.toLocaleString("ja-JP")} ${i.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${i.minimumStock.toLocaleString("ja-JP")} ${i.unit}</td>
          <td class="numeric">${Ht(i.unitCost)}</td>
          <td class="numeric">${Ht(i.currentStock*i.unitCost)}</td>
          <td>${i.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${i.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(i=>i.minimumStock>0&&i.currentStock/i.minimumStock<1.5).length,s=e.reduce((i,l)=>i+l.currentStock*l.unitCost,0);return`
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
        <p class="kpi-value">${Ht(s)}</p>
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
  `}function Il(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function Gt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Tl={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Nl(e){return`
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
          <td class="numeric">${Gt(n.billedAmount)}</td>
          <td class="numeric">${Gt(n.paymentAmount)}</td>
          <td class="numeric">${Gt(n.balanceAmount)}</td>
          <td>${Il(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${Tl[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function Qe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function rn(e){return e.trim().toLowerCase()}function Ol(e,t){const n=rn(t),s=e.filter(l=>n?[l.code,l.name,l.janCode].map(rn).some(c=>c.includes(n)):!0),i=s.length?`
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
                      data-code="${Qe(l.code)}"
                      data-name="${Qe(l.name)}"
                    >
                      <td class="mono">${Qe(l.code)}</td>
                      <td>${Qe(l.name)}</td>
                      <td class="mono">${Qe(l.janCode)}</td>
                      <td>${Qe(l.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return gs({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:i,emptyMessage:"該当する商品が見つかりません。"})}function Re(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ml(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},i={unpaid:"未払い",partial:"一部支払",paid:"支払済"},l={unpaid:"warning",partial:"neutral",paid:"success"},c=e.map(f=>`
      <tr>
        <td class="mono">${f.documentNo}</td>
        <td>${f.purchaseDate}</td>
        <td class="mono">${f.supplierCode}</td>
        <td>${f.supplierName}</td>
        <td>${f.itemName}</td>
        <td class="numeric">${f.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${Re(f.unitPrice)}</td>
        <td class="numeric"><strong>${Re(f.amount)}</strong></td>
        <td>
          <span class="status-pill ${s[f.status]}">${n[f.status]}</span>
        </td>
      </tr>
    `).join(""),p=t.map(f=>`
      <tr>
        <td class="mono">${f.supplierCode}</td>
        <td>${f.supplierName}</td>
        <td class="numeric">${Re(f.totalPurchase)}</td>
        <td class="numeric">${Re(f.paidAmount)}</td>
        <td class="numeric"><strong>${Re(f.balance)}</strong></td>
        <td>${f.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${l[f.status]}">${i[f.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${f.supplierCode}" ${f.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),u=e.reduce((f,b)=>f+b.amount,0),y=t.reduce((f,b)=>f+b.balance,0),g=t.filter(f=>f.status!=="paid").length;return`
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
        <p class="kpi-value">${Re(u)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${Re(y)}</p>
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
          <tbody>${p||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function it(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Rl(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},i=e.map(g=>`
      <tr>
        <td class="mono">${g.billNo}</td>
        <td>${g.supplierName}</td>
        <td class="numeric">${it(g.amount)}</td>
        <td>${g.issueDate}</td>
        <td>${g.dueDate}</td>
        <td>
          <span class="status-pill ${s[g.status]}">${n[g.status]}</span>
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
          <td class="numeric">${it(g.unitCost)}</td>
          <td class="numeric">${it(g.currentStock*g.unitCost)}</td>
          <td>${g.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=e.filter(g=>g.status==="holding"),p=c.reduce((g,f)=>g+f.amount,0),u=t.reduce((g,f)=>g+f.currentStock*f.unitCost,0),y=t.filter(g=>g.minimumStock>0&&g.currentStock<g.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${it(p)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${it(u)}</p>
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
          <tbody>${l||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ma(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function fe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ya(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${fe(e)}</pre>
    </div>
  `}function jl(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function St(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${fe(e)}</code>
      ${jl(e)}
    </div>
  `}function He(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${fe(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${fe(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${fe(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?ya(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${fe(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${fe(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function kt(e){return`
    <div class="setup-step setup-step-compact" data-step="${fe(e.stepLabel)}">
      <h3>${fe(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${fe(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function Pt(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function ln(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function zl(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?ma(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Pt(e.lastOverallSync)}">${ln(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${Pt(e.lastOverallSync)==="success"?"1時間以内":Pt(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${fe(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?ma(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Pt(t.lastSyncAt)}">${ln(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Bl(e,t,n,s){const i={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${s?zl(s):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${ma(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${i[e.status]}</span>
        </p>
        <p class="kpi-sub">${fe(e.message)}</p>
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
      ${kt({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${St("git --version")}
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
      ${kt({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${St("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${kt({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${St("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${St("python get-pip.py")}
        `})}
      ${kt({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${He({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${He({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${He({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${He({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${He({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${He({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${ya(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${ya(`{
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
            <span class="config-value">${fe(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${fe(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${fe(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${fe(n)}"
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
  `}function dt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Fl(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function Vl(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(f=>f.amount),1),s=28,i=6,l=140,c=100,p=760,u=p-l-c,y=t.length*(s+i)+16,g=t.map((f,b)=>{const S=f.amount/n*u,P=b*(s+i)+8,o=f.abcRank==="A"?"#2F855A":f.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${l-8}" y="${P+s/2+5}" class="chart-axis" text-anchor="end">${f.name.length>10?f.name.slice(0,10)+"…":f.name}</text>
          <rect x="${l}" y="${P}" width="${S}" height="${s}" rx="4" fill="${o}" opacity="0.85" />
          <text x="${l+S+8}" y="${P+s/2+5}" class="chart-axis">${(f.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${p} ${y}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${g}
    </svg>
  `}function Yl(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(s=>`<th class="numeric">${s}</th>`).join(""),n=e.monthlyByCustomer.map(s=>{const i=s.values.reduce((c,p)=>c+p,0),l=s.values.map(c=>`<td class="numeric">${c>0?(c/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${s.label}</td>
          ${l}
          <td class="numeric"><strong>${dt(i)}</strong></td>
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
  `}function Jl(e){e.ranking.reduce((u,y)=>u+y.amount,0);const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,s=e.ranking.filter(u=>u.abcRank==="C").length,i=e.ranking.filter(u=>u.abcRank==="A").reduce((u,y)=>u+y.amount,0),l=e.ranking.filter(u=>u.abcRank==="B").reduce((u,y)=>u+y.amount,0),c=e.ranking.filter(u=>u.abcRank==="C").reduce((u,y)=>u+y.amount,0),p=e.ranking.map(u=>`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric">${dt(u.amount)}</td>
          <td class="numeric">${u.ratio.toFixed(1)}%</td>
          <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${Fl(u.abcRank)}">${u.abcRank}</span></td>
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
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${dt(i)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${dt(l)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${s}社 <span class="kpi-sub">${dt(c)}</span></div>
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
        ${Vl(e.ranking)}
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
      ${Yl(e)}
    </section>
  `}const Ul={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},cn={amount:"売上額",quantity:"出荷本数",volume:"移出量"},ha=10;function ja(e){const[t,n]=e.split("-").map(Number);return n>=ha?t:t-1}function Ql(e){const t=ha-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(ha).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function Hl(e,t,n){const s=c=>t==="quantity"?c.quantity:t==="volume"?c.volumeMl:c.amount,i=new Map;for(const c of e){const p=n==="fiscal"?`${ja(c.month)}年度`:c.month.slice(0,4);i.set(p,(i.get(p)??0)+s(c))}return{curr:[...i.entries()].sort((c,p)=>c[0].localeCompare(p[0])).map(([c,p])=>({month:c,amount:p}))}}function Gl(e){const t=new Set;for(const n of e)t.add(ja(n.month));return[...t].sort((n,s)=>s-n).map(String)}function Ze(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Kl(e){return e.replace("-","/")}const dn={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function Xl(e,t="#0F5B8D",n=[],s="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const i=n.length>0&&n.some(m=>m.amount>0),l=760,c=280,p={top:16,right:24,bottom:36,left:s==="amount"?64:56},u=l-p.left-p.right,y=c-p.top-p.bottom,g=[...e.map(m=>m.amount),...n.map(m=>m.amount)],f=Math.max(...g,1),b=u/e.length;function S(m){if(s==="quantity")return m>=1e4?`${(m/1e4).toFixed(1)}万本`:`${Math.round(m).toLocaleString()}本`;if(s==="volume"){const v=m/1e3;return v>=1e4?`${(v/1e3).toFixed(0)}kL`:`${Math.round(v).toLocaleString()} L`}return`${Math.round(m/1e4).toLocaleString("ja-JP")}万円`}function P(m){return s==="quantity"?`${m.toLocaleString()}本`:s==="volume"?Vt(m):Ze(m)}const o=[0,.25,.5,.75,1].map(m=>{const v=p.top+y-y*m,$=S(f*m);return`<g>
        <line x1="${p.left}" y1="${v}" x2="${l-p.right}" y2="${v}" class="chart-grid" />
        <text x="4" y="${v+4}" class="chart-axis">${$}</text>
      </g>`}).join(""),r=e.map((m,v)=>{const $=i?Math.max((b-18)/2,10):Math.max(b-18,24),w=i?2:0,x=p.left+v*b+(b-(i?$*2+w:$))/2,k=m.amount/f*y,E=p.top+y-k,C=n[v]?.amount??0,D=C/f*y,O=p.top+y-D,L=i?`<rect x="${x}" y="${O}" width="${$}" height="${D}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${P(C)}</title></rect>`:"",I=i?x+$+w:x;return`<g>
      ${L}
      <rect x="${I}" y="${E}" width="${$}" height="${k}" rx="4" fill="${t}" opacity="${.6+v/e.length*.35}"><title>${P(m.amount)}</title></rect>
      <text x="${p.left+v*b+b/2}" y="${c-8}" class="chart-axis centered-axis">${Kl(m.month)}</text>
    </g>`}).join(""),d=i?`
    <g transform="translate(${l-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${l} ${c}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${o}${r}${d}
    </svg>
  `}function Vt(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function Wl(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(s=>`
    <tr>
      <td class="mono">${s.code}</td>
      <td>${s.name}</td>
      <td class="numeric">${Ze(s.amount)}</td>
      <td class="numeric">${s.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Vt(s.volumeMl)}</td>
      <td class="numeric">${s.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${s.code}" data-drilldown-name="${s.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function Zl(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${Ze(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${Vt(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function pn(e,t,n){const s=t?e.filter(l=>l.tag.includes(t)||l.name.includes(t)):e,i=s.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':s.map(l=>`
        <tr>
          <td class="mono">${l.code||"―"}</td>
          <td>${l.name||"未設定"}</td>
          <td class="mono">${l.tag||"―"}</td>
          <td class="numeric">${Ze(l.amount)}</td>
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
        <tbody>${i}</tbody>
      </table>
    </div>
  `}function Ls(e,t,n="all",s="",i=[],l=[],c="",p="",u=null,y="all",g="",f=[],b=[],S=[],P=null,o=[],r=[],d="amount",m="calendar"){const v=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",$=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,x=n!=="all"&&i.length>0&&t!=="staff"?i:$,k=We(x,S,Ul),E={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},C=cn[d],D=V=>d==="quantity"?V.quantity:d==="volume"?V.volumeMl:V.amount,O=V=>d==="quantity"?`${V.toLocaleString()}本`:d==="volume"?Vt(V):Ze(V);let L,I=[],M,B,z;if(P&&P.monthlySales.length>0)L=P.monthlySales.slice(-24).map(V=>({month:V.month,amount:D(V)})),M=`${P.name} の月別${C}`,B=`${P.tab==="customers"?"得意先":"商品"}: ${P.code}`,z="#0968e5";else if(o.length>0&&n!=="all"){L=o.map(J=>({month:J.month,amount:D(J)})),I=r.map(J=>({month:J.month,amount:D(J)}));const V=L.reduce((J,K)=>J+K.amount,0),ee=I.reduce((J,K)=>J+K.amount,0),$e=ee>0?(V-ee)/ee*100:0,ge=$e>0?"+":"";M=`${E[n]} ${C}（${s}）`,B=`${O(V)}${ee>0?` / 前年比 ${ge}${$e.toFixed(1)}%`:""}`,z="#2f855a"}else{L=Hl(e.monthlySales,d,m).curr,I=[];const ee=L.reduce((ge,J)=>ge+J.amount,0);M=`${m==="fiscal"?"決算年度別":"暦年別"}${C}`,B=`累計 ${O(ee)}（${L.length}${m==="fiscal"?"期":"年"}）`,z="#0F5B8D"}const Q=["amount","quantity","volume"].map(V=>`<button class="tab-button ${V===d?"active":""}" data-chart-metric="${V}">${cn[V]}</button>`).join(""),F=["all","yearly","monthly","weekly","daily"].map(V=>`<button class="button ${V===n?"primary":"secondary"} small" type="button" data-analytics-period="${V}">${dn[V]}</button>`).join(""),j=m==="fiscal"&&n==="yearly"?Gl(e.monthlySales):l,U=m==="fiscal"&&n==="yearly"&&!j.includes(s)?j[0]??"":s,Z=n!=="all"&&j.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${j.map(V=>`<option value="${V}" ${V===U?"selected":""}>${m==="fiscal"&&n==="yearly"?V+"年度":V}</option>`).join("")}
      </select>`:"";let re="",ie="";if(t==="staff"){const V=["all","yearly","monthly","weekly","daily"].map(K=>`<button class="button ${K===y?"primary":"secondary"} small" type="button" data-staff-period="${K}">${dn[K]}</button>`).join(""),ee=y!=="all"&&f.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${f.map(K=>`<option value="${K}" ${K===g?"selected":""}>${K}</option>`).join("")}
        </select>`:"",ge=(b.length>0?b:e.staffTotals).filter(K=>!c||K.name.includes(c)||K.code.includes(c)),J=y!=="all"&&g?` (${g})`:"";if(re=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${V}</div>
        ${ee}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${c}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${J?`<span style="font-size:12px;color:var(--text-secondary);">${J}</span>`:""}
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
            ${ge.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':ge.map(K=>`
                <tr>
                  <td class="mono">${K.code||"―"}</td>
                  <td>${K.name||"未設定"}</td>
                  <td class="numeric">${Ze(K.amount)}</td>
                  <td class="numeric">${K.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${K.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${K.code}" data-staff-name="${K.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const K=u.breakdownTab,qe=y!=="all"&&g?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${g}</span>`:"";ie=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${u.name} の内訳${qe}</h2>
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

          ${K==="customers"?pn(u.customerRows,p,"得意先名"):pn(u.productRows,p,"商品名")}
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
            <h2>${M}</h2>
            <p class="panel-caption">${B}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${Q}</div>
            ${P?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${Xl(L,z,I,d)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${v}</h2>
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
            ${Z}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${H("code","コード",S,"mono")}
                  ${H("name","名称",S)}
                  ${H("amount","売上額",S,"numeric")}
                  ${H("quantity","本数",S,"numeric")}
                  ${H("volumeMl","移出量",S,"numeric")}
                  ${H("documents","伝票数",S,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${Wl(k,!0)}</tbody>
            </table>
          </div>
        `:re}
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
            <tbody>${Zl(P.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${ie}
  `}const un=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:Ql,monthToFiscalYear:ja,renderSalesAnalytics:Ls},Symbol.toStringTag,{value:"Module"}));function rt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ec(e){const t=Math.max(...e.salesByProduct.flatMap(l=>l.values),1),n=e.salesByProduct.map(l=>{const c=l.values.map((p,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(p/t*120)}px" title="${e.months[u]}: ${rt(p)}"></div>
            <span class="bar-label">${e.months[u].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${l.label}</p>
          <div class="bar-chart">${c}</div>
        </div>
      `}).join(""),s=e.costSimulation.map(l=>`
      <tr>
        <td class="mono">${l.productCode}</td>
        <td>${l.productName}</td>
        <td class="numeric">${rt(l.costPrice)}</td>
        <td class="numeric">${rt(l.sellPrice)}</td>
        <td class="numeric">${rt(l.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${l.marginRate>=40?"success":"warning"}">${l.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),i=e.salesByCustomer.map(l=>{const c=l.values.reduce((p,u)=>p+u,0);return`
        <tr>
          <td>${l.label}</td>
          ${l.values.map(p=>`<td class="numeric">${(p/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${rt(c)}</strong></td>
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
          <tbody>${s}</tbody>
        </table>
      </div>
    </section>
  `}function tc(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function ac(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function mn(e){return e.toISOString().slice(0,10)}function nc(e,t,n){const s=e.length?e.map(i=>`
            <tr>
              <td class="mono">${i.documentNo}</td>
              <td>${tc(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${ac(i.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||mn(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||mn(new Date)}" />
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
  `}function Et(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function sc(e,t,n,s){const i={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},l={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},p=e.map(f=>`
      <tr>
        <td>${f.saleTime}</td>
        <td class="mono">${f.productCode}</td>
        <td>${f.productName}</td>
        <td class="numeric">${f.quantity}</td>
        <td class="numeric">${Et(f.unitPrice)}</td>
        <td class="numeric"><strong>${Et(f.amount)}</strong></td>
        <td>${i[f.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(f=>`
      <tr>
        <td class="mono">${f.orderNo}</td>
        <td>${f.orderDate}</td>
        <td>${f.customerName}</td>
        <td>${f.postalCode} ${f.address}</td>
        <td>${f.items.map(b=>`${b.productName} ×${b.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Et(f.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[f.status]}">${l[f.status]}</span>
        </td>
        <td>${f.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${f.id}">詳細</button>
        </td>
      </tr>
    `).join(""),y=e.reduce((f,b)=>f+b.amount,0),g=t.filter(f=>f.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${Et(y)}</p>
        <p class="kpi-sub">${e.length} 件 / ${s}</p>
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
  `}const Kt={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},oc={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function ic(e,t,n,s){const i=oc[e],l=Object.keys(Kt).map(p=>`
      <button class="tab-button ${e===p?"active":""}" data-import-entity="${p}">
        ${Kt[p]}
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
        <h2>${Kt[e]} のCSV形式</h2>
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

    ${s?`<section class="panel"><p class="sync-message">${s}</p></section>`:""}
  `}const oe={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function rc(e,t,n){const s=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:oe.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:oe.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:oe.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:oe.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:oe.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:oe.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:oe.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:oe.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:oe.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:oe.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:oe.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:oe.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:oe.date}];e.lines.slice(0,6).forEach((c,p)=>{const u=33+p*8.5;s.push({id:`line${p}_name`,label:`明細${p+1} 品名`,x:5,y:u,fontSize:7.5,value:c.productName+(c.spec?` ${c.spec}`:""),color:oe.detail},{id:`line${p}_code`,label:`明細${p+1} CD`,x:64,y:u,fontSize:7.5,value:c.productCode,color:oe.detail},{id:`line${p}_qty`,label:`明細${p+1} 数量`,x:124,y:u,fontSize:8,value:c.quantity>0?String(c.quantity):"",color:oe.detail},{id:`line${p}_price`,label:`明細${p+1} 原単価`,x:163,y:u,fontSize:8,value:c.unitPrice>0?c.unitPrice.toLocaleString("ja-JP"):"",color:oe.detail},{id:`line${p}_amount`,label:`明細${p+1} 原価金額`,x:176,y:u,fontSize:8,value:c.amount>0?c.amount.toLocaleString("ja-JP"):"",color:oe.detail},{id:`line${p}_retail`,label:`明細${p+1} 売単価`,x:193,y:u,fontSize:8,value:c.retailPrice?c.retailPrice.toLocaleString("ja-JP"):"",color:oe.detail})});const i=e.lines.reduce((c,p)=>c+(p.amount||0),0),l=e.lines.reduce((c,p)=>c+p.quantity,0);return s.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(l),color:oe.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:i.toLocaleString("ja-JP"),color:oe.total}),n&&s.forEach(c=>{const p=n[c.id];p&&(c.x=p.x,c.y=p.y)}),s}function lc(e,t,n,s,i){const c=rc(e,t,s).map(u=>`
      <div class="fd-field ${i?"fd-draggable":""}"
           data-fd-id="${u.id}"
           style="left:${u.x}mm; top:${u.y}mm; font-size:${u.fontSize}pt; --fd-color:${u.color};"
           title="${u.label} (${u.x.toFixed(1)}, ${u.y.toFixed(1)})">
        ${i?`<span class="fd-badge">${u.label}</span>`:""}
        <span class="fd-value">${u.value}</span>
      </div>
    `).join(""),p=n.showReferenceOverlay&&n.overlayImageUrl?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
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
        色: <span style="color:${oe.header}">■ヘッダ</span>
        <span style="color:${oe.code}">■コード</span>
        <span style="color:${oe.date}">■日付</span>
        <span style="color:${oe.detail}">■明細</span>
        <span style="color:${oe.total}">■合計</span>
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
        <label><input type="checkbox" data-print-opt="showReferenceOverlay" ${n.showReferenceOverlay?"checked":""} /> 参考画像表示</label>
        <label style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px;">濃さ</span>
          <input type="range" min="0" max="1" step="0.05" value="${n.overlayOpacity}" data-print-opt="overlayOpacity" style="width:140px;" />
        </label>
      </div>
    </section>
  `}function Xt(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const s=n.dataset.fdId??"",i=parseFloat(n.style.left)||0,l=parseFloat(n.style.top)||0;t[s]={x:i,y:l}}),t}function cc(e,t,n){const s=[...new Set(e.map(b=>b.areaCode).filter(Boolean))].sort(),i=[...new Set(e.map(b=>b.businessTypeName||b.businessType).filter(Boolean))].sort(),l=e.filter(b=>b.isAtRisk),c=e.filter(b=>!b.isAtRisk&&b.isDormant),p=e.filter(b=>!b.isAtRisk&&!b.isDormant&&b.amount12m>0),u=e.filter(b=>!b.isAtRisk&&!b.isDormant&&b.amount12m===0),y=t.filter(b=>b.lat&&b.lng),g=JSON.stringify(e),f=JSON.stringify(y.map(b=>({name:b.name,address:b.address,lat:b.lat,lng:b.lng,phone:b.phone})));return`
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
      <button class="button ${n.filterStatus==="all"?"primary":"secondary"} small" type="button" data-map-status="all">すべて</button>
      <button class="button ${n.filterStatus==="at-risk"?"primary":"secondary"} small" type="button" data-map-status="at-risk">🔴 離反リスク</button>
      <button class="button ${n.filterStatus==="dormant"?"primary":"secondary"} small" type="button" data-map-status="dormant">🟠 休眠</button>
      <button class="button ${n.filterStatus==="active"?"primary":"secondary"} small" type="button" data-map-status="active">🔵 取引中</button>
      <button class="button ${n.filterStatus==="inactive"?"primary":"secondary"} small" type="button" data-map-status="inactive">⚪ 売上なし</button>
      <select id="map-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${s.map(b=>`<option value="${b}" ${n.filterArea===b?"selected":""}>${b}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${i.map(b=>`<option value="${b}" ${n.filterBiz===b?"selected":""}>${b}</option>`).join("")}
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
      const ALL_CUSTOMERS = ${g};
      const DELIVERIES    = ${f};

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
    <\/script>`}const dc={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},pc=["new","picking","packed","shipped","delivered"];function uc(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(l=>t[l.stage].push(l));const n=pc.map(l=>{const c=dc[l],p=t[l];return`
      <div class="wf-col" data-wf-stage="${l}">
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
    `}).join(""),s=e.reduce((l,c)=>l+c.totalAmount,0),i=e.filter(l=>l.priority==="urgent").length;return`
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
      <article class="panel kpi-card ${i>0?"kpi-alert":""}">
        <p class="panel-title">急ぎ</p>
        <p class="kpi-value">${i}件</p>
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
  `}function mc(e,t,n){const s=e.cart.reduce((l,c)=>l+c.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((l,c)=>l+c.quantity,0)}<br/>
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

      ${yc(e,t,n)}
    </div>
  `}function yc(e,t,n){if(e.step==="customer"){const s=e.customerQuery.toLowerCase(),i=s?t.filter(l=>l.name.toLowerCase().includes(s)||l.code.toLowerCase().includes(s)):t.slice(0,20);return`
      <section class="panel">
        <input id="mo-customer-q" type="text" placeholder="顧客名・コード検索" value="${e.customerQuery}" class="mo-search" />
        <div class="mo-list">
          ${i.slice(0,30).map(l=>`
            <button class="mo-item ${e.selectedCustomer?.id===l.id?"selected":""}" data-mo-select-customer="${l.id}">
              <div class="mo-item-title">${l.name}</div>
              <div class="mo-item-sub mono">${l.code}</div>
            </button>
          `).join("")}
        </div>
      </section>
      ${e.selectedCustomer?'<div class="mo-footer"><button class="button primary mo-next" data-mo-step="products">商品選択へ ▶</button></div>':""}
    `}if(e.step==="products"){const s=e.productQuery.toLowerCase(),i=s?n.filter(l=>l.name.toLowerCase().includes(s)||l.code.toLowerCase().includes(s)):n.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${i.slice(0,50).map(l=>{const c=e.cart.find(p=>p.productCode===l.code);return`
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
          ${e.cart.map((s,i)=>`
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${s.productName}</div>
                <div class="mo-item-sub">${s.quantity} × ¥${s.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${s.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${i}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${e.cart.reduce((s,i)=>s+i.amount,0).toLocaleString("ja-JP")}</strong>
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
  `}const yn={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},hn={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},fn={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function hc(e,t){const n=e.find(l=>l.id===t)??e[0],s=e.filter(l=>l.status==="new").length,i=e.filter(l=>l.status==="confirmed").length;return`
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
          ${e.map(l=>`
            <button class="tour-item ${n?.id===l.id?"active":""}" data-tour-id="${l.id}">
              <div class="tour-item-head">
                <strong>${l.name}</strong>
                <span class="status-pill ${hn[l.status]}">${yn[l.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${fn[l.language]} · 👥 ${l.partySize}名
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
            <span class="status-pill ${hn[n.status]}">${yn[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${fn[n.language]}</dd></div>
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
  `}const fc=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,gc=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function vc(e,t){const n=t?e.find(i=>i.id===t):null,s=t==="__new__";return`
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
  `}function bc(e,t,n,s){const[i,l]=t.split("-").map(w=>parseInt(w,10)),c=new Date(i,l-1,1),p=new Date(i,l,0),u=c.getDay(),y=p.getDate(),g=[];for(let w=0;w<u;w++)g.push({isOutside:!0});for(let w=1;w<=y;w++)g.push({date:new Date(i,l-1,w)});for(;g.length%7!==0;)g.push({isOutside:!0});const f=n?e.filter(w=>w.category===n):e,b={};f.forEach(w=>{const x=w.startsAt.slice(0,10);b[x]??=[],b[x].push(w)});const S=new Date().toISOString().slice(0,10),P=g.map(w=>{if(w.isOutside)return'<div class="cal-cell cal-outside"></div>';const x=w.date,k=`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}-${String(x.getDate()).padStart(2,"0")}`,E=b[k]??[],C=k===S,D=x.getDay();return`
        <div class="cal-cell ${C?"cal-today":""} ${D===0?"cal-sun":D===6?"cal-sat":""}"
             data-cal-date="${k}">
          <div class="cal-day-num">${x.getDate()}</div>
          <div class="cal-events">
            ${E.slice(0,3).map(O=>`
              <button class="cal-event" data-cal-event-id="${O.id}"
                      style="background:${O.color||Na[O.category]||"#0F5B8D"};"
                      title="${O.title}">
                <span class="cal-event-time">${O.isAllDay?"終日":new Date(O.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${O.title}</span>
              </button>
            `).join("")}
            ${E.length>3?`<button class="cal-event-more" data-cal-date="${k}">+${E.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),o=s?.isOpen?$c(s):"",r=new Date(i,l-2,1),d=new Date(i,l,1),m=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`,v=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,$=(()=>{const w=new Date;return`${w.getFullYear()}-${String(w.getMonth()+1).padStart(2,"0")}`})();return`
    <section class="page-head">
      <div>
        <p class="eyebrow">カレンダー</p>
        <h1>${i}年 ${l}月</h1>
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
          <button class="button secondary" data-action="cal-next" data-ym="${v}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(Ta).map(([w,x])=>`<option value="${w}" ${n===w?"selected":""}>${x}</option>`).join("")}
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
  `}function $c(e){const t=e.event;return`
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
                ${Object.entries(Ta).map(([n,s])=>`<option value="${n}" ${t.category===n?"selected":""}>${s}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?gn(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?gn(t.endsAt):""}" />
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
  `}function gn(e){const t=new Date(e),n=s=>String(s).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const lt={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function wc(e,t){const n=t?e.find(s=>s.id===t):null;return`
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
        <p class="form-hint">${lt[n.provider]?.description??""}</p>
        ${lt[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${lt[n.provider].setupUrl}" target="_blank">${lt[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(lt[n.provider]?.fields??[]).map(s=>`
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
  `}function _c(e,t){const n=e.reduce((l,c)=>l+c.totalAmount,0),s=e.filter(l=>l.financialStatus==="paid").length,i=e.filter(l=>l.fulfillmentStatus!=="fulfilled"&&l.fulfillmentStatus!=="shipped").length;return`
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
  `}function xc(e,t,n){return`
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
  `}function Sc(e,t,n){const s=t==="__new__"?null:e.find(c=>c.id===t),i=t==="__new__";return n?.role==="admin"?`
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
                <td>${Tt[c.department]}</td>
                <td>${It[c.role]}</td>
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

    ${s||i?`
      <section class="panel">
        <div class="panel-header">
          <h2>${i?"新規ユーザー":`${s?.displayName} 編集`}</h2>
        </div>
        ${i?'<p class="form-hint">新規ユーザーを追加するとSupabase Authに登録され、初期パスワードでログインできます。</p>':""}
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 *</span>
            <input id="user-name" type="text" value="${s?.displayName??""}" placeholder="金井 太郎" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス *</span>
            <input id="user-email" type="email" value="${s?.email??""}" placeholder="taro@kaneishuzo.co.jp" ${s?"readonly":""} />
          </label>
          ${i?`<label class="field" style="flex:1 1 200px;">
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
              ${Object.entries(Tt).map(([c,p])=>`<option value="${c}" ${s?.department===c?"selected":""}>${p}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(It).map(([c,p])=>`<option value="${c}" ${s?.role===c?"selected":""}>${p}</option>`).join("")}
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
    `}function kc(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${Tt[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${It[e.role]}</dd></div>
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
    `}function Pc(e){const t={};return e.forEach(n=>{const s=n.userEmail??"(anonymous)";t[s]=(t[s]??0)+1}),`
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
  `}function Ec(e){const t=e.prospects.reduce((l,c)=>l+c.expectedAmount,0),n=e.prospects.reduce((l,c)=>l+c.expectedAmount*c.probability/100,0),s=e.prospects.filter(l=>l.stage==="won").length,i=e.prospects.filter(l=>l.stage==="hot"||l.stage==="negotiating").length;return`
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
      <article class="panel kpi-card ${i>0?"kpi-alert":""}">
        <p class="panel-title">ホット案件</p>
        <p class="kpi-value">${i}件</p>
        <p class="kpi-sub">見込み高 + 商談中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注</p>
        <p class="kpi-value">${s}件</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    ${e.viewMode==="kanban"?Ac(e.prospects):Cc(e.prospects)}

    ${Lc(e)}
  `}function Ac(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(s=>{const i=e.filter(c=>c.stage===s),l=i.reduce((c,p)=>c+p.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${s}">
          <div class="pk-col-header" style="--pk-color:${Oa[s]};">
            <span class="pk-col-label">${Bt[s]}</span>
            <span class="pk-col-count">${i.length}</span>
          </div>
          <div class="pk-col-sub">¥${l.toLocaleString("ja-JP")}</div>
          <div class="pk-col-body">
            ${i.length===0?'<div class="wf-empty">―</div>':i.map(c=>`
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
  `}function Cc(e){return`
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
                <td><span class="status-pill" style="background:${Oa[t.stage]};color:white;">${Bt[t.stage]}</span></td>
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
  `}function Lc(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(s=>s.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(Bt).map(([s,i])=>`<option value="${s}" ${n?.stage===s?"selected":""}>${i}</option>`).join("")}
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
  `}function Dc(e,t,n){const s=e?.config.webhook_url??"",i=e?.config.default_channel??"#general";return`
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
            ${t.map(l=>`
              <tr>
                <td>${Nt[l.eventType]||l.eventType}</td>
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
                <td>${Nt[l.eventType]||l.eventType}</td>
                <td class="mono" style="font-size:12px;">${l.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${l.message}</td>
                <td><span class="status-pill ${l.status==="sent"?"success":"warning"}">${l.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function qc(e,t,n,s){const i=new Map(t.map(f=>[f.code,f])),l=e.filter(f=>f.callDirection==="inbound").length,c=e.filter(f=>f.callDirection==="outbound").length,p=e.filter(f=>f.callStatus==="missed").length,u=e.reduce((f,b)=>f+(b.durationSeconds??0),0),y=f=>{if(f===0)return"―";const b=Math.floor(f/60),S=f%60;return b>0?`${b}分${S}秒`:`${S}秒`},g=f=>{if(f.matchedCustomerCode){const b=i.get(f.matchedCustomerCode);if(b)return`${b.name} (既存)`}return"未登録番号"};return`
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
  `}const Ic=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function Tc(e){const t=e.activeListId?e.lists.find(l=>l.id===e.activeListId):null,n=e.items.filter(l=>l.status==="new").length,s=e.items.filter(l=>l.status==="imported").length,i=e.items.filter(l=>l.status==="excluded").length;return`
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
            ${Ic.map(l=>`<option value="${l}" ${e.searchBusinessType===l?"selected":""}>${l}</option>`).join("")}
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
            <span>✅ 取込済: <strong>${s}</strong></span>
            <span>❌ 除外: <strong>${i}</strong></span>
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
  `}const vn={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Nc={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},Oc={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function ye(e){return"¥"+e.toLocaleString("ja-JP")}function yt(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Ds(e,t){const n=e.reduce((l,c)=>l+c.amount,0),s=Math.floor(n*t),i=n+s;return{subtotal:n,taxAmount:s,total:i}}const ne={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function se(e,t){const n=e.align??"left",s=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${s}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function Wt(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),s=n-2018;return{y:s>0?String(s).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function Mc(e,t,n){const s=Wt(e.documentDate),i=Wt(e.orderDate??e.documentDate),l=Wt(e.deliveryDate??e.documentDate),c=e.lines.slice(0,6).map((r,d)=>{const m=ne.detailStartY+d*ne.detailRowH,v=ne.detailCols,$=[],w=(x,k)=>{k&&$.push(se({...x,y:m,x:x.x+0},k))};return w(v.productName,r.productName+(r.spec?` ${r.spec}`:"")),w(v.productCode,r.productCode),w(v.color,r.color??""),w(v.size,[r.size,r.caseQty?`×${r.caseQty}`:""].filter(Boolean).join(" ")),w(v.unit,r.unit),w(v.quantity,r.quantity>0?r.quantity.toLocaleString("ja-JP"):""),w(v.correctedQty,r.correctedQuantity?r.correctedQuantity.toLocaleString("ja-JP"):""),w(v.discount,r.discount?r.discount.toLocaleString("ja-JP"):""),w(v.unitPrice,r.unitPrice>0?r.unitPrice.toLocaleString("ja-JP"):""),w(v.costAmount,r.amount>0?r.amount.toLocaleString("ja-JP"):""),w(v.retailPrice,r.retailPrice?r.retailPrice.toLocaleString("ja-JP"):""),w(v.note,r.receivedAmount?r.receivedAmount.toLocaleString("ja-JP"):""),$.join("")}).join(""),p=e.lines.reduce((r,d)=>r+(d.amount||0),0),u=e.lines.reduce((r,d)=>r+(d.retailPrice||0)*(d.correctedQuantity??d.quantity),0),y=e.lines.reduce((r,d)=>r+(d.receivedAmount||0),0),g=e.lines.reduce((r,d)=>r+(d.returnAmount||0),0),f=e.lines.reduce((r,d)=>r+d.quantity,0),b=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",S=n.calibrationOffsetX||0,P=n.calibrationOffsetY||0,o=`transform: translate(${S}mm, ${P}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${b}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${o}">
        ${se(ne.currentDateY,s.y)}
        ${se(ne.currentDateM,s.m)}
        ${se(ne.currentDateD,s.d)}
        ${se(ne.documentNo,e.documentNo)}
        ${e.settlementPrint?se(ne.settlementCheck,"✓"):""}

        ${se(ne.vendorName,t.name)}
        ${se(ne.vendorAddress,t.address1)}
        ${se(ne.chainStoreCode,e.chainStoreCode??"")}
        ${se(ne.categoryCode,e.categoryCode??"")}
        ${se(ne.slipNumber,e.documentNo)}
        ${se(ne.vendorCode,e.slipTypeCode??"")}

        ${se(ne.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${se(ne.orderDateY,i.y)}
        ${se(ne.orderDateM,i.m)}
        ${se(ne.orderDateD,i.d)}
        ${se(ne.deliveryDateY,l.y)}
        ${se(ne.deliveryDateM,l.m)}
        ${se(ne.deliveryDateD,l.d)}
        ${se(ne.orderNo,e.orderNo??"")}
        ${se(ne.partnerCode,e.vendorCode??"")}

        ${c}

        ${se(ne.totalQty,f.toLocaleString("ja-JP"))}
        ${se(ne.receivedTotal,y.toLocaleString("ja-JP"))}
        ${se(ne.returnTotal,g.toLocaleString("ja-JP"))}
        ${se(ne.correctedCostTotal,p.toLocaleString("ja-JP"))}
        ${se(ne.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function Rc(e,t,n){const{subtotal:s,taxAmount:i,total:l}=Ds(e.lines,e.taxRate),c=e.previousBalance??0,p=e.paymentAmount??0,u=c-p+l,y=e.lines.map(f=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${f.note??""}</td>
        <td>${f.productName}${f.spec?` <span style="color:#636e72;font-size:9pt;">/ ${f.spec}</span>`:""}</td>
        <td class="numeric">${f.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${f.unit}</td>`:""}
        <td class="numeric">${ye(f.unitPrice)}</td>
        <td class="numeric">${ye(f.amount)}</td>
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
        <div><dt>請求日</dt><dd>${yt(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${yt(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${ye(u)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${ye(s)} / 消費税: ${ye(i)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${c?`<tr><th>前回御請求額</th><td>${ye(c)}</td></tr>`:""}
          ${p?`<tr><th>ご入金額</th><td>▲ ${ye(p)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${ye(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${ye(i)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${ye(u)}</td></tr>
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
  `}function jc(e,t,n){const{subtotal:s,taxAmount:i,total:l}=Ds(e.lines,e.taxRate),c=e.lines.map(u=>`
      <tr>
        <td>${u.productName}${u.spec?` <span style="color:#636e72;font-size:9pt;">/ ${u.spec}</span>`:""}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${u.unit}</td>`:""}
        <td class="numeric">${ye(u.unitPrice)}</td>
        <td class="numeric">${ye(u.amount)}</td>
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
        <div><dt>見積日</dt><dd>${yt(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${yt(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${ye(l)}</span>
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
        <tbody>${c}${p}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${ye(s)} / 消費税: ${ye(i)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${ye(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${ye(i)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${ye(l)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?yt(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function zc(e,t,n,s){let i="";switch(e){case"chain_store":i=Mc(s,n,t);break;case"quotation":i=jc(s,n,t);break;case"invoice_monthly":i=Rc(s,n,t);break}const l=Object.keys(vn).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${vn[u]}</button>`).join(""),c=s.lines.map((u,y)=>`
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
  `}const Bc={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},Fc={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function qs(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],s="",i=!1;for(let p=0;p<e.length;p++){const u=e[p];i?u==='"'?e[p+1]==='"'?(s+='"',p++):i=!1:s+=u:u==='"'?i=!0:u===","?(n.push(s),s=""):u===`
`||u==="\r"?(u==="\r"&&e[p+1]===`
`&&p++,n.push(s),n.some(y=>y!=="")&&t.push(n),n=[],s=""):s+=u}if((s!==""||n.length>0)&&(n.push(s),n.some(p=>p!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const l=t[0].map(p=>p.trim()),c=[];for(let p=1;p<t.length;p++){const u={};l.forEach((y,g)=>{u[y]=(t[p][g]??"").trim()}),c.push(u)}return{columns:l,rows:c}}function Is(e,t,n){const s=Bc[e],i=s.filter(p=>!t.includes(p)),l=n.map(p=>{const u=[];i.length>0&&u.push(`必須列欠損: ${i.join(",")}`);for(const y of s)t.includes(y)&&!p[y]&&u.push(`${y}が空`);return{...p,_valid:u.length===0,_error:u[0]}}),c=l.filter(p=>p._valid).length;return{entity:e,columns:t,rows:l,totalRows:n.length,validRows:c,invalidRows:l.length-c}}function Ts(e){const n=Fc[e],i={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+i.join(",")+`
`}async function Ns(e,t){const{supabaseInsert:n}=await q(async()=>{const{supabaseInsert:p}=await Promise.resolve().then(()=>G);return{supabaseInsert:p}},void 0);let s=0,i=0;const c={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const p of t){if(!p._valid)continue;const{_valid:u,_error:y,...g}=p,f={...g};if(!f.id){const b=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";f.id=String(g[b]??`${e}-${Date.now()}-${s+i}`)}for(const b of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof f[b]=="string"&&f[b]!==""){const S=Number(f[b]);Number.isFinite(S)&&(f[b]=S)}try{await n(c,f)!==null?s++:i++}catch{i++}}return{inserted:s,failed:i}}const Vc=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:Ts,importToSupabase:Ns,parseCSV:qs,validateImport:Is},Symbol.toStringTag,{value:"Module"}));function Zt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Yc(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Jc(e,t,n,s,i){const l=n.reduce((y,g)=>y+g.rowCount,0),c=n.map(y=>y.lastSyncAt).filter(y=>y!==null).sort().reverse()[0]??null,p=100,u=Math.max(1,Math.ceil(i/p));return`
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
        <p class="kpi-value">${c?Zt(c):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${y.lastSyncAt?Zt(y.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(y=>y.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${i.toLocaleString("ja-JP")}件中 ${((s-1)*p+1).toLocaleString("ja-JP")}-${Math.min(s*p,i).toLocaleString("ja-JP")} を表示</p>
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
              <td>${y._synced_at?Zt(y._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${y._raw_b64?y._raw_b64.slice(0,200):""}">${Yc(y._raw_b64)}</td>
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
  `}const tt=400,at=240;function X(e){return e.toLocaleString("ja-JP")}function ea(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function Uc(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function Ee(e,t,n,s=""){return`<th class="${s}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${Uc(n,t)}</th>`}function ct(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function Qc(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const s=e.products.slice().sort((d,m)=>(e.productTotals[m.code]??0)-(e.productTotals[d.code]??0)).slice(0,6),i=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],l=820,c=280,p={top:20,right:20,bottom:40,left:60},u=l-p.left-p.right,y=c-p.top-p.bottom,g=t.map(d=>s.reduce((m,v)=>m+(n[v.code]?.[d]??0),0)),f=Math.max(...g,1),b=u/t.length,S=Math.max(b-10,14),P=[0,.25,.5,.75,1].map(d=>{const m=p.top+y-y*d,v=`${Math.round(f*d/100)*100}`;return`
      <line x1="${p.left}" y1="${m}" x2="${l-p.right}" y2="${m}" class="chart-grid" />
      <text x="6" y="${m+4}" class="chart-axis">${Number(v).toLocaleString("ja-JP")}</text>
    `}).join(""),o=t.map((d,m)=>{let v=p.top+y;const $=p.left+m*b+(b-S)/2,w=s.map((O,L)=>{const M=(n[O.code]?.[d]??0)/f*y;return v-=M,`<rect x="${$}" y="${v}" width="${S}" height="${M}" fill="${i[L%i.length]}" opacity="0.85" rx="${L===s.length-1?3:0}" />`}).join(""),[x,k]=d.split("-"),E=parseInt(k),C=E===1||m%3===0,D=E===1?`${x.slice(2)}年`:`${E}月`;return`<g>${w}${C?`<text x="${$+S/2}" y="${c-10}" class="chart-axis centered-axis">${D}</text>`:""}</g>`}).join(""),r=s.map((d,m)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${i[m%i.length]};"></span>
       ${d.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${l} ${c}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${P}${o}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${p.left}px;display:flex;flex-wrap:wrap;">${r}</div>
  `}function Hc(e){const{months:t,products:n}=e,s=n.slice().sort((c,p)=>(e.productTotals[p.code]??0)-(e.productTotals[c.code]??0)).slice(0,50),i=t.map(c=>{const[p,u]=c.split("-"),y=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${y===1?`${p.slice(2)}年1月`:`${y}月`}</th>`}).join(""),l=s.map(c=>{const p=t.map(u=>{const y=e.matrix[c.code]?.[u]??0;return`<td class="numeric">${y>0?X(y):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${c.code}</td>
        <td style="white-space:nowrap;">${c.name}</td>
        ${p}
        <td class="numeric"><strong>${X(e.productTotals[c.code]??0)}</strong></td>
        <td class="numeric">${X(Math.round(e.productAvg[c.code]??0))}</td>
        <td class="numeric">${X(Math.round(e.productStdDev[c.code]??0))}</td>
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
        <tbody>${l||`<tr><td colspan="${t.length+5}" class="empty-row">データなし</td></tr>`}</tbody>
      </table>
    </div>
  `}function Gc(e,t){const n=e.months[e.months.length-1]??"",s=e.months[e.months.length-2]??"",i=e.months.length-13,l=i>=0?e.months[i]:"",c=e.products.reduce((S,P)=>S+(e.matrix[P.code]?.[n]??0),0),p=e.products.reduce((S,P)=>S+(e.matrix[P.code]?.[s]??0),0),u=l?e.products.reduce((S,P)=>S+(e.matrix[P.code]?.[l]??0),0):0,y=p>0?(c-p)/p*100:0,g=u>0?(c-u)/u*100:0,f=S=>S>=0?"+":"",b=[1,2,3,5].map(S=>`<option value="${S}" ${S===t?"selected":""}>${S}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${X(c)} 本</p>
        <p class="kpi-sub">${ea(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${y>=0?"":"text-danger"}">${f(y)}${y.toFixed(1)}%</p>
        <p class="kpi-sub">${ea(s)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${g>=0?"":"text-danger"}">${u>0?`${f(g)}${g.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${l?`${ea(l)} 比`:"前年データなし"}</p>
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
      ${Qc(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${Hc(e)}
    </section>
  `}function Kc(e,t){const s=e.slice().sort((l,c)=>{if(!t)return 0;const p=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return p*l.productName.localeCompare(c.productName,"ja");case"ss-avg":return p*(l.avgMonthlyDemand-c.avgMonthlyDemand);case"ss-std":return p*(l.demandStdDev-c.demandStdDev);case"ss-ss":{const u=Math.ceil(ct(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(ct(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return p*(u-y)}case"ss-rop":{const u=Math.ceil(l.avgMonthlyDemand*(l.leadTimeDays/30)+ct(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(c.avgMonthlyDemand*(c.leadTimeDays/30)+ct(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return p*(u-y)}default:return 0}}).map(l=>{const c=ct(l.serviceLevel),p=l.leadTimeDays/30,u=Math.ceil(c*l.demandStdDev*Math.sqrt(p)),y=Math.ceil(l.avgMonthlyDemand*p+u),g=u-l.safetyStockQty,f=g>0?"text-danger":g<-u*.3?"text-warning":"",b=[.9,.95,.99].map(S=>`<option value="${S}" ${Math.abs(l.serviceLevel-S)<.01?"selected":""}>${(S*100).toFixed(0)}%</option>`).join("");return`
      <tr>
        <td style="white-space:nowrap;">${l.productName}</td>
        <td class="numeric">${X(Math.round(l.avgMonthlyDemand))}</td>
        <td class="numeric">${X(Math.round(l.demandStdDev))}</td>
        <td>
          <input class="input-sm" type="number" min="1" max="180"
            value="${l.leadTimeDays}"
            data-action="ss-lead-time" data-code="${l.productCode}"
            style="width:60px;text-align:right;" />
        </td>
        <td>
          <select class="input-sm" data-action="ss-service-level" data-code="${l.productCode}"
            style="width:64px;">${b}</select>
        </td>
        <td class="numeric"><strong>${X(u)}</strong></td>
        <td class="numeric">${X(y)}</td>
        <td class="numeric ${f}">
          ${g>0?`+${X(g)}`:X(g)}
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
              ${Ee("商品名","ss-name",t)}
              ${Ee("月平均需要","ss-avg",t,"numeric")}
              ${Ee("標準偏差","ss-std",t,"numeric")}
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              ${Ee("安全在庫[算出]","ss-ss",t,"numeric")}
              ${Ee("発注点","ss-rop",t,"numeric")}
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const Xc={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function Wc(e,t,n,s){const i={draft:"下書き",confirmed:"確定",actual:"実績入力済"},l={draft:"neutral",confirmed:"info",actual:"success"},c=k=>Object.entries(Xc).map(([E,C])=>`<option value="${E}" ${E===k?"selected":""}>${C}</option>`).join(""),p=640,u=k=>k.map(E=>{const C=Math.max(0,E.demandForecast+E.safetyStockTarget-E.openingStock),D=E.plannedQty>0?E.plannedQty:Math.round(C),O=D>0?Math.ceil(D/p*10)/10:0,L=E.plannedQty>0?(E.actualQty-E.plannedQty)/E.plannedQty*100:null,I=L!==null?L>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${E.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${E.productCode}"
            style="width:92px;">${c(E.productionType)}</select>
        </td>
        <td class="numeric">${X(Math.round(E.demandForecast))}</td>
        <td class="numeric">${X(Math.round(E.safetyStockTarget))}</td>
        <td class="numeric">${X(Math.round(E.openingStock))}</td>
        <td class="numeric"><strong>${X(Math.round(C))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${E.plannedQty}"
            data-action="plan-qty" data-code="${E.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">${E.actualQty>0?X(E.actualQty):"—"}</td>
        <td class="numeric ${I}">
          ${L!==null?`${L>=0?"+":""}${L.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${O>0?`${O.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${l[E.status]??"neutral"}">${i[E.status]??E.status}</span>
        </td>
      </tr>
    `}).join(""),g=(n==="all"?e:e.filter(k=>k.productionType===n)).slice().sort((k,E)=>{if(!s)return 0;const C=s.dir==="asc"?1:-1,D=Math.max(0,k.demandForecast+k.safetyStockTarget-k.openingStock),O=Math.max(0,E.demandForecast+E.safetyStockTarget-E.openingStock);switch(s.column){case"plan-name":return C*k.productName.localeCompare(E.productName,"ja");case"plan-forecast":return C*(k.demandForecast-E.demandForecast);case"plan-required":return C*(D-O);case"plan-planned":return C*(k.plannedQty-E.plannedQty);case"plan-actual":return C*(k.actualQty-E.actualQty);case"plan-label":{const L=k.plannedQty>0?k.plannedQty:Math.round(D),I=E.plannedQty>0?E.plannedQty:Math.round(O);return C*(L-I)}default:return 0}}),f=u(g),b=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],S=k=>{const C=(k==="all"?e:e.filter(D=>D.productionType===k)).reduce((D,O)=>{const L=Math.max(0,O.demandForecast+O.safetyStockTarget-O.openingStock);return D+(O.plannedQty>0?O.plannedQty:Math.round(L))},0);return Math.ceil(C/p*10)/10},P=b.filter(k=>k.key!=="all").map(k=>{const E=S(k.key),C=e.filter(O=>O.productionType===k.key).length,D=k.key==="make_to_order"?e.filter(O=>O.productionType==="make_to_order"&&O.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${k.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${E>0?E.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${C}商品${D!==null?` · 受注${D}件`:""}</p>
      </div>
    `}).join(""),o=g.reduce((k,E)=>k+E.demandForecast,0),r=g.reduce((k,E)=>k+Math.max(0,E.demandForecast+E.safetyStockTarget-E.openingStock),0),d=g.reduce((k,E)=>k+E.plannedQty,0),m=g.reduce((k,E)=>k+E.actualQty,0),v=S(n),$=new Date,w=Array.from({length:24},(k,E)=>{const C=new Date($.getFullYear(),$.getMonth()-6+E,1),D=`${C.getFullYear()}-${String(C.getMonth()+1).padStart(2,"0")}`;return`<option value="${D}" ${D===t?"selected":""}>${D.replace("-","年")}月</option>`}).join(""),x=b.map(k=>`<button class="button ${n===k.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${k.key}"
       style="padding:4px 12px;font-size:13px;">${k.label}</button>`).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${w}</select>
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
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${x}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${Ee("商品名","plan-name",s)}
              <th>生産区分</th>
              ${Ee("需要予測","plan-forecast",s,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${Ee("必要生産数","plan-required",s,"numeric")}
              ${Ee("計画数","plan-planned",s,"numeric")}
              ${Ee("実績数","plan-actual",s,"numeric")}
              <th class="numeric">達成率</th>
              ${Ee("ラベル工数","plan-label",s,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${f||'<tr><td colspan="11" class="empty-row">データなし</td></tr>'}
            ${g.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${X(Math.round(o))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${X(Math.round(r))}</td>
                <td class="numeric">${X(d)}</td>
                <td class="numeric">${m>0?X(m):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${v.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Os(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n,0).getDate();return Array.from({length:s},(i,l)=>{const c=l+1;return`${e}-${String(c).padStart(2,"0")}`})}function bn(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function $n(e){const t=new Date(e).getDay();return t===0||t===6}function Zc(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function Ms(e){return e.partTimers+e.employees}function Ae(e,t,n={partCapacity:tt,empCapacity:at}){const s=e.filter(g=>g.partTimers>0||g.employees>0);if(s.length===0)return;const i=t.reduce((g,f)=>{const b=f.plannedQty>0?f.plannedQty:Math.max(0,f.demandForecast+f.safetyStockTarget-f.openingStock);return g+b},0);if(i<=0)return;const l=i/s.length;let c=0,p=0,u=1/0;const y=Math.ceil(l/n.partCapacity);for(let g=0;g<=y;g++){const f=l-g*n.partCapacity,b=f>0?Math.ceil(f/n.empCapacity):0,S=g+b;S<u&&(u=S,c=g,p=b)}for(const g of e)g.confirmed||(g.partTimers>0||g.employees>0)&&(g.partTimers=c,g.employees=p)}function ed(e,t,n={partCapacity:tt,empCapacity:at}){const s=t.filter(p=>Ms(p)>0).map(p=>p.date).sort();if(s.length===0)return t.map(p=>({date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const i={monthly:0,november:1,annual:2,make_to_order:3},l=e.filter(p=>p.plannedQty>0||Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)>0).map(p=>({productCode:p.productCode,productName:p.productName,productionType:p.productionType,remaining:p.plannedQty>0?p.plannedQty:Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)})).filter(p=>p.remaining>0).sort((p,u)=>(i[p.productionType]??99)-(i[u.productionType]??99)||u.remaining-p.remaining),c=new Map;for(const p of t){const u=Zc(p,n);c.set(p.date,{date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const p of l){let u=p.remaining;if(u<=0)continue;if(s.reduce((g,f)=>{const b=c.get(f);return g+Math.max(0,b.capacity-b.totalQty)},0)<=0)break;for(const g of s){if(u<=0)break;const f=c.get(g),b=Math.max(0,f.capacity-f.totalQty);if(b<=0)continue;const S=Math.min(u,b);f.items.push({productCode:p.productCode,productName:p.productName,productionType:p.productionType,qty:S}),f.totalQty+=S,f.utilization=f.capacity>0?f.totalQty/f.capacity:0,u-=S}}return t.map(p=>c.get(p.date))}function qt(e,t=1,n=1){return Os(e).map(s=>({date:s,partTimers:$n(s)?0:t,employees:$n(s)?0:n,confirmed:!1}))}function td(e,t,n,s=null,i=new Set,l={partCapacity:tt,empCapacity:at}){const c=Os(t),p=e.filter(L=>!i.has(L.productCode)),u=ed(p,n,l),y=new Map(u.map(L=>[L.date,L])),g=p.reduce((L,I)=>L+(I.plannedQty>0?I.plannedQty:Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock)),0),b=e.reduce((L,I)=>L+(I.plannedQty>0?I.plannedQty:Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock)),0)-g,S=u.reduce((L,I)=>L+I.totalQty,0),P=n.filter(L=>Ms(L)>0).length,o=u.reduce((L,I)=>L+I.capacity,0),r=n.reduce((L,I)=>L+I.partTimers,0),d=n.reduce((L,I)=>L+I.employees,0),m=P>0?Math.ceil(g/P):0,v=new Date,$=Array.from({length:24},(L,I)=>{const M=new Date(v.getFullYear(),v.getMonth()-6+I,1),B=`${M.getFullYear()}-${String(M.getMonth()+1).padStart(2,"0")}`;return`<option value="${B}" ${B===t?"selected":""}>${B.replace("-","年")}月</option>`}).join(""),w=new Date(c[0]).getDay(),x=[];for(let L=0;L<w;L++)x.push('<div style="min-height:44px;"></div>');for(const L of c){const I=y.get(L),M=new Date(L).getDay(),B=parseInt(L.split("-")[2]),z=I?.partTimers??0,Q=I?.employees??0,F=z+Q,j=I?.totalQty??0,U=I?.utilization??0,Z=L===s,re=F===0?"var(--surface-alt)":U>.95?"rgba(197,61,61,0.12)":U>.7?"rgba(183,121,31,0.10)":U>0?"rgba(47,133,90,0.08)":"var(--surface)",ie=F===0?"transparent":U>.95?"#c53d3d":U>.7?"#b7791f":U>0?"#2f855a":"var(--border)",V=M===0?"#c53d3d":M===6?"#0F5B8D":"var(--text)",ee=F>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${z>0?`パ${z}`:""}${Q>0?`社${Q}`:""}</span>`:"";x.push(`
      <div data-action="cal-toggle-day" data-date="${L}"
        style="min-height:44px;padding:3px;border:${Z?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${re};cursor:pointer;display:flex;flex-direction:column;
          ${Z?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${V};line-height:1;">${B}</span>
          ${ee}
        </div>
        ${F>0?`
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${j>0?X(j):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(U*100,100)}%;background:${ie};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const E=x.length%7;if(E>0)for(let L=0;L<7-E;L++)x.push('<div style="min-height:44px;"></div>');const C=s?y.get(s):null;s&&n.find(L=>L.date===s);const D=s&&C?(()=>{const L=C,I=parseInt(s.split("-")[2]),M=bn(s),B=Math.round(L.utilization*100),z=n.find(J=>J.date===s),Q=s===new Date().toISOString().slice(0,10),F={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},j={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},U=L.items.map(J=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${F[J.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${J.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${j[J.productionType]??J.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${X(J.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),Z=`パ${L.partTimers}×${l.partCapacity} 社${L.employees}×${l.empCapacity} = ${X(L.capacity)}本`,re=L.totalQty>0?Math.ceil(L.totalQty/l.partCapacity):0,ie=[];if(L.totalQty>0)for(let J=0;J<=re;J++){const K=L.totalQty-J*l.partCapacity;if(K<=0){ie.push({p:J,e:0});break}const qe=Math.ceil(K/l.empCapacity);ie.push({p:J,e:qe})}const V=L.totalQty-L.capacity,ee=L.totalQty===0?"":V>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${X(V)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',$e=ie.filter(J=>J.p+J.e>0).sort((J,K)=>J.p+J.e-(K.p+K.e)).slice(0,3),ge=L.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${X(L.totalQty)}本を収めるには ${ee}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${$e.map((J,K)=>{const qe=J.p===L.partTimers&&J.e===L.employees;return`<button data-action="cal-apply-pattern" data-date="${s}" data-part="${J.p}" data-emp="${J.e}"
              style="font-size:11px;padding:4px 10px;border:1px solid ${qe?"#2f855a":"var(--border)"};
                border-radius:4px;background:${qe?"rgba(47,133,90,0.08)":"var(--surface)"};
                cursor:pointer;white-space:nowrap;${qe?"font-weight:600;":""}">
              パ${J.p}社${J.e}＝${J.p+J.e}人
              <span style="color:var(--text-secondary);margin-left:2px;">${X(J.p*l.partCapacity+J.e*l.empCapacity)}本</span>
            </button>`}).join("")}
        </div>
      </div>
    `:"";return`
      <section class="panel" style="margin-top:12px;border:2px solid ${Q?"#2f855a":"#0F5B8D"};">
        <div style="padding:12px 16px 8px;${Q?"background:rgba(47,133,90,0.06);":""}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            ${Q?'<span style="background:#2f855a;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;">TODAY</span>':""}
            <h2 style="margin:0;font-size:16px;">${I}日（${M}）${Q?"":"の生産内訳"}</h2>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${Z} ・ 稼働率${B}%</div>
          ${L.totalQty>0?`<div style="font-size:20px;font-weight:700;margin-top:6px;">${X(L.totalQty)}<span style="font-size:13px;font-weight:400;">本</span> <span style="font-size:13px;font-weight:400;">/ ${L.items.length}品</span></div>`:""}
        </div>
        ${ge}
        <div style="display:flex;gap:12px;padding:0 4px 8px;flex-wrap:wrap;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="${z?.partTimers??0}"
              data-action="cal-shift-part" data-date="${s}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="${z?.employees??0}"
              data-action="cal-shift-emp" data-date="${s}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
        ${L.items.length>0?`
          <div style="padding:0 4px;">
            ${U}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${X(L.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():s?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(s.split("-")[2])}日（${bn(s)}）— 休日</p>
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
  `:"",O=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(L=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${L.color};"></span>${L.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${$}</select>
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
      <div><strong>${X(Math.round(g))}</strong>本 ÷ <strong>${P}</strong>稼働日 = 日当たり<strong>${X(m)}</strong>本</div>
      <div>→ パ<strong>${r}</strong> 社<strong>${d}</strong>人日 ・ キャパ<strong>${X(o)}</strong>本
        ${S<g?` <span style="color:#c53d3d;">（${X(Math.round(g-S))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
      </div>
      <div style="color:var(--text-secondary);font-size:10px;">日付タップで稼働ON/OFF → 人数自動計算</div>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${O}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((L,I)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${I===0?"#c53d3d":I===6?"#0F5B8D":"var(--text-secondary)"};">${L}</div>`).join("")}
        ${x.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">日付タップで稼働ON/OFF</p>
    </section>

    ${D}

    <section class="panel" style="margin-top:12px;" id="cal-label-section">
      <div class="panel-header" style="padding-bottom:4px;">
        <div>
          <h2 style="font-size:14px;">ラベル対象商品</h2>
          <p class="panel-caption">区分ごとにまとめて外す or 個別に外せます${i.size>0?`（<strong>${i.size}</strong>品除外中 = ${X(Math.round(b))}本）`:""}</p>
        </div>
        <button class="button primary" type="button" data-action="cal-save-exclusions"
          style="padding:6px 14px;font-size:12px;">設定を保存</button>
      </div>
      <div id="cal-label-list" style="max-height:500px;overflow-y:auto;">
        ${(()=>{const L=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],I=new Map;for(const M of e){if((M.plannedQty>0?M.plannedQty:Math.max(0,M.demandForecast+M.safetyStockTarget-M.openingStock))<=0)continue;const z=M.productionType||"monthly";I.has(z)||I.set(z,[]),I.get(z).push(M)}return L.filter(M=>I.has(M.key)).map(M=>{const B=I.get(M.key),z=B.reduce((Z,re)=>Z+(re.plannedQty>0?re.plannedQty:Math.max(0,re.demandForecast+re.safetyStockTarget-re.openingStock)),0),Q=B.filter(Z=>i.has(Z.productCode)).length,F=Q===B.length,j=Q===0,U=B.map(Z=>{const re=Z.plannedQty>0?Z.plannedQty:Math.max(0,Z.demandForecast+Z.safetyStockTarget-Z.openingStock),ie=i.has(Z.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${ie?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${Z.productCode}"
                    ${ie?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${ie?"text-decoration:line-through;":""}">${Z.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${X(Math.round(re))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${M.key}"
                    ${F?"":"checked"} ${!j&&!F?'class="indeterminate"':""}
                    style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${M.color};flex-shrink:0;"></span>
                  <div style="flex:1;font-size:13px;font-weight:600;">${M.label}<span style="font-weight:400;color:var(--text-secondary);margin-left:6px;">${B.length}品 ${X(Math.round(z))}本</span></div>
                  ${Q>0&&!F?`<span style="font-size:11px;color:#b7791f;">${Q}品除外</span>`:""}
                  ${F?'<span style="font-size:11px;color:var(--text-secondary);">全除外</span>':""}
                </div>
                ${U}
              </div>
            `}).join("")})()}
      </div>
    </section>
  `}function ad(e,t,n,s,i,l,c="all",p=null,u=[],y=null,g=new Set,f={partCapacity:tt,empCapacity:at}){const S=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(o=>`<button class="tab-button ${s===o.key?"active":""}"
       data-demand-tab="${o.key}">${o.label}</button>`).join("");let P="";if(s==="demand")P=e?Gc(e,l):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(s==="safety")P=Kc(t,p);else if(s==="plan")P=Wc(n,i,c,p);else if(s==="calendar")try{P=td(n,i,u,y,g,f)}catch(o){console.error("[renderCalendarTab] error:",o),P=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(o)}
${o?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${S}
    </div>

    ${P}
  `}const Ne={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},De=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function W(e){return e.toLocaleString("ja-JP")}function le(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function za(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function nd(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function Yt(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function sd(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(r=>r.month))].sort(),n=De.filter(r=>e.some(d=>d.brewCategory===r)),s={};for(const r of e)s[r.month]||(s[r.month]={}),s[r.month][r.brewCategory]=r.shipmentMl;const i=820,l=300,c={top:20,right:20,bottom:50,left:70},p=i-c.left-c.right,u=l-c.top-c.bottom,y=t.map(r=>n.reduce((d,m)=>d+(s[r]?.[m]??0),0)),g=Math.max(...y,1),f=p/t.length,b=Math.max(f-8,14),S=[0,.25,.5,.75,1].map(r=>{const d=c.top+u-u*r,m=g*r/1e3;return`
      <line x1="${c.left}" y1="${d}" x2="${i-c.right}" y2="${d}" class="chart-grid" />
      <text x="6" y="${d+4}" class="chart-axis">${Math.round(m).toLocaleString("ja-JP")}L</text>
    `}).join(""),P=t.map((r,d)=>{let m=c.top+u;const v=c.left+d*f+(f-b)/2,$=n.map(D=>{const O=s[r]?.[D]??0,L=O/g*u;return m-=L,L>0?`<rect x="${v}" y="${m}" width="${b}" height="${L}" fill="${Ne[D]??"#9ca3af"}" opacity="0.85" rx="1"><title>${D}: ${le(O)}L</title></rect>`:""}).join(""),[w,x]=r.split("-"),k=parseInt(x),E=k===10||d%2===0,C=k===10?`${w}年度`:`${k}月`;return`<g>${$}${E?`<text x="${v+b/2}" y="${l-12}" class="chart-axis centered-axis" style="font-size:10px;">${C}</text>`:""}</g>`}).join(""),o=n.map(r=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${Ne[r]??"#9ca3af"};"></span>
       ${r}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${i} ${l}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${S}${P}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${c.left}px;display:flex;flex-wrap:wrap;">${o}</div>
  `}function od(e,t,n,s){const i=new Map;for(const p of e){const u=p.brewCategory;i.has(u)||i.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const y=i.get(u);y.rows.push(p),y.totalMl+=p.totalShipmentMl,y.avgMl+=p.monthlyAvgMl,y.stockL=p.currentStockL}const l=new Map;for(const p of t)l.has(p.brewCategory)||l.set(p.brewCategory,[]),l.get(p.brewCategory).push(p);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${De.filter(p=>i.has(p)).map(p=>{const u=i.get(p),y=Ne[p]??"#9ca3af",g=Yt(p);l.get(p);const f=n[p]??{rawAlcoholPct:18,targetAlcoholPct:15},b=f.targetAlcoholPct>0?f.rawAlcoholPct/f.targetAlcoholPct:1;u.stockL*1e3;const S=u.totalMl,P=u.avgMl,o=S/1e3,r=Math.round(u.stockL*b*10)/10,d=r*1e3,m=P>0?Math.round(d/P*10)/10:0,v=r-o,$=P>0?Math.round(P*2/1e3*10)/10:0,w=r<$,x=za(m),k=nd(m),E=Math.min(m/12*100,100),C=v>=0?"#22c55e":"#ef4444",D=v>=0?`+${W(Math.round(v))}L 余裕`:`${W(Math.round(v))}L 不足`,O=b>1.001;return`
        <div class="card" style="border-top:3px solid ${y};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${y};">${p}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${x}20;color:${x};font-weight:600;">${k}</span>
              <button class="btn-edit-stock" data-cat-id="${g}" data-cat="${p}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${g}">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;font-size:11px;margin-bottom:4px;">
              <div><span style="color:#6b7280;">原酒在庫</span><br><strong style="font-size:15px;">${W(u.stockL)}L</strong></div>
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${W(Math.round(o))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${le(P)}L</strong></div>
            </div>
            ${O?`
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${W(r)}L</div>
                <div style="color:#6b7280;">${f.rawAlcoholPct}% → ${f.targetAlcoholPct}%（×${b.toFixed(2)}）・残<strong>${m.toFixed(1)}</strong>ヶ月</div>
              </div>
            `:""}
            ${(()=>{const L=s.filter(I=>I.parentCategory===p);return L.length===0?"":L.map(I=>{const B=t.filter(z=>z.brewCategory===I.name).reduce((z,Q)=>z+Q.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${I.name}</span>
                  ${B>0?`<span style="margin-left:4px;">${W(B)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${g}" style="display:none;margin-bottom:8px;">
            ${(()=>{const L=s.filter(z=>z.parentCategory===p),I=[{name:p,label:p},...L.map(z=>({name:z.name,label:z.name}))],M=I.flatMap(z=>t.filter(F=>F.brewCategory===z.name).map(F=>({...F,catLabel:z.label}))),B=I.map(z=>`<option value="${z.name}">${z.label}</option>`).join("");return`
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${M.map(z=>`
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                      <span style="font-size:11px;flex:1;min-width:60px;">${z.label||"タンク"}</span>
                      <strong style="font-size:13px;">${W(z.volumeL)}L</strong>
                      ${I.length>1?`
                        <select data-action="brew-reassign-entry" data-id="${z.id}"
                          style="font-size:10px;padding:1px 4px;border:1px solid var(--border);border-radius:3px;max-width:100px;">
                          ${I.map(Q=>`<option value="${Q.name}" ${Q.name===z.brewCategory?"selected":""}>${Q.label}</option>`).join("")}
                        </select>
                      `:`<span style="font-size:10px;color:var(--text-secondary);">${z.catLabel}</span>`}
                      <button data-action="brew-delete-entry" data-id="${z.id}" data-cat="${z.brewCategory}"
                        style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                    </div>
                  `).join("")||'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">タンクなし</div>'}
                </div>
                <div style="display:flex;gap:4px;align-items:center;margin-top:6px;flex-wrap:wrap;">
                  ${I.length>1?`<select id="new-entry-target-${g}" style="height:28px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">${B}</select>`:""}
                  <input id="new-entry-label-${g}" type="text" placeholder="タンク名"
                    style="width:80px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <input id="new-entry-vol-${g}" type="number" min="0" step="1" placeholder="L"
                    style="width:60px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <button data-action="brew-add-entry" data-cat="${p}" data-cat-id="${g}"
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
                <button data-action="brew-alc-save" data-cat="${p}"
                  style="font-size:10px;padding:3px 8px;border:none;border-radius:4px;background:#2563eb;color:#fff;cursor:pointer;">保存</button>
              </div>
            </div>
            <div style="margin-top:6px;">
              <button class="btn-cancel-stock" data-cat-id="${g}"
                style="font-size:11px;padding:4px 12px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">閉じる</button>
            </div>
          </div>

          <div style="display:flex;gap:8px;margin-bottom:6px;font-size:11px;flex-wrap:wrap;">
            <span style="color:${C};font-weight:600;">年間比 ${D}</span>
            <span style="color:${w?"#ef4444":"#6b7280"};">安全在庫${W($)}L${w?" ⚠下回り":" ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${O?"（加水後）":""}</span>
            <span style="font-weight:600;color:${x};">${m.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${x};height:100%;width:${E}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function id(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const i of e)t.has(i.brewCategory)||t.set(i.brewCategory,[]),t.get(i.brewCategory).push(i);const n=`
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
  `,s=[];for(const i of De){const l=t.get(i);if(!l)continue;const c=Ne[i]??"#9ca3af",p=l.length>1,u=l.reduce((r,d)=>r+d.totalShipmentQty,0),y=l.reduce((r,d)=>r+d.totalShipmentMl,0),g=l.reduce((r,d)=>r+d.monthlyAvgQty,0),f=l.reduce((r,d)=>r+d.monthlyAvgMl,0),b=l.reduce((r,d)=>r+d.productCount,0),S=l[0].currentStockL,P=f>0?Math.round(S*1e3/f*10)/10:0,o=za(P);if(s.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${p?"pointer":"default"};" ${p?`data-toggle-cat="${i}"`:""}>
        <td style="color:${c};">
          ${p?`<span class="toggle-icon" data-cat="${i}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${i}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${b}</td>
        <td style="text-align:right;">${W(u)}</td>
        <td style="text-align:right;">${le(y)}</td>
        <td style="text-align:right;">${W(g)}</td>
        <td style="text-align:right;">${le(f)}</td>
        <td style="text-align:right;">${W(S)}</td>
        <td style="text-align:right;color:${o};font-weight:700;">${P.toFixed(1)}</td>
      </tr>
    `),p)for(const r of l)s.push(`
          <tr class="sub-row-${Yt(i)}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${r.subCategory}</td>
            <td style="text-align:right;">${r.productCount}</td>
            <td style="text-align:right;">${W(r.totalShipmentQty)}</td>
            <td style="text-align:right;">${le(r.totalShipmentMl)}</td>
            <td style="text-align:right;">${W(r.monthlyAvgQty)}</td>
            <td style="text-align:right;">${le(r.monthlyAvgMl)}</td>
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
  `}function rd(e,t,n,s,i,l={}){const c={html:"",needByCategory:{}};if(e.length===0)return c;const p={},u=new Date,y=u.getMonth()+1,g=y>=10?u.getFullYear():u.getFullYear()-1,f=g+1,b=new Map;for(const D of e)b.has(D.brewCategory)||b.set(D.brewCategory,new Map),b.get(D.brewCategory).set(D.fy,{shipL:D.shipmentL,annualL:D.annualizedL});const S=new Map;for(const D of i)S.has(D.brewCategory)||S.set(D.brewCategory,new Map),S.get(D.brewCategory).set(D.monthNum,D.avgMonthlyL);const P=[...new Set(e.map(D=>D.fy))].sort(),o=[...b.keys()].sort((D,O)=>{const L=[...De,...s.map(I=>I.name)];return(L.indexOf(D)===-1?99:L.indexOf(D))-(L.indexOf(O)===-1?99:L.indexOf(O))}),r=[];for(let D=y;D<=9;D++)r.push(D);if(y>=10)for(let D=1;D<=9;D++)r.push(D);const d=P.filter(D=>D<g),m=P.includes(g),v=o.map(D=>{const O=b.get(D);P.filter(pe=>O.has(pe));const L=Ne[D]??"#6366f1",I=S.get(D)??new Map,M=d.filter(pe=>O.has(pe)).map(pe=>O.get(pe).shipL);let B=0;if(M.length>=2){const pe=[];for(let _e=1;_e<M.length;_e++)M[_e-1]>0&&pe.push((M[_e]-M[_e-1])/M[_e-1]);B=pe.length>0?pe.reduce((_e,Gs)=>_e+Gs,0)/pe.length:0}const z=M.length>0?M[M.length-1]:O.get(g)?.annualL??0,Q=r.reduce((pe,_e)=>pe+(I.get(_e)??0),0),F=t.filter(pe=>pe.brewCategory===D).reduce((pe,_e)=>pe+_e.volumeL,0),j=n[D],U=j&&j.targetAlcoholPct>0?j.rawAlcoholPct/j.targetAlcoholPct:1,Z=Math.round(F*U),re=Math.max(0,Z-Math.round(Q)),ie=D in l,V=ie?l[D]:B,ee=Math.round(V*100),$e=Math.round(z*(1+V)),ge=Math.max(0,$e-re);p[D]=ge;const J=ee>0?"#22c55e":ee<0?"#ef4444":"#6b7280",K=Math.round(B*100),qe=O.get(g)?.annualL??0;return`
      <tr>
        <td style="color:${L};font-weight:600;white-space:nowrap;">${D}</td>
        ${d.map(pe=>`<td style="text-align:right;">${O.has(pe)?W(Math.round(O.get(pe).shipL)):"—"}</td>`).join("")}
        ${m?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${W(Math.round(qe))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${ee}"
            data-action="brew-growth-edit" data-cat="${D}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${ie?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${J};font-weight:600;${ie?"background:rgba(37,99,235,0.06);":""}"
            title="${ie?`手動設定（自動: ${M.length>=2?K+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${W(Z)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${W(Math.round(Q))}</td>
        <td style="text-align:right;font-weight:600;">${W(re)}</td>
        <td style="text-align:right;">${W($e)}</td>
        <td style="text-align:right;color:${ge>0?"#ef4444":"#22c55e"};font-weight:700;">${ge>0?W(ge):"余裕"}</td>
      </tr>
    `}).join("");let $=0,w=0,x=0,k=0,E=0;for(const D of o){const O=b.get(D),L=S.get(D)??new Map,I=d.filter(V=>O.has(V)).map(V=>O.get(V).shipL);let M=0;if(I.length>=2){const V=[];for(let ee=1;ee<I.length;ee++)I[ee-1]>0&&V.push((I[ee]-I[ee-1])/I[ee-1]);M=V.length>0?V.reduce((ee,$e)=>ee+$e,0)/V.length:0}const B=I.length>0?I[I.length-1]:O.get(g)?.annualL??0,z=t.filter(V=>V.brewCategory===D).reduce((V,ee)=>V+ee.volumeL,0),Q=n[D],F=Q&&Q.targetAlcoholPct>0?Q.rawAlcoholPct/Q.targetAlcoholPct:1,j=Math.round(z*F),U=r.reduce((V,ee)=>V+(L.get(ee)??0),0),Z=Math.max(0,j-Math.round(U)),re=D in l?l[D]:M,ie=Math.round(B*(1+re));$+=j,w+=Math.round(U),x+=Z,k+=ie,E+=Math.max(0,ie-Z)}const C=y<=9?`${y}月〜9月`:`${y}月〜翌9月`;return{needByCategory:p,html:`
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
              ${d.map(D=>`<th style="text-align:right;">${D}(L)</th>`).join("")}
              ${m?`<th style="text-align:right;">${g}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${C}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${f}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${v}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${d.map(()=>"<td></td>").join("")}
              ${m?"<td></td>":""}
              <td></td>
              <td style="text-align:right;">${W($)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${W(w)}</td>
              <td style="text-align:right;">${W(x)}</td>
              <td style="text-align:right;">${W(k)}</td>
              <td style="text-align:right;color:#ef4444;">${W(E)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}}function ld(e,t,n){const s=Object.keys(e).filter(g=>e[g]>0);if(s.length===0)return"";const i=[...De,...n.map(g=>g.name)];s.sort((g,f)=>(i.indexOf(g)===-1?99:i.indexOf(g))-(i.indexOf(f)===-1?99:i.indexOf(f)));const l={polishingRatio:.7,ricePerLiterKg:.85,riceVariety:"一般米",ricePricePerKg:400,kojiRatio:.2};let c=0,p=0,u=0;return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 4px 0;">原料米 調達計画</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 12px;">
        必要醸造量 × 白米使用量/L = 白米必要量 → ÷ 精米歩合 = 玄米必要量 → × 単価 = 予算
      </p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>区分</th>
              <th style="text-align:right;">醸造(L)</th>
              <th style="text-align:right;">白米/L</th>
              <th style="text-align:right;">白米(kg)</th>
              <th style="text-align:right;">精米歩合</th>
              <th style="text-align:right;">玄米(kg)</th>
              <th style="text-align:right;">品種</th>
              <th style="text-align:right;">円/kg</th>
              <th style="text-align:right;">予算</th>
            </tr>
          </thead>
          <tbody>${s.map(g=>{const f=e[g],b=t[g]??l,S=Ne[g]??"#6366f1";Yt(g);const P=Math.round(f*b.ricePerLiterKg),o=Math.round(P/b.polishingRatio);Math.round(P*b.kojiRatio);const r=Math.round(o*b.ricePricePerKg);return c+=P,p+=o,u+=r,`
      <tr>
        <td style="color:${S};font-weight:600;white-space:nowrap;">${g}</td>
        <td style="text-align:right;">${W(Math.round(f))}</td>
        <td style="text-align:right;">
          <input type="number" min="0.1" max="2" step="0.01" value="${b.ricePerLiterKg}"
            data-action="brew-rice-edit" data-cat="${g}" data-field="ricePerLiterKg"
            style="width:48px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 2px;" />
        </td>
        <td style="text-align:right;font-weight:600;">${W(P)}</td>
        <td style="text-align:right;">
          <input type="number" min="0.1" max="1" step="0.01" value="${b.polishingRatio}"
            data-action="brew-rice-edit" data-cat="${g}" data-field="polishingRatio"
            style="width:44px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 2px;" />
        </td>
        <td style="text-align:right;font-weight:700;">${W(o)}</td>
        <td style="text-align:right;font-size:11px;color:var(--text-secondary);">${b.riceVariety}</td>
        <td style="text-align:right;">
          <input type="number" min="0" step="10" value="${b.ricePricePerKg}"
            data-action="brew-rice-edit" data-cat="${g}" data-field="ricePricePerKg"
            style="width:52px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 2px;" />
        </td>
        <td style="text-align:right;font-weight:700;">¥${W(r)}</td>
      </tr>
    `}).join("")}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              <td></td><td></td>
              <td style="text-align:right;">${W(c)}</td>
              <td></td>
              <td style="text-align:right;">${W(p)}</td>
              <td></td><td></td>
              <td style="text-align:right;">¥${W(u)}</td>
            </tr>
            <tr style="font-size:11px;color:var(--text-secondary);">
              <td colspan="5"></td>
              <td style="text-align:right;">${(p/1e3).toFixed(1)}t</td>
              <td colspan="2"></td>
              <td style="text-align:right;">¥${(u/1e4).toFixed(0)}万</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}function cd(e){const t=new Map;for(const s of e){t.has(s.brewCategory)||t.set(s.brewCategory,{avgMl:0,totalMl:0,stockL:s.currentStockL});const i=t.get(s.brewCategory);i.avgMl+=s.monthlyAvgMl,i.totalMl+=s.totalShipmentMl}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${De.filter(s=>t.has(s)).map(s=>{const i=t.get(s),l=i.avgMl>0?Math.round(i.stockL*1e3/i.avgMl*10)/10:0,c=i.totalMl/1e3,p=c>0?Math.round(i.stockL/c*100):0,u=Ne[s]??"#9ca3af",y=za(l),g=Math.min(l/12*100,100);return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:80px;font-size:12px;font-weight:500;color:${u};text-align:right;">${s}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${y};height:100%;width:${g}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">
              ${l.toFixed(1)}ヶ月 / 年間の${p}%
            </span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${i.stockL>0?"var(--text)":"#ef4444"};">${W(i.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function dd(e,t,n,s,i){if(e.length===0)return"";const l=n.map(f=>f.name);[...De,...l];const c=new Map;for(const f of n)c.has(f.parentCategory)||c.set(f.parentCategory,[]),c.get(f.parentCategory).push(f);const p=new Map;for(const f of e)p.has(f.brewCategory)||p.set(f.brewCategory,[]),p.get(f.brewCategory).push(f);for(const f of l)p.has(f)||p.set(f,[]);const u=new Set;for(const f of n)for(const b of p.get(f.name)??[])u.add(b.productCode);const y=new Map;for(const f of De)y.set(f,p.get(f)??[]);const g=De.filter(f=>p.has(f)).map(f=>{const b=p.get(f)??[],S=Ne[f]??"#9ca3af",P=c.get(f)??[],o=P.length>0,r=b.reduce((C,D)=>C+D.annualMl,0),d=b.reduce((C,D)=>C+D.monthlyAvgMl,0),m=b.filter(C=>!u.has(C.productCode)),v=m.filter(C=>!t.has(C.productCode)),$=v.reduce((C,D)=>C+D.annualMl,0),w=v.reduce((C,D)=>C+D.monthlyAvgMl,0),x=m.filter(C=>t.has(C.productCode)),k=m.map(C=>{const D=t.has(C.productCode);return`
          <tr style="${D?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${o?`<input type="checkbox" ${D?"":"checked"} data-action="brew-move-to-child" data-code="${C.productCode}" data-parent="${f}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${D?"color:#b7791f;":""}" title="${C.productName}">
              ${C.productName}${D?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${C.subCategory}</td>
            <td style="text-align:right;">${le(C.annualMl)}</td>
            <td style="text-align:right;">${le(C.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),E=P.map(C=>{const D=p.get(C.name)??[],O=D.reduce((F,j)=>F+j.annualMl,0),L=D.reduce((F,j)=>F+j.monthlyAvgMl,0),I=i.filter(F=>F.brewCategory===C.name),M=I.reduce((F,j)=>F+j.volumeL,0),B=Yt(C.name),z=D.map(F=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${F.productCode}" data-cat="${C.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${F.productName}"><strong>${F.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${F.subCategory}</td>
            <td style="text-align:right;">${le(F.annualMl)}</td>
            <td style="text-align:right;">${le(F.monthlyAvgMl)}</td>
          </tr>
        `).join(""),Q=x.filter(F=>!D.some(j=>j.productCode===F.productCode)).map(F=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${F.productCode}" data-cat="${C.name}"
                  style="cursor:pointer;" />
              </td>
              <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${F.productName}">${F.productName}</td>
              <td style="font-size:11px;color:var(--text-secondary);">${F.subCategory}</td>
              <td style="text-align:right;color:var(--text-secondary);">${le(F.annualMl)}</td>
              <td style="text-align:right;color:var(--text-secondary);">${le(F.monthlyAvgMl)}</td>
            </tr>
          `).join("");return`
          <tr><td colspan="5" style="padding:0;">
            <div style="border-left:3px solid #6366f1;margin:8px 0 8px 16px;padding:6px 0 6px 12px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <strong style="font-size:12px;color:#6366f1;">${C.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${D.length}品 ・ ${le(O)}L/年${M>0?` ・ 在庫${W(M)}L`:""}</span>
                <button class="btn-edit-stock" data-cat-id="${B}" data-cat="${C.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${C.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${B}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${I.map(F=>`
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${F.label||"タンク"}</span>
                    <strong style="font-size:11px;">${W(F.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${F.id}" data-cat="${C.name}"
                      style="font-size:9px;padding:1px 4px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">×</button>
                  </div>
                `).join("")}
                <div style="display:flex;gap:3px;align-items:center;margin-top:3px;">
                  <input id="new-entry-label-${B}" type="text" placeholder="名前" style="width:70px;height:22px;font-size:10px;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <input id="new-entry-vol-${B}" type="number" min="0" placeholder="L" style="width:50px;height:22px;font-size:10px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <button data-action="brew-add-entry" data-cat="${C.name}" data-cat-id="${B}"
                    style="font-size:9px;padding:2px 6px;border:none;border-radius:3px;background:#0F5B8D;color:#fff;cursor:pointer;">追加</button>
                </div>
                <button class="btn-cancel-stock" data-cat-id="${B}" style="font-size:9px;padding:2px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;margin-top:3px;">閉じる</button>
              </div>
              ${z.length>0||Q.length>0?`
                <table class="data-table" style="font-size:11px;margin:0;">
                  <tbody>
                    ${z}
                    ${Q}
                  </tbody>
                  ${D.length>0?`<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${le(O)}</td><td style="text-align:right;">${le(L)}</td>
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
              全${b.length}銘柄 ・ 年間${le(r)}L
              ${o?`（内 ${P.map(C=>`${C.name}:${(p.get(C.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${o?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${k}
                ${E}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${le(r)}</td><td style="text-align:right;">${le(d)}</td></tr>
                ${o?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${le($)}</td><td style="text-align:right;">${le(w)}</td></tr>`:""}
                ${x.length>0?`<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${x.length}品</td>
                  <td style="text-align:right;">${le(x.reduce((C,D)=>C+D.annualMl,0))}</td>
                  <td style="text-align:right;">${le(x.reduce((C,D)=>C+D.monthlyAvgMl,0))}</td></tr>`:""}
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
            ${De.filter(f=>f!=="その他").map(f=>`<option value="${f}">${f}</option>`).join("")}
          </select>
          <input id="brew-new-category-name" type="text" placeholder="新しい区分名"
            style="font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;width:120px;" />
          <button data-action="brew-add-category" class="button primary"
            style="font-size:12px;padding:4px 12px;">追加</button>
        </div>
      </div>
      ${g}
    </div>
  `}function pd(e,t,n,s=[],i=new Set,l=[],c={},p=[],u={},y=[],g=[],f={},b={}){const S=new Date,P=S.getMonth()>=9?S.getFullYear():S.getFullYear()-1,o=Array.from({length:5},(d,m)=>{const v=P-m;return`<option value="${v}" ${v===n?"selected":""}>${v}年度 (${v}/10-${v+1}/9)</option>`}).join(""),r=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return r||`
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
        ${sd(t)}
      </div>

      ${od(e,p,u,l)}

      ${(()=>{const d=rd(y,p,u,l,g,f);return d.html+ld(d.needByCategory,b,l)})()}

      ${cd(e)}

      ${dd(s,i,l,c,p)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${id(e)}
      </div>
    </section>
  `}function fa(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function ud(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Rs(e){return e?Ft.find(t=>t.value===e)?.label??e:""}function md(e){const t=[],n=[],s=[];for(const i of e){const l=i.amount_last_year_same_month>0?i.amount_this_month/i.amount_last_year_same_month:1,c={code:i.customer_code,name:i.customer_name,businessType:i.business_type,areaCode:i.area_code,phone:i.phone,lastOrderDate:i.last_order_date,daysSinceLastOrder:i.days_since_order,totalAmountLast12m:i.amount_12m,amount3m:i.amount_3m,amountThisMonth:i.amount_this_month,amountLastYearSameMonth:i.amount_last_year_same_month,annualRevenue:i.annual_revenue,yoyRatio:l,status:"dormant"};i.is_at_risk?t.push({...c,status:"at-risk"}):i.is_dormant?n.push({...c,status:"dormant"}):i.amount_last_year_same_month>0&&l<.8&&s.push({...c,status:"declining"})}return t.sort((i,l)=>l.totalAmountLast12m-i.totalAmountLast12m),n.sort((i,l)=>l.daysSinceLastOrder-i.daysSinceLastOrder),s.sort((i,l)=>i.yoyRatio-l.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:s}}function yd(e,t){const n=t?.reason??"",s=Ft.map(i=>`<option value="${i.value}" ${n===i.value?"selected":""}>${i.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${s}
    </select>`}function hd(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],s=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',i=!!t?.actionedAt,l=i?'style="opacity:0.45;"':"",c=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${Rs(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${i?"1":"0"}" ${l}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${c}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${s}
      <td class="numeric">${fa(e.totalAmountLast12m)}</td>
      <td>${yd(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${i?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function ta(e,t,n,s,i,l,c,p){if(i.length===0)return"";const u=i.map(y=>hd(y,p.get(y.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${s}" style="margin-right:8px;">${i.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${ud(l)}</p>
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
    </section>`}function fd(e,t=[]){const{atRiskCustomers:n,dormantCustomers:s,decliningCustomers:i}=e,l=n.length+s.length+i.length,c=n.reduce((r,d)=>r+d.totalAmountLast12m,0),p=s.reduce((r,d)=>r+d.totalAmountLast12m,0),u=i.reduce((r,d)=>r+d.totalAmountLast12m,0),y=[...n,...s,...i],g=[...new Set(y.map(r=>r.areaCode).filter(Boolean))].sort(),f=[...new Set(y.map(r=>r.businessType).filter(Boolean))].sort(),b=new Map(t.map(r=>[r.customerCode,r])),S=t.filter(r=>r.actionedAt).length,P=new Map;t.forEach(r=>{r.reason&&P.set(r.reason,(P.get(r.reason)??0)+1)});const o=[...P.entries()].sort((r,d)=>d[1]-r[1]).slice(0,5).map(([r,d])=>`<span class="status-pill info" style="font-size:0.75rem;">${Rs(r)} ${d}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${fa(c)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${s.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${fa(p)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${i.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${S}<span class="kpi-sub">社</span></div>
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
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${i.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${g.map(r=>`<option value="${r}">${r}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${f.map(r=>`<option value="${r}">${r}</option>`).join("")}
      </select>
    </div>

    ${ta("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,c,"状況",b)}
    ${ta("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",s,p,"経過日数",b)}
    ${ta("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",i,u,"前年同月比",b)}

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
    <\/script>`}const Te=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],ga={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},Ie={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function gd(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function vd(e){const t=e.reduce((l,c)=>l+c,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const s=Math.max(...e);return e.filter(l=>l>s*.1).length<=6?"seasonal":"year-round"}function bd(e){const t=e.reduce((l,c)=>l+c,0);if(t===0)return[];const s=t/12*1.5,i=[];for(let l=0;l<12;l++)e[l]>s&&i.push(l);if(i.length===0){const l=Math.max(...e);l>0&&i.push(e.indexOf(l))}return i.sort((l,c)=>l-c)}function $d(e){return e.length===0?0:(e[0]-2+12)%12}function wn(e){const t=new Date().getMonth(),n=e.map(i=>{const l=vd(i.monthlyQuantity),c=bd(i.monthlyQuantity),p=$d(c);return{code:i.code,name:i.name,category:i.category,peakMonths:c,proposalStartMonth:p,seasonType:l,monthlyQuantity:i.monthlyQuantity}}),s=[];for(let i=0;i<12;i++){const l=n.filter(c=>{if(c.peakMonths.length===0)return!1;const p=c.proposalStartMonth,u=c.peakMonths[0];return p<=u?i>=p&&i<=u:i>=p||i<=u});s.push({month:i,products:l,targetCustomers:[]})}return{products:n,proposals:s,selectedMonth:t}}function wd(e){const{products:t,proposals:n,selectedMonth:s}=e,i=new Date().getMonth(),l={"year-round":[],seasonal:[],"year-end":[]};t.forEach(f=>l[f.seasonType].push(f));const c=n[s],p=t.length,u=c?.products.length??0,y=t.filter(f=>f.peakMonths.includes(s)).length,g=c?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${Te[s]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${Te[s]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${y}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${g}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${Te.map((f,b)=>{const S=b===i,P=b===s;return`<button class="button" style="padding:4px 10px;background:${P?"#0F5B8D":S?"#e2e8f0":"transparent"};color:${P?"#fff":"#333"};border:${S&&!P?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${b}">${f}${S?" ●":""}</button>`}).join("")}
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
            ${Te.map((f,b)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${b===i?"background:#f0f7ff;":""}">${f.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${_d(l,i)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${xd(l,s)}

  <!-- Target customer list for selected month -->
  ${Sd(c)}
</div>`}function _d(e,t){const n=[],s=["year-round","seasonal","year-end"];for(const i of s){const l=e[i];if(l.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${Ie[i]}15;color:${Ie[i]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${ga[i]}</span>
    </td></tr>`);for(const c of l){const p=Te.map((u,y)=>{const g=c.peakMonths.includes(y),f=js(c,y),b=y===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let S="transparent";g?S=Ie[c.seasonType]:f&&(S=Ie[c.seasonType]+"40");const P=g||f?`background:${S};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${b}"><div style="${P}" title="${g?"ピーク":f?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${c.name}"><span class="mono" style="font-size:0.7rem;color:#888">${c.code}</span> ${c.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${Ie[c.seasonType]}15;color:${Ie[c.seasonType]}">${ga[c.seasonType]}</span></td>
        ${p}
      </tr>`)}}}return n.join("")}function js(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,s=e.peakMonths[0];return n<=s?t>=n&&t<s:t>=n||t<s}function xd(e,t){const s=["year-round","seasonal","year-end"].map(i=>{const l=e[i];if(l.length===0)return"";const c=l.filter(u=>u.peakMonths.includes(t)||js(u,t));if(c.length===0)return"";const p=c.map(u=>{const g=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',f=u.monthlyQuantity.reduce((b,S)=>b+S,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${g}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${f.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map(b=>Te[b]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${Ie[i]}15;color:${Ie[i]}">${ga[i]}</span>
        <span style="font-size:0.85rem;color:#666">${Te[t]}の対象: ${c.length}品</span>
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
    </div>`}).filter(Boolean);return s.length===0?`<div style="padding:1rem;color:#666;text-align:center">${Te[t]}に提案対象の商品はありません</div>`:s.join("")}function Sd(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${gd(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const kd=["日","月","火","水","木","金","土"];function Pd(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n-1,1),i=new Date(t,n,0),l=[];for(let c=0;c<s.getDay();c++)l.push({outside:!0});for(let c=1;c<=i.getDate();c++)l.push({date:`${e}-${String(c).padStart(2,"0")}`});for(;l.length%7!==0;)l.push({outside:!0});return l}function Ed(e,t,n){const[s,i]=t.split("-").map(Number),l=new Date(s,i-2,1),c=new Date(s,i,1),p=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}`,u=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,y=new Date().toISOString().slice(0,10),f=Pd(t).map(o=>{if(o.outside)return'<div class="sc-cell sc-outside"></div>';const r=o.date,d=Number(r.split("-")[2]),m=new Date(`${r}T00:00:00`).getDay(),v=e?.[r],$=r===y,w=r===n;let x="",k="";return v&&(x=`<span class="sc-badge">${v.count}件</span>`,k=v.cityGroups.slice(0,3).map(E=>`<span class="sc-city-tag">${E.city}<em>${E.count}</em></span>`).join(""),v.cityGroups.length>3&&(k+=`<span class="sc-city-more">+${v.cityGroups.length-3}</span>`)),`
      <div class="sc-cell ${$?"sc-today":""} ${w?"sc-selected":""} ${v?"sc-has-data":""}"
           data-sc-date="${r}">
        <div class="sc-day-header">
          <span class="sc-day-num ${m===0?"sc-sun":m===6?"sc-sat":""}">${d}</span>
          ${x}
        </div>
        <div class="sc-cities">${k}</div>
      </div>
    `}).join(""),b=n&&e?.[n]?Ad(e[n]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',S=Object.values(e??{}).reduce((o,r)=>o+r.count,0),P=Object.values(e??{}).reduce((o,r)=>o+r.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${S>0?`月計: <strong>${S}件</strong> / <strong>¥${P.toLocaleString()}</strong>`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${p}">◀</button>
          <span class="sc-month-label">${s}年${i}月</span>
          <button class="sc-nav-btn" data-sc-ym="${u}">▶</button>
        </div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays">
            ${kd.map((o,r)=>`<div class="sc-weekday ${r===0?"sc-sun":r===6?"sc-sat":""}">${o}</div>`).join("")}
          </div>
          <div class="sc-grid">
            ${e===null?'<div class="sc-loading"><div class="loading-spinner"></div><p>読み込み中…</p></div>':f}
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
  `}function Ad(e){const t=e.date.replace(/-/g,"/").slice(5),n={};for(const i of e.entries)(n[i.city]??=[]).push(i);const s=Object.entries(n).sort((i,l)=>l[1].length-i[1].length).map(([i,l])=>{const c=l.sort((p,u)=>u.amount-p.amount).map(p=>`
          <div class="sc-customer-row">
            <span class="sc-customer-name" title="${p.customerName}">${p.customerName}</span>
            <span class="sc-customer-amt">${p.amount>0?`¥${p.amount.toLocaleString()}`:"-"}</span>
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${i}（${l.length}件）</div>
          ${c}
        </div>`}).join("");return`
    <p class="sc-detail-date">${t}の出荷</p>
    <p class="sc-detail-meta">${e.count}件 / ¥${e.totalAmount.toLocaleString()}</p>
    ${s}
  `}const Cd=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),aa=["月","火","水","木","金"],_n=6;function Ld(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function Dd(e,t){if(t.length===0)return 0;const n=[...t].sort((i,l)=>i-l);return n.filter(i=>i<=e).length/n.length}function qd(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function xn(e){const t=new Date,n=e.map(u=>u.annualRevenue),s=e.map(u=>{const y=Ld(u.lastOrderDate,t);let g=0;const f=[];y>=60&&(g+=50,f.push("離反リスク")),u.hasSeasonalProposal&&(g+=30,f.push("季節提案タイミング")),y>=30&&y<60&&(g+=20,f.push("定期巡回"));const b=Dd(u.annualRevenue,n),S=Math.round(b*20);S>0&&(g+=S,f.push("金額ウェイト"));const P=qd(f,y);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:g,reasons:f,lastOrderDate:u.lastOrderDate,daysSinceOrder:y,annualRevenue:u.annualRevenue,recommendedAction:P}}).filter(u=>u.priorityScore>0).sort((u,y)=>y.priorityScore-u.priorityScore),i=new Map;for(const u of s){const y=u.areaCode||"その他";i.has(y)||i.set(y,[]),i.get(y).push(u)}const l=[...i.entries()].sort((u,y)=>y[1].reduce((g,f)=>g+f.priorityScore,0)-u[1].reduce((g,f)=>g+f.priorityScore,0)),c=[];let p=0;for(const[u,y]of l){const g=y.sort((f,b)=>b.priorityScore-f.priorityScore);for(let f=0;f<g.length&&!(p>=aa.length);f+=_n){const b=g.slice(f,f+_n);c.push({dayLabel:aa[p],area:u,visits:b}),p++}if(p>=aa.length)break}return{candidates:s,weekPlan:c,filterArea:"",filterMinScore:0}}function Id(e){const{candidates:t,weekPlan:n,filterArea:s,filterMinScore:i}=e,l=t.filter(f=>!(s&&f.areaCode!==s||i>0&&f.priorityScore<i)),c=Array.from(new Set(t.map(f=>f.areaCode))).sort(),p=l.length,u=l.filter(f=>f.priorityScore>=50).length,y=l.filter(f=>f.reasons.includes("離反リスク")).length,g=n.reduce((f,b)=>f+b.visits.length,0);return`
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
            ${c.map(f=>`<option value="${f}"${s===f?" selected":""}>${f}</option>`).join("")}
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
      ${n.length===0?"<p>訪問候補がありません。</p>":Td(n)}
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
            ${l.map(f=>Nd(f)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Td(e){return`
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
  `}function Nd(e){return`
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
      <td class="numeric">${Cd.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function Od(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=e.map(y=>{const g=y.capacity>0?Math.round(y.currentVolume/y.capacity*100):0;return`
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
      `}).join(""),i=e.filter(y=>y.status==="in_use").length,l=e.filter(y=>y.status==="aging").length,c=e.filter(y=>y.status==="empty").length,p=e.reduce((y,g)=>y+g.capacity,0),u=e.reduce((y,g)=>y+g.currentVolume,0);return`
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
          <tbody>${s||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function na(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Md(e,t,n){const s=e.rows.map((y,g)=>`
      <tr>
        <td class="mono">${y.taxCategory}</td>
        <td>${y.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${g}" data-tax-field="alcoholDegree" value="${y.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="productionVolume" value="${y.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="previousBalance" value="${y.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="exportDeduction" value="${y.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="sampleDeduction" value="${y.sampleDeduction}" />
        </td>
        <td class="numeric">${y.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${y.taxRate}</td>
        <td class="numeric"><strong>${na(y.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${g}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),i=e.deductions.map((y,g)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${g}" data-ded-field="type">
            ${Object.keys(ca).map(f=>`<option value="${f}" ${f===y.type?"selected":""}>${ca[f]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${g}" data-ded-field="categoryCode">
            ${as.map(f=>`<option value="${f.code}" ${f.code===y.categoryCode?"selected":""}>${f.code}:${f.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${g}" data-ded-field="volume" value="${y.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${g}" data-ded-field="reason" value="${y.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${g}" data-ded-field="documentNo" value="${y.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${g}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),l=Array.from({length:12},(y,g)=>g+1),c=e.rows.reduce((y,g)=>y+g.exportDeduction+g.sampleDeduction,0),p=e.rows.reduce((y,g)=>y+g.productionVolume,0),u=p>0?c/p*100:0;return`
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
        <p class="kpi-value">${na(e.totalTax)}</p>
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
          <tbody>${s||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${e.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${na(e.totalTax)}</th>
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
  `}const Rd={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let je=null,jd=0;const va=[];function zd(){return je&&document.body.contains(je)||(je=document.createElement("div"),je.className="toast-container",document.body.appendChild(je)),je}function T(e,t="success",n){const s=zd(),i=++jd,l=t==="error"?5e3:t==="warning"?4e3:3e3,c=document.createElement("div");c.className=`toast toast-${t}`,c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.innerHTML=`
    <span class="toast-icon">${Rd[t]}</span>
    <span class="toast-msg">${Fd(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const p={id:i,message:e,type:t,el:c};va.push(p),s.appendChild(c),requestAnimationFrame(()=>{c.classList.add("toast-enter")});const u=()=>Bd(p);c.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{c.classList.add("toast-exit"),c.addEventListener("animationend",u,{once:!0})},l)}function Bd(e){const t=va.indexOf(e);t!==-1&&(va.splice(t,1),e.el.remove())}function Fd(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function we(e,t={}){const{title:n="確認",confirmLabel:s="OK",cancelLabel:i="キャンセル",variant:l="primary"}=t;return new Promise(c=>{const p=document.createElement("div");p.className="modal-backdrop confirm-backdrop",p.setAttribute("role","dialog"),p.setAttribute("aria-modal","true"),p.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${l}">
            ${l==="danger"?Vd:Yd}
          </div>
          <h3 class="confirm-title">${At(n)}</h3>
          <p class="confirm-message">${At(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${At(i)}</button>
          <button class="button ${l} confirm-ok">${At(s)}</button>
        </div>
      </div>
    `;const u=g=>{p.classList.add("confirm-exit"),p.addEventListener("animationend",()=>{p.remove()},{once:!0}),c(g)};p.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),p.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),p.addEventListener("click",g=>{g.target===p&&u(!1)});const y=g=>{g.key==="Escape"&&(document.removeEventListener("keydown",y),u(!1))};document.addEventListener("keydown",y),document.body.appendChild(p),requestAnimationFrame(()=>{p.querySelector(".confirm-ok")?.focus()})})}const Vd=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,Yd=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function At(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Sn(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function ba(e,t,n){if(t.length===0&&(!n||n.length===0))return;const s=n&&n.length>0?n:Object.keys(t[0]??{}).map(y=>({key:y,label:y})),l=`\uFEFF${[s.map(y=>Sn(y.label)).join(","),...t.map(y=>s.map(g=>Sn(y[g.key])).join(","))].join(`\r
`)}`,c=new Blob([l],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(c),u=document.createElement("a");u.href=p,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(p),0)}const Jd=Object.fromEntries(Ft.map(e=>[e.value,e.label])),Ud=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan"];let Ke=[];async function Qd(){const{supabaseQueryAll:e}=await q(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>G);return{supabaseQueryAll:n}},void 0);Ke=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const kn=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"}];function zs(e){const t=ka[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function Ba(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Hd(){const e=zs("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const Jt=new Date,Gd=Jt.toISOString().slice(0,7),Kd=Jt.getFullYear(),Xd=Jt.getMonth()+1,Wd=Jt.toISOString().slice(0,10),Zd="C0011",ze=Hd();function Bs(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return Ud.includes(n)?n:"/"}function Fa(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const Pn=Bs(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:Ba(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Gd,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Kd,taxMonth:Xd,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...Nc,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...Oc},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Wd,route:Pn,currentCategory:Fa(Pn),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:Zd,salesPeriod:"month",customRange:{start:"",end:""},quoteState:Ot(pa()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCompanySettings:pa(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...Ra},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:ze.mode,emailRegion:ze.region,emailHistorySegment:ze.historySegment,emailTemplateId:ze.templateId,emailSubject:ze.subject,emailBody:ze.body,emailSaveMessage:ze.saveMessage,emailSending:!1,demandForecast:{...Lr},shipmentCalendarData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:qt(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:tt,empCapacity:at},brewingSchedule:[],brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function En(e){return e.slice(0,10)}function ep(e){return{...e}}function Rt(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Fs(){a.invoiceForm=Ba(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},Rt()}function Vs(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,s)=>{n.productCode.trim()||(t[`lines.${s}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${s}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${s}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${s}.unitPrice`]="単価は0円以上で入力してください。")}),t}function tp(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,ep(t))}function ap(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((s,i)=>{const l=i===0?1:2,c=1200*(i+1);return{productCode:s.code,productName:s.name,quantity:l,unitPrice:c,unit:"本",amount:l*c}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function np(e){const t=a.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function sp(e){const t=a.masterStats?.customers.find(n=>n.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Ys(e){if(Ce(e),a.invoiceErrors=Vs(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){_();return}a.invoiceSaving=!0,_(),Bn(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=Ba(),_()}).catch(()=>{a.invoiceSaving=!1,_()})}function Js(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((s,i)=>new Date(i.date).getTime()-new Date(s.date).getTime()).filter(s=>{const i=new Date(s.date);return!(t&&i<t||n&&i>n)})}function Us(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?Ke:Ke.filter(e=>e.area===a.emailRegion);case"history":return Ke.filter(e=>e.historySegment===a.emailHistorySegment);default:return Ke}}function op(){const e=Us();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function sa(e){const t=Us(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(s=>s.email),status:e}}function Va(){return a.user,!1}function ft(){a.globalSearchOpen=!1,a.globalQuery=""}function ip(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:kn.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:kn}}function rp(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?Js(a.salesSummary):[]).map(s=>({documentNo:s.documentNo,date:s.date,customerCode:s.customerCode,customerName:s.customerName,amount:s.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((s,i)=>i.balanceAmount-s.balanceAmount).map(s=>({...s})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(s=>({...s})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(s=>({...s})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(s=>({...s})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(s=>({...s})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(s=>({...s}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(s=>({...s}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}ba(n,e,t)}function oa(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=Fa(e),a.sidebarOpen=!1,ft(),Ya(e)}async function Ya(e){a.actionLoading=!0,_();try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,_(),a.quoteList=await Ma(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:t}=await q(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>N);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await ht(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await Aa());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await Ca(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await q(async()=>{const{fetchShipmentCalendar:n}=await Promise.resolve().then(()=>N);return{fetchShipmentCalendar:n}},void 0);a.shipmentCalendarData=await t(a.shipmentCalendarYearMonth);break}case"/billing":a.billingSummary||(a.billingSummary=await La(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await zt());break;case"/product-power":a.productPower.length===0&&(a.productPower=await Un());break;case"/customer-efficiency":a.customerEfficiency=await pt(a.customerEfficiencyYear,a.customerEfficiencyGroupBy);break;case"/customer-analysis":a.customerAnalysis||(a.customerAnalysis=await Qn());break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await q(async()=>{const{fetchDemandForecasts:l,fetchDeliverySchedule:c}=await Promise.resolve().then(()=>N);return{fetchDemandForecasts:l,fetchDeliverySchedule:c}},void 0),[s,i]=await Promise.all([t(),n()]);a.demandForecast.forecasts=s.map(l=>({code:l.productCode,name:l.productName,segment:l.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(l.avgMonthly),adjustedAvg:Math.round(l.avgMonthly),nextMonthForecast:Math.round(l.forecastQuantity),annualForecast:Math.round(l.avgMonthly*12),safetyStock:Math.round(l.safetyStock)})),a.demandForecast.deliveries=Dr(i)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:n}=await q(async()=>{const{fetchChurnAlerts:s,fetchChurnNotes:i}=await Promise.resolve().then(()=>N);return{fetchChurnAlerts:s,fetchChurnNotes:i}},void 0);if(!a.churnAlert){const s=await t();a.churnAlert=md(s)}a.churnNotes=await n();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await q(async()=>{const{fetchProductShipmentsFromTable:s}=await Promise.resolve().then(()=>N);return{fetchProductShipmentsFromTable:s}},void 0),n=await t();if(n.length>0)a.seasonalCalendar=wn(n.map(s=>({code:s.code,name:s.name,category:"",monthlyQuantity:s.monthlyQuantity})));else{const{fetchProductMonthlyShipments:s}=await q(async()=>{const{fetchProductMonthlyShipments:l}=await Promise.resolve().then(()=>N);return{fetchProductMonthlyShipments:l}},void 0),i=await s();a.seasonalCalendar=wn(i.map(l=>({code:l.code,name:l.name,category:"",monthlyQuantity:l.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:t}=await q(async()=>{const{fetchVisitPriorities:s}=await Promise.resolve().then(()=>N);return{fetchVisitPriorities:s}},void 0),n=await t();if(n.length>0)a.visitPlanner={candidates:n.map(s=>({code:s.customer_code,name:s.customer_name,phone:s.phone,address:s.address,areaCode:s.area_code,businessType:s.business_type,priorityScore:s.priority_score,reasons:s.reasons,lastOrderDate:s.last_order_date,daysSinceOrder:s.days_since_order,annualRevenue:s.annual_revenue,recommendedAction:s.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=xn(n.map(s=>({code:s.customer_code,name:s.customer_name,phone:s.phone,address1:s.address,areaCode:s.area_code,businessType:s.business_type,annualRevenue:s.annual_revenue,lastOrderDate:s.last_order_date,hasSeasonalProposal:s.reasons.some(i=>i.includes("季節"))})));else{const{supabaseQueryAll:s}=await q(async()=>{const{supabaseQueryAll:u}=await Promise.resolve().then(()=>G);return{supabaseQueryAll:u}},void 0),[i,l]=await Promise.all([s("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):Pa().then(u=>u.customers)]),c=a.masterStats?.customers??l,p=new Map;i.forEach(u=>{const y=u.legacy_customer_code||"",g=u.sales_date||"",f=Number(u.total_amount)||0,b=p.get(y);!b||g>b.lastDate?p.set(y,{lastDate:g,total:(b?.total??0)+f}):b.total+=f}),a.visitPlanner=xn(c.filter(u=>u.isActive).map(u=>({code:u.code,name:u.name,phone:u.phone,address1:u.address1,areaCode:u.areaCode,businessType:u.businessType,annualRevenue:p.get(u.code)?.total??0,lastOrderDate:p.get(u.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:n,fetchProductionPlan:s,fetchLabelExclusions:i}=await q(async()=>{const{fetchDemandAnalysis:c,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}=await Promise.resolve().then(()=>N);return{fetchDemandAnalysis:c,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}},void 0);if(!a.demandAnalysis){const[c,p]=await Promise.all([t(a.demandYearsBack*12),n()]);a.demandAnalysis=c,a.safetyStockParams=p}if(a.productionPlan.length===0){const c=await s(a.demandPlanYearMonth);c.length>0?a.productionPlan=c:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=buildPlanFromAnalysis(a.demandPlanYearMonth))}const l=await i(a.demandPlanYearMonth);if(a.calendarLabelExcluded=new Set(l),a.productionPlan.length>0){const c=a.productionPlan.filter(p=>!a.calendarLabelExcluded.has(p.productCode));Ae(a.calendarShifts,c,a.calendarCapacity)}break}case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:n,fetchBrewingSchedule:s,fetchBrewingProductDetail:i,fetchBrewingCustomCategories:l,fetchBrewingCategoryOverrides:c,fetchAllBrewingStockEntries:p,fetchCategoryTypeLinks:u,fetchAvailableProductionTypes:y,fetchBrewingAlcoholSettings:g,fetchBrewingYearlyShipments:f,fetchBrewingSeasonalPattern:b,fetchBrewingForecastOverrides:S}=await q(async()=>{const{fetchBrewingPlanSummary:B,fetchBrewingMonthlyTrend:z,fetchBrewingSchedule:Q,fetchBrewingProductDetail:F,fetchBrewingCustomCategories:j,fetchBrewingCategoryOverrides:U,fetchAllBrewingStockEntries:Z,fetchCategoryTypeLinks:re,fetchAvailableProductionTypes:ie,fetchBrewingAlcoholSettings:V,fetchBrewingYearlyShipments:ee,fetchBrewingSeasonalPattern:$e,fetchBrewingForecastOverrides:ge}=await Promise.resolve().then(()=>N);return{fetchBrewingPlanSummary:B,fetchBrewingMonthlyTrend:z,fetchBrewingSchedule:Q,fetchBrewingProductDetail:F,fetchBrewingCustomCategories:j,fetchBrewingCategoryOverrides:U,fetchAllBrewingStockEntries:Z,fetchCategoryTypeLinks:re,fetchAvailableProductionTypes:ie,fetchBrewingAlcoholSettings:V,fetchBrewingYearlyShipments:ee,fetchBrewingSeasonalPattern:$e,fetchBrewingForecastOverrides:ge}},void 0),P=a.brewingPlanFY,o=`${P}-10-01`,r=`${P+1}-09-30`,[d,m,v,$,w,x,k,E,C,D,O,L,I,M]=await Promise.all([t(o,r),n(o,r),s(P),i(o,r),l(),c(),p(),u(),y(),g(),f(),b(),S(),fetchBrewingRiceParams()]);a.brewingPlanData=d,a.brewingMonthlyTrend=m,a.brewingSchedule=v,a.brewingProductDetail=$,a.brewingCustomCategories=w,a.brewingOverrides=x,a.brewingStockEntries=k,a.brewingTypeLinks=E,a.brewingAvailableTypes=C,a.brewingYearlyShipments=O,a.brewingSeasonalPattern=L,a.brewingForecastOverrides=I,a.brewingRiceParams=M,a.brewingAlcoholSettings=D;break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await Gn());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Kn());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await Xn());break;case"/materials":a.materialList.length===0&&(a.materialList=await la());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Wn(),Zn()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([es(),ts()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await qa(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Ia(a.storeSalesDate),ss()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await q(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>N);return{fetchMailSenders:n}},void 0);if(a.mailSenders=await t(),!a.emailSenderId||!a.mailSenders.find(n=>n.id===a.emailSenderId)){const n=a.mailSenders.find(s=>s.isDefault)??a.mailSenders[0];n&&(a.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await q(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>N);return{fetchCalendarEvents:n}},void 0);a.calendarEvents=await t(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await q(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>N);return{fetchIntegrationSettings:n}},void 0);a.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchShopifyOrders:s,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>N);return{fetchShopifyOrders:s,fetchIntegrationSettings:i}},void 0);a.shopifyOrders=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchFaxInbox:s,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>N);return{fetchFaxInbox:s,fetchIntegrationSettings:i}},void 0);a.faxRecords=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/users":{const{fetchUserProfiles:t}=await q(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>N);return{fetchUserProfiles:n}},void 0);a.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:s}=await q(async()=>{const{fetchMyProfile:l,fetchAuditLogs:c,fetchMailSenders:p}=await Promise.resolve().then(()=>N);return{fetchMyProfile:l,fetchAuditLogs:c,fetchMailSenders:p}},void 0),i=a.user?.email??a.myProfile?.email??"";i&&(a.myProfile=await t(i)),a.mailSenders.length===0&&(a.mailSenders=await s()),a.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await q(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>N);return{fetchAuditLogs:n}},void 0);a.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await q(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>N);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:n}=await q(async()=>{const{fetchMapCustomers:l,fetchDeliveryLocations:c}=await Promise.resolve().then(()=>N);return{fetchMapCustomers:l,fetchDeliveryLocations:c}},void 0),[s,i]=await Promise.all([t(),n()]);a.mapCustomers=s,a.deliveryLocations=i}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchCallLogs:s,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>N);return{fetchCallLogs:s,fetchIntegrationSettings:i}},void 0);a.callLogs=await t(100),a.integrations.length===0&&(a.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchLeadLists:s,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>N);return{fetchLeadLists:s,fetchIntegrationSettings:i}},void 0);a.leadLists=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await q(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>N);return{fetchWorkflowOrdersFromDb:n}},void 0);a.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await q(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>N);return{fetchTourInquiriesFromDb:n}},void 0);a.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:s}=await q(async()=>{const{fetchSlackRules:i,fetchSlackLogs:l,fetchIntegrationSettings:c}=await Promise.resolve().then(()=>N);return{fetchSlackRules:i,fetchSlackLogs:l,fetchIntegrationSettings:c}},void 0);a.slackRules=await t(),a.slackLogs=await n(50),a.integrations.length===0&&(a.integrations=await s())}break;case"/":{const{fetchProspects:t,fetchCalendarEvents:n,fetchWorkflowOrdersFromDb:s,fetchTourInquiriesFromDb:i,fetchOrderHeaders:l}=await q(async()=>{const{fetchProspects:c,fetchCalendarEvents:p,fetchWorkflowOrdersFromDb:u,fetchTourInquiriesFromDb:y,fetchOrderHeaders:g}=await Promise.resolve().then(()=>N);return{fetchProspects:c,fetchCalendarEvents:p,fetchWorkflowOrdersFromDb:u,fetchTourInquiriesFromDb:y,fetchOrderHeaders:g}},void 0);a.prospects.length===0&&(a.prospects=await t()),a.calendarEvents.length===0&&(a.calendarEvents=await n(a.calendarYearMonth)),a.materialList.length===0&&(a.materialList=await la()),a.workflowOrders.length===0&&(a.workflowOrders=await s()),a.tourInquiries.length===0&&(a.tourInquiries=await i()),a.orderHeaders.length===0&&(a.orderHeaders=await l())}break;default:break}}catch(t){console.error("Route data load error:",e,t),T(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{a.actionLoading=!1,_()}}function An(){if(Va())return _l(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return vt("sales");case"/cat/brewery":return vt("brewery");case"/cat/purchase":return vt("purchase");case"/cat/more":return vt("more");case"/invoice-entry":return Hr(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/quote":return a.quoteEditId===null?el(a.quoteList,a.quoteListLoading):Ss(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return al(a.quoteCompanySettings);case"/email":return Yr(op());case"/delivery":return a.deliveryNote?Fr(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return Ed(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate);case"/billing":return a.billingSummary?xr(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?ec(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return dl(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return pl(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy);case"/customer-analysis":return a.customerAnalysis?Jl(a.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return Nr(a.demandForecast);case"/demand":return ad(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return pd(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/churn-alert":return a.churnAlert?fd(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?wd(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?Id(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/jikomi":return a.jikomiView==="calendar"?`${sn(a.jikomiList,a.jikomiView)}${bl(a.jikomiList)}`:sn(a.jikomiList,a.jikomiView);case"/tanks":return Od(a.tankList);case"/kentei":return $l(a.kenteiList);case"/materials":return ql(a.materialList)+Dl(a.materialEditing,a.materialEditingIsNew);case"/purchase":return Ml(a.purchaseList,a.payableList);case"/raw-material":return Rl(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Md(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return sc(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?Bl(a.pipelineMeta,he,te,a.syncDashboard):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return Jc(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return ic(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return zc(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return lc(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapCustomers.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>':cc(a.mapCustomers,a.deliveryLocations,a.mapFilters);case"/workflow":return uc(a.workflowOrders);case"/mobile-order":return mc(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return hc(a.tourInquiries,a.tourActiveId);case"/mail-senders":return vc(a.mailSenders,a.mailSenderEditingId);case"/calendar":return bc(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return wc(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return _c(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return xc(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/users":return Sc(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return kc(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return Pc(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return Ec(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return Dc(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return qc(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return Tc(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return nc(Js(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return Nl([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return Ll(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return yl(a.invoiceRecords,a.invoiceFilter);case"/ledger":return Ar(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return Ls(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return cp();default:return Rr(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function lp(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(i=>!a.dismissedAnnouncements.has(i.id)).map(i=>{const l=e[i.level]??e.info;return`
      <div class="announcement-bar" style="background:${l.bg};border-bottom:2px solid ${l.border};">
        <span class="announcement-text">${l.icon} ${i.message}</span>
        ${i.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${i.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),s=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+s}function cp(){function e(n,s,i,l){return`<a href="${`${"/".replace(/\/$/,"")||"/"}${n}`}" data-link="${n}" class="home-card">
      <span class="home-card-icon">${s}</span>
      <span class="home-card-label">${i}</span>
      <span class="home-card-desc">${l}</span>
    </a>`}const t=[{title:"販売業務",color:"#1a56db",cards:[e("/invoice-entry","📝","伝票入力","売上・返品を入力"),e("/quote","📄","見積作成","見積書の作成・管理"),e("/invoice","🔍","伝票照会","過去伝票の照会"),e("/delivery","🚚","納品書","納品書の発行"),e("/billing","💳","月次請求","請求書・入金管理"),e("/ledger","📒","得意先台帳","取引履歴の確認")].join("")},{title:"分析・レポート",color:"#7e3af2",cards:[e("/analytics","📊","売上分析","期間・商品・得意先別"),e("/customer-analysis","👥","得意先分析","ABC分析・ランク"),e("/product-power","📦","商品力分析","商品別販売力"),e("/customer-efficiency","⚡","営業効率","訪問効率・コスト"),e("/report","📈","集計帳票","各種集計帳票"),e("/sales","📋","売上一覧","売上明細一覧")].join("")},{title:"営業・顧客管理",color:"#0e9f6e",cards:[e("/churn-alert","🎯","営業アクション","離反リスク・フォロー"),e("/visit-planner","📅","訪問計画","訪問スケジュール"),e("/map","🗺️","取引先マップ","地図で取引先を確認"),e("/prospects","🌱","新規営業","新規開拓の進捗"),e("/email","✉️","メール配信","一斉メール配信"),e("/seasonal-calendar","🌸","季節提案","季節別提案管理")].join("")},{title:"受注・仕入",color:"#e3a008",cards:[e("/workflow","🔄","受注ワークフロー","受注から出荷まで"),e("/shopify","🛒","Shopify注文","EC受注の確認"),e("/purchase","📥","仕入・買掛","仕入管理・買掛金"),e("/payment","💰","入金状況","入金・回収状況")].join("")},{title:"製造管理",color:"#e02424",cards:[e("/jikomi","🍶","仕込管理","仕込帳・製造記録"),e("/tanks","🛢️","タンク管理","タンク在庫の管理"),e("/tax","📋","酒税申告","酒税申告書の作成"),e("/demand","📆","需要・生産計画","需要予測・生産計画"),e("/brewing-plan","🗓️","醸造計画","年間醸造スケジュール")].join("")},{title:"マスタ・設定",color:"#6b7280",cards:[e("/master","⚙️","マスタ管理","商品・得意先マスタ"),e("/store","🏪","店舗・直売所","直売所の販売管理"),e("/tour","🏯","酒蔵見学","見学予約の管理"),e("/setup","🔗","連動設定","酒仙iとの連動"),e("/import","📤","データ取込","CSVデータ取込"),e("/users","👤","ユーザー管理","アカウント管理")].join("")}];return`
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
  `}function dp(){if(Va())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${An()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",s=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?Ur(a.masterStats.customers,a.pickerQuery):Ol(a.masterStats.products,a.pickerQuery):"",i=a.globalSearchOpen?Jr(a.globalQuery,ip()):"",l=a.user?`<span class="app-header-user">${a.user.email}</span>
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
      ${lp()}
      <main class="main-v2">
        <div class="view ${a.actionLoading?"is-busy":""}">${An()}</div>
        <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
      </main>
      ${s}
      ${i}
    </div>
  `}async function pp(){a.actionLoading=!0,_();try{const{fetchSalesSummary:e}=await q(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>N);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,_()}}async function up(e){a.actionLoading=!0,_();try{a.invoiceRecords=await ht(e)}finally{a.actionLoading=!1,_()}}async function mp(e){a.actionLoading=!0,_();try{a.customerLedger=await Ea(e)}finally{a.actionLoading=!1,_()}}function Ce(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,n)=>{const s=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,i=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:s,unitPrice:i,amount:s*i}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function Be(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function yp(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,_()}),e.querySelectorAll("[data-action='global-search-close']").forEach(o=>{o.addEventListener("click",r=>{o.classList.contains("global-search")&&r.target instanceof HTMLElement&&!r.target.classList.contains("global-search")||(ft(),_())})}),e.querySelector("#global-search-input")?.addEventListener("input",o=>{a.globalQuery=o.target.value,_()}),e.querySelectorAll("[data-action='global-nav']").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.path;r&&(ft(),oa(r))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{rp()}),e.querySelectorAll("[data-jikomi-tab]").forEach(o=>{o.addEventListener("click",()=>{a.jikomiView=o.dataset.jikomiTab,_()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const o=e.querySelector("#auth-email")?.value.trim()??"",r=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,_(),Zs(o,r).then(async d=>{a.user=d,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:v}=await q(async()=>{const{fetchMyProfile:$,recordAudit:w}=await Promise.resolve().then(()=>N);return{fetchMyProfile:$,recordAudit:w}},void 0);a.myProfile=await m(d.email),await v({action:"sign_in",userEmail:d.email}),_()}).catch(async d=>{try{const m=await Ua(o,r);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:v}=await q(async()=>{const{fetchMyProfile:$}=await Promise.resolve().then(()=>N);return{fetchMyProfile:$}},void 0);a.myProfile=await v(m.email)}catch{a.authError=d instanceof Error?d.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,_()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,_()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{eo().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,_()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(o=>{o.addEventListener("click",()=>{a.sidebarOpen=!1,_()})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let o=0;t.addEventListener("touchstart",r=>{o=r.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",r=>{r.changedTouches[0].clientX-o<-60&&(a.sidebarOpen=!1,_())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.id??"";a.dismissedAnnouncements.add(r),_()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelectorAll("[data-link]").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),oa(o.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async o=>{o.preventDefault();const r=e.querySelector("#fr-title")?.value??"",d=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",v=e.querySelector("#fr-result");if(!r.trim())return;const $=await Vn(r,d,m);if(v&&(v.textContent=$?"送信しました":"送信に失敗しました",v.className=`fr-result ${$?"success":"error"}`),$){const w=e.querySelector("#feature-request-form");w&&w.reset()}}),e.querySelectorAll("[data-period]").forEach(o=>{o.addEventListener("click",()=>{a.salesPeriod=o.dataset.period,_()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const o=e.querySelector("#range-start")?.value??"",r=e.querySelector("#range-end")?.value??"";o&&r&&(a.customRange={start:o,end:r},a.salesPeriod="custom",_())}),e.querySelectorAll("[data-edit-customer]").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.editCustomer??"",d=a.masterStats?.customers.find(v=>v.id===r);if(!d)return;const m=document.createElement("div");m.innerHTML=xl(d),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async v=>{v.preventDefault();const $=document.getElementById("edit-result"),w=await Yn(r,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,manual_override:!0});$&&($.textContent=w?"保存しました":"保存に失敗",$.className=`fr-result ${w?"success":"error"}`),w&&(document.getElementById("edit-modal")?.remove(),Xe())})})}),e.querySelectorAll("[data-edit-product]").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.editProduct??"",d=a.masterStats?.products.find(v=>v.id===r);if(!d)return;const m=document.createElement("div");m.innerHTML=Sl(d),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async v=>{v.preventDefault();const $=document.getElementById("edit-result"),w=await Jn(r,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});$&&($.textContent=w?"保存しました":"保存に失敗",$.className=`fr-result ${w?"success":"error"}`),w&&(document.getElementById("edit-modal")?.remove(),Xe())})})}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=Ot(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,_()}),e.querySelectorAll("[data-open-quote]").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.openQuote,d=await ys(r);if(!d){T("見積の読み込みに失敗しました","error");return}a.quoteState={id:d.id,quoteNo:d.quote_no,quoteDate:d.quote_date,validUntil:d.valid_until??"",customerCode:d.legacy_customer_code??"",customerName:d.customer_name,customerAddress:d.customer_address,subject:d.subject,lines:d.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:d.remarks,taxRate:d.tax_rate,deliveryDate:d.delivery_date,paymentTerms:d.payment_terms,deliveryPlace:d.delivery_place,templateType:d.template_type??"sake",previewMode:!1},a.quoteEditId=r,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,_()})}),e.querySelectorAll("[data-delete-quote]").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.deleteQuote,d=o.dataset.quoteNo??r;if(!await we(`見積 ${d} を削除しますか？`))return;await Cn("quotes",r)?(a.quoteList=a.quoteList.filter($=>$.id!==r),T("削除しました","success"),_()):T("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,_(),Ma().then(o=>{a.quoteList=o,a.quoteListLoading=!1,_()})}),e.querySelectorAll("[name='q-template']").forEach(o=>{o.addEventListener("change",()=>{a.quoteState.templateType=o.value,_()})});function n(o){return(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function s(o){return o.length?o.map(r=>`<button class="search-item" type="button" data-select-customer="${n(r.code)}" data-cust-name="${n(r.name)}" data-cust-addr="${n(r.address1||"")}"><span class="mono">${n(r.code)}</span><span style="font-size:13px;font-weight:600;">${n(r.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function i(o){o.querySelectorAll("[data-select-customer]").forEach(r=>{r.addEventListener("click",async()=>{const d=r.dataset.selectCustomer??"";a.quoteState.customerCode=d,a.quoteState.customerName=r.dataset.custName??"",a.quoteState.customerAddress=r.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),o.remove(),a.quotePricing=await ra(a.masterStats?.customers??[],d),_()})})}function l(o){const r=e.querySelector("#q-cust-search")?.closest(".form-row");if(!r)return;let d=document.getElementById("cust-search-results");d||(d=document.createElement("div"),d.id="cust-search-results",d.className="search-results",r.after(d));const m=a.masterStats?.customers??[],v=o.trim().toLowerCase(),$=v.length===0?m:m.filter(w=>w.name.includes(o)||w.kanaName.includes(o)||w.code.includes(o)||w.name.toLowerCase().includes(v)||w.kanaName.toLowerCase().includes(v));d.innerHTML=s($),i(d)}function c(o,r){return o.length?o.map(d=>{const m=r?Da(d,r):{price:d.salePrice||0,label:"卸価格"},v=d.listPrice||0,$=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${n(d.code)}" data-prod-name="${n(d.name)}" data-prod-price="${m.price}" data-prod-retail="${v}" data-prod-jan="${n(d.janCode??"")}" data-prod-unit="${n(d.unit)}" data-prod-case="${d.caseQty??""}"><span class="mono">${n(d.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${n(d.name)}</span><span class="numeric"${$?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${n(m.label)})</small>${v?`　定価 ¥${v.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function p(o){o.querySelectorAll("[data-add-product]").forEach(r=>{r.addEventListener("click",()=>{const d=r.dataset.addProduct??"",m=r.dataset.prodName??"",v=parseInt(r.dataset.prodPrice??"0"),$=parseInt(r.dataset.prodRetail??"0")||null,w=r.dataset.prodJan??"",x=r.dataset.prodUnit||"本",k=r.dataset.prodCase??"",E=k?parseInt(k):null;a.quoteState.lines.push({productCode:d,productName:m,janCode:w,caseQty:E,quantity:1,unit:x,unitPrice:v,retailPrice:$,amount:v}),a.quoteProductQuery="";const C=e.querySelector("#q-prod-search");C&&(C.value=""),_()})})}function u(o){const r=e.querySelector("#q-prod-search")?.closest(".form-row");if(!r)return;let d=document.getElementById("prod-search-results");if(d||(d=document.createElement("div"),d.id="prod-search-results",d.className="search-results",r.after(d)),!a.masterStats){d.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,v=o.trim().toLowerCase(),$=v.length===0?m:m.filter(w=>w.name.includes(o)||w.kanaName.includes(o)||w.code.includes(o)||w.name.toLowerCase().includes(v)||w.kanaName.toLowerCase().includes(v));d.innerHTML=c($,a.quotePricing),p(d)}function y(o,r){let d=null;function m(){d||(d=v=>{const $=document.getElementById(r);if(!$){document.removeEventListener("touchstart",d),document.removeEventListener("mousedown",d),d=null;return}o.contains(v.target)||$.contains(v.target)||($.remove(),document.removeEventListener("touchstart",d),document.removeEventListener("mousedown",d),d=null)},document.addEventListener("touchstart",d,{passive:!0}),document.addEventListener("mousedown",d))}return m}(function(){const o=e.querySelector("#q-cust-search");if(!o)return;const r=y(o,"cust-search-results");o.addEventListener("focus",()=>{l(o.value),r()}),o.addEventListener("compositionend",()=>{a.quoteCustomerQuery=o.value,l(o.value)}),o.addEventListener("input",d=>{d.isComposing||(a.quoteCustomerQuery=o.value,l(o.value))}),o.value&&l(o.value)})(),(function(){const o=e.querySelector("#q-prod-search");if(!o)return;const r=y(o,"prod-search-results");o.addEventListener("focus",()=>{u(o.value),r()}),o.addEventListener("compositionend",()=>{a.quoteProductQuery=o.value,u(o.value)}),o.addEventListener("input",d=>{d.isComposing||(a.quoteProductQuery=o.value,u(o.value))}),o.value&&u(o.value)})(),e.querySelectorAll("[data-select-customer]").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.selectCustomer??"";a.quoteState.customerCode=r,a.quoteState.customerName=o.dataset.custName??"",a.quoteState.customerAddress=o.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await ra(a.masterStats?.customers??[],r),_()})}),e.querySelector("#q-price-type")?.addEventListener("change",o=>{const r=o.target.value;a.quoteState.manualPriceType=r,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:r}:a.quotePricing={priceType:r,priceGroup:"",individualPrices:new Map},_()}),e.querySelectorAll("[data-add-product]").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.addProduct??"",d=o.dataset.prodName??"",m=parseInt(o.dataset.prodPrice??"0"),v=parseInt(o.dataset.prodRetail??"0")||null,$=o.dataset.prodJan??"",w=o.dataset.prodUnit||"本",x=o.dataset.prodCase??"",k=x?parseInt(x):null;a.quoteState.lines.push({productCode:r,productName:d,janCode:$,caseQty:k,quantity:1,unit:w,unitPrice:m,retailPrice:v,amount:m}),a.quoteProductQuery="",_()})}),(()=>{const o=e.querySelector("#q-prospect-search");if(!o)return;const r=y(o,"q-prospect-results");function d(m){let v=document.getElementById("q-prospect-results");if(!v)return;const $=m.trim(),w=$.length===0?a.prospects.slice(0,8):a.prospects.filter(x=>x.companyName.includes($)||(x.contactName??"").includes($)).slice(0,8);if(w.length===0){v.innerHTML="";return}v.className="search-results",v.innerHTML=w.map(x=>`<button class="search-item" type="button" data-select-prospect="${x.id}" data-prospect-name="${n(x.companyName)}" data-prospect-addr="${n(x.address??"")}"><span style="font-size:13px;font-weight:600;">${n(x.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${n(x.contactName??"")} ${x.address?"· "+x.address.slice(0,20):""}</span></button>`).join(""),v.querySelectorAll("[data-select-prospect]").forEach(x=>{x.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=x.dataset.prospectName??"",a.quoteState.customerAddress=x.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=x.dataset.selectProspect??"";const k=a.quoteState.manualPriceType??"";a.quotePricing={priceType:k,priceGroup:"",individualPrices:new Map},o.value="",v&&(v.innerHTML=""),_()})})}o.addEventListener("focus",()=>{d(o.value),r()}),o.addEventListener("input",m=>{m.isComposing||d(o.value)}),o.addEventListener("compositionend",()=>d(o.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const o=e.querySelector("#q-prospect-search")?.value.trim()??"",r=document.createElement("div");r.className="modal-backdrop",r.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",r.innerHTML=`
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
    `,document.body.appendChild(r),r.querySelector("#pq-company")?.focus();const d=()=>r.remove();r.addEventListener("click",m=>{m.target===r&&d()}),r.querySelector("#prospect-quick-close")?.addEventListener("click",d),r.querySelector("#prospect-quick-close2")?.addEventListener("click",d),r.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const m=(r.querySelector("#pq-company")?.value??"").trim();if(!m){T("会社名は必須です","warning");return}const v={id:`p_${Date.now()}`,companyName:m,contactName:r.querySelector("#pq-contact")?.value.trim()||void 0,address:r.querySelector("#pq-address")?.value.trim()||void 0,phone:r.querySelector("#pq-phone")?.value.trim()||void 0,note:r.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:$,fetchProspects:w}=await q(async()=>{const{saveProspect:E,fetchProspects:C}=await Promise.resolve().then(()=>N);return{saveProspect:E,fetchProspects:C}},void 0),x=await $(v);if(!x){T("登録失敗","error");return}a.prospects=await w(),a.quoteState.customerCode="",a.quoteState.customerName=x.companyName,a.quoteState.customerAddress=x.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=x.id;const k=a.quoteState.manualPriceType??"";a.quotePricing={priceType:k,priceGroup:"",individualPrices:new Map},d(),T(`${x.companyName} を見込み顧客として登録しました`,"success"),_()})});function g(){_t(a.quoteState);const o=e.querySelector("#q-preview-scaler");if(!o)return;o.innerHTML=Ss(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const r=o.querySelector(".q-preview-doc"),d=o.parentElement?.clientWidth??0,m=r?.offsetWidth??0;if(d>0&&m>0&&m>d-24){const v=(d-24)/m;o.style.transform=`scale(${v})`,o.style.transformOrigin="top left",o.style.height=`${((r?.offsetHeight??0)+48)*v}px`}else o.style.transform="",o.style.height=""}for(const o of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${o}`)?.addEventListener("input",g);e.querySelector("#q-remarks")?.addEventListener("input",g),e.querySelectorAll(".qty-input").forEach(o=>{o.addEventListener("change",()=>{const r=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[r];d&&(d.quantity=parseFloat(o.value)||0,d.amount=d.quantity*d.unitPrice,g())})}),e.querySelectorAll(".price-input").forEach(o=>{o.addEventListener("change",()=>{const r=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[r];d&&(d.unitPrice=parseInt(o.value)||0,d.amount=d.quantity*d.unitPrice,g())})}),e.querySelectorAll(".jan-input").forEach(o=>{o.addEventListener("change",()=>{const r=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[r];d&&(d.janCode=o.value,g())})}),e.querySelectorAll(".case-qty-input").forEach(o=>{o.addEventListener("change",()=>{const r=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[r];d&&(d.caseQty=o.value?parseInt(o.value):null,g())})}),e.querySelectorAll(".retail-price-input").forEach(o=>{o.addEventListener("change",()=>{const r=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[r];d&&(d.retailPrice=o.value?parseInt(o.value):null,g())})}),e.querySelectorAll("[data-remove-line]").forEach(o=>{o.addEventListener("click",()=>{const r=parseInt(o.dataset.removeLine??"0");a.quoteState.lines.splice(r,1),_()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{_t(a.quoteState),a.quoteState.previewMode=!0,_()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,_()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async o=>{const r=o.currentTarget;r.disabled=!0,r.textContent="生成中…",_t(a.quoteState);try{await il(a.quoteState,a.quoteCompanySettings)}finally{r.disabled=!1,r.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{_t(a.quoteState);const o=a.quoteState,r=o.lines.reduce((x,k)=>x+k.amount,0),d=Math.round(r*o.taxRate/100),m=r+d;if(!o.quoteNo)try{const{supabaseRpc:x}=await q(async()=>{const{supabaseRpc:E}=await Promise.resolve().then(()=>G);return{supabaseRpc:E}},void 0),k=await x("generate_quote_no",{});o.quoteNo=k??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{o.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const v=new Date().toISOString().slice(0,10),$=o.templateType==="sake"||o.templateType==="standard"?o.templateType:"sake",w={quote_no:o.quoteNo,quote_date:o.quoteDate||v,valid_until:o.validUntil||null,legacy_customer_code:o.customerCode||null,customer_name:o.customerName||"",customer_address:o.customerAddress||"",subject:o.subject||"",template_type:$,subtotal:r,tax_amount:d,total_amount:m,tax_rate:o.taxRate||10,remarks:o.remarks||"",delivery_date:o.deliveryDate||"",payment_terms:o.paymentTerms||"",delivery_place:o.deliveryPlace||"",updated_at:new Date().toISOString()};try{let x=o.id;if(o.id){const k=await fetch(`${he}/rest/v1/quotes?id=eq.${encodeURIComponent(o.id)}`,{method:"PATCH",headers:{apikey:te,Authorization:`Bearer ${te}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(w)});if(!k.ok){const E=await k.text();throw new Error(`quotes更新失敗 ${k.status}: ${E}`)}await fetch(`${he}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(o.id)}`,{method:"DELETE",headers:{apikey:te,Authorization:`Bearer ${te}`}})}else{const k=await fetch(`${he}/rest/v1/quotes`,{method:"POST",headers:{apikey:te,Authorization:`Bearer ${te}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(w)});if(!k.ok){const C=await k.text();throw new Error(`quotes作成失敗 ${k.status}: ${C}`)}const E=await k.json();if(!E?.[0]?.id)throw new Error("IDが返りませんでした");x=E[0].id,o.id=x}if(o.lines.length>0){const k=o.lines.map((C,D)=>({quote_id:x,line_no:D+1,legacy_product_code:C.productCode||null,product_name:C.productName,jan_code:C.janCode||null,case_qty:C.caseQty??null,quantity:C.quantity,unit:C.unit,unit_price:C.unitPrice,retail_price:C.retailPrice??null,amount:C.amount})),E=await fetch(`${he}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:te,Authorization:`Bearer ${te}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(k)});if(!E.ok){const C=await E.text();throw new Error(`明細保存失敗 ${E.status}: ${C}`)}}T(`見積 ${o.quoteNo} を保存しました`,"success"),_()}catch(x){console.error("[save-quote]",x),T(`保存失敗: ${String(x).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const o=d=>document.getElementById(d)?.value??"",r={...a.quoteCompanySettings,companyName:o("qs-company-name"),companyPostal:o("qs-company-postal"),companyAddress1:o("qs-company-addr1"),companyAddress2:o("qs-company-addr2"),companyTel:o("qs-company-tel"),companyFax:o("qs-company-fax"),companyEmail:o("qs-company-email"),companyRegistrationNo:o("qs-company-regno"),bankName:o("qs-bank-name"),bankBranch:o("qs-bank-branch"),bankAccountType:o("qs-bank-type"),bankAccountNo:o("qs-bank-no"),bankAccountHolder:o("qs-bank-holder"),defaultPaymentTerms:o("qs-payment-terms"),defaultHeaderNote:o("qs-header-note"),defaultFooterNote:o("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};Ve(r),Ge("quote_company",r),a.quoteCompanySettings=r,T("設定を保存しました","success"),_()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:r},Ve(a.quoteCompanySettings),Ge("quote_company",a.quoteCompanySettings),_()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",o=>{const r=o.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:r},Ve(a.quoteCompanySettings),_()}),e.querySelector("#qs-seal-file")?.addEventListener("change",o=>{const r=o.target.files?.[0];if(!r)return;const d=new FileReader;d.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:d.result},Ve(a.quoteCompanySettings),Ge("quote_company",a.quoteCompanySettings),_()},d.readAsDataURL(r)}),e.querySelector("#qs-seal-size")?.addEventListener("input",o=>{const r=parseInt(o.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:r},Ve(a.quoteCompanySettings),Ge("quote_company",a.quoteCompanySettings),_()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},Ve(a.quoteCompanySettings),Ge("quote_company",a.quoteCompanySettings),_()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.month;r&&(a.demandForecast.calendarMonth=r,_())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.segment;a.demandForecast.selectedSegment=r,_()})}),e.querySelectorAll("[data-demand-tab]").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.demandTab;if(r){if(a.demandTab=r,r==="calendar"){const d=new Date().toISOString().slice(0,10);d.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=d)}_()}})});function f(o){const r=a.demandAnalysis,d=a.safetyStockParams;if(!r||d.length===0)return[];const[m,v]=o.split("-"),$=`${parseInt(m)-1}-${v}`,w=r.months.filter(x=>x<o).slice(-3);return d.map(x=>{const k=x.productionType==="make_to_order",E=r.matrix[x.productCode]?.[$]??0,C=w.map(M=>r.matrix[x.productCode]?.[M]??0),D=C.length>0?C.reduce((M,B)=>M+B,0)/C.length:x.avgMonthlyDemand,O=k?0:E>0?Math.ceil(E):Math.ceil(D),L=k?0:Math.ceil(x.safetyStockQty),I=Math.max(0,O+L);return{id:"",yearMonth:o,productCode:x.productCode,productName:x.productName,demandForecast:O,safetyStockTarget:L,openingStock:0,requiredProduction:I,plannedQty:k?0:I,actualQty:0,status:"draft",productionType:x.productionType??"monthly",notes:""}})}e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async o=>{const r=parseInt(o.target.value)||3;a.demandYearsBack=r,a.demandAnalysis=null;const{fetchDemandAnalysis:d}=await q(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>N);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await d(r*12),_()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.code??"",d=parseInt(o.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==r)return m;const v=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,$=d/30,w=Math.ceil(v*m.demandStdDev*Math.sqrt($)),x=Math.ceil(m.avgMonthlyDemand*$+w);return{...m,leadTimeDays:d,safetyStockQty:w,reorderPoint:x}}),_()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.code??"",d=parseFloat(o.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==r)return m;const v=d>=.99?2.33:d>=.97?1.88:d>=.95?1.65:d>=.9?1.28:1.04,$=m.leadTimeDays/30,w=Math.ceil(v*m.demandStdDev*Math.sqrt($)),x=Math.ceil(m.avgMonthlyDemand*$+w);return{...m,serviceLevel:d,safetyStockQty:w,reorderPoint:x}}),_()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async o=>{if(a.safetyStockParams.length===0)return;const r=o.currentTarget;r.disabled=!0,r.textContent="保存中…";const{saveSafetyStockParamsBulk:d}=await q(async()=>{const{saveSafetyStockParamsBulk:v}=await Promise.resolve().then(()=>N);return{saveSafetyStockParamsBulk:v}},void 0),m=await d(a.safetyStockParams);r.disabled=!1,r.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{r.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const o=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),r=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(d=>{const m=o>=.99?2.33:o>=.97?1.88:o>=.95?1.65:o>=.9?1.28:1.04,v=r/30,$=Math.ceil(m*d.demandStdDev*Math.sqrt(v)),w=Math.ceil(d.avgMonthlyDemand*v+$);return{...d,serviceLevel:o,leadTimeDays:r,safetyStockQty:$,reorderPoint:w}}),_()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.code??"",d=o.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===r?{...m,productionType:d}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async o=>{const r=o.target.value;if(!r)return;a.demandPlanYearMonth=r,a.calendarShifts=qt(r,1,0);const{fetchProductionPlan:d}=await q(async()=>{const{fetchProductionPlan:v}=await Promise.resolve().then(()=>N);return{fetchProductionPlan:v}},void 0),m=await d(r);a.productionPlan=m.length>0?m:f(r),Ae(a.calendarShifts,a.productionPlan.filter(v=>!a.calendarLabelExcluded.has(v.productCode)),a.calendarCapacity),_()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(o=>{o.addEventListener("click",()=>{a.demandPlanTypeFilter=o.dataset.filter??"all",_()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.sortCol??"";a.demandSort?.column===r?a.demandSort=a.demandSort.dir==="desc"?{column:r,dir:"asc"}:null:a.demandSort={column:r,dir:"desc"},_()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=f(a.demandPlanYearMonth),_()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",o=>{const r=o.target.files?.[0];if(!r)return;const d=new FileReader;d.onload=async()=>{const{parseCSV:m}=await q(async()=>{const{parseCSV:L}=await Promise.resolve().then(()=>Vc);return{parseCSV:L}},void 0),{columns:v,rows:$}=m(d.result),w=document.getElementById("csv-import-status"),x=v.find(L=>/商品コード|product_code|code|コード/i.test(L)),k=v.find(L=>/在庫|stock|期首|opening/i.test(L)),E=v.find(L=>/計画|plan|planned|生産/i.test(L));if(!x){w&&(w.style.display="block",w.style.background="rgba(197,61,61,0.1)",w.style.color="#c53d3d",w.textContent=`エラー: 商品コード列が見つかりません。列名: ${v.join(", ")}`);return}let C=0,D=0,O=0;for(const L of $){const I=(L[x]??"").trim();if(!I)continue;const M=a.productionPlan.find(B=>B.productCode===I);if(M){if(C++,k&&L[k]!==void 0&&L[k]!==""){const B=parseFloat(L[k])||0;M.openingStock=B,M.requiredProduction=Math.max(0,M.demandForecast+M.safetyStockTarget-B),M.plannedQty>0&&!E&&(M.plannedQty=M.requiredProduction),D++}E&&L[E]!==void 0&&L[E]!==""&&(M.plannedQty=parseFloat(L[E])||0,O++)}}w&&(w.style.display="block",C===0?(w.style.background="rgba(183,121,31,0.1)",w.style.color="#b7791f",w.textContent=`一致する商品コードが見つかりませんでした（CSV: ${$.length}行）`):(w.style.background="rgba(47,133,90,0.1)",w.style.color="#2f855a",w.textContent=`${C}商品に反映: 在庫${D}件${O>0?` / 計画${O}件`:""} 更新`),setTimeout(()=>{w.style.display="none"},5e3)),_()},d.readAsText(r,"UTF-8"),o.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(d=>{const m=d.dataset.code??"",v=a.productionPlan.find($=>$.productCode===m);v&&(v.plannedQty=parseFloat(d.value)||0)});const{saveProductionPlan:o}=await q(async()=>{const{saveProductionPlan:d}=await Promise.resolve().then(()=>N);return{saveProductionPlan:d}},void 0);await Promise.all(a.productionPlan.map(d=>o(d)));const{fetchProductionPlan:r}=await q(async()=>{const{fetchProductionPlan:d}=await Promise.resolve().then(()=>N);return{fetchProductionPlan:d}},void 0);a.productionPlan=await r(a.demandPlanYearMonth),_()}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.date??"",d=a.calendarShifts.find(m=>m.date===r);d&&(d.confirmed?a.calendarSelectedDate=a.calendarSelectedDate===r?null:r:d.partTimers>0||d.employees>0?(d.partTimers=0,d.employees=0,Ae(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=r):(d.partTimers=1,d.employees=0,Ae(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=r),_())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async o=>{const r=o.currentTarget;r.disabled=!0,r.textContent="保存中…";const{saveLabelExclusions:d}=await q(async()=>{const{saveLabelExclusions:$}=await Promise.resolve().then(()=>N);return{saveLabelExclusions:$}},void 0),m=[...a.calendarLabelExcluded],v=await d(a.demandPlanYearMonth,m);r.disabled=!1,r.textContent=v?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{r.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.code??"",m=document.getElementById("cal-label-list")?.scrollTop??0;o.checked?a.calendarLabelExcluded.delete(r):a.calendarLabelExcluded.add(r);const v=a.productionPlan.filter($=>!a.calendarLabelExcluded.has($.productCode));Ae(a.calendarShifts,v,a.calendarCapacity),_(),requestAnimationFrame(()=>{const $=document.getElementById("cal-label-list");$&&($.scrollTop=m)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.type??"",m=document.getElementById("cal-label-list")?.scrollTop??0,v=a.productionPlan.filter(w=>w.productionType===r);if(o.checked)for(const w of v)a.calendarLabelExcluded.delete(w.productCode);else for(const w of v)a.calendarLabelExcluded.add(w.productCode);const $=a.productionPlan.filter(w=>!a.calendarLabelExcluded.has(w.productCode));Ae(a.calendarShifts,$,a.calendarCapacity),_(),requestAnimationFrame(()=>{const w=document.getElementById("cal-label-list");w&&(w.scrollTop=m)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",o=>{const r=parseInt(o.target.value)||tt;a.calendarCapacity.partCapacity=r;const d=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ae(a.calendarShifts,d,a.calendarCapacity),_()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",o=>{const r=parseInt(o.target.value)||at;a.calendarCapacity.empCapacity=r;const d=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ae(a.calendarShifts,d,a.calendarCapacity),_()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.date??"",d=parseInt(o.value)||0,m=a.calendarShifts.find(v=>v.date===r);m&&(m.partTimers=d),_()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.date??"",d=parseInt(o.value)||0,m=a.calendarShifts.find(v=>v.date===r);m&&(m.employees=d),_()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async o=>{const r=o.target.value;if(!r)return;a.demandPlanYearMonth=r,a.calendarSelectedDate=null,a.calendarShifts=qt(r,1,0);const{fetchProductionPlan:d,fetchLabelExclusions:m}=await q(async()=>{const{fetchProductionPlan:w,fetchLabelExclusions:x}=await Promise.resolve().then(()=>N);return{fetchProductionPlan:w,fetchLabelExclusions:x}},void 0),[v,$]=await Promise.all([d(r),m(r)]);a.productionPlan=v.length>0?v:f(r),a.calendarLabelExcluded=new Set($),Ae(a.calendarShifts,a.productionPlan.filter(w=>!a.calendarLabelExcluded.has(w.productCode)),a.calendarCapacity),_()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",o=>{const r=parseInt(o.target.value)||0;a.calendarDefaultPart=r;for(const d of a.calendarShifts)if(!d.confirmed){const m=new Date(d.date).getDay()===0||new Date(d.date).getDay()===6;d.partTimers=m?0:r}_()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",o=>{const r=parseInt(o.target.value)||0;a.calendarDefaultEmp=r;for(const d of a.calendarShifts)if(!d.confirmed){const m=new Date(d.date).getDay()===0||new Date(d.date).getDay()===6;d.employees=m?0:r}_()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=qt(a.demandPlanYearMonth,1,0),Ae(a.calendarShifts,a.productionPlan.filter(o=>!a.calendarLabelExcluded.has(o.productCode)),a.calendarCapacity),_()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const o of a.calendarShifts)o.confirmed=!0;_()}),e.querySelectorAll("[data-action='select-month']").forEach(o=>{o.addEventListener("click",()=>{const r=parseInt(o.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=r,_())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterArea=o.target.value,_())}),e.querySelector("#visit-filter-score")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(o.target.value)||0,_())}),e.querySelectorAll("[data-sort-col]").forEach(o=>{o.addEventListener("click",r=>{const d=o.dataset.sortCol??"",m=r.shiftKey;a.route==="/product-power"?a.productSortState=nt(a.productSortState,d,m):a.route==="/customer-efficiency"?a.customerSortState=nt(a.customerSortState,d,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=nt(a.dashboardSortState,d,m):a.route==="/master"?a.masterSortState=nt(a.masterSortState,d,m):a.route==="/analytics"&&(a.analyticsSortState=nt(a.analyticsSortState,d,m)),_()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(o=>{o.addEventListener("click",async()=>{const r=parseInt(o.dataset.year??"",10);r&&(a.customerEfficiencyYear=r,a.customerEfficiency=await pt(r,a.customerEfficiencyGroupBy),_())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async o=>{const r=parseInt(o.target.value,10);r&&(a.customerEfficiencyYear=r,a.customerEfficiency=await pt(r,a.customerEfficiencyGroupBy),_())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.groupby??"billing";a.customerEfficiencyGroupBy=r,a.customerEfficiency=await pt(a.customerEfficiencyYear,r),_()})}),e.querySelectorAll("[data-product-period]").forEach(o=>{o.addEventListener("click",()=>{a.productPeriod=o.dataset.productPeriod??"year",_()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const o=document.getElementById("pp-range-start")?.value??"",r=document.getElementById("pp-range-end")?.value??"";o&&r&&(a.productCustomStart=o,a.productCustomEnd=r,a.productPeriod="custom",_())}),e.querySelectorAll("[data-product-filter]").forEach(o=>{o.addEventListener("click",()=>{a.productFilter=o.dataset.productFilter??"all",_()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async o=>{const r=o.currentTarget;r.disabled=!0,r.textContent="更新中…",await Xe(),r.disabled=!1,r.textContent="↻ 更新",T("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const o=e.querySelector("#sales-start")?.value??"",r=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:o,endDate:r},pp()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const o={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=o,up(o)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const o=e.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=o.trim().toUpperCase(),mp(a.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{a.masterTab=o.dataset.tab,a.masterFilter={...Ra},_()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},_()}),e.querySelector("#master-search")?.addEventListener("keydown",o=>{o.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(o=>{o.addEventListener("click",()=>{const r=Number(o.dataset.page);r>=1&&(a.masterFilter={...a.masterFilter,page:r},_())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.table;if(!r)return;a.rawSelectedTable=r,a.rawPage=1;const d=await Lt(r,1);a.rawRecords=d.records,a.rawTotalCount=d.total,_()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const o=await Lt(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,_()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const o=await Lt(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,_()}),e.querySelectorAll("[data-analytics-tab]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsTab=o.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:r,fetchAvailablePeriods:d}=await q(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:v}=await Promise.resolve().then(()=>N);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:v}},void 0);a.analyticsPeriodOptions=await d(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await r(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}_()})}),e.querySelectorAll("[data-analytics-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:r,fetchAvailablePeriods:d,fetchPeriodChartData:m,prevYearFilter:v}=await q(async()=>{const{fetchAnalyticsByPeriod:w,fetchAvailablePeriods:x,fetchPeriodChartData:k,prevYearFilter:E}=await Promise.resolve().then(()=>N);return{fetchAnalyticsByPeriod:w,fetchAvailablePeriods:x,fetchPeriodChartData:k,prevYearFilter:E}},void 0),$=o.dataset.analyticsPeriod;if(a.analyticsPeriod=$,a.analyticsDrilldown=null,$==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await d(a.analyticsTab,$),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const w=a.analyticsPeriodFilter,[x,k,E]=await Promise.all([r(a.analyticsTab,$,w),m($,w),m($,v(w))]);a.analyticsPeriodRows=x,a.analyticsPeriodChartData=k,a.analyticsPrevYearChartData=E}_()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async o=>{const{fetchAnalyticsByPeriod:r,fetchPeriodChartData:d,prevYearFilter:m}=await q(async()=>{const{fetchAnalyticsByPeriod:w,fetchPeriodChartData:x,prevYearFilter:k}=await Promise.resolve().then(()=>N);return{fetchAnalyticsByPeriod:w,fetchPeriodChartData:x,prevYearFilter:k}},void 0);a.analyticsPeriodFilter=o.target.value,a.analyticsDrilldown=null;const v=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:w}=await q(async()=>{const{fiscalYearToDateRange:I}=await Promise.resolve().then(()=>un);return{fiscalYearToDateRange:I}},void 0),x=parseInt(v),k=w(x);w(x-1);const E=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:C}=await q(async()=>{const{supabaseRpc:I}=await Promise.resolve().then(()=>G);return{supabaseRpc:I}},void 0),[D,O,L]=await Promise.all([C(E,{p_date_from:k.from,p_date_to:k.to}),d("yearly",v),d("yearly",String(x-1))]);a.analyticsPeriodRows=(D??[]).map(I=>({code:String(I.code??""),name:String(I.name??""),amount:Number(I.amount??0),quantity:Number(I.quantity??0),documents:Number(I.documents??0),volumeMl:Number(I.volume_ml??0)})),a.analyticsPeriodChartData=(O??[]).map(I=>({...I})),a.analyticsPrevYearChartData=(L??[]).map(I=>({...I}))}else{const[w,x,k]=await Promise.all([r(a.analyticsTab,a.analyticsPeriod,v),d(a.analyticsPeriod,v),d(a.analyticsPeriod,m(v))]);a.analyticsPeriodRows=w,a.analyticsPeriodChartData=x,a.analyticsPrevYearChartData=k}_()}),e.querySelectorAll("[data-fiscal-mode]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsFiscalMode=o.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:r}=await q(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>un);return{monthToFiscalYear:m}},void 0),d=new Set;for(const m of a.salesAnalytics.monthlySales)d.add(r(m.month));a.analyticsPeriodOptions=[...d].sort((m,v)=>v-m).map(String)}else{const{fetchAvailablePeriods:r}=await q(async()=>{const{fetchAvailablePeriods:d}=await Promise.resolve().then(()=>N);return{fetchAvailablePeriods:d}},void 0);a.analyticsPeriodOptions=await r(a.analyticsTab,"yearly")}_()})}),e.querySelectorAll("[data-chart-metric]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsChartMetric=o.dataset.chartMetric,_()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.analyticsDrilldown??"",d=o.dataset.drilldownName??r,m=a.analyticsTab,{fetchCustomerProductBreakdown:v,fetchProductCustomerBreakdown:$,fetchEntityMonthlySales:w,periodToDateRange:x}=await q(async()=>{const{fetchCustomerProductBreakdown:D,fetchProductCustomerBreakdown:O,fetchEntityMonthlySales:L,periodToDateRange:I}=await Promise.resolve().then(()=>N);return{fetchCustomerProductBreakdown:D,fetchProductCustomerBreakdown:O,fetchEntityMonthlySales:L,periodToDateRange:I}},void 0),k=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?x(a.analyticsPeriod,a.analyticsPeriodFilter):null,[E,C]=await Promise.all([w(r,m==="customers"?"customer":"product"),m==="customers"?v(r,k?.from,k?.to):$(r,k?.from,k?.to)]);a.analyticsDrilldown={tab:m,code:r,name:d,monthlySales:E,breakdownRows:C},_()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,_()}),e.querySelector("#staff-filter-input")?.addEventListener("input",o=>{a.analyticsStaffFilter=o.target.value,_()}),e.querySelectorAll("[data-staff-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.staffDrilldown??"",d=o.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:v,periodToDateRange:$}=await q(async()=>{const{fetchStaffCustomerBreakdown:C,fetchStaffProductBreakdown:D,periodToDateRange:O}=await Promise.resolve().then(()=>N);return{fetchStaffCustomerBreakdown:C,fetchStaffProductBreakdown:D,periodToDateRange:O}},void 0),w=$(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),x=a.analyticsStaffDrilldown?.breakdownTab??"customers",[k,E]=await Promise.all([m(r,w?.from,w?.to),v(r,w?.from,w?.to)]);a.analyticsStaffDrilldown={code:r,name:d,breakdownTab:x,customerRows:k,productRows:E},_()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:o.dataset.staffBreakdownTab},_())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,_()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",o=>{a.analyticsTagFilter=o.target.value,_()}),e.querySelectorAll("[data-staff-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAvailablePeriods:r,fetchStaffTotalsByPeriod:d,periodToDateRange:m}=await q(async()=>{const{fetchAvailablePeriods:$,fetchStaffTotalsByPeriod:w,periodToDateRange:x}=await Promise.resolve().then(()=>N);return{fetchAvailablePeriods:$,fetchStaffTotalsByPeriod:w,periodToDateRange:x}},void 0),v=o.dataset.staffPeriod;if(a.analyticsStaffPeriod=v,a.analyticsStaffDrilldown=null,v==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await r("staff",v),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const $=m(v,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await d($?.from,$?.to)}_()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async o=>{const{fetchStaffTotalsByPeriod:r,periodToDateRange:d}=await q(async()=>{const{fetchStaffTotalsByPeriod:v,periodToDateRange:$}=await Promise.resolve().then(()=>N);return{fetchStaffTotalsByPeriod:v,periodToDateRange:$}},void 0);a.analyticsStaffPeriodFilter=o.target.value;const m=d(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await r(m?.from,m?.to),a.analyticsStaffDrilldown=null,_()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Ce(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},_()}),e.querySelectorAll("[data-action='remove-line']").forEach(o=>{o.addEventListener("click",()=>{Ce(e);const r=parseInt(o.dataset.line??"0",10);a.invoiceForm.lines.splice(r,1),a.invoiceErrors=Vs(a.invoiceForm),_()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(o=>{o.addEventListener("click",()=>{Ce(e),tp(parseInt(o.dataset.line??"0",10)),a.invoiceErrors={},_()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{ap(),_()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Ce(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,_()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(o=>{o.addEventListener("click",()=>{Ce(e);const r=parseInt(o.dataset.line??"0",10),d=a.invoiceForm.lines[r];a.pickerMode="product",a.pickerTargetLine=r,a.pickerQuery=d?d.productCode||d.productName:"",_()})}),e.querySelectorAll("[data-action='modal-close']").forEach(o=>{o.addEventListener("click",r=>{o.classList.contains("modal-backdrop")&&r.target instanceof HTMLElement&&!r.target.classList.contains("modal-backdrop")||(Rt(),_())})}),e.querySelectorAll("[data-action='picker-select']").forEach(o=>{const r=async()=>{const d=o.dataset.code??"",m=o.dataset.name??"";if(a.pickerMode==="customer"){a.invoiceForm.customerCode=d,a.invoiceForm.customerName=m,delete a.invoiceErrors.customerCode;const v=a.masterStats?.customers.find($=>$.code===d);a.invoicePriceGroup=v?.priceGroup||"",!a.invoicePriceGroup&&d&&(a.invoicePriceGroup=await da(d))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const v=a.invoiceForm.lines[a.pickerTargetLine];if(v){v.productCode=d,v.productName=m;const $=await ms(a.invoicePriceGroup,d);$>0&&(v.unitPrice=$),v.amount=v.quantity*v.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}Rt(),_()};o.addEventListener("click",r),o.addEventListener("keydown",d=>{d.key==="Enter"&&r()})}),e.querySelector("#modal-search")?.addEventListener("input",o=>{a.pickerQuery=o.target.value,_()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Fs(),_()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Ys(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Ce(e),np(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await da(a.invoiceForm.customerCode)),_())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Ce(e),sp(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,_())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(o=>{o.addEventListener("input",()=>{Ce(e),a.invoiceSavedDocNo=null;const r=o.dataset.field;(r==="quantity"||r==="unitPrice")&&_()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Ce(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const o=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=o.trim(),a.deliveryNote=null,a.actionLoading=!0,_(),!a.deliverySearchDocNo){T("伝票番号を入力してください","error"),a.actionLoading=!1,_();return}Ca(a.deliverySearchDocNo).then(r=>{a.deliveryNote=r,a.actionLoading=!1,_()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const o=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=o,a.billingSummary=null,a.actionLoading=!0,_(),La(o).then(r=>{a.billingSummary=r,a.actionLoading=!1,_()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const o=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),r=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=o,a.taxMonth=r,a.taxDeclaration=null,a.actionLoading=!0,_(),qa(o,r).then(d=>{a.taxDeclaration=d,a.actionLoading=!1,_()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:o}=await q(async()=>{const{generateTaxXML:$}=await Promise.resolve().then(()=>N);return{generateTaxXML:$}},void 0),r=o(a.taxDeclaration),d=new Blob([r],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(d),v=document.createElement("a");v.href=m,v.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,v.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:o}=await q(async()=>{const{generateTaxCSV:$}=await Promise.resolve().then(()=>N);return{generateTaxCSV:$}},void 0),r=o(a.taxDeclaration),d=new Blob([r],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(d),v=document.createElement("a");v.href=m,v.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,v.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:o}=await q(async()=>{const{saveTaxDeclaration:r}=await Promise.resolve().then(()=>N);return{saveTaxDeclaration:r}},void 0);try{await o(a.taxDeclaration),T("下書き保存しました")}catch(r){T("保存に失敗: "+(r instanceof Error?r.message:String(r)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(o=>{o.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const r=Number(o.dataset.taxRow),d=o.dataset.taxField,m=o.type==="number"?Number(o.value)||0:o.value,v=[...a.taxDeclaration.rows];v[r]={...v[r],[d]:m};const{recalculateTaxDeclaration:$}=await q(async()=>{const{recalculateTaxDeclaration:w}=await Promise.resolve().then(()=>N);return{recalculateTaxDeclaration:w}},void 0);a.taxDeclaration=$({...a.taxDeclaration,rows:v}),_()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const r=Number(o.dataset.dedRow),d=o.dataset.dedField,m=o.type==="number"?Number(o.value)||0:o.value,v=[...a.taxDeclaration.deductions];v[r]={...v[r],[d]:m},a.taxDeclaration={...a.taxDeclaration,deductions:v},_()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const r=o.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[r]:o.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:o,TAX_RATE_CATEGORIES:r}=await q(async()=>{const{recalculateTaxDeclaration:v,TAX_RATE_CATEGORIES:$}=await Promise.resolve().then(()=>N);return{recalculateTaxDeclaration:v,TAX_RATE_CATEGORIES:$}},void 0),d=r[0],m={taxCategory:d.code,taxCategoryName:d.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:d.taxRatePerLiter,taxAmount:0};a.taxDeclaration=o({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),_()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(o=>{o.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const r=Number(o.dataset.taxRow),{recalculateTaxDeclaration:d}=await q(async()=>{const{recalculateTaxDeclaration:v}=await Promise.resolve().then(()=>N);return{recalculateTaxDeclaration:v}},void 0),m=a.taxDeclaration.rows.filter((v,$)=>$!==r);a.taxDeclaration=d({...a.taxDeclaration,rows:m}),_()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const o={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,o]},_()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(o=>{o.addEventListener("click",()=>{if(!a.taxDeclaration)return;const r=Number(o.dataset.dedRow),d=a.taxDeclaration.deductions.filter((m,v)=>v!==r);a.taxDeclaration={...a.taxDeclaration,deductions:d},_()})}),e.querySelectorAll("[data-store-tab]").forEach(o=>{o.addEventListener("click",()=>{a.storeTab=o.dataset.storeTab,_()})}),e.querySelectorAll("[data-import-entity]").forEach(o=>{o.addEventListener("click",()=>{a.importEntity=o.dataset.importEntity,a.importPreview=null,a.importResult=null,_()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const o=Ts(a.importEntity),r=new Blob([o],{type:"text/csv;charset=utf-8"}),d=URL.createObjectURL(r),m=document.createElement("a");m.href=d,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const r=e.querySelector("#import-file")?.files?.[0];if(!r){T("CSVファイルを選択してください","warning");return}const d=new FileReader;d.onload=()=>{const m=String(d.result??""),{columns:v,rows:$}=qs(m);a.importPreview=Is(a.importEntity,v,$),a.importResult=null,_()},d.readAsText(r,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,_()}),e.querySelectorAll("[data-print-template]").forEach(o=>{o.addEventListener("click",()=>{a.printTemplate=o.dataset.printTemplate,_()})}),e.querySelectorAll("[data-print-field]").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.printField;let d=o.value;(r==="taxRate"||r==="previousBalance"||r==="paymentAmount")&&(d=Number(o.value)||0),a.printData={...a.printData,[r]:d},_()})}),e.querySelectorAll("[data-print-opt]").forEach(o=>{const r=()=>{const d=o.dataset.printOpt;let m;o.type==="checkbox"?m=o.checked:d==="copies"?m=Number(o.value)||1:d==="overlayOpacity"||d==="calibrationOffsetX"||d==="calibrationOffsetY"?m=Number(o.value)||0:m=o.value,a.printOptions={...a.printOptions,[d]:m},_()};o.addEventListener("change",r),o.type==="range"&&o.addEventListener("input",r)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(o=>{o.addEventListener("change",()=>{const r=Number(o.dataset.printLine),d=o.dataset.printLfield,m=[...a.printData.lines];let v=o.value;(d==="quantity"||d==="unitPrice")&&(v=Number(o.value)||0),m[r]={...m[r],[d]:v},m[r].amount=(Number(m[r].quantity)||0)*(Number(m[r].unitPrice)||0),a.printData={...a.printData,lines:m},_()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},_()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(o=>{o.addEventListener("click",()=>{const r=Number(o.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((d,m)=>m!==r)},_()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),T("印刷設定を保存しました")}catch(o){T("保存失敗: "+(o instanceof Error?o.message:String(o)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const o=a.printCompany,r=prompt("会社名",o.name);if(r===null)return;const d=prompt("郵便番号",o.postalCode)??o.postalCode,m=prompt("住所",o.address1)??o.address1,v=prompt("TEL",o.tel)??o.tel,$=prompt("FAX",o.fax)??o.fax,w=prompt("適格請求書登録番号 (T+13桁)",o.registrationNo)??o.registrationNo,x=prompt("取引銀行名",o.bankName)??o.bankName,k=prompt("支店名",o.bankBranch)??o.bankBranch,E=prompt("口座番号",o.bankAccountNo)??o.bankAccountNo,C=prompt("口座名義",o.bankAccountHolder)??o.bankAccountHolder;a.printCompany={...o,name:r,postalCode:d,address1:m,tel:v,fax:$,registrationNo:w,bankName:x,bankBranch:k,bankAccountNo:E,bankAccountHolder:C},_()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,_()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const d=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=Xt(o),{savePrintLayout:v}=await q(async()=>{const{savePrintLayout:w}=await Promise.resolve().then(()=>N);return{savePrintLayout:w}},void 0),$={id:`bp1701_${d.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:d,templateKey:"chain_store",positions:m};try{await v($)?(T(`クラウド保存成功: ${d}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),_()):(T("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(w){T("保存エラー: "+(w instanceof Error?w.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const r=Xt(o);a.fdSavedPositions=r;try{localStorage.setItem("sake_fd_positions",JSON.stringify(r)),T(`ローカル保存完了: ${Object.keys(r).length}件`)}catch(d){T("保存失敗: "+(d instanceof Error?d.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const d={templateKey:"chain_store",positions:Xt(o),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(d,null,2)],{type:"application/json"}),v=URL.createObjectURL(m),$=document.createElement("a");$.href=v,$.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,$.click(),URL.revokeObjectURL(v)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async o=>{const r=o.target.files?.[0];if(r)try{const d=await r.text(),v=JSON.parse(d).positions;if(!v)throw new Error("positions field not found");a.fdSavedPositions=v,localStorage.setItem("sake_fd_positions",JSON.stringify(v)),T(`インポート成功: ${Object.keys(v).length}件`),_()}catch(d){T("インポート失敗: "+(d instanceof Error?d.message:""),"error")}});const b=e.querySelector("#fd-saved-layouts");b&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:o}=await q(async()=>{const{fetchPrintLayouts:d}=await Promise.resolve().then(()=>N);return{fetchPrintLayouts:d}},void 0),r=await o("chain_store");r.length===0?b.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(b.innerHTML=`☁️ クラウド保存済み (${r.length}件):<br/>`+r.map(d=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${d.id}" style="margin:4px 4px 0 0;">${d.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${d.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),b.querySelectorAll("[data-action='fd-load-layout']").forEach(d=>{d.addEventListener("click",()=>{const m=d.dataset.layoutId,v=r.find($=>$.id===m);v&&(a.fdSavedPositions=v.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(v.positions)),T(`読込完了: ${v.name}`),_())})}),b.querySelectorAll("[data-action='fd-delete-layout']").forEach(d=>{d.addEventListener("click",async()=>{const m=d.dataset.layoutId;if(!m||!await we("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:v}=await q(async()=>{const{deletePrintLayout:w}=await Promise.resolve().then(()=>N);return{deletePrintLayout:w}},void 0);await v(m)?(T("削除しました"),_()):T("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await we("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),_())});const S=e.querySelector("#fd-sel-x"),P=e.querySelector("#fd-sel-y");[S,P].forEach(o=>{o?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const r=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);r&&(S&&(r.style.left=S.value+"mm"),P&&(r.style.top=P.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(o=>{o.addEventListener("dragstart",r=>{o.classList.add("wf-dragging"),r.dataTransfer?.setData("text/plain",o.dataset.wfOrder??"")}),o.addEventListener("dragend",()=>o.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(o=>{o.addEventListener("dragover",r=>r.preventDefault()),o.addEventListener("drop",r=>{r.preventDefault();const d=r.dataTransfer?.getData("text/plain"),m=o.dataset.wfStage;if(!d||!m)return;const v=a.workflowOrders.find($=>$.id===d);v&&(v.stage=m,_())})}),e.querySelectorAll("[data-mo-step]").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.moStep;o.disabled||(a.mobileOrder.step=r,_())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",o=>{a.mobileOrder.customerQuery=o.target.value,_()}),e.querySelector("#mo-product-q")?.addEventListener("input",o=>{a.mobileOrder.productQuery=o.target.value,_()}),e.querySelectorAll("[data-mo-select-customer]").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.moSelectCustomer,d=a.masterStats?.customers.find(m=>m.id===r);d&&(a.mobileOrder.selectedCustomer=d),_()})}),e.querySelectorAll("[data-mo-add-product]").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.moAddProduct,d=a.masterStats?.products.find(v=>v.code===r);if(!d)return;const m=1800;a.mobileOrder.cart.push({productCode:d.code,productName:d.name,quantity:1,unit:"本",unitPrice:m,amount:m}),_()})}),e.querySelectorAll("[data-mo-qty]").forEach(o=>{o.addEventListener("click",()=>{const r=Number(o.dataset.moQty),d=o.dataset.moProduct,m=a.mobileOrder.cart.find(v=>v.productCode===d);m&&(m.quantity=Math.max(0,m.quantity+r),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(v=>v.productCode!==d)),_())})}),e.querySelectorAll("[data-mo-remove]").forEach(o=>{o.addEventListener("click",()=>{const r=Number(o.dataset.moRemove);a.mobileOrder.cart.splice(r,1),_()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const o=e.querySelector("#mo-memo");a.mobileOrder.memo=o?.value??"";const r="MO"+Date.now().toString().slice(-8);a.mobileOrder.submittedDocNo=r,a.mobileOrder.step="done",_()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},_()}),e.querySelectorAll("[data-tour-id]").forEach(o=>{o.addEventListener("click",()=>{a.tourActiveId=o.dataset.tourId??null,_()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(o=>{o.addEventListener("click",()=>{const r=a.tourInquiries.find(w=>w.id===a.tourActiveId);if(!r)return;const d=o.dataset.template==="confirm"?fc:gc,m=e.querySelector("#tour-confirmed-time"),v=d.replaceAll("{name}",r.name).replaceAll("{partySize}",String(r.partySize)).replaceAll("{confirmedTime}",m?.value??r.visitDate),$=e.querySelector("#tour-reply-body");$&&($.value=v)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const o=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",r=a.tourInquiries.find(m=>m.id===o);if(!r)return;const d=e.querySelector("#tour-confirmed-time");r.status="confirmed",r.repliedAt=new Date().toISOString(),r.confirmedTime=d?.value??"",T("返信メールを下書き保存し、ステータスを確定にしました"),_()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const o=e.querySelector("#lb-type")?.value??"",r=e.querySelector("#lb-area")?.value??"",d=e.querySelector("#lb-keyword")?.value??"";if(!o&&!d){T("業種かキーワードを入力してください","warning");return}a.leadSearchType=o,a.leadSearchArea=r,a.leadSearchQuery=d,a.leadSearching=!0,_();const m=a.integrations.find(x=>x.provider==="google_maps");if(!m||!m.config.api_key){T("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,_();return}const{searchPlaces:v}=await q(async()=>{const{searchPlaces:x}=await Promise.resolve().then(()=>N);return{searchPlaces:x}},void 0),$=[o,d].filter(Boolean).join(" "),w=await v(m,$,r);a.leadSearching=!1,w.error?T("検索失敗: "+w.error,"error"):a.leadSearchResults=w.results,_()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],_()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const o=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!o)return;const r=`ll_${Date.now()}`,d={id:r,name:o,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:v,fetchLeadLists:$,fetchLeadItems:w}=await q(async()=>{const{saveLeadList:E,saveLeadItem:C,fetchLeadLists:D,fetchLeadItems:O}=await Promise.resolve().then(()=>N);return{saveLeadList:E,saveLeadItem:C,fetchLeadLists:D,fetchLeadItems:O}},void 0);await m(d);const x=e.querySelectorAll(".lb-search-check:checked"),k=Array.from(x).map(E=>Number(E.dataset.idx));for(const E of k){const C=a.leadSearchResults[E];C&&await v({...C,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:r,businessType:a.leadSearchType})}a.leadLists=await $(),a.leadActiveListId=r,a.leadItems=await w(r),a.leadSearchResults=[],T(`${k.length}件を「${o}」として保存しました`),_()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.id??null;if(a.leadActiveListId=r,r){const{fetchLeadItems:d}=await q(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>N);return{fetchLeadItems:m}},void 0);a.leadItems=await d(r)}_()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.id??"",d=a.leadItems.find($=>$.id===r);if(!d)return;const{saveLeadItem:m,fetchLeadItems:v}=await q(async()=>{const{saveLeadItem:$,fetchLeadItems:w}=await Promise.resolve().then(()=>N);return{saveLeadItem:$,fetchLeadItems:w}},void 0);await m({...d,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await v(a.leadActiveListId)),_()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.id??"",d=a.leadItems.find(w=>w.id===r);if(!d)return;const{convertLeadToProspect:m,fetchLeadItems:v}=await q(async()=>{const{convertLeadToProspect:w,fetchLeadItems:x}=await Promise.resolve().then(()=>N);return{convertLeadToProspect:w,fetchLeadItems:x}},void 0);await m(d)&&(T("見込客に追加しました: "+d.companyName),a.leadActiveListId&&(a.leadItems=await v(a.leadActiveListId)),_())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const o=e.querySelectorAll(".lb-item-check:checked");if(o.length===0&&!await we("全ての新規アイテムを見込客に変換しますか？"))return;const r=o.length>0?Array.from(o).map($=>$.dataset.id):a.leadItems.filter($=>$.status==="new").map($=>$.id),{convertLeadToProspect:d,fetchLeadItems:m}=await q(async()=>{const{convertLeadToProspect:$,fetchLeadItems:w}=await Promise.resolve().then(()=>N);return{convertLeadToProspect:$,fetchLeadItems:w}},void 0);let v=0;for(const $ of r){const w=a.leadItems.find(x=>x.id===$);w&&w.status==="new"&&await d(w)&&v++}T(`${v}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),_()}),e.querySelectorAll("[data-map-filter]").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.mapFilter;let d;o.type==="checkbox"?d=o.checked:d=o.value,a.mapFilters={...a.mapFilters,[r]:d},_()})}),e.querySelectorAll(".churn-reason-select").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.churnCode??"",d=o.value;try{const{saveChurnNote:m}=await q(async()=>{const{saveChurnNote:w}=await Promise.resolve().then(()=>N);return{saveChurnNote:w}},void 0);await m({customerCode:r,reason:d,memo:"",actionedAt:null});const v=a.churnNotes.find(w=>w.customerCode===r);v?v.reason=d:a.churnNotes.push({customerCode:r,reason:d,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const $=o.closest("tr");if($){const w=$.querySelector("td:nth-child(2)");if(w){let x=w.querySelector(".reason-badge");!x&&d&&(x=document.createElement("span"),x.className="status-pill info reason-badge",x.style.fontSize="0.72rem",w.appendChild(x)),x&&(x.textContent=d?Jd[d]??"":"")}}T("理由を保存しました")}catch(m){T("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.churnCode??"",d=o.checked,m=o.closest("tr");m&&(m.style.opacity=d?"0.45":"",m.setAttribute("data-actioned",d?"1":"0"));try{const{saveChurnNote:v}=await q(async()=>{const{saveChurnNote:k}=await Promise.resolve().then(()=>N);return{saveChurnNote:k}},void 0),$=a.churnNotes.find(k=>k.customerCode===r),w=$?.reason??"",x=new Date().toISOString().slice(0,10);await v({customerCode:r,reason:w,memo:"",actionedAt:d?x:null}),$?$.actionedAt=d?x:null:a.churnNotes.push({customerCode:r,reason:w,memo:"",actionedAt:d?x:null,updatedAt:new Date().toISOString()}),T(d?"対応済みにしました":"対応済みを解除しました")}catch(v){T("保存に失敗しました","error"),console.error(v)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const o=a.integrations.find(v=>v.provider==="ivry");if(!o||!o.isEnabled){T("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:r,fetchCallLogs:d}=await q(async()=>{const{syncIvryCallLogs:v,fetchCallLogs:$}=await Promise.resolve().then(()=>N);return{syncIvryCallLogs:v,fetchCallLogs:$}},void 0),m=await r(o);m.error?T("同期失敗: "+m.error,"error"):(T(`${m.count}件の通話履歴を同期しました`),a.callLogs=await d(100),_())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const o=a.integrations.find(v=>v.provider==="ivry");if(!o||!o.isEnabled){T("IVRy連携が無効です","warning");return}if(!await we("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:r}=await q(async()=>{const{syncPhoneBookToIvry:v}=await Promise.resolve().then(()=>N);return{syncPhoneBookToIvry:v}},void 0),d=[];a.masterStats?.customers.forEach(v=>{d.push({name:v.name,phone:"",customerCode:v.code,note:"既存取引先"})}),a.prospects.forEach(v=>{v.phone&&d.push({name:v.companyName,phone:v.phone,customerCode:v.id,note:`見込客 (${v.stage})`})});const m=await r(o,d);m.error?T("送信失敗: "+m.error,"error"):T(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.id??"",d=o.dataset.phone??"",m=prompt(`電話番号 ${d} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const v=a.callLogs.find(x=>x.id===r);if(!v)return;const{saveCallLog:$,fetchCallLogs:w}=await q(async()=>{const{saveCallLog:x,fetchCallLogs:k}=await Promise.resolve().then(()=>N);return{saveCallLog:x,fetchCallLogs:k}},void 0);await $({...v,matchedCustomerCode:m}),a.callLogs=await w(100),_()})}),e.querySelectorAll("[data-action='call-memo']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.id??"",d=a.callLogs.find(w=>w.id===r);if(!d)return;const m=prompt("メモを入力:",d.notes??"");if(m===null)return;const{saveCallLog:v,fetchCallLogs:$}=await q(async()=>{const{saveCallLog:w,fetchCallLogs:x}=await Promise.resolve().then(()=>N);return{saveCallLog:w,fetchCallLogs:x}},void 0);await v({...d,notes:m}),a.callLogs=await $(100),_()})}),e.querySelectorAll("[data-prospect-view]").forEach(o=>{o.addEventListener("click",()=>{a.prospectViewMode=o.dataset.prospectView,_()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",_()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.id??null;if(a.prospectEditingId=r,r){const{fetchProspectActivities:d}=await q(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>N);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await d(r)}_()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.prospectId??null;if(a.prospectEditingId=r,r){const{fetchProspectActivities:d}=await q(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>N);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await d(r)}_()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(o=>{o.addEventListener("click",r=>{r.currentTarget!==r.target&&!r.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],_())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const o=a.prospectEditingId==="__new__",r=o?`p_${Date.now()}`:a.prospectEditingId??"",d={id:r,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!d.companyName){T("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:v,recordAudit:$,sendSlackNotification:w}=await q(async()=>{const{saveProspect:k,fetchProspects:E,recordAudit:C,sendSlackNotification:D}=await Promise.resolve().then(()=>N);return{saveProspect:k,fetchProspects:E,recordAudit:C,sendSlackNotification:D}},void 0);await m(d)?(o&&await w("new_prospect",`新規見込客: ${d.companyName} / 想定 ¥${d.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await $({action:o?"prospect_create":"prospect_update",entityType:"prospect",entityId:r,userEmail:a.user?.email}),a.prospects=await v(),a.prospectEditingId=null,_()):T("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await we("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const r=o.dataset.id??"",{deleteProspect:d,fetchProspects:m}=await q(async()=>{const{deleteProspect:v,fetchProspects:$}=await Promise.resolve().then(()=>N);return{deleteProspect:v,fetchProspects:$}},void 0);await d(r)&&(a.prospects=await m(),_())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(o=>{o.addEventListener("click",r=>{r.stopPropagation();const d=o.dataset.id??"",m=o.dataset.name??"",v=o.dataset.addr??"";a.quoteState=Ot(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=m,a.quoteState.customerAddress=v,a.quoteState.isProspect=!0,a.quoteState.prospectId=d,a.quotePricing=null,a.quoteEditId="new",oa("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",r=e.querySelector("#prospect-activity-type")?.value??"call",d=e.querySelector("#prospect-activity-title")?.value??"";if(!d){T("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:v}=await q(async()=>{const{saveProspectActivity:$,fetchProspectActivities:w}=await Promise.resolve().then(()=>N);return{saveProspectActivity:$,fetchProspectActivities:w}},void 0);await m({id:`act_${Date.now()}`,prospectId:o,activityType:r,title:d,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await v(o),_()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("dragstart",r=>{r.dataTransfer?.setData("text/plain",o.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(o=>{o.addEventListener("dragover",r=>r.preventDefault()),o.addEventListener("drop",async r=>{r.preventDefault();const d=r.dataTransfer?.getData("text/plain"),m=o.dataset.prospectStage;if(!d)return;const v=a.prospects.find($=>$.id===d);if(v&&v.stage!==m){const $={...v,stage:m},{saveProspect:w}=await q(async()=>{const{saveProspect:x}=await Promise.resolve().then(()=>N);return{saveProspect:x}},void 0);await w($),v.stage=m,_()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:o,saveIntegrationSetting:r}=await q(async()=>{const{fetchIntegrationSettings:x,saveIntegrationSetting:k}=await Promise.resolve().then(()=>N);return{fetchIntegrationSettings:x,saveIntegrationSetting:k}},void 0),m=(a.integrations.length>0?a.integrations:await o()).find(x=>x.provider==="slack");if(!m)return;const v=e.querySelector("#slack-webhook")?.value??"",$=e.querySelector("#slack-default-channel")?.value??"",w=e.querySelector("#slack-enabled")?.checked??!1;await r({...m,config:{...m.config,webhook_url:v,default_channel:$},isEnabled:w}),a.integrations=await o(),T("保存しました"),_()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:o,fetchSlackRules:r}=await q(async()=>{const{saveSlackRule:d,fetchSlackRules:m}=await Promise.resolve().then(()=>N);return{saveSlackRule:d,fetchSlackRules:m}},void 0);for(const d of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${d.id}"][data-slack-field="enabled"]`)?.checked??d.enabled,v=e.querySelector(`[data-slack-rule-id="${d.id}"][data-slack-field="channel"]`)?.value??d.channel;await o({...d,enabled:m,channel:v})}a.slackRules=await r(),T("ルールを保存しました"),_()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:o}=await q(async()=>{const{sendSlackNotification:d}=await Promise.resolve().then(()=>N);return{sendSlackNotification:d}},void 0),r=await o("new_order","🧪 これはテスト通知です (syusen-cloud)");r.ok?T("テスト送信成功"):T("送信失敗: "+(r.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,_()}),e.querySelectorAll("[data-action='material-adjust']").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.id??"",d=a.materialList.find(m=>m.id===r);d&&(a.materialEditing=d,a.materialEditingIsNew=!1,_())})}),e.querySelectorAll("[data-action='material-close']").forEach(o=>{o.addEventListener("click",r=>{r.currentTarget!==r.target&&!r.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,_())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const r={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(r.materialType=e.querySelector("#mat-type")?.value??"",!r.code||!r.name){T("コードと品名は必須です","warning");return}const{saveMaterial:d,fetchMaterialList:m}=await q(async()=>{const{saveMaterial:$,fetchMaterialList:w}=await Promise.resolve().then(()=>N);return{saveMaterial:$,fetchMaterialList:w}},void 0);await d(r)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,T("保存しました"),_()):T("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!o||!await we("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:r,fetchMaterialList:d}=await q(async()=>{const{deleteMaterial:m,fetchMaterialList:v}=await Promise.resolve().then(()=>N);return{deleteMaterial:m,fetchMaterialList:v}},void 0);await r(o)&&(a.materialList=await d(),a.materialEditing=null,_())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",_()}),e.querySelectorAll("[data-action='user-edit']").forEach(o=>{o.addEventListener("click",()=>{a.userEditingId=o.dataset.id??null,_()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,_()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const o=a.userEditingId==="__new__",r=o?crypto.randomUUID():a.userEditingId??"",d=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!d||!m){T("名前とメールアドレスは必須です","warning");return}const v={id:r,email:d,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(o){const E=e.querySelector("#user-password")?.value??"";if(E.length<8){T("パスワードは8文字以上必要です","warning");return}try{await Ua(d,E)}catch(C){T("Auth登録失敗: "+(C instanceof Error?C.message:""),"error");return}}const{saveUserProfile:$,fetchUserProfiles:w,recordAudit:x}=await q(async()=>{const{saveUserProfile:E,fetchUserProfiles:C,recordAudit:D}=await Promise.resolve().then(()=>N);return{saveUserProfile:E,fetchUserProfiles:C,recordAudit:D}},void 0);await $(v)?(await x({action:o?"user_create":"user_update",entityType:"user",entityId:r,userEmail:a.user?.email}),a.userProfiles=await w(),a.userEditingId=null,T("保存しました"),_()):T("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await we("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const r=o.dataset.id??"",{deleteUserProfile:d,fetchUserProfiles:m,recordAudit:v}=await q(async()=>{const{deleteUserProfile:w,fetchUserProfiles:x,recordAudit:k}=await Promise.resolve().then(()=>N);return{deleteUserProfile:w,fetchUserProfiles:x,recordAudit:k}},void 0);await d(r)?(await v({action:"user_delete",entityType:"user",entityId:r,userEmail:a.user?.email}),a.userProfiles=await m(),_()):T("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const o=e.querySelector("#profile-sender")?.value??"",r={...a.myProfile,defaultMailSenderId:o},{saveUserProfile:d}=await q(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>N);return{saveUserProfile:m}},void 0);await d(r),a.myProfile=r,T("保存しました"),_()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const o=e.querySelector("#profile-new-password")?.value??"";if(o.length<8){T("8文字以上のパスワードを入力してください","warning");return}try{await ao(o),T("パスワードを変更しました")}catch(r){T("変更失敗: "+(r instanceof Error?r.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(o=>{o.addEventListener("click",()=>{a.integrationEditingId=o.dataset.id??null,_()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,_()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='int-save']")?.dataset.id??"",r=a.integrations.find(x=>x.id===o);if(!r)return;const d={...r.config};Object.keys(d).forEach(x=>{const k=e.querySelector(`#int-${x}`);k&&(d[x]=k.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:v,fetchIntegrationSettings:$}=await q(async()=>{const{saveIntegrationSetting:x,fetchIntegrationSettings:k}=await Promise.resolve().then(()=>N);return{saveIntegrationSetting:x,fetchIntegrationSettings:k}},void 0);await v({...r,config:d,isEnabled:m})?(a.integrations=await $(),a.integrationEditingId=null,T("保存しました"),_()):T("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(o=>{o.addEventListener("click",async()=>{const r=a.integrations.find($=>$.provider==="shopify");if(!r){T("Shopify連携が未設定です","warning");return}o.textContent="同期中…",o.disabled=!0;const{syncShopifyOrders:d,fetchShopifyOrders:m}=await q(async()=>{const{syncShopifyOrders:$,fetchShopifyOrders:w}=await Promise.resolve().then(()=>N);return{syncShopifyOrders:$,fetchShopifyOrders:w}},void 0),v=await d(r);v.error?T("同期失敗: "+v.error,"error"):(T(`${v.count}件を同期しました`),a.shopifyOrders=await m()),_()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(o=>{o.addEventListener("click",async()=>{const r=a.integrations.find($=>$.provider==="google_calendar");if(!r)return;o.textContent="同期中…",o.disabled=!0;const{syncGoogleCalendar:d,fetchCalendarEvents:m}=await q(async()=>{const{syncGoogleCalendar:$,fetchCalendarEvents:w}=await Promise.resolve().then(()=>N);return{syncGoogleCalendar:$,fetchCalendarEvents:w}},void 0),v=await d(r);v.error?T("同期失敗: "+v.error,"error"):(T(`${v.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),_()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const r=e.querySelector("#fax-file")?.files?.[0];if(!r){T("FAX画像を選択してください","warning");return}const d=a.integrations.find(m=>m.provider==="cloud_vision");if(!d||!d.config.api_key){T("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,_();try{const m=new FileReader;m.onload=async()=>{const v=String(m.result??""),{ocrFaxImage:$,saveFaxRecord:w,fetchFaxInbox:x}=await q(async()=>{const{ocrFaxImage:D,saveFaxRecord:O,fetchFaxInbox:L}=await Promise.resolve().then(()=>N);return{ocrFaxImage:D,saveFaxRecord:O,fetchFaxInbox:L}},void 0),k=await $(d,v),E=e.querySelector("#fax-sender-name")?.value??"",C=e.querySelector("#fax-sender-phone")?.value??"";await w({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:E,senderPhone:C,ocrStatus:k.error?"failed":"done",ocrText:k.text}),a.faxOcrText=k.error?`エラー: ${k.error}`:k.text,a.faxRecords=await x(),a.faxProcessing=!1,_()},m.readAsDataURL(r)}catch(m){T("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,_()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",_()}),e.querySelectorAll("[data-action='ms-edit']").forEach(o=>{o.addEventListener("click",()=>{a.mailSenderEditingId=o.dataset.id??null,_()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,_()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,r={id:o,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find($=>$.id===o)?.isVerified??!1};if(!r.name||!r.email){T("名前とメールアドレスは必須です","warning");return}const{saveMailSender:d,fetchMailSenders:m}=await q(async()=>{const{saveMailSender:$,fetchMailSenders:w}=await Promise.resolve().then(()=>N);return{saveMailSender:$,fetchMailSenders:w}},void 0);await d(r)?(a.mailSenders=await m(),a.mailSenderEditingId=null,T("保存しました"),_()):T("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await we("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const r=o.dataset.id??"",{deleteMailSender:d,fetchMailSenders:m}=await q(async()=>{const{deleteMailSender:$,fetchMailSenders:w}=await Promise.resolve().then(()=>N);return{deleteMailSender:$,fetchMailSenders:w}},void 0);await d(r)?(a.mailSenders=await m(),_()):T("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(o=>{o.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){T("データなし","error");return}const o=a.demandAnalysis,r=Object.entries(o.matrix).map(([m,v])=>{const $={productCode:m};return o.months.forEach(w=>{$[w]=v[w]??0}),$}),d=[{key:"productCode",label:"商品コード"},...o.months.map(m=>({key:m,label:m}))];ba("demand-analysis.csv",r,d)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){T("データなし","error");return}const o=a.productionPlan.map(d=>({...d}));ba("production-plan.csv",o,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await we("当月の全請求を締め切りますか？")&&T("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async o=>{const r=parseInt(o.target.value);a.brewingPlanFY=r;const{fetchBrewingPlanSummary:d,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:v,fetchBrewingProductDetail:$,fetchBrewingCustomCategories:w,fetchBrewingCategoryOverrides:x,fetchAllBrewingStockEntries:k}=await q(async()=>{const{fetchBrewingPlanSummary:B,fetchBrewingMonthlyTrend:z,fetchBrewingSchedule:Q,fetchBrewingProductDetail:F,fetchBrewingCustomCategories:j,fetchBrewingCategoryOverrides:U,fetchAllBrewingStockEntries:Z}=await Promise.resolve().then(()=>N);return{fetchBrewingPlanSummary:B,fetchBrewingMonthlyTrend:z,fetchBrewingSchedule:Q,fetchBrewingProductDetail:F,fetchBrewingCustomCategories:j,fetchBrewingCategoryOverrides:U,fetchAllBrewingStockEntries:Z}},void 0),[E,C,D,O,L,I,M]=await Promise.all([d(`${r}-10-01`,`${r+1}-09-30`),m(`${r}-10-01`,`${r+1}-09-30`),v(r),$(`${r}-10-01`,`${r+1}-09-30`),w(),x(),k()]);a.brewingPlanData=E,a.brewingMonthlyTrend=C,a.brewingSchedule=D,a.brewingProductDetail=O,a.brewingStockEntries=M,a.brewingCustomCategories=L,a.brewingOverrides=I,a.brewingExcludedProducts=new Set,_()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.code??"",d=o.dataset.parent??"";if(!r||!d)return;if(o.checked){a.brewingExcludedProducts.delete(r),_();return}a.brewingExcludedProducts.add(r);const m=a.brewingCustomCategories.filter(v=>v.parentCategory===d);if(m.length===1){const{setBrewingCategoryOverride:v,fetchBrewingPlanSummary:$,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:x}=await q(async()=>{const{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:L,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:M}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:L,fetchBrewingProductDetail:I,fetchBrewingCategoryOverrides:M}},void 0);await v(r,m[0].name);const k=a.brewingPlanFY,[E,C,D]=await Promise.all([$(`${k}-10-01`,`${k+1}-09-30`),w(`${k}-10-01`,`${k+1}-09-30`),x()]);a.brewingPlanData=E,a.brewingProductDetail=C,a.brewingOverrides=D,a.brewingExcludedProducts.delete(r)}_()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.code??"",d=o.dataset.cat??"";if(!r||!d)return;const{setBrewingCategoryOverride:m,fetchBrewingPlanSummary:v,fetchBrewingProductDetail:$,fetchBrewingCategoryOverrides:w}=await q(async()=>{const{setBrewingCategoryOverride:D,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:L,fetchBrewingCategoryOverrides:I}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:D,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:L,fetchBrewingCategoryOverrides:I}},void 0);await m(r,d);const x=a.brewingPlanFY,[k,E,C]=await Promise.all([v(`${x}-10-01`,`${x+1}-09-30`),$(`${x}-10-01`,`${x+1}-09-30`),w()]);a.brewingPlanData=k,a.brewingProductDetail=E,a.brewingOverrides=C,_()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.code??"";if(!r)return;const{setBrewingCategoryOverride:d,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:v,fetchBrewingCategoryOverrides:$}=await q(async()=>{const{setBrewingCategoryOverride:C,fetchBrewingPlanSummary:D,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:L}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:C,fetchBrewingPlanSummary:D,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:L}},void 0);await d(r,null);const w=a.brewingPlanFY,[x,k,E]=await Promise.all([m(`${w}-10-01`,`${w+1}-09-30`),v(`${w}-10-01`,`${w+1}-09-30`),$()]);a.brewingPlanData=x,a.brewingProductDetail=k,a.brewingOverrides=E,_()})}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.cat??"",d=o.dataset.field??"",m=parseFloat(o.value);if(!r||!d||isNaN(m))return;const v=a.brewingRiceParams[r]??{brewCategory:r,polishingRatio:.7,ricePerLiterKg:.85,riceVariety:"一般米",ricePricePerKg:400,kojiRatio:.2};v[d]=m,a.brewingRiceParams[r]=v;const{saveBrewingRiceParams:$}=await q(async()=>{const{saveBrewingRiceParams:w}=await Promise.resolve().then(()=>N);return{saveBrewingRiceParams:w}},void 0);await $(r,v),_()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.cat??"",d=parseFloat(o.value);if(!r)return;const{saveBrewingForecastOverride:m}=await q(async()=>{const{saveBrewingForecastOverride:v}=await Promise.resolve().then(()=>N);return{saveBrewingForecastOverride:v}},void 0);if(isNaN(d))await m(r,null),delete a.brewingForecastOverrides[r];else{const v=d/100;await m(r,v),a.brewingForecastOverrides[r]=v}_()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.cat??"",d="bc-"+encodeURIComponent(r).replace(/%/g,"-"),m=e.querySelector(`#alc-raw-${d}`),v=e.querySelector(`#alc-target-${d}`),$=parseFloat(m?.value??"18")||18,w=parseFloat(v?.value??"15")||15,{saveBrewingAlcoholSetting:x}=await q(async()=>{const{saveBrewingAlcoholSetting:E}=await Promise.resolve().then(()=>N);return{saveBrewingAlcoholSetting:E}},void 0);await x(r,$,w)&&(a.brewingAlcoholSettings[r]={brewCategory:r,rawAlcoholPct:$,targetAlcoholPct:w}),_()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.code??"",d=o.value,m=o.dataset.current??"";if(d===m)return;const{setBrewingCategoryOverride:v,fetchBrewingPlanSummary:$,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:x}=await q(async()=>{const{setBrewingCategoryOverride:E,fetchBrewingPlanSummary:C,fetchBrewingProductDetail:D,fetchBrewingCategoryOverrides:O}=await Promise.resolve().then(()=>N);return{setBrewingCategoryOverride:E,fetchBrewingPlanSummary:C,fetchBrewingProductDetail:D,fetchBrewingCategoryOverrides:O}},void 0);if(await v(r,d)){const E=a.brewingPlanFY,[C,D,O]=await Promise.all([$(`${E}-10-01`,`${E+1}-09-30`),w(`${E}-10-01`,`${E+1}-09-30`),x()]);a.brewingPlanData=C,a.brewingProductDetail=D,a.brewingOverrides=O}_()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.cat??"",d=o.value;if(!r||!d)return;const{linkTypeToCategory:m,fetchBrewingPlanSummary:v,fetchBrewingProductDetail:$,fetchBrewingCategoryOverrides:w,fetchCategoryTypeLinks:x}=await q(async()=>{const{linkTypeToCategory:L,fetchBrewingPlanSummary:I,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:B,fetchCategoryTypeLinks:z}=await Promise.resolve().then(()=>N);return{linkTypeToCategory:L,fetchBrewingPlanSummary:I,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:B,fetchCategoryTypeLinks:z}},void 0);await m(r,d);const k=a.brewingPlanFY,[E,C,D,O]=await Promise.all([v(`${k}-10-01`,`${k+1}-09-30`),$(`${k}-10-01`,`${k+1}-09-30`),w(),x()]);a.brewingPlanData=E,a.brewingProductDetail=C,a.brewingOverrides=D,a.brewingTypeLinks=O,_()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.cat??"",d=o.dataset.type??"";if(!r||!d)return;const{unlinkTypeFromCategory:m,fetchBrewingPlanSummary:v,fetchBrewingProductDetail:$,fetchBrewingCategoryOverrides:w,fetchCategoryTypeLinks:x}=await q(async()=>{const{unlinkTypeFromCategory:L,fetchBrewingPlanSummary:I,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:B,fetchCategoryTypeLinks:z}=await Promise.resolve().then(()=>N);return{unlinkTypeFromCategory:L,fetchBrewingPlanSummary:I,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:B,fetchCategoryTypeLinks:z}},void 0);await m(r,d);const k=a.brewingPlanFY,[E,C,D,O]=await Promise.all([v(`${k}-10-01`,`${k+1}-09-30`),$(`${k}-10-01`,`${k+1}-09-30`),w(),x()]);a.brewingPlanData=E,a.brewingProductDetail=C,a.brewingOverrides=D,a.brewingTypeLinks=O,_()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const o=e.querySelector("#brew-new-category-name"),r=e.querySelector("#brew-new-category-parent"),d=o?.value.trim()??"",m=r?.value??"";if(!d)return;if(!m){T("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map(x=>x.name)].includes(d)){T("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:$}=await q(async()=>{const{addBrewingCustomCategory:x}=await Promise.resolve().then(()=>N);return{addBrewingCustomCategory:x}},void 0);await $(d,m)?(a.brewingCustomCategories.push({name:d,parentCategory:m}),o&&(o.value=""),T(`「${d}」を追加しました（${m}系）`)):T("追加に失敗しました","error"),_()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.cat??"";if(!r)return;const{deleteBrewingCustomCategory:d,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:v}=await q(async()=>{const{deleteBrewingCustomCategory:w,fetchBrewingPlanSummary:x,fetchBrewingProductDetail:k}=await Promise.resolve().then(()=>N);return{deleteBrewingCustomCategory:w,fetchBrewingPlanSummary:x,fetchBrewingProductDetail:k}},void 0);if(await d(r)){a.brewingCustomCategories=a.brewingCustomCategories.filter(E=>E.name!==r);for(const[E,C]of Object.entries(a.brewingOverrides))C===r&&delete a.brewingOverrides[E];const w=a.brewingPlanFY,[x,k]=await Promise.all([m(`${w}-10-01`,`${w+1}-09-30`),v(`${w}-10-01`,`${w+1}-09-30`)]);a.brewingPlanData=x,a.brewingProductDetail=k,T(`「${r}」を削除しました`)}_()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.cat??"",d=o.dataset.catId??"",v=e.querySelector(`#new-entry-target-${d}`)?.value??r,$=e.querySelector(`#new-entry-label-${d}`),w=e.querySelector(`#new-entry-vol-${d}`),x=$?.value.trim()??"",k=parseFloat(w?.value??"0");if(k<=0)return;const{addBrewingStockEntry:E,fetchBrewingPlanSummary:C,fetchAllBrewingStockEntries:D}=await q(async()=>{const{addBrewingStockEntry:L,fetchBrewingPlanSummary:I,fetchAllBrewingStockEntries:M}=await Promise.resolve().then(()=>N);return{addBrewingStockEntry:L,fetchBrewingPlanSummary:I,fetchAllBrewingStockEntries:M}},void 0);if(await E(v,x||`タンク${a.brewingStockEntries.filter(L=>L.brewCategory===v).length+1}`,k)){const L=a.brewingPlanFY,[I,M]=await Promise.all([C(`${L}-10-01`,`${L+1}-09-30`),D()]);a.brewingPlanData=I,a.brewingStockEntries=M}_(),requestAnimationFrame(()=>{const L=document.getElementById(`stock-display-${d}`),I=document.getElementById(`stock-edit-${d}`),M=document.querySelector(`.btn-edit-stock[data-cat-id="${d}"]`);L&&(L.style.display="none"),I&&(I.style.display=""),M&&(M.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.id??"",d=o.value;if(!r||!d)return;const{reassignBrewingStockEntry:m,fetchBrewingPlanSummary:v,fetchAllBrewingStockEntries:$}=await q(async()=>{const{reassignBrewingStockEntry:x,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:E}=await Promise.resolve().then(()=>N);return{reassignBrewingStockEntry:x,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:E}},void 0);if(await m(r,d)){const x=a.brewingPlanFY,[k,E]=await Promise.all([v(`${x}-10-01`,`${x+1}-09-30`),$()]);a.brewingPlanData=k,a.brewingStockEntries=E}_(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach(x=>{const k=document.getElementById(`stock-display-${x.dataset.catId}`),E=document.getElementById(`stock-edit-${x.dataset.catId}`);E&&E.querySelector(`[data-id="${r}"]`)&&(k&&(k.style.display="none"),E.style.display="",x.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.id??"",d=o.dataset.cat??"",m="bc-"+encodeURIComponent(d).replace(/%/g,"-"),{deleteBrewingStockEntry:v,fetchBrewingPlanSummary:$,fetchAllBrewingStockEntries:w}=await q(async()=>{const{deleteBrewingStockEntry:k,fetchBrewingPlanSummary:E,fetchAllBrewingStockEntries:C}=await Promise.resolve().then(()=>N);return{deleteBrewingStockEntry:k,fetchBrewingPlanSummary:E,fetchAllBrewingStockEntries:C}},void 0);if(await v(r)){const k=a.brewingPlanFY,[E,C]=await Promise.all([$(`${k}-10-01`,`${k+1}-09-30`),w()]);a.brewingPlanData=E,a.brewingStockEntries=C}_(),requestAnimationFrame(()=>{const k=document.getElementById(`stock-display-${m}`),E=document.getElementById(`stock-edit-${m}`),C=document.querySelector(`.btn-edit-stock[data-cat-id="${m}"]`);k&&(k.style.display="none"),E&&(E.style.display=""),C&&(C.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.catId??"",d=e.querySelector(`#stock-display-${r}`),m=e.querySelector(`#stock-edit-${r}`);d&&(d.style.display="none"),m&&(m.style.display=""),o.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.catId??"",d=e.querySelector(`#stock-display-${r}`),m=e.querySelector(`#stock-edit-${r}`),v=e.querySelector(`.btn-edit-stock[data-cat-id="${r}"]`);d&&(d.style.display=""),m&&(m.style.display="none"),v&&(v.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.catId??"",d=e.querySelector(`#schedule-rows-${r}`);if(!d)return;const m=d.querySelectorAll(".schedule-edit-row").length,v=document.createElement("div");v.innerHTML=buildScheduleEditRowHTML(r,m,9,2,0,"");const $=v.firstElementChild;d.appendChild($),$.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>$.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(o=>{o.addEventListener("click",()=>o.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.cat??"",d=o.dataset.catId??"",m=e.querySelector(`#stock-input-${d}`),v=parseFloat(m?.value??"");if(isNaN(v)||v<0){alert("有効な数値を入力してください");return}o.textContent="保存中...",o.setAttribute("disabled","true");try{const{upsertBrewingStock:$,fetchBrewingPlanSummary:w,fetchBrewingMonthlyTrend:x}=await q(async()=>{const{upsertBrewingStock:D,fetchBrewingPlanSummary:O,fetchBrewingMonthlyTrend:L}=await Promise.resolve().then(()=>N);return{upsertBrewingStock:D,fetchBrewingPlanSummary:O,fetchBrewingMonthlyTrend:L}},void 0),k=a.brewingPlanFY;await $(r,v,0);const[E,C]=await Promise.all([w(`${k}-10-01`,`${k+1}-09-30`),x(`${k}-10-01`,`${k+1}-09-30`)]);a.brewingPlanData=E,a.brewingMonthlyTrend=C,_()}catch($){console.error("[brewing save]",$),alert(`保存エラー: ${String($)}`),o.textContent="保存",o.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.toggleCat??"",d=`sub-row-${"bc-"+encodeURIComponent(r).replace(/%/g,"-")}`,m=e.querySelectorAll(`.${d}`),v=o.querySelector(".toggle-icon"),$=m[0]?.style.display!=="none";m.forEach(w=>{w.style.display=$?"none":""}),v&&(v.innerHTML=$?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{T("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{T("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(o=>{o.addEventListener("click",()=>{T("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{T("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(o=>{o.addEventListener("click",async()=>{await we("この買掛を入金済みにしますか？")&&T("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(o=>{o.addEventListener("click",()=>{T("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{T("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(o=>{o.addEventListener("click",()=>{const r=o.closest("tr")?.querySelector("td")?.textContent??"";T(`タンク ${r} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{T("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(o=>{o.addEventListener("click",()=>{const r=o.closest("tr")?.querySelector("td")?.textContent??"";T(`注文 ${r} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{T("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(o=>{o.addEventListener("click",()=>{T("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{T("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.customer??"";T(`得意先 ${r} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{T("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!o||!await we("このリストを削除しますか？"))return;const{supabaseDelete:d}=await q(async()=>{const{supabaseDelete:v}=await Promise.resolve().then(()=>G);return{supabaseDelete:v}},void 0);if(await d("lead_lists",o)){const{fetchLeadLists:v}=await q(async()=>{const{fetchLeadLists:$}=await Promise.resolve().then(()=>N);return{fetchLeadLists:$}},void 0);a.leadLists=await v(),T("削除しました","success"),_()}else T("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{T("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.scYm;if(!r)return;a.shipmentCalendarYearMonth=r,a.shipmentCalendarData=null,a.shipmentCalendarSelectedDate=null,_();const{fetchShipmentCalendar:d}=await q(async()=>{const{fetchShipmentCalendar:m}=await Promise.resolve().then(()=>N);return{fetchShipmentCalendar:m}},void 0);a.shipmentCalendarData=await d(r),_()})}),e.querySelectorAll("[data-sc-date]").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.scDate;r&&(a.shipmentCalendarSelectedDate=a.shipmentCalendarSelectedDate===r?null:r,_())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(o=>{o.addEventListener("click",async()=>{a.calendarYearMonth=o.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:r}=await q(async()=>{const{fetchCalendarEvents:d}=await Promise.resolve().then(()=>N);return{fetchCalendarEvents:d}},void 0);a.calendarEvents=await r(a.calendarYearMonth),_()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async o=>{a.calendarYearMonth=o.target.value;const{fetchCalendarEvents:r}=await q(async()=>{const{fetchCalendarEvents:d}=await Promise.resolve().then(()=>N);return{fetchCalendarEvents:d}},void 0);a.calendarEvents=await r(a.calendarYearMonth),_()}),e.querySelector("#cal-filter-category")?.addEventListener("change",o=>{a.calendarFilterCategory=o.target.value,_()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const o=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(o.getTime()+3600*1e3).toISOString(),isAllDay:!1}},_()}),e.querySelectorAll("[data-cal-date]").forEach(o=>{o.tagName!=="BUTTON"&&o.addEventListener("click",r=>{if(r.target.closest(".cal-event"))return;const d=o.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${d}T10:00:00`,isAllDay:!1}},_()})}),e.querySelectorAll("[data-cal-event-id]").forEach(o=>{o.addEventListener("click",r=>{r.stopPropagation();const d=o.dataset.calEventId,m=a.calendarEvents.find(v=>v.id===d);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},_())})}),e.querySelectorAll("[data-action='cal-close']").forEach(o=>{o.addEventListener("click",r=>{r.currentTarget!==r.target&&!r.target.matches("button")||(a.calendarEdit=null,_())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:o,fetchCalendarEvents:r,CALENDAR_CATEGORY_COLORS:d}=await q(async()=>{const{saveCalendarEvent:x,fetchCalendarEvents:k,CALENDAR_CATEGORY_COLORS:E}=await Promise.resolve().then(()=>N);return{saveCalendarEvent:x,fetchCalendarEvents:k,CALENDAR_CATEGORY_COLORS:E}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,v=e.querySelector("#cal-category")?.value??"general",$={id:m,title:e.querySelector("#cal-title")?.value??"",category:v,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:d[v]};if(!$.title){T("タイトルは必須です","warning");return}await o($)?(a.calendarEvents=await r(a.calendarYearMonth),a.calendarEdit=null,T("保存しました"),_()):T("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!o||!await we("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:r,fetchCalendarEvents:d}=await q(async()=>{const{deleteCalendarEvent:v,fetchCalendarEvents:$}=await Promise.resolve().then(()=>N);return{deleteCalendarEvent:v,fetchCalendarEvents:$}},void 0);await r(o)?(a.calendarEvents=await d(a.calendarYearMonth),a.calendarEdit=null,T("削除しました"),_()):T("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,_();try{const o=a.importPreview.rows.filter(d=>d._valid),r=await Ns(a.importEntity,o);a.importResult=`取り込み完了: ${r.inserted}件成功 / ${r.failed}件失敗`,a.importPreview=null}catch(o){a.importResult=`エラー: ${o instanceof Error?o.message:String(o)}`}finally{a.importing=!1,_()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const o=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=o,a.storeSales=[],a.actionLoading=!0,_(),Ia(o).then(r=>{a.storeSales=r,a.actionLoading=!1,_()})}),e.querySelectorAll("[data-action='copy-config']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.configValue??"";if(r)try{await navigator.clipboard.writeText(r),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(d){console.warn("Clipboard copy failed",d)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const r=JSON.stringify({supabase_url:he,supabase_anon_key:te,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),d=new Blob([r],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(d),v=document.createElement("a");v.href=m,v.download="relay_config.json",v.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.code??"";if(r)try{await navigator.clipboard.writeText(decodeURIComponent(r)),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(d){console.warn("Clipboard code copy failed",d)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(o=>{o.addEventListener("change",()=>{Be(e),a.emailSaveMessage=null,_()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(o=>{o.addEventListener("change",()=>{Be(e),a.emailSaveMessage=null,_()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{Be(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{Be(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(o=>{o.addEventListener("click",()=>{a.emailTemplateId=o.dataset.templateId??"custom";const r=zs(a.emailTemplateId);a.emailSubject=r.subject,a.emailBody=r.body,a.emailSaveMessage=null,_()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{Be(e);const o=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${o}`),a.emailSaveMessage=null,_()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{Be(e),a.actionLoading=!0,_(),Ct(sa("draft")).then(o=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(o.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,_()})}),e.querySelector("#email-sender")?.addEventListener("change",o=>{a.emailSenderId=o.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{Be(e),a.actionLoading=!0,a.emailSending=!0,_();const o=sa("sent");a.mailSenders.find(r=>r.id===a.emailSenderId),os().then(async r=>{await Ct({...o,recipientCount:r.sent}),a.emailSaveMessage=`${r.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,_(),T(`${r.sent}件送信完了`)}).catch(async()=>{await Ct(sa("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,_(),T("APIキー未設定のため下書き保存しました","warning")})})}function _(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=dp()}catch(n){console.error("[renderApp] render error:",n),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(n)}

${n?.stack??""}</div>`;return}yp(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),Va()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const n of["fd-scaler","print-scaler","q-preview-scaler"]){const s=e.querySelector(`#${n}`),i=s?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),l=i?.querySelector(".print-page")??i;if(!s||!l)continue;const c=s.parentElement?.clientWidth??0,p=l.offsetWidth;if(c>0&&p>0&&p>c-24){const u=(c-24)/p;s.style.transform=`scale(${u})`,s.style.transformOrigin="top left",s.style.height=`${(l.offsetHeight+48)*u}px`}else s.style.transform="",s.style.height=""}});const t=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=t?"hidden":"",document.body.style.touchAction=t?"none":""}const Qs="sake-cloud-cache",hp=300*1e3;function fp(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(Qs,JSON.stringify(e))}catch{}}function gp(){try{const e=localStorage.getItem(Qs);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>hp?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let Hs=0;async function Xe(){const e=gp();e&&(a.loading=!1,_()),a.loading=!e,e||_();try{const[t,n,s,i,l,c,p,u,y]=await Promise.all([Nn(),On(),Pa(),Mn(),ht(a.invoiceFilter),Ea(a.ledgerCustomerCode),Aa(),Rn(),Tn("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=s,a.pipelineMeta=i,a.invoiceRecords=l,a.customerLedger=c,a.salesAnalytics=p,a.syncDashboard=u,y){const g={...Dt,...pa(),...y};a.quoteCompanySettings=g,Ve(g)}if(Fn().then(g=>{a.announcements=g,_()}),Ke.length===0&&Qd(),a.rawTableList.length===0&&us().then(g=>{a.rawTableList=g,a.route==="/raw-browser"&&_()}),!a.salesFilter.startDate||!a.salesFilter.endDate){const f=[...t.salesRecords].sort((P,o)=>new Date(o.date).getTime()-new Date(P.date).getTime())[0]?.date??new Date().toISOString(),b=new Date(f),S=new Date(b);S.setDate(b.getDate()-30),a.salesFilter={startDate:En(S.toISOString()),endDate:En(b.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await ht(a.invoiceFilter)),a.error=null,fp()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,_(),Ya(a.route),Hs=Date.now()}}window.addEventListener("popstate",()=>{a.route=Bs(location.pathname),a.currentCategory=Fa(a.route),a.sidebarOpen=!1,ft(),Ya(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,_();return}if(e.key==="Escape"){if(a.globalSearchOpen){ft(),_();return}if(a.pickerMode){Rt(),_();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Fs(),_());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&Ys(t)}});a.user=jt()?to():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await q(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>N);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),_()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,s=0,i=0,l=0,c=1;document.addEventListener("mousedown",p=>{const u=p.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;p.preventDefault();const y=u.closest(".fd-canvas");if(!y)return;const g=y.getBoundingClientRect();if(g.width===0)return;c=228.6/g.width,t=u,n=p.clientX,s=p.clientY,i=parseFloat(u.style.left)||0,l=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(P=>P.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const f=document.querySelector("#fd-selected-info");f&&(f.textContent=`選択中: ${u.title}`);const b=document.querySelector("#fd-sel-x"),S=document.querySelector("#fd-sel-y");b&&(b.value=String(i)),S&&(S.value=String(l))}),document.addEventListener("mousemove",p=>{if(!t)return;const u=(p.clientX-n)*c,y=(p.clientY-s)*c,g=Math.round((i+u)*2)/2,f=Math.round((l+y)*2)/2;t.style.left=g+"mm",t.style.top=f+"mm";const b=document.querySelector("#fd-sel-x"),S=document.querySelector("#fd-sel-y");b&&(b.value=String(g)),S&&(S.value=String(f))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",p=>{if(!a.fdDesignMode||!a.fdActiveFieldId||p.key!=="ArrowLeft"&&p.key!=="ArrowRight"&&p.key!=="ArrowUp"&&p.key!=="ArrowDown"||p.target.tagName==="INPUT"||p.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;p.preventDefault();const y=.5;let g=parseFloat(u.style.left)||0,f=parseFloat(u.style.top)||0;p.key==="ArrowLeft"?g-=y:p.key==="ArrowRight"?g+=y:p.key==="ArrowUp"?f-=y:p.key==="ArrowDown"&&(f+=y),u.style.left=g+"mm",u.style.top=f+"mm";const b=document.querySelector("#fd-sel-x"),S=document.querySelector("#fd-sel-y");b&&(b.value=String(g)),S&&(S.value=String(f))})})();Xe();const vp=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&Xe()},vp);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-Hs>60*1e3&&Xe()});let $a="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{$a=e}).catch(()=>{});setInterval(async()=>{if(!(!$a||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==$a&&!a.updateAvailable&&(a.updateAvailable=!0,_())}catch{}},120*1e3);export{q as _};
