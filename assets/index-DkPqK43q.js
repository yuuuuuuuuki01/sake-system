(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const yo="modulepreload",ho=function(e){return"/"+e},sn={},q=function(t,n,o){let i=Promise.resolve();if(n&&n.length>0){let u=function(y){return Promise.all(y.map(v=>Promise.resolve(v).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),p=c?.nonce||c?.getAttribute("nonce");i=u(n.map(y=>{if(y=ho(y),y in sn)return;sn[y]=!0;const v=y.endsWith(".css"),f=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${f}`))return;const x=document.createElement("link");if(x.rel=v?"stylesheet":yo,v||(x.as="script"),x.crossOrigin="",x.href=y,p&&x.setAttribute("nonce",p),document.head.appendChild(x),v)return new Promise((A,C)=>{x.addEventListener("load",A),x.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${y}`)))})}))}function l(c){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=c,window.dispatchEvent(p),!p.defaultPrevented)throw c}return i.then(c=>{for(const p of c||[])p.status==="rejected"&&l(p.reason);return t().catch(l)})},we="https://ridspyczkxwkcbmwndhm.supabase.co",go="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHNweWN6a3h3a2NibXduZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzkwODAsImV4cCI6MjA5MzUxNTA4MH0.ppWbfEsrUdUL8sRPO3BPHWA-r12ueMgJ3C44n1FvK3o",ie=go;async function Le(e,t){try{const n=new URL(`/rest/v1/${e}`,we),o=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function Ta(e,t){try{const n=new URL(`/rest/v1/${e}`,we),o=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function lt(e,t,n){try{const o=new URL(`/rest/v1/${e}?id=eq.${t}`,we);return(await fetch(o.toString(),{method:"PATCH",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function he(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,we),o=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function Ma(e){try{const t=new URL(`/rest/v1/${e}`,we);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const o=n.headers.get("Content-Range");if(o){const i=o.match(/\/(\d+)/);if(i)return parseInt(i[1],10)}return 0}catch{return 0}}async function V(e,t={}){try{const n=new URL(`/rest/v1/${e}`,we);Object.entries(t).forEach(([i,l])=>{n.searchParams.set(i,l)});const o=await fetch(n.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"return=representation"}});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function Vn(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,we);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}})).ok}catch{return!1}}async function Se(e,t={},n=1e3){const o=[];let i=0;try{for(;;){const l=new URL(`/rest/v1/${e}`,we);Object.entries(t).forEach(([u,y])=>{l.searchParams.set(u,y)}),l.searchParams.set("limit",String(n)),l.searchParams.set("offset",String(i));const c=await fetch(l.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"return=representation"}});if(!c.ok)throw new Error(`HTTP ${c.status}`);const p=await c.json();if(o.push(...p),p.length<n)break;i+=n}return o}catch(l){return console.warn(`Failed to query all rows from Supabase table ${e}`,l),o.length>0?o:[]}}const Z=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:ie,SUPABASE_URL:we,supabaseCount:Ma,supabaseDelete:Vn,supabaseInsert:Le,supabaseQuery:V,supabaseQueryAll:Se,supabaseRpc:he,supabaseUpdate:lt,supabaseUpsert:Ta},Symbol.toStringTag,{value:"Module"})),Na="sake_auth";function Yn(e){localStorage.setItem(Na,JSON.stringify(e))}function Un(){return{apikey:ie,"Content-Type":"application/json"}}function fo(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),o=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(o))}catch{return null}}async function Jn(e,t){const n=await fetch(`${we}/auth/v1/${e}`,{method:"POST",headers:Un(),body:JSON.stringify(t)}),o=await n.json().catch(()=>({}));if(!n.ok)throw new Error(o.error_description??o.msg??`HTTP ${n.status}`);return o}async function vo(e,t){const n=await Jn("token?grant_type=password",{email:e,password:t});return Yn({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function on(e,t){const n=await Jn("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&Yn({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function bo(){const e=Xt();if(localStorage.removeItem(Na),!!e?.access_token)try{await fetch(`${we}/auth/v1/logout`,{method:"POST",headers:{...Un(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function Xt(){const e=localStorage.getItem(Na);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function wo(){const e=Xt();if(!e)return null;const t=fo(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function xo(e){const t=Xt();if(!t)throw new Error("not signed in");const n=await fetch(`${we}/auth/v1/user`,{method:"PUT",headers:{apikey:ie,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const o=await n.json().catch(()=>({}));throw new Error(o.msg??`HTTP ${n.status}`)}}const Ra={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},Qn={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},$o={generatedAt:new Date().toISOString(),records:[]},Ve={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},_o={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},So={},ko={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function ne(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function Po(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Eo(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function g(e,t,n=""){for(const o of t){const i=e[o];if(typeof i=="string"&&i.length>0)return i}return n}function D(e,t,n=0){for(const o of t)if(o in e)return ne(e[o]);return n}function fe(e,t,n=!0){for(const o of t)if(o in e)return Eo(e[o]);return n}function ge(e,t,n){for(const o of t){const i=e[o];if(typeof i!="string"||i.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(i))return new Date(`${i}T00:00:00Z`).toISOString();const l=new Date(i);if(!Number.isNaN(l.getTime()))return l.toISOString()}return n}function Lo(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:ge(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:ne(e.total_amount??e.billed_amount)}}function rn(e){const t=e.trim().toUpperCase(),n=So[t];if(n)return n;const o=Qn.salesRecords.find(i=>i.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:o?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function Hn(e){try{return(await V("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function nt(e,t){await Ta("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function Kn(){const e=new Date;e.setFullYear(e.getFullYear()-1);const t=e.toISOString().slice(0,10),n=await V("daily_sales_fact",{select:"sales_date,sales_amount,total_quantity,document_count",order:"sales_date.desc",sales_date:`gte.${t}`,limit:"400"}),o=new Map;for(const l of n){const c=String(l.sales_date??"");if(!c)continue;const p=o.get(c)??{amount:0,qty:0,docs:0};p.amount+=ne(l.sales_amount),p.qty+=ne(l.total_quantity),p.docs+=ne(l.document_count),o.set(c,p)}const i=Array.from(o.entries()).map(([l,c])=>({sales_date:l,sales_amount:c.amount,amount:c.amount,document_count:c.docs,bottles:c.qty,volume_ml:0,price_per_bottle:c.qty>0?Math.round(c.amount/c.qty):0,price_per_liter:0})).sort((l,c)=>c.sales_date.localeCompare(l.sales_date));if(i.length>0){const[l,c]=await Promise.all([V("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),V("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),u=new Date().toISOString().slice(0,10),y=u.slice(0,7),v=[...i].sort((s,r)=>s.sales_date.localeCompare(r.sales_date)).map(s=>({date:new Date(`${s.sales_date}T00:00:00Z`).toISOString(),amount:ne(s.amount??s.sales_amount),bottles:ne(s.bottles),volumeMl:ne(s.volume_ml),pricePerBottle:ne(s.price_per_bottle),pricePerLiter:ne(s.price_per_liter)})),f=v.slice(-30),x=s=>ne(s.amount??s.sales_amount),A=i.reduce((s,r)=>r.sales_date===u?s+x(r):s,0),C=i.reduce((s,r)=>r.sales_date.startsWith(y)?s+x(r):s,0),M=l.filter(s=>ne(s.balance_amount)>0),L=c.map((s,r)=>({id:String(s.id??`sale-${r+1}`),documentNo:s.document_no??s.legacy_document_no??"",date:s.sales_date??"",customerCode:s.legacy_customer_code??"",customerName:s.customer_name??s.legacy_customer_code??"",amount:ne(s.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:A,todayDelta:0,monthSales:C,monthDelta:0,unpaidCount:M.length,unpaidAmount:M.reduce((s,r)=>s+ne(r.balance_amount),0)},dailySales:f,allDailySales:v,salesRecords:L}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),Qn}async function Gn(){const e=await V("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status",limit:"1000"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const o=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${o}-${n+1}`,customerCode:o,customerName:o,billedAmount:ne(t.billed_amount),paymentAmount:ne(t.paid_amount),balanceAmount:ne(t.balance_amount),lastPaymentDate:null,status:Po(t.payment_status)}})}:$o}async function Oa(){const[e,t]=await Promise.all([V("customers",{limit:"1000"}),V("products",{limit:"1000"})]);if(e.length>0||t.length>0){const n=e.length?e.map((i,l)=>{const c=typeof i.memo=="string"?JSON.parse(i.memo||"{}"):i.memo??{};return{id:g(i,["id","customer_id","code"],`customer-${l+1}`),code:g(i,["code","customer_code","legacy_customer_code"],`C${String(l+1).padStart(4,"0")}`),name:g(i,["name","customer_name","display_name"],`Customer ${l+1}`),kanaName:g(i,["kana_name"],""),shortName:g(i,["short_name"],""),postalCode:g(i,["postal_code"],""),address1:g(i,["address1"],""),address2:g(i,["address2"],""),phone:g(i,["phone"],""),fax:g(i,["fax"],""),email:g(i,["email"],""),staffCode:g(i,["staff_code"],""),businessType:g(i,["business_type"],""),areaCode:g(i,["delivery_area_code"],""),salesCategory:String(c.sales_category??""),closingDay:D(i,["closing_day","close_day"],31),paymentDay:D(i,["payment_day","due_day"],15),paymentMonth:Number(c.payment_month??0),paymentCycle:g(i,["payment_cycle"],""),billingCycleType:g(i,["billing_cycle_type"],""),billingCode:String(c.billing_code??""),creditLimit:D(i,["credit_limit"],0),taxMode:g(i,["tax_mode"],""),taxRound:String(c.tax_round??""),invoiceIssue:String(c.invoice_issue??""),invoiceType:g(i,["invoice_type"],""),priceGroup:String(c.price_group??""),priceType:String(c.price_type??""),tradeType:(()=>{const p=g(i,["trade_type"],"");if(p)return p;const u=String(c.price_type??"");return u==="000"?"B2B2C":u==="001"?"B2C":"B2B"})(),customerGroup1:String(c.customer_group1??""),customerGroup2:String(c.customer_group2??""),bankName:g(i,["bank_name"],""),bankBranch:g(i,["bank_branch"],""),bankAccount:g(i,["bank_account"],""),isActive:fe(i,["is_active","active","enabled"],!0),lat:i.lat?Number(i.lat):void 0,lng:i.lng?Number(i.lng):void 0}}):Ve.customers,o=t.length?t.map((i,l)=>({id:g(i,["id","product_id","product_code","legacy_product_code"],`product-${l+1}`),code:g(i,["product_code","legacy_product_code","code"],`P${String(l+1).padStart(5,"0")}`),janCode:g(i,["jan_code","jan","barcode"],""),name:g(i,["name","product_name","display_name"],`Product ${l+1}`),kanaName:g(i,["kana_name"],""),shortName:g(i,["short_name"],""),category:g(i,["category_code","category","category_name"],"未分類"),taxCategoryCode:g(i,["tax_code","tax_category_code"],""),isActive:fe(i,["is_active","active","enabled"],!0),listPrice:D(i,["list_price"],0),purchasePrice:D(i,["purchase_price"],0),salePrice:D(i,["default_sale_price","sale_price"],0),costPrice:D(i,["default_cost_price"],0),alcoholDegree:i.alcohol_degree!=null?Number(i.alcohol_degree):null,volumeMl:i.volume_ml!=null?Number(i.volume_ml):null,unit:g(i,["unit_name","unit"],"本"),caseQty:i.case_qty!=null?Number(i.case_qty):null,bottleType:g(i,["bottle_type"],""),containerCode:g(i,["container_code"],""),polishRate:i.polish_rate!=null?Number(i.polish_rate):null,riceType:g(i,["rice_type"],""),season:g(i,["season"],""),agingYears:D(i,["aging_years"],0)})):Ve.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||Ve.summary.customerCount,activeCustomerCount:e.length?n.filter(i=>i.isActive).length:Ve.summary.activeCustomerCount,productCount:t.length||Ve.summary.productCount,activeProductCount:t.length?o.filter(i=>i.isActive).length:Ve.summary.activeProductCount},customers:n,products:o}}return Ve}async function Wn(){const[e,t]=await Promise.all([V("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),V("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?ge(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const o=e[0],i=g(o,["status"],"success"),l=o.errors,c=Array.isArray(l)?l.length>0:!!l;return{generatedAt:new Date().toISOString(),lastSyncAt:ge(o,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:c?"warning":i==="error"?"error":"success",jobName:g(o,["agent_hostname"],"sake-relay"),message:`${D(o,["rows_upserted"],0)}行同期 / ${D(o,["files_updated"],0)}ファイル更新`}}return{..._o,lastDataAt:n}}async function Xn(){const e=await he("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function St(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];e.customerCode.trim()&&n.push(`customer_code.ilike.*${e.customerCode.trim()}*`,`legacy_customer_code.ilike.*${e.customerCode.trim()}*`),e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const o=await V("sales_document_headers",t);return o.length>0?o.map((i,l)=>({id:g(i,["id"],`invoice-${l}`),documentNo:g(i,["document_no","legacy_document_no"],""),date:ge(i,["sales_date"],""),customerCode:g(i,["legacy_customer_code","customer_code"],""),customerName:g(i,["customer_name","legacy_customer_code"],""),itemCount:D(i,["line_count"],0),amount:D(i,["total_amount","billed_amount"],0)})):[]}async function Zn(e){return(await V("sales_document_lines",{select:"line_no,legacy_product_code,product_name,quantity,unit_price,amount",or:`document_no.eq.${e},legacy_document_no.eq.${e}`,order:"line_no",limit:"100"})).map(n=>({lineNo:D(n,["line_no"],0),productCode:g(n,["legacy_product_code"],""),productName:g(n,["product_name"],""),quantity:D(n,["quantity"],0),unitPrice:D(n,["unit_price"],0),amount:D(n,["amount"],0)}))}async function Ba(e){const t=e.trim().toUpperCase();if(!t)return rn("");const[n,o,i]=await Promise.all([V("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),V("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),V("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||o.length>0){const l=n.map((u,y)=>{const v=Lo(u,y);return{id:v.id,date:v.date,documentNo:v.documentNo,amount:v.amount}}),c=o.map((u,y)=>({id:String(u.id??`payment-${y+1}`),date:ge(u,["payment_date","received_date"],new Date().toISOString()),amount:ne(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),p=i.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:ne(p?.balance_amount),salesTotal:l.reduce((u,y)=>u+y.amount,0),paymentTotal:c.reduce((u,y)=>u+y.amount,0),salesHistory:l,paymentHistory:c}}return rn(t)}async function ja(){const[e,t,n,o]=await Promise.all([V("mv_monthly_sales",{order:"month.asc"}),V("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),V("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),V("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(i=>({month:g(i,["month"],""),amount:D(i,["amount"],0),quantity:D(i,["quantity"],0),volumeMl:D(i,["volume_ml"],0)})),productTotals:n.map(i=>({code:g(i,["code"],""),name:g(i,["name"],""),amount:D(i,["amount"],0),quantity:D(i,["quantity"],0),documents:D(i,["documents"],0),volumeMl:D(i,["volume_ml"],0)})),customerTotals:t.map(i=>({code:g(i,["code"],""),name:g(i,["name"],""),amount:D(i,["amount"],0),quantity:D(i,["quantity"],0),documents:D(i,["documents"],0),volumeMl:D(i,["volume_ml"],0)})),staffTotals:o.map(i=>({code:g(i,["code"],""),name:g(i,["name"],""),amount:D(i,["amount"],0),quantity:D(i,["quantity"],0),documents:D(i,["documents"],0),volumeMl:0}))}:ko}async function Ao(e,t,n){if(t==="all")return[];const o=n?es(t,n):null,l=await he(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:o?.from??null,p_date_to:o?.to??null});return l?l.map(c=>({code:g(c,["code"],""),name:g(c,["name"],""),amount:D(c,["amount"],0),quantity:D(c,["quantity"],0),documents:D(c,["documents"],0),volumeMl:D(c,["volume_ml"],0)})):[]}async function Co(e,t){if(t==="all")return[];const n=await he("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(o=>o.period_val).filter(Boolean)}function es(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,o]=t.split("-").map(Number),i=`${n}-${String(o).padStart(2,"0")}-01`,l=new Date(n,o,0).getDate(),c=`${n}-${String(o).padStart(2,"0")}-${String(l).padStart(2,"0")}`;return{from:i,to:c}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const o=parseInt(n[1]),i=parseInt(n[2]),l=new Date(o,0,4),c=l.getDay()||7,p=new Date(l);p.setDate(l.getDate()-c+1);const u=new Date(p);u.setDate(p.getDate()+(i-1)*7);const y=new Date(u);return y.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:y.toISOString().slice(0,10)}}return null}function ts(e){return e.map(t=>({staffCode:g(t,["staff_code"],""),staffName:g(t,["staff_name"],""),code:g(t,["code"],""),name:g(t,["name"],""),tag:g(t,["tag"],""),amount:D(t,["amount"],0),quantity:D(t,["quantity"],0),documents:D(t,["documents"],0)}))}async function Do(e,t){const n=await he("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(o=>({code:g(o,["code"],""),name:g(o,["name"],""),amount:D(o,["amount"],0),quantity:D(o,["quantity"],0),documents:D(o,["documents"],0)})):[]}async function qo(e,t,n){const o=await he("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?ts(o):[]}async function Io(e,t,n){const o=await he("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?ts(o):[]}async function To(e,t){if(e==="all"||!t)return[];const n=await he("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(o=>({month:g(o,["label"],""),amount:D(o,["amount"],0),quantity:D(o,["quantity"],0),volumeMl:D(o,["volume_ml"],0)})):[]}function Mo(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function No(e,t,n){const o=await he("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(i=>({code:g(i,["code"],""),name:g(i,["name"],""),tag:g(i,["tag"],""),amount:D(i,["amount"],0),quantity:D(i,["quantity"],0),documents:D(i,["documents"],0),volumeMl:D(i,["volume_ml"],0)})):[]}async function Ro(e,t,n){const o=await he("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(i=>({code:g(i,["code"],""),name:g(i,["name"],""),tag:g(i,["tag"],""),amount:D(i,["amount"],0),quantity:D(i,["quantity"],0),documents:D(i,["documents"],0),volumeMl:D(i,["volume_ml"],0)})):[]}async function Oo(e,t){const n=await he("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(o=>({month:g(o,["month"],""),amount:D(o,["amount"],0),quantity:D(o,["quantity"],0),volumeMl:D(o,["volume_ml"],0)})):[]}async function Bo(e,t){const n=await he("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({brewCategory:g(o,["brew_category"],""),subCategory:g(o,["sub_category"],""),productCount:D(o,["product_count"],0),totalShipmentQty:D(o,["total_shipment_qty"],0),totalShipmentMl:D(o,["total_shipment_ml"],0),monthlyAvgQty:D(o,["monthly_avg_qty"],0),monthlyAvgMl:D(o,["monthly_avg_ml"],0),currentStockL:D(o,["current_stock_l"],0),monthsRemaining:D(o,["months_remaining"],0),costPerL:D(o,["cost_per_l"],0)})):[]}async function jo(e,t){const n=await he("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({month:g(o,["month"],""),brewCategory:g(o,["brew_category"],""),shipmentMl:D(o,["shipment_ml"],0)})):[]}async function zo(e,t){const n=await he("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({brewCategory:g(o,["brew_category"],""),subCategory:g(o,["sub_category"],""),productCode:g(o,["product_code"],""),productName:g(o,["product_name"],""),volumeMl:D(o,["volume_ml"],0),annualQty:D(o,["annual_qty"],0),annualMl:D(o,["annual_ml"],0),monthlyAvgQty:D(o,["monthly_avg_qty"],0),monthlyAvgMl:D(o,["monthly_avg_ml"],0)})):[]}async function Fo(e){return(await V("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:g(n,["id"],""),brewCategory:g(n,["brew_category"],""),fy:D(n,["fy"],e),brewMonth:D(n,["brew_month"],0),durationMonths:D(n,["duration_months"],2),plannedVolumeL:D(n,["planned_volume_l"],0),notes:g(n,["notes"],"")}))}async function Vo(e,t,n){return await he("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(i=>({brew_month:i.brewMonth,duration_months:i.durationMonths,planned_volume_l:i.plannedVolumeL,notes:i.notes??null}))})!==null}async function Yo(e,t,n,o){return await Ta("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:o??null,updated_at:new Date().toISOString()})!==null}async function Uo(){const e=await V("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const o=g(n,["category_name"],""),i=g(n,["production_type_name"],"");!o||!i||(t[o]||(t[o]=[]),t[o].push(i))}return t}async function Jo(e,t){return await he("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function Qo(e,t){return await he("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function Ho(){const e=await V("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>g(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function Ko(){const e=await V("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const o=g(n,["brew_category"],"");o&&(t[o]={brewCategory:o,rawAlcoholPct:D(n,["raw_alcohol_pct"],18),targetAlcoholPct:D(n,["target_alcohol_pct"],15)})}return t}async function Go(e,t,n){const{SUPABASE_URL:o,SUPABASE_ANON_KEY:i}=await q(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}},void 0);return i?(await fetch(`${o}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:i,Authorization:`Bearer ${i}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function Wo(){const e=await he("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:D(t,["fy"],0),brewCategory:g(t,["brew_category"],""),shipmentL:D(t,["shipment_l"],0),monthsElapsed:D(t,["months_elapsed"],12),annualizedL:D(t,["annualized_l"],0)})):[]}async function Xo(){const e=await V("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const o=g(n,["brew_category"],""),i=D(n,["growth_rate"],NaN);o&&!isNaN(i)&&(t[o]=i)}return t}async function Zo(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return o?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function er(){const e=await V("brewing_rice_params",{}),t={};for(const n of e??[]){const o=g(n,["brew_category"],"");o&&(t[o]={brewCategory:o,polishingRatio:D(n,["polishing_ratio"],.7),ricePerLiterKg:D(n,["rice_per_liter_kg"],.5),kojiRatio:D(n,["koji_ratio"],.3),kojiVariety:g(n,["koji_variety"],"山田錦"),kojiPricePerKg:D(n,["koji_price_per_kg"],600),kakeVariety:g(n,["kake_variety"],"一般米"),kakePricePerKg:D(n,["kake_price_per_kg"],350),alcoholAdditionRatio:D(n,["alcohol_addition_ratio"],0)})}return t}async function tr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return o?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,koji_ratio:t.kojiRatio,koji_variety:t.kojiVariety,koji_price_per_kg:t.kojiPricePerKg,kake_variety:t.kakeVariety,kake_price_per_kg:t.kakePricePerKg,alcohol_addition_ratio:t.alcoholAdditionRatio??0,updated_at:new Date().toISOString()})})).ok:!1}async function ar(){const e=await he("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:g(t,["brew_category"],""),monthNum:D(t,["month_num"],0),avgMonthlyL:D(t,["avg_monthly_l"],0)})):[]}async function nr(e){const t=await V("procurement_decisions",{fy:`eq.${e}`}),n={};for(const o of t??[]){const i=g(o,["brew_category"],""),l=D(o,["decided_brewing_l"],-1);i&&l>=0&&(n[i]=l)}return n}async function sr(e,t,n){const{SUPABASE_URL:o,SUPABASE_ANON_KEY:i}=await q(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}},void 0);return i?(await fetch(`${o}/rest/v1/procurement_decisions`,{method:"POST",headers:{apikey:i,Authorization:`Bearer ${i}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,fy:t,decided_brewing_l:n,updated_at:new Date().toISOString()})})).ok:!1}async function or(e){return(await V("brewing_process_batches",{fy:`eq.${e}`,order:"start_date.asc.nullsfirst"})??[]).map(n=>({id:g(n,["id"],""),brewCategory:g(n,["brew_category"],""),batchCode:g(n,["batch_code"],""),fy:D(n,["fy"],e),plannedVolumeL:D(n,["planned_volume_l"],0),tankNo:g(n,["tank_no"],""),status:g(n,["status"],"planned"),startDate:g(n,["start_date"],""),targetEndDate:g(n,["target_end_date"],""),notes:g(n,["notes"],"")}))}async function rr(e){return e.length===0?[]:(await V("brewing_process_steps",{batch_id:`in.(${e.join(",")})`,order:"batch_id.asc,step_order.asc"})??[]).map(n=>({id:g(n,["id"],""),batchId:g(n,["batch_id"],""),stepOrder:D(n,["step_order"],0),stepName:g(n,["step_name"],""),plannedStart:g(n,["planned_start"],""),plannedEnd:g(n,["planned_end"],""),actualStart:g(n,["actual_start"],""),actualEnd:g(n,["actual_end"],""),status:g(n,["status"],"未着手"),temperature:n.temperature!=null?D(n,["temperature"],0):null,notes:g(n,["notes"],"")}))}async function ir(e,t,n,o,i){const l=await Le("brewing_process_batches",{brew_category:e,batch_code:t,fy:n,planned_volume_l:o,start_date:i});if(!l?.id)return null;const c=[{name:"洗米・浸漬",days:1},{name:"蒸米",days:1},{name:"製麹",days:2},{name:"酒母",days:14},{name:"仕込み(添/仲/留)",days:4},{name:"醪管理",days:25},{name:"上槽",days:2},{name:"濾過・火入れ",days:1},{name:"貯蔵",days:30},{name:"瓶詰め",days:1}];let p=new Date(i);for(let u=0;u<c.length;u++){const y=p.toISOString().slice(0,10),v=new Date(p.getTime()+(c[u].days-1)*864e5).toISOString().slice(0,10);await Le("brewing_process_steps",{batch_id:l.id,step_order:u+1,step_name:c[u].name,planned_start:y,planned_end:v}),p=new Date(p.getTime()+c[u].days*864e5)}return await lt("brewing_process_batches",l.id,{target_end_date:p.toISOString().slice(0,10)}),l.id}async function lr(e,t){return lt("brewing_process_steps",e,t)}async function cr(e,t){return lt("brewing_process_batches",e,{...t,updated_at:new Date().toISOString()})}async function dr(e){return(await V("rice_purchase_commitments",{fy:`eq.${e}`,order:"variety_name.asc"})??[]).map(n=>({id:g(n,["id"],""),varietyName:g(n,["variety_name"],""),committedBales:D(n,["committed_bales"],0),pricePerKg:D(n,["price_per_kg"],0),supplier:g(n,["supplier"],""),deliveryMonth:D(n,["delivery_month"],0)||null,fy:D(n,["fy"],e),notes:g(n,["notes"],"")}))}async function pr(e){return await Le("rice_purchase_commitments",{variety_name:e.varietyName,committed_bales:e.committedBales??0,price_per_kg:e.pricePerKg??0,supplier:e.supplier??"",delivery_month:e.deliveryMonth??null,fy:e.fy,notes:e.notes??""})!==null}async function ur(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_purchase_commitments?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function mr(){return(await V("rice_varieties",{order:"sort_order.asc,name.asc"})??[]).map(t=>({id:g(t,["id"],""),name:g(t,["name"],""),defaultPricePerKg:D(t,["default_price_per_kg"],400),region:g(t,["region"],"")}))}async function yr(e,t,n=""){return await Le("rice_varieties",{name:e,default_price_per_kg:t,region:n})!==null}async function hr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_varieties?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function gr(e){return(await V("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:g(n,["id"],""),brewCategory:g(n,["brew_category"],""),label:g(n,["label"],""),volumeL:D(n,["volume_l"],0)}))}async function fr(){return(await V("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:g(t,["id"],""),brewCategory:g(t,["brew_category"],""),label:g(t,["label"],""),volumeL:D(t,["volume_l"],0)}))}async function vr(e,t,n){return await Le("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function br(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return o?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function wr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function xr(){return(await V("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:g(t,["name"],""),parentCategory:g(t,["parent_category"],"")})).filter(t=>t.name)}async function $r(e,t){return await Le("brewing_custom_categories",{name:e,parent_category:t})!==null}async function _r(e){const t=await he("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:g(n,["production_type_name"],""),count:D(n,["product_count"],0)})).filter(n=>n.name):[]}async function Sr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:i}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function kr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await q(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}},void 0);if(!o)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function Pr(){const e=await V("brewing_category_overrides",{}),t={};for(const n of e??[]){const o=g(n,["product_code"],""),i=g(n,["brew_category"],"");o&&i&&(t[o]=i)}return t}async function Er(e){return(await V("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>g(n,["product_code"],"")).filter(Boolean)}async function Lr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await q(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:l}},void 0);if(!o)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}}),t.length===0)return!0;const i=t.map(c=>({year_month:e,product_code:c}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(i)})).ok}catch{return!1}}const wa={sales:"売上",return:"返品",export_return:"輸出戻入"};async function as(e){const t=e.lines.reduce((i,l)=>i+l.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Le("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const ln={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function za(e){const t=await V("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],o=ne(n.total_amount);return{documentNo:e,invoiceDate:g(n,["sales_date","document_date"],""),customerCode:g(n,["legacy_customer_code","customer_code"],""),customerName:g(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:o,taxAmount:Math.floor(o*10/110),note:""}}return{...ln,documentNo:e||ln.documentNo}}const Ar={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function Fa(e){const t=await V("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(i=>{const l=D(i,["sales_amount"],0),c=D(i,["tax_amount"],0);return{customerCode:g(i,["customer_code"],""),customerName:g(i,["customer_name"],""),closingDay:31,salesAmount:l,taxAmount:c,prevBalance:0,paymentAmount:0,billingAmount:l,status:"open"}}),o=n.reduce((i,l)=>i+l.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:o,customers:n}}return{...Ar,targetYearMonth:e}}const Cr={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function Zt(){const[e,t,n]=await Promise.all([V("mv_monthly_sales",{order:"month.asc"}),V("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),V("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return Cr;const o=e.slice(-12).map(u=>g(u,["month"],"")),i=new Map;t.forEach(u=>{const y=g(u,["code"],"");i.has(y)||i.set(y,{name:g(u,["name"],y),monthValues:new Map}),i.get(y).monthValues.set(g(u,["month"],""),D(u,["amount"],0))});const c=Array.from(i.entries()).map(([u,y])=>({code:u,name:y.name,total:o.reduce((v,f)=>v+(y.monthValues.get(f)??0),0),monthValues:y.monthValues})).sort((u,y)=>y.total-u.total).slice(0,10).map(u=>({label:u.name,values:o.map(y=>u.monthValues.get(y)??0)})),p=n.map(u=>({label:g(u,["name"],""),values:o.map(()=>Math.round(D(u,["amount"],0)/o.length))}));return{generatedAt:new Date().toISOString(),months:o,salesByProduct:c,salesByCustomer:p,costSimulation:[]}}async function Dr(){const e=await Se("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const o=g(n,["code"],"");if(!o)return;const i=g(n,["month"],""),l=parseInt(i.slice(5,7))-1;if(l<0||l>11)return;let c=t.get(o);c||(c={name:g(n,["name"],o),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(o,c)),c.qty[l]+=D(n,["quantity"],0),c.amt[l]+=D(n,["amount"],0)}),Array.from(t.entries()).map(([n,o])=>({code:n,name:o.name,monthlyQuantity:o.qty,monthlyAmount:o.amt,totalQuantity:o.qty.reduce((i,l)=>i+l,0),totalAmount:o.amt.reduce((i,l)=>i+l,0)})).filter(n=>n.totalQuantity>0).sort((n,o)=>o.totalAmount-n.totalAmount)}async function qr(){return(await V("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:g(t,["product_code"],""),productName:g(t,["product_name"],""),forecastMonth:g(t,["forecast_month"],""),segment:g(t,["segment"],"monthly"),avgMonthly:D(t,["avg_monthly"],0),forecastQuantity:D(t,["forecast_quantity"],0),forecastAmount:D(t,["forecast_amount"],0),safetyStock:D(t,["safety_stock"],0),calculatedAt:ge(t,["calculated_at"],"")}))}async function Ir(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await Se("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(c=>String(c.id)).filter(Boolean);const o=await Se("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),i=new Map;n.forEach(c=>{c.id&&i.set(String(c.id),c)});const l=[];return o.forEach(c=>{const p=String(c.header_id??c.document_header_id??""),u=i.get(p);if(!u)return;const y=u.sales_date??u.document_date??"";!y||y<t||l.push({date:y.slice(0,10),customerName:u.customer_name??"不明",productName:c.product_name??"不明",quantity:ne(c.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),l.sort((c,p)=>c.date.localeCompare(p.date))}async function Tr(){const e=new Date().toISOString();return(await V("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:g(n,["id"],""),message:g(n,["message"],""),level:g(n,["level"],"info"),startsAt:ge(n,["starts_at"],""),endsAt:n.ends_at?ge(n,["ends_at"],""):null,dismissible:fe(n,["dismissible"],!0)}))}async function Mr(){const e=await Se("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:g(t,["customer_code"],""),customer_name:g(t,["customer_name"],""),business_type:g(t,["business_type"],""),area_code:g(t,["area_code"],""),phone:g(t,["phone"],""),last_order_date:g(t,["last_order_date"],""),days_since_order:D(t,["days_since_order"],0),amount_12m:D(t,["amount_12m"],0),amount_3m:D(t,["amount_3m"],0),amount_this_month:D(t,["amount_this_month"],0),amount_last_year_same_month:D(t,["amount_last_year_same_month"],0),annual_revenue:D(t,["annual_revenue"],0),is_dormant:fe(t,["is_dormant"],!1),is_at_risk:fe(t,["is_at_risk"],!1)})):[]}async function Nr(){return(await Se("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:g(t,["customer_code"],""),customer_name:g(t,["customer_name"],""),phone:g(t,["phone"],""),address:g(t,["address"],""),area_code:g(t,["area_code"],""),business_type:g(t,["business_type"],""),priority_score:D(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:g(t,["last_order_date"],""),days_since_order:D(t,["days_since_order"],0),annual_revenue:D(t,["annual_revenue"],0),recommended_action:g(t,["recommended_action"],"")}))}async function Rr(){return(await Se("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:g(t,["product_code"],""),product_name:g(t,["product_name"],""),season_type:g(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:D(t,["avg_monthly_qty"],0)}))}async function Or(){return(await Se("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:g(t,["product_code"],""),name:g(t,["product_name"],""),monthlyQuantity:[D(t,["m01"],0),D(t,["m02"],0),D(t,["m03"],0),D(t,["m04"],0),D(t,["m05"],0),D(t,["m06"],0),D(t,["m07"],0),D(t,["m08"],0),D(t,["m09"],0),D(t,["m10"],0),D(t,["m11"],0),D(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:D(t,["total_quantity"],0),totalAmount:D(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function ns(e,t,n){try{return await Le("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function ss(e,t){return lt("customers",e,t)}async function os(e,t){return lt("products",e,t)}async function xa(e,t){const n=e.find(c=>c.code===t);n?.priceGroup;const o=n?.priceGroup||t;let i="";try{const c=await V("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});c[0]?.memo&&(i=(typeof c[0].memo=="string"?JSON.parse(c[0].memo):c[0].memo)?.price_type??"")}catch{}const l=new Map;if(o){const c=await V("customer_product_prices",{price_group:`eq.${o}`,select:"legacy_product_code,special_price"});for(const p of c)l.set(p.legacy_product_code,p.special_price)}return{priceType:i,priceGroup:o,individualPrices:l}}function Va(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function rs(){return(await V("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function Br(){return(await Se("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function jr(){return(await V("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function wt(e,t="billing"){const n=await he("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t});return n?n.map(o=>({code:String(o.legacy_customer_code??""),name:String(o.customer_name??""),address:String(o.address1??""),yearAmount:Number(o.year_amount??0),sharePct:Number(o.share_pct??0),orderDays:Number(o.order_days??0),prevAmount:Number(o.prev_amount??0),growthRate:o.growth_rate!=null?Number(o.growth_rate):null,currentRank:String(o.current_rank??"C"),prevRank:String(o.prev_rank??"")})):[]}async function is(){const[e,t]=await Promise.all([V("mv_customer_abc",{order:"amount.desc"}),Zt()]),n=e.map(o=>({code:g(o,["code"],""),name:g(o,["name"],""),amount:D(o,["amount"],0),documents:D(o,["documents"],0),ratio:D(o,["ratio"],0),cumRatio:D(o,["cum_ratio"],0),abcRank:g(o,["abc_rank"],"C")}));return{generatedAt:new Date().toISOString(),ranking:n,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function zr(){const[e,t]=await Promise.all([V("mv_product_abc",{order:"amount.desc"}),Zt()]),n=e.map(c=>({code:g(c,["code"],""),name:g(c,["name"],""),amount:D(c,["amount"],0),quantity:D(c,["quantity"],0),ratio:D(c,["ratio"],0),cumRatio:D(c,["cum_ratio"],0),abcRank:g(c,["abc_rank"],"C")})),o=n.reduce((c,p)=>c+p.amount,0),i=new Set(n.filter(c=>c.abcRank==="A").map(c=>c.name)),l=t.salesByProduct.filter(c=>i.has(c.label));return{generatedAt:new Date().toISOString(),totalAmount:o,ranking:n,months:t.months,monthlyByProduct:l.length>0?l:t.salesByProduct}}const ls={planned:"計画中",active:"仕込中",done:"完了"};async function cs(){const e=await V("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:g(t,["id"],""),jikomiNo:g(t,["batch_no","legacy_batch_no"],""),productName:g(t,["brand_name"],""),riceType:g(t,["rice_type"],""),plannedKg:D(t,["planned_rice_kg"],0),actualKg:D(t,["actual_rice_kg"],0),startDate:ge(t,["start_date"],""),expectedDoneDate:ge(t,["expected_done_date"],""),status:g(t,["status"],"planned"),tankNo:g(t,["tank_no"],""),note:g(t,["remarks"],"")})):[]}async function ds(){const e=await V("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:g(t,["id"],""),tankNo:g(t,["tank_no"],""),capacity:D(t,["capacity_l"],0),currentVolume:D(t,["current_volume_l"],0),productName:g(t,["current_product_code"],""),jikomiNo:g(t,["current_batch_id"],""),status:g(t,["status"],"empty"),lastUpdated:ge(t,["last_updated_at"],"")})):[]}async function ps(){const e=await V("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:g(t,["id"],""),kenteiNo:g(t,["kentei_no"],""),jikomiNo:g(t,["batch_id"],""),productName:g(t,["product_code"],""),kenteiDate:ge(t,["kentei_date"],""),alcoholDegree:D(t,["alcohol_degree"],0),extractDegree:D(t,["extract_degree"],0),sakaMeterValue:D(t,["sakemeter_value"],0),volume:D(t,["volume_l"],0),taxCategory:g(t,["tax_category_code"],""),status:g(t,["status"],"pending")})):[]}async function us(){const e=await V("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:g(t,["id"],""),code:g(t,["material_code","legacy_material_code"],""),name:g(t,["name"],""),unit:g(t,["unit"],""),currentStock:D(t,["current_stock"],0),minimumStock:D(t,["minimum_stock"],0),unitCost:D(t,["unit_cost"],0),lastUpdated:ge(t,["updated_at"],"")})):[]}async function ms(){const e=await V("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:g(t,["id"],""),documentNo:g(t,["document_no","legacy_document_no"],""),purchaseDate:ge(t,["purchase_date"],""),supplierCode:g(t,["supplier_code","legacy_supplier_code"],""),supplierName:g(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:D(t,["total_amount"],0),status:g(t,["payment_status"],"pending")})):[]}async function ys(){const e=await V("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:g(t,["supplier_code","legacy_supplier_code"],""),supplierName:g(t,["legacy_supplier_code"],""),totalPurchase:D(t,["total_purchase"],0),paidAmount:D(t,["paid_amount"],0),balance:D(t,["balance"],0),nextPaymentDate:ge(t,["next_payment_date"],""),status:g(t,["status"],"unpaid")})):[]}async function hs(){const e=await V("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:g(t,["id"],""),billNo:g(t,["bill_no"],""),supplierName:g(t,["counterparty_name"],""),amount:D(t,["amount"],0),issueDate:ge(t,["issue_date"],""),dueDate:ge(t,["due_date"],""),status:g(t,["status"],"holding")})):[]}async function gs(){const e=await V("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:g(t,["material_code","legacy_material_code"],""),name:g(t,["name"],""),unit:g(t,["unit"],""),currentStock:D(t,["current_stock"],0),minimumStock:D(t,["minimum_stock"],0),lastPurchaseDate:ge(t,["last_purchase_date"],""),unitCost:D(t,["unit_cost"],0)})):[]}const fs=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],$a={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Fr={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function Ya(e,t){const n=await V("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const o=n[0],i=g(o,["id"],""),[l,c]=await Promise.all([V("tax_declaration_rows",{declaration_id:`eq.${i}`,order:"tax_category_code.asc"}),V("tax_deductions",{declaration_id:`eq.${i}`})]),p=l.map(y=>({taxCategory:g(y,["tax_category_code"],""),taxCategoryName:g(y,["tax_category_name"],""),alcoholDegree:D(y,["alcohol_degree"],0),volume:D(y,["taxable_volume"],0),taxRate:D(y,["tax_rate"],0),taxAmount:D(y,["tax_amount"],0),productionVolume:D(y,["production_volume"],0),previousBalance:D(y,["previous_balance"],0),currentAdjustment:D(y,["current_adjustment"],0),exportDeduction:D(y,["export_deduction"],0),sampleDeduction:D(y,["sample_deduction"],0),taxableVolume:D(y,["taxable_volume"],0)})),u=c.map(y=>({type:g(y,["deduction_type"],"sample"),categoryCode:g(y,["tax_category_code"],""),volume:D(y,["volume"],0),reason:g(y,["reason"],""),documentNo:g(y,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:g(o,["company_name"],""),companyNo:g(o,["company_no"],""),companyAddress:g(o,["company_address"],""),companyRepresentative:g(o,["company_representative"],""),taxOffice:g(o,["tax_office"],""),rows:p,deductions:u,totalVolume:D(o,["total_taxable_volume"],0),totalTax:D(o,["total_tax_amount"],0),status:g(o,["status"],"draft"),submittedAt:g(o,["submitted_at"],"")||null}}return{...Fr,targetYear:e,targetMonth:t}}function Ae(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function vs(e){const t=e.rows.map(o=>`    <Category>
      <Code>${Ae(o.taxCategory)}</Code>
      <Name>${Ae(o.taxCategoryName)}</Name>
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
`),n=e.deductions.map(o=>`    <Deduction type="${Ae(o.type)}">
      <CategoryCode>${Ae(o.categoryCode)}</CategoryCode>
      <Volume>${o.volume}</Volume>
      <Reason>${Ae(o.reason)}</Reason>${o.documentNo?`
      <DocumentNo>${Ae(o.documentNo)}</DocumentNo>`:""}
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
`}function Vr(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function Yr(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),o=e.rows.map(l=>[l.taxCategory,l.taxCategoryName,l.alcoholDegree,l.productionVolume,l.previousBalance,l.currentAdjustment,l.exportDeduction,l.sampleDeduction,l.taxableVolume,l.taxRate,l.taxAmount].map(Vr).join(",")),i=`,合計,,${e.rows.reduce((l,c)=>l+c.productionVolume,0)},,,${e.rows.reduce((l,c)=>l+c.exportDeduction,0)},${e.rows.reduce((l,c)=>l+c.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...o,i].join(`
`)+`
`}function Ur(e){const t=e.rows.map(i=>{const l=Math.max(0,i.productionVolume+i.previousBalance+i.currentAdjustment-i.exportDeduction-i.sampleDeduction),c=Math.round(l*i.taxRate);return{...i,taxableVolume:l,volume:l,taxAmount:c}}),n=t.reduce((i,l)=>i+l.taxableVolume,0),o=t.reduce((i,l)=>i+l.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:o}}async function Jr(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>Z);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:vs(e),submitted_at:e.submittedAt})}async function Ua(e){const t=await V("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:g(n,["id"],""),saleDate:g(n,["sale_date"],e),saleTime:g(n,["sale_time"],""),productCode:g(n,["product_code"],""),productName:g(n,["product_name"],""),quantity:D(n,["quantity"],0),unitPrice:D(n,["unit_price"],0),amount:D(n,["amount"],0),paymentMethod:g(n,["payment_method"],"cash")})):[]}async function bs(){const e=await V("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:g(t,["id"],""),orderNo:g(t,["order_no"],""),orderDate:ge(t,["order_date"],""),customerName:g(t,["customer_name"],""),postalCode:g(t,["postal_code"],""),address:g(t,["shipping_address"],""),items:[],totalAmount:D(t,["total_amount"],0),status:g(t,["status"],"new"),shippingDate:ge(t,["shipping_date"],"")})):[]}async function Qr(e,t,n,o,i,l){const c=await Le("store_orders",{order_no:e,order_date:new Date().toISOString().slice(0,10),channel:"mobile",customer_name:t,legacy_customer_code:n||null,total_amount:o,status:"new",remarks:i||null});if(!c)return null;const p=c.id;for(let u=0;u<l.length;u++){const y=l[u];await Le("store_order_lines",{order_id:p,line_no:u+1,product_code:y.productCode,product_name:y.productName,quantity:y.quantity,unit_price:y.unitPrice,amount:y.amount})}return p}async function zt(e){const t=await Le("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function ws(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Hr(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await V("print_layouts",t)).map(o=>({id:g(o,["id"],""),name:g(o,["name"],""),templateKey:g(o,["template_key"],""),positions:o.positions??{},isDefault:fe(o,["is_default"],!1),note:g(o,["note"],""),updatedAt:g(o,["updated_at"],"")}))}async function Kr(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>Z);return{supabaseInsert:i}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},o=await t("print_layouts",n);return o?{id:g(o,["id"],e.id),name:g(o,["name"],e.name),templateKey:g(o,["template_key"],e.templateKey),positions:o.positions??e.positions,isDefault:fe(o,["is_default"],!1),note:g(o,["note"],""),updatedAt:g(o,["updated_at"],"")}:null}async function Gr(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Wr(){return(await V("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:g(t,["id"],""),name:g(t,["name"],""),email:g(t,["email"],""),displayName:g(t,["display_name"],""),signature:g(t,["signature"],""),replyTo:g(t,["reply_to"],""),isDefault:fe(t,["is_default"],!1),isVerified:fe(t,["is_verified"],!1),note:g(t,["note"],"")}))}async function Xr(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:g(n,["id"],e.id),name:g(n,["name"],e.name),email:g(n,["email"],e.email),displayName:g(n,["display_name"],""),signature:g(n,["signature"],""),replyTo:g(n,["reply_to"],""),isDefault:fe(n,["is_default"],!1),isVerified:fe(n,["is_verified"],!1)}:null}async function Zr(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const Ja={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},Qa={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function ei(e){const t=`${e}-01T00:00:00Z`,[n,o]=e.split("-").map(p=>parseInt(p,10)),i=new Date(n,o,0).getDate(),l=`${e}-${String(i).padStart(2,"0")}T23:59:59Z`;return(await V("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${l})`,order:"starts_at.asc"})).map(p=>({id:g(p,["id"],""),title:g(p,["title"],""),description:g(p,["description"],""),category:g(p,["category"],"general")||"general",startsAt:g(p,["starts_at"],new Date().toISOString()),endsAt:g(p,["ends_at"],""),isAllDay:fe(p,["is_all_day"],!1),location:g(p,["location"],""),attendees:p.attendees??[],relatedCustomerCode:g(p,["related_customer_code"],""),relatedOrderId:g(p,["related_order_id"],""),color:g(p,["color"],""),googleEventId:g(p,["google_event_id"],"")}))}async function ti(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??Qa[e.category],updated_at:new Date().toISOString()})?e:null}async function ai(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function xs(){return(await V("integration_settings",{order:"name.asc"})).map(t=>({id:g(t,["id"],""),name:g(t,["name"],""),provider:g(t,["provider"],""),config:t.config??{},isEnabled:fe(t,["is_enabled"],!1),lastSyncAt:g(t,["last_sync_at"],""),lastStatus:g(t,["last_status"],"")}))}async function Pt(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function ni(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const o=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,i=await fetch(o,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!i.ok)return{count:0,error:`HTTP ${i.status}`};const l=await i.json(),{supabaseInsert:c}=await q(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>Z);return{supabaseInsert:u}},void 0);let p=0;for(const u of l.orders){const y=`shopify_${u.id}`;await c("shopify_orders",{id:y,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),p++}return await Pt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得成功`}),{count:p}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function si(){return(await V("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:g(t,["id"],""),shopifyOrderId:g(t,["shopify_order_id"],""),orderNumber:g(t,["order_number"],""),orderDate:g(t,["order_date"],""),customerName:g(t,["customer_name"],""),customerEmail:g(t,["customer_email"],""),totalAmount:ne(t.total_amount),financialStatus:g(t,["financial_status"],""),fulfillmentStatus:g(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function oi(e){const t=e.config.refresh_token,n=e.config.client_id,o=e.config.client_secret;if(!t||!n||!o)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const i=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:o})});if(!i.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${i.status}`};const c=(await i.json()).access_token;return await Pt({...e,config:{...e.config,oauth_token:c}}),e.config.oauth_token=c,{token:c}}async function ri(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const o=new Date().toISOString(),i=new Date(Date.now()+30*86400*1e3).toISOString(),l=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${o}&timeMax=${i}&singleEvents=true&orderBy=startTime`;let c=await fetch(l,{headers:{Authorization:`Bearer ${t}`}});if(c.status===401){const v=await oi(e);if(v.error)return{count:0,error:v.error};t=v.token,c=await fetch(l,{headers:{Authorization:`Bearer ${t}`}})}if(!c.ok)return{count:0,error:`HTTP ${c.status}`};const p=await c.json(),{supabaseInsert:u}=await q(async()=>{const{supabaseInsert:v}=await Promise.resolve().then(()=>Z);return{supabaseInsert:v}},void 0);let y=0;for(const v of p.items){const f=`gcal_${v.id}`,x=v.start?.dateTime??v.start?.date??"",A=v.end?.dateTime??v.end?.date??"";await u("calendar_events",{id:f,title:String(v.summary??"(無題)"),description:String(v.description??""),category:"general",starts_at:String(x),ends_at:String(A),location:String(v.location??""),google_event_id:String(v.id??""),updated_at:new Date().toISOString()}),y++}return await Pt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${y}件取得`}),{count:y}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function ii(){return(await V("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:g(t,["id"],""),receivedAt:g(t,["received_at"],""),senderPhone:g(t,["sender_phone"],""),senderName:g(t,["sender_name"],""),imageUrl:g(t,["image_url"],""),ocrStatus:g(t,["ocr_status"],"pending")||"pending",ocrText:g(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:g(t,["linked_invoice_id"],"")}))}async function li(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const o=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,i=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return i.ok?{text:(await i.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${i.status}`}}catch(o){return{text:"",error:o instanceof Error?o.message:String(o)}}}async function ci(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Jt={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},Qt={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function di(){return(await V("user_profiles",{order:"display_name.asc"})).map(t=>({id:g(t,["id"],""),email:g(t,["email"],""),displayName:g(t,["display_name"],""),staffCode:g(t,["staff_code"],""),department:g(t,["department"],"all")||"all",role:g(t,["role"],"staff")||"staff",defaultMailSenderId:g(t,["default_mail_sender_id"],""),phone:g(t,["phone"],""),avatarUrl:g(t,["avatar_url"],""),isActive:fe(t,["is_active"],!0),lastSignInAt:g(t,["last_sign_in_at"],""),createdAt:g(t,["created_at"],"")}))}async function pi(e){if(!e)return null;const t=await V("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:g(n,["id"],""),email:g(n,["email"],""),displayName:g(n,["display_name"],""),staffCode:g(n,["staff_code"],""),department:g(n,["department"],"all")||"all",role:g(n,["role"],"staff")||"staff",defaultMailSenderId:g(n,["default_mail_sender_id"],""),phone:g(n,["phone"],""),avatarUrl:g(n,["avatar_url"],""),isActive:fe(n,["is_active"],!0),lastSignInAt:g(n,["last_sign_in_at"],"")}}async function ui(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function mi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function yi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>Z);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function hi(e=100){return(await V("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:g(n,["id"],""),action:g(n,["action"],""),entityType:g(n,["entity_type"],""),entityId:g(n,["entity_id"],""),userEmail:g(n,["user_email"],""),changes:n.changes??{},createdAt:g(n,["created_at"],"")}))}const Ht={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function $s(){return(await V("slack_notifications",{order:"event_type.asc"})).map(t=>({id:g(t,["id"],""),eventType:g(t,["event_type"],"new_order"),enabled:fe(t,["enabled"],!0),channel:g(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:g(t,["last_triggered_at"],"")}))}async function gi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function fi(e=50){return(await V("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:g(n,["id"],""),eventType:g(n,["event_type"],""),channel:g(n,["channel"],""),message:g(n,["message"],""),status:g(n,["status"],"sent"),error:g(n,["error"],""),sentAt:g(n,["sent_at"],"")}))}async function vi(e,t,n){const i=(await xs()).find(y=>y.provider==="slack");if(!i||!i.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const l=i.config.webhook_url;if(!l)return{ok:!1,error:"Webhook URL未設定"};const p=(await $s()).find(y=>y.eventType===e&&y.enabled);if(!p)return{ok:!1,error:"通知ルールが無効"};const u=n??p.channel??i.config.default_channel??"#general";try{const y=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${Ht[e]} ${t}`,channel:u})}),v=y.ok,{supabaseInsert:f}=await q(async()=>{const{supabaseInsert:x}=await Promise.resolve().then(()=>Z);return{supabaseInsert:x}},void 0);return await f("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:v?"sent":"failed",error:v?null:`HTTP ${y.status}`}),v?{ok:!0}:{ok:!1,error:`HTTP ${y.status}`}}catch(y){return{ok:!1,error:y instanceof Error?y.message:String(y)}}}const ea={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},Ha={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function bi(){return(await V("prospects",{order:"updated_at.desc"})).map(t=>({id:g(t,["id"],""),companyName:g(t,["company_name"],""),contactName:g(t,["contact_name"],""),email:g(t,["email"],""),phone:g(t,["phone"],""),address:g(t,["address"],""),website:g(t,["website"],""),businessType:g(t,["business_type"],""),stage:g(t,["stage"],"cold"),source:g(t,["source"],""),expectedAmount:ne(t.expected_amount),probability:ne(t.probability),assignedStaffCode:g(t,["assigned_staff_code"],""),nextActionDate:g(t,["next_action_date"],""),nextAction:g(t,["next_action"],""),note:g(t,["note"],""),lastContactAt:g(t,["last_contact_at"],""),wonAt:g(t,["won_at"],""),lostAt:g(t,["lost_at"],""),lostReason:g(t,["lost_reason"],""),convertedCustomerCode:g(t,["converted_customer_code"],""),createdAt:g(t,["created_at"],"")}))}async function _s(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0),n=await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()});return n?{...e,id:g(n,["id"],e.id)}:null}async function wi(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:i}},void 0);try{const o=new URL("/rest/v1/prospects",t);return o.searchParams.set("id",`eq.${e}`),(await fetch(o.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function xi(e){return(await V("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:g(n,["id"],""),prospectId:g(n,["prospect_id"],""),activityType:g(n,["activity_type"],"call"),title:g(n,["title"],""),description:g(n,["description"],""),activityDate:g(n,["activity_date"],""),result:g(n,["result"],""),staffCode:g(n,["staff_code"],"")}))}async function $i(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const Ss=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function _i(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function Si(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ki(){return(await Se("v_customer_map")).filter(t=>t.lat&&t.lng).map(t=>({customerCode:g(t,["customer_code"],""),name:g(t,["name"],""),phone:g(t,["phone"],""),areaCode:g(t,["area_code"],""),businessType:g(t,["business_type"],""),businessTypeName:g(t,["business_type_name"],""),address1:g(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:fe(t,["is_at_risk"],!1),isDormant:fe(t,["is_dormant"],!1),amount12m:D(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}const ta=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function Pi(){return(await Se("customer_churn_notes")).map(t=>({customerCode:g(t,["customer_code"],""),reason:g(t,["reason"],""),memo:g(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:g(t,["updated_at"],"")}))}async function Ei(e){const{supabaseUpsert:t}=await q(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>Z);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function Li(){return(await V("delivery_locations",{order:"name.asc"})).map(t=>({id:g(t,["id"],""),customerCode:g(t,["customer_code"],""),name:g(t,["name"],""),postalCode:g(t,["postal_code"],""),address:g(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:g(t,["contact_name"],""),phone:g(t,["phone"],""),deliveryNote:g(t,["delivery_note"],""),isActive:fe(t,["is_active"],!0)}))}async function Ai(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function Ci(e=50){return(await V("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:g(n,["id"],""),callDirection:g(n,["call_direction"],"inbound"),fromNumber:g(n,["from_number"],""),toNumber:g(n,["to_number"],""),matchedCustomerCode:g(n,["matched_customer_code"],""),matchedProspectId:g(n,["matched_prospect_id"],""),durationSeconds:ne(n.duration_seconds),callStatus:g(n,["call_status"],"answered"),recordingUrl:g(n,["recording_url"],""),transcript:g(n,["transcript"],""),ivryCallId:g(n,["ivry_call_id"],""),startedAt:g(n,["started_at"],""),endedAt:g(n,["ended_at"],""),notes:g(n,["notes"],"")}))}async function ks(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function Di(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const o=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,i=await fetch(o,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!i.ok)return{count:0,error:`HTTP ${i.status}`};const c=(await i.json()).calls??[];let p=0;for(const u of c)await ks({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),p++;return await Pt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得`}),{count:p}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function qi(e,t){const n=e.config.api_key,o=e.config.team_id;if(!n||!o)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let i=0;for(const l of t){if(!l.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${o}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:l.name,phone_number:l.phone,external_id:l.customerCode??"",note:l.note??""})})).ok&&i++}return{synced:i}}catch(i){return{synced:0,error:i instanceof Error?i.message:String(i)}}}async function Ii(){return(await V("lead_lists",{order:"created_at.desc"})).map(t=>({id:g(t,["id"],""),name:g(t,["name"],""),query:g(t,["query"],""),area:g(t,["area"],""),businessType:g(t,["business_type"],""),totalCount:ne(t.total_count),source:g(t,["source"],"manual"),createdAt:g(t,["created_at"],"")}))}async function Ti(e){return(await V("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:g(n,["id"],""),listId:g(n,["list_id"],""),companyName:g(n,["company_name"],""),address:g(n,["address"],""),phone:g(n,["phone"],""),website:g(n,["website"],""),email:g(n,["email"],""),businessType:g(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:ne(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:g(n,["place_id"],""),status:g(n,["status"],"new"),convertedProspectId:g(n,["converted_prospect_id"],""),note:g(n,["note"],"")}))}async function Mi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function Ps(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function Ni(e,t,n){const o=e.config.api_key;if(!o)return{results:[],error:"Google Maps API key 未設定"};const i=`${t} ${n}`.trim(),l=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(i)}&language=ja&key=${o}`;try{const c=await fetch(l);if(!c.ok)return{results:[],error:`HTTP ${c.status}`};const p=await c.json();return p.status!=="OK"&&p.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${p.status}`}:{results:p.results.map(y=>{const v=y.geometry?.location;return{id:`place_${y.place_id}`,listId:"",companyName:String(y.name??""),address:String(y.formatted_address??""),rating:y.rating?Number(y.rating):void 0,reviewCount:y.user_ratings_total?Number(y.user_ratings_total):void 0,lat:v?.lat,lng:v?.lng,placeId:String(y.place_id??""),status:"new"}})}}catch(c){return{results:[],error:c instanceof Error?c.message:String(c)}}}async function Ri(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await _s(t);return n&&await Ps({...e,status:"imported",convertedProspectId:t.id}),n}async function Oi(){return(await V("workflow_orders",{order:"order_date.desc"})).map(t=>({id:g(t,["id"],""),orderNo:g(t,["order_no"],""),customerName:g(t,["customer_name"],""),customerCode:g(t,["customer_code"],""),orderDate:g(t,["order_date"],""),deliveryDate:g(t,["delivery_date"],""),stage:g(t,["stage"],"new"),totalAmount:ne(t.total_amount),itemCount:ne(t.item_count),priority:g(t,["priority"],"normal"),staffName:g(t,["staff_name"],""),notes:g(t,["notes"],"")}))}async function Bi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function ji(){return(await V("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:g(t,["id"],""),name:g(t,["name"],""),email:g(t,["email"],""),phone:g(t,["phone"],""),visitDate:g(t,["visit_date"],""),partySize:ne(t.party_size)||1,language:g(t,["language"],"ja"),purpose:g(t,["purpose"],""),message:g(t,["message"],""),status:g(t,["status"],"new"),repliedAt:g(t,["replied_at"],""),confirmedTime:g(t,["confirmed_time"],""),createdAt:g(t,["created_at"],new Date().toISOString())}))}async function zi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const Fi=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function Es(){return(await Promise.all(Fi.map(async t=>{const[n,o]=await Promise.all([Ma(t.table),V(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:o[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Ft(e,t,n=100){const o=(t-1)*n,[i,l]=await Promise.all([V(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(o)}),Ma(e)]);return{records:i,total:l}}async function _a(e){const t=await V("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const o=JSON.parse(n);return String(o.price_group??"")}catch{return""}return""}async function Ls(e,t){if(e){const o=await V("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(o.length>0&&o[0].special_price)return ne(o[0].special_price)}const n=await V("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?ne(n[0].default_sale_price):0}const Vi=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],Yi=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],Ui={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function Ji(){const e=new Date,t=[];for(let u=11;u>=0;u--){const y=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`)}const n=Vi,o={},i={};for(const u of n){o[u.code]={};for(const y of t){const v=parseInt(y.split("-")[1])-1,f=Ui[u.code]??100,x=Math.round(f*Yi[v]*(.85+Math.random()*.3));o[u.code][y]=x,i[y]=(i[y]??0)+x}}const l={},c={},p={};for(const u of n){const y=t.map(x=>o[u.code][x]??0),v=y.reduce((x,A)=>x+A,0)/y.length,f=y.reduce((x,A)=>x+(A-v)**2,0)/y.length;l[u.code]=y.reduce((x,A)=>x+A,0),c[u.code]=v,p[u.code]=Math.sqrt(f)}return{months:t,products:n,matrix:o,totals:i,productTotals:l,productAvg:c,productStdDev:p}}async function Qi(e=36){const t=(()=>{const x=new Date;return x.setMonth(x.getMonth()-e),`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`})(),n=await Se("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"});if(n.length===0)return Ji();const o=new Set,i=new Map,l={},c={};for(const x of n){const A=g(x,["year_month"],""),C=g(x,["product_code"],""),M=g(x,["product_name"],C),L=D(x,["quantity"],0);!A||!C||(o.add(A),i.set(C,M),l[C]||(l[C]={}),l[C][A]=L,c[A]=(c[A]??0)+L)}const p=[...o].sort(),u=[...i.entries()].map(([x,A])=>({code:x,name:A})),y={},v={},f={};for(const x of u){const A=p.map(L=>l[x.code]?.[L]??0),C=A.reduce((L,s)=>L+s,0)/(A.length||1),M=A.reduce((L,s)=>L+(s-C)**2,0)/(A.length||1);y[x.code]=A.reduce((L,s)=>L+s,0),v[x.code]=C,f[x.code]=Math.sqrt(M)}return{months:p,products:u,matrix:l,totals:c,productTotals:y,productAvg:v,productStdDev:f}}async function Hi(){return(await V("product_safety_stock_params",{order:"product_code.asc"})).map(t=>({productCode:g(t,["product_code"],""),productName:g(t,["product_name"],""),unit:g(t,["unit"],"本"),avgMonthlyDemand:D(t,["avg_monthly_demand"],0),demandStdDev:D(t,["demand_std_dev"],0),leadTimeDays:D(t,["lead_time_days"],30),serviceLevel:D(t,["service_level"],.95),safetyStockQty:D(t,["safety_stock_qty"],0),reorderPoint:D(t,["reorder_point"],0),memo:g(t,["memo"],""),productionType:g(t,["production_type"],"monthly")}))}async function Ki(e){return(await V("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:g(n,["id"],""),yearMonth:g(n,["year_month"],e),productCode:g(n,["product_code"],""),productName:g(n,["product_name"],""),demandForecast:D(n,["demand_forecast"],0),safetyStockTarget:D(n,["safety_stock_target"],0),openingStock:D(n,["opening_stock"],0),requiredProduction:D(n,["required_production"],0),plannedQty:D(n,["planned_qty"],0),actualQty:D(n,["actual_qty"],0),status:g(n,["status"],"draft"),productionType:g(n,["production_type"],"monthly"),notes:g(n,["notes"],"")}))}async function Gi(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:i}},void 0);if(!n||e.length===0)return!1;try{const o=e.map(c=>({product_code:c.productCode,product_name:c.productName,unit:c.unit,avg_monthly_demand:c.avgMonthlyDemand,demand_std_dev:c.demandStdDev,lead_time_days:c.leadTimeDays,service_level:c.serviceLevel,safety_stock_qty:c.safetyStockQty,reorder_point:c.reorderPoint,production_type:c.productionType,memo:c.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),i=new URL("/rest/v1/product_safety_stock_params",t),l=await fetch(i.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(o)});if(!l.ok){const c=await l.text();return console.error("saveSafetyStockParamsBulk failed:",l.status,c),!1}return!0}catch(o){return console.error("saveSafetyStockParamsBulk error:",o),!1}}async function Wi(e){const{supabaseUpsert:t}=await q(async()=>{const{supabaseUpsert:o}=await Promise.resolve().then(()=>Z);return{supabaseUpsert:o}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function Xi(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}async function Zi(e){const[t,n]=e.split("-").map(Number),o=`${e}-01`,i=new Date(t,n,0).getDate(),l=`${e}-${String(i).padStart(2,"0")}`,c=await Se("sales_document_headers",{select:"sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${o},sales_date.lte.${l})`,order:"sales_date.asc"}),p=await Se("customers",{select:"legacy_customer_code,address1",address1:"not.is.null"}),u={};for(const v of p)v.address1&&(u[v.legacy_customer_code]=Xi(v.address1));const y={};for(const v of c){const f=v.sales_date;if(!f)continue;const x=u[v.legacy_customer_code]||"住所未登録",A=Number(v.total_amount)||0;y[f]||(y[f]={date:f,entries:[],cityGroups:[],totalAmount:0,count:0}),y[f].entries.push({customerCode:v.legacy_customer_code||"",customerName:v.customer_name||"",city:x,amount:A}),y[f].totalAmount+=A,y[f].count++}for(const v of Object.values(y)){const f={};for(const x of v.entries)f[x.city]=(f[x.city]||0)+1;v.cityGroups=Object.entries(f).sort((x,A)=>A[1]-x[1]).map(([x,A])=>({city:x,count:A}))}return y}async function Ka(){return V("quotes",{select:"id,quote_no,quote_date,valid_until,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function As(e){const t=await V("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await V("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function el(){const e=new Date().toISOString().slice(0,7)+"-01";return Se("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}const R=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:Qa,CALENDAR_CATEGORY_LABELS:Ja,CHURN_REASONS:ta,DEPT_LABELS:Qt,INVOICE_TYPE_LABELS:wa,JIKOMI_STATUS_LABELS:ls,MATERIAL_CATEGORIES:Ss,PROSPECT_STAGE_COLORS:Ha,PROSPECT_STAGE_LABELS:ea,ROLE_LABELS:Jt,SEASONAL_TEMPLATES:Ra,SLACK_EVENT_LABELS:Ht,TAX_DEDUCTION_LABELS:$a,TAX_RATE_CATEGORIES:fs,addBrewingCustomCategory:$r,addBrewingStockEntry:vr,addRiceVariety:yr,convertLeadToProspect:Ri,createBrewingBatch:ir,deleteBrewingCustomCategory:Sr,deleteBrewingStockEntry:wr,deleteCalendarEvent:ai,deleteMailSender:Zr,deleteMaterial:Si,deletePrintLayout:Gr,deleteProspect:wi,deleteRicePurchaseCommitment:ur,deleteRiceVariety:hr,deleteUserProfile:mi,fetchAllBrewingStockEntries:fr,fetchAnalyticsByPeriod:Ao,fetchAnnouncements:Tr,fetchAuditLogs:hi,fetchAvailablePeriods:Co,fetchAvailableProductionTypes:Ho,fetchBillList:hs,fetchBillingSummary:Fa,fetchBrewingAlcoholSettings:Ko,fetchBrewingBatches:or,fetchBrewingCategoryOverrides:Pr,fetchBrewingCustomCategories:xr,fetchBrewingForecastOverrides:Xo,fetchBrewingMonthlyTrend:jo,fetchBrewingPlanSummary:Bo,fetchBrewingProcessSteps:rr,fetchBrewingProductDetail:zo,fetchBrewingRiceParams:er,fetchBrewingSchedule:Fo,fetchBrewingSeasonalPattern:ar,fetchBrewingStockEntries:gr,fetchBrewingYearlyShipments:Wo,fetchCalendarEvents:ei,fetchCallLogs:Ci,fetchCategoryTypeLinks:Uo,fetchChurnAlerts:Mr,fetchChurnNotes:Pi,fetchCustomerAnalysis:is,fetchCustomerEfficiency:jr,fetchCustomerEfficiencyByYear:wt,fetchCustomerLedger:Ba,fetchCustomerPriceGroup:_a,fetchCustomerPricing:xa,fetchCustomerProductBreakdown:No,fetchDeliveryLocations:Li,fetchDeliveryNote:za,fetchDeliverySchedule:Ir,fetchDemandAnalysis:Qi,fetchDemandForecasts:qr,fetchEntityMonthlySales:Oo,fetchFaxInbox:ii,fetchIntegrationSettings:xs,fetchInvoiceLines:Zn,fetchInvoices:St,fetchJikomiList:cs,fetchKenteiList:ps,fetchLabelExclusions:Er,fetchLeadItems:Ti,fetchLeadLists:Ii,fetchMailSenders:Wr,fetchMapCustomers:ki,fetchMasterStats:Oa,fetchMaterialList:us,fetchMyProfile:pi,fetchOrderHeaders:el,fetchPayableList:ys,fetchPaymentStatus:Gn,fetchPeriodChartData:To,fetchPipelineMeta:Wn,fetchPrintLayouts:Hr,fetchProcurementDecisions:nr,fetchProductABC:zr,fetchProductCustomerBreakdown:Ro,fetchProductDaily:Br,fetchProductMonthlyShipments:Dr,fetchProductPower:rs,fetchProductPrice:Ls,fetchProductShipmentsFromTable:Or,fetchProductionPlan:Ki,fetchProspectActivities:xi,fetchProspects:bi,fetchPurchaseList:ms,fetchQuoteList:Ka,fetchQuoteWithLines:As,fetchRawMaterialStock:gs,fetchRawRecords:Ft,fetchRawTableList:Es,fetchRicePurchaseCommitments:dr,fetchRiceVarieties:mr,fetchSafetyStockParams:Hi,fetchSalesAnalytics:ja,fetchSalesReport:Zt,fetchSalesSummary:Kn,fetchSeasonalProfiles:Rr,fetchShipmentCalendar:Zi,fetchShopifyOrders:si,fetchSlackLogs:fi,fetchSlackRules:$s,fetchStaffCustomerBreakdown:qo,fetchStaffProductBreakdown:Io,fetchStaffTotalsByPeriod:Do,fetchStoreOrders:bs,fetchStoreSales:Ua,fetchSyncDashboard:Xn,fetchSystemSetting:Hn,fetchTankList:ds,fetchTaxDeclaration:Ya,fetchTourInquiriesFromDb:ji,fetchTypesInCategory:_r,fetchUserProfiles:di,fetchVisitPriorities:Nr,fetchWorkflowOrdersFromDb:Oi,generateTaxCSV:Yr,generateTaxXML:vs,linkTypeToCategory:Jo,ocrFaxImage:li,periodToDateRange:es,prevYearFilter:Mo,reassignBrewingStockEntry:br,recalculateTaxDeclaration:Ur,recordAudit:yi,resolveProductPrice:Va,saveBrewingAlcoholSetting:Go,saveBrewingForecastOverride:Zo,saveBrewingRiceParams:tr,saveBrewingSchedule:Vo,saveCalendarEvent:ti,saveCallLog:ks,saveChurnNote:Ei,saveDeliveryLocation:Ai,saveEmailCampaign:zt,saveFaxRecord:ci,saveIntegrationSetting:Pt,saveInvoice:as,saveLabelExclusions:Lr,saveLeadItem:Ps,saveLeadList:Mi,saveMailSender:Xr,saveMaterial:_i,savePrintLayout:Kr,saveProcurementDecision:sr,saveProductionPlan:Wi,saveProspect:_s,saveProspectActivity:$i,saveRicePurchaseCommitment:pr,saveSafetyStockParamsBulk:Gi,saveSlackRule:gi,saveStoreOrder:Qr,saveTaxDeclaration:Jr,saveTourInquiry:zi,saveUserProfile:ui,saveWorkflowOrder:Bi,searchPlaces:Ni,sendEmailCampaign:ws,sendSlackNotification:vi,setBrewingCategoryOverride:kr,submitFeatureRequest:ns,syncGoogleCalendar:ri,syncIvryCallLogs:Di,syncPhoneBookToIvry:qi,syncShopifyOrders:ni,unlinkTypeFromCategory:Qo,updateBrewingBatch:cr,updateBrewingProcessStep:lr,updateCustomer:ss,updateProduct:os,upsertBrewingStock:Yo,upsertSystemSetting:nt},Symbol.toStringTag,{value:"Module"}));function Xe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const tl={open:"未締め",closed:"締め済"};function al(e,t){const n=e.customers.map(o=>`
      <tr>
        <td>
          <div class="table-title">${o.customerName}</div>
          <div class="table-sub mono">${o.customerCode}</div>
        </td>
        <td class="numeric">${o.closingDay}日</td>
        <td class="numeric">${Xe(o.salesAmount)}</td>
        <td class="numeric">${Xe(o.taxAmount)}</td>
        <td class="numeric">${Xe(o.prevBalance)}</td>
        <td class="numeric">${Xe(o.paymentAmount)}</td>
        <td class="numeric"><strong>${Xe(o.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${o.status==="closed"?"success":"warning"}">${tl[o.status]}</span>
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
        <p class="kpi-value">${Xe(e.totalBilling)}</p>
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
  `}const nl={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},sl={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function cn(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function At(e){const t=sl[e],n=nl[e].map(o=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${cn(o.title)}</p>
            <p class="category-card-description">${cn(o.description)}</p>
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
  `}function Cs(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function xt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ol(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${Cs(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${xt(t.amount)}</td>
        </tr>
      `).join("")}function rl(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${Cs(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${xt(t.amount)}</td>
        </tr>
      `).join("")}function il(e,t){return`
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
            <dd>${xt(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${xt(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${xt(e.balanceAmount)}</dd>
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
            <tbody>${ol(e)}</tbody>
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
            <tbody>${rl(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function pt(e,t,n){const o=e.findIndex(l=>l.column===t);if(o>=0){if(e[o].direction==="asc"){const c=[...e];return c[o]={column:t,direction:"desc"},c}return e.filter((c,p)=>p!==o)}const i={column:t,direction:"asc"};return n?[...e,i]:[i]}function ll(e,t){const n=e.findIndex(l=>l.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const o=e[n].direction==="asc"?"↑":"↓",i=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${o}${i}</span>`}function ee(e,t,n,o=""){return`<th class="sortable ${o}" data-sort-col="${e}">${t} ${ll(n,e)}</th>`}function dn(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function rt(e,t,n){return t.length===0?e:[...e].sort((o,i)=>{for(const{column:l,direction:c}of t){const p=n[l];if(!p)continue;const u=dn(o[p]),y=dn(i[p]);let v=0;if(typeof u=="number"&&typeof y=="number"?v=u-y:v=String(u).localeCompare(String(y),"ja"),v!==0)return c==="asc"?v:-v}return 0})}const cl={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},pn={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},ut={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function dl(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function pl(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function ul(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function Ds(e,t){const n=pl(t),o=ul(t),[i,l]=t.split("-").map(Number),c=new Map;e.forEach(m=>{if(m.date.slice(0,7)===t){const h=m.date.slice(0,10);c.has(h)||c.set(h,[]),c.get(h).push(m)}});const p=e.filter(m=>m.date.slice(0,7)===t),u=p.reduce((m,h)=>m+h.quantity,0),y=new Set(p.map(m=>m.date)).size,v=new Date().toISOString().slice(0,10),f=["日","月","火","水","木","金","土"].map(m=>`<th class="dcal-header">${m}</th>`).join("");let x="",A=1;for(let m=0;m<6&&!(A>n&&m>0);m++){x+="<tr>";for(let h=0;h<7;h++)if(m===0&&h<o||A>n)x+='<td class="dcal-cell dcal-empty"></td>';else{const b=`${i}-${String(l).padStart(2,"0")}-${String(A).padStart(2,"0")}`,w=c.get(b)||[],$=b===v,_=w.reduce((k,P)=>k+P.quantity,0);x+=`
          <td class="dcal-cell ${$?"dcal-today":""}">
            <div class="dcal-day">${A}</div>
            ${w.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${w[0].status}">${w.length}件 ${_}本</div>
              </div>
            `:""}
          </td>`,A++}x+="</tr>"}const[C,M]=l===1?[i-1,12]:[i,l-1],[L,s]=l===12?[i+1,1]:[i,l+1],r=`${C}-${String(M).padStart(2,"0")}`,d=`${L}-${String(s).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${i}年${l}月: ${y}日稼働 / ${p.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${r}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${i}年${l}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${d}">▶</button>
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
  `}function ml(e,t){const n=t==="all"?e:e.filter(p=>p.segment===t),o={all:e.length};e.forEach(p=>{o[p.segment]=(o[p.segment]??0)+1});const l=["all",...[...new Set(e.map(p=>p.segment))]].map(p=>`
      <button class="button ${t===p?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${p}">
        ${p==="all"?"全て":pn[p]??p} (${o[p]??0})
      </button>
    `).join(""),c=n.map(p=>`
      <tr>
        <td class="mono">${p.code}</td>
        <td>${p.name}</td>
        <td><span class="segment-badge" style="background:${ut[p.segment]??"#718096"};">${pn[p.segment]??p.segment}</span></td>
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
            <li><span class="segment-badge" style="background:${ut.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${ut["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${ut["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${ut["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
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
  `}function yl(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${Ds(e.deliveries,e.calendarMonth)}
    ${ml(e.forecasts,e.selectedSegment)}
  `}function hl(e,t){return Ds(e,t)}const Ct={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function un(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function oa(e,t,n){if(t==="all")return e;const o=new Date,i=o.toISOString().slice(0,10),l=new Date(o);switch(t){case"today":return e.filter(c=>c.date.slice(0,10)===i);case"month":return e.filter(c=>c.date.slice(0,7)===i.slice(0,7));case"future":{const c=new Date(o.getFullYear(),o.getMonth(),1).toISOString().slice(0,10);return e.filter(p=>p.date.slice(0,10)>=c)}case"90days":return l.setDate(l.getDate()-90),e.filter(c=>c.date>=l.toISOString());case"year":return l.setFullYear(l.getFullYear()-1),e.filter(c=>c.date>=l.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(c=>{const p=c.date.slice(0,10);return p>=n.start&&p<=n.end})}}function ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ra(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function gl(e){const o={top:20,right:20,bottom:30,left:50},i=760-o.left-o.right,l=260-o.top-o.bottom,c=Math.max(...e.map(v=>v.amount),1),p=i/e.length,u=e.map((v,f)=>{const x=v.amount/c*l,A=o.left+f*p+4,C=o.top+l-x,M=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(v.date));return`
        <g>
          <rect x="${A}" y="${C}" width="${Math.max(p-8,8)}" height="${x}" rx="4" fill="#0F5B8D" opacity="${.58+f/e.length*.34}" />
          ${f%5===0?`<text x="${A+6}" y="252" class="chart-axis">${M}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(v=>{const f=o.top+l-l*v,x=Math.round(c*v/1e3);return`
        <g>
          <line x1="${o.left}" y1="${f}" x2="${760-o.right}" y2="${f}" class="chart-grid" />
          <text x="6" y="${f+4}" class="chart-axis">${x.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function fl(e,t,n,o,i="month",l,c=[]){const p={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=oa(e.allDailySales,i,l),y=u.reduce((z,Y)=>z+Y.amount,0),v=u.reduce((z,Y)=>z+Y.bottles,0),f=u.reduce((z,Y)=>z+Y.volumeMl,0),x=u.length,A=v>0?Math.round(y/v):0,C=f>0?Math.round(y/(f/1e3)):0,M=new Date,L=M.toISOString().slice(0,10),s=L.slice(0,7),r=oa(e.allDailySales,"month").filter(z=>z.date.slice(0,10)<=L),d=r.reduce((z,Y)=>z+Y.amount,0);r.reduce((z,Y)=>z+Y.bottles,0);const m=M.getDate();new Date(M.getFullYear(),M.getMonth()+1,0).getDate();const b=(o?.orderHeaders??[]).filter(z=>z.sales_date.slice(0,7)===s),w=b.reduce((z,Y)=>z+Number(Y.total_amount),0),$=b.length,_=oa(e.allDailySales,"month"),k=_.reduce((z,Y)=>z+Y.bottles,0),P=w>0?w:_.reduce((z,Y)=>z+Y.amount,0),E=w>0?"orders":"extrapolation",T=(u.length>0?e.allDailySales.filter(z=>{const Y=u[0]?.date??"",H=u[u.length-1]?.date??"",G=un(Y,-1),J=un(H,-1);return z.date>=G&&z.date<=J}):[]).reduce((z,Y)=>z+Y.amount,0),O=T>0?(y-T)/T*100:0,N=O>0?"+":"",j=e.salesRecords.slice(0,10).map(z=>`
            <tr>
              <td class="mono">${z.documentNo}</td>
              <td>${ra(z.date)}</td>
              <td>${z.customerName}</td>
              <td class="numeric">${ke(z.amount)}</td>
            </tr>
          `).join(""),F=["today","month","future","90days","year","all"].map(z=>`<button class="button ${z===i?"primary":"secondary"} small" type="button" data-period="${z}">${Ct[z]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${p[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${ra(t.lastSyncAt)}</span>
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
        <p class="kpi-value">${ke(d)}</p>
        <p class="kpi-sub">${m}日経過 / ${r.length}営業日 / 日平均 ${r.length>0?ke(Math.round(d/r.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${ke(P)}</p>
        <p class="kpi-sub">${E==="orders"?`受注確定 ${$}件`:`出荷見込 ${k.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${O>=0?"#2f855a":"#c53d3d"}">${T>0?`${N}${O.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${T>0?ke(T):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${ke(e.kpis.unpaidAmount)}</p>
      </article>
    </section>

    ${i!=="month"?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">${Ct[i]}売上</p>
        <p class="kpi-value">${ke(y)}</p>
        <p class="kpi-sub">${x}日間${x>0?` / 日平均 ${ke(Math.round(y/x))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${v.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${ke(A)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(f/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${ke(C)}</p>
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
            <p class="panel-caption">${Ct[i]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${gl(u.length>0?u:e.dailySales)}
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
              <dd>${ra(t.lastSyncAt)}</dd>
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
          <tbody>${j}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${Ct[i]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ee("date","日付",c)}
              ${ee("amount","売上",c,"numeric")}
              ${ee("bottles","本数",c,"numeric")}
              ${ee("volumeMl","液体量(L)",c,"numeric")}
              ${ee("pricePerBottle","本単価",c,"numeric")}
              ${ee("pricePerLiter","L単価",c,"numeric")}
            </tr>
          </thead>
          <tbody>${rt(c.length>0?u:u.slice().reverse(),c,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(z=>`
            <tr>
              <td class="mono">${z.date.slice(0,10)}</td>
              <td class="numeric">${ke(z.amount)}</td>
              <td class="numeric">${z.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(z.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${ke(z.pricePerBottle)}</td>
              <td class="numeric">${ke(z.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${o?vl(o):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function vl(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(p=>p.startsAt.slice(0,10)>=t).slice(0,5),o=e.tourInquiries.filter(p=>p.status==="new").length,i=e.churnSummary,l=i?i.atRiskCount+i.dormantCount+i.decliningCount:null,c=i?`<article class="panel kpi-card ${i.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
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

    ${e.deliveries&&e.deliveries.length>0?hl(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?bl(e.orderHeaders):""}
  `}function bl(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),o=new Date().toISOString().slice(0,10),i=o.slice(0,7),l=new Map;for(const f of e){const x=f.sales_date.slice(0,7),A=l.get(x)??{count:0,total:0};l.set(x,{count:A.count+1,total:A.total+Number(f.total_amount)})}const c=[...l.keys()].sort(),p=e.reduce((f,x)=>f+Number(x.total_amount),0),u=c.map(f=>{const{count:x,total:A}=l.get(f);return`<tr>
      <td class="mono" style="font-weight:700;">${f===i?`${f}（当月）`:f}</td>
      <td class="numeric">${x.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(A)}</td>
    </tr>`}).join(""),y=e.filter(f=>f.sales_date>=o).slice(0,30),v=y.map(f=>`<tr>
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
          <tbody>${v}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function wl(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function Ze(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function xl(e,t){const n=e.lines.length?e.lines.map((i,l)=>`
          <tr>
            <td class="numeric">${l+1}</td>
            <td class="mono">${i.productCode}</td>
            <td>${i.productName}</td>
            <td class="numeric">${i.quantity.toLocaleString("ja-JP")}</td>
            <td>${i.unit}</td>
            <td class="numeric">${Ze(i.unitPrice)}</td>
            <td class="numeric">${Ze(i.amount)}</td>
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
            <tr><th>納品日</th><td>${wl(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${Ze(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${Ze(o)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${Ze(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${Ze(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function De(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function $l(e){return De(e).replaceAll(`
`,"<br />")}function _l(e){const n=[...Object.values(Ra),{id:"custom",season:"カスタム",subject:"",body:""}].map(i=>`
        <button
          class="template-card ${e.selectedTemplateId===i.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${i.id}"
        >
          <span class="template-card-kicker">${i.season}</span>
          <strong>${De(i.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),o=e.previewRecipients.length?e.previewRecipients.map(i=>`
            <li>
              <span>${De(i.name)}</span>
              <span class="table-sub">${De(i.email)} / ${De(i.area)}</span>
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
          <input id="email-subject" type="text" value="${De(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${De(e.body)}</textarea>
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
            ${e.senders.map(i=>`<option value="${i.id}" ${i.id===e.senderId?"selected":""}>${De(i.name)} &lt;${De(i.email)}&gt;${i.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${De(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?$l(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${De(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function Ce(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Dt(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function Sl(e,t){const n=[Dt("得意先",t.customers.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Ce(i.name)}</strong>
            <span class="table-sub mono">${Ce(i.code)}</span>
          </button>
        `)),Dt("商品",t.products.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Ce(i.name)}</strong>
            <span class="table-sub mono">${Ce(i.code)}</span>
          </button>
        `)),Dt("伝票",t.documents.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${Ce(i.documentNo)}</strong>
            <span class="table-sub">${Ce(i.customerName)} / ${Ce(i.date)}</span>
          </button>
        `)),Dt("ページ",t.pages.map(i=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${Ce(i.path)}"
          >
            <strong>${Ce(i.title)}</strong>
            <span class="table-sub mono">${Ce(i.path)}</span>
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
            value="${Ce(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||o}
          </div>
        </div>
      </div>
    </div>
  `}function mt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function qs(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${mt(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${mt(e.title)}">
        <div class="modal-header">
          <h2>${mt(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${mt(e.placeholder)}"
            value="${mt(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function qt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function mn(e){return e.trim().toLowerCase()}function kl(e,t){const n=mn(t),o=e.filter(l=>n?[l.code,l.name,l.name].map(mn).some(c=>c.includes(n)):!0).slice(0,50),i=o.length?`
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
                      data-code="${qt(l.code)}"
                      data-name="${qt(l.name)}"
                    >
                      <td class="mono">${qt(l.code)}</td>
                      <td>${qt(l.name)}</td>
                      <td>${l.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return qs({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:i,emptyMessage:"該当する得意先が見つかりません。"})}function Pl(e){return e.toISOString().slice(0,10)}function Ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ye(e,t){return e[t]?`<div class="field-error">${Ge(e[t])}</div>`:""}function et(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function El(e,t,n,o){const i=Object.keys(wa).map(u=>`<option value="${u}" ${e.invoiceType===u?"selected":""}>${wa[u]}</option>`).join(""),l=e.lines.map((u,y)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${et(o,`lines.${y}.productCode`,"input-cell")}" type="text" data-line="${y}" data-field="productCode" value="${Ge(u.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${y}" aria-label="商品検索">🔍</button>
          </div>
          ${Ye(o,`lines.${y}.productCode`)}
        </td>
        <td>
          <input class="${et(o,`lines.${y}.productName`,"input-cell")}" type="text" data-line="${y}" data-field="productName" value="${Ge(u.productName)}" placeholder="商品名" />
          ${Ye(o,`lines.${y}.productName`)}
        </td>
        <td>
          <input class="${et(o,`lines.${y}.quantity`,"input-cell numeric")}" type="number" data-line="${y}" data-field="quantity" value="${u.quantity}" min="0" />
          ${Ye(o,`lines.${y}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${y}" data-field="unit" value="${u.unit}" placeholder="本" /></td>
        <td>
          <input class="${et(o,`lines.${y}.unitPrice`,"input-cell numeric")}" type="number" data-line="${y}" data-field="unitPrice" value="${u.unitPrice}" min="0" />
          ${Ye(o,`lines.${y}.unitPrice`)}
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
          <input class="${et(o,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Pl(new Date)}" />
          ${Ye(o,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${et(o,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${Ge(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${Ye(o,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${Ge(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${Ge(e.staffCode)}" />
        </label>
      </div>
      ${Ye(o,"lines")}
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
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${Ge(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function Ll(e){return"¥"+e.toLocaleString("ja-JP")}function Al(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const Cl={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},Dl={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},ql={sake:"酒販用",standard:"通常"};function Il(e,t){return`
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
        <td>${Al(o.quote_date)}</td>
        <td>${o.customer_name||"（未選択）"}</td>
        <td>${o.subject||""}</td>
        <td class="numeric">${Ll(o.total_amount)}</td>
        <td><span class="badge ${Dl[o.status]??"badge-gray"}">${Cl[o.status]??o.status}</span></td>
        <td>${ql[o.template_type]??o.template_type}</td>
        <td>
          <button class="button secondary small" data-open-quote="${o.id}">開く</button>
          <button class="button secondary small danger" data-delete-quote="${o.id}" data-quote-no="${o.quote_no}">削除</button>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}const Is="kanei-quote-settings",Ts=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Vt={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function Sa(){try{const e=localStorage.getItem(Is);if(e)return{...Vt,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Vt,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Vt}}function We(e){localStorage.setItem(Is,JSON.stringify(e))}function Me(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function _e(e,t,n,o="text",i=""){return`<div class="form-row"><label>${t}</label><input type="${o}" id="${e}" value="${Me(n)}" placeholder="${Me(i)}" /></div>`}function Tl(e,t,n,o){const i=o.map(l=>`<option value="${Me(l)}" ${n===l?"selected":""}>${Me(l)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${i}</select></div>`}function Ml(e){return`
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
        ${_e("qs-company-name","会社名",e.companyName)}
        ${_e("qs-company-postal","郵便番号",e.companyPostal,"text","257-0014")}
        ${_e("qs-company-addr1","住所1",e.companyAddress1)}
        ${_e("qs-company-addr2","住所2",e.companyAddress2,"text","建物名等")}
        ${_e("qs-company-tel","電話番号",e.companyTel)}
        ${_e("qs-company-fax","FAX番号",e.companyFax)}
        ${_e("qs-company-email","メール",e.companyEmail,"email")}
        ${_e("qs-company-regno","適格請求書番号",e.companyRegistrationNo,"text","T1234567890123")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>振込口座</h2></div>
      <div class="form-grid-2">
        ${_e("qs-bank-name","銀行名",e.bankName,"text","横浜銀行")}
        ${_e("qs-bank-branch","支店名",e.bankBranch,"text","秦野支店")}
        ${Tl("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
        ${_e("qs-bank-no","口座番号",e.bankAccountNo,"text","1234567")}
        ${_e("qs-bank-holder","口座名義（カナ）",e.bankAccountHolder,"text","カ）カナイシュゾウテン")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>見積書デフォルト設定</h2></div>
      <div class="form-grid-2">
        ${_e("qs-payment-terms","支払条件",e.defaultPaymentTerms,"text","月末締め翌月末払い")}
        ${_e("qs-header-note","書類上部メモ",e.defaultHeaderNote,"text","下記のとおりお見積り申し上げます。")}
        ${_e("qs-footer-note","書類下部メモ",e.defaultFooterNote)}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>カラーテーマ</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;">見積書のアクセントカラーを設定します。プリセットから選ぶか、カスタムカラーを指定してください。</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px;">
        ${Ts.map(t=>`
          <button
            type="button"
            data-action="set-accent-color"
            data-color="${Me(t.value)}"
            title="${Me(t.label)}"
            style="width:36px;height:36px;border-radius:6px;border:3px solid ${e.accentColor===t.value?"#333":"transparent"};background:${Me(t.value)};cursor:pointer;transition:border-color 0.15s;"
          ></button>
        `).join("")}
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
          カスタム
          <input type="color" id="qs-accent-color" value="${Me(e.accentColor||"#0968e5")}" style="width:36px;height:36px;border:none;border-radius:4px;cursor:pointer;padding:2px;" />
        </label>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:12px;color:var(--text-secondary);">現在の色:</span>
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:${Me(e.accentColor||"#0968e5")};border:1px solid rgba(0,0,0,0.15);"></span>
          <code style="font-size:12px;">${Me(e.accentColor||"#0968e5")}</code>
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
  `}function Nl(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function Kt(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:Nl(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}Kt();function W(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ee(e){return"¥"+e.toLocaleString("ja-JP")}function yn(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Ms(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function Ns(e,t,n){return"#"+[e,t,n].map(o=>Math.max(0,Math.min(255,Math.round(o))).toString(16).padStart(2,"0")).join("")}function Gt(e,t){const[n,o,i]=Ms(e);return Ns(n+(255-n)*t,o+(255-o)*t,i+(255-i)*t)}function Rs(e,t){const[n,o,i]=Ms(e);return Ns(n*(1-t),o*(1-t),i*(1-t))}function Rl(e){const t=Rs(e,.15),n=Gt(e,.88),o=Gt(e,.96);return`
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
`}function Ol(e){const t=Rs(e,.15),n=Gt(e,.88),o=Gt(e,.96);return`
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
`}function Os(e,t){const n=e.lines.reduce((C,M)=>C+M.amount,0),o=Math.round(n*e.taxRate/100),i=n+o,l=e.templateType==="sake",c=l?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",p=l?9:6,u=e.lines.map((C,M)=>{const L=l?`<td style="font-size:9px;">${W(C.janCode)}</td><td style="text-align:center;">${C.caseQty??""}</td><td style="text-align:right;">${C.retailPrice!=null?Ee(C.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${M+1}</td>
      <td class="mono" style="font-size:9px;">${W(C.productCode)}</td>
      <td>${W(C.productName)}</td>
      ${L}
      <td style="text-align:right;">${C.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${W(C.unit)}</td>
      <td style="text-align:right;">${Ee(C.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${p}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,y=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),v=y?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${W(y)}</p>
    </div>
  `:"",f=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",x=[];e.validUntil&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${yn(e.validUntil)}</div></div>`),e.paymentTerms&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${W(e.paymentTerms)}</div></div>`),e.deliveryDate&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${W(e.deliveryDate)}</div></div>`),e.deliveryPlace&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${W(e.deliveryPlace)}</div></div>`);const A=x.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min(x.length,4)},1fr);">${x.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <div class="q-meta-box">
      ${e.quoteNo?`<div class="q-meta-item"><span class="q-meta-label">見積番号</span><span class="q-meta-val">${W(e.quoteNo)}</span></div>`:""}
      <div class="q-meta-item"><span class="q-meta-label">見積日</span><span class="q-meta-val">${yn(e.quoteDate)}</span></div>
    </div>
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
        ${f}
      </div>
      ${t.companyPostal?`<p class="q-seller-sub">〒${W(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${W(t.companyAddress1)}${t.companyAddress2?" "+W(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${W(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${W(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${W(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  ${A}

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${Ee(i)}（税込）</span>
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
        ${c}
        <th style="width:42px;">数量</th>
        <th style="width:32px;">単位</th>
        <th style="width:80px;">${l?"納入価格":"単価"}</th>
      </tr>
    </thead>
    <tbody>${u}</tbody>
    <tfoot>
      <tr><td colspan="${p-1}" style="text-align:right;">小計</td><td style="text-align:right;">${Ee(n)}</td></tr>
      <tr><td colspan="${p-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${Ee(o)}</td></tr>
      <tr class="q-total-row"><td colspan="${p-1}" style="text-align:right;">合計</td><td style="text-align:right;">${Ee(i)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${W(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${W(t.defaultFooterNote)}</p>`:""}

  ${v}
</div>`}function Bs(e,t,n,o,i,l,c){const p=e.lines.reduce((C,M)=>C+M.amount,0),u=Math.round(p*e.taxRate/100),y=p+u,v=e.templateType==="sake",f=o.length>=1?t.filter(C=>C.name.includes(o)||C.code.includes(o)).slice(0,8):[],x=i.length>=1?n.filter(C=>C.name.includes(i)||C.code.includes(i)).slice(0,8):[];if(e.previewMode){const C=c.accentColor||"#0968e5";return`
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
        ${Ol(C)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${Os(e,c)}
      </div>
    `}const A=e.lines.map((C,M)=>{const L=v?`
      <td><input type="text" class="jan-input" data-line-idx="${M}" value="${W(C.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${M}" value="${C.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${M}" value="${C.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${W(C.productCode)}</td>
      <td>${W(C.productName)}</td>
      ${L}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${M}" value="${C.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${W(C.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${M}" value="${C.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${Ee(C.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${M}">×</button></td>
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
          ${Ts.map(C=>`
            <button type="button" data-action="set-accent-color" data-color="${W(C.value)}" title="${W(C.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${c.accentColor===C.value?"#333":"transparent"};background:${W(C.value)};cursor:pointer;"></button>
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
        <input type="text" id="q-cust-search" value="${W(o)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${f.length>0?`<div class="search-results">${f.map(C=>`
        <button class="search-item" type="button" data-select-customer="${C.code}" data-cust-name="${W(C.name)}" data-cust-addr="${W(C.address1||"")}">
          <span class="mono">${C.code}</span> ${W(C.name)}
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
        <input type="text" id="q-prod-search" value="${W(i)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${x.length>0?`<div class="search-results">${x.map(C=>{const M=l?Va(C,l):{price:C.salePrice||0,label:"卸価格"},L=C.listPrice||0,s=M.label!=="標準価格"&&M.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${C.code}" data-prod-name="${W(C.name)}" data-prod-price="${M.price}" data-prod-retail="${L}" data-prod-jan="${W(C.janCode??"")}" data-prod-unit="${W(C.unit??"本")}" data-prod-case="${C.caseQty??""}">
          <span class="mono">${C.code}</span> ${W(C.name)}
          <span class="numeric" ${s?'style="color:#2f855a;font-weight:700;"':""}>納入 ${M.price?Ee(M.price):"未設定"} <small>(${M.label})</small>${L?`　定価 ${Ee(L)}`:""}</span>
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
          <tbody>${A}</tbody>
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
  `}async function Bl(e,t){const n=t.accentColor||"#0968e5",o=document.createElement("div");o.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",o.innerHTML=`<style>${Rl(n)}</style>${Os(e,t)}`,document.body.appendChild(o);try{const[{default:i},{jsPDF:l}]=await Promise.all([q(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),q(()=>import("./jspdf.es.min-CO8K0cyr.js").then(C=>C.j),[])]),c=await i(o,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),p=210,u=297,y=c.width/p,v=u*y,f=new l({orientation:"portrait",unit:"mm",format:"a4"});let x=0,A=0;for(;x<c.height;){A>0&&f.addPage();const C=Math.min(v,c.height-x),M=document.createElement("canvas");M.width=c.width,M.height=Math.ceil(C);const L=M.getContext("2d");L.fillStyle="#ffffff",L.fillRect(0,0,M.width,M.height),L.drawImage(c,0,x,c.width,C,0,0,c.width,C);const s=M.toDataURL("image/jpeg",.95),r=C/y;f.addImage(s,"JPEG",0,0,p,r),x+=v,A++}f.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(o)}}function It(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function js(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function zs(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function Fs(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function jl(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function zl(e,t,n,o,i){const l=new Map,c=new Map;for(const v of e){if(v.date>=t&&v.date<=n){const f=l.get(v.productCode);f?(f.amt+=v.amount,f.qty+=v.qty):l.set(v.productCode,{name:v.productName,vol:v.volumeMl,amt:v.amount,qty:v.qty})}v.date>=o&&v.date<=i&&c.set(v.productCode,(c.get(v.productCode)??0)+v.amount)}const p=[...l.entries()].map(([v,f])=>({code:v,...f})).sort((v,f)=>f.amt-v.amt),u=p.reduce((v,f)=>v+f.amt,0);let y=0;return p.map(v=>{y+=v.amt;const f=u>0?Math.round(v.amt*1e4/u)/100:0,x=y<=u*.7?"A":y<=u*.9?"B":"C",A=c.get(v.code)??0,C=A>0?Math.round((v.amt-A)/A*1e3)/10:null;return{code:v.code,name:v.name,volumeMl:v.vol,amount:v.amt,qty:v.qty,sharePct:f,rank:x,prevAmount:A,growthRate:C}})}function Fl(e,t,n){const o=new Date,i=o.toISOString().slice(0,10);let l=i,c=i,p="";switch(e){case"week":{const v=new Date(o);v.setDate(v.getDate()-7),l=v.toISOString().slice(0,10),c=i,p="直近7日間";break}case"month":{l=i.slice(0,7)+"-01",c=i,p="当月";break}case"90days":{const v=new Date(o);v.setDate(v.getDate()-90),l=v.toISOString().slice(0,10),c=i,p="直近90日間";break}case"year":{const v=new Date(o);v.setFullYear(v.getFullYear()-1),l=v.toISOString().slice(0,10),c=i,p="直近1年間";break}case"custom":{l=t||i,c=n||i,p=`${l} 〜 ${c}`;break}}const u=new Date(l);u.setFullYear(u.getFullYear()-1);const y=new Date(c);return y.setFullYear(y.getFullYear()-1),{start:l,end:c,prevStart:u.toISOString().slice(0,10),prevEnd:y.toISOString().slice(0,10),label:p}}function Vl(e,t="all",n=[],o="year",i,l,c=[]){const p=Fl(o,i,l),u=n.length>0?zl(n,p.start,p.end,p.prevStart,p.prevEnd):e.map(r=>({code:r.code,name:r.name,volumeMl:r.volumeMl,amount:r.yearAmount,qty:r.yearQty,sharePct:r.sharePct,rank:r.rank,prevAmount:r.prevAmount,growthRate:r.growthRate})),y=u.filter(r=>r.rank==="A").length,v=u.filter(r=>r.rank==="B").length,f=u.filter(r=>r.rank==="C").length,x=u.filter(r=>r.growthRate!=null&&r.growthRate>10),A=u.filter(r=>r.growthRate!=null&&r.growthRate<-10);let C=u,M="全商品";switch(t){case"A":C=u.filter(r=>r.rank==="A"),M="Aランク";break;case"B":C=u.filter(r=>r.rank==="B"),M="Bランク";break;case"C":C=u.filter(r=>r.rank==="C"),M="Cランク";break;case"growing":C=x,M="成長商品(+10%以上)";break;case"declining":C=A,M="衰退商品(-10%以下)";break}const L=(r,d,m)=>`<button class="button ${t===r?"primary":"secondary"} small" data-product-filter="${r}">${d} (${m})</button>`,s=(r,d)=>`<button class="button ${o===r?"primary":"secondary"} small" data-product-period="${r}">${d}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${s("week","週次")}
        ${s("month","月次")}
        ${s("90days","90日")}
        ${s("year","年間")}
        ${s("custom","指定期間")}
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
        <p class="kpi-value">${v} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${x.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${A.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${M} (${C.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${L("all","全て",u.length)}
        ${L("A","A",y)}
        ${L("B","B",v)}
        ${L("C","C",f)}
        ${L("growing","成長",x.length)}
        ${L("declining","衰退",A.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ee("rank","ABC",c)}
              ${ee("name","商品名",c)}
              ${ee("amount","売上",c,"numeric")}
              ${ee("sharePct","構成比",c,"numeric")}
              ${ee("qty","本数",c,"numeric")}
              ${ee("growthRate","前年同期比",c,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${rt(C,c,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(r=>`
              <tr>
                <td>${zs(r.rank)}</td>
                <td>${r.name?r.name.slice(0,25):r.code}${r.volumeMl?` <small>${r.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${js(r.amount)}</td>
                <td class="numeric">${r.sharePct}%</td>
                <td class="numeric">${r.qty.toLocaleString()}</td>
                <td class="numeric">${Fs(r.growthRate)}</td>
              </tr>
            `).join("")}
            ${C.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Yl(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,o="billing"){const i=e.filter(x=>x.currentRank==="A").length,l=e.filter(x=>x.prevRank&&x.currentRank<x.prevRank).length,c=e.filter(x=>x.prevRank&&x.currentRank>x.prevRank).length,p=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,u=2011,y=[];for(let x=p;x>=u&&y.length<6;x--)y.push(x);const v=`
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;">
      <span style="font-size:13px;color:var(--text-secondary);margin-right:4px;">年度：</span>
      ${y.map(x=>`
        <button class="button ${x===n?"primary":"secondary"} small"
          data-action="efficiency-year-change" data-year="${x}"
          style="min-width:80px;">
          ${x}年度
        </button>
      `).join("")}
      <select data-action="efficiency-year-select"
        style="margin-left:8px;padding:4px 8px;border-radius:4px;border:1px solid var(--border);background:var(--surface);font-size:13px;">
        <option value="">過去年度…</option>
        ${Array.from({length:p-u+1},(x,A)=>p-A).filter(x=>!y.includes(x)).map(x=>`<option value="${x}" ${x===n?"selected":""}>${x}年度</option>`).join("")}
      </select>
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
        <p class="kpi-value">${l} ${o==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${c} ${o==="billing"?"社":"店舗"}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>${o==="billing"?"得意先":"店舗（納品先）"}ABC分析（${n}年度・4月〜翌3月）</h2></div>
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
            ${rt(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(x=>`
              <tr>
                <td>${zs(x.currentRank)}</td>
                <td>${x.name||x.code}</td>
                <td class="numeric">${js(x.yearAmount)}</td>
                <td class="numeric">${x.sharePct}%</td>
                <td class="numeric">${x.orderDays}日</td>
                <td class="numeric">${Fs(x.growthRate)}</td>
                <td>${jl(x.currentRank,x.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ul(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Yt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Jl(e,t,n=null,o=null){const i=e.length?e.map(l=>`
            <tr class="clickable-row${l.documentNo===n?" selected-row":""}"
                data-doc-no="${l.documentNo}">
              <td class="mono">${l.documentNo}</td>
              <td>${Ul(l.date)}</td>
              <td>
                <div class="table-title">${l.customerName}</div>
                <div class="table-sub mono">${l.customerCode}</div>
              </td>
              <td class="numeric">${l.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Yt(l.amount)}</td>
            </tr>
            ${l.documentNo===n?Ql(o):""}
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
          <span>得意先コード</span>
          <input id="invoice-customer-code" type="text" value="${t.customerCode}" placeholder="160982" />
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
          <tbody>${i}</tbody>
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
  `}function Ql(e){if(!e)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(o=>`
      <tr>
        <td class="mono" style="width:40px">${o.lineNo}</td>
        <td class="mono" style="width:70px">${o.productCode}</td>
        <td class="product-name">${o.productName}</td>
        <td class="numeric" style="width:50px">${o.quantity}</td>
        <td class="numeric" style="width:80px">${Yt(o.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Yt(o.amount)}</td>
      </tr>`).join(""),n=e.reduce((o,i)=>o+i.amount,0);return`<tr class="line-detail-row"><td colspan="5">
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
            <td class="numeric">${Yt(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function Hl(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Kl(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function Vs(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function Ys(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function hn(e){const t=Vs(Ys(e),6);return t.setHours(23,59,59,999),t}function gn(e){return new Date(`${e}T00:00:00`)}function fn(e){return`${e.getMonth()+1}/${e.getDate()}`}function Gl(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Wl(){const e=new Date,t=Ys(Kl(Hl(e),-3)),n=hn(new Date(e.getFullYear(),e.getMonth()+4,0)),o=[];let i=new Date(t);for(;i<=n;){const l=hn(i);o.push({start:new Date(i),end:l,label:`${fn(i)} - ${fn(l)}`}),i=Vs(i,7)}return o}function Xl(e){const t=Wl(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,o=t.map(l=>`
        <div class="gantt-week">
          <span>${l.label}</span>
        </div>
      `).join(""),i=e.length?e.map(l=>{const c=gn(l.startDate),p=gn(l.expectedDoneDate),u=Math.max(0,t.findIndex(f=>f.end>=c)),y=Math.max(u,t.reduce((f,x,A)=>x.start<=p?A:f,u)),v=[`仕込番号: ${l.jikomiNo}`,`銘柄: ${l.productName}`,`期間: ${l.startDate} - ${l.expectedDoneDate}`,`タンク: ${l.tankNo}`,`備考: ${l.note||"なし"}`].join(`
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
                  title="${Gl(v)}"
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
        ${i}
      </div>
    </section>
  `}function vn(e,t){const n={planned:"neutral",active:"warning",done:"success"},o=e.map(p=>`
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
          <span class="status-pill ${n[p.status]}">${ls[p.status]}</span>
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
          <tbody>${o||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Zl(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},o=e.map(u=>`
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
          <tbody>${o||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ec(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function tc(e,t){return`
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
        ${e?`<p class="field-error">${ec(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function ac(e){return`
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
  `}function nc(e){return`
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
  `}const Ga={query:"",businessType:"",tradeType:"",areaCode:"",activeOnly:"",page:1},$t=50;function sc(e,t){let n=e;if(t.query){const p=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(p)||u.name.toLowerCase().includes(p)||u.kanaName&&u.kanaName.toLowerCase().includes(p)||u.address1&&u.address1.toLowerCase().includes(p)||u.phone&&u.phone.toLowerCase().includes(p))}t.businessType&&(n=n.filter(p=>p.businessType===t.businessType)),t.tradeType&&(n=n.filter(p=>p.tradeType===t.tradeType)),t.areaCode&&(n=n.filter(p=>p.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(p=>p.isActive):t.activeOnly==="inactive"&&(n=n.filter(p=>!p.isActive));const o=Math.max(1,Math.ceil(n.length/$t)),l=(Math.min(t.page,o)-1)*$t,c=n.slice(l,l+$t);return{filtered:n,paged:c,totalPages:o}}function bn(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const o=(t-1)*$t+1,i=Math.min(t*$t,e),l=[];for(let c=1;c<=n;c++)c===1||c===n||c>=t-2&&c<=t+2?l.push(`<button class="button ${c===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${c}" style="min-width:36px;padding:4px 8px;">${c}</button>`):(c===t-3||c===t+3)&&l.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${o}-${i} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${l.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function oc(e,t){const n=[...new Set(e.map(i=>i.businessType).filter(Boolean))].sort(),o=[...new Set(e.map(i=>i.areaCode).filter(Boolean))].sort();return`
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
      <div class="form-group" style="min-width:120px;">
        <label class="form-label">取引区分</label>
        <select id="master-trade-type" class="form-input">
          <option value="">すべて</option>
          ${Object.entries(ic).map(([i,l])=>`<option value="${i}" ${t.tradeType===i?"selected":""}>${l}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">地区</label>
        <select id="master-area-code" class="form-input">
          <option value="">すべて</option>
          ${o.map(i=>`<option value="${i}" ${t.areaCode===i?"selected":""}>${i}</option>`).join("")}
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
  `}function ka(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function rc(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}const ic={B2B:"B2B（卸）",B2B2C:"B2B2C（生産者）",B2C:"B2C（小売）"};function lc(e){return e?`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${{B2B:"#3b82f6",B2B2C:"#8b5cf6",B2C:"#10b981"}[e]??"#999"};">${e}</span>`:"―"}function cc(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${lc(t.tradeType)}</td>
          <td>${rc(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${ka(t.address1||"",16)}</td>
          <td>${ka(t.address2||"",12)}</td>
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
      `).join("")}function Tt(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function dc(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${ka(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${Tt(t.purchasePrice)}</td>
          <td class="numeric">${Tt(t.salePrice)}</td>
          <td class="numeric">${Tt(t.listPrice)}</td>
          <td class="numeric">${Tt(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function pc(e,t,n=Ga,o=[]){const{filtered:i,paged:l,totalPages:c}=sc(e.customers,n);return`
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
        ${oc(e.customers,n)}
        ${bn(i.length,n.page,c)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${ee("code","コード",o)}
                ${ee("name","得意先名",o)}
                ${ee("kanaName","カナ",o)}
                <th>略称</th>
                ${ee("businessType","業態",o)}
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
                ${ee("areaName","地区",o)}
                ${ee("closingDay","締日",o,"numeric")}
                ${ee("paymentDay","支払日",o,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${cc(rt(l,o,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${bn(i.length,n.page,c)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${ee("code","コード",o)}
                ${ee("name","商品名",o)}
                <th>カナ</th>
                ${ee("category","分類",o)}
                <th>酒税区分</th>
                ${ee("alcoholDegree","度数",o,"numeric")}
                ${ee("volumeMl","容量ml",o,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${ee("purchasePrice","生産者価格",o,"numeric")}
                ${ee("salePrice","卸価格",o,"numeric")}
                ${ee("listPrice","定価(小売)",o,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${dc(rt(e.products,o,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function ia(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function uc(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${Ss.map(o=>`<option ${n?.materialType===o?"selected":""}>${o}</option>`).join("")}
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
  `}function mc(e){const t=e.map(i=>{const c=(i.minimumStock>0?i.currentStock/i.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${i.code}</td>
          <td>${i.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${i.currentStock.toLocaleString("ja-JP")} ${i.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${i.minimumStock.toLocaleString("ja-JP")} ${i.unit}</td>
          <td class="numeric">${ia(i.unitCost)}</td>
          <td class="numeric">${ia(i.currentStock*i.unitCost)}</td>
          <td>${i.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${i.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(i=>i.minimumStock>0&&i.currentStock/i.minimumStock<1.5).length,o=e.reduce((i,l)=>i+l.currentStock*l.unitCost,0);return`
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
        <p class="kpi-value">${ia(o)}</p>
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
  `}function yc(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function la(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const hc={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function gc(e){return`
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
          <td class="numeric">${la(n.billedAmount)}</td>
          <td class="numeric">${la(n.paymentAmount)}</td>
          <td class="numeric">${la(n.balanceAmount)}</td>
          <td>${yc(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${hc[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function tt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function wn(e){return e.trim().toLowerCase()}function fc(e,t){const n=wn(t),o=e.filter(l=>n?[l.code,l.name,l.janCode].map(wn).some(c=>c.includes(n)):!0),i=o.length?`
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
                      data-code="${tt(l.code)}"
                      data-name="${tt(l.name)}"
                    >
                      <td class="mono">${tt(l.code)}</td>
                      <td>${tt(l.name)}</td>
                      <td class="mono">${tt(l.janCode)}</td>
                      <td>${tt(l.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return qs({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:i,emptyMessage:"該当する商品が見つかりません。"})}function Ue(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function vc(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},o={pending:"warning",confirmed:"neutral",paid:"success"},i={unpaid:"未払い",partial:"一部支払",paid:"支払済"},l={unpaid:"warning",partial:"neutral",paid:"success"},c=e.map(f=>`
      <tr>
        <td class="mono">${f.documentNo}</td>
        <td>${f.purchaseDate}</td>
        <td class="mono">${f.supplierCode}</td>
        <td>${f.supplierName}</td>
        <td>${f.itemName}</td>
        <td class="numeric">${f.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${Ue(f.unitPrice)}</td>
        <td class="numeric"><strong>${Ue(f.amount)}</strong></td>
        <td>
          <span class="status-pill ${o[f.status]}">${n[f.status]}</span>
        </td>
      </tr>
    `).join(""),p=t.map(f=>`
      <tr>
        <td class="mono">${f.supplierCode}</td>
        <td>${f.supplierName}</td>
        <td class="numeric">${Ue(f.totalPurchase)}</td>
        <td class="numeric">${Ue(f.paidAmount)}</td>
        <td class="numeric"><strong>${Ue(f.balance)}</strong></td>
        <td>${f.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${l[f.status]}">${i[f.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${f.supplierCode}" ${f.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),u=e.reduce((f,x)=>f+x.amount,0),y=t.reduce((f,x)=>f+x.balance,0),v=t.filter(f=>f.status!=="paid").length;return`
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
        <p class="kpi-value">${Ue(u)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${Ue(y)}</p>
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
  `}function yt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function bc(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},o={holding:"neutral",due:"warning",cleared:"success"},i=e.map(v=>`
      <tr>
        <td class="mono">${v.billNo}</td>
        <td>${v.supplierName}</td>
        <td class="numeric">${yt(v.amount)}</td>
        <td>${v.issueDate}</td>
        <td>${v.dueDate}</td>
        <td>
          <span class="status-pill ${o[v.status]}">${n[v.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${v.id}" ${v.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),l=t.map(v=>{const f=v.minimumStock>0&&v.currentStock<v.minimumStock*1.2;return`
        <tr>
          <td class="mono">${v.code}</td>
          <td>${v.name}</td>
          <td class="numeric ${f?"text-danger":""}">
            ${v.currentStock.toLocaleString("ja-JP")} ${v.unit}
            ${f?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${v.minimumStock.toLocaleString("ja-JP")} ${v.unit}</td>
          <td class="numeric">${yt(v.unitCost)}</td>
          <td class="numeric">${yt(v.currentStock*v.unitCost)}</td>
          <td>${v.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=e.filter(v=>v.status==="holding"),p=c.reduce((v,f)=>v+f.amount,0),u=t.reduce((v,f)=>v+f.currentStock*f.unitCost,0),y=t.filter(v=>v.minimumStock>0&&v.currentStock<v.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${yt(p)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${yt(u)}</p>
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
  `}function Pa(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function xe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ea(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${xe(e)}</pre>
    </div>
  `}function wc(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function Mt(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${xe(e)}</code>
      ${wc(e)}
    </div>
  `}function at(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${xe(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${xe(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${xe(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?Ea(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${xe(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${xe(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function Nt(e){return`
    <div class="setup-step setup-step-compact" data-step="${xe(e.stepLabel)}">
      <h3>${xe(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${xe(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function Rt(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function xn(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function xc(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?Pa(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Rt(e.lastOverallSync)}">${xn(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${Rt(e.lastOverallSync)==="success"?"1時間以内":Rt(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${xe(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?Pa(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Rt(t.lastSyncAt)}">${xn(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function $c(e,t,n,o){const i={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${o?xc(o):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${Pa(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${i[e.status]}</span>
        </p>
        <p class="kpi-sub">${xe(e.message)}</p>
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
      ${Nt({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${Mt("git --version")}
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
      ${Nt({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${Mt("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${Nt({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${Mt("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${Mt("python get-pip.py")}
        `})}
      ${Nt({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${at({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${at({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${at({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${at({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${at({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${at({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${Ea(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${Ea(`{
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
            <span class="config-value">${xe(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${xe(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${xe(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${xe(n)}"
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
  `}function bt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function _c(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function Sc(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(f=>f.amount),1),o=28,i=6,l=140,c=100,p=760,u=p-l-c,y=t.length*(o+i)+16,v=t.map((f,x)=>{const A=f.amount/n*u,C=x*(o+i)+8,M=f.abcRank==="A"?"#2F855A":f.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${l-8}" y="${C+o/2+5}" class="chart-axis" text-anchor="end">${f.name.length>10?f.name.slice(0,10)+"…":f.name}</text>
          <rect x="${l}" y="${C}" width="${A}" height="${o}" rx="4" fill="${M}" opacity="0.85" />
          <text x="${l+A+8}" y="${C+o/2+5}" class="chart-axis">${(f.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${p} ${y}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${v}
    </svg>
  `}function kc(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(o=>`<th class="numeric">${o}</th>`).join(""),n=e.monthlyByCustomer.map(o=>{const i=o.values.reduce((c,p)=>c+p,0),l=o.values.map(c=>`<td class="numeric">${c>0?(c/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${o.label}</td>
          ${l}
          <td class="numeric"><strong>${bt(i)}</strong></td>
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
  `}function Pc(e){e.ranking.reduce((u,y)=>u+y.amount,0);const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,o=e.ranking.filter(u=>u.abcRank==="C").length,i=e.ranking.filter(u=>u.abcRank==="A").reduce((u,y)=>u+y.amount,0),l=e.ranking.filter(u=>u.abcRank==="B").reduce((u,y)=>u+y.amount,0),c=e.ranking.filter(u=>u.abcRank==="C").reduce((u,y)=>u+y.amount,0),p=e.ranking.map(u=>`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric">${bt(u.amount)}</td>
          <td class="numeric">${u.ratio.toFixed(1)}%</td>
          <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${_c(u.abcRank)}">${u.abcRank}</span></td>
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
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${bt(i)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${bt(l)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${o}社 <span class="kpi-sub">${bt(c)}</span></div>
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
        ${Sc(e.ranking)}
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
      ${kc(e)}
    </section>
  `}const Ec={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},$n={amount:"売上額",quantity:"出荷本数",volume:"移出量"},La=10;function Wa(e){const[t,n]=e.split("-").map(Number);return n>=La?t:t-1}function Lc(e){const t=La-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(La).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function Ac(e,t,n){const o=c=>t==="quantity"?c.quantity:t==="volume"?c.volumeMl:c.amount,i=new Map;for(const c of e){const p=n==="fiscal"?`${Wa(c.month)}年度`:c.month.slice(0,4);i.set(p,(i.get(p)??0)+o(c))}return{curr:[...i.entries()].sort((c,p)=>c[0].localeCompare(p[0])).map(([c,p])=>({month:c,amount:p}))}}function Cc(e){const t=new Set;for(const n of e)t.add(Wa(n.month));return[...t].sort((n,o)=>o-n).map(String)}function it(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Dc(e){return e.replace("-","/")}const _n={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function qc(e,t="#0F5B8D",n=[],o="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const i=n.length>0&&n.some(r=>r.amount>0),l=760,c=280,p={top:16,right:24,bottom:36,left:o==="amount"?64:56},u=l-p.left-p.right,y=c-p.top-p.bottom,v=[...e.map(r=>r.amount),...n.map(r=>r.amount)],f=Math.max(...v,1),x=u/e.length;function A(r){if(o==="quantity")return r>=1e4?`${(r/1e4).toFixed(1)}万本`:`${Math.round(r).toLocaleString()}本`;if(o==="volume"){const d=r/1e3;return d>=1e4?`${(d/1e3).toFixed(0)}kL`:`${Math.round(d).toLocaleString()} L`}return`${Math.round(r/1e4).toLocaleString("ja-JP")}万円`}function C(r){return o==="quantity"?`${r.toLocaleString()}本`:o==="volume"?aa(r):it(r)}const M=[0,.25,.5,.75,1].map(r=>{const d=p.top+y-y*r,m=A(f*r);return`<g>
        <line x1="${p.left}" y1="${d}" x2="${l-p.right}" y2="${d}" class="chart-grid" />
        <text x="4" y="${d+4}" class="chart-axis">${m}</text>
      </g>`}).join(""),L=e.map((r,d)=>{const m=i?Math.max((x-18)/2,10):Math.max(x-18,24),h=i?2:0,b=p.left+d*x+(x-(i?m*2+h:m))/2,w=r.amount/f*y,$=p.top+y-w,_=n[d]?.amount??0,k=_/f*y,P=p.top+y-k,E=i?`<rect x="${b}" y="${P}" width="${m}" height="${k}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${C(_)}</title></rect>`:"",I=i?b+m+h:b;return`<g>
      ${E}
      <rect x="${I}" y="${$}" width="${m}" height="${w}" rx="4" fill="${t}" opacity="${.6+d/e.length*.35}"><title>${C(r.amount)}</title></rect>
      <text x="${p.left+d*x+x/2}" y="${c-8}" class="chart-axis centered-axis">${Dc(r.month)}</text>
    </g>`}).join(""),s=i?`
    <g transform="translate(${l-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${l} ${c}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${M}${L}${s}
    </svg>
  `}function aa(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function Ic(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(o=>`
    <tr>
      <td class="mono">${o.code}</td>
      <td>${o.name}</td>
      <td class="numeric">${it(o.amount)}</td>
      <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${aa(o.volumeMl)}</td>
      <td class="numeric">${o.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${o.code}" data-drilldown-name="${o.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function Tc(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${it(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${aa(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function Sn(e,t,n){const o=t?e.filter(l=>l.tag.includes(t)||l.name.includes(t)):e,i=o.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':o.map(l=>`
        <tr>
          <td class="mono">${l.code||"―"}</td>
          <td>${l.name||"未設定"}</td>
          <td class="mono">${l.tag||"―"}</td>
          <td class="numeric">${it(l.amount)}</td>
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
  `}function Us(e,t,n="all",o="",i=[],l=[],c="",p="",u=null,y="all",v="",f=[],x=[],A=[],C=null,M=[],L=[],s="amount",r="calendar"){const d=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",m=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,b=n!=="all"&&i.length>0&&t!=="staff"?i:m,w=rt(b,A,Ec),$={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},_=$n[s],k=Q=>s==="quantity"?Q.quantity:s==="volume"?Q.volumeMl:Q.amount,P=Q=>s==="quantity"?`${Q.toLocaleString()}本`:s==="volume"?aa(Q):it(Q);let E,I=[],T,O,N;if(C&&C.monthlySales.length>0)E=C.monthlySales.slice(-24).map(Q=>({month:Q.month,amount:k(Q)})),T=`${C.name} の月別${_}`,O=`${C.tab==="customers"?"得意先":"商品"}: ${C.code}`,N="#0968e5";else if(M.length>0&&n!=="all"){E=M.map(U=>({month:U.month,amount:k(U)})),I=L.map(U=>({month:U.month,amount:k(U)}));const Q=E.reduce((U,K)=>U+K.amount,0),le=I.reduce((U,K)=>U+K.amount,0),oe=le>0?(Q-le)/le*100:0,ce=oe>0?"+":"";T=`${$[n]} ${_}（${o}）`,O=`${P(Q)}${le>0?` / 前年比 ${ce}${oe.toFixed(1)}%`:""}`,N="#2f855a"}else{E=Ac(e.monthlySales,s,r).curr,I=[];const le=E.reduce((ce,U)=>ce+U.amount,0);T=`${r==="fiscal"?"決算年度別":"暦年別"}${_}`,O=`累計 ${P(le)}（${E.length}${r==="fiscal"?"期":"年"}）`,N="#0F5B8D"}const j=["amount","quantity","volume"].map(Q=>`<button class="tab-button ${Q===s?"active":""}" data-chart-metric="${Q}">${$n[Q]}</button>`).join(""),F=["all","yearly","monthly","weekly","daily"].map(Q=>`<button class="button ${Q===n?"primary":"secondary"} small" type="button" data-analytics-period="${Q}">${_n[Q]}</button>`).join(""),z=r==="fiscal"&&n==="yearly"?Cc(e.monthlySales):l,Y=r==="fiscal"&&n==="yearly"&&!z.includes(o)?z[0]??"":o,H=n!=="all"&&z.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${z.map(Q=>`<option value="${Q}" ${Q===Y?"selected":""}>${r==="fiscal"&&n==="yearly"?Q+"年度":Q}</option>`).join("")}
      </select>`:"";let G="",J="";if(t==="staff"){const Q=["all","yearly","monthly","weekly","daily"].map(K=>`<button class="button ${K===y?"primary":"secondary"} small" type="button" data-staff-period="${K}">${_n[K]}</button>`).join(""),le=y!=="all"&&f.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${f.map(K=>`<option value="${K}" ${K===v?"selected":""}>${K}</option>`).join("")}
        </select>`:"",ce=(x.length>0?x:e.staffTotals).filter(K=>!c||K.name.includes(c)||K.code.includes(c)),U=y!=="all"&&v?` (${v})`:"";if(G=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${Q}</div>
        ${le}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${c}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
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
            ${ce.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':ce.map(K=>`
                <tr>
                  <td class="mono">${K.code||"―"}</td>
                  <td>${K.name||"未設定"}</td>
                  <td class="numeric">${it(K.amount)}</td>
                  <td class="numeric">${K.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${K.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${K.code}" data-staff-name="${K.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const K=u.breakdownTab,X=y!=="all"&&v?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${v}</span>`:"";J=`
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
              <button class="tab-button ${K==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${K==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${p}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${K==="customers"?Sn(u.customerRows,p,"得意先名"):Sn(u.productRows,p,"商品名")}
        </article>
      `}}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group" style="font-size:12px;">
          <button class="tab-button ${r==="calendar"?"active":""}" data-fiscal-mode="calendar">暦年（1〜12月）</button>
          <button class="tab-button ${r==="fiscal"?"active":""}" data-fiscal-mode="fiscal">決算期（10〜9月）</button>
        </div>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <h2>${T}</h2>
            <p class="panel-caption">${O}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${j}</div>
            ${C?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${qc(E,N,I,s)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${d}</h2>
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
            ${H}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${ee("code","コード",A,"mono")}
                  ${ee("name","名称",A)}
                  ${ee("amount","売上額",A,"numeric")}
                  ${ee("quantity","本数",A,"numeric")}
                  ${ee("volumeMl","移出量",A,"numeric")}
                  ${ee("documents","伝票数",A,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${Ic(w,!0)}</tbody>
            </table>
          </div>
        `:G}
      </article>
    </section>

    ${C?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${C.name} の${C.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${C.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${C.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${Tc(C.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${J}
  `}const kn=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:Lc,monthToFiscalYear:Wa,renderSalesAnalytics:Us},Symbol.toStringTag,{value:"Module"}));function ht(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Mc(e){const t=Math.max(...e.salesByProduct.flatMap(l=>l.values),1),n=e.salesByProduct.map(l=>{const c=l.values.map((p,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(p/t*120)}px" title="${e.months[u]}: ${ht(p)}"></div>
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
        <td class="numeric">${ht(l.costPrice)}</td>
        <td class="numeric">${ht(l.sellPrice)}</td>
        <td class="numeric">${ht(l.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${l.marginRate>=40?"success":"warning"}">${l.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),i=e.salesByCustomer.map(l=>{const c=l.values.reduce((p,u)=>p+u,0);return`
        <tr>
          <td>${l.label}</td>
          ${l.values.map(p=>`<td class="numeric">${(p/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${ht(c)}</strong></td>
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
          <tbody>${o}</tbody>
        </table>
      </div>
    </section>
  `}function Nc(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Rc(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Pn(e){return e.toISOString().slice(0,10)}function Oc(e,t,n){const o=e.length?e.map(i=>`
            <tr>
              <td class="mono">${i.documentNo}</td>
              <td>${Nc(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${Rc(i.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||Pn(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||Pn(new Date)}" />
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
  `}function Ot(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Bc(e,t,n,o){const i={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},l={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},p=e.map(f=>`
      <tr>
        <td>${f.saleTime}</td>
        <td class="mono">${f.productCode}</td>
        <td>${f.productName}</td>
        <td class="numeric">${f.quantity}</td>
        <td class="numeric">${Ot(f.unitPrice)}</td>
        <td class="numeric"><strong>${Ot(f.amount)}</strong></td>
        <td>${i[f.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(f=>`
      <tr>
        <td class="mono">${f.orderNo}</td>
        <td>${f.orderDate}</td>
        <td>${f.customerName}</td>
        <td>${f.postalCode} ${f.address}</td>
        <td>${f.items.map(x=>`${x.productName} ×${x.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Ot(f.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[f.status]}">${l[f.status]}</span>
        </td>
        <td>${f.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${f.id}">詳細</button>
        </td>
      </tr>
    `).join(""),y=e.reduce((f,x)=>f+x.amount,0),v=t.filter(f=>f.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${Ot(y)}</p>
        <p class="kpi-sub">${e.length} 件 / ${o}</p>
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
  `}const ca={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},jc={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function zc(e,t,n,o){const i=jc[e],l=Object.keys(ca).map(p=>`
      <button class="tab-button ${e===p?"active":""}" data-import-entity="${p}">
        ${ca[p]}
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
        <h2>${ca[e]} のCSV形式</h2>
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

    ${o?`<section class="panel"><p class="sync-message">${o}</p></section>`:""}
  `}const ue={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function Fc(e,t,n){const o=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:ue.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:ue.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:ue.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:ue.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:ue.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:ue.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:ue.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:ue.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:ue.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:ue.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:ue.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:ue.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:ue.date}];e.lines.slice(0,6).forEach((c,p)=>{const u=33+p*8.5;o.push({id:`line${p}_name`,label:`明細${p+1} 品名`,x:5,y:u,fontSize:7.5,value:c.productName+(c.spec?` ${c.spec}`:""),color:ue.detail},{id:`line${p}_code`,label:`明細${p+1} CD`,x:64,y:u,fontSize:7.5,value:c.productCode,color:ue.detail},{id:`line${p}_qty`,label:`明細${p+1} 数量`,x:124,y:u,fontSize:8,value:c.quantity>0?String(c.quantity):"",color:ue.detail},{id:`line${p}_price`,label:`明細${p+1} 原単価`,x:163,y:u,fontSize:8,value:c.unitPrice>0?c.unitPrice.toLocaleString("ja-JP"):"",color:ue.detail},{id:`line${p}_amount`,label:`明細${p+1} 原価金額`,x:176,y:u,fontSize:8,value:c.amount>0?c.amount.toLocaleString("ja-JP"):"",color:ue.detail},{id:`line${p}_retail`,label:`明細${p+1} 売単価`,x:193,y:u,fontSize:8,value:c.retailPrice?c.retailPrice.toLocaleString("ja-JP"):"",color:ue.detail})});const i=e.lines.reduce((c,p)=>c+(p.amount||0),0),l=e.lines.reduce((c,p)=>c+p.quantity,0);return o.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(l),color:ue.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:i.toLocaleString("ja-JP"),color:ue.total}),n&&o.forEach(c=>{const p=n[c.id];p&&(c.x=p.x,c.y=p.y)}),o}function Vc(e,t,n,o,i){const c=Fc(e,t,o).map(u=>`
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
  `}function da(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const o=n.dataset.fdId??"",i=parseFloat(n.style.left)||0,l=parseFloat(n.style.top)||0;t[o]={x:i,y:l}}),t}function Yc(e,t,n){const o=[...new Set(e.map(x=>x.areaCode).filter(Boolean))].sort(),i=[...new Set(e.map(x=>x.businessTypeName||x.businessType).filter(Boolean))].sort(),l=e.filter(x=>x.isAtRisk),c=e.filter(x=>!x.isAtRisk&&x.isDormant),p=e.filter(x=>!x.isAtRisk&&!x.isDormant&&x.amount12m>0),u=e.filter(x=>!x.isAtRisk&&!x.isDormant&&x.amount12m===0),y=t.filter(x=>x.lat&&x.lng),v=JSON.stringify(e),f=JSON.stringify(y.map(x=>({name:x.name,address:x.address,lat:x.lat,lng:x.lng,phone:x.phone})));return`
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
        ${o.map(x=>`<option value="${x}" ${n.filterArea===x?"selected":""}>${x}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${i.map(x=>`<option value="${x}" ${n.filterBiz===x?"selected":""}>${x}</option>`).join("")}
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
    <\/script>`}const Uc={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},Jc=["new","picking","packed","shipped","delivered"];function Qc(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(l=>t[l.stage].push(l));const n=Jc.map(l=>{const c=Uc[l],p=t[l];return`
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
    `}).join(""),o=e.reduce((l,c)=>l+c.totalAmount,0),i=e.filter(l=>l.priority==="urgent").length;return`
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
  `}function Hc(e,t,n){const o=e.cart.reduce((l,c)=>l+c.amount,0);return`
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

      ${Kc(e,t,n)}
    </div>
  `}function Kc(e,t,n){if(e.step==="customer"){const o=e.customerQuery.toLowerCase(),i=o?t.filter(l=>l.name.toLowerCase().includes(o)||l.code.toLowerCase().includes(o)):t.slice(0,20);return`
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
    `}if(e.step==="products"){const o=e.productQuery.toLowerCase(),i=o?n.filter(l=>l.name.toLowerCase().includes(o)||l.code.toLowerCase().includes(o)):n.slice(0,30);return`
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
          ${e.cart.map((o,i)=>`
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${o.productName}</div>
                <div class="mo-item-sub">${o.quantity} × ¥${o.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${o.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${i}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${e.cart.reduce((o,i)=>o+i.amount,0).toLocaleString("ja-JP")}</strong>
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
  `}const En={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},Ln={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},An={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function Gc(e,t){const n=e.find(l=>l.id===t)??e[0],o=e.filter(l=>l.status==="new").length,i=e.filter(l=>l.status==="confirmed").length;return`
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
                <span class="status-pill ${Ln[l.status]}">${En[l.status]}</span>
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
            <span class="status-pill ${Ln[n.status]}">${En[n.status]}</span>
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
  `}const Wc=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,Xc=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Zc(e,t){const n=t?e.find(i=>i.id===t):null,o=t==="__new__";return`
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
  `}function ed(e,t,n,o){const[i,l]=t.split("-").map(h=>parseInt(h,10)),c=new Date(i,l-1,1),p=new Date(i,l,0),u=c.getDay(),y=p.getDate(),v=[];for(let h=0;h<u;h++)v.push({isOutside:!0});for(let h=1;h<=y;h++)v.push({date:new Date(i,l-1,h)});for(;v.length%7!==0;)v.push({isOutside:!0});const f=n?e.filter(h=>h.category===n):e,x={};f.forEach(h=>{const b=h.startsAt.slice(0,10);x[b]??=[],x[b].push(h)});const A=new Date().toISOString().slice(0,10),C=v.map(h=>{if(h.isOutside)return'<div class="cal-cell cal-outside"></div>';const b=h.date,w=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}-${String(b.getDate()).padStart(2,"0")}`,$=x[w]??[],_=w===A,k=b.getDay();return`
        <div class="cal-cell ${_?"cal-today":""} ${k===0?"cal-sun":k===6?"cal-sat":""}"
             data-cal-date="${w}">
          <div class="cal-day-num">${b.getDate()}</div>
          <div class="cal-events">
            ${$.slice(0,3).map(P=>`
              <button class="cal-event" data-cal-event-id="${P.id}"
                      style="background:${P.color||Qa[P.category]||"#0F5B8D"};"
                      title="${P.title}">
                <span class="cal-event-time">${P.isAllDay?"終日":new Date(P.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${P.title}</span>
              </button>
            `).join("")}
            ${$.length>3?`<button class="cal-event-more" data-cal-date="${w}">+${$.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),M=o?.isOpen?td(o):"",L=new Date(i,l-2,1),s=new Date(i,l,1),r=`${L.getFullYear()}-${String(L.getMonth()+1).padStart(2,"0")}`,d=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}`,m=(()=>{const h=new Date;return`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`})();return`
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
          <button class="button secondary" data-action="cal-prev" data-ym="${r}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${m}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${d}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(Ja).map(([h,b])=>`<option value="${h}" ${n===h?"selected":""}>${b}</option>`).join("")}
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
        ${C}
      </div>
    </section>

    ${M}
  `}function td(e){const t=e.event;return`
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
                ${Object.entries(Ja).map(([n,o])=>`<option value="${n}" ${t.category===n?"selected":""}>${o}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?Cn(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?Cn(t.endsAt):""}" />
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
  `}function Cn(e){const t=new Date(e),n=o=>String(o).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const gt={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function ad(e,t){const n=t?e.find(o=>o.id===t):null;return`
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
        <p class="form-hint">${gt[n.provider]?.description??""}</p>
        ${gt[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${gt[n.provider].setupUrl}" target="_blank">${gt[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(gt[n.provider]?.fields??[]).map(o=>`
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
  `}function nd(e,t){const n=e.reduce((l,c)=>l+c.totalAmount,0),o=e.filter(l=>l.financialStatus==="paid").length,i=e.filter(l=>l.fulfillmentStatus!=="fulfilled"&&l.fulfillmentStatus!=="shipped").length;return`
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
  `}function sd(e,t,n){return`
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
  `}function od(e,t,n){const o=t==="__new__"?null:e.find(c=>c.id===t),i=t==="__new__";return n?.role==="admin"?`
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
                <td>${Qt[c.department]}</td>
                <td>${Jt[c.role]}</td>
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

    ${o||i?`
      <section class="panel">
        <div class="panel-header">
          <h2>${i?"新規ユーザー":`${o?.displayName} 編集`}</h2>
        </div>
        ${i?'<p class="form-hint">新規ユーザーを追加するとSupabase Authに登録され、初期パスワードでログインできます。</p>':""}
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 *</span>
            <input id="user-name" type="text" value="${o?.displayName??""}" placeholder="金井 太郎" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス *</span>
            <input id="user-email" type="email" value="${o?.email??""}" placeholder="taro@kaneishuzo.co.jp" ${o?"readonly":""} />
          </label>
          ${i?`<label class="field" style="flex:1 1 200px;">
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
              ${Object.entries(Qt).map(([c,p])=>`<option value="${c}" ${o?.department===c?"selected":""}>${p}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Jt).map(([c,p])=>`<option value="${c}" ${o?.role===c?"selected":""}>${p}</option>`).join("")}
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
    `}function rd(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${Qt[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Jt[e.role]}</dd></div>
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
    `}function id(e){const t={};return e.forEach(n=>{const o=n.userEmail??"(anonymous)";t[o]=(t[o]??0)+1}),`
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
  `}function ld(e){const t=e.prospects.reduce((l,c)=>l+c.expectedAmount,0),n=e.prospects.reduce((l,c)=>l+c.expectedAmount*c.probability/100,0),o=e.prospects.filter(l=>l.stage==="won").length,i=e.prospects.filter(l=>l.stage==="hot"||l.stage==="negotiating").length;return`
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
        <p class="kpi-value">${o}件</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    ${e.viewMode==="kanban"?cd(e.prospects):dd(e.prospects)}

    ${pd(e)}
  `}function cd(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(o=>{const i=e.filter(c=>c.stage===o),l=i.reduce((c,p)=>c+p.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${o}">
          <div class="pk-col-header" style="--pk-color:${Ha[o]};">
            <span class="pk-col-label">${ea[o]}</span>
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
  `}function dd(e){return`
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
                <td><span class="status-pill" style="background:${Ha[t.stage]};color:white;">${ea[t.stage]}</span></td>
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
  `}function pd(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(o=>o.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(ea).map(([o,i])=>`<option value="${o}" ${n?.stage===o?"selected":""}>${i}</option>`).join("")}
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
  `}function ud(e,t,n){const o=e?.config.webhook_url??"",i=e?.config.default_channel??"#general";return`
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
                <td>${Ht[l.eventType]||l.eventType}</td>
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
                <td>${Ht[l.eventType]||l.eventType}</td>
                <td class="mono" style="font-size:12px;">${l.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${l.message}</td>
                <td><span class="status-pill ${l.status==="sent"?"success":"warning"}">${l.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function md(e,t,n,o){const i=new Map(t.map(f=>[f.code,f])),l=e.filter(f=>f.callDirection==="inbound").length,c=e.filter(f=>f.callDirection==="outbound").length,p=e.filter(f=>f.callStatus==="missed").length,u=e.reduce((f,x)=>f+(x.durationSeconds??0),0),y=f=>{if(f===0)return"―";const x=Math.floor(f/60),A=f%60;return x>0?`${x}分${A}秒`:`${A}秒`},v=f=>{if(f.matchedCustomerCode){const x=i.get(f.matchedCustomerCode);if(x)return`${x.name} (既存)`}return"未登録番号"};return`
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
                  <strong>${v(f)}</strong>
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
  `}const yd=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function hd(e){const t=e.activeListId?e.lists.find(l=>l.id===e.activeListId):null,n=e.items.filter(l=>l.status==="new").length,o=e.items.filter(l=>l.status==="imported").length,i=e.items.filter(l=>l.status==="excluded").length;return`
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
            ${yd.map(l=>`<option value="${l}" ${e.searchBusinessType===l?"selected":""}>${l}</option>`).join("")}
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
  `}const Dn={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},gd={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},fd={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function be(e){return"¥"+e.toLocaleString("ja-JP")}function _t(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Js(e,t){const n=e.reduce((l,c)=>l+c.amount,0),o=Math.floor(n*t),i=n+o;return{subtotal:n,taxAmount:o,total:i}}const de={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function pe(e,t){const n=e.align??"left",o=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${o}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function pa(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),o=n-2018;return{y:o>0?String(o).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function vd(e,t,n){const o=pa(e.documentDate),i=pa(e.orderDate??e.documentDate),l=pa(e.deliveryDate??e.documentDate),c=e.lines.slice(0,6).map((L,s)=>{const r=de.detailStartY+s*de.detailRowH,d=de.detailCols,m=[],h=(b,w)=>{w&&m.push(pe({...b,y:r,x:b.x+0},w))};return h(d.productName,L.productName+(L.spec?` ${L.spec}`:"")),h(d.productCode,L.productCode),h(d.color,L.color??""),h(d.size,[L.size,L.caseQty?`×${L.caseQty}`:""].filter(Boolean).join(" ")),h(d.unit,L.unit),h(d.quantity,L.quantity>0?L.quantity.toLocaleString("ja-JP"):""),h(d.correctedQty,L.correctedQuantity?L.correctedQuantity.toLocaleString("ja-JP"):""),h(d.discount,L.discount?L.discount.toLocaleString("ja-JP"):""),h(d.unitPrice,L.unitPrice>0?L.unitPrice.toLocaleString("ja-JP"):""),h(d.costAmount,L.amount>0?L.amount.toLocaleString("ja-JP"):""),h(d.retailPrice,L.retailPrice?L.retailPrice.toLocaleString("ja-JP"):""),h(d.note,L.receivedAmount?L.receivedAmount.toLocaleString("ja-JP"):""),m.join("")}).join(""),p=e.lines.reduce((L,s)=>L+(s.amount||0),0),u=e.lines.reduce((L,s)=>L+(s.retailPrice||0)*(s.correctedQuantity??s.quantity),0),y=e.lines.reduce((L,s)=>L+(s.receivedAmount||0),0),v=e.lines.reduce((L,s)=>L+(s.returnAmount||0),0),f=e.lines.reduce((L,s)=>L+s.quantity,0),x=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",A=n.calibrationOffsetX||0,C=n.calibrationOffsetY||0,M=`transform: translate(${A}mm, ${C}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${x}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${M}">
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
        ${pe(de.orderDateY,i.y)}
        ${pe(de.orderDateM,i.m)}
        ${pe(de.orderDateD,i.d)}
        ${pe(de.deliveryDateY,l.y)}
        ${pe(de.deliveryDateM,l.m)}
        ${pe(de.deliveryDateD,l.d)}
        ${pe(de.orderNo,e.orderNo??"")}
        ${pe(de.partnerCode,e.vendorCode??"")}

        ${c}

        ${pe(de.totalQty,f.toLocaleString("ja-JP"))}
        ${pe(de.receivedTotal,y.toLocaleString("ja-JP"))}
        ${pe(de.returnTotal,v.toLocaleString("ja-JP"))}
        ${pe(de.correctedCostTotal,p.toLocaleString("ja-JP"))}
        ${pe(de.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function bd(e,t,n){const{subtotal:o,taxAmount:i,total:l}=Js(e.lines,e.taxRate),c=e.previousBalance??0,p=e.paymentAmount??0,u=c-p+l,y=e.lines.map(f=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${f.note??""}</td>
        <td>${f.productName}${f.spec?` <span style="color:#636e72;font-size:9pt;">/ ${f.spec}</span>`:""}</td>
        <td class="numeric">${f.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${f.unit}</td>`:""}
        <td class="numeric">${be(f.unitPrice)}</td>
        <td class="numeric">${be(f.amount)}</td>
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
        <div><dt>請求日</dt><dd>${_t(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${_t(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${be(u)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${be(o)} / 消費税: ${be(i)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${c?`<tr><th>前回御請求額</th><td>${be(c)}</td></tr>`:""}
          ${p?`<tr><th>ご入金額</th><td>▲ ${be(p)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${be(o)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${be(i)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${be(u)}</td></tr>
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
  `}function wd(e,t,n){const{subtotal:o,taxAmount:i,total:l}=Js(e.lines,e.taxRate),c=e.lines.map(u=>`
      <tr>
        <td>${u.productName}${u.spec?` <span style="color:#636e72;font-size:9pt;">/ ${u.spec}</span>`:""}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${u.unit}</td>`:""}
        <td class="numeric">${be(u.unitPrice)}</td>
        <td class="numeric">${be(u.amount)}</td>
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
        <div><dt>見積日</dt><dd>${_t(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${_t(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${be(l)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${be(o)} / 消費税: ${be(i)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${be(o)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${be(i)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${be(l)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?_t(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function xd(e,t,n,o){let i="";switch(e){case"chain_store":i=vd(o,n,t);break;case"quotation":i=wd(o,n,t);break;case"invoice_monthly":i=bd(o,n,t);break}const l=Object.keys(Dn).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${Dn[u]}</button>`).join(""),c=o.lines.map((u,y)=>`
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
  `}const $d={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},_d={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Qs(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],o="",i=!1;for(let p=0;p<e.length;p++){const u=e[p];i?u==='"'?e[p+1]==='"'?(o+='"',p++):i=!1:o+=u:u==='"'?i=!0:u===","?(n.push(o),o=""):u===`
`||u==="\r"?(u==="\r"&&e[p+1]===`
`&&p++,n.push(o),n.some(y=>y!=="")&&t.push(n),n=[],o=""):o+=u}if((o!==""||n.length>0)&&(n.push(o),n.some(p=>p!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const l=t[0].map(p=>p.trim()),c=[];for(let p=1;p<t.length;p++){const u={};l.forEach((y,v)=>{u[y]=(t[p][v]??"").trim()}),c.push(u)}return{columns:l,rows:c}}function Hs(e,t,n){const o=$d[e],i=o.filter(p=>!t.includes(p)),l=n.map(p=>{const u=[];i.length>0&&u.push(`必須列欠損: ${i.join(",")}`);for(const y of o)t.includes(y)&&!p[y]&&u.push(`${y}が空`);return{...p,_valid:u.length===0,_error:u[0]}}),c=l.filter(p=>p._valid).length;return{entity:e,columns:t,rows:l,totalRows:n.length,validRows:c,invalidRows:l.length-c}}function Ks(e){const n=_d[e],i={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+i.join(",")+`
`}async function Gs(e,t){const{supabaseInsert:n}=await q(async()=>{const{supabaseInsert:p}=await Promise.resolve().then(()=>Z);return{supabaseInsert:p}},void 0);let o=0,i=0;const c={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const p of t){if(!p._valid)continue;const{_valid:u,_error:y,...v}=p,f={...v};if(!f.id){const x=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";f.id=String(v[x]??`${e}-${Date.now()}-${o+i}`)}for(const x of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof f[x]=="string"&&f[x]!==""){const A=Number(f[x]);Number.isFinite(A)&&(f[x]=A)}try{await n(c,f)!==null?o++:i++}catch{i++}}return{inserted:o,failed:i}}const Sd=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:Ks,importToSupabase:Gs,parseCSV:Qs,validateImport:Hs},Symbol.toStringTag,{value:"Module"}));function ua(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function kd(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Pd(e,t,n,o,i){const l=n.reduce((y,v)=>y+v.rowCount,0),c=n.map(y=>y.lastSyncAt).filter(y=>y!==null).sort().reverse()[0]??null,p=100,u=Math.max(1,Math.ceil(i/p));return`
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
        <p class="kpi-value">${c?ua(c):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${y.lastSyncAt?ua(y.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(y=>y.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${i.toLocaleString("ja-JP")}件中 ${((o-1)*p+1).toLocaleString("ja-JP")}-${Math.min(o*p,i).toLocaleString("ja-JP")} を表示</p>
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
              <td>${y._synced_at?ua(y._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${y._raw_b64?y._raw_b64.slice(0,200):""}">${kd(y._raw_b64)}</td>
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
  `}const ct=400,dt=240;function te(e){return e.toLocaleString("ja-JP")}function ma(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function Ed(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function qe(e,t,n,o=""){return`<th class="${o}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${Ed(n,t)}</th>`}function ft(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function Ld(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const o=e.products.slice().sort((s,r)=>(e.productTotals[r.code]??0)-(e.productTotals[s.code]??0)).slice(0,6),i=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],l=820,c=280,p={top:20,right:20,bottom:40,left:60},u=l-p.left-p.right,y=c-p.top-p.bottom,v=t.map(s=>o.reduce((r,d)=>r+(n[d.code]?.[s]??0),0)),f=Math.max(...v,1),x=u/t.length,A=Math.max(x-10,14),C=[0,.25,.5,.75,1].map(s=>{const r=p.top+y-y*s,d=`${Math.round(f*s/100)*100}`;return`
      <line x1="${p.left}" y1="${r}" x2="${l-p.right}" y2="${r}" class="chart-grid" />
      <text x="6" y="${r+4}" class="chart-axis">${Number(d).toLocaleString("ja-JP")}</text>
    `}).join(""),M=t.map((s,r)=>{let d=p.top+y;const m=p.left+r*x+(x-A)/2,h=o.map((P,E)=>{const T=(n[P.code]?.[s]??0)/f*y;return d-=T,`<rect x="${m}" y="${d}" width="${A}" height="${T}" fill="${i[E%i.length]}" opacity="0.85" rx="${E===o.length-1?3:0}" />`}).join(""),[b,w]=s.split("-"),$=parseInt(w),_=$===1||r%3===0,k=$===1?`${b.slice(2)}年`:`${$}月`;return`<g>${h}${_?`<text x="${m+A/2}" y="${c-10}" class="chart-axis centered-axis">${k}</text>`:""}</g>`}).join(""),L=o.map((s,r)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${i[r%i.length]};"></span>
       ${s.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${l} ${c}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${C}${M}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${p.left}px;display:flex;flex-wrap:wrap;">${L}</div>
  `}function Ad(e){const{months:t,products:n}=e,o=n.slice().sort((c,p)=>(e.productTotals[p.code]??0)-(e.productTotals[c.code]??0)).slice(0,50),i=t.map(c=>{const[p,u]=c.split("-"),y=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${y===1?`${p.slice(2)}年1月`:`${y}月`}</th>`}).join(""),l=o.map(c=>{const p=t.map(u=>{const y=e.matrix[c.code]?.[u]??0;return`<td class="numeric">${y>0?te(y):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${c.code}</td>
        <td style="white-space:nowrap;">${c.name}</td>
        ${p}
        <td class="numeric"><strong>${te(e.productTotals[c.code]??0)}</strong></td>
        <td class="numeric">${te(Math.round(e.productAvg[c.code]??0))}</td>
        <td class="numeric">${te(Math.round(e.productStdDev[c.code]??0))}</td>
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
  `}function Cd(e,t){const n=e.months[e.months.length-1]??"",o=e.months[e.months.length-2]??"",i=e.months.length-13,l=i>=0?e.months[i]:"",c=e.products.reduce((A,C)=>A+(e.matrix[C.code]?.[n]??0),0),p=e.products.reduce((A,C)=>A+(e.matrix[C.code]?.[o]??0),0),u=l?e.products.reduce((A,C)=>A+(e.matrix[C.code]?.[l]??0),0):0,y=p>0?(c-p)/p*100:0,v=u>0?(c-u)/u*100:0,f=A=>A>=0?"+":"",x=[1,2,3,5].map(A=>`<option value="${A}" ${A===t?"selected":""}>${A}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${te(c)} 本</p>
        <p class="kpi-sub">${ma(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${y>=0?"":"text-danger"}">${f(y)}${y.toFixed(1)}%</p>
        <p class="kpi-sub">${ma(o)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${v>=0?"":"text-danger"}">${u>0?`${f(v)}${v.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${l?`${ma(l)} 比`:"前年データなし"}</p>
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
      ${Ld(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${Ad(e)}
    </section>
  `}function Dd(e,t){const o=e.slice().sort((l,c)=>{if(!t)return 0;const p=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return p*l.productName.localeCompare(c.productName,"ja");case"ss-avg":return p*(l.avgMonthlyDemand-c.avgMonthlyDemand);case"ss-std":return p*(l.demandStdDev-c.demandStdDev);case"ss-ss":{const u=Math.ceil(ft(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(ft(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return p*(u-y)}case"ss-rop":{const u=Math.ceil(l.avgMonthlyDemand*(l.leadTimeDays/30)+ft(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(c.avgMonthlyDemand*(c.leadTimeDays/30)+ft(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return p*(u-y)}default:return 0}}).map(l=>{const c=ft(l.serviceLevel),p=l.leadTimeDays/30,u=Math.ceil(c*l.demandStdDev*Math.sqrt(p)),y=Math.ceil(l.avgMonthlyDemand*p+u),v=u-l.safetyStockQty,f=v>0?"text-danger":v<-u*.3?"text-warning":"",x=[.9,.95,.99].map(A=>`<option value="${A}" ${Math.abs(l.serviceLevel-A)<.01?"selected":""}>${(A*100).toFixed(0)}%</option>`).join("");return`
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
            style="width:64px;">${x}</select>
        </td>
        <td class="numeric"><strong>${te(u)}</strong></td>
        <td class="numeric">${te(y)}</td>
        <td class="numeric ${f}">
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
              ${qe("商品名","ss-name",t)}
              ${qe("月平均需要","ss-avg",t,"numeric")}
              ${qe("標準偏差","ss-std",t,"numeric")}
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              ${qe("安全在庫[算出]","ss-ss",t,"numeric")}
              ${qe("発注点","ss-rop",t,"numeric")}
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${o||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const qd={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function Id(e,t,n,o){const i={draft:"下書き",confirmed:"確定",actual:"実績入力済"},l={draft:"neutral",confirmed:"info",actual:"success"},c=w=>Object.entries(qd).map(([$,_])=>`<option value="${$}" ${$===w?"selected":""}>${_}</option>`).join(""),p=640,u=w=>w.map($=>{const _=Math.max(0,$.demandForecast+$.safetyStockTarget-$.openingStock),k=$.plannedQty>0?$.plannedQty:Math.round(_),P=k>0?Math.ceil(k/p*10)/10:0,E=$.plannedQty>0?($.actualQty-$.plannedQty)/$.plannedQty*100:null,I=E!==null?E>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${$.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${$.productCode}"
            style="width:92px;">${c($.productionType)}</select>
        </td>
        <td class="numeric">${te(Math.round($.demandForecast))}</td>
        <td class="numeric">${te(Math.round($.safetyStockTarget))}</td>
        <td class="numeric">${te(Math.round($.openingStock))}</td>
        <td class="numeric"><strong>${te(Math.round(_))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${$.plannedQty}"
            data-action="plan-qty" data-code="${$.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">${$.actualQty>0?te($.actualQty):"—"}</td>
        <td class="numeric ${I}">
          ${E!==null?`${E>=0?"+":""}${E.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${P>0?`${P.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${l[$.status]??"neutral"}">${i[$.status]??$.status}</span>
        </td>
      </tr>
    `}).join(""),v=(n==="all"?e:e.filter(w=>w.productionType===n)).slice().sort((w,$)=>{if(!o)return 0;const _=o.dir==="asc"?1:-1,k=Math.max(0,w.demandForecast+w.safetyStockTarget-w.openingStock),P=Math.max(0,$.demandForecast+$.safetyStockTarget-$.openingStock);switch(o.column){case"plan-name":return _*w.productName.localeCompare($.productName,"ja");case"plan-forecast":return _*(w.demandForecast-$.demandForecast);case"plan-required":return _*(k-P);case"plan-planned":return _*(w.plannedQty-$.plannedQty);case"plan-actual":return _*(w.actualQty-$.actualQty);case"plan-label":{const E=w.plannedQty>0?w.plannedQty:Math.round(k),I=$.plannedQty>0?$.plannedQty:Math.round(P);return _*(E-I)}default:return 0}}),f=u(v),x=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],A=w=>{const _=(w==="all"?e:e.filter(k=>k.productionType===w)).reduce((k,P)=>{const E=Math.max(0,P.demandForecast+P.safetyStockTarget-P.openingStock);return k+(P.plannedQty>0?P.plannedQty:Math.round(E))},0);return Math.ceil(_/p*10)/10},C=x.filter(w=>w.key!=="all").map(w=>{const $=A(w.key),_=e.filter(P=>P.productionType===w.key).length,k=w.key==="make_to_order"?e.filter(P=>P.productionType==="make_to_order"&&P.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${w.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${$>0?$.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${_}商品${k!==null?` · 受注${k}件`:""}</p>
      </div>
    `}).join(""),M=v.reduce((w,$)=>w+$.demandForecast,0),L=v.reduce((w,$)=>w+Math.max(0,$.demandForecast+$.safetyStockTarget-$.openingStock),0),s=v.reduce((w,$)=>w+$.plannedQty,0),r=v.reduce((w,$)=>w+$.actualQty,0),d=A(n),m=new Date,h=Array.from({length:24},(w,$)=>{const _=new Date(m.getFullYear(),m.getMonth()-6+$,1),k=`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`;return`<option value="${k}" ${k===t?"selected":""}>${k.replace("-","年")}月</option>`}).join(""),b=x.map(w=>`<button class="button ${n===w.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${w.key}"
       style="padding:4px 12px;font-size:13px;">${w.label}</button>`).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${h}</select>
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
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${C}</div>
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
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${b}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${qe("商品名","plan-name",o)}
              <th>生産区分</th>
              ${qe("需要予測","plan-forecast",o,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${qe("必要生産数","plan-required",o,"numeric")}
              ${qe("計画数","plan-planned",o,"numeric")}
              ${qe("実績数","plan-actual",o,"numeric")}
              <th class="numeric">達成率</th>
              ${qe("ラベル工数","plan-label",o,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${f||'<tr><td colspan="11" class="empty-row">データなし</td></tr>'}
            ${v.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${te(Math.round(M))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${te(Math.round(L))}</td>
                <td class="numeric">${te(s)}</td>
                <td class="numeric">${r>0?te(r):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${d.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ws(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n,0).getDate();return Array.from({length:o},(i,l)=>{const c=l+1;return`${e}-${String(c).padStart(2,"0")}`})}function qn(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function In(e){const t=new Date(e).getDay();return t===0||t===6}function Td(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function Xs(e){return e.partTimers+e.employees}function Ie(e,t,n={partCapacity:ct,empCapacity:dt}){const o=e.filter(v=>v.partTimers>0||v.employees>0);if(o.length===0)return;const i=t.reduce((v,f)=>{const x=f.plannedQty>0?f.plannedQty:Math.max(0,f.demandForecast+f.safetyStockTarget-f.openingStock);return v+x},0);if(i<=0)return;const l=i/o.length;let c=0,p=0,u=1/0;const y=Math.ceil(l/n.partCapacity);for(let v=0;v<=y;v++){const f=l-v*n.partCapacity,x=f>0?Math.ceil(f/n.empCapacity):0,A=v+x;A<u&&(u=A,c=v,p=x)}for(const v of e)v.confirmed||(v.partTimers>0||v.employees>0)&&(v.partTimers=c,v.employees=p)}function Md(e,t,n={partCapacity:ct,empCapacity:dt}){const o=t.filter(p=>Xs(p)>0).map(p=>p.date).sort();if(o.length===0)return t.map(p=>({date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const i={monthly:0,november:1,annual:2,make_to_order:3},l=e.filter(p=>p.plannedQty>0||Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)>0).map(p=>({productCode:p.productCode,productName:p.productName,productionType:p.productionType,remaining:p.plannedQty>0?p.plannedQty:Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)})).filter(p=>p.remaining>0).sort((p,u)=>(i[p.productionType]??99)-(i[u.productionType]??99)||u.remaining-p.remaining),c=new Map;for(const p of t){const u=Td(p,n);c.set(p.date,{date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const p of l){let u=p.remaining;if(u<=0)continue;if(o.reduce((v,f)=>{const x=c.get(f);return v+Math.max(0,x.capacity-x.totalQty)},0)<=0)break;for(const v of o){if(u<=0)break;const f=c.get(v),x=Math.max(0,f.capacity-f.totalQty);if(x<=0)continue;const A=Math.min(u,x);f.items.push({productCode:p.productCode,productName:p.productName,productionType:p.productionType,qty:A}),f.totalQty+=A,f.utilization=f.capacity>0?f.totalQty/f.capacity:0,u-=A}}return t.map(p=>c.get(p.date))}function Ut(e,t=1,n=1){return Ws(e).map(o=>({date:o,partTimers:In(o)?0:t,employees:In(o)?0:n,confirmed:!1}))}function Nd(e,t,n,o=null,i=new Set,l={partCapacity:ct,empCapacity:dt}){const c=Ws(t),p=e.filter(E=>!i.has(E.productCode)),u=Md(p,n,l),y=new Map(u.map(E=>[E.date,E])),v=p.reduce((E,I)=>E+(I.plannedQty>0?I.plannedQty:Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock)),0),x=e.reduce((E,I)=>E+(I.plannedQty>0?I.plannedQty:Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock)),0)-v,A=u.reduce((E,I)=>E+I.totalQty,0),C=n.filter(E=>Xs(E)>0).length,M=u.reduce((E,I)=>E+I.capacity,0),L=n.reduce((E,I)=>E+I.partTimers,0),s=n.reduce((E,I)=>E+I.employees,0),r=C>0?Math.ceil(v/C):0,d=new Date,m=Array.from({length:24},(E,I)=>{const T=new Date(d.getFullYear(),d.getMonth()-6+I,1),O=`${T.getFullYear()}-${String(T.getMonth()+1).padStart(2,"0")}`;return`<option value="${O}" ${O===t?"selected":""}>${O.replace("-","年")}月</option>`}).join(""),h=new Date(c[0]).getDay(),b=[];for(let E=0;E<h;E++)b.push('<div style="min-height:44px;"></div>');for(const E of c){const I=y.get(E),T=new Date(E).getDay(),O=parseInt(E.split("-")[2]),N=I?.partTimers??0,j=I?.employees??0,F=N+j,z=I?.totalQty??0,Y=I?.utilization??0,H=E===o,G=F===0?"var(--surface-alt)":Y>.95?"rgba(197,61,61,0.12)":Y>.7?"rgba(183,121,31,0.10)":Y>0?"rgba(47,133,90,0.08)":"var(--surface)",J=F===0?"transparent":Y>.95?"#c53d3d":Y>.7?"#b7791f":Y>0?"#2f855a":"var(--border)",Q=T===0?"#c53d3d":T===6?"#0F5B8D":"var(--text)",le=F>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${N>0?`パ${N}`:""}${j>0?`社${j}`:""}</span>`:"";b.push(`
      <div data-action="cal-toggle-day" data-date="${E}"
        style="min-height:44px;padding:3px;border:${H?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${G};cursor:pointer;display:flex;flex-direction:column;
          ${H?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${Q};line-height:1;">${O}</span>
          ${le}
        </div>
        ${F>0?`
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${z>0?te(z):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(Y*100,100)}%;background:${J};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const $=b.length%7;if($>0)for(let E=0;E<7-$;E++)b.push('<div style="min-height:44px;"></div>');const _=o?y.get(o):null;o&&n.find(E=>E.date===o);const k=o&&_?(()=>{const E=_,I=parseInt(o.split("-")[2]),T=qn(o),O=Math.round(E.utilization*100),N=n.find(U=>U.date===o),j=o===new Date().toISOString().slice(0,10),F={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},z={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},Y=E.items.map(U=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${F[U.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${U.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${z[U.productionType]??U.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${te(U.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),H=`パ${E.partTimers}×${l.partCapacity} 社${E.employees}×${l.empCapacity} = ${te(E.capacity)}本`,G=E.totalQty>0?Math.ceil(E.totalQty/l.partCapacity):0,J=[];if(E.totalQty>0)for(let U=0;U<=G;U++){const K=E.totalQty-U*l.partCapacity;if(K<=0){J.push({p:U,e:0});break}const X=Math.ceil(K/l.empCapacity);J.push({p:U,e:X})}const Q=E.totalQty-E.capacity,le=E.totalQty===0?"":Q>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${te(Q)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',oe=J.filter(U=>U.p+U.e>0).sort((U,K)=>U.p+U.e-(K.p+K.e)).slice(0,3),ce=E.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${te(E.totalQty)}本を収めるには ${le}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${oe.map((U,K)=>{const X=U.p===E.partTimers&&U.e===E.employees;return`<button data-action="cal-apply-pattern" data-date="${o}" data-part="${U.p}" data-emp="${U.e}"
              style="font-size:11px;padding:4px 10px;border:1px solid ${X?"#2f855a":"var(--border)"};
                border-radius:4px;background:${X?"rgba(47,133,90,0.08)":"var(--surface)"};
                cursor:pointer;white-space:nowrap;${X?"font-weight:600;":""}">
              パ${U.p}社${U.e}＝${U.p+U.e}人
              <span style="color:var(--text-secondary);margin-left:2px;">${te(U.p*l.partCapacity+U.e*l.empCapacity)}本</span>
            </button>`}).join("")}
        </div>
      </div>
    `:"";return`
      <section class="panel" style="margin-top:12px;border:2px solid ${j?"#2f855a":"#0F5B8D"};">
        <div style="padding:12px 16px 8px;${j?"background:rgba(47,133,90,0.06);":""}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            ${j?'<span style="background:#2f855a;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;">TODAY</span>':""}
            <h2 style="margin:0;font-size:16px;">${I}日（${T}）${j?"":"の生産内訳"}</h2>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${H} ・ 稼働率${O}%</div>
          ${E.totalQty>0?`<div style="font-size:20px;font-weight:700;margin-top:6px;">${te(E.totalQty)}<span style="font-size:13px;font-weight:400;">本</span> <span style="font-size:13px;font-weight:400;">/ ${E.items.length}品</span></div>`:""}
        </div>
        ${ce}
        <div style="display:flex;gap:12px;padding:0 4px 8px;flex-wrap:wrap;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="${N?.partTimers??0}"
              data-action="cal-shift-part" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="${N?.employees??0}"
              data-action="cal-shift-emp" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
        ${E.items.length>0?`
          <div style="padding:0 4px;">
            ${Y}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${te(E.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():o?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(o.split("-")[2])}日（${qn(o)}）— 休日</p>
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
  `:"",P=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(E=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${E.color};"></span>${E.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${m}</select>
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
      <div><strong>${te(Math.round(v))}</strong>本 ÷ <strong>${C}</strong>稼働日 = 日当たり<strong>${te(r)}</strong>本</div>
      <div>→ パ<strong>${L}</strong> 社<strong>${s}</strong>人日 ・ キャパ<strong>${te(M)}</strong>本
        ${A<v?` <span style="color:#c53d3d;">（${te(Math.round(v-A))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
      </div>
      <div style="color:var(--text-secondary);font-size:10px;">日付タップで稼働ON/OFF → 人数自動計算</div>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${P}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((E,I)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${I===0?"#c53d3d":I===6?"#0F5B8D":"var(--text-secondary)"};">${E}</div>`).join("")}
        ${b.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">日付タップで稼働ON/OFF</p>
    </section>

    ${k}

    <section class="panel" style="margin-top:12px;" id="cal-label-section">
      <div class="panel-header" style="padding-bottom:4px;">
        <div>
          <h2 style="font-size:14px;">ラベル対象商品</h2>
          <p class="panel-caption">区分ごとにまとめて外す or 個別に外せます${i.size>0?`（<strong>${i.size}</strong>品除外中 = ${te(Math.round(x))}本）`:""}</p>
        </div>
        <button class="button primary" type="button" data-action="cal-save-exclusions"
          style="padding:6px 14px;font-size:12px;">設定を保存</button>
      </div>
      <div id="cal-label-list" style="max-height:500px;overflow-y:auto;">
        ${(()=>{const E=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],I=new Map;for(const T of e){if((T.plannedQty>0?T.plannedQty:Math.max(0,T.demandForecast+T.safetyStockTarget-T.openingStock))<=0)continue;const N=T.productionType||"monthly";I.has(N)||I.set(N,[]),I.get(N).push(T)}return E.filter(T=>I.has(T.key)).map(T=>{const O=I.get(T.key),N=O.reduce((H,G)=>H+(G.plannedQty>0?G.plannedQty:Math.max(0,G.demandForecast+G.safetyStockTarget-G.openingStock)),0),j=O.filter(H=>i.has(H.productCode)).length,F=j===O.length,z=j===0,Y=O.map(H=>{const G=H.plannedQty>0?H.plannedQty:Math.max(0,H.demandForecast+H.safetyStockTarget-H.openingStock),J=i.has(H.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${J?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${H.productCode}"
                    ${J?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${J?"text-decoration:line-through;":""}">${H.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${te(Math.round(G))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${T.key}"
                    ${F?"":"checked"} ${!z&&!F?'class="indeterminate"':""}
                    style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${T.color};flex-shrink:0;"></span>
                  <div style="flex:1;font-size:13px;font-weight:600;">${T.label}<span style="font-weight:400;color:var(--text-secondary);margin-left:6px;">${O.length}品 ${te(Math.round(N))}本</span></div>
                  ${j>0&&!F?`<span style="font-size:11px;color:#b7791f;">${j}品除外</span>`:""}
                  ${F?'<span style="font-size:11px;color:var(--text-secondary);">全除外</span>':""}
                </div>
                ${Y}
              </div>
            `}).join("")})()}
      </div>
    </section>
  `}function Rd(e,t,n,o,i,l,c="all",p=null,u=[],y=null,v=new Set,f={partCapacity:ct,empCapacity:dt}){const A=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(M=>`<button class="tab-button ${o===M.key?"active":""}"
       data-demand-tab="${M.key}">${M.label}</button>`).join("");let C="";if(o==="demand")C=e?Cd(e,l):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(o==="safety")C=Dd(t,p);else if(o==="plan")C=Id(n,i,c,p);else if(o==="calendar")try{C=Nd(n,i,u,y,v,f)}catch(M){console.error("[renderCalendarTab] error:",M),C=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(M)}
${M?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${A}
    </div>

    ${C}
  `}const Fe={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Re=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function se(e){return e.toLocaleString("ja-JP")}function ye(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function Xa(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function Od(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function Za(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function Bd(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(L=>L.month))].sort(),n=Re.filter(L=>e.some(s=>s.brewCategory===L)),o={};for(const L of e)o[L.month]||(o[L.month]={}),o[L.month][L.brewCategory]=L.shipmentMl;const i=820,l=300,c={top:20,right:20,bottom:50,left:70},p=i-c.left-c.right,u=l-c.top-c.bottom,y=t.map(L=>n.reduce((s,r)=>s+(o[L]?.[r]??0),0)),v=Math.max(...y,1),f=p/t.length,x=Math.max(f-8,14),A=[0,.25,.5,.75,1].map(L=>{const s=c.top+u-u*L,r=v*L/1e3;return`
      <line x1="${c.left}" y1="${s}" x2="${i-c.right}" y2="${s}" class="chart-grid" />
      <text x="6" y="${s+4}" class="chart-axis">${Math.round(r).toLocaleString("ja-JP")}L</text>
    `}).join(""),C=t.map((L,s)=>{let r=c.top+u;const d=c.left+s*f+(f-x)/2,m=n.map(k=>{const P=o[L]?.[k]??0,E=P/v*u;return r-=E,E>0?`<rect x="${d}" y="${r}" width="${x}" height="${E}" fill="${Fe[k]??"#9ca3af"}" opacity="0.85" rx="1"><title>${k}: ${ye(P)}L</title></rect>`:""}).join(""),[h,b]=L.split("-"),w=parseInt(b),$=w===10||s%2===0,_=w===10?`${h}年度`:`${w}月`;return`<g>${m}${$?`<text x="${d+x/2}" y="${l-12}" class="chart-axis centered-axis" style="font-size:10px;">${_}</text>`:""}</g>`}).join(""),M=n.map(L=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${Fe[L]??"#9ca3af"};"></span>
       ${L}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${i} ${l}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${A}${C}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${c.left}px;display:flex;flex-wrap:wrap;">${M}</div>
  `}function jd(e,t,n,o){const i=new Map;for(const p of e){const u=p.brewCategory;i.has(u)||i.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const y=i.get(u);y.rows.push(p),y.totalMl+=p.totalShipmentMl,y.avgMl+=p.monthlyAvgMl,y.stockL=p.currentStockL}const l=new Map;for(const p of t)l.has(p.brewCategory)||l.set(p.brewCategory,[]),l.get(p.brewCategory).push(p);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${Re.filter(p=>i.has(p)).map(p=>{const u=i.get(p),y=Fe[p]??"#9ca3af",v=Za(p);l.get(p);const f=n[p]??{rawAlcoholPct:18,targetAlcoholPct:15},x=f.targetAlcoholPct>0?f.rawAlcoholPct/f.targetAlcoholPct:1;u.stockL*1e3;const A=u.totalMl,C=u.avgMl,M=A/1e3,L=Math.round(u.stockL*x*10)/10,s=L*1e3,r=C>0?Math.round(s/C*10)/10:0,d=L-M,m=C>0?Math.round(C*2/1e3*10)/10:0,h=L<m,b=Xa(r),w=Od(r),$=Math.min(r/12*100,100),_=d>=0?"#22c55e":"#ef4444",k=d>=0?`+${se(Math.round(d))}L 余裕`:`${se(Math.round(d))}L 不足`,P=x>1.001;return`
        <div class="card" style="border-top:3px solid ${y};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${y};">${p}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${b}20;color:${b};font-weight:600;">${w}</span>
              <button class="btn-edit-stock" data-cat-id="${v}" data-cat="${p}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${v}">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;font-size:11px;margin-bottom:4px;">
              <div><span style="color:#6b7280;">原酒在庫</span><br><strong style="font-size:15px;">${se(u.stockL)}L</strong></div>
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${se(Math.round(M))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${ye(C)}L</strong></div>
            </div>
            ${P?`
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${se(L)}L</div>
                <div style="color:#6b7280;">${f.rawAlcoholPct}% → ${f.targetAlcoholPct}%（×${x.toFixed(2)}）・残<strong>${r.toFixed(1)}</strong>ヶ月</div>
              </div>
            `:""}
            ${(()=>{const E=o.filter(I=>I.parentCategory===p);return E.length===0?"":E.map(I=>{const O=t.filter(N=>N.brewCategory===I.name).reduce((N,j)=>N+j.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${I.name}</span>
                  ${O>0?`<span style="margin-left:4px;">${se(O)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${v}" style="display:none;margin-bottom:8px;">
            ${(()=>{const E=o.filter(N=>N.parentCategory===p),I=[{name:p,label:p},...E.map(N=>({name:N.name,label:N.name}))],T=I.flatMap(N=>t.filter(F=>F.brewCategory===N.name).map(F=>({...F,catLabel:N.label}))),O=I.map(N=>`<option value="${N.name}">${N.label}</option>`).join("");return`
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${T.map(N=>`
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                      <span style="font-size:11px;flex:1;min-width:60px;">${N.label||"タンク"}</span>
                      <strong style="font-size:13px;">${se(N.volumeL)}L</strong>
                      ${I.length>1?`
                        <select data-action="brew-reassign-entry" data-id="${N.id}"
                          style="font-size:10px;padding:1px 4px;border:1px solid var(--border);border-radius:3px;max-width:100px;">
                          ${I.map(j=>`<option value="${j.name}" ${j.name===N.brewCategory?"selected":""}>${j.label}</option>`).join("")}
                        </select>
                      `:`<span style="font-size:10px;color:var(--text-secondary);">${N.catLabel}</span>`}
                      <button data-action="brew-delete-entry" data-id="${N.id}" data-cat="${N.brewCategory}"
                        style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                    </div>
                  `).join("")||'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">タンクなし</div>'}
                </div>
                <div style="display:flex;gap:4px;align-items:center;margin-top:6px;flex-wrap:wrap;">
                  ${I.length>1?`<select id="new-entry-target-${v}" style="height:28px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">${O}</select>`:""}
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
                  <input id="alc-raw-${v}" type="number" min="1" max="30" step="0.1" value="${f.rawAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <span style="color:#6b7280;">→</span>
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  出荷
                  <input id="alc-target-${v}" type="number" min="1" max="30" step="0.1" value="${f.targetAlcoholPct}"
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
            <span style="color:${_};font-weight:600;">年間比 ${k}</span>
            <span style="color:${h?"#ef4444":"#6b7280"};">安全在庫${se(m)}L${h?" ⚠下回り":" ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${P?"（加水後）":""}</span>
            <span style="font-weight:600;color:${b};">${r.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${b};height:100%;width:${$}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function zd(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const i of e)t.has(i.brewCategory)||t.set(i.brewCategory,[]),t.get(i.brewCategory).push(i);const n=`
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
  `,o=[];for(const i of Re){const l=t.get(i);if(!l)continue;const c=Fe[i]??"#9ca3af",p=l.length>1,u=l.reduce((L,s)=>L+s.totalShipmentQty,0),y=l.reduce((L,s)=>L+s.totalShipmentMl,0),v=l.reduce((L,s)=>L+s.monthlyAvgQty,0),f=l.reduce((L,s)=>L+s.monthlyAvgMl,0),x=l.reduce((L,s)=>L+s.productCount,0),A=l[0].currentStockL,C=f>0?Math.round(A*1e3/f*10)/10:0,M=Xa(C);if(o.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${p?"pointer":"default"};" ${p?`data-toggle-cat="${i}"`:""}>
        <td style="color:${c};">
          ${p?`<span class="toggle-icon" data-cat="${i}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${i}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${x}</td>
        <td style="text-align:right;">${se(u)}</td>
        <td style="text-align:right;">${ye(y)}</td>
        <td style="text-align:right;">${se(v)}</td>
        <td style="text-align:right;">${ye(f)}</td>
        <td style="text-align:right;">${se(A)}</td>
        <td style="text-align:right;color:${M};font-weight:700;">${C.toFixed(1)}</td>
      </tr>
    `),p)for(const L of l)o.push(`
          <tr class="sub-row-${Za(i)}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${L.subCategory}</td>
            <td style="text-align:right;">${L.productCount}</td>
            <td style="text-align:right;">${se(L.totalShipmentQty)}</td>
            <td style="text-align:right;">${ye(L.totalShipmentMl)}</td>
            <td style="text-align:right;">${se(L.monthlyAvgQty)}</td>
            <td style="text-align:right;">${ye(L.monthlyAvgMl)}</td>
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
  `}function Fd(e,t,n,o,i,l={}){const c={html:"",needByCategory:{}};if(e.length===0)return c;const p={},u=new Date,y=u.getMonth()+1,v=y>=10?u.getFullYear():u.getFullYear()-1,f=v+1,x=new Map;for(const k of e)x.has(k.brewCategory)||x.set(k.brewCategory,new Map),x.get(k.brewCategory).set(k.fy,{shipL:k.shipmentL,annualL:k.annualizedL});const A=new Map;for(const k of i)A.has(k.brewCategory)||A.set(k.brewCategory,new Map),A.get(k.brewCategory).set(k.monthNum,k.avgMonthlyL);const C=[...new Set(e.map(k=>k.fy))].sort(),M=[...x.keys()].sort((k,P)=>{const E=[...Re,...o.map(I=>I.name)];return(E.indexOf(k)===-1?99:E.indexOf(k))-(E.indexOf(P)===-1?99:E.indexOf(P))}),L=[];for(let k=y;k<=9;k++)L.push(k);if(y>=10)for(let k=1;k<=9;k++)L.push(k);const s=C.filter(k=>k<v),r=C.includes(v),d=M.map(k=>{const P=x.get(k);C.filter(me=>P.has(me));const E=Fe[k]??"#6366f1",I=A.get(k)??new Map,T=s.filter(me=>P.has(me)).map(me=>P.get(me).shipL);let O=0;if(T.length>=2){let me=0,ve=0;for(let Oe=1;Oe<T.length;Oe++)if(T[Oe-1]>0){const sa=(T[Oe]-T[Oe-1])/T[Oe-1],Lt=Oe;me+=sa*Lt,ve+=Lt}O=ve>0?me/ve:0}const N=P.get(v)?.annualL??0,j=T.length>0?T[T.length-1]:0,F=N>0&&j>0?Math.round(j*.4+N*.6):j||N,z=L.reduce((me,ve)=>me+(I.get(ve)??0),0),Y=t.filter(me=>me.brewCategory===k).reduce((me,ve)=>me+ve.volumeL,0),H=n[k],G=H&&H.targetAlcoholPct>0?H.rawAlcoholPct/H.targetAlcoholPct:1,J=Math.round(Y*G),Q=Math.max(0,J-Math.round(z)),le=k in l,oe=le?l[k]:O,ce=Math.round(oe*100),U=Math.round(F*(1+oe)),K=Math.max(0,U-Q);p[k]=K;const X=ce>0?"#22c55e":ce<0?"#ef4444":"#6b7280",re=Math.round(O*100),$e=P.get(v)?.annualL??0;return`
      <tr>
        <td style="color:${E};font-weight:600;white-space:nowrap;">${k}</td>
        ${s.map(me=>`<td style="text-align:right;">${P.has(me)?se(Math.round(P.get(me).shipL)):"—"}</td>`).join("")}
        ${r?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${se(Math.round($e))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${ce}"
            data-action="brew-growth-edit" data-cat="${k}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${le?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${X};font-weight:600;${le?"background:rgba(37,99,235,0.06);":""}"
            title="${le?`手動設定（自動: ${T.length>=2?re+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${se(J)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${se(Math.round(z))}</td>
        <td style="text-align:right;font-weight:600;">${se(Q)}</td>
        <td style="text-align:right;">${se(U)}</td>
        <td style="text-align:right;color:${K>0?"#ef4444":"#22c55e"};font-weight:700;">${K>0?se(K):"余裕"}</td>
      </tr>
    `}).join("");let m=0,h=0,b=0,w=0,$=0;for(const k of M){const P=x.get(k),E=A.get(k)??new Map,I=s.filter(oe=>P.has(oe)).map(oe=>P.get(oe).shipL);let T=0;if(I.length>=2){let oe=0,ce=0;for(let U=1;U<I.length;U++)if(I[U-1]>0){const K=(I[U]-I[U-1])/I[U-1];oe+=K*U,ce+=U}T=ce>0?oe/ce:0}const O=P.get(v)?.annualL??0,N=I.length>0?I[I.length-1]:0,j=O>0&&N>0?Math.round(N*.4+O*.6):N||O,F=t.filter(oe=>oe.brewCategory===k).reduce((oe,ce)=>oe+ce.volumeL,0),z=n[k],Y=z&&z.targetAlcoholPct>0?z.rawAlcoholPct/z.targetAlcoholPct:1,H=Math.round(F*Y),G=L.reduce((oe,ce)=>oe+(E.get(ce)??0),0),J=Math.max(0,H-Math.round(G)),Q=k in l?l[k]:T,le=Math.round(j*(1+Q));m+=H,h+=Math.round(G),b+=J,w+=le,$+=Math.max(0,le-J)}const _=y<=9?`${y}月〜9月`:`${y}月〜翌9月`;return{needByCategory:p,html:`
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
              ${s.map(k=>`<th style="text-align:right;">${k}(L)</th>`).join("")}
              ${r?`<th style="text-align:right;">${v}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${_}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${f}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${d}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${s.map(()=>"<td></td>").join("")}
              ${r?"<td></td>":""}
              <td></td>
              <td style="text-align:right;">${se(m)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${se(h)}</td>
              <td style="text-align:right;">${se(b)}</td>
              <td style="text-align:right;">${se(w)}</td>
              <td style="text-align:right;color:#ef4444;">${se($)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}}function Vd(e,t,n,o,i){if(e.length===0)return"";const l=new Date,c=l.getMonth()+1,p=l.getFullYear(),u=[];let y=c,v=p;for(let s=0;s<4;s++){const r=[];for(let h=0;h<3;h++)r.push({y:v,m:y}),y++,y>12&&(y=1,v++);const d=`${r[0].y}/${r[0].m}`,m=`${r[2].y}/${r[2].m}`;u.push({label:`${d}-${m}`,months:r})}const f=new Map;for(const s of n)f.has(s.brewCategory)||f.set(s.brewCategory,new Map),f.get(s.brewCategory).set(s.monthNum,s.avgMonthlyL);const x=new Map;for(const s of e)x.has(s.brewCategory)||x.set(s.brewCategory,s.currentStockL);for(const s of i){const r=t.filter(d=>d.brewCategory===s.name).reduce((d,m)=>d+m.volumeL,0);r>0&&x.set(s.name,r)}const A=new Map;for(const s of i)A.has(s.parentCategory)||A.set(s.parentCategory,[]),A.get(s.parentCategory).push(s);const C=[];for(const s of Re){(x.has(s)||(f.get(s)?.size??0)>0)&&C.push({cat:s,isChild:!1});for(const r of A.get(s)??[])(x.has(r.name)||(f.get(r.name)?.size??0)>0)&&C.push({cat:r.name,isChild:!0})}function M(s,r){const d=o[s],m=d&&d.targetAlcoholPct>0?d.rawAlcoholPct/d.targetAlcoholPct:1;let h=(x.get(s)??0)*m;const b=f.get(s)??new Map,w=Fe[s]??(r?"#6366f1":"#9ca3af");let $="";const _=[];for(const k of u){const P=k.months.reduce((O,{m:N})=>O+(b.get(N)??0),0),E=h;h=Math.max(0,h-P),E>0&&h<=0&&!$&&($=k.label);const T=h<=0?"#ef4444":h<P?"#eab308":"#22c55e";_.push(`<td style="text-align:right;padding:4px 6px;color:${T};font-weight:${h<=0?"700":"400"};">${h>0?se(Math.round(h)):"枯渇"}</td>`)}return`
      <tr style="${r?"background:rgba(99,102,241,0.02);":""}">
        <td style="color:${w};font-weight:${r?"500":"600"};padding:4px 6px;white-space:nowrap;${r?"padding-left:20px;font-size:11px;":""}">${r?"┗ ":""}${s}</td>
        <td style="text-align:right;padding:4px 6px;">${se(Math.round((x.get(s)??0)*m))}</td>
        ${_.join("")}
        <td style="padding:4px 6px;font-size:11px;color:${$?"#ef4444":"#22c55e"};font-weight:600;">
          ${$?`⚠ ${$}`:"12ヶ月+"}
        </td>
      </tr>
    `}const L=C.map(({cat:s,isChild:r})=>M(s,r)).join("");return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 8px 0;">四半期別 在庫枯渇予測</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 10px;">現在庫（加水後）から季節出荷を差し引いた残量推移</p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th style="padding:4px 6px;">区分</th>
              <th style="text-align:right;padding:4px 6px;">現在庫(L)</th>
              ${u.map(s=>`<th style="text-align:right;padding:4px 6px;font-size:10px;">${s.label}</th>`).join("")}
              <th style="padding:4px 6px;">枯渇時期</th>
            </tr>
          </thead>
          <tbody>${L}</tbody>
        </table>
      </div>
    </div>
  `}function Yd(e,t,n){const o=new Map;for(const c of e){o.has(c.brewCategory)||o.set(c.brewCategory,{avgMl:0,totalMl:0,stockL:c.currentStockL});const p=o.get(c.brewCategory);p.avgMl+=c.monthlyAvgMl,p.totalMl+=c.totalShipmentMl}for(const c of n){const p=t.filter(u=>u.brewCategory===c.name).reduce((u,y)=>u+y.volumeL,0);(p>0||o.has(c.name))&&(o.has(c.name)?o.get(c.name).stockL=p:(o.get(c.parentCategory),o.set(c.name,{avgMl:0,totalMl:0,stockL:p})))}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${[...Re,...n.map(c=>c.name)].filter(c=>o.has(c)&&(o.get(c).stockL>0||o.get(c).totalMl>0)).map(c=>{const p=o.get(c),u=p.avgMl>0?Math.round(p.stockL*1e3/p.avgMl*10)/10:0,y=p.totalMl/1e3,v=y>0?Math.round(p.stockL/y*100):0,f=n.some(L=>L.name===c),x=Fe[c]??(f?"#6366f1":"#9ca3af"),A=p.avgMl>0?Xa(u):p.stockL>0?"#22c55e":"#9ca3af",C=p.avgMl>0?Math.min(u/12*100,100):p.stockL>0?100:0,M=p.avgMl>0?`${u.toFixed(1)}ヶ月 / 年間の${v}%`:`${se(p.stockL)}L在庫`;return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:100px;font-size:12px;font-weight:500;color:${x};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c}">${f?"┗ ":""}${c}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${A};height:100%;width:${C}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">${M}</span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${p.stockL>0?"var(--text)":"#ef4444"};">${se(p.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function Ud(e,t,n,o,i){if(e.length===0)return"";const l=n.map(f=>f.name);[...Re,...l];const c=new Map;for(const f of n)c.has(f.parentCategory)||c.set(f.parentCategory,[]),c.get(f.parentCategory).push(f);const p=new Map;for(const f of e)p.has(f.brewCategory)||p.set(f.brewCategory,[]),p.get(f.brewCategory).push(f);for(const f of l)p.has(f)||p.set(f,[]);const u=new Set;for(const f of n)for(const x of p.get(f.name)??[])u.add(x.productCode);const y=new Map;for(const f of Re)y.set(f,p.get(f)??[]);const v=Re.filter(f=>p.has(f)).map(f=>{const x=p.get(f)??[],A=Fe[f]??"#9ca3af",C=c.get(f)??[],M=C.length>0,L=x.reduce((_,k)=>_+k.annualMl,0),s=x.reduce((_,k)=>_+k.monthlyAvgMl,0),r=x.filter(_=>!u.has(_.productCode)),d=r.filter(_=>!t.has(_.productCode)),m=d.reduce((_,k)=>_+k.annualMl,0),h=d.reduce((_,k)=>_+k.monthlyAvgMl,0),b=r.filter(_=>t.has(_.productCode)),w=r.map(_=>{const k=t.has(_.productCode);return`
          <tr style="${k?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${M?`<input type="checkbox" ${k?"":"checked"} data-action="brew-move-to-child" data-code="${_.productCode}" data-parent="${f}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${k?"color:#b7791f;":""}" title="${_.productName}">
              ${_.productName}${k?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${_.subCategory}</td>
            <td style="text-align:right;">${ye(_.annualMl)}</td>
            <td style="text-align:right;">${ye(_.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),$=C.map(_=>{const k=p.get(_.name)??[],P=k.reduce((F,z)=>F+z.annualMl,0),E=k.reduce((F,z)=>F+z.monthlyAvgMl,0),I=i.filter(F=>F.brewCategory===_.name),T=I.reduce((F,z)=>F+z.volumeL,0),O=Za(_.name),N=k.map(F=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${F.productCode}" data-cat="${_.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${F.productName}"><strong>${F.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${F.subCategory}</td>
            <td style="text-align:right;">${ye(F.annualMl)}</td>
            <td style="text-align:right;">${ye(F.monthlyAvgMl)}</td>
          </tr>
        `).join(""),j=b.filter(F=>!k.some(z=>z.productCode===F.productCode)).map(F=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${F.productCode}" data-cat="${_.name}"
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
                <strong style="font-size:12px;color:#6366f1;">${_.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${k.length}品 ・ ${ye(P)}L/年${T>0?` ・ 在庫${se(T)}L`:""}</span>
                <button class="btn-edit-stock" data-cat-id="${O}" data-cat="${_.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${_.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${O}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${I.map(F=>`
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${F.label||"タンク"}</span>
                    <strong style="font-size:11px;">${se(F.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${F.id}" data-cat="${_.name}"
                      style="font-size:9px;padding:1px 4px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">×</button>
                  </div>
                `).join("")}
                <div style="display:flex;gap:3px;align-items:center;margin-top:3px;">
                  <input id="new-entry-label-${O}" type="text" placeholder="名前" style="width:70px;height:22px;font-size:10px;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <input id="new-entry-vol-${O}" type="number" min="0" placeholder="L" style="width:50px;height:22px;font-size:10px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <button data-action="brew-add-entry" data-cat="${_.name}" data-cat-id="${O}"
                    style="font-size:9px;padding:2px 6px;border:none;border-radius:3px;background:#0F5B8D;color:#fff;cursor:pointer;">追加</button>
                </div>
                <button class="btn-cancel-stock" data-cat-id="${O}" style="font-size:9px;padding:2px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;margin-top:3px;">閉じる</button>
              </div>
              ${N.length>0||j.length>0?`
                <table class="data-table" style="font-size:11px;margin:0;">
                  <tbody>
                    ${N}
                    ${j}
                  </tbody>
                  ${k.length>0?`<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${ye(P)}</td><td style="text-align:right;">${ye(E)}</td>
                  </tr></tfoot>`:""}
                </table>
              `:'<div style="font-size:10px;color:var(--text-secondary);padding:4px;">親からチェックを外すとここに候補表示されます</div>'}
            </div>
          </td></tr>
        `}).join("");return`
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${A};"></span>
            <h4 style="margin:0;font-size:14px;">${f}</h4>
            <span style="font-size:12px;color:var(--text-secondary);">
              全${x.length}銘柄 ・ 年間${ye(L)}L
              ${M?`（内 ${C.map(_=>`${_.name}:${(p.get(_.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${M?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${w}
                ${$}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${ye(L)}</td><td style="text-align:right;">${ye(s)}</td></tr>
                ${M?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${ye(m)}</td><td style="text-align:right;">${ye(h)}</td></tr>`:""}
                ${b.length>0?`<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${b.length}品</td>
                  <td style="text-align:right;">${ye(b.reduce((_,k)=>_+k.annualMl,0))}</td>
                  <td style="text-align:right;">${ye(b.reduce((_,k)=>_+k.monthlyAvgMl,0))}</td></tr>`:""}
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
            ${Re.filter(f=>f!=="その他").map(f=>`<option value="${f}">${f}</option>`).join("")}
          </select>
          <input id="brew-new-category-name" type="text" placeholder="新しい区分名"
            style="font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;width:120px;" />
          <button data-action="brew-add-category" class="button primary"
            style="font-size:12px;padding:4px 12px;">追加</button>
        </div>
      </div>
      ${v}
    </div>
  `}function Jd(e,t,n,o=[],i=new Set,l=[],c={},p=[],u={},y=[],v=[],f={},x={}){const A=new Date,C=A.getMonth()>=9?A.getFullYear():A.getFullYear()-1,M=Array.from({length:5},(s,r)=>{const d=C-r;return`<option value="${d}" ${d===n?"selected":""}>${d}年度 (${d}/10-${d+1}/9)</option>`}).join(""),L=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return L||`
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div>
          <h2 style="margin:0;font-size:18px;">醸造計画</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;">特定名称酒区分別の出荷実績と在庫状況</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <label for="brewing-fy-select" style="font-size:13px;font-weight:500;">会計年度:</label>
          <select id="brewing-fy-select" class="input" style="width:auto;min-width:200px;">
            ${M}
          </select>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:14px;margin:0 0 8px 0;">月次移出推移（区分別）</h3>
        ${Bd(t)}
      </div>

      ${jd(e,p,u,l)}

      ${Fd(y,p,u,l,v,f).html}

      ${Yd(e,p,l)}

      ${Vd(e,p,v,u,l)}

      ${Ud(o,i,l,c,p)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${zd(e)}
      </div>
    </section>
  `}const ya={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Qd=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"],vt=[10,11,12,1,2,3,4,5,6,7,8,9],Tn=["10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月","9月"],Je=[9,10,11,12,1,2,3,4,5],Hd=["9月","10月","11月","12月","1月","2月","3月","4月","5月"];function ae(e){return e.toLocaleString("ja-JP")}function Kd(e,t,n,o=[],i=2026,l=[],c=[],p={}){const y=[...new Set([...Object.keys(e).filter(_=>e[_]>0),...o.filter(_=>_.plannedVolumeL>0).map(_=>_.brewCategory)])];if(y.length===0)return'<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>';const v=[...Qd,...n.map(_=>_.name)];y.sort((_,k)=>(v.indexOf(_)===-1?99:v.indexOf(_))-(v.indexOf(k)===-1?99:v.indexOf(k)));const f={polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0},x=new Map;for(const _ of o)x.has(_.brewCategory)||x.set(_.brewCategory,[]),x.get(_.brewCategory).push(_);const A=(_,k,P,E,I)=>`<input type="number" step="${I}" value="${P}" data-action="brew-rice-edit" data-cat="${k}" data-field="${_}"
        style="width:${E};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`,C=(_,k,P)=>`<select data-action="brew-rice-variety-select" data-cat="${k}" data-field="${_}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${l.map(E=>`<option value="${E.name}" ${E.name===P?"selected":""}>${E.name}${E.region?` (${E.region})`:""}</option>`).join("")}
      ${!l.some(E=>E.name===P)&&P?`<option value="${P}" selected>${P}</option>`:""}
    </select>`;let M=0,L=0,s=0,r=0;const d=vt.map(()=>0),m=new Map,h=y.map(_=>{const k=e[_]??0,P=t[_]??f,E=ya[_]??"#6366f1",I=x.get(_)??[],T=_ in p,O=I.reduce((X,re)=>X+re.plannedVolumeL,0),N=I.length>0,j=T?p[_]:N?O:k,F=P.alcoholAdditionRatio??0,z=j*(1-F),Y=Math.round(z*P.ricePerLiterKg),H=Math.round(Y*P.kojiRatio),G=Y-H,J=Math.round(H/P.polishingRatio),Q=Math.round(G/P.polishingRatio),le=J+Q,oe=Math.round(J*P.kojiPricePerKg),ce=Math.round(Q*P.kakePricePerKg);M+=J,L+=Q,s+=oe,r+=ce;for(const[X,re,$e,me]of[[P.kojiVariety,J,P.kojiPricePerKg,"麹米"],[P.kakeVariety,Q,P.kakePricePerKg,"掛米"]]){if(re<=0)continue;m.has(X)||m.set(X,{brownKg:0,pricePerKg:$e,cost:0,usage:[]});const ve=m.get(X);ve.brownKg+=re,ve.cost+=Math.round(re*$e),ve.pricePerKg=Math.round(ve.cost/ve.brownKg),ve.usage.push({cat:_,type:me,kg:re})}const U=vt.map(()=>0);if(I.length>0)for(const X of I){const re=vt.indexOf(X.brewMonth);re>=0&&(U[re]+=X.plannedVolumeL)}else{const X=j/12;for(let re=0;re<12;re++)U[re]=X}const K=U.reduce((X,re)=>X+re,0)||1;for(let X=0;X<12;X++){const re=U[X]/K;d[X]+=Math.round(le*re)}return`
      <div class="card" style="border-top:3px solid ${E};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${E};">${_}</h4>
          <div style="font-size:12px;">${j>0?`予算 <strong>¥${ae(oe+ce)}</strong>`:'<span style="color:#6b7280;font-weight:600;">醸造しない</span>'}</div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(j)}"
              data-action="proc-edit-vol" data-cat="${_}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid ${T?"#2563eb":"var(--border)"};border-radius:4px;padding:0 4px;font-weight:600;${T?"background:rgba(37,99,235,0.04);":""}" />L
          </label>
          ${F>0?`<span style="color:var(--text-secondary);">−${Math.round(F*100)}%→${ae(Math.round(z))}L</span>`:""}
          ${k>0&&Math.abs(k-j)>10?`<span style="color:var(--text-secondary);font-size:11px;">(予測${ae(Math.round(k))})</span>`:""}
        </div>

        <div style="border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:8px;background:var(--surface-alt);">
          <div style="font-size:11px;font-weight:600;color:${E};margin-bottom:6px;">醸造スケジュール${I.length>0?` (${ae(Math.round(I.reduce((X,re)=>X+re.plannedVolumeL,0)))}L / ${ae(Math.round(j))}L)`:""}</div>
          ${I.length>0?`
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
              ${I.map(X=>`
                <div style="display:flex;align-items:center;gap:3px;padding:3px 8px;border-radius:4px;background:${E}15;border:1px solid ${E}30;">
                  <span style="font-size:11px;font-weight:600;color:${E};">${X.brewMonth}月</span>
                  <input type="number" min="0" max="${Math.round(j)}" step="100" value="${Math.round(X.plannedVolumeL)}"
                    data-action="proc-sched-edit-vol" data-cat="${_}" data-month="${X.brewMonth}"
                    style="width:56px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />L
                  <button data-action="proc-sched-remove" data-cat="${_}" data-month="${X.brewMonth}"
                    style="border:none;background:none;color:#ef4444;cursor:pointer;font-size:14px;padding:0 2px;line-height:1;">×</button>
                </div>
              `).join("")}
            </div>
          `:'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px;">醸造月を追加してください</div>'}
          <div style="display:flex;align-items:center;gap:4px;">
            <select data-action="proc-add-month-select" data-cat="${_}"
              style="height:24px;font-size:11px;border:1px solid var(--border);border-radius:3px;padding:0 4px;">
              ${[10,11,12,1,2,3,4,5,6,7,8,9].filter(X=>!I.some(re=>re.brewMonth===X)).map(X=>`<option value="${X}">${X}月</option>`).join("")}
            </select>
            <input type="number" min="0" max="${Math.round(j)}" step="100" placeholder="L"
              data-action="proc-add-month-vol" data-cat="${_}"
              style="width:56px;height:24px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />
            <button data-action="proc-add-schedule" data-cat="${_}"
              style="height:24px;font-size:11px;padding:0 8px;border:1px solid ${E};background:${E}10;color:${E};border-radius:3px;cursor:pointer;">+追加</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${A("ricePerLiterKg",_,P.ricePerLiterKg,"48px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${A("kojiRatio",_,P.kojiRatio,"44px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${A("polishingRatio",_,P.polishingRatio,"44px","0.01")}</label>
          ${F>0||_==="本醸造"||_==="普通酒"?`<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${A("alcoholAdditionRatio",_,P.alcoholAdditionRatio??0,"44px","0.01")}</label>`:""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${C("kojiVariety",_,P.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${A("kojiPricePerKg",_,P.kojiPricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${ae(J)}kg</strong> <span style="color:var(--text-secondary);">(${(J/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${ae(oe)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${C("kakeVariety",_,P.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${A("kakePricePerKg",_,P.kakePricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${ae(Q)}kg</strong> <span style="color:var(--text-secondary);">(${(Q/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${ae(ce)}</div>
          </div>
        </div>
      </div>
    `}).join(""),b=M+L,w=s+r,$=Math.max(...d,1);return vt.map((_,k)=>{const P=d[k];return`
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${P/$*100}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${P>0?2:0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${Tn[k]}</div>
        <div style="font-size:10px;font-weight:600;">${P>0?ae(P):""}</div>
        <div style="font-size:9px;color:var(--text-secondary);">${P>0?(P/60).toFixed(0)+"俵":""}</div>
      </div>
    `}).join(""),`
    <section class="page-head">
      <div>
        <p class="eyebrow">製造管理</p>
        <h1>原料米 調達計画 — ${i}年度</h1>
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
        <div style="display:grid;grid-template-columns:80px repeat(${Je.length},1fr);font-size:11px;min-width:500px;">
          <div style="padding:4px;font-weight:600;">区分</div>
          ${Hd.map(_=>`<div style="text-align:center;padding:4px;font-weight:600;border-left:1px solid var(--border);">${_}</div>`).join("")}
        </div>
        ${(()=>{const _=[],k=Je.length,P=new Map;for(const T of c)T.deliveryMonth&&(P.has(T.varietyName)||P.set(T.varietyName,[]),P.get(T.varietyName).push(T.deliveryMonth));for(const[T,O]of P){const N=Je.map(j=>{const F=O.includes(j),z=c.filter(Y=>Y.varietyName===T&&Y.deliveryMonth===j).reduce((Y,H)=>Y+H.committedBales,0);return`<div style="text-align:center;padding:3px;border-left:1px solid var(--border);${F?"background:#dcfce7;":""}">
                ${F?`<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${z}俵</div>`:""}
              </div>`}).join("");_.push(`<div style="display:grid;grid-template-columns:80px repeat(${k},1fr);border-top:1px solid var(--border);">
              <div style="padding:4px;color:#16a34a;font-weight:500;font-size:10px;">📥 ${T}</div>${N}
            </div>`)}const E=34,I=2;for(const T of y){const O=x.get(T)??[],N=ya[T]??"#6366f1",j=T in p,F=O.reduce((U,K)=>U+K.plannedVolumeL,0),z=O.length>0,Y=j?p[T]:z?F:e[T]??0,H=[],G=[...O].sort((U,K)=>Je.indexOf(U.brewMonth)-Je.indexOf(K.brewMonth)),J=[];for(const U of G){const K=Je.indexOf(U.brewMonth);if(K<0)continue;const X=Math.min(U.durationMonths,k-K),re=K+X;let $e=0;for(;$e<J.length&&J[$e]>K;)$e++;$e>=J.length?J.push(re):J[$e]=re,H.push({s:U,startIdx:K,dur:X,lane:$e})}const le=Math.max(J.length,1)*(E+I)+I,oe=Je.map(()=>`<div style="border-left:1px solid var(--border);height:${le}px;"></div>`).join(""),ce=H.map(({s:U,startIdx:K,dur:X,lane:re})=>{const $e=(K/k*100).toFixed(2),me=(X/k*100).toFixed(2),ve=I+re*(E+I);return`<div class="gantt-bar" data-cat="${T}" data-month="${U.brewMonth}" data-dur="${X}" data-vol="${Math.round(U.plannedVolumeL)}" data-max="${Math.round(Y)}"
                style="position:absolute;left:${$e}%;width:${me}%;top:${ve}px;height:${E}px;
                  background:${N}30;border:2px solid ${N};border-radius:6px;cursor:grab;
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${N};overflow:hidden;box-sizing:border-box;">
                <div class="gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
                <span class="gantt-bar-label" style="pointer-events:none;white-space:nowrap;">${ae(Math.round(U.plannedVolumeL))}L</span>
                <div class="gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
              </div>`}).join("");_.push(`<div style="display:grid;grid-template-columns:80px 1fr;border-top:1px solid var(--border);">
              <div style="padding:4px;color:${N};font-weight:500;font-size:10px;display:flex;align-items:center;">🍶 ${T}</div>
              <div style="position:relative;display:grid;grid-template-columns:repeat(${k},1fr);">
                ${oe}
                <div class="gantt-bar-container" data-cat="${T}" data-max="${Math.round(Y)}" data-cols="${k}" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                  ${ce}
                </div>
              </div>
            </div>`)}return _.join("")||'<div style="text-align:center;color:var(--text-secondary);padding:16px;">区分を追加するとタイムラインが表示されます</div>'})()}
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(()=>{const _=y.map(P=>{const E=t[P]??f,I=x.get(P)??[],T=P in p,O=I.reduce((H,G)=>H+G.plannedVolumeL,0),N=I.length>0,j=T?p[P]:N?O:e[P]??0,F=j*(1-(E.alcoholAdditionRatio??0)),z=Math.round(F*E.ricePerLiterKg),Y=Math.round(z/E.polishingRatio);return{cat:P,brewingL:j,brownKg:Y,color:ya[P]??"#6366f1"}}).filter(P=>P.brewingL>0||P.brownKg>0),k=Math.max(..._.map(P=>P.brownKg),1);return _.map(P=>{const E=Math.min(P.brownKg/k*100,100);return`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="width:90px;font-size:11px;font-weight:500;color:${P.color};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${P.cat}</span>
              <div style="flex:1;background:#e5e7eb;border-radius:3px;height:20px;overflow:hidden;position:relative;">
                <div style="background:${P.color};opacity:0.7;height:100%;width:${E}%;border-radius:3px;"></div>
                <span style="position:absolute;top:2px;left:6px;font-size:10px;font-weight:600;color:#374151;">${ae(P.brownKg)}kg (${Math.ceil(P.brownKg/60)}俵)</span>
              </div>
              <span style="width:60px;font-size:10px;text-align:right;color:var(--text-secondary);">${ae(Math.round(P.brewingL))}L</span>
            </div>
          `}).join("")})()}
    </section>

    ${h}

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
            ${[...m.entries()].sort((_,k)=>k[1].brownKg-_[1].brownKg).map(([_,k])=>{const P=(k.brownKg/60).toFixed(1),E=k.usage.map(I=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${I.type==="麹米"?"rgba(99,102,241,0.08)":"rgba(183,121,31,0.08)"};margin-right:3px;">${I.cat}/${I.type} ${ae(I.kg)}kg</span>`).join("");return`
                <tr>
                  <td style="font-weight:600;">${_}</td>
                  <td style="text-align:right;font-weight:600;">${ae(k.brownKg)}</td>
                  <td style="text-align:right;">${P}</td>
                  <td style="text-align:right;">¥${ae(k.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${ae(k.cost)}</td>
                  <td style="max-width:300px;overflow-x:auto;">${E}</td>
                </tr>
              `}).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              <td style="text-align:right;">${ae(b)}</td>
              <td style="text-align:right;">${Math.ceil(b/60)}</td>
              <td></td>
              <td style="text-align:right;">¥${ae(w)}</td>
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
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${ae(M)}kg</strong> <span style="color:var(--text-secondary);">(${(M/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${ae(s)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${ae(L)}kg</strong> <span style="color:var(--text-secondary);">(${(L/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${ae(r)}</div>
        </div>
        <div style="background:var(--surface-alt);border-radius:8px;padding:14px;border:2px solid var(--border);">
          <div style="font-size:11px;font-weight:600;">総合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${ae(b)}kg</strong> <span style="color:var(--text-secondary);">(${Math.ceil(b/60)}俵)</span></div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">¥${ae(w)}<span style="font-size:13px;font-weight:400;margin-left:4px;">(${(w/1e4).toFixed(0)}万)</span></div>
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
      ${(()=>{const _=new Map;for(const[N,j]of m)_.set(N,j.brownKg);const k=new Map;for(const N of c){k.has(N.varietyName)||k.set(N.varietyName,{bales:0,kg:0,cost:0,suppliers:[]});const j=k.get(N.varietyName);j.bales+=N.committedBales,j.kg+=N.committedBales*60,j.cost+=N.committedBales*60*N.pricePerKg,N.supplier&&!j.suppliers.includes(N.supplier)&&j.suppliers.push(N.supplier)}const P=[...new Set([..._.keys(),...k.keys()])];let E=0,I=0;const T=P.map(N=>{const j=_.get(N)??0,F=k.get(N),z=F?.kg??0,Y=z-j;E+=z,I+=j;const H=Y>=0?"#22c55e":"#ef4444",G=Y>=0?`+${ae(Math.round(Y))}kg余裕`:`${ae(Math.round(Y))}kg不足`,J=z>0?Math.min(j/z*100,100):0;return`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${N}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${ae(Math.round(z))}kg (${F?.bales??0}俵)</span>
                  <span>必要 ${ae(Math.round(j))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${J}%;background:${z>0?Y>=0?"#22c55e":"#ef4444":"#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${H};">${z>0?G:"未確保"}</span>
            </div>
          `}).join(""),O=E-I;return`
          <div style="margin-bottom:12px;">
            ${T||'<p style="color:var(--text-secondary);text-align:center;padding:12px;">作付け予定が未登録です</p>'}
          </div>
          ${E>0?`
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;padding:8px;background:var(--surface-alt);border-radius:6px;">
              <span>確保合計: <strong>${ae(Math.round(E))}kg</strong> (${Math.ceil(E/60)}俵)</span>
              <span>必要合計: <strong>${ae(Math.round(I))}kg</strong></span>
              <span style="color:${O>=0?"#22c55e":"#ef4444"};font-weight:600;">
                ${O>=0?`余裕 ${ae(Math.round(O))}kg`:`不足 ${ae(Math.round(-O))}kg`}
              </span>
            </div>
          `:""}
          <div style="display:flex;gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap;">
            <select id="proc-commit-variety" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;">
              ${l.map(N=>`<option value="${N.name}">${N.name}</option>`).join("")}
            </select>
            <input id="proc-commit-bales" type="number" min="0" step="1" placeholder="俵数"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <input id="proc-commit-price" type="number" min="0" step="10" placeholder="円/kg"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <select id="proc-commit-month" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">
              <option value="">入荷月</option>
              ${vt.map((N,j)=>`<option value="${N}">${Tn[j]}</option>`).join("")}
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
        ${l.map(_=>`
          <div style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;margin:2px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
            <strong>${_.name}</strong>
            <span style="color:var(--text-secondary);">¥${ae(_.defaultPricePerKg)}/kg</span>
            ${_.region?`<span style="color:var(--text-secondary);font-size:10px;">${_.region}</span>`:""}
            <button data-action="proc-delete-variety" data-id="${_.id}"
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
  `}const Gd={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Wd={planned:"計画中",active:"進行中",completed:"完了"},Zs={未着手:"#d1d5db",進行中:"#3b82f6",完了:"#22c55e"},Be=6;function eo(e){return e.toLocaleString("ja-JP")}function Et(e){return Gd[e]??"#6366f1"}function Bt(e,t){return Math.round((new Date(t).getTime()-new Date(e).getTime())/864e5)}function Xd(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n.toISOString().slice(0,10)}function Ne(e){return e?e.slice(5).replace("-","/"):"―"}function Zd(e){return e.length<=3?e:e.slice(0,3)}function ep(e,t,n){const o=e.filter(s=>s.status!=="completed"&&s.startDate&&s.targetEndDate);if(o.length===0)return"";const i=o.flatMap(s=>[s.startDate,s.targetEndDate]),l=o.flatMap(s=>t[s.id]??[]);for(const s of l)s.plannedStart&&i.push(s.plannedStart),s.plannedEnd&&i.push(s.plannedEnd);i.sort();const c=i[0],p=i[i.length-1],u=Math.min(Bt(c,p)+7,180),y=u*Be,v=[];let f="";for(let s=0;s<u;s++){const r=Xd(c,s),d=r.slice(0,7);d!==f&&(v.push(`<span style="position:absolute;left:${s*Be}px;font-size:9px;color:#6b7280;white-space:nowrap;border-left:1px solid #d1d5db;padding-left:2px;">${parseInt(r.slice(5,7))}月</span>`),f=d)}const x=new Date().toISOString().slice(0,10),A=Bt(c,x),C=A>=0&&A<u?`<div style="position:absolute;left:${A*Be}px;top:0;width:2px;height:100%;background:#ef4444;z-index:5;opacity:0.7;pointer-events:none;"></div>`:"",M=30,L=o.map(s=>{const r=(t[s.id]??[]).sort((b,w)=>b.stepOrder-w.stepOrder),d=Et(s.brewCategory),m=n===s.id,h=r.map(b=>{const w=Math.max(Bt(c,b.plannedStart),0),$=Math.min(Bt(c,b.plannedEnd),u-1),_=w*Be,k=Math.max(($-w+1)*Be,Be),P=Zs[b.status],E=b.status==="未着手"?"#555":"#fff";return`<div class="bp-gantt-bar" data-step-id="${b.id}" data-batch-id="${b.batchId}" data-step-order="${b.stepOrder}" data-planned-start="${b.plannedStart}" data-planned-end="${b.plannedEnd}" style="position:absolute;left:${_}px;top:4px;width:${k}px;height:22px;background:${P};border-radius:3px;font-size:7px;line-height:22px;color:${E};overflow:hidden;white-space:nowrap;cursor:grab;border:1px solid ${b.status==="未着手"?"#bbb":P};" title="${b.stepName} ${Ne(b.plannedStart)}〜${Ne(b.plannedEnd)}"><div class="bp-gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div><span style="padding:0 16px;pointer-events:none;">${k>24?Zd(b.stepName):""}</span><div class="bp-gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div></div>`}).join("");return`<div style="display:flex;align-items:center;border-bottom:1px solid ${m?"#3b82f6":"#f3f4f6"};min-height:${M}px;background:${m?"#eff6ff":"transparent"};" data-action="bp-toggle-detail" data-batch-id="${s.id}">
      <div style="width:120px;flex-shrink:0;padding:2px 6px;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;">
        <span style="color:${d};font-weight:600;">${s.batchCode}</span>
        <span style="color:#9ca3af;display:block;font-size:8px;">${s.brewCategory}</span>
      </div>
      <div style="position:relative;width:${y}px;height:${M}px;background:repeating-linear-gradient(90deg,transparent 0 ${Be*7-1}px,#f3f4f6 ${Be*7-1}px ${Be*7}px);">${h}</div>
    </div>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>醸造ガントチャート</h2><p class="panel-caption">バッチをクリックで詳細表示 ／ バーをドラッグで日程調整</p></div>
    <div id="bp-gantt" style="overflow-x:auto;touch-action:none;user-select:none;">
      <div style="min-width:${y+120}px;">
        <div style="display:flex;align-items:flex-end;">
          <div style="width:120px;flex-shrink:0;"></div>
          <div style="position:relative;width:${y}px;height:20px;">${v.join("")}</div>
        </div>
        <div style="position:relative;">${L}${C}</div>
      </div>
    </div>
  </section>`}function tp(e,t){const n=[...t].sort((M,L)=>M.stepOrder-L.stepOrder);if(n.length===0)return"";const o=120,i=50,l=40,c=20,p=5,u=Math.ceil(n.length/p),y=p*(o+l)-l+20,v=u*(i+c)-c+20,f=M=>{const L=Math.floor(M/p);return{x:10+(L%2===0?M%p:p-1-M%p)*(o+l),y:10+L*(i+c)}},x=n.map((M,L)=>{const s=f(L),r=Zs[M.status],d=M.status==="進行中"?"#1d4ed8":M.status==="完了"?"#15803d":"#9ca3af",m=M.status==="未着手"?"#374151":"#fff";return`<g>
      <rect x="${s.x}" y="${s.y}" width="${o}" height="${i}" rx="6" fill="${r}" stroke="${d}" stroke-width="2"/>
      <text x="${s.x+o/2}" y="${s.y+20}" text-anchor="middle" fill="${m}" font-size="11" font-weight="600">${M.stepName}</text>
      <text x="${s.x+o/2}" y="${s.y+36}" text-anchor="middle" fill="${m}" font-size="9" opacity="0.8">${Ne(M.plannedStart)}〜${Ne(M.plannedEnd)}</text>
    </g>`}).join(""),A=n.slice(1).map((M,L)=>{const s=f(L),r=f(L+1),d=s.x+o/2,m=s.y+i/2,h=r.x+o/2,b=r.y+i/2;if(Math.floor(L/p)===Math.floor((L+1)/p)){const $=h>d?1:-1,_=s.x+($>0?o:0),k=m,P=r.x+($>0?0:o);return`<line x1="${_}" y1="${k}" x2="${P}" y2="${b}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}else{const $=s.y+i,_=r.y;return`<line x1="${d}" y1="${$}" x2="${h}" y2="${_}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}}).join("");return`<div id="bp-network" style="margin-bottom:16px;">
    <section class="panel">
      <div class="panel-header">
        <h2 style="display:flex;align-items:center;gap:6px;">
          <span style="color:${Et(e.brewCategory)};">●</span> ${e.batchCode} 工程フロー
        </h2>
        <p class="panel-caption">クリティカルパス（全工程直列）</p>
      </div>
      <div style="overflow-x:auto;padding:8px 0;">
        <svg width="${y}" height="${v}" style="display:block;">
          <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/></marker></defs>
          ${A}${x}
        </svg>
      </div>
    </section>
  </div>`}function ap(e,t,n){if(e.length===0)return'<div class="panel" style="padding:20px;text-align:center;color:#9ca3af">バッチ未登録。調達計画から取込むか、新規バッチを追加してください。</div>';const o=e.map(i=>{const l=t[i.id]??[],c=l.length,p=l.filter(f=>f.status==="完了").length,u=c>0?Math.round(p/c*100):0,y=Et(i.brewCategory);return`<tr style="border-bottom:1px solid #f3f4f6;background:${n===i.id?"#eff6ff":"transparent"};cursor:pointer;" data-action="bp-toggle-detail" data-batch-id="${i.id}">
      <td style="padding:6px;font-size:12px;font-weight:600;color:${y};">${i.batchCode}</td>
      <td style="padding:6px;font-size:11px;"><span style="background:${y};color:#fff;padding:1px 6px;border-radius:9999px;font-size:10px;">${i.brewCategory}</span></td>
      <td style="padding:6px;font-size:11px;text-align:right;">
        <input type="number" min="0" step="100" value="${Math.round(i.plannedVolumeL)}" data-action="bp-batch-vol" data-batch-id="${i.id}" style="width:60px;font-size:11px;text-align:right;border:1px solid #e5e7eb;border-radius:3px;padding:2px 4px;" onclick="event.stopPropagation()">L
      </td>
      <td style="padding:6px;font-size:11px;">
        <input type="date" value="${i.startDate}" data-action="bp-batch-date" data-batch-id="${i.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
      </td>
      <td style="padding:6px;">
        <select data-action="bp-batch-status" data-batch-id="${i.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
          ${["planned","active","completed"].map(f=>`<option value="${f}"${i.status===f?" selected":""}>${Wd[f]}</option>`).join("")}
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
        <button data-action="bp-show-delete-modal" data-batch-id="${i.id}" data-batch-code="${i.batchCode}" style="font-size:10px;padding:2px 8px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;" onclick="event.stopPropagation()">削除</button>
      </td>
    </tr>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>バッチ一覧</h2><p class="panel-caption">${e.length}件 ／ 行クリックでフロー図表示</p></div>
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
  </section>`}function np(e,t){if(e.length===0)return"";const n=new Set(t.map(l=>`${l.brewCategory}:${l.startDate?.slice(0,7)}`)),o=e.filter(l=>{const c=l.brewMonth>=10?l.fy:l.fy+1,p=`${l.brewCategory}:${c}-${String(l.brewMonth).padStart(2,"0")}`;return!n.has(p)&&l.plannedVolumeL>0});return o.length===0?"":`<section class="panel" style="margin-bottom:16px">
    <div class="panel-header">
      <div><h2>調達計画から取込</h2><p class="panel-caption">未登録のスケジュールを一括でバッチ作成</p></div>
      <button class="button primary" data-action="bp-import-schedule" style="font-size:12px;">一括登録</button>
    </div>
    <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid #e5e7eb;color:#6b7280;text-align:left;font-size:10px">
        <th style="padding:3px 6px">区分</th><th style="padding:3px 6px">コード</th><th style="padding:3px 6px;text-align:right">醸造量</th><th style="padding:3px 6px">開始月</th><th style="padding:3px 3px;text-align:center">選択</th>
      </tr></thead><tbody>${o.map(l=>{const p=`${l.brewMonth>=10?l.fy:l.fy+1}-${String(l.brewMonth).padStart(2,"0")}-01`,u=`${l.brewCategory}-${l.fy}-${String(l.brewMonth).padStart(2,"0")}`;return`<tr>
      <td style="padding:5px 6px"><span style="color:${Et(l.brewCategory)};font-weight:600;font-size:11px;">${l.brewCategory}</span></td>
      <td style="padding:5px 6px;font-size:11px;">${u}</td>
      <td style="padding:5px 6px;text-align:right;font-size:11px;">${eo(Math.round(l.plannedVolumeL))}L</td>
      <td style="padding:5px 6px;font-size:11px;">${l.brewMonth}月（${p}）</td>
      <td style="padding:5px 3px;text-align:center;"><input type="checkbox" data-action="bp-import-check" data-cat="${l.brewCategory}" data-month="${l.brewMonth}" data-vol="${Math.round(l.plannedVolumeL)}" data-date="${p}" data-code="${u}" checked></td>
    </tr>`}).join("")}</tbody></table></div>
  </section>`}function sp(e){return`<div class="panel" style="margin-bottom:16px">
    <div class="panel-header">新規バッチ登録</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;padding:10px 0;font-size:12px;">
      <label>区分<br><select id="bp-new-cat" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;">
        ${e.map(t=>`<option value="${t}">${t}</option>`).join("")}
      </select></label>
      <label>バッチコード<br><input id="bp-new-code" type="text" placeholder="JG-2026-01" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;width:120px;"></label>
      <label>醸造量(L)<br><input id="bp-new-vol" type="number" placeholder="1800" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;width:80px;"></label>
      <label>開始日<br><input id="bp-new-date" type="date" style="padding:5px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;"></label>
      <button class="button primary" data-action="bp-create-batch" style="font-size:12px;padding:6px 16px;">登録</button>
    </div>
  </div>`}function op(e,t){const n=[...t].sort((l,c)=>l.stepOrder-c.stepOrder);if(n.length===0)return"";const o=n.map(l=>`<tr style="border-bottom:1px solid #f3f4f6">
    <td style="padding:4px 6px;font-size:11px;font-weight:${l.status==="進行中"?700:400}">${l.stepName}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${Ne(l.plannedStart)}〜${Ne(l.plannedEnd)}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${l.actualStart?Ne(l.actualStart):"―"}〜${l.actualEnd?Ne(l.actualEnd):"―"}</td>
    <td style="padding:4px 3px">
      <select data-action="bp-step-status" data-step-id="${l.id}" data-batch-id="${l.batchId}" style="font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px">
        ${["未着手","進行中","完了"].map(c=>`<option value="${c}"${l.status===c?" selected":""}>${c}</option>`).join("")}
      </select>
    </td>
    <td style="padding:4px 3px"><input type="number" step="0.1" data-action="bp-step-temp" data-step-id="${l.id}" value="${l.temperature??""}" placeholder="℃" style="width:50px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
    <td style="padding:4px 3px"><input type="text" data-action="bp-step-notes" data-step-id="${l.id}" value="${l.notes}" placeholder="メモ" style="width:100px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
  </tr>`).join("");return`<section class="panel" style="margin-bottom:16px;border-left:4px solid ${Et(e.brewCategory)};">
    <div class="panel-header"><h2>${e.batchCode} 工程詳細</h2><p class="panel-caption">${e.brewCategory} ｜ ${eo(e.plannedVolumeL)}L ｜ ${Ne(e.startDate)}〜${Ne(e.targetEndDate)}</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:500px">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left">
          <th style="padding:3px 6px">工程</th><th style="padding:3px 6px">予定</th><th style="padding:3px 6px">実績</th>
          <th style="padding:3px 3px">状態</th><th style="padding:3px 3px">温度</th><th style="padding:3px 3px">メモ</th>
        </tr></thead>
        <tbody>${o}</tbody>
      </table>
    </div>
  </section>`}function rp(e,t,n,o={}){const{expandedBatchId:i,showNewForm:l,schedule:c=[],fy:p=2026}=o,u={};for(const M of t)(u[M.batchId]??=[]).push(M);const y=e.filter(M=>M.status==="active").length,v=e.filter(M=>M.status==="planned").length,f=e.filter(M=>M.status==="completed").length,x=i?e.find(M=>M.id===i):null,A=x?tp(x,u[x.id]??[]):"",C=x?op(x,u[x.id]??[]):"";return`
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>醸造工程管理</h1></div>
      <div class="meta-stack"><button class="button" data-action="bp-show-new-form">＋ 新規バッチ</button></div>
    </section>
    <section class="kpi-grid compact">
      <article class="panel kpi-card"><p class="panel-title">進行中</p><p class="kpi-value">${y}</p><p class="kpi-sub">アクティブ</p></article>
      <article class="panel kpi-card"><p class="panel-title">計画中</p><p class="kpi-value">${v}</p><p class="kpi-sub">未着手</p></article>
      <article class="panel kpi-card"><p class="panel-title">完了</p><p class="kpi-value">${f}</p><p class="kpi-sub">今期</p></article>
    </section>

    ${ep(e,u,i)}
    ${l?sp(n):""}
    ${np(c,e)}
    ${A}
    ${C}
    ${ap(e,u,i)}

    <div id="bp-delete-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:1000;align-items:center;justify-content:center;">
      <div style="background:white;border-radius:12px;padding:24px;max-width:360px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <h3 style="margin:0 0 12px;font-size:15px;">バッチを削除</h3>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;"><strong id="bp-delete-batch-name"></strong> を削除します。<br>関連する全工程データも削除されます。</p>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button data-action="bp-delete-cancel" style="padding:8px 16px;font-size:13px;border:1px solid #d1d5db;background:white;border-radius:6px;cursor:pointer;">キャンセル</button>
          <button data-action="bp-delete-confirm" style="padding:8px 16px;font-size:13px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer;font-weight:600;">削除する</button>
        </div>
      </div>
    </div>`}function Aa(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function ip(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function to(e){return e?ta.find(t=>t.value===e)?.label??e:""}function lp(e){const t=[],n=[],o=[];for(const i of e){const l=i.amount_last_year_same_month>0?i.amount_this_month/i.amount_last_year_same_month:1,c={code:i.customer_code,name:i.customer_name,businessType:i.business_type,areaCode:i.area_code,phone:i.phone,lastOrderDate:i.last_order_date,daysSinceLastOrder:i.days_since_order,totalAmountLast12m:i.amount_12m,amount3m:i.amount_3m,amountThisMonth:i.amount_this_month,amountLastYearSameMonth:i.amount_last_year_same_month,annualRevenue:i.annual_revenue,yoyRatio:l,status:"dormant"};i.is_at_risk?t.push({...c,status:"at-risk"}):i.is_dormant?n.push({...c,status:"dormant"}):i.amount_last_year_same_month>0&&l<.8&&o.push({...c,status:"declining"})}return t.sort((i,l)=>l.totalAmountLast12m-i.totalAmountLast12m),n.sort((i,l)=>l.daysSinceLastOrder-i.daysSinceLastOrder),o.sort((i,l)=>i.yoyRatio-l.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:o}}function cp(e,t){const n=t?.reason??"",o=ta.map(i=>`<option value="${i.value}" ${n===i.value?"selected":""}>${i.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${o}
    </select>`}function dp(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],o=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',i=!!t?.actionedAt,l=i?'style="opacity:0.45;"':"",c=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${to(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${i?"1":"0"}" ${l}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${c}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${o}
      <td class="numeric">${Aa(e.totalAmountLast12m)}</td>
      <td>${cp(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${i?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function ha(e,t,n,o,i,l,c,p){if(i.length===0)return"";const u=i.map(y=>dp(y,p.get(y.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${o}" style="margin-right:8px;">${i.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${ip(l)}</p>
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
    </section>`}function pp(e,t=[]){const{atRiskCustomers:n,dormantCustomers:o,decliningCustomers:i}=e,l=n.length+o.length+i.length,c=n.reduce((L,s)=>L+s.totalAmountLast12m,0),p=o.reduce((L,s)=>L+s.totalAmountLast12m,0),u=i.reduce((L,s)=>L+s.totalAmountLast12m,0),y=[...n,...o,...i],v=[...new Set(y.map(L=>L.areaCode).filter(Boolean))].sort(),f=[...new Set(y.map(L=>L.businessType).filter(Boolean))].sort(),x=new Map(t.map(L=>[L.customerCode,L])),A=t.filter(L=>L.actionedAt).length,C=new Map;t.forEach(L=>{L.reason&&C.set(L.reason,(C.get(L.reason)??0)+1)});const M=[...C.entries()].sort((L,s)=>s[1]-L[1]).slice(0,5).map(([L,s])=>`<span class="status-pill info" style="font-size:0.75rem;">${to(L)} ${s}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${Aa(c)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${o.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${Aa(p)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${i.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${A}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-muted);">${l}社中</div>
      </div>
    </section>

    ${M?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${M}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${l})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${o.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${i.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${v.map(L=>`<option value="${L}">${L}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${f.map(L=>`<option value="${L}">${L}</option>`).join("")}
      </select>
    </div>

    ${ha("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,c,"状況",x)}
    ${ha("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",o,p,"経過日数",x)}
    ${ha("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",i,u,"前年同月比",x)}

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
    <\/script>`}const ze=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Ca={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},je={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function up(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function mp(e){const t=e.reduce((l,c)=>l+c,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const o=Math.max(...e);return e.filter(l=>l>o*.1).length<=6?"seasonal":"year-round"}function yp(e){const t=e.reduce((l,c)=>l+c,0);if(t===0)return[];const o=t/12*1.5,i=[];for(let l=0;l<12;l++)e[l]>o&&i.push(l);if(i.length===0){const l=Math.max(...e);l>0&&i.push(e.indexOf(l))}return i.sort((l,c)=>l-c)}function hp(e){return e.length===0?0:(e[0]-2+12)%12}function Mn(e){const t=new Date().getMonth(),n=e.map(i=>{const l=mp(i.monthlyQuantity),c=yp(i.monthlyQuantity),p=hp(c);return{code:i.code,name:i.name,category:i.category,peakMonths:c,proposalStartMonth:p,seasonType:l,monthlyQuantity:i.monthlyQuantity}}),o=[];for(let i=0;i<12;i++){const l=n.filter(c=>{if(c.peakMonths.length===0)return!1;const p=c.proposalStartMonth,u=c.peakMonths[0];return p<=u?i>=p&&i<=u:i>=p||i<=u});o.push({month:i,products:l,targetCustomers:[]})}return{products:n,proposals:o,selectedMonth:t}}function gp(e){const{products:t,proposals:n,selectedMonth:o}=e,i=new Date().getMonth(),l={"year-round":[],seasonal:[],"year-end":[]};t.forEach(f=>l[f.seasonType].push(f));const c=n[o],p=t.length,u=c?.products.length??0,y=t.filter(f=>f.peakMonths.includes(o)).length,v=c?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${ze[o]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${ze[o]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${y}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${v}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${ze.map((f,x)=>{const A=x===i,C=x===o;return`<button class="button" style="padding:4px 10px;background:${C?"#0F5B8D":A?"#e2e8f0":"transparent"};color:${C?"#fff":"#333"};border:${A&&!C?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${x}">${f}${A?" ●":""}</button>`}).join("")}
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
            ${ze.map((f,x)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${x===i?"background:#f0f7ff;":""}">${f.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${fp(l,i)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${vp(l,o)}

  <!-- Target customer list for selected month -->
  ${bp(c)}
</div>`}function fp(e,t){const n=[],o=["year-round","seasonal","year-end"];for(const i of o){const l=e[i];if(l.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${je[i]}15;color:${je[i]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${Ca[i]}</span>
    </td></tr>`);for(const c of l){const p=ze.map((u,y)=>{const v=c.peakMonths.includes(y),f=ao(c,y),x=y===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let A="transparent";v?A=je[c.seasonType]:f&&(A=je[c.seasonType]+"40");const C=v||f?`background:${A};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${x}"><div style="${C}" title="${v?"ピーク":f?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${c.name}"><span class="mono" style="font-size:0.7rem;color:#888">${c.code}</span> ${c.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${je[c.seasonType]}15;color:${je[c.seasonType]}">${Ca[c.seasonType]}</span></td>
        ${p}
      </tr>`)}}}return n.join("")}function ao(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,o=e.peakMonths[0];return n<=o?t>=n&&t<o:t>=n||t<o}function vp(e,t){const o=["year-round","seasonal","year-end"].map(i=>{const l=e[i];if(l.length===0)return"";const c=l.filter(u=>u.peakMonths.includes(t)||ao(u,t));if(c.length===0)return"";const p=c.map(u=>{const v=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',f=u.monthlyQuantity.reduce((x,A)=>x+A,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${v}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${f.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map(x=>ze[x]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${je[i]}15;color:${je[i]}">${Ca[i]}</span>
        <span style="font-size:0.85rem;color:#666">${ze[t]}の対象: ${c.length}品</span>
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
    </div>`}).filter(Boolean);return o.length===0?`<div style="padding:1rem;color:#666;text-align:center">${ze[t]}に提案対象の商品はありません</div>`:o.join("")}function bp(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${up(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const wp=["日","月","火","水","木","金","土"];function xp(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n-1,1),i=new Date(t,n,0),l=[];for(let c=0;c<o.getDay();c++)l.push({outside:!0});for(let c=1;c<=i.getDate();c++)l.push({date:`${e}-${String(c).padStart(2,"0")}`});for(;l.length%7!==0;)l.push({outside:!0});return l}function $p(e,t,n){const[o,i]=t.split("-").map(Number),l=new Date(o,i-2,1),c=new Date(o,i,1),p=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}`,u=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,y=new Date().toISOString().slice(0,10),f=xp(t).map(M=>{if(M.outside)return'<div class="sc-cell sc-outside"></div>';const L=M.date,s=Number(L.split("-")[2]),r=new Date(`${L}T00:00:00`).getDay(),d=e?.[L],m=L===y,h=L===n;let b="",w="";return d&&(b=`<span class="sc-badge">${d.count}件</span>`,w=d.cityGroups.slice(0,3).map($=>`<span class="sc-city-tag">${$.city}<em>${$.count}</em></span>`).join(""),d.cityGroups.length>3&&(w+=`<span class="sc-city-more">+${d.cityGroups.length-3}</span>`)),`
      <div class="sc-cell ${m?"sc-today":""} ${h?"sc-selected":""} ${d?"sc-has-data":""}"
           data-sc-date="${L}">
        <div class="sc-day-header">
          <span class="sc-day-num ${r===0?"sc-sun":r===6?"sc-sat":""}">${s}</span>
          ${b}
        </div>
        <div class="sc-cities">${w}</div>
      </div>
    `}).join(""),x=n&&e?.[n]?_p(e[n]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',A=Object.values(e??{}).reduce((M,L)=>M+L.count,0),C=Object.values(e??{}).reduce((M,L)=>M+L.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${A>0?`月計: <strong>${A}件</strong> / <strong>¥${C.toLocaleString()}</strong>`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${p}">◀</button>
          <span class="sc-month-label">${o}年${i}月</span>
          <button class="sc-nav-btn" data-sc-ym="${u}">▶</button>
        </div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays">
            ${wp.map((M,L)=>`<div class="sc-weekday ${L===0?"sc-sun":L===6?"sc-sat":""}">${M}</div>`).join("")}
          </div>
          <div class="sc-grid">
            ${e===null?'<div class="sc-loading"><div class="loading-spinner"></div><p>読み込み中…</p></div>':f}
          </div>
        </div>

        <div class="sc-detail-col${n?" sc-detail-active":""}">
          ${x}
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
      .sc-detail-close { display: none; }

      .sc-detail-date { font-size: 1rem; font-weight: 700; margin: 0 0 4px; }
      .sc-detail-meta { font-size: 0.8rem; color: var(--text-muted, #6b7280); margin-bottom: 12px; }
      .sc-city-section { margin-bottom: 12px; }
      .sc-city-label { font-size: 0.75rem; font-weight: 700; color: var(--primary, #0F5B8D); border-bottom: 1px solid #dbeafe; padding-bottom: 4px; margin-bottom: 6px; }
      .sc-customer-row { display: flex; justify-content: space-between; align-items: baseline; padding: 3px 0; font-size: 0.8rem; border-bottom: 1px solid var(--border, #e5e7eb); gap: 8px; }
      .sc-customer-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .sc-customer-amt { flex-shrink: 0; color: var(--text-muted, #6b7280); font-size: 0.75rem; }

      /* ── スマホ: 1画面レイアウト ── */
      @media (max-width: 640px) {
        .sc-header { padding: 10px 12px 8px; }
        .sc-title { font-size: 0.95rem; }
        .sc-title-row { margin-bottom: 6px; gap: 8px; }
        .sc-month-summary { font-size: 0.75rem; }
        .sc-nav-btn { padding: 3px 10px; }
        .sc-month-label { font-size: 0.9rem; min-width: 80px; }

        .sc-body { grid-template-columns: 1fr; min-height: unset; }
        .sc-calendar-col { padding: 6px 8px; border-right: none; }
        .sc-weekday { font-size: 0.7rem; padding: 2px 0; }

        /* セルを低くして6行が画面に収まるように */
        .sc-cell { min-height: 44px; padding: 2px 3px; border-radius: 4px; }
        .sc-day-num { font-size: 0.75rem; }
        .sc-badge { font-size: 0.6rem; padding: 1px 4px; }
        /* 都市タグはセル内に非表示 (タップで詳細表示するため) */
        .sc-cities { display: none; }

        /* 詳細パネル: 下から出るボトムシート */
        .sc-detail-col { display: none; }
        .sc-detail-col.sc-detail-active {
          display: block;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: #fff;
          border-top: 2px solid var(--primary, #0F5B8D);
          border-radius: 16px 16px 0 0;
          box-shadow: 0 -4px 24px rgba(0,0,0,0.18);
          max-height: 50vh;
          overflow-y: auto;
          padding: 12px 16px 20px;
          z-index: 200;
        }
        .sc-detail-close {
          display: block;
          width: 100%;
          margin-top: 12px;
          padding: 8px;
          background: var(--bg-subtle, #f3f4f6);
          border: 1px solid var(--border, #e5e7eb);
          border-radius: 8px;
          font-size: 0.85rem;
          cursor: pointer;
          color: var(--text-muted, #6b7280);
        }
      }
    </style>
  `}function _p(e){const t=e.date.replace(/-/g,"/").slice(5),n={};for(const i of e.entries)(n[i.city]??=[]).push(i);const o=Object.entries(n).sort((i,l)=>l[1].length-i[1].length).map(([i,l])=>{const c=l.sort((p,u)=>u.amount-p.amount).map(p=>`
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
    ${o}
  `}const Sp=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),ga=["月","火","水","木","金"],Nn=6;function kp(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function Pp(e,t){if(t.length===0)return 0;const n=[...t].sort((i,l)=>i-l);return n.filter(i=>i<=e).length/n.length}function Ep(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function Rn(e){const t=new Date,n=e.map(u=>u.annualRevenue),o=e.map(u=>{const y=kp(u.lastOrderDate,t);let v=0;const f=[];y>=60&&(v+=50,f.push("離反リスク")),u.hasSeasonalProposal&&(v+=30,f.push("季節提案タイミング")),y>=30&&y<60&&(v+=20,f.push("定期巡回"));const x=Pp(u.annualRevenue,n),A=Math.round(x*20);A>0&&(v+=A,f.push("金額ウェイト"));const C=Ep(f,y);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:v,reasons:f,lastOrderDate:u.lastOrderDate,daysSinceOrder:y,annualRevenue:u.annualRevenue,recommendedAction:C}}).filter(u=>u.priorityScore>0).sort((u,y)=>y.priorityScore-u.priorityScore),i=new Map;for(const u of o){const y=u.areaCode||"その他";i.has(y)||i.set(y,[]),i.get(y).push(u)}const l=[...i.entries()].sort((u,y)=>y[1].reduce((v,f)=>v+f.priorityScore,0)-u[1].reduce((v,f)=>v+f.priorityScore,0)),c=[];let p=0;for(const[u,y]of l){const v=y.sort((f,x)=>x.priorityScore-f.priorityScore);for(let f=0;f<v.length&&!(p>=ga.length);f+=Nn){const x=v.slice(f,f+Nn);c.push({dayLabel:ga[p],area:u,visits:x}),p++}if(p>=ga.length)break}return{candidates:o,weekPlan:c,filterArea:"",filterMinScore:0}}function Lp(e){const{candidates:t,weekPlan:n,filterArea:o,filterMinScore:i}=e,l=t.filter(f=>!(o&&f.areaCode!==o||i>0&&f.priorityScore<i)),c=Array.from(new Set(t.map(f=>f.areaCode))).sort(),p=l.length,u=l.filter(f=>f.priorityScore>=50).length,y=l.filter(f=>f.reasons.includes("離反リスク")).length,v=n.reduce((f,x)=>f+x.visits.length,0);return`
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
            ${c.map(f=>`<option value="${f}"${o===f?" selected":""}>${f}</option>`).join("")}
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
      ${n.length===0?"<p>訪問候補がありません。</p>":Ap(n)}
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
            ${l.map(f=>Cp(f)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ap(e){return`
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
  `}function Cp(e){return`
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
      <td class="numeric">${Sp.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function Dp(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},o=e.map(y=>{const v=y.capacity>0?Math.round(y.currentVolume/y.capacity*100):0;return`
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
      `}).join(""),i=e.filter(y=>y.status==="in_use").length,l=e.filter(y=>y.status==="aging").length,c=e.filter(y=>y.status==="empty").length,p=e.reduce((y,v)=>y+v.capacity,0),u=e.reduce((y,v)=>y+v.currentVolume,0);return`
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
          <tbody>${o||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function fa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function qp(e,t,n){const o=e.rows.map((y,v)=>`
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
        <td class="numeric"><strong>${fa(y.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${v}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),i=e.deductions.map((y,v)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${v}" data-ded-field="type">
            ${Object.keys($a).map(f=>`<option value="${f}" ${f===y.type?"selected":""}>${$a[f]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${v}" data-ded-field="categoryCode">
            ${fs.map(f=>`<option value="${f.code}" ${f.code===y.categoryCode?"selected":""}>${f.code}:${f.name}</option>`).join("")}
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
    `).join(""),l=Array.from({length:12},(y,v)=>v+1),c=e.rows.reduce((y,v)=>y+v.exportDeduction+v.sampleDeduction,0),p=e.rows.reduce((y,v)=>y+v.productionVolume,0),u=p>0?c/p*100:0;return`
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
        <p class="kpi-value">${fa(e.totalTax)}</p>
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
          <tbody>${o||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${e.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${fa(e.totalTax)}</th>
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
  `}const Ip={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let Qe=null,Tp=0;const Da=[];function Mp(){return Qe&&document.body.contains(Qe)||(Qe=document.createElement("div"),Qe.className="toast-container",document.body.appendChild(Qe)),Qe}function B(e,t="success",n){const o=Mp(),i=++Tp,l=t==="error"?5e3:t==="warning"?4e3:3e3,c=document.createElement("div");c.className=`toast toast-${t}`,c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.innerHTML=`
    <span class="toast-icon">${Ip[t]}</span>
    <span class="toast-msg">${Rp(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const p={id:i,message:e,type:t,el:c};Da.push(p),o.appendChild(c),requestAnimationFrame(()=>{c.classList.add("toast-enter")});const u=()=>Np(p);c.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{c.classList.add("toast-exit"),c.addEventListener("animationend",u,{once:!0})},l)}function Np(e){const t=Da.indexOf(e);t!==-1&&(Da.splice(t,1),e.el.remove())}function Rp(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Pe(e,t={}){const{title:n="確認",confirmLabel:o="OK",cancelLabel:i="キャンセル",variant:l="primary"}=t;return new Promise(c=>{const p=document.createElement("div");p.className="modal-backdrop confirm-backdrop",p.setAttribute("role","dialog"),p.setAttribute("aria-modal","true"),p.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${l}">
            ${l==="danger"?Op:Bp}
          </div>
          <h3 class="confirm-title">${jt(n)}</h3>
          <p class="confirm-message">${jt(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${jt(i)}</button>
          <button class="button ${l} confirm-ok">${jt(o)}</button>
        </div>
      </div>
    `;const u=v=>{p.classList.add("confirm-exit"),p.addEventListener("animationend",()=>{p.remove()},{once:!0}),c(v)};p.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),p.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),p.addEventListener("click",v=>{v.target===p&&u(!1)});const y=v=>{v.key==="Escape"&&(document.removeEventListener("keydown",y),u(!1))};document.addEventListener("keydown",y),document.body.appendChild(p),requestAnimationFrame(()=>{p.querySelector(".confirm-ok")?.focus()})})}const Op=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,Bp=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function jt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function On(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function qa(e,t,n){if(t.length===0&&(!n||n.length===0))return;const o=n&&n.length>0?n:Object.keys(t[0]??{}).map(y=>({key:y,label:y})),l=`\uFEFF${[o.map(y=>On(y.label)).join(","),...t.map(y=>o.map(v=>On(y[v.key])).join(","))].join(`\r
`)}`,c=new Blob([l],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(c),u=document.createElement("a");u.href=p,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(p),0)}const jp=Object.fromEntries(ta.map(e=>[e.value,e.label])),zp=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan","/procurement","/brewing-process"];let st=[];async function Fp(){const{supabaseQueryAll:e}=await q(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>Z);return{supabaseQueryAll:n}},void 0);st=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const Bn=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"},{path:"/procurement",title:"調達計画"},{path:"/brewing-process",title:"醸造工程"}];function no(e){const t=Ra[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function en(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Vp(){const e=no("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const na=new Date,Yp=na.toISOString().slice(0,7),Up=na.getFullYear(),Jp=na.getMonth()+1,Qp=na.toISOString().slice(0,10),Hp="C0011",He=Vp();function so(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return zp.includes(n)?n:"/"}function tn(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":case"/procurement":case"/brewing-process":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const jn=so(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:en(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Yp,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Up,taxMonth:Jp,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...gd,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...fd},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Qp,route:jn,currentCategory:tn(jn),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},invoiceSelectedDocNo:null,invoiceSelectedLines:null,ledgerCustomerCode:Hp,salesPeriod:"month",customRange:{start:"",end:""},quoteState:Kt(Sa()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCompanySettings:Sa(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...Ga},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:He.mode,emailRegion:He.region,emailHistorySegment:He.historySegment,emailTemplateId:He.templateId,emailSubject:He.subject,emailBody:He.body,emailSaveMessage:He.saveMessage,emailSending:!1,demandForecast:{...cl},shipmentCalendarData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:Ut(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:ct,empCapacity:dt},brewingSchedule:[],brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},riceVarieties:[],ricePurchaseCommitments:[],procurementDecisions:{},brewingBatches:[],brewingProcessSteps:[],bpExpandedBatchId:"",bpShowNewForm:!1,globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function zn(e){return e.slice(0,10)}function Kp(e){return{...e}}function Wt(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function oo(){a.invoiceForm=en(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},Wt()}function ro(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,o)=>{n.productCode.trim()||(t[`lines.${o}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${o}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${o}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${o}.unitPrice`]="単価は0円以上で入力してください。")}),t}function Gp(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,Kp(t))}function Wp(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((o,i)=>{const l=i===0?1:2,c=1200*(i+1);return{productCode:o.code,productName:o.name,quantity:l,unitPrice:c,unit:"本",amount:l*c}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function Xp(e){const t=a.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Zp(e){const t=a.masterStats?.customers.find(n=>n.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function io(e){if(Te(e),a.invoiceErrors=ro(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){S();return}a.invoiceSaving=!0,S(),as(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=en(),S()}).catch(()=>{a.invoiceSaving=!1,S()})}function lo(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((o,i)=>new Date(i.date).getTime()-new Date(o.date).getTime()).filter(o=>{const i=new Date(o.date);return!(t&&i<t||n&&i>n)})}function co(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?st:st.filter(e=>e.area===a.emailRegion);case"history":return st.filter(e=>e.historySegment===a.emailHistorySegment);default:return st}}function eu(){const e=co();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function va(e){const t=co(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(o=>o.email),status:e}}function an(){return a.user,!1}function kt(){a.globalSearchOpen=!1,a.globalQuery=""}function tu(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:Bn.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:Bn}}function au(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?lo(a.salesSummary):[]).map(o=>({documentNo:o.documentNo,date:o.date,customerCode:o.customerCode,customerName:o.customerName,amount:o.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((o,i)=>i.balanceAmount-o.balanceAmount).map(o=>({...o})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(o=>({...o})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(o=>({...o})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(o=>({...o})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(o=>({...o})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(o=>({...o}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(o=>({...o}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}qa(n,e,t)}function ba(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=tn(e),a.sidebarOpen=!1,kt(),nn(e)}async function nn(e){a.actionLoading=!0,S();try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,S(),a.quoteList=await Ka(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:t}=await q(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>R);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await St(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await ja());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await za(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await q(async()=>{const{fetchShipmentCalendar:n}=await Promise.resolve().then(()=>R);return{fetchShipmentCalendar:n}},void 0);a.shipmentCalendarData=await t(a.shipmentCalendarYearMonth);break}case"/billing":a.billingSummary||(a.billingSummary=await Fa(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Zt());break;case"/product-power":a.productPower.length===0&&(a.productPower=await rs());break;case"/customer-efficiency":a.customerEfficiency=await wt(a.customerEfficiencyYear,a.customerEfficiencyGroupBy);break;case"/customer-analysis":a.customerAnalysis||(a.customerAnalysis=await is());break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await q(async()=>{const{fetchDemandForecasts:l,fetchDeliverySchedule:c}=await Promise.resolve().then(()=>R);return{fetchDemandForecasts:l,fetchDeliverySchedule:c}},void 0),[o,i]=await Promise.all([t(),n()]);a.demandForecast.forecasts=o.map(l=>({code:l.productCode,name:l.productName,segment:l.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(l.avgMonthly),adjustedAvg:Math.round(l.avgMonthly),nextMonthForecast:Math.round(l.forecastQuantity),annualForecast:Math.round(l.avgMonthly*12),safetyStock:Math.round(l.safetyStock)})),a.demandForecast.deliveries=dl(i)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:n}=await q(async()=>{const{fetchChurnAlerts:o,fetchChurnNotes:i}=await Promise.resolve().then(()=>R);return{fetchChurnAlerts:o,fetchChurnNotes:i}},void 0);if(!a.churnAlert){const o=await t();a.churnAlert=lp(o)}a.churnNotes=await n();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await q(async()=>{const{fetchProductShipmentsFromTable:o}=await Promise.resolve().then(()=>R);return{fetchProductShipmentsFromTable:o}},void 0),n=await t();if(n.length>0)a.seasonalCalendar=Mn(n.map(o=>({code:o.code,name:o.name,category:"",monthlyQuantity:o.monthlyQuantity})));else{const{fetchProductMonthlyShipments:o}=await q(async()=>{const{fetchProductMonthlyShipments:l}=await Promise.resolve().then(()=>R);return{fetchProductMonthlyShipments:l}},void 0),i=await o();a.seasonalCalendar=Mn(i.map(l=>({code:l.code,name:l.name,category:"",monthlyQuantity:l.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:t}=await q(async()=>{const{fetchVisitPriorities:o}=await Promise.resolve().then(()=>R);return{fetchVisitPriorities:o}},void 0),n=await t();if(n.length>0)a.visitPlanner={candidates:n.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address:o.address,areaCode:o.area_code,businessType:o.business_type,priorityScore:o.priority_score,reasons:o.reasons,lastOrderDate:o.last_order_date,daysSinceOrder:o.days_since_order,annualRevenue:o.annual_revenue,recommendedAction:o.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=Rn(n.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address1:o.address,areaCode:o.area_code,businessType:o.business_type,annualRevenue:o.annual_revenue,lastOrderDate:o.last_order_date,hasSeasonalProposal:o.reasons.some(i=>i.includes("季節"))})));else{const{supabaseQueryAll:o}=await q(async()=>{const{supabaseQueryAll:u}=await Promise.resolve().then(()=>Z);return{supabaseQueryAll:u}},void 0),[i,l]=await Promise.all([o("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):Oa().then(u=>u.customers)]),c=a.masterStats?.customers??l,p=new Map;i.forEach(u=>{const y=u.legacy_customer_code||"",v=u.sales_date||"",f=Number(u.total_amount)||0,x=p.get(y);!x||v>x.lastDate?p.set(y,{lastDate:v,total:(x?.total??0)+f}):x.total+=f}),a.visitPlanner=Rn(c.filter(u=>u.isActive).map(u=>({code:u.code,name:u.name,phone:u.phone,address1:u.address1,areaCode:u.areaCode,businessType:u.businessType,annualRevenue:p.get(u.code)?.total??0,lastOrderDate:p.get(u.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:n,fetchProductionPlan:o,fetchLabelExclusions:i}=await q(async()=>{const{fetchDemandAnalysis:c,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}=await Promise.resolve().then(()=>R);return{fetchDemandAnalysis:c,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}},void 0);if(!a.demandAnalysis){const[c,p]=await Promise.all([t(a.demandYearsBack*12),n()]);a.demandAnalysis=c,a.safetyStockParams=p}if(a.productionPlan.length===0){const c=await o(a.demandPlanYearMonth);c.length>0?a.productionPlan=c:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=buildPlanFromAnalysis(a.demandPlanYearMonth))}const l=await i(a.demandPlanYearMonth);if(a.calendarLabelExcluded=new Set(l),a.productionPlan.length>0){const c=a.productionPlan.filter(p=>!a.calendarLabelExcluded.has(p.productCode));Ie(a.calendarShifts,c,a.calendarCapacity)}break}case"/procurement":case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:n,fetchBrewingSchedule:o,fetchBrewingProductDetail:i,fetchBrewingCustomCategories:l,fetchBrewingCategoryOverrides:c,fetchAllBrewingStockEntries:p,fetchCategoryTypeLinks:u,fetchAvailableProductionTypes:y,fetchBrewingAlcoholSettings:v,fetchBrewingYearlyShipments:f,fetchBrewingSeasonalPattern:x,fetchBrewingForecastOverrides:A,fetchBrewingRiceParams:C,fetchRiceVarieties:M,fetchRicePurchaseCommitments:L,fetchProcurementDecisions:s}=await q(async()=>{const{fetchBrewingPlanSummary:G,fetchBrewingMonthlyTrend:J,fetchBrewingSchedule:Q,fetchBrewingProductDetail:le,fetchBrewingCustomCategories:oe,fetchBrewingCategoryOverrides:ce,fetchAllBrewingStockEntries:U,fetchCategoryTypeLinks:K,fetchAvailableProductionTypes:X,fetchBrewingAlcoholSettings:re,fetchBrewingYearlyShipments:$e,fetchBrewingSeasonalPattern:me,fetchBrewingForecastOverrides:ve,fetchBrewingRiceParams:Oe,fetchRiceVarieties:sa,fetchRicePurchaseCommitments:Lt,fetchProcurementDecisions:mo}=await Promise.resolve().then(()=>R);return{fetchBrewingPlanSummary:G,fetchBrewingMonthlyTrend:J,fetchBrewingSchedule:Q,fetchBrewingProductDetail:le,fetchBrewingCustomCategories:oe,fetchBrewingCategoryOverrides:ce,fetchAllBrewingStockEntries:U,fetchCategoryTypeLinks:K,fetchAvailableProductionTypes:X,fetchBrewingAlcoholSettings:re,fetchBrewingYearlyShipments:$e,fetchBrewingSeasonalPattern:me,fetchBrewingForecastOverrides:ve,fetchBrewingRiceParams:Oe,fetchRiceVarieties:sa,fetchRicePurchaseCommitments:Lt,fetchProcurementDecisions:mo}},void 0),r=a.brewingPlanFY,d=`${r}-10-01`,m=`${r+1}-09-30`,[h,b,w,$,_,k,P,E,I,T,O,N,j,F,z,Y,H]=await Promise.all([t(d,m).catch(()=>[]),n(d,m).catch(()=>[]),o(r).catch(()=>[]),i(d,m).catch(()=>[]),l().catch(()=>[]),c().catch(()=>({})),p().catch(()=>[]),u().catch(()=>({})),y().catch(()=>[]),v().catch(()=>({})),f().catch(()=>[]),x().catch(()=>[]),A().catch(()=>({})),C().catch(()=>({})),M().catch(()=>[]),L(r).catch(()=>[]),s(r).catch(()=>({}))]);a.brewingPlanData=h,a.brewingMonthlyTrend=b,a.brewingSchedule=w,a.brewingProductDetail=$,a.brewingCustomCategories=_,a.brewingOverrides=k,a.brewingStockEntries=P,a.brewingTypeLinks=E,a.brewingAvailableTypes=I,a.brewingYearlyShipments=O,a.brewingSeasonalPattern=N,a.brewingForecastOverrides=j,a.brewingRiceParams=F,a.riceVarieties=z,a.ricePurchaseCommitments=Y,a.procurementDecisions=H,a.brewingAlcoholSettings=T;break}case"/brewing-process":{const{fetchBrewingBatches:t,fetchBrewingProcessSteps:n,fetchBrewingCustomCategories:o,fetchBrewingSchedule:i}=await q(async()=>{const{fetchBrewingBatches:y,fetchBrewingProcessSteps:v,fetchBrewingCustomCategories:f,fetchBrewingSchedule:x}=await Promise.resolve().then(()=>R);return{fetchBrewingBatches:y,fetchBrewingProcessSteps:v,fetchBrewingCustomCategories:f,fetchBrewingSchedule:x}},void 0),l=a.brewingPlanFY,[c,p,u]=await Promise.all([t(l).catch(()=>[]),o().catch(()=>[]),i(l).catch(()=>[])]);a.brewingBatches=c,a.brewingSchedule=u,c.length>0?a.brewingProcessSteps=await n(c.map(y=>y.id)).catch(()=>[]):a.brewingProcessSteps=[],a.brewingCustomCategories=p;break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await cs());break;case"/tanks":a.tankList.length===0&&(a.tankList=await ds());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await ps());break;case"/materials":a.materialList.length===0&&(a.materialList=await us());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([ms(),ys()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([hs(),gs()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await Ya(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Ua(a.storeSalesDate),bs()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await q(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>R);return{fetchMailSenders:n}},void 0);if(a.mailSenders=await t(),!a.emailSenderId||!a.mailSenders.find(n=>n.id===a.emailSenderId)){const n=a.mailSenders.find(o=>o.isDefault)??a.mailSenders[0];n&&(a.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await q(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>R);return{fetchCalendarEvents:n}},void 0);a.calendarEvents=await t(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await q(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>R);return{fetchIntegrationSettings:n}},void 0);a.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchShopifyOrders:o,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>R);return{fetchShopifyOrders:o,fetchIntegrationSettings:i}},void 0);a.shopifyOrders=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchFaxInbox:o,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>R);return{fetchFaxInbox:o,fetchIntegrationSettings:i}},void 0);a.faxRecords=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/ledger":a.customerLedger=await Ba(a.ledgerCustomerCode);break;case"/setup":a.syncDashboard=await Xn();break;case"/raw-browser":a.rawTableList.length===0&&(a.rawTableList=await Es());break;case"/users":{const{fetchUserProfiles:t}=await q(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>R);return{fetchUserProfiles:n}},void 0);a.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:o}=await q(async()=>{const{fetchMyProfile:l,fetchAuditLogs:c,fetchMailSenders:p}=await Promise.resolve().then(()=>R);return{fetchMyProfile:l,fetchAuditLogs:c,fetchMailSenders:p}},void 0),i=a.user?.email??a.myProfile?.email??"";i&&(a.myProfile=await t(i)),a.mailSenders.length===0&&(a.mailSenders=await o()),a.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await q(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>R);return{fetchAuditLogs:n}},void 0);a.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await q(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>R);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:n}=await q(async()=>{const{fetchMapCustomers:l,fetchDeliveryLocations:c}=await Promise.resolve().then(()=>R);return{fetchMapCustomers:l,fetchDeliveryLocations:c}},void 0),[o,i]=await Promise.all([t(),n()]);a.mapCustomers=o,a.deliveryLocations=i}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchCallLogs:o,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>R);return{fetchCallLogs:o,fetchIntegrationSettings:i}},void 0);a.callLogs=await t(100),a.integrations.length===0&&(a.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchLeadLists:o,fetchIntegrationSettings:i}=await Promise.resolve().then(()=>R);return{fetchLeadLists:o,fetchIntegrationSettings:i}},void 0);a.leadLists=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await q(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>R);return{fetchWorkflowOrdersFromDb:n}},void 0);a.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await q(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>R);return{fetchTourInquiriesFromDb:n}},void 0);a.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:o}=await q(async()=>{const{fetchSlackRules:i,fetchSlackLogs:l,fetchIntegrationSettings:c}=await Promise.resolve().then(()=>R);return{fetchSlackRules:i,fetchSlackLogs:l,fetchIntegrationSettings:c}},void 0);a.slackRules=await t(),a.slackLogs=await n(50),a.integrations.length===0&&(a.integrations=await o())}break;case"/":break;default:break}}catch(t){console.error("Route data load error:",e,t),B(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{a.actionLoading=!1,S()}}function Fn(){if(an())return tc(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return At("sales");case"/cat/brewery":return At("brewery");case"/cat/purchase":return At("purchase");case"/cat/more":return At("more");case"/invoice-entry":return El(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/quote":return a.quoteEditId===null?Il(a.quoteList,a.quoteListLoading):Bs(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return Ml(a.quoteCompanySettings);case"/email":return _l(eu());case"/delivery":return a.deliveryNote?xl(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return $p(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate);case"/billing":return a.billingSummary?al(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?Mc(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Vl(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return Yl(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy);case"/customer-analysis":return a.customerAnalysis?Pc(a.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return yl(a.demandForecast);case"/demand":return Rd(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return Jd(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/procurement":{const e={};if(a.brewingYearlyShipments.length>0){const t=new Date,n=t.getMonth()+1,o=n>=10?t.getFullYear():t.getFullYear()-1,i=[...new Set(a.brewingYearlyShipments.map(u=>u.fy))].filter(u=>u<o).sort(),l=new Map;for(const u of a.brewingSeasonalPattern)l.has(u.brewCategory)||l.set(u.brewCategory,new Map),l.get(u.brewCategory).set(u.monthNum,u.avgMonthlyL);const c=[];for(let u=n;u<=9;u++)c.push(u);if(n>=10)for(let u=1;u<=9;u++)c.push(u);const p=new Map;for(const u of a.brewingYearlyShipments)p.has(u.brewCategory)||p.set(u.brewCategory,new Map),p.get(u.brewCategory).set(u.fy,{shipL:u.shipmentL,annualL:u.annualizedL});for(const[u,y]of p){const v=i.filter(b=>y.has(b)).map(b=>y.get(b).shipL);let f=0;if(v.length>=2){const b=[];for(let w=1;w<v.length;w++)v[w-1]>0&&b.push((v[w]-v[w-1])/v[w-1]);f=b.length>0?b.reduce((w,$)=>w+$,0)/b.length:0}const x=u in a.brewingForecastOverrides?a.brewingForecastOverrides[u]:f,A=v.length>0?v[v.length-1]:y.get(o)?.annualL??0,C=l.get(u)??new Map,M=c.reduce((b,w)=>b+(C.get(w)??0),0),L=a.brewingStockEntries.filter(b=>b.brewCategory===u).reduce((b,w)=>b+w.volumeL,0),s=a.brewingAlcoholSettings[u],r=s&&s.targetAlcoholPct>0?s.rawAlcoholPct/s.targetAlcoholPct:1,d=Math.round(L*r),m=Math.max(0,d-Math.round(M)),h=Math.round(A*(1+x));e[u]=Math.max(0,h-m)}}return Kd(e,a.brewingRiceParams,a.brewingCustomCategories,a.brewingSchedule,a.brewingPlanFY,a.riceVarieties,a.ricePurchaseCommitments,a.procurementDecisions)}case"/churn-alert":return a.churnAlert?pp(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?gp(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?Lp(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/brewing-process":{const e=[...new Set(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール",...a.brewingCustomCategories.map(t=>t.name)])];return rp(a.brewingBatches,a.brewingProcessSteps,e,{expandedBatchId:a.bpExpandedBatchId,showNewForm:a.bpShowNewForm,schedule:a.brewingSchedule.map(t=>({brewCategory:t.brewCategory,fy:t.fy,brewMonth:t.brewMonth,durationMonths:t.durationMonths,plannedVolumeL:t.plannedVolumeL})),fy:a.brewingPlanFY})}case"/jikomi":return a.jikomiView==="calendar"?`${vn(a.jikomiList,a.jikomiView)}${Xl(a.jikomiList)}`:vn(a.jikomiList,a.jikomiView);case"/tanks":return Dp(a.tankList);case"/kentei":return Zl(a.kenteiList);case"/materials":return mc(a.materialList)+uc(a.materialEditing,a.materialEditingIsNew);case"/purchase":return vc(a.purchaseList,a.payableList);case"/raw-material":return bc(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?qp(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return Bc(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?$c(a.pipelineMeta,we,ie,a.syncDashboard):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return Pd(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return zc(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return xd(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return Vc(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapCustomers.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>':Yc(a.mapCustomers,a.deliveryLocations,a.mapFilters);case"/workflow":return Qc(a.workflowOrders);case"/mobile-order":return Hc(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return Gc(a.tourInquiries,a.tourActiveId);case"/mail-senders":return Zc(a.mailSenders,a.mailSenderEditingId);case"/calendar":return ed(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return ad(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return nd(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return sd(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/users":return od(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return rd(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return id(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return ld(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return ud(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return md(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return hd(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.salesAnalytics)return"";switch(a.route){case"/sales":return Oc(lo(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return gc([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return pc(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return Jl(a.invoiceRecords,a.invoiceFilter,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/ledger":return il(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return Us(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return su();default:return fl(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function nu(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(i=>!a.dismissedAnnouncements.has(i.id)).map(i=>{const l=e[i.level]??e.info;return`
      <div class="announcement-bar" style="background:${l.bg};border-bottom:2px solid ${l.border};">
        <span class="announcement-text">${l.icon} ${i.message}</span>
        ${i.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${i.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),o=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+o}function su(){function e(n,o,i,l){return`<a href="${`${"/".replace(/\/$/,"")||"/"}${n}`}" data-link="${n}" class="home-card">
      <span class="home-card-icon">${o}</span>
      <span class="home-card-label">${i}</span>
      <span class="home-card-desc">${l}</span>
    </a>`}const t=[{title:"販売業務",color:"#1a56db",cards:[e("/invoice-entry","📝","伝票入力","売上・返品を入力"),e("/quote","📄","見積作成","見積書の作成・管理"),e("/invoice","🔍","伝票照会","過去伝票の照会"),e("/delivery","🚚","納品書","納品書の発行"),e("/billing","💳","月次請求","請求書・入金管理"),e("/ledger","📒","得意先台帳","取引履歴の確認")].join("")},{title:"分析・レポート",color:"#7e3af2",cards:[e("/analytics","📊","売上分析","期間・商品・得意先別"),e("/customer-analysis","👥","得意先分析","ABC分析・ランク"),e("/product-power","📦","商品力分析","商品別販売力"),e("/customer-efficiency","⚡","営業効率","訪問効率・コスト"),e("/report","📈","集計帳票","各種集計帳票"),e("/sales","📋","売上一覧","売上明細一覧")].join("")},{title:"営業・顧客管理",color:"#0e9f6e",cards:[e("/churn-alert","🎯","営業アクション","離反リスク・フォロー"),e("/visit-planner","📅","訪問計画","訪問スケジュール"),e("/shipment-calendar","🚚","配送カレンダー","伝票日付で配送を確認"),e("/map","🗺️","取引先マップ","地図で取引先を確認"),e("/prospects","🌱","新規営業","新規開拓の進捗"),e("/email","✉️","メール配信","一斉メール配信"),e("/seasonal-calendar","🌸","季節提案","季節別提案管理")].join("")},{title:"受注・仕入",color:"#e3a008",cards:[e("/workflow","🔄","受注ワークフロー","受注から出荷まで"),e("/shopify","🛒","Shopify注文","EC受注の確認"),e("/purchase","📥","仕入・買掛","仕入管理・買掛金"),e("/payment","💰","入金状況","入金・回収状況")].join("")},{title:"製造管理",color:"#e02424",cards:[e("/jikomi","🍶","仕込管理","仕込帳・製造記録"),e("/tanks","🛢️","タンク管理","タンク在庫の管理"),e("/tax","📋","酒税申告","酒税申告書の作成"),e("/demand","📆","需要・生産計画","需要予測・生産計画"),e("/brewing-plan","🗓️","醸造計画","年間醸造スケジュール"),e("/procurement","🌾","調達計画","原料米の調達・予算"),e("/brewing-process","🍶","醸造工程","バッチ別の醸造工程管理")].join("")},{title:"マスタ・設定",color:"#6b7280",cards:[e("/master","⚙️","マスタ管理","商品・得意先マスタ"),e("/store","🏪","店舗・直売所","直売所の販売管理"),e("/tour","🏯","酒蔵見学","見学予約の管理"),e("/setup","🔗","連動設定","酒仙iとの連動"),e("/import","📤","データ取込","CSVデータ取込"),e("/users","👤","ユーザー管理","アカウント管理")].join("")}];return`
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
  `}function ou(){if(an())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${Fn()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/procurement":"調達計画","/brewing-process":"醸造工程","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",o=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?kl(a.masterStats.customers,a.pickerQuery):fc(a.masterStats.products,a.pickerQuery):"",i=a.globalSearchOpen?Sl(a.globalQuery,tu()):"",l=a.user?`<span class="app-header-user">${a.user.email}</span>
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
          <button class="button secondary small" type="button" data-action="share-page" title="このページのURLを共有">🔗</button>
          ${l}
        </div>
      </header>
      ${nu()}
      <main class="main-v2">
        <div class="view ${a.actionLoading?"is-busy":""}">${Fn()}</div>
        <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
      </main>
      ${o}
      ${i}
    </div>
  `}async function ru(){a.actionLoading=!0,S();try{const{fetchSalesSummary:e}=await q(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>R);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,S()}}async function iu(e){a.actionLoading=!0,S();try{a.invoiceRecords=await St(e)}finally{a.actionLoading=!1,S()}}async function lu(e){a.actionLoading=!0,S();try{a.customerLedger=await Ba(e)}finally{a.actionLoading=!1,S()}}function Te(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,n)=>{const o=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,i=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:o,unitPrice:i,amount:o*i}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function Ke(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function cu(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,S()}),e.querySelectorAll("[data-action='global-search-close']").forEach(s=>{s.addEventListener("click",r=>{s.classList.contains("global-search")&&r.target instanceof HTMLElement&&!r.target.classList.contains("global-search")||(kt(),S())})}),e.querySelector("#global-search-input")?.addEventListener("input",s=>{a.globalQuery=s.target.value,S()}),e.querySelectorAll("[data-action='global-nav']").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.path;r&&(kt(),ba(r))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{au()}),e.querySelectorAll("[data-jikomi-tab]").forEach(s=>{s.addEventListener("click",()=>{a.jikomiView=s.dataset.jikomiTab,S()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const s=e.querySelector("#auth-email")?.value.trim()??"",r=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,S(),vo(s,r).then(async d=>{a.user=d,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:h}=await q(async()=>{const{fetchMyProfile:b,recordAudit:w}=await Promise.resolve().then(()=>R);return{fetchMyProfile:b,recordAudit:w}},void 0);a.myProfile=await m(d.email),await h({action:"sign_in",userEmail:d.email}),S()}).catch(async d=>{try{const m=await on(s,r);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:h}=await q(async()=>{const{fetchMyProfile:b}=await Promise.resolve().then(()=>R);return{fetchMyProfile:b}},void 0);a.myProfile=await h(m.email)}catch{a.authError=d instanceof Error?d.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,S()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,S()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{bo().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,S()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(s=>{s.addEventListener("click",()=>{a.sidebarOpen=!1,S()})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let s=0;t.addEventListener("touchstart",r=>{s=r.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",r=>{r.changedTouches[0].clientX-s<-60&&(a.sidebarOpen=!1,S())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.id??"";a.dismissedAnnouncements.add(r),S()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='share-page']")?.addEventListener("click",async()=>{const s=window.location.href,r=document.title;if(navigator.share)try{await navigator.share({url:s,title:r})}catch{}else try{await navigator.clipboard.writeText(s),B("URLをコピーしました","success")}catch{B("コピーに失敗しました","error")}}),e.querySelectorAll("[data-link]").forEach(s=>{s.addEventListener("click",r=>{r.preventDefault(),ba(s.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async s=>{s.preventDefault();const r=e.querySelector("#fr-title")?.value??"",d=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",h=e.querySelector("#fr-result");if(!r.trim())return;const b=await ns(r,d,m);if(h&&(h.textContent=b?"送信しました":"送信に失敗しました",h.className=`fr-result ${b?"success":"error"}`),b){const w=e.querySelector("#feature-request-form");w&&w.reset()}}),e.querySelectorAll("[data-period]").forEach(s=>{s.addEventListener("click",()=>{a.salesPeriod=s.dataset.period,S()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const s=e.querySelector("#range-start")?.value??"",r=e.querySelector("#range-end")?.value??"";s&&r&&(a.customRange={start:s,end:r},a.salesPeriod="custom",S())}),e.querySelectorAll("[data-edit-customer]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.editCustomer??"",d=a.masterStats?.customers.find(h=>h.id===r);if(!d)return;const m=document.createElement("div");m.innerHTML=ac(d),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),w=document.getElementById("ec-trade-type")?.value||null,$=await ss(r,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,trade_type:w,manual_override:!0});b&&(b.textContent=$?"保存しました":"保存に失敗",b.className=`fr-result ${$?"success":"error"}`),$&&(document.getElementById("edit-modal")?.remove(),ot())})})}),e.querySelectorAll("[data-edit-product]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.editProduct??"",d=a.masterStats?.products.find(h=>h.id===r);if(!d)return;const m=document.createElement("div");m.innerHTML=nc(d),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),w=await os(r,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});b&&(b.textContent=w?"保存しました":"保存に失敗",b.className=`fr-result ${w?"success":"error"}`),w&&(document.getElementById("edit-modal")?.remove(),ot())})})}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=Kt(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,S()}),e.querySelectorAll("[data-open-quote]").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.openQuote,d=await As(r);if(!d){B("見積の読み込みに失敗しました","error");return}a.quoteState={id:d.id,quoteNo:d.quote_no,quoteDate:d.quote_date,validUntil:d.valid_until??"",customerCode:d.legacy_customer_code??"",customerName:d.customer_name,customerAddress:d.customer_address,subject:d.subject,lines:d.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:d.remarks,taxRate:d.tax_rate,deliveryDate:d.delivery_date,paymentTerms:d.payment_terms,deliveryPlace:d.delivery_place,templateType:d.template_type??"sake",previewMode:!1},a.quoteEditId=r,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,S()})}),e.querySelectorAll("[data-delete-quote]").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.deleteQuote,d=s.dataset.quoteNo??r;if(!await Pe(`見積 ${d} を削除しますか？`))return;await Vn("quotes",r)?(a.quoteList=a.quoteList.filter(b=>b.id!==r),B("削除しました","success"),S()):B("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,S(),Ka().then(s=>{a.quoteList=s,a.quoteListLoading=!1,S()})}),e.querySelectorAll("[name='q-template']").forEach(s=>{s.addEventListener("change",()=>{a.quoteState.templateType=s.value,S()})});function n(s){return(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function o(s){return s.length?s.map(r=>`<button class="search-item" type="button" data-select-customer="${n(r.code)}" data-cust-name="${n(r.name)}" data-cust-addr="${n(r.address1||"")}"><span class="mono">${n(r.code)}</span><span style="font-size:13px;font-weight:600;">${n(r.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function i(s){s.querySelectorAll("[data-select-customer]").forEach(r=>{r.addEventListener("click",async()=>{const d=r.dataset.selectCustomer??"";a.quoteState.customerCode=d,a.quoteState.customerName=r.dataset.custName??"",a.quoteState.customerAddress=r.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),s.remove(),a.quotePricing=await xa(a.masterStats?.customers??[],d),S()})})}function l(s){const r=e.querySelector("#q-cust-search")?.closest(".form-row");if(!r)return;let d=document.getElementById("cust-search-results");d||(d=document.createElement("div"),d.id="cust-search-results",d.className="search-results",r.after(d));const m=a.masterStats?.customers??[],h=s.trim().toLowerCase(),b=h.length===0?m:m.filter(w=>w.name.includes(s)||w.kanaName.includes(s)||w.code.includes(s)||w.name.toLowerCase().includes(h)||w.kanaName.toLowerCase().includes(h));d.innerHTML=o(b),i(d)}function c(s,r){return s.length?s.map(d=>{const m=r?Va(d,r):{price:d.salePrice||0,label:"卸価格"},h=d.listPrice||0,b=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${n(d.code)}" data-prod-name="${n(d.name)}" data-prod-price="${m.price}" data-prod-retail="${h}" data-prod-jan="${n(d.janCode??"")}" data-prod-unit="${n(d.unit)}" data-prod-case="${d.caseQty??""}"><span class="mono">${n(d.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${n(d.name)}</span><span class="numeric"${b?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${n(m.label)})</small>${h?`　定価 ¥${h.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function p(s){s.querySelectorAll("[data-add-product]").forEach(r=>{r.addEventListener("click",()=>{const d=r.dataset.addProduct??"",m=r.dataset.prodName??"",h=parseInt(r.dataset.prodPrice??"0"),b=parseInt(r.dataset.prodRetail??"0")||null,w=r.dataset.prodJan??"",$=r.dataset.prodUnit||"本",_=r.dataset.prodCase??"",k=_?parseInt(_):null;a.quoteState.lines.push({productCode:d,productName:m,janCode:w,caseQty:k,quantity:1,unit:$,unitPrice:h,retailPrice:b,amount:h}),a.quoteProductQuery="";const P=e.querySelector("#q-prod-search");P&&(P.value=""),S()})})}function u(s){const r=e.querySelector("#q-prod-search")?.closest(".form-row");if(!r)return;let d=document.getElementById("prod-search-results");if(d||(d=document.createElement("div"),d.id="prod-search-results",d.className="search-results",r.after(d)),!a.masterStats){d.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,h=s.trim().toLowerCase(),b=h.length===0?m:m.filter(w=>w.name.includes(s)||w.kanaName.includes(s)||w.code.includes(s)||w.name.toLowerCase().includes(h)||w.kanaName.toLowerCase().includes(h));d.innerHTML=c(b,a.quotePricing),p(d)}function y(s,r){let d=null;function m(){d||(d=h=>{const b=document.getElementById(r);if(!b){document.removeEventListener("touchstart",d),document.removeEventListener("mousedown",d),d=null;return}s.contains(h.target)||b.contains(h.target)||(b.remove(),document.removeEventListener("touchstart",d),document.removeEventListener("mousedown",d),d=null)},document.addEventListener("touchstart",d,{passive:!0}),document.addEventListener("mousedown",d))}return m}(function(){const s=e.querySelector("#q-cust-search");if(!s)return;const r=y(s,"cust-search-results");s.addEventListener("focus",()=>{l(s.value),r()}),s.addEventListener("compositionend",()=>{a.quoteCustomerQuery=s.value,l(s.value)}),s.addEventListener("input",d=>{d.isComposing||(a.quoteCustomerQuery=s.value,l(s.value))}),s.value&&l(s.value)})(),(function(){const s=e.querySelector("#q-prod-search");if(!s)return;const r=y(s,"prod-search-results");s.addEventListener("focus",()=>{u(s.value),r()}),s.addEventListener("compositionend",()=>{a.quoteProductQuery=s.value,u(s.value)}),s.addEventListener("input",d=>{d.isComposing||(a.quoteProductQuery=s.value,u(s.value))}),s.value&&u(s.value)})(),e.querySelectorAll("[data-select-customer]").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.selectCustomer??"";a.quoteState.customerCode=r,a.quoteState.customerName=s.dataset.custName??"",a.quoteState.customerAddress=s.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await xa(a.masterStats?.customers??[],r),S()})}),e.querySelector("#q-price-type")?.addEventListener("change",s=>{const r=s.target.value;a.quoteState.manualPriceType=r,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:r}:a.quotePricing={priceType:r,priceGroup:"",individualPrices:new Map},S()}),e.querySelectorAll("[data-add-product]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.addProduct??"",d=s.dataset.prodName??"",m=parseInt(s.dataset.prodPrice??"0"),h=parseInt(s.dataset.prodRetail??"0")||null,b=s.dataset.prodJan??"",w=s.dataset.prodUnit||"本",$=s.dataset.prodCase??"",_=$?parseInt($):null;a.quoteState.lines.push({productCode:r,productName:d,janCode:b,caseQty:_,quantity:1,unit:w,unitPrice:m,retailPrice:h,amount:m}),a.quoteProductQuery="",S()})}),(()=>{const s=e.querySelector("#q-prospect-search");if(!s)return;const r=y(s,"q-prospect-results");function d(m){let h=document.getElementById("q-prospect-results");if(!h)return;const b=m.trim(),w=b.length===0?a.prospects.slice(0,8):a.prospects.filter($=>$.companyName.includes(b)||($.contactName??"").includes(b)).slice(0,8);if(w.length===0){h.innerHTML="";return}h.className="search-results",h.innerHTML=w.map($=>`<button class="search-item" type="button" data-select-prospect="${$.id}" data-prospect-name="${n($.companyName)}" data-prospect-addr="${n($.address??"")}"><span style="font-size:13px;font-weight:600;">${n($.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${n($.contactName??"")} ${$.address?"· "+$.address.slice(0,20):""}</span></button>`).join(""),h.querySelectorAll("[data-select-prospect]").forEach($=>{$.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=$.dataset.prospectName??"",a.quoteState.customerAddress=$.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=$.dataset.selectProspect??"";const _=a.quoteState.manualPriceType??"";a.quotePricing={priceType:_,priceGroup:"",individualPrices:new Map},s.value="",h&&(h.innerHTML=""),S()})})}s.addEventListener("focus",()=>{d(s.value),r()}),s.addEventListener("input",m=>{m.isComposing||d(s.value)}),s.addEventListener("compositionend",()=>d(s.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const s=e.querySelector("#q-prospect-search")?.value.trim()??"",r=document.createElement("div");r.className="modal-backdrop",r.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",r.innerHTML=`
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
    `,document.body.appendChild(r),r.querySelector("#pq-company")?.focus();const d=()=>r.remove();r.addEventListener("click",m=>{m.target===r&&d()}),r.querySelector("#prospect-quick-close")?.addEventListener("click",d),r.querySelector("#prospect-quick-close2")?.addEventListener("click",d),r.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const m=(r.querySelector("#pq-company")?.value??"").trim();if(!m){B("会社名は必須です","warning");return}const h={id:crypto.randomUUID(),companyName:m,contactName:r.querySelector("#pq-contact")?.value.trim()||void 0,address:r.querySelector("#pq-address")?.value.trim()||void 0,phone:r.querySelector("#pq-phone")?.value.trim()||void 0,note:r.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:b,fetchProspects:w}=await q(async()=>{const{saveProspect:k,fetchProspects:P}=await Promise.resolve().then(()=>R);return{saveProspect:k,fetchProspects:P}},void 0),$=await b(h);if(!$){B("登録失敗","error");return}a.prospects=await w(),a.quoteState.customerCode="",a.quoteState.customerName=$.companyName,a.quoteState.customerAddress=$.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=$.id;const _=a.quoteState.manualPriceType??"";a.quotePricing={priceType:_,priceGroup:"",individualPrices:new Map},d(),B(`${$.companyName} を見込み顧客として登録しました`,"success"),S()})});function v(){It(a.quoteState);const s=e.querySelector("#q-preview-scaler");if(!s)return;s.innerHTML=Bs(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const r=s.querySelector(".q-preview-doc"),d=s.parentElement?.clientWidth??0,m=r?.offsetWidth??0;if(d>0&&m>0&&m>d-24){const h=(d-24)/m;s.style.transform=`scale(${h})`,s.style.transformOrigin="top left",s.style.height=`${((r?.offsetHeight??0)+48)*h}px`}else s.style.transform="",s.style.height=""}for(const s of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${s}`)?.addEventListener("input",v);e.querySelector("#q-remarks")?.addEventListener("input",v),e.querySelectorAll(".qty-input").forEach(s=>{s.addEventListener("change",()=>{const r=parseInt(s.dataset.lineIdx??"0"),d=a.quoteState.lines[r];d&&(d.quantity=parseFloat(s.value)||0,d.amount=d.quantity*d.unitPrice,v())})}),e.querySelectorAll(".price-input").forEach(s=>{s.addEventListener("change",()=>{const r=parseInt(s.dataset.lineIdx??"0"),d=a.quoteState.lines[r];d&&(d.unitPrice=parseInt(s.value)||0,d.amount=d.quantity*d.unitPrice,v())})}),e.querySelectorAll(".jan-input").forEach(s=>{s.addEventListener("change",()=>{const r=parseInt(s.dataset.lineIdx??"0"),d=a.quoteState.lines[r];d&&(d.janCode=s.value,v())})}),e.querySelectorAll(".case-qty-input").forEach(s=>{s.addEventListener("change",()=>{const r=parseInt(s.dataset.lineIdx??"0"),d=a.quoteState.lines[r];d&&(d.caseQty=s.value?parseInt(s.value):null,v())})}),e.querySelectorAll(".retail-price-input").forEach(s=>{s.addEventListener("change",()=>{const r=parseInt(s.dataset.lineIdx??"0"),d=a.quoteState.lines[r];d&&(d.retailPrice=s.value?parseInt(s.value):null,v())})}),e.querySelectorAll("[data-remove-line]").forEach(s=>{s.addEventListener("click",()=>{const r=parseInt(s.dataset.removeLine??"0");a.quoteState.lines.splice(r,1),S()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{It(a.quoteState),a.quoteState.previewMode=!0,S()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,S()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async s=>{const r=s.currentTarget;r.disabled=!0,r.textContent="生成中…",a.quoteState.previewMode||It(a.quoteState);try{await Bl(a.quoteState,a.quoteCompanySettings)}finally{r.disabled=!1,r.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{It(a.quoteState);const s=a.quoteState,r=s.lines.reduce(($,_)=>$+_.amount,0),d=Math.round(r*s.taxRate/100),m=r+d;if(!s.quoteNo)try{const{supabaseRpc:$}=await q(async()=>{const{supabaseRpc:k}=await Promise.resolve().then(()=>Z);return{supabaseRpc:k}},void 0),_=await $("generate_quote_no",{});s.quoteNo=_??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{s.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const h=new Date().toISOString().slice(0,10),b=s.templateType==="sake"||s.templateType==="standard"?s.templateType:"sake",w={quote_no:s.quoteNo,quote_date:s.quoteDate||h,valid_until:s.validUntil||null,legacy_customer_code:s.customerCode||null,customer_name:s.customerName||"",customer_address:s.customerAddress||"",subject:s.subject||"",template_type:b,subtotal:r,tax_amount:d,total_amount:m,tax_rate:s.taxRate||10,remarks:s.remarks||"",delivery_date:s.deliveryDate||"",payment_terms:s.paymentTerms||"",delivery_place:s.deliveryPlace||"",updated_at:new Date().toISOString()};try{let $=s.id;if(s.id){const _=await fetch(`${we}/rest/v1/quotes?id=eq.${encodeURIComponent(s.id)}`,{method:"PATCH",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(w)});if(!_.ok){const k=await _.text();throw new Error(`quotes更新失敗 ${_.status}: ${k}`)}await fetch(`${we}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(s.id)}`,{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}})}else{const _=await fetch(`${we}/rest/v1/quotes`,{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(w)});if(!_.ok){const P=await _.text();throw new Error(`quotes作成失敗 ${_.status}: ${P}`)}const k=await _.json();if(!k?.[0]?.id)throw new Error("IDが返りませんでした");$=k[0].id,s.id=$}if(s.lines.length>0){const _=s.lines.map((P,E)=>({quote_id:$,line_no:E+1,legacy_product_code:P.productCode||null,product_name:P.productName,jan_code:P.janCode||null,case_qty:P.caseQty??null,quantity:P.quantity,unit:P.unit,unit_price:P.unitPrice,retail_price:P.retailPrice??null,amount:P.amount})),k=await fetch(`${we}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(_)});if(!k.ok){const P=await k.text();throw new Error(`明細保存失敗 ${k.status}: ${P}`)}}B(`見積 ${s.quoteNo} を保存しました`,"success"),S()}catch($){console.error("[save-quote]",$),B(`保存失敗: ${String($).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const s=d=>document.getElementById(d)?.value??"",r={...a.quoteCompanySettings,companyName:s("qs-company-name"),companyPostal:s("qs-company-postal"),companyAddress1:s("qs-company-addr1"),companyAddress2:s("qs-company-addr2"),companyTel:s("qs-company-tel"),companyFax:s("qs-company-fax"),companyEmail:s("qs-company-email"),companyRegistrationNo:s("qs-company-regno"),bankName:s("qs-bank-name"),bankBranch:s("qs-bank-branch"),bankAccountType:s("qs-bank-type"),bankAccountNo:s("qs-bank-no"),bankAccountHolder:s("qs-bank-holder"),defaultPaymentTerms:s("qs-payment-terms"),defaultHeaderNote:s("qs-header-note"),defaultFooterNote:s("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};We(r),nt("quote_company",r),a.quoteCompanySettings=r,B("設定を保存しました","success"),S()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:r},We(a.quoteCompanySettings),nt("quote_company",a.quoteCompanySettings),S()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",s=>{const r=s.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:r},We(a.quoteCompanySettings),S()}),e.querySelector("#qs-seal-file")?.addEventListener("change",s=>{const r=s.target.files?.[0];if(!r)return;const d=new FileReader;d.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:d.result},We(a.quoteCompanySettings),nt("quote_company",a.quoteCompanySettings),S()},d.readAsDataURL(r)}),e.querySelector("#qs-seal-size")?.addEventListener("input",s=>{const r=parseInt(s.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:r},We(a.quoteCompanySettings),nt("quote_company",a.quoteCompanySettings),S()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},We(a.quoteCompanySettings),nt("quote_company",a.quoteCompanySettings),S()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.month;r&&(a.demandForecast.calendarMonth=r,S())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.segment;a.demandForecast.selectedSegment=r,S()})}),e.querySelectorAll("[data-demand-tab]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.demandTab;if(r){if(a.demandTab=r,r==="calendar"){const d=new Date().toISOString().slice(0,10);d.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=d)}S()}})});function f(s){const r=a.demandAnalysis,d=a.safetyStockParams;if(!r||d.length===0)return[];const[m,h]=s.split("-"),b=`${parseInt(m)-1}-${h}`,w=r.months.filter($=>$<s).slice(-3);return d.map($=>{const _=$.productionType==="make_to_order",k=r.matrix[$.productCode]?.[b]??0,P=w.map(N=>r.matrix[$.productCode]?.[N]??0),E=P.length>0?P.reduce((N,j)=>N+j,0)/P.length:$.avgMonthlyDemand,I=_?0:k>0?Math.ceil(k):Math.ceil(E),T=_?0:Math.ceil($.safetyStockQty),O=Math.max(0,I+T);return{id:"",yearMonth:s,productCode:$.productCode,productName:$.productName,demandForecast:I,safetyStockTarget:T,openingStock:0,requiredProduction:O,plannedQty:_?0:O,actualQty:0,status:"draft",productionType:$.productionType??"monthly",notes:""}})}e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async s=>{const r=parseInt(s.target.value)||3;a.demandYearsBack=r,a.demandAnalysis=null;const{fetchDemandAnalysis:d}=await q(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>R);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await d(r*12),S()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(s=>{s.addEventListener("change",()=>{const r=s.dataset.code??"",d=parseInt(s.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==r)return m;const h=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,b=d/30,w=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),$=Math.ceil(m.avgMonthlyDemand*b+w);return{...m,leadTimeDays:d,safetyStockQty:w,reorderPoint:$}}),S()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(s=>{s.addEventListener("change",()=>{const r=s.dataset.code??"",d=parseFloat(s.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==r)return m;const h=d>=.99?2.33:d>=.97?1.88:d>=.95?1.65:d>=.9?1.28:1.04,b=m.leadTimeDays/30,w=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),$=Math.ceil(m.avgMonthlyDemand*b+w);return{...m,serviceLevel:d,safetyStockQty:w,reorderPoint:$}}),S()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async s=>{if(a.safetyStockParams.length===0)return;const r=s.currentTarget;r.disabled=!0,r.textContent="保存中…";const{saveSafetyStockParamsBulk:d}=await q(async()=>{const{saveSafetyStockParamsBulk:h}=await Promise.resolve().then(()=>R);return{saveSafetyStockParamsBulk:h}},void 0),m=await d(a.safetyStockParams);r.disabled=!1,r.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{r.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const s=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),r=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(d=>{const m=s>=.99?2.33:s>=.97?1.88:s>=.95?1.65:s>=.9?1.28:1.04,h=r/30,b=Math.ceil(m*d.demandStdDev*Math.sqrt(h)),w=Math.ceil(d.avgMonthlyDemand*h+b);return{...d,serviceLevel:s,leadTimeDays:r,safetyStockQty:b,reorderPoint:w}}),S()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(s=>{s.addEventListener("change",()=>{const r=s.dataset.code??"",d=s.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===r?{...m,productionType:d}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async s=>{const r=s.target.value;if(!r)return;a.demandPlanYearMonth=r,a.calendarShifts=Ut(r,1,0);const{fetchProductionPlan:d}=await q(async()=>{const{fetchProductionPlan:h}=await Promise.resolve().then(()=>R);return{fetchProductionPlan:h}},void 0),m=await d(r);a.productionPlan=m.length>0?m:f(r),Ie(a.calendarShifts,a.productionPlan.filter(h=>!a.calendarLabelExcluded.has(h.productCode)),a.calendarCapacity),S()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(s=>{s.addEventListener("click",()=>{a.demandPlanTypeFilter=s.dataset.filter??"all",S()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.sortCol??"";a.demandSort?.column===r?a.demandSort=a.demandSort.dir==="desc"?{column:r,dir:"asc"}:null:a.demandSort={column:r,dir:"desc"},S()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=f(a.demandPlanYearMonth),S()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",s=>{const r=s.target.files?.[0];if(!r)return;const d=new FileReader;d.onload=async()=>{const{parseCSV:m}=await q(async()=>{const{parseCSV:T}=await Promise.resolve().then(()=>Sd);return{parseCSV:T}},void 0),{columns:h,rows:b}=m(d.result),w=document.getElementById("csv-import-status"),$=h.find(T=>/商品コード|product_code|code|コード/i.test(T)),_=h.find(T=>/在庫|stock|期首|opening/i.test(T)),k=h.find(T=>/計画|plan|planned|生産/i.test(T));if(!$){w&&(w.style.display="block",w.style.background="rgba(197,61,61,0.1)",w.style.color="#c53d3d",w.textContent=`エラー: 商品コード列が見つかりません。列名: ${h.join(", ")}`);return}let P=0,E=0,I=0;for(const T of b){const O=(T[$]??"").trim();if(!O)continue;const N=a.productionPlan.find(j=>j.productCode===O);if(N){if(P++,_&&T[_]!==void 0&&T[_]!==""){const j=parseFloat(T[_])||0;N.openingStock=j,N.requiredProduction=Math.max(0,N.demandForecast+N.safetyStockTarget-j),N.plannedQty>0&&!k&&(N.plannedQty=N.requiredProduction),E++}k&&T[k]!==void 0&&T[k]!==""&&(N.plannedQty=parseFloat(T[k])||0,I++)}}w&&(w.style.display="block",P===0?(w.style.background="rgba(183,121,31,0.1)",w.style.color="#b7791f",w.textContent=`一致する商品コードが見つかりませんでした（CSV: ${b.length}行）`):(w.style.background="rgba(47,133,90,0.1)",w.style.color="#2f855a",w.textContent=`${P}商品に反映: 在庫${E}件${I>0?` / 計画${I}件`:""} 更新`),setTimeout(()=>{w.style.display="none"},5e3)),S()},d.readAsText(r,"UTF-8"),s.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(d=>{const m=d.dataset.code??"",h=a.productionPlan.find(b=>b.productCode===m);h&&(h.plannedQty=parseFloat(d.value)||0)});const{saveProductionPlan:s}=await q(async()=>{const{saveProductionPlan:d}=await Promise.resolve().then(()=>R);return{saveProductionPlan:d}},void 0);await Promise.all(a.productionPlan.map(d=>s(d)));const{fetchProductionPlan:r}=await q(async()=>{const{fetchProductionPlan:d}=await Promise.resolve().then(()=>R);return{fetchProductionPlan:d}},void 0);a.productionPlan=await r(a.demandPlanYearMonth),S()}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.date??"",d=a.calendarShifts.find(m=>m.date===r);d&&(d.confirmed?a.calendarSelectedDate=a.calendarSelectedDate===r?null:r:d.partTimers>0||d.employees>0?(d.partTimers=0,d.employees=0,Ie(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=r):(d.partTimers=1,d.employees=0,Ie(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=r),S())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async s=>{const r=s.currentTarget;r.disabled=!0,r.textContent="保存中…";const{saveLabelExclusions:d}=await q(async()=>{const{saveLabelExclusions:b}=await Promise.resolve().then(()=>R);return{saveLabelExclusions:b}},void 0),m=[...a.calendarLabelExcluded],h=await d(a.demandPlanYearMonth,m);r.disabled=!1,r.textContent=h?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{r.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(s=>{s.addEventListener("change",()=>{const r=s.dataset.code??"",m=document.getElementById("cal-label-list")?.scrollTop??0;s.checked?a.calendarLabelExcluded.delete(r):a.calendarLabelExcluded.add(r);const h=a.productionPlan.filter(b=>!a.calendarLabelExcluded.has(b.productCode));Ie(a.calendarShifts,h,a.calendarCapacity),S(),requestAnimationFrame(()=>{const b=document.getElementById("cal-label-list");b&&(b.scrollTop=m)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(s=>{s.addEventListener("change",()=>{const r=s.dataset.type??"",m=document.getElementById("cal-label-list")?.scrollTop??0,h=a.productionPlan.filter(w=>w.productionType===r);if(s.checked)for(const w of h)a.calendarLabelExcluded.delete(w.productCode);else for(const w of h)a.calendarLabelExcluded.add(w.productCode);const b=a.productionPlan.filter(w=>!a.calendarLabelExcluded.has(w.productCode));Ie(a.calendarShifts,b,a.calendarCapacity),S(),requestAnimationFrame(()=>{const w=document.getElementById("cal-label-list");w&&(w.scrollTop=m)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",s=>{const r=parseInt(s.target.value)||ct;a.calendarCapacity.partCapacity=r;const d=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ie(a.calendarShifts,d,a.calendarCapacity),S()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",s=>{const r=parseInt(s.target.value)||dt;a.calendarCapacity.empCapacity=r;const d=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ie(a.calendarShifts,d,a.calendarCapacity),S()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(s=>{s.addEventListener("change",()=>{const r=s.dataset.date??"",d=parseInt(s.value)||0,m=a.calendarShifts.find(h=>h.date===r);m&&(m.partTimers=d),S()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(s=>{s.addEventListener("change",()=>{const r=s.dataset.date??"",d=parseInt(s.value)||0,m=a.calendarShifts.find(h=>h.date===r);m&&(m.employees=d),S()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async s=>{const r=s.target.value;if(!r)return;a.demandPlanYearMonth=r,a.calendarSelectedDate=null,a.calendarShifts=Ut(r,1,0);const{fetchProductionPlan:d,fetchLabelExclusions:m}=await q(async()=>{const{fetchProductionPlan:w,fetchLabelExclusions:$}=await Promise.resolve().then(()=>R);return{fetchProductionPlan:w,fetchLabelExclusions:$}},void 0),[h,b]=await Promise.all([d(r),m(r)]);a.productionPlan=h.length>0?h:f(r),a.calendarLabelExcluded=new Set(b),Ie(a.calendarShifts,a.productionPlan.filter(w=>!a.calendarLabelExcluded.has(w.productCode)),a.calendarCapacity),S()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",s=>{const r=parseInt(s.target.value)||0;a.calendarDefaultPart=r;for(const d of a.calendarShifts)if(!d.confirmed){const m=new Date(d.date).getDay()===0||new Date(d.date).getDay()===6;d.partTimers=m?0:r}S()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",s=>{const r=parseInt(s.target.value)||0;a.calendarDefaultEmp=r;for(const d of a.calendarShifts)if(!d.confirmed){const m=new Date(d.date).getDay()===0||new Date(d.date).getDay()===6;d.employees=m?0:r}S()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=Ut(a.demandPlanYearMonth,1,0),Ie(a.calendarShifts,a.productionPlan.filter(s=>!a.calendarLabelExcluded.has(s.productCode)),a.calendarCapacity),S()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const s of a.calendarShifts)s.confirmed=!0;S()}),e.querySelectorAll("[data-action='select-month']").forEach(s=>{s.addEventListener("click",()=>{const r=parseInt(s.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=r,S())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",s=>{a.visitPlanner&&(a.visitPlanner.filterArea=s.target.value,S())}),e.querySelector("#visit-filter-score")?.addEventListener("change",s=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(s.target.value)||0,S())}),e.querySelector("[data-action='refresh-analytics']")?.addEventListener("click",async s=>{const r=s.currentTarget;r.disabled=!0,r.textContent="更新中…";try{const{supabaseRpc:d}=await q(async()=>{const{supabaseRpc:m}=await Promise.resolve().then(()=>Z);return{supabaseRpc:m}},void 0);await d("refresh_analytics",{}),a.visitPlanner=null,a.shipmentCalendarData=null,B("分析データを更新しました","success"),S()}catch(d){console.error("[refresh-analytics]",d),B("更新に失敗しました","error"),r.disabled=!1,r.textContent="⟳ データ更新"}}),e.querySelectorAll("[data-sort-col]").forEach(s=>{s.addEventListener("click",r=>{const d=s.dataset.sortCol??"",m=r.shiftKey;a.route==="/product-power"?a.productSortState=pt(a.productSortState,d,m):a.route==="/customer-efficiency"?a.customerSortState=pt(a.customerSortState,d,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=pt(a.dashboardSortState,d,m):a.route==="/master"?a.masterSortState=pt(a.masterSortState,d,m):a.route==="/analytics"&&(a.analyticsSortState=pt(a.analyticsSortState,d,m)),S()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(s=>{s.addEventListener("click",async()=>{const r=parseInt(s.dataset.year??"",10);r&&(a.customerEfficiencyYear=r,a.customerEfficiency=await wt(r,a.customerEfficiencyGroupBy),S())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async s=>{const r=parseInt(s.target.value,10);r&&(a.customerEfficiencyYear=r,a.customerEfficiency=await wt(r,a.customerEfficiencyGroupBy),S())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.groupby??"billing";a.customerEfficiencyGroupBy=r,a.customerEfficiency=await wt(a.customerEfficiencyYear,r),S()})}),e.querySelectorAll("[data-product-period]").forEach(s=>{s.addEventListener("click",()=>{a.productPeriod=s.dataset.productPeriod??"year",S()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const s=document.getElementById("pp-range-start")?.value??"",r=document.getElementById("pp-range-end")?.value??"";s&&r&&(a.productCustomStart=s,a.productCustomEnd=r,a.productPeriod="custom",S())}),e.querySelectorAll("[data-product-filter]").forEach(s=>{s.addEventListener("click",()=>{a.productFilter=s.dataset.productFilter??"all",S()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async s=>{const r=s.currentTarget;r.disabled=!0,r.textContent="更新中…",await ot(),r.disabled=!1,r.textContent="↻ 更新",B("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const s=e.querySelector("#sales-start")?.value??"",r=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:s,endDate:r},ru()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const s={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=s,a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,iu(s)}),e.addEventListener("click",s=>{const r=s.target.closest("tr[data-doc-no]");if(!r)return;const d=r.dataset.docNo??"";if(a.invoiceSelectedDocNo===d){a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,S();return}a.invoiceSelectedDocNo=d,a.invoiceSelectedLines=null,S(),Zn(d).then(m=>{a.invoiceSelectedDocNo===d&&(a.invoiceSelectedLines=m,S())})}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const s=e.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=s.trim().toUpperCase(),lu(a.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{a.masterTab=s.dataset.tab,a.masterFilter={...Ga},S()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",tradeType:e.querySelector("#master-trade-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},S()}),e.querySelector("#master-search")?.addEventListener("keydown",s=>{s.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(s=>{s.addEventListener("click",()=>{const r=Number(s.dataset.page);r>=1&&(a.masterFilter={...a.masterFilter,page:r},S())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.table;if(!r)return;a.rawSelectedTable=r,a.rawPage=1;const d=await Ft(r,1);a.rawRecords=d.records,a.rawTotalCount=d.total,S()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const s=await Ft(a.rawSelectedTable,a.rawPage);a.rawRecords=s.records,a.rawTotalCount=s.total,S()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const s=await Ft(a.rawSelectedTable,a.rawPage);a.rawRecords=s.records,a.rawTotalCount=s.total,S()}),e.querySelectorAll("[data-analytics-tab]").forEach(s=>{s.addEventListener("click",async()=>{if(a.analyticsTab=s.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:r,fetchAvailablePeriods:d}=await q(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}=await Promise.resolve().then(()=>R);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}},void 0);a.analyticsPeriodOptions=await d(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await r(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}S()})}),e.querySelectorAll("[data-analytics-period]").forEach(s=>{s.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:r,fetchAvailablePeriods:d,fetchPeriodChartData:m,prevYearFilter:h}=await q(async()=>{const{fetchAnalyticsByPeriod:w,fetchAvailablePeriods:$,fetchPeriodChartData:_,prevYearFilter:k}=await Promise.resolve().then(()=>R);return{fetchAnalyticsByPeriod:w,fetchAvailablePeriods:$,fetchPeriodChartData:_,prevYearFilter:k}},void 0),b=s.dataset.analyticsPeriod;if(a.analyticsPeriod=b,a.analyticsDrilldown=null,b==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await d(a.analyticsTab,b),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const w=a.analyticsPeriodFilter,[$,_,k]=await Promise.all([r(a.analyticsTab,b,w),m(b,w),m(b,h(w))]);a.analyticsPeriodRows=$,a.analyticsPeriodChartData=_,a.analyticsPrevYearChartData=k}S()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async s=>{const{fetchAnalyticsByPeriod:r,fetchPeriodChartData:d,prevYearFilter:m}=await q(async()=>{const{fetchAnalyticsByPeriod:w,fetchPeriodChartData:$,prevYearFilter:_}=await Promise.resolve().then(()=>R);return{fetchAnalyticsByPeriod:w,fetchPeriodChartData:$,prevYearFilter:_}},void 0);a.analyticsPeriodFilter=s.target.value,a.analyticsDrilldown=null;const h=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:w}=await q(async()=>{const{fiscalYearToDateRange:O}=await Promise.resolve().then(()=>kn);return{fiscalYearToDateRange:O}},void 0),$=parseInt(h),_=w($);w($-1);const k=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:P}=await q(async()=>{const{supabaseRpc:O}=await Promise.resolve().then(()=>Z);return{supabaseRpc:O}},void 0),[E,I,T]=await Promise.all([P(k,{p_date_from:_.from,p_date_to:_.to}),d("yearly",h),d("yearly",String($-1))]);a.analyticsPeriodRows=(E??[]).map(O=>({code:String(O.code??""),name:String(O.name??""),amount:Number(O.amount??0),quantity:Number(O.quantity??0),documents:Number(O.documents??0),volumeMl:Number(O.volume_ml??0)})),a.analyticsPeriodChartData=(I??[]).map(O=>({...O})),a.analyticsPrevYearChartData=(T??[]).map(O=>({...O}))}else{const[w,$,_]=await Promise.all([r(a.analyticsTab,a.analyticsPeriod,h),d(a.analyticsPeriod,h),d(a.analyticsPeriod,m(h))]);a.analyticsPeriodRows=w,a.analyticsPeriodChartData=$,a.analyticsPrevYearChartData=_}S()}),e.querySelectorAll("[data-fiscal-mode]").forEach(s=>{s.addEventListener("click",async()=>{if(a.analyticsFiscalMode=s.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:r}=await q(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>kn);return{monthToFiscalYear:m}},void 0),d=new Set;for(const m of a.salesAnalytics.monthlySales)d.add(r(m.month));a.analyticsPeriodOptions=[...d].sort((m,h)=>h-m).map(String)}else{const{fetchAvailablePeriods:r}=await q(async()=>{const{fetchAvailablePeriods:d}=await Promise.resolve().then(()=>R);return{fetchAvailablePeriods:d}},void 0);a.analyticsPeriodOptions=await r(a.analyticsTab,"yearly")}S()})}),e.querySelectorAll("[data-chart-metric]").forEach(s=>{s.addEventListener("click",()=>{a.analyticsChartMetric=s.dataset.chartMetric,S()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.analyticsDrilldown??"",d=s.dataset.drilldownName??r,m=a.analyticsTab,{fetchCustomerProductBreakdown:h,fetchProductCustomerBreakdown:b,fetchEntityMonthlySales:w,periodToDateRange:$}=await q(async()=>{const{fetchCustomerProductBreakdown:E,fetchProductCustomerBreakdown:I,fetchEntityMonthlySales:T,periodToDateRange:O}=await Promise.resolve().then(()=>R);return{fetchCustomerProductBreakdown:E,fetchProductCustomerBreakdown:I,fetchEntityMonthlySales:T,periodToDateRange:O}},void 0),_=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?$(a.analyticsPeriod,a.analyticsPeriodFilter):null,[k,P]=await Promise.all([w(r,m==="customers"?"customer":"product"),m==="customers"?h(r,_?.from,_?.to):b(r,_?.from,_?.to)]);a.analyticsDrilldown={tab:m,code:r,name:d,monthlySales:k,breakdownRows:P},S()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,S()}),e.querySelector("#staff-filter-input")?.addEventListener("input",s=>{a.analyticsStaffFilter=s.target.value,S()}),e.querySelectorAll("[data-staff-drilldown]").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.staffDrilldown??"",d=s.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:h,periodToDateRange:b}=await q(async()=>{const{fetchStaffCustomerBreakdown:P,fetchStaffProductBreakdown:E,periodToDateRange:I}=await Promise.resolve().then(()=>R);return{fetchStaffCustomerBreakdown:P,fetchStaffProductBreakdown:E,periodToDateRange:I}},void 0),w=b(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),$=a.analyticsStaffDrilldown?.breakdownTab??"customers",[_,k]=await Promise.all([m(r,w?.from,w?.to),h(r,w?.from,w?.to)]);a.analyticsStaffDrilldown={code:r,name:d,breakdownTab:$,customerRows:_,productRows:k},S()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(s=>{s.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:s.dataset.staffBreakdownTab},S())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,S()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",s=>{a.analyticsTagFilter=s.target.value,S()}),e.querySelectorAll("[data-staff-period]").forEach(s=>{s.addEventListener("click",async()=>{const{fetchAvailablePeriods:r,fetchStaffTotalsByPeriod:d,periodToDateRange:m}=await q(async()=>{const{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:w,periodToDateRange:$}=await Promise.resolve().then(()=>R);return{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:w,periodToDateRange:$}},void 0),h=s.dataset.staffPeriod;if(a.analyticsStaffPeriod=h,a.analyticsStaffDrilldown=null,h==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await r("staff",h),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const b=m(h,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await d(b?.from,b?.to)}S()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async s=>{const{fetchStaffTotalsByPeriod:r,periodToDateRange:d}=await q(async()=>{const{fetchStaffTotalsByPeriod:h,periodToDateRange:b}=await Promise.resolve().then(()=>R);return{fetchStaffTotalsByPeriod:h,periodToDateRange:b}},void 0);a.analyticsStaffPeriodFilter=s.target.value;const m=d(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await r(m?.from,m?.to),a.analyticsStaffDrilldown=null,S()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Te(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},S()}),e.querySelectorAll("[data-action='remove-line']").forEach(s=>{s.addEventListener("click",()=>{Te(e);const r=parseInt(s.dataset.line??"0",10);a.invoiceForm.lines.splice(r,1),a.invoiceErrors=ro(a.invoiceForm),S()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(s=>{s.addEventListener("click",()=>{Te(e),Gp(parseInt(s.dataset.line??"0",10)),a.invoiceErrors={},S()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Wp(),S()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Te(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,S()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(s=>{s.addEventListener("click",()=>{Te(e);const r=parseInt(s.dataset.line??"0",10),d=a.invoiceForm.lines[r];a.pickerMode="product",a.pickerTargetLine=r,a.pickerQuery=d?d.productCode||d.productName:"",S()})}),e.querySelectorAll("[data-action='modal-close']").forEach(s=>{s.addEventListener("click",r=>{s.classList.contains("modal-backdrop")&&r.target instanceof HTMLElement&&!r.target.classList.contains("modal-backdrop")||(Wt(),S())})}),e.querySelectorAll("[data-action='picker-select']").forEach(s=>{const r=async()=>{const d=s.dataset.code??"",m=s.dataset.name??"";if(a.pickerMode==="customer"){a.invoiceForm.customerCode=d,a.invoiceForm.customerName=m,delete a.invoiceErrors.customerCode;const h=a.masterStats?.customers.find(b=>b.code===d);a.invoicePriceGroup=h?.priceGroup||"",!a.invoicePriceGroup&&d&&(a.invoicePriceGroup=await _a(d))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const h=a.invoiceForm.lines[a.pickerTargetLine];if(h){h.productCode=d,h.productName=m;const b=await Ls(a.invoicePriceGroup,d);b>0&&(h.unitPrice=b),h.amount=h.quantity*h.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}Wt(),S()};s.addEventListener("click",r),s.addEventListener("keydown",d=>{d.key==="Enter"&&r()})}),e.querySelector("#modal-search")?.addEventListener("input",s=>{a.pickerQuery=s.target.value,S()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{oo(),S()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{io(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Te(e),Xp(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await _a(a.invoiceForm.customerCode)),S())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Te(e),Zp(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,S())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(s=>{s.addEventListener("input",()=>{Te(e),a.invoiceSavedDocNo=null;const r=s.dataset.field;(r==="quantity"||r==="unitPrice")&&S()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Te(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const s=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=s.trim(),a.deliveryNote=null,a.actionLoading=!0,S(),!a.deliverySearchDocNo){B("伝票番号を入力してください","error"),a.actionLoading=!1,S();return}za(a.deliverySearchDocNo).then(r=>{a.deliveryNote=r,a.actionLoading=!1,S()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const s=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=s,a.billingSummary=null,a.actionLoading=!0,S(),Fa(s).then(r=>{a.billingSummary=r,a.actionLoading=!1,S()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const s=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),r=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=s,a.taxMonth=r,a.taxDeclaration=null,a.actionLoading=!0,S(),Ya(s,r).then(d=>{a.taxDeclaration=d,a.actionLoading=!1,S()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:s}=await q(async()=>{const{generateTaxXML:b}=await Promise.resolve().then(()=>R);return{generateTaxXML:b}},void 0),r=s(a.taxDeclaration),d=new Blob([r],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(d),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:s}=await q(async()=>{const{generateTaxCSV:b}=await Promise.resolve().then(()=>R);return{generateTaxCSV:b}},void 0),r=s(a.taxDeclaration),d=new Blob([r],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(d),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:s}=await q(async()=>{const{saveTaxDeclaration:r}=await Promise.resolve().then(()=>R);return{saveTaxDeclaration:r}},void 0);try{await s(a.taxDeclaration),B("下書き保存しました")}catch(r){B("保存に失敗: "+(r instanceof Error?r.message:String(r)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(s=>{s.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const r=Number(s.dataset.taxRow),d=s.dataset.taxField,m=s.type==="number"?Number(s.value)||0:s.value,h=[...a.taxDeclaration.rows];h[r]={...h[r],[d]:m};const{recalculateTaxDeclaration:b}=await q(async()=>{const{recalculateTaxDeclaration:w}=await Promise.resolve().then(()=>R);return{recalculateTaxDeclaration:w}},void 0);a.taxDeclaration=b({...a.taxDeclaration,rows:h}),S()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const r=Number(s.dataset.dedRow),d=s.dataset.dedField,m=s.type==="number"?Number(s.value)||0:s.value,h=[...a.taxDeclaration.deductions];h[r]={...h[r],[d]:m},a.taxDeclaration={...a.taxDeclaration,deductions:h},S()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const r=s.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[r]:s.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:s,TAX_RATE_CATEGORIES:r}=await q(async()=>{const{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}=await Promise.resolve().then(()=>R);return{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}},void 0),d=r[0],m={taxCategory:d.code,taxCategoryName:d.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:d.taxRatePerLiter,taxAmount:0};a.taxDeclaration=s({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),S()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(s=>{s.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const r=Number(s.dataset.taxRow),{recalculateTaxDeclaration:d}=await q(async()=>{const{recalculateTaxDeclaration:h}=await Promise.resolve().then(()=>R);return{recalculateTaxDeclaration:h}},void 0),m=a.taxDeclaration.rows.filter((h,b)=>b!==r);a.taxDeclaration=d({...a.taxDeclaration,rows:m}),S()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const s={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,s]},S()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(s=>{s.addEventListener("click",()=>{if(!a.taxDeclaration)return;const r=Number(s.dataset.dedRow),d=a.taxDeclaration.deductions.filter((m,h)=>h!==r);a.taxDeclaration={...a.taxDeclaration,deductions:d},S()})}),e.querySelectorAll("[data-store-tab]").forEach(s=>{s.addEventListener("click",()=>{a.storeTab=s.dataset.storeTab,S()})}),e.querySelectorAll("[data-import-entity]").forEach(s=>{s.addEventListener("click",()=>{a.importEntity=s.dataset.importEntity,a.importPreview=null,a.importResult=null,S()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const s=Ks(a.importEntity),r=new Blob([s],{type:"text/csv;charset=utf-8"}),d=URL.createObjectURL(r),m=document.createElement("a");m.href=d,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const r=e.querySelector("#import-file")?.files?.[0];if(!r){B("CSVファイルを選択してください","warning");return}const d=new FileReader;d.onload=()=>{const m=String(d.result??""),{columns:h,rows:b}=Qs(m);a.importPreview=Hs(a.importEntity,h,b),a.importResult=null,S()},d.readAsText(r,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,S()}),e.querySelectorAll("[data-print-template]").forEach(s=>{s.addEventListener("click",()=>{a.printTemplate=s.dataset.printTemplate,S()})}),e.querySelectorAll("[data-print-field]").forEach(s=>{s.addEventListener("change",()=>{const r=s.dataset.printField;let d=s.value;(r==="taxRate"||r==="previousBalance"||r==="paymentAmount")&&(d=Number(s.value)||0),a.printData={...a.printData,[r]:d},S()})}),e.querySelectorAll("[data-print-opt]").forEach(s=>{const r=()=>{const d=s.dataset.printOpt;let m;s.type==="checkbox"?m=s.checked:d==="copies"?m=Number(s.value)||1:d==="overlayOpacity"||d==="calibrationOffsetX"||d==="calibrationOffsetY"?m=Number(s.value)||0:m=s.value,a.printOptions={...a.printOptions,[d]:m},S()};s.addEventListener("change",r),s.type==="range"&&s.addEventListener("input",r)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(s=>{s.addEventListener("change",()=>{const r=Number(s.dataset.printLine),d=s.dataset.printLfield,m=[...a.printData.lines];let h=s.value;(d==="quantity"||d==="unitPrice")&&(h=Number(s.value)||0),m[r]={...m[r],[d]:h},m[r].amount=(Number(m[r].quantity)||0)*(Number(m[r].unitPrice)||0),a.printData={...a.printData,lines:m},S()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},S()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(s=>{s.addEventListener("click",()=>{const r=Number(s.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((d,m)=>m!==r)},S()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),B("印刷設定を保存しました")}catch(s){B("保存失敗: "+(s instanceof Error?s.message:String(s)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const s=a.printCompany,r=prompt("会社名",s.name);if(r===null)return;const d=prompt("郵便番号",s.postalCode)??s.postalCode,m=prompt("住所",s.address1)??s.address1,h=prompt("TEL",s.tel)??s.tel,b=prompt("FAX",s.fax)??s.fax,w=prompt("適格請求書登録番号 (T+13桁)",s.registrationNo)??s.registrationNo,$=prompt("取引銀行名",s.bankName)??s.bankName,_=prompt("支店名",s.bankBranch)??s.bankBranch,k=prompt("口座番号",s.bankAccountNo)??s.bankAccountNo,P=prompt("口座名義",s.bankAccountHolder)??s.bankAccountHolder;a.printCompany={...s,name:r,postalCode:d,address1:m,tel:h,fax:b,registrationNo:w,bankName:$,bankBranch:_,bankAccountNo:k,bankAccountHolder:P},S()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,S()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const d=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=da(s),{savePrintLayout:h}=await q(async()=>{const{savePrintLayout:w}=await Promise.resolve().then(()=>R);return{savePrintLayout:w}},void 0),b={id:`bp1701_${d.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:d,templateKey:"chain_store",positions:m};try{await h(b)?(B(`クラウド保存成功: ${d}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),S()):(B("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(w){B("保存エラー: "+(w instanceof Error?w.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const r=da(s);a.fdSavedPositions=r;try{localStorage.setItem("sake_fd_positions",JSON.stringify(r)),B(`ローカル保存完了: ${Object.keys(r).length}件`)}catch(d){B("保存失敗: "+(d instanceof Error?d.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const d={templateKey:"chain_store",positions:da(s),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(d,null,2)],{type:"application/json"}),h=URL.createObjectURL(m),b=document.createElement("a");b.href=h,b.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,b.click(),URL.revokeObjectURL(h)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async s=>{const r=s.target.files?.[0];if(r)try{const d=await r.text(),h=JSON.parse(d).positions;if(!h)throw new Error("positions field not found");a.fdSavedPositions=h,localStorage.setItem("sake_fd_positions",JSON.stringify(h)),B(`インポート成功: ${Object.keys(h).length}件`),S()}catch(d){B("インポート失敗: "+(d instanceof Error?d.message:""),"error")}});const x=e.querySelector("#fd-saved-layouts");x&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:s}=await q(async()=>{const{fetchPrintLayouts:d}=await Promise.resolve().then(()=>R);return{fetchPrintLayouts:d}},void 0),r=await s("chain_store");r.length===0?x.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(x.innerHTML=`☁️ クラウド保存済み (${r.length}件):<br/>`+r.map(d=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${d.id}" style="margin:4px 4px 0 0;">${d.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${d.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),x.querySelectorAll("[data-action='fd-load-layout']").forEach(d=>{d.addEventListener("click",()=>{const m=d.dataset.layoutId,h=r.find(b=>b.id===m);h&&(a.fdSavedPositions=h.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(h.positions)),B(`読込完了: ${h.name}`),S())})}),x.querySelectorAll("[data-action='fd-delete-layout']").forEach(d=>{d.addEventListener("click",async()=>{const m=d.dataset.layoutId;if(!m||!await Pe("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:h}=await q(async()=>{const{deletePrintLayout:w}=await Promise.resolve().then(()=>R);return{deletePrintLayout:w}},void 0);await h(m)?(B("削除しました"),S()):B("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await Pe("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),S())});const A=e.querySelector("#fd-sel-x"),C=e.querySelector("#fd-sel-y");[A,C].forEach(s=>{s?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const r=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);r&&(A&&(r.style.left=A.value+"mm"),C&&(r.style.top=C.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(s=>{s.addEventListener("dragstart",r=>{s.classList.add("wf-dragging"),r.dataTransfer?.setData("text/plain",s.dataset.wfOrder??"")}),s.addEventListener("dragend",()=>s.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(s=>{s.addEventListener("dragover",r=>r.preventDefault()),s.addEventListener("drop",r=>{r.preventDefault();const d=r.dataTransfer?.getData("text/plain"),m=s.dataset.wfStage;if(!d||!m)return;const h=a.workflowOrders.find(b=>b.id===d);h&&(h.stage=m,S())})}),e.querySelectorAll("[data-mo-step]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.moStep;s.disabled||(a.mobileOrder.step=r,S())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",s=>{a.mobileOrder.customerQuery=s.target.value,S()}),e.querySelector("#mo-product-q")?.addEventListener("input",s=>{a.mobileOrder.productQuery=s.target.value,S()}),e.querySelectorAll("[data-mo-select-customer]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.moSelectCustomer,d=a.masterStats?.customers.find(m=>m.id===r);d&&(a.mobileOrder.selectedCustomer=d),S()})}),e.querySelectorAll("[data-mo-add-product]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.moAddProduct,d=a.masterStats?.products.find(h=>h.code===r);if(!d)return;const m=1800;a.mobileOrder.cart.push({productCode:d.code,productName:d.name,quantity:1,unit:"本",unitPrice:m,amount:m}),S()})}),e.querySelectorAll("[data-mo-qty]").forEach(s=>{s.addEventListener("click",()=>{const r=Number(s.dataset.moQty),d=s.dataset.moProduct,m=a.mobileOrder.cart.find(h=>h.productCode===d);m&&(m.quantity=Math.max(0,m.quantity+r),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(h=>h.productCode!==d)),S())})}),e.querySelectorAll("[data-mo-remove]").forEach(s=>{s.addEventListener("click",()=>{const r=Number(s.dataset.moRemove);a.mobileOrder.cart.splice(r,1),S()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const s=e.querySelector("#mo-memo");a.mobileOrder.memo=s?.value??"";const r="MO"+Date.now().toString().slice(-8),d=e.querySelector("[data-action='mo-submit']");d&&(d.disabled=!0,d.textContent="送信中…");const m=a.mobileOrder.cart.reduce((h,b)=>h+b.amount,0);try{const{saveStoreOrder:h}=await q(async()=>{const{saveStoreOrder:b}=await Promise.resolve().then(()=>R);return{saveStoreOrder:b}},void 0);await h(r,a.mobileOrder.selectedCustomer?.name??"不明",a.mobileOrder.selectedCustomer?.code??null,m,a.mobileOrder.memo,a.mobileOrder.cart)}catch(h){console.error("受注保存失敗:",h),B("送信に失敗しました","error"),d&&(d.disabled=!1,d.textContent="受注を送信");return}a.mobileOrder.submittedDocNo=r,a.mobileOrder.step="done",S()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},S()}),e.querySelectorAll("[data-tour-id]").forEach(s=>{s.addEventListener("click",()=>{a.tourActiveId=s.dataset.tourId??null,S()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(s=>{s.addEventListener("click",()=>{const r=a.tourInquiries.find(w=>w.id===a.tourActiveId);if(!r)return;const d=s.dataset.template==="confirm"?Wc:Xc,m=e.querySelector("#tour-confirmed-time"),h=d.replaceAll("{name}",r.name).replaceAll("{partySize}",String(r.partySize)).replaceAll("{confirmedTime}",m?.value??r.visitDate),b=e.querySelector("#tour-reply-body");b&&(b.value=h)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const s=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",r=a.tourInquiries.find(m=>m.id===s);if(!r)return;const d=e.querySelector("#tour-confirmed-time");r.status="confirmed",r.repliedAt=new Date().toISOString(),r.confirmedTime=d?.value??"",B("返信メールを下書き保存し、ステータスを確定にしました"),S()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const s=e.querySelector("#lb-type")?.value??"",r=e.querySelector("#lb-area")?.value??"",d=e.querySelector("#lb-keyword")?.value??"";if(!s&&!d){B("業種かキーワードを入力してください","warning");return}a.leadSearchType=s,a.leadSearchArea=r,a.leadSearchQuery=d,a.leadSearching=!0,S();const m=a.integrations.find($=>$.provider==="google_maps");if(!m||!m.config.api_key){B("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,S();return}const{searchPlaces:h}=await q(async()=>{const{searchPlaces:$}=await Promise.resolve().then(()=>R);return{searchPlaces:$}},void 0),b=[s,d].filter(Boolean).join(" "),w=await h(m,b,r);a.leadSearching=!1,w.error?B("検索失敗: "+w.error,"error"):a.leadSearchResults=w.results,S()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],S()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const s=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!s)return;const r=`ll_${Date.now()}`,d={id:r,name:s,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:h,fetchLeadLists:b,fetchLeadItems:w}=await q(async()=>{const{saveLeadList:k,saveLeadItem:P,fetchLeadLists:E,fetchLeadItems:I}=await Promise.resolve().then(()=>R);return{saveLeadList:k,saveLeadItem:P,fetchLeadLists:E,fetchLeadItems:I}},void 0);await m(d);const $=e.querySelectorAll(".lb-search-check:checked"),_=Array.from($).map(k=>Number(k.dataset.idx));for(const k of _){const P=a.leadSearchResults[k];P&&await h({...P,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:r,businessType:a.leadSearchType})}a.leadLists=await b(),a.leadActiveListId=r,a.leadItems=await w(r),a.leadSearchResults=[],B(`${_.length}件を「${s}」として保存しました`),S()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.id??null;if(a.leadActiveListId=r,r){const{fetchLeadItems:d}=await q(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>R);return{fetchLeadItems:m}},void 0);a.leadItems=await d(r)}S()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.id??"",d=a.leadItems.find(b=>b.id===r);if(!d)return;const{saveLeadItem:m,fetchLeadItems:h}=await q(async()=>{const{saveLeadItem:b,fetchLeadItems:w}=await Promise.resolve().then(()=>R);return{saveLeadItem:b,fetchLeadItems:w}},void 0);await m({...d,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),S()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.id??"",d=a.leadItems.find(w=>w.id===r);if(!d)return;const{convertLeadToProspect:m,fetchLeadItems:h}=await q(async()=>{const{convertLeadToProspect:w,fetchLeadItems:$}=await Promise.resolve().then(()=>R);return{convertLeadToProspect:w,fetchLeadItems:$}},void 0);await m(d)&&(B("見込客に追加しました: "+d.companyName),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),S())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const s=e.querySelectorAll(".lb-item-check:checked");if(s.length===0&&!await Pe("全ての新規アイテムを見込客に変換しますか？"))return;const r=s.length>0?Array.from(s).map(b=>b.dataset.id):a.leadItems.filter(b=>b.status==="new").map(b=>b.id),{convertLeadToProspect:d,fetchLeadItems:m}=await q(async()=>{const{convertLeadToProspect:b,fetchLeadItems:w}=await Promise.resolve().then(()=>R);return{convertLeadToProspect:b,fetchLeadItems:w}},void 0);let h=0;for(const b of r){const w=a.leadItems.find($=>$.id===b);w&&w.status==="new"&&await d(w)&&h++}B(`${h}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),S()}),e.querySelectorAll("[data-map-filter]").forEach(s=>{s.addEventListener("change",()=>{const r=s.dataset.mapFilter;let d;s.type==="checkbox"?d=s.checked:d=s.value,a.mapFilters={...a.mapFilters,[r]:d},S()})}),e.querySelectorAll(".churn-reason-select").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.churnCode??"",d=s.value;try{const{saveChurnNote:m}=await q(async()=>{const{saveChurnNote:w}=await Promise.resolve().then(()=>R);return{saveChurnNote:w}},void 0);await m({customerCode:r,reason:d,memo:"",actionedAt:null});const h=a.churnNotes.find(w=>w.customerCode===r);h?h.reason=d:a.churnNotes.push({customerCode:r,reason:d,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const b=s.closest("tr");if(b){const w=b.querySelector("td:nth-child(2)");if(w){let $=w.querySelector(".reason-badge");!$&&d&&($=document.createElement("span"),$.className="status-pill info reason-badge",$.style.fontSize="0.72rem",w.appendChild($)),$&&($.textContent=d?jp[d]??"":"")}}B("理由を保存しました")}catch(m){B("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.churnCode??"",d=s.checked,m=s.closest("tr");m&&(m.style.opacity=d?"0.45":"",m.setAttribute("data-actioned",d?"1":"0"));try{const{saveChurnNote:h}=await q(async()=>{const{saveChurnNote:_}=await Promise.resolve().then(()=>R);return{saveChurnNote:_}},void 0),b=a.churnNotes.find(_=>_.customerCode===r),w=b?.reason??"",$=new Date().toISOString().slice(0,10);await h({customerCode:r,reason:w,memo:"",actionedAt:d?$:null}),b?b.actionedAt=d?$:null:a.churnNotes.push({customerCode:r,reason:w,memo:"",actionedAt:d?$:null,updatedAt:new Date().toISOString()}),B(d?"対応済みにしました":"対応済みを解除しました")}catch(h){B("保存に失敗しました","error"),console.error(h)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const s=a.integrations.find(h=>h.provider==="ivry");if(!s||!s.isEnabled){B("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:r,fetchCallLogs:d}=await q(async()=>{const{syncIvryCallLogs:h,fetchCallLogs:b}=await Promise.resolve().then(()=>R);return{syncIvryCallLogs:h,fetchCallLogs:b}},void 0),m=await r(s);m.error?B("同期失敗: "+m.error,"error"):(B(`${m.count}件の通話履歴を同期しました`),a.callLogs=await d(100),S())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const s=a.integrations.find(h=>h.provider==="ivry");if(!s||!s.isEnabled){B("IVRy連携が無効です","warning");return}if(!await Pe("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:r}=await q(async()=>{const{syncPhoneBookToIvry:h}=await Promise.resolve().then(()=>R);return{syncPhoneBookToIvry:h}},void 0),d=[];a.masterStats?.customers.forEach(h=>{d.push({name:h.name,phone:"",customerCode:h.code,note:"既存取引先"})}),a.prospects.forEach(h=>{h.phone&&d.push({name:h.companyName,phone:h.phone,customerCode:h.id,note:`見込客 (${h.stage})`})});const m=await r(s,d);m.error?B("送信失敗: "+m.error,"error"):B(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.id??"",d=s.dataset.phone??"",m=prompt(`電話番号 ${d} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const h=a.callLogs.find($=>$.id===r);if(!h)return;const{saveCallLog:b,fetchCallLogs:w}=await q(async()=>{const{saveCallLog:$,fetchCallLogs:_}=await Promise.resolve().then(()=>R);return{saveCallLog:$,fetchCallLogs:_}},void 0);await b({...h,matchedCustomerCode:m}),a.callLogs=await w(100),S()})}),e.querySelectorAll("[data-action='call-memo']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.id??"",d=a.callLogs.find(w=>w.id===r);if(!d)return;const m=prompt("メモを入力:",d.notes??"");if(m===null)return;const{saveCallLog:h,fetchCallLogs:b}=await q(async()=>{const{saveCallLog:w,fetchCallLogs:$}=await Promise.resolve().then(()=>R);return{saveCallLog:w,fetchCallLogs:$}},void 0);await h({...d,notes:m}),a.callLogs=await b(100),S()})}),e.querySelectorAll("[data-prospect-view]").forEach(s=>{s.addEventListener("click",()=>{a.prospectViewMode=s.dataset.prospectView,S()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",S()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.id??null;if(a.prospectEditingId=r,r){const{fetchProspectActivities:d}=await q(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>R);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await d(r)}S()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.prospectId??null;if(a.prospectEditingId=r,r){const{fetchProspectActivities:d}=await q(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>R);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await d(r)}S()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(s=>{s.addEventListener("click",r=>{r.currentTarget!==r.target&&!r.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],S())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const s=a.prospectEditingId==="__new__",r=s?`p_${Date.now()}`:a.prospectEditingId??"",d={id:r,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!d.companyName){B("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:h,recordAudit:b,sendSlackNotification:w}=await q(async()=>{const{saveProspect:_,fetchProspects:k,recordAudit:P,sendSlackNotification:E}=await Promise.resolve().then(()=>R);return{saveProspect:_,fetchProspects:k,recordAudit:P,sendSlackNotification:E}},void 0);await m(d)?(s&&await w("new_prospect",`新規見込客: ${d.companyName} / 想定 ¥${d.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await b({action:s?"prospect_create":"prospect_update",entityType:"prospect",entityId:r,userEmail:a.user?.email}),a.prospects=await h(),a.prospectEditingId=null,S()):B("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const r=s.dataset.id??"",{deleteProspect:d,fetchProspects:m}=await q(async()=>{const{deleteProspect:h,fetchProspects:b}=await Promise.resolve().then(()=>R);return{deleteProspect:h,fetchProspects:b}},void 0);await d(r)&&(a.prospects=await m(),S())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(s=>{s.addEventListener("click",r=>{r.stopPropagation();const d=s.dataset.id??"",m=s.dataset.name??"",h=s.dataset.addr??"";a.quoteState=Kt(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=m,a.quoteState.customerAddress=h,a.quoteState.isProspect=!0,a.quoteState.prospectId=d,a.quotePricing=null,a.quoteEditId="new",ba("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",r=e.querySelector("#prospect-activity-type")?.value??"call",d=e.querySelector("#prospect-activity-title")?.value??"";if(!d){B("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:h}=await q(async()=>{const{saveProspectActivity:b,fetchProspectActivities:w}=await Promise.resolve().then(()=>R);return{saveProspectActivity:b,fetchProspectActivities:w}},void 0);await m({id:`act_${Date.now()}`,prospectId:s,activityType:r,title:d,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await h(s),S()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(s=>{s.addEventListener("dragstart",r=>{r.dataTransfer?.setData("text/plain",s.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(s=>{s.addEventListener("dragover",r=>r.preventDefault()),s.addEventListener("drop",async r=>{r.preventDefault();const d=r.dataTransfer?.getData("text/plain"),m=s.dataset.prospectStage;if(!d)return;const h=a.prospects.find(b=>b.id===d);if(h&&h.stage!==m){const b={...h,stage:m},{saveProspect:w}=await q(async()=>{const{saveProspect:$}=await Promise.resolve().then(()=>R);return{saveProspect:$}},void 0);await w(b),h.stage=m,S()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:s,saveIntegrationSetting:r}=await q(async()=>{const{fetchIntegrationSettings:$,saveIntegrationSetting:_}=await Promise.resolve().then(()=>R);return{fetchIntegrationSettings:$,saveIntegrationSetting:_}},void 0),m=(a.integrations.length>0?a.integrations:await s()).find($=>$.provider==="slack");if(!m)return;const h=e.querySelector("#slack-webhook")?.value??"",b=e.querySelector("#slack-default-channel")?.value??"",w=e.querySelector("#slack-enabled")?.checked??!1;await r({...m,config:{...m.config,webhook_url:h,default_channel:b},isEnabled:w}),a.integrations=await s(),B("保存しました"),S()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:s,fetchSlackRules:r}=await q(async()=>{const{saveSlackRule:d,fetchSlackRules:m}=await Promise.resolve().then(()=>R);return{saveSlackRule:d,fetchSlackRules:m}},void 0);for(const d of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${d.id}"][data-slack-field="enabled"]`)?.checked??d.enabled,h=e.querySelector(`[data-slack-rule-id="${d.id}"][data-slack-field="channel"]`)?.value??d.channel;await s({...d,enabled:m,channel:h})}a.slackRules=await r(),B("ルールを保存しました"),S()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:s}=await q(async()=>{const{sendSlackNotification:d}=await Promise.resolve().then(()=>R);return{sendSlackNotification:d}},void 0),r=await s("new_order","🧪 これはテスト通知です (syusen-cloud)");r.ok?B("テスト送信成功"):B("送信失敗: "+(r.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,S()}),e.querySelectorAll("[data-action='material-adjust']").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.id??"",d=a.materialList.find(m=>m.id===r);d&&(a.materialEditing=d,a.materialEditingIsNew=!1,S())})}),e.querySelectorAll("[data-action='material-close']").forEach(s=>{s.addEventListener("click",r=>{r.currentTarget!==r.target&&!r.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,S())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const r={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(r.materialType=e.querySelector("#mat-type")?.value??"",!r.code||!r.name){B("コードと品名は必須です","warning");return}const{saveMaterial:d,fetchMaterialList:m}=await q(async()=>{const{saveMaterial:b,fetchMaterialList:w}=await Promise.resolve().then(()=>R);return{saveMaterial:b,fetchMaterialList:w}},void 0);await d(r)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,B("保存しました"),S()):B("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!s||!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:r,fetchMaterialList:d}=await q(async()=>{const{deleteMaterial:m,fetchMaterialList:h}=await Promise.resolve().then(()=>R);return{deleteMaterial:m,fetchMaterialList:h}},void 0);await r(s)&&(a.materialList=await d(),a.materialEditing=null,S())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",S()}),e.querySelectorAll("[data-action='user-edit']").forEach(s=>{s.addEventListener("click",()=>{a.userEditingId=s.dataset.id??null,S()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,S()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const s=a.userEditingId==="__new__",r=s?crypto.randomUUID():a.userEditingId??"",d=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!d||!m){B("名前とメールアドレスは必須です","warning");return}const h={id:r,email:d,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(s){const k=e.querySelector("#user-password")?.value??"";if(k.length<8){B("パスワードは8文字以上必要です","warning");return}try{await on(d,k)}catch(P){B("Auth登録失敗: "+(P instanceof Error?P.message:""),"error");return}}const{saveUserProfile:b,fetchUserProfiles:w,recordAudit:$}=await q(async()=>{const{saveUserProfile:k,fetchUserProfiles:P,recordAudit:E}=await Promise.resolve().then(()=>R);return{saveUserProfile:k,fetchUserProfiles:P,recordAudit:E}},void 0);await b(h)?(await $({action:s?"user_create":"user_update",entityType:"user",entityId:r,userEmail:a.user?.email}),a.userProfiles=await w(),a.userEditingId=null,B("保存しました"),S()):B("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const r=s.dataset.id??"",{deleteUserProfile:d,fetchUserProfiles:m,recordAudit:h}=await q(async()=>{const{deleteUserProfile:w,fetchUserProfiles:$,recordAudit:_}=await Promise.resolve().then(()=>R);return{deleteUserProfile:w,fetchUserProfiles:$,recordAudit:_}},void 0);await d(r)?(await h({action:"user_delete",entityType:"user",entityId:r,userEmail:a.user?.email}),a.userProfiles=await m(),S()):B("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const s=e.querySelector("#profile-sender")?.value??"",r={...a.myProfile,defaultMailSenderId:s},{saveUserProfile:d}=await q(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>R);return{saveUserProfile:m}},void 0);await d(r),a.myProfile=r,B("保存しました"),S()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const s=e.querySelector("#profile-new-password")?.value??"";if(s.length<8){B("8文字以上のパスワードを入力してください","warning");return}try{await xo(s),B("パスワードを変更しました")}catch(r){B("変更失敗: "+(r instanceof Error?r.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(s=>{s.addEventListener("click",()=>{a.integrationEditingId=s.dataset.id??null,S()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,S()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='int-save']")?.dataset.id??"",r=a.integrations.find($=>$.id===s);if(!r)return;const d={...r.config};Object.keys(d).forEach($=>{const _=e.querySelector(`#int-${$}`);_&&(d[$]=_.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:h,fetchIntegrationSettings:b}=await q(async()=>{const{saveIntegrationSetting:$,fetchIntegrationSettings:_}=await Promise.resolve().then(()=>R);return{saveIntegrationSetting:$,fetchIntegrationSettings:_}},void 0);await h({...r,config:d,isEnabled:m})?(a.integrations=await b(),a.integrationEditingId=null,B("保存しました"),S()):B("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(s=>{s.addEventListener("click",async()=>{const r=a.integrations.find(b=>b.provider==="shopify");if(!r){B("Shopify連携が未設定です","warning");return}s.textContent="同期中…",s.disabled=!0;const{syncShopifyOrders:d,fetchShopifyOrders:m}=await q(async()=>{const{syncShopifyOrders:b,fetchShopifyOrders:w}=await Promise.resolve().then(()=>R);return{syncShopifyOrders:b,fetchShopifyOrders:w}},void 0),h=await d(r);h.error?B("同期失敗: "+h.error,"error"):(B(`${h.count}件を同期しました`),a.shopifyOrders=await m()),S()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(s=>{s.addEventListener("click",async()=>{const r=a.integrations.find(b=>b.provider==="google_calendar");if(!r)return;s.textContent="同期中…",s.disabled=!0;const{syncGoogleCalendar:d,fetchCalendarEvents:m}=await q(async()=>{const{syncGoogleCalendar:b,fetchCalendarEvents:w}=await Promise.resolve().then(()=>R);return{syncGoogleCalendar:b,fetchCalendarEvents:w}},void 0),h=await d(r);h.error?B("同期失敗: "+h.error,"error"):(B(`${h.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),S()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const r=e.querySelector("#fax-file")?.files?.[0];if(!r){B("FAX画像を選択してください","warning");return}const d=a.integrations.find(m=>m.provider==="cloud_vision");if(!d||!d.config.api_key){B("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,S();try{const m=new FileReader;m.onload=async()=>{const h=String(m.result??""),{ocrFaxImage:b,saveFaxRecord:w,fetchFaxInbox:$}=await q(async()=>{const{ocrFaxImage:E,saveFaxRecord:I,fetchFaxInbox:T}=await Promise.resolve().then(()=>R);return{ocrFaxImage:E,saveFaxRecord:I,fetchFaxInbox:T}},void 0),_=await b(d,h),k=e.querySelector("#fax-sender-name")?.value??"",P=e.querySelector("#fax-sender-phone")?.value??"";await w({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:k,senderPhone:P,ocrStatus:_.error?"failed":"done",ocrText:_.text}),a.faxOcrText=_.error?`エラー: ${_.error}`:_.text,a.faxRecords=await $(),a.faxProcessing=!1,S()},m.readAsDataURL(r)}catch(m){B("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,S()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",S()}),e.querySelectorAll("[data-action='ms-edit']").forEach(s=>{s.addEventListener("click",()=>{a.mailSenderEditingId=s.dataset.id??null,S()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,S()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,r={id:s,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(b=>b.id===s)?.isVerified??!1};if(!r.name||!r.email){B("名前とメールアドレスは必須です","warning");return}const{saveMailSender:d,fetchMailSenders:m}=await q(async()=>{const{saveMailSender:b,fetchMailSenders:w}=await Promise.resolve().then(()=>R);return{saveMailSender:b,fetchMailSenders:w}},void 0);await d(r)?(a.mailSenders=await m(),a.mailSenderEditingId=null,B("保存しました"),S()):B("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const r=s.dataset.id??"",{deleteMailSender:d,fetchMailSenders:m}=await q(async()=>{const{deleteMailSender:b,fetchMailSenders:w}=await Promise.resolve().then(()=>R);return{deleteMailSender:b,fetchMailSenders:w}},void 0);await d(r)?(a.mailSenders=await m(),S()):B("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(s=>{s.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){B("データなし","error");return}const s=a.demandAnalysis,r=Object.entries(s.matrix).map(([m,h])=>{const b={productCode:m};return s.months.forEach(w=>{b[w]=h[w]??0}),b}),d=[{key:"productCode",label:"商品コード"},...s.months.map(m=>({key:m,label:m}))];qa("demand-analysis.csv",r,d)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){B("データなし","error");return}const s=a.productionPlan.map(d=>({...d}));qa("production-plan.csv",s,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await Pe("当月の全請求を締め切りますか？")&&B("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async s=>{const r=parseInt(s.target.value);a.brewingPlanFY=r;const{fetchBrewingPlanSummary:d,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:h,fetchBrewingProductDetail:b,fetchBrewingCustomCategories:w,fetchBrewingCategoryOverrides:$,fetchAllBrewingStockEntries:_}=await q(async()=>{const{fetchBrewingPlanSummary:j,fetchBrewingMonthlyTrend:F,fetchBrewingSchedule:z,fetchBrewingProductDetail:Y,fetchBrewingCustomCategories:H,fetchBrewingCategoryOverrides:G,fetchAllBrewingStockEntries:J}=await Promise.resolve().then(()=>R);return{fetchBrewingPlanSummary:j,fetchBrewingMonthlyTrend:F,fetchBrewingSchedule:z,fetchBrewingProductDetail:Y,fetchBrewingCustomCategories:H,fetchBrewingCategoryOverrides:G,fetchAllBrewingStockEntries:J}},void 0),[k,P,E,I,T,O,N]=await Promise.all([d(`${r}-10-01`,`${r+1}-09-30`),m(`${r}-10-01`,`${r+1}-09-30`),h(r),b(`${r}-10-01`,`${r+1}-09-30`),w(),$(),_()]);a.brewingPlanData=k,a.brewingMonthlyTrend=P,a.brewingSchedule=E,a.brewingProductDetail=I,a.brewingStockEntries=N,a.brewingCustomCategories=T,a.brewingOverrides=O,a.brewingExcludedProducts=new Set,S()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.code??"",d=s.dataset.parent??"";if(!r||!d)return;if(s.checked){a.brewingExcludedProducts.delete(r),S();return}a.brewingExcludedProducts.add(r);const m=a.brewingCustomCategories.filter(h=>h.parentCategory===d);if(m.length===1){const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:$}=await q(async()=>{const{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:N,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:F}=await Promise.resolve().then(()=>R);return{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:N,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:F}},void 0);await h(r,m[0].name);const _=a.brewingPlanFY,{fetchBrewingYearlyShipments:k}=await q(async()=>{const{fetchBrewingYearlyShipments:O}=await Promise.resolve().then(()=>R);return{fetchBrewingYearlyShipments:O}},void 0),[P,E,I,T]=await Promise.all([b(`${_}-10-01`,`${_+1}-09-30`),w(`${_}-10-01`,`${_+1}-09-30`),$(),k()]);a.brewingPlanData=P,a.brewingProductDetail=E,a.brewingOverrides=I,a.brewingYearlyShipments=T,a.brewingExcludedProducts.delete(r)}S()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.code??"",d=s.dataset.cat??"";if(!r||!d)return;const{setBrewingCategoryOverride:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:w,fetchBrewingYearlyShipments:$}=await q(async()=>{const{setBrewingCategoryOverride:T,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchBrewingYearlyShipments:F}=await Promise.resolve().then(()=>R);return{setBrewingCategoryOverride:T,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchBrewingYearlyShipments:F}},void 0);await m(r,d);const _=a.brewingPlanFY,[k,P,E,I]=await Promise.all([h(`${_}-10-01`,`${_+1}-09-30`),b(`${_}-10-01`,`${_+1}-09-30`),w(),$()]);a.brewingPlanData=k,a.brewingProductDetail=P,a.brewingOverrides=E,a.brewingYearlyShipments=I,S()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.code??"";if(!r)return;const{setBrewingCategoryOverride:d,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h,fetchBrewingCategoryOverrides:b,fetchBrewingYearlyShipments:w}=await q(async()=>{const{setBrewingCategoryOverride:I,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:N,fetchBrewingYearlyShipments:j}=await Promise.resolve().then(()=>R);return{setBrewingCategoryOverride:I,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:N,fetchBrewingYearlyShipments:j}},void 0);await d(r,null);const $=a.brewingPlanFY,[_,k,P,E]=await Promise.all([m(`${$}-10-01`,`${$+1}-09-30`),h(`${$}-10-01`,`${$+1}-09-30`),b(),w()]);a.brewingPlanData=_,a.brewingProductDetail=k,a.brewingOverrides=P,a.brewingYearlyShipments=E,S()})}),(()=>{const s=e.querySelector("#gantt-timeline");if(!s)return;const r=[9,10,11,12,1,2,3,4,5],d=r.length;let m=null,h=null;s.querySelectorAll(".gantt-bar").forEach(P=>{P.style.pointerEvents="auto"});function b(P){return"touches"in P?P.touches[0].clientX:P.clientX}function w(P){const E=P.target,I=E.closest(".gantt-bar");if(!I)return;const T=I.parentElement,O=I.dataset.cat??"",N=parseInt(I.dataset.month??"0"),j=parseInt(I.dataset.dur??"1"),F=parseInt(I.dataset.vol??"0"),z=T.offsetWidth/d;let Y="move";E.classList.contains("gantt-resize-right")?Y="resize-right":E.classList.contains("gantt-resize-left")&&(Y="resize-left"),I.style.cursor=Y==="move"?"grabbing":"ew-resize",I.style.opacity="0.8",I.style.zIndex="10",m={bar:I,mode:Y,cat:O,origMonth:N,origDur:j,origVol:F,startX:b(P),cellW:z,origLeftPct:parseFloat(I.style.left),origWidthPct:parseFloat(I.style.width)},P.preventDefault()}function $(P){if(!m)return;const{bar:E,mode:I,origDur:T,startX:O,cellW:N,origLeftPct:j,origWidthPct:F}=m,z=b(P)-O,Y=Math.round(z/N),H=Math.round(j/100*d);if(I==="move"){const G=Math.max(0,Math.min(d-T,H+Y));E.style.left=(G/d*100).toFixed(2)+"%"}else if(I==="resize-right"){const G=Math.max(1,Math.min(d-H,T+Y));E.style.width=(G/d*100).toFixed(2)+"%"}else if(I==="resize-left"){const G=Math.max(0,Math.min(H+T-1,H+Y)),J=T-(G-H);E.style.left=(G/d*100).toFixed(2)+"%",E.style.width=(J/d*100).toFixed(2)+"%"}}async function _(P){if(!m)return;const{bar:E,cat:I,origMonth:T,origDur:O,origVol:N}=m,j=Math.round(parseFloat(E.style.left)/100*d),F=Math.max(1,Math.round(parseFloat(E.style.width)/100*d)),z=r[Math.max(0,Math.min(d-1,j))];if(E.style.cursor="grab",E.style.opacity="1",E.style.zIndex="",m=null,z===T&&F===O)return;const{saveBrewingSchedule:Y,fetchBrewingSchedule:H}=await q(async()=>{const{saveBrewingSchedule:J,fetchBrewingSchedule:Q}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:J,fetchBrewingSchedule:Q}},void 0),G=a.brewingSchedule.filter(J=>J.brewCategory===I).map(J=>J.brewMonth===T?{brewMonth:z,durationMonths:F,plannedVolumeL:N}:{brewMonth:J.brewMonth,durationMonths:J.durationMonths,plannedVolumeL:J.plannedVolumeL});await Y(I,a.brewingPlanFY,G),a.brewingSchedule=await H(a.brewingPlanFY),S()}s.addEventListener("mousedown",w),s.addEventListener("touchstart",w,{passive:!1}),document.addEventListener("mousemove",$),document.addEventListener("touchmove",$,{passive:!1}),document.addEventListener("mouseup",_),document.addEventListener("touchend",_);function k(P){const E=P.dataset.cat??"",I=parseInt(P.dataset.month??"0"),T=parseInt(P.dataset.vol??"0"),O=parseInt(P.dataset.max??"99999"),N=P.querySelector(".gantt-bar-label");if(!N||N.querySelector("input"))return;const j=document.createElement("input");j.type="number",j.min="0",j.max=String(O),j.step="100",j.value=String(T),j.style.cssText="width:60px;height:24px;font-size:12px;text-align:center;border:1px solid #2563eb;border-radius:3px;pointer-events:auto;",N.textContent="",N.style.pointerEvents="auto",N.appendChild(j),j.focus(),j.select();const F=async()=>{const z=parseFloat(j.value)||0;if(N.style.pointerEvents="none",N.textContent=M(Math.round(z))+"L",Math.abs(z-T)<1)return;const{saveBrewingSchedule:Y,fetchBrewingSchedule:H}=await q(async()=>{const{saveBrewingSchedule:J,fetchBrewingSchedule:Q}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:J,fetchBrewingSchedule:Q}},void 0),G=a.brewingSchedule.filter(J=>J.brewCategory===E).map(J=>({brewMonth:J.brewMonth,durationMonths:J.durationMonths,plannedVolumeL:J.brewMonth===I?z:J.plannedVolumeL}));await Y(E,a.brewingPlanFY,G),a.brewingSchedule=await H(a.brewingPlanFY),S()};j.addEventListener("blur",F),j.addEventListener("keydown",z=>{z.key==="Enter"&&j.blur()})}s.addEventListener("dblclick",P=>{const E=P.target.closest(".gantt-bar");E&&k(E)}),s.addEventListener("touchstart",P=>{const E=P.target.closest(".gantt-bar");if(E){if(h){clearTimeout(h),h=null,k(E);return}h=setTimeout(()=>{h=null},300)}},{passive:!0}),s.querySelectorAll(".gantt-bar-container").forEach(P=>{P.style.pointerEvents="auto";const E=async I=>{if(m)return;const T=P.dataset.cat??"",O=parseInt(P.dataset.max??"0"),N=P.getBoundingClientRect(),j=I-N.left,F=Math.floor(j/(N.width/d)),z=r[Math.max(0,Math.min(d-1,F))];if(a.brewingSchedule.some(Q=>Q.brewCategory===T&&Q.brewMonth===z))return;const Y=Math.round(O*.3)||500,{saveBrewingSchedule:H,fetchBrewingSchedule:G}=await q(async()=>{const{saveBrewingSchedule:Q,fetchBrewingSchedule:le}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:Q,fetchBrewingSchedule:le}},void 0),J=[...a.brewingSchedule.filter(Q=>Q.brewCategory===T).map(Q=>({brewMonth:Q.brewMonth,durationMonths:Q.durationMonths,plannedVolumeL:Q.plannedVolumeL})),{brewMonth:z,durationMonths:2,plannedVolumeL:Y}];await H(T,a.brewingPlanFY,J),a.brewingSchedule=await G(a.brewingPlanFY),S()};P.addEventListener("click",I=>{I.target.closest(".gantt-bar")||E(I.clientX)})})})();function M(s){return s.toLocaleString("ja-JP")}(()=>{const s=e.querySelector("#bp-gantt");if(!s)return;let r=null;function d(b){const w=b.target,$=w.closest(".bp-gantt-bar");if(!$)return;let _="move";w.classList.contains("bp-gantt-resize-right")?_="resize-right":w.classList.contains("bp-gantt-resize-left")&&(_="resize-left");const k="touches"in b?b.touches[0].clientX:b.clientX;$.style.opacity="0.7",$.style.zIndex="10",r={bar:$,mode:_,stepId:$.dataset.stepId??"",startX:k,origLeft:parseFloat($.style.left),origWidth:parseFloat($.style.width)},b.preventDefault()}function m(b){if(!r)return;const $=("touches"in b?b.touches[0].clientX:b.clientX)-r.startX;r.mode==="move"?r.bar.style.left=r.origLeft+$+"px":r.mode==="resize-right"?r.bar.style.width=Math.max(6,r.origWidth+$)+"px":(r.bar.style.left=r.origLeft+$+"px",r.bar.style.width=Math.max(6,r.origWidth-$)+"px")}async function h(){if(!r)return;const{bar:b,stepId:w,origLeft:$,origWidth:_}=r,k=parseFloat(b.style.left),P=parseFloat(b.style.width);b.style.opacity="1",b.style.zIndex="",r=null;const E=Math.round((k-$)/6),I=Math.round((P-_)/6);if(E===0&&I===0)return;const T=b.dataset.plannedStart??"",O=b.dataset.plannedEnd??"";if(!T||!O)return;const N=(H,G)=>{const J=new Date(H);return J.setDate(J.getDate()+G),J.toISOString().slice(0,10)};let j=T,F=O;E!==0&&I===0?(j=N(T,E),F=N(O,E)):I!==0&&E===0?F=N(O,I):(j=N(T,E),F=N(O,E+I));const{updateBrewingProcessStep:z,fetchBrewingProcessSteps:Y}=await q(async()=>{const{updateBrewingProcessStep:H,fetchBrewingProcessSteps:G}=await Promise.resolve().then(()=>R);return{updateBrewingProcessStep:H,fetchBrewingProcessSteps:G}},void 0);await z(w,{planned_start:j,planned_end:F}),a.brewingProcessSteps=await Y(a.brewingBatches.map(H=>H.id)),S()}s.addEventListener("mousedown",d),s.addEventListener("touchstart",d,{passive:!1}),document.addEventListener("mousemove",m),document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("mouseup",h),document.addEventListener("touchend",h)})(),e.querySelector("[data-action='bp-import-schedule']")?.addEventListener("click",async()=>{const s=e.querySelectorAll("[data-action='bp-import-check']:checked");if(s.length===0)return;const{createBrewingBatch:r,fetchBrewingBatches:d,fetchBrewingProcessSteps:m}=await q(async()=>{const{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>R);return{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:w}},void 0);for(const h of s){const b=h.dataset.cat??"",w=h.dataset.code??"",$=parseFloat(h.dataset.vol??"0"),_=h.dataset.date??"";!b||!w||!_||await r(b,w,a.brewingPlanFY,$,_)}a.brewingBatches=await d(a.brewingPlanFY),a.brewingBatches.length>0&&(a.brewingProcessSteps=await m(a.brewingBatches.map(h=>h.id))),S()}),e.querySelector("[data-action='bp-show-new-form']")?.addEventListener("click",()=>{a.bpShowNewForm=!a.bpShowNewForm,S()}),e.querySelector("[data-action='bp-create-batch']")?.addEventListener("click",async()=>{const s=e.querySelector("#bp-new-cat")?.value??"",r=e.querySelector("#bp-new-code")?.value?.trim()??"",d=parseFloat(e.querySelector("#bp-new-vol")?.value??"0"),m=e.querySelector("#bp-new-date")?.value??"";if(!s||!r||!m)return;const{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:w}=await q(async()=>{const{createBrewingBatch:$,fetchBrewingBatches:_,fetchBrewingProcessSteps:k}=await Promise.resolve().then(()=>R);return{createBrewingBatch:$,fetchBrewingBatches:_,fetchBrewingProcessSteps:k}},void 0);await h(s,r,a.brewingPlanFY,d,m),a.brewingBatches=await b(a.brewingPlanFY),a.brewingProcessSteps=await w(a.brewingBatches.map($=>$.id)),a.bpShowNewForm=!1,S()}),e.querySelectorAll("[data-action='bp-toggle-detail']").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.batchId??"";a.bpExpandedBatchId=a.bpExpandedBatchId===r?"":r,S()})}),e.querySelectorAll("[data-action='bp-step-status']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.stepId??"";if(!r)return;const{updateBrewingProcessStep:d}=await q(async()=>{const{updateBrewingProcessStep:b}=await Promise.resolve().then(()=>R);return{updateBrewingProcessStep:b}},void 0),m={status:s.value};s.value==="進行中"&&!s.dataset.actualStart&&(m.actual_start=new Date().toISOString().split("T")[0]),s.value==="完了"&&!s.dataset.actualEnd&&(m.actual_end=new Date().toISOString().split("T")[0]),await d(r,m);const{fetchBrewingProcessSteps:h}=await q(async()=>{const{fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>R);return{fetchBrewingProcessSteps:b}},void 0);a.brewingProcessSteps=await h(a.brewingBatches.map(b=>b.id)),S()})}),e.querySelectorAll("[data-action='bp-step-temp']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.stepId??"";if(!r)return;const{updateBrewingProcessStep:d}=await q(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>R);return{updateBrewingProcessStep:m}},void 0);await d(r,{temperature:parseFloat(s.value)||null})})}),e.querySelectorAll("[data-action='bp-step-notes']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.stepId??"";if(!r)return;const{updateBrewingProcessStep:d}=await q(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>R);return{updateBrewingProcessStep:m}},void 0);await d(r,{notes:s.value})})});let L="";e.querySelectorAll("[data-action='bp-show-delete-modal']").forEach(s=>{s.addEventListener("click",()=>{L=s.dataset.batchId??"";const r=e.querySelector("#bp-delete-modal"),d=e.querySelector("#bp-delete-batch-name");r&&(r.style.display="flex"),d&&(d.textContent=s.dataset.batchCode??"")})}),e.querySelector("[data-action='bp-delete-cancel']")?.addEventListener("click",()=>{const s=e.querySelector("#bp-delete-modal");s&&(s.style.display="none"),L=""}),e.querySelector("[data-action='bp-delete-confirm']")?.addEventListener("click",async()=>{if(!L)return;const s=e.querySelector("#bp-delete-modal");s&&(s.style.display="none");const{supabaseDelete:r}=await q(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>Z);return{supabaseDelete:h}},void 0);await r("brewing_process_batches",L);const{fetchBrewingBatches:d,fetchBrewingProcessSteps:m}=await q(async()=>{const{fetchBrewingBatches:h,fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>R);return{fetchBrewingBatches:h,fetchBrewingProcessSteps:b}},void 0);a.brewingBatches=await d(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(h=>h.id)):[],a.bpExpandedBatchId="",L="",S()}),e.querySelector("#bp-delete-modal")?.addEventListener("click",s=>{s.target===s.currentTarget&&(s.currentTarget.style.display="none",L="")}),e.querySelectorAll("[data-action='bp-batch-vol']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.batchId??"";if(!r)return;const{updateBrewingBatch:d}=await q(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>R);return{updateBrewingBatch:m}},void 0);await d(r,{planned_volume_l:parseFloat(s.value)||0})})}),e.querySelectorAll("[data-action='bp-batch-date']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.batchId??"";if(!r)return;const{updateBrewingBatch:d}=await q(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>R);return{updateBrewingBatch:m}},void 0);await d(r,{start_date:s.value})})}),e.querySelectorAll("[data-action='bp-batch-status']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.batchId??"";if(!r)return;const{updateBrewingBatch:d,fetchBrewingBatches:m,fetchBrewingProcessSteps:h}=await q(async()=>{const{updateBrewingBatch:b,fetchBrewingBatches:w,fetchBrewingProcessSteps:$}=await Promise.resolve().then(()=>R);return{updateBrewingBatch:b,fetchBrewingBatches:w,fetchBrewingProcessSteps:$}},void 0);await d(r,{status:s.value}),a.brewingBatches=await m(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await h(a.brewingBatches.map(b=>b.id)):[],S()})}),e.querySelectorAll("[data-action='proc-add-schedule']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.cat??"",d=e.querySelector(`[data-action='proc-add-month-select'][data-cat='${r}']`),m=e.querySelector(`[data-action='proc-add-month-vol'][data-cat='${r}']`),h=parseInt(d?.value??"0"),b=parseFloat(m?.value??"0");if(!r||!h||b<=0)return;const $=[...a.brewingSchedule.filter(P=>P.brewCategory===r).map(P=>({brewMonth:P.brewMonth,durationMonths:P.durationMonths,plannedVolumeL:P.plannedVolumeL})),{brewMonth:h,durationMonths:2,plannedVolumeL:b}],{saveBrewingSchedule:_,fetchBrewingSchedule:k}=await q(async()=>{const{saveBrewingSchedule:P,fetchBrewingSchedule:E}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:P,fetchBrewingSchedule:E}},void 0);await _(r,a.brewingPlanFY,$),a.brewingSchedule=await k(a.brewingPlanFY),S()})}),e.querySelectorAll("[data-action='proc-remove-schedule']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.cat??"",d=parseInt(s.dataset.month??"0");if(!r||!d)return;const m=a.brewingSchedule.filter(w=>w.brewCategory===r&&w.brewMonth!==d).map(w=>({brewMonth:w.brewMonth,durationMonths:w.durationMonths,plannedVolumeL:w.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await q(async()=>{const{saveBrewingSchedule:w,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:w,fetchBrewingSchedule:$}},void 0);await h(r,a.brewingPlanFY,m),a.brewingSchedule=await b(a.brewingPlanFY),S()})}),e.querySelectorAll("[data-action='proc-sched-remove']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.cat??"",d=parseInt(s.dataset.month??"0");if(!r||!d)return;const m=a.brewingSchedule.filter(w=>w.brewCategory===r&&w.brewMonth!==d).map(w=>({brewMonth:w.brewMonth,durationMonths:w.durationMonths,plannedVolumeL:w.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await q(async()=>{const{saveBrewingSchedule:w,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:w,fetchBrewingSchedule:$}},void 0);await h(r,a.brewingPlanFY,m),a.brewingSchedule=await b(a.brewingPlanFY),S()})}),e.querySelectorAll("[data-action='proc-sched-edit-vol']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.cat??"",d=parseInt(s.dataset.month??"0"),m=parseFloat(s.value)||0;if(!r||!d)return;const h=a.brewingSchedule.filter($=>$.brewCategory===r).map($=>({brewMonth:$.brewMonth,durationMonths:$.durationMonths,plannedVolumeL:$.brewMonth===d?m:$.plannedVolumeL})),{saveBrewingSchedule:b,fetchBrewingSchedule:w}=await q(async()=>{const{saveBrewingSchedule:$,fetchBrewingSchedule:_}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:$,fetchBrewingSchedule:_}},void 0);await b(r,a.brewingPlanFY,h),a.brewingSchedule=await w(a.brewingPlanFY),S()})}),e.querySelectorAll("[data-action='proc-edit-vol']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.cat??"",d=parseFloat(s.value)||0;if(!r)return;const{saveProcurementDecision:m}=await q(async()=>{const{saveProcurementDecision:h}=await Promise.resolve().then(()=>R);return{saveProcurementDecision:h}},void 0);await m(r,a.brewingPlanFY,d),a.procurementDecisions[r]=d,S()})}),e.querySelector("[data-action='proc-add-commitment']")?.addEventListener("click",async()=>{const s=(e.querySelector("#proc-commit-variety")?.value??"").trim(),r=parseFloat(e.querySelector("#proc-commit-bales")?.value??"0"),d=parseFloat(e.querySelector("#proc-commit-price")?.value??"0"),m=parseInt(e.querySelector("#proc-commit-month")?.value??"0")||null,h=(e.querySelector("#proc-commit-supplier")?.value??"").trim();if(!s||r<=0)return;const{saveRicePurchaseCommitment:b,fetchRicePurchaseCommitments:w}=await q(async()=>{const{saveRicePurchaseCommitment:$,fetchRicePurchaseCommitments:_}=await Promise.resolve().then(()=>R);return{saveRicePurchaseCommitment:$,fetchRicePurchaseCommitments:_}},void 0);await b({varietyName:s,committedBales:r,pricePerKg:d,deliveryMonth:m,supplier:h,fy:a.brewingPlanFY}),a.ricePurchaseCommitments=await w(a.brewingPlanFY),S()}),e.querySelector("[data-action='proc-add-variety']")?.addEventListener("click",async()=>{const s=e.querySelector("#proc-variety-name"),r=e.querySelector("#proc-variety-price"),d=s?.value.trim()??"",m=parseFloat(r?.value??"400")||400;if(!d)return;const{addRiceVariety:h,fetchRiceVarieties:b}=await q(async()=>{const{addRiceVariety:$,fetchRiceVarieties:_}=await Promise.resolve().then(()=>R);return{addRiceVariety:$,fetchRiceVarieties:_}},void 0);await h(d,m)&&(a.riceVarieties=await b(),s&&(s.value=""),r&&(r.value=""),B(`「${d}」を追加しました`)),S()}),e.querySelectorAll("[data-action='proc-delete-variety']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.id??"",{deleteRiceVariety:d,fetchRiceVarieties:m}=await q(async()=>{const{deleteRiceVariety:b,fetchRiceVarieties:w}=await Promise.resolve().then(()=>R);return{deleteRiceVariety:b,fetchRiceVarieties:w}},void 0);await d(r)&&(a.riceVarieties=await m()),S()})}),e.querySelectorAll("[data-action='brew-rice-variety-select']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.cat??"",d=s.dataset.field??"",m=s.value;if(!r||!d)return;const h=a.brewingRiceParams[r]??{brewCategory:r,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[d]=m;const b=a.riceVarieties.find($=>$.name===m);b&&(d==="kojiVariety"&&(h.kojiPricePerKg=b.defaultPricePerKg),d==="kakeVariety"&&(h.kakePricePerKg=b.defaultPricePerKg)),a.brewingRiceParams[r]=h;const{saveBrewingRiceParams:w}=await q(async()=>{const{saveBrewingRiceParams:$}=await Promise.resolve().then(()=>R);return{saveBrewingRiceParams:$}},void 0);await w(r,h),S()})}),e.querySelector("[data-action='proc-add-new-cat']")?.addEventListener("click",async()=>{const s=e.querySelector("#proc-new-cat-name"),r=e.querySelector("#proc-new-cat-vol"),d=s?.value.trim()??"",m=parseFloat(r?.value??"0");if(!d){B("区分名を入力してください","warning");return}if(m<=0){B("醸造予定量を入力してください","warning");return}const{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await q(async()=>{const{saveBrewingSchedule:w,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:w,fetchBrewingSchedule:$}},void 0);await h(d,a.brewingPlanFY,[{brewMonth:10,durationMonths:2,plannedVolumeL:m}]),a.brewingSchedule=await b(a.brewingPlanFY),s&&(s.value=""),r&&(r.value=""),B(`「${d}」を追加しました`),S()}),e.querySelector("[data-action='brew-rice-bulk-apply']")?.addEventListener("click",async()=>{const s=parseFloat(e.querySelector("#rice-bulk-per-l")?.value??"0.50"),r=parseFloat(e.querySelector("#rice-bulk-koji")?.value??"0.30");if(isNaN(s)||isNaN(r))return;const{saveBrewingRiceParams:d}=await q(async()=>{const{saveBrewingRiceParams:b}=await Promise.resolve().then(()=>R);return{saveBrewingRiceParams:b}},void 0),m=Object.keys(a.brewingRiceParams),h=new Set([...m,...a.brewingYearlyShipments.map(b=>b.brewCategory)]);for(const b of h){const w=a.brewingRiceParams[b]??{brewCategory:b,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};w.ricePerLiterKg=s,w.kojiRatio=r,a.brewingRiceParams[b]=w,await d(b,w)}S()}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.cat??"",d=s.dataset.field??"",m=parseFloat(s.value);if(!r||!d||isNaN(m))return;const h=a.brewingRiceParams[r]??{brewCategory:r,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[d]=m,a.brewingRiceParams[r]=h;const{saveBrewingRiceParams:b}=await q(async()=>{const{saveBrewingRiceParams:w}=await Promise.resolve().then(()=>R);return{saveBrewingRiceParams:w}},void 0);await b(r,h),S()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.cat??"",d=parseFloat(s.value);if(!r)return;const{saveBrewingForecastOverride:m}=await q(async()=>{const{saveBrewingForecastOverride:h}=await Promise.resolve().then(()=>R);return{saveBrewingForecastOverride:h}},void 0);if(isNaN(d))await m(r,null),delete a.brewingForecastOverrides[r];else{const h=d/100;await m(r,h),a.brewingForecastOverrides[r]=h}S()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.cat??"",d="bc-"+encodeURIComponent(r).replace(/%/g,"-"),m=e.querySelector(`#alc-raw-${d}`),h=e.querySelector(`#alc-target-${d}`),b=parseFloat(m?.value??"18")||18,w=parseFloat(h?.value??"15")||15,{saveBrewingAlcoholSetting:$}=await q(async()=>{const{saveBrewingAlcoholSetting:k}=await Promise.resolve().then(()=>R);return{saveBrewingAlcoholSetting:k}},void 0);await $(r,b,w)&&(a.brewingAlcoholSettings[r]={brewCategory:r,rawAlcoholPct:b,targetAlcoholPct:w}),S()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.code??"",d=s.value,m=s.dataset.current??"";if(d===m)return;const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:$}=await q(async()=>{const{setBrewingCategoryOverride:k,fetchBrewingPlanSummary:P,fetchBrewingProductDetail:E,fetchBrewingCategoryOverrides:I}=await Promise.resolve().then(()=>R);return{setBrewingCategoryOverride:k,fetchBrewingPlanSummary:P,fetchBrewingProductDetail:E,fetchBrewingCategoryOverrides:I}},void 0);if(await h(r,d)){const k=a.brewingPlanFY,[P,E,I]=await Promise.all([b(`${k}-10-01`,`${k+1}-09-30`),w(`${k}-10-01`,`${k+1}-09-30`),$()]);a.brewingPlanData=P,a.brewingProductDetail=E,a.brewingOverrides=I}S()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.cat??"",d=s.value;if(!r||!d)return;const{linkTypeToCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:w,fetchCategoryTypeLinks:$}=await q(async()=>{const{linkTypeToCategory:T,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:F}=await Promise.resolve().then(()=>R);return{linkTypeToCategory:T,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:F}},void 0);await m(r,d);const _=a.brewingPlanFY,[k,P,E,I]=await Promise.all([h(`${_}-10-01`,`${_+1}-09-30`),b(`${_}-10-01`,`${_+1}-09-30`),w(),$()]);a.brewingPlanData=k,a.brewingProductDetail=P,a.brewingOverrides=E,a.brewingTypeLinks=I,S()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.cat??"",d=s.dataset.type??"";if(!r||!d)return;const{unlinkTypeFromCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:w,fetchCategoryTypeLinks:$}=await q(async()=>{const{unlinkTypeFromCategory:T,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:F}=await Promise.resolve().then(()=>R);return{unlinkTypeFromCategory:T,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:F}},void 0);await m(r,d);const _=a.brewingPlanFY,[k,P,E,I]=await Promise.all([h(`${_}-10-01`,`${_+1}-09-30`),b(`${_}-10-01`,`${_+1}-09-30`),w(),$()]);a.brewingPlanData=k,a.brewingProductDetail=P,a.brewingOverrides=E,a.brewingTypeLinks=I,S()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const s=e.querySelector("#brew-new-category-name"),r=e.querySelector("#brew-new-category-parent"),d=s?.value.trim()??"",m=r?.value??"";if(!d)return;if(!m){B("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map($=>$.name)].includes(d)){B("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:b}=await q(async()=>{const{addBrewingCustomCategory:$}=await Promise.resolve().then(()=>R);return{addBrewingCustomCategory:$}},void 0);await b(d,m)?(a.brewingCustomCategories.push({name:d,parentCategory:m}),s&&(s.value=""),B(`「${d}」を追加しました（${m}系）`)):B("追加に失敗しました","error"),S()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.cat??"";if(!r)return;const{deleteBrewingCustomCategory:d,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h}=await q(async()=>{const{deleteBrewingCustomCategory:w,fetchBrewingPlanSummary:$,fetchBrewingProductDetail:_}=await Promise.resolve().then(()=>R);return{deleteBrewingCustomCategory:w,fetchBrewingPlanSummary:$,fetchBrewingProductDetail:_}},void 0);if(await d(r)){a.brewingCustomCategories=a.brewingCustomCategories.filter(k=>k.name!==r);for(const[k,P]of Object.entries(a.brewingOverrides))P===r&&delete a.brewingOverrides[k];const w=a.brewingPlanFY,[$,_]=await Promise.all([m(`${w}-10-01`,`${w+1}-09-30`),h(`${w}-10-01`,`${w+1}-09-30`)]);a.brewingPlanData=$,a.brewingProductDetail=_,B(`「${r}」を削除しました`)}S()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.cat??"",d=s.dataset.catId??"",h=e.querySelector(`#new-entry-target-${d}`)?.value??r,b=e.querySelector(`#new-entry-label-${d}`),w=e.querySelector(`#new-entry-vol-${d}`),$=b?.value.trim()??"",_=parseFloat(w?.value??"0");if(_<=0)return;const{addBrewingStockEntry:k,fetchBrewingPlanSummary:P,fetchAllBrewingStockEntries:E}=await q(async()=>{const{addBrewingStockEntry:T,fetchBrewingPlanSummary:O,fetchAllBrewingStockEntries:N}=await Promise.resolve().then(()=>R);return{addBrewingStockEntry:T,fetchBrewingPlanSummary:O,fetchAllBrewingStockEntries:N}},void 0);if(await k(h,$||`タンク${a.brewingStockEntries.filter(T=>T.brewCategory===h).length+1}`,_)){const T=a.brewingPlanFY,[O,N]=await Promise.all([P(`${T}-10-01`,`${T+1}-09-30`),E()]);a.brewingPlanData=O,a.brewingStockEntries=N}S(),requestAnimationFrame(()=>{const T=document.getElementById(`stock-display-${d}`),O=document.getElementById(`stock-edit-${d}`),N=document.querySelector(`.btn-edit-stock[data-cat-id="${d}"]`);T&&(T.style.display="none"),O&&(O.style.display=""),N&&(N.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.id??"",d=s.value;if(!r||!d)return;const{reassignBrewingStockEntry:m,fetchBrewingPlanSummary:h,fetchAllBrewingStockEntries:b}=await q(async()=>{const{reassignBrewingStockEntry:$,fetchBrewingPlanSummary:_,fetchAllBrewingStockEntries:k}=await Promise.resolve().then(()=>R);return{reassignBrewingStockEntry:$,fetchBrewingPlanSummary:_,fetchAllBrewingStockEntries:k}},void 0);if(await m(r,d)){const $=a.brewingPlanFY,[_,k]=await Promise.all([h(`${$}-10-01`,`${$+1}-09-30`),b()]);a.brewingPlanData=_,a.brewingStockEntries=k}S(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach($=>{const _=document.getElementById(`stock-display-${$.dataset.catId}`),k=document.getElementById(`stock-edit-${$.dataset.catId}`);k&&k.querySelector(`[data-id="${r}"]`)&&(_&&(_.style.display="none"),k.style.display="",$.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.id??"",d=s.dataset.cat??"",m="bc-"+encodeURIComponent(d).replace(/%/g,"-"),{deleteBrewingStockEntry:h,fetchBrewingPlanSummary:b,fetchAllBrewingStockEntries:w}=await q(async()=>{const{deleteBrewingStockEntry:_,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:P}=await Promise.resolve().then(()=>R);return{deleteBrewingStockEntry:_,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:P}},void 0);if(await h(r)){const _=a.brewingPlanFY,[k,P]=await Promise.all([b(`${_}-10-01`,`${_+1}-09-30`),w()]);a.brewingPlanData=k,a.brewingStockEntries=P}S(),requestAnimationFrame(()=>{const _=document.getElementById(`stock-display-${m}`),k=document.getElementById(`stock-edit-${m}`),P=document.querySelector(`.btn-edit-stock[data-cat-id="${m}"]`);_&&(_.style.display="none"),k&&(k.style.display=""),P&&(P.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.catId??"",d=e.querySelector(`#stock-display-${r}`),m=e.querySelector(`#stock-edit-${r}`);d&&(d.style.display="none"),m&&(m.style.display=""),s.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.catId??"",d=e.querySelector(`#stock-display-${r}`),m=e.querySelector(`#stock-edit-${r}`),h=e.querySelector(`.btn-edit-stock[data-cat-id="${r}"]`);d&&(d.style.display=""),m&&(m.style.display="none"),h&&(h.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.catId??"",d=e.querySelector(`#schedule-rows-${r}`);if(!d)return;const m=d.querySelectorAll(".schedule-edit-row").length,h=document.createElement("div");h.innerHTML=buildScheduleEditRowHTML(r,m,9,2,0,"");const b=h.firstElementChild;d.appendChild(b),b.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>b.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(s=>{s.addEventListener("click",()=>s.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.cat??"",d=s.dataset.catId??"",m=e.querySelector(`#stock-input-${d}`),h=parseFloat(m?.value??"");if(isNaN(h)||h<0){alert("有効な数値を入力してください");return}s.textContent="保存中...",s.setAttribute("disabled","true");try{const{upsertBrewingStock:b,fetchBrewingPlanSummary:w,fetchBrewingMonthlyTrend:$}=await q(async()=>{const{upsertBrewingStock:E,fetchBrewingPlanSummary:I,fetchBrewingMonthlyTrend:T}=await Promise.resolve().then(()=>R);return{upsertBrewingStock:E,fetchBrewingPlanSummary:I,fetchBrewingMonthlyTrend:T}},void 0),_=a.brewingPlanFY;await b(r,h,0);const[k,P]=await Promise.all([w(`${_}-10-01`,`${_+1}-09-30`),$(`${_}-10-01`,`${_+1}-09-30`)]);a.brewingPlanData=k,a.brewingMonthlyTrend=P,S()}catch(b){console.error("[brewing save]",b),alert(`保存エラー: ${String(b)}`),s.textContent="保存",s.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.toggleCat??"",d=`sub-row-${"bc-"+encodeURIComponent(r).replace(/%/g,"-")}`,m=e.querySelectorAll(`.${d}`),h=s.querySelector(".toggle-icon"),b=m[0]?.style.display!=="none";m.forEach(w=>{w.style.display=b?"none":""}),h&&(h.innerHTML=b?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{B("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{B("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(s=>{s.addEventListener("click",()=>{B("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{B("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(s=>{s.addEventListener("click",async()=>{await Pe("この買掛を入金済みにしますか？")&&B("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(s=>{s.addEventListener("click",()=>{B("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{B("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(s=>{s.addEventListener("click",()=>{const r=s.closest("tr")?.querySelector("td")?.textContent??"";B(`タンク ${r} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{B("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(s=>{s.addEventListener("click",()=>{const r=s.closest("tr")?.querySelector("td")?.textContent??"";B(`注文 ${r} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{B("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(s=>{s.addEventListener("click",()=>{B("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{B("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.customer??"";B(`得意先 ${r} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{B("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!s||!await Pe("このリストを削除しますか？"))return;const{supabaseDelete:d}=await q(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>Z);return{supabaseDelete:h}},void 0);if(await d("lead_lists",s)){const{fetchLeadLists:h}=await q(async()=>{const{fetchLeadLists:b}=await Promise.resolve().then(()=>R);return{fetchLeadLists:b}},void 0);a.leadLists=await h(),B("削除しました","success"),S()}else B("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{B("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.scYm;if(!r)return;a.shipmentCalendarYearMonth=r,a.shipmentCalendarData=null,a.shipmentCalendarSelectedDate=null,S();const{fetchShipmentCalendar:d}=await q(async()=>{const{fetchShipmentCalendar:m}=await Promise.resolve().then(()=>R);return{fetchShipmentCalendar:m}},void 0);a.shipmentCalendarData=await d(r),S()})}),e.querySelectorAll("[data-sc-date]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.scDate;r!==void 0&&(a.shipmentCalendarSelectedDate=r?a.shipmentCalendarSelectedDate===r?null:r:null,S())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(s=>{s.addEventListener("click",async()=>{a.calendarYearMonth=s.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:r}=await q(async()=>{const{fetchCalendarEvents:d}=await Promise.resolve().then(()=>R);return{fetchCalendarEvents:d}},void 0);a.calendarEvents=await r(a.calendarYearMonth),S()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async s=>{a.calendarYearMonth=s.target.value;const{fetchCalendarEvents:r}=await q(async()=>{const{fetchCalendarEvents:d}=await Promise.resolve().then(()=>R);return{fetchCalendarEvents:d}},void 0);a.calendarEvents=await r(a.calendarYearMonth),S()}),e.querySelector("#cal-filter-category")?.addEventListener("change",s=>{a.calendarFilterCategory=s.target.value,S()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const s=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(s.getTime()+3600*1e3).toISOString(),isAllDay:!1}},S()}),e.querySelectorAll("[data-cal-date]").forEach(s=>{s.tagName!=="BUTTON"&&s.addEventListener("click",r=>{if(r.target.closest(".cal-event"))return;const d=s.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${d}T10:00:00`,isAllDay:!1}},S()})}),e.querySelectorAll("[data-cal-event-id]").forEach(s=>{s.addEventListener("click",r=>{r.stopPropagation();const d=s.dataset.calEventId,m=a.calendarEvents.find(h=>h.id===d);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},S())})}),e.querySelectorAll("[data-action='cal-close']").forEach(s=>{s.addEventListener("click",r=>{r.currentTarget!==r.target&&!r.target.matches("button")||(a.calendarEdit=null,S())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:s,fetchCalendarEvents:r,CALENDAR_CATEGORY_COLORS:d}=await q(async()=>{const{saveCalendarEvent:$,fetchCalendarEvents:_,CALENDAR_CATEGORY_COLORS:k}=await Promise.resolve().then(()=>R);return{saveCalendarEvent:$,fetchCalendarEvents:_,CALENDAR_CATEGORY_COLORS:k}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,h=e.querySelector("#cal-category")?.value??"general",b={id:m,title:e.querySelector("#cal-title")?.value??"",category:h,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:d[h]};if(!b.title){B("タイトルは必須です","warning");return}await s(b)?(a.calendarEvents=await r(a.calendarYearMonth),a.calendarEdit=null,B("保存しました"),S()):B("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!s||!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:r,fetchCalendarEvents:d}=await q(async()=>{const{deleteCalendarEvent:h,fetchCalendarEvents:b}=await Promise.resolve().then(()=>R);return{deleteCalendarEvent:h,fetchCalendarEvents:b}},void 0);await r(s)?(a.calendarEvents=await d(a.calendarYearMonth),a.calendarEdit=null,B("削除しました"),S()):B("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,S();try{const s=a.importPreview.rows.filter(d=>d._valid),r=await Gs(a.importEntity,s);a.importResult=`取り込み完了: ${r.inserted}件成功 / ${r.failed}件失敗`,a.importPreview=null}catch(s){a.importResult=`エラー: ${s instanceof Error?s.message:String(s)}`}finally{a.importing=!1,S()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const s=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=s,a.storeSales=[],a.actionLoading=!0,S(),Ua(s).then(r=>{a.storeSales=r,a.actionLoading=!1,S()})}),e.querySelectorAll("[data-action='copy-config']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.configValue??"";if(r)try{await navigator.clipboard.writeText(r),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(d){console.warn("Clipboard copy failed",d)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const r=JSON.stringify({supabase_url:we,supabase_anon_key:ie,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),d=new Blob([r],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(d),h=document.createElement("a");h.href=m,h.download="relay_config.json",h.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.code??"";if(r)try{await navigator.clipboard.writeText(decodeURIComponent(r)),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(d){console.warn("Clipboard code copy failed",d)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(s=>{s.addEventListener("change",()=>{Ke(e),a.emailSaveMessage=null,S()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(s=>{s.addEventListener("change",()=>{Ke(e),a.emailSaveMessage=null,S()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{Ke(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{Ke(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(s=>{s.addEventListener("click",()=>{a.emailTemplateId=s.dataset.templateId??"custom";const r=no(a.emailTemplateId);a.emailSubject=r.subject,a.emailBody=r.body,a.emailSaveMessage=null,S()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{Ke(e);const s=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${s}`),a.emailSaveMessage=null,S()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{Ke(e),a.actionLoading=!0,S(),zt(va("draft")).then(s=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(s.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,S()})}),e.querySelector("#email-sender")?.addEventListener("change",s=>{a.emailSenderId=s.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{Ke(e),a.actionLoading=!0,a.emailSending=!0,S();const s=va("sent");a.mailSenders.find(r=>r.id===a.emailSenderId),ws().then(async r=>{await zt({...s,recipientCount:r.sent}),a.emailSaveMessage=`${r.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,S(),B(`${r.sent}件送信完了`)}).catch(async()=>{await zt(va("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,S(),B("APIキー未設定のため下書き保存しました","warning")})})}function S(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=ou()}catch(o){console.error("[renderApp] render error:",o),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(o)}

${o?.stack??""}</div>`;return}const t=e.querySelector(".app-page-title");document.title=t?.textContent?`${t.textContent} | 酒仙iクラウド`:"酒仙iクラウド",cu(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),an()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const o of["fd-scaler","print-scaler","q-preview-scaler"]){const i=e.querySelector(`#${o}`),l=i?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),c=l?.querySelector(".print-page")??l;if(!i||!c)continue;const p=i.parentElement?.clientWidth??0,u=c.offsetWidth;if(p>0&&u>0&&u>p-24){const y=(p-24)/u;i.style.transform=`scale(${y})`,i.style.transformOrigin="top left",i.style.height=`${(c.offsetHeight+48)*y}px`}else i.style.transform="",i.style.height=""}});const n=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=n?"hidden":"",document.body.style.touchAction=n?"none":""}const po="sake-cloud-cache",du=300*1e3;function pu(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(po,JSON.stringify(e))}catch{}}function uu(){try{const e=localStorage.getItem(po);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>du?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let uo=0;async function ot(){const e=uu();e&&(a.loading=!1,S()),a.loading=!e,e||S();try{const[t,n,o,i,l,c,p]=await Promise.all([Kn(),Gn(),Oa(),Wn(),St(a.invoiceFilter),ja(),Hn("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=o,a.pipelineMeta=i,a.invoiceRecords=l,a.salesAnalytics=c,p){const u={...Vt,...Sa(),...p};a.quoteCompanySettings=u,We(u)}if(st.length===0&&Fp(),!a.salesFilter.startDate||!a.salesFilter.endDate){const y=[...t.salesRecords].sort((x,A)=>new Date(A.date).getTime()-new Date(x.date).getTime())[0]?.date??new Date().toISOString(),v=new Date(y),f=new Date(v);f.setDate(v.getDate()-30),a.salesFilter={startDate:zn(f.toISOString()),endDate:zn(v.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await St(a.invoiceFilter)),a.error=null,pu()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,S(),nn(a.route),uo=Date.now()}}window.addEventListener("popstate",()=>{a.route=so(location.pathname),a.currentCategory=tn(a.route),a.sidebarOpen=!1,kt(),nn(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,S();return}if(e.key==="Escape"){if(a.globalSearchOpen){kt(),S();return}if(a.pickerMode){Wt(),S();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(oo(),S());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&io(t)}});a.user=Xt()?wo():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await q(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>R);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),S()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,o=0,i=0,l=0,c=1;document.addEventListener("mousedown",p=>{const u=p.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;p.preventDefault();const y=u.closest(".fd-canvas");if(!y)return;const v=y.getBoundingClientRect();if(v.width===0)return;c=228.6/v.width,t=u,n=p.clientX,o=p.clientY,i=parseFloat(u.style.left)||0,l=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(C=>C.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const f=document.querySelector("#fd-selected-info");f&&(f.textContent=`選択中: ${u.title}`);const x=document.querySelector("#fd-sel-x"),A=document.querySelector("#fd-sel-y");x&&(x.value=String(i)),A&&(A.value=String(l))}),document.addEventListener("mousemove",p=>{if(!t)return;const u=(p.clientX-n)*c,y=(p.clientY-o)*c,v=Math.round((i+u)*2)/2,f=Math.round((l+y)*2)/2;t.style.left=v+"mm",t.style.top=f+"mm";const x=document.querySelector("#fd-sel-x"),A=document.querySelector("#fd-sel-y");x&&(x.value=String(v)),A&&(A.value=String(f))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",p=>{if(!a.fdDesignMode||!a.fdActiveFieldId||p.key!=="ArrowLeft"&&p.key!=="ArrowRight"&&p.key!=="ArrowUp"&&p.key!=="ArrowDown"||p.target.tagName==="INPUT"||p.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;p.preventDefault();const y=.5;let v=parseFloat(u.style.left)||0,f=parseFloat(u.style.top)||0;p.key==="ArrowLeft"?v-=y:p.key==="ArrowRight"?v+=y:p.key==="ArrowUp"?f-=y:p.key==="ArrowDown"&&(f+=y),u.style.left=v+"mm",u.style.top=f+"mm";const x=document.querySelector("#fd-sel-x"),A=document.querySelector("#fd-sel-y");x&&(x.value=String(v)),A&&(A.value=String(f))})})();ot();const mu=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&ot()},mu);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-uo>60*1e3&&ot()});let Ia="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{Ia=e}).catch(()=>{});setInterval(async()=>{if(!(!Ia||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==Ia&&!a.updateAvailable&&(a.updateAvailable=!0,S())}catch{}},120*1e3);export{q as _};
