(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Fo="modulepreload",Vo=function(e){return"/"+e},xn={},I=function(t,n,s){let r=Promise.resolve();if(n&&n.length>0){let u=function(y){return Promise.all(y.map(v=>Promise.resolve(v).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),p=c?.nonce||c?.getAttribute("nonce");r=u(n.map(y=>{if(y=Vo(y),y in xn)return;xn[y]=!0;const v=y.endsWith(".css"),g=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${g}`))return;const $=document.createElement("link");if($.rel=v?"stylesheet":Fo,v||($.as="script"),$.crossOrigin="",$.href=y,p&&$.setAttribute("nonce",p),document.head.appendChild($),v)return new Promise((E,_)=>{$.addEventListener("load",E),$.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${y}`)))})}))}function i(c){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=c,window.dispatchEvent(p),!p.defaultPrevented)throw c}return r.then(c=>{for(const p of c||[])p.status==="rejected"&&i(p.reason);return t().catch(i)})},ve="https://ridspyczkxwkcbmwndhm.supabase.co",Uo="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHNweWN6a3h3a2NibXduZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzkwODAsImV4cCI6MjA5MzUxNTA4MH0.ppWbfEsrUdUL8sRPO3BPHWA-r12ueMgJ3C44n1FvK3o",ce=Uo;async function Pe(e,t){try{const n=new URL(`/rest/v1/${e}`,ve),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function Lt(e,t){try{const n=new URL(`/rest/v1/${e}`,ve),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return(await s.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function je(e,t,n){try{const s=new URL(`/rest/v1/${e}?id=eq.${t}`,ve);return(await fetch(s.toString(),{method:"PATCH",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function ye(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,ve),s=await fetch(n.toString(),{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function Ha(e){try{const t=new URL(`/rest/v1/${e}`,ve);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:ce,Authorization:`Bearer ${ce}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const s=n.headers.get("Content-Range");if(s){const r=s.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function V(e,t={}){try{const n=new URL(`/rest/v1/${e}`,ve);Object.entries(t).forEach(([r,i])=>{n.searchParams.set(r,i)});const s=await fetch(n.toString(),{method:"GET",headers:{apikey:ce,Authorization:`Bearer ${ce}`,Accept:"application/json",Prefer:"return=representation"}});if(!s.ok)throw new Error(`HTTP ${s.status}`);return await s.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function ds(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,ve);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:ce,Authorization:`Bearer ${ce}`}})).ok}catch{return!1}}async function be(e,t={},n=1e3){const s=[];let r=0;try{for(;;){const i=new URL(`/rest/v1/${e}`,ve);Object.entries(t).forEach(([u,y])=>{i.searchParams.set(u,y)}),i.searchParams.set("limit",String(n)),i.searchParams.set("offset",String(r));const c=await fetch(i.toString(),{method:"GET",headers:{apikey:ce,Authorization:`Bearer ${ce}`,Accept:"application/json",Prefer:"return=representation"}});if(!c.ok)throw new Error(`HTTP ${c.status}`);const p=await c.json();if(s.push(...p),p.length<n)break;r+=n}return s}catch(i){return console.warn(`Failed to query all rows from Supabase table ${e}`,i),s.length>0?s:[]}}const te=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:ce,SUPABASE_URL:ve,supabaseCount:Ha,supabaseDelete:ds,supabaseInsert:Pe,supabaseQuery:V,supabaseQueryAll:be,supabaseRpc:ye,supabaseUpdate:je,supabaseUpsert:Lt},Symbol.toStringTag,{value:"Module"})),Qa="sake_auth";function ps(e){localStorage.setItem(Qa,JSON.stringify(e))}function us(){return{apikey:ce,"Content-Type":"application/json"}}function Yo(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),s=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(s))}catch{return null}}async function ms(e,t){const n=await fetch(`${ve}/auth/v1/${e}`,{method:"POST",headers:us(),body:JSON.stringify(t)}),s=await n.json().catch(()=>({}));if(!n.ok)throw new Error(s.error_description??s.msg??`HTTP ${n.status}`);return s}async function Jo(e,t){const n=await ms("token?grant_type=password",{email:e,password:t});return ps({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function $n(e,t){const n=await ms("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&ps({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Ko(){const e=la();if(localStorage.removeItem(Qa),!!e?.access_token)try{await fetch(`${ve}/auth/v1/logout`,{method:"POST",headers:{...us(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function la(){const e=localStorage.getItem(Qa);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function Ho(){const e=la();if(!e)return null;const t=Yo(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function Qo(e){const t=la();if(!t)throw new Error("not signed in");const n=await fetch(`${ve}/auth/v1/user`,{method:"PUT",headers:{apikey:ce,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const s=await n.json().catch(()=>({}));throw new Error(s.msg??`HTTP ${n.status}`)}}const Wa={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},ys={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},Wo={generatedAt:new Date().toISOString(),records:[]},Ue={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},Go={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},Xo={},Zo={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function ie(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function er(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function tr(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function b(e,t,n=""){for(const s of t){const r=e[s];if(typeof r=="string"&&r.length>0)return r}return n}function T(e,t,n=0){for(const s of t)if(s in e)return ie(e[s]);return n}function we(e,t,n=!0){for(const s of t)if(s in e)return tr(e[s]);return n}function fe(e,t,n){for(const s of t){const r=e[s];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const i=new Date(r);if(!Number.isNaN(i.getTime()))return i.toISOString()}return n}function ar(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:fe(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:ie(e.total_amount??e.billed_amount)}}function _n(e){const t=e.trim().toUpperCase(),n=Xo[t];if(n)return n;const s=ys.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function hs(e){try{return(await V("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function st(e,t){await Lt("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function gs(){const e=new Date;e.setFullYear(e.getFullYear()-1);const t=e.toISOString().slice(0,10),n=await V("daily_sales_fact",{select:"sales_date,sales_amount,total_quantity,document_count",order:"sales_date.desc",sales_date:`gte.${t}`,limit:"400"}),s=new Map;for(const i of n){const c=String(i.sales_date??"");if(!c)continue;const p=s.get(c)??{amount:0,qty:0,docs:0};p.amount+=ie(i.sales_amount),p.qty+=ie(i.total_quantity),p.docs+=ie(i.document_count),s.set(c,p)}const r=Array.from(s.entries()).map(([i,c])=>({sales_date:i,sales_amount:c.amount,amount:c.amount,document_count:c.docs,bottles:c.qty,volume_ml:0,price_per_bottle:c.qty>0?Math.round(c.amount/c.qty):0,price_per_liter:0})).sort((i,c)=>c.sales_date.localeCompare(i.sales_date));if(r.length>0){const i=new Date().toISOString().slice(0,7);xs(i).catch(()=>{});const[c,p]=await Promise.all([V("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),V("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),y=new Date().toISOString().slice(0,10),v=y.slice(0,7),g=[...r].sort((S,o)=>S.sales_date.localeCompare(o.sales_date)).map(S=>({date:new Date(`${S.sales_date}T00:00:00Z`).toISOString(),amount:ie(S.amount??S.sales_amount),bottles:ie(S.bottles),volumeMl:ie(S.volume_ml),pricePerBottle:ie(S.price_per_bottle),pricePerLiter:ie(S.price_per_liter)})),$=g.slice(-30),E=S=>ie(S.amount??S.sales_amount),_=r.reduce((S,o)=>o.sales_date===y?S+E(o):S,0),D=r.reduce((S,o)=>o.sales_date.startsWith(v)?S+E(o):S,0),P=c.filter(S=>ie(S.balance_amount)>0),C=p.map((S,o)=>({id:String(S.id??`sale-${o+1}`),documentNo:S.document_no??S.legacy_document_no??"",date:S.sales_date??"",customerCode:S.legacy_customer_code??"",customerName:S.customer_name??S.legacy_customer_code??"",amount:ie(S.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:_,todayDelta:0,monthSales:D,monthDelta:0,unpaidCount:P.length,unpaidAmount:P.reduce((S,o)=>S+ie(o.balance_amount),0)},dailySales:$,allDailySales:g,salesRecords:C}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),ys}async function fs(){const e=await V("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status",limit:"1000"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const s=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:ie(t.billed_amount),paymentAmount:ie(t.paid_amount),balanceAmount:ie(t.balance_amount),lastPaymentDate:null,status:er(t.payment_status)}})}:Wo}async function Ga(){const[e,t]=await Promise.all([V("customers",{limit:"1000"}),V("products",{limit:"1000"})]);if(e.length>0||t.length>0){const n=e.length?e.map((r,i)=>{const c=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:b(r,["id","customer_id","code"],`customer-${i+1}`),code:b(r,["code","customer_code","legacy_customer_code"],`C${String(i+1).padStart(4,"0")}`),name:b(r,["name","customer_name","display_name"],`Customer ${i+1}`),kanaName:b(r,["kana_name"],""),shortName:b(r,["short_name"],""),postalCode:b(r,["postal_code"],""),address1:b(r,["address1"],""),address2:b(r,["address2"],""),phone:b(r,["phone"],""),fax:b(r,["fax"],""),email:b(r,["email"],""),staffCode:b(r,["staff_code"],""),businessType:b(r,["business_type"],""),areaCode:b(r,["delivery_area_code"],""),salesCategory:String(c.sales_category??""),closingDay:T(r,["closing_day","close_day"],31),paymentDay:T(r,["payment_day","due_day"],15),paymentMonth:Number(c.payment_month??0),paymentCycle:b(r,["payment_cycle"],""),billingCycleType:b(r,["billing_cycle_type"],""),billingCode:String(c.billing_code??""),creditLimit:T(r,["credit_limit"],0),taxMode:b(r,["tax_mode"],""),taxRound:String(c.tax_round??""),invoiceIssue:String(c.invoice_issue??""),invoiceType:b(r,["invoice_type"],""),priceGroup:String(c.price_group??""),priceType:String(c.price_type??""),tradeType:(()=>{const p=b(r,["trade_type"],"");if(p)return p;const u=String(c.price_type??"");return u==="000"?"B2B2C":u==="001"?"B2C":"B2B"})(),customerGroup1:String(c.customer_group1??""),customerGroup2:String(c.customer_group2??""),bankName:b(r,["bank_name"],""),bankBranch:b(r,["bank_branch"],""),bankAccount:b(r,["bank_account"],""),isActive:we(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):Ue.customers,s=t.length?t.map((r,i)=>({id:b(r,["id","product_id","product_code","legacy_product_code"],`product-${i+1}`),code:b(r,["product_code","legacy_product_code","code"],`P${String(i+1).padStart(5,"0")}`),janCode:b(r,["jan_code","jan","barcode"],""),name:b(r,["name","product_name","display_name"],`Product ${i+1}`),kanaName:b(r,["kana_name"],""),shortName:b(r,["short_name"],""),category:b(r,["category_code","category","category_name"],"未分類"),taxCategoryCode:b(r,["tax_code","tax_category_code"],""),isActive:we(r,["is_active","active","enabled"],!0),listPrice:T(r,["list_price"],0),purchasePrice:T(r,["purchase_price"],0),salePrice:T(r,["default_sale_price","sale_price"],0),costPrice:T(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:b(r,["unit_name","unit"],"本"),caseQty:r.case_qty!=null?Number(r.case_qty):null,bottleType:b(r,["bottle_type"],""),containerCode:b(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:b(r,["rice_type"],""),season:b(r,["season"],""),agingYears:T(r,["aging_years"],0)})):Ue.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||Ue.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:Ue.summary.activeCustomerCount,productCount:t.length||Ue.summary.productCount,activeProductCount:t.length?s.filter(r=>r.isActive).length:Ue.summary.activeProductCount},customers:n,products:s}}return Ue}async function vs(){const[e,t]=await Promise.all([V("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),V("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?fe(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const s=e[0],r=b(s,["status"],"success"),i=s.errors,c=Array.isArray(i)?i.length>0:!!i;return{generatedAt:new Date().toISOString(),lastSyncAt:fe(s,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:c?"warning":r==="error"?"error":"success",jobName:b(s,["agent_hostname"],"sake-relay"),message:`${T(s,["rows_upserted"],0)}行同期 / ${T(s,["files_updated"],0)}ファイル更新`}}return{...Go,lastDataAt:n}}async function bs(){const e=await ye("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function ws(){const e=[{name:"売上明細 (SHTOR)",table:"sales_document_lines",countFilter:"note=like.*src:diff*",expectMin:2e5},{name:"伝票ヘッダ (SHDEN)",table:"sales_document_headers",expectMin:5e4},{name:"日次売上集計",table:"daily_sales_fact",expectMin:1e5},{name:"商品月別売上",table:"product_monthly_sales",expectMin:1e4},{name:"得意先マスタ",table:"customers",expectMin:500},{name:"商品マスタ",table:"products",expectMin:1e3},{name:"安全在庫",table:"product_safety_stock_params",expectMin:0}],t=[];for(const n of e)try{const s=n.countFilter?`&${n.countFilter}`:"",r=`${ve}/rest/v1/${n.table}?select=id&limit=0${s}`,c=(await fetch(r,{headers:{apikey:ce,Authorization:`Bearer ${ce}`,Prefer:"count=exact"}})).headers.get("content-range")??"*/0",p=parseInt(c.split("/").pop()??"0",10)||0,u=p>=n.expectMin?"ok":p>0?"warn":"error";t.push({name:n.name,table:n.table,count:p,status:u,detail:p>=n.expectMin?"正常稼働":p>0?"データ少":"データなし"})}catch{t.push({name:n.name,table:n.table,count:0,status:"error",detail:"接続エラー"})}return t}async function Pt(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];if(e.customerCode.trim()){const r=e.customerCode.trim();n.push(`customer_code.ilike.*${r}*`,`legacy_customer_code.ilike.*${r}*`,`customer_name.ilike.*${r}*`)}e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const s=await V("sales_document_headers",t);return s.length>0?s.map((r,i)=>({id:b(r,["id"],`invoice-${i}`),documentNo:b(r,["document_no","legacy_document_no"],""),date:fe(r,["sales_date"],""),customerCode:b(r,["legacy_customer_code","customer_code"],""),customerName:b(r,["customer_name","legacy_customer_code"],""),itemCount:T(r,["line_count"],0),amount:T(r,["total_amount","billed_amount"],0)})):[]}const $t=new Map;async function xs(e){$t.clear();const t=await be("sales_document_lines",{select:"document_no,line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*date:${e}*`,order:"document_no,line_no"});for(const n of t){const s=b(n,["document_no"],"");if(!s)continue;const r=$t.get(s)??[];r.push({lineNo:T(n,["line_no"],0),productCode:b(n,["legacy_product_code"],""),productName:b(n,["product_name"],""),quantity:T(n,["quantity"],0),unitPrice:T(n,["unit_price"],0),amount:T(n,["amount"],0)}),$t.set(s,r)}}async function qa(e){const t=$t.get(e);if(t)return t;const s=(await V("sales_document_lines",{select:"line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*inv:${e} *`,order:"line_no",limit:"100"})).map(r=>({lineNo:T(r,["line_no"],0),productCode:b(r,["legacy_product_code"],""),productName:b(r,["product_name"],""),quantity:T(r,["quantity"],0),unitPrice:T(r,["unit_price"],0),amount:T(r,["amount"],0)}));return $t.set(e,s),s}async function Xa(e){const t=e.trim().toUpperCase();if(!t)return _n("");const[n,s,r]=await Promise.all([V("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t},customer_name.ilike.*${t}*`,order:"sales_date.desc",limit:"50"}),V("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),V("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||s.length>0){const i=n.map((u,y)=>{const v=ar(u,y);return{id:v.id,date:v.date,documentNo:v.documentNo,amount:v.amount}}),c=s.map((u,y)=>({id:String(u.id??`payment-${y+1}`),date:fe(u,["payment_date","received_date"],new Date().toISOString()),amount:ie(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),p=r.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:ie(p?.balance_amount),salesTotal:i.reduce((u,y)=>u+y.amount,0),paymentTotal:c.reduce((u,y)=>u+y.amount,0),salesHistory:i,paymentHistory:c}}return _n(t)}async function Za(){const[e,t,n,s]=await Promise.all([V("mv_monthly_sales",{order:"month.asc"}),V("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),V("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),V("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(r=>({month:b(r,["month"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),volumeMl:T(r,["volume_ml"],0)})),productTotals:n.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})),customerTotals:t.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})),staffTotals:s.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:0}))}:Zo}async function nr(e,t,n){if(t==="all")return[];const s=n?$s(t,n):null,i=await ye(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:s?.from??null,p_date_to:s?.to??null});return i?i.map(c=>({code:b(c,["code"],""),name:b(c,["name"],""),amount:T(c,["amount"],0),quantity:T(c,["quantity"],0),documents:T(c,["documents"],0),volumeMl:T(c,["volume_ml"],0)})):[]}async function sr(e,t){if(t==="all")return[];const n=await ye("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(s=>s.period_val).filter(Boolean)}function $s(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,s]=t.split("-").map(Number),r=`${n}-${String(s).padStart(2,"0")}-01`,i=new Date(n,s,0).getDate(),c=`${n}-${String(s).padStart(2,"0")}-${String(i).padStart(2,"0")}`;return{from:r,to:c}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const s=parseInt(n[1]),r=parseInt(n[2]),i=new Date(s,0,4),c=i.getDay()||7,p=new Date(i);p.setDate(i.getDate()-c+1);const u=new Date(p);u.setDate(p.getDate()+(r-1)*7);const y=new Date(u);return y.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:y.toISOString().slice(0,10)}}return null}function _s(e){return e.map(t=>({staffCode:b(t,["staff_code"],""),staffName:b(t,["staff_name"],""),code:b(t,["code"],""),name:b(t,["name"],""),tag:b(t,["tag"],""),amount:T(t,["amount"],0),quantity:T(t,["quantity"],0),documents:T(t,["documents"],0)}))}async function or(e,t){const n=await ye("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(s=>({code:b(s,["code"],""),name:b(s,["name"],""),amount:T(s,["amount"],0),quantity:T(s,["quantity"],0),documents:T(s,["documents"],0)})):[]}async function rr(e,t,n){const s=await ye("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?_s(s):[]}async function ir(e,t,n){const s=await ye("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return s?_s(s):[]}async function lr(e,t){if(e==="all"||!t)return[];const n=await ye("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(s=>({month:b(s,["label"],""),amount:T(s,["amount"],0),quantity:T(s,["quantity"],0),volumeMl:T(s,["volume_ml"],0)})):[]}function cr(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function dr(e,t,n){const s=await ye("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),tag:b(r,["tag"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})):[]}async function pr(e,t,n){const s=await ye("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return s?s.map(r=>({code:b(r,["code"],""),name:b(r,["name"],""),tag:b(r,["tag"],""),amount:T(r,["amount"],0),quantity:T(r,["quantity"],0),documents:T(r,["documents"],0),volumeMl:T(r,["volume_ml"],0)})):[]}async function ur(e,t){const n=await ye("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(s=>({month:b(s,["month"],""),amount:T(s,["amount"],0),quantity:T(s,["quantity"],0),volumeMl:T(s,["volume_ml"],0)})):[]}async function mr(e,t){const n=await ye("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:b(s,["brew_category"],""),subCategory:b(s,["sub_category"],""),productCount:T(s,["product_count"],0),totalShipmentQty:T(s,["total_shipment_qty"],0),totalShipmentMl:T(s,["total_shipment_ml"],0),monthlyAvgQty:T(s,["monthly_avg_qty"],0),monthlyAvgMl:T(s,["monthly_avg_ml"],0),currentStockL:T(s,["current_stock_l"],0),monthsRemaining:T(s,["months_remaining"],0),costPerL:T(s,["cost_per_l"],0)})):[]}async function yr(e,t){const n=await ye("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({month:b(s,["month"],""),brewCategory:b(s,["brew_category"],""),shipmentMl:T(s,["shipment_ml"],0)})):[]}async function hr(e,t){const n=await ye("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(s=>({brewCategory:b(s,["brew_category"],""),subCategory:b(s,["sub_category"],""),productCode:b(s,["product_code"],""),productName:b(s,["product_name"],""),volumeMl:T(s,["volume_ml"],0),annualQty:T(s,["annual_qty"],0),annualMl:T(s,["annual_ml"],0),monthlyAvgQty:T(s,["monthly_avg_qty"],0),monthlyAvgMl:T(s,["monthly_avg_ml"],0)})):[]}async function gr(e){return(await V("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:b(n,["id"],""),brewCategory:b(n,["brew_category"],""),fy:T(n,["fy"],e),brewMonth:T(n,["brew_month"],0),durationMonths:T(n,["duration_months"],2),plannedVolumeL:T(n,["planned_volume_l"],0),notes:b(n,["notes"],"")}))}async function fr(e,t,n){return await ye("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(r=>({brew_month:r.brewMonth,duration_months:r.durationMonths,planned_volume_l:r.plannedVolumeL,notes:r.notes??null}))})!==null}async function vr(e,t,n,s){return await Lt("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:s??null,updated_at:new Date().toISOString()})!==null}async function br(){const e=await V("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const s=b(n,["category_name"],""),r=b(n,["production_type_name"],"");!s||!r||(t[s]||(t[s]=[]),t[s].push(r))}return t}async function wr(e,t){return await ye("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function xr(e,t){return await ye("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function $r(){const e=await V("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>b(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function _r(){const e=await V("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const s=b(n,["brew_category"],"");s&&(t[s]={brewCategory:s,rawAlcoholPct:T(n,["raw_alcohol_pct"],18),targetAlcoholPct:T(n,["target_alcohol_pct"],15)})}return t}async function Sr(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}},void 0);return r?(await fetch(`${s}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function kr(){const e=await ye("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:T(t,["fy"],0),brewCategory:b(t,["brew_category"],""),shipmentL:T(t,["shipment_l"],0),monthsElapsed:T(t,["months_elapsed"],12),annualizedL:T(t,["annualized_l"],0)})):[]}async function Pr(){const e=await V("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const s=b(n,["brew_category"],""),r=T(n,["growth_rate"],NaN);s&&!isNaN(r)&&(t[s]=r)}return t}async function Er(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function Ar(){const e=await V("brewing_rice_params",{}),t={};for(const n of e??[]){const s=b(n,["brew_category"],"");s&&(t[s]={brewCategory:s,polishingRatio:T(n,["polishing_ratio"],.7),ricePerLiterKg:T(n,["rice_per_liter_kg"],.5),kojiRatio:T(n,["koji_ratio"],.3),kojiVariety:b(n,["koji_variety"],"山田錦"),kojiPricePerKg:T(n,["koji_price_per_kg"],600),kakeVariety:b(n,["kake_variety"],"一般米"),kakePricePerKg:T(n,["kake_price_per_kg"],350),alcoholAdditionRatio:T(n,["alcohol_addition_ratio"],0)})}return t}async function Lr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,koji_ratio:t.kojiRatio,koji_variety:t.kojiVariety,koji_price_per_kg:t.kojiPricePerKg,kake_variety:t.kakeVariety,kake_price_per_kg:t.kakePricePerKg,alcohol_addition_ratio:t.alcoholAdditionRatio??0,updated_at:new Date().toISOString()})})).ok:!1}async function Cr(){const e=await ye("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:b(t,["brew_category"],""),monthNum:T(t,["month_num"],0),avgMonthlyL:T(t,["avg_monthly_l"],0)})):[]}async function Dr(e){const t=await V("procurement_decisions",{fy:`eq.${e}`}),n={};for(const s of t??[]){const r=b(s,["brew_category"],""),i=T(s,["decided_brewing_l"],-1);r&&i>=0&&(n[r]=i)}return n}async function qr(e,t,n){const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}},void 0);return r?(await fetch(`${s}/rest/v1/procurement_decisions`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,fy:t,decided_brewing_l:n,updated_at:new Date().toISOString()})})).ok:!1}async function Tr(e){return(await V("brewing_process_batches",{fy:`eq.${e}`,order:"start_date.asc.nullsfirst"})??[]).map(n=>({id:b(n,["id"],""),brewCategory:b(n,["brew_category"],""),batchCode:b(n,["batch_code"],""),fy:T(n,["fy"],e),plannedVolumeL:T(n,["planned_volume_l"],0),tankNo:b(n,["tank_no"],""),status:b(n,["status"],"planned"),startDate:b(n,["start_date"],""),targetEndDate:b(n,["target_end_date"],""),notes:b(n,["notes"],"")}))}async function Ir(e){return e.length===0?[]:(await V("brewing_process_steps",{batch_id:`in.(${e.join(",")})`,order:"batch_id.asc,step_order.asc"})??[]).map(n=>({id:b(n,["id"],""),batchId:b(n,["batch_id"],""),stepOrder:T(n,["step_order"],0),stepName:b(n,["step_name"],""),plannedStart:b(n,["planned_start"],""),plannedEnd:b(n,["planned_end"],""),actualStart:b(n,["actual_start"],""),actualEnd:b(n,["actual_end"],""),status:b(n,["status"],"未着手"),temperature:n.temperature!=null?T(n,["temperature"],0):null,notes:b(n,["notes"],"")}))}function Nr(e,t){const n=new Date(e);let s=0;for(;s<t;)n.setDate(n.getDate()+1),n.getDay()!==0&&s++;return n}function Mr(e,t){const n=new Date(e);let s=t-1;for(;s>0;)n.setDate(n.getDate()+1),n.getDay()!==0&&s--;return n.getDay()===0&&n.setDate(n.getDate()+1),n}function Sn(e){return e.getDay()===0&&e.setDate(e.getDate()+1),e}const Kt=[{name:"洗米・浸漬",days:1},{name:"蒸米",days:1},{name:"製麹",days:2},{name:"酒母",days:14},{name:"仕込み(添/仲/留)",days:4},{name:"醪管理",days:25},{name:"上槽",days:2},{name:"濾過・火入れ",days:1},{name:"貯蔵",days:30},{name:"瓶詰め",days:1}];async function Rr(e,t,n,s,r){const c=n[s],p=c?.ricePerLiterKg??.5,u=c?.kojiRatio??.3,y=c?.polishingRatio??.7,v=c?.alcoholAdditionRatio??0,g=Math.round(t*(1-v)*p*u/y),$=r.filter(_=>_.stepName==="製麹"&&_.plannedStart&&_.plannedEnd);let E=new Date(e);for(let _=0;_<60;_++){const D=new Date(E.getTime()+1728e5),P=new Date(E.getTime()+3*864e5);let C=0;for(const S of $){const o=new Date(S.plannedStart).getTime(),l=new Date(S.plannedEnd).getTime();D.getTime()<=l&&P.getTime()>=o&&(C+=180)}if(C+g<=180)return E.toISOString().slice(0,10);E=new Date(E.getTime()+864e5)}return E.toISOString().slice(0,10)}async function Or(e,t,n,s,r,i,c){let p=r;i&&c&&(p=await Rr(r,s,c,e,i));const u=await Pe("brewing_process_batches",{brew_category:e,batch_code:t,fy:n,planned_volume_l:s,start_date:p});if(!u?.id)return null;let y=Sn(new Date(p));for(let v=0;v<Kt.length;v++){y=Sn(y);const g=y.toISOString().slice(0,10),$=Mr(y,Kt[v].days),E=$.toISOString().slice(0,10);await Pe("brewing_process_steps",{batch_id:u.id,step_order:v+1,step_name:Kt[v].name,planned_start:g,planned_end:E}),y=Nr($,1)}return await je("brewing_process_batches",u.id,{target_end_date:y.toISOString().slice(0,10)}),u.id}async function Br(e,t){return je("brewing_process_steps",e,t)}async function jr(e,t){return je("brewing_process_batches",e,{...t,updated_at:new Date().toISOString()})}async function zr(){return(await V("tanks",{order:"tank_no"})??[]).map(t=>({id:b(t,["id"],""),tankNo:b(t,["tank_no"],""),displayName:b(t,["display_name"],""),capacityL:T(t,["capacity_l"],0),tankType:b(t,["tank_type"],""),status:b(t,["status"],"empty"),preferredCategories:Array.isArray(t.preferred_categories)?t.preferred_categories:[],cleanupDays:T(t,["cleanup_days"],1)}))}async function Fr(e,t,n,s){return await Pe("tanks",{tank_no:e,display_name:e,capacity_l:t,tank_type:n,preferred_categories:s,status:"empty"})!==null}async function Vr(e){const{supabaseDelete:t}=await I(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>te);return{supabaseDelete:n}},void 0);return t("tanks",e)}function Ur(e,t){const n=e.find(i=>i.stepName==="仕込み(添/仲/留)"),s=e.find(i=>i.stepName==="上槽");if(!n?.plannedStart||!s?.plannedEnd)return null;const r=new Date(s.plannedEnd);return r.setDate(r.getDate()+t),{start:n.plannedStart,end:r.toISOString().slice(0,10)}}async function Yr(e,t,n,s){const r=new Map(n.map(P=>[P.stepName,P])),i=s??[],c=e.filter(P=>P.status!=="completed"&&P.startDate).sort((P,C)=>P.startDate.localeCompare(C.startDate));if(c.length===0)return;const p=t.deadlineDate||"",u=t.allowSunday&&!!p,y=new Map,v=(P,C)=>{const S=new Date(P);return S.setDate(S.getDate()+C),S.toISOString().slice(0,10)},g=(P,C,S,o)=>P<=o&&C>=S,$=P=>C=>(!P&&C.getDay()===0&&C.setDate(C.getDate()+1),C),E=(P,C,S)=>{const o=new Date(P);let l=C-1;for(;l>0;)o.setDate(o.getDate()+1),(S||o.getDay()!==0)&&l--;return!S&&o.getDay()===0&&o.setDate(o.getDate()+1),o},_=(P,C)=>{const S=new Date(P);return S.setDate(S.getDate()+1),!C&&S.getDay()===0&&S.setDate(S.getDate()+1),S},D=()=>{const P=new Map;for(const C of y.values())for(const S of C){const o=r.get(S.stepName);if(!o)continue;const l=Math.max(Math.round((new Date(S.end).getTime()-new Date(S.start).getTime())/864e5)+1,1);let d=0;for(let h=0;h<l;h++){const w=new Date(S.start);w.setDate(w.getDate()+h),w.getDay()!==0&&d++}if(d===0)continue;const m=o.laborHours/d;for(let h=0;h<l;h++){const w=new Date(S.start);if(w.setDate(w.getDate()+h),w.getDay()===0)continue;const f=new Date(w);f.setDate(f.getDate()+3-(f.getDay()+6)%7);const x=new Date(f.getFullYear(),0,4),k=1+Math.round(((f.getTime()-x.getTime())/864e5-3+(x.getDay()+6)%7)/7),L=`${f.getFullYear()}-W${String(k).padStart(2,"0")}`;P.set(L,(P.get(L)??0)+m)}}return P};for(const P of c){let C=P.startDate;for(let d of[!1,...u?[!0]:[]]){C=P.startDate;for(let h=0;h<90;h++){C=$(d)(new Date(C)).toISOString().slice(0,10);const f=[];let x=new Date(C);for(const M of Kt){x=$(d)(x);const z=x.toISOString().slice(0,10),B=E(x,M.days,d),O=B.toISOString().slice(0,10);f.push({stepName:M.name,start:z,end:O}),x=_(B,d)}const k=f.find(M=>M.stepName==="製麹");let L=!1;if(k)for(const[M,z]of y){const B=z.find(O=>O.stepName==="製麹");if(B&&g(k.start,k.end,B.start,B.end)){L=!0;break}}if(L){C=v(C,1);continue}y.set(P.id,f);const q=D(),N=t.workerCount*t.weeklyHoursLimit;let R=!1;for(const M of q.values())if(M>N*1.1){R=!0;break}if(R){y.delete(P.id),C=v(C,1);continue}if(i.length>0){const M=f.find(B=>B.stepName==="仕込み(添/仲/留)"),z=f.find(B=>B.stepName==="上槽");if(M&&z){const B=M.start,O=new Date(z.end);O.setDate(O.getDate()+1);const U=O.toISOString().slice(0,10),H=i.filter(W=>W.capacityL>=P.plannedVolumeL&&(W.preferredCategories.length===0||W.preferredCategories.includes(P.brewCategory)));let G=!1;for(const W of H){let Q=!1;for(const[X,Z]of y){if(X===P.id||e.find(K=>K.id===X)?.tankNo!==W.tankNo)continue;const J=Z.find(K=>K.stepName==="仕込み(添/仲/留)"),Y=Z.find(K=>K.stepName==="上槽");if(J&&Y){const K=v(Y.end,W.cleanupDays);if(g(B,U,J.start,K)){Q=!0;break}}}if(!Q){W.tankNo,G=!0;break}}if(!G){y.delete(P.id),C=v(C,1);continue}}}break}const m=y.get(P.id);if(p&&m){const h=m.find(w=>w.stepName==="仕込み(添/仲/留)");if(h&&h.end<=p)break;if(!d){y.delete(P.id);continue}}else break}const S=y.get(P.id);if(!S)continue;const o=(()=>{if(i.length===0)return P.tankNo;const d=S.find(f=>f.stepName==="仕込み(添/仲/留)"),m=S.find(f=>f.stepName==="上槽");if(!d||!m)return P.tankNo;const h=d.start,w=v(m.end,1);for(const f of i){if(f.capacityL<P.plannedVolumeL||f.preferredCategories.length>0&&!f.preferredCategories.includes(P.brewCategory))continue;let x=!1;for(const[k,L]of y){if(k===P.id||e.find(M=>M.id===k)?.tankNo!==f.tankNo)continue;const N=L.find(M=>M.stepName==="仕込み(添/仲/留)"),R=L.find(M=>M.stepName==="上槽");if(N&&R&&g(h,w,N.start,v(R.end,f.cleanupDays))){x=!0;break}}if(!x)return f.tankNo}return P.tankNo})();await je("brewing_process_batches",P.id,{start_date:C,tank_no:o,target_end_date:v(S[S.length-1].end,0),updated_at:new Date().toISOString()});const l=await V("brewing_process_steps",{batch_id:`eq.${P.id}`,order:"step_order.asc"});if(l)for(const d of l){const m=T(d,["step_order"],0),h=S[m-1];if(h){const w=b(d,["id"],"");await je("brewing_process_steps",w,{planned_start:h.start,planned_end:h.end})}}}}async function Jr(){const t=(await V("brewing_worker_settings",{limit:"1"})??[])[0];return t?{workerCount:T(t,["worker_count"],2),weeklyHoursLimit:T(t,["weekly_hours_limit"],40),dayStartHour:T(t,["day_start_hour"],6),deadlineDate:b(t,["deadline_date"],""),allowSunday:t.allow_sunday===!0}:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1}}async function Kr(e){const t=await V("brewing_worker_settings",{limit:"1"});if(t&&t.length>0){const n=b(t[0],["id"],"");return je("brewing_worker_settings",n,{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday,updated_at:new Date().toISOString()})}return await Pe("brewing_worker_settings",{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday})!==null}async function Hr(){return(await V("brewing_step_labor",{order:"step_name"})??[]).map(t=>({stepName:b(t,["step_name"],""),laborHours:T(t,["labor_hours"],4),workerCountNeeded:T(t,["worker_count_needed"],1)}))}function Qr(e,t){const n=new Map(t.map(r=>[r.stepName,r])),s=new Map;for(const r of e){if(!r.plannedStart||!r.plannedEnd)continue;const i=n.get(r.stepName);if(!i)continue;const c=new Date(r.plannedStart),p=new Date(r.plannedEnd),u=Math.max(Math.round((p.getTime()-c.getTime())/864e5)+1,1),y=i.laborHours/u;for(let v=new Date(c);v<=p;v=new Date(v.getTime()+864e5)){const g=new Date(v);g.setDate(g.getDate()+3-(g.getDay()+6)%7);const $=new Date(g.getFullYear(),0,4),E=1+Math.round(((g.getTime()-$.getTime())/864e5-3+($.getDay()+6)%7)/7),_=`${g.getFullYear()}-W${String(E).padStart(2,"0")}`;s.set(_,(s.get(_)??0)+y)}}return s}async function Wr(e){return(await V("rice_purchase_commitments",{fy:`eq.${e}`,order:"variety_name.asc"})??[]).map(n=>({id:b(n,["id"],""),varietyName:b(n,["variety_name"],""),committedBales:T(n,["committed_bales"],0),pricePerKg:T(n,["price_per_kg"],0),supplier:b(n,["supplier"],""),deliveryMonth:T(n,["delivery_month"],0)||null,fy:T(n,["fy"],e),notes:b(n,["notes"],"")}))}async function Gr(e){return await Pe("rice_purchase_commitments",{variety_name:e.varietyName,committed_bales:e.committedBales??0,price_per_kg:e.pricePerKg??0,supplier:e.supplier??"",delivery_month:e.deliveryMonth??null,fy:e.fy,notes:e.notes??""})!==null}async function Xr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/rice_purchase_commitments?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function Zr(){return(await V("rice_varieties",{order:"sort_order.asc,name.asc"})??[]).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),defaultPricePerKg:T(t,["default_price_per_kg"],400),region:b(t,["region"],"")}))}async function ei(e,t,n=""){return await Pe("rice_varieties",{name:e,default_price_per_kg:t,region:n})!==null}async function ti(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/rice_varieties?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function ai(e){return(await V("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:b(n,["id"],""),brewCategory:b(n,["brew_category"],""),label:b(n,["label"],""),volumeL:T(n,["volume_l"],0)}))}async function ni(){return(await V("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:b(t,["id"],""),brewCategory:b(t,["brew_category"],""),label:b(t,["label"],""),volumeL:T(t,["volume_l"],0)}))}async function si(e,t,n){return await Pe("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function oi(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:i,SUPABASE_ANON_KEY:c}},void 0);return s?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function ri(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function ii(){return(await V("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:b(t,["name"],""),parentCategory:b(t,["parent_category"],"")})).filter(t=>t.name)}async function li(e,t){return await Pe("brewing_custom_categories",{name:e,parent_category:t})!==null}async function ci(e){const t=await ye("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:b(n,["production_type_name"],""),count:T(n,["product_count"],0)})).filter(n=>n.name):[]}async function di(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function pi(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);if(!s)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function ui(){const e=await V("brewing_category_overrides",{}),t={};for(const n of e??[]){const s=b(n,["product_code"],""),r=b(n,["brew_category"],"");s&&r&&(t[s]=r)}return t}async function mi(e){return(await V("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>b(n,["product_code"],"")).filter(Boolean)}async function yi(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:s}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:i}},void 0);if(!s)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:s,Authorization:`Bearer ${s}`}}),t.length===0)return!0;const r=t.map(c=>({year_month:e,product_code:c}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(r)})).ok}catch{return!1}}const Ta={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Ss(e){const t=e.lines.reduce((r,i)=>r+i.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Pe("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const kn={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function en(e){const t=await V("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],s=ie(n.total_amount);return{documentNo:e,invoiceDate:b(n,["sales_date","document_date"],""),customerCode:b(n,["legacy_customer_code","customer_code"],""),customerName:b(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...kn,documentNo:e||kn.documentNo}}const hi={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function tn(e){const t=await V("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const i=T(r,["sales_amount"],0),c=T(r,["tax_amount"],0);return{customerCode:b(r,["customer_code"],""),customerName:b(r,["customer_name"],""),closingDay:31,salesAmount:i,taxAmount:c,prevBalance:0,paymentAmount:0,billingAmount:i,status:"open"}}),s=n.reduce((r,i)=>r+i.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:s,customers:n}}return{...hi,targetYearMonth:e}}const gi={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function ks(){const[e,t,n]=await Promise.all([V("mv_monthly_sales",{order:"month.asc"}),V("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),V("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return gi;const s=e.slice(-12).map(u=>b(u,["month"],"")),r=new Map;t.forEach(u=>{const y=b(u,["code"],"");r.has(y)||r.set(y,{name:b(u,["name"],y),monthValues:new Map}),r.get(y).monthValues.set(b(u,["month"],""),T(u,["amount"],0))});const c=Array.from(r.entries()).map(([u,y])=>({code:u,name:y.name,total:s.reduce((v,g)=>v+(y.monthValues.get(g)??0),0),monthValues:y.monthValues})).sort((u,y)=>y.total-u.total).slice(0,10).map(u=>({label:u.name,values:s.map(y=>u.monthValues.get(y)??0)})),p=n.map(u=>({label:b(u,["name"],""),values:s.map(()=>Math.round(T(u,["amount"],0)/s.length))}));return{generatedAt:new Date().toISOString(),months:s,salesByProduct:c,salesByCustomer:p,costSimulation:[]}}async function fi(){const e=await be("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const s=b(n,["code"],"");if(!s)return;const r=b(n,["month"],""),i=parseInt(r.slice(5,7))-1;if(i<0||i>11)return;let c=t.get(s);c||(c={name:b(n,["name"],s),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(s,c)),c.qty[i]+=T(n,["quantity"],0),c.amt[i]+=T(n,["amount"],0)}),Array.from(t.entries()).map(([n,s])=>({code:n,name:s.name,monthlyQuantity:s.qty,monthlyAmount:s.amt,totalQuantity:s.qty.reduce((r,i)=>r+i,0),totalAmount:s.amt.reduce((r,i)=>r+i,0)})).filter(n=>n.totalQuantity>0).sort((n,s)=>s.totalAmount-n.totalAmount)}async function vi(){return(await V("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:b(t,["product_code"],""),productName:b(t,["product_name"],""),forecastMonth:b(t,["forecast_month"],""),segment:b(t,["segment"],"monthly"),avgMonthly:T(t,["avg_monthly"],0),forecastQuantity:T(t,["forecast_quantity"],0),forecastAmount:T(t,["forecast_amount"],0),safetyStock:T(t,["safety_stock"],0),calculatedAt:fe(t,["calculated_at"],"")}))}async function bi(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await be("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(c=>String(c.id)).filter(Boolean);const s=await be("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(c=>{c.id&&r.set(String(c.id),c)});const i=[];return s.forEach(c=>{const p=String(c.header_id??c.document_header_id??""),u=r.get(p);if(!u)return;const y=u.sales_date??u.document_date??"";!y||y<t||i.push({date:y.slice(0,10),customerName:u.customer_name??"不明",productName:c.product_name??"不明",quantity:ie(c.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),i.sort((c,p)=>c.date.localeCompare(p.date))}async function wi(){const e=new Date().toISOString();return(await V("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:b(n,["id"],""),message:b(n,["message"],""),level:b(n,["level"],"info"),startsAt:fe(n,["starts_at"],""),endsAt:n.ends_at?fe(n,["ends_at"],""):null,dismissible:we(n,["dismissible"],!0)}))}async function xi(){const e=await be("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:b(t,["customer_code"],""),customer_name:b(t,["customer_name"],""),business_type:b(t,["business_type"],""),area_code:b(t,["area_code"],""),phone:b(t,["phone"],""),last_order_date:b(t,["last_order_date"],""),days_since_order:T(t,["days_since_order"],0),amount_12m:T(t,["amount_12m"],0),amount_3m:T(t,["amount_3m"],0),amount_this_month:T(t,["amount_this_month"],0),amount_last_year_same_month:T(t,["amount_last_year_same_month"],0),annual_revenue:T(t,["annual_revenue"],0),is_dormant:we(t,["is_dormant"],!1),is_at_risk:we(t,["is_at_risk"],!1)})):[]}async function $i(){return(await be("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:b(t,["customer_code"],""),customer_name:b(t,["customer_name"],""),phone:b(t,["phone"],""),address:b(t,["address"],""),area_code:b(t,["area_code"],""),business_type:b(t,["business_type"],""),priority_score:T(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:b(t,["last_order_date"],""),days_since_order:T(t,["days_since_order"],0),annual_revenue:T(t,["annual_revenue"],0),recommended_action:b(t,["recommended_action"],"")}))}async function _i(){return(await be("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:b(t,["product_code"],""),product_name:b(t,["product_name"],""),season_type:b(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:T(t,["avg_monthly_qty"],0)}))}async function Si(){return(await be("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:b(t,["product_code"],""),name:b(t,["product_name"],""),monthlyQuantity:[T(t,["m01"],0),T(t,["m02"],0),T(t,["m03"],0),T(t,["m04"],0),T(t,["m05"],0),T(t,["m06"],0),T(t,["m07"],0),T(t,["m08"],0),T(t,["m09"],0),T(t,["m10"],0),T(t,["m11"],0),T(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:T(t,["total_quantity"],0),totalAmount:T(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Ps(e,t,n){try{return await Pe("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function Es(e,t){return je("customers",e,t)}async function As(e,t){return je("products",e,t)}async function Ia(e,t){const n=e.find(c=>c.code===t);n?.priceGroup;const s=n?.priceGroup||t;let r="";try{const c=await V("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});c[0]?.memo&&(r=(typeof c[0].memo=="string"?JSON.parse(c[0].memo):c[0].memo)?.price_type??"")}catch{}const i=new Map;if(s){const c=await V("customer_product_prices",{price_group:`eq.${s}`,select:"legacy_product_code,special_price"});for(const p of c)i.set(p.legacy_product_code,p.special_price)}return{priceType:r,priceGroup:s,individualPrices:i}}function an(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function ki(){return(await V("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function Pi(){return(await be("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Ei(){return(await V("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function rt(e,t="billing",n="apr"){const s=await ye("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t,p_fiscal_type:n});return s?s.map(r=>({code:String(r.legacy_customer_code??""),name:String(r.customer_name??""),address:String(r.address1??""),yearAmount:Number(r.year_amount??0),sharePct:Number(r.share_pct??0),orderDays:Number(r.order_days??0),prevAmount:Number(r.prev_amount??0),growthRate:r.growth_rate!=null?Number(r.growth_rate):null,currentRank:String(r.current_rank??"C"),prevRank:String(r.prev_rank??"")})):[]}function nn(e){if(!e)return null;if(/^\d{4}$/.test(e))return{dateFrom:`${e}-01-01`,dateTo:`${e}-12-31`};if(/^\d{4}-\d{2}$/.test(e)){const[t,n]=e.split("-").map(Number),s=new Date(t,n,0).getDate();return{dateFrom:`${e}-01`,dateTo:`${e}-${String(s).padStart(2,"0")}`}}return null}async function Ls(e=""){const t=nn(e),n=t?ye("get_abc_customer_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(_=>_??[]):V("mv_customer_abc",{order:"amount.desc"}),s=t?t.dateFrom.slice(0,7):(()=>{const _=new Date;return _.setMonth(_.getMonth()-11),`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[i,c]=await Promise.all([n,V("mv_customer_monthly_sales",{month:`gte.${s}`,order:"month.asc",limit:"10000"})]),p=c.filter(_=>b(_,["month"],"")<=r),u=i.map(_=>({code:b(_,["code"],""),name:b(_,["name"],""),amount:T(_,["amount"],0),documents:T(_,["documents"],0),ratio:T(_,["ratio"],0),cumRatio:T(_,["cum_ratio","cumRatio"],0),abcRank:b(_,["abc_rank","abcRank"],"C")})),y=u.slice(0,10),v=new Set(y.map(_=>_.code)),g=Ds(s,r),$=new Map;p.forEach(_=>{const D=b(_,["code"],"");if(!v.has(D))return;const P=b(_,["month"],"");$.has(D)||$.set(D,new Map),$.get(D).set(P,T(_,["amount"],0))});const E=y.map(_=>({label:_.name,values:g.map(D=>$.get(_.code)?.get(D)??0)}));return{generatedAt:new Date().toISOString(),ranking:u,months:g,monthlyByCustomer:E}}async function Cs(e=""){const t=nn(e),n=t?ye("get_abc_product_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(D=>D??[]):V("mv_product_abc",{order:"amount.desc"}),s=t?t.dateFrom.slice(0,7):(()=>{const D=new Date;return D.setMonth(D.getMonth()-11),`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[i,c]=await Promise.all([n,V("mv_product_monthly_shipments",{month:`gte.${s}`,order:"month.asc",limit:"10000"})]),p=c.filter(D=>b(D,["month"],"")<=r),y=i.map(D=>({code:b(D,["code"],""),name:b(D,["name"],""),amount:T(D,["amount"],0),quantity:T(D,["quantity"],0),documents:T(D,["documents"],0),ratio:T(D,["ratio"],0),cumRatio:T(D,["cum_ratio","cumRatio"],0),abcRank:b(D,["abc_rank","abcRank"],"C")})),v=y.reduce((D,P)=>D+P.amount,0),g=Ds(s,r),$=new Set(y.filter(D=>D.abcRank==="A").slice(0,10).map(D=>D.code)),E=new Map;p.forEach(D=>{const P=b(D,["code"],"");if(!$.has(P))return;const C=b(D,["month"],"");E.has(P)||E.set(P,new Map),E.get(P).set(C,T(D,["amount"],0))});const _=Array.from($).map(D=>{const P=E.get(D);return{label:y.find(C=>C.code===D)?.name??D,values:g.map(C=>P?.get(C)??0)}});return{generatedAt:new Date().toISOString(),totalAmount:v,ranking:y,months:g,monthlyByProduct:_.length>0?_:[]}}function Ds(e,t){const n=[],[s,r]=e.split("-").map(Number),[i,c]=t.split("-").map(Number);let p=s,u=r;for(;(p<i||p===i&&u<=c)&&(n.push(`${p}-${String(u).padStart(2,"0")}`),u++,u>12&&(u=1,p++),!(n.length>60)););return n}const qs={planned:"計画中",active:"仕込中",done:"完了"};async function Ts(){const e=await V("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),jikomiNo:b(t,["batch_no","legacy_batch_no"],""),productName:b(t,["brand_name"],""),riceType:b(t,["rice_type"],""),plannedKg:T(t,["planned_rice_kg"],0),actualKg:T(t,["actual_rice_kg"],0),startDate:fe(t,["start_date"],""),expectedDoneDate:fe(t,["expected_done_date"],""),status:b(t,["status"],"planned"),tankNo:b(t,["tank_no"],""),note:b(t,["remarks"],"")})):[]}async function Is(){const e=await V("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),tankNo:b(t,["tank_no"],""),capacity:T(t,["capacity_l"],0),currentVolume:T(t,["current_volume_l"],0),productName:b(t,["current_product_code"],""),jikomiNo:b(t,["current_batch_id"],""),status:b(t,["status"],"empty"),lastUpdated:fe(t,["last_updated_at"],"")})):[]}async function Ns(){const e=await V("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),kenteiNo:b(t,["kentei_no"],""),jikomiNo:b(t,["batch_id"],""),productName:b(t,["product_code"],""),kenteiDate:fe(t,["kentei_date"],""),alcoholDegree:T(t,["alcohol_degree"],0),extractDegree:T(t,["extract_degree"],0),sakaMeterValue:T(t,["sakemeter_value"],0),volume:T(t,["volume_l"],0),taxCategory:b(t,["tax_category_code"],""),status:b(t,["status"],"pending")})):[]}async function Ms(){const e=await V("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),code:b(t,["material_code","legacy_material_code"],""),name:b(t,["name"],""),unit:b(t,["unit"],""),currentStock:T(t,["current_stock"],0),minimumStock:T(t,["minimum_stock"],0),unitCost:T(t,["unit_cost"],0),lastUpdated:fe(t,["updated_at"],"")})):[]}async function Rs(){const e=await V("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),documentNo:b(t,["document_no","legacy_document_no"],""),purchaseDate:fe(t,["purchase_date"],""),supplierCode:b(t,["supplier_code","legacy_supplier_code"],""),supplierName:b(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:T(t,["total_amount"],0),status:b(t,["payment_status"],"pending")})):[]}async function Os(){const e=await V("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:b(t,["supplier_code","legacy_supplier_code"],""),supplierName:b(t,["legacy_supplier_code"],""),totalPurchase:T(t,["total_purchase"],0),paidAmount:T(t,["paid_amount"],0),balance:T(t,["balance"],0),nextPaymentDate:fe(t,["next_payment_date"],""),status:b(t,["status"],"unpaid")})):[]}async function Bs(){const e=await V("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:b(t,["id"],""),billNo:b(t,["bill_no"],""),supplierName:b(t,["counterparty_name"],""),amount:T(t,["amount"],0),issueDate:fe(t,["issue_date"],""),dueDate:fe(t,["due_date"],""),status:b(t,["status"],"holding")})):[]}async function js(){const e=await V("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:b(t,["material_code","legacy_material_code"],""),name:b(t,["name"],""),unit:b(t,["unit"],""),currentStock:T(t,["current_stock"],0),minimumStock:T(t,["minimum_stock"],0),lastPurchaseDate:fe(t,["last_purchase_date"],""),unitCost:T(t,["unit_cost"],0)})):[]}const zs=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],Na={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Ai={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function sn(e,t){const n=await V("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const s=n[0],r=b(s,["id"],""),[i,c]=await Promise.all([V("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),V("tax_deductions",{declaration_id:`eq.${r}`})]),p=i.map(y=>({taxCategory:b(y,["tax_category_code"],""),taxCategoryName:b(y,["tax_category_name"],""),alcoholDegree:T(y,["alcohol_degree"],0),volume:T(y,["taxable_volume"],0),taxRate:T(y,["tax_rate"],0),taxAmount:T(y,["tax_amount"],0),productionVolume:T(y,["production_volume"],0),previousBalance:T(y,["previous_balance"],0),currentAdjustment:T(y,["current_adjustment"],0),exportDeduction:T(y,["export_deduction"],0),sampleDeduction:T(y,["sample_deduction"],0),taxableVolume:T(y,["taxable_volume"],0)})),u=c.map(y=>({type:b(y,["deduction_type"],"sample"),categoryCode:b(y,["tax_category_code"],""),volume:T(y,["volume"],0),reason:b(y,["reason"],""),documentNo:b(y,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:b(s,["company_name"],""),companyNo:b(s,["company_no"],""),companyAddress:b(s,["company_address"],""),companyRepresentative:b(s,["company_representative"],""),taxOffice:b(s,["tax_office"],""),rows:p,deductions:u,totalVolume:T(s,["total_taxable_volume"],0),totalTax:T(s,["total_tax_amount"],0),status:b(s,["status"],"draft"),submittedAt:b(s,["submitted_at"],"")||null}}return{...Ai,targetYear:e,targetMonth:t}}function Ce(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Fs(e){const t=e.rows.map(s=>`    <Category>
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
`}function Li(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function Ci(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),s=e.rows.map(i=>[i.taxCategory,i.taxCategoryName,i.alcoholDegree,i.productionVolume,i.previousBalance,i.currentAdjustment,i.exportDeduction,i.sampleDeduction,i.taxableVolume,i.taxRate,i.taxAmount].map(Li).join(",")),r=`,合計,,${e.rows.reduce((i,c)=>i+c.productionVolume,0)},,,${e.rows.reduce((i,c)=>i+c.exportDeduction,0)},${e.rows.reduce((i,c)=>i+c.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...s,r].join(`
`)+`
`}function Di(e){const t=e.rows.map(r=>{const i=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),c=Math.round(i*r.taxRate);return{...r,taxableVolume:i,volume:i,taxAmount:c}}),n=t.reduce((r,i)=>r+i.taxableVolume,0),s=t.reduce((r,i)=>r+i.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:s}}async function qi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>te);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:Fs(e),submitted_at:e.submittedAt})}async function on(e,t){return(await ye("get_sake_tax_by_month",{p_year:e,p_month:t})).map(s=>({sakeType:s.sake_type,alcDegree:s.alc_degree??null,volumeSaleL:Number(s.volume_sale_l)||0,volumeReturnL:Number(s.volume_return_l)||0,volumeExportL:Number(s.volume_export_l)||0,volumeNetL:Number(s.volume_net_l)||0,taxRatePerKl:s.tax_rate_per_kl!==null?Number(s.tax_rate_per_kl):null,taxAmount:Number(s.tax_amount)||0}))}async function rn(e){const t=await V("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:b(n,["id"],""),saleDate:b(n,["sale_date"],e),saleTime:b(n,["sale_time"],""),productCode:b(n,["product_code"],""),productName:b(n,["product_name"],""),quantity:T(n,["quantity"],0),unitPrice:T(n,["unit_price"],0),amount:T(n,["amount"],0),paymentMethod:b(n,["payment_method"],"cash")})):[]}async function Vs(){const e=await V("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:b(t,["id"],""),orderNo:b(t,["order_no"],""),orderDate:fe(t,["order_date"],""),customerName:b(t,["customer_name"],""),postalCode:b(t,["postal_code"],""),address:b(t,["shipping_address"],""),items:[],totalAmount:T(t,["total_amount"],0),status:b(t,["status"],"new"),shippingDate:fe(t,["shipping_date"],"")})):[]}async function Ti(e,t,n,s,r,i){const c=await Pe("store_orders",{order_no:e,order_date:new Date().toISOString().slice(0,10),channel:"mobile",customer_name:t,legacy_customer_code:n||null,total_amount:s,status:"new",remarks:r||null});if(!c)return null;const p=c.id;for(let u=0;u<i.length;u++){const y=i[u];await Pe("store_order_lines",{order_id:p,line_no:u+1,product_code:y.productCode,product_name:y.productName,quantity:y.quantity,unit_price:y.unitPrice,amount:y.amount})}return p}async function Ht(e){const t=await Pe("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Us(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Ii(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await V("print_layouts",t)).map(s=>({id:b(s,["id"],""),name:b(s,["name"],""),templateKey:b(s,["template_key"],""),positions:s.positions??{},isDefault:we(s,["is_default"],!1),note:b(s,["note"],""),updatedAt:b(s,["updated_at"],"")}))}async function Ni(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>te);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},s=await t("print_layouts",n);return s?{id:b(s,["id"],e.id),name:b(s,["name"],e.name),templateKey:b(s,["template_key"],e.templateKey),positions:s.positions??e.positions,isDefault:we(s,["is_default"],!1),note:b(s,["note"],""),updatedAt:b(s,["updated_at"],"")}:null}async function Mi(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Ri(){return(await V("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),email:b(t,["email"],""),displayName:b(t,["display_name"],""),signature:b(t,["signature"],""),replyTo:b(t,["reply_to"],""),isDefault:we(t,["is_default"],!1),isVerified:we(t,["is_verified"],!1),note:b(t,["note"],"")}))}async function Oi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:b(n,["id"],e.id),name:b(n,["name"],e.name),email:b(n,["email"],e.email),displayName:b(n,["display_name"],""),signature:b(n,["signature"],""),replyTo:b(n,["reply_to"],""),isDefault:we(n,["is_default"],!1),isVerified:we(n,["is_verified"],!1)}:null}async function Bi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const ln={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},cn={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function ji(e){const t=`${e}-01T00:00:00Z`,[n,s]=e.split("-").map(p=>parseInt(p,10)),r=new Date(n,s,0).getDate(),i=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await V("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${i})`,order:"starts_at.asc"})).map(p=>({id:b(p,["id"],""),title:b(p,["title"],""),description:b(p,["description"],""),category:b(p,["category"],"general")||"general",startsAt:b(p,["starts_at"],new Date().toISOString()),endsAt:b(p,["ends_at"],""),isAllDay:we(p,["is_all_day"],!1),location:b(p,["location"],""),attendees:p.attendees??[],relatedCustomerCode:b(p,["related_customer_code"],""),relatedOrderId:b(p,["related_order_id"],""),color:b(p,["color"],""),googleEventId:b(p,["google_event_id"],"")}))}async function zi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??cn[e.category],updated_at:new Date().toISOString()})?e:null}async function Fi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Ys(){return(await V("integration_settings",{order:"name.asc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),provider:b(t,["provider"],""),config:t.config??{},isEnabled:we(t,["is_enabled"],!1),lastSyncAt:b(t,["last_sync_at"],""),lastStatus:b(t,["last_status"],"")}))}async function Ct(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function Vi(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const s=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(s,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const i=await r.json(),{supabaseInsert:c}=await I(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>te);return{supabaseInsert:u}},void 0);let p=0;for(const u of i.orders){const y=`shopify_${u.id}`;await c("shopify_orders",{id:y,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),p++}return await Ct({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得成功`}),{count:p}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function Ui(){return(await V("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:b(t,["id"],""),shopifyOrderId:b(t,["shopify_order_id"],""),orderNumber:b(t,["order_number"],""),orderDate:b(t,["order_date"],""),customerName:b(t,["customer_name"],""),customerEmail:b(t,["customer_email"],""),totalAmount:ie(t.total_amount),financialStatus:b(t,["financial_status"],""),fulfillmentStatus:b(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function Yi(e){const t=e.config.refresh_token,n=e.config.client_id,s=e.config.client_secret;if(!t||!n||!s)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:s})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const c=(await r.json()).access_token;return await Ct({...e,config:{...e.config,oauth_token:c}}),e.config.oauth_token=c,{token:c}}async function Ji(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const s=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),i=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${s}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let c=await fetch(i,{headers:{Authorization:`Bearer ${t}`}});if(c.status===401){const v=await Yi(e);if(v.error)return{count:0,error:v.error};t=v.token,c=await fetch(i,{headers:{Authorization:`Bearer ${t}`}})}if(!c.ok)return{count:0,error:`HTTP ${c.status}`};const p=await c.json(),{supabaseInsert:u}=await I(async()=>{const{supabaseInsert:v}=await Promise.resolve().then(()=>te);return{supabaseInsert:v}},void 0);let y=0;for(const v of p.items){const g=`gcal_${v.id}`,$=v.start?.dateTime??v.start?.date??"",E=v.end?.dateTime??v.end?.date??"";await u("calendar_events",{id:g,title:String(v.summary??"(無題)"),description:String(v.description??""),category:"general",starts_at:String($),ends_at:String(E),location:String(v.location??""),google_event_id:String(v.id??""),updated_at:new Date().toISOString()}),y++}return await Ct({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${y}件取得`}),{count:y}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function Ki(){return(await V("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:b(t,["id"],""),receivedAt:b(t,["received_at"],""),senderPhone:b(t,["sender_phone"],""),senderName:b(t,["sender_name"],""),imageUrl:b(t,["image_url"],""),ocrStatus:b(t,["ocr_status"],"pending")||"pending",ocrText:b(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:b(t,["linked_invoice_id"],"")}))}async function Hi(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const s=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(s){return{text:"",error:s instanceof Error?s.message:String(s)}}}async function Qi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const ta={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},aa={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function Wi(){return(await V("user_profiles",{order:"display_name.asc"})).map(t=>({id:b(t,["id"],""),email:b(t,["email"],""),displayName:b(t,["display_name"],""),staffCode:b(t,["staff_code"],""),department:b(t,["department"],"all")||"all",role:b(t,["role"],"staff")||"staff",defaultMailSenderId:b(t,["default_mail_sender_id"],""),phone:b(t,["phone"],""),avatarUrl:b(t,["avatar_url"],""),isActive:we(t,["is_active"],!0),lastSignInAt:b(t,["last_sign_in_at"],""),createdAt:b(t,["created_at"],"")}))}async function Gi(e){if(!e)return null;const t=await V("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:b(n,["id"],""),email:b(n,["email"],""),displayName:b(n,["display_name"],""),staffCode:b(n,["staff_code"],""),department:b(n,["department"],"all")||"all",role:b(n,["role"],"staff")||"staff",defaultMailSenderId:b(n,["default_mail_sender_id"],""),phone:b(n,["phone"],""),avatarUrl:b(n,["avatar_url"],""),isActive:we(n,["is_active"],!0),lastSignInAt:b(n,["last_sign_in_at"],"")}}async function Xi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function Zi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function el(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>te);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function tl(e=100){return(await V("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:b(n,["id"],""),action:b(n,["action"],""),entityType:b(n,["entity_type"],""),entityId:b(n,["entity_id"],""),userEmail:b(n,["user_email"],""),changes:n.changes??{},createdAt:b(n,["created_at"],"")}))}const na={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function Js(){return(await V("slack_notifications",{order:"event_type.asc"})).map(t=>({id:b(t,["id"],""),eventType:b(t,["event_type"],"new_order"),enabled:we(t,["enabled"],!0),channel:b(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:b(t,["last_triggered_at"],"")}))}async function al(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function nl(e=50){return(await V("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:b(n,["id"],""),eventType:b(n,["event_type"],""),channel:b(n,["channel"],""),message:b(n,["message"],""),status:b(n,["status"],"sent"),error:b(n,["error"],""),sentAt:b(n,["sent_at"],"")}))}async function sl(e,t,n){const r=(await Ys()).find(y=>y.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const i=r.config.webhook_url;if(!i)return{ok:!1,error:"Webhook URL未設定"};const p=(await Js()).find(y=>y.eventType===e&&y.enabled);if(!p)return{ok:!1,error:"通知ルールが無効"};const u=n??p.channel??r.config.default_channel??"#general";try{const y=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${na[e]} ${t}`,channel:u})}),v=y.ok,{supabaseInsert:g}=await I(async()=>{const{supabaseInsert:$}=await Promise.resolve().then(()=>te);return{supabaseInsert:$}},void 0);return await g("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:v?"sent":"failed",error:v?null:`HTTP ${y.status}`}),v?{ok:!0}:{ok:!1,error:`HTTP ${y.status}`}}catch(y){return{ok:!1,error:y instanceof Error?y.message:String(y)}}}const ca={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},dn={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function ol(){return(await V("prospects",{order:"updated_at.desc"})).map(t=>({id:b(t,["id"],""),companyName:b(t,["company_name"],""),contactName:b(t,["contact_name"],""),email:b(t,["email"],""),phone:b(t,["phone"],""),address:b(t,["address"],""),website:b(t,["website"],""),businessType:b(t,["business_type"],""),stage:b(t,["stage"],"cold"),source:b(t,["source"],""),expectedAmount:ie(t.expected_amount),probability:ie(t.probability),assignedStaffCode:b(t,["assigned_staff_code"],""),nextActionDate:b(t,["next_action_date"],""),nextAction:b(t,["next_action"],""),note:b(t,["note"],""),lastContactAt:b(t,["last_contact_at"],""),wonAt:b(t,["won_at"],""),lostAt:b(t,["lost_at"],""),lostReason:b(t,["lost_reason"],""),convertedCustomerCode:b(t,["converted_customer_code"],""),createdAt:b(t,["created_at"],"")}))}async function Ks(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0),n=await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()});return n?{...e,id:b(n,["id"],e.id)}:null}async function rl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);try{const s=new URL("/rest/v1/prospects",t);return s.searchParams.set("id",`eq.${e}`),(await fetch(s.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function il(e){return(await V("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:b(n,["id"],""),prospectId:b(n,["prospect_id"],""),activityType:b(n,["activity_type"],"call"),title:b(n,["title"],""),description:b(n,["description"],""),activityDate:b(n,["activity_date"],""),result:b(n,["result"],""),staffCode:b(n,["staff_code"],"")}))}async function ll(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const Hs=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function cl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function dl(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function pl(){return(await be("v_customer_map")).map(t=>({customerCode:b(t,["customer_code"],""),name:b(t,["name"],""),phone:b(t,["phone"],""),areaCode:b(t,["area_code"],""),businessType:b(t,["business_type"],""),businessTypeName:b(t,["business_type_name"],""),address1:b(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:we(t,["is_at_risk"],!1),isDormant:we(t,["is_dormant"],!1),amount12m:T(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}async function Qs(){return(await be("customers",{select:"id,legacy_customer_code,name,address1",is_active:"eq.true",lat:"is.null",address1:"not.is.null",order:"name.asc"})).map(t=>({id:b(t,["id"],""),customerCode:b(t,["legacy_customer_code"],""),name:b(t,["name"],""),address1:b(t,["address1"],"")}))}async function ul(e){try{const t=`https://nominatim.openstreetmap.org/search?format=json&countrycodes=jp&limit=1&q=${encodeURIComponent(e)}`,n=await fetch(t,{headers:{"User-Agent":"sake-system-crm/1.0"}});if(!n.ok)return null;const s=await n.json();return s.length===0?null:{lat:parseFloat(s[0].lat),lng:parseFloat(s[0].lon)}}catch{return null}}async function ml(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:p}},void 0),s=await Qs();let r=0,i=0;for(let c=0;c<s.length;c++){const p=s[c];e(c,s.length,p.name);const u=await ul(p.address1);if(u)try{const y=new URL(`/rest/v1/customers?id=eq.${p.id}`,t);await fetch(y.toString(),{method:"PATCH",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({lat:u.lat,lng:u.lng})}),r++}catch{i++}else i++;c<s.length-1&&await new Promise(y=>setTimeout(y,1100))}return e(s.length,s.length,"完了"),{success:r,failed:i}}const da=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function yl(){return(await be("customer_churn_notes")).map(t=>({customerCode:b(t,["customer_code"],""),reason:b(t,["reason"],""),memo:b(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:b(t,["updated_at"],"")}))}async function hl(e){const{supabaseUpsert:t}=await I(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>te);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function gl(){return(await V("delivery_locations",{order:"name.asc"})).map(t=>({id:b(t,["id"],""),customerCode:b(t,["customer_code"],""),name:b(t,["name"],""),postalCode:b(t,["postal_code"],""),address:b(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:b(t,["contact_name"],""),phone:b(t,["phone"],""),deliveryNote:b(t,["delivery_note"],""),isActive:we(t,["is_active"],!0)}))}async function fl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function vl(e=50){return(await V("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:b(n,["id"],""),callDirection:b(n,["call_direction"],"inbound"),fromNumber:b(n,["from_number"],""),toNumber:b(n,["to_number"],""),matchedCustomerCode:b(n,["matched_customer_code"],""),matchedProspectId:b(n,["matched_prospect_id"],""),durationSeconds:ie(n.duration_seconds),callStatus:b(n,["call_status"],"answered"),recordingUrl:b(n,["recording_url"],""),transcript:b(n,["transcript"],""),ivryCallId:b(n,["ivry_call_id"],""),startedAt:b(n,["started_at"],""),endedAt:b(n,["ended_at"],""),notes:b(n,["notes"],"")}))}async function Ws(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function bl(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const s=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(s,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const c=(await r.json()).calls??[];let p=0;for(const u of c)await Ws({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),p++;return await Ct({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得`}),{count:p}}catch(s){return{count:0,error:s instanceof Error?s.message:String(s)}}}async function wl(e,t){const n=e.config.api_key,s=e.config.team_id;if(!n||!s)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const i of t){if(!i.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${s}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:i.name,phone_number:i.phone,external_id:i.customerCode??"",note:i.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function xl(){return(await V("lead_lists",{order:"created_at.desc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),query:b(t,["query"],""),area:b(t,["area"],""),businessType:b(t,["business_type"],""),totalCount:ie(t.total_count),source:b(t,["source"],"manual"),createdAt:b(t,["created_at"],"")}))}async function $l(e){return(await V("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:b(n,["id"],""),listId:b(n,["list_id"],""),companyName:b(n,["company_name"],""),address:b(n,["address"],""),phone:b(n,["phone"],""),website:b(n,["website"],""),email:b(n,["email"],""),businessType:b(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:ie(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:b(n,["place_id"],""),status:b(n,["status"],"new"),convertedProspectId:b(n,["converted_prospect_id"],""),note:b(n,["note"],"")}))}async function _l(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function Gs(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function Sl(e,t,n){const s=e.config.api_key;if(!s)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),i=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${s}`;try{const c=await fetch(i);if(!c.ok)return{results:[],error:`HTTP ${c.status}`};const p=await c.json();return p.status!=="OK"&&p.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${p.status}`}:{results:p.results.map(y=>{const v=y.geometry?.location;return{id:`place_${y.place_id}`,listId:"",companyName:String(y.name??""),address:String(y.formatted_address??""),rating:y.rating?Number(y.rating):void 0,reviewCount:y.user_ratings_total?Number(y.user_ratings_total):void 0,lat:v?.lat,lng:v?.lng,placeId:String(y.place_id??""),status:"new"}})}}catch(c){return{results:[],error:c instanceof Error?c.message:String(c)}}}async function kl(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await Ks(t);return n&&await Gs({...e,status:"imported",convertedProspectId:t.id}),n}async function Pl(){return(await V("workflow_orders",{order:"order_date.desc"})).map(t=>({id:b(t,["id"],""),orderNo:b(t,["order_no"],""),customerName:b(t,["customer_name"],""),customerCode:b(t,["customer_code"],""),orderDate:b(t,["order_date"],""),deliveryDate:b(t,["delivery_date"],""),stage:b(t,["stage"],"new"),totalAmount:ie(t.total_amount),itemCount:ie(t.item_count),priority:b(t,["priority"],"normal"),staffName:b(t,["staff_name"],""),notes:b(t,["notes"],"")}))}async function El(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function Al(){return(await V("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:b(t,["id"],""),name:b(t,["name"],""),email:b(t,["email"],""),phone:b(t,["phone"],""),visitDate:b(t,["visit_date"],""),partySize:ie(t.party_size)||1,language:b(t,["language"],"ja"),purpose:b(t,["purpose"],""),message:b(t,["message"],""),status:b(t,["status"],"new"),repliedAt:b(t,["replied_at"],""),confirmedTime:b(t,["confirmed_time"],""),createdAt:b(t,["created_at"],new Date().toISOString())}))}async function Ll(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>te);return{supabaseInsert:s}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const Cl=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function Xs(){return(await Promise.all(Cl.map(async t=>{const[n,s]=await Promise.all([Ha(t.table),V(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:s[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Qt(e,t,n=100){const s=(t-1)*n,[r,i]=await Promise.all([V(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(s)}),Ha(e)]);return{records:r,total:i}}async function Ma(e){const t=await V("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const s=JSON.parse(n);return String(s.price_group??"")}catch{return""}return""}async function Zs(e,t){if(e){const s=await V("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(s.length>0&&s[0].special_price)return ie(s[0].special_price)}const n=await V("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?ie(n[0].default_sale_price):0}const Dl=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],ql=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],Tl={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function Il(){const e=new Date,t=[];for(let u=11;u>=0;u--){const y=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`)}const n=Dl,s={},r={};for(const u of n){s[u.code]={};for(const y of t){const v=parseInt(y.split("-")[1])-1,g=Tl[u.code]??100,$=Math.round(g*ql[v]*(.85+Math.random()*.3));s[u.code][y]=$,r[y]=(r[y]??0)+$}}const i={},c={},p={};for(const u of n){const y=t.map($=>s[u.code][$]??0),v=y.reduce(($,E)=>$+E,0)/y.length,g=y.reduce(($,E)=>$+(E-v)**2,0)/y.length;i[u.code]=y.reduce(($,E)=>$+E,0),c[u.code]=v,p[u.code]=Math.sqrt(g)}return{months:t,products:n,matrix:s,totals:r,productTotals:i,productAvg:c,productStdDev:p}}async function Nl(e=36){const t=(()=>{const $=new Date;return $.setMonth($.getMonth()-e),`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`})();let n=[];try{n=await be("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"})}catch($){console.warn("fetchDemandAnalysis: query failed, using empty",$)}if(n.length===0)return Il();const s=new Set,r=new Map,i={},c={};for(const $ of n){const E=b($,["year_month"],""),_=b($,["product_code"],""),D=b($,["product_name"],_),P=T($,["quantity"],0);!E||!_||(s.add(E),r.set(_,D),i[_]||(i[_]={}),i[_][E]=P,c[E]=(c[E]??0)+P)}const p=[...s].sort(),u=[...r.entries()].map(([$,E])=>({code:$,name:E})),y={},v={},g={};for(const $ of u){const E=p.map(P=>i[$.code]?.[P]??0),_=E.reduce((P,C)=>P+C,0)/(E.length||1),D=E.reduce((P,C)=>P+(C-_)**2,0)/(E.length||1);y[$.code]=E.reduce((P,C)=>P+C,0),v[$.code]=_,g[$.code]=Math.sqrt(D)}return{months:p,products:u,matrix:i,totals:c,productTotals:y,productAvg:v,productStdDev:g}}async function Ml(){let e=[];try{e=await V("product_safety_stock_params",{order:"product_code.asc"})}catch(t){return console.warn("fetchSafetyStockParams failed:",t),[]}return e.map(t=>({productCode:b(t,["product_code"],""),productName:b(t,["product_name"],""),unit:b(t,["unit"],"本"),avgMonthlyDemand:T(t,["avg_monthly_demand"],0),demandStdDev:T(t,["demand_std_dev"],0),leadTimeDays:T(t,["lead_time_days"],30),serviceLevel:T(t,["service_level"],.95),safetyStockQty:T(t,["safety_stock_qty"],0),reorderPoint:T(t,["reorder_point"],0),memo:b(t,["memo"],""),productionType:b(t,["production_type"],"monthly")}))}async function Rl(e){return(await V("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:b(n,["id"],""),yearMonth:b(n,["year_month"],e),productCode:b(n,["product_code"],""),productName:b(n,["product_name"],""),demandForecast:T(n,["demand_forecast"],0),safetyStockTarget:T(n,["safety_stock_target"],0),openingStock:T(n,["opening_stock"],0),requiredProduction:T(n,["required_production"],0),plannedQty:T(n,["planned_qty"],0),actualQty:T(n,["actual_qty"],0),status:b(n,["status"],"draft"),productionType:b(n,["production_type"],"monthly"),notes:b(n,["notes"],"")}))}async function Ol(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>te);return{SUPABASE_URL:s,SUPABASE_ANON_KEY:r}},void 0);if(!n||e.length===0)return!1;try{const s=e.map(c=>({product_code:c.productCode,product_name:c.productName,unit:c.unit,avg_monthly_demand:c.avgMonthlyDemand,demand_std_dev:c.demandStdDev,lead_time_days:c.leadTimeDays,service_level:c.serviceLevel,safety_stock_qty:c.safetyStockQty,reorder_point:c.reorderPoint,production_type:c.productionType,memo:c.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),r=new URL("/rest/v1/product_safety_stock_params",t),i=await fetch(r.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(s)});if(!i.ok){const c=await i.text();return console.error("saveSafetyStockParamsBulk failed:",i.status,c),!1}return!0}catch(s){return console.error("saveSafetyStockParamsBulk error:",s),!1}}async function Bl(e){const{supabaseUpsert:t}=await I(async()=>{const{supabaseUpsert:s}=await Promise.resolve().then(()=>te);return{supabaseUpsert:s}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function jl(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}function ha(e,t,n){t>0&&n>0&&(e[t]=(e[t]||0)+n)}function Pn(e){return Object.entries(e).map(([t,n])=>({volumeMl:Number(t),label:Number(t)>=1e3?`${Number(t)}ml`:`${Number(t)}ml`,bottles:Number(n)})).sort((t,n)=>t.volumeMl-n.volumeMl)}async function zl(e){const[t,n]=e.split("-").map(Number),s=`${e}-01`,r=new Date(t,n,0).getDate(),i=`${e}-${String(r).padStart(2,"0")}`,c=await be("sales_document_headers",{select:"document_no,legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${s},sales_date.lte.${i})`,order:"sales_date.asc"}),p=await be("sales_document_lines",{select:"document_no,legacy_product_code,quantity",note:`like.*date:${e}*`,order:"document_no"}),u=await be("products",{select:"legacy_product_code,volume_ml"}),y={};for(const D of u)D.legacy_product_code&&D.volume_ml&&(y[D.legacy_product_code]=D.volume_ml);const v={};for(const D of p){const P=D.document_no,C=y[D.legacy_product_code]||0;C>0&&D.quantity>0&&(v[P]||(v[P]={}),ha(v[P],C,D.quantity))}const g=await be("customers",{select:"legacy_customer_code,address1",address1:"not.is.null"}),$={};for(const D of g)D.address1&&($[D.legacy_customer_code]=jl(D.address1));const E={};for(const D of c){const P=D.sales_date;if(!P)continue;const C=D.legacy_customer_code||"",S=`${P}|${C}`,o=D.document_no||D.legacy_document_no||"";E[S]||(E[S]={date:P,custCode:C,custName:D.customer_name||"",city:$[C]||"住所未登録",amount:0,invoiceCount:0,volumes:{}}),E[S].amount+=Number(D.total_amount)||0,E[S].invoiceCount++;const l=v[o];if(l)for(const[d,m]of Object.entries(l))ha(E[S].volumes,Number(d),Number(m))}const _={};for(const D of Object.values(E)){_[D.date]||(_[D.date]={date:D.date,entries:[],cityGroups:[],totalAmount:0,count:0,totalVolumes:[]});const P=_[D.date];P.entries.push({customerCode:D.custCode,customerName:D.custName,city:D.city,amount:D.amount,invoiceCount:D.invoiceCount,volumes:Pn(D.volumes)}),P.totalAmount+=D.amount,P.count+=D.invoiceCount}for(const D of Object.values(_)){const P={},C={};for(const S of D.entries){P[S.city]=(P[S.city]||0)+1;for(const o of S.volumes)ha(C,o.volumeMl,o.bottles)}D.cityGroups=Object.entries(P).sort((S,o)=>o[1]-S[1]).map(([S,o])=>({city:S,count:o})),D.totalVolumes=Pn(C)}return _}async function pn(){return V("quotes",{select:"id,quote_no,quote_date,valid_until,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function eo(e){const t=await V("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await V("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function Fl(){const e=new Date().toISOString().slice(0,7)+"-01";return be("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}async function sa(){const e=await V("app_feature_status",{select:"*"}),t={};for(const n of e)t[n.feature_id]={featureId:n.feature_id,confirmedAt:n.confirmed_at,confirmedBy:n.confirmed_by,notes:n.notes};return t}async function to(e,t){await Lt("app_feature_status","feature_id",[{feature_id:e,confirmed_at:new Date().toISOString(),confirmed_by:t,updated_at:new Date().toISOString()}])}async function ao(e){await Lt("app_feature_status","feature_id",[{feature_id:e,confirmed_at:null,confirmed_by:null,updated_at:new Date().toISOString()}])}const j=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:cn,CALENDAR_CATEGORY_LABELS:ln,CHURN_REASONS:da,DEPT_LABELS:aa,INVOICE_TYPE_LABELS:Ta,JIKOMI_STATUS_LABELS:qs,MATERIAL_CATEGORIES:Hs,PROSPECT_STAGE_COLORS:dn,PROSPECT_STAGE_LABELS:ca,ROLE_LABELS:ta,SEASONAL_TEMPLATES:Wa,SLACK_EVENT_LABELS:na,TAX_DEDUCTION_LABELS:Na,TAX_RATE_CATEGORIES:zs,abcPeriodToDates:nn,addBrewingCustomCategory:li,addBrewingStockEntry:si,addRiceVariety:ei,addTank:Fr,autoScheduleAllBatches:Yr,batchGeocode:ml,calcWeeklyLabor:Qr,confirmFeature:to,convertLeadToProspect:kl,createBrewingBatch:Or,deleteBrewingCustomCategory:di,deleteBrewingStockEntry:ri,deleteCalendarEvent:Fi,deleteMailSender:Bi,deleteMaterial:dl,deletePrintLayout:Mi,deleteProspect:rl,deleteRicePurchaseCommitment:Xr,deleteRiceVariety:ti,deleteTank:Vr,deleteUserProfile:Zi,fetchAllBrewingStockEntries:ni,fetchAnalyticsByPeriod:nr,fetchAnnouncements:wi,fetchAuditLogs:tl,fetchAvailablePeriods:sr,fetchAvailableProductionTypes:$r,fetchBillList:Bs,fetchBillingSummary:tn,fetchBrewingAlcoholSettings:_r,fetchBrewingBatches:Tr,fetchBrewingCategoryOverrides:ui,fetchBrewingCustomCategories:ii,fetchBrewingForecastOverrides:Pr,fetchBrewingMonthlyTrend:yr,fetchBrewingPlanSummary:mr,fetchBrewingProcessSteps:Ir,fetchBrewingProductDetail:hr,fetchBrewingRiceParams:Ar,fetchBrewingSchedule:gr,fetchBrewingSeasonalPattern:Cr,fetchBrewingStockEntries:ai,fetchBrewingYearlyShipments:kr,fetchCalendarEvents:ji,fetchCallLogs:vl,fetchCategoryTypeLinks:br,fetchChurnAlerts:xi,fetchChurnNotes:yl,fetchCustomerAnalysis:Ls,fetchCustomerEfficiency:Ei,fetchCustomerEfficiencyByYear:rt,fetchCustomerLedger:Xa,fetchCustomerPriceGroup:Ma,fetchCustomerPricing:Ia,fetchCustomerProductBreakdown:dr,fetchCustomersWithoutGeo:Qs,fetchDeliveryLocations:gl,fetchDeliveryNote:en,fetchDeliverySchedule:bi,fetchDemandAnalysis:Nl,fetchDemandForecasts:vi,fetchEntityMonthlySales:ur,fetchFaxInbox:Ki,fetchFeatureStatuses:sa,fetchIntegrationSettings:Ys,fetchInvoiceLines:qa,fetchInvoices:Pt,fetchJikomiList:Ts,fetchKenteiList:Ns,fetchLabelExclusions:mi,fetchLeadItems:$l,fetchLeadLists:xl,fetchMailSenders:Ri,fetchMapCustomers:pl,fetchMasterStats:Ga,fetchMaterialList:Ms,fetchMyProfile:Gi,fetchOrderHeaders:Fl,fetchPayableList:Os,fetchPaymentStatus:fs,fetchPeriodChartData:lr,fetchPipelineMeta:vs,fetchPrintLayouts:Ii,fetchProcurementDecisions:Dr,fetchProductABC:Cs,fetchProductCustomerBreakdown:pr,fetchProductDaily:Pi,fetchProductMonthlyShipments:fi,fetchProductPower:ki,fetchProductPrice:Zs,fetchProductShipmentsFromTable:Si,fetchProductionPlan:Rl,fetchProspectActivities:il,fetchProspects:ol,fetchPurchaseList:Rs,fetchQuoteList:pn,fetchQuoteWithLines:eo,fetchRawMaterialStock:js,fetchRawRecords:Qt,fetchRawTableList:Xs,fetchRicePurchaseCommitments:Wr,fetchRiceVarieties:Zr,fetchSafetyStockParams:Ml,fetchSakeTaxByMonth:on,fetchSalesAnalytics:Za,fetchSalesReport:ks,fetchSalesSummary:gs,fetchSeasonalProfiles:_i,fetchShipmentCalendar:zl,fetchShopifyOrders:Ui,fetchSlackLogs:nl,fetchSlackRules:Js,fetchStaffCustomerBreakdown:rr,fetchStaffProductBreakdown:ir,fetchStaffTotalsByPeriod:or,fetchStepLabor:Hr,fetchStoreOrders:Vs,fetchStoreSales:rn,fetchSyncDashboard:bs,fetchSystemHealth:ws,fetchSystemSetting:hs,fetchTankList:Is,fetchTanks:zr,fetchTaxDeclaration:sn,fetchTourInquiriesFromDb:Al,fetchTypesInCategory:ci,fetchUserProfiles:Wi,fetchVisitPriorities:$i,fetchWorkerSettings:Jr,fetchWorkflowOrdersFromDb:Pl,generateTaxCSV:Ci,generateTaxXML:Fs,getTankOccupancy:Ur,linkTypeToCategory:wr,ocrFaxImage:Hi,periodToDateRange:$s,preloadInvoiceLines:xs,prevYearFilter:cr,reassignBrewingStockEntry:oi,recalculateTaxDeclaration:Di,recordAudit:el,resolveProductPrice:an,saveBrewingAlcoholSetting:Sr,saveBrewingForecastOverride:Er,saveBrewingRiceParams:Lr,saveBrewingSchedule:fr,saveCalendarEvent:zi,saveCallLog:Ws,saveChurnNote:hl,saveDeliveryLocation:fl,saveEmailCampaign:Ht,saveFaxRecord:Qi,saveIntegrationSetting:Ct,saveInvoice:Ss,saveLabelExclusions:yi,saveLeadItem:Gs,saveLeadList:_l,saveMailSender:Oi,saveMaterial:cl,savePrintLayout:Ni,saveProcurementDecision:qr,saveProductionPlan:Bl,saveProspect:Ks,saveProspectActivity:ll,saveRicePurchaseCommitment:Gr,saveSafetyStockParamsBulk:Ol,saveSlackRule:al,saveStoreOrder:Ti,saveTaxDeclaration:qi,saveTourInquiry:Ll,saveUserProfile:Xi,saveWorkerSettings:Kr,saveWorkflowOrder:El,searchPlaces:Sl,sendEmailCampaign:Us,sendSlackNotification:sl,setBrewingCategoryOverride:pi,submitFeatureRequest:Ps,syncGoogleCalendar:Ji,syncIvryCallLogs:bl,syncPhoneBookToIvry:wl,syncShopifyOrders:Vi,unconfirmFeature:ao,unlinkTypeFromCategory:xr,updateBrewingBatch:jr,updateBrewingProcessStep:Br,updateCustomer:Es,updateProduct:As,upsertBrewingStock:vr,upsertSystemSetting:st},Symbol.toStringTag,{value:"Module"}));function Ze(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Vl={open:"未締め",closed:"締め済"};function Ul(e,t){const n=e.customers.map(s=>`
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
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${Vl[s.status]}</span>
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
  `}const Yl={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},Jl={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function En(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Tt(e){const t=Jl[e],n=Yl[e].map(s=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${En(s.title)}</p>
            <p class="category-card-description">${En(s.description)}</p>
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
  `}function no(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function _t(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Kl(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${no(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${_t(t.amount)}</td>
        </tr>
      `).join("")}function Hl(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${no(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${_t(t.amount)}</td>
        </tr>
      `).join("")}function Ql(e,t){return`
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
            <dd>${_t(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${_t(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${_t(e.balanceAmount)}</dd>
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
            <tbody>${Kl(e)}</tbody>
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
            <tbody>${Hl(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function mt(e,t,n){const s=e.findIndex(i=>i.column===t);if(s>=0){if(e[s].direction==="asc"){const c=[...e];return c[s]={column:t,direction:"desc"},c}return e.filter((c,p)=>p!==s)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function Wl(e,t){const n=e.findIndex(i=>i.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const s=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${s}${r}</span>`}function ne(e,t,n,s=""){return`<th class="sortable ${s}" data-sort-col="${e}">${t} ${Wl(n,e)}</th>`}function An(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function ct(e,t,n){return t.length===0?e:[...e].sort((s,r)=>{for(const{column:i,direction:c}of t){const p=n[i];if(!p)continue;const u=An(s[p]),y=An(r[p]);let v=0;if(typeof u=="number"&&typeof y=="number"?v=u-y:v=String(u).localeCompare(String(y),"ja"),v!==0)return c==="asc"?v:-v}return 0})}const Gl={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},Ln={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},yt={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function Xl(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function Zl(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function ec(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function so(e,t){const n=Zl(t),s=ec(t),[r,i]=t.split("-").map(Number),c=new Map;e.forEach(l=>{if(l.date.slice(0,7)===t){const d=l.date.slice(0,10);c.has(d)||c.set(d,[]),c.get(d).push(l)}});const p=e.filter(l=>l.date.slice(0,7)===t),u=p.reduce((l,d)=>l+d.quantity,0),y=new Set(p.map(l=>l.date)).size,v=new Date().toISOString().slice(0,10),g=["日","月","火","水","木","金","土"].map(l=>`<th class="dcal-header">${l}</th>`).join("");let $="",E=1;for(let l=0;l<6&&!(E>n&&l>0);l++){$+="<tr>";for(let d=0;d<7;d++)if(l===0&&d<s||E>n)$+='<td class="dcal-cell dcal-empty"></td>';else{const m=`${r}-${String(i).padStart(2,"0")}-${String(E).padStart(2,"0")}`,h=c.get(m)||[],w=m===v,f=h.reduce((x,k)=>x+k.quantity,0);$+=`
          <td class="dcal-cell ${w?"dcal-today":""}">
            <div class="dcal-day">${E}</div>
            ${h.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${h[0].status}">${h.length}件 ${f}本</div>
              </div>
            `:""}
          </td>`,E++}$+="</tr>"}const[_,D]=i===1?[r-1,12]:[r,i-1],[P,C]=i===12?[r+1,1]:[r,i+1],S=`${_}-${String(D).padStart(2,"0")}`,o=`${P}-${String(C).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${i}月: ${y}日稼働 / ${p.length}件 / 合計${u.toLocaleString()}本</p>
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
  `}function tc(e,t){const n=t==="all"?e:e.filter(p=>p.segment===t),s={all:e.length};e.forEach(p=>{s[p.segment]=(s[p.segment]??0)+1});const i=["all",...[...new Set(e.map(p=>p.segment))]].map(p=>`
      <button class="button ${t===p?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${p}">
        ${p==="all"?"全て":Ln[p]??p} (${s[p]??0})
      </button>
    `).join(""),c=n.map(p=>`
      <tr>
        <td class="mono">${p.code}</td>
        <td>${p.name}</td>
        <td><span class="segment-badge" style="background:${yt[p.segment]??"#718096"};">${Ln[p.segment]??p.segment}</span></td>
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
            <li><span class="segment-badge" style="background:${yt.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${yt["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${yt["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${yt["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
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
  `}function ac(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${so(e.deliveries,e.calendarMonth)}
    ${tc(e.forecasts,e.selectedSegment)}
  `}function nc(e,t){return so(e,t)}const It={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function Cn(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function ga(e,t,n){if(t==="all")return e;const s=new Date,r=s.toISOString().slice(0,10),i=new Date(s);switch(t){case"today":return e.filter(c=>c.date.slice(0,10)===r);case"month":return e.filter(c=>c.date.slice(0,7)===r.slice(0,7));case"future":{const c=new Date(s.getFullYear(),s.getMonth(),1).toISOString().slice(0,10);return e.filter(p=>p.date.slice(0,10)>=c)}case"90days":return i.setDate(i.getDate()-90),e.filter(c=>c.date>=i.toISOString());case"year":return i.setFullYear(i.getFullYear()-1),e.filter(c=>c.date>=i.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(c=>{const p=c.date.slice(0,10);return p>=n.start&&p<=n.end})}}function ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function fa(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function sc(e){const s={top:20,right:20,bottom:30,left:50},r=760-s.left-s.right,i=260-s.top-s.bottom,c=Math.max(...e.map(v=>v.amount),1),p=r/e.length,u=e.map((v,g)=>{const $=v.amount/c*i,E=s.left+g*p+4,_=s.top+i-$,D=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(v.date));return`
        <g>
          <rect x="${E}" y="${_}" width="${Math.max(p-8,8)}" height="${$}" rx="4" fill="#0F5B8D" opacity="${.58+g/e.length*.34}" />
          ${g%5===0?`<text x="${E+6}" y="252" class="chart-axis">${D}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(v=>{const g=s.top+i-i*v,$=Math.round(c*v/1e3);return`
        <g>
          <line x1="${s.left}" y1="${g}" x2="${760-s.right}" y2="${g}" class="chart-grid" />
          <text x="6" y="${g+4}" class="chart-axis">${$.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function oc(e,t,n,s,r="month",i,c=[]){const p={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=ga(e.allDailySales,r,i),y=u.reduce((O,U)=>O+U.amount,0),v=u.reduce((O,U)=>O+U.bottles,0),g=u.reduce((O,U)=>O+U.volumeMl,0),$=u.length,E=v>0?Math.round(y/v):0,_=g>0?Math.round(y/(g/1e3)):0,D=new Date,P=D.toISOString().slice(0,10),C=P.slice(0,7),S=ga(e.allDailySales,"month").filter(O=>O.date.slice(0,10)<=P),o=S.reduce((O,U)=>O+U.amount,0);S.reduce((O,U)=>O+U.bottles,0);const l=D.getDate();new Date(D.getFullYear(),D.getMonth()+1,0).getDate();const m=(s?.orderHeaders??[]).filter(O=>O.sales_date.slice(0,7)===C),h=m.reduce((O,U)=>O+Number(U.total_amount),0),w=m.length,f=ga(e.allDailySales,"month"),x=f.reduce((O,U)=>O+U.bottles,0),k=h>0?h:f.reduce((O,U)=>O+U.amount,0),L=h>0?"orders":"extrapolation",N=(u.length>0?e.allDailySales.filter(O=>{const U=u[0]?.date??"",H=u[u.length-1]?.date??"",G=Cn(U,-1),W=Cn(H,-1);return O.date>=G&&O.date<=W}):[]).reduce((O,U)=>O+U.amount,0),R=N>0?(y-N)/N*100:0,M=R>0?"+":"",z=e.salesRecords.slice(0,10).map(O=>`
            <tr class="clickable-row" data-doc-no="${O.documentNo}" style="cursor:pointer">
              <td class="mono">${O.documentNo}</td>
              <td>${fa(O.date)}</td>
              <td>${O.customerName}</td>
              <td class="numeric">${ke(O.amount)}</td>
            </tr>
          `).join(""),B=["today","month","future","90days","year","all"].map(O=>`<button class="button ${O===r?"primary":"secondary"} small" type="button" data-period="${O}">${It[O]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${p[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${fa(t.lastSyncAt)}</span>
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
        <p class="kpi-sub">${L==="orders"?`受注確定 ${w}件`:`出荷見込 ${x.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${R>=0?"#2f855a":"#c53d3d"}">${N>0?`${M}${R.toFixed(1)}%`:"―"}</p>
        <p class="kpi-sub">前年同期 ${N>0?ke(N):"データなし"}</p>
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
        <p class="panel-title">${It[r]}売上</p>
        <p class="kpi-value">${ke(y)}</p>
        <p class="kpi-sub">${$}日間${$>0?` / 日平均 ${ke(Math.round(y/$))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${v.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${ke(E)}</p>
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
            <p class="panel-caption">${It[r]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${sc(u.length>0?u:e.dailySales)}
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
              <dd>${fa(t.lastSyncAt)}</dd>
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
          <p class="panel-caption">${It[r]} — 売上・本数・液体量・単価（${u.length}日分）</p>
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
          <tbody>${ct(c.length>0?u:u.slice().reverse(),c,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(O=>`
            <tr>
              <td class="mono">${O.date.slice(0,10)}</td>
              <td class="numeric">${ke(O.amount)}</td>
              <td class="numeric">${O.bottles.toLocaleString("ja-JP")}</td>
              <td class="numeric">${(O.volumeMl/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})}</td>
              <td class="numeric">${ke(O.pricePerBottle)}</td>
              <td class="numeric">${ke(O.pricePerLiter)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </details>

    ${s?rc(s):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function rc(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(p=>p.startsAt.slice(0,10)>=t).slice(0,5),s=e.tourInquiries.filter(p=>p.status==="new").length,r=e.churnSummary,i=r?r.atRiskCount+r.dormantCount+r.decliningCount:null,c=r?`<article class="panel kpi-card ${r.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
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

    ${e.deliveries&&e.deliveries.length>0?nc(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?ic(e.orderHeaders):""}
  `}function ic(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),s=new Date().toISOString().slice(0,10),r=s.slice(0,7),i=new Map;for(const g of e){const $=g.sales_date.slice(0,7),E=i.get($)??{count:0,total:0};i.set($,{count:E.count+1,total:E.total+Number(g.total_amount)})}const c=[...i.keys()].sort(),p=e.reduce((g,$)=>g+Number($.total_amount),0),u=c.map(g=>{const{count:$,total:E}=i.get(g);return`<tr>
      <td class="mono" style="font-weight:700;">${g===r?`${g}（当月）`:g}</td>
      <td class="numeric">${$.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(E)}</td>
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
  `}function lc(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function et(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function cc(e,t){const n=e.lines.length?e.lines.map((r,i)=>`
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
            <tr><th>納品日</th><td>${lc(e.invoiceDate)}</td></tr>
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
  `}function qe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function dc(e){return qe(e).replaceAll(`
`,"<br />")}function pc(e){const n=[...Object.values(Wa),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
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
          <div class="preview-box">${e.body?dc(e.body):"本文未入力"}</div>
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
  `}function De(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Nt(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function uc(e,t){const n=[Nt("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${De(r.name)}</strong>
            <span class="table-sub mono">${De(r.code)}</span>
          </button>
        `)),Nt("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${De(r.name)}</strong>
            <span class="table-sub mono">${De(r.code)}</span>
          </button>
        `)),Nt("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${De(r.documentNo)}</strong>
            <span class="table-sub">${De(r.customerName)} / ${De(r.date)}</span>
          </button>
        `)),Nt("ページ",t.pages.map(r=>`
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
  `}function ht(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oo(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${ht(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${ht(e.title)}">
        <div class="modal-header">
          <h2>${ht(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${ht(e.placeholder)}"
            value="${ht(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function Mt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Dn(e){return e.trim().toLowerCase()}function mc(e,t){const n=Dn(t),s=e.filter(i=>n?[i.code,i.name,i.name].map(Dn).some(c=>c.includes(n)):!0).slice(0,50),r=s.length?`
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
                      data-code="${Mt(i.code)}"
                      data-name="${Mt(i.name)}"
                    >
                      <td class="mono">${Mt(i.code)}</td>
                      <td>${Mt(i.name)}</td>
                      <td>${i.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return oo({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:r,emptyMessage:"該当する得意先が見つかりません。"})}function yc(e){return e.toISOString().slice(0,10)}function Ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ye(e,t){return e[t]?`<div class="field-error">${Ge(e[t])}</div>`:""}function tt(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function hc(e,t,n,s){const r=Object.keys(Ta).map(u=>`<option value="${u}" ${e.invoiceType===u?"selected":""}>${Ta[u]}</option>`).join(""),i=e.lines.map((u,y)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${tt(s,`lines.${y}.productCode`,"input-cell")}" type="text" data-line="${y}" data-field="productCode" value="${Ge(u.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${y}" aria-label="商品検索">🔍</button>
          </div>
          ${Ye(s,`lines.${y}.productCode`)}
        </td>
        <td>
          <input class="${tt(s,`lines.${y}.productName`,"input-cell")}" type="text" data-line="${y}" data-field="productName" value="${Ge(u.productName)}" placeholder="商品名" />
          ${Ye(s,`lines.${y}.productName`)}
        </td>
        <td>
          <input class="${tt(s,`lines.${y}.quantity`,"input-cell numeric")}" type="number" data-line="${y}" data-field="quantity" value="${u.quantity}" min="0" />
          ${Ye(s,`lines.${y}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${y}" data-field="unit" value="${u.unit}" placeholder="本" /></td>
        <td>
          <input class="${tt(s,`lines.${y}.unitPrice`,"input-cell numeric")}" type="number" data-line="${y}" data-field="unitPrice" value="${u.unitPrice}" min="0" />
          ${Ye(s,`lines.${y}.unitPrice`)}
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
          <select id="inv-type">${r}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${tt(s,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||yc(new Date)}" />
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
  `}function gc(e){return"¥"+e.toLocaleString("ja-JP")}function fc(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const vc={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},bc={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},wc={sake:"酒販用",standard:"通常"};function xc(e,t){return`
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
        <td>${fc(s.quote_date)}</td>
        <td>${s.customer_name||"（未選択）"}</td>
        <td>${s.subject||""}</td>
        <td class="numeric">${gc(s.total_amount)}</td>
        <td><span class="badge ${bc[s.status]??"badge-gray"}">${vc[s.status]??s.status}</span></td>
        <td>${wc[s.template_type]??s.template_type}</td>
        <td>
          <button class="button secondary small" data-open-quote="${s.id}">開く</button>
          <button class="button secondary small danger" data-delete-quote="${s.id}" data-quote-no="${s.quote_no}">削除</button>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}const ro="kanei-quote-settings",io=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Wt={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function Ra(){try{const e=localStorage.getItem(ro);if(e)return{...Wt,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Wt,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Wt}}function Xe(e){localStorage.setItem(ro,JSON.stringify(e))}function Me(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Se(e,t,n,s="text",r=""){return`<div class="form-row"><label>${t}</label><input type="${s}" id="${e}" value="${Me(n)}" placeholder="${Me(r)}" /></div>`}function $c(e,t,n,s){const r=s.map(i=>`<option value="${Me(i)}" ${n===i?"selected":""}>${Me(i)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${r}</select></div>`}function _c(e){return`
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
        ${$c("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
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
        ${io.map(t=>`
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
  `}function Sc(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function oa(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:Sc(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}oa();function ee(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ae(e){return"¥"+e.toLocaleString("ja-JP")}function qn(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function lo(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function co(e,t,n){return"#"+[e,t,n].map(s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0")).join("")}function ra(e,t){const[n,s,r]=lo(e);return co(n+(255-n)*t,s+(255-s)*t,r+(255-r)*t)}function po(e,t){const[n,s,r]=lo(e);return co(n*(1-t),s*(1-t),r*(1-t))}function kc(e){const t=po(e,.15),n=ra(e,.88),s=ra(e,.96);return`
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
`}function Pc(e){const t=po(e,.15),n=ra(e,.88),s=ra(e,.96);return`
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
`}function uo(e,t){const n=e.lines.reduce((_,D)=>_+D.amount,0),s=Math.round(n*e.taxRate/100),r=n+s,i=e.templateType==="sake",c=i?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",p=i?9:6,u=e.lines.map((_,D)=>{const P=i?`<td style="font-size:9px;">${ee(_.janCode)}</td><td style="text-align:center;">${_.caseQty??""}</td><td style="text-align:right;">${_.retailPrice!=null?Ae(_.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${D+1}</td>
      <td class="mono" style="font-size:9px;">${ee(_.productCode)}</td>
      <td>${ee(_.productName)}</td>
      ${P}
      <td style="text-align:right;">${_.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${ee(_.unit)}</td>
      <td style="text-align:right;">${Ae(_.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${p}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,y=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),v=y?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${ee(y)}</p>
    </div>
  `:"",g=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",$=[];e.validUntil&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${qn(e.validUntil)}</div></div>`),e.paymentTerms&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${ee(e.paymentTerms)}</div></div>`),e.deliveryDate&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${ee(e.deliveryDate)}</div></div>`),e.deliveryPlace&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${ee(e.deliveryPlace)}</div></div>`);const E=$.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min($.length,4)},1fr);">${$.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <div class="q-meta-box">
      ${e.quoteNo?`<div class="q-meta-item"><span class="q-meta-label">見積番号</span><span class="q-meta-val">${ee(e.quoteNo)}</span></div>`:""}
      <div class="q-meta-item"><span class="q-meta-label">見積日</span><span class="q-meta-val">${qn(e.quoteDate)}</span></div>
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

  ${E}

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

  ${v}
</div>`}function mo(e,t,n,s,r,i,c){const p=e.lines.reduce((_,D)=>_+D.amount,0),u=Math.round(p*e.taxRate/100),y=p+u,v=e.templateType==="sake",g=s.length>=1?t.filter(_=>_.name.includes(s)||_.code.includes(s)).slice(0,8):[],$=r.length>=1?n.filter(_=>_.name.includes(r)||_.code.includes(r)).slice(0,8):[];if(e.previewMode){const _=c.accentColor||"#0968e5";return`
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
        ${Pc(_)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${uo(e,c)}
      </div>
    `}const E=e.lines.map((_,D)=>{const P=v?`
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
          ${io.map(_=>`
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
      ${$.length>0?`<div class="search-results">${$.map(_=>{const D=i?an(_,i):{price:_.salePrice||0,label:"卸価格"},P=_.listPrice||0,C=D.label!=="標準価格"&&D.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${_.code}" data-prod-name="${ee(_.name)}" data-prod-price="${D.price}" data-prod-retail="${P}" data-prod-jan="${ee(_.janCode??"")}" data-prod-unit="${ee(_.unit??"本")}" data-prod-case="${_.caseQty??""}">
          <span class="mono">${_.code}</span> ${ee(_.name)}
          <span class="numeric" ${C?'style="color:#2f855a;font-weight:700;"':""}>納入 ${D.price?Ae(D.price):"未設定"} <small>(${D.label})</small>${P?`　定価 ${Ae(P)}`:""}</span>
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
          <tbody>${E}</tbody>
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
          <div class="total-row"><span>合計</span><span class="numeric">${Ae(y)}</span></div>
        </div>
      </div>
    </section>
  `}async function Ec(e,t){const n=t.accentColor||"#0968e5",s=document.createElement("div");s.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",s.innerHTML=`<style>${kc(n)}</style>${uo(e,t)}`,document.body.appendChild(s);try{const[{default:r},{jsPDF:i}]=await Promise.all([I(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),I(()=>import("./jspdf.es.min-SCmH2IMP.js").then(_=>_.j),[])]),c=await r(s,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),p=210,u=297,y=c.width/p,v=u*y,g=new i({orientation:"portrait",unit:"mm",format:"a4"});let $=0,E=0;for(;$<c.height;){E>0&&g.addPage();const _=Math.min(v,c.height-$),D=document.createElement("canvas");D.width=c.width,D.height=Math.ceil(_);const P=D.getContext("2d");P.fillStyle="#ffffff",P.fillRect(0,0,D.width,D.height),P.drawImage(c,0,$,c.width,_,0,0,c.width,_);const C=D.toDataURL("image/jpeg",.95),S=_/y;g.addImage(C,"JPEG",0,0,p,S),$+=v,E++}g.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(s)}}function Rt(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function yo(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ho(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function go(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function Ac(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function Lc(e,t,n,s,r){const i=new Map,c=new Map;for(const v of e){if(v.date>=t&&v.date<=n){const g=i.get(v.productCode);g?(g.amt+=v.amount,g.qty+=v.qty):i.set(v.productCode,{name:v.productName,vol:v.volumeMl,amt:v.amount,qty:v.qty})}v.date>=s&&v.date<=r&&c.set(v.productCode,(c.get(v.productCode)??0)+v.amount)}const p=[...i.entries()].map(([v,g])=>({code:v,...g})).sort((v,g)=>g.amt-v.amt),u=p.reduce((v,g)=>v+g.amt,0);let y=0;return p.map(v=>{y+=v.amt;const g=u>0?Math.round(v.amt*1e4/u)/100:0,$=y<=u*.7?"A":y<=u*.9?"B":"C",E=c.get(v.code)??0,_=E>0?Math.round((v.amt-E)/E*1e3)/10:null;return{code:v.code,name:v.name,volumeMl:v.vol,amount:v.amt,qty:v.qty,sharePct:g,rank:$,prevAmount:E,growthRate:_}})}function Cc(e,t,n){const s=new Date,r=s.toISOString().slice(0,10);let i=r,c=r,p="";switch(e){case"week":{const v=new Date(s);v.setDate(v.getDate()-7),i=v.toISOString().slice(0,10),c=r,p="直近7日間";break}case"month":{i=r.slice(0,7)+"-01",c=r,p="当月";break}case"90days":{const v=new Date(s);v.setDate(v.getDate()-90),i=v.toISOString().slice(0,10),c=r,p="直近90日間";break}case"year":{const v=new Date(s);v.setFullYear(v.getFullYear()-1),i=v.toISOString().slice(0,10),c=r,p="直近1年間";break}case"custom":{i=t||r,c=n||r,p=`${i} 〜 ${c}`;break}}const u=new Date(i);u.setFullYear(u.getFullYear()-1);const y=new Date(c);return y.setFullYear(y.getFullYear()-1),{start:i,end:c,prevStart:u.toISOString().slice(0,10),prevEnd:y.toISOString().slice(0,10),label:p}}function Dc(e,t="all",n=[],s="year",r,i,c=[]){const p=Cc(s,r,i),u=n.length>0?Lc(n,p.start,p.end,p.prevStart,p.prevEnd):e.map(S=>({code:S.code,name:S.name,volumeMl:S.volumeMl,amount:S.yearAmount,qty:S.yearQty,sharePct:S.sharePct,rank:S.rank,prevAmount:S.prevAmount,growthRate:S.growthRate})),y=u.filter(S=>S.rank==="A").length,v=u.filter(S=>S.rank==="B").length,g=u.filter(S=>S.rank==="C").length,$=u.filter(S=>S.growthRate!=null&&S.growthRate>10),E=u.filter(S=>S.growthRate!=null&&S.growthRate<-10);let _=u,D="全商品";switch(t){case"A":_=u.filter(S=>S.rank==="A"),D="Aランク";break;case"B":_=u.filter(S=>S.rank==="B"),D="Bランク";break;case"C":_=u.filter(S=>S.rank==="C"),D="Cランク";break;case"growing":_=$,D="成長商品(+10%以上)";break;case"declining":_=E,D="衰退商品(-10%以下)";break}const P=(S,o,l)=>`<button class="button ${t===S?"primary":"secondary"} small" data-product-filter="${S}">${o} (${l})</button>`,C=(S,o)=>`<button class="button ${s===S?"primary":"secondary"} small" data-product-period="${S}">${o}</button>`;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>商品力分析</h1>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">
        ${C("week","週次")}
        ${C("month","月次")}
        ${C("90days","90日")}
        ${C("year","年間")}
        ${C("custom","指定期間")}
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
        <p class="kpi-value">${y} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">Bランク（70-90%）</p>
        <p class="kpi-value">${v} 商品</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">成長商品</p>
        <p class="kpi-value">${$.length}</p>
        <p class="kpi-sub">前年同期比+10%以上</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">衰退商品</p>
        <p class="kpi-value">${E.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${D} (${_.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${P("all","全て",u.length)}
        ${P("A","A",y)}
        ${P("B","B",v)}
        ${P("C","C",g)}
        ${P("growing","成長",$.length)}
        ${P("declining","衰退",E.length)}
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
            ${ct(_,c,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(S=>`
              <tr>
                <td>${ho(S.rank)}</td>
                <td>${S.name?S.name.slice(0,25):S.code}${S.volumeMl?` <small>${S.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${yo(S.amount)}</td>
                <td class="numeric">${S.sharePct}%</td>
                <td class="numeric">${S.qty.toLocaleString()}</td>
                <td class="numeric">${go(S.growthRate)}</td>
              </tr>
            `).join("")}
            ${_.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function qc(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,s="billing",r="jan"){const i=e.filter(E=>E.currentRank==="A").length,c=e.filter(E=>E.prevRank&&E.currentRank<E.prevRank).length,p=e.filter(E=>E.prevRank&&E.currentRank>E.prevRank).length,u=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,y=2011,v=[];for(let E=u;E>=y&&v.length<6;E--)v.push(E);const g=`
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;">
      <span style="font-size:13px;color:var(--text-secondary);margin-right:4px;">年度：</span>
      ${v.map(E=>`
        <button class="button ${E===n?"primary":"secondary"} small"
          data-action="efficiency-year-change" data-year="${E}"
          style="min-width:80px;">
          ${E}年度
        </button>
      `).join("")}
      <select data-action="efficiency-year-select"
        style="margin-left:8px;padding:4px 8px;border-radius:4px;border:1px solid var(--border);background:var(--surface);font-size:13px;">
        <option value="">過去年度…</option>
        ${Array.from({length:u-y+1},(E,_)=>u-_).filter(E=>!v.includes(E)).map(E=>`<option value="${E}" ${E===n?"selected":""}>${E}年度</option>`).join("")}
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
            ${ct(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(E=>`
              <tr>
                <td>${ho(E.currentRank)}</td>
                <td>${E.name||E.code}</td>
                <td class="numeric">${yo(E.yearAmount)}</td>
                <td class="numeric">${E.sharePct}%</td>
                <td class="numeric">${E.orderDays}日</td>
                <td class="numeric">${go(E.growthRate)}</td>
                <td>${Ac(E.currentRank,E.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Tc(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Gt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ic(e,t,n=null,s=null){const r=e.length?e.map(i=>`
            <tr class="clickable-row${i.documentNo===n?" selected-row":""}"
                data-doc-no="${i.documentNo}">
              <td class="mono">${i.documentNo}</td>
              <td>${Tc(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${i.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Gt(i.amount)}</td>
            </tr>
            ${i.documentNo===n?Nc(s):""}
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
  `}function Nc(e){if(!e)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(s=>`
      <tr>
        <td class="mono" style="width:40px">${s.lineNo}</td>
        <td class="mono" style="width:70px">${s.productCode}</td>
        <td class="product-name">${s.productName}</td>
        <td class="numeric" style="width:50px">${s.quantity}</td>
        <td class="numeric" style="width:80px">${Gt(s.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Gt(s.amount)}</td>
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
            <td class="numeric">${Gt(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function Mc(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Rc(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function fo(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function vo(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function Tn(e){const t=fo(vo(e),6);return t.setHours(23,59,59,999),t}function In(e){return new Date(`${e}T00:00:00`)}function Nn(e){return`${e.getMonth()+1}/${e.getDate()}`}function Oc(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Bc(){const e=new Date,t=vo(Rc(Mc(e),-3)),n=Tn(new Date(e.getFullYear(),e.getMonth()+4,0)),s=[];let r=new Date(t);for(;r<=n;){const i=Tn(r);s.push({start:new Date(r),end:i,label:`${Nn(r)} - ${Nn(i)}`}),r=fo(r,7)}return s}function jc(e){const t=Bc(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,s=t.map(i=>`
        <div class="gantt-week">
          <span>${i.label}</span>
        </div>
      `).join(""),r=e.length?e.map(i=>{const c=In(i.startDate),p=In(i.expectedDoneDate),u=Math.max(0,t.findIndex(g=>g.end>=c)),y=Math.max(u,t.reduce((g,$,E)=>$.start<=p?E:g,u)),v=[`仕込番号: ${i.jikomiNo}`,`銘柄: ${i.productName}`,`期間: ${i.startDate} - ${i.expectedDoneDate}`,`タンク: ${i.tankNo}`,`備考: ${i.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${i.jikomiNo}</strong>
                <span class="table-sub">${i.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${i.status}"
                  style="grid-column:${u+1} / ${y+2}"
                  title="${Oc(v)}"
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
  `}function Mn(e,t){const n={planned:"neutral",active:"warning",done:"success"},s=e.map(p=>`
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
          <span class="status-pill ${n[p.status]}">${qs[p.status]}</span>
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
  `}function zc(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},s=e.map(u=>`
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
        <p class="kpi-value">${e.filter(u=>u.status==="approved").reduce((u,y)=>u+y.volume,0).toLocaleString("ja-JP")} L</p>
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
  `}function Fc(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Vc(e,t){return`
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
        ${e?`<p class="field-error">${Fc(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function Uc(e){return`
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
  `}function Yc(e){return`
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
  `}const un={query:"",businessType:"",tradeType:"",areaCode:"",activeOnly:"",page:1},St=50;function Jc(e,t){let n=e;if(t.query){const p=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(p)||u.name.toLowerCase().includes(p)||u.kanaName&&u.kanaName.toLowerCase().includes(p)||u.address1&&u.address1.toLowerCase().includes(p)||u.phone&&u.phone.toLowerCase().includes(p))}t.businessType&&(n=n.filter(p=>p.businessType===t.businessType)),t.tradeType&&(n=n.filter(p=>p.tradeType===t.tradeType)),t.areaCode&&(n=n.filter(p=>p.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(p=>p.isActive):t.activeOnly==="inactive"&&(n=n.filter(p=>!p.isActive));const s=Math.max(1,Math.ceil(n.length/St)),i=(Math.min(t.page,s)-1)*St,c=n.slice(i,i+St);return{filtered:n,paged:c,totalPages:s}}function Rn(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const s=(t-1)*St+1,r=Math.min(t*St,e),i=[];for(let c=1;c<=n;c++)c===1||c===n||c>=t-2&&c<=t+2?i.push(`<button class="button ${c===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${c}" style="min-width:36px;padding:4px 8px;">${c}</button>`):(c===t-3||c===t+3)&&i.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${s}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${i.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function Kc(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),s=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
          ${Object.entries(Qc).map(([r,i])=>`<option value="${r}" ${t.tradeType===r?"selected":""}>${i}</option>`).join("")}
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
  `}function Oa(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Hc(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}const Qc={B2B:"B2B（卸）",B2B2C:"B2B2C（生産者）",B2C:"B2C（小売）"};function Wc(e){return e?`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${{B2B:"#3b82f6",B2B2C:"#8b5cf6",B2C:"#10b981"}[e]??"#999"};">${e}</span>`:"―"}function Gc(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${Wc(t.tradeType)}</td>
          <td>${Hc(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${Oa(t.address1||"",16)}</td>
          <td>${Oa(t.address2||"",12)}</td>
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
      `).join("")}function Ot(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function Xc(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${Oa(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${Ot(t.purchasePrice)}</td>
          <td class="numeric">${Ot(t.salePrice)}</td>
          <td class="numeric">${Ot(t.listPrice)}</td>
          <td class="numeric">${Ot(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function Zc(e,t,n=un,s=[]){const{filtered:r,paged:i,totalPages:c}=Jc(e.customers,n);return`
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
        ${Kc(e.customers,n)}
        ${Rn(r.length,n.page,c)}
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
            <tbody>${Gc(ct(i,s,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${Rn(r.length,n.page,c)}
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
            <tbody>${Xc(ct(e.products,s,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function va(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ed(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${Hs.map(s=>`<option ${n?.materialType===s?"selected":""}>${s}</option>`).join("")}
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
  `}function td(e){const t=e.map(r=>{const c=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${va(r.unitCost)}</td>
          <td class="numeric">${va(r.currentStock*r.unitCost)}</td>
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
        <p class="kpi-value">${va(s)}</p>
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
  `}function ad(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function ba(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const nd={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function sd(e){return`
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
          <td class="numeric">${ba(n.billedAmount)}</td>
          <td class="numeric">${ba(n.paymentAmount)}</td>
          <td class="numeric">${ba(n.balanceAmount)}</td>
          <td>${ad(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${nd[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function at(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function On(e){return e.trim().toLowerCase()}function od(e,t){const n=On(t),s=e.filter(i=>n?[i.code,i.name,i.janCode].map(On).some(c=>c.includes(n)):!0),r=s.length?`
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
      `:"";return oo({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:r,emptyMessage:"該当する商品が見つかりません。"})}function Je(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function rd(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},i={unpaid:"warning",partial:"neutral",paid:"success"},c=e.map(g=>`
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
    `).join(""),u=e.reduce((g,$)=>g+$.amount,0),y=t.reduce((g,$)=>g+$.balance,0),v=t.filter(g=>g.status!=="paid").length;return`
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
        <p class="kpi-value">${Je(y)}</p>
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
  `}function gt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function id(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},r=e.map(v=>`
      <tr>
        <td class="mono">${v.billNo}</td>
        <td>${v.supplierName}</td>
        <td class="numeric">${gt(v.amount)}</td>
        <td>${v.issueDate}</td>
        <td>${v.dueDate}</td>
        <td>
          <span class="status-pill ${s[v.status]}">${n[v.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${v.id}" ${v.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),i=t.map(v=>{const g=v.minimumStock>0&&v.currentStock<v.minimumStock*1.2;return`
        <tr>
          <td class="mono">${v.code}</td>
          <td>${v.name}</td>
          <td class="numeric ${g?"text-danger":""}">
            ${v.currentStock.toLocaleString("ja-JP")} ${v.unit}
            ${g?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${v.minimumStock.toLocaleString("ja-JP")} ${v.unit}</td>
          <td class="numeric">${gt(v.unitCost)}</td>
          <td class="numeric">${gt(v.currentStock*v.unitCost)}</td>
          <td>${v.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=e.filter(v=>v.status==="holding"),p=c.reduce((v,g)=>v+g.amount,0),u=t.reduce((v,g)=>v+g.currentStock*g.unitCost,0),y=t.filter(v=>v.minimumStock>0&&v.currentStock<v.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${gt(p)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${gt(u)}</p>
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
          <tbody>${i||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Ba(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function _e(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ja(e){return`
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
  `}function ld(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function Bt(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${_e(e)}</code>
      ${ld(e)}
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
      ${e.code?ja(e.code):""}
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
  `}function jt(e){return`
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
  `}function zt(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function Bn(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function cd(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?Ba(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${zt(e.lastOverallSync)}">${Bn(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${zt(e.lastOverallSync)==="success"?"1時間以内":zt(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${t.lastSyncAt?Ba(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${zt(t.lastSyncAt)}">${Bn(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function dd(e){if(!e.length)return"";const t=r=>r==="ok"?"&#x2705;":r==="warn"?"&#x26A0;&#xFE0F;":"&#x274C;",n=r=>r==="ok"?"success":r==="warn"?"warning":"error",s=e.every(r=>r.status==="ok");return`
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
  `}function pd(e,t,n,s,r){const i={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${r?dd(r):""}

    ${s?cd(s):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${Ba(e.lastSyncAt)}</p>
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
      ${jt({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${Bt("git --version")}
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
      ${jt({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${Bt("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${jt({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${Bt("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${Bt("python get-pip.py")}
        `})}
      ${jt({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
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
          ${ja(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${ja(`{
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
  `}function xt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function bo(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function ud(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(g=>g.amount),1),s=28,r=6,i=140,c=100,p=760,u=p-i-c,y=t.length*(s+r)+16,v=t.map((g,$)=>{const E=g.amount/n*u,_=$*(s+r)+8,D=g.abcRank==="A"?"#2F855A":g.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${i-8}" y="${_+s/2+5}" class="chart-axis" text-anchor="end">${g.name.length>10?g.name.slice(0,10)+"…":g.name}</text>
          <rect x="${i}" y="${_}" width="${E}" height="${s}" rx="4" fill="${D}" opacity="0.85" />
          <text x="${i+E+8}" y="${_+s/2+5}" class="chart-axis">${(g.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${p} ${y}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${v}
    </svg>
  `}function wo(e,t,n="得意先"){if(e.length===0||t.length===0)return'<p class="empty-row">データなし</p>';const s=t.map(u=>`<th class="numeric">${u}</th>`).join(""),r=t.map((u,y)=>e.reduce((v,g)=>v+(g.values[y]??0),0)),i=r.reduce((u,y)=>u+y,0),c=e.map(u=>{const y=u.values.reduce((g,$)=>g+$,0),v=u.values.map(g=>`<td class="numeric">${g>0?(g/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`<tr>
      <td>${u.label}</td>
      ${v}
      <td class="numeric"><strong>${(y/1e4).toFixed(0)}万</strong></td>
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
  `}function md(e){return bo(e)}function yd(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,20),n=760,s=320,r={top:24,right:56,bottom:60,left:72},i=n-r.left-r.right,c=s-r.top-r.bottom,p=Math.max(...t.map(_=>_.amount),1),u=i/t.length,y=[0,.25,.5,.75,1].map(_=>{const D=r.top+c-c*_;return`<g>
      <line x1="${r.left}" y1="${D}" x2="${n-r.right}" y2="${D}" class="chart-grid" />
      <text x="4" y="${D+4}" class="chart-axis">${Math.round(p*_/1e4)}万</text>
    </g>`}).join(""),v=[0,25,50,70,90,100].map(_=>{const D=r.top+c-c*_/100,P=_===70||_===90;return`<g>
      <text x="${n-4}" y="${D+4}" class="chart-axis" text-anchor="end">${_}%</text>
      ${P?`<line x1="${r.left}" y1="${D}" x2="${n-r.right}" y2="${D}" stroke="${_===70?"#2F855A":"#B7791F"}" stroke-dasharray="6 3" stroke-width="1.5" opacity="0.6" />`:""}
    </g>`}).join(""),g=t.map((_,D)=>{const P=_.amount/p*c,C=Math.max(u-10,16),S=r.left+D*u+(u-C)/2,o=r.top+c-P,l=_.abcRank==="A"?"#2F855A":_.abcRank==="B"?"#B7791F":"#718096",d=_.name.length>6?_.name.slice(0,6)+"…":_.name;return`<g>
      <rect x="${S}" y="${o}" width="${C}" height="${P}" rx="4" fill="${l}" opacity="0.8" />
      <text x="${S+C/2}" y="${s-8}" class="chart-axis centered-axis pareto-label" transform="rotate(-35 ${S+C/2} ${s-16})">${d}</text>
    </g>`}).join(""),$=t.map((_,D)=>{const P=r.left+D*u+u/2,C=r.top+c-c*_.cumRatio/100;return`${P},${C}`}).join(" "),E=t.map((_,D)=>{const P=r.left+D*u+u/2,C=r.top+c-c*_.cumRatio/100;return`<circle cx="${P}" cy="${C}" r="3.5" fill="#C53D3D" />`}).join("");return`
    <svg viewBox="0 0 ${n} ${s}" class="sales-chart pareto-chart" role="img" aria-label="商品ABC パレート図">
      ${y}${v}${g}
      <polyline points="${$}" fill="none" stroke="#C53D3D" stroke-width="2.5" stroke-linejoin="round" />
      ${E}
    </svg>`}function hd(e){const t=e.ranking.filter(p=>p.abcRank==="A").length,n=e.ranking.filter(p=>p.abcRank==="B").length,s=e.ranking.filter(p=>p.abcRank==="C").length,r=e.ranking.filter(p=>p.abcRank==="A").reduce((p,u)=>p+u.amount,0),i=e.ranking.map(p=>`
    <tr>
      <td class="mono">${p.code}</td>
      <td>${p.name}</td>
      <td class="numeric">${xt(p.amount)}</td>
      <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${p.ratio.toFixed(1)}%</td>
      <td class="numeric">${p.cumRatio.toFixed(1)}%</td>
      <td><span class="status-pill ${md(p.abcRank)}">${p.abcRank}</span></td>
    </tr>`).join(""),c=wo(e.monthlyByProduct,e.months,"商品名");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">商品数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}品 <span class="kpi-sub">${(r/e.totalAmount*100).toFixed(1)}%</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}品</div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${s}品</div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>パレート図</h2><p class="panel-caption">棒：売上金額 / 線：累積構成比（上位20品）</p></div></div>
      <div class="chart-scroll">${yd(e.ranking)}</div>
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
    </section>`}function gd(e){const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,s=e.ranking.filter(u=>u.abcRank==="C").length,r=e.ranking.filter(u=>u.abcRank==="A").reduce((u,y)=>u+y.amount,0),i=e.ranking.filter(u=>u.abcRank==="B").reduce((u,y)=>u+y.amount,0),c=e.ranking.filter(u=>u.abcRank==="C").reduce((u,y)=>u+y.amount,0),p=e.ranking.map(u=>`
    <tr>
      <td class="mono">${u.code}</td>
      <td>${u.name}</td>
      <td class="numeric">${xt(u.amount)}</td>
      <td class="numeric">${u.ratio.toFixed(1)}%</td>
      <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
      <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
      <td><span class="status-pill ${bo(u.abcRank)}">${u.abcRank}</span></td>
    </tr>`).join("");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">得意先数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${xt(r)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${xt(i)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${s}社 <span class="kpi-sub">${xt(c)}</span></div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先別売上ランキング</h2><p class="panel-caption">売上金額上位15社</p></div></div>
      <div class="chart-scroll">${ud(e.ranking)}</div>
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
      ${wo(e.monthlyByCustomer,e.months,"得意先")}
    </section>`}function fd(e,t,n,s=""){const r=n==="customer"?gd(e):t?hd(t):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>',i=new Date().getFullYear(),c=Array.from({length:5},($,E)=>String(i-E)),p=s.length===4?s:s.slice(0,4),u=s.length===7?s.slice(5,7):"",y=["01","02","03","04","05","06","07","08","09","10","11","12"],v={"01":"1月","02":"2月","03":"3月","04":"4月","05":"5月","06":"6月","07":"7月","08":"8月","09":"9月",10:"10月",11:"11月",12:"12月"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>ABC分析 <span style="font-size:0.75em;font-weight:400;color:var(--text-secondary);">${s?s.length===7?`${s.slice(0,4)}年${v[s.slice(5)]??s.slice(5)}`:`${s}年`:"全期間"}</span></h1>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <select id="analysis-period-year" class="input-sm">
          <option value="">全期間</option>
          ${c.map($=>`<option value="${$}" ${p===$?"selected":""}>${$}年</option>`).join("")}
        </select>
        <select id="analysis-period-month" class="input-sm" ${p?"":"disabled"}>
          <option value="">全月</option>
          ${y.map($=>`<option value="${$}" ${u===$?"selected":""}>${v[$]}</option>`).join("")}
        </select>
      </div>
    </section>

    <div class="tab-bar" style="margin-bottom:16px;">
      <button class="tab-btn ${n==="customer"?"active":""}" type="button" data-analysis-tab="customer">👥 得意先ABC分析</button>
      <button class="tab-btn ${n==="product"?"active":""}" type="button" data-analysis-tab="product">📦 商品ABC分析</button>
    </div>

    ${r}
  `}const vd={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},jn={amount:"売上額",quantity:"出荷本数",volume:"移出量"},za=10;function mn(e){const[t,n]=e.split("-").map(Number);return n>=za?t:t-1}function bd(e){const t=za-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(za).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function wd(e,t,n){const s=c=>t==="quantity"?c.quantity:t==="volume"?c.volumeMl:c.amount,r=new Map;for(const c of e){const p=n==="fiscal"?`${mn(c.month)}年度`:c.month.slice(0,4);r.set(p,(r.get(p)??0)+s(c))}return{curr:[...r.entries()].sort((c,p)=>c[0].localeCompare(p[0])).map(([c,p])=>({month:c,amount:p}))}}function xd(e){const t=new Set;for(const n of e)t.add(mn(n.month));return[...t].sort((n,s)=>s-n).map(String)}function dt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function $d(e){return e.replace("-","/")}const zn={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function _d(e,t="#0F5B8D",n=[],s="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const r=n.length>0&&n.some(S=>S.amount>0),i=760,c=280,p={top:16,right:24,bottom:36,left:s==="amount"?64:56},u=i-p.left-p.right,y=c-p.top-p.bottom,v=[...e.map(S=>S.amount),...n.map(S=>S.amount)],g=Math.max(...v,1),$=u/e.length;function E(S){if(s==="quantity")return S>=1e4?`${(S/1e4).toFixed(1)}万本`:`${Math.round(S).toLocaleString()}本`;if(s==="volume"){const o=S/1e3;return o>=1e4?`${(o/1e3).toFixed(0)}kL`:`${Math.round(o).toLocaleString()} L`}return`${Math.round(S/1e4).toLocaleString("ja-JP")}万円`}function _(S){return s==="quantity"?`${S.toLocaleString()}本`:s==="volume"?pa(S):dt(S)}const D=[0,.25,.5,.75,1].map(S=>{const o=p.top+y-y*S,l=E(g*S);return`<g>
        <line x1="${p.left}" y1="${o}" x2="${i-p.right}" y2="${o}" class="chart-grid" />
        <text x="4" y="${o+4}" class="chart-axis">${l}</text>
      </g>`}).join(""),P=e.map((S,o)=>{const l=r?Math.max(($-18)/2,10):Math.max($-18,24),d=r?2:0,m=p.left+o*$+($-(r?l*2+d:l))/2,h=S.amount/g*y,w=p.top+y-h,f=n[o]?.amount??0,x=f/g*y,k=p.top+y-x,L=r?`<rect x="${m}" y="${k}" width="${l}" height="${x}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${_(f)}</title></rect>`:"",q=r?m+l+d:m;return`<g>
      ${L}
      <rect x="${q}" y="${w}" width="${l}" height="${h}" rx="4" fill="${t}" opacity="${.6+o/e.length*.35}"><title>${_(S.amount)}</title></rect>
      <text x="${p.left+o*$+$/2}" y="${c-8}" class="chart-axis centered-axis">${$d(S.month)}</text>
    </g>`}).join(""),C=r?`
    <g transform="translate(${i-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${i} ${c}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${D}${P}${C}
    </svg>
  `}function pa(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function Sd(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(s=>`
    <tr>
      <td class="mono">${s.code}</td>
      <td>${s.name}</td>
      <td class="numeric">${dt(s.amount)}</td>
      <td class="numeric">${s.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${pa(s.volumeMl)}</td>
      <td class="numeric">${s.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${s.code}" data-drilldown-name="${s.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function kd(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${dt(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${pa(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function Fn(e,t,n){const s=t?e.filter(i=>i.tag.includes(t)||i.name.includes(t)):e,r=s.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':s.map(i=>`
        <tr>
          <td class="mono">${i.code||"―"}</td>
          <td>${i.name||"未設定"}</td>
          <td class="mono">${i.tag||"―"}</td>
          <td class="numeric">${dt(i.amount)}</td>
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
  `}function xo(e,t,n="all",s="",r=[],i=[],c="",p="",u=null,y="all",v="",g=[],$=[],E=[],_=null,D=[],P=[],C="amount",S="calendar"){const o=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",l=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,m=n!=="all"&&r.length>0&&t!=="staff"?r:l,h=ct(m,E,vd),w={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},f=jn[C],x=Q=>C==="quantity"?Q.quantity:C==="volume"?Q.volumeMl:Q.amount,k=Q=>C==="quantity"?`${Q.toLocaleString()}本`:C==="volume"?pa(Q):dt(Q);let L,q=[],N,R,M;if(_&&_.monthlySales.length>0)L=_.monthlySales.slice(-24).map(Q=>({month:Q.month,amount:x(Q)})),N=`${_.name} の月別${f}`,R=`${_.tab==="customers"?"得意先":"商品"}: ${_.code}`,M="#0968e5";else if(D.length>0&&n!=="all"){L=D.map(J=>({month:J.month,amount:x(J)})),q=P.map(J=>({month:J.month,amount:x(J)}));const Q=L.reduce((J,Y)=>J+Y.amount,0),X=q.reduce((J,Y)=>J+Y.amount,0),Z=X>0?(Q-X)/X*100:0,oe=Z>0?"+":"";N=`${w[n]} ${f}（${s}）`,R=`${k(Q)}${X>0?` / 前年比 ${oe}${Z.toFixed(1)}%`:""}`,M="#2f855a"}else{L=wd(e.monthlySales,C,S).curr,q=[];const X=L.reduce((oe,J)=>oe+J.amount,0);N=`${S==="fiscal"?"決算年度別":"暦年別"}${f}`,R=`累計 ${k(X)}（${L.length}${S==="fiscal"?"期":"年"}）`,M="#0F5B8D"}const z=["amount","quantity","volume"].map(Q=>`<button class="tab-button ${Q===C?"active":""}" data-chart-metric="${Q}">${jn[Q]}</button>`).join(""),B=["all","yearly","monthly","weekly","daily"].map(Q=>`<button class="button ${Q===n?"primary":"secondary"} small" type="button" data-analytics-period="${Q}">${zn[Q]}</button>`).join(""),O=S==="fiscal"&&n==="yearly"?xd(e.monthlySales):i,U=S==="fiscal"&&n==="yearly"&&!O.includes(s)?O[0]??"":s,H=n!=="all"&&O.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${O.map(Q=>`<option value="${Q}" ${Q===U?"selected":""}>${S==="fiscal"&&n==="yearly"?Q+"年度":Q}</option>`).join("")}
      </select>`:"";let G="",W="";if(t==="staff"){const Q=["all","yearly","monthly","weekly","daily"].map(Y=>`<button class="button ${Y===y?"primary":"secondary"} small" type="button" data-staff-period="${Y}">${zn[Y]}</button>`).join(""),X=y!=="all"&&g.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${g.map(Y=>`<option value="${Y}" ${Y===v?"selected":""}>${Y}</option>`).join("")}
        </select>`:"",oe=($.length>0?$:e.staffTotals).filter(Y=>!c||Y.name.includes(c)||Y.code.includes(c)),J=y!=="all"&&v?` (${v})`:"";if(G=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${Q}</div>
        ${X}
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
            ${oe.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':oe.map(Y=>`
                <tr>
                  <td class="mono">${Y.code||"―"}</td>
                  <td>${Y.name||"未設定"}</td>
                  <td class="numeric">${dt(Y.amount)}</td>
                  <td class="numeric">${Y.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${Y.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${Y.code}" data-staff-name="${Y.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const Y=u.breakdownTab,K=y!=="all"&&v?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${v}</span>`:"";W=`
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
              <button class="tab-button ${Y==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${Y==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${p}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${Y==="customers"?Fn(u.customerRows,p,"得意先名"):Fn(u.productRows,p,"商品名")}
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
            <h2>${N}</h2>
            <p class="panel-caption">${R}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${z}</div>
            ${_?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${_d(L,M,q,C)}
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
            ${H}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${ne("code","コード",E,"mono")}
                  ${ne("name","名称",E)}
                  ${ne("amount","売上額",E,"numeric")}
                  ${ne("quantity","本数",E,"numeric")}
                  ${ne("volumeMl","移出量",E,"numeric")}
                  ${ne("documents","伝票数",E,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${Sd(h,!0)}</tbody>
            </table>
          </div>
        `:G}
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
            <tbody>${kd(_.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${W}
  `}const Vn=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:bd,monthToFiscalYear:mn,renderSalesAnalytics:xo},Symbol.toStringTag,{value:"Module"}));function ft(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Pd(e){const t=Math.max(...e.salesByProduct.flatMap(i=>i.values),1),n=e.salesByProduct.map(i=>{const c=i.values.map((p,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(p/t*120)}px" title="${e.months[u]}: ${ft(p)}"></div>
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
        <td class="numeric">${ft(i.costPrice)}</td>
        <td class="numeric">${ft(i.sellPrice)}</td>
        <td class="numeric">${ft(i.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${i.marginRate>=40?"success":"warning"}">${i.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(i=>{const c=i.values.reduce((p,u)=>p+u,0);return`
        <tr>
          <td>${i.label}</td>
          ${i.values.map(p=>`<td class="numeric">${(p/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${ft(c)}</strong></td>
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
  `}function Ed(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Xt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Un(e){return e.toISOString().slice(0,10)}function Ad(e,t,n,s=null,r=null){const i=e.length?e.map(c=>`
            <tr class="clickable-row${c.documentNo===s?" selected-row":""}"
                data-doc-no="${c.documentNo}">
              <td class="mono">${c.documentNo}</td>
              <td>${Ed(c.date)}</td>
              <td>
                <div class="table-title">${c.customerName}</div>
                <div class="table-sub mono">${c.customerCode}</div>
              </td>
              <td class="numeric">${Xt(c.amount)}</td>
            </tr>
            ${c.documentNo===s?Ld(r):""}
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
          <input id="sales-start" type="date" value="${t||Un(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||Un(new Date)}" />
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
  `}function Ld(e){if(!e)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(s=>`
      <tr>
        <td class="mono" style="width:40px">${s.lineNo}</td>
        <td class="mono" style="width:70px">${s.productCode}</td>
        <td>${s.productName}</td>
        <td class="numeric" style="width:50px">${s.quantity}</td>
        <td class="numeric" style="width:80px">${Xt(s.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Xt(s.amount)}</td>
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
            <td class="numeric">${Xt(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function Ft(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Cd(e,t,n,s){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},i={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},p=e.map(g=>`
      <tr>
        <td>${g.saleTime}</td>
        <td class="mono">${g.productCode}</td>
        <td>${g.productName}</td>
        <td class="numeric">${g.quantity}</td>
        <td class="numeric">${Ft(g.unitPrice)}</td>
        <td class="numeric"><strong>${Ft(g.amount)}</strong></td>
        <td>${r[g.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(g=>`
      <tr>
        <td class="mono">${g.orderNo}</td>
        <td>${g.orderDate}</td>
        <td>${g.customerName}</td>
        <td>${g.postalCode} ${g.address}</td>
        <td>${g.items.map($=>`${$.productName} ×${$.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Ft(g.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[g.status]}">${i[g.status]}</span>
        </td>
        <td>${g.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${g.id}">詳細</button>
        </td>
      </tr>
    `).join(""),y=e.reduce((g,$)=>g+$.amount,0),v=t.filter(g=>g.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${Ft(y)}</p>
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
  `}const wa={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Dd={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function qd(e,t,n,s){const r=Dd[e],i=Object.keys(wa).map(p=>`
      <button class="tab-button ${e===p?"active":""}" data-import-entity="${p}">
        ${wa[p]}
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
      <div class="tab-group" style="flex-wrap: wrap;">${i}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${wa[e]} のCSV形式</h2>
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
  `}const me={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function Td(e,t,n){const s=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:me.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:me.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:me.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:me.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:me.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:me.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:me.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:me.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:me.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:me.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:me.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:me.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:me.date}];e.lines.slice(0,6).forEach((c,p)=>{const u=33+p*8.5;s.push({id:`line${p}_name`,label:`明細${p+1} 品名`,x:5,y:u,fontSize:7.5,value:c.productName+(c.spec?` ${c.spec}`:""),color:me.detail},{id:`line${p}_code`,label:`明細${p+1} CD`,x:64,y:u,fontSize:7.5,value:c.productCode,color:me.detail},{id:`line${p}_qty`,label:`明細${p+1} 数量`,x:124,y:u,fontSize:8,value:c.quantity>0?String(c.quantity):"",color:me.detail},{id:`line${p}_price`,label:`明細${p+1} 原単価`,x:163,y:u,fontSize:8,value:c.unitPrice>0?c.unitPrice.toLocaleString("ja-JP"):"",color:me.detail},{id:`line${p}_amount`,label:`明細${p+1} 原価金額`,x:176,y:u,fontSize:8,value:c.amount>0?c.amount.toLocaleString("ja-JP"):"",color:me.detail},{id:`line${p}_retail`,label:`明細${p+1} 売単価`,x:193,y:u,fontSize:8,value:c.retailPrice?c.retailPrice.toLocaleString("ja-JP"):"",color:me.detail})});const r=e.lines.reduce((c,p)=>c+(p.amount||0),0),i=e.lines.reduce((c,p)=>c+p.quantity,0);return s.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(i),color:me.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:me.total}),n&&s.forEach(c=>{const p=n[c.id];p&&(c.x=p.x,c.y=p.y)}),s}function Id(e,t,n,s,r){const c=Td(e,t,s).map(u=>`
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
  `}function xa(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const s=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,i=parseFloat(n.style.top)||0;t[s]={x:r,y:i}}),t}function Nd(e,t,n){const s=[...new Set(e.map(_=>_.areaCode).filter(Boolean))].sort(),r=[...new Set(e.map(_=>_.businessTypeName||_.businessType).filter(Boolean))].sort(),i=e.filter(_=>_.isAtRisk),c=e.filter(_=>!_.isAtRisk&&_.isDormant),p=e.filter(_=>!_.isAtRisk&&!_.isDormant&&_.amount12m>0),u=e.filter(_=>!_.isAtRisk&&!_.isDormant&&_.amount12m===0),y=t.filter(_=>_.lat&&_.lng),v=e.some(_=>_.lat&&_.lng),g=e.length,$=e.filter(_=>_.lat&&_.lng).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">営業 / Map</p>
        <h1>取引先マップ</h1>
        <p class="meta-note">OpenStreetMap で得意先の位置情報を可視化します。</p>
      </div>
    </section>

    ${v?$<g?`<section class="panel" style="border-left:4px solid #3b82f6;margin-bottom:16px;">
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
      data-deliveries="${encodeURIComponent(JSON.stringify(y.map(_=>({name:_.name,address:_.address,lat:_.lat,lng:_.lng,phone:_.phone}))))}"></div>

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

  `}const Md={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},Rd=["new","picking","packed","shipped","delivered"];function Od(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(i=>t[i.stage].push(i));const n=Rd.map(i=>{const c=Md[i],p=t[i];return`
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
  `}function Bd(e,t,n){const s=e.cart.reduce((i,c)=>i+c.amount,0);return`
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

      ${jd(e,t,n)}
    </div>
  `}function jd(e,t,n){if(e.step==="customer"){const s=e.customerQuery.toLowerCase(),r=s?t.filter(i=>i.name.toLowerCase().includes(s)||i.code.toLowerCase().includes(s)):t.slice(0,20);return`
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
  `}const Yn={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},Jn={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},Kn={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function zd(e,t){const n=e.find(i=>i.id===t)??e[0],s=e.filter(i=>i.status==="new").length,r=e.filter(i=>i.status==="confirmed").length;return`
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
                <span class="status-pill ${Jn[i.status]}">${Yn[i.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${Kn[i.language]} · 👥 ${i.partySize}名
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
            <span class="status-pill ${Jn[n.status]}">${Yn[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${Kn[n.language]}</dd></div>
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
  `}const Fd=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,Vd=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Ud(e,t){const n=t?e.find(r=>r.id===t):null,s=t==="__new__";return`
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
  `}function Yd(e,t,n,s){const[r,i]=t.split("-").map(d=>parseInt(d,10)),c=new Date(r,i-1,1),p=new Date(r,i,0),u=c.getDay(),y=p.getDate(),v=[];for(let d=0;d<u;d++)v.push({isOutside:!0});for(let d=1;d<=y;d++)v.push({date:new Date(r,i-1,d)});for(;v.length%7!==0;)v.push({isOutside:!0});const g=n?e.filter(d=>d.category===n):e,$={};g.forEach(d=>{const m=d.startsAt.slice(0,10);$[m]??=[],$[m].push(d)});const E=new Date().toISOString().slice(0,10),_=v.map(d=>{if(d.isOutside)return'<div class="cal-cell cal-outside"></div>';const m=d.date,h=`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}-${String(m.getDate()).padStart(2,"0")}`,w=$[h]??[],f=h===E,x=m.getDay();return`
        <div class="cal-cell ${f?"cal-today":""} ${x===0?"cal-sun":x===6?"cal-sat":""}"
             data-cal-date="${h}">
          <div class="cal-day-num">${m.getDate()}</div>
          <div class="cal-events">
            ${w.slice(0,3).map(k=>`
              <button class="cal-event" data-cal-event-id="${k.id}"
                      style="background:${k.color||cn[k.category]||"#0F5B8D"};"
                      title="${k.title}">
                <span class="cal-event-time">${k.isAllDay?"終日":new Date(k.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${k.title}</span>
              </button>
            `).join("")}
            ${w.length>3?`<button class="cal-event-more" data-cal-date="${h}">+${w.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),D=s?.isOpen?Jd(s):"",P=new Date(r,i-2,1),C=new Date(r,i,1),S=`${P.getFullYear()}-${String(P.getMonth()+1).padStart(2,"0")}`,o=`${C.getFullYear()}-${String(C.getMonth()+1).padStart(2,"0")}`,l=(()=>{const d=new Date;return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`})();return`
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
              ${Object.entries(ln).map(([d,m])=>`<option value="${d}" ${n===d?"selected":""}>${m}</option>`).join("")}
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
  `}function Jd(e){const t=e.event;return`
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
                ${Object.entries(ln).map(([n,s])=>`<option value="${n}" ${t.category===n?"selected":""}>${s}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?Hn(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?Hn(t.endsAt):""}" />
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
  `}function Hn(e){const t=new Date(e),n=s=>String(s).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const vt={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function Kd(e,t){const n=t?e.find(s=>s.id===t):null;return`
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
        <p class="form-hint">${vt[n.provider]?.description??""}</p>
        ${vt[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${vt[n.provider].setupUrl}" target="_blank">${vt[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(vt[n.provider]?.fields??[]).map(s=>`
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
  `}function Hd(e,t){const n=e.reduce((i,c)=>i+c.totalAmount,0),s=e.filter(i=>i.financialStatus==="paid").length,r=e.filter(i=>i.fulfillmentStatus!=="fulfilled"&&i.fulfillmentStatus!=="shipped").length;return`
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
  `}function Qd(e,t,n){return`
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
  `}function Wd(e,t,n){const s=t==="__new__"?null:e.find(c=>c.id===t),r=t==="__new__";return n?.role==="admin"?`
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
                <td>${aa[c.department]}</td>
                <td>${ta[c.role]}</td>
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
              ${Object.entries(aa).map(([c,p])=>`<option value="${c}" ${s?.department===c?"selected":""}>${p}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(ta).map(([c,p])=>`<option value="${c}" ${s?.role===c?"selected":""}>${p}</option>`).join("")}
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
    `}function Gd(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${aa[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${ta[e.role]}</dd></div>
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
    `}function Xd(e){const t={};return e.forEach(n=>{const s=n.userEmail??"(anonymous)";t[s]=(t[s]??0)+1}),`
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
  `}function Zd(e){const t=e.prospects.reduce((i,c)=>i+c.expectedAmount,0),n=e.prospects.reduce((i,c)=>i+c.expectedAmount*c.probability/100,0),s=e.prospects.filter(i=>i.stage==="won").length,r=e.prospects.filter(i=>i.stage==="hot"||i.stage==="negotiating").length;return`
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

    ${e.viewMode==="kanban"?ep(e.prospects):tp(e.prospects)}

    ${ap(e)}
  `}function ep(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(s=>{const r=e.filter(c=>c.stage===s),i=r.reduce((c,p)=>c+p.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${s}">
          <div class="pk-col-header" style="--pk-color:${dn[s]};">
            <span class="pk-col-label">${ca[s]}</span>
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
  `}function tp(e){return`
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
                <td><span class="status-pill" style="background:${dn[t.stage]};color:white;">${ca[t.stage]}</span></td>
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
  `}function ap(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(s=>s.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(ca).map(([s,r])=>`<option value="${s}" ${n?.stage===s?"selected":""}>${r}</option>`).join("")}
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
  `}function np(e,t,n){const s=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
                <td>${na[i.eventType]||i.eventType}</td>
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
                <td>${na[i.eventType]||i.eventType}</td>
                <td class="mono" style="font-size:12px;">${i.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${i.message}</td>
                <td><span class="status-pill ${i.status==="sent"?"success":"warning"}">${i.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function sp(e,t,n,s){const r=new Map(t.map(g=>[g.code,g])),i=e.filter(g=>g.callDirection==="inbound").length,c=e.filter(g=>g.callDirection==="outbound").length,p=e.filter(g=>g.callStatus==="missed").length,u=e.reduce((g,$)=>g+($.durationSeconds??0),0),y=g=>{if(g===0)return"―";const $=Math.floor(g/60),E=g%60;return $>0?`${$}分${E}秒`:`${E}秒`},v=g=>{if(g.matchedCustomerCode){const $=r.get(g.matchedCustomerCode);if($)return`${$.name} (既存)`}return"未登録番号"};return`
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
  `}const op=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function rp(e){const t=e.activeListId?e.lists.find(i=>i.id===e.activeListId):null,n=e.items.filter(i=>i.status==="new").length,s=e.items.filter(i=>i.status==="imported").length,r=e.items.filter(i=>i.status==="excluded").length;return`
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
            ${op.map(i=>`<option value="${i}" ${e.searchBusinessType===i?"selected":""}>${i}</option>`).join("")}
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
  `}const Qn={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},ip={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},lp={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function $e(e){return"¥"+e.toLocaleString("ja-JP")}function kt(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function $o(e,t){const n=e.reduce((i,c)=>i+c.amount,0),s=Math.floor(n*t),r=n+s;return{subtotal:n,taxAmount:s,total:r}}const de={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function ue(e,t){const n=e.align??"left",s=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${s}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function $a(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),s=n-2018;return{y:s>0?String(s).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function cp(e,t,n){const s=$a(e.documentDate),r=$a(e.orderDate??e.documentDate),i=$a(e.deliveryDate??e.documentDate),c=e.lines.slice(0,6).map((P,C)=>{const S=de.detailStartY+C*de.detailRowH,o=de.detailCols,l=[],d=(m,h)=>{h&&l.push(ue({...m,y:S,x:m.x+0},h))};return d(o.productName,P.productName+(P.spec?` ${P.spec}`:"")),d(o.productCode,P.productCode),d(o.color,P.color??""),d(o.size,[P.size,P.caseQty?`×${P.caseQty}`:""].filter(Boolean).join(" ")),d(o.unit,P.unit),d(o.quantity,P.quantity>0?P.quantity.toLocaleString("ja-JP"):""),d(o.correctedQty,P.correctedQuantity?P.correctedQuantity.toLocaleString("ja-JP"):""),d(o.discount,P.discount?P.discount.toLocaleString("ja-JP"):""),d(o.unitPrice,P.unitPrice>0?P.unitPrice.toLocaleString("ja-JP"):""),d(o.costAmount,P.amount>0?P.amount.toLocaleString("ja-JP"):""),d(o.retailPrice,P.retailPrice?P.retailPrice.toLocaleString("ja-JP"):""),d(o.note,P.receivedAmount?P.receivedAmount.toLocaleString("ja-JP"):""),l.join("")}).join(""),p=e.lines.reduce((P,C)=>P+(C.amount||0),0),u=e.lines.reduce((P,C)=>P+(C.retailPrice||0)*(C.correctedQuantity??C.quantity),0),y=e.lines.reduce((P,C)=>P+(C.receivedAmount||0),0),v=e.lines.reduce((P,C)=>P+(C.returnAmount||0),0),g=e.lines.reduce((P,C)=>P+C.quantity,0),$=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",E=n.calibrationOffsetX||0,_=n.calibrationOffsetY||0,D=`transform: translate(${E}mm, ${_}mm);`;return`
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
        ${ue(de.receivedTotal,y.toLocaleString("ja-JP"))}
        ${ue(de.returnTotal,v.toLocaleString("ja-JP"))}
        ${ue(de.correctedCostTotal,p.toLocaleString("ja-JP"))}
        ${ue(de.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function dp(e,t,n){const{subtotal:s,taxAmount:r,total:i}=$o(e.lines,e.taxRate),c=e.previousBalance??0,p=e.paymentAmount??0,u=c-p+i,y=e.lines.map(g=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${g.note??""}</td>
        <td>${g.productName}${g.spec?` <span style="color:#636e72;font-size:9pt;">/ ${g.spec}</span>`:""}</td>
        <td class="numeric">${g.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${g.unit}</td>`:""}
        <td class="numeric">${$e(g.unitPrice)}</td>
        <td class="numeric">${$e(g.amount)}</td>
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
        <div><dt>請求日</dt><dd>${kt(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${kt(e.dueDate)}</dd></div>`:""}
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
        <tbody>${y}${v}</tbody>
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
  `}function pp(e,t,n){const{subtotal:s,taxAmount:r,total:i}=$o(e.lines,e.taxRate),c=e.lines.map(u=>`
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
        <div><dt>見積日</dt><dd>${kt(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${kt(e.expireDate)}</dd></div>`:""}
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

      <p class="freee-footer">本見積書は ${e.expireDate?kt(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function up(e,t,n,s){let r="";switch(e){case"chain_store":r=cp(s,n,t);break;case"quotation":r=pp(s,n,t);break;case"invoice_monthly":r=dp(s,n,t);break}const i=Object.keys(Qn).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${Qn[u]}</button>`).join(""),c=s.lines.map((u,y)=>`
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
  `}const mp={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},yp={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function _o(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],s="",r=!1;for(let p=0;p<e.length;p++){const u=e[p];r?u==='"'?e[p+1]==='"'?(s+='"',p++):r=!1:s+=u:u==='"'?r=!0:u===","?(n.push(s),s=""):u===`
`||u==="\r"?(u==="\r"&&e[p+1]===`
`&&p++,n.push(s),n.some(y=>y!=="")&&t.push(n),n=[],s=""):s+=u}if((s!==""||n.length>0)&&(n.push(s),n.some(p=>p!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const i=t[0].map(p=>p.trim()),c=[];for(let p=1;p<t.length;p++){const u={};i.forEach((y,v)=>{u[y]=(t[p][v]??"").trim()}),c.push(u)}return{columns:i,rows:c}}function So(e,t,n){const s=mp[e],r=s.filter(p=>!t.includes(p)),i=n.map(p=>{const u=[];r.length>0&&u.push(`必須列欠損: ${r.join(",")}`);for(const y of s)t.includes(y)&&!p[y]&&u.push(`${y}が空`);return{...p,_valid:u.length===0,_error:u[0]}}),c=i.filter(p=>p._valid).length;return{entity:e,columns:t,rows:i,totalRows:n.length,validRows:c,invalidRows:i.length-c}}function ko(e){const n=yp[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function Po(e,t){const{supabaseInsert:n}=await I(async()=>{const{supabaseInsert:p}=await Promise.resolve().then(()=>te);return{supabaseInsert:p}},void 0);let s=0,r=0;const c={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const p of t){if(!p._valid)continue;const{_valid:u,_error:y,...v}=p,g={...v};if(!g.id){const $=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";g.id=String(v[$]??`${e}-${Date.now()}-${s+r}`)}for(const $ of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof g[$]=="string"&&g[$]!==""){const E=Number(g[$]);Number.isFinite(E)&&(g[$]=E)}try{await n(c,g)!==null?s++:r++}catch{r++}}return{inserted:s,failed:r}}const hp=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:ko,importToSupabase:Po,parseCSV:_o,validateImport:So},Symbol.toStringTag,{value:"Module"}));function _a(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function gp(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function fp(e,t,n,s,r){const i=n.reduce((y,v)=>y+v.rowCount,0),c=n.map(y=>y.lastSyncAt).filter(y=>y!==null).sort().reverse()[0]??null,p=100,u=Math.max(1,Math.ceil(r/p));return`
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
        <p class="kpi-value">${c?_a(c):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${y.lastSyncAt?_a(y.lastSyncAt):"未同期"}</p>
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
              <td>${y._synced_at?_a(y._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${y._raw_b64?y._raw_b64.slice(0,200):""}">${gp(y._raw_b64)}</td>
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
  `}const pt=400,ut=240;function se(e){return e.toLocaleString("ja-JP")}function Sa(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function vp(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function Te(e,t,n,s=""){return`<th class="${s}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${vp(n,t)}</th>`}function bt(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function bp(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const s=e.products.slice().sort((C,S)=>(e.productTotals[S.code]??0)-(e.productTotals[C.code]??0)).slice(0,6),r=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],i=820,c=280,p={top:20,right:20,bottom:40,left:60},u=i-p.left-p.right,y=c-p.top-p.bottom,v=t.map(C=>s.reduce((S,o)=>S+(n[o.code]?.[C]??0),0)),g=Math.max(...v,1),$=u/t.length,E=Math.max($-10,14),_=[0,.25,.5,.75,1].map(C=>{const S=p.top+y-y*C,o=`${Math.round(g*C/100)*100}`;return`
      <line x1="${p.left}" y1="${S}" x2="${i-p.right}" y2="${S}" class="chart-grid" />
      <text x="6" y="${S+4}" class="chart-axis">${Number(o).toLocaleString("ja-JP")}</text>
    `}).join(""),D=t.map((C,S)=>{let o=p.top+y;const l=p.left+S*$+($-E)/2,d=s.map((k,L)=>{const N=(n[k.code]?.[C]??0)/g*y;return o-=N,`<rect x="${l}" y="${o}" width="${E}" height="${N}" fill="${r[L%r.length]}" opacity="0.85" rx="${L===s.length-1?3:0}" />`}).join(""),[m,h]=C.split("-"),w=parseInt(h),f=w===1||S%3===0,x=w===1?`${m.slice(2)}年`:`${w}月`;return`<g>${d}${f?`<text x="${l+E/2}" y="${c-10}" class="chart-axis centered-axis">${x}</text>`:""}</g>`}).join(""),P=s.map((C,S)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${r[S%r.length]};"></span>
       ${C.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${i} ${c}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${_}${D}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${p.left}px;display:flex;flex-wrap:wrap;">${P}</div>
  `}function wp(e){const{months:t,products:n}=e,s=n.slice().sort((c,p)=>(e.productTotals[p.code]??0)-(e.productTotals[c.code]??0)).slice(0,50),r=t.map(c=>{const[p,u]=c.split("-"),y=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${y===1?`${p.slice(2)}年1月`:`${y}月`}</th>`}).join(""),i=s.map(c=>{const p=t.map(u=>{const y=e.matrix[c.code]?.[u]??0;return`<td class="numeric">${y>0?se(y):"—"}</td>`}).join("");return`
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
  `}function xp(e,t){const n=e.months[e.months.length-1]??"",s=e.months[e.months.length-2]??"",r=e.months.length-13,i=r>=0?e.months[r]:"",c=e.products.reduce((E,_)=>E+(e.matrix[_.code]?.[n]??0),0),p=e.products.reduce((E,_)=>E+(e.matrix[_.code]?.[s]??0),0),u=i?e.products.reduce((E,_)=>E+(e.matrix[_.code]?.[i]??0),0):0,y=p>0?(c-p)/p*100:0,v=u>0?(c-u)/u*100:0,g=E=>E>=0?"+":"",$=[1,2,3,5].map(E=>`<option value="${E}" ${E===t?"selected":""}>${E}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${se(c)} 本</p>
        <p class="kpi-sub">${Sa(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${y>=0?"":"text-danger"}">${g(y)}${y.toFixed(1)}%</p>
        <p class="kpi-sub">${Sa(s)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${v>=0?"":"text-danger"}">${u>0?`${g(v)}${v.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${i?`${Sa(i)} 比`:"前年データなし"}</p>
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
      ${bp(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${wp(e)}
    </section>
  `}function $p(e,t){const s=e.slice().sort((i,c)=>{if(!t)return 0;const p=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return p*i.productName.localeCompare(c.productName,"ja");case"ss-avg":return p*(i.avgMonthlyDemand-c.avgMonthlyDemand);case"ss-std":return p*(i.demandStdDev-c.demandStdDev);case"ss-ss":{const u=Math.ceil(bt(i.serviceLevel)*i.demandStdDev*Math.sqrt(i.leadTimeDays/30)),y=Math.ceil(bt(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return p*(u-y)}case"ss-rop":{const u=Math.ceil(i.avgMonthlyDemand*(i.leadTimeDays/30)+bt(i.serviceLevel)*i.demandStdDev*Math.sqrt(i.leadTimeDays/30)),y=Math.ceil(c.avgMonthlyDemand*(c.leadTimeDays/30)+bt(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return p*(u-y)}default:return 0}}).map(i=>{const c=bt(i.serviceLevel),p=i.leadTimeDays/30,u=Math.ceil(c*i.demandStdDev*Math.sqrt(p)),y=Math.ceil(i.avgMonthlyDemand*p+u),v=u-i.safetyStockQty,g=v>0?"text-danger":v<-u*.3?"text-warning":"",$=[.9,.95,.99].map(E=>`<option value="${E}" ${Math.abs(i.serviceLevel-E)<.01?"selected":""}>${(E*100).toFixed(0)}%</option>`).join("");return`
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
        <td class="numeric">${se(y)}</td>
        <td class="numeric ${g}">
          ${v>0?`+${se(v)}`:se(v)}
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
  `}const _p={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function Sp(e,t,n,s){const r={draft:"下書き",confirmed:"確定",actual:"実績入力済"},i={draft:"neutral",confirmed:"info",actual:"success"},c=h=>Object.entries(_p).map(([w,f])=>`<option value="${w}" ${w===h?"selected":""}>${f}</option>`).join(""),p=640,u=h=>h.map(w=>{const f=Math.max(0,w.demandForecast+w.safetyStockTarget-w.openingStock),x=w.plannedQty>0?w.plannedQty:Math.round(f),k=x>0?Math.ceil(x/p*10)/10:0,L=w.plannedQty>0?(w.actualQty-w.plannedQty)/w.plannedQty*100:null,q=L!==null?L>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${w.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${w.productCode}"
            style="width:92px;">${c(w.productionType)}</select>
        </td>
        <td class="numeric">${se(Math.round(w.demandForecast))}</td>
        <td class="numeric">${se(Math.round(w.safetyStockTarget))}</td>
        <td class="numeric">${se(Math.round(w.openingStock))}</td>
        <td class="numeric"><strong>${se(Math.round(f))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${w.plannedQty}"
            data-action="plan-qty" data-code="${w.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">${w.actualQty>0?se(w.actualQty):"—"}</td>
        <td class="numeric ${q}">
          ${L!==null?`${L>=0?"+":""}${L.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${k>0?`${k.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${i[w.status]??"neutral"}">${r[w.status]??w.status}</span>
        </td>
      </tr>
    `}).join(""),v=(n==="all"?e:e.filter(h=>h.productionType===n)).slice().sort((h,w)=>{if(!s)return 0;const f=s.dir==="asc"?1:-1,x=Math.max(0,h.demandForecast+h.safetyStockTarget-h.openingStock),k=Math.max(0,w.demandForecast+w.safetyStockTarget-w.openingStock);switch(s.column){case"plan-name":return f*h.productName.localeCompare(w.productName,"ja");case"plan-forecast":return f*(h.demandForecast-w.demandForecast);case"plan-required":return f*(x-k);case"plan-planned":return f*(h.plannedQty-w.plannedQty);case"plan-actual":return f*(h.actualQty-w.actualQty);case"plan-label":{const L=h.plannedQty>0?h.plannedQty:Math.round(x),q=w.plannedQty>0?w.plannedQty:Math.round(k);return f*(L-q)}default:return 0}}),g=u(v),$=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],E=h=>{const f=(h==="all"?e:e.filter(x=>x.productionType===h)).reduce((x,k)=>{const L=Math.max(0,k.demandForecast+k.safetyStockTarget-k.openingStock);return x+(k.plannedQty>0?k.plannedQty:Math.round(L))},0);return Math.ceil(f/p*10)/10},_=$.filter(h=>h.key!=="all").map(h=>{const w=E(h.key),f=e.filter(k=>k.productionType===h.key).length,x=h.key==="make_to_order"?e.filter(k=>k.productionType==="make_to_order"&&k.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${h.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${w>0?w.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${f}商品${x!==null?` · 受注${x}件`:""}</p>
      </div>
    `}).join(""),D=v.reduce((h,w)=>h+w.demandForecast,0),P=v.reduce((h,w)=>h+Math.max(0,w.demandForecast+w.safetyStockTarget-w.openingStock),0),C=v.reduce((h,w)=>h+w.plannedQty,0),S=v.reduce((h,w)=>h+w.actualQty,0),o=E(n),l=new Date,d=Array.from({length:24},(h,w)=>{const f=new Date(l.getFullYear(),l.getMonth()-6+w,1),x=`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}`;return`<option value="${x}" ${x===t?"selected":""}>${x.replace("-","年")}月</option>`}).join(""),m=$.map(h=>`<button class="button ${n===h.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${h.key}"
       style="padding:4px 12px;font-size:13px;">${h.label}</button>`).join("");return`
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
            ${v.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${se(Math.round(D))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${se(Math.round(P))}</td>
                <td class="numeric">${se(C)}</td>
                <td class="numeric">${S>0?se(S):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${o.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Eo(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n,0).getDate();return Array.from({length:s},(r,i)=>{const c=i+1;return`${e}-${String(c).padStart(2,"0")}`})}function Wn(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function Gn(e){const t=new Date(e).getDay();return t===0||t===6}function kp(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function Ao(e){return e.partTimers+e.employees}function Ie(e,t,n={partCapacity:pt,empCapacity:ut}){const s=e.filter(v=>v.partTimers>0||v.employees>0);if(s.length===0)return;const r=t.reduce((v,g)=>{const $=g.plannedQty>0?g.plannedQty:Math.max(0,g.demandForecast+g.safetyStockTarget-g.openingStock);return v+$},0);if(r<=0)return;const i=r/s.length;let c=0,p=0,u=1/0;const y=Math.ceil(i/n.partCapacity);for(let v=0;v<=y;v++){const g=i-v*n.partCapacity,$=g>0?Math.ceil(g/n.empCapacity):0,E=v+$;E<u&&(u=E,c=v,p=$)}for(const v of e)v.confirmed||(v.partTimers>0||v.employees>0)&&(v.partTimers=c,v.employees=p)}function Pp(e,t,n={partCapacity:pt,empCapacity:ut}){const s=t.filter(p=>Ao(p)>0).map(p=>p.date).sort();if(s.length===0)return t.map(p=>({date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const r={monthly:0,november:1,annual:2,make_to_order:3},i=e.filter(p=>p.plannedQty>0||Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)>0).map(p=>({productCode:p.productCode,productName:p.productName,productionType:p.productionType,remaining:p.plannedQty>0?p.plannedQty:Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)})).filter(p=>p.remaining>0).sort((p,u)=>(r[p.productionType]??99)-(r[u.productionType]??99)||u.remaining-p.remaining),c=new Map;for(const p of t){const u=kp(p,n);c.set(p.date,{date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const p of i){let u=p.remaining;if(u<=0)continue;if(s.reduce((v,g)=>{const $=c.get(g);return v+Math.max(0,$.capacity-$.totalQty)},0)<=0)break;for(const v of s){if(u<=0)break;const g=c.get(v),$=Math.max(0,g.capacity-g.totalQty);if($<=0)continue;const E=Math.min(u,$);g.items.push({productCode:p.productCode,productName:p.productName,productionType:p.productionType,qty:E}),g.totalQty+=E,g.utilization=g.capacity>0?g.totalQty/g.capacity:0,u-=E}}return t.map(p=>c.get(p.date))}function Zt(e,t=1,n=1){return Eo(e).map(s=>({date:s,partTimers:Gn(s)?0:t,employees:Gn(s)?0:n,confirmed:!1}))}function Ep(e,t,n,s=null,r=new Set,i={partCapacity:pt,empCapacity:ut}){const c=Eo(t),p=e.filter(L=>!r.has(L.productCode)),u=Pp(p,n,i),y=new Map(u.map(L=>[L.date,L])),v=p.reduce((L,q)=>L+(q.plannedQty>0?q.plannedQty:Math.max(0,q.demandForecast+q.safetyStockTarget-q.openingStock)),0),$=e.reduce((L,q)=>L+(q.plannedQty>0?q.plannedQty:Math.max(0,q.demandForecast+q.safetyStockTarget-q.openingStock)),0)-v,E=u.reduce((L,q)=>L+q.totalQty,0),_=n.filter(L=>Ao(L)>0).length,D=u.reduce((L,q)=>L+q.capacity,0),P=n.reduce((L,q)=>L+q.partTimers,0),C=n.reduce((L,q)=>L+q.employees,0),S=_>0?Math.ceil(v/_):0,o=new Date,l=Array.from({length:24},(L,q)=>{const N=new Date(o.getFullYear(),o.getMonth()-6+q,1),R=`${N.getFullYear()}-${String(N.getMonth()+1).padStart(2,"0")}`;return`<option value="${R}" ${R===t?"selected":""}>${R.replace("-","年")}月</option>`}).join(""),d=new Date(c[0]).getDay(),m=[];for(let L=0;L<d;L++)m.push('<div style="min-height:44px;"></div>');for(const L of c){const q=y.get(L),N=new Date(L).getDay(),R=parseInt(L.split("-")[2]),M=q?.partTimers??0,z=q?.employees??0,B=M+z,O=q?.totalQty??0,U=q?.utilization??0,H=L===s,G=B===0?"var(--surface-alt)":U>.95?"rgba(197,61,61,0.12)":U>.7?"rgba(183,121,31,0.10)":U>0?"rgba(47,133,90,0.08)":"var(--surface)",W=B===0?"transparent":U>.95?"#c53d3d":U>.7?"#b7791f":U>0?"#2f855a":"var(--border)",Q=N===0?"#c53d3d":N===6?"#0F5B8D":"var(--text)",X=B>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${M>0?`パ${M}`:""}${z>0?`社${z}`:""}</span>`:"";m.push(`
      <div data-action="cal-toggle-day" data-date="${L}"
        style="min-height:44px;padding:3px;border:${H?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${G};cursor:pointer;display:flex;flex-direction:column;
          ${H?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${Q};line-height:1;">${R}</span>
          ${X}
        </div>
        ${B>0?`
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${O>0?se(O):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(U*100,100)}%;background:${W};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const w=m.length%7;if(w>0)for(let L=0;L<7-w;L++)m.push('<div style="min-height:44px;"></div>');const f=s?y.get(s):null;s&&n.find(L=>L.date===s);const x=s&&f?(()=>{const L=f,q=parseInt(s.split("-")[2]),N=Wn(s),R=Math.round(L.utilization*100),M=n.find(J=>J.date===s),z=s===new Date().toISOString().slice(0,10),B={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},O={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},U=L.items.map(J=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${B[J.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${J.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${O[J.productionType]??J.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${se(J.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),H=`パ${L.partTimers}×${i.partCapacity} 社${L.employees}×${i.empCapacity} = ${se(L.capacity)}本`,G=L.totalQty>0?Math.ceil(L.totalQty/i.partCapacity):0,W=[];if(L.totalQty>0)for(let J=0;J<=G;J++){const Y=L.totalQty-J*i.partCapacity;if(Y<=0){W.push({p:J,e:0});break}const K=Math.ceil(Y/i.empCapacity);W.push({p:J,e:K})}const Q=L.totalQty-L.capacity,X=L.totalQty===0?"":Q>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${se(Q)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',Z=W.filter(J=>J.p+J.e>0).sort((J,Y)=>J.p+J.e-(Y.p+Y.e)).slice(0,3),oe=L.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${se(L.totalQty)}本を収めるには ${X}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${Z.map((J,Y)=>{const K=J.p===L.partTimers&&J.e===L.employees;return`<button data-action="cal-apply-pattern" data-date="${s}" data-part="${J.p}" data-emp="${J.e}"
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
            <h2 style="margin:0;font-size:16px;">${q}日（${N}）${z?"":"の生産内訳"}</h2>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${H} ・ 稼働率${R}%</div>
          ${L.totalQty>0?`<div style="font-size:20px;font-weight:700;margin-top:6px;">${se(L.totalQty)}<span style="font-size:13px;font-weight:400;">本</span> <span style="font-size:13px;font-weight:400;">/ ${L.items.length}品</span></div>`:""}
        </div>
        ${oe}
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
              <span>${se(L.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():s?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(s.split("-")[2])}日（${Wn(s)}）— 休日</p>
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
  `:"",k=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(L=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${L.color};"></span>${L.label}
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
      <div><strong>${se(Math.round(v))}</strong>本 ÷ <strong>${_}</strong>稼働日 = 日当たり<strong>${se(S)}</strong>本</div>
      <div>→ パ<strong>${P}</strong> 社<strong>${C}</strong>人日 ・ キャパ<strong>${se(D)}</strong>本
        ${E<v?` <span style="color:#c53d3d;">（${se(Math.round(v-E))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
      </div>
      <div style="color:var(--text-secondary);font-size:10px;">日付タップで稼働ON/OFF → 人数自動計算</div>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${k}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((L,q)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${q===0?"#c53d3d":q===6?"#0F5B8D":"var(--text-secondary)"};">${L}</div>`).join("")}
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
        ${(()=>{const L=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],q=new Map;for(const N of e){if((N.plannedQty>0?N.plannedQty:Math.max(0,N.demandForecast+N.safetyStockTarget-N.openingStock))<=0)continue;const M=N.productionType||"monthly";q.has(M)||q.set(M,[]),q.get(M).push(N)}return L.filter(N=>q.has(N.key)).map(N=>{const R=q.get(N.key),M=R.reduce((H,G)=>H+(G.plannedQty>0?G.plannedQty:Math.max(0,G.demandForecast+G.safetyStockTarget-G.openingStock)),0),z=R.filter(H=>r.has(H.productCode)).length,B=z===R.length,O=z===0,U=R.map(H=>{const G=H.plannedQty>0?H.plannedQty:Math.max(0,H.demandForecast+H.safetyStockTarget-H.openingStock),W=r.has(H.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${W?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${H.productCode}"
                    ${W?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${W?"text-decoration:line-through;":""}">${H.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${se(Math.round(G))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${N.key}"
                    ${B?"":"checked"} ${!O&&!B?'class="indeterminate"':""}
                    style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${N.color};flex-shrink:0;"></span>
                  <div style="flex:1;font-size:13px;font-weight:600;">${N.label}<span style="font-weight:400;color:var(--text-secondary);margin-left:6px;">${R.length}品 ${se(Math.round(M))}本</span></div>
                  ${z>0&&!B?`<span style="font-size:11px;color:#b7791f;">${z}品除外</span>`:""}
                  ${B?'<span style="font-size:11px;color:var(--text-secondary);">全除外</span>':""}
                </div>
                ${U}
              </div>
            `}).join("")})()}
      </div>
    </section>
  `}function Ap(e,t,n,s,r,i,c="all",p=null,u=[],y=null,v=new Set,g={partCapacity:pt,empCapacity:ut}){const E=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(D=>`<button class="tab-button ${s===D.key?"active":""}"
       data-demand-tab="${D.key}">${D.label}</button>`).join("");let _="";if(s==="demand")_=e?xp(e,i):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(s==="safety")_=$p(t,p);else if(s==="plan")_=Sp(n,r,c,p);else if(s==="calendar")try{_=Ep(n,r,u,y,v,g)}catch(D){console.error("[renderCalendarTab] error:",D),_=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(D)}
${D?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${E}
    </div>

    ${_}
  `}const Ve={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Re=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function le(e){return e.toLocaleString("ja-JP")}function he(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function yn(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function Lp(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function hn(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function Cp(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(P=>P.month))].sort(),n=Re.filter(P=>e.some(C=>C.brewCategory===P)),s={};for(const P of e)s[P.month]||(s[P.month]={}),s[P.month][P.brewCategory]=P.shipmentMl;const r=820,i=300,c={top:20,right:20,bottom:50,left:70},p=r-c.left-c.right,u=i-c.top-c.bottom,y=t.map(P=>n.reduce((C,S)=>C+(s[P]?.[S]??0),0)),v=Math.max(...y,1),g=p/t.length,$=Math.max(g-8,14),E=[0,.25,.5,.75,1].map(P=>{const C=c.top+u-u*P,S=v*P/1e3;return`
      <line x1="${c.left}" y1="${C}" x2="${r-c.right}" y2="${C}" class="chart-grid" />
      <text x="6" y="${C+4}" class="chart-axis">${Math.round(S).toLocaleString("ja-JP")}L</text>
    `}).join(""),_=t.map((P,C)=>{let S=c.top+u;const o=c.left+C*g+(g-$)/2,l=n.map(x=>{const k=s[P]?.[x]??0,L=k/v*u;return S-=L,L>0?`<rect x="${o}" y="${S}" width="${$}" height="${L}" fill="${Ve[x]??"#9ca3af"}" opacity="0.85" rx="1"><title>${x}: ${he(k)}L</title></rect>`:""}).join(""),[d,m]=P.split("-"),h=parseInt(m),w=h===10||C%2===0,f=h===10?`${d}年度`:`${h}月`;return`<g>${l}${w?`<text x="${o+$/2}" y="${i-12}" class="chart-axis centered-axis" style="font-size:10px;">${f}</text>`:""}</g>`}).join(""),D=n.map(P=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${Ve[P]??"#9ca3af"};"></span>
       ${P}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${i}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${E}${_}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${c.left}px;display:flex;flex-wrap:wrap;">${D}</div>
  `}function Dp(e,t,n,s){const r=new Map;for(const p of e){const u=p.brewCategory;r.has(u)||r.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const y=r.get(u);y.rows.push(p),y.totalMl+=p.totalShipmentMl,y.avgMl+=p.monthlyAvgMl,y.stockL=p.currentStockL}const i=new Map;for(const p of t)i.has(p.brewCategory)||i.set(p.brewCategory,[]),i.get(p.brewCategory).push(p);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${Re.filter(p=>r.has(p)).map(p=>{const u=r.get(p),y=Ve[p]??"#9ca3af",v=hn(p);i.get(p);const g=n[p]??{rawAlcoholPct:18,targetAlcoholPct:15},$=g.targetAlcoholPct>0?g.rawAlcoholPct/g.targetAlcoholPct:1;u.stockL*1e3;const E=u.totalMl,_=u.avgMl,D=E/1e3,P=Math.round(u.stockL*$*10)/10,C=P*1e3,S=_>0?Math.round(C/_*10)/10:0,o=P-D,l=_>0?Math.round(_*2/1e3*10)/10:0,d=P<l,m=yn(S),h=Lp(S),w=Math.min(S/12*100,100),f=o>=0?"#22c55e":"#ef4444",x=o>=0?`+${le(Math.round(o))}L 余裕`:`${le(Math.round(o))}L 不足`,k=$>1.001;return`
        <div class="card" style="border-top:3px solid ${y};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${y};">${p}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${m}20;color:${m};font-weight:600;">${h}</span>
              <button class="btn-edit-stock" data-cat-id="${v}" data-cat="${p}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${v}">
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
            ${(()=>{const L=s.filter(q=>q.parentCategory===p);return L.length===0?"":L.map(q=>{const R=t.filter(M=>M.brewCategory===q.name).reduce((M,z)=>M+z.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${q.name}</span>
                  ${R>0?`<span style="margin-left:4px;">${le(R)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${v}" style="display:none;margin-bottom:8px;">
            ${(()=>{const L=s.filter(M=>M.parentCategory===p),q=[{name:p,label:p},...L.map(M=>({name:M.name,label:M.name}))],N=q.flatMap(M=>t.filter(B=>B.brewCategory===M.name).map(B=>({...B,catLabel:M.label}))),R=q.map(M=>`<option value="${M.name}">${M.label}</option>`).join("");return`
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${N.map(M=>`
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                      <span style="font-size:11px;flex:1;min-width:60px;">${M.label||"タンク"}</span>
                      <strong style="font-size:13px;">${le(M.volumeL)}L</strong>
                      ${q.length>1?`
                        <select data-action="brew-reassign-entry" data-id="${M.id}"
                          style="font-size:10px;padding:1px 4px;border:1px solid var(--border);border-radius:3px;max-width:100px;">
                          ${q.map(z=>`<option value="${z.name}" ${z.name===M.brewCategory?"selected":""}>${z.label}</option>`).join("")}
                        </select>
                      `:`<span style="font-size:10px;color:var(--text-secondary);">${M.catLabel}</span>`}
                      <button data-action="brew-delete-entry" data-id="${M.id}" data-cat="${M.brewCategory}"
                        style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                    </div>
                  `).join("")||'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">タンクなし</div>'}
                </div>
                <div style="display:flex;gap:4px;align-items:center;margin-top:6px;flex-wrap:wrap;">
                  ${q.length>1?`<select id="new-entry-target-${v}" style="height:28px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">${R}</select>`:""}
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
            <span style="color:${f};font-weight:600;">年間比 ${x}</span>
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
      `}).join("")}</div>`}function qp(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const r of e)t.has(r.brewCategory)||t.set(r.brewCategory,[]),t.get(r.brewCategory).push(r);const n=`
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
  `,s=[];for(const r of Re){const i=t.get(r);if(!i)continue;const c=Ve[r]??"#9ca3af",p=i.length>1,u=i.reduce((P,C)=>P+C.totalShipmentQty,0),y=i.reduce((P,C)=>P+C.totalShipmentMl,0),v=i.reduce((P,C)=>P+C.monthlyAvgQty,0),g=i.reduce((P,C)=>P+C.monthlyAvgMl,0),$=i.reduce((P,C)=>P+C.productCount,0),E=i[0].currentStockL,_=g>0?Math.round(E*1e3/g*10)/10:0,D=yn(_);if(s.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${p?"pointer":"default"};" ${p?`data-toggle-cat="${r}"`:""}>
        <td style="color:${c};">
          ${p?`<span class="toggle-icon" data-cat="${r}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${r}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${$}</td>
        <td style="text-align:right;">${le(u)}</td>
        <td style="text-align:right;">${he(y)}</td>
        <td style="text-align:right;">${le(v)}</td>
        <td style="text-align:right;">${he(g)}</td>
        <td style="text-align:right;">${le(E)}</td>
        <td style="text-align:right;color:${D};font-weight:700;">${_.toFixed(1)}</td>
      </tr>
    `),p)for(const P of i)s.push(`
          <tr class="sub-row-${hn(r)}" style="display:none;font-size:12px;">
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
  `}function Tp(e,t,n,s,r,i={}){const c={html:"",needByCategory:{}};if(e.length===0)return c;const p={},u=new Date,y=u.getMonth()+1,v=y>=10?u.getFullYear():u.getFullYear()-1,g=v+1,$=new Map;for(const x of e)$.has(x.brewCategory)||$.set(x.brewCategory,new Map),$.get(x.brewCategory).set(x.fy,{shipL:x.shipmentL,annualL:x.annualizedL});const E=new Map;for(const x of r)E.has(x.brewCategory)||E.set(x.brewCategory,new Map),E.get(x.brewCategory).set(x.monthNum,x.avgMonthlyL);const _=[...new Set(e.map(x=>x.fy))].sort(),D=[...$.keys()].sort((x,k)=>{const L=[...Re,...s.map(q=>q.name)];return(L.indexOf(x)===-1?99:L.indexOf(x))-(L.indexOf(k)===-1?99:L.indexOf(k))}),P=[];for(let x=y;x<=9;x++)P.push(x);if(y>=10)for(let x=1;x<=9;x++)P.push(x);const C=_.filter(x=>x<v),S=_.includes(v),o=D.map(x=>{const k=$.get(x);_.filter(pe=>k.has(pe));const L=Ve[x]??"#6366f1",q=E.get(x)??new Map,N=C.filter(pe=>k.has(pe)).map(pe=>k.get(pe).shipL);let R=0;if(N.length>=2){let pe=0,xe=0;for(let Oe=1;Oe<N.length;Oe++)if(N[Oe-1]>0){const ya=(N[Oe]-N[Oe-1])/N[Oe-1],qt=Oe;pe+=ya*qt,xe+=qt}R=xe>0?pe/xe:0}const M=k.get(v)?.annualL??0,z=N.length>0?N[N.length-1]:0,B=M>0&&z>0?Math.round(z*.4+M*.6):z||M,O=P.reduce((pe,xe)=>pe+(q.get(xe)??0),0),U=t.filter(pe=>pe.brewCategory===x).reduce((pe,xe)=>pe+xe.volumeL,0),H=n[x],G=H&&H.targetAlcoholPct>0?H.rawAlcoholPct/H.targetAlcoholPct:1,W=Math.round(U*G),Q=Math.max(0,W-Math.round(O)),X=x in i,Z=X?i[x]:R,oe=Math.round(Z*100),J=Math.round(B*(1+Z)),Y=Math.max(0,J-Q);p[x]=Y;const K=oe>0?"#22c55e":oe<0?"#ef4444":"#6b7280",ae=Math.round(R*100),ge=k.get(v)?.annualL??0;return`
      <tr>
        <td style="color:${L};font-weight:600;white-space:nowrap;">${x}</td>
        ${C.map(pe=>`<td style="text-align:right;">${k.has(pe)?le(Math.round(k.get(pe).shipL)):"—"}</td>`).join("")}
        ${S?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${le(Math.round(ge))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${oe}"
            data-action="brew-growth-edit" data-cat="${x}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${X?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${K};font-weight:600;${X?"background:rgba(37,99,235,0.06);":""}"
            title="${X?`手動設定（自動: ${N.length>=2?ae+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${le(W)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${le(Math.round(O))}</td>
        <td style="text-align:right;font-weight:600;">${le(Q)}</td>
        <td style="text-align:right;">${le(J)}</td>
        <td style="text-align:right;color:${Y>0?"#ef4444":"#22c55e"};font-weight:700;">${Y>0?le(Y):"余裕"}</td>
      </tr>
    `}).join("");let l=0,d=0,m=0,h=0,w=0;for(const x of D){const k=$.get(x),L=E.get(x)??new Map,q=C.filter(Z=>k.has(Z)).map(Z=>k.get(Z).shipL);let N=0;if(q.length>=2){let Z=0,oe=0;for(let J=1;J<q.length;J++)if(q[J-1]>0){const Y=(q[J]-q[J-1])/q[J-1];Z+=Y*J,oe+=J}N=oe>0?Z/oe:0}const R=k.get(v)?.annualL??0,M=q.length>0?q[q.length-1]:0,z=R>0&&M>0?Math.round(M*.4+R*.6):M||R,B=t.filter(Z=>Z.brewCategory===x).reduce((Z,oe)=>Z+oe.volumeL,0),O=n[x],U=O&&O.targetAlcoholPct>0?O.rawAlcoholPct/O.targetAlcoholPct:1,H=Math.round(B*U),G=P.reduce((Z,oe)=>Z+(L.get(oe)??0),0),W=Math.max(0,H-Math.round(G)),Q=x in i?i[x]:N,X=Math.round(z*(1+Q));l+=H,d+=Math.round(G),m+=W,h+=X,w+=Math.max(0,X-W)}const f=y<=9?`${y}月〜9月`:`${y}月〜翌9月`;return{needByCategory:p,html:`
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
              ${C.map(x=>`<th style="text-align:right;">${x}(L)</th>`).join("")}
              ${S?`<th style="text-align:right;">${v}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${f}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${g}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${C.map(()=>"<td></td>").join("")}
              ${S?"<td></td>":""}
              <td></td>
              <td style="text-align:right;">${le(l)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${le(d)}</td>
              <td style="text-align:right;">${le(m)}</td>
              <td style="text-align:right;">${le(h)}</td>
              <td style="text-align:right;color:#ef4444;">${le(w)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}}function Ip(e,t,n,s,r){if(e.length===0)return"";const i=new Date,c=i.getMonth()+1,p=i.getFullYear(),u=[];let y=c,v=p;for(let C=0;C<4;C++){const S=[];for(let d=0;d<3;d++)S.push({y:v,m:y}),y++,y>12&&(y=1,v++);const o=`${S[0].y}/${S[0].m}`,l=`${S[2].y}/${S[2].m}`;u.push({label:`${o}-${l}`,months:S})}const g=new Map;for(const C of n)g.has(C.brewCategory)||g.set(C.brewCategory,new Map),g.get(C.brewCategory).set(C.monthNum,C.avgMonthlyL);const $=new Map;for(const C of e)$.has(C.brewCategory)||$.set(C.brewCategory,C.currentStockL);for(const C of r){const S=t.filter(o=>o.brewCategory===C.name).reduce((o,l)=>o+l.volumeL,0);S>0&&$.set(C.name,S)}const E=new Map;for(const C of r)E.has(C.parentCategory)||E.set(C.parentCategory,[]),E.get(C.parentCategory).push(C);const _=[];for(const C of Re){($.has(C)||(g.get(C)?.size??0)>0)&&_.push({cat:C,isChild:!1});for(const S of E.get(C)??[])($.has(S.name)||(g.get(S.name)?.size??0)>0)&&_.push({cat:S.name,isChild:!0})}function D(C,S){const o=s[C],l=o&&o.targetAlcoholPct>0?o.rawAlcoholPct/o.targetAlcoholPct:1;let d=($.get(C)??0)*l;const m=g.get(C)??new Map,h=Ve[C]??(S?"#6366f1":"#9ca3af");let w="";const f=[];for(const x of u){const k=x.months.reduce((R,{m:M})=>R+(m.get(M)??0),0),L=d;d=Math.max(0,d-k),L>0&&d<=0&&!w&&(w=x.label);const N=d<=0?"#ef4444":d<k?"#eab308":"#22c55e";f.push(`<td style="text-align:right;padding:4px 6px;color:${N};font-weight:${d<=0?"700":"400"};">${d>0?le(Math.round(d)):"枯渇"}</td>`)}return`
      <tr style="${S?"background:rgba(99,102,241,0.02);":""}">
        <td style="color:${h};font-weight:${S?"500":"600"};padding:4px 6px;white-space:nowrap;${S?"padding-left:20px;font-size:11px;":""}">${S?"┗ ":""}${C}</td>
        <td style="text-align:right;padding:4px 6px;">${le(Math.round(($.get(C)??0)*l))}</td>
        ${f.join("")}
        <td style="padding:4px 6px;font-size:11px;color:${w?"#ef4444":"#22c55e"};font-weight:600;">
          ${w?`⚠ ${w}`:"12ヶ月+"}
        </td>
      </tr>
    `}const P=_.map(({cat:C,isChild:S})=>D(C,S)).join("");return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 8px 0;">四半期別 在庫枯渇予測</h3>
      <p style="font-size:11px;color:#6b7280;margin:0 0 10px;">現在庫（加水後）から季節出荷を差し引いた残量推移</p>
      <div class="table-wrap">
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th style="padding:4px 6px;">区分</th>
              <th style="text-align:right;padding:4px 6px;">現在庫(L)</th>
              ${u.map(C=>`<th style="text-align:right;padding:4px 6px;font-size:10px;">${C.label}</th>`).join("")}
              <th style="padding:4px 6px;">枯渇時期</th>
            </tr>
          </thead>
          <tbody>${P}</tbody>
        </table>
      </div>
    </div>
  `}function Np(e,t,n){const s=new Map;for(const c of e){s.has(c.brewCategory)||s.set(c.brewCategory,{avgMl:0,totalMl:0,stockL:c.currentStockL});const p=s.get(c.brewCategory);p.avgMl+=c.monthlyAvgMl,p.totalMl+=c.totalShipmentMl}for(const c of n){const p=t.filter(u=>u.brewCategory===c.name).reduce((u,y)=>u+y.volumeL,0);(p>0||s.has(c.name))&&(s.has(c.name)?s.get(c.name).stockL=p:(s.get(c.parentCategory),s.set(c.name,{avgMl:0,totalMl:0,stockL:p})))}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${[...Re,...n.map(c=>c.name)].filter(c=>s.has(c)&&(s.get(c).stockL>0||s.get(c).totalMl>0)).map(c=>{const p=s.get(c),u=p.avgMl>0?Math.round(p.stockL*1e3/p.avgMl*10)/10:0,y=p.totalMl/1e3,v=y>0?Math.round(p.stockL/y*100):0,g=n.some(P=>P.name===c),$=Ve[c]??(g?"#6366f1":"#9ca3af"),E=p.avgMl>0?yn(u):p.stockL>0?"#22c55e":"#9ca3af",_=p.avgMl>0?Math.min(u/12*100,100):p.stockL>0?100:0,D=p.avgMl>0?`${u.toFixed(1)}ヶ月 / 年間の${v}%`:`${le(p.stockL)}L在庫`;return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:100px;font-size:12px;font-weight:500;color:${$};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c}">${g?"┗ ":""}${c}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${E};height:100%;width:${_}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">${D}</span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${p.stockL>0?"var(--text)":"#ef4444"};">${le(p.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function Mp(e,t,n,s,r){if(e.length===0)return"";const i=n.map(g=>g.name);[...Re,...i];const c=new Map;for(const g of n)c.has(g.parentCategory)||c.set(g.parentCategory,[]),c.get(g.parentCategory).push(g);const p=new Map;for(const g of e)p.has(g.brewCategory)||p.set(g.brewCategory,[]),p.get(g.brewCategory).push(g);for(const g of i)p.has(g)||p.set(g,[]);const u=new Set;for(const g of n)for(const $ of p.get(g.name)??[])u.add($.productCode);const y=new Map;for(const g of Re)y.set(g,p.get(g)??[]);const v=Re.filter(g=>p.has(g)).map(g=>{const $=p.get(g)??[],E=Ve[g]??"#9ca3af",_=c.get(g)??[],D=_.length>0,P=$.reduce((f,x)=>f+x.annualMl,0),C=$.reduce((f,x)=>f+x.monthlyAvgMl,0),S=$.filter(f=>!u.has(f.productCode)),o=S.filter(f=>!t.has(f.productCode)),l=o.reduce((f,x)=>f+x.annualMl,0),d=o.reduce((f,x)=>f+x.monthlyAvgMl,0),m=S.filter(f=>t.has(f.productCode)),h=S.map(f=>{const x=t.has(f.productCode);return`
          <tr style="${x?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${D?`<input type="checkbox" ${x?"":"checked"} data-action="brew-move-to-child" data-code="${f.productCode}" data-parent="${g}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${x?"color:#b7791f;":""}" title="${f.productName}">
              ${f.productName}${x?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${f.subCategory}</td>
            <td style="text-align:right;">${he(f.annualMl)}</td>
            <td style="text-align:right;">${he(f.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),w=_.map(f=>{const x=p.get(f.name)??[],k=x.reduce((B,O)=>B+O.annualMl,0),L=x.reduce((B,O)=>B+O.monthlyAvgMl,0),q=r.filter(B=>B.brewCategory===f.name),N=q.reduce((B,O)=>B+O.volumeL,0),R=hn(f.name),M=x.map(B=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${B.productCode}" data-cat="${f.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${B.productName}"><strong>${B.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${B.subCategory}</td>
            <td style="text-align:right;">${he(B.annualMl)}</td>
            <td style="text-align:right;">${he(B.monthlyAvgMl)}</td>
          </tr>
        `).join(""),z=m.filter(B=>!x.some(O=>O.productCode===B.productCode)).map(B=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${B.productCode}" data-cat="${f.name}"
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
                <strong style="font-size:12px;color:#6366f1;">${f.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${x.length}品 ・ ${he(k)}L/年${N>0?` ・ 在庫${le(N)}L`:""}</span>
                <button class="btn-edit-stock" data-cat-id="${R}" data-cat="${f.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${f.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${R}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${q.map(B=>`
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${B.label||"タンク"}</span>
                    <strong style="font-size:11px;">${le(B.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${B.id}" data-cat="${f.name}"
                      style="font-size:9px;padding:1px 4px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">×</button>
                  </div>
                `).join("")}
                <div style="display:flex;gap:3px;align-items:center;margin-top:3px;">
                  <input id="new-entry-label-${R}" type="text" placeholder="名前" style="width:70px;height:22px;font-size:10px;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <input id="new-entry-vol-${R}" type="number" min="0" placeholder="L" style="width:50px;height:22px;font-size:10px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <button data-action="brew-add-entry" data-cat="${f.name}" data-cat-id="${R}"
                    style="font-size:9px;padding:2px 6px;border:none;border-radius:3px;background:#0F5B8D;color:#fff;cursor:pointer;">追加</button>
                </div>
                <button class="btn-cancel-stock" data-cat-id="${R}" style="font-size:9px;padding:2px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;margin-top:3px;">閉じる</button>
              </div>
              ${M.length>0||z.length>0?`
                <table class="data-table" style="font-size:11px;margin:0;">
                  <tbody>
                    ${M}
                    ${z}
                  </tbody>
                  ${x.length>0?`<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${he(k)}</td><td style="text-align:right;">${he(L)}</td>
                  </tr></tfoot>`:""}
                </table>
              `:'<div style="font-size:10px;color:var(--text-secondary);padding:4px;">親からチェックを外すとここに候補表示されます</div>'}
            </div>
          </td></tr>
        `}).join("");return`
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${E};"></span>
            <h4 style="margin:0;font-size:14px;">${g}</h4>
            <span style="font-size:12px;color:var(--text-secondary);">
              全${$.length}銘柄 ・ 年間${he(P)}L
              ${D?`（内 ${_.map(f=>`${f.name}:${(p.get(f.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${D?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${h}
                ${w}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${he(P)}</td><td style="text-align:right;">${he(C)}</td></tr>
                ${D?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${he(l)}</td><td style="text-align:right;">${he(d)}</td></tr>`:""}
                ${m.length>0?`<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${m.length}品</td>
                  <td style="text-align:right;">${he(m.reduce((f,x)=>f+x.annualMl,0))}</td>
                  <td style="text-align:right;">${he(m.reduce((f,x)=>f+x.monthlyAvgMl,0))}</td></tr>`:""}
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
      ${v}
    </div>
  `}function Rp(e,t,n,s=[],r=new Set,i=[],c={},p=[],u={},y=[],v=[],g={},$={}){const E=new Date,_=E.getMonth()>=9?E.getFullYear():E.getFullYear()-1,D=Array.from({length:5},(C,S)=>{const o=_-S;return`<option value="${o}" ${o===n?"selected":""}>${o}年度 (${o}/10-${o+1}/9)</option>`}).join(""),P=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return P||`
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
        ${Cp(t)}
      </div>

      ${Dp(e,p,u,i)}

      ${Tp(y,p,u,i,v,g).html}

      ${Np(e,p,i)}

      ${Ip(e,p,v,u,i)}

      ${Mp(s,r,i,c,p)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${qp(e)}
      </div>
    </section>
  `}const ka={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Op=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"],wt=[10,11,12,1,2,3,4,5,6,7,8,9],Xn=["10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月","9月"],Ke=[9,10,11,12,1,2,3,4,5],Bp=["9月","10月","11月","12月","1月","2月","3月","4月","5月"];function re(e){return e.toLocaleString("ja-JP")}function jp(e,t,n,s=[],r=2026,i=[],c=[],p={}){const y=[...new Set([...Object.keys(e).filter(f=>e[f]>0),...s.filter(f=>f.plannedVolumeL>0).map(f=>f.brewCategory)])];if(y.length===0)return'<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>';const v=[...Op,...n.map(f=>f.name)];y.sort((f,x)=>(v.indexOf(f)===-1?99:v.indexOf(f))-(v.indexOf(x)===-1?99:v.indexOf(x)));const g={polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0},$=new Map;for(const f of s)$.has(f.brewCategory)||$.set(f.brewCategory,[]),$.get(f.brewCategory).push(f);const E=(f,x,k,L,q)=>`<input type="number" step="${q}" value="${k}" data-action="brew-rice-edit" data-cat="${x}" data-field="${f}"
        style="width:${L};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`,_=(f,x,k)=>`<select data-action="brew-rice-variety-select" data-cat="${x}" data-field="${f}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${i.map(L=>`<option value="${L.name}" ${L.name===k?"selected":""}>${L.name}${L.region?` (${L.region})`:""}</option>`).join("")}
      ${!i.some(L=>L.name===k)&&k?`<option value="${k}" selected>${k}</option>`:""}
    </select>`;let D=0,P=0,C=0,S=0;const o=wt.map(()=>0),l=new Map,d=y.map(f=>{const x=e[f]??0,k=t[f]??g,L=ka[f]??"#6366f1",q=$.get(f)??[],N=f in p,R=q.reduce((K,ae)=>K+ae.plannedVolumeL,0),M=q.length>0,z=N?p[f]:M?R:x,B=k.alcoholAdditionRatio??0,O=z*(1-B),U=Math.round(O*k.ricePerLiterKg),H=Math.round(U*k.kojiRatio),G=U-H,W=Math.round(H/k.polishingRatio),Q=Math.round(G/k.polishingRatio),X=W+Q,Z=Math.round(W*k.kojiPricePerKg),oe=Math.round(Q*k.kakePricePerKg);D+=W,P+=Q,C+=Z,S+=oe;for(const[K,ae,ge,pe]of[[k.kojiVariety,W,k.kojiPricePerKg,"麹米"],[k.kakeVariety,Q,k.kakePricePerKg,"掛米"]]){if(ae<=0)continue;l.has(K)||l.set(K,{brownKg:0,pricePerKg:ge,cost:0,usage:[]});const xe=l.get(K);xe.brownKg+=ae,xe.cost+=Math.round(ae*ge),xe.pricePerKg=Math.round(xe.cost/xe.brownKg),xe.usage.push({cat:f,type:pe,kg:ae})}const J=wt.map(()=>0);if(q.length>0)for(const K of q){const ae=wt.indexOf(K.brewMonth);ae>=0&&(J[ae]+=K.plannedVolumeL)}else{const K=z/12;for(let ae=0;ae<12;ae++)J[ae]=K}const Y=J.reduce((K,ae)=>K+ae,0)||1;for(let K=0;K<12;K++){const ae=J[K]/Y;o[K]+=Math.round(X*ae)}return`
      <div class="card" style="border-top:3px solid ${L};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${L};">${f}</h4>
          <div style="font-size:12px;">${z>0?`予算 <strong>¥${re(Z+oe)}</strong>`:'<span style="color:#6b7280;font-weight:600;">醸造しない</span>'}</div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(z)}"
              data-action="proc-edit-vol" data-cat="${f}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid ${N?"#2563eb":"var(--border)"};border-radius:4px;padding:0 4px;font-weight:600;${N?"background:rgba(37,99,235,0.04);":""}" />L
          </label>
          ${B>0?`<span style="color:var(--text-secondary);">−${Math.round(B*100)}%→${re(Math.round(O))}L</span>`:""}
          ${x>0&&Math.abs(x-z)>10?`<span style="color:var(--text-secondary);font-size:11px;">(予測${re(Math.round(x))})</span>`:""}
        </div>

        <div style="border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:8px;background:var(--surface-alt);">
          <div style="font-size:11px;font-weight:600;color:${L};margin-bottom:6px;">醸造スケジュール${q.length>0?` (${re(Math.round(q.reduce((K,ae)=>K+ae.plannedVolumeL,0)))}L / ${re(Math.round(z))}L)`:""}</div>
          ${q.length>0?`
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
              ${q.map(K=>`
                <div style="display:flex;align-items:center;gap:3px;padding:3px 8px;border-radius:4px;background:${L}15;border:1px solid ${L}30;">
                  <span style="font-size:11px;font-weight:600;color:${L};">${K.brewMonth}月</span>
                  <input type="number" min="0" max="${Math.round(z)}" step="100" value="${Math.round(K.plannedVolumeL)}"
                    data-action="proc-sched-edit-vol" data-cat="${f}" data-month="${K.brewMonth}"
                    style="width:56px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />L
                  <button data-action="proc-sched-remove" data-cat="${f}" data-month="${K.brewMonth}"
                    style="border:none;background:none;color:#ef4444;cursor:pointer;font-size:14px;padding:0 2px;line-height:1;">×</button>
                </div>
              `).join("")}
            </div>
          `:'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px;">醸造月を追加してください</div>'}
          <div style="display:flex;align-items:center;gap:4px;">
            <select data-action="proc-add-month-select" data-cat="${f}"
              style="height:24px;font-size:11px;border:1px solid var(--border);border-radius:3px;padding:0 4px;">
              ${[10,11,12,1,2,3,4,5,6,7,8,9].filter(K=>!q.some(ae=>ae.brewMonth===K)).map(K=>`<option value="${K}">${K}月</option>`).join("")}
            </select>
            <input type="number" min="0" max="${Math.round(z)}" step="100" placeholder="L"
              data-action="proc-add-month-vol" data-cat="${f}"
              style="width:56px;height:24px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />
            <button data-action="proc-add-schedule" data-cat="${f}"
              style="height:24px;font-size:11px;padding:0 8px;border:1px solid ${L};background:${L}10;color:${L};border-radius:3px;cursor:pointer;">+追加</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${E("ricePerLiterKg",f,k.ricePerLiterKg,"48px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${E("kojiRatio",f,k.kojiRatio,"44px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${E("polishingRatio",f,k.polishingRatio,"44px","0.01")}</label>
          ${B>0||f==="本醸造"||f==="普通酒"?`<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${E("alcoholAdditionRatio",f,k.alcoholAdditionRatio??0,"44px","0.01")}</label>`:""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${_("kojiVariety",f,k.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${E("kojiPricePerKg",f,k.kojiPricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${re(W)}kg</strong> <span style="color:var(--text-secondary);">(${(W/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${re(Z)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${_("kakeVariety",f,k.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${E("kakePricePerKg",f,k.kakePricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${re(Q)}kg</strong> <span style="color:var(--text-secondary);">(${(Q/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${re(oe)}</div>
          </div>
        </div>
      </div>
    `}).join(""),m=D+P,h=C+S,w=Math.max(...o,1);return wt.map((f,x)=>{const k=o[x];return`
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${k/w*100}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${k>0?2:0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${Xn[x]}</div>
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
          ${Bp.map(f=>`<div style="text-align:center;padding:4px;font-weight:600;border-left:1px solid var(--border);">${f}</div>`).join("")}
        </div>
        ${(()=>{const f=[],x=Ke.length,k=new Map;for(const N of c)N.deliveryMonth&&(k.has(N.varietyName)||k.set(N.varietyName,[]),k.get(N.varietyName).push(N.deliveryMonth));for(const[N,R]of k){const M=Ke.map(z=>{const B=R.includes(z),O=c.filter(U=>U.varietyName===N&&U.deliveryMonth===z).reduce((U,H)=>U+H.committedBales,0);return`<div style="text-align:center;padding:3px;border-left:1px solid var(--border);${B?"background:#dcfce7;":""}">
                ${B?`<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${O}俵</div>`:""}
              </div>`}).join("");f.push(`<div style="display:grid;grid-template-columns:80px repeat(${x},1fr);border-top:1px solid var(--border);">
              <div style="padding:4px;color:#16a34a;font-weight:500;font-size:10px;">📥 ${N}</div>${M}
            </div>`)}const L=34,q=2;for(const N of y){const R=$.get(N)??[],M=ka[N]??"#6366f1",z=N in p,B=R.reduce((J,Y)=>J+Y.plannedVolumeL,0),O=R.length>0,U=z?p[N]:O?B:e[N]??0,H=[],G=[...R].sort((J,Y)=>Ke.indexOf(J.brewMonth)-Ke.indexOf(Y.brewMonth)),W=[];for(const J of G){const Y=Ke.indexOf(J.brewMonth);if(Y<0)continue;const K=Math.min(J.durationMonths,x-Y),ae=Y+K;let ge=0;for(;ge<W.length&&W[ge]>Y;)ge++;ge>=W.length?W.push(ae):W[ge]=ae,H.push({s:J,startIdx:Y,dur:K,lane:ge})}const X=Math.max(W.length,1)*(L+q)+q,Z=Ke.map(()=>`<div style="border-left:1px solid var(--border);height:${X}px;"></div>`).join(""),oe=H.map(({s:J,startIdx:Y,dur:K,lane:ae})=>{const ge=(Y/x*100).toFixed(2),pe=(K/x*100).toFixed(2),xe=q+ae*(L+q);return`<div class="gantt-bar" data-cat="${N}" data-month="${J.brewMonth}" data-dur="${K}" data-vol="${Math.round(J.plannedVolumeL)}" data-max="${Math.round(U)}"
                style="position:absolute;left:${ge}%;width:${pe}%;top:${xe}px;height:${L}px;
                  background:${M}30;border:2px solid ${M};border-radius:6px;cursor:grab;
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${M};overflow:hidden;box-sizing:border-box;">
                <div class="gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
                <span class="gantt-bar-label" style="pointer-events:none;white-space:nowrap;">${re(Math.round(J.plannedVolumeL))}L</span>
                <div class="gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
              </div>`}).join("");f.push(`<div style="display:grid;grid-template-columns:80px 1fr;border-top:1px solid var(--border);">
              <div style="padding:4px;color:${M};font-weight:500;font-size:10px;display:flex;align-items:center;">🍶 ${N}</div>
              <div style="position:relative;display:grid;grid-template-columns:repeat(${x},1fr);">
                ${Z}
                <div class="gantt-bar-container" data-cat="${N}" data-max="${Math.round(U)}" data-cols="${x}" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                  ${oe}
                </div>
              </div>
            </div>`)}return f.join("")||'<div style="text-align:center;color:var(--text-secondary);padding:16px;">区分を追加するとタイムラインが表示されます</div>'})()}
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(()=>{const f=y.map(k=>{const L=t[k]??g,q=$.get(k)??[],N=k in p,R=q.reduce((H,G)=>H+G.plannedVolumeL,0),M=q.length>0,z=N?p[k]:M?R:e[k]??0,B=z*(1-(L.alcoholAdditionRatio??0)),O=Math.round(B*L.ricePerLiterKg),U=Math.round(O/L.polishingRatio);return{cat:k,brewingL:z,brownKg:U,color:ka[k]??"#6366f1"}}).filter(k=>k.brewingL>0||k.brownKg>0),x=Math.max(...f.map(k=>k.brownKg),1);return f.map(k=>{const L=Math.min(k.brownKg/x*100,100);return`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="width:90px;font-size:11px;font-weight:500;color:${k.color};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${k.cat}</span>
              <div style="flex:1;background:#e5e7eb;border-radius:3px;height:20px;overflow:hidden;position:relative;">
                <div style="background:${k.color};opacity:0.7;height:100%;width:${L}%;border-radius:3px;"></div>
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
            ${[...l.entries()].sort((f,x)=>x[1].brownKg-f[1].brownKg).map(([f,x])=>{const k=(x.brownKg/60).toFixed(1),L=x.usage.map(q=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${q.type==="麹米"?"rgba(99,102,241,0.08)":"rgba(183,121,31,0.08)"};margin-right:3px;">${q.cat}/${q.type} ${re(q.kg)}kg</span>`).join("");return`
                <tr>
                  <td style="font-weight:600;">${f}</td>
                  <td style="text-align:right;font-weight:600;">${re(x.brownKg)}</td>
                  <td style="text-align:right;">${k}</td>
                  <td style="text-align:right;">¥${re(x.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${re(x.cost)}</td>
                  <td style="max-width:300px;overflow-x:auto;">${L}</td>
                </tr>
              `}).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              <td style="text-align:right;">${re(m)}</td>
              <td style="text-align:right;">${Math.ceil(m/60)}</td>
              <td></td>
              <td style="text-align:right;">¥${re(h)}</td>
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
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${re(C)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${re(P)}kg</strong> <span style="color:var(--text-secondary);">(${(P/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${re(S)}</div>
        </div>
        <div style="background:var(--surface-alt);border-radius:8px;padding:14px;border:2px solid var(--border);">
          <div style="font-size:11px;font-weight:600;">総合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${re(m)}kg</strong> <span style="color:var(--text-secondary);">(${Math.ceil(m/60)}俵)</span></div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">¥${re(h)}<span style="font-size:13px;font-weight:400;margin-left:4px;">(${(h/1e4).toFixed(0)}万)</span></div>
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
      ${(()=>{const f=new Map;for(const[M,z]of l)f.set(M,z.brownKg);const x=new Map;for(const M of c){x.has(M.varietyName)||x.set(M.varietyName,{bales:0,kg:0,cost:0,suppliers:[]});const z=x.get(M.varietyName);z.bales+=M.committedBales,z.kg+=M.committedBales*60,z.cost+=M.committedBales*60*M.pricePerKg,M.supplier&&!z.suppliers.includes(M.supplier)&&z.suppliers.push(M.supplier)}const k=[...new Set([...f.keys(),...x.keys()])];let L=0,q=0;const N=k.map(M=>{const z=f.get(M)??0,B=x.get(M),O=B?.kg??0,U=O-z;L+=O,q+=z;const H=U>=0?"#22c55e":"#ef4444",G=U>=0?`+${re(Math.round(U))}kg余裕`:`${re(Math.round(U))}kg不足`,W=O>0?Math.min(z/O*100,100):0;return`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${M}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${re(Math.round(O))}kg (${B?.bales??0}俵)</span>
                  <span>必要 ${re(Math.round(z))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${W}%;background:${O>0?U>=0?"#22c55e":"#ef4444":"#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${H};">${O>0?G:"未確保"}</span>
            </div>
          `}).join(""),R=L-q;return`
          <div style="margin-bottom:12px;">
            ${N||'<p style="color:var(--text-secondary);text-align:center;padding:12px;">作付け予定が未登録です</p>'}
          </div>
          ${L>0?`
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;padding:8px;background:var(--surface-alt);border-radius:6px;">
              <span>確保合計: <strong>${re(Math.round(L))}kg</strong> (${Math.ceil(L/60)}俵)</span>
              <span>必要合計: <strong>${re(Math.round(q))}kg</strong></span>
              <span style="color:${R>=0?"#22c55e":"#ef4444"};font-weight:600;">
                ${R>=0?`余裕 ${re(Math.round(R))}kg`:`不足 ${re(Math.round(-R))}kg`}
              </span>
            </div>
          `:""}
          <div style="display:flex;gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap;">
            <select id="proc-commit-variety" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;">
              ${i.map(M=>`<option value="${M.name}">${M.name}</option>`).join("")}
            </select>
            <input id="proc-commit-bales" type="number" min="0" step="1" placeholder="俵数"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <input id="proc-commit-price" type="number" min="0" step="10" placeholder="円/kg"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <select id="proc-commit-month" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">
              <option value="">入荷月</option>
              ${wt.map((M,z)=>`<option value="${M}">${Xn[z]}</option>`).join("")}
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
        ${i.map(f=>`
          <div style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;margin:2px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
            <strong>${f.name}</strong>
            <span style="color:var(--text-secondary);">¥${re(f.defaultPricePerKg)}/kg</span>
            ${f.region?`<span style="color:var(--text-secondary);font-size:10px;">${f.region}</span>`:""}
            <button data-action="proc-delete-variety" data-id="${f.id}"
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
  `}const zp={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Fp={planned:"計画中",active:"進行中",completed:"完了"},Lo={未着手:"#d1d5db",進行中:"#3b82f6",完了:"#22c55e"},Be=6;function gn(e){return e.toLocaleString("ja-JP")}function Dt(e){return zp[e]??"#6366f1"}function Vt(e,t){return Math.round((new Date(t).getTime()-new Date(e).getTime())/864e5)}function Vp(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n.toISOString().slice(0,10)}function Le(e){return e?e.slice(5).replace("-","/"):"―"}function Up(e){return e.length<=3?e:e.slice(0,3)}function Yp(e,t,n){const s=e.filter(C=>C.status!=="completed"&&C.startDate&&C.targetEndDate);if(s.length===0)return"";const r=s.flatMap(C=>[C.startDate,C.targetEndDate]),i=s.flatMap(C=>t[C.id]??[]);for(const C of i)C.plannedStart&&r.push(C.plannedStart),C.plannedEnd&&r.push(C.plannedEnd);r.sort();const c=r[0],p=r[r.length-1],u=Math.min(Vt(c,p)+7,180),y=u*Be,v=[];let g="";for(let C=0;C<u;C++){const S=Vp(c,C),o=S.slice(0,7);o!==g&&(v.push(`<span style="position:absolute;left:${C*Be}px;font-size:9px;color:#6b7280;white-space:nowrap;border-left:1px solid #d1d5db;padding-left:2px;">${parseInt(S.slice(5,7))}月</span>`),g=o)}const $=new Date().toISOString().slice(0,10),E=Vt(c,$),_=E>=0&&E<u?`<div style="position:absolute;left:${E*Be}px;top:0;width:2px;height:100%;background:#ef4444;z-index:5;opacity:0.7;pointer-events:none;"></div>`:"",D=30,P=s.map(C=>{const S=(t[C.id]??[]).sort((m,h)=>m.stepOrder-h.stepOrder),o=Dt(C.brewCategory),l=n===C.id,d=S.map(m=>{const h=Math.max(Vt(c,m.plannedStart),0),w=Math.min(Vt(c,m.plannedEnd),u-1),f=h*Be,x=Math.max((w-h+1)*Be,Be),k=Lo[m.status],L=m.status==="未着手"?"#555":"#fff";return`<div class="bp-gantt-bar" data-step-id="${m.id}" data-batch-id="${m.batchId}" data-step-order="${m.stepOrder}" data-planned-start="${m.plannedStart}" data-planned-end="${m.plannedEnd}" style="position:absolute;left:${f}px;top:4px;width:${x}px;height:22px;background:${k};border-radius:3px;font-size:7px;line-height:22px;color:${L};overflow:hidden;white-space:nowrap;cursor:grab;border:1px solid ${m.status==="未着手"?"#bbb":k};" title="${m.stepName} ${Le(m.plannedStart)}〜${Le(m.plannedEnd)}"><div class="bp-gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div><span style="padding:0 16px;pointer-events:none;">${x>24?Up(m.stepName):""}</span><div class="bp-gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div></div>`}).join("");return`<div style="display:flex;align-items:center;border-bottom:1px solid ${l?"#3b82f6":"#f3f4f6"};min-height:${D}px;background:${l?"#eff6ff":"transparent"};" data-action="bp-toggle-detail" data-batch-id="${C.id}">
      <div style="width:120px;flex-shrink:0;padding:2px 6px;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;">
        <span style="color:${o};font-weight:600;">${C.batchCode}</span>
        <span style="color:#9ca3af;display:block;font-size:8px;">${C.brewCategory}</span>
      </div>
      <div style="position:relative;width:${y}px;height:${D}px;background:repeating-linear-gradient(90deg,transparent 0 ${Be*7-1}px,#f3f4f6 ${Be*7-1}px ${Be*7}px);">${d}</div>
    </div>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>醸造ガントチャート</h2><p class="panel-caption">仕込をクリックで詳細表示 ／ バーをドラッグで日程調整</p></div>
    <div id="bp-gantt" style="overflow-x:auto;touch-action:none;user-select:none;">
      <div style="min-width:${y+120}px;">
        <div style="display:flex;align-items:flex-end;">
          <div style="width:120px;flex-shrink:0;"></div>
          <div style="position:relative;width:${y}px;height:20px;">${v.join("")}</div>
        </div>
        <div style="position:relative;">${P}${_}</div>
      </div>
    </div>
  </section>`}function Jp(e,t){const n=[...t].sort((D,P)=>D.stepOrder-P.stepOrder);if(n.length===0)return"";const s=120,r=50,i=40,c=20,p=5,u=Math.ceil(n.length/p),y=p*(s+i)-i+20,v=u*(r+c)-c+20,g=D=>{const P=Math.floor(D/p);return{x:10+(P%2===0?D%p:p-1-D%p)*(s+i),y:10+P*(r+c)}},$=n.map((D,P)=>{const C=g(P),S=Lo[D.status],o=D.status==="進行中"?"#1d4ed8":D.status==="完了"?"#15803d":"#9ca3af",l=D.status==="未着手"?"#374151":"#fff";return`<g>
      <rect x="${C.x}" y="${C.y}" width="${s}" height="${r}" rx="6" fill="${S}" stroke="${o}" stroke-width="2"/>
      <text x="${C.x+s/2}" y="${C.y+20}" text-anchor="middle" fill="${l}" font-size="11" font-weight="600">${D.stepName}</text>
      <text x="${C.x+s/2}" y="${C.y+36}" text-anchor="middle" fill="${l}" font-size="9" opacity="0.8">${Le(D.plannedStart)}〜${Le(D.plannedEnd)}</text>
    </g>`}).join(""),E=n.slice(1).map((D,P)=>{const C=g(P),S=g(P+1),o=C.x+s/2,l=C.y+r/2,d=S.x+s/2,m=S.y+r/2;if(Math.floor(P/p)===Math.floor((P+1)/p)){const w=d>o?1:-1,f=C.x+(w>0?s:0),x=l,k=S.x+(w>0?0:s);return`<line x1="${f}" y1="${x}" x2="${k}" y2="${m}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}else{const w=C.y+r,f=S.y;return`<line x1="${o}" y1="${w}" x2="${d}" y2="${f}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}}).join("");return`<div id="bp-network" style="margin-bottom:16px;">
    <section class="panel">
      <div class="panel-header">
        <h2 style="display:flex;align-items:center;gap:6px;">
          <span style="color:${Dt(e.brewCategory)};">●</span> ${e.batchCode} 醸造工程フロー
        </h2>
        <p class="panel-caption">クリティカルパス（全工程直列）</p>
      </div>
      <div style="overflow-x:auto;padding:8px 0;">
        <svg width="${y}" height="${v}" style="display:block;">
          <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/></marker></defs>
          ${E}${$}
        </svg>
      </div>
    </section>
  </div>`}function Kp(e,t,n){if(e.length===0)return'<div class="panel" style="padding:20px;text-align:center;color:#9ca3af">仕込が未登録です。調達計画から取込むか、新規登録してください。</div>';const s=e.map(r=>{const i=t[r.id]??[],c=i.length,p=i.filter(g=>g.status==="完了").length,u=c>0?Math.round(p/c*100):0,y=Dt(r.brewCategory);return`<tr style="border-bottom:1px solid #f3f4f6;background:${n===r.id?"#eff6ff":"transparent"};cursor:pointer;" data-action="bp-toggle-detail" data-batch-id="${r.id}">
      <td style="padding:6px;font-size:12px;font-weight:600;color:${y};">${r.batchCode}</td>
      <td style="padding:6px;font-size:11px;"><span style="background:${y};color:#fff;padding:1px 6px;border-radius:9999px;font-size:10px;">${r.brewCategory}</span></td>
      <td style="padding:6px;font-size:11px;text-align:right;">
        <input type="number" min="0" step="100" value="${Math.round(r.plannedVolumeL)}" data-action="bp-batch-vol" data-batch-id="${r.id}" style="width:60px;font-size:11px;text-align:right;border:1px solid #e5e7eb;border-radius:3px;padding:2px 4px;" onclick="event.stopPropagation()">L
      </td>
      <td style="padding:6px;font-size:11px;">
        <input type="date" value="${r.startDate}" data-action="bp-batch-date" data-batch-id="${r.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
      </td>
      <td style="padding:6px;">
        <select data-action="bp-batch-status" data-batch-id="${r.id}" style="font-size:10px;border:1px solid #e5e7eb;border-radius:3px;padding:2px;" onclick="event.stopPropagation()">
          ${["planned","active","completed"].map(g=>`<option value="${g}"${r.status===g?" selected":""}>${Fp[g]}</option>`).join("")}
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
  </section>`}function Hp(e,t){if(e.length===0)return"";const n=new Set(t.map(i=>`${i.brewCategory}:${i.startDate?.slice(0,7)}`)),s=e.filter(i=>{const c=i.brewMonth>=10?i.fy:i.fy+1,p=`${i.brewCategory}:${c}-${String(i.brewMonth).padStart(2,"0")}`;return!n.has(p)&&i.plannedVolumeL>0});return s.length===0?"":`<section class="panel" style="margin-bottom:16px">
    <div class="panel-header">
      <div><h2>調達計画から取込</h2><p class="panel-caption">未登録のスケジュールを一括で仕込登録</p></div>
      <button class="button primary" data-action="bp-import-schedule" style="font-size:12px;">一括仕込登録</button>
    </div>
    <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid #e5e7eb;color:#6b7280;text-align:left;font-size:10px">
        <th style="padding:3px 6px">区分</th><th style="padding:3px 6px">コード</th><th style="padding:3px 6px;text-align:right">醸造量</th><th style="padding:3px 6px">開始月</th><th style="padding:3px 3px;text-align:center">選択</th>
      </tr></thead><tbody>${s.map(i=>{const p=`${i.brewMonth>=10?i.fy:i.fy+1}-${String(i.brewMonth).padStart(2,"0")}-01`,u=`${i.brewCategory}-${i.fy}-${String(i.brewMonth).padStart(2,"0")}`;return`<tr>
      <td style="padding:5px 6px"><span style="color:${Dt(i.brewCategory)};font-weight:600;font-size:11px;">${i.brewCategory}</span></td>
      <td style="padding:5px 6px;font-size:11px;">${u}</td>
      <td style="padding:5px 6px;text-align:right;font-size:11px;">${gn(Math.round(i.plannedVolumeL))}L</td>
      <td style="padding:5px 6px;font-size:11px;">${i.brewMonth}月（${p}）</td>
      <td style="padding:5px 3px;text-align:center;"><input type="checkbox" data-action="bp-import-check" data-cat="${i.brewCategory}" data-month="${i.brewMonth}" data-vol="${Math.round(i.plannedVolumeL)}" data-date="${p}" data-code="${u}" checked></td>
    </tr>`}).join("")}</tbody></table></div>
  </section>`}function Qp(e){return`<div class="panel" style="margin-bottom:16px">
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
  </div>`}function Wp(e,t){const n=[...t].sort((i,c)=>i.stepOrder-c.stepOrder);if(n.length===0)return"";const s=n.map(i=>`<tr style="border-bottom:1px solid #f3f4f6">
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
  </tr>`).join("");return`<section class="panel" style="margin-bottom:16px;border-left:4px solid ${Dt(e.brewCategory)};">
    <div class="panel-header"><h2>${e.batchCode} 工程詳細</h2><p class="panel-caption">${e.brewCategory} ｜ ${gn(e.plannedVolumeL)}L ｜ ${Le(e.startDate)}〜${Le(e.targetEndDate)}</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:500px">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left">
          <th style="padding:3px 6px">工程</th><th style="padding:3px 6px">予定</th><th style="padding:3px 6px">実績</th>
          <th style="padding:3px 3px">状態</th><th style="padding:3px 3px">温度</th><th style="padding:3px 3px">メモ</th>
        </tr></thead>
        <tbody>${s}</tbody>
      </table>
    </div>
  </section>`}function Gp(e,t,n){const s=new Map;for(const i of t){if(!i.tankNo||i.status==="completed")continue;const c=n[i.id]??[],p=c.find(y=>y.stepName==="仕込み(添/仲/留)"),u=c.find(y=>y.stepName==="上槽");p?.plannedStart&&u?.plannedEnd&&(s.has(i.tankNo)||s.set(i.tankNo,[]),s.get(i.tankNo).push({batchCode:i.batchCode,start:p.plannedStart,end:u.plannedEnd}))}const r=e.map(i=>{const c=s.get(i.tankNo)??[],p=c.length>0?c.map(u=>`<span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#dbeafe;color:#2563eb;">${u.batchCode}(${Le(u.start)}〜${Le(u.end)})</span>`).join(" "):'<span style="font-size:9px;color:#22c55e;">空き</span>';return`<tr style="border-bottom:1px solid #f3f4f6;">
      <td style="padding:4px 6px;font-size:12px;font-weight:600;">${i.tankNo}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${gn(i.capacityL)}L</td>
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
  </section>`}function Xp(e,t,n){if(e.length===0||n.length===0)return"";const s=new Map(n.map(y=>[y.stepName,y])),r=new Map;for(const y of e){if(!y.plannedStart||!y.plannedEnd)continue;const v=s.get(y.stepName);if(!v)continue;const g=new Date(y.plannedStart),$=new Date(y.plannedEnd),E=Math.max(Math.round(($.getTime()-g.getTime())/864e5)+1,1);let _=0;for(let P=0;P<E;P++)new Date(g.getTime()+P*864e5).getDay()!==0&&_++;if(_===0)continue;const D=v.laborHours/_;for(let P=new Date(g);P<=$;P=new Date(P.getTime()+864e5)){if(P.getDay()===0)continue;const C=new Date(P);C.setDate(C.getDate()+3-(C.getDay()+6)%7);const S=new Date(C.getFullYear(),0,4),o=1+Math.round(((C.getTime()-S.getTime())/864e5-3+(S.getDay()+6)%7)/7),l=`${C.getFullYear()}-W${String(o).padStart(2,"0")}`;r.set(l,(r.get(l)??0)+D)}}if(r.size===0)return"";const i=[...r.keys()].sort(),c=t.workerCount*t.weeklyHoursLimit,p=Math.max(...r.values(),c),u=i.map(y=>{const v=r.get(y)??0,g=Math.min(v/p*100,100),$=v>c,E=$?"#ef4444":v>c*.8?"#f59e0b":"#22c55e",_=y.replace(/^\d{4}-W/,"W");return`<div style="text-align:center;flex:1;min-width:32px;">
      <div style="height:60px;display:flex;align-items:flex-end;justify-content:center;">
        <div style="width:20px;height:${g}%;background:${E};border-radius:3px 3px 0 0;min-height:2px;" title="${Math.round(v)}h / ${c}h"></div>
      </div>
      <div style="font-size:8px;color:#9ca3af;margin-top:2px;">${_}</div>
      <div style="font-size:9px;font-weight:600;color:${$?"#ef4444":"#374151"};">${Math.round(v)}h</div>
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
  </section>`}function Zp(e,t,n,s={}){const{expandedBatchId:r,showNewForm:i,schedule:c=[],fy:p=2026,workerSettings:u={workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},stepLabor:y=[],tanks:v=[]}=s,g={};for(const S of t)(g[S.batchId]??=[]).push(S);const $=e.filter(S=>S.status==="active").length,E=e.filter(S=>S.status==="planned").length,_=e.filter(S=>S.status==="completed").length,D=r?e.find(S=>S.id===r):null,P=D?Jp(D,g[D.id]??[]):"",C=D?Wp(D,g[D.id]??[]):"";return`
    <section class="page-head">
      <div><p class="eyebrow">製造管理</p><h1>醸造工程管理</h1></div>
      <div class="meta-stack" style="display:flex;gap:8px;">
        <button class="button primary" data-action="bp-auto-schedule" style="font-size:12px;">自動スケジュール</button>
        <button class="button" data-action="bp-show-new-form">＋ 新規仕込</button>
      </div>
    </section>
    <section class="kpi-grid compact">
      <article class="panel kpi-card"><p class="panel-title">醸造中</p><p class="kpi-value">${$}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">計画中</p><p class="kpi-value">${E}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">完了</p><p class="kpi-value">${_}</p><p class="kpi-sub">今期</p></article>
    </section>

    ${Yp(e,g,r)}
    ${Xp(t,u,y)}
    ${Gp(v,e,g)}
    ${i?Qp(n):""}
    ${Hp(c,e)}
    ${P}
    ${C}
    ${Kp(e,g,r)}

    <div id="bp-delete-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:1000;align-items:center;justify-content:center;">
      <div style="background:white;border-radius:12px;padding:24px;max-width:360px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <h3 style="margin:0 0 12px;font-size:15px;">仕込を削除</h3>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;"><strong id="bp-delete-batch-name"></strong> の仕込を削除します。<br>関連する全工程データも削除されます。この操作は取り消せません。</p>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button data-action="bp-delete-cancel" style="padding:8px 16px;font-size:13px;border:1px solid #d1d5db;background:white;border-radius:6px;cursor:pointer;">キャンセル</button>
          <button data-action="bp-delete-confirm" style="padding:8px 16px;font-size:13px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer;font-weight:600;">削除する</button>
        </div>
      </div>
    </div>`}function Fa(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function eu(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Co(e){return e?da.find(t=>t.value===e)?.label??e:""}function tu(e){const t=[],n=[],s=[];for(const r of e){const i=r.amount_last_year_same_month>0?r.amount_this_month/r.amount_last_year_same_month:1,c={code:r.customer_code,name:r.customer_name,businessType:r.business_type,areaCode:r.area_code,phone:r.phone,lastOrderDate:r.last_order_date,daysSinceLastOrder:r.days_since_order,totalAmountLast12m:r.amount_12m,amount3m:r.amount_3m,amountThisMonth:r.amount_this_month,amountLastYearSameMonth:r.amount_last_year_same_month,annualRevenue:r.annual_revenue,yoyRatio:i,status:"dormant"};r.is_at_risk?t.push({...c,status:"at-risk"}):r.is_dormant?n.push({...c,status:"dormant"}):r.amount_last_year_same_month>0&&i<.8&&s.push({...c,status:"declining"})}return t.sort((r,i)=>i.totalAmountLast12m-r.totalAmountLast12m),n.sort((r,i)=>i.daysSinceLastOrder-r.daysSinceLastOrder),s.sort((r,i)=>r.yoyRatio-i.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:s}}function au(e,t){const n=t?.reason??"",s=da.map(r=>`<option value="${r.value}" ${n===r.value?"selected":""}>${r.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${s}
    </select>`}function nu(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],s=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',r=!!t?.actionedAt,i=r?'style="opacity:0.45;"':"",c=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${Co(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${r?"1":"0"}" ${i}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${c}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${s}
      <td class="numeric">${Fa(e.totalAmountLast12m)}</td>
      <td>${au(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${r?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function Pa(e,t,n,s,r,i,c,p){if(r.length===0)return"";const u=r.map(y=>nu(y,p.get(y.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${s}" style="margin-right:8px;">${r.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${eu(i)}</p>
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
    </section>`}function su(e,t=[]){const{atRiskCustomers:n,dormantCustomers:s,decliningCustomers:r}=e,i=n.length+s.length+r.length,c=n.reduce((P,C)=>P+C.totalAmountLast12m,0),p=s.reduce((P,C)=>P+C.totalAmountLast12m,0),u=r.reduce((P,C)=>P+C.totalAmountLast12m,0),y=[...n,...s,...r],v=[...new Set(y.map(P=>P.areaCode).filter(Boolean))].sort(),g=[...new Set(y.map(P=>P.businessType).filter(Boolean))].sort(),$=new Map(t.map(P=>[P.customerCode,P])),E=t.filter(P=>P.actionedAt).length,_=new Map;t.forEach(P=>{P.reason&&_.set(P.reason,(_.get(P.reason)??0)+1)});const D=[..._.entries()].sort((P,C)=>C[1]-P[1]).slice(0,5).map(([P,C])=>`<span class="status-pill info" style="font-size:0.75rem;">${Co(P)} ${C}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${Fa(c)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${s.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${Fa(p)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${r.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${E}<span class="kpi-sub">社</span></div>
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
        ${v.map(P=>`<option value="${P}">${P}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${g.map(P=>`<option value="${P}">${P}</option>`).join("")}
      </select>
    </div>

    ${Pa("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,c,"状況",$)}
    ${Pa("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",s,p,"経過日数",$)}
    ${Pa("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",r,u,"前年同月比",$)}

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
    <\/script>`}const Fe=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Va={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},ze={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function ou(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ru(e){const t=e.reduce((i,c)=>i+c,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const s=Math.max(...e);return e.filter(i=>i>s*.1).length<=6?"seasonal":"year-round"}function iu(e){const t=e.reduce((i,c)=>i+c,0);if(t===0)return[];const s=t/12*1.5,r=[];for(let i=0;i<12;i++)e[i]>s&&r.push(i);if(r.length===0){const i=Math.max(...e);i>0&&r.push(e.indexOf(i))}return r.sort((i,c)=>i-c)}function lu(e){return e.length===0?0:(e[0]-2+12)%12}function Zn(e){const t=new Date().getMonth(),n=e.map(r=>{const i=ru(r.monthlyQuantity),c=iu(r.monthlyQuantity),p=lu(c);return{code:r.code,name:r.name,category:r.category,peakMonths:c,proposalStartMonth:p,seasonType:i,monthlyQuantity:r.monthlyQuantity}}),s=[];for(let r=0;r<12;r++){const i=n.filter(c=>{if(c.peakMonths.length===0)return!1;const p=c.proposalStartMonth,u=c.peakMonths[0];return p<=u?r>=p&&r<=u:r>=p||r<=u});s.push({month:r,products:i,targetCustomers:[]})}return{products:n,proposals:s,selectedMonth:t}}function cu(e){const{products:t,proposals:n,selectedMonth:s}=e,r=new Date().getMonth(),i={"year-round":[],seasonal:[],"year-end":[]};t.forEach(g=>i[g.seasonType].push(g));const c=n[s],p=t.length,u=c?.products.length??0,y=t.filter(g=>g.peakMonths.includes(s)).length,v=c?.targetCustomers.length??0;return`
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
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${y}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${v}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${Fe.map((g,$)=>{const E=$===r,_=$===s;return`<button class="button" style="padding:4px 10px;background:${_?"#0F5B8D":E?"#e2e8f0":"transparent"};color:${_?"#fff":"#333"};border:${E&&!_?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${$}">${g}${E?" ●":""}</button>`}).join("")}
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
          ${du(i,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${pu(i,s)}

  <!-- Target customer list for selected month -->
  ${uu(c)}
</div>`}function du(e,t){const n=[],s=["year-round","seasonal","year-end"];for(const r of s){const i=e[r];if(i.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${ze[r]}15;color:${ze[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${Va[r]}</span>
    </td></tr>`);for(const c of i){const p=Fe.map((u,y)=>{const v=c.peakMonths.includes(y),g=Do(c,y),$=y===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let E="transparent";v?E=ze[c.seasonType]:g&&(E=ze[c.seasonType]+"40");const _=v||g?`background:${E};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${$}"><div style="${_}" title="${v?"ピーク":g?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${c.name}"><span class="mono" style="font-size:0.7rem;color:#888">${c.code}</span> ${c.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${ze[c.seasonType]}15;color:${ze[c.seasonType]}">${Va[c.seasonType]}</span></td>
        ${p}
      </tr>`)}}}return n.join("")}function Do(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,s=e.peakMonths[0];return n<=s?t>=n&&t<s:t>=n||t<s}function pu(e,t){const s=["year-round","seasonal","year-end"].map(r=>{const i=e[r];if(i.length===0)return"";const c=i.filter(u=>u.peakMonths.includes(t)||Do(u,t));if(c.length===0)return"";const p=c.map(u=>{const v=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',g=u.monthlyQuantity.reduce(($,E)=>$+E,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${v}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${g.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map($=>Fe[$]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${ze[r]}15;color:${ze[r]}">${Va[r]}</span>
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
    </div>`}).filter(Boolean);return s.length===0?`<div style="padding:1rem;color:#666;text-align:center">${Fe[t]}に提案対象の商品はありません</div>`:s.join("")}function uu(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${ou(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const mu=["日","月","火","水","木","金","土"];function Ut(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${Math.round(e/1e3)}K`:`¥${e.toLocaleString()}`}function ot(e,t){if(t===0&&e===0)return'<span class="sc-yoy sc-yoy-flat">—</span>';if(t===0)return'<span class="sc-yoy sc-yoy-up">NEW</span>';const n=Math.round((e/t-1)*100);return n>0?`<span class="sc-yoy sc-yoy-up">+${n}%</span>`:n<0?`<span class="sc-yoy sc-yoy-down">${n}%</span>`:'<span class="sc-yoy sc-yoy-flat">±0%</span>'}function fn(e){return e?e.totalVolumes.reduce((t,n)=>t+n.bottles,0):0}function yu(e){const[t,n]=e.split("-").map(Number),s=new Date(t,n-1,1),r=new Date(t,n,0),i=[];for(let c=0;c<s.getDay();c++)i.push({outside:!0});for(let c=1;c<=r.getDate();c++)i.push({date:`${e}-${String(c).padStart(2,"0")}`});for(;i.length%7!==0;)i.push({outside:!0});return i}function Ua(e){const[t,n,s]=e.split("-").map(Number);return`${t-1}-${String(n).padStart(2,"0")}-${String(s).padStart(2,"0")}`}function es(e,t){const[n,s]=t.split("-").map(Number),r=new Date(n,s,0).getDate(),i=Array.from({length:7},()=>({count:0,amount:0,bottles:0,days:0}));for(let c=1;c<=r;c++){const p=`${t}-${String(c).padStart(2,"0")}`,u=new Date(n,s-1,c).getDay();i[u].days++;const y=e[p];y&&(i[u].count+=y.count,i[u].amount+=y.totalAmount,i[u].bottles+=fn(y))}return i}function hu(e,t){const n=[];for(let s=0;s<t.length;s+=7){const r=t.slice(s,s+7);let i=0,c=0,p=0,u=0;for(const y of r)if(y.date){u++;const v=e[y.date];v&&(i+=v.count,c+=v.totalAmount,p+=fn(v))}n.push({count:i,amount:c,bottles:p,days:u})}return n}function gu(e,t){const n=[];for(let s=0;s<t.length;s+=7){const r=t.slice(s,s+7);let i=0,c=0,p=0,u=0;for(const y of r)if(y.date){u++;const v=Ua(y.date),g=e[v];g&&(i+=g.count,c+=g.totalAmount,p+=fn(g))}n.push({count:i,amount:c,bottles:p,days:u})}return n}function fu(e,t,n,s){const[r,i]=t.split("-").map(Number),c=new Date(r,i-2,1),p=new Date(r,i,1),u=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,y=`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`,v=new Date().toISOString().slice(0,10),g=s??{},$=yu(t),E=e?es(e,t):null,_=`${r-1}-${String(i).padStart(2,"0")}`,D=s?es(s,_):null,P=e?hu(e,$):null,C=s?gu(s,$):null;let S="";if(e===null)S='<div class="sc-loading" style="grid-column:1/-1;"><div class="loading-spinner"></div><p>読み込み中…</p></div>';else for(let w=0;w<$.length;w++){const f=$[w];if(f.outside)S+='<div class="sc-cell sc-outside"></div>';else{const x=f.date,k=Number(x.split("-")[2]),L=new Date(`${x}T00:00:00`).getDay(),q=e[x],N=x===v,R=x===n,M=g[Ua(x)],z=q?.totalAmount??0,B=M?.totalAmount??0;let O="",U="",H="",G="";q&&(O=`<span class="sc-badge">${q.count}件</span>`,U=`<div class="sc-day-amt">${Ut(z)}</div>`,G=q.cityGroups.slice(0,2).map(W=>`<span class="sc-city-tag">${W.city}<em>${W.count}</em></span>`).join(""),q.cityGroups.length>2&&(G+=`<span class="sc-city-more">+${q.cityGroups.length-2}</span>`)),(z>0||B>0)&&(H=`<div class="sc-day-yoy">${ot(z,B)}</div>`),S+=`
          <div class="sc-cell ${N?"sc-today":""} ${R?"sc-selected":""} ${q?"sc-has-data":""}"
               data-sc-date="${x}">
            <div class="sc-day-header">
              <span class="sc-day-num ${L===0?"sc-sun":L===6?"sc-sat":""}">${k}</span>
              ${O}
            </div>
            ${U}
            ${H}
            <div class="sc-cities">${G}</div>
          </div>`}if((w+1)%7===0&&P){const x=Math.floor(w/7),k=P[x],L=C?.[x],q=k.days>0?k.count/k.days:0,N=L?.amount??0;S+=`
          <div class="sc-cell sc-week-total">
            <div class="sc-wt-count">${k.count}<small>件</small></div>
            <div class="sc-wt-amount">${Ut(k.amount)}</div>
            <div class="sc-wt-bottles">${k.bottles}<small>本</small></div>
            <div class="sc-wt-avg">⌀${q.toFixed(1)}<small>件/日</small></div>
            ${k.amount>0||N>0?`<div class="sc-wt-yoy">${ot(k.amount,N)}</div>`:""}
          </div>`}}let o="";if(E){o=E.map((N,R)=>{const M=N.days>0?N.count/N.days:0,z=R===0?"sc-sun":R===6?"sc-sat":"",O=D?.[R]?.amount??0;return`<div class="sc-wd-summary ${z}">
        <span class="sc-wds-count">${N.count}<small>件</small></span>
        <span class="sc-wds-amt">${Ut(N.amount)}</span>
        <span class="sc-wds-bottles">${N.bottles}<small>本</small></span>
        <span class="sc-wds-avg">⌀${M.toFixed(1)}</span>
        ${N.amount>0||O>0?`<span class="sc-wds-yoy">${ot(N.amount,O)}</span>`:""}
      </div>`}).join("");const w=E.reduce((N,R)=>N+R.count,0),f=E.reduce((N,R)=>N+R.amount,0),x=E.reduce((N,R)=>N+R.bottles,0),k=E.reduce((N,R)=>N+R.days,0),L=k>0?w/k:0,q=D?D.reduce((N,R)=>N+R.amount,0):0;o+=`<div class="sc-wd-summary sc-wd-month-total">
      <span class="sc-wds-count">${w}<small>件</small></span>
      <span class="sc-wds-amt">${Ut(f)}</span>
      <span class="sc-wds-bottles">${x}<small>本</small></span>
      <span class="sc-wds-avg">⌀${L.toFixed(1)}</span>
      ${f>0||q>0?`<span class="sc-wds-yoy">${ot(f,q)}</span>`:""}
    </div>`}const l=n&&e?.[n]?bu(e[n],g[Ua(n)]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',d=Object.values(e??{}).reduce((w,f)=>w+f.count,0),m=Object.values(e??{}).reduce((w,f)=>w+f.totalAmount,0),h=Object.values(g).reduce((w,f)=>w+f.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${d>0?`月計: <strong>${d}件</strong> / <strong>¥${m.toLocaleString()}</strong> ${ot(m,h)}`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${u}">◀</button>
          <span class="sc-month-label">${r}年${i}月</span>
          <button class="sc-nav-btn" data-sc-ym="${y}">▶</button>
        </div>
        <div class="sc-unit-note">K=¥1,000 / M=¥1,000,000 ｜ 昨対: 前年同月比</div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays-8">
            ${mu.map((w,f)=>`<div class="sc-weekday ${f===0?"sc-sun":f===6?"sc-sat":""}">${w}</div>`).join("")}
            <div class="sc-weekday sc-wk-header">週計</div>
          </div>

          ${o?`<div class="sc-wd-summary-row">${o}</div>`:""}

          <div class="sc-grid-8">
            ${S}
          </div>
        </div>

        <div class="sc-detail-col${n?" sc-detail-active":""}">
          ${l}
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
  `}function vu(e){return e.length?e.map(t=>`<span class="sc-vol-badge">${t.label}<em>${t.bottles}</em></span>`).join(""):""}function bu(e,t){const n=e.date.replace(/-/g,"/").slice(5),s=e.totalVolumes.length?`<div class="sc-day-volumes">${e.totalVolumes.map(y=>`<span class="sc-vol-tag">${y.label} <strong>${y.bottles}本</strong></span>`).join("")}</div>`:"",r=t?.totalAmount??0,i=t?.count??0,c=e.totalAmount>0||r>0?`<div class="sc-detail-yoy">
        前年同日: ${i}件 / ¥${r.toLocaleString()}
        ${ot(e.totalAmount,r)}
      </div>`:"",p={};for(const y of e.entries)(p[y.city]??=[]).push(y);const u=Object.entries(p).sort((y,v)=>v[1].length-y[1].length).map(([y,v])=>{const g=v.sort(($,E)=>E.amount-$.amount).map($=>`
          <div class="sc-customer-row">
            <div class="sc-customer-main">
              <span class="sc-customer-name" title="${$.customerName}">${$.customerName}</span>
              <span class="sc-customer-amt">${$.amount>0?`¥${$.amount.toLocaleString()}`:"-"}${$.invoiceCount>1?` (${$.invoiceCount}伝票)`:""}</span>
            </div>
            ${$.volumes.length?`<div class="sc-customer-vols">${vu($.volumes)}</div>`:""}
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${y}（${v.length}先）</div>
          ${g}
        </div>`}).join("");return`
    <p class="sc-detail-date">${n}の出荷</p>
    <p class="sc-detail-meta">${e.entries.length}先 ${e.count}伝票 / ¥${e.totalAmount.toLocaleString()}</p>
    ${c}
    ${s}
    ${u}
  `}const wu=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),Ea=["月","火","水","木","金"],ts=6;function xu(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function $u(e,t){if(t.length===0)return 0;const n=[...t].sort((r,i)=>r-i);return n.filter(r=>r<=e).length/n.length}function _u(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function as(e){const t=new Date,n=e.map(u=>u.annualRevenue),s=e.map(u=>{const y=xu(u.lastOrderDate,t);let v=0;const g=[];y>=60&&(v+=50,g.push("離反リスク")),u.hasSeasonalProposal&&(v+=30,g.push("季節提案タイミング")),y>=30&&y<60&&(v+=20,g.push("定期巡回"));const $=$u(u.annualRevenue,n),E=Math.round($*20);E>0&&(v+=E,g.push("金額ウェイト"));const _=_u(g,y);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:v,reasons:g,lastOrderDate:u.lastOrderDate,daysSinceOrder:y,annualRevenue:u.annualRevenue,recommendedAction:_}}).filter(u=>u.priorityScore>0).sort((u,y)=>y.priorityScore-u.priorityScore),r=new Map;for(const u of s){const y=u.areaCode||"その他";r.has(y)||r.set(y,[]),r.get(y).push(u)}const i=[...r.entries()].sort((u,y)=>y[1].reduce((v,g)=>v+g.priorityScore,0)-u[1].reduce((v,g)=>v+g.priorityScore,0)),c=[];let p=0;for(const[u,y]of i){const v=y.sort((g,$)=>$.priorityScore-g.priorityScore);for(let g=0;g<v.length&&!(p>=Ea.length);g+=ts){const $=v.slice(g,g+ts);c.push({dayLabel:Ea[p],area:u,visits:$}),p++}if(p>=Ea.length)break}return{candidates:s,weekPlan:c,filterArea:"",filterMinScore:0}}function Su(e){const{candidates:t,weekPlan:n,filterArea:s,filterMinScore:r}=e,i=t.filter(g=>!(s&&g.areaCode!==s||r>0&&g.priorityScore<r)),c=Array.from(new Set(t.map(g=>g.areaCode))).sort(),p=i.length,u=i.filter(g=>g.priorityScore>=50).length,y=i.filter(g=>g.reasons.includes("離反リスク")).length,v=n.reduce((g,$)=>g+$.visits.length,0);return`
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
      ${n.length===0?"<p>訪問候補がありません。</p>":ku(n)}
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
            ${i.map(g=>Pu(g)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function ku(e){return`
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
  `}function Pu(e){return`
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
      <td class="numeric">${wu.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function Eu(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=e.map(y=>{const v=y.capacity>0?Math.round(y.currentVolume/y.capacity*100):0;return`
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
      `}).join(""),r=e.filter(y=>y.status==="in_use").length,i=e.filter(y=>y.status==="aging").length,c=e.filter(y=>y.status==="empty").length,p=e.reduce((y,v)=>y+v.capacity,0),u=e.reduce((y,v)=>y+v.currentVolume,0);return`
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
  `}function Aa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Au(e){if(e.length===0)return`<section class="panel">
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
        <tbody>${e.map(c=>{const p=c.alcDegree!==null?`${c.alcDegree}度`:'<span class="text-warning">未設定</span>',u=c.taxRatePerKl!==null?`${c.taxRatePerKl.toLocaleString("ja-JP")} 円/KL`:'<span class="text-warning">度数未設定</span>',y=c.taxRatePerKl!==null?`<strong>${c.taxAmount.toLocaleString("ja-JP")} 円</strong>`:'<span class="text-warning">—</span>';return`<tr>
      <td>${c.sakeType}</td>
      <td class="numeric">${p}</td>
      <td class="numeric">${c.volumeSaleL.toLocaleString("ja-JP",{maximumFractionDigits:3})}</td>
      <td class="numeric text-warning">${c.volumeReturnL>0?c.volumeReturnL.toLocaleString("ja-JP",{maximumFractionDigits:3}):"—"}</td>
      <td class="numeric">—</td>
      <td class="numeric">${c.volumeNetL.toLocaleString("ja-JP",{maximumFractionDigits:3})}</td>
      <td class="numeric">${u}</td>
      <td class="numeric">${y}</td>
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
  </section>`}function Lu(e,t,n,s=[]){const r=e.rows.map((v,g)=>`
      <tr>
        <td class="mono">${v.taxCategory}</td>
        <td>${v.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${g}" data-tax-field="alcoholDegree" value="${v.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="productionVolume" value="${v.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="previousBalance" value="${v.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="exportDeduction" value="${v.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${g}" data-tax-field="sampleDeduction" value="${v.sampleDeduction}" />
        </td>
        <td class="numeric">${v.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${v.taxRate}</td>
        <td class="numeric"><strong>${Aa(v.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${g}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),i=e.deductions.map((v,g)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${g}" data-ded-field="type">
            ${Object.keys(Na).map($=>`<option value="${$}" ${$===v.type?"selected":""}>${Na[$]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${g}" data-ded-field="categoryCode">
            ${zs.map($=>`<option value="${$.code}" ${$.code===v.categoryCode?"selected":""}>${$.code}:${$.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${g}" data-ded-field="volume" value="${v.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${g}" data-ded-field="reason" value="${v.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${g}" data-ded-field="documentNo" value="${v.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${g}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),c=Array.from({length:12},(v,g)=>g+1),p=e.rows.reduce((v,g)=>v+g.exportDeduction+g.sampleDeduction,0),u=e.rows.reduce((v,g)=>v+g.productionVolume,0),y=u>0?p/u*100:0;return`
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
        <p class="kpi-value">${Aa(e.totalTax)}</p>
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
      <article class="panel kpi-card ${y>3?"kpi-alert":""}">
        <p class="panel-title">控除率</p>
        <p class="kpi-value">${y.toFixed(1)}%</p>
        <p class="kpi-sub">${y>3?"⚠ 見本/試験3%上限注意":"上限内"}</p>
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
              <th class="numeric">${Aa(e.totalTax)}</th>
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

    ${Au(s)}

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
  `}const vn=[{title:"販売業務",color:"#1a56db",features:[{id:"invoice-entry",route:"/invoice-entry",label:"伝票入力",desc:"売上・返品伝票の新規入力、明細追加",addedVersion:1},{id:"invoice-browse",route:"/invoice",label:"伝票照会",desc:"過去伝票の検索・表示・PDF出力",addedVersion:1},{id:"delivery-note",route:"/delivery",label:"納品書発行",desc:"納品書のPDFダウンロード・印刷",addedVersion:1},{id:"billing-monthly",route:"/billing",label:"月次請求",desc:"請求書発行・入金消込・未収管理",addedVersion:1},{id:"ledger-view",route:"/ledger",label:"得意先台帳",desc:"得意先別の取引履歴・残高確認",addedVersion:1},{id:"quote-create",route:"/quote",label:"見積作成",desc:"見積書の作成・PDF出力・メール送付",addedVersion:50},{id:"shipment-calendar",route:"/shipment-calendar",label:"配送カレンダー",desc:"伝票日付ベースの配送スケジュール確認",addedVersion:200}]},{title:"分析・レポート",color:"#7e3af2",features:[{id:"analytics-monthly",route:"/analytics",label:"月次売上グラフ",desc:"月次・商品別・得意先別の売上推移グラフ",addedVersion:1},{id:"analytics-volume",route:"/analytics",label:"移出量集計",desc:"商品・得意先別の移出量（mL）集計",addedVersion:320},{id:"customer-analysis",route:"/customer-analysis",label:"得意先分析",desc:"ABC分析・購買頻度・LTV",addedVersion:100},{id:"product-power",route:"/product-power",label:"商品力分析",desc:"商品別販売力・成長率",addedVersion:100},{id:"customer-efficiency",route:"/customer-efficiency",label:"営業効率",desc:"訪問コスト・粗利効率",addedVersion:150},{id:"report-aggregate",route:"/report",label:"集計帳票",desc:"各種集計レポートの出力",addedVersion:50},{id:"sales-list",route:"/sales",label:"売上一覧",desc:"売上明細の一覧表示・CSV出力",addedVersion:1}]},{title:"営業・顧客管理",color:"#0e9f6e",features:[{id:"churn-alert",route:"/churn-alert",label:"営業アクション",desc:"離反リスク検知・フォロー優先度",addedVersion:150},{id:"visit-planner",route:"/visit-planner",label:"訪問計画",desc:"訪問スケジュールの作成・管理",addedVersion:200},{id:"map-view",route:"/map",label:"取引先マップ",desc:"地図上で取引先の位置確認",addedVersion:100},{id:"prospects",route:"/prospects",label:"新規営業",desc:"新規開拓リストの進捗管理",addedVersion:100},{id:"email-broadcast",route:"/email",label:"メール配信",desc:"一斉メール配信・テンプレート管理",addedVersion:200},{id:"seasonal-calendar",route:"/seasonal-calendar",label:"季節提案",desc:"季節別提案スケジュール管理",addedVersion:250}]},{title:"受注・仕入",color:"#e3a008",features:[{id:"workflow-order",route:"/workflow",label:"受注ワークフロー",desc:"受注から出荷までのステータス管理",addedVersion:150},{id:"shopify-orders",route:"/shopify",label:"Shopify受注",desc:"EC受注の確認・取込",addedVersion:200},{id:"purchase-manage",route:"/purchase",label:"仕入・買掛",desc:"仕入管理・買掛金残高",addedVersion:100},{id:"payment-status",route:"/payment",label:"入金状況",desc:"入金・回収状況の一覧",addedVersion:1}]},{title:"製造管理",color:"#e02424",features:[{id:"jikomi-record",route:"/jikomi",label:"仕込管理",desc:"仕込帳・麹室・タンク仕込記録",addedVersion:200},{id:"tanks-manage",route:"/tanks",label:"タンク管理",desc:"タンク別在庫・ブレンド管理",addedVersion:200},{id:"tax-declaration",route:"/tax",label:"酒税申告書",desc:"課税移出・控除明細・eTax XML出力",addedVersion:250},{id:"tax-volume",route:"/tax",label:"移出量自動集計",desc:"販売伝票から清酒・リキュール別移出量を自動計算",addedVersion:322},{id:"demand-forecast",route:"/demand",label:"需要予測",desc:"過去実績ベースの需要予測",addedVersion:250},{id:"brewing-plan",route:"/brewing-plan",label:"醸造計画",desc:"年間醸造スケジュール管理",addedVersion:280},{id:"procurement-plan",route:"/procurement",label:"調達計画",desc:"原料米の調達・予算管理",addedVersion:280},{id:"brewing-process",route:"/brewing-process",label:"醸造工程",desc:"バッチ別工程管理・麹室制約チェック",addedVersion:300}]},{title:"マスタ・設定",color:"#6b7280",features:[{id:"master-products",route:"/master",label:"商品マスタ",desc:"商品情報の参照・編集",addedVersion:1},{id:"master-customers",route:"/master",label:"得意先マスタ",desc:"得意先情報の参照・編集",addedVersion:1},{id:"store-pos",route:"/store",label:"店舗販売",desc:"直売所のPOS・販売記録",addedVersion:250},{id:"tour-booking",route:"/tour",label:"酒蔵見学予約",desc:"見学予約の受付・管理",addedVersion:250},{id:"relay-status",route:"/setup",label:"連動状態",desc:"酒仙iとのリレー同期状態確認",addedVersion:1},{id:"csv-import",route:"/import",label:"CSV取込",desc:"マスタ・売上データのCSVインポート",addedVersion:100},{id:"user-manage",route:"/users",label:"ユーザー管理",desc:"アカウント・権限管理",addedVersion:100},{id:"url-share",route:"/",label:"URL共有",desc:"PWAモードでも全ページをURLで共有可能",addedVersion:322}]}];function ns(){return vn.flatMap(e=>e.features)}function Cu(e,t){const n=Date.now()-2592e6;return vn.flatMap(s=>s.features).filter(s=>s.route===e).some(s=>{const r=t[s.id];return r?.confirmedAt!=null&&new Date(r.confirmedAt).getTime()>n})}function Du(e,t){const s=ns().filter(c=>e[c.id]?.confirmedAt).length,r=ns().length,i=vn.map(c=>{const p=c.features.map(y=>{const v=e[y.id],g=!!v?.confirmedAt,$=v?.confirmedAt?new Date(v.confirmedAt).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"}):"",E=v?.confirmedBy?`(${v.confirmedBy})`:"",_=g&&v?.confirmedAt?Date.now()-new Date(v.confirmedAt).getTime()<720*60*60*1e3:!1;return`
        <tr class="feature-row ${g?"confirmed":""}">
          <td class="feature-check">
            <input type="checkbox" class="feature-checkbox" data-feature-id="${y.id}"
              ${g?"checked":""} />
          </td>
          <td class="feature-label">
            <a href="#" data-link="${y.route}" class="feature-link">${y.label}</a>
            ${_?'<span class="badge-new-small">NEW</span>':""}
          </td>
          <td class="feature-desc">${y.desc}</td>
          <td class="feature-version mono">v${y.addedVersion}</td>
          <td class="feature-status">
            ${g?`<span class="status-pill success">確認済 ${$} ${E}</span>`:'<span class="status-pill muted">未確認</span>'}
          </td>
        </tr>`}).join(""),u=c.features.filter(y=>e[y.id]?.confirmedAt).length;return`
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
  `}const qu={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let He=null,Tu=0;const Ya=[];function Iu(){return He&&document.body.contains(He)||(He=document.createElement("div"),He.className="toast-container",document.body.appendChild(He)),He}function F(e,t="success",n){const s=Iu(),r=++Tu,i=t==="error"?5e3:t==="warning"?4e3:3e3,c=document.createElement("div");c.className=`toast toast-${t}`,c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.innerHTML=`
    <span class="toast-icon">${qu[t]}</span>
    <span class="toast-msg">${Mu(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const p={id:r,message:e,type:t,el:c};Ya.push(p),s.appendChild(c),requestAnimationFrame(()=>{c.classList.add("toast-enter")});const u=()=>Nu(p);c.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{c.classList.add("toast-exit"),c.addEventListener("animationend",u,{once:!0})},i)}function Nu(e){const t=Ya.indexOf(e);t!==-1&&(Ya.splice(t,1),e.el.remove())}function Mu(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ee(e,t={}){const{title:n="確認",confirmLabel:s="OK",cancelLabel:r="キャンセル",variant:i="primary"}=t;return new Promise(c=>{const p=document.createElement("div");p.className="modal-backdrop confirm-backdrop",p.setAttribute("role","dialog"),p.setAttribute("aria-modal","true"),p.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${i}">
            ${i==="danger"?Ru:Ou}
          </div>
          <h3 class="confirm-title">${Yt(n)}</h3>
          <p class="confirm-message">${Yt(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${Yt(r)}</button>
          <button class="button ${i} confirm-ok">${Yt(s)}</button>
        </div>
      </div>
    `;const u=v=>{p.classList.add("confirm-exit"),p.addEventListener("animationend",()=>{p.remove()},{once:!0}),c(v)};p.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),p.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),p.addEventListener("click",v=>{v.target===p&&u(!1)});const y=v=>{v.key==="Escape"&&(document.removeEventListener("keydown",y),u(!1))};document.addEventListener("keydown",y),document.body.appendChild(p),requestAnimationFrame(()=>{p.querySelector(".confirm-ok")?.focus()})})}const Ru=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,Ou=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function Yt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ss(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Ja(e,t,n){if(t.length===0&&(!n||n.length===0))return;const s=n&&n.length>0?n:Object.keys(t[0]??{}).map(y=>({key:y,label:y})),i=`\uFEFF${[s.map(y=>ss(y.label)).join(","),...t.map(y=>s.map(v=>ss(y[v.key])).join(","))].join(`\r
`)}`,c=new Blob([i],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(c),u=document.createElement("a");u.href=p,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(p),0)}const Bu=Object.fromEntries(da.map(e=>[e.value,e.label])),ju=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan","/procurement","/brewing-process","/changelog"];let it=[];async function zu(){const{supabaseQueryAll:e}=await I(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>te);return{supabaseQueryAll:n}},void 0);it=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const os=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"},{path:"/procurement",title:"調達計画"},{path:"/brewing-process",title:"醸造工程"},{path:"/changelog",title:"機能一覧・更新履歴"}];function qo(e){const t=Wa[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function bn(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Fu(){const e=qo("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const ua=new Date,Vu=ua.toISOString().slice(0,7),Uu=ua.getFullYear(),Yu=ua.getMonth()+1,Ju=ua.toISOString().slice(0,10),Ku="C0011",Qe=Fu();function To(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return ju.includes(n)?n:"/"}function ma(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":case"/procurement":case"/brewing-process":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const rs=To(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,systemHealth:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,analysisTab:"customer",analysisPeriod:"",invoiceForm:bn(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Vu,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Uu,taxMonth:Yu,taxVolume:null,featureStatuses:null,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],mapLoaded:!1,callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...ip,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...lp},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Ju,route:rs,currentCategory:ma(rs),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},invoiceSelectedDocNo:null,invoiceSelectedLines:null,ledgerCustomerCode:Ku,salesPeriod:"month",customRange:{start:"",end:""},quoteState:oa(Ra()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCompanySettings:Ra(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyFiscalType:"jan",customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...un},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:Qe.mode,emailRegion:Qe.region,emailHistorySegment:Qe.historySegment,emailTemplateId:Qe.templateId,emailSubject:Qe.subject,emailBody:Qe.body,emailSaveMessage:Qe.saveMessage,emailSending:!1,demandForecast:{...Gl},shipmentCalendarData:null,shipmentCalendarPrevYearData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:Zt(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:pt,empCapacity:ut},brewingSchedule:[],brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},riceVarieties:[],ricePurchaseCommitments:[],procurementDecisions:{},brewingBatches:[],brewingProcessSteps:[],bpExpandedBatchId:"",bpShowNewForm:!1,bpWorkerSettings:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},bpStepLabor:[],bpTanks:[],globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function is(e){return e.slice(0,10)}function Hu(e){return{...e}}function ia(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Io(){a.invoiceForm=bn(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},ia()}function No(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,s)=>{n.productCode.trim()||(t[`lines.${s}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${s}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${s}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${s}.unitPrice`]="単価は0円以上で入力してください。")}),t}function Qu(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,Hu(t))}function Wu(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((s,r)=>{const i=r===0?1:2,c=1200*(r+1);return{productCode:s.code,productName:s.name,quantity:i,unitPrice:c,unit:"本",amount:i*c}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function Gu(e){const t=a.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Xu(e){const t=a.masterStats?.customers.find(n=>n.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Mo(e){if(Ne(e),a.invoiceErrors=No(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){A();return}a.invoiceSaving=!0,A(),Ss(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=bn(),A()}).catch(()=>{a.invoiceSaving=!1,A()})}function Ro(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((s,r)=>new Date(r.date).getTime()-new Date(s.date).getTime()).filter(s=>{const r=new Date(s.date);return!(t&&r<t||n&&r>n)})}function Oo(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?it:it.filter(e=>e.area===a.emailRegion);case"history":return it.filter(e=>e.historySegment===a.emailHistorySegment);default:return it}}function Zu(){const e=Oo();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function La(e){const t=Oo(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(s=>s.email),status:e}}function wn(){return a.user,!1}function Et(){a.globalSearchOpen=!1,a.globalQuery=""}function em(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:os.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:os}}function tm(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?Ro(a.salesSummary):[]).map(s=>({documentNo:s.documentNo,date:s.date,customerCode:s.customerCode,customerName:s.customerName,amount:s.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((s,r)=>r.balanceAmount-s.balanceAmount).map(s=>({...s})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(s=>({...s})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(s=>({...s})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(s=>({...s})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(s=>({...s})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(s=>({...s})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(s=>({...s}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(s=>({...s}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Ja(n,e,t)}function ea(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=ma(e),a.sidebarOpen=!1,e==="/customer-analysis"&&(a.analysisTab="customer"),Et(),At(e)}async function At(e){a.actionLoading=!0,A();try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,A(),a.quoteList=await pn(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:t}=await I(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>j);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await Pt(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await Za());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await en(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await I(async()=>{const{fetchShipmentCalendar:u}=await Promise.resolve().then(()=>j);return{fetchShipmentCalendar:u}},void 0),n=a.shipmentCalendarYearMonth,[s,r]=n.split("-").map(Number),i=`${s-1}-${String(r).padStart(2,"0")}`,[c,p]=await Promise.all([t(n),t(i)]);a.shipmentCalendarData=c,a.shipmentCalendarPrevYearData=p;break}case"/billing":a.billingSummary||(a.billingSummary=await tn(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await ks());break;case"/product-power":case"/product-abc":ea("/customer-analysis"),a.analysisTab="product";return;case"/customer-efficiency":a.customerEfficiency=await rt(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);break;case"/customer-analysis":await Promise.all([Ls(a.analysisPeriod).then(t=>{a.customerAnalysis=t}),Cs(a.analysisPeriod).then(t=>{a.productABC=t})]);break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await I(async()=>{const{fetchDemandForecasts:i,fetchDeliverySchedule:c}=await Promise.resolve().then(()=>j);return{fetchDemandForecasts:i,fetchDeliverySchedule:c}},void 0),[s,r]=await Promise.all([t(),n()]);a.demandForecast.forecasts=s.map(i=>({code:i.productCode,name:i.productName,segment:i.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(i.avgMonthly),adjustedAvg:Math.round(i.avgMonthly),nextMonthForecast:Math.round(i.forecastQuantity),annualForecast:Math.round(i.avgMonthly*12),safetyStock:Math.round(i.safetyStock)})),a.demandForecast.deliveries=Xl(r)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:n}=await I(async()=>{const{fetchChurnAlerts:s,fetchChurnNotes:r}=await Promise.resolve().then(()=>j);return{fetchChurnAlerts:s,fetchChurnNotes:r}},void 0);if(!a.churnAlert){const s=await t();a.churnAlert=tu(s)}a.churnNotes=await n();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await I(async()=>{const{fetchProductShipmentsFromTable:s}=await Promise.resolve().then(()=>j);return{fetchProductShipmentsFromTable:s}},void 0),n=await t();if(n.length>0)a.seasonalCalendar=Zn(n.map(s=>({code:s.code,name:s.name,category:"",monthlyQuantity:s.monthlyQuantity})));else{const{fetchProductMonthlyShipments:s}=await I(async()=>{const{fetchProductMonthlyShipments:i}=await Promise.resolve().then(()=>j);return{fetchProductMonthlyShipments:i}},void 0),r=await s();a.seasonalCalendar=Zn(r.map(i=>({code:i.code,name:i.name,category:"",monthlyQuantity:i.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:t}=await I(async()=>{const{fetchVisitPriorities:s}=await Promise.resolve().then(()=>j);return{fetchVisitPriorities:s}},void 0),n=await t();if(n.length>0)a.visitPlanner={candidates:n.map(s=>({code:s.customer_code,name:s.customer_name,phone:s.phone,address:s.address,areaCode:s.area_code,businessType:s.business_type,priorityScore:s.priority_score,reasons:s.reasons,lastOrderDate:s.last_order_date,daysSinceOrder:s.days_since_order,annualRevenue:s.annual_revenue,recommendedAction:s.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=as(n.map(s=>({code:s.customer_code,name:s.customer_name,phone:s.phone,address1:s.address,areaCode:s.area_code,businessType:s.business_type,annualRevenue:s.annual_revenue,lastOrderDate:s.last_order_date,hasSeasonalProposal:s.reasons.some(r=>r.includes("季節"))})));else{const{supabaseQueryAll:s}=await I(async()=>{const{supabaseQueryAll:u}=await Promise.resolve().then(()=>te);return{supabaseQueryAll:u}},void 0),[r,i]=await Promise.all([s("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):Ga().then(u=>u.customers)]),c=a.masterStats?.customers??i,p=new Map;r.forEach(u=>{const y=u.legacy_customer_code||"",v=u.sales_date||"",g=Number(u.total_amount)||0,$=p.get(y);!$||v>$.lastDate?p.set(y,{lastDate:v,total:($?.total??0)+g}):$.total+=g}),a.visitPlanner=as(c.filter(u=>u.isActive).map(u=>({code:u.code,name:u.name,phone:u.phone,address1:u.address1,areaCode:u.areaCode,businessType:u.businessType,annualRevenue:p.get(u.code)?.total??0,lastOrderDate:p.get(u.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:n,fetchProductionPlan:s,fetchLabelExclusions:r}=await I(async()=>{const{fetchDemandAnalysis:c,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}=await Promise.resolve().then(()=>j);return{fetchDemandAnalysis:c,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}},void 0);if(!a.demandAnalysis){const[c,p]=await Promise.all([t(a.demandYearsBack*12).catch(u=>(console.error("fetchDemandAnalysis failed:",u),null)),n().catch(u=>(console.error("fetchSafetyStockParams failed:",u),[]))]);c&&(a.demandAnalysis=c),a.safetyStockParams=p}if(a.productionPlan.length===0){const c=await s(a.demandPlanYearMonth).catch(()=>[]);c.length>0?a.productionPlan=c:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=buildPlanFromAnalysis(a.demandPlanYearMonth))}const i=await r(a.demandPlanYearMonth).catch(()=>[]);if(a.calendarLabelExcluded=new Set(i),a.productionPlan.length>0){const c=a.productionPlan.filter(p=>!a.calendarLabelExcluded.has(p.productCode));Ie(a.calendarShifts,c,a.calendarCapacity)}break}case"/procurement":case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:n,fetchBrewingSchedule:s,fetchBrewingProductDetail:r,fetchBrewingCustomCategories:i,fetchBrewingCategoryOverrides:c,fetchAllBrewingStockEntries:p,fetchCategoryTypeLinks:u,fetchAvailableProductionTypes:y,fetchBrewingAlcoholSettings:v,fetchBrewingYearlyShipments:g,fetchBrewingSeasonalPattern:$,fetchBrewingForecastOverrides:E,fetchBrewingRiceParams:_,fetchRiceVarieties:D,fetchRicePurchaseCommitments:P,fetchProcurementDecisions:C}=await I(async()=>{const{fetchBrewingPlanSummary:G,fetchBrewingMonthlyTrend:W,fetchBrewingSchedule:Q,fetchBrewingProductDetail:X,fetchBrewingCustomCategories:Z,fetchBrewingCategoryOverrides:oe,fetchAllBrewingStockEntries:J,fetchCategoryTypeLinks:Y,fetchAvailableProductionTypes:K,fetchBrewingAlcoholSettings:ae,fetchBrewingYearlyShipments:ge,fetchBrewingSeasonalPattern:pe,fetchBrewingForecastOverrides:xe,fetchBrewingRiceParams:Oe,fetchRiceVarieties:ya,fetchRicePurchaseCommitments:qt,fetchProcurementDecisions:zo}=await Promise.resolve().then(()=>j);return{fetchBrewingPlanSummary:G,fetchBrewingMonthlyTrend:W,fetchBrewingSchedule:Q,fetchBrewingProductDetail:X,fetchBrewingCustomCategories:Z,fetchBrewingCategoryOverrides:oe,fetchAllBrewingStockEntries:J,fetchCategoryTypeLinks:Y,fetchAvailableProductionTypes:K,fetchBrewingAlcoholSettings:ae,fetchBrewingYearlyShipments:ge,fetchBrewingSeasonalPattern:pe,fetchBrewingForecastOverrides:xe,fetchBrewingRiceParams:Oe,fetchRiceVarieties:ya,fetchRicePurchaseCommitments:qt,fetchProcurementDecisions:zo}},void 0),S=a.brewingPlanFY,o=`${S}-10-01`,l=`${S+1}-09-30`,[d,m,h,w,f,x,k,L,q,N,R,M,z,B,O,U,H]=await Promise.all([t(o,l).catch(()=>[]),n(o,l).catch(()=>[]),s(S).catch(()=>[]),r(o,l).catch(()=>[]),i().catch(()=>[]),c().catch(()=>({})),p().catch(()=>[]),u().catch(()=>({})),y().catch(()=>[]),v().catch(()=>({})),g().catch(()=>[]),$().catch(()=>[]),E().catch(()=>({})),_().catch(()=>({})),D().catch(()=>[]),P(S).catch(()=>[]),C(S).catch(()=>({}))]);a.brewingPlanData=d,a.brewingMonthlyTrend=m,a.brewingSchedule=h,a.brewingProductDetail=w,a.brewingCustomCategories=f,a.brewingOverrides=x,a.brewingStockEntries=k,a.brewingTypeLinks=L,a.brewingAvailableTypes=q,a.brewingYearlyShipments=R,a.brewingSeasonalPattern=M,a.brewingForecastOverrides=z,a.brewingRiceParams=B,a.riceVarieties=O,a.ricePurchaseCommitments=U,a.procurementDecisions=H,a.brewingAlcoholSettings=N;break}case"/brewing-process":{const{fetchBrewingBatches:t,fetchBrewingProcessSteps:n,fetchBrewingCustomCategories:s,fetchBrewingSchedule:r,fetchWorkerSettings:i,fetchStepLabor:c,fetchBrewingRiceParams:p,fetchTanks:u}=await I(async()=>{const{fetchBrewingBatches:C,fetchBrewingProcessSteps:S,fetchBrewingCustomCategories:o,fetchBrewingSchedule:l,fetchWorkerSettings:d,fetchStepLabor:m,fetchBrewingRiceParams:h,fetchTanks:w}=await Promise.resolve().then(()=>j);return{fetchBrewingBatches:C,fetchBrewingProcessSteps:S,fetchBrewingCustomCategories:o,fetchBrewingSchedule:l,fetchWorkerSettings:d,fetchStepLabor:m,fetchBrewingRiceParams:h,fetchTanks:w}},void 0),y=a.brewingPlanFY,[v,g,$,E,_,D,P]=await Promise.all([t(y).catch(()=>[]),s().catch(()=>[]),r(y).catch(()=>[]),i().catch(()=>({workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1})),c().catch(()=>[]),p().catch(()=>({})),u().catch(()=>[])]);a.brewingBatches=v,a.brewingSchedule=$,a.bpWorkerSettings=E,a.bpStepLabor=_,a.brewingRiceParams=D,a.bpTanks=P,v.length>0?a.brewingProcessSteps=await n(v.map(C=>C.id)).catch(()=>[]):a.brewingProcessSteps=[],a.brewingCustomCategories=g;break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await Ts());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Is());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await Ns());break;case"/materials":a.materialList.length===0&&(a.materialList=await Ms());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Rs(),Os()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([Bs(),js()]));break;case"/tax":(!a.taxDeclaration||!a.taxVolume)&&([a.taxDeclaration,a.taxVolume]=await Promise.all([sn(a.taxYear,a.taxMonth),on(a.taxYear,a.taxMonth)]));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([rn(a.storeSalesDate),Vs()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await I(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>j);return{fetchMailSenders:n}},void 0);if(a.mailSenders=await t(),!a.emailSenderId||!a.mailSenders.find(n=>n.id===a.emailSenderId)){const n=a.mailSenders.find(s=>s.isDefault)??a.mailSenders[0];n&&(a.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await I(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>j);return{fetchCalendarEvents:n}},void 0);a.calendarEvents=await t(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await I(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>j);return{fetchIntegrationSettings:n}},void 0);a.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchShopifyOrders:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>j);return{fetchShopifyOrders:s,fetchIntegrationSettings:r}},void 0);a.shopifyOrders=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchFaxInbox:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>j);return{fetchFaxInbox:s,fetchIntegrationSettings:r}},void 0);a.faxRecords=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/ledger":a.customerLedger=await Xa(a.ledgerCustomerCode);break;case"/setup":[a.syncDashboard,a.systemHealth]=await Promise.all([bs(),ws()]);break;case"/raw-browser":a.rawTableList.length===0&&(a.rawTableList=await Xs());break;case"/users":{const{fetchUserProfiles:t}=await I(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>j);return{fetchUserProfiles:n}},void 0);a.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:s}=await I(async()=>{const{fetchMyProfile:i,fetchAuditLogs:c,fetchMailSenders:p}=await Promise.resolve().then(()=>j);return{fetchMyProfile:i,fetchAuditLogs:c,fetchMailSenders:p}},void 0),r=a.user?.email??a.myProfile?.email??"";r&&(a.myProfile=await t(r)),a.mailSenders.length===0&&(a.mailSenders=await s()),a.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await I(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>j);return{fetchAuditLogs:n}},void 0);a.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await I(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>j);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:n}=await I(async()=>{const{fetchMapCustomers:i,fetchDeliveryLocations:c}=await Promise.resolve().then(()=>j);return{fetchMapCustomers:i,fetchDeliveryLocations:c}},void 0),[s,r]=await Promise.all([t(),n()]);a.mapCustomers=s,a.deliveryLocations=r,a.mapLoaded=!0}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchCallLogs:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>j);return{fetchCallLogs:s,fetchIntegrationSettings:r}},void 0);a.callLogs=await t(100),a.integrations.length===0&&(a.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchLeadLists:s,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>j);return{fetchLeadLists:s,fetchIntegrationSettings:r}},void 0);a.leadLists=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await I(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>j);return{fetchWorkflowOrdersFromDb:n}},void 0);a.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await I(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>j);return{fetchTourInquiriesFromDb:n}},void 0);a.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:s}=await I(async()=>{const{fetchSlackRules:r,fetchSlackLogs:i,fetchIntegrationSettings:c}=await Promise.resolve().then(()=>j);return{fetchSlackRules:r,fetchSlackLogs:i,fetchIntegrationSettings:c}},void 0);a.slackRules=await t(),a.slackLogs=await n(50),a.integrations.length===0&&(a.integrations=await s())}break;case"/changelog":a.featureStatuses||(a.featureStatuses=await sa());break;case"/":a.featureStatuses||(a.featureStatuses=await sa());break;default:break}}catch(t){console.error("Route data load error:",e,t),F(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{a.actionLoading=!1,A()}}function ls(){if(wn())return Vc(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return Tt("sales");case"/cat/brewery":return Tt("brewery");case"/cat/purchase":return Tt("purchase");case"/cat/more":return Tt("more");case"/invoice-entry":return hc(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/quote":return a.quoteEditId===null?xc(a.quoteList,a.quoteListLoading):mo(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return _c(a.quoteCompanySettings);case"/email":return pc(Zu());case"/delivery":return a.deliveryNote?cc(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return fu(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate,a.shipmentCalendarPrevYearData);case"/billing":return a.billingSummary?Ul(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?Pd(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Dc(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return qc(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);case"/customer-analysis":return a.customerAnalysis?fd(a.customerAnalysis,a.productABC,a.analysisTab,a.analysisPeriod):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return ac(a.demandForecast);case"/demand":return Ap(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return Rp(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/procurement":{const e={};if(a.brewingYearlyShipments.length>0){const t=new Date,n=t.getMonth()+1,s=n>=10?t.getFullYear():t.getFullYear()-1,r=[...new Set(a.brewingYearlyShipments.map(u=>u.fy))].filter(u=>u<s).sort(),i=new Map;for(const u of a.brewingSeasonalPattern)i.has(u.brewCategory)||i.set(u.brewCategory,new Map),i.get(u.brewCategory).set(u.monthNum,u.avgMonthlyL);const c=[];for(let u=n;u<=9;u++)c.push(u);if(n>=10)for(let u=1;u<=9;u++)c.push(u);const p=new Map;for(const u of a.brewingYearlyShipments)p.has(u.brewCategory)||p.set(u.brewCategory,new Map),p.get(u.brewCategory).set(u.fy,{shipL:u.shipmentL,annualL:u.annualizedL});for(const[u,y]of p){const v=r.filter(m=>y.has(m)).map(m=>y.get(m).shipL);let g=0;if(v.length>=2){const m=[];for(let h=1;h<v.length;h++)v[h-1]>0&&m.push((v[h]-v[h-1])/v[h-1]);g=m.length>0?m.reduce((h,w)=>h+w,0)/m.length:0}const $=u in a.brewingForecastOverrides?a.brewingForecastOverrides[u]:g,E=v.length>0?v[v.length-1]:y.get(s)?.annualL??0,_=i.get(u)??new Map,D=c.reduce((m,h)=>m+(_.get(h)??0),0),P=a.brewingStockEntries.filter(m=>m.brewCategory===u).reduce((m,h)=>m+h.volumeL,0),C=a.brewingAlcoholSettings[u],S=C&&C.targetAlcoholPct>0?C.rawAlcoholPct/C.targetAlcoholPct:1,o=Math.round(P*S),l=Math.max(0,o-Math.round(D)),d=Math.round(E*(1+$));e[u]=Math.max(0,d-l)}}return jp(e,a.brewingRiceParams,a.brewingCustomCategories,a.brewingSchedule,a.brewingPlanFY,a.riceVarieties,a.ricePurchaseCommitments,a.procurementDecisions)}case"/churn-alert":return a.churnAlert?su(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?cu(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?Su(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/brewing-process":{const e=[...new Set(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール",...a.brewingCustomCategories.map(t=>t.name)])];return Zp(a.brewingBatches,a.brewingProcessSteps,e,{expandedBatchId:a.bpExpandedBatchId,showNewForm:a.bpShowNewForm,schedule:a.brewingSchedule.map(t=>({brewCategory:t.brewCategory,fy:t.fy,brewMonth:t.brewMonth,durationMonths:t.durationMonths,plannedVolumeL:t.plannedVolumeL})),fy:a.brewingPlanFY,workerSettings:a.bpWorkerSettings,stepLabor:a.bpStepLabor,tanks:a.bpTanks.map(t=>({id:t.id,tankNo:t.tankNo,capacityL:t.capacityL,tankType:t.tankType,preferredCategories:t.preferredCategories,cleanupDays:t.cleanupDays}))})}case"/jikomi":return a.jikomiView==="calendar"?`${Mn(a.jikomiList,a.jikomiView)}${jc(a.jikomiList)}`:Mn(a.jikomiList,a.jikomiView);case"/tanks":return Eu(a.tankList);case"/kentei":return zc(a.kenteiList);case"/materials":return td(a.materialList)+ed(a.materialEditing,a.materialEditingIsNew);case"/purchase":return rd(a.purchaseList,a.payableList);case"/raw-material":return id(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Lu(a.taxDeclaration,a.taxYear,a.taxMonth,a.taxVolume??[]):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return Cd(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?pd(a.pipelineMeta,ve,ce,a.syncDashboard,a.systemHealth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return fp(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return qd(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return up(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return Id(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapLoaded?a.mapCustomers.length===0?`<section class="page-head"><div><p class="eyebrow">取引先マップ</p><h1>取引先マップ</h1></div></section>
          <section class="panel">
            <div style="padding:32px;text-align:center;color:var(--text-secondary)">
              <p style="font-size:1.5rem;margin-bottom:8px">📍</p>
              <p style="font-weight:600;margin-bottom:4px">緯度・経度データがありません</p>
              <p style="font-size:0.875rem">得意先マスタにジオコーディングが必要です。<br>relay フォルダの <code>geocode_customers.py</code> を実行してください。</p>
            </div>
          </section>`:Nd(a.mapCustomers,a.deliveryLocations,a.mapFilters):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>';case"/workflow":return Od(a.workflowOrders);case"/mobile-order":return Bd(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return zd(a.tourInquiries,a.tourActiveId);case"/mail-senders":return Ud(a.mailSenders,a.mailSenderEditingId);case"/calendar":return Yd(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return Kd(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return Hd(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Qd(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/changelog":{const e=a.myProfile?.name??a.myProfile?.email??"不明";return a.featureStatuses!==null?Du(a.featureStatuses,e):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">読み込み中…</p></div></section>'}case"/users":return Wd(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return Gd(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return Xd(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return Zd(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return np(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return sp(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return rp(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.salesAnalytics)return"";switch(a.route){case"/sales":return Ad(Ro(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/payment":return sd([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return Zc(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return Ic(a.invoiceRecords,a.invoiceFilter,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/ledger":return Ql(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return xo(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return nm();default:return oc(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function am(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(r=>!a.dismissedAnnouncements.has(r.id)).map(r=>{const i=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${i.bg};border-bottom:2px solid ${i.border};">
        <span class="announcement-text">${i.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),s=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+s}function nm(){const e=a.featureStatuses??{};function t(s,r,i,c){const p=`${"/".replace(/\/$/,"")||"/"}${s}`,u=Cu(s,e);return`<a href="${p}" data-link="${s}" class="home-card">
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
  `}function sm(){const e=a.route,t=ma(e),s=[{key:"sales",icon:"💼",label:"売上管理",items:[{path:"/invoice-entry",label:"伝票入力"},{path:"/invoice",label:"伝票照会"},{path:"/ledger",label:"得意先台帳"},{path:"/sales",label:"売上一覧"},{path:"/payment",label:"入金状況"},{path:"/billing",label:"月次請求"},{path:"/delivery",label:"納品書"},{path:"/report",label:"集計帳票"}]},{key:"analytics",icon:"📊",label:"分析",items:[{path:"/analytics",label:"売上分析"},{path:"/customer-analysis",label:"ABC分析"},{path:"/customer-efficiency",label:"営業効率"}]},{key:"crm",icon:"🤝",label:"CRM・営業",items:[{path:"/churn-alert",label:"営業アクション"},{path:"/map",label:"取引先マップ"},{path:"/visit-planner",label:"訪問計画"},{path:"/prospects",label:"新規営業"},{path:"/calls",label:"通話履歴"}]},{key:"brewery",icon:"🍶",label:"醸造管理",items:[{path:"/jikomi",label:"仕込管理"},{path:"/tanks",label:"タンク管理"},{path:"/brewing-plan",label:"醸造計画"},{path:"/brewing-process",label:"醸造工程"},{path:"/tax",label:"酒税申告"},{path:"/demand",label:"需要・生産計画"}]},{key:"master",icon:"🗂",label:"マスタ・帳票",items:[{path:"/master",label:"マスタ管理"},{path:"/store",label:"店舗・直売所"},{path:"/print",label:"印刷センター"},{path:"/calendar",label:"カレンダー"},{path:"/tour",label:"酒蔵見学"}]},{key:"settings",icon:"⚙",label:"設定",items:[{path:"/setup",label:"連動設定"},{path:"/integrations",label:"外部連携"},{path:"/users",label:"ユーザー管理"},{path:"/import",label:"データ取込"}]}].map(i=>{const c=i.key===t,p=i.items.map(u=>`<a href="${u.path}" data-link="${u.path}" class="snav-sub${e===u.path?" active":""}">${u.label}</a>`).join("");return`<div class="snav-group${c?" open":""}">
      <button class="snav-group-btn" type="button" data-snav-group="${i.key}">
        <span>${i.icon}</span><span class="snav-group-label">${i.label}</span><span class="snav-arrow">›</span>
      </button>
      <div class="snav-items">${p}</div>
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
  `}function om(){if(wn())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${ls()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/procurement":"調達計画","/brewing-process":"醸造工程","/changelog":"機能一覧・更新履歴","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",s=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?mc(a.masterStats.customers,a.pickerQuery):od(a.masterStats.products,a.pickerQuery):"",r=a.globalSearchOpen?uc(a.globalQuery,em()):"",i=a.user?`<span class="app-header-user">${a.user.email}</span>
       <button class="button secondary small" type="button" data-action="auth-logout">ログアウト</button>`:a.authSkipped?'<span class="app-header-user">デモモード</span>':"";return`
    <div class="shell-v2">
      <header class="app-header">
        <div class="app-header-left">${`
    <button class="sidebar-hamburger" type="button" data-action="sidebar-open" aria-label="メニュー">☰</button>
    ${t?'<span class="app-brand-name">酒仙i クラウド</span>':`<span class="app-page-title">${n}</span>`}
  `}</div>
        <div class="app-header-right">
          <button class="button secondary small" type="button" data-action="global-search-open">検索 <kbd>Ctrl+K</kbd></button>
          <button class="button secondary small" type="button" data-action="share-page" title="このページのURLを共有">🔗</button>
          ${i}
        </div>
      </header>
      ${am()}
      <div class="shell-body">
        ${sm()}
        <main class="main-v2">
          <div class="view ${a.actionLoading?"is-busy":""}">${ls()}</div>
          <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
        </main>
      </div>
      ${s}
      ${r}
    </div>
  `}async function rm(){a.actionLoading=!0,A();try{const{fetchSalesSummary:e}=await I(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>j);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,A()}}async function im(e){a.actionLoading=!0,A();try{a.invoiceRecords=await Pt(e)}finally{a.actionLoading=!1,A()}}async function Ca(e){a.actionLoading=!0,A();try{a.customerLedger=await Xa(e)}finally{a.actionLoading=!1,A()}}function Ne(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,n)=>{const s=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:s,unitPrice:r,amount:s*r}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function We(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function lm(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,A()}),e.querySelectorAll("[data-action='global-search-close']").forEach(o=>{o.addEventListener("click",l=>{o.classList.contains("global-search")&&l.target instanceof HTMLElement&&!l.target.classList.contains("global-search")||(Et(),A())})}),e.querySelector("#global-search-input")?.addEventListener("input",o=>{a.globalQuery=o.target.value,A()}),e.querySelectorAll("[data-action='global-nav']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.path;l&&(Et(),ea(l))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{tm()}),e.querySelectorAll("[data-jikomi-tab]").forEach(o=>{o.addEventListener("click",()=>{a.jikomiView=o.dataset.jikomiTab,A()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const o=e.querySelector("#auth-email")?.value.trim()??"",l=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,A(),Jo(o,l).then(async d=>{a.user=d,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:h}=await I(async()=>{const{fetchMyProfile:w,recordAudit:f}=await Promise.resolve().then(()=>j);return{fetchMyProfile:w,recordAudit:f}},void 0);a.myProfile=await m(d.email),await h({action:"sign_in",userEmail:d.email}),A()}).catch(async d=>{try{const m=await $n(o,l);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:h}=await I(async()=>{const{fetchMyProfile:w}=await Promise.resolve().then(()=>j);return{fetchMyProfile:w}},void 0);a.myProfile=await h(m.email)}catch{a.authError=d instanceof Error?d.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,A()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,A()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{Ko().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,A()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(o=>{o.addEventListener("click",()=>{a.sidebarOpen=!1,A()})}),e.querySelectorAll("[data-snav-group]").forEach(o=>{o.addEventListener("click",()=>{o.closest(".snav-group")?.classList.toggle("open")})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let o=0;t.addEventListener("touchstart",l=>{o=l.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",l=>{l.changedTouches[0].clientX-o<-60&&(a.sidebarOpen=!1,A())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id??"";a.dismissedAnnouncements.add(l),A()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='share-page']")?.addEventListener("click",async()=>{const o=window.location.href,l=document.title;if(navigator.share)try{await navigator.share({url:o,title:l})}catch{}else try{await navigator.clipboard.writeText(o),F("URLをコピーしました","success")}catch{F("コピーに失敗しました","error")}}),e.querySelectorAll("[data-link]").forEach(o=>{o.addEventListener("click",l=>{l.preventDefault(),ea(o.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async o=>{o.preventDefault();const l=e.querySelector("#fr-title")?.value??"",d=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",h=e.querySelector("#fr-result");if(!l.trim())return;const w=await Ps(l,d,m);if(h&&(h.textContent=w?"送信しました":"送信に失敗しました",h.className=`fr-result ${w?"success":"error"}`),w){const f=e.querySelector("#feature-request-form");f&&f.reset()}}),e.querySelectorAll("[data-period]").forEach(o=>{o.addEventListener("click",()=>{a.salesPeriod=o.dataset.period,A()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const o=e.querySelector("#range-start")?.value??"",l=e.querySelector("#range-end")?.value??"";o&&l&&(a.customRange={start:o,end:l},a.salesPeriod="custom",A())}),e.querySelectorAll("[data-edit-customer]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.editCustomer??"",d=a.masterStats?.customers.find(h=>h.id===l);if(!d)return;const m=document.createElement("div");m.innerHTML=Uc(d),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async h=>{h.preventDefault();const w=document.getElementById("edit-result"),f=document.getElementById("ec-trade-type")?.value||null,x=await Es(l,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,trade_type:f,manual_override:!0});w&&(w.textContent=x?"保存しました":"保存に失敗",w.className=`fr-result ${x?"success":"error"}`),x&&(document.getElementById("edit-modal")?.remove(),lt())})})}),e.querySelectorAll("[data-edit-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.editProduct??"",d=a.masterStats?.products.find(h=>h.id===l);if(!d)return;const m=document.createElement("div");m.innerHTML=Yc(d),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async h=>{h.preventDefault();const w=document.getElementById("edit-result"),f=await As(l,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});w&&(w.textContent=f?"保存しました":"保存に失敗",w.className=`fr-result ${f?"success":"error"}`),f&&(document.getElementById("edit-modal")?.remove(),lt())})})}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=oa(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,A()}),e.querySelectorAll("[data-open-quote]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.openQuote,d=await eo(l);if(!d){F("見積の読み込みに失敗しました","error");return}a.quoteState={id:d.id,quoteNo:d.quote_no,quoteDate:d.quote_date,validUntil:d.valid_until??"",customerCode:d.legacy_customer_code??"",customerName:d.customer_name,customerAddress:d.customer_address,subject:d.subject,lines:d.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:d.remarks,taxRate:d.tax_rate,deliveryDate:d.delivery_date,paymentTerms:d.payment_terms,deliveryPlace:d.delivery_place,templateType:d.template_type??"sake",previewMode:!1},a.quoteEditId=l,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,A()})}),e.querySelectorAll("[data-delete-quote]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.deleteQuote,d=o.dataset.quoteNo??l;if(!await Ee(`見積 ${d} を削除しますか？`))return;await ds("quotes",l)?(a.quoteList=a.quoteList.filter(w=>w.id!==l),F("削除しました","success"),A()):F("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,A(),pn().then(o=>{a.quoteList=o,a.quoteListLoading=!1,A()})}),e.querySelectorAll("[name='q-template']").forEach(o=>{o.addEventListener("change",()=>{a.quoteState.templateType=o.value,A()})});function n(o){return(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function s(o){return o.length?o.map(l=>`<button class="search-item" type="button" data-select-customer="${n(l.code)}" data-cust-name="${n(l.name)}" data-cust-addr="${n(l.address1||"")}"><span class="mono">${n(l.code)}</span><span style="font-size:13px;font-weight:600;">${n(l.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function r(o){o.querySelectorAll("[data-select-customer]").forEach(l=>{l.addEventListener("click",async()=>{const d=l.dataset.selectCustomer??"";a.quoteState.customerCode=d,a.quoteState.customerName=l.dataset.custName??"",a.quoteState.customerAddress=l.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),o.remove(),a.quotePricing=await Ia(a.masterStats?.customers??[],d),A()})})}function i(o){const l=e.querySelector("#q-cust-search")?.closest(".form-row");if(!l)return;let d=document.getElementById("cust-search-results");d||(d=document.createElement("div"),d.id="cust-search-results",d.className="search-results",l.after(d));const m=a.masterStats?.customers??[],h=o.trim().toLowerCase(),w=h.length===0?m:m.filter(f=>f.name.includes(o)||f.kanaName.includes(o)||f.code.includes(o)||f.name.toLowerCase().includes(h)||f.kanaName.toLowerCase().includes(h));d.innerHTML=s(w),r(d)}function c(o,l){return o.length?o.map(d=>{const m=l?an(d,l):{price:d.salePrice||0,label:"卸価格"},h=d.listPrice||0,w=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${n(d.code)}" data-prod-name="${n(d.name)}" data-prod-price="${m.price}" data-prod-retail="${h}" data-prod-jan="${n(d.janCode??"")}" data-prod-unit="${n(d.unit)}" data-prod-case="${d.caseQty??""}"><span class="mono">${n(d.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${n(d.name)}</span><span class="numeric"${w?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${n(m.label)})</small>${h?`　定価 ¥${h.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function p(o){o.querySelectorAll("[data-add-product]").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.addProduct??"",m=l.dataset.prodName??"",h=parseInt(l.dataset.prodPrice??"0"),w=parseInt(l.dataset.prodRetail??"0")||null,f=l.dataset.prodJan??"",x=l.dataset.prodUnit||"本",k=l.dataset.prodCase??"",L=k?parseInt(k):null;a.quoteState.lines.push({productCode:d,productName:m,janCode:f,caseQty:L,quantity:1,unit:x,unitPrice:h,retailPrice:w,amount:h}),a.quoteProductQuery="";const q=e.querySelector("#q-prod-search");q&&(q.value=""),A()})})}function u(o){const l=e.querySelector("#q-prod-search")?.closest(".form-row");if(!l)return;let d=document.getElementById("prod-search-results");if(d||(d=document.createElement("div"),d.id="prod-search-results",d.className="search-results",l.after(d)),!a.masterStats){d.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,h=o.trim().toLowerCase(),w=h.length===0?m:m.filter(f=>f.name.includes(o)||f.kanaName.includes(o)||f.code.includes(o)||f.name.toLowerCase().includes(h)||f.kanaName.toLowerCase().includes(h));d.innerHTML=c(w,a.quotePricing),p(d)}function y(o,l){let d=null;function m(){d||(d=h=>{const w=document.getElementById(l);if(!w){document.removeEventListener("touchstart",d),document.removeEventListener("mousedown",d),d=null;return}o.contains(h.target)||w.contains(h.target)||(w.remove(),document.removeEventListener("touchstart",d),document.removeEventListener("mousedown",d),d=null)},document.addEventListener("touchstart",d,{passive:!0}),document.addEventListener("mousedown",d))}return m}(function(){const o=e.querySelector("#q-cust-search");if(!o)return;const l=y(o,"cust-search-results");o.addEventListener("focus",()=>{i(o.value),l()}),o.addEventListener("compositionend",()=>{a.quoteCustomerQuery=o.value,i(o.value)}),o.addEventListener("input",d=>{d.isComposing||(a.quoteCustomerQuery=o.value,i(o.value))}),o.value&&i(o.value)})(),(function(){const o=e.querySelector("#q-prod-search");if(!o)return;const l=y(o,"prod-search-results");o.addEventListener("focus",()=>{u(o.value),l()}),o.addEventListener("compositionend",()=>{a.quoteProductQuery=o.value,u(o.value)}),o.addEventListener("input",d=>{d.isComposing||(a.quoteProductQuery=o.value,u(o.value))}),o.value&&u(o.value)})(),e.querySelectorAll("[data-select-customer]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.selectCustomer??"";a.quoteState.customerCode=l,a.quoteState.customerName=o.dataset.custName??"",a.quoteState.customerAddress=o.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await Ia(a.masterStats?.customers??[],l),A()})}),e.querySelector("#q-price-type")?.addEventListener("change",o=>{const l=o.target.value;a.quoteState.manualPriceType=l,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:l}:a.quotePricing={priceType:l,priceGroup:"",individualPrices:new Map},A()}),e.querySelectorAll("[data-add-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.addProduct??"",d=o.dataset.prodName??"",m=parseInt(o.dataset.prodPrice??"0"),h=parseInt(o.dataset.prodRetail??"0")||null,w=o.dataset.prodJan??"",f=o.dataset.prodUnit||"本",x=o.dataset.prodCase??"",k=x?parseInt(x):null;a.quoteState.lines.push({productCode:l,productName:d,janCode:w,caseQty:k,quantity:1,unit:f,unitPrice:m,retailPrice:h,amount:m}),a.quoteProductQuery="",A()})}),(()=>{const o=e.querySelector("#q-prospect-search");if(!o)return;const l=y(o,"q-prospect-results");function d(m){let h=document.getElementById("q-prospect-results");if(!h)return;const w=m.trim(),f=w.length===0?a.prospects.slice(0,8):a.prospects.filter(x=>x.companyName.includes(w)||(x.contactName??"").includes(w)).slice(0,8);if(f.length===0){h.innerHTML="";return}h.className="search-results",h.innerHTML=f.map(x=>`<button class="search-item" type="button" data-select-prospect="${x.id}" data-prospect-name="${n(x.companyName)}" data-prospect-addr="${n(x.address??"")}"><span style="font-size:13px;font-weight:600;">${n(x.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${n(x.contactName??"")} ${x.address?"· "+x.address.slice(0,20):""}</span></button>`).join(""),h.querySelectorAll("[data-select-prospect]").forEach(x=>{x.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=x.dataset.prospectName??"",a.quoteState.customerAddress=x.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=x.dataset.selectProspect??"";const k=a.quoteState.manualPriceType??"";a.quotePricing={priceType:k,priceGroup:"",individualPrices:new Map},o.value="",h&&(h.innerHTML=""),A()})})}o.addEventListener("focus",()=>{d(o.value),l()}),o.addEventListener("input",m=>{m.isComposing||d(o.value)}),o.addEventListener("compositionend",()=>d(o.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const o=e.querySelector("#q-prospect-search")?.value.trim()??"",l=document.createElement("div");l.className="modal-backdrop",l.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",l.innerHTML=`
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
    `,document.body.appendChild(l),l.querySelector("#pq-company")?.focus();const d=()=>l.remove();l.addEventListener("click",m=>{m.target===l&&d()}),l.querySelector("#prospect-quick-close")?.addEventListener("click",d),l.querySelector("#prospect-quick-close2")?.addEventListener("click",d),l.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const m=(l.querySelector("#pq-company")?.value??"").trim();if(!m){F("会社名は必須です","warning");return}const h={id:crypto.randomUUID(),companyName:m,contactName:l.querySelector("#pq-contact")?.value.trim()||void 0,address:l.querySelector("#pq-address")?.value.trim()||void 0,phone:l.querySelector("#pq-phone")?.value.trim()||void 0,note:l.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:w,fetchProspects:f}=await I(async()=>{const{saveProspect:L,fetchProspects:q}=await Promise.resolve().then(()=>j);return{saveProspect:L,fetchProspects:q}},void 0),x=await w(h);if(!x){F("登録失敗","error");return}a.prospects=await f(),a.quoteState.customerCode="",a.quoteState.customerName=x.companyName,a.quoteState.customerAddress=x.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=x.id;const k=a.quoteState.manualPriceType??"";a.quotePricing={priceType:k,priceGroup:"",individualPrices:new Map},d(),F(`${x.companyName} を見込み顧客として登録しました`,"success"),A()})});function v(){Rt(a.quoteState);const o=e.querySelector("#q-preview-scaler");if(!o)return;o.innerHTML=mo(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const l=o.querySelector(".q-preview-doc"),d=o.parentElement?.clientWidth??0,m=l?.offsetWidth??0;if(d>0&&m>0&&m>d-24){const h=(d-24)/m;o.style.transform=`scale(${h})`,o.style.transformOrigin="top left",o.style.height=`${((l?.offsetHeight??0)+48)*h}px`}else o.style.transform="",o.style.height=""}for(const o of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${o}`)?.addEventListener("input",v);e.querySelector("#q-remarks")?.addEventListener("input",v),e.querySelectorAll(".qty-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.quantity=parseFloat(o.value)||0,d.amount=d.quantity*d.unitPrice,v())})}),e.querySelectorAll(".price-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.unitPrice=parseInt(o.value)||0,d.amount=d.quantity*d.unitPrice,v())})}),e.querySelectorAll(".jan-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.janCode=o.value,v())})}),e.querySelectorAll(".case-qty-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.caseQty=o.value?parseInt(o.value):null,v())})}),e.querySelectorAll(".retail-price-input").forEach(o=>{o.addEventListener("change",()=>{const l=parseInt(o.dataset.lineIdx??"0"),d=a.quoteState.lines[l];d&&(d.retailPrice=o.value?parseInt(o.value):null,v())})}),e.querySelectorAll("[data-remove-line]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.removeLine??"0");a.quoteState.lines.splice(l,1),A()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{Rt(a.quoteState),a.quoteState.previewMode=!0,A()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,A()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="生成中…",a.quoteState.previewMode||Rt(a.quoteState);try{await Ec(a.quoteState,a.quoteCompanySettings)}finally{l.disabled=!1,l.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{Rt(a.quoteState);const o=a.quoteState,l=o.lines.reduce((x,k)=>x+k.amount,0),d=Math.round(l*o.taxRate/100),m=l+d;if(!o.quoteNo)try{const{supabaseRpc:x}=await I(async()=>{const{supabaseRpc:L}=await Promise.resolve().then(()=>te);return{supabaseRpc:L}},void 0),k=await x("generate_quote_no",{});o.quoteNo=k??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{o.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const h=new Date().toISOString().slice(0,10),w=o.templateType==="sake"||o.templateType==="standard"?o.templateType:"sake",f={quote_no:o.quoteNo,quote_date:o.quoteDate||h,valid_until:o.validUntil||null,legacy_customer_code:o.customerCode||null,customer_name:o.customerName||"",customer_address:o.customerAddress||"",subject:o.subject||"",template_type:w,subtotal:l,tax_amount:d,total_amount:m,tax_rate:o.taxRate||10,remarks:o.remarks||"",delivery_date:o.deliveryDate||"",payment_terms:o.paymentTerms||"",delivery_place:o.deliveryPlace||"",updated_at:new Date().toISOString()};try{let x=o.id;if(o.id){const k=await fetch(`${ve}/rest/v1/quotes?id=eq.${encodeURIComponent(o.id)}`,{method:"PATCH",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(f)});if(!k.ok){const L=await k.text();throw new Error(`quotes更新失敗 ${k.status}: ${L}`)}await fetch(`${ve}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(o.id)}`,{method:"DELETE",headers:{apikey:ce,Authorization:`Bearer ${ce}`}})}else{const k=await fetch(`${ve}/rest/v1/quotes`,{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(f)});if(!k.ok){const q=await k.text();throw new Error(`quotes作成失敗 ${k.status}: ${q}`)}const L=await k.json();if(!L?.[0]?.id)throw new Error("IDが返りませんでした");x=L[0].id,o.id=x}if(o.lines.length>0){const k=o.lines.map((q,N)=>({quote_id:x,line_no:N+1,legacy_product_code:q.productCode||null,product_name:q.productName,jan_code:q.janCode||null,case_qty:q.caseQty??null,quantity:q.quantity,unit:q.unit,unit_price:q.unitPrice,retail_price:q.retailPrice??null,amount:q.amount})),L=await fetch(`${ve}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(k)});if(!L.ok){const q=await L.text();throw new Error(`明細保存失敗 ${L.status}: ${q}`)}}F(`見積 ${o.quoteNo} を保存しました`,"success"),A()}catch(x){console.error("[save-quote]",x),F(`保存失敗: ${String(x).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const o=d=>document.getElementById(d)?.value??"",l={...a.quoteCompanySettings,companyName:o("qs-company-name"),companyPostal:o("qs-company-postal"),companyAddress1:o("qs-company-addr1"),companyAddress2:o("qs-company-addr2"),companyTel:o("qs-company-tel"),companyFax:o("qs-company-fax"),companyEmail:o("qs-company-email"),companyRegistrationNo:o("qs-company-regno"),bankName:o("qs-bank-name"),bankBranch:o("qs-bank-branch"),bankAccountType:o("qs-bank-type"),bankAccountNo:o("qs-bank-no"),bankAccountHolder:o("qs-bank-holder"),defaultPaymentTerms:o("qs-payment-terms"),defaultHeaderNote:o("qs-header-note"),defaultFooterNote:o("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};Xe(l),st("quote_company",l),a.quoteCompanySettings=l,F("設定を保存しました","success"),A()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),A()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",o=>{const l=o.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:l},Xe(a.quoteCompanySettings),A()}),e.querySelector("#qs-seal-file")?.addEventListener("change",o=>{const l=o.target.files?.[0];if(!l)return;const d=new FileReader;d.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:d.result},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),A()},d.readAsDataURL(l)}),e.querySelector("#qs-seal-size")?.addEventListener("input",o=>{const l=parseInt(o.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:l},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),A()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),A()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.month;l&&(a.demandForecast.calendarMonth=l,A())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.segment;a.demandForecast.selectedSegment=l,A()})}),e.querySelectorAll("[data-demand-tab]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.demandTab;if(l){if(a.demandTab=l,l==="calendar"){const d=new Date().toISOString().slice(0,10);d.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=d)}A()}})});function g(o){const l=a.demandAnalysis,d=a.safetyStockParams;if(!l||d.length===0)return[];const[m,h]=o.split("-"),w=`${parseInt(m)-1}-${h}`,f=l.months.filter(x=>x<o).slice(-3);return d.map(x=>{const k=x.productionType==="make_to_order",L=l.matrix[x.productCode]?.[w]??0,q=f.map(B=>l.matrix[x.productCode]?.[B]??0),N=q.length>0?q.reduce((B,O)=>B+O,0)/q.length:x.avgMonthlyDemand,R=k?0:L>0?Math.ceil(L):Math.ceil(N),M=k?0:Math.ceil(x.safetyStockQty),z=Math.max(0,R+M);return{id:"",yearMonth:o,productCode:x.productCode,productName:x.productName,demandForecast:R,safetyStockTarget:M,openingStock:0,requiredProduction:z,plannedQty:k?0:z,actualQty:0,status:"draft",productionType:x.productionType??"monthly",notes:""}})}e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async o=>{const l=parseInt(o.target.value)||3;a.demandYearsBack=l,a.demandAnalysis=null;const{fetchDemandAnalysis:d}=await I(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>j);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await d(l*12),A()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",d=parseInt(o.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==l)return m;const h=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,w=d/30,f=Math.ceil(h*m.demandStdDev*Math.sqrt(w)),x=Math.ceil(m.avgMonthlyDemand*w+f);return{...m,leadTimeDays:d,safetyStockQty:f,reorderPoint:x}}),A()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",d=parseFloat(o.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==l)return m;const h=d>=.99?2.33:d>=.97?1.88:d>=.95?1.65:d>=.9?1.28:1.04,w=m.leadTimeDays/30,f=Math.ceil(h*m.demandStdDev*Math.sqrt(w)),x=Math.ceil(m.avgMonthlyDemand*w+f);return{...m,serviceLevel:d,safetyStockQty:f,reorderPoint:x}}),A()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async o=>{if(a.safetyStockParams.length===0)return;const l=o.currentTarget;l.disabled=!0,l.textContent="保存中…";const{saveSafetyStockParamsBulk:d}=await I(async()=>{const{saveSafetyStockParamsBulk:h}=await Promise.resolve().then(()=>j);return{saveSafetyStockParamsBulk:h}},void 0),m=await d(a.safetyStockParams);l.disabled=!1,l.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{l.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const o=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),l=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(d=>{const m=o>=.99?2.33:o>=.97?1.88:o>=.95?1.65:o>=.9?1.28:1.04,h=l/30,w=Math.ceil(m*d.demandStdDev*Math.sqrt(h)),f=Math.ceil(d.avgMonthlyDemand*h+w);return{...d,serviceLevel:o,leadTimeDays:l,safetyStockQty:w,reorderPoint:f}}),A()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",d=o.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===l?{...m,productionType:d}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async o=>{const l=o.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarShifts=Zt(l,1,0);const{fetchProductionPlan:d}=await I(async()=>{const{fetchProductionPlan:h}=await Promise.resolve().then(()=>j);return{fetchProductionPlan:h}},void 0),m=await d(l);a.productionPlan=m.length>0?m:g(l),Ie(a.calendarShifts,a.productionPlan.filter(h=>!a.calendarLabelExcluded.has(h.productCode)),a.calendarCapacity),A()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(o=>{o.addEventListener("click",()=>{a.demandPlanTypeFilter=o.dataset.filter??"all",A()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.sortCol??"";a.demandSort?.column===l?a.demandSort=a.demandSort.dir==="desc"?{column:l,dir:"asc"}:null:a.demandSort={column:l,dir:"desc"},A()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=g(a.demandPlanYearMonth),A()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",o=>{const l=o.target.files?.[0];if(!l)return;const d=new FileReader;d.onload=async()=>{const{parseCSV:m}=await I(async()=>{const{parseCSV:M}=await Promise.resolve().then(()=>hp);return{parseCSV:M}},void 0),{columns:h,rows:w}=m(d.result),f=document.getElementById("csv-import-status"),x=h.find(M=>/商品コード|product_code|code|コード/i.test(M)),k=h.find(M=>/在庫|stock|期首|opening/i.test(M)),L=h.find(M=>/計画|plan|planned|生産/i.test(M));if(!x){f&&(f.style.display="block",f.style.background="rgba(197,61,61,0.1)",f.style.color="#c53d3d",f.textContent=`エラー: 商品コード列が見つかりません。列名: ${h.join(", ")}`);return}let q=0,N=0,R=0;for(const M of w){const z=(M[x]??"").trim();if(!z)continue;const B=a.productionPlan.find(O=>O.productCode===z);if(B){if(q++,k&&M[k]!==void 0&&M[k]!==""){const O=parseFloat(M[k])||0;B.openingStock=O,B.requiredProduction=Math.max(0,B.demandForecast+B.safetyStockTarget-O),B.plannedQty>0&&!L&&(B.plannedQty=B.requiredProduction),N++}L&&M[L]!==void 0&&M[L]!==""&&(B.plannedQty=parseFloat(M[L])||0,R++)}}f&&(f.style.display="block",q===0?(f.style.background="rgba(183,121,31,0.1)",f.style.color="#b7791f",f.textContent=`一致する商品コードが見つかりませんでした（CSV: ${w.length}行）`):(f.style.background="rgba(47,133,90,0.1)",f.style.color="#2f855a",f.textContent=`${q}商品に反映: 在庫${N}件${R>0?` / 計画${R}件`:""} 更新`),setTimeout(()=>{f.style.display="none"},5e3)),A()},d.readAsText(l,"UTF-8"),o.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(d=>{const m=d.dataset.code??"",h=a.productionPlan.find(w=>w.productCode===m);h&&(h.plannedQty=parseFloat(d.value)||0)});const{saveProductionPlan:o}=await I(async()=>{const{saveProductionPlan:d}=await Promise.resolve().then(()=>j);return{saveProductionPlan:d}},void 0);await Promise.all(a.productionPlan.map(d=>o(d)));const{fetchProductionPlan:l}=await I(async()=>{const{fetchProductionPlan:d}=await Promise.resolve().then(()=>j);return{fetchProductionPlan:d}},void 0);a.productionPlan=await l(a.demandPlanYearMonth),A()}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.date??"",d=a.calendarShifts.find(m=>m.date===l);d&&(d.confirmed?a.calendarSelectedDate=a.calendarSelectedDate===l?null:l:d.partTimers>0||d.employees>0?(d.partTimers=0,d.employees=0,Ie(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=l):(d.partTimers=1,d.employees=0,Ie(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=l),A())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="保存中…";const{saveLabelExclusions:d}=await I(async()=>{const{saveLabelExclusions:w}=await Promise.resolve().then(()=>j);return{saveLabelExclusions:w}},void 0),m=[...a.calendarLabelExcluded],h=await d(a.demandPlanYearMonth,m);l.disabled=!1,l.textContent=h?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{l.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.code??"",m=document.getElementById("cal-label-list")?.scrollTop??0;o.checked?a.calendarLabelExcluded.delete(l):a.calendarLabelExcluded.add(l);const h=a.productionPlan.filter(w=>!a.calendarLabelExcluded.has(w.productCode));Ie(a.calendarShifts,h,a.calendarCapacity),A(),requestAnimationFrame(()=>{const w=document.getElementById("cal-label-list");w&&(w.scrollTop=m)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.type??"",m=document.getElementById("cal-label-list")?.scrollTop??0,h=a.productionPlan.filter(f=>f.productionType===l);if(o.checked)for(const f of h)a.calendarLabelExcluded.delete(f.productCode);else for(const f of h)a.calendarLabelExcluded.add(f.productCode);const w=a.productionPlan.filter(f=>!a.calendarLabelExcluded.has(f.productCode));Ie(a.calendarShifts,w,a.calendarCapacity),A(),requestAnimationFrame(()=>{const f=document.getElementById("cal-label-list");f&&(f.scrollTop=m)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||pt;a.calendarCapacity.partCapacity=l;const d=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ie(a.calendarShifts,d,a.calendarCapacity),A()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||ut;a.calendarCapacity.empCapacity=l;const d=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ie(a.calendarShifts,d,a.calendarCapacity),A()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.date??"",d=parseInt(o.value)||0,m=a.calendarShifts.find(h=>h.date===l);m&&(m.partTimers=d),A()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.date??"",d=parseInt(o.value)||0,m=a.calendarShifts.find(h=>h.date===l);m&&(m.employees=d),A()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async o=>{const l=o.target.value;if(!l)return;a.demandPlanYearMonth=l,a.calendarSelectedDate=null,a.calendarShifts=Zt(l,1,0);const{fetchProductionPlan:d,fetchLabelExclusions:m}=await I(async()=>{const{fetchProductionPlan:f,fetchLabelExclusions:x}=await Promise.resolve().then(()=>j);return{fetchProductionPlan:f,fetchLabelExclusions:x}},void 0),[h,w]=await Promise.all([d(l),m(l)]);a.productionPlan=h.length>0?h:g(l),a.calendarLabelExcluded=new Set(w),Ie(a.calendarShifts,a.productionPlan.filter(f=>!a.calendarLabelExcluded.has(f.productCode)),a.calendarCapacity),A()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||0;a.calendarDefaultPart=l;for(const d of a.calendarShifts)if(!d.confirmed){const m=new Date(d.date).getDay()===0||new Date(d.date).getDay()===6;d.partTimers=m?0:l}A()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",o=>{const l=parseInt(o.target.value)||0;a.calendarDefaultEmp=l;for(const d of a.calendarShifts)if(!d.confirmed){const m=new Date(d.date).getDay()===0||new Date(d.date).getDay()===6;d.employees=m?0:l}A()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=Zt(a.demandPlanYearMonth,1,0),Ie(a.calendarShifts,a.productionPlan.filter(o=>!a.calendarLabelExcluded.has(o.productCode)),a.calendarCapacity),A()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const o of a.calendarShifts)o.confirmed=!0;A()}),e.querySelectorAll("[data-action='select-month']").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=l,A())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterArea=o.target.value,A())}),e.querySelector("#visit-filter-score")?.addEventListener("change",o=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(o.target.value)||0,A())}),e.querySelector("[data-action='refresh-analytics']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="更新中…";try{const{supabaseRpc:d}=await I(async()=>{const{supabaseRpc:m}=await Promise.resolve().then(()=>te);return{supabaseRpc:m}},void 0);await d("refresh_analytics",{}),a.visitPlanner=null,a.shipmentCalendarData=null,F("分析データを更新しました","success"),A()}catch(d){console.error("[refresh-analytics]",d),F("更新に失敗しました","error"),l.disabled=!1,l.textContent="⟳ データ更新"}}),e.querySelectorAll("[data-sort-col]").forEach(o=>{o.addEventListener("click",l=>{const d=o.dataset.sortCol??"",m=l.shiftKey;a.route==="/product-power"?a.productSortState=mt(a.productSortState,d,m):a.route==="/customer-efficiency"?a.customerSortState=mt(a.customerSortState,d,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=mt(a.dashboardSortState,d,m):a.route==="/master"?a.masterSortState=mt(a.masterSortState,d,m):a.route==="/analytics"&&(a.analyticsSortState=mt(a.analyticsSortState,d,m)),A()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(o=>{o.addEventListener("click",async()=>{const l=parseInt(o.dataset.year??"",10);l&&(a.customerEfficiencyYear=l,a.customerEfficiency=await rt(l,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),A())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async o=>{const l=parseInt(o.target.value,10);l&&(a.customerEfficiencyYear=l,a.customerEfficiency=await rt(l,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),A())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.groupby??"billing";a.customerEfficiencyGroupBy=l,a.customerEfficiency=await rt(a.customerEfficiencyYear,l,a.customerEfficiencyFiscalType),A()})}),e.querySelectorAll("[data-action='efficiency-fiscal-type']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.fiscalType??"jan";a.customerEfficiencyFiscalType=l,a.customerEfficiency=await rt(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,l),A()})}),e.querySelectorAll("[data-product-period]").forEach(o=>{o.addEventListener("click",()=>{a.productPeriod=o.dataset.productPeriod??"year",A()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const o=document.getElementById("pp-range-start")?.value??"",l=document.getElementById("pp-range-end")?.value??"";o&&l&&(a.productCustomStart=o,a.productCustomEnd=l,a.productPeriod="custom",A())}),e.querySelectorAll("[data-product-filter]").forEach(o=>{o.addEventListener("click",()=>{a.productFilter=o.dataset.productFilter??"all",A()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async o=>{const l=o.currentTarget;l.disabled=!0,l.textContent="更新中…",await lt(),l.disabled=!1,l.textContent="↻ 更新",F("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const o=e.querySelector("#sales-start")?.value??"",l=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:o,endDate:l},rm()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const o={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=o,a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,im(o)}),e.addEventListener("click",o=>{const l=o.target.closest("tr[data-doc-no]");if(!l)return;const d=l.dataset.docNo??"";if(a.route==="/"){a.invoiceSelectedDocNo=d,a.invoiceSelectedLines=null,navigateTo("/sales"),qa(d).then(m=>{a.invoiceSelectedDocNo===d&&(a.invoiceSelectedLines=m,A())});return}if(a.invoiceSelectedDocNo===d){a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,A();return}a.invoiceSelectedDocNo=d,a.invoiceSelectedLines=null,A(),qa(d).then(m=>{a.invoiceSelectedDocNo===d&&(a.invoiceSelectedLines=m,A())})});const $=e.querySelector("#ledger-customer-code"),E=e.querySelector("#ledger-cust-suggestions");if($&&E){const o=a.masterStats?.customers??[];$.addEventListener("input",()=>{const l=$.value.trim().toLowerCase();if(!l){E.style.display="none";return}const d=o.filter(m=>m.code.toLowerCase().includes(l)||m.name.toLowerCase().includes(l)||(m.kanaName??"").toLowerCase().includes(l)).slice(0,10);if(!d.length){E.style.display="none";return}E.innerHTML=d.map(m=>`<button class="search-item" type="button" data-ledger-cust="${m.code}"><span class="mono">${m.code}</span><span>${m.name}</span></button>`).join(""),E.style.display="block",E.querySelectorAll("[data-ledger-cust]").forEach(m=>{m.addEventListener("click",()=>{const h=m.dataset.ledgerCust??"";$.value=h,E.style.display="none",a.ledgerCustomerCode=h,Ca(h)})})}),$.addEventListener("keydown",l=>{if(l.key==="Enter"){E.style.display="none";const d=$.value.trim(),m=d.toLowerCase(),h=(a.masterStats?.customers??[]).filter(f=>f.code.toLowerCase()===m||f.name.toLowerCase()===m),w=h.length===1?h[0].code:d.toUpperCase();a.ledgerCustomerCode=w,Ca(w)}}),$.addEventListener("blur",()=>{setTimeout(()=>{E.style.display="none"},200)})}e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const o=e.querySelector("#ledger-customer-code")?.value.trim()??"",l=o.toLowerCase(),d=(a.masterStats?.customers??[]).filter(h=>h.code.toLowerCase()===l||h.name.toLowerCase()===l),m=d.length===1?d[0].code:o.toUpperCase();a.ledgerCustomerCode=m,Ca(m)}),e.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{a.masterTab=o.dataset.tab,a.masterFilter={...un},A()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",tradeType:e.querySelector("#master-trade-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},A()}),e.querySelector("#master-search")?.addEventListener("keydown",o=>{o.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.page);l>=1&&(a.masterFilter={...a.masterFilter,page:l},A())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.table;if(!l)return;a.rawSelectedTable=l,a.rawPage=1;const d=await Qt(l,1);a.rawRecords=d.records,a.rawTotalCount=d.total,A()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const o=await Qt(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,A()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const o=await Qt(a.rawSelectedTable,a.rawPage);a.rawRecords=o.records,a.rawTotalCount=o.total,A()}),e.querySelectorAll("[data-analytics-tab]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsTab=o.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:d}=await I(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}=await Promise.resolve().then(()=>j);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}},void 0);a.analyticsPeriodOptions=await d(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await l(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}A()})}),e.querySelectorAll("[data-analytics-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:l,fetchAvailablePeriods:d,fetchPeriodChartData:m,prevYearFilter:h}=await I(async()=>{const{fetchAnalyticsByPeriod:f,fetchAvailablePeriods:x,fetchPeriodChartData:k,prevYearFilter:L}=await Promise.resolve().then(()=>j);return{fetchAnalyticsByPeriod:f,fetchAvailablePeriods:x,fetchPeriodChartData:k,prevYearFilter:L}},void 0),w=o.dataset.analyticsPeriod;if(a.analyticsPeriod=w,a.analyticsDrilldown=null,w==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await d(a.analyticsTab,w),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const f=a.analyticsPeriodFilter,[x,k,L]=await Promise.all([l(a.analyticsTab,w,f),m(w,f),m(w,h(f))]);a.analyticsPeriodRows=x,a.analyticsPeriodChartData=k,a.analyticsPrevYearChartData=L}A()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async o=>{const{fetchAnalyticsByPeriod:l,fetchPeriodChartData:d,prevYearFilter:m}=await I(async()=>{const{fetchAnalyticsByPeriod:f,fetchPeriodChartData:x,prevYearFilter:k}=await Promise.resolve().then(()=>j);return{fetchAnalyticsByPeriod:f,fetchPeriodChartData:x,prevYearFilter:k}},void 0);a.analyticsPeriodFilter=o.target.value,a.analyticsDrilldown=null;const h=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:f}=await I(async()=>{const{fiscalYearToDateRange:z}=await Promise.resolve().then(()=>Vn);return{fiscalYearToDateRange:z}},void 0),x=parseInt(h),k=f(x);f(x-1);const L=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:q}=await I(async()=>{const{supabaseRpc:z}=await Promise.resolve().then(()=>te);return{supabaseRpc:z}},void 0),[N,R,M]=await Promise.all([q(L,{p_date_from:k.from,p_date_to:k.to}),d("yearly",h),d("yearly",String(x-1))]);a.analyticsPeriodRows=(N??[]).map(z=>({code:String(z.code??""),name:String(z.name??""),amount:Number(z.amount??0),quantity:Number(z.quantity??0),documents:Number(z.documents??0),volumeMl:Number(z.volume_ml??0)})),a.analyticsPeriodChartData=(R??[]).map(z=>({...z})),a.analyticsPrevYearChartData=(M??[]).map(z=>({...z}))}else{const[f,x,k]=await Promise.all([l(a.analyticsTab,a.analyticsPeriod,h),d(a.analyticsPeriod,h),d(a.analyticsPeriod,m(h))]);a.analyticsPeriodRows=f,a.analyticsPeriodChartData=x,a.analyticsPrevYearChartData=k}A()}),e.querySelectorAll("[data-fiscal-mode]").forEach(o=>{o.addEventListener("click",async()=>{if(a.analyticsFiscalMode=o.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:l}=await I(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>Vn);return{monthToFiscalYear:m}},void 0),d=new Set;for(const m of a.salesAnalytics.monthlySales)d.add(l(m.month));a.analyticsPeriodOptions=[...d].sort((m,h)=>h-m).map(String)}else{const{fetchAvailablePeriods:l}=await I(async()=>{const{fetchAvailablePeriods:d}=await Promise.resolve().then(()=>j);return{fetchAvailablePeriods:d}},void 0);a.analyticsPeriodOptions=await l(a.analyticsTab,"yearly")}A()})}),e.querySelectorAll("[data-chart-metric]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsChartMetric=o.dataset.chartMetric,A()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.analyticsDrilldown??"",d=o.dataset.drilldownName??l,m=a.analyticsTab,{fetchCustomerProductBreakdown:h,fetchProductCustomerBreakdown:w,fetchEntityMonthlySales:f,periodToDateRange:x}=await I(async()=>{const{fetchCustomerProductBreakdown:N,fetchProductCustomerBreakdown:R,fetchEntityMonthlySales:M,periodToDateRange:z}=await Promise.resolve().then(()=>j);return{fetchCustomerProductBreakdown:N,fetchProductCustomerBreakdown:R,fetchEntityMonthlySales:M,periodToDateRange:z}},void 0),k=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?x(a.analyticsPeriod,a.analyticsPeriodFilter):null,[L,q]=await Promise.all([f(l,m==="customers"?"customer":"product"),m==="customers"?h(l,k?.from,k?.to):w(l,k?.from,k?.to)]);a.analyticsDrilldown={tab:m,code:l,name:d,monthlySales:L,breakdownRows:q},A()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,A()}),e.querySelector("#staff-filter-input")?.addEventListener("input",o=>{a.analyticsStaffFilter=o.target.value,A()}),e.querySelectorAll("[data-staff-drilldown]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.staffDrilldown??"",d=o.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:h,periodToDateRange:w}=await I(async()=>{const{fetchStaffCustomerBreakdown:q,fetchStaffProductBreakdown:N,periodToDateRange:R}=await Promise.resolve().then(()=>j);return{fetchStaffCustomerBreakdown:q,fetchStaffProductBreakdown:N,periodToDateRange:R}},void 0),f=w(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),x=a.analyticsStaffDrilldown?.breakdownTab??"customers",[k,L]=await Promise.all([m(l,f?.from,f?.to),h(l,f?.from,f?.to)]);a.analyticsStaffDrilldown={code:l,name:d,breakdownTab:x,customerRows:k,productRows:L},A()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(o=>{o.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:o.dataset.staffBreakdownTab},A())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,A()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",o=>{a.analyticsTagFilter=o.target.value,A()}),e.querySelectorAll("[data-staff-period]").forEach(o=>{o.addEventListener("click",async()=>{const{fetchAvailablePeriods:l,fetchStaffTotalsByPeriod:d,periodToDateRange:m}=await I(async()=>{const{fetchAvailablePeriods:w,fetchStaffTotalsByPeriod:f,periodToDateRange:x}=await Promise.resolve().then(()=>j);return{fetchAvailablePeriods:w,fetchStaffTotalsByPeriod:f,periodToDateRange:x}},void 0),h=o.dataset.staffPeriod;if(a.analyticsStaffPeriod=h,a.analyticsStaffDrilldown=null,h==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await l("staff",h),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const w=m(h,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await d(w?.from,w?.to)}A()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async o=>{const{fetchStaffTotalsByPeriod:l,periodToDateRange:d}=await I(async()=>{const{fetchStaffTotalsByPeriod:h,periodToDateRange:w}=await Promise.resolve().then(()=>j);return{fetchStaffTotalsByPeriod:h,periodToDateRange:w}},void 0);a.analyticsStaffPeriodFilter=o.target.value;const m=d(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await l(m?.from,m?.to),a.analyticsStaffDrilldown=null,A()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Ne(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},A()}),e.querySelectorAll("[data-action='remove-line']").forEach(o=>{o.addEventListener("click",()=>{Ne(e);const l=parseInt(o.dataset.line??"0",10);a.invoiceForm.lines.splice(l,1),a.invoiceErrors=No(a.invoiceForm),A()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(o=>{o.addEventListener("click",()=>{Ne(e),Qu(parseInt(o.dataset.line??"0",10)),a.invoiceErrors={},A()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Wu(),A()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Ne(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,A()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(o=>{o.addEventListener("click",()=>{Ne(e);const l=parseInt(o.dataset.line??"0",10),d=a.invoiceForm.lines[l];a.pickerMode="product",a.pickerTargetLine=l,a.pickerQuery=d?d.productCode||d.productName:"",A()})}),e.querySelectorAll("[data-action='modal-close']").forEach(o=>{o.addEventListener("click",l=>{o.classList.contains("modal-backdrop")&&l.target instanceof HTMLElement&&!l.target.classList.contains("modal-backdrop")||(ia(),A())})}),e.querySelectorAll("[data-action='picker-select']").forEach(o=>{const l=async()=>{const d=o.dataset.code??"",m=o.dataset.name??"";if(a.pickerMode==="customer"){a.invoiceForm.customerCode=d,a.invoiceForm.customerName=m,delete a.invoiceErrors.customerCode;const h=a.masterStats?.customers.find(w=>w.code===d);a.invoicePriceGroup=h?.priceGroup||"",!a.invoicePriceGroup&&d&&(a.invoicePriceGroup=await Ma(d))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const h=a.invoiceForm.lines[a.pickerTargetLine];if(h){h.productCode=d,h.productName=m;const w=await Zs(a.invoicePriceGroup,d);w>0&&(h.unitPrice=w),h.amount=h.quantity*h.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}ia(),A()};o.addEventListener("click",l),o.addEventListener("keydown",d=>{d.key==="Enter"&&l()})}),e.querySelector("#modal-search")?.addEventListener("input",o=>{a.pickerQuery=o.target.value,A()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Io(),A()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Mo(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Ne(e),Gu(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await Ma(a.invoiceForm.customerCode)),A())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Ne(e),Xu(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,A())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(o=>{o.addEventListener("input",()=>{Ne(e),a.invoiceSavedDocNo=null;const l=o.dataset.field;(l==="quantity"||l==="unitPrice")&&A()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Ne(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const o=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=o.trim(),a.deliveryNote=null,a.actionLoading=!0,A(),!a.deliverySearchDocNo){F("伝票番号を入力してください","error"),a.actionLoading=!1,A();return}en(a.deliverySearchDocNo).then(l=>{a.deliveryNote=l,a.actionLoading=!1,A()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const o=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=o,a.billingSummary=null,a.actionLoading=!0,A(),tn(o).then(l=>{a.billingSummary=l,a.actionLoading=!1,A()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const o=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),l=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=o,a.taxMonth=l,a.taxDeclaration=null,a.taxVolume=null,a.actionLoading=!0,A(),Promise.all([sn(o,l),on(o,l)]).then(([d,m])=>{a.taxDeclaration=d,a.taxVolume=m,a.actionLoading=!1,A()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:o}=await I(async()=>{const{generateTaxXML:w}=await Promise.resolve().then(()=>j);return{generateTaxXML:w}},void 0),l=o(a.taxDeclaration),d=new Blob([l],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(d),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:o}=await I(async()=>{const{generateTaxCSV:w}=await Promise.resolve().then(()=>j);return{generateTaxCSV:w}},void 0),l=o(a.taxDeclaration),d=new Blob([l],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(d),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:o}=await I(async()=>{const{saveTaxDeclaration:l}=await Promise.resolve().then(()=>j);return{saveTaxDeclaration:l}},void 0);try{await o(a.taxDeclaration),F("下書き保存しました")}catch(l){F("保存に失敗: "+(l instanceof Error?l.message:String(l)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(o=>{o.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.taxRow),d=o.dataset.taxField,m=o.type==="number"?Number(o.value)||0:o.value,h=[...a.taxDeclaration.rows];h[l]={...h[l],[d]:m};const{recalculateTaxDeclaration:w}=await I(async()=>{const{recalculateTaxDeclaration:f}=await Promise.resolve().then(()=>j);return{recalculateTaxDeclaration:f}},void 0);a.taxDeclaration=w({...a.taxDeclaration,rows:h}),A()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.dedRow),d=o.dataset.dedField,m=o.type==="number"?Number(o.value)||0:o.value,h=[...a.taxDeclaration.deductions];h[l]={...h[l],[d]:m},a.taxDeclaration={...a.taxDeclaration,deductions:h},A()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(o=>{o.addEventListener("change",()=>{if(!a.taxDeclaration)return;const l=o.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[l]:o.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:o,TAX_RATE_CATEGORIES:l}=await I(async()=>{const{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:w}=await Promise.resolve().then(()=>j);return{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:w}},void 0),d=l[0],m={taxCategory:d.code,taxCategoryName:d.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:d.taxRatePerLiter,taxAmount:0};a.taxDeclaration=o({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),A()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(o=>{o.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.taxRow),{recalculateTaxDeclaration:d}=await I(async()=>{const{recalculateTaxDeclaration:h}=await Promise.resolve().then(()=>j);return{recalculateTaxDeclaration:h}},void 0),m=a.taxDeclaration.rows.filter((h,w)=>w!==l);a.taxDeclaration=d({...a.taxDeclaration,rows:m}),A()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const o={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,o]},A()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(o=>{o.addEventListener("click",()=>{if(!a.taxDeclaration)return;const l=Number(o.dataset.dedRow),d=a.taxDeclaration.deductions.filter((m,h)=>h!==l);a.taxDeclaration={...a.taxDeclaration,deductions:d},A()})}),e.querySelectorAll("[data-store-tab]").forEach(o=>{o.addEventListener("click",()=>{a.storeTab=o.dataset.storeTab,A()})}),e.querySelectorAll("[data-import-entity]").forEach(o=>{o.addEventListener("click",()=>{a.importEntity=o.dataset.importEntity,a.importPreview=null,a.importResult=null,A()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const o=ko(a.importEntity),l=new Blob([o],{type:"text/csv;charset=utf-8"}),d=URL.createObjectURL(l),m=document.createElement("a");m.href=d,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(d)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const l=e.querySelector("#import-file")?.files?.[0];if(!l){F("CSVファイルを選択してください","warning");return}const d=new FileReader;d.onload=()=>{const m=String(d.result??""),{columns:h,rows:w}=_o(m);a.importPreview=So(a.importEntity,h,w),a.importResult=null,A()},d.readAsText(l,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,A()}),e.querySelectorAll("[data-print-template]").forEach(o=>{o.addEventListener("click",()=>{a.printTemplate=o.dataset.printTemplate,A()})}),e.querySelectorAll("[data-print-field]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.printField;let d=o.value;(l==="taxRate"||l==="previousBalance"||l==="paymentAmount")&&(d=Number(o.value)||0),a.printData={...a.printData,[l]:d},A()})}),e.querySelectorAll("[data-print-opt]").forEach(o=>{const l=()=>{const d=o.dataset.printOpt;let m;o.type==="checkbox"?m=o.checked:d==="copies"?m=Number(o.value)||1:d==="overlayOpacity"||d==="calibrationOffsetX"||d==="calibrationOffsetY"?m=Number(o.value)||0:m=o.value,a.printOptions={...a.printOptions,[d]:m},A()};o.addEventListener("change",l),o.type==="range"&&o.addEventListener("input",l)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(o=>{o.addEventListener("change",()=>{const l=Number(o.dataset.printLine),d=o.dataset.printLfield,m=[...a.printData.lines];let h=o.value;(d==="quantity"||d==="unitPrice")&&(h=Number(o.value)||0),m[l]={...m[l],[d]:h},m[l].amount=(Number(m[l].quantity)||0)*(Number(m[l].unitPrice)||0),a.printData={...a.printData,lines:m},A()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},A()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((d,m)=>m!==l)},A()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),F("印刷設定を保存しました")}catch(o){F("保存失敗: "+(o instanceof Error?o.message:String(o)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const o=a.printCompany,l=prompt("会社名",o.name);if(l===null)return;const d=prompt("郵便番号",o.postalCode)??o.postalCode,m=prompt("住所",o.address1)??o.address1,h=prompt("TEL",o.tel)??o.tel,w=prompt("FAX",o.fax)??o.fax,f=prompt("適格請求書登録番号 (T+13桁)",o.registrationNo)??o.registrationNo,x=prompt("取引銀行名",o.bankName)??o.bankName,k=prompt("支店名",o.bankBranch)??o.bankBranch,L=prompt("口座番号",o.bankAccountNo)??o.bankAccountNo,q=prompt("口座名義",o.bankAccountHolder)??o.bankAccountHolder;a.printCompany={...o,name:l,postalCode:d,address1:m,tel:h,fax:w,registrationNo:f,bankName:x,bankBranch:k,bankAccountNo:L,bankAccountHolder:q},A()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,A()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const d=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=xa(o),{savePrintLayout:h}=await I(async()=>{const{savePrintLayout:f}=await Promise.resolve().then(()=>j);return{savePrintLayout:f}},void 0),w={id:`bp1701_${d.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:d,templateKey:"chain_store",positions:m};try{await h(w)?(F(`クラウド保存成功: ${d}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),A()):(F("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(f){F("保存エラー: "+(f instanceof Error?f.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const l=xa(o);a.fdSavedPositions=l;try{localStorage.setItem("sake_fd_positions",JSON.stringify(l)),F(`ローカル保存完了: ${Object.keys(l).length}件`)}catch(d){F("保存失敗: "+(d instanceof Error?d.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const o=e.querySelector(".fd-canvas");if(!o)return;const d={templateKey:"chain_store",positions:xa(o),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(d,null,2)],{type:"application/json"}),h=URL.createObjectURL(m),w=document.createElement("a");w.href=h,w.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,w.click(),URL.revokeObjectURL(h)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async o=>{const l=o.target.files?.[0];if(l)try{const d=await l.text(),h=JSON.parse(d).positions;if(!h)throw new Error("positions field not found");a.fdSavedPositions=h,localStorage.setItem("sake_fd_positions",JSON.stringify(h)),F(`インポート成功: ${Object.keys(h).length}件`),A()}catch(d){F("インポート失敗: "+(d instanceof Error?d.message:""),"error")}});const _=e.querySelector("#fd-saved-layouts");_&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:o}=await I(async()=>{const{fetchPrintLayouts:d}=await Promise.resolve().then(()=>j);return{fetchPrintLayouts:d}},void 0),l=await o("chain_store");l.length===0?_.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(_.innerHTML=`☁️ クラウド保存済み (${l.length}件):<br/>`+l.map(d=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${d.id}" style="margin:4px 4px 0 0;">${d.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${d.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),_.querySelectorAll("[data-action='fd-load-layout']").forEach(d=>{d.addEventListener("click",()=>{const m=d.dataset.layoutId,h=l.find(w=>w.id===m);h&&(a.fdSavedPositions=h.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(h.positions)),F(`読込完了: ${h.name}`),A())})}),_.querySelectorAll("[data-action='fd-delete-layout']").forEach(d=>{d.addEventListener("click",async()=>{const m=d.dataset.layoutId;if(!m||!await Ee("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:h}=await I(async()=>{const{deletePrintLayout:f}=await Promise.resolve().then(()=>j);return{deletePrintLayout:f}},void 0);await h(m)?(F("削除しました"),A()):F("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await Ee("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),A())});const D=e.querySelector("#fd-sel-x"),P=e.querySelector("#fd-sel-y");if([D,P].forEach(o=>{o?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const l=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);l&&(D&&(l.style.left=D.value+"mm"),P&&(l.style.top=P.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(o=>{o.addEventListener("dragstart",l=>{o.classList.add("wf-dragging"),l.dataTransfer?.setData("text/plain",o.dataset.wfOrder??"")}),o.addEventListener("dragend",()=>o.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(o=>{o.addEventListener("dragover",l=>l.preventDefault()),o.addEventListener("drop",l=>{l.preventDefault();const d=l.dataTransfer?.getData("text/plain"),m=o.dataset.wfStage;if(!d||!m)return;const h=a.workflowOrders.find(w=>w.id===d);h&&(h.stage=m,A())})}),e.querySelectorAll("[data-mo-step]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moStep;o.disabled||(a.mobileOrder.step=l,A())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",o=>{a.mobileOrder.customerQuery=o.target.value,A()}),e.querySelector("#mo-product-q")?.addEventListener("input",o=>{a.mobileOrder.productQuery=o.target.value,A()}),e.querySelectorAll("[data-mo-select-customer]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moSelectCustomer,d=a.masterStats?.customers.find(m=>m.id===l);d&&(a.mobileOrder.selectedCustomer=d),A()})}),e.querySelectorAll("[data-mo-add-product]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.moAddProduct,d=a.masterStats?.products.find(h=>h.code===l);if(!d)return;const m=1800;a.mobileOrder.cart.push({productCode:d.code,productName:d.name,quantity:1,unit:"本",unitPrice:m,amount:m}),A()})}),e.querySelectorAll("[data-mo-qty]").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.moQty),d=o.dataset.moProduct,m=a.mobileOrder.cart.find(h=>h.productCode===d);m&&(m.quantity=Math.max(0,m.quantity+l),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(h=>h.productCode!==d)),A())})}),e.querySelectorAll("[data-mo-remove]").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.moRemove);a.mobileOrder.cart.splice(l,1),A()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const o=e.querySelector("#mo-memo");a.mobileOrder.memo=o?.value??"";const l="MO"+Date.now().toString().slice(-8),d=e.querySelector("[data-action='mo-submit']");d&&(d.disabled=!0,d.textContent="送信中…");const m=a.mobileOrder.cart.reduce((h,w)=>h+w.amount,0);try{const{saveStoreOrder:h}=await I(async()=>{const{saveStoreOrder:w}=await Promise.resolve().then(()=>j);return{saveStoreOrder:w}},void 0);await h(l,a.mobileOrder.selectedCustomer?.name??"不明",a.mobileOrder.selectedCustomer?.code??null,m,a.mobileOrder.memo,a.mobileOrder.cart)}catch(h){console.error("受注保存失敗:",h),F("送信に失敗しました","error"),d&&(d.disabled=!1,d.textContent="受注を送信");return}a.mobileOrder.submittedDocNo=l,a.mobileOrder.step="done",A()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},A()}),e.querySelectorAll("[data-tour-id]").forEach(o=>{o.addEventListener("click",()=>{a.tourActiveId=o.dataset.tourId??null,A()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(o=>{o.addEventListener("click",()=>{const l=a.tourInquiries.find(f=>f.id===a.tourActiveId);if(!l)return;const d=o.dataset.template==="confirm"?Fd:Vd,m=e.querySelector("#tour-confirmed-time"),h=d.replaceAll("{name}",l.name).replaceAll("{partySize}",String(l.partySize)).replaceAll("{confirmedTime}",m?.value??l.visitDate),w=e.querySelector("#tour-reply-body");w&&(w.value=h)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const o=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",l=a.tourInquiries.find(m=>m.id===o);if(!l)return;const d=e.querySelector("#tour-confirmed-time");l.status="confirmed",l.repliedAt=new Date().toISOString(),l.confirmedTime=d?.value??"",F("返信メールを下書き保存し、ステータスを確定にしました"),A()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const o=e.querySelector("#lb-type")?.value??"",l=e.querySelector("#lb-area")?.value??"",d=e.querySelector("#lb-keyword")?.value??"";if(!o&&!d){F("業種かキーワードを入力してください","warning");return}a.leadSearchType=o,a.leadSearchArea=l,a.leadSearchQuery=d,a.leadSearching=!0,A();const m=a.integrations.find(x=>x.provider==="google_maps");if(!m||!m.config.api_key){F("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,A();return}const{searchPlaces:h}=await I(async()=>{const{searchPlaces:x}=await Promise.resolve().then(()=>j);return{searchPlaces:x}},void 0),w=[o,d].filter(Boolean).join(" "),f=await h(m,w,l);a.leadSearching=!1,f.error?F("検索失敗: "+f.error,"error"):a.leadSearchResults=f.results,A()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],A()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const o=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!o)return;const l=`ll_${Date.now()}`,d={id:l,name:o,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:h,fetchLeadLists:w,fetchLeadItems:f}=await I(async()=>{const{saveLeadList:L,saveLeadItem:q,fetchLeadLists:N,fetchLeadItems:R}=await Promise.resolve().then(()=>j);return{saveLeadList:L,saveLeadItem:q,fetchLeadLists:N,fetchLeadItems:R}},void 0);await m(d);const x=e.querySelectorAll(".lb-search-check:checked"),k=Array.from(x).map(L=>Number(L.dataset.idx));for(const L of k){const q=a.leadSearchResults[L];q&&await h({...q,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:l,businessType:a.leadSearchType})}a.leadLists=await w(),a.leadActiveListId=l,a.leadItems=await f(l),a.leadSearchResults=[],F(`${k.length}件を「${o}」として保存しました`),A()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??null;if(a.leadActiveListId=l,l){const{fetchLeadItems:d}=await I(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>j);return{fetchLeadItems:m}},void 0);a.leadItems=await d(l)}A()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=a.leadItems.find(w=>w.id===l);if(!d)return;const{saveLeadItem:m,fetchLeadItems:h}=await I(async()=>{const{saveLeadItem:w,fetchLeadItems:f}=await Promise.resolve().then(()=>j);return{saveLeadItem:w,fetchLeadItems:f}},void 0);await m({...d,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),A()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=a.leadItems.find(f=>f.id===l);if(!d)return;const{convertLeadToProspect:m,fetchLeadItems:h}=await I(async()=>{const{convertLeadToProspect:f,fetchLeadItems:x}=await Promise.resolve().then(()=>j);return{convertLeadToProspect:f,fetchLeadItems:x}},void 0);await m(d)&&(F("見込客に追加しました: "+d.companyName),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),A())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const o=e.querySelectorAll(".lb-item-check:checked");if(o.length===0&&!await Ee("全ての新規アイテムを見込客に変換しますか？"))return;const l=o.length>0?Array.from(o).map(w=>w.dataset.id):a.leadItems.filter(w=>w.status==="new").map(w=>w.id),{convertLeadToProspect:d,fetchLeadItems:m}=await I(async()=>{const{convertLeadToProspect:w,fetchLeadItems:f}=await Promise.resolve().then(()=>j);return{convertLeadToProspect:w,fetchLeadItems:f}},void 0);let h=0;for(const w of l){const f=a.leadItems.find(x=>x.id===w);f&&f.status==="new"&&await d(f)&&h++}F(`${h}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),A()}),e.querySelectorAll("[data-analysis-tab]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.analysisTab;a.analysisTab!==l&&(a.analysisTab=l,A())})}),e.querySelector("#analysis-period-year")?.addEventListener("change",async o=>{const l=o.target.value,d=e.querySelector("#analysis-period-month")?.value??"";a.analysisPeriod=l&&d?`${l}-${d}`:l,a.customerAnalysis=null,a.productABC=null,await At("/customer-analysis"),A()}),e.querySelector("#analysis-period-month")?.addEventListener("change",async o=>{const l=o.target.value,d=e.querySelector("#analysis-period-year")?.value??"";a.analysisPeriod=d&&l?`${d}-${l}`:d,a.customerAnalysis=null,a.productABC=null,await At("/customer-analysis"),A()}),e.querySelector("#customer-map")){const o=()=>{window.google?.maps?um(e):setTimeout(o,200)};o()}e.querySelectorAll(".churn-reason-select").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.churnCode??"",d=o.value;try{const{saveChurnNote:m}=await I(async()=>{const{saveChurnNote:f}=await Promise.resolve().then(()=>j);return{saveChurnNote:f}},void 0);await m({customerCode:l,reason:d,memo:"",actionedAt:null});const h=a.churnNotes.find(f=>f.customerCode===l);h?h.reason=d:a.churnNotes.push({customerCode:l,reason:d,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const w=o.closest("tr");if(w){const f=w.querySelector("td:nth-child(2)");if(f){let x=f.querySelector(".reason-badge");!x&&d&&(x=document.createElement("span"),x.className="status-pill info reason-badge",x.style.fontSize="0.72rem",f.appendChild(x)),x&&(x.textContent=d?Bu[d]??"":"")}}F("理由を保存しました")}catch(m){F("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.churnCode??"",d=o.checked,m=o.closest("tr");m&&(m.style.opacity=d?"0.45":"",m.setAttribute("data-actioned",d?"1":"0"));try{const{saveChurnNote:h}=await I(async()=>{const{saveChurnNote:k}=await Promise.resolve().then(()=>j);return{saveChurnNote:k}},void 0),w=a.churnNotes.find(k=>k.customerCode===l),f=w?.reason??"",x=new Date().toISOString().slice(0,10);await h({customerCode:l,reason:f,memo:"",actionedAt:d?x:null}),w?w.actionedAt=d?x:null:a.churnNotes.push({customerCode:l,reason:f,memo:"",actionedAt:d?x:null,updatedAt:new Date().toISOString()}),F(d?"対応済みにしました":"対応済みを解除しました")}catch(h){F("保存に失敗しました","error"),console.error(h)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const o=a.integrations.find(h=>h.provider==="ivry");if(!o||!o.isEnabled){F("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:l,fetchCallLogs:d}=await I(async()=>{const{syncIvryCallLogs:h,fetchCallLogs:w}=await Promise.resolve().then(()=>j);return{syncIvryCallLogs:h,fetchCallLogs:w}},void 0),m=await l(o);m.error?F("同期失敗: "+m.error,"error"):(F(`${m.count}件の通話履歴を同期しました`),a.callLogs=await d(100),A())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const o=a.integrations.find(h=>h.provider==="ivry");if(!o||!o.isEnabled){F("IVRy連携が無効です","warning");return}if(!await Ee("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:l}=await I(async()=>{const{syncPhoneBookToIvry:h}=await Promise.resolve().then(()=>j);return{syncPhoneBookToIvry:h}},void 0),d=[];a.masterStats?.customers.forEach(h=>{d.push({name:h.name,phone:"",customerCode:h.code,note:"既存取引先"})}),a.prospects.forEach(h=>{h.phone&&d.push({name:h.companyName,phone:h.phone,customerCode:h.id,note:`見込客 (${h.stage})`})});const m=await l(o,d);m.error?F("送信失敗: "+m.error,"error"):F(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=o.dataset.phone??"",m=prompt(`電話番号 ${d} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const h=a.callLogs.find(x=>x.id===l);if(!h)return;const{saveCallLog:w,fetchCallLogs:f}=await I(async()=>{const{saveCallLog:x,fetchCallLogs:k}=await Promise.resolve().then(()=>j);return{saveCallLog:x,fetchCallLogs:k}},void 0);await w({...h,matchedCustomerCode:m}),a.callLogs=await f(100),A()})}),e.querySelectorAll("[data-action='call-memo']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=a.callLogs.find(f=>f.id===l);if(!d)return;const m=prompt("メモを入力:",d.notes??"");if(m===null)return;const{saveCallLog:h,fetchCallLogs:w}=await I(async()=>{const{saveCallLog:f,fetchCallLogs:x}=await Promise.resolve().then(()=>j);return{saveCallLog:f,fetchCallLogs:x}},void 0);await h({...d,notes:m}),a.callLogs=await w(100),A()})}),e.querySelectorAll("[data-prospect-view]").forEach(o=>{o.addEventListener("click",()=>{a.prospectViewMode=o.dataset.prospectView,A()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",A()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:d}=await I(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>j);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await d(l)}A()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.prospectId??null;if(a.prospectEditingId=l,l){const{fetchProspectActivities:d}=await I(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>j);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await d(l)}A()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],A())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const o=a.prospectEditingId==="__new__",l=o?`p_${Date.now()}`:a.prospectEditingId??"",d={id:l,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!d.companyName){F("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:h,recordAudit:w,sendSlackNotification:f}=await I(async()=>{const{saveProspect:k,fetchProspects:L,recordAudit:q,sendSlackNotification:N}=await Promise.resolve().then(()=>j);return{saveProspect:k,fetchProspects:L,recordAudit:q,sendSlackNotification:N}},void 0);await m(d)?(o&&await f("new_prospect",`新規見込客: ${d.companyName} / 想定 ¥${d.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await w({action:o?"prospect_create":"prospect_update",entityType:"prospect",entityId:l,userEmail:a.user?.email}),a.prospects=await h(),a.prospectEditingId=null,A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteProspect:d,fetchProspects:m}=await I(async()=>{const{deleteProspect:h,fetchProspects:w}=await Promise.resolve().then(()=>j);return{deleteProspect:h,fetchProspects:w}},void 0);await d(l)&&(a.prospects=await m(),A())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const d=o.dataset.id??"",m=o.dataset.name??"",h=o.dataset.addr??"";a.quoteState=oa(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=m,a.quoteState.customerAddress=h,a.quoteState.isProspect=!0,a.quoteState.prospectId=d,a.quotePricing=null,a.quoteEditId="new",ea("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",l=e.querySelector("#prospect-activity-type")?.value??"call",d=e.querySelector("#prospect-activity-title")?.value??"";if(!d){F("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:h}=await I(async()=>{const{saveProspectActivity:w,fetchProspectActivities:f}=await Promise.resolve().then(()=>j);return{saveProspectActivity:w,fetchProspectActivities:f}},void 0);await m({id:`act_${Date.now()}`,prospectId:o,activityType:l,title:d,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await h(o),A()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(o=>{o.addEventListener("dragstart",l=>{l.dataTransfer?.setData("text/plain",o.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(o=>{o.addEventListener("dragover",l=>l.preventDefault()),o.addEventListener("drop",async l=>{l.preventDefault();const d=l.dataTransfer?.getData("text/plain"),m=o.dataset.prospectStage;if(!d)return;const h=a.prospects.find(w=>w.id===d);if(h&&h.stage!==m){const w={...h,stage:m},{saveProspect:f}=await I(async()=>{const{saveProspect:x}=await Promise.resolve().then(()=>j);return{saveProspect:x}},void 0);await f(w),h.stage=m,A()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:o,saveIntegrationSetting:l}=await I(async()=>{const{fetchIntegrationSettings:x,saveIntegrationSetting:k}=await Promise.resolve().then(()=>j);return{fetchIntegrationSettings:x,saveIntegrationSetting:k}},void 0),m=(a.integrations.length>0?a.integrations:await o()).find(x=>x.provider==="slack");if(!m)return;const h=e.querySelector("#slack-webhook")?.value??"",w=e.querySelector("#slack-default-channel")?.value??"",f=e.querySelector("#slack-enabled")?.checked??!1;await l({...m,config:{...m.config,webhook_url:h,default_channel:w},isEnabled:f}),a.integrations=await o(),F("保存しました"),A()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:o,fetchSlackRules:l}=await I(async()=>{const{saveSlackRule:d,fetchSlackRules:m}=await Promise.resolve().then(()=>j);return{saveSlackRule:d,fetchSlackRules:m}},void 0);for(const d of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${d.id}"][data-slack-field="enabled"]`)?.checked??d.enabled,h=e.querySelector(`[data-slack-rule-id="${d.id}"][data-slack-field="channel"]`)?.value??d.channel;await o({...d,enabled:m,channel:h})}a.slackRules=await l(),F("ルールを保存しました"),A()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:o}=await I(async()=>{const{sendSlackNotification:d}=await Promise.resolve().then(()=>j);return{sendSlackNotification:d}},void 0),l=await o("new_order","🧪 これはテスト通知です (syusen-cloud)");l.ok?F("テスト送信成功"):F("送信失敗: "+(l.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,A()}),e.querySelectorAll("[data-action='material-adjust']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id??"",d=a.materialList.find(m=>m.id===l);d&&(a.materialEditing=d,a.materialEditingIsNew=!1,A())})}),e.querySelectorAll("[data-action='material-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,A())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const l={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(l.materialType=e.querySelector("#mat-type")?.value??"",!l.code||!l.name){F("コードと品名は必須です","warning");return}const{saveMaterial:d,fetchMaterialList:m}=await I(async()=>{const{saveMaterial:w,fetchMaterialList:f}=await Promise.resolve().then(()=>j);return{saveMaterial:w,fetchMaterialList:f}},void 0);await d(l)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,F("保存しました"),A()):F("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!o||!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:l,fetchMaterialList:d}=await I(async()=>{const{deleteMaterial:m,fetchMaterialList:h}=await Promise.resolve().then(()=>j);return{deleteMaterial:m,fetchMaterialList:h}},void 0);await l(o)&&(a.materialList=await d(),a.materialEditing=null,A())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",A()}),e.querySelectorAll("[data-action='user-edit']").forEach(o=>{o.addEventListener("click",()=>{a.userEditingId=o.dataset.id??null,A()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,A()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const o=a.userEditingId==="__new__",l=o?crypto.randomUUID():a.userEditingId??"",d=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!d||!m){F("名前とメールアドレスは必須です","warning");return}const h={id:l,email:d,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(o){const L=e.querySelector("#user-password")?.value??"";if(L.length<8){F("パスワードは8文字以上必要です","warning");return}try{await $n(d,L)}catch(q){F("Auth登録失敗: "+(q instanceof Error?q.message:""),"error");return}}const{saveUserProfile:w,fetchUserProfiles:f,recordAudit:x}=await I(async()=>{const{saveUserProfile:L,fetchUserProfiles:q,recordAudit:N}=await Promise.resolve().then(()=>j);return{saveUserProfile:L,fetchUserProfiles:q,recordAudit:N}},void 0);await w(h)?(await x({action:o?"user_create":"user_update",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await f(),a.userEditingId=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteUserProfile:d,fetchUserProfiles:m,recordAudit:h}=await I(async()=>{const{deleteUserProfile:f,fetchUserProfiles:x,recordAudit:k}=await Promise.resolve().then(()=>j);return{deleteUserProfile:f,fetchUserProfiles:x,recordAudit:k}},void 0);await d(l)?(await h({action:"user_delete",entityType:"user",entityId:l,userEmail:a.user?.email}),a.userProfiles=await m(),A()):F("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const o=e.querySelector("#profile-sender")?.value??"",l={...a.myProfile,defaultMailSenderId:o},{saveUserProfile:d}=await I(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>j);return{saveUserProfile:m}},void 0);await d(l),a.myProfile=l,F("保存しました"),A()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const o=e.querySelector("#profile-new-password")?.value??"";if(o.length<8){F("8文字以上のパスワードを入力してください","warning");return}try{await Qo(o),F("パスワードを変更しました")}catch(l){F("変更失敗: "+(l instanceof Error?l.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(o=>{o.addEventListener("click",()=>{a.integrationEditingId=o.dataset.id??null,A()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,A()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='int-save']")?.dataset.id??"",l=a.integrations.find(x=>x.id===o);if(!l)return;const d={...l.config};Object.keys(d).forEach(x=>{const k=e.querySelector(`#int-${x}`);k&&(d[x]=k.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:h,fetchIntegrationSettings:w}=await I(async()=>{const{saveIntegrationSetting:x,fetchIntegrationSettings:k}=await Promise.resolve().then(()=>j);return{saveIntegrationSetting:x,fetchIntegrationSettings:k}},void 0);await h({...l,config:d,isEnabled:m})?(a.integrations=await w(),a.integrationEditingId=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(o=>{o.addEventListener("click",async()=>{const l=a.integrations.find(w=>w.provider==="shopify");if(!l){F("Shopify連携が未設定です","warning");return}o.textContent="同期中…",o.disabled=!0;const{syncShopifyOrders:d,fetchShopifyOrders:m}=await I(async()=>{const{syncShopifyOrders:w,fetchShopifyOrders:f}=await Promise.resolve().then(()=>j);return{syncShopifyOrders:w,fetchShopifyOrders:f}},void 0),h=await d(l);h.error?F("同期失敗: "+h.error,"error"):(F(`${h.count}件を同期しました`),a.shopifyOrders=await m()),A()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(o=>{o.addEventListener("click",async()=>{const l=a.integrations.find(w=>w.provider==="google_calendar");if(!l)return;o.textContent="同期中…",o.disabled=!0;const{syncGoogleCalendar:d,fetchCalendarEvents:m}=await I(async()=>{const{syncGoogleCalendar:w,fetchCalendarEvents:f}=await Promise.resolve().then(()=>j);return{syncGoogleCalendar:w,fetchCalendarEvents:f}},void 0),h=await d(l);h.error?F("同期失敗: "+h.error,"error"):(F(`${h.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),A()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const l=e.querySelector("#fax-file")?.files?.[0];if(!l){F("FAX画像を選択してください","warning");return}const d=a.integrations.find(m=>m.provider==="cloud_vision");if(!d||!d.config.api_key){F("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,A();try{const m=new FileReader;m.onload=async()=>{const h=String(m.result??""),{ocrFaxImage:w,saveFaxRecord:f,fetchFaxInbox:x}=await I(async()=>{const{ocrFaxImage:N,saveFaxRecord:R,fetchFaxInbox:M}=await Promise.resolve().then(()=>j);return{ocrFaxImage:N,saveFaxRecord:R,fetchFaxInbox:M}},void 0),k=await w(d,h),L=e.querySelector("#fax-sender-name")?.value??"",q=e.querySelector("#fax-sender-phone")?.value??"";await f({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:L,senderPhone:q,ocrStatus:k.error?"failed":"done",ocrText:k.text}),a.faxOcrText=k.error?`エラー: ${k.error}`:k.text,a.faxRecords=await x(),a.faxProcessing=!1,A()},m.readAsDataURL(l)}catch(m){F("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,A()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",A()}),e.querySelectorAll("[data-action='ms-edit']").forEach(o=>{o.addEventListener("click",()=>{a.mailSenderEditingId=o.dataset.id??null,A()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,A()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,l={id:o,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(w=>w.id===o)?.isVerified??!1};if(!l.name||!l.email){F("名前とメールアドレスは必須です","warning");return}const{saveMailSender:d,fetchMailSenders:m}=await I(async()=>{const{saveMailSender:w,fetchMailSenders:f}=await Promise.resolve().then(()=>j);return{saveMailSender:w,fetchMailSenders:f}},void 0);await d(l)?(a.mailSenders=await m(),a.mailSenderEditingId=null,F("保存しました"),A()):F("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(o=>{o.addEventListener("click",async()=>{if(!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const l=o.dataset.id??"",{deleteMailSender:d,fetchMailSenders:m}=await I(async()=>{const{deleteMailSender:w,fetchMailSenders:f}=await Promise.resolve().then(()=>j);return{deleteMailSender:w,fetchMailSenders:f}},void 0);await d(l)?(a.mailSenders=await m(),A()):F("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(o=>{o.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){F("データなし","error");return}const o=a.demandAnalysis,l=Object.entries(o.matrix).map(([m,h])=>{const w={productCode:m};return o.months.forEach(f=>{w[f]=h[f]??0}),w}),d=[{key:"productCode",label:"商品コード"},...o.months.map(m=>({key:m,label:m}))];Ja("demand-analysis.csv",l,d)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){F("データなし","error");return}const o=a.productionPlan.map(d=>({...d}));Ja("production-plan.csv",o,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await Ee("当月の全請求を締め切りますか？")&&F("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async o=>{const l=parseInt(o.target.value);a.brewingPlanFY=l;const{fetchBrewingPlanSummary:d,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:h,fetchBrewingProductDetail:w,fetchBrewingCustomCategories:f,fetchBrewingCategoryOverrides:x,fetchAllBrewingStockEntries:k}=await I(async()=>{const{fetchBrewingPlanSummary:O,fetchBrewingMonthlyTrend:U,fetchBrewingSchedule:H,fetchBrewingProductDetail:G,fetchBrewingCustomCategories:W,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:X}=await Promise.resolve().then(()=>j);return{fetchBrewingPlanSummary:O,fetchBrewingMonthlyTrend:U,fetchBrewingSchedule:H,fetchBrewingProductDetail:G,fetchBrewingCustomCategories:W,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:X}},void 0),[L,q,N,R,M,z,B]=await Promise.all([d(`${l}-10-01`,`${l+1}-09-30`),m(`${l}-10-01`,`${l+1}-09-30`),h(l),w(`${l}-10-01`,`${l+1}-09-30`),f(),x(),k()]);a.brewingPlanData=L,a.brewingMonthlyTrend=q,a.brewingSchedule=N,a.brewingProductDetail=R,a.brewingStockEntries=B,a.brewingCustomCategories=M,a.brewingOverrides=z,a.brewingExcludedProducts=new Set,A()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",d=o.dataset.parent??"";if(!l||!d)return;if(o.checked){a.brewingExcludedProducts.delete(l),A();return}a.brewingExcludedProducts.add(l);const m=a.brewingCustomCategories.filter(h=>h.parentCategory===d);if(m.length===1){const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:f,fetchBrewingCategoryOverrides:x}=await I(async()=>{const{setBrewingCategoryOverride:z,fetchBrewingPlanSummary:B,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:U}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:z,fetchBrewingPlanSummary:B,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:U}},void 0);await h(l,m[0].name);const k=a.brewingPlanFY,{fetchBrewingYearlyShipments:L}=await I(async()=>{const{fetchBrewingYearlyShipments:z}=await Promise.resolve().then(()=>j);return{fetchBrewingYearlyShipments:z}},void 0),[q,N,R,M]=await Promise.all([w(`${k}-10-01`,`${k+1}-09-30`),f(`${k}-10-01`,`${k+1}-09-30`),x(),L()]);a.brewingPlanData=q,a.brewingProductDetail=N,a.brewingOverrides=R,a.brewingYearlyShipments=M,a.brewingExcludedProducts.delete(l)}A()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",d=o.dataset.cat??"";if(!l||!d)return;const{setBrewingCategoryOverride:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:f,fetchBrewingYearlyShipments:x}=await I(async()=>{const{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:O,fetchBrewingYearlyShipments:U}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:O,fetchBrewingYearlyShipments:U}},void 0);await m(l,d);const k=a.brewingPlanFY,[L,q,N,R]=await Promise.all([h(`${k}-10-01`,`${k+1}-09-30`),w(`${k}-10-01`,`${k+1}-09-30`),f(),x()]);a.brewingPlanData=L,a.brewingProductDetail=q,a.brewingOverrides=N,a.brewingYearlyShipments=R,A()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"";if(!l)return;const{setBrewingCategoryOverride:d,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h,fetchBrewingCategoryOverrides:w,fetchBrewingYearlyShipments:f}=await I(async()=>{const{setBrewingCategoryOverride:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:B,fetchBrewingYearlyShipments:O}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:z,fetchBrewingCategoryOverrides:B,fetchBrewingYearlyShipments:O}},void 0);await d(l,null);const x=a.brewingPlanFY,[k,L,q,N]=await Promise.all([m(`${x}-10-01`,`${x+1}-09-30`),h(`${x}-10-01`,`${x+1}-09-30`),w(),f()]);a.brewingPlanData=k,a.brewingProductDetail=L,a.brewingOverrides=q,a.brewingYearlyShipments=N,A()})}),(()=>{const o=e.querySelector("#gantt-timeline");if(!o)return;const l=[9,10,11,12,1,2,3,4,5],d=l.length;let m=null,h=null;o.querySelectorAll(".gantt-bar").forEach(q=>{q.style.pointerEvents="auto"});function w(q){return"touches"in q?q.touches[0].clientX:q.clientX}function f(q){const N=q.target,R=N.closest(".gantt-bar");if(!R)return;const M=R.parentElement,z=R.dataset.cat??"",B=parseInt(R.dataset.month??"0"),O=parseInt(R.dataset.dur??"1"),U=parseInt(R.dataset.vol??"0"),H=M.offsetWidth/d;let G="move";N.classList.contains("gantt-resize-right")?G="resize-right":N.classList.contains("gantt-resize-left")&&(G="resize-left"),R.style.cursor=G==="move"?"grabbing":"ew-resize",R.style.opacity="0.8",R.style.zIndex="10",m={bar:R,mode:G,cat:z,origMonth:B,origDur:O,origVol:U,startX:w(q),cellW:H,origLeftPct:parseFloat(R.style.left),origWidthPct:parseFloat(R.style.width)},q.preventDefault()}function x(q){if(!m)return;const{bar:N,mode:R,origDur:M,startX:z,cellW:B,origLeftPct:O,origWidthPct:U}=m,H=w(q)-z,G=Math.round(H/B),W=Math.round(O/100*d);if(R==="move"){const Q=Math.max(0,Math.min(d-M,W+G));N.style.left=(Q/d*100).toFixed(2)+"%"}else if(R==="resize-right"){const Q=Math.max(1,Math.min(d-W,M+G));N.style.width=(Q/d*100).toFixed(2)+"%"}else if(R==="resize-left"){const Q=Math.max(0,Math.min(W+M-1,W+G)),X=M-(Q-W);N.style.left=(Q/d*100).toFixed(2)+"%",N.style.width=(X/d*100).toFixed(2)+"%"}}async function k(q){if(!m)return;const{bar:N,cat:R,origMonth:M,origDur:z,origVol:B}=m,O=Math.round(parseFloat(N.style.left)/100*d),U=Math.max(1,Math.round(parseFloat(N.style.width)/100*d)),H=l[Math.max(0,Math.min(d-1,O))];if(N.style.cursor="grab",N.style.opacity="1",N.style.zIndex="",m=null,H===M&&U===z)return;const{saveBrewingSchedule:G,fetchBrewingSchedule:W}=await I(async()=>{const{saveBrewingSchedule:X,fetchBrewingSchedule:Z}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:X,fetchBrewingSchedule:Z}},void 0),Q=a.brewingSchedule.filter(X=>X.brewCategory===R).map(X=>X.brewMonth===M?{brewMonth:H,durationMonths:U,plannedVolumeL:B}:{brewMonth:X.brewMonth,durationMonths:X.durationMonths,plannedVolumeL:X.plannedVolumeL});await G(R,a.brewingPlanFY,Q),a.brewingSchedule=await W(a.brewingPlanFY),A()}o.addEventListener("mousedown",f),o.addEventListener("touchstart",f,{passive:!1}),document.addEventListener("mousemove",x),document.addEventListener("touchmove",x,{passive:!1}),document.addEventListener("mouseup",k),document.addEventListener("touchend",k);function L(q){const N=q.dataset.cat??"",R=parseInt(q.dataset.month??"0"),M=parseInt(q.dataset.vol??"0"),z=parseInt(q.dataset.max??"99999"),B=q.querySelector(".gantt-bar-label");if(!B||B.querySelector("input"))return;const O=document.createElement("input");O.type="number",O.min="0",O.max=String(z),O.step="100",O.value=String(M),O.style.cssText="width:60px;height:24px;font-size:12px;text-align:center;border:1px solid #2563eb;border-radius:3px;pointer-events:auto;",B.textContent="",B.style.pointerEvents="auto",B.appendChild(O),O.focus(),O.select();const U=async()=>{const H=parseFloat(O.value)||0;if(B.style.pointerEvents="none",B.textContent=C(Math.round(H))+"L",Math.abs(H-M)<1)return;const{saveBrewingSchedule:G,fetchBrewingSchedule:W}=await I(async()=>{const{saveBrewingSchedule:X,fetchBrewingSchedule:Z}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:X,fetchBrewingSchedule:Z}},void 0),Q=a.brewingSchedule.filter(X=>X.brewCategory===N).map(X=>({brewMonth:X.brewMonth,durationMonths:X.durationMonths,plannedVolumeL:X.brewMonth===R?H:X.plannedVolumeL}));await G(N,a.brewingPlanFY,Q),a.brewingSchedule=await W(a.brewingPlanFY),A()};O.addEventListener("blur",U),O.addEventListener("keydown",H=>{H.key==="Enter"&&O.blur()})}o.addEventListener("dblclick",q=>{const N=q.target.closest(".gantt-bar");N&&L(N)}),o.addEventListener("touchstart",q=>{const N=q.target.closest(".gantt-bar");if(N){if(h){clearTimeout(h),h=null,L(N);return}h=setTimeout(()=>{h=null},300)}},{passive:!0}),o.querySelectorAll(".gantt-bar-container").forEach(q=>{q.style.pointerEvents="auto";const N=async R=>{if(m)return;const M=q.dataset.cat??"",z=parseInt(q.dataset.max??"0"),B=q.getBoundingClientRect(),O=R-B.left,U=Math.floor(O/(B.width/d)),H=l[Math.max(0,Math.min(d-1,U))];if(a.brewingSchedule.some(Z=>Z.brewCategory===M&&Z.brewMonth===H))return;const G=Math.round(z*.3)||500,{saveBrewingSchedule:W,fetchBrewingSchedule:Q}=await I(async()=>{const{saveBrewingSchedule:Z,fetchBrewingSchedule:oe}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:Z,fetchBrewingSchedule:oe}},void 0),X=[...a.brewingSchedule.filter(Z=>Z.brewCategory===M).map(Z=>({brewMonth:Z.brewMonth,durationMonths:Z.durationMonths,plannedVolumeL:Z.plannedVolumeL})),{brewMonth:H,durationMonths:2,plannedVolumeL:G}];await W(M,a.brewingPlanFY,X),a.brewingSchedule=await Q(a.brewingPlanFY),A()};q.addEventListener("click",R=>{R.target.closest(".gantt-bar")||N(R.clientX)})})})();function C(o){return o.toLocaleString("ja-JP")}(()=>{const o=e.querySelector("#bp-gantt");if(!o)return;let l=null;function d(w){const f=w.target,x=f.closest(".bp-gantt-bar");if(!x)return;let k="move";f.classList.contains("bp-gantt-resize-right")?k="resize-right":f.classList.contains("bp-gantt-resize-left")&&(k="resize-left");const L="touches"in w?w.touches[0].clientX:w.clientX;x.style.opacity="0.7",x.style.zIndex="10",l={bar:x,mode:k,stepId:x.dataset.stepId??"",startX:L,origLeft:parseFloat(x.style.left),origWidth:parseFloat(x.style.width)},w.preventDefault()}function m(w){if(!l)return;const x=("touches"in w?w.touches[0].clientX:w.clientX)-l.startX;l.mode==="move"?l.bar.style.left=l.origLeft+x+"px":l.mode==="resize-right"?l.bar.style.width=Math.max(6,l.origWidth+x)+"px":(l.bar.style.left=l.origLeft+x+"px",l.bar.style.width=Math.max(6,l.origWidth-x)+"px")}async function h(){if(!l)return;const{bar:w,stepId:f,origLeft:x,origWidth:k}=l,L=parseFloat(w.style.left),q=parseFloat(w.style.width);w.style.opacity="1",w.style.zIndex="",l=null;const N=Math.round((L-x)/6),R=Math.round((q-k)/6);if(N===0&&R===0)return;const M=w.dataset.plannedStart??"",z=w.dataset.plannedEnd??"";if(!M||!z)return;const B=(Y,K)=>{const ae=new Date(Y);return ae.setDate(ae.getDate()+K),ae.toISOString().slice(0,10)};let O=M,U=z;N!==0&&R===0?(O=B(M,N),U=B(z,N)):R!==0&&N===0?U=B(z,R):(O=B(M,N),U=B(z,N+R));const H=w.dataset.batchId??"",G=parseInt(w.dataset.stepOrder??"0"),{updateBrewingProcessStep:W,fetchBrewingProcessSteps:Q}=await I(async()=>{const{updateBrewingProcessStep:Y,fetchBrewingProcessSteps:K}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:Y,fetchBrewingProcessSteps:K}},void 0),X=a.brewingProcessSteps.filter(Y=>Y.batchId===H).sort((Y,K)=>Y.stepOrder-K.stepOrder);await W(f,{planned_start:O,planned_end:U});let Z=U;for(const Y of X){if(Y.stepOrder<=G)continue;const K=Math.max(Math.round((new Date(Y.plannedEnd).getTime()-new Date(Y.plannedStart).getTime())/864e5),0),ae=B(Z,1),ge=B(ae,K);await W(Y.id,{planned_start:ae,planned_end:ge}),Z=ge}let oe=O;for(let Y=X.length-1;Y>=0;Y--){const K=X[Y];if(K.stepOrder>=G)continue;const ae=Math.max(Math.round((new Date(K.plannedEnd).getTime()-new Date(K.plannedStart).getTime())/864e5),0),ge=B(oe,-1),pe=B(ge,-ae);await W(K.id,{planned_start:pe,planned_end:ge}),oe=pe}X.map(Y=>(Y.stepOrder<G&&Math.round((new Date(Y.plannedEnd).getTime()-new Date(Y.plannedStart).getTime())/864e5),Y));const{updateBrewingBatch:J}=await I(async()=>{const{updateBrewingBatch:Y}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:Y}},void 0);await J(H,{start_date:X[0].stepOrder<G?B(O,-X.filter(Y=>Y.stepOrder<G).reduce((Y,K)=>Y+Math.round((new Date(K.plannedEnd).getTime()-new Date(K.plannedStart).getTime())/864e5)+1,0)):G===1?O:void 0,target_end_date:Z}),a.brewingProcessSteps=await Q(a.brewingBatches.map(Y=>Y.id)),A()}o.addEventListener("mousedown",d),o.addEventListener("touchstart",d,{passive:!1}),document.addEventListener("mousemove",m),document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("mouseup",h),document.addEventListener("touchend",h)})(),e.querySelector("[data-action='bp-auto-schedule']")?.addEventListener("click",async()=>{if(a.brewingBatches.length===0)return;const o=e.querySelector("[data-action='bp-auto-schedule']");o&&(o.textContent="計算中...",o.disabled=!0);const{autoScheduleAllBatches:l,fetchBrewingBatches:d,fetchBrewingProcessSteps:m}=await I(async()=>{const{autoScheduleAllBatches:f,fetchBrewingBatches:x,fetchBrewingProcessSteps:k}=await Promise.resolve().then(()=>j);return{autoScheduleAllBatches:f,fetchBrewingBatches:x,fetchBrewingProcessSteps:k}},void 0),{fetchTanks:h}=await I(async()=>{const{fetchTanks:f}=await Promise.resolve().then(()=>j);return{fetchTanks:f}},void 0),w=await h().catch(()=>[]);await l(a.brewingBatches,a.bpWorkerSettings,a.bpStepLabor,w),a.brewingBatches=await d(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(f=>f.id)):[],A()});for(const o of["bp-worker-count","bp-worker-hours","bp-worker-start"])e.querySelector(`[data-action='${o}']`)?.addEventListener("change",async l=>{const d=parseFloat(l.target.value)||0;o==="bp-worker-count"?a.bpWorkerSettings.workerCount=d:o==="bp-worker-hours"?a.bpWorkerSettings.weeklyHoursLimit=d:a.bpWorkerSettings.dayStartHour=d;const{saveWorkerSettings:m}=await I(async()=>{const{saveWorkerSettings:h}=await Promise.resolve().then(()=>j);return{saveWorkerSettings:h}},void 0);await m(a.bpWorkerSettings),A()});e.querySelector("[data-action='bp-worker-deadline']")?.addEventListener("change",async o=>{a.bpWorkerSettings.deadlineDate=o.target.value;const{saveWorkerSettings:l}=await I(async()=>{const{saveWorkerSettings:d}=await Promise.resolve().then(()=>j);return{saveWorkerSettings:d}},void 0);await l(a.bpWorkerSettings),A()}),e.querySelector("[data-action='bp-worker-sunday']")?.addEventListener("change",async o=>{a.bpWorkerSettings.allowSunday=o.target.checked;const{saveWorkerSettings:l}=await I(async()=>{const{saveWorkerSettings:d}=await Promise.resolve().then(()=>j);return{saveWorkerSettings:d}},void 0);await l(a.bpWorkerSettings),A()}),e.querySelector("[data-action='bp-tank-add']")?.addEventListener("click",async()=>{const o=e.querySelector("#bp-tank-no")?.value?.trim()??"",l=parseFloat(e.querySelector("#bp-tank-cap")?.value??"0"),d=e.querySelector("#bp-tank-cats")?.value?.trim()??"";if(!o||l<=0)return;const m=d?d.split(/[,、]/).map(f=>f.trim()).filter(Boolean):[],{addTank:h,fetchTanks:w}=await I(async()=>{const{addTank:f,fetchTanks:x}=await Promise.resolve().then(()=>j);return{addTank:f,fetchTanks:x}},void 0);await h(o,l,"",m),a.bpTanks=await w(),A()}),e.querySelectorAll("[data-action='bp-tank-delete']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.tankId??"";if(!l)return;const{deleteTank:d,fetchTanks:m}=await I(async()=>{const{deleteTank:h,fetchTanks:w}=await Promise.resolve().then(()=>j);return{deleteTank:h,fetchTanks:w}},void 0);await d(l),a.bpTanks=await m(),A()})}),e.querySelector("[data-action='bp-import-schedule']")?.addEventListener("click",async()=>{const o=e.querySelectorAll("[data-action='bp-import-check']:checked");if(o.length===0)return;const{createBrewingBatch:l,fetchBrewingBatches:d,fetchBrewingProcessSteps:m}=await I(async()=>{const{createBrewingBatch:h,fetchBrewingBatches:w,fetchBrewingProcessSteps:f}=await Promise.resolve().then(()=>j);return{createBrewingBatch:h,fetchBrewingBatches:w,fetchBrewingProcessSteps:f}},void 0);for(const h of o){const w=h.dataset.cat??"",f=h.dataset.code??"",x=parseFloat(h.dataset.vol??"0"),k=h.dataset.date??"";!w||!f||!k||await l(w,f,a.brewingPlanFY,x,k,a.brewingProcessSteps,a.brewingRiceParams)}a.brewingBatches=await d(a.brewingPlanFY),a.brewingBatches.length>0&&(a.brewingProcessSteps=await m(a.brewingBatches.map(h=>h.id))),A()}),e.querySelector("[data-action='bp-show-new-form']")?.addEventListener("click",()=>{a.bpShowNewForm=!a.bpShowNewForm,A()}),e.querySelector("[data-action='bp-create-batch']")?.addEventListener("click",async()=>{const o=e.querySelector("#bp-new-cat")?.value??"",l=e.querySelector("#bp-new-code")?.value?.trim()??"",d=parseFloat(e.querySelector("#bp-new-vol")?.value??"0"),m=e.querySelector("#bp-new-date")?.value??"";if(!o||!l||!m)return;const{createBrewingBatch:h,fetchBrewingBatches:w,fetchBrewingProcessSteps:f}=await I(async()=>{const{createBrewingBatch:x,fetchBrewingBatches:k,fetchBrewingProcessSteps:L}=await Promise.resolve().then(()=>j);return{createBrewingBatch:x,fetchBrewingBatches:k,fetchBrewingProcessSteps:L}},void 0);await h(o,l,a.brewingPlanFY,d,m,a.brewingProcessSteps,a.brewingRiceParams),a.brewingBatches=await w(a.brewingPlanFY),a.brewingProcessSteps=await f(a.brewingBatches.map(x=>x.id)),a.bpShowNewForm=!1,A()}),e.querySelectorAll("[data-action='bp-toggle-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.batchId??"";a.bpExpandedBatchId=a.bpExpandedBatchId===l?"":l,A()})}),e.querySelectorAll("[data-action='bp-step-status']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:d}=await I(async()=>{const{updateBrewingProcessStep:w}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:w}},void 0),m={status:o.value};o.value==="進行中"&&!o.dataset.actualStart&&(m.actual_start=new Date().toISOString().split("T")[0]),o.value==="完了"&&!o.dataset.actualEnd&&(m.actual_end=new Date().toISOString().split("T")[0]),await d(l,m);const{fetchBrewingProcessSteps:h}=await I(async()=>{const{fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>j);return{fetchBrewingProcessSteps:w}},void 0);a.brewingProcessSteps=await h(a.brewingBatches.map(w=>w.id)),A()})}),e.querySelectorAll("[data-action='bp-step-temp']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:d}=await I(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:m}},void 0);await d(l,{temperature:parseFloat(o.value)||null})})}),e.querySelectorAll("[data-action='bp-step-notes']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.stepId??"";if(!l)return;const{updateBrewingProcessStep:d}=await I(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>j);return{updateBrewingProcessStep:m}},void 0);await d(l,{notes:o.value})})});let S="";e.querySelectorAll("[data-action='bp-show-delete-modal']").forEach(o=>{o.addEventListener("click",()=>{S=o.dataset.batchId??"";const l=e.querySelector("#bp-delete-modal"),d=e.querySelector("#bp-delete-batch-name");l&&(l.style.display="flex"),d&&(d.textContent=o.dataset.batchCode??"")})}),e.querySelector("[data-action='bp-delete-cancel']")?.addEventListener("click",()=>{const o=e.querySelector("#bp-delete-modal");o&&(o.style.display="none"),S=""}),e.querySelector("[data-action='bp-delete-confirm']")?.addEventListener("click",async()=>{if(!S)return;const o=e.querySelector("#bp-delete-modal");o&&(o.style.display="none");const{supabaseDelete:l}=await I(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>te);return{supabaseDelete:h}},void 0);await l("brewing_process_batches",S);const{fetchBrewingBatches:d,fetchBrewingProcessSteps:m}=await I(async()=>{const{fetchBrewingBatches:h,fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>j);return{fetchBrewingBatches:h,fetchBrewingProcessSteps:w}},void 0);a.brewingBatches=await d(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(h=>h.id)):[],a.bpExpandedBatchId="",S="",A()}),e.querySelector("#bp-delete-modal")?.addEventListener("click",o=>{o.target===o.currentTarget&&(o.currentTarget.style.display="none",S="")}),e.querySelectorAll("[data-action='bp-batch-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:d}=await I(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:m}},void 0);await d(l,{planned_volume_l:parseFloat(o.value)||0})})}),e.querySelectorAll("[data-action='bp-batch-date']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:d}=await I(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:m}},void 0);await d(l,{start_date:o.value})})}),e.querySelectorAll("[data-action='bp-batch-status']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.batchId??"";if(!l)return;const{updateBrewingBatch:d,fetchBrewingBatches:m,fetchBrewingProcessSteps:h}=await I(async()=>{const{updateBrewingBatch:w,fetchBrewingBatches:f,fetchBrewingProcessSteps:x}=await Promise.resolve().then(()=>j);return{updateBrewingBatch:w,fetchBrewingBatches:f,fetchBrewingProcessSteps:x}},void 0);await d(l,{status:o.value}),a.brewingBatches=await m(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await h(a.brewingBatches.map(w=>w.id)):[],A()})}),e.querySelectorAll("[data-action='proc-add-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=e.querySelector(`[data-action='proc-add-month-select'][data-cat='${l}']`),m=e.querySelector(`[data-action='proc-add-month-vol'][data-cat='${l}']`),h=parseInt(d?.value??"0"),w=parseFloat(m?.value??"0");if(!l||!h||w<=0)return;const x=[...a.brewingSchedule.filter(q=>q.brewCategory===l).map(q=>({brewMonth:q.brewMonth,durationMonths:q.durationMonths,plannedVolumeL:q.plannedVolumeL})),{brewMonth:h,durationMonths:2,plannedVolumeL:w}],{saveBrewingSchedule:k,fetchBrewingSchedule:L}=await I(async()=>{const{saveBrewingSchedule:q,fetchBrewingSchedule:N}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:q,fetchBrewingSchedule:N}},void 0);await k(l,a.brewingPlanFY,x),a.brewingSchedule=await L(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-remove-schedule']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=parseInt(o.dataset.month??"0");if(!l||!d)return;const m=a.brewingSchedule.filter(f=>f.brewCategory===l&&f.brewMonth!==d).map(f=>({brewMonth:f.brewMonth,durationMonths:f.durationMonths,plannedVolumeL:f.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:w}=await I(async()=>{const{saveBrewingSchedule:f,fetchBrewingSchedule:x}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:f,fetchBrewingSchedule:x}},void 0);await h(l,a.brewingPlanFY,m),a.brewingSchedule=await w(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-sched-remove']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=parseInt(o.dataset.month??"0");if(!l||!d)return;const m=a.brewingSchedule.filter(f=>f.brewCategory===l&&f.brewMonth!==d).map(f=>({brewMonth:f.brewMonth,durationMonths:f.durationMonths,plannedVolumeL:f.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:w}=await I(async()=>{const{saveBrewingSchedule:f,fetchBrewingSchedule:x}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:f,fetchBrewingSchedule:x}},void 0);await h(l,a.brewingPlanFY,m),a.brewingSchedule=await w(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-sched-edit-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=parseInt(o.dataset.month??"0"),m=parseFloat(o.value)||0;if(!l||!d)return;const h=a.brewingSchedule.filter(x=>x.brewCategory===l).map(x=>({brewMonth:x.brewMonth,durationMonths:x.durationMonths,plannedVolumeL:x.brewMonth===d?m:x.plannedVolumeL})),{saveBrewingSchedule:w,fetchBrewingSchedule:f}=await I(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:k}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:x,fetchBrewingSchedule:k}},void 0);await w(l,a.brewingPlanFY,h),a.brewingSchedule=await f(a.brewingPlanFY),A()})}),e.querySelectorAll("[data-action='proc-edit-vol']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=parseFloat(o.value)||0;if(!l)return;const{saveProcurementDecision:m}=await I(async()=>{const{saveProcurementDecision:h}=await Promise.resolve().then(()=>j);return{saveProcurementDecision:h}},void 0);await m(l,a.brewingPlanFY,d),a.procurementDecisions[l]=d,A()})}),e.querySelector("[data-action='proc-add-commitment']")?.addEventListener("click",async()=>{const o=(e.querySelector("#proc-commit-variety")?.value??"").trim(),l=parseFloat(e.querySelector("#proc-commit-bales")?.value??"0"),d=parseFloat(e.querySelector("#proc-commit-price")?.value??"0"),m=parseInt(e.querySelector("#proc-commit-month")?.value??"0")||null,h=(e.querySelector("#proc-commit-supplier")?.value??"").trim();if(!o||l<=0)return;const{saveRicePurchaseCommitment:w,fetchRicePurchaseCommitments:f}=await I(async()=>{const{saveRicePurchaseCommitment:x,fetchRicePurchaseCommitments:k}=await Promise.resolve().then(()=>j);return{saveRicePurchaseCommitment:x,fetchRicePurchaseCommitments:k}},void 0);await w({varietyName:o,committedBales:l,pricePerKg:d,deliveryMonth:m,supplier:h,fy:a.brewingPlanFY}),a.ricePurchaseCommitments=await f(a.brewingPlanFY),A()}),e.querySelector("[data-action='proc-add-variety']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-variety-name"),l=e.querySelector("#proc-variety-price"),d=o?.value.trim()??"",m=parseFloat(l?.value??"400")||400;if(!d)return;const{addRiceVariety:h,fetchRiceVarieties:w}=await I(async()=>{const{addRiceVariety:x,fetchRiceVarieties:k}=await Promise.resolve().then(()=>j);return{addRiceVariety:x,fetchRiceVarieties:k}},void 0);await h(d,m)&&(a.riceVarieties=await w(),o&&(o.value=""),l&&(l.value=""),F(`「${d}」を追加しました`)),A()}),e.querySelectorAll("[data-action='proc-delete-variety']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",{deleteRiceVariety:d,fetchRiceVarieties:m}=await I(async()=>{const{deleteRiceVariety:w,fetchRiceVarieties:f}=await Promise.resolve().then(()=>j);return{deleteRiceVariety:w,fetchRiceVarieties:f}},void 0);await d(l)&&(a.riceVarieties=await m()),A()})}),e.querySelectorAll("[data-action='brew-rice-variety-select']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=o.dataset.field??"",m=o.value;if(!l||!d)return;const h=a.brewingRiceParams[l]??{brewCategory:l,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[d]=m;const w=a.riceVarieties.find(x=>x.name===m);w&&(d==="kojiVariety"&&(h.kojiPricePerKg=w.defaultPricePerKg),d==="kakeVariety"&&(h.kakePricePerKg=w.defaultPricePerKg)),a.brewingRiceParams[l]=h;const{saveBrewingRiceParams:f}=await I(async()=>{const{saveBrewingRiceParams:x}=await Promise.resolve().then(()=>j);return{saveBrewingRiceParams:x}},void 0);await f(l,h),A()})}),e.querySelector("[data-action='proc-add-new-cat']")?.addEventListener("click",async()=>{const o=e.querySelector("#proc-new-cat-name"),l=e.querySelector("#proc-new-cat-vol"),d=o?.value.trim()??"",m=parseFloat(l?.value??"0");if(!d){F("区分名を入力してください","warning");return}if(m<=0){F("醸造予定量を入力してください","warning");return}const{saveBrewingSchedule:h,fetchBrewingSchedule:w}=await I(async()=>{const{saveBrewingSchedule:f,fetchBrewingSchedule:x}=await Promise.resolve().then(()=>j);return{saveBrewingSchedule:f,fetchBrewingSchedule:x}},void 0);await h(d,a.brewingPlanFY,[{brewMonth:10,durationMonths:2,plannedVolumeL:m}]),a.brewingSchedule=await w(a.brewingPlanFY),o&&(o.value=""),l&&(l.value=""),F(`「${d}」を追加しました`),A()}),e.querySelector("[data-action='brew-rice-bulk-apply']")?.addEventListener("click",async()=>{const o=parseFloat(e.querySelector("#rice-bulk-per-l")?.value??"0.50"),l=parseFloat(e.querySelector("#rice-bulk-koji")?.value??"0.30");if(isNaN(o)||isNaN(l))return;const{saveBrewingRiceParams:d}=await I(async()=>{const{saveBrewingRiceParams:w}=await Promise.resolve().then(()=>j);return{saveBrewingRiceParams:w}},void 0),m=Object.keys(a.brewingRiceParams),h=new Set([...m,...a.brewingYearlyShipments.map(w=>w.brewCategory)]);for(const w of h){const f=a.brewingRiceParams[w]??{brewCategory:w,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};f.ricePerLiterKg=o,f.kojiRatio=l,a.brewingRiceParams[w]=f,await d(w,f)}A()}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=o.dataset.field??"",m=parseFloat(o.value);if(!l||!d||isNaN(m))return;const h=a.brewingRiceParams[l]??{brewCategory:l,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[d]=m,a.brewingRiceParams[l]=h;const{saveBrewingRiceParams:w}=await I(async()=>{const{saveBrewingRiceParams:f}=await Promise.resolve().then(()=>j);return{saveBrewingRiceParams:f}},void 0);await w(l,h),A()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=parseFloat(o.value);if(!l)return;const{saveBrewingForecastOverride:m}=await I(async()=>{const{saveBrewingForecastOverride:h}=await Promise.resolve().then(()=>j);return{saveBrewingForecastOverride:h}},void 0);if(isNaN(d))await m(l,null),delete a.brewingForecastOverrides[l];else{const h=d/100;await m(l,h),a.brewingForecastOverrides[l]=h}A()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d="bc-"+encodeURIComponent(l).replace(/%/g,"-"),m=e.querySelector(`#alc-raw-${d}`),h=e.querySelector(`#alc-target-${d}`),w=parseFloat(m?.value??"18")||18,f=parseFloat(h?.value??"15")||15,{saveBrewingAlcoholSetting:x}=await I(async()=>{const{saveBrewingAlcoholSetting:L}=await Promise.resolve().then(()=>j);return{saveBrewingAlcoholSetting:L}},void 0);await x(l,w,f)&&(a.brewingAlcoholSettings[l]={brewCategory:l,rawAlcoholPct:w,targetAlcoholPct:f}),A()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.code??"",d=o.value,m=o.dataset.current??"";if(d===m)return;const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:f,fetchBrewingCategoryOverrides:x}=await I(async()=>{const{setBrewingCategoryOverride:L,fetchBrewingPlanSummary:q,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:R}=await Promise.resolve().then(()=>j);return{setBrewingCategoryOverride:L,fetchBrewingPlanSummary:q,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:R}},void 0);if(await h(l,d)){const L=a.brewingPlanFY,[q,N,R]=await Promise.all([w(`${L}-10-01`,`${L+1}-09-30`),f(`${L}-10-01`,`${L+1}-09-30`),x()]);a.brewingPlanData=q,a.brewingProductDetail=N,a.brewingOverrides=R}A()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.cat??"",d=o.value;if(!l||!d)return;const{linkTypeToCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:f,fetchCategoryTypeLinks:x}=await I(async()=>{const{linkTypeToCategory:M,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:O,fetchCategoryTypeLinks:U}=await Promise.resolve().then(()=>j);return{linkTypeToCategory:M,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:O,fetchCategoryTypeLinks:U}},void 0);await m(l,d);const k=a.brewingPlanFY,[L,q,N,R]=await Promise.all([h(`${k}-10-01`,`${k+1}-09-30`),w(`${k}-10-01`,`${k+1}-09-30`),f(),x()]);a.brewingPlanData=L,a.brewingProductDetail=q,a.brewingOverrides=N,a.brewingTypeLinks=R,A()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=o.dataset.type??"";if(!l||!d)return;const{unlinkTypeFromCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:f,fetchCategoryTypeLinks:x}=await I(async()=>{const{unlinkTypeFromCategory:M,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:O,fetchCategoryTypeLinks:U}=await Promise.resolve().then(()=>j);return{unlinkTypeFromCategory:M,fetchBrewingPlanSummary:z,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:O,fetchCategoryTypeLinks:U}},void 0);await m(l,d);const k=a.brewingPlanFY,[L,q,N,R]=await Promise.all([h(`${k}-10-01`,`${k+1}-09-30`),w(`${k}-10-01`,`${k+1}-09-30`),f(),x()]);a.brewingPlanData=L,a.brewingProductDetail=q,a.brewingOverrides=N,a.brewingTypeLinks=R,A()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const o=e.querySelector("#brew-new-category-name"),l=e.querySelector("#brew-new-category-parent"),d=o?.value.trim()??"",m=l?.value??"";if(!d)return;if(!m){F("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map(x=>x.name)].includes(d)){F("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:w}=await I(async()=>{const{addBrewingCustomCategory:x}=await Promise.resolve().then(()=>j);return{addBrewingCustomCategory:x}},void 0);await w(d,m)?(a.brewingCustomCategories.push({name:d,parentCategory:m}),o&&(o.value=""),F(`「${d}」を追加しました（${m}系）`)):F("追加に失敗しました","error"),A()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"";if(!l)return;const{deleteBrewingCustomCategory:d,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h}=await I(async()=>{const{deleteBrewingCustomCategory:f,fetchBrewingPlanSummary:x,fetchBrewingProductDetail:k}=await Promise.resolve().then(()=>j);return{deleteBrewingCustomCategory:f,fetchBrewingPlanSummary:x,fetchBrewingProductDetail:k}},void 0);if(await d(l)){a.brewingCustomCategories=a.brewingCustomCategories.filter(L=>L.name!==l);for(const[L,q]of Object.entries(a.brewingOverrides))q===l&&delete a.brewingOverrides[L];const f=a.brewingPlanFY,[x,k]=await Promise.all([m(`${f}-10-01`,`${f+1}-09-30`),h(`${f}-10-01`,`${f+1}-09-30`)]);a.brewingPlanData=x,a.brewingProductDetail=k,F(`「${l}」を削除しました`)}A()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=o.dataset.catId??"",h=e.querySelector(`#new-entry-target-${d}`)?.value??l,w=e.querySelector(`#new-entry-label-${d}`),f=e.querySelector(`#new-entry-vol-${d}`),x=w?.value.trim()??"",k=parseFloat(f?.value??"0");if(k<=0)return;const{addBrewingStockEntry:L,fetchBrewingPlanSummary:q,fetchAllBrewingStockEntries:N}=await I(async()=>{const{addBrewingStockEntry:M,fetchBrewingPlanSummary:z,fetchAllBrewingStockEntries:B}=await Promise.resolve().then(()=>j);return{addBrewingStockEntry:M,fetchBrewingPlanSummary:z,fetchAllBrewingStockEntries:B}},void 0);if(await L(h,x||`タンク${a.brewingStockEntries.filter(M=>M.brewCategory===h).length+1}`,k)){const M=a.brewingPlanFY,[z,B]=await Promise.all([q(`${M}-10-01`,`${M+1}-09-30`),N()]);a.brewingPlanData=z,a.brewingStockEntries=B}A(),requestAnimationFrame(()=>{const M=document.getElementById(`stock-display-${d}`),z=document.getElementById(`stock-edit-${d}`),B=document.querySelector(`.btn-edit-stock[data-cat-id="${d}"]`);M&&(M.style.display="none"),z&&(z.style.display=""),B&&(B.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.id??"",d=o.value;if(!l||!d)return;const{reassignBrewingStockEntry:m,fetchBrewingPlanSummary:h,fetchAllBrewingStockEntries:w}=await I(async()=>{const{reassignBrewingStockEntry:x,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:L}=await Promise.resolve().then(()=>j);return{reassignBrewingStockEntry:x,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:L}},void 0);if(await m(l,d)){const x=a.brewingPlanFY,[k,L]=await Promise.all([h(`${x}-10-01`,`${x+1}-09-30`),w()]);a.brewingPlanData=k,a.brewingStockEntries=L}A(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach(x=>{const k=document.getElementById(`stock-display-${x.dataset.catId}`),L=document.getElementById(`stock-edit-${x.dataset.catId}`);L&&L.querySelector(`[data-id="${l}"]`)&&(k&&(k.style.display="none"),L.style.display="",x.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id??"",d=o.dataset.cat??"",m="bc-"+encodeURIComponent(d).replace(/%/g,"-"),{deleteBrewingStockEntry:h,fetchBrewingPlanSummary:w,fetchAllBrewingStockEntries:f}=await I(async()=>{const{deleteBrewingStockEntry:k,fetchBrewingPlanSummary:L,fetchAllBrewingStockEntries:q}=await Promise.resolve().then(()=>j);return{deleteBrewingStockEntry:k,fetchBrewingPlanSummary:L,fetchAllBrewingStockEntries:q}},void 0);if(await h(l)){const k=a.brewingPlanFY,[L,q]=await Promise.all([w(`${k}-10-01`,`${k+1}-09-30`),f()]);a.brewingPlanData=L,a.brewingStockEntries=q}A(),requestAnimationFrame(()=>{const k=document.getElementById(`stock-display-${m}`),L=document.getElementById(`stock-edit-${m}`),q=document.querySelector(`.btn-edit-stock[data-cat-id="${m}"]`);k&&(k.style.display="none"),L&&(L.style.display=""),q&&(q.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",d=e.querySelector(`#stock-display-${l}`),m=e.querySelector(`#stock-edit-${l}`);d&&(d.style.display="none"),m&&(m.style.display=""),o.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",d=e.querySelector(`#stock-display-${l}`),m=e.querySelector(`#stock-edit-${l}`),h=e.querySelector(`.btn-edit-stock[data-cat-id="${l}"]`);d&&(d.style.display=""),m&&(m.style.display="none"),h&&(h.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.catId??"",d=e.querySelector(`#schedule-rows-${l}`);if(!d)return;const m=d.querySelectorAll(".schedule-edit-row").length,h=document.createElement("div");h.innerHTML=buildScheduleEditRowHTML(l,m,9,2,0,"");const w=h.firstElementChild;d.appendChild(w),w.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>w.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(o=>{o.addEventListener("click",()=>o.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.cat??"",d=o.dataset.catId??"",m=e.querySelector(`#stock-input-${d}`),h=parseFloat(m?.value??"");if(isNaN(h)||h<0){alert("有効な数値を入力してください");return}o.textContent="保存中...",o.setAttribute("disabled","true");try{const{upsertBrewingStock:w,fetchBrewingPlanSummary:f,fetchBrewingMonthlyTrend:x}=await I(async()=>{const{upsertBrewingStock:N,fetchBrewingPlanSummary:R,fetchBrewingMonthlyTrend:M}=await Promise.resolve().then(()=>j);return{upsertBrewingStock:N,fetchBrewingPlanSummary:R,fetchBrewingMonthlyTrend:M}},void 0),k=a.brewingPlanFY;await w(l,h,0);const[L,q]=await Promise.all([f(`${k}-10-01`,`${k+1}-09-30`),x(`${k}-10-01`,`${k+1}-09-30`)]);a.brewingPlanData=L,a.brewingMonthlyTrend=q,A()}catch(w){console.error("[brewing save]",w),alert(`保存エラー: ${String(w)}`),o.textContent="保存",o.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.toggleCat??"",d=`sub-row-${"bc-"+encodeURIComponent(l).replace(/%/g,"-")}`,m=e.querySelectorAll(`.${d}`),h=o.querySelector(".toggle-icon"),w=m[0]?.style.display!=="none";m.forEach(f=>{f.style.display=w?"none":""}),h&&(h.innerHTML=w?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{F("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{F("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(o=>{o.addEventListener("click",()=>{F("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{F("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(o=>{o.addEventListener("click",async()=>{await Ee("この買掛を入金済みにしますか？")&&F("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(o=>{o.addEventListener("click",()=>{F("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{F("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.closest("tr")?.querySelector("td")?.textContent??"";F(`タンク ${l} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{F("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(o=>{o.addEventListener("click",()=>{const l=o.closest("tr")?.querySelector("td")?.textContent??"";F(`注文 ${l} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{F("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(o=>{o.addEventListener("click",()=>{F("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{F("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.customer??"";F(`得意先 ${l} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{F("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const o=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!o||!await Ee("このリストを削除しますか？"))return;const{supabaseDelete:d}=await I(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>te);return{supabaseDelete:h}},void 0);if(await d("lead_lists",o)){const{fetchLeadLists:h}=await I(async()=>{const{fetchLeadLists:w}=await Promise.resolve().then(()=>j);return{fetchLeadLists:w}},void 0);a.leadLists=await h(),F("削除しました","success"),A()}else F("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{F("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.scYm;if(!l)return;a.shipmentCalendarYearMonth=l,a.shipmentCalendarData=null,a.shipmentCalendarPrevYearData=null,a.shipmentCalendarSelectedDate=null,A();const{fetchShipmentCalendar:d}=await I(async()=>{const{fetchShipmentCalendar:k}=await Promise.resolve().then(()=>j);return{fetchShipmentCalendar:k}},void 0),[m,h]=l.split("-").map(Number),w=`${m-1}-${String(h).padStart(2,"0")}`,[f,x]=await Promise.all([d(l),d(w)]);a.shipmentCalendarData=f,a.shipmentCalendarPrevYearData=x,A()})}),e.querySelectorAll("[data-sc-date]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.scDate;l!==void 0&&(a.shipmentCalendarSelectedDate=l?a.shipmentCalendarSelectedDate===l?null:l:null,A())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(o=>{o.addEventListener("click",async()=>{a.calendarYearMonth=o.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:l}=await I(async()=>{const{fetchCalendarEvents:d}=await Promise.resolve().then(()=>j);return{fetchCalendarEvents:d}},void 0);a.calendarEvents=await l(a.calendarYearMonth),A()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async o=>{a.calendarYearMonth=o.target.value;const{fetchCalendarEvents:l}=await I(async()=>{const{fetchCalendarEvents:d}=await Promise.resolve().then(()=>j);return{fetchCalendarEvents:d}},void 0);a.calendarEvents=await l(a.calendarYearMonth),A()}),e.querySelector("#cal-filter-category")?.addEventListener("change",o=>{a.calendarFilterCategory=o.target.value,A()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const o=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(o.getTime()+3600*1e3).toISOString(),isAllDay:!1}},A()}),e.querySelectorAll("[data-cal-date]").forEach(o=>{o.tagName!=="BUTTON"&&o.addEventListener("click",l=>{if(l.target.closest(".cal-event"))return;const d=o.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${d}T10:00:00`,isAllDay:!1}},A()})}),e.querySelectorAll("[data-cal-event-id]").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const d=o.dataset.calEventId,m=a.calendarEvents.find(h=>h.id===d);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},A())})}),e.querySelectorAll("[data-action='cal-close']").forEach(o=>{o.addEventListener("click",l=>{l.currentTarget!==l.target&&!l.target.matches("button")||(a.calendarEdit=null,A())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:o,fetchCalendarEvents:l,CALENDAR_CATEGORY_COLORS:d}=await I(async()=>{const{saveCalendarEvent:x,fetchCalendarEvents:k,CALENDAR_CATEGORY_COLORS:L}=await Promise.resolve().then(()=>j);return{saveCalendarEvent:x,fetchCalendarEvents:k,CALENDAR_CATEGORY_COLORS:L}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,h=e.querySelector("#cal-category")?.value??"general",w={id:m,title:e.querySelector("#cal-title")?.value??"",category:h,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:d[h]};if(!w.title){F("タイトルは必須です","warning");return}await o(w)?(a.calendarEvents=await l(a.calendarYearMonth),a.calendarEdit=null,F("保存しました"),A()):F("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const o=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!o||!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:l,fetchCalendarEvents:d}=await I(async()=>{const{deleteCalendarEvent:h,fetchCalendarEvents:w}=await Promise.resolve().then(()=>j);return{deleteCalendarEvent:h,fetchCalendarEvents:w}},void 0);await l(o)?(a.calendarEvents=await d(a.calendarYearMonth),a.calendarEdit=null,F("削除しました"),A()):F("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,A();try{const o=a.importPreview.rows.filter(d=>d._valid),l=await Po(a.importEntity,o);a.importResult=`取り込み完了: ${l.inserted}件成功 / ${l.failed}件失敗`,a.importPreview=null}catch(o){a.importResult=`エラー: ${o instanceof Error?o.message:String(o)}`}finally{a.importing=!1,A()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const o=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=o,a.storeSales=[],a.actionLoading=!0,A(),rn(o).then(l=>{a.storeSales=l,a.actionLoading=!1,A()})}),e.querySelectorAll("[data-action='copy-config']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.configValue??"";if(l)try{await navigator.clipboard.writeText(l),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(d){console.warn("Clipboard copy failed",d)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const l=JSON.stringify({supabase_url:ve,supabase_anon_key:ce,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),d=new Blob([l],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(d),h=document.createElement("a");h.href=m,h.download="relay_config.json",h.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.code??"";if(l)try{await navigator.clipboard.writeText(decodeURIComponent(l)),o.textContent="コピー済み",window.setTimeout(()=>{o.textContent="コピー"},1600)}catch(d){console.warn("Clipboard code copy failed",d)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(o=>{o.addEventListener("change",()=>{We(e),a.emailSaveMessage=null,A()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(o=>{o.addEventListener("change",()=>{We(e),a.emailSaveMessage=null,A()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{We(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{We(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(o=>{o.addEventListener("click",()=>{a.emailTemplateId=o.dataset.templateId??"custom";const l=qo(a.emailTemplateId);a.emailSubject=l.subject,a.emailBody=l.body,a.emailSaveMessage=null,A()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{We(e);const o=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${o}`),a.emailSaveMessage=null,A()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{We(e),a.actionLoading=!0,A(),Ht(La("draft")).then(o=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(o.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,A()})}),e.querySelector("#email-sender")?.addEventListener("change",o=>{a.emailSenderId=o.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{We(e),a.actionLoading=!0,a.emailSending=!0,A();const o=La("sent");a.mailSenders.find(l=>l.id===a.emailSenderId),Us().then(async l=>{await Ht({...o,recipientCount:l.sent}),a.emailSaveMessage=`${l.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,A(),F(`${l.sent}件送信完了`)}).catch(async()=>{await Ht(La("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,A(),F("APIキー未設定のため下書き保存しました","warning")})}),e.querySelectorAll(".feature-checkbox").forEach(o=>{o.addEventListener("change",async()=>{const l=o.dataset.featureId;if(!l)return;const d=a.myProfile?.name??a.myProfile?.email??"不明";o.checked?await to(l,d):await ao(l),a.featureStatuses=await sa(),A()})})}function A(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=om()}catch(s){console.error("[renderApp] render error:",s),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(s)}

${s?.stack??""}</div>`;return}const t=e.querySelector(".app-page-title");document.title=t?.textContent?`${t.textContent} | 酒仙iクラウド`:"酒仙iクラウド",lm(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),wn()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const s of["fd-scaler","print-scaler","q-preview-scaler"]){const r=e.querySelector(`#${s}`),i=r?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),c=i?.querySelector(".print-page")??i;if(!r||!c)continue;const p=r.parentElement?.clientWidth??0,u=c.offsetWidth;if(p>0&&u>0&&u>p-24){const y=(p-24)/u;r.style.transform=`scale(${y})`,r.style.transformOrigin="top left",r.style.height=`${(c.offsetHeight+48)*y}px`}else r.style.transform="",r.style.height=""}});const n=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=n?"hidden":"",document.body.style.touchAction=n?"none":""}const Bo="sake-cloud-cache",cm=300*1e3;function dm(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(Bo,JSON.stringify(e))}catch{}}function pm(){try{const e=localStorage.getItem(Bo);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>cm?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let jo=0;async function lt(){const e=pm();e&&(a.loading=!1,A()),a.loading=!e,e||A();try{const[t,n,s,r,i,c,p]=await Promise.all([gs(),fs(),Ga(),vs(),Pt(a.invoiceFilter),Za(),hs("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=s,a.pipelineMeta=r,a.invoiceRecords=i,a.salesAnalytics=c,p){const u={...Wt,...Ra(),...p};a.quoteCompanySettings=u,Xe(u)}if(it.length===0&&zu(),!a.salesFilter.startDate||!a.salesFilter.endDate){const y=[...t.salesRecords].sort(($,E)=>new Date(E.date).getTime()-new Date($.date).getTime())[0]?.date??new Date().toISOString(),v=new Date(y),g=new Date(v);g.setDate(v.getDate()-30),a.salesFilter={startDate:is(g.toISOString()),endDate:is(v.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await Pt(a.invoiceFilter)),a.error=null,dm()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,A(),At(a.route),jo=Date.now()}}window.addEventListener("popstate",()=>{a.route=To(location.pathname),a.currentCategory=ma(a.route),a.sidebarOpen=!1,Et(),At(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,A();return}if(e.key==="Escape"){if(a.globalSearchOpen){Et(),A();return}if(a.pickerMode){ia(),A();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Io(),A());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&Mo(t)}});a.user=la()?Ho():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await I(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>j);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),A()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,s=0,r=0,i=0,c=1;document.addEventListener("mousedown",p=>{const u=p.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;p.preventDefault();const y=u.closest(".fd-canvas");if(!y)return;const v=y.getBoundingClientRect();if(v.width===0)return;c=228.6/v.width,t=u,n=p.clientX,s=p.clientY,r=parseFloat(u.style.left)||0,i=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(_=>_.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const g=document.querySelector("#fd-selected-info");g&&(g.textContent=`選択中: ${u.title}`);const $=document.querySelector("#fd-sel-x"),E=document.querySelector("#fd-sel-y");$&&($.value=String(r)),E&&(E.value=String(i))}),document.addEventListener("mousemove",p=>{if(!t)return;const u=(p.clientX-n)*c,y=(p.clientY-s)*c,v=Math.round((r+u)*2)/2,g=Math.round((i+y)*2)/2;t.style.left=v+"mm",t.style.top=g+"mm";const $=document.querySelector("#fd-sel-x"),E=document.querySelector("#fd-sel-y");$&&($.value=String(v)),E&&(E.value=String(g))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",p=>{if(!a.fdDesignMode||!a.fdActiveFieldId||p.key!=="ArrowLeft"&&p.key!=="ArrowRight"&&p.key!=="ArrowUp"&&p.key!=="ArrowDown"||p.target.tagName==="INPUT"||p.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;p.preventDefault();const y=.5;let v=parseFloat(u.style.left)||0,g=parseFloat(u.style.top)||0;p.key==="ArrowLeft"?v-=y:p.key==="ArrowRight"?v+=y:p.key==="ArrowUp"?g-=y:p.key==="ArrowDown"&&(g+=y),u.style.left=v+"mm",u.style.top=g+"mm";const $=document.querySelector("#fd-sel-x"),E=document.querySelector("#fd-sel-y");$&&($.value=String(v)),E&&(E.value=String(g))})})();let Da=null,Jt=[],cs=null;function um(e){const t=window.google?.maps;if(!t){console.warn("Google Maps not loaded");return}const n=e.querySelector("#customer-map"),s=e.querySelector("#map-data");if(!n||!s)return;const r=JSON.parse(decodeURIComponent(s.dataset.customers??"[]")),i=JSON.parse(decodeURIComponent(s.dataset.deliveries??"[]"));Da||(Da=new t.Map(n,{center:{lat:35.38,lng:139.25},zoom:10,gestureHandling:"greedy",streetViewControl:!1,mapTypeControl:!1}),cs=new t.InfoWindow);const c=Da,p=cs;function u($){return $.isAtRisk?"#e53e3e":$.isDormant?"#dd6b20":$.amount12m>0?"#2563eb":"#aaa"}function y($,E=32){const _=`<svg xmlns="http://www.w3.org/2000/svg" width="${E}" height="${E}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${$}" stroke="white" stroke-width="2.5"/></svg>`;return{url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(_),scaledSize:new t.Size(E,E),anchor:new t.Point(E/2,E/2)}}function v(){Jt.forEach($=>$.setMap(null)),Jt=[]}function g($,E,_){v();const D=new t.LatLngBounds;let P=!1;r.filter(S=>!($==="at-risk"&&!S.isAtRisk||$==="dormant"&&(S.isAtRisk||!S.isDormant)||$==="active"&&(S.isAtRisk||S.isDormant||S.amount12m===0)||$==="inactive"&&(S.isAtRisk||S.isDormant||S.amount12m>0)||E&&S.areaCode!==E||_&&(S.businessTypeName||S.businessType)!==_)).forEach(S=>{if(!S.lat||!S.lng)return;const o={lat:S.lat,lng:S.lng};D.extend(o),P=!0;const l=new t.Marker({map:c,position:o,icon:y(u(S),28),title:S.name});l.addListener("click",()=>{p.setContent(`<div style="font-size:13px;max-width:260px;">
          <strong>${S.name}</strong><br>${S.address1??""}<br>
          エリア: ${S.areaCode??"―"} / ${S.businessTypeName??S.businessType??"―"}<br>
          12ヶ月売上: <strong>${S.amount12m?.toLocaleString()??0}円</strong></div>`),p.open(c,l)}),Jt.push(l)}),i.forEach(S=>{if(!S.lat||!S.lng)return;const o={lat:S.lat,lng:S.lng};D.extend(o),P=!0;const l=new t.Marker({map:c,position:o,icon:y("#FF9800",22),title:S.name});l.addListener("click",()=>{p.setContent(`<div style="font-size:13px;"><strong>${S.name}</strong><br>${S.address??""}${S.phone?`<br>${S.phone}`:""}</div>`),p.open(c,l)}),Jt.push(l)}),P&&c.fitBounds(D,{top:40,bottom:40,left:40,right:40})}g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz),e.querySelectorAll("[data-map-status]").forEach($=>{$.addEventListener("click",()=>{const E=$.dataset.mapStatus;a.mapFilters={...a.mapFilters,filterStatus:E},e.querySelectorAll("[data-map-status]").forEach(_=>{_.className=_.className.replace(/\b(primary|secondary)\b/g,_===$?"primary":"secondary")}),g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)})}),e.querySelector("#map-filter-area")?.addEventListener("change",$=>{a.mapFilters={...a.mapFilters,filterArea:$.target.value},g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#map-filter-biz")?.addEventListener("change",$=>{a.mapFilters={...a.mapFilters,filterBiz:$.target.value},g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#btn-geocode")?.addEventListener("click",async()=>{const $=e.querySelector("#btn-geocode"),E=e.querySelector("#geocode-progress"),_=e.querySelector("#geocode-status"),D=e.querySelector("#geocode-bar");$&&($.disabled=!0),E&&(E.style.display="block");try{const{batchGeocode:P}=await I(async()=>{const{batchGeocode:S}=await Promise.resolve().then(()=>j);return{batchGeocode:S}},void 0),C=await P((S,o,l)=>{_&&(_.textContent=`${S}/${o} — ${l}`),D&&(D.style.width=`${Math.round(S/Math.max(o,1)*100)}%`)});_&&(_.textContent=`完了: ${C.success}件成功 / ${C.failed}件失敗`),D&&(D.style.width="100%"),setTimeout(()=>{window.location.reload()},3e3)}catch(P){_&&(_.textContent="エラーが発生しました: "+String(P))}})}lt();const mm=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&lt()},mm);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-jo>60*1e3&&lt()});let Ka="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{Ka=e}).catch(()=>{});setInterval(async()=>{if(!(!Ka||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==Ka&&!a.updateAvailable&&(a.updateAvailable=!0,A())}catch{}},120*1e3);export{I as _};
