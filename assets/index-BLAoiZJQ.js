(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Bo="modulepreload",jo=function(e){return"/"+e},vn={},I=function(t,n,s){let r=Promise.resolve();if(n&&n.length>0){let u=function(h){return Promise.all(h.map(f=>Promise.resolve(f).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),p=c?.nonce||c?.getAttribute("nonce");r=u(n.map(h=>{if(h=jo(h),h in vn)return;vn[h]=!0;const f=h.endsWith(".css"),g=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${g}`))return;const $=document.createElement("link");if($.rel=f?"stylesheet":Bo,f||($.as="script"),$.crossOrigin="",$.href=h,p&&$.setAttribute("nonce",p),document.head.appendChild($),f)return new Promise((A,_)=>{$.addEventListener("load",A),$.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${h}`)))})}))}function i(c){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=c,window.dispatchEvent(p),!p.defaultPrevented)throw c}return r.then(c=>{for(const p of c||[])p.status==="rejected"&&i(p.reason);return t().catch(i)})},ve="https://ridspyczkxwkcbmwndhm.supabase.co",zo="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHNweWN6a3h3a2NibXduZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzkwODAsImV4cCI6MjA5MzUxNTA4MH0.ppWbfEsrUdUL8sRPO3BPHWA-r12ueMgJ3C44n1FvK3o",ce=zo;async function Pe(e,t){try{const n=new URL(`/rest/v1/${e}`,ve),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function At(e,t){try{const n=new URL(`/rest/v1/${e}`,ve),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function je(e,t,n){try{const s=new URL(`/rest/v1/${e}?id=eq.${t}`,ve);return(await fetch(s.toString(),{method:"PATCH",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function ye(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,ve),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function Ya(e){try{const t=new URL(`/rest/v1/${e}`,ve);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:ce,Authorization:`Bearer ${ce}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const s=n.headers.get("Content-Range");if(s){const r=s.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function V(e,t={}){try{const n=new URL(`/rest/v1/${e}`,ve);Object.entries(t).forEach(([r,i])=>{n.searchParams.set(r,i)});const s=await fetch(n.toString(),{method:"GET",headers:{apikey:ce,Authorization:`Bearer ${ce}`,Accept:"application/json",Prefer:"return=representation"}});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function rs(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,ve);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:ce,Authorization:`Bearer ${ce}`}})).ok}catch{return!1}}async function be(e,t={},n=1e3){const s=[];let r=0;try{for(;;){const i=new URL(`/rest/v1/${e}`,ve);Object.entries(t).forEach(([u,h])=>{i.searchParams.set(u,h)}),i.searchParams.set("limit",String(n)),i.searchParams.set("offset",String(r));const c=await fetch(i.toString(),{method:"GET",headers:{apikey:ce,Authorization:`Bearer ${ce}`,Accept:"application/json",Prefer:"return=representation"}});if(!c.ok)throw new Error(`HTTP ${c.status}`);const p=await c.json();if(s.push(...p),p.length<n)break;r+=n}return s}catch(i){return console.warn(`Failed to query all rows from Supabase table ${e}`,i),s.length>0?s:[]}}const te=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:ce,SUPABASE_URL:ve,supabaseCount:Ya,supabaseDelete:rs,supabaseInsert:Pe,supabaseQuery:V,supabaseQueryAll:be,supabaseRpc:ye,supabaseUpdate:je,supabaseUpsert:At},Symbol.toStringTag,{value:"Module"})),Ja="sake_auth";function is(e){localStorage.setItem(Ja,JSON.stringify(e))}function ls(){return{apikey:ce,"Content-Type":"application/json"}}function Fo(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),s=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(s))}catch{return null}}async function cs(e,t){const n=await fetch(`${ve}/auth/v1/${e}`,{method:"POST",headers:ls(),body:JSON.stringify(t)}),s=await n.json().catch(()=>({}));if(!n.ok)throw new Error(s.error_description??s.msg??`HTTP ${n.status}`);return s}async function Vo(e,t){const n=await cs("token?grant_type=password",{email:e,password:t});return is({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function bn(e,t){const n=await cs("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&is({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Uo(){const e=ra();if(localStorage.removeItem(Ja),!!e?.access_token)try{await fetch(`${ve}/auth/v1/logout`,{method:"POST",headers:{...ls(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function ra(){const e=localStorage.getItem(Ja);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function Yo(){const e=ra();if(!e)return null;const t=Fo(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function Jo(e){const t=ra();if(!t)throw new Error("not signed in");const n=await fetch(`${ve}/auth/v1/user`,{method:"PUT",headers:{apikey:ce,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const s=await n.json().catch(()=>({}));throw new Error(s.msg??`HTTP ${n.status}`)}}const Ka={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},ds={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},Ko={generatedAt:new Date().toISOString(),records:[]},Ue={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},Ho={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},Qo={},Wo={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function ie(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function Go(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Xo(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function b(e,t,n=""){for(const s of t){const r=e[s];if(typeof r=="string"&&r.length>0)return r}return n}function T(e,t,n=0){for(const s of t)if(s in e)return ie(e[s]);return n}function we(e,t,n=!0){for(const s of t)if(s in e)return Xo(e[s]);return n}function fe(e,t,n){for(const s of t){const r=e[s];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const i=new Date(r);if(!Number.isNaN(i.getTime()))return i.toISOString()}return n}function Zo(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:fe(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:ie(e.total_amount??e.billed_amount)}}function wn(e){const t=e.trim().toUpperCase(),n=Qo[t];if(n)return n;const s=ds.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function ps(e){try{return(await V("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function st(e,t){await At("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function us(){const e=new Date;e.setFullYear(e.getFullYear()-1);const t=e.toISOString().slice(0,10),n=await V("daily_sales_fact",{select:"sales_date,sales_amount,total_quantity,document_count",order:"sales_date.desc",sales_date:`gte.${t}`,limit:"400"}),s=new Map;for(const i of n){const c=String(i.sales_date??"");if(!c)continue;const p=s.get(c)??{amount:0,qty:0,docs:0};p.amount+=ie(i.sales_amount),p.qty+=ie(i.total_quantity),p.docs+=ie(i.document_count),s.set(c,p)}const r=Array.from(s.entries()).map(([i,c])=>({sales_date:i,sales_amount:c.amount,amount:c.amount,document_count:c.docs,bottles:c.qty,volume_ml:0,price_per_bottle:c.qty>0?Math.round(c.amount/c.qty):0,price_per_liter:0})).sort((i,c)=>c.sales_date.localeCompare(i.sales_date));if(r.length>0){const i=new Date().toISOString().slice(0,7);fs(i).catch(()=>{});const[c,p]=await Promise.all([V("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),V("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),h=new Date().toISOString().slice(0,10),f=h.slice(0,7),g=[...r].sort((S,o)=>S.sales_date.localeCompare(o.sales_date)).map(S=>({date:new Date(`${S.sales_date}T00:00:00Z`).toISOString(),amount:ie(S.amount??S.sales_amount),bottles:ie(S.bottles),volumeMl:ie(S.volume_ml),pricePerBottle:ie(S.price_per_bottle),pricePerLiter:ie(S.price_per_liter)})),$=g.slice(-30),A=S=>ie(S.amount??S.sales_amount),_=r.reduce((S,o)=>o.sales_date===h?S+A(o):S,0),D=r.reduce((S,o)=>o.sales_date.startsWith(f)?S+A(o):S,0),P=c.filter(S=>ie(S.balance_amount)>0),L=p.map((S,o)=>({id:String(S.id??`sale-${o+1}`),documentNo:S.document_no??S.legacy_document_no??"",date:S.sales_date??"",customerCode:S.legacy_customer_code??"",customerName:S.customer_name??S.legacy_customer_code??"",amount:ie(S.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:_,todayDelta:0,monthSales:D,monthDelta:0,unpaidCount:P.length,unpaidAmount:P.reduce((S,o)=>S+ie(o.balance_amount),0)},dailySales:$,allDailySales:g,salesRecords:L}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),ds}async function ms(){const e=await V("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status",limit:"1000"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const s=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:ie(t.billed_amount),paymentAmount:ie(t.paid_amount),balanceAmount:ie(t.balance_amount),lastPaymentDate:null,status:Go(t.payment_status)}})}:Ko}async function Ha(){const[e,t]=await Promise.all([V("customers",{limit:"1000"}),V("products",{limit:"1000"})]);if(e.length>0||t.length>0){const n=e.length?e.map((r,i)=>{const c=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:b(r,["id","customer_id","code"],`customer-${i+1}`),code:b(r,["code","customer_code","legacy_customer_code"],`C${String(i+1).padStart(4,"0")}`),name:b(r,["name","customer_name","display_name"],`Customer ${i+1}`),kanaName:b(r,["kana_name"],""),shortName:b(r,["short_name"],""),postalCode:b(r,["postal_code"],""),address1:b(r,["address1"],""),address2:b(r,["address2"],""),phone:b(r,["phone"],""),fax:b(r,["fax"],""),email:b(r,["email"],""),staffCode:b(r,["staff_code"],""),businessType:b(r,["business_type"],""),areaCode:b(r,["delivery_area_code"],""),salesCategory:String(c.sales_category??""),closingDay:T(r,["closing_day","close_day"],31),paymentDay:T(r,["payment_day","due_day"],15),paymentMonth:Number(c.payment_month??0),paymentCycle:b(r,["payment_cycle"],""),billingCycleType:b(r,["billing_cycle_type"],""),billingCode:String(c.billing_code??""),creditLimit:T(r,["credit_limit"],0),taxMode:b(r,["tax_mode"],""),taxRound:String(c.tax_round??""),invoiceIssue:String(c.invoice_issue??""),invoiceType:b(r,["invoice_type"],""),priceGroup:String(c.price_group??""),priceType:String(c.price_type??""),tradeType:(()=>{const p=b(r,["trade_type"],"");if(p)return p;const u=String(c.price_type??"");return u==="000"?"B2B2C":u==="001"?"B2C":"B2B"})(),customerGroup1:String(c.customer_group1??""),customerGroup2:String(c.customer_group2??""),bankName:b(r,["bank_name"],""),bankBranch:b(r,["bank_branch"],""),bankAccount:b(r,["bank_account"],""),isActive:we(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):Ue.customers,s=t.length?t.map((r,i)=>({id:b(r,["id","product_id","product_code","legacy_product_code"],`product-${i+1}`),code:b(r,["product_code","legacy_product_code","code"],`P${String(i+1).padStart(5,"0")}`),janCode:b(r,["jan_code","jan","barcode"],""),name:b(r,["name","product_name","display_name"],`Product ${i+1}`),kanaName:b(r,["kana_name"],""),shortName:b(r,["short_name"],""),category:b(r,["category_code","category","category_name"],"未分類"),taxCategoryCode:b(r,["tax_code","tax_category_code"],""),isActive:we(r,["is_active","active","enabled"],!0),listPrice:T(r,["list_price"],0),purchasePrice:T(r,["purchase_price"],0),salePrice:T(r,["default_sale_price","sale_price"],0),costPrice:T(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:b(r,["unit_name","unit"],"本"),caseQty:r.case_qty!=null?Number(r.case_qty):null,bottleType:b(r,["bottle_type"],""),containerCode:b(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:b(r,["rice_type"],""),season:b(r,["season"],""),agingYears:T(r,["aging_years"],0)})):Ue.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||Ue.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:Ue.summary.activeCustomerCount,productCount:t.length||Ue.summary.productCount,activeProductCount:t.length?s.filter(r=>r.isActive).length:Ue.summary.activeProductCount},customers:n,products:s}}return Ue}async function ys(){const[e,t]=await Promise.all([V("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),V("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?fe(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const s=e[0],r=b(s,["status"],"success"),i=s.errors,c=Array.isArray(i)?i.length>0:!!i;return{generatedAt:new Date().toISOString(),lastSyncAt:fe(s,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:c?"warning":r==="error"?"error":"success",jobName:b(s,["agent_hostname"],"sake-relay"),message:`${T(s,["rows_upserted"],0)}行同期 / ${T(s,["files_updated"],0)}ファイル更新`}}return{...Ho,lastDataAt:n}}async function hs(){const e=await ye("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function gs(){const e=[{name:"売上明細 (SHTOR)",table:"sales_document_lines",countFilter:"note=like.*src:diff*",expectMin:2e5},{name:"伝票ヘッダ (SHDEN)",table:"sales_document_headers",expectMin:5e4},{name:"日次売上集計",table:"daily_sales_fact",expectMin:1e5},{name:"商品月別売上",table:"product_monthly_sales",expectMin:1e4},{name:"得意先マスタ",table:"customers",expectMin:500},{name:"商品マスタ",table:"products",expectMin:1e3},{name:"安全在庫",table:"product_safety_stock_params",expectMin:0}],t=[];for(const n of e)try{const s=n.countFilter?`&${n.countFilter}`:"",r=`${ve}/rest/v1/${n.table}?select=id&limit=0${s}`,c=(await fetch(r,{headers:{apikey:ce,Authorization:`Bearer ${ce}`,Prefer:"count=exact"}})).headers.get("content-range")??"*/0",p=parseInt(c.split("/").pop()??"0",10)||0,u=p>=n.expectMin?"ok":p>0?"warn":"error";t.push({name:n.name,table:n.table,count:p,status:u,detail:p>=n.expectMin?"正常稼働":p>0?"データ少":"データなし"})}catch{t.push({name:n.name,table:n.table,count:0,status:"error",detail:"接続エラー"})}return t}async function kt(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];if(e.customerCode.trim()){const r=e.customerCode.trim();n.push(`customer_code.ilike.*${r}*`,`legacy_customer_code.ilike.*${r}*`,`customer_name.ilike.*${r}*`)}e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const s=await V("sales_document_headers",t);return s.length>0?s.map((r,i)=>({id:b(r,["id"],`invoice-${i}`),documentNo:b(r,["document_no","legacy_document_no"],""),date:fe(r,["sales_date"],""),customerCode:b(r,["legacy_customer_code","customer_code"],""),customerName:b(r,["customer_name","legacy_customer_code"],""),itemCount:T(r,["line_count"],0),amount:T(r,["total_amount","billed_amount"],0)})):[]}const xt=new Map;async function fs(e){xt.clear();const t=await be("sales_document_lines",{select:"document_no,line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*date:${e}*`,order:"document_no,line_no"});for(const n of t){const s=b(n,["document_no"],"");if(!s)continue;const r=xt.get(s)??[];r.push({lineNo:T(n,["line_no"],0),productCode:b(n,["legacy_product_code"],""),productName:b(n,["product_name"],""),quantity:T(n,["quantity"],0),unitPrice:T(n,["unit_price"],0),amount:T(n,["amount"],0)}),xt.set(s,r)}}async function Ca(e){const t=xt.get(e);if(t)return t;const s=(await V("sales_document_lines",{select:"line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*inv:${e} *`,order:"line_no",limit:"100"})).map(r=>({lineNo:T(r,["line_no"],0),productCode:b(r,["legacy_product_code"],""),productName:b(r,["product_name"],""),quantity:T(r,["quantity"],0),unitPrice:T(r,["unit_price"],0),amount:T(r,["amount"],0)}));return xt.set(e,s),s}async function Qa(e){const t=e.trim().toUpperCase();if(!t)return wn("");const[n,s,r]=await Promise.all([V("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t},customer_name.ilike.*${t}*`,order:"sales_date.desc",limit:"50"}),V("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),V("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||s.length>0){const i=n.map((u,h)=>{const f=Zo(u,h);return{id:f.id,date:f.date,documentNo:f.documentNo,amount:f.amount}}),c=s.map((u,h)=>({id:String(u.id??`payment-${h+1}`),date:fe(u,["payment_date","received_date"],new Date().toISOString()),amount:ie(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),p=r.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:ie(p?.balance_amount),salesTotal:i.reduce((u,h)=>u+h.amount,0),paymentTotal:c.reduce((u,h)=>u+h.amount,0),salesHistory:i,paymentHistory:c}}return wn(t)}async function Wa(){const[e,t,n,s]=await Promise.all([V("mv_monthly_sales",{order:"month.asc"}),V("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),V("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),V("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(r=>({month:b(r,["month"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),volumeMl:T(r,["volume_ml"],0)})),productTotals:n.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})),customerTotals:t.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})),staffTotals:s.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:0}))}:Wo}async function er(e,t,n){if(t==="all")return[];const s=n?vs(t,n):null,i=await ye(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:s?.from??null,p_date_to:s?.to??null});return i?i.map(c=>({code:b(c,["code"],""),name:b(c,["name"],""),amount:T(c,["amount"],0),quantity:T(c,["quantity"],0),documents:T(c,["documents"],0),volumeMl:T(c,["volume_ml"],0)})):[]}async function tr(e,t){if(t==="all")return[];const n=await ye("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(s=>s.period_val).filter(Boolean)}function vs(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,s]=t.split("-").map(Number),r=`${n}-${String(s).padStart(2,"0")}-01`,i=new Date(n,s,0).getDate(),c=`${n}-${String(s).padStart(2,"0")}-${String(i).padStart(2,"0")}`;return{from:r,to:c}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const s=parseInt(n[1]),r=parseInt(n[2]),i=new Date(s,0,4),c=i.getDay()||7,p=new Date(i);p.setDate(i.getDate()-c+1);const u=new Date(p);u.setDate(p.getDate()+(r-1)*7);const h=new Date(u);return h.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:h.toISOString().slice(0,10)}}return null}function bs(e){return e.map(t=>({staffCode:b(t,["staff_code"],""),staffName:b(t,["staff_name"],""),code:b(t,["code"],""),name:b(t,["name"],""),tag:b(t,["tag"],""),amount:T(t,["amount"],0),quantity:T(t,["quantity"],0),documents:T(t,["documents"],0)}))}async function ar(e,t){const n=await ye("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(s=>({code:b(s,["code"],""),name:b(s,["name"],""),amount:T(s,["amount"],0),quantity:T(s,["quantity"],0),documents:T(s,["documents"],0)})):[]}async function nr(e,t,n){const s=await ye("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?bs(s):[]}async function sr(e,t,n){const s=await ye("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?bs(s):[]}async function or(e,t){if(e==="all"||!t)return[];const n=await ye("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(s=>({month:b(s,["label"],""),amount:T(s,["amount"],0),quantity:T(s,["quantity"],0),volumeMl:T(s,["volume_ml"],0)})):[]}function rr(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function ir(e,t,n){const s=await ye("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),tag:b(r,["tag"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})):[]}async function lr(e,t,n){const s=await ye("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),tag:b(r,["tag"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})):[]}async function cr(e,t){const n=await ye("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(s=>({month:b(s,["month"],""),amount:T(s,["amount"],0),quantity:T(s,["quantity"],0),volumeMl:T(s,["volume_ml"],0)})):[]}async function dr(e,t){const n=await ye("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:b(s,["brew_category"],""),subCategory:b(s,["sub_category"],""),productCount:T(s,["product_count"],0),totalShipmentQty:T(s,["total_shipment_qty"],0),totalShipmentMl:T(s,["total_shipment_ml"],0),monthlyAvgQty:T(s,["monthly_avg_qty"],0),monthlyAvgMl:T(s,["monthly_avg_ml"],0),currentStockL:T(s,["current_stock_l"],0),monthsRemaining:T(s,["months_remaining"],0),costPerL:T(s,["cost_per_l"],0)})):[]}async function pr(e,t){const n=await ye("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({month:b(s,["month"],""),brewCategory:b(s,["brew_category"],""),shipmentMl:T(s,["shipment_ml"],0)})):[]}async function ur(e,t){const n=await ye("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:b(s,["brew_category"],""),subCategory:b(s,["sub_category"],""),productCode:b(s,["product_code"],""),productName:b(s,["product_name"],""),volumeMl:T(s,["volume_ml"],0),annualQty:T(s,["annual_qty"],0),annualMl:T(s,["annual_ml"],0),monthlyAvgQty:T(s,["monthly_avg_qty"],0),monthlyAvgMl:T(s,["monthly_avg_ml"],0)})):[]}async function mr(e){return(await V("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:b(n,["id"],""),brewCategory:b(n,["brew_category"],""),fy:T(n,["fy"],e),brewMonth:T(n,["brew_month"],0),durationMonths:T(n,["duration_months"],2),plannedVolumeL:T(n,["planned_volume_l"],0),notes:b(n,["notes"],"")}))}async function yr(e,t,n){return await ye("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(r=>({brew_month:r.brewMonth,duration_months:r.durationMonths,planned_volume_l:r.plannedVolumeL,notes:r.notes??null}))})!==null}async function hr(e,t,n,s){return await At("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:s??null,updated_at:new Date().toISOString()})!==null}async function gr(){const e=await V("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const s=b(n,["category_name"],""),r=b(n,["production_type_name"],"");!s||!r||(t[s]||(t[s]=[]),t[s].push(r))}return t}async function fr(e,t){return await ye("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function vr(e,t){return await ye("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function br(){const e=await V("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>b(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function wr(){const e=await V("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const s=b(n,["brew_category"],"");s&&(t[s]={brewCategory:s,rawAlcoholPct:T(n,["raw_alcohol_pct"],18),targetAlcoholPct:T(n,["target_alcohol_pct"],15)})}return t}async function xr(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}},void 0);return r?(await fetch(`${s}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function $r(){const e=await ye("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:T(t,["fy"],0),brewCategory:b(t,["brew_category"],""),shipmentL:T(t,["shipment_l"],0),monthsElapsed:T(t,["months_elapsed"],12),annualizedL:T(t,["annualized_l"],0)})):[]}async function _r(){const e=await V("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const s=b(n,["brew_category"],""),r=T(n,["growth_rate"],NaN);s&&!isNaN(r)&&(t[s]=r)}return t}async function Sr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function kr(){const e=await V("brewing_rice_params",{}),t={};for(const n of e??[]){const s=b(n,["brew_category"],"");s&&(t[s]={brewCategory:s,polishingRatio:T(n,["polishing_ratio"],.7),ricePerLiterKg:T(n,["rice_per_liter_kg"],.5),kojiRatio:T(n,["koji_ratio"],.3),kojiVariety:b(n,["koji_variety"],"山田錦"),kojiPricePerKg:T(n,["koji_price_per_kg"],600),kakeVariety:b(n,["kake_variety"],"一般米"),kakePricePerKg:T(n,["kake_price_per_kg"],350),alcoholAdditionRatio:T(n,["alcohol_addition_ratio"],0)})}return t}async function Pr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,koji_ratio:t.kojiRatio,koji_variety:t.kojiVariety,koji_price_per_kg:t.kojiPricePerKg,kake_variety:t.kakeVariety,kake_price_per_kg:t.kakePricePerKg,alcohol_addition_ratio:t.alcoholAdditionRatio??0,updated_at:new Date().toISOString()})})).ok:!1}async function Er(){const e=await ye("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:b(t,["brew_category"],""),monthNum:T(t,["month_num"],0),avgMonthlyL:T(t,["avg_monthly_l"],0)})):[]}async function Ar(e){const t=await V("procurement_decisions",{fy:`eq.${e}`}),n={};for(const s of t??[]){const r=b(s,["brew_category"],""),i=T(s,["decided_brewing_l"],-1);r&&i>=0&&(n[r]=i)}return n}async function Lr(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}},void 0);return r?(await fetch(`${s}/rest/v1/procurement_decisions`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,fy:t,decided_brewing_l:n,updated_at:new Date().toISOString()})})).ok:!1}async function Cr(e){return(await V("brewing_process_batches",{fy:`eq.${e}`,order:"start_date.asc.nullsfirst"})??[]).map(n=>({id:b(n,["id"],""),brewCategory:b(n,["brew_category"],""),batchCode:b(n,["batch_code"],""),fy:T(n,["fy"],e),plannedVolumeL:T(n,["planned_volume_l"],0),tankNo:b(n,["tank_no"],""),status:b(n,["status"],"planned"),startDate:b(n,["start_date"],""),targetEndDate:b(n,["target_end_date"],""),notes:b(n,["notes"],"")}))}async function Dr(e){return e.length===0?[]:(await V("brewing_process_steps",{batch_id:`in.(${e.join(",")})`,order:"batch_id.asc,step_order.asc"})??[]).map(n=>({id:b(n,["id"],""),batchId:b(n,["batch_id"],""),stepOrder:T(n,["step_order"],0),stepName:b(n,["step_name"],""),plannedStart:b(n,["planned_start"],""),plannedEnd:b(n,["planned_end"],""),actualStart:b(n,["actual_start"],""),actualEnd:b(n,["actual_end"],""),status:b(n,["status"],"未着手"),temperature:n.temperature!=null?T(n,["temperature"],0):null,notes:b(n,["notes"],"")}))}function qr(e,t){const n=new Date(e);let s=0;for(;s<t;)n.setDate(n.getDate()+1),n.getDay()!==0&&s++;return n}function Tr(e,t){const n=new Date(e);let s=t-1;for(;s>0;)n.setDate(n.getDate()+1),n.getDay()!==0&&s--;return n.getDay()===0&&n.setDate(n.getDate()+1),n}function xn(e){return e.getDay()===0&&e.setDate(e.getDate()+1),e}const Yt=[{name:"洗米・浸漬",days:1},{name:"蒸米",days:1},{name:"製麹",days:2},{name:"酒母",days:14},{name:"仕込み(添/仲/留)",days:4},{name:"醪管理",days:25},{name:"上槽",days:2},{name:"濾過・火入れ",days:1},{name:"貯蔵",days:30},{name:"瓶詰め",days:1}];async function Ir(e,t,n,s,r){const c=n[s],p=c?.ricePerLiterKg??.5,u=c?.kojiRatio??.3,h=c?.polishingRatio??.7,f=c?.alcoholAdditionRatio??0,g=Math.round(t*(1-f)*p*u/h),$=r.filter(_=>_.stepName==="製麹"&&_.plannedStart&&_.plannedEnd);let A=new Date(e);for(let _=0;_<60;_++){const D=new Date(A.getTime()+1728e5),P=new Date(A.getTime()+3*864e5);let L=0;for(const S of $){const o=new Date(S.plannedStart).getTime(),l=new Date(S.plannedEnd).getTime();D.getTime()<=l&&P.getTime()>=o&&(L+=180)}if(L+g<=180)return A.toISOString().slice(0,10);A=new Date(A.getTime()+864e5)}return A.toISOString().slice(0,10)}async function Nr(e,t,n,s,r,i,c){let p=r;i&&c&&(p=await Ir(r,s,c,e,i));const u=await Pe("brewing_process_batches",{brew_category:e,batch_code:t,fy:n,planned_volume_l:s,start_date:p});if(!u?.id)return null;let h=xn(new Date(p));for(let f=0;f<Yt.length;f++){h=xn(h);const g=h.toISOString().slice(0,10),$=Tr(h,Yt[f].days),A=$.toISOString().slice(0,10);await Pe("brewing_process_steps",{batch_id:u.id,step_order:f+1,step_name:Yt[f].name,planned_start:g,planned_end:A}),h=qr($,1)}return await je("brewing_process_batches",u.id,{target_end_date:h.toISOString().slice(0,10)}),u.id}async function Mr(e,t){return je("brewing_process_steps",e,t)}async function Rr(e,t){return je("brewing_process_batches",e,{...t,updated_at:new Date().toISOString()})}async function Or(){return(await V("tanks",{order:"tank_no"})??[]).map(t=>({id:b(t,["id"],""),tankNo:b(t,["tank_no"],""),displayName:b(t,["display_name"],""),capacityL:T(t,["capacity_l"],0),tankType:b(t,["tank_type"],""),status:b(t,["status"],"empty"),preferredCategories:Array.isArray(t.preferred_categories)?t.preferred_categories:[],cleanupDays:T(t,["cleanup_days"],1)}))}async function Br(e,t,n,s){return await Pe("tanks",{tank_no:e,display_name:e,capacity_l:t,tank_type:n,preferred_categories:s,status:"empty"})!==null}async function jr(e){const{supabaseDelete:t}=await I(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>te);return{supabaseDelete:n}},void 0);return t("tanks",e)}function zr(e,t){const n=e.find(i=>i.stepName==="仕込み(添/仲/留)"),s=e.find(i=>i.stepName==="上槽");if(!n?.plannedStart||!s?.plannedEnd)return null;const r=new Date(s.plannedEnd);return r.setDate(r.getDate()+t),{start:n.plannedStart,end:r.toISOString().slice(0,10)}}async function Fr(e,t,n,s){const r=new Map(n.map(P=>[P.stepName,P])),i=s??[],c=e.filter(P=>P.status!=="completed"&&P.startDate).sort((P,L)=>P.startDate.localeCompare(L.startDate));if(c.length===0)return;const p=t.deadlineDate||"",u=t.allowSunday&&!!p,h=new Map,f=(P,L)=>{const S=new Date(P);return S.setDate(S.getDate()+L),S.toISOString().slice(0,10)},g=(P,L,S,o)=>P<=o&&L>=S,$=P=>L=>(!P&&L.getDay()===0&&L.setDate(L.getDate()+1),L),A=(P,L,S)=>{const o=new Date(P);let l=L-1;for(;l>0;)o.setDate(o.getDate()+1),(S||o.getDay()!==0)&&l--;return!S&&o.getDay()===0&&o.setDate(o.getDate()+1),o},_=(P,L)=>{const S=new Date(P);return S.setDate(S.getDate()+1),!L&&S.getDay()===0&&S.setDate(S.getDate()+1),S},D=()=>{const P=new Map;for(const L of h.values())for(const S of L){const o=r.get(S.stepName);if(!o)continue;const l=Math.max(Math.round((new Date(S.end).getTime()-new Date(S.start).getTime())/864e5)+1,1);let d=0;for(let y=0;y<l;y++){const w=new Date(S.start);w.setDate(w.getDate()+y),w.getDay()!==0&&d++}if(d===0)continue;const m=o.laborHours/d;for(let y=0;y<l;y++){const w=new Date(S.start);if(w.setDate(w.getDate()+y),w.getDay()===0)continue;const v=new Date(w);v.setDate(v.getDate()+3-(v.getDay()+6)%7);const x=new Date(v.getFullYear(),0,4),k=1+Math.round(((v.getTime()-x.getTime())/864e5-3+(x.getDay()+6)%7)/7),C=`${v.getFullYear()}-W${String(k).padStart(2,"0")}`;P.set(C,(P.get(C)??0)+m)}}return P};for(const P of c){let L=P.startDate;for(let d of[!1,...u?[!0]:[]]){L=P.startDate;for(let y=0;y<90;y++){L=$(d)(new Date(L)).toISOString().slice(0,10);const v=[];let x=new Date(L);for(const N of Yt){x=$(d)(x);const z=x.toISOString().slice(0,10),B=A(x,N.days,d),R=B.toISOString().slice(0,10);v.push({stepName:N.name,start:z,end:R}),x=_(B,d)}const k=v.find(N=>N.stepName==="製麹");let C=!1;if(k)for(const[N,z]of h){const B=z.find(R=>R.stepName==="製麹");if(B&&g(k.start,k.end,B.start,B.end)){C=!0;break}}if(C){L=f(L,1);continue}h.set(P.id,v);const q=D(),M=t.workerCount*t.weeklyHoursLimit;let j=!1;for(const N of q.values())if(N>M*1.1){j=!0;break}if(j){h.delete(P.id),L=f(L,1);continue}if(i.length>0){const N=v.find(B=>B.stepName==="仕込み(添/仲/留)"),z=v.find(B=>B.stepName==="上槽");if(N&&z){const B=N.start,R=new Date(z.end);R.setDate(R.getDate()+1);const Y=R.toISOString().slice(0,10),Q=i.filter(W=>W.capacityL>=P.plannedVolumeL&&(W.preferredCategories.length===0||W.preferredCategories.includes(P.brewCategory)));let X=!1;for(const W of Q){let H=!1;for(const[G,Z]of h){if(G===P.id||e.find(K=>K.id===G)?.tankNo!==W.tankNo)continue;const J=Z.find(K=>K.stepName==="仕込み(添/仲/留)"),U=Z.find(K=>K.stepName==="上槽");if(J&&U){const K=f(U.end,W.cleanupDays);if(g(B,Y,J.start,K)){H=!0;break}}}if(!H){W.tankNo,X=!0;break}}if(!X){h.delete(P.id),L=f(L,1);continue}}}break}const m=h.get(P.id);if(p&&m){const y=m.find(w=>w.stepName==="仕込み(添/仲/留)");if(y&&y.end<=p)break;if(!d){h.delete(P.id);continue}}else break}const S=h.get(P.id);if(!S)continue;const o=(()=>{if(i.length===0)return P.tankNo;const d=S.find(v=>v.stepName==="仕込み(添/仲/留)"),m=S.find(v=>v.stepName==="上槽");if(!d||!m)return P.tankNo;const y=d.start,w=f(m.end,1);for(const v of i){if(v.capacityL<P.plannedVolumeL||v.preferredCategories.length>0&&!v.preferredCategories.includes(P.brewCategory))continue;let x=!1;for(const[k,C]of h){if(k===P.id||e.find(N=>N.id===k)?.tankNo!==v.tankNo)continue;const M=C.find(N=>N.stepName==="仕込み(添/仲/留)"),j=C.find(N=>N.stepName==="上槽");if(M&&j&&g(y,w,M.start,f(j.end,v.cleanupDays))){x=!0;break}}if(!x)return v.tankNo}return P.tankNo})();await je("brewing_process_batches",P.id,{start_date:L,tank_no:o,target_end_date:f(S[S.length-1].end,0),updated_at:new Date().toISOString()});const l=await V("brewing_process_steps",{batch_id:`eq.${P.id}`,order:"step_order.asc"});if(l)for(const d of l){const m=T(d,["step_order"],0),y=S[m-1];if(y){const w=b(d,["id"],"");await je("brewing_process_steps",w,{planned_start:y.start,planned_end:y.end})}}}}async function Vr(){const t=(await V("brewing_worker_settings",{limit:"1"})??[])[0];return t?{workerCount:T(t,["worker_count"],2),weeklyHoursLimit:T(t,["weekly_hours_limit"],40),dayStartHour:T(t,["day_start_hour"],6),deadlineDate:b(t,["deadline_date"],""),allowSunday:t.allow_sunday===!0}:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1}}async function Ur(e){const t=await V("brewing_worker_settings",{limit:"1"});if(t&&t.length>0){const n=b(t[0],["id"],"");return je("brewing_worker_settings",n,{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday,updated_at:new Date().toISOString()})}return await Pe("brewing_worker_settings",{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday})!==null}async function Yr(){return(await V("brewing_step_labor",{order:"step_name"})??[]).map(t=>({stepName:b(t,["step_name"],""),laborHours:T(t,["labor_hours"],4),workerCountNeeded:T(t,["worker_count_needed"],1)}))}function Jr(e,t){const n=new Map(t.map(r=>[r.stepName,r])),s=new Map;for(const r of e){if(!r.plannedStart||!r.plannedEnd)continue;const i=n.get(r.stepName);if(!i)continue;const c=new Date(r.plannedStart),p=new Date(r.plannedEnd),u=Math.max(Math.round((p.getTime()-c.getTime())/864e5)+1,1),h=i.laborHours/u;for(let f=new Date(c);f<=p;f=new Date(f.getTime()+864e5)){const g=new Date(f);g.setDate(g.getDate()+3-(g.getDay()+6)%7);const $=new Date(g.getFullYear(),0,4),A=1+Math.round(((g.getTime()-$.getTime())/864e5-3+($.getDay()+6)%7)/7),_=`${g.getFullYear()}-W${String(A).padStart(2,"0")}`;s.set(_,(s.get(_)??0)+h)}}return s}async function Kr(e){return(await V("rice_purchase_commitments",{fy:`eq.${e}`,order:"variety_name.asc"})??[]).map(n=>({id:b(n,["id"],""),varietyName:b(n,["variety_name"],""),committedBales:T(n,["committed_bales"],0),pricePerKg:T(n,["price_per_kg"],0),supplier:b(n,["supplier"],""),deliveryMonth:T(n,["delivery_month"],0)||null,fy:T(n,["fy"],e),notes:b(n,["notes"],"")}))}async function Hr(e){return await Pe("rice_purchase_commitments",{variety_name:e.varietyName,committed_bales:e.committedBales??0,price_per_kg:e.pricePerKg??0,supplier:e.supplier??"",delivery_month:e.deliveryMonth??null,fy:e.fy,notes:e.notes??""})!==null}async function Qr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/rice_purchase_commitments?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function Wr(){return(await V("rice_varieties",{order:"sort_order.asc,name.asc"})??[]).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),defaultPricePerKg:T(t,["default_price_per_kg"],400),region:b(t,["region"],"")}))}async function Gr(e,t,n=""){return await Pe("rice_varieties",{name:e,default_price_per_kg:t,region:n})!==null}async function Xr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/rice_varieties?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function Zr(e){return(await V("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:b(n,["id"],""),brewCategory:b(n,["brew_category"],""),label:b(n,["label"],""),volumeL:T(n,["volume_l"],0)}))}async function ei(){return(await V("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:b(t,["id"],""),brewCategory:b(t,["brew_category"],""),label:b(t,["label"],""),volumeL:T(t,["volume_l"],0)}))}async function ti(e,t,n){return await Pe("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function ai(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function ni(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function si(){return(await V("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:b(t,["name"],""),parentCategory:b(t,["parent_category"],"")})).filter(t=>t.name)}async function oi(e,t){return await Pe("brewing_custom_categories",{name:e,parent_category:t})!==null}async function ri(e){const t=await ye("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:b(n,["production_type_name"],""),count:T(n,["product_count"],0)})).filter(n=>n.name):[]}async function ii(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function li(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);if(!s)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function ci(){const e=await V("brewing_category_overrides",{}),t={};for(const n of e??[]){const s=b(n,["product_code"],""),r=b(n,["brew_category"],"");s&&r&&(t[s]=r)}return t}async function di(e){return(await V("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>b(n,["product_code"],"")).filter(Boolean)}async function pi(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);if(!s)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}}),t.length===0)return!0;const r=t.map(c=>({year_month:e,product_code:c}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(r)})).ok}catch{return!1}}const Da={sales:"売上",return:"返品",export_return:"輸出戻入"};async function ws(e){const t=e.lines.reduce((r,i)=>r+i.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Pe("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const $n={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function Ga(e){const t=await V("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],s=ie(n.total_amount);return{documentNo:e,invoiceDate:b(n,["sales_date","document_date"],""),customerCode:b(n,["legacy_customer_code","customer_code"],""),customerName:b(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...$n,documentNo:e||$n.documentNo}}const ui={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function Xa(e){const t=await V("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const i=T(r,["sales_amount"],0),c=T(r,["tax_amount"],0);return{customerCode:b(r,["customer_code"],""),customerName:b(r,["customer_name"],""),closingDay:31,salesAmount:i,taxAmount:c,prevBalance:0,paymentAmount:0,billingAmount:i,status:"open"}}),s=n.reduce((r,i)=>r+i.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:s,customers:n}}return{...ui,targetYearMonth:e}}const mi={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function xs(){const[e,t,n]=await Promise.all([V("mv_monthly_sales",{order:"month.asc"}),V("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),V("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return mi;const s=e.slice(-12).map(u=>b(u,["month"],"")),r=new Map;t.forEach(u=>{const h=b(u,["code"],"");r.has(h)||r.set(h,{name:b(u,["name"],h),monthValues:new Map}),r.get(h).monthValues.set(b(u,["month"],""),T(u,["amount"],0))});const c=Array.from(r.entries()).map(([u,h])=>({code:u,name:h.name,total:s.reduce((f,g)=>f+(h.monthValues.get(g)??0),0),monthValues:h.monthValues})).sort((u,h)=>h.total-u.total).slice(0,10).map(u=>({label:u.name,values:s.map(h=>u.monthValues.get(h)??0)})),p=n.map(u=>({label:b(u,["name"],""),values:s.map(()=>Math.round(T(u,["amount"],0)/s.length))}));return{generatedAt:new Date().toISOString(),months:s,salesByProduct:c,salesByCustomer:p,costSimulation:[]}}async function yi(){const e=await be("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const s=b(n,["code"],"");if(!s)return;const r=b(n,["month"],""),i=parseInt(r.slice(5,7))-1;if(i<0||i>11)return;let c=t.get(s);c||(c={name:b(n,["name"],s),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(s,c)),c.qty[i]+=T(n,["quantity"],0),c.amt[i]+=T(n,["amount"],0)}),Array.from(t.entries()).map(([n,s])=>({code:n,name:s.name,monthlyQuantity:s.qty,monthlyAmount:s.amt,totalQuantity:s.qty.reduce((r,i)=>r+i,0),totalAmount:s.amt.reduce((r,i)=>r+i,0)})).filter(n=>n.totalQuantity>0).sort((n,s)=>s.totalAmount-n.totalAmount)}async function hi(){return(await V("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:b(t,["product_code"],""),productName:b(t,["product_name"],""),forecastMonth:b(t,["forecast_month"],""),segment:b(t,["segment"],"monthly"),avgMonthly:T(t,["avg_monthly"],0),forecastQuantity:T(t,["forecast_quantity"],0),forecastAmount:T(t,["forecast_amount"],0),safetyStock:T(t,["safety_stock"],0),calculatedAt:fe(t,["calculated_at"],"")}))}async function gi(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await be("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(c=>String(c.id)).filter(Boolean);const s=await be("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(c=>{c.id&&r.set(String(c.id),c)});const i=[];return s.forEach(c=>{const p=String(c.header_id??c.document_header_id??""),u=r.get(p);if(!u)return;const h=u.sales_date??u.document_date??"";!h||h<t||i.push({date:h.slice(0,10),customerName:u.customer_name??"不明",productName:c.product_name??"不明",quantity:ie(c.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),i.sort((c,p)=>c.date.localeCompare(p.date))}async function fi(){const e=new Date().toISOString();return(await V("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:b(n,["id"],""),message:b(n,["message"],""),level:b(n,["level"],"info"),startsAt:fe(n,["starts_at"],""),endsAt:n.ends_at?fe(n,["ends_at"],""):null,dismissible:we(n,["dismissible"],!0)}))}async function vi(){const e=await be("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:b(t,["customer_code"],""),customer_name:b(t,["customer_name"],""),business_type:b(t,["business_type"],""),area_code:b(t,["area_code"],""),phone:b(t,["phone"],""),last_order_date:b(t,["last_order_date"],""),days_since_order:T(t,["days_since_order"],0),amount_12m:T(t,["amount_12m"],0),amount_3m:T(t,["amount_3m"],0),amount_this_month:T(t,["amount_this_month"],0),amount_last_year_same_month:T(t,["amount_last_year_same_month"],0),annual_revenue:T(t,["annual_revenue"],0),is_dormant:we(t,["is_dormant"],!1),is_at_risk:we(t,["is_at_risk"],!1)})):[]}async function bi(){return(await be("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:b(t,["customer_code"],""),customer_name:b(t,["customer_name"],""),phone:b(t,["phone"],""),address:b(t,["address"],""),area_code:b(t,["area_code"],""),business_type:b(t,["business_type"],""),priority_score:T(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:b(t,["last_order_date"],""),days_since_order:T(t,["days_since_order"],0),annual_revenue:T(t,["annual_revenue"],0),recommended_action:b(t,["recommended_action"],"")}))}async function wi(){return(await be("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:b(t,["product_code"],""),product_name:b(t,["product_name"],""),season_type:b(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:T(t,["avg_monthly_qty"],0)}))}async function xi(){return(await be("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:b(t,["product_code"],""),name:b(t,["product_name"],""),monthlyQuantity:[T(t,["m01"],0),T(t,["m02"],0),T(t,["m03"],0),T(t,["m04"],0),T(t,["m05"],0),T(t,["m06"],0),T(t,["m07"],0),T(t,["m08"],0),T(t,["m09"],0),T(t,["m10"],0),T(t,["m11"],0),T(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:T(t,["total_quantity"],0),totalAmount:T(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function $s(e,t,n){try{return await Pe("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function _s(e,t){return je("customers",e,t)}async function Ss(e,t){return je("products",e,t)}async function qa(e,t){const n=e.find(c=>c.code===t);n?.priceGroup;const s=n?.priceGroup||t;let r="";try{const c=await V("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});c[0]?.memo&&(r=(typeof c[0].memo=="string"?JSON.parse(c[0].memo):c[0].memo)?.price_type??"")}catch{}const i=new Map;if(s){const c=await V("customer_product_prices",{price_group:`eq.${s}`,select:"legacy_product_code,special_price"});for(const p of c)i.set(p.legacy_product_code,p.special_price)}return{priceType:r,priceGroup:s,individualPrices:i}}function Za(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function $i(){return(await V("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function _i(){return(await be("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Si(){return(await V("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function ot(e,t="billing",n="apr"){const s=await ye("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t,p_fiscal_type:n});return s?s.map(r=>({code:String(r.legacy_customer_code??""),name:String(r.customer_name??""),address:String(r.address1??""),yearAmount:Number(r.year_amount??0),sharePct:Number(r.share_pct??0),orderDays:Number(r.order_days??0),prevAmount:Number(r.prev_amount??0),growthRate:r.growth_rate!=null?Number(r.growth_rate):null,currentRank:String(r.current_rank??"C"),prevRank:String(r.prev_rank??"")})):[]}function en(e){if(!e)return null;if(/^\d{4}$/.test(e))return{dateFrom:`${e}-01-01`,dateTo:`${e}-12-31`};if(/^\d{4}-\d{2}$/.test(e)){const[t,n]=e.split("-").map(Number),s=new Date(t,n,0).getDate();return{dateFrom:`${e}-01`,dateTo:`${e}-${String(s).padStart(2,"0")}`}}return null}async function ks(e=""){const t=en(e),n=t?ye("get_abc_customer_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(_=>_??[]):V("mv_customer_abc",{order:"amount.desc"}),s=t?t.dateFrom.slice(0,7):(()=>{const _=new Date;return _.setMonth(_.getMonth()-11),`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[i,c]=await Promise.all([n,V("mv_customer_monthly_sales",{month:`gte.${s}`,order:"month.asc",limit:"10000"})]),p=c.filter(_=>b(_,["month"],"")<=r),u=i.map(_=>({code:b(_,["code"],""),name:b(_,["name"],""),amount:T(_,["amount"],0),documents:T(_,["documents"],0),ratio:T(_,["ratio"],0),cumRatio:T(_,["cum_ratio","cumRatio"],0),abcRank:b(_,["abc_rank","abcRank"],"C")})),h=u.slice(0,10),f=new Set(h.map(_=>_.code)),g=Es(s,r),$=new Map;p.forEach(_=>{const D=b(_,["code"],"");if(!f.has(D))return;const P=b(_,["month"],"");$.has(D)||$.set(D,new Map),$.get(D).set(P,T(_,["amount"],0))});const A=h.map(_=>({label:_.name,values:g.map(D=>$.get(_.code)?.get(D)??0)}));return{generatedAt:new Date().toISOString(),ranking:u,months:g,monthlyByCustomer:A}}async function Ps(e=""){const t=en(e),n=t?ye("get_abc_product_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(D=>D??[]):V("mv_product_abc",{order:"amount.desc"}),s=t?t.dateFrom.slice(0,7):(()=>{const D=new Date;return D.setMonth(D.getMonth()-11),`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[i,c]=await Promise.all([n,V("mv_product_monthly_shipments",{month:`gte.${s}`,order:"month.asc",limit:"10000"})]),p=c.filter(D=>b(D,["month"],"")<=r),h=i.map(D=>({code:b(D,["code"],""),name:b(D,["name"],""),amount:T(D,["amount"],0),quantity:T(D,["quantity"],0),documents:T(D,["documents"],0),ratio:T(D,["ratio"],0),cumRatio:T(D,["cum_ratio","cumRatio"],0),abcRank:b(D,["abc_rank","abcRank"],"C")})),f=h.reduce((D,P)=>D+P.amount,0),g=Es(s,r),$=new Set(h.filter(D=>D.abcRank==="A").slice(0,10).map(D=>D.code)),A=new Map;p.forEach(D=>{const P=b(D,["code"],"");if(!$.has(P))return;const L=b(D,["month"],"");A.has(P)||A.set(P,new Map),A.get(P).set(L,T(D,["amount"],0))});const _=Array.from($).map(D=>{const P=A.get(D);return{label:h.find(L=>L.code===D)?.name??D,values:g.map(L=>P?.get(L)??0)}});return{generatedAt:new Date().toISOString(),totalAmount:f,ranking:h,months:g,monthlyByProduct:_.length>0?_:[]}}function Es(e,t){const n=[],[s,r]=e.split("-").map(Number),[i,c]=t.split("-").map(Number);let p=s,u=r;for(;(p<i||p===i&&u<=c)&&(n.push(`${p}-${String(u).padStart(2,"0")}`),u++,u>12&&(u=1,p++),!(n.length>60)););return n}const As={planned:"計画中",active:"仕込中",done:"完了"};async function Ls(){const e=await V("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),jikomiNo:b(t,["batch_no","legacy_batch_no"],""),productName:b(t,["brand_name"],""),riceType:b(t,["rice_type"],""),plannedKg:T(t,["planned_rice_kg"],0),actualKg:T(t,["actual_rice_kg"],0),startDate:fe(t,["start_date"],""),expectedDoneDate:fe(t,["expected_done_date"],""),status:b(t,["status"],"planned"),tankNo:b(t,["tank_no"],""),note:b(t,["remarks"],"")})):[]}async function Cs(){const e=await V("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),tankNo:b(t,["tank_no"],""),capacity:T(t,["capacity_l"],0),currentVolume:T(t,["current_volume_l"],0),productName:b(t,["current_product_code"],""),jikomiNo:b(t,["current_batch_id"],""),status:b(t,["status"],"empty"),lastUpdated:fe(t,["last_updated_at"],"")})):[]}async function Ds(){const e=await V("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),kenteiNo:b(t,["kentei_no"],""),jikomiNo:b(t,["batch_id"],""),productName:b(t,["product_code"],""),kenteiDate:fe(t,["kentei_date"],""),alcoholDegree:T(t,["alcohol_degree"],0),extractDegree:T(t,["extract_degree"],0),sakaMeterValue:T(t,["sakemeter_value"],0),volume:T(t,["volume_l"],0),taxCategory:b(t,["tax_category_code"],""),status:b(t,["status"],"pending")})):[]}async function qs(){const e=await V("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),code:b(t,["material_code","legacy_material_code"],""),name:b(t,["name"],""),unit:b(t,["unit"],""),currentStock:T(t,["current_stock"],0),minimumStock:T(t,["minimum_stock"],0),unitCost:T(t,["unit_cost"],0),lastUpdated:fe(t,["updated_at"],"")})):[]}async function Ts(){const e=await V("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),documentNo:b(t,["document_no","legacy_document_no"],""),purchaseDate:fe(t,["purchase_date"],""),supplierCode:b(t,["supplier_code","legacy_supplier_code"],""),supplierName:b(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:T(t,["total_amount"],0),status:b(t,["payment_status"],"pending")})):[]}async function Is(){const e=await V("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:b(t,["supplier_code","legacy_supplier_code"],""),supplierName:b(t,["legacy_supplier_code"],""),totalPurchase:T(t,["total_purchase"],0),paidAmount:T(t,["paid_amount"],0),balance:T(t,["balance"],0),nextPaymentDate:fe(t,["next_payment_date"],""),status:b(t,["status"],"unpaid")})):[]}async function Ns(){const e=await V("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),billNo:b(t,["bill_no"],""),supplierName:b(t,["counterparty_name"],""),amount:T(t,["amount"],0),issueDate:fe(t,["issue_date"],""),dueDate:fe(t,["due_date"],""),status:b(t,["status"],"holding")})):[]}async function Ms(){const e=await V("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:b(t,["material_code","legacy_material_code"],""),name:b(t,["name"],""),unit:b(t,["unit"],""),currentStock:T(t,["current_stock"],0),minimumStock:T(t,["minimum_stock"],0),lastPurchaseDate:fe(t,["last_purchase_date"],""),unitCost:T(t,["unit_cost"],0)})):[]}const Rs=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],Ta={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},ki={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function tn(e,t){const n=await V("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const s=n[0],r=b(s,["id"],""),[i,c]=await Promise.all([V("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),V("tax_deductions",{declaration_id:`eq.${r}`})]),p=i.map(h=>({taxCategory:b(h,["tax_category_code"],""),taxCategoryName:b(h,["tax_category_name"],""),alcoholDegree:T(h,["alcohol_degree"],0),volume:T(h,["taxable_volume"],0),taxRate:T(h,["tax_rate"],0),taxAmount:T(h,["tax_amount"],0),productionVolume:T(h,["production_volume"],0),previousBalance:T(h,["previous_balance"],0),currentAdjustment:T(h,["current_adjustment"],0),exportDeduction:T(h,["export_deduction"],0),sampleDeduction:T(h,["sample_deduction"],0),taxableVolume:T(h,["taxable_volume"],0)})),u=c.map(h=>({type:b(h,["deduction_type"],"sample"),categoryCode:b(h,["tax_category_code"],""),volume:T(h,["volume"],0),reason:b(h,["reason"],""),documentNo:b(h,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:b(s,["company_name"],""),companyNo:b(s,["company_no"],""),companyAddress:b(s,["company_address"],""),companyRepresentative:b(s,["company_representative"],""),taxOffice:b(s,["tax_office"],""),rows:p,deductions:u,totalVolume:T(s,["total_taxable_volume"],0),totalTax:T(s,["total_tax_amount"],0),status:b(s,["status"],"draft"),submittedAt:b(s,["submitted_at"],"")||null}}return{...ki,targetYear:e,targetMonth:t}}function Ce(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Os(e){const t=e.rows.map(s=>`    <Category>
      <Code>${Ce(s.taxCategory)}</Code>
      <Name>${Ce(s.taxCategoryName)}</Name>
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
`),n=e.deductions.map(s=>`    <Deduction type="${Ce(s.type)}">
      <CategoryCode>${Ce(s.categoryCode)}</CategoryCode>
      <Volume>${s.volume}</Volume>
      <Reason>${Ce(s.reason)}</Reason>${s.documentNo?`
      <DocumentNo>${Ce(s.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${Ce(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${Ce(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${Ce(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${Ce(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${Ce(e.taxOffice)}</TaxOffice>
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
`}function Pi(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function Ei(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),s=e.rows.map(i=>[i.taxCategory,i.taxCategoryName,i.alcoholDegree,i.productionVolume,i.previousBalance,i.currentAdjustment,i.exportDeduction,i.sampleDeduction,i.taxableVolume,i.taxRate,i.taxAmount].map(Pi).join(",")),r=`,合計,,${e.rows.reduce((i,c)=>i+c.productionVolume,0)},,,${e.rows.reduce((i,c)=>i+c.exportDeduction,0)},${e.rows.reduce((i,c)=>i+c.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...s,r].join(`
`)+`
`}function Ai(e){const t=e.rows.map(r=>{const i=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),c=Math.round(i*r.taxRate);return{...r,taxableVolume:i,volume:i,taxAmount:c}}),n=t.reduce((r,i)=>r+i.taxableVolume,0),s=t.reduce((r,i)=>r+i.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:s}}async function Li(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>te);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:Os(e),submitted_at:e.submittedAt})}async function an(e,t){return(await ye("get_sake_tax_by_month",{p_year:e,p_month:t})).map(s=>({sakeType:s.sake_type,alcDegree:s.alc_degree??null,volumeSaleL:Number(s.volume_sale_l)||0,volumeReturnL:Number(s.volume_return_l)||0,volumeExportL:Number(s.volume_export_l)||0,volumeNetL:Number(s.volume_net_l)||0,taxRatePerKl:s.tax_rate_per_kl!==null?Number(s.tax_rate_per_kl):null,taxAmount:Number(s.tax_amount)||0}))}async function nn(e){const t=await V("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:b(n,["id"],""),saleDate:b(n,["sale_date"],e),saleTime:b(n,["sale_time"],""),productCode:b(n,["product_code"],""),productName:b(n,["product_name"],""),quantity:T(n,["quantity"],0),unitPrice:T(n,["unit_price"],0),amount:T(n,["amount"],0),paymentMethod:b(n,["payment_method"],"cash")})):[]}async function Bs(){const e=await V("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:b(t,["id"],""),orderNo:b(t,["order_no"],""),orderDate:fe(t,["order_date"],""),customerName:b(t,["customer_name"],""),postalCode:b(t,["postal_code"],""),address:b(t,["shipping_address"],""),items:[],totalAmount:T(t,["total_amount"],0),status:b(t,["status"],"new"),shippingDate:fe(t,["shipping_date"],"")})):[]}async function Ci(e,t,n,s,r,i){const c=await Pe("store_orders",{order_no:e,order_date:new Date().toISOString().slice(0,10),channel:"mobile",customer_name:t,legacy_customer_code:n||null,total_amount:s,status:"new",remarks:r||null});if(!c)return null;const p=c.id;for(let u=0;u<i.length;u++){const h=i[u];await Pe("store_order_lines",{order_id:p,line_no:u+1,product_code:h.productCode,product_name:h.productName,quantity:h.quantity,unit_price:h.unitPrice,amount:h.amount})}return p}async function Jt(e){const t=await Pe("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function js(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Di(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await V("print_layouts",t)).map(s=>({id:b(s,["id"],""),name:b(s,["name"],""),templateKey:b(s,["template_key"],""),positions:s.positions??{},isDefault:we(s,["is_default"],!1),note:b(s,["note"],""),updatedAt:b(s,["updated_at"],"")}))}async function qi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>te);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},s=await t("print_layouts",n);return s?{id:b(s,["id"],e.id),name:b(s,["name"],e.name),templateKey:b(s,["template_key"],e.templateKey),positions:s.positions??e.positions,isDefault:we(s,["is_default"],!1),note:b(s,["note"],""),updatedAt:b(s,["updated_at"],"")}:null}async function Ti(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Ii(){return(await V("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),email:b(t,["email"],""),displayName:b(t,["display_name"],""),signature:b(t,["signature"],""),replyTo:b(t,["reply_to"],""),isDefault:we(t,["is_default"],!1),isVerified:we(t,["is_verified"],!1),note:b(t,["note"],"")}))}async function Ni(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:b(n,["id"],e.id),name:b(n,["name"],e.name),email:b(n,["email"],e.email),displayName:b(n,["display_name"],""),signature:b(n,["signature"],""),replyTo:b(n,["reply_to"],""),isDefault:we(n,["is_default"],!1),isVerified:we(n,["is_verified"],!1)}:null}async function Mi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const sn={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},on={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function Ri(e){const t=`${e}-01T00:00:00Z`,[n,s]=e.split("-").map(p=>parseInt(p,10)),r=new Date(n,s,0).getDate(),i=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await V("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${i})`,order:"starts_at.asc"})).map(p=>({id:b(p,["id"],""),title:b(p,["title"],""),description:b(p,["description"],""),category:b(p,["category"],"general")||"general",startsAt:b(p,["starts_at"],new Date().toISOString()),endsAt:b(p,["ends_at"],""),isAllDay:we(p,["is_all_day"],!1),location:b(p,["location"],""),attendees:p.attendees??[],relatedCustomerCode:b(p,["related_customer_code"],""),relatedOrderId:b(p,["related_order_id"],""),color:b(p,["color"],""),googleEventId:b(p,["google_event_id"],"")}))}async function Oi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??on[e.category],updated_at:new Date().toISOString()})?e:null}async function Bi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function zs(){return(await V("integration_settings",{order:"name.asc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),provider:b(t,["provider"],""),config:t.config??{},isEnabled:we(t,["is_enabled"],!1),lastSyncAt:b(t,["last_sync_at"],""),lastStatus:b(t,["last_status"],"")}))}async function Lt(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function ji(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const s=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(s,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const i=await r.json(),{supabaseInsert:c}=await I(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>te);return{supabaseInsert:u}},void 0);let p=0;for(const u of i.orders){const h=`shopify_${u.id}`;await c("shopify_orders",{id:h,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),p++}return await Lt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得成功`}),{count:p}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function zi(){return(await V("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:b(t,["id"],""),shopifyOrderId:b(t,["shopify_order_id"],""),orderNumber:b(t,["order_number"],""),orderDate:b(t,["order_date"],""),customerName:b(t,["customer_name"],""),customerEmail:b(t,["customer_email"],""),totalAmount:ie(t.total_amount),financialStatus:b(t,["financial_status"],""),fulfillmentStatus:b(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function Fi(e){const t=e.config.refresh_token,n=e.config.client_id,s=e.config.client_secret;if(!t||!n||!s)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:s})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const c=(await r.json()).access_token;return await Lt({...e,config:{...e.config,oauth_token:c}}),e.config.oauth_token=c,{token:c}}async function Vi(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const s=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),i=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${s}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let c=await fetch(i,{headers:{Authorization:`Bearer ${t}`}});if(c.status===401){const f=await Fi(e);if(f.error)return{count:0,error:f.error};t=f.token,c=await fetch(i,{headers:{Authorization:`Bearer ${t}`}})}if(!c.ok)return{count:0,error:`HTTP ${c.status}`};const p=await c.json(),{supabaseInsert:u}=await I(async()=>{const{supabaseInsert:f}=await Promise.resolve().then(()=>te);return{supabaseInsert:f}},void 0);let h=0;for(const f of p.items){const g=`gcal_${f.id}`,$=f.start?.dateTime??f.start?.date??"",A=f.end?.dateTime??f.end?.date??"";await u("calendar_events",{id:g,title:String(f.summary??"(無題)"),description:String(f.description??""),category:"general",starts_at:String($),ends_at:String(A),location:String(f.location??""),google_event_id:String(f.id??""),updated_at:new Date().toISOString()}),h++}return await Lt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${h}件取得`}),{count:h}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function Ui(){return(await V("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:b(t,["id"],""),receivedAt:b(t,["received_at"],""),senderPhone:b(t,["sender_phone"],""),senderName:b(t,["sender_name"],""),imageUrl:b(t,["image_url"],""),ocrStatus:b(t,["ocr_status"],"pending")||"pending",ocrText:b(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:b(t,["linked_invoice_id"],"")}))}async function Yi(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const s=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(s){return{text:"",error:s instanceof Error?s.message:String(s)}}}async function Ji(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Zt={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},ea={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function Ki(){return(await V("user_profiles",{order:"display_name.asc"})).map(t=>({id:b(t,["id"],""),email:b(t,["email"],""),displayName:b(t,["display_name"],""),staffCode:b(t,["staff_code"],""),department:b(t,["department"],"all")||"all",role:b(t,["role"],"staff")||"staff",defaultMailSenderId:b(t,["default_mail_sender_id"],""),phone:b(t,["phone"],""),avatarUrl:b(t,["avatar_url"],""),isActive:we(t,["is_active"],!0),lastSignInAt:b(t,["last_sign_in_at"],""),createdAt:b(t,["created_at"],"")}))}async function Hi(e){if(!e)return null;const t=await V("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:b(n,["id"],""),email:b(n,["email"],""),displayName:b(n,["display_name"],""),staffCode:b(n,["staff_code"],""),department:b(n,["department"],"all")||"all",role:b(n,["role"],"staff")||"staff",defaultMailSenderId:b(n,["default_mail_sender_id"],""),phone:b(n,["phone"],""),avatarUrl:b(n,["avatar_url"],""),isActive:we(n,["is_active"],!0),lastSignInAt:b(n,["last_sign_in_at"],"")}}async function Qi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function Wi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Gi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>te);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function Xi(e=100){return(await V("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:b(n,["id"],""),action:b(n,["action"],""),entityType:b(n,["entity_type"],""),entityId:b(n,["entity_id"],""),userEmail:b(n,["user_email"],""),changes:n.changes??{},createdAt:b(n,["created_at"],"")}))}const ta={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function Fs(){return(await V("slack_notifications",{order:"event_type.asc"})).map(t=>({id:b(t,["id"],""),eventType:b(t,["event_type"],"new_order"),enabled:we(t,["enabled"],!0),channel:b(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:b(t,["last_triggered_at"],"")}))}async function Zi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function el(e=50){return(await V("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:b(n,["id"],""),eventType:b(n,["event_type"],""),channel:b(n,["channel"],""),message:b(n,["message"],""),status:b(n,["status"],"sent"),error:b(n,["error"],""),sentAt:b(n,["sent_at"],"")}))}async function tl(e,t,n){const r=(await zs()).find(h=>h.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const i=r.config.webhook_url;if(!i)return{ok:!1,error:"Webhook URL未設定"};const p=(await Fs()).find(h=>h.eventType===e&&h.enabled);if(!p)return{ok:!1,error:"通知ルールが無効"};const u=n??p.channel??r.config.default_channel??"#general";try{const h=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${ta[e]} ${t}`,channel:u})}),f=h.ok,{supabaseInsert:g}=await I(async()=>{const{supabaseInsert:$}=await Promise.resolve().then(()=>te);return{supabaseInsert:$}},void 0);return await g("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:f?"sent":"failed",error:f?null:`HTTP ${h.status}`}),f?{ok:!0}:{ok:!1,error:`HTTP ${h.status}`}}catch(h){return{ok:!1,error:h instanceof Error?h.message:String(h)}}}const ia={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},rn={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function al(){return(await V("prospects",{order:"updated_at.desc"})).map(t=>({id:b(t,["id"],""),companyName:b(t,["company_name"],""),contactName:b(t,["contact_name"],""),email:b(t,["email"],""),phone:b(t,["phone"],""),address:b(t,["address"],""),website:b(t,["website"],""),businessType:b(t,["business_type"],""),stage:b(t,["stage"],"cold"),source:b(t,["source"],""),expectedAmount:ie(t.expected_amount),probability:ie(t.probability),assignedStaffCode:b(t,["assigned_staff_code"],""),nextActionDate:b(t,["next_action_date"],""),nextAction:b(t,["next_action"],""),note:b(t,["note"],""),lastContactAt:b(t,["last_contact_at"],""),wonAt:b(t,["won_at"],""),lostAt:b(t,["lost_at"],""),lostReason:b(t,["lost_reason"],""),convertedCustomerCode:b(t,["converted_customer_code"],""),createdAt:b(t,["created_at"],"")}))}async function Vs(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0),n=await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()});return n?{...e,id:b(n,["id"],e.id)}:null}async function nl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);try{const s=new URL("/rest/v1/prospects",t);return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function sl(e){return(await V("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:b(n,["id"],""),prospectId:b(n,["prospect_id"],""),activityType:b(n,["activity_type"],"call"),title:b(n,["title"],""),description:b(n,["description"],""),activityDate:b(n,["activity_date"],""),result:b(n,["result"],""),staffCode:b(n,["staff_code"],"")}))}async function ol(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const Us=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function rl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function il(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ll(){return(await be("v_customer_map")).map(t=>({customerCode:b(t,["customer_code"],""),name:b(t,["name"],""),phone:b(t,["phone"],""),areaCode:b(t,["area_code"],""),businessType:b(t,["business_type"],""),businessTypeName:b(t,["business_type_name"],""),address1:b(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:we(t,["is_at_risk"],!1),isDormant:we(t,["is_dormant"],!1),amount12m:T(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}async function Ys(){return(await be("customers",{select:"id,legacy_customer_code,name,address1",is_active:"eq.true",lat:"is.null",address1:"not.is.null",order:"name.asc"})).map(t=>({id:b(t,["id"],""),customerCode:b(t,["legacy_customer_code"],""),name:b(t,["name"],""),address1:b(t,["address1"],"")}))}async function cl(e){try{const t=`https://nominatim.openstreetmap.org/search?format=json&countrycodes=jp&limit=1&q=${encodeURIComponent(e)}`,n=await fetch(t,{headers:{"User-Agent":"sake-system-crm/1.0"}});if(!n.ok)return null;const s=await n.json();return s.length===0?null:{lat:parseFloat(s[0].lat),lng:parseFloat(s[0].lon)}}catch{return null}}async function dl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}},void 0),s=await Ys();let r=0,i=0;for(let c=0;c<s.length;c++){const p=s[c];e(c,s.length,p.name);const u=await cl(p.address1);if(u)try{const h=new URL(`/rest/v1/customers?id=eq.${p.id}`,t);await fetch(h.toString(),{method:"PATCH",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({lat:u.lat,lng:u.lng})}),r++}catch{i++}else i++;c<s.length-1&&await new Promise(h=>setTimeout(h,1100))}return e(s.length,s.length,"完了"),{success:r,failed:i}}const la=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function pl(){return(await be("customer_churn_notes")).map(t=>({customerCode:b(t,["customer_code"],""),reason:b(t,["reason"],""),memo:b(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:b(t,["updated_at"],"")}))}async function ul(e){const{supabaseUpsert:t}=await I(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>te);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function ml(){return(await V("delivery_locations",{order:"name.asc"})).map(t=>({id:b(t,["id"],""),customerCode:b(t,["customer_code"],""),name:b(t,["name"],""),postalCode:b(t,["postal_code"],""),address:b(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:b(t,["contact_name"],""),phone:b(t,["phone"],""),deliveryNote:b(t,["delivery_note"],""),isActive:we(t,["is_active"],!0)}))}async function yl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function hl(e=50){return(await V("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:b(n,["id"],""),callDirection:b(n,["call_direction"],"inbound"),fromNumber:b(n,["from_number"],""),toNumber:b(n,["to_number"],""),matchedCustomerCode:b(n,["matched_customer_code"],""),matchedProspectId:b(n,["matched_prospect_id"],""),durationSeconds:ie(n.duration_seconds),callStatus:b(n,["call_status"],"answered"),recordingUrl:b(n,["recording_url"],""),transcript:b(n,["transcript"],""),ivryCallId:b(n,["ivry_call_id"],""),startedAt:b(n,["started_at"],""),endedAt:b(n,["ended_at"],""),notes:b(n,["notes"],"")}))}async function Js(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function gl(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const s=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(s,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const c=(await r.json()).calls??[];let p=0;for(const u of c)await Js({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),p++;return await Lt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得`}),{count:p}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function fl(e,t){const n=e.config.api_key,s=e.config.team_id;if(!n||!s)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const i of t){if(!i.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${s}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:i.name,phone_number:i.phone,external_id:i.customerCode??"",note:i.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function vl(){return(await V("lead_lists",{order:"created_at.desc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),query:b(t,["query"],""),area:b(t,["area"],""),businessType:b(t,["business_type"],""),totalCount:ie(t.total_count),source:b(t,["source"],"manual"),createdAt:b(t,["created_at"],"")}))}async function bl(e){return(await V("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:b(n,["id"],""),listId:b(n,["list_id"],""),companyName:b(n,["company_name"],""),address:b(n,["address"],""),phone:b(n,["phone"],""),website:b(n,["website"],""),email:b(n,["email"],""),businessType:b(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:ie(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:b(n,["place_id"],""),status:b(n,["status"],"new"),convertedProspectId:b(n,["converted_prospect_id"],""),note:b(n,["note"],"")}))}async function wl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function Ks(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function xl(e,t,n){const s=e.config.api_key;if(!s)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),i=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${s}`;try{const c=await fetch(i);if(!c.ok)return{results:[],error:`HTTP ${c.status}`};const p=await c.json();return p.status!=="OK"&&p.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${p.status}`}:{results:p.results.map(h=>{const f=h.geometry?.location;return{id:`place_${h.place_id}`,listId:"",companyName:String(h.name??""),address:String(h.formatted_address??""),rating:h.rating?Number(h.rating):void 0,reviewCount:h.user_ratings_total?Number(h.user_ratings_total):void 0,lat:f?.lat,lng:f?.lng,placeId:String(h.place_id??""),status:"new"}})}}catch(c){return{results:[],error:c instanceof Error?c.message:String(c)}}}async function $l(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await Vs(t);return n&&await Ks({...e,status:"imported",convertedProspectId:t.id}),n}async function _l(){return(await V("workflow_orders",{order:"order_date.desc"})).map(t=>({id:b(t,["id"],""),orderNo:b(t,["order_no"],""),customerName:b(t,["customer_name"],""),customerCode:b(t,["customer_code"],""),orderDate:b(t,["order_date"],""),deliveryDate:b(t,["delivery_date"],""),stage:b(t,["stage"],"new"),totalAmount:ie(t.total_amount),itemCount:ie(t.item_count),priority:b(t,["priority"],"normal"),staffName:b(t,["staff_name"],""),notes:b(t,["notes"],"")}))}async function Sl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function kl(){return(await V("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),email:b(t,["email"],""),phone:b(t,["phone"],""),visitDate:b(t,["visit_date"],""),partySize:ie(t.party_size)||1,language:b(t,["language"],"ja"),purpose:b(t,["purpose"],""),message:b(t,["message"],""),status:b(t,["status"],"new"),repliedAt:b(t,["replied_at"],""),confirmedTime:b(t,["confirmed_time"],""),createdAt:b(t,["created_at"],new Date().toISOString())}))}async function Pl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const El=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function Hs(){return(await Promise.all(El.map(async t=>{const[n,s]=await Promise.all([Ya(t.table),V(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:s[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Kt(e,t,n=100){const s=(t-1)*n,[r,i]=await Promise.all([V(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(s)}),Ya(e)]);return{records:r,total:i}}async function Ia(e){const t=await V("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const s=JSON.parse(n);return String(s.price_group??"")}catch{return""}return""}async function Qs(e,t){if(e){const s=await V("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(s.length>0&&s[0].special_price)return ie(s[0].special_price)}const n=await V("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?ie(n[0].default_sale_price):0}const Al=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],Ll=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],Cl={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function Dl(){const e=new Date,t=[];for(let u=11;u>=0;u--){const h=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`)}const n=Al,s={},r={};for(const u of n){s[u.code]={};for(const h of t){const f=parseInt(h.split("-")[1])-1,g=Cl[u.code]??100,$=Math.round(g*Ll[f]*(.85+Math.random()*.3));s[u.code][h]=$,r[h]=(r[h]??0)+$}}const i={},c={},p={};for(const u of n){const h=t.map($=>s[u.code][$]??0),f=h.reduce(($,A)=>$+A,0)/h.length,g=h.reduce(($,A)=>$+(A-f)**2,0)/h.length;i[u.code]=h.reduce(($,A)=>$+A,0),c[u.code]=f,p[u.code]=Math.sqrt(g)}return{months:t,products:n,matrix:s,totals:r,productTotals:i,productAvg:c,productStdDev:p}}async function ql(e=36){const t=(()=>{const $=new Date;return $.setMonth($.getMonth()-e),`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`})();let n=[];try{n=await be("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"})}catch($){console.warn("fetchDemandAnalysis: query failed, using empty",$)}if(n.length===0)return Dl();const s=new Set,r=new Map,i={},c={};for(const $ of n){const A=b($,["year_month"],""),_=b($,["product_code"],""),D=b($,["product_name"],_),P=T($,["quantity"],0);!A||!_||(s.add(A),r.set(_,D),i[_]||(i[_]={}),i[_][A]=P,c[A]=(c[A]??0)+P)}const p=[...s].sort(),u=[...r.entries()].map(([$,A])=>({code:$,name:A})),h={},f={},g={};for(const $ of u){const A=p.map(P=>i[$.code]?.[P]??0),_=A.reduce((P,L)=>P+L,0)/(A.length||1),D=A.reduce((P,L)=>P+(L-_)**2,0)/(A.length||1);h[$.code]=A.reduce((P,L)=>P+L,0),f[$.code]=_,g[$.code]=Math.sqrt(D)}return{months:p,products:u,matrix:i,totals:c,productTotals:h,productAvg:f,productStdDev:g}}async function Tl(){let e=[];try{e=await V("product_safety_stock_params",{order:"product_code.asc"})}catch(t){return console.warn("fetchSafetyStockParams failed:",t),[]}return e.map(t=>({productCode:b(t,["product_code"],""),productName:b(t,["product_name"],""),unit:b(t,["unit"],"本"),avgMonthlyDemand:T(t,["avg_monthly_demand"],0),demandStdDev:T(t,["demand_std_dev"],0),leadTimeDays:T(t,["lead_time_days"],30),serviceLevel:T(t,["service_level"],.95),safetyStockQty:T(t,["safety_stock_qty"],0),reorderPoint:T(t,["reorder_point"],0),memo:b(t,["memo"],""),productionType:b(t,["production_type"],"monthly")}))}async function Il(e){return(await V("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:b(n,["id"],""),yearMonth:b(n,["year_month"],e),productCode:b(n,["product_code"],""),productName:b(n,["product_name"],""),demandForecast:T(n,["demand_forecast"],0),safetyStockTarget:T(n,["safety_stock_target"],0),openingStock:T(n,["opening_stock"],0),requiredProduction:T(n,["required_production"],0),plannedQty:T(n,["planned_qty"],0),actualQty:T(n,["actual_qty"],0),status:b(n,["status"],"draft"),productionType:b(n,["production_type"],"monthly"),notes:b(n,["notes"],"")}))}async function Nl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n||e.length===0)return!1;try{const s=e.map(c=>({product_code:c.productCode,product_name:c.productName,unit:c.unit,avg_monthly_demand:c.avgMonthlyDemand,demand_std_dev:c.demandStdDev,lead_time_days:c.leadTimeDays,service_level:c.serviceLevel,safety_stock_qty:c.safetyStockQty,reorder_point:c.reorderPoint,production_type:c.productionType,memo:c.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),r=new URL("/rest/v1/product_safety_stock_params",t),i=await fetch(r.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(s)});if(!i.ok){const c=await i.text();return console.error("saveSafetyStockParamsBulk failed:",i.status,c),!1}return!0}catch(s){return console.error("saveSafetyStockParamsBulk error:",s),!1}}async function Ml(e){const{supabaseUpsert:t}=await I(async()=>{const{supabaseUpsert:s}=await Promise.resolve().then(()=>te);return{supabaseUpsert:s}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function Rl(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}function ua(e,t,n){t>0&&n>0&&(e[t]=(e[t]||0)+n)}function _n(e){return Object.entries(e).map(([t,n])=>({volumeMl:Number(t),label:Number(t)>=1e3?`${Number(t)}ml`:`${Number(t)}ml`,bottles:Number(n)})).sort((t,n)=>t.volumeMl-n.volumeMl)}async function Ol(e){const[t,n]=e.split("-").map(Number),s=`${e}-01`,r=new Date(t,n,0).getDate(),i=`${e}-${String(r).padStart(2,"0")}`,c=await be("sales_document_headers",{select:"document_no,legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${s},sales_date.lte.${i})`,order:"sales_date.asc"}),p=await be("sales_document_lines",{select:"document_no,legacy_product_code,quantity",note:`like.*date:${e}*`,order:"document_no"}),u=await be("products",{select:"legacy_product_code,volume_ml"}),h={};for(const D of u)D.legacy_product_code&&D.volume_ml&&(h[D.legacy_product_code]=D.volume_ml);const f={};for(const D of p){const P=D.document_no,L=h[D.legacy_product_code]||0;L>0&&D.quantity>0&&(f[P]||(f[P]={}),ua(f[P],L,D.quantity))}const g=await be("customers",{select:"legacy_customer_code,address1",address1:"not.is.null"}),$={};for(const D of g)D.address1&&($[D.legacy_customer_code]=Rl(D.address1));const A={};for(const D of c){const P=D.sales_date;if(!P)continue;const L=D.legacy_customer_code||"",S=`${P}|${L}`,o=D.document_no||D.legacy_document_no||"";A[S]||(A[S]={date:P,custCode:L,custName:D.customer_name||"",city:$[L]||"住所未登録",amount:0,invoiceCount:0,volumes:{}}),A[S].amount+=Number(D.total_amount)||0,A[S].invoiceCount++;const l=f[o];if(l)for(const[d,m]of Object.entries(l))ua(A[S].volumes,Number(d),Number(m))}const _={};for(const D of Object.values(A)){_[D.date]||(_[D.date]={date:D.date,entries:[],cityGroups:[],totalAmount:0,count:0,totalVolumes:[]});const P=_[D.date];P.entries.push({customerCode:D.custCode,customerName:D.custName,city:D.city,amount:D.amount,invoiceCount:D.invoiceCount,volumes:_n(D.volumes)}),P.totalAmount+=D.amount,P.count+=D.invoiceCount}for(const D of Object.values(_)){const P={},L={};for(const S of D.entries){P[S.city]=(P[S.city]||0)+1;for(const o of S.volumes)ua(L,o.volumeMl,o.bottles)}D.cityGroups=Object.entries(P).sort((S,o)=>o[1]-S[1]).map(([S,o])=>({city:S,count:o})),D.totalVolumes=_n(L)}return _}async function ln(){return V("quotes",{select:"id,quote_no,quote_date,valid_until,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function Ws(e){const t=await V("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await V("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function Bl(){const e=new Date().toISOString().slice(0,7)+"-01";return be("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}async function aa(){const e=await V("app_feature_status",{select:"*"}),t={};for(const n of e)t[n.feature_id]={featureId:n.feature_id,confirmedAt:n.confirmed_at,confirmedBy:n.confirmed_by,notes:n.notes};return t}async function Gs(e,t){await At("app_feature_status","feature_id",[{feature_id:e,confirmed_at:new Date().toISOString(),confirmed_by:t,updated_at:new Date().toISOString()}])}async function Xs(e){await At("app_feature_status","feature_id",[{feature_id:e,confirmed_at:null,confirmed_by:null,updated_at:new Date().toISOString()}])}const O=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:on,CALENDAR_CATEGORY_LABELS:sn,CHURN_REASONS:la,DEPT_LABELS:ea,INVOICE_TYPE_LABELS:Da,JIKOMI_STATUS_LABELS:As,MATERIAL_CATEGORIES:Us,PROSPECT_STAGE_COLORS:rn,PROSPECT_STAGE_LABELS:ia,ROLE_LABELS:Zt,SEASONAL_TEMPLATES:Ka,SLACK_EVENT_LABELS:ta,TAX_DEDUCTION_LABELS:Ta,TAX_RATE_CATEGORIES:Rs,abcPeriodToDates:en,addBrewingCustomCategory:oi,addBrewingStockEntry:ti,addRiceVariety:Gr,addTank:Br,autoScheduleAllBatches:Fr,batchGeocode:dl,calcWeeklyLabor:Jr,confirmFeature:Gs,convertLeadToProspect:$l,createBrewingBatch:Nr,deleteBrewingCustomCategory:ii,deleteBrewingStockEntry:ni,deleteCalendarEvent:Bi,deleteMailSender:Mi,deleteMaterial:il,deletePrintLayout:Ti,deleteProspect:nl,deleteRicePurchaseCommitment:Qr,deleteRiceVariety:Xr,deleteTank:jr,deleteUserProfile:Wi,fetchAllBrewingStockEntries:ei,fetchAnalyticsByPeriod:er,fetchAnnouncements:fi,fetchAuditLogs:Xi,fetchAvailablePeriods:tr,fetchAvailableProductionTypes:br,fetchBillList:Ns,fetchBillingSummary:Xa,fetchBrewingAlcoholSettings:wr,fetchBrewingBatches:Cr,fetchBrewingCategoryOverrides:ci,fetchBrewingCustomCategories:si,fetchBrewingForecastOverrides:_r,fetchBrewingMonthlyTrend:pr,fetchBrewingPlanSummary:dr,fetchBrewingProcessSteps:Dr,fetchBrewingProductDetail:ur,fetchBrewingRiceParams:kr,fetchBrewingSchedule:mr,fetchBrewingSeasonalPattern:Er,fetchBrewingStockEntries:Zr,fetchBrewingYearlyShipments:$r,fetchCalendarEvents:Ri,fetchCallLogs:hl,fetchCategoryTypeLinks:gr,fetchChurnAlerts:vi,fetchChurnNotes:pl,fetchCustomerAnalysis:ks,fetchCustomerEfficiency:Si,fetchCustomerEfficiencyByYear:ot,fetchCustomerLedger:Qa,fetchCustomerPriceGroup:Ia,fetchCustomerPricing:qa,fetchCustomerProductBreakdown:ir,fetchCustomersWithoutGeo:Ys,fetchDeliveryLocations:ml,fetchDeliveryNote:Ga,fetchDeliverySchedule:gi,fetchDemandAnalysis:ql,fetchDemandForecasts:hi,fetchEntityMonthlySales:cr,fetchFaxInbox:Ui,fetchFeatureStatuses:aa,fetchIntegrationSettings:zs,fetchInvoiceLines:Ca,fetchInvoices:kt,fetchJikomiList:Ls,fetchKenteiList:Ds,fetchLabelExclusions:di,fetchLeadItems:bl,fetchLeadLists:vl,fetchMailSenders:Ii,fetchMapCustomers:ll,fetchMasterStats:Ha,fetchMaterialList:qs,fetchMyProfile:Hi,fetchOrderHeaders:Bl,fetchPayableList:Is,fetchPaymentStatus:ms,fetchPeriodChartData:or,fetchPipelineMeta:ys,fetchPrintLayouts:Di,fetchProcurementDecisions:Ar,fetchProductABC:Ps,fetchProductCustomerBreakdown:lr,fetchProductDaily:_i,fetchProductMonthlyShipments:yi,fetchProductPower:$i,fetchProductPrice:Qs,fetchProductShipmentsFromTable:xi,fetchProductionPlan:Il,fetchProspectActivities:sl,fetchProspects:al,fetchPurchaseList:Ts,fetchQuoteList:ln,fetchQuoteWithLines:Ws,fetchRawMaterialStock:Ms,fetchRawRecords:Kt,fetchRawTableList:Hs,fetchRicePurchaseCommitments:Kr,fetchRiceVarieties:Wr,fetchSafetyStockParams:Tl,fetchSakeTaxByMonth:an,fetchSalesAnalytics:Wa,fetchSalesReport:xs,fetchSalesSummary:us,fetchSeasonalProfiles:wi,fetchShipmentCalendar:Ol,fetchShopifyOrders:zi,fetchSlackLogs:el,fetchSlackRules:Fs,fetchStaffCustomerBreakdown:nr,fetchStaffProductBreakdown:sr,fetchStaffTotalsByPeriod:ar,fetchStepLabor:Yr,fetchStoreOrders:Bs,fetchStoreSales:nn,fetchSyncDashboard:hs,fetchSystemHealth:gs,fetchSystemSetting:ps,fetchTankList:Cs,fetchTanks:Or,fetchTaxDeclaration:tn,fetchTourInquiriesFromDb:kl,fetchTypesInCategory:ri,fetchUserProfiles:Ki,fetchVisitPriorities:bi,fetchWorkerSettings:Vr,fetchWorkflowOrdersFromDb:_l,generateTaxCSV:Ei,generateTaxXML:Os,getTankOccupancy:zr,linkTypeToCategory:fr,ocrFaxImage:Yi,periodToDateRange:vs,preloadInvoiceLines:fs,prevYearFilter:rr,reassignBrewingStockEntry:ai,recalculateTaxDeclaration:Ai,recordAudit:Gi,resolveProductPrice:Za,saveBrewingAlcoholSetting:xr,saveBrewingForecastOverride:Sr,saveBrewingRiceParams:Pr,saveBrewingSchedule:yr,saveCalendarEvent:Oi,saveCallLog:Js,saveChurnNote:ul,saveDeliveryLocation:yl,saveEmailCampaign:Jt,saveFaxRecord:Ji,saveIntegrationSetting:Lt,saveInvoice:ws,saveLabelExclusions:pi,saveLeadItem:Ks,saveLeadList:wl,saveMailSender:Ni,saveMaterial:rl,savePrintLayout:qi,saveProcurementDecision:Lr,saveProductionPlan:Ml,saveProspect:Vs,saveProspectActivity:ol,saveRicePurchaseCommitment:Hr,saveSafetyStockParamsBulk:Nl,saveSlackRule:Zi,saveStoreOrder:Ci,saveTaxDeclaration:Li,saveTourInquiry:Pl,saveUserProfile:Qi,saveWorkerSettings:Ur,saveWorkflowOrder:Sl,searchPlaces:xl,sendEmailCampaign:js,sendSlackNotification:tl,setBrewingCategoryOverride:li,submitFeatureRequest:$s,syncGoogleCalendar:Vi,syncIvryCallLogs:gl,syncPhoneBookToIvry:fl,syncShopifyOrders:ji,unconfirmFeature:Xs,unlinkTypeFromCategory:vr,updateBrewingBatch:Rr,updateBrewingProcessStep:Mr,updateCustomer:_s,updateProduct:Ss,upsertBrewingStock:hr,upsertSystemSetting:st},Symbol.toStringTag,{value:"Module"}));function Ze(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const jl={open:"未締め",closed:"締め済"};function zl(e,t){const n=e.customers.map(s=>`
      <tr>
        <td>
          <div class="table-title">${s.customerName}</div>
          <div class="table-sub mono">${s.customerCode}</div>
        </td>
        <td class="numeric">${s.closingDay}日</td>
        <td class="numeric">${Ze(s.salesAmount)}</td>
        <td class="numeric">${Ze(s.taxAmount)}</td>
        <td class="numeric">${Ze(s.prevBalance)}</td>
        <td class="numeric">${Ze(s.paymentAmount)}</td>
        <td class="numeric"><strong>${Ze(s.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${jl[s.status]}</span>
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
        <p class="kpi-value">${Ze(e.totalBilling)}</p>
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
  `}const Fl={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},Vl={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function Sn(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function qt(e){const t=Vl[e],n=Fl[e].map(s=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Sn(s.title)}</p>
            <p class="category-card-description">${Sn(s.description)}</p>
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
  `}function Zs(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function $t(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ul(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${Zs(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${$t(t.amount)}</td>
        </tr>
      `).join("")}function Yl(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${Zs(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${$t(t.amount)}</td>
        </tr>
      `).join("")}function Jl(e,t){return`
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
            <dd>${$t(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${$t(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${$t(e.balanceAmount)}</dd>
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
            <tbody>${Ul(e)}</tbody>
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
            <tbody>${Yl(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function ut(e,t,n){const s=e.findIndex(i=>i.column===t);if(s>=0){if(e[s].direction==="asc"){const c=[...e];return c[s]={column:t,direction:"desc"},c}return e.filter((c,p)=>p!==s)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function Kl(e,t){const n=e.findIndex(i=>i.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const s=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${s}${r}</span>`}function ne(e,t,n,s=""){return`<th class="sortable ${s}" data-sort-col="${e}">${t} ${Kl(n,e)}</th>`}function kn(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function lt(e,t,n){return t.length===0?e:[...e].sort((s,r)=>{for(const{column:i,direction:c}of t){const p=n[i];if(!p)continue;const u=kn(s[p]),h=kn(r[p]);let f=0;if(typeof u=="number"&&typeof h=="number"?f=u-h:f=String(u).localeCompare(String(h),"ja"),f!==0)return c==="asc"?f:-f}return 0})}const Hl={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},Pn={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},mt={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function Ql(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function Wl(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function Gl(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function eo(e,t){const n=Wl(t),s=Gl(t),[r,i]=t.split("-").map(Number),c=new Map;e.forEach(l=>{if(l.date.slice(0,7)===t){const d=l.date.slice(0,10);c.has(d)||c.set(d,[]),c.get(d).push(l)}});const p=e.filter(l=>l.date.slice(0,7)===t),u=p.reduce((l,d)=>l+d.quantity,0),h=new Set(p.map(l=>l.date)).size,f=new Date().toISOString().slice(0,10),g=["日","月","火","水","木","金","土"].map(l=>`<th class="dcal-header">${l}</th>`).join("");let $="",A=1;for(let l=0;l<6&&!(A>n&&l>0);l++){$+="<tr>";for(let d=0;d<7;d++)if(l===0&&d<s||A>n)$+='<td class="dcal-cell dcal-empty"></td>';else{const m=`${r}-${String(i).padStart(2,"0")}-${String(A).padStart(2,"0")}`,y=c.get(m)||[],w=m===f,v=y.reduce((x,k)=>x+k.quantity,0);$+=`
          <td class="dcal-cell ${w?"dcal-today":""}">
            <div class="dcal-day">${A}</div>
            ${y.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${y[0].status}">${y.length}件 ${v}本</div>
              </div>
            `:""}
          </td>`,A++}$+="</tr>"}const[_,D]=i===1?[r-1,12]:[r,i-1],[P,L]=i===12?[r+1,1]:[r,i+1],S=`${_}-${String(D).padStart(2,"0")}`,o=`${P}-${String(L).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${i}月: ${h}日稼働 / ${p.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${S}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${r}年${i}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${o}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${g}</tr></thead>
        <tbody>${$}</tbody>
      </table>
    </section>
  `}function Xl(e,t){const n=t==="all"?e:e.filter(p=>p.segment===t),s={all:e.length};e.forEach(p=>{s[p.segment]=(s[p.segment]??0)+1});const i=["all",...[...new Set(e.map(p=>p.segment))]].map(p=>`
      <button class="button ${t===p?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${p}">
        ${p==="all"?"全て":Pn[p]??p} (${s[p]??0})
      </button>
    `).join(""),c=n.map(p=>`
      <tr>
        <td class="mono">${p.code}</td>
        <td>${p.name}</td>
        <td><span class="segment-badge" style="background:${mt[p.segment]??"#718096"};">${Pn[p.segment]??p.segment}</span></td>
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
            <li><span class="segment-badge" style="background:${mt.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${mt["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${mt["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${mt["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
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
  `}function Zl(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${eo(e.deliveries,e.calendarMonth)}
    ${Xl(e.forecasts,e.selectedSegment)}
  `}function ec(e,t){return eo(e,t)}const Tt={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function En(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function ma(e,t,n){if(t==="all")return e;const s=new Date,r=s.toISOString().slice(0,10),i=new Date(s);switch(t){case"today":return e.filter(c=>c.date.slice(0,10)===r);case"month":return e.filter(c=>c.date.slice(0,7)===r.slice(0,7));case"future":{const c=new Date(s.getFullYear(),s.getMonth(),1).toISOString().slice(0,10);return e.filter(p=>p.date.slice(0,10)>=c)}case"90days":return i.setDate(i.getDate()-90),e.filter(c=>c.date>=i.toISOString());case"year":return i.setFullYear(i.getFullYear()-1),e.filter(c=>c.date>=i.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(c=>{const p=c.date.slice(0,10);return p>=n.start&&p<=n.end})}}function ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ya(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function tc(e){const s={top:20,right:20,bottom:30,left:50},r=760-s.left-s.right,i=260-s.top-s.bottom,c=Math.max(...e.map(f=>f.amount),1),p=r/e.length,u=e.map((f,g)=>{const $=f.amount/c*i,A=s.left+g*p+4,_=s.top+i-$,D=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(f.date));return`
        <g>
          <rect x="${A}" y="${_}" width="${Math.max(p-8,8)}" height="${$}" rx="4" fill="#0F5B8D" opacity="${.58+g/e.length*.34}" />
          ${g%5===0?`<text x="${A+6}" y="252" class="chart-axis">${D}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(f=>{const g=s.top+i-i*f,$=Math.round(c*f/1e3);return`
        <g>
          <line x1="${s.left}" y1="${g}" x2="${760-s.right}" y2="${g}" class="chart-grid" />
          <text x="6" y="${g+4}" class="chart-axis">${$.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function ac(e,t,n,s,r="month",i,c=[]){const p={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=ma(e.allDailySales,r,i),h=u.reduce((R,Y)=>R+Y.amount,0),f=u.reduce((R,Y)=>R+Y.bottles,0),g=u.reduce((R,Y)=>R+Y.volumeMl,0),$=u.length,A=f>0?Math.round(h/f):0,_=g>0?Math.round(h/(g/1e3)):0,D=new Date,P=D.toISOString().slice(0,10),L=P.slice(0,7),S=ma(e.allDailySales,"month").filter(R=>R.date.slice(0,10)<=P),o=S.reduce((R,Y)=>R+Y.amount,0);S.reduce((R,Y)=>R+Y.bottles,0);const l=D.getDate();new Date(D.getFullYear(),D.getMonth()+1,0).getDate();const m=(s?.orderHeaders??[]).filter(R=>R.sales_date.slice(0,7)===L),y=m.reduce((R,Y)=>R+Number(Y.total_amount),0),w=m.length,v=ma(e.allDailySales,"month"),x=v.reduce((R,Y)=>R+Y.bottles,0),k=y>0?y:v.reduce((R,Y)=>R+Y.amount,0),C=y>0?"orders":"extrapolation",M=(u.length>0?e.allDailySales.filter(R=>{const Y=u[0]?.date??"",Q=u[u.length-1]?.date??"",X=En(Y,-1),W=En(Q,-1);return R.date>=X&&R.date<=W}):[]).reduce((R,Y)=>R+Y.amount,0),j=M>0?(h-M)/M*100:0,N=j>0?"+":"",z=e.salesRecords.slice(0,10).map(R=>`
            <tr class="clickable-row" data-doc-no="${R.documentNo}" style="cursor:pointer">
              <td class="mono">${R.documentNo}</td>
              <td>${ya(R.date)}</td>
              <td>${R.customerName}</td>
              <td class="numeric">${ke(R.amount)}</td>
            </tr>
          `).join(""),B=["today","month","future","90days","year","all"].map(R=>`<button class="button ${R===r?"primary":"secondary"} small" type="button" data-period="${R}">${Tt[R]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${p[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${ya(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${B}</div>
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
        <p class="kpi-value">${ke(o)}</p>
        <p class="kpi-sub">${l}日経過 / ${S.length}営業日 / 日平均 ${S.length>0?ke(Math.round(o/S.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${ke(k)}</p>
        <p class="kpi-sub">${C==="orders"?`受注確定 ${w}件`:`出荷見込 ${x.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${j>=0?"#2f855a":"#c53d3d"}">${M>0?`${N}${j.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${M>0?ke(M):"データなし"}</p>
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
        <p class="panel-title">${Tt[r]}売上</p>
        <p class="kpi-value">${ke(h)}</p>
        <p class="kpi-sub">${$}日間${$>0?` / 日平均 ${ke(Math.round(h/$))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${f.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${ke(A)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(g/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${ke(_)}</p>
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
            <p class="panel-caption">${Tt[r]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${tc(u.length>0?u:e.dailySales)}
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
              <dd>${ya(t.lastSyncAt)}</dd>
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
          <tbody>${z}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${Tt[r]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ne("date","日付",c)}
              ${ne("amount","売上",c,"numeric")}
              ${ne("bottles","本数",c,"numeric")}
              ${ne("volumeMl","液体量(L)",c,"numeric")}
              ${ne("pricePerBottle","本単価",c,"numeric")}
              ${ne("pricePerLiter","L単価",c,"numeric")}
            </tr>
          </thead>
          <tbody>${lt(c.length>0?u:u.slice().reverse(),c,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(R=>`
            <tr>
              <td class="mono">${R.date.slice(0,10)}</td>
              <td class="numeric">${ke(R.amount)}</td>
              <td class="numeric">${R.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(R.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${ke(R.pricePerBottle)}</td>
              <td class="numeric">${ke(R.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${s?nc(s):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function nc(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(p=>p.startsAt.slice(0,10)>=t).slice(0,5),s=e.tourInquiries.filter(p=>p.status==="new").length,r=e.churnSummary,i=r?r.atRiskCount+r.dormantCount+r.decliningCount:null,c=r?`<article class="panel kpi-card ${r.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
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
        ${n.length===0?'<p class="empty-note">予定なし</p>':`<div style="display:grid;gap:8px;">${n.map(p=>{const u=new Date(p.startsAt);return`
                <div style="padding:8px 12px;background:var(--surface-alt);border-radius:6px;border-left:3px solid ${p.color||"#0F5B8D"};">
                  <div style="font-size:11px;color:var(--text-secondary);">${u.getMonth()+1}/${u.getDate()} ${p.isAllDay?"終日":u.toTimeString().slice(0,5)}</div>
                  <div style="font-weight:700;">${p.title}</div>
                  ${p.location?`<div style="font-size:11px;color:var(--text-secondary);">📍 ${p.location}</div>`:""}
                </div>`}).join("")}</div>`}
      </aside>
    </section>

    ${e.deliveries&&e.deliveries.length>0?ec(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?sc(e.orderHeaders):""}
  `}function sc(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),s=new Date().toISOString().slice(0,10),r=s.slice(0,7),i=new Map;for(const g of e){const $=g.sales_date.slice(0,7),A=i.get($)??{count:0,total:0};i.set($,{count:A.count+1,total:A.total+Number(g.total_amount)})}const c=[...i.keys()].sort(),p=e.reduce((g,$)=>g+Number($.total_amount),0),u=c.map(g=>{const{count:$,total:A}=i.get(g);return`<tr>
      <td class="mono" style="font-weight:700;">${g===r?`${g}（当月）`:g}</td>
      <td class="numeric">${$.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(A)}</td>
    </tr>`}).join(""),h=e.filter(g=>g.sales_date>=s).slice(0,30),f=h.map(g=>`<tr>
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
      ${h.length>0?`
      <div class="panel-header" style="margin-top:16px;">
        <div><h3 style="font-size:13px;font-weight:600;">本日以降の受注（${h.length}件）</h3></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>受注日</th><th>得意先</th><th class="numeric">金額</th></tr></thead>
          <tbody>${f}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function oc(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function et(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function rc(e,t){const n=e.lines.length?e.lines.map((r,i)=>`
          <tr>
            <td class="numeric">${i+1}</td>
            <td class="mono">${r.productCode}</td>
            <td>${r.productName}</td>
            <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
            <td>${r.unit}</td>
            <td class="numeric">${et(r.unitPrice)}</td>
            <td class="numeric">${et(r.amount)}</td>
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
            <tr><th>納品日</th><td>${oc(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${et(e.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${et(s)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${et(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${et(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function qe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ic(e){return qe(e).replaceAll(`
`,"<br />")}function lc(e){const n=[...Object.values(Ka),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${qe(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),s=e.previewRecipients.length?e.previewRecipients.map(r=>`
            <li>
              <span>${qe(r.name)}</span>
              <span class="table-sub">${qe(r.email)} / ${qe(r.area)}</span>
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
          <input id="email-subject" type="text" value="${qe(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${qe(e.body)}</textarea>
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
            ${e.senders.map(r=>`<option value="${r.id}" ${r.id===e.senderId?"selected":""}>${qe(r.name)} &lt;${qe(r.email)}&gt;${r.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${qe(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?ic(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${qe(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function De(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function It(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function cc(e,t){const n=[It("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${De(r.name)}</strong>
            <span class="table-sub mono">${De(r.code)}</span>
          </button>
        `)),It("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${De(r.name)}</strong>
            <span class="table-sub mono">${De(r.code)}</span>
          </button>
        `)),It("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${De(r.documentNo)}</strong>
            <span class="table-sub">${De(r.customerName)} / ${De(r.date)}</span>
          </button>
        `)),It("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${De(r.path)}"
          >
            <strong>${De(r.title)}</strong>
            <span class="table-sub mono">${De(r.path)}</span>
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
            value="${De(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||s}
          </div>
        </div>
      </div>
    </div>
  `}function yt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function to(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${yt(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${yt(e.title)}">
        <div class="modal-header">
          <h2>${yt(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${yt(e.placeholder)}"
            value="${yt(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function Nt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function An(e){return e.trim().toLowerCase()}function dc(e,t){const n=An(t),s=e.filter(i=>n?[i.code,i.name,i.name].map(An).some(c=>c.includes(n)):!0).slice(0,50),r=s.length?`
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
              ${s.map(i=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${Nt(i.code)}"
                      data-name="${Nt(i.name)}"
                    >
                      <td class="mono">${Nt(i.code)}</td>
                      <td>${Nt(i.name)}</td>
                      <td>${i.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return to({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:r,emptyMessage:"該当する得意先が見つかりません。"})}function pc(e){return e.toISOString().slice(0,10)}function Ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ye(e,t){return e[t]?`<div class="field-error">${Ge(e[t])}</div>`:""}function tt(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function uc(e,t,n,s){const r=Object.keys(Da).map(u=>`<option value="${u}" ${e.invoiceType===u?"selected":""}>${Da[u]}</option>`).join(""),i=e.lines.map((u,h)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${tt(s,`lines.${h}.productCode`,"input-cell")}" type="text" data-line="${h}" data-field="productCode" value="${Ge(u.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${h}" aria-label="商品検索">🔍</button>
          </div>
          ${Ye(s,`lines.${h}.productCode`)}
        </td>
        <td>
          <input class="${tt(s,`lines.${h}.productName`,"input-cell")}" type="text" data-line="${h}" data-field="productName" value="${Ge(u.productName)}" placeholder="商品名" />
          ${Ye(s,`lines.${h}.productName`)}
        </td>
        <td>
          <input class="${tt(s,`lines.${h}.quantity`,"input-cell numeric")}" type="number" data-line="${h}" data-field="quantity" value="${u.quantity}" min="0" />
          ${Ye(s,`lines.${h}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${h}" data-field="unit" value="${u.unit}" placeholder="本" /></td>
        <td>
          <input class="${tt(s,`lines.${h}.unitPrice`,"input-cell numeric")}" type="number" data-line="${h}" data-field="unitPrice" value="${u.unitPrice}" min="0" />
          ${Ye(s,`lines.${h}.unitPrice`)}
        </td>
        <td class="numeric">${u.amount>0?u.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${h}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${h}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),c=e.lines.reduce((u,h)=>u+h.amount,0),p=Math.floor(c*10/110);return`
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
          <input class="${tt(s,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||pc(new Date)}" />
          ${Ye(s,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${tt(s,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${Ge(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${Ye(s,"customerCode")}
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
      ${Ye(s,"lines")}
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
          <tbody id="invoice-lines">${i||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
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
  `}function mc(e){return"¥"+e.toLocaleString("ja-JP")}function yc(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const hc={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},gc={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},fc={sake:"酒販用",standard:"通常"};function vc(e,t){return`
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
        <td>${yc(s.quote_date)}</td>
        <td>${s.customer_name||"（未選択）"}</td>
        <td>${s.subject||""}</td>
        <td class="numeric">${mc(s.total_amount)}</td>
        <td><span class="badge ${gc[s.status]??"badge-gray"}">${hc[s.status]??s.status}</span></td>
        <td>${fc[s.template_type]??s.template_type}</td>
        <td>
          <button class="button secondary small" data-open-quote="${s.id}">開く</button>
          <button class="button secondary small danger" data-delete-quote="${s.id}" data-quote-no="${s.quote_no}">削除</button>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}const ao="kanei-quote-settings",no=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Ht={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function Na(){try{const e=localStorage.getItem(ao);if(e)return{...Ht,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Ht,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Ht}}function Xe(e){localStorage.setItem(ao,JSON.stringify(e))}function Me(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Se(e,t,n,s="text",r=""){return`<div class="form-row"><label>${t}</label><input type="${s}" id="${e}" value="${Me(n)}" placeholder="${Me(r)}" /></div>`}function bc(e,t,n,s){const r=s.map(i=>`<option value="${Me(i)}" ${n===i?"selected":""}>${Me(i)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${r}</select></div>`}function wc(e){return`
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
        ${bc("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
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
        ${no.map(t=>`
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
  `}function xc(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function na(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:xc(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}na();function ee(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ae(e){return"¥"+e.toLocaleString("ja-JP")}function Ln(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function so(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function oo(e,t,n){return"#"+[e,t,n].map(s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0")).join("")}function sa(e,t){const[n,s,r]=so(e);return oo(n+(255-n)*t,s+(255-s)*t,r+(255-r)*t)}function ro(e,t){const[n,s,r]=so(e);return oo(n*(1-t),s*(1-t),r*(1-t))}function $c(e){const t=ro(e,.15),n=sa(e,.88),s=sa(e,.96);return`
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
`}function _c(e){const t=ro(e,.15),n=sa(e,.88),s=sa(e,.96);return`
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
`}function io(e,t){const n=e.lines.reduce((_,D)=>_+D.amount,0),s=Math.round(n*e.taxRate/100),r=n+s,i=e.templateType==="sake",c=i?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",p=i?9:6,u=e.lines.map((_,D)=>{const P=i?`<td style="font-size:9px;">${ee(_.janCode)}</td><td style="text-align:center;">${_.caseQty??""}</td><td style="text-align:right;">${_.retailPrice!=null?Ae(_.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${D+1}</td>
      <td class="mono" style="font-size:9px;">${ee(_.productCode)}</td>
      <td>${ee(_.productName)}</td>
      ${P}
      <td style="text-align:right;">${_.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${ee(_.unit)}</td>
      <td style="text-align:right;">${Ae(_.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${p}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,h=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),f=h?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${ee(h)}</p>
    </div>
  `:"",g=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",$=[];e.validUntil&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${Ln(e.validUntil)}</div></div>`),e.paymentTerms&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${ee(e.paymentTerms)}</div></div>`),e.deliveryDate&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${ee(e.deliveryDate)}</div></div>`),e.deliveryPlace&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${ee(e.deliveryPlace)}</div></div>`);const A=$.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min($.length,4)},1fr);">${$.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <div class="q-meta-box">
      ${e.quoteNo?`<div class="q-meta-item"><span class="q-meta-label">見積番号</span><span class="q-meta-val">${ee(e.quoteNo)}</span></div>`:""}
      <div class="q-meta-item"><span class="q-meta-label">見積日</span><span class="q-meta-val">${Ln(e.quoteDate)}</span></div>
    </div>
  </div>

  <!-- 取引先（左）・自社情報（右） -->
  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${ee(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${ee(e.customerAddress)}</p>`:""}
    </div>
    <div class="q-seller-col">
      <!-- 自社情報: 社名の右に印鑑 -->
      <div class="q-seller-name-row">
        <span class="q-seller-name">${ee(t.companyName)}</span>
        ${g}
      </div>
      ${t.companyPostal?`<p class="q-seller-sub">〒${ee(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${ee(t.companyAddress1)}${t.companyAddress2?" "+ee(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${ee(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${ee(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${ee(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  ${A}

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${Ae(r)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${ee(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${ee(t.defaultHeaderNote)}</p>`:""}

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
      <tr><td colspan="${p-1}" style="text-align:right;">小計</td><td style="text-align:right;">${Ae(n)}</td></tr>
      <tr><td colspan="${p-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${Ae(s)}</td></tr>
      <tr class="q-total-row"><td colspan="${p-1}" style="text-align:right;">合計</td><td style="text-align:right;">${Ae(r)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${ee(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${ee(t.defaultFooterNote)}</p>`:""}

  ${f}
</div>`}function lo(e,t,n,s,r,i,c){const p=e.lines.reduce((_,D)=>_+D.amount,0),u=Math.round(p*e.taxRate/100),h=p+u,f=e.templateType==="sake",g=s.length>=1?t.filter(_=>_.name.includes(s)||_.code.includes(s)).slice(0,8):[],$=r.length>=1?n.filter(_=>_.name.includes(r)||_.code.includes(r)).slice(0,8):[];if(e.previewMode){const _=c.accentColor||"#0968e5";return`
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
        ${_c(_)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${io(e,c)}
      </div>
    `}const A=e.lines.map((_,D)=>{const P=f?`
      <td><input type="text" class="jan-input" data-line-idx="${D}" value="${ee(_.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${D}" value="${_.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${D}" value="${_.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${ee(_.productCode)}</td>
      <td>${ee(_.productName)}</td>
      ${P}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${D}" value="${_.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${ee(_.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${D}" value="${_.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${Ae(_.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${D}">×</button></td>
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
          ${no.map(_=>`
            <button type="button" data-action="set-accent-color" data-color="${ee(_.value)}" title="${ee(_.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${c.accentColor===_.value?"#333":"transparent"};background:${ee(_.value)};cursor:pointer;"></button>
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
          <input type="text" id="q-no" value="${ee(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${ee(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${ee(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${ee(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${ee(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">既存得意先</p>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${ee(s)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${g.length>0?`<div class="search-results">${g.map(_=>`
        <button class="search-item" type="button" data-select-customer="${_.code}" data-cust-name="${ee(_.name)}" data-cust-addr="${ee(_.address1||"")}">
          <span class="mono">${_.code}</span> ${ee(_.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName&&!e.isProspect?`<div class="selected-item"><span class="mono">${ee(e.customerCode)}</span> <strong>${ee(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${ee(e.customerAddress)}</span>`:""}</div>`:""}

      <div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--border);">
        <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">見込み顧客から選択</p>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="q-prospect-search" placeholder="見込み顧客名で検索…" style="flex:1;" />
          <button type="button" class="button secondary small" data-action="new-prospect-from-quote">＋ 新規登録</button>
        </div>
        <div id="q-prospect-results"></div>
        ${e.customerName&&e.isProspect?`<div class="selected-item" style="border-left:3px solid #48bb78;"><span style="font-size:11px;background:#48bb78;color:white;border-radius:3px;padding:1px 5px;margin-right:6px;">見込</span> <strong>${ee(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${ee(e.customerAddress)}</span>`:""}</div>`:""}
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
        <input type="text" id="q-prod-search" value="${ee(r)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${$.length>0?`<div class="search-results">${$.map(_=>{const D=i?Za(_,i):{price:_.salePrice||0,label:"卸価格"},P=_.listPrice||0,L=D.label!=="標準価格"&&D.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${_.code}" data-prod-name="${ee(_.name)}" data-prod-price="${D.price}" data-prod-retail="${P}" data-prod-jan="${ee(_.janCode??"")}" data-prod-unit="${ee(_.unit??"本")}" data-prod-case="${_.caseQty??""}">
          <span class="mono">${_.code}</span> ${ee(_.name)}
          <span class="numeric" ${L?'style="color:#2f855a;font-weight:700;"':""}>納入 ${D.price?Ae(D.price):"未設定"} <small>(${D.label})</small>${P?`　定価 ${Ae(P)}`:""}</span>
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
          <tbody>${A}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="3">${ee(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${Ae(p)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${Ae(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${Ae(h)}</span></div>
        </div>
      </div>
    </section>
  `}async function Sc(e,t){const n=t.accentColor||"#0968e5",s=document.createElement("div");s.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",s.innerHTML=`<style>${$c(n)}</style>${io(e,t)}`,document.body.appendChild(s);try{const[{default:r},{jsPDF:i}]=await Promise.all([I(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),I(()=>import("./jspdf.es.min-Bl0ei2Zr.js").then(_=>_.j),[])]),c=await r(s,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),p=210,u=297,h=c.width/p,f=u*h,g=new i({orientation:"portrait",unit:"mm",format:"a4"});let $=0,A=0;for(;$<c.height;){A>0&&g.addPage();const _=Math.min(f,c.height-$),D=document.createElement("canvas");D.width=c.width,D.height=Math.ceil(_);const P=D.getContext("2d");P.fillStyle="#ffffff",P.fillRect(0,0,D.width,D.height),P.drawImage(c,0,$,c.width,_,0,0,c.width,_);const L=D.toDataURL("image/jpeg",.95),S=_/h;g.addImage(L,"JPEG",0,0,p,S),$+=f,A++}g.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(s)}}function Mt(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function co(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function po(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function uo(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function kc(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function Pc(e,t,n,s,r){const i=new Map,c=new Map;for(const f of e){if(f.date>=t&&f.date<=n){const g=i.get(f.productCode);g?(g.amt+=f.amount,g.qty+=f.qty):i.set(f.productCode,{name:f.productName,vol:f.volumeMl,amt:f.amount,qty:f.qty})}f.date>=s&&f.date<=r&&c.set(f.productCode,(c.get(f.productCode)??0)+f.amount)}const p=[...i.entries()].map(([f,g])=>({code:f,...g})).sort((f,g)=>g.amt-f.amt),u=p.reduce((f,g)=>f+g.amt,0);let h=0;return p.map(f=>{h+=f.amt;const g=u>0?Math.round(f.amt*1e4/u)/100:0,$=h<=u*.7?"A":h<=u*.9?"B":"C",A=c.get(f.code)??0,_=A>0?Math.round((f.amt-A)/A*1e3)/10:null;return{code:f.code,name:f.name,volumeMl:f.vol,amount:f.amt,qty:f.qty,sharePct:g,rank:$,prevAmount:A,growthRate:_}})}function Ec(e,t,n){const s=new Date,r=s.toISOString().slice(0,10);let i=r,c=r,p="";switch(e){case"week":{const f=new Date(s);f.setDate(f.getDate()-7),i=f.toISOString().slice(0,10),c=r,p="直近7日間";break}case"month":{i=r.slice(0,7)+"-01",c=r,p="当月";break}case"90days":{const f=new Date(s);f.setDate(f.getDate()-90),i=f.toISOString().slice(0,10),c=r,p="直近90日間";break}case"year":{const f=new Date(s);f.setFullYear(f.getFullYear()-1),i=f.toISOString().slice(0,10),c=r,p="直近1年間";break}case"custom":{i=t||r,c=n||r,p=`${i} 〜 ${c}`;break}}const u=new Date(i);u.setFullYear(u.getFullYear()-1);const h=new Date(c);return h.setFullYear(h.getFullYear()-1),{start:i,end:c,prevStart:u.toISOString().slice(0,10),prevEnd:h.toISOString().slice(0,10),label:p}}function Ac(e,t="all",n=[],s="year",r,i,c=[]){const p=Ec(s,r,i),u=n.length>0?Pc(n,p.start,p.end,p.prevStart,p.prevEnd):e.map(S=>({code:S.code,name:S.name,volumeMl:S.volumeMl,amount:S.yearAmount,qty:S.yearQty,sharePct:S.sharePct,rank:S.rank,prevAmount:S.prevAmount,growthRate:S.growthRate})),h=u.filter(S=>S.rank==="A").length,f=u.filter(S=>S.rank==="B").length,g=u.filter(S=>S.rank==="C").length,$=u.filter(S=>S.growthRate!=null&&S.growthRate>10),A=u.filter(S=>S.growthRate!=null&&S.growthRate<-10);let _=u,D="全商品";switch(t){case"A":_=u.filter(S=>S.rank==="A"),D="Aランク";break;case"B":_=u.filter(S=>S.rank==="B"),D="Bランク";break;case"C":_=u.filter(S=>S.rank==="C"),D="Cランク";break;case"growing":_=$,D="成長商品(+10%以上)";break;case"declining":_=A,D="衰退商品(-10%以下)";break}const P=(S,o,l)=>`<button class="button ${t===S?"primary":"secondary"} small" data-product-filter="${S}">${o} (${l})</button>`,L=(S,o)=>`<button class="button ${s===S?"primary":"secondary"} small" data-product-period="${S}">${o}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${L("week","週次")}
        ${L("month","月次")}
        ${L("90days","90日")}
        ${L("year","年間")}
        ${L("custom","指定期間")}
      </div>
      <div class="custom-range" style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">
        <input type="date" id="pp-range-start" class="range-input" value="${r||""}" />
        <span>〜</span>
        <input type="date" id="pp-range-end" class="range-input" value="${i||""}" />
        <button class="button secondary small" type="button" data-action="pp-apply-range">適用</button>
        <span style="color:var(--text-secondary);font-size:13px;margin-left:8px;">${p.label}</span>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${h} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">Bランク（70-90%）</p>
        <p class="kpi-value">${f} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${$.length}</p>
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
        <h2>${D} (${_.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${P("all","全て",u.length)}
        ${P("A","A",h)}
        ${P("B","B",f)}
        ${P("C","C",g)}
        ${P("growing","成長",$.length)}
        ${P("declining","衰退",A.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ne("rank","ABC",c)}
              ${ne("name","商品名",c)}
              ${ne("amount","売上",c,"numeric")}
              ${ne("sharePct","構成比",c,"numeric")}
              ${ne("qty","本数",c,"numeric")}
              ${ne("growthRate","前年同期比",c,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${lt(_,c,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(S=>`
              <tr>
                <td>${po(S.rank)}</td>
                <td>${S.name?S.name.slice(0,25):S.code}${S.volumeMl?` <small>${S.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${co(S.amount)}</td>
                <td class="numeric">${S.sharePct}%</td>
                <td class="numeric">${S.qty.toLocaleString()}</td>
                <td class="numeric">${uo(S.growthRate)}</td>
              </tr>
            `).join("")}
            ${_.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Lc(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,s="billing",r="jan"){const i=e.filter(A=>A.currentRank==="A").length,c=e.filter(A=>A.prevRank&&A.currentRank<A.prevRank).length,p=e.filter(A=>A.prevRank&&A.currentRank>A.prevRank).length,u=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,h=2011,f=[];for(let A=u;A>=h&&f.length<6;A--)f.push(A);const g=`
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;">
      <span style="font-size:13px;color:var(--text-secondary);margin-right:4px;">年度：</span>
      ${f.map(A=>`
        <button class="button ${A===n?"primary":"secondary"} small"
          data-action="efficiency-year-change" data-year="${A}"
          style="min-width:80px;">
          ${A}年度
        </button>
      `).join("")}
      <select data-action="efficiency-year-select"
        style="margin-left:8px;padding:4px 8px;border-radius:4px;border:1px solid var(--border);background:var(--surface);font-size:13px;">
        <option value="">過去年度…</option>
        ${Array.from({length:u-h+1},(A,_)=>u-_).filter(A=>!f.includes(A)).map(A=>`<option value="${A}" ${A===n?"selected":""}>${A}年度</option>`).join("")}
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
        <p class="kpi-value">${p} ${s==="billing"?"社":"店舗"}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>${s==="billing"?"得意先":"店舗（納品先）"}ABC分析（${n}${r==="jan"?"年・1〜12月":r==="oct"?"酒造年度・10〜翌9月":"年度・4〜翌3月"}）</h2></div>
      ${g}
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ne("currentRank","ABC",t)}
              ${ne("name","得意先名",t)}
              ${ne("yearAmount","年間売上",t,"numeric")}
              ${ne("sharePct","構成比",t,"numeric")}
              ${ne("orderDays","受注日数",t,"numeric")}
              ${ne("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${lt(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(A=>`
              <tr>
                <td>${po(A.currentRank)}</td>
                <td>${A.name||A.code}</td>
                <td class="numeric">${co(A.yearAmount)}</td>
                <td class="numeric">${A.sharePct}%</td>
                <td class="numeric">${A.orderDays}日</td>
                <td class="numeric">${uo(A.growthRate)}</td>
                <td>${kc(A.currentRank,A.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Cc(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Qt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Dc(e,t,n=null,s=null){const r=e.length?e.map(i=>`
            <tr class="clickable-row${i.documentNo===n?" selected-row":""}"
                data-doc-no="${i.documentNo}">
              <td class="mono">${i.documentNo}</td>
              <td>${Cc(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${i.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Qt(i.amount)}</td>
            </tr>
            ${i.documentNo===n?qc(s):""}
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
  `}function qc(e){if(!e)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(s=>`
      <tr>
        <td class="mono" style="width:40px">${s.lineNo}</td>
        <td class="mono" style="width:70px">${s.productCode}</td>
        <td class="product-name">${s.productName}</td>
        <td class="numeric" style="width:50px">${s.quantity}</td>
        <td class="numeric" style="width:80px">${Qt(s.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Qt(s.amount)}</td>
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
            <td class="numeric">${Qt(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function Tc(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Ic(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function mo(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function yo(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function Cn(e){const t=mo(yo(e),6);return t.setHours(23,59,59,999),t}function Dn(e){return new Date(`${e}T00:00:00`)}function qn(e){return`${e.getMonth()+1}/${e.getDate()}`}function Nc(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Mc(){const e=new Date,t=yo(Ic(Tc(e),-3)),n=Cn(new Date(e.getFullYear(),e.getMonth()+4,0)),s=[];let r=new Date(t);for(;r<=n;){const i=Cn(r);s.push({start:new Date(r),end:i,label:`${qn(r)} - ${qn(i)}`}),r=mo(r,7)}return s}function Rc(e){const t=Mc(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,s=t.map(i=>`
        <div class="gantt-week">
          <span>${i.label}</span>
        </div>
      `).join(""),r=e.length?e.map(i=>{const c=Dn(i.startDate),p=Dn(i.expectedDoneDate),u=Math.max(0,t.findIndex(g=>g.end>=c)),h=Math.max(u,t.reduce((g,$,A)=>$.start<=p?A:g,u)),f=[`仕込番号: ${i.jikomiNo}`,`銘柄: ${i.productName}`,`期間: ${i.startDate} - ${i.expectedDoneDate}`,`タンク: ${i.tankNo}`,`備考: ${i.note||"なし"}`].join(`
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
                  title="${Nc(f)}"
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
  `}function Tn(e,t){const n={planned:"neutral",active:"warning",done:"success"},s=e.map(p=>`
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
          <span class="status-pill ${n[p.status]}">${As[p.status]}</span>
        </td>
        <td>${p.note||"―"}</td>
      </tr>
    `).join(""),r=e.filter(p=>p.status==="active").length,i=e.filter(p=>p.status==="done").length,c=e.filter(p=>p.status==="planned").length;return`
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
  `}function Oc(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},s=e.map(u=>`
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
    `).join(""),r=e.filter(u=>u.status==="approved").length,i=e.filter(u=>u.status==="submitted").length,c=e.filter(u=>u.status==="pending").length;return`
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
        <p class="kpi-value">${e.filter(u=>u.status==="approved").reduce((u,h)=>u+h.volume,0).toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">酒税対象</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">申請中</p>
        <p class="kpi-value">${i} 件</p>
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
  `}function Bc(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function jc(e,t){return`
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
        ${e?`<p class="field-error">${Bc(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function zc(e){return`
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
  `}function Fc(e){return`
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
  `}const cn={query:"",businessType:"",tradeType:"",areaCode:"",activeOnly:"",page:1},_t=50;function Vc(e,t){let n=e;if(t.query){const p=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(p)||u.name.toLowerCase().includes(p)||u.kanaName&&u.kanaName.toLowerCase().includes(p)||u.address1&&u.address1.toLowerCase().includes(p)||u.phone&&u.phone.toLowerCase().includes(p))}t.businessType&&(n=n.filter(p=>p.businessType===t.businessType)),t.tradeType&&(n=n.filter(p=>p.tradeType===t.tradeType)),t.areaCode&&(n=n.filter(p=>p.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(p=>p.isActive):t.activeOnly==="inactive"&&(n=n.filter(p=>!p.isActive));const s=Math.max(1,Math.ceil(n.length/_t)),i=(Math.min(t.page,s)-1)*_t,c=n.slice(i,i+_t);return{filtered:n,paged:c,totalPages:s}}function In(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const s=(t-1)*_t+1,r=Math.min(t*_t,e),i=[];for(let c=1;c<=n;c++)c===1||c===n||c>=t-2&&c<=t+2?i.push(`<button class="button ${c===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${c}" style="min-width:36px;padding:4px 8px;">${c}</button>`):(c===t-3||c===t+3)&&i.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${s}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${i.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function Uc(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),s=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
          ${Object.entries(Jc).map(([r,i])=>`<option value="${r}" ${t.tradeType===r?"selected":""}>${i}</option>`).join("")}
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
  `}function Ma(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Yc(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}const Jc={B2B:"B2B（卸）",B2B2C:"B2B2C（生産者）",B2C:"B2C（小売）"};function Kc(e){return e?`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${{B2B:"#3b82f6",B2B2C:"#8b5cf6",B2C:"#10b981"}[e]??"#999"};">${e}</span>`:"―"}function Hc(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${Kc(t.tradeType)}</td>
          <td>${Yc(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${Ma(t.address1||"",16)}</td>
          <td>${Ma(t.address2||"",12)}</td>
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
      `).join("")}function Rt(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function Qc(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${Ma(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${Rt(t.purchasePrice)}</td>
          <td class="numeric">${Rt(t.salePrice)}</td>
          <td class="numeric">${Rt(t.listPrice)}</td>
          <td class="numeric">${Rt(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function Wc(e,t,n=cn,s=[]){const{filtered:r,paged:i,totalPages:c}=Vc(e.customers,n);return`
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
        ${Uc(e.customers,n)}
        ${In(r.length,n.page,c)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${ne("code","コード",s)}
                ${ne("name","得意先名",s)}
                ${ne("kanaName","カナ",s)}
                <th>略称</th>
                ${ne("businessType","業態",s)}
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
                ${ne("areaName","地区",s)}
                ${ne("closingDay","締日",s,"numeric")}
                ${ne("paymentDay","支払日",s,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Hc(lt(i,s,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${In(r.length,n.page,c)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${ne("code","コード",s)}
                ${ne("name","商品名",s)}
                <th>カナ</th>
                ${ne("category","分類",s)}
                <th>酒税区分</th>
                ${ne("alcoholDegree","度数",s,"numeric")}
                ${ne("volumeMl","容量ml",s,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${ne("purchasePrice","生産者価格",s,"numeric")}
                ${ne("salePrice","卸価格",s,"numeric")}
                ${ne("listPrice","定価(小売)",s,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Qc(lt(e.products,s,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function ha(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Gc(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${Us.map(s=>`<option ${n?.materialType===s?"selected":""}>${s}</option>`).join("")}
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
  `}function Xc(e){const t=e.map(r=>{const c=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${ha(r.unitCost)}</td>
          <td class="numeric">${ha(r.currentStock*r.unitCost)}</td>
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
        <p class="kpi-value">${ha(s)}</p>
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
  `}function Zc(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function ga(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const ed={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function td(e){return`
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
          <td class="numeric">${ga(n.billedAmount)}</td>
          <td class="numeric">${ga(n.paymentAmount)}</td>
          <td class="numeric">${ga(n.balanceAmount)}</td>
          <td>${Zc(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${ed[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function at(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Nn(e){return e.trim().toLowerCase()}function ad(e,t){const n=Nn(t),s=e.filter(i=>n?[i.code,i.name,i.janCode].map(Nn).some(c=>c.includes(n)):!0),r=s.length?`
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
              ${s.map(i=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${at(i.code)}"
                      data-name="${at(i.name)}"
                    >
                      <td class="mono">${at(i.code)}</td>
                      <td>${at(i.name)}</td>
                      <td class="mono">${at(i.janCode)}</td>
                      <td>${at(i.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return to({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:r,emptyMessage:"該当する商品が見つかりません。"})}function Je(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function nd(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},i={unpaid:"warning",partial:"neutral",paid:"success"},c=e.map(g=>`
      <tr>
        <td class="mono">${g.documentNo}</td>
        <td>${g.purchaseDate}</td>
        <td class="mono">${g.supplierCode}</td>
        <td>${g.supplierName}</td>
        <td>${g.itemName}</td>
        <td class="numeric">${g.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${Je(g.unitPrice)}</td>
        <td class="numeric"><strong>${Je(g.amount)}</strong></td>
        <td>
          <span class="status-pill ${s[g.status]}">${n[g.status]}</span>
        </td>
      </tr>
    `).join(""),p=t.map(g=>`
      <tr>
        <td class="mono">${g.supplierCode}</td>
        <td>${g.supplierName}</td>
        <td class="numeric">${Je(g.totalPurchase)}</td>
        <td class="numeric">${Je(g.paidAmount)}</td>
        <td class="numeric"><strong>${Je(g.balance)}</strong></td>
        <td>${g.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${i[g.status]}">${r[g.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${g.supplierCode}" ${g.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),u=e.reduce((g,$)=>g+$.amount,0),h=t.reduce((g,$)=>g+$.balance,0),f=t.filter(g=>g.status!=="paid").length;return`
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
        <p class="kpi-value">${Je(u)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${Je(h)}</p>
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
  `}function ht(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function sd(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},r=e.map(f=>`
      <tr>
        <td class="mono">${f.billNo}</td>
        <td>${f.supplierName}</td>
        <td class="numeric">${ht(f.amount)}</td>
        <td>${f.issueDate}</td>
        <td>${f.dueDate}</td>
        <td>
          <span class="status-pill ${s[f.status]}">${n[f.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${f.id}" ${f.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),i=t.map(f=>{const g=f.minimumStock>0&&f.currentStock<f.minimumStock*1.2;return`
        <tr>
          <td class="mono">${f.code}</td>
          <td>${f.name}</td>
          <td class="numeric ${g?"text-danger":""}">
            ${f.currentStock.toLocaleString("ja-JP")} ${f.unit}
            ${g?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${f.minimumStock.toLocaleString("ja-JP")} ${f.unit}</td>
          <td class="numeric">${ht(f.unitCost)}</td>
          <td class="numeric">${ht(f.currentStock*f.unitCost)}</td>
          <td>${f.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=e.filter(f=>f.status==="holding"),p=c.reduce((f,g)=>f+g.amount,0),u=t.reduce((f,g)=>f+g.currentStock*g.unitCost,0),h=t.filter(f=>f.minimumStock>0&&f.currentStock<f.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${ht(p)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${ht(u)}</p>
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
  `}function Ra(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function _e(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Oa(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${_e(e)}</pre>
    </div>
  `}function od(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function Ot(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${_e(e)}</code>
      ${od(e)}
    </div>
  `}function nt(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${_e(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${_e(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${_e(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?Oa(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${_e(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${_e(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function Bt(e){return`
    <div class="setup-step setup-step-compact" data-step="${_e(e.stepLabel)}">
      <h3>${_e(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${_e(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function jt(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function Mn(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function rd(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?Ra(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${jt(e.lastOverallSync)}">${Mn(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${jt(e.lastOverallSync)==="success"?"1時間以内":jt(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${_e(t.displayName)}</td>
              <td><span class="status-pill ${t.tableType==="raw"?"neutral":"success"}">${t.tableType==="raw"?"RAW":"正規化"}</span></td>
              <td class="numeric">${t.rowCount.toLocaleString("ja-JP")}</td>
              <td>${t.lastSyncAt?Ra(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${jt(t.lastSyncAt)}">${Mn(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function id(e){if(!e.length)return"";const t=r=>r==="ok"?"&#x2705;":r==="warn"?"&#x26A0;&#xFE0F;":"&#x274C;",n=r=>r==="ok"?"success":r==="warn"?"warning":"error",s=e.every(r=>r.status==="ok");return`
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
  `}function ld(e,t,n,s,r){const i={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${r?id(r):""}

    ${s?rd(s):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${Ra(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${i[e.status]}</span>
        </p>
        <p class="kpi-sub">${_e(e.message)}</p>
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
      ${Bt({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${Ot("git --version")}
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
      ${Bt({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${Ot("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${Bt({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${Ot("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${Ot("python get-pip.py")}
        `})}
      ${Bt({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${nt({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${nt({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${nt({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${nt({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${nt({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${nt({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${Oa(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${Oa(`{
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
            <span class="config-value">${_e(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${_e(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${_e(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${_e(n)}"
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
  `}function wt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ho(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function cd(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(g=>g.amount),1),s=28,r=6,i=140,c=100,p=760,u=p-i-c,h=t.length*(s+r)+16,f=t.map((g,$)=>{const A=g.amount/n*u,_=$*(s+r)+8,D=g.abcRank==="A"?"#2F855A":g.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${i-8}" y="${_+s/2+5}" class="chart-axis" text-anchor="end">${g.name.length>10?g.name.slice(0,10)+"…":g.name}</text>
          <rect x="${i}" y="${_}" width="${A}" height="${s}" rx="4" fill="${D}" opacity="0.85" />
          <text x="${i+A+8}" y="${_+s/2+5}" class="chart-axis">${(g.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${p} ${h}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${f}
    </svg>
  `}function go(e,t,n="得意先"){if(e.length===0||t.length===0)return'<p class="empty-row">データなし</p>';const s=t.map(u=>`<th class="numeric">${u}</th>`).join(""),r=t.map((u,h)=>e.reduce((f,g)=>f+(g.values[h]??0),0)),i=r.reduce((u,h)=>u+h,0),c=e.map(u=>{const h=u.values.reduce((g,$)=>g+$,0),f=u.values.map(g=>`<td class="numeric">${g>0?(g/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`<tr>
      <td>${u.label}</td>
      ${f}
      <td class="numeric"><strong>${(h/1e4).toFixed(0)}万</strong></td>
    </tr>`}).join(""),p=r.map(u=>`<td class="numeric"><strong>${u>0?(u/1e4).toFixed(0)+"万":"—"}</strong></td>`).join("");return`
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
            ${p}
            <td class="numeric">${(i/1e4).toFixed(0)}万</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `}function dd(e){return ho(e)}function pd(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,20),n=760,s=320,r={top:24,right:56,bottom:60,left:72},i=n-r.left-r.right,c=s-r.top-r.bottom,p=Math.max(...t.map(_=>_.amount),1),u=i/t.length,h=[0,.25,.5,.75,1].map(_=>{const D=r.top+c-c*_;return`<g>
      <line x1="${r.left}" y1="${D}" x2="${n-r.right}" y2="${D}" class="chart-grid" />
      <text x="4" y="${D+4}" class="chart-axis">${Math.round(p*_/1e4)}万</text>
    </g>`}).join(""),f=[0,25,50,70,90,100].map(_=>{const D=r.top+c-c*_/100,P=_===70||_===90;return`<g>
      <text x="${n-4}" y="${D+4}" class="chart-axis" text-anchor="end">${_}%</text>
      ${P?`<line x1="${r.left}" y1="${D}" x2="${n-r.right}" y2="${D}" stroke="${_===70?"#2F855A":"#B7791F"}" stroke-dasharray="6 3" stroke-width="1.5" opacity="0.6" />`:""}
    </g>`}).join(""),g=t.map((_,D)=>{const P=_.amount/p*c,L=Math.max(u-10,16),S=r.left+D*u+(u-L)/2,o=r.top+c-P,l=_.abcRank==="A"?"#2F855A":_.abcRank==="B"?"#B7791F":"#718096",d=_.name.length>6?_.name.slice(0,6)+"…":_.name;return`<g>
      <rect x="${S}" y="${o}" width="${L}" height="${P}" rx="4" fill="${l}" opacity="0.8" />
      <text x="${S+L/2}" y="${s-8}" class="chart-axis centered-axis pareto-label" transform="rotate(-35 ${S+L/2} ${s-16})">${d}</text>
    </g>`}).join(""),$=t.map((_,D)=>{const P=r.left+D*u+u/2,L=r.top+c-c*_.cumRatio/100;return`${P},${L}`}).join(" "),A=t.map((_,D)=>{const P=r.left+D*u+u/2,L=r.top+c-c*_.cumRatio/100;return`<circle cx="${P}" cy="${L}" r="3.5" fill="#C53D3D" />`}).join("");return`
    <svg viewBox="0 0 ${n} ${s}" class="sales-chart pareto-chart" role="img" aria-label="商品ABC パレート図">
      ${h}${f}${g}
      <polyline points="${$}" fill="none" stroke="#C53D3D" stroke-width="2.5" stroke-linejoin="round" />
      ${A}
    </svg>`}function ud(e){const t=e.ranking.filter(p=>p.abcRank==="A").length,n=e.ranking.filter(p=>p.abcRank==="B").length,s=e.ranking.filter(p=>p.abcRank==="C").length,r=e.ranking.filter(p=>p.abcRank==="A").reduce((p,u)=>p+u.amount,0),i=e.ranking.map(p=>`
    <tr>
      <td class="mono">${p.code}</td>
      <td>${p.name}</td>
      <td class="numeric">${wt(p.amount)}</td>
      <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${p.ratio.toFixed(1)}%</td>
      <td class="numeric">${p.cumRatio.toFixed(1)}%</td>
      <td><span class="status-pill ${dd(p.abcRank)}">${p.abcRank}</span></td>
    </tr>`).join(""),c=go(e.monthlyByProduct,e.months,"商品名");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">商品数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}品 <span class="kpi-sub">${(r/e.totalAmount*100).toFixed(1)}%</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}品</div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${s}品</div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>パレート図</h2><p class="panel-caption">棒：売上金額 / 線：累積構成比（上位20品）</p></div></div>
      <div class="chart-scroll">${pd(e.ranking)}</div>
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
    </section>`}function md(e){const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,s=e.ranking.filter(u=>u.abcRank==="C").length,r=e.ranking.filter(u=>u.abcRank==="A").reduce((u,h)=>u+h.amount,0),i=e.ranking.filter(u=>u.abcRank==="B").reduce((u,h)=>u+h.amount,0),c=e.ranking.filter(u=>u.abcRank==="C").reduce((u,h)=>u+h.amount,0),p=e.ranking.map(u=>`
    <tr>
      <td class="mono">${u.code}</td>
      <td>${u.name}</td>
      <td class="numeric">${wt(u.amount)}</td>
      <td class="numeric">${u.ratio.toFixed(1)}%</td>
      <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
      <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
      <td><span class="status-pill ${ho(u.abcRank)}">${u.abcRank}</span></td>
    </tr>`).join("");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">得意先数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${wt(r)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${wt(i)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${s}社 <span class="kpi-sub">${wt(c)}</span></div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先別売上ランキング</h2><p class="panel-caption">売上金額上位15社</p></div></div>
      <div class="chart-scroll">${cd(e.ranking)}</div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先ABC分析</h2><p class="panel-caption">A: 累積70%以内 / B: 70〜90% / C: 90%超</p></div></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>コード</th><th>得意先名</th><th class="numeric">売上額</th><th class="numeric">構成比</th><th class="numeric">累積構成比</th><th class="numeric">伝票数</th><th>ランク</th></tr></thead>
          <tbody>${p}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先別月次推移</h2><p class="panel-caption">上位10得意先の月別売上推移</p></div></div>
      ${go(e.monthlyByCustomer,e.months,"得意先")}
    </section>`}function yd(e,t,n,s=""){const r=n==="customer"?md(e):t?ud(t):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>',i=new Date().getFullYear(),c=Array.from({length:5},($,A)=>String(i-A)),p=s.length===4?s:s.slice(0,4),u=s.length===7?s.slice(5,7):"",h=["01","02","03","04","05","06","07","08","09","10","11","12"],f={"01":"1月","02":"2月","03":"3月","04":"4月","05":"5月","06":"6月","07":"7月","08":"8月","09":"9月",10:"10月",11:"11月",12:"12月"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>ABC分析 <span style="font-size:0.75em;font-weight:400;color:var(--text-secondary);">${s?s.length===7?`${s.slice(0,4)}年${f[s.slice(5)]??s.slice(5)}`:`${s}年`:"全期間"}</span></h1>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <select id="analysis-period-year" class="input-sm">
          <option value="">全期間</option>
          ${c.map($=>`<option value="${$}" ${p===$?"selected":""}>${$}年</option>`).join("")}
        </select>
        <select id="analysis-period-month" class="input-sm" ${p?"":"disabled"}>
          <option value="">全月</option>
          ${h.map($=>`<option value="${$}" ${u===$?"selected":""}>${f[$]}</option>`).join("")}
        </select>
      </div>
    </section>

    <div class="tab-bar" style="margin-bottom:16px;">
      <button class="tab-btn ${n==="customer"?"active":""}" type="button" data-analysis-tab="customer">👥 得意先ABC分析</button>
      <button class="tab-btn ${n==="product"?"active":""}" type="button" data-analysis-tab="product">📦 商品ABC分析</button>
    </div>

    ${r}
  `}const hd={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},Rn={amount:"売上額",quantity:"出荷本数",volume:"移出量"},Ba=10;function dn(e){const[t,n]=e.split("-").map(Number);return n>=Ba?t:t-1}function gd(e){const t=Ba-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(Ba).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function fd(e,t,n){const s=c=>t==="quantity"?c.quantity:t==="volume"?c.volumeMl:c.amount,r=new Map;for(const c of e){const p=n==="fiscal"?`${dn(c.month)}年度`:c.month.slice(0,4);r.set(p,(r.get(p)??0)+s(c))}return{curr:[...r.entries()].sort((c,p)=>c[0].localeCompare(p[0])).map(([c,p])=>({month:c,amount:p}))}}function vd(e){const t=new Set;for(const n of e)t.add(dn(n.month));return[...t].sort((n,s)=>s-n).map(String)}function ct(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function bd(e){return e.replace("-","/")}const On={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function wd(e,t="#0F5B8D",n=[],s="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const r=n.length>0&&n.some(S=>S.amount>0),i=760,c=280,p={top:16,right:24,bottom:36,left:s==="amount"?64:56},u=i-p.left-p.right,h=c-p.top-p.bottom,f=[...e.map(S=>S.amount),...n.map(S=>S.amount)],g=Math.max(...f,1),$=u/e.length;function A(S){if(s==="quantity")return S>=1e4?`${(S/1e4).toFixed(1)}万本`:`${Math.round(S).toLocaleString()}本`;if(s==="volume"){const o=S/1e3;return o>=1e4?`${(o/1e3).toFixed(0)}kL`:`${Math.round(o).toLocaleString()} L`}return`${Math.round(S/1e4).toLocaleString("ja-JP")}万円`}function _(S){return s==="quantity"?`${S.toLocaleString()}本`:s==="volume"?ca(S):ct(S)}const D=[0,.25,.5,.75,1].map(S=>{const o=p.top+h-h*S,l=A(g*S);return`<g>
        <line x1="${p.left}" y1="${o}" x2="${i-p.right}" y2="${o}" class="chart-grid" />
        <text x="4" y="${o+4}" class="chart-axis">${l}</text>
      </g>`}).join(""),P=e.map((S,o)=>{const l=r?Math.max(($-18)/2,10):Math.max($-18,24),d=r?2:0,m=p.left+o*$+($-(r?l*2+d:l))/2,y=S.amount/g*h,w=p.top+h-y,v=n[o]?.amount??0,x=v/g*h,k=p.top+h-x,C=r?`<rect x="${m}" y="${k}" width="${l}" height="${x}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${_(v)}</title></rect>`:"",q=r?m+l+d:m;return`<g>
      ${C}
      <rect x="${q}" y="${w}" width="${l}" height="${y}" rx="4" fill="${t}" opacity="${.6+o/e.length*.35}"><title>${_(S.amount)}</title></rect>
      <text x="${p.left+o*$+$/2}" y="${c-8}" class="chart-axis centered-axis">${bd(S.month)}</text>
    </g>`}).join(""),L=r?`
    <g transform="translate(${i-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${i} ${c}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${D}${P}${L}
    </svg>
  `}function ca(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function xd(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(s=>`
    <tr>
      <td class="mono">${s.code}</td>
      <td>${s.name}</td>
      <td class="numeric">${ct(s.amount)}</td>
      <td class="numeric">${s.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${ca(s.volumeMl)}</td>
      <td class="numeric">${s.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${s.code}" data-drilldown-name="${s.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function $d(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${ct(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${ca(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function Bn(e,t,n){const s=t?e.filter(i=>i.tag.includes(t)||i.name.includes(t)):e,r=s.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':s.map(i=>`
        <tr>
          <td class="mono">${i.code||"―"}</td>
          <td>${i.name||"未設定"}</td>
          <td class="mono">${i.tag||"―"}</td>
          <td class="numeric">${ct(i.amount)}</td>
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
  `}function fo(e,t,n="all",s="",r=[],i=[],c="",p="",u=null,h="all",f="",g=[],$=[],A=[],_=null,D=[],P=[],L="amount",S="calendar"){const o=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",l=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,m=n!=="all"&&r.length>0&&t!=="staff"?r:l,y=lt(m,A,hd),w={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},v=Rn[L],x=H=>L==="quantity"?H.quantity:L==="volume"?H.volumeMl:H.amount,k=H=>L==="quantity"?`${H.toLocaleString()}本`:L==="volume"?ca(H):ct(H);let C,q=[],M,j,N;if(_&&_.monthlySales.length>0)C=_.monthlySales.slice(-24).map(H=>({month:H.month,amount:x(H)})),M=`${_.name} の月別${v}`,j=`${_.tab==="customers"?"得意先":"商品"}: ${_.code}`,N="#0968e5";else if(D.length>0&&n!=="all"){C=D.map(J=>({month:J.month,amount:x(J)})),q=P.map(J=>({month:J.month,amount:x(J)}));const H=C.reduce((J,U)=>J+U.amount,0),G=q.reduce((J,U)=>J+U.amount,0),Z=G>0?(H-G)/G*100:0,oe=Z>0?"+":"";M=`${w[n]} ${v}（${s}）`,j=`${k(H)}${G>0?` / 前年比 ${oe}${Z.toFixed(1)}%`:""}`,N="#2f855a"}else{C=fd(e.monthlySales,L,S).curr,q=[];const G=C.reduce((oe,J)=>oe+J.amount,0);M=`${S==="fiscal"?"決算年度別":"暦年別"}${v}`,j=`累計 ${k(G)}（${C.length}${S==="fiscal"?"期":"年"}）`,N="#0F5B8D"}const z=["amount","quantity","volume"].map(H=>`<button class="tab-button ${H===L?"active":""}" data-chart-metric="${H}">${Rn[H]}</button>`).join(""),B=["all","yearly","monthly","weekly","daily"].map(H=>`<button class="button ${H===n?"primary":"secondary"} small" type="button" data-analytics-period="${H}">${On[H]}</button>`).join(""),R=S==="fiscal"&&n==="yearly"?vd(e.monthlySales):i,Y=S==="fiscal"&&n==="yearly"&&!R.includes(s)?R[0]??"":s,Q=n!=="all"&&R.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${R.map(H=>`<option value="${H}" ${H===Y?"selected":""}>${S==="fiscal"&&n==="yearly"?H+"年度":H}</option>`).join("")}
      </select>`:"";let X="",W="";if(t==="staff"){const H=["all","yearly","monthly","weekly","daily"].map(U=>`<button class="button ${U===h?"primary":"secondary"} small" type="button" data-staff-period="${U}">${On[U]}</button>`).join(""),G=h!=="all"&&g.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${g.map(U=>`<option value="${U}" ${U===f?"selected":""}>${U}</option>`).join("")}
        </select>`:"",oe=($.length>0?$:e.staffTotals).filter(U=>!c||U.name.includes(c)||U.code.includes(c)),J=h!=="all"&&f?` (${f})`:"";if(X=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${H}</div>
        ${G}
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
            ${oe.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':oe.map(U=>`
                <tr>
                  <td class="mono">${U.code||"―"}</td>
                  <td>${U.name||"未設定"}</td>
                  <td class="numeric">${ct(U.amount)}</td>
                  <td class="numeric">${U.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${U.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${U.code}" data-staff-name="${U.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const U=u.breakdownTab,K=h!=="all"&&f?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${f}</span>`:"";W=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${u.name} の内訳${K}</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>

          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div class="tab-group">
              <button class="tab-button ${U==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${U==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${p}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${U==="customers"?Bn(u.customerRows,p,"得意先名"):Bn(u.productRows,p,"商品名")}
        </article>
      `}}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group" style="font-size:12px;">
          <button class="tab-button ${S==="calendar"?"active":""}" data-fiscal-mode="calendar">暦年（1〜12月）</button>
          <button class="tab-button ${S==="fiscal"?"active":""}" data-fiscal-mode="fiscal">決算期（10〜9月）</button>
        </div>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <h2>${M}</h2>
            <p class="panel-caption">${j}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${z}</div>
            ${_?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${wd(C,N,q,L)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${o}</h2>
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
            <div class="button-group">${B}</div>
            ${Q}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${ne("code","コード",A,"mono")}
                  ${ne("name","名称",A)}
                  ${ne("amount","売上額",A,"numeric")}
                  ${ne("quantity","本数",A,"numeric")}
                  ${ne("volumeMl","移出量",A,"numeric")}
                  ${ne("documents","伝票数",A,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${xd(y,!0)}</tbody>
            </table>
          </div>
        `:X}
      </article>
    </section>

    ${_?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${_.name} の${_.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${_.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${_.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${$d(_.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${W}
  `}const jn=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:gd,monthToFiscalYear:dn,renderSalesAnalytics:fo},Symbol.toStringTag,{value:"Module"}));function gt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function _d(e){const t=Math.max(...e.salesByProduct.flatMap(i=>i.values),1),n=e.salesByProduct.map(i=>{const c=i.values.map((p,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(p/t*120)}px" title="${e.months[u]}: ${gt(p)}"></div>
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
        <td class="numeric">${gt(i.costPrice)}</td>
        <td class="numeric">${gt(i.sellPrice)}</td>
        <td class="numeric">${gt(i.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${i.marginRate>=40?"success":"warning"}">${i.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(i=>{const c=i.values.reduce((p,u)=>p+u,0);return`
        <tr>
          <td>${i.label}</td>
          ${i.values.map(p=>`<td class="numeric">${(p/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${gt(c)}</strong></td>
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
  `}function Sd(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Wt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function zn(e){return e.toISOString().slice(0,10)}function kd(e,t,n,s=null,r=null){const i=e.length?e.map(c=>`
            <tr class="clickable-row${c.documentNo===s?" selected-row":""}"
                data-doc-no="${c.documentNo}">
              <td class="mono">${c.documentNo}</td>
              <td>${Sd(c.date)}</td>
              <td>
                <div class="table-title">${c.customerName}</div>
                <div class="table-sub mono">${c.customerCode}</div>
              </td>
              <td class="numeric">${Wt(c.amount)}</td>
            </tr>
            ${c.documentNo===s?Pd(r):""}
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
          <input id="sales-start" type="date" value="${t||zn(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||zn(new Date)}" />
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
  `}function Pd(e){if(!e)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(s=>`
      <tr>
        <td class="mono" style="width:40px">${s.lineNo}</td>
        <td class="mono" style="width:70px">${s.productCode}</td>
        <td>${s.productName}</td>
        <td class="numeric" style="width:50px">${s.quantity}</td>
        <td class="numeric" style="width:80px">${Wt(s.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Wt(s.amount)}</td>
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
            <td class="numeric">${Wt(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function zt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ed(e,t,n,s){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},i={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},p=e.map(g=>`
      <tr>
        <td>${g.saleTime}</td>
        <td class="mono">${g.productCode}</td>
        <td>${g.productName}</td>
        <td class="numeric">${g.quantity}</td>
        <td class="numeric">${zt(g.unitPrice)}</td>
        <td class="numeric"><strong>${zt(g.amount)}</strong></td>
        <td>${r[g.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(g=>`
      <tr>
        <td class="mono">${g.orderNo}</td>
        <td>${g.orderDate}</td>
        <td>${g.customerName}</td>
        <td>${g.postalCode} ${g.address}</td>
        <td>${g.items.map($=>`${$.productName} ×${$.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${zt(g.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[g.status]}">${i[g.status]}</span>
        </td>
        <td>${g.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${g.id}">詳細</button>
        </td>
      </tr>
    `).join(""),h=e.reduce((g,$)=>g+$.amount,0),f=t.filter(g=>g.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${zt(h)}</p>
        <p class="kpi-sub">${e.length} 件 / ${s}</p>
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
  `}const fa={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Ad={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Ld(e,t,n,s){const r=Ad[e],i=Object.keys(fa).map(p=>`
      <button class="tab-button ${e===p?"active":""}" data-import-entity="${p}">
        ${fa[p]}
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
                ${t.columns.map(h=>`<td>${String(p[h]??"")}</td>`).join("")}
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
      <div class="tab-group" style="flex-wrap: wrap;">${i}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${fa[e]} のCSV形式</h2>
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

    ${c}

    ${s?`<section class="panel"><p class="sync-message">${s}</p></section>`:""}
  `}const me={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function Cd(e,t,n){const s=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:me.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:me.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:me.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:me.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:me.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:me.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:me.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:me.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:me.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:me.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:me.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:me.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:me.date}];e.lines.slice(0,6).forEach((c,p)=>{const u=33+p*8.5;s.push({id:`line${p}_name`,label:`明細${p+1} 品名`,x:5,y:u,fontSize:7.5,value:c.productName+(c.spec?` ${c.spec}`:""),color:me.detail},{id:`line${p}_code`,label:`明細${p+1} CD`,x:64,y:u,fontSize:7.5,value:c.productCode,color:me.detail},{id:`line${p}_qty`,label:`明細${p+1} 数量`,x:124,y:u,fontSize:8,value:c.quantity>0?String(c.quantity):"",color:me.detail},{id:`line${p}_price`,label:`明細${p+1} 原単価`,x:163,y:u,fontSize:8,value:c.unitPrice>0?c.unitPrice.toLocaleString("ja-JP"):"",color:me.detail},{id:`line${p}_amount`,label:`明細${p+1} 原価金額`,x:176,y:u,fontSize:8,value:c.amount>0?c.amount.toLocaleString("ja-JP"):"",color:me.detail},{id:`line${p}_retail`,label:`明細${p+1} 売単価`,x:193,y:u,fontSize:8,value:c.retailPrice?c.retailPrice.toLocaleString("ja-JP"):"",color:me.detail})});const r=e.lines.reduce((c,p)=>c+(p.amount||0),0),i=e.lines.reduce((c,p)=>c+p.quantity,0);return s.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(i),color:me.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:me.total}),n&&s.forEach(c=>{const p=n[c.id];p&&(c.x=p.x,c.y=p.y)}),s}function Dd(e,t,n,s,r){const c=Cd(e,t,s).map(u=>`
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
        色: <span style="color:${me.header}">■ヘッダ</span>
        <span style="color:${me.code}">■コード</span>
        <span style="color:${me.date}">■日付</span>
        <span style="color:${me.detail}">■明細</span>
        <span style="color:${me.total}">■合計</span>
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
  `}function va(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const s=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,i=parseFloat(n.style.top)||0;t[s]={x:r,y:i}}),t}function qd(e,t,n){const s=[...new Set(e.map(_=>_.areaCode).filter(Boolean))].sort(),r=[...new Set(e.map(_=>_.businessTypeName||_.businessType).filter(Boolean))].sort(),i=e.filter(_=>_.isAtRisk),c=e.filter(_=>!_.isAtRisk&&_.isDormant),p=e.filter(_=>!_.isAtRisk&&!_.isDormant&&_.amount12m>0),u=e.filter(_=>!_.isAtRisk&&!_.isDormant&&_.amount12m===0),h=t.filter(_=>_.lat&&_.lng),f=e.some(_=>_.lat&&_.lng),g=e.length,$=e.filter(_=>_.lat&&_.lng).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業 / Map</p>
        <h1>取引先マップ</h1>
        <p class="meta-note">OpenStreetMap で得意先の位置情報を可視化します。</p>
      </div>
    </section>

    ${f?$<g?`<section class="panel" style="border-left:4px solid #3b82f6;margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <div style="flex:1;font-size:0.85rem;">
              📍 位置情報: <strong>${$}/${g}件</strong> 取得済み
              （未取得 ${g-$}件）
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
              「ジオコーディング実行」で住所から緯度経度を自動取得します（${g}件）。<br>
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
        ${s.map(_=>`<option value="${_}" ${n.filterArea===_?"selected":""}>${_}</option>`).join("")}
      </select>
      <select id="map-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${r.map(_=>`<option value="${_}" ${n.filterBiz===_?"selected":""}>${_}</option>`).join("")}
      </select>
    </div>

    <section class="panel" style="padding:0;overflow:hidden;">
      <div id="customer-map" style="height:560px;width:100%;"></div>
    </section>
    <div id="map-data" style="display:none"
      data-customers="${encodeURIComponent(JSON.stringify(e))}"
      data-deliveries="${encodeURIComponent(JSON.stringify(h.map(_=>({name:_.name,address:_.address,lat:_.lat,lng:_.lng,phone:_.phone}))))}"></div>

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

  `}const Td={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},Id=["new","picking","packed","shipped","delivered"];function Nd(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(i=>t[i.stage].push(i));const n=Id.map(i=>{const c=Td[i],p=t[i];return`
      <div class="wf-col" data-wf-stage="${i}">
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
  `}function Md(e,t,n){const s=e.cart.reduce((i,c)=>i+c.amount,0);return`
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

      ${Rd(e,t,n)}
    </div>
  `}function Rd(e,t,n){if(e.step==="customer"){const s=e.customerQuery.toLowerCase(),r=s?t.filter(i=>i.name.toLowerCase().includes(s)||i.code.toLowerCase().includes(s)):t.slice(0,20);return`
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
          ${r.slice(0,50).map(i=>{const c=e.cart.find(p=>p.productCode===i.code);return`
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
  `}const Fn={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},Vn={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},Un={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function Od(e,t){const n=e.find(i=>i.id===t)??e[0],s=e.filter(i=>i.status==="new").length,r=e.filter(i=>i.status==="confirmed").length;return`
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
                <span class="status-pill ${Vn[i.status]}">${Fn[i.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${Un[i.language]} · 👥 ${i.partySize}名
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
            <span class="status-pill ${Vn[n.status]}">${Fn[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${Un[n.language]}</dd></div>
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
  `}const Bd=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,jd=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function zd(e,t){const n=t?e.find(r=>r.id===t):null,s=t==="__new__";return`
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
  `}function Fd(e,t,n,s){const[r,i]=t.split("-").map(d=>parseInt(d,10)),c=new Date(r,i-1,1),p=new Date(r,i,0),u=c.getDay(),h=p.getDate(),f=[];for(let d=0;d<u;d++)f.push({isOutside:!0});for(let d=1;d<=h;d++)f.push({date:new Date(r,i-1,d)});for(;f.length%7!==0;)f.push({isOutside:!0});const g=n?e.filter(d=>d.category===n):e,$={};g.forEach(d=>{const m=d.startsAt.slice(0,10);$[m]??=[],$[m].push(d)});const A=new Date().toISOString().slice(0,10),_=f.map(d=>{if(d.isOutside)return'<div class="cal-cell cal-outside"></div>';const m=d.date,y=`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}-${String(m.getDate()).padStart(2,"0")}`,w=$[y]??[],v=y===A,x=m.getDay();return`
        <div class="cal-cell ${v?"cal-today":""} ${x===0?"cal-sun":x===6?"cal-sat":""}"
             data-cal-date="${y}">
          <div class="cal-day-num">${m.getDate()}</div>
          <div class="cal-events">
            ${w.slice(0,3).map(k=>`
              <button class="cal-event" data-cal-event-id="${k.id}"
                      style="background:${k.color||on[k.category]||"#0F5B8D"};"
                      title="${k.title}">
                <span class="cal-event-time">${k.isAllDay?"終日":new Date(k.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${k.title}</span>
              </button>
            `).join("")}
            ${w.length>3?`<button class="cal-event-more" data-cal-date="${y}">+${w.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),D=s?.isOpen?Vd(s):"",P=new Date(r,i-2,1),L=new Date(r,i,1),S=`${P.getFullYear()}-${String(P.getMonth()+1).padStart(2,"0")}`,o=`${L.getFullYear()}-${String(L.getMonth()+1).padStart(2,"0")}`,l=(()=>{const d=new Date;return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`})();return`
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
          <button class="button secondary" data-action="cal-prev" data-ym="${S}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${l}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${o}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(sn).map(([d,m])=>`<option value="${d}" ${n===d?"selected":""}>${m}</option>`).join("")}
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
        ${_}
      </div>
    </section>

    ${D}
  `}function Vd(e){const t=e.event;return`
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
                ${Object.entries(sn).map(([n,s])=>`<option value="${n}" ${t.category===n?"selected":""}>${s}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?Yn(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?Yn(t.endsAt):""}" />
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
  `}function Yn(e){const t=new Date(e),n=s=>String(s).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const ft={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function Ud(e,t){const n=t?e.find(s=>s.id===t):null;return`
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
        <p class="form-hint">${ft[n.provider]?.description??""}</p>
        ${ft[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${ft[n.provider].setupUrl}" target="_blank">${ft[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(ft[n.provider]?.fields??[]).map(s=>`
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
  `}function Yd(e,t){const n=e.reduce((i,c)=>i+c.totalAmount,0),s=e.filter(i=>i.financialStatus==="paid").length,r=e.filter(i=>i.fulfillmentStatus!=="fulfilled"&&i.fulfillmentStatus!=="shipped").length;return`
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
  `}function Jd(e,t,n){return`
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
  `}function Kd(e,t,n){const s=t==="__new__"?null:e.find(c=>c.id===t),r=t==="__new__";return n?.role==="admin"?`
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
                <td>${ea[c.department]}</td>
                <td>${Zt[c.role]}</td>
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
              ${Object.entries(ea).map(([c,p])=>`<option value="${c}" ${s?.department===c?"selected":""}>${p}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Zt).map(([c,p])=>`<option value="${c}" ${s?.role===c?"selected":""}>${p}</option>`).join("")}
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
    `}function Hd(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${ea[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Zt[e.role]}</dd></div>
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
    `}function Qd(e){const t={};return e.forEach(n=>{const s=n.userEmail??"(anonymous)";t[s]=(t[s]??0)+1}),`
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
  `}function Wd(e){const t=e.prospects.reduce((i,c)=>i+c.expectedAmount,0),n=e.prospects.reduce((i,c)=>i+c.expectedAmount*c.probability/100,0),s=e.prospects.filter(i=>i.stage==="won").length,r=e.prospects.filter(i=>i.stage==="hot"||i.stage==="negotiating").length;return`
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

    ${e.viewMode==="kanban"?Gd(e.prospects):Xd(e.prospects)}

    ${Zd(e)}
  `}function Gd(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(s=>{const r=e.filter(c=>c.stage===s),i=r.reduce((c,p)=>c+p.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${s}">
          <div class="pk-col-header" style="--pk-color:${rn[s]};">
            <span class="pk-col-label">${ia[s]}</span>
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
  `}function Xd(e){return`
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
                <td><span class="status-pill" style="background:${rn[t.stage]};color:white;">${ia[t.stage]}</span></td>
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
  `}function Zd(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(s=>s.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(ia).map(([s,r])=>`<option value="${s}" ${n?.stage===s?"selected":""}>${r}</option>`).join("")}
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
  `}function ep(e,t,n){const s=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
                <td>${ta[i.eventType]||i.eventType}</td>
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
                <td>${ta[i.eventType]||i.eventType}</td>
                <td class="mono" style="font-size:12px;">${i.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${i.message}</td>
                <td><span class="status-pill ${i.status==="sent"?"success":"warning"}">${i.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function tp(e,t,n,s){const r=new Map(t.map(g=>[g.code,g])),i=e.filter(g=>g.callDirection==="inbound").length,c=e.filter(g=>g.callDirection==="outbound").length,p=e.filter(g=>g.callStatus==="missed").length,u=e.reduce((g,$)=>g+($.durationSeconds??0),0),h=g=>{if(g===0)return"―";const $=Math.floor(g/60),A=g%60;return $>0?`${$}分${A}秒`:`${A}秒`},f=g=>{if(g.matchedCustomerCode){const $=r.get(g.matchedCustomerCode);if($)return`${$.name} (既存)`}return"未登録番号"};return`
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
        <p class="kpi-sub">不在 ${p}件</p>
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
            ${e.map(g=>`
              <tr>
                <td style="font-size:12px;">${g.startedAt?new Date(g.startedAt).toLocaleString("ja-JP"):"―"}</td>
                <td>
                  ${g.callDirection==="inbound"?'<span class="status-pill neutral">📞 着信</span>':'<span class="status-pill neutral">📤 発信</span>'}
                </td>
                <td>
                  <strong>${f(g)}</strong>
                  ${g.matchedCustomerCode?`<br/><span class="mono" style="font-size:11px;color:var(--text-secondary);">${g.matchedCustomerCode}</span>`:""}
                </td>
                <td class="mono" style="font-size:12px;">${g.callDirection==="inbound"?g.fromNumber:g.toNumber}</td>
                <td>
                  ${g.callStatus==="missed"?'<span class="status-pill warning">不在着信</span>':g.callStatus==="answered"?'<span class="status-pill success">応答</span>':`<span class="status-pill neutral">${g.callStatus}</span>`}
                </td>
                <td>${h(g.durationSeconds??0)}</td>
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
  `}const ap=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function np(e){const t=e.activeListId?e.lists.find(i=>i.id===e.activeListId):null,n=e.items.filter(i=>i.status==="new").length,s=e.items.filter(i=>i.status==="imported").length,r=e.items.filter(i=>i.status==="excluded").length;return`
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
            ${ap.map(i=>`<option value="${i}" ${e.searchBusinessType===i?"selected":""}>${i}</option>`).join("")}
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
  `}const Jn={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},sp={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},op={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function $e(e){return"¥"+e.toLocaleString("ja-JP")}function St(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function vo(e,t){const n=e.reduce((i,c)=>i+c.amount,0),s=Math.floor(n*t),r=n+s;return{subtotal:n,taxAmount:s,total:r}}const de={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function ue(e,t){const n=e.align??"left",s=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${s}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function ba(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),s=n-2018;return{y:s>0?String(s).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function rp(e,t,n){const s=ba(e.documentDate),r=ba(e.orderDate??e.documentDate),i=ba(e.deliveryDate??e.documentDate),c=e.lines.slice(0,6).map((P,L)=>{const S=de.detailStartY+L*de.detailRowH,o=de.detailCols,l=[],d=(m,y)=>{y&&l.push(ue({...m,y:S,x:m.x+0},y))};return d(o.productName,P.productName+(P.spec?` ${P.spec}`:"")),d(o.productCode,P.productCode),d(o.color,P.color??""),d(o.size,[P.size,P.caseQty?`×${P.caseQty}`:""].filter(Boolean).join(" ")),d(o.unit,P.unit),d(o.quantity,P.quantity>0?P.quantity.toLocaleString("ja-JP"):""),d(o.correctedQty,P.correctedQuantity?P.correctedQuantity.toLocaleString("ja-JP"):""),d(o.discount,P.discount?P.discount.toLocaleString("ja-JP"):""),d(o.unitPrice,P.unitPrice>0?P.unitPrice.toLocaleString("ja-JP"):""),d(o.costAmount,P.amount>0?P.amount.toLocaleString("ja-JP"):""),d(o.retailPrice,P.retailPrice?P.retailPrice.toLocaleString("ja-JP"):""),d(o.note,P.receivedAmount?P.receivedAmount.toLocaleString("ja-JP"):""),l.join("")}).join(""),p=e.lines.reduce((P,L)=>P+(L.amount||0),0),u=e.lines.reduce((P,L)=>P+(L.retailPrice||0)*(L.correctedQuantity??L.quantity),0),h=e.lines.reduce((P,L)=>P+(L.receivedAmount||0),0),f=e.lines.reduce((P,L)=>P+(L.returnAmount||0),0),g=e.lines.reduce((P,L)=>P+L.quantity,0),$=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",A=n.calibrationOffsetX||0,_=n.calibrationOffsetY||0,D=`transform: translate(${A}mm, ${_}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${$}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${D}">
        ${ue(de.currentDateY,s.y)}
        ${ue(de.currentDateM,s.m)}
        ${ue(de.currentDateD,s.d)}
        ${ue(de.documentNo,e.documentNo)}
        ${e.settlementPrint?ue(de.settlementCheck,"✓"):""}

        ${ue(de.vendorName,t.name)}
        ${ue(de.vendorAddress,t.address1)}
        ${ue(de.chainStoreCode,e.chainStoreCode??"")}
        ${ue(de.categoryCode,e.categoryCode??"")}
        ${ue(de.slipNumber,e.documentNo)}
        ${ue(de.vendorCode,e.slipTypeCode??"")}

        ${ue(de.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${ue(de.orderDateY,r.y)}
        ${ue(de.orderDateM,r.m)}
        ${ue(de.orderDateD,r.d)}
        ${ue(de.deliveryDateY,i.y)}
        ${ue(de.deliveryDateM,i.m)}
        ${ue(de.deliveryDateD,i.d)}
        ${ue(de.orderNo,e.orderNo??"")}
        ${ue(de.partnerCode,e.vendorCode??"")}

        ${c}

        ${ue(de.totalQty,g.toLocaleString("ja-JP"))}
        ${ue(de.receivedTotal,h.toLocaleString("ja-JP"))}
        ${ue(de.returnTotal,f.toLocaleString("ja-JP"))}
        ${ue(de.correctedCostTotal,p.toLocaleString("ja-JP"))}
        ${ue(de.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function ip(e,t,n){const{subtotal:s,taxAmount:r,total:i}=vo(e.lines,e.taxRate),c=e.previousBalance??0,p=e.paymentAmount??0,u=c-p+i,h=e.lines.map(g=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${g.note??""}</td>
        <td>${g.productName}${g.spec?` <span style="color:#636e72;font-size:9pt;">/ ${g.spec}</span>`:""}</td>
        <td class="numeric">${g.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${g.unit}</td>`:""}
        <td class="numeric">${$e(g.unitPrice)}</td>
        <td class="numeric">${$e(g.amount)}</td>
      </tr>
    `).join(""),f=Array.from({length:Math.max(0,6-e.lines.length)}).map(()=>`
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
        <div><dt>請求日</dt><dd>${St(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${St(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${$e(u)}</span>
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
        <tbody>${h}${f}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${$e(s)} / 消費税: ${$e(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${c?`<tr><th>前回御請求額</th><td>${$e(c)}</td></tr>`:""}
          ${p?`<tr><th>ご入金額</th><td>▲ ${$e(p)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${$e(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${$e(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${$e(u)}</td></tr>
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
  `}function lp(e,t,n){const{subtotal:s,taxAmount:r,total:i}=vo(e.lines,e.taxRate),c=e.lines.map(u=>`
      <tr>
        <td>${u.productName}${u.spec?` <span style="color:#636e72;font-size:9pt;">/ ${u.spec}</span>`:""}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${u.unit}</td>`:""}
        <td class="numeric">${$e(u.unitPrice)}</td>
        <td class="numeric">${$e(u.amount)}</td>
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
        <div><dt>見積日</dt><dd>${St(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${St(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${$e(i)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${$e(s)} / 消費税: ${$e(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${$e(s)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${$e(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${$e(i)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?St(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function cp(e,t,n,s){let r="";switch(e){case"chain_store":r=rp(s,n,t);break;case"quotation":r=lp(s,n,t);break;case"invoice_monthly":r=ip(s,n,t);break}const i=Object.keys(Jn).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${Jn[u]}</button>`).join(""),c=s.lines.map((u,h)=>`
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${h}" data-print-lfield="productName" value="${u.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${h}" data-print-lfield="quantity" value="${u.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${h}" data-print-lfield="unitPrice" value="${u.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${u.amount>0?u.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${h}">✕</button></td>
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
  `}const dp={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},pp={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function bo(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],s="",r=!1;for(let p=0;p<e.length;p++){const u=e[p];r?u==='"'?e[p+1]==='"'?(s+='"',p++):r=!1:s+=u:u==='"'?r=!0:u===","?(n.push(s),s=""):u===`
`||u==="\r"?(u==="\r"&&e[p+1]===`
`&&p++,n.push(s),n.some(h=>h!=="")&&t.push(n),n=[],s=""):s+=u}if((s!==""||n.length>0)&&(n.push(s),n.some(p=>p!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const i=t[0].map(p=>p.trim()),c=[];for(let p=1;p<t.length;p++){const u={};i.forEach((h,f)=>{u[h]=(t[p][f]??"").trim()}),c.push(u)}return{columns:i,rows:c}}function wo(e,t,n){const s=dp[e],r=s.filter(p=>!t.includes(p)),i=n.map(p=>{const u=[];r.length>0&&u.push(`必須列欠損: ${r.join(",")}`);for(const h of s)t.includes(h)&&!p[h]&&u.push(`${h}が空`);return{...p,_valid:u.length===0,_error:u[0]}}),c=i.filter(p=>p._valid).length;return{entity:e,columns:t,rows:i,totalRows:n.length,validRows:c,invalidRows:i.length-c}}function xo(e){const n=pp[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function $o(e,t){const{supabaseInsert:n}=await I(async()=>{const{supabaseInsert:p}=await Promise.resolve().then(()=>te);return{supabaseInsert:p}},void 0);let s=0,r=0;const c={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const p of t){if(!p._valid)continue;const{_valid:u,_error:h,...f}=p,g={...f};if(!g.id){const $=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";g.id=String(f[$]??`${e}-${Date.now()}-${s+r}`)}for(const $ of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof g[$]=="string"&&g[$]!==""){const A=Number(g[$]);Number.isFinite(A)&&(g[$]=A)}try{await n(c,g)!==null?s++:r++}catch{r++}}return{inserted:s,failed:r}}const up=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:xo,importToSupabase:$o,parseCSV:bo,validateImport:wo},Symbol.toStringTag,{value:"Module"}));function wa(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function mp(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function yp(e,t,n,s,r){const i=n.reduce((h,f)=>h+f.rowCount,0),c=n.map(h=>h.lastSyncAt).filter(h=>h!==null).sort().reverse()[0]??null,p=100,u=Math.max(1,Math.ceil(r/p));return`
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
        <p class="kpi-value">${c?wa(c):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${h.lastSyncAt?wa(h.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(h=>h.tableName===e)?.displayName??e}</h2>
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
            ${t.map(h=>`
            <tr>
              <td class="numeric mono">${h._record_index}</td>
              <td class="mono">${h._source_file||""}</td>
              <td class="numeric">${h._record_size??""} B</td>
              <td>${h._synced_at?wa(h._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${h._raw_b64?h._raw_b64.slice(0,200):""}">${mp(h._raw_b64)}</td>
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
  `}const dt=400,pt=240;function se(e){return e.toLocaleString("ja-JP")}function xa(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function hp(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function Te(e,t,n,s=""){return`<th class="${s}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${hp(n,t)}</th>`}function vt(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function gp(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const s=e.products.slice().sort((L,S)=>(e.productTotals[S.code]??0)-(e.productTotals[L.code]??0)).slice(0,6),r=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],i=820,c=280,p={top:20,right:20,bottom:40,left:60},u=i-p.left-p.right,h=c-p.top-p.bottom,f=t.map(L=>s.reduce((S,o)=>S+(n[o.code]?.[L]??0),0)),g=Math.max(...f,1),$=u/t.length,A=Math.max($-10,14),_=[0,.25,.5,.75,1].map(L=>{const S=p.top+h-h*L,o=`${Math.round(g*L/100)*100}`;return`
      <line x1="${p.left}" y1="${S}" x2="${i-p.right}" y2="${S}" class="chart-grid" />
      <text x="6" y="${S+4}" class="chart-axis">${Number(o).toLocaleString("ja-JP")}</text>
    `}).join(""),D=t.map((L,S)=>{let o=p.top+h;const l=p.left+S*$+($-A)/2,d=s.map((k,C)=>{const M=(n[k.code]?.[L]??0)/g*h;return o-=M,`<rect x="${l}" y="${o}" width="${A}" height="${M}" fill="${r[C%r.length]}" opacity="0.85" rx="${C===s.length-1?3:0}" />`}).join(""),[m,y]=L.split("-"),w=parseInt(y),v=w===1||S%3===0,x=w===1?`${m.slice(2)}年`:`${w}月`;return`<g>${d}${v?`<text x="${l+A/2}" y="${c-10}" class="chart-axis centered-axis">${x}</text>`:""}</g>`}).join(""),P=s.map((L,S)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${r[S%r.length]};"></span>
       ${L.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${i} ${c}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${_}${D}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${p.left}px;display:flex;flex-wrap:wrap;">${P}</div>
  `}function fp(e){const{months:t,products:n}=e,s=n.slice().sort((c,p)=>(e.productTotals[p.code]??0)-(e.productTotals[c.code]??0)).slice(0,50),r=t.map(c=>{const[p,u]=c.split("-"),h=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${h===1?`${p.slice(2)}年1月`:`${h}月`}</th>`}).join(""),i=s.map(c=>{const p=t.map(u=>{const h=e.matrix[c.code]?.[u]??0;return`<td class="numeric">${h>0?se(h):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${c.code}</td>
        <td style="white-space:nowrap;">${c.name}</td>
        ${p}
        <td class="numeric"><strong>${se(e.productTotals[c.code]??0)}</strong></td>
        <td class="numeric">${se(Math.round(e.productAvg[c.code]??0))}</td>
        <td class="numeric">${se(Math.round(e.productStdDev[c.code]??0))}</td>
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
  `}function vp(e,t){const n=e.months[e.months.length-1]??"",s=e.months[e.months.length-2]??"",r=e.months.length-13,i=r>=0?e.months[r]:"",c=e.products.reduce((A,_)=>A+(e.matrix[_.code]?.[n]??0),0),p=e.products.reduce((A,_)=>A+(e.matrix[_.code]?.[s]??0),0),u=i?e.products.reduce((A,_)=>A+(e.matrix[_.code]?.[i]??0),0):0,h=p>0?(c-p)/p*100:0,f=u>0?(c-u)/u*100:0,g=A=>A>=0?"+":"",$=[1,2,3,5].map(A=>`<option value="${A}" ${A===t?"selected":""}>${A}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${se(c)} 本</p>
        <p class="kpi-sub">${xa(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${h>=0?"":"text-danger"}">${g(h)}${h.toFixed(1)}%</p>
        <p class="kpi-sub">${xa(s)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${f>=0?"":"text-danger"}">${u>0?`${g(f)}${f.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${i?`${xa(i)} 比`:"前年データなし"}</p>
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
            <select data-action="demand-years-back" style="width:80px;">${$}</select>
          </label>
          <button class="button secondary" type="button" data-action="demand-csv-export">CSV出力</button>
        </div>
      </div>
      ${gp(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${fp(e)}
    </section>
  `}function bp(e,t){const s=e.slice().sort((i,c)=>{if(!t)return 0;const p=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return p*i.productName.localeCompare(c.productName,"ja");case"ss-avg":return p*(i.avgMonthlyDemand-c.avgMonthlyDemand);case"ss-std":return p*(i.demandStdDev-c.demandStdDev);case"ss-ss":{const u=Math.ceil(vt(i.serviceLevel)*i.demandStdDev*Math.sqrt(i.leadTimeDays/30)),h=Math.ceil(vt(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return p*(u-h)}case"ss-rop":{const u=Math.ceil(i.avgMonthlyDemand*(i.leadTimeDays/30)+vt(i.serviceLevel)*i.demandStdDev*Math.sqrt(i.leadTimeDays/30)),h=Math.ceil(c.avgMonthlyDemand*(c.leadTimeDays/30)+vt(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return p*(u-h)}default:return 0}}).map(i=>{const c=vt(i.serviceLevel),p=i.leadTimeDays/30,u=Math.ceil(c*i.demandStdDev*Math.sqrt(p)),h=Math.ceil(i.avgMonthlyDemand*p+u),f=u-i.safetyStockQty,g=f>0?"text-danger":f<-u*.3?"text-warning":"",$=[.9,.95,.99].map(A=>`<option value="${A}" ${Math.abs(i.serviceLevel-A)<.01?"selected":""}>${(A*100).toFixed(0)}%</option>`).join("");return`
      <tr>
        <td style="white-space:nowrap;">${i.productName}</td>
        <td class="numeric">${se(Math.round(i.avgMonthlyDemand))}</td>
        <td class="numeric">${se(Math.round(i.demandStdDev))}</td>
        <td>
          <input class="input-sm" type="number" min="1" max="180"
            value="${i.leadTimeDays}"
            data-action="ss-lead-time" data-code="${i.productCode}"
            style="width:60px;text-align:right;" />
        </td>
        <td>
          <select class="input-sm" data-action="ss-service-level" data-code="${i.productCode}"
            style="width:64px;">${$}</select>
        </td>
        <td class="numeric"><strong>${se(u)}</strong></td>
        <td class="numeric">${se(h)}</td>
        <td class="numeric ${g}">
          ${f>0?`+${se(f)}`:se(f)}
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
              ${Te("商品名","ss-name",t)}
              ${Te("月平均需要","ss-avg",t,"numeric")}
              ${Te("標準偏差","ss-std",t,"numeric")}
              <th class="numeric">リードタイム(日)</th>
              <th>サービス率</th>
              ${Te("安全在庫[算出]","ss-ss",t,"numeric")}
              ${Te("発注点","ss-rop",t,"numeric")}
              <th class="numeric">現在との差</th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const wp={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function xp(e,t,n,s){const r={draft:"下書き",confirmed:"確定",actual:"実績入力済"},i={draft:"neutral",confirmed:"info",actual:"success"},c=y=>Object.entries(wp).map(([w,v])=>`<option value="${w}" ${w===y?"selected":""}>${v}</option>`).join(""),p=640,u=y=>y.map(w=>{const v=Math.max(0,w.demandForecast+w.safetyStockTarget-w.openingStock),x=w.plannedQty>0?w.plannedQty:Math.round(v),k=x>0?Math.ceil(x/p*10)/10:0,C=w.plannedQty>0?(w.actualQty-w.plannedQty)/w.plannedQty*100:null,q=C!==null?C>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${w.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${w.productCode}"
            style="width:92px;">${c(w.productionType)}</select>
        </td>
        <td class="numeric">${se(Math.round(w.demandForecast))}</td>
        <td class="numeric">${se(Math.round(w.safetyStockTarget))}</td>
        <td class="numeric">${se(Math.round(w.openingStock))}</td>
        <td class="numeric"><strong>${se(Math.round(v))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${w.plannedQty}"
            data-action="plan-qty" data-code="${w.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">${w.actualQty>0?se(w.actualQty):"—"}</td>
        <td class="numeric ${q}">
          ${C!==null?`${C>=0?"+":""}${C.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${k>0?`${k.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${i[w.status]??"neutral"}">${r[w.status]??w.status}</span>
        </td>
      </tr>
    `}).join(""),f=(n==="all"?e:e.filter(y=>y.productionType===n)).slice().sort((y,w)=>{if(!s)return 0;const v=s.dir==="asc"?1:-1,x=Math.max(0,y.demandForecast+y.safetyStockTarget-y.openingStock),k=Math.max(0,w.demandForecast+w.safetyStockTarget-w.openingStock);switch(s.column){case"plan-name":return v*y.productName.localeCompare(w.productName,"ja");case"plan-forecast":return v*(y.demandForecast-w.demandForecast);case"plan-required":return v*(x-k);case"plan-planned":return v*(y.plannedQty-w.plannedQty);case"plan-actual":return v*(y.actualQty-w.actualQty);case"plan-label":{const C=y.plannedQty>0?y.plannedQty:Math.round(x),q=w.plannedQty>0?w.plannedQty:Math.round(k);return v*(C-q)}default:return 0}}),g=u(f),$=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],A=y=>{const v=(y==="all"?e:e.filter(x=>x.productionType===y)).reduce((x,k)=>{const C=Math.max(0,k.demandForecast+k.safetyStockTarget-k.openingStock);return x+(k.plannedQty>0?k.plannedQty:Math.round(C))},0);return Math.ceil(v/p*10)/10},_=$.filter(y=>y.key!=="all").map(y=>{const w=A(y.key),v=e.filter(k=>k.productionType===y.key).length,x=y.key==="make_to_order"?e.filter(k=>k.productionType==="make_to_order"&&k.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${y.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${w>0?w.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${v}商品${x!==null?` · 受注${x}件`:""}</p>
      </div>
    `}).join(""),D=f.reduce((y,w)=>y+w.demandForecast,0),P=f.reduce((y,w)=>y+Math.max(0,w.demandForecast+w.safetyStockTarget-w.openingStock),0),L=f.reduce((y,w)=>y+w.plannedQty,0),S=f.reduce((y,w)=>y+w.actualQty,0),o=A(n),l=new Date,d=Array.from({length:24},(y,w)=>{const v=new Date(l.getFullYear(),l.getMonth()-6+w,1),x=`${v.getFullYear()}-${String(v.getMonth()+1).padStart(2,"0")}`;return`<option value="${x}" ${x===t?"selected":""}>${x.replace("-","年")}月</option>`}).join(""),m=$.map(y=>`<button class="button ${n===y.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${y.key}"
       style="padding:4px 12px;font-size:13px;">${y.label}</button>`).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${d}</select>
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
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${_}</div>
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
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${m}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${Te("商品名","plan-name",s)}
              <th>生産区分</th>
              ${Te("需要予測","plan-forecast",s,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${Te("必要生産数","plan-required",s,"numeric")}
              ${Te("計画数","plan-planned",s,"numeric")}
              ${Te("実績数","plan-actual",s,"numeric")}
              <th class="numeric">達成率</th>
              ${Te("ラベル工数","plan-label",s,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${g||'<tr><td colspan="11" class="empty-row">データなし</td></tr>'}
            ${f.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${se(Math.round(D))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${se(Math.round(P))}</td>
                <td class="numeric">${se(L)}</td>
                <td class="numeric">${S>0?se(S):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${o.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function _o(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n,0).getDate();return Array.from({length:s},(r,i)=>{const c=i+1;return`${e}-${String(c).padStart(2,"0")}`})}function Kn(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function Hn(e){const t=new Date(e).getDay();return t===0||t===6}function $p(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function So(e){return e.partTimers+e.employees}function Ie(e,t,n={partCapacity:dt,empCapacity:pt}){const s=e.filter(f=>f.partTimers>0||f.employees>0);if(s.length===0)return;const r=t.reduce((f,g)=>{const $=g.plannedQty>0?g.plannedQty:Math.max(0,g.demandForecast+g.safetyStockTarget-g.openingStock);return f+$},0);if(r<=0)return;const i=r/s.length;let c=0,p=0,u=1/0;const h=Math.ceil(i/n.partCapacity);for(let f=0;f<=h;f++){const g=i-f*n.partCapacity,$=g>0?Math.ceil(g/n.empCapacity):0,A=f+$;A<u&&(u=A,c=f,p=$)}for(const f of e)f.confirmed||(f.partTimers>0||f.employees>0)&&(f.partTimers=c,f.employees=p)}function _p(e,t,n={partCapacity:dt,empCapacity:pt}){const s=t.filter(p=>So(p)>0).map(p=>p.date).sort();if(s.length===0)return t.map(p=>({date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const r={monthly:0,november:1,annual:2,make_to_order:3},i=e.filter(p=>p.plannedQty>0||Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)>0).map(p=>({productCode:p.productCode,productName:p.productName,productionType:p.productionType,remaining:p.plannedQty>0?p.plannedQty:Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)})).filter(p=>p.remaining>0).sort((p,u)=>(r[p.productionType]??99)-(r[u.productionType]??99)||u.remaining-p.remaining),c=new Map;for(const p of t){const u=$p(p,n);c.set(p.date,{date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const p of i){let u=p.remaining;if(u<=0)continue;if(s.reduce((f,g)=>{const $=c.get(g);return f+Math.max(0,$.capacity-$.totalQty)},0)<=0)break;for(const f of s){if(u<=0)break;const g=c.get(f),$=Math.max(0,g.capacity-g.totalQty);if($<=0)continue;const A=Math.min(u,$);g.items.push({productCode:p.productCode,productName:p.productName,productionType:p.productionType,qty:A}),g.totalQty+=A,g.utilization=g.capacity>0?g.totalQty/g.capacity:0,u-=A}}return t.map(p=>c.get(p.date))}function Gt(e,t=1,n=1){return _o(e).map(s=>({date:s,partTimers:Hn(s)?0:t,employees:Hn(s)?0:n,confirmed:!1}))}function Sp(e,t,n,s=null,r=new Set,i={partCapacity:dt,empCapacity:pt}){const c=_o(t),p=e.filter(C=>!r.has(C.productCode)),u=_p(p,n,i),h=new Map(u.map(C=>[C.date,C])),f=p.reduce((C,q)=>C+(q.plannedQty>0?q.plannedQty:Math.max(0,q.demandForecast+q.safetyStockTarget-q.openingStock)),0),$=e.reduce((C,q)=>C+(q.plannedQty>0?q.plannedQty:Math.max(0,q.demandForecast+q.safetyStockTarget-q.openingStock)),0)-f,A=u.reduce((C,q)=>C+q.totalQty,0),_=n.filter(C=>So(C)>0).length,D=u.reduce((C,q)=>C+q.capacity,0),P=n.reduce((C,q)=>C+q.partTimers,0),L=n.reduce((C,q)=>C+q.employees,0),S=_>0?Math.ceil(f/_):0,o=new Date,l=Array.from({length:24},(C,q)=>{const M=new Date(o.getFullYear(),o.getMonth()-6+q,1),j=`${M.getFullYear()}-${String(M.getMonth()+1).padStart(2,"0")}`;return`<option value="${j}" ${j===t?"selected":""}>${j.replace("-","年")}月</option>`}).join(""),d=new Date(c[0]).getDay(),m=[];for(let C=0;C<d;C++)m.push('<div style="min-height:44px;"></div>');for(const C of c){const q=h.get(C),M=new Date(C).getDay(),j=parseInt(C.split("-")[2]),N=q?.partTimers??0,z=q?.employees??0,B=N+z,R=q?.totalQty??0,Y=q?.utilization??0,Q=C===s,X=B===0?"var(--surface-alt)":Y>.95?"rgba(197,61,61,0.12)":Y>.7?"rgba(183,121,31,0.10)":Y>0?"rgba(47,133,90,0.08)":"var(--surface)",W=B===0?"transparent":Y>.95?"#c53d3d":Y>.7?"#b7791f":Y>0?"#2f855a":"var(--border)",H=M===0?"#c53d3d":M===6?"#0F5B8D":"var(--text)",G=B>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${N>0?`パ${N}`:""}${z>0?`社${z}`:""}</span>`:"";m.push(`
      <div data-action="cal-toggle-day" data-date="${C}"
        style="min-height:44px;padding:3px;border:${Q?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${X};cursor:pointer;display:flex;flex-direction:column;
          ${Q?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${H};line-height:1;">${j}</span>
          ${G}
        </div>
        ${B>0?`
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${R>0?se(R):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(Y*100,100)}%;background:${W};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const w=m.length%7;if(w>0)for(let C=0;C<7-w;C++)m.push('<div style="min-height:44px;"></div>');const v=s?h.get(s):null;s&&n.find(C=>C.date===s);const x=s&&v?(()=>{const C=v,q=parseInt(s.split("-")[2]),M=Kn(s),j=Math.round(C.utilization*100),N=n.find(J=>J.date===s),z=s===new Date().toISOString().slice(0,10),B={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},R={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},Y=C.items.map(J=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${B[J.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${J.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${R[J.productionType]??J.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${se(J.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),Q=`パ${C.partTimers}×${i.partCapacity} 社${C.employees}×${i.empCapacity} = ${se(C.capacity)}本`,X=C.totalQty>0?Math.ceil(C.totalQty/i.partCapacity):0,W=[];if(C.totalQty>0)for(let J=0;J<=X;J++){const U=C.totalQty-J*i.partCapacity;if(U<=0){W.push({p:J,e:0});break}const K=Math.ceil(U/i.empCapacity);W.push({p:J,e:K})}const H=C.totalQty-C.capacity,G=C.totalQty===0?"":H>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${se(H)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',Z=W.filter(J=>J.p+J.e>0).sort((J,U)=>J.p+J.e-(U.p+U.e)).slice(0,3),oe=C.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${se(C.totalQty)}本を収めるには ${G}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${Z.map((J,U)=>{const K=J.p===C.partTimers&&J.e===C.employees;return`<button data-action="cal-apply-pattern" data-date="${s}" data-part="${J.p}" data-emp="${J.e}"
              style="font-size:11px;padding:4px 10px;border:1px solid ${K?"#2f855a":"var(--border)"};
                border-radius:4px;background:${K?"rgba(47,133,90,0.08)":"var(--surface)"};
                cursor:pointer;white-space:nowrap;${K?"font-weight:600;":""}">
              パ${J.p}社${J.e}＝${J.p+J.e}人
              <span style="color:var(--text-secondary);margin-left:2px;">${se(J.p*i.partCapacity+J.e*i.empCapacity)}本</span>
            </button>`}).join("")}
        </div>
      </div>
    `:"";return`
      <section class="panel" style="margin-top:12px;border:2px solid ${z?"#2f855a":"#0F5B8D"};">
        <div style="padding:12px 16px 8px;${z?"background:rgba(47,133,90,0.06);":""}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            ${z?'<span style="background:#2f855a;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;">TODAY</span>':""}
            <h2 style="margin:0;font-size:16px;">${q}日（${M}）${z?"":"の生産内訳"}</h2>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${Q} ・ 稼働率${j}%</div>
          ${C.totalQty>0?`<div style="font-size:20px;font-weight:700;margin-top:6px;">${se(C.totalQty)}<span style="font-size:13px;font-weight:400;">本</span> <span style="font-size:13px;font-weight:400;">/ ${C.items.length}品</span></div>`:""}
        </div>
        ${oe}
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
        ${C.items.length>0?`
          <div style="padding:0 4px;">
            ${Y}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${se(C.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():s?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(s.split("-")[2])}日（${Kn(s)}）— 休日</p>
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
  `:"",k=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(C=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${C.color};"></span>${C.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${l}</select>
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
      <div><strong>${se(Math.round(f))}</strong>本 ÷ <strong>${_}</strong>稼働日 = 日当たり<strong>${se(S)}</strong>本</div>
      <div>→ パ<strong>${P}</strong> 社<strong>${L}</strong>人日 ・ キャパ<strong>${se(D)}</strong>本
        ${A<f?` <span style="color:#c53d3d;">（${se(Math.round(f-A))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
      </div>
      <div style="color:var(--text-secondary);font-size:10px;">日付タップで稼働ON/OFF → 人数自動計算</div>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${k}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((C,q)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${q===0?"#c53d3d":q===6?"#0F5B8D":"var(--text-secondary)"};">${C}</div>`).join("")}
        ${m.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">日付タップで稼働ON/OFF</p>
    </section>

    ${x}

    <section class="panel" style="margin-top:12px;" id="cal-label-section">
      <div class="panel-header" style="padding-bottom:4px;">
        <div>
          <h2 style="font-size:14px;">ラベル対象商品</h2>
          <p class="panel-caption">区分ごとにまとめて外す or 個別に外せます${r.size>0?`（<strong>${r.size}</strong>品除外中 = ${se(Math.round($))}本）`:""}</p>
        </div>
        <button class="button primary" type="button" data-action="cal-save-exclusions"
          style="padding:6px 14px;font-size:12px;">設定を保存</button>
      </div>
      <div id="cal-label-list" style="max-height:500px;overflow-y:auto;">
        ${(()=>{const C=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],q=new Map;for(const M of e){if((M.plannedQty>0?M.plannedQty:Math.max(0,M.demandForecast+M.safetyStockTarget-M.openingStock))<=0)continue;const N=M.productionType||"monthly";q.has(N)||q.set(N,[]),q.get(N).push(M)}return C.filter(M=>q.has(M.key)).map(M=>{const j=q.get(M.key),N=j.reduce((Q,X)=>Q+(X.plannedQty>0?X.plannedQty:Math.max(0,X.demandForecast+X.safetyStockTarget-X.openingStock)),0),z=j.filter(Q=>r.has(Q.productCode)).length,B=z===j.length,R=z===0,Y=j.map(Q=>{const X=Q.plannedQty>0?Q.plannedQty:Math.max(0,Q.demandForecast+Q.safetyStockTarget-Q.openingStock),W=r.has(Q.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${W?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${Q.productCode}"
                    ${W?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${W?"text-decoration:line-through;":""}">${Q.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${se(Math.round(X))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${M.key}"
                    ${B?"":"checked"} ${!R&&!B?'class="indeterminate"':""}
                    style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${M.color};flex-shrink:0;"></span>
                  <div style="flex:1;font-size:13px;font-weight:600;">${M.label}<span style="font-weight:400;color:var(--text-secondary);margin-left:6px;">${j.length}品 ${se(Math.round(N))}本</span></div>
                  ${z>0&&!B?`<span style="font-size:11px;color:#b7791f;">${z}品除外</span>`:""}
                  ${B?'<span style="font-size:11px;color:var(--text-secondary);">全除外</span>':""}
                </div>
                ${Y}
              </div>
            `}).join("")})()}
      </div>
    </section>
  `}function kp(e,t,n,s,r,i,c="all",p=null,u=[],h=null,f=new Set,g={partCapacity:dt,empCapacity:pt}){const A=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(D=>`<button class="tab-button ${s===D.key?"active":""}"
       data-demand-tab="${D.key}">${D.label}</button>`).join("");let _="";if(s==="demand")_=e?vp(e,i):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(s==="safety")_=bp(t,p);else if(s==="plan")_=xp(n,r,c,p);else if(s==="calendar")try{_=Sp(n,r,u,h,f,g)}catch(D){console.error("[renderCalendarTab] error:",D),_=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(D)}
${D?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${A}
    </div>

    ${_}
  `}const Ve={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Re=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function le(e){return e.toLocaleString("ja-JP")}function he(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function pn(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function Pp(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function un(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function Ep(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(P=>P.month))].sort(),n=Re.filter(P=>e.some(L=>L.brewCategory===P)),s={};for(const P of e)s[P.month]||(s[P.month]={}),s[P.month][P.brewCategory]=P.shipmentMl;const r=820,i=300,c={top:20,right:20,bottom:50,left:70},p=r-c.left-c.right,u=i-c.top-c.bottom,h=t.map(P=>n.reduce((L,S)=>L+(s[P]?.[S]??0),0)),f=Math.max(...h,1),g=p/t.length,$=Math.max(g-8,14),A=[0,.25,.5,.75,1].map(P=>{const L=c.top+u-u*P,S=f*P/1e3;return`
      <line x1="${c.left}" y1="${L}" x2="${r-c.right}" y2="${L}" class="chart-grid" />
      <text x="6" y="${L+4}" class="chart-axis">${Math.round(S).toLocaleString("ja-JP")}L</text>
    `}).join(""),_=t.map((P,L)=>{let S=c.top+u;const o=c.left+L*g+(g-$)/2,l=n.map(x=>{const k=s[P]?.[x]??0,C=k/f*u;return S-=C,C>0?`<rect x="${o}" y="${S}" width="${$}" height="${C}" fill="${Ve[x]??"#9ca3af"}" opacity="0.85" rx="1"><title>${x}: ${he(k)}L</title></rect>`:""}).join(""),[d,m]=P.split("-"),y=parseInt(m),w=y===10||L%2===0,v=y===10?`${d}年度`:`${y}月`;return`<g>${l}${w?`<text x="${o+$/2}" y="${i-12}" class="chart-axis centered-axis" style="font-size:10px;">${v}</text>`:""}</g>`}).join(""),D=n.map(P=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${Ve[P]??"#9ca3af"};"></span>
       ${P}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${i}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${A}${_}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${c.left}px;display:flex;flex-wrap:wrap;">${D}</div>
  `}function Ap(e,t,n,s){const r=new Map;for(const p of e){const u=p.brewCategory;r.has(u)||r.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const h=r.get(u);h.rows.push(p),h.totalMl+=p.totalShipmentMl,h.avgMl+=p.monthlyAvgMl,h.stockL=p.currentStockL}const i=new Map;for(const p of t)i.has(p.brewCategory)||i.set(p.brewCategory,[]),i.get(p.brewCategory).push(p);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${Re.filter(p=>r.has(p)).map(p=>{const u=r.get(p),h=Ve[p]??"#9ca3af",f=un(p);i.get(p);const g=n[p]??{rawAlcoholPct:18,targetAlcoholPct:15},$=g.targetAlcoholPct>0?g.rawAlcoholPct/g.targetAlcoholPct:1;u.stockL*1e3;const A=u.totalMl,_=u.avgMl,D=A/1e3,P=Math.round(u.stockL*$*10)/10,L=P*1e3,S=_>0?Math.round(L/_*10)/10:0,o=P-D,l=_>0?Math.round(_*2/1e3*10)/10:0,d=P<l,m=pn(S),y=Pp(S),w=Math.min(S/12*100,100),v=o>=0?"#22c55e":"#ef4444",x=o>=0?`+${le(Math.round(o))}L 余裕`:`${le(Math.round(o))}L 不足`,k=$>1.001;return`
        <div class="card" style="border-top:3px solid ${h};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${h};">${p}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${m}20;color:${m};font-weight:600;">${y}</span>
              <button class="btn-edit-stock" data-cat-id="${f}" data-cat="${p}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${f}">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;font-size:11px;margin-bottom:4px;">
              <div><span style="color:#6b7280;">原酒在庫</span><br><strong style="font-size:15px;">${le(u.stockL)}L</strong></div>
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${le(Math.round(D))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${he(_)}L</strong></div>
            </div>
            ${k?`
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${le(P)}L</div>
                <div style="color:#6b7280;">${g.rawAlcoholPct}% → ${g.targetAlcoholPct}%（×${$.toFixed(2)}）・残<strong>${S.toFixed(1)}</strong>ヶ月</div>
              </div>
            `:""}
            ${(()=>{const C=s.filter(q=>q.parentCategory===p);return C.length===0?"":C.map(q=>{const j=t.filter(N=>N.brewCategory===q.name).reduce((N,z)=>N+z.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${q.name}</span>
                  ${j>0?`<span style="margin-left:4px;">${le(j)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${f}" style="display:none;margin-bottom:8px;">
            ${(()=>{const C=s.filter(N=>N.parentCategory===p),q=[{name:p,label:p},...C.map(N=>({name:N.name,label:N.name}))],M=q.flatMap(N=>t.filter(B=>B.brewCategory===N.name).map(B=>({...B,catLabel:N.label}))),j=q.map(N=>`<option value="${N.name}">${N.label}</option>`).join("");return`
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${M.map(N=>`
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                      <span style="font-size:11px;flex:1;min-width:60px;">${N.label||"タンク"}</span>
                      <strong style="font-size:13px;">${le(N.volumeL)}L</strong>
                      ${q.length>1?`
                        <select data-action="brew-reassign-entry" data-id="${N.id}"
                          style="font-size:10px;padding:1px 4px;border:1px solid var(--border);border-radius:3px;max-width:100px;">
                          ${q.map(z=>`<option value="${z.name}" ${z.name===N.brewCategory?"selected":""}>${z.label}</option>`).join("")}
                        </select>
                      `:`<span style="font-size:10px;color:var(--text-secondary);">${N.catLabel}</span>`}
                      <button data-action="brew-delete-entry" data-id="${N.id}" data-cat="${N.brewCategory}"
                        style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                    </div>
                  `).join("")||'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">タンクなし</div>'}
                </div>
                <div style="display:flex;gap:4px;align-items:center;margin-top:6px;flex-wrap:wrap;">
                  ${q.length>1?`<select id="new-entry-target-${f}" style="height:28px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">${j}</select>`:""}
                  <input id="new-entry-label-${f}" type="text" placeholder="タンク名"
                    style="width:80px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <input id="new-entry-vol-${f}" type="number" min="0" step="1" placeholder="L"
                    style="width:60px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <button data-action="brew-add-entry" data-cat="${p}" data-cat-id="${f}"
                    style="font-size:11px;padding:4px 10px;border:none;border-radius:4px;background:#0F5B8D;color:#fff;cursor:pointer;white-space:nowrap;">追加</button>
                </div>
              `})()}
            <div style="border-top:1px solid var(--border);padding-top:8px;margin-top:8px;">
              <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">アルコール度数（加水計算用）</div>
              <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  原酒
                  <input id="alc-raw-${f}" type="number" min="1" max="30" step="0.1" value="${g.rawAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <span style="color:#6b7280;">→</span>
                <label style="font-size:11px;display:flex;align-items:center;gap:3px;">
                  出荷
                  <input id="alc-target-${f}" type="number" min="1" max="30" step="0.1" value="${g.targetAlcoholPct}"
                    style="width:52px;height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />%
                </label>
                <button data-action="brew-alc-save" data-cat="${p}"
                  style="font-size:10px;padding:3px 8px;border:none;border-radius:4px;background:#2563eb;color:#fff;cursor:pointer;">保存</button>
              </div>
            </div>
            <div style="margin-top:6px;">
              <button class="btn-cancel-stock" data-cat-id="${f}"
                style="font-size:11px;padding:4px 12px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">閉じる</button>
            </div>
          </div>

          <div style="display:flex;gap:8px;margin-bottom:6px;font-size:11px;flex-wrap:wrap;">
            <span style="color:${v};font-weight:600;">年間比 ${x}</span>
            <span style="color:${d?"#ef4444":"#6b7280"};">安全在庫${le(l)}L${d?" ⚠下回り":" ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${k?"（加水後）":""}</span>
            <span style="font-weight:600;color:${m};">${S.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${m};height:100%;width:${w}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function Lp(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const r of e)t.has(r.brewCategory)||t.set(r.brewCategory,[]),t.get(r.brewCategory).push(r);const n=`
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
  `,s=[];for(const r of Re){const i=t.get(r);if(!i)continue;const c=Ve[r]??"#9ca3af",p=i.length>1,u=i.reduce((P,L)=>P+L.totalShipmentQty,0),h=i.reduce((P,L)=>P+L.totalShipmentMl,0),f=i.reduce((P,L)=>P+L.monthlyAvgQty,0),g=i.reduce((P,L)=>P+L.monthlyAvgMl,0),$=i.reduce((P,L)=>P+L.productCount,0),A=i[0].currentStockL,_=g>0?Math.round(A*1e3/g*10)/10:0,D=pn(_);if(s.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${p?"pointer":"default"};" ${p?`data-toggle-cat="${r}"`:""}>
        <td style="color:${c};">
          ${p?`<span class="toggle-icon" data-cat="${r}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${r}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${$}</td>
        <td style="text-align:right;">${le(u)}</td>
        <td style="text-align:right;">${he(h)}</td>
        <td style="text-align:right;">${le(f)}</td>
        <td style="text-align:right;">${he(g)}</td>
        <td style="text-align:right;">${le(A)}</td>
        <td style="text-align:right;color:${D};font-weight:700;">${_.toFixed(1)}</td>
      </tr>
    `),p)for(const P of i)s.push(`
          <tr class="sub-row-${un(r)}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${P.subCategory}</td>
            <td style="text-align:right;">${P.productCount}</td>
            <td style="text-align:right;">${le(P.totalShipmentQty)}</td>
            <td style="text-align:right;">${he(P.totalShipmentMl)}</td>
            <td style="text-align:right;">${le(P.monthlyAvgQty)}</td>
            <td style="text-align:right;">${he(P.monthlyAvgMl)}</td>
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
  `}function Cp(e,t,n,s,r,i={}){const c={html:"",needByCategory:{}};if(e.length===0)return c;const p={},u=new Date,h=u.getMonth()+1,f=h>=10?u.getFullYear():u.getFullYear()-1,g=f+1,$=new Map;for(const x of e)$.has(x.brewCategory)||$.set(x.brewCategory,new Map),$.get(x.brewCategory).set(x.fy,{shipL:x.shipmentL,annualL:x.annualizedL});const A=new Map;for(const x of r)A.has(x.brewCategory)||A.set(x.brewCategory,new Map),A.get(x.brewCategory).set(x.monthNum,x.avgMonthlyL);const _=[...new Set(e.map(x=>x.fy))].sort(),D=[...$.keys()].sort((x,k)=>{const C=[...Re,...s.map(q=>q.name)];return(C.indexOf(x)===-1?99:C.indexOf(x))-(C.indexOf(k)===-1?99:C.indexOf(k))}),P=[];for(let x=h;x<=9;x++)P.push(x);if(h>=10)for(let x=1;x<=9;x++)P.push(x);const L=_.filter(x=>x<f),S=_.includes(f),o=D.map(x=>{const k=$.get(x);_.filter(pe=>k.has(pe));const C=Ve[x]??"#6366f1",q=A.get(x)??new Map,M=L.filter(pe=>k.has(pe)).map(pe=>k.get(pe).shipL);let j=0;if(M.length>=2){let pe=0,xe=0;for(let Oe=1;Oe<M.length;Oe++)if(M[Oe-1]>0){const pa=(M[Oe]-M[Oe-1])/M[Oe-1],Dt=Oe;pe+=pa*Dt,xe+=Dt}j=xe>0?pe/xe:0}const N=k.get(f)?.annualL??0,z=M.length>0?M[M.length-1]:0,B=N>0&&z>0?Math.round(z*.4+N*.6):z||N,R=P.reduce((pe,xe)=>pe+(q.get(xe)??0),0),Y=t.filter(pe=>pe.brewCategory===x).reduce((pe,xe)=>pe+xe.volumeL,0),Q=n[x],X=Q&&Q.targetAlcoholPct>0?Q.rawAlcoholPct/Q.targetAlcoholPct:1,W=Math.round(Y*X),H=Math.max(0,W-Math.round(R)),G=x in i,Z=G?i[x]:j,oe=Math.round(Z*100),J=Math.round(B*(1+Z)),U=Math.max(0,J-H);p[x]=U;const K=oe>0?"#22c55e":oe<0?"#ef4444":"#6b7280",ae=Math.round(j*100),ge=k.get(f)?.annualL??0;return`
      <tr>
        <td style="color:${C};font-weight:600;white-space:nowrap;">${x}</td>
        ${L.map(pe=>`<td style="text-align:right;">${k.has(pe)?le(Math.round(k.get(pe).shipL)):"—"}</td>`).join("")}
        ${S?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${le(Math.round(ge))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${oe}"
            data-action="brew-growth-edit" data-cat="${x}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${G?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${K};font-weight:600;${G?"background:rgba(37,99,235,0.06);":""}"
            title="${G?`手動設定（自動: ${M.length>=2?ae+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${le(W)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${le(Math.round(R))}</td>
        <td style="text-align:right;font-weight:600;">${le(H)}</td>
        <td style="text-align:right;">${le(J)}</td>
        <td style="text-align:right;color:${U>0?"#ef4444":"#22c55e"};font-weight:700;">${U>0?le(U):"余裕"}</td>
      </tr>
    `}).join("");let l=0,d=0,m=0,y=0,w=0;for(const x of D){const k=$.get(x),C=A.get(x)??new Map,q=L.filter(Z=>k.has(Z)).map(Z=>k.get(Z).shipL);let M=0;if(q.length>=2){let Z=0,oe=0;for(let J=1;J<q.length;J++)if(q[J-1]>0){const U=(q[J]-q[J-1])/q[J-1];Z+=U*J,oe+=J}M=oe>0?Z/oe:0}const j=k.get(f)?.annualL??0,N=q.length>0?q[q.length-1]:0,z=j>0&&N>0?Math.round(N*.4+j*.6):N||j,B=t.filter(Z=>Z.brewCategory===x).reduce((Z,oe)=>Z+oe.volumeL,0),R=n[x],Y=R&&R.targetAlcoholPct>0?R.rawAlcoholPct/R.targetAlcoholPct:1,Q=Math.round(B*Y),X=P.reduce((Z,oe)=>Z+(C.get(oe)??0),0),W=Math.max(0,Q-Math.round(X)),H=x in i?i[x]:M,G=Math.round(z*(1+H));l+=Q,d+=Math.round(X),m+=W,y+=G,w+=Math.max(0,G-W)}const v=h<=9?`${h}月〜9月`:`${h}月〜翌9月`;return{needByCategory:p,html:`
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
              ${L.map(x=>`<th style="text-align:right;">${x}(L)</th>`).join("")}
              ${S?`<th style="text-align:right;">${f}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${v}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${g}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${L.map(()=>"<td></td>").join("")}
              ${S?"<td></td>":""}
              <td></td>
              <td style="text-align:right;">${le(l)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${le(d)}</td>
              <td style="text-align:right;">${le(m)}</td>
              <td style="text-align:right;">${le(y)}</td>
              <td style="text-align:right;color:#ef4444;">${le(w)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}}function Dp(e,t,n,s,r){if(e.length===0)return"";const i=new Date,c=i.getMonth()+1,p=i.getFullYear(),u=[];let h=c,f=p;for(let L=0;L<4;L++){const S=[];for(let d=0;d<3;d++)S.push({y:f,m:h}),h++,h>12&&(h=1,f++);const o=`${S[0].y}/${S[0].m}`,l=`${S[2].y}/${S[2].m}`;u.push({label:`${o}-${l}`,months:S})}const g=new Map;for(const L of n)g.has(L.brewCategory)||g.set(L.brewCategory,new Map),g.get(L.brewCategory).set(L.monthNum,L.avgMonthlyL);const $=new Map;for(const L of e)$.has(L.brewCategory)||$.set(L.brewCategory,L.currentStockL);for(const L of r){const S=t.filter(o=>o.brewCategory===L.name).reduce((o,l)=>o+l.volumeL,0);S>0&&$.set(L.name,S)}const A=new Map;for(const L of r)A.has(L.parentCategory)||A.set(L.parentCategory,[]),A.get(L.parentCategory).push(L);const _=[];for(const L of Re){($.has(L)||(g.get(L)?.size??0)>0)&&_.push({cat:L,isChild:!1});for(const S of A.get(L)??[])($.has(S.name)||(g.get(S.name)?.size??0)>0)&&_.push({cat:S.name,isChild:!0})}function D(L,S){const o=s[L],l=o&&o.targetAlcoholPct>0?o.rawAlcoholPct/o.targetAlcoholPct:1;let d=($.get(L)??0)*l;const m=g.get(L)??new Map,y=Ve[L]??(S?"#6366f1":"#9ca3af");let w="";const v=[];for(const x of u){const k=x.months.reduce((j,{m:N})=>j+(m.get(N)??0),0),C=d;d=Math.max(0,d-k),C>0&&d<=0&&!w&&(w=x.label);const M=d<=0?"#ef4444":d<k?"#eab308":"#22c55e";v.push(`<td style="text-align:right;padding:4px 6px;color:${M};font-weight:${d<=0?"700":"400"};">${d>0?le(Math.round(d)):"枯渇"}</td>`)}return`
      <tr style="${S?"background:rgba(99,102,241,0.02);":""}">
        <td style="color:${y};font-weight:${S?"500":"600"};padding:4px 6px;white-space:nowrap;${S?"padding-left:20px;font-size:11px;":""}">${S?"┗ ":""}${L}</td>
        <td style="text-align:right;padding:4px 6px;">${le(Math.round(($.get(L)??0)*l))}</td>
        ${v.join("")}
        <td style="padding:4px 6px;font-size:11px;color:${w?"#ef4444":"#22c55e"};font-weight:600;">
          ${w?`⚠ ${w}`:"12ヶ月+"}
        </td>
      </tr>
    `}const P=_.map(({cat:L,isChild:S})=>D(L,S)).join("");return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 8px 0;">四半期別 在庫枯渇予測</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 10px;">現在庫（加水後）から季節出荷を差し引いた残量推移</p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th style="padding:4px 6px;">区分</th>
              <th style="text-align:right;padding:4px 6px;">現在庫(L)</th>
              ${u.map(L=>`<th style="text-align:right;padding:4px 6px;font-size:10px;">${L.label}</th>`).join("")}
              <th style="padding:4px 6px;">枯渇時期</th>
            </tr>
          </thead>
          <tbody>${P}</tbody>
        </table>
      </div>
    </div>
  `}function qp(e,t,n){const s=new Map;for(const c of e){s.has(c.brewCategory)||s.set(c.brewCategory,{avgMl:0,totalMl:0,stockL:c.currentStockL});const p=s.get(c.brewCategory);p.avgMl+=c.monthlyAvgMl,p.totalMl+=c.totalShipmentMl}for(const c of n){const p=t.filter(u=>u.brewCategory===c.name).reduce((u,h)=>u+h.volumeL,0);(p>0||s.has(c.name))&&(s.has(c.name)?s.get(c.name).stockL=p:(s.get(c.parentCategory),s.set(c.name,{avgMl:0,totalMl:0,stockL:p})))}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${[...Re,...n.map(c=>c.name)].filter(c=>s.has(c)&&(s.get(c).stockL>0||s.get(c).totalMl>0)).map(c=>{const p=s.get(c),u=p.avgMl>0?Math.round(p.stockL*1e3/p.avgMl*10)/10:0,h=p.totalMl/1e3,f=h>0?Math.round(p.stockL/h*100):0,g=n.some(P=>P.name===c),$=Ve[c]??(g?"#6366f1":"#9ca3af"),A=p.avgMl>0?pn(u):p.stockL>0?"#22c55e":"#9ca3af",_=p.avgMl>0?Math.min(u/12*100,100):p.stockL>0?100:0,D=p.avgMl>0?`${u.toFixed(1)}ヶ月 / 年間の${f}%`:`${le(p.stockL)}L在庫`;return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:100px;font-size:12px;font-weight:500;color:${$};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c}">${g?"┗ ":""}${c}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${A};height:100%;width:${_}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">${D}</span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${p.stockL>0?"var(--text)":"#ef4444"};">${le(p.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function Tp(e,t,n,s,r){if(e.length===0)return"";const i=n.map(g=>g.name);[...Re,...i];const c=new Map;for(const g of n)c.has(g.parentCategory)||c.set(g.parentCategory,[]),c.get(g.parentCategory).push(g);const p=new Map;for(const g of e)p.has(g.brewCategory)||p.set(g.brewCategory,[]),p.get(g.brewCategory).push(g);for(const g of i)p.has(g)||p.set(g,[]);const u=new Set;for(const g of n)for(const $ of p.get(g.name)??[])u.add($.productCode);const h=new Map;for(const g of Re)h.set(g,p.get(g)??[]);const f=Re.filter(g=>p.has(g)).map(g=>{const $=p.get(g)??[],A=Ve[g]??"#9ca3af",_=c.get(g)??[],D=_.length>0,P=$.reduce((v,x)=>v+x.annualMl,0),L=$.reduce((v,x)=>v+x.monthlyAvgMl,0),S=$.filter(v=>!u.has(v.productCode)),o=S.filter(v=>!t.has(v.productCode)),l=o.reduce((v,x)=>v+x.annualMl,0),d=o.reduce((v,x)=>v+x.monthlyAvgMl,0),m=S.filter(v=>t.has(v.productCode)),y=S.map(v=>{const x=t.has(v.productCode);return`
          <tr style="${x?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${D?`<input type="checkbox" ${x?"":"checked"} data-action="brew-move-to-child" data-code="${v.productCode}" data-parent="${g}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${x?"color:#b7791f;":""}" title="${v.productName}">
              ${v.productName}${x?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${v.subCategory}</td>
            <td style="text-align:right;">${he(v.annualMl)}</td>
            <td style="text-align:right;">${he(v.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),w=_.map(v=>{const x=p.get(v.name)??[],k=x.reduce((B,R)=>B+R.annualMl,0),C=x.reduce((B,R)=>B+R.monthlyAvgMl,0),q=r.filter(B=>B.brewCategory===v.name),M=q.reduce((B,R)=>B+R.volumeL,0),j=un(v.name),N=x.map(B=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${B.productCode}" data-cat="${v.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${B.productName}"><strong>${B.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${B.subCategory}</td>
            <td style="text-align:right;">${he(B.annualMl)}</td>
            <td style="text-align:right;">${he(B.monthlyAvgMl)}</td>
          </tr>
        `).join(""),z=m.filter(B=>!x.some(R=>R.productCode===B.productCode)).map(B=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${B.productCode}" data-cat="${v.name}"
                  style="cursor:pointer;" />
              </td>
              <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${B.productName}">${B.productName}</td>
              <td style="font-size:11px;color:var(--text-secondary);">${B.subCategory}</td>
              <td style="text-align:right;color:var(--text-secondary);">${he(B.annualMl)}</td>
              <td style="text-align:right;color:var(--text-secondary);">${he(B.monthlyAvgMl)}</td>
            </tr>
          `).join("");return`
          <tr><td colspan="5" style="padding:0;">
            <div style="border-left:3px solid #6366f1;margin:8px 0 8px 16px;padding:6px 0 6px 12px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <strong style="font-size:12px;color:#6366f1;">${v.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${x.length}品 ・ ${he(k)}L/年${M>0?` ・ 在庫${le(M)}L`:""}</span>
                <button class="btn-edit-stock" data-cat-id="${j}" data-cat="${v.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${v.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${j}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${q.map(B=>`
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${B.label||"タンク"}</span>
                    <strong style="font-size:11px;">${le(B.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${B.id}" data-cat="${v.name}"
                      style="font-size:9px;padding:1px 4px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">×</button>
                  </div>
                `).join("")}
                <div style="display:flex;gap:3px;align-items:center;margin-top:3px;">
                  <input id="new-entry-label-${j}" type="text" placeholder="名前" style="width:70px;height:22px;font-size:10px;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <input id="new-entry-vol-${j}" type="number" min="0" placeholder="L" style="width:50px;height:22px;font-size:10px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <button data-action="brew-add-entry" data-cat="${v.name}" data-cat-id="${j}"
                    style="font-size:9px;padding:2px 6px;border:none;border-radius:3px;background:#0F5B8D;color:#fff;cursor:pointer;">追加</button>
                </div>
                <button class="btn-cancel-stock" data-cat-id="${j}" style="font-size:9px;padding:2px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;margin-top:3px;">閉じる</button>
              </div>
              ${N.length>0||z.length>0?`
                <table class="data-table" style="font-size:11px;margin:0;">
                  <tbody>
                    ${N}
                    ${z}
                  </tbody>
                  ${x.length>0?`<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${he(k)}</td><td style="text-align:right;">${he(C)}</td>
                  </tr></tfoot>`:""}
                </table>
              `:'<div style="font-size:10px;color:var(--text-secondary);padding:4px;">親からチェックを外すとここに候補表示されます</div>'}
            </div>
          </td></tr>
        `}).join("");return`
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${A};"></span>
            <h4 style="margin:0;font-size:14px;">${g}</h4>
            <span style="font-size:12px;color:var(--text-secondary);">
              全${$.length}銘柄 ・ 年間${he(P)}L
              ${D?`（内 ${_.map(v=>`${v.name}:${(p.get(v.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${D?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${y}
                ${w}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${he(P)}</td><td style="text-align:right;">${he(L)}</td></tr>
                ${D?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${he(l)}</td><td style="text-align:right;">${he(d)}</td></tr>`:""}
                ${m.length>0?`<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${m.length}品</td>
                  <td style="text-align:right;">${he(m.reduce((v,x)=>v+x.annualMl,0))}</td>
                  <td style="text-align:right;">${he(m.reduce((v,x)=>v+x.monthlyAvgMl,0))}</td></tr>`:""}
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
            ${Re.filter(g=>g!=="その他").map(g=>`<option value="${g}">${g}</option>`).join("")}
          </select>
          <input id="brew-new-category-name" type="text" placeholder="新しい区分名"
            style="font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;width:120px;" />
          <button data-action="brew-add-category" class="button primary"
            style="font-size:12px;padding:4px 12px;">追加</button>
        </div>
      </div>
      ${f}
    </div>
  `}function Ip(e,t,n,s=[],r=new Set,i=[],c={},p=[],u={},h=[],f=[],g={},$={}){const A=new Date,_=A.getMonth()>=9?A.getFullYear():A.getFullYear()-1,D=Array.from({length:5},(L,S)=>{const o=_-S;return`<option value="${o}" ${o===n?"selected":""}>${o}年度 (${o}/10-${o+1}/9)</option>`}).join(""),P=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return P||`
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div>
          <h2 style="margin:0;font-size:18px;">醸造計画</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;">特定名称酒区分別の出荷実績と在庫状況</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <label for="brewing-fy-select" style="font-size:13px;font-weight:500;">会計年度:</label>
          <select id="brewing-fy-select" class="input" style="width:auto;min-width:200px;">
            ${D}
          </select>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:14px;margin:0 0 8px 0;">月次移出推移（区分別）</h3>
        ${Ep(t)}
      </div>

      ${Ap(e,p,u,i)}

      ${Cp(h,p,u,i,f,g).html}

      ${qp(e,p,i)}

      ${Dp(e,p,f,u,i)}

      ${Tp(s,r,i,c,p)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${Lp(e)}
      </div>
    </section>
  `}const $a={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Np=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"],bt=[10,11,12,1,2,3,4,5,6,7,8,9],Qn=["10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月","9月"],Ke=[9,10,11,12,1,2,3,4,5],Mp=["9月","10月","11月","12月","1月","2月","3月","4月","5月"];function re(e){return e.toLocaleString("ja-JP")}function Rp(e,t,n,s=[],r=2026,i=[],c=[],p={}){const h=[...new Set([...Object.keys(e).filter(v=>e[v]>0),...s.filter(v=>v.plannedVolumeL>0).map(v=>v.brewCategory)])];if(h.length===0)return'<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>';const f=[...Np,...n.map(v=>v.name)];h.sort((v,x)=>(f.indexOf(v)===-1?99:f.indexOf(v))-(f.indexOf(x)===-1?99:f.indexOf(x)));const g={polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0},$=new Map;for(const v of s)$.has(v.brewCategory)||$.set(v.brewCategory,[]),$.get(v.brewCategory).push(v);const A=(v,x,k,C,q)=>`<input type="number" step="${q}" value="${k}" data-action="brew-rice-edit" data-cat="${x}" data-field="${v}"
        style="width:${C};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`,_=(v,x,k)=>`<select data-action="brew-rice-variety-select" data-cat="${x}" data-field="${v}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${i.map(C=>`<option value="${C.name}" ${C.name===k?"selected":""}>${C.name}${C.region?` (${C.region})`:""}</option>`).join("")}
      ${!i.some(C=>C.name===k)&&k?`<option value="${k}" selected>${k}</option>`:""}
    </select>`;let D=0,P=0,L=0,S=0;const o=bt.map(()=>0),l=new Map,d=h.map(v=>{const x=e[v]??0,k=t[v]??g,C=$a[v]??"#6366f1",q=$.get(v)??[],M=v in p,j=q.reduce((K,ae)=>K+ae.plannedVolumeL,0),N=q.length>0,z=M?p[v]:N?j:x,B=k.alcoholAdditionRatio??0,R=z*(1-B),Y=Math.round(R*k.ricePerLiterKg),Q=Math.round(Y*k.kojiRatio),X=Y-Q,W=Math.round(Q/k.polishingRatio),H=Math.round(X/k.polishingRatio),G=W+H,Z=Math.round(W*k.kojiPricePerKg),oe=Math.round(H*k.kakePricePerKg);D+=W,P+=H,L+=Z,S+=oe;for(const[K,ae,ge,pe]of[[k.kojiVariety,W,k.kojiPricePerKg,"麹米"],[k.kakeVariety,H,k.kakePricePerKg,"掛米"]]){if(ae<=0)continue;l.has(K)||l.set(K,{brownKg:0,pricePerKg:ge,cost:0,usage:[]});const xe=l.get(K);xe.brownKg+=ae,xe.cost+=Math.round(ae*ge),xe.pricePerKg=Math.round(xe.cost/xe.brownKg),xe.usage.push({cat:v,type:pe,kg:ae})}const J=bt.map(()=>0);if(q.length>0)for(const K of q){const ae=bt.indexOf(K.brewMonth);ae>=0&&(J[ae]+=K.plannedVolumeL)}else{const K=z/12;for(let ae=0;ae<12;ae++)J[ae]=K}const U=J.reduce((K,ae)=>K+ae,0)||1;for(let K=0;K<12;K++){const ae=J[K]/U;o[K]+=Math.round(G*ae)}return`
      <div class="card" style="border-top:3px solid ${C};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${C};">${v}</h4>
          <div style="font-size:12px;">${z>0?`予算 <strong>¥${re(Z+oe)}</strong>`:'<span style="color:#6b7280;font-weight:600;">醸造しない</span>'}</div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(z)}"
              data-action="proc-edit-vol" data-cat="${v}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid ${M?"#2563eb":"var(--border)"};border-radius:4px;padding:0 4px;font-weight:600;${M?"background:rgba(37,99,235,0.04);":""}" />L
          </label>
          ${B>0?`<span style="color:var(--text-secondary);">−${Math.round(B*100)}%→${re(Math.round(R))}L</span>`:""}
          ${x>0&&Math.abs(x-z)>10?`<span style="color:var(--text-secondary);font-size:11px;">(予測${re(Math.round(x))})</span>`:""}
        </div>

        <div style="border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:8px;background:var(--surface-alt);">
          <div style="font-size:11px;font-weight:600;color:${C};margin-bottom:6px;">醸造スケジュール${q.length>0?` (${re(Math.round(q.reduce((K,ae)=>K+ae.plannedVolumeL,0)))}L / ${re(Math.round(z))}L)`:""}</div>
          ${q.length>0?`
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
              ${q.map(K=>`
                <div style="display:flex;align-items:center;gap:3px;padding:3px 8px;border-radius:4px;background:${C}15;border:1px solid ${C}30;">
                  <span style="font-size:11px;font-weight:600;color:${C};">${K.brewMonth}月</span>
                  <input type="number" min="0" max="${Math.round(z)}" step="100" value="${Math.round(K.plannedVolumeL)}"
                    data-action="proc-sched-edit-vol" data-cat="${v}" data-month="${K.brewMonth}"
                    style="width:56px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />L
                  <button data-action="proc-sched-remove" data-cat="${v}" data-month="${K.brewMonth}"
                    style="border:none;background:none;color:#ef4444;cursor:pointer;font-size:14px;padding:0 2px;line-height:1;">×</button>
                </div>
              `).join("")}
            </div>
          `:'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px;">醸造月を追加してください</div>'}
          <div style="display:flex;align-items:center;gap:4px;">
            <select data-action="proc-add-month-select" data-cat="${v}"
              style="height:24px;font-size:11px;border:1px solid var(--border);border-radius:3px;padding:0 4px;">
              ${[10,11,12,1,2,3,4,5,6,7,8,9].filter(K=>!q.some(ae=>ae.brewMonth===K)).map(K=>`<option value="${K}">${K}月</option>`).join("")}
            </select>
            <input type="number" min="0" max="${Math.round(z)}" step="100" placeholder="L"
              data-action="proc-add-month-vol" data-cat="${v}"
              style="width:56px;height:24px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />
            <button data-action="proc-add-schedule" data-cat="${v}"
              style="height:24px;font-size:11px;padding:0 8px;border:1px solid ${C};background:${C}10;color:${C};border-radius:3px;cursor:pointer;">+追加</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${A("ricePerLiterKg",v,k.ricePerLiterKg,"48px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${A("kojiRatio",v,k.kojiRatio,"44px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${A("polishingRatio",v,k.polishingRatio,"44px","0.01")}</label>
          ${B>0||v==="本醸造"||v==="普通酒"?`<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${A("alcoholAdditionRatio",v,k.alcoholAdditionRatio??0,"44px","0.01")}</label>`:""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${_("kojiVariety",v,k.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${A("kojiPricePerKg",v,k.kojiPricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${re(W)}kg</strong> <span style="color:var(--text-secondary);">(${(W/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${re(Z)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${_("kakeVariety",v,k.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${A("kakePricePerKg",v,k.kakePricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${re(H)}kg</strong> <span style="color:var(--text-secondary);">(${(H/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${re(oe)}</div>
          </div>
        </div>
      </div>
    `}).join(""),m=D+P,y=L+S,w=Math.max(...o,1);return bt.map((v,x)=>{const k=o[x];return`
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${k/w*100}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${k>0?2:0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${Qn[x]}</div>
        <div style="font-size:10px;font-weight:600;">${k>0?re(k):""}</div>
        <div style="font-size:9px;color:var(--text-secondary);">${k>0?(k/60).toFixed(0)+"俵":""}</div>
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
        <div style="display:grid;grid-template-columns:80px repeat(${Ke.length},1fr);font-size:11px;min-width:500px;">
          <div style="padding:4px;font-weight:600;">区分</div>
          ${Mp.map(v=>`<div style="text-align:center;padding:4px;font-weight:600;border-left:1px solid var(--border);">${v}</div>`).join("")}
        </div>
        ${(()=>{const v=[],x=Ke.length,k=new Map;for(const M of c)M.deliveryMonth&&(k.has(M.varietyName)||k.set(M.varietyName,[]),k.get(M.varietyName).push(M.deliveryMonth));for(const[M,j]of k){const N=Ke.map(z=>{const B=j.includes(z),R=c.filter(Y=>Y.varietyName===M&&Y.deliveryMonth===z).reduce((Y,Q)=>Y+Q.committedBales,0);return`<div style="text-align:center;padding:3px;border-left:1px solid var(--border);${B?"background:#dcfce7;":""}">
                ${B?`<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${R}俵</div>`:""}
              </div>`}).join("");v.push(`<div style="display:grid;grid-template-columns:80px repeat(${x},1fr);border-top:1px solid var(--border);">
              <div style="padding:4px;color:#16a34a;font-weight:500;font-size:10px;">📥 ${M}</div>${N}
            </div>`)}const C=34,q=2;for(const M of h){const j=$.get(M)??[],N=$a[M]??"#6366f1",z=M in p,B=j.reduce((J,U)=>J+U.plannedVolumeL,0),R=j.length>0,Y=z?p[M]:R?B:e[M]??0,Q=[],X=[...j].sort((J,U)=>Ke.indexOf(J.brewMonth)-Ke.indexOf(U.brewMonth)),W=[];for(const J of X){const U=Ke.indexOf(J.brewMonth);if(U<0)continue;const K=Math.min(J.durationMonths,x-U),ae=U+K;let ge=0;for(;ge<W.length&&W[ge]>U;)ge++;ge>=W.length?W.push(ae):W[ge]=ae,Q.push({s:J,startIdx:U,dur:K,lane:ge})}const G=Math.max(W.length,1)*(C+q)+q,Z=Ke.map(()=>`<div style="border-left:1px solid var(--border);height:${G}px;"></div>`).join(""),oe=Q.map(({s:J,startIdx:U,dur:K,lane:ae})=>{const ge=(U/x*100).toFixed(2),pe=(K/x*100).toFixed(2),xe=q+ae*(C+q);return`<div class="gantt-bar" data-cat="${M}" data-month="${J.brewMonth}" data-dur="${K}" data-vol="${Math.round(J.plannedVolumeL)}" data-max="${Math.round(Y)}"
                style="position:absolute;left:${ge}%;width:${pe}%;top:${xe}px;height:${C}px;
                  background:${N}30;border:2px solid ${N};border-radius:6px;cursor:grab;
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${N};overflow:hidden;box-sizing:border-box;">
                <div class="gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
                <span class="gantt-bar-label" style="pointer-events:none;white-space:nowrap;">${re(Math.round(J.plannedVolumeL))}L</span>
                <div class="gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
              </div>`}).join("");v.push(`<div style="display:grid;grid-template-columns:80px 1fr;border-top:1px solid var(--border);">
              <div style="padding:4px;color:${N};font-weight:500;font-size:10px;display:flex;align-items:center;">🍶 ${M}</div>
              <div style="position:relative;display:grid;grid-template-columns:repeat(${x},1fr);">
                ${Z}
                <div class="gantt-bar-container" data-cat="${M}" data-max="${Math.round(Y)}" data-cols="${x}" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                  ${oe}
                </div>
              </div>
            </div>`)}return v.join("")||'<div style="text-align:center;color:var(--text-secondary);padding:16px;">区分を追加するとタイムラインが表示されます</div>'})()}
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(()=>{const v=h.map(k=>{const C=t[k]??g,q=$.get(k)??[],M=k in p,j=q.reduce((Q,X)=>Q+X.plannedVolumeL,0),N=q.length>0,z=M?p[k]:N?j:e[k]??0,B=z*(1-(C.alcoholAdditionRatio??0)),R=Math.round(B*C.ricePerLiterKg),Y=Math.round(R/C.polishingRatio);return{cat:k,brewingL:z,brownKg:Y,color:$a[k]??"#6366f1"}}).filter(k=>k.brewingL>0||k.brownKg>0),x=Math.max(...v.map(k=>k.brownKg),1);return v.map(k=>{const C=Math.min(k.brownKg/x*100,100);return`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="width:90px;font-size:11px;font-weight:500;color:${k.color};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${k.cat}</span>
              <div style="flex:1;background:#e5e7eb;border-radius:3px;height:20px;overflow:hidden;position:relative;">
                <div style="background:${k.color};opacity:0.7;height:100%;width:${C}%;border-radius:3px;"></div>
                <span style="position:absolute;top:2px;left:6px;font-size:10px;font-weight:600;color:#374151;">${re(k.brownKg)}kg (${Math.ceil(k.brownKg/60)}俵)</span>
              </div>
              <span style="width:60px;font-size:10px;text-align:right;color:var(--text-secondary);">${re(Math.round(k.brewingL))}L</span>
            </div>
          `}).join("")})()}
    </section>

    ${d}

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
            ${[...l.entries()].sort((v,x)=>x[1].brownKg-v[1].brownKg).map(([v,x])=>{const k=(x.brownKg/60).toFixed(1),C=x.usage.map(q=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${q.type==="麹米"?"rgba(99,102,241,0.08)":"rgba(183,121,31,0.08)"};margin-right:3px;">${q.cat}/${q.type} ${re(q.kg)}kg</span>`).join("");return`
                <tr>
                  <td style="font-weight:600;">${v}</td>
                  <td style="text-align:right;font-weight:600;">${re(x.brownKg)}</td>
                  <td style="text-align:right;">${k}</td>
                  <td style="text-align:right;">¥${re(x.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${re(x.cost)}</td>
                  <td style="max-width:300px;overflow-x:auto;">${C}</td>
                </tr>
              `}).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              <td style="text-align:right;">${re(m)}</td>
              <td style="text-align:right;">${Math.ceil(m/60)}</td>
              <td></td>
              <td style="text-align:right;">¥${re(y)}</td>
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
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${re(D)}kg</strong> <span style="color:var(--text-secondary);">(${(D/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${re(L)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${re(P)}kg</strong> <span style="color:var(--text-secondary);">(${(P/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${re(S)}</div>
        </div>
        <div style="background:var(--surface-alt);border-radius:8px;padding:14px;border:2px solid var(--border);">
          <div style="font-size:11px;font-weight:600;">総合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${re(m)}kg</strong> <span style="color:var(--text-secondary);">(${Math.ceil(m/60)}俵)</span></div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">¥${re(y)}<span style="font-size:13px;font-weight:400;margin-left:4px;">(${(y/1e4).toFixed(0)}万)</span></div>
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
      ${(()=>{const v=new Map;for(const[N,z]of l)v.set(N,z.brownKg);const x=new Map;for(const N of c){x.has(N.varietyName)||x.set(N.varietyName,{bales:0,kg:0,cost:0,suppliers:[]});const z=x.get(N.varietyName);z.bales+=N.committedBales,z.kg+=N.committedBales*60,z.cost+=N.committedBales*60*N.pricePerKg,N.supplier&&!z.suppliers.includes(N.supplier)&&z.suppliers.push(N.supplier)}const k=[...new Set([...v.keys(),...x.keys()])];let C=0,q=0;const M=k.map(N=>{const z=v.get(N)??0,B=x.get(N),R=B?.kg??0,Y=R-z;C+=R,q+=z;const Q=Y>=0?"#22c55e":"#ef4444",X=Y>=0?`+${re(Math.round(Y))}kg余裕`:`${re(Math.round(Y))}kg不足`,W=R>0?Math.min(z/R*100,100):0;return`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${N}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${re(Math.round(R))}kg (${B?.bales??0}俵)</span>
                  <span>必要 ${re(Math.round(z))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${W}%;background:${R>0?Y>=0?"#22c55e":"#ef4444":"#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${Q};">${R>0?X:"未確保"}</span>
            </div>
          `}).join(""),j=C-q;return`
          <div style="margin-bottom:12px;">
            ${M||'<p style="color:var(--text-secondary);text-align:center;padding:12px;">作付け予定が未登録です</p>'}
          </div>
          ${C>0?`
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;padding:8px;background:var(--surface-alt);border-radius:6px;">
              <span>確保合計: <strong>${re(Math.round(C))}kg</strong> (${Math.ceil(C/60)}俵)</span>
              <span>必要合計: <strong>${re(Math.round(q))}kg</strong></span>
              <span style="color:${j>=0?"#22c55e":"#ef4444"};font-weight:600;">
                ${j>=0?`余裕 ${re(Math.round(j))}kg`:`不足 ${re(Math.round(-j))}kg`}
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
              ${bt.map((N,z)=>`<option value="${N}">${Qn[z]}</option>`).join("")}
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
        ${i.map(v=>`
          <div style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;margin:2px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
            <strong>${v.name}</strong>
            <span style="color:var(--text-secondary);">¥${re(v.defaultPricePerKg)}/kg</span>
            ${v.region?`<span style="color:var(--text-secondary);font-size:10px;">${v.region}</span>`:""}
            <button data-action="proc-delete-variety" data-id="${v.id}"
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
  `}const Op={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Bp={planned:"計画中",active:"進行中",completed:"完了"},ko={未着手:"#d1d5db",進行中:"#3b82f6",完了:"#22c55e"},Be=6;function mn(e){return e.toLocaleString("ja-JP")}function Ct(e){return Op[e]??"#6366f1"}function Ft(e,t){return Math.round((new Date(t).getTime()-new Date(e).getTime())/864e5)}function jp(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n.toISOString().slice(0,10)}function Le(e){return e?e.slice(5).replace("-","/"):"―"}function zp(e){return e.length<=3?e:e.slice(0,3)}function Fp(e,t,n){const s=e.filter(L=>L.status!=="completed"&&L.startDate&&L.targetEndDate);if(s.length===0)return"";const r=s.flatMap(L=>[L.startDate,L.targetEndDate]),i=s.flatMap(L=>t[L.id]??[]);for(const L of i)L.plannedStart&&r.push(L.plannedStart),L.plannedEnd&&r.push(L.plannedEnd);r.sort();const c=r[0],p=r[r.length-1],u=Math.min(Ft(c,p)+7,180),h=u*Be,f=[];let g="";for(let L=0;L<u;L++){const S=jp(c,L),o=S.slice(0,7);o!==g&&(f.push(`<span style="position:absolute;left:${L*Be}px;font-size:9px;color:#6b7280;white-space:nowrap;border-left:1px solid #d1d5db;padding-left:2px;">${parseInt(S.slice(5,7))}月</span>`),g=o)}const $=new Date().toISOString().slice(0,10),A=Ft(c,$),_=A>=0&&A<u?`<div style="position:absolute;left:${A*Be}px;top:0;width:2px;height:100%;background:#ef4444;z-index:5;opacity:0.7;pointer-events:none;"></div>`:"",D=30,P=s.map(L=>{const S=(t[L.id]??[]).sort((m,y)=>m.stepOrder-y.stepOrder),o=Ct(L.brewCategory),l=n===L.id,d=S.map(m=>{const y=Math.max(Ft(c,m.plannedStart),0),w=Math.min(Ft(c,m.plannedEnd),u-1),v=y*Be,x=Math.max((w-y+1)*Be,Be),k=ko[m.status],C=m.status==="未着手"?"#555":"#fff";return`<div class="bp-gantt-bar" data-step-id="${m.id}" data-batch-id="${m.batchId}" data-step-order="${m.stepOrder}" data-planned-start="${m.plannedStart}" data-planned-end="${m.plannedEnd}" style="position:absolute;left:${v}px;top:4px;width:${x}px;height:22px;background:${k};border-radius:3px;font-size:7px;line-height:22px;color:${C};overflow:hidden;white-space:nowrap;cursor:grab;border:1px solid ${m.status==="未着手"?"#bbb":k};" title="${m.stepName} ${Le(m.plannedStart)}〜${Le(m.plannedEnd)}"><div class="bp-gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div><span style="padding:0 16px;pointer-events:none;">${x>24?zp(m.stepName):""}</span><div class="bp-gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div></div>`}).join("");return`<div style="display:flex;align-items:center;border-bottom:1px solid ${l?"#3b82f6":"#f3f4f6"};min-height:${D}px;background:${l?"#eff6ff":"transparent"};" data-action="bp-toggle-detail" data-batch-id="${L.id}">
      <div style="width:120px;flex-shrink:0;padding:2px 6px;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;">
        <span style="color:${o};font-weight:600;">${L.batchCode}</span>
        <span style="color:#9ca3af;display:block;font-size:8px;">${L.brewCategory}</span>
      </div>
      <div style="position:relative;width:${h}px;height:${D}px;background:repeating-linear-gradient(90deg,transparent 0 ${Be*7-1}px,#f3f4f6 ${Be*7-1}px ${Be*7}px);">${d}</div>
    </div>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>醸造ガントチャート</h2><p class="panel-caption">仕込をクリックで詳細表示 ／ バーをドラッグで日程調整</p></div>
    <div id="bp-gantt" style="overflow-x:auto;touch-action:none;user-select:none;">
      <div style="min-width:${h+120}px;">
        <div style="display:flex;align-items:flex-end;">
          <div style="width:120px;flex-shrink:0;"></div>
          <div style="position:relative;width:${h}px;height:20px;">${f.join("")}</div>
        </div>
        <div style="position:relative;">${P}${_}</div>
      </div>
    </div>
  </section>`}function Vp(e,t){const n=[...t].sort((D,P)=>D.stepOrder-P.stepOrder);if(n.length===0)return"";const s=120,r=50,i=40,c=20,p=5,u=Math.ceil(n.length/p),h=p*(s+i)-i+20,f=u*(r+c)-c+20,g=D=>{const P=Math.floor(D/p);return{x:10+(P%2===0?D%p:p-1-D%p)*(s+i),y:10+P*(r+c)}},$=n.map((D,P)=>{const L=g(P),S=ko[D.status],o=D.status==="進行中"?"#1d4ed8":D.status==="完了"?"#15803d":"#9ca3af",l=D.status==="未着手"?"#374151":"#fff";return`<g>
      <rect x="${L.x}" y="${L.y}" width="${s}" height="${r}" rx="6" fill="${S}" stroke="${o}" stroke-width="2"/>
      <text x="${L.x+s/2}" y="${L.y+20}" text-anchor="middle" fill="${l}" font-size="11" font-weight="600">${D.stepName}</text>
      <text x="${L.x+s/2}" y="${L.y+36}" text-anchor="middle" fill="${l}" font-size="9" opacity="0.8">${Le(D.plannedStart)}〜${Le(D.plannedEnd)}</text>
    </g>`}).join(""),A=n.slice(1).map((D,P)=>{const L=g(P),S=g(P+1),o=L.x+s/2,l=L.y+r/2,d=S.x+s/2,m=S.y+r/2;if(Math.floor(P/p)===Math.floor((P+1)/p)){const w=d>o?1:-1,v=L.x+(w>0?s:0),x=l,k=S.x+(w>0?0:s);return`<line x1="${v}" y1="${x}" x2="${k}" y2="${m}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}else{const w=L.y+r,v=S.y;return`<line x1="${o}" y1="${w}" x2="${d}" y2="${v}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}}).join("");return`<div id="bp-network" style="margin-bottom:16px;">
    <section class="panel">
      <div class="panel-header">
        <h2 style="display:flex;align-items:center;gap:6px;">
          <span style="color:${Ct(e.brewCategory)};">●</span> ${e.batchCode} 醸造工程フロー
        </h2>
        <p class="panel-caption">クリティカルパス（全工程直列）</p>
      </div>
      <div style="overflow-x:auto;padding:8px 0;">
        <svg width="${h}" height="${f}" style="display:block;">
          <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/></marker></defs>
          ${A}${$}
        </svg>
      </div>
    </section>
  </div>`}function Up(e,t,n){if(e.length===0)return'<div class="panel" style="padding:20px;text-align:center;color:#9ca3af">仕込が未登録です。調達計画から取込むか、新規登録してください。</div>';const s=e.map(r=>{const i=t[r.id]??[],c=i.length,p=i.filter(g=>g.status==="完了").length,u=c>0?Math.round(p/c*100):0,h=Ct(r.brewCategory);return`<tr style="border-bottom:1px solid #f3f4f6;background:${n===r.id?"#eff6ff":"transparent"};cursor:pointer;" data-action="bp-toggle-detail" data-batch-id="${r.id}">
      <td style="padding:6px;font-size:12px;font-weight:600;color:${h};">${r.batchCode}</td>
      <td style="padding:6px;font-size:11px;"><span style="background:${h};color:#fff;padding:1px 6px;border-radius:9999px;font-size:10px;">${r.brewCategory}</span></td>
      <td style="padding:6px;font-size:11px;text-align:right;">
        <input type="number" min="0" step="100" value="${Math.round(r.plannedVolumeL)}" data-action="bp-batch-vol" data-batch-id="${r.id}" style="width:60px;font-size:11px;text-align:right;border:1px solid #e5e7eb;border-radius:3px;padding:2px 4px;" onclick="event.stopPropagation()">L
      </td>
      <td style="padding:6px;font-size:11px;">
        <input type="date" value="${r.startDate}" data-action="bp-batch-date" data-batch-id="${r.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
      </td>
      <td style="padding:6px;">
        <select data-action="bp-batch-status" data-batch-id="${r.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
          ${["planned","active","completed"].map(g=>`<option value="${g}"${r.status===g?" selected":""}>${Bp[g]}</option>`).join("")}
        </select>
      </td>
      <td style="padding:6px;width:80px;">
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="flex:1;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
            <div style="width:${u}%;height:100%;background:${h};border-radius:3px;"></div>
          </div>
          <span style="font-size:9px;color:#6b7280;white-space:nowrap;">${u}%</span>
        </div>
      </td>
      <td style="padding:6px;text-align:center;">
        <button data-action="bp-show-delete-modal" data-batch-id="${r.id}" data-batch-code="${r.batchCode}" style="font-size:10px;padding:2px 8px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;" onclick="event.stopPropagation()">削除</button>
      </td>
    </tr>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>仕込一覧</h2><p class="panel-caption">${e.length}件 ／ 行クリックで醸造工程フロー表示</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:600px;">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left;">
          <th style="padding:4px 6px;">コード</th><th style="padding:4px 6px;">区分</th>
          <th style="padding:4px 6px;text-align:right;">醸造量</th><th style="padding:4px 6px;">開始日</th>
          <th style="padding:4px 6px;">状態</th><th style="padding:4px 6px;">進捗</th><th style="padding:4px 6px;text-align:center;">操作</th>
        </tr></thead>
        <tbody>${s}</tbody>
      </table>
    </div>
  </section>`}function Yp(e,t){if(e.length===0)return"";const n=new Set(t.map(i=>`${i.brewCategory}:${i.startDate?.slice(0,7)}`)),s=e.filter(i=>{const c=i.brewMonth>=10?i.fy:i.fy+1,p=`${i.brewCategory}:${c}-${String(i.brewMonth).padStart(2,"0")}`;return!n.has(p)&&i.plannedVolumeL>0});return s.length===0?"":`<section class="panel" style="margin-bottom:16px">
    <div class="panel-header">
      <div><h2>調達計画から取込</h2><p class="panel-caption">未登録のスケジュールを一括で仕込登録</p></div>
      <button class="button primary" data-action="bp-import-schedule" style="font-size:12px;">一括仕込登録</button>
    </div>
    <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid #e5e7eb;color:#6b7280;text-align:left;font-size:10px">
        <th style="padding:3px 6px">区分</th><th style="padding:3px 6px">コード</th><th style="padding:3px 6px;text-align:right">醸造量</th><th style="padding:3px 6px">開始月</th><th style="padding:3px 3px;text-align:center">選択</th>
      </tr></thead><tbody>${s.map(i=>{const p=`${i.brewMonth>=10?i.fy:i.fy+1}-${String(i.brewMonth).padStart(2,"0")}-01`,u=`${i.brewCategory}-${i.fy}-${String(i.brewMonth).padStart(2,"0")}`;return`<tr>
      <td style="padding:5px 6px"><span style="color:${Ct(i.brewCategory)};font-weight:600;font-size:11px;">${i.brewCategory}</span></td>
      <td style="padding:5px 6px;font-size:11px;">${u}</td>
      <td style="padding:5px 6px;text-align:right;font-size:11px;">${mn(Math.round(i.plannedVolumeL))}L</td>
      <td style="padding:5px 6px;font-size:11px;">${i.brewMonth}月（${p}）</td>
      <td style="padding:5px 3px;text-align:center;"><input type="checkbox" data-action="bp-import-check" data-cat="${i.brewCategory}" data-month="${i.brewMonth}" data-vol="${Math.round(i.plannedVolumeL)}" data-date="${p}" data-code="${u}" checked></td>
    </tr>`}).join("")}</tbody></table></div>
  </section>`}function Jp(e){return`<div class="panel" style="margin-bottom:16px">
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
  </div>`}function Kp(e,t){const n=[...t].sort((i,c)=>i.stepOrder-c.stepOrder);if(n.length===0)return"";const s=n.map(i=>`<tr style="border-bottom:1px solid #f3f4f6">
    <td style="padding:4px 6px;font-size:11px;font-weight:${i.status==="進行中"?700:400}">${i.stepName}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${Le(i.plannedStart)}〜${Le(i.plannedEnd)}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${i.actualStart?Le(i.actualStart):"―"}〜${i.actualEnd?Le(i.actualEnd):"―"}</td>
    <td style="padding:4px 3px">
      <select data-action="bp-step-status" data-step-id="${i.id}" data-batch-id="${i.batchId}" style="font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px">
        ${["未着手","進行中","完了"].map(c=>`<option value="${c}"${i.status===c?" selected":""}>${c}</option>`).join("")}
      </select>
    </td>
    <td style="padding:4px 3px"><input type="number" step="0.1" data-action="bp-step-temp" data-step-id="${i.id}" value="${i.temperature??""}" placeholder="℃" style="width:50px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
    <td style="padding:4px 3px"><input type="text" data-action="bp-step-notes" data-step-id="${i.id}" value="${i.notes}" placeholder="メモ" style="width:100px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
  </tr>`).join("");return`<section class="panel" style="margin-bottom:16px;border-left:4px solid ${Ct(e.brewCategory)};">
    <div class="panel-header"><h2>${e.batchCode} 工程詳細</h2><p class="panel-caption">${e.brewCategory} ｜ ${mn(e.plannedVolumeL)}L ｜ ${Le(e.startDate)}〜${Le(e.targetEndDate)}</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:500px">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left">
          <th style="padding:3px 6px">工程</th><th style="padding:3px 6px">予定</th><th style="padding:3px 6px">実績</th>
          <th style="padding:3px 3px">状態</th><th style="padding:3px 3px">温度</th><th style="padding:3px 3px">メモ</th>
        </tr></thead>
        <tbody>${s}</tbody>
      </table>
    </div>
  </section>`}function Hp(e,t,n){const s=new Map;for(const i of t){if(!i.tankNo||i.status==="completed")continue;const c=n[i.id]??[],p=c.find(h=>h.stepName==="仕込み(添/仲/留)"),u=c.find(h=>h.stepName==="上槽");p?.plannedStart&&u?.plannedEnd&&(s.has(i.tankNo)||s.set(i.tankNo,[]),s.get(i.tankNo).push({batchCode:i.batchCode,start:p.plannedStart,end:u.plannedEnd}))}const r=e.map(i=>{const c=s.get(i.tankNo)??[],p=c.length>0?c.map(u=>`<span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#dbeafe;color:#2563eb;">${u.batchCode}(${Le(u.start)}〜${Le(u.end)})</span>`).join(" "):'<span style="font-size:9px;color:#22c55e;">空き</span>';return`<tr style="border-bottom:1px solid #f3f4f6;">
      <td style="padding:4px 6px;font-size:12px;font-weight:600;">${i.tankNo}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${mn(i.capacityL)}L</td>
      <td style="padding:4px 6px;font-size:10px;color:#6b7280;">${i.preferredCategories.length>0?i.preferredCategories.join(", "):"全区分"}</td>
      <td style="padding:4px 6px;">${p}</td>
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
  </section>`}function Qp(e,t,n){if(e.length===0||n.length===0)return"";const s=new Map(n.map(h=>[h.stepName,h])),r=new Map;for(const h of e){if(!h.plannedStart||!h.plannedEnd)continue;const f=s.get(h.stepName);if(!f)continue;const g=new Date(h.plannedStart),$=new Date(h.plannedEnd),A=Math.max(Math.round(($.getTime()-g.getTime())/864e5)+1,1);let _=0;for(let P=0;P<A;P++)new Date(g.getTime()+P*864e5).getDay()!==0&&_++;if(_===0)continue;const D=f.laborHours/_;for(let P=new Date(g);P<=$;P=new Date(P.getTime()+864e5)){if(P.getDay()===0)continue;const L=new Date(P);L.setDate(L.getDate()+3-(L.getDay()+6)%7);const S=new Date(L.getFullYear(),0,4),o=1+Math.round(((L.getTime()-S.getTime())/864e5-3+(S.getDay()+6)%7)/7),l=`${L.getFullYear()}-W${String(o).padStart(2,"0")}`;r.set(l,(r.get(l)??0)+D)}}if(r.size===0)return"";const i=[...r.keys()].sort(),c=t.workerCount*t.weeklyHoursLimit,p=Math.max(...r.values(),c),u=i.map(h=>{const f=r.get(h)??0,g=Math.min(f/p*100,100),$=f>c,A=$?"#ef4444":f>c*.8?"#f59e0b":"#22c55e",_=h.replace(/^\d{4}-W/,"W");return`<div style="text-align:center;flex:1;min-width:32px;">
      <div style="height:60px;display:flex;align-items:flex-end;justify-content:center;">
        <div style="width:20px;height:${g}%;background:${A};border-radius:3px 3px 0 0;min-height:2px;" title="${Math.round(f)}h / ${c}h"></div>
      </div>
      <div style="font-size:8px;color:#9ca3af;margin-top:2px;">${_}</div>
      <div style="font-size:9px;font-weight:600;color:${$?"#ef4444":"#374151"};">${Math.round(f)}h</div>
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
        <div style="border-top:2px dashed #ef4444;width:100%;position:relative;top:${-60*(c/p)+60}px;">
          <span style="font-size:7px;color:#ef4444;position:absolute;right:0;top:-10px;">${c}h</span>
        </div>
      </div>
      ${u}
    </div>
  </section>`}function Wp(e,t,n,s={}){const{expandedBatchId:r,showNewForm:i,schedule:c=[],fy:p=2026,workerSettings:u={workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},stepLabor:h=[],tanks:f=[]}=s,g={};for(const S of t)(g[S.batchId]??=[]).push(S);const $=e.filter(S=>S.status==="active").length,A=e.filter(S=>S.status==="planned").length,_=e.filter(S=>S.status==="completed").length,D=r?e.find(S=>S.id===r):null,P=D?Vp(D,g[D.id]??[]):"",L=D?Kp(D,g[D.id]??[]):"";return`
    <section class="page-head">
      <div><p class="eyebrow">製造管理</p><h1>醸造工程管理</h1></div>
      <div class="meta-stack" style="display:flex;gap:8px;">
        <button class="button primary" data-action="bp-auto-schedule" style="font-size:12px;">自動スケジュール</button>
        <button class="button" data-action="bp-show-new-form">＋ 新規仕込</button>
      </div>
    </section>
    <section class="kpi-grid compact">
      <article class="panel kpi-card"><p class="panel-title">醸造中</p><p class="kpi-value">${$}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">計画中</p><p class="kpi-value">${A}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">完了</p><p class="kpi-value">${_}</p><p class="kpi-sub">今期</p></article>
    </section>

    ${Fp(e,g,r)}
    ${Qp(t,u,h)}
    ${Hp(f,e,g)}
    ${i?Jp(n):""}
    ${Yp(c,e)}
    ${P}
    ${L}
    ${Up(e,g,r)}

    <div id="bp-delete-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:1000;align-items:center;justify-content:center;">
      <div style="background:white;border-radius:12px;padding:24px;max-width:360px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <h3 style="margin:0 0 12px;font-size:15px;">仕込を削除</h3>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;"><strong id="bp-delete-batch-name"></strong> の仕込を削除します。<br>関連する全工程データも削除されます。この操作は取り消せません。</p>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button data-action="bp-delete-cancel" style="padding:8px 16px;font-size:13px;border:1px solid #d1d5db;background:white;border-radius:6px;cursor:pointer;">キャンセル</button>
          <button data-action="bp-delete-confirm" style="padding:8px 16px;font-size:13px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer;font-weight:600;">削除する</button>
        </div>
      </div>
    </div>`}function ja(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function Gp(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Po(e){return e?la.find(t=>t.value===e)?.label??e:""}function Xp(e){const t=[],n=[],s=[];for(const r of e){const i=r.amount_last_year_same_month>0?r.amount_this_month/r.amount_last_year_same_month:1,c={code:r.customer_code,name:r.customer_name,businessType:r.business_type,areaCode:r.area_code,phone:r.phone,lastOrderDate:r.last_order_date,daysSinceLastOrder:r.days_since_order,totalAmountLast12m:r.amount_12m,amount3m:r.amount_3m,amountThisMonth:r.amount_this_month,amountLastYearSameMonth:r.amount_last_year_same_month,annualRevenue:r.annual_revenue,yoyRatio:i,status:"dormant"};r.is_at_risk?t.push({...c,status:"at-risk"}):r.is_dormant?n.push({...c,status:"dormant"}):r.amount_last_year_same_month>0&&i<.8&&s.push({...c,status:"declining"})}return t.sort((r,i)=>i.totalAmountLast12m-r.totalAmountLast12m),n.sort((r,i)=>i.daysSinceLastOrder-r.daysSinceLastOrder),s.sort((r,i)=>r.yoyRatio-i.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:s}}function Zp(e,t){const n=t?.reason??"",s=la.map(r=>`<option value="${r.value}" ${n===r.value?"selected":""}>${r.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${s}
    </select>`}function eu(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],s=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',r=!!t?.actionedAt,i=r?'style="opacity:0.45;"':"",c=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${Po(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${r?"1":"0"}" ${i}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${c}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${s}
      <td class="numeric">${ja(e.totalAmountLast12m)}</td>
      <td>${Zp(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${r?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function _a(e,t,n,s,r,i,c,p){if(r.length===0)return"";const u=r.map(h=>eu(h,p.get(h.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${s}" style="margin-right:8px;">${r.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${Gp(i)}</p>
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
    </section>`}function tu(e,t=[]){const{atRiskCustomers:n,dormantCustomers:s,decliningCustomers:r}=e,i=n.length+s.length+r.length,c=n.reduce((P,L)=>P+L.totalAmountLast12m,0),p=s.reduce((P,L)=>P+L.totalAmountLast12m,0),u=r.reduce((P,L)=>P+L.totalAmountLast12m,0),h=[...n,...s,...r],f=[...new Set(h.map(P=>P.areaCode).filter(Boolean))].sort(),g=[...new Set(h.map(P=>P.businessType).filter(Boolean))].sort(),$=new Map(t.map(P=>[P.customerCode,P])),A=t.filter(P=>P.actionedAt).length,_=new Map;t.forEach(P=>{P.reason&&_.set(P.reason,(_.get(P.reason)??0)+1)});const D=[..._.entries()].sort((P,L)=>L[1]-P[1]).slice(0,5).map(([P,L])=>`<span class="status-pill info" style="font-size:0.75rem;">${Po(P)} ${L}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${ja(c)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${s.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${ja(p)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${r.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${A}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-muted);">${i}社中</div>
      </div>
    </section>

    ${D?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${D}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${i})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${s.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${r.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${f.map(P=>`<option value="${P}">${P}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${g.map(P=>`<option value="${P}">${P}</option>`).join("")}
      </select>
    </div>

    ${_a("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,c,"状況",$)}
    ${_a("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",s,p,"経過日数",$)}
    ${_a("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",r,u,"前年同月比",$)}

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
    <\/script>`}const Fe=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],za={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},ze={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function au(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function nu(e){const t=e.reduce((i,c)=>i+c,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const s=Math.max(...e);return e.filter(i=>i>s*.1).length<=6?"seasonal":"year-round"}function su(e){const t=e.reduce((i,c)=>i+c,0);if(t===0)return[];const s=t/12*1.5,r=[];for(let i=0;i<12;i++)e[i]>s&&r.push(i);if(r.length===0){const i=Math.max(...e);i>0&&r.push(e.indexOf(i))}return r.sort((i,c)=>i-c)}function ou(e){return e.length===0?0:(e[0]-2+12)%12}function Wn(e){const t=new Date().getMonth(),n=e.map(r=>{const i=nu(r.monthlyQuantity),c=su(r.monthlyQuantity),p=ou(c);return{code:r.code,name:r.name,category:r.category,peakMonths:c,proposalStartMonth:p,seasonType:i,monthlyQuantity:r.monthlyQuantity}}),s=[];for(let r=0;r<12;r++){const i=n.filter(c=>{if(c.peakMonths.length===0)return!1;const p=c.proposalStartMonth,u=c.peakMonths[0];return p<=u?r>=p&&r<=u:r>=p||r<=u});s.push({month:r,products:i,targetCustomers:[]})}return{products:n,proposals:s,selectedMonth:t}}function ru(e){const{products:t,proposals:n,selectedMonth:s}=e,r=new Date().getMonth(),i={"year-round":[],seasonal:[],"year-end":[]};t.forEach(g=>i[g.seasonType].push(g));const c=n[s],p=t.length,u=c?.products.length??0,h=t.filter(g=>g.peakMonths.includes(s)).length,f=c?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${Fe[s]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${Fe[s]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${h}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${f}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${Fe.map((g,$)=>{const A=$===r,_=$===s;return`<button class="button" style="padding:4px 10px;background:${_?"#0F5B8D":A?"#e2e8f0":"transparent"};color:${_?"#fff":"#333"};border:${A&&!_?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${$}">${g}${A?" ●":""}</button>`}).join("")}
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
            ${Fe.map((g,$)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${$===r?"background:#f0f7ff;":""}">${g.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${iu(i,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${lu(i,s)}

  <!-- Target customer list for selected month -->
  ${cu(c)}
</div>`}function iu(e,t){const n=[],s=["year-round","seasonal","year-end"];for(const r of s){const i=e[r];if(i.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${ze[r]}15;color:${ze[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${za[r]}</span>
    </td></tr>`);for(const c of i){const p=Fe.map((u,h)=>{const f=c.peakMonths.includes(h),g=Eo(c,h),$=h===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let A="transparent";f?A=ze[c.seasonType]:g&&(A=ze[c.seasonType]+"40");const _=f||g?`background:${A};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${$}"><div style="${_}" title="${f?"ピーク":g?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${c.name}"><span class="mono" style="font-size:0.7rem;color:#888">${c.code}</span> ${c.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${ze[c.seasonType]}15;color:${ze[c.seasonType]}">${za[c.seasonType]}</span></td>
        ${p}
      </tr>`)}}}return n.join("")}function Eo(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,s=e.peakMonths[0];return n<=s?t>=n&&t<s:t>=n||t<s}function lu(e,t){const s=["year-round","seasonal","year-end"].map(r=>{const i=e[r];if(i.length===0)return"";const c=i.filter(u=>u.peakMonths.includes(t)||Eo(u,t));if(c.length===0)return"";const p=c.map(u=>{const f=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',g=u.monthlyQuantity.reduce(($,A)=>$+A,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${f}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${g.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map($=>Fe[$]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${ze[r]}15;color:${ze[r]}">${za[r]}</span>
        <span style="font-size:0.85rem;color:#666">${Fe[t]}の対象: ${c.length}品</span>
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
    </div>`}).filter(Boolean);return s.length===0?`<div style="padding:1rem;color:#666;text-align:center">${Fe[t]}に提案対象の商品はありません</div>`:s.join("")}function cu(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${au(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const du=["日","月","火","水","木","金","土"];function Sa(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${Math.round(e/1e3)}K`:`¥${e.toLocaleString()}`}function Ao(e){return e?e.totalVolumes.reduce((t,n)=>t+n.bottles,0):0}function pu(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n-1,1),r=new Date(t,n,0),i=[];for(let c=0;c<s.getDay();c++)i.push({outside:!0});for(let c=1;c<=r.getDate();c++)i.push({date:`${e}-${String(c).padStart(2,"0")}`});for(;i.length%7!==0;)i.push({outside:!0});return i}function uu(e,t){const[n,s]=t.split("-").map(Number),r=new Date(n,s,0).getDate(),i=Array.from({length:7},()=>({count:0,amount:0,bottles:0,days:0}));for(let c=1;c<=r;c++){const p=`${t}-${String(c).padStart(2,"0")}`,u=new Date(n,s-1,c).getDay();i[u].days++;const h=e[p];h&&(i[u].count+=h.count,i[u].amount+=h.totalAmount,i[u].bottles+=Ao(h))}return i}function mu(e,t){const n=[];for(let s=0;s<t.length;s+=7){const r=t.slice(s,s+7);let i=0,c=0,p=0,u=0;for(const h of r)if(h.date){u++;const f=e[h.date];f&&(i+=f.count,c+=f.totalAmount,p+=Ao(f))}n.push({count:i,amount:c,bottles:p,days:u})}return n}function yu(e,t,n){const[s,r]=t.split("-").map(Number),i=new Date(s,r-2,1),c=new Date(s,r,1),p=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`,u=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,h=new Date().toISOString().slice(0,10),f=pu(t),g=e?uu(e,t):null,$=e?mu(e,f):null;let A="";if(e===null)A='<div class="sc-loading" style="grid-column:1/-1;"><div class="loading-spinner"></div><p>読み込み中…</p></div>';else for(let S=0;S<f.length;S++){const o=f[S];if(o.outside)A+='<div class="sc-cell sc-outside"></div>';else{const l=o.date,d=Number(l.split("-")[2]),m=new Date(`${l}T00:00:00`).getDay(),y=e[l],w=l===h,v=l===n;let x="",k="";y&&(x=`<span class="sc-badge">${y.count}件</span>`,k=y.cityGroups.slice(0,3).map(C=>`<span class="sc-city-tag">${C.city}<em>${C.count}</em></span>`).join(""),y.cityGroups.length>3&&(k+=`<span class="sc-city-more">+${y.cityGroups.length-3}</span>`)),A+=`
          <div class="sc-cell ${w?"sc-today":""} ${v?"sc-selected":""} ${y?"sc-has-data":""}"
               data-sc-date="${l}">
            <div class="sc-day-header">
              <span class="sc-day-num ${m===0?"sc-sun":m===6?"sc-sat":""}">${d}</span>
              ${x}
            </div>
            <div class="sc-cities">${k}</div>
          </div>`}if((S+1)%7===0&&$){const l=$[Math.floor(S/7)],d=l.days>0?l.count/l.days:0;A+=`
          <div class="sc-cell sc-week-total">
            <div class="sc-wt-count">${l.count}<small>件</small></div>
            <div class="sc-wt-amount">${Sa(l.amount)}</div>
            <div class="sc-wt-bottles">${l.bottles}<small>本</small></div>
            <div class="sc-wt-avg">⌀${d.toFixed(1)}<small>件/日</small></div>
          </div>`}}let _="";if(g){_=g.map((y,w)=>{const v=y.days>0?y.count/y.days:0;return`<div class="sc-wd-summary ${w===0?"sc-sun":w===6?"sc-sat":""}">
        <span class="sc-wds-count">${y.count}<small>件</small></span>
        <span class="sc-wds-amt">${Sa(y.amount)}</span>
        <span class="sc-wds-bottles">${y.bottles}<small>本</small></span>
        <span class="sc-wds-avg">⌀${v.toFixed(1)}</span>
      </div>`}).join("");const S=g.reduce((y,w)=>y+w.count,0),o=g.reduce((y,w)=>y+w.amount,0),l=g.reduce((y,w)=>y+w.bottles,0),d=g.reduce((y,w)=>y+w.days,0),m=d>0?S/d:0;_+=`<div class="sc-wd-summary sc-wd-month-total">
      <span class="sc-wds-count">${S}<small>件</small></span>
      <span class="sc-wds-amt">${Sa(o)}</span>
      <span class="sc-wds-bottles">${l}<small>本</small></span>
      <span class="sc-wds-avg">⌀${m.toFixed(1)}</span>
    </div>`}const D=n&&e?.[n]?gu(e[n]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',P=Object.values(e??{}).reduce((S,o)=>S+o.count,0),L=Object.values(e??{}).reduce((S,o)=>S+o.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${P>0?`月計: <strong>${P}件</strong> / <strong>¥${L.toLocaleString()}</strong>`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${p}">◀</button>
          <span class="sc-month-label">${s}年${r}月</span>
          <button class="sc-nav-btn" data-sc-ym="${u}">▶</button>
        </div>
        <div class="sc-unit-note">K=¥1,000 / M=¥1,000,000</div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <!-- 曜日ヘッダー 8列 -->
          <div class="sc-weekdays-8">
            ${du.map((S,o)=>`<div class="sc-weekday ${o===0?"sc-sun":o===6?"sc-sat":""}">${S}</div>`).join("")}
            <div class="sc-weekday sc-wk-header">週計</div>
          </div>

          <!-- 曜日別集計サマリー行 -->
          ${_?`<div class="sc-wd-summary-row">${_}</div>`:""}

          <!-- カレンダーグリッド 8列 -->
          <div class="sc-grid-8">
            ${A}
          </div>
        </div>

        <div class="sc-detail-col${n?" sc-detail-active":""}">
          ${D}
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

      .sc-body { display: grid; grid-template-columns: 1fr 280px; min-height: 480px; }
      @media (max-width: 900px) { .sc-body { grid-template-columns: 1fr; } }

      .sc-calendar-col { padding: 12px 16px; border-right: 1px solid var(--border, #e5e7eb); overflow-x: auto; }

      /* 8列ヘッダー */
      .sc-weekdays-8 { display: grid; grid-template-columns: repeat(7, 1fr) 80px; margin-bottom: 0; }
      .sc-weekday { text-align: center; font-size: 0.75rem; font-weight: 600; color: var(--text-muted, #6b7280); padding: 4px 0; }
      .sc-weekday.sc-sun { color: #ef4444; }
      .sc-weekday.sc-sat { color: #3b82f6; }
      .sc-wk-header { background: #f0fdf4; color: #166534; font-weight: 700; border-radius: 4px 4px 0 0; }

      /* 曜日別集計サマリー行 */
      .sc-wd-summary-row { display: grid; grid-template-columns: repeat(7, 1fr) 80px; margin-bottom: 4px; border-bottom: 2px solid var(--border, #d1d5db); padding-bottom: 6px; }
      .sc-wd-summary { text-align: center; font-size: 0.65rem; line-height: 1.4; padding: 4px 2px; display: flex; flex-direction: column; align-items: center; gap: 1px; }
      .sc-wd-summary.sc-sun { color: #ef4444; }
      .sc-wd-summary.sc-sat { color: #3b82f6; }
      .sc-wd-summary.sc-wd-month-total { background: #f0fdf4; border-radius: 0 0 4px 4px; color: #166534; font-weight: 600; }
      .sc-wds-count { font-weight: 700; font-size: 0.72rem; }
      .sc-wds-amt { color: var(--text-muted, #6b7280); }
      .sc-wds-bottles { color: #92400e; }
      .sc-wds-avg { color: #0369a1; font-style: italic; }
      .sc-wd-summary small { font-size: 0.55rem; opacity: 0.7; }

      /* 8列グリッド */
      .sc-grid-8 { display: grid; grid-template-columns: repeat(7, 1fr) 80px; gap: 2px; }
      .sc-cell { min-height: 72px; border: 1px solid var(--border, #e5e7eb); border-radius: 6px; padding: 4px 6px; cursor: pointer; transition: background 0.1s, border-color 0.1s; }
      .sc-cell.sc-outside { background: transparent; border-color: transparent; cursor: default; }
      .sc-cell:not(.sc-outside):hover { background: var(--bg-hover, #f9fafb); border-color: var(--primary, #0F5B8D); }
      .sc-cell.sc-today { background: #eff6ff; border-color: #3b82f6; }
      .sc-cell.sc-selected { background: #dbeafe; border-color: #2563eb; border-width: 2px; }
      .sc-cell.sc-has-data .sc-day-num { font-weight: 700; }

      /* 週計セル */
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

      .sc-day-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px; }
      .sc-day-num { font-size: 0.8rem; color: var(--text, #111); }
      .sc-day-num.sc-sun { color: #ef4444; }
      .sc-day-num.sc-sat { color: #3b82f6; }
      .sc-badge { font-size: 0.65rem; background: var(--primary, #0F5B8D); color: #fff; border-radius: 10px; padding: 1px 5px; }

      .sc-cities { display: flex; flex-wrap: wrap; gap: 2px; }
      .sc-city-tag { font-size: 0.6rem; background: #e0f2fe; color: #0369a1; border-radius: 4px; padding: 1px 4px; display: flex; align-items: center; gap: 2px; }
      .sc-city-tag em { font-style: normal; font-weight: 700; }
      .sc-city-more { font-size: 0.6rem; color: var(--text-muted, #6b7280); }

      .sc-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; gap: 12px; color: var(--text-muted, #6b7280); }

      .sc-detail-col { padding: 16px; overflow-y: auto; max-height: 600px; }
      .sc-detail-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted, #6b7280); font-size: 0.9rem; text-align: center; padding: 40px 20px; }
      .sc-detail-close { display: none; }

      .sc-detail-date { font-size: 1rem; font-weight: 700; margin: 0 0 4px; }
      .sc-detail-meta { font-size: 0.8rem; color: var(--text-muted, #6b7280); margin-bottom: 12px; }
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

      /* ── スマホ ── */
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

        .sc-cell { min-height: 44px; padding: 2px 3px; border-radius: 4px; }
        .sc-day-num { font-size: 0.75rem; }
        .sc-badge { font-size: 0.6rem; padding: 1px 4px; }
        .sc-cities { display: none; }
        .sc-wd-summary-row { display: none; }

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
  `}function hu(e){return e.length?e.map(t=>`<span class="sc-vol-badge">${t.label}<em>${t.bottles}</em></span>`).join(""):""}function gu(e){const t=e.date.replace(/-/g,"/").slice(5),n=e.totalVolumes.length?`<div class="sc-day-volumes">${e.totalVolumes.map(i=>`<span class="sc-vol-tag">${i.label} <strong>${i.bottles}本</strong></span>`).join("")}</div>`:"",s={};for(const i of e.entries)(s[i.city]??=[]).push(i);const r=Object.entries(s).sort((i,c)=>c[1].length-i[1].length).map(([i,c])=>{const p=c.sort((u,h)=>h.amount-u.amount).map(u=>`
          <div class="sc-customer-row">
            <div class="sc-customer-main">
              <span class="sc-customer-name" title="${u.customerName}">${u.customerName}</span>
              <span class="sc-customer-amt">${u.amount>0?`¥${u.amount.toLocaleString()}`:"-"}${u.invoiceCount>1?` (${u.invoiceCount}伝票)`:""}</span>
            </div>
            ${u.volumes.length?`<div class="sc-customer-vols">${hu(u.volumes)}</div>`:""}
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${i}（${c.length}先）</div>
          ${p}
        </div>`}).join("");return`
    <p class="sc-detail-date">${t}の出荷</p>
    <p class="sc-detail-meta">${e.entries.length}先 ${e.count}伝票 / ¥${e.totalAmount.toLocaleString()}</p>
    ${n}
    ${r}
  `}const fu=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),ka=["月","火","水","木","金"],Gn=6;function vu(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function bu(e,t){if(t.length===0)return 0;const n=[...t].sort((r,i)=>r-i);return n.filter(r=>r<=e).length/n.length}function wu(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function Xn(e){const t=new Date,n=e.map(u=>u.annualRevenue),s=e.map(u=>{const h=vu(u.lastOrderDate,t);let f=0;const g=[];h>=60&&(f+=50,g.push("離反リスク")),u.hasSeasonalProposal&&(f+=30,g.push("季節提案タイミング")),h>=30&&h<60&&(f+=20,g.push("定期巡回"));const $=bu(u.annualRevenue,n),A=Math.round($*20);A>0&&(f+=A,g.push("金額ウェイト"));const _=wu(g,h);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:f,reasons:g,lastOrderDate:u.lastOrderDate,daysSinceOrder:h,annualRevenue:u.annualRevenue,recommendedAction:_}}).filter(u=>u.priorityScore>0).sort((u,h)=>h.priorityScore-u.priorityScore),r=new Map;for(const u of s){const h=u.areaCode||"その他";r.has(h)||r.set(h,[]),r.get(h).push(u)}const i=[...r.entries()].sort((u,h)=>h[1].reduce((f,g)=>f+g.priorityScore,0)-u[1].reduce((f,g)=>f+g.priorityScore,0)),c=[];let p=0;for(const[u,h]of i){const f=h.sort((g,$)=>$.priorityScore-g.priorityScore);for(let g=0;g<f.length&&!(p>=ka.length);g+=Gn){const $=f.slice(g,g+Gn);c.push({dayLabel:ka[p],area:u,visits:$}),p++}if(p>=ka.length)break}return{candidates:s,weekPlan:c,filterArea:"",filterMinScore:0}}function xu(e){const{candidates:t,weekPlan:n,filterArea:s,filterMinScore:r}=e,i=t.filter(g=>!(s&&g.areaCode!==s||r>0&&g.priorityScore<r)),c=Array.from(new Set(t.map(g=>g.areaCode))).sort(),p=i.length,u=i.filter(g=>g.priorityScore>=50).length,h=i.filter(g=>g.reasons.includes("離反リスク")).length,f=n.reduce((g,$)=>g+$.visits.length,0);return`
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
        <div class="kpi-value">${h}</div>
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
            ${c.map(g=>`<option value="${g}"${s===g?" selected":""}>${g}</option>`).join("")}
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
      ${n.length===0?"<p>訪問候補がありません。</p>":$u(n)}
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
            ${i.map(g=>_u(g)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function $u(e){return`
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
  `}function _u(e){return`
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
      <td class="numeric">${fu.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function Su(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=e.map(h=>{const f=h.capacity>0?Math.round(h.currentVolume/h.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${h.tankNo}</strong></td>
          <td class="numeric">${h.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${h.currentVolume>0?h.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${f}%"></div>
            </div>
            <span class="progress-label">${f}%</span>
          </td>
          <td>${h.productName||"―"}</td>
          <td class="mono">${h.jikomiNo||"―"}</td>
          <td>
            <span class="status-pill ${n[h.status]}">${t[h.status]}</span>
          </td>
          <td>${h.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${h.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),r=e.filter(h=>h.status==="in_use").length,i=e.filter(h=>h.status==="aging").length,c=e.filter(h=>h.status==="empty").length,p=e.reduce((h,f)=>h+f.capacity,0),u=e.reduce((h,f)=>h+f.currentVolume,0);return`
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
        <p class="kpi-sub">熟成中 ${i} 基</p>
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
  `}function Pa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ku(e){if(e.length===0)return`<section class="panel">
      <div class="panel-header">
        <div>
          <h2>移出量集計（販売実績ベース）</h2>
          <p class="panel-caption">当月の販売伝票から自動集計した移出量と概算税額</p>
        </div>
      </div>
      <p class="empty-message">データなし — 商品マスタに volume_ml が設定されていることを確認してください。</p>
    </section>`;const t=e.reduce((c,p)=>c+p.volumeSaleL,0),n=e.reduce((c,p)=>c+p.volumeReturnL,0),s=e.reduce((c,p)=>c+p.volumeNetL,0),r=e.reduce((c,p)=>c+p.taxAmount,0);return`<section class="panel">
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
        <tbody>${e.map(c=>{const p=c.alcDegree!==null?`${c.alcDegree}度`:'<span class="text-warning">未設定</span>',u=c.taxRatePerKl!==null?`${c.taxRatePerKl.toLocaleString("ja-JP")} 円/KL`:'<span class="text-warning">度数未設定</span>',h=c.taxRatePerKl!==null?`<strong>${c.taxAmount.toLocaleString("ja-JP")} 円</strong>`:'<span class="text-warning">—</span>';return`<tr>
      <td>${c.sakeType}</td>
      <td class="numeric">${p}</td>
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
  </section>`}function Pu(e,t,n,s=[]){const r=e.rows.map((f,g)=>`
      <tr>
        <td class="mono">${f.taxCategory}</td>
        <td>${f.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${g}" data-tax-field="alcoholDegree" value="${f.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="productionVolume" value="${f.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="previousBalance" value="${f.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="exportDeduction" value="${f.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="sampleDeduction" value="${f.sampleDeduction}" />
        </td>
        <td class="numeric">${f.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${f.taxRate}</td>
        <td class="numeric"><strong>${Pa(f.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${g}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),i=e.deductions.map((f,g)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${g}" data-ded-field="type">
            ${Object.keys(Ta).map($=>`<option value="${$}" ${$===f.type?"selected":""}>${Ta[$]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${g}" data-ded-field="categoryCode">
            ${Rs.map($=>`<option value="${$.code}" ${$.code===f.categoryCode?"selected":""}>${$.code}:${$.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${g}" data-ded-field="volume" value="${f.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${g}" data-ded-field="reason" value="${f.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${g}" data-ded-field="documentNo" value="${f.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${g}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),c=Array.from({length:12},(f,g)=>g+1),p=e.rows.reduce((f,g)=>f+g.exportDeduction+g.sampleDeduction,0),u=e.rows.reduce((f,g)=>f+g.productionVolume,0),h=u>0?p/u*100:0;return`
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
            ${[2025,2026,2027].map(f=>`<option value="${f}" ${t===f?"selected":""}>${f}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${c.map(f=>`<option value="${f}" ${n===f?"selected":""}>${f}月</option>`).join("")}
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
        <p class="kpi-value">${Pa(e.totalTax)}</p>
        <p class="kpi-sub">${e.targetYear}年${e.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${e.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.rows.length} 区分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">控除数量</p>
        <p class="kpi-value">${p.toLocaleString("ja-JP")} L</p>
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
              <th class="numeric">${Pa(e.totalTax)}</th>
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

    ${ku(s)}

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
  `}const yn=[{title:"販売業務",color:"#1a56db",features:[{id:"invoice-entry",route:"/invoice-entry",label:"伝票入力",desc:"売上・返品伝票の新規入力、明細追加",addedVersion:1},{id:"invoice-browse",route:"/invoice",label:"伝票照会",desc:"過去伝票の検索・表示・PDF出力",addedVersion:1},{id:"delivery-note",route:"/delivery",label:"納品書発行",desc:"納品書のPDFダウンロード・印刷",addedVersion:1},{id:"billing-monthly",route:"/billing",label:"月次請求",desc:"請求書発行・入金消込・未収管理",addedVersion:1},{id:"ledger-view",route:"/ledger",label:"得意先台帳",desc:"得意先別の取引履歴・残高確認",addedVersion:1},{id:"quote-create",route:"/quote",label:"見積作成",desc:"見積書の作成・PDF出力・メール送付",addedVersion:50},{id:"shipment-calendar",route:"/shipment-calendar",label:"配送カレンダー",desc:"伝票日付ベースの配送スケジュール確認",addedVersion:200}]},{title:"分析・レポート",color:"#7e3af2",features:[{id:"analytics-monthly",route:"/analytics",label:"月次売上グラフ",desc:"月次・商品別・得意先別の売上推移グラフ",addedVersion:1},{id:"analytics-volume",route:"/analytics",label:"移出量集計",desc:"商品・得意先別の移出量（mL）集計",addedVersion:320},{id:"customer-analysis",route:"/customer-analysis",label:"得意先分析",desc:"ABC分析・購買頻度・LTV",addedVersion:100},{id:"product-power",route:"/product-power",label:"商品力分析",desc:"商品別販売力・成長率",addedVersion:100},{id:"customer-efficiency",route:"/customer-efficiency",label:"営業効率",desc:"訪問コスト・粗利効率",addedVersion:150},{id:"report-aggregate",route:"/report",label:"集計帳票",desc:"各種集計レポートの出力",addedVersion:50},{id:"sales-list",route:"/sales",label:"売上一覧",desc:"売上明細の一覧表示・CSV出力",addedVersion:1}]},{title:"営業・顧客管理",color:"#0e9f6e",features:[{id:"churn-alert",route:"/churn-alert",label:"営業アクション",desc:"離反リスク検知・フォロー優先度",addedVersion:150},{id:"visit-planner",route:"/visit-planner",label:"訪問計画",desc:"訪問スケジュールの作成・管理",addedVersion:200},{id:"map-view",route:"/map",label:"取引先マップ",desc:"地図上で取引先の位置確認",addedVersion:100},{id:"prospects",route:"/prospects",label:"新規営業",desc:"新規開拓リストの進捗管理",addedVersion:100},{id:"email-broadcast",route:"/email",label:"メール配信",desc:"一斉メール配信・テンプレート管理",addedVersion:200},{id:"seasonal-calendar",route:"/seasonal-calendar",label:"季節提案",desc:"季節別提案スケジュール管理",addedVersion:250}]},{title:"受注・仕入",color:"#e3a008",features:[{id:"workflow-order",route:"/workflow",label:"受注ワークフロー",desc:"受注から出荷までのステータス管理",addedVersion:150},{id:"shopify-orders",route:"/shopify",label:"Shopify受注",desc:"EC受注の確認・取込",addedVersion:200},{id:"purchase-manage",route:"/purchase",label:"仕入・買掛",desc:"仕入管理・買掛金残高",addedVersion:100},{id:"payment-status",route:"/payment",label:"入金状況",desc:"入金・回収状況の一覧",addedVersion:1}]},{title:"製造管理",color:"#e02424",features:[{id:"jikomi-record",route:"/jikomi",label:"仕込管理",desc:"仕込帳・麹室・タンク仕込記録",addedVersion:200},{id:"tanks-manage",route:"/tanks",label:"タンク管理",desc:"タンク別在庫・ブレンド管理",addedVersion:200},{id:"tax-declaration",route:"/tax",label:"酒税申告書",desc:"課税移出・控除明細・eTax XML出力",addedVersion:250},{id:"tax-volume",route:"/tax",label:"移出量自動集計",desc:"販売伝票から清酒・リキュール別移出量を自動計算",addedVersion:322},{id:"demand-forecast",route:"/demand",label:"需要予測",desc:"過去実績ベースの需要予測",addedVersion:250},{id:"brewing-plan",route:"/brewing-plan",label:"醸造計画",desc:"年間醸造スケジュール管理",addedVersion:280},{id:"procurement-plan",route:"/procurement",label:"調達計画",desc:"原料米の調達・予算管理",addedVersion:280},{id:"brewing-process",route:"/brewing-process",label:"醸造工程",desc:"バッチ別工程管理・麹室制約チェック",addedVersion:300}]},{title:"マスタ・設定",color:"#6b7280",features:[{id:"master-products",route:"/master",label:"商品マスタ",desc:"商品情報の参照・編集",addedVersion:1},{id:"master-customers",route:"/master",label:"得意先マスタ",desc:"得意先情報の参照・編集",addedVersion:1},{id:"store-pos",route:"/store",label:"店舗販売",desc:"直売所のPOS・販売記録",addedVersion:250},{id:"tour-booking",route:"/tour",label:"酒蔵見学予約",desc:"見学予約の受付・管理",addedVersion:250},{id:"relay-status",route:"/setup",label:"連動状態",desc:"酒仙iとのリレー同期状態確認",addedVersion:1},{id:"csv-import",route:"/import",label:"CSV取込",desc:"マスタ・売上データのCSVインポート",addedVersion:100},{id:"user-manage",route:"/users",label:"ユーザー管理",desc:"アカウント・権限管理",addedVersion:100},{id:"url-share",route:"/",label:"URL共有",desc:"PWAモードでも全ページをURLで共有可能",addedVersion:322}]}];function Zn(){return yn.flatMap(e=>e.features)}function Eu(e,t){const n=Date.now()-2592e6;return yn.flatMap(s=>s.features).filter(s=>s.route===e).some(s=>{const r=t[s.id];return r?.confirmedAt!=null&&new Date(r.confirmedAt).getTime()>n})}function Au(e,t){const s=Zn().filter(c=>e[c.id]?.confirmedAt).length,r=Zn().length,i=yn.map(c=>{const p=c.features.map(h=>{const f=e[h.id],g=!!f?.confirmedAt,$=f?.confirmedAt?new Date(f.confirmedAt).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"}):"",A=f?.confirmedBy?`(${f.confirmedBy})`:"",_=g&&f?.confirmedAt?Date.now()-new Date(f.confirmedAt).getTime()<720*60*60*1e3:!1;return`
        <tr class="feature-row ${g?"confirmed":""}">
          <td class="feature-check">
            <input type="checkbox" class="feature-checkbox" data-feature-id="${h.id}"
              ${g?"checked":""} />
          </td>
          <td class="feature-label">
            <a href="#" data-link="${h.route}" class="feature-link">${h.label}</a>
            ${_?'<span class="badge-new-small">NEW</span>':""}
          </td>
          <td class="feature-desc">${h.desc}</td>
          <td class="feature-version mono">v${h.addedVersion}</td>
          <td class="feature-status">
            ${g?`<span class="status-pill success">確認済 ${$} ${A}</span>`:'<span class="status-pill muted">未確認</span>'}
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
            <tbody>${p}</tbody>
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
      チェックを入れると「確認済み」として記録されます。HOME画面のカードには30日以内に確認された機能に <span class="badge-new-small">NEW</span> バッジが表示されます。
    </div>

    ${i}
  `}const Lu={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let He=null,Cu=0;const Fa=[];function Du(){return He&&document.body.contains(He)||(He=document.createElement("div"),He.className="toast-container",document.body.appendChild(He)),He}function F(e,t="success",n){const s=Du(),r=++Cu,i=t==="error"?5e3:t==="warning"?4e3:3e3,c=document.createElement("div");c.className=`toast toast-${t}`,c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.innerHTML=`
    <span class="toast-icon">${Lu[t]}</span>
    <span class="toast-msg">${Tu(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const p={id:r,message:e,type:t,el:c};Fa.push(p),s.appendChild(c),requestAnimationFrame(()=>{c.classList.add("toast-enter")});const u=()=>qu(p);c.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{c.classList.add("toast-exit"),c.addEventListener("animationend",u,{once:!0})},i)}function qu(e){const t=Fa.indexOf(e);t!==-1&&(Fa.splice(t,1),e.el.remove())}function Tu(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ee(e,t={}){const{title:n="確認",confirmLabel:s="OK",cancelLabel:r="キャンセル",variant:i="primary"}=t;return new Promise(c=>{const p=document.createElement("div");p.className="modal-backdrop confirm-backdrop",p.setAttribute("role","dialog"),p.setAttribute("aria-modal","true"),p.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${i}">
            ${i==="danger"?Iu:Nu}
          </div>
          <h3 class="confirm-title">${Vt(n)}</h3>
          <p class="confirm-message">${Vt(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${Vt(r)}</button>
          <button class="button ${i} confirm-ok">${Vt(s)}</button>
        </div>
      </div>
    `;const u=f=>{p.classList.add("confirm-exit"),p.addEventListener("animationend",()=>{p.remove()},{once:!0}),c(f)};p.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),p.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),p.addEventListener("click",f=>{f.target===p&&u(!1)});const h=f=>{f.key==="Escape"&&(document.removeEventListener("keydown",h),u(!1))};document.addEventListener("keydown",h),document.body.appendChild(p),requestAnimationFrame(()=>{p.querySelector(".confirm-ok")?.focus()})})}const Iu=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,Nu=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function Vt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function es(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Va(e,t,n){if(t.length===0&&(!n||n.length===0))return;const s=n&&n.length>0?n:Object.keys(t[0]??{}).map(h=>({key:h,label:h})),i=`\uFEFF${[s.map(h=>es(h.label)).join(","),...t.map(h=>s.map(f=>es(h[f.key])).join(","))].join(`\r
`)}`,c=new Blob([i],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(c),u=document.createElement("a");u.href=p,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(p),0)}const Mu=Object.fromEntries(la.map(e=>[e.value,e.label])),Ru=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan","/procurement","/brewing-process","/changelog"];let rt=[];async function Ou(){const{supabaseQueryAll:e}=await I(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>te);return{supabaseQueryAll:n}},void 0);rt=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const ts=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"},{path:"/procurement",title:"調達計画"},{path:"/brewing-process",title:"醸造工程"},{path:"/changelog",title:"機能一覧・更新履歴"}];function Lo(e){const t=Ka[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function hn(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Bu(){const e=Lo("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const da=new Date,ju=da.toISOString().slice(0,7),zu=da.getFullYear(),Fu=da.getMonth()+1,Vu=da.toISOString().slice(0,10),Uu="C0011",Qe=Bu();function Co(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return Ru.includes(n)?n:"/"}function gn(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":case"/procurement":case"/brewing-process":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const as=Co(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,systemHealth:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,analysisTab:"customer",analysisPeriod:"",invoiceForm:hn(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:ju,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:zu,taxMonth:Fu,taxVolume:null,featureStatuses:null,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],mapLoaded:!1,callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...sp,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...op},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Vu,route:as,currentCategory:gn(as),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},invoiceSelectedDocNo:null,invoiceSelectedLines:null,ledgerCustomerCode:Uu,salesPeriod:"month",customRange:{start:"",end:""},quoteState:na(Na()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCompanySettings:Na(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyFiscalType:"jan",customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...cn},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:Qe.mode,emailRegion:Qe.region,emailHistorySegment:Qe.historySegment,emailTemplateId:Qe.templateId,emailSubject:Qe.subject,emailBody:Qe.body,emailSaveMessage:Qe.saveMessage,emailSending:!1,demandForecast:{...Hl},shipmentCalendarData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:Gt(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:dt,empCapacity:pt},brewingSchedule:[],brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},riceVarieties:[],ricePurchaseCommitments:[],procurementDecisions:{},brewingBatches:[],brewingProcessSteps:[],bpExpandedBatchId:"",bpShowNewForm:!1,bpWorkerSettings:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},bpStepLabor:[],bpTanks:[],globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function ns(e){return e.slice(0,10)}function Yu(e){return{...e}}function oa(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Do(){a.invoiceForm=hn(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},oa()}function qo(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,s)=>{n.productCode.trim()||(t[`lines.${s}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${s}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${s}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${s}.unitPrice`]="単価は0円以上で入力してください。")}),t}function Ju(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,Yu(t))}function Ku(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((s,r)=>{const i=r===0?1:2,c=1200*(r+1);return{productCode:s.code,productName:s.name,quantity:i,unitPrice:c,unit:"本",amount:i*c}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function Hu(e){const t=a.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Qu(e){const t=a.masterStats?.customers.find(n=>n.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function To(e){if(Ne(e),a.invoiceErrors=qo(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){E();return}a.invoiceSaving=!0,E(),ws(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=hn(),E()}).catch(()=>{a.invoiceSaving=!1,E()})}function Io(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((s,r)=>new Date(r.date).getTime()-new Date(s.date).getTime()).filter(s=>{const r=new Date(s.date);return!(t&&r<t||n&&r>n)})}function No(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?rt:rt.filter(e=>e.area===a.emailRegion);case"history":return rt.filter(e=>e.historySegment===a.emailHistorySegment);default:return rt}}function Wu(){const e=No();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function Ea(e){const t=No(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(s=>s.email),status:e}}function fn(){return a.user,!1}function Pt(){a.globalSearchOpen=!1,a.globalQuery=""}function Gu(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:ts.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:ts}}function Xu(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?Io(a.salesSummary):[]).map(s=>({documentNo:s.documentNo,date:s.date,customerCode:s.customerCode,customerName:s.customerName,amount:s.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((s,r)=>r.balanceAmount-s.balanceAmount).map(s=>({...s})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(s=>({...s})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(s=>({...s})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(s=>({...s})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(s=>({...s})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(s=>({...s}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(s=>({...s}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Va(n,e,t)}function Xt(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=gn(e),a.sidebarOpen=!1,e==="/customer-analysis"&&(a.analysisTab="customer"),Pt(),Et(e)}async function Et(e){a.actionLoading=!0,E();try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,E(),a.quoteList=await ln(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:t}=await I(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>O);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await kt(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await Wa());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await Ga(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await I(async()=>{const{fetchShipmentCalendar:n}=await Promise.resolve().then(()=>O);return{fetchShipmentCalendar:n}},void 0);a.shipmentCalendarData=await t(a.shipmentCalendarYearMonth);break}case"/billing":a.billingSummary||(a.billingSummary=await Xa(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await xs());break;case"/product-power":case"/product-abc":Xt("/customer-analysis"),a.analysisTab="product";return;case"/customer-efficiency":a.customerEfficiency=await ot(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);break;case"/customer-analysis":await Promise.all([ks(a.analysisPeriod).then(t=>{a.customerAnalysis=t}),Ps(a.analysisPeriod).then(t=>{a.productABC=t})]);break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await I(async()=>{const{fetchDemandForecasts:i,fetchDeliverySchedule:c}=await Promise.resolve().then(()=>O);return{fetchDemandForecasts:i,fetchDeliverySchedule:c}},void 0),[s,r]=await Promise.all([t(),n()]);a.demandForecast.forecasts=s.map(i=>({code:i.productCode,name:i.productName,segment:i.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(i.avgMonthly),adjustedAvg:Math.round(i.avgMonthly),nextMonthForecast:Math.round(i.forecastQuantity),annualForecast:Math.round(i.avgMonthly*12),safetyStock:Math.round(i.safetyStock)})),a.demandForecast.deliveries=Ql(r)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:n}=await I(async()=>{const{fetchChurnAlerts:s,fetchChurnNotes:r}=await Promise.resolve().then(()=>O);return{fetchChurnAlerts:s,fetchChurnNotes:r}},void 0);if(!a.churnAlert){const s=await t();a.churnAlert=Xp(s)}a.churnNotes=await n();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await I(async()=>{const{fetchProductShipmentsFromTable:s}=await Promise.resolve().then(()=>O);return{fetchProductShipmentsFromTable:s}},void 0),n=await t();if(n.length>0)a.seasonalCalendar=Wn(n.map(s=>({code:s.code,name:s.name,category:"",monthlyQuantity:s.monthlyQuantity})));else{const{fetchProductMonthlyShipments:s}=await I(async()=>{const{fetchProductMonthlyShipments:i}=await Promise.resolve().then(()=>O);return{fetchProductMonthlyShipments:i}},void 0),r=await s();a.seasonalCalendar=Wn(r.map(i=>({code:i.code,name:i.name,category:"",monthlyQuantity:i.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:t}=await I(async()=>{const{fetchVisitPriorities:s}=await Promise.resolve().then(()=>O);return{fetchVisitPriorities:s}},void 0),n=await t();if(n.length>0)a.visitPlanner={candidates:n.map(s=>({code:s.customer_code,name:s.customer_name,phone:s.phone,address:s.address,areaCode:s.area_code,businessType:s.business_type,priorityScore:s.priority_score,reasons:s.reasons,lastOrderDate:s.last_order_date,daysSinceOrder:s.days_since_order,annualRevenue:s.annual_revenue,recommendedAction:s.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=Xn(n.map(s=>({code:s.customer_code,name:s.customer_name,phone:s.phone,address1:s.address,areaCode:s.area_code,businessType:s.business_type,annualRevenue:s.annual_revenue,lastOrderDate:s.last_order_date,hasSeasonalProposal:s.reasons.some(r=>r.includes("季節"))})));else{const{supabaseQueryAll:s}=await I(async()=>{const{supabaseQueryAll:u}=await Promise.resolve().then(()=>te);return{supabaseQueryAll:u}},void 0),[r,i]=await Promise.all([s("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):Ha().then(u=>u.customers)]),c=a.masterStats?.customers??i,p=new Map;r.forEach(u=>{const h=u.legacy_customer_code||"",f=u.sales_date||"",g=Number(u.total_amount)||0,$=p.get(h);!$||f>$.lastDate?p.set(h,{lastDate:f,total:($?.total??0)+g}):$.total+=g}),a.visitPlanner=Xn(c.filter(u=>u.isActive).map(u=>({code:u.code,name:u.name,phone:u.phone,address1:u.address1,areaCode:u.areaCode,businessType:u.businessType,annualRevenue:p.get(u.code)?.total??0,lastOrderDate:p.get(u.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:n,fetchProductionPlan:s,fetchLabelExclusions:r}=await I(async()=>{const{fetchDemandAnalysis:c,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:h}=await Promise.resolve().then(()=>O);return{fetchDemandAnalysis:c,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:h}},void 0);if(!a.demandAnalysis){const[c,p]=await Promise.all([t(a.demandYearsBack*12).catch(u=>(console.error("fetchDemandAnalysis failed:",u),null)),n().catch(u=>(console.error("fetchSafetyStockParams failed:",u),[]))]);c&&(a.demandAnalysis=c),a.safetyStockParams=p}if(a.productionPlan.length===0){const c=await s(a.demandPlanYearMonth).catch(()=>[]);c.length>0?a.productionPlan=c:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=buildPlanFromAnalysis(a.demandPlanYearMonth))}const i=await r(a.demandPlanYearMonth).catch(()=>[]);if(a.calendarLabelExcluded=new Set(i),a.productionPlan.length>0){const c=a.productionPlan.filter(p=>!a.calendarLabelExcluded.has(p.productCode));Ie(a.calendarShifts,c,a.calendarCapacity)}break}case"/procurement":case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:n,fetchBrewingSchedule:s,fetchBrewingProductDetail:r,fetchBrewingCustomCategories:i,fetchBrewingCategoryOverrides:c,fetchAllBrewingStockEntries:p,fetchCategoryTypeLinks:u,fetchAvailableProductionTypes:h,fetchBrewingAlcoholSettings:f,fetchBrewingYearlyShipments:g,fetchBrewingSeasonalPattern:$,fetchBrewingForecastOverrides:A,fetchBrewingRiceParams:_,fetchRiceVarieties:D,fetchRicePurchaseCommitments:P,fetchProcurementDecisions:L}=await I(async()=>{const{fetchBrewingPlanSummary:X,fetchBrewingMonthlyTrend:W,fetchBrewingSchedule:H,fetchBrewingProductDetail:G,fetchBrewingCustomCategories:Z,fetchBrewingCategoryOverrides:oe,fetchAllBrewingStockEntries:J,fetchCategoryTypeLinks:U,fetchAvailableProductionTypes:K,fetchBrewingAlcoholSettings:ae,fetchBrewingYearlyShipments:ge,fetchBrewingSeasonalPattern:pe,fetchBrewingForecastOverrides:xe,fetchBrewingRiceParams:Oe,fetchRiceVarieties:pa,fetchRicePurchaseCommitments:Dt,fetchProcurementDecisions:Oo}=await Promise.resolve().then(()=>O);return{fetchBrewingPlanSummary:X,fetchBrewingMonthlyTrend:W,fetchBrewingSchedule:H,fetchBrewingProductDetail:G,fetchBrewingCustomCategories:Z,fetchBrewingCategoryOverrides:oe,fetchAllBrewingStockEntries:J,fetchCategoryTypeLinks:U,fetchAvailableProductionTypes:K,fetchBrewingAlcoholSettings:ae,fetchBrewingYearlyShipments:ge,fetchBrewingSeasonalPattern:pe,fetchBrewingForecastOverrides:xe,fetchBrewingRiceParams:Oe,fetchRiceVarieties:pa,fetchRicePurchaseCommitments:Dt,fetchProcurementDecisions:Oo}},void 0),S=a.brewingPlanFY,o=`${S}-10-01`,l=`${S+1}-09-30`,[d,m,y,w,v,x,k,C,q,M,j,N,z,B,R,Y,Q]=await Promise.all([t(o,l).catch(()=>[]),n(o,l).catch(()=>[]),s(S).catch(()=>[]),r(o,l).catch(()=>[]),i().catch(()=>[]),c().catch(()=>({})),p().catch(()=>[]),u().catch(()=>({})),h().catch(()=>[]),f().catch(()=>({})),g().catch(()=>[]),$().catch(()=>[]),A().catch(()=>({})),_().catch(()=>({})),D().catch(()=>[]),P(S).catch(()=>[]),L(S).catch(()=>({}))]);a.brewingPlanData=d,a.brewingMonthlyTrend=m,a.brewingSchedule=y,a.brewingProductDetail=w,a.brewingCustomCategories=v,a.brewingOverrides=x,a.brewingStockEntries=k,a.brewingTypeLinks=C,a.brewingAvailableTypes=q,a.brewingYearlyShipments=j,a.brewingSeasonalPattern=N,a.brewingForecastOverrides=z,a.brewingRiceParams=B,a.riceVarieties=R,a.ricePurchaseCommitments=Y,a.procurementDecisions=Q,a.brewingAlcoholSettings=M;break}case"/brewing-process":{const{fetchBrewingBatches:t,fetchBrewingProcessSteps:n,fetchBrewingCustomCategories:s,fetchBrewingSchedule:r,fetchWorkerSettings:i,fetchStepLabor:c,fetchBrewingRiceParams:p,fetchTanks:u}=await I(async()=>{const{fetchBrewingBatches:L,fetchBrewingProcessSteps:S,fetchBrewingCustomCategories:o,fetchBrewingSchedule:l,fetchWorkerSettings:d,fetchStepLabor:m,fetchBrewingRiceParams:y,fetchTanks:w}=await Promise.resolve().then(()=>O);return{fetchBrewingBatches:L,fetchBrewingProcessSteps:S,fetchBrewingCustomCategories:o,fetchBrewingSchedule:l,fetchWorkerSettings:d,fetchStepLabor:m,fetchBrewingRiceParams:y,fetchTanks:w}},void 0),h=a.brewingPlanFY,[f,g,$,A,_,D,P]=await Promise.all([t(h).catch(()=>[]),s().catch(()=>[]),r(h).catch(()=>[]),i().catch(()=>({workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1})),c().catch(()=>[]),p().catch(()=>({})),u().catch(()=>[])]);a.brewingBatches=f,a.brewingSchedule=$,a.bpWorkerSettings=A,a.bpStepLabor=_,a.brewingRiceParams=D,a.bpTanks=P,f.length>0?a.brewingProcessSteps=await n(f.map(L=>L.id)).catch(()=>[]):a.brewingProcessSteps=[],a.brewingCustomCategories=g;break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await Ls());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Cs());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await Ds());break;case"/materials":a.materialList.length===0&&(a.materialList=await qs());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Ts(),Is()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([Ns(),Ms()]));break;case"/tax":(!a.taxDeclaration||!a.taxVolume)&&([a.taxDeclaration,a.taxVolume]=await Promise.all([tn(a.taxYear,a.taxMonth),an(a.taxYear,a.taxMonth)]));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([nn(a.storeSalesDate),Bs()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await I(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>O);return{fetchMailSenders:n}},void 0);if(a.mailSenders=await t(),!a.emailSenderId||!a.mailSenders.find(n=>n.id===a.emailSenderId)){const n=a.mailSenders.find(s=>s.isDefault)??a.mailSenders[0];n&&(a.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await I(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>O);return{fetchCalendarEvents:n}},void 0);a.calendarEvents=await t(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await I(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>O);return{fetchIntegrationSettings:n}},void 0);a.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchShopifyOrders:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>O);return{fetchShopifyOrders:s,fetchIntegrationSettings:r}},void 0);a.shopifyOrders=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchFaxInbox:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>O);return{fetchFaxInbox:s,fetchIntegrationSettings:r}},void 0);a.faxRecords=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/ledger":a.customerLedger=await Qa(a.ledgerCustomerCode);break;case"/setup":[a.syncDashboard,a.systemHealth]=await Promise.all([hs(),gs()]);break;case"/raw-browser":a.rawTableList.length===0&&(a.rawTableList=await Hs());break;case"/users":{const{fetchUserProfiles:t}=await I(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>O);return{fetchUserProfiles:n}},void 0);a.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:s}=await I(async()=>{const{fetchMyProfile:i,fetchAuditLogs:c,fetchMailSenders:p}=await Promise.resolve().then(()=>O);return{fetchMyProfile:i,fetchAuditLogs:c,fetchMailSenders:p}},void 0),r=a.user?.email??a.myProfile?.email??"";r&&(a.myProfile=await t(r)),a.mailSenders.length===0&&(a.mailSenders=await s()),a.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await I(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>O);return{fetchAuditLogs:n}},void 0);a.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await I(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>O);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:n}=await I(async()=>{const{fetchMapCustomers:i,fetchDeliveryLocations:c}=await Promise.resolve().then(()=>O);return{fetchMapCustomers:i,fetchDeliveryLocations:c}},void 0),[s,r]=await Promise.all([t(),n()]);a.mapCustomers=s,a.deliveryLocations=r,a.mapLoaded=!0}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchCallLogs:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>O);return{fetchCallLogs:s,fetchIntegrationSettings:r}},void 0);a.callLogs=await t(100),a.integrations.length===0&&(a.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchLeadLists:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>O);return{fetchLeadLists:s,fetchIntegrationSettings:r}},void 0);a.leadLists=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await I(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>O);return{fetchWorkflowOrdersFromDb:n}},void 0);a.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await I(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>O);return{fetchTourInquiriesFromDb:n}},void 0);a.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:s}=await I(async()=>{const{fetchSlackRules:r,fetchSlackLogs:i,fetchIntegrationSettings:c}=await Promise.resolve().then(()=>O);return{fetchSlackRules:r,fetchSlackLogs:i,fetchIntegrationSettings:c}},void 0);a.slackRules=await t(),a.slackLogs=await n(50),a.integrations.length===0&&(a.integrations=await s())}break;case"/changelog":a.featureStatuses||(a.featureStatuses=await aa());break;case"/":a.featureStatuses||(a.featureStatuses=await aa());break;default:break}}catch(t){console.error("Route data load error:",e,t),F(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{a.actionLoading=!1,E()}}function ss(){if(fn())return jc(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return qt("sales");case"/cat/brewery":return qt("brewery");case"/cat/purchase":return qt("purchase");case"/cat/more":return qt("more");case"/invoice-entry":return uc(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/quote":return a.quoteEditId===null?vc(a.quoteList,a.quoteListLoading):lo(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return wc(a.quoteCompanySettings);case"/email":return lc(Wu());case"/delivery":return a.deliveryNote?rc(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return yu(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate);case"/billing":return a.billingSummary?zl(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?_d(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Ac(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return Lc(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);case"/customer-analysis":return a.customerAnalysis?yd(a.customerAnalysis,a.productABC,a.analysisTab,a.analysisPeriod):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return Zl(a.demandForecast);case"/demand":return kp(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return Ip(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/procurement":{const e={};if(a.brewingYearlyShipments.length>0){const t=new Date,n=t.getMonth()+1,s=n>=10?t.getFullYear():t.getFullYear()-1,r=[...new Set(a.brewingYearlyShipments.map(u=>u.fy))].filter(u=>u<s).sort(),i=new Map;for(const u of a.brewingSeasonalPattern)i.has(u.brewCategory)||i.set(u.brewCategory,new Map),i.get(u.brewCategory).set(u.monthNum,u.avgMonthlyL);const c=[];for(let u=n;u<=9;u++)c.push(u);if(n>=10)for(let u=1;u<=9;u++)c.push(u);const p=new Map;for(const u of a.brewingYearlyShipments)p.has(u.brewCategory)||p.set(u.brewCategory,new Map),p.get(u.brewCategory).set(u.fy,{shipL:u.shipmentL,annualL:u.annualizedL});for(const[u,h]of p){const f=r.filter(m=>h.has(m)).map(m=>h.get(m).shipL);let g=0;if(f.length>=2){const m=[];for(let y=1;y<f.length;y++)f[y-1]>0&&m.push((f[y]-f[y-1])/f[y-1]);g=m.length>0?m.reduce((y,w)=>y+w,0)/m.length:0}const $=u in a.brewingForecastOverrides?a.brewingForecastOverrides[u]:g,A=f.length>0?f[f.length-1]:h.get(s)?.annualL??0,_=i.get(u)??new Map,D=c.reduce((m,y)=>m+(_.get(y)??0),0),P=a.brewingStockEntries.filter(m=>m.brewCategory===u).reduce((m,y)=>m+y.volumeL,0),L=a.brewingAlcoholSettings[u],S=L&&L.targetAlcoholPct>0?L.rawAlcoholPct/L.targetAlcoholPct:1,o=Math.round(P*S),l=Math.max(0,o-Math.round(D)),d=Math.round(A*(1+$));e[u]=Math.max(0,d-l)}}return Rp(e,a.brewingRiceParams,a.brewingCustomCategories,a.brewingSchedule,a.brewingPlanFY,a.riceVarieties,a.ricePurchaseCommitments,a.procurementDecisions)}case"/churn-alert":return a.churnAlert?tu(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?ru(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?xu(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/brewing-process":{const e=[...new Set(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール",...a.brewingCustomCategories.map(t=>t.name)])];return Wp(a.brewingBatches,a.brewingProcessSteps,e,{expandedBatchId:a.bpExpandedBatchId,showNewForm:a.bpShowNewForm,schedule:a.brewingSchedule.map(t=>({brewCategory:t.brewCategory,fy:t.fy,brewMonth:t.brewMonth,durationMonths:t.durationMonths,plannedVolumeL:t.plannedVolumeL})),fy:a.brewingPlanFY,workerSettings:a.bpWorkerSettings,stepLabor:a.bpStepLabor,tanks:a.bpTanks.map(t=>({id:t.id,tankNo:t.tankNo,capacityL:t.capacityL,tankType:t.tankType,preferredCategories:t.preferredCategories,cleanupDays:t.cleanupDays}))})}case"/jikomi":return a.jikomiView==="calendar"?`${Tn(a.jikomiList,a.jikomiView)}${Rc(a.jikomiList)}`:Tn(a.jikomiList,a.jikomiView);case"/tanks":return Su(a.tankList);case"/kentei":return Oc(a.kenteiList);case"/materials":return Xc(a.materialList)+Gc(a.materialEditing,a.materialEditingIsNew);case"/purchase":return nd(a.purchaseList,a.payableList);case"/raw-material":return sd(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Pu(a.taxDeclaration,a.taxYear,a.taxMonth,a.taxVolume??[]):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return Ed(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?ld(a.pipelineMeta,ve,ce,a.syncDashboard,a.systemHealth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return yp(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return Ld(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return cp(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return Dd(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapLoaded?a.mapCustomers.length===0?`<section class="page-head"><div><p class="eyebrow">取引先マップ</p><h1>取引先マップ</h1></div></section>
          <section class="panel">
            <div style="padding:32px;text-align:center;color:var(--text-secondary)">
              <p style="font-size:1.5rem;margin-bottom:8px">📍</p>
              <p style="font-weight:600;margin-bottom:4px">緯度・経度データがありません</p>
              <p style="font-size:0.875rem">得意先マスタにジオコーディングが必要です。<br>relay フォルダの <code>geocode_customers.py</code> を実行してください。</p>
            </div>
          </section>`:qd(a.mapCustomers,a.deliveryLocations,a.mapFilters):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>';case"/workflow":return Nd(a.workflowOrders);case"/mobile-order":return Md(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return Od(a.tourInquiries,a.tourActiveId);case"/mail-senders":return zd(a.mailSenders,a.mailSenderEditingId);case"/calendar":return Fd(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return Ud(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return Yd(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Jd(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/changelog":{const e=a.myProfile?.name??a.myProfile?.email??"不明";return a.featureStatuses!==null?Au(a.featureStatuses,e):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">読み込み中…</p></div></section>'}case"/users":return Kd(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return Hd(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return Qd(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return Wd(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return ep(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return tp(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return np(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.salesAnalytics)return"";switch(a.route){case"/sales":return kd(Io(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/payment":return td([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return Wc(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return Dc(a.invoiceRecords,a.invoiceFilter,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/ledger":return Jl(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return fo(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return em();default:return ac(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function Zu(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(r=>!a.dismissedAnnouncements.has(r.id)).map(r=>{const i=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${i.bg};border-bottom:2px solid ${i.border};">
        <span class="announcement-text">${i.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),s=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+s}function em(){const e=a.featureStatuses??{};function t(s,r,i,c){const p=`${"/".replace(/\/$/,"")||"/"}${s}`,u=Eu(s,e);return`<a href="${p}" data-link="${s}" class="home-card">
      <span class="home-card-icon">${r}</span>
      <span class="home-card-label">${i}${u?' <span class="badge-new">NEW</span>':""}</span>
      <span class="home-card-desc">${c}</span>
    </a>`}const n=[{title:"販売業務",color:"#1a56db",cards:[t("/invoice-entry","📝","伝票入力","売上・返品を入力"),t("/quote","📄","見積作成","見積書の作成・管理"),t("/invoice","🔍","伝票照会","過去伝票の照会"),t("/delivery","🚚","納品書","納品書の発行"),t("/billing","💳","月次請求","請求書・入金管理"),t("/ledger","📒","得意先台帳","取引履歴の確認")].join("")},{title:"分析・レポート",color:"#7e3af2",cards:[t("/analytics","📊","売上分析","期間・商品・得意先別"),t("/customer-analysis","👥","ABC分析","得意先・商品 ABC分析"),t("/customer-efficiency","⚡","営業効率","訪問効率・コスト"),t("/report","📈","集計帳票","各種集計帳票"),t("/sales","📋","売上一覧","売上明細一覧")].join("")},{title:"営業・顧客管理",color:"#0e9f6e",cards:[t("/churn-alert","🎯","営業アクション","離反リスク・フォロー"),t("/visit-planner","📅","訪問計画","訪問スケジュール"),t("/shipment-calendar","🚚","配送カレンダー","伝票日付で配送を確認"),t("/map","🗺️","取引先マップ","地図で取引先を確認"),t("/prospects","🌱","新規営業","新規開拓の進捗"),t("/email","✉️","メール配信","一斉メール配信"),t("/seasonal-calendar","🌸","季節提案","季節別提案管理")].join("")},{title:"受注・仕入",color:"#e3a008",cards:[t("/workflow","🔄","受注ワークフロー","受注から出荷まで"),t("/shopify","🛒","Shopify注文","EC受注の確認"),t("/purchase","📥","仕入・買掛","仕入管理・買掛金"),t("/payment","💰","入金状況","入金・回収状況")].join("")},{title:"製造管理",color:"#e02424",cards:[t("/jikomi","🍶","仕込管理","仕込帳・製造記録"),t("/tanks","🛢️","タンク管理","タンク在庫の管理"),t("/tax","📋","酒税申告","酒税申告書の作成"),t("/demand","📆","需要・生産計画","需要予測・生産計画"),t("/brewing-plan","🗓️","醸造計画","年間醸造スケジュール"),t("/procurement","🌾","調達計画","原料米の調達・予算"),t("/brewing-process","🍶","醸造工程","バッチ別の醸造工程管理")].join("")},{title:"マスタ・設定",color:"#6b7280",cards:[t("/master","⚙️","マスタ管理","商品・得意先マスタ"),t("/store","🏪","店舗・直売所","直売所の販売管理"),t("/tour","🏯","酒蔵見学","見学予約の管理"),t("/setup","🔗","連動設定","酒仙iとの連動"),t("/import","📤","データ取込","CSVデータ取込"),t("/users","👤","ユーザー管理","アカウント管理"),t("/changelog","✅","機能一覧・更新履歴","動作確認チェック・バージョン管理")].join("")}];return`
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
  `}function tm(){if(fn())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${ss()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/procurement":"調達計画","/brewing-process":"醸造工程","/changelog":"機能一覧・更新履歴","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",s=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?dc(a.masterStats.customers,a.pickerQuery):ad(a.masterStats.products,a.pickerQuery):"",r=a.globalSearchOpen?cc(a.globalQuery,Gu()):"",i=a.user?`<span class="app-header-user">${a.user.email}</span>
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
          ${i}
        </div>
      </header>
      ${Zu()}
      <main class="main-v2">
        <div class="view ${a.actionLoading?"is-busy":""}">${ss()}</div>
        <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
      </main>
      ${s}
      ${r}
    </div>
  `}async function am(){a.actionLoading=!0,E();try{const{fetchSalesSummary:e}=await I(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>O);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,E()}}async function nm(e){a.actionLoading=!0,E();try{a.invoiceRecords=await kt(e)}finally{a.actionLoading=!1,E()}}async function Aa(e){a.actionLoading=!0,E();try{a.customerLedger=await Qa(e)}finally{a.actionLoading=!1,E()}}function Ne(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,n)=>{const s=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:s,unitPrice:r,amount:s*r}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function We(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function sm(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,E()}),e.querySelectorAll("[data-action='global-search-close']").forEach(o=>{o.addEventListener("click",l=>{o.classList.contains("global-search")&&l.target instanceof HTMLElement&&!l.target.classList.contains("global-search")||(Pt(),E())})}),e.querySelector("#global-search-input")?.addEventListener("input",o=>{a.globalQuery=o.target.value,E()}),e.querySelectorAll("[data-action='global-nav']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.path;l&&(Pt(),Xt(l))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{Xu()}),e.querySelectorAll("[data-jikomi-tab]").forEach(o=>{o.addEventListener("click",()=>{a.jikomiView=o.dataset.jikomiTab,E()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const o=e.querySelector("#auth-email")?.value.trim()??"",l=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,E(),Vo(o,l).then(async d=>{a.user=d,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:y}=await I(async()=>{const{fetchMyProfile:w,recordAudit:v}=await Promise.resolve().then(()=>O);return{fetchMyProfile:w,recordAudit:v}},void 0);a.myProfile=await m(d.email),await y({action:"sign_in",userEmail:d.email}),E()}).catch(async d=>{try{const m=await bn(o,l);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:y}=await I(async()=>{const{fetchMyProfile:w}=await Promise.resolve().then(()=>O);return{fetchMyProfile:w}},void 0);a.myProfile=await y(m.email)}catch{a.authError=d instanceof Error?d.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,E()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,E()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{Uo().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,E()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(o=>{o.addEventListener("click",()=>{a.sidebarOpen=!1,E()})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let o=0;t.addEventListener("touchstart",l=>{o=l.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",l=>{l.changedTouches[0].clientX-o<-60&&(a.sidebarOpen=!1,E())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id??"";a.dismissedAnnouncements.add(l),E()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='share-page']")?.addEventListener("click",async()=>{const o=window.location.href,l=document.title;if(navigator.share)try{await navigator.share({url:o,title:l})}catch{}else try{await navigator.clipboard.writeText(o),F("URLをコピーしました","success")}catch{F("コピーに失敗しました","error")}}),e.querySelectorAll("[data-link]").forEach(o=>{o.addEventListener("click",l=>{l.preventDefault(),Xt(o.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async o=>{o.preventDefault();const l=e.querySelector("#fr-title")?.value??"",d=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",y=e.querySelector("#fr-result");if(!l.trim())return;const w=await $s(l,d,m);if(y&&(y.textContent=w?"送信しました":"送信に失敗しました",y.className=`fr-result ${w?"success":"error"}`),w){const v=e.querySelector("#feature-request-form");v&&v.reset()}}),e.querySelectorAll("[data-period]").forEach(o=>{o.addEventListener("click",()=>{a.salesPeriod=o.dataset.period,E()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const o=e.querySelector("#range-start")?.value??"",l=e.querySelector("#range-end")?.value??"";o&&l&&(a.customRange={start:o,end:l},a.salesPeriod="custom",E())}),e.querySelectorAll("[data-edit-customer]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.editCustomer??"",d=a.masterStats?.customers.find(y=>y.id===l);if(!d)return;const m=document.createElement("div");m.innerHTML=zc(d),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async y=>{y.preventDefault();const w=document.getElementById("edit-result"),v=document.getElementById("ec-trade-type")?.value||null,x=await _s(l,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,trade_type:v,manual_override:!0});w&&(w.textContent=x?"保存しました":"保存に失敗",w.className=`fr-result ${x?"success":"error"}`),x&&(document.getElementById("edit-modal")?.remove(),it())})})}),e.querySelectorAll("[data-edit-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.editProduct??"",d=a.masterStats?.products.find(y=>y.id===l);if(!d)return;const m=document.createElement("div");m.innerHTML=Fc(d),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async y=>{y.preventDefault();const w=document.getElementById("edit-result"),v=await Ss(l,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});w&&(w.textContent=v?"保存しました":"保存に失敗",w.className=`fr-result ${v?"success":"error"}`),v&&(document.getElementById("edit-modal")?.remove(),it())})})}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=na(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,E()}),e.querySelectorAll("[data-open-quote]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.openQuote,d=await Ws(l);if(!d){F("見積の読み込みに失敗しました","error");return}a.quoteState={id:d.id,quoteNo:d.quote_no,quoteDate:d.quote_date,validUntil:d.valid_until??"",customerCode:d.legacy_customer_code??"",customerName:d.customer_name,customerAddress:d.customer_address,subject:d.subject,lines:d.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:d.remarks,taxRate:d.tax_rate,deliveryDate:d.delivery_date,paymentTerms:d.payment_terms,deliveryPlace:d.delivery_place,templateType:d.template_type??"sake",previewMode:!1},a.quoteEditId=l,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,E()})}),e.querySelectorAll("[data-delete-quote]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.deleteQuote,d=o.dataset.quoteNo??l;if(!await Ee(`見積 ${d} を削除しますか？`))return;await rs("quotes",l)?(a.quoteList=a.quoteList.filter(w=>w.id!==l),F("削除しました","success"),E()):F("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,E(),ln().then(o=>{a.quoteList=o,a.quoteListLoading=!1,E()})}),e.querySelectorAll("[name='q-template']").forEach(o=>{o.addEventListener("change",()=>{a.quoteState.templateType=o.value,E()})});function n(o){return(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function s(o){return o.length?o.map(l=>`<button class="search-item" type="button" data-select-customer="${n(l.code)}" data-cust-name="${n(l.name)}" data-cust-addr="${n(l.address1||"")}"><span class="mono">${n(l.code)}</span><span style="font-size:13px;font-weight:600;">${n(l.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function r(o){o.querySelectorAll("[data-select-customer]").forEach(l=>{l.addEventListener("click",async()=>{const d=l.dataset.selectCustomer??"";a.quoteState.customerCode=d,a.quoteState.customerName=l.dataset.custName??"",a.quoteState.customerAddress=l.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),o.remove(),a.quotePricing=await qa(a.masterStats?.customers??[],d),E()})})}function i(o){const l=e.querySelector("#q-cust-search")?.closest(".form-row");if(!l)return;let d=document.getElementById("cust-search-results");d||(d=document.createElement("div"),d.id="cust-search-results",d.className="search-results",l.after(d));const m=a.masterStats?.customers??[],y=o.trim().toLowerCase(),w=y.length===0?m:m.filter(v=>v.name.includes(o)||v.kanaName.includes(o)||v.code.includes(o)||v.name.toLowerCase().includes(y)||v.kanaName.toLowerCase().includes(y));d.innerHTML=s(w),r(d)}function c(o,l){return o.length?o.map(d=>{const m=l?Za(d,l):{price:d.salePrice||0,label:"卸価格"},y=d.listPrice||0,w=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${n(d.code)}" data-prod-name="${n(d.name)}" data-prod-price="${m.price}" data-prod-retail="${y}" data-prod-jan="${n(d.janCode??"")}" data-prod-unit="${n(d.unit)}" data-prod-case="${d.caseQty??""}"><span class="mono">${n(d.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${n(d.name)}</span><span class="numeric"${w?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${n(m.label)})</small>${y?`　定価 ¥${y.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function p(o){o.querySelectorAll("[data-add-product]").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.addProduct??"",m=l.dataset.prodName??"",y=parseInt(l.dataset.prodPrice??"0"),w=parseInt(l.dataset.prodRetail??"0")||null,v=l.dataset.prodJan??"",x=l.dataset.prodUnit||"本",k=l.dataset.prodCase??"",C=k?parseInt(k):null;a.quoteState.lines.push({productCode:d,productName:m,janCode:v,caseQty:C,quantity:1,unit:x,unitPrice:y,retailPrice:w,amount:y}),a.quoteProductQuery="";const q=e.querySelector("#q-prod-search");q&&(q.value=""),E()})})}function u(o){const l=e.querySelector("#q-prod-search")?.closest(".form-row");if(!l)return;let d=document.getElementById("prod-search-results");if(d||(d=document.createElement("div"),d.id="prod-search-results",d.className="search-results",l.after(d)),!a.masterStats){d.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,y=o.trim().toLowerCase(),w=y.length===0?m:m.filter(v=>v.name.includes(o)||v.kanaName.includes(o)||v.code.includes(o)||v.name.toLowerCase().includes(y)||v.kanaName.toLowerCase().includes(y));d.innerHTML=c(w,a.quotePricing),p(d)}function h(o,l){let d=null;function m(){d||(d=y=>{const w=document.getElementById(l);if(!w){document.removeEventListener("touchstart",d),document.removeEventListener("mousedown",d),d=null;return}o.contains(y.target)||w.contains(y.target)||(w.remove(),document.removeEventListener("touchstart",d),document.removeEventListener("mousedown",d),d=null)},document.addEventListener("touchstart",d,{passive:!0}),document.addEventListener("mousedown",d))}return m}(function(){const o=e.querySelector("#q-cust-search");if(!o)return;const l=h(o,"cust-search-results");o.addEventListener("focus",()=>{i(o.value),l()}),o.addEventListener("compositionend",()=>{a.quoteCustomerQuery=o.value,i(o.value)}),o.addEventListener("input",d=>{d.isComposing||(a.quoteCustomerQuery=o.value,i(o.value))}),o.value&&i(o.value)})(),(function(){const o=e.querySelector("#q-prod-search");if(!o)return;const l=h(o,"prod-search-results");o.addEventListener("focus",()=>{u(o.value),l()}),o.addEventListener("compositionend",()=>{a.quoteProductQuery=o.value,u(o.value)}),o.addEventListener("input",d=>{d.isComposing||(a.quoteProductQuery=o.value,u(o.value))}),o.value&&u(o.value)})(),e.querySelectorAll("[data-select-customer]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.selectCustomer??"";a.quoteState.customerCode=l,a.quoteState.customerName=o.dataset.custName??"",a.quoteState.customerAddress=o.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await qa(a.masterStats?.customers??[],l),E()})}),e.querySelector("#q-price-type")?.addEventListener("change",o=>{const l=o.target.value;a.quoteState.manualPriceType=l,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:l}:a.quotePricing={priceType:l,priceGroup:"",individualPrices:new Map},E()}),e.querySelectorAll("[data-add-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.addProduct??"",d=o.dataset.prodName??"",m=parseInt(o.dataset.prodPrice??"0"),y=parseInt(o.dataset.prodRetail??"0")||null,w=o.dataset.prodJan??"",v=o.dataset.prodUnit||"本",x=o.dataset.prodCase??"",k=x?parseInt(x):null;a.quoteState.lines.push({productCode:l,productName:d,janCode:w,caseQty:k,quantity:1,unit:v,unitPrice:m,retailPrice:y,amount:m}),a.quoteProductQuery="",E()})}),(()=>{const o=e.querySelector("#q-prospect-search");if(!o)return;const l=h(o,"q-prospect-results");function d(m){let y=document.getElementById("q-prospect-results");if(!y)return;const w=m.trim(),v=w.length===0?a.prospects.slice(0,8):a.prospects.filter(x=>x.companyName.includes(w)||(x.contactName??"").includes(w)).slice(0,8);if(v.length===0){y.innerHTML="";return}y.className="search-results",y.innerHTML=v.map(x=>`<button class="search-item" type="button" data-select-prospect="${x.id}" data-prospect-name="${n(x.companyName)}" data-prospect-addr="${n(x.address??"")}"><span style="font-size:13px;font-weight:600;">${n(x.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${n(x.contactName??"")} ${x.address?"· "+x.address.slice(0,20):""}</span></button>`).join(""),y.querySelectorAll("[data-select-prospect]").forEach(x=>{x.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=x.dataset.prospectName??"",a.quoteState.customerAddress=x.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=x.dataset.selectProspect??"";const k=a.quoteState.manualPriceType??"";a.quotePricing={priceType:k,priceGroup:"",individualPrices:new Map},o.value="",y&&(y.innerHTML=""),E()})})}o.addEventListener("focus",()=>{d(o.value),l()}),o.addEventListener("input",m=>{m.isComposing||d(o.value)}),o.addEventListener("compositionend",()=>d(o.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const o=e.querySelector("#q-prospect-search")?.value.trim()??"",l=document.createElement("div");l.className="modal-backdrop",l.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",l.innerHTML=`
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
    `,document.body.appendChild(l),l.querySelector("#pq-company")?.focus();const d=()=>l.remove();l.addEventListener("click",m=>{m.target===l&&d()}),l.querySelector("#prospect-quick-close")?.addEventListener("click",d),l.querySelector("#prospect-quick-close2")?.addEventListener("click",d),l.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const m=(l.querySelector("#pq-company")?.value??"").trim();if(!m){F("会社名は必須です","warning");return}const y={id:crypto.randomUUID(),companyName:m,contactName:l.querySelector("#pq-contact")?.value.trim()||void 0,address:l.querySelector("#pq-address")?.value.trim()||void 0,phone:l.querySelector("#pq-phone")?.value.trim()||void 0,note:l.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:w,fetchProspects:v}=await I(async()=>{const{saveProspect:C,fetchProspects:q}=await Promise.resolve().then(()=>O);return{saveProspect:C,fetchProspects:q}},void 0),x=await w(y);if(!x){F("登録失敗","error");return}a.prospects=await v(),a.quoteState.customerCode="",a.quoteState.customerName=x.companyName,a.quoteState.customerAddress=x.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=x.id;const k=a.quoteState.manualPriceType??"";a.quotePricing={priceType:k,priceGroup:"",individualPrices:new Map},d(),F(`${x.companyName} を見込み顧客として登録しました`,"success"),E()})});function f(){Mt(a.quoteState);const o=e.querySelector("#q-preview-scaler");if(!o)return;o.innerHTML=lo(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const l=o.querySelector(".q-preview-doc"),d=o.parentElement?.clientWidth??0,m=l?.offsetWidth??0;if(d>0&&m>0&&m>d-24){const y=(d-24)/m;o.style.transform=`scale(${y})`,o.style.transformOrigin="top left",o.style.height=`${((l?.offsetHeight??0)+48)*y}px`}else o.style.transform="",o.style.height=""}for(const o of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${o}`)?.addEventListener("input",f);e.querySelector("#q-remarks")?.addEventListener("input",f),e.querySelectorAll(".qty-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.quantity=parseFloat(o.value)||0,d.amount=d.quantity*d.unitPrice,f())})}),e.querySelectorAll(".price-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.unitPrice=parseInt(o.value)||0,d.amount=d.quantity*d.unitPrice,f())})}),e.querySelectorAll(".jan-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.janCode=o.value,f())})}),e.querySelectorAll(".case-qty-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.caseQty=o.value?parseInt(o.value):null,f())})}),e.querySelectorAll(".retail-price-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.retailPrice=o.value?parseInt(o.value):null,f())})}),e.querySelectorAll("[data-remove-line]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.removeLine??"0");a.quoteState.lines.splice(l,1),E()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{Mt(a.quoteState),a.quoteState.previewMode=!0,E()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,E()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="生成中…",a.quoteState.previewMode||Mt(a.quoteState);try{await Sc(a.quoteState,a.quoteCompanySettings)}finally{l.disabled=!1,l.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{Mt(a.quoteState);const o=a.quoteState,l=o.lines.reduce((x,k)=>x+k.amount,0),d=Math.round(l*o.taxRate/100),m=l+d;if(!o.quoteNo)try{const{supabaseRpc:x}=await I(async()=>{const{supabaseRpc:C}=await Promise.resolve().then(()=>te);return{supabaseRpc:C}},void 0),k=await x("generate_quote_no",{});o.quoteNo=k??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{o.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const y=new Date().toISOString().slice(0,10),w=o.templateType==="sake"||o.templateType==="standard"?o.templateType:"sake",v={quote_no:o.quoteNo,quote_date:o.quoteDate||y,valid_until:o.validUntil||null,legacy_customer_code:o.customerCode||null,customer_name:o.customerName||"",customer_address:o.customerAddress||"",subject:o.subject||"",template_type:w,subtotal:l,tax_amount:d,total_amount:m,tax_rate:o.taxRate||10,remarks:o.remarks||"",delivery_date:o.deliveryDate||"",payment_terms:o.paymentTerms||"",delivery_place:o.deliveryPlace||"",updated_at:new Date().toISOString()};try{let x=o.id;if(o.id){const k=await fetch(`${ve}/rest/v1/quotes?id=eq.${encodeURIComponent(o.id)}`,{method:"PATCH",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(v)});if(!k.ok){const C=await k.text();throw new Error(`quotes更新失敗 ${k.status}: ${C}`)}await fetch(`${ve}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(o.id)}`,{method:"DELETE",headers:{apikey:ce,Authorization:`Bearer ${ce}`}})}else{const k=await fetch(`${ve}/rest/v1/quotes`,{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(v)});if(!k.ok){const q=await k.text();throw new Error(`quotes作成失敗 ${k.status}: ${q}`)}const C=await k.json();if(!C?.[0]?.id)throw new Error("IDが返りませんでした");x=C[0].id,o.id=x}if(o.lines.length>0){const k=o.lines.map((q,M)=>({quote_id:x,line_no:M+1,legacy_product_code:q.productCode||null,product_name:q.productName,jan_code:q.janCode||null,case_qty:q.caseQty??null,quantity:q.quantity,unit:q.unit,unit_price:q.unitPrice,retail_price:q.retailPrice??null,amount:q.amount})),C=await fetch(`${ve}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(k)});if(!C.ok){const q=await C.text();throw new Error(`明細保存失敗 ${C.status}: ${q}`)}}F(`見積 ${o.quoteNo} を保存しました`,"success"),E()}catch(x){console.error("[save-quote]",x),F(`保存失敗: ${String(x).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const o=d=>document.getElementById(d)?.value??"",l={...a.quoteCompanySettings,companyName:o("qs-company-name"),companyPostal:o("qs-company-postal"),companyAddress1:o("qs-company-addr1"),companyAddress2:o("qs-company-addr2"),companyTel:o("qs-company-tel"),companyFax:o("qs-company-fax"),companyEmail:o("qs-company-email"),companyRegistrationNo:o("qs-company-regno"),bankName:o("qs-bank-name"),bankBranch:o("qs-bank-branch"),bankAccountType:o("qs-bank-type"),bankAccountNo:o("qs-bank-no"),bankAccountHolder:o("qs-bank-holder"),defaultPaymentTerms:o("qs-payment-terms"),defaultHeaderNote:o("qs-header-note"),defaultFooterNote:o("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};Xe(l),st("quote_company",l),a.quoteCompanySettings=l,F("設定を保存しました","success"),E()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),E()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",o=>{const l=o.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},Xe(a.quoteCompanySettings),E()}),e.querySelector("#qs-seal-file")?.addEventListener("change",o=>{const l=o.target.files?.[0];if(!l)return;const d=new FileReader;d.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:d.result},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),E()},d.readAsDataURL(l)}),e.querySelector("#qs-seal-size")?.addEventListener("input",o=>{const l=parseInt(o.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:l},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),E()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),E()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.month;l&&(a.demandForecast.calendarMonth=l,E())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.segment;a.demandForecast.selectedSegment=l,E()})}),e.querySelectorAll("[data-demand-tab]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.demandTab;if(l){if(a.demandTab=l,l==="calendar"){const d=new Date().toISOString().slice(0,10);d.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=d)}E()}})});function g(o){const l=a.demandAnalysis,d=a.safetyStockParams;if(!l||d.length===0)return[];const[m,y]=o.split("-"),w=`${parseInt(m)-1}-${y}`,v=l.months.filter(x=>x<o).slice(-3);return d.map(x=>{const k=x.productionType==="make_to_order",C=l.matrix[x.productCode]?.[w]??0,q=v.map(B=>l.matrix[x.productCode]?.[B]??0),M=q.length>0?q.reduce((B,R)=>B+R,0)/q.length:x.avgMonthlyDemand,j=k?0:C>0?Math.ceil(C):Math.ceil(M),N=k?0:Math.ceil(x.safetyStockQty),z=Math.max(0,j+N);return{id:"",yearMonth:o,productCode:x.productCode,productName:x.productName,demandForecast:j,safetyStockTarget:N,openingStock:0,requiredProduction:z,plannedQty:k?0:z,actualQty:0,status:"draft",productionType:x.productionType??"monthly",notes:""}})}e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async o=>{const l=parseInt(o.target.value)||3;a.demandYearsBack=l,a.demandAnalysis=null;const{fetchDemandAnalysis:d}=await I(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>O);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await d(l*12),E()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",d=parseInt(o.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==l)return m;const y=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,w=d/30,v=Math.ceil(y*m.demandStdDev*Math.sqrt(w)),x=Math.ceil(m.avgMonthlyDemand*w+v);return{...m,leadTimeDays:d,safetyStockQty:v,reorderPoint:x}}),E()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",d=parseFloat(o.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==l)return m;const y=d>=.99?2.33:d>=.97?1.88:d>=.95?1.65:d>=.9?1.28:1.04,w=m.leadTimeDays/30,v=Math.ceil(y*m.demandStdDev*Math.sqrt(w)),x=Math.ceil(m.avgMonthlyDemand*w+v);return{...m,serviceLevel:d,safetyStockQty:v,reorderPoint:x}}),E()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async o=>{if(a.safetyStockParams.length===0)return;const l=o.currentTarget;l.disabled=!0,l.textContent="保存中…";const{saveSafetyStockParamsBulk:d}=await I(async()=>{const{saveSafetyStockParamsBulk:y}=await Promise.resolve().then(()=>O);return{saveSafetyStockParamsBulk:y}},void 0),m=await d(a.safetyStockParams);l.disabled=!1,l.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{l.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const o=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),l=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(d=>{const m=o>=.99?2.33:o>=.97?1.88:o>=.95?1.65:o>=.9?1.28:1.04,y=l/30,w=Math.ceil(m*d.demandStdDev*Math.sqrt(y)),v=Math.ceil(d.avgMonthlyDemand*y+w);return{...d,serviceLevel:o,leadTimeDays:l,safetyStockQty:w,reorderPoint:v}}),E()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",d=o.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===l?{...m,productionType:d}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async o=>{const l=o.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarShifts=Gt(l,1,0);const{fetchProductionPlan:d}=await I(async()=>{const{fetchProductionPlan:y}=await Promise.resolve().then(()=>O);return{fetchProductionPlan:y}},void 0),m=await d(l);a.productionPlan=m.length>0?m:g(l),Ie(a.calendarShifts,a.productionPlan.filter(y=>!a.calendarLabelExcluded.has(y.productCode)),a.calendarCapacity),E()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(o=>{o.addEventListener("click",()=>{a.demandPlanTypeFilter=o.dataset.filter??"all",E()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.sortCol??"";a.demandSort?.column===l?a.demandSort=a.demandSort.dir==="desc"?{column:l,dir:"asc"}:null:a.demandSort={column:l,dir:"desc"},E()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=g(a.demandPlanYearMonth),E()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",o=>{const l=o.target.files?.[0];if(!l)return;const d=new FileReader;d.onload=async()=>{const{parseCSV:m}=await I(async()=>{const{parseCSV:N}=await Promise.resolve().then(()=>up);return{parseCSV:N}},void 0),{columns:y,rows:w}=m(d.result),v=document.getElementById("csv-import-status"),x=y.find(N=>/商品コード|product_code|code|コード/i.test(N)),k=y.find(N=>/在庫|stock|期首|opening/i.test(N)),C=y.find(N=>/計画|plan|planned|生産/i.test(N));if(!x){v&&(v.style.display="block",v.style.background="rgba(197,61,61,0.1)",v.style.color="#c53d3d",v.textContent=`エラー: 商品コード列が見つかりません。列名: ${y.join(", ")}`);return}let q=0,M=0,j=0;for(const N of w){const z=(N[x]??"").trim();if(!z)continue;const B=a.productionPlan.find(R=>R.productCode===z);if(B){if(q++,k&&N[k]!==void 0&&N[k]!==""){const R=parseFloat(N[k])||0;B.openingStock=R,B.requiredProduction=Math.max(0,B.demandForecast+B.safetyStockTarget-R),B.plannedQty>0&&!C&&(B.plannedQty=B.requiredProduction),M++}C&&N[C]!==void 0&&N[C]!==""&&(B.plannedQty=parseFloat(N[C])||0,j++)}}v&&(v.style.display="block",q===0?(v.style.background="rgba(183,121,31,0.1)",v.style.color="#b7791f",v.textContent=`一致する商品コードが見つかりませんでした（CSV: ${w.length}行）`):(v.style.background="rgba(47,133,90,0.1)",v.style.color="#2f855a",v.textContent=`${q}商品に反映: 在庫${M}件${j>0?` / 計画${j}件`:""} 更新`),setTimeout(()=>{v.style.display="none"},5e3)),E()},d.readAsText(l,"UTF-8"),o.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(d=>{const m=d.dataset.code??"",y=a.productionPlan.find(w=>w.productCode===m);y&&(y.plannedQty=parseFloat(d.value)||0)});const{saveProductionPlan:o}=await I(async()=>{const{saveProductionPlan:d}=await Promise.resolve().then(()=>O);return{saveProductionPlan:d}},void 0);await Promise.all(a.productionPlan.map(d=>o(d)));const{fetchProductionPlan:l}=await I(async()=>{const{fetchProductionPlan:d}=await Promise.resolve().then(()=>O);return{fetchProductionPlan:d}},void 0);a.productionPlan=await l(a.demandPlanYearMonth),E()}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.date??"",d=a.calendarShifts.find(m=>m.date===l);d&&(d.confirmed?a.calendarSelectedDate=a.calendarSelectedDate===l?null:l:d.partTimers>0||d.employees>0?(d.partTimers=0,d.employees=0,Ie(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=l):(d.partTimers=1,d.employees=0,Ie(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=l),E())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="保存中…";const{saveLabelExclusions:d}=await I(async()=>{const{saveLabelExclusions:w}=await Promise.resolve().then(()=>O);return{saveLabelExclusions:w}},void 0),m=[...a.calendarLabelExcluded],y=await d(a.demandPlanYearMonth,m);l.disabled=!1,l.textContent=y?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{l.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",m=document.getElementById("cal-label-list")?.scrollTop??0;o.checked?a.calendarLabelExcluded.delete(l):a.calendarLabelExcluded.add(l);const y=a.productionPlan.filter(w=>!a.calendarLabelExcluded.has(w.productCode));Ie(a.calendarShifts,y,a.calendarCapacity),E(),requestAnimationFrame(()=>{const w=document.getElementById("cal-label-list");w&&(w.scrollTop=m)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.type??"",m=document.getElementById("cal-label-list")?.scrollTop??0,y=a.productionPlan.filter(v=>v.productionType===l);if(o.checked)for(const v of y)a.calendarLabelExcluded.delete(v.productCode);else for(const v of y)a.calendarLabelExcluded.add(v.productCode);const w=a.productionPlan.filter(v=>!a.calendarLabelExcluded.has(v.productCode));Ie(a.calendarShifts,w,a.calendarCapacity),E(),requestAnimationFrame(()=>{const v=document.getElementById("cal-label-list");v&&(v.scrollTop=m)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||dt;a.calendarCapacity.partCapacity=l;const d=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ie(a.calendarShifts,d,a.calendarCapacity),E()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||pt;a.calendarCapacity.empCapacity=l;const d=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ie(a.calendarShifts,d,a.calendarCapacity),E()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.date??"",d=parseInt(o.value)||0,m=a.calendarShifts.find(y=>y.date===l);m&&(m.partTimers=d),E()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.date??"",d=parseInt(o.value)||0,m=a.calendarShifts.find(y=>y.date===l);m&&(m.employees=d),E()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async o=>{const l=o.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarSelectedDate=null,a.calendarShifts=Gt(l,1,0);const{fetchProductionPlan:d,fetchLabelExclusions:m}=await I(async()=>{const{fetchProductionPlan:v,fetchLabelExclusions:x}=await Promise.resolve().then(()=>O);return{fetchProductionPlan:v,fetchLabelExclusions:x}},void 0),[y,w]=await Promise.all([d(l),m(l)]);a.productionPlan=y.length>0?y:g(l),a.calendarLabelExcluded=new Set(w),Ie(a.calendarShifts,a.productionPlan.filter(v=>!a.calendarLabelExcluded.has(v.productCode)),a.calendarCapacity),E()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||0;a.calendarDefaultPart=l;for(const d of a.calendarShifts)if(!d.confirmed){const m=new Date(d.date).getDay()===0||new Date(d.date).getDay()===6;d.partTimers=m?0:l}E()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||0;a.calendarDefaultEmp=l;for(const d of a.calendarShifts)if(!d.confirmed){const m=new Date(d.date).getDay()===0||new Date(d.date).getDay()===6;d.employees=m?0:l}E()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=Gt(a.demandPlanYearMonth,1,0),Ie(a.calendarShifts,a.productionPlan.filter(o=>!a.calendarLabelExcluded.has(o.productCode)),a.calendarCapacity),E()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const o of a.calendarShifts)o.confirmed=!0;E()}),e.querySelectorAll("[data-action='select-month']").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=l,E())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterArea=o.target.value,E())}),e.querySelector("#visit-filter-score")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(o.target.value)||0,E())}),e.querySelector("[data-action='refresh-analytics']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="更新中…";try{const{supabaseRpc:d}=await I(async()=>{const{supabaseRpc:m}=await Promise.resolve().then(()=>te);return{supabaseRpc:m}},void 0);await d("refresh_analytics",{}),a.visitPlanner=null,a.shipmentCalendarData=null,F("分析データを更新しました","success"),E()}catch(d){console.error("[refresh-analytics]",d),F("更新に失敗しました","error"),l.disabled=!1,l.textContent="⟳ データ更新"}}),e.querySelectorAll("[data-sort-col]").forEach(o=>{o.addEventListener("click",l=>{const d=o.dataset.sortCol??"",m=l.shiftKey;a.route==="/product-power"?a.productSortState=ut(a.productSortState,d,m):a.route==="/customer-efficiency"?a.customerSortState=ut(a.customerSortState,d,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=ut(a.dashboardSortState,d,m):a.route==="/master"?a.masterSortState=ut(a.masterSortState,d,m):a.route==="/analytics"&&(a.analyticsSortState=ut(a.analyticsSortState,d,m)),E()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(o=>{o.addEventListener("click",async()=>{const l=parseInt(o.dataset.year??"",10);l&&(a.customerEfficiencyYear=l,a.customerEfficiency=await ot(l,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),E())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async o=>{const l=parseInt(o.target.value,10);l&&(a.customerEfficiencyYear=l,a.customerEfficiency=await ot(l,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),E())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.groupby??"billing";a.customerEfficiencyGroupBy=l,a.customerEfficiency=await ot(a.customerEfficiencyYear,l,a.customerEfficiencyFiscalType),E()})}),e.querySelectorAll("[data-action='efficiency-fiscal-type']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.fiscalType??"jan";a.customerEfficiencyFiscalType=l,a.customerEfficiency=await ot(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,l),E()})}),e.querySelectorAll("[data-product-period]").forEach(o=>{o.addEventListener("click",()=>{a.productPeriod=o.dataset.productPeriod??"year",E()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const o=document.getElementById("pp-range-start")?.value??"",l=document.getElementById("pp-range-end")?.value??"";o&&l&&(a.productCustomStart=o,a.productCustomEnd=l,a.productPeriod="custom",E())}),e.querySelectorAll("[data-product-filter]").forEach(o=>{o.addEventListener("click",()=>{a.productFilter=o.dataset.productFilter??"all",E()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="更新中…",await it(),l.disabled=!1,l.textContent="↻ 更新",F("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const o=e.querySelector("#sales-start")?.value??"",l=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:o,endDate:l},am()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const o={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=o,a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,nm(o)}),e.addEventListener("click",o=>{const l=o.target.closest("tr[data-doc-no]");if(!l)return;const d=l.dataset.docNo??"";if(a.route==="/"){a.invoiceSelectedDocNo=d,a.invoiceSelectedLines=null,navigateTo("/sales"),Ca(d).then(m=>{a.invoiceSelectedDocNo===d&&(a.invoiceSelectedLines=m,E())});return}if(a.invoiceSelectedDocNo===d){a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,E();return}a.invoiceSelectedDocNo=d,a.invoiceSelectedLines=null,E(),Ca(d).then(m=>{a.invoiceSelectedDocNo===d&&(a.invoiceSelectedLines=m,E())})});const $=e.querySelector("#ledger-customer-code"),A=e.querySelector("#ledger-cust-suggestions");if($&&A){const o=a.masterStats?.customers??[];$.addEventListener("input",()=>{const l=$.value.trim().toLowerCase();if(!l){A.style.display="none";return}const d=o.filter(m=>m.code.toLowerCase().includes(l)||m.name.toLowerCase().includes(l)||(m.kanaName??"").toLowerCase().includes(l)).slice(0,10);if(!d.length){A.style.display="none";return}A.innerHTML=d.map(m=>`<button class="search-item" type="button" data-ledger-cust="${m.code}"><span class="mono">${m.code}</span><span>${m.name}</span></button>`).join(""),A.style.display="block",A.querySelectorAll("[data-ledger-cust]").forEach(m=>{m.addEventListener("click",()=>{const y=m.dataset.ledgerCust??"";$.value=y,A.style.display="none",a.ledgerCustomerCode=y,Aa(y)})})}),$.addEventListener("keydown",l=>{if(l.key==="Enter"){A.style.display="none";const d=$.value.trim(),m=d.toLowerCase(),y=(a.masterStats?.customers??[]).filter(v=>v.code.toLowerCase()===m||v.name.toLowerCase()===m),w=y.length===1?y[0].code:d.toUpperCase();a.ledgerCustomerCode=w,Aa(w)}}),$.addEventListener("blur",()=>{setTimeout(()=>{A.style.display="none"},200)})}e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const o=e.querySelector("#ledger-customer-code")?.value.trim()??"",l=o.toLowerCase(),d=(a.masterStats?.customers??[]).filter(y=>y.code.toLowerCase()===l||y.name.toLowerCase()===l),m=d.length===1?d[0].code:o.toUpperCase();a.ledgerCustomerCode=m,Aa(m)}),e.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{a.masterTab=o.dataset.tab,a.masterFilter={...cn},E()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",tradeType:e.querySelector("#master-trade-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},E()}),e.querySelector("#master-search")?.addEventListener("keydown",o=>{o.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.page);l>=1&&(a.masterFilter={...a.masterFilter,page:l},E())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.table;if(!l)return;a.rawSelectedTable=l,a.rawPage=1;const d=await Kt(l,1);a.rawRecords=d.records,a.rawTotalCount=d.total,E()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const o=await Kt(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,E()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const o=await Kt(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,E()}),e.querySelectorAll("[data-analytics-tab]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsTab=o.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:d}=await I(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:y}=await Promise.resolve().then(()=>O);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:y}},void 0);a.analyticsPeriodOptions=await d(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await l(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}E()})}),e.querySelectorAll("[data-analytics-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:d,fetchPeriodChartData:m,prevYearFilter:y}=await I(async()=>{const{fetchAnalyticsByPeriod:v,fetchAvailablePeriods:x,fetchPeriodChartData:k,prevYearFilter:C}=await Promise.resolve().then(()=>O);return{fetchAnalyticsByPeriod:v,fetchAvailablePeriods:x,fetchPeriodChartData:k,prevYearFilter:C}},void 0),w=o.dataset.analyticsPeriod;if(a.analyticsPeriod=w,a.analyticsDrilldown=null,w==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await d(a.analyticsTab,w),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const v=a.analyticsPeriodFilter,[x,k,C]=await Promise.all([l(a.analyticsTab,w,v),m(w,v),m(w,y(v))]);a.analyticsPeriodRows=x,a.analyticsPeriodChartData=k,a.analyticsPrevYearChartData=C}E()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async o=>{const{fetchAnalyticsByPeriod:l,fetchPeriodChartData:d,prevYearFilter:m}=await I(async()=>{const{fetchAnalyticsByPeriod:v,fetchPeriodChartData:x,prevYearFilter:k}=await Promise.resolve().then(()=>O);return{fetchAnalyticsByPeriod:v,fetchPeriodChartData:x,prevYearFilter:k}},void 0);a.analyticsPeriodFilter=o.target.value,a.analyticsDrilldown=null;const y=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:v}=await I(async()=>{const{fiscalYearToDateRange:z}=await Promise.resolve().then(()=>jn);return{fiscalYearToDateRange:z}},void 0),x=parseInt(y),k=v(x);v(x-1);const C=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:q}=await I(async()=>{const{supabaseRpc:z}=await Promise.resolve().then(()=>te);return{supabaseRpc:z}},void 0),[M,j,N]=await Promise.all([q(C,{p_date_from:k.from,p_date_to:k.to}),d("yearly",y),d("yearly",String(x-1))]);a.analyticsPeriodRows=(M??[]).map(z=>({code:String(z.code??""),name:String(z.name??""),amount:Number(z.amount??0),quantity:Number(z.quantity??0),documents:Number(z.documents??0),volumeMl:Number(z.volume_ml??0)})),a.analyticsPeriodChartData=(j??[]).map(z=>({...z})),a.analyticsPrevYearChartData=(N??[]).map(z=>({...z}))}else{const[v,x,k]=await Promise.all([l(a.analyticsTab,a.analyticsPeriod,y),d(a.analyticsPeriod,y),d(a.analyticsPeriod,m(y))]);a.analyticsPeriodRows=v,a.analyticsPeriodChartData=x,a.analyticsPrevYearChartData=k}E()}),e.querySelectorAll("[data-fiscal-mode]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsFiscalMode=o.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:l}=await I(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>jn);return{monthToFiscalYear:m}},void 0),d=new Set;for(const m of a.salesAnalytics.monthlySales)d.add(l(m.month));a.analyticsPeriodOptions=[...d].sort((m,y)=>y-m).map(String)}else{const{fetchAvailablePeriods:l}=await I(async()=>{const{fetchAvailablePeriods:d}=await Promise.resolve().then(()=>O);return{fetchAvailablePeriods:d}},void 0);a.analyticsPeriodOptions=await l(a.analyticsTab,"yearly")}E()})}),e.querySelectorAll("[data-chart-metric]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsChartMetric=o.dataset.chartMetric,E()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.analyticsDrilldown??"",d=o.dataset.drilldownName??l,m=a.analyticsTab,{fetchCustomerProductBreakdown:y,fetchProductCustomerBreakdown:w,fetchEntityMonthlySales:v,periodToDateRange:x}=await I(async()=>{const{fetchCustomerProductBreakdown:M,fetchProductCustomerBreakdown:j,fetchEntityMonthlySales:N,periodToDateRange:z}=await Promise.resolve().then(()=>O);return{fetchCustomerProductBreakdown:M,fetchProductCustomerBreakdown:j,fetchEntityMonthlySales:N,periodToDateRange:z}},void 0),k=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?x(a.analyticsPeriod,a.analyticsPeriodFilter):null,[C,q]=await Promise.all([v(l,m==="customers"?"customer":"product"),m==="customers"?y(l,k?.from,k?.to):w(l,k?.from,k?.to)]);a.analyticsDrilldown={tab:m,code:l,name:d,monthlySales:C,breakdownRows:q},E()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,E()}),e.querySelector("#staff-filter-input")?.addEventListener("input",o=>{a.analyticsStaffFilter=o.target.value,E()}),e.querySelectorAll("[data-staff-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.staffDrilldown??"",d=o.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:y,periodToDateRange:w}=await I(async()=>{const{fetchStaffCustomerBreakdown:q,fetchStaffProductBreakdown:M,periodToDateRange:j}=await Promise.resolve().then(()=>O);return{fetchStaffCustomerBreakdown:q,fetchStaffProductBreakdown:M,periodToDateRange:j}},void 0),v=w(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),x=a.analyticsStaffDrilldown?.breakdownTab??"customers",[k,C]=await Promise.all([m(l,v?.from,v?.to),y(l,v?.from,v?.to)]);a.analyticsStaffDrilldown={code:l,name:d,breakdownTab:x,customerRows:k,productRows:C},E()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:o.dataset.staffBreakdownTab},E())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,E()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",o=>{a.analyticsTagFilter=o.target.value,E()}),e.querySelectorAll("[data-staff-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAvailablePeriods:l,fetchStaffTotalsByPeriod:d,periodToDateRange:m}=await I(async()=>{const{fetchAvailablePeriods:w,fetchStaffTotalsByPeriod:v,periodToDateRange:x}=await Promise.resolve().then(()=>O);return{fetchAvailablePeriods:w,fetchStaffTotalsByPeriod:v,periodToDateRange:x}},void 0),y=o.dataset.staffPeriod;if(a.analyticsStaffPeriod=y,a.analyticsStaffDrilldown=null,y==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await l("staff",y),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const w=m(y,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await d(w?.from,w?.to)}E()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async o=>{const{fetchStaffTotalsByPeriod:l,periodToDateRange:d}=await I(async()=>{const{fetchStaffTotalsByPeriod:y,periodToDateRange:w}=await Promise.resolve().then(()=>O);return{fetchStaffTotalsByPeriod:y,periodToDateRange:w}},void 0);a.analyticsStaffPeriodFilter=o.target.value;const m=d(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await l(m?.from,m?.to),a.analyticsStaffDrilldown=null,E()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Ne(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},E()}),e.querySelectorAll("[data-action='remove-line']").forEach(o=>{o.addEventListener("click",()=>{Ne(e);const l=parseInt(o.dataset.line??"0",10);a.invoiceForm.lines.splice(l,1),a.invoiceErrors=qo(a.invoiceForm),E()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(o=>{o.addEventListener("click",()=>{Ne(e),Ju(parseInt(o.dataset.line??"0",10)),a.invoiceErrors={},E()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Ku(),E()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Ne(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,E()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(o=>{o.addEventListener("click",()=>{Ne(e);const l=parseInt(o.dataset.line??"0",10),d=a.invoiceForm.lines[l];a.pickerMode="product",a.pickerTargetLine=l,a.pickerQuery=d?d.productCode||d.productName:"",E()})}),e.querySelectorAll("[data-action='modal-close']").forEach(o=>{o.addEventListener("click",l=>{o.classList.contains("modal-backdrop")&&l.target instanceof HTMLElement&&!l.target.classList.contains("modal-backdrop")||(oa(),E())})}),e.querySelectorAll("[data-action='picker-select']").forEach(o=>{const l=async()=>{const d=o.dataset.code??"",m=o.dataset.name??"";if(a.pickerMode==="customer"){a.invoiceForm.customerCode=d,a.invoiceForm.customerName=m,delete a.invoiceErrors.customerCode;const y=a.masterStats?.customers.find(w=>w.code===d);a.invoicePriceGroup=y?.priceGroup||"",!a.invoicePriceGroup&&d&&(a.invoicePriceGroup=await Ia(d))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const y=a.invoiceForm.lines[a.pickerTargetLine];if(y){y.productCode=d,y.productName=m;const w=await Qs(a.invoicePriceGroup,d);w>0&&(y.unitPrice=w),y.amount=y.quantity*y.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}oa(),E()};o.addEventListener("click",l),o.addEventListener("keydown",d=>{d.key==="Enter"&&l()})}),e.querySelector("#modal-search")?.addEventListener("input",o=>{a.pickerQuery=o.target.value,E()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Do(),E()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{To(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Ne(e),Hu(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await Ia(a.invoiceForm.customerCode)),E())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Ne(e),Qu(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,E())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(o=>{o.addEventListener("input",()=>{Ne(e),a.invoiceSavedDocNo=null;const l=o.dataset.field;(l==="quantity"||l==="unitPrice")&&E()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Ne(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const o=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=o.trim(),a.deliveryNote=null,a.actionLoading=!0,E(),!a.deliverySearchDocNo){F("伝票番号を入力してください","error"),a.actionLoading=!1,E();return}Ga(a.deliverySearchDocNo).then(l=>{a.deliveryNote=l,a.actionLoading=!1,E()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const o=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=o,a.billingSummary=null,a.actionLoading=!0,E(),Xa(o).then(l=>{a.billingSummary=l,a.actionLoading=!1,E()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const o=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),l=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=o,a.taxMonth=l,a.taxDeclaration=null,a.taxVolume=null,a.actionLoading=!0,E(),Promise.all([tn(o,l),an(o,l)]).then(([d,m])=>{a.taxDeclaration=d,a.taxVolume=m,a.actionLoading=!1,E()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:o}=await I(async()=>{const{generateTaxXML:w}=await Promise.resolve().then(()=>O);return{generateTaxXML:w}},void 0),l=o(a.taxDeclaration),d=new Blob([l],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(d),y=document.createElement("a");y.href=m,y.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,y.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:o}=await I(async()=>{const{generateTaxCSV:w}=await Promise.resolve().then(()=>O);return{generateTaxCSV:w}},void 0),l=o(a.taxDeclaration),d=new Blob([l],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(d),y=document.createElement("a");y.href=m,y.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,y.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:o}=await I(async()=>{const{saveTaxDeclaration:l}=await Promise.resolve().then(()=>O);return{saveTaxDeclaration:l}},void 0);try{await o(a.taxDeclaration),F("下書き保存しました")}catch(l){F("保存に失敗: "+(l instanceof Error?l.message:String(l)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(o=>{o.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.taxRow),d=o.dataset.taxField,m=o.type==="number"?Number(o.value)||0:o.value,y=[...a.taxDeclaration.rows];y[l]={...y[l],[d]:m};const{recalculateTaxDeclaration:w}=await I(async()=>{const{recalculateTaxDeclaration:v}=await Promise.resolve().then(()=>O);return{recalculateTaxDeclaration:v}},void 0);a.taxDeclaration=w({...a.taxDeclaration,rows:y}),E()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.dedRow),d=o.dataset.dedField,m=o.type==="number"?Number(o.value)||0:o.value,y=[...a.taxDeclaration.deductions];y[l]={...y[l],[d]:m},a.taxDeclaration={...a.taxDeclaration,deductions:y},E()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=o.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[l]:o.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:o,TAX_RATE_CATEGORIES:l}=await I(async()=>{const{recalculateTaxDeclaration:y,TAX_RATE_CATEGORIES:w}=await Promise.resolve().then(()=>O);return{recalculateTaxDeclaration:y,TAX_RATE_CATEGORIES:w}},void 0),d=l[0],m={taxCategory:d.code,taxCategoryName:d.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:d.taxRatePerLiter,taxAmount:0};a.taxDeclaration=o({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),E()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(o=>{o.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.taxRow),{recalculateTaxDeclaration:d}=await I(async()=>{const{recalculateTaxDeclaration:y}=await Promise.resolve().then(()=>O);return{recalculateTaxDeclaration:y}},void 0),m=a.taxDeclaration.rows.filter((y,w)=>w!==l);a.taxDeclaration=d({...a.taxDeclaration,rows:m}),E()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const o={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,o]},E()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(o=>{o.addEventListener("click",()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.dedRow),d=a.taxDeclaration.deductions.filter((m,y)=>y!==l);a.taxDeclaration={...a.taxDeclaration,deductions:d},E()})}),e.querySelectorAll("[data-store-tab]").forEach(o=>{o.addEventListener("click",()=>{a.storeTab=o.dataset.storeTab,E()})}),e.querySelectorAll("[data-import-entity]").forEach(o=>{o.addEventListener("click",()=>{a.importEntity=o.dataset.importEntity,a.importPreview=null,a.importResult=null,E()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const o=xo(a.importEntity),l=new Blob([o],{type:"text/csv;charset=utf-8"}),d=URL.createObjectURL(l),m=document.createElement("a");m.href=d,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const l=e.querySelector("#import-file")?.files?.[0];if(!l){F("CSVファイルを選択してください","warning");return}const d=new FileReader;d.onload=()=>{const m=String(d.result??""),{columns:y,rows:w}=bo(m);a.importPreview=wo(a.importEntity,y,w),a.importResult=null,E()},d.readAsText(l,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,E()}),e.querySelectorAll("[data-print-template]").forEach(o=>{o.addEventListener("click",()=>{a.printTemplate=o.dataset.printTemplate,E()})}),e.querySelectorAll("[data-print-field]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.printField;let d=o.value;(l==="taxRate"||l==="previousBalance"||l==="paymentAmount")&&(d=Number(o.value)||0),a.printData={...a.printData,[l]:d},E()})}),e.querySelectorAll("[data-print-opt]").forEach(o=>{const l=()=>{const d=o.dataset.printOpt;let m;o.type==="checkbox"?m=o.checked:d==="copies"?m=Number(o.value)||1:d==="overlayOpacity"||d==="calibrationOffsetX"||d==="calibrationOffsetY"?m=Number(o.value)||0:m=o.value,a.printOptions={...a.printOptions,[d]:m},E()};o.addEventListener("change",l),o.type==="range"&&o.addEventListener("input",l)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(o=>{o.addEventListener("change",()=>{const l=Number(o.dataset.printLine),d=o.dataset.printLfield,m=[...a.printData.lines];let y=o.value;(d==="quantity"||d==="unitPrice")&&(y=Number(o.value)||0),m[l]={...m[l],[d]:y},m[l].amount=(Number(m[l].quantity)||0)*(Number(m[l].unitPrice)||0),a.printData={...a.printData,lines:m},E()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},E()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((d,m)=>m!==l)},E()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),F("印刷設定を保存しました")}catch(o){F("保存失敗: "+(o instanceof Error?o.message:String(o)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const o=a.printCompany,l=prompt("会社名",o.name);if(l===null)return;const d=prompt("郵便番号",o.postalCode)??o.postalCode,m=prompt("住所",o.address1)??o.address1,y=prompt("TEL",o.tel)??o.tel,w=prompt("FAX",o.fax)??o.fax,v=prompt("適格請求書登録番号 (T+13桁)",o.registrationNo)??o.registrationNo,x=prompt("取引銀行名",o.bankName)??o.bankName,k=prompt("支店名",o.bankBranch)??o.bankBranch,C=prompt("口座番号",o.bankAccountNo)??o.bankAccountNo,q=prompt("口座名義",o.bankAccountHolder)??o.bankAccountHolder;a.printCompany={...o,name:l,postalCode:d,address1:m,tel:y,fax:w,registrationNo:v,bankName:x,bankBranch:k,bankAccountNo:C,bankAccountHolder:q},E()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,E()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const d=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=va(o),{savePrintLayout:y}=await I(async()=>{const{savePrintLayout:v}=await Promise.resolve().then(()=>O);return{savePrintLayout:v}},void 0),w={id:`bp1701_${d.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:d,templateKey:"chain_store",positions:m};try{await y(w)?(F(`クラウド保存成功: ${d}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),E()):(F("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(v){F("保存エラー: "+(v instanceof Error?v.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const l=va(o);a.fdSavedPositions=l;try{localStorage.setItem("sake_fd_positions",JSON.stringify(l)),F(`ローカル保存完了: ${Object.keys(l).length}件`)}catch(d){F("保存失敗: "+(d instanceof Error?d.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const d={templateKey:"chain_store",positions:va(o),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(d,null,2)],{type:"application/json"}),y=URL.createObjectURL(m),w=document.createElement("a");w.href=y,w.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,w.click(),URL.revokeObjectURL(y)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async o=>{const l=o.target.files?.[0];if(l)try{const d=await l.text(),y=JSON.parse(d).positions;if(!y)throw new Error("positions field not found");a.fdSavedPositions=y,localStorage.setItem("sake_fd_positions",JSON.stringify(y)),F(`インポート成功: ${Object.keys(y).length}件`),E()}catch(d){F("インポート失敗: "+(d instanceof Error?d.message:""),"error")}});const _=e.querySelector("#fd-saved-layouts");_&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:o}=await I(async()=>{const{fetchPrintLayouts:d}=await Promise.resolve().then(()=>O);return{fetchPrintLayouts:d}},void 0),l=await o("chain_store");l.length===0?_.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(_.innerHTML=`☁️ クラウド保存済み (${l.length}件):<br/>`+l.map(d=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${d.id}" style="margin:4px 4px 0 0;">${d.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${d.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),_.querySelectorAll("[data-action='fd-load-layout']").forEach(d=>{d.addEventListener("click",()=>{const m=d.dataset.layoutId,y=l.find(w=>w.id===m);y&&(a.fdSavedPositions=y.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(y.positions)),F(`読込完了: ${y.name}`),E())})}),_.querySelectorAll("[data-action='fd-delete-layout']").forEach(d=>{d.addEventListener("click",async()=>{const m=d.dataset.layoutId;if(!m||!await Ee("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:y}=await I(async()=>{const{deletePrintLayout:v}=await Promise.resolve().then(()=>O);return{deletePrintLayout:v}},void 0);await y(m)?(F("削除しました"),E()):F("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await Ee("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),E())});const D=e.querySelector("#fd-sel-x"),P=e.querySelector("#fd-sel-y");if([D,P].forEach(o=>{o?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const l=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);l&&(D&&(l.style.left=D.value+"mm"),P&&(l.style.top=P.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(o=>{o.addEventListener("dragstart",l=>{o.classList.add("wf-dragging"),l.dataTransfer?.setData("text/plain",o.dataset.wfOrder??"")}),o.addEventListener("dragend",()=>o.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(o=>{o.addEventListener("dragover",l=>l.preventDefault()),o.addEventListener("drop",l=>{l.preventDefault();const d=l.dataTransfer?.getData("text/plain"),m=o.dataset.wfStage;if(!d||!m)return;const y=a.workflowOrders.find(w=>w.id===d);y&&(y.stage=m,E())})}),e.querySelectorAll("[data-mo-step]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moStep;o.disabled||(a.mobileOrder.step=l,E())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",o=>{a.mobileOrder.customerQuery=o.target.value,E()}),e.querySelector("#mo-product-q")?.addEventListener("input",o=>{a.mobileOrder.productQuery=o.target.value,E()}),e.querySelectorAll("[data-mo-select-customer]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moSelectCustomer,d=a.masterStats?.customers.find(m=>m.id===l);d&&(a.mobileOrder.selectedCustomer=d),E()})}),e.querySelectorAll("[data-mo-add-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moAddProduct,d=a.masterStats?.products.find(y=>y.code===l);if(!d)return;const m=1800;a.mobileOrder.cart.push({productCode:d.code,productName:d.name,quantity:1,unit:"本",unitPrice:m,amount:m}),E()})}),e.querySelectorAll("[data-mo-qty]").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.moQty),d=o.dataset.moProduct,m=a.mobileOrder.cart.find(y=>y.productCode===d);m&&(m.quantity=Math.max(0,m.quantity+l),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(y=>y.productCode!==d)),E())})}),e.querySelectorAll("[data-mo-remove]").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.moRemove);a.mobileOrder.cart.splice(l,1),E()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const o=e.querySelector("#mo-memo");a.mobileOrder.memo=o?.value??"";const l="MO"+Date.now().toString().slice(-8),d=e.querySelector("[data-action='mo-submit']");d&&(d.disabled=!0,d.textContent="送信中…");const m=a.mobileOrder.cart.reduce((y,w)=>y+w.amount,0);try{const{saveStoreOrder:y}=await I(async()=>{const{saveStoreOrder:w}=await Promise.resolve().then(()=>O);return{saveStoreOrder:w}},void 0);await y(l,a.mobileOrder.selectedCustomer?.name??"不明",a.mobileOrder.selectedCustomer?.code??null,m,a.mobileOrder.memo,a.mobileOrder.cart)}catch(y){console.error("受注保存失敗:",y),F("送信に失敗しました","error"),d&&(d.disabled=!1,d.textContent="受注を送信");return}a.mobileOrder.submittedDocNo=l,a.mobileOrder.step="done",E()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},E()}),e.querySelectorAll("[data-tour-id]").forEach(o=>{o.addEventListener("click",()=>{a.tourActiveId=o.dataset.tourId??null,E()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(o=>{o.addEventListener("click",()=>{const l=a.tourInquiries.find(v=>v.id===a.tourActiveId);if(!l)return;const d=o.dataset.template==="confirm"?Bd:jd,m=e.querySelector("#tour-confirmed-time"),y=d.replaceAll("{name}",l.name).replaceAll("{partySize}",String(l.partySize)).replaceAll("{confirmedTime}",m?.value??l.visitDate),w=e.querySelector("#tour-reply-body");w&&(w.value=y)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const o=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",l=a.tourInquiries.find(m=>m.id===o);if(!l)return;const d=e.querySelector("#tour-confirmed-time");l.status="confirmed",l.repliedAt=new Date().toISOString(),l.confirmedTime=d?.value??"",F("返信メールを下書き保存し、ステータスを確定にしました"),E()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const o=e.querySelector("#lb-type")?.value??"",l=e.querySelector("#lb-area")?.value??"",d=e.querySelector("#lb-keyword")?.value??"";if(!o&&!d){F("業種かキーワードを入力してください","warning");return}a.leadSearchType=o,a.leadSearchArea=l,a.leadSearchQuery=d,a.leadSearching=!0,E();const m=a.integrations.find(x=>x.provider==="google_maps");if(!m||!m.config.api_key){F("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,E();return}const{searchPlaces:y}=await I(async()=>{const{searchPlaces:x}=await Promise.resolve().then(()=>O);return{searchPlaces:x}},void 0),w=[o,d].filter(Boolean).join(" "),v=await y(m,w,l);a.leadSearching=!1,v.error?F("検索失敗: "+v.error,"error"):a.leadSearchResults=v.results,E()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],E()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const o=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!o)return;const l=`ll_${Date.now()}`,d={id:l,name:o,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:y,fetchLeadLists:w,fetchLeadItems:v}=await I(async()=>{const{saveLeadList:C,saveLeadItem:q,fetchLeadLists:M,fetchLeadItems:j}=await Promise.resolve().then(()=>O);return{saveLeadList:C,saveLeadItem:q,fetchLeadLists:M,fetchLeadItems:j}},void 0);await m(d);const x=e.querySelectorAll(".lb-search-check:checked"),k=Array.from(x).map(C=>Number(C.dataset.idx));for(const C of k){const q=a.leadSearchResults[C];q&&await y({...q,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:l,businessType:a.leadSearchType})}a.leadLists=await w(),a.leadActiveListId=l,a.leadItems=await v(l),a.leadSearchResults=[],F(`${k.length}件を「${o}」として保存しました`),E()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??null;if(a.leadActiveListId=l,l){const{fetchLeadItems:d}=await I(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>O);return{fetchLeadItems:m}},void 0);a.leadItems=await d(l)}E()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=a.leadItems.find(w=>w.id===l);if(!d)return;const{saveLeadItem:m,fetchLeadItems:y}=await I(async()=>{const{saveLeadItem:w,fetchLeadItems:v}=await Promise.resolve().then(()=>O);return{saveLeadItem:w,fetchLeadItems:v}},void 0);await m({...d,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await y(a.leadActiveListId)),E()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=a.leadItems.find(v=>v.id===l);if(!d)return;const{convertLeadToProspect:m,fetchLeadItems:y}=await I(async()=>{const{convertLeadToProspect:v,fetchLeadItems:x}=await Promise.resolve().then(()=>O);return{convertLeadToProspect:v,fetchLeadItems:x}},void 0);await m(d)&&(F("見込客に追加しました: "+d.companyName),a.leadActiveListId&&(a.leadItems=await y(a.leadActiveListId)),E())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const o=e.querySelectorAll(".lb-item-check:checked");if(o.length===0&&!await Ee("全ての新規アイテムを見込客に変換しますか？"))return;const l=o.length>0?Array.from(o).map(w=>w.dataset.id):a.leadItems.filter(w=>w.status==="new").map(w=>w.id),{convertLeadToProspect:d,fetchLeadItems:m}=await I(async()=>{const{convertLeadToProspect:w,fetchLeadItems:v}=await Promise.resolve().then(()=>O);return{convertLeadToProspect:w,fetchLeadItems:v}},void 0);let y=0;for(const w of l){const v=a.leadItems.find(x=>x.id===w);v&&v.status==="new"&&await d(v)&&y++}F(`${y}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),E()}),e.querySelectorAll("[data-analysis-tab]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.analysisTab;a.analysisTab!==l&&(a.analysisTab=l,E())})}),e.querySelector("#analysis-period-year")?.addEventListener("change",async o=>{const l=o.target.value,d=e.querySelector("#analysis-period-month")?.value??"";a.analysisPeriod=l&&d?`${l}-${d}`:l,a.customerAnalysis=null,a.productABC=null,await Et("/customer-analysis"),E()}),e.querySelector("#analysis-period-month")?.addEventListener("change",async o=>{const l=o.target.value,d=e.querySelector("#analysis-period-year")?.value??"";a.analysisPeriod=d&&l?`${d}-${l}`:d,a.customerAnalysis=null,a.productABC=null,await Et("/customer-analysis"),E()}),e.querySelector("#customer-map")){const o=()=>{window.google?.maps?lm(e):setTimeout(o,200)};o()}e.querySelectorAll(".churn-reason-select").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.churnCode??"",d=o.value;try{const{saveChurnNote:m}=await I(async()=>{const{saveChurnNote:v}=await Promise.resolve().then(()=>O);return{saveChurnNote:v}},void 0);await m({customerCode:l,reason:d,memo:"",actionedAt:null});const y=a.churnNotes.find(v=>v.customerCode===l);y?y.reason=d:a.churnNotes.push({customerCode:l,reason:d,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const w=o.closest("tr");if(w){const v=w.querySelector("td:nth-child(2)");if(v){let x=v.querySelector(".reason-badge");!x&&d&&(x=document.createElement("span"),x.className="status-pill info reason-badge",x.style.fontSize="0.72rem",v.appendChild(x)),x&&(x.textContent=d?Mu[d]??"":"")}}F("理由を保存しました")}catch(m){F("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.churnCode??"",d=o.checked,m=o.closest("tr");m&&(m.style.opacity=d?"0.45":"",m.setAttribute("data-actioned",d?"1":"0"));try{const{saveChurnNote:y}=await I(async()=>{const{saveChurnNote:k}=await Promise.resolve().then(()=>O);return{saveChurnNote:k}},void 0),w=a.churnNotes.find(k=>k.customerCode===l),v=w?.reason??"",x=new Date().toISOString().slice(0,10);await y({customerCode:l,reason:v,memo:"",actionedAt:d?x:null}),w?w.actionedAt=d?x:null:a.churnNotes.push({customerCode:l,reason:v,memo:"",actionedAt:d?x:null,updatedAt:new Date().toISOString()}),F(d?"対応済みにしました":"対応済みを解除しました")}catch(y){F("保存に失敗しました","error"),console.error(y)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const o=a.integrations.find(y=>y.provider==="ivry");if(!o||!o.isEnabled){F("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:l,fetchCallLogs:d}=await I(async()=>{const{syncIvryCallLogs:y,fetchCallLogs:w}=await Promise.resolve().then(()=>O);return{syncIvryCallLogs:y,fetchCallLogs:w}},void 0),m=await l(o);m.error?F("同期失敗: "+m.error,"error"):(F(`${m.count}件の通話履歴を同期しました`),a.callLogs=await d(100),E())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const o=a.integrations.find(y=>y.provider==="ivry");if(!o||!o.isEnabled){F("IVRy連携が無効です","warning");return}if(!await Ee("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:l}=await I(async()=>{const{syncPhoneBookToIvry:y}=await Promise.resolve().then(()=>O);return{syncPhoneBookToIvry:y}},void 0),d=[];a.masterStats?.customers.forEach(y=>{d.push({name:y.name,phone:"",customerCode:y.code,note:"既存取引先"})}),a.prospects.forEach(y=>{y.phone&&d.push({name:y.companyName,phone:y.phone,customerCode:y.id,note:`見込客 (${y.stage})`})});const m=await l(o,d);m.error?F("送信失敗: "+m.error,"error"):F(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=o.dataset.phone??"",m=prompt(`電話番号 ${d} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const y=a.callLogs.find(x=>x.id===l);if(!y)return;const{saveCallLog:w,fetchCallLogs:v}=await I(async()=>{const{saveCallLog:x,fetchCallLogs:k}=await Promise.resolve().then(()=>O);return{saveCallLog:x,fetchCallLogs:k}},void 0);await w({...y,matchedCustomerCode:m}),a.callLogs=await v(100),E()})}),e.querySelectorAll("[data-action='call-memo']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=a.callLogs.find(v=>v.id===l);if(!d)return;const m=prompt("メモを入力:",d.notes??"");if(m===null)return;const{saveCallLog:y,fetchCallLogs:w}=await I(async()=>{const{saveCallLog:v,fetchCallLogs:x}=await Promise.resolve().then(()=>O);return{saveCallLog:v,fetchCallLogs:x}},void 0);await y({...d,notes:m}),a.callLogs=await w(100),E()})}),e.querySelectorAll("[data-prospect-view]").forEach(o=>{o.addEventListener("click",()=>{a.prospectViewMode=o.dataset.prospectView,E()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",E()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:d}=await I(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>O);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await d(l)}E()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.prospectId??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:d}=await I(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>O);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await d(l)}E()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],E())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const o=a.prospectEditingId==="__new__",l=o?`p_${Date.now()}`:a.prospectEditingId??"",d={id:l,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!d.companyName){F("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:y,recordAudit:w,sendSlackNotification:v}=await I(async()=>{const{saveProspect:k,fetchProspects:C,recordAudit:q,sendSlackNotification:M}=await Promise.resolve().then(()=>O);return{saveProspect:k,fetchProspects:C,recordAudit:q,sendSlackNotification:M}},void 0);await m(d)?(o&&await v("new_prospect",`新規見込客: ${d.companyName} / 想定 ¥${d.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await w({action:o?"prospect_create":"prospect_update",entityType:"prospect",entityId:l,userEmail:a.user?.email}),a.prospects=await y(),a.prospectEditingId=null,E()):F("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteProspect:d,fetchProspects:m}=await I(async()=>{const{deleteProspect:y,fetchProspects:w}=await Promise.resolve().then(()=>O);return{deleteProspect:y,fetchProspects:w}},void 0);await d(l)&&(a.prospects=await m(),E())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const d=o.dataset.id??"",m=o.dataset.name??"",y=o.dataset.addr??"";a.quoteState=na(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=m,a.quoteState.customerAddress=y,a.quoteState.isProspect=!0,a.quoteState.prospectId=d,a.quotePricing=null,a.quoteEditId="new",Xt("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",l=e.querySelector("#prospect-activity-type")?.value??"call",d=e.querySelector("#prospect-activity-title")?.value??"";if(!d){F("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:y}=await I(async()=>{const{saveProspectActivity:w,fetchProspectActivities:v}=await Promise.resolve().then(()=>O);return{saveProspectActivity:w,fetchProspectActivities:v}},void 0);await m({id:`act_${Date.now()}`,prospectId:o,activityType:l,title:d,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await y(o),E()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("dragstart",l=>{l.dataTransfer?.setData("text/plain",o.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(o=>{o.addEventListener("dragover",l=>l.preventDefault()),o.addEventListener("drop",async l=>{l.preventDefault();const d=l.dataTransfer?.getData("text/plain"),m=o.dataset.prospectStage;if(!d)return;const y=a.prospects.find(w=>w.id===d);if(y&&y.stage!==m){const w={...y,stage:m},{saveProspect:v}=await I(async()=>{const{saveProspect:x}=await Promise.resolve().then(()=>O);return{saveProspect:x}},void 0);await v(w),y.stage=m,E()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:o,saveIntegrationSetting:l}=await I(async()=>{const{fetchIntegrationSettings:x,saveIntegrationSetting:k}=await Promise.resolve().then(()=>O);return{fetchIntegrationSettings:x,saveIntegrationSetting:k}},void 0),m=(a.integrations.length>0?a.integrations:await o()).find(x=>x.provider==="slack");if(!m)return;const y=e.querySelector("#slack-webhook")?.value??"",w=e.querySelector("#slack-default-channel")?.value??"",v=e.querySelector("#slack-enabled")?.checked??!1;await l({...m,config:{...m.config,webhook_url:y,default_channel:w},isEnabled:v}),a.integrations=await o(),F("保存しました"),E()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:o,fetchSlackRules:l}=await I(async()=>{const{saveSlackRule:d,fetchSlackRules:m}=await Promise.resolve().then(()=>O);return{saveSlackRule:d,fetchSlackRules:m}},void 0);for(const d of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${d.id}"][data-slack-field="enabled"]`)?.checked??d.enabled,y=e.querySelector(`[data-slack-rule-id="${d.id}"][data-slack-field="channel"]`)?.value??d.channel;await o({...d,enabled:m,channel:y})}a.slackRules=await l(),F("ルールを保存しました"),E()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:o}=await I(async()=>{const{sendSlackNotification:d}=await Promise.resolve().then(()=>O);return{sendSlackNotification:d}},void 0),l=await o("new_order","🧪 これはテスト通知です (syusen-cloud)");l.ok?F("テスト送信成功"):F("送信失敗: "+(l.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,E()}),e.querySelectorAll("[data-action='material-adjust']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id??"",d=a.materialList.find(m=>m.id===l);d&&(a.materialEditing=d,a.materialEditingIsNew=!1,E())})}),e.querySelectorAll("[data-action='material-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,E())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const l={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(l.materialType=e.querySelector("#mat-type")?.value??"",!l.code||!l.name){F("コードと品名は必須です","warning");return}const{saveMaterial:d,fetchMaterialList:m}=await I(async()=>{const{saveMaterial:w,fetchMaterialList:v}=await Promise.resolve().then(()=>O);return{saveMaterial:w,fetchMaterialList:v}},void 0);await d(l)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,F("保存しました"),E()):F("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!o||!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:l,fetchMaterialList:d}=await I(async()=>{const{deleteMaterial:m,fetchMaterialList:y}=await Promise.resolve().then(()=>O);return{deleteMaterial:m,fetchMaterialList:y}},void 0);await l(o)&&(a.materialList=await d(),a.materialEditing=null,E())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",E()}),e.querySelectorAll("[data-action='user-edit']").forEach(o=>{o.addEventListener("click",()=>{a.userEditingId=o.dataset.id??null,E()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,E()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const o=a.userEditingId==="__new__",l=o?crypto.randomUUID():a.userEditingId??"",d=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!d||!m){F("名前とメールアドレスは必須です","warning");return}const y={id:l,email:d,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(o){const C=e.querySelector("#user-password")?.value??"";if(C.length<8){F("パスワードは8文字以上必要です","warning");return}try{await bn(d,C)}catch(q){F("Auth登録失敗: "+(q instanceof Error?q.message:""),"error");return}}const{saveUserProfile:w,fetchUserProfiles:v,recordAudit:x}=await I(async()=>{const{saveUserProfile:C,fetchUserProfiles:q,recordAudit:M}=await Promise.resolve().then(()=>O);return{saveUserProfile:C,fetchUserProfiles:q,recordAudit:M}},void 0);await w(y)?(await x({action:o?"user_create":"user_update",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await v(),a.userEditingId=null,F("保存しました"),E()):F("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteUserProfile:d,fetchUserProfiles:m,recordAudit:y}=await I(async()=>{const{deleteUserProfile:v,fetchUserProfiles:x,recordAudit:k}=await Promise.resolve().then(()=>O);return{deleteUserProfile:v,fetchUserProfiles:x,recordAudit:k}},void 0);await d(l)?(await y({action:"user_delete",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await m(),E()):F("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const o=e.querySelector("#profile-sender")?.value??"",l={...a.myProfile,defaultMailSenderId:o},{saveUserProfile:d}=await I(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>O);return{saveUserProfile:m}},void 0);await d(l),a.myProfile=l,F("保存しました"),E()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const o=e.querySelector("#profile-new-password")?.value??"";if(o.length<8){F("8文字以上のパスワードを入力してください","warning");return}try{await Jo(o),F("パスワードを変更しました")}catch(l){F("変更失敗: "+(l instanceof Error?l.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(o=>{o.addEventListener("click",()=>{a.integrationEditingId=o.dataset.id??null,E()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,E()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='int-save']")?.dataset.id??"",l=a.integrations.find(x=>x.id===o);if(!l)return;const d={...l.config};Object.keys(d).forEach(x=>{const k=e.querySelector(`#int-${x}`);k&&(d[x]=k.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:y,fetchIntegrationSettings:w}=await I(async()=>{const{saveIntegrationSetting:x,fetchIntegrationSettings:k}=await Promise.resolve().then(()=>O);return{saveIntegrationSetting:x,fetchIntegrationSettings:k}},void 0);await y({...l,config:d,isEnabled:m})?(a.integrations=await w(),a.integrationEditingId=null,F("保存しました"),E()):F("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(o=>{o.addEventListener("click",async()=>{const l=a.integrations.find(w=>w.provider==="shopify");if(!l){F("Shopify連携が未設定です","warning");return}o.textContent="同期中…",o.disabled=!0;const{syncShopifyOrders:d,fetchShopifyOrders:m}=await I(async()=>{const{syncShopifyOrders:w,fetchShopifyOrders:v}=await Promise.resolve().then(()=>O);return{syncShopifyOrders:w,fetchShopifyOrders:v}},void 0),y=await d(l);y.error?F("同期失敗: "+y.error,"error"):(F(`${y.count}件を同期しました`),a.shopifyOrders=await m()),E()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(o=>{o.addEventListener("click",async()=>{const l=a.integrations.find(w=>w.provider==="google_calendar");if(!l)return;o.textContent="同期中…",o.disabled=!0;const{syncGoogleCalendar:d,fetchCalendarEvents:m}=await I(async()=>{const{syncGoogleCalendar:w,fetchCalendarEvents:v}=await Promise.resolve().then(()=>O);return{syncGoogleCalendar:w,fetchCalendarEvents:v}},void 0),y=await d(l);y.error?F("同期失敗: "+y.error,"error"):(F(`${y.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),E()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const l=e.querySelector("#fax-file")?.files?.[0];if(!l){F("FAX画像を選択してください","warning");return}const d=a.integrations.find(m=>m.provider==="cloud_vision");if(!d||!d.config.api_key){F("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,E();try{const m=new FileReader;m.onload=async()=>{const y=String(m.result??""),{ocrFaxImage:w,saveFaxRecord:v,fetchFaxInbox:x}=await I(async()=>{const{ocrFaxImage:M,saveFaxRecord:j,fetchFaxInbox:N}=await Promise.resolve().then(()=>O);return{ocrFaxImage:M,saveFaxRecord:j,fetchFaxInbox:N}},void 0),k=await w(d,y),C=e.querySelector("#fax-sender-name")?.value??"",q=e.querySelector("#fax-sender-phone")?.value??"";await v({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:C,senderPhone:q,ocrStatus:k.error?"failed":"done",ocrText:k.text}),a.faxOcrText=k.error?`エラー: ${k.error}`:k.text,a.faxRecords=await x(),a.faxProcessing=!1,E()},m.readAsDataURL(l)}catch(m){F("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,E()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",E()}),e.querySelectorAll("[data-action='ms-edit']").forEach(o=>{o.addEventListener("click",()=>{a.mailSenderEditingId=o.dataset.id??null,E()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,E()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,l={id:o,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(w=>w.id===o)?.isVerified??!1};if(!l.name||!l.email){F("名前とメールアドレスは必須です","warning");return}const{saveMailSender:d,fetchMailSenders:m}=await I(async()=>{const{saveMailSender:w,fetchMailSenders:v}=await Promise.resolve().then(()=>O);return{saveMailSender:w,fetchMailSenders:v}},void 0);await d(l)?(a.mailSenders=await m(),a.mailSenderEditingId=null,F("保存しました"),E()):F("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteMailSender:d,fetchMailSenders:m}=await I(async()=>{const{deleteMailSender:w,fetchMailSenders:v}=await Promise.resolve().then(()=>O);return{deleteMailSender:w,fetchMailSenders:v}},void 0);await d(l)?(a.mailSenders=await m(),E()):F("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(o=>{o.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){F("データなし","error");return}const o=a.demandAnalysis,l=Object.entries(o.matrix).map(([m,y])=>{const w={productCode:m};return o.months.forEach(v=>{w[v]=y[v]??0}),w}),d=[{key:"productCode",label:"商品コード"},...o.months.map(m=>({key:m,label:m}))];Va("demand-analysis.csv",l,d)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){F("データなし","error");return}const o=a.productionPlan.map(d=>({...d}));Va("production-plan.csv",o,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await Ee("当月の全請求を締め切りますか？")&&F("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async o=>{const l=parseInt(o.target.value);a.brewingPlanFY=l;const{fetchBrewingPlanSummary:d,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:y,fetchBrewingProductDetail:w,fetchBrewingCustomCategories:v,fetchBrewingCategoryOverrides:x,fetchAllBrewingStockEntries:k}=await I(async()=>{const{fetchBrewingPlanSummary:R,fetchBrewingMonthlyTrend:Y,fetchBrewingSchedule:Q,fetchBrewingProductDetail:X,fetchBrewingCustomCategories:W,fetchBrewingCategoryOverrides:H,fetchAllBrewingStockEntries:G}=await Promise.resolve().then(()=>O);return{fetchBrewingPlanSummary:R,fetchBrewingMonthlyTrend:Y,fetchBrewingSchedule:Q,fetchBrewingProductDetail:X,fetchBrewingCustomCategories:W,fetchBrewingCategoryOverrides:H,fetchAllBrewingStockEntries:G}},void 0),[C,q,M,j,N,z,B]=await Promise.all([d(`${l}-10-01`,`${l+1}-09-30`),m(`${l}-10-01`,`${l+1}-09-30`),y(l),w(`${l}-10-01`,`${l+1}-09-30`),v(),x(),k()]);a.brewingPlanData=C,a.brewingMonthlyTrend=q,a.brewingSchedule=M,a.brewingProductDetail=j,a.brewingStockEntries=B,a.brewingCustomCategories=N,a.brewingOverrides=z,a.brewingExcludedProducts=new Set,E()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",d=o.dataset.parent??"";if(!l||!d)return;if(o.checked){a.brewingExcludedProducts.delete(l),E();return}a.brewingExcludedProducts.add(l);const m=a.brewingCustomCategories.filter(y=>y.parentCategory===d);if(m.length===1){const{setBrewingCategoryOverride:y,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:v,fetchBrewingCategoryOverrides:x}=await I(async()=>{const{setBrewingCategoryOverride:z,fetchBrewingPlanSummary:B,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:Y}=await Promise.resolve().then(()=>O);return{setBrewingCategoryOverride:z,fetchBrewingPlanSummary:B,fetchBrewingProductDetail:R,fetchBrewingCategoryOverrides:Y}},void 0);await y(l,m[0].name);const k=a.brewingPlanFY,{fetchBrewingYearlyShipments:C}=await I(async()=>{const{fetchBrewingYearlyShipments:z}=await Promise.resolve().then(()=>O);return{fetchBrewingYearlyShipments:z}},void 0),[q,M,j,N]=await Promise.all([w(`${k}-10-01`,`${k+1}-09-30`),v(`${k}-10-01`,`${k+1}-09-30`),x(),C()]);a.brewingPlanData=q,a.brewingProductDetail=M,a.brewingOverrides=j,a.brewingYearlyShipments=N,a.brewingExcludedProducts.delete(l)}E()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",d=o.dataset.cat??"";if(!l||!d)return;const{setBrewingCategoryOverride:m,fetchBrewingPlanSummary:y,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:v,fetchBrewingYearlyShipments:x}=await I(async()=>{const{setBrewingCategoryOverride:N,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:R,fetchBrewingYearlyShipments:Y}=await Promise.resolve().then(()=>O);return{setBrewingCategoryOverride:N,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:R,fetchBrewingYearlyShipments:Y}},void 0);await m(l,d);const k=a.brewingPlanFY,[C,q,M,j]=await Promise.all([y(`${k}-10-01`,`${k+1}-09-30`),w(`${k}-10-01`,`${k+1}-09-30`),v(),x()]);a.brewingPlanData=C,a.brewingProductDetail=q,a.brewingOverrides=M,a.brewingYearlyShipments=j,E()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"";if(!l)return;const{setBrewingCategoryOverride:d,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:y,fetchBrewingCategoryOverrides:w,fetchBrewingYearlyShipments:v}=await I(async()=>{const{setBrewingCategoryOverride:j,fetchBrewingPlanSummary:N,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:B,fetchBrewingYearlyShipments:R}=await Promise.resolve().then(()=>O);return{setBrewingCategoryOverride:j,fetchBrewingPlanSummary:N,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:B,fetchBrewingYearlyShipments:R}},void 0);await d(l,null);const x=a.brewingPlanFY,[k,C,q,M]=await Promise.all([m(`${x}-10-01`,`${x+1}-09-30`),y(`${x}-10-01`,`${x+1}-09-30`),w(),v()]);a.brewingPlanData=k,a.brewingProductDetail=C,a.brewingOverrides=q,a.brewingYearlyShipments=M,E()})}),(()=>{const o=e.querySelector("#gantt-timeline");if(!o)return;const l=[9,10,11,12,1,2,3,4,5],d=l.length;let m=null,y=null;o.querySelectorAll(".gantt-bar").forEach(q=>{q.style.pointerEvents="auto"});function w(q){return"touches"in q?q.touches[0].clientX:q.clientX}function v(q){const M=q.target,j=M.closest(".gantt-bar");if(!j)return;const N=j.parentElement,z=j.dataset.cat??"",B=parseInt(j.dataset.month??"0"),R=parseInt(j.dataset.dur??"1"),Y=parseInt(j.dataset.vol??"0"),Q=N.offsetWidth/d;let X="move";M.classList.contains("gantt-resize-right")?X="resize-right":M.classList.contains("gantt-resize-left")&&(X="resize-left"),j.style.cursor=X==="move"?"grabbing":"ew-resize",j.style.opacity="0.8",j.style.zIndex="10",m={bar:j,mode:X,cat:z,origMonth:B,origDur:R,origVol:Y,startX:w(q),cellW:Q,origLeftPct:parseFloat(j.style.left),origWidthPct:parseFloat(j.style.width)},q.preventDefault()}function x(q){if(!m)return;const{bar:M,mode:j,origDur:N,startX:z,cellW:B,origLeftPct:R,origWidthPct:Y}=m,Q=w(q)-z,X=Math.round(Q/B),W=Math.round(R/100*d);if(j==="move"){const H=Math.max(0,Math.min(d-N,W+X));M.style.left=(H/d*100).toFixed(2)+"%"}else if(j==="resize-right"){const H=Math.max(1,Math.min(d-W,N+X));M.style.width=(H/d*100).toFixed(2)+"%"}else if(j==="resize-left"){const H=Math.max(0,Math.min(W+N-1,W+X)),G=N-(H-W);M.style.left=(H/d*100).toFixed(2)+"%",M.style.width=(G/d*100).toFixed(2)+"%"}}async function k(q){if(!m)return;const{bar:M,cat:j,origMonth:N,origDur:z,origVol:B}=m,R=Math.round(parseFloat(M.style.left)/100*d),Y=Math.max(1,Math.round(parseFloat(M.style.width)/100*d)),Q=l[Math.max(0,Math.min(d-1,R))];if(M.style.cursor="grab",M.style.opacity="1",M.style.zIndex="",m=null,Q===N&&Y===z)return;const{saveBrewingSchedule:X,fetchBrewingSchedule:W}=await I(async()=>{const{saveBrewingSchedule:G,fetchBrewingSchedule:Z}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:G,fetchBrewingSchedule:Z}},void 0),H=a.brewingSchedule.filter(G=>G.brewCategory===j).map(G=>G.brewMonth===N?{brewMonth:Q,durationMonths:Y,plannedVolumeL:B}:{brewMonth:G.brewMonth,durationMonths:G.durationMonths,plannedVolumeL:G.plannedVolumeL});await X(j,a.brewingPlanFY,H),a.brewingSchedule=await W(a.brewingPlanFY),E()}o.addEventListener("mousedown",v),o.addEventListener("touchstart",v,{passive:!1}),document.addEventListener("mousemove",x),document.addEventListener("touchmove",x,{passive:!1}),document.addEventListener("mouseup",k),document.addEventListener("touchend",k);function C(q){const M=q.dataset.cat??"",j=parseInt(q.dataset.month??"0"),N=parseInt(q.dataset.vol??"0"),z=parseInt(q.dataset.max??"99999"),B=q.querySelector(".gantt-bar-label");if(!B||B.querySelector("input"))return;const R=document.createElement("input");R.type="number",R.min="0",R.max=String(z),R.step="100",R.value=String(N),R.style.cssText="width:60px;height:24px;font-size:12px;text-align:center;border:1px solid #2563eb;border-radius:3px;pointer-events:auto;",B.textContent="",B.style.pointerEvents="auto",B.appendChild(R),R.focus(),R.select();const Y=async()=>{const Q=parseFloat(R.value)||0;if(B.style.pointerEvents="none",B.textContent=L(Math.round(Q))+"L",Math.abs(Q-N)<1)return;const{saveBrewingSchedule:X,fetchBrewingSchedule:W}=await I(async()=>{const{saveBrewingSchedule:G,fetchBrewingSchedule:Z}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:G,fetchBrewingSchedule:Z}},void 0),H=a.brewingSchedule.filter(G=>G.brewCategory===M).map(G=>({brewMonth:G.brewMonth,durationMonths:G.durationMonths,plannedVolumeL:G.brewMonth===j?Q:G.plannedVolumeL}));await X(M,a.brewingPlanFY,H),a.brewingSchedule=await W(a.brewingPlanFY),E()};R.addEventListener("blur",Y),R.addEventListener("keydown",Q=>{Q.key==="Enter"&&R.blur()})}o.addEventListener("dblclick",q=>{const M=q.target.closest(".gantt-bar");M&&C(M)}),o.addEventListener("touchstart",q=>{const M=q.target.closest(".gantt-bar");if(M){if(y){clearTimeout(y),y=null,C(M);return}y=setTimeout(()=>{y=null},300)}},{passive:!0}),o.querySelectorAll(".gantt-bar-container").forEach(q=>{q.style.pointerEvents="auto";const M=async j=>{if(m)return;const N=q.dataset.cat??"",z=parseInt(q.dataset.max??"0"),B=q.getBoundingClientRect(),R=j-B.left,Y=Math.floor(R/(B.width/d)),Q=l[Math.max(0,Math.min(d-1,Y))];if(a.brewingSchedule.some(Z=>Z.brewCategory===N&&Z.brewMonth===Q))return;const X=Math.round(z*.3)||500,{saveBrewingSchedule:W,fetchBrewingSchedule:H}=await I(async()=>{const{saveBrewingSchedule:Z,fetchBrewingSchedule:oe}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:Z,fetchBrewingSchedule:oe}},void 0),G=[...a.brewingSchedule.filter(Z=>Z.brewCategory===N).map(Z=>({brewMonth:Z.brewMonth,durationMonths:Z.durationMonths,plannedVolumeL:Z.plannedVolumeL})),{brewMonth:Q,durationMonths:2,plannedVolumeL:X}];await W(N,a.brewingPlanFY,G),a.brewingSchedule=await H(a.brewingPlanFY),E()};q.addEventListener("click",j=>{j.target.closest(".gantt-bar")||M(j.clientX)})})})();function L(o){return o.toLocaleString("ja-JP")}(()=>{const o=e.querySelector("#bp-gantt");if(!o)return;let l=null;function d(w){const v=w.target,x=v.closest(".bp-gantt-bar");if(!x)return;let k="move";v.classList.contains("bp-gantt-resize-right")?k="resize-right":v.classList.contains("bp-gantt-resize-left")&&(k="resize-left");const C="touches"in w?w.touches[0].clientX:w.clientX;x.style.opacity="0.7",x.style.zIndex="10",l={bar:x,mode:k,stepId:x.dataset.stepId??"",startX:C,origLeft:parseFloat(x.style.left),origWidth:parseFloat(x.style.width)},w.preventDefault()}function m(w){if(!l)return;const x=("touches"in w?w.touches[0].clientX:w.clientX)-l.startX;l.mode==="move"?l.bar.style.left=l.origLeft+x+"px":l.mode==="resize-right"?l.bar.style.width=Math.max(6,l.origWidth+x)+"px":(l.bar.style.left=l.origLeft+x+"px",l.bar.style.width=Math.max(6,l.origWidth-x)+"px")}async function y(){if(!l)return;const{bar:w,stepId:v,origLeft:x,origWidth:k}=l,C=parseFloat(w.style.left),q=parseFloat(w.style.width);w.style.opacity="1",w.style.zIndex="",l=null;const M=Math.round((C-x)/6),j=Math.round((q-k)/6);if(M===0&&j===0)return;const N=w.dataset.plannedStart??"",z=w.dataset.plannedEnd??"";if(!N||!z)return;const B=(U,K)=>{const ae=new Date(U);return ae.setDate(ae.getDate()+K),ae.toISOString().slice(0,10)};let R=N,Y=z;M!==0&&j===0?(R=B(N,M),Y=B(z,M)):j!==0&&M===0?Y=B(z,j):(R=B(N,M),Y=B(z,M+j));const Q=w.dataset.batchId??"",X=parseInt(w.dataset.stepOrder??"0"),{updateBrewingProcessStep:W,fetchBrewingProcessSteps:H}=await I(async()=>{const{updateBrewingProcessStep:U,fetchBrewingProcessSteps:K}=await Promise.resolve().then(()=>O);return{updateBrewingProcessStep:U,fetchBrewingProcessSteps:K}},void 0),G=a.brewingProcessSteps.filter(U=>U.batchId===Q).sort((U,K)=>U.stepOrder-K.stepOrder);await W(v,{planned_start:R,planned_end:Y});let Z=Y;for(const U of G){if(U.stepOrder<=X)continue;const K=Math.max(Math.round((new Date(U.plannedEnd).getTime()-new Date(U.plannedStart).getTime())/864e5),0),ae=B(Z,1),ge=B(ae,K);await W(U.id,{planned_start:ae,planned_end:ge}),Z=ge}let oe=R;for(let U=G.length-1;U>=0;U--){const K=G[U];if(K.stepOrder>=X)continue;const ae=Math.max(Math.round((new Date(K.plannedEnd).getTime()-new Date(K.plannedStart).getTime())/864e5),0),ge=B(oe,-1),pe=B(ge,-ae);await W(K.id,{planned_start:pe,planned_end:ge}),oe=pe}G.map(U=>(U.stepOrder<X&&Math.round((new Date(U.plannedEnd).getTime()-new Date(U.plannedStart).getTime())/864e5),U));const{updateBrewingBatch:J}=await I(async()=>{const{updateBrewingBatch:U}=await Promise.resolve().then(()=>O);return{updateBrewingBatch:U}},void 0);await J(Q,{start_date:G[0].stepOrder<X?B(R,-G.filter(U=>U.stepOrder<X).reduce((U,K)=>U+Math.round((new Date(K.plannedEnd).getTime()-new Date(K.plannedStart).getTime())/864e5)+1,0)):X===1?R:void 0,target_end_date:Z}),a.brewingProcessSteps=await H(a.brewingBatches.map(U=>U.id)),E()}o.addEventListener("mousedown",d),o.addEventListener("touchstart",d,{passive:!1}),document.addEventListener("mousemove",m),document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("mouseup",y),document.addEventListener("touchend",y)})(),e.querySelector("[data-action='bp-auto-schedule']")?.addEventListener("click",async()=>{if(a.brewingBatches.length===0)return;const o=e.querySelector("[data-action='bp-auto-schedule']");o&&(o.textContent="計算中...",o.disabled=!0);const{autoScheduleAllBatches:l,fetchBrewingBatches:d,fetchBrewingProcessSteps:m}=await I(async()=>{const{autoScheduleAllBatches:v,fetchBrewingBatches:x,fetchBrewingProcessSteps:k}=await Promise.resolve().then(()=>O);return{autoScheduleAllBatches:v,fetchBrewingBatches:x,fetchBrewingProcessSteps:k}},void 0),{fetchTanks:y}=await I(async()=>{const{fetchTanks:v}=await Promise.resolve().then(()=>O);return{fetchTanks:v}},void 0),w=await y().catch(()=>[]);await l(a.brewingBatches,a.bpWorkerSettings,a.bpStepLabor,w),a.brewingBatches=await d(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(v=>v.id)):[],E()});for(const o of["bp-worker-count","bp-worker-hours","bp-worker-start"])e.querySelector(`[data-action='${o}']`)?.addEventListener("change",async l=>{const d=parseFloat(l.target.value)||0;o==="bp-worker-count"?a.bpWorkerSettings.workerCount=d:o==="bp-worker-hours"?a.bpWorkerSettings.weeklyHoursLimit=d:a.bpWorkerSettings.dayStartHour=d;const{saveWorkerSettings:m}=await I(async()=>{const{saveWorkerSettings:y}=await Promise.resolve().then(()=>O);return{saveWorkerSettings:y}},void 0);await m(a.bpWorkerSettings),E()});e.querySelector("[data-action='bp-worker-deadline']")?.addEventListener("change",async o=>{a.bpWorkerSettings.deadlineDate=o.target.value;const{saveWorkerSettings:l}=await I(async()=>{const{saveWorkerSettings:d}=await Promise.resolve().then(()=>O);return{saveWorkerSettings:d}},void 0);await l(a.bpWorkerSettings),E()}),e.querySelector("[data-action='bp-worker-sunday']")?.addEventListener("change",async o=>{a.bpWorkerSettings.allowSunday=o.target.checked;const{saveWorkerSettings:l}=await I(async()=>{const{saveWorkerSettings:d}=await Promise.resolve().then(()=>O);return{saveWorkerSettings:d}},void 0);await l(a.bpWorkerSettings),E()}),e.querySelector("[data-action='bp-tank-add']")?.addEventListener("click",async()=>{const o=e.querySelector("#bp-tank-no")?.value?.trim()??"",l=parseFloat(e.querySelector("#bp-tank-cap")?.value??"0"),d=e.querySelector("#bp-tank-cats")?.value?.trim()??"";if(!o||l<=0)return;const m=d?d.split(/[,、]/).map(v=>v.trim()).filter(Boolean):[],{addTank:y,fetchTanks:w}=await I(async()=>{const{addTank:v,fetchTanks:x}=await Promise.resolve().then(()=>O);return{addTank:v,fetchTanks:x}},void 0);await y(o,l,"",m),a.bpTanks=await w(),E()}),e.querySelectorAll("[data-action='bp-tank-delete']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.tankId??"";if(!l)return;const{deleteTank:d,fetchTanks:m}=await I(async()=>{const{deleteTank:y,fetchTanks:w}=await Promise.resolve().then(()=>O);return{deleteTank:y,fetchTanks:w}},void 0);await d(l),a.bpTanks=await m(),E()})}),e.querySelector("[data-action='bp-import-schedule']")?.addEventListener("click",async()=>{const o=e.querySelectorAll("[data-action='bp-import-check']:checked");if(o.length===0)return;const{createBrewingBatch:l,fetchBrewingBatches:d,fetchBrewingProcessSteps:m}=await I(async()=>{const{createBrewingBatch:y,fetchBrewingBatches:w,fetchBrewingProcessSteps:v}=await Promise.resolve().then(()=>O);return{createBrewingBatch:y,fetchBrewingBatches:w,fetchBrewingProcessSteps:v}},void 0);for(const y of o){const w=y.dataset.cat??"",v=y.dataset.code??"",x=parseFloat(y.dataset.vol??"0"),k=y.dataset.date??"";!w||!v||!k||await l(w,v,a.brewingPlanFY,x,k,a.brewingProcessSteps,a.brewingRiceParams)}a.brewingBatches=await d(a.brewingPlanFY),a.brewingBatches.length>0&&(a.brewingProcessSteps=await m(a.brewingBatches.map(y=>y.id))),E()}),e.querySelector("[data-action='bp-show-new-form']")?.addEventListener("click",()=>{a.bpShowNewForm=!a.bpShowNewForm,E()}),e.querySelector("[data-action='bp-create-batch']")?.addEventListener("click",async()=>{const o=e.querySelector("#bp-new-cat")?.value??"",l=e.querySelector("#bp-new-code")?.value?.trim()??"",d=parseFloat(e.querySelector("#bp-new-vol")?.value??"0"),m=e.querySelector("#bp-new-date")?.value??"";if(!o||!l||!m)return;const{createBrewingBatch:y,fetchBrewingBatches:w,fetchBrewingProcessSteps:v}=await I(async()=>{const{createBrewingBatch:x,fetchBrewingBatches:k,fetchBrewingProcessSteps:C}=await Promise.resolve().then(()=>O);return{createBrewingBatch:x,fetchBrewingBatches:k,fetchBrewingProcessSteps:C}},void 0);await y(o,l,a.brewingPlanFY,d,m,a.brewingProcessSteps,a.brewingRiceParams),a.brewingBatches=await w(a.brewingPlanFY),a.brewingProcessSteps=await v(a.brewingBatches.map(x=>x.id)),a.bpShowNewForm=!1,E()}),e.querySelectorAll("[data-action='bp-toggle-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.batchId??"";a.bpExpandedBatchId=a.bpExpandedBatchId===l?"":l,E()})}),e.querySelectorAll("[data-action='bp-step-status']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:d}=await I(async()=>{const{updateBrewingProcessStep:w}=await Promise.resolve().then(()=>O);return{updateBrewingProcessStep:w}},void 0),m={status:o.value};o.value==="進行中"&&!o.dataset.actualStart&&(m.actual_start=new Date().toISOString().split("T")[0]),o.value==="完了"&&!o.dataset.actualEnd&&(m.actual_end=new Date().toISOString().split("T")[0]),await d(l,m);const{fetchBrewingProcessSteps:y}=await I(async()=>{const{fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>O);return{fetchBrewingProcessSteps:w}},void 0);a.brewingProcessSteps=await y(a.brewingBatches.map(w=>w.id)),E()})}),e.querySelectorAll("[data-action='bp-step-temp']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:d}=await I(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>O);return{updateBrewingProcessStep:m}},void 0);await d(l,{temperature:parseFloat(o.value)||null})})}),e.querySelectorAll("[data-action='bp-step-notes']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:d}=await I(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>O);return{updateBrewingProcessStep:m}},void 0);await d(l,{notes:o.value})})});let S="";e.querySelectorAll("[data-action='bp-show-delete-modal']").forEach(o=>{o.addEventListener("click",()=>{S=o.dataset.batchId??"";const l=e.querySelector("#bp-delete-modal"),d=e.querySelector("#bp-delete-batch-name");l&&(l.style.display="flex"),d&&(d.textContent=o.dataset.batchCode??"")})}),e.querySelector("[data-action='bp-delete-cancel']")?.addEventListener("click",()=>{const o=e.querySelector("#bp-delete-modal");o&&(o.style.display="none"),S=""}),e.querySelector("[data-action='bp-delete-confirm']")?.addEventListener("click",async()=>{if(!S)return;const o=e.querySelector("#bp-delete-modal");o&&(o.style.display="none");const{supabaseDelete:l}=await I(async()=>{const{supabaseDelete:y}=await Promise.resolve().then(()=>te);return{supabaseDelete:y}},void 0);await l("brewing_process_batches",S);const{fetchBrewingBatches:d,fetchBrewingProcessSteps:m}=await I(async()=>{const{fetchBrewingBatches:y,fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>O);return{fetchBrewingBatches:y,fetchBrewingProcessSteps:w}},void 0);a.brewingBatches=await d(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(y=>y.id)):[],a.bpExpandedBatchId="",S="",E()}),e.querySelector("#bp-delete-modal")?.addEventListener("click",o=>{o.target===o.currentTarget&&(o.currentTarget.style.display="none",S="")}),e.querySelectorAll("[data-action='bp-batch-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:d}=await I(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>O);return{updateBrewingBatch:m}},void 0);await d(l,{planned_volume_l:parseFloat(o.value)||0})})}),e.querySelectorAll("[data-action='bp-batch-date']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:d}=await I(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>O);return{updateBrewingBatch:m}},void 0);await d(l,{start_date:o.value})})}),e.querySelectorAll("[data-action='bp-batch-status']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:d,fetchBrewingBatches:m,fetchBrewingProcessSteps:y}=await I(async()=>{const{updateBrewingBatch:w,fetchBrewingBatches:v,fetchBrewingProcessSteps:x}=await Promise.resolve().then(()=>O);return{updateBrewingBatch:w,fetchBrewingBatches:v,fetchBrewingProcessSteps:x}},void 0);await d(l,{status:o.value}),a.brewingBatches=await m(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await y(a.brewingBatches.map(w=>w.id)):[],E()})}),e.querySelectorAll("[data-action='proc-add-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=e.querySelector(`[data-action='proc-add-month-select'][data-cat='${l}']`),m=e.querySelector(`[data-action='proc-add-month-vol'][data-cat='${l}']`),y=parseInt(d?.value??"0"),w=parseFloat(m?.value??"0");if(!l||!y||w<=0)return;const x=[...a.brewingSchedule.filter(q=>q.brewCategory===l).map(q=>({brewMonth:q.brewMonth,durationMonths:q.durationMonths,plannedVolumeL:q.plannedVolumeL})),{brewMonth:y,durationMonths:2,plannedVolumeL:w}],{saveBrewingSchedule:k,fetchBrewingSchedule:C}=await I(async()=>{const{saveBrewingSchedule:q,fetchBrewingSchedule:M}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:q,fetchBrewingSchedule:M}},void 0);await k(l,a.brewingPlanFY,x),a.brewingSchedule=await C(a.brewingPlanFY),E()})}),e.querySelectorAll("[data-action='proc-remove-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=parseInt(o.dataset.month??"0");if(!l||!d)return;const m=a.brewingSchedule.filter(v=>v.brewCategory===l&&v.brewMonth!==d).map(v=>({brewMonth:v.brewMonth,durationMonths:v.durationMonths,plannedVolumeL:v.plannedVolumeL})),{saveBrewingSchedule:y,fetchBrewingSchedule:w}=await I(async()=>{const{saveBrewingSchedule:v,fetchBrewingSchedule:x}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:v,fetchBrewingSchedule:x}},void 0);await y(l,a.brewingPlanFY,m),a.brewingSchedule=await w(a.brewingPlanFY),E()})}),e.querySelectorAll("[data-action='proc-sched-remove']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=parseInt(o.dataset.month??"0");if(!l||!d)return;const m=a.brewingSchedule.filter(v=>v.brewCategory===l&&v.brewMonth!==d).map(v=>({brewMonth:v.brewMonth,durationMonths:v.durationMonths,plannedVolumeL:v.plannedVolumeL})),{saveBrewingSchedule:y,fetchBrewingSchedule:w}=await I(async()=>{const{saveBrewingSchedule:v,fetchBrewingSchedule:x}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:v,fetchBrewingSchedule:x}},void 0);await y(l,a.brewingPlanFY,m),a.brewingSchedule=await w(a.brewingPlanFY),E()})}),e.querySelectorAll("[data-action='proc-sched-edit-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=parseInt(o.dataset.month??"0"),m=parseFloat(o.value)||0;if(!l||!d)return;const y=a.brewingSchedule.filter(x=>x.brewCategory===l).map(x=>({brewMonth:x.brewMonth,durationMonths:x.durationMonths,plannedVolumeL:x.brewMonth===d?m:x.plannedVolumeL})),{saveBrewingSchedule:w,fetchBrewingSchedule:v}=await I(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:k}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:x,fetchBrewingSchedule:k}},void 0);await w(l,a.brewingPlanFY,y),a.brewingSchedule=await v(a.brewingPlanFY),E()})}),e.querySelectorAll("[data-action='proc-edit-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=parseFloat(o.value)||0;if(!l)return;const{saveProcurementDecision:m}=await I(async()=>{const{saveProcurementDecision:y}=await Promise.resolve().then(()=>O);return{saveProcurementDecision:y}},void 0);await m(l,a.brewingPlanFY,d),a.procurementDecisions[l]=d,E()})}),e.querySelector("[data-action='proc-add-commitment']")?.addEventListener("click",async()=>{const o=(e.querySelector("#proc-commit-variety")?.value??"").trim(),l=parseFloat(e.querySelector("#proc-commit-bales")?.value??"0"),d=parseFloat(e.querySelector("#proc-commit-price")?.value??"0"),m=parseInt(e.querySelector("#proc-commit-month")?.value??"0")||null,y=(e.querySelector("#proc-commit-supplier")?.value??"").trim();if(!o||l<=0)return;const{saveRicePurchaseCommitment:w,fetchRicePurchaseCommitments:v}=await I(async()=>{const{saveRicePurchaseCommitment:x,fetchRicePurchaseCommitments:k}=await Promise.resolve().then(()=>O);return{saveRicePurchaseCommitment:x,fetchRicePurchaseCommitments:k}},void 0);await w({varietyName:o,committedBales:l,pricePerKg:d,deliveryMonth:m,supplier:y,fy:a.brewingPlanFY}),a.ricePurchaseCommitments=await v(a.brewingPlanFY),E()}),e.querySelector("[data-action='proc-add-variety']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-variety-name"),l=e.querySelector("#proc-variety-price"),d=o?.value.trim()??"",m=parseFloat(l?.value??"400")||400;if(!d)return;const{addRiceVariety:y,fetchRiceVarieties:w}=await I(async()=>{const{addRiceVariety:x,fetchRiceVarieties:k}=await Promise.resolve().then(()=>O);return{addRiceVariety:x,fetchRiceVarieties:k}},void 0);await y(d,m)&&(a.riceVarieties=await w(),o&&(o.value=""),l&&(l.value=""),F(`「${d}」を追加しました`)),E()}),e.querySelectorAll("[data-action='proc-delete-variety']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",{deleteRiceVariety:d,fetchRiceVarieties:m}=await I(async()=>{const{deleteRiceVariety:w,fetchRiceVarieties:v}=await Promise.resolve().then(()=>O);return{deleteRiceVariety:w,fetchRiceVarieties:v}},void 0);await d(l)&&(a.riceVarieties=await m()),E()})}),e.querySelectorAll("[data-action='brew-rice-variety-select']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=o.dataset.field??"",m=o.value;if(!l||!d)return;const y=a.brewingRiceParams[l]??{brewCategory:l,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};y[d]=m;const w=a.riceVarieties.find(x=>x.name===m);w&&(d==="kojiVariety"&&(y.kojiPricePerKg=w.defaultPricePerKg),d==="kakeVariety"&&(y.kakePricePerKg=w.defaultPricePerKg)),a.brewingRiceParams[l]=y;const{saveBrewingRiceParams:v}=await I(async()=>{const{saveBrewingRiceParams:x}=await Promise.resolve().then(()=>O);return{saveBrewingRiceParams:x}},void 0);await v(l,y),E()})}),e.querySelector("[data-action='proc-add-new-cat']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-new-cat-name"),l=e.querySelector("#proc-new-cat-vol"),d=o?.value.trim()??"",m=parseFloat(l?.value??"0");if(!d){F("区分名を入力してください","warning");return}if(m<=0){F("醸造予定量を入力してください","warning");return}const{saveBrewingSchedule:y,fetchBrewingSchedule:w}=await I(async()=>{const{saveBrewingSchedule:v,fetchBrewingSchedule:x}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:v,fetchBrewingSchedule:x}},void 0);await y(d,a.brewingPlanFY,[{brewMonth:10,durationMonths:2,plannedVolumeL:m}]),a.brewingSchedule=await w(a.brewingPlanFY),o&&(o.value=""),l&&(l.value=""),F(`「${d}」を追加しました`),E()}),e.querySelector("[data-action='brew-rice-bulk-apply']")?.addEventListener("click",async()=>{const o=parseFloat(e.querySelector("#rice-bulk-per-l")?.value??"0.50"),l=parseFloat(e.querySelector("#rice-bulk-koji")?.value??"0.30");if(isNaN(o)||isNaN(l))return;const{saveBrewingRiceParams:d}=await I(async()=>{const{saveBrewingRiceParams:w}=await Promise.resolve().then(()=>O);return{saveBrewingRiceParams:w}},void 0),m=Object.keys(a.brewingRiceParams),y=new Set([...m,...a.brewingYearlyShipments.map(w=>w.brewCategory)]);for(const w of y){const v=a.brewingRiceParams[w]??{brewCategory:w,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};v.ricePerLiterKg=o,v.kojiRatio=l,a.brewingRiceParams[w]=v,await d(w,v)}E()}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=o.dataset.field??"",m=parseFloat(o.value);if(!l||!d||isNaN(m))return;const y=a.brewingRiceParams[l]??{brewCategory:l,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};y[d]=m,a.brewingRiceParams[l]=y;const{saveBrewingRiceParams:w}=await I(async()=>{const{saveBrewingRiceParams:v}=await Promise.resolve().then(()=>O);return{saveBrewingRiceParams:v}},void 0);await w(l,y),E()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=parseFloat(o.value);if(!l)return;const{saveBrewingForecastOverride:m}=await I(async()=>{const{saveBrewingForecastOverride:y}=await Promise.resolve().then(()=>O);return{saveBrewingForecastOverride:y}},void 0);if(isNaN(d))await m(l,null),delete a.brewingForecastOverrides[l];else{const y=d/100;await m(l,y),a.brewingForecastOverrides[l]=y}E()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d="bc-"+encodeURIComponent(l).replace(/%/g,"-"),m=e.querySelector(`#alc-raw-${d}`),y=e.querySelector(`#alc-target-${d}`),w=parseFloat(m?.value??"18")||18,v=parseFloat(y?.value??"15")||15,{saveBrewingAlcoholSetting:x}=await I(async()=>{const{saveBrewingAlcoholSetting:C}=await Promise.resolve().then(()=>O);return{saveBrewingAlcoholSetting:C}},void 0);await x(l,w,v)&&(a.brewingAlcoholSettings[l]={brewCategory:l,rawAlcoholPct:w,targetAlcoholPct:v}),E()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",d=o.value,m=o.dataset.current??"";if(d===m)return;const{setBrewingCategoryOverride:y,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:v,fetchBrewingCategoryOverrides:x}=await I(async()=>{const{setBrewingCategoryOverride:C,fetchBrewingPlanSummary:q,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:j}=await Promise.resolve().then(()=>O);return{setBrewingCategoryOverride:C,fetchBrewingPlanSummary:q,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:j}},void 0);if(await y(l,d)){const C=a.brewingPlanFY,[q,M,j]=await Promise.all([w(`${C}-10-01`,`${C+1}-09-30`),v(`${C}-10-01`,`${C+1}-09-30`),x()]);a.brewingPlanData=q,a.brewingProductDetail=M,a.brewingOverrides=j}E()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=o.value;if(!l||!d)return;const{linkTypeToCategory:m,fetchBrewingPlanSummary:y,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:v,fetchCategoryTypeLinks:x}=await I(async()=>{const{linkTypeToCategory:N,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:R,fetchCategoryTypeLinks:Y}=await Promise.resolve().then(()=>O);return{linkTypeToCategory:N,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:R,fetchCategoryTypeLinks:Y}},void 0);await m(l,d);const k=a.brewingPlanFY,[C,q,M,j]=await Promise.all([y(`${k}-10-01`,`${k+1}-09-30`),w(`${k}-10-01`,`${k+1}-09-30`),v(),x()]);a.brewingPlanData=C,a.brewingProductDetail=q,a.brewingOverrides=M,a.brewingTypeLinks=j,E()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=o.dataset.type??"";if(!l||!d)return;const{unlinkTypeFromCategory:m,fetchBrewingPlanSummary:y,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:v,fetchCategoryTypeLinks:x}=await I(async()=>{const{unlinkTypeFromCategory:N,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:R,fetchCategoryTypeLinks:Y}=await Promise.resolve().then(()=>O);return{unlinkTypeFromCategory:N,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:R,fetchCategoryTypeLinks:Y}},void 0);await m(l,d);const k=a.brewingPlanFY,[C,q,M,j]=await Promise.all([y(`${k}-10-01`,`${k+1}-09-30`),w(`${k}-10-01`,`${k+1}-09-30`),v(),x()]);a.brewingPlanData=C,a.brewingProductDetail=q,a.brewingOverrides=M,a.brewingTypeLinks=j,E()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const o=e.querySelector("#brew-new-category-name"),l=e.querySelector("#brew-new-category-parent"),d=o?.value.trim()??"",m=l?.value??"";if(!d)return;if(!m){F("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map(x=>x.name)].includes(d)){F("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:w}=await I(async()=>{const{addBrewingCustomCategory:x}=await Promise.resolve().then(()=>O);return{addBrewingCustomCategory:x}},void 0);await w(d,m)?(a.brewingCustomCategories.push({name:d,parentCategory:m}),o&&(o.value=""),F(`「${d}」を追加しました（${m}系）`)):F("追加に失敗しました","error"),E()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"";if(!l)return;const{deleteBrewingCustomCategory:d,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:y}=await I(async()=>{const{deleteBrewingCustomCategory:v,fetchBrewingPlanSummary:x,fetchBrewingProductDetail:k}=await Promise.resolve().then(()=>O);return{deleteBrewingCustomCategory:v,fetchBrewingPlanSummary:x,fetchBrewingProductDetail:k}},void 0);if(await d(l)){a.brewingCustomCategories=a.brewingCustomCategories.filter(C=>C.name!==l);for(const[C,q]of Object.entries(a.brewingOverrides))q===l&&delete a.brewingOverrides[C];const v=a.brewingPlanFY,[x,k]=await Promise.all([m(`${v}-10-01`,`${v+1}-09-30`),y(`${v}-10-01`,`${v+1}-09-30`)]);a.brewingPlanData=x,a.brewingProductDetail=k,F(`「${l}」を削除しました`)}E()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=o.dataset.catId??"",y=e.querySelector(`#new-entry-target-${d}`)?.value??l,w=e.querySelector(`#new-entry-label-${d}`),v=e.querySelector(`#new-entry-vol-${d}`),x=w?.value.trim()??"",k=parseFloat(v?.value??"0");if(k<=0)return;const{addBrewingStockEntry:C,fetchBrewingPlanSummary:q,fetchAllBrewingStockEntries:M}=await I(async()=>{const{addBrewingStockEntry:N,fetchBrewingPlanSummary:z,fetchAllBrewingStockEntries:B}=await Promise.resolve().then(()=>O);return{addBrewingStockEntry:N,fetchBrewingPlanSummary:z,fetchAllBrewingStockEntries:B}},void 0);if(await C(y,x||`タンク${a.brewingStockEntries.filter(N=>N.brewCategory===y).length+1}`,k)){const N=a.brewingPlanFY,[z,B]=await Promise.all([q(`${N}-10-01`,`${N+1}-09-30`),M()]);a.brewingPlanData=z,a.brewingStockEntries=B}E(),requestAnimationFrame(()=>{const N=document.getElementById(`stock-display-${d}`),z=document.getElementById(`stock-edit-${d}`),B=document.querySelector(`.btn-edit-stock[data-cat-id="${d}"]`);N&&(N.style.display="none"),z&&(z.style.display=""),B&&(B.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.id??"",d=o.value;if(!l||!d)return;const{reassignBrewingStockEntry:m,fetchBrewingPlanSummary:y,fetchAllBrewingStockEntries:w}=await I(async()=>{const{reassignBrewingStockEntry:x,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:C}=await Promise.resolve().then(()=>O);return{reassignBrewingStockEntry:x,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:C}},void 0);if(await m(l,d)){const x=a.brewingPlanFY,[k,C]=await Promise.all([y(`${x}-10-01`,`${x+1}-09-30`),w()]);a.brewingPlanData=k,a.brewingStockEntries=C}E(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach(x=>{const k=document.getElementById(`stock-display-${x.dataset.catId}`),C=document.getElementById(`stock-edit-${x.dataset.catId}`);C&&C.querySelector(`[data-id="${l}"]`)&&(k&&(k.style.display="none"),C.style.display="",x.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=o.dataset.cat??"",m="bc-"+encodeURIComponent(d).replace(/%/g,"-"),{deleteBrewingStockEntry:y,fetchBrewingPlanSummary:w,fetchAllBrewingStockEntries:v}=await I(async()=>{const{deleteBrewingStockEntry:k,fetchBrewingPlanSummary:C,fetchAllBrewingStockEntries:q}=await Promise.resolve().then(()=>O);return{deleteBrewingStockEntry:k,fetchBrewingPlanSummary:C,fetchAllBrewingStockEntries:q}},void 0);if(await y(l)){const k=a.brewingPlanFY,[C,q]=await Promise.all([w(`${k}-10-01`,`${k+1}-09-30`),v()]);a.brewingPlanData=C,a.brewingStockEntries=q}E(),requestAnimationFrame(()=>{const k=document.getElementById(`stock-display-${m}`),C=document.getElementById(`stock-edit-${m}`),q=document.querySelector(`.btn-edit-stock[data-cat-id="${m}"]`);k&&(k.style.display="none"),C&&(C.style.display=""),q&&(q.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",d=e.querySelector(`#stock-display-${l}`),m=e.querySelector(`#stock-edit-${l}`);d&&(d.style.display="none"),m&&(m.style.display=""),o.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",d=e.querySelector(`#stock-display-${l}`),m=e.querySelector(`#stock-edit-${l}`),y=e.querySelector(`.btn-edit-stock[data-cat-id="${l}"]`);d&&(d.style.display=""),m&&(m.style.display="none"),y&&(y.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",d=e.querySelector(`#schedule-rows-${l}`);if(!d)return;const m=d.querySelectorAll(".schedule-edit-row").length,y=document.createElement("div");y.innerHTML=buildScheduleEditRowHTML(l,m,9,2,0,"");const w=y.firstElementChild;d.appendChild(w),w.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>w.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(o=>{o.addEventListener("click",()=>o.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=o.dataset.catId??"",m=e.querySelector(`#stock-input-${d}`),y=parseFloat(m?.value??"");if(isNaN(y)||y<0){alert("有効な数値を入力してください");return}o.textContent="保存中...",o.setAttribute("disabled","true");try{const{upsertBrewingStock:w,fetchBrewingPlanSummary:v,fetchBrewingMonthlyTrend:x}=await I(async()=>{const{upsertBrewingStock:M,fetchBrewingPlanSummary:j,fetchBrewingMonthlyTrend:N}=await Promise.resolve().then(()=>O);return{upsertBrewingStock:M,fetchBrewingPlanSummary:j,fetchBrewingMonthlyTrend:N}},void 0),k=a.brewingPlanFY;await w(l,y,0);const[C,q]=await Promise.all([v(`${k}-10-01`,`${k+1}-09-30`),x(`${k}-10-01`,`${k+1}-09-30`)]);a.brewingPlanData=C,a.brewingMonthlyTrend=q,E()}catch(w){console.error("[brewing save]",w),alert(`保存エラー: ${String(w)}`),o.textContent="保存",o.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.toggleCat??"",d=`sub-row-${"bc-"+encodeURIComponent(l).replace(/%/g,"-")}`,m=e.querySelectorAll(`.${d}`),y=o.querySelector(".toggle-icon"),w=m[0]?.style.display!=="none";m.forEach(v=>{v.style.display=w?"none":""}),y&&(y.innerHTML=w?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{F("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{F("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(o=>{o.addEventListener("click",()=>{F("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{F("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(o=>{o.addEventListener("click",async()=>{await Ee("この買掛を入金済みにしますか？")&&F("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(o=>{o.addEventListener("click",()=>{F("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{F("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.closest("tr")?.querySelector("td")?.textContent??"";F(`タンク ${l} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{F("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.closest("tr")?.querySelector("td")?.textContent??"";F(`注文 ${l} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{F("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(o=>{o.addEventListener("click",()=>{F("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{F("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.customer??"";F(`得意先 ${l} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{F("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!o||!await Ee("このリストを削除しますか？"))return;const{supabaseDelete:d}=await I(async()=>{const{supabaseDelete:y}=await Promise.resolve().then(()=>te);return{supabaseDelete:y}},void 0);if(await d("lead_lists",o)){const{fetchLeadLists:y}=await I(async()=>{const{fetchLeadLists:w}=await Promise.resolve().then(()=>O);return{fetchLeadLists:w}},void 0);a.leadLists=await y(),F("削除しました","success"),E()}else F("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{F("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.scYm;if(!l)return;a.shipmentCalendarYearMonth=l,a.shipmentCalendarData=null,a.shipmentCalendarSelectedDate=null,E();const{fetchShipmentCalendar:d}=await I(async()=>{const{fetchShipmentCalendar:m}=await Promise.resolve().then(()=>O);return{fetchShipmentCalendar:m}},void 0);a.shipmentCalendarData=await d(l),E()})}),e.querySelectorAll("[data-sc-date]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.scDate;l!==void 0&&(a.shipmentCalendarSelectedDate=l?a.shipmentCalendarSelectedDate===l?null:l:null,E())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(o=>{o.addEventListener("click",async()=>{a.calendarYearMonth=o.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:l}=await I(async()=>{const{fetchCalendarEvents:d}=await Promise.resolve().then(()=>O);return{fetchCalendarEvents:d}},void 0);a.calendarEvents=await l(a.calendarYearMonth),E()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async o=>{a.calendarYearMonth=o.target.value;const{fetchCalendarEvents:l}=await I(async()=>{const{fetchCalendarEvents:d}=await Promise.resolve().then(()=>O);return{fetchCalendarEvents:d}},void 0);a.calendarEvents=await l(a.calendarYearMonth),E()}),e.querySelector("#cal-filter-category")?.addEventListener("change",o=>{a.calendarFilterCategory=o.target.value,E()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const o=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(o.getTime()+3600*1e3).toISOString(),isAllDay:!1}},E()}),e.querySelectorAll("[data-cal-date]").forEach(o=>{o.tagName!=="BUTTON"&&o.addEventListener("click",l=>{if(l.target.closest(".cal-event"))return;const d=o.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${d}T10:00:00`,isAllDay:!1}},E()})}),e.querySelectorAll("[data-cal-event-id]").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const d=o.dataset.calEventId,m=a.calendarEvents.find(y=>y.id===d);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},E())})}),e.querySelectorAll("[data-action='cal-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.calendarEdit=null,E())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:o,fetchCalendarEvents:l,CALENDAR_CATEGORY_COLORS:d}=await I(async()=>{const{saveCalendarEvent:x,fetchCalendarEvents:k,CALENDAR_CATEGORY_COLORS:C}=await Promise.resolve().then(()=>O);return{saveCalendarEvent:x,fetchCalendarEvents:k,CALENDAR_CATEGORY_COLORS:C}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,y=e.querySelector("#cal-category")?.value??"general",w={id:m,title:e.querySelector("#cal-title")?.value??"",category:y,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:d[y]};if(!w.title){F("タイトルは必須です","warning");return}await o(w)?(a.calendarEvents=await l(a.calendarYearMonth),a.calendarEdit=null,F("保存しました"),E()):F("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!o||!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:l,fetchCalendarEvents:d}=await I(async()=>{const{deleteCalendarEvent:y,fetchCalendarEvents:w}=await Promise.resolve().then(()=>O);return{deleteCalendarEvent:y,fetchCalendarEvents:w}},void 0);await l(o)?(a.calendarEvents=await d(a.calendarYearMonth),a.calendarEdit=null,F("削除しました"),E()):F("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,E();try{const o=a.importPreview.rows.filter(d=>d._valid),l=await $o(a.importEntity,o);a.importResult=`取り込み完了: ${l.inserted}件成功 / ${l.failed}件失敗`,a.importPreview=null}catch(o){a.importResult=`エラー: ${o instanceof Error?o.message:String(o)}`}finally{a.importing=!1,E()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const o=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=o,a.storeSales=[],a.actionLoading=!0,E(),nn(o).then(l=>{a.storeSales=l,a.actionLoading=!1,E()})}),e.querySelectorAll("[data-action='copy-config']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.configValue??"";if(l)try{await navigator.clipboard.writeText(l),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(d){console.warn("Clipboard copy failed",d)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const l=JSON.stringify({supabase_url:ve,supabase_anon_key:ce,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),d=new Blob([l],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(d),y=document.createElement("a");y.href=m,y.download="relay_config.json",y.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.code??"";if(l)try{await navigator.clipboard.writeText(decodeURIComponent(l)),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(d){console.warn("Clipboard code copy failed",d)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(o=>{o.addEventListener("change",()=>{We(e),a.emailSaveMessage=null,E()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(o=>{o.addEventListener("change",()=>{We(e),a.emailSaveMessage=null,E()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{We(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{We(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(o=>{o.addEventListener("click",()=>{a.emailTemplateId=o.dataset.templateId??"custom";const l=Lo(a.emailTemplateId);a.emailSubject=l.subject,a.emailBody=l.body,a.emailSaveMessage=null,E()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{We(e);const o=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${o}`),a.emailSaveMessage=null,E()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{We(e),a.actionLoading=!0,E(),Jt(Ea("draft")).then(o=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(o.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,E()})}),e.querySelector("#email-sender")?.addEventListener("change",o=>{a.emailSenderId=o.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{We(e),a.actionLoading=!0,a.emailSending=!0,E();const o=Ea("sent");a.mailSenders.find(l=>l.id===a.emailSenderId),js().then(async l=>{await Jt({...o,recipientCount:l.sent}),a.emailSaveMessage=`${l.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,E(),F(`${l.sent}件送信完了`)}).catch(async()=>{await Jt(Ea("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,E(),F("APIキー未設定のため下書き保存しました","warning")})}),e.querySelectorAll(".feature-checkbox").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.featureId;if(!l)return;const d=a.myProfile?.name??a.myProfile?.email??"不明";o.checked?await Gs(l,d):await Xs(l),a.featureStatuses=await aa(),E()})})}function E(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=tm()}catch(s){console.error("[renderApp] render error:",s),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(s)}

${s?.stack??""}</div>`;return}const t=e.querySelector(".app-page-title");document.title=t?.textContent?`${t.textContent} | 酒仙iクラウド`:"酒仙iクラウド",sm(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),fn()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const s of["fd-scaler","print-scaler","q-preview-scaler"]){const r=e.querySelector(`#${s}`),i=r?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),c=i?.querySelector(".print-page")??i;if(!r||!c)continue;const p=r.parentElement?.clientWidth??0,u=c.offsetWidth;if(p>0&&u>0&&u>p-24){const h=(p-24)/u;r.style.transform=`scale(${h})`,r.style.transformOrigin="top left",r.style.height=`${(c.offsetHeight+48)*h}px`}else r.style.transform="",r.style.height=""}});const n=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=n?"hidden":"",document.body.style.touchAction=n?"none":""}const Mo="sake-cloud-cache",om=300*1e3;function rm(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(Mo,JSON.stringify(e))}catch{}}function im(){try{const e=localStorage.getItem(Mo);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>om?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let Ro=0;async function it(){const e=im();e&&(a.loading=!1,E()),a.loading=!e,e||E();try{const[t,n,s,r,i,c,p]=await Promise.all([us(),ms(),Ha(),ys(),kt(a.invoiceFilter),Wa(),ps("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=s,a.pipelineMeta=r,a.invoiceRecords=i,a.salesAnalytics=c,p){const u={...Ht,...Na(),...p};a.quoteCompanySettings=u,Xe(u)}if(rt.length===0&&Ou(),!a.salesFilter.startDate||!a.salesFilter.endDate){const h=[...t.salesRecords].sort(($,A)=>new Date(A.date).getTime()-new Date($.date).getTime())[0]?.date??new Date().toISOString(),f=new Date(h),g=new Date(f);g.setDate(f.getDate()-30),a.salesFilter={startDate:ns(g.toISOString()),endDate:ns(f.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await kt(a.invoiceFilter)),a.error=null,rm()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,E(),Et(a.route),Ro=Date.now()}}window.addEventListener("popstate",()=>{a.route=Co(location.pathname),a.currentCategory=gn(a.route),a.sidebarOpen=!1,Pt(),Et(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,E();return}if(e.key==="Escape"){if(a.globalSearchOpen){Pt(),E();return}if(a.pickerMode){oa(),E();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Do(),E());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&To(t)}});a.user=ra()?Yo():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await I(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>O);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),E()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,s=0,r=0,i=0,c=1;document.addEventListener("mousedown",p=>{const u=p.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;p.preventDefault();const h=u.closest(".fd-canvas");if(!h)return;const f=h.getBoundingClientRect();if(f.width===0)return;c=228.6/f.width,t=u,n=p.clientX,s=p.clientY,r=parseFloat(u.style.left)||0,i=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(_=>_.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const g=document.querySelector("#fd-selected-info");g&&(g.textContent=`選択中: ${u.title}`);const $=document.querySelector("#fd-sel-x"),A=document.querySelector("#fd-sel-y");$&&($.value=String(r)),A&&(A.value=String(i))}),document.addEventListener("mousemove",p=>{if(!t)return;const u=(p.clientX-n)*c,h=(p.clientY-s)*c,f=Math.round((r+u)*2)/2,g=Math.round((i+h)*2)/2;t.style.left=f+"mm",t.style.top=g+"mm";const $=document.querySelector("#fd-sel-x"),A=document.querySelector("#fd-sel-y");$&&($.value=String(f)),A&&(A.value=String(g))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",p=>{if(!a.fdDesignMode||!a.fdActiveFieldId||p.key!=="ArrowLeft"&&p.key!=="ArrowRight"&&p.key!=="ArrowUp"&&p.key!=="ArrowDown"||p.target.tagName==="INPUT"||p.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;p.preventDefault();const h=.5;let f=parseFloat(u.style.left)||0,g=parseFloat(u.style.top)||0;p.key==="ArrowLeft"?f-=h:p.key==="ArrowRight"?f+=h:p.key==="ArrowUp"?g-=h:p.key==="ArrowDown"&&(g+=h),u.style.left=f+"mm",u.style.top=g+"mm";const $=document.querySelector("#fd-sel-x"),A=document.querySelector("#fd-sel-y");$&&($.value=String(f)),A&&(A.value=String(g))})})();let La=null,Ut=[],os=null;function lm(e){const t=window.google?.maps;if(!t){console.warn("Google Maps not loaded");return}const n=e.querySelector("#customer-map"),s=e.querySelector("#map-data");if(!n||!s)return;const r=JSON.parse(decodeURIComponent(s.dataset.customers??"[]")),i=JSON.parse(decodeURIComponent(s.dataset.deliveries??"[]"));La||(La=new t.Map(n,{center:{lat:35.38,lng:139.25},zoom:10,gestureHandling:"greedy",streetViewControl:!1,mapTypeControl:!1}),os=new t.InfoWindow);const c=La,p=os;function u($){return $.isAtRisk?"#e53e3e":$.isDormant?"#dd6b20":$.amount12m>0?"#2563eb":"#aaa"}function h($,A=32){const _=`<svg xmlns="http://www.w3.org/2000/svg" width="${A}" height="${A}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${$}" stroke="white" stroke-width="2.5"/></svg>`;return{url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(_),scaledSize:new t.Size(A,A),anchor:new t.Point(A/2,A/2)}}function f(){Ut.forEach($=>$.setMap(null)),Ut=[]}function g($,A,_){f();const D=new t.LatLngBounds;let P=!1;r.filter(S=>!($==="at-risk"&&!S.isAtRisk||$==="dormant"&&(S.isAtRisk||!S.isDormant)||$==="active"&&(S.isAtRisk||S.isDormant||S.amount12m===0)||$==="inactive"&&(S.isAtRisk||S.isDormant||S.amount12m>0)||A&&S.areaCode!==A||_&&(S.businessTypeName||S.businessType)!==_)).forEach(S=>{if(!S.lat||!S.lng)return;const o={lat:S.lat,lng:S.lng};D.extend(o),P=!0;const l=new t.Marker({map:c,position:o,icon:h(u(S),28),title:S.name});l.addListener("click",()=>{p.setContent(`<div style="font-size:13px;max-width:260px;">
          <strong>${S.name}</strong><br>${S.address1??""}<br>
          エリア: ${S.areaCode??"―"} / ${S.businessTypeName??S.businessType??"―"}<br>
          12ヶ月売上: <strong>${S.amount12m?.toLocaleString()??0}円</strong></div>`),p.open(c,l)}),Ut.push(l)}),i.forEach(S=>{if(!S.lat||!S.lng)return;const o={lat:S.lat,lng:S.lng};D.extend(o),P=!0;const l=new t.Marker({map:c,position:o,icon:h("#FF9800",22),title:S.name});l.addListener("click",()=>{p.setContent(`<div style="font-size:13px;"><strong>${S.name}</strong><br>${S.address??""}${S.phone?`<br>${S.phone}`:""}</div>`),p.open(c,l)}),Ut.push(l)}),P&&c.fitBounds(D,{top:40,bottom:40,left:40,right:40})}g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz),e.querySelectorAll("[data-map-status]").forEach($=>{$.addEventListener("click",()=>{const A=$.dataset.mapStatus;a.mapFilters={...a.mapFilters,filterStatus:A},e.querySelectorAll("[data-map-status]").forEach(_=>{_.className=_.className.replace(/\b(primary|secondary)\b/g,_===$?"primary":"secondary")}),g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)})}),e.querySelector("#map-filter-area")?.addEventListener("change",$=>{a.mapFilters={...a.mapFilters,filterArea:$.target.value},g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#map-filter-biz")?.addEventListener("change",$=>{a.mapFilters={...a.mapFilters,filterBiz:$.target.value},g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#btn-geocode")?.addEventListener("click",async()=>{const $=e.querySelector("#btn-geocode"),A=e.querySelector("#geocode-progress"),_=e.querySelector("#geocode-status"),D=e.querySelector("#geocode-bar");$&&($.disabled=!0),A&&(A.style.display="block");try{const{batchGeocode:P}=await I(async()=>{const{batchGeocode:S}=await Promise.resolve().then(()=>O);return{batchGeocode:S}},void 0),L=await P((S,o,l)=>{_&&(_.textContent=`${S}/${o} — ${l}`),D&&(D.style.width=`${Math.round(S/Math.max(o,1)*100)}%`)});_&&(_.textContent=`完了: ${L.success}件成功 / ${L.failed}件失敗`),D&&(D.style.width="100%"),setTimeout(()=>{window.location.reload()},3e3)}catch(P){_&&(_.textContent="エラーが発生しました: "+String(P))}})}it();const cm=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&it()},cm);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-Ro>60*1e3&&it()});let Ua="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{Ua=e}).catch(()=>{});setInterval(async()=>{if(!(!Ua||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==Ua&&!a.updateAvailable&&(a.updateAvailable=!0,E())}catch{}},120*1e3);export{I as _};
