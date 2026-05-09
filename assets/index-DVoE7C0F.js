(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const xi="modulepreload",wi=function(e){return"/"+e},Ss={},I=function(t,n,s){let r=Promise.resolve();if(n&&n.length>0){let u=function(h){return Promise.all(h.map(v=>Promise.resolve(v).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=c?.nonce||c?.getAttribute("nonce");r=u(n.map(h=>{if(h=wi(h),h in Ss)return;Ss[h]=!0;const v=h.endsWith(".css"),m=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${m}`))return;const w=document.createElement("link");if(w.rel=v?"stylesheet":xi,v||(w.as="script"),w.crossOrigin="",w.href=h,d&&w.setAttribute("nonce",d),document.head.appendChild(w),v)return new Promise((_,k)=>{w.addEventListener("load",_),w.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${h}`)))})}))}function i(c){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=c,window.dispatchEvent(d),!d.defaultPrevented)throw c}return r.then(c=>{for(const d of c||[])d.status==="rejected"&&i(d.reason);return t().catch(i)})},$e="https://ridspyczkxwkcbmwndhm.supabase.co",$i="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHNweWN6a3h3a2NibXduZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzkwODAsImV4cCI6MjA5MzUxNTA4MH0.ppWbfEsrUdUL8sRPO3BPHWA-r12ueMgJ3C44n1FvK3o",ie=$i;async function Ae(e,t){try{const n=new URL(`/rest/v1/${e}`,$e),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function mt(e,t){try{const n=new URL(`/rest/v1/${e}`,$e),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function He(e,t,n){try{const s=new URL(`/rest/v1/${e}?id=eq.${t}`,$e);return(await fetch(s.toString(),{method:"PATCH",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function we(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,$e),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function Wn(e){try{const t=new URL(`/rest/v1/${e}`,$e);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const s=n.headers.get("Content-Range");if(s){const r=s.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function Y(e,t={}){try{const n=new URL(`/rest/v1/${e}`,$e);Object.entries(t).forEach(([r,i])=>{n.searchParams.set(r,i)});const s=await fetch(n.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"return=representation"}});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function Gn(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,$e);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}})).ok}catch{return!1}}async function xe(e,t={},n=1e3){const s=[];let r=0;try{for(;;){const i=new URL(`/rest/v1/${e}`,$e);Object.entries(t).forEach(([u,h])=>{i.searchParams.set(u,h)}),i.searchParams.set("limit",String(n)),i.searchParams.set("offset",String(r));const c=await fetch(i.toString(),{method:"GET",headers:{apikey:ie,Authorization:`Bearer ${ie}`,Accept:"application/json",Prefer:"return=representation"}});if(!c.ok)throw new Error(`HTTP ${c.status}`);const d=await c.json();if(s.push(...d),d.length<n)break;r+=n}return s}catch(i){return console.warn(`Failed to query all rows from Supabase table ${e}`,i),s.length>0?s:[]}}const ne=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:ie,SUPABASE_URL:$e,supabaseCount:Wn,supabaseDelete:Gn,supabaseInsert:Ae,supabaseQuery:Y,supabaseQueryAll:xe,supabaseRpc:we,supabaseUpdate:He,supabaseUpsert:mt},Symbol.toStringTag,{value:"Module"})),Xn="sake_auth";function Co(e){localStorage.setItem(Xn,JSON.stringify(e))}function Do(){return{apikey:ie,"Content-Type":"application/json"}}function _i(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),s=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(s))}catch{return null}}async function qo(e,t){const n=await fetch(`${$e}/auth/v1/${e}`,{method:"POST",headers:Do(),body:JSON.stringify(t)}),s=await n.json().catch(()=>({}));if(!n.ok)throw new Error(s.error_description??s.msg??`HTTP ${n.status}`);return s}async function ki(e,t){const n=await qo("token?grant_type=password",{email:e,password:t});return Co({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Ps(e,t){const n=await qo("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&Co({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Si(){const e=en();if(localStorage.removeItem(Xn),!!e?.access_token)try{await fetch(`${$e}/auth/v1/logout`,{method:"POST",headers:{...Do(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function en(){const e=localStorage.getItem(Xn);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function To(){const e=en();if(!e)return null;const t=_i(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function Pi(e){const t=en();if(!t)throw new Error("not signed in");const n=await fetch(`${$e}/auth/v1/user`,{method:"PUT",headers:{apikey:ie,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const s=await n.json().catch(()=>({}));throw new Error(s.msg??`HTTP ${n.status}`)}}const Zn={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},Io={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},Ei={generatedAt:new Date().toISOString(),records:[]},ht={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},Li={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},Ai={},Ci={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function ue(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function Di(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function qi(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function b(e,t,n=""){for(const s of t){const r=e[s];if(typeof r=="string"&&r.length>0)return r}return n}function q(e,t,n=0){for(const s of t)if(s in e)return ue(e[s]);return n}function Pe(e,t,n=!0){for(const s of t)if(s in e)return qi(e[s]);return n}function Ee(e,t,n){for(const s of t){const r=e[s];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const i=new Date(r);if(!Number.isNaN(i.getTime()))return i.toISOString()}return n}function Ti(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:Ee(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:ue(e.total_amount??e.billed_amount)}}function Es(e){const t=e.trim().toUpperCase(),n=Ai[t];if(n)return n;const s=Io.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function Mo(e){try{return(await Y("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function It(e,t){await mt("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function No(){const e=new Date;e.setFullYear(e.getFullYear()-1);const t=e.toISOString().slice(0,10),n=await Y("daily_sales_fact",{select:"sales_date,sales_amount,total_quantity,document_count",order:"sales_date.desc",sales_date:`gte.${t}`,limit:"400"}),s=new Map;for(const i of n){const c=String(i.sales_date??"");if(!c)continue;const d=s.get(c)??{amount:0,qty:0,docs:0};d.amount+=ue(i.sales_amount),d.qty+=ue(i.total_quantity),d.docs+=ue(i.document_count),s.set(c,d)}const r=Array.from(s.entries()).map(([i,c])=>({sales_date:i,sales_amount:c.amount,amount:c.amount,document_count:c.docs,bottles:c.qty,volume_ml:0,price_per_bottle:c.qty>0?Math.round(c.amount/c.qty):0,price_per_liter:0})).sort((i,c)=>c.sales_date.localeCompare(i.sales_date));if(r.length>0){const i=new Date().toISOString().slice(0,7);jo(i).catch(()=>{});const[c,d]=await Promise.all([Y("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),Y("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),h=new Date().toISOString().slice(0,10),v=h.slice(0,7),m=[...r].sort((E,B)=>E.sales_date.localeCompare(B.sales_date)).map(E=>({date:new Date(`${E.sales_date}T00:00:00Z`).toISOString(),amount:ue(E.amount??E.sales_amount),bottles:ue(E.bottles),volumeMl:ue(E.volume_ml),pricePerBottle:ue(E.price_per_bottle),pricePerLiter:ue(E.price_per_liter)})),w=m.slice(-30),_=E=>ue(E.amount??E.sales_amount),k=r.reduce((E,B)=>B.sales_date===h?E+_(B):E,0),C=r.reduce((E,B)=>B.sales_date.startsWith(v)?E+_(B):E,0),S=c.filter(E=>ue(E.balance_amount)>0),A=d.map((E,B)=>({id:String(E.id??`sale-${B+1}`),documentNo:E.document_no??E.legacy_document_no??"",date:E.sales_date??"",customerCode:E.legacy_customer_code??"",customerName:E.customer_name??E.legacy_customer_code??"",amount:ue(E.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:k,todayDelta:0,monthSales:C,monthDelta:0,unpaidCount:S.length,unpaidAmount:S.reduce((E,B)=>E+ue(B.balance_amount),0)},dailySales:w,allDailySales:m,salesRecords:A}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),Io}async function Ro(){const e=await Y("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status",limit:"1000"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const s=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:ue(t.billed_amount),paymentAmount:ue(t.paid_amount),balanceAmount:ue(t.balance_amount),lastPaymentDate:null,status:Di(t.payment_status)}})}:Ei}async function ma(){const[e,t]=await Promise.all([Y("customers",{limit:"1000"}),Y("products",{limit:"1000"})]);if(e.length>0||t.length>0){const n=e.length?e.map((r,i)=>{const c=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:b(r,["id","customer_id","code"],`customer-${i+1}`),code:b(r,["code","customer_code","legacy_customer_code"],`C${String(i+1).padStart(4,"0")}`),name:b(r,["name","customer_name","display_name"],`Customer ${i+1}`),kanaName:b(r,["kana_name"],""),shortName:b(r,["short_name"],""),postalCode:b(r,["postal_code"],""),address1:b(r,["address1"],""),address2:b(r,["address2"],""),phone:b(r,["phone"],""),fax:b(r,["fax"],""),email:b(r,["email"],""),staffCode:b(r,["staff_code"],""),businessType:b(r,["business_type"],""),areaCode:b(r,["delivery_area_code"],""),salesCategory:String(c.sales_category??""),closingDay:q(r,["closing_day","close_day"],31),paymentDay:q(r,["payment_day","due_day"],15),paymentMonth:Number(c.payment_month??0),paymentCycle:b(r,["payment_cycle"],""),billingCycleType:b(r,["billing_cycle_type"],""),billingCode:String(c.billing_code??""),creditLimit:q(r,["credit_limit"],0),taxMode:b(r,["tax_mode"],""),taxRound:String(c.tax_round??""),invoiceIssue:String(c.invoice_issue??""),invoiceType:b(r,["invoice_type"],""),priceGroup:String(c.price_group??""),priceType:String(c.price_type??""),tradeType:(()=>{const d=b(r,["trade_type"],"");if(d)return d;const u=String(c.price_type??"");return u==="000"?"B2B2C":u==="001"?"B2C":"B2B"})(),customerGroup1:String(c.customer_group1??""),customerGroup2:String(c.customer_group2??""),bankName:b(r,["bank_name"],""),bankBranch:b(r,["bank_branch"],""),bankAccount:b(r,["bank_account"],""),isActive:Pe(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):ht.customers,s=t.length?t.map((r,i)=>({id:b(r,["id","product_id","product_code","legacy_product_code"],`product-${i+1}`),code:b(r,["product_code","legacy_product_code","code"],`P${String(i+1).padStart(5,"0")}`),janCode:b(r,["jan_code","jan","barcode"],""),name:b(r,["name","product_name","display_name"],`Product ${i+1}`),kanaName:b(r,["kana_name"],""),shortName:b(r,["short_name"],""),category:b(r,["category_code","category","category_name"],"未分類"),taxCategoryCode:b(r,["tax_code","tax_category_code"],""),isActive:Pe(r,["is_active","active","enabled"],!0),listPrice:q(r,["list_price"],0),purchasePrice:q(r,["purchase_price"],0),salePrice:q(r,["default_sale_price","sale_price"],0),costPrice:q(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:b(r,["unit_name","unit"],"本"),caseQty:r.case_qty!=null?Number(r.case_qty):null,bottleType:b(r,["bottle_type"],""),containerCode:b(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:b(r,["rice_type"],""),season:b(r,["season"],""),agingYears:q(r,["aging_years"],0),productType:b(r,["product_type"],"standard"),baseSakeId:r.base_sake_id?String(r.base_sake_id):null,parentProductId:r.parent_product_id?String(r.parent_product_id):null,baseSakeName:null,parentProductName:null})):ht.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||ht.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:ht.summary.activeCustomerCount,productCount:t.length||ht.summary.productCount,activeProductCount:t.length?s.filter(r=>r.isActive).length:ht.summary.activeProductCount},customers:n,products:s}}return ht}async function Oo(){const[e,t]=await Promise.all([Y("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),Y("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?Ee(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const s=e[0],r=b(s,["status"],"success"),i=s.errors,c=Array.isArray(i)?i.length>0:!!i;return{generatedAt:new Date().toISOString(),lastSyncAt:Ee(s,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:c?"warning":r==="error"?"error":"success",jobName:b(s,["agent_hostname"],"sake-relay"),message:`${q(s,["rows_upserted"],0)}行同期 / ${q(s,["files_updated"],0)}ファイル更新`}}return{...Li,lastDataAt:n}}async function Bo(){const e=await we("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function zo(){const e=[{name:"売上明細 (SHTOR)",table:"sales_document_lines",countFilter:"note=like.*src:diff*",expectMin:2e5},{name:"伝票ヘッダ (SHDEN)",table:"sales_document_headers",expectMin:5e4},{name:"日次売上集計",table:"daily_sales_fact",expectMin:1e5},{name:"商品月別売上",table:"product_monthly_sales",expectMin:1e4},{name:"得意先マスタ",table:"customers",expectMin:500},{name:"商品マスタ",table:"products",expectMin:1e3},{name:"安全在庫",table:"product_safety_stock_params",expectMin:0}],t=[];for(const n of e)try{const s=n.countFilter?`&${n.countFilter}`:"",r=`${$e}/rest/v1/${n.table}?select=id&limit=0${s}`,c=(await fetch(r,{headers:{apikey:ie,Authorization:`Bearer ${ie}`,Prefer:"count=exact"}})).headers.get("content-range")??"*/0",d=parseInt(c.split("/").pop()??"0",10)||0,u=d>=n.expectMin?"ok":d>0?"warn":"error";t.push({name:n.name,table:n.table,count:d,status:u,detail:d>=n.expectMin?"正常稼働":d>0?"データ少":"データなし"})}catch{t.push({name:n.name,table:n.table,count:0,status:"error",detail:"接続エラー"})}return t}async function ya(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];if(e.customerCode.trim()){const r=e.customerCode.trim();n.push(`customer_code.ilike.*${r}*`,`legacy_customer_code.ilike.*${r}*`,`customer_name.ilike.*${r}*`)}e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const s=await Y("sales_document_headers",t);return s.length>0?s.map((r,i)=>({id:b(r,["id"],`invoice-${i}`),documentNo:b(r,["document_no","legacy_document_no"],""),date:Ee(r,["sales_date"],""),customerCode:b(r,["legacy_customer_code","customer_code"],""),customerName:b(r,["customer_name","legacy_customer_code"],""),itemCount:q(r,["line_count"],0),amount:q(r,["total_amount","billed_amount"],0)})):[]}const oa=new Map;async function jo(e){oa.clear();const t=await xe("sales_document_lines",{select:"document_no,line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*date:${e}*`,order:"document_no,line_no"});for(const n of t){const s=b(n,["document_no"],"");if(!s)continue;const r=oa.get(s)??[];r.push({lineNo:q(n,["line_no"],0),productCode:b(n,["legacy_product_code"],""),productName:b(n,["product_name"],""),quantity:q(n,["quantity"],0),unitPrice:q(n,["unit_price"],0),amount:q(n,["amount"],0)}),oa.set(s,r)}}async function Cn(e){const t=oa.get(e);if(t)return t;const s=(await Y("sales_document_lines",{select:"line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*inv:${e} *`,order:"line_no",limit:"100"})).map(r=>({lineNo:q(r,["line_no"],0),productCode:b(r,["legacy_product_code"],""),productName:b(r,["product_name"],""),quantity:q(r,["quantity"],0),unitPrice:q(r,["unit_price"],0),amount:q(r,["amount"],0)}));return oa.set(e,s),s}async function Ra(e){return(await Y("product_materials",{select:"*",product_id:`eq.${e}`,order:"material_type,material_name"})).map(n=>({id:b(n,["id"],""),productId:b(n,["product_id"],""),materialType:b(n,["material_type"],""),materialName:b(n,["material_name"],""),materialCode:b(n,["material_code"],""),supplierCode:b(n,["supplier_code"],""),supplierName:b(n,["supplier_name"],""),unitCost:q(n,["unit_cost"],0),quantityPerProduct:q(n,["quantity_per_product"],1),notes:b(n,["notes"],""),isActive:Pe(n,["is_active"],!0)}))}async function Fo(e){const t={product_id:e.productId,material_type:e.materialType,material_name:e.materialName,material_code:e.materialCode||null,supplier_code:e.supplierCode||null,supplier_name:e.supplierName||null,unit_cost:e.unitCost??0,quantity_per_product:e.quantityPerProduct??1,notes:e.notes||null,is_active:e.isActive??!0};return e.id&&(t.id=e.id),await mt("product_materials",t)!==null}async function Vo(e){try{return(await fetch(`${$e}/rest/v1/product_materials?id=eq.${e}`,{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}})).ok}catch{return!1}}async function Dn(e,t){return await He("products",`id=eq.${e}`,t)!==null}async function es(e){const t=e.trim().toUpperCase();if(!t)return Es("");const[n,s,r]=await Promise.all([Y("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t},customer_name.ilike.*${t}*`,order:"sales_date.desc",limit:"50"}),Y("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),Y("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||s.length>0){const i=n.map((u,h)=>{const v=Ti(u,h);return{id:v.id,date:v.date,documentNo:v.documentNo,amount:v.amount}}),c=s.map((u,h)=>({id:String(u.id??`payment-${h+1}`),date:Ee(u,["payment_date","received_date"],new Date().toISOString()),amount:ue(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),d=r.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:ue(d?.balance_amount),salesTotal:i.reduce((u,h)=>u+h.amount,0),paymentTotal:c.reduce((u,h)=>u+h.amount,0),salesHistory:i,paymentHistory:c}}return Es(t)}async function ts(){const[e,t,n,s]=await Promise.all([Y("mv_monthly_sales",{order:"month.asc"}),Y("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),Y("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),Y("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(r=>({month:b(r,["month"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),volumeMl:q(r,["volume_ml"],0)})),productTotals:n.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),documents:q(r,["documents"],0),volumeMl:q(r,["volume_ml"],0)})),customerTotals:t.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),documents:q(r,["documents"],0),volumeMl:q(r,["volume_ml"],0)})),staffTotals:s.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),documents:q(r,["documents"],0),volumeMl:0}))}:Ci}async function Ii(e,t,n){if(t==="all")return[];const s=n?Yo(t,n):null,i=await we(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:s?.from??null,p_date_to:s?.to??null});return i?i.map(c=>({code:b(c,["code"],""),name:b(c,["name"],""),amount:q(c,["amount"],0),quantity:q(c,["quantity"],0),documents:q(c,["documents"],0),volumeMl:q(c,["volume_ml"],0)})):[]}async function Mi(e,t){if(t==="all")return[];const n=await we("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(s=>s.period_val).filter(Boolean)}function Yo(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,s]=t.split("-").map(Number),r=`${n}-${String(s).padStart(2,"0")}-01`,i=new Date(n,s,0).getDate(),c=`${n}-${String(s).padStart(2,"0")}-${String(i).padStart(2,"0")}`;return{from:r,to:c}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const s=parseInt(n[1]),r=parseInt(n[2]),i=new Date(s,0,4),c=i.getDay()||7,d=new Date(i);d.setDate(i.getDate()-c+1);const u=new Date(d);u.setDate(d.getDate()+(r-1)*7);const h=new Date(u);return h.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:h.toISOString().slice(0,10)}}return null}function Uo(e){return e.map(t=>({staffCode:b(t,["staff_code"],""),staffName:b(t,["staff_name"],""),code:b(t,["code"],""),name:b(t,["name"],""),tag:b(t,["tag"],""),amount:q(t,["amount"],0),quantity:q(t,["quantity"],0),documents:q(t,["documents"],0)}))}async function Ni(e,t){const n=await we("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(s=>({code:b(s,["code"],""),name:b(s,["name"],""),amount:q(s,["amount"],0),quantity:q(s,["quantity"],0),documents:q(s,["documents"],0)})):[]}async function Ri(e,t,n){const s=await we("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?Uo(s):[]}async function Oi(e,t,n){const s=await we("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?Uo(s):[]}async function Bi(e,t){if(e==="all"||!t)return[];const n=await we("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(s=>({month:b(s,["label"],""),amount:q(s,["amount"],0),quantity:q(s,["quantity"],0),volumeMl:q(s,["volume_ml"],0)})):[]}function zi(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function ji(e,t,n){const s=await we("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),tag:b(r,["tag"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),documents:q(r,["documents"],0),volumeMl:q(r,["volume_ml"],0)})):[]}async function Fi(e,t,n){const s=await we("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),tag:b(r,["tag"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),documents:q(r,["documents"],0),volumeMl:q(r,["volume_ml"],0)})):[]}async function Vi(e,t){const n=await we("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(s=>({month:b(s,["month"],""),amount:q(s,["amount"],0),quantity:q(s,["quantity"],0),volumeMl:q(s,["volume_ml"],0)})):[]}async function Yi(e,t){const n=await we("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:b(s,["brew_category"],""),subCategory:b(s,["sub_category"],""),productCount:q(s,["product_count"],0),totalShipmentQty:q(s,["total_shipment_qty"],0),totalShipmentMl:q(s,["total_shipment_ml"],0),monthlyAvgQty:q(s,["monthly_avg_qty"],0),monthlyAvgMl:q(s,["monthly_avg_ml"],0),currentStockL:q(s,["current_stock_l"],0),monthsRemaining:q(s,["months_remaining"],0),costPerL:q(s,["cost_per_l"],0)})):[]}async function Ui(e,t){const n=await we("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({month:b(s,["month"],""),brewCategory:b(s,["brew_category"],""),shipmentMl:q(s,["shipment_ml"],0)})):[]}async function Ji(e,t){const n=await we("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:b(s,["brew_category"],""),subCategory:b(s,["sub_category"],""),productCode:b(s,["product_code"],""),productName:b(s,["product_name"],""),volumeMl:q(s,["volume_ml"],0),annualQty:q(s,["annual_qty"],0),annualMl:q(s,["annual_ml"],0),monthlyAvgQty:q(s,["monthly_avg_qty"],0),monthlyAvgMl:q(s,["monthly_avg_ml"],0)})):[]}async function Hi(e){return(await Y("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:b(n,["id"],""),brewCategory:b(n,["brew_category"],""),fy:q(n,["fy"],e),brewMonth:q(n,["brew_month"],0),durationMonths:q(n,["duration_months"],2),plannedVolumeL:q(n,["planned_volume_l"],0),notes:b(n,["notes"],"")}))}async function Qi(e,t,n){return await we("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(r=>({brew_month:r.brewMonth,duration_months:r.durationMonths,planned_volume_l:r.plannedVolumeL,notes:r.notes??null}))})!==null}async function Ki(e,t,n,s){return await mt("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:s??null,updated_at:new Date().toISOString()})!==null}async function Wi(){const e=await Y("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const s=b(n,["category_name"],""),r=b(n,["production_type_name"],"");!s||!r||(t[s]||(t[s]=[]),t[s].push(r))}return t}async function Gi(e,t){return await we("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function Xi(e,t){return await we("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function Zi(){const e=await Y("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>b(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function el(){const e=await Y("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const s=b(n,["brew_category"],"");s&&(t[s]={brewCategory:s,rawAlcoholPct:q(n,["raw_alcohol_pct"],18),targetAlcoholPct:q(n,["target_alcohol_pct"],15)})}return t}async function tl(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0);return r?(await fetch(`${s}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function al(){const e=await we("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:q(t,["fy"],0),brewCategory:b(t,["brew_category"],""),shipmentL:q(t,["shipment_l"],0),monthsElapsed:q(t,["months_elapsed"],12),annualizedL:q(t,["annualized_l"],0)})):[]}async function nl(){const e=await Y("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const s=b(n,["brew_category"],""),r=q(n,["growth_rate"],NaN);s&&!isNaN(r)&&(t[s]=r)}return t}async function sl(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function ol(){const e=await Y("brewing_rice_params",{}),t={};for(const n of e??[]){const s=b(n,["brew_category"],"");s&&(t[s]={brewCategory:s,polishingRatio:q(n,["polishing_ratio"],.7),ricePerLiterKg:q(n,["rice_per_liter_kg"],.5),kojiRatio:q(n,["koji_ratio"],.3),kojiVariety:b(n,["koji_variety"],"山田錦"),kojiPricePerKg:q(n,["koji_price_per_kg"],600),kakeVariety:b(n,["kake_variety"],"一般米"),kakePricePerKg:q(n,["kake_price_per_kg"],350),alcoholAdditionRatio:q(n,["alcohol_addition_ratio"],0)})}return t}async function rl(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,koji_ratio:t.kojiRatio,koji_variety:t.kojiVariety,koji_price_per_kg:t.kojiPricePerKg,kake_variety:t.kakeVariety,kake_price_per_kg:t.kakePricePerKg,alcohol_addition_ratio:t.alcoholAdditionRatio??0,updated_at:new Date().toISOString()})})).ok:!1}async function il(){const e=await we("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:b(t,["brew_category"],""),monthNum:q(t,["month_num"],0),avgMonthlyL:q(t,["avg_monthly_l"],0)})):[]}async function ll(e){const t=await Y("procurement_decisions",{fy:`eq.${e}`}),n={};for(const s of t??[]){const r=b(s,["brew_category"],""),i=q(s,["decided_brewing_l"],-1);r&&i>=0&&(n[r]=i)}return n}async function cl(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0);return r?(await fetch(`${s}/rest/v1/procurement_decisions`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,fy:t,decided_brewing_l:n,updated_at:new Date().toISOString()})})).ok:!1}async function dl(e){return(await Y("brewing_process_batches",{fy:`eq.${e}`,order:"start_date.asc.nullsfirst"})??[]).map(n=>({id:b(n,["id"],""),brewCategory:b(n,["brew_category"],""),batchCode:b(n,["batch_code"],""),fy:q(n,["fy"],e),plannedVolumeL:q(n,["planned_volume_l"],0),tankNo:b(n,["tank_no"],""),status:b(n,["status"],"planned"),startDate:b(n,["start_date"],""),targetEndDate:b(n,["target_end_date"],""),notes:b(n,["notes"],"")}))}async function pl(e){return e.length===0?[]:(await Y("brewing_process_steps",{batch_id:`in.(${e.join(",")})`,order:"batch_id.asc,step_order.asc"})??[]).map(n=>({id:b(n,["id"],""),batchId:b(n,["batch_id"],""),stepOrder:q(n,["step_order"],0),stepName:b(n,["step_name"],""),plannedStart:b(n,["planned_start"],""),plannedEnd:b(n,["planned_end"],""),actualStart:b(n,["actual_start"],""),actualEnd:b(n,["actual_end"],""),status:b(n,["status"],"未着手"),temperature:n.temperature!=null?q(n,["temperature"],0):null,notes:b(n,["notes"],"")}))}function ul(e,t){const n=new Date(e);let s=0;for(;s<t;)n.setDate(n.getDate()+1),n.getDay()!==0&&s++;return n}function ml(e,t){const n=new Date(e);let s=t-1;for(;s>0;)n.setDate(n.getDate()+1),n.getDay()!==0&&s--;return n.getDay()===0&&n.setDate(n.getDate()+1),n}function Ls(e){return e.getDay()===0&&e.setDate(e.getDate()+1),e}const Oa=[{name:"洗米・浸漬（麹米）",days:1},{name:"蒸米（麹米）",days:1},{name:"製麹",days:2},{name:"洗米・浸漬（酒母）",days:1},{name:"蒸米→酒母仕込",days:1},{name:"酒母育成",days:14},{name:"洗米（添）",days:1},{name:"蒸米→添仕込",days:1},{name:"踊り",days:1},{name:"洗米（仲）",days:1},{name:"蒸米→仲仕込",days:1},{name:"洗米（留）",days:1},{name:"蒸米→留仕込",days:1},{name:"醪管理",days:25},{name:"上槽",days:2},{name:"濾過・火入れ",days:1},{name:"貯蔵",days:30},{name:"瓶詰め",days:1}];async function yl(e,t,n,s,r){const c=n[s],d=c?.ricePerLiterKg??.5,u=c?.kojiRatio??.3,h=c?.polishingRatio??.7,v=c?.alcoholAdditionRatio??0,m=Math.round(t*(1-v)*d*u/h),w=r.filter(k=>k.stepName==="製麹"&&k.plannedStart&&k.plannedEnd);let _=new Date(e);for(let k=0;k<60;k++){const C=new Date(_.getTime()+1728e5),S=new Date(_.getTime()+3*864e5);let A=0;for(const E of w){const B=new Date(E.plannedStart).getTime(),o=new Date(E.plannedEnd).getTime();C.getTime()<=o&&S.getTime()>=B&&(A+=180)}if(A+m<=180)return _.toISOString().slice(0,10);_=new Date(_.getTime()+864e5)}return _.toISOString().slice(0,10)}async function hl(e,t,n,s,r,i,c){let d=r;i&&c&&(d=await yl(r,s,c,e,i));const u=await Ae("brewing_process_batches",{brew_category:e,batch_code:t,fy:n,planned_volume_l:s,start_date:d});if(!u?.id)return null;let h=Ls(new Date(d));for(let v=0;v<Oa.length;v++){h=Ls(h);const m=h.toISOString().slice(0,10),w=ml(h,Oa[v].days),_=w.toISOString().slice(0,10);await Ae("brewing_process_steps",{batch_id:u.id,step_order:v+1,step_name:Oa[v].name,planned_start:m,planned_end:_}),h=ul(w,1)}return await He("brewing_process_batches",u.id,{target_end_date:h.toISOString().slice(0,10)}),u.id}async function fl(e,t){return He("brewing_process_steps",e,t)}async function gl(e,t){return He("brewing_process_batches",e,{...t,updated_at:new Date().toISOString()})}async function vl(){return(await Y("tanks",{order:"tank_no"})??[]).map(t=>({id:b(t,["id"],""),tankNo:b(t,["tank_no"],""),displayName:b(t,["display_name"],""),capacityL:q(t,["capacity_l"],0),tankType:b(t,["tank_type"],""),status:b(t,["status"],"empty"),preferredCategories:Array.isArray(t.preferred_categories)?t.preferred_categories:[],cleanupDays:q(t,["cleanup_days"],1)}))}async function bl(e,t,n,s){return await Ae("tanks",{tank_no:e,display_name:e,capacity_l:t,tank_type:n,preferred_categories:s,status:"empty"})!==null}async function xl(e){const{supabaseDelete:t}=await I(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>ne);return{supabaseDelete:n}},void 0);return t("tanks",e)}function wl(e,t){const n=e.find(i=>i.stepName==="蒸米→添仕込"),s=e.find(i=>i.stepName==="上槽");if(!n?.plannedStart||!s?.plannedEnd)return null;const r=new Date(s.plannedEnd);return r.setDate(r.getDate()+t),{start:n.plannedStart,end:r.toISOString().slice(0,10)}}async function $l(e,t,n,s){const r=new Map(n.map(S=>[S.stepName,S])),i=s??[],c=e.filter(S=>S.status!=="completed"&&S.startDate).sort((S,A)=>S.startDate.localeCompare(A.startDate));if(c.length===0)return;const d=t.deadlineDate||"",u=t.allowSunday&&!!d,h=new Map,v=(S,A)=>{const E=new Date(S);return E.setDate(E.getDate()+A),E.toISOString().slice(0,10)},m=(S,A,E,B)=>S<=B&&A>=E,w=S=>A=>(!S&&A.getDay()===0&&A.setDate(A.getDate()+1),A),_=(S,A,E)=>{const B=new Date(S);let o=A-1;for(;o>0;)B.setDate(B.getDate()+1),(E||B.getDay()!==0)&&o--;return!E&&B.getDay()===0&&B.setDate(B.getDate()+1),B},k=(S,A)=>{const E=new Date(S);return E.setDate(E.getDate()+1),!A&&E.getDay()===0&&E.setDate(E.getDate()+1),E},C=()=>{const S=new Map;for(const A of h.values())for(const E of A){const B=r.get(E.stepName);if(!B)continue;const o=Math.max(Math.round((new Date(E.end).getTime()-new Date(E.start).getTime())/864e5)+1,1);let l=0;for(let y=0;y<o;y++){const f=new Date(E.start);f.setDate(f.getDate()+y),f.getDay()!==0&&l++}if(l===0)continue;const p=B.laborHours/l;for(let y=0;y<o;y++){const f=new Date(E.start);if(f.setDate(f.getDate()+y),f.getDay()===0)continue;const g=new Date(f);g.setDate(g.getDate()+3-(g.getDay()+6)%7);const x=new Date(g.getFullYear(),0,4),$=1+Math.round(((g.getTime()-x.getTime())/864e5-3+(x.getDay()+6)%7)/7),P=`${g.getFullYear()}-W${String($).padStart(2,"0")}`;S.set(P,(S.get(P)??0)+p)}}return S};for(const S of c){let A=S.startDate;for(let l of[!1,...u?[!0]:[]]){A=S.startDate;for(let y=0;y<90;y++){A=w(l)(new Date(A)).toISOString().slice(0,10);const g=[];let x=new Date(A);for(const N of Oa){x=w(l)(x);const R=x.toISOString().slice(0,10),M=_(x,N.days,l),z=M.toISOString().slice(0,10);g.push({stepName:N.name,start:R,end:z}),x=k(M,l)}const $=g.find(N=>N.stepName==="製麹");let P=!1;if($)for(const[N,R]of h){const M=R.find(z=>z.stepName==="製麹");if(M&&m($.start,$.end,M.start,M.end)){P=!0;break}}if(P){A=v(A,1);continue}h.set(S.id,g);const D=C(),T=t.workerCount*t.weeklyHoursLimit;let O=!1;for(const N of D.values())if(N>T*1.1){O=!0;break}if(O){h.delete(S.id),A=v(A,1);continue}if(i.length>0){const N=g.find(M=>M.stepName==="蒸米→添仕込"),R=g.find(M=>M.stepName==="上槽");if(N&&R){const M=N.start,z=new Date(R.end);z.setDate(z.getDate()+1);const V=z.toISOString().slice(0,10),U=i.filter(J=>J.capacityL>=S.plannedVolumeL&&(J.preferredCategories.length===0||J.preferredCategories.includes(S.brewCategory)));let G=!1;for(const J of U){let K=!1;for(const[te,W]of h){if(te===S.id||e.find(Q=>Q.id===te)?.tankNo!==J.tankNo)continue;const H=W.find(Q=>Q.stepName==="蒸米→添仕込"),Z=W.find(Q=>Q.stepName==="上槽");if(H&&Z){const Q=v(Z.end,J.cleanupDays);if(m(M,V,H.start,Q)){K=!0;break}}}if(!K){J.tankNo,G=!0;break}}if(!G){h.delete(S.id),A=v(A,1);continue}}}break}const p=h.get(S.id);if(d&&p){const y=p.find(f=>f.stepName==="蒸米→添仕込");if(y&&y.end<=d)break;if(!l){h.delete(S.id);continue}}else break}const E=h.get(S.id);if(!E)continue;const B=(()=>{if(i.length===0)return S.tankNo;const l=E.find(g=>g.stepName==="蒸米→添仕込"),p=E.find(g=>g.stepName==="上槽");if(!l||!p)return S.tankNo;const y=l.start,f=v(p.end,1);for(const g of i){if(g.capacityL<S.plannedVolumeL||g.preferredCategories.length>0&&!g.preferredCategories.includes(S.brewCategory))continue;let x=!1;for(const[$,P]of h){if($===S.id||e.find(N=>N.id===$)?.tankNo!==g.tankNo)continue;const T=P.find(N=>N.stepName==="蒸米→添仕込"),O=P.find(N=>N.stepName==="上槽");if(T&&O&&m(y,f,T.start,v(O.end,g.cleanupDays))){x=!0;break}}if(!x)return g.tankNo}return S.tankNo})();await He("brewing_process_batches",S.id,{start_date:A,tank_no:B,target_end_date:v(E[E.length-1].end,0),updated_at:new Date().toISOString()});const o=await Y("brewing_process_steps",{batch_id:`eq.${S.id}`,order:"step_order.asc"});if(o)for(const l of o){const p=q(l,["step_order"],0),y=E[p-1];if(y){const f=b(l,["id"],"");await He("brewing_process_steps",f,{planned_start:y.start,planned_end:y.end})}}}}async function _l(){const t=(await Y("brewing_worker_settings",{limit:"1"})??[])[0];return t?{workerCount:q(t,["worker_count"],2),weeklyHoursLimit:q(t,["weekly_hours_limit"],40),dayStartHour:q(t,["day_start_hour"],6),deadlineDate:b(t,["deadline_date"],""),allowSunday:t.allow_sunday===!0}:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1}}async function kl(e){const t=await Y("brewing_worker_settings",{limit:"1"});if(t&&t.length>0){const n=b(t[0],["id"],"");return He("brewing_worker_settings",n,{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday,updated_at:new Date().toISOString()})}return await Ae("brewing_worker_settings",{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday})!==null}async function Sl(){return(await Y("brewing_step_labor",{order:"step_name"})??[]).map(t=>({stepName:b(t,["step_name"],""),laborHours:q(t,["labor_hours"],4),workerCountNeeded:q(t,["worker_count_needed"],1)}))}function Pl(e,t){const n=new Map(t.map(r=>[r.stepName,r])),s=new Map;for(const r of e){if(!r.plannedStart||!r.plannedEnd)continue;const i=n.get(r.stepName);if(!i)continue;const c=new Date(r.plannedStart),d=new Date(r.plannedEnd),u=Math.max(Math.round((d.getTime()-c.getTime())/864e5)+1,1),h=i.laborHours/u;for(let v=new Date(c);v<=d;v=new Date(v.getTime()+864e5)){const m=new Date(v);m.setDate(m.getDate()+3-(m.getDay()+6)%7);const w=new Date(m.getFullYear(),0,4),_=1+Math.round(((m.getTime()-w.getTime())/864e5-3+(w.getDay()+6)%7)/7),k=`${m.getFullYear()}-W${String(_).padStart(2,"0")}`;s.set(k,(s.get(k)??0)+h)}}return s}async function El(e){return(await Y("rice_purchase_commitments",{fy:`eq.${e}`,order:"variety_name.asc"})??[]).map(n=>({id:b(n,["id"],""),varietyName:b(n,["variety_name"],""),committedBales:q(n,["committed_bales"],0),pricePerKg:q(n,["price_per_kg"],0),supplier:b(n,["supplier"],""),deliveryMonth:q(n,["delivery_month"],0)||null,fy:q(n,["fy"],e),notes:b(n,["notes"],"")}))}async function Ll(e){return await Ae("rice_purchase_commitments",{variety_name:e.varietyName,committed_bales:e.committedBales??0,price_per_kg:e.pricePerKg??0,supplier:e.supplier??"",delivery_month:e.deliveryMonth??null,fy:e.fy,notes:e.notes??""})!==null}async function Al(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/rice_purchase_commitments?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function Cl(){return(await Y("rice_varieties",{order:"sort_order.asc,name.asc"})??[]).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),defaultPricePerKg:q(t,["default_price_per_kg"],400),region:b(t,["region"],"")}))}async function Dl(e,t,n=""){return await Ae("rice_varieties",{name:e,default_price_per_kg:t,region:n})!==null}async function ql(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/rice_varieties?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function Tl(e){return(await Y("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:b(n,["id"],""),brewCategory:b(n,["brew_category"],""),label:b(n,["label"],""),volumeL:q(n,["volume_l"],0)}))}async function Il(){return(await Y("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:b(t,["id"],""),brewCategory:b(t,["brew_category"],""),label:b(t,["label"],""),volumeL:q(t,["volume_l"],0)}))}async function Ml(e,t,n){return await Ae("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function Nl(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function Rl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function Ol(){return(await Y("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:b(t,["name"],""),parentCategory:b(t,["parent_category"],"")})).filter(t=>t.name)}async function Bl(e,t){return await Ae("brewing_custom_categories",{name:e,parent_category:t})!==null}async function zl(e){const t=await we("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:b(n,["production_type_name"],""),count:q(n,["product_count"],0)})).filter(n=>n.name):[]}async function jl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Fl(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);if(!s)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function Vl(){const e=await Y("brewing_category_overrides",{}),t={};for(const n of e??[]){const s=b(n,["product_code"],""),r=b(n,["brew_category"],"");s&&r&&(t[s]=r)}return t}async function Yl(e){return(await Y("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>b(n,["product_code"],"")).filter(Boolean)}async function Ul(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);if(!s)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}}),t.length===0)return!0;const r=t.map(c=>({year_month:e,product_code:c}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(r)})).ok}catch{return!1}}const qn={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Jo(e){const t=e.lines.reduce((r,i)=>r+i.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Ae("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,delivery_date:e.deliveryDate||e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,registered_by:e.registeredBy||null,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}async function Jl(){return(await xe("staff",{select:"legacy_staff_code,name,department,is_active",is_active:"eq.true",order:"name.asc"})).map(t=>({code:b(t,["legacy_staff_code"],""),name:b(t,["name"],""),department:b(t,["department"],""),isActive:Pe(t,["is_active"],!0)}))}async function Hl(e,t){const{supabaseInsert:n}=await I(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>ne);return{supabaseInsert:r}},void 0);return await n("staff",{legacy_staff_code:e,name:t,is_active:!0})?{code:e,name:t,department:"",isActive:!0}:null}async function Ql(e=10){const t=new Date;t.setMonth(t.getMonth()-6);const n=t.toISOString().slice(0,10),s=await xe("sales_document_headers",{select:"legacy_customer_code,customer_name",sales_date:`gte.${n}`,order:"sales_date.desc"}),r={};for(const i of s){const c=b(i,["legacy_customer_code"],"");c&&(r[c]||(r[c]={name:b(i,["customer_name"],""),count:0}),r[c].count++)}return Object.entries(r).sort((i,c)=>c[1].count-i[1].count).slice(0,e).map(([i,c])=>({code:i,name:c.name,count:c.count}))}async function Kl(e=10){const t=new Date;t.setMonth(t.getMonth()-6);const n=t.toISOString().slice(0,10);if((await xe("sales_document_headers",{select:"document_no",sales_date:`gte.${n}`})).length===0)return[];const r=await xe("sales_document_lines",{select:"legacy_product_code"}),i={};for(const u of r){const h=b(u,["legacy_product_code"],"");h&&(i[h]=(i[h]||0)+1)}const c=await xe("products",{select:"legacy_product_code,name"}),d={};for(const u of c)d[b(u,["legacy_product_code"],"")]=b(u,["name"],"");return Object.entries(i).sort((u,h)=>h[1]-u[1]).slice(0,e).map(([u,h])=>({code:u,name:d[u]||u,count:h}))}const As={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function as(e){const t=await Y("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],s=ue(n.total_amount);return{documentNo:e,invoiceDate:b(n,["sales_date","document_date"],""),customerCode:b(n,["legacy_customer_code","customer_code"],""),customerName:b(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...As,documentNo:e||As.documentNo}}const Wl={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function ns(e){const t=await Y("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const i=q(r,["sales_amount"],0),c=q(r,["tax_amount"],0);return{customerCode:b(r,["customer_code"],""),customerName:b(r,["customer_name"],""),closingDay:31,salesAmount:i,taxAmount:c,prevBalance:0,paymentAmount:0,billingAmount:i,status:"open"}}),s=n.reduce((r,i)=>r+i.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:s,customers:n}}return{...Wl,targetYearMonth:e}}const Gl={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function Ho(){const[e,t,n]=await Promise.all([Y("mv_monthly_sales",{order:"month.asc"}),Y("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),Y("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return Gl;const s=e.slice(-12).map(u=>b(u,["month"],"")),r=new Map;t.forEach(u=>{const h=b(u,["code"],"");r.has(h)||r.set(h,{name:b(u,["name"],h),monthValues:new Map}),r.get(h).monthValues.set(b(u,["month"],""),q(u,["amount"],0))});const c=Array.from(r.entries()).map(([u,h])=>({code:u,name:h.name,total:s.reduce((v,m)=>v+(h.monthValues.get(m)??0),0),monthValues:h.monthValues})).sort((u,h)=>h.total-u.total).slice(0,10).map(u=>({label:u.name,values:s.map(h=>u.monthValues.get(h)??0)})),d=n.map(u=>({label:b(u,["name"],""),values:s.map(()=>Math.round(q(u,["amount"],0)/s.length))}));return{generatedAt:new Date().toISOString(),months:s,salesByProduct:c,salesByCustomer:d,costSimulation:[]}}async function Xl(){const e=await xe("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const s=b(n,["code"],"");if(!s)return;const r=b(n,["month"],""),i=parseInt(r.slice(5,7))-1;if(i<0||i>11)return;let c=t.get(s);c||(c={name:b(n,["name"],s),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(s,c)),c.qty[i]+=q(n,["quantity"],0),c.amt[i]+=q(n,["amount"],0)}),Array.from(t.entries()).map(([n,s])=>({code:n,name:s.name,monthlyQuantity:s.qty,monthlyAmount:s.amt,totalQuantity:s.qty.reduce((r,i)=>r+i,0),totalAmount:s.amt.reduce((r,i)=>r+i,0)})).filter(n=>n.totalQuantity>0).sort((n,s)=>s.totalAmount-n.totalAmount)}async function Zl(){return(await Y("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:b(t,["product_code"],""),productName:b(t,["product_name"],""),forecastMonth:b(t,["forecast_month"],""),segment:b(t,["segment"],"monthly"),avgMonthly:q(t,["avg_monthly"],0),forecastQuantity:q(t,["forecast_quantity"],0),forecastAmount:q(t,["forecast_amount"],0),safetyStock:q(t,["safety_stock"],0),calculatedAt:Ee(t,["calculated_at"],"")}))}async function ec(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await xe("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(c=>String(c.id)).filter(Boolean);const s=await xe("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(c=>{c.id&&r.set(String(c.id),c)});const i=[];return s.forEach(c=>{const d=String(c.header_id??c.document_header_id??""),u=r.get(d);if(!u)return;const h=u.sales_date??u.document_date??"";!h||h<t||i.push({date:h.slice(0,10),customerName:u.customer_name??"不明",productName:c.product_name??"不明",quantity:ue(c.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),i.sort((c,d)=>c.date.localeCompare(d.date))}async function tc(){const e=new Date().toISOString();return(await Y("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:b(n,["id"],""),message:b(n,["message"],""),level:b(n,["level"],"info"),startsAt:Ee(n,["starts_at"],""),endsAt:n.ends_at?Ee(n,["ends_at"],""):null,dismissible:Pe(n,["dismissible"],!0)}))}async function ac(){const e=await xe("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:b(t,["customer_code"],""),customer_name:b(t,["customer_name"],""),business_type:b(t,["business_type"],""),area_code:b(t,["area_code"],""),phone:b(t,["phone"],""),last_order_date:b(t,["last_order_date"],""),days_since_order:q(t,["days_since_order"],0),amount_12m:q(t,["amount_12m"],0),amount_3m:q(t,["amount_3m"],0),amount_this_month:q(t,["amount_this_month"],0),amount_last_year_same_month:q(t,["amount_last_year_same_month"],0),annual_revenue:q(t,["annual_revenue"],0),is_dormant:Pe(t,["is_dormant"],!1),is_at_risk:Pe(t,["is_at_risk"],!1)})):[]}async function nc(){return(await xe("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:b(t,["customer_code"],""),customer_name:b(t,["customer_name"],""),phone:b(t,["phone"],""),address:b(t,["address"],""),area_code:b(t,["area_code"],""),business_type:b(t,["business_type"],""),priority_score:q(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:b(t,["last_order_date"],""),days_since_order:q(t,["days_since_order"],0),annual_revenue:q(t,["annual_revenue"],0),recommended_action:b(t,["recommended_action"],"")}))}async function sc(){return(await xe("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:b(t,["product_code"],""),product_name:b(t,["product_name"],""),season_type:b(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:q(t,["avg_monthly_qty"],0)}))}async function oc(){return(await xe("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:b(t,["product_code"],""),name:b(t,["product_name"],""),monthlyQuantity:[q(t,["m01"],0),q(t,["m02"],0),q(t,["m03"],0),q(t,["m04"],0),q(t,["m05"],0),q(t,["m06"],0),q(t,["m07"],0),q(t,["m08"],0),q(t,["m09"],0),q(t,["m10"],0),q(t,["m11"],0),q(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:q(t,["total_quantity"],0),totalAmount:q(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Qo(e,t,n){try{return await Ae("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function Ko(e,t){return He("customers",e,t)}async function Wo(e,t){return He("products",e,t)}async function Tn(e,t){const n=e.find(c=>c.code===t);n?.priceGroup;const s=n?.priceGroup||t;let r="";try{const c=await Y("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});c[0]?.memo&&(r=(typeof c[0].memo=="string"?JSON.parse(c[0].memo):c[0].memo)?.price_type??"")}catch{}const i=new Map;if(s){const c=await Y("customer_product_prices",{price_group:`eq.${s}`,select:"legacy_product_code,special_price"});for(const d of c)i.set(d.legacy_product_code,d.special_price)}return{priceType:r,priceGroup:s,individualPrices:i}}function ss(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function rc(){return(await Y("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function ic(){return(await xe("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function lc(){return(await Y("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function Nt(e,t="billing",n="apr"){const s=await we("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t,p_fiscal_type:n});return s?s.map(r=>({code:String(r.legacy_customer_code??""),name:String(r.customer_name??""),address:String(r.address1??""),yearAmount:Number(r.year_amount??0),sharePct:Number(r.share_pct??0),orderDays:Number(r.order_days??0),prevAmount:Number(r.prev_amount??0),growthRate:r.growth_rate!=null?Number(r.growth_rate):null,currentRank:String(r.current_rank??"C"),prevRank:String(r.prev_rank??"")})):[]}function os(e){if(!e)return null;if(/^\d{4}$/.test(e))return{dateFrom:`${e}-01-01`,dateTo:`${e}-12-31`};if(/^\d{4}-\d{2}$/.test(e)){const[t,n]=e.split("-").map(Number),s=new Date(t,n,0).getDate();return{dateFrom:`${e}-01`,dateTo:`${e}-${String(s).padStart(2,"0")}`}}return null}async function Go(e=""){const t=os(e),n=t?we("get_abc_customer_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(k=>k??[]):Y("mv_customer_abc",{order:"amount.desc"}),s=t?t.dateFrom.slice(0,7):(()=>{const k=new Date;return k.setMonth(k.getMonth()-11),`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[i,c]=await Promise.all([n,Y("mv_customer_monthly_sales",{month:`gte.${s}`,order:"month.asc",limit:"10000"})]),d=c.filter(k=>b(k,["month"],"")<=r),u=i.map(k=>({code:b(k,["code"],""),name:b(k,["name"],""),amount:q(k,["amount"],0),documents:q(k,["documents"],0),ratio:q(k,["ratio"],0),cumRatio:q(k,["cum_ratio","cumRatio"],0),abcRank:b(k,["abc_rank","abcRank"],"C")})),h=u.slice(0,10),v=new Set(h.map(k=>k.code)),m=Zo(s,r),w=new Map;d.forEach(k=>{const C=b(k,["code"],"");if(!v.has(C))return;const S=b(k,["month"],"");w.has(C)||w.set(C,new Map),w.get(C).set(S,q(k,["amount"],0))});const _=h.map(k=>({label:k.name,values:m.map(C=>w.get(k.code)?.get(C)??0)}));return{generatedAt:new Date().toISOString(),ranking:u,months:m,monthlyByCustomer:_}}async function Xo(e=""){const t=os(e),n=t?we("get_abc_product_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(C=>C??[]):Y("mv_product_abc",{order:"amount.desc"}),s=t?t.dateFrom.slice(0,7):(()=>{const C=new Date;return C.setMonth(C.getMonth()-11),`${C.getFullYear()}-${String(C.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[i,c]=await Promise.all([n,Y("mv_product_monthly_shipments",{month:`gte.${s}`,order:"month.asc",limit:"10000"})]),d=c.filter(C=>b(C,["month"],"")<=r),h=i.map(C=>({code:b(C,["code"],""),name:b(C,["name"],""),amount:q(C,["amount"],0),quantity:q(C,["quantity"],0),documents:q(C,["documents"],0),ratio:q(C,["ratio"],0),cumRatio:q(C,["cum_ratio","cumRatio"],0),abcRank:b(C,["abc_rank","abcRank"],"C")})),v=h.reduce((C,S)=>C+S.amount,0),m=Zo(s,r),w=new Set(h.filter(C=>C.abcRank==="A").slice(0,10).map(C=>C.code)),_=new Map;d.forEach(C=>{const S=b(C,["code"],"");if(!w.has(S))return;const A=b(C,["month"],"");_.has(S)||_.set(S,new Map),_.get(S).set(A,q(C,["amount"],0))});const k=Array.from(w).map(C=>{const S=_.get(C);return{label:h.find(A=>A.code===C)?.name??C,values:m.map(A=>S?.get(A)??0)}});return{generatedAt:new Date().toISOString(),totalAmount:v,ranking:h,months:m,monthlyByProduct:k.length>0?k:[]}}function Zo(e,t){const n=[],[s,r]=e.split("-").map(Number),[i,c]=t.split("-").map(Number);let d=s,u=r;for(;(d<i||d===i&&u<=c)&&(n.push(`${d}-${String(u).padStart(2,"0")}`),u++,u>12&&(u=1,d++),!(n.length>60)););return n}const er={planned:"計画中",active:"仕込中",done:"完了"};async function tr(){const e=await Y("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),jikomiNo:b(t,["batch_no","legacy_batch_no"],""),productName:b(t,["brand_name"],""),riceType:b(t,["rice_type"],""),plannedKg:q(t,["planned_rice_kg"],0),actualKg:q(t,["actual_rice_kg"],0),startDate:Ee(t,["start_date"],""),expectedDoneDate:Ee(t,["expected_done_date"],""),status:b(t,["status"],"planned"),tankNo:b(t,["tank_no"],""),note:b(t,["remarks"],"")})):[]}async function ar(){return(await Y("tanks",{order:"tank_no.asc"})).map(t=>({id:b(t,["id"],""),tankNo:b(t,["tank_no"],""),displayName:b(t,["display_name"],""),capacity:q(t,["capacity_l"],0),depthMm:q(t,["depth_mm"],0),litersPerMm:q(t,["liters_per_mm"],0),currentVolume:q(t,["current_volume_l"],0),productName:b(t,["current_product_code"],""),jikomiNo:b(t,["current_batch_id"],""),status:b(t,["status"],"empty"),lastUpdated:Ee(t,["last_updated_at"],""),remarks:b(t,["remarks"],"")}))}async function cc(e){return e.id?He("tanks",e.id,{tank_no:e.tankNo,display_name:e.displayName??e.tankNo,capacity_l:e.capacity??0,depth_mm:e.depthMm??0,liters_per_mm:e.litersPerMm??0,remarks:e.remarks??"",last_updated_at:new Date().toISOString()}):await Ae("tanks",{tank_no:e.tankNo,display_name:e.displayName??e.tankNo,capacity_l:e.capacity??0,depth_mm:e.depthMm??0,liters_per_mm:e.litersPerMm??0,status:"empty",remarks:e.remarks??""})!==null}async function dc(e){const{supabaseDelete:t}=await I(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>ne);return{supabaseDelete:n}},void 0);return t("tanks",e)}async function pc(e=200){return(await Y("tank_movements",{order:"movement_date.desc,created_at.desc",limit:String(e)})).map(n=>({id:b(n,["id"],""),movementDate:b(n,["movement_date"],""),fromTankNo:b(n,["from_tank_no"],""),toTankNo:b(n,["to_tank_no"],""),volumeL:q(n,["volume_l"],0),productName:b(n,["product_name"],""),batchCode:b(n,["batch_code"],""),alcoholDegree:n.alcohol_degree!=null?q(n,["alcohol_degree"],0):null,temperature:n.temperature!=null?q(n,["temperature"],0):null,movementType:b(n,["movement_type"],"transfer"),recordedBy:b(n,["recorded_by"],""),notes:b(n,["notes"],"")}))}async function uc(e){return(await Y("tank_movements",{or:`from_tank_no.eq.${e},to_tank_no.eq.${e}`,order:"movement_date.desc,created_at.desc"})).map(n=>({id:b(n,["id"],""),movementDate:b(n,["movement_date"],""),fromTankNo:b(n,["from_tank_no"],""),toTankNo:b(n,["to_tank_no"],""),volumeL:q(n,["volume_l"],0),productName:b(n,["product_name"],""),batchCode:b(n,["batch_code"],""),alcoholDegree:n.alcohol_degree!=null?q(n,["alcohol_degree"],0):null,temperature:n.temperature!=null?q(n,["temperature"],0):null,movementType:b(n,["movement_type"],"transfer"),recordedBy:b(n,["recorded_by"],""),notes:b(n,["notes"],"")}))}async function mc(e){return await Ae("tank_movements",{movement_date:e.movementDate,from_tank_no:e.fromTankNo,to_tank_no:e.toTankNo,volume_l:e.volumeL,product_name:e.productName,batch_code:e.batchCode,alcohol_degree:e.alcoholDegree,temperature:e.temperature,movement_type:e.movementType,recorded_by:e.recordedBy,notes:e.notes})!==null}async function yc(e){const{supabaseDelete:t}=await I(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>ne);return{supabaseDelete:n}},void 0);return t("tank_movements",e)}async function hc(){return(await Y("kentei_records",{order:"kentei_date.desc"})).map(t=>({id:b(t,["id"],""),kenteiNo:b(t,["kentei_no"],""),batchCode:b(t,["batch_code"],""),productName:b(t,["product_name","product_code"],""),kenteiDate:Ee(t,["kentei_date"],""),alcoholDegree:q(t,["alcohol_degree"],0),extractDegree:q(t,["extract_degree"],0),sakaMeterValue:q(t,["sakemeter_value"],0),acidity:q(t,["acidity"],0),aminoAcid:q(t,["amino_acid"],0),riceType:b(t,["rice_type"],""),polishRate:q(t,["polish_rate"],0),productionTypeName:b(t,["production_type_name"],""),volume:q(t,["volume_l"],0),taxCategory:b(t,["tax_category_code"],""),tankNo:b(t,["tank_no"],""),status:b(t,["status"],"pending")}))}async function fc(e){const t={kentei_no:e.kenteiNo,batch_code:e.batchCode,product_name:e.productName,kentei_date:e.kenteiDate,alcohol_degree:e.alcoholDegree,extract_degree:e.extractDegree,sakemeter_value:e.sakaMeterValue,acidity:e.acidity,amino_acid:e.aminoAcid,rice_type:e.riceType,polish_rate:e.polishRate,production_type_name:e.productionTypeName,volume_l:e.volume,tax_category_code:e.taxCategory};return e.id?He("kentei_records",e.id,t):await Ae("kentei_records",{...t,status:"pending"})!==null}async function gc(){return(await Y("genzaishu",{order:"registered_at.desc"})).map(t=>({id:b(t,["id"],""),batchCode:b(t,["batch_code"],""),productName:b(t,["product_name"],""),kenteiDate:b(t,["kentei_date"],""),tankNo:b(t,["tank_no"],""),volumeL:q(t,["volume_l"],0),alcoholDegree:t.alcohol_degree!=null?q(t,["alcohol_degree"],0):null,sakeMeterValue:t.sake_meter_value!=null?q(t,["sake_meter_value"],0):null,acidity:t.acidity!=null?q(t,["acidity"],0):null,aminoAcid:t.amino_acid!=null?q(t,["amino_acid"],0):null,riceType:b(t,["rice_type"],""),polishRate:t.polish_rate!=null?q(t,["polish_rate"],0):null,productionTypeName:b(t,["production_type_name"],""),genshuCategory:b(t,["genshu_category"],""),productionDate:b(t,["production_date"],""),rawAlcoholL:q(t,["raw_alcohol_l"],0),blendingWaterL:q(t,["blending_water_l"],0),producedVolumeL:q(t,["produced_volume_l"],0),pureAlcoholL:q(t,["pure_alcohol_l"],0),convertedVolumeL:q(t,["converted_volume_l"],0),kasuKg:q(t,["kasu_kg"],0),kasuRatio:q(t,["kasu_ratio"],0),notes:b(t,["notes"],"")}))}async function vc(e){return await mt("genzaishu",{batch_code:e.batchCode,product_name:e.productName,kentei_date:e.kenteiDate,tank_no:e.tankNo,volume_l:e.volumeL,alcohol_degree:e.alcoholDegree,sake_meter_value:e.sakeMeterValue,acidity:e.acidity,amino_acid:e.aminoAcid,rice_type:e.riceType,polish_rate:e.polishRate,production_type_name:e.productionTypeName,genshu_category:e.genshuCategory,production_date:e.productionDate||null,raw_alcohol_l:e.rawAlcoholL,blending_water_l:e.blendingWaterL,produced_volume_l:e.producedVolumeL,pure_alcohol_l:e.pureAlcoholL,converted_volume_l:e.convertedVolumeL,kasu_kg:e.kasuKg,kasu_ratio:e.kasuRatio,notes:e.notes})!==null}async function bc(){return(await Y("tsumekuchi_records",{order:"tsumekuchi_date.desc,created_at.desc"})).map(t=>({id:b(t,["id"],""),tsumekuchiDate:b(t,["tsumekuchi_date"],""),sourceTankNo:b(t,["source_tank_no"],""),genshuBatchCode:b(t,["genshu_batch_code"],""),genshuName:b(t,["genshu_name"],""),targetProductCode:b(t,["target_product_code"],""),targetProductName:b(t,["target_product_name"],""),genshuVolumeBeforeL:q(t,["genshu_volume_before_l"],0),zanshuReceiveL:q(t,["zanshu_receive_l"],0),linkedTankNo:b(t,["linked_tank_no"],""),volumeBeforeTsumekuchiL:q(t,["volume_before_tsumekuchi_l"],0),tsumekuchiSuccessQty:q(t,["tsumekuchi_success_qty"],0),tsumekuchiSuccessL:q(t,["tsumekuchi_success_l"],0),depthAfterMm:q(t,["depth_after_mm"],0),volumeAfterL:q(t,["volume_after_l"],0),tsumekuchiRemainingL:q(t,["tsumekuchi_remaining_l"],0),breakageL:q(t,["breakage_l"],0),lossL:q(t,["loss_l"],0),productVolumeMl:q(t,["product_volume_ml"],720),notes:b(t,["notes"],""),recordedBy:b(t,["recorded_by"],"")}))}async function xc(e){return await Ae("tsumekuchi_records",{tsumekuchi_date:e.tsumekuchiDate,source_tank_no:e.sourceTankNo,genshu_batch_code:e.genshuBatchCode,genshu_name:e.genshuName,target_product_code:e.targetProductCode,target_product_name:e.targetProductName,genshu_volume_before_l:e.genshuVolumeBeforeL,zanshu_receive_l:e.zanshuReceiveL,linked_tank_no:e.linkedTankNo,volume_before_tsumekuchi_l:e.volumeBeforeTsumekuchiL,tsumekuchi_success_qty:e.tsumekuchiSuccessQty,tsumekuchi_success_l:e.tsumekuchiSuccessL,depth_after_mm:e.depthAfterMm,volume_after_l:e.volumeAfterL,tsumekuchi_remaining_l:e.tsumekuchiRemainingL,breakage_l:e.breakageL,loss_l:e.lossL,product_volume_ml:e.productVolumeMl,notes:e.notes,recorded_by:e.recordedBy})!==null}async function wc(e){const{supabaseDelete:t}=await I(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>ne);return{supabaseDelete:n}},void 0);return t("tsumekuchi_records",e)}async function nr(){const e=await Y("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),code:b(t,["material_code","legacy_material_code"],""),name:b(t,["name"],""),unit:b(t,["unit"],""),currentStock:q(t,["current_stock"],0),minimumStock:q(t,["minimum_stock"],0),unitCost:q(t,["unit_cost"],0),lastUpdated:Ee(t,["updated_at"],"")})):[]}async function sr(){const e=await Y("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),documentNo:b(t,["document_no","legacy_document_no"],""),purchaseDate:Ee(t,["purchase_date"],""),supplierCode:b(t,["supplier_code","legacy_supplier_code"],""),supplierName:b(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:q(t,["total_amount"],0),status:b(t,["payment_status"],"pending")})):[]}async function or(){const e=await Y("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:b(t,["supplier_code","legacy_supplier_code"],""),supplierName:b(t,["legacy_supplier_code"],""),totalPurchase:q(t,["total_purchase"],0),paidAmount:q(t,["paid_amount"],0),balance:q(t,["balance"],0),nextPaymentDate:Ee(t,["next_payment_date"],""),status:b(t,["status"],"unpaid")})):[]}async function rr(){const e=await Y("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),billNo:b(t,["bill_no"],""),supplierName:b(t,["counterparty_name"],""),amount:q(t,["amount"],0),issueDate:Ee(t,["issue_date"],""),dueDate:Ee(t,["due_date"],""),status:b(t,["status"],"holding")})):[]}async function ir(){const e=await Y("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:b(t,["material_code","legacy_material_code"],""),name:b(t,["name"],""),unit:b(t,["unit"],""),currentStock:q(t,["current_stock"],0),minimumStock:q(t,["minimum_stock"],0),lastPurchaseDate:Ee(t,["last_purchase_date"],""),unitCost:q(t,["unit_cost"],0)})):[]}const lr=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],In={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},$c={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function rs(e,t){const n=await Y("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const s=n[0],r=b(s,["id"],""),[i,c]=await Promise.all([Y("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),Y("tax_deductions",{declaration_id:`eq.${r}`})]),d=i.map(h=>({taxCategory:b(h,["tax_category_code"],""),taxCategoryName:b(h,["tax_category_name"],""),alcoholDegree:q(h,["alcohol_degree"],0),volume:q(h,["taxable_volume"],0),taxRate:q(h,["tax_rate"],0),taxAmount:q(h,["tax_amount"],0),productionVolume:q(h,["production_volume"],0),previousBalance:q(h,["previous_balance"],0),currentAdjustment:q(h,["current_adjustment"],0),exportDeduction:q(h,["export_deduction"],0),sampleDeduction:q(h,["sample_deduction"],0),taxableVolume:q(h,["taxable_volume"],0)})),u=c.map(h=>({type:b(h,["deduction_type"],"sample"),categoryCode:b(h,["tax_category_code"],""),volume:q(h,["volume"],0),reason:b(h,["reason"],""),documentNo:b(h,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:b(s,["company_name"],""),companyNo:b(s,["company_no"],""),companyAddress:b(s,["company_address"],""),companyRepresentative:b(s,["company_representative"],""),taxOffice:b(s,["tax_office"],""),rows:d,deductions:u,totalVolume:q(s,["total_taxable_volume"],0),totalTax:q(s,["total_tax_amount"],0),status:b(s,["status"],"draft"),submittedAt:b(s,["submitted_at"],"")||null}}return{...$c,targetYear:e,targetMonth:t}}function Qe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function cr(e){const t=e.rows.map(s=>`    <Category>
      <Code>${Qe(s.taxCategory)}</Code>
      <Name>${Qe(s.taxCategoryName)}</Name>
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
`),n=e.deductions.map(s=>`    <Deduction type="${Qe(s.type)}">
      <CategoryCode>${Qe(s.categoryCode)}</CategoryCode>
      <Volume>${s.volume}</Volume>
      <Reason>${Qe(s.reason)}</Reason>${s.documentNo?`
      <DocumentNo>${Qe(s.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${Qe(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${Qe(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${Qe(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${Qe(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${Qe(e.taxOffice)}</TaxOffice>
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
`}function _c(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function kc(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),s=e.rows.map(i=>[i.taxCategory,i.taxCategoryName,i.alcoholDegree,i.productionVolume,i.previousBalance,i.currentAdjustment,i.exportDeduction,i.sampleDeduction,i.taxableVolume,i.taxRate,i.taxAmount].map(_c).join(",")),r=`,合計,,${e.rows.reduce((i,c)=>i+c.productionVolume,0)},,,${e.rows.reduce((i,c)=>i+c.exportDeduction,0)},${e.rows.reduce((i,c)=>i+c.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...s,r].join(`
`)+`
`}function Sc(e){const t=e.rows.map(r=>{const i=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),c=Math.round(i*r.taxRate);return{...r,taxableVolume:i,volume:i,taxAmount:c}}),n=t.reduce((r,i)=>r+i.taxableVolume,0),s=t.reduce((r,i)=>r+i.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:s}}async function Pc(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>ne);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:cr(e),submitted_at:e.submittedAt})}async function is(e,t){return(await we("get_sake_tax_by_month",{p_year:e,p_month:t})).map(s=>({sakeType:s.sake_type,alcDegree:s.alc_degree??null,volumeSaleL:Number(s.volume_sale_l)||0,volumeReturnL:Number(s.volume_return_l)||0,volumeExportL:Number(s.volume_export_l)||0,volumeNetL:Number(s.volume_net_l)||0,taxRatePerKl:s.tax_rate_per_kl!==null?Number(s.tax_rate_per_kl):null,taxAmount:Number(s.tax_amount)||0}))}async function ls(e){const t=await Y("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:b(n,["id"],""),saleDate:b(n,["sale_date"],e),saleTime:b(n,["sale_time"],""),productCode:b(n,["product_code"],""),productName:b(n,["product_name"],""),quantity:q(n,["quantity"],0),unitPrice:q(n,["unit_price"],0),amount:q(n,["amount"],0),paymentMethod:b(n,["payment_method"],"cash")})):[]}async function dr(){const e=await Y("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:b(t,["id"],""),orderNo:b(t,["order_no"],""),orderDate:Ee(t,["order_date"],""),customerName:b(t,["customer_name"],""),postalCode:b(t,["postal_code"],""),address:b(t,["shipping_address"],""),items:[],totalAmount:q(t,["total_amount"],0),status:b(t,["status"],"new"),shippingDate:Ee(t,["shipping_date"],"")})):[]}async function Ec(e,t,n,s,r,i){const c=await Ae("store_orders",{order_no:e,order_date:new Date().toISOString().slice(0,10),channel:"mobile",customer_name:t,legacy_customer_code:n||null,total_amount:s,status:"new",remarks:r||null});if(!c)return null;const d=c.id;for(let u=0;u<i.length;u++){const h=i[u];await Ae("store_order_lines",{order_id:d,line_no:u+1,product_code:h.productCode,product_name:h.productName,quantity:h.quantity,unit_price:h.unitPrice,amount:h.amount})}return d}async function Ba(e){const t=await Ae("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function pr(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Lc(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await Y("print_layouts",t)).map(s=>({id:b(s,["id"],""),name:b(s,["name"],""),templateKey:b(s,["template_key"],""),positions:s.positions??{},isDefault:Pe(s,["is_default"],!1),note:b(s,["note"],""),updatedAt:b(s,["updated_at"],"")}))}async function Ac(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>ne);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},s=await t("print_layouts",n);return s?{id:b(s,["id"],e.id),name:b(s,["name"],e.name),templateKey:b(s,["template_key"],e.templateKey),positions:s.positions??e.positions,isDefault:Pe(s,["is_default"],!1),note:b(s,["note"],""),updatedAt:b(s,["updated_at"],"")}:null}async function Cc(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Dc(){return(await Y("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),email:b(t,["email"],""),displayName:b(t,["display_name"],""),signature:b(t,["signature"],""),replyTo:b(t,["reply_to"],""),isDefault:Pe(t,["is_default"],!1),isVerified:Pe(t,["is_verified"],!1),note:b(t,["note"],"")}))}async function qc(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:b(n,["id"],e.id),name:b(n,["name"],e.name),email:b(n,["email"],e.email),displayName:b(n,["display_name"],""),signature:b(n,["signature"],""),replyTo:b(n,["reply_to"],""),isDefault:Pe(n,["is_default"],!1),isVerified:Pe(n,["is_verified"],!1)}:null}async function Tc(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const cs={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},ds={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function Ic(e){const t=`${e}-01T00:00:00Z`,[n,s]=e.split("-").map(d=>parseInt(d,10)),r=new Date(n,s,0).getDate(),i=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await Y("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${i})`,order:"starts_at.asc"})).map(d=>({id:b(d,["id"],""),title:b(d,["title"],""),description:b(d,["description"],""),category:b(d,["category"],"general")||"general",startsAt:b(d,["starts_at"],new Date().toISOString()),endsAt:b(d,["ends_at"],""),isAllDay:Pe(d,["is_all_day"],!1),location:b(d,["location"],""),attendees:d.attendees??[],relatedCustomerCode:b(d,["related_customer_code"],""),relatedOrderId:b(d,["related_order_id"],""),color:b(d,["color"],""),googleEventId:b(d,["google_event_id"],"")}))}async function Mc(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??ds[e.category],updated_at:new Date().toISOString()})?e:null}async function Nc(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ur(){return(await Y("integration_settings",{order:"name.asc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),provider:b(t,["provider"],""),config:t.config??{},isEnabled:Pe(t,["is_enabled"],!1),lastSyncAt:b(t,["last_sync_at"],""),lastStatus:b(t,["last_status"],"")}))}async function va(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function Rc(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const s=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(s,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const i=await r.json(),{supabaseInsert:c}=await I(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>ne);return{supabaseInsert:u}},void 0);let d=0;for(const u of i.orders){const h=`shopify_${u.id}`;await c("shopify_orders",{id:h,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),d++}return await va({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得成功`}),{count:d}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function Oc(){return(await Y("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:b(t,["id"],""),shopifyOrderId:b(t,["shopify_order_id"],""),orderNumber:b(t,["order_number"],""),orderDate:b(t,["order_date"],""),customerName:b(t,["customer_name"],""),customerEmail:b(t,["customer_email"],""),totalAmount:ue(t.total_amount),financialStatus:b(t,["financial_status"],""),fulfillmentStatus:b(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function Bc(e){const t=e.config.refresh_token,n=e.config.client_id,s=e.config.client_secret;if(!t||!n||!s)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:s})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const c=(await r.json()).access_token;return await va({...e,config:{...e.config,oauth_token:c}}),e.config.oauth_token=c,{token:c}}async function zc(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const s=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),i=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${s}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let c=await fetch(i,{headers:{Authorization:`Bearer ${t}`}});if(c.status===401){const v=await Bc(e);if(v.error)return{count:0,error:v.error};t=v.token,c=await fetch(i,{headers:{Authorization:`Bearer ${t}`}})}if(!c.ok)return{count:0,error:`HTTP ${c.status}`};const d=await c.json(),{supabaseInsert:u}=await I(async()=>{const{supabaseInsert:v}=await Promise.resolve().then(()=>ne);return{supabaseInsert:v}},void 0);let h=0;for(const v of d.items){const m=`gcal_${v.id}`,w=v.start?.dateTime??v.start?.date??"",_=v.end?.dateTime??v.end?.date??"";await u("calendar_events",{id:m,title:String(v.summary??"(無題)"),description:String(v.description??""),category:"general",starts_at:String(w),ends_at:String(_),location:String(v.location??""),google_event_id:String(v.id??""),updated_at:new Date().toISOString()}),h++}return await va({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${h}件取得`}),{count:h}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function jc(){return(await Y("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:b(t,["id"],""),receivedAt:b(t,["received_at"],""),senderPhone:b(t,["sender_phone"],""),senderName:b(t,["sender_name"],""),imageUrl:b(t,["image_url"],""),ocrStatus:b(t,["ocr_status"],"pending")||"pending",ocrText:b(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:b(t,["linked_invoice_id"],"")}))}async function Fc(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const s=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(s){return{text:"",error:s instanceof Error?s.message:String(s)}}}async function Vc(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Ja={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},Ha={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function Yc(){return(await Y("user_profiles",{order:"display_name.asc"})).map(t=>({id:b(t,["id"],""),email:b(t,["email"],""),displayName:b(t,["display_name"],""),staffCode:b(t,["staff_code"],""),department:b(t,["department"],"all")||"all",role:b(t,["role"],"staff")||"staff",defaultMailSenderId:b(t,["default_mail_sender_id"],""),phone:b(t,["phone"],""),avatarUrl:b(t,["avatar_url"],""),isActive:Pe(t,["is_active"],!0),lastSignInAt:b(t,["last_sign_in_at"],""),createdAt:b(t,["created_at"],"")}))}async function Uc(e){if(!e)return null;const t=await Y("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:b(n,["id"],""),email:b(n,["email"],""),displayName:b(n,["display_name"],""),staffCode:b(n,["staff_code"],""),department:b(n,["department"],"all")||"all",role:b(n,["role"],"staff")||"staff",defaultMailSenderId:b(n,["default_mail_sender_id"],""),phone:b(n,["phone"],""),avatarUrl:b(n,["avatar_url"],""),isActive:Pe(n,["is_active"],!0),lastSignInAt:b(n,["last_sign_in_at"],"")}}async function Jc(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function Hc(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Qc(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>ne);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function Kc(e=100){return(await Y("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:b(n,["id"],""),action:b(n,["action"],""),entityType:b(n,["entity_type"],""),entityId:b(n,["entity_id"],""),userEmail:b(n,["user_email"],""),changes:n.changes??{},createdAt:b(n,["created_at"],"")}))}const Qa={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function mr(){return(await Y("slack_notifications",{order:"event_type.asc"})).map(t=>({id:b(t,["id"],""),eventType:b(t,["event_type"],"new_order"),enabled:Pe(t,["enabled"],!0),channel:b(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:b(t,["last_triggered_at"],"")}))}async function Wc(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function Gc(e=50){return(await Y("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:b(n,["id"],""),eventType:b(n,["event_type"],""),channel:b(n,["channel"],""),message:b(n,["message"],""),status:b(n,["status"],"sent"),error:b(n,["error"],""),sentAt:b(n,["sent_at"],"")}))}async function Xc(e,t,n){const r=(await ur()).find(h=>h.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const i=r.config.webhook_url;if(!i)return{ok:!1,error:"Webhook URL未設定"};const d=(await mr()).find(h=>h.eventType===e&&h.enabled);if(!d)return{ok:!1,error:"通知ルールが無効"};const u=n??d.channel??r.config.default_channel??"#general";try{const h=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${Qa[e]} ${t}`,channel:u})}),v=h.ok,{supabaseInsert:m}=await I(async()=>{const{supabaseInsert:w}=await Promise.resolve().then(()=>ne);return{supabaseInsert:w}},void 0);return await m("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:v?"sent":"failed",error:v?null:`HTTP ${h.status}`}),v?{ok:!0}:{ok:!1,error:`HTTP ${h.status}`}}catch(h){return{ok:!1,error:h instanceof Error?h.message:String(h)}}}const tn={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},ps={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function Zc(){return(await Y("prospects",{order:"updated_at.desc"})).map(t=>({id:b(t,["id"],""),companyName:b(t,["company_name"],""),contactName:b(t,["contact_name"],""),email:b(t,["email"],""),phone:b(t,["phone"],""),address:b(t,["address"],""),website:b(t,["website"],""),businessType:b(t,["business_type"],""),stage:b(t,["stage"],"cold"),source:b(t,["source"],""),expectedAmount:ue(t.expected_amount),probability:ue(t.probability),assignedStaffCode:b(t,["assigned_staff_code"],""),nextActionDate:b(t,["next_action_date"],""),nextAction:b(t,["next_action"],""),note:b(t,["note"],""),lastContactAt:b(t,["last_contact_at"],""),wonAt:b(t,["won_at"],""),lostAt:b(t,["lost_at"],""),lostReason:b(t,["lost_reason"],""),convertedCustomerCode:b(t,["converted_customer_code"],""),createdAt:b(t,["created_at"],"")}))}async function yr(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0),n=await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()});return n?{...e,id:b(n,["id"],e.id)}:null}async function ed(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);try{const s=new URL("/rest/v1/prospects",t);return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function td(e){return(await Y("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:b(n,["id"],""),prospectId:b(n,["prospect_id"],""),activityType:b(n,["activity_type"],"call"),title:b(n,["title"],""),description:b(n,["description"],""),activityDate:b(n,["activity_date"],""),result:b(n,["result"],""),staffCode:b(n,["staff_code"],"")}))}async function ad(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const hr=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function nd(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function sd(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function od(){return(await xe("v_customer_map")).map(t=>({customerCode:b(t,["customer_code"],""),name:b(t,["name"],""),phone:b(t,["phone"],""),areaCode:b(t,["area_code"],""),businessType:b(t,["business_type"],""),businessTypeName:b(t,["business_type_name"],""),address1:b(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:Pe(t,["is_at_risk"],!1),isDormant:Pe(t,["is_dormant"],!1),amount12m:q(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}async function fr(){return(await xe("customers",{select:"id,legacy_customer_code,name,address1",is_active:"eq.true",lat:"is.null",address1:"not.is.null",order:"name.asc"})).map(t=>({id:b(t,["id"],""),customerCode:b(t,["legacy_customer_code"],""),name:b(t,["name"],""),address1:b(t,["address1"],"")}))}async function rd(e){try{const t=`https://nominatim.openstreetmap.org/search?format=json&countrycodes=jp&limit=1&q=${encodeURIComponent(e)}`,n=await fetch(t,{headers:{"User-Agent":"sake-system-crm/1.0"}});if(!n.ok)return null;const s=await n.json();return s.length===0?null:{lat:parseFloat(s[0].lat),lng:parseFloat(s[0].lon)}}catch{return null}}async function id(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0),s=await fr();let r=0,i=0;for(let c=0;c<s.length;c++){const d=s[c];e(c,s.length,d.name);const u=await rd(d.address1);if(u)try{const h=new URL(`/rest/v1/customers?id=eq.${d.id}`,t);await fetch(h.toString(),{method:"PATCH",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({lat:u.lat,lng:u.lng})}),r++}catch{i++}else i++;c<s.length-1&&await new Promise(h=>setTimeout(h,1100))}return e(s.length,s.length,"完了"),{success:r,failed:i}}const an=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function ld(){return(await xe("customer_churn_notes")).map(t=>({customerCode:b(t,["customer_code"],""),reason:b(t,["reason"],""),memo:b(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:b(t,["updated_at"],"")}))}async function cd(e){const{supabaseUpsert:t}=await I(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>ne);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function dd(){return(await Y("delivery_locations",{order:"name.asc"})).map(t=>({id:b(t,["id"],""),customerCode:b(t,["customer_code"],""),name:b(t,["name"],""),postalCode:b(t,["postal_code"],""),address:b(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:b(t,["contact_name"],""),phone:b(t,["phone"],""),deliveryNote:b(t,["delivery_note"],""),isActive:Pe(t,["is_active"],!0)}))}async function pd(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function ud(e=50){return(await Y("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:b(n,["id"],""),callDirection:b(n,["call_direction"],"inbound"),fromNumber:b(n,["from_number"],""),toNumber:b(n,["to_number"],""),matchedCustomerCode:b(n,["matched_customer_code"],""),matchedProspectId:b(n,["matched_prospect_id"],""),durationSeconds:ue(n.duration_seconds),callStatus:b(n,["call_status"],"answered"),recordingUrl:b(n,["recording_url"],""),transcript:b(n,["transcript"],""),ivryCallId:b(n,["ivry_call_id"],""),startedAt:b(n,["started_at"],""),endedAt:b(n,["ended_at"],""),notes:b(n,["notes"],"")}))}async function gr(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function md(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const s=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(s,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const c=(await r.json()).calls??[];let d=0;for(const u of c)await gr({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),d++;return await va({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得`}),{count:d}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function yd(e,t){const n=e.config.api_key,s=e.config.team_id;if(!n||!s)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const i of t){if(!i.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${s}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:i.name,phone_number:i.phone,external_id:i.customerCode??"",note:i.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function hd(){return(await Y("lead_lists",{order:"created_at.desc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),query:b(t,["query"],""),area:b(t,["area"],""),businessType:b(t,["business_type"],""),totalCount:ue(t.total_count),source:b(t,["source"],"manual"),createdAt:b(t,["created_at"],"")}))}async function fd(e){return(await Y("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:b(n,["id"],""),listId:b(n,["list_id"],""),companyName:b(n,["company_name"],""),address:b(n,["address"],""),phone:b(n,["phone"],""),website:b(n,["website"],""),email:b(n,["email"],""),businessType:b(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:ue(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:b(n,["place_id"],""),status:b(n,["status"],"new"),convertedProspectId:b(n,["converted_prospect_id"],""),note:b(n,["note"],"")}))}async function gd(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function vr(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function vd(e,t,n){const s=e.config.api_key;if(!s)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),i=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${s}`;try{const c=await fetch(i);if(!c.ok)return{results:[],error:`HTTP ${c.status}`};const d=await c.json();return d.status!=="OK"&&d.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${d.status}`}:{results:d.results.map(h=>{const v=h.geometry?.location;return{id:`place_${h.place_id}`,listId:"",companyName:String(h.name??""),address:String(h.formatted_address??""),rating:h.rating?Number(h.rating):void 0,reviewCount:h.user_ratings_total?Number(h.user_ratings_total):void 0,lat:v?.lat,lng:v?.lng,placeId:String(h.place_id??""),status:"new"}})}}catch(c){return{results:[],error:c instanceof Error?c.message:String(c)}}}async function bd(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await yr(t);return n&&await vr({...e,status:"imported",convertedProspectId:t.id}),n}async function xd(){return(await Y("workflow_orders",{order:"order_date.desc"})).map(t=>({id:b(t,["id"],""),orderNo:b(t,["order_no"],""),customerName:b(t,["customer_name"],""),customerCode:b(t,["customer_code"],""),orderDate:b(t,["order_date"],""),deliveryDate:b(t,["delivery_date"],""),stage:b(t,["stage"],"new"),totalAmount:ue(t.total_amount),itemCount:ue(t.item_count),priority:b(t,["priority"],"normal"),staffName:b(t,["staff_name"],""),notes:b(t,["notes"],"")}))}async function wd(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function $d(){return(await Y("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),email:b(t,["email"],""),phone:b(t,["phone"],""),visitDate:b(t,["visit_date"],""),partySize:ue(t.party_size)||1,language:b(t,["language"],"ja"),purpose:b(t,["purpose"],""),message:b(t,["message"],""),status:b(t,["status"],"new"),repliedAt:b(t,["replied_at"],""),confirmedTime:b(t,["confirmed_time"],""),createdAt:b(t,["created_at"],new Date().toISOString())}))}async function _d(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>ne);return{supabaseInsert:s}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const kd=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function br(){return(await Promise.all(kd.map(async t=>{const[n,s]=await Promise.all([Wn(t.table),Y(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:s[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function za(e,t,n=100){const s=(t-1)*n,[r,i]=await Promise.all([Y(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(s)}),Wn(e)]);return{records:r,total:i}}async function ja(e){const t=await Y("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const s=JSON.parse(n);return String(s.price_group??"")}catch{return""}return""}async function Mn(e,t){if(e){const s=await Y("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(s.length>0&&s[0].special_price)return ue(s[0].special_price)}const n=await Y("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?ue(n[0].default_sale_price):0}const Sd=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],Pd=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],Ed={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function Ld(){const e=new Date,t=[];for(let u=11;u>=0;u--){const h=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`)}const n=Sd,s={},r={};for(const u of n){s[u.code]={};for(const h of t){const v=parseInt(h.split("-")[1])-1,m=Ed[u.code]??100,w=Math.round(m*Pd[v]*(.85+Math.random()*.3));s[u.code][h]=w,r[h]=(r[h]??0)+w}}const i={},c={},d={};for(const u of n){const h=t.map(w=>s[u.code][w]??0),v=h.reduce((w,_)=>w+_,0)/h.length,m=h.reduce((w,_)=>w+(_-v)**2,0)/h.length;i[u.code]=h.reduce((w,_)=>w+_,0),c[u.code]=v,d[u.code]=Math.sqrt(m)}return{months:t,products:n,matrix:s,totals:r,productTotals:i,productAvg:c,productStdDev:d}}async function Ad(e=36){const t=(()=>{const w=new Date;return w.setMonth(w.getMonth()-e),`${w.getFullYear()}-${String(w.getMonth()+1).padStart(2,"0")}`})();let n=[];try{n=await xe("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"})}catch(w){console.warn("fetchDemandAnalysis: query failed, using empty",w)}if(n.length===0)return Ld();const s=new Set,r=new Map,i={},c={};for(const w of n){const _=b(w,["year_month"],""),k=b(w,["product_code"],""),C=b(w,["product_name"],k),S=q(w,["quantity"],0);!_||!k||(s.add(_),r.set(k,C),i[k]||(i[k]={}),i[k][_]=S,c[_]=(c[_]??0)+S)}const d=[...s].sort(),u=[...r.entries()].map(([w,_])=>({code:w,name:_})),h={},v={},m={};for(const w of u){const _=d.map(S=>i[w.code]?.[S]??0),k=_.reduce((S,A)=>S+A,0)/(_.length||1),C=_.reduce((S,A)=>S+(A-k)**2,0)/(_.length||1);h[w.code]=_.reduce((S,A)=>S+A,0),v[w.code]=k,m[w.code]=Math.sqrt(C)}return{months:d,products:u,matrix:i,totals:c,productTotals:h,productAvg:v,productStdDev:m}}async function Cd(){let e=[];try{e=await Y("product_safety_stock_params",{order:"product_code.asc"})}catch(t){return console.warn("fetchSafetyStockParams failed:",t),[]}return e.map(t=>({productCode:b(t,["product_code"],""),productName:b(t,["product_name"],""),unit:b(t,["unit"],"本"),avgMonthlyDemand:q(t,["avg_monthly_demand"],0),demandStdDev:q(t,["demand_std_dev"],0),leadTimeDays:q(t,["lead_time_days"],30),serviceLevel:q(t,["service_level"],.95),safetyStockQty:q(t,["safety_stock_qty"],0),reorderPoint:q(t,["reorder_point"],0),memo:b(t,["memo"],""),productionType:b(t,["production_type"],"monthly")}))}async function xr(e){return(await Y("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:b(n,["id"],""),yearMonth:b(n,["year_month"],e),productCode:b(n,["product_code"],""),productName:b(n,["product_name"],""),demandForecast:q(n,["demand_forecast"],0),safetyStockTarget:q(n,["safety_stock_target"],0),openingStock:q(n,["opening_stock"],0),requiredProduction:q(n,["required_production"],0),plannedQty:q(n,["planned_qty"],0),actualQty:q(n,["actual_qty"],0),status:b(n,["status"],"draft"),productionType:b(n,["production_type"],"monthly"),notes:b(n,["notes"],"")}))}async function Dd(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>ne);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n||e.length===0)return!1;try{const s=e.map(c=>({product_code:c.productCode,product_name:c.productName,unit:c.unit,avg_monthly_demand:c.avgMonthlyDemand,demand_std_dev:c.demandStdDev,lead_time_days:c.leadTimeDays,service_level:c.serviceLevel,safety_stock_qty:c.safetyStockQty,reorder_point:c.reorderPoint,production_type:c.productionType,memo:c.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),r=new URL("/rest/v1/product_safety_stock_params",t),i=await fetch(r.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(s)});if(!i.ok){const c=await i.text();return console.error("saveSafetyStockParamsBulk failed:",i.status,c),!1}return!0}catch(s){return console.error("saveSafetyStockParamsBulk error:",s),!1}}async function qd(e){const{supabaseUpsert:t}=await I(async()=>{const{supabaseUpsert:s}=await Promise.resolve().then(()=>ne);return{supabaseUpsert:s}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}async function Td(e){const[t,n]=e.split("-").map(Number),s=[];for(let i=0;i<3;i++){const c=new Date(t,n-1+i,1);s.push(`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`)}return(await Promise.all(s.map(i=>xr(i)))).flat()}function Id(e,t){return t.includes("純米大吟醸")?"純米大吟醸":t.includes("大吟醸")?"大吟醸":t.includes("純米吟醸")||e.startsWith("純米吟醸")?"純米吟醸":t.includes("純米")&&!t.includes("吟醸")||e.startsWith("純米酒")?"純米":t.includes("本醸造")||t.includes("原酒")||e.startsWith("本醸造")||e.startsWith("吟醸")?"本醸造":t.includes("梅酒")||t.includes("リキュール")||e.startsWith("その他(酒類)")?"リキュール":e.startsWith("普通酒")?"普通酒":"その他"}function Md(e){const t=e.match(/(\d{3,4})\s*ml/i);return t?parseInt(t[1]):e.includes("1800")||e.includes("一升")?1800:e.includes("720")?720:e.includes("300")?300:e.includes("180")?180:720}const Cs=4e3;function wr(e,t){const n=[];for(const i of e){const c=i.plannedQty>0?i.plannedQty:Math.max(0,i.demandForecast+i.safetyStockTarget-i.openingStock);if(c<=0)continue;const d=Id(i.productionType,i.productName),u=Md(i.productName),h=i.safetyStockTarget>0?Math.max(0,i.safetyStockTarget-i.openingStock)/i.safetyStockTarget:i.openingStock<=0?1:0,v=Math.min(100,Math.round(h*100)),m=i.yearMonth===t;let w;switch(i.productionType){case"make_to_order":w=100;break;case"november":w=80;break;case"monthly":w=m?60:30;break;case"annual":w=20;break;default:w=40}const _=Math.min(20,Math.round(c/Cs*10)),k=v*.4+w*.4+_*.2;n.push({productCode:i.productCode,productName:i.productName,yearMonth:i.yearMonth,brewCategory:d,productionType:i.productionType,requiredQty:Math.max(0,i.demandForecast+i.safetyStockTarget-i.openingStock),plannedQty:i.plannedQty,openingStock:i.openingStock,safetyStockTarget:i.safetyStockTarget,demandForecast:i.demandForecast,stockUrgency:v,deadlineUrgency:w,priorityScore:k,daysNeeded:Math.max(1,Math.ceil(c/Cs)),volumeMl:u})}n.sort((i,c)=>c.priorityScore-i.priorityScore);const s=[];for(const i of n)s.includes(i.brewCategory)||s.push(i.brewCategory);const r=[];for(const i of s){const c=n.filter(d=>d.brewCategory===i);r.push(...c)}return r}function Nd(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}function ln(e,t,n){t>0&&n>0&&(e[t]=(e[t]||0)+n)}function Ds(e){return Object.entries(e).map(([t,n])=>({volumeMl:Number(t),label:Number(t)>=1e3?`${Number(t)}ml`:`${Number(t)}ml`,bottles:Number(n)})).sort((t,n)=>t.volumeMl-n.volumeMl)}async function Rd(e){const[t,n]=e.split("-").map(Number),s=`${e}-01`,r=new Date(t,n,0).getDate(),i=`${e}-${String(r).padStart(2,"0")}`,c=await xe("sales_document_headers",{select:"document_no,legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${s},sales_date.lte.${i})`,order:"sales_date.asc"}),d=await xe("sales_document_lines",{select:"document_no,legacy_product_code,quantity",note:`like.*date:${e}*`,order:"document_no"}),u=await xe("products",{select:"legacy_product_code,volume_ml"}),h={};for(const C of u)C.legacy_product_code&&C.volume_ml&&(h[C.legacy_product_code]=C.volume_ml);const v={};for(const C of d){const S=C.document_no,A=h[C.legacy_product_code]||0;A>0&&C.quantity>0&&(v[S]||(v[S]={}),ln(v[S],A,C.quantity))}const m=await xe("customers",{select:"legacy_customer_code,address1",address1:"not.is.null"}),w={};for(const C of m)C.address1&&(w[C.legacy_customer_code]=Nd(C.address1));const _={};for(const C of c){const S=C.sales_date;if(!S)continue;const A=C.legacy_customer_code||"",E=`${S}|${A}`,B=C.document_no||C.legacy_document_no||"";_[E]||(_[E]={date:S,custCode:A,custName:C.customer_name||"",city:w[A]||"住所未登録",amount:0,invoiceCount:0,volumes:{}}),_[E].amount+=Number(C.total_amount)||0,_[E].invoiceCount++;const o=v[B];if(o)for(const[l,p]of Object.entries(o))ln(_[E].volumes,Number(l),Number(p))}const k={};for(const C of Object.values(_)){k[C.date]||(k[C.date]={date:C.date,entries:[],cityGroups:[],totalAmount:0,count:0,totalVolumes:[]});const S=k[C.date];S.entries.push({customerCode:C.custCode,customerName:C.custName,city:C.city,amount:C.amount,invoiceCount:C.invoiceCount,volumes:Ds(C.volumes)}),S.totalAmount+=C.amount,S.count+=C.invoiceCount}for(const C of Object.values(k)){const S={},A={};for(const E of C.entries){S[E.city]=(S[E.city]||0)+1;for(const B of E.volumes)ln(A,B.volumeMl,B.bottles)}C.cityGroups=Object.entries(S).sort((E,B)=>B[1]-E[1]).map(([E,B])=>({city:E,count:B})),C.totalVolumes=Ds(A)}return k}async function Ka(){return Y("quotes",{select:"id,quote_no,quote_date,valid_until,legacy_customer_code,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function $r(e){const t=await Y("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await Y("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function Od(){const e=new Date().toISOString().slice(0,7)+"-01";return xe("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}async function Wa(){const e=await Y("app_feature_status",{select:"*"}),t={};for(const n of e)t[n.feature_id]={featureId:n.feature_id,confirmedAt:n.confirmed_at,confirmedBy:n.confirmed_by,notes:n.notes};return t}async function _r(e,t){await mt("app_feature_status",{feature_id:e,confirmed_at:new Date().toISOString(),confirmed_by:t,updated_at:new Date().toISOString()})}async function kr(e){await mt("app_feature_status",{feature_id:e,confirmed_at:null,confirmed_by:null,updated_at:new Date().toISOString()})}const Re={soumu:"総務",route_sales:"配送",brewing:"造り",bottling:"詰口",labeling:"貼場"},Bd={soumu:null,route_sales:null,brewing:[9,10,11,12,1,2,3,4],bottling:null,labeling:null},us={billing:"請求業務",inventory:"棚卸"},ms={morning:"午前",afternoon:"午後",both:"終日"};async function ys(){return(await Y("staff_members",{order:"department.asc,employment_type.asc,kana.asc"})??[]).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),kana:b(t,["kana"],""),employmentType:b(t,["employment_type"],"part_time"),department:b(t,["department"],"bottling"),hourlyRate:t.hourly_rate!=null?Number(t.hourly_rate):null,monthlySalary:t.monthly_salary!=null?Number(t.monthly_salary):null,contractFee:t.contract_fee!=null?Number(t.contract_fee):null,workHoursPerDay:q(t,["work_hours_per_day"],8),shiftPreference:t.shift_preference??null,monthlyTasks:Array.isArray(t.monthly_tasks)?t.monthly_tasks:[],availableMonths:Array.isArray(t.available_months)?t.available_months:null,crossDepartments:Array.isArray(t.cross_departments)?t.cross_departments:[],fixedDaysOff:Array.isArray(t.fixed_days_off)?t.fixed_days_off:[],isDeptLeader:t.is_dept_leader===!0,notes:b(t,["notes"],""),isActive:t.is_active!==!1}))}async function Sr(e){const t={name:e.name,kana:e.kana??null,employment_type:e.employmentType??"part_time",department:e.department??"bottling",hourly_rate:e.hourlyRate??null,monthly_salary:e.monthlySalary??null,contract_fee:e.contractFee??null,work_hours_per_day:e.workHoursPerDay??8,shift_preference:e.shiftPreference??null,monthly_tasks:e.monthlyTasks??[],available_months:e.availableMonths??null,cross_departments:e.crossDepartments??[],fixed_days_off:e.fixedDaysOff??[],is_dept_leader:e.isDeptLeader??!1,notes:e.notes??null,is_active:e.isActive??!0,updated_at:new Date().toISOString()};return e.id&&(t.id=e.id),!!await mt("staff_members",t)}async function Pr(e){return Gn("staff_members",e)}async function Er(e){const[t,n]=e.split("-").map(Number),s=O=>String(O).padStart(2,"0");function r(O,N){const R=N===12?1:N+1,M=N===12?O+1:O;return{startDate:`${O}-${s(N)}-01`,endDate:`${M}-${s(R)}-01`}}let i=0;const c=new Date(t,n-1,1);for(;c.getMonth()===n-1;){const O=c.getDay();O!==0&&O!==6&&i++,c.setDate(c.getDate()+1)}const{startDate:d,endDate:u}=r(t,n),{startDate:h,endDate:v}=r(t-1,n),m=`(sales_date.gte.${d},sales_date.lt.${u})`,w=`(sales_date.gte.${h},sales_date.lt.${v})`,[_,k,C,S,A,E]=await Promise.all([Y("daily_sales_fact",{select:"document_count,total_quantity",and:m}),Y("sales_document_headers",{select:"total_amount",and:m,customer_name:"ilike.*上様*"}),Y("sales_document_headers",{select:"total_amount",and:m}),Y("daily_sales_fact",{select:"document_count,total_quantity",and:w}),Y("sales_document_headers",{select:"total_amount",and:w}),Y("sales_document_headers",{select:"total_amount",and:w,customer_name:"ilike.*上様*"})]),B=_.reduce((O,N)=>O+q(N,["document_count"],0),0),o=Math.round(_.reduce((O,N)=>O+q(N,["total_quantity"],0),0)),l=k.length,p=k.reduce((O,N)=>O+q(N,["total_amount"],0),0),y=C.reduce((O,N)=>O+q(N,["total_amount"],0),0),f=Math.max(0,y-p),g=S.reduce((O,N)=>O+q(N,["document_count"],0),0),x=Math.round(S.reduce((O,N)=>O+q(N,["total_quantity"],0),0)),$=E.reduce((O,N)=>O+q(N,["total_amount"],0),0),P=A.reduce((O,N)=>O+q(N,["total_amount"],0),0),D=Math.max(0,P-$),T=Math.max(0,A.length-E.length);return{monthlyDocumentCount:B,directSalesCount:l,directSalesAmount:p,routeSalesAmount:f,workingDays:i,prevYearDocumentCount:g,prevYearRouteSalesAmount:D,prevYearRouteDocCount:T,prevYearTotalQuantity:x,currentTotalQuantity:o}}async function Lr(e){const[t,n]=e.split("-").map(Number),s=h=>String(h).padStart(2,"0"),r=`${t}-${s(n)}-01`,i=n===12?1:n+1,d=`${n===12?t+1:t}-${s(i)}-01`;return(await Y("daily_shift_plans",{select:"id,plan_date,department,staff_member_ids,notes",and:`(plan_date.gte.${r},plan_date.lt.${d})`,order:"plan_date.asc,department.asc"})).map(h=>({id:b(h,["id"],void 0),planDate:b(h,["plan_date"],""),department:b(h,["department"],"soumu"),staffMemberIds:h.staff_member_ids??[],notes:b(h,["notes"],"")}))}async function Ar(e,t){const[n,s]=e.split("-").map(Number),r=h=>String(h).padStart(2,"0"),i=`${n}-${r(s)}-01`,c=s===12?1:s+1,u=`${s===12?n+1:n}-${r(c)}-01`;try{const h=new URL("/rest/v1/daily_shift_plans",$e);if(h.searchParams.set("and",`(plan_date.gte.${i},plan_date.lt.${u})`),await fetch(h.toString(),{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}}),t.length===0)return!0;const v=t.map(_=>({plan_date:_.planDate,department:_.department,staff_member_ids:_.staffMemberIds,notes:_.notes||null})),m=new URL("/rest/v1/daily_shift_plans",$e);return(await fetch(m.toString(),{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(v)})).ok}catch(h){return console.error("saveDailyShiftPlans failed",h),!1}}const j=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:ds,CALENDAR_CATEGORY_LABELS:cs,CHURN_REASONS:an,DEPT_LABEL:Re,DEPT_LABELS:Ha,DEPT_MONTHS:Bd,INVOICE_TYPE_LABELS:qn,JIKOMI_STATUS_LABELS:er,MATERIAL_CATEGORIES:hr,MONTHLY_TASK_LABEL:us,PROSPECT_STAGE_COLORS:ps,PROSPECT_STAGE_LABELS:tn,ROLE_LABELS:Ja,SEASONAL_TEMPLATES:Zn,SHIFT_PREF_LABEL:ms,SLACK_EVENT_LABELS:Qa,TAX_DEDUCTION_LABELS:In,TAX_RATE_CATEGORIES:lr,abcPeriodToDates:os,addBrewingCustomCategory:Bl,addBrewingStockEntry:Ml,addRiceVariety:Dl,addTank:bl,autoScheduleAllBatches:$l,batchGeocode:id,buildBottlingSchedule:wr,calcWeeklyLabor:Pl,confirmFeature:_r,convertLeadToProspect:bd,createBrewingBatch:hl,createStaff:Hl,deleteBrewingCustomCategory:jl,deleteBrewingStockEntry:Rl,deleteCalendarEvent:Nc,deleteMailSender:Tc,deleteMaterial:sd,deletePrintLayout:Cc,deleteProductMaterial:Vo,deleteProspect:ed,deleteRicePurchaseCommitment:Al,deleteRiceVariety:ql,deleteStaffMember:Pr,deleteTank:xl,deleteTankById:dc,deleteTankMovement:yc,deleteTsumekuchiRecord:wc,deleteUserProfile:Hc,fetchAllBrewingStockEntries:Il,fetchAnalyticsByPeriod:Ii,fetchAnnouncements:tc,fetchAuditLogs:Kc,fetchAvailablePeriods:Mi,fetchAvailableProductionTypes:Zi,fetchBillList:rr,fetchBillingSummary:ns,fetchBrewingAlcoholSettings:el,fetchBrewingBatches:dl,fetchBrewingCategoryOverrides:Vl,fetchBrewingCustomCategories:Ol,fetchBrewingForecastOverrides:nl,fetchBrewingMonthlyTrend:Ui,fetchBrewingPlanSummary:Yi,fetchBrewingProcessSteps:pl,fetchBrewingProductDetail:Ji,fetchBrewingRiceParams:ol,fetchBrewingSchedule:Hi,fetchBrewingSeasonalPattern:il,fetchBrewingStockEntries:Tl,fetchBrewingYearlyShipments:al,fetchCalendarEvents:Ic,fetchCallLogs:ud,fetchCategoryTypeLinks:Wi,fetchChurnAlerts:ac,fetchChurnNotes:ld,fetchCustomerAnalysis:Go,fetchCustomerEfficiency:lc,fetchCustomerEfficiencyByYear:Nt,fetchCustomerLedger:es,fetchCustomerPriceGroup:ja,fetchCustomerPricing:Tn,fetchCustomerProductBreakdown:ji,fetchCustomersWithoutGeo:fr,fetchDailyShiftPlans:Lr,fetchDeliveryLocations:dd,fetchDeliveryNote:as,fetchDeliverySchedule:ec,fetchDemandAnalysis:Ad,fetchDemandForecasts:Zl,fetchEntityMonthlySales:Vi,fetchFaxInbox:jc,fetchFeatureStatuses:Wa,fetchFrequentCustomers:Ql,fetchFrequentProducts:Kl,fetchGenzaishu:gc,fetchIntegrationSettings:ur,fetchInvoiceLines:Cn,fetchInvoices:ya,fetchJikomiList:tr,fetchKenteiList:hc,fetchLabelExclusions:Yl,fetchLeadItems:fd,fetchLeadLists:hd,fetchMailSenders:Dc,fetchMapCustomers:od,fetchMasterStats:ma,fetchMaterialList:nr,fetchMyProfile:Uc,fetchOrderHeaders:Od,fetchPayableList:or,fetchPaymentStatus:Ro,fetchPeriodChartData:Bi,fetchPipelineMeta:Oo,fetchPrintLayouts:Lc,fetchProcurementDecisions:ll,fetchProductABC:Xo,fetchProductCustomerBreakdown:Fi,fetchProductDaily:ic,fetchProductMaterials:Ra,fetchProductMonthlyShipments:Xl,fetchProductPower:rc,fetchProductPrice:Mn,fetchProductShipmentsFromTable:oc,fetchProductionPlan:xr,fetchProductionPlan3Months:Td,fetchProspectActivities:td,fetchProspects:Zc,fetchPurchaseList:sr,fetchQuoteList:Ka,fetchQuoteWithLines:$r,fetchRawMaterialStock:ir,fetchRawRecords:za,fetchRawTableList:br,fetchRicePurchaseCommitments:El,fetchRiceVarieties:Cl,fetchSafetyStockParams:Cd,fetchSakeTaxByMonth:is,fetchSalesAnalytics:ts,fetchSalesReport:Ho,fetchSalesSummary:No,fetchSeasonalProfiles:sc,fetchShipmentCalendar:Rd,fetchShopifyOrders:Oc,fetchSlackLogs:Gc,fetchSlackRules:mr,fetchStaffCustomerBreakdown:Ri,fetchStaffList:Jl,fetchStaffMembers:ys,fetchStaffProductBreakdown:Oi,fetchStaffTotalsByPeriod:Ni,fetchStepLabor:Sl,fetchStoreOrders:dr,fetchStoreSales:ls,fetchSyncDashboard:Bo,fetchSystemHealth:zo,fetchSystemSetting:Mo,fetchTankList:ar,fetchTankMovements:pc,fetchTankMovementsByTank:uc,fetchTanks:vl,fetchTaxDeclaration:rs,fetchTourInquiriesFromDb:$d,fetchTsumekuchiRecords:bc,fetchTypesInCategory:zl,fetchUserProfiles:Yc,fetchVisitPriorities:nc,fetchWorkerSettings:_l,fetchWorkflowOrdersFromDb:xd,fetchWorkforceMetrics:Er,generateTaxCSV:kc,generateTaxXML:cr,getTankOccupancy:wl,linkTypeToCategory:Gi,ocrFaxImage:Fc,periodToDateRange:Yo,preloadInvoiceLines:jo,prevYearFilter:zi,reassignBrewingStockEntry:Nl,recalculateTaxDeclaration:Sc,recordAudit:Qc,registerGenzaishu:vc,resolveProductPrice:ss,saveBrewingAlcoholSetting:tl,saveBrewingForecastOverride:sl,saveBrewingRiceParams:rl,saveBrewingSchedule:Qi,saveCalendarEvent:Mc,saveCallLog:gr,saveChurnNote:cd,saveDailyShiftPlans:Ar,saveDeliveryLocation:pd,saveEmailCampaign:Ba,saveFaxRecord:Vc,saveIntegrationSetting:va,saveInvoice:Jo,saveKenteiRecord:fc,saveLabelExclusions:Ul,saveLeadItem:vr,saveLeadList:gd,saveMailSender:qc,saveMaterial:nd,savePrintLayout:Ac,saveProcurementDecision:cl,saveProductHierarchy:Dn,saveProductMaterial:Fo,saveProductionPlan:qd,saveProspect:yr,saveProspectActivity:ad,saveRicePurchaseCommitment:Ll,saveSafetyStockParamsBulk:Dd,saveSlackRule:Wc,saveStoreOrder:Ec,saveTank:cc,saveTankMovement:mc,saveTaxDeclaration:Pc,saveTourInquiry:_d,saveTsumekuchiRecord:xc,saveUserProfile:Jc,saveWorkerSettings:kl,saveWorkflowOrder:wd,searchPlaces:vd,sendEmailCampaign:pr,sendSlackNotification:Xc,setBrewingCategoryOverride:Fl,submitFeatureRequest:Qo,syncGoogleCalendar:zc,syncIvryCallLogs:md,syncPhoneBookToIvry:yd,syncShopifyOrders:Rc,unconfirmFeature:kr,unlinkTypeFromCategory:Xi,updateBrewingBatch:gl,updateBrewingProcessStep:fl,updateCustomer:Ko,updateProduct:Wo,upsertBrewingStock:Ki,upsertStaffMember:Sr,upsertSystemSetting:It},Symbol.toStringTag,{value:"Module"}));function Lt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const zd={open:"未締め",closed:"締め済"};function jd(e,t){const n=e.customers.map(s=>`
      <tr>
        <td>
          <div class="table-title">${s.customerName}</div>
          <div class="table-sub mono">${s.customerCode}</div>
        </td>
        <td class="numeric">${s.closingDay}日</td>
        <td class="numeric">${Lt(s.salesAmount)}</td>
        <td class="numeric">${Lt(s.taxAmount)}</td>
        <td class="numeric">${Lt(s.prevBalance)}</td>
        <td class="numeric">${Lt(s.paymentAmount)}</td>
        <td class="numeric"><strong>${Lt(s.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${zd[s.status]}</span>
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
        <p class="kpi-value">${Lt(e.totalBilling)}</p>
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
  `}const Fd={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},Vd={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function qs(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function $a(e){const t=Vd[e],n=Fd[e].map(s=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${qs(s.title)}</p>
            <p class="category-card-description">${qs(s.description)}</p>
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
  `}function Cr(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function ra(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Yd(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${Cr(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${ra(t.amount)}</td>
        </tr>
      `).join("")}function Ud(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${Cr(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${ra(t.amount)}</td>
        </tr>
      `).join("")}function Jd(e,t){return`
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
            <dd>${ra(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${ra(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${ra(e.balanceAmount)}</dd>
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
            <tbody>${Yd(e)}</tbody>
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
            <tbody>${Ud(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function Jt(e,t,n){const s=e.findIndex(i=>i.column===t);if(s>=0){if(e[s].direction==="asc"){const c=[...e];return c[s]={column:t,direction:"desc"},c}return e.filter((c,d)=>d!==s)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function Hd(e,t){const n=e.findIndex(i=>i.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const s=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${s}${r}</span>`}function re(e,t,n,s=""){return`<th class="sortable ${s}" data-sort-col="${e}">${t} ${Hd(n,e)}</th>`}function Ts(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function zt(e,t,n){return t.length===0?e:[...e].sort((s,r)=>{for(const{column:i,direction:c}of t){const d=n[i];if(!d)continue;const u=Ts(s[d]),h=Ts(r[d]);let v=0;if(typeof u=="number"&&typeof h=="number"?v=u-h:v=String(u).localeCompare(String(h),"ja"),v!==0)return c==="asc"?v:-v}return 0})}const Qd={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},Is={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},Ht={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function Kd(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function Wd(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function Gd(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function Dr(e,t){const n=Wd(t),s=Gd(t),[r,i]=t.split("-").map(Number),c=new Map;e.forEach(o=>{if(o.date.slice(0,7)===t){const l=o.date.slice(0,10);c.has(l)||c.set(l,[]),c.get(l).push(o)}});const d=e.filter(o=>o.date.slice(0,7)===t),u=d.reduce((o,l)=>o+l.quantity,0),h=new Set(d.map(o=>o.date)).size,v=new Date().toISOString().slice(0,10),m=["日","月","火","水","木","金","土"].map(o=>`<th class="dcal-header">${o}</th>`).join("");let w="",_=1;for(let o=0;o<6&&!(_>n&&o>0);o++){w+="<tr>";for(let l=0;l<7;l++)if(o===0&&l<s||_>n)w+='<td class="dcal-cell dcal-empty"></td>';else{const p=`${r}-${String(i).padStart(2,"0")}-${String(_).padStart(2,"0")}`,y=c.get(p)||[],f=p===v,g=y.reduce((x,$)=>x+$.quantity,0);w+=`
          <td class="dcal-cell ${f?"dcal-today":""}">
            <div class="dcal-day">${_}</div>
            ${y.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${y[0].status}">${y.length}件 ${g}本</div>
              </div>
            `:""}
          </td>`,_++}w+="</tr>"}const[k,C]=i===1?[r-1,12]:[r,i-1],[S,A]=i===12?[r+1,1]:[r,i+1],E=`${k}-${String(C).padStart(2,"0")}`,B=`${S}-${String(A).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${i}月: ${h}日稼働 / ${d.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${E}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${r}年${i}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${B}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${m}</tr></thead>
        <tbody>${w}</tbody>
      </table>
    </section>
  `}function Xd(e,t){const n=t==="all"?e:e.filter(d=>d.segment===t),s={all:e.length};e.forEach(d=>{s[d.segment]=(s[d.segment]??0)+1});const i=["all",...[...new Set(e.map(d=>d.segment))]].map(d=>`
      <button class="button ${t===d?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${d}">
        ${d==="all"?"全て":Is[d]??d} (${s[d]??0})
      </button>
    `).join(""),c=n.map(d=>`
      <tr>
        <td class="mono">${d.code}</td>
        <td>${d.name}</td>
        <td><span class="segment-badge" style="background:${Ht[d.segment]??"#718096"};">${Is[d.segment]??d.segment}</span></td>
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
            <li><span class="segment-badge" style="background:${Ht.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${Ht["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${Ht["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${Ht["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
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
  `}function Zd(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${Dr(e.deliveries,e.calendarMonth)}
    ${Xd(e.forecasts,e.selectedSegment)}
  `}function ep(e,t){return Dr(e,t)}const _a={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function Ms(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function cn(e,t,n){if(t==="all")return e;const s=new Date,r=s.toISOString().slice(0,10),i=new Date(s);switch(t){case"today":return e.filter(c=>c.date.slice(0,10)===r);case"month":return e.filter(c=>c.date.slice(0,7)===r.slice(0,7));case"future":{const c=new Date(s.getFullYear(),s.getMonth(),1).toISOString().slice(0,10);return e.filter(d=>d.date.slice(0,10)>=c)}case"90days":return i.setDate(i.getDate()-90),e.filter(c=>c.date>=i.toISOString());case"year":return i.setFullYear(i.getFullYear()-1),e.filter(c=>c.date>=i.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(c=>{const d=c.date.slice(0,10);return d>=n.start&&d<=n.end})}}function Oe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function dn(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function tp(e){const s={top:20,right:20,bottom:30,left:50},r=760-s.left-s.right,i=260-s.top-s.bottom,c=Math.max(...e.map(v=>v.amount),1),d=r/e.length,u=e.map((v,m)=>{const w=v.amount/c*i,_=s.left+m*d+4,k=s.top+i-w,C=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(v.date));return`
        <g>
          <rect x="${_}" y="${k}" width="${Math.max(d-8,8)}" height="${w}" rx="4" fill="#0F5B8D" opacity="${.58+m/e.length*.34}" />
          ${m%5===0?`<text x="${_+6}" y="252" class="chart-axis">${C}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(v=>{const m=s.top+i-i*v,w=Math.round(c*v/1e3);return`
        <g>
          <line x1="${s.left}" y1="${m}" x2="${760-s.right}" y2="${m}" class="chart-grid" />
          <text x="6" y="${m+4}" class="chart-axis">${w.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function ap(e,t,n,s,r="month",i,c=[]){const d={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=cn(e.allDailySales,r,i),h=u.reduce((z,V)=>z+V.amount,0),v=u.reduce((z,V)=>z+V.bottles,0),m=u.reduce((z,V)=>z+V.volumeMl,0),w=u.length,_=v>0?Math.round(h/v):0,k=m>0?Math.round(h/(m/1e3)):0,C=new Date,S=C.toISOString().slice(0,10),A=S.slice(0,7),E=cn(e.allDailySales,"month").filter(z=>z.date.slice(0,10)<=S),B=E.reduce((z,V)=>z+V.amount,0);E.reduce((z,V)=>z+V.bottles,0);const o=C.getDate();new Date(C.getFullYear(),C.getMonth()+1,0).getDate();const p=(s?.orderHeaders??[]).filter(z=>z.sales_date.slice(0,7)===A),y=p.reduce((z,V)=>z+Number(V.total_amount),0),f=p.length,g=cn(e.allDailySales,"month"),x=g.reduce((z,V)=>z+V.bottles,0),$=y>0?y:g.reduce((z,V)=>z+V.amount,0),P=y>0?"orders":"extrapolation",T=(u.length>0?e.allDailySales.filter(z=>{const V=u[0]?.date??"",U=u[u.length-1]?.date??"",G=Ms(V,-1),J=Ms(U,-1);return z.date>=G&&z.date<=J}):[]).reduce((z,V)=>z+V.amount,0),O=T>0?(h-T)/T*100:0,N=O>0?"+":"",R=e.salesRecords.slice(0,10).map(z=>`
            <tr class="clickable-row" data-doc-no="${z.documentNo}" style="cursor:pointer">
              <td class="mono">${z.documentNo}</td>
              <td>${dn(z.date)}</td>
              <td>${z.customerName}</td>
              <td class="numeric">${Oe(z.amount)}</td>
            </tr>
          `).join(""),M=["today","month","future","90days","year","all"].map(z=>`<button class="button ${z===r?"primary":"secondary"} small" type="button" data-period="${z}">${_a[z]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${d[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${dn(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${M}</div>
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
        <p class="kpi-value">${Oe(e.kpis.todaySales)}</p>
        <p class="kpi-sub">${e.kpis.todaySales>0?`${new Date().getMonth()+1}/${new Date().getDate()} 時点`:"本日データなし"}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月実績（本日まで）</p>
        <p class="kpi-value">${Oe(B)}</p>
        <p class="kpi-sub">${o}日経過 / ${E.length}営業日 / 日平均 ${E.length>0?Oe(Math.round(B/E.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${Oe($)}</p>
        <p class="kpi-sub">${P==="orders"?`受注確定 ${f}件`:`出荷見込 ${x.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${O>=0?"#2f855a":"#c53d3d"}">${T>0?`${N}${O.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${T>0?Oe(T):"データなし"}</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${Oe(e.kpis.unpaidAmount)}</p>
      </article>
    </section>

    ${r!=="month"?`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">${_a[r]}売上</p>
        <p class="kpi-value">${Oe(h)}</p>
        <p class="kpi-sub">${w}日間${w>0?` / 日平均 ${Oe(Math.round(h/w))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${v.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${Oe(_)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(m/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${Oe(k)}</p>
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
            <p class="panel-caption">${_a[r]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${tp(u.length>0?u:e.dailySales)}
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
              <dd>${dn(t.lastSyncAt)}</dd>
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
          <tbody>${R}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${_a[r]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${re("date","日付",c)}
              ${re("amount","売上",c,"numeric")}
              ${re("bottles","本数",c,"numeric")}
              ${re("volumeMl","液体量(L)",c,"numeric")}
              ${re("pricePerBottle","本単価",c,"numeric")}
              ${re("pricePerLiter","L単価",c,"numeric")}
            </tr>
          </thead>
          <tbody>${zt(c.length>0?u:u.slice().reverse(),c,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(z=>`
            <tr>
              <td class="mono">${z.date.slice(0,10)}</td>
              <td class="numeric">${Oe(z.amount)}</td>
              <td class="numeric">${z.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(z.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${Oe(z.pricePerBottle)}</td>
              <td class="numeric">${Oe(z.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${s?np(s):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function np(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(d=>d.startsAt.slice(0,10)>=t).slice(0,5),s=e.tourInquiries.filter(d=>d.status==="new").length,r=e.churnSummary,i=r?r.atRiskCount+r.dormantCount+r.decliningCount:null,c=r?`<article class="panel kpi-card ${r.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
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
        ${n.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${n.map(d=>{const u=new Date(d.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${d.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${u.getMonth()+1}/${u.getDate()} ${d.isAllDay?"終日":u.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${d.title}</div>
                  ${d.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${d.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>

    ${e.deliveries&&e.deliveries.length>0?ep(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?sp(e.orderHeaders):""}
  `}function sp(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),s=new Date().toISOString().slice(0,10),r=s.slice(0,7),i=new Map;for(const m of e){const w=m.sales_date.slice(0,7),_=i.get(w)??{count:0,total:0};i.set(w,{count:_.count+1,total:_.total+Number(m.total_amount)})}const c=[...i.keys()].sort(),d=e.reduce((m,w)=>m+Number(w.total_amount),0),u=c.map(m=>{const{count:w,total:_}=i.get(m);return`<tr>
      <td class="mono" style="font-weight:700;">${m===r?`${m}（当月）`:m}</td>
      <td class="numeric">${w.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(_)}</td>
    </tr>`}).join(""),h=e.filter(m=>m.sales_date>=s).slice(0,30),v=h.map(m=>`<tr>
    <td class="mono">${m.sales_date}</td>
    <td>${m.customer_name||"―"}</td>
    <td class="numeric">${t.format(Number(m.total_amount))}</td>
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
          <tbody>${v}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function op(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function At(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function rp(e,t){const n=e.lines.length?e.lines.map((r,i)=>`
          <tr>
            <td class="numeric">${i+1}</td>
            <td class="mono">${r.productCode}</td>
            <td>${r.productName}</td>
            <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
            <td>${r.unit}</td>
            <td class="numeric">${At(r.unitPrice)}</td>
            <td class="numeric">${At(r.amount)}</td>
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
            <tr><th>納品日</th><td>${op(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${At(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${At(s)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${At(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${At(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function We(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ip(e){return We(e).replaceAll(`
`,"<br />")}function lp(e){const n=[...Object.values(Zn),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${We(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),s=e.previewRecipients.length?e.previewRecipients.map(r=>`
            <li>
              <span>${We(r.name)}</span>
              <span class="table-sub">${We(r.email)} / ${We(r.area)}</span>
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
          <input id="email-subject" type="text" value="${We(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${We(e.body)}</textarea>
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
            ${e.senders.map(r=>`<option value="${r.id}" ${r.id===e.senderId?"selected":""}>${We(r.name)} &lt;${We(r.email)}&gt;${r.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${We(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?ip(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${We(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function Ke(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ka(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function cp(e,t){const n=[ka("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Ke(r.name)}</strong>
            <span class="table-sub mono">${Ke(r.code)}</span>
          </button>
        `)),ka("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Ke(r.name)}</strong>
            <span class="table-sub mono">${Ke(r.code)}</span>
          </button>
        `)),ka("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${Ke(r.documentNo)}</strong>
            <span class="table-sub">${Ke(r.customerName)} / ${Ke(r.date)}</span>
          </button>
        `)),ka("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${Ke(r.path)}"
          >
            <strong>${Ke(r.title)}</strong>
            <span class="table-sub mono">${Ke(r.path)}</span>
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
            value="${Ke(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||s}
          </div>
        </div>
      </div>
    </div>
  `}function Qt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function qr(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${Qt(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${Qt(e.title)}">
        <div class="modal-header">
          <h2>${Qt(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${Qt(e.placeholder)}"
            value="${Qt(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function lt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ns(e){return e.trim().toLowerCase()}function dp(e,t,n=[]){const s=Ns(t),r=e.filter(d=>s?[d.code,d.name,d.kanaName,d.shortName].map(Ns).some(u=>u.includes(s)):!0).slice(0,50),i=!s&&n.length>0?`<div style="padding:8px 12px;border-bottom:2px solid var(--border,#e5e7eb);">
        <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted,#6b7280);margin-bottom:6px;">よく使う得意先</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${n.map(d=>`<button class="freq-chip" type="button" data-action="picker-select" data-code="${lt(d.code)}" data-name="${lt(d.name)}">${lt(d.name)} <small style="opacity:0.6">${d.count}件</small></button>`).join("")}
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
                      data-code="${lt(d.code)}"
                      data-name="${lt(d.name)}"
                    >
                      <td class="mono">${lt(d.code)}</td>
                      <td>${lt(d.name)}</td>
                      <td style="font-size:0.8rem;color:var(--text-muted,#6b7280)">${lt(d.kanaName||"")}</td>
                      <td>${d.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:i;return qr({title:"得意先検索",searchQuery:t,placeholder:"コード・名前・カナで検索",resultsHtml:c,emptyMessage:"該当する得意先が見つかりません。"})}function Rs(e){return e.toISOString().slice(0,10)}function Ie(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ft(e,t){return e[t]?`<div class="field-error">${Ie(e[t])}</div>`:""}function Ct(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function pp(e,t,n,s,r,i,c){const d=Object.keys(qn).map(C=>`<option value="${C}" ${e.invoiceType===C?"selected":""}>${qn[C]}</option>`).join(""),u=r.map(C=>`<option value="${Ie(C.code)}" ${e.registeredBy===C.code?"selected":""}>${Ie(C.name)}（${Ie(C.code)}）</option>`).join(""),h=e.staffCode?(()=>{const C=r.find(S=>S.code===e.staffCode);return C?`${C.name}（${C.code}）`:e.staffCode})():"—",v=i.length>0?`<div class="freq-chips">
        <span class="freq-label">よく使う:</span>
        ${i.map(C=>`<button class="freq-chip" type="button" data-action="select-freq-customer" data-code="${Ie(C.code)}" data-name="${Ie(C.name)}" title="${C.count}件">${Ie(C.name)}</button>`).join("")}
      </div>`:"",m=c.length>0?`<div class="freq-chips">
        <span class="freq-label">よく使う:</span>
        ${c.map(C=>`<button class="freq-chip" type="button" data-action="select-freq-product" data-code="${Ie(C.code)}" data-name="${Ie(C.name)}" title="${C.count}回">${Ie(C.name)}</button>`).join("")}
      </div>`:"",w=e.lines.map((C,S)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${Ct(s,`lines.${S}.productCode`,"input-cell")}" type="text" data-line="${S}" data-field="productCode" value="${Ie(C.productCode)}" placeholder="商品コード" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${S}" aria-label="商品検索">🔍</button>
          </div>
          ${ft(s,`lines.${S}.productCode`)}
        </td>
        <td>
          <input class="${Ct(s,`lines.${S}.productName`,"input-cell")}" type="text" data-line="${S}" data-field="productName" value="${Ie(C.productName)}" placeholder="商品名" data-autofill="product-name" />
          ${ft(s,`lines.${S}.productName`)}
        </td>
        <td>
          <input class="${Ct(s,`lines.${S}.quantity`,"input-cell numeric")}" type="number" data-line="${S}" data-field="quantity" value="${C.quantity}" min="0" />
          ${ft(s,`lines.${S}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${S}" data-field="unit" value="${C.unit}" placeholder="本" /></td>
        <td>
          <input class="${Ct(s,`lines.${S}.unitPrice`,"input-cell numeric")}" type="number" data-line="${S}" data-field="unitPrice" value="${C.unitPrice}" min="0" />
          ${ft(s,`lines.${S}.unitPrice`)}
        </td>
        <td class="numeric">${C.amount>0?C.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${S}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${S}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),_=e.lines.reduce((C,S)=>C+S.amount,0),k=Math.floor(_*10/110);return`
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
          <input class="${Ct(s,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Rs(new Date)}" />
          ${ft(s,"invoiceDate")}
        </label>
        <label class="field">
          <span>納品日</span>
          <input id="inv-delivery-date" type="date" value="${e.deliveryDate||e.invoiceDate||Rs(new Date)}" />
          <div class="form-hint">空欄の場合は伝票日付と同じ</div>
        </label>
      </div>

      <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
        <label class="field">
          <span>得意先</span>
          <div class="input-group">
            <input
              class="${Ct(s,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="コードまたは名前で検索"
              value="${Ie(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">コード・名前・カナで検索できます</div>
          ${ft(s,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="名前で検索"
            value="${Ie(e.customerName)}"
          />
        </label>
        <div class="field">
          <span>営業担当</span>
          <div class="staff-display" id="inv-sales-staff">${Ie(h)}</div>
          <div class="form-hint">得意先に紐づく営業担当（自動セット）</div>
        </div>
      </div>

      ${v}

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
      ${ft(s,"lines")}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>明細</h2>
          <p class="panel-caption">${e.lines.length} 行</p>
        </div>
        <button class="button secondary" data-action="add-line">＋ 行追加</button>
      </div>
      ${m}
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
          <tbody id="invoice-lines">${w||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <div class="invoice-total-row">
        <div class="total-stack">
          <span class="total-label">小計</span>
          <span class="total-value">${(_-k).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${k.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${_.toLocaleString("ja-JP")} 円</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <label class="field">
        <span>備考</span>
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${Ie(e.note)}</textarea>
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
  `}function up(e){return"¥"+e.toLocaleString("ja-JP")}function mp(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const yp={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},hp={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},fp={sake:"酒販用",standard:"通常"};function gp(e,t,n="",s=""){const r=n?e.filter(u=>u.legacy_customer_code===n):e,i=8,c=t?`<tr><td colspan="${i}" class="empty-row">読み込み中…</td></tr>`:r.length===0?`<tr><td colspan="${i}" class="empty-row">見積書がありません</td></tr>`:r.map(u=>`
      <tr>
        <td class="mono">${u.quote_no}</td>
        <td>${mp(u.quote_date)}</td>
        <td>${u.customer_name||"（未選択）"}</td>
        <td>${u.subject||""}</td>
        <td class="numeric">${up(u.total_amount)}</td>
        <td><span class="badge ${hp[u.status]??"badge-gray"}">${yp[u.status]??u.status}</span></td>
        <td>${fp[u.template_type]??u.template_type}</td>
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
        <span style="font-size:13px;color:var(--primary,#3b82f6);font-weight:600;">🔍 ${s||n} の見積のみ表示中</span>
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
  `}const Tr="kanei-quote-settings",Ir=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Fa={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function Nn(){try{const e=localStorage.getItem(Tr);if(e)return{...Fa,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Fa,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Fa}}function _t(e){localStorage.setItem(Tr,JSON.stringify(e))}function tt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ne(e,t,n,s="text",r=""){return`<div class="form-row"><label>${t}</label><input type="${s}" id="${e}" value="${tt(n)}" placeholder="${tt(r)}" /></div>`}function vp(e,t,n,s){const r=s.map(i=>`<option value="${tt(i)}" ${n===i?"selected":""}>${tt(i)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${r}</select></div>`}function bp(e){return`
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
        ${Ne("qs-company-name","会社名",e.companyName)}
        ${Ne("qs-company-postal","郵便番号",e.companyPostal,"text","257-0014")}
        ${Ne("qs-company-addr1","住所1",e.companyAddress1)}
        ${Ne("qs-company-addr2","住所2",e.companyAddress2,"text","建物名等")}
        ${Ne("qs-company-tel","電話番号",e.companyTel)}
        ${Ne("qs-company-fax","FAX番号",e.companyFax)}
        ${Ne("qs-company-email","メール",e.companyEmail,"email")}
        ${Ne("qs-company-regno","適格請求書番号",e.companyRegistrationNo,"text","T1234567890123")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>振込口座</h2></div>
      <div class="form-grid-2">
        ${Ne("qs-bank-name","銀行名",e.bankName,"text","横浜銀行")}
        ${Ne("qs-bank-branch","支店名",e.bankBranch,"text","秦野支店")}
        ${vp("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
        ${Ne("qs-bank-no","口座番号",e.bankAccountNo,"text","1234567")}
        ${Ne("qs-bank-holder","口座名義（カナ）",e.bankAccountHolder,"text","カ）カナイシュゾウテン")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>見積書デフォルト設定</h2></div>
      <div class="form-grid-2">
        ${Ne("qs-payment-terms","支払条件",e.defaultPaymentTerms,"text","月末締め翌月末払い")}
        ${Ne("qs-header-note","書類上部メモ",e.defaultHeaderNote,"text","下記のとおりお見積り申し上げます。")}
        ${Ne("qs-footer-note","書類下部メモ",e.defaultFooterNote)}
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>カラーテーマ</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;">見積書のアクセントカラーを設定します。プリセットから選ぶか、カスタムカラーを指定してください。</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px;">
        ${Ir.map(t=>`
          <button
            type="button"
            data-action="set-accent-color"
            data-color="${tt(t.value)}"
            title="${tt(t.label)}"
            style="width:36px;height:36px;border-radius:6px;border:3px solid ${e.accentColor===t.value?"#333":"transparent"};background:${tt(t.value)};cursor:pointer;transition:border-color 0.15s;"
          ></button>
        `).join("")}
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;">
          カスタム
          <input type="color" id="qs-accent-color" value="${tt(e.accentColor||"#0968e5")}" style="width:36px;height:36px;border:none;border-radius:4px;cursor:pointer;padding:2px;" />
        </label>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:12px;color:var(--text-secondary);">現在の色:</span>
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:${tt(e.accentColor||"#0968e5")};border:1px solid rgba(0,0,0,0.15);"></span>
          <code style="font-size:12px;">${tt(e.accentColor||"#0968e5")}</code>
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
  `}function xp(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function Ga(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:xp(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}Ga();function se(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ye(e){return"¥"+e.toLocaleString("ja-JP")}function Os(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Mr(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function Nr(e,t,n){return"#"+[e,t,n].map(s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0")).join("")}function Xa(e,t){const[n,s,r]=Mr(e);return Nr(n+(255-n)*t,s+(255-s)*t,r+(255-r)*t)}function Rr(e,t){const[n,s,r]=Mr(e);return Nr(n*(1-t),s*(1-t),r*(1-t))}function wp(e){const t=Rr(e,.15),n=Xa(e,.88),s=Xa(e,.96);return`
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
.q-items tbody tr:nth-child(even) td { background:${s}; }
.q-items tfoot td { padding:4px 6px; border:1px solid #d0d8e8; }
.q-total-row td { font-weight:700; font-size:12px; background:${n}; border-top:2px solid ${e}; }
.q-remarks { border:1px solid #ddd; padding:8px; font-size:10px; margin-bottom:10px; border-radius:3px; }
.q-remarks-label { font-weight:700; margin-bottom:3px; }
.q-footer-note { font-size:9px; color:#777; margin-bottom:8px; }
.billing-box { border-top:1px solid #e0e0e0; padding-top:8px; font-size:10px; color:#555; line-height:1.6; }
@media print { body { padding:10mm 12mm; } }
`}function $p(e){const t=Rr(e,.15),n=Xa(e,.88),s=Xa(e,.96);return`
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
`}function Or(e,t){const n=e.lines.reduce((k,C)=>k+C.amount,0),s=Math.round(n*e.taxRate/100),r=n+s,i=e.templateType==="sake",c=i?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",d=i?9:6,u=e.lines.map((k,C)=>{const S=i?`<td style="font-size:9px;">${se(k.janCode)}</td><td style="text-align:center;">${k.caseQty??""}</td><td style="text-align:right;">${k.retailPrice!=null?Ye(k.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${C+1}</td>
      <td class="mono" style="font-size:9px;">${se(k.productCode)}</td>
      <td>${se(k.productName)}</td>
      ${S}
      <td style="text-align:right;">${k.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${se(k.unit)}</td>
      <td style="text-align:right;">${Ye(k.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${d}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,h=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),v=h?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${se(h)}</p>
    </div>
  `:"",m=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",w=[];e.validUntil&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${Os(e.validUntil)}</div></div>`),e.paymentTerms&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${se(e.paymentTerms)}</div></div>`),e.deliveryDate&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${se(e.deliveryDate)}</div></div>`),e.deliveryPlace&&w.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${se(e.deliveryPlace)}</div></div>`);const _=w.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min(w.length,4)},1fr);">${w.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <div class="q-meta-box">
      ${e.quoteNo?`<div class="q-meta-item"><span class="q-meta-label">見積番号</span><span class="q-meta-val">${se(e.quoteNo)}</span></div>`:""}
      <div class="q-meta-item"><span class="q-meta-label">見積日</span><span class="q-meta-val">${Os(e.quoteDate)}</span></div>
    </div>
  </div>

  <!-- 取引先（左）・自社情報（右） -->
  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${se(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${se(e.customerAddress)}</p>`:""}
    </div>
    <div class="q-seller-col">
      <!-- 自社情報: 社名の右に印鑑 -->
      <div class="q-seller-name-row">
        <span class="q-seller-name">${se(t.companyName)}</span>
        ${m}
      </div>
      ${t.companyPostal?`<p class="q-seller-sub">〒${se(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${se(t.companyAddress1)}${t.companyAddress2?" "+se(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${se(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${se(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${se(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  ${_}

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${Ye(r)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${se(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${se(t.defaultHeaderNote)}</p>`:""}

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
      <tr><td colspan="${d-1}" style="text-align:right;">小計</td><td style="text-align:right;">${Ye(n)}</td></tr>
      <tr><td colspan="${d-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${Ye(s)}</td></tr>
      <tr class="q-total-row"><td colspan="${d-1}" style="text-align:right;">合計</td><td style="text-align:right;">${Ye(r)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${se(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${se(t.defaultFooterNote)}</p>`:""}

  ${v}
</div>`}function Br(e,t,n,s,r,i,c){const d=e.lines.reduce((k,C)=>k+C.amount,0),u=Math.round(d*e.taxRate/100),h=d+u,v=e.templateType==="sake",m=s.length>=1?t.filter(k=>k.name.includes(s)||k.code.includes(s)).slice(0,8):[],w=r.length>=1?n.filter(k=>k.name.includes(r)||k.code.includes(r)).slice(0,8):[];if(e.previewMode){const k=c.accentColor||"#0968e5";return`
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
        ${$p(k)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${Or(e,c)}
      </div>
    `}const _=e.lines.map((k,C)=>{const S=v?`
      <td><input type="text" class="jan-input" data-line-idx="${C}" value="${se(k.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${C}" value="${k.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${C}" value="${k.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${se(k.productCode)}</td>
      <td>${se(k.productName)}</td>
      ${S}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${C}" value="${k.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${se(k.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${C}" value="${k.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${Ye(k.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${C}">×</button></td>
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
          ${Ir.map(k=>`
            <button type="button" data-action="set-accent-color" data-color="${se(k.value)}" title="${se(k.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${c.accentColor===k.value?"#333":"transparent"};background:${se(k.value)};cursor:pointer;"></button>
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
          <input type="text" id="q-no" value="${se(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${se(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${se(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${se(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${se(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">既存得意先</p>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${se(s)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${m.length>0?`<div class="search-results">${m.map(k=>`
        <button class="search-item" type="button" data-select-customer="${k.code}" data-cust-name="${se(k.name)}" data-cust-addr="${se(k.address1||"")}">
          <span class="mono">${k.code}</span> ${se(k.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName&&!e.isProspect?`<div class="selected-item"><span class="mono">${se(e.customerCode)}</span> <strong>${se(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${se(e.customerAddress)}</span>`:""}</div>`:""}

      <div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--border);">
        <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">見込み顧客から選択</p>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="q-prospect-search" placeholder="見込み顧客名で検索…" style="flex:1;" />
          <button type="button" class="button secondary small" data-action="new-prospect-from-quote">＋ 新規登録</button>
        </div>
        <div id="q-prospect-results"></div>
        ${e.customerName&&e.isProspect?`<div class="selected-item" style="border-left:3px solid #48bb78;"><span style="font-size:11px;background:#48bb78;color:white;border-radius:3px;padding:1px 5px;margin-right:6px;">見込</span> <strong>${se(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${se(e.customerAddress)}</span>`:""}</div>`:""}
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
        <input type="text" id="q-prod-search" value="${se(r)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${w.length>0?`<div class="search-results">${w.map(k=>{const C=i?ss(k,i):{price:k.salePrice||0,label:"卸価格"},S=k.listPrice||0,A=C.label!=="標準価格"&&C.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${k.code}" data-prod-name="${se(k.name)}" data-prod-price="${C.price}" data-prod-retail="${S}" data-prod-jan="${se(k.janCode??"")}" data-prod-unit="${se(k.unit??"本")}" data-prod-case="${k.caseQty??""}">
          <span class="mono">${k.code}</span> ${se(k.name)}
          <span class="numeric" ${A?'style="color:#2f855a;font-weight:700;"':""}>納入 ${C.price?Ye(C.price):"未設定"} <small>(${C.label})</small>${S?`　定価 ${Ye(S)}`:""}</span>
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
          <tbody>${_}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="3">${se(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${Ye(d)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${Ye(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${Ye(h)}</span></div>
        </div>
      </div>
    </section>
  `}async function _p(e,t){const n=t.accentColor||"#0968e5",s=document.createElement("div");s.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",s.innerHTML=`<style>${wp(n)}</style>${Or(e,t)}`,document.body.appendChild(s);try{const[{default:r},{jsPDF:i}]=await Promise.all([I(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),I(()=>import("./jspdf.es.min-R5J5Y2Mi.js").then(k=>k.j),[])]),c=await r(s,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),d=210,u=297,h=c.width/d,v=u*h,m=new i({orientation:"portrait",unit:"mm",format:"a4"});let w=0,_=0;for(;w<c.height;){_>0&&m.addPage();const k=Math.min(v,c.height-w),C=document.createElement("canvas");C.width=c.width,C.height=Math.ceil(k);const S=C.getContext("2d");S.fillStyle="#ffffff",S.fillRect(0,0,C.width,C.height),S.drawImage(c,0,w,c.width,k,0,0,c.width,k);const A=C.toDataURL("image/jpeg",.95),E=k/h;m.addImage(A,"JPEG",0,0,d,E),w+=v,_++}m.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(s)}}function Sa(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function zr(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function jr(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function Fr(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function kp(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function Sp(e,t,n,s,r){const i=new Map,c=new Map;for(const v of e){if(v.date>=t&&v.date<=n){const m=i.get(v.productCode);m?(m.amt+=v.amount,m.qty+=v.qty):i.set(v.productCode,{name:v.productName,vol:v.volumeMl,amt:v.amount,qty:v.qty})}v.date>=s&&v.date<=r&&c.set(v.productCode,(c.get(v.productCode)??0)+v.amount)}const d=[...i.entries()].map(([v,m])=>({code:v,...m})).sort((v,m)=>m.amt-v.amt),u=d.reduce((v,m)=>v+m.amt,0);let h=0;return d.map(v=>{h+=v.amt;const m=u>0?Math.round(v.amt*1e4/u)/100:0,w=h<=u*.7?"A":h<=u*.9?"B":"C",_=c.get(v.code)??0,k=_>0?Math.round((v.amt-_)/_*1e3)/10:null;return{code:v.code,name:v.name,volumeMl:v.vol,amount:v.amt,qty:v.qty,sharePct:m,rank:w,prevAmount:_,growthRate:k}})}function Pp(e,t,n){const s=new Date,r=s.toISOString().slice(0,10);let i=r,c=r,d="";switch(e){case"week":{const v=new Date(s);v.setDate(v.getDate()-7),i=v.toISOString().slice(0,10),c=r,d="直近7日間";break}case"month":{i=r.slice(0,7)+"-01",c=r,d="当月";break}case"90days":{const v=new Date(s);v.setDate(v.getDate()-90),i=v.toISOString().slice(0,10),c=r,d="直近90日間";break}case"year":{const v=new Date(s);v.setFullYear(v.getFullYear()-1),i=v.toISOString().slice(0,10),c=r,d="直近1年間";break}case"custom":{i=t||r,c=n||r,d=`${i} 〜 ${c}`;break}}const u=new Date(i);u.setFullYear(u.getFullYear()-1);const h=new Date(c);return h.setFullYear(h.getFullYear()-1),{start:i,end:c,prevStart:u.toISOString().slice(0,10),prevEnd:h.toISOString().slice(0,10),label:d}}function Ep(e,t="all",n=[],s="year",r,i,c=[]){const d=Pp(s,r,i),u=n.length>0?Sp(n,d.start,d.end,d.prevStart,d.prevEnd):e.map(E=>({code:E.code,name:E.name,volumeMl:E.volumeMl,amount:E.yearAmount,qty:E.yearQty,sharePct:E.sharePct,rank:E.rank,prevAmount:E.prevAmount,growthRate:E.growthRate})),h=u.filter(E=>E.rank==="A").length,v=u.filter(E=>E.rank==="B").length,m=u.filter(E=>E.rank==="C").length,w=u.filter(E=>E.growthRate!=null&&E.growthRate>10),_=u.filter(E=>E.growthRate!=null&&E.growthRate<-10);let k=u,C="全商品";switch(t){case"A":k=u.filter(E=>E.rank==="A"),C="Aランク";break;case"B":k=u.filter(E=>E.rank==="B"),C="Bランク";break;case"C":k=u.filter(E=>E.rank==="C"),C="Cランク";break;case"growing":k=w,C="成長商品(+10%以上)";break;case"declining":k=_,C="衰退商品(-10%以下)";break}const S=(E,B,o)=>`<button class="button ${t===E?"primary":"secondary"} small" data-product-filter="${E}">${B} (${o})</button>`,A=(E,B)=>`<button class="button ${s===E?"primary":"secondary"} small" data-product-period="${E}">${B}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${A("week","週次")}
        ${A("month","月次")}
        ${A("90days","90日")}
        ${A("year","年間")}
        ${A("custom","指定期間")}
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
        <p class="kpi-value">${v} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${w.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${_.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${C} (${k.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${S("all","全て",u.length)}
        ${S("A","A",h)}
        ${S("B","B",v)}
        ${S("C","C",m)}
        ${S("growing","成長",w.length)}
        ${S("declining","衰退",_.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${re("rank","ABC",c)}
              ${re("name","商品名",c)}
              ${re("amount","売上",c,"numeric")}
              ${re("sharePct","構成比",c,"numeric")}
              ${re("qty","本数",c,"numeric")}
              ${re("growthRate","前年同期比",c,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${zt(k,c,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(E=>`
              <tr>
                <td>${jr(E.rank)}</td>
                <td>${E.name?E.name.slice(0,25):E.code}${E.volumeMl?` <small>${E.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${zr(E.amount)}</td>
                <td class="numeric">${E.sharePct}%</td>
                <td class="numeric">${E.qty.toLocaleString()}</td>
                <td class="numeric">${Fr(E.growthRate)}</td>
              </tr>
            `).join("")}
            ${k.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Lp(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,s="billing",r="jan"){const i=e.filter(_=>_.currentRank==="A").length,c=e.filter(_=>_.prevRank&&_.currentRank<_.prevRank).length,d=e.filter(_=>_.prevRank&&_.currentRank>_.prevRank).length,u=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,h=2011,v=[];for(let _=u;_>=h&&v.length<6;_--)v.push(_);const m=`
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;">
      <span style="font-size:13px;color:var(--text-secondary);margin-right:4px;">年度：</span>
      ${v.map(_=>`
        <button class="button ${_===n?"primary":"secondary"} small"
          data-action="efficiency-year-change" data-year="${_}"
          style="min-width:80px;">
          ${_}年度
        </button>
      `).join("")}
      <select data-action="efficiency-year-select"
        style="margin-left:8px;padding:4px 8px;border-radius:4px;border:1px solid var(--border);background:var(--surface);font-size:13px;">
        <option value="">過去年度…</option>
        ${Array.from({length:u-h+1},(_,k)=>u-k).filter(_=>!v.includes(_)).map(_=>`<option value="${_}" ${_===n?"selected":""}>${_}年度</option>`).join("")}
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
        <p class="kpi-value">${c} ${s==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${d} ${s==="billing"?"社":"店舗"}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>${s==="billing"?"得意先":"店舗（納品先）"}ABC分析（${n}${r==="jan"?"年・1〜12月":r==="oct"?"酒造年度・10〜翌9月":"年度・4〜翌3月"}）</h2></div>
      ${m}
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${re("currentRank","ABC",t)}
              ${re("name","得意先名",t)}
              ${re("yearAmount","年間売上",t,"numeric")}
              ${re("sharePct","構成比",t,"numeric")}
              ${re("orderDays","受注日数",t,"numeric")}
              ${re("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${zt(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(_=>`
              <tr>
                <td>${jr(_.currentRank)}</td>
                <td>${_.name||_.code}</td>
                <td class="numeric">${zr(_.yearAmount)}</td>
                <td class="numeric">${_.sharePct}%</td>
                <td class="numeric">${_.orderDays}日</td>
                <td class="numeric">${Fr(_.growthRate)}</td>
                <td>${kp(_.currentRank,_.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Bs(e){return/純米大吟醸|純大/.test(e)?"純米大吟醸":/大吟醸/.test(e)?"大吟醸":/純米吟醸/.test(e)?"純米吟醸":/吟醸/.test(e)?"吟醸":/純米/.test(e)?"純米":/本醸造/.test(e)?"本醸造":/普通酒|佳撰|上撰/.test(e)?"普通酒":/原酒/.test(e)?"原酒":/ﾘｷｭｰﾙ|リキュール|ウメ|梅|レモン|ゆず/.test(e)?"リキュール":"その他"}function Ap(e){return!e||e<=0?"度数不明":e<10?"~10%":e<14?"10-14%":e<15?"14-15%":e<16?"15-16%":e<17?"16-17%":e<18?"17-18%":"18%~"}function Cp(e,t){const n=e.filter(m=>m.isActive),s=n.filter(m=>m.productType==="base_sake"||m.name&&m.name.includes("原酒")),r=new Map,i=["純米大吟醸","大吟醸","純米吟醸","吟醸","純米","本醸造","普通酒","原酒","リキュール","その他"];for(const m of n){const w=Bs(m.name),_=Ap(m.alcoholDegree),k=`${w}|${_}`;if(!r.has(k)){const C=s.filter(S=>{if(!S.alcoholDegree||!m.alcoholDegree)return!1;const A=Bs(S.name),E=A===w||w==="純米大吟醸"&&A==="大吟醸"||w==="純米吟醸"&&(A==="吟醸"||A==="純米")||A==="原酒",B=Math.abs(S.alcoholDegree-m.alcoholDegree)<=3;return E&&B}).sort((S,A)=>{const E=Math.abs((S.alcoholDegree??0)-(m.alcoholDegree??0)),B=Math.abs((A.alcoholDegree??0)-(m.alcoholDegree??0));return E-B});r.set(k,{sakeType:w,degRange:_,products:[],baseSakes:C})}r.get(k).products.push(m)}const c=Array.from(r.values()).sort((m,w)=>{const _=i.indexOf(m.sakeType),k=i.indexOf(w.sakeType);return _!==k?_-k:m.degRange.localeCompare(w.degRange)}),d=n.filter(m=>m.baseSakeId).length,u=n.filter(m=>m.productType==="pb").length,h=c.filter(m=>m.sakeType!=="その他"||m.products.length>5).map(m=>{const w=`${m.sakeType}|${m.degRange}`,_=w===t,k=m.products.filter(S=>S.baseSakeId).length,C=k>0?`<span style="font-size:0.7rem;color:#059669;">${k}/${m.products.length}紐付済</span>`:`<span style="font-size:0.7rem;color:#dc2626;">${m.products.length}件未紐付</span>`;return`
        <div class="pl-group-card${_?" pl-selected":""}" data-pl-group="${w}">
          <div class="pl-group-title">${m.sakeType}</div>
          <div class="pl-group-deg">${m.degRange}</div>
          <div class="pl-group-count">${m.products.length}商品 ${C}</div>
          ${m.baseSakes.length>0?`<div class="pl-group-sake">原酒候補: ${m.baseSakes.length}件</div>`:'<div class="pl-group-sake" style="color:#9ca3af;">原酒候補なし</div>'}
        </div>`}).join(""),v=t?Dp(c.find(m=>`${m.sakeType}|${m.degRange}`===t),e):'<div class="pl-detail-empty">左のグループを選択すると商品一覧と原酒候補が表示されます</div>';return`
    <section class="page-head">
      <div>
        <p class="eyebrow">商品管理</p>
        <h1>製成種別・原酒紐付け</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">有効商品</p>
        <p class="kpi-value">${n.length}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原酒</p>
        <p class="kpi-value">${s.length}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原酒紐付済</p>
        <p class="kpi-value">${d} <span style="font-size:0.6em;color:var(--text-muted)">/ ${n.length}</span></p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">PB商品</p>
        <p class="kpi-value">${u}</p>
      </article>
    </section>

    <section class="panel" style="padding:0;overflow:hidden;">
      <div class="pl-layout">
        <div class="pl-sidebar">
          <div class="pl-sidebar-header">製成種別×度数帯</div>
          <div class="pl-group-list">${h}</div>
        </div>
        <div class="pl-detail">${v}</div>
      </div>
    </section>

    <style>
      .pl-layout { display: grid; grid-template-columns: 280px 1fr; min-height: 500px; }
      @media (max-width: 768px) { .pl-layout { grid-template-columns: 1fr; } .pl-sidebar { max-height: 240px; overflow-y: auto; } }
      .pl-sidebar { border-right: 1px solid var(--border, #e5e7eb); overflow-y: auto; }
      .pl-sidebar-header { padding: 12px 16px; font-weight: 700; font-size: 0.85rem; border-bottom: 1px solid var(--border); background: var(--bg-subtle, #f9fafb); }
      .pl-group-list { padding: 4px; }
      .pl-group-card { padding: 10px 12px; border-radius: 6px; cursor: pointer; margin-bottom: 2px; transition: background 0.1s; }
      .pl-group-card:hover { background: var(--bg-hover, #f3f4f6); }
      .pl-group-card.pl-selected { background: #dbeafe; border-left: 3px solid #2563eb; }
      .pl-group-title { font-weight: 700; font-size: 0.9rem; }
      .pl-group-deg { font-size: 0.75rem; color: var(--text-muted); }
      .pl-group-count { font-size: 0.8rem; margin-top: 2px; }
      .pl-group-sake { font-size: 0.7rem; color: #059669; margin-top: 1px; }
      .pl-detail { padding: 16px; overflow-y: auto; }
      .pl-detail-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); font-size: 0.9rem; }
      .pl-section-title { font-size: 0.85rem; font-weight: 700; margin: 16px 0 8px; padding-bottom: 4px; border-bottom: 2px solid var(--border); }
      .pl-section-title:first-child { margin-top: 0; }
      .pl-recommend { background: #fef3c7; border: 1px solid #fde68a; border-radius: 6px; padding: 2px 8px; font-size: 0.7rem; color: #92400e; font-weight: 600; }
      .pl-link-btn { font-size: 0.75rem; padding: 2px 8px; }
    </style>
  `}function Dp(e,t){if(!e)return'<div class="pl-detail-empty">グループが見つかりません</div>';const n=e.baseSakes.length>0?e.baseSakes.map(r=>`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric">${r.alcoholDegree??"―"}%</td>
          <td class="numeric">${r.volumeMl?`${r.volumeMl}ml`:""}</td>
          <td>${r===e.baseSakes[0]?'<span class="pl-recommend">おすすめ</span>':""}</td>
        </tr>
      `).join(""):'<tr><td colspan="5" style="color:var(--text-muted);text-align:center;padding:12px;">この種別×度数帯に一致する原酒がありません</td></tr>',s=e.products.sort((r,i)=>r.code.localeCompare(i.code)).map(r=>{const i=r.baseSakeId?t.find(u=>u.id===r.baseSakeId):null,c=r.parentProductId?t.find(u=>u.id===r.parentProductId):null,d=r.productType==="pb"?'<span style="background:#7c3aed;color:#fff;padding:1px 5px;border-radius:8px;font-size:0.65rem;font-weight:700;">PB</span>':r.productType==="base_sake"?'<span style="background:#dc2626;color:#fff;padding:1px 5px;border-radius:8px;font-size:0.65rem;font-weight:700;">原酒</span>':"";return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name} ${d}</td>
          <td class="numeric">${r.alcoholDegree??"―"}%</td>
          <td class="numeric">${r.volumeMl?`${r.volumeMl}ml`:""}</td>
          <td>${i?`<span style="color:#059669;font-size:0.8rem;">[${i.code}] ${i.name.slice(0,15)}</span>`:e.baseSakes.length>0?`<button class="button secondary small pl-link-btn" data-link-sake="${r.id}" data-sake-id="${e.baseSakes[0].id}">紐付け</button>`:'<span style="color:#9ca3af;font-size:0.75rem;">―</span>'}</td>
          <td>${c?`<span style="color:#7c3aed;font-size:0.8rem;">[${c.code}]</span>`:""}</td>
          <td><button class="button secondary small" data-edit-product="${r.id}">編集</button></td>
        </tr>`}).join("");return`
    <h3 style="margin:0 0 4px;font-size:1rem;">${e.sakeType} ― ${e.degRange}</h3>
    <p style="color:var(--text-muted);font-size:0.8rem;margin:0 0 12px;">${e.products.length}商品 / 原酒候補${e.baseSakes.length}件</p>

    <div class="pl-section-title">原酒候補</div>
    <div class="table-wrap">
      <table style="font-size:0.85rem;">
        <thead><tr><th>コード</th><th>原酒名</th><th class="numeric">度数</th><th class="numeric">容量</th><th></th></tr></thead>
        <tbody>${n}</tbody>
      </table>
    </div>

    <div class="pl-section-title">このグループの商品</div>
    <div class="table-wrap">
      <table style="font-size:0.85rem;">
        <thead><tr><th>コード</th><th>商品名</th><th class="numeric">度数</th><th class="numeric">容量</th><th>原酒</th><th>親商品</th><th></th></tr></thead>
        <tbody>${s}</tbody>
      </table>
    </div>
  `}function qp(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Va(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Tp(e,t,n=null,s=null){const r=e.length?e.map(i=>`
            <tr class="clickable-row${i.documentNo===n?" selected-row":""}"
                data-doc-no="${i.documentNo}">
              <td class="mono">${i.documentNo}</td>
              <td>${qp(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${i.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Va(i.amount)}</td>
            </tr>
            ${i.documentNo===n?Ip(s):""}
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
  `}function Ip(e){if(!e)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(s=>`
      <tr>
        <td class="mono" style="width:40px">${s.lineNo}</td>
        <td class="mono" style="width:70px">${s.productCode}</td>
        <td class="product-name">${s.productName}</td>
        <td class="numeric" style="width:50px">${s.quantity}</td>
        <td class="numeric" style="width:80px">${Va(s.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Va(s.amount)}</td>
      </tr>`).join(""),n=e.reduce((s,r)=>s+r.amount,0);return`<tr class="line-detail-row"><td colspan="5">
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
            <td class="numeric">${Va(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function Mp(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Np(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function Vr(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function Yr(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function zs(e){const t=Vr(Yr(e),6);return t.setHours(23,59,59,999),t}function js(e){return new Date(`${e}T00:00:00`)}function Fs(e){return`${e.getMonth()+1}/${e.getDate()}`}function Rp(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Op(){const e=new Date,t=Yr(Np(Mp(e),-3)),n=zs(new Date(e.getFullYear(),e.getMonth()+4,0)),s=[];let r=new Date(t);for(;r<=n;){const i=zs(r);s.push({start:new Date(r),end:i,label:`${Fs(r)} - ${Fs(i)}`}),r=Vr(r,7)}return s}function Bp(e){const t=Op(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,s=t.map(i=>`
        <div class="gantt-week">
          <span>${i.label}</span>
        </div>
      `).join(""),r=e.length?e.map(i=>{const c=js(i.startDate),d=js(i.expectedDoneDate),u=Math.max(0,t.findIndex(m=>m.end>=c)),h=Math.max(u,t.reduce((m,w,_)=>w.start<=d?_:m,u)),v=[`仕込番号: ${i.jikomiNo}`,`銘柄: ${i.productName}`,`期間: ${i.startDate} - ${i.expectedDoneDate}`,`タンク: ${i.tankNo}`,`備考: ${i.note||"なし"}`].join(`
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
                  title="${Rp(v)}"
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
          ${s}
        </div>
        ${r}
      </div>
    </section>
  `}function Vs(e,t){const n={planned:"neutral",active:"warning",done:"success"},s=e.map(d=>`
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
          <span class="status-pill ${n[d.status]}">${er[d.status]}</span>
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
          <tbody>${s||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Dt(e){return e.toLocaleString("ja-JP")}const zp=["純米大吟醸酒","大吟醸酒","純米吟醸酒","吟醸酒","特別純米酒","純米酒","特別本醸造酒","本醸造酒","普通酒"];function jp(e,t=[],n=!1,s){const r={pending:"検定待ち",submitted:"検定済",approved:"酒類検定済"},i={pending:"neutral",submitted:"warning",approved:"success"},c=e.map(m=>`
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:5px 6px;font-size:11px;font-weight:600;">${m.batchCode||m.kenteiNo}</td>
      <td style="padding:5px 6px;font-size:11px;">${m.productName||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;">${m.kenteiDate||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;">${m.productionTypeName||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.alcoholDegree||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.sakaMeterValue||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.acidity||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.aminoAcid||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;">${m.riceType||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.volume>0?Dt(m.volume):"―"}</td>
      <td style="padding:5px 6px;"><span class="status-pill ${i[m.status]}">${r[m.status]}</span></td>
      <td style="padding:5px 4px;white-space:nowrap;">
        <button class="button-sm secondary" data-action="kentei-edit" data-id="${m.id}" style="margin-right:3px;">編集</button>
        ${m.status!=="approved"?`<button class="button-sm primary" data-action="kentei-register" data-id="${m.id}">酒類検定</button>`:""}
      </td>
    </tr>`).join(""),d=zp.map(m=>`<option value="${m}" ${s?.productionTypeName===m?"selected":""}>${m}</option>`).join(""),u=new Date().toISOString().slice(0,10),h=n?`
    <section class="panel" style="margin-bottom:16px;border:2px solid #2563eb;">
      <div class="panel-header"><h2>${s?"検定記録編集":"検定記録登録"}</h2></div>
      <input type="hidden" id="kentei-edit-id" value="${s?.id??""}">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:6px;padding:8px 0;font-size:11px;">
        <label>仕込番号<br><input id="kf-batch" type="text" value="${s?.batchCode??""}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>銘柄名<br><input id="kf-name" type="text" value="${s?.productName??""}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>検定日<br><input id="kf-date" type="date" value="${s?.kenteiDate??u}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>特定名称<br><select id="kf-type" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"><option value="">選択</option>${d}</select></label>
        <label>ｱﾙｺｰﾙ度数<br><input id="kf-alc" type="number" step="0.1" value="${s?.alcoholDegree??""}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>日本酒度<br><input id="kf-sake" type="number" step="0.1" value="${s?.sakaMeterValue??""}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>酸度<br><input id="kf-acid" type="number" step="0.01" value="${s?.acidity??""}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>ｱﾐﾉ酸度<br><input id="kf-amino" type="number" step="0.01" value="${s?.aminoAcid??""}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>使用米<br><input id="kf-rice" type="text" value="${s?.riceType??""}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>精米歩合<br><input id="kf-polish" type="number" step="0.01" value="${s?.polishRate??""}" placeholder="0.60" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>数量(L)<br><input id="kf-vol" type="number" step="1" value="${s?.volume??""}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
      </div>
      <div style="display:flex;gap:8px;padding:4px 0;">
        <button class="button primary" data-action="kentei-save" style="font-size:11px;padding:5px 14px;">保存</button>
        <button class="button secondary" data-action="kentei-cancel" style="font-size:11px;padding:5px 10px;">閉じる</button>
      </div>
    </section>`:"",v=t.map(m=>`
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:5px 6px;font-size:11px;font-weight:600;">${m.batchCode}</td>
      <td style="padding:5px 6px;font-size:11px;">${m.productName}</td>
      <td style="padding:5px 6px;font-size:11px;">${m.productionTypeName||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;">${m.genshuCategory||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;">${m.productionDate||m.kenteiDate||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;">${m.tankNo||"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.alcoholDegree??"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.producedVolumeL>0?Dt(m.producedVolumeL):Dt(m.volumeL)}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.pureAlcoholL>0?m.pureAlcoholL.toFixed(1):"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.convertedVolumeL>0?Dt(m.convertedVolumeL):"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.rawAlcoholL>0?m.rawAlcoholL.toFixed(1):"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.blendingWaterL>0?Dt(m.blendingWaterL):"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.kasuKg>0?Dt(m.kasuKg):"―"}</td>
      <td style="padding:5px 6px;font-size:11px;text-align:right;">${m.kasuRatio>0?m.kasuRatio.toFixed(1)+"%":"―"}</td>
      <td style="padding:5px 6px;font-size:11px;">${m.riceType||"―"}</td>
      <td style="padding:5px 4px;">
        <button class="button-sm secondary" data-action="genzaishu-edit" data-id="${m.id}" style="font-size:10px;">編集</button>
      </td>
    </tr>`).join("");return`
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>検定管理・酒類検定</h1></div>
      <button class="button primary" data-action="kentei-show-form">＋ 検定記録</button>
    </section>

    ${h}

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>検定記録</h2><p class="panel-caption">${e.length}件</p></div>
      <div class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:800px;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:9px;color:#6b7280;text-align:left;">
            <th style="padding:3px 6px;">仕込番号</th><th style="padding:3px 6px;">銘柄</th><th style="padding:3px 6px;">検定日</th>
            <th style="padding:3px 6px;">特定名称</th><th style="padding:3px 6px;text-align:right;">度数</th>
            <th style="padding:3px 6px;text-align:right;">日本酒度</th><th style="padding:3px 6px;text-align:right;">酸度</th>
            <th style="padding:3px 6px;text-align:right;">ｱﾐﾉ酸度</th><th style="padding:3px 6px;">使用米</th>
            <th style="padding:3px 6px;text-align:right;">数量</th><th style="padding:3px 6px;">状態</th><th></th>
          </tr></thead>
          <tbody>${c||'<tr><td colspan="12" style="padding:20px;text-align:center;color:#9ca3af;">検定記録がありません</td></tr>'}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div><h2>酒類検定簿</h2><p class="panel-caption">検定完了→登録された酒（移動簿の銘柄に連動）</p></div>
        <button class="button secondary" data-action="genzaishu-print" style="font-size:11px;">印刷</button>
      </div>
      <div class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:1000px;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:9px;color:#6b7280;text-align:left;">
            <th style="padding:3px 6px;">仕込番号</th><th style="padding:3px 6px;">銘柄</th><th style="padding:3px 6px;">特定名称</th>
            <th style="padding:3px 6px;">原酒区分</th><th style="padding:3px 6px;">製成日</th><th style="padding:3px 6px;">タンク</th>
            <th style="padding:3px 6px;text-align:right;">度数</th><th style="padding:3px 6px;text-align:right;">製成数量</th>
            <th style="padding:3px 6px;text-align:right;">純ｱﾙｺｰﾙ</th><th style="padding:3px 6px;text-align:right;">換算数量</th>
            <th style="padding:3px 6px;text-align:right;">原料ｱﾙｺｰﾙ</th><th style="padding:3px 6px;text-align:right;">組み水</th>
            <th style="padding:3px 6px;text-align:right;">粕(kg)</th><th style="padding:3px 6px;text-align:right;">粕歩合</th>
            <th style="padding:3px 6px;">使用米</th><th></th>
          </tr></thead>
          <tbody>${v||'<tr><td colspan="16" style="padding:20px;text-align:center;color:#9ca3af;">酒類検定簿に登録がありません</td></tr>'}</tbody>
        </table>
      </div>
    </section>`}function Fp(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Vp(e,t){return`
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
        ${e?`<p class="field-error">${Fp(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function Yp(e){return`
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
  `}const Up={base_sake:"原酒",standard:"マスター商品",pb:"PB商品",material:"資材",misc:"その他"},Ys={bottle:"瓶",cap:"キャップ",label:"ラベル",box:"箱・カートン",other:"その他"};function pn(e,t,n){const s=(t??[]).filter(c=>c.id!==e.id&&(c.productType==="base_sake"||c.name.includes("原酒"))).map(c=>`<option value="${c.id}" ${e.baseSakeId===c.id?"selected":""}>[${c.code}] ${c.name}</option>`).join(""),r=(t??[]).filter(c=>c.id!==e.id&&c.productType!=="pb"&&c.productType!=="material").map(c=>`<option value="${c.id}" ${e.parentProductId===c.id?"selected":""}>[${c.code}] ${c.name}</option>`).join(""),i=(n??[]).map(c=>`
    <tr data-material-id="${c.id}">
      <td>${Ys[c.materialType]||c.materialType}</td>
      <td>${c.materialName}</td>
      <td class="mono">${c.materialCode||""}</td>
      <td>${c.supplierName||""}</td>
      <td class="numeric">${c.unitCost?`¥${c.unitCost.toLocaleString()}`:"―"}</td>
      <td class="numeric">${c.quantityPerProduct}</td>
      <td><button type="button" class="button secondary small" data-delete-material="${c.id}">削除</button></td>
    </tr>
  `).join("");return`
    <div class="modal-overlay" id="edit-modal">
      <div class="modal-content panel" style="max-width:720px;max-height:90vh;overflow-y:auto;">
        <h2>商品編集: [${e.code}] ${e.name}</h2>
        <form id="edit-product-form" class="feature-form">
          <input type="hidden" id="ep-id" value="${e.id}" />

          <fieldset style="border:1px solid var(--border);border-radius:6px;padding:12px;margin:0 0 12px;">
            <legend style="font-weight:700;font-size:13px;">商品種別・階層</legend>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div class="form-row">
                <label>商品種別</label>
                <select id="ep-product-type">
                  ${Object.entries(Up).map(([c,d])=>`<option value="${c}" ${e.productType===c?"selected":""}>${d}</option>`).join("")}
                </select>
              </div>
              <div class="form-row">
                <label>原酒リンク</label>
                <select id="ep-base-sake"><option value="">―なし―</option>${s}</select>
              </div>
              <div class="form-row" style="grid-column:1/-1;">
                <label>親商品（PBの場合）</label>
                <select id="ep-parent-product"><option value="">―なし―</option>${r}</select>
              </div>
            </div>
          </fieldset>

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

          <fieldset style="border:1px solid var(--border);border-radius:6px;padding:12px;margin:12px 0;">
            <legend style="font-weight:700;font-size:13px;">資材（瓶・キャップ・ラベル）</legend>
            ${n===null?'<p style="color:var(--text-muted);font-size:0.85rem;">読み込み中...</p>':n&&n.length>0?`<div class="table-wrap"><table style="font-size:0.85rem;">
                    <thead><tr><th>種別</th><th>資材名</th><th>品番</th><th>仕入先</th><th class="numeric">単価</th><th class="numeric">数量</th><th></th></tr></thead>
                    <tbody>${i}</tbody>
                  </table></div>`:'<p style="color:var(--text-muted);font-size:0.85rem;">資材未登録</p>'}
            <div style="margin-top:8px;padding:8px;background:var(--bg-subtle,#f9fafb);border-radius:6px;">
              <div style="font-size:0.8rem;font-weight:600;margin-bottom:6px;">資材を追加</div>
              <div style="display:grid;grid-template-columns:auto 1fr 1fr;gap:6px;align-items:end;">
                <div class="form-row">
                  <label>種別</label>
                  <select id="mat-type" style="font-size:0.85rem;">
                    ${Object.entries(Ys).map(([c,d])=>`<option value="${c}">${d}</option>`).join("")}
                  </select>
                </div>
                <div class="form-row"><label>資材名</label><input type="text" id="mat-name" placeholder="茶瓶 720ml" style="font-size:0.85rem;" /></div>
                <div class="form-row"><label>仕入先</label><input type="text" id="mat-supplier" placeholder="東洋ガラス" style="font-size:0.85rem;" /></div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:6px;margin-top:6px;align-items:end;">
                <div class="form-row"><label>品番</label><input type="text" id="mat-code" style="font-size:0.85rem;" /></div>
                <div class="form-row"><label>単価</label><input type="number" id="mat-cost" value="0" style="font-size:0.85rem;" /></div>
                <div class="form-row"><label>数量/本</label><input type="number" id="mat-qty" value="1" style="font-size:0.85rem;" /></div>
                <button type="button" class="button primary small" data-action="add-material" style="height:32px;">追加</button>
              </div>
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
  `}const hs={query:"",businessType:"",tradeType:"",areaCode:"",activeOnly:"",page:1},ia=50;function Jp(e,t){let n=e;if(t.query){const d=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(d)||u.name.toLowerCase().includes(d)||u.kanaName&&u.kanaName.toLowerCase().includes(d)||u.address1&&u.address1.toLowerCase().includes(d)||u.phone&&u.phone.toLowerCase().includes(d))}t.businessType&&(n=n.filter(d=>d.businessType===t.businessType)),t.tradeType&&(n=n.filter(d=>d.tradeType===t.tradeType)),t.areaCode&&(n=n.filter(d=>d.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(d=>d.isActive):t.activeOnly==="inactive"&&(n=n.filter(d=>!d.isActive));const s=Math.max(1,Math.ceil(n.length/ia)),i=(Math.min(t.page,s)-1)*ia,c=n.slice(i,i+ia);return{filtered:n,paged:c,totalPages:s}}function Us(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const s=(t-1)*ia+1,r=Math.min(t*ia,e),i=[];for(let c=1;c<=n;c++)c===1||c===n||c>=t-2&&c<=t+2?i.push(`<button class="button ${c===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${c}" style="min-width:36px;padding:4px 8px;">${c}</button>`):(c===t-3||c===t+3)&&i.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${s}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${i.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function Hp(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),s=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
          ${Object.entries(Kp).map(([r,i])=>`<option value="${r}" ${t.tradeType===r?"selected":""}>${i}</option>`).join("")}
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
  `}function Rn(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Qp(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}const Kp={B2B:"B2B（卸）",B2B2C:"B2B2C（生産者）",B2C:"B2C（小売）"};function Wp(e){return e?`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${{B2B:"#3b82f6",B2B2C:"#8b5cf6",B2C:"#10b981"}[e]??"#999"};">${e}</span>`:"―"}function Gp(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${Wp(t.tradeType)}</td>
          <td>${Qp(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${Rn(t.address1||"",16)}</td>
          <td>${Rn(t.address2||"",12)}</td>
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
      `).join("")}function Pa(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function Xp(e){const t={base_sake:"#dc2626",standard:"#2563eb",pb:"#7c3aed",material:"#059669",misc:"#6b7280"},n={base_sake:"原酒",standard:"標準",pb:"PB",material:"資材",misc:"他"},s=t[e]??"#999",r=n[e]??e;return`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${s};">${r}</span>`}function Zp(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${Rn(t.name,20)}</td>
          <td>${Xp(t.productType)}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${Pa(t.purchasePrice)}</td>
          <td class="numeric">${Pa(t.salePrice)}</td>
          <td class="numeric">${Pa(t.listPrice)}</td>
          <td class="numeric">${Pa(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function eu(e,t,n=hs,s=[]){const{filtered:r,paged:i,totalPages:c}=Jp(e.customers,n);return`
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
        ${Hp(e.customers,n)}
        ${Us(r.length,n.page,c)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${re("code","コード",s)}
                ${re("name","得意先名",s)}
                ${re("kanaName","カナ",s)}
                <th>略称</th>
                ${re("businessType","業態",s)}
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
                ${re("areaName","地区",s)}
                ${re("closingDay","締日",s,"numeric")}
                ${re("paymentDay","支払日",s,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Gp(zt(i,s,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${Us(r.length,n.page,c)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${re("code","コード",s)}
                ${re("name","商品名",s)}
                <th>種別</th>
                ${re("category","分類",s)}
                <th>酒税区分</th>
                ${re("alcoholDegree","度数",s,"numeric")}
                ${re("volumeMl","容量ml",s,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${re("purchasePrice","生産者価格",s,"numeric")}
                ${re("salePrice","卸価格",s,"numeric")}
                ${re("listPrice","定価(小売)",s,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Zp(zt(e.products,s,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function un(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function tu(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${hr.map(s=>`<option ${n?.materialType===s?"selected":""}>${s}</option>`).join("")}
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
  `}function au(e){const t=e.map(r=>{const c=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${un(r.unitCost)}</td>
          <td class="numeric">${un(r.currentStock*r.unitCost)}</td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${r.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(r=>r.minimumStock>0&&r.currentStock/r.minimumStock<1.5).length,s=e.reduce((r,i)=>r+i.currentStock*i.unitCost,0);return`
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
        <p class="kpi-value">${un(s)}</p>
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
  `}function nu(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function mn(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const su={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function ou(e){return`
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
          <td class="numeric">${mn(n.billedAmount)}</td>
          <td class="numeric">${mn(n.paymentAmount)}</td>
          <td class="numeric">${mn(n.balanceAmount)}</td>
          <td>${nu(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${su[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function st(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Js(e){return e.trim().toLowerCase()}function ru(e,t,n=[]){const s=Js(t),r=e.filter(d=>s?[d.code,d.name,d.kanaName,d.janCode,d.category].map(Js).some(u=>u.includes(s)):!0),i=!s&&n.length>0?`<div style="padding:8px 12px;border-bottom:2px solid var(--border,#e5e7eb);">
        <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted,#6b7280);margin-bottom:6px;">よく使う商品</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${n.map(d=>`<button class="freq-chip" type="button" data-action="picker-select" data-code="${st(d.code)}" data-name="${st(d.name)}">${st(d.name)} <small style="opacity:0.6">${d.count}回</small></button>`).join("")}
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
                      data-code="${st(d.code)}"
                      data-name="${st(d.name)}"
                    >
                      <td class="mono">${st(d.code)}</td>
                      <td>${st(d.name)}</td>
                      <td class="mono">${st(d.janCode)}</td>
                      <td>${st(d.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:i;return qr({title:"商品検索",searchQuery:t,placeholder:"コード・名前・カナ・カテゴリで検索",resultsHtml:c,emptyMessage:"該当する商品が見つかりません。"})}function gt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function iu(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},i={unpaid:"warning",partial:"neutral",paid:"success"},c=e.map(m=>`
      <tr>
        <td class="mono">${m.documentNo}</td>
        <td>${m.purchaseDate}</td>
        <td class="mono">${m.supplierCode}</td>
        <td>${m.supplierName}</td>
        <td>${m.itemName}</td>
        <td class="numeric">${m.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${gt(m.unitPrice)}</td>
        <td class="numeric"><strong>${gt(m.amount)}</strong></td>
        <td>
          <span class="status-pill ${s[m.status]}">${n[m.status]}</span>
        </td>
      </tr>
    `).join(""),d=t.map(m=>`
      <tr>
        <td class="mono">${m.supplierCode}</td>
        <td>${m.supplierName}</td>
        <td class="numeric">${gt(m.totalPurchase)}</td>
        <td class="numeric">${gt(m.paidAmount)}</td>
        <td class="numeric"><strong>${gt(m.balance)}</strong></td>
        <td>${m.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${i[m.status]}">${r[m.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${m.supplierCode}" ${m.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),u=e.reduce((m,w)=>m+w.amount,0),h=t.reduce((m,w)=>m+w.balance,0),v=t.filter(m=>m.status!=="paid").length;return`
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
        <p class="kpi-value">${gt(u)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${gt(h)}</p>
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
          <tbody>${d||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Kt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function lu(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},r=e.map(v=>`
      <tr>
        <td class="mono">${v.billNo}</td>
        <td>${v.supplierName}</td>
        <td class="numeric">${Kt(v.amount)}</td>
        <td>${v.issueDate}</td>
        <td>${v.dueDate}</td>
        <td>
          <span class="status-pill ${s[v.status]}">${n[v.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${v.id}" ${v.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),i=t.map(v=>{const m=v.minimumStock>0&&v.currentStock<v.minimumStock*1.2;return`
        <tr>
          <td class="mono">${v.code}</td>
          <td>${v.name}</td>
          <td class="numeric ${m?"text-danger":""}">
            ${v.currentStock.toLocaleString("ja-JP")} ${v.unit}
            ${m?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${v.minimumStock.toLocaleString("ja-JP")} ${v.unit}</td>
          <td class="numeric">${Kt(v.unitCost)}</td>
          <td class="numeric">${Kt(v.currentStock*v.unitCost)}</td>
          <td>${v.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=e.filter(v=>v.status==="holding"),d=c.reduce((v,m)=>v+m.amount,0),u=t.reduce((v,m)=>v+m.currentStock*m.unitCost,0),h=t.filter(v=>v.minimumStock>0&&v.currentStock<v.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${Kt(d)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${Kt(u)}</p>
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
  `}function On(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Me(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Bn(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${Me(e)}</pre>
    </div>
  `}function cu(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function Ea(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${Me(e)}</code>
      ${cu(e)}
    </div>
  `}function qt(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${Me(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${Me(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${Me(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?Bn(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${Me(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${Me(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function La(e){return`
    <div class="setup-step setup-step-compact" data-step="${Me(e.stepLabel)}">
      <h3>${Me(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${Me(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function Aa(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function Hs(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function du(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?On(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Aa(e.lastOverallSync)}">${Hs(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${Aa(e.lastOverallSync)==="success"?"1時間以内":Aa(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${Me(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?On(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Aa(t.lastSyncAt)}">${Hs(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function pu(e){if(!e.length)return"";const t=r=>r==="ok"?"&#x2705;":r==="warn"?"&#x26A0;&#xFE0F;":"&#x274C;",n=r=>r==="ok"?"success":r==="warn"?"warning":"error",s=e.every(r=>r.status==="ok");return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>システム稼働状況</h2>
          <p class="panel-caption">${s?"全機能正常稼働中":"一部要確認"}</p>
        </div>
        <span class="status-pill ${s?"success":"warning"}" style="font-size:1.1em">
          ${s?"ALL OK":"要確認"}
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
  `}function uu(e,t,n,s,r){const i={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${r?pu(r):""}

    ${s?du(s):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${On(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${i[e.status]}</span>
        </p>
        <p class="kpi-sub">${Me(e.message)}</p>
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
      ${La({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${Ea("git --version")}
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
      ${La({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${Ea("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${La({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${Ea("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${Ea("python get-pip.py")}
        `})}
      ${La({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${qt({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${qt({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${qt({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${qt({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${qt({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${qt({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${Bn(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${Bn(`{
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
            <span class="config-value">${Me(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${Me(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${Me(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${Me(n)}"
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
  `}function aa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ur(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function mu(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(m=>m.amount),1),s=28,r=6,i=140,c=100,d=760,u=d-i-c,h=t.length*(s+r)+16,v=t.map((m,w)=>{const _=m.amount/n*u,k=w*(s+r)+8,C=m.abcRank==="A"?"#2F855A":m.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${i-8}" y="${k+s/2+5}" class="chart-axis" text-anchor="end">${m.name.length>10?m.name.slice(0,10)+"…":m.name}</text>
          <rect x="${i}" y="${k}" width="${_}" height="${s}" rx="4" fill="${C}" opacity="0.85" />
          <text x="${i+_+8}" y="${k+s/2+5}" class="chart-axis">${(m.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${d} ${h}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${v}
    </svg>
  `}function Jr(e,t,n="得意先"){if(e.length===0||t.length===0)return'<p class="empty-row">データなし</p>';const s=t.map(u=>`<th class="numeric">${u}</th>`).join(""),r=t.map((u,h)=>e.reduce((v,m)=>v+(m.values[h]??0),0)),i=r.reduce((u,h)=>u+h,0),c=e.map(u=>{const h=u.values.reduce((m,w)=>m+w,0),v=u.values.map(m=>`<td class="numeric">${m>0?(m/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`<tr>
      <td>${u.label}</td>
      ${v}
      <td class="numeric"><strong>${(h/1e4).toFixed(0)}万</strong></td>
    </tr>`}).join(""),d=r.map(u=>`<td class="numeric"><strong>${u>0?(u/1e4).toFixed(0)+"万":"—"}</strong></td>`).join("");return`
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>${n}</th>
            ${s}
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
  `}function yu(e){return Ur(e)}function hu(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,20),n=760,s=320,r={top:24,right:56,bottom:60,left:72},i=n-r.left-r.right,c=s-r.top-r.bottom,d=Math.max(...t.map(k=>k.amount),1),u=i/t.length,h=[0,.25,.5,.75,1].map(k=>{const C=r.top+c-c*k;return`<g>
      <line x1="${r.left}" y1="${C}" x2="${n-r.right}" y2="${C}" class="chart-grid" />
      <text x="4" y="${C+4}" class="chart-axis">${Math.round(d*k/1e4)}万</text>
    </g>`}).join(""),v=[0,25,50,70,90,100].map(k=>{const C=r.top+c-c*k/100,S=k===70||k===90;return`<g>
      <text x="${n-4}" y="${C+4}" class="chart-axis" text-anchor="end">${k}%</text>
      ${S?`<line x1="${r.left}" y1="${C}" x2="${n-r.right}" y2="${C}" stroke="${k===70?"#2F855A":"#B7791F"}" stroke-dasharray="6 3" stroke-width="1.5" opacity="0.6" />`:""}
    </g>`}).join(""),m=t.map((k,C)=>{const S=k.amount/d*c,A=Math.max(u-10,16),E=r.left+C*u+(u-A)/2,B=r.top+c-S,o=k.abcRank==="A"?"#2F855A":k.abcRank==="B"?"#B7791F":"#718096",l=k.name.length>6?k.name.slice(0,6)+"…":k.name;return`<g>
      <rect x="${E}" y="${B}" width="${A}" height="${S}" rx="4" fill="${o}" opacity="0.8" />
      <text x="${E+A/2}" y="${s-8}" class="chart-axis centered-axis pareto-label" transform="rotate(-35 ${E+A/2} ${s-16})">${l}</text>
    </g>`}).join(""),w=t.map((k,C)=>{const S=r.left+C*u+u/2,A=r.top+c-c*k.cumRatio/100;return`${S},${A}`}).join(" "),_=t.map((k,C)=>{const S=r.left+C*u+u/2,A=r.top+c-c*k.cumRatio/100;return`<circle cx="${S}" cy="${A}" r="3.5" fill="#C53D3D" />`}).join("");return`
    <svg viewBox="0 0 ${n} ${s}" class="sales-chart pareto-chart" role="img" aria-label="商品ABC パレート図">
      ${h}${v}${m}
      <polyline points="${w}" fill="none" stroke="#C53D3D" stroke-width="2.5" stroke-linejoin="round" />
      ${_}
    </svg>`}function fu(e){const t=e.ranking.filter(d=>d.abcRank==="A").length,n=e.ranking.filter(d=>d.abcRank==="B").length,s=e.ranking.filter(d=>d.abcRank==="C").length,r=e.ranking.filter(d=>d.abcRank==="A").reduce((d,u)=>d+u.amount,0),i=e.ranking.map(d=>`
    <tr>
      <td class="mono">${d.code}</td>
      <td>${d.name}</td>
      <td class="numeric">${aa(d.amount)}</td>
      <td class="numeric">${d.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${d.ratio.toFixed(1)}%</td>
      <td class="numeric">${d.cumRatio.toFixed(1)}%</td>
      <td><span class="status-pill ${yu(d.abcRank)}">${d.abcRank}</span></td>
    </tr>`).join(""),c=Jr(e.monthlyByProduct,e.months,"商品名");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">商品数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}品 <span class="kpi-sub">${(r/e.totalAmount*100).toFixed(1)}%</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}品</div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${s}品</div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>パレート図</h2><p class="panel-caption">棒：売上金額 / 線：累積構成比（上位20品）</p></div></div>
      <div class="chart-scroll">${hu(e.ranking)}</div>
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
    </section>`}function gu(e){const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,s=e.ranking.filter(u=>u.abcRank==="C").length,r=e.ranking.filter(u=>u.abcRank==="A").reduce((u,h)=>u+h.amount,0),i=e.ranking.filter(u=>u.abcRank==="B").reduce((u,h)=>u+h.amount,0),c=e.ranking.filter(u=>u.abcRank==="C").reduce((u,h)=>u+h.amount,0),d=e.ranking.map(u=>`
    <tr>
      <td class="mono">${u.code}</td>
      <td>${u.name}</td>
      <td class="numeric">${aa(u.amount)}</td>
      <td class="numeric">${u.ratio.toFixed(1)}%</td>
      <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
      <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
      <td><span class="status-pill ${Ur(u.abcRank)}">${u.abcRank}</span></td>
    </tr>`).join("");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">得意先数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${aa(r)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${aa(i)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${s}社 <span class="kpi-sub">${aa(c)}</span></div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先別売上ランキング</h2><p class="panel-caption">売上金額上位15社</p></div></div>
      <div class="chart-scroll">${mu(e.ranking)}</div>
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
      ${Jr(e.monthlyByCustomer,e.months,"得意先")}
    </section>`}function vu(e,t,n,s=""){const r=n==="customer"?gu(e):t?fu(t):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>',i=new Date().getFullYear(),c=Array.from({length:5},(w,_)=>String(i-_)),d=s.length===4?s:s.slice(0,4),u=s.length===7?s.slice(5,7):"",h=["01","02","03","04","05","06","07","08","09","10","11","12"],v={"01":"1月","02":"2月","03":"3月","04":"4月","05":"5月","06":"6月","07":"7月","08":"8月","09":"9月",10:"10月",11:"11月",12:"12月"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>ABC分析 <span style="font-size:0.75em;font-weight:400;color:var(--text-secondary);">${s?s.length===7?`${s.slice(0,4)}年${v[s.slice(5)]??s.slice(5)}`:`${s}年`:"全期間"}</span></h1>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <select id="analysis-period-year" class="input-sm">
          <option value="">全期間</option>
          ${c.map(w=>`<option value="${w}" ${d===w?"selected":""}>${w}年</option>`).join("")}
        </select>
        <select id="analysis-period-month" class="input-sm" ${d?"":"disabled"}>
          <option value="">全月</option>
          ${h.map(w=>`<option value="${w}" ${u===w?"selected":""}>${v[w]}</option>`).join("")}
        </select>
      </div>
    </section>

    <div class="tab-bar" style="margin-bottom:16px;">
      <button class="tab-btn ${n==="customer"?"active":""}" type="button" data-analysis-tab="customer">👥 得意先ABC分析</button>
      <button class="tab-btn ${n==="product"?"active":""}" type="button" data-analysis-tab="product">📦 商品ABC分析</button>
    </div>

    ${r}
  `}const bu={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},Qs={amount:"売上額",quantity:"出荷本数",volume:"移出量"},zn=10;function fs(e){const[t,n]=e.split("-").map(Number);return n>=zn?t:t-1}function xu(e){const t=zn-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(zn).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function wu(e,t,n){const s=c=>t==="quantity"?c.quantity:t==="volume"?c.volumeMl:c.amount,r=new Map;for(const c of e){const d=n==="fiscal"?`${fs(c.month)}年度`:c.month.slice(0,4);r.set(d,(r.get(d)??0)+s(c))}return{curr:[...r.entries()].sort((c,d)=>c[0].localeCompare(d[0])).map(([c,d])=>({month:c,amount:d}))}}function $u(e){const t=new Set;for(const n of e)t.add(fs(n.month));return[...t].sort((n,s)=>s-n).map(String)}function jt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function _u(e){return e.replace("-","/")}const Ks={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function ku(e,t="#0F5B8D",n=[],s="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const r=n.length>0&&n.some(E=>E.amount>0),i=760,c=280,d={top:16,right:24,bottom:36,left:s==="amount"?64:56},u=i-d.left-d.right,h=c-d.top-d.bottom,v=[...e.map(E=>E.amount),...n.map(E=>E.amount)],m=Math.max(...v,1),w=u/e.length;function _(E){if(s==="quantity")return E>=1e4?`${(E/1e4).toFixed(1)}万本`:`${Math.round(E).toLocaleString()}本`;if(s==="volume"){const B=E/1e3;return B>=1e4?`${(B/1e3).toFixed(0)}kL`:`${Math.round(B).toLocaleString()} L`}return`${Math.round(E/1e4).toLocaleString("ja-JP")}万円`}function k(E){return s==="quantity"?`${E.toLocaleString()}本`:s==="volume"?nn(E):jt(E)}const C=[0,.25,.5,.75,1].map(E=>{const B=d.top+h-h*E,o=_(m*E);return`<g>
        <line x1="${d.left}" y1="${B}" x2="${i-d.right}" y2="${B}" class="chart-grid" />
        <text x="4" y="${B+4}" class="chart-axis">${o}</text>
      </g>`}).join(""),S=e.map((E,B)=>{const o=r?Math.max((w-18)/2,10):Math.max(w-18,24),l=r?2:0,p=d.left+B*w+(w-(r?o*2+l:o))/2,y=E.amount/m*h,f=d.top+h-y,g=n[B]?.amount??0,x=g/m*h,$=d.top+h-x,P=r?`<rect x="${p}" y="${$}" width="${o}" height="${x}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${k(g)}</title></rect>`:"",D=r?p+o+l:p;return`<g>
      ${P}
      <rect x="${D}" y="${f}" width="${o}" height="${y}" rx="4" fill="${t}" opacity="${.6+B/e.length*.35}"><title>${k(E.amount)}</title></rect>
      <text x="${d.left+B*w+w/2}" y="${c-8}" class="chart-axis centered-axis">${_u(E.month)}</text>
    </g>`}).join(""),A=r?`
    <g transform="translate(${i-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${i} ${c}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${C}${S}${A}
    </svg>
  `}function nn(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function Su(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(s=>`
    <tr>
      <td class="mono">${s.code}</td>
      <td>${s.name}</td>
      <td class="numeric">${jt(s.amount)}</td>
      <td class="numeric">${s.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${nn(s.volumeMl)}</td>
      <td class="numeric">${s.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${s.code}" data-drilldown-name="${s.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function Pu(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${jt(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${nn(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function Ws(e,t,n){const s=t?e.filter(i=>i.tag.includes(t)||i.name.includes(t)):e,r=s.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':s.map(i=>`
        <tr>
          <td class="mono">${i.code||"―"}</td>
          <td>${i.name||"未設定"}</td>
          <td class="mono">${i.tag||"―"}</td>
          <td class="numeric">${jt(i.amount)}</td>
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
  `}function Hr(e,t,n="all",s="",r=[],i=[],c="",d="",u=null,h="all",v="",m=[],w=[],_=[],k=null,C=[],S=[],A="amount",E="calendar"){const B=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",o=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,p=n!=="all"&&r.length>0&&t!=="staff"?r:o,y=zt(p,_,bu),f={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},g=Qs[A],x=K=>A==="quantity"?K.quantity:A==="volume"?K.volumeMl:K.amount,$=K=>A==="quantity"?`${K.toLocaleString()}本`:A==="volume"?nn(K):jt(K);let P,D=[],T,O,N;if(k&&k.monthlySales.length>0)P=k.monthlySales.slice(-24).map(K=>({month:K.month,amount:x(K)})),T=`${k.name} の月別${g}`,O=`${k.tab==="customers"?"得意先":"商品"}: ${k.code}`,N="#0968e5";else if(C.length>0&&n!=="all"){P=C.map(H=>({month:H.month,amount:x(H)})),D=S.map(H=>({month:H.month,amount:x(H)}));const K=P.reduce((H,Z)=>H+Z.amount,0),te=D.reduce((H,Z)=>H+Z.amount,0),W=te>0?(K-te)/te*100:0,ee=W>0?"+":"";T=`${f[n]} ${g}（${s}）`,O=`${$(K)}${te>0?` / 前年比 ${ee}${W.toFixed(1)}%`:""}`,N="#2f855a"}else{P=wu(e.monthlySales,A,E).curr,D=[];const te=P.reduce((ee,H)=>ee+H.amount,0);T=`${E==="fiscal"?"決算年度別":"暦年別"}${g}`,O=`累計 ${$(te)}（${P.length}${E==="fiscal"?"期":"年"}）`,N="#0F5B8D"}const R=["amount","quantity","volume"].map(K=>`<button class="tab-button ${K===A?"active":""}" data-chart-metric="${K}">${Qs[K]}</button>`).join(""),M=["all","yearly","monthly","weekly","daily"].map(K=>`<button class="button ${K===n?"primary":"secondary"} small" type="button" data-analytics-period="${K}">${Ks[K]}</button>`).join(""),z=E==="fiscal"&&n==="yearly"?$u(e.monthlySales):i,V=E==="fiscal"&&n==="yearly"&&!z.includes(s)?z[0]??"":s,U=n!=="all"&&z.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${z.map(K=>`<option value="${K}" ${K===V?"selected":""}>${E==="fiscal"&&n==="yearly"?K+"年度":K}</option>`).join("")}
      </select>`:"";let G="",J="";if(t==="staff"){const K=["all","yearly","monthly","weekly","daily"].map(Z=>`<button class="button ${Z===h?"primary":"secondary"} small" type="button" data-staff-period="${Z}">${Ks[Z]}</button>`).join(""),te=h!=="all"&&m.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${m.map(Z=>`<option value="${Z}" ${Z===v?"selected":""}>${Z}</option>`).join("")}
        </select>`:"",ee=(w.length>0?w:e.staffTotals).filter(Z=>!c||Z.name.includes(c)||Z.code.includes(c)),H=h!=="all"&&v?` (${v})`:"";if(G=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${K}</div>
        ${te}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${c}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${H?`<span style="font-size:12px;color:var(--text-secondary);">${H}</span>`:""}
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
            ${ee.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':ee.map(Z=>`
                <tr>
                  <td class="mono">${Z.code||"―"}</td>
                  <td>${Z.name||"未設定"}</td>
                  <td class="numeric">${jt(Z.amount)}</td>
                  <td class="numeric">${Z.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${Z.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${Z.code}" data-staff-name="${Z.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const Z=u.breakdownTab,Q=h!=="all"&&v?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${v}</span>`:"";J=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${u.name} の内訳${Q}</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>

          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div class="tab-group">
              <button class="tab-button ${Z==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${Z==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${d}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${Z==="customers"?Ws(u.customerRows,d,"得意先名"):Ws(u.productRows,d,"商品名")}
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
            <h2>${T}</h2>
            <p class="panel-caption">${O}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${R}</div>
            ${k?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${ku(P,N,D,A)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${B}</h2>
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
            <div class="button-group">${M}</div>
            ${U}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${re("code","コード",_,"mono")}
                  ${re("name","名称",_)}
                  ${re("amount","売上額",_,"numeric")}
                  ${re("quantity","本数",_,"numeric")}
                  ${re("volumeMl","移出量",_,"numeric")}
                  ${re("documents","伝票数",_,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${Su(y,!0)}</tbody>
            </table>
          </div>
        `:G}
      </article>
    </section>

    ${k?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${k.name} の${k.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${k.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${k.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${Pu(k.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${J}
  `}const Gs=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:xu,monthToFiscalYear:fs,renderSalesAnalytics:Hr},Symbol.toStringTag,{value:"Module"}));function Wt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Eu(e){const t=Math.max(...e.salesByProduct.flatMap(i=>i.values),1),n=e.salesByProduct.map(i=>{const c=i.values.map((d,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(d/t*120)}px" title="${e.months[u]}: ${Wt(d)}"></div>
            <span class="bar-label">${e.months[u].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${i.label}</p>
          <div class="bar-chart">${c}</div>
        </div>
      `}).join(""),s=e.costSimulation.map(i=>`
      <tr>
        <td class="mono">${i.productCode}</td>
        <td>${i.productName}</td>
        <td class="numeric">${Wt(i.costPrice)}</td>
        <td class="numeric">${Wt(i.sellPrice)}</td>
        <td class="numeric">${Wt(i.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${i.marginRate>=40?"success":"warning"}">${i.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(i=>{const c=i.values.reduce((d,u)=>d+u,0);return`
        <tr>
          <td>${i.label}</td>
          ${i.values.map(d=>`<td class="numeric">${(d/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${Wt(c)}</strong></td>
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
          <tbody>${s}</tbody>
        </table>
      </div>
    </section>
  `}function Lu(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Ya(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Xs(e){return e.toISOString().slice(0,10)}function Au(e,t,n,s=null,r=null){const i=e.length?e.map(c=>`
            <tr class="clickable-row${c.documentNo===s?" selected-row":""}"
                data-doc-no="${c.documentNo}">
              <td class="mono">${c.documentNo}</td>
              <td>${Lu(c.date)}</td>
              <td>
                <div class="table-title">${c.customerName}</div>
                <div class="table-sub mono">${c.customerCode}</div>
              </td>
              <td class="numeric">${Ya(c.amount)}</td>
            </tr>
            ${c.documentNo===s?Cu(r):""}
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
          <input id="sales-start" type="date" value="${t||Xs(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||Xs(new Date)}" />
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
  `}function Cu(e){if(!e)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(s=>`
      <tr>
        <td class="mono" style="width:40px">${s.lineNo}</td>
        <td class="mono" style="width:70px">${s.productCode}</td>
        <td>${s.productName}</td>
        <td class="numeric" style="width:50px">${s.quantity}</td>
        <td class="numeric" style="width:80px">${Ya(s.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Ya(s.amount)}</td>
      </tr>`).join(""),n=e.reduce((s,r)=>s+r.amount,0);return`<tr class="line-detail-row"><td colspan="4">
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
            <td class="numeric">${Ya(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function Ca(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Du(e,t,n,s){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},i={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},d=e.map(m=>`
      <tr>
        <td>${m.saleTime}</td>
        <td class="mono">${m.productCode}</td>
        <td>${m.productName}</td>
        <td class="numeric">${m.quantity}</td>
        <td class="numeric">${Ca(m.unitPrice)}</td>
        <td class="numeric"><strong>${Ca(m.amount)}</strong></td>
        <td>${r[m.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(m=>`
      <tr>
        <td class="mono">${m.orderNo}</td>
        <td>${m.orderDate}</td>
        <td>${m.customerName}</td>
        <td>${m.postalCode} ${m.address}</td>
        <td>${m.items.map(w=>`${w.productName} ×${w.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Ca(m.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[m.status]}">${i[m.status]}</span>
        </td>
        <td>${m.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${m.id}">詳細</button>
        </td>
      </tr>
    `).join(""),h=e.reduce((m,w)=>m+w.amount,0),v=t.filter(m=>m.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${Ca(h)}</p>
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
  `}const yn={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},qu={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Tu(e,t,n,s){const r=qu[e],i=Object.keys(yn).map(d=>`
      <button class="tab-button ${e===d?"active":""}" data-import-entity="${d}">
        ${yn[d]}
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
        <h2>${yn[e]} のCSV形式</h2>
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

    ${s?`<section class="panel"><p class="sync-message">${s}</p></section>`:""}
  `}const ve={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function Iu(e,t,n){const s=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:ve.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:ve.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:ve.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:ve.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:ve.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:ve.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:ve.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:ve.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:ve.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:ve.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:ve.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:ve.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:ve.date}];e.lines.slice(0,6).forEach((c,d)=>{const u=33+d*8.5;s.push({id:`line${d}_name`,label:`明細${d+1} 品名`,x:5,y:u,fontSize:7.5,value:c.productName+(c.spec?` ${c.spec}`:""),color:ve.detail},{id:`line${d}_code`,label:`明細${d+1} CD`,x:64,y:u,fontSize:7.5,value:c.productCode,color:ve.detail},{id:`line${d}_qty`,label:`明細${d+1} 数量`,x:124,y:u,fontSize:8,value:c.quantity>0?String(c.quantity):"",color:ve.detail},{id:`line${d}_price`,label:`明細${d+1} 原単価`,x:163,y:u,fontSize:8,value:c.unitPrice>0?c.unitPrice.toLocaleString("ja-JP"):"",color:ve.detail},{id:`line${d}_amount`,label:`明細${d+1} 原価金額`,x:176,y:u,fontSize:8,value:c.amount>0?c.amount.toLocaleString("ja-JP"):"",color:ve.detail},{id:`line${d}_retail`,label:`明細${d+1} 売単価`,x:193,y:u,fontSize:8,value:c.retailPrice?c.retailPrice.toLocaleString("ja-JP"):"",color:ve.detail})});const r=e.lines.reduce((c,d)=>c+(d.amount||0),0),i=e.lines.reduce((c,d)=>c+d.quantity,0);return s.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(i),color:ve.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:ve.total}),n&&s.forEach(c=>{const d=n[c.id];d&&(c.x=d.x,c.y=d.y)}),s}function Mu(e,t,n,s,r){const c=Iu(e,t,s).map(u=>`
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
        色: <span style="color:${ve.header}">■ヘッダ</span>
        <span style="color:${ve.code}">■コード</span>
        <span style="color:${ve.date}">■日付</span>
        <span style="color:${ve.detail}">■明細</span>
        <span style="color:${ve.total}">■合計</span>
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
  `}function hn(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const s=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,i=parseFloat(n.style.top)||0;t[s]={x:r,y:i}}),t}function Nu(e,t,n){const s=[...new Set(e.map(k=>k.areaCode).filter(Boolean))].sort(),r=[...new Set(e.map(k=>k.businessTypeName||k.businessType).filter(Boolean))].sort(),i=e.filter(k=>k.isAtRisk),c=e.filter(k=>!k.isAtRisk&&k.isDormant),d=e.filter(k=>!k.isAtRisk&&!k.isDormant&&k.amount12m>0),u=e.filter(k=>!k.isAtRisk&&!k.isDormant&&k.amount12m===0),h=t.filter(k=>k.lat&&k.lng),v=e.some(k=>k.lat&&k.lng),m=e.length,w=e.filter(k=>k.lat&&k.lng).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業 / Map</p>
        <h1>取引先マップ</h1>
        <p class="meta-note">OpenStreetMap で得意先の位置情報を可視化します。</p>
      </div>
    </section>

    ${v?w<m?`<section class="panel" style="border-left:4px solid #3b82f6;margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <div style="flex:1;font-size:0.85rem;">
              📍 位置情報: <strong>${w}/${m}件</strong> 取得済み
              （未取得 ${m-w}件）
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
              「ジオコーディング実行」で住所から緯度経度を自動取得します（${m}件）。<br>
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
        ${s.map(k=>`<option value="${k}" ${n.filterArea===k?"selected":""}>${k}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${r.map(k=>`<option value="${k}" ${n.filterBiz===k?"selected":""}>${k}</option>`).join("")}
      </select>
    </div>

    <section class="panel" style="padding:0;overflow:hidden;">
      <div id="customer-map" style="height:560px;width:100%;"></div>
    </section>
    <div id="map-data" style="display:none"
      data-customers="${encodeURIComponent(JSON.stringify(e))}"
      data-deliveries="${encodeURIComponent(JSON.stringify(h.map(k=>({name:k.name,address:k.address,lat:k.lat,lng:k.lng,phone:k.phone}))))}"></div>

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

  `}const Ru={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},Ou=["new","picking","packed","shipped","delivered"];function Bu(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(i=>t[i.stage].push(i));const n=Ou.map(i=>{const c=Ru[i],d=t[i];return`
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
    `}).join(""),s=e.reduce((i,c)=>i+c.totalAmount,0),r=e.filter(i=>i.priority==="urgent").length;return`
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
  `}function zu(e,t,n){const s=e.cart.reduce((i,c)=>i+c.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((i,c)=>i+c.quantity,0)}<br/>
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

      ${ju(e,t,n)}
    </div>
  `}function ju(e,t,n){if(e.step==="customer"){const s=e.customerQuery.toLowerCase(),r=s?t.filter(i=>i.name.toLowerCase().includes(s)||i.code.toLowerCase().includes(s)):t.slice(0,20);return`
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
    `}if(e.step==="products"){const s=e.productQuery.toLowerCase(),r=s?n.filter(i=>i.name.toLowerCase().includes(s)||i.code.toLowerCase().includes(s)):n.slice(0,30);return`
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
  `}const Zs={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},eo={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},to={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function Fu(e,t){const n=e.find(i=>i.id===t)??e[0],s=e.filter(i=>i.status==="new").length,r=e.filter(i=>i.status==="confirmed").length;return`
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
          ${e.map(i=>`
            <button class="tour-item ${n?.id===i.id?"active":""}" data-tour-id="${i.id}">
              <div class="tour-item-head">
                <strong>${i.name}</strong>
                <span class="status-pill ${eo[i.status]}">${Zs[i.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${to[i.language]} · 👥 ${i.partySize}名
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
            <span class="status-pill ${eo[n.status]}">${Zs[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${to[n.language]}</dd></div>
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
  `}const Vu=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,Yu=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Uu(e,t){const n=t?e.find(r=>r.id===t):null,s=t==="__new__";return`
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
  `}function Ju(e,t,n,s){const[r,i]=t.split("-").map(l=>parseInt(l,10)),c=new Date(r,i-1,1),d=new Date(r,i,0),u=c.getDay(),h=d.getDate(),v=[];for(let l=0;l<u;l++)v.push({isOutside:!0});for(let l=1;l<=h;l++)v.push({date:new Date(r,i-1,l)});for(;v.length%7!==0;)v.push({isOutside:!0});const m=n?e.filter(l=>l.category===n):e,w={};m.forEach(l=>{const p=l.startsAt.slice(0,10);w[p]??=[],w[p].push(l)});const _=new Date().toISOString().slice(0,10),k=v.map(l=>{if(l.isOutside)return'<div class="cal-cell cal-outside"></div>';const p=l.date,y=`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}-${String(p.getDate()).padStart(2,"0")}`,f=w[y]??[],g=y===_,x=p.getDay();return`
        <div class="cal-cell ${g?"cal-today":""} ${x===0?"cal-sun":x===6?"cal-sat":""}"
             data-cal-date="${y}">
          <div class="cal-day-num">${p.getDate()}</div>
          <div class="cal-events">
            ${f.slice(0,3).map($=>`
              <button class="cal-event" data-cal-event-id="${$.id}"
                      style="background:${$.color||ds[$.category]||"#0F5B8D"};"
                      title="${$.title}">
                <span class="cal-event-time">${$.isAllDay?"終日":new Date($.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${$.title}</span>
              </button>
            `).join("")}
            ${f.length>3?`<button class="cal-event-more" data-cal-date="${y}">+${f.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),C=s?.isOpen?Hu(s):"",S=new Date(r,i-2,1),A=new Date(r,i,1),E=`${S.getFullYear()}-${String(S.getMonth()+1).padStart(2,"0")}`,B=`${A.getFullYear()}-${String(A.getMonth()+1).padStart(2,"0")}`,o=(()=>{const l=new Date;return`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}`})();return`
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
          <button class="button secondary" data-action="cal-today" data-ym="${o}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${B}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(cs).map(([l,p])=>`<option value="${l}" ${n===l?"selected":""}>${p}</option>`).join("")}
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
        ${k}
      </div>
    </section>

    ${C}
  `}function Hu(e){const t=e.event;return`
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
                ${Object.entries(cs).map(([n,s])=>`<option value="${n}" ${t.category===n?"selected":""}>${s}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?ao(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?ao(t.endsAt):""}" />
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
  `}function ao(e){const t=new Date(e),n=s=>String(s).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const Gt={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function Qu(e,t){const n=t?e.find(s=>s.id===t):null;return`
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
        <p class="form-hint">${Gt[n.provider]?.description??""}</p>
        ${Gt[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${Gt[n.provider].setupUrl}" target="_blank">${Gt[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(Gt[n.provider]?.fields??[]).map(s=>`
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
  `}function Ku(e,t){const n=e.reduce((i,c)=>i+c.totalAmount,0),s=e.filter(i=>i.financialStatus==="paid").length,r=e.filter(i=>i.fulfillmentStatus!=="fulfilled"&&i.fulfillmentStatus!=="shipped").length;return`
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
  `}function Wu(e,t,n){return`
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
  `}function Gu(e,t,n){const s=t==="__new__"?null:e.find(c=>c.id===t),r=t==="__new__";return n?.role==="admin"?`
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
                <td>${Ha[c.department]}</td>
                <td>${Ja[c.role]}</td>
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
              ${Object.entries(Ha).map(([c,d])=>`<option value="${c}" ${s?.department===c?"selected":""}>${d}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Ja).map(([c,d])=>`<option value="${c}" ${s?.role===c?"selected":""}>${d}</option>`).join("")}
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
    `}function Xu(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${Ha[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Ja[e.role]}</dd></div>
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
    `}function Zu(e){const t={};return e.forEach(n=>{const s=n.userEmail??"(anonymous)";t[s]=(t[s]??0)+1}),`
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
  `}function em(e){const t=e.prospects.reduce((i,c)=>i+c.expectedAmount,0),n=e.prospects.reduce((i,c)=>i+c.expectedAmount*c.probability/100,0),s=e.prospects.filter(i=>i.stage==="won").length,r=e.prospects.filter(i=>i.stage==="hot"||i.stage==="negotiating").length;return`
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

    ${e.viewMode==="kanban"?tm(e.prospects):am(e.prospects)}

    ${nm(e)}
  `}function tm(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(s=>{const r=e.filter(c=>c.stage===s),i=r.reduce((c,d)=>c+d.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${s}">
          <div class="pk-col-header" style="--pk-color:${ps[s]};">
            <span class="pk-col-label">${tn[s]}</span>
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
  `}function am(e){return`
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
                <td><span class="status-pill" style="background:${ps[t.stage]};color:white;">${tn[t.stage]}</span></td>
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
  `}function nm(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(s=>s.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(tn).map(([s,r])=>`<option value="${s}" ${n?.stage===s?"selected":""}>${r}</option>`).join("")}
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
  `}function sm(e,t,n){const s=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
            ${t.map(i=>`
              <tr>
                <td>${Qa[i.eventType]||i.eventType}</td>
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
                <td>${Qa[i.eventType]||i.eventType}</td>
                <td class="mono" style="font-size:12px;">${i.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${i.message}</td>
                <td><span class="status-pill ${i.status==="sent"?"success":"warning"}">${i.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function om(e,t,n,s){const r=new Map(t.map(m=>[m.code,m])),i=e.filter(m=>m.callDirection==="inbound").length,c=e.filter(m=>m.callDirection==="outbound").length,d=e.filter(m=>m.callStatus==="missed").length,u=e.reduce((m,w)=>m+(w.durationSeconds??0),0),h=m=>{if(m===0)return"―";const w=Math.floor(m/60),_=m%60;return w>0?`${w}分${_}秒`:`${_}秒`},v=m=>{if(m.matchedCustomerCode){const w=r.get(m.matchedCustomerCode);if(w)return`${w.name} (既存)`}return"未登録番号"};return`
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
            ${e.map(m=>`
              <tr>
                <td style="font-size:12px;">${m.startedAt?new Date(m.startedAt).toLocaleString("ja-JP"):"―"}</td>
                <td>
                  ${m.callDirection==="inbound"?'<span class="status-pill neutral">📞 着信</span>':'<span class="status-pill neutral">📤 発信</span>'}
                </td>
                <td>
                  <strong>${v(m)}</strong>
                  ${m.matchedCustomerCode?`<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${m.matchedCustomerCode}</span>`:""}
                </td>
                <td class="mono" style="font-size:12px;">${m.callDirection==="inbound"?m.fromNumber:m.toNumber}</td>
                <td>
                  ${m.callStatus==="missed"?'<span class="status-pill warning">不在着信</span>':m.callStatus==="answered"?'<span class="status-pill success">応答</span>':`<span class="status-pill neutral">${m.callStatus}</span>`}
                </td>
                <td>${h(m.durationSeconds??0)}</td>
                <td>${m.recordingUrl?`<a href="${m.recordingUrl}" target="_blank" class="button-sm secondary">🎧 再生</a>`:"―"}</td>
                <td>
                  ${m.matchedCustomerCode?"":`<button class="button-sm secondary" data-action="call-link-customer" data-id="${m.id}" data-phone="${m.callDirection==="inbound"?m.fromNumber:m.toNumber}">顧客に紐付け</button>`}
                  <button class="button-sm secondary" data-action="call-memo" data-id="${m.id}">メモ</button>
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
  `}const rm=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function im(e){const t=e.activeListId?e.lists.find(i=>i.id===e.activeListId):null,n=e.items.filter(i=>i.status==="new").length,s=e.items.filter(i=>i.status==="imported").length,r=e.items.filter(i=>i.status==="excluded").length;return`
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
            ${rm.map(i=>`<option value="${i}" ${e.searchBusinessType===i?"selected":""}>${i}</option>`).join("")}
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
  `}const no={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},lm={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},cm={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function Ce(e){return"¥"+e.toLocaleString("ja-JP")}function la(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Qr(e,t){const n=e.reduce((i,c)=>i+c.amount,0),s=Math.floor(n*t),r=n+s;return{subtotal:n,taxAmount:s,total:r}}const he={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function ge(e,t){const n=e.align??"left",s=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${s}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function fn(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),s=n-2018;return{y:s>0?String(s).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function dm(e,t,n){const s=fn(e.documentDate),r=fn(e.orderDate??e.documentDate),i=fn(e.deliveryDate??e.documentDate),c=e.lines.slice(0,6).map((S,A)=>{const E=he.detailStartY+A*he.detailRowH,B=he.detailCols,o=[],l=(p,y)=>{y&&o.push(ge({...p,y:E,x:p.x+0},y))};return l(B.productName,S.productName+(S.spec?` ${S.spec}`:"")),l(B.productCode,S.productCode),l(B.color,S.color??""),l(B.size,[S.size,S.caseQty?`×${S.caseQty}`:""].filter(Boolean).join(" ")),l(B.unit,S.unit),l(B.quantity,S.quantity>0?S.quantity.toLocaleString("ja-JP"):""),l(B.correctedQty,S.correctedQuantity?S.correctedQuantity.toLocaleString("ja-JP"):""),l(B.discount,S.discount?S.discount.toLocaleString("ja-JP"):""),l(B.unitPrice,S.unitPrice>0?S.unitPrice.toLocaleString("ja-JP"):""),l(B.costAmount,S.amount>0?S.amount.toLocaleString("ja-JP"):""),l(B.retailPrice,S.retailPrice?S.retailPrice.toLocaleString("ja-JP"):""),l(B.note,S.receivedAmount?S.receivedAmount.toLocaleString("ja-JP"):""),o.join("")}).join(""),d=e.lines.reduce((S,A)=>S+(A.amount||0),0),u=e.lines.reduce((S,A)=>S+(A.retailPrice||0)*(A.correctedQuantity??A.quantity),0),h=e.lines.reduce((S,A)=>S+(A.receivedAmount||0),0),v=e.lines.reduce((S,A)=>S+(A.returnAmount||0),0),m=e.lines.reduce((S,A)=>S+A.quantity,0),w=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",_=n.calibrationOffsetX||0,k=n.calibrationOffsetY||0,C=`transform: translate(${_}mm, ${k}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${w}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${C}">
        ${ge(he.currentDateY,s.y)}
        ${ge(he.currentDateM,s.m)}
        ${ge(he.currentDateD,s.d)}
        ${ge(he.documentNo,e.documentNo)}
        ${e.settlementPrint?ge(he.settlementCheck,"✓"):""}

        ${ge(he.vendorName,t.name)}
        ${ge(he.vendorAddress,t.address1)}
        ${ge(he.chainStoreCode,e.chainStoreCode??"")}
        ${ge(he.categoryCode,e.categoryCode??"")}
        ${ge(he.slipNumber,e.documentNo)}
        ${ge(he.vendorCode,e.slipTypeCode??"")}

        ${ge(he.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${ge(he.orderDateY,r.y)}
        ${ge(he.orderDateM,r.m)}
        ${ge(he.orderDateD,r.d)}
        ${ge(he.deliveryDateY,i.y)}
        ${ge(he.deliveryDateM,i.m)}
        ${ge(he.deliveryDateD,i.d)}
        ${ge(he.orderNo,e.orderNo??"")}
        ${ge(he.partnerCode,e.vendorCode??"")}

        ${c}

        ${ge(he.totalQty,m.toLocaleString("ja-JP"))}
        ${ge(he.receivedTotal,h.toLocaleString("ja-JP"))}
        ${ge(he.returnTotal,v.toLocaleString("ja-JP"))}
        ${ge(he.correctedCostTotal,d.toLocaleString("ja-JP"))}
        ${ge(he.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function pm(e,t,n){const{subtotal:s,taxAmount:r,total:i}=Qr(e.lines,e.taxRate),c=e.previousBalance??0,d=e.paymentAmount??0,u=c-d+i,h=e.lines.map(m=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${m.note??""}</td>
        <td>${m.productName}${m.spec?` <span style="color:#636e72;font-size:9pt;">/ ${m.spec}</span>`:""}</td>
        <td class="numeric">${m.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${m.unit}</td>`:""}
        <td class="numeric">${Ce(m.unitPrice)}</td>
        <td class="numeric">${Ce(m.amount)}</td>
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
        <div><dt>請求日</dt><dd>${la(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${la(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${Ce(u)}</span>
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
        <tbody>${h}${v}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${Ce(s)} / 消費税: ${Ce(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${c?`<tr><th>前回御請求額</th><td>${Ce(c)}</td></tr>`:""}
          ${d?`<tr><th>ご入金額</th><td>▲ ${Ce(d)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${Ce(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${Ce(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${Ce(u)}</td></tr>
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
  `}function um(e,t,n){const{subtotal:s,taxAmount:r,total:i}=Qr(e.lines,e.taxRate),c=e.lines.map(u=>`
      <tr>
        <td>${u.productName}${u.spec?` <span style="color:#636e72;font-size:9pt;">/ ${u.spec}</span>`:""}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${u.unit}</td>`:""}
        <td class="numeric">${Ce(u.unitPrice)}</td>
        <td class="numeric">${Ce(u.amount)}</td>
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
        <div><dt>見積日</dt><dd>${la(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${la(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${Ce(i)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${Ce(s)} / 消費税: ${Ce(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${Ce(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${Ce(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${Ce(i)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?la(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function mm(e,t,n,s){let r="";switch(e){case"chain_store":r=dm(s,n,t);break;case"quotation":r=um(s,n,t);break;case"invoice_monthly":r=pm(s,n,t);break}const i=Object.keys(no).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${no[u]}</button>`).join(""),c=s.lines.map((u,h)=>`
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
  `}const ym={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},hm={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Kr(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],s="",r=!1;for(let d=0;d<e.length;d++){const u=e[d];r?u==='"'?e[d+1]==='"'?(s+='"',d++):r=!1:s+=u:u==='"'?r=!0:u===","?(n.push(s),s=""):u===`
`||u==="\r"?(u==="\r"&&e[d+1]===`
`&&d++,n.push(s),n.some(h=>h!=="")&&t.push(n),n=[],s=""):s+=u}if((s!==""||n.length>0)&&(n.push(s),n.some(d=>d!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const i=t[0].map(d=>d.trim()),c=[];for(let d=1;d<t.length;d++){const u={};i.forEach((h,v)=>{u[h]=(t[d][v]??"").trim()}),c.push(u)}return{columns:i,rows:c}}function Wr(e,t,n){const s=ym[e],r=s.filter(d=>!t.includes(d)),i=n.map(d=>{const u=[];r.length>0&&u.push(`必須列欠損: ${r.join(",")}`);for(const h of s)t.includes(h)&&!d[h]&&u.push(`${h}が空`);return{...d,_valid:u.length===0,_error:u[0]}}),c=i.filter(d=>d._valid).length;return{entity:e,columns:t,rows:i,totalRows:n.length,validRows:c,invalidRows:i.length-c}}function Gr(e){const n=hm[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function Xr(e,t){const{supabaseInsert:n}=await I(async()=>{const{supabaseInsert:d}=await Promise.resolve().then(()=>ne);return{supabaseInsert:d}},void 0);let s=0,r=0;const c={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const d of t){if(!d._valid)continue;const{_valid:u,_error:h,...v}=d,m={...v};if(!m.id){const w=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";m.id=String(v[w]??`${e}-${Date.now()}-${s+r}`)}for(const w of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof m[w]=="string"&&m[w]!==""){const _=Number(m[w]);Number.isFinite(_)&&(m[w]=_)}try{await n(c,m)!==null?s++:r++}catch{r++}}return{inserted:s,failed:r}}const fm=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:Gr,importToSupabase:Xr,parseCSV:Kr,validateImport:Wr},Symbol.toStringTag,{value:"Module"}));function gn(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function gm(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function vm(e,t,n,s,r){const i=n.reduce((h,v)=>h+v.rowCount,0),c=n.map(h=>h.lastSyncAt).filter(h=>h!==null).sort().reverse()[0]??null,d=100,u=Math.max(1,Math.ceil(r/d));return`
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
        <p class="kpi-value">${c?gn(c):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${h.lastSyncAt?gn(h.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(h=>h.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${r.toLocaleString("ja-JP")}件中 ${((s-1)*d+1).toLocaleString("ja-JP")}-${Math.min(s*d,r).toLocaleString("ja-JP")} を表示</p>
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
            ${t.map(h=>`
            <tr>
              <td class="numeric mono">${h._record_index}</td>
              <td class="mono">${h._source_file||""}</td>
              <td class="numeric">${h._record_size??""} B</td>
              <td>${h._synced_at?gn(h._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${h._raw_b64?h._raw_b64.slice(0,200):""}">${gm(h._raw_b64)}</td>
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
  `}const St=400,Pt=240;function ce(e){return e.toLocaleString("ja-JP")}function vn(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function bm(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function et(e,t,n,s=""){return`<th class="${s}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${bm(n,t)}</th>`}function Xt(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function xm(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const s=e.products.slice().sort((A,E)=>(e.productTotals[E.code]??0)-(e.productTotals[A.code]??0)).slice(0,6),r=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],i=820,c=280,d={top:20,right:20,bottom:40,left:60},u=i-d.left-d.right,h=c-d.top-d.bottom,v=t.map(A=>s.reduce((E,B)=>E+(n[B.code]?.[A]??0),0)),m=Math.max(...v,1),w=u/t.length,_=Math.max(w-10,14),k=[0,.25,.5,.75,1].map(A=>{const E=d.top+h-h*A,B=`${Math.round(m*A/100)*100}`;return`
      <line x1="${d.left}" y1="${E}" x2="${i-d.right}" y2="${E}" class="chart-grid" />
      <text x="6" y="${E+4}" class="chart-axis">${Number(B).toLocaleString("ja-JP")}</text>
    `}).join(""),C=t.map((A,E)=>{let B=d.top+h;const o=d.left+E*w+(w-_)/2,l=s.map(($,P)=>{const T=(n[$.code]?.[A]??0)/m*h;return B-=T,`<rect x="${o}" y="${B}" width="${_}" height="${T}" fill="${r[P%r.length]}" opacity="0.85" rx="${P===s.length-1?3:0}" />`}).join(""),[p,y]=A.split("-"),f=parseInt(y),g=f===1||E%3===0,x=f===1?`${p.slice(2)}年`:`${f}月`;return`<g>${l}${g?`<text x="${o+_/2}" y="${c-10}" class="chart-axis centered-axis">${x}</text>`:""}</g>`}).join(""),S=s.map((A,E)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${r[E%r.length]};"></span>
       ${A.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${i} ${c}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${k}${C}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${d.left}px;display:flex;flex-wrap:wrap;">${S}</div>
  `}function wm(e){const{months:t,products:n}=e,s=n.slice().sort((c,d)=>(e.productTotals[d.code]??0)-(e.productTotals[c.code]??0)).slice(0,50),r=t.map(c=>{const[d,u]=c.split("-"),h=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${h===1?`${d.slice(2)}年1月`:`${h}月`}</th>`}).join(""),i=s.map(c=>{const d=t.map(u=>{const h=e.matrix[c.code]?.[u]??0;return`<td class="numeric">${h>0?ce(h):"—"}</td>`}).join("");return`
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
  `}function $m(e,t){const n=e.months[e.months.length-1]??"",s=e.months[e.months.length-2]??"",r=e.months.length-13,i=r>=0?e.months[r]:"",c=e.products.reduce((_,k)=>_+(e.matrix[k.code]?.[n]??0),0),d=e.products.reduce((_,k)=>_+(e.matrix[k.code]?.[s]??0),0),u=i?e.products.reduce((_,k)=>_+(e.matrix[k.code]?.[i]??0),0):0,h=d>0?(c-d)/d*100:0,v=u>0?(c-u)/u*100:0,m=_=>_>=0?"+":"",w=[1,2,3,5].map(_=>`<option value="${_}" ${_===t?"selected":""}>${_}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${ce(c)} 本</p>
        <p class="kpi-sub">${vn(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${h>=0?"":"text-danger"}">${m(h)}${h.toFixed(1)}%</p>
        <p class="kpi-sub">${vn(s)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${v>=0?"":"text-danger"}">${u>0?`${m(v)}${v.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${i?`${vn(i)} 比`:"前年データなし"}</p>
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
      ${xm(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${wm(e)}
    </section>
  `}function _m(e,t){const s=e.slice().sort((i,c)=>{if(!t)return 0;const d=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return d*i.productName.localeCompare(c.productName,"ja");case"ss-avg":return d*(i.avgMonthlyDemand-c.avgMonthlyDemand);case"ss-std":return d*(i.demandStdDev-c.demandStdDev);case"ss-ss":{const u=Math.ceil(Xt(i.serviceLevel)*i.demandStdDev*Math.sqrt(i.leadTimeDays/30)),h=Math.ceil(Xt(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return d*(u-h)}case"ss-rop":{const u=Math.ceil(i.avgMonthlyDemand*(i.leadTimeDays/30)+Xt(i.serviceLevel)*i.demandStdDev*Math.sqrt(i.leadTimeDays/30)),h=Math.ceil(c.avgMonthlyDemand*(c.leadTimeDays/30)+Xt(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return d*(u-h)}default:return 0}}).map(i=>{const c=Xt(i.serviceLevel),d=i.leadTimeDays/30,u=Math.ceil(c*i.demandStdDev*Math.sqrt(d)),h=Math.ceil(i.avgMonthlyDemand*d+u),v=u-i.safetyStockQty,m=v>0?"text-danger":v<-u*.3?"text-warning":"",w=[.9,.95,.99].map(_=>`<option value="${_}" ${Math.abs(i.serviceLevel-_)<.01?"selected":""}>${(_*100).toFixed(0)}%</option>`).join("");return`
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
            style="width:64px;">${w}</select>
        </td>
        <td class="numeric"><strong>${ce(u)}</strong></td>
        <td class="numeric">${ce(h)}</td>
        <td class="numeric ${m}">
          ${v>0?`+${ce(v)}`:ce(v)}
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
              ${et("商品名","ss-name",t)}
              ${et("月平均需要","ss-avg",t,"numeric")}
              ${et("標準偏差","ss-std",t,"numeric")}
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              ${et("安全在庫[算出]","ss-ss",t,"numeric")}
              ${et("発注点","ss-rop",t,"numeric")}
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const km={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function Sm(e,t,n,s,r=[],i={partCapacity:St,empCapacity:Pt}){const c={draft:"下書き",confirmed:"確定",actual:"実績入力済"},d={draft:"neutral",confirmed:"info",actual:"success"},u=R=>Object.entries(km).map(([M,z])=>`<option value="${M}" ${M===R?"selected":""}>${z}</option>`).join(""),h=640,v=e.filter(R=>R.plannedQty>0||Math.max(0,R.demandForecast+R.safetyStockTarget-R.openingStock)>0),m=r.length>0?jn(v,r,i):[],[w,_]=t.split("-").map(Number),k=_===12?`${w+1}-01`:`${w}-${String(_+1).padStart(2,"0")}`,C=ca(k,1,0),S=C.length>0?jn(v,C,i):[],A=new Map;for(const R of[...m,...S])for(const M of R.items)A.has(M.productCode)||A.set(M.productCode,[]),A.get(M.productCode).push({date:R.date,qty:M.qty});const E=R=>R.map(M=>{const z=Math.max(0,M.demandForecast+M.safetyStockTarget-M.openingStock),V=M.plannedQty>0?M.plannedQty:Math.round(z),U=V>0?Math.ceil(V/h*10)/10:0,G=M.plannedQty>0?(M.actualQty-M.plannedQty)/M.plannedQty*100:null,J=G!==null?G>=0?"text-success":"text-danger":"",K=A.get(M.productCode)??[],te=K.length>0?K.map(W=>{const ee=W.date.slice(5).replace("-","/");return`<span style="font-size:9px;padding:1px 4px;border-radius:3px;margin:1px;display:inline-block;${W.date.startsWith(k)?"background:#fef3c7;color:#92400e;":"background:#dbeafe;color:#1e40af;"}" title="${W.date}">${ee}(${W.qty})</span>`}).join(""):'<span style="font-size:9px;color:var(--text-disabled);">—</span>';return`
      <tr>
        <td style="white-space:nowrap;">${M.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${M.productCode}"
            style="width:92px;">${u(M.productionType)}</select>
        </td>
        <td class="numeric">${ce(Math.round(M.demandForecast))}</td>
        <td class="numeric">${ce(Math.round(M.safetyStockTarget))}</td>
        <td class="numeric">${ce(Math.round(M.openingStock))}</td>
        <td class="numeric"><strong>${ce(Math.round(z))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${M.plannedQty}"
            data-action="plan-qty" data-code="${M.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td style="max-width:200px;overflow-x:auto;white-space:nowrap;">${te}</td>
        <td class="numeric">
          <input class="input-sm" type="number" min="0"
            value="${M.actualQty||""}"
            data-action="plan-actual-qty" data-code="${M.productCode}"
            placeholder="0"
            style="width:70px;text-align:right;" />
        </td>
        <td class="numeric ${J}">
          ${G!==null?`${G>=0?"+":""}${G.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${U>0?`${U.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${d[M.status]??"neutral"}">${c[M.status]??M.status}</span>
        </td>
      </tr>
    `}).join(""),o=(n==="all"?e:e.filter(R=>R.productionType===n)).slice().sort((R,M)=>{if(!s)return 0;const z=s.dir==="asc"?1:-1,V=Math.max(0,R.demandForecast+R.safetyStockTarget-R.openingStock),U=Math.max(0,M.demandForecast+M.safetyStockTarget-M.openingStock);switch(s.column){case"plan-name":return z*R.productName.localeCompare(M.productName,"ja");case"plan-forecast":return z*(R.demandForecast-M.demandForecast);case"plan-required":return z*(V-U);case"plan-planned":return z*(R.plannedQty-M.plannedQty);case"plan-actual":return z*(R.actualQty-M.actualQty);case"plan-label":{const G=R.plannedQty>0?R.plannedQty:Math.round(V),J=M.plannedQty>0?M.plannedQty:Math.round(U);return z*(G-J)}default:return 0}}),l=E(o),p=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],y=R=>{const z=(R==="all"?e:e.filter(V=>V.productionType===R)).reduce((V,U)=>{const G=Math.max(0,U.demandForecast+U.safetyStockTarget-U.openingStock);return V+(U.plannedQty>0?U.plannedQty:Math.round(G))},0);return Math.ceil(z/h*10)/10},f=p.filter(R=>R.key!=="all").map(R=>{const M=y(R.key),z=e.filter(U=>U.productionType===R.key).length,V=R.key==="make_to_order"?e.filter(U=>U.productionType==="make_to_order"&&U.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${R.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${M>0?M.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${z}商品${V!==null?` · 受注${V}件`:""}</p>
      </div>
    `}).join(""),g=o.reduce((R,M)=>R+M.demandForecast,0),x=o.reduce((R,M)=>R+Math.max(0,M.demandForecast+M.safetyStockTarget-M.openingStock),0),$=o.reduce((R,M)=>R+M.plannedQty,0),P=o.reduce((R,M)=>R+M.actualQty,0),D=y(n),T=new Date,O=Array.from({length:24},(R,M)=>{const z=new Date(T.getFullYear(),T.getMonth()-6+M,1),V=`${z.getFullYear()}-${String(z.getMonth()+1).padStart(2,"0")}`;return`<option value="${V}" ${V===t?"selected":""}>${V.replace("-","年")}月</option>`}).join(""),N=p.map(R=>`<button class="button ${n===R.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${R.key}"
       style="padding:4px 12px;font-size:13px;">${R.label}</button>`).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${O}</select>
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
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${f}</div>
    </section>

    ${r.length>0?(()=>{const R=r.filter(z=>z.partTimers>0||z.employees>0),M=R.map(z=>{const V=parseInt(z.date.slice(8)),U=["日","月","火","水","木","金","土"][new Date(z.date).getDay()];return`<span style="font-size:10px;padding:2px 5px;border-radius:3px;background:#dbeafe;color:#1e40af;margin:1px;display:inline-block;">${V}(${U})</span>`}).join("");return`<div style="background:var(--surface-alt);border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:12px;">
        <div style="margin-bottom:4px;"><strong>${t.replace("-","年")}月 稼働日: ${R.length}日</strong>
          <span style="color:var(--text-secondary);margin-left:8px;">翌月: ${k.replace("-","年")}月</span></div>
        <div style="line-height:1.8;">${M}</div>
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
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${N}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${et("商品名","plan-name",s)}
              <th>生産区分</th>
              ${et("需要予測","plan-forecast",s,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${et("必要生産数","plan-required",s,"numeric")}
              ${et("計画数","plan-planned",s,"numeric")}
              <th style="white-space:nowrap;">製造予定</th>
              ${et("実績数","plan-actual",s,"numeric")}
              <th class="numeric">達成率</th>
              ${et("ラベル工数","plan-label",s,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${l||'<tr><td colspan="12" class="empty-row">データなし</td></tr>'}
            ${o.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${ce(Math.round(g))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${ce(Math.round(x))}</td>
                <td class="numeric">${ce($)}</td>
                <td>—</td>
                <td class="numeric">${P>0?ce(P):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${D.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Zr(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n,0).getDate();return Array.from({length:s},(r,i)=>{const c=i+1;return`${e}-${String(c).padStart(2,"0")}`})}function so(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function oo(e){const t=new Date(e).getDay();return t===0||t===6}function Pm(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function ei(e){return e.partTimers+e.employees}function rt(e,t,n={partCapacity:St,empCapacity:Pt}){const s=e.filter(v=>v.partTimers>0||v.employees>0);if(s.length===0)return;const r=t.reduce((v,m)=>{const w=m.plannedQty>0?m.plannedQty:Math.max(0,m.demandForecast+m.safetyStockTarget-m.openingStock);return v+w},0);if(r<=0)return;const i=r/s.length;let c=0,d=0,u=1/0;const h=Math.ceil(i/n.partCapacity);for(let v=0;v<=h;v++){const m=i-v*n.partCapacity,w=m>0?Math.ceil(m/n.empCapacity):0,_=v+w;_<u&&(u=_,c=v,d=w)}for(const v of e)v.confirmed||(v.partTimers>0||v.employees>0)&&(v.partTimers=c,v.employees=d)}function jn(e,t,n={partCapacity:St,empCapacity:Pt}){const s=t.filter(d=>ei(d)>0).map(d=>d.date).sort();if(s.length===0)return t.map(d=>({date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const r={monthly:0,november:1,annual:2,make_to_order:3},i=e.filter(d=>d.plannedQty>0||Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)>0).map(d=>({productCode:d.productCode,productName:d.productName,productionType:d.productionType,remaining:d.plannedQty>0?d.plannedQty:Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)})).filter(d=>d.remaining>0).sort((d,u)=>(r[d.productionType]??99)-(r[u.productionType]??99)||u.remaining-d.remaining),c=new Map;for(const d of t){const u=Pm(d,n);c.set(d.date,{date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const d of i){let u=d.remaining;if(u<=0)continue;if(s.reduce((v,m)=>{const w=c.get(m);return v+Math.max(0,w.capacity-w.totalQty)},0)<=0)break;for(const v of s){if(u<=0)break;const m=c.get(v),w=Math.max(0,m.capacity-m.totalQty);if(w<=0)continue;const _=Math.min(u,w);m.items.push({productCode:d.productCode,productName:d.productName,productionType:d.productionType,qty:_}),m.totalQty+=_,m.utilization=m.capacity>0?m.totalQty/m.capacity:0,u-=_}}return t.map(d=>c.get(d.date))}function ca(e,t=1,n=1){return Zr(e).map(s=>({date:s,partTimers:oo(s)?0:t,employees:oo(s)?0:n,confirmed:!1}))}function Em(e,t,n,s=null,r=new Set,i={partCapacity:St,empCapacity:Pt}){const c=Zr(t),d=e.filter(P=>!r.has(P.productCode)),u=jn(d,n,i),h=new Map(u.map(P=>[P.date,P])),v=d.reduce((P,D)=>P+(D.plannedQty>0?D.plannedQty:Math.max(0,D.demandForecast+D.safetyStockTarget-D.openingStock)),0),w=e.reduce((P,D)=>P+(D.plannedQty>0?D.plannedQty:Math.max(0,D.demandForecast+D.safetyStockTarget-D.openingStock)),0)-v,_=u.reduce((P,D)=>P+D.totalQty,0),k=n.filter(P=>ei(P)>0).length,C=u.reduce((P,D)=>P+D.capacity,0),S=n.reduce((P,D)=>P+D.partTimers,0),A=n.reduce((P,D)=>P+D.employees,0),E=k>0?Math.ceil(v/k):0,B=new Date,o=Array.from({length:24},(P,D)=>{const T=new Date(B.getFullYear(),B.getMonth()-6+D,1),O=`${T.getFullYear()}-${String(T.getMonth()+1).padStart(2,"0")}`;return`<option value="${O}" ${O===t?"selected":""}>${O.replace("-","年")}月</option>`}).join(""),l=new Date(c[0]).getDay(),p=[];for(let P=0;P<l;P++)p.push('<div style="min-height:44px;"></div>');for(const P of c){const D=h.get(P),T=new Date(P).getDay(),O=parseInt(P.split("-")[2]),N=D?.partTimers??0,R=D?.employees??0,M=N+R,z=D?.totalQty??0,V=D?.utilization??0,U=P===s,G=M===0?"var(--surface-alt)":V>.95?"rgba(197,61,61,0.12)":V>.7?"rgba(183,121,31,0.10)":V>0?"rgba(47,133,90,0.08)":"var(--surface)",J=M===0?"transparent":V>.95?"#c53d3d":V>.7?"#b7791f":V>0?"#2f855a":"var(--border)",K=T===0?"#c53d3d":T===6?"#0F5B8D":"var(--text)",te=M>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${N>0?`パ${N}`:""}${R>0?`社${R}`:""}</span>`:"";p.push(`
      <div data-action="cal-toggle-day" data-date="${P}"
        style="min-height:72px;padding:3px;border:${U?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${G};cursor:pointer;display:flex;flex-direction:column;
          ${U?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${K};line-height:1;">${O}</span>
          ${te}
        </div>
        ${M>0?`
          ${D&&D.items.length>0?`<div style="margin-top:2px;overflow:hidden;flex:1;">${D.items.slice(0,3).map(W=>`<div style="font-size:7px;line-height:1.2;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${W.productName.slice(0,6)} ${W.qty}</div>`).join("")}${D.items.length>3?`<div style="font-size:7px;color:var(--text-disabled);">+${D.items.length-3}品</div>`:""}</div>`:""}
          <div style="font-size:10px;font-weight:600;color:var(--text);line-height:1;">${z>0?ce(z):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:1px;">
            <div style="height:100%;width:${Math.min(V*100,100)}%;background:${J};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const f=p.length%7;if(f>0)for(let P=0;P<7-f;P++)p.push('<div style="min-height:44px;"></div>');const g=s?h.get(s):null;s&&n.find(P=>P.date===s);const x=s&&g?(()=>{const P=g,D=parseInt(s.split("-")[2]),T=so(s),O=Math.round(P.utilization*100),N=n.find(H=>H.date===s),R=s===new Date().toISOString().slice(0,10),M={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},z={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},V=P.items.map(H=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${M[H.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${H.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${z[H.productionType]??H.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${ce(H.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),U=`パ${P.partTimers}×${i.partCapacity} 社${P.employees}×${i.empCapacity} = ${ce(P.capacity)}本`,G=P.totalQty>0?Math.ceil(P.totalQty/i.partCapacity):0,J=[];if(P.totalQty>0)for(let H=0;H<=G;H++){const Z=P.totalQty-H*i.partCapacity;if(Z<=0){J.push({p:H,e:0});break}const Q=Math.ceil(Z/i.empCapacity);J.push({p:H,e:Q})}const K=P.totalQty-P.capacity,te=P.totalQty===0?"":K>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${ce(K)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',W=J.filter(H=>H.p+H.e>0).sort((H,Z)=>H.p+H.e-(Z.p+Z.e)).slice(0,3),ee=P.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${ce(P.totalQty)}本を収めるには ${te}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${W.map((H,Z)=>{const Q=H.p===P.partTimers&&H.e===P.employees;return`<button data-action="cal-apply-pattern" data-date="${s}" data-part="${H.p}" data-emp="${H.e}"
              style="font-size:11px;padding:4px 10px;border:1px solid ${Q?"#2f855a":"var(--border)"};
                border-radius:4px;background:${Q?"rgba(47,133,90,0.08)":"var(--surface)"};
                cursor:pointer;white-space:nowrap;${Q?"font-weight:600;":""}">
              パ${H.p}社${H.e}＝${H.p+H.e}人
              <span style="color:var(--text-secondary);margin-left:2px;">${ce(H.p*i.partCapacity+H.e*i.empCapacity)}本</span>
            </button>`}).join("")}
        </div>
      </div>
    `:"";return`
      <section class="panel" style="margin-top:12px;border:2px solid ${R?"#2f855a":"#0F5B8D"};">
        <div style="padding:12px 16px 8px;${R?"background:rgba(47,133,90,0.06);":""}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            ${R?'<span style="background:#2f855a;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;">TODAY</span>':""}
            <h2 style="margin:0;font-size:16px;">${D}日（${T}）${R?"":"の生産内訳"}</h2>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${U} ・ 稼働率${O}%</div>
          ${P.totalQty>0?`<div style="font-size:20px;font-weight:700;margin-top:6px;">${ce(P.totalQty)}<span style="font-size:13px;font-weight:400;">本</span> <span style="font-size:13px;font-weight:400;">/ ${P.items.length}品</span></div>`:""}
        </div>
        ${ee}
        <div style="display:flex;gap:12px;padding:0 4px 8px;flex-wrap:wrap;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="${N?.partTimers??0}"
              data-action="cal-shift-part" data-date="${s}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="${N?.employees??0}"
              data-action="cal-shift-emp" data-date="${s}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
        ${P.items.length>0?`
          <div style="padding:0 4px;">
            ${V}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${ce(P.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():s?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(s.split("-")[2])}日（${so(s)}）— 休日</p>
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
  `:"",$=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(P=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${P.color};"></span>${P.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${o}</select>
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
      <div><strong>${ce(Math.round(v))}</strong>本 ÷ <strong>${k}</strong>稼働日 = 日当たり<strong>${ce(E)}</strong>本</div>
      <div>→ パ<strong>${S}</strong> 社<strong>${A}</strong>人日 ・ キャパ<strong>${ce(C)}</strong>本
        ${_<v?` <span style="color:#c53d3d;">（${ce(Math.round(v-_))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
      </div>
      <div style="color:var(--text-secondary);font-size:10px;">日付タップで稼働ON/OFF → 人数自動計算</div>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${$}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((P,D)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${D===0?"#c53d3d":D===6?"#0F5B8D":"var(--text-secondary)"};">${P}</div>`).join("")}
        ${p.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">クリック→詳細 ／ ダブルクリック→稼働ON/OFF</p>
    </section>

    ${x}

    <section class="panel" style="margin-top:12px;" id="cal-label-section">
      <div class="panel-header" style="padding-bottom:4px;">
        <div>
          <h2 style="font-size:14px;">ラベル対象商品</h2>
          <p class="panel-caption">区分ごとにまとめて外す or 個別に外せます${r.size>0?`（<strong>${r.size}</strong>品除外中 = ${ce(Math.round(w))}本）`:""}</p>
        </div>
        <button class="button primary" type="button" data-action="cal-save-exclusions"
          style="padding:6px 14px;font-size:12px;">設定を保存</button>
      </div>
      <div id="cal-label-list" style="max-height:500px;overflow-y:auto;">
        ${(()=>{const P=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],D=new Map;for(const T of e){if((T.plannedQty>0?T.plannedQty:Math.max(0,T.demandForecast+T.safetyStockTarget-T.openingStock))<=0)continue;const N=T.productionType||"monthly";D.has(N)||D.set(N,[]),D.get(N).push(T)}return P.filter(T=>D.has(T.key)).map(T=>{const O=D.get(T.key),N=O.reduce((U,G)=>U+(G.plannedQty>0?G.plannedQty:Math.max(0,G.demandForecast+G.safetyStockTarget-G.openingStock)),0),R=O.filter(U=>r.has(U.productCode)).length,M=R===O.length,z=R===0,V=O.map(U=>{const G=U.plannedQty>0?U.plannedQty:Math.max(0,U.demandForecast+U.safetyStockTarget-U.openingStock),J=r.has(U.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${J?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${U.productCode}"
                    ${J?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${J?"text-decoration:line-through;":""}">${U.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${ce(Math.round(G))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${T.key}"
                    ${M?"":"checked"} ${!z&&!M?'class="indeterminate"':""}
                    style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${T.color};flex-shrink:0;"></span>
                  <div style="flex:1;font-size:13px;font-weight:600;">${T.label}<span style="font-weight:400;color:var(--text-secondary);margin-left:6px;">${O.length}品 ${ce(Math.round(N))}本</span></div>
                  ${R>0&&!M?`<span style="font-size:11px;color:#b7791f;">${R}品除外</span>`:""}
                  ${M?'<span style="font-size:11px;color:var(--text-secondary);">全除外</span>':""}
                </div>
                ${V}
              </div>
            `}).join("")})()}
      </div>
    </section>
  `}function Lm(e,t,n,s,r,i,c="all",d=null,u=[],h=null,v=new Set,m={partCapacity:St,empCapacity:Pt}){const _=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(C=>`<button class="tab-button ${s===C.key?"active":""}"
       data-demand-tab="${C.key}">${C.label}</button>`).join("");let k="";if(s==="demand")k=e?$m(e,i):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(s==="safety")k=_m(t,d);else if(s==="plan")k=Sm(n,r,c,d,u,m);else if(s==="calendar")try{k=Em(n,r,u,h,v,m)}catch(C){console.error("[renderCalendarTab] error:",C),k=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(C)}
${C?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${_}
    </div>

    ${k}
  `}const ut={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},at=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function ye(e){return e.toLocaleString("ja-JP")}function ke(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function gs(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function Am(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function vs(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function Cm(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(S=>S.month))].sort(),n=at.filter(S=>e.some(A=>A.brewCategory===S)),s={};for(const S of e)s[S.month]||(s[S.month]={}),s[S.month][S.brewCategory]=S.shipmentMl;const r=820,i=300,c={top:20,right:20,bottom:50,left:70},d=r-c.left-c.right,u=i-c.top-c.bottom,h=t.map(S=>n.reduce((A,E)=>A+(s[S]?.[E]??0),0)),v=Math.max(...h,1),m=d/t.length,w=Math.max(m-8,14),_=[0,.25,.5,.75,1].map(S=>{const A=c.top+u-u*S,E=v*S/1e3;return`
      <line x1="${c.left}" y1="${A}" x2="${r-c.right}" y2="${A}" class="chart-grid" />
      <text x="6" y="${A+4}" class="chart-axis">${Math.round(E).toLocaleString("ja-JP")}L</text>
    `}).join(""),k=t.map((S,A)=>{let E=c.top+u;const B=c.left+A*m+(m-w)/2,o=n.map(x=>{const $=s[S]?.[x]??0,P=$/v*u;return E-=P,P>0?`<rect x="${B}" y="${E}" width="${w}" height="${P}" fill="${ut[x]??"#9ca3af"}" opacity="0.85" rx="1"><title>${x}: ${ke($)}L</title></rect>`:""}).join(""),[l,p]=S.split("-"),y=parseInt(p),f=y===10||A%2===0,g=y===10?`${l}年度`:`${y}月`;return`<g>${o}${f?`<text x="${B+w/2}" y="${i-12}" class="chart-axis centered-axis" style="font-size:10px;">${g}</text>`:""}</g>`}).join(""),C=n.map(S=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${ut[S]??"#9ca3af"};"></span>
       ${S}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${i}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${_}${k}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${c.left}px;display:flex;flex-wrap:wrap;">${C}</div>
  `}function Dm(e,t,n,s){const r=new Map;for(const d of e){const u=d.brewCategory;r.has(u)||r.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const h=r.get(u);h.rows.push(d),h.totalMl+=d.totalShipmentMl,h.avgMl+=d.monthlyAvgMl,h.stockL=d.currentStockL}const i=new Map;for(const d of t)i.has(d.brewCategory)||i.set(d.brewCategory,[]),i.get(d.brewCategory).push(d);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${at.filter(d=>r.has(d)).map(d=>{const u=r.get(d),h=ut[d]??"#9ca3af",v=vs(d);i.get(d);const m=n[d]??{rawAlcoholPct:18,targetAlcoholPct:15},w=m.targetAlcoholPct>0?m.rawAlcoholPct/m.targetAlcoholPct:1;u.stockL*1e3;const _=u.totalMl,k=u.avgMl,C=_/1e3,S=Math.round(u.stockL*w*10)/10,A=S*1e3,E=k>0?Math.round(A/k*10)/10:0,B=S-C,o=k>0?Math.round(k*2/1e3*10)/10:0,l=S<o,p=gs(E),y=Am(E),f=Math.min(E/12*100,100),g=B>=0?"#22c55e":"#ef4444",x=B>=0?`+${ye(Math.round(B))}L 余裕`:`${ye(Math.round(B))}L 不足`,$=w>1.001;return`
        <div class="card" style="border-top:3px solid ${h};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${h};">${d}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${p}20;color:${p};font-weight:600;">${y}</span>
              <button class="btn-edit-stock" data-cat-id="${v}" data-cat="${d}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${v}">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;font-size:11px;margin-bottom:4px;">
              <div><span style="color:#6b7280;">原酒在庫</span><br><strong style="font-size:15px;">${ye(u.stockL)}L</strong></div>
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${ye(Math.round(C))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${ke(k)}L</strong></div>
            </div>
            ${$?`
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${ye(S)}L</div>
                <div style="color:#6b7280;">${m.rawAlcoholPct}% → ${m.targetAlcoholPct}%（×${w.toFixed(2)}）・残<strong>${E.toFixed(1)}</strong>ヶ月</div>
              </div>
            `:""}
            ${(()=>{const P=s.filter(D=>D.parentCategory===d);return P.length===0?"":P.map(D=>{const O=t.filter(N=>N.brewCategory===D.name).reduce((N,R)=>N+R.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${D.name}</span>
                  ${O>0?`<span style="margin-left:4px;">${ye(O)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${v}" style="display:none;margin-bottom:8px;">
            ${(()=>{const P=s.filter(N=>N.parentCategory===d),D=[{name:d,label:d},...P.map(N=>({name:N.name,label:N.name}))],T=D.flatMap(N=>t.filter(M=>M.brewCategory===N.name).map(M=>({...M,catLabel:N.label}))),O=D.map(N=>`<option value="${N.name}">${N.label}</option>`).join("");return`
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${T.map(N=>`
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                      <span style="font-size:11px;flex:1;min-width:60px;">${N.label||"タンク"}</span>
                      <strong style="font-size:13px;">${ye(N.volumeL)}L</strong>
                      ${D.length>1?`
                        <select data-action="brew-reassign-entry" data-id="${N.id}"
                          style="font-size:10px;padding:1px 4px;border:1px solid var(--border);border-radius:3px;max-width:100px;">
                          ${D.map(R=>`<option value="${R.name}" ${R.name===N.brewCategory?"selected":""}>${R.label}</option>`).join("")}
                        </select>
                      `:`<span style="font-size:10px;color:var(--text-secondary);">${N.catLabel}</span>`}
                      <button data-action="brew-delete-entry" data-id="${N.id}" data-cat="${N.brewCategory}"
                        style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                    </div>
                  `).join("")||'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">タンクなし</div>'}
                </div>
                <div style="display:flex;gap:4px;align-items:center;margin-top:6px;flex-wrap:wrap;">
                  ${D.length>1?`<select id="new-entry-target-${v}" style="height:28px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">${O}</select>`:""}
                  <input id="new-entry-label-${v}" type="text" placeholder="タンク名"
                    style="width:80px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <input id="new-entry-vol-${v}" type="number" min="0" step="1" placeholder="L"
                    style="width:60px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <button data-action="brew-add-entry" data-cat="${d}" data-cat-id="${v}"
                    style="font-size:11px;padding:4px 10px;border:none;border-radius:4px;background:#0F5B8D;color:#fff;cursor:pointer;white-space:nowrap;">追加</button>
                </div>
              `})()}
            <div style="border-top:1px solid var(--border);padding-top:8px;margin-top:8px;">
              <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">アルコール度数（加水計算用）</div>
              <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  原酒
                  <input id="alc-raw-${v}" type="number" min="1" max="30" step="0.1" value="${m.rawAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <span style="color:#6b7280;">→</span>
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  出荷
                  <input id="alc-target-${v}" type="number" min="1" max="30" step="0.1" value="${m.targetAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <button data-action="brew-alc-save" data-cat="${d}"
                  style="font-size:10px;padding:3px 8px;border:none;border-radius:4px;background:#2563eb;color:#fff;cursor:pointer;">保存</button>
              </div>
            </div>
            <div style="margin-top:6px;">
              <button class="btn-cancel-stock" data-cat-id="${v}"
                style="font-size:11px;padding:4px 12px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">閉じる</button>
            </div>
          </div>

          <div style="display:flex;gap:8px;margin-bottom:6px;font-size:11px;flex-wrap:wrap;">
            <span style="color:${g};font-weight:600;">年間比 ${x}</span>
            <span style="color:${l?"#ef4444":"#6b7280"};">安全在庫${ye(o)}L${l?" ⚠下回り":" ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${$?"（加水後）":""}</span>
            <span style="font-weight:600;color:${p};">${E.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${p};height:100%;width:${f}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function qm(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const r of e)t.has(r.brewCategory)||t.set(r.brewCategory,[]),t.get(r.brewCategory).push(r);const n=`
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
  `,s=[];for(const r of at){const i=t.get(r);if(!i)continue;const c=ut[r]??"#9ca3af",d=i.length>1,u=i.reduce((S,A)=>S+A.totalShipmentQty,0),h=i.reduce((S,A)=>S+A.totalShipmentMl,0),v=i.reduce((S,A)=>S+A.monthlyAvgQty,0),m=i.reduce((S,A)=>S+A.monthlyAvgMl,0),w=i.reduce((S,A)=>S+A.productCount,0),_=i[0].currentStockL,k=m>0?Math.round(_*1e3/m*10)/10:0,C=gs(k);if(s.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${d?"pointer":"default"};" ${d?`data-toggle-cat="${r}"`:""}>
        <td style="color:${c};">
          ${d?`<span class="toggle-icon" data-cat="${r}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${r}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${w}</td>
        <td style="text-align:right;">${ye(u)}</td>
        <td style="text-align:right;">${ke(h)}</td>
        <td style="text-align:right;">${ye(v)}</td>
        <td style="text-align:right;">${ke(m)}</td>
        <td style="text-align:right;">${ye(_)}</td>
        <td style="text-align:right;color:${C};font-weight:700;">${k.toFixed(1)}</td>
      </tr>
    `),d)for(const S of i)s.push(`
          <tr class="sub-row-${vs(r)}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${S.subCategory}</td>
            <td style="text-align:right;">${S.productCount}</td>
            <td style="text-align:right;">${ye(S.totalShipmentQty)}</td>
            <td style="text-align:right;">${ke(S.totalShipmentMl)}</td>
            <td style="text-align:right;">${ye(S.monthlyAvgQty)}</td>
            <td style="text-align:right;">${ke(S.monthlyAvgMl)}</td>
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
  `}function Tm(e,t,n,s,r,i={}){const c={html:"",needByCategory:{}};if(e.length===0)return c;const d={},u=new Date,h=u.getMonth()+1,v=h>=10?u.getFullYear():u.getFullYear()-1,m=v+1,w=new Map;for(const x of e)w.has(x.brewCategory)||w.set(x.brewCategory,new Map),w.get(x.brewCategory).set(x.fy,{shipL:x.shipmentL,annualL:x.annualizedL});const _=new Map;for(const x of r)_.has(x.brewCategory)||_.set(x.brewCategory,new Map),_.get(x.brewCategory).set(x.monthNum,x.avgMonthlyL);const k=[...new Set(e.map(x=>x.fy))].sort(),C=[...w.keys()].sort((x,$)=>{const P=[...at,...s.map(D=>D.name)];return(P.indexOf(x)===-1?99:P.indexOf(x))-(P.indexOf($)===-1?99:P.indexOf($))}),S=[];for(let x=h;x<=9;x++)S.push(x);if(h>=10)for(let x=1;x<=9;x++)S.push(x);const A=k.filter(x=>x<v),E=k.includes(v),B=C.map(x=>{const $=w.get(x);k.filter(pe=>$.has(pe));const P=ut[x]??"#6366f1",D=_.get(x)??new Map,T=A.filter(pe=>$.has(pe)).map(pe=>$.get(pe).shipL);let O=0;if(T.length>=2){let pe=0,be=0;for(let Fe=1;Fe<T.length;Fe++)if(T[Fe-1]>0){const Yt=(T[Fe]-T[Fe-1])/T[Fe-1],it=Fe;pe+=Yt*it,be+=it}O=be>0?pe/be:0}const N=$.get(v)?.annualL??0,R=T.length>0?T[T.length-1]:0,M=N>0&&R>0?Math.round(R*.4+N*.6):R||N,z=S.reduce((pe,be)=>pe+(D.get(be)??0),0),V=t.filter(pe=>pe.brewCategory===x).reduce((pe,be)=>pe+be.volumeL,0),U=n[x],G=U&&U.targetAlcoholPct>0?U.rawAlcoholPct/U.targetAlcoholPct:1,J=Math.round(V*G),K=Math.max(0,J-Math.round(z)),te=x in i,W=te?i[x]:O,ee=Math.round(W*100),H=Math.round(M*(1+W)),Z=Math.max(0,H-K);d[x]=Z;const Q=ee>0?"#22c55e":ee<0?"#ef4444":"#6b7280",oe=Math.round(O*100),fe=$.get(v)?.annualL??0;return`
      <tr>
        <td style="color:${P};font-weight:600;white-space:nowrap;">${x}</td>
        ${A.map(pe=>`<td style="text-align:right;">${$.has(pe)?ye(Math.round($.get(pe).shipL)):"—"}</td>`).join("")}
        ${E?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${ye(Math.round(fe))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${ee}"
            data-action="brew-growth-edit" data-cat="${x}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${te?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${Q};font-weight:600;${te?"background:rgba(37,99,235,0.06);":""}"
            title="${te?`手動設定（自動: ${T.length>=2?oe+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${ye(J)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${ye(Math.round(z))}</td>
        <td style="text-align:right;font-weight:600;">${ye(K)}</td>
        <td style="text-align:right;">${ye(H)}</td>
        <td style="text-align:right;color:${Z>0?"#ef4444":"#22c55e"};font-weight:700;">${Z>0?ye(Z):"余裕"}</td>
      </tr>
    `}).join("");let o=0,l=0,p=0,y=0,f=0;for(const x of C){const $=w.get(x),P=_.get(x)??new Map,D=A.filter(W=>$.has(W)).map(W=>$.get(W).shipL);let T=0;if(D.length>=2){let W=0,ee=0;for(let H=1;H<D.length;H++)if(D[H-1]>0){const Z=(D[H]-D[H-1])/D[H-1];W+=Z*H,ee+=H}T=ee>0?W/ee:0}const O=$.get(v)?.annualL??0,N=D.length>0?D[D.length-1]:0,R=O>0&&N>0?Math.round(N*.4+O*.6):N||O,M=t.filter(W=>W.brewCategory===x).reduce((W,ee)=>W+ee.volumeL,0),z=n[x],V=z&&z.targetAlcoholPct>0?z.rawAlcoholPct/z.targetAlcoholPct:1,U=Math.round(M*V),G=S.reduce((W,ee)=>W+(P.get(ee)??0),0),J=Math.max(0,U-Math.round(G)),K=x in i?i[x]:T,te=Math.round(R*(1+K));o+=U,l+=Math.round(G),p+=J,y+=te,f+=Math.max(0,te-J)}const g=h<=9?`${h}月〜9月`:`${h}月〜翌9月`;return{needByCategory:d,html:`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 4px 0;">${m}年度 必要醸造量（${m}/10〜${m+1}/9）</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 12px;">
        増減率は完了年度（12ヶ月分）のみで算出。当年度(*)は年換算参考値。
      </p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>区分</th>
              ${A.map(x=>`<th style="text-align:right;">${x}(L)</th>`).join("")}
              ${E?`<th style="text-align:right;">${v}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${g}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${m}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${B}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${A.map(()=>"<td></td>").join("")}
              ${E?"<td></td>":""}
              <td></td>
              <td style="text-align:right;">${ye(o)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${ye(l)}</td>
              <td style="text-align:right;">${ye(p)}</td>
              <td style="text-align:right;">${ye(y)}</td>
              <td style="text-align:right;color:#ef4444;">${ye(f)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}}function Im(e,t,n,s,r){if(e.length===0)return"";const i=new Date,c=i.getMonth()+1,d=i.getFullYear(),u=[];let h=c,v=d;for(let A=0;A<4;A++){const E=[];for(let l=0;l<3;l++)E.push({y:v,m:h}),h++,h>12&&(h=1,v++);const B=`${E[0].y}/${E[0].m}`,o=`${E[2].y}/${E[2].m}`;u.push({label:`${B}-${o}`,months:E})}const m=new Map;for(const A of n)m.has(A.brewCategory)||m.set(A.brewCategory,new Map),m.get(A.brewCategory).set(A.monthNum,A.avgMonthlyL);const w=new Map;for(const A of e)w.has(A.brewCategory)||w.set(A.brewCategory,A.currentStockL);for(const A of r){const E=t.filter(B=>B.brewCategory===A.name).reduce((B,o)=>B+o.volumeL,0);E>0&&w.set(A.name,E)}const _=new Map;for(const A of r)_.has(A.parentCategory)||_.set(A.parentCategory,[]),_.get(A.parentCategory).push(A);const k=[];for(const A of at){(w.has(A)||(m.get(A)?.size??0)>0)&&k.push({cat:A,isChild:!1});for(const E of _.get(A)??[])(w.has(E.name)||(m.get(E.name)?.size??0)>0)&&k.push({cat:E.name,isChild:!0})}function C(A,E){const B=s[A],o=B&&B.targetAlcoholPct>0?B.rawAlcoholPct/B.targetAlcoholPct:1;let l=(w.get(A)??0)*o;const p=m.get(A)??new Map,y=ut[A]??(E?"#6366f1":"#9ca3af");let f="";const g=[];for(const x of u){const $=x.months.reduce((O,{m:N})=>O+(p.get(N)??0),0),P=l;l=Math.max(0,l-$),P>0&&l<=0&&!f&&(f=x.label);const T=l<=0?"#ef4444":l<$?"#eab308":"#22c55e";g.push(`<td style="text-align:right;padding:4px 6px;color:${T};font-weight:${l<=0?"700":"400"};">${l>0?ye(Math.round(l)):"枯渇"}</td>`)}return`
      <tr style="${E?"background:rgba(99,102,241,0.02);":""}">
        <td style="color:${y};font-weight:${E?"500":"600"};padding:4px 6px;white-space:nowrap;${E?"padding-left:20px;font-size:11px;":""}">${E?"┗ ":""}${A}</td>
        <td style="text-align:right;padding:4px 6px;">${ye(Math.round((w.get(A)??0)*o))}</td>
        ${g.join("")}
        <td style="padding:4px 6px;font-size:11px;color:${f?"#ef4444":"#22c55e"};font-weight:600;">
          ${f?`⚠ ${f}`:"12ヶ月+"}
        </td>
      </tr>
    `}const S=k.map(({cat:A,isChild:E})=>C(A,E)).join("");return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 8px 0;">四半期別 在庫枯渇予測</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 10px;">現在庫（加水後）から季節出荷を差し引いた残量推移</p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th style="padding:4px 6px;">区分</th>
              <th style="text-align:right;padding:4px 6px;">現在庫(L)</th>
              ${u.map(A=>`<th style="text-align:right;padding:4px 6px;font-size:10px;">${A.label}</th>`).join("")}
              <th style="padding:4px 6px;">枯渇時期</th>
            </tr>
          </thead>
          <tbody>${S}</tbody>
        </table>
      </div>
    </div>
  `}function Mm(e,t,n){const s=new Map;for(const c of e){s.has(c.brewCategory)||s.set(c.brewCategory,{avgMl:0,totalMl:0,stockL:c.currentStockL});const d=s.get(c.brewCategory);d.avgMl+=c.monthlyAvgMl,d.totalMl+=c.totalShipmentMl}for(const c of n){const d=t.filter(u=>u.brewCategory===c.name).reduce((u,h)=>u+h.volumeL,0);(d>0||s.has(c.name))&&(s.has(c.name)?s.get(c.name).stockL=d:(s.get(c.parentCategory),s.set(c.name,{avgMl:0,totalMl:0,stockL:d})))}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${[...at,...n.map(c=>c.name)].filter(c=>s.has(c)&&(s.get(c).stockL>0||s.get(c).totalMl>0)).map(c=>{const d=s.get(c),u=d.avgMl>0?Math.round(d.stockL*1e3/d.avgMl*10)/10:0,h=d.totalMl/1e3,v=h>0?Math.round(d.stockL/h*100):0,m=n.some(S=>S.name===c),w=ut[c]??(m?"#6366f1":"#9ca3af"),_=d.avgMl>0?gs(u):d.stockL>0?"#22c55e":"#9ca3af",k=d.avgMl>0?Math.min(u/12*100,100):d.stockL>0?100:0,C=d.avgMl>0?`${u.toFixed(1)}ヶ月 / 年間の${v}%`:`${ye(d.stockL)}L在庫`;return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:100px;font-size:12px;font-weight:500;color:${w};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c}">${m?"┗ ":""}${c}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${_};height:100%;width:${k}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">${C}</span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${d.stockL>0?"var(--text)":"#ef4444"};">${ye(d.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function Nm(e,t,n,s,r){if(e.length===0)return"";const i=n.map(m=>m.name);[...at,...i];const c=new Map;for(const m of n)c.has(m.parentCategory)||c.set(m.parentCategory,[]),c.get(m.parentCategory).push(m);const d=new Map;for(const m of e)d.has(m.brewCategory)||d.set(m.brewCategory,[]),d.get(m.brewCategory).push(m);for(const m of i)d.has(m)||d.set(m,[]);const u=new Set;for(const m of n)for(const w of d.get(m.name)??[])u.add(w.productCode);const h=new Map;for(const m of at)h.set(m,d.get(m)??[]);const v=at.filter(m=>d.has(m)).map(m=>{const w=d.get(m)??[],_=ut[m]??"#9ca3af",k=c.get(m)??[],C=k.length>0,S=w.reduce((g,x)=>g+x.annualMl,0),A=w.reduce((g,x)=>g+x.monthlyAvgMl,0),E=w.filter(g=>!u.has(g.productCode)),B=E.filter(g=>!t.has(g.productCode)),o=B.reduce((g,x)=>g+x.annualMl,0),l=B.reduce((g,x)=>g+x.monthlyAvgMl,0),p=E.filter(g=>t.has(g.productCode)),y=E.map(g=>{const x=t.has(g.productCode);return`
          <tr style="${x?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${C?`<input type="checkbox" ${x?"":"checked"} data-action="brew-move-to-child" data-code="${g.productCode}" data-parent="${m}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${x?"color:#b7791f;":""}" title="${g.productName}">
              ${g.productName}${x?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${g.subCategory}</td>
            <td style="text-align:right;">${ke(g.annualMl)}</td>
            <td style="text-align:right;">${ke(g.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),f=k.map(g=>{const x=d.get(g.name)??[],$=x.reduce((M,z)=>M+z.annualMl,0),P=x.reduce((M,z)=>M+z.monthlyAvgMl,0),D=r.filter(M=>M.brewCategory===g.name),T=D.reduce((M,z)=>M+z.volumeL,0),O=vs(g.name),N=x.map(M=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${M.productCode}" data-cat="${g.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${M.productName}"><strong>${M.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${M.subCategory}</td>
            <td style="text-align:right;">${ke(M.annualMl)}</td>
            <td style="text-align:right;">${ke(M.monthlyAvgMl)}</td>
          </tr>
        `).join(""),R=p.filter(M=>!x.some(z=>z.productCode===M.productCode)).map(M=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${M.productCode}" data-cat="${g.name}"
                  style="cursor:pointer;" />
              </td>
              <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${M.productName}">${M.productName}</td>
              <td style="font-size:11px;color:var(--text-secondary);">${M.subCategory}</td>
              <td style="text-align:right;color:var(--text-secondary);">${ke(M.annualMl)}</td>
              <td style="text-align:right;color:var(--text-secondary);">${ke(M.monthlyAvgMl)}</td>
            </tr>
          `).join("");return`
          <tr><td colspan="5" style="padding:0;">
            <div style="border-left:3px solid #6366f1;margin:8px 0 8px 16px;padding:6px 0 6px 12px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <strong style="font-size:12px;color:#6366f1;">${g.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${x.length}品 ・ ${ke($)}L/年${T>0?` ・ 在庫${ye(T)}L`:""}</span>
                <button class="btn-edit-stock" data-cat-id="${O}" data-cat="${g.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${g.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${O}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${D.map(M=>`
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${M.label||"タンク"}</span>
                    <strong style="font-size:11px;">${ye(M.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${M.id}" data-cat="${g.name}"
                      style="font-size:9px;padding:1px 4px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">×</button>
                  </div>
                `).join("")}
                <div style="display:flex;gap:3px;align-items:center;margin-top:3px;">
                  <input id="new-entry-label-${O}" type="text" placeholder="名前" style="width:70px;height:22px;font-size:10px;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <input id="new-entry-vol-${O}" type="number" min="0" placeholder="L" style="width:50px;height:22px;font-size:10px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <button data-action="brew-add-entry" data-cat="${g.name}" data-cat-id="${O}"
                    style="font-size:9px;padding:2px 6px;border:none;border-radius:3px;background:#0F5B8D;color:#fff;cursor:pointer;">追加</button>
                </div>
                <button class="btn-cancel-stock" data-cat-id="${O}" style="font-size:9px;padding:2px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;margin-top:3px;">閉じる</button>
              </div>
              ${N.length>0||R.length>0?`
                <table class="data-table" style="font-size:11px;margin:0;">
                  <tbody>
                    ${N}
                    ${R}
                  </tbody>
                  ${x.length>0?`<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${ke($)}</td><td style="text-align:right;">${ke(P)}</td>
                  </tr></tfoot>`:""}
                </table>
              `:'<div style="font-size:10px;color:var(--text-secondary);padding:4px;">親からチェックを外すとここに候補表示されます</div>'}
            </div>
          </td></tr>
        `}).join("");return`
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${_};"></span>
            <h4 style="margin:0;font-size:14px;">${m}</h4>
            <span style="font-size:12px;color:var(--text-secondary);">
              全${w.length}銘柄 ・ 年間${ke(S)}L
              ${C?`（内 ${k.map(g=>`${g.name}:${(d.get(g.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${C?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${y}
                ${f}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${ke(S)}</td><td style="text-align:right;">${ke(A)}</td></tr>
                ${C?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${ke(o)}</td><td style="text-align:right;">${ke(l)}</td></tr>`:""}
                ${p.length>0?`<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${p.length}品</td>
                  <td style="text-align:right;">${ke(p.reduce((g,x)=>g+x.annualMl,0))}</td>
                  <td style="text-align:right;">${ke(p.reduce((g,x)=>g+x.monthlyAvgMl,0))}</td></tr>`:""}
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
            ${at.filter(m=>m!=="その他").map(m=>`<option value="${m}">${m}</option>`).join("")}
          </select>
          <input id="brew-new-category-name" type="text" placeholder="新しい区分名"
            style="font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;width:120px;" />
          <button data-action="brew-add-category" class="button primary"
            style="font-size:12px;padding:4px 12px;">追加</button>
        </div>
      </div>
      ${v}
    </div>
  `}function Rm(e,t,n,s=[],r=new Set,i=[],c={},d=[],u={},h=[],v=[],m={},w={}){const _=new Date,k=_.getMonth()>=9?_.getFullYear():_.getFullYear()-1,C=Array.from({length:5},(A,E)=>{const B=k-E;return`<option value="${B}" ${B===n?"selected":""}>${B}年度 (${B}/10-${B+1}/9)</option>`}).join(""),S=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return S||`
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div>
          <h2 style="margin:0;font-size:18px;">醸造計画</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;">特定名称酒区分別の出荷実績と在庫状況</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <label for="brewing-fy-select" style="font-size:13px;font-weight:500;">会計年度:</label>
          <select id="brewing-fy-select" class="input" style="width:auto;min-width:200px;">
            ${C}
          </select>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:14px;margin:0 0 8px 0;">月次移出推移（区分別）</h3>
        ${Cm(t)}
      </div>

      ${Dm(e,d,u,i)}

      ${Tm(h,d,u,i,v,m).html}

      ${Mm(e,d,i)}

      ${Im(e,d,v,u,i)}

      ${Nm(s,r,i,c,d)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${qm(e)}
      </div>
    </section>
  `}const bn={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Om=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"],Zt=[10,11,12,1,2,3,4,5,6,7,8,9],ro=["10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月","9月"],vt=[9,10,11,12,1,2,3,4,5],Bm=["9月","10月","11月","12月","1月","2月","3月","4月","5月"];function le(e){return e.toLocaleString("ja-JP")}function zm(e,t,n,s=[],r=2026,i=[],c=[],d={}){const h=[...new Set([...Object.keys(e).filter(g=>e[g]>0),...s.filter(g=>g.plannedVolumeL>0).map(g=>g.brewCategory)])];if(h.length===0)return'<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>';const v=[...Om,...n.map(g=>g.name)];h.sort((g,x)=>(v.indexOf(g)===-1?99:v.indexOf(g))-(v.indexOf(x)===-1?99:v.indexOf(x)));const m={polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0},w=new Map;for(const g of s)w.has(g.brewCategory)||w.set(g.brewCategory,[]),w.get(g.brewCategory).push(g);const _=(g,x,$,P,D)=>`<input type="number" step="${D}" value="${$}" data-action="brew-rice-edit" data-cat="${x}" data-field="${g}"
        style="width:${P};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`,k=(g,x,$)=>`<select data-action="brew-rice-variety-select" data-cat="${x}" data-field="${g}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${i.map(P=>`<option value="${P.name}" ${P.name===$?"selected":""}>${P.name}${P.region?` (${P.region})`:""}</option>`).join("")}
      ${!i.some(P=>P.name===$)&&$?`<option value="${$}" selected>${$}</option>`:""}
    </select>`;let C=0,S=0,A=0,E=0;const B=Zt.map(()=>0),o=new Map,l=h.map(g=>{const x=e[g]??0,$=t[g]??m,P=bn[g]??"#6366f1",D=w.get(g)??[],T=g in d,O=D.reduce((Q,oe)=>Q+oe.plannedVolumeL,0),N=D.length>0,R=T?d[g]:N?O:x,M=$.alcoholAdditionRatio??0,z=R*(1-M),V=Math.round(z*$.ricePerLiterKg),U=Math.round(V*$.kojiRatio),G=V-U,J=Math.round(U/$.polishingRatio),K=Math.round(G/$.polishingRatio),te=J+K,W=Math.round(J*$.kojiPricePerKg),ee=Math.round(K*$.kakePricePerKg);C+=J,S+=K,A+=W,E+=ee;for(const[Q,oe,fe,pe]of[[$.kojiVariety,J,$.kojiPricePerKg,"麹米"],[$.kakeVariety,K,$.kakePricePerKg,"掛米"]]){if(oe<=0)continue;o.has(Q)||o.set(Q,{brownKg:0,pricePerKg:fe,cost:0,usage:[]});const be=o.get(Q);be.brownKg+=oe,be.cost+=Math.round(oe*fe),be.pricePerKg=Math.round(be.cost/be.brownKg),be.usage.push({cat:g,type:pe,kg:oe})}const H=Zt.map(()=>0);if(D.length>0)for(const Q of D){const oe=Zt.indexOf(Q.brewMonth);oe>=0&&(H[oe]+=Q.plannedVolumeL)}else{const Q=R/12;for(let oe=0;oe<12;oe++)H[oe]=Q}const Z=H.reduce((Q,oe)=>Q+oe,0)||1;for(let Q=0;Q<12;Q++){const oe=H[Q]/Z;B[Q]+=Math.round(te*oe)}return`
      <div class="card" style="border-top:3px solid ${P};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${P};">${g}</h4>
          <div style="font-size:12px;">${R>0?`予算 <strong>¥${le(W+ee)}</strong>`:'<span style="color:#6b7280;font-weight:600;">醸造しない</span>'}</div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(R)}"
              data-action="proc-edit-vol" data-cat="${g}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid ${T?"#2563eb":"var(--border)"};border-radius:4px;padding:0 4px;font-weight:600;${T?"background:rgba(37,99,235,0.04);":""}" />L
          </label>
          ${M>0?`<span style="color:var(--text-secondary);">−${Math.round(M*100)}%→${le(Math.round(z))}L</span>`:""}
          ${x>0&&Math.abs(x-R)>10?`<span style="color:var(--text-secondary);font-size:11px;">(予測${le(Math.round(x))})</span>`:""}
        </div>

        <div style="border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:8px;background:var(--surface-alt);">
          <div style="font-size:11px;font-weight:600;color:${P};margin-bottom:6px;">醸造スケジュール${D.length>0?` (${le(Math.round(D.reduce((Q,oe)=>Q+oe.plannedVolumeL,0)))}L / ${le(Math.round(R))}L)`:""}</div>
          ${D.length>0?`
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
              ${D.map(Q=>`
                <div style="display:flex;align-items:center;gap:3px;padding:3px 8px;border-radius:4px;background:${P}15;border:1px solid ${P}30;">
                  <span style="font-size:11px;font-weight:600;color:${P};">${Q.brewMonth}月</span>
                  <input type="number" min="0" max="${Math.round(R)}" step="100" value="${Math.round(Q.plannedVolumeL)}"
                    data-action="proc-sched-edit-vol" data-cat="${g}" data-month="${Q.brewMonth}"
                    style="width:56px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />L
                  <button data-action="proc-sched-remove" data-cat="${g}" data-month="${Q.brewMonth}"
                    style="border:none;background:none;color:#ef4444;cursor:pointer;font-size:14px;padding:0 2px;line-height:1;">×</button>
                </div>
              `).join("")}
            </div>
          `:'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px;">醸造月を追加してください</div>'}
          <div style="display:flex;align-items:center;gap:4px;">
            <select data-action="proc-add-month-select" data-cat="${g}"
              style="height:24px;font-size:11px;border:1px solid var(--border);border-radius:3px;padding:0 4px;">
              ${[10,11,12,1,2,3,4,5,6,7,8,9].filter(Q=>!D.some(oe=>oe.brewMonth===Q)).map(Q=>`<option value="${Q}">${Q}月</option>`).join("")}
            </select>
            <input type="number" min="0" max="${Math.round(R)}" step="100" placeholder="L"
              data-action="proc-add-month-vol" data-cat="${g}"
              style="width:56px;height:24px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />
            <button data-action="proc-add-schedule" data-cat="${g}"
              style="height:24px;font-size:11px;padding:0 8px;border:1px solid ${P};background:${P}10;color:${P};border-radius:3px;cursor:pointer;">+追加</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${_("ricePerLiterKg",g,$.ricePerLiterKg,"48px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${_("kojiRatio",g,$.kojiRatio,"44px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${_("polishingRatio",g,$.polishingRatio,"44px","0.01")}</label>
          ${M>0||g==="本醸造"||g==="普通酒"?`<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${_("alcoholAdditionRatio",g,$.alcoholAdditionRatio??0,"44px","0.01")}</label>`:""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${k("kojiVariety",g,$.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${_("kojiPricePerKg",g,$.kojiPricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${le(J)}kg</strong> <span style="color:var(--text-secondary);">(${(J/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${le(W)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${k("kakeVariety",g,$.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${_("kakePricePerKg",g,$.kakePricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${le(K)}kg</strong> <span style="color:var(--text-secondary);">(${(K/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${le(ee)}</div>
          </div>
        </div>
      </div>
    `}).join(""),p=C+S,y=A+E,f=Math.max(...B,1);return Zt.map((g,x)=>{const $=B[x];return`
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${$/f*100}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${$>0?2:0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${ro[x]}</div>
        <div style="font-size:10px;font-weight:600;">${$>0?le($):""}</div>
        <div style="font-size:9px;color:var(--text-secondary);">${$>0?($/60).toFixed(0)+"俵":""}</div>
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
        <div style="display:grid;grid-template-columns:80px repeat(${vt.length},1fr);font-size:11px;min-width:500px;">
          <div style="padding:4px;font-weight:600;">区分</div>
          ${Bm.map(g=>`<div style="text-align:center;padding:4px;font-weight:600;border-left:1px solid var(--border);">${g}</div>`).join("")}
        </div>
        ${(()=>{const g=[],x=vt.length,$=new Map;for(const T of c)T.deliveryMonth&&($.has(T.varietyName)||$.set(T.varietyName,[]),$.get(T.varietyName).push(T.deliveryMonth));for(const[T,O]of $){const N=vt.map(R=>{const M=O.includes(R),z=c.filter(V=>V.varietyName===T&&V.deliveryMonth===R).reduce((V,U)=>V+U.committedBales,0);return`<div style="text-align:center;padding:3px;border-left:1px solid var(--border);${M?"background:#dcfce7;":""}">
                ${M?`<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${z}俵</div>`:""}
              </div>`}).join("");g.push(`<div style="display:grid;grid-template-columns:80px repeat(${x},1fr);border-top:1px solid var(--border);">
              <div style="padding:4px;color:#16a34a;font-weight:500;font-size:10px;">📥 ${T}</div>${N}
            </div>`)}const P=34,D=2;for(const T of h){const O=w.get(T)??[],N=bn[T]??"#6366f1",R=T in d,M=O.reduce((H,Z)=>H+Z.plannedVolumeL,0),z=O.length>0,V=R?d[T]:z?M:e[T]??0,U=[],G=[...O].sort((H,Z)=>vt.indexOf(H.brewMonth)-vt.indexOf(Z.brewMonth)),J=[];for(const H of G){const Z=vt.indexOf(H.brewMonth);if(Z<0)continue;const Q=Math.min(H.durationMonths,x-Z),oe=Z+Q;let fe=0;for(;fe<J.length&&J[fe]>Z;)fe++;fe>=J.length?J.push(oe):J[fe]=oe,U.push({s:H,startIdx:Z,dur:Q,lane:fe})}const te=Math.max(J.length,1)*(P+D)+D,W=vt.map(()=>`<div style="border-left:1px solid var(--border);height:${te}px;"></div>`).join(""),ee=U.map(({s:H,startIdx:Z,dur:Q,lane:oe})=>{const fe=(Z/x*100).toFixed(2),pe=(Q/x*100).toFixed(2),be=D+oe*(P+D);return`<div class="gantt-bar" data-cat="${T}" data-month="${H.brewMonth}" data-dur="${Q}" data-vol="${Math.round(H.plannedVolumeL)}" data-max="${Math.round(V)}"
                style="position:absolute;left:${fe}%;width:${pe}%;top:${be}px;height:${P}px;
                  background:${N}30;border:2px solid ${N};border-radius:6px;cursor:grab;
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${N};overflow:hidden;box-sizing:border-box;">
                <div class="gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
                <span class="gantt-bar-label" style="pointer-events:none;white-space:nowrap;">${le(Math.round(H.plannedVolumeL))}L</span>
                <div class="gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
              </div>`}).join("");g.push(`<div style="display:grid;grid-template-columns:80px 1fr;border-top:1px solid var(--border);">
              <div style="padding:4px;color:${N};font-weight:500;font-size:10px;display:flex;align-items:center;">🍶 ${T}</div>
              <div style="position:relative;display:grid;grid-template-columns:repeat(${x},1fr);">
                ${W}
                <div class="gantt-bar-container" data-cat="${T}" data-max="${Math.round(V)}" data-cols="${x}" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                  ${ee}
                </div>
              </div>
            </div>`)}return g.join("")||'<div style="text-align:center;color:var(--text-secondary);padding:16px;">区分を追加するとタイムラインが表示されます</div>'})()}
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(()=>{const g=h.map($=>{const P=t[$]??m,D=w.get($)??[],T=$ in d,O=D.reduce((U,G)=>U+G.plannedVolumeL,0),N=D.length>0,R=T?d[$]:N?O:e[$]??0,M=R*(1-(P.alcoholAdditionRatio??0)),z=Math.round(M*P.ricePerLiterKg),V=Math.round(z/P.polishingRatio);return{cat:$,brewingL:R,brownKg:V,color:bn[$]??"#6366f1"}}).filter($=>$.brewingL>0||$.brownKg>0),x=Math.max(...g.map($=>$.brownKg),1);return g.map($=>{const P=Math.min($.brownKg/x*100,100);return`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="width:90px;font-size:11px;font-weight:500;color:${$.color};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${$.cat}</span>
              <div style="flex:1;background:#e5e7eb;border-radius:3px;height:20px;overflow:hidden;position:relative;">
                <div style="background:${$.color};opacity:0.7;height:100%;width:${P}%;border-radius:3px;"></div>
                <span style="position:absolute;top:2px;left:6px;font-size:10px;font-weight:600;color:#374151;">${le($.brownKg)}kg (${Math.ceil($.brownKg/60)}俵)</span>
              </div>
              <span style="width:60px;font-size:10px;text-align:right;color:var(--text-secondary);">${le(Math.round($.brewingL))}L</span>
            </div>
          `}).join("")})()}
    </section>

    ${l}

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
            ${[...o.entries()].sort((g,x)=>x[1].brownKg-g[1].brownKg).map(([g,x])=>{const $=(x.brownKg/60).toFixed(1),P=x.usage.map(D=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${D.type==="麹米"?"rgba(99,102,241,0.08)":"rgba(183,121,31,0.08)"};margin-right:3px;">${D.cat}/${D.type} ${le(D.kg)}kg</span>`).join("");return`
                <tr>
                  <td style="font-weight:600;">${g}</td>
                  <td style="text-align:right;font-weight:600;">${le(x.brownKg)}</td>
                  <td style="text-align:right;">${$}</td>
                  <td style="text-align:right;">¥${le(x.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${le(x.cost)}</td>
                  <td style="max-width:300px;overflow-x:auto;">${P}</td>
                </tr>
              `}).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              <td style="text-align:right;">${le(p)}</td>
              <td style="text-align:right;">${Math.ceil(p/60)}</td>
              <td></td>
              <td style="text-align:right;">¥${le(y)}</td>
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
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${le(C)}kg</strong> <span style="color:var(--text-secondary);">(${(C/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${le(A)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${le(S)}kg</strong> <span style="color:var(--text-secondary);">(${(S/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${le(E)}</div>
        </div>
        <div style="background:var(--surface-alt);border-radius:8px;padding:14px;border:2px solid var(--border);">
          <div style="font-size:11px;font-weight:600;">総合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${le(p)}kg</strong> <span style="color:var(--text-secondary);">(${Math.ceil(p/60)}俵)</span></div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">¥${le(y)}<span style="font-size:13px;font-weight:400;margin-left:4px;">(${(y/1e4).toFixed(0)}万)</span></div>
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
      ${(()=>{const g=new Map;for(const[N,R]of o)g.set(N,R.brownKg);const x=new Map;for(const N of c){x.has(N.varietyName)||x.set(N.varietyName,{bales:0,kg:0,cost:0,suppliers:[]});const R=x.get(N.varietyName);R.bales+=N.committedBales,R.kg+=N.committedBales*60,R.cost+=N.committedBales*60*N.pricePerKg,N.supplier&&!R.suppliers.includes(N.supplier)&&R.suppliers.push(N.supplier)}const $=[...new Set([...g.keys(),...x.keys()])];let P=0,D=0;const T=$.map(N=>{const R=g.get(N)??0,M=x.get(N),z=M?.kg??0,V=z-R;P+=z,D+=R;const U=V>=0?"#22c55e":"#ef4444",G=V>=0?`+${le(Math.round(V))}kg余裕`:`${le(Math.round(V))}kg不足`,J=z>0?Math.min(R/z*100,100):0;return`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${N}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${le(Math.round(z))}kg (${M?.bales??0}俵)</span>
                  <span>必要 ${le(Math.round(R))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${J}%;background:${z>0?V>=0?"#22c55e":"#ef4444":"#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${U};">${z>0?G:"未確保"}</span>
            </div>
          `}).join(""),O=P-D;return`
          <div style="margin-bottom:12px;">
            ${T||'<p style="color:var(--text-secondary);text-align:center;padding:12px;">作付け予定が未登録です</p>'}
          </div>
          ${P>0?`
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;padding:8px;background:var(--surface-alt);border-radius:6px;">
              <span>確保合計: <strong>${le(Math.round(P))}kg</strong> (${Math.ceil(P/60)}俵)</span>
              <span>必要合計: <strong>${le(Math.round(D))}kg</strong></span>
              <span style="color:${O>=0?"#22c55e":"#ef4444"};font-weight:600;">
                ${O>=0?`余裕 ${le(Math.round(O))}kg`:`不足 ${le(Math.round(-O))}kg`}
              </span>
            </div>
          `:""}
          <div style="display:flex;gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap;">
            <select id="proc-commit-variety" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;">
              ${i.map(N=>`<option value="${N.name}">${N.name}</option>`).join("")}
            </select>
            <input id="proc-commit-bales" type="number" min="0" step="1" placeholder="俵数"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <input id="proc-commit-price" type="number" min="0" step="10" placeholder="円/kg"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <select id="proc-commit-month" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">
              <option value="">入荷月</option>
              ${Zt.map((N,R)=>`<option value="${N}">${ro[R]}</option>`).join("")}
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
        ${i.map(g=>`
          <div style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;margin:2px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
            <strong>${g.name}</strong>
            <span style="color:var(--text-secondary);">¥${le(g.defaultPricePerKg)}/kg</span>
            ${g.region?`<span style="color:var(--text-secondary);font-size:10px;">${g.region}</span>`:""}
            <button data-action="proc-delete-variety" data-id="${g.id}"
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
  `}const jm={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Fm={planned:"計画中",active:"進行中",completed:"完了"},ti={未着手:"#d1d5db",進行中:"#3b82f6",完了:"#22c55e"},ot=6;function bs(e){return e.toLocaleString("ja-JP")}function ba(e){return jm[e]??"#6366f1"}function Da(e,t){return Math.round((new Date(t).getTime()-new Date(e).getTime())/864e5)}function Vm(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n.toISOString().slice(0,10)}function Ue(e){return e?e.slice(5).replace("-","/"):"―"}function Ym(e){if(e.length<=4)return e;const t=e.match(/[（(](.+?)[）)]/);return t?t[1].slice(0,3):e.includes("→")?e.split("→")[1]?.slice(0,3)??e.slice(0,3):e.slice(0,3)}function Um(e,t,n){const s=e.filter(A=>A.status!=="completed"&&A.startDate&&A.targetEndDate);if(s.length===0)return"";const r=s.flatMap(A=>[A.startDate,A.targetEndDate]),i=s.flatMap(A=>t[A.id]??[]);for(const A of i)A.plannedStart&&r.push(A.plannedStart),A.plannedEnd&&r.push(A.plannedEnd);r.sort();const c=r[0],d=r[r.length-1],u=Math.min(Da(c,d)+7,180),h=u*ot,v=[];let m="";for(let A=0;A<u;A++){const E=Vm(c,A),B=E.slice(0,7);B!==m&&(v.push(`<span style="position:absolute;left:${A*ot}px;font-size:9px;color:#6b7280;white-space:nowrap;border-left:1px solid #d1d5db;padding-left:2px;">${parseInt(E.slice(5,7))}月</span>`),m=B)}const w=new Date().toISOString().slice(0,10),_=Da(c,w),k=_>=0&&_<u?`<div style="position:absolute;left:${_*ot}px;top:0;width:2px;height:100%;background:#ef4444;z-index:5;opacity:0.7;pointer-events:none;"></div>`:"",C=30,S=s.map(A=>{const E=(t[A.id]??[]).sort((p,y)=>p.stepOrder-y.stepOrder),B=ba(A.brewCategory),o=n===A.id,l=E.map(p=>{const y=Math.max(Da(c,p.plannedStart),0),f=Math.min(Da(c,p.plannedEnd),u-1),g=y*ot,x=Math.max((f-y+1)*ot,ot),$=ti[p.status],P=p.status==="未着手"?"#555":"#fff";return`<div class="bp-gantt-bar" data-step-id="${p.id}" data-batch-id="${p.batchId}" data-step-order="${p.stepOrder}" data-planned-start="${p.plannedStart}" data-planned-end="${p.plannedEnd}" style="position:absolute;left:${g}px;top:4px;width:${x}px;height:22px;background:${$};border-radius:3px;font-size:7px;line-height:22px;color:${P};overflow:hidden;white-space:nowrap;cursor:grab;border:1px solid ${p.status==="未着手"?"#bbb":$};" title="${p.stepName} ${Ue(p.plannedStart)}〜${Ue(p.plannedEnd)}"><div class="bp-gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div><span style="padding:0 16px;pointer-events:none;">${x>24?Ym(p.stepName):""}</span><div class="bp-gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div></div>`}).join("");return`<div style="display:flex;align-items:center;border-bottom:1px solid ${o?"#3b82f6":"#f3f4f6"};min-height:${C}px;background:${o?"#eff6ff":"transparent"};" data-action="bp-toggle-detail" data-batch-id="${A.id}">
      <div style="width:120px;flex-shrink:0;padding:2px 6px;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;">
        <span style="color:${B};font-weight:600;">${A.batchCode}</span>
        <span style="color:#9ca3af;display:block;font-size:8px;">${A.brewCategory}</span>
      </div>
      <div style="position:relative;width:${h}px;height:${C}px;background:repeating-linear-gradient(90deg,transparent 0 ${ot*7-1}px,#f3f4f6 ${ot*7-1}px ${ot*7}px);">${l}</div>
    </div>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>醸造ガントチャート</h2><p class="panel-caption">仕込をクリックで詳細表示 ／ バーをドラッグで日程調整</p></div>
    <div id="bp-gantt" style="overflow-x:auto;touch-action:none;user-select:none;">
      <div style="min-width:${h+120}px;">
        <div style="display:flex;align-items:flex-end;">
          <div style="width:120px;flex-shrink:0;"></div>
          <div style="position:relative;width:${h}px;height:20px;">${v.join("")}</div>
        </div>
        <div style="position:relative;">${S}${k}</div>
      </div>
    </div>
  </section>`}function Jm(e,t){const n=[...t].sort((C,S)=>C.stepOrder-S.stepOrder);if(n.length===0)return"";const s=120,r=50,i=40,c=20,d=5,u=Math.ceil(n.length/d),h=d*(s+i)-i+20,v=u*(r+c)-c+20,m=C=>{const S=Math.floor(C/d);return{x:10+(S%2===0?C%d:d-1-C%d)*(s+i),y:10+S*(r+c)}},w=n.map((C,S)=>{const A=m(S),E=ti[C.status],B=C.status==="進行中"?"#1d4ed8":C.status==="完了"?"#15803d":"#9ca3af",o=C.status==="未着手"?"#374151":"#fff";return`<g>
      <rect x="${A.x}" y="${A.y}" width="${s}" height="${r}" rx="6" fill="${E}" stroke="${B}" stroke-width="2"/>
      <text x="${A.x+s/2}" y="${A.y+20}" text-anchor="middle" fill="${o}" font-size="11" font-weight="600">${C.stepName}</text>
      <text x="${A.x+s/2}" y="${A.y+36}" text-anchor="middle" fill="${o}" font-size="9" opacity="0.8">${Ue(C.plannedStart)}〜${Ue(C.plannedEnd)}</text>
    </g>`}).join(""),_=n.slice(1).map((C,S)=>{const A=m(S),E=m(S+1),B=A.x+s/2,o=A.y+r/2,l=E.x+s/2,p=E.y+r/2;if(Math.floor(S/d)===Math.floor((S+1)/d)){const f=l>B?1:-1,g=A.x+(f>0?s:0),x=o,$=E.x+(f>0?0:s);return`<line x1="${g}" y1="${x}" x2="${$}" y2="${p}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}else{const f=A.y+r,g=E.y;return`<line x1="${B}" y1="${f}" x2="${l}" y2="${g}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}}).join("");return`<div id="bp-network" style="margin-bottom:16px;">
    <section class="panel">
      <div class="panel-header">
        <h2 style="display:flex;align-items:center;gap:6px;">
          <span style="color:${ba(e.brewCategory)};">●</span> ${e.batchCode} 醸造工程フロー
        </h2>
        <p class="panel-caption">クリティカルパス（全工程直列）</p>
      </div>
      <div style="overflow-x:auto;padding:8px 0;">
        <svg width="${h}" height="${v}" style="display:block;">
          <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/></marker></defs>
          ${_}${w}
        </svg>
      </div>
    </section>
  </div>`}function Hm(e,t,n,s=[]){if(e.length===0)return'<div class="panel" style="padding:20px;text-align:center;color:#9ca3af">仕込が未登録です。調達計画から取込むか、新規登録してください。</div>';const r=new Set(s),i=e.length>0&&e.every(h=>r.has(h.id)),c=s.length>0,d=e.map(h=>{const v=t[h.id]??[],m=v.length,w=v.filter(A=>A.status==="完了").length,_=m>0?Math.round(w/m*100):0,k=ba(h.brewCategory),C=n===h.id,S=r.has(h.id);return`<tr style="border-bottom:1px solid #f3f4f6;background:${S?"#fef2f2":C?"#eff6ff":"transparent"};cursor:pointer;" data-action="bp-toggle-detail" data-batch-id="${h.id}">
      <td style="padding:4px 6px;text-align:center;" onclick="event.stopPropagation()">
        <input type="checkbox" data-action="bp-batch-check" data-batch-id="${h.id}" ${S?"checked":""} style="cursor:pointer;width:14px;height:14px;">
      </td>
      <td style="padding:6px;font-size:12px;font-weight:600;color:${k};">${h.batchCode}</td>
      <td style="padding:6px;font-size:11px;"><span style="background:${k};color:#fff;padding:1px 6px;border-radius:9999px;font-size:10px;">${h.brewCategory}</span></td>
      <td style="padding:6px;font-size:11px;text-align:right;">
        <input type="number" min="0" step="100" value="${Math.round(h.plannedVolumeL)}" data-action="bp-batch-vol" data-batch-id="${h.id}" style="width:60px;font-size:11px;text-align:right;border:1px solid #e5e7eb;border-radius:3px;padding:2px 4px;" onclick="event.stopPropagation()">L
      </td>
      <td style="padding:6px;font-size:11px;">
        <input type="date" value="${h.startDate}" data-action="bp-batch-date" data-batch-id="${h.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
      </td>
      <td style="padding:6px;">
        <select data-action="bp-batch-status" data-batch-id="${h.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
          ${["planned","active","completed"].map(A=>`<option value="${A}"${h.status===A?" selected":""}>${Fm[A]}</option>`).join("")}
        </select>
      </td>
      <td style="padding:6px;width:80px;">
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="flex:1;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
            <div style="width:${_}%;height:100%;background:${k};border-radius:3px;"></div>
          </div>
          <span style="font-size:9px;color:#6b7280;white-space:nowrap;">${_}%</span>
        </div>
      </td>
      <td style="padding:6px;text-align:center;">
        <button data-action="bp-show-delete-modal" data-batch-id="${h.id}" data-batch-code="${h.batchCode}" style="font-size:10px;padding:2px 8px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;" onclick="event.stopPropagation()">削除</button>
      </td>
    </tr>`}).join(""),u=c?`<button data-action="bp-bulk-delete" style="font-size:12px;padding:4px 14px;border:1px solid #ef4444;color:#ef4444;background:white;border-radius:5px;cursor:pointer;font-weight:600;">選択した ${s.length}件を削除</button>`:"";return`<section class="panel" style="margin-bottom:16px;">
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
  </section>`}function Qm(e,t){if(e.length===0)return"";const n=new Set(t.map(i=>`${i.brewCategory}:${i.startDate?.slice(0,7)}`)),s=e.filter(i=>{const c=i.brewMonth>=10?i.fy:i.fy+1,d=`${i.brewCategory}:${c}-${String(i.brewMonth).padStart(2,"0")}`;return!n.has(d)&&i.plannedVolumeL>0});return s.length===0?"":`<section class="panel" style="margin-bottom:16px">
    <div class="panel-header">
      <div><h2>調達計画から取込</h2><p class="panel-caption">未登録のスケジュールを一括で仕込登録</p></div>
      <button class="button primary" data-action="bp-import-schedule" style="font-size:12px;">一括仕込登録</button>
    </div>
    <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid #e5e7eb;color:#6b7280;text-align:left;font-size:10px">
        <th style="padding:3px 6px">区分</th><th style="padding:3px 6px">コード</th><th style="padding:3px 6px;text-align:right">醸造量</th><th style="padding:3px 6px">開始月</th><th style="padding:3px 3px;text-align:center">選択</th>
      </tr></thead><tbody>${s.map(i=>{const d=`${i.brewMonth>=10?i.fy:i.fy+1}-${String(i.brewMonth).padStart(2,"0")}-01`,u=`${i.brewCategory}-${i.fy}-${String(i.brewMonth).padStart(2,"0")}`;return`<tr>
      <td style="padding:5px 6px"><span style="color:${ba(i.brewCategory)};font-weight:600;font-size:11px;">${i.brewCategory}</span></td>
      <td style="padding:5px 6px;font-size:11px;">${u}</td>
      <td style="padding:5px 6px;text-align:right;font-size:11px;">${bs(Math.round(i.plannedVolumeL))}L</td>
      <td style="padding:5px 6px;font-size:11px;">${i.brewMonth}月（${d}）</td>
      <td style="padding:5px 3px;text-align:center;"><input type="checkbox" data-action="bp-import-check" data-cat="${i.brewCategory}" data-month="${i.brewMonth}" data-vol="${Math.round(i.plannedVolumeL)}" data-date="${d}" data-code="${u}" checked></td>
    </tr>`}).join("")}</tbody></table></div>
  </section>`}function Km(e){return`<div class="panel" style="margin-bottom:16px">
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
  </div>`}function Wm(e,t){const n=[...t].sort((i,c)=>i.stepOrder-c.stepOrder);if(n.length===0)return"";const s=n.map(i=>`<tr style="border-bottom:1px solid #f3f4f6">
    <td style="padding:4px 6px;font-size:11px;font-weight:${i.status==="進行中"?700:400}">${i.stepName}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${Ue(i.plannedStart)}〜${Ue(i.plannedEnd)}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${i.actualStart?Ue(i.actualStart):"―"}〜${i.actualEnd?Ue(i.actualEnd):"―"}</td>
    <td style="padding:4px 3px">
      <select data-action="bp-step-status" data-step-id="${i.id}" data-batch-id="${i.batchId}" style="font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px">
        ${["未着手","進行中","完了"].map(c=>`<option value="${c}"${i.status===c?" selected":""}>${c}</option>`).join("")}
      </select>
    </td>
    <td style="padding:4px 3px"><input type="number" step="0.1" data-action="bp-step-temp" data-step-id="${i.id}" value="${i.temperature??""}" placeholder="℃" style="width:50px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
    <td style="padding:4px 3px"><input type="text" data-action="bp-step-notes" data-step-id="${i.id}" value="${i.notes}" placeholder="メモ" style="width:100px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
  </tr>`).join("");return`<section class="panel" style="margin-bottom:16px;border-left:4px solid ${ba(e.brewCategory)};">
    <div class="panel-header"><h2>${e.batchCode} 工程詳細</h2><p class="panel-caption">${e.brewCategory} ｜ ${bs(e.plannedVolumeL)}L ｜ ${Ue(e.startDate)}〜${Ue(e.targetEndDate)}</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:500px">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left">
          <th style="padding:3px 6px">工程</th><th style="padding:3px 6px">予定</th><th style="padding:3px 6px">実績</th>
          <th style="padding:3px 3px">状態</th><th style="padding:3px 3px">温度</th><th style="padding:3px 3px">メモ</th>
        </tr></thead>
        <tbody>${s}</tbody>
      </table>
    </div>
  </section>`}function Gm(e,t,n){const s=new Map;for(const i of t){if(!i.tankNo||i.status==="completed")continue;const c=n[i.id]??[],d=c.find(h=>h.stepName==="蒸米→添仕込"),u=c.find(h=>h.stepName==="上槽");d?.plannedStart&&u?.plannedEnd&&(s.has(i.tankNo)||s.set(i.tankNo,[]),s.get(i.tankNo).push({batchCode:i.batchCode,start:d.plannedStart,end:u.plannedEnd}))}const r=e.map(i=>{const c=s.get(i.tankNo)??[],d=c.length>0?c.map(u=>`<span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#dbeafe;color:#2563eb;">${u.batchCode}(${Ue(u.start)}〜${Ue(u.end)})</span>`).join(" "):'<span style="font-size:9px;color:#22c55e;">空き</span>';return`<tr style="border-bottom:1px solid #f3f4f6;">
      <td style="padding:4px 6px;font-size:12px;font-weight:600;">${i.tankNo}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${bs(i.capacityL)}L</td>
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
  </section>`}function Xm(e,t,n){if(e.length===0||n.length===0)return"";const s=new Map(n.map(h=>[h.stepName,h])),r=new Map;for(const h of e){if(!h.plannedStart||!h.plannedEnd)continue;const v=s.get(h.stepName);if(!v)continue;const m=new Date(h.plannedStart),w=new Date(h.plannedEnd),_=Math.max(Math.round((w.getTime()-m.getTime())/864e5)+1,1);let k=0;for(let S=0;S<_;S++)new Date(m.getTime()+S*864e5).getDay()!==0&&k++;if(k===0)continue;const C=v.laborHours/k;for(let S=new Date(m);S<=w;S=new Date(S.getTime()+864e5)){if(S.getDay()===0)continue;const A=new Date(S);A.setDate(A.getDate()+3-(A.getDay()+6)%7);const E=new Date(A.getFullYear(),0,4),B=1+Math.round(((A.getTime()-E.getTime())/864e5-3+(E.getDay()+6)%7)/7),o=`${A.getFullYear()}-W${String(B).padStart(2,"0")}`;r.set(o,(r.get(o)??0)+C)}}if(r.size===0)return"";const i=[...r.keys()].sort(),c=t.workerCount*t.weeklyHoursLimit,d=Math.max(...r.values(),c),u=i.map(h=>{const v=r.get(h)??0,m=Math.min(v/d*100,100),w=v>c,_=w?"#ef4444":v>c*.8?"#f59e0b":"#22c55e",k=h.replace(/^\d{4}-W/,"W");return`<div style="text-align:center;flex:1;min-width:32px;">
      <div style="height:60px;display:flex;align-items:flex-end;justify-content:center;">
        <div style="width:20px;height:${m}%;background:${_};border-radius:3px 3px 0 0;min-height:2px;" title="${Math.round(v)}h / ${c}h"></div>
      </div>
      <div style="font-size:8px;color:#9ca3af;margin-top:2px;">${k}</div>
      <div style="font-size:9px;font-weight:600;color:${w?"#ef4444":"#374151"};">${Math.round(v)}h</div>
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
  </section>`}function Zm(e,t,n,s={}){const{expandedBatchId:r,showNewForm:i,schedule:c=[],fy:d=2026,workerSettings:u={workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},stepLabor:h=[],tanks:v=[],selectedBatchIds:m=[]}=s,w={};for(const B of t)(w[B.batchId]??=[]).push(B);const _=e.filter(B=>B.status==="active").length,k=e.filter(B=>B.status==="planned").length,C=e.filter(B=>B.status==="completed").length,S=r?e.find(B=>B.id===r):null,A=S?Jm(S,w[S.id]??[]):"",E=S?Wm(S,w[S.id]??[]):"";return`
    <section class="page-head">
      <div><p class="eyebrow">製造管理</p><h1>醸造工程管理</h1></div>
      <div class="meta-stack" style="display:flex;gap:8px;">
        <button class="button primary" data-action="bp-auto-schedule" style="font-size:12px;">自動スケジュール</button>
        <button class="button" data-action="bp-show-new-form">＋ 新規仕込</button>
      </div>
    </section>
    <section class="kpi-grid compact">
      <article class="panel kpi-card"><p class="panel-title">醸造中</p><p class="kpi-value">${_}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">計画中</p><p class="kpi-value">${k}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">完了</p><p class="kpi-value">${C}</p><p class="kpi-sub">今期</p></article>
    </section>

    ${Um(e,w,r)}
    ${Xm(t,u,h)}
    ${Gm(v,e,w)}
    ${i?Km(n):""}
    ${Qm(c,e)}
    ${A}
    ${E}
    ${Hm(e,w,r,m)}

    <div id="bp-delete-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:1000;align-items:center;justify-content:center;">
      <div style="background:white;border-radius:12px;padding:24px;max-width:360px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <h3 style="margin:0 0 12px;font-size:15px;">仕込を削除</h3>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;"><strong id="bp-delete-batch-name"></strong> の仕込を削除します。<br>関連する全工程データも削除されます。この操作は取り消せません。</p>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button data-action="bp-delete-cancel" style="padding:8px 16px;font-size:13px;border:1px solid #d1d5db;background:white;border-radius:6px;cursor:pointer;">キャンセル</button>
          <button data-action="bp-delete-confirm" style="padding:8px 16px;font-size:13px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer;font-weight:600;">削除する</button>
        </div>
      </div>
    </div>`}const ea=4,ta=1,Fn=4e3,da=3e5,ey=2,io={soumu:"総",route_sales:"配",brewing:"造",bottling:"詰",labeling:"貼"};function De(e){return e==null?"—":"¥"+Math.round(e).toLocaleString("ja-JP")}function ty(e){return`${e}月`}const dt={soumu:"#3b82f6",route_sales:"#10b981",brewing:"#8b5cf6",bottling:"#f59e0b",labeling:"#ec4899"},ai={employee:"社員",part_time:"パート",contractor:"業務委託"},pa={employee:"#10b981",part_time:"#f59e0b",contractor:"#6b7280"};function ay(e,t){const n=Object.keys(Re),s=t?e.filter(_=>_.department===t):e,r=s.filter(_=>_.isActive),i=s.filter(_=>!_.isActive);function c(_){return`<span style="display:inline-block;padding:1px 7px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${dt[_]};">${Re[_]}</span>`}function d(_){return _.crossDepartments.length?_.crossDepartments.map(k=>`<span style="display:inline-block;padding:0 5px;border-radius:8px;font-size:10px;border:1px solid ${dt[k]};color:${dt[k]};margin-left:3px;">${Re[k]}</span>`).join(""):""}function u(_){if(_.employmentType==="employee")return`月給 ${De(_.monthlySalary)}`;if(_.employmentType==="contractor")return`委託 ${De(_.contractFee)}/日`;const k=_.shiftPreference?ms[_.shiftPreference]:"";return`時給 ${De(_.hourlyRate)}${k?`・${k}`:""}`}function h(_){return _.monthlyTasks.length?_.monthlyTasks.map(k=>`<span style="display:inline-block;font-size:10px;padding:0 5px;border-radius:8px;background:#7c3aed20;color:#7c3aed;border:1px solid #7c3aed40;margin-left:3px;">${us[k]}</span>`).join(""):""}function v(_){const k=_.availableMonths?_.availableMonths.map(ty).join("・"):"通年",C=_.isDeptLeader?'<span style="display:inline-block;font-size:10px;padding:0 5px;border-radius:8px;background:#f59e0b20;color:#d97706;border:1px solid #f59e0b40;margin-left:4px;">部門長</span>':"";return`<tr class="${_.isActive?"":"row-inactive"}">
      <td>
        ${_.name}${C}${_.kana?`<br><span style="font-size:11px;color:var(--text-secondary);">${_.kana}</span>`:""}
        ${h(_)}
      </td>
      <td>${c(_.department)}${d(_)}</td>
      <td><span class="status-pill" style="background:${pa[_.employmentType]}20;color:${pa[_.employmentType]};border:1px solid ${pa[_.employmentType]}40;">${ai[_.employmentType]}</span></td>
      <td style="font-size:13px;">${u(_)}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${k}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${_.notes||""}</td>
      <td style="white-space:nowrap;">
        <button class="button secondary small" data-edit-staff="${_.id}">編集</button>
        <button class="button secondary small danger" data-delete-staff="${_.id}" data-staff-name="${_.name}" style="margin-left:4px;">削除</button>
      </td>
    </tr>`}const m=["",...n].map(_=>`<button class="button ${t===_?"primary":"secondary"} small" data-staff-dept-filter="${_}">${_?Re[_]:"全部門"}</button>`).join(""),w=7;return`
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
      <div style="display:flex;gap:4px;flex-wrap:wrap;">${m}</div>
      <button class="button primary small" data-action="staff-new" style="margin-left:auto;">＋ スタッフ追加</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>氏名</th><th>主部門 / 兼務</th><th>種別</th><th>賃金</th><th>稼働月</th><th>備考</th><th></th>
        </tr></thead>
        <tbody>
          ${r.map(v).join("")||`<tr><td colspan="${w}" class="empty-row">スタッフが登録されていません</td></tr>`}
          ${i.length>0?`
            <tr><td colspan="${w}" style="padding:4px 8px;font-size:11px;color:var(--text-secondary);background:var(--surface-alt);">── 休職・退職・終了 ──</td></tr>
            ${i.map(v).join("")}
          `:""}
        </tbody>
      </table>
    </div>
    <p style="font-size:11px;color:var(--text-secondary);margin-top:6px;">
      枠付きバッジ = 兼務可能部門（越境）
    </p>
  `}function lo(e){const t=!!e?.id,n=e?.availableMonths?e.availableMonths.join(","):"",s=Object.keys(Re),r=s.map(c=>`<option value="${c}" ${e?.department===c?"selected":""}>${Re[c]}</option>`).join(""),i=s.map(c=>`
    <label style="display:inline-flex;align-items:center;gap:4px;margin-right:10px;font-size:13px;">
      <input type="checkbox" name="sf-cross" value="${c}" ${e?.crossDepartments?.includes(c)?"checked":""} />
      ${Re[c]}
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
                    ${ms[c]}
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
                    ${us[c]}
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
  `}function co(e,t){return!e.isActive||e.availableMonths&&!e.availableMonths.includes(t)?0:e.employmentType==="employee"?e.monthlySalary??0:0}function ny(e,t){const[,n]=t.split("-").map(Number),s=Object.keys(Re),r=new Date,i=Array.from({length:24},(u,h)=>{const v=new Date(r.getFullYear(),r.getMonth()-6+h,1),m=`${v.getFullYear()}-${String(v.getMonth()+1).padStart(2,"0")}`;return`<option value="${m}" ${m===t?"selected":""}>${m.replace("-","年")}月</option>`}).join("");let c=0;const d=s.map(u=>{const h=e.filter(w=>w.department===u);if(h.length===0)return"";const v=h.reduce((w,_)=>w+co(_,n),0);c+=v;const m=h.map(w=>{const _=co(w,n),k=!w.isActive||w.availableMonths&&!w.availableMonths.includes(n),C=w.employmentType==="employee"?`月給 ${De(w.monthlySalary)}`:w.employmentType==="contractor"?`委託 ${De(w.contractFee)}/日`:`時給 ${De(w.hourlyRate)} × ${w.workHoursPerDay}h（呼び出し）`,S=k?'<span style="color:var(--text-secondary);font-size:11px;">稼働外</span>':w.employmentType==="part_time"||w.employmentType==="contractor"?'<span style="color:var(--text-secondary);font-size:11px;">実績で集計</span>':De(_);return`<tr style="${k?"opacity:0.45;":""}">
        <td style="padding-left:20px;">${w.name}</td>
        <td><span style="font-size:11px;padding:1px 6px;border-radius:8px;background:${pa[w.employmentType]}20;color:${pa[w.employmentType]};">${ai[w.employmentType]}</span></td>
        <td style="font-size:12px;">${C}</td>
        <td class="numeric"><strong>${S}</strong></td>
      </tr>`}).join("");return`
      <tr style="background:var(--surface-alt);">
        <td colspan="3">
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${dt[u]};margin-right:6px;"></span>
          <strong>${Re[u]}</strong>
          <span style="font-size:11px;color:var(--text-secondary);margin-left:6px;">${h.length}名</span>
        </td>
        <td class="numeric"><strong>${v>0?De(v):"—"}</strong></td>
      </tr>
      ${m}`}).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label style="font-weight:600;">対象月</label>
      <select id="cost-year-month" class="form-input" style="width:160px;">${i}</select>
      <div style="margin-left:auto;display:flex;gap:12px;flex-wrap:wrap;">
        <div class="panel" style="padding:10px 16px;text-align:center;min-width:140px;">
          <p class="panel-title" style="font-size:11px;">固定費（社員+委託）</p>
          <p class="kpi-value" style="font-size:20px;">${De(c)}</p>
        </div>
        <div class="panel" style="padding:10px 16px;text-align:center;min-width:140px;">
          <p class="panel-title" style="font-size:11px;">年間概算（×12）</p>
          <p class="kpi-value" style="font-size:20px;">${De(c*12)}</p>
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
            <td class="numeric">${De(c)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <p style="font-size:11px;color:var(--text-secondary);margin-top:8px;">
      ※ 社員は月給固定。業務委託・パートは「実績で集計」（業務委託は日額単価×稼働日数）。造りスタッフは稼働月のみカウント。
    </p>
  `}const xn=25,wn=15,$n=640;function sy(e,t,n,s,r,i=[],c=[]){const[d,u]=e.split("-").map(Number),h=X=>String(X).padStart(2,"0"),v=new Date(d,u,0).getDate(),m=r?.workingDays??26,w=["brewing","bottling","labeling"],_=n.some(X=>{for(let de=0;de<X.durationMonths;de++)if((X.brewMonth-1+de)%12+1===u)return!0;return!1}),k=(r?.prevYearDocumentCount??0)||(r?.monthlyDocumentCount??0),C=(r?.prevYearRouteSalesAmount??0)||(r?.routeSalesAmount??0),S=r?.directSalesCount??0,A=m>0?k/m:0,E=m>0?C/m:0,B=m>0?S/m:0;function o(X){return t.filter(de=>de.isActive&&de.department===X&&(!de.availableMonths||de.availableMonths.includes(u)))}function l(X,de){const Be=new Date(d,u-1,de).getDay();return X.filter(Se=>!(Se.fixedDaysOff??[]).includes(Be))}function p(X,de){const Be=X.filter(Se=>Se.isDeptLeader);return Be.length===0?!0:l(Be,de).length>0}function y(X){return[...X].sort((de,Be)=>{const Se=Et=>Et.isDeptLeader?0:Et.employmentType==="employee"?1:Et.employmentType==="part_time"?2:3;return Se(de)-Se(Be)})}const f=[];for(let X=1;X<=v;X++)new Date(d,u-1,X).getDay()!==0&&f.push(X);const g=new Set(f.slice(-5)),x=i.reduce((X,de)=>X+de.demandForecast,0),$=i.reduce((X,de)=>X+de.requiredProduction,0)||i.reduce((X,de)=>X+de.plannedQty,0),P=x>0?x:(r?.prevYearTotalQuantity??0)>0?r.prevYearTotalQuantity:(r?.currentTotalQuantity??0)>0?r.currentTotalQuantity:0,D=s>0?`手動入力 ${s.toLocaleString("ja-JP")}本`:$>0?`需要計画（必要生産 ${$.toLocaleString("ja-JP")}本）`:(r?.prevYearTotalQuantity??0)>0?`前年同月実績 ${r.prevYearTotalQuantity.toLocaleString("ja-JP")}本`:(r?.currentTotalQuantity??0)>0?`当月実績 ${r.currentTotalQuantity.toLocaleString("ja-JP")}本`:"実績データなし",T=x>0?`需要計画 出荷見込み ${x.toLocaleString("ja-JP")}本`:D,O=`${d}-${h(u)}`,N=c.filter(X=>X.date.startsWith(O)&&(X.partTimers>0||X.employees>0)).sort((X,de)=>X.date.localeCompare(de.date)),M=N.length>=5?N.map(X=>parseInt(X.date.slice(-2))).filter(X=>!g.has(X)):f.filter(X=>!g.has(X)),z=new Map(N.map(X=>[parseInt(X.date.slice(-2)),X])),V=wr(i,e),U=new Map;let G=0;for(const X of V){const de=X.plannedQty>0?X.plannedQty:X.requiredQty;for(let Be=0;Be<X.daysNeeded&&G<M.length;Be++,G++){const Se=M[G];U.set(Se,{productCode:X.productCode,productName:X.productName,dailyQty:Math.min(de-Be*Fn,Fn),brewCategory:X.brewCategory,priorityScore:X.priorityScore})}}const J=o("labeling").length||1,K=Math.max(ta,Math.min(J,3)),te=P>0?Math.ceil(P/($n*K)):0,W=M.slice(Math.floor(M.length/2)),ee=new Set;if(te>0&&W.length>0){const X=W.length/Math.min(te,W.length);for(let de=0;de<te&&de<W.length;de++)ee.add(W[Math.min(Math.round(de*X),W.length-1)])}const H=ee.size>0?Math.ceil(P/ee.size):0,Z=Math.max(ta,Math.min(J,Math.ceil(H/$n))),Q=o("soumu"),oe=Q.filter(X=>X.employmentType==="employee"),fe=Math.max(oe.length,Math.ceil(A/xn),Math.ceil(B/wn)),pe=o("route_sales"),be=pe.filter(X=>X.employmentType==="employee"),Fe=pe.filter(X=>X.employmentType==="contractor"),Yt=be.length*da,it=Math.max(0,E-Yt),Ut=it>0?Math.min(Fe.length,Math.ceil(it/da)):0,xa=[];for(const X of f){const de=`${d}-${h(u)}-${h(X)}`,Be=g.has(X),Se=U.get(X),Et=Se!==void 0,gi=ee.has(X),nt=new Map;{const ae=y(l(Q,X)),_e=ae.filter(Te=>Te.employmentType==="employee"),me=ae.filter(Te=>Te.employmentType==="part_time"&&(Te.shiftPreference??"both")!=="afternoon"),Le=ae.filter(Te=>Te.employmentType==="part_time"&&(Te.shiftPreference??"both")!=="morning"),qe=fe+(Be?1:0),ze=_e.map(Te=>Te.id);let yt=Math.max(0,qe-_e.length);for(const Te of me){if(yt<=0)break;ze.push(Te.id),yt--}for(const Te of Le){if(yt<=0)break;ze.includes(Te.id)||(ze.push(Te.id),yt--)}nt.set("soumu",{dept:"soumu",active:!0,assignedIds:ze,neededCount:qe,shortage:Math.max(0,qe-ze.length),notes:[Be?"棚卸週（月末棚卸対応）":null,`伝票${Math.round(A)}件/日 ÷ ${xn}件/人 = ${Math.ceil(A/xn)}名必要`,`来客${Math.round(B)}件/日 ÷ ${wn}件/人 = ${Math.ceil(B/wn)}名必要(AM)`].filter(Boolean).join(" | ")})}{const ae=l(be,X),_e=l(Fe,X).slice(0,Ut),me=[...ae,..._e].map(qe=>qe.id),Le=ae.length+Ut;nt.set("route_sales",{dept:"route_sales",active:!0,assignedIds:me,neededCount:Le,shortage:0,notes:[`前年同月日次平均 ${De(E)}`,`社員${ae.length}台 × 積載 ${De(da)}/台`,Ut>0?`委託${_e.length}台追加（超過 ${De(it)}/日）`:null].filter(Boolean).join(" | ")})}{const ae=o("brewing"),_e=y(l(ae,X)),me=p(ae,X),Le=_&&me&&_e.length>0;nt.set("brewing",{dept:"brewing",active:Le,assignedIds:Le?_e.map(qe=>qe.id):[],neededCount:Le?_e.length:0,shortage:0,notes:Le?`醸造月（${u}月） | 調達計画に基づく仕込み`:_?"部門長不在":"醸造期間外"})}{const ae=o("bottling"),_e=p(ae,X),me=Et&&!!Se&&(_e||ae.filter(rn=>rn.isDeptLeader).length===0),Le=z.get(X),qe=Le?Math.max(ea,Le.partTimers+Le.employees):ea,ze=me?y(l(ae,X)).slice(0,qe):[],yt=Se?.productName?`${Se.productName}（${Se.productCode}）`:D,Te=Se&&"brewCategory"in Se?`[${Se.brewCategory}]`:"",bi=Se&&"priorityScore"in Se?`優先度${Math.round(Se.priorityScore)}`:"";nt.set("bottling",{dept:"bottling",active:me,assignedIds:ze.map(rn=>rn.id),neededCount:me?qe:0,shortage:me?Math.max(0,ea-ze.length):0,notes:me?ze.length<ea?`⚠ 要員不足 ${ze.length}/${ea}名 | ${Te} ${yt}`:`${Te} ${yt} | ${bi} | 本日目標 ${Se.dailyQty.toLocaleString("ja-JP")}本`:Et?"部門長不在":"詰口予定なし"})}{const ae=o("labeling"),_e=p(ae,X),me=gi&&(_e||ae.filter(qe=>qe.isDeptLeader).length===0),Le=me?y(l(ae,X)).slice(0,Z):[];nt.set("labeling",{dept:"labeling",active:me,assignedIds:Le.map(qe=>qe.id),neededCount:me?Z:0,shortage:me?Math.max(0,ta-Le.length):0,notes:me?Le.length<ta?`⚠ 要員不足 ${Le.length}/${ta}名`:`${T} | 本日目標 ${H.toLocaleString("ja-JP")}本 (${Z}名 × ${$n}本/人日)`:"貼場予定なし"})}const ks=[],wa=new Set;for(const ae of nt.values())for(const _e of ae.assignedIds)wa.add(_e);for(const ae of t){if(!ae.isActive||ae.availableMonths&&!ae.availableMonths.includes(u)||ae.crossDepartments.length===0||wa.has(ae.id))continue;const _e=new Date(d,u-1,X).getDay();if((ae.fixedDaysOff??[]).includes(_e))continue;const me=nt.get(ae.department);me&&me.active||ks.push(ae)}const vi=[...nt.values()].filter(ae=>ae.active&&ae.shortage>0).sort((ae,_e)=>_e.shortage-ae.shortage);for(const ae of vi){if(ae.shortage<=0)continue;const _e=ks.filter(me=>me.crossDepartments.includes(ae.dept)&&!wa.has(me.id));_e.sort((me,Le)=>{const qe=ze=>ze.employmentType==="employee"?0:ze.employmentType==="part_time"?1:2;return qe(me)-qe(Le)});for(const me of _e){if(ae.shortage<=0)break;ae.assignedIds.push(me.id),ae.shortage--,wa.add(me.id),ae.notes+=` | 越境: ${me.name}（${Re[me.department]??me.department}）`}}for(const ae of nt.values())!ae.active&&ae.assignedIds.length===0||!ae.active&&w.includes(ae.dept)||xa.push({planDate:de,department:ae.dept,staffMemberIds:ae.assignedIds,notes:ae.shortage>0?`⚠ ${ae.shortage}名不足（越境候補なし） | ${ae.notes}`:ae.notes})}return xa}function oy(e,t,n,s,r,i,c){const[d,u]=t.split("-").map(Number),h=x=>String(x).padStart(2,"0"),v=new Date(d,u,0).getDate(),m=new Date(d,u-1,1).getDay(),w=m===0?6:m-1,_=new Date().toISOString().slice(0,10),k=new Map(e.map(x=>[x.id,x])),C=new Map;for(const x of i){const $=C.get(x.planDate)??[];$.push(x),C.set(x.planDate,$)}const S=i.length>0,A=new Date,E=Array.from({length:24},(x,$)=>{const P=new Date(A.getFullYear(),A.getMonth()-6+$,1),D=`${P.getFullYear()}-${String(P.getMonth()+1).padStart(2,"0")}`;return`<option value="${D}" ${D===t?"selected":""}>${D.replace("-","年")}月</option>`}).join(""),o=["月","火","水","木","金","土","日"].map((x,$)=>`<div style="text-align:center;padding:5px 2px;font-size:11px;font-weight:700;color:${$===6?"#ef4444":"var(--text-secondary)"};background:var(--surface-alt);border-radius:4px;">${x}</div>`).join(""),l=Array(w).fill("<div></div>").join(""),p=Array.from({length:v},(x,$)=>{const P=$+1,D=`${d}-${h(u)}-${h(P)}`,T=new Date(d,u-1,P).getDay(),O=T===0,N=D===_,R=D===c,M=C.get(D)??[],z=M.some(K=>K.notes?.includes("棚卸")),V=M.some(K=>K.notes?.includes("⚠")),U=M.map(K=>{const te=dt[K.department],W=K.staffMemberIds.length,ee=K.staffMemberIds.map(H=>k.get(H)?.name??"?").join(", ");return`<span style="display:inline-flex;align-items:center;gap:1px;font-size:9px;padding:1px 4px;border-radius:3px;margin:1px;background:${te}22;color:${te};font-weight:700;border:1px solid ${te}44;cursor:pointer;" title="${Re[K.department]}: ${ee}">
        ${io[K.department]}<span style="font-size:8px;opacity:0.85;">${W}</span>
      </span>`}).join("");return`<div data-shift-day="${D}" style="border:${R?"2px solid var(--accent)":N?"2px solid #f59e0b":"1px solid var(--border)"};border-radius:4px;padding:3px 4px;min-height:72px;background:${O?"var(--surface-alt)":"var(--surface)"};cursor:pointer;position:relative;${O?"opacity:0.5;":""}${M.length===0&&!O?"opacity:0.35;":""}">
      <div style="font-size:10px;font-weight:700;color:${T===6?"#6b7280":O?"#ef4444":N?"#f59e0b":R?"var(--accent)":"var(--text-secondary)"};margin-bottom:2px;">
        ${P}${N?" ●":""}
      </div>
      <div style="display:flex;flex-wrap:wrap;">${U}</div>
      ${z?'<div style="font-size:7px;color:#7c3aed;font-weight:700;margin-top:1px;">棚卸</div>':""}
      ${V?'<div style="font-size:7px;color:#ef4444;font-weight:700;margin-top:1px;">⚠要確認</div>':""}
    </div>`}).join(""),y=["日","月","火","水","木","金","土"],f=c?(()=>{const[x,$,P]=c.split("-").map(Number),D=y[new Date(x,$-1,P).getDay()],T=C.get(c)??[];if(T.length===0)return`<div class="panel" style="margin-top:12px;padding:14px 16px;">
        <p style="font-weight:700;margin:0 0 6px;">${x}年${$}月${P}日（${D}）</p>
        <p style="font-size:12px;color:var(--text-secondary);">この日のシフト計画はありません（日曜または未生成）。</p>
      </div>`;const O=T.map(N=>{const R=dt[N.department],M=N.staffMemberIds.map(J=>k.get(J)).filter(Boolean),z=M.filter(J=>J.isDeptLeader).map(J=>J.name),V=M.filter(J=>!J.isDeptLeader).map(J=>J.name),U=M.length===0?'<span style="color:var(--text-secondary);font-size:11px;">担当なし</span>':[...z.map(J=>`<span style="font-weight:700;color:${R};">${J}★</span>`),...V.map(J=>`<span>${J}</span>`)].join("、"),G=(N.notes??"").split(" | ").filter(Boolean);return`<div style="padding:10px 0;border-bottom:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${R};flex-shrink:0;"></span>
          <strong style="color:${R};font-size:13px;">${Re[N.department]}</strong>
          <span style="font-size:11px;color:var(--text-secondary);">${M.length}名</span>
        </div>
        <div style="font-size:12px;margin-bottom:4px;">出勤: ${U}</div>
        <div style="font-size:11px;color:var(--text-secondary);display:flex;flex-direction:column;gap:2px;">
          ${G.map(J=>`<span style="padding:1px 0;${J.startsWith("⚠")?"color:#ef4444;font-weight:600;":""}">${J}</span>`).join("")}
        </div>
      </div>`}).join("");return`<div class="panel" style="margin-top:12px;padding:14px 16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <p style="font-weight:700;margin:0;font-size:14px;">${x}年${$}月${P}日（${D}）の配置</p>
        <button class="button secondary small" data-action="shift-day-close">閉じる</button>
      </div>
      ${O}
    </div>`})():`<div style="margin-top:8px;padding:10px 14px;font-size:11px;color:var(--text-secondary);background:var(--surface-alt);border-radius:6px;">
    日付をクリックすると出勤者・根拠が表示されます。★=部門長
  </div>`,g=r?(()=>{const x=da*ey*r.workingDays,$=x>0?Math.min(100,Math.round(r.routeSalesAmount/x*100)):0,P=$>=90?"#ef4444":$>=70?"#f59e0b":"#10b981",D=x>0?Math.min(100,Math.round(r.prevYearRouteSalesAmount/x*100)):0;return`<div class="panel" style="padding:10px 16px;margin-top:8px;">
      <p style="font-size:11px;font-weight:700;margin:0 0 8px;color:var(--text-secondary);">自動生成の根拠データ（前年同月比較）</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;font-size:12px;">
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">総務 処理伝票数</p>
          <strong>${r.monthlyDocumentCount}件</strong>
          <span style="font-size:10px;color:var(--text-secondary);margin-left:6px;">前年: ${r.prevYearDocumentCount}件</span>
        </div>
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">直売来店（上様）</p>
          <strong>${r.directSalesCount}件 ${De(r.directSalesAmount)}</strong>
        </div>
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">詰口・貼場 出荷見込み本数</p>
          <strong>${(r.prevYearTotalQuantity||r.currentTotalQuantity||0).toLocaleString("ja-JP")}本</strong>
          <span style="font-size:10px;color:var(--text-secondary);margin-left:6px;">
            ${r.prevYearTotalQuantity?`前年同月 ${r.prevYearTotalQuantity.toLocaleString("ja-JP")}本`:r.currentTotalQuantity?`当月実績 ${r.currentTotalQuantity.toLocaleString("ja-JP")}本`:"実績なし"}
          </span>
        </div>
        <div>
          <p style="font-size:10px;color:var(--text-secondary);margin:0 0 2px;">配送積載率（2台 ${De(da)}/日）</p>
          <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">
            <div style="flex:1;background:var(--border);border-radius:3px;height:5px;">
              <div style="width:${$}%;height:100%;background:${P};border-radius:3px;"></div>
            </div>
            <strong style="color:${P};font-size:11px;">${$}%</strong>
          </div>
          <span style="font-size:10px;color:var(--text-secondary);">${De(r.routeSalesAmount)} ／ 前年 ${De(r.prevYearRouteSalesAmount)}（${D}%）</span>
        </div>
      </div>
    </div>`})():"";return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap;">
      <label style="font-weight:600;">対象月</label>
      <select id="shift-year-month" class="form-input" style="width:160px;">${E}</select>
      <div style="display:flex;align-items:center;gap:6px;">
        <label style="font-size:12px;white-space:nowrap;">詰口計画（本/月）</label>
        <input type="number" id="shift-bottling-target" class="form-input" style="width:110px;"
          value="${s||""}" min="0" step="100"
          placeholder="${r?.prevYearTotalQuantity?`前年 ${r.prevYearTotalQuantity.toLocaleString("ja-JP")}本`:"自動算出"}" />
        <span style="font-size:10px;color:var(--text-secondary);">空欄＝需要計画から自動算出</span>
      </div>
      <span style="font-size:11px;color:var(--text-secondary);">
        ${S?`${i.length}件登録済み`:"未生成"}
      </span>
      <button class="button ${S?"secondary":"primary"} small" data-action="shift-auto-generate" style="margin-left:auto;">
        ⚡ 自動生成${S?" (再生成)":""}
      </button>
    </div>

    ${S?"":`<div style="padding:12px 16px;font-size:12px;color:var(--text-secondary);background:var(--surface-alt);border-radius:8px;margin-bottom:12px;">
      「自動生成」で月次シフトを作成します。需要・生産計画・部門長スケジュール・固定休みをもとに担当者を自動配置します。
    </div>`}

    <div style="overflow-x:auto;">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;min-width:490px;">
        ${o}
        ${l}
        ${p}
      </div>
    </div>

    <!-- 凡例 -->
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:6px;font-size:11px;color:var(--text-secondary);">
      ${Object.keys(Re).map(x=>`<span style="display:inline-flex;align-items:center;gap:3px;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${dt[x]};"></span>
          <strong style="color:${dt[x]};">${io[x]}</strong>${Re[x]}
        </span>`).join("")}
      <span>| 数字=配置人数 | ★=部門長 | 月〜土が営業日</span>
    </div>

    ${f}
    ${g}
  `}const qa={純米大吟醸:"#8b5cf6",大吟醸:"#6366f1",純米吟醸:"#3b82f6",純米:"#10b981",本醸造:"#f59e0b",普通酒:"#6b7280",リキュール:"#ec4899",その他:"#9ca3af"};function po(e,t){const n=e>=70?"#ef4444":e>=40?"#f59e0b":"#10b981";return`<div style="display:flex;align-items:center;gap:4px;min-width:80px;">
    <div style="flex:1;background:var(--border);border-radius:2px;height:4px;">
      <div style="width:${Math.min(e,100)}%;height:100%;background:${n};border-radius:2px;"></div>
    </div>
    <span style="font-size:10px;color:${n};font-weight:600;white-space:nowrap;">${Math.round(e)}</span>
  </div>`}function ry(e,t,n){const s=new Date,r=Array.from({length:24},(S,A)=>{const E=new Date(s.getFullYear(),s.getMonth()-6+A,1),B=`${E.getFullYear()}-${String(E.getMonth()+1).padStart(2,"0")}`;return`<option value="${B}" ${B===t?"selected":""}>${B.replace("-","年")}月</option>`}).join(""),i=n.reduce((S,A)=>S+(A.plannedQty>0?A.plannedQty:A.requiredQty),0),c=n.reduce((S,A)=>S+A.daysNeeded,0),d=[...new Set(n.map(S=>S.brewCategory))],u=n.filter(S=>S.stockUrgency>=60).length,h=d.map(S=>{const A=n.filter(l=>l.brewCategory===S),E=A.reduce((l,p)=>l+(p.plannedQty>0?p.plannedQty:p.requiredQty),0),B=A.reduce((l,p)=>l+p.daysNeeded,0),o=qa[S]??"#9ca3af";return`<div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:${o}10;border:1px solid ${o}30;border-radius:6px;">
      <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${o};flex-shrink:0;"></span>
      <div>
        <div style="font-size:12px;font-weight:600;color:${o};">${S}</div>
        <div style="font-size:10px;color:var(--text-secondary);">${A.length}品 ${E.toLocaleString("ja-JP")}本 ${B}日</div>
      </div>
    </div>`}).join("");let v=0,m="";const w=n.map((S,A)=>{const E=S.plannedQty>0?S.plannedQty:S.requiredQty,B=qa[S.brewCategory]??"#9ca3af",o=S.brewCategory!==m;m=S.brewCategory,v+=S.daysNeeded;const l={monthly:"月次",annual:"年次",make_to_order:"受注",november:"11月"},p=S.yearMonth===t?"":`<span style="font-size:10px;color:var(--text-secondary);margin-left:4px;">${S.yearMonth.replace("-","/")}</span>`;return`${o&&A>0?'<tr><td colspan="9" style="padding:2px;background:var(--border);"></td></tr>':""}
      <tr data-bottling-idx="${A}" style="cursor:grab;">
        <td style="text-align:center;font-size:11px;color:var(--text-secondary);width:30px;">${A+1}</td>
        <td>
          <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${B};margin-right:4px;"></span>
          <span style="font-size:11px;color:${B};font-weight:600;">${S.brewCategory}</span>
        </td>
        <td style="white-space:nowrap;">
          ${S.productName}${p}
        </td>
        <td><span style="font-size:11px;padding:1px 6px;border-radius:8px;background:var(--surface-alt);">${l[S.productionType]??S.productionType}</span></td>
        <td class="numeric">${E.toLocaleString("ja-JP")}</td>
        <td class="numeric">${S.daysNeeded}日</td>
        <td>${po(S.stockUrgency)}</td>
        <td>${po(S.deadlineUrgency)}</td>
        <td>
          <div style="display:flex;gap:2px;">
            <button class="button secondary small" data-bottling-move="up" data-bottling-idx="${A}" style="padding:2px 6px;font-size:10px;" ${A===0?"disabled":""}>▲</button>
            <button class="button secondary small" data-bottling-move="down" data-bottling-idx="${A}" style="padding:2px 6px;font-size:10px;" ${A===n.length-1?"disabled":""}>▼</button>
          </div>
        </td>
      </tr>`}).join(""),_=Math.max(c,1);let k=0;m="";const C=n.map(S=>{const A=S.plannedQty>0?S.plannedQty:S.requiredQty,E=qa[S.brewCategory]??"#9ca3af",B=S.daysNeeded/_*100,o=k/_*100;return k+=S.daysNeeded,`<div title="${S.productName} ${A.toLocaleString("ja-JP")}本 ${S.daysNeeded}日"
      style="position:absolute;left:${o}%;width:${B}%;height:100%;background:${E};opacity:0.8;border-right:1px solid var(--surface);"></div>`}).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label style="font-weight:600;">基準月</label>
      <select id="bottling-year-month" class="form-input" style="width:160px;">${r}</select>
      <span style="font-size:11px;color:var(--text-secondary);">3ヶ月分の生産計画から詰口順を自動算出</span>
      <button class="button primary small" data-action="bottling-recalc" style="margin-left:auto;">再計算</button>
    </div>

    <!-- KPI -->
    <div class="kpi-grid compact" style="margin-bottom:16px;">
      <article class="panel kpi-card">
        <p class="panel-title">詰口対象</p>
        <p class="kpi-value">${n.length}<span style="font-size:13px;font-weight:400;">品</span></p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">合計本数</p>
        <p class="kpi-value">${i.toLocaleString("ja-JP")}<span style="font-size:13px;font-weight:400;">本</span></p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">必要稼働日</p>
        <p class="kpi-value">${c}<span style="font-size:13px;font-weight:400;">日</span></p>
      </article>
      <article class="panel kpi-card ${u>0?"text-danger":""}">
        <p class="panel-title">在庫逼迫</p>
        <p class="kpi-value">${u}<span style="font-size:13px;font-weight:400;">品</span></p>
      </article>
    </div>

    <!-- 酒質サマリ -->
    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>酒質別サマリ</h2><p class="panel-caption">同じ酒質はまとめて連続稼働（切り替えロス最小化）</p></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:4px 0 8px;">${h}</div>
    </section>

    <!-- ガントバー -->
    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>詰口タイムライン</h2><p class="panel-caption">${c}稼働日 | 日産上限 ${Fn.toLocaleString("ja-JP")}本</p></div>
      <div style="position:relative;height:28px;background:var(--surface-alt);border-radius:4px;overflow:hidden;margin:4px 0 8px;">
        ${C}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;font-size:10px;">
        ${d.map(S=>`<span style="display:inline-flex;align-items:center;gap:2px;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${qa[S]??"#9ca3af"};"></span>${S}
          </span>`).join("")}
      </div>
    </section>

    <!-- 詰口順テーブル -->
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>詰口順序</h2>
          <p class="panel-caption">在庫逼迫度×納期×量から自動算出。▲▼で順番を調整できます。</p>
        </div>
        <button class="button primary small" data-action="bottling-save">順序を保存</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:30px;">#</th>
              <th>酒質</th>
              <th>商品名</th>
              <th>区分</th>
              <th class="numeric">本数</th>
              <th class="numeric">日数</th>
              <th style="min-width:80px;">在庫逼迫</th>
              <th style="min-width:80px;">納期逼迫</th>
              <th style="width:50px;"></th>
            </tr>
          </thead>
          <tbody>
            ${w||'<tr><td colspan="9" class="empty-row">生産計画データなし</td></tr>'}
            ${n.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td></td><td></td><td>合計</td><td></td>
                <td class="numeric">${i.toLocaleString("ja-JP")}</td>
                <td class="numeric">${c}日</td>
                <td colspan="3"></td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function iy(e,t,n,s,r,i=0,c=null,d=[],u=null,h=[],v=[]){const m=t==="staff"?ay(e,n):t==="cost"?ny(e,s):t==="bottling"?ry(h,s,v):oy(e,s,r,i,c,d,u);return`
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
          <button class="tab-button ${t==="bottling"?"active":""}" data-workforce-tab="bottling">詰口スケジュール</button>
          <button class="tab-button ${t==="cost"?"active":""}" data-workforce-tab="cost">人件費</button>
        </div>
      </div>
      ${m}
    </section>
  `}function Vn(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function ly(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ni(e){return e?an.find(t=>t.value===e)?.label??e:""}function cy(e){const t=[],n=[],s=[];for(const r of e){const i=r.amount_last_year_same_month>0?r.amount_this_month/r.amount_last_year_same_month:1,c={code:r.customer_code,name:r.customer_name,businessType:r.business_type,areaCode:r.area_code,phone:r.phone,lastOrderDate:r.last_order_date,daysSinceLastOrder:r.days_since_order,totalAmountLast12m:r.amount_12m,amount3m:r.amount_3m,amountThisMonth:r.amount_this_month,amountLastYearSameMonth:r.amount_last_year_same_month,annualRevenue:r.annual_revenue,yoyRatio:i,status:"dormant"};r.is_at_risk?t.push({...c,status:"at-risk"}):r.is_dormant?n.push({...c,status:"dormant"}):r.amount_last_year_same_month>0&&i<.8&&s.push({...c,status:"declining"})}return t.sort((r,i)=>i.totalAmountLast12m-r.totalAmountLast12m),n.sort((r,i)=>i.daysSinceLastOrder-r.daysSinceLastOrder),s.sort((r,i)=>r.yoyRatio-i.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:s}}function dy(e,t){const n=t?.reason??"",s=an.map(r=>`<option value="${r.value}" ${n===r.value?"selected":""}>${r.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${s}
    </select>`}function py(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],s=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',r=!!t?.actionedAt,i=r?'style="opacity:0.45;"':"",c=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${ni(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${r?"1":"0"}" ${i}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${c}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${s}
      <td class="numeric">${Vn(e.totalAmountLast12m)}</td>
      <td>${dy(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${r?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function _n(e,t,n,s,r,i,c,d){if(r.length===0)return"";const u=r.map(h=>py(h,d.get(h.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${s}" style="margin-right:8px;">${r.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${ly(i)}</p>
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
    </section>`}function uy(e,t=[]){const{atRiskCustomers:n,dormantCustomers:s,decliningCustomers:r}=e,i=n.length+s.length+r.length,c=n.reduce((S,A)=>S+A.totalAmountLast12m,0),d=s.reduce((S,A)=>S+A.totalAmountLast12m,0),u=r.reduce((S,A)=>S+A.totalAmountLast12m,0),h=[...n,...s,...r],v=[...new Set(h.map(S=>S.areaCode).filter(Boolean))].sort(),m=[...new Set(h.map(S=>S.businessType).filter(Boolean))].sort(),w=new Map(t.map(S=>[S.customerCode,S])),_=t.filter(S=>S.actionedAt).length,k=new Map;t.forEach(S=>{S.reason&&k.set(S.reason,(k.get(S.reason)??0)+1)});const C=[...k.entries()].sort((S,A)=>A[1]-S[1]).slice(0,5).map(([S,A])=>`<span class="status-pill info" style="font-size:0.75rem;">${ni(S)} ${A}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${Vn(c)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${s.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${Vn(d)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${r.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${_}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-muted);">${i}社中</div>
      </div>
    </section>

    ${C?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${C}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${i})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${s.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${r.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${v.map(S=>`<option value="${S}">${S}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${m.map(S=>`<option value="${S}">${S}</option>`).join("")}
      </select>
    </div>

    ${_n("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,c,"状況",w)}
    ${_n("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",s,d,"経過日数",w)}
    ${_n("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",r,u,"前年同月比",w)}

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
    <\/script>`}const pt=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Yn={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},ct={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function my(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function yy(e){const t=e.reduce((i,c)=>i+c,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const s=Math.max(...e);return e.filter(i=>i>s*.1).length<=6?"seasonal":"year-round"}function hy(e){const t=e.reduce((i,c)=>i+c,0);if(t===0)return[];const s=t/12*1.5,r=[];for(let i=0;i<12;i++)e[i]>s&&r.push(i);if(r.length===0){const i=Math.max(...e);i>0&&r.push(e.indexOf(i))}return r.sort((i,c)=>i-c)}function fy(e){return e.length===0?0:(e[0]-2+12)%12}function uo(e){const t=new Date().getMonth(),n=e.map(r=>{const i=yy(r.monthlyQuantity),c=hy(r.monthlyQuantity),d=fy(c);return{code:r.code,name:r.name,category:r.category,peakMonths:c,proposalStartMonth:d,seasonType:i,monthlyQuantity:r.monthlyQuantity}}),s=[];for(let r=0;r<12;r++){const i=n.filter(c=>{if(c.peakMonths.length===0)return!1;const d=c.proposalStartMonth,u=c.peakMonths[0];return d<=u?r>=d&&r<=u:r>=d||r<=u});s.push({month:r,products:i,targetCustomers:[]})}return{products:n,proposals:s,selectedMonth:t}}function gy(e){const{products:t,proposals:n,selectedMonth:s}=e,r=new Date().getMonth(),i={"year-round":[],seasonal:[],"year-end":[]};t.forEach(m=>i[m.seasonType].push(m));const c=n[s],d=t.length,u=c?.products.length??0,h=t.filter(m=>m.peakMonths.includes(s)).length,v=c?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${pt[s]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${pt[s]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${h}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${v}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${pt.map((m,w)=>{const _=w===r,k=w===s;return`<button class="button" style="padding:4px 10px;background:${k?"#0F5B8D":_?"#e2e8f0":"transparent"};color:${k?"#fff":"#333"};border:${_&&!k?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${w}">${m}${_?" ●":""}</button>`}).join("")}
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
            ${pt.map((m,w)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${w===r?"background:#f0f7ff;":""}">${m.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${vy(i,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${by(i,s)}

  <!-- Target customer list for selected month -->
  ${xy(c)}
</div>`}function vy(e,t){const n=[],s=["year-round","seasonal","year-end"];for(const r of s){const i=e[r];if(i.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${ct[r]}15;color:${ct[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${Yn[r]}</span>
    </td></tr>`);for(const c of i){const d=pt.map((u,h)=>{const v=c.peakMonths.includes(h),m=si(c,h),w=h===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let _="transparent";v?_=ct[c.seasonType]:m&&(_=ct[c.seasonType]+"40");const k=v||m?`background:${_};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${w}"><div style="${k}" title="${v?"ピーク":m?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${c.name}"><span class="mono" style="font-size:0.7rem;color:#888">${c.code}</span> ${c.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${ct[c.seasonType]}15;color:${ct[c.seasonType]}">${Yn[c.seasonType]}</span></td>
        ${d}
      </tr>`)}}}return n.join("")}function si(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,s=e.peakMonths[0];return n<=s?t>=n&&t<s:t>=n||t<s}function by(e,t){const s=["year-round","seasonal","year-end"].map(r=>{const i=e[r];if(i.length===0)return"";const c=i.filter(u=>u.peakMonths.includes(t)||si(u,t));if(c.length===0)return"";const d=c.map(u=>{const v=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',m=u.monthlyQuantity.reduce((w,_)=>w+_,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${v}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${m.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map(w=>pt[w]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${ct[r]}15;color:${ct[r]}">${Yn[r]}</span>
        <span style="font-size:0.85rem;color:#666">${pt[t]}の対象: ${c.length}品</span>
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
    </div>`}).filter(Boolean);return s.length===0?`<div style="padding:1rem;color:#666;text-align:center">${pt[t]}に提案対象の商品はありません</div>`:s.join("")}function xy(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${my(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const wy=["日","月","火","水","木","金","土"];function Ta(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${Math.round(e/1e3)}K`:`¥${e.toLocaleString()}`}function Mt(e,t){if(t===0&&e===0)return'<span class="sc-yoy sc-yoy-flat">—</span>';if(t===0)return'<span class="sc-yoy sc-yoy-up">NEW</span>';const n=Math.round((e/t-1)*100);return n>0?`<span class="sc-yoy sc-yoy-up">+${n}%</span>`:n<0?`<span class="sc-yoy sc-yoy-down">${n}%</span>`:'<span class="sc-yoy sc-yoy-flat">±0%</span>'}function xs(e){return e?e.totalVolumes.reduce((t,n)=>t+n.bottles,0):0}function oi(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n-1,1),r=new Date(t,n,0),i=[];for(let c=0;c<s.getDay();c++)i.push({outside:!0});for(let c=1;c<=r.getDate();c++)i.push({date:`${e}-${String(c).padStart(2,"0")}`});for(;i.length%7!==0;)i.push({outside:!0});return i}function mo(e){const[t,n,s]=e.split("-").map(Number),i=new Date(t,n-1,s).getDay(),c=Math.ceil(s/7),u=new Date(t-1,n-1,1).getDay(),v=1+(i-u+7)%7+(c-1)*7,m=new Date(t-1,n,0).getDate();return v>m?"":`${t-1}-${String(n).padStart(2,"0")}-${String(v).padStart(2,"0")}`}function yo(e,t){const[n,s]=t.split("-").map(Number),r=new Date(n,s,0).getDate(),i=Array.from({length:7},()=>({count:0,amount:0,bottles:0,days:0}));for(let c=1;c<=r;c++){const d=`${t}-${String(c).padStart(2,"0")}`,u=new Date(n,s-1,c).getDay();i[u].days++;const h=e[d];h&&(i[u].count+=h.count,i[u].amount+=h.totalAmount,i[u].bottles+=xs(h))}return i}function $y(e,t){const n=[];for(let s=0;s<t.length;s+=7){const r=t.slice(s,s+7);let i=0,c=0,d=0,u=0;for(const h of r)if(h.date){u++;const v=e[h.date];v&&(i+=v.count,c+=v.totalAmount,d+=xs(v))}n.push({count:i,amount:c,bottles:d,days:u})}return n}function _y(e,t){const[n,s]=t.split("-").map(Number),r=`${n-1}-${String(s).padStart(2,"0")}`,i=oi(r),c=[];for(let d=0;d<i.length;d+=7){const u=i.slice(d,d+7);let h=0,v=0,m=0,w=0;for(const _ of u)if(_.date){w++;const k=e[_.date];k&&(h+=k.count,v+=k.totalAmount,m+=xs(k))}c.push({count:h,amount:v,bottles:m,days:w})}return c}function ky(e,t,n,s){const[r,i]=t.split("-").map(Number),c=new Date(r,i-2,1),d=new Date(r,i,1),u=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,h=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,v=new Date().toISOString().slice(0,10),m=s??{},w=oi(t),_=e?yo(e,t):null,k=`${r-1}-${String(i).padStart(2,"0")}`,C=s?yo(s,k):null,S=e?$y(e,w):null,A=s?_y(s,t):null;let E="";if(e===null)E='<div class="sc-loading" style="grid-column:1/-1;"><div class="loading-spinner"></div><p>読み込み中…</p></div>';else for(let f=0;f<w.length;f++){const g=w[f];if(g.outside)E+='<div class="sc-cell sc-outside"></div>';else{const x=g.date,$=Number(x.split("-")[2]),P=new Date(`${x}T00:00:00`).getDay(),D=e[x],T=x===v,O=x===n,N=m[mo(x)],R=D?.totalAmount??0,M=N?.totalAmount??0;let z="",V="",U="",G="";D&&(z=`<span class="sc-badge">${D.count}件</span>`,V=`<div class="sc-day-amt">${Ta(R)}</div>`,G=D.cityGroups.slice(0,2).map(J=>`<span class="sc-city-tag">${J.city}<em>${J.count}</em></span>`).join(""),D.cityGroups.length>2&&(G+=`<span class="sc-city-more">+${D.cityGroups.length-2}</span>`)),(R>0||M>0)&&(U=`<div class="sc-day-yoy">${Mt(R,M)}</div>`),E+=`
          <div class="sc-cell ${T?"sc-today":""} ${O?"sc-selected":""} ${D?"sc-has-data":""}"
               data-sc-date="${x}">
            <div class="sc-day-header">
              <span class="sc-day-num ${P===0?"sc-sun":P===6?"sc-sat":""}">${$}</span>
              ${z}
            </div>
            ${V}
            ${U}
            <div class="sc-cities">${G}</div>
          </div>`}if((f+1)%7===0&&S){const x=Math.floor(f/7),$=S[x],P=A?.[x],D=$.days>0?$.count/$.days:0,T=P?.amount??0;E+=`
          <div class="sc-cell sc-week-total">
            <div class="sc-wt-count">${$.count}<small>件</small></div>
            <div class="sc-wt-amount">${Ta($.amount)}</div>
            <div class="sc-wt-bottles">${$.bottles}<small>本</small></div>
            <div class="sc-wt-avg">⌀${D.toFixed(1)}<small>件/日</small></div>
            ${$.amount>0||T>0?`<div class="sc-wt-yoy">${Mt($.amount,T)}</div>`:""}
          </div>`}}let B="";if(_){B=_.map((T,O)=>{const N=T.days>0?T.count/T.days:0,R=O===0?"sc-sun":O===6?"sc-sat":"",z=C?.[O]?.amount??0;return`<div class="sc-wd-summary ${R}">
        <span class="sc-wds-count">${T.count}<small>件</small></span>
        <span class="sc-wds-amt">${Ta(T.amount)}</span>
        <span class="sc-wds-bottles">${T.bottles}<small>本</small></span>
        <span class="sc-wds-avg">⌀${N.toFixed(1)}</span>
        ${T.amount>0||z>0?`<span class="sc-wds-yoy">${Mt(T.amount,z)}</span>`:""}
      </div>`}).join("");const f=_.reduce((T,O)=>T+O.count,0),g=_.reduce((T,O)=>T+O.amount,0),x=_.reduce((T,O)=>T+O.bottles,0),$=_.reduce((T,O)=>T+O.days,0),P=$>0?f/$:0,D=C?C.reduce((T,O)=>T+O.amount,0):0;B+=`<div class="sc-wd-summary sc-wd-month-total">
      <span class="sc-wds-count">${f}<small>件</small></span>
      <span class="sc-wds-amt">${Ta(g)}</span>
      <span class="sc-wds-bottles">${x}<small>本</small></span>
      <span class="sc-wds-avg">⌀${P.toFixed(1)}</span>
      ${g>0||D>0?`<span class="sc-wds-yoy">${Mt(g,D)}</span>`:""}
    </div>`}const o=n&&e?.[n]?Py(e[n],m[mo(n)]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',l=Object.values(e??{}).reduce((f,g)=>f+g.count,0),p=Object.values(e??{}).reduce((f,g)=>f+g.totalAmount,0),y=Object.values(m).reduce((f,g)=>f+g.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${l>0?`月計: <strong>${l}件</strong> / <strong>¥${p.toLocaleString()}</strong> ${Mt(p,y)}`:""}
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
            ${wy.map((f,g)=>`<div class="sc-weekday ${g===0?"sc-sun":g===6?"sc-sat":""}">${f}</div>`).join("")}
            <div class="sc-weekday sc-wk-header">週計</div>
          </div>

          ${B?`<div class="sc-wd-summary-row">${B}</div>`:""}

          <div class="sc-grid-8">
            ${E}
          </div>
        </div>

        <div class="sc-detail-col${n?" sc-detail-active":""}">
          ${o}
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
  `}function Sy(e){return e.length?e.map(t=>`<span class="sc-vol-badge">${t.label}<em>${t.bottles}</em></span>`).join(""):""}function Py(e,t){const n=e.date.replace(/-/g,"/").slice(5),s=e.totalVolumes.length?`<div class="sc-day-volumes">${e.totalVolumes.map(h=>`<span class="sc-vol-tag">${h.label} <strong>${h.bottles}本</strong></span>`).join("")}</div>`:"",r=t?.totalAmount??0,i=t?.count??0,c=e.totalAmount>0||r>0?`<div class="sc-detail-yoy">
        前年同日: ${i}件 / ¥${r.toLocaleString()}
        ${Mt(e.totalAmount,r)}
      </div>`:"",d={};for(const h of e.entries)(d[h.city]??=[]).push(h);const u=Object.entries(d).sort((h,v)=>v[1].length-h[1].length).map(([h,v])=>{const m=v.sort((w,_)=>_.amount-w.amount).map(w=>`
          <div class="sc-customer-row">
            <div class="sc-customer-main">
              <span class="sc-customer-name" title="${w.customerName}">${w.customerName}</span>
              <span class="sc-customer-amt">${w.amount>0?`¥${w.amount.toLocaleString()}`:"-"}${w.invoiceCount>1?` (${w.invoiceCount}伝票)`:""}</span>
            </div>
            ${w.volumes.length?`<div class="sc-customer-vols">${Sy(w.volumes)}</div>`:""}
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${h}（${v.length}先）</div>
          ${m}
        </div>`}).join("");return`
    <p class="sc-detail-date">${n}の出荷</p>
    <p class="sc-detail-meta">${e.entries.length}先 ${e.count}伝票 / ¥${e.totalAmount.toLocaleString()}</p>
    ${c}
    ${s}
    ${u}
  `}const Ey=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),kn=["月","火","水","木","金"],ho=6;function Ly(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function Ay(e,t){if(t.length===0)return 0;const n=[...t].sort((r,i)=>r-i);return n.filter(r=>r<=e).length/n.length}function Cy(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function fo(e){const t=new Date,n=e.map(u=>u.annualRevenue),s=e.map(u=>{const h=Ly(u.lastOrderDate,t);let v=0;const m=[];h>=60&&(v+=50,m.push("離反リスク")),u.hasSeasonalProposal&&(v+=30,m.push("季節提案タイミング")),h>=30&&h<60&&(v+=20,m.push("定期巡回"));const w=Ay(u.annualRevenue,n),_=Math.round(w*20);_>0&&(v+=_,m.push("金額ウェイト"));const k=Cy(m,h);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:v,reasons:m,lastOrderDate:u.lastOrderDate,daysSinceOrder:h,annualRevenue:u.annualRevenue,recommendedAction:k}}).filter(u=>u.priorityScore>0).sort((u,h)=>h.priorityScore-u.priorityScore),r=new Map;for(const u of s){const h=u.areaCode||"その他";r.has(h)||r.set(h,[]),r.get(h).push(u)}const i=[...r.entries()].sort((u,h)=>h[1].reduce((v,m)=>v+m.priorityScore,0)-u[1].reduce((v,m)=>v+m.priorityScore,0)),c=[];let d=0;for(const[u,h]of i){const v=h.sort((m,w)=>w.priorityScore-m.priorityScore);for(let m=0;m<v.length&&!(d>=kn.length);m+=ho){const w=v.slice(m,m+ho);c.push({dayLabel:kn[d],area:u,visits:w}),d++}if(d>=kn.length)break}return{candidates:s,weekPlan:c,filterArea:"",filterMinScore:0}}function Dy(e){const{candidates:t,weekPlan:n,filterArea:s,filterMinScore:r}=e,i=t.filter(m=>!(s&&m.areaCode!==s||r>0&&m.priorityScore<r)),c=Array.from(new Set(t.map(m=>m.areaCode))).sort(),d=i.length,u=i.filter(m=>m.priorityScore>=50).length,h=i.filter(m=>m.reasons.includes("離反リスク")).length,v=n.reduce((m,w)=>m+w.visits.length,0);return`
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
            ${c.map(m=>`<option value="${m}"${s===m?" selected":""}>${m}</option>`).join("")}
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
      ${n.length===0?"<p>訪問候補がありません。</p>":qy(n)}
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
            ${i.map(m=>Ty(m)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function qy(e){return`
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
  `}function Ty(e){return`
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
      <td class="numeric">${Ey.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function Ia(e){return e.toLocaleString("ja-JP")}function Iy(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=e.map(h=>{const v=h.capacity>0?Math.round(h.currentVolume/h.capacity*100):0;return`
      <tr data-tank-id="${h.id}">
        <td class="mono"><strong>${h.tankNo}</strong></td>
        <td>${h.displayName||"―"}</td>
        <td class="numeric">${h.depthMm>0?Ia(h.depthMm):"―"}</td>
        <td class="numeric">${h.capacity>0?Ia(h.capacity):"―"}</td>
        <td class="numeric">${h.litersPerMm>0?h.litersPerMm.toFixed(2):"―"}</td>
        <td class="numeric">${h.currentVolume>0?Ia(h.currentVolume):"―"}</td>
        <td>
          <div class="progress-wrap"><div class="progress-bar" style="width:${v}%"></div></div>
          <span class="progress-label">${v}%</span>
        </td>
        <td><span class="status-pill ${n[h.status]}">${t[h.status]}</span></td>
        <td style="white-space:nowrap;">
          <button class="button-sm secondary" data-action="tank-edit" data-tank-id="${h.id}" style="margin-right:4px;">編集</button>
          <button class="button-sm" data-action="tank-delete" data-tank-id="${h.id}" style="color:#ef4444;border-color:#fca5a5;">削除</button>
        </td>
      </tr>`}).join(""),r=e.filter(h=>h.status==="in_use").length,i=e.filter(h=>h.status==="aging").length,c=e.filter(h=>h.status==="empty").length,d=e.reduce((h,v)=>h+v.capacity,0),u=e.reduce((h,v)=>h+v.currentVolume,0);return`
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>タンク管理</h1></div>
      <button class="button primary" data-action="tank-show-add">＋ タンク登録</button>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${Ia(d)} L</p>
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
          <tbody>${s||'<tr><td colspan="9" class="empty-row">タンクが登録されていません</td></tr>'}</tbody>
        </table>
      </div>
    </section>`}function go(e){const t=!!e;return`
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
    </section>`}function My(e){return e.toLocaleString("ja-JP")}const vo={transfer:"タンク移動",receive:"受入",ship:"出荷・移出",blend:"ブレンド",discard:"廃棄",adjust:"調整",warimizu:"割水"},Ny={transfer:"#2563eb",receive:"#059669",ship:"#d97706",blend:"#7c3aed",discard:"#ef4444",adjust:"#6b7280",warimizu:"#0ea5e9"};function Ry(e,t,n="",s=[]){const r=n?e.filter(m=>m.fromTankNo===n||m.toTankNo===n):e,i=new Map,c=[...e].sort((m,w)=>m.movementDate.localeCompare(w.movementDate));for(const m of c)m.fromTankNo&&i.set(m.fromTankNo,(i.get(m.fromTankNo)??0)-m.volumeL),m.toTankNo&&i.set(m.toTankNo,(i.get(m.toTankNo)??0)+m.volumeL);const d=t.map(m=>`<option value="${m.tankNo}" ${m.tankNo===n?"selected":""}>${m.tankNo}${m.displayName?` (${m.displayName})`:""}</option>`).join(""),u=Object.entries(vo).map(([m,w])=>`<option value="${m}">${w}</option>`).join("");let h=0;const v=r.map(m=>{const w=Ny[m.movementType]??"#6b7280",_=n&&m.toTankNo===n,k=n&&m.fromTankNo===n;return n&&(h+=_?m.volumeL:k?-m.volumeL:0),`<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:6px 8px;font-size:12px;white-space:nowrap;">${m.movementDate}</td>
      <td style="padding:6px 8px;"><span style="font-size:10px;padding:2px 6px;border-radius:3px;background:${w}15;color:${w};font-weight:600;">${vo[m.movementType]}</span></td>
      <td style="padding:6px 8px;font-size:12px;font-weight:600;${k?"color:#ef4444;":""}">${m.fromTankNo||"―"}</td>
      <td style="padding:6px 4px;font-size:12px;color:#9ca3af;">→</td>
      <td style="padding:6px 8px;font-size:12px;font-weight:600;${_?"color:#059669;":""}">${m.toTankNo||"―"}</td>
      <td style="padding:6px 8px;font-size:13px;font-weight:700;text-align:right;">${My(m.volumeL)} L</td>
      <td style="padding:6px 8px;font-size:11px;">${m.productName||"―"}</td>
      <td style="padding:6px 8px;font-size:11px;color:#6b7280;">${m.batchCode||""}</td>
      <td style="padding:6px 8px;font-size:11px;">${m.alcoholDegree!=null?m.alcoholDegree+"%":""}</td>
      <td style="padding:6px 8px;font-size:11px;">${m.temperature!=null?m.temperature+"℃":""}</td>
      <td style="padding:6px 8px;font-size:10px;color:#6b7280;">${m.recordedBy||""}</td>
      <td style="padding:6px 8px;font-size:10px;color:#6b7280;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${m.notes||""}</td>
      <td style="padding:6px 4px;"><button data-action="tm-delete" data-id="${m.id}" style="font-size:9px;padding:2px 6px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">×</button></td>
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
          ${s.map(m=>`<option value="${m.productName}" data-batch="${m.batchCode}" data-alc="${m.alcoholDegree??""}">${m.productName}（${m.batchCode}）</option>`).join("")}
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
          <tbody>${v||'<tr><td colspan="13" style="padding:20px;text-align:center;color:#9ca3af;">移動記録がありません</td></tr>'}</tbody>
        </table>
      </div>
    </section>`}function bt(e){return e.toLocaleString("ja-JP")}function Oy(e,t=[],n=[]){const s=n.map(d=>`<option value="${d.tankNo}">${d.tankNo}${d.displayName?` (${d.displayName})`:""}</option>`).join(""),r=t.map(d=>`<option value="${d.batchCode}" data-name="${d.productName}" data-tank="${d.tankNo}">${d.productName}（${d.batchCode}）</option>`).join(""),i=new Date().toISOString().slice(0,10),c=e.map(d=>(d.genshuVolumeBeforeL+d.zanshuReceiveL,`<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:4px 6px;font-size:11px;">${d.tsumekuchiDate}</td>
      <td style="padding:4px 6px;font-size:11px;font-weight:600;">${d.sourceTankNo}</td>
      <td style="padding:4px 6px;font-size:11px;">${d.genshuName}(${d.genshuBatchCode})</td>
      <td style="padding:4px 6px;font-size:11px;">${d.targetProductName}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${bt(d.genshuVolumeBeforeL)}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${d.zanshuReceiveL>0?bt(d.zanshuReceiveL):"―"}</td>
      <td style="padding:4px 6px;font-size:11px;">${d.linkedTankNo||"―"}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${bt(d.volumeBeforeTsumekuchiL)}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;font-weight:600;">${bt(d.tsumekuchiSuccessQty)}本</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${bt(d.tsumekuchiSuccessL)}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${d.depthAfterMm>0?d.depthAfterMm:"―"}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${bt(d.volumeAfterL)}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${bt(d.tsumekuchiRemainingL)}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${d.breakageL>0?d.breakageL:"―"}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${d.lossL>0?d.lossL:"―"}</td>
      <td style="padding:4px 4px;"><button data-action="tsume-delete" data-id="${d.id}" style="font-size:9px;padding:1px 5px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">×</button></td>
    </tr>`)).join("");return`
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>詰口帳票</h1></div>
      <button class="button secondary" data-action="tsume-print">印刷</button>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>詰口記録</h2><p class="panel-caption">詰口作業の記録</p></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px;padding:8px 0;font-size:11px;border-bottom:1px solid var(--border);margin-bottom:10px;">
        <label>詰口日<br><input id="tsume-date" type="date" value="${i}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>容器(元)<br><select id="tsume-tank" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"><option value="">選択</option>${s}</select></label>
        <label>原酒<br><select id="tsume-genshu" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"><option value="">選択</option>${r}</select></label>
        <label>行先商品<br><input id="tsume-product" type="text" placeholder="商品名" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>原酒L(前)<br><input id="tsume-before" type="number" step="1" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>残酒受入L<br><input id="tsume-zanshu" type="number" step="0.1" value="0" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>連結容器<br><input id="tsume-linked" type="text" placeholder="" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>詰口前数量L<br><input id="tsume-vol-before" type="number" step="1" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>成功本数<br><input id="tsume-qty" type="number" step="1" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>容量ml/本<br><input id="tsume-ml" type="number" step="1" value="720" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>払出後深mm<br><input id="tsume-depth" type="number" step="1" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>払出後数量L<br><input id="tsume-vol-after" type="number" step="1" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>破損L<br><input id="tsume-break" type="number" step="0.1" value="0" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
        <label>欠減L<br><input id="tsume-loss" type="number" step="0.1" value="0" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;font-size:11px;"></label>
      </div>
      <button class="button primary" data-action="tsume-save" style="font-size:11px;padding:5px 14px;">記録</button>
    </section>

    <section class="panel" id="tsume-table">
      <div class="panel-header"><h2>詰口帳票一覧</h2><p class="panel-caption">${e.length}件</p></div>
      <div class="table-wrap" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:1100px;">
          <thead><tr style="border-bottom:2px solid var(--border);font-size:9px;color:#6b7280;text-align:left;">
            <th style="padding:3px 6px;">日付</th><th style="padding:3px 6px;">容器</th><th style="padding:3px 6px;">原酒</th>
            <th style="padding:3px 6px;">行先商品</th><th style="padding:3px 6px;text-align:right;">原酒L(前)</th>
            <th style="padding:3px 6px;text-align:right;">残酒受入</th><th style="padding:3px 6px;">連結</th>
            <th style="padding:3px 6px;text-align:right;">詰口前L</th><th style="padding:3px 6px;text-align:right;">成功数</th>
            <th style="padding:3px 6px;text-align:right;">成功L</th><th style="padding:3px 6px;text-align:right;">払出後深</th>
            <th style="padding:3px 6px;text-align:right;">払出後L</th><th style="padding:3px 6px;text-align:right;">詰口残</th>
            <th style="padding:3px 6px;text-align:right;">破損</th><th style="padding:3px 6px;text-align:right;">欠減</th>
            <th></th>
          </tr></thead>
          <tbody>${c||'<tr><td colspan="16" style="padding:20px;text-align:center;color:#9ca3af;">詰口記録がありません</td></tr>'}</tbody>
        </table>
      </div>
    </section>`}function Sn(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function By(e){if(e.length===0)return`<section class="panel">
      <div class="panel-header">
        <div>
          <h2>移出量集計（販売実績ベース）</h2>
          <p class="panel-caption">当月の販売伝票から自動集計した移出量と概算税額</p>
        </div>
      </div>
      <p class="empty-message">データなし — 商品マスタに volume_ml が設定されていることを確認してください。</p>
    </section>`;const t=e.reduce((c,d)=>c+d.volumeSaleL,0),n=e.reduce((c,d)=>c+d.volumeReturnL,0),s=e.reduce((c,d)=>c+d.volumeNetL,0),r=e.reduce((c,d)=>c+d.taxAmount,0);return`<section class="panel">
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
            <th class="numeric">${s.toLocaleString("ja-JP",{maximumFractionDigits:3})}</th>
            <th></th>
            <th class="numeric"><strong>${r.toLocaleString("ja-JP")} 円</strong></th>
          </tr>
        </tfoot>
      </table>
    </div>
    <p class="form-hint" style="margin-top: 8px;">
      度数が「未設定」のリキュールは税額を計算できません。商品マスタの <code>alcohol_degree</code> を更新してください。
    </p>
  </section>`}function zy(e,t,n,s=[]){const r=e.rows.map((v,m)=>`
      <tr>
        <td class="mono">${v.taxCategory}</td>
        <td>${v.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${m}" data-tax-field="alcoholDegree" value="${v.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${m}" data-tax-field="productionVolume" value="${v.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${m}" data-tax-field="previousBalance" value="${v.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${m}" data-tax-field="exportDeduction" value="${v.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${m}" data-tax-field="sampleDeduction" value="${v.sampleDeduction}" />
        </td>
        <td class="numeric">${v.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${v.taxRate}</td>
        <td class="numeric"><strong>${Sn(v.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${m}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),i=e.deductions.map((v,m)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${m}" data-ded-field="type">
            ${Object.keys(In).map(w=>`<option value="${w}" ${w===v.type?"selected":""}>${In[w]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${m}" data-ded-field="categoryCode">
            ${lr.map(w=>`<option value="${w.code}" ${w.code===v.categoryCode?"selected":""}>${w.code}:${w.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${m}" data-ded-field="volume" value="${v.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${m}" data-ded-field="reason" value="${v.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${m}" data-ded-field="documentNo" value="${v.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${m}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),c=Array.from({length:12},(v,m)=>m+1),d=e.rows.reduce((v,m)=>v+m.exportDeduction+m.sampleDeduction,0),u=e.rows.reduce((v,m)=>v+m.productionVolume,0),h=u>0?d/u*100:0;return`
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
            ${[2025,2026,2027].map(v=>`<option value="${v}" ${t===v?"selected":""}>${v}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${c.map(v=>`<option value="${v}" ${n===v?"selected":""}>${v}月</option>`).join("")}
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
        <p class="kpi-value">${Sn(e.totalTax)}</p>
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
              <th class="numeric">${Sn(e.totalTax)}</th>
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

    ${By(s)}

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
  `}const Vt=[{title:"販売業務",color:"#1a56db",features:[{id:"invoice-entry",route:"/invoice-entry",label:"伝票入力",desc:"売上・返品伝票の新規入力、明細追加",addedVersion:1},{id:"invoice-browse",route:"/invoice",label:"伝票照会",desc:"過去伝票の検索・表示・PDF出力",addedVersion:1},{id:"delivery-note",route:"/delivery",label:"納品書発行",desc:"納品書のPDFダウンロード・印刷",addedVersion:1},{id:"billing-monthly",route:"/billing",label:"月次請求",desc:"請求書発行・入金消込・未収管理",addedVersion:1},{id:"ledger-view",route:"/ledger",label:"得意先台帳",desc:"得意先別の取引履歴・残高確認",addedVersion:1},{id:"quote-create",route:"/quote",label:"見積作成",desc:"見積書の作成・PDF出力・メール送付",addedVersion:50},{id:"shipment-calendar",route:"/shipment-calendar",label:"配送カレンダー",desc:"伝票日付ベースの配送スケジュール確認",addedVersion:200}]},{title:"分析・レポート",color:"#7e3af2",features:[{id:"analytics-monthly",route:"/analytics",label:"月次売上グラフ",desc:"月次・商品別・得意先別の売上推移グラフ",addedVersion:1},{id:"analytics-volume",route:"/analytics",label:"移出量集計",desc:"商品・得意先別の移出量（mL）集計",addedVersion:320},{id:"customer-analysis",route:"/customer-analysis",label:"得意先分析",desc:"ABC分析・購買頻度・LTV",addedVersion:100},{id:"product-power",route:"/product-power",label:"商品力分析",desc:"商品別販売力・成長率",addedVersion:100},{id:"customer-efficiency",route:"/customer-efficiency",label:"営業効率",desc:"訪問コスト・粗利効率",addedVersion:150},{id:"report-aggregate",route:"/report",label:"集計帳票",desc:"各種集計レポートの出力",addedVersion:50},{id:"sales-list",route:"/sales",label:"売上一覧",desc:"売上明細の一覧表示・CSV出力",addedVersion:1}]},{title:"営業・顧客管理",color:"#0e9f6e",features:[{id:"churn-alert",route:"/churn-alert",label:"営業アクション",desc:"離反リスク検知・フォロー優先度",addedVersion:150},{id:"visit-planner",route:"/visit-planner",label:"訪問計画",desc:"訪問スケジュールの作成・管理",addedVersion:200},{id:"map-view",route:"/map",label:"取引先マップ",desc:"地図上で取引先の位置確認",addedVersion:100},{id:"prospects",route:"/prospects",label:"新規営業",desc:"新規開拓リストの進捗管理",addedVersion:100},{id:"email-broadcast",route:"/email",label:"メール配信",desc:"一斉メール配信・テンプレート管理",addedVersion:200},{id:"seasonal-calendar",route:"/seasonal-calendar",label:"季節提案",desc:"季節別提案スケジュール管理",addedVersion:250}]},{title:"受注・仕入",color:"#e3a008",features:[{id:"workflow-order",route:"/workflow",label:"受注ワークフロー",desc:"受注から出荷までのステータス管理",addedVersion:150},{id:"shopify-orders",route:"/shopify",label:"Shopify受注",desc:"EC受注の確認・取込",addedVersion:200},{id:"purchase-manage",route:"/purchase",label:"仕入・買掛",desc:"仕入管理・買掛金残高",addedVersion:100},{id:"payment-status",route:"/payment",label:"入金状況",desc:"入金・回収状況の一覧",addedVersion:1}]},{title:"製造管理",color:"#e02424",features:[{id:"jikomi-record",route:"/jikomi",label:"仕込管理",desc:"仕込帳・麹室・タンク仕込記録",addedVersion:200},{id:"tanks-manage",route:"/tanks",label:"タンク管理",desc:"タンク別在庫・ブレンド管理",addedVersion:200},{id:"tax-declaration",route:"/tax",label:"酒税申告書",desc:"課税移出・控除明細・eTax XML出力",addedVersion:250},{id:"tax-volume",route:"/tax",label:"移出量自動集計",desc:"販売伝票から清酒・リキュール別移出量を自動計算",addedVersion:322},{id:"demand-forecast",route:"/demand",label:"需要予測",desc:"過去実績ベースの需要予測",addedVersion:250},{id:"brewing-plan",route:"/brewing-plan",label:"醸造計画",desc:"年間醸造スケジュール管理",addedVersion:280},{id:"procurement-plan",route:"/procurement",label:"調達計画",desc:"原料米の調達・予算管理",addedVersion:280},{id:"brewing-process",route:"/brewing-process",label:"醸造工程",desc:"バッチ別工程管理・麹室制約チェック",addedVersion:300}]},{title:"マスタ・設定",color:"#6b7280",features:[{id:"master-products",route:"/master",label:"商品マスタ",desc:"商品情報の参照・編集",addedVersion:1},{id:"master-customers",route:"/master",label:"得意先マスタ",desc:"得意先情報の参照・編集",addedVersion:1},{id:"store-pos",route:"/store",label:"店舗販売",desc:"直売所のPOS・販売記録",addedVersion:250},{id:"tour-booking",route:"/tour",label:"酒蔵見学予約",desc:"見学予約の受付・管理",addedVersion:250},{id:"relay-status",route:"/setup",label:"連動状態",desc:"酒仙iとのリレー同期状態確認",addedVersion:1},{id:"csv-import",route:"/import",label:"CSV取込",desc:"マスタ・売上データのCSVインポート",addedVersion:100},{id:"user-manage",route:"/users",label:"ユーザー管理",desc:"アカウント・権限管理",addedVersion:100},{id:"url-share",route:"/",label:"URL共有",desc:"PWAモードでも全ページをURLで共有可能",addedVersion:322}]}];function bo(){return Vt.flatMap(e=>e.features)}function jy(e,t){const n=Date.now()-2592e6;return Vt.flatMap(s=>s.features).filter(s=>s.route===e).some(s=>{const r=t[s.id];return r?.confirmedAt!=null&&new Date(r.confirmedAt).getTime()>n})}function Fy(e,t){const s=bo().filter(c=>e[c.id]?.confirmedAt).length,r=bo().length,i=Vt.map(c=>{const d=c.features.map(h=>{const v=e[h.id],m=!!v?.confirmedAt,w=v?.confirmedAt?new Date(v.confirmedAt).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"}):"",_=v?.confirmedBy?`(${v.confirmedBy})`:"",k=m&&v?.confirmedAt?Date.now()-new Date(v.confirmedAt).getTime()<720*60*60*1e3:!1;return`
        <tr class="feature-row ${m?"confirmed":""}">
          <td class="feature-check">
            <input type="checkbox" class="feature-checkbox" data-feature-id="${h.id}"
              ${m?"checked":""} />
          </td>
          <td class="feature-label">
            <a href="#" data-link="${h.route}" class="feature-link">${h.label}</a>
            ${k?'<span class="badge-new-small">使用可能</span>':""}
          </td>
          <td class="feature-desc">${h.desc}</td>
          <td class="feature-version mono">v${h.addedVersion}</td>
          <td class="feature-status">
            ${m?`<span class="status-pill success">確認済 ${w} ${_}</span>`:'<span class="status-pill muted">未確認</span>'}
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
        <p class="kpi-value">${s} / ${r}</p>
        <p class="kpi-sub">${Math.round(s/r*100)}% 動作確認完了</p>
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
  `}const Vy={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let xt=null,Yy=0;const Un=[];function Uy(){return xt&&document.body.contains(xt)||(xt=document.createElement("div"),xt.className="toast-container",document.body.appendChild(xt)),xt}function F(e,t="success",n){const s=Uy(),r=++Yy,i=t==="error"?5e3:t==="warning"?4e3:3e3,c=document.createElement("div");c.className=`toast toast-${t}`,c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.innerHTML=`
    <span class="toast-icon">${Vy[t]}</span>
    <span class="toast-msg">${Hy(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const d={id:r,message:e,type:t,el:c};Un.push(d),s.appendChild(c),requestAnimationFrame(()=>{c.classList.add("toast-enter")});const u=()=>Jy(d);c.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{c.classList.add("toast-exit"),c.addEventListener("animationend",u,{once:!0})},i)}function Jy(e){const t=Un.indexOf(e);t!==-1&&(Un.splice(t,1),e.el.remove())}function Hy(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let Ve="closed",na="",Je="",Ze="",Jn=[],sa=[],ua=!1,Ot=!1;const Pn=[{id:"usage",icon:"💬",label:"使い方の質問",desc:"AIが操作方法をご案内します"},{id:"request",icon:"🔧",label:"改修・機能要望",desc:"新機能や改善の要望"},{id:"bug",icon:"🐛",label:"不具合の報告",desc:"動作がおかしい場合"},{id:"other",icon:"📝",label:"その他",desc:"上記に当てはまらない場合"}];function ha(){return(location.hash.replace(/^#/,"")||"/").split("?")[0]}function ws(e){return Vt.flatMap(t=>t.features).filter(t=>t.route===e)}function Qy(){return Vt.map(e=>({section:e.title,features:e.features}))}function ri(e){const t=Vt.flatMap(n=>n.features).find(n=>n.id===e);return t?t.label:""}function Hn(){const e=ha(),t=ws(e);return t.length>0?t.map(n=>n.label).join(" / "):e==="/"?"ホーム":e}function ii(){let e=document.getElementById("chat-widget-root");return e||(e=document.createElement("div"),e.id="chat-widget-root",document.body.appendChild(e)),e}function Ky(){const e=ha(),t=ws(e),n=Qy(),s=t.length===1?t[0].id:"";s&&!Je&&(Je=s);const r=t.length>0?`<optgroup label="📍 現在のページ">${t.map(c=>`<option value="${c.id}" ${Je===c.id?"selected":""}>${c.label} — ${c.desc}</option>`).join("")}</optgroup>`:"",i=n.map(c=>{const d=c.features.filter(u=>!t.some(h=>h.id===u.id));return d.length===0?"":`<optgroup label="${c.section}">${d.map(u=>`<option value="${u.id}" ${Je===u.id?"selected":""}>${u.label}</option>`).join("")}</optgroup>`}).join("");return`
    <select class="cw-select" id="cw-feature-select">
      <option value="">機能を選択してください</option>
      ${r}
      ${i}
    </select>`}function Wy(){if(Ve==="closed")return`
      <button class="cw-fab" id="cw-fab" aria-label="サポート">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      </button>`;let e="";if(Ve==="home"){const t=Pn.map(n=>`
      <button class="cw-category-card" data-cw-cat="${n.id}">
        <span class="cw-cat-icon">${n.icon}</span>
        <div>
          <span class="cw-cat-label">${n.label}</span>
          <span class="cw-cat-desc">${n.desc}</span>
        </div>
      </button>
    `).join("");e=`
      <div class="cw-home">
        <div class="cw-guide">
          <p class="cw-guide-title">このチャットでできること</p>
          <ul class="cw-guide-list">
            <li>💬 使い方の質問 → AIがその場で回答します</li>
            <li>🔧 改修要望・🐛 不具合 → 開発チームに届きます</li>
          </ul>
          <p class="cw-guide-note">今いるページを自動で検出するので、気になった時にすぐ送れます。</p>
        </div>
        <div class="cw-current-page">
          <span class="cw-page-pin">📍</span>
          <span class="cw-page-label">現在のページ: ${Tt(Hn())}</span>
        </div>
        <p class="cw-subtitle">どのようなご用件ですか？</p>
        <div class="cw-categories">${t}</div>
        <button class="cw-history-link" id="cw-show-history">過去の問い合わせを見る</button>
      </div>`}if(Ve==="chat"){const t=sa.map(n=>`
      <div class="cw-msg cw-msg-${n.role}">
        <div class="cw-msg-bubble">${Tt(n.text)}</div>
      </div>
    `).join("");e=`
      <div class="cw-chat">
        <button class="cw-back" id="cw-back-home">&larr; 戻る</button>
        <div class="cw-current-page" style="margin-bottom:8px">
          <span class="cw-page-pin">📍</span>
          <span class="cw-page-label">${Tt(Hn())}</span>
        </div>
        <div class="cw-messages" id="cw-messages">
          <div class="cw-msg cw-msg-ai">
            <div class="cw-msg-bubble">こんにちは！使い方についてお気軽にご質問ください。</div>
          </div>
          ${t}
          ${Ot?'<div class="cw-msg cw-msg-ai"><div class="cw-msg-bubble cw-typing">考え中…</div></div>':""}
        </div>
        <div class="cw-chat-input">
          <input type="text" class="cw-input" id="cw-chat-input"
            placeholder="質問を入力…" value="${Zy(Ze)}"
            ${Ot?"disabled":""} />
          <button class="cw-send" id="cw-chat-send" ${Ot?"disabled":""}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>`}if(Ve==="form"){const t=Pn.find(s=>s.id===na)?.label??"",n=Ky();e=`
      <div class="cw-form">
        <button class="cw-back" id="cw-back-home">&larr; 戻る</button>
        <p class="cw-form-cat">${t}</p>
        <label class="cw-label">対象の機能</label>
        ${n}
        <label class="cw-label">内容</label>
        <textarea class="cw-textarea" id="cw-message" rows="5"
          placeholder="具体的にどこをどうしたいか教えてください…">${Ze}</textarea>
        <button class="cw-submit button primary" id="cw-submit"
          ${ua?"disabled":""}>
          ${ua?"送信中…":"送信する"}
        </button>
      </div>`}return Ve==="history"&&(e=`
      <div class="cw-history">
        <button class="cw-back" id="cw-back-home">&larr; 戻る</button>
        <p class="cw-subtitle">過去の問い合わせ</p>
        <div class="cw-ticket-list">${Jn.length===0?'<p class="cw-empty">まだ問い合わせはありません</p>':Jn.map(n=>{const s=Pn.find(u=>u.id===n.category),r=n.feature_id?ri(n.feature_id):"",i=n.created_at?new Date(n.created_at).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}):"",c=n.status==="open"?"受付中":n.status==="in_progress"?"対応中":"完了",d=n.status==="open"?"open":n.status==="in_progress"?"progress":"done";return`
            <div class="cw-ticket">
              <div class="cw-ticket-head">
                <span class="cw-ticket-cat">${s?.icon??""} ${s?.label??n.category}</span>
                <span class="cw-ticket-status ${d}">${c}</span>
              </div>
              ${r?`<span class="cw-ticket-feature">📍 ${Tt(r)}</span>`:""}
              <p class="cw-ticket-msg">${Tt(n.message)}</p>
              ${n.admin_reply?`<div class="cw-ticket-reply"><strong>回答:</strong> ${Tt(n.admin_reply)}</div>`:""}
              <span class="cw-ticket-date">${i}</span>
            </div>`}).join("")}</div>
      </div>`),`
    <div class="cw-panel">
      <div class="cw-header">
        <span class="cw-header-title">サポート</span>
        <button class="cw-close" id="cw-close" aria-label="閉じる">&times;</button>
      </div>
      <div class="cw-body">${e}</div>
    </div>`}async function Gy(e){const t=Je?ri(Je):"",n=`${$e}/functions/v1/chat-support`,s=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",apikey:ie,Authorization:`Bearer ${ie}`},body:JSON.stringify({message:e,feature:t||Hn(),page:ha()})});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json()).reply??"回答を取得できませんでした"}function Xy(){const e=ii();e.querySelector("#cw-fab")?.addEventListener("click",()=>{Je="",Ve="home",Ge()}),e.querySelector("#cw-close")?.addEventListener("click",()=>{Ve="closed",Ze="",Je="",Ge()}),e.querySelectorAll("[data-cw-cat]").forEach(r=>{r.addEventListener("click",()=>{na=r.dataset.cwCat??"",Ze="";const i=ha(),c=ws(i);Je=c.length===1?c[0].id:"",na==="usage"?(sa=[],Ve="chat",Ge(),e.querySelector("#cw-chat-input")?.focus()):(Ve="form",Ge(),e.querySelector("#cw-message")?.focus())})}),e.querySelector("#cw-back-home")?.addEventListener("click",()=>{Ve="home",Ge()});const t=e.querySelector("#cw-chat-input"),n=e.querySelector("#cw-chat-send");async function s(){const r=Ze.trim();if(!(!r||Ot)){sa.push({role:"user",text:r}),Ze="",Ot=!0,Ge(),xo();try{const i=await Gy(r);sa.push({role:"ai",text:i})}catch{sa.push({role:"ai",text:"エラーが発生しました。しばらくしてからお試しください。"})}Ot=!1,Ge(),xo()}}t?.addEventListener("input",r=>{Ze=r.target.value}),t?.addEventListener("keydown",r=>{r.key==="Enter"&&!r.isComposing&&(r.preventDefault(),s())}),n?.addEventListener("click",s),e.querySelector("#cw-feature-select")?.addEventListener("change",r=>{Je=r.target.value}),e.querySelector("#cw-message")?.addEventListener("input",r=>{Ze=r.target.value}),e.querySelector("#cw-submit")?.addEventListener("click",async()=>{if(!Ze.trim()||ua)return;ua=!0,Ge();const r=ha(),i=await Ae("support_tickets",{category:na,message:Ze.trim(),user_email:$o(),status:"open",page_route:r,feature_id:Je||null});ua=!1,i?(F("送信しました。ありがとうございます！"),Ze="",na="",Je="",Ve="home"):F("送信に失敗しました","error"),Ge()}),e.querySelector("#cw-show-history")?.addEventListener("click",async()=>{Jn=await Y("support_tickets",{user_email:`eq.${$o()}`,order:"created_at.desc",limit:"20"}),Ve="history",Ge()})}function xo(){requestAnimationFrame(()=>{const e=document.getElementById("cw-messages");e&&(e.scrollTop=e.scrollHeight)})}function Ge(){const e=ii();e.innerHTML=Wy(),Xy()}function Tt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Zy(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}let wo=!1;function $o(){return To()?.email??"anonymous"}function eh(){wo&&document.getElementById("chat-widget-root")||(wo=!0,Ge())}function je(e,t={}){const{title:n="確認",confirmLabel:s="OK",cancelLabel:r="キャンセル",variant:i="primary"}=t;return new Promise(c=>{const d=document.createElement("div");d.className="modal-backdrop confirm-backdrop",d.setAttribute("role","dialog"),d.setAttribute("aria-modal","true"),d.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${i}">
            ${i==="danger"?th:ah}
          </div>
          <h3 class="confirm-title">${Ma(n)}</h3>
          <p class="confirm-message">${Ma(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${Ma(r)}</button>
          <button class="button ${i} confirm-ok">${Ma(s)}</button>
        </div>
      </div>
    `;const u=v=>{d.classList.add("confirm-exit"),d.addEventListener("animationend",()=>{d.remove()},{once:!0}),c(v)};d.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),d.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),d.addEventListener("click",v=>{v.target===d&&u(!1)});const h=v=>{v.key==="Escape"&&(document.removeEventListener("keydown",h),u(!1))};document.addEventListener("keydown",h),document.body.appendChild(d),requestAnimationFrame(()=>{d.querySelector(".confirm-ok")?.focus()})})}const th=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,ah=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function Ma(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function _o(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Qn(e,t,n){if(t.length===0&&(!n||n.length===0))return;const s=n&&n.length>0?n:Object.keys(t[0]??{}).map(h=>({key:h,label:h})),i=`\uFEFF${[s.map(h=>_o(h.label)).join(","),...t.map(h=>s.map(v=>_o(h[v.key])).join(","))].join(`\r
`)}`,c=new Blob([i],{type:"text/csv;charset=utf-8;"}),d=URL.createObjectURL(c),u=document.createElement("a");u.href=d,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(d),0)}const nh=Object.fromEntries(an.map(e=>[e.value,e.label])),sh=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan","/procurement","/brewing-process","/workforce","/changelog"];let Rt=[];async function oh(){const{supabaseQueryAll:e}=await I(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>ne);return{supabaseQueryAll:n}},void 0);Rt=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const ko=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"},{path:"/procurement",title:"調達計画"},{path:"/brewing-process",title:"醸造工程"},{path:"/tank-movements",title:"移動簿"},{path:"/tsumekuchi",title:"詰口帳票"},{path:"/changelog",title:"機能一覧・更新履歴"}];function li(e){const t=Zn[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function $s(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),deliveryDate:"",customerCode:"",customerName:"",staffCode:"",registeredBy:"",lines:[],note:""}}function rh(){const e=li("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const sn=new Date,ih=sn.toISOString().slice(0,7),lh=sn.getFullYear(),ch=sn.getMonth()+1,dh=sn.toISOString().slice(0,10),ph="C0011",wt=rh();function ci(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return sh.includes(n)?n:"/"}function on(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/product-linkage":case"/customer-efficiency":case"/demand-forecast":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/tank-movements":case"/tsumekuchi":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":case"/procurement":case"/brewing-process":case"/workforce":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":case"/shopify":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":case"/changelog":return"settings";default:return"dashboard"}}const So=ci(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,systemHealth:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,analysisTab:"customer",analysisPeriod:"",invoiceForm:$s(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",staffList:[],frequentCustomers:[],frequentProducts:[],pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:ih,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],genzaishuList:[],kenteiShowForm:!1,kenteiEditRecord:void 0,materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:lh,taxMonth:ch,taxVolume:null,featureStatuses:null,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],mapLoaded:!1,callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...lm,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...cm},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:dh,route:So,currentCategory:on(So),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},invoiceSelectedDocNo:null,invoiceSelectedLines:null,productLinkageGroup:null,ledgerCustomerCode:ph,salesPeriod:"month",customRange:{start:"",end:""},quoteState:Ga(Nn()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCustomerFilter:"",quoteCustomerFilterName:"",quoteCompanySettings:Nn(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyFiscalType:"jan",customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...hs},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:wt.mode,emailRegion:wt.region,emailHistorySegment:wt.historySegment,emailTemplateId:wt.templateId,emailSubject:wt.subject,emailBody:wt.body,emailSaveMessage:wt.saveMessage,emailSending:!1,demandForecast:{...Qd},shipmentCalendarData:null,shipmentCalendarPrevYearData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:ca(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:St,empCapacity:Pt},brewingSchedule:[],staffMembers:[],workforceMetrics:null,dailyShiftPlans:[],workforceTab:"staff",staffDeptFilter:"",workforceYearMonth:new Date().toISOString().slice(0,7),shiftBottlingTarget:0,workforceSelectedDay:null,bottlingSchedule:[],brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},riceVarieties:[],ricePurchaseCommitments:[],procurementDecisions:{},brewingBatches:[],brewingProcessSteps:[],bpExpandedBatchId:"",bpShowNewForm:!1,bpSelectedBatchIds:[],bpWorkerSettings:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},bpStepLabor:[],bpTanks:[],tankMovements:[],tankMovementFilter:"",tsumekuchiRecords:[],globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function Po(e){return e.slice(0,10)}function uh(e){return{...e}}function Za(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function di(){a.invoiceForm=$s(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},Za()}function pi(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,s)=>{n.productCode.trim()||(t[`lines.${s}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${s}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${s}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${s}.unitPrice`]="単価は0円以上で入力してください。")}),t}function mh(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,uh(t))}function yh(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((s,r)=>{const i=r===0?1:2,c=1200*(r+1);return{productCode:s.code,productName:s.name,quantity:i,unitPrice:c,unit:"本",amount:i*c}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function Ft(e){a.invoiceForm.customerCode=e.code,a.invoiceForm.customerName=e.name,a.invoicePriceGroup=e.priceGroup||"",a.invoiceForm.staffCode=e.staffCode||""}function hh(e){const t=e.trim().toLowerCase();if(!t)return!1;const n=a.masterStats?.customers.find(r=>r.code.toLowerCase()===t);if(n)return Ft(n),!0;const s=a.masterStats?.customers.filter(r=>r.name.toLowerCase().includes(t)||(r.kanaName||"").toLowerCase().includes(t));return s&&s.length===1?(Ft(s[0]),!0):!1}function fh(e){const t=e.trim().toLowerCase();if(!t)return!1;const n=a.masterStats?.customers.find(r=>r.name===e.trim());if(n)return Ft(n),!0;const s=a.masterStats?.customers.filter(r=>r.name.toLowerCase().includes(t)||(r.kanaName||"").toLowerCase().includes(t));return s&&s.length===1?(Ft(s[0]),!0):!1}function ui(e){if(Xe(e),a.invoiceErrors=pi(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){L();return}a.invoiceSaving=!0,L(),Jo(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=$s(),L()}).catch(()=>{a.invoiceSaving=!1,L()})}function mi(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((s,r)=>new Date(r.date).getTime()-new Date(s.date).getTime()).filter(s=>{const r=new Date(s.date);return!(t&&r<t||n&&r>n)})}function yi(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?Rt:Rt.filter(e=>e.area===a.emailRegion);case"history":return Rt.filter(e=>e.historySegment===a.emailHistorySegment);default:return Rt}}function gh(){const e=yi();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function En(e){const t=yi(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(s=>s.email),status:e}}function _s(){return a.user,!1}function fa(){a.globalSearchOpen=!1,a.globalQuery=""}function vh(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:ko.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:ko}}function bh(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?mi(a.salesSummary):[]).map(s=>({documentNo:s.documentNo,date:s.date,customerCode:s.customerCode,customerName:s.customerName,amount:s.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((s,r)=>r.balanceAmount-s.balanceAmount).map(s=>({...s})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(s=>({...s})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(s=>({...s})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(s=>({...s})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(s=>({...s})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(s=>({...s}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(s=>({...s}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Qn(n,e,t)}function kt(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=on(e),a.sidebarOpen=!1,e==="/customer-analysis"&&(a.analysisTab="customer"),e!=="/quote"&&(a.quoteCustomerFilter="",a.quoteCustomerFilterName=""),fa(),ga(e)}function Ua(e){const t=a.demandAnalysis,n=a.safetyStockParams;if(!t||n.length===0)return[];const[s,r]=e.split("-"),i=`${parseInt(s)-1}-${r}`,c=t.months.filter(d=>d<e).slice(-3);return n.map(d=>{const u=d.productionType==="make_to_order",h=t.matrix[d.productCode]?.[i]??0,v=c.map(C=>t.matrix[d.productCode]?.[C]??0),m=v.length>0?v.reduce((C,S)=>C+S,0)/v.length:d.avgMonthlyDemand,w=u?0:h>0?Math.ceil(h):Math.ceil(m),_=u?0:Math.ceil(d.safetyStockQty),k=Math.max(0,w+_);return{id:"",yearMonth:e,productCode:d.productCode,productName:d.productName,demandForecast:w,safetyStockTarget:_,openingStock:0,requiredProduction:k,plannedQty:u?0:k,actualQty:0,status:"draft",productionType:d.productionType??"monthly",notes:""}})}async function ga(e,t=!1){t||(a.actionLoading=!0,L());try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,L(),a.quoteList=await Ka(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:r}=await I(async()=>{const{fetchProspects:i}=await Promise.resolve().then(()=>j);return{fetchProspects:i}},void 0);a.prospects=await r()}break;case"/invoice-entry":if(a.staffList.length===0){const{fetchStaffList:r,fetchFrequentCustomers:i,fetchFrequentProducts:c}=await I(async()=>{const{fetchStaffList:v,fetchFrequentCustomers:m,fetchFrequentProducts:w}=await Promise.resolve().then(()=>j);return{fetchStaffList:v,fetchFrequentCustomers:m,fetchFrequentProducts:w}},void 0),[d,u,h]=await Promise.all([r(),i(10),c(10)]);a.staffList=d,a.frequentCustomers=u,a.frequentProducts=h}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await ya(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await ts());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await as(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:r}=await I(async()=>{const{fetchShipmentCalendar:m}=await Promise.resolve().then(()=>j);return{fetchShipmentCalendar:m}},void 0),i=a.shipmentCalendarYearMonth,[c,d]=i.split("-").map(Number),u=`${c-1}-${String(d).padStart(2,"0")}`,[h,v]=await Promise.all([r(i),r(u)]);a.shipmentCalendarData=h,a.shipmentCalendarPrevYearData=v;break}case"/billing":a.billingSummary||(a.billingSummary=await ns(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Ho());break;case"/product-power":case"/product-abc":kt("/customer-analysis"),a.analysisTab="product";return;case"/product-linkage":a.masterStats||(a.masterStats=await ma());break;case"/customer-efficiency":a.customerEfficiency=await Nt(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);break;case"/customer-analysis":await Promise.all([Go(a.analysisPeriod).then(r=>{a.customerAnalysis=r}),Xo(a.analysisPeriod).then(r=>{a.productABC=r})]);break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:r,fetchDeliverySchedule:i}=await I(async()=>{const{fetchDemandForecasts:u,fetchDeliverySchedule:h}=await Promise.resolve().then(()=>j);return{fetchDemandForecasts:u,fetchDeliverySchedule:h}},void 0),[c,d]=await Promise.all([r(),i()]);a.demandForecast.forecasts=c.map(u=>({code:u.productCode,name:u.productName,segment:u.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(u.avgMonthly),adjustedAvg:Math.round(u.avgMonthly),nextMonthForecast:Math.round(u.forecastQuantity),annualForecast:Math.round(u.avgMonthly*12),safetyStock:Math.round(u.safetyStock)})),a.demandForecast.deliveries=Kd(d)}break;case"/churn-alert":{const{fetchChurnAlerts:r,fetchChurnNotes:i}=await I(async()=>{const{fetchChurnAlerts:c,fetchChurnNotes:d}=await Promise.resolve().then(()=>j);return{fetchChurnAlerts:c,fetchChurnNotes:d}},void 0);if(!a.churnAlert){const c=await r();a.churnAlert=cy(c)}a.churnNotes=await i();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:r}=await I(async()=>{const{fetchProductShipmentsFromTable:c}=await Promise.resolve().then(()=>j);return{fetchProductShipmentsFromTable:c}},void 0),i=await r();if(i.length>0)a.seasonalCalendar=uo(i.map(c=>({code:c.code,name:c.name,category:"",monthlyQuantity:c.monthlyQuantity})));else{const{fetchProductMonthlyShipments:c}=await I(async()=>{const{fetchProductMonthlyShipments:u}=await Promise.resolve().then(()=>j);return{fetchProductMonthlyShipments:u}},void 0),d=await c();a.seasonalCalendar=uo(d.map(u=>({code:u.code,name:u.name,category:"",monthlyQuantity:u.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:r}=await I(async()=>{const{fetchVisitPriorities:c}=await Promise.resolve().then(()=>j);return{fetchVisitPriorities:c}},void 0),i=await r();if(i.length>0)a.visitPlanner={candidates:i.map(c=>({code:c.customer_code,name:c.customer_name,phone:c.phone,address:c.address,areaCode:c.area_code,businessType:c.business_type,priorityScore:c.priority_score,reasons:c.reasons,lastOrderDate:c.last_order_date,daysSinceOrder:c.days_since_order,annualRevenue:c.annual_revenue,recommendedAction:c.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=fo(i.map(c=>({code:c.customer_code,name:c.customer_name,phone:c.phone,address1:c.address,areaCode:c.area_code,businessType:c.business_type,annualRevenue:c.annual_revenue,lastOrderDate:c.last_order_date,hasSeasonalProposal:c.reasons.some(d=>d.includes("季節"))})));else{const{supabaseQueryAll:c}=await I(async()=>{const{supabaseQueryAll:m}=await Promise.resolve().then(()=>ne);return{supabaseQueryAll:m}},void 0),[d,u]=await Promise.all([c("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):ma().then(m=>m.customers)]),h=a.masterStats?.customers??u,v=new Map;d.forEach(m=>{const w=m.legacy_customer_code||"",_=m.sales_date||"",k=Number(m.total_amount)||0,C=v.get(w);!C||_>C.lastDate?v.set(w,{lastDate:_,total:(C?.total??0)+k}):C.total+=k}),a.visitPlanner=fo(h.filter(m=>m.isActive).map(m=>({code:m.code,name:m.name,phone:m.phone,address1:m.address1,areaCode:m.areaCode,businessType:m.businessType,annualRevenue:v.get(m.code)?.total??0,lastOrderDate:v.get(m.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:r,fetchSafetyStockParams:i,fetchProductionPlan:c,fetchLabelExclusions:d}=await I(async()=>{const{fetchDemandAnalysis:h,fetchSafetyStockParams:v,fetchProductionPlan:m,fetchLabelExclusions:w}=await Promise.resolve().then(()=>j);return{fetchDemandAnalysis:h,fetchSafetyStockParams:v,fetchProductionPlan:m,fetchLabelExclusions:w}},void 0);if(!a.demandAnalysis){const[h,v]=await Promise.all([r(a.demandYearsBack*12).catch(m=>(console.error("fetchDemandAnalysis failed:",m),null)),i().catch(m=>(console.error("fetchSafetyStockParams failed:",m),[]))]);h&&(a.demandAnalysis=h),a.safetyStockParams=v}if(a.productionPlan.length===0){const h=await c(a.demandPlanYearMonth).catch(()=>[]);h.length>0?a.productionPlan=h:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=Ua(a.demandPlanYearMonth))}const u=await d(a.demandPlanYearMonth).catch(()=>[]);if(a.calendarLabelExcluded=new Set(u),a.productionPlan.length>0){const h=a.productionPlan.filter(v=>!a.calendarLabelExcluded.has(v.productCode));rt(a.calendarShifts,h,a.calendarCapacity)}break}case"/procurement":case"/brewing-plan":{if(t&&a.brewingPlanData.length>0)break;const{fetchBrewingPlanSummary:r,fetchBrewingMonthlyTrend:i,fetchBrewingSchedule:c,fetchBrewingProductDetail:d,fetchBrewingCustomCategories:u,fetchBrewingCategoryOverrides:h,fetchAllBrewingStockEntries:v,fetchCategoryTypeLinks:m,fetchAvailableProductionTypes:w,fetchBrewingAlcoholSettings:_,fetchBrewingYearlyShipments:k,fetchBrewingSeasonalPattern:C,fetchBrewingForecastOverrides:S,fetchBrewingRiceParams:A,fetchRiceVarieties:E,fetchRicePurchaseCommitments:B,fetchProcurementDecisions:o}=await I(async()=>{const{fetchBrewingPlanSummary:te,fetchBrewingMonthlyTrend:W,fetchBrewingSchedule:ee,fetchBrewingProductDetail:H,fetchBrewingCustomCategories:Z,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:oe,fetchCategoryTypeLinks:fe,fetchAvailableProductionTypes:pe,fetchBrewingAlcoholSettings:be,fetchBrewingYearlyShipments:Fe,fetchBrewingSeasonalPattern:Yt,fetchBrewingForecastOverrides:it,fetchBrewingRiceParams:Ut,fetchRiceVarieties:xa,fetchRicePurchaseCommitments:X,fetchProcurementDecisions:de}=await Promise.resolve().then(()=>j);return{fetchBrewingPlanSummary:te,fetchBrewingMonthlyTrend:W,fetchBrewingSchedule:ee,fetchBrewingProductDetail:H,fetchBrewingCustomCategories:Z,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:oe,fetchCategoryTypeLinks:fe,fetchAvailableProductionTypes:pe,fetchBrewingAlcoholSettings:be,fetchBrewingYearlyShipments:Fe,fetchBrewingSeasonalPattern:Yt,fetchBrewingForecastOverrides:it,fetchBrewingRiceParams:Ut,fetchRiceVarieties:xa,fetchRicePurchaseCommitments:X,fetchProcurementDecisions:de}},void 0),l=a.brewingPlanFY,p=`${l}-10-01`,y=`${l+1}-09-30`,[f,g,x,$,P,D,T,O,N,R,M,z,V,U,G,J,K]=await Promise.all([r(p,y).catch(()=>[]),i(p,y).catch(()=>[]),c(l).catch(()=>[]),d(p,y).catch(()=>[]),u().catch(()=>[]),h().catch(()=>({})),v().catch(()=>[]),m().catch(()=>({})),w().catch(()=>[]),_().catch(()=>({})),k().catch(()=>[]),C().catch(()=>[]),S().catch(()=>({})),A().catch(()=>({})),E().catch(()=>[]),B(l).catch(()=>[]),o(l).catch(()=>({}))]);a.brewingPlanData=f,a.brewingMonthlyTrend=g,a.brewingSchedule=x,a.brewingProductDetail=$,a.brewingCustomCategories=P,a.brewingOverrides=D,a.brewingStockEntries=T,a.brewingTypeLinks=O,a.brewingAvailableTypes=N,a.brewingYearlyShipments=M,a.brewingSeasonalPattern=z,a.brewingForecastOverrides=V,a.brewingRiceParams=U,a.riceVarieties=G,a.ricePurchaseCommitments=J,a.procurementDecisions=K,a.brewingAlcoholSettings=R;break}case"/brewing-process":{const{fetchBrewingBatches:r,fetchBrewingProcessSteps:i,fetchBrewingCustomCategories:c,fetchBrewingSchedule:d,fetchWorkerSettings:u,fetchStepLabor:h,fetchBrewingRiceParams:v,fetchTanks:m}=await I(async()=>{const{fetchBrewingBatches:o,fetchBrewingProcessSteps:l,fetchBrewingCustomCategories:p,fetchBrewingSchedule:y,fetchWorkerSettings:f,fetchStepLabor:g,fetchBrewingRiceParams:x,fetchTanks:$}=await Promise.resolve().then(()=>j);return{fetchBrewingBatches:o,fetchBrewingProcessSteps:l,fetchBrewingCustomCategories:p,fetchBrewingSchedule:y,fetchWorkerSettings:f,fetchStepLabor:g,fetchBrewingRiceParams:x,fetchTanks:$}},void 0),w=a.brewingPlanFY,[_,k,C,S,A,E,B]=await Promise.all([r(w).catch(()=>[]),c().catch(()=>[]),d(w).catch(()=>[]),u().catch(()=>({workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1})),h().catch(()=>[]),v().catch(()=>({})),m().catch(()=>[])]);a.brewingBatches=_,a.brewingSchedule=C,a.bpWorkerSettings=S,a.bpStepLabor=A,a.brewingRiceParams=E,a.bpTanks=B,_.length>0?a.brewingProcessSteps=await i(_.map(o=>o.id)).catch(()=>[]):a.brewingProcessSteps=[],a.brewingCustomCategories=k;break}case"/workforce":{const[r,i,c,d]=await Promise.all([a.staffMembers.length>0?Promise.resolve(a.staffMembers):ys(),a.brewingSchedule.length>0?Promise.resolve(a.brewingSchedule):(async()=>{const{fetchBrewingSchedule:u}=await I(async()=>{const{fetchBrewingSchedule:h}=await Promise.resolve().then(()=>j);return{fetchBrewingSchedule:h}},void 0);return u(a.brewingPlanFY).catch(()=>[])})(),Er(a.workforceYearMonth),Lr(a.workforceYearMonth)]);a.staffMembers=r,a.workforceMetrics=c,a.dailyShiftPlans=d,a.brewingSchedule.length===0&&(a.brewingSchedule=i);break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await tr());break;case"/tanks":a.tankList.length===0&&(a.tankList=await ar());break;case"/tsumekuchi":{const{fetchTsumekuchiRecords:r,fetchGenzaishu:i,fetchTankList:c}=await I(async()=>{const{fetchTsumekuchiRecords:v,fetchGenzaishu:m,fetchTankList:w}=await Promise.resolve().then(()=>j);return{fetchTsumekuchiRecords:v,fetchGenzaishu:m,fetchTankList:w}},void 0),[d,u,h]=await Promise.all([r().catch(()=>[]),i().catch(()=>[]),c().catch(()=>[])]);a.tsumekuchiRecords=d,a.genzaishuList=u,a.tankList=h;break}case"/tank-movements":{const{fetchTankMovements:r,fetchTankList:i,fetchGenzaishu:c}=await I(async()=>{const{fetchTankMovements:v,fetchTankList:m,fetchGenzaishu:w}=await Promise.resolve().then(()=>j);return{fetchTankMovements:v,fetchTankList:m,fetchGenzaishu:w}},void 0),[d,u,h]=await Promise.all([r().catch(()=>[]),i().catch(()=>[]),c().catch(()=>[])]);a.tankMovements=d,a.tankList=u,a.genzaishuList=h;break}case"/kentei":const{fetchKenteiList:n,fetchGenzaishu:s}=await I(async()=>{const{fetchKenteiList:r,fetchGenzaishu:i}=await Promise.resolve().then(()=>j);return{fetchKenteiList:r,fetchGenzaishu:i}},void 0);a.kenteiList=await n().catch(()=>[]),a.genzaishuList=await s().catch(()=>[]);break;case"/materials":a.materialList.length===0&&(a.materialList=await nr());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([sr(),or()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([rr(),ir()]));break;case"/tax":(!a.taxDeclaration||!a.taxVolume)&&([a.taxDeclaration,a.taxVolume]=await Promise.all([rs(a.taxYear,a.taxMonth),is(a.taxYear,a.taxMonth)]));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([ls(a.storeSalesDate),dr()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:r}=await I(async()=>{const{fetchMailSenders:i}=await Promise.resolve().then(()=>j);return{fetchMailSenders:i}},void 0);if(a.mailSenders=await r(),!a.emailSenderId||!a.mailSenders.find(i=>i.id===a.emailSenderId)){const i=a.mailSenders.find(c=>c.isDefault)??a.mailSenders[0];i&&(a.emailSenderId=i.id)}}break;case"/calendar":{const{fetchCalendarEvents:r}=await I(async()=>{const{fetchCalendarEvents:i}=await Promise.resolve().then(()=>j);return{fetchCalendarEvents:i}},void 0);a.calendarEvents=await r(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:r}=await I(async()=>{const{fetchIntegrationSettings:i}=await Promise.resolve().then(()=>j);return{fetchIntegrationSettings:i}},void 0);a.integrations=await r()}break;case"/shopify":{const{fetchShopifyOrders:r,fetchIntegrationSettings:i}=await I(async()=>{const{fetchShopifyOrders:c,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>j);return{fetchShopifyOrders:c,fetchIntegrationSettings:d}},void 0);a.shopifyOrders=await r(),a.integrations.length===0&&(a.integrations=await i())}break;case"/fax":{const{fetchFaxInbox:r,fetchIntegrationSettings:i}=await I(async()=>{const{fetchFaxInbox:c,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>j);return{fetchFaxInbox:c,fetchIntegrationSettings:d}},void 0);a.faxRecords=await r(),a.integrations.length===0&&(a.integrations=await i())}break;case"/ledger":a.customerLedger=await es(a.ledgerCustomerCode);break;case"/setup":[a.syncDashboard,a.systemHealth]=await Promise.all([Bo(),zo()]);break;case"/raw-browser":a.rawTableList.length===0&&(a.rawTableList=await br());break;case"/users":{const{fetchUserProfiles:r}=await I(async()=>{const{fetchUserProfiles:i}=await Promise.resolve().then(()=>j);return{fetchUserProfiles:i}},void 0);a.userProfiles=await r()}break;case"/profile":{const{fetchMyProfile:r,fetchAuditLogs:i,fetchMailSenders:c}=await I(async()=>{const{fetchMyProfile:u,fetchAuditLogs:h,fetchMailSenders:v}=await Promise.resolve().then(()=>j);return{fetchMyProfile:u,fetchAuditLogs:h,fetchMailSenders:v}},void 0),d=a.user?.email??a.myProfile?.email??"";d&&(a.myProfile=await r(d)),a.mailSenders.length===0&&(a.mailSenders=await c()),a.auditLogs=await i(50)}break;case"/audit":{const{fetchAuditLogs:r}=await I(async()=>{const{fetchAuditLogs:i}=await Promise.resolve().then(()=>j);return{fetchAuditLogs:i}},void 0);a.auditLogs=await r(200)}break;case"/prospects":{const{fetchProspects:r}=await I(async()=>{const{fetchProspects:i}=await Promise.resolve().then(()=>j);return{fetchProspects:i}},void 0);a.prospects=await r()}break;case"/map":{const{fetchMapCustomers:r,fetchDeliveryLocations:i}=await I(async()=>{const{fetchMapCustomers:u,fetchDeliveryLocations:h}=await Promise.resolve().then(()=>j);return{fetchMapCustomers:u,fetchDeliveryLocations:h}},void 0),[c,d]=await Promise.all([r(),i()]);a.mapCustomers=c,a.deliveryLocations=d,a.mapLoaded=!0}break;case"/calls":{const{fetchCallLogs:r,fetchIntegrationSettings:i}=await I(async()=>{const{fetchCallLogs:c,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>j);return{fetchCallLogs:c,fetchIntegrationSettings:d}},void 0);a.callLogs=await r(100),a.integrations.length===0&&(a.integrations=await i())}break;case"/list-builder":{const{fetchLeadLists:r,fetchIntegrationSettings:i}=await I(async()=>{const{fetchLeadLists:c,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>j);return{fetchLeadLists:c,fetchIntegrationSettings:d}},void 0);a.leadLists=await r(),a.integrations.length===0&&(a.integrations=await i())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:r}=await I(async()=>{const{fetchWorkflowOrdersFromDb:i}=await Promise.resolve().then(()=>j);return{fetchWorkflowOrdersFromDb:i}},void 0);a.workflowOrders=await r()}break;case"/tour":{const{fetchTourInquiriesFromDb:r}=await I(async()=>{const{fetchTourInquiriesFromDb:i}=await Promise.resolve().then(()=>j);return{fetchTourInquiriesFromDb:i}},void 0);a.tourInquiries=await r()}break;case"/slack":{const{fetchSlackRules:r,fetchSlackLogs:i,fetchIntegrationSettings:c}=await I(async()=>{const{fetchSlackRules:d,fetchSlackLogs:u,fetchIntegrationSettings:h}=await Promise.resolve().then(()=>j);return{fetchSlackRules:d,fetchSlackLogs:u,fetchIntegrationSettings:h}},void 0);a.slackRules=await r(),a.slackLogs=await i(50),a.integrations.length===0&&(a.integrations=await c())}break;case"/changelog":a.featureStatuses||(a.featureStatuses=await Wa());break;case"/":a.featureStatuses||(a.featureStatuses=await Wa());break;default:break}}catch(n){console.error("Route data load error:",e,n),F(`データ読み込みエラー: ${n.message??"不明"}`,"error")}finally{t||(a.actionLoading=!1,L())}}function Eo(){if(_s())return Vp(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return $a("sales");case"/cat/brewery":return $a("brewery");case"/cat/purchase":return $a("purchase");case"/cat/more":return $a("more");case"/invoice-entry":return pp(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors,a.staffList,a.frequentCustomers,a.frequentProducts);case"/quote":return a.quoteEditId===null?gp(a.quoteList,a.quoteListLoading,a.quoteCustomerFilter,a.quoteCustomerFilterName):Br(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return bp(a.quoteCompanySettings);case"/email":return lp(gh());case"/delivery":return a.deliveryNote?rp(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return ky(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate,a.shipmentCalendarPrevYearData);case"/billing":return a.billingSummary?jd(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?Eu(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Ep(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/product-linkage":return a.masterStats?Cp(a.masterStats.products,a.productLinkageGroup):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p>読み込み中…</p></div></section>';case"/customer-efficiency":return Lp(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);case"/customer-analysis":return a.customerAnalysis?vu(a.customerAnalysis,a.productABC,a.analysisTab,a.analysisPeriod):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return Zd(a.demandForecast);case"/demand":return Lm(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return Rm(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/procurement":{const e={};if(a.brewingYearlyShipments.length>0){const t=new Date,n=t.getMonth()+1,s=n>=10?t.getFullYear():t.getFullYear()-1,r=[...new Set(a.brewingYearlyShipments.map(u=>u.fy))].filter(u=>u<s).sort(),i=new Map;for(const u of a.brewingSeasonalPattern)i.has(u.brewCategory)||i.set(u.brewCategory,new Map),i.get(u.brewCategory).set(u.monthNum,u.avgMonthlyL);const c=[];for(let u=n;u<=9;u++)c.push(u);if(n>=10)for(let u=1;u<=9;u++)c.push(u);const d=new Map;for(const u of a.brewingYearlyShipments)d.has(u.brewCategory)||d.set(u.brewCategory,new Map),d.get(u.brewCategory).set(u.fy,{shipL:u.shipmentL,annualL:u.annualizedL});for(const[u,h]of d){const v=r.filter(p=>h.has(p)).map(p=>h.get(p).shipL);let m=0;if(v.length>=2){const p=[];for(let y=1;y<v.length;y++)v[y-1]>0&&p.push((v[y]-v[y-1])/v[y-1]);m=p.length>0?p.reduce((y,f)=>y+f,0)/p.length:0}const w=u in a.brewingForecastOverrides?a.brewingForecastOverrides[u]:m,_=v.length>0?v[v.length-1]:h.get(s)?.annualL??0,k=i.get(u)??new Map,C=c.reduce((p,y)=>p+(k.get(y)??0),0),S=a.brewingStockEntries.filter(p=>p.brewCategory===u).reduce((p,y)=>p+y.volumeL,0),A=a.brewingAlcoholSettings[u],E=A&&A.targetAlcoholPct>0?A.rawAlcoholPct/A.targetAlcoholPct:1,B=Math.round(S*E),o=Math.max(0,B-Math.round(C)),l=Math.round(_*(1+w));e[u]=Math.max(0,l-o)}}return zm(e,a.brewingRiceParams,a.brewingCustomCategories,a.brewingSchedule,a.brewingPlanFY,a.riceVarieties,a.ricePurchaseCommitments,a.procurementDecisions)}case"/churn-alert":return a.churnAlert?uy(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?gy(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?Dy(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/brewing-process":{const e=[...new Set(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール",...a.brewingCustomCategories.map(t=>t.name)])];return Zm(a.brewingBatches,a.brewingProcessSteps,e,{expandedBatchId:a.bpExpandedBatchId,showNewForm:a.bpShowNewForm,schedule:a.brewingSchedule.map(t=>({brewCategory:t.brewCategory,fy:t.fy,brewMonth:t.brewMonth,durationMonths:t.durationMonths,plannedVolumeL:t.plannedVolumeL})),fy:a.brewingPlanFY,workerSettings:a.bpWorkerSettings,stepLabor:a.bpStepLabor,tanks:a.bpTanks.map(t=>({id:t.id,tankNo:t.tankNo,capacityL:t.capacityL,tankType:t.tankType,preferredCategories:t.preferredCategories,cleanupDays:t.cleanupDays})),selectedBatchIds:a.bpSelectedBatchIds})}case"/workforce":return iy(a.staffMembers,a.workforceTab,a.staffDeptFilter,a.workforceYearMonth,a.brewingSchedule,a.shiftBottlingTarget,a.workforceMetrics,a.dailyShiftPlans,a.workforceSelectedDay,a.productionPlan,a.bottlingSchedule??[]);case"/jikomi":return a.jikomiView==="calendar"?`${Vs(a.jikomiList,a.jikomiView)}${Bp(a.jikomiList)}`:Vs(a.jikomiList,a.jikomiView);case"/tanks":return Iy(a.tankList);case"/tsumekuchi":return Oy(a.tsumekuchiRecords,a.genzaishuList,a.tankList);case"/tank-movements":return Ry(a.tankMovements,a.tankList,a.tankMovementFilter,a.genzaishuList);case"/kentei":return jp(a.kenteiList,a.genzaishuList,a.kenteiShowForm,a.kenteiEditRecord);case"/materials":return au(a.materialList)+tu(a.materialEditing,a.materialEditingIsNew);case"/purchase":return iu(a.purchaseList,a.payableList);case"/raw-material":return lu(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?zy(a.taxDeclaration,a.taxYear,a.taxMonth,a.taxVolume??[]):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return Du(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?uu(a.pipelineMeta,$e,ie,a.syncDashboard,a.systemHealth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return vm(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return Tu(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return mm(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return Mu(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapLoaded?a.mapCustomers.length===0?`<section class="page-head"><div><p class="eyebrow">取引先マップ</p><h1>取引先マップ</h1></div></section>
          <section class="panel">
            <div style="padding:32px;text-align:center;color:var(--text-secondary)">
              <p style="font-size:1.5rem;margin-bottom:8px">📍</p>
              <p style="font-weight:600;margin-bottom:4px">緯度・経度データがありません</p>
              <p style="font-size:0.875rem">得意先マスタにジオコーディングが必要です。<br>relay フォルダの <code>geocode_customers.py</code> を実行してください。</p>
            </div>
          </section>`:Nu(a.mapCustomers,a.deliveryLocations,a.mapFilters):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>';case"/workflow":return Bu(a.workflowOrders);case"/mobile-order":return zu(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return Fu(a.tourInquiries,a.tourActiveId);case"/mail-senders":return Uu(a.mailSenders,a.mailSenderEditingId);case"/calendar":return Ju(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return Qu(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return Ku(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Wu(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/changelog":{const e=a.myProfile?.name??a.myProfile?.email??"不明";return a.featureStatuses!==null?Fy(a.featureStatuses,e):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">読み込み中…</p></div></section>'}case"/users":return Gu(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return Xu(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return Zu(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return em(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return sm(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return om(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return im(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.salesAnalytics)return"";switch(a.route){case"/sales":return Au(mi(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/payment":return ou([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return eu(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return Tp(a.invoiceRecords,a.invoiceFilter,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/ledger":return Jd(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return Hr(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return wh();default:return ap(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function xh(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(r=>!a.dismissedAnnouncements.has(r.id)).map(r=>{const i=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${i.bg};border-bottom:2px solid ${i.border};">
        <span class="announcement-text">${i.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),s=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+s}function wh(){const e=a.featureStatuses??{};function t(s,r,i,c){const d=`${"/".replace(/\/$/,"")||"/"}${s}`,u=jy(s,e);return`<a href="${d}" data-link="${s}" class="home-card">
      <span class="home-card-icon">${r}</span>
      <span class="home-card-label">${i}${u?' <span class="badge-new">使用可能</span>':""}</span>
      <span class="home-card-desc">${c}</span>
    </a>`}const n=[{title:"販売業務",color:"#1a56db",cards:[t("/invoice-entry","📝","伝票入力","売上・返品を入力"),t("/quote","📄","見積作成","見積書の作成・管理"),t("/invoice","🔍","伝票照会","過去伝票の照会"),t("/delivery","🚚","納品書","納品書の発行"),t("/billing","💳","月次請求","請求書・入金管理"),t("/ledger","📒","得意先台帳","取引履歴の確認")].join("")},{title:"分析・レポート",color:"#7e3af2",cards:[t("/analytics","📊","売上分析","期間・商品・得意先別"),t("/customer-analysis","👥","ABC分析","得意先・商品 ABC分析"),t("/customer-efficiency","⚡","営業効率","訪問効率・コスト"),t("/report","📈","集計帳票","各種集計帳票"),t("/sales","📋","売上一覧","売上明細一覧")].join("")},{title:"営業・顧客管理",color:"#0e9f6e",cards:[t("/churn-alert","🎯","営業アクション","離反リスク・フォロー"),t("/visit-planner","📅","訪問計画","訪問スケジュール"),t("/shipment-calendar","🚚","配送カレンダー","伝票日付で配送を確認"),t("/map","🗺️","取引先マップ","地図で取引先を確認"),t("/prospects","🌱","新規営業","新規開拓の進捗"),t("/email","✉️","メール配信","一斉メール配信"),t("/seasonal-calendar","🌸","季節提案","季節別提案管理")].join("")},{title:"受注・仕入",color:"#e3a008",cards:[t("/workflow","🔄","受注ワークフロー","受注から出荷まで"),t("/shopify","🛒","Shopify注文","EC受注の確認"),t("/purchase","📥","仕入・買掛","仕入管理・買掛金"),t("/payment","💰","入金状況","入金・回収状況")].join("")},{title:"製造管理",color:"#e02424",cards:[t("/jikomi","🍶","仕込管理","仕込帳・製造記録"),t("/tanks","🛢️","タンク管理","タンク在庫の管理"),t("/tax","📋","酒税申告","酒税申告書の作成"),t("/demand","📆","需要・生産計画","需要予測・生産計画"),t("/brewing-plan","🗓️","醸造計画","年間醸造スケジュール"),t("/procurement","🌾","調達計画","原料米の調達・予算"),t("/brewing-process","🍶","醸造工程","バッチ別の醸造工程管理"),t("/workforce","👥","人員・シフト管理","スタッフ管理・人件費")].join("")},{title:"マスタ・設定",color:"#6b7280",cards:[t("/master","⚙️","マスタ管理","商品・得意先マスタ"),t("/store","🏪","店舗・直売所","直売所の販売管理"),t("/tour","🏯","酒蔵見学","見学予約の管理"),t("/setup","🔗","連動設定","酒仙iとの連動"),t("/import","📤","データ取込","CSVデータ取込"),t("/users","👤","ユーザー管理","アカウント管理"),t("/changelog","✅","機能一覧・更新履歴","動作確認チェック・バージョン管理")].join("")}];return`
    <div class="home-page">
      <div class="home-welcome">
        <p class="home-welcome-date">${new Date().toLocaleDateString("ja-JP",{year:"numeric",month:"long",day:"numeric",weekday:"long"})}</p>
        <h2 class="home-welcome-title">何をしますか？</h2>
      </div>
      ${n.map(s=>`
        <div class="home-section">
          <h3 class="home-section-title" style="--section-color:${s.color}">
            <span class="home-section-bar"></span>${s.title}
          </h3>
          <div class="home-card-grid">${s.cards}</div>
        </div>
      `).join("")}
    </div>
  `}function $h(){const e=a.route,t=on(e),s=[{key:"sales",icon:"💼",label:"売上管理",items:[{path:"/invoice-entry",label:"伝票入力"},{path:"/invoice",label:"伝票照会"},{path:"/ledger",label:"得意先台帳"},{path:"/sales",label:"売上一覧"},{path:"/payment",label:"入金状況"},{path:"/billing",label:"月次請求"},{path:"/delivery",label:"納品書"},{path:"/report",label:"集計帳票"}]},{key:"analytics",icon:"📊",label:"分析",items:[{path:"/analytics",label:"売上分析"},{path:"/product-power",label:"商品パワー"},{path:"/product-linkage",label:"原酒紐付け"},{path:"/customer-analysis",label:"ABC分析"},{path:"/customer-efficiency",label:"営業効率"},{path:"/demand-forecast",label:"需要予測"},{path:"/shipment-calendar",label:"出荷カレンダー"}]},{key:"crm",icon:"🤝",label:"CRM・営業",items:[{path:"/churn-alert",label:"営業アクション"},{path:"/map",label:"取引先マップ"},{path:"/visit-planner",label:"訪問計画"},{path:"/prospects",label:"新規営業"},{path:"/calls",label:"通話履歴"},{path:"/seasonal-calendar",label:"季節提案"},{path:"/list-builder",label:"リスト取得"}]},{key:"brewery",icon:"🍶",label:"醸造管理",items:[{path:"/brewing-plan",label:"醸造計画"},{path:"/procurement",label:"調達計画"},{path:"/brewing-process",label:"醸造工程"},{path:"/demand",label:"需要・生産計画"},{path:"/jikomi",label:"仕込管理"},{path:"/tanks",label:"タンク管理"},{path:"/tank-movements",label:"移動簿"},{path:"/tsumekuchi",label:"詰口帳票"},{path:"/kentei",label:"検定管理"},{path:"/tax",label:"酒税申告"},{path:"/workforce",label:"人員・シフト"}]},{key:"master",icon:"🗂",label:"マスタ・帳票",items:[{path:"/master",label:"マスタ管理"},{path:"/materials",label:"資材管理"},{path:"/purchase",label:"仕入・買掛"},{path:"/store",label:"店舗・直売所"},{path:"/shopify",label:"Shopify注文"},{path:"/print",label:"印刷センター"},{path:"/calendar",label:"カレンダー"},{path:"/tour",label:"酒蔵見学"}]},{key:"settings",icon:"⚙",label:"設定",items:[{path:"/setup",label:"連動設定"},{path:"/integrations",label:"外部連携"},{path:"/users",label:"ユーザー管理"},{path:"/import",label:"データ取込"},{path:"/changelog",label:"更新履歴"}]}].map(i=>{const c=i.key===t,d=i.items.map(u=>`<a href="${u.path}" data-link="${u.path}" class="snav-sub${e===u.path?" active":""}">${u.label}</a>`).join("");return`<div class="snav-group${c?" open":""}">
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
        ${s}
        <a href="/changelog" data-link="/changelog" class="snav-home${e==="/changelog"?" active":""}">📋 機能一覧</a>
      </div>
      <div class="snav-footer">
        <a href="/profile" data-link="/profile" class="snav-profile">${a.user?.email??"👤 プロフィール"}</a>
      </div>
    </aside>
    ${r}
  `}function _h(){if(_s())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${Eo()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/product-linkage":"原酒紐付け","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/procurement":"調達計画","/brewing-process":"醸造工程","/changelog":"機能一覧・更新履歴","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",s=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?dp(a.masterStats.customers,a.pickerQuery,a.frequentCustomers):ru(a.masterStats.products,a.pickerQuery,a.frequentProducts):"",r=a.globalSearchOpen?cp(a.globalQuery,vh()):"",i=a.user?`<span class="app-header-user">${a.user.email}</span>
       <button class="button secondary small" type="button" data-action="auth-logout">ログアウト</button>`:a.authSkipped?'<span class="app-header-user">デモモード</span>':"";return`
    <div class="shell-v2">
      <header class="app-header">
        <div class="app-header-left">${`
    <button class="sidebar-hamburger" type="button" data-action="sidebar-open" aria-label="メニュー">☰</button>
    ${t?'<span class="app-brand-name">酒仙i クラウド</span>':`<span class="app-page-title">${n}</span>`}
  `}</div>
        <div class="app-header-right">
          <button class="button secondary small no-print" type="button" data-action="print-page" title="印刷" style="font-size:14px;padding:4px 8px;">🖨</button>
          <button class="button secondary small" type="button" data-action="global-search-open">検索 <kbd>Ctrl+K</kbd></button>
          <button class="button secondary small" type="button" data-action="hard-refresh" title="再読み込み" style="font-size:14px;padding:4px 8px;">↺</button>
          <button class="button secondary small" type="button" data-action="share-page" title="このページのURLを共有">🔗</button>
          ${i}
        </div>
      </header>
      ${xh()}
      <div class="shell-body">
        ${$h()}
        <main class="main-v2">
          <div class="view ${a.actionLoading?"is-busy":""}">${Eo()}</div>
        </main>
      </div>
      ${s}
      ${r}
    </div>
  `}async function kh(){a.actionLoading=!0,L();try{const{fetchSalesSummary:e}=await I(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>j);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,L()}}async function Sh(e){a.actionLoading=!0,L();try{a.invoiceRecords=await ya(e)}finally{a.actionLoading=!1,L()}}async function Ln(e){a.actionLoading=!0,L();try{a.customerLedger=await es(e)}finally{a.actionLoading=!1,L()}}function Xe(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,deliveryDate:e.querySelector("#inv-delivery-date")?.value??a.invoiceForm.deliveryDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:a.invoiceForm.staffCode,registeredBy:e.querySelector("#inv-registered-by")?.value??a.invoiceForm.registeredBy,lines:a.invoiceForm.lines.map((t,n)=>{const s=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:s,unitPrice:r,amount:s*r}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function $t(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function Lo(e){const t=document.getElementById("staff-form");if(!t)return;const n=t.querySelector("#sf-emp-type"),s=t.querySelector("#sf-hourly-row"),r=t.querySelector("#sf-hours-row"),i=t.querySelector("#sf-salary-row"),c=t.querySelector("#sf-contract-row"),d=t.querySelector("#sf-shift-pref-row");function u(){const h=n?.value??"part_time";s&&(s.style.display=h==="part_time"?"":"none"),r&&(r.style.display=h==="part_time"?"":"none"),i&&(i.style.display=h==="employee"?"":"none"),c&&(c.style.display=h==="contractor"?"":"none"),d&&(d.style.display=h==="part_time"?"":"none")}u(),n?.addEventListener("change",u),t.querySelector("[data-action='close-staff-modal']")?.addEventListener("click",()=>{document.getElementById("staff-modal")?.remove()}),t.addEventListener("submit",async h=>{h.preventDefault();const v=t.querySelector("#staff-form-result"),m=(t.querySelector("#sf-months")?.value??"").trim(),w=m?m.split(",").map(o=>parseInt(o.trim())).filter(o=>!isNaN(o)&&o>=1&&o<=12):null,_=Array.from(t.querySelectorAll("input[name='sf-cross']:checked")).map(o=>o.value),k=t.querySelector("#sf-emp-type")?.value??"part_time",C=k==="part_time"?t.querySelector("input[name='sf-shift-pref']:checked")?.value??"both":null,S=Array.from(t.querySelectorAll("input[name='sf-task']:checked")).map(o=>o.value),A=Array.from(t.querySelectorAll("input[name='sf-day-off']:checked")).map(o=>parseInt(o.value)),E={id:t.querySelector("#sf-id")?.value||void 0,name:t.querySelector("#sf-name")?.value.trim()??"",kana:t.querySelector("#sf-kana")?.value.trim()||"",employmentType:k,department:t.querySelector("#sf-dept")?.value??"bottling",hourlyRate:parseFloat(t.querySelector("#sf-hourly")?.value??"")||null,monthlySalary:parseFloat(t.querySelector("#sf-salary")?.value??"")||null,contractFee:parseFloat(t.querySelector("#sf-contract-fee")?.value??"")||null,workHoursPerDay:parseFloat(t.querySelector("#sf-hours")?.value??"8")||8,shiftPreference:C,monthlyTasks:S,availableMonths:w,crossDepartments:_,fixedDaysOff:A,isDeptLeader:t.querySelector("#sf-leader")?.checked??!1,notes:t.querySelector("#sf-notes")?.value.trim()||"",isActive:t.querySelector("#sf-active")?.checked??!0};if(!E.name){v&&(v.textContent="氏名は必須です");return}await Sr(E)?(document.getElementById("staff-modal")?.remove(),a.staffMembers=await ys(),F(e?"更新しました":"登録しました","success"),L()):v&&(v.textContent="保存に失敗しました")})}function Ph(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,L()}),e.querySelectorAll("[data-action='global-search-close']").forEach(o=>{o.addEventListener("click",l=>{o.classList.contains("global-search")&&l.target instanceof HTMLElement&&!l.target.classList.contains("global-search")||(fa(),L())})}),e.querySelector("#global-search-input")?.addEventListener("input",o=>{a.globalQuery=o.target.value,L()}),e.querySelectorAll("[data-action='global-nav']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.path;l&&(fa(),kt(l))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{bh()}),e.querySelectorAll("[data-jikomi-tab]").forEach(o=>{o.addEventListener("click",()=>{a.jikomiView=o.dataset.jikomiTab,L()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const o=e.querySelector("#auth-email")?.value.trim()??"",l=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,L(),ki(o,l).then(async p=>{a.user=p,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:y,recordAudit:f}=await I(async()=>{const{fetchMyProfile:g,recordAudit:x}=await Promise.resolve().then(()=>j);return{fetchMyProfile:g,recordAudit:x}},void 0);a.myProfile=await y(p.email),await f({action:"sign_in",userEmail:p.email}),L()}).catch(async p=>{try{const y=await Ps(o,l);a.user=y,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:f}=await I(async()=>{const{fetchMyProfile:g}=await Promise.resolve().then(()=>j);return{fetchMyProfile:g}},void 0);a.myProfile=await f(y.email)}catch{a.authError=p instanceof Error?p.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,L()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,L()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{Si().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,L()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(o=>{o.addEventListener("click",()=>{a.sidebarOpen=!1,L()})}),e.querySelectorAll("[data-snav-group]").forEach(o=>{o.addEventListener("click",()=>{o.closest(".snav-group")?.classList.toggle("open")})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let o=0;t.addEventListener("touchstart",l=>{o=l.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",l=>{l.changedTouches[0].clientX-o<-60&&(a.sidebarOpen=!1,L())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id??"";a.dismissedAnnouncements.add(l),L()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='hard-refresh']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='share-page']")?.addEventListener("click",async()=>{const o=window.location.href,l=document.title;if(navigator.share)try{await navigator.share({url:o,title:l})}catch{}else try{await navigator.clipboard.writeText(o),F("URLをコピーしました","success")}catch{F("コピーに失敗しました","error")}}),e.querySelectorAll("[data-link]").forEach(o=>{o.addEventListener("click",l=>{l.preventDefault(),kt(o.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async o=>{o.preventDefault();const l=e.querySelector("#fr-title")?.value??"",p=e.querySelector("#fr-category")?.value??"feature",y=e.querySelector("#fr-description")?.value??"",f=e.querySelector("#fr-result");if(!l.trim())return;const g=await Qo(l,p,y);if(f&&(f.textContent=g?"送信しました":"送信に失敗しました",f.className=`fr-result ${g?"success":"error"}`),g){const x=e.querySelector("#feature-request-form");x&&x.reset()}}),e.querySelectorAll("[data-period]").forEach(o=>{o.addEventListener("click",()=>{a.salesPeriod=o.dataset.period,L()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const o=e.querySelector("#range-start")?.value??"",l=e.querySelector("#range-end")?.value??"";o&&l&&(a.customRange={start:o,end:l},a.salesPeriod="custom",L())}),e.querySelectorAll("[data-edit-customer]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.editCustomer??"",p=a.masterStats?.customers.find(f=>f.id===l);if(!p)return;const y=document.createElement("div");y.innerHTML=Yp(p),document.body.appendChild(y.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async f=>{f.preventDefault();const g=document.getElementById("edit-result"),x=document.getElementById("ec-trade-type")?.value||null,$=await Ko(l,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,trade_type:x,manual_override:!0});g&&(g.textContent=$?"保存しました":"保存に失敗",g.className=`fr-result ${$?"success":"error"}`),$&&(document.getElementById("edit-modal")?.remove(),Bt())})})}),e.querySelectorAll("[data-edit-product]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.editProduct??"",p=a.masterStats?.products.find(x=>x.id===l);if(!p)return;const y=a.masterStats?.products??[],f=x=>{document.getElementById("edit-modal")?.remove();const $=document.createElement("div");$.innerHTML=pn(p,y,x),document.body.appendChild($.firstElementChild),n(l,p,y)};f(null);const g=await Ra(l);f(g)})});function n(o,l,p){document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.querySelector("[data-action='add-material']")?.addEventListener("click",async()=>{const y=document.getElementById("mat-name")?.value?.trim();if(!y)return;if(await Fo({productId:o,materialType:document.getElementById("mat-type")?.value||"other",materialName:y,materialCode:document.getElementById("mat-code")?.value||"",supplierName:document.getElementById("mat-supplier")?.value||"",unitCost:parseInt(document.getElementById("mat-cost")?.value)||0,quantityPerProduct:parseInt(document.getElementById("mat-qty")?.value)||1})){const g=await Ra(o);document.getElementById("edit-modal")?.remove();const x=document.createElement("div");x.innerHTML=pn(l,p,g),document.body.appendChild(x.firstElementChild),n(o,l,p),F("資材を追加しました","success")}}),document.querySelectorAll("[data-delete-material]").forEach(y=>{y.addEventListener("click",async()=>{const f=y.dataset.deleteMaterial??"";if(f&&await Vo(f)){const g=await Ra(o);document.getElementById("edit-modal")?.remove();const x=document.createElement("div");x.innerHTML=pn(l,p,g),document.body.appendChild(x.firstElementChild),n(o,l,p),F("資材を削除しました","success")}})}),document.getElementById("edit-product-form")?.addEventListener("submit",async y=>{y.preventDefault();const f=document.getElementById("edit-result"),g=await Wo(o,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0}),x=await Dn(o,{product_type:document.getElementById("ep-product-type")?.value||"standard",base_sake_id:document.getElementById("ep-base-sake")?.value||null,parent_product_id:document.getElementById("ep-parent-product")?.value||null}),$=g&&x;f&&(f.textContent=$?"保存しました":"保存に失敗",f.className=`fr-result ${$?"success":"error"}`),$&&(document.getElementById("edit-modal")?.remove(),Bt())})}e.querySelectorAll("[data-pl-group]").forEach(o=>{o.addEventListener("click",()=>{a.productLinkageGroup=o.dataset.plGroup??null,L()})}),e.querySelectorAll("[data-link-sake]").forEach(o=>{o.addEventListener("click",async l=>{l.stopPropagation();const p=o.dataset.linkSake??"",y=o.dataset.sakeId??"";p&&y&&await Dn(p,{base_sake_id:y})&&(F("原酒を紐付けました","success"),a.masterStats=await ma(),L())})}),e.querySelectorAll("[data-view-customer-quotes]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.viewCustomerQuotes??"",p=o.dataset.customerName??"";a.quoteCustomerFilter=l,a.quoteCustomerFilterName=p,a.quoteEditId=null,a.quoteList.length===0?(a.quoteListLoading=!0,kt("/quote"),a.quoteList=await Ka(),a.quoteListLoading=!1):kt("/quote"),L()})}),e.querySelector("[data-action='quote-clear-filter']")?.addEventListener("click",()=>{a.quoteCustomerFilter="",a.quoteCustomerFilterName="",L()}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=Ga(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,L()}),e.querySelectorAll("[data-open-quote]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.openQuote,p=await $r(l);if(!p){F("見積の読み込みに失敗しました","error");return}a.quoteState={id:p.id,quoteNo:p.quote_no,quoteDate:p.quote_date,validUntil:p.valid_until??"",customerCode:p.legacy_customer_code??"",customerName:p.customer_name,customerAddress:p.customer_address,subject:p.subject,lines:p.lines.map(y=>({productCode:y.legacy_product_code??"",productName:y.product_name,janCode:y.jan_code??"",caseQty:y.case_qty,quantity:y.quantity,unit:y.unit,unitPrice:y.unit_price,retailPrice:y.retail_price,amount:y.amount})),remarks:p.remarks,taxRate:p.tax_rate,deliveryDate:p.delivery_date,paymentTerms:p.payment_terms,deliveryPlace:p.delivery_place,templateType:p.template_type??"sake",previewMode:!1},a.quoteEditId=l,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,L()})}),e.querySelectorAll("[data-delete-quote]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.deleteQuote,p=o.dataset.quoteNo??l;if(!await je(`見積 ${p} を削除しますか？`))return;await Gn("quotes",l)?(a.quoteList=a.quoteList.filter(g=>g.id!==l),F("削除しました","success"),L()):F("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,L(),Ka().then(o=>{a.quoteList=o,a.quoteListLoading=!1,L()})}),e.querySelectorAll("[name='q-template']").forEach(o=>{o.addEventListener("change",()=>{a.quoteState.templateType=o.value,L()})});function s(o){return(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function r(o){return o.length?o.map(l=>`<button class="search-item" type="button" data-select-customer="${s(l.code)}" data-cust-name="${s(l.name)}" data-cust-addr="${s(l.address1||"")}"><span class="mono">${s(l.code)}</span><span style="font-size:13px;font-weight:600;">${s(l.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function i(o){o.querySelectorAll("[data-select-customer]").forEach(l=>{l.addEventListener("click",async()=>{const p=l.dataset.selectCustomer??"";a.quoteState.customerCode=p,a.quoteState.customerName=l.dataset.custName??"",a.quoteState.customerAddress=l.dataset.custAddr??"",a.quoteCustomerQuery="";const y=e.querySelector("#q-cust-search");y&&(y.value=""),o.remove(),a.quotePricing=await Tn(a.masterStats?.customers??[],p),L()})})}function c(o){const l=e.querySelector("#q-cust-search")?.closest(".form-row");if(!l)return;let p=document.getElementById("cust-search-results");p||(p=document.createElement("div"),p.id="cust-search-results",p.className="search-results",l.after(p));const y=a.masterStats?.customers??[],f=o.trim().toLowerCase(),g=f.length===0?y:y.filter(x=>x.name.includes(o)||x.kanaName.includes(o)||x.code.includes(o)||x.name.toLowerCase().includes(f)||x.kanaName.toLowerCase().includes(f));p.innerHTML=r(g),i(p)}function d(o,l){return o.length?o.map(p=>{const y=l?ss(p,l):{price:p.salePrice||0,label:"卸価格"},f=p.listPrice||0,g=y.label!=="標準価格"&&y.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${s(p.code)}" data-prod-name="${s(p.name)}" data-prod-price="${y.price}" data-prod-retail="${f}" data-prod-jan="${s(p.janCode??"")}" data-prod-unit="${s(p.unit)}" data-prod-case="${p.caseQty??""}"><span class="mono">${s(p.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${s(p.name)}</span><span class="numeric"${g?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${y.price?y.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${s(y.label)})</small>${f?`　定価 ¥${f.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function u(o){o.querySelectorAll("[data-add-product]").forEach(l=>{l.addEventListener("click",()=>{const p=l.dataset.addProduct??"",y=l.dataset.prodName??"",f=parseInt(l.dataset.prodPrice??"0"),g=parseInt(l.dataset.prodRetail??"0")||null,x=l.dataset.prodJan??"",$=l.dataset.prodUnit||"本",P=l.dataset.prodCase??"",D=P?parseInt(P):null;a.quoteState.lines.push({productCode:p,productName:y,janCode:x,caseQty:D,quantity:1,unit:$,unitPrice:f,retailPrice:g,amount:f}),a.quoteProductQuery="";const T=e.querySelector("#q-prod-search");T&&(T.value=""),L()})})}function h(o){const l=e.querySelector("#q-prod-search")?.closest(".form-row");if(!l)return;let p=document.getElementById("prod-search-results");if(p||(p=document.createElement("div"),p.id="prod-search-results",p.className="search-results",l.after(p)),!a.masterStats){p.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const y=a.masterStats.products,f=o.trim().toLowerCase(),g=f.length===0?y:y.filter(x=>x.name.includes(o)||x.kanaName.includes(o)||x.code.includes(o)||x.name.toLowerCase().includes(f)||x.kanaName.toLowerCase().includes(f));p.innerHTML=d(g,a.quotePricing),u(p)}function v(o,l){let p=null;function y(){p||(p=f=>{const g=document.getElementById(l);if(!g){document.removeEventListener("touchstart",p),document.removeEventListener("mousedown",p),p=null;return}o.contains(f.target)||g.contains(f.target)||(g.remove(),document.removeEventListener("touchstart",p),document.removeEventListener("mousedown",p),p=null)},document.addEventListener("touchstart",p,{passive:!0}),document.addEventListener("mousedown",p))}return y}(function(){const o=e.querySelector("#q-cust-search");if(!o)return;const l=v(o,"cust-search-results");o.addEventListener("focus",()=>{c(o.value),l()}),o.addEventListener("compositionend",()=>{a.quoteCustomerQuery=o.value,c(o.value)}),o.addEventListener("input",p=>{p.isComposing||(a.quoteCustomerQuery=o.value,c(o.value))}),o.value&&c(o.value)})(),(function(){const o=e.querySelector("#q-prod-search");if(!o)return;const l=v(o,"prod-search-results");o.addEventListener("focus",()=>{h(o.value),l()}),o.addEventListener("compositionend",()=>{a.quoteProductQuery=o.value,h(o.value)}),o.addEventListener("input",p=>{p.isComposing||(a.quoteProductQuery=o.value,h(o.value))}),o.value&&h(o.value)})(),e.querySelectorAll("[data-select-customer]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.selectCustomer??"";a.quoteState.customerCode=l,a.quoteState.customerName=o.dataset.custName??"",a.quoteState.customerAddress=o.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await Tn(a.masterStats?.customers??[],l),L()})}),e.querySelector("#q-price-type")?.addEventListener("change",o=>{const l=o.target.value;a.quoteState.manualPriceType=l,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:l}:a.quotePricing={priceType:l,priceGroup:"",individualPrices:new Map},L()}),e.querySelectorAll("[data-add-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.addProduct??"",p=o.dataset.prodName??"",y=parseInt(o.dataset.prodPrice??"0"),f=parseInt(o.dataset.prodRetail??"0")||null,g=o.dataset.prodJan??"",x=o.dataset.prodUnit||"本",$=o.dataset.prodCase??"",P=$?parseInt($):null;a.quoteState.lines.push({productCode:l,productName:p,janCode:g,caseQty:P,quantity:1,unit:x,unitPrice:y,retailPrice:f,amount:y}),a.quoteProductQuery="",L()})}),(()=>{const o=e.querySelector("#q-prospect-search");if(!o)return;const l=v(o,"q-prospect-results");function p(y){let f=document.getElementById("q-prospect-results");if(!f)return;const g=y.trim(),x=g.length===0?a.prospects.slice(0,8):a.prospects.filter($=>$.companyName.includes(g)||($.contactName??"").includes(g)).slice(0,8);if(x.length===0){f.innerHTML="";return}f.className="search-results",f.innerHTML=x.map($=>`<button class="search-item" type="button" data-select-prospect="${$.id}" data-prospect-name="${s($.companyName)}" data-prospect-addr="${s($.address??"")}"><span style="font-size:13px;font-weight:600;">${s($.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${s($.contactName??"")} ${$.address?"· "+$.address.slice(0,20):""}</span></button>`).join(""),f.querySelectorAll("[data-select-prospect]").forEach($=>{$.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=$.dataset.prospectName??"",a.quoteState.customerAddress=$.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=$.dataset.selectProspect??"";const P=a.quoteState.manualPriceType??"";a.quotePricing={priceType:P,priceGroup:"",individualPrices:new Map},o.value="",f&&(f.innerHTML=""),L()})})}o.addEventListener("focus",()=>{p(o.value),l()}),o.addEventListener("input",y=>{y.isComposing||p(o.value)}),o.addEventListener("compositionend",()=>p(o.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const o=e.querySelector("#q-prospect-search")?.value.trim()??"",l=document.createElement("div");l.className="modal-backdrop",l.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",l.innerHTML=`
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
    `,document.body.appendChild(l),l.querySelector("#pq-company")?.focus();const p=()=>l.remove();l.addEventListener("click",y=>{y.target===l&&p()}),l.querySelector("#prospect-quick-close")?.addEventListener("click",p),l.querySelector("#prospect-quick-close2")?.addEventListener("click",p),l.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const y=(l.querySelector("#pq-company")?.value??"").trim();if(!y){F("会社名は必須です","warning");return}const f={id:crypto.randomUUID(),companyName:y,contactName:l.querySelector("#pq-contact")?.value.trim()||void 0,address:l.querySelector("#pq-address")?.value.trim()||void 0,phone:l.querySelector("#pq-phone")?.value.trim()||void 0,note:l.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:g,fetchProspects:x}=await I(async()=>{const{saveProspect:D,fetchProspects:T}=await Promise.resolve().then(()=>j);return{saveProspect:D,fetchProspects:T}},void 0),$=await g(f);if(!$){F("登録失敗","error");return}a.prospects=await x(),a.quoteState.customerCode="",a.quoteState.customerName=$.companyName,a.quoteState.customerAddress=$.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=$.id;const P=a.quoteState.manualPriceType??"";a.quotePricing={priceType:P,priceGroup:"",individualPrices:new Map},p(),F(`${$.companyName} を見込み顧客として登録しました`,"success"),L()})});function m(){Sa(a.quoteState);const o=e.querySelector("#q-preview-scaler");if(!o)return;o.innerHTML=Br(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const l=o.querySelector(".q-preview-doc"),p=o.parentElement?.clientWidth??0,y=l?.offsetWidth??0;if(p>0&&y>0&&y>p-24){const f=(p-24)/y;o.style.transform=`scale(${f})`,o.style.transformOrigin="top left",o.style.height=`${((l?.offsetHeight??0)+48)*f}px`}else o.style.transform="",o.style.height=""}for(const o of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${o}`)?.addEventListener("input",m);e.querySelector("#q-remarks")?.addEventListener("input",m),e.querySelectorAll(".qty-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.quantity=parseFloat(o.value)||0,p.amount=p.quantity*p.unitPrice,m())})}),e.querySelectorAll(".price-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.unitPrice=parseInt(o.value)||0,p.amount=p.quantity*p.unitPrice,m())})}),e.querySelectorAll(".jan-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.janCode=o.value,m())})}),e.querySelectorAll(".case-qty-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.caseQty=o.value?parseInt(o.value):null,m())})}),e.querySelectorAll(".retail-price-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),p=a.quoteState.lines[l];p&&(p.retailPrice=o.value?parseInt(o.value):null,m())})}),e.querySelectorAll("[data-remove-line]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.removeLine??"0");a.quoteState.lines.splice(l,1),L()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{Sa(a.quoteState),a.quoteState.previewMode=!0,L()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,L()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="生成中…",a.quoteState.previewMode||Sa(a.quoteState);try{await _p(a.quoteState,a.quoteCompanySettings)}finally{l.disabled=!1,l.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{Sa(a.quoteState);const o=a.quoteState,l=o.lines.reduce(($,P)=>$+P.amount,0),p=Math.round(l*o.taxRate/100),y=l+p;if(!o.quoteNo)try{const{supabaseRpc:$}=await I(async()=>{const{supabaseRpc:D}=await Promise.resolve().then(()=>ne);return{supabaseRpc:D}},void 0),P=await $("generate_quote_no",{});o.quoteNo=P??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{o.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const f=new Date().toISOString().slice(0,10),g=o.templateType==="sake"||o.templateType==="standard"?o.templateType:"sake",x={quote_no:o.quoteNo,quote_date:o.quoteDate||f,valid_until:o.validUntil||null,legacy_customer_code:o.customerCode||null,customer_name:o.customerName||"",customer_address:o.customerAddress||"",subject:o.subject||"",template_type:g,subtotal:l,tax_amount:p,total_amount:y,tax_rate:o.taxRate||10,remarks:o.remarks||"",delivery_date:o.deliveryDate||"",payment_terms:o.paymentTerms||"",delivery_place:o.deliveryPlace||"",updated_at:new Date().toISOString()};try{let $=o.id;if(o.id){const P=await fetch(`${$e}/rest/v1/quotes?id=eq.${encodeURIComponent(o.id)}`,{method:"PATCH",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(x)});if(!P.ok){const D=await P.text();throw new Error(`quotes更新失敗 ${P.status}: ${D}`)}await fetch(`${$e}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(o.id)}`,{method:"DELETE",headers:{apikey:ie,Authorization:`Bearer ${ie}`}})}else{const P=await fetch(`${$e}/rest/v1/quotes`,{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(x)});if(!P.ok){const T=await P.text();throw new Error(`quotes作成失敗 ${P.status}: ${T}`)}const D=await P.json();if(!D?.[0]?.id)throw new Error("IDが返りませんでした");$=D[0].id,o.id=$}if(o.lines.length>0){const P=o.lines.map((T,O)=>({quote_id:$,line_no:O+1,legacy_product_code:T.productCode||null,product_name:T.productName,jan_code:T.janCode||null,case_qty:T.caseQty??null,quantity:T.quantity,unit:T.unit,unit_price:T.unitPrice,retail_price:T.retailPrice??null,amount:T.amount})),D=await fetch(`${$e}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:ie,Authorization:`Bearer ${ie}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(P)});if(!D.ok){const T=await D.text();throw new Error(`明細保存失敗 ${D.status}: ${T}`)}}F(`見積 ${o.quoteNo} を保存しました`,"success"),L()}catch($){console.error("[save-quote]",$),F(`保存失敗: ${String($).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const o=p=>document.getElementById(p)?.value??"",l={...a.quoteCompanySettings,companyName:o("qs-company-name"),companyPostal:o("qs-company-postal"),companyAddress1:o("qs-company-addr1"),companyAddress2:o("qs-company-addr2"),companyTel:o("qs-company-tel"),companyFax:o("qs-company-fax"),companyEmail:o("qs-company-email"),companyRegistrationNo:o("qs-company-regno"),bankName:o("qs-bank-name"),bankBranch:o("qs-bank-branch"),bankAccountType:o("qs-bank-type"),bankAccountNo:o("qs-bank-no"),bankAccountHolder:o("qs-bank-holder"),defaultPaymentTerms:o("qs-payment-terms"),defaultHeaderNote:o("qs-header-note"),defaultFooterNote:o("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};_t(l),It("quote_company",l),a.quoteCompanySettings=l,F("設定を保存しました","success"),L()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},_t(a.quoteCompanySettings),It("quote_company",a.quoteCompanySettings),L()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",o=>{const l=o.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},_t(a.quoteCompanySettings),L()}),e.querySelector("#qs-seal-file")?.addEventListener("change",o=>{const l=o.target.files?.[0];if(!l)return;const p=new FileReader;p.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:p.result},_t(a.quoteCompanySettings),It("quote_company",a.quoteCompanySettings),L()},p.readAsDataURL(l)}),e.querySelector("#qs-seal-size")?.addEventListener("input",o=>{const l=parseInt(o.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:l},_t(a.quoteCompanySettings),It("quote_company",a.quoteCompanySettings),L()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},_t(a.quoteCompanySettings),It("quote_company",a.quoteCompanySettings),L()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.month;l&&(a.demandForecast.calendarMonth=l,L())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.segment;a.demandForecast.selectedSegment=l,L()})}),e.querySelectorAll("[data-demand-tab]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.demandTab;if(l){if(a.demandTab=l,l==="calendar"){const p=new Date().toISOString().slice(0,10);p.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=p)}L()}})}),e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async o=>{const l=parseInt(o.target.value)||3;a.demandYearsBack=l,a.demandAnalysis=null;const{fetchDemandAnalysis:p}=await I(async()=>{const{fetchDemandAnalysis:y}=await Promise.resolve().then(()=>j);return{fetchDemandAnalysis:y}},void 0);a.demandAnalysis=await p(l*12),L()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",p=parseInt(o.value)||30;a.safetyStockParams=a.safetyStockParams.map(y=>{if(y.productCode!==l)return y;const f=y.serviceLevel>=.99?2.33:y.serviceLevel>=.97?1.88:y.serviceLevel>=.95?1.65:y.serviceLevel>=.9?1.28:1.04,g=p/30,x=Math.ceil(f*y.demandStdDev*Math.sqrt(g)),$=Math.ceil(y.avgMonthlyDemand*g+x);return{...y,leadTimeDays:p,safetyStockQty:x,reorderPoint:$}}),L()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",p=parseFloat(o.value)||.95;a.safetyStockParams=a.safetyStockParams.map(y=>{if(y.productCode!==l)return y;const f=p>=.99?2.33:p>=.97?1.88:p>=.95?1.65:p>=.9?1.28:1.04,g=y.leadTimeDays/30,x=Math.ceil(f*y.demandStdDev*Math.sqrt(g)),$=Math.ceil(y.avgMonthlyDemand*g+x);return{...y,serviceLevel:p,safetyStockQty:x,reorderPoint:$}}),L()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async o=>{if(a.safetyStockParams.length===0)return;const l=o.currentTarget;l.disabled=!0,l.textContent="保存中…";const{saveSafetyStockParamsBulk:p}=await I(async()=>{const{saveSafetyStockParamsBulk:f}=await Promise.resolve().then(()=>j);return{saveSafetyStockParamsBulk:f}},void 0),y=await p(a.safetyStockParams);l.disabled=!1,l.textContent=y?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{l.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const o=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),l=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(p=>{const y=o>=.99?2.33:o>=.97?1.88:o>=.95?1.65:o>=.9?1.28:1.04,f=l/30,g=Math.ceil(y*p.demandStdDev*Math.sqrt(f)),x=Math.ceil(p.avgMonthlyDemand*f+g);return{...p,serviceLevel:o,leadTimeDays:l,safetyStockQty:g,reorderPoint:x}}),L()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",p=o.value;a.productionPlan=a.productionPlan.map(y=>y.productCode===l?{...y,productionType:p}:y)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async o=>{const l=o.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarShifts=ca(l,1,0);const{fetchProductionPlan:p}=await I(async()=>{const{fetchProductionPlan:f}=await Promise.resolve().then(()=>j);return{fetchProductionPlan:f}},void 0),y=await p(l);a.productionPlan=y.length>0?y:Ua(l),rt(a.calendarShifts,a.productionPlan.filter(f=>!a.calendarLabelExcluded.has(f.productCode)),a.calendarCapacity),L()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(o=>{o.addEventListener("click",()=>{a.demandPlanTypeFilter=o.dataset.filter??"all",L()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.sortCol??"";a.demandSort?.column===l?a.demandSort=a.demandSort.dir==="desc"?{column:l,dir:"asc"}:null:a.demandSort={column:l,dir:"desc"},L()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=Ua(a.demandPlanYearMonth),L()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",o=>{const l=o.target.files?.[0];if(!l)return;const p=new FileReader;p.onload=async()=>{const{parseCSV:y}=await I(async()=>{const{parseCSV:R}=await Promise.resolve().then(()=>fm);return{parseCSV:R}},void 0),{columns:f,rows:g}=y(p.result),x=document.getElementById("csv-import-status"),$=f.find(R=>/商品コード|product_code|code|コード/i.test(R)),P=f.find(R=>/在庫|stock|期首|opening/i.test(R)),D=f.find(R=>/計画|plan|planned|生産/i.test(R));if(!$){x&&(x.style.display="block",x.style.background="rgba(197,61,61,0.1)",x.style.color="#c53d3d",x.textContent=`エラー: 商品コード列が見つかりません。列名: ${f.join(", ")}`);return}let T=0,O=0,N=0;for(const R of g){const M=(R[$]??"").trim();if(!M)continue;const z=a.productionPlan.find(V=>V.productCode===M);if(z){if(T++,P&&R[P]!==void 0&&R[P]!==""){const V=parseFloat(R[P])||0;z.openingStock=V,z.requiredProduction=Math.max(0,z.demandForecast+z.safetyStockTarget-V),z.plannedQty>0&&!D&&(z.plannedQty=z.requiredProduction),O++}D&&R[D]!==void 0&&R[D]!==""&&(z.plannedQty=parseFloat(R[D])||0,N++)}}x&&(x.style.display="block",T===0?(x.style.background="rgba(183,121,31,0.1)",x.style.color="#b7791f",x.textContent=`一致する商品コードが見つかりませんでした（CSV: ${g.length}行）`):(x.style.background="rgba(47,133,90,0.1)",x.style.color="#2f855a",x.textContent=`${T}商品に反映: 在庫${O}件${N>0?` / 計画${N}件`:""} 更新`),setTimeout(()=>{x.style.display="none"},5e3)),L()},p.readAsText(l,"UTF-8"),o.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(p=>{const y=p.dataset.code??"",f=a.productionPlan.find(g=>g.productCode===y);f&&(f.plannedQty=parseFloat(p.value)||0)}),e.querySelectorAll("[data-action='plan-actual-qty']").forEach(p=>{const y=p.dataset.code??"",f=a.productionPlan.find(g=>g.productCode===y);f&&(f.actualQty=parseFloat(p.value)||0,f.actualQty>0&&(f.status="actual"))});const{saveProductionPlan:o}=await I(async()=>{const{saveProductionPlan:p}=await Promise.resolve().then(()=>j);return{saveProductionPlan:p}},void 0);await Promise.all(a.productionPlan.map(p=>o(p)));const{fetchProductionPlan:l}=await I(async()=>{const{fetchProductionPlan:p}=await Promise.resolve().then(()=>j);return{fetchProductionPlan:p}},void 0);a.productionPlan=await l(a.demandPlanYearMonth),F("保存しました"),L()}),e.querySelector("[data-action='plan-print']")?.addEventListener("click",()=>{const o=e.querySelector("[data-action='plan-save']")?.closest("section.panel"),l=e.querySelector("[data-action='cal-toggle-day']")?.closest("section.panel"),p=(o?.outerHTML??"")+(l?.outerHTML??""),y=a.demandPlanYearMonth.replace("-","年")+"月",f=window.open("","_blank");f&&(f.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
      <title>生産計画 ${y}</title>
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
    </head><body><h1 style="font-size:16px;margin-bottom:12px;">生産計画 — ${y}</h1>${p}</body></html>`),f.document.close(),setTimeout(()=>{f.print()},300))}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.date??"";a.calendarSelectedDate=a.calendarSelectedDate===l?null:l,L()}),o.addEventListener("dblclick",()=>{const l=o.dataset.date??"",p=a.calendarShifts.find(y=>y.date===l);!p||p.confirmed||(p.partTimers>0||p.employees>0?(p.partTimers=0,p.employees=0):(p.partTimers=1,p.employees=0),rt(a.calendarShifts,a.productionPlan.filter(y=>!a.calendarLabelExcluded.has(y.productCode)),a.calendarCapacity),a.calendarSelectedDate=l,L())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="保存中…";const{saveLabelExclusions:p}=await I(async()=>{const{saveLabelExclusions:g}=await Promise.resolve().then(()=>j);return{saveLabelExclusions:g}},void 0),y=[...a.calendarLabelExcluded],f=await p(a.demandPlanYearMonth,y);l.disabled=!1,l.textContent=f?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{l.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",y=document.getElementById("cal-label-list")?.scrollTop??0;o.checked?a.calendarLabelExcluded.delete(l):a.calendarLabelExcluded.add(l);const f=a.productionPlan.filter(g=>!a.calendarLabelExcluded.has(g.productCode));rt(a.calendarShifts,f,a.calendarCapacity),L(),requestAnimationFrame(()=>{const g=document.getElementById("cal-label-list");g&&(g.scrollTop=y)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.type??"",y=document.getElementById("cal-label-list")?.scrollTop??0,f=a.productionPlan.filter(x=>x.productionType===l);if(o.checked)for(const x of f)a.calendarLabelExcluded.delete(x.productCode);else for(const x of f)a.calendarLabelExcluded.add(x.productCode);const g=a.productionPlan.filter(x=>!a.calendarLabelExcluded.has(x.productCode));rt(a.calendarShifts,g,a.calendarCapacity),L(),requestAnimationFrame(()=>{const x=document.getElementById("cal-label-list");x&&(x.scrollTop=y)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||St;a.calendarCapacity.partCapacity=l;const p=a.productionPlan.filter(y=>!a.calendarLabelExcluded.has(y.productCode));rt(a.calendarShifts,p,a.calendarCapacity),L()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||Pt;a.calendarCapacity.empCapacity=l;const p=a.productionPlan.filter(y=>!a.calendarLabelExcluded.has(y.productCode));rt(a.calendarShifts,p,a.calendarCapacity),L()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.date??"",p=parseInt(o.value)||0,y=a.calendarShifts.find(f=>f.date===l);y&&(y.partTimers=p),L()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.date??"",p=parseInt(o.value)||0,y=a.calendarShifts.find(f=>f.date===l);y&&(y.employees=p),L()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async o=>{const l=o.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarSelectedDate=null,a.calendarShifts=ca(l,1,0);const{fetchProductionPlan:p,fetchLabelExclusions:y}=await I(async()=>{const{fetchProductionPlan:x,fetchLabelExclusions:$}=await Promise.resolve().then(()=>j);return{fetchProductionPlan:x,fetchLabelExclusions:$}},void 0),[f,g]=await Promise.all([p(l),y(l)]);a.productionPlan=f.length>0?f:Ua(l),a.calendarLabelExcluded=new Set(g),rt(a.calendarShifts,a.productionPlan.filter(x=>!a.calendarLabelExcluded.has(x.productCode)),a.calendarCapacity),L()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||0;a.calendarDefaultPart=l;for(const p of a.calendarShifts)if(!p.confirmed){const y=new Date(p.date).getDay()===0||new Date(p.date).getDay()===6;p.partTimers=y?0:l}L()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||0;a.calendarDefaultEmp=l;for(const p of a.calendarShifts)if(!p.confirmed){const y=new Date(p.date).getDay()===0||new Date(p.date).getDay()===6;p.employees=y?0:l}L()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=ca(a.demandPlanYearMonth,1,0),rt(a.calendarShifts,a.productionPlan.filter(o=>!a.calendarLabelExcluded.has(o.productCode)),a.calendarCapacity),L()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const o of a.calendarShifts)o.confirmed=!0;L()}),e.querySelectorAll("[data-action='select-month']").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=l,L())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterArea=o.target.value,L())}),e.querySelector("#visit-filter-score")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(o.target.value)||0,L())}),e.querySelector("[data-action='refresh-analytics']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="更新中…";try{const{supabaseRpc:p}=await I(async()=>{const{supabaseRpc:y}=await Promise.resolve().then(()=>ne);return{supabaseRpc:y}},void 0);await p("refresh_analytics",{}),a.visitPlanner=null,a.shipmentCalendarData=null,F("分析データを更新しました","success"),L()}catch(p){console.error("[refresh-analytics]",p),F("更新に失敗しました","error"),l.disabled=!1,l.textContent="⟳ データ更新"}}),e.querySelectorAll("[data-sort-col]").forEach(o=>{o.addEventListener("click",l=>{const p=o.dataset.sortCol??"",y=l.shiftKey;a.route==="/product-power"?a.productSortState=Jt(a.productSortState,p,y):a.route==="/customer-efficiency"?a.customerSortState=Jt(a.customerSortState,p,y):a.route==="/"||a.route==="/sales"?a.dashboardSortState=Jt(a.dashboardSortState,p,y):a.route==="/master"?a.masterSortState=Jt(a.masterSortState,p,y):a.route==="/analytics"&&(a.analyticsSortState=Jt(a.analyticsSortState,p,y)),L()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(o=>{o.addEventListener("click",async()=>{const l=parseInt(o.dataset.year??"",10);l&&(a.customerEfficiencyYear=l,a.customerEfficiency=await Nt(l,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),L())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async o=>{const l=parseInt(o.target.value,10);l&&(a.customerEfficiencyYear=l,a.customerEfficiency=await Nt(l,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),L())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.groupby??"billing";a.customerEfficiencyGroupBy=l,a.customerEfficiency=await Nt(a.customerEfficiencyYear,l,a.customerEfficiencyFiscalType),L()})}),e.querySelectorAll("[data-action='efficiency-fiscal-type']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.fiscalType??"jan";a.customerEfficiencyFiscalType=l,a.customerEfficiency=await Nt(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,l),L()})}),e.querySelectorAll("[data-product-period]").forEach(o=>{o.addEventListener("click",()=>{a.productPeriod=o.dataset.productPeriod??"year",L()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const o=document.getElementById("pp-range-start")?.value??"",l=document.getElementById("pp-range-end")?.value??"";o&&l&&(a.productCustomStart=o,a.productCustomEnd=l,a.productPeriod="custom",L())}),e.querySelectorAll("[data-product-filter]").forEach(o=>{o.addEventListener("click",()=>{a.productFilter=o.dataset.productFilter??"all",L()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="更新中…",await Bt(),l.disabled=!1,l.textContent="↻ 更新",F("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const o=e.querySelector("#sales-start")?.value??"",l=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:o,endDate:l},kh()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const o={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=o,a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,Sh(o)}),e.addEventListener("click",o=>{const l=o.target.closest("tr[data-doc-no]");if(!l)return;const p=l.dataset.docNo??"";if(a.route==="/"){a.invoiceSelectedDocNo=p,a.invoiceSelectedLines=null,navigateTo("/sales"),Cn(p).then(y=>{a.invoiceSelectedDocNo===p&&(a.invoiceSelectedLines=y,L())});return}if(a.invoiceSelectedDocNo===p){a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,L();return}a.invoiceSelectedDocNo=p,a.invoiceSelectedLines=null,L(),Cn(p).then(y=>{a.invoiceSelectedDocNo===p&&(a.invoiceSelectedLines=y,L())})});const w=e.querySelector("#ledger-customer-code"),_=e.querySelector("#ledger-cust-suggestions");if(w&&_){const o=a.masterStats?.customers??[];w.addEventListener("input",()=>{const l=w.value.trim().toLowerCase();if(!l){_.style.display="none";return}const p=o.filter(y=>y.code.toLowerCase().includes(l)||y.name.toLowerCase().includes(l)||(y.kanaName??"").toLowerCase().includes(l)).slice(0,10);if(!p.length){_.style.display="none";return}_.innerHTML=p.map(y=>`<button class="search-item" type="button" data-ledger-cust="${y.code}"><span class="mono">${y.code}</span><span>${y.name}</span></button>`).join(""),_.style.display="block",_.querySelectorAll("[data-ledger-cust]").forEach(y=>{y.addEventListener("click",()=>{const f=y.dataset.ledgerCust??"";w.value=f,_.style.display="none",a.ledgerCustomerCode=f,Ln(f)})})}),w.addEventListener("keydown",l=>{if(l.key==="Enter"){_.style.display="none";const p=w.value.trim(),y=p.toLowerCase(),f=(a.masterStats?.customers??[]).filter(x=>x.code.toLowerCase()===y||x.name.toLowerCase()===y),g=f.length===1?f[0].code:p.toUpperCase();a.ledgerCustomerCode=g,Ln(g)}}),w.addEventListener("blur",()=>{setTimeout(()=>{_.style.display="none"},200)})}e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const o=e.querySelector("#ledger-customer-code")?.value.trim()??"",l=o.toLowerCase(),p=(a.masterStats?.customers??[]).filter(f=>f.code.toLowerCase()===l||f.name.toLowerCase()===l),y=p.length===1?p[0].code:o.toUpperCase();a.ledgerCustomerCode=y,Ln(y)}),e.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{a.masterTab=o.dataset.tab,a.masterFilter={...hs},L()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",tradeType:e.querySelector("#master-trade-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},L()}),e.querySelector("#master-search")?.addEventListener("keydown",o=>{o.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.page);l>=1&&(a.masterFilter={...a.masterFilter,page:l},L())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.table;if(!l)return;a.rawSelectedTable=l,a.rawPage=1;const p=await za(l,1);a.rawRecords=p.records,a.rawTotalCount=p.total,L()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const o=await za(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,L()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const o=await za(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,L()}),e.querySelectorAll("[data-analytics-tab]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsTab=o.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:p}=await I(async()=>{const{fetchAnalyticsByPeriod:y,fetchAvailablePeriods:f}=await Promise.resolve().then(()=>j);return{fetchAnalyticsByPeriod:y,fetchAvailablePeriods:f}},void 0);a.analyticsPeriodOptions=await p(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await l(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}L()})}),e.querySelectorAll("[data-analytics-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:p,fetchPeriodChartData:y,prevYearFilter:f}=await I(async()=>{const{fetchAnalyticsByPeriod:x,fetchAvailablePeriods:$,fetchPeriodChartData:P,prevYearFilter:D}=await Promise.resolve().then(()=>j);return{fetchAnalyticsByPeriod:x,fetchAvailablePeriods:$,fetchPeriodChartData:P,prevYearFilter:D}},void 0),g=o.dataset.analyticsPeriod;if(a.analyticsPeriod=g,a.analyticsDrilldown=null,g==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await p(a.analyticsTab,g),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const x=a.analyticsPeriodFilter,[$,P,D]=await Promise.all([l(a.analyticsTab,g,x),y(g,x),y(g,f(x))]);a.analyticsPeriodRows=$,a.analyticsPeriodChartData=P,a.analyticsPrevYearChartData=D}L()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async o=>{const{fetchAnalyticsByPeriod:l,fetchPeriodChartData:p,prevYearFilter:y}=await I(async()=>{const{fetchAnalyticsByPeriod:x,fetchPeriodChartData:$,prevYearFilter:P}=await Promise.resolve().then(()=>j);return{fetchAnalyticsByPeriod:x,fetchPeriodChartData:$,prevYearFilter:P}},void 0);a.analyticsPeriodFilter=o.target.value,a.analyticsDrilldown=null;const f=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:x}=await I(async()=>{const{fiscalYearToDateRange:M}=await Promise.resolve().then(()=>Gs);return{fiscalYearToDateRange:M}},void 0),$=parseInt(f),P=x($);x($-1);const D=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:T}=await I(async()=>{const{supabaseRpc:M}=await Promise.resolve().then(()=>ne);return{supabaseRpc:M}},void 0),[O,N,R]=await Promise.all([T(D,{p_date_from:P.from,p_date_to:P.to}),p("yearly",f),p("yearly",String($-1))]);a.analyticsPeriodRows=(O??[]).map(M=>({code:String(M.code??""),name:String(M.name??""),amount:Number(M.amount??0),quantity:Number(M.quantity??0),documents:Number(M.documents??0),volumeMl:Number(M.volume_ml??0)})),a.analyticsPeriodChartData=(N??[]).map(M=>({...M})),a.analyticsPrevYearChartData=(R??[]).map(M=>({...M}))}else{const[x,$,P]=await Promise.all([l(a.analyticsTab,a.analyticsPeriod,f),p(a.analyticsPeriod,f),p(a.analyticsPeriod,y(f))]);a.analyticsPeriodRows=x,a.analyticsPeriodChartData=$,a.analyticsPrevYearChartData=P}L()}),e.querySelectorAll("[data-fiscal-mode]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsFiscalMode=o.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:l}=await I(async()=>{const{monthToFiscalYear:y}=await Promise.resolve().then(()=>Gs);return{monthToFiscalYear:y}},void 0),p=new Set;for(const y of a.salesAnalytics.monthlySales)p.add(l(y.month));a.analyticsPeriodOptions=[...p].sort((y,f)=>f-y).map(String)}else{const{fetchAvailablePeriods:l}=await I(async()=>{const{fetchAvailablePeriods:p}=await Promise.resolve().then(()=>j);return{fetchAvailablePeriods:p}},void 0);a.analyticsPeriodOptions=await l(a.analyticsTab,"yearly")}L()})}),e.querySelectorAll("[data-chart-metric]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsChartMetric=o.dataset.chartMetric,L()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.analyticsDrilldown??"",p=o.dataset.drilldownName??l,y=a.analyticsTab,{fetchCustomerProductBreakdown:f,fetchProductCustomerBreakdown:g,fetchEntityMonthlySales:x,periodToDateRange:$}=await I(async()=>{const{fetchCustomerProductBreakdown:O,fetchProductCustomerBreakdown:N,fetchEntityMonthlySales:R,periodToDateRange:M}=await Promise.resolve().then(()=>j);return{fetchCustomerProductBreakdown:O,fetchProductCustomerBreakdown:N,fetchEntityMonthlySales:R,periodToDateRange:M}},void 0),P=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?$(a.analyticsPeriod,a.analyticsPeriodFilter):null,[D,T]=await Promise.all([x(l,y==="customers"?"customer":"product"),y==="customers"?f(l,P?.from,P?.to):g(l,P?.from,P?.to)]);a.analyticsDrilldown={tab:y,code:l,name:p,monthlySales:D,breakdownRows:T},L()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,L()}),e.querySelector("#staff-filter-input")?.addEventListener("input",o=>{a.analyticsStaffFilter=o.target.value,L()}),e.querySelectorAll("[data-staff-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.staffDrilldown??"",p=o.dataset.staffName??"",{fetchStaffCustomerBreakdown:y,fetchStaffProductBreakdown:f,periodToDateRange:g}=await I(async()=>{const{fetchStaffCustomerBreakdown:T,fetchStaffProductBreakdown:O,periodToDateRange:N}=await Promise.resolve().then(()=>j);return{fetchStaffCustomerBreakdown:T,fetchStaffProductBreakdown:O,periodToDateRange:N}},void 0),x=g(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),$=a.analyticsStaffDrilldown?.breakdownTab??"customers",[P,D]=await Promise.all([y(l,x?.from,x?.to),f(l,x?.from,x?.to)]);a.analyticsStaffDrilldown={code:l,name:p,breakdownTab:$,customerRows:P,productRows:D},L()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:o.dataset.staffBreakdownTab},L())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,L()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",o=>{a.analyticsTagFilter=o.target.value,L()}),e.querySelectorAll("[data-staff-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAvailablePeriods:l,fetchStaffTotalsByPeriod:p,periodToDateRange:y}=await I(async()=>{const{fetchAvailablePeriods:g,fetchStaffTotalsByPeriod:x,periodToDateRange:$}=await Promise.resolve().then(()=>j);return{fetchAvailablePeriods:g,fetchStaffTotalsByPeriod:x,periodToDateRange:$}},void 0),f=o.dataset.staffPeriod;if(a.analyticsStaffPeriod=f,a.analyticsStaffDrilldown=null,f==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await l("staff",f),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const g=y(f,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await p(g?.from,g?.to)}L()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async o=>{const{fetchStaffTotalsByPeriod:l,periodToDateRange:p}=await I(async()=>{const{fetchStaffTotalsByPeriod:f,periodToDateRange:g}=await Promise.resolve().then(()=>j);return{fetchStaffTotalsByPeriod:f,periodToDateRange:g}},void 0);a.analyticsStaffPeriodFilter=o.target.value;const y=p(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await l(y?.from,y?.to),a.analyticsStaffDrilldown=null,L()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Xe(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},L()}),e.querySelectorAll("[data-action='remove-line']").forEach(o=>{o.addEventListener("click",()=>{Xe(e);const l=parseInt(o.dataset.line??"0",10);a.invoiceForm.lines.splice(l,1),a.invoiceErrors=pi(a.invoiceForm),L()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(o=>{o.addEventListener("click",()=>{Xe(e),mh(parseInt(o.dataset.line??"0",10)),a.invoiceErrors={},L()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{yh(),L()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Xe(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,L()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(o=>{o.addEventListener("click",()=>{Xe(e);const l=parseInt(o.dataset.line??"0",10),p=a.invoiceForm.lines[l];a.pickerMode="product",a.pickerTargetLine=l,a.pickerQuery=p?p.productCode||p.productName:"",L()})}),e.querySelectorAll("[data-action='modal-close']").forEach(o=>{o.addEventListener("click",l=>{o.classList.contains("modal-backdrop")&&l.target instanceof HTMLElement&&!l.target.classList.contains("modal-backdrop")||(Za(),L())})}),e.querySelectorAll("[data-action='picker-select']").forEach(o=>{const l=async()=>{const p=o.dataset.code??"",y=o.dataset.name??"";if(a.pickerMode==="customer"){const f=a.masterStats?.customers.find(g=>g.code===p);Ft({code:p,name:y,priceGroup:f?.priceGroup,staffCode:f?.staffCode}),delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&p&&(a.invoicePriceGroup=await ja(p))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const f=a.invoiceForm.lines[a.pickerTargetLine];if(f){f.productCode=p,f.productName=y;const g=await Mn(a.invoicePriceGroup,p);g>0&&(f.unitPrice=g),f.amount=f.quantity*f.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}Za(),L()};o.addEventListener("click",l),o.addEventListener("keydown",p=>{p.key==="Enter"&&l()})}),e.querySelector("#modal-search")?.addEventListener("input",o=>{a.pickerQuery=o.target.value,L()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{di(),L()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{ui(e)}),e.querySelectorAll("[data-action='select-freq-customer']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.code??"",p=o.dataset.name??"",y=a.masterStats?.customers.find(f=>f.code===l);Ft({code:l,name:p,priceGroup:y?.priceGroup,staffCode:y?.staffCode}),!a.invoicePriceGroup&&l&&(a.invoicePriceGroup=await ja(l)),delete a.invoiceErrors.customerCode,L()})}),e.querySelectorAll("[data-action='select-freq-product']").forEach(o=>{o.addEventListener("click",async()=>{Xe(e);const l=o.dataset.code??"",p=o.dataset.name??"";let y=a.invoiceForm.lines.findIndex(x=>!x.productCode);y<0&&(a.invoiceForm.lines.push({productCode:"",productName:"",quantity:1,unitPrice:0,unit:"本",amount:0}),y=a.invoiceForm.lines.length-1);const f=a.invoiceForm.lines[y];f.productCode=l,f.productName=p;const g=await Mn(a.invoicePriceGroup,l);g>0&&(f.unitPrice=g),f.amount=f.quantity*f.unitPrice,L()})}),e.querySelector("[data-action='open-new-staff']")?.addEventListener("click",async()=>{const o=prompt("新規担当者の名前を入力してください:");if(!o?.trim())return;const l=`S${String(Date.now()).slice(-4)}`,{createStaff:p}=await I(async()=>{const{createStaff:f}=await Promise.resolve().then(()=>j);return{createStaff:f}},void 0),y=await p(l,o.trim());y?(a.staffList.push(y),a.invoiceForm.registeredBy=y.code,F(`担当者「${y.name}」を登録しました`,"success"),L()):F("担当者の登録に失敗しました","error")}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Xe(e),hh(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await ja(a.invoiceForm.customerCode)),L())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Xe(e),fh(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,L())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(o=>{o.addEventListener("input",()=>{Xe(e),a.invoiceSavedDocNo=null;const l=o.dataset.field;(l==="quantity"||l==="unitPrice")&&L()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Xe(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const o=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=o.trim(),a.deliveryNote=null,a.actionLoading=!0,L(),!a.deliverySearchDocNo){F("伝票番号を入力してください","error"),a.actionLoading=!1,L();return}as(a.deliverySearchDocNo).then(l=>{a.deliveryNote=l,a.actionLoading=!1,L()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const o=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=o,a.billingSummary=null,a.actionLoading=!0,L(),ns(o).then(l=>{a.billingSummary=l,a.actionLoading=!1,L()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const o=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),l=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=o,a.taxMonth=l,a.taxDeclaration=null,a.taxVolume=null,a.actionLoading=!0,L(),Promise.all([rs(o,l),is(o,l)]).then(([p,y])=>{a.taxDeclaration=p,a.taxVolume=y,a.actionLoading=!1,L()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:o}=await I(async()=>{const{generateTaxXML:g}=await Promise.resolve().then(()=>j);return{generateTaxXML:g}},void 0),l=o(a.taxDeclaration),p=new Blob([l],{type:"application/xml;charset=utf-8"}),y=URL.createObjectURL(p),f=document.createElement("a");f.href=y,f.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,f.click(),URL.revokeObjectURL(y)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:o}=await I(async()=>{const{generateTaxCSV:g}=await Promise.resolve().then(()=>j);return{generateTaxCSV:g}},void 0),l=o(a.taxDeclaration),p=new Blob([l],{type:"text/csv;charset=utf-8"}),y=URL.createObjectURL(p),f=document.createElement("a");f.href=y,f.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,f.click(),URL.revokeObjectURL(y)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:o}=await I(async()=>{const{saveTaxDeclaration:l}=await Promise.resolve().then(()=>j);return{saveTaxDeclaration:l}},void 0);try{await o(a.taxDeclaration),F("下書き保存しました")}catch(l){F("保存に失敗: "+(l instanceof Error?l.message:String(l)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(o=>{o.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.taxRow),p=o.dataset.taxField,y=o.type==="number"?Number(o.value)||0:o.value,f=[...a.taxDeclaration.rows];f[l]={...f[l],[p]:y};const{recalculateTaxDeclaration:g}=await I(async()=>{const{recalculateTaxDeclaration:x}=await Promise.resolve().then(()=>j);return{recalculateTaxDeclaration:x}},void 0);a.taxDeclaration=g({...a.taxDeclaration,rows:f}),L()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.dedRow),p=o.dataset.dedField,y=o.type==="number"?Number(o.value)||0:o.value,f=[...a.taxDeclaration.deductions];f[l]={...f[l],[p]:y},a.taxDeclaration={...a.taxDeclaration,deductions:f},L()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=o.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[l]:o.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:o,TAX_RATE_CATEGORIES:l}=await I(async()=>{const{recalculateTaxDeclaration:f,TAX_RATE_CATEGORIES:g}=await Promise.resolve().then(()=>j);return{recalculateTaxDeclaration:f,TAX_RATE_CATEGORIES:g}},void 0),p=l[0],y={taxCategory:p.code,taxCategoryName:p.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:p.taxRatePerLiter,taxAmount:0};a.taxDeclaration=o({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,y]}),L()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(o=>{o.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.taxRow),{recalculateTaxDeclaration:p}=await I(async()=>{const{recalculateTaxDeclaration:f}=await Promise.resolve().then(()=>j);return{recalculateTaxDeclaration:f}},void 0),y=a.taxDeclaration.rows.filter((f,g)=>g!==l);a.taxDeclaration=p({...a.taxDeclaration,rows:y}),L()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const o={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,o]},L()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(o=>{o.addEventListener("click",()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.dedRow),p=a.taxDeclaration.deductions.filter((y,f)=>f!==l);a.taxDeclaration={...a.taxDeclaration,deductions:p},L()})}),e.querySelectorAll("[data-store-tab]").forEach(o=>{o.addEventListener("click",()=>{a.storeTab=o.dataset.storeTab,L()})}),e.querySelectorAll("[data-import-entity]").forEach(o=>{o.addEventListener("click",()=>{a.importEntity=o.dataset.importEntity,a.importPreview=null,a.importResult=null,L()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const o=Gr(a.importEntity),l=new Blob([o],{type:"text/csv;charset=utf-8"}),p=URL.createObjectURL(l),y=document.createElement("a");y.href=p,y.download=`template_${a.importEntity}.csv`,y.click(),URL.revokeObjectURL(p)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const l=e.querySelector("#import-file")?.files?.[0];if(!l){F("CSVファイルを選択してください","warning");return}const p=new FileReader;p.onload=()=>{const y=String(p.result??""),{columns:f,rows:g}=Kr(y);a.importPreview=Wr(a.importEntity,f,g),a.importResult=null,L()},p.readAsText(l,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,L()}),e.querySelectorAll("[data-print-template]").forEach(o=>{o.addEventListener("click",()=>{a.printTemplate=o.dataset.printTemplate,L()})}),e.querySelectorAll("[data-print-field]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.printField;let p=o.value;(l==="taxRate"||l==="previousBalance"||l==="paymentAmount")&&(p=Number(o.value)||0),a.printData={...a.printData,[l]:p},L()})}),e.querySelectorAll("[data-print-opt]").forEach(o=>{const l=()=>{const p=o.dataset.printOpt;let y;o.type==="checkbox"?y=o.checked:p==="copies"?y=Number(o.value)||1:p==="overlayOpacity"||p==="calibrationOffsetX"||p==="calibrationOffsetY"?y=Number(o.value)||0:y=o.value,a.printOptions={...a.printOptions,[p]:y},L()};o.addEventListener("change",l),o.type==="range"&&o.addEventListener("input",l)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(o=>{o.addEventListener("change",()=>{const l=Number(o.dataset.printLine),p=o.dataset.printLfield,y=[...a.printData.lines];let f=o.value;(p==="quantity"||p==="unitPrice")&&(f=Number(o.value)||0),y[l]={...y[l],[p]:f},y[l].amount=(Number(y[l].quantity)||0)*(Number(y[l].unitPrice)||0),a.printData={...a.printData,lines:y},L()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},L()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((p,y)=>y!==l)},L()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),F("印刷設定を保存しました")}catch(o){F("保存失敗: "+(o instanceof Error?o.message:String(o)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const o=a.printCompany,l=prompt("会社名",o.name);if(l===null)return;const p=prompt("郵便番号",o.postalCode)??o.postalCode,y=prompt("住所",o.address1)??o.address1,f=prompt("TEL",o.tel)??o.tel,g=prompt("FAX",o.fax)??o.fax,x=prompt("適格請求書登録番号 (T+13桁)",o.registrationNo)??o.registrationNo,$=prompt("取引銀行名",o.bankName)??o.bankName,P=prompt("支店名",o.bankBranch)??o.bankBranch,D=prompt("口座番号",o.bankAccountNo)??o.bankAccountNo,T=prompt("口座名義",o.bankAccountHolder)??o.bankAccountHolder;a.printCompany={...o,name:l,postalCode:p,address1:y,tel:f,fax:g,registrationNo:x,bankName:$,bankBranch:P,bankAccountNo:D,bankAccountHolder:T},L()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,L()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const p=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",y=hn(o),{savePrintLayout:f}=await I(async()=>{const{savePrintLayout:x}=await Promise.resolve().then(()=>j);return{savePrintLayout:x}},void 0),g={id:`bp1701_${p.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:p,templateKey:"chain_store",positions:y};try{await f(g)?(F(`クラウド保存成功: ${p}`),a.fdSavedPositions=y,localStorage.setItem("sake_fd_positions",JSON.stringify(y)),L()):(F("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(y)))}catch(x){F("保存エラー: "+(x instanceof Error?x.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const l=hn(o);a.fdSavedPositions=l;try{localStorage.setItem("sake_fd_positions",JSON.stringify(l)),F(`ローカル保存完了: ${Object.keys(l).length}件`)}catch(p){F("保存失敗: "+(p instanceof Error?p.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const p={templateKey:"chain_store",positions:hn(o),exportedAt:new Date().toISOString()},y=new Blob([JSON.stringify(p,null,2)],{type:"application/json"}),f=URL.createObjectURL(y),g=document.createElement("a");g.href=f,g.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,g.click(),URL.revokeObjectURL(f)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async o=>{const l=o.target.files?.[0];if(l)try{const p=await l.text(),f=JSON.parse(p).positions;if(!f)throw new Error("positions field not found");a.fdSavedPositions=f,localStorage.setItem("sake_fd_positions",JSON.stringify(f)),F(`インポート成功: ${Object.keys(f).length}件`),L()}catch(p){F("インポート失敗: "+(p instanceof Error?p.message:""),"error")}});const k=e.querySelector("#fd-saved-layouts");k&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:o}=await I(async()=>{const{fetchPrintLayouts:p}=await Promise.resolve().then(()=>j);return{fetchPrintLayouts:p}},void 0),l=await o("chain_store");l.length===0?k.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(k.innerHTML=`☁️ クラウド保存済み (${l.length}件):<br/>`+l.map(p=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${p.id}" style="margin:4px 4px 0 0;">${p.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${p.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),k.querySelectorAll("[data-action='fd-load-layout']").forEach(p=>{p.addEventListener("click",()=>{const y=p.dataset.layoutId,f=l.find(g=>g.id===y);f&&(a.fdSavedPositions=f.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(f.positions)),F(`読込完了: ${f.name}`),L())})}),k.querySelectorAll("[data-action='fd-delete-layout']").forEach(p=>{p.addEventListener("click",async()=>{const y=p.dataset.layoutId;if(!y||!await je("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:f}=await I(async()=>{const{deletePrintLayout:x}=await Promise.resolve().then(()=>j);return{deletePrintLayout:x}},void 0);await f(y)?(F("削除しました"),L()):F("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await je("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),L())});const C=e.querySelector("#fd-sel-x"),S=e.querySelector("#fd-sel-y");if([C,S].forEach(o=>{o?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const l=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);l&&(C&&(l.style.left=C.value+"mm"),S&&(l.style.top=S.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(o=>{o.addEventListener("dragstart",l=>{o.classList.add("wf-dragging"),l.dataTransfer?.setData("text/plain",o.dataset.wfOrder??"")}),o.addEventListener("dragend",()=>o.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(o=>{o.addEventListener("dragover",l=>l.preventDefault()),o.addEventListener("drop",l=>{l.preventDefault();const p=l.dataTransfer?.getData("text/plain"),y=o.dataset.wfStage;if(!p||!y)return;const f=a.workflowOrders.find(g=>g.id===p);f&&(f.stage=y,L())})}),e.querySelectorAll("[data-mo-step]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moStep;o.disabled||(a.mobileOrder.step=l,L())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",o=>{a.mobileOrder.customerQuery=o.target.value,L()}),e.querySelector("#mo-product-q")?.addEventListener("input",o=>{a.mobileOrder.productQuery=o.target.value,L()}),e.querySelectorAll("[data-mo-select-customer]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moSelectCustomer,p=a.masterStats?.customers.find(y=>y.id===l);p&&(a.mobileOrder.selectedCustomer=p),L()})}),e.querySelectorAll("[data-mo-add-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moAddProduct,p=a.masterStats?.products.find(f=>f.code===l);if(!p)return;const y=1800;a.mobileOrder.cart.push({productCode:p.code,productName:p.name,quantity:1,unit:"本",unitPrice:y,amount:y}),L()})}),e.querySelectorAll("[data-mo-qty]").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.moQty),p=o.dataset.moProduct,y=a.mobileOrder.cart.find(f=>f.productCode===p);y&&(y.quantity=Math.max(0,y.quantity+l),y.amount=y.quantity*y.unitPrice,y.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(f=>f.productCode!==p)),L())})}),e.querySelectorAll("[data-mo-remove]").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.moRemove);a.mobileOrder.cart.splice(l,1),L()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const o=e.querySelector("#mo-memo");a.mobileOrder.memo=o?.value??"";const l="MO"+Date.now().toString().slice(-8),p=e.querySelector("[data-action='mo-submit']");p&&(p.disabled=!0,p.textContent="送信中…");const y=a.mobileOrder.cart.reduce((f,g)=>f+g.amount,0);try{const{saveStoreOrder:f}=await I(async()=>{const{saveStoreOrder:g}=await Promise.resolve().then(()=>j);return{saveStoreOrder:g}},void 0);await f(l,a.mobileOrder.selectedCustomer?.name??"不明",a.mobileOrder.selectedCustomer?.code??null,y,a.mobileOrder.memo,a.mobileOrder.cart)}catch(f){console.error("受注保存失敗:",f),F("送信に失敗しました","error"),p&&(p.disabled=!1,p.textContent="受注を送信");return}a.mobileOrder.submittedDocNo=l,a.mobileOrder.step="done",L()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},L()}),e.querySelectorAll("[data-tour-id]").forEach(o=>{o.addEventListener("click",()=>{a.tourActiveId=o.dataset.tourId??null,L()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(o=>{o.addEventListener("click",()=>{const l=a.tourInquiries.find(x=>x.id===a.tourActiveId);if(!l)return;const p=o.dataset.template==="confirm"?Vu:Yu,y=e.querySelector("#tour-confirmed-time"),f=p.replaceAll("{name}",l.name).replaceAll("{partySize}",String(l.partySize)).replaceAll("{confirmedTime}",y?.value??l.visitDate),g=e.querySelector("#tour-reply-body");g&&(g.value=f)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const o=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",l=a.tourInquiries.find(y=>y.id===o);if(!l)return;const p=e.querySelector("#tour-confirmed-time");l.status="confirmed",l.repliedAt=new Date().toISOString(),l.confirmedTime=p?.value??"",F("返信メールを下書き保存し、ステータスを確定にしました"),L()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const o=e.querySelector("#lb-type")?.value??"",l=e.querySelector("#lb-area")?.value??"",p=e.querySelector("#lb-keyword")?.value??"";if(!o&&!p){F("業種かキーワードを入力してください","warning");return}a.leadSearchType=o,a.leadSearchArea=l,a.leadSearchQuery=p,a.leadSearching=!0,L();const y=a.integrations.find($=>$.provider==="google_maps");if(!y||!y.config.api_key){F("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,L();return}const{searchPlaces:f}=await I(async()=>{const{searchPlaces:$}=await Promise.resolve().then(()=>j);return{searchPlaces:$}},void 0),g=[o,p].filter(Boolean).join(" "),x=await f(y,g,l);a.leadSearching=!1,x.error?F("検索失敗: "+x.error,"error"):a.leadSearchResults=x.results,L()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],L()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const o=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!o)return;const l=`ll_${Date.now()}`,p={id:l,name:o,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:y,saveLeadItem:f,fetchLeadLists:g,fetchLeadItems:x}=await I(async()=>{const{saveLeadList:D,saveLeadItem:T,fetchLeadLists:O,fetchLeadItems:N}=await Promise.resolve().then(()=>j);return{saveLeadList:D,saveLeadItem:T,fetchLeadLists:O,fetchLeadItems:N}},void 0);await y(p);const $=e.querySelectorAll(".lb-search-check:checked"),P=Array.from($).map(D=>Number(D.dataset.idx));for(const D of P){const T=a.leadSearchResults[D];T&&await f({...T,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:l,businessType:a.leadSearchType})}a.leadLists=await g(),a.leadActiveListId=l,a.leadItems=await x(l),a.leadSearchResults=[],F(`${P.length}件を「${o}」として保存しました`),L()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??null;if(a.leadActiveListId=l,l){const{fetchLeadItems:p}=await I(async()=>{const{fetchLeadItems:y}=await Promise.resolve().then(()=>j);return{fetchLeadItems:y}},void 0);a.leadItems=await p(l)}L()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",p=a.leadItems.find(g=>g.id===l);if(!p)return;const{saveLeadItem:y,fetchLeadItems:f}=await I(async()=>{const{saveLeadItem:g,fetchLeadItems:x}=await Promise.resolve().then(()=>j);return{saveLeadItem:g,fetchLeadItems:x}},void 0);await y({...p,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await f(a.leadActiveListId)),L()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",p=a.leadItems.find(x=>x.id===l);if(!p)return;const{convertLeadToProspect:y,fetchLeadItems:f}=await I(async()=>{const{convertLeadToProspect:x,fetchLeadItems:$}=await Promise.resolve().then(()=>j);return{convertLeadToProspect:x,fetchLeadItems:$}},void 0);await y(p)&&(F("見込客に追加しました: "+p.companyName),a.leadActiveListId&&(a.leadItems=await f(a.leadActiveListId)),L())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const o=e.querySelectorAll(".lb-item-check:checked");if(o.length===0&&!await je("全ての新規アイテムを見込客に変換しますか？"))return;const l=o.length>0?Array.from(o).map(g=>g.dataset.id):a.leadItems.filter(g=>g.status==="new").map(g=>g.id),{convertLeadToProspect:p,fetchLeadItems:y}=await I(async()=>{const{convertLeadToProspect:g,fetchLeadItems:x}=await Promise.resolve().then(()=>j);return{convertLeadToProspect:g,fetchLeadItems:x}},void 0);let f=0;for(const g of l){const x=a.leadItems.find($=>$.id===g);x&&x.status==="new"&&await p(x)&&f++}F(`${f}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await y(a.leadActiveListId)),L()}),e.querySelectorAll("[data-analysis-tab]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.analysisTab;a.analysisTab!==l&&(a.analysisTab=l,L())})}),e.querySelector("#analysis-period-year")?.addEventListener("change",async o=>{const l=o.target.value,p=e.querySelector("#analysis-period-month")?.value??"";a.analysisPeriod=l&&p?`${l}-${p}`:l,a.customerAnalysis=null,a.productABC=null,await ga("/customer-analysis"),L()}),e.querySelector("#analysis-period-month")?.addEventListener("change",async o=>{const l=o.target.value,p=e.querySelector("#analysis-period-year")?.value??"";a.analysisPeriod=p&&l?`${p}-${l}`:p,a.customerAnalysis=null,a.productABC=null,await ga("/customer-analysis"),L()}),e.querySelector("#customer-map")){const o=()=>{window.google?.maps?Ch(e):setTimeout(o,200)};o()}e.querySelectorAll(".churn-reason-select").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.churnCode??"",p=o.value;try{const{saveChurnNote:y}=await I(async()=>{const{saveChurnNote:x}=await Promise.resolve().then(()=>j);return{saveChurnNote:x}},void 0);await y({customerCode:l,reason:p,memo:"",actionedAt:null});const f=a.churnNotes.find(x=>x.customerCode===l);f?f.reason=p:a.churnNotes.push({customerCode:l,reason:p,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const g=o.closest("tr");if(g){const x=g.querySelector("td:nth-child(2)");if(x){let $=x.querySelector(".reason-badge");!$&&p&&($=document.createElement("span"),$.className="status-pill info reason-badge",$.style.fontSize="0.72rem",x.appendChild($)),$&&($.textContent=p?nh[p]??"":"")}}F("理由を保存しました")}catch(y){F("保存に失敗しました","error"),console.error(y)}})}),e.querySelectorAll(".churn-actioned-check").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.churnCode??"",p=o.checked,y=o.closest("tr");y&&(y.style.opacity=p?"0.45":"",y.setAttribute("data-actioned",p?"1":"0"));try{const{saveChurnNote:f}=await I(async()=>{const{saveChurnNote:P}=await Promise.resolve().then(()=>j);return{saveChurnNote:P}},void 0),g=a.churnNotes.find(P=>P.customerCode===l),x=g?.reason??"",$=new Date().toISOString().slice(0,10);await f({customerCode:l,reason:x,memo:"",actionedAt:p?$:null}),g?g.actionedAt=p?$:null:a.churnNotes.push({customerCode:l,reason:x,memo:"",actionedAt:p?$:null,updatedAt:new Date().toISOString()}),F(p?"対応済みにしました":"対応済みを解除しました")}catch(f){F("保存に失敗しました","error"),console.error(f)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const o=a.integrations.find(f=>f.provider==="ivry");if(!o||!o.isEnabled){F("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:l,fetchCallLogs:p}=await I(async()=>{const{syncIvryCallLogs:f,fetchCallLogs:g}=await Promise.resolve().then(()=>j);return{syncIvryCallLogs:f,fetchCallLogs:g}},void 0),y=await l(o);y.error?F("同期失敗: "+y.error,"error"):(F(`${y.count}件の通話履歴を同期しました`),a.callLogs=await p(100),L())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const o=a.integrations.find(f=>f.provider==="ivry");if(!o||!o.isEnabled){F("IVRy連携が無効です","warning");return}if(!await je("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:l}=await I(async()=>{const{syncPhoneBookToIvry:f}=await Promise.resolve().then(()=>j);return{syncPhoneBookToIvry:f}},void 0),p=[];a.masterStats?.customers.forEach(f=>{p.push({name:f.name,phone:"",customerCode:f.code,note:"既存取引先"})}),a.prospects.forEach(f=>{f.phone&&p.push({name:f.companyName,phone:f.phone,customerCode:f.id,note:`見込客 (${f.stage})`})});const y=await l(o,p);y.error?F("送信失敗: "+y.error,"error"):F(`${y.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",p=o.dataset.phone??"",y=prompt(`電話番号 ${p} を顧客コードに紐付け
顧客コードを入力:`);if(!y)return;const f=a.callLogs.find($=>$.id===l);if(!f)return;const{saveCallLog:g,fetchCallLogs:x}=await I(async()=>{const{saveCallLog:$,fetchCallLogs:P}=await Promise.resolve().then(()=>j);return{saveCallLog:$,fetchCallLogs:P}},void 0);await g({...f,matchedCustomerCode:y}),a.callLogs=await x(100),L()})}),e.querySelectorAll("[data-action='call-memo']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",p=a.callLogs.find(x=>x.id===l);if(!p)return;const y=prompt("メモを入力:",p.notes??"");if(y===null)return;const{saveCallLog:f,fetchCallLogs:g}=await I(async()=>{const{saveCallLog:x,fetchCallLogs:$}=await Promise.resolve().then(()=>j);return{saveCallLog:x,fetchCallLogs:$}},void 0);await f({...p,notes:y}),a.callLogs=await g(100),L()})}),e.querySelectorAll("[data-prospect-view]").forEach(o=>{o.addEventListener("click",()=>{a.prospectViewMode=o.dataset.prospectView,L()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",L()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:p}=await I(async()=>{const{fetchProspectActivities:y}=await Promise.resolve().then(()=>j);return{fetchProspectActivities:y}},void 0);a.prospectActivities=await p(l)}L()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.prospectId??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:p}=await I(async()=>{const{fetchProspectActivities:y}=await Promise.resolve().then(()=>j);return{fetchProspectActivities:y}},void 0);a.prospectActivities=await p(l)}L()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],L())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const o=a.prospectEditingId==="__new__",l=o?`p_${Date.now()}`:a.prospectEditingId??"",p={id:l,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!p.companyName){F("会社名は必須です","warning");return}const{saveProspect:y,fetchProspects:f,recordAudit:g,sendSlackNotification:x}=await I(async()=>{const{saveProspect:P,fetchProspects:D,recordAudit:T,sendSlackNotification:O}=await Promise.resolve().then(()=>j);return{saveProspect:P,fetchProspects:D,recordAudit:T,sendSlackNotification:O}},void 0);await y(p)?(o&&await x("new_prospect",`新規見込客: ${p.companyName} / 想定 ¥${p.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await g({action:o?"prospect_create":"prospect_update",entityType:"prospect",entityId:l,userEmail:a.user?.email}),a.prospects=await f(),a.prospectEditingId=null,L()):F("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await je("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteProspect:p,fetchProspects:y}=await I(async()=>{const{deleteProspect:f,fetchProspects:g}=await Promise.resolve().then(()=>j);return{deleteProspect:f,fetchProspects:g}},void 0);await p(l)&&(a.prospects=await y(),L())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const p=o.dataset.id??"",y=o.dataset.name??"",f=o.dataset.addr??"";a.quoteState=Ga(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=y,a.quoteState.customerAddress=f,a.quoteState.isProspect=!0,a.quoteState.prospectId=p,a.quotePricing=null,a.quoteEditId="new",kt("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",l=e.querySelector("#prospect-activity-type")?.value??"call",p=e.querySelector("#prospect-activity-title")?.value??"";if(!p){F("内容を入力してください","warning");return}const{saveProspectActivity:y,fetchProspectActivities:f}=await I(async()=>{const{saveProspectActivity:g,fetchProspectActivities:x}=await Promise.resolve().then(()=>j);return{saveProspectActivity:g,fetchProspectActivities:x}},void 0);await y({id:`act_${Date.now()}`,prospectId:o,activityType:l,title:p,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await f(o),L()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("dragstart",l=>{l.dataTransfer?.setData("text/plain",o.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(o=>{o.addEventListener("dragover",l=>l.preventDefault()),o.addEventListener("drop",async l=>{l.preventDefault();const p=l.dataTransfer?.getData("text/plain"),y=o.dataset.prospectStage;if(!p)return;const f=a.prospects.find(g=>g.id===p);if(f&&f.stage!==y){const g={...f,stage:y},{saveProspect:x}=await I(async()=>{const{saveProspect:$}=await Promise.resolve().then(()=>j);return{saveProspect:$}},void 0);await x(g),f.stage=y,L()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:o,saveIntegrationSetting:l}=await I(async()=>{const{fetchIntegrationSettings:$,saveIntegrationSetting:P}=await Promise.resolve().then(()=>j);return{fetchIntegrationSettings:$,saveIntegrationSetting:P}},void 0),y=(a.integrations.length>0?a.integrations:await o()).find($=>$.provider==="slack");if(!y)return;const f=e.querySelector("#slack-webhook")?.value??"",g=e.querySelector("#slack-default-channel")?.value??"",x=e.querySelector("#slack-enabled")?.checked??!1;await l({...y,config:{...y.config,webhook_url:f,default_channel:g},isEnabled:x}),a.integrations=await o(),F("保存しました"),L()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:o,fetchSlackRules:l}=await I(async()=>{const{saveSlackRule:p,fetchSlackRules:y}=await Promise.resolve().then(()=>j);return{saveSlackRule:p,fetchSlackRules:y}},void 0);for(const p of a.slackRules){const y=e.querySelector(`[data-slack-rule-id="${p.id}"][data-slack-field="enabled"]`)?.checked??p.enabled,f=e.querySelector(`[data-slack-rule-id="${p.id}"][data-slack-field="channel"]`)?.value??p.channel;await o({...p,enabled:y,channel:f})}a.slackRules=await l(),F("ルールを保存しました"),L()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:o}=await I(async()=>{const{sendSlackNotification:p}=await Promise.resolve().then(()=>j);return{sendSlackNotification:p}},void 0),l=await o("new_order","🧪 これはテスト通知です (syusen-cloud)");l.ok?F("テスト送信成功"):F("送信失敗: "+(l.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,L()}),e.querySelectorAll("[data-action='material-adjust']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id??"",p=a.materialList.find(y=>y.id===l);p&&(a.materialEditing=p,a.materialEditingIsNew=!1,L())})}),e.querySelectorAll("[data-action='material-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,L())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const l={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(l.materialType=e.querySelector("#mat-type")?.value??"",!l.code||!l.name){F("コードと品名は必須です","warning");return}const{saveMaterial:p,fetchMaterialList:y}=await I(async()=>{const{saveMaterial:g,fetchMaterialList:x}=await Promise.resolve().then(()=>j);return{saveMaterial:g,fetchMaterialList:x}},void 0);await p(l)?(a.materialList=await y(),a.materialEditing=null,a.materialEditingIsNew=!1,F("保存しました"),L()):F("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!o||!await je("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:l,fetchMaterialList:p}=await I(async()=>{const{deleteMaterial:y,fetchMaterialList:f}=await Promise.resolve().then(()=>j);return{deleteMaterial:y,fetchMaterialList:f}},void 0);await l(o)&&(a.materialList=await p(),a.materialEditing=null,L())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",L()}),e.querySelectorAll("[data-action='user-edit']").forEach(o=>{o.addEventListener("click",()=>{a.userEditingId=o.dataset.id??null,L()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,L()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const o=a.userEditingId==="__new__",l=o?crypto.randomUUID():a.userEditingId??"",p=e.querySelector("#user-email")?.value.trim()??"",y=e.querySelector("#user-name")?.value.trim()??"";if(!p||!y){F("名前とメールアドレスは必須です","warning");return}const f={id:l,email:p,displayName:y,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(o){const D=e.querySelector("#user-password")?.value??"";if(D.length<8){F("パスワードは8文字以上必要です","warning");return}try{await Ps(p,D)}catch(T){F("Auth登録失敗: "+(T instanceof Error?T.message:""),"error");return}}const{saveUserProfile:g,fetchUserProfiles:x,recordAudit:$}=await I(async()=>{const{saveUserProfile:D,fetchUserProfiles:T,recordAudit:O}=await Promise.resolve().then(()=>j);return{saveUserProfile:D,fetchUserProfiles:T,recordAudit:O}},void 0);await g(f)?(await $({action:o?"user_create":"user_update",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await x(),a.userEditingId=null,F("保存しました"),L()):F("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await je("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteUserProfile:p,fetchUserProfiles:y,recordAudit:f}=await I(async()=>{const{deleteUserProfile:x,fetchUserProfiles:$,recordAudit:P}=await Promise.resolve().then(()=>j);return{deleteUserProfile:x,fetchUserProfiles:$,recordAudit:P}},void 0);await p(l)?(await f({action:"user_delete",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await y(),L()):F("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const o=e.querySelector("#profile-sender")?.value??"",l={...a.myProfile,defaultMailSenderId:o},{saveUserProfile:p}=await I(async()=>{const{saveUserProfile:y}=await Promise.resolve().then(()=>j);return{saveUserProfile:y}},void 0);await p(l),a.myProfile=l,F("保存しました"),L()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const o=e.querySelector("#profile-new-password")?.value??"";if(o.length<8){F("8文字以上のパスワードを入力してください","warning");return}try{await Pi(o),F("パスワードを変更しました")}catch(l){F("変更失敗: "+(l instanceof Error?l.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(o=>{o.addEventListener("click",()=>{a.integrationEditingId=o.dataset.id??null,L()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,L()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='int-save']")?.dataset.id??"",l=a.integrations.find($=>$.id===o);if(!l)return;const p={...l.config};Object.keys(p).forEach($=>{const P=e.querySelector(`#int-${$}`);P&&(p[$]=P.value)});const y=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:f,fetchIntegrationSettings:g}=await I(async()=>{const{saveIntegrationSetting:$,fetchIntegrationSettings:P}=await Promise.resolve().then(()=>j);return{saveIntegrationSetting:$,fetchIntegrationSettings:P}},void 0);await f({...l,config:p,isEnabled:y})?(a.integrations=await g(),a.integrationEditingId=null,F("保存しました"),L()):F("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(o=>{o.addEventListener("click",async()=>{const l=a.integrations.find(g=>g.provider==="shopify");if(!l){F("Shopify連携が未設定です","warning");return}o.textContent="同期中…",o.disabled=!0;const{syncShopifyOrders:p,fetchShopifyOrders:y}=await I(async()=>{const{syncShopifyOrders:g,fetchShopifyOrders:x}=await Promise.resolve().then(()=>j);return{syncShopifyOrders:g,fetchShopifyOrders:x}},void 0),f=await p(l);f.error?F("同期失敗: "+f.error,"error"):(F(`${f.count}件を同期しました`),a.shopifyOrders=await y()),L()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(o=>{o.addEventListener("click",async()=>{const l=a.integrations.find(g=>g.provider==="google_calendar");if(!l)return;o.textContent="同期中…",o.disabled=!0;const{syncGoogleCalendar:p,fetchCalendarEvents:y}=await I(async()=>{const{syncGoogleCalendar:g,fetchCalendarEvents:x}=await Promise.resolve().then(()=>j);return{syncGoogleCalendar:g,fetchCalendarEvents:x}},void 0),f=await p(l);f.error?F("同期失敗: "+f.error,"error"):(F(`${f.count}件を同期しました`),a.calendarEvents=await y(a.calendarYearMonth)),L()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const l=e.querySelector("#fax-file")?.files?.[0];if(!l){F("FAX画像を選択してください","warning");return}const p=a.integrations.find(y=>y.provider==="cloud_vision");if(!p||!p.config.api_key){F("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,L();try{const y=new FileReader;y.onload=async()=>{const f=String(y.result??""),{ocrFaxImage:g,saveFaxRecord:x,fetchFaxInbox:$}=await I(async()=>{const{ocrFaxImage:O,saveFaxRecord:N,fetchFaxInbox:R}=await Promise.resolve().then(()=>j);return{ocrFaxImage:O,saveFaxRecord:N,fetchFaxInbox:R}},void 0),P=await g(p,f),D=e.querySelector("#fax-sender-name")?.value??"",T=e.querySelector("#fax-sender-phone")?.value??"";await x({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:D,senderPhone:T,ocrStatus:P.error?"failed":"done",ocrText:P.text}),a.faxOcrText=P.error?`エラー: ${P.error}`:P.text,a.faxRecords=await $(),a.faxProcessing=!1,L()},y.readAsDataURL(l)}catch(y){F("OCR失敗: "+(y instanceof Error?y.message:""),"error"),a.faxProcessing=!1,L()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",L()}),e.querySelectorAll("[data-action='ms-edit']").forEach(o=>{o.addEventListener("click",()=>{a.mailSenderEditingId=o.dataset.id??null,L()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,L()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,l={id:o,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(g=>g.id===o)?.isVerified??!1};if(!l.name||!l.email){F("名前とメールアドレスは必須です","warning");return}const{saveMailSender:p,fetchMailSenders:y}=await I(async()=>{const{saveMailSender:g,fetchMailSenders:x}=await Promise.resolve().then(()=>j);return{saveMailSender:g,fetchMailSenders:x}},void 0);await p(l)?(a.mailSenders=await y(),a.mailSenderEditingId=null,F("保存しました"),L()):F("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await je("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteMailSender:p,fetchMailSenders:y}=await I(async()=>{const{deleteMailSender:g,fetchMailSenders:x}=await Promise.resolve().then(()=>j);return{deleteMailSender:g,fetchMailSenders:x}},void 0);await p(l)?(a.mailSenders=await y(),L()):F("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(o=>{o.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){F("データなし","error");return}const o=a.demandAnalysis,l=Object.entries(o.matrix).map(([y,f])=>{const g={productCode:y};return o.months.forEach(x=>{g[x]=f[x]??0}),g}),p=[{key:"productCode",label:"商品コード"},...o.months.map(y=>({key:y,label:y}))];Qn("demand-analysis.csv",l,p)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){F("データなし","error");return}const o=a.productionPlan.map(p=>({...p}));Qn("production-plan.csv",o,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await je("当月の全請求を締め切りますか？")&&F("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async o=>{const l=parseInt(o.target.value);a.brewingPlanFY=l;const{fetchBrewingPlanSummary:p,fetchBrewingMonthlyTrend:y,fetchBrewingSchedule:f,fetchBrewingProductDetail:g,fetchBrewingCustomCategories:x,fetchBrewingCategoryOverrides:$,fetchAllBrewingStockEntries:P}=await I(async()=>{const{fetchBrewingPlanSummary:V,fetchBrewingMonthlyTrend:U,fetchBrewingSchedule:G,fetchBrewingProductDetail:J,fetchBrewingCustomCategories:K,fetchBrewingCategoryOverrides:te,fetchAllBrewingStockEntries:W}=await Promise.resolve().then(()=>j);return{fetchBrewingPlanSummary:V,fetchBrewingMonthlyTrend:U,fetchBrewingSchedule:G,fetchBrewingProductDetail:J,fetchBrewingCustomCategories:K,fetchBrewingCategoryOverrides:te,fetchAllBrewingStockEntries:W}},void 0),[D,T,O,N,R,M,z]=await Promise.all([p(`${l}-10-01`,`${l+1}-09-30`),y(`${l}-10-01`,`${l+1}-09-30`),f(l),g(`${l}-10-01`,`${l+1}-09-30`),x(),$(),P()]);a.brewingPlanData=D,a.brewingMonthlyTrend=T,a.brewingSchedule=O,a.brewingProductDetail=N,a.brewingStockEntries=z,a.brewingCustomCategories=R,a.brewingOverrides=M,a.brewingExcludedProducts=new Set,L()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",p=o.dataset.parent??"";if(!l||!p)return;if(o.checked){a.brewingExcludedProducts.delete(l),L();return}a.brewingExcludedProducts.add(l);const y=a.brewingCustomCategories.filter(f=>f.parentCategory===p);if(y.length===1){const{setBrewingCategoryOverride:f,fetchBrewingPlanSummary:g,fetchBrewingProductDetail:x,fetchBrewingCategoryOverrides:$}=await I(async()=>{const{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:V,fetchBrewingCategoryOverrides:U}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:V,fetchBrewingCategoryOverrides:U}},void 0);await f(l,y[0].name);const P=a.brewingPlanFY,{fetchBrewingYearlyShipments:D}=await I(async()=>{const{fetchBrewingYearlyShipments:M}=await Promise.resolve().then(()=>j);return{fetchBrewingYearlyShipments:M}},void 0),[T,O,N,R]=await Promise.all([g(`${P}-10-01`,`${P+1}-09-30`),x(`${P}-10-01`,`${P+1}-09-30`),$(),D()]);a.brewingPlanData=T,a.brewingProductDetail=O,a.brewingOverrides=N,a.brewingYearlyShipments=R,a.brewingExcludedProducts.delete(l)}L()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",p=o.dataset.cat??"";if(!l||!p)return;const{setBrewingCategoryOverride:y,fetchBrewingPlanSummary:f,fetchBrewingProductDetail:g,fetchBrewingCategoryOverrides:x,fetchBrewingYearlyShipments:$}=await I(async()=>{const{setBrewingCategoryOverride:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:V,fetchBrewingYearlyShipments:U}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:V,fetchBrewingYearlyShipments:U}},void 0);await y(l,p);const P=a.brewingPlanFY,[D,T,O,N]=await Promise.all([f(`${P}-10-01`,`${P+1}-09-30`),g(`${P}-10-01`,`${P+1}-09-30`),x(),$()]);a.brewingPlanData=D,a.brewingProductDetail=T,a.brewingOverrides=O,a.brewingYearlyShipments=N,L()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"";if(!l)return;const{setBrewingCategoryOverride:p,fetchBrewingPlanSummary:y,fetchBrewingProductDetail:f,fetchBrewingCategoryOverrides:g,fetchBrewingYearlyShipments:x}=await I(async()=>{const{setBrewingCategoryOverride:N,fetchBrewingPlanSummary:R,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:z,fetchBrewingYearlyShipments:V}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:N,fetchBrewingPlanSummary:R,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:z,fetchBrewingYearlyShipments:V}},void 0);await p(l,null);const $=a.brewingPlanFY,[P,D,T,O]=await Promise.all([y(`${$}-10-01`,`${$+1}-09-30`),f(`${$}-10-01`,`${$+1}-09-30`),g(),x()]);a.brewingPlanData=P,a.brewingProductDetail=D,a.brewingOverrides=T,a.brewingYearlyShipments=O,L()})}),(()=>{const o=e.querySelector("#gantt-timeline");if(!o)return;const l=[9,10,11,12,1,2,3,4,5],p=l.length;let y=null,f=null;o.querySelectorAll(".gantt-bar").forEach(T=>{T.style.pointerEvents="auto"});function g(T){return"touches"in T?T.touches[0].clientX:T.clientX}function x(T){const O=T.target,N=O.closest(".gantt-bar");if(!N)return;const R=N.parentElement,M=N.dataset.cat??"",z=parseInt(N.dataset.month??"0"),V=parseInt(N.dataset.dur??"1"),U=parseInt(N.dataset.vol??"0"),G=R.offsetWidth/p;let J="move";O.classList.contains("gantt-resize-right")?J="resize-right":O.classList.contains("gantt-resize-left")&&(J="resize-left"),N.style.cursor=J==="move"?"grabbing":"ew-resize",N.style.opacity="0.8",N.style.zIndex="10",y={bar:N,mode:J,cat:M,origMonth:z,origDur:V,origVol:U,startX:g(T),cellW:G,origLeftPct:parseFloat(N.style.left),origWidthPct:parseFloat(N.style.width)},T.preventDefault()}function $(T){if(!y)return;const{bar:O,mode:N,origDur:R,startX:M,cellW:z,origLeftPct:V,origWidthPct:U}=y,G=g(T)-M,J=Math.round(G/z),K=Math.round(V/100*p);if(N==="move"){const te=Math.max(0,Math.min(p-R,K+J));O.style.left=(te/p*100).toFixed(2)+"%"}else if(N==="resize-right"){const te=Math.max(1,Math.min(p-K,R+J));O.style.width=(te/p*100).toFixed(2)+"%"}else if(N==="resize-left"){const te=Math.max(0,Math.min(K+R-1,K+J)),W=R-(te-K);O.style.left=(te/p*100).toFixed(2)+"%",O.style.width=(W/p*100).toFixed(2)+"%"}}async function P(T){if(!y)return;const{bar:O,cat:N,origMonth:R,origDur:M,origVol:z}=y,V=Math.round(parseFloat(O.style.left)/100*p),U=Math.max(1,Math.round(parseFloat(O.style.width)/100*p)),G=l[Math.max(0,Math.min(p-1,V))];if(O.style.cursor="grab",O.style.opacity="1",O.style.zIndex="",y=null,G===R&&U===M)return;const{saveBrewingSchedule:J,fetchBrewingSchedule:K}=await I(async()=>{const{saveBrewingSchedule:W,fetchBrewingSchedule:ee}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:W,fetchBrewingSchedule:ee}},void 0),te=a.brewingSchedule.filter(W=>W.brewCategory===N).map(W=>W.brewMonth===R?{brewMonth:G,durationMonths:U,plannedVolumeL:z}:{brewMonth:W.brewMonth,durationMonths:W.durationMonths,plannedVolumeL:W.plannedVolumeL});await J(N,a.brewingPlanFY,te),a.brewingSchedule=await K(a.brewingPlanFY),L()}o.addEventListener("mousedown",x),o.addEventListener("touchstart",x,{passive:!1}),document.addEventListener("mousemove",$),document.addEventListener("touchmove",$,{passive:!1}),document.addEventListener("mouseup",P),document.addEventListener("touchend",P);function D(T){const O=T.dataset.cat??"",N=parseInt(T.dataset.month??"0"),R=parseInt(T.dataset.vol??"0"),M=parseInt(T.dataset.max??"99999"),z=T.querySelector(".gantt-bar-label");if(!z||z.querySelector("input"))return;const V=document.createElement("input");V.type="number",V.min="0",V.max=String(M),V.step="100",V.value=String(R),V.style.cssText="width:60px;height:24px;font-size:12px;text-align:center;border:1px solid #2563eb;border-radius:3px;pointer-events:auto;",z.textContent="",z.style.pointerEvents="auto",z.appendChild(V),V.focus(),V.select();const U=async()=>{const G=parseFloat(V.value)||0;if(z.style.pointerEvents="none",z.textContent=A(Math.round(G))+"L",Math.abs(G-R)<1)return;const{saveBrewingSchedule:J,fetchBrewingSchedule:K}=await I(async()=>{const{saveBrewingSchedule:W,fetchBrewingSchedule:ee}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:W,fetchBrewingSchedule:ee}},void 0),te=a.brewingSchedule.filter(W=>W.brewCategory===O).map(W=>({brewMonth:W.brewMonth,durationMonths:W.durationMonths,plannedVolumeL:W.brewMonth===N?G:W.plannedVolumeL}));await J(O,a.brewingPlanFY,te),a.brewingSchedule=await K(a.brewingPlanFY),L()};V.addEventListener("blur",U),V.addEventListener("keydown",G=>{G.key==="Enter"&&V.blur()})}o.addEventListener("dblclick",T=>{const O=T.target.closest(".gantt-bar");O&&D(O)}),o.addEventListener("touchstart",T=>{const O=T.target.closest(".gantt-bar");if(O){if(f){clearTimeout(f),f=null,D(O);return}f=setTimeout(()=>{f=null},300)}},{passive:!0}),o.querySelectorAll(".gantt-bar-container").forEach(T=>{T.style.pointerEvents="auto";const O=async N=>{if(y)return;const R=T.dataset.cat??"",M=parseInt(T.dataset.max??"0"),z=T.getBoundingClientRect(),V=N-z.left,U=Math.floor(V/(z.width/p)),G=l[Math.max(0,Math.min(p-1,U))];if(a.brewingSchedule.some(ee=>ee.brewCategory===R&&ee.brewMonth===G))return;const J=Math.round(M*.3)||500,{saveBrewingSchedule:K,fetchBrewingSchedule:te}=await I(async()=>{const{saveBrewingSchedule:ee,fetchBrewingSchedule:H}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:ee,fetchBrewingSchedule:H}},void 0),W=[...a.brewingSchedule.filter(ee=>ee.brewCategory===R).map(ee=>({brewMonth:ee.brewMonth,durationMonths:ee.durationMonths,plannedVolumeL:ee.plannedVolumeL})),{brewMonth:G,durationMonths:2,plannedVolumeL:J}];await K(R,a.brewingPlanFY,W),a.brewingSchedule=await te(a.brewingPlanFY),L()};T.addEventListener("click",N=>{N.target.closest(".gantt-bar")||O(N.clientX)})})})();function A(o){return o.toLocaleString("ja-JP")}(()=>{const o=e.querySelector("#bp-gantt");if(!o)return;let l=null;function p(g){const x=g.target,$=x.closest(".bp-gantt-bar");if(!$)return;let P="move";x.classList.contains("bp-gantt-resize-right")?P="resize-right":x.classList.contains("bp-gantt-resize-left")&&(P="resize-left");const D="touches"in g?g.touches[0].clientX:g.clientX;$.style.opacity="0.7",$.style.zIndex="10",l={bar:$,mode:P,stepId:$.dataset.stepId??"",startX:D,origLeft:parseFloat($.style.left),origWidth:parseFloat($.style.width)},g.preventDefault()}function y(g){if(!l)return;const $=("touches"in g?g.touches[0].clientX:g.clientX)-l.startX;l.mode==="move"?l.bar.style.left=l.origLeft+$+"px":l.mode==="resize-right"?l.bar.style.width=Math.max(6,l.origWidth+$)+"px":(l.bar.style.left=l.origLeft+$+"px",l.bar.style.width=Math.max(6,l.origWidth-$)+"px")}async function f(){if(!l)return;const{bar:g,stepId:x,origLeft:$,origWidth:P}=l,D=parseFloat(g.style.left),T=parseFloat(g.style.width);g.style.opacity="1",g.style.zIndex="",l=null;const O=Math.round((D-$)/6),N=Math.round((T-P)/6);if(O===0&&N===0)return;const R=g.dataset.plannedStart??"",M=g.dataset.plannedEnd??"";if(!R||!M)return;const z=(Q,oe)=>{const fe=new Date(Q);return fe.setDate(fe.getDate()+oe),fe.toISOString().slice(0,10)};let V=R,U=M;O!==0&&N===0?(V=z(R,O),U=z(M,O)):N!==0&&O===0?U=z(M,N):(V=z(R,O),U=z(M,O+N));const G=g.dataset.batchId??"",J=parseInt(g.dataset.stepOrder??"0"),{updateBrewingProcessStep:K,fetchBrewingProcessSteps:te}=await I(async()=>{const{updateBrewingProcessStep:Q,fetchBrewingProcessSteps:oe}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:Q,fetchBrewingProcessSteps:oe}},void 0),W=a.brewingProcessSteps.filter(Q=>Q.batchId===G).sort((Q,oe)=>Q.stepOrder-oe.stepOrder);await K(x,{planned_start:V,planned_end:U});let ee=U;for(const Q of W){if(Q.stepOrder<=J)continue;const oe=Math.max(Math.round((new Date(Q.plannedEnd).getTime()-new Date(Q.plannedStart).getTime())/864e5),0),fe=z(ee,1),pe=z(fe,oe);await K(Q.id,{planned_start:fe,planned_end:pe}),ee=pe}let H=V;for(let Q=W.length-1;Q>=0;Q--){const oe=W[Q];if(oe.stepOrder>=J)continue;const fe=Math.max(Math.round((new Date(oe.plannedEnd).getTime()-new Date(oe.plannedStart).getTime())/864e5),0),pe=z(H,-1),be=z(pe,-fe);await K(oe.id,{planned_start:be,planned_end:pe}),H=be}W.map(Q=>(Q.stepOrder<J&&Math.round((new Date(Q.plannedEnd).getTime()-new Date(Q.plannedStart).getTime())/864e5),Q));const{updateBrewingBatch:Z}=await I(async()=>{const{updateBrewingBatch:Q}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:Q}},void 0);await Z(G,{start_date:W[0].stepOrder<J?z(V,-W.filter(Q=>Q.stepOrder<J).reduce((Q,oe)=>Q+Math.round((new Date(oe.plannedEnd).getTime()-new Date(oe.plannedStart).getTime())/864e5)+1,0)):J===1?V:void 0,target_end_date:ee}),a.brewingProcessSteps=await te(a.brewingBatches.map(Q=>Q.id)),L()}o.addEventListener("mousedown",p),o.addEventListener("touchstart",p,{passive:!1}),document.addEventListener("mousemove",y),document.addEventListener("touchmove",y,{passive:!1}),document.addEventListener("mouseup",f),document.addEventListener("touchend",f)})(),e.querySelector("[data-action='bp-auto-schedule']")?.addEventListener("click",async()=>{if(a.brewingBatches.length===0)return;const o=e.querySelector("[data-action='bp-auto-schedule']");o&&(o.textContent="計算中...",o.disabled=!0);const{autoScheduleAllBatches:l,fetchBrewingBatches:p,fetchBrewingProcessSteps:y}=await I(async()=>{const{autoScheduleAllBatches:x,fetchBrewingBatches:$,fetchBrewingProcessSteps:P}=await Promise.resolve().then(()=>j);return{autoScheduleAllBatches:x,fetchBrewingBatches:$,fetchBrewingProcessSteps:P}},void 0),{fetchTanks:f}=await I(async()=>{const{fetchTanks:x}=await Promise.resolve().then(()=>j);return{fetchTanks:x}},void 0),g=await f().catch(()=>[]);await l(a.brewingBatches,a.bpWorkerSettings,a.bpStepLabor,g),a.brewingBatches=await p(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await y(a.brewingBatches.map(x=>x.id)):[],L()});for(const o of["bp-worker-count","bp-worker-hours","bp-worker-start"])e.querySelector(`[data-action='${o}']`)?.addEventListener("change",async l=>{const p=parseFloat(l.target.value)||0;o==="bp-worker-count"?a.bpWorkerSettings.workerCount=p:o==="bp-worker-hours"?a.bpWorkerSettings.weeklyHoursLimit=p:a.bpWorkerSettings.dayStartHour=p;const{saveWorkerSettings:y}=await I(async()=>{const{saveWorkerSettings:f}=await Promise.resolve().then(()=>j);return{saveWorkerSettings:f}},void 0);await y(a.bpWorkerSettings),L()});e.querySelector("[data-action='bp-worker-deadline']")?.addEventListener("change",async o=>{a.bpWorkerSettings.deadlineDate=o.target.value;const{saveWorkerSettings:l}=await I(async()=>{const{saveWorkerSettings:p}=await Promise.resolve().then(()=>j);return{saveWorkerSettings:p}},void 0);await l(a.bpWorkerSettings),L()}),e.querySelector("[data-action='bp-worker-sunday']")?.addEventListener("change",async o=>{a.bpWorkerSettings.allowSunday=o.target.checked;const{saveWorkerSettings:l}=await I(async()=>{const{saveWorkerSettings:p}=await Promise.resolve().then(()=>j);return{saveWorkerSettings:p}},void 0);await l(a.bpWorkerSettings),L()}),e.querySelector("[data-action='bp-tank-add']")?.addEventListener("click",async()=>{const o=e.querySelector("#bp-tank-no")?.value?.trim()??"",l=parseFloat(e.querySelector("#bp-tank-cap")?.value??"0"),p=e.querySelector("#bp-tank-cats")?.value?.trim()??"";if(!o||l<=0)return;const y=p?p.split(/[,、]/).map(x=>x.trim()).filter(Boolean):[],{addTank:f,fetchTanks:g}=await I(async()=>{const{addTank:x,fetchTanks:$}=await Promise.resolve().then(()=>j);return{addTank:x,fetchTanks:$}},void 0);await f(o,l,"",y),a.bpTanks=await g(),L()}),e.querySelectorAll("[data-action='bp-tank-delete']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.tankId??"";if(!l)return;const{deleteTank:p,fetchTanks:y}=await I(async()=>{const{deleteTank:f,fetchTanks:g}=await Promise.resolve().then(()=>j);return{deleteTank:f,fetchTanks:g}},void 0);await p(l),a.bpTanks=await y(),L()})}),e.querySelector("[data-action='bp-import-schedule']")?.addEventListener("click",async()=>{const o=e.querySelectorAll("[data-action='bp-import-check']:checked");if(o.length===0)return;const{createBrewingBatch:l,fetchBrewingBatches:p,fetchBrewingProcessSteps:y}=await I(async()=>{const{createBrewingBatch:f,fetchBrewingBatches:g,fetchBrewingProcessSteps:x}=await Promise.resolve().then(()=>j);return{createBrewingBatch:f,fetchBrewingBatches:g,fetchBrewingProcessSteps:x}},void 0);for(const f of o){const g=f.dataset.cat??"",x=f.dataset.code??"",$=parseFloat(f.dataset.vol??"0"),P=f.dataset.date??"";!g||!x||!P||await l(g,x,a.brewingPlanFY,$,P,a.brewingProcessSteps,a.brewingRiceParams)}a.brewingBatches=await p(a.brewingPlanFY),a.brewingBatches.length>0&&(a.brewingProcessSteps=await y(a.brewingBatches.map(f=>f.id))),L()}),e.querySelector("[data-action='bp-show-new-form']")?.addEventListener("click",()=>{a.bpShowNewForm=!a.bpShowNewForm,L()}),e.querySelector("[data-action='bp-create-batch']")?.addEventListener("click",async()=>{const o=e.querySelector("#bp-new-cat")?.value??"",l=e.querySelector("#bp-new-code")?.value?.trim()??"",p=parseFloat(e.querySelector("#bp-new-vol")?.value??"0"),y=e.querySelector("#bp-new-date")?.value??"";if(!o||!l||!y)return;const{createBrewingBatch:f,fetchBrewingBatches:g,fetchBrewingProcessSteps:x}=await I(async()=>{const{createBrewingBatch:$,fetchBrewingBatches:P,fetchBrewingProcessSteps:D}=await Promise.resolve().then(()=>j);return{createBrewingBatch:$,fetchBrewingBatches:P,fetchBrewingProcessSteps:D}},void 0);await f(o,l,a.brewingPlanFY,p,y,a.brewingProcessSteps,a.brewingRiceParams),a.brewingBatches=await g(a.brewingPlanFY),a.brewingProcessSteps=await x(a.brewingBatches.map($=>$.id)),a.bpShowNewForm=!1,L()}),e.querySelectorAll("[data-action='bp-toggle-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.batchId??"";a.bpExpandedBatchId=a.bpExpandedBatchId===l?"":l,L()})}),e.querySelectorAll("[data-action='bp-batch-check']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.batchId??"";l&&(o.checked?a.bpSelectedBatchIds.includes(l)||(a.bpSelectedBatchIds=[...a.bpSelectedBatchIds,l]):a.bpSelectedBatchIds=a.bpSelectedBatchIds.filter(p=>p!==l),L())})}),e.querySelector("[data-action='bp-batch-check-all']")?.addEventListener("change",o=>{const l=o.target.checked;a.bpSelectedBatchIds=l?a.brewingBatches.map(p=>p.id):[],L()}),e.querySelector("[data-action='bp-bulk-delete']")?.addEventListener("click",async()=>{const o=a.bpSelectedBatchIds;if(o.length===0)return;const l=o.map(g=>a.brewingBatches.find(x=>x.id===g)?.batchCode??g).join("、");if(!window.confirm(`以下の仕込 ${o.length}件を削除します。
${l}

関連する全工程データも削除されます。この操作は取り消せません。`))return;const{supabaseDelete:p}=await I(async()=>{const{supabaseDelete:g}=await Promise.resolve().then(()=>ne);return{supabaseDelete:g}},void 0);await Promise.all(o.map(g=>p("brewing_process_batches",g)));const{fetchBrewingBatches:y,fetchBrewingProcessSteps:f}=await I(async()=>{const{fetchBrewingBatches:g,fetchBrewingProcessSteps:x}=await Promise.resolve().then(()=>j);return{fetchBrewingBatches:g,fetchBrewingProcessSteps:x}},void 0);a.brewingBatches=await y(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await f(a.brewingBatches.map(g=>g.id)):[],a.bpSelectedBatchIds=[],a.bpExpandedBatchId="",L()}),e.querySelectorAll("[data-action='bp-step-status']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:p}=await I(async()=>{const{updateBrewingProcessStep:g}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:g}},void 0),y={status:o.value};o.value==="進行中"&&!o.dataset.actualStart&&(y.actual_start=new Date().toISOString().split("T")[0]),o.value==="完了"&&!o.dataset.actualEnd&&(y.actual_end=new Date().toISOString().split("T")[0]),await p(l,y);const{fetchBrewingProcessSteps:f}=await I(async()=>{const{fetchBrewingProcessSteps:g}=await Promise.resolve().then(()=>j);return{fetchBrewingProcessSteps:g}},void 0);a.brewingProcessSteps=await f(a.brewingBatches.map(g=>g.id)),L()})}),e.querySelectorAll("[data-action='bp-step-temp']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:p}=await I(async()=>{const{updateBrewingProcessStep:y}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:y}},void 0);await p(l,{temperature:parseFloat(o.value)||null})})}),e.querySelectorAll("[data-action='bp-step-notes']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:p}=await I(async()=>{const{updateBrewingProcessStep:y}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:y}},void 0);await p(l,{notes:o.value})})});let E="";e.querySelectorAll("[data-action='bp-show-delete-modal']").forEach(o=>{o.addEventListener("click",()=>{E=o.dataset.batchId??"";const l=e.querySelector("#bp-delete-modal"),p=e.querySelector("#bp-delete-batch-name");l&&(l.style.display="flex"),p&&(p.textContent=o.dataset.batchCode??"")})}),e.querySelector("[data-action='bp-delete-cancel']")?.addEventListener("click",()=>{const o=e.querySelector("#bp-delete-modal");o&&(o.style.display="none"),E=""}),e.querySelector("[data-action='bp-delete-confirm']")?.addEventListener("click",async()=>{if(!E)return;const o=e.querySelector("#bp-delete-modal");o&&(o.style.display="none");const{supabaseDelete:l}=await I(async()=>{const{supabaseDelete:f}=await Promise.resolve().then(()=>ne);return{supabaseDelete:f}},void 0);await l("brewing_process_batches",E);const{fetchBrewingBatches:p,fetchBrewingProcessSteps:y}=await I(async()=>{const{fetchBrewingBatches:f,fetchBrewingProcessSteps:g}=await Promise.resolve().then(()=>j);return{fetchBrewingBatches:f,fetchBrewingProcessSteps:g}},void 0);a.brewingBatches=await p(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await y(a.brewingBatches.map(f=>f.id)):[],a.bpExpandedBatchId="",a.bpSelectedBatchIds=a.bpSelectedBatchIds.filter(f=>f!==E),E="",L()}),e.querySelector("#bp-delete-modal")?.addEventListener("click",o=>{o.target===o.currentTarget&&(o.currentTarget.style.display="none",E="")}),e.querySelectorAll("[data-action='bp-batch-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:p}=await I(async()=>{const{updateBrewingBatch:y}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:y}},void 0);await p(l,{planned_volume_l:parseFloat(o.value)||0})})}),e.querySelectorAll("[data-action='bp-batch-date']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:p}=await I(async()=>{const{updateBrewingBatch:y}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:y}},void 0);await p(l,{start_date:o.value})})}),e.querySelectorAll("[data-action='bp-batch-status']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:p,fetchBrewingBatches:y,fetchBrewingProcessSteps:f}=await I(async()=>{const{updateBrewingBatch:g,fetchBrewingBatches:x,fetchBrewingProcessSteps:$}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:g,fetchBrewingBatches:x,fetchBrewingProcessSteps:$}},void 0);await p(l,{status:o.value}),a.brewingBatches=await y(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await f(a.brewingBatches.map(g=>g.id)):[],L()})}),e.querySelectorAll("[data-action='proc-add-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=e.querySelector(`[data-action='proc-add-month-select'][data-cat='${l}']`),y=e.querySelector(`[data-action='proc-add-month-vol'][data-cat='${l}']`),f=parseInt(p?.value??"0"),g=parseFloat(y?.value??"0");if(!l||!f||g<=0)return;const $=[...a.brewingSchedule.filter(T=>T.brewCategory===l).map(T=>({brewMonth:T.brewMonth,durationMonths:T.durationMonths,plannedVolumeL:T.plannedVolumeL})),{brewMonth:f,durationMonths:2,plannedVolumeL:g}],{saveBrewingSchedule:P,fetchBrewingSchedule:D}=await I(async()=>{const{saveBrewingSchedule:T,fetchBrewingSchedule:O}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:T,fetchBrewingSchedule:O}},void 0);await P(l,a.brewingPlanFY,$),a.brewingSchedule=await D(a.brewingPlanFY),L()})}),e.querySelectorAll("[data-action='proc-remove-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=parseInt(o.dataset.month??"0");if(!l||!p)return;const y=a.brewingSchedule.filter(x=>x.brewCategory===l&&x.brewMonth!==p).map(x=>({brewMonth:x.brewMonth,durationMonths:x.durationMonths,plannedVolumeL:x.plannedVolumeL})),{saveBrewingSchedule:f,fetchBrewingSchedule:g}=await I(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:x,fetchBrewingSchedule:$}},void 0);await f(l,a.brewingPlanFY,y),a.brewingSchedule=await g(a.brewingPlanFY),L()})}),e.querySelectorAll("[data-action='proc-sched-remove']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=parseInt(o.dataset.month??"0");if(!l||!p)return;const y=a.brewingSchedule.filter(x=>x.brewCategory===l&&x.brewMonth!==p).map(x=>({brewMonth:x.brewMonth,durationMonths:x.durationMonths,plannedVolumeL:x.plannedVolumeL})),{saveBrewingSchedule:f,fetchBrewingSchedule:g}=await I(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:x,fetchBrewingSchedule:$}},void 0);await f(l,a.brewingPlanFY,y),a.brewingSchedule=await g(a.brewingPlanFY),L()})}),e.querySelectorAll("[data-action='proc-sched-edit-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=parseInt(o.dataset.month??"0"),y=parseFloat(o.value)||0;if(!l||!p)return;const f=a.brewingSchedule.filter($=>$.brewCategory===l).map($=>({brewMonth:$.brewMonth,durationMonths:$.durationMonths,plannedVolumeL:$.brewMonth===p?y:$.plannedVolumeL})),{saveBrewingSchedule:g,fetchBrewingSchedule:x}=await I(async()=>{const{saveBrewingSchedule:$,fetchBrewingSchedule:P}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:$,fetchBrewingSchedule:P}},void 0);await g(l,a.brewingPlanFY,f),a.brewingSchedule=await x(a.brewingPlanFY),L()})}),e.querySelectorAll("[data-action='proc-edit-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=parseFloat(o.value)||0;if(!l)return;const{saveProcurementDecision:y}=await I(async()=>{const{saveProcurementDecision:f}=await Promise.resolve().then(()=>j);return{saveProcurementDecision:f}},void 0);await y(l,a.brewingPlanFY,p),a.procurementDecisions[l]=p,L()})}),e.querySelector("[data-action='proc-add-commitment']")?.addEventListener("click",async()=>{const o=(e.querySelector("#proc-commit-variety")?.value??"").trim(),l=parseFloat(e.querySelector("#proc-commit-bales")?.value??"0"),p=parseFloat(e.querySelector("#proc-commit-price")?.value??"0"),y=parseInt(e.querySelector("#proc-commit-month")?.value??"0")||null,f=(e.querySelector("#proc-commit-supplier")?.value??"").trim();if(!o||l<=0)return;const{saveRicePurchaseCommitment:g,fetchRicePurchaseCommitments:x}=await I(async()=>{const{saveRicePurchaseCommitment:$,fetchRicePurchaseCommitments:P}=await Promise.resolve().then(()=>j);return{saveRicePurchaseCommitment:$,fetchRicePurchaseCommitments:P}},void 0);await g({varietyName:o,committedBales:l,pricePerKg:p,deliveryMonth:y,supplier:f,fy:a.brewingPlanFY}),a.ricePurchaseCommitments=await x(a.brewingPlanFY),L()}),e.querySelector("[data-action='proc-add-variety']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-variety-name"),l=e.querySelector("#proc-variety-price"),p=o?.value.trim()??"",y=parseFloat(l?.value??"400")||400;if(!p)return;const{addRiceVariety:f,fetchRiceVarieties:g}=await I(async()=>{const{addRiceVariety:$,fetchRiceVarieties:P}=await Promise.resolve().then(()=>j);return{addRiceVariety:$,fetchRiceVarieties:P}},void 0);await f(p,y)&&(a.riceVarieties=await g(),o&&(o.value=""),l&&(l.value=""),F(`「${p}」を追加しました`)),L()}),e.querySelectorAll("[data-action='proc-delete-variety']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",{deleteRiceVariety:p,fetchRiceVarieties:y}=await I(async()=>{const{deleteRiceVariety:g,fetchRiceVarieties:x}=await Promise.resolve().then(()=>j);return{deleteRiceVariety:g,fetchRiceVarieties:x}},void 0);await p(l)&&(a.riceVarieties=await y()),L()})}),e.querySelectorAll("[data-action='brew-rice-variety-select']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=o.dataset.field??"",y=o.value;if(!l||!p)return;const f=a.brewingRiceParams[l]??{brewCategory:l,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};f[p]=y;const g=a.riceVarieties.find($=>$.name===y);g&&(p==="kojiVariety"&&(f.kojiPricePerKg=g.defaultPricePerKg),p==="kakeVariety"&&(f.kakePricePerKg=g.defaultPricePerKg)),a.brewingRiceParams[l]=f;const{saveBrewingRiceParams:x}=await I(async()=>{const{saveBrewingRiceParams:$}=await Promise.resolve().then(()=>j);return{saveBrewingRiceParams:$}},void 0);await x(l,f),L()})}),e.querySelector("[data-action='proc-add-new-cat']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-new-cat-name"),l=e.querySelector("#proc-new-cat-vol"),p=o?.value.trim()??"",y=parseFloat(l?.value??"0");if(!p){F("区分名を入力してください","warning");return}if(y<=0){F("醸造予定量を入力してください","warning");return}const{saveBrewingSchedule:f,fetchBrewingSchedule:g}=await I(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:x,fetchBrewingSchedule:$}},void 0);await f(p,a.brewingPlanFY,[{brewMonth:10,durationMonths:2,plannedVolumeL:y}]),a.brewingSchedule=await g(a.brewingPlanFY),o&&(o.value=""),l&&(l.value=""),F(`「${p}」を追加しました`),L()}),e.querySelector("[data-action='brew-rice-bulk-apply']")?.addEventListener("click",async()=>{const o=parseFloat(e.querySelector("#rice-bulk-per-l")?.value??"0.50"),l=parseFloat(e.querySelector("#rice-bulk-koji")?.value??"0.30");if(isNaN(o)||isNaN(l))return;const{saveBrewingRiceParams:p}=await I(async()=>{const{saveBrewingRiceParams:g}=await Promise.resolve().then(()=>j);return{saveBrewingRiceParams:g}},void 0),y=Object.keys(a.brewingRiceParams),f=new Set([...y,...a.brewingYearlyShipments.map(g=>g.brewCategory)]);for(const g of f){const x=a.brewingRiceParams[g]??{brewCategory:g,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};x.ricePerLiterKg=o,x.kojiRatio=l,a.brewingRiceParams[g]=x,await p(g,x)}L()}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=o.dataset.field??"",y=parseFloat(o.value);if(!l||!p||isNaN(y))return;const f=a.brewingRiceParams[l]??{brewCategory:l,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};f[p]=y,a.brewingRiceParams[l]=f;const{saveBrewingRiceParams:g}=await I(async()=>{const{saveBrewingRiceParams:x}=await Promise.resolve().then(()=>j);return{saveBrewingRiceParams:x}},void 0);await g(l,f),L()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=parseFloat(o.value);if(!l)return;const{saveBrewingForecastOverride:y}=await I(async()=>{const{saveBrewingForecastOverride:f}=await Promise.resolve().then(()=>j);return{saveBrewingForecastOverride:f}},void 0);if(isNaN(p))await y(l,null),delete a.brewingForecastOverrides[l];else{const f=p/100;await y(l,f),a.brewingForecastOverrides[l]=f}L()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p="bc-"+encodeURIComponent(l).replace(/%/g,"-"),y=e.querySelector(`#alc-raw-${p}`),f=e.querySelector(`#alc-target-${p}`),g=parseFloat(y?.value??"18")||18,x=parseFloat(f?.value??"15")||15,{saveBrewingAlcoholSetting:$}=await I(async()=>{const{saveBrewingAlcoholSetting:D}=await Promise.resolve().then(()=>j);return{saveBrewingAlcoholSetting:D}},void 0);await $(l,g,x)&&(a.brewingAlcoholSettings[l]={brewCategory:l,rawAlcoholPct:g,targetAlcoholPct:x}),L()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",p=o.value,y=o.dataset.current??"";if(p===y)return;const{setBrewingCategoryOverride:f,fetchBrewingPlanSummary:g,fetchBrewingProductDetail:x,fetchBrewingCategoryOverrides:$}=await I(async()=>{const{setBrewingCategoryOverride:D,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:N}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:D,fetchBrewingPlanSummary:T,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:N}},void 0);if(await f(l,p)){const D=a.brewingPlanFY,[T,O,N]=await Promise.all([g(`${D}-10-01`,`${D+1}-09-30`),x(`${D}-10-01`,`${D+1}-09-30`),$()]);a.brewingPlanData=T,a.brewingProductDetail=O,a.brewingOverrides=N}L()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",p=o.value;if(!l||!p)return;const{linkTypeToCategory:y,fetchBrewingPlanSummary:f,fetchBrewingProductDetail:g,fetchBrewingCategoryOverrides:x,fetchCategoryTypeLinks:$}=await I(async()=>{const{linkTypeToCategory:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:V,fetchCategoryTypeLinks:U}=await Promise.resolve().then(()=>j);return{linkTypeToCategory:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:V,fetchCategoryTypeLinks:U}},void 0);await y(l,p);const P=a.brewingPlanFY,[D,T,O,N]=await Promise.all([f(`${P}-10-01`,`${P+1}-09-30`),g(`${P}-10-01`,`${P+1}-09-30`),x(),$()]);a.brewingPlanData=D,a.brewingProductDetail=T,a.brewingOverrides=O,a.brewingTypeLinks=N,L()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=o.dataset.type??"";if(!l||!p)return;const{unlinkTypeFromCategory:y,fetchBrewingPlanSummary:f,fetchBrewingProductDetail:g,fetchBrewingCategoryOverrides:x,fetchCategoryTypeLinks:$}=await I(async()=>{const{unlinkTypeFromCategory:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:V,fetchCategoryTypeLinks:U}=await Promise.resolve().then(()=>j);return{unlinkTypeFromCategory:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:V,fetchCategoryTypeLinks:U}},void 0);await y(l,p);const P=a.brewingPlanFY,[D,T,O,N]=await Promise.all([f(`${P}-10-01`,`${P+1}-09-30`),g(`${P}-10-01`,`${P+1}-09-30`),x(),$()]);a.brewingPlanData=D,a.brewingProductDetail=T,a.brewingOverrides=O,a.brewingTypeLinks=N,L()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const o=e.querySelector("#brew-new-category-name"),l=e.querySelector("#brew-new-category-parent"),p=o?.value.trim()??"",y=l?.value??"";if(!p)return;if(!y){F("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map($=>$.name)].includes(p)){F("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:g}=await I(async()=>{const{addBrewingCustomCategory:$}=await Promise.resolve().then(()=>j);return{addBrewingCustomCategory:$}},void 0);await g(p,y)?(a.brewingCustomCategories.push({name:p,parentCategory:y}),o&&(o.value=""),F(`「${p}」を追加しました（${y}系）`)):F("追加に失敗しました","error"),L()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"";if(!l)return;const{deleteBrewingCustomCategory:p,fetchBrewingPlanSummary:y,fetchBrewingProductDetail:f}=await I(async()=>{const{deleteBrewingCustomCategory:x,fetchBrewingPlanSummary:$,fetchBrewingProductDetail:P}=await Promise.resolve().then(()=>j);return{deleteBrewingCustomCategory:x,fetchBrewingPlanSummary:$,fetchBrewingProductDetail:P}},void 0);if(await p(l)){a.brewingCustomCategories=a.brewingCustomCategories.filter(D=>D.name!==l);for(const[D,T]of Object.entries(a.brewingOverrides))T===l&&delete a.brewingOverrides[D];const x=a.brewingPlanFY,[$,P]=await Promise.all([y(`${x}-10-01`,`${x+1}-09-30`),f(`${x}-10-01`,`${x+1}-09-30`)]);a.brewingPlanData=$,a.brewingProductDetail=P,F(`「${l}」を削除しました`)}L()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=o.dataset.catId??"",f=e.querySelector(`#new-entry-target-${p}`)?.value??l,g=e.querySelector(`#new-entry-label-${p}`),x=e.querySelector(`#new-entry-vol-${p}`),$=g?.value.trim()??"",P=parseFloat(x?.value??"0");if(P<=0)return;const{addBrewingStockEntry:D,fetchBrewingPlanSummary:T,fetchAllBrewingStockEntries:O}=await I(async()=>{const{addBrewingStockEntry:R,fetchBrewingPlanSummary:M,fetchAllBrewingStockEntries:z}=await Promise.resolve().then(()=>j);return{addBrewingStockEntry:R,fetchBrewingPlanSummary:M,fetchAllBrewingStockEntries:z}},void 0);if(await D(f,$||`タンク${a.brewingStockEntries.filter(R=>R.brewCategory===f).length+1}`,P)){const R=a.brewingPlanFY,[M,z]=await Promise.all([T(`${R}-10-01`,`${R+1}-09-30`),O()]);a.brewingPlanData=M,a.brewingStockEntries=z}L(),requestAnimationFrame(()=>{const R=document.getElementById(`stock-display-${p}`),M=document.getElementById(`stock-edit-${p}`),z=document.querySelector(`.btn-edit-stock[data-cat-id="${p}"]`);R&&(R.style.display="none"),M&&(M.style.display=""),z&&(z.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.id??"",p=o.value;if(!l||!p)return;const{reassignBrewingStockEntry:y,fetchBrewingPlanSummary:f,fetchAllBrewingStockEntries:g}=await I(async()=>{const{reassignBrewingStockEntry:$,fetchBrewingPlanSummary:P,fetchAllBrewingStockEntries:D}=await Promise.resolve().then(()=>j);return{reassignBrewingStockEntry:$,fetchBrewingPlanSummary:P,fetchAllBrewingStockEntries:D}},void 0);if(await y(l,p)){const $=a.brewingPlanFY,[P,D]=await Promise.all([f(`${$}-10-01`,`${$+1}-09-30`),g()]);a.brewingPlanData=P,a.brewingStockEntries=D}L(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach($=>{const P=document.getElementById(`stock-display-${$.dataset.catId}`),D=document.getElementById(`stock-edit-${$.dataset.catId}`);D&&D.querySelector(`[data-id="${l}"]`)&&(P&&(P.style.display="none"),D.style.display="",$.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",p=o.dataset.cat??"",y="bc-"+encodeURIComponent(p).replace(/%/g,"-"),{deleteBrewingStockEntry:f,fetchBrewingPlanSummary:g,fetchAllBrewingStockEntries:x}=await I(async()=>{const{deleteBrewingStockEntry:P,fetchBrewingPlanSummary:D,fetchAllBrewingStockEntries:T}=await Promise.resolve().then(()=>j);return{deleteBrewingStockEntry:P,fetchBrewingPlanSummary:D,fetchAllBrewingStockEntries:T}},void 0);if(await f(l)){const P=a.brewingPlanFY,[D,T]=await Promise.all([g(`${P}-10-01`,`${P+1}-09-30`),x()]);a.brewingPlanData=D,a.brewingStockEntries=T}L(),requestAnimationFrame(()=>{const P=document.getElementById(`stock-display-${y}`),D=document.getElementById(`stock-edit-${y}`),T=document.querySelector(`.btn-edit-stock[data-cat-id="${y}"]`);P&&(P.style.display="none"),D&&(D.style.display=""),T&&(T.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",p=e.querySelector(`#stock-display-${l}`),y=e.querySelector(`#stock-edit-${l}`);p&&(p.style.display="none"),y&&(y.style.display=""),o.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",p=e.querySelector(`#stock-display-${l}`),y=e.querySelector(`#stock-edit-${l}`),f=e.querySelector(`.btn-edit-stock[data-cat-id="${l}"]`);p&&(p.style.display=""),y&&(y.style.display="none"),f&&(f.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",p=e.querySelector(`#schedule-rows-${l}`);if(!p)return;const y=p.querySelectorAll(".schedule-edit-row").length,f=document.createElement("div");f.innerHTML=buildScheduleEditRowHTML(l,y,9,2,0,"");const g=f.firstElementChild;p.appendChild(g),g.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>g.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(o=>{o.addEventListener("click",()=>o.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",p=o.dataset.catId??"",y=e.querySelector(`#stock-input-${p}`),f=parseFloat(y?.value??"");if(isNaN(f)||f<0){alert("有効な数値を入力してください");return}o.textContent="保存中...",o.setAttribute("disabled","true");try{const{upsertBrewingStock:g,fetchBrewingPlanSummary:x,fetchBrewingMonthlyTrend:$}=await I(async()=>{const{upsertBrewingStock:O,fetchBrewingPlanSummary:N,fetchBrewingMonthlyTrend:R}=await Promise.resolve().then(()=>j);return{upsertBrewingStock:O,fetchBrewingPlanSummary:N,fetchBrewingMonthlyTrend:R}},void 0),P=a.brewingPlanFY;await g(l,f,0);const[D,T]=await Promise.all([x(`${P}-10-01`,`${P+1}-09-30`),$(`${P}-10-01`,`${P+1}-09-30`)]);a.brewingPlanData=D,a.brewingMonthlyTrend=T,L()}catch(g){console.error("[brewing save]",g),alert(`保存エラー: ${String(g)}`),o.textContent="保存",o.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.toggleCat??"",p=`sub-row-${"bc-"+encodeURIComponent(l).replace(/%/g,"-")}`,y=e.querySelectorAll(`.${p}`),f=o.querySelector(".toggle-icon"),g=y[0]?.style.display!=="none";y.forEach(x=>{x.style.display=g?"none":""}),f&&(f.innerHTML=g?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{F("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{F("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(o=>{o.addEventListener("click",()=>{F("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{F("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(o=>{o.addEventListener("click",async()=>{await je("この買掛を入金済みにしますか？")&&F("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(o=>{o.addEventListener("click",()=>{F("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{F("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelector("[data-action='kentei-show-form']")?.addEventListener("click",()=>{a.kenteiShowForm=!0,a.kenteiEditRecord=void 0,L()}),e.querySelector("[data-action='kentei-cancel']")?.addEventListener("click",()=>{a.kenteiShowForm=!1,a.kenteiEditRecord=void 0,L()}),e.querySelectorAll("[data-action='kentei-edit']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id??"";a.kenteiEditRecord=a.kenteiList.find(p=>p.id===l),a.kenteiShowForm=!0,L()})}),e.querySelector("[data-action='kentei-save']")?.addEventListener("click",async()=>{const o=e.querySelector("#kentei-edit-id")?.value??"",{saveKenteiRecord:l,fetchKenteiList:p}=await I(async()=>{const{saveKenteiRecord:y,fetchKenteiList:f}=await Promise.resolve().then(()=>j);return{saveKenteiRecord:y,fetchKenteiList:f}},void 0);await l({id:o||void 0,kenteiNo:"",batchCode:e.querySelector("#kf-batch")?.value??"",productName:e.querySelector("#kf-name")?.value??"",kenteiDate:e.querySelector("#kf-date")?.value??"",productionTypeName:e.querySelector("#kf-type")?.value??"",alcoholDegree:parseFloat(e.querySelector("#kf-alc")?.value)||0,sakaMeterValue:parseFloat(e.querySelector("#kf-sake")?.value)||0,acidity:parseFloat(e.querySelector("#kf-acid")?.value)||0,aminoAcid:parseFloat(e.querySelector("#kf-amino")?.value)||0,riceType:e.querySelector("#kf-rice")?.value??"",polishRate:parseFloat(e.querySelector("#kf-polish")?.value)||0,volume:parseFloat(e.querySelector("#kf-vol")?.value)||0,taxCategory:"",tankNo:""}),a.kenteiList=await p(),a.kenteiShowForm=!1,a.kenteiEditRecord=void 0,F("保存しました"),L()}),e.querySelectorAll("[data-action='kentei-register']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",p=a.kenteiList.find($=>$.id===l);if(!p)return;const{registerGenzaishu:y,fetchGenzaishu:f,fetchKenteiList:g}=await I(async()=>{const{registerGenzaishu:$,fetchGenzaishu:P,fetchKenteiList:D}=await Promise.resolve().then(()=>j);return{registerGenzaishu:$,fetchGenzaishu:P,fetchKenteiList:D}},void 0);await y({batchCode:p.batchCode,productName:p.productName,kenteiDate:p.kenteiDate,tankNo:p.tankNo||"",volumeL:p.volume,alcoholDegree:p.alcoholDegree||null,sakeMeterValue:p.sakaMeterValue||null,acidity:p.acidity||null,aminoAcid:p.aminoAcid||null,riceType:p.riceType,polishRate:p.polishRate||null,productionTypeName:p.productionTypeName,genshuCategory:"",productionDate:p.kenteiDate,rawAlcoholL:0,blendingWaterL:0,producedVolumeL:p.volume,pureAlcoholL:Math.round(p.volume*(p.alcoholDegree||0)/100*10)/10,convertedVolumeL:Math.round(p.volume*(p.alcoholDegree||0)/15),kasuKg:0,kasuRatio:0,notes:""});const{supabaseUpdate:x}=await I(async()=>{const{supabaseUpdate:$}=await Promise.resolve().then(()=>ne);return{supabaseUpdate:$}},void 0);await x("kentei_records",l,{status:"approved"}),a.kenteiList=await g(),a.genzaishuList=await f(),F("現在酒に登録しました"),L()})}),e.querySelector("[data-action='genzaishu-print']")?.addEventListener("click",()=>{const o=e.querySelector("[data-action='genzaishu-print']")?.closest("section.panel");if(!o)return;const l=window.open("","_blank");l&&(l.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>酒類検定簿</title><style>
      body { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:9px; padding:10mm; }
      table { width:100%; border-collapse:collapse; } th, td { border:1px solid #ccc; padding:2px 4px; }
      th { background:#f0f0f0; } button,.button-sm { display:none; }
      @media print { body { padding:5mm; } }
    </style></head><body><h1 style="font-size:14px;margin-bottom:8px;">酒類検定簿</h1>${o.querySelector(".table-wrap")?.innerHTML??""}</body></html>`),l.document.close(),setTimeout(()=>l.print(),300))}),e.querySelector("#tsume-genshu")?.addEventListener("change",o=>{const l=o.target.selectedOptions[0];if(l?.dataset.name){const p=e.querySelector("#tsume-product");p&&!p.value&&(p.value=l.dataset.name)}if(l?.dataset.tank){const p=e.querySelector("#tsume-tank");p&&(p.value=l.dataset.tank)}}),e.querySelector("[data-action='tsume-save']")?.addEventListener("click",async()=>{const o=e.querySelector("#tsume-date")?.value??"",l=parseInt(e.querySelector("#tsume-qty")?.value??"0"),p=parseInt(e.querySelector("#tsume-ml")?.value??"720");if(!o||l<=0){F("日付と成功本数を入力","warning");return}const y=parseFloat(e.querySelector("#tsume-vol-before")?.value??"0"),f=parseFloat(e.querySelector("#tsume-vol-after")?.value??"0"),g=l*p/1e3,x=y-g-parseFloat(e.querySelector("#tsume-break")?.value??"0")-parseFloat(e.querySelector("#tsume-loss")?.value??"0"),$=e.querySelector("#tsume-genshu"),{saveTsumekuchiRecord:P,fetchTsumekuchiRecords:D}=await I(async()=>{const{saveTsumekuchiRecord:T,fetchTsumekuchiRecords:O}=await Promise.resolve().then(()=>j);return{saveTsumekuchiRecord:T,fetchTsumekuchiRecords:O}},void 0);await P({tsumekuchiDate:o,sourceTankNo:e.querySelector("#tsume-tank")?.value??"",genshuBatchCode:$?.value??"",genshuName:$?.selectedOptions[0]?.dataset.name??"",targetProductCode:"",targetProductName:e.querySelector("#tsume-product")?.value??"",genshuVolumeBeforeL:parseFloat(e.querySelector("#tsume-before")?.value??"0"),zanshuReceiveL:parseFloat(e.querySelector("#tsume-zanshu")?.value??"0"),linkedTankNo:e.querySelector("#tsume-linked")?.value??"",volumeBeforeTsumekuchiL:y,tsumekuchiSuccessQty:l,tsumekuchiSuccessL:g,depthAfterMm:parseFloat(e.querySelector("#tsume-depth")?.value??"0"),volumeAfterL:f,tsumekuchiRemainingL:Math.max(0,x),breakageL:parseFloat(e.querySelector("#tsume-break")?.value??"0"),lossL:parseFloat(e.querySelector("#tsume-loss")?.value??"0"),productVolumeMl:p,notes:"",recordedBy:a.myProfile?.name??""}),a.tsumekuchiRecords=await D(),F("記録しました"),L()}),e.querySelectorAll("[data-action='tsume-delete']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"";if(!l||!confirm("この記録を削除しますか？"))return;const{deleteTsumekuchiRecord:p,fetchTsumekuchiRecords:y}=await I(async()=>{const{deleteTsumekuchiRecord:f,fetchTsumekuchiRecords:g}=await Promise.resolve().then(()=>j);return{deleteTsumekuchiRecord:f,fetchTsumekuchiRecords:g}},void 0);await p(l),a.tsumekuchiRecords=await y(),L()})}),e.querySelector("[data-action='tsume-print']")?.addEventListener("click",()=>{const o=e.querySelector("#tsume-table");if(!o)return;const l=window.open("","_blank");l&&(l.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>詰口帳票</title><style>
      body{font-family:'Hiragino Sans','Yu Gothic',sans-serif;font-size:9px;padding:10mm;}
      table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ccc;padding:2px 4px;}
      th{background:#f0f0f0;}button{display:none;}@media print{body{padding:5mm;}}
    </style></head><body><h1 style="font-size:14px;margin-bottom:8px;">詰口帳票</h1>${o.querySelector(".table-wrap")?.innerHTML??""}</body></html>`),l.document.close(),setTimeout(()=>l.print(),300))}),e.querySelector("#tm-product")?.addEventListener("change",o=>{const p=o.target.selectedOptions[0];if(p?.dataset.batch){const y=e.querySelector("#tm-batch"),f=e.querySelector("#tm-alc");y&&(y.value=p.dataset.batch),f&&p.dataset.alc&&(f.value=p.dataset.alc)}}),e.querySelector("[data-action='tm-add']")?.addEventListener("click",async()=>{const o=e.querySelector("#tm-date")?.value??"",l=e.querySelector("#tm-type")?.value??"transfer",p=e.querySelector("#tm-from")?.value??"",y=e.querySelector("#tm-to")?.value??"",f=parseFloat(e.querySelector("#tm-vol")?.value??"0");if(!o||f<=0){F("日付と数量を入力してください","warning");return}if(!p&&!y){F("移動元か移動先を選択してください","warning");return}const{saveTankMovement:g,fetchTankMovements:x}=await I(async()=>{const{saveTankMovement:$,fetchTankMovements:P}=await Promise.resolve().then(()=>j);return{saveTankMovement:$,fetchTankMovements:P}},void 0);await g({movementDate:o,fromTankNo:p,toTankNo:y,volumeL:f,productName:e.querySelector("#tm-product")?.value??"",batchCode:e.querySelector("#tm-batch")?.value??"",alcoholDegree:parseFloat(e.querySelector("#tm-alc")?.value)||null,temperature:parseFloat(e.querySelector("#tm-temp")?.value)||null,movementType:l,recordedBy:a.myProfile?.name??"",notes:e.querySelector("#tm-notes")?.value??""}),a.tankMovements=await x(),F("記録しました"),L()}),e.querySelectorAll("[data-action='tm-delete']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"";if(!l||!confirm("この記録を削除しますか？"))return;const{deleteTankMovement:p,fetchTankMovements:y}=await I(async()=>{const{deleteTankMovement:f,fetchTankMovements:g}=await Promise.resolve().then(()=>j);return{deleteTankMovement:f,fetchTankMovements:g}},void 0);await p(l),a.tankMovements=await y(),L()})}),e.querySelector("[data-action='tm-filter-tank']")?.addEventListener("change",o=>{a.tankMovementFilter=o.target.value,L()}),e.querySelector("[data-action='tm-print']")?.addEventListener("click",()=>{const o=e.querySelector("#tm-table");if(!o)return;const l=window.open("","_blank");l&&(l.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
      <title>移動簿</title><style>
        body { font-family:'Hiragino Sans','Yu Gothic','Meiryo',sans-serif; font-size:10px; padding:10mm; }
        table { width:100%; border-collapse:collapse; } th, td { border:1px solid #ccc; padding:3px 5px; }
        th { background:#f0f0f0; } button { display:none; }
        @media print { body { padding:5mm; } }
      </style></head><body><h1 style="font-size:14px;margin-bottom:8px;">移動簿${a.tankMovementFilter?` — ${a.tankMovementFilter}`:""}</h1>${o.innerHTML}</body></html>`),l.document.close(),setTimeout(()=>l.print(),300))}),e.querySelector("[data-action='tank-show-add']")?.addEventListener("click",()=>{const o=e.querySelector("#tank-form-area");o&&(o.innerHTML=go(),B())}),e.querySelectorAll("[data-action='tank-edit']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.tankId??"",p=a.tankList.find(f=>f.id===l);if(!p)return;const y=e.querySelector("#tank-form-area");y&&(y.innerHTML=go(p),B())})}),e.querySelectorAll("[data-action='tank-delete']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.tankId??"";if(!l||!confirm("このタンクを削除しますか？"))return;const{deleteTankById:p,fetchTankList:y}=await I(async()=>{const{deleteTankById:f,fetchTankList:g}=await Promise.resolve().then(()=>j);return{deleteTankById:f,fetchTankList:g}},void 0);await p(l),a.tankList=await y(),L()})});function B(){const o=e.querySelector("#tank-f-depth"),l=e.querySelector("#tank-f-cap"),p=e.querySelector("#tank-f-lpmm"),y=()=>{const f=parseFloat(o?.value??"0"),g=parseFloat(l?.value??"0");f>0&&g>0&&p&&(p.value=(g/f).toFixed(2))};o?.addEventListener("input",y),l?.addEventListener("input",y),e.querySelector("[data-action='tank-save']")?.addEventListener("click",async()=>{const f=e.querySelector("#tank-edit-id")?.value??"",g=e.querySelector("#tank-f-no")?.value?.trim()??"";if(!g){F("容器番号を入力してください","warning");return}const{saveTank:x,fetchTankList:$}=await I(async()=>{const{saveTank:P,fetchTankList:D}=await Promise.resolve().then(()=>j);return{saveTank:P,fetchTankList:D}},void 0);await x({id:f||void 0,tankNo:g,displayName:e.querySelector("#tank-f-name")?.value?.trim()??g,depthMm:parseFloat(e.querySelector("#tank-f-depth")?.value??"0"),capacity:parseFloat(e.querySelector("#tank-f-cap")?.value??"0"),litersPerMm:parseFloat(e.querySelector("#tank-f-lpmm")?.value??"0"),remarks:e.querySelector("#tank-f-remarks")?.value??""}),a.tankList=await $(),F(f?"更新しました":"登録しました"),L()}),e.querySelector("[data-action='tank-cancel']")?.addEventListener("click",()=>{const f=e.querySelector("#tank-form-area");f&&(f.innerHTML="")})}e.querySelector("#tank-f-no")&&B(),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{F("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.closest("tr")?.querySelector("td")?.textContent??"";F(`注文 ${l} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{F("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(o=>{o.addEventListener("click",()=>{F("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{F("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.customer??"";F(`得意先 ${l} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{F("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!o||!await je("このリストを削除しますか？"))return;const{supabaseDelete:p}=await I(async()=>{const{supabaseDelete:f}=await Promise.resolve().then(()=>ne);return{supabaseDelete:f}},void 0);if(await p("lead_lists",o)){const{fetchLeadLists:f}=await I(async()=>{const{fetchLeadLists:g}=await Promise.resolve().then(()=>j);return{fetchLeadLists:g}},void 0);a.leadLists=await f(),F("削除しました","success"),L()}else F("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{F("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.scYm;if(!l)return;a.shipmentCalendarYearMonth=l,a.shipmentCalendarData=null,a.shipmentCalendarPrevYearData=null,a.shipmentCalendarSelectedDate=null,L();const{fetchShipmentCalendar:p}=await I(async()=>{const{fetchShipmentCalendar:P}=await Promise.resolve().then(()=>j);return{fetchShipmentCalendar:P}},void 0),[y,f]=l.split("-").map(Number),g=`${y-1}-${String(f).padStart(2,"0")}`,[x,$]=await Promise.all([p(l),p(g)]);a.shipmentCalendarData=x,a.shipmentCalendarPrevYearData=$,L()})}),e.querySelectorAll("[data-sc-date]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.scDate;l!==void 0&&(a.shipmentCalendarSelectedDate=l?a.shipmentCalendarSelectedDate===l?null:l:null,L())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(o=>{o.addEventListener("click",async()=>{a.calendarYearMonth=o.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:l}=await I(async()=>{const{fetchCalendarEvents:p}=await Promise.resolve().then(()=>j);return{fetchCalendarEvents:p}},void 0);a.calendarEvents=await l(a.calendarYearMonth),L()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async o=>{a.calendarYearMonth=o.target.value;const{fetchCalendarEvents:l}=await I(async()=>{const{fetchCalendarEvents:p}=await Promise.resolve().then(()=>j);return{fetchCalendarEvents:p}},void 0);a.calendarEvents=await l(a.calendarYearMonth),L()}),e.querySelector("#cal-filter-category")?.addEventListener("change",o=>{a.calendarFilterCategory=o.target.value,L()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const o=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(o.getTime()+3600*1e3).toISOString(),isAllDay:!1}},L()}),e.querySelectorAll("[data-cal-date]").forEach(o=>{o.tagName!=="BUTTON"&&o.addEventListener("click",l=>{if(l.target.closest(".cal-event"))return;const p=o.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${p}T10:00:00`,isAllDay:!1}},L()})}),e.querySelectorAll("[data-cal-event-id]").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const p=o.dataset.calEventId,y=a.calendarEvents.find(f=>f.id===p);y&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...y}},L())})}),e.querySelectorAll("[data-action='cal-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.calendarEdit=null,L())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:o,fetchCalendarEvents:l,CALENDAR_CATEGORY_COLORS:p}=await I(async()=>{const{saveCalendarEvent:$,fetchCalendarEvents:P,CALENDAR_CATEGORY_COLORS:D}=await Promise.resolve().then(()=>j);return{saveCalendarEvent:$,fetchCalendarEvents:P,CALENDAR_CATEGORY_COLORS:D}},void 0),y=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,f=e.querySelector("#cal-category")?.value??"general",g={id:y,title:e.querySelector("#cal-title")?.value??"",category:f,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:p[f]};if(!g.title){F("タイトルは必須です","warning");return}await o(g)?(a.calendarEvents=await l(a.calendarYearMonth),a.calendarEdit=null,F("保存しました"),L()):F("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!o||!await je("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:l,fetchCalendarEvents:p}=await I(async()=>{const{deleteCalendarEvent:f,fetchCalendarEvents:g}=await Promise.resolve().then(()=>j);return{deleteCalendarEvent:f,fetchCalendarEvents:g}},void 0);await l(o)?(a.calendarEvents=await p(a.calendarYearMonth),a.calendarEdit=null,F("削除しました"),L()):F("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,L();try{const o=a.importPreview.rows.filter(p=>p._valid),l=await Xr(a.importEntity,o);a.importResult=`取り込み完了: ${l.inserted}件成功 / ${l.failed}件失敗`,a.importPreview=null}catch(o){a.importResult=`エラー: ${o instanceof Error?o.message:String(o)}`}finally{a.importing=!1,L()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const o=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=o,a.storeSales=[],a.actionLoading=!0,L(),ls(o).then(l=>{a.storeSales=l,a.actionLoading=!1,L()})}),e.querySelectorAll("[data-action='copy-config']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.configValue??"";if(l)try{await navigator.clipboard.writeText(l),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(p){console.warn("Clipboard copy failed",p)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const l=JSON.stringify({supabase_url:$e,supabase_anon_key:ie,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),p=new Blob([l],{type:"application/json;charset=utf-8"}),y=URL.createObjectURL(p),f=document.createElement("a");f.href=y,f.download="relay_config.json",f.click(),URL.revokeObjectURL(y)}),e.querySelectorAll("[data-action='copy-code']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.code??"";if(l)try{await navigator.clipboard.writeText(decodeURIComponent(l)),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(p){console.warn("Clipboard code copy failed",p)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(o=>{o.addEventListener("change",()=>{$t(e),a.emailSaveMessage=null,L()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(o=>{o.addEventListener("change",()=>{$t(e),a.emailSaveMessage=null,L()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{$t(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{$t(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(o=>{o.addEventListener("click",()=>{a.emailTemplateId=o.dataset.templateId??"custom";const l=li(a.emailTemplateId);a.emailSubject=l.subject,a.emailBody=l.body,a.emailSaveMessage=null,L()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{$t(e);const o=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${o}`),a.emailSaveMessage=null,L()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{$t(e),a.actionLoading=!0,L(),Ba(En("draft")).then(o=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(o.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,L()})}),e.querySelector("#email-sender")?.addEventListener("change",o=>{a.emailSenderId=o.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{$t(e),a.actionLoading=!0,a.emailSending=!0,L();const o=En("sent");a.mailSenders.find(l=>l.id===a.emailSenderId),pr().then(async l=>{await Ba({...o,recipientCount:l.sent}),a.emailSaveMessage=`${l.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,L(),F(`${l.sent}件送信完了`)}).catch(async()=>{await Ba(En("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,L(),F("APIキー未設定のため下書き保存しました","warning")})}),e.querySelectorAll(".feature-checkbox").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.featureId;if(!l)return;const p=a.myProfile?.name??a.myProfile?.email??"不明";o.checked?await _r(l,p):await kr(l),a.featureStatuses=await Wa(),L()})}),e.querySelectorAll("[data-workforce-tab]").forEach(o=>{o.addEventListener("click",async()=>{if(a.workforceTab=o.dataset.workforceTab,a.workforceTab==="bottling"&&a.bottlingSchedule.length===0){const{fetchProductionPlan3Months:l,buildBottlingSchedule:p}=await I(async()=>{const{fetchProductionPlan3Months:f,buildBottlingSchedule:g}=await Promise.resolve().then(()=>j);return{fetchProductionPlan3Months:f,buildBottlingSchedule:g}},void 0),y=await l(a.workforceYearMonth);a.bottlingSchedule=p(y,a.workforceYearMonth)}L()})}),e.querySelectorAll("[data-staff-dept-filter]").forEach(o=>{o.addEventListener("click",()=>{a.staffDeptFilter=o.dataset.staffDeptFilter??"",L()})}),e.querySelector("#cost-year-month")?.addEventListener("change",o=>{a.workforceYearMonth=o.target.value,L()}),e.querySelector("#shift-year-month")?.addEventListener("change",o=>{a.workforceYearMonth=o.target.value,a.workforceMetrics=null,a.dailyShiftPlans=[],a.workforceSelectedDay=null,kt(a.currentPath)}),e.querySelector("#bottling-year-month")?.addEventListener("change",async o=>{a.workforceYearMonth=o.target.value;const{fetchProductionPlan3Months:l,buildBottlingSchedule:p}=await I(async()=>{const{fetchProductionPlan3Months:f,buildBottlingSchedule:g}=await Promise.resolve().then(()=>j);return{fetchProductionPlan3Months:f,buildBottlingSchedule:g}},void 0),y=await l(a.workforceYearMonth);a.bottlingSchedule=p(y,a.workforceYearMonth),L()}),e.querySelector("[data-action='bottling-recalc']")?.addEventListener("click",async()=>{const{fetchProductionPlan3Months:o,buildBottlingSchedule:l}=await I(async()=>{const{fetchProductionPlan3Months:y,buildBottlingSchedule:f}=await Promise.resolve().then(()=>j);return{fetchProductionPlan3Months:y,buildBottlingSchedule:f}},void 0),p=await o(a.workforceYearMonth);a.bottlingSchedule=l(p,a.workforceYearMonth),L()}),e.querySelectorAll("[data-bottling-move]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.bottlingIdx??"0"),p=o.dataset.bottlingMove==="up"?-1:1,y=l+p;if(y<0||y>=a.bottlingSchedule.length)return;const f=a.bottlingSchedule;[f[l],f[y]]=[f[y],f[l]],L()})}),e.querySelectorAll("[data-shift-day]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.shiftDay??null;a.workforceSelectedDay=a.workforceSelectedDay===l?null:l,L()})}),e.querySelector("[data-action='shift-day-close']")?.addEventListener("click",()=>{a.workforceSelectedDay=null,L()}),e.querySelector("#shift-bottling-target")?.addEventListener("change",o=>{a.shiftBottlingTarget=parseInt(o.target.value)||0}),e.querySelector("[data-action='shift-auto-generate']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='shift-auto-generate']"),l=document.getElementById("shift-bottling-target");l&&(a.shiftBottlingTarget=parseInt(l.value)||0),o&&(o.disabled=!0,o.textContent="生成中…");try{const{fetchProductionPlan:p}=await I(async()=>{const{fetchProductionPlan:$}=await Promise.resolve().then(()=>j);return{fetchProductionPlan:$}},void 0),y=await p(a.workforceYearMonth).catch(()=>[]),f=a.calendarShifts.filter($=>$.date.startsWith(a.workforceYearMonth)),g=sy(a.workforceYearMonth,a.staffMembers,a.brewingSchedule,a.shiftBottlingTarget,a.workforceMetrics,y,f);await Ar(a.workforceYearMonth,g)?(a.dailyShiftPlans=g,F("シフトを自動生成しました","success"),L()):F("保存に失敗しました","error")}finally{o&&(o.disabled=!1)}}),e.querySelector("[data-action='staff-new']")?.addEventListener("click",()=>{const o=document.createElement("div");o.innerHTML=lo(),document.body.appendChild(o.firstElementChild),Lo(null)}),e.querySelectorAll("[data-edit-staff]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.editStaff??"",p=a.staffMembers.find(f=>f.id===l);if(!p)return;const y=document.createElement("div");y.innerHTML=lo(p),document.body.appendChild(y.firstElementChild),Lo(p)})}),e.querySelectorAll("[data-delete-staff]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.deleteStaff??"",p=o.dataset.staffName??"";if(!confirm(`${p} を削除しますか？`))return;await Pr(l)?(a.staffMembers=a.staffMembers.filter(f=>f.id!==l),F("削除しました","success"),L()):F("削除に失敗しました","error")})})}function L(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=_h()}catch(s){console.error("[renderApp] render error:",s),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(s)}

${s?.stack??""}</div>`;return}const t=e.querySelector(".app-page-title");document.title=t?.textContent?`${t.textContent} | 酒仙iクラウド`:"酒仙iクラウド",Ph(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),_s()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const s of["fd-scaler","print-scaler","q-preview-scaler"]){const r=e.querySelector(`#${s}`),i=r?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),c=i?.querySelector(".print-page")??i;if(!r||!c)continue;const d=r.parentElement?.clientWidth??0,u=c.offsetWidth;if(d>0&&u>0&&u>d-24){const h=(d-24)/u;r.style.transform=`scale(${h})`,r.style.transformOrigin="top left",r.style.height=`${(c.offsetHeight+48)*h}px`}else r.style.transform="",r.style.height=""}});const n=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=n?"hidden":"",document.body.style.touchAction=n?"none":"",eh()}const hi="sake-cloud-cache",Eh=300*1e3;function Lh(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(hi,JSON.stringify(e))}catch{}}function Ah(){try{const e=localStorage.getItem(hi);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>Eh?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let fi=0;async function Bt(){const e=Ah();e&&(a.loading=!1,L()),a.loading=!e,e||L();try{const[t,n,s,r,i,c,d]=await Promise.all([No(),Ro(),ma(),Oo(),ya(a.invoiceFilter),ts(),Mo("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=s,a.pipelineMeta=r,a.invoiceRecords=i,a.salesAnalytics=c,d){const u={...Fa,...Nn(),...d};a.quoteCompanySettings=u,_t(u)}if(Rt.length===0&&oh(),!a.salesFilter.startDate||!a.salesFilter.endDate){const h=[...t.salesRecords].sort((w,_)=>new Date(_.date).getTime()-new Date(w.date).getTime())[0]?.date??new Date().toISOString(),v=new Date(h),m=new Date(v);m.setDate(v.getDate()-30),a.salesFilter={startDate:Po(m.toISOString()),endDate:Po(v.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await ya(a.invoiceFilter)),a.error=null,Lh()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,L(),ga(a.route,!0),fi=Date.now()}}window.addEventListener("popstate",()=>{a.route=ci(location.pathname),a.currentCategory=on(a.route),a.sidebarOpen=!1,fa(),ga(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,L();return}if(e.key==="Escape"){if(a.globalSearchOpen){fa(),L();return}if(a.pickerMode){Za(),L();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(di(),L());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&ui(t)}});a.user=en()?To():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await I(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>j);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),L()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,s=0,r=0,i=0,c=1;document.addEventListener("mousedown",d=>{const u=d.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;d.preventDefault();const h=u.closest(".fd-canvas");if(!h)return;const v=h.getBoundingClientRect();if(v.width===0)return;c=228.6/v.width,t=u,n=d.clientX,s=d.clientY,r=parseFloat(u.style.left)||0,i=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(k=>k.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const m=document.querySelector("#fd-selected-info");m&&(m.textContent=`選択中: ${u.title}`);const w=document.querySelector("#fd-sel-x"),_=document.querySelector("#fd-sel-y");w&&(w.value=String(r)),_&&(_.value=String(i))}),document.addEventListener("mousemove",d=>{if(!t)return;const u=(d.clientX-n)*c,h=(d.clientY-s)*c,v=Math.round((r+u)*2)/2,m=Math.round((i+h)*2)/2;t.style.left=v+"mm",t.style.top=m+"mm";const w=document.querySelector("#fd-sel-x"),_=document.querySelector("#fd-sel-y");w&&(w.value=String(v)),_&&(_.value=String(m))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",d=>{if(!a.fdDesignMode||!a.fdActiveFieldId||d.key!=="ArrowLeft"&&d.key!=="ArrowRight"&&d.key!=="ArrowUp"&&d.key!=="ArrowDown"||d.target.tagName==="INPUT"||d.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;d.preventDefault();const h=.5;let v=parseFloat(u.style.left)||0,m=parseFloat(u.style.top)||0;d.key==="ArrowLeft"?v-=h:d.key==="ArrowRight"?v+=h:d.key==="ArrowUp"?m-=h:d.key==="ArrowDown"&&(m+=h),u.style.left=v+"mm",u.style.top=m+"mm";const w=document.querySelector("#fd-sel-x"),_=document.querySelector("#fd-sel-y");w&&(w.value=String(v)),_&&(_.value=String(m))})})();let An=null,Na=[],Ao=null;function Ch(e){const t=window.google?.maps;if(!t){console.warn("Google Maps not loaded");return}const n=e.querySelector("#customer-map"),s=e.querySelector("#map-data");if(!n||!s)return;const r=JSON.parse(decodeURIComponent(s.dataset.customers??"[]")),i=JSON.parse(decodeURIComponent(s.dataset.deliveries??"[]"));An||(An=new t.Map(n,{center:{lat:35.38,lng:139.25},zoom:10,gestureHandling:"greedy",streetViewControl:!1,mapTypeControl:!1}),Ao=new t.InfoWindow);const c=An,d=Ao;function u(w){return w.isAtRisk?"#e53e3e":w.isDormant?"#dd6b20":w.amount12m>0?"#2563eb":"#aaa"}function h(w,_=32){const k=`<svg xmlns="http://www.w3.org/2000/svg" width="${_}" height="${_}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${w}" stroke="white" stroke-width="2.5"/></svg>`;return{url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(k),scaledSize:new t.Size(_,_),anchor:new t.Point(_/2,_/2)}}function v(){Na.forEach(w=>w.setMap(null)),Na=[]}function m(w,_,k){v();const C=new t.LatLngBounds;let S=!1;r.filter(E=>!(w==="at-risk"&&!E.isAtRisk||w==="dormant"&&(E.isAtRisk||!E.isDormant)||w==="active"&&(E.isAtRisk||E.isDormant||E.amount12m===0)||w==="inactive"&&(E.isAtRisk||E.isDormant||E.amount12m>0)||_&&E.areaCode!==_||k&&(E.businessTypeName||E.businessType)!==k)).forEach(E=>{if(!E.lat||!E.lng)return;const B={lat:E.lat,lng:E.lng};C.extend(B),S=!0;const o=new t.Marker({map:c,position:B,icon:h(u(E),28),title:E.name});o.addListener("click",()=>{d.setContent(`<div style="font-size:13px;max-width:260px;">
          <strong>${E.name}</strong><br>${E.address1??""}<br>
          エリア: ${E.areaCode??"―"} / ${E.businessTypeName??E.businessType??"―"}<br>
          12ヶ月売上: <strong>${E.amount12m?.toLocaleString()??0}円</strong></div>`),d.open(c,o)}),Na.push(o)}),i.forEach(E=>{if(!E.lat||!E.lng)return;const B={lat:E.lat,lng:E.lng};C.extend(B),S=!0;const o=new t.Marker({map:c,position:B,icon:h("#FF9800",22),title:E.name});o.addListener("click",()=>{d.setContent(`<div style="font-size:13px;"><strong>${E.name}</strong><br>${E.address??""}${E.phone?`<br>${E.phone}`:""}</div>`),d.open(c,o)}),Na.push(o)}),S&&c.fitBounds(C,{top:40,bottom:40,left:40,right:40})}m(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz),e.querySelectorAll("[data-map-status]").forEach(w=>{w.addEventListener("click",()=>{const _=w.dataset.mapStatus;a.mapFilters={...a.mapFilters,filterStatus:_},e.querySelectorAll("[data-map-status]").forEach(k=>{k.className=k.className.replace(/\b(primary|secondary)\b/g,k===w?"primary":"secondary")}),m(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)})}),e.querySelector("#map-filter-area")?.addEventListener("change",w=>{a.mapFilters={...a.mapFilters,filterArea:w.target.value},m(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#map-filter-biz")?.addEventListener("change",w=>{a.mapFilters={...a.mapFilters,filterBiz:w.target.value},m(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#btn-geocode")?.addEventListener("click",async()=>{const w=e.querySelector("#btn-geocode"),_=e.querySelector("#geocode-progress"),k=e.querySelector("#geocode-status"),C=e.querySelector("#geocode-bar");w&&(w.disabled=!0),_&&(_.style.display="block");try{const{batchGeocode:S}=await I(async()=>{const{batchGeocode:E}=await Promise.resolve().then(()=>j);return{batchGeocode:E}},void 0),A=await S((E,B,o)=>{k&&(k.textContent=`${E}/${B} — ${o}`),C&&(C.style.width=`${Math.round(E/Math.max(B,1)*100)}%`)});k&&(k.textContent=`完了: ${A.success}件成功 / ${A.failed}件失敗`),C&&(C.style.width="100%"),setTimeout(()=>{window.location.reload()},3e3)}catch(S){k&&(k.textContent="エラーが発生しました: "+String(S))}})}Bt();const Dh=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&Bt()},Dh);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-fi>60*1e3&&Bt()});let Kn="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{Kn=e}).catch(()=>{});setInterval(async()=>{if(!(!Kn||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==Kn&&!a.updateAvailable&&(a.updateAvailable=!0,L())}catch{}},120*1e3);export{I as _};
