(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const Uo="modulepreload",Yo=function(e){return"/"+e},xn={},I=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let u=function(y){return Promise.all(y.map(f=>Promise.resolve(f).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=c?.nonce||c?.getAttribute("nonce");r=u(n.map(y=>{if(y=Yo(y),y in xn)return;xn[y]=!0;const f=y.endsWith(".css"),g=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${g}`))return;const $=document.createElement("link");if($.rel=f?"stylesheet":Uo,f||($.as="script"),$.crossOrigin="",$.href=y,d&&$.setAttribute("nonce",d),document.head.appendChild($),f)return new Promise((P,_)=>{$.addEventListener("load",P),$.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${y}`)))})}))}function l(c){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=c,window.dispatchEvent(d),!d.defaultPrevented)throw c}return r.then(c=>{for(const d of c||[])d.status==="rejected"&&l(d.reason);return t().catch(l)})},fe="https://ridspyczkxwkcbmwndhm.supabase.co",Jo="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHNweWN6a3h3a2NibXduZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzkwODAsImV4cCI6MjA5MzUxNTA4MH0.ppWbfEsrUdUL8sRPO3BPHWA-r12ueMgJ3C44n1FvK3o",ce=Jo;async function Pe(e,t){try{const n=new URL(`/rest/v1/${e}`,fe),o=await fetch(n.toString(),{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function Ct(e,t){try{const n=new URL(`/rest/v1/${e}`,fe),o=await fetch(n.toString(),{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function je(e,t,n){try{const o=new URL(`/rest/v1/${e}?id=eq.${t}`,fe);return(await fetch(o.toString(),{method:"PATCH",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function me(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,fe),o=await fetch(n.toString(),{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function Qa(e){try{const t=new URL(`/rest/v1/${e}`,fe);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:ce,Authorization:`Bearer ${ce}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const o=n.headers.get("Content-Range");if(o){const r=o.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function U(e,t={}){try{const n=new URL(`/rest/v1/${e}`,fe);Object.entries(t).forEach(([r,l])=>{n.searchParams.set(r,l)});const o=await fetch(n.toString(),{method:"GET",headers:{apikey:ce,Authorization:`Bearer ${ce}`,Accept:"application/json",Prefer:"return=representation"}});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function ps(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,fe);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:ce,Authorization:`Bearer ${ce}`}})).ok}catch{return!1}}async function ve(e,t={},n=1e3){const o=[];let r=0;try{for(;;){const l=new URL(`/rest/v1/${e}`,fe);Object.entries(t).forEach(([u,y])=>{l.searchParams.set(u,y)}),l.searchParams.set("limit",String(n)),l.searchParams.set("offset",String(r));const c=await fetch(l.toString(),{method:"GET",headers:{apikey:ce,Authorization:`Bearer ${ce}`,Accept:"application/json",Prefer:"return=representation"}});if(!c.ok)throw new Error(`HTTP ${c.status}`);const d=await c.json();if(o.push(...d),d.length<n)break;r+=n}return o}catch(l){return console.warn(`Failed to query all rows from Supabase table ${e}`,l),o.length>0?o:[]}}const ee=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:ce,SUPABASE_URL:fe,supabaseCount:Qa,supabaseDelete:ps,supabaseInsert:Pe,supabaseQuery:U,supabaseQueryAll:ve,supabaseRpc:me,supabaseUpdate:je,supabaseUpsert:Ct},Symbol.toStringTag,{value:"Module"})),Wa="sake_auth";function us(e){localStorage.setItem(Wa,JSON.stringify(e))}function ms(){return{apikey:ce,"Content-Type":"application/json"}}function Ko(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),o=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(o))}catch{return null}}async function ys(e,t){const n=await fetch(`${fe}/auth/v1/${e}`,{method:"POST",headers:ms(),body:JSON.stringify(t)}),o=await n.json().catch(()=>({}));if(!n.ok)throw new Error(o.error_description??o.msg??`HTTP ${n.status}`);return o}async function Ho(e,t){const n=await ys("token?grant_type=password",{email:e,password:t});return us({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function $n(e,t){const n=await ys("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&us({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function Qo(){const e=da();if(localStorage.removeItem(Wa),!!e?.access_token)try{await fetch(`${fe}/auth/v1/logout`,{method:"POST",headers:{...ms(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function da(){const e=localStorage.getItem(Wa);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function Wo(){const e=da();if(!e)return null;const t=Ko(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function Go(e){const t=da();if(!t)throw new Error("not signed in");const n=await fetch(`${fe}/auth/v1/user`,{method:"PUT",headers:{apikey:ce,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const o=await n.json().catch(()=>({}));throw new Error(o.msg??`HTTP ${n.status}`)}}const Ga={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},hs={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},Xo={generatedAt:new Date().toISOString(),records:[]},Ue={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},Zo={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},er={},tr={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function re(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function ar(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function nr(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function v(e,t,n=""){for(const o of t){const r=e[o];if(typeof r=="string"&&r.length>0)return r}return n}function q(e,t,n=0){for(const o of t)if(o in e)return re(e[o]);return n}function be(e,t,n=!0){for(const o of t)if(o in e)return nr(e[o]);return n}function ge(e,t,n){for(const o of t){const r=e[o];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const l=new Date(r);if(!Number.isNaN(l.getTime()))return l.toISOString()}return n}function sr(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:ge(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:re(e.total_amount??e.billed_amount)}}function _n(e){const t=e.trim().toUpperCase(),n=er[t];if(n)return n;const o=hs.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:o?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function gs(e){try{return(await U("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function st(e,t){await Ct("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function fs(){const e=new Date;e.setFullYear(e.getFullYear()-1);const t=e.toISOString().slice(0,10),n=await U("daily_sales_fact",{select:"sales_date,sales_amount,total_quantity,document_count",order:"sales_date.desc",sales_date:`gte.${t}`,limit:"400"}),o=new Map;for(const l of n){const c=String(l.sales_date??"");if(!c)continue;const d=o.get(c)??{amount:0,qty:0,docs:0};d.amount+=re(l.sales_amount),d.qty+=re(l.total_quantity),d.docs+=re(l.document_count),o.set(c,d)}const r=Array.from(o.entries()).map(([l,c])=>({sales_date:l,sales_amount:c.amount,amount:c.amount,document_count:c.docs,bottles:c.qty,volume_ml:0,price_per_bottle:c.qty>0?Math.round(c.amount/c.qty):0,price_per_liter:0})).sort((l,c)=>c.sales_date.localeCompare(l.sales_date));if(r.length>0){const l=new Date().toISOString().slice(0,7);$s(l).catch(()=>{});const[c,d]=await Promise.all([U("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),U("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),y=new Date().toISOString().slice(0,10),f=y.slice(0,7),g=[...r].sort((s,i)=>s.sales_date.localeCompare(i.sales_date)).map(s=>({date:new Date(`${s.sales_date}T00:00:00Z`).toISOString(),amount:re(s.amount??s.sales_amount),bottles:re(s.bottles),volumeMl:re(s.volume_ml),pricePerBottle:re(s.price_per_bottle),pricePerLiter:re(s.price_per_liter)})),$=g.slice(-30),P=s=>re(s.amount??s.sales_amount),_=r.reduce((s,i)=>i.sales_date===y?s+P(i):s,0),D=r.reduce((s,i)=>i.sales_date.startsWith(f)?s+P(i):s,0),k=c.filter(s=>re(s.balance_amount)>0),L=d.map((s,i)=>({id:String(s.id??`sale-${i+1}`),documentNo:s.document_no??s.legacy_document_no??"",date:s.sales_date??"",customerCode:s.legacy_customer_code??"",customerName:s.customer_name??s.legacy_customer_code??"",amount:re(s.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:_,todayDelta:0,monthSales:D,monthDelta:0,unpaidCount:k.length,unpaidAmount:k.reduce((s,i)=>s+re(i.balance_amount),0)},dailySales:$,allDailySales:g,salesRecords:L}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),hs}async function vs(){const e=await U("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status",limit:"1000"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const o=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${o}-${n+1}`,customerCode:o,customerName:o,billedAmount:re(t.billed_amount),paymentAmount:re(t.paid_amount),balanceAmount:re(t.balance_amount),lastPaymentDate:null,status:ar(t.payment_status)}})}:Xo}async function Xa(){const[e,t]=await Promise.all([U("customers",{limit:"1000"}),U("products",{limit:"1000"})]);if(e.length>0||t.length>0){const n=e.length?e.map((r,l)=>{const c=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:v(r,["id","customer_id","code"],`customer-${l+1}`),code:v(r,["code","customer_code","legacy_customer_code"],`C${String(l+1).padStart(4,"0")}`),name:v(r,["name","customer_name","display_name"],`Customer ${l+1}`),kanaName:v(r,["kana_name"],""),shortName:v(r,["short_name"],""),postalCode:v(r,["postal_code"],""),address1:v(r,["address1"],""),address2:v(r,["address2"],""),phone:v(r,["phone"],""),fax:v(r,["fax"],""),email:v(r,["email"],""),staffCode:v(r,["staff_code"],""),businessType:v(r,["business_type"],""),areaCode:v(r,["delivery_area_code"],""),salesCategory:String(c.sales_category??""),closingDay:q(r,["closing_day","close_day"],31),paymentDay:q(r,["payment_day","due_day"],15),paymentMonth:Number(c.payment_month??0),paymentCycle:v(r,["payment_cycle"],""),billingCycleType:v(r,["billing_cycle_type"],""),billingCode:String(c.billing_code??""),creditLimit:q(r,["credit_limit"],0),taxMode:v(r,["tax_mode"],""),taxRound:String(c.tax_round??""),invoiceIssue:String(c.invoice_issue??""),invoiceType:v(r,["invoice_type"],""),priceGroup:String(c.price_group??""),priceType:String(c.price_type??""),tradeType:(()=>{const d=v(r,["trade_type"],"");if(d)return d;const u=String(c.price_type??"");return u==="000"?"B2B2C":u==="001"?"B2C":"B2B"})(),customerGroup1:String(c.customer_group1??""),customerGroup2:String(c.customer_group2??""),bankName:v(r,["bank_name"],""),bankBranch:v(r,["bank_branch"],""),bankAccount:v(r,["bank_account"],""),isActive:be(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):Ue.customers,o=t.length?t.map((r,l)=>({id:v(r,["id","product_id","product_code","legacy_product_code"],`product-${l+1}`),code:v(r,["product_code","legacy_product_code","code"],`P${String(l+1).padStart(5,"0")}`),janCode:v(r,["jan_code","jan","barcode"],""),name:v(r,["name","product_name","display_name"],`Product ${l+1}`),kanaName:v(r,["kana_name"],""),shortName:v(r,["short_name"],""),category:v(r,["category_code","category","category_name"],"未分類"),taxCategoryCode:v(r,["tax_code","tax_category_code"],""),isActive:be(r,["is_active","active","enabled"],!0),listPrice:q(r,["list_price"],0),purchasePrice:q(r,["purchase_price"],0),salePrice:q(r,["default_sale_price","sale_price"],0),costPrice:q(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:v(r,["unit_name","unit"],"本"),caseQty:r.case_qty!=null?Number(r.case_qty):null,bottleType:v(r,["bottle_type"],""),containerCode:v(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:v(r,["rice_type"],""),season:v(r,["season"],""),agingYears:q(r,["aging_years"],0)})):Ue.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||Ue.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:Ue.summary.activeCustomerCount,productCount:t.length||Ue.summary.productCount,activeProductCount:t.length?o.filter(r=>r.isActive).length:Ue.summary.activeProductCount},customers:n,products:o}}return Ue}async function bs(){const[e,t]=await Promise.all([U("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),U("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?ge(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const o=e[0],r=v(o,["status"],"success"),l=o.errors,c=Array.isArray(l)?l.length>0:!!l;return{generatedAt:new Date().toISOString(),lastSyncAt:ge(o,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:c?"warning":r==="error"?"error":"success",jobName:v(o,["agent_hostname"],"sake-relay"),message:`${q(o,["rows_upserted"],0)}行同期 / ${q(o,["files_updated"],0)}ファイル更新`}}return{...Zo,lastDataAt:n}}async function ws(){const e=await me("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function xs(){const e=[{name:"売上明細 (SHTOR)",table:"sales_document_lines",countFilter:"note=like.*src:diff*",expectMin:2e5},{name:"伝票ヘッダ (SHDEN)",table:"sales_document_headers",expectMin:5e4},{name:"日次売上集計",table:"daily_sales_fact",expectMin:1e5},{name:"商品月別売上",table:"product_monthly_sales",expectMin:1e4},{name:"得意先マスタ",table:"customers",expectMin:500},{name:"商品マスタ",table:"products",expectMin:1e3},{name:"安全在庫",table:"product_safety_stock_params",expectMin:0}],t=[];for(const n of e)try{const o=n.countFilter?`&${n.countFilter}`:"",r=`${fe}/rest/v1/${n.table}?select=id&limit=0${o}`,c=(await fetch(r,{headers:{apikey:ce,Authorization:`Bearer ${ce}`,Prefer:"count=exact"}})).headers.get("content-range")??"*/0",d=parseInt(c.split("/").pop()??"0",10)||0,u=d>=n.expectMin?"ok":d>0?"warn":"error";t.push({name:n.name,table:n.table,count:d,status:u,detail:d>=n.expectMin?"正常稼働":d>0?"データ少":"データなし"})}catch{t.push({name:n.name,table:n.table,count:0,status:"error",detail:"接続エラー"})}return t}async function Et(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];if(e.customerCode.trim()){const r=e.customerCode.trim();n.push(`customer_code.ilike.*${r}*`,`legacy_customer_code.ilike.*${r}*`,`customer_name.ilike.*${r}*`)}e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const o=await U("sales_document_headers",t);return o.length>0?o.map((r,l)=>({id:v(r,["id"],`invoice-${l}`),documentNo:v(r,["document_no","legacy_document_no"],""),date:ge(r,["sales_date"],""),customerCode:v(r,["legacy_customer_code","customer_code"],""),customerName:v(r,["customer_name","legacy_customer_code"],""),itemCount:q(r,["line_count"],0),amount:q(r,["total_amount","billed_amount"],0)})):[]}const _t=new Map;async function $s(e){_t.clear();const t=await ve("sales_document_lines",{select:"document_no,line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*date:${e}*`,order:"document_no,line_no"});for(const n of t){const o=v(n,["document_no"],"");if(!o)continue;const r=_t.get(o)??[];r.push({lineNo:q(n,["line_no"],0),productCode:v(n,["legacy_product_code"],""),productName:v(n,["product_name"],""),quantity:q(n,["quantity"],0),unitPrice:q(n,["unit_price"],0),amount:q(n,["amount"],0)}),_t.set(o,r)}}async function Ia(e){const t=_t.get(e);if(t)return t;const o=(await U("sales_document_lines",{select:"line_no,legacy_product_code,product_name,quantity,unit_price,amount",note:`like.*inv:${e} *`,order:"line_no",limit:"100"})).map(r=>({lineNo:q(r,["line_no"],0),productCode:v(r,["legacy_product_code"],""),productName:v(r,["product_name"],""),quantity:q(r,["quantity"],0),unitPrice:q(r,["unit_price"],0),amount:q(r,["amount"],0)}));return _t.set(e,o),o}async function Za(e){const t=e.trim().toUpperCase();if(!t)return _n("");const[n,o,r]=await Promise.all([U("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t},customer_name.ilike.*${t}*`,order:"sales_date.desc",limit:"50"}),U("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),U("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||o.length>0){const l=n.map((u,y)=>{const f=sr(u,y);return{id:f.id,date:f.date,documentNo:f.documentNo,amount:f.amount}}),c=o.map((u,y)=>({id:String(u.id??`payment-${y+1}`),date:ge(u,["payment_date","received_date"],new Date().toISOString()),amount:re(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),d=r.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:re(d?.balance_amount),salesTotal:l.reduce((u,y)=>u+y.amount,0),paymentTotal:c.reduce((u,y)=>u+y.amount,0),salesHistory:l,paymentHistory:c}}return _n(t)}async function en(){const[e,t,n,o]=await Promise.all([U("mv_monthly_sales",{order:"month.asc"}),U("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),U("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),U("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(r=>({month:v(r,["month"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),volumeMl:q(r,["volume_ml"],0)})),productTotals:n.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),documents:q(r,["documents"],0),volumeMl:q(r,["volume_ml"],0)})),customerTotals:t.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),documents:q(r,["documents"],0),volumeMl:q(r,["volume_ml"],0)})),staffTotals:o.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),documents:q(r,["documents"],0),volumeMl:0}))}:tr}async function or(e,t,n){if(t==="all")return[];const o=n?_s(t,n):null,l=await me(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:o?.from??null,p_date_to:o?.to??null});return l?l.map(c=>({code:v(c,["code"],""),name:v(c,["name"],""),amount:q(c,["amount"],0),quantity:q(c,["quantity"],0),documents:q(c,["documents"],0),volumeMl:q(c,["volume_ml"],0)})):[]}async function rr(e,t){if(t==="all")return[];const n=await me("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(o=>o.period_val).filter(Boolean)}function _s(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,o]=t.split("-").map(Number),r=`${n}-${String(o).padStart(2,"0")}-01`,l=new Date(n,o,0).getDate(),c=`${n}-${String(o).padStart(2,"0")}-${String(l).padStart(2,"0")}`;return{from:r,to:c}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const o=parseInt(n[1]),r=parseInt(n[2]),l=new Date(o,0,4),c=l.getDay()||7,d=new Date(l);d.setDate(l.getDate()-c+1);const u=new Date(d);u.setDate(d.getDate()+(r-1)*7);const y=new Date(u);return y.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:y.toISOString().slice(0,10)}}return null}function Ss(e){return e.map(t=>({staffCode:v(t,["staff_code"],""),staffName:v(t,["staff_name"],""),code:v(t,["code"],""),name:v(t,["name"],""),tag:v(t,["tag"],""),amount:q(t,["amount"],0),quantity:q(t,["quantity"],0),documents:q(t,["documents"],0)}))}async function ir(e,t){const n=await me("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(o=>({code:v(o,["code"],""),name:v(o,["name"],""),amount:q(o,["amount"],0),quantity:q(o,["quantity"],0),documents:q(o,["documents"],0)})):[]}async function lr(e,t,n){const o=await me("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?Ss(o):[]}async function cr(e,t,n){const o=await me("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?Ss(o):[]}async function dr(e,t){if(e==="all"||!t)return[];const n=await me("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(o=>({month:v(o,["label"],""),amount:q(o,["amount"],0),quantity:q(o,["quantity"],0),volumeMl:q(o,["volume_ml"],0)})):[]}function pr(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function ur(e,t,n){const o=await me("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),tag:v(r,["tag"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),documents:q(r,["documents"],0),volumeMl:q(r,["volume_ml"],0)})):[]}async function mr(e,t,n){const o=await me("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(r=>({code:v(r,["code"],""),name:v(r,["name"],""),tag:v(r,["tag"],""),amount:q(r,["amount"],0),quantity:q(r,["quantity"],0),documents:q(r,["documents"],0),volumeMl:q(r,["volume_ml"],0)})):[]}async function yr(e,t){const n=await me("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(o=>({month:v(o,["month"],""),amount:q(o,["amount"],0),quantity:q(o,["quantity"],0),volumeMl:q(o,["volume_ml"],0)})):[]}async function hr(e,t){const n=await me("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({brewCategory:v(o,["brew_category"],""),subCategory:v(o,["sub_category"],""),productCount:q(o,["product_count"],0),totalShipmentQty:q(o,["total_shipment_qty"],0),totalShipmentMl:q(o,["total_shipment_ml"],0),monthlyAvgQty:q(o,["monthly_avg_qty"],0),monthlyAvgMl:q(o,["monthly_avg_ml"],0),currentStockL:q(o,["current_stock_l"],0),monthsRemaining:q(o,["months_remaining"],0),costPerL:q(o,["cost_per_l"],0)})):[]}async function gr(e,t){const n=await me("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({month:v(o,["month"],""),brewCategory:v(o,["brew_category"],""),shipmentMl:q(o,["shipment_ml"],0)})):[]}async function fr(e,t){const n=await me("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({brewCategory:v(o,["brew_category"],""),subCategory:v(o,["sub_category"],""),productCode:v(o,["product_code"],""),productName:v(o,["product_name"],""),volumeMl:q(o,["volume_ml"],0),annualQty:q(o,["annual_qty"],0),annualMl:q(o,["annual_ml"],0),monthlyAvgQty:q(o,["monthly_avg_qty"],0),monthlyAvgMl:q(o,["monthly_avg_ml"],0)})):[]}async function vr(e){return(await U("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),fy:q(n,["fy"],e),brewMonth:q(n,["brew_month"],0),durationMonths:q(n,["duration_months"],2),plannedVolumeL:q(n,["planned_volume_l"],0),notes:v(n,["notes"],"")}))}async function br(e,t,n){return await me("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(r=>({brew_month:r.brewMonth,duration_months:r.durationMonths,planned_volume_l:r.plannedVolumeL,notes:r.notes??null}))})!==null}async function wr(e,t,n,o){return await Ct("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:o??null,updated_at:new Date().toISOString()})!==null}async function xr(){const e=await U("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const o=v(n,["category_name"],""),r=v(n,["production_type_name"],"");!o||!r||(t[o]||(t[o]=[]),t[o].push(r))}return t}async function $r(e,t){return await me("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function _r(e,t){return await me("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function Sr(){const e=await U("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>v(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function kr(){const e=await U("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const o=v(n,["brew_category"],"");o&&(t[o]={brewCategory:o,rawAlcoholPct:q(n,["raw_alcohol_pct"],18),targetAlcoholPct:q(n,["target_alcohol_pct"],15)})}return t}async function Pr(e,t,n){const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0);return r?(await fetch(`${o}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function Er(){const e=await me("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:q(t,["fy"],0),brewCategory:v(t,["brew_category"],""),shipmentL:q(t,["shipment_l"],0),monthsElapsed:q(t,["months_elapsed"],12),annualizedL:q(t,["annualized_l"],0)})):[]}async function Ar(){const e=await U("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const o=v(n,["brew_category"],""),r=q(n,["growth_rate"],NaN);o&&!isNaN(r)&&(t[o]=r)}return t}async function Lr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await I(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return o?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function Cr(){const e=await U("brewing_rice_params",{}),t={};for(const n of e??[]){const o=v(n,["brew_category"],"");o&&(t[o]={brewCategory:o,polishingRatio:q(n,["polishing_ratio"],.7),ricePerLiterKg:q(n,["rice_per_liter_kg"],.5),kojiRatio:q(n,["koji_ratio"],.3),kojiVariety:v(n,["koji_variety"],"山田錦"),kojiPricePerKg:q(n,["koji_price_per_kg"],600),kakeVariety:v(n,["kake_variety"],"一般米"),kakePricePerKg:q(n,["kake_price_per_kg"],350),alcoholAdditionRatio:q(n,["alcohol_addition_ratio"],0)})}return t}async function Dr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await I(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return o?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,koji_ratio:t.kojiRatio,koji_variety:t.kojiVariety,koji_price_per_kg:t.kojiPricePerKg,kake_variety:t.kakeVariety,kake_price_per_kg:t.kakePricePerKg,alcohol_addition_ratio:t.alcoholAdditionRatio??0,updated_at:new Date().toISOString()})})).ok:!1}async function qr(){const e=await me("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:v(t,["brew_category"],""),monthNum:q(t,["month_num"],0),avgMonthlyL:q(t,["avg_monthly_l"],0)})):[]}async function Tr(e){const t=await U("procurement_decisions",{fy:`eq.${e}`}),n={};for(const o of t??[]){const r=v(o,["brew_category"],""),l=q(o,["decided_brewing_l"],-1);r&&l>=0&&(n[r]=l)}return n}async function Ir(e,t,n){const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0);return r?(await fetch(`${o}/rest/v1/procurement_decisions`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,fy:t,decided_brewing_l:n,updated_at:new Date().toISOString()})})).ok:!1}async function Nr(e){return(await U("brewing_process_batches",{fy:`eq.${e}`,order:"start_date.asc.nullsfirst"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),batchCode:v(n,["batch_code"],""),fy:q(n,["fy"],e),plannedVolumeL:q(n,["planned_volume_l"],0),tankNo:v(n,["tank_no"],""),status:v(n,["status"],"planned"),startDate:v(n,["start_date"],""),targetEndDate:v(n,["target_end_date"],""),notes:v(n,["notes"],"")}))}async function Mr(e){return e.length===0?[]:(await U("brewing_process_steps",{batch_id:`in.(${e.join(",")})`,order:"batch_id.asc,step_order.asc"})??[]).map(n=>({id:v(n,["id"],""),batchId:v(n,["batch_id"],""),stepOrder:q(n,["step_order"],0),stepName:v(n,["step_name"],""),plannedStart:v(n,["planned_start"],""),plannedEnd:v(n,["planned_end"],""),actualStart:v(n,["actual_start"],""),actualEnd:v(n,["actual_end"],""),status:v(n,["status"],"未着手"),temperature:n.temperature!=null?q(n,["temperature"],0):null,notes:v(n,["notes"],"")}))}function Rr(e,t){const n=new Date(e);let o=0;for(;o<t;)n.setDate(n.getDate()+1),n.getDay()!==0&&o++;return n}function Or(e,t){const n=new Date(e);let o=t-1;for(;o>0;)n.setDate(n.getDate()+1),n.getDay()!==0&&o--;return n.getDay()===0&&n.setDate(n.getDate()+1),n}function Sn(e){return e.getDay()===0&&e.setDate(e.getDate()+1),e}const Ht=[{name:"洗米・浸漬",days:1},{name:"蒸米",days:1},{name:"製麹",days:2},{name:"酒母",days:14},{name:"仕込み(添/仲/留)",days:4},{name:"醪管理",days:25},{name:"上槽",days:2},{name:"濾過・火入れ",days:1},{name:"貯蔵",days:30},{name:"瓶詰め",days:1}];async function Br(e,t,n,o,r){const c=n[o],d=c?.ricePerLiterKg??.5,u=c?.kojiRatio??.3,y=c?.polishingRatio??.7,f=c?.alcoholAdditionRatio??0,g=Math.round(t*(1-f)*d*u/y),$=r.filter(_=>_.stepName==="製麹"&&_.plannedStart&&_.plannedEnd);let P=new Date(e);for(let _=0;_<60;_++){const D=new Date(P.getTime()+1728e5),k=new Date(P.getTime()+3*864e5);let L=0;for(const s of $){const i=new Date(s.plannedStart).getTime(),p=new Date(s.plannedEnd).getTime();D.getTime()<=p&&k.getTime()>=i&&(L+=180)}if(L+g<=180)return P.toISOString().slice(0,10);P=new Date(P.getTime()+864e5)}return P.toISOString().slice(0,10)}async function jr(e,t,n,o,r,l,c){let d=r;l&&c&&(d=await Br(r,o,c,e,l));const u=await Pe("brewing_process_batches",{brew_category:e,batch_code:t,fy:n,planned_volume_l:o,start_date:d});if(!u?.id)return null;let y=Sn(new Date(d));for(let f=0;f<Ht.length;f++){y=Sn(y);const g=y.toISOString().slice(0,10),$=Or(y,Ht[f].days),P=$.toISOString().slice(0,10);await Pe("brewing_process_steps",{batch_id:u.id,step_order:f+1,step_name:Ht[f].name,planned_start:g,planned_end:P}),y=Rr($,1)}return await je("brewing_process_batches",u.id,{target_end_date:y.toISOString().slice(0,10)}),u.id}async function zr(e,t){return je("brewing_process_steps",e,t)}async function Fr(e,t){return je("brewing_process_batches",e,{...t,updated_at:new Date().toISOString()})}async function Vr(){return(await U("tanks",{order:"tank_no"})??[]).map(t=>({id:v(t,["id"],""),tankNo:v(t,["tank_no"],""),displayName:v(t,["display_name"],""),capacityL:q(t,["capacity_l"],0),tankType:v(t,["tank_type"],""),status:v(t,["status"],"empty"),preferredCategories:Array.isArray(t.preferred_categories)?t.preferred_categories:[],cleanupDays:q(t,["cleanup_days"],1)}))}async function Ur(e,t,n,o){return await Pe("tanks",{tank_no:e,display_name:e,capacity_l:t,tank_type:n,preferred_categories:o,status:"empty"})!==null}async function Yr(e){const{supabaseDelete:t}=await I(async()=>{const{supabaseDelete:n}=await Promise.resolve().then(()=>ee);return{supabaseDelete:n}},void 0);return t("tanks",e)}function Jr(e,t){const n=e.find(l=>l.stepName==="仕込み(添/仲/留)"),o=e.find(l=>l.stepName==="上槽");if(!n?.plannedStart||!o?.plannedEnd)return null;const r=new Date(o.plannedEnd);return r.setDate(r.getDate()+t),{start:n.plannedStart,end:r.toISOString().slice(0,10)}}async function Kr(e,t,n,o){const r=new Map(n.map(k=>[k.stepName,k])),l=o??[],c=e.filter(k=>k.status!=="completed"&&k.startDate).sort((k,L)=>k.startDate.localeCompare(L.startDate));if(c.length===0)return;const d=t.deadlineDate||"",u=t.allowSunday&&!!d,y=new Map,f=(k,L)=>{const s=new Date(k);return s.setDate(s.getDate()+L),s.toISOString().slice(0,10)},g=(k,L,s,i)=>k<=i&&L>=s,$=k=>L=>(!k&&L.getDay()===0&&L.setDate(L.getDate()+1),L),P=(k,L,s)=>{const i=new Date(k);let p=L-1;for(;p>0;)i.setDate(i.getDate()+1),(s||i.getDay()!==0)&&p--;return!s&&i.getDay()===0&&i.setDate(i.getDate()+1),i},_=(k,L)=>{const s=new Date(k);return s.setDate(s.getDate()+1),!L&&s.getDay()===0&&s.setDate(s.getDate()+1),s},D=()=>{const k=new Map;for(const L of y.values())for(const s of L){const i=r.get(s.stepName);if(!i)continue;const p=Math.max(Math.round((new Date(s.end).getTime()-new Date(s.start).getTime())/864e5)+1,1);let m=0;for(let b=0;b<p;b++){const x=new Date(s.start);x.setDate(x.getDate()+b),x.getDay()!==0&&m++}if(m===0)continue;const h=i.laborHours/m;for(let b=0;b<p;b++){const x=new Date(s.start);if(x.setDate(x.getDate()+b),x.getDay()===0)continue;const w=new Date(x);w.setDate(w.getDate()+3-(w.getDay()+6)%7);const S=new Date(w.getFullYear(),0,4),C=1+Math.round(((w.getTime()-S.getTime())/864e5-3+(S.getDay()+6)%7)/7),A=`${w.getFullYear()}-W${String(C).padStart(2,"0")}`;k.set(A,(k.get(A)??0)+h)}}return k};for(const k of c){let L=k.startDate;for(let m of[!1,...u?[!0]:[]]){L=k.startDate;for(let b=0;b<90;b++){L=$(m)(new Date(L)).toISOString().slice(0,10);const w=[];let S=new Date(L);for(const M of Ht){S=$(m)(S);const B=S.toISOString().slice(0,10),j=P(S,M.days,m),z=j.toISOString().slice(0,10);w.push({stepName:M.name,start:B,end:z}),S=_(j,m)}const C=w.find(M=>M.stepName==="製麹");let A=!1;if(C)for(const[M,B]of y){const j=B.find(z=>z.stepName==="製麹");if(j&&g(C.start,C.end,j.start,j.end)){A=!0;break}}if(A){L=f(L,1);continue}y.set(k.id,w);const T=D(),N=t.workerCount*t.weeklyHoursLimit;let R=!1;for(const M of T.values())if(M>N*1.1){R=!0;break}if(R){y.delete(k.id),L=f(L,1);continue}if(l.length>0){const M=w.find(j=>j.stepName==="仕込み(添/仲/留)"),B=w.find(j=>j.stepName==="上槽");if(M&&B){const j=M.start,z=new Date(B.end);z.setDate(z.getDate()+1);const Y=z.toISOString().slice(0,10),H=l.filter(Q=>Q.capacityL>=k.plannedVolumeL&&(Q.preferredCategories.length===0||Q.preferredCategories.includes(k.brewCategory)));let G=!1;for(const Q of H){let J=!1;for(const[Z,ae]of y){if(Z===k.id||e.find(W=>W.id===Z)?.tankNo!==Q.tankNo)continue;const V=ae.find(W=>W.stepName==="仕込み(添/仲/留)"),K=ae.find(W=>W.stepName==="上槽");if(V&&K){const W=f(K.end,Q.cleanupDays);if(g(j,Y,V.start,W)){J=!0;break}}}if(!J){Q.tankNo,G=!0;break}}if(!G){y.delete(k.id),L=f(L,1);continue}}}break}const h=y.get(k.id);if(d&&h){const b=h.find(x=>x.stepName==="仕込み(添/仲/留)");if(b&&b.end<=d)break;if(!m){y.delete(k.id);continue}}else break}const s=y.get(k.id);if(!s)continue;const i=(()=>{if(l.length===0)return k.tankNo;const m=s.find(w=>w.stepName==="仕込み(添/仲/留)"),h=s.find(w=>w.stepName==="上槽");if(!m||!h)return k.tankNo;const b=m.start,x=f(h.end,1);for(const w of l){if(w.capacityL<k.plannedVolumeL||w.preferredCategories.length>0&&!w.preferredCategories.includes(k.brewCategory))continue;let S=!1;for(const[C,A]of y){if(C===k.id||e.find(M=>M.id===C)?.tankNo!==w.tankNo)continue;const N=A.find(M=>M.stepName==="仕込み(添/仲/留)"),R=A.find(M=>M.stepName==="上槽");if(N&&R&&g(b,x,N.start,f(R.end,w.cleanupDays))){S=!0;break}}if(!S)return w.tankNo}return k.tankNo})();await je("brewing_process_batches",k.id,{start_date:L,tank_no:i,target_end_date:f(s[s.length-1].end,0),updated_at:new Date().toISOString()});const p=await U("brewing_process_steps",{batch_id:`eq.${k.id}`,order:"step_order.asc"});if(p)for(const m of p){const h=q(m,["step_order"],0),b=s[h-1];if(b){const x=v(m,["id"],"");await je("brewing_process_steps",x,{planned_start:b.start,planned_end:b.end})}}}}async function Hr(){const t=(await U("brewing_worker_settings",{limit:"1"})??[])[0];return t?{workerCount:q(t,["worker_count"],2),weeklyHoursLimit:q(t,["weekly_hours_limit"],40),dayStartHour:q(t,["day_start_hour"],6),deadlineDate:v(t,["deadline_date"],""),allowSunday:t.allow_sunday===!0}:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1}}async function Qr(e){const t=await U("brewing_worker_settings",{limit:"1"});if(t&&t.length>0){const n=v(t[0],["id"],"");return je("brewing_worker_settings",n,{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday,updated_at:new Date().toISOString()})}return await Pe("brewing_worker_settings",{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday})!==null}async function Wr(){return(await U("brewing_step_labor",{order:"step_name"})??[]).map(t=>({stepName:v(t,["step_name"],""),laborHours:q(t,["labor_hours"],4),workerCountNeeded:q(t,["worker_count_needed"],1)}))}function Gr(e,t){const n=new Map(t.map(r=>[r.stepName,r])),o=new Map;for(const r of e){if(!r.plannedStart||!r.plannedEnd)continue;const l=n.get(r.stepName);if(!l)continue;const c=new Date(r.plannedStart),d=new Date(r.plannedEnd),u=Math.max(Math.round((d.getTime()-c.getTime())/864e5)+1,1),y=l.laborHours/u;for(let f=new Date(c);f<=d;f=new Date(f.getTime()+864e5)){const g=new Date(f);g.setDate(g.getDate()+3-(g.getDay()+6)%7);const $=new Date(g.getFullYear(),0,4),P=1+Math.round(((g.getTime()-$.getTime())/864e5-3+($.getDay()+6)%7)/7),_=`${g.getFullYear()}-W${String(P).padStart(2,"0")}`;o.set(_,(o.get(_)??0)+y)}}return o}async function Xr(e){return(await U("rice_purchase_commitments",{fy:`eq.${e}`,order:"variety_name.asc"})??[]).map(n=>({id:v(n,["id"],""),varietyName:v(n,["variety_name"],""),committedBales:q(n,["committed_bales"],0),pricePerKg:q(n,["price_per_kg"],0),supplier:v(n,["supplier"],""),deliveryMonth:q(n,["delivery_month"],0)||null,fy:q(n,["fy"],e),notes:v(n,["notes"],"")}))}async function Zr(e){return await Pe("rice_purchase_commitments",{variety_name:e.varietyName,committed_bales:e.committedBales??0,price_per_kg:e.pricePerKg??0,supplier:e.supplier??"",delivery_month:e.deliveryMonth??null,fy:e.fy,notes:e.notes??""})!==null}async function ei(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_purchase_commitments?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function ti(){return(await U("rice_varieties",{order:"sort_order.asc,name.asc"})??[]).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),defaultPricePerKg:q(t,["default_price_per_kg"],400),region:v(t,["region"],"")}))}async function ai(e,t,n=""){return await Pe("rice_varieties",{name:e,default_price_per_kg:t,region:n})!==null}async function ni(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_varieties?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function si(e){return(await U("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:v(n,["id"],""),brewCategory:v(n,["brew_category"],""),label:v(n,["label"],""),volumeL:q(n,["volume_l"],0)}))}async function oi(){return(await U("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:v(t,["id"],""),brewCategory:v(t,["brew_category"],""),label:v(t,["label"],""),volumeL:q(t,["volume_l"],0)}))}async function ri(e,t,n){return await Pe("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function ii(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await I(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:c}},void 0);return o?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function li(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function ci(){return(await U("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:v(t,["name"],""),parentCategory:v(t,["parent_category"],"")})).filter(t=>t.name)}async function di(e,t){return await Pe("brewing_custom_categories",{name:e,parent_category:t})!==null}async function pi(e){const t=await me("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:v(n,["production_type_name"],""),count:q(n,["product_count"],0)})).filter(n=>n.name):[]}async function ui(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function mi(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);if(!o)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function yi(){const e=await U("brewing_category_overrides",{}),t={};for(const n of e??[]){const o=v(n,["product_code"],""),r=v(n,["brew_category"],"");o&&r&&(t[o]=r)}return t}async function hi(e){return(await U("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>v(n,["product_code"],"")).filter(Boolean)}async function gi(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await I(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);if(!o)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}}),t.length===0)return!0;const r=t.map(c=>({year_month:e,product_code:c}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(r)})).ok}catch{return!1}}const Na={sales:"売上",return:"返品",export_return:"輸出戻入"};async function ks(e){const t=e.lines.reduce((r,l)=>r+l.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Pe("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const kn={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function tn(e){const t=await U("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],o=re(n.total_amount);return{documentNo:e,invoiceDate:v(n,["sales_date","document_date"],""),customerCode:v(n,["legacy_customer_code","customer_code"],""),customerName:v(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:o,taxAmount:Math.floor(o*10/110),note:""}}return{...kn,documentNo:e||kn.documentNo}}const fi={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function an(e){const t=await U("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const l=q(r,["sales_amount"],0),c=q(r,["tax_amount"],0);return{customerCode:v(r,["customer_code"],""),customerName:v(r,["customer_name"],""),closingDay:31,salesAmount:l,taxAmount:c,prevBalance:0,paymentAmount:0,billingAmount:l,status:"open"}}),o=n.reduce((r,l)=>r+l.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:o,customers:n}}return{...fi,targetYearMonth:e}}const vi={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function Ps(){const[e,t,n]=await Promise.all([U("mv_monthly_sales",{order:"month.asc"}),U("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),U("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return vi;const o=e.slice(-12).map(u=>v(u,["month"],"")),r=new Map;t.forEach(u=>{const y=v(u,["code"],"");r.has(y)||r.set(y,{name:v(u,["name"],y),monthValues:new Map}),r.get(y).monthValues.set(v(u,["month"],""),q(u,["amount"],0))});const c=Array.from(r.entries()).map(([u,y])=>({code:u,name:y.name,total:o.reduce((f,g)=>f+(y.monthValues.get(g)??0),0),monthValues:y.monthValues})).sort((u,y)=>y.total-u.total).slice(0,10).map(u=>({label:u.name,values:o.map(y=>u.monthValues.get(y)??0)})),d=n.map(u=>({label:v(u,["name"],""),values:o.map(()=>Math.round(q(u,["amount"],0)/o.length))}));return{generatedAt:new Date().toISOString(),months:o,salesByProduct:c,salesByCustomer:d,costSimulation:[]}}async function bi(){const e=await ve("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const o=v(n,["code"],"");if(!o)return;const r=v(n,["month"],""),l=parseInt(r.slice(5,7))-1;if(l<0||l>11)return;let c=t.get(o);c||(c={name:v(n,["name"],o),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(o,c)),c.qty[l]+=q(n,["quantity"],0),c.amt[l]+=q(n,["amount"],0)}),Array.from(t.entries()).map(([n,o])=>({code:n,name:o.name,monthlyQuantity:o.qty,monthlyAmount:o.amt,totalQuantity:o.qty.reduce((r,l)=>r+l,0),totalAmount:o.amt.reduce((r,l)=>r+l,0)})).filter(n=>n.totalQuantity>0).sort((n,o)=>o.totalAmount-n.totalAmount)}async function wi(){return(await U("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:v(t,["product_code"],""),productName:v(t,["product_name"],""),forecastMonth:v(t,["forecast_month"],""),segment:v(t,["segment"],"monthly"),avgMonthly:q(t,["avg_monthly"],0),forecastQuantity:q(t,["forecast_quantity"],0),forecastAmount:q(t,["forecast_amount"],0),safetyStock:q(t,["safety_stock"],0),calculatedAt:ge(t,["calculated_at"],"")}))}async function xi(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await ve("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(c=>String(c.id)).filter(Boolean);const o=await ve("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(c=>{c.id&&r.set(String(c.id),c)});const l=[];return o.forEach(c=>{const d=String(c.header_id??c.document_header_id??""),u=r.get(d);if(!u)return;const y=u.sales_date??u.document_date??"";!y||y<t||l.push({date:y.slice(0,10),customerName:u.customer_name??"不明",productName:c.product_name??"不明",quantity:re(c.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),l.sort((c,d)=>c.date.localeCompare(d.date))}async function $i(){const e=new Date().toISOString();return(await U("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:v(n,["id"],""),message:v(n,["message"],""),level:v(n,["level"],"info"),startsAt:ge(n,["starts_at"],""),endsAt:n.ends_at?ge(n,["ends_at"],""):null,dismissible:be(n,["dismissible"],!0)}))}async function _i(){const e=await ve("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:v(t,["customer_code"],""),customer_name:v(t,["customer_name"],""),business_type:v(t,["business_type"],""),area_code:v(t,["area_code"],""),phone:v(t,["phone"],""),last_order_date:v(t,["last_order_date"],""),days_since_order:q(t,["days_since_order"],0),amount_12m:q(t,["amount_12m"],0),amount_3m:q(t,["amount_3m"],0),amount_this_month:q(t,["amount_this_month"],0),amount_last_year_same_month:q(t,["amount_last_year_same_month"],0),annual_revenue:q(t,["annual_revenue"],0),is_dormant:be(t,["is_dormant"],!1),is_at_risk:be(t,["is_at_risk"],!1)})):[]}async function Si(){return(await ve("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:v(t,["customer_code"],""),customer_name:v(t,["customer_name"],""),phone:v(t,["phone"],""),address:v(t,["address"],""),area_code:v(t,["area_code"],""),business_type:v(t,["business_type"],""),priority_score:q(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:v(t,["last_order_date"],""),days_since_order:q(t,["days_since_order"],0),annual_revenue:q(t,["annual_revenue"],0),recommended_action:v(t,["recommended_action"],"")}))}async function ki(){return(await ve("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:v(t,["product_code"],""),product_name:v(t,["product_name"],""),season_type:v(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:q(t,["avg_monthly_qty"],0)}))}async function Pi(){return(await ve("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:v(t,["product_code"],""),name:v(t,["product_name"],""),monthlyQuantity:[q(t,["m01"],0),q(t,["m02"],0),q(t,["m03"],0),q(t,["m04"],0),q(t,["m05"],0),q(t,["m06"],0),q(t,["m07"],0),q(t,["m08"],0),q(t,["m09"],0),q(t,["m10"],0),q(t,["m11"],0),q(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:q(t,["total_quantity"],0),totalAmount:q(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function Es(e,t,n){try{return await Pe("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function As(e,t){return je("customers",e,t)}async function Ls(e,t){return je("products",e,t)}async function Ma(e,t){const n=e.find(c=>c.code===t);n?.priceGroup;const o=n?.priceGroup||t;let r="";try{const c=await U("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});c[0]?.memo&&(r=(typeof c[0].memo=="string"?JSON.parse(c[0].memo):c[0].memo)?.price_type??"")}catch{}const l=new Map;if(o){const c=await U("customer_product_prices",{price_group:`eq.${o}`,select:"legacy_product_code,special_price"});for(const d of c)l.set(d.legacy_product_code,d.special_price)}return{priceType:r,priceGroup:o,individualPrices:l}}function nn(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function Ei(){return(await U("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function Ai(){return(await ve("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Li(){return(await U("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function it(e,t="billing",n="apr"){const o=await me("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t,p_fiscal_type:n});return o?o.map(r=>({code:String(r.legacy_customer_code??""),name:String(r.customer_name??""),address:String(r.address1??""),yearAmount:Number(r.year_amount??0),sharePct:Number(r.share_pct??0),orderDays:Number(r.order_days??0),prevAmount:Number(r.prev_amount??0),growthRate:r.growth_rate!=null?Number(r.growth_rate):null,currentRank:String(r.current_rank??"C"),prevRank:String(r.prev_rank??"")})):[]}function sn(e){if(!e)return null;if(/^\d{4}$/.test(e))return{dateFrom:`${e}-01-01`,dateTo:`${e}-12-31`};if(/^\d{4}-\d{2}$/.test(e)){const[t,n]=e.split("-").map(Number),o=new Date(t,n,0).getDate();return{dateFrom:`${e}-01`,dateTo:`${e}-${String(o).padStart(2,"0")}`}}return null}async function Cs(e=""){const t=sn(e),n=t?me("get_abc_customer_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(_=>_??[]):U("mv_customer_abc",{order:"amount.desc"}),o=t?t.dateFrom.slice(0,7):(()=>{const _=new Date;return _.setMonth(_.getMonth()-11),`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[l,c]=await Promise.all([n,U("mv_customer_monthly_sales",{month:`gte.${o}`,order:"month.asc",limit:"10000"})]),d=c.filter(_=>v(_,["month"],"")<=r),u=l.map(_=>({code:v(_,["code"],""),name:v(_,["name"],""),amount:q(_,["amount"],0),documents:q(_,["documents"],0),ratio:q(_,["ratio"],0),cumRatio:q(_,["cum_ratio","cumRatio"],0),abcRank:v(_,["abc_rank","abcRank"],"C")})),y=u.slice(0,10),f=new Set(y.map(_=>_.code)),g=qs(o,r),$=new Map;d.forEach(_=>{const D=v(_,["code"],"");if(!f.has(D))return;const k=v(_,["month"],"");$.has(D)||$.set(D,new Map),$.get(D).set(k,q(_,["amount"],0))});const P=y.map(_=>({label:_.name,values:g.map(D=>$.get(_.code)?.get(D)??0)}));return{generatedAt:new Date().toISOString(),ranking:u,months:g,monthlyByCustomer:P}}async function Ds(e=""){const t=sn(e),n=t?me("get_abc_product_by_period",{p_date_from:t.dateFrom,p_date_to:t.dateTo}).then(D=>D??[]):U("mv_product_abc",{order:"amount.desc"}),o=t?t.dateFrom.slice(0,7):(()=>{const D=new Date;return D.setMonth(D.getMonth()-11),`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}`})(),r=t?t.dateTo.slice(0,7):new Date().toISOString().slice(0,7),[l,c]=await Promise.all([n,U("mv_product_monthly_shipments",{month:`gte.${o}`,order:"month.asc",limit:"10000"})]),d=c.filter(D=>v(D,["month"],"")<=r),y=l.map(D=>({code:v(D,["code"],""),name:v(D,["name"],""),amount:q(D,["amount"],0),quantity:q(D,["quantity"],0),documents:q(D,["documents"],0),ratio:q(D,["ratio"],0),cumRatio:q(D,["cum_ratio","cumRatio"],0),abcRank:v(D,["abc_rank","abcRank"],"C")})),f=y.reduce((D,k)=>D+k.amount,0),g=qs(o,r),$=new Set(y.filter(D=>D.abcRank==="A").slice(0,10).map(D=>D.code)),P=new Map;d.forEach(D=>{const k=v(D,["code"],"");if(!$.has(k))return;const L=v(D,["month"],"");P.has(k)||P.set(k,new Map),P.get(k).set(L,q(D,["amount"],0))});const _=Array.from($).map(D=>{const k=P.get(D);return{label:y.find(L=>L.code===D)?.name??D,values:g.map(L=>k?.get(L)??0)}});return{generatedAt:new Date().toISOString(),totalAmount:f,ranking:y,months:g,monthlyByProduct:_.length>0?_:[]}}function qs(e,t){const n=[],[o,r]=e.split("-").map(Number),[l,c]=t.split("-").map(Number);let d=o,u=r;for(;(d<l||d===l&&u<=c)&&(n.push(`${d}-${String(u).padStart(2,"0")}`),u++,u>12&&(u=1,d++),!(n.length>60)););return n}const Ts={planned:"計画中",active:"仕込中",done:"完了"};async function Is(){const e=await U("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),jikomiNo:v(t,["batch_no","legacy_batch_no"],""),productName:v(t,["brand_name"],""),riceType:v(t,["rice_type"],""),plannedKg:q(t,["planned_rice_kg"],0),actualKg:q(t,["actual_rice_kg"],0),startDate:ge(t,["start_date"],""),expectedDoneDate:ge(t,["expected_done_date"],""),status:v(t,["status"],"planned"),tankNo:v(t,["tank_no"],""),note:v(t,["remarks"],"")})):[]}async function Ns(){const e=await U("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),tankNo:v(t,["tank_no"],""),capacity:q(t,["capacity_l"],0),currentVolume:q(t,["current_volume_l"],0),productName:v(t,["current_product_code"],""),jikomiNo:v(t,["current_batch_id"],""),status:v(t,["status"],"empty"),lastUpdated:ge(t,["last_updated_at"],"")})):[]}async function Ms(){const e=await U("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),kenteiNo:v(t,["kentei_no"],""),jikomiNo:v(t,["batch_id"],""),productName:v(t,["product_code"],""),kenteiDate:ge(t,["kentei_date"],""),alcoholDegree:q(t,["alcohol_degree"],0),extractDegree:q(t,["extract_degree"],0),sakaMeterValue:q(t,["sakemeter_value"],0),volume:q(t,["volume_l"],0),taxCategory:v(t,["tax_category_code"],""),status:v(t,["status"],"pending")})):[]}async function Rs(){const e=await U("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),code:v(t,["material_code","legacy_material_code"],""),name:v(t,["name"],""),unit:v(t,["unit"],""),currentStock:q(t,["current_stock"],0),minimumStock:q(t,["minimum_stock"],0),unitCost:q(t,["unit_cost"],0),lastUpdated:ge(t,["updated_at"],"")})):[]}async function Os(){const e=await U("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),documentNo:v(t,["document_no","legacy_document_no"],""),purchaseDate:ge(t,["purchase_date"],""),supplierCode:v(t,["supplier_code","legacy_supplier_code"],""),supplierName:v(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:q(t,["total_amount"],0),status:v(t,["payment_status"],"pending")})):[]}async function Bs(){const e=await U("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:v(t,["supplier_code","legacy_supplier_code"],""),supplierName:v(t,["legacy_supplier_code"],""),totalPurchase:q(t,["total_purchase"],0),paidAmount:q(t,["paid_amount"],0),balance:q(t,["balance"],0),nextPaymentDate:ge(t,["next_payment_date"],""),status:v(t,["status"],"unpaid")})):[]}async function js(){const e=await U("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:v(t,["id"],""),billNo:v(t,["bill_no"],""),supplierName:v(t,["counterparty_name"],""),amount:q(t,["amount"],0),issueDate:ge(t,["issue_date"],""),dueDate:ge(t,["due_date"],""),status:v(t,["status"],"holding")})):[]}async function zs(){const e=await U("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:v(t,["material_code","legacy_material_code"],""),name:v(t,["name"],""),unit:v(t,["unit"],""),currentStock:q(t,["current_stock"],0),minimumStock:q(t,["minimum_stock"],0),lastPurchaseDate:ge(t,["last_purchase_date"],""),unitCost:q(t,["unit_cost"],0)})):[]}const Fs=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],Ra={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Ci={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function on(e,t){const n=await U("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const o=n[0],r=v(o,["id"],""),[l,c]=await Promise.all([U("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),U("tax_deductions",{declaration_id:`eq.${r}`})]),d=l.map(y=>({taxCategory:v(y,["tax_category_code"],""),taxCategoryName:v(y,["tax_category_name"],""),alcoholDegree:q(y,["alcohol_degree"],0),volume:q(y,["taxable_volume"],0),taxRate:q(y,["tax_rate"],0),taxAmount:q(y,["tax_amount"],0),productionVolume:q(y,["production_volume"],0),previousBalance:q(y,["previous_balance"],0),currentAdjustment:q(y,["current_adjustment"],0),exportDeduction:q(y,["export_deduction"],0),sampleDeduction:q(y,["sample_deduction"],0),taxableVolume:q(y,["taxable_volume"],0)})),u=c.map(y=>({type:v(y,["deduction_type"],"sample"),categoryCode:v(y,["tax_category_code"],""),volume:q(y,["volume"],0),reason:v(y,["reason"],""),documentNo:v(y,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:v(o,["company_name"],""),companyNo:v(o,["company_no"],""),companyAddress:v(o,["company_address"],""),companyRepresentative:v(o,["company_representative"],""),taxOffice:v(o,["tax_office"],""),rows:d,deductions:u,totalVolume:q(o,["total_taxable_volume"],0),totalTax:q(o,["total_tax_amount"],0),status:v(o,["status"],"draft"),submittedAt:v(o,["submitted_at"],"")||null}}return{...Ci,targetYear:e,targetMonth:t}}function Ce(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Vs(e){const t=e.rows.map(o=>`    <Category>
      <Code>${Ce(o.taxCategory)}</Code>
      <Name>${Ce(o.taxCategoryName)}</Name>
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
`),n=e.deductions.map(o=>`    <Deduction type="${Ce(o.type)}">
      <CategoryCode>${Ce(o.categoryCode)}</CategoryCode>
      <Volume>${o.volume}</Volume>
      <Reason>${Ce(o.reason)}</Reason>${o.documentNo?`
      <DocumentNo>${Ce(o.documentNo)}</DocumentNo>`:""}
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
`}function Di(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function qi(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),o=e.rows.map(l=>[l.taxCategory,l.taxCategoryName,l.alcoholDegree,l.productionVolume,l.previousBalance,l.currentAdjustment,l.exportDeduction,l.sampleDeduction,l.taxableVolume,l.taxRate,l.taxAmount].map(Di).join(",")),r=`,合計,,${e.rows.reduce((l,c)=>l+c.productionVolume,0)},,,${e.rows.reduce((l,c)=>l+c.exportDeduction,0)},${e.rows.reduce((l,c)=>l+c.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...o,r].join(`
`)+`
`}function Ti(e){const t=e.rows.map(r=>{const l=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),c=Math.round(l*r.taxRate);return{...r,taxableVolume:l,volume:l,taxAmount:c}}),n=t.reduce((r,l)=>r+l.taxableVolume,0),o=t.reduce((r,l)=>r+l.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:o}}async function Ii(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>ee);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:Vs(e),submitted_at:e.submittedAt})}async function rn(e,t){return(await me("get_sake_tax_by_month",{p_year:e,p_month:t})).map(o=>({sakeType:o.sake_type,alcDegree:o.alc_degree??null,volumeSaleL:Number(o.volume_sale_l)||0,volumeReturnL:Number(o.volume_return_l)||0,volumeExportL:Number(o.volume_export_l)||0,volumeNetL:Number(o.volume_net_l)||0,taxRatePerKl:o.tax_rate_per_kl!==null?Number(o.tax_rate_per_kl):null,taxAmount:Number(o.tax_amount)||0}))}async function ln(e){const t=await U("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:v(n,["id"],""),saleDate:v(n,["sale_date"],e),saleTime:v(n,["sale_time"],""),productCode:v(n,["product_code"],""),productName:v(n,["product_name"],""),quantity:q(n,["quantity"],0),unitPrice:q(n,["unit_price"],0),amount:q(n,["amount"],0),paymentMethod:v(n,["payment_method"],"cash")})):[]}async function Us(){const e=await U("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:v(t,["id"],""),orderNo:v(t,["order_no"],""),orderDate:ge(t,["order_date"],""),customerName:v(t,["customer_name"],""),postalCode:v(t,["postal_code"],""),address:v(t,["shipping_address"],""),items:[],totalAmount:q(t,["total_amount"],0),status:v(t,["status"],"new"),shippingDate:ge(t,["shipping_date"],"")})):[]}async function Ni(e,t,n,o,r,l){const c=await Pe("store_orders",{order_no:e,order_date:new Date().toISOString().slice(0,10),channel:"mobile",customer_name:t,legacy_customer_code:n||null,total_amount:o,status:"new",remarks:r||null});if(!c)return null;const d=c.id;for(let u=0;u<l.length;u++){const y=l[u];await Pe("store_order_lines",{order_id:d,line_no:u+1,product_code:y.productCode,product_name:y.productName,quantity:y.quantity,unit_price:y.unitPrice,amount:y.amount})}return d}async function Qt(e){const t=await Pe("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Ys(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Mi(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await U("print_layouts",t)).map(o=>({id:v(o,["id"],""),name:v(o,["name"],""),templateKey:v(o,["template_key"],""),positions:o.positions??{},isDefault:be(o,["is_default"],!1),note:v(o,["note"],""),updatedAt:v(o,["updated_at"],"")}))}async function Ri(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>ee);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},o=await t("print_layouts",n);return o?{id:v(o,["id"],e.id),name:v(o,["name"],e.name),templateKey:v(o,["template_key"],e.templateKey),positions:o.positions??e.positions,isDefault:be(o,["is_default"],!1),note:v(o,["note"],""),updatedAt:v(o,["updated_at"],"")}:null}async function Oi(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Bi(){return(await U("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),email:v(t,["email"],""),displayName:v(t,["display_name"],""),signature:v(t,["signature"],""),replyTo:v(t,["reply_to"],""),isDefault:be(t,["is_default"],!1),isVerified:be(t,["is_verified"],!1),note:v(t,["note"],"")}))}async function ji(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:v(n,["id"],e.id),name:v(n,["name"],e.name),email:v(n,["email"],e.email),displayName:v(n,["display_name"],""),signature:v(n,["signature"],""),replyTo:v(n,["reply_to"],""),isDefault:be(n,["is_default"],!1),isVerified:be(n,["is_verified"],!1)}:null}async function zi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const cn={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},dn={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function Fi(e){const t=`${e}-01T00:00:00Z`,[n,o]=e.split("-").map(d=>parseInt(d,10)),r=new Date(n,o,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await U("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${l})`,order:"starts_at.asc"})).map(d=>({id:v(d,["id"],""),title:v(d,["title"],""),description:v(d,["description"],""),category:v(d,["category"],"general")||"general",startsAt:v(d,["starts_at"],new Date().toISOString()),endsAt:v(d,["ends_at"],""),isAllDay:be(d,["is_all_day"],!1),location:v(d,["location"],""),attendees:d.attendees??[],relatedCustomerCode:v(d,["related_customer_code"],""),relatedOrderId:v(d,["related_order_id"],""),color:v(d,["color"],""),googleEventId:v(d,["google_event_id"],"")}))}async function Vi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??dn[e.category],updated_at:new Date().toISOString()})?e:null}async function Ui(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Js(){return(await U("integration_settings",{order:"name.asc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),provider:v(t,["provider"],""),config:t.config??{},isEnabled:be(t,["is_enabled"],!1),lastSyncAt:v(t,["last_sync_at"],""),lastStatus:v(t,["last_status"],"")}))}async function Dt(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function Yi(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const o=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(o,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const l=await r.json(),{supabaseInsert:c}=await I(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>ee);return{supabaseInsert:u}},void 0);let d=0;for(const u of l.orders){const y=`shopify_${u.id}`;await c("shopify_orders",{id:y,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),d++}return await Dt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得成功`}),{count:d}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function Ji(){return(await U("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:v(t,["id"],""),shopifyOrderId:v(t,["shopify_order_id"],""),orderNumber:v(t,["order_number"],""),orderDate:v(t,["order_date"],""),customerName:v(t,["customer_name"],""),customerEmail:v(t,["customer_email"],""),totalAmount:re(t.total_amount),financialStatus:v(t,["financial_status"],""),fulfillmentStatus:v(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function Ki(e){const t=e.config.refresh_token,n=e.config.client_id,o=e.config.client_secret;if(!t||!n||!o)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:o})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const c=(await r.json()).access_token;return await Dt({...e,config:{...e.config,oauth_token:c}}),e.config.oauth_token=c,{token:c}}async function Hi(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const o=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),l=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${o}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let c=await fetch(l,{headers:{Authorization:`Bearer ${t}`}});if(c.status===401){const f=await Ki(e);if(f.error)return{count:0,error:f.error};t=f.token,c=await fetch(l,{headers:{Authorization:`Bearer ${t}`}})}if(!c.ok)return{count:0,error:`HTTP ${c.status}`};const d=await c.json(),{supabaseInsert:u}=await I(async()=>{const{supabaseInsert:f}=await Promise.resolve().then(()=>ee);return{supabaseInsert:f}},void 0);let y=0;for(const f of d.items){const g=`gcal_${f.id}`,$=f.start?.dateTime??f.start?.date??"",P=f.end?.dateTime??f.end?.date??"";await u("calendar_events",{id:g,title:String(f.summary??"(無題)"),description:String(f.description??""),category:"general",starts_at:String($),ends_at:String(P),location:String(f.location??""),google_event_id:String(f.id??""),updated_at:new Date().toISOString()}),y++}return await Dt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${y}件取得`}),{count:y}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function Qi(){return(await U("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:v(t,["id"],""),receivedAt:v(t,["received_at"],""),senderPhone:v(t,["sender_phone"],""),senderName:v(t,["sender_name"],""),imageUrl:v(t,["image_url"],""),ocrStatus:v(t,["ocr_status"],"pending")||"pending",ocrText:v(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:v(t,["linked_invoice_id"],"")}))}async function Wi(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const o=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(o){return{text:"",error:o instanceof Error?o.message:String(o)}}}async function Gi(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const aa={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},na={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function Xi(){return(await U("user_profiles",{order:"display_name.asc"})).map(t=>({id:v(t,["id"],""),email:v(t,["email"],""),displayName:v(t,["display_name"],""),staffCode:v(t,["staff_code"],""),department:v(t,["department"],"all")||"all",role:v(t,["role"],"staff")||"staff",defaultMailSenderId:v(t,["default_mail_sender_id"],""),phone:v(t,["phone"],""),avatarUrl:v(t,["avatar_url"],""),isActive:be(t,["is_active"],!0),lastSignInAt:v(t,["last_sign_in_at"],""),createdAt:v(t,["created_at"],"")}))}async function Zi(e){if(!e)return null;const t=await U("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:v(n,["id"],""),email:v(n,["email"],""),displayName:v(n,["display_name"],""),staffCode:v(n,["staff_code"],""),department:v(n,["department"],"all")||"all",role:v(n,["role"],"staff")||"staff",defaultMailSenderId:v(n,["default_mail_sender_id"],""),phone:v(n,["phone"],""),avatarUrl:v(n,["avatar_url"],""),isActive:be(n,["is_active"],!0),lastSignInAt:v(n,["last_sign_in_at"],"")}}async function el(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function tl(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function al(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>ee);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function nl(e=100){return(await U("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),action:v(n,["action"],""),entityType:v(n,["entity_type"],""),entityId:v(n,["entity_id"],""),userEmail:v(n,["user_email"],""),changes:n.changes??{},createdAt:v(n,["created_at"],"")}))}const sa={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function Ks(){return(await U("slack_notifications",{order:"event_type.asc"})).map(t=>({id:v(t,["id"],""),eventType:v(t,["event_type"],"new_order"),enabled:be(t,["enabled"],!0),channel:v(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:v(t,["last_triggered_at"],"")}))}async function sl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function ol(e=50){return(await U("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),eventType:v(n,["event_type"],""),channel:v(n,["channel"],""),message:v(n,["message"],""),status:v(n,["status"],"sent"),error:v(n,["error"],""),sentAt:v(n,["sent_at"],"")}))}async function rl(e,t,n){const r=(await Js()).find(y=>y.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const l=r.config.webhook_url;if(!l)return{ok:!1,error:"Webhook URL未設定"};const d=(await Ks()).find(y=>y.eventType===e&&y.enabled);if(!d)return{ok:!1,error:"通知ルールが無効"};const u=n??d.channel??r.config.default_channel??"#general";try{const y=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${sa[e]} ${t}`,channel:u})}),f=y.ok,{supabaseInsert:g}=await I(async()=>{const{supabaseInsert:$}=await Promise.resolve().then(()=>ee);return{supabaseInsert:$}},void 0);return await g("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:f?"sent":"failed",error:f?null:`HTTP ${y.status}`}),f?{ok:!0}:{ok:!1,error:`HTTP ${y.status}`}}catch(y){return{ok:!1,error:y instanceof Error?y.message:String(y)}}}const pa={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},pn={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function il(){return(await U("prospects",{order:"updated_at.desc"})).map(t=>({id:v(t,["id"],""),companyName:v(t,["company_name"],""),contactName:v(t,["contact_name"],""),email:v(t,["email"],""),phone:v(t,["phone"],""),address:v(t,["address"],""),website:v(t,["website"],""),businessType:v(t,["business_type"],""),stage:v(t,["stage"],"cold"),source:v(t,["source"],""),expectedAmount:re(t.expected_amount),probability:re(t.probability),assignedStaffCode:v(t,["assigned_staff_code"],""),nextActionDate:v(t,["next_action_date"],""),nextAction:v(t,["next_action"],""),note:v(t,["note"],""),lastContactAt:v(t,["last_contact_at"],""),wonAt:v(t,["won_at"],""),lostAt:v(t,["lost_at"],""),lostReason:v(t,["lost_reason"],""),convertedCustomerCode:v(t,["converted_customer_code"],""),createdAt:v(t,["created_at"],"")}))}async function Hs(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0),n=await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()});return n?{...e,id:v(n,["id"],e.id)}:null}async function ll(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);try{const o=new URL("/rest/v1/prospects",t);return o.searchParams.set("id",`eq.${e}`),(await fetch(o.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function cl(e){return(await U("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:v(n,["id"],""),prospectId:v(n,["prospect_id"],""),activityType:v(n,["activity_type"],"call"),title:v(n,["title"],""),description:v(n,["description"],""),activityDate:v(n,["activity_date"],""),result:v(n,["result"],""),staffCode:v(n,["staff_code"],"")}))}async function dl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const Qs=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function pl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function ul(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ml(){return(await ve("v_customer_map")).map(t=>({customerCode:v(t,["customer_code"],""),name:v(t,["name"],""),phone:v(t,["phone"],""),areaCode:v(t,["area_code"],""),businessType:v(t,["business_type"],""),businessTypeName:v(t,["business_type_name"],""),address1:v(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:be(t,["is_at_risk"],!1),isDormant:be(t,["is_dormant"],!1),amount12m:q(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}async function Ws(){return(await ve("customers",{select:"id,legacy_customer_code,name,address1",is_active:"eq.true",lat:"is.null",address1:"not.is.null",order:"name.asc"})).map(t=>({id:v(t,["id"],""),customerCode:v(t,["legacy_customer_code"],""),name:v(t,["name"],""),address1:v(t,["address1"],"")}))}async function yl(e){try{const t=`https://nominatim.openstreetmap.org/search?format=json&countrycodes=jp&limit=1&q=${encodeURIComponent(e)}`,n=await fetch(t,{headers:{"User-Agent":"sake-system-crm/1.0"}});if(!n.ok)return null;const o=await n.json();return o.length===0?null:{lat:parseFloat(o[0].lat),lng:parseFloat(o[0].lon)}}catch{return null}}async function hl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:c,SUPABASE_ANON_KEY:d}},void 0),o=await Ws();let r=0,l=0;for(let c=0;c<o.length;c++){const d=o[c];e(c,o.length,d.name);const u=await yl(d.address1);if(u)try{const y=new URL(`/rest/v1/customers?id=eq.${d.id}`,t);await fetch(y.toString(),{method:"PATCH",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({lat:u.lat,lng:u.lng})}),r++}catch{l++}else l++;c<o.length-1&&await new Promise(y=>setTimeout(y,1100))}return e(o.length,o.length,"完了"),{success:r,failed:l}}const ua=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function gl(){return(await ve("customer_churn_notes")).map(t=>({customerCode:v(t,["customer_code"],""),reason:v(t,["reason"],""),memo:v(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:v(t,["updated_at"],"")}))}async function fl(e){const{supabaseUpsert:t}=await I(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>ee);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function vl(){return(await U("delivery_locations",{order:"name.asc"})).map(t=>({id:v(t,["id"],""),customerCode:v(t,["customer_code"],""),name:v(t,["name"],""),postalCode:v(t,["postal_code"],""),address:v(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:v(t,["contact_name"],""),phone:v(t,["phone"],""),deliveryNote:v(t,["delivery_note"],""),isActive:be(t,["is_active"],!0)}))}async function bl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function wl(e=50){return(await U("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:v(n,["id"],""),callDirection:v(n,["call_direction"],"inbound"),fromNumber:v(n,["from_number"],""),toNumber:v(n,["to_number"],""),matchedCustomerCode:v(n,["matched_customer_code"],""),matchedProspectId:v(n,["matched_prospect_id"],""),durationSeconds:re(n.duration_seconds),callStatus:v(n,["call_status"],"answered"),recordingUrl:v(n,["recording_url"],""),transcript:v(n,["transcript"],""),ivryCallId:v(n,["ivry_call_id"],""),startedAt:v(n,["started_at"],""),endedAt:v(n,["ended_at"],""),notes:v(n,["notes"],"")}))}async function Gs(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function xl(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const o=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(o,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const c=(await r.json()).calls??[];let d=0;for(const u of c)await Gs({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),d++;return await Dt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${d}件取得`}),{count:d}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function $l(e,t){const n=e.config.api_key,o=e.config.team_id;if(!n||!o)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const l of t){if(!l.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${o}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:l.name,phone_number:l.phone,external_id:l.customerCode??"",note:l.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function _l(){return(await U("lead_lists",{order:"created_at.desc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),query:v(t,["query"],""),area:v(t,["area"],""),businessType:v(t,["business_type"],""),totalCount:re(t.total_count),source:v(t,["source"],"manual"),createdAt:v(t,["created_at"],"")}))}async function Sl(e){return(await U("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:v(n,["id"],""),listId:v(n,["list_id"],""),companyName:v(n,["company_name"],""),address:v(n,["address"],""),phone:v(n,["phone"],""),website:v(n,["website"],""),email:v(n,["email"],""),businessType:v(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:re(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:v(n,["place_id"],""),status:v(n,["status"],"new"),convertedProspectId:v(n,["converted_prospect_id"],""),note:v(n,["note"],"")}))}async function kl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function Xs(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function Pl(e,t,n){const o=e.config.api_key;if(!o)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),l=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${o}`;try{const c=await fetch(l);if(!c.ok)return{results:[],error:`HTTP ${c.status}`};const d=await c.json();return d.status!=="OK"&&d.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${d.status}`}:{results:d.results.map(y=>{const f=y.geometry?.location;return{id:`place_${y.place_id}`,listId:"",companyName:String(y.name??""),address:String(y.formatted_address??""),rating:y.rating?Number(y.rating):void 0,reviewCount:y.user_ratings_total?Number(y.user_ratings_total):void 0,lat:f?.lat,lng:f?.lng,placeId:String(y.place_id??""),status:"new"}})}}catch(c){return{results:[],error:c instanceof Error?c.message:String(c)}}}async function El(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await Hs(t);return n&&await Xs({...e,status:"imported",convertedProspectId:t.id}),n}async function Al(){return(await U("workflow_orders",{order:"order_date.desc"})).map(t=>({id:v(t,["id"],""),orderNo:v(t,["order_no"],""),customerName:v(t,["customer_name"],""),customerCode:v(t,["customer_code"],""),orderDate:v(t,["order_date"],""),deliveryDate:v(t,["delivery_date"],""),stage:v(t,["stage"],"new"),totalAmount:re(t.total_amount),itemCount:re(t.item_count),priority:v(t,["priority"],"normal"),staffName:v(t,["staff_name"],""),notes:v(t,["notes"],"")}))}async function Ll(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function Cl(){return(await U("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:v(t,["id"],""),name:v(t,["name"],""),email:v(t,["email"],""),phone:v(t,["phone"],""),visitDate:v(t,["visit_date"],""),partySize:re(t.party_size)||1,language:v(t,["language"],"ja"),purpose:v(t,["purpose"],""),message:v(t,["message"],""),status:v(t,["status"],"new"),repliedAt:v(t,["replied_at"],""),confirmedTime:v(t,["confirmed_time"],""),createdAt:v(t,["created_at"],new Date().toISOString())}))}async function Dl(e){const{supabaseInsert:t}=await I(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>ee);return{supabaseInsert:o}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const ql=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function Zs(){return(await Promise.all(ql.map(async t=>{const[n,o]=await Promise.all([Qa(t.table),U(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:o[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Wt(e,t,n=100){const o=(t-1)*n,[r,l]=await Promise.all([U(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(o)}),Qa(e)]);return{records:r,total:l}}async function Oa(e){const t=await U("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const o=JSON.parse(n);return String(o.price_group??"")}catch{return""}return""}async function eo(e,t){if(e){const o=await U("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(o.length>0&&o[0].special_price)return re(o[0].special_price)}const n=await U("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?re(n[0].default_sale_price):0}const Tl=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],Il=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],Nl={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function Ml(){const e=new Date,t=[];for(let u=11;u>=0;u--){const y=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`)}const n=Tl,o={},r={};for(const u of n){o[u.code]={};for(const y of t){const f=parseInt(y.split("-")[1])-1,g=Nl[u.code]??100,$=Math.round(g*Il[f]*(.85+Math.random()*.3));o[u.code][y]=$,r[y]=(r[y]??0)+$}}const l={},c={},d={};for(const u of n){const y=t.map($=>o[u.code][$]??0),f=y.reduce(($,P)=>$+P,0)/y.length,g=y.reduce(($,P)=>$+(P-f)**2,0)/y.length;l[u.code]=y.reduce(($,P)=>$+P,0),c[u.code]=f,d[u.code]=Math.sqrt(g)}return{months:t,products:n,matrix:o,totals:r,productTotals:l,productAvg:c,productStdDev:d}}async function Rl(e=36){const t=(()=>{const $=new Date;return $.setMonth($.getMonth()-e),`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`})();let n=[];try{n=await ve("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"})}catch($){console.warn("fetchDemandAnalysis: query failed, using empty",$)}if(n.length===0)return Ml();const o=new Set,r=new Map,l={},c={};for(const $ of n){const P=v($,["year_month"],""),_=v($,["product_code"],""),D=v($,["product_name"],_),k=q($,["quantity"],0);!P||!_||(o.add(P),r.set(_,D),l[_]||(l[_]={}),l[_][P]=k,c[P]=(c[P]??0)+k)}const d=[...o].sort(),u=[...r.entries()].map(([$,P])=>({code:$,name:P})),y={},f={},g={};for(const $ of u){const P=d.map(k=>l[$.code]?.[k]??0),_=P.reduce((k,L)=>k+L,0)/(P.length||1),D=P.reduce((k,L)=>k+(L-_)**2,0)/(P.length||1);y[$.code]=P.reduce((k,L)=>k+L,0),f[$.code]=_,g[$.code]=Math.sqrt(D)}return{months:d,products:u,matrix:l,totals:c,productTotals:y,productAvg:f,productStdDev:g}}async function Ol(){let e=[];try{e=await U("product_safety_stock_params",{order:"product_code.asc"})}catch(t){return console.warn("fetchSafetyStockParams failed:",t),[]}return e.map(t=>({productCode:v(t,["product_code"],""),productName:v(t,["product_name"],""),unit:v(t,["unit"],"本"),avgMonthlyDemand:q(t,["avg_monthly_demand"],0),demandStdDev:q(t,["demand_std_dev"],0),leadTimeDays:q(t,["lead_time_days"],30),serviceLevel:q(t,["service_level"],.95),safetyStockQty:q(t,["safety_stock_qty"],0),reorderPoint:q(t,["reorder_point"],0),memo:v(t,["memo"],""),productionType:v(t,["production_type"],"monthly")}))}async function Bl(e){return(await U("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:v(n,["id"],""),yearMonth:v(n,["year_month"],e),productCode:v(n,["product_code"],""),productName:v(n,["product_name"],""),demandForecast:q(n,["demand_forecast"],0),safetyStockTarget:q(n,["safety_stock_target"],0),openingStock:q(n,["opening_stock"],0),requiredProduction:q(n,["required_production"],0),plannedQty:q(n,["planned_qty"],0),actualQty:q(n,["actual_qty"],0),status:v(n,["status"],"draft"),productionType:v(n,["production_type"],"monthly"),notes:v(n,["notes"],"")}))}async function jl(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await I(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>ee);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);if(!n||e.length===0)return!1;try{const o=e.map(c=>({product_code:c.productCode,product_name:c.productName,unit:c.unit,avg_monthly_demand:c.avgMonthlyDemand,demand_std_dev:c.demandStdDev,lead_time_days:c.leadTimeDays,service_level:c.serviceLevel,safety_stock_qty:c.safetyStockQty,reorder_point:c.reorderPoint,production_type:c.productionType,memo:c.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),r=new URL("/rest/v1/product_safety_stock_params",t),l=await fetch(r.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(o)});if(!l.ok){const c=await l.text();return console.error("saveSafetyStockParamsBulk failed:",l.status,c),!1}return!0}catch(o){return console.error("saveSafetyStockParamsBulk error:",o),!1}}async function zl(e){const{supabaseUpsert:t}=await I(async()=>{const{supabaseUpsert:o}=await Promise.resolve().then(()=>ee);return{supabaseUpsert:o}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function Fl(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}function fa(e,t,n){t>0&&n>0&&(e[t]=(e[t]||0)+n)}function Pn(e){return Object.entries(e).map(([t,n])=>({volumeMl:Number(t),label:Number(t)>=1e3?`${Number(t)}ml`:`${Number(t)}ml`,bottles:Number(n)})).sort((t,n)=>t.volumeMl-n.volumeMl)}async function Vl(e){const[t,n]=e.split("-").map(Number),o=`${e}-01`,r=new Date(t,n,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}`,c=await ve("sales_document_headers",{select:"document_no,legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${o},sales_date.lte.${l})`,order:"sales_date.asc"}),d=await ve("sales_document_lines",{select:"document_no,legacy_product_code,quantity",note:`like.*date:${e}*`,order:"document_no"}),u=await ve("products",{select:"legacy_product_code,volume_ml"}),y={};for(const D of u)D.legacy_product_code&&D.volume_ml&&(y[D.legacy_product_code]=D.volume_ml);const f={};for(const D of d){const k=D.document_no,L=y[D.legacy_product_code]||0;L>0&&D.quantity>0&&(f[k]||(f[k]={}),fa(f[k],L,D.quantity))}const g=await ve("customers",{select:"legacy_customer_code,address1",address1:"not.is.null"}),$={};for(const D of g)D.address1&&($[D.legacy_customer_code]=Fl(D.address1));const P={};for(const D of c){const k=D.sales_date;if(!k)continue;const L=D.legacy_customer_code||"",s=`${k}|${L}`,i=D.document_no||D.legacy_document_no||"";P[s]||(P[s]={date:k,custCode:L,custName:D.customer_name||"",city:$[L]||"住所未登録",amount:0,invoiceCount:0,volumes:{}}),P[s].amount+=Number(D.total_amount)||0,P[s].invoiceCount++;const p=f[i];if(p)for(const[m,h]of Object.entries(p))fa(P[s].volumes,Number(m),Number(h))}const _={};for(const D of Object.values(P)){_[D.date]||(_[D.date]={date:D.date,entries:[],cityGroups:[],totalAmount:0,count:0,totalVolumes:[]});const k=_[D.date];k.entries.push({customerCode:D.custCode,customerName:D.custName,city:D.city,amount:D.amount,invoiceCount:D.invoiceCount,volumes:Pn(D.volumes)}),k.totalAmount+=D.amount,k.count+=D.invoiceCount}for(const D of Object.values(_)){const k={},L={};for(const s of D.entries){k[s.city]=(k[s.city]||0)+1;for(const i of s.volumes)fa(L,i.volumeMl,i.bottles)}D.cityGroups=Object.entries(k).sort((s,i)=>i[1]-s[1]).map(([s,i])=>({city:s,count:i})),D.totalVolumes=Pn(L)}return _}async function oa(){return U("quotes",{select:"id,quote_no,quote_date,valid_until,legacy_customer_code,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function to(e){const t=await U("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await U("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function Ul(){const e=new Date().toISOString().slice(0,7)+"-01";return ve("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}async function ra(){const e=await U("app_feature_status",{select:"*"}),t={};for(const n of e)t[n.feature_id]={featureId:n.feature_id,confirmedAt:n.confirmed_at,confirmedBy:n.confirmed_by,notes:n.notes};return t}async function ao(e,t){await Ct("app_feature_status","feature_id",[{feature_id:e,confirmed_at:new Date().toISOString(),confirmed_by:t,updated_at:new Date().toISOString()}])}async function no(e){await Ct("app_feature_status","feature_id",[{feature_id:e,confirmed_at:null,confirmed_by:null,updated_at:new Date().toISOString()}])}const O=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:dn,CALENDAR_CATEGORY_LABELS:cn,CHURN_REASONS:ua,DEPT_LABELS:na,INVOICE_TYPE_LABELS:Na,JIKOMI_STATUS_LABELS:Ts,MATERIAL_CATEGORIES:Qs,PROSPECT_STAGE_COLORS:pn,PROSPECT_STAGE_LABELS:pa,ROLE_LABELS:aa,SEASONAL_TEMPLATES:Ga,SLACK_EVENT_LABELS:sa,TAX_DEDUCTION_LABELS:Ra,TAX_RATE_CATEGORIES:Fs,abcPeriodToDates:sn,addBrewingCustomCategory:di,addBrewingStockEntry:ri,addRiceVariety:ai,addTank:Ur,autoScheduleAllBatches:Kr,batchGeocode:hl,calcWeeklyLabor:Gr,confirmFeature:ao,convertLeadToProspect:El,createBrewingBatch:jr,deleteBrewingCustomCategory:ui,deleteBrewingStockEntry:li,deleteCalendarEvent:Ui,deleteMailSender:zi,deleteMaterial:ul,deletePrintLayout:Oi,deleteProspect:ll,deleteRicePurchaseCommitment:ei,deleteRiceVariety:ni,deleteTank:Yr,deleteUserProfile:tl,fetchAllBrewingStockEntries:oi,fetchAnalyticsByPeriod:or,fetchAnnouncements:$i,fetchAuditLogs:nl,fetchAvailablePeriods:rr,fetchAvailableProductionTypes:Sr,fetchBillList:js,fetchBillingSummary:an,fetchBrewingAlcoholSettings:kr,fetchBrewingBatches:Nr,fetchBrewingCategoryOverrides:yi,fetchBrewingCustomCategories:ci,fetchBrewingForecastOverrides:Ar,fetchBrewingMonthlyTrend:gr,fetchBrewingPlanSummary:hr,fetchBrewingProcessSteps:Mr,fetchBrewingProductDetail:fr,fetchBrewingRiceParams:Cr,fetchBrewingSchedule:vr,fetchBrewingSeasonalPattern:qr,fetchBrewingStockEntries:si,fetchBrewingYearlyShipments:Er,fetchCalendarEvents:Fi,fetchCallLogs:wl,fetchCategoryTypeLinks:xr,fetchChurnAlerts:_i,fetchChurnNotes:gl,fetchCustomerAnalysis:Cs,fetchCustomerEfficiency:Li,fetchCustomerEfficiencyByYear:it,fetchCustomerLedger:Za,fetchCustomerPriceGroup:Oa,fetchCustomerPricing:Ma,fetchCustomerProductBreakdown:ur,fetchCustomersWithoutGeo:Ws,fetchDeliveryLocations:vl,fetchDeliveryNote:tn,fetchDeliverySchedule:xi,fetchDemandAnalysis:Rl,fetchDemandForecasts:wi,fetchEntityMonthlySales:yr,fetchFaxInbox:Qi,fetchFeatureStatuses:ra,fetchIntegrationSettings:Js,fetchInvoiceLines:Ia,fetchInvoices:Et,fetchJikomiList:Is,fetchKenteiList:Ms,fetchLabelExclusions:hi,fetchLeadItems:Sl,fetchLeadLists:_l,fetchMailSenders:Bi,fetchMapCustomers:ml,fetchMasterStats:Xa,fetchMaterialList:Rs,fetchMyProfile:Zi,fetchOrderHeaders:Ul,fetchPayableList:Bs,fetchPaymentStatus:vs,fetchPeriodChartData:dr,fetchPipelineMeta:bs,fetchPrintLayouts:Mi,fetchProcurementDecisions:Tr,fetchProductABC:Ds,fetchProductCustomerBreakdown:mr,fetchProductDaily:Ai,fetchProductMonthlyShipments:bi,fetchProductPower:Ei,fetchProductPrice:eo,fetchProductShipmentsFromTable:Pi,fetchProductionPlan:Bl,fetchProspectActivities:cl,fetchProspects:il,fetchPurchaseList:Os,fetchQuoteList:oa,fetchQuoteWithLines:to,fetchRawMaterialStock:zs,fetchRawRecords:Wt,fetchRawTableList:Zs,fetchRicePurchaseCommitments:Xr,fetchRiceVarieties:ti,fetchSafetyStockParams:Ol,fetchSakeTaxByMonth:rn,fetchSalesAnalytics:en,fetchSalesReport:Ps,fetchSalesSummary:fs,fetchSeasonalProfiles:ki,fetchShipmentCalendar:Vl,fetchShopifyOrders:Ji,fetchSlackLogs:ol,fetchSlackRules:Ks,fetchStaffCustomerBreakdown:lr,fetchStaffProductBreakdown:cr,fetchStaffTotalsByPeriod:ir,fetchStepLabor:Wr,fetchStoreOrders:Us,fetchStoreSales:ln,fetchSyncDashboard:ws,fetchSystemHealth:xs,fetchSystemSetting:gs,fetchTankList:Ns,fetchTanks:Vr,fetchTaxDeclaration:on,fetchTourInquiriesFromDb:Cl,fetchTypesInCategory:pi,fetchUserProfiles:Xi,fetchVisitPriorities:Si,fetchWorkerSettings:Hr,fetchWorkflowOrdersFromDb:Al,generateTaxCSV:qi,generateTaxXML:Vs,getTankOccupancy:Jr,linkTypeToCategory:$r,ocrFaxImage:Wi,periodToDateRange:_s,preloadInvoiceLines:$s,prevYearFilter:pr,reassignBrewingStockEntry:ii,recalculateTaxDeclaration:Ti,recordAudit:al,resolveProductPrice:nn,saveBrewingAlcoholSetting:Pr,saveBrewingForecastOverride:Lr,saveBrewingRiceParams:Dr,saveBrewingSchedule:br,saveCalendarEvent:Vi,saveCallLog:Gs,saveChurnNote:fl,saveDeliveryLocation:bl,saveEmailCampaign:Qt,saveFaxRecord:Gi,saveIntegrationSetting:Dt,saveInvoice:ks,saveLabelExclusions:gi,saveLeadItem:Xs,saveLeadList:kl,saveMailSender:ji,saveMaterial:pl,savePrintLayout:Ri,saveProcurementDecision:Ir,saveProductionPlan:zl,saveProspect:Hs,saveProspectActivity:dl,saveRicePurchaseCommitment:Zr,saveSafetyStockParamsBulk:jl,saveSlackRule:sl,saveStoreOrder:Ni,saveTaxDeclaration:Ii,saveTourInquiry:Dl,saveUserProfile:el,saveWorkerSettings:Qr,saveWorkflowOrder:Ll,searchPlaces:Pl,sendEmailCampaign:Ys,sendSlackNotification:rl,setBrewingCategoryOverride:mi,submitFeatureRequest:Es,syncGoogleCalendar:Hi,syncIvryCallLogs:xl,syncPhoneBookToIvry:$l,syncShopifyOrders:Yi,unconfirmFeature:no,unlinkTypeFromCategory:_r,updateBrewingBatch:Fr,updateBrewingProcessStep:zr,updateCustomer:As,updateProduct:Ls,upsertBrewingStock:wr,upsertSystemSetting:st},Symbol.toStringTag,{value:"Module"}));function Ze(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Yl={open:"未締め",closed:"締め済"};function Jl(e,t){const n=e.customers.map(o=>`
      <tr>
        <td>
          <div class="table-title">${o.customerName}</div>
          <div class="table-sub mono">${o.customerCode}</div>
        </td>
        <td class="numeric">${o.closingDay}日</td>
        <td class="numeric">${Ze(o.salesAmount)}</td>
        <td class="numeric">${Ze(o.taxAmount)}</td>
        <td class="numeric">${Ze(o.prevBalance)}</td>
        <td class="numeric">${Ze(o.paymentAmount)}</td>
        <td class="numeric"><strong>${Ze(o.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${o.status==="closed"?"success":"warning"}">${Yl[o.status]}</span>
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
        <p class="kpi-value">${Ze(e.totalBilling)}</p>
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
  `}const Kl={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},Hl={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function En(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function It(e){const t=Hl[e],n=Kl[e].map(o=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${En(o.title)}</p>
            <p class="category-card-description">${En(o.description)}</p>
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
  `}function so(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function St(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ql(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${so(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${St(t.amount)}</td>
        </tr>
      `).join("")}function Wl(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${so(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${St(t.amount)}</td>
        </tr>
      `).join("")}function Gl(e,t){return`
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
            <dd>${St(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${St(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${St(e.balanceAmount)}</dd>
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
            <tbody>${Ql(e)}</tbody>
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
            <tbody>${Wl(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function yt(e,t,n){const o=e.findIndex(l=>l.column===t);if(o>=0){if(e[o].direction==="asc"){const c=[...e];return c[o]={column:t,direction:"desc"},c}return e.filter((c,d)=>d!==o)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function Xl(e,t){const n=e.findIndex(l=>l.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const o=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${o}${r}</span>`}function te(e,t,n,o=""){return`<th class="sortable ${o}" data-sort-col="${e}">${t} ${Xl(n,e)}</th>`}function An(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function dt(e,t,n){return t.length===0?e:[...e].sort((o,r)=>{for(const{column:l,direction:c}of t){const d=n[l];if(!d)continue;const u=An(o[d]),y=An(r[d]);let f=0;if(typeof u=="number"&&typeof y=="number"?f=u-y:f=String(u).localeCompare(String(y),"ja"),f!==0)return c==="asc"?f:-f}return 0})}const Zl={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},Ln={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},ht={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function ec(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function tc(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function ac(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function oo(e,t){const n=tc(t),o=ac(t),[r,l]=t.split("-").map(Number),c=new Map;e.forEach(p=>{if(p.date.slice(0,7)===t){const m=p.date.slice(0,10);c.has(m)||c.set(m,[]),c.get(m).push(p)}});const d=e.filter(p=>p.date.slice(0,7)===t),u=d.reduce((p,m)=>p+m.quantity,0),y=new Set(d.map(p=>p.date)).size,f=new Date().toISOString().slice(0,10),g=["日","月","火","水","木","金","土"].map(p=>`<th class="dcal-header">${p}</th>`).join("");let $="",P=1;for(let p=0;p<6&&!(P>n&&p>0);p++){$+="<tr>";for(let m=0;m<7;m++)if(p===0&&m<o||P>n)$+='<td class="dcal-cell dcal-empty"></td>';else{const h=`${r}-${String(l).padStart(2,"0")}-${String(P).padStart(2,"0")}`,b=c.get(h)||[],x=h===f,w=b.reduce((S,C)=>S+C.quantity,0);$+=`
          <td class="dcal-cell ${x?"dcal-today":""}">
            <div class="dcal-day">${P}</div>
            ${b.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${b[0].status}">${b.length}件 ${w}本</div>
              </div>
            `:""}
          </td>`,P++}$+="</tr>"}const[_,D]=l===1?[r-1,12]:[r,l-1],[k,L]=l===12?[r+1,1]:[r,l+1],s=`${_}-${String(D).padStart(2,"0")}`,i=`${k}-${String(L).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${l}月: ${y}日稼働 / ${d.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${s}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${r}年${l}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${i}">▶</button>
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
  `}function nc(e,t){const n=t==="all"?e:e.filter(d=>d.segment===t),o={all:e.length};e.forEach(d=>{o[d.segment]=(o[d.segment]??0)+1});const l=["all",...[...new Set(e.map(d=>d.segment))]].map(d=>`
      <button class="button ${t===d?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${d}">
        ${d==="all"?"全て":Ln[d]??d} (${o[d]??0})
      </button>
    `).join(""),c=n.map(d=>`
      <tr>
        <td class="mono">${d.code}</td>
        <td>${d.name}</td>
        <td><span class="segment-badge" style="background:${ht[d.segment]??"#718096"};">${Ln[d.segment]??d.segment}</span></td>
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
            <li><span class="segment-badge" style="background:${ht.monthly};">通年出荷</span> 年7ヶ月以上出荷。12月除外の平均で予測</li>
            <li><span class="segment-badge" style="background:${ht["december-settlement"]};">歳暮（11月生産）</span> 12月出荷が年間80%以上。前年12月実績で予測</li>
            <li><span class="segment-badge" style="background:${ht["seasonal-batch"]};">季節集中</span> 年4〜6ヶ月出荷。前年同月実績で予測</li>
            <li><span class="segment-badge" style="background:${ht["made-to-order"]};">受注生産</span> 年3ヶ月以下の不定期出荷。予測なし</li>
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
  `}function sc(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${oo(e.deliveries,e.calendarMonth)}
    ${nc(e.forecasts,e.selectedSegment)}
  `}function oc(e,t){return oo(e,t)}const Nt={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function Cn(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function va(e,t,n){if(t==="all")return e;const o=new Date,r=o.toISOString().slice(0,10),l=new Date(o);switch(t){case"today":return e.filter(c=>c.date.slice(0,10)===r);case"month":return e.filter(c=>c.date.slice(0,7)===r.slice(0,7));case"future":{const c=new Date(o.getFullYear(),o.getMonth(),1).toISOString().slice(0,10);return e.filter(d=>d.date.slice(0,10)>=c)}case"90days":return l.setDate(l.getDate()-90),e.filter(c=>c.date>=l.toISOString());case"year":return l.setFullYear(l.getFullYear()-1),e.filter(c=>c.date>=l.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(c=>{const d=c.date.slice(0,10);return d>=n.start&&d<=n.end})}}function ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ba(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function rc(e){const o={top:20,right:20,bottom:30,left:50},r=760-o.left-o.right,l=260-o.top-o.bottom,c=Math.max(...e.map(f=>f.amount),1),d=r/e.length,u=e.map((f,g)=>{const $=f.amount/c*l,P=o.left+g*d+4,_=o.top+l-$,D=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(f.date));return`
        <g>
          <rect x="${P}" y="${_}" width="${Math.max(d-8,8)}" height="${$}" rx="4" fill="#0F5B8D" opacity="${.58+g/e.length*.34}" />
          ${g%5===0?`<text x="${P+6}" y="252" class="chart-axis">${D}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(f=>{const g=o.top+l-l*f,$=Math.round(c*f/1e3);return`
        <g>
          <line x1="${o.left}" y1="${g}" x2="${760-o.right}" y2="${g}" class="chart-grid" />
          <text x="6" y="${g+4}" class="chart-axis">${$.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function ic(e,t,n,o,r="month",l,c=[]){const d={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=va(e.allDailySales,r,l),y=u.reduce((z,Y)=>z+Y.amount,0),f=u.reduce((z,Y)=>z+Y.bottles,0),g=u.reduce((z,Y)=>z+Y.volumeMl,0),$=u.length,P=f>0?Math.round(y/f):0,_=g>0?Math.round(y/(g/1e3)):0,D=new Date,k=D.toISOString().slice(0,10),L=k.slice(0,7),s=va(e.allDailySales,"month").filter(z=>z.date.slice(0,10)<=k),i=s.reduce((z,Y)=>z+Y.amount,0);s.reduce((z,Y)=>z+Y.bottles,0);const p=D.getDate();new Date(D.getFullYear(),D.getMonth()+1,0).getDate();const h=(o?.orderHeaders??[]).filter(z=>z.sales_date.slice(0,7)===L),b=h.reduce((z,Y)=>z+Number(Y.total_amount),0),x=h.length,w=va(e.allDailySales,"month"),S=w.reduce((z,Y)=>z+Y.bottles,0),C=b>0?b:w.reduce((z,Y)=>z+Y.amount,0),A=b>0?"orders":"extrapolation",N=(u.length>0?e.allDailySales.filter(z=>{const Y=u[0]?.date??"",H=u[u.length-1]?.date??"",G=Cn(Y,-1),Q=Cn(H,-1);return z.date>=G&&z.date<=Q}):[]).reduce((z,Y)=>z+Y.amount,0),R=N>0?(y-N)/N*100:0,M=R>0?"+":"",B=e.salesRecords.slice(0,10).map(z=>`
            <tr class="clickable-row" data-doc-no="${z.documentNo}" style="cursor:pointer">
              <td class="mono">${z.documentNo}</td>
              <td>${ba(z.date)}</td>
              <td>${z.customerName}</td>
              <td class="numeric">${ke(z.amount)}</td>
            </tr>
          `).join(""),j=["today","month","future","90days","year","all"].map(z=>`<button class="button ${z===r?"primary":"secondary"} small" type="button" data-period="${z}">${Nt[z]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${d[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${ba(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${j}</div>
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
        <p class="kpi-value">${ke(i)}</p>
        <p class="kpi-sub">${p}日経過 / ${s.length}営業日 / 日平均 ${s.length>0?ke(Math.round(i/s.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${ke(C)}</p>
        <p class="kpi-sub">${A==="orders"?`受注確定 ${x}件`:`出荷見込 ${S.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
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
        <p class="panel-title">${Nt[r]}売上</p>
        <p class="kpi-value">${ke(y)}</p>
        <p class="kpi-sub">${$}日間${$>0?` / 日平均 ${ke(Math.round(y/$))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${f.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${ke(P)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(g/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${ke(_)}</p>
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
            <p class="panel-caption">${Nt[r]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${rc(u.length>0?u:e.dailySales)}
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
              <dd>${ba(t.lastSyncAt)}</dd>
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
          <tbody>${B}</tbody>
        </table>
      </div>
    </section>

    <details class="panel collapsible-panel">
      <summary class="panel-header clickable">
        <div>
          <h2>日次推移</h2>
          <p class="panel-caption">${Nt[r]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${te("date","日付",c)}
              ${te("amount","売上",c,"numeric")}
              ${te("bottles","本数",c,"numeric")}
              ${te("volumeMl","液体量(L)",c,"numeric")}
              ${te("pricePerBottle","本単価",c,"numeric")}
              ${te("pricePerLiter","L単価",c,"numeric")}
            </tr>
          </thead>
          <tbody>${dt(c.length>0?u:u.slice().reverse(),c,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(z=>`
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

    ${o?lc(o):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function lc(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(d=>d.startsAt.slice(0,10)>=t).slice(0,5),o=e.tourInquiries.filter(d=>d.status==="new").length,r=e.churnSummary,l=r?r.atRiskCount+r.dormantCount+r.decliningCount:null,c=r?`<article class="panel kpi-card ${r.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
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

    ${e.deliveries&&e.deliveries.length>0?oc(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?cc(e.orderHeaders):""}
  `}function cc(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),o=new Date().toISOString().slice(0,10),r=o.slice(0,7),l=new Map;for(const g of e){const $=g.sales_date.slice(0,7),P=l.get($)??{count:0,total:0};l.set($,{count:P.count+1,total:P.total+Number(g.total_amount)})}const c=[...l.keys()].sort(),d=e.reduce((g,$)=>g+Number($.total_amount),0),u=c.map(g=>{const{count:$,total:P}=l.get(g);return`<tr>
      <td class="mono" style="font-weight:700;">${g===r?`${g}（当月）`:g}</td>
      <td class="numeric">${$.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(P)}</td>
    </tr>`}).join(""),y=e.filter(g=>g.sales_date>=o).slice(0,30),f=y.map(g=>`<tr>
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
        <span style="font-size:1.2rem;font-weight:700;color:var(--accent);">${t.format(d)}</span>
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
          <tbody>${f}</tbody>
        </table>
      </div>
      `:""}
    </section>
  `}function dc(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function et(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function pc(e,t){const n=e.lines.length?e.lines.map((r,l)=>`
          <tr>
            <td class="numeric">${l+1}</td>
            <td class="mono">${r.productCode}</td>
            <td>${r.productName}</td>
            <td class="numeric">${r.quantity.toLocaleString("ja-JP")}</td>
            <td>${r.unit}</td>
            <td class="numeric">${et(r.unitPrice)}</td>
            <td class="numeric">${et(r.amount)}</td>
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
            <tr><th>納品日</th><td>${dc(e.invoiceDate)}</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${et(o)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${et(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${et(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function qe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function uc(e){return qe(e).replaceAll(`
`,"<br />")}function mc(e){const n=[...Object.values(Ga),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${qe(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),o=e.previewRecipients.length?e.previewRecipients.map(r=>`
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
          <div class="preview-box">${e.body?uc(e.body):"本文未入力"}</div>
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
  `}function De(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Mt(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function yc(e,t){const n=[Mt("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${De(r.name)}</strong>
            <span class="table-sub mono">${De(r.code)}</span>
          </button>
        `)),Mt("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${De(r.name)}</strong>
            <span class="table-sub mono">${De(r.code)}</span>
          </button>
        `)),Mt("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${De(r.documentNo)}</strong>
            <span class="table-sub">${De(r.customerName)} / ${De(r.date)}</span>
          </button>
        `)),Mt("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${De(r.path)}"
          >
            <strong>${De(r.title)}</strong>
            <span class="table-sub mono">${De(r.path)}</span>
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
            value="${De(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||o}
          </div>
        </div>
      </div>
    </div>
  `}function gt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ro(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${gt(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${gt(e.title)}">
        <div class="modal-header">
          <h2>${gt(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${gt(e.placeholder)}"
            value="${gt(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function Rt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Dn(e){return e.trim().toLowerCase()}function hc(e,t){const n=Dn(t),o=e.filter(l=>n?[l.code,l.name,l.name].map(Dn).some(c=>c.includes(n)):!0).slice(0,50),r=o.length?`
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
                      data-code="${Rt(l.code)}"
                      data-name="${Rt(l.name)}"
                    >
                      <td class="mono">${Rt(l.code)}</td>
                      <td>${Rt(l.name)}</td>
                      <td>${l.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return ro({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:r,emptyMessage:"該当する得意先が見つかりません。"})}function gc(e){return e.toISOString().slice(0,10)}function Ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ye(e,t){return e[t]?`<div class="field-error">${Ge(e[t])}</div>`:""}function tt(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function fc(e,t,n,o){const r=Object.keys(Na).map(u=>`<option value="${u}" ${e.invoiceType===u?"selected":""}>${Na[u]}</option>`).join(""),l=e.lines.map((u,y)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${tt(o,`lines.${y}.productCode`,"input-cell")}" type="text" data-line="${y}" data-field="productCode" value="${Ge(u.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${y}" aria-label="商品検索">🔍</button>
          </div>
          ${Ye(o,`lines.${y}.productCode`)}
        </td>
        <td>
          <input class="${tt(o,`lines.${y}.productName`,"input-cell")}" type="text" data-line="${y}" data-field="productName" value="${Ge(u.productName)}" placeholder="商品名" />
          ${Ye(o,`lines.${y}.productName`)}
        </td>
        <td>
          <input class="${tt(o,`lines.${y}.quantity`,"input-cell numeric")}" type="number" data-line="${y}" data-field="quantity" value="${u.quantity}" min="0" />
          ${Ye(o,`lines.${y}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${y}" data-field="unit" value="${u.unit}" placeholder="本" /></td>
        <td>
          <input class="${tt(o,`lines.${y}.unitPrice`,"input-cell numeric")}" type="number" data-line="${y}" data-field="unitPrice" value="${u.unitPrice}" min="0" />
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
    `).join(""),c=e.lines.reduce((u,y)=>u+y.amount,0),d=Math.floor(c*10/110);return`
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
          <input class="${tt(o,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||gc(new Date)}" />
          ${Ye(o,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${tt(o,"customerCode")}"
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
          <span class="total-value">${(c-d).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${d.toLocaleString("ja-JP")} 円</span>
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
  `}function vc(e){return"¥"+e.toLocaleString("ja-JP")}function bc(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const wc={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},xc={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},$c={sake:"酒販用",standard:"通常"};function _c(e,t,n="",o=""){const r=n?e.filter(u=>u.legacy_customer_code===n):e,l=8,c=t?`<tr><td colspan="${l}" class="empty-row">読み込み中…</td></tr>`:r.length===0?`<tr><td colspan="${l}" class="empty-row">見積書がありません</td></tr>`:r.map(u=>`
      <tr>
        <td class="mono">${u.quote_no}</td>
        <td>${bc(u.quote_date)}</td>
        <td>${u.customer_name||"（未選択）"}</td>
        <td>${u.subject||""}</td>
        <td class="numeric">${vc(u.total_amount)}</td>
        <td><span class="badge ${xc[u.status]??"badge-gray"}">${wc[u.status]??u.status}</span></td>
        <td>${$c[u.template_type]??u.template_type}</td>
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
        <span style="font-size:13px;color:var(--primary,#3b82f6);font-weight:600;">🔍 ${o||n} の見積のみ表示中</span>
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
  `}const io="kanei-quote-settings",lo=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Gt={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function Ba(){try{const e=localStorage.getItem(io);if(e)return{...Gt,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Gt,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Gt}}function Xe(e){localStorage.setItem(io,JSON.stringify(e))}function Me(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Se(e,t,n,o="text",r=""){return`<div class="form-row"><label>${t}</label><input type="${o}" id="${e}" value="${Me(n)}" placeholder="${Me(r)}" /></div>`}function Sc(e,t,n,o){const r=o.map(l=>`<option value="${Me(l)}" ${n===l?"selected":""}>${Me(l)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${r}</select></div>`}function kc(e){return`
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
        ${Sc("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
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
        ${lo.map(t=>`
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
  `}function Pc(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function ia(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:Pc(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}ia();function X(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ae(e){return"¥"+e.toLocaleString("ja-JP")}function qn(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function co(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function po(e,t,n){return"#"+[e,t,n].map(o=>Math.max(0,Math.min(255,Math.round(o))).toString(16).padStart(2,"0")).join("")}function la(e,t){const[n,o,r]=co(e);return po(n+(255-n)*t,o+(255-o)*t,r+(255-r)*t)}function uo(e,t){const[n,o,r]=co(e);return po(n*(1-t),o*(1-t),r*(1-t))}function Ec(e){const t=uo(e,.15),n=la(e,.88),o=la(e,.96);return`
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
`}function Ac(e){const t=uo(e,.15),n=la(e,.88),o=la(e,.96);return`
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
`}function mo(e,t){const n=e.lines.reduce((_,D)=>_+D.amount,0),o=Math.round(n*e.taxRate/100),r=n+o,l=e.templateType==="sake",c=l?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",d=l?9:6,u=e.lines.map((_,D)=>{const k=l?`<td style="font-size:9px;">${X(_.janCode)}</td><td style="text-align:center;">${_.caseQty??""}</td><td style="text-align:right;">${_.retailPrice!=null?Ae(_.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${D+1}</td>
      <td class="mono" style="font-size:9px;">${X(_.productCode)}</td>
      <td>${X(_.productName)}</td>
      ${k}
      <td style="text-align:right;">${_.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${X(_.unit)}</td>
      <td style="text-align:right;">${Ae(_.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${d}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,y=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),f=y?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${X(y)}</p>
    </div>
  `:"",g=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",$=[];e.validUntil&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${qn(e.validUntil)}</div></div>`),e.paymentTerms&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${X(e.paymentTerms)}</div></div>`),e.deliveryDate&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${X(e.deliveryDate)}</div></div>`),e.deliveryPlace&&$.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${X(e.deliveryPlace)}</div></div>`);const P=$.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min($.length,4)},1fr);">${$.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <div class="q-meta-box">
      ${e.quoteNo?`<div class="q-meta-item"><span class="q-meta-label">見積番号</span><span class="q-meta-val">${X(e.quoteNo)}</span></div>`:""}
      <div class="q-meta-item"><span class="q-meta-label">見積日</span><span class="q-meta-val">${qn(e.quoteDate)}</span></div>
    </div>
  </div>

  <!-- 取引先（左）・自社情報（右） -->
  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${X(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${X(e.customerAddress)}</p>`:""}
    </div>
    <div class="q-seller-col">
      <!-- 自社情報: 社名の右に印鑑 -->
      <div class="q-seller-name-row">
        <span class="q-seller-name">${X(t.companyName)}</span>
        ${g}
      </div>
      ${t.companyPostal?`<p class="q-seller-sub">〒${X(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${X(t.companyAddress1)}${t.companyAddress2?" "+X(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${X(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${X(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${X(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  ${P}

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${Ae(r)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${X(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${X(t.defaultHeaderNote)}</p>`:""}

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
      <tr><td colspan="${d-1}" style="text-align:right;">小計</td><td style="text-align:right;">${Ae(n)}</td></tr>
      <tr><td colspan="${d-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${Ae(o)}</td></tr>
      <tr class="q-total-row"><td colspan="${d-1}" style="text-align:right;">合計</td><td style="text-align:right;">${Ae(r)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${X(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${X(t.defaultFooterNote)}</p>`:""}

  ${f}
</div>`}function yo(e,t,n,o,r,l,c){const d=e.lines.reduce((_,D)=>_+D.amount,0),u=Math.round(d*e.taxRate/100),y=d+u,f=e.templateType==="sake",g=o.length>=1?t.filter(_=>_.name.includes(o)||_.code.includes(o)).slice(0,8):[],$=r.length>=1?n.filter(_=>_.name.includes(r)||_.code.includes(r)).slice(0,8):[];if(e.previewMode){const _=c.accentColor||"#0968e5";return`
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
        ${Ac(_)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${mo(e,c)}
      </div>
    `}const P=e.lines.map((_,D)=>{const k=f?`
      <td><input type="text" class="jan-input" data-line-idx="${D}" value="${X(_.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${D}" value="${_.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${D}" value="${_.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${X(_.productCode)}</td>
      <td>${X(_.productName)}</td>
      ${k}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${D}" value="${_.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${X(_.unit)}</td>
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
          ${lo.map(_=>`
            <button type="button" data-action="set-accent-color" data-color="${X(_.value)}" title="${X(_.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${c.accentColor===_.value?"#333":"transparent"};background:${X(_.value)};cursor:pointer;"></button>
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
          <input type="text" id="q-no" value="${X(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${X(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${X(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${X(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${X(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">既存得意先</p>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${X(o)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${g.length>0?`<div class="search-results">${g.map(_=>`
        <button class="search-item" type="button" data-select-customer="${_.code}" data-cust-name="${X(_.name)}" data-cust-addr="${X(_.address1||"")}">
          <span class="mono">${_.code}</span> ${X(_.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName&&!e.isProspect?`<div class="selected-item"><span class="mono">${X(e.customerCode)}</span> <strong>${X(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${X(e.customerAddress)}</span>`:""}</div>`:""}

      <div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--border);">
        <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">見込み顧客から選択</p>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="q-prospect-search" placeholder="見込み顧客名で検索…" style="flex:1;" />
          <button type="button" class="button secondary small" data-action="new-prospect-from-quote">＋ 新規登録</button>
        </div>
        <div id="q-prospect-results"></div>
        ${e.customerName&&e.isProspect?`<div class="selected-item" style="border-left:3px solid #48bb78;"><span style="font-size:11px;background:#48bb78;color:white;border-radius:3px;padding:1px 5px;margin-right:6px;">見込</span> <strong>${X(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${X(e.customerAddress)}</span>`:""}</div>`:""}
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
        <input type="text" id="q-prod-search" value="${X(r)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${$.length>0?`<div class="search-results">${$.map(_=>{const D=l?nn(_,l):{price:_.salePrice||0,label:"卸価格"},k=_.listPrice||0,L=D.label!=="標準価格"&&D.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${_.code}" data-prod-name="${X(_.name)}" data-prod-price="${D.price}" data-prod-retail="${k}" data-prod-jan="${X(_.janCode??"")}" data-prod-unit="${X(_.unit??"本")}" data-prod-case="${_.caseQty??""}">
          <span class="mono">${_.code}</span> ${X(_.name)}
          <span class="numeric" ${L?'style="color:#2f855a;font-weight:700;"':""}>納入 ${D.price?Ae(D.price):"未設定"} <small>(${D.label})</small>${k?`　定価 ${Ae(k)}`:""}</span>
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
          <tbody>${P}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="3">${X(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${Ae(d)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${Ae(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${Ae(y)}</span></div>
        </div>
      </div>
    </section>
  `}async function Lc(e,t){const n=t.accentColor||"#0968e5",o=document.createElement("div");o.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",o.innerHTML=`<style>${Ec(n)}</style>${mo(e,t)}`,document.body.appendChild(o);try{const[{default:r},{jsPDF:l}]=await Promise.all([I(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),I(()=>import("./jspdf.es.min-waS4_pQQ.js").then(_=>_.j),[])]),c=await r(o,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),d=210,u=297,y=c.width/d,f=u*y,g=new l({orientation:"portrait",unit:"mm",format:"a4"});let $=0,P=0;for(;$<c.height;){P>0&&g.addPage();const _=Math.min(f,c.height-$),D=document.createElement("canvas");D.width=c.width,D.height=Math.ceil(_);const k=D.getContext("2d");k.fillStyle="#ffffff",k.fillRect(0,0,D.width,D.height),k.drawImage(c,0,$,c.width,_,0,0,c.width,_);const L=D.toDataURL("image/jpeg",.95),s=_/y;g.addImage(L,"JPEG",0,0,d,s),$+=f,P++}g.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(o)}}function Ot(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function ho(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function go(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function fo(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function Cc(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function Dc(e,t,n,o,r){const l=new Map,c=new Map;for(const f of e){if(f.date>=t&&f.date<=n){const g=l.get(f.productCode);g?(g.amt+=f.amount,g.qty+=f.qty):l.set(f.productCode,{name:f.productName,vol:f.volumeMl,amt:f.amount,qty:f.qty})}f.date>=o&&f.date<=r&&c.set(f.productCode,(c.get(f.productCode)??0)+f.amount)}const d=[...l.entries()].map(([f,g])=>({code:f,...g})).sort((f,g)=>g.amt-f.amt),u=d.reduce((f,g)=>f+g.amt,0);let y=0;return d.map(f=>{y+=f.amt;const g=u>0?Math.round(f.amt*1e4/u)/100:0,$=y<=u*.7?"A":y<=u*.9?"B":"C",P=c.get(f.code)??0,_=P>0?Math.round((f.amt-P)/P*1e3)/10:null;return{code:f.code,name:f.name,volumeMl:f.vol,amount:f.amt,qty:f.qty,sharePct:g,rank:$,prevAmount:P,growthRate:_}})}function qc(e,t,n){const o=new Date,r=o.toISOString().slice(0,10);let l=r,c=r,d="";switch(e){case"week":{const f=new Date(o);f.setDate(f.getDate()-7),l=f.toISOString().slice(0,10),c=r,d="直近7日間";break}case"month":{l=r.slice(0,7)+"-01",c=r,d="当月";break}case"90days":{const f=new Date(o);f.setDate(f.getDate()-90),l=f.toISOString().slice(0,10),c=r,d="直近90日間";break}case"year":{const f=new Date(o);f.setFullYear(f.getFullYear()-1),l=f.toISOString().slice(0,10),c=r,d="直近1年間";break}case"custom":{l=t||r,c=n||r,d=`${l} 〜 ${c}`;break}}const u=new Date(l);u.setFullYear(u.getFullYear()-1);const y=new Date(c);return y.setFullYear(y.getFullYear()-1),{start:l,end:c,prevStart:u.toISOString().slice(0,10),prevEnd:y.toISOString().slice(0,10),label:d}}function Tc(e,t="all",n=[],o="year",r,l,c=[]){const d=qc(o,r,l),u=n.length>0?Dc(n,d.start,d.end,d.prevStart,d.prevEnd):e.map(s=>({code:s.code,name:s.name,volumeMl:s.volumeMl,amount:s.yearAmount,qty:s.yearQty,sharePct:s.sharePct,rank:s.rank,prevAmount:s.prevAmount,growthRate:s.growthRate})),y=u.filter(s=>s.rank==="A").length,f=u.filter(s=>s.rank==="B").length,g=u.filter(s=>s.rank==="C").length,$=u.filter(s=>s.growthRate!=null&&s.growthRate>10),P=u.filter(s=>s.growthRate!=null&&s.growthRate<-10);let _=u,D="全商品";switch(t){case"A":_=u.filter(s=>s.rank==="A"),D="Aランク";break;case"B":_=u.filter(s=>s.rank==="B"),D="Bランク";break;case"C":_=u.filter(s=>s.rank==="C"),D="Cランク";break;case"growing":_=$,D="成長商品(+10%以上)";break;case"declining":_=P,D="衰退商品(-10%以下)";break}const k=(s,i,p)=>`<button class="button ${t===s?"primary":"secondary"} small" data-product-filter="${s}">${i} (${p})</button>`,L=(s,i)=>`<button class="button ${o===s?"primary":"secondary"} small" data-product-period="${s}">${i}</button>`;return`
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
        <input type="date" id="pp-range-end" class="range-input" value="${l||""}" />
        <button class="button secondary small" type="button" data-action="pp-apply-range">適用</button>
        <span style="color:var(--text-secondary);font-size:13px;margin-left:8px;">${d.label}</span>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card" style="border-left:4px solid #2f855a;">
        <p class="panel-title">Aランク（売上70%）</p>
        <p class="kpi-value">${y} 商品</p>
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
        <p class="kpi-value">${P.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${D} (${_.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${k("all","全て",u.length)}
        ${k("A","A",y)}
        ${k("B","B",f)}
        ${k("C","C",g)}
        ${k("growing","成長",$.length)}
        ${k("declining","衰退",P.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${te("rank","ABC",c)}
              ${te("name","商品名",c)}
              ${te("amount","売上",c,"numeric")}
              ${te("sharePct","構成比",c,"numeric")}
              ${te("qty","本数",c,"numeric")}
              ${te("growthRate","前年同期比",c,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${dt(_,c,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(s=>`
              <tr>
                <td>${go(s.rank)}</td>
                <td>${s.name?s.name.slice(0,25):s.code}${s.volumeMl?` <small>${s.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${ho(s.amount)}</td>
                <td class="numeric">${s.sharePct}%</td>
                <td class="numeric">${s.qty.toLocaleString()}</td>
                <td class="numeric">${fo(s.growthRate)}</td>
              </tr>
            `).join("")}
            ${_.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ic(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,o="billing",r="jan"){const l=e.filter(P=>P.currentRank==="A").length,c=e.filter(P=>P.prevRank&&P.currentRank<P.prevRank).length,d=e.filter(P=>P.prevRank&&P.currentRank>P.prevRank).length,u=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,y=2011,f=[];for(let P=u;P>=y&&f.length<6;P--)f.push(P);const g=`
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;">
      <span style="font-size:13px;color:var(--text-secondary);margin-right:4px;">年度：</span>
      ${f.map(P=>`
        <button class="button ${P===n?"primary":"secondary"} small"
          data-action="efficiency-year-change" data-year="${P}"
          style="min-width:80px;">
          ${P}年度
        </button>
      `).join("")}
      <select data-action="efficiency-year-select"
        style="margin-left:8px;padding:4px 8px;border-radius:4px;border:1px solid var(--border);background:var(--surface);font-size:13px;">
        <option value="">過去年度…</option>
        ${Array.from({length:u-y+1},(P,_)=>u-_).filter(P=>!f.includes(P)).map(P=>`<option value="${P}" ${P===n?"selected":""}>${P}年度</option>`).join("")}
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
        <p class="kpi-value">${l} ${o==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">ランクアップ</p>
        <p class="kpi-value">${c} ${o==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${d} ${o==="billing"?"社":"店舗"}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>${o==="billing"?"得意先":"店舗（納品先）"}ABC分析（${n}${r==="jan"?"年・1〜12月":r==="oct"?"酒造年度・10〜翌9月":"年度・4〜翌3月"}）</h2></div>
      ${g}
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${te("currentRank","ABC",t)}
              ${te("name","得意先名",t)}
              ${te("yearAmount","年間売上",t,"numeric")}
              ${te("sharePct","構成比",t,"numeric")}
              ${te("orderDays","受注日数",t,"numeric")}
              ${te("growthRate","前年比",t,"numeric")}
              <th>変動</th>
            </tr>
          </thead>
          <tbody>
            ${dt(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(P=>`
              <tr>
                <td>${go(P.currentRank)}</td>
                <td>${P.name||P.code}</td>
                <td class="numeric">${ho(P.yearAmount)}</td>
                <td class="numeric">${P.sharePct}%</td>
                <td class="numeric">${P.orderDays}日</td>
                <td class="numeric">${fo(P.growthRate)}</td>
                <td>${Cc(P.currentRank,P.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Nc(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Xt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Mc(e,t,n=null,o=null){const r=e.length?e.map(l=>`
            <tr class="clickable-row${l.documentNo===n?" selected-row":""}"
                data-doc-no="${l.documentNo}">
              <td class="mono">${l.documentNo}</td>
              <td>${Nc(l.date)}</td>
              <td>
                <div class="table-title">${l.customerName}</div>
                <div class="table-sub mono">${l.customerCode}</div>
              </td>
              <td class="numeric">${l.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Xt(l.amount)}</td>
            </tr>
            ${l.documentNo===n?Rc(o):""}
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
  `}function Rc(e){if(!e)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="5">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(o=>`
      <tr>
        <td class="mono" style="width:40px">${o.lineNo}</td>
        <td class="mono" style="width:70px">${o.productCode}</td>
        <td class="product-name">${o.productName}</td>
        <td class="numeric" style="width:50px">${o.quantity}</td>
        <td class="numeric" style="width:80px">${Xt(o.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Xt(o.amount)}</td>
      </tr>`).join(""),n=e.reduce((o,r)=>o+r.amount,0);return`<tr class="line-detail-row"><td colspan="5">
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
  </td></tr>`}function Oc(e){return new Date(e.getFullYear(),e.getMonth(),1)}function Bc(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function vo(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function bo(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function Tn(e){const t=vo(bo(e),6);return t.setHours(23,59,59,999),t}function In(e){return new Date(`${e}T00:00:00`)}function Nn(e){return`${e.getMonth()+1}/${e.getDate()}`}function jc(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function zc(){const e=new Date,t=bo(Bc(Oc(e),-3)),n=Tn(new Date(e.getFullYear(),e.getMonth()+4,0)),o=[];let r=new Date(t);for(;r<=n;){const l=Tn(r);o.push({start:new Date(r),end:l,label:`${Nn(r)} - ${Nn(l)}`}),r=vo(r,7)}return o}function Fc(e){const t=zc(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,o=t.map(l=>`
        <div class="gantt-week">
          <span>${l.label}</span>
        </div>
      `).join(""),r=e.length?e.map(l=>{const c=In(l.startDate),d=In(l.expectedDoneDate),u=Math.max(0,t.findIndex(g=>g.end>=c)),y=Math.max(u,t.reduce((g,$,P)=>$.start<=d?P:g,u)),f=[`仕込番号: ${l.jikomiNo}`,`銘柄: ${l.productName}`,`期間: ${l.startDate} - ${l.expectedDoneDate}`,`タンク: ${l.tankNo}`,`備考: ${l.note||"なし"}`].join(`
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
                  title="${jc(f)}"
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
        ${r}
      </div>
    </section>
  `}function Mn(e,t){const n={planned:"neutral",active:"warning",done:"success"},o=e.map(d=>`
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
          <span class="status-pill ${n[d.status]}">${Ts[d.status]}</span>
        </td>
        <td>${d.note||"―"}</td>
      </tr>
    `).join(""),r=e.filter(d=>d.status==="active").length,l=e.filter(d=>d.status==="done").length,c=e.filter(d=>d.status==="planned").length;return`
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
  `}function Vc(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},o=e.map(u=>`
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
    `).join(""),r=e.filter(u=>u.status==="approved").length,l=e.filter(u=>u.status==="submitted").length,c=e.filter(u=>u.status==="pending").length;return`
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
          <tbody>${o||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Uc(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Yc(e,t){return`
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
        ${e?`<p class="field-error">${Uc(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function Jc(e){return`
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
  `}function Kc(e){return`
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
  `}const un={query:"",businessType:"",tradeType:"",areaCode:"",activeOnly:"",page:1},kt=50;function Hc(e,t){let n=e;if(t.query){const d=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(d)||u.name.toLowerCase().includes(d)||u.kanaName&&u.kanaName.toLowerCase().includes(d)||u.address1&&u.address1.toLowerCase().includes(d)||u.phone&&u.phone.toLowerCase().includes(d))}t.businessType&&(n=n.filter(d=>d.businessType===t.businessType)),t.tradeType&&(n=n.filter(d=>d.tradeType===t.tradeType)),t.areaCode&&(n=n.filter(d=>d.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(d=>d.isActive):t.activeOnly==="inactive"&&(n=n.filter(d=>!d.isActive));const o=Math.max(1,Math.ceil(n.length/kt)),l=(Math.min(t.page,o)-1)*kt,c=n.slice(l,l+kt);return{filtered:n,paged:c,totalPages:o}}function Rn(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const o=(t-1)*kt+1,r=Math.min(t*kt,e),l=[];for(let c=1;c<=n;c++)c===1||c===n||c>=t-2&&c<=t+2?l.push(`<button class="button ${c===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${c}" style="min-width:36px;padding:4px 8px;">${c}</button>`):(c===t-3||c===t+3)&&l.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${o}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${l.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function Qc(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),o=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
          ${Object.entries(Gc).map(([r,l])=>`<option value="${r}" ${t.tradeType===r?"selected":""}>${l}</option>`).join("")}
        </select>
      </div>
      <div class="form-group" style="min-width:100px;">
        <label class="form-label">地区</label>
        <select id="master-area-code" class="form-input">
          <option value="">すべて</option>
          ${o.map(r=>`<option value="${r}" ${t.areaCode===r?"selected":""}>${r}</option>`).join("")}
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
  `}function ja(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Wc(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}const Gc={B2B:"B2B（卸）",B2B2C:"B2B2C（生産者）",B2C:"B2C（小売）"};function Xc(e){return e?`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${{B2B:"#3b82f6",B2B2C:"#8b5cf6",B2C:"#10b981"}[e]??"#999"};">${e}</span>`:"―"}function Zc(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${Xc(t.tradeType)}</td>
          <td>${Wc(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${ja(t.address1||"",16)}</td>
          <td>${ja(t.address2||"",12)}</td>
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
      `).join("")}function Bt(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function ed(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${ja(t.name,20)}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.category}</td>
          <td>${t.taxCategoryCode||""}</td>
          <td class="numeric">${t.alcoholDegree!=null?`${t.alcoholDegree}`:""}</td>
          <td class="numeric">${t.volumeMl!=null?`${t.volumeMl}`:""}</td>
          <td>${t.unit||""}</td>
          <td>${t.bottleType||""}</td>
          <td class="numeric">${Bt(t.purchasePrice)}</td>
          <td class="numeric">${Bt(t.salePrice)}</td>
          <td class="numeric">${Bt(t.listPrice)}</td>
          <td class="numeric">${Bt(t.costPrice)}</td>
          <td>${t.riceType||""}</td>
          <td class="numeric">${t.polishRate!=null?`${t.polishRate}`:""}</td>
          <td>${t.season||""}</td>
          <td class="numeric">${t.agingYears||""}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
          <td><button class="button secondary small" data-edit-product="${t.id}">編集</button></td>
        </tr>
      `).join("")}function td(e,t,n=un,o=[]){const{filtered:r,paged:l,totalPages:c}=Hc(e.customers,n);return`
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
        ${Qc(e.customers,n)}
        ${Rn(r.length,n.page,c)}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${te("code","コード",o)}
                ${te("name","得意先名",o)}
                ${te("kanaName","カナ",o)}
                <th>略称</th>
                ${te("businessType","業態",o)}
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
                ${te("areaName","地区",o)}
                ${te("closingDay","締日",o,"numeric")}
                ${te("paymentDay","支払日",o,"numeric")}
                <th>入金種</th>
                <th>請求先</th>
                <th>G1</th>
                <th>G2</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${Zc(dt(l,o,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${Rn(r.length,n.page,c)}
      `:`
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${te("code","コード",o)}
                ${te("name","商品名",o)}
                <th>カナ</th>
                ${te("category","分類",o)}
                <th>酒税区分</th>
                ${te("alcoholDegree","度数",o,"numeric")}
                ${te("volumeMl","容量ml",o,"numeric")}
                <th>単位</th>
                <th>容器</th>
                ${te("purchasePrice","生産者価格",o,"numeric")}
                ${te("salePrice","卸価格",o,"numeric")}
                ${te("listPrice","定価(小売)",o,"numeric")}
                <th class="numeric">原価</th>
                <th>原料米</th>
                <th class="numeric">精米歩合</th>
                <th>季節</th>
                <th class="numeric">熟成年</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${ed(dt(e.products,o,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function wa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ad(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${Qs.map(o=>`<option ${n?.materialType===o?"selected":""}>${o}</option>`).join("")}
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
  `}function nd(e){const t=e.map(r=>{const c=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${c?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${c?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${wa(r.unitCost)}</td>
          <td class="numeric">${wa(r.currentStock*r.unitCost)}</td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${r.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=e.filter(r=>r.minimumStock>0&&r.currentStock/r.minimumStock<1.5).length,o=e.reduce((r,l)=>r+l.currentStock*l.unitCost,0);return`
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
        <p class="kpi-value">${wa(o)}</p>
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
  `}function sd(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function xa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const od={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function rd(e){return`
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
          <td class="numeric">${xa(n.billedAmount)}</td>
          <td class="numeric">${xa(n.paymentAmount)}</td>
          <td class="numeric">${xa(n.balanceAmount)}</td>
          <td>${sd(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${od[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function at(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function On(e){return e.trim().toLowerCase()}function id(e,t){const n=On(t),o=e.filter(l=>n?[l.code,l.name,l.janCode].map(On).some(c=>c.includes(n)):!0),r=o.length?`
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
                      data-code="${at(l.code)}"
                      data-name="${at(l.name)}"
                    >
                      <td class="mono">${at(l.code)}</td>
                      <td>${at(l.name)}</td>
                      <td class="mono">${at(l.janCode)}</td>
                      <td>${at(l.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return ro({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:r,emptyMessage:"該当する商品が見つかりません。"})}function Je(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ld(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},o={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},l={unpaid:"warning",partial:"neutral",paid:"success"},c=e.map(g=>`
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
          <span class="status-pill ${o[g.status]}">${n[g.status]}</span>
        </td>
      </tr>
    `).join(""),d=t.map(g=>`
      <tr>
        <td class="mono">${g.supplierCode}</td>
        <td>${g.supplierName}</td>
        <td class="numeric">${Je(g.totalPurchase)}</td>
        <td class="numeric">${Je(g.paidAmount)}</td>
        <td class="numeric"><strong>${Je(g.balance)}</strong></td>
        <td>${g.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${l[g.status]}">${r[g.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${g.supplierCode}" ${g.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),u=e.reduce((g,$)=>g+$.amount,0),y=t.reduce((g,$)=>g+$.balance,0),f=t.filter(g=>g.status!=="paid").length;return`
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
          <tbody>${d||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ft(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function cd(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},o={holding:"neutral",due:"warning",cleared:"success"},r=e.map(f=>`
      <tr>
        <td class="mono">${f.billNo}</td>
        <td>${f.supplierName}</td>
        <td class="numeric">${ft(f.amount)}</td>
        <td>${f.issueDate}</td>
        <td>${f.dueDate}</td>
        <td>
          <span class="status-pill ${o[f.status]}">${n[f.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${f.id}" ${f.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),l=t.map(f=>{const g=f.minimumStock>0&&f.currentStock<f.minimumStock*1.2;return`
        <tr>
          <td class="mono">${f.code}</td>
          <td>${f.name}</td>
          <td class="numeric ${g?"text-danger":""}">
            ${f.currentStock.toLocaleString("ja-JP")} ${f.unit}
            ${g?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${f.minimumStock.toLocaleString("ja-JP")} ${f.unit}</td>
          <td class="numeric">${ft(f.unitCost)}</td>
          <td class="numeric">${ft(f.currentStock*f.unitCost)}</td>
          <td>${f.lastPurchaseDate}</td>
        </tr>
      `}).join(""),c=e.filter(f=>f.status==="holding"),d=c.reduce((f,g)=>f+g.amount,0),u=t.reduce((f,g)=>f+g.currentStock*g.unitCost,0),y=t.filter(f=>f.minimumStock>0&&f.currentStock<f.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${ft(d)}</p>
        <p class="kpi-sub">${c.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${ft(u)}</p>
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
  `}function za(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function _e(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Fa(e){return`
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
  `}function dd(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function jt(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${_e(e)}</code>
      ${dd(e)}
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
      ${e.code?Fa(e.code):""}
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
  `}function zt(e){return`
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
  `}function Ft(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function Bn(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function pd(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?za(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Ft(e.lastOverallSync)}">${Bn(e.lastOverallSync)}</span>
        </p>
        <p class="kpi-sub">${Ft(e.lastOverallSync)==="success"?"1時間以内":Ft(e.lastOverallSync)==="warning"?"24時間以内":"24時間超"}</p>
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
              <td>${t.lastSyncAt?za(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Ft(t.lastSyncAt)}">${Bn(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function ud(e){if(!e.length)return"";const t=r=>r==="ok"?"&#x2705;":r==="warn"?"&#x26A0;&#xFE0F;":"&#x274C;",n=r=>r==="ok"?"success":r==="warn"?"warning":"error",o=e.every(r=>r.status==="ok");return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>システム稼働状況</h2>
          <p class="panel-caption">${o?"全機能正常稼働中":"一部要確認"}</p>
        </div>
        <span class="status-pill ${o?"success":"warning"}" style="font-size:1.1em">
          ${o?"ALL OK":"要確認"}
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
  `}function md(e,t,n,o,r){const l={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${r?ud(r):""}

    ${o?pd(o):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${za(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${l[e.status]}</span>
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
      ${zt({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${jt("git --version")}
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
      ${zt({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${jt("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${zt({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${jt("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${jt("python get-pip.py")}
        `})}
      ${zt({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
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
          ${Fa(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${Fa(`{
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
  `}function $t(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function wo(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function yd(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(g=>g.amount),1),o=28,r=6,l=140,c=100,d=760,u=d-l-c,y=t.length*(o+r)+16,f=t.map((g,$)=>{const P=g.amount/n*u,_=$*(o+r)+8,D=g.abcRank==="A"?"#2F855A":g.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${l-8}" y="${_+o/2+5}" class="chart-axis" text-anchor="end">${g.name.length>10?g.name.slice(0,10)+"…":g.name}</text>
          <rect x="${l}" y="${_}" width="${P}" height="${o}" rx="4" fill="${D}" opacity="0.85" />
          <text x="${l+P+8}" y="${_+o/2+5}" class="chart-axis">${(g.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${d} ${y}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${f}
    </svg>
  `}function xo(e,t,n="得意先"){if(e.length===0||t.length===0)return'<p class="empty-row">データなし</p>';const o=t.map(u=>`<th class="numeric">${u}</th>`).join(""),r=t.map((u,y)=>e.reduce((f,g)=>f+(g.values[y]??0),0)),l=r.reduce((u,y)=>u+y,0),c=e.map(u=>{const y=u.values.reduce((g,$)=>g+$,0),f=u.values.map(g=>`<td class="numeric">${g>0?(g/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`<tr>
      <td>${u.label}</td>
      ${f}
      <td class="numeric"><strong>${(y/1e4).toFixed(0)}万</strong></td>
    </tr>`}).join(""),d=r.map(u=>`<td class="numeric"><strong>${u>0?(u/1e4).toFixed(0)+"万":"—"}</strong></td>`).join("");return`
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>${n}</th>
            ${o}
            <th class="numeric">合計</th>
          </tr>
        </thead>
        <tbody>${c}</tbody>
        <tfoot>
          <tr style="background:var(--surface-raised,#f5f5f5);font-weight:600;">
            <td>月次合計</td>
            ${d}
            <td class="numeric">${(l/1e4).toFixed(0)}万</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `}function hd(e){return wo(e)}function gd(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,20),n=760,o=320,r={top:24,right:56,bottom:60,left:72},l=n-r.left-r.right,c=o-r.top-r.bottom,d=Math.max(...t.map(_=>_.amount),1),u=l/t.length,y=[0,.25,.5,.75,1].map(_=>{const D=r.top+c-c*_;return`<g>
      <line x1="${r.left}" y1="${D}" x2="${n-r.right}" y2="${D}" class="chart-grid" />
      <text x="4" y="${D+4}" class="chart-axis">${Math.round(d*_/1e4)}万</text>
    </g>`}).join(""),f=[0,25,50,70,90,100].map(_=>{const D=r.top+c-c*_/100,k=_===70||_===90;return`<g>
      <text x="${n-4}" y="${D+4}" class="chart-axis" text-anchor="end">${_}%</text>
      ${k?`<line x1="${r.left}" y1="${D}" x2="${n-r.right}" y2="${D}" stroke="${_===70?"#2F855A":"#B7791F"}" stroke-dasharray="6 3" stroke-width="1.5" opacity="0.6" />`:""}
    </g>`}).join(""),g=t.map((_,D)=>{const k=_.amount/d*c,L=Math.max(u-10,16),s=r.left+D*u+(u-L)/2,i=r.top+c-k,p=_.abcRank==="A"?"#2F855A":_.abcRank==="B"?"#B7791F":"#718096",m=_.name.length>6?_.name.slice(0,6)+"…":_.name;return`<g>
      <rect x="${s}" y="${i}" width="${L}" height="${k}" rx="4" fill="${p}" opacity="0.8" />
      <text x="${s+L/2}" y="${o-8}" class="chart-axis centered-axis pareto-label" transform="rotate(-35 ${s+L/2} ${o-16})">${m}</text>
    </g>`}).join(""),$=t.map((_,D)=>{const k=r.left+D*u+u/2,L=r.top+c-c*_.cumRatio/100;return`${k},${L}`}).join(" "),P=t.map((_,D)=>{const k=r.left+D*u+u/2,L=r.top+c-c*_.cumRatio/100;return`<circle cx="${k}" cy="${L}" r="3.5" fill="#C53D3D" />`}).join("");return`
    <svg viewBox="0 0 ${n} ${o}" class="sales-chart pareto-chart" role="img" aria-label="商品ABC パレート図">
      ${y}${f}${g}
      <polyline points="${$}" fill="none" stroke="#C53D3D" stroke-width="2.5" stroke-linejoin="round" />
      ${P}
    </svg>`}function fd(e){const t=e.ranking.filter(d=>d.abcRank==="A").length,n=e.ranking.filter(d=>d.abcRank==="B").length,o=e.ranking.filter(d=>d.abcRank==="C").length,r=e.ranking.filter(d=>d.abcRank==="A").reduce((d,u)=>d+u.amount,0),l=e.ranking.map(d=>`
    <tr>
      <td class="mono">${d.code}</td>
      <td>${d.name}</td>
      <td class="numeric">${$t(d.amount)}</td>
      <td class="numeric">${d.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${d.ratio.toFixed(1)}%</td>
      <td class="numeric">${d.cumRatio.toFixed(1)}%</td>
      <td><span class="status-pill ${hd(d.abcRank)}">${d.abcRank}</span></td>
    </tr>`).join(""),c=xo(e.monthlyByProduct,e.months,"商品名");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">商品数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}品 <span class="kpi-sub">${(r/e.totalAmount*100).toFixed(1)}%</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}品</div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${o}品</div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>パレート図</h2><p class="panel-caption">棒：売上金額 / 線：累積構成比（上位20品）</p></div></div>
      <div class="chart-scroll">${gd(e.ranking)}</div>
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
          <tbody>${l}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>上位商品 月次推移</h2><p class="panel-caption">Aランク商品の月別売上</p></div></div>
      ${c}
    </section>`}function vd(e){const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,o=e.ranking.filter(u=>u.abcRank==="C").length,r=e.ranking.filter(u=>u.abcRank==="A").reduce((u,y)=>u+y.amount,0),l=e.ranking.filter(u=>u.abcRank==="B").reduce((u,y)=>u+y.amount,0),c=e.ranking.filter(u=>u.abcRank==="C").reduce((u,y)=>u+y.amount,0),d=e.ranking.map(u=>`
    <tr>
      <td class="mono">${u.code}</td>
      <td>${u.name}</td>
      <td class="numeric">${$t(u.amount)}</td>
      <td class="numeric">${u.ratio.toFixed(1)}%</td>
      <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
      <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
      <td><span class="status-pill ${wo(u.abcRank)}">${u.abcRank}</span></td>
    </tr>`).join("");return`
    <section class="kpi-row">
      <div class="kpi-card"><div class="kpi-label">得意先数</div><div class="kpi-value">${e.ranking.length}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aランク</div><div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${$t(r)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Bランク</div><div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${$t(l)}</span></div></div>
      <div class="kpi-card"><div class="kpi-label">Cランク</div><div class="kpi-value">${o}社 <span class="kpi-sub">${$t(c)}</span></div></div>
    </section>

    <section class="panel">
      <div class="panel-header"><div><h2>得意先別売上ランキング</h2><p class="panel-caption">売上金額上位15社</p></div></div>
      <div class="chart-scroll">${yd(e.ranking)}</div>
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
      ${xo(e.monthlyByCustomer,e.months,"得意先")}
    </section>`}function bd(e,t,n,o=""){const r=n==="customer"?vd(e):t?fd(t):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>',l=new Date().getFullYear(),c=Array.from({length:5},($,P)=>String(l-P)),d=o.length===4?o:o.slice(0,4),u=o.length===7?o.slice(5,7):"",y=["01","02","03","04","05","06","07","08","09","10","11","12"],f={"01":"1月","02":"2月","03":"3月","04":"4月","05":"5月","06":"6月","07":"7月","08":"8月","09":"9月",10:"10月",11:"11月",12:"12月"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>ABC分析 <span style="font-size:0.75em;font-weight:400;color:var(--text-secondary);">${o?o.length===7?`${o.slice(0,4)}年${f[o.slice(5)]??o.slice(5)}`:`${o}年`:"全期間"}</span></h1>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <select id="analysis-period-year" class="input-sm">
          <option value="">全期間</option>
          ${c.map($=>`<option value="${$}" ${d===$?"selected":""}>${$}年</option>`).join("")}
        </select>
        <select id="analysis-period-month" class="input-sm" ${d?"":"disabled"}>
          <option value="">全月</option>
          ${y.map($=>`<option value="${$}" ${u===$?"selected":""}>${f[$]}</option>`).join("")}
        </select>
      </div>
    </section>

    <div class="tab-bar" style="margin-bottom:16px;">
      <button class="tab-btn ${n==="customer"?"active":""}" type="button" data-analysis-tab="customer">👥 得意先ABC分析</button>
      <button class="tab-btn ${n==="product"?"active":""}" type="button" data-analysis-tab="product">📦 商品ABC分析</button>
    </div>

    ${r}
  `}const wd={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},jn={amount:"売上額",quantity:"出荷本数",volume:"移出量"},Va=10;function mn(e){const[t,n]=e.split("-").map(Number);return n>=Va?t:t-1}function xd(e){const t=Va-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(Va).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function $d(e,t,n){const o=c=>t==="quantity"?c.quantity:t==="volume"?c.volumeMl:c.amount,r=new Map;for(const c of e){const d=n==="fiscal"?`${mn(c.month)}年度`:c.month.slice(0,4);r.set(d,(r.get(d)??0)+o(c))}return{curr:[...r.entries()].sort((c,d)=>c[0].localeCompare(d[0])).map(([c,d])=>({month:c,amount:d}))}}function _d(e){const t=new Set;for(const n of e)t.add(mn(n.month));return[...t].sort((n,o)=>o-n).map(String)}function pt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Sd(e){return e.replace("-","/")}const zn={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function kd(e,t="#0F5B8D",n=[],o="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const r=n.length>0&&n.some(s=>s.amount>0),l=760,c=280,d={top:16,right:24,bottom:36,left:o==="amount"?64:56},u=l-d.left-d.right,y=c-d.top-d.bottom,f=[...e.map(s=>s.amount),...n.map(s=>s.amount)],g=Math.max(...f,1),$=u/e.length;function P(s){if(o==="quantity")return s>=1e4?`${(s/1e4).toFixed(1)}万本`:`${Math.round(s).toLocaleString()}本`;if(o==="volume"){const i=s/1e3;return i>=1e4?`${(i/1e3).toFixed(0)}kL`:`${Math.round(i).toLocaleString()} L`}return`${Math.round(s/1e4).toLocaleString("ja-JP")}万円`}function _(s){return o==="quantity"?`${s.toLocaleString()}本`:o==="volume"?ma(s):pt(s)}const D=[0,.25,.5,.75,1].map(s=>{const i=d.top+y-y*s,p=P(g*s);return`<g>
        <line x1="${d.left}" y1="${i}" x2="${l-d.right}" y2="${i}" class="chart-grid" />
        <text x="4" y="${i+4}" class="chart-axis">${p}</text>
      </g>`}).join(""),k=e.map((s,i)=>{const p=r?Math.max(($-18)/2,10):Math.max($-18,24),m=r?2:0,h=d.left+i*$+($-(r?p*2+m:p))/2,b=s.amount/g*y,x=d.top+y-b,w=n[i]?.amount??0,S=w/g*y,C=d.top+y-S,A=r?`<rect x="${h}" y="${C}" width="${p}" height="${S}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${_(w)}</title></rect>`:"",T=r?h+p+m:h;return`<g>
      ${A}
      <rect x="${T}" y="${x}" width="${p}" height="${b}" rx="4" fill="${t}" opacity="${.6+i/e.length*.35}"><title>${_(s.amount)}</title></rect>
      <text x="${d.left+i*$+$/2}" y="${c-8}" class="chart-axis centered-axis">${Sd(s.month)}</text>
    </g>`}).join(""),L=r?`
    <g transform="translate(${l-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${l} ${c}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${D}${k}${L}
    </svg>
  `}function ma(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function Pd(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(o=>`
    <tr>
      <td class="mono">${o.code}</td>
      <td>${o.name}</td>
      <td class="numeric">${pt(o.amount)}</td>
      <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${ma(o.volumeMl)}</td>
      <td class="numeric">${o.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${o.code}" data-drilldown-name="${o.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function Ed(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${pt(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${ma(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function Fn(e,t,n){const o=t?e.filter(l=>l.tag.includes(t)||l.name.includes(t)):e,r=o.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':o.map(l=>`
        <tr>
          <td class="mono">${l.code||"―"}</td>
          <td>${l.name||"未設定"}</td>
          <td class="mono">${l.tag||"―"}</td>
          <td class="numeric">${pt(l.amount)}</td>
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
  `}function $o(e,t,n="all",o="",r=[],l=[],c="",d="",u=null,y="all",f="",g=[],$=[],P=[],_=null,D=[],k=[],L="amount",s="calendar"){const i=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",p=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,h=n!=="all"&&r.length>0&&t!=="staff"?r:p,b=dt(h,P,wd),x={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},w=jn[L],S=J=>L==="quantity"?J.quantity:L==="volume"?J.volumeMl:J.amount,C=J=>L==="quantity"?`${J.toLocaleString()}本`:L==="volume"?ma(J):pt(J);let A,T=[],N,R,M;if(_&&_.monthlySales.length>0)A=_.monthlySales.slice(-24).map(J=>({month:J.month,amount:S(J)})),N=`${_.name} の月別${w}`,R=`${_.tab==="customers"?"得意先":"商品"}: ${_.code}`,M="#0968e5";else if(D.length>0&&n!=="all"){A=D.map(V=>({month:V.month,amount:S(V)})),T=k.map(V=>({month:V.month,amount:S(V)}));const J=A.reduce((V,K)=>V+K.amount,0),Z=T.reduce((V,K)=>V+K.amount,0),ae=Z>0?(J-Z)/Z*100:0,ie=ae>0?"+":"";N=`${x[n]} ${w}（${o}）`,R=`${C(J)}${Z>0?` / 前年比 ${ie}${ae.toFixed(1)}%`:""}`,M="#2f855a"}else{A=$d(e.monthlySales,L,s).curr,T=[];const Z=A.reduce((ie,V)=>ie+V.amount,0);N=`${s==="fiscal"?"決算年度別":"暦年別"}${w}`,R=`累計 ${C(Z)}（${A.length}${s==="fiscal"?"期":"年"}）`,M="#0F5B8D"}const B=["amount","quantity","volume"].map(J=>`<button class="tab-button ${J===L?"active":""}" data-chart-metric="${J}">${jn[J]}</button>`).join(""),j=["all","yearly","monthly","weekly","daily"].map(J=>`<button class="button ${J===n?"primary":"secondary"} small" type="button" data-analytics-period="${J}">${zn[J]}</button>`).join(""),z=s==="fiscal"&&n==="yearly"?_d(e.monthlySales):l,Y=s==="fiscal"&&n==="yearly"&&!z.includes(o)?z[0]??"":o,H=n!=="all"&&z.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${z.map(J=>`<option value="${J}" ${J===Y?"selected":""}>${s==="fiscal"&&n==="yearly"?J+"年度":J}</option>`).join("")}
      </select>`:"";let G="",Q="";if(t==="staff"){const J=["all","yearly","monthly","weekly","daily"].map(K=>`<button class="button ${K===y?"primary":"secondary"} small" type="button" data-staff-period="${K}">${zn[K]}</button>`).join(""),Z=y!=="all"&&g.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${g.map(K=>`<option value="${K}" ${K===f?"selected":""}>${K}</option>`).join("")}
        </select>`:"",ie=($.length>0?$:e.staffTotals).filter(K=>!c||K.name.includes(c)||K.code.includes(c)),V=y!=="all"&&f?` (${f})`:"";if(G=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${J}</div>
        ${Z}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${c}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${V?`<span style="font-size:12px;color:var(--text-secondary);">${V}</span>`:""}
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
            ${ie.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':ie.map(K=>`
                <tr>
                  <td class="mono">${K.code||"―"}</td>
                  <td>${K.name||"未設定"}</td>
                  <td class="numeric">${pt(K.amount)}</td>
                  <td class="numeric">${K.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${K.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${K.code}" data-staff-name="${K.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const K=u.breakdownTab,W=y!=="all"&&f?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${f}</span>`:"";Q=`
        <article class="panel" style="margin-top:16px;">
          <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2>${u.name} の内訳${W}</h2>
              <p class="panel-caption">担当別ドリルダウン</p>
            </div>
            <button class="button secondary small" data-action="close-staff-drilldown">閉じる</button>
          </div>

          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div class="tab-group">
              <button class="tab-button ${K==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${K==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${d}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${K==="customers"?Fn(u.customerRows,d,"得意先名"):Fn(u.productRows,d,"商品名")}
        </article>
      `}}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group" style="font-size:12px;">
          <button class="tab-button ${s==="calendar"?"active":""}" data-fiscal-mode="calendar">暦年（1〜12月）</button>
          <button class="tab-button ${s==="fiscal"?"active":""}" data-fiscal-mode="fiscal">決算期（10〜9月）</button>
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
            <div class="tab-group">${B}</div>
            ${_?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${kd(A,M,T,L)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${i}</h2>
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
            <div class="button-group">${j}</div>
            ${H}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${te("code","コード",P,"mono")}
                  ${te("name","名称",P)}
                  ${te("amount","売上額",P,"numeric")}
                  ${te("quantity","本数",P,"numeric")}
                  ${te("volumeMl","移出量",P,"numeric")}
                  ${te("documents","伝票数",P,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${Pd(b,!0)}</tbody>
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
            <tbody>${Ed(_.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${Q}
  `}const Vn=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:xd,monthToFiscalYear:mn,renderSalesAnalytics:$o},Symbol.toStringTag,{value:"Module"}));function vt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ad(e){const t=Math.max(...e.salesByProduct.flatMap(l=>l.values),1),n=e.salesByProduct.map(l=>{const c=l.values.map((d,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(d/t*120)}px" title="${e.months[u]}: ${vt(d)}"></div>
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
        <td class="numeric">${vt(l.costPrice)}</td>
        <td class="numeric">${vt(l.sellPrice)}</td>
        <td class="numeric">${vt(l.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${l.marginRate>=40?"success":"warning"}">${l.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),r=e.salesByCustomer.map(l=>{const c=l.values.reduce((d,u)=>d+u,0);return`
        <tr>
          <td>${l.label}</td>
          ${l.values.map(d=>`<td class="numeric">${(d/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${vt(c)}</strong></td>
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
          <tbody>${o}</tbody>
        </table>
      </div>
    </section>
  `}function Ld(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Zt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Un(e){return e.toISOString().slice(0,10)}function Cd(e,t,n,o=null,r=null){const l=e.length?e.map(c=>`
            <tr class="clickable-row${c.documentNo===o?" selected-row":""}"
                data-doc-no="${c.documentNo}">
              <td class="mono">${c.documentNo}</td>
              <td>${Ld(c.date)}</td>
              <td>
                <div class="table-title">${c.customerName}</div>
                <div class="table-sub mono">${c.customerCode}</div>
              </td>
              <td class="numeric">${Zt(c.amount)}</td>
            </tr>
            ${c.documentNo===o?Dd(r):""}
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
          <tbody>${l}</tbody>
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
  `}function Dd(e){if(!e)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">読み込み中...</div>
    </td></tr>`;if(e.length===0)return`<tr class="line-detail-row"><td colspan="4">
      <div class="line-detail-panel">明細データなし</div>
    </td></tr>`;const t=e.map(o=>`
      <tr>
        <td class="mono" style="width:40px">${o.lineNo}</td>
        <td class="mono" style="width:70px">${o.productCode}</td>
        <td>${o.productName}</td>
        <td class="numeric" style="width:50px">${o.quantity}</td>
        <td class="numeric" style="width:80px">${Zt(o.unitPrice)}</td>
        <td class="numeric" style="width:90px">${Zt(o.amount)}</td>
      </tr>`).join(""),n=e.reduce((o,r)=>o+r.amount,0);return`<tr class="line-detail-row"><td colspan="4">
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
            <td class="numeric">${Zt(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function Vt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function qd(e,t,n,o){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},l={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},c={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},d=e.map(g=>`
      <tr>
        <td>${g.saleTime}</td>
        <td class="mono">${g.productCode}</td>
        <td>${g.productName}</td>
        <td class="numeric">${g.quantity}</td>
        <td class="numeric">${Vt(g.unitPrice)}</td>
        <td class="numeric"><strong>${Vt(g.amount)}</strong></td>
        <td>${r[g.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(g=>`
      <tr>
        <td class="mono">${g.orderNo}</td>
        <td>${g.orderDate}</td>
        <td>${g.customerName}</td>
        <td>${g.postalCode} ${g.address}</td>
        <td>${g.items.map($=>`${$.productName} ×${$.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Vt(g.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${c[g.status]}">${l[g.status]}</span>
        </td>
        <td>${g.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${g.id}">詳細</button>
        </td>
      </tr>
    `).join(""),y=e.reduce((g,$)=>g+$.amount,0),f=t.filter(g=>g.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${Vt(y)}</p>
        <p class="kpi-sub">${e.length} 件 / ${o}</p>
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
  `}const $a={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Td={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Id(e,t,n,o){const r=Td[e],l=Object.keys($a).map(d=>`
      <button class="tab-button ${e===d?"active":""}" data-import-entity="${d}">
        ${$a[d]}
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
                ${t.columns.map(y=>`<td>${String(d[y]??"")}</td>`).join("")}
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
      <div class="tab-group" style="flex-wrap: wrap;">${l}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${$a[e]} のCSV形式</h2>
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

    ${o?`<section class="panel"><p class="sync-message">${o}</p></section>`:""}
  `}const ue={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function Nd(e,t,n){const o=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:ue.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:ue.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:ue.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:ue.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:ue.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:ue.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:ue.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:ue.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:ue.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:ue.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:ue.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:ue.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:ue.date}];e.lines.slice(0,6).forEach((c,d)=>{const u=33+d*8.5;o.push({id:`line${d}_name`,label:`明細${d+1} 品名`,x:5,y:u,fontSize:7.5,value:c.productName+(c.spec?` ${c.spec}`:""),color:ue.detail},{id:`line${d}_code`,label:`明細${d+1} CD`,x:64,y:u,fontSize:7.5,value:c.productCode,color:ue.detail},{id:`line${d}_qty`,label:`明細${d+1} 数量`,x:124,y:u,fontSize:8,value:c.quantity>0?String(c.quantity):"",color:ue.detail},{id:`line${d}_price`,label:`明細${d+1} 原単価`,x:163,y:u,fontSize:8,value:c.unitPrice>0?c.unitPrice.toLocaleString("ja-JP"):"",color:ue.detail},{id:`line${d}_amount`,label:`明細${d+1} 原価金額`,x:176,y:u,fontSize:8,value:c.amount>0?c.amount.toLocaleString("ja-JP"):"",color:ue.detail},{id:`line${d}_retail`,label:`明細${d+1} 売単価`,x:193,y:u,fontSize:8,value:c.retailPrice?c.retailPrice.toLocaleString("ja-JP"):"",color:ue.detail})});const r=e.lines.reduce((c,d)=>c+(d.amount||0),0),l=e.lines.reduce((c,d)=>c+d.quantity,0);return o.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(l),color:ue.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:ue.total}),n&&o.forEach(c=>{const d=n[c.id];d&&(c.x=d.x,c.y=d.y)}),o}function Md(e,t,n,o,r){const c=Nd(e,t,o).map(u=>`
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
  `}function _a(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const o=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,l=parseFloat(n.style.top)||0;t[o]={x:r,y:l}}),t}function Rd(e,t,n){const o=[...new Set(e.map(_=>_.areaCode).filter(Boolean))].sort(),r=[...new Set(e.map(_=>_.businessTypeName||_.businessType).filter(Boolean))].sort(),l=e.filter(_=>_.isAtRisk),c=e.filter(_=>!_.isAtRisk&&_.isDormant),d=e.filter(_=>!_.isAtRisk&&!_.isDormant&&_.amount12m>0),u=e.filter(_=>!_.isAtRisk&&!_.isDormant&&_.amount12m===0),y=t.filter(_=>_.lat&&_.lng),f=e.some(_=>_.lat&&_.lng),g=e.length,$=e.filter(_=>_.lat&&_.lng).length;return`
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
        <div class="kpi-value">${l.length}<span class="kpi-sub">社</span></div>
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
        ${o.map(_=>`<option value="${_}" ${n.filterArea===_?"selected":""}>${_}</option>`).join("")}
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

  `}const Od={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},Bd=["new","picking","packed","shipped","delivered"];function jd(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(l=>t[l.stage].push(l));const n=Bd.map(l=>{const c=Od[l],d=t[l];return`
      <div class="wf-col" data-wf-stage="${l}">
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
    `}).join(""),o=e.reduce((l,c)=>l+c.totalAmount,0),r=e.filter(l=>l.priority==="urgent").length;return`
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
  `}function zd(e,t,n){const o=e.cart.reduce((l,c)=>l+c.amount,0);return`
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

      ${Fd(e,t,n)}
    </div>
  `}function Fd(e,t,n){if(e.step==="customer"){const o=e.customerQuery.toLowerCase(),r=o?t.filter(l=>l.name.toLowerCase().includes(o)||l.code.toLowerCase().includes(o)):t.slice(0,20);return`
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
    `}if(e.step==="products"){const o=e.productQuery.toLowerCase(),r=o?n.filter(l=>l.name.toLowerCase().includes(o)||l.code.toLowerCase().includes(o)):n.slice(0,30);return`
      <section class="panel">
        <input id="mo-product-q" type="text" placeholder="商品名・コード検索" value="${e.productQuery}" class="mo-search" />
        <div class="mo-list">
          ${r.slice(0,50).map(l=>{const c=e.cart.find(d=>d.productCode===l.code);return`
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
          ${e.cart.map((o,r)=>`
            <div class="mo-review-item">
              <div>
                <div class="mo-item-title">${o.productName}</div>
                <div class="mo-item-sub">${o.quantity} × ¥${o.unitPrice.toLocaleString("ja-JP")}</div>
              </div>
              <div>
                <strong>¥${o.amount.toLocaleString("ja-JP")}</strong>
                <button class="button-icon" data-mo-remove="${r}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="mo-review-total">
          <span>合計</span>
          <strong>¥${e.cart.reduce((o,r)=>o+r.amount,0).toLocaleString("ja-JP")}</strong>
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
  `}const Yn={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},Jn={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},Kn={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function Vd(e,t){const n=e.find(l=>l.id===t)??e[0],o=e.filter(l=>l.status==="new").length,r=e.filter(l=>l.status==="confirmed").length;return`
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
                <span class="status-pill ${Jn[l.status]}">${Yn[l.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${Kn[l.language]} · 👥 ${l.partySize}名
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
  `}const Ud=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,Yd=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function Jd(e,t){const n=t?e.find(r=>r.id===t):null,o=t==="__new__";return`
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
  `}function Kd(e,t,n,o){const[r,l]=t.split("-").map(m=>parseInt(m,10)),c=new Date(r,l-1,1),d=new Date(r,l,0),u=c.getDay(),y=d.getDate(),f=[];for(let m=0;m<u;m++)f.push({isOutside:!0});for(let m=1;m<=y;m++)f.push({date:new Date(r,l-1,m)});for(;f.length%7!==0;)f.push({isOutside:!0});const g=n?e.filter(m=>m.category===n):e,$={};g.forEach(m=>{const h=m.startsAt.slice(0,10);$[h]??=[],$[h].push(m)});const P=new Date().toISOString().slice(0,10),_=f.map(m=>{if(m.isOutside)return'<div class="cal-cell cal-outside"></div>';const h=m.date,b=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}-${String(h.getDate()).padStart(2,"0")}`,x=$[b]??[],w=b===P,S=h.getDay();return`
        <div class="cal-cell ${w?"cal-today":""} ${S===0?"cal-sun":S===6?"cal-sat":""}"
             data-cal-date="${b}">
          <div class="cal-day-num">${h.getDate()}</div>
          <div class="cal-events">
            ${x.slice(0,3).map(C=>`
              <button class="cal-event" data-cal-event-id="${C.id}"
                      style="background:${C.color||dn[C.category]||"#0F5B8D"};"
                      title="${C.title}">
                <span class="cal-event-time">${C.isAllDay?"終日":new Date(C.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${C.title}</span>
              </button>
            `).join("")}
            ${x.length>3?`<button class="cal-event-more" data-cal-date="${b}">+${x.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),D=o?.isOpen?Hd(o):"",k=new Date(r,l-2,1),L=new Date(r,l,1),s=`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`,i=`${L.getFullYear()}-${String(L.getMonth()+1).padStart(2,"0")}`,p=(()=>{const m=new Date;return`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`})();return`
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
          <button class="button secondary" data-action="cal-prev" data-ym="${s}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${p}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${i}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(cn).map(([m,h])=>`<option value="${m}" ${n===m?"selected":""}>${h}</option>`).join("")}
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
  `}function Hd(e){const t=e.event;return`
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
                ${Object.entries(cn).map(([n,o])=>`<option value="${n}" ${t.category===n?"selected":""}>${o}</option>`).join("")}
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
  `}function Hn(e){const t=new Date(e),n=o=>String(o).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const bt={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function Qd(e,t){const n=t?e.find(o=>o.id===t):null;return`
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
        <p class="form-hint">${bt[n.provider]?.description??""}</p>
        ${bt[n.provider]?.setupUrl?`<p class="form-hint">📖 取得方法: <a href="${bt[n.provider].setupUrl}" target="_blank">${bt[n.provider].setupUrl}</a></p>`:""}
        <div class="filter-grid filter-grid--wide" style="margin-top:12px;">
          ${(bt[n.provider]?.fields??[]).map(o=>`
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
  `}function Wd(e,t){const n=e.reduce((l,c)=>l+c.totalAmount,0),o=e.filter(l=>l.financialStatus==="paid").length,r=e.filter(l=>l.fulfillmentStatus!=="fulfilled"&&l.fulfillmentStatus!=="shipped").length;return`
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
                <td style="font-size:12px;">${l.lineItems.map(c=>`${c.name} ×${c.quantity}`).join("<br/>")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Gd(e,t,n){return`
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
  `}function Xd(e,t,n){const o=t==="__new__"?null:e.find(c=>c.id===t),r=t==="__new__";return n?.role==="admin"?`
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
                <td>${na[c.department]}</td>
                <td>${aa[c.role]}</td>
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

    ${o||r?`
      <section class="panel">
        <div class="panel-header">
          <h2>${r?"新規ユーザー":`${o?.displayName} 編集`}</h2>
        </div>
        ${r?'<p class="form-hint">新規ユーザーを追加するとSupabase Authに登録され、初期パスワードでログインできます。</p>':""}
        <div class="filter-grid filter-grid--wide">
          <label class="field" style="flex:1 1 200px;">
            <span>表示名 *</span>
            <input id="user-name" type="text" value="${o?.displayName??""}" placeholder="金井 太郎" />
          </label>
          <label class="field" style="flex:1 1 200px;">
            <span>メールアドレス *</span>
            <input id="user-email" type="email" value="${o?.email??""}" placeholder="taro@kaneishuzo.co.jp" ${o?"readonly":""} />
          </label>
          ${r?`<label class="field" style="flex:1 1 200px;">
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
              ${Object.entries(na).map(([c,d])=>`<option value="${c}" ${o?.department===c?"selected":""}>${d}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(aa).map(([c,d])=>`<option value="${c}" ${o?.role===c?"selected":""}>${d}</option>`).join("")}
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
    `}function Zd(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${na[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${aa[e.role]}</dd></div>
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
    `}function ep(e){const t={};return e.forEach(n=>{const o=n.userEmail??"(anonymous)";t[o]=(t[o]??0)+1}),`
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
  `}function tp(e){const t=e.prospects.reduce((l,c)=>l+c.expectedAmount,0),n=e.prospects.reduce((l,c)=>l+c.expectedAmount*c.probability/100,0),o=e.prospects.filter(l=>l.stage==="won").length,r=e.prospects.filter(l=>l.stage==="hot"||l.stage==="negotiating").length;return`
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
        <p class="kpi-value">${o}件</p>
        <p class="kpi-sub">今期</p>
      </article>
    </section>

    ${e.viewMode==="kanban"?ap(e.prospects):np(e.prospects)}

    ${sp(e)}
  `}function ap(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(o=>{const r=e.filter(c=>c.stage===o),l=r.reduce((c,d)=>c+d.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${o}">
          <div class="pk-col-header" style="--pk-color:${pn[o]};">
            <span class="pk-col-label">${pa[o]}</span>
            <span class="pk-col-count">${r.length}</span>
          </div>
          <div class="pk-col-sub">¥${l.toLocaleString("ja-JP")}</div>
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
  `}function np(e){return`
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
                <td><span class="status-pill" style="background:${pn[t.stage]};color:white;">${pa[t.stage]}</span></td>
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
  `}function sp(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(o=>o.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(pa).map(([o,r])=>`<option value="${o}" ${n?.stage===o?"selected":""}>${r}</option>`).join("")}
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
  `}function op(e,t,n){const o=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
                <td>${sa[l.eventType]||l.eventType}</td>
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
                <td>${sa[l.eventType]||l.eventType}</td>
                <td class="mono" style="font-size:12px;">${l.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${l.message}</td>
                <td><span class="status-pill ${l.status==="sent"?"success":"warning"}">${l.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function rp(e,t,n,o){const r=new Map(t.map(g=>[g.code,g])),l=e.filter(g=>g.callDirection==="inbound").length,c=e.filter(g=>g.callDirection==="outbound").length,d=e.filter(g=>g.callStatus==="missed").length,u=e.reduce((g,$)=>g+($.durationSeconds??0),0),y=g=>{if(g===0)return"―";const $=Math.floor(g/60),P=g%60;return $>0?`${$}分${P}秒`:`${P}秒`},f=g=>{if(g.matchedCustomerCode){const $=r.get(g.matchedCustomerCode);if($)return`${$.name} (既存)`}return"未登録番号"};return`
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
        <p class="kpi-sub">不在 ${d}件</p>
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
                  <strong>${f(g)}</strong>
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
  `}const ip=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function lp(e){const t=e.activeListId?e.lists.find(l=>l.id===e.activeListId):null,n=e.items.filter(l=>l.status==="new").length,o=e.items.filter(l=>l.status==="imported").length,r=e.items.filter(l=>l.status==="excluded").length;return`
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
            ${ip.map(l=>`<option value="${l}" ${e.searchBusinessType===l?"selected":""}>${l}</option>`).join("")}
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
  `}const Qn={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},cp={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},dp={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function $e(e){return"¥"+e.toLocaleString("ja-JP")}function Pt(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function _o(e,t){const n=e.reduce((l,c)=>l+c.amount,0),o=Math.floor(n*t),r=n+o;return{subtotal:n,taxAmount:o,total:r}}const de={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function pe(e,t){const n=e.align??"left",o=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${o}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function Sa(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),o=n-2018;return{y:o>0?String(o).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function pp(e,t,n){const o=Sa(e.documentDate),r=Sa(e.orderDate??e.documentDate),l=Sa(e.deliveryDate??e.documentDate),c=e.lines.slice(0,6).map((k,L)=>{const s=de.detailStartY+L*de.detailRowH,i=de.detailCols,p=[],m=(h,b)=>{b&&p.push(pe({...h,y:s,x:h.x+0},b))};return m(i.productName,k.productName+(k.spec?` ${k.spec}`:"")),m(i.productCode,k.productCode),m(i.color,k.color??""),m(i.size,[k.size,k.caseQty?`×${k.caseQty}`:""].filter(Boolean).join(" ")),m(i.unit,k.unit),m(i.quantity,k.quantity>0?k.quantity.toLocaleString("ja-JP"):""),m(i.correctedQty,k.correctedQuantity?k.correctedQuantity.toLocaleString("ja-JP"):""),m(i.discount,k.discount?k.discount.toLocaleString("ja-JP"):""),m(i.unitPrice,k.unitPrice>0?k.unitPrice.toLocaleString("ja-JP"):""),m(i.costAmount,k.amount>0?k.amount.toLocaleString("ja-JP"):""),m(i.retailPrice,k.retailPrice?k.retailPrice.toLocaleString("ja-JP"):""),m(i.note,k.receivedAmount?k.receivedAmount.toLocaleString("ja-JP"):""),p.join("")}).join(""),d=e.lines.reduce((k,L)=>k+(L.amount||0),0),u=e.lines.reduce((k,L)=>k+(L.retailPrice||0)*(L.correctedQuantity??L.quantity),0),y=e.lines.reduce((k,L)=>k+(L.receivedAmount||0),0),f=e.lines.reduce((k,L)=>k+(L.returnAmount||0),0),g=e.lines.reduce((k,L)=>k+L.quantity,0),$=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",P=n.calibrationOffsetX||0,_=n.calibrationOffsetY||0,D=`transform: translate(${P}mm, ${_}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${$}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${D}">
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
        ${pe(de.orderDateY,r.y)}
        ${pe(de.orderDateM,r.m)}
        ${pe(de.orderDateD,r.d)}
        ${pe(de.deliveryDateY,l.y)}
        ${pe(de.deliveryDateM,l.m)}
        ${pe(de.deliveryDateD,l.d)}
        ${pe(de.orderNo,e.orderNo??"")}
        ${pe(de.partnerCode,e.vendorCode??"")}

        ${c}

        ${pe(de.totalQty,g.toLocaleString("ja-JP"))}
        ${pe(de.receivedTotal,y.toLocaleString("ja-JP"))}
        ${pe(de.returnTotal,f.toLocaleString("ja-JP"))}
        ${pe(de.correctedCostTotal,d.toLocaleString("ja-JP"))}
        ${pe(de.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function up(e,t,n){const{subtotal:o,taxAmount:r,total:l}=_o(e.lines,e.taxRate),c=e.previousBalance??0,d=e.paymentAmount??0,u=c-d+l,y=e.lines.map(g=>`
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
        <div><dt>請求日</dt><dd>${Pt(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${Pt(e.dueDate)}</dd></div>`:""}
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
        <tbody>${y}${f}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${$e(o)} / 消費税: ${$e(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${c?`<tr><th>前回御請求額</th><td>${$e(c)}</td></tr>`:""}
          ${d?`<tr><th>ご入金額</th><td>▲ ${$e(d)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${$e(o)}</td></tr>
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
  `}function mp(e,t,n){const{subtotal:o,taxAmount:r,total:l}=_o(e.lines,e.taxRate),c=e.lines.map(u=>`
      <tr>
        <td>${u.productName}${u.spec?` <span style="color:#636e72;font-size:9pt;">/ ${u.spec}</span>`:""}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${u.unit}</td>`:""}
        <td class="numeric">${$e(u.unitPrice)}</td>
        <td class="numeric">${$e(u.amount)}</td>
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
        <div><dt>見積日</dt><dd>${Pt(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${Pt(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${$e(l)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${$e(o)} / 消費税: ${$e(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${$e(o)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${$e(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${$e(l)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?Pt(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function yp(e,t,n,o){let r="";switch(e){case"chain_store":r=pp(o,n,t);break;case"quotation":r=mp(o,n,t);break;case"invoice_monthly":r=up(o,n,t);break}const l=Object.keys(Qn).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${Qn[u]}</button>`).join(""),c=o.lines.map((u,y)=>`
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${y}" data-print-lfield="productName" value="${u.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${y}" data-print-lfield="quantity" value="${u.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${y}" data-print-lfield="unitPrice" value="${u.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${u.amount>0?u.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${y}">✕</button></td>
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
  `}const hp={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},gp={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function So(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],o="",r=!1;for(let d=0;d<e.length;d++){const u=e[d];r?u==='"'?e[d+1]==='"'?(o+='"',d++):r=!1:o+=u:u==='"'?r=!0:u===","?(n.push(o),o=""):u===`
`||u==="\r"?(u==="\r"&&e[d+1]===`
`&&d++,n.push(o),n.some(y=>y!=="")&&t.push(n),n=[],o=""):o+=u}if((o!==""||n.length>0)&&(n.push(o),n.some(d=>d!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const l=t[0].map(d=>d.trim()),c=[];for(let d=1;d<t.length;d++){const u={};l.forEach((y,f)=>{u[y]=(t[d][f]??"").trim()}),c.push(u)}return{columns:l,rows:c}}function ko(e,t,n){const o=hp[e],r=o.filter(d=>!t.includes(d)),l=n.map(d=>{const u=[];r.length>0&&u.push(`必須列欠損: ${r.join(",")}`);for(const y of o)t.includes(y)&&!d[y]&&u.push(`${y}が空`);return{...d,_valid:u.length===0,_error:u[0]}}),c=l.filter(d=>d._valid).length;return{entity:e,columns:t,rows:l,totalRows:n.length,validRows:c,invalidRows:l.length-c}}function Po(e){const n=gp[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function Eo(e,t){const{supabaseInsert:n}=await I(async()=>{const{supabaseInsert:d}=await Promise.resolve().then(()=>ee);return{supabaseInsert:d}},void 0);let o=0,r=0;const c={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const d of t){if(!d._valid)continue;const{_valid:u,_error:y,...f}=d,g={...f};if(!g.id){const $=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";g.id=String(f[$]??`${e}-${Date.now()}-${o+r}`)}for(const $ of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof g[$]=="string"&&g[$]!==""){const P=Number(g[$]);Number.isFinite(P)&&(g[$]=P)}try{await n(c,g)!==null?o++:r++}catch{r++}}return{inserted:o,failed:r}}const fp=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:Po,importToSupabase:Eo,parseCSV:So,validateImport:ko},Symbol.toStringTag,{value:"Module"}));function ka(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function vp(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function bp(e,t,n,o,r){const l=n.reduce((y,f)=>y+f.rowCount,0),c=n.map(y=>y.lastSyncAt).filter(y=>y!==null).sort().reverse()[0]??null,d=100,u=Math.max(1,Math.ceil(r/d));return`
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
        <p class="kpi-value">${c?ka(c):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${y.lastSyncAt?ka(y.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(y=>y.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${r.toLocaleString("ja-JP")}件中 ${((o-1)*d+1).toLocaleString("ja-JP")}-${Math.min(o*d,r).toLocaleString("ja-JP")} を表示</p>
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
              <td>${y._synced_at?ka(y._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${y._raw_b64?y._raw_b64.slice(0,200):""}">${vp(y._raw_b64)}</td>
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
  `}const ut=400,mt=240;function oe(e){return e.toLocaleString("ja-JP")}function Pa(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function wp(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function Te(e,t,n,o=""){return`<th class="${o}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${wp(n,t)}</th>`}function wt(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function xp(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const o=e.products.slice().sort((L,s)=>(e.productTotals[s.code]??0)-(e.productTotals[L.code]??0)).slice(0,6),r=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],l=820,c=280,d={top:20,right:20,bottom:40,left:60},u=l-d.left-d.right,y=c-d.top-d.bottom,f=t.map(L=>o.reduce((s,i)=>s+(n[i.code]?.[L]??0),0)),g=Math.max(...f,1),$=u/t.length,P=Math.max($-10,14),_=[0,.25,.5,.75,1].map(L=>{const s=d.top+y-y*L,i=`${Math.round(g*L/100)*100}`;return`
      <line x1="${d.left}" y1="${s}" x2="${l-d.right}" y2="${s}" class="chart-grid" />
      <text x="6" y="${s+4}" class="chart-axis">${Number(i).toLocaleString("ja-JP")}</text>
    `}).join(""),D=t.map((L,s)=>{let i=d.top+y;const p=d.left+s*$+($-P)/2,m=o.map((C,A)=>{const N=(n[C.code]?.[L]??0)/g*y;return i-=N,`<rect x="${p}" y="${i}" width="${P}" height="${N}" fill="${r[A%r.length]}" opacity="0.85" rx="${A===o.length-1?3:0}" />`}).join(""),[h,b]=L.split("-"),x=parseInt(b),w=x===1||s%3===0,S=x===1?`${h.slice(2)}年`:`${x}月`;return`<g>${m}${w?`<text x="${p+P/2}" y="${c-10}" class="chart-axis centered-axis">${S}</text>`:""}</g>`}).join(""),k=o.map((L,s)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${r[s%r.length]};"></span>
       ${L.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${l} ${c}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${_}${D}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${d.left}px;display:flex;flex-wrap:wrap;">${k}</div>
  `}function $p(e){const{months:t,products:n}=e,o=n.slice().sort((c,d)=>(e.productTotals[d.code]??0)-(e.productTotals[c.code]??0)).slice(0,50),r=t.map(c=>{const[d,u]=c.split("-"),y=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${y===1?`${d.slice(2)}年1月`:`${y}月`}</th>`}).join(""),l=o.map(c=>{const d=t.map(u=>{const y=e.matrix[c.code]?.[u]??0;return`<td class="numeric">${y>0?oe(y):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${c.code}</td>
        <td style="white-space:nowrap;">${c.name}</td>
        ${d}
        <td class="numeric"><strong>${oe(e.productTotals[c.code]??0)}</strong></td>
        <td class="numeric">${oe(Math.round(e.productAvg[c.code]??0))}</td>
        <td class="numeric">${oe(Math.round(e.productStdDev[c.code]??0))}</td>
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
  `}function _p(e,t){const n=e.months[e.months.length-1]??"",o=e.months[e.months.length-2]??"",r=e.months.length-13,l=r>=0?e.months[r]:"",c=e.products.reduce((P,_)=>P+(e.matrix[_.code]?.[n]??0),0),d=e.products.reduce((P,_)=>P+(e.matrix[_.code]?.[o]??0),0),u=l?e.products.reduce((P,_)=>P+(e.matrix[_.code]?.[l]??0),0):0,y=d>0?(c-d)/d*100:0,f=u>0?(c-u)/u*100:0,g=P=>P>=0?"+":"",$=[1,2,3,5].map(P=>`<option value="${P}" ${P===t?"selected":""}>${P}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${oe(c)} 本</p>
        <p class="kpi-sub">${Pa(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${y>=0?"":"text-danger"}">${g(y)}${y.toFixed(1)}%</p>
        <p class="kpi-sub">${Pa(o)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${f>=0?"":"text-danger"}">${u>0?`${g(f)}${f.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${l?`${Pa(l)} 比`:"前年データなし"}</p>
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
      ${xp(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${$p(e)}
    </section>
  `}function Sp(e,t){const o=e.slice().sort((l,c)=>{if(!t)return 0;const d=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return d*l.productName.localeCompare(c.productName,"ja");case"ss-avg":return d*(l.avgMonthlyDemand-c.avgMonthlyDemand);case"ss-std":return d*(l.demandStdDev-c.demandStdDev);case"ss-ss":{const u=Math.ceil(wt(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(wt(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return d*(u-y)}case"ss-rop":{const u=Math.ceil(l.avgMonthlyDemand*(l.leadTimeDays/30)+wt(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(c.avgMonthlyDemand*(c.leadTimeDays/30)+wt(c.serviceLevel)*c.demandStdDev*Math.sqrt(c.leadTimeDays/30));return d*(u-y)}default:return 0}}).map(l=>{const c=wt(l.serviceLevel),d=l.leadTimeDays/30,u=Math.ceil(c*l.demandStdDev*Math.sqrt(d)),y=Math.ceil(l.avgMonthlyDemand*d+u),f=u-l.safetyStockQty,g=f>0?"text-danger":f<-u*.3?"text-warning":"",$=[.9,.95,.99].map(P=>`<option value="${P}" ${Math.abs(l.serviceLevel-P)<.01?"selected":""}>${(P*100).toFixed(0)}%</option>`).join("");return`
      <tr>
        <td style="white-space:nowrap;">${l.productName}</td>
        <td class="numeric">${oe(Math.round(l.avgMonthlyDemand))}</td>
        <td class="numeric">${oe(Math.round(l.demandStdDev))}</td>
        <td>
          <input class="input-sm" type="number" min="1" max="180"
            value="${l.leadTimeDays}"
            data-action="ss-lead-time" data-code="${l.productCode}"
            style="width:60px;text-align:right;" />
        </td>
        <td>
          <select class="input-sm" data-action="ss-service-level" data-code="${l.productCode}"
            style="width:64px;">${$}</select>
        </td>
        <td class="numeric"><strong>${oe(u)}</strong></td>
        <td class="numeric">${oe(y)}</td>
        <td class="numeric ${g}">
          ${f>0?`+${oe(f)}`:oe(f)}
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
          <tbody>${o||'<tr><td colspan="8" class="empty-row">データなし</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}const kp={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function Pp(e,t,n,o){const r={draft:"下書き",confirmed:"確定",actual:"実績入力済"},l={draft:"neutral",confirmed:"info",actual:"success"},c=b=>Object.entries(kp).map(([x,w])=>`<option value="${x}" ${x===b?"selected":""}>${w}</option>`).join(""),d=640,u=b=>b.map(x=>{const w=Math.max(0,x.demandForecast+x.safetyStockTarget-x.openingStock),S=x.plannedQty>0?x.plannedQty:Math.round(w),C=S>0?Math.ceil(S/d*10)/10:0,A=x.plannedQty>0?(x.actualQty-x.plannedQty)/x.plannedQty*100:null,T=A!==null?A>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${x.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${x.productCode}"
            style="width:92px;">${c(x.productionType)}</select>
        </td>
        <td class="numeric">${oe(Math.round(x.demandForecast))}</td>
        <td class="numeric">${oe(Math.round(x.safetyStockTarget))}</td>
        <td class="numeric">${oe(Math.round(x.openingStock))}</td>
        <td class="numeric"><strong>${oe(Math.round(w))}</strong></td>
        <td>
          <input class="input-sm" type="number" min="0"
            value="${x.plannedQty}"
            data-action="plan-qty" data-code="${x.productCode}"
            style="width:80px;text-align:right;" />
        </td>
        <td class="numeric">
          <input class="input-sm" type="number" min="0"
            value="${x.actualQty||""}"
            data-action="plan-actual-qty" data-code="${x.productCode}"
            placeholder="0"
            style="width:70px;text-align:right;" />
        </td>
        <td class="numeric ${T}">
          ${A!==null?`${A>=0?"+":""}${A.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${C>0?`${C.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${l[x.status]??"neutral"}">${r[x.status]??x.status}</span>
        </td>
      </tr>
    `}).join(""),f=(n==="all"?e:e.filter(b=>b.productionType===n)).slice().sort((b,x)=>{if(!o)return 0;const w=o.dir==="asc"?1:-1,S=Math.max(0,b.demandForecast+b.safetyStockTarget-b.openingStock),C=Math.max(0,x.demandForecast+x.safetyStockTarget-x.openingStock);switch(o.column){case"plan-name":return w*b.productName.localeCompare(x.productName,"ja");case"plan-forecast":return w*(b.demandForecast-x.demandForecast);case"plan-required":return w*(S-C);case"plan-planned":return w*(b.plannedQty-x.plannedQty);case"plan-actual":return w*(b.actualQty-x.actualQty);case"plan-label":{const A=b.plannedQty>0?b.plannedQty:Math.round(S),T=x.plannedQty>0?x.plannedQty:Math.round(C);return w*(A-T)}default:return 0}}),g=u(f),$=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],P=b=>{const w=(b==="all"?e:e.filter(S=>S.productionType===b)).reduce((S,C)=>{const A=Math.max(0,C.demandForecast+C.safetyStockTarget-C.openingStock);return S+(C.plannedQty>0?C.plannedQty:Math.round(A))},0);return Math.ceil(w/d*10)/10},_=$.filter(b=>b.key!=="all").map(b=>{const x=P(b.key),w=e.filter(C=>C.productionType===b.key).length,S=b.key==="make_to_order"?e.filter(C=>C.productionType==="make_to_order"&&C.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${b.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${x>0?x.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${w}商品${S!==null?` · 受注${S}件`:""}</p>
      </div>
    `}).join(""),D=f.reduce((b,x)=>b+x.demandForecast,0),k=f.reduce((b,x)=>b+Math.max(0,x.demandForecast+x.safetyStockTarget-x.openingStock),0),L=f.reduce((b,x)=>b+x.plannedQty,0),s=f.reduce((b,x)=>b+x.actualQty,0),i=P(n),p=new Date,m=Array.from({length:24},(b,x)=>{const w=new Date(p.getFullYear(),p.getMonth()-6+x,1),S=`${w.getFullYear()}-${String(w.getMonth()+1).padStart(2,"0")}`;return`<option value="${S}" ${S===t?"selected":""}>${S.replace("-","年")}月</option>`}).join(""),h=$.map(b=>`<button class="button ${n===b.key?"primary":"secondary"}" type="button"
       data-action="plan-type-filter" data-filter="${b.key}"
       style="padding:4px 12px;font-size:13px;">${b.label}</button>`).join("");return`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="plan-year-month" style="width:140px;">${m}</select>
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
          <button class="button secondary" type="button" data-action="plan-print">印刷</button>
          <button class="button secondary" type="button" data-action="plan-csv-export">CSV出力</button>
          <button class="button primary" type="button" data-action="plan-save">計画を保存</button>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 0 12px;">${h}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${Te("商品名","plan-name",o)}
              <th>生産区分</th>
              ${Te("需要予測","plan-forecast",o,"numeric")}
              <th class="numeric">安全在庫目標</th>
              <th class="numeric">期首在庫</th>
              ${Te("必要生産数","plan-required",o,"numeric")}
              ${Te("計画数","plan-planned",o,"numeric")}
              ${Te("実績数","plan-actual",o,"numeric")}
              <th class="numeric">達成率</th>
              ${Te("ラベル工数","plan-label",o,"numeric")}
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            ${g||'<tr><td colspan="11" class="empty-row">データなし</td></tr>'}
            ${f.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${oe(Math.round(D))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${oe(Math.round(k))}</td>
                <td class="numeric">${oe(L)}</td>
                <td class="numeric">${s>0?oe(s):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${i.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function Ao(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n,0).getDate();return Array.from({length:o},(r,l)=>{const c=l+1;return`${e}-${String(c).padStart(2,"0")}`})}function Wn(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function Gn(e){const t=new Date(e).getDay();return t===0||t===6}function Ep(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function Lo(e){return e.partTimers+e.employees}function Ie(e,t,n={partCapacity:ut,empCapacity:mt}){const o=e.filter(f=>f.partTimers>0||f.employees>0);if(o.length===0)return;const r=t.reduce((f,g)=>{const $=g.plannedQty>0?g.plannedQty:Math.max(0,g.demandForecast+g.safetyStockTarget-g.openingStock);return f+$},0);if(r<=0)return;const l=r/o.length;let c=0,d=0,u=1/0;const y=Math.ceil(l/n.partCapacity);for(let f=0;f<=y;f++){const g=l-f*n.partCapacity,$=g>0?Math.ceil(g/n.empCapacity):0,P=f+$;P<u&&(u=P,c=f,d=$)}for(const f of e)f.confirmed||(f.partTimers>0||f.employees>0)&&(f.partTimers=c,f.employees=d)}function Ap(e,t,n={partCapacity:ut,empCapacity:mt}){const o=t.filter(d=>Lo(d)>0).map(d=>d.date).sort();if(o.length===0)return t.map(d=>({date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const r={monthly:0,november:1,annual:2,make_to_order:3},l=e.filter(d=>d.plannedQty>0||Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)>0).map(d=>({productCode:d.productCode,productName:d.productName,productionType:d.productionType,remaining:d.plannedQty>0?d.plannedQty:Math.max(0,d.demandForecast+d.safetyStockTarget-d.openingStock)})).filter(d=>d.remaining>0).sort((d,u)=>(r[d.productionType]??99)-(r[u.productionType]??99)||u.remaining-d.remaining),c=new Map;for(const d of t){const u=Ep(d,n);c.set(d.date,{date:d.date,partTimers:d.partTimers,employees:d.employees,confirmed:d.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const d of l){let u=d.remaining;if(u<=0)continue;if(o.reduce((f,g)=>{const $=c.get(g);return f+Math.max(0,$.capacity-$.totalQty)},0)<=0)break;for(const f of o){if(u<=0)break;const g=c.get(f),$=Math.max(0,g.capacity-g.totalQty);if($<=0)continue;const P=Math.min(u,$);g.items.push({productCode:d.productCode,productName:d.productName,productionType:d.productionType,qty:P}),g.totalQty+=P,g.utilization=g.capacity>0?g.totalQty/g.capacity:0,u-=P}}return t.map(d=>c.get(d.date))}function ea(e,t=1,n=1){return Ao(e).map(o=>({date:o,partTimers:Gn(o)?0:t,employees:Gn(o)?0:n,confirmed:!1}))}function Lp(e,t,n,o=null,r=new Set,l={partCapacity:ut,empCapacity:mt}){const c=Ao(t),d=e.filter(A=>!r.has(A.productCode)),u=Ap(d,n,l),y=new Map(u.map(A=>[A.date,A])),f=d.reduce((A,T)=>A+(T.plannedQty>0?T.plannedQty:Math.max(0,T.demandForecast+T.safetyStockTarget-T.openingStock)),0),$=e.reduce((A,T)=>A+(T.plannedQty>0?T.plannedQty:Math.max(0,T.demandForecast+T.safetyStockTarget-T.openingStock)),0)-f,P=u.reduce((A,T)=>A+T.totalQty,0),_=n.filter(A=>Lo(A)>0).length,D=u.reduce((A,T)=>A+T.capacity,0),k=n.reduce((A,T)=>A+T.partTimers,0),L=n.reduce((A,T)=>A+T.employees,0),s=_>0?Math.ceil(f/_):0,i=new Date,p=Array.from({length:24},(A,T)=>{const N=new Date(i.getFullYear(),i.getMonth()-6+T,1),R=`${N.getFullYear()}-${String(N.getMonth()+1).padStart(2,"0")}`;return`<option value="${R}" ${R===t?"selected":""}>${R.replace("-","年")}月</option>`}).join(""),m=new Date(c[0]).getDay(),h=[];for(let A=0;A<m;A++)h.push('<div style="min-height:44px;"></div>');for(const A of c){const T=y.get(A),N=new Date(A).getDay(),R=parseInt(A.split("-")[2]),M=T?.partTimers??0,B=T?.employees??0,j=M+B,z=T?.totalQty??0,Y=T?.utilization??0,H=A===o,G=j===0?"var(--surface-alt)":Y>.95?"rgba(197,61,61,0.12)":Y>.7?"rgba(183,121,31,0.10)":Y>0?"rgba(47,133,90,0.08)":"var(--surface)",Q=j===0?"transparent":Y>.95?"#c53d3d":Y>.7?"#b7791f":Y>0?"#2f855a":"var(--border)",J=N===0?"#c53d3d":N===6?"#0F5B8D":"var(--text)",Z=j>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${M>0?`パ${M}`:""}${B>0?`社${B}`:""}</span>`:"";h.push(`
      <div data-action="cal-toggle-day" data-date="${A}"
        style="min-height:44px;padding:3px;border:${H?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${G};cursor:pointer;display:flex;flex-direction:column;
          ${H?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${J};line-height:1;">${R}</span>
          ${Z}
        </div>
        ${j>0?`
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${z>0?oe(z):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(Y*100,100)}%;background:${Q};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const x=h.length%7;if(x>0)for(let A=0;A<7-x;A++)h.push('<div style="min-height:44px;"></div>');const w=o?y.get(o):null;o&&n.find(A=>A.date===o);const S=o&&w?(()=>{const A=w,T=parseInt(o.split("-")[2]),N=Wn(o),R=Math.round(A.utilization*100),M=n.find(V=>V.date===o),B=o===new Date().toISOString().slice(0,10),j={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},z={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},Y=A.items.map(V=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${j[V.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${V.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${z[V.productionType]??V.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${oe(V.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),H=`パ${A.partTimers}×${l.partCapacity} 社${A.employees}×${l.empCapacity} = ${oe(A.capacity)}本`,G=A.totalQty>0?Math.ceil(A.totalQty/l.partCapacity):0,Q=[];if(A.totalQty>0)for(let V=0;V<=G;V++){const K=A.totalQty-V*l.partCapacity;if(K<=0){Q.push({p:V,e:0});break}const W=Math.ceil(K/l.empCapacity);Q.push({p:V,e:W})}const J=A.totalQty-A.capacity,Z=A.totalQty===0?"":J>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${oe(J)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',ae=Q.filter(V=>V.p+V.e>0).sort((V,K)=>V.p+V.e-(K.p+K.e)).slice(0,3),ie=A.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${oe(A.totalQty)}本を収めるには ${Z}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${ae.map((V,K)=>{const W=V.p===A.partTimers&&V.e===A.employees;return`<button data-action="cal-apply-pattern" data-date="${o}" data-part="${V.p}" data-emp="${V.e}"
              style="font-size:11px;padding:4px 10px;border:1px solid ${W?"#2f855a":"var(--border)"};
                border-radius:4px;background:${W?"rgba(47,133,90,0.08)":"var(--surface)"};
                cursor:pointer;white-space:nowrap;${W?"font-weight:600;":""}">
              パ${V.p}社${V.e}＝${V.p+V.e}人
              <span style="color:var(--text-secondary);margin-left:2px;">${oe(V.p*l.partCapacity+V.e*l.empCapacity)}本</span>
            </button>`}).join("")}
        </div>
      </div>
    `:"";return`
      <section class="panel" style="margin-top:12px;border:2px solid ${B?"#2f855a":"#0F5B8D"};">
        <div style="padding:12px 16px 8px;${B?"background:rgba(47,133,90,0.06);":""}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            ${B?'<span style="background:#2f855a;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;">TODAY</span>':""}
            <h2 style="margin:0;font-size:16px;">${T}日（${N}）${B?"":"の生産内訳"}</h2>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${H} ・ 稼働率${R}%</div>
          ${A.totalQty>0?`<div style="font-size:20px;font-weight:700;margin-top:6px;">${oe(A.totalQty)}<span style="font-size:13px;font-weight:400;">本</span> <span style="font-size:13px;font-weight:400;">/ ${A.items.length}品</span></div>`:""}
        </div>
        ${ie}
        <div style="display:flex;gap:12px;padding:0 4px 8px;flex-wrap:wrap;">
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            パート
            <input type="number" min="0" max="10" value="${M?.partTimers??0}"
              data-action="cal-shift-part" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
          <label style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;">
            社員
            <input type="number" min="0" max="10" value="${M?.employees??0}"
              data-action="cal-shift-emp" data-date="${o}"
              style="width:44px;height:28px;font-size:13px;text-align:center;border:1px solid var(--border);border-radius:4px;padding:0;" />人
          </label>
        </div>
        ${A.items.length>0?`
          <div style="padding:0 4px;">
            ${Y}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${oe(A.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():o?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(o.split("-")[2])}日（${Wn(o)}）— 休日</p>
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
  `:"",C=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(A=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${A.color};"></span>${A.label}
  </span>`).join(" ");return`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <label class="field" style="margin:0;flex-shrink:0;">
        <span>対象年月</span>
        <select data-action="cal-year-month" style="width:130px;">${p}</select>
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
      <div><strong>${oe(Math.round(f))}</strong>本 ÷ <strong>${_}</strong>稼働日 = 日当たり<strong>${oe(s)}</strong>本</div>
      <div>→ パ<strong>${k}</strong> 社<strong>${L}</strong>人日 ・ キャパ<strong>${oe(D)}</strong>本
        ${P<f?` <span style="color:#c53d3d;">（${oe(Math.round(f-P))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
      </div>
      <div style="color:var(--text-secondary);font-size:10px;">日付タップで稼働ON/OFF → 人数自動計算</div>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${C}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((A,T)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${T===0?"#c53d3d":T===6?"#0F5B8D":"var(--text-secondary)"};">${A}</div>`).join("")}
        ${h.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">日付タップで稼働ON/OFF</p>
    </section>

    ${S}

    <section class="panel" style="margin-top:12px;" id="cal-label-section">
      <div class="panel-header" style="padding-bottom:4px;">
        <div>
          <h2 style="font-size:14px;">ラベル対象商品</h2>
          <p class="panel-caption">区分ごとにまとめて外す or 個別に外せます${r.size>0?`（<strong>${r.size}</strong>品除外中 = ${oe(Math.round($))}本）`:""}</p>
        </div>
        <button class="button primary" type="button" data-action="cal-save-exclusions"
          style="padding:6px 14px;font-size:12px;">設定を保存</button>
      </div>
      <div id="cal-label-list" style="max-height:500px;overflow-y:auto;">
        ${(()=>{const A=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],T=new Map;for(const N of e){if((N.plannedQty>0?N.plannedQty:Math.max(0,N.demandForecast+N.safetyStockTarget-N.openingStock))<=0)continue;const M=N.productionType||"monthly";T.has(M)||T.set(M,[]),T.get(M).push(N)}return A.filter(N=>T.has(N.key)).map(N=>{const R=T.get(N.key),M=R.reduce((H,G)=>H+(G.plannedQty>0?G.plannedQty:Math.max(0,G.demandForecast+G.safetyStockTarget-G.openingStock)),0),B=R.filter(H=>r.has(H.productCode)).length,j=B===R.length,z=B===0,Y=R.map(H=>{const G=H.plannedQty>0?H.plannedQty:Math.max(0,H.demandForecast+H.safetyStockTarget-H.openingStock),Q=r.has(H.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${Q?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${H.productCode}"
                    ${Q?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${Q?"text-decoration:line-through;":""}">${H.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${oe(Math.round(G))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${N.key}"
                    ${j?"":"checked"} ${!z&&!j?'class="indeterminate"':""}
                    style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${N.color};flex-shrink:0;"></span>
                  <div style="flex:1;font-size:13px;font-weight:600;">${N.label}<span style="font-weight:400;color:var(--text-secondary);margin-left:6px;">${R.length}品 ${oe(Math.round(M))}本</span></div>
                  ${B>0&&!j?`<span style="font-size:11px;color:#b7791f;">${B}品除外</span>`:""}
                  ${j?'<span style="font-size:11px;color:var(--text-secondary);">全除外</span>':""}
                </div>
                ${Y}
              </div>
            `}).join("")})()}
      </div>
    </section>
  `}function Cp(e,t,n,o,r,l,c="all",d=null,u=[],y=null,f=new Set,g={partCapacity:ut,empCapacity:mt}){const P=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(D=>`<button class="tab-button ${o===D.key?"active":""}"
       data-demand-tab="${D.key}">${D.label}</button>`).join("");let _="";if(o==="demand")_=e?_p(e,l):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(o==="safety")_=Sp(t,d);else if(o==="plan")_=Pp(n,r,c,d);else if(o==="calendar")try{_=Lp(n,r,u,y,f,g)}catch(D){console.error("[renderCalendarTab] error:",D),_=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(D)}
${D?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${P}
    </div>

    ${_}
  `}const Ve={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Re=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function le(e){return e.toLocaleString("ja-JP")}function he(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function yn(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function Dp(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function hn(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function qp(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(k=>k.month))].sort(),n=Re.filter(k=>e.some(L=>L.brewCategory===k)),o={};for(const k of e)o[k.month]||(o[k.month]={}),o[k.month][k.brewCategory]=k.shipmentMl;const r=820,l=300,c={top:20,right:20,bottom:50,left:70},d=r-c.left-c.right,u=l-c.top-c.bottom,y=t.map(k=>n.reduce((L,s)=>L+(o[k]?.[s]??0),0)),f=Math.max(...y,1),g=d/t.length,$=Math.max(g-8,14),P=[0,.25,.5,.75,1].map(k=>{const L=c.top+u-u*k,s=f*k/1e3;return`
      <line x1="${c.left}" y1="${L}" x2="${r-c.right}" y2="${L}" class="chart-grid" />
      <text x="6" y="${L+4}" class="chart-axis">${Math.round(s).toLocaleString("ja-JP")}L</text>
    `}).join(""),_=t.map((k,L)=>{let s=c.top+u;const i=c.left+L*g+(g-$)/2,p=n.map(S=>{const C=o[k]?.[S]??0,A=C/f*u;return s-=A,A>0?`<rect x="${i}" y="${s}" width="${$}" height="${A}" fill="${Ve[S]??"#9ca3af"}" opacity="0.85" rx="1"><title>${S}: ${he(C)}L</title></rect>`:""}).join(""),[m,h]=k.split("-"),b=parseInt(h),x=b===10||L%2===0,w=b===10?`${m}年度`:`${b}月`;return`<g>${p}${x?`<text x="${i+$/2}" y="${l-12}" class="chart-axis centered-axis" style="font-size:10px;">${w}</text>`:""}</g>`}).join(""),D=n.map(k=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${Ve[k]??"#9ca3af"};"></span>
       ${k}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${l}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${P}${_}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${c.left}px;display:flex;flex-wrap:wrap;">${D}</div>
  `}function Tp(e,t,n,o){const r=new Map;for(const d of e){const u=d.brewCategory;r.has(u)||r.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const y=r.get(u);y.rows.push(d),y.totalMl+=d.totalShipmentMl,y.avgMl+=d.monthlyAvgMl,y.stockL=d.currentStockL}const l=new Map;for(const d of t)l.has(d.brewCategory)||l.set(d.brewCategory,[]),l.get(d.brewCategory).push(d);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${Re.filter(d=>r.has(d)).map(d=>{const u=r.get(d),y=Ve[d]??"#9ca3af",f=hn(d);l.get(d);const g=n[d]??{rawAlcoholPct:18,targetAlcoholPct:15},$=g.targetAlcoholPct>0?g.rawAlcoholPct/g.targetAlcoholPct:1;u.stockL*1e3;const P=u.totalMl,_=u.avgMl,D=P/1e3,k=Math.round(u.stockL*$*10)/10,L=k*1e3,s=_>0?Math.round(L/_*10)/10:0,i=k-D,p=_>0?Math.round(_*2/1e3*10)/10:0,m=k<p,h=yn(s),b=Dp(s),x=Math.min(s/12*100,100),w=i>=0?"#22c55e":"#ef4444",S=i>=0?`+${le(Math.round(i))}L 余裕`:`${le(Math.round(i))}L 不足`,C=$>1.001;return`
        <div class="card" style="border-top:3px solid ${y};min-width:260px;flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h4 style="margin:0;font-size:14px;color:${y};">${d}</h4>
            <div style="display:flex;gap:4px;align-items:center;">
              <span style="font-size:11px;padding:2px 8px;border-radius:9999px;background:${h}20;color:${h};font-weight:600;">${b}</span>
              <button class="btn-edit-stock" data-cat-id="${f}" data-cat="${d}"
                style="font-size:10px;padding:2px 6px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">編集</button>
            </div>
          </div>

          <div id="stock-display-${f}">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;font-size:11px;margin-bottom:4px;">
              <div><span style="color:#6b7280;">原酒在庫</span><br><strong style="font-size:15px;">${le(u.stockL)}L</strong></div>
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${le(Math.round(D))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${he(_)}L</strong></div>
            </div>
            ${C?`
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${le(k)}L</div>
                <div style="color:#6b7280;">${g.rawAlcoholPct}% → ${g.targetAlcoholPct}%（×${$.toFixed(2)}）・残<strong>${s.toFixed(1)}</strong>ヶ月</div>
              </div>
            `:""}
            ${(()=>{const A=o.filter(T=>T.parentCategory===d);return A.length===0?"":A.map(T=>{const R=t.filter(M=>M.brewCategory===T.name).reduce((M,B)=>M+B.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${T.name}</span>
                  ${R>0?`<span style="margin-left:4px;">${le(R)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${f}" style="display:none;margin-bottom:8px;">
            ${(()=>{const A=o.filter(M=>M.parentCategory===d),T=[{name:d,label:d},...A.map(M=>({name:M.name,label:M.name}))],N=T.flatMap(M=>t.filter(j=>j.brewCategory===M.name).map(j=>({...j,catLabel:M.label}))),R=T.map(M=>`<option value="${M.name}">${M.label}</option>`).join("");return`
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${N.map(M=>`
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                      <span style="font-size:11px;flex:1;min-width:60px;">${M.label||"タンク"}</span>
                      <strong style="font-size:13px;">${le(M.volumeL)}L</strong>
                      ${T.length>1?`
                        <select data-action="brew-reassign-entry" data-id="${M.id}"
                          style="font-size:10px;padding:1px 4px;border:1px solid var(--border);border-radius:3px;max-width:100px;">
                          ${T.map(B=>`<option value="${B.name}" ${B.name===M.brewCategory?"selected":""}>${B.label}</option>`).join("")}
                        </select>
                      `:`<span style="font-size:10px;color:var(--text-secondary);">${M.catLabel}</span>`}
                      <button data-action="brew-delete-entry" data-id="${M.id}" data-cat="${M.brewCategory}"
                        style="font-size:10px;padding:2px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:4px;background:none;cursor:pointer;">×</button>
                    </div>
                  `).join("")||'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">タンクなし</div>'}
                </div>
                <div style="display:flex;gap:4px;align-items:center;margin-top:6px;flex-wrap:wrap;">
                  ${T.length>1?`<select id="new-entry-target-${f}" style="height:28px;font-size:11px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">${R}</select>`:""}
                  <input id="new-entry-label-${f}" type="text" placeholder="タンク名"
                    style="width:80px;height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <input id="new-entry-vol-${f}" type="number" min="0" step="1" placeholder="L"
                    style="width:60px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
                  <button data-action="brew-add-entry" data-cat="${d}" data-cat-id="${f}"
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
                <button data-action="brew-alc-save" data-cat="${d}"
                  style="font-size:10px;padding:3px 8px;border:none;border-radius:4px;background:#2563eb;color:#fff;cursor:pointer;">保存</button>
              </div>
            </div>
            <div style="margin-top:6px;">
              <button class="btn-cancel-stock" data-cat-id="${f}"
                style="font-size:11px;padding:4px 12px;border:1px solid var(--border);border-radius:4px;background:none;cursor:pointer;">閉じる</button>
            </div>
          </div>

          <div style="display:flex;gap:8px;margin-bottom:6px;font-size:11px;flex-wrap:wrap;">
            <span style="color:${w};font-weight:600;">年間比 ${S}</span>
            <span style="color:${m?"#ef4444":"#6b7280"};">安全在庫${le(p)}L${m?" ⚠下回り":" ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${C?"（加水後）":""}</span>
            <span style="font-weight:600;color:${h};">${s.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${h};height:100%;width:${x}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function Ip(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const r of e)t.has(r.brewCategory)||t.set(r.brewCategory,[]),t.get(r.brewCategory).push(r);const n=`
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
  `,o=[];for(const r of Re){const l=t.get(r);if(!l)continue;const c=Ve[r]??"#9ca3af",d=l.length>1,u=l.reduce((k,L)=>k+L.totalShipmentQty,0),y=l.reduce((k,L)=>k+L.totalShipmentMl,0),f=l.reduce((k,L)=>k+L.monthlyAvgQty,0),g=l.reduce((k,L)=>k+L.monthlyAvgMl,0),$=l.reduce((k,L)=>k+L.productCount,0),P=l[0].currentStockL,_=g>0?Math.round(P*1e3/g*10)/10:0,D=yn(_);if(o.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${d?"pointer":"default"};" ${d?`data-toggle-cat="${r}"`:""}>
        <td style="color:${c};">
          ${d?`<span class="toggle-icon" data-cat="${r}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${r}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${$}</td>
        <td style="text-align:right;">${le(u)}</td>
        <td style="text-align:right;">${he(y)}</td>
        <td style="text-align:right;">${le(f)}</td>
        <td style="text-align:right;">${he(g)}</td>
        <td style="text-align:right;">${le(P)}</td>
        <td style="text-align:right;color:${D};font-weight:700;">${_.toFixed(1)}</td>
      </tr>
    `),d)for(const k of l)o.push(`
          <tr class="sub-row-${hn(r)}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${k.subCategory}</td>
            <td style="text-align:right;">${k.productCount}</td>
            <td style="text-align:right;">${le(k.totalShipmentQty)}</td>
            <td style="text-align:right;">${he(k.totalShipmentMl)}</td>
            <td style="text-align:right;">${le(k.monthlyAvgQty)}</td>
            <td style="text-align:right;">${he(k.monthlyAvgMl)}</td>
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
  `}function Np(e,t,n,o,r,l={}){const c={html:"",needByCategory:{}};if(e.length===0)return c;const d={},u=new Date,y=u.getMonth()+1,f=y>=10?u.getFullYear():u.getFullYear()-1,g=f+1,$=new Map;for(const S of e)$.has(S.brewCategory)||$.set(S.brewCategory,new Map),$.get(S.brewCategory).set(S.fy,{shipL:S.shipmentL,annualL:S.annualizedL});const P=new Map;for(const S of r)P.has(S.brewCategory)||P.set(S.brewCategory,new Map),P.get(S.brewCategory).set(S.monthNum,S.avgMonthlyL);const _=[...new Set(e.map(S=>S.fy))].sort(),D=[...$.keys()].sort((S,C)=>{const A=[...Re,...o.map(T=>T.name)];return(A.indexOf(S)===-1?99:A.indexOf(S))-(A.indexOf(C)===-1?99:A.indexOf(C))}),k=[];for(let S=y;S<=9;S++)k.push(S);if(y>=10)for(let S=1;S<=9;S++)k.push(S);const L=_.filter(S=>S<f),s=_.includes(f),i=D.map(S=>{const C=$.get(S);_.filter(ye=>C.has(ye));const A=Ve[S]??"#6366f1",T=P.get(S)??new Map,N=L.filter(ye=>C.has(ye)).map(ye=>C.get(ye).shipL);let R=0;if(N.length>=2){let ye=0,xe=0;for(let Oe=1;Oe<N.length;Oe++)if(N[Oe-1]>0){const ga=(N[Oe]-N[Oe-1])/N[Oe-1],Tt=Oe;ye+=ga*Tt,xe+=Tt}R=xe>0?ye/xe:0}const M=C.get(f)?.annualL??0,B=N.length>0?N[N.length-1]:0,j=M>0&&B>0?Math.round(B*.4+M*.6):B||M,z=k.reduce((ye,xe)=>ye+(T.get(xe)??0),0),Y=t.filter(ye=>ye.brewCategory===S).reduce((ye,xe)=>ye+xe.volumeL,0),H=n[S],G=H&&H.targetAlcoholPct>0?H.rawAlcoholPct/H.targetAlcoholPct:1,Q=Math.round(Y*G),J=Math.max(0,Q-Math.round(z)),Z=S in l,ae=Z?l[S]:R,ie=Math.round(ae*100),V=Math.round(j*(1+ae)),K=Math.max(0,V-J);d[S]=K;const W=ie>0?"#22c55e":ie<0?"#ef4444":"#6b7280",ne=Math.round(R*100),we=C.get(f)?.annualL??0;return`
      <tr>
        <td style="color:${A};font-weight:600;white-space:nowrap;">${S}</td>
        ${L.map(ye=>`<td style="text-align:right;">${C.has(ye)?le(Math.round(C.get(ye).shipL)):"—"}</td>`).join("")}
        ${s?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${le(Math.round(we))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${ie}"
            data-action="brew-growth-edit" data-cat="${S}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${Z?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${W};font-weight:600;${Z?"background:rgba(37,99,235,0.06);":""}"
            title="${Z?`手動設定（自動: ${N.length>=2?ne+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${le(Q)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${le(Math.round(z))}</td>
        <td style="text-align:right;font-weight:600;">${le(J)}</td>
        <td style="text-align:right;">${le(V)}</td>
        <td style="text-align:right;color:${K>0?"#ef4444":"#22c55e"};font-weight:700;">${K>0?le(K):"余裕"}</td>
      </tr>
    `}).join("");let p=0,m=0,h=0,b=0,x=0;for(const S of D){const C=$.get(S),A=P.get(S)??new Map,T=L.filter(ae=>C.has(ae)).map(ae=>C.get(ae).shipL);let N=0;if(T.length>=2){let ae=0,ie=0;for(let V=1;V<T.length;V++)if(T[V-1]>0){const K=(T[V]-T[V-1])/T[V-1];ae+=K*V,ie+=V}N=ie>0?ae/ie:0}const R=C.get(f)?.annualL??0,M=T.length>0?T[T.length-1]:0,B=R>0&&M>0?Math.round(M*.4+R*.6):M||R,j=t.filter(ae=>ae.brewCategory===S).reduce((ae,ie)=>ae+ie.volumeL,0),z=n[S],Y=z&&z.targetAlcoholPct>0?z.rawAlcoholPct/z.targetAlcoholPct:1,H=Math.round(j*Y),G=k.reduce((ae,ie)=>ae+(A.get(ie)??0),0),Q=Math.max(0,H-Math.round(G)),J=S in l?l[S]:N,Z=Math.round(B*(1+J));p+=H,m+=Math.round(G),h+=Q,b+=Z,x+=Math.max(0,Z-Q)}const w=y<=9?`${y}月〜9月`:`${y}月〜翌9月`;return{needByCategory:d,html:`
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
              ${L.map(S=>`<th style="text-align:right;">${S}(L)</th>`).join("")}
              ${s?`<th style="text-align:right;">${f}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${w}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${g}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${i}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${L.map(()=>"<td></td>").join("")}
              ${s?"<td></td>":""}
              <td></td>
              <td style="text-align:right;">${le(p)}</td>
              <td style="text-align:right;color:var(--text-secondary);">-${le(m)}</td>
              <td style="text-align:right;">${le(h)}</td>
              <td style="text-align:right;">${le(b)}</td>
              <td style="text-align:right;color:#ef4444;">${le(x)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `}}function Mp(e,t,n,o,r){if(e.length===0)return"";const l=new Date,c=l.getMonth()+1,d=l.getFullYear(),u=[];let y=c,f=d;for(let L=0;L<4;L++){const s=[];for(let m=0;m<3;m++)s.push({y:f,m:y}),y++,y>12&&(y=1,f++);const i=`${s[0].y}/${s[0].m}`,p=`${s[2].y}/${s[2].m}`;u.push({label:`${i}-${p}`,months:s})}const g=new Map;for(const L of n)g.has(L.brewCategory)||g.set(L.brewCategory,new Map),g.get(L.brewCategory).set(L.monthNum,L.avgMonthlyL);const $=new Map;for(const L of e)$.has(L.brewCategory)||$.set(L.brewCategory,L.currentStockL);for(const L of r){const s=t.filter(i=>i.brewCategory===L.name).reduce((i,p)=>i+p.volumeL,0);s>0&&$.set(L.name,s)}const P=new Map;for(const L of r)P.has(L.parentCategory)||P.set(L.parentCategory,[]),P.get(L.parentCategory).push(L);const _=[];for(const L of Re){($.has(L)||(g.get(L)?.size??0)>0)&&_.push({cat:L,isChild:!1});for(const s of P.get(L)??[])($.has(s.name)||(g.get(s.name)?.size??0)>0)&&_.push({cat:s.name,isChild:!0})}function D(L,s){const i=o[L],p=i&&i.targetAlcoholPct>0?i.rawAlcoholPct/i.targetAlcoholPct:1;let m=($.get(L)??0)*p;const h=g.get(L)??new Map,b=Ve[L]??(s?"#6366f1":"#9ca3af");let x="";const w=[];for(const S of u){const C=S.months.reduce((R,{m:M})=>R+(h.get(M)??0),0),A=m;m=Math.max(0,m-C),A>0&&m<=0&&!x&&(x=S.label);const N=m<=0?"#ef4444":m<C?"#eab308":"#22c55e";w.push(`<td style="text-align:right;padding:4px 6px;color:${N};font-weight:${m<=0?"700":"400"};">${m>0?le(Math.round(m)):"枯渇"}</td>`)}return`
      <tr style="${s?"background:rgba(99,102,241,0.02);":""}">
        <td style="color:${b};font-weight:${s?"500":"600"};padding:4px 6px;white-space:nowrap;${s?"padding-left:20px;font-size:11px;":""}">${s?"┗ ":""}${L}</td>
        <td style="text-align:right;padding:4px 6px;">${le(Math.round(($.get(L)??0)*p))}</td>
        ${w.join("")}
        <td style="padding:4px 6px;font-size:11px;color:${x?"#ef4444":"#22c55e"};font-weight:600;">
          ${x?`⚠ ${x}`:"12ヶ月+"}
        </td>
      </tr>
    `}const k=_.map(({cat:L,isChild:s})=>D(L,s)).join("");return`
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
          <tbody>${k}</tbody>
        </table>
      </div>
    </div>
  `}function Rp(e,t,n){const o=new Map;for(const c of e){o.has(c.brewCategory)||o.set(c.brewCategory,{avgMl:0,totalMl:0,stockL:c.currentStockL});const d=o.get(c.brewCategory);d.avgMl+=c.monthlyAvgMl,d.totalMl+=c.totalShipmentMl}for(const c of n){const d=t.filter(u=>u.brewCategory===c.name).reduce((u,y)=>u+y.volumeL,0);(d>0||o.has(c.name))&&(o.has(c.name)?o.get(c.name).stockL=d:(o.get(c.parentCategory),o.set(c.name,{avgMl:0,totalMl:0,stockL:d})))}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${[...Re,...n.map(c=>c.name)].filter(c=>o.has(c)&&(o.get(c).stockL>0||o.get(c).totalMl>0)).map(c=>{const d=o.get(c),u=d.avgMl>0?Math.round(d.stockL*1e3/d.avgMl*10)/10:0,y=d.totalMl/1e3,f=y>0?Math.round(d.stockL/y*100):0,g=n.some(k=>k.name===c),$=Ve[c]??(g?"#6366f1":"#9ca3af"),P=d.avgMl>0?yn(u):d.stockL>0?"#22c55e":"#9ca3af",_=d.avgMl>0?Math.min(u/12*100,100):d.stockL>0?100:0,D=d.avgMl>0?`${u.toFixed(1)}ヶ月 / 年間の${f}%`:`${le(d.stockL)}L在庫`;return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:100px;font-size:12px;font-weight:500;color:${$};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${c}">${g?"┗ ":""}${c}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${P};height:100%;width:${_}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">${D}</span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${d.stockL>0?"var(--text)":"#ef4444"};">${le(d.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function Op(e,t,n,o,r){if(e.length===0)return"";const l=n.map(g=>g.name);[...Re,...l];const c=new Map;for(const g of n)c.has(g.parentCategory)||c.set(g.parentCategory,[]),c.get(g.parentCategory).push(g);const d=new Map;for(const g of e)d.has(g.brewCategory)||d.set(g.brewCategory,[]),d.get(g.brewCategory).push(g);for(const g of l)d.has(g)||d.set(g,[]);const u=new Set;for(const g of n)for(const $ of d.get(g.name)??[])u.add($.productCode);const y=new Map;for(const g of Re)y.set(g,d.get(g)??[]);const f=Re.filter(g=>d.has(g)).map(g=>{const $=d.get(g)??[],P=Ve[g]??"#9ca3af",_=c.get(g)??[],D=_.length>0,k=$.reduce((w,S)=>w+S.annualMl,0),L=$.reduce((w,S)=>w+S.monthlyAvgMl,0),s=$.filter(w=>!u.has(w.productCode)),i=s.filter(w=>!t.has(w.productCode)),p=i.reduce((w,S)=>w+S.annualMl,0),m=i.reduce((w,S)=>w+S.monthlyAvgMl,0),h=s.filter(w=>t.has(w.productCode)),b=s.map(w=>{const S=t.has(w.productCode);return`
          <tr style="${S?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${D?`<input type="checkbox" ${S?"":"checked"} data-action="brew-move-to-child" data-code="${w.productCode}" data-parent="${g}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${S?"color:#b7791f;":""}" title="${w.productName}">
              ${w.productName}${S?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${w.subCategory}</td>
            <td style="text-align:right;">${he(w.annualMl)}</td>
            <td style="text-align:right;">${he(w.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),x=_.map(w=>{const S=d.get(w.name)??[],C=S.reduce((j,z)=>j+z.annualMl,0),A=S.reduce((j,z)=>j+z.monthlyAvgMl,0),T=r.filter(j=>j.brewCategory===w.name),N=T.reduce((j,z)=>j+z.volumeL,0),R=hn(w.name),M=S.map(j=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${j.productCode}" data-cat="${w.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${j.productName}"><strong>${j.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${j.subCategory}</td>
            <td style="text-align:right;">${he(j.annualMl)}</td>
            <td style="text-align:right;">${he(j.monthlyAvgMl)}</td>
          </tr>
        `).join(""),B=h.filter(j=>!S.some(z=>z.productCode===j.productCode)).map(j=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${j.productCode}" data-cat="${w.name}"
                  style="cursor:pointer;" />
              </td>
              <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${j.productName}">${j.productName}</td>
              <td style="font-size:11px;color:var(--text-secondary);">${j.subCategory}</td>
              <td style="text-align:right;color:var(--text-secondary);">${he(j.annualMl)}</td>
              <td style="text-align:right;color:var(--text-secondary);">${he(j.monthlyAvgMl)}</td>
            </tr>
          `).join("");return`
          <tr><td colspan="5" style="padding:0;">
            <div style="border-left:3px solid #6366f1;margin:8px 0 8px 16px;padding:6px 0 6px 12px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <strong style="font-size:12px;color:#6366f1;">${w.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${S.length}品 ・ ${he(C)}L/年${N>0?` ・ 在庫${le(N)}L`:""}</span>
                <button class="btn-edit-stock" data-cat-id="${R}" data-cat="${w.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${w.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${R}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${T.map(j=>`
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${j.label||"タンク"}</span>
                    <strong style="font-size:11px;">${le(j.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${j.id}" data-cat="${w.name}"
                      style="font-size:9px;padding:1px 4px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">×</button>
                  </div>
                `).join("")}
                <div style="display:flex;gap:3px;align-items:center;margin-top:3px;">
                  <input id="new-entry-label-${R}" type="text" placeholder="名前" style="width:70px;height:22px;font-size:10px;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <input id="new-entry-vol-${R}" type="number" min="0" placeholder="L" style="width:50px;height:22px;font-size:10px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 4px;" />
                  <button data-action="brew-add-entry" data-cat="${w.name}" data-cat-id="${R}"
                    style="font-size:9px;padding:2px 6px;border:none;border-radius:3px;background:#0F5B8D;color:#fff;cursor:pointer;">追加</button>
                </div>
                <button class="btn-cancel-stock" data-cat-id="${R}" style="font-size:9px;padding:2px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;margin-top:3px;">閉じる</button>
              </div>
              ${M.length>0||B.length>0?`
                <table class="data-table" style="font-size:11px;margin:0;">
                  <tbody>
                    ${M}
                    ${B}
                  </tbody>
                  ${S.length>0?`<tfoot><tr style="font-weight:600;"><td></td><td>確定分計</td><td></td>
                    <td style="text-align:right;">${he(C)}</td><td style="text-align:right;">${he(A)}</td>
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
              全${$.length}銘柄 ・ 年間${he(k)}L
              ${D?`（内 ${_.map(w=>`${w.name}:${(d.get(w.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${D?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${b}
                ${x}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${he(k)}</td><td style="text-align:right;">${he(L)}</td></tr>
                ${D?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
                  <td style="text-align:right;">${he(p)}</td><td style="text-align:right;">${he(m)}</td></tr>`:""}
                ${h.length>0?`<tr style="font-size:11px;color:#b7791f;"><td></td><td>　未振分</td><td>${h.length}品</td>
                  <td style="text-align:right;">${he(h.reduce((w,S)=>w+S.annualMl,0))}</td>
                  <td style="text-align:right;">${he(h.reduce((w,S)=>w+S.monthlyAvgMl,0))}</td></tr>`:""}
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
  `}function Bp(e,t,n,o=[],r=new Set,l=[],c={},d=[],u={},y=[],f=[],g={},$={}){const P=new Date,_=P.getMonth()>=9?P.getFullYear():P.getFullYear()-1,D=Array.from({length:5},(L,s)=>{const i=_-s;return`<option value="${i}" ${i===n?"selected":""}>${i}年度 (${i}/10-${i+1}/9)</option>`}).join(""),k=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return k||`
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
        ${qp(t)}
      </div>

      ${Tp(e,d,u,l)}

      ${Np(y,d,u,l,f,g).html}

      ${Rp(e,d,l)}

      ${Mp(e,d,f,u,l)}

      ${Op(o,r,l,c,d)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${Ip(e)}
      </div>
    </section>
  `}const Ea={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},jp=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"],xt=[10,11,12,1,2,3,4,5,6,7,8,9],Xn=["10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月","9月"],Ke=[9,10,11,12,1,2,3,4,5],zp=["9月","10月","11月","12月","1月","2月","3月","4月","5月"];function se(e){return e.toLocaleString("ja-JP")}function Fp(e,t,n,o=[],r=2026,l=[],c=[],d={}){const y=[...new Set([...Object.keys(e).filter(w=>e[w]>0),...o.filter(w=>w.plannedVolumeL>0).map(w=>w.brewCategory)])];if(y.length===0)return'<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>';const f=[...jp,...n.map(w=>w.name)];y.sort((w,S)=>(f.indexOf(w)===-1?99:f.indexOf(w))-(f.indexOf(S)===-1?99:f.indexOf(S)));const g={polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0},$=new Map;for(const w of o)$.has(w.brewCategory)||$.set(w.brewCategory,[]),$.get(w.brewCategory).push(w);const P=(w,S,C,A,T)=>`<input type="number" step="${T}" value="${C}" data-action="brew-rice-edit" data-cat="${S}" data-field="${w}"
        style="width:${A};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`,_=(w,S,C)=>`<select data-action="brew-rice-variety-select" data-cat="${S}" data-field="${w}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${l.map(A=>`<option value="${A.name}" ${A.name===C?"selected":""}>${A.name}${A.region?` (${A.region})`:""}</option>`).join("")}
      ${!l.some(A=>A.name===C)&&C?`<option value="${C}" selected>${C}</option>`:""}
    </select>`;let D=0,k=0,L=0,s=0;const i=xt.map(()=>0),p=new Map,m=y.map(w=>{const S=e[w]??0,C=t[w]??g,A=Ea[w]??"#6366f1",T=$.get(w)??[],N=w in d,R=T.reduce((W,ne)=>W+ne.plannedVolumeL,0),M=T.length>0,B=N?d[w]:M?R:S,j=C.alcoholAdditionRatio??0,z=B*(1-j),Y=Math.round(z*C.ricePerLiterKg),H=Math.round(Y*C.kojiRatio),G=Y-H,Q=Math.round(H/C.polishingRatio),J=Math.round(G/C.polishingRatio),Z=Q+J,ae=Math.round(Q*C.kojiPricePerKg),ie=Math.round(J*C.kakePricePerKg);D+=Q,k+=J,L+=ae,s+=ie;for(const[W,ne,we,ye]of[[C.kojiVariety,Q,C.kojiPricePerKg,"麹米"],[C.kakeVariety,J,C.kakePricePerKg,"掛米"]]){if(ne<=0)continue;p.has(W)||p.set(W,{brownKg:0,pricePerKg:we,cost:0,usage:[]});const xe=p.get(W);xe.brownKg+=ne,xe.cost+=Math.round(ne*we),xe.pricePerKg=Math.round(xe.cost/xe.brownKg),xe.usage.push({cat:w,type:ye,kg:ne})}const V=xt.map(()=>0);if(T.length>0)for(const W of T){const ne=xt.indexOf(W.brewMonth);ne>=0&&(V[ne]+=W.plannedVolumeL)}else{const W=B/12;for(let ne=0;ne<12;ne++)V[ne]=W}const K=V.reduce((W,ne)=>W+ne,0)||1;for(let W=0;W<12;W++){const ne=V[W]/K;i[W]+=Math.round(Z*ne)}return`
      <div class="card" style="border-top:3px solid ${A};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${A};">${w}</h4>
          <div style="font-size:12px;">${B>0?`予算 <strong>¥${se(ae+ie)}</strong>`:'<span style="color:#6b7280;font-weight:600;">醸造しない</span>'}</div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(B)}"
              data-action="proc-edit-vol" data-cat="${w}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid ${N?"#2563eb":"var(--border)"};border-radius:4px;padding:0 4px;font-weight:600;${N?"background:rgba(37,99,235,0.04);":""}" />L
          </label>
          ${j>0?`<span style="color:var(--text-secondary);">−${Math.round(j*100)}%→${se(Math.round(z))}L</span>`:""}
          ${S>0&&Math.abs(S-B)>10?`<span style="color:var(--text-secondary);font-size:11px;">(予測${se(Math.round(S))})</span>`:""}
        </div>

        <div style="border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:8px;background:var(--surface-alt);">
          <div style="font-size:11px;font-weight:600;color:${A};margin-bottom:6px;">醸造スケジュール${T.length>0?` (${se(Math.round(T.reduce((W,ne)=>W+ne.plannedVolumeL,0)))}L / ${se(Math.round(B))}L)`:""}</div>
          ${T.length>0?`
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
              ${T.map(W=>`
                <div style="display:flex;align-items:center;gap:3px;padding:3px 8px;border-radius:4px;background:${A}15;border:1px solid ${A}30;">
                  <span style="font-size:11px;font-weight:600;color:${A};">${W.brewMonth}月</span>
                  <input type="number" min="0" max="${Math.round(B)}" step="100" value="${Math.round(W.plannedVolumeL)}"
                    data-action="proc-sched-edit-vol" data-cat="${w}" data-month="${W.brewMonth}"
                    style="width:56px;height:22px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />L
                  <button data-action="proc-sched-remove" data-cat="${w}" data-month="${W.brewMonth}"
                    style="border:none;background:none;color:#ef4444;cursor:pointer;font-size:14px;padding:0 2px;line-height:1;">×</button>
                </div>
              `).join("")}
            </div>
          `:'<div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px;">醸造月を追加してください</div>'}
          <div style="display:flex;align-items:center;gap:4px;">
            <select data-action="proc-add-month-select" data-cat="${w}"
              style="height:24px;font-size:11px;border:1px solid var(--border);border-radius:3px;padding:0 4px;">
              ${[10,11,12,1,2,3,4,5,6,7,8,9].filter(W=>!T.some(ne=>ne.brewMonth===W)).map(W=>`<option value="${W}">${W}月</option>`).join("")}
            </select>
            <input type="number" min="0" max="${Math.round(B)}" step="100" placeholder="L"
              data-action="proc-add-month-vol" data-cat="${w}"
              style="width:56px;height:24px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />
            <button data-action="proc-add-schedule" data-cat="${w}"
              style="height:24px;font-size:11px;padding:0 8px;border:1px solid ${A};background:${A}10;color:${A};border-radius:3px;cursor:pointer;">+追加</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${P("ricePerLiterKg",w,C.ricePerLiterKg,"48px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${P("kojiRatio",w,C.kojiRatio,"44px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${P("polishingRatio",w,C.polishingRatio,"44px","0.01")}</label>
          ${j>0||w==="本醸造"||w==="普通酒"?`<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${P("alcoholAdditionRatio",w,C.alcoholAdditionRatio??0,"44px","0.01")}</label>`:""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${_("kojiVariety",w,C.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${P("kojiPricePerKg",w,C.kojiPricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${se(Q)}kg</strong> <span style="color:var(--text-secondary);">(${(Q/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${se(ae)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${_("kakeVariety",w,C.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${P("kakePricePerKg",w,C.kakePricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${se(J)}kg</strong> <span style="color:var(--text-secondary);">(${(J/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${se(ie)}</div>
          </div>
        </div>
      </div>
    `}).join(""),h=D+k,b=L+s,x=Math.max(...i,1);return xt.map((w,S)=>{const C=i[S];return`
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${C/x*100}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${C>0?2:0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${Xn[S]}</div>
        <div style="font-size:10px;font-weight:600;">${C>0?se(C):""}</div>
        <div style="font-size:9px;color:var(--text-secondary);">${C>0?(C/60).toFixed(0)+"俵":""}</div>
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
          ${zp.map(w=>`<div style="text-align:center;padding:4px;font-weight:600;border-left:1px solid var(--border);">${w}</div>`).join("")}
        </div>
        ${(()=>{const w=[],S=Ke.length,C=new Map;for(const N of c)N.deliveryMonth&&(C.has(N.varietyName)||C.set(N.varietyName,[]),C.get(N.varietyName).push(N.deliveryMonth));for(const[N,R]of C){const M=Ke.map(B=>{const j=R.includes(B),z=c.filter(Y=>Y.varietyName===N&&Y.deliveryMonth===B).reduce((Y,H)=>Y+H.committedBales,0);return`<div style="text-align:center;padding:3px;border-left:1px solid var(--border);${j?"background:#dcfce7;":""}">
                ${j?`<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${z}俵</div>`:""}
              </div>`}).join("");w.push(`<div style="display:grid;grid-template-columns:80px repeat(${S},1fr);border-top:1px solid var(--border);">
              <div style="padding:4px;color:#16a34a;font-weight:500;font-size:10px;">📥 ${N}</div>${M}
            </div>`)}const A=34,T=2;for(const N of y){const R=$.get(N)??[],M=Ea[N]??"#6366f1",B=N in d,j=R.reduce((V,K)=>V+K.plannedVolumeL,0),z=R.length>0,Y=B?d[N]:z?j:e[N]??0,H=[],G=[...R].sort((V,K)=>Ke.indexOf(V.brewMonth)-Ke.indexOf(K.brewMonth)),Q=[];for(const V of G){const K=Ke.indexOf(V.brewMonth);if(K<0)continue;const W=Math.min(V.durationMonths,S-K),ne=K+W;let we=0;for(;we<Q.length&&Q[we]>K;)we++;we>=Q.length?Q.push(ne):Q[we]=ne,H.push({s:V,startIdx:K,dur:W,lane:we})}const Z=Math.max(Q.length,1)*(A+T)+T,ae=Ke.map(()=>`<div style="border-left:1px solid var(--border);height:${Z}px;"></div>`).join(""),ie=H.map(({s:V,startIdx:K,dur:W,lane:ne})=>{const we=(K/S*100).toFixed(2),ye=(W/S*100).toFixed(2),xe=T+ne*(A+T);return`<div class="gantt-bar" data-cat="${N}" data-month="${V.brewMonth}" data-dur="${W}" data-vol="${Math.round(V.plannedVolumeL)}" data-max="${Math.round(Y)}"
                style="position:absolute;left:${we}%;width:${ye}%;top:${xe}px;height:${A}px;
                  background:${M}30;border:2px solid ${M};border-radius:6px;cursor:grab;
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${M};overflow:hidden;box-sizing:border-box;">
                <div class="gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
                <span class="gantt-bar-label" style="pointer-events:none;white-space:nowrap;">${se(Math.round(V.plannedVolumeL))}L</span>
                <div class="gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
              </div>`}).join("");w.push(`<div style="display:grid;grid-template-columns:80px 1fr;border-top:1px solid var(--border);">
              <div style="padding:4px;color:${M};font-weight:500;font-size:10px;display:flex;align-items:center;">🍶 ${N}</div>
              <div style="position:relative;display:grid;grid-template-columns:repeat(${S},1fr);">
                ${ae}
                <div class="gantt-bar-container" data-cat="${N}" data-max="${Math.round(Y)}" data-cols="${S}" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                  ${ie}
                </div>
              </div>
            </div>`)}return w.join("")||'<div style="text-align:center;color:var(--text-secondary);padding:16px;">区分を追加するとタイムラインが表示されます</div>'})()}
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(()=>{const w=y.map(C=>{const A=t[C]??g,T=$.get(C)??[],N=C in d,R=T.reduce((H,G)=>H+G.plannedVolumeL,0),M=T.length>0,B=N?d[C]:M?R:e[C]??0,j=B*(1-(A.alcoholAdditionRatio??0)),z=Math.round(j*A.ricePerLiterKg),Y=Math.round(z/A.polishingRatio);return{cat:C,brewingL:B,brownKg:Y,color:Ea[C]??"#6366f1"}}).filter(C=>C.brewingL>0||C.brownKg>0),S=Math.max(...w.map(C=>C.brownKg),1);return w.map(C=>{const A=Math.min(C.brownKg/S*100,100);return`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="width:90px;font-size:11px;font-weight:500;color:${C.color};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${C.cat}</span>
              <div style="flex:1;background:#e5e7eb;border-radius:3px;height:20px;overflow:hidden;position:relative;">
                <div style="background:${C.color};opacity:0.7;height:100%;width:${A}%;border-radius:3px;"></div>
                <span style="position:absolute;top:2px;left:6px;font-size:10px;font-weight:600;color:#374151;">${se(C.brownKg)}kg (${Math.ceil(C.brownKg/60)}俵)</span>
              </div>
              <span style="width:60px;font-size:10px;text-align:right;color:var(--text-secondary);">${se(Math.round(C.brewingL))}L</span>
            </div>
          `}).join("")})()}
    </section>

    ${m}

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
            ${[...p.entries()].sort((w,S)=>S[1].brownKg-w[1].brownKg).map(([w,S])=>{const C=(S.brownKg/60).toFixed(1),A=S.usage.map(T=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${T.type==="麹米"?"rgba(99,102,241,0.08)":"rgba(183,121,31,0.08)"};margin-right:3px;">${T.cat}/${T.type} ${se(T.kg)}kg</span>`).join("");return`
                <tr>
                  <td style="font-weight:600;">${w}</td>
                  <td style="text-align:right;font-weight:600;">${se(S.brownKg)}</td>
                  <td style="text-align:right;">${C}</td>
                  <td style="text-align:right;">¥${se(S.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${se(S.cost)}</td>
                  <td style="max-width:300px;overflow-x:auto;">${A}</td>
                </tr>
              `}).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              <td style="text-align:right;">${se(h)}</td>
              <td style="text-align:right;">${Math.ceil(h/60)}</td>
              <td></td>
              <td style="text-align:right;">¥${se(b)}</td>
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
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${se(D)}kg</strong> <span style="color:var(--text-secondary);">(${(D/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${se(L)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${se(k)}kg</strong> <span style="color:var(--text-secondary);">(${(k/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${se(s)}</div>
        </div>
        <div style="background:var(--surface-alt);border-radius:8px;padding:14px;border:2px solid var(--border);">
          <div style="font-size:11px;font-weight:600;">総合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${se(h)}kg</strong> <span style="color:var(--text-secondary);">(${Math.ceil(h/60)}俵)</span></div>
          <div style="font-size:22px;font-weight:700;margin-top:4px;">¥${se(b)}<span style="font-size:13px;font-weight:400;margin-left:4px;">(${(b/1e4).toFixed(0)}万)</span></div>
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
      ${(()=>{const w=new Map;for(const[M,B]of p)w.set(M,B.brownKg);const S=new Map;for(const M of c){S.has(M.varietyName)||S.set(M.varietyName,{bales:0,kg:0,cost:0,suppliers:[]});const B=S.get(M.varietyName);B.bales+=M.committedBales,B.kg+=M.committedBales*60,B.cost+=M.committedBales*60*M.pricePerKg,M.supplier&&!B.suppliers.includes(M.supplier)&&B.suppliers.push(M.supplier)}const C=[...new Set([...w.keys(),...S.keys()])];let A=0,T=0;const N=C.map(M=>{const B=w.get(M)??0,j=S.get(M),z=j?.kg??0,Y=z-B;A+=z,T+=B;const H=Y>=0?"#22c55e":"#ef4444",G=Y>=0?`+${se(Math.round(Y))}kg余裕`:`${se(Math.round(Y))}kg不足`,Q=z>0?Math.min(B/z*100,100):0;return`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${M}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${se(Math.round(z))}kg (${j?.bales??0}俵)</span>
                  <span>必要 ${se(Math.round(B))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${Q}%;background:${z>0?Y>=0?"#22c55e":"#ef4444":"#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${H};">${z>0?G:"未確保"}</span>
            </div>
          `}).join(""),R=A-T;return`
          <div style="margin-bottom:12px;">
            ${N||'<p style="color:var(--text-secondary);text-align:center;padding:12px;">作付け予定が未登録です</p>'}
          </div>
          ${A>0?`
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;padding:8px;background:var(--surface-alt);border-radius:6px;">
              <span>確保合計: <strong>${se(Math.round(A))}kg</strong> (${Math.ceil(A/60)}俵)</span>
              <span>必要合計: <strong>${se(Math.round(T))}kg</strong></span>
              <span style="color:${R>=0?"#22c55e":"#ef4444"};font-weight:600;">
                ${R>=0?`余裕 ${se(Math.round(R))}kg`:`不足 ${se(Math.round(-R))}kg`}
              </span>
            </div>
          `:""}
          <div style="display:flex;gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap;">
            <select id="proc-commit-variety" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 6px;">
              ${l.map(M=>`<option value="${M.name}">${M.name}</option>`).join("")}
            </select>
            <input id="proc-commit-bales" type="number" min="0" step="1" placeholder="俵数"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <input id="proc-commit-price" type="number" min="0" step="10" placeholder="円/kg"
              style="width:70px;height:28px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 6px;" />
            <select id="proc-commit-month" style="height:28px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;">
              <option value="">入荷月</option>
              ${xt.map((M,B)=>`<option value="${M}">${Xn[B]}</option>`).join("")}
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
        ${l.map(w=>`
          <div style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;margin:2px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
            <strong>${w.name}</strong>
            <span style="color:var(--text-secondary);">¥${se(w.defaultPricePerKg)}/kg</span>
            ${w.region?`<span style="color:var(--text-secondary);font-size:10px;">${w.region}</span>`:""}
            <button data-action="proc-delete-variety" data-id="${w.id}"
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
  `}const Vp={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Up={planned:"計画中",active:"進行中",completed:"完了"},Co={未着手:"#d1d5db",進行中:"#3b82f6",完了:"#22c55e"},Be=6;function gn(e){return e.toLocaleString("ja-JP")}function qt(e){return Vp[e]??"#6366f1"}function Ut(e,t){return Math.round((new Date(t).getTime()-new Date(e).getTime())/864e5)}function Yp(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n.toISOString().slice(0,10)}function Le(e){return e?e.slice(5).replace("-","/"):"―"}function Jp(e){return e.length<=3?e:e.slice(0,3)}function Kp(e,t,n){const o=e.filter(L=>L.status!=="completed"&&L.startDate&&L.targetEndDate);if(o.length===0)return"";const r=o.flatMap(L=>[L.startDate,L.targetEndDate]),l=o.flatMap(L=>t[L.id]??[]);for(const L of l)L.plannedStart&&r.push(L.plannedStart),L.plannedEnd&&r.push(L.plannedEnd);r.sort();const c=r[0],d=r[r.length-1],u=Math.min(Ut(c,d)+7,180),y=u*Be,f=[];let g="";for(let L=0;L<u;L++){const s=Yp(c,L),i=s.slice(0,7);i!==g&&(f.push(`<span style="position:absolute;left:${L*Be}px;font-size:9px;color:#6b7280;white-space:nowrap;border-left:1px solid #d1d5db;padding-left:2px;">${parseInt(s.slice(5,7))}月</span>`),g=i)}const $=new Date().toISOString().slice(0,10),P=Ut(c,$),_=P>=0&&P<u?`<div style="position:absolute;left:${P*Be}px;top:0;width:2px;height:100%;background:#ef4444;z-index:5;opacity:0.7;pointer-events:none;"></div>`:"",D=30,k=o.map(L=>{const s=(t[L.id]??[]).sort((h,b)=>h.stepOrder-b.stepOrder),i=qt(L.brewCategory),p=n===L.id,m=s.map(h=>{const b=Math.max(Ut(c,h.plannedStart),0),x=Math.min(Ut(c,h.plannedEnd),u-1),w=b*Be,S=Math.max((x-b+1)*Be,Be),C=Co[h.status],A=h.status==="未着手"?"#555":"#fff";return`<div class="bp-gantt-bar" data-step-id="${h.id}" data-batch-id="${h.batchId}" data-step-order="${h.stepOrder}" data-planned-start="${h.plannedStart}" data-planned-end="${h.plannedEnd}" style="position:absolute;left:${w}px;top:4px;width:${S}px;height:22px;background:${C};border-radius:3px;font-size:7px;line-height:22px;color:${A};overflow:hidden;white-space:nowrap;cursor:grab;border:1px solid ${h.status==="未着手"?"#bbb":C};" title="${h.stepName} ${Le(h.plannedStart)}〜${Le(h.plannedEnd)}"><div class="bp-gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div><span style="padding:0 16px;pointer-events:none;">${S>24?Jp(h.stepName):""}</span><div class="bp-gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div></div>`}).join("");return`<div style="display:flex;align-items:center;border-bottom:1px solid ${p?"#3b82f6":"#f3f4f6"};min-height:${D}px;background:${p?"#eff6ff":"transparent"};" data-action="bp-toggle-detail" data-batch-id="${L.id}">
      <div style="width:120px;flex-shrink:0;padding:2px 6px;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;">
        <span style="color:${i};font-weight:600;">${L.batchCode}</span>
        <span style="color:#9ca3af;display:block;font-size:8px;">${L.brewCategory}</span>
      </div>
      <div style="position:relative;width:${y}px;height:${D}px;background:repeating-linear-gradient(90deg,transparent 0 ${Be*7-1}px,#f3f4f6 ${Be*7-1}px ${Be*7}px);">${m}</div>
    </div>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>醸造ガントチャート</h2><p class="panel-caption">仕込をクリックで詳細表示 ／ バーをドラッグで日程調整</p></div>
    <div id="bp-gantt" style="overflow-x:auto;touch-action:none;user-select:none;">
      <div style="min-width:${y+120}px;">
        <div style="display:flex;align-items:flex-end;">
          <div style="width:120px;flex-shrink:0;"></div>
          <div style="position:relative;width:${y}px;height:20px;">${f.join("")}</div>
        </div>
        <div style="position:relative;">${k}${_}</div>
      </div>
    </div>
  </section>`}function Hp(e,t){const n=[...t].sort((D,k)=>D.stepOrder-k.stepOrder);if(n.length===0)return"";const o=120,r=50,l=40,c=20,d=5,u=Math.ceil(n.length/d),y=d*(o+l)-l+20,f=u*(r+c)-c+20,g=D=>{const k=Math.floor(D/d);return{x:10+(k%2===0?D%d:d-1-D%d)*(o+l),y:10+k*(r+c)}},$=n.map((D,k)=>{const L=g(k),s=Co[D.status],i=D.status==="進行中"?"#1d4ed8":D.status==="完了"?"#15803d":"#9ca3af",p=D.status==="未着手"?"#374151":"#fff";return`<g>
      <rect x="${L.x}" y="${L.y}" width="${o}" height="${r}" rx="6" fill="${s}" stroke="${i}" stroke-width="2"/>
      <text x="${L.x+o/2}" y="${L.y+20}" text-anchor="middle" fill="${p}" font-size="11" font-weight="600">${D.stepName}</text>
      <text x="${L.x+o/2}" y="${L.y+36}" text-anchor="middle" fill="${p}" font-size="9" opacity="0.8">${Le(D.plannedStart)}〜${Le(D.plannedEnd)}</text>
    </g>`}).join(""),P=n.slice(1).map((D,k)=>{const L=g(k),s=g(k+1),i=L.x+o/2,p=L.y+r/2,m=s.x+o/2,h=s.y+r/2;if(Math.floor(k/d)===Math.floor((k+1)/d)){const x=m>i?1:-1,w=L.x+(x>0?o:0),S=p,C=s.x+(x>0?0:o);return`<line x1="${w}" y1="${S}" x2="${C}" y2="${h}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}else{const x=L.y+r,w=s.y;return`<line x1="${i}" y1="${x}" x2="${m}" y2="${w}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}}).join("");return`<div id="bp-network" style="margin-bottom:16px;">
    <section class="panel">
      <div class="panel-header">
        <h2 style="display:flex;align-items:center;gap:6px;">
          <span style="color:${qt(e.brewCategory)};">●</span> ${e.batchCode} 醸造工程フロー
        </h2>
        <p class="panel-caption">クリティカルパス（全工程直列）</p>
      </div>
      <div style="overflow-x:auto;padding:8px 0;">
        <svg width="${y}" height="${f}" style="display:block;">
          <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/></marker></defs>
          ${P}${$}
        </svg>
      </div>
    </section>
  </div>`}function Qp(e,t,n){if(e.length===0)return'<div class="panel" style="padding:20px;text-align:center;color:#9ca3af">仕込が未登録です。調達計画から取込むか、新規登録してください。</div>';const o=e.map(r=>{const l=t[r.id]??[],c=l.length,d=l.filter(g=>g.status==="完了").length,u=c>0?Math.round(d/c*100):0,y=qt(r.brewCategory);return`<tr style="border-bottom:1px solid #f3f4f6;background:${n===r.id?"#eff6ff":"transparent"};cursor:pointer;" data-action="bp-toggle-detail" data-batch-id="${r.id}">
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
          ${["planned","active","completed"].map(g=>`<option value="${g}"${r.status===g?" selected":""}>${Up[g]}</option>`).join("")}
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
        <tbody>${o}</tbody>
      </table>
    </div>
  </section>`}function Wp(e,t){if(e.length===0)return"";const n=new Set(t.map(l=>`${l.brewCategory}:${l.startDate?.slice(0,7)}`)),o=e.filter(l=>{const c=l.brewMonth>=10?l.fy:l.fy+1,d=`${l.brewCategory}:${c}-${String(l.brewMonth).padStart(2,"0")}`;return!n.has(d)&&l.plannedVolumeL>0});return o.length===0?"":`<section class="panel" style="margin-bottom:16px">
    <div class="panel-header">
      <div><h2>調達計画から取込</h2><p class="panel-caption">未登録のスケジュールを一括で仕込登録</p></div>
      <button class="button primary" data-action="bp-import-schedule" style="font-size:12px;">一括仕込登録</button>
    </div>
    <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid #e5e7eb;color:#6b7280;text-align:left;font-size:10px">
        <th style="padding:3px 6px">区分</th><th style="padding:3px 6px">コード</th><th style="padding:3px 6px;text-align:right">醸造量</th><th style="padding:3px 6px">開始月</th><th style="padding:3px 3px;text-align:center">選択</th>
      </tr></thead><tbody>${o.map(l=>{const d=`${l.brewMonth>=10?l.fy:l.fy+1}-${String(l.brewMonth).padStart(2,"0")}-01`,u=`${l.brewCategory}-${l.fy}-${String(l.brewMonth).padStart(2,"0")}`;return`<tr>
      <td style="padding:5px 6px"><span style="color:${qt(l.brewCategory)};font-weight:600;font-size:11px;">${l.brewCategory}</span></td>
      <td style="padding:5px 6px;font-size:11px;">${u}</td>
      <td style="padding:5px 6px;text-align:right;font-size:11px;">${gn(Math.round(l.plannedVolumeL))}L</td>
      <td style="padding:5px 6px;font-size:11px;">${l.brewMonth}月（${d}）</td>
      <td style="padding:5px 3px;text-align:center;"><input type="checkbox" data-action="bp-import-check" data-cat="${l.brewCategory}" data-month="${l.brewMonth}" data-vol="${Math.round(l.plannedVolumeL)}" data-date="${d}" data-code="${u}" checked></td>
    </tr>`}).join("")}</tbody></table></div>
  </section>`}function Gp(e){return`<div class="panel" style="margin-bottom:16px">
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
  </div>`}function Xp(e,t){const n=[...t].sort((l,c)=>l.stepOrder-c.stepOrder);if(n.length===0)return"";const o=n.map(l=>`<tr style="border-bottom:1px solid #f3f4f6">
    <td style="padding:4px 6px;font-size:11px;font-weight:${l.status==="進行中"?700:400}">${l.stepName}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${Le(l.plannedStart)}〜${Le(l.plannedEnd)}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${l.actualStart?Le(l.actualStart):"―"}〜${l.actualEnd?Le(l.actualEnd):"―"}</td>
    <td style="padding:4px 3px">
      <select data-action="bp-step-status" data-step-id="${l.id}" data-batch-id="${l.batchId}" style="font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px">
        ${["未着手","進行中","完了"].map(c=>`<option value="${c}"${l.status===c?" selected":""}>${c}</option>`).join("")}
      </select>
    </td>
    <td style="padding:4px 3px"><input type="number" step="0.1" data-action="bp-step-temp" data-step-id="${l.id}" value="${l.temperature??""}" placeholder="℃" style="width:50px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
    <td style="padding:4px 3px"><input type="text" data-action="bp-step-notes" data-step-id="${l.id}" value="${l.notes}" placeholder="メモ" style="width:100px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
  </tr>`).join("");return`<section class="panel" style="margin-bottom:16px;border-left:4px solid ${qt(e.brewCategory)};">
    <div class="panel-header"><h2>${e.batchCode} 工程詳細</h2><p class="panel-caption">${e.brewCategory} ｜ ${gn(e.plannedVolumeL)}L ｜ ${Le(e.startDate)}〜${Le(e.targetEndDate)}</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:500px">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left">
          <th style="padding:3px 6px">工程</th><th style="padding:3px 6px">予定</th><th style="padding:3px 6px">実績</th>
          <th style="padding:3px 3px">状態</th><th style="padding:3px 3px">温度</th><th style="padding:3px 3px">メモ</th>
        </tr></thead>
        <tbody>${o}</tbody>
      </table>
    </div>
  </section>`}function Zp(e,t,n){const o=new Map;for(const l of t){if(!l.tankNo||l.status==="completed")continue;const c=n[l.id]??[],d=c.find(y=>y.stepName==="仕込み(添/仲/留)"),u=c.find(y=>y.stepName==="上槽");d?.plannedStart&&u?.plannedEnd&&(o.has(l.tankNo)||o.set(l.tankNo,[]),o.get(l.tankNo).push({batchCode:l.batchCode,start:d.plannedStart,end:u.plannedEnd}))}const r=e.map(l=>{const c=o.get(l.tankNo)??[],d=c.length>0?c.map(u=>`<span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#dbeafe;color:#2563eb;">${u.batchCode}(${Le(u.start)}〜${Le(u.end)})</span>`).join(" "):'<span style="font-size:9px;color:#22c55e;">空き</span>';return`<tr style="border-bottom:1px solid #f3f4f6;">
      <td style="padding:4px 6px;font-size:12px;font-weight:600;">${l.tankNo}</td>
      <td style="padding:4px 6px;font-size:11px;text-align:right;">${gn(l.capacityL)}L</td>
      <td style="padding:4px 6px;font-size:10px;color:#6b7280;">${l.preferredCategories.length>0?l.preferredCategories.join(", "):"全区分"}</td>
      <td style="padding:4px 6px;">${d}</td>
      <td style="padding:4px 3px;"><button data-action="bp-tank-delete" data-tank-id="${l.id}" style="font-size:9px;padding:1px 6px;border:1px solid #fca5a5;color:#ef4444;background:white;border-radius:3px;cursor:pointer;">×</button></td>
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
  </section>`}function eu(e,t,n){if(e.length===0||n.length===0)return"";const o=new Map(n.map(y=>[y.stepName,y])),r=new Map;for(const y of e){if(!y.plannedStart||!y.plannedEnd)continue;const f=o.get(y.stepName);if(!f)continue;const g=new Date(y.plannedStart),$=new Date(y.plannedEnd),P=Math.max(Math.round(($.getTime()-g.getTime())/864e5)+1,1);let _=0;for(let k=0;k<P;k++)new Date(g.getTime()+k*864e5).getDay()!==0&&_++;if(_===0)continue;const D=f.laborHours/_;for(let k=new Date(g);k<=$;k=new Date(k.getTime()+864e5)){if(k.getDay()===0)continue;const L=new Date(k);L.setDate(L.getDate()+3-(L.getDay()+6)%7);const s=new Date(L.getFullYear(),0,4),i=1+Math.round(((L.getTime()-s.getTime())/864e5-3+(s.getDay()+6)%7)/7),p=`${L.getFullYear()}-W${String(i).padStart(2,"0")}`;r.set(p,(r.get(p)??0)+D)}}if(r.size===0)return"";const l=[...r.keys()].sort(),c=t.workerCount*t.weeklyHoursLimit,d=Math.max(...r.values(),c),u=l.map(y=>{const f=r.get(y)??0,g=Math.min(f/d*100,100),$=f>c,P=$?"#ef4444":f>c*.8?"#f59e0b":"#22c55e",_=y.replace(/^\d{4}-W/,"W");return`<div style="text-align:center;flex:1;min-width:32px;">
      <div style="height:60px;display:flex;align-items:flex-end;justify-content:center;">
        <div style="width:20px;height:${g}%;background:${P};border-radius:3px 3px 0 0;min-height:2px;" title="${Math.round(f)}h / ${c}h"></div>
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
        <div style="border-top:2px dashed #ef4444;width:100%;position:relative;top:${-60*(c/d)+60}px;">
          <span style="font-size:7px;color:#ef4444;position:absolute;right:0;top:-10px;">${c}h</span>
        </div>
      </div>
      ${u}
    </div>
  </section>`}function tu(e,t,n,o={}){const{expandedBatchId:r,showNewForm:l,schedule:c=[],fy:d=2026,workerSettings:u={workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},stepLabor:y=[],tanks:f=[]}=o,g={};for(const s of t)(g[s.batchId]??=[]).push(s);const $=e.filter(s=>s.status==="active").length,P=e.filter(s=>s.status==="planned").length,_=e.filter(s=>s.status==="completed").length,D=r?e.find(s=>s.id===r):null,k=D?Hp(D,g[D.id]??[]):"",L=D?Xp(D,g[D.id]??[]):"";return`
    <section class="page-head">
      <div><p class="eyebrow">製造管理</p><h1>醸造工程管理</h1></div>
      <div class="meta-stack" style="display:flex;gap:8px;">
        <button class="button primary" data-action="bp-auto-schedule" style="font-size:12px;">自動スケジュール</button>
        <button class="button" data-action="bp-show-new-form">＋ 新規仕込</button>
      </div>
    </section>
    <section class="kpi-grid compact">
      <article class="panel kpi-card"><p class="panel-title">醸造中</p><p class="kpi-value">${$}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">計画中</p><p class="kpi-value">${P}</p><p class="kpi-sub">仕込</p></article>
      <article class="panel kpi-card"><p class="panel-title">完了</p><p class="kpi-value">${_}</p><p class="kpi-sub">今期</p></article>
    </section>

    ${Kp(e,g,r)}
    ${eu(t,u,y)}
    ${Zp(f,e,g)}
    ${l?Gp(n):""}
    ${Wp(c,e)}
    ${k}
    ${L}
    ${Qp(e,g,r)}

    <div id="bp-delete-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:1000;align-items:center;justify-content:center;">
      <div style="background:white;border-radius:12px;padding:24px;max-width:360px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <h3 style="margin:0 0 12px;font-size:15px;">仕込を削除</h3>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;"><strong id="bp-delete-batch-name"></strong> の仕込を削除します。<br>関連する全工程データも削除されます。この操作は取り消せません。</p>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button data-action="bp-delete-cancel" style="padding:8px 16px;font-size:13px;border:1px solid #d1d5db;background:white;border-radius:6px;cursor:pointer;">キャンセル</button>
          <button data-action="bp-delete-confirm" style="padding:8px 16px;font-size:13px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer;font-weight:600;">削除する</button>
        </div>
      </div>
    </div>`}function Ua(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function au(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Do(e){return e?ua.find(t=>t.value===e)?.label??e:""}function nu(e){const t=[],n=[],o=[];for(const r of e){const l=r.amount_last_year_same_month>0?r.amount_this_month/r.amount_last_year_same_month:1,c={code:r.customer_code,name:r.customer_name,businessType:r.business_type,areaCode:r.area_code,phone:r.phone,lastOrderDate:r.last_order_date,daysSinceLastOrder:r.days_since_order,totalAmountLast12m:r.amount_12m,amount3m:r.amount_3m,amountThisMonth:r.amount_this_month,amountLastYearSameMonth:r.amount_last_year_same_month,annualRevenue:r.annual_revenue,yoyRatio:l,status:"dormant"};r.is_at_risk?t.push({...c,status:"at-risk"}):r.is_dormant?n.push({...c,status:"dormant"}):r.amount_last_year_same_month>0&&l<.8&&o.push({...c,status:"declining"})}return t.sort((r,l)=>l.totalAmountLast12m-r.totalAmountLast12m),n.sort((r,l)=>l.daysSinceLastOrder-r.daysSinceLastOrder),o.sort((r,l)=>r.yoyRatio-l.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:o}}function su(e,t){const n=t?.reason??"",o=ua.map(r=>`<option value="${r.value}" ${n===r.value?"selected":""}>${r.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${o}
    </select>`}function ou(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],o=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',r=!!t?.actionedAt,l=r?'style="opacity:0.45;"':"",c=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${Do(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${r?"1":"0"}" ${l}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${c}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${o}
      <td class="numeric">${Ua(e.totalAmountLast12m)}</td>
      <td>${su(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${r?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function Aa(e,t,n,o,r,l,c,d){if(r.length===0)return"";const u=r.map(y=>ou(y,d.get(y.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${o}" style="margin-right:8px;">${r.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${au(l)}</p>
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
    </section>`}function ru(e,t=[]){const{atRiskCustomers:n,dormantCustomers:o,decliningCustomers:r}=e,l=n.length+o.length+r.length,c=n.reduce((k,L)=>k+L.totalAmountLast12m,0),d=o.reduce((k,L)=>k+L.totalAmountLast12m,0),u=r.reduce((k,L)=>k+L.totalAmountLast12m,0),y=[...n,...o,...r],f=[...new Set(y.map(k=>k.areaCode).filter(Boolean))].sort(),g=[...new Set(y.map(k=>k.businessType).filter(Boolean))].sort(),$=new Map(t.map(k=>[k.customerCode,k])),P=t.filter(k=>k.actionedAt).length,_=new Map;t.forEach(k=>{k.reason&&_.set(k.reason,(_.get(k.reason)??0)+1)});const D=[..._.entries()].sort((k,L)=>L[1]-k[1]).slice(0,5).map(([k,L])=>`<span class="status-pill info" style="font-size:0.75rem;">${Do(k)} ${L}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${Ua(c)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${o.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${Ua(d)} 相当</div>
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

    ${D?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${D}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${l})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${o.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="declining">下落中 (${r.length})</button>
      <button class="button secondary small" type="button" id="churn-hide-actioned">対応済みを隠す</button>
      <select id="churn-filter-area" class="input-sm" style="margin-left:auto;">
        <option value="">エリア: すべて</option>
        ${f.map(k=>`<option value="${k}">${k}</option>`).join("")}
      </select>
      <select id="churn-filter-biz" class="input-sm">
        <option value="">業種: すべて</option>
        ${g.map(k=>`<option value="${k}">${k}</option>`).join("")}
      </select>
    </div>

    ${Aa("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,c,"状況",$)}
    ${Aa("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",o,d,"経過日数",$)}
    ${Aa("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",r,u,"前年同月比",$)}

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
    <\/script>`}const Fe=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Ya={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},ze={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function iu(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function lu(e){const t=e.reduce((l,c)=>l+c,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const o=Math.max(...e);return e.filter(l=>l>o*.1).length<=6?"seasonal":"year-round"}function cu(e){const t=e.reduce((l,c)=>l+c,0);if(t===0)return[];const o=t/12*1.5,r=[];for(let l=0;l<12;l++)e[l]>o&&r.push(l);if(r.length===0){const l=Math.max(...e);l>0&&r.push(e.indexOf(l))}return r.sort((l,c)=>l-c)}function du(e){return e.length===0?0:(e[0]-2+12)%12}function Zn(e){const t=new Date().getMonth(),n=e.map(r=>{const l=lu(r.monthlyQuantity),c=cu(r.monthlyQuantity),d=du(c);return{code:r.code,name:r.name,category:r.category,peakMonths:c,proposalStartMonth:d,seasonType:l,monthlyQuantity:r.monthlyQuantity}}),o=[];for(let r=0;r<12;r++){const l=n.filter(c=>{if(c.peakMonths.length===0)return!1;const d=c.proposalStartMonth,u=c.peakMonths[0];return d<=u?r>=d&&r<=u:r>=d||r<=u});o.push({month:r,products:l,targetCustomers:[]})}return{products:n,proposals:o,selectedMonth:t}}function pu(e){const{products:t,proposals:n,selectedMonth:o}=e,r=new Date().getMonth(),l={"year-round":[],seasonal:[],"year-end":[]};t.forEach(g=>l[g.seasonType].push(g));const c=n[o],d=t.length,u=c?.products.length??0,y=t.filter(g=>g.peakMonths.includes(o)).length,f=c?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${Fe[o]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${Fe[o]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${y}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${f}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${Fe.map((g,$)=>{const P=$===r,_=$===o;return`<button class="button" style="padding:4px 10px;background:${_?"#0F5B8D":P?"#e2e8f0":"transparent"};color:${_?"#fff":"#333"};border:${P&&!_?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${$}">${g}${P?" ●":""}</button>`}).join("")}
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
          ${uu(l,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${mu(l,o)}

  <!-- Target customer list for selected month -->
  ${yu(c)}
</div>`}function uu(e,t){const n=[],o=["year-round","seasonal","year-end"];for(const r of o){const l=e[r];if(l.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${ze[r]}15;color:${ze[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${Ya[r]}</span>
    </td></tr>`);for(const c of l){const d=Fe.map((u,y)=>{const f=c.peakMonths.includes(y),g=qo(c,y),$=y===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let P="transparent";f?P=ze[c.seasonType]:g&&(P=ze[c.seasonType]+"40");const _=f||g?`background:${P};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${$}"><div style="${_}" title="${f?"ピーク":g?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${c.name}"><span class="mono" style="font-size:0.7rem;color:#888">${c.code}</span> ${c.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${ze[c.seasonType]}15;color:${ze[c.seasonType]}">${Ya[c.seasonType]}</span></td>
        ${d}
      </tr>`)}}}return n.join("")}function qo(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,o=e.peakMonths[0];return n<=o?t>=n&&t<o:t>=n||t<o}function mu(e,t){const o=["year-round","seasonal","year-end"].map(r=>{const l=e[r];if(l.length===0)return"";const c=l.filter(u=>u.peakMonths.includes(t)||qo(u,t));if(c.length===0)return"";const d=c.map(u=>{const f=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',g=u.monthlyQuantity.reduce(($,P)=>$+P,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${f}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${g.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map($=>Fe[$]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${ze[r]}15;color:${ze[r]}">${Ya[r]}</span>
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
        <tbody>${d}</tbody>
      </table>
    </div>`}).filter(Boolean);return o.length===0?`<div style="padding:1rem;color:#666;text-align:center">${Fe[t]}に提案対象の商品はありません</div>`:o.join("")}function yu(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${iu(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const hu=["日","月","火","水","木","金","土"];function Yt(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${Math.round(e/1e3)}K`:`¥${e.toLocaleString()}`}function ot(e,t){if(t===0&&e===0)return'<span class="sc-yoy sc-yoy-flat">—</span>';if(t===0)return'<span class="sc-yoy sc-yoy-up">NEW</span>';const n=Math.round((e/t-1)*100);return n>0?`<span class="sc-yoy sc-yoy-up">+${n}%</span>`:n<0?`<span class="sc-yoy sc-yoy-down">${n}%</span>`:'<span class="sc-yoy sc-yoy-flat">±0%</span>'}function fn(e){return e?e.totalVolumes.reduce((t,n)=>t+n.bottles,0):0}function To(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n-1,1),r=new Date(t,n,0),l=[];for(let c=0;c<o.getDay();c++)l.push({outside:!0});for(let c=1;c<=r.getDate();c++)l.push({date:`${e}-${String(c).padStart(2,"0")}`});for(;l.length%7!==0;)l.push({outside:!0});return l}function es(e){const[t,n,o]=e.split("-").map(Number),l=new Date(t,n-1,o).getDay(),c=Math.ceil(o/7),u=new Date(t-1,n-1,1).getDay(),f=1+(l-u+7)%7+(c-1)*7,g=new Date(t-1,n,0).getDate();return f>g?"":`${t-1}-${String(n).padStart(2,"0")}-${String(f).padStart(2,"0")}`}function ts(e,t){const[n,o]=t.split("-").map(Number),r=new Date(n,o,0).getDate(),l=Array.from({length:7},()=>({count:0,amount:0,bottles:0,days:0}));for(let c=1;c<=r;c++){const d=`${t}-${String(c).padStart(2,"0")}`,u=new Date(n,o-1,c).getDay();l[u].days++;const y=e[d];y&&(l[u].count+=y.count,l[u].amount+=y.totalAmount,l[u].bottles+=fn(y))}return l}function gu(e,t){const n=[];for(let o=0;o<t.length;o+=7){const r=t.slice(o,o+7);let l=0,c=0,d=0,u=0;for(const y of r)if(y.date){u++;const f=e[y.date];f&&(l+=f.count,c+=f.totalAmount,d+=fn(f))}n.push({count:l,amount:c,bottles:d,days:u})}return n}function fu(e,t){const[n,o]=t.split("-").map(Number),r=`${n-1}-${String(o).padStart(2,"0")}`,l=To(r),c=[];for(let d=0;d<l.length;d+=7){const u=l.slice(d,d+7);let y=0,f=0,g=0,$=0;for(const P of u)if(P.date){$++;const _=e[P.date];_&&(y+=_.count,f+=_.totalAmount,g+=fn(_))}c.push({count:y,amount:f,bottles:g,days:$})}return c}function vu(e,t,n,o){const[r,l]=t.split("-").map(Number),c=new Date(r,l-2,1),d=new Date(r,l,1),u=`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,y=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,f=new Date().toISOString().slice(0,10),g=o??{},$=To(t),P=e?ts(e,t):null,_=`${r-1}-${String(l).padStart(2,"0")}`,D=o?ts(o,_):null,k=e?gu(e,$):null,L=o?fu(o,t):null;let s="";if(e===null)s='<div class="sc-loading" style="grid-column:1/-1;"><div class="loading-spinner"></div><p>読み込み中…</p></div>';else for(let x=0;x<$.length;x++){const w=$[x];if(w.outside)s+='<div class="sc-cell sc-outside"></div>';else{const S=w.date,C=Number(S.split("-")[2]),A=new Date(`${S}T00:00:00`).getDay(),T=e[S],N=S===f,R=S===n,M=g[es(S)],B=T?.totalAmount??0,j=M?.totalAmount??0;let z="",Y="",H="",G="";T&&(z=`<span class="sc-badge">${T.count}件</span>`,Y=`<div class="sc-day-amt">${Yt(B)}</div>`,G=T.cityGroups.slice(0,2).map(Q=>`<span class="sc-city-tag">${Q.city}<em>${Q.count}</em></span>`).join(""),T.cityGroups.length>2&&(G+=`<span class="sc-city-more">+${T.cityGroups.length-2}</span>`)),(B>0||j>0)&&(H=`<div class="sc-day-yoy">${ot(B,j)}</div>`),s+=`
          <div class="sc-cell ${N?"sc-today":""} ${R?"sc-selected":""} ${T?"sc-has-data":""}"
               data-sc-date="${S}">
            <div class="sc-day-header">
              <span class="sc-day-num ${A===0?"sc-sun":A===6?"sc-sat":""}">${C}</span>
              ${z}
            </div>
            ${Y}
            ${H}
            <div class="sc-cities">${G}</div>
          </div>`}if((x+1)%7===0&&k){const S=Math.floor(x/7),C=k[S],A=L?.[S],T=C.days>0?C.count/C.days:0,N=A?.amount??0;s+=`
          <div class="sc-cell sc-week-total">
            <div class="sc-wt-count">${C.count}<small>件</small></div>
            <div class="sc-wt-amount">${Yt(C.amount)}</div>
            <div class="sc-wt-bottles">${C.bottles}<small>本</small></div>
            <div class="sc-wt-avg">⌀${T.toFixed(1)}<small>件/日</small></div>
            ${C.amount>0||N>0?`<div class="sc-wt-yoy">${ot(C.amount,N)}</div>`:""}
          </div>`}}let i="";if(P){i=P.map((N,R)=>{const M=N.days>0?N.count/N.days:0,B=R===0?"sc-sun":R===6?"sc-sat":"",z=D?.[R]?.amount??0;return`<div class="sc-wd-summary ${B}">
        <span class="sc-wds-count">${N.count}<small>件</small></span>
        <span class="sc-wds-amt">${Yt(N.amount)}</span>
        <span class="sc-wds-bottles">${N.bottles}<small>本</small></span>
        <span class="sc-wds-avg">⌀${M.toFixed(1)}</span>
        ${N.amount>0||z>0?`<span class="sc-wds-yoy">${ot(N.amount,z)}</span>`:""}
      </div>`}).join("");const x=P.reduce((N,R)=>N+R.count,0),w=P.reduce((N,R)=>N+R.amount,0),S=P.reduce((N,R)=>N+R.bottles,0),C=P.reduce((N,R)=>N+R.days,0),A=C>0?x/C:0,T=D?D.reduce((N,R)=>N+R.amount,0):0;i+=`<div class="sc-wd-summary sc-wd-month-total">
      <span class="sc-wds-count">${x}<small>件</small></span>
      <span class="sc-wds-amt">${Yt(w)}</span>
      <span class="sc-wds-bottles">${S}<small>本</small></span>
      <span class="sc-wds-avg">⌀${A.toFixed(1)}</span>
      ${w>0||T>0?`<span class="sc-wds-yoy">${ot(w,T)}</span>`:""}
    </div>`}const p=n&&e?.[n]?wu(e[n],g[es(n)]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',m=Object.values(e??{}).reduce((x,w)=>x+w.count,0),h=Object.values(e??{}).reduce((x,w)=>x+w.totalAmount,0),b=Object.values(g).reduce((x,w)=>x+w.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${m>0?`月計: <strong>${m}件</strong> / <strong>¥${h.toLocaleString()}</strong> ${ot(h,b)}`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${u}">◀</button>
          <span class="sc-month-label">${r}年${l}月</span>
          <button class="sc-nav-btn" data-sc-ym="${y}">▶</button>
        </div>
        <div class="sc-unit-note">K=¥1,000 / M=¥1,000,000 ｜ 昨対: 前年同月 同週同曜日比</div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays-8">
            ${hu.map((x,w)=>`<div class="sc-weekday ${w===0?"sc-sun":w===6?"sc-sat":""}">${x}</div>`).join("")}
            <div class="sc-weekday sc-wk-header">週計</div>
          </div>

          ${i?`<div class="sc-wd-summary-row">${i}</div>`:""}

          <div class="sc-grid-8">
            ${s}
          </div>
        </div>

        <div class="sc-detail-col${n?" sc-detail-active":""}">
          ${p}
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
  `}function bu(e){return e.length?e.map(t=>`<span class="sc-vol-badge">${t.label}<em>${t.bottles}</em></span>`).join(""):""}function wu(e,t){const n=e.date.replace(/-/g,"/").slice(5),o=e.totalVolumes.length?`<div class="sc-day-volumes">${e.totalVolumes.map(y=>`<span class="sc-vol-tag">${y.label} <strong>${y.bottles}本</strong></span>`).join("")}</div>`:"",r=t?.totalAmount??0,l=t?.count??0,c=e.totalAmount>0||r>0?`<div class="sc-detail-yoy">
        前年同日: ${l}件 / ¥${r.toLocaleString()}
        ${ot(e.totalAmount,r)}
      </div>`:"",d={};for(const y of e.entries)(d[y.city]??=[]).push(y);const u=Object.entries(d).sort((y,f)=>f[1].length-y[1].length).map(([y,f])=>{const g=f.sort(($,P)=>P.amount-$.amount).map($=>`
          <div class="sc-customer-row">
            <div class="sc-customer-main">
              <span class="sc-customer-name" title="${$.customerName}">${$.customerName}</span>
              <span class="sc-customer-amt">${$.amount>0?`¥${$.amount.toLocaleString()}`:"-"}${$.invoiceCount>1?` (${$.invoiceCount}伝票)`:""}</span>
            </div>
            ${$.volumes.length?`<div class="sc-customer-vols">${bu($.volumes)}</div>`:""}
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${y}（${f.length}先）</div>
          ${g}
        </div>`}).join("");return`
    <p class="sc-detail-date">${n}の出荷</p>
    <p class="sc-detail-meta">${e.entries.length}先 ${e.count}伝票 / ¥${e.totalAmount.toLocaleString()}</p>
    ${c}
    ${o}
    ${u}
  `}const xu=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),La=["月","火","水","木","金"],as=6;function $u(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function _u(e,t){if(t.length===0)return 0;const n=[...t].sort((r,l)=>r-l);return n.filter(r=>r<=e).length/n.length}function Su(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function ns(e){const t=new Date,n=e.map(u=>u.annualRevenue),o=e.map(u=>{const y=$u(u.lastOrderDate,t);let f=0;const g=[];y>=60&&(f+=50,g.push("離反リスク")),u.hasSeasonalProposal&&(f+=30,g.push("季節提案タイミング")),y>=30&&y<60&&(f+=20,g.push("定期巡回"));const $=_u(u.annualRevenue,n),P=Math.round($*20);P>0&&(f+=P,g.push("金額ウェイト"));const _=Su(g,y);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:f,reasons:g,lastOrderDate:u.lastOrderDate,daysSinceOrder:y,annualRevenue:u.annualRevenue,recommendedAction:_}}).filter(u=>u.priorityScore>0).sort((u,y)=>y.priorityScore-u.priorityScore),r=new Map;for(const u of o){const y=u.areaCode||"その他";r.has(y)||r.set(y,[]),r.get(y).push(u)}const l=[...r.entries()].sort((u,y)=>y[1].reduce((f,g)=>f+g.priorityScore,0)-u[1].reduce((f,g)=>f+g.priorityScore,0)),c=[];let d=0;for(const[u,y]of l){const f=y.sort((g,$)=>$.priorityScore-g.priorityScore);for(let g=0;g<f.length&&!(d>=La.length);g+=as){const $=f.slice(g,g+as);c.push({dayLabel:La[d],area:u,visits:$}),d++}if(d>=La.length)break}return{candidates:o,weekPlan:c,filterArea:"",filterMinScore:0}}function ku(e){const{candidates:t,weekPlan:n,filterArea:o,filterMinScore:r}=e,l=t.filter(g=>!(o&&g.areaCode!==o||r>0&&g.priorityScore<r)),c=Array.from(new Set(t.map(g=>g.areaCode))).sort(),d=l.length,u=l.filter(g=>g.priorityScore>=50).length,y=l.filter(g=>g.reasons.includes("離反リスク")).length,f=n.reduce((g,$)=>g+$.visits.length,0);return`
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
        <div class="kpi-value">${y}</div>
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
            ${c.map(g=>`<option value="${g}"${o===g?" selected":""}>${g}</option>`).join("")}
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
      ${n.length===0?"<p>訪問候補がありません。</p>":Pu(n)}
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
            ${l.map(g=>Eu(g)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Pu(e){return`
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
  `}function Eu(e){return`
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
      <td class="numeric">${xu.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function Au(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},o=e.map(y=>{const f=y.capacity>0?Math.round(y.currentVolume/y.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${y.tankNo}</strong></td>
          <td class="numeric">${y.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${y.currentVolume>0?y.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${f}%"></div>
            </div>
            <span class="progress-label">${f}%</span>
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
      `}).join(""),r=e.filter(y=>y.status==="in_use").length,l=e.filter(y=>y.status==="aging").length,c=e.filter(y=>y.status==="empty").length,d=e.reduce((y,f)=>y+f.capacity,0),u=e.reduce((y,f)=>y+f.currentVolume,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>タンク管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${d.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">使用率 ${d>0?Math.round(u/d*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${r} 基</p>
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
  `}function Ca(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Lu(e){if(e.length===0)return`<section class="panel">
      <div class="panel-header">
        <div>
          <h2>移出量集計（販売実績ベース）</h2>
          <p class="panel-caption">当月の販売伝票から自動集計した移出量と概算税額</p>
        </div>
      </div>
      <p class="empty-message">データなし — 商品マスタに volume_ml が設定されていることを確認してください。</p>
    </section>`;const t=e.reduce((c,d)=>c+d.volumeSaleL,0),n=e.reduce((c,d)=>c+d.volumeReturnL,0),o=e.reduce((c,d)=>c+d.volumeNetL,0),r=e.reduce((c,d)=>c+d.taxAmount,0);return`<section class="panel">
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
        <tbody>${e.map(c=>{const d=c.alcDegree!==null?`${c.alcDegree}度`:'<span class="text-warning">未設定</span>',u=c.taxRatePerKl!==null?`${c.taxRatePerKl.toLocaleString("ja-JP")} 円/KL`:'<span class="text-warning">度数未設定</span>',y=c.taxRatePerKl!==null?`<strong>${c.taxAmount.toLocaleString("ja-JP")} 円</strong>`:'<span class="text-warning">—</span>';return`<tr>
      <td>${c.sakeType}</td>
      <td class="numeric">${d}</td>
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
            <th class="numeric">${o.toLocaleString("ja-JP",{maximumFractionDigits:3})}</th>
            <th></th>
            <th class="numeric"><strong>${r.toLocaleString("ja-JP")} 円</strong></th>
          </tr>
        </tfoot>
      </table>
    </div>
    <p class="form-hint" style="margin-top: 8px;">
      度数が「未設定」のリキュールは税額を計算できません。商品マスタの <code>alcohol_degree</code> を更新してください。
    </p>
  </section>`}function Cu(e,t,n,o=[]){const r=e.rows.map((f,g)=>`
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
        <td class="numeric"><strong>${Ca(f.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${g}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),l=e.deductions.map((f,g)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${g}" data-ded-field="type">
            ${Object.keys(Ra).map($=>`<option value="${$}" ${$===f.type?"selected":""}>${Ra[$]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${g}" data-ded-field="categoryCode">
            ${Fs.map($=>`<option value="${$.code}" ${$.code===f.categoryCode?"selected":""}>${$.code}:${$.name}</option>`).join("")}
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
    `).join(""),c=Array.from({length:12},(f,g)=>g+1),d=e.rows.reduce((f,g)=>f+g.exportDeduction+g.sampleDeduction,0),u=e.rows.reduce((f,g)=>f+g.productionVolume,0),y=u>0?d/u*100:0;return`
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
        <p class="kpi-value">${Ca(e.totalTax)}</p>
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
              <th class="numeric">${Ca(e.totalTax)}</th>
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

    ${Lu(o)}

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
  `}const vn=[{title:"販売業務",color:"#1a56db",features:[{id:"invoice-entry",route:"/invoice-entry",label:"伝票入力",desc:"売上・返品伝票の新規入力、明細追加",addedVersion:1},{id:"invoice-browse",route:"/invoice",label:"伝票照会",desc:"過去伝票の検索・表示・PDF出力",addedVersion:1},{id:"delivery-note",route:"/delivery",label:"納品書発行",desc:"納品書のPDFダウンロード・印刷",addedVersion:1},{id:"billing-monthly",route:"/billing",label:"月次請求",desc:"請求書発行・入金消込・未収管理",addedVersion:1},{id:"ledger-view",route:"/ledger",label:"得意先台帳",desc:"得意先別の取引履歴・残高確認",addedVersion:1},{id:"quote-create",route:"/quote",label:"見積作成",desc:"見積書の作成・PDF出力・メール送付",addedVersion:50},{id:"shipment-calendar",route:"/shipment-calendar",label:"配送カレンダー",desc:"伝票日付ベースの配送スケジュール確認",addedVersion:200}]},{title:"分析・レポート",color:"#7e3af2",features:[{id:"analytics-monthly",route:"/analytics",label:"月次売上グラフ",desc:"月次・商品別・得意先別の売上推移グラフ",addedVersion:1},{id:"analytics-volume",route:"/analytics",label:"移出量集計",desc:"商品・得意先別の移出量（mL）集計",addedVersion:320},{id:"customer-analysis",route:"/customer-analysis",label:"得意先分析",desc:"ABC分析・購買頻度・LTV",addedVersion:100},{id:"product-power",route:"/product-power",label:"商品力分析",desc:"商品別販売力・成長率",addedVersion:100},{id:"customer-efficiency",route:"/customer-efficiency",label:"営業効率",desc:"訪問コスト・粗利効率",addedVersion:150},{id:"report-aggregate",route:"/report",label:"集計帳票",desc:"各種集計レポートの出力",addedVersion:50},{id:"sales-list",route:"/sales",label:"売上一覧",desc:"売上明細の一覧表示・CSV出力",addedVersion:1}]},{title:"営業・顧客管理",color:"#0e9f6e",features:[{id:"churn-alert",route:"/churn-alert",label:"営業アクション",desc:"離反リスク検知・フォロー優先度",addedVersion:150},{id:"visit-planner",route:"/visit-planner",label:"訪問計画",desc:"訪問スケジュールの作成・管理",addedVersion:200},{id:"map-view",route:"/map",label:"取引先マップ",desc:"地図上で取引先の位置確認",addedVersion:100},{id:"prospects",route:"/prospects",label:"新規営業",desc:"新規開拓リストの進捗管理",addedVersion:100},{id:"email-broadcast",route:"/email",label:"メール配信",desc:"一斉メール配信・テンプレート管理",addedVersion:200},{id:"seasonal-calendar",route:"/seasonal-calendar",label:"季節提案",desc:"季節別提案スケジュール管理",addedVersion:250}]},{title:"受注・仕入",color:"#e3a008",features:[{id:"workflow-order",route:"/workflow",label:"受注ワークフロー",desc:"受注から出荷までのステータス管理",addedVersion:150},{id:"shopify-orders",route:"/shopify",label:"Shopify受注",desc:"EC受注の確認・取込",addedVersion:200},{id:"purchase-manage",route:"/purchase",label:"仕入・買掛",desc:"仕入管理・買掛金残高",addedVersion:100},{id:"payment-status",route:"/payment",label:"入金状況",desc:"入金・回収状況の一覧",addedVersion:1}]},{title:"製造管理",color:"#e02424",features:[{id:"jikomi-record",route:"/jikomi",label:"仕込管理",desc:"仕込帳・麹室・タンク仕込記録",addedVersion:200},{id:"tanks-manage",route:"/tanks",label:"タンク管理",desc:"タンク別在庫・ブレンド管理",addedVersion:200},{id:"tax-declaration",route:"/tax",label:"酒税申告書",desc:"課税移出・控除明細・eTax XML出力",addedVersion:250},{id:"tax-volume",route:"/tax",label:"移出量自動集計",desc:"販売伝票から清酒・リキュール別移出量を自動計算",addedVersion:322},{id:"demand-forecast",route:"/demand",label:"需要予測",desc:"過去実績ベースの需要予測",addedVersion:250},{id:"brewing-plan",route:"/brewing-plan",label:"醸造計画",desc:"年間醸造スケジュール管理",addedVersion:280},{id:"procurement-plan",route:"/procurement",label:"調達計画",desc:"原料米の調達・予算管理",addedVersion:280},{id:"brewing-process",route:"/brewing-process",label:"醸造工程",desc:"バッチ別工程管理・麹室制約チェック",addedVersion:300}]},{title:"マスタ・設定",color:"#6b7280",features:[{id:"master-products",route:"/master",label:"商品マスタ",desc:"商品情報の参照・編集",addedVersion:1},{id:"master-customers",route:"/master",label:"得意先マスタ",desc:"得意先情報の参照・編集",addedVersion:1},{id:"store-pos",route:"/store",label:"店舗販売",desc:"直売所のPOS・販売記録",addedVersion:250},{id:"tour-booking",route:"/tour",label:"酒蔵見学予約",desc:"見学予約の受付・管理",addedVersion:250},{id:"relay-status",route:"/setup",label:"連動状態",desc:"酒仙iとのリレー同期状態確認",addedVersion:1},{id:"csv-import",route:"/import",label:"CSV取込",desc:"マスタ・売上データのCSVインポート",addedVersion:100},{id:"user-manage",route:"/users",label:"ユーザー管理",desc:"アカウント・権限管理",addedVersion:100},{id:"url-share",route:"/",label:"URL共有",desc:"PWAモードでも全ページをURLで共有可能",addedVersion:322}]}];function ss(){return vn.flatMap(e=>e.features)}function Du(e,t){const n=Date.now()-2592e6;return vn.flatMap(o=>o.features).filter(o=>o.route===e).some(o=>{const r=t[o.id];return r?.confirmedAt!=null&&new Date(r.confirmedAt).getTime()>n})}function qu(e,t){const o=ss().filter(c=>e[c.id]?.confirmedAt).length,r=ss().length,l=vn.map(c=>{const d=c.features.map(y=>{const f=e[y.id],g=!!f?.confirmedAt,$=f?.confirmedAt?new Date(f.confirmedAt).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"}):"",P=f?.confirmedBy?`(${f.confirmedBy})`:"",_=g&&f?.confirmedAt?Date.now()-new Date(f.confirmedAt).getTime()<720*60*60*1e3:!1;return`
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
            ${g?`<span class="status-pill success">確認済 ${$} ${P}</span>`:'<span class="status-pill muted">未確認</span>'}
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
        <p class="kpi-value">${o} / ${r}</p>
        <p class="kpi-sub">${Math.round(o/r*100)}% 動作確認完了</p>
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

    ${l}
  `}const Tu={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let He=null,Iu=0;const Ja=[];function Nu(){return He&&document.body.contains(He)||(He=document.createElement("div"),He.className="toast-container",document.body.appendChild(He)),He}function F(e,t="success",n){const o=Nu(),r=++Iu,l=t==="error"?5e3:t==="warning"?4e3:3e3,c=document.createElement("div");c.className=`toast toast-${t}`,c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.innerHTML=`
    <span class="toast-icon">${Tu[t]}</span>
    <span class="toast-msg">${Ru(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const d={id:r,message:e,type:t,el:c};Ja.push(d),o.appendChild(c),requestAnimationFrame(()=>{c.classList.add("toast-enter")});const u=()=>Mu(d);c.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{c.classList.add("toast-exit"),c.addEventListener("animationend",u,{once:!0})},l)}function Mu(e){const t=Ja.indexOf(e);t!==-1&&(Ja.splice(t,1),e.el.remove())}function Ru(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ee(e,t={}){const{title:n="確認",confirmLabel:o="OK",cancelLabel:r="キャンセル",variant:l="primary"}=t;return new Promise(c=>{const d=document.createElement("div");d.className="modal-backdrop confirm-backdrop",d.setAttribute("role","dialog"),d.setAttribute("aria-modal","true"),d.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${l}">
            ${l==="danger"?Ou:Bu}
          </div>
          <h3 class="confirm-title">${Jt(n)}</h3>
          <p class="confirm-message">${Jt(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${Jt(r)}</button>
          <button class="button ${l} confirm-ok">${Jt(o)}</button>
        </div>
      </div>
    `;const u=f=>{d.classList.add("confirm-exit"),d.addEventListener("animationend",()=>{d.remove()},{once:!0}),c(f)};d.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),d.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),d.addEventListener("click",f=>{f.target===d&&u(!1)});const y=f=>{f.key==="Escape"&&(document.removeEventListener("keydown",y),u(!1))};document.addEventListener("keydown",y),document.body.appendChild(d),requestAnimationFrame(()=>{d.querySelector(".confirm-ok")?.focus()})})}const Ou=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,Bu=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function Jt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function os(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Ka(e,t,n){if(t.length===0&&(!n||n.length===0))return;const o=n&&n.length>0?n:Object.keys(t[0]??{}).map(y=>({key:y,label:y})),l=`\uFEFF${[o.map(y=>os(y.label)).join(","),...t.map(y=>o.map(f=>os(y[f.key])).join(","))].join(`\r
`)}`,c=new Blob([l],{type:"text/csv;charset=utf-8;"}),d=URL.createObjectURL(c),u=document.createElement("a");u.href=d,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(d),0)}const ju=Object.fromEntries(ua.map(e=>[e.value,e.label])),zu=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan","/procurement","/brewing-process","/changelog"];let lt=[];async function Fu(){const{supabaseQueryAll:e}=await I(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>ee);return{supabaseQueryAll:n}},void 0);lt=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const rs=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"},{path:"/procurement",title:"調達計画"},{path:"/brewing-process",title:"醸造工程"},{path:"/changelog",title:"機能一覧・更新履歴"}];function Io(e){const t=Ga[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function bn(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Vu(){const e=Io("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const ya=new Date,Uu=ya.toISOString().slice(0,7),Yu=ya.getFullYear(),Ju=ya.getMonth()+1,Ku=ya.toISOString().slice(0,10),Hu="C0011",Qe=Vu();function No(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return zu.includes(n)?n:"/"}function ha(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":case"/procurement":case"/brewing-process":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const is=No(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,systemHealth:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,analysisTab:"customer",analysisPeriod:"",invoiceForm:bn(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Uu,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Yu,taxMonth:Ju,taxVolume:null,featureStatuses:null,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],mapLoaded:!1,callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...cp,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...dp},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Ku,route:is,currentCategory:ha(is),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},invoiceSelectedDocNo:null,invoiceSelectedLines:null,ledgerCustomerCode:Hu,salesPeriod:"month",customRange:{start:"",end:""},quoteState:ia(Ba()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCustomerFilter:"",quoteCustomerFilterName:"",quoteCompanySettings:Ba(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyFiscalType:"jan",customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...un},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:Qe.mode,emailRegion:Qe.region,emailHistorySegment:Qe.historySegment,emailTemplateId:Qe.templateId,emailSubject:Qe.subject,emailBody:Qe.body,emailSaveMessage:Qe.saveMessage,emailSending:!1,demandForecast:{...Zl},shipmentCalendarData:null,shipmentCalendarPrevYearData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:ea(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:ut,empCapacity:mt},brewingSchedule:[],brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},riceVarieties:[],ricePurchaseCommitments:[],procurementDecisions:{},brewingBatches:[],brewingProcessSteps:[],bpExpandedBatchId:"",bpShowNewForm:!1,bpWorkerSettings:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},bpStepLabor:[],bpTanks:[],globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function ls(e){return e.slice(0,10)}function Qu(e){return{...e}}function ca(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Mo(){a.invoiceForm=bn(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},ca()}function Ro(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,o)=>{n.productCode.trim()||(t[`lines.${o}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${o}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${o}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${o}.unitPrice`]="単価は0円以上で入力してください。")}),t}function Wu(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,Qu(t))}function Gu(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((o,r)=>{const l=r===0?1:2,c=1200*(r+1);return{productCode:o.code,productName:o.name,quantity:l,unitPrice:c,unit:"本",amount:l*c}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function Xu(e){const t=a.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Zu(e){const t=a.masterStats?.customers.find(n=>n.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function Oo(e){if(Ne(e),a.invoiceErrors=Ro(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){E();return}a.invoiceSaving=!0,E(),ks(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=bn(),E()}).catch(()=>{a.invoiceSaving=!1,E()})}function Bo(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((o,r)=>new Date(r.date).getTime()-new Date(o.date).getTime()).filter(o=>{const r=new Date(o.date);return!(t&&r<t||n&&r>n)})}function jo(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?lt:lt.filter(e=>e.area===a.emailRegion);case"history":return lt.filter(e=>e.historySegment===a.emailHistorySegment);default:return lt}}function em(){const e=jo();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function Da(e){const t=jo(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(o=>o.email),status:e}}function wn(){return a.user,!1}function At(){a.globalSearchOpen=!1,a.globalQuery=""}function tm(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:rs.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:rs}}function am(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?Bo(a.salesSummary):[]).map(o=>({documentNo:o.documentNo,date:o.date,customerCode:o.customerCode,customerName:o.customerName,amount:o.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((o,r)=>r.balanceAmount-o.balanceAmount).map(o=>({...o})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(o=>({...o})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(o=>({...o})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(o=>({...o})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(o=>({...o})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(o=>({...o}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(o=>({...o}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Ka(n,e,t)}function rt(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=ha(e),a.sidebarOpen=!1,e==="/customer-analysis"&&(a.analysisTab="customer"),e!=="/quote"&&(a.quoteCustomerFilter="",a.quoteCustomerFilterName=""),At(),Lt(e)}function ta(e){const t=a.demandAnalysis,n=a.safetyStockParams;if(!t||n.length===0)return[];const[o,r]=e.split("-"),l=`${parseInt(o)-1}-${r}`,c=t.months.filter(d=>d<e).slice(-3);return n.map(d=>{const u=d.productionType==="make_to_order",y=t.matrix[d.productCode]?.[l]??0,f=c.map(D=>t.matrix[d.productCode]?.[D]??0),g=f.length>0?f.reduce((D,k)=>D+k,0)/f.length:d.avgMonthlyDemand,$=u?0:y>0?Math.ceil(y):Math.ceil(g),P=u?0:Math.ceil(d.safetyStockQty),_=Math.max(0,$+P);return{id:"",yearMonth:e,productCode:d.productCode,productName:d.productName,demandForecast:$,safetyStockTarget:P,openingStock:0,requiredProduction:_,plannedQty:u?0:_,actualQty:0,status:"draft",productionType:d.productionType??"monthly",notes:""}})}async function Lt(e){a.actionLoading=!0,E();try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,E(),a.quoteList=await oa(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:t}=await I(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>O);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await Et(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await en());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await tn(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await I(async()=>{const{fetchShipmentCalendar:u}=await Promise.resolve().then(()=>O);return{fetchShipmentCalendar:u}},void 0),n=a.shipmentCalendarYearMonth,[o,r]=n.split("-").map(Number),l=`${o-1}-${String(r).padStart(2,"0")}`,[c,d]=await Promise.all([t(n),t(l)]);a.shipmentCalendarData=c,a.shipmentCalendarPrevYearData=d;break}case"/billing":a.billingSummary||(a.billingSummary=await an(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Ps());break;case"/product-power":case"/product-abc":rt("/customer-analysis"),a.analysisTab="product";return;case"/customer-efficiency":a.customerEfficiency=await it(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);break;case"/customer-analysis":await Promise.all([Cs(a.analysisPeriod).then(t=>{a.customerAnalysis=t}),Ds(a.analysisPeriod).then(t=>{a.productABC=t})]);break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await I(async()=>{const{fetchDemandForecasts:l,fetchDeliverySchedule:c}=await Promise.resolve().then(()=>O);return{fetchDemandForecasts:l,fetchDeliverySchedule:c}},void 0),[o,r]=await Promise.all([t(),n()]);a.demandForecast.forecasts=o.map(l=>({code:l.productCode,name:l.productName,segment:l.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(l.avgMonthly),adjustedAvg:Math.round(l.avgMonthly),nextMonthForecast:Math.round(l.forecastQuantity),annualForecast:Math.round(l.avgMonthly*12),safetyStock:Math.round(l.safetyStock)})),a.demandForecast.deliveries=ec(r)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:n}=await I(async()=>{const{fetchChurnAlerts:o,fetchChurnNotes:r}=await Promise.resolve().then(()=>O);return{fetchChurnAlerts:o,fetchChurnNotes:r}},void 0);if(!a.churnAlert){const o=await t();a.churnAlert=nu(o)}a.churnNotes=await n();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await I(async()=>{const{fetchProductShipmentsFromTable:o}=await Promise.resolve().then(()=>O);return{fetchProductShipmentsFromTable:o}},void 0),n=await t();if(n.length>0)a.seasonalCalendar=Zn(n.map(o=>({code:o.code,name:o.name,category:"",monthlyQuantity:o.monthlyQuantity})));else{const{fetchProductMonthlyShipments:o}=await I(async()=>{const{fetchProductMonthlyShipments:l}=await Promise.resolve().then(()=>O);return{fetchProductMonthlyShipments:l}},void 0),r=await o();a.seasonalCalendar=Zn(r.map(l=>({code:l.code,name:l.name,category:"",monthlyQuantity:l.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:t}=await I(async()=>{const{fetchVisitPriorities:o}=await Promise.resolve().then(()=>O);return{fetchVisitPriorities:o}},void 0),n=await t();if(n.length>0)a.visitPlanner={candidates:n.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address:o.address,areaCode:o.area_code,businessType:o.business_type,priorityScore:o.priority_score,reasons:o.reasons,lastOrderDate:o.last_order_date,daysSinceOrder:o.days_since_order,annualRevenue:o.annual_revenue,recommendedAction:o.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=ns(n.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address1:o.address,areaCode:o.area_code,businessType:o.business_type,annualRevenue:o.annual_revenue,lastOrderDate:o.last_order_date,hasSeasonalProposal:o.reasons.some(r=>r.includes("季節"))})));else{const{supabaseQueryAll:o}=await I(async()=>{const{supabaseQueryAll:u}=await Promise.resolve().then(()=>ee);return{supabaseQueryAll:u}},void 0),[r,l]=await Promise.all([o("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):Xa().then(u=>u.customers)]),c=a.masterStats?.customers??l,d=new Map;r.forEach(u=>{const y=u.legacy_customer_code||"",f=u.sales_date||"",g=Number(u.total_amount)||0,$=d.get(y);!$||f>$.lastDate?d.set(y,{lastDate:f,total:($?.total??0)+g}):$.total+=g}),a.visitPlanner=ns(c.filter(u=>u.isActive).map(u=>({code:u.code,name:u.name,phone:u.phone,address1:u.address1,areaCode:u.areaCode,businessType:u.businessType,annualRevenue:d.get(u.code)?.total??0,lastOrderDate:d.get(u.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:n,fetchProductionPlan:o,fetchLabelExclusions:r}=await I(async()=>{const{fetchDemandAnalysis:c,fetchSafetyStockParams:d,fetchProductionPlan:u,fetchLabelExclusions:y}=await Promise.resolve().then(()=>O);return{fetchDemandAnalysis:c,fetchSafetyStockParams:d,fetchProductionPlan:u,fetchLabelExclusions:y}},void 0);if(!a.demandAnalysis){const[c,d]=await Promise.all([t(a.demandYearsBack*12).catch(u=>(console.error("fetchDemandAnalysis failed:",u),null)),n().catch(u=>(console.error("fetchSafetyStockParams failed:",u),[]))]);c&&(a.demandAnalysis=c),a.safetyStockParams=d}if(a.productionPlan.length===0){const c=await o(a.demandPlanYearMonth).catch(()=>[]);c.length>0?a.productionPlan=c:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=ta(a.demandPlanYearMonth))}const l=await r(a.demandPlanYearMonth).catch(()=>[]);if(a.calendarLabelExcluded=new Set(l),a.productionPlan.length>0){const c=a.productionPlan.filter(d=>!a.calendarLabelExcluded.has(d.productCode));Ie(a.calendarShifts,c,a.calendarCapacity)}break}case"/procurement":case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:n,fetchBrewingSchedule:o,fetchBrewingProductDetail:r,fetchBrewingCustomCategories:l,fetchBrewingCategoryOverrides:c,fetchAllBrewingStockEntries:d,fetchCategoryTypeLinks:u,fetchAvailableProductionTypes:y,fetchBrewingAlcoholSettings:f,fetchBrewingYearlyShipments:g,fetchBrewingSeasonalPattern:$,fetchBrewingForecastOverrides:P,fetchBrewingRiceParams:_,fetchRiceVarieties:D,fetchRicePurchaseCommitments:k,fetchProcurementDecisions:L}=await I(async()=>{const{fetchBrewingPlanSummary:G,fetchBrewingMonthlyTrend:Q,fetchBrewingSchedule:J,fetchBrewingProductDetail:Z,fetchBrewingCustomCategories:ae,fetchBrewingCategoryOverrides:ie,fetchAllBrewingStockEntries:V,fetchCategoryTypeLinks:K,fetchAvailableProductionTypes:W,fetchBrewingAlcoholSettings:ne,fetchBrewingYearlyShipments:we,fetchBrewingSeasonalPattern:ye,fetchBrewingForecastOverrides:xe,fetchBrewingRiceParams:Oe,fetchRiceVarieties:ga,fetchRicePurchaseCommitments:Tt,fetchProcurementDecisions:Vo}=await Promise.resolve().then(()=>O);return{fetchBrewingPlanSummary:G,fetchBrewingMonthlyTrend:Q,fetchBrewingSchedule:J,fetchBrewingProductDetail:Z,fetchBrewingCustomCategories:ae,fetchBrewingCategoryOverrides:ie,fetchAllBrewingStockEntries:V,fetchCategoryTypeLinks:K,fetchAvailableProductionTypes:W,fetchBrewingAlcoholSettings:ne,fetchBrewingYearlyShipments:we,fetchBrewingSeasonalPattern:ye,fetchBrewingForecastOverrides:xe,fetchBrewingRiceParams:Oe,fetchRiceVarieties:ga,fetchRicePurchaseCommitments:Tt,fetchProcurementDecisions:Vo}},void 0),s=a.brewingPlanFY,i=`${s}-10-01`,p=`${s+1}-09-30`,[m,h,b,x,w,S,C,A,T,N,R,M,B,j,z,Y,H]=await Promise.all([t(i,p).catch(()=>[]),n(i,p).catch(()=>[]),o(s).catch(()=>[]),r(i,p).catch(()=>[]),l().catch(()=>[]),c().catch(()=>({})),d().catch(()=>[]),u().catch(()=>({})),y().catch(()=>[]),f().catch(()=>({})),g().catch(()=>[]),$().catch(()=>[]),P().catch(()=>({})),_().catch(()=>({})),D().catch(()=>[]),k(s).catch(()=>[]),L(s).catch(()=>({}))]);a.brewingPlanData=m,a.brewingMonthlyTrend=h,a.brewingSchedule=b,a.brewingProductDetail=x,a.brewingCustomCategories=w,a.brewingOverrides=S,a.brewingStockEntries=C,a.brewingTypeLinks=A,a.brewingAvailableTypes=T,a.brewingYearlyShipments=R,a.brewingSeasonalPattern=M,a.brewingForecastOverrides=B,a.brewingRiceParams=j,a.riceVarieties=z,a.ricePurchaseCommitments=Y,a.procurementDecisions=H,a.brewingAlcoholSettings=N;break}case"/brewing-process":{const{fetchBrewingBatches:t,fetchBrewingProcessSteps:n,fetchBrewingCustomCategories:o,fetchBrewingSchedule:r,fetchWorkerSettings:l,fetchStepLabor:c,fetchBrewingRiceParams:d,fetchTanks:u}=await I(async()=>{const{fetchBrewingBatches:L,fetchBrewingProcessSteps:s,fetchBrewingCustomCategories:i,fetchBrewingSchedule:p,fetchWorkerSettings:m,fetchStepLabor:h,fetchBrewingRiceParams:b,fetchTanks:x}=await Promise.resolve().then(()=>O);return{fetchBrewingBatches:L,fetchBrewingProcessSteps:s,fetchBrewingCustomCategories:i,fetchBrewingSchedule:p,fetchWorkerSettings:m,fetchStepLabor:h,fetchBrewingRiceParams:b,fetchTanks:x}},void 0),y=a.brewingPlanFY,[f,g,$,P,_,D,k]=await Promise.all([t(y).catch(()=>[]),o().catch(()=>[]),r(y).catch(()=>[]),l().catch(()=>({workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1})),c().catch(()=>[]),d().catch(()=>({})),u().catch(()=>[])]);a.brewingBatches=f,a.brewingSchedule=$,a.bpWorkerSettings=P,a.bpStepLabor=_,a.brewingRiceParams=D,a.bpTanks=k,f.length>0?a.brewingProcessSteps=await n(f.map(L=>L.id)).catch(()=>[]):a.brewingProcessSteps=[],a.brewingCustomCategories=g;break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await Is());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Ns());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await Ms());break;case"/materials":a.materialList.length===0&&(a.materialList=await Rs());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Os(),Bs()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([js(),zs()]));break;case"/tax":(!a.taxDeclaration||!a.taxVolume)&&([a.taxDeclaration,a.taxVolume]=await Promise.all([on(a.taxYear,a.taxMonth),rn(a.taxYear,a.taxMonth)]));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([ln(a.storeSalesDate),Us()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await I(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>O);return{fetchMailSenders:n}},void 0);if(a.mailSenders=await t(),!a.emailSenderId||!a.mailSenders.find(n=>n.id===a.emailSenderId)){const n=a.mailSenders.find(o=>o.isDefault)??a.mailSenders[0];n&&(a.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await I(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>O);return{fetchCalendarEvents:n}},void 0);a.calendarEvents=await t(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await I(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>O);return{fetchIntegrationSettings:n}},void 0);a.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchShopifyOrders:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>O);return{fetchShopifyOrders:o,fetchIntegrationSettings:r}},void 0);a.shopifyOrders=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchFaxInbox:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>O);return{fetchFaxInbox:o,fetchIntegrationSettings:r}},void 0);a.faxRecords=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/ledger":a.customerLedger=await Za(a.ledgerCustomerCode);break;case"/setup":[a.syncDashboard,a.systemHealth]=await Promise.all([ws(),xs()]);break;case"/raw-browser":a.rawTableList.length===0&&(a.rawTableList=await Zs());break;case"/users":{const{fetchUserProfiles:t}=await I(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>O);return{fetchUserProfiles:n}},void 0);a.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:o}=await I(async()=>{const{fetchMyProfile:l,fetchAuditLogs:c,fetchMailSenders:d}=await Promise.resolve().then(()=>O);return{fetchMyProfile:l,fetchAuditLogs:c,fetchMailSenders:d}},void 0),r=a.user?.email??a.myProfile?.email??"";r&&(a.myProfile=await t(r)),a.mailSenders.length===0&&(a.mailSenders=await o()),a.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await I(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>O);return{fetchAuditLogs:n}},void 0);a.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await I(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>O);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:n}=await I(async()=>{const{fetchMapCustomers:l,fetchDeliveryLocations:c}=await Promise.resolve().then(()=>O);return{fetchMapCustomers:l,fetchDeliveryLocations:c}},void 0),[o,r]=await Promise.all([t(),n()]);a.mapCustomers=o,a.deliveryLocations=r,a.mapLoaded=!0}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchCallLogs:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>O);return{fetchCallLogs:o,fetchIntegrationSettings:r}},void 0);a.callLogs=await t(100),a.integrations.length===0&&(a.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await I(async()=>{const{fetchLeadLists:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>O);return{fetchLeadLists:o,fetchIntegrationSettings:r}},void 0);a.leadLists=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await I(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>O);return{fetchWorkflowOrdersFromDb:n}},void 0);a.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await I(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>O);return{fetchTourInquiriesFromDb:n}},void 0);a.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:o}=await I(async()=>{const{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:c}=await Promise.resolve().then(()=>O);return{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:c}},void 0);a.slackRules=await t(),a.slackLogs=await n(50),a.integrations.length===0&&(a.integrations=await o())}break;case"/changelog":a.featureStatuses||(a.featureStatuses=await ra());break;case"/":a.featureStatuses||(a.featureStatuses=await ra());break;default:break}}catch(t){console.error("Route data load error:",e,t),F(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{a.actionLoading=!1,E()}}function cs(){if(wn())return Yc(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return It("sales");case"/cat/brewery":return It("brewery");case"/cat/purchase":return It("purchase");case"/cat/more":return It("more");case"/invoice-entry":return fc(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/quote":return a.quoteEditId===null?_c(a.quoteList,a.quoteListLoading,a.quoteCustomerFilter,a.quoteCustomerFilterName):yo(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return kc(a.quoteCompanySettings);case"/email":return mc(em());case"/delivery":return a.deliveryNote?pc(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return vu(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate,a.shipmentCalendarPrevYearData);case"/billing":return a.billingSummary?Jl(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?Ad(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return Tc(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return Ic(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType);case"/customer-analysis":return a.customerAnalysis?bd(a.customerAnalysis,a.productABC,a.analysisTab,a.analysisPeriod):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return sc(a.demandForecast);case"/demand":return Cp(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return Bp(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/procurement":{const e={};if(a.brewingYearlyShipments.length>0){const t=new Date,n=t.getMonth()+1,o=n>=10?t.getFullYear():t.getFullYear()-1,r=[...new Set(a.brewingYearlyShipments.map(u=>u.fy))].filter(u=>u<o).sort(),l=new Map;for(const u of a.brewingSeasonalPattern)l.has(u.brewCategory)||l.set(u.brewCategory,new Map),l.get(u.brewCategory).set(u.monthNum,u.avgMonthlyL);const c=[];for(let u=n;u<=9;u++)c.push(u);if(n>=10)for(let u=1;u<=9;u++)c.push(u);const d=new Map;for(const u of a.brewingYearlyShipments)d.has(u.brewCategory)||d.set(u.brewCategory,new Map),d.get(u.brewCategory).set(u.fy,{shipL:u.shipmentL,annualL:u.annualizedL});for(const[u,y]of d){const f=r.filter(h=>y.has(h)).map(h=>y.get(h).shipL);let g=0;if(f.length>=2){const h=[];for(let b=1;b<f.length;b++)f[b-1]>0&&h.push((f[b]-f[b-1])/f[b-1]);g=h.length>0?h.reduce((b,x)=>b+x,0)/h.length:0}const $=u in a.brewingForecastOverrides?a.brewingForecastOverrides[u]:g,P=f.length>0?f[f.length-1]:y.get(o)?.annualL??0,_=l.get(u)??new Map,D=c.reduce((h,b)=>h+(_.get(b)??0),0),k=a.brewingStockEntries.filter(h=>h.brewCategory===u).reduce((h,b)=>h+b.volumeL,0),L=a.brewingAlcoholSettings[u],s=L&&L.targetAlcoholPct>0?L.rawAlcoholPct/L.targetAlcoholPct:1,i=Math.round(k*s),p=Math.max(0,i-Math.round(D)),m=Math.round(P*(1+$));e[u]=Math.max(0,m-p)}}return Fp(e,a.brewingRiceParams,a.brewingCustomCategories,a.brewingSchedule,a.brewingPlanFY,a.riceVarieties,a.ricePurchaseCommitments,a.procurementDecisions)}case"/churn-alert":return a.churnAlert?ru(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?pu(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?ku(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/brewing-process":{const e=[...new Set(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール",...a.brewingCustomCategories.map(t=>t.name)])];return tu(a.brewingBatches,a.brewingProcessSteps,e,{expandedBatchId:a.bpExpandedBatchId,showNewForm:a.bpShowNewForm,schedule:a.brewingSchedule.map(t=>({brewCategory:t.brewCategory,fy:t.fy,brewMonth:t.brewMonth,durationMonths:t.durationMonths,plannedVolumeL:t.plannedVolumeL})),fy:a.brewingPlanFY,workerSettings:a.bpWorkerSettings,stepLabor:a.bpStepLabor,tanks:a.bpTanks.map(t=>({id:t.id,tankNo:t.tankNo,capacityL:t.capacityL,tankType:t.tankType,preferredCategories:t.preferredCategories,cleanupDays:t.cleanupDays}))})}case"/jikomi":return a.jikomiView==="calendar"?`${Mn(a.jikomiList,a.jikomiView)}${Fc(a.jikomiList)}`:Mn(a.jikomiList,a.jikomiView);case"/tanks":return Au(a.tankList);case"/kentei":return Vc(a.kenteiList);case"/materials":return nd(a.materialList)+ad(a.materialEditing,a.materialEditingIsNew);case"/purchase":return ld(a.purchaseList,a.payableList);case"/raw-material":return cd(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Cu(a.taxDeclaration,a.taxYear,a.taxMonth,a.taxVolume??[]):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return qd(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?md(a.pipelineMeta,fe,ce,a.syncDashboard,a.systemHealth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return bp(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return Id(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return yp(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return Md(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapLoaded?a.mapCustomers.length===0?`<section class="page-head"><div><p class="eyebrow">取引先マップ</p><h1>取引先マップ</h1></div></section>
          <section class="panel">
            <div style="padding:32px;text-align:center;color:var(--text-secondary)">
              <p style="font-size:1.5rem;margin-bottom:8px">📍</p>
              <p style="font-weight:600;margin-bottom:4px">緯度・経度データがありません</p>
              <p style="font-size:0.875rem">得意先マスタにジオコーディングが必要です。<br>relay フォルダの <code>geocode_customers.py</code> を実行してください。</p>
            </div>
          </section>`:Rd(a.mapCustomers,a.deliveryLocations,a.mapFilters):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>';case"/workflow":return jd(a.workflowOrders);case"/mobile-order":return zd(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return Vd(a.tourInquiries,a.tourActiveId);case"/mail-senders":return Jd(a.mailSenders,a.mailSenderEditingId);case"/calendar":return Kd(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return Qd(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return Wd(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return Gd(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/changelog":{const e=a.myProfile?.name??a.myProfile?.email??"不明";return a.featureStatuses!==null?qu(a.featureStatuses,e):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">読み込み中…</p></div></section>'}case"/users":return Xd(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return Zd(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return ep(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return tp(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return op(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return rp(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return lp(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.salesAnalytics)return"";switch(a.route){case"/sales":return Cd(Bo(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/payment":return rd([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return td(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return Mc(a.invoiceRecords,a.invoiceFilter,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/ledger":return Gl(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return $o(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return sm();default:return ic(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function nm(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(r=>!a.dismissedAnnouncements.has(r.id)).map(r=>{const l=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${l.bg};border-bottom:2px solid ${l.border};">
        <span class="announcement-text">${l.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),o=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+o}function sm(){const e=a.featureStatuses??{};function t(o,r,l,c){const d=`${"/".replace(/\/$/,"")||"/"}${o}`,u=Du(o,e);return`<a href="${d}" data-link="${o}" class="home-card">
      <span class="home-card-icon">${r}</span>
      <span class="home-card-label">${l}${u?' <span class="badge-new">NEW</span>':""}</span>
      <span class="home-card-desc">${c}</span>
    </a>`}const n=[{title:"販売業務",color:"#1a56db",cards:[t("/invoice-entry","📝","伝票入力","売上・返品を入力"),t("/quote","📄","見積作成","見積書の作成・管理"),t("/invoice","🔍","伝票照会","過去伝票の照会"),t("/delivery","🚚","納品書","納品書の発行"),t("/billing","💳","月次請求","請求書・入金管理"),t("/ledger","📒","得意先台帳","取引履歴の確認")].join("")},{title:"分析・レポート",color:"#7e3af2",cards:[t("/analytics","📊","売上分析","期間・商品・得意先別"),t("/customer-analysis","👥","ABC分析","得意先・商品 ABC分析"),t("/customer-efficiency","⚡","営業効率","訪問効率・コスト"),t("/report","📈","集計帳票","各種集計帳票"),t("/sales","📋","売上一覧","売上明細一覧")].join("")},{title:"営業・顧客管理",color:"#0e9f6e",cards:[t("/churn-alert","🎯","営業アクション","離反リスク・フォロー"),t("/visit-planner","📅","訪問計画","訪問スケジュール"),t("/shipment-calendar","🚚","配送カレンダー","伝票日付で配送を確認"),t("/map","🗺️","取引先マップ","地図で取引先を確認"),t("/prospects","🌱","新規営業","新規開拓の進捗"),t("/email","✉️","メール配信","一斉メール配信"),t("/seasonal-calendar","🌸","季節提案","季節別提案管理")].join("")},{title:"受注・仕入",color:"#e3a008",cards:[t("/workflow","🔄","受注ワークフロー","受注から出荷まで"),t("/shopify","🛒","Shopify注文","EC受注の確認"),t("/purchase","📥","仕入・買掛","仕入管理・買掛金"),t("/payment","💰","入金状況","入金・回収状況")].join("")},{title:"製造管理",color:"#e02424",cards:[t("/jikomi","🍶","仕込管理","仕込帳・製造記録"),t("/tanks","🛢️","タンク管理","タンク在庫の管理"),t("/tax","📋","酒税申告","酒税申告書の作成"),t("/demand","📆","需要・生産計画","需要予測・生産計画"),t("/brewing-plan","🗓️","醸造計画","年間醸造スケジュール"),t("/procurement","🌾","調達計画","原料米の調達・予算"),t("/brewing-process","🍶","醸造工程","バッチ別の醸造工程管理")].join("")},{title:"マスタ・設定",color:"#6b7280",cards:[t("/master","⚙️","マスタ管理","商品・得意先マスタ"),t("/store","🏪","店舗・直売所","直売所の販売管理"),t("/tour","🏯","酒蔵見学","見学予約の管理"),t("/setup","🔗","連動設定","酒仙iとの連動"),t("/import","📤","データ取込","CSVデータ取込"),t("/users","👤","ユーザー管理","アカウント管理"),t("/changelog","✅","機能一覧・更新履歴","動作確認チェック・バージョン管理")].join("")}];return`
    <div class="home-page">
      <div class="home-welcome">
        <p class="home-welcome-date">${new Date().toLocaleDateString("ja-JP",{year:"numeric",month:"long",day:"numeric",weekday:"long"})}</p>
        <h2 class="home-welcome-title">何をしますか？</h2>
      </div>
      ${n.map(o=>`
        <div class="home-section">
          <h3 class="home-section-title" style="--section-color:${o.color}">
            <span class="home-section-bar"></span>${o.title}
          </h3>
          <div class="home-card-grid">${o.cards}</div>
        </div>
      `).join("")}
    </div>
  `}function om(){const e=a.route,t=ha(e),o=[{key:"sales",icon:"💼",label:"売上管理",items:[{path:"/invoice-entry",label:"伝票入力"},{path:"/invoice",label:"伝票照会"},{path:"/ledger",label:"得意先台帳"},{path:"/sales",label:"売上一覧"},{path:"/payment",label:"入金状況"},{path:"/billing",label:"月次請求"},{path:"/delivery",label:"納品書"},{path:"/report",label:"集計帳票"}]},{key:"analytics",icon:"📊",label:"分析",items:[{path:"/analytics",label:"売上分析"},{path:"/customer-analysis",label:"ABC分析"},{path:"/customer-efficiency",label:"営業効率"}]},{key:"crm",icon:"🤝",label:"CRM・営業",items:[{path:"/churn-alert",label:"営業アクション"},{path:"/map",label:"取引先マップ"},{path:"/visit-planner",label:"訪問計画"},{path:"/prospects",label:"新規営業"},{path:"/calls",label:"通話履歴"}]},{key:"brewery",icon:"🍶",label:"醸造管理",items:[{path:"/jikomi",label:"仕込管理"},{path:"/tanks",label:"タンク管理"},{path:"/brewing-plan",label:"醸造計画"},{path:"/brewing-process",label:"醸造工程"},{path:"/tax",label:"酒税申告"},{path:"/demand",label:"需要・生産計画"}]},{key:"master",icon:"🗂",label:"マスタ・帳票",items:[{path:"/master",label:"マスタ管理"},{path:"/store",label:"店舗・直売所"},{path:"/print",label:"印刷センター"},{path:"/calendar",label:"カレンダー"},{path:"/tour",label:"酒蔵見学"}]},{key:"settings",icon:"⚙",label:"設定",items:[{path:"/setup",label:"連動設定"},{path:"/integrations",label:"外部連携"},{path:"/users",label:"ユーザー管理"},{path:"/import",label:"データ取込"}]}].map(l=>{const c=l.key===t,d=l.items.map(u=>`<a href="${u.path}" data-link="${u.path}" class="snav-sub${e===u.path?" active":""}">${u.label}</a>`).join("");return`<div class="snav-group${c?" open":""}">
      <button class="snav-group-btn" type="button" data-snav-group="${l.key}">
        <span>${l.icon}</span><span class="snav-group-label">${l.label}</span><span class="snav-arrow">›</span>
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
        ${o}
        <a href="/changelog" data-link="/changelog" class="snav-home${e==="/changelog"?" active":""}">📋 機能一覧</a>
      </div>
      <div class="snav-footer">
        <a href="/profile" data-link="/profile" class="snav-profile">${a.user?.email??"👤 プロフィール"}</a>
      </div>
    </aside>
    ${r}
  `}function rm(){if(wn())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${cs()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/procurement":"調達計画","/brewing-process":"醸造工程","/changelog":"機能一覧・更新履歴","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",o=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?hc(a.masterStats.customers,a.pickerQuery):id(a.masterStats.products,a.pickerQuery):"",r=a.globalSearchOpen?yc(a.globalQuery,tm()):"",l=a.user?`<span class="app-header-user">${a.user.email}</span>
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
          ${l}
        </div>
      </header>
      ${nm()}
      <div class="shell-body">
        ${om()}
        <main class="main-v2">
          <div class="view ${a.actionLoading?"is-busy":""}">${cs()}</div>
          <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
        </main>
      </div>
      ${o}
      ${r}
    </div>
  `}async function im(){a.actionLoading=!0,E();try{const{fetchSalesSummary:e}=await I(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>O);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,E()}}async function lm(e){a.actionLoading=!0,E();try{a.invoiceRecords=await Et(e)}finally{a.actionLoading=!1,E()}}async function qa(e){a.actionLoading=!0,E();try{a.customerLedger=await Za(e)}finally{a.actionLoading=!1,E()}}function Ne(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,n)=>{const o=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:o,unitPrice:r,amount:o*r}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function We(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function cm(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,E()}),e.querySelectorAll("[data-action='global-search-close']").forEach(s=>{s.addEventListener("click",i=>{s.classList.contains("global-search")&&i.target instanceof HTMLElement&&!i.target.classList.contains("global-search")||(At(),E())})}),e.querySelector("#global-search-input")?.addEventListener("input",s=>{a.globalQuery=s.target.value,E()}),e.querySelectorAll("[data-action='global-nav']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.path;i&&(At(),rt(i))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{am()}),e.querySelectorAll("[data-jikomi-tab]").forEach(s=>{s.addEventListener("click",()=>{a.jikomiView=s.dataset.jikomiTab,E()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const s=e.querySelector("#auth-email")?.value.trim()??"",i=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,E(),Ho(s,i).then(async p=>{a.user=p,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:h}=await I(async()=>{const{fetchMyProfile:b,recordAudit:x}=await Promise.resolve().then(()=>O);return{fetchMyProfile:b,recordAudit:x}},void 0);a.myProfile=await m(p.email),await h({action:"sign_in",userEmail:p.email}),E()}).catch(async p=>{try{const m=await $n(s,i);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:h}=await I(async()=>{const{fetchMyProfile:b}=await Promise.resolve().then(()=>O);return{fetchMyProfile:b}},void 0);a.myProfile=await h(m.email)}catch{a.authError=p instanceof Error?p.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,E()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,E()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{Qo().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,E()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(s=>{s.addEventListener("click",()=>{a.sidebarOpen=!1,E()})}),e.querySelectorAll("[data-snav-group]").forEach(s=>{s.addEventListener("click",()=>{s.closest(".snav-group")?.classList.toggle("open")})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let s=0;t.addEventListener("touchstart",i=>{s=i.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",i=>{i.changedTouches[0].clientX-s<-60&&(a.sidebarOpen=!1,E())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.id??"";a.dismissedAnnouncements.add(i),E()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='share-page']")?.addEventListener("click",async()=>{const s=window.location.href,i=document.title;if(navigator.share)try{await navigator.share({url:s,title:i})}catch{}else try{await navigator.clipboard.writeText(s),F("URLをコピーしました","success")}catch{F("コピーに失敗しました","error")}}),e.querySelectorAll("[data-link]").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault(),rt(s.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async s=>{s.preventDefault();const i=e.querySelector("#fr-title")?.value??"",p=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",h=e.querySelector("#fr-result");if(!i.trim())return;const b=await Es(i,p,m);if(h&&(h.textContent=b?"送信しました":"送信に失敗しました",h.className=`fr-result ${b?"success":"error"}`),b){const x=e.querySelector("#feature-request-form");x&&x.reset()}}),e.querySelectorAll("[data-period]").forEach(s=>{s.addEventListener("click",()=>{a.salesPeriod=s.dataset.period,E()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const s=e.querySelector("#range-start")?.value??"",i=e.querySelector("#range-end")?.value??"";s&&i&&(a.customRange={start:s,end:i},a.salesPeriod="custom",E())}),e.querySelectorAll("[data-edit-customer]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.editCustomer??"",p=a.masterStats?.customers.find(h=>h.id===i);if(!p)return;const m=document.createElement("div");m.innerHTML=Jc(p),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),x=document.getElementById("ec-trade-type")?.value||null,w=await As(i,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,trade_type:x,manual_override:!0});b&&(b.textContent=w?"保存しました":"保存に失敗",b.className=`fr-result ${w?"success":"error"}`),w&&(document.getElementById("edit-modal")?.remove(),ct())})})}),e.querySelectorAll("[data-edit-product]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.editProduct??"",p=a.masterStats?.products.find(h=>h.id===i);if(!p)return;const m=document.createElement("div");m.innerHTML=Kc(p),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),x=await Ls(i,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});b&&(b.textContent=x?"保存しました":"保存に失敗",b.className=`fr-result ${x?"success":"error"}`),x&&(document.getElementById("edit-modal")?.remove(),ct())})})}),e.querySelectorAll("[data-view-customer-quotes]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.viewCustomerQuotes??"",p=s.dataset.customerName??"";a.quoteCustomerFilter=i,a.quoteCustomerFilterName=p,a.quoteEditId=null,a.quoteList.length===0?(a.quoteListLoading=!0,rt("/quote"),a.quoteList=await oa(),a.quoteListLoading=!1):rt("/quote"),E()})}),e.querySelector("[data-action='quote-clear-filter']")?.addEventListener("click",()=>{a.quoteCustomerFilter="",a.quoteCustomerFilterName="",E()}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=ia(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,E()}),e.querySelectorAll("[data-open-quote]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.openQuote,p=await to(i);if(!p){F("見積の読み込みに失敗しました","error");return}a.quoteState={id:p.id,quoteNo:p.quote_no,quoteDate:p.quote_date,validUntil:p.valid_until??"",customerCode:p.legacy_customer_code??"",customerName:p.customer_name,customerAddress:p.customer_address,subject:p.subject,lines:p.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:p.remarks,taxRate:p.tax_rate,deliveryDate:p.delivery_date,paymentTerms:p.payment_terms,deliveryPlace:p.delivery_place,templateType:p.template_type??"sake",previewMode:!1},a.quoteEditId=i,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,E()})}),e.querySelectorAll("[data-delete-quote]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.deleteQuote,p=s.dataset.quoteNo??i;if(!await Ee(`見積 ${p} を削除しますか？`))return;await ps("quotes",i)?(a.quoteList=a.quoteList.filter(b=>b.id!==i),F("削除しました","success"),E()):F("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,E(),oa().then(s=>{a.quoteList=s,a.quoteListLoading=!1,E()})}),e.querySelectorAll("[name='q-template']").forEach(s=>{s.addEventListener("change",()=>{a.quoteState.templateType=s.value,E()})});function n(s){return(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function o(s){return s.length?s.map(i=>`<button class="search-item" type="button" data-select-customer="${n(i.code)}" data-cust-name="${n(i.name)}" data-cust-addr="${n(i.address1||"")}"><span class="mono">${n(i.code)}</span><span style="font-size:13px;font-weight:600;">${n(i.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function r(s){s.querySelectorAll("[data-select-customer]").forEach(i=>{i.addEventListener("click",async()=>{const p=i.dataset.selectCustomer??"";a.quoteState.customerCode=p,a.quoteState.customerName=i.dataset.custName??"",a.quoteState.customerAddress=i.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),s.remove(),a.quotePricing=await Ma(a.masterStats?.customers??[],p),E()})})}function l(s){const i=e.querySelector("#q-cust-search")?.closest(".form-row");if(!i)return;let p=document.getElementById("cust-search-results");p||(p=document.createElement("div"),p.id="cust-search-results",p.className="search-results",i.after(p));const m=a.masterStats?.customers??[],h=s.trim().toLowerCase(),b=h.length===0?m:m.filter(x=>x.name.includes(s)||x.kanaName.includes(s)||x.code.includes(s)||x.name.toLowerCase().includes(h)||x.kanaName.toLowerCase().includes(h));p.innerHTML=o(b),r(p)}function c(s,i){return s.length?s.map(p=>{const m=i?nn(p,i):{price:p.salePrice||0,label:"卸価格"},h=p.listPrice||0,b=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${n(p.code)}" data-prod-name="${n(p.name)}" data-prod-price="${m.price}" data-prod-retail="${h}" data-prod-jan="${n(p.janCode??"")}" data-prod-unit="${n(p.unit)}" data-prod-case="${p.caseQty??""}"><span class="mono">${n(p.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${n(p.name)}</span><span class="numeric"${b?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${n(m.label)})</small>${h?`　定価 ¥${h.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function d(s){s.querySelectorAll("[data-add-product]").forEach(i=>{i.addEventListener("click",()=>{const p=i.dataset.addProduct??"",m=i.dataset.prodName??"",h=parseInt(i.dataset.prodPrice??"0"),b=parseInt(i.dataset.prodRetail??"0")||null,x=i.dataset.prodJan??"",w=i.dataset.prodUnit||"本",S=i.dataset.prodCase??"",C=S?parseInt(S):null;a.quoteState.lines.push({productCode:p,productName:m,janCode:x,caseQty:C,quantity:1,unit:w,unitPrice:h,retailPrice:b,amount:h}),a.quoteProductQuery="";const A=e.querySelector("#q-prod-search");A&&(A.value=""),E()})})}function u(s){const i=e.querySelector("#q-prod-search")?.closest(".form-row");if(!i)return;let p=document.getElementById("prod-search-results");if(p||(p=document.createElement("div"),p.id="prod-search-results",p.className="search-results",i.after(p)),!a.masterStats){p.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,h=s.trim().toLowerCase(),b=h.length===0?m:m.filter(x=>x.name.includes(s)||x.kanaName.includes(s)||x.code.includes(s)||x.name.toLowerCase().includes(h)||x.kanaName.toLowerCase().includes(h));p.innerHTML=c(b,a.quotePricing),d(p)}function y(s,i){let p=null;function m(){p||(p=h=>{const b=document.getElementById(i);if(!b){document.removeEventListener("touchstart",p),document.removeEventListener("mousedown",p),p=null;return}s.contains(h.target)||b.contains(h.target)||(b.remove(),document.removeEventListener("touchstart",p),document.removeEventListener("mousedown",p),p=null)},document.addEventListener("touchstart",p,{passive:!0}),document.addEventListener("mousedown",p))}return m}(function(){const s=e.querySelector("#q-cust-search");if(!s)return;const i=y(s,"cust-search-results");s.addEventListener("focus",()=>{l(s.value),i()}),s.addEventListener("compositionend",()=>{a.quoteCustomerQuery=s.value,l(s.value)}),s.addEventListener("input",p=>{p.isComposing||(a.quoteCustomerQuery=s.value,l(s.value))}),s.value&&l(s.value)})(),(function(){const s=e.querySelector("#q-prod-search");if(!s)return;const i=y(s,"prod-search-results");s.addEventListener("focus",()=>{u(s.value),i()}),s.addEventListener("compositionend",()=>{a.quoteProductQuery=s.value,u(s.value)}),s.addEventListener("input",p=>{p.isComposing||(a.quoteProductQuery=s.value,u(s.value))}),s.value&&u(s.value)})(),e.querySelectorAll("[data-select-customer]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.selectCustomer??"";a.quoteState.customerCode=i,a.quoteState.customerName=s.dataset.custName??"",a.quoteState.customerAddress=s.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await Ma(a.masterStats?.customers??[],i),E()})}),e.querySelector("#q-price-type")?.addEventListener("change",s=>{const i=s.target.value;a.quoteState.manualPriceType=i,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:i}:a.quotePricing={priceType:i,priceGroup:"",individualPrices:new Map},E()}),e.querySelectorAll("[data-add-product]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.addProduct??"",p=s.dataset.prodName??"",m=parseInt(s.dataset.prodPrice??"0"),h=parseInt(s.dataset.prodRetail??"0")||null,b=s.dataset.prodJan??"",x=s.dataset.prodUnit||"本",w=s.dataset.prodCase??"",S=w?parseInt(w):null;a.quoteState.lines.push({productCode:i,productName:p,janCode:b,caseQty:S,quantity:1,unit:x,unitPrice:m,retailPrice:h,amount:m}),a.quoteProductQuery="",E()})}),(()=>{const s=e.querySelector("#q-prospect-search");if(!s)return;const i=y(s,"q-prospect-results");function p(m){let h=document.getElementById("q-prospect-results");if(!h)return;const b=m.trim(),x=b.length===0?a.prospects.slice(0,8):a.prospects.filter(w=>w.companyName.includes(b)||(w.contactName??"").includes(b)).slice(0,8);if(x.length===0){h.innerHTML="";return}h.className="search-results",h.innerHTML=x.map(w=>`<button class="search-item" type="button" data-select-prospect="${w.id}" data-prospect-name="${n(w.companyName)}" data-prospect-addr="${n(w.address??"")}"><span style="font-size:13px;font-weight:600;">${n(w.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${n(w.contactName??"")} ${w.address?"· "+w.address.slice(0,20):""}</span></button>`).join(""),h.querySelectorAll("[data-select-prospect]").forEach(w=>{w.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=w.dataset.prospectName??"",a.quoteState.customerAddress=w.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=w.dataset.selectProspect??"";const S=a.quoteState.manualPriceType??"";a.quotePricing={priceType:S,priceGroup:"",individualPrices:new Map},s.value="",h&&(h.innerHTML=""),E()})})}s.addEventListener("focus",()=>{p(s.value),i()}),s.addEventListener("input",m=>{m.isComposing||p(s.value)}),s.addEventListener("compositionend",()=>p(s.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const s=e.querySelector("#q-prospect-search")?.value.trim()??"",i=document.createElement("div");i.className="modal-backdrop",i.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",i.innerHTML=`
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
    `,document.body.appendChild(i),i.querySelector("#pq-company")?.focus();const p=()=>i.remove();i.addEventListener("click",m=>{m.target===i&&p()}),i.querySelector("#prospect-quick-close")?.addEventListener("click",p),i.querySelector("#prospect-quick-close2")?.addEventListener("click",p),i.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const m=(i.querySelector("#pq-company")?.value??"").trim();if(!m){F("会社名は必須です","warning");return}const h={id:crypto.randomUUID(),companyName:m,contactName:i.querySelector("#pq-contact")?.value.trim()||void 0,address:i.querySelector("#pq-address")?.value.trim()||void 0,phone:i.querySelector("#pq-phone")?.value.trim()||void 0,note:i.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:b,fetchProspects:x}=await I(async()=>{const{saveProspect:C,fetchProspects:A}=await Promise.resolve().then(()=>O);return{saveProspect:C,fetchProspects:A}},void 0),w=await b(h);if(!w){F("登録失敗","error");return}a.prospects=await x(),a.quoteState.customerCode="",a.quoteState.customerName=w.companyName,a.quoteState.customerAddress=w.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=w.id;const S=a.quoteState.manualPriceType??"";a.quotePricing={priceType:S,priceGroup:"",individualPrices:new Map},p(),F(`${w.companyName} を見込み顧客として登録しました`,"success"),E()})});function f(){Ot(a.quoteState);const s=e.querySelector("#q-preview-scaler");if(!s)return;s.innerHTML=yo(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const i=s.querySelector(".q-preview-doc"),p=s.parentElement?.clientWidth??0,m=i?.offsetWidth??0;if(p>0&&m>0&&m>p-24){const h=(p-24)/m;s.style.transform=`scale(${h})`,s.style.transformOrigin="top left",s.style.height=`${((i?.offsetHeight??0)+48)*h}px`}else s.style.transform="",s.style.height=""}for(const s of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${s}`)?.addEventListener("input",f);e.querySelector("#q-remarks")?.addEventListener("input",f),e.querySelectorAll(".qty-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[i];p&&(p.quantity=parseFloat(s.value)||0,p.amount=p.quantity*p.unitPrice,f())})}),e.querySelectorAll(".price-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[i];p&&(p.unitPrice=parseInt(s.value)||0,p.amount=p.quantity*p.unitPrice,f())})}),e.querySelectorAll(".jan-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[i];p&&(p.janCode=s.value,f())})}),e.querySelectorAll(".case-qty-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[i];p&&(p.caseQty=s.value?parseInt(s.value):null,f())})}),e.querySelectorAll(".retail-price-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),p=a.quoteState.lines[i];p&&(p.retailPrice=s.value?parseInt(s.value):null,f())})}),e.querySelectorAll("[data-remove-line]").forEach(s=>{s.addEventListener("click",()=>{const i=parseInt(s.dataset.removeLine??"0");a.quoteState.lines.splice(i,1),E()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{Ot(a.quoteState),a.quoteState.previewMode=!0,E()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,E()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="生成中…",a.quoteState.previewMode||Ot(a.quoteState);try{await Lc(a.quoteState,a.quoteCompanySettings)}finally{i.disabled=!1,i.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{Ot(a.quoteState);const s=a.quoteState,i=s.lines.reduce((w,S)=>w+S.amount,0),p=Math.round(i*s.taxRate/100),m=i+p;if(!s.quoteNo)try{const{supabaseRpc:w}=await I(async()=>{const{supabaseRpc:C}=await Promise.resolve().then(()=>ee);return{supabaseRpc:C}},void 0),S=await w("generate_quote_no",{});s.quoteNo=S??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{s.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const h=new Date().toISOString().slice(0,10),b=s.templateType==="sake"||s.templateType==="standard"?s.templateType:"sake",x={quote_no:s.quoteNo,quote_date:s.quoteDate||h,valid_until:s.validUntil||null,legacy_customer_code:s.customerCode||null,customer_name:s.customerName||"",customer_address:s.customerAddress||"",subject:s.subject||"",template_type:b,subtotal:i,tax_amount:p,total_amount:m,tax_rate:s.taxRate||10,remarks:s.remarks||"",delivery_date:s.deliveryDate||"",payment_terms:s.paymentTerms||"",delivery_place:s.deliveryPlace||"",updated_at:new Date().toISOString()};try{let w=s.id;if(s.id){const S=await fetch(`${fe}/rest/v1/quotes?id=eq.${encodeURIComponent(s.id)}`,{method:"PATCH",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(x)});if(!S.ok){const C=await S.text();throw new Error(`quotes更新失敗 ${S.status}: ${C}`)}await fetch(`${fe}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(s.id)}`,{method:"DELETE",headers:{apikey:ce,Authorization:`Bearer ${ce}`}})}else{const S=await fetch(`${fe}/rest/v1/quotes`,{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(x)});if(!S.ok){const A=await S.text();throw new Error(`quotes作成失敗 ${S.status}: ${A}`)}const C=await S.json();if(!C?.[0]?.id)throw new Error("IDが返りませんでした");w=C[0].id,s.id=w}if(s.lines.length>0){const S=s.lines.map((A,T)=>({quote_id:w,line_no:T+1,legacy_product_code:A.productCode||null,product_name:A.productName,jan_code:A.janCode||null,case_qty:A.caseQty??null,quantity:A.quantity,unit:A.unit,unit_price:A.unitPrice,retail_price:A.retailPrice??null,amount:A.amount})),C=await fetch(`${fe}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:ce,Authorization:`Bearer ${ce}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(S)});if(!C.ok){const A=await C.text();throw new Error(`明細保存失敗 ${C.status}: ${A}`)}}F(`見積 ${s.quoteNo} を保存しました`,"success"),E()}catch(w){console.error("[save-quote]",w),F(`保存失敗: ${String(w).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const s=p=>document.getElementById(p)?.value??"",i={...a.quoteCompanySettings,companyName:s("qs-company-name"),companyPostal:s("qs-company-postal"),companyAddress1:s("qs-company-addr1"),companyAddress2:s("qs-company-addr2"),companyTel:s("qs-company-tel"),companyFax:s("qs-company-fax"),companyEmail:s("qs-company-email"),companyRegistrationNo:s("qs-company-regno"),bankName:s("qs-bank-name"),bankBranch:s("qs-bank-branch"),bankAccountType:s("qs-bank-type"),bankAccountNo:s("qs-bank-no"),bankAccountHolder:s("qs-bank-holder"),defaultPaymentTerms:s("qs-payment-terms"),defaultHeaderNote:s("qs-header-note"),defaultFooterNote:s("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};Xe(i),st("quote_company",i),a.quoteCompanySettings=i,F("設定を保存しました","success"),E()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),E()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",s=>{const i=s.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},Xe(a.quoteCompanySettings),E()}),e.querySelector("#qs-seal-file")?.addEventListener("change",s=>{const i=s.target.files?.[0];if(!i)return;const p=new FileReader;p.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:p.result},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),E()},p.readAsDataURL(i)}),e.querySelector("#qs-seal-size")?.addEventListener("input",s=>{const i=parseInt(s.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:i},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),E()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),E()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.month;i&&(a.demandForecast.calendarMonth=i,E())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.segment;a.demandForecast.selectedSegment=i,E()})}),e.querySelectorAll("[data-demand-tab]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.demandTab;if(i){if(a.demandTab=i,i==="calendar"){const p=new Date().toISOString().slice(0,10);p.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=p)}E()}})}),e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async s=>{const i=parseInt(s.target.value)||3;a.demandYearsBack=i,a.demandAnalysis=null;const{fetchDemandAnalysis:p}=await I(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>O);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await p(i*12),E()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",p=parseInt(s.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,b=p/30,x=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),w=Math.ceil(m.avgMonthlyDemand*b+x);return{...m,leadTimeDays:p,safetyStockQty:x,reorderPoint:w}}),E()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",p=parseFloat(s.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=p>=.99?2.33:p>=.97?1.88:p>=.95?1.65:p>=.9?1.28:1.04,b=m.leadTimeDays/30,x=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),w=Math.ceil(m.avgMonthlyDemand*b+x);return{...m,serviceLevel:p,safetyStockQty:x,reorderPoint:w}}),E()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async s=>{if(a.safetyStockParams.length===0)return;const i=s.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveSafetyStockParamsBulk:p}=await I(async()=>{const{saveSafetyStockParamsBulk:h}=await Promise.resolve().then(()=>O);return{saveSafetyStockParamsBulk:h}},void 0),m=await p(a.safetyStockParams);i.disabled=!1,i.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const s=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),i=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(p=>{const m=s>=.99?2.33:s>=.97?1.88:s>=.95?1.65:s>=.9?1.28:1.04,h=i/30,b=Math.ceil(m*p.demandStdDev*Math.sqrt(h)),x=Math.ceil(p.avgMonthlyDemand*h+b);return{...p,serviceLevel:s,leadTimeDays:i,safetyStockQty:b,reorderPoint:x}}),E()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",p=s.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===i?{...m,productionType:p}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async s=>{const i=s.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarShifts=ea(i,1,0);const{fetchProductionPlan:p}=await I(async()=>{const{fetchProductionPlan:h}=await Promise.resolve().then(()=>O);return{fetchProductionPlan:h}},void 0),m=await p(i);a.productionPlan=m.length>0?m:ta(i),Ie(a.calendarShifts,a.productionPlan.filter(h=>!a.calendarLabelExcluded.has(h.productCode)),a.calendarCapacity),E()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(s=>{s.addEventListener("click",()=>{a.demandPlanTypeFilter=s.dataset.filter??"all",E()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.sortCol??"";a.demandSort?.column===i?a.demandSort=a.demandSort.dir==="desc"?{column:i,dir:"asc"}:null:a.demandSort={column:i,dir:"desc"},E()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=ta(a.demandPlanYearMonth),E()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",s=>{const i=s.target.files?.[0];if(!i)return;const p=new FileReader;p.onload=async()=>{const{parseCSV:m}=await I(async()=>{const{parseCSV:R}=await Promise.resolve().then(()=>fp);return{parseCSV:R}},void 0),{columns:h,rows:b}=m(p.result),x=document.getElementById("csv-import-status"),w=h.find(R=>/商品コード|product_code|code|コード/i.test(R)),S=h.find(R=>/在庫|stock|期首|opening/i.test(R)),C=h.find(R=>/計画|plan|planned|生産/i.test(R));if(!w){x&&(x.style.display="block",x.style.background="rgba(197,61,61,0.1)",x.style.color="#c53d3d",x.textContent=`エラー: 商品コード列が見つかりません。列名: ${h.join(", ")}`);return}let A=0,T=0,N=0;for(const R of b){const M=(R[w]??"").trim();if(!M)continue;const B=a.productionPlan.find(j=>j.productCode===M);if(B){if(A++,S&&R[S]!==void 0&&R[S]!==""){const j=parseFloat(R[S])||0;B.openingStock=j,B.requiredProduction=Math.max(0,B.demandForecast+B.safetyStockTarget-j),B.plannedQty>0&&!C&&(B.plannedQty=B.requiredProduction),T++}C&&R[C]!==void 0&&R[C]!==""&&(B.plannedQty=parseFloat(R[C])||0,N++)}}x&&(x.style.display="block",A===0?(x.style.background="rgba(183,121,31,0.1)",x.style.color="#b7791f",x.textContent=`一致する商品コードが見つかりませんでした（CSV: ${b.length}行）`):(x.style.background="rgba(47,133,90,0.1)",x.style.color="#2f855a",x.textContent=`${A}商品に反映: 在庫${T}件${N>0?` / 計画${N}件`:""} 更新`),setTimeout(()=>{x.style.display="none"},5e3)),E()},p.readAsText(i,"UTF-8"),s.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(p=>{const m=p.dataset.code??"",h=a.productionPlan.find(b=>b.productCode===m);h&&(h.plannedQty=parseFloat(p.value)||0)}),e.querySelectorAll("[data-action='plan-actual-qty']").forEach(p=>{const m=p.dataset.code??"",h=a.productionPlan.find(b=>b.productCode===m);h&&(h.actualQty=parseFloat(p.value)||0,h.actualQty>0&&(h.status="actual"))});const{saveProductionPlan:s}=await I(async()=>{const{saveProductionPlan:p}=await Promise.resolve().then(()=>O);return{saveProductionPlan:p}},void 0);await Promise.all(a.productionPlan.map(p=>s(p)));const{fetchProductionPlan:i}=await I(async()=>{const{fetchProductionPlan:p}=await Promise.resolve().then(()=>O);return{fetchProductionPlan:p}},void 0);a.productionPlan=await i(a.demandPlanYearMonth),F("保存しました"),E()}),e.querySelector("[data-action='plan-print']")?.addEventListener("click",()=>{const s=e.querySelector("[data-action='plan-save']")?.closest("section.panel"),i=e.querySelector("[data-action='cal-toggle-day']")?.closest("section.panel"),p=(s?.outerHTML??"")+(i?.outerHTML??""),m=a.demandPlanYearMonth.replace("-","年")+"月",h=window.open("","_blank");h&&(h.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
      <title>生産計画 ${m}</title>
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
    </head><body><h1 style="font-size:16px;margin-bottom:12px;">生産計画 — ${m}</h1>${p}</body></html>`),h.document.close(),setTimeout(()=>{h.print()},300))}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.date??"",p=a.calendarShifts.find(m=>m.date===i);p&&(a.calendarSelectedDate===i?a.calendarSelectedDate=null:p.confirmed?a.calendarSelectedDate=i:p.partTimers>0||p.employees>0?(p.partTimers=0,p.employees=0,Ie(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=i):(p.partTimers=1,p.employees=0,Ie(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=i),E())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveLabelExclusions:p}=await I(async()=>{const{saveLabelExclusions:b}=await Promise.resolve().then(()=>O);return{saveLabelExclusions:b}},void 0),m=[...a.calendarLabelExcluded],h=await p(a.demandPlanYearMonth,m);i.disabled=!1,i.textContent=h?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",m=document.getElementById("cal-label-list")?.scrollTop??0;s.checked?a.calendarLabelExcluded.delete(i):a.calendarLabelExcluded.add(i);const h=a.productionPlan.filter(b=>!a.calendarLabelExcluded.has(b.productCode));Ie(a.calendarShifts,h,a.calendarCapacity),E(),requestAnimationFrame(()=>{const b=document.getElementById("cal-label-list");b&&(b.scrollTop=m)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.type??"",m=document.getElementById("cal-label-list")?.scrollTop??0,h=a.productionPlan.filter(x=>x.productionType===i);if(s.checked)for(const x of h)a.calendarLabelExcluded.delete(x.productCode);else for(const x of h)a.calendarLabelExcluded.add(x.productCode);const b=a.productionPlan.filter(x=>!a.calendarLabelExcluded.has(x.productCode));Ie(a.calendarShifts,b,a.calendarCapacity),E(),requestAnimationFrame(()=>{const x=document.getElementById("cal-label-list");x&&(x.scrollTop=m)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||ut;a.calendarCapacity.partCapacity=i;const p=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ie(a.calendarShifts,p,a.calendarCapacity),E()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||mt;a.calendarCapacity.empCapacity=i;const p=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ie(a.calendarShifts,p,a.calendarCapacity),E()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.date??"",p=parseInt(s.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.partTimers=p),E()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.date??"",p=parseInt(s.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.employees=p),E()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async s=>{const i=s.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarSelectedDate=null,a.calendarShifts=ea(i,1,0);const{fetchProductionPlan:p,fetchLabelExclusions:m}=await I(async()=>{const{fetchProductionPlan:x,fetchLabelExclusions:w}=await Promise.resolve().then(()=>O);return{fetchProductionPlan:x,fetchLabelExclusions:w}},void 0),[h,b]=await Promise.all([p(i),m(i)]);a.productionPlan=h.length>0?h:ta(i),a.calendarLabelExcluded=new Set(b),Ie(a.calendarShifts,a.productionPlan.filter(x=>!a.calendarLabelExcluded.has(x.productCode)),a.calendarCapacity),E()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||0;a.calendarDefaultPart=i;for(const p of a.calendarShifts)if(!p.confirmed){const m=new Date(p.date).getDay()===0||new Date(p.date).getDay()===6;p.partTimers=m?0:i}E()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||0;a.calendarDefaultEmp=i;for(const p of a.calendarShifts)if(!p.confirmed){const m=new Date(p.date).getDay()===0||new Date(p.date).getDay()===6;p.employees=m?0:i}E()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=ea(a.demandPlanYearMonth,1,0),Ie(a.calendarShifts,a.productionPlan.filter(s=>!a.calendarLabelExcluded.has(s.productCode)),a.calendarCapacity),E()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const s of a.calendarShifts)s.confirmed=!0;E()}),e.querySelectorAll("[data-action='select-month']").forEach(s=>{s.addEventListener("click",()=>{const i=parseInt(s.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=i,E())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",s=>{a.visitPlanner&&(a.visitPlanner.filterArea=s.target.value,E())}),e.querySelector("#visit-filter-score")?.addEventListener("change",s=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(s.target.value)||0,E())}),e.querySelector("[data-action='refresh-analytics']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="更新中…";try{const{supabaseRpc:p}=await I(async()=>{const{supabaseRpc:m}=await Promise.resolve().then(()=>ee);return{supabaseRpc:m}},void 0);await p("refresh_analytics",{}),a.visitPlanner=null,a.shipmentCalendarData=null,F("分析データを更新しました","success"),E()}catch(p){console.error("[refresh-analytics]",p),F("更新に失敗しました","error"),i.disabled=!1,i.textContent="⟳ データ更新"}}),e.querySelectorAll("[data-sort-col]").forEach(s=>{s.addEventListener("click",i=>{const p=s.dataset.sortCol??"",m=i.shiftKey;a.route==="/product-power"?a.productSortState=yt(a.productSortState,p,m):a.route==="/customer-efficiency"?a.customerSortState=yt(a.customerSortState,p,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=yt(a.dashboardSortState,p,m):a.route==="/master"?a.masterSortState=yt(a.masterSortState,p,m):a.route==="/analytics"&&(a.analyticsSortState=yt(a.analyticsSortState,p,m)),E()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(s=>{s.addEventListener("click",async()=>{const i=parseInt(s.dataset.year??"",10);i&&(a.customerEfficiencyYear=i,a.customerEfficiency=await it(i,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),E())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async s=>{const i=parseInt(s.target.value,10);i&&(a.customerEfficiencyYear=i,a.customerEfficiency=await it(i,a.customerEfficiencyGroupBy,a.customerEfficiencyFiscalType),E())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.groupby??"billing";a.customerEfficiencyGroupBy=i,a.customerEfficiency=await it(a.customerEfficiencyYear,i,a.customerEfficiencyFiscalType),E()})}),e.querySelectorAll("[data-action='efficiency-fiscal-type']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.fiscalType??"jan";a.customerEfficiencyFiscalType=i,a.customerEfficiency=await it(a.customerEfficiencyYear,a.customerEfficiencyGroupBy,i),E()})}),e.querySelectorAll("[data-product-period]").forEach(s=>{s.addEventListener("click",()=>{a.productPeriod=s.dataset.productPeriod??"year",E()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const s=document.getElementById("pp-range-start")?.value??"",i=document.getElementById("pp-range-end")?.value??"";s&&i&&(a.productCustomStart=s,a.productCustomEnd=i,a.productPeriod="custom",E())}),e.querySelectorAll("[data-product-filter]").forEach(s=>{s.addEventListener("click",()=>{a.productFilter=s.dataset.productFilter??"all",E()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="更新中…",await ct(),i.disabled=!1,i.textContent="↻ 更新",F("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const s=e.querySelector("#sales-start")?.value??"",i=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:s,endDate:i},im()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const s={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=s,a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,lm(s)}),e.addEventListener("click",s=>{const i=s.target.closest("tr[data-doc-no]");if(!i)return;const p=i.dataset.docNo??"";if(a.route==="/"){a.invoiceSelectedDocNo=p,a.invoiceSelectedLines=null,navigateTo("/sales"),Ia(p).then(m=>{a.invoiceSelectedDocNo===p&&(a.invoiceSelectedLines=m,E())});return}if(a.invoiceSelectedDocNo===p){a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,E();return}a.invoiceSelectedDocNo=p,a.invoiceSelectedLines=null,E(),Ia(p).then(m=>{a.invoiceSelectedDocNo===p&&(a.invoiceSelectedLines=m,E())})});const g=e.querySelector("#ledger-customer-code"),$=e.querySelector("#ledger-cust-suggestions");if(g&&$){const s=a.masterStats?.customers??[];g.addEventListener("input",()=>{const i=g.value.trim().toLowerCase();if(!i){$.style.display="none";return}const p=s.filter(m=>m.code.toLowerCase().includes(i)||m.name.toLowerCase().includes(i)||(m.kanaName??"").toLowerCase().includes(i)).slice(0,10);if(!p.length){$.style.display="none";return}$.innerHTML=p.map(m=>`<button class="search-item" type="button" data-ledger-cust="${m.code}"><span class="mono">${m.code}</span><span>${m.name}</span></button>`).join(""),$.style.display="block",$.querySelectorAll("[data-ledger-cust]").forEach(m=>{m.addEventListener("click",()=>{const h=m.dataset.ledgerCust??"";g.value=h,$.style.display="none",a.ledgerCustomerCode=h,qa(h)})})}),g.addEventListener("keydown",i=>{if(i.key==="Enter"){$.style.display="none";const p=g.value.trim(),m=p.toLowerCase(),h=(a.masterStats?.customers??[]).filter(x=>x.code.toLowerCase()===m||x.name.toLowerCase()===m),b=h.length===1?h[0].code:p.toUpperCase();a.ledgerCustomerCode=b,qa(b)}}),g.addEventListener("blur",()=>{setTimeout(()=>{$.style.display="none"},200)})}e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const s=e.querySelector("#ledger-customer-code")?.value.trim()??"",i=s.toLowerCase(),p=(a.masterStats?.customers??[]).filter(h=>h.code.toLowerCase()===i||h.name.toLowerCase()===i),m=p.length===1?p[0].code:s.toUpperCase();a.ledgerCustomerCode=m,qa(m)}),e.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{a.masterTab=s.dataset.tab,a.masterFilter={...un},E()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",tradeType:e.querySelector("#master-trade-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},E()}),e.querySelector("#master-search")?.addEventListener("keydown",s=>{s.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.page);i>=1&&(a.masterFilter={...a.masterFilter,page:i},E())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.table;if(!i)return;a.rawSelectedTable=i,a.rawPage=1;const p=await Wt(i,1);a.rawRecords=p.records,a.rawTotalCount=p.total,E()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const s=await Wt(a.rawSelectedTable,a.rawPage);a.rawRecords=s.records,a.rawTotalCount=s.total,E()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const s=await Wt(a.rawSelectedTable,a.rawPage);a.rawRecords=s.records,a.rawTotalCount=s.total,E()}),e.querySelectorAll("[data-analytics-tab]").forEach(s=>{s.addEventListener("click",async()=>{if(a.analyticsTab=s.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:p}=await I(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}=await Promise.resolve().then(()=>O);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}},void 0);a.analyticsPeriodOptions=await p(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await i(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}E()})}),e.querySelectorAll("[data-analytics-period]").forEach(s=>{s.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:p,fetchPeriodChartData:m,prevYearFilter:h}=await I(async()=>{const{fetchAnalyticsByPeriod:x,fetchAvailablePeriods:w,fetchPeriodChartData:S,prevYearFilter:C}=await Promise.resolve().then(()=>O);return{fetchAnalyticsByPeriod:x,fetchAvailablePeriods:w,fetchPeriodChartData:S,prevYearFilter:C}},void 0),b=s.dataset.analyticsPeriod;if(a.analyticsPeriod=b,a.analyticsDrilldown=null,b==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await p(a.analyticsTab,b),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const x=a.analyticsPeriodFilter,[w,S,C]=await Promise.all([i(a.analyticsTab,b,x),m(b,x),m(b,h(x))]);a.analyticsPeriodRows=w,a.analyticsPeriodChartData=S,a.analyticsPrevYearChartData=C}E()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async s=>{const{fetchAnalyticsByPeriod:i,fetchPeriodChartData:p,prevYearFilter:m}=await I(async()=>{const{fetchAnalyticsByPeriod:x,fetchPeriodChartData:w,prevYearFilter:S}=await Promise.resolve().then(()=>O);return{fetchAnalyticsByPeriod:x,fetchPeriodChartData:w,prevYearFilter:S}},void 0);a.analyticsPeriodFilter=s.target.value,a.analyticsDrilldown=null;const h=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:x}=await I(async()=>{const{fiscalYearToDateRange:M}=await Promise.resolve().then(()=>Vn);return{fiscalYearToDateRange:M}},void 0),w=parseInt(h),S=x(w);x(w-1);const C=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:A}=await I(async()=>{const{supabaseRpc:M}=await Promise.resolve().then(()=>ee);return{supabaseRpc:M}},void 0),[T,N,R]=await Promise.all([A(C,{p_date_from:S.from,p_date_to:S.to}),p("yearly",h),p("yearly",String(w-1))]);a.analyticsPeriodRows=(T??[]).map(M=>({code:String(M.code??""),name:String(M.name??""),amount:Number(M.amount??0),quantity:Number(M.quantity??0),documents:Number(M.documents??0),volumeMl:Number(M.volume_ml??0)})),a.analyticsPeriodChartData=(N??[]).map(M=>({...M})),a.analyticsPrevYearChartData=(R??[]).map(M=>({...M}))}else{const[x,w,S]=await Promise.all([i(a.analyticsTab,a.analyticsPeriod,h),p(a.analyticsPeriod,h),p(a.analyticsPeriod,m(h))]);a.analyticsPeriodRows=x,a.analyticsPeriodChartData=w,a.analyticsPrevYearChartData=S}E()}),e.querySelectorAll("[data-fiscal-mode]").forEach(s=>{s.addEventListener("click",async()=>{if(a.analyticsFiscalMode=s.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:i}=await I(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>Vn);return{monthToFiscalYear:m}},void 0),p=new Set;for(const m of a.salesAnalytics.monthlySales)p.add(i(m.month));a.analyticsPeriodOptions=[...p].sort((m,h)=>h-m).map(String)}else{const{fetchAvailablePeriods:i}=await I(async()=>{const{fetchAvailablePeriods:p}=await Promise.resolve().then(()=>O);return{fetchAvailablePeriods:p}},void 0);a.analyticsPeriodOptions=await i(a.analyticsTab,"yearly")}E()})}),e.querySelectorAll("[data-chart-metric]").forEach(s=>{s.addEventListener("click",()=>{a.analyticsChartMetric=s.dataset.chartMetric,E()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.analyticsDrilldown??"",p=s.dataset.drilldownName??i,m=a.analyticsTab,{fetchCustomerProductBreakdown:h,fetchProductCustomerBreakdown:b,fetchEntityMonthlySales:x,periodToDateRange:w}=await I(async()=>{const{fetchCustomerProductBreakdown:T,fetchProductCustomerBreakdown:N,fetchEntityMonthlySales:R,periodToDateRange:M}=await Promise.resolve().then(()=>O);return{fetchCustomerProductBreakdown:T,fetchProductCustomerBreakdown:N,fetchEntityMonthlySales:R,periodToDateRange:M}},void 0),S=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?w(a.analyticsPeriod,a.analyticsPeriodFilter):null,[C,A]=await Promise.all([x(i,m==="customers"?"customer":"product"),m==="customers"?h(i,S?.from,S?.to):b(i,S?.from,S?.to)]);a.analyticsDrilldown={tab:m,code:i,name:p,monthlySales:C,breakdownRows:A},E()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,E()}),e.querySelector("#staff-filter-input")?.addEventListener("input",s=>{a.analyticsStaffFilter=s.target.value,E()}),e.querySelectorAll("[data-staff-drilldown]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.staffDrilldown??"",p=s.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:h,periodToDateRange:b}=await I(async()=>{const{fetchStaffCustomerBreakdown:A,fetchStaffProductBreakdown:T,periodToDateRange:N}=await Promise.resolve().then(()=>O);return{fetchStaffCustomerBreakdown:A,fetchStaffProductBreakdown:T,periodToDateRange:N}},void 0),x=b(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),w=a.analyticsStaffDrilldown?.breakdownTab??"customers",[S,C]=await Promise.all([m(i,x?.from,x?.to),h(i,x?.from,x?.to)]);a.analyticsStaffDrilldown={code:i,name:p,breakdownTab:w,customerRows:S,productRows:C},E()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(s=>{s.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:s.dataset.staffBreakdownTab},E())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,E()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",s=>{a.analyticsTagFilter=s.target.value,E()}),e.querySelectorAll("[data-staff-period]").forEach(s=>{s.addEventListener("click",async()=>{const{fetchAvailablePeriods:i,fetchStaffTotalsByPeriod:p,periodToDateRange:m}=await I(async()=>{const{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:x,periodToDateRange:w}=await Promise.resolve().then(()=>O);return{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:x,periodToDateRange:w}},void 0),h=s.dataset.staffPeriod;if(a.analyticsStaffPeriod=h,a.analyticsStaffDrilldown=null,h==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await i("staff",h),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const b=m(h,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await p(b?.from,b?.to)}E()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async s=>{const{fetchStaffTotalsByPeriod:i,periodToDateRange:p}=await I(async()=>{const{fetchStaffTotalsByPeriod:h,periodToDateRange:b}=await Promise.resolve().then(()=>O);return{fetchStaffTotalsByPeriod:h,periodToDateRange:b}},void 0);a.analyticsStaffPeriodFilter=s.target.value;const m=p(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await i(m?.from,m?.to),a.analyticsStaffDrilldown=null,E()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Ne(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},E()}),e.querySelectorAll("[data-action='remove-line']").forEach(s=>{s.addEventListener("click",()=>{Ne(e);const i=parseInt(s.dataset.line??"0",10);a.invoiceForm.lines.splice(i,1),a.invoiceErrors=Ro(a.invoiceForm),E()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(s=>{s.addEventListener("click",()=>{Ne(e),Wu(parseInt(s.dataset.line??"0",10)),a.invoiceErrors={},E()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Gu(),E()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Ne(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,E()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(s=>{s.addEventListener("click",()=>{Ne(e);const i=parseInt(s.dataset.line??"0",10),p=a.invoiceForm.lines[i];a.pickerMode="product",a.pickerTargetLine=i,a.pickerQuery=p?p.productCode||p.productName:"",E()})}),e.querySelectorAll("[data-action='modal-close']").forEach(s=>{s.addEventListener("click",i=>{s.classList.contains("modal-backdrop")&&i.target instanceof HTMLElement&&!i.target.classList.contains("modal-backdrop")||(ca(),E())})}),e.querySelectorAll("[data-action='picker-select']").forEach(s=>{const i=async()=>{const p=s.dataset.code??"",m=s.dataset.name??"";if(a.pickerMode==="customer"){a.invoiceForm.customerCode=p,a.invoiceForm.customerName=m,delete a.invoiceErrors.customerCode;const h=a.masterStats?.customers.find(b=>b.code===p);a.invoicePriceGroup=h?.priceGroup||"",!a.invoicePriceGroup&&p&&(a.invoicePriceGroup=await Oa(p))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const h=a.invoiceForm.lines[a.pickerTargetLine];if(h){h.productCode=p,h.productName=m;const b=await eo(a.invoicePriceGroup,p);b>0&&(h.unitPrice=b),h.amount=h.quantity*h.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}ca(),E()};s.addEventListener("click",i),s.addEventListener("keydown",p=>{p.key==="Enter"&&i()})}),e.querySelector("#modal-search")?.addEventListener("input",s=>{a.pickerQuery=s.target.value,E()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Mo(),E()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Oo(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Ne(e),Xu(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await Oa(a.invoiceForm.customerCode)),E())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Ne(e),Zu(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,E())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(s=>{s.addEventListener("input",()=>{Ne(e),a.invoiceSavedDocNo=null;const i=s.dataset.field;(i==="quantity"||i==="unitPrice")&&E()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Ne(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const s=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=s.trim(),a.deliveryNote=null,a.actionLoading=!0,E(),!a.deliverySearchDocNo){F("伝票番号を入力してください","error"),a.actionLoading=!1,E();return}tn(a.deliverySearchDocNo).then(i=>{a.deliveryNote=i,a.actionLoading=!1,E()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const s=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=s,a.billingSummary=null,a.actionLoading=!0,E(),an(s).then(i=>{a.billingSummary=i,a.actionLoading=!1,E()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const s=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),i=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=s,a.taxMonth=i,a.taxDeclaration=null,a.taxVolume=null,a.actionLoading=!0,E(),Promise.all([on(s,i),rn(s,i)]).then(([p,m])=>{a.taxDeclaration=p,a.taxVolume=m,a.actionLoading=!1,E()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:s}=await I(async()=>{const{generateTaxXML:b}=await Promise.resolve().then(()=>O);return{generateTaxXML:b}},void 0),i=s(a.taxDeclaration),p=new Blob([i],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(p),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:s}=await I(async()=>{const{generateTaxCSV:b}=await Promise.resolve().then(()=>O);return{generateTaxCSV:b}},void 0),i=s(a.taxDeclaration),p=new Blob([i],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(p),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:s}=await I(async()=>{const{saveTaxDeclaration:i}=await Promise.resolve().then(()=>O);return{saveTaxDeclaration:i}},void 0);try{await s(a.taxDeclaration),F("下書き保存しました")}catch(i){F("保存に失敗: "+(i instanceof Error?i.message:String(i)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(s=>{s.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.taxRow),p=s.dataset.taxField,m=s.type==="number"?Number(s.value)||0:s.value,h=[...a.taxDeclaration.rows];h[i]={...h[i],[p]:m};const{recalculateTaxDeclaration:b}=await I(async()=>{const{recalculateTaxDeclaration:x}=await Promise.resolve().then(()=>O);return{recalculateTaxDeclaration:x}},void 0);a.taxDeclaration=b({...a.taxDeclaration,rows:h}),E()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.dedRow),p=s.dataset.dedField,m=s.type==="number"?Number(s.value)||0:s.value,h=[...a.taxDeclaration.deductions];h[i]={...h[i],[p]:m},a.taxDeclaration={...a.taxDeclaration,deductions:h},E()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=s.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[i]:s.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:s,TAX_RATE_CATEGORIES:i}=await I(async()=>{const{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}=await Promise.resolve().then(()=>O);return{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}},void 0),p=i[0],m={taxCategory:p.code,taxCategoryName:p.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:p.taxRatePerLiter,taxAmount:0};a.taxDeclaration=s({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),E()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(s=>{s.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.taxRow),{recalculateTaxDeclaration:p}=await I(async()=>{const{recalculateTaxDeclaration:h}=await Promise.resolve().then(()=>O);return{recalculateTaxDeclaration:h}},void 0),m=a.taxDeclaration.rows.filter((h,b)=>b!==i);a.taxDeclaration=p({...a.taxDeclaration,rows:m}),E()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const s={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,s]},E()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(s=>{s.addEventListener("click",()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.dedRow),p=a.taxDeclaration.deductions.filter((m,h)=>h!==i);a.taxDeclaration={...a.taxDeclaration,deductions:p},E()})}),e.querySelectorAll("[data-store-tab]").forEach(s=>{s.addEventListener("click",()=>{a.storeTab=s.dataset.storeTab,E()})}),e.querySelectorAll("[data-import-entity]").forEach(s=>{s.addEventListener("click",()=>{a.importEntity=s.dataset.importEntity,a.importPreview=null,a.importResult=null,E()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const s=Po(a.importEntity),i=new Blob([s],{type:"text/csv;charset=utf-8"}),p=URL.createObjectURL(i),m=document.createElement("a");m.href=p,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(p)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const i=e.querySelector("#import-file")?.files?.[0];if(!i){F("CSVファイルを選択してください","warning");return}const p=new FileReader;p.onload=()=>{const m=String(p.result??""),{columns:h,rows:b}=So(m);a.importPreview=ko(a.importEntity,h,b),a.importResult=null,E()},p.readAsText(i,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,E()}),e.querySelectorAll("[data-print-template]").forEach(s=>{s.addEventListener("click",()=>{a.printTemplate=s.dataset.printTemplate,E()})}),e.querySelectorAll("[data-print-field]").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.printField;let p=s.value;(i==="taxRate"||i==="previousBalance"||i==="paymentAmount")&&(p=Number(s.value)||0),a.printData={...a.printData,[i]:p},E()})}),e.querySelectorAll("[data-print-opt]").forEach(s=>{const i=()=>{const p=s.dataset.printOpt;let m;s.type==="checkbox"?m=s.checked:p==="copies"?m=Number(s.value)||1:p==="overlayOpacity"||p==="calibrationOffsetX"||p==="calibrationOffsetY"?m=Number(s.value)||0:m=s.value,a.printOptions={...a.printOptions,[p]:m},E()};s.addEventListener("change",i),s.type==="range"&&s.addEventListener("input",i)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(s=>{s.addEventListener("change",()=>{const i=Number(s.dataset.printLine),p=s.dataset.printLfield,m=[...a.printData.lines];let h=s.value;(p==="quantity"||p==="unitPrice")&&(h=Number(s.value)||0),m[i]={...m[i],[p]:h},m[i].amount=(Number(m[i].quantity)||0)*(Number(m[i].unitPrice)||0),a.printData={...a.printData,lines:m},E()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},E()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((p,m)=>m!==i)},E()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),F("印刷設定を保存しました")}catch(s){F("保存失敗: "+(s instanceof Error?s.message:String(s)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const s=a.printCompany,i=prompt("会社名",s.name);if(i===null)return;const p=prompt("郵便番号",s.postalCode)??s.postalCode,m=prompt("住所",s.address1)??s.address1,h=prompt("TEL",s.tel)??s.tel,b=prompt("FAX",s.fax)??s.fax,x=prompt("適格請求書登録番号 (T+13桁)",s.registrationNo)??s.registrationNo,w=prompt("取引銀行名",s.bankName)??s.bankName,S=prompt("支店名",s.bankBranch)??s.bankBranch,C=prompt("口座番号",s.bankAccountNo)??s.bankAccountNo,A=prompt("口座名義",s.bankAccountHolder)??s.bankAccountHolder;a.printCompany={...s,name:i,postalCode:p,address1:m,tel:h,fax:b,registrationNo:x,bankName:w,bankBranch:S,bankAccountNo:C,bankAccountHolder:A},E()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,E()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const p=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=_a(s),{savePrintLayout:h}=await I(async()=>{const{savePrintLayout:x}=await Promise.resolve().then(()=>O);return{savePrintLayout:x}},void 0),b={id:`bp1701_${p.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:p,templateKey:"chain_store",positions:m};try{await h(b)?(F(`クラウド保存成功: ${p}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),E()):(F("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(x){F("保存エラー: "+(x instanceof Error?x.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const i=_a(s);a.fdSavedPositions=i;try{localStorage.setItem("sake_fd_positions",JSON.stringify(i)),F(`ローカル保存完了: ${Object.keys(i).length}件`)}catch(p){F("保存失敗: "+(p instanceof Error?p.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const p={templateKey:"chain_store",positions:_a(s),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(p,null,2)],{type:"application/json"}),h=URL.createObjectURL(m),b=document.createElement("a");b.href=h,b.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,b.click(),URL.revokeObjectURL(h)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async s=>{const i=s.target.files?.[0];if(i)try{const p=await i.text(),h=JSON.parse(p).positions;if(!h)throw new Error("positions field not found");a.fdSavedPositions=h,localStorage.setItem("sake_fd_positions",JSON.stringify(h)),F(`インポート成功: ${Object.keys(h).length}件`),E()}catch(p){F("インポート失敗: "+(p instanceof Error?p.message:""),"error")}});const P=e.querySelector("#fd-saved-layouts");P&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:s}=await I(async()=>{const{fetchPrintLayouts:p}=await Promise.resolve().then(()=>O);return{fetchPrintLayouts:p}},void 0),i=await s("chain_store");i.length===0?P.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(P.innerHTML=`☁️ クラウド保存済み (${i.length}件):<br/>`+i.map(p=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${p.id}" style="margin:4px 4px 0 0;">${p.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${p.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),P.querySelectorAll("[data-action='fd-load-layout']").forEach(p=>{p.addEventListener("click",()=>{const m=p.dataset.layoutId,h=i.find(b=>b.id===m);h&&(a.fdSavedPositions=h.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(h.positions)),F(`読込完了: ${h.name}`),E())})}),P.querySelectorAll("[data-action='fd-delete-layout']").forEach(p=>{p.addEventListener("click",async()=>{const m=p.dataset.layoutId;if(!m||!await Ee("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:h}=await I(async()=>{const{deletePrintLayout:x}=await Promise.resolve().then(()=>O);return{deletePrintLayout:x}},void 0);await h(m)?(F("削除しました"),E()):F("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await Ee("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),E())});const _=e.querySelector("#fd-sel-x"),D=e.querySelector("#fd-sel-y");if([_,D].forEach(s=>{s?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const i=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);i&&(_&&(i.style.left=_.value+"mm"),D&&(i.style.top=D.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(s=>{s.addEventListener("dragstart",i=>{s.classList.add("wf-dragging"),i.dataTransfer?.setData("text/plain",s.dataset.wfOrder??"")}),s.addEventListener("dragend",()=>s.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(s=>{s.addEventListener("dragover",i=>i.preventDefault()),s.addEventListener("drop",i=>{i.preventDefault();const p=i.dataTransfer?.getData("text/plain"),m=s.dataset.wfStage;if(!p||!m)return;const h=a.workflowOrders.find(b=>b.id===p);h&&(h.stage=m,E())})}),e.querySelectorAll("[data-mo-step]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.moStep;s.disabled||(a.mobileOrder.step=i,E())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",s=>{a.mobileOrder.customerQuery=s.target.value,E()}),e.querySelector("#mo-product-q")?.addEventListener("input",s=>{a.mobileOrder.productQuery=s.target.value,E()}),e.querySelectorAll("[data-mo-select-customer]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.moSelectCustomer,p=a.masterStats?.customers.find(m=>m.id===i);p&&(a.mobileOrder.selectedCustomer=p),E()})}),e.querySelectorAll("[data-mo-add-product]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.moAddProduct,p=a.masterStats?.products.find(h=>h.code===i);if(!p)return;const m=1800;a.mobileOrder.cart.push({productCode:p.code,productName:p.name,quantity:1,unit:"本",unitPrice:m,amount:m}),E()})}),e.querySelectorAll("[data-mo-qty]").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.moQty),p=s.dataset.moProduct,m=a.mobileOrder.cart.find(h=>h.productCode===p);m&&(m.quantity=Math.max(0,m.quantity+i),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(h=>h.productCode!==p)),E())})}),e.querySelectorAll("[data-mo-remove]").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.moRemove);a.mobileOrder.cart.splice(i,1),E()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const s=e.querySelector("#mo-memo");a.mobileOrder.memo=s?.value??"";const i="MO"+Date.now().toString().slice(-8),p=e.querySelector("[data-action='mo-submit']");p&&(p.disabled=!0,p.textContent="送信中…");const m=a.mobileOrder.cart.reduce((h,b)=>h+b.amount,0);try{const{saveStoreOrder:h}=await I(async()=>{const{saveStoreOrder:b}=await Promise.resolve().then(()=>O);return{saveStoreOrder:b}},void 0);await h(i,a.mobileOrder.selectedCustomer?.name??"不明",a.mobileOrder.selectedCustomer?.code??null,m,a.mobileOrder.memo,a.mobileOrder.cart)}catch(h){console.error("受注保存失敗:",h),F("送信に失敗しました","error"),p&&(p.disabled=!1,p.textContent="受注を送信");return}a.mobileOrder.submittedDocNo=i,a.mobileOrder.step="done",E()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},E()}),e.querySelectorAll("[data-tour-id]").forEach(s=>{s.addEventListener("click",()=>{a.tourActiveId=s.dataset.tourId??null,E()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(s=>{s.addEventListener("click",()=>{const i=a.tourInquiries.find(x=>x.id===a.tourActiveId);if(!i)return;const p=s.dataset.template==="confirm"?Ud:Yd,m=e.querySelector("#tour-confirmed-time"),h=p.replaceAll("{name}",i.name).replaceAll("{partySize}",String(i.partySize)).replaceAll("{confirmedTime}",m?.value??i.visitDate),b=e.querySelector("#tour-reply-body");b&&(b.value=h)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const s=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",i=a.tourInquiries.find(m=>m.id===s);if(!i)return;const p=e.querySelector("#tour-confirmed-time");i.status="confirmed",i.repliedAt=new Date().toISOString(),i.confirmedTime=p?.value??"",F("返信メールを下書き保存し、ステータスを確定にしました"),E()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const s=e.querySelector("#lb-type")?.value??"",i=e.querySelector("#lb-area")?.value??"",p=e.querySelector("#lb-keyword")?.value??"";if(!s&&!p){F("業種かキーワードを入力してください","warning");return}a.leadSearchType=s,a.leadSearchArea=i,a.leadSearchQuery=p,a.leadSearching=!0,E();const m=a.integrations.find(w=>w.provider==="google_maps");if(!m||!m.config.api_key){F("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,E();return}const{searchPlaces:h}=await I(async()=>{const{searchPlaces:w}=await Promise.resolve().then(()=>O);return{searchPlaces:w}},void 0),b=[s,p].filter(Boolean).join(" "),x=await h(m,b,i);a.leadSearching=!1,x.error?F("検索失敗: "+x.error,"error"):a.leadSearchResults=x.results,E()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],E()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const s=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!s)return;const i=`ll_${Date.now()}`,p={id:i,name:s,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:h,fetchLeadLists:b,fetchLeadItems:x}=await I(async()=>{const{saveLeadList:C,saveLeadItem:A,fetchLeadLists:T,fetchLeadItems:N}=await Promise.resolve().then(()=>O);return{saveLeadList:C,saveLeadItem:A,fetchLeadLists:T,fetchLeadItems:N}},void 0);await m(p);const w=e.querySelectorAll(".lb-search-check:checked"),S=Array.from(w).map(C=>Number(C.dataset.idx));for(const C of S){const A=a.leadSearchResults[C];A&&await h({...A,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:i,businessType:a.leadSearchType})}a.leadLists=await b(),a.leadActiveListId=i,a.leadItems=await x(i),a.leadSearchResults=[],F(`${S.length}件を「${s}」として保存しました`),E()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??null;if(a.leadActiveListId=i,i){const{fetchLeadItems:p}=await I(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>O);return{fetchLeadItems:m}},void 0);a.leadItems=await p(i)}E()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",p=a.leadItems.find(b=>b.id===i);if(!p)return;const{saveLeadItem:m,fetchLeadItems:h}=await I(async()=>{const{saveLeadItem:b,fetchLeadItems:x}=await Promise.resolve().then(()=>O);return{saveLeadItem:b,fetchLeadItems:x}},void 0);await m({...p,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),E()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",p=a.leadItems.find(x=>x.id===i);if(!p)return;const{convertLeadToProspect:m,fetchLeadItems:h}=await I(async()=>{const{convertLeadToProspect:x,fetchLeadItems:w}=await Promise.resolve().then(()=>O);return{convertLeadToProspect:x,fetchLeadItems:w}},void 0);await m(p)&&(F("見込客に追加しました: "+p.companyName),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),E())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const s=e.querySelectorAll(".lb-item-check:checked");if(s.length===0&&!await Ee("全ての新規アイテムを見込客に変換しますか？"))return;const i=s.length>0?Array.from(s).map(b=>b.dataset.id):a.leadItems.filter(b=>b.status==="new").map(b=>b.id),{convertLeadToProspect:p,fetchLeadItems:m}=await I(async()=>{const{convertLeadToProspect:b,fetchLeadItems:x}=await Promise.resolve().then(()=>O);return{convertLeadToProspect:b,fetchLeadItems:x}},void 0);let h=0;for(const b of i){const x=a.leadItems.find(w=>w.id===b);x&&x.status==="new"&&await p(x)&&h++}F(`${h}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),E()}),e.querySelectorAll("[data-analysis-tab]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.analysisTab;a.analysisTab!==i&&(a.analysisTab=i,E())})}),e.querySelector("#analysis-period-year")?.addEventListener("change",async s=>{const i=s.target.value,p=e.querySelector("#analysis-period-month")?.value??"";a.analysisPeriod=i&&p?`${i}-${p}`:i,a.customerAnalysis=null,a.productABC=null,await Lt("/customer-analysis"),E()}),e.querySelector("#analysis-period-month")?.addEventListener("change",async s=>{const i=s.target.value,p=e.querySelector("#analysis-period-year")?.value??"";a.analysisPeriod=p&&i?`${p}-${i}`:p,a.customerAnalysis=null,a.productABC=null,await Lt("/customer-analysis"),E()}),e.querySelector("#customer-map")){const s=()=>{window.google?.maps?mm(e):setTimeout(s,200)};s()}e.querySelectorAll(".churn-reason-select").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.churnCode??"",p=s.value;try{const{saveChurnNote:m}=await I(async()=>{const{saveChurnNote:x}=await Promise.resolve().then(()=>O);return{saveChurnNote:x}},void 0);await m({customerCode:i,reason:p,memo:"",actionedAt:null});const h=a.churnNotes.find(x=>x.customerCode===i);h?h.reason=p:a.churnNotes.push({customerCode:i,reason:p,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const b=s.closest("tr");if(b){const x=b.querySelector("td:nth-child(2)");if(x){let w=x.querySelector(".reason-badge");!w&&p&&(w=document.createElement("span"),w.className="status-pill info reason-badge",w.style.fontSize="0.72rem",x.appendChild(w)),w&&(w.textContent=p?ju[p]??"":"")}}F("理由を保存しました")}catch(m){F("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.churnCode??"",p=s.checked,m=s.closest("tr");m&&(m.style.opacity=p?"0.45":"",m.setAttribute("data-actioned",p?"1":"0"));try{const{saveChurnNote:h}=await I(async()=>{const{saveChurnNote:S}=await Promise.resolve().then(()=>O);return{saveChurnNote:S}},void 0),b=a.churnNotes.find(S=>S.customerCode===i),x=b?.reason??"",w=new Date().toISOString().slice(0,10);await h({customerCode:i,reason:x,memo:"",actionedAt:p?w:null}),b?b.actionedAt=p?w:null:a.churnNotes.push({customerCode:i,reason:x,memo:"",actionedAt:p?w:null,updatedAt:new Date().toISOString()}),F(p?"対応済みにしました":"対応済みを解除しました")}catch(h){F("保存に失敗しました","error"),console.error(h)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const s=a.integrations.find(h=>h.provider==="ivry");if(!s||!s.isEnabled){F("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:i,fetchCallLogs:p}=await I(async()=>{const{syncIvryCallLogs:h,fetchCallLogs:b}=await Promise.resolve().then(()=>O);return{syncIvryCallLogs:h,fetchCallLogs:b}},void 0),m=await i(s);m.error?F("同期失敗: "+m.error,"error"):(F(`${m.count}件の通話履歴を同期しました`),a.callLogs=await p(100),E())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const s=a.integrations.find(h=>h.provider==="ivry");if(!s||!s.isEnabled){F("IVRy連携が無効です","warning");return}if(!await Ee("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:i}=await I(async()=>{const{syncPhoneBookToIvry:h}=await Promise.resolve().then(()=>O);return{syncPhoneBookToIvry:h}},void 0),p=[];a.masterStats?.customers.forEach(h=>{p.push({name:h.name,phone:"",customerCode:h.code,note:"既存取引先"})}),a.prospects.forEach(h=>{h.phone&&p.push({name:h.companyName,phone:h.phone,customerCode:h.id,note:`見込客 (${h.stage})`})});const m=await i(s,p);m.error?F("送信失敗: "+m.error,"error"):F(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",p=s.dataset.phone??"",m=prompt(`電話番号 ${p} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const h=a.callLogs.find(w=>w.id===i);if(!h)return;const{saveCallLog:b,fetchCallLogs:x}=await I(async()=>{const{saveCallLog:w,fetchCallLogs:S}=await Promise.resolve().then(()=>O);return{saveCallLog:w,fetchCallLogs:S}},void 0);await b({...h,matchedCustomerCode:m}),a.callLogs=await x(100),E()})}),e.querySelectorAll("[data-action='call-memo']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",p=a.callLogs.find(x=>x.id===i);if(!p)return;const m=prompt("メモを入力:",p.notes??"");if(m===null)return;const{saveCallLog:h,fetchCallLogs:b}=await I(async()=>{const{saveCallLog:x,fetchCallLogs:w}=await Promise.resolve().then(()=>O);return{saveCallLog:x,fetchCallLogs:w}},void 0);await h({...p,notes:m}),a.callLogs=await b(100),E()})}),e.querySelectorAll("[data-prospect-view]").forEach(s=>{s.addEventListener("click",()=>{a.prospectViewMode=s.dataset.prospectView,E()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",E()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:p}=await I(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>O);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await p(i)}E()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.prospectId??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:p}=await I(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>O);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await p(i)}E()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(s=>{s.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],E())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const s=a.prospectEditingId==="__new__",i=s?`p_${Date.now()}`:a.prospectEditingId??"",p={id:i,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!p.companyName){F("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:h,recordAudit:b,sendSlackNotification:x}=await I(async()=>{const{saveProspect:S,fetchProspects:C,recordAudit:A,sendSlackNotification:T}=await Promise.resolve().then(()=>O);return{saveProspect:S,fetchProspects:C,recordAudit:A,sendSlackNotification:T}},void 0);await m(p)?(s&&await x("new_prospect",`新規見込客: ${p.companyName} / 想定 ¥${p.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await b({action:s?"prospect_create":"prospect_update",entityType:"prospect",entityId:i,userEmail:a.user?.email}),a.prospects=await h(),a.prospectEditingId=null,E()):F("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=s.dataset.id??"",{deleteProspect:p,fetchProspects:m}=await I(async()=>{const{deleteProspect:h,fetchProspects:b}=await Promise.resolve().then(()=>O);return{deleteProspect:h,fetchProspects:b}},void 0);await p(i)&&(a.prospects=await m(),E())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(s=>{s.addEventListener("click",i=>{i.stopPropagation();const p=s.dataset.id??"",m=s.dataset.name??"",h=s.dataset.addr??"";a.quoteState=ia(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=m,a.quoteState.customerAddress=h,a.quoteState.isProspect=!0,a.quoteState.prospectId=p,a.quotePricing=null,a.quoteEditId="new",rt("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",i=e.querySelector("#prospect-activity-type")?.value??"call",p=e.querySelector("#prospect-activity-title")?.value??"";if(!p){F("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:h}=await I(async()=>{const{saveProspectActivity:b,fetchProspectActivities:x}=await Promise.resolve().then(()=>O);return{saveProspectActivity:b,fetchProspectActivities:x}},void 0);await m({id:`act_${Date.now()}`,prospectId:s,activityType:i,title:p,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await h(s),E()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(s=>{s.addEventListener("dragstart",i=>{i.dataTransfer?.setData("text/plain",s.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(s=>{s.addEventListener("dragover",i=>i.preventDefault()),s.addEventListener("drop",async i=>{i.preventDefault();const p=i.dataTransfer?.getData("text/plain"),m=s.dataset.prospectStage;if(!p)return;const h=a.prospects.find(b=>b.id===p);if(h&&h.stage!==m){const b={...h,stage:m},{saveProspect:x}=await I(async()=>{const{saveProspect:w}=await Promise.resolve().then(()=>O);return{saveProspect:w}},void 0);await x(b),h.stage=m,E()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:s,saveIntegrationSetting:i}=await I(async()=>{const{fetchIntegrationSettings:w,saveIntegrationSetting:S}=await Promise.resolve().then(()=>O);return{fetchIntegrationSettings:w,saveIntegrationSetting:S}},void 0),m=(a.integrations.length>0?a.integrations:await s()).find(w=>w.provider==="slack");if(!m)return;const h=e.querySelector("#slack-webhook")?.value??"",b=e.querySelector("#slack-default-channel")?.value??"",x=e.querySelector("#slack-enabled")?.checked??!1;await i({...m,config:{...m.config,webhook_url:h,default_channel:b},isEnabled:x}),a.integrations=await s(),F("保存しました"),E()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:s,fetchSlackRules:i}=await I(async()=>{const{saveSlackRule:p,fetchSlackRules:m}=await Promise.resolve().then(()=>O);return{saveSlackRule:p,fetchSlackRules:m}},void 0);for(const p of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${p.id}"][data-slack-field="enabled"]`)?.checked??p.enabled,h=e.querySelector(`[data-slack-rule-id="${p.id}"][data-slack-field="channel"]`)?.value??p.channel;await s({...p,enabled:m,channel:h})}a.slackRules=await i(),F("ルールを保存しました"),E()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:s}=await I(async()=>{const{sendSlackNotification:p}=await Promise.resolve().then(()=>O);return{sendSlackNotification:p}},void 0),i=await s("new_order","🧪 これはテスト通知です (syusen-cloud)");i.ok?F("テスト送信成功"):F("送信失敗: "+(i.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,E()}),e.querySelectorAll("[data-action='material-adjust']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.id??"",p=a.materialList.find(m=>m.id===i);p&&(a.materialEditing=p,a.materialEditingIsNew=!1,E())})}),e.querySelectorAll("[data-action='material-close']").forEach(s=>{s.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,E())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const i={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(i.materialType=e.querySelector("#mat-type")?.value??"",!i.code||!i.name){F("コードと品名は必須です","warning");return}const{saveMaterial:p,fetchMaterialList:m}=await I(async()=>{const{saveMaterial:b,fetchMaterialList:x}=await Promise.resolve().then(()=>O);return{saveMaterial:b,fetchMaterialList:x}},void 0);await p(i)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,F("保存しました"),E()):F("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!s||!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:i,fetchMaterialList:p}=await I(async()=>{const{deleteMaterial:m,fetchMaterialList:h}=await Promise.resolve().then(()=>O);return{deleteMaterial:m,fetchMaterialList:h}},void 0);await i(s)&&(a.materialList=await p(),a.materialEditing=null,E())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",E()}),e.querySelectorAll("[data-action='user-edit']").forEach(s=>{s.addEventListener("click",()=>{a.userEditingId=s.dataset.id??null,E()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,E()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const s=a.userEditingId==="__new__",i=s?crypto.randomUUID():a.userEditingId??"",p=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!p||!m){F("名前とメールアドレスは必須です","warning");return}const h={id:i,email:p,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(s){const C=e.querySelector("#user-password")?.value??"";if(C.length<8){F("パスワードは8文字以上必要です","warning");return}try{await $n(p,C)}catch(A){F("Auth登録失敗: "+(A instanceof Error?A.message:""),"error");return}}const{saveUserProfile:b,fetchUserProfiles:x,recordAudit:w}=await I(async()=>{const{saveUserProfile:C,fetchUserProfiles:A,recordAudit:T}=await Promise.resolve().then(()=>O);return{saveUserProfile:C,fetchUserProfiles:A,recordAudit:T}},void 0);await b(h)?(await w({action:s?"user_create":"user_update",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await x(),a.userEditingId=null,F("保存しました"),E()):F("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=s.dataset.id??"",{deleteUserProfile:p,fetchUserProfiles:m,recordAudit:h}=await I(async()=>{const{deleteUserProfile:x,fetchUserProfiles:w,recordAudit:S}=await Promise.resolve().then(()=>O);return{deleteUserProfile:x,fetchUserProfiles:w,recordAudit:S}},void 0);await p(i)?(await h({action:"user_delete",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await m(),E()):F("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const s=e.querySelector("#profile-sender")?.value??"",i={...a.myProfile,defaultMailSenderId:s},{saveUserProfile:p}=await I(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>O);return{saveUserProfile:m}},void 0);await p(i),a.myProfile=i,F("保存しました"),E()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const s=e.querySelector("#profile-new-password")?.value??"";if(s.length<8){F("8文字以上のパスワードを入力してください","warning");return}try{await Go(s),F("パスワードを変更しました")}catch(i){F("変更失敗: "+(i instanceof Error?i.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(s=>{s.addEventListener("click",()=>{a.integrationEditingId=s.dataset.id??null,E()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,E()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='int-save']")?.dataset.id??"",i=a.integrations.find(w=>w.id===s);if(!i)return;const p={...i.config};Object.keys(p).forEach(w=>{const S=e.querySelector(`#int-${w}`);S&&(p[w]=S.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:h,fetchIntegrationSettings:b}=await I(async()=>{const{saveIntegrationSetting:w,fetchIntegrationSettings:S}=await Promise.resolve().then(()=>O);return{saveIntegrationSetting:w,fetchIntegrationSettings:S}},void 0);await h({...i,config:p,isEnabled:m})?(a.integrations=await b(),a.integrationEditingId=null,F("保存しました"),E()):F("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(s=>{s.addEventListener("click",async()=>{const i=a.integrations.find(b=>b.provider==="shopify");if(!i){F("Shopify連携が未設定です","warning");return}s.textContent="同期中…",s.disabled=!0;const{syncShopifyOrders:p,fetchShopifyOrders:m}=await I(async()=>{const{syncShopifyOrders:b,fetchShopifyOrders:x}=await Promise.resolve().then(()=>O);return{syncShopifyOrders:b,fetchShopifyOrders:x}},void 0),h=await p(i);h.error?F("同期失敗: "+h.error,"error"):(F(`${h.count}件を同期しました`),a.shopifyOrders=await m()),E()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(s=>{s.addEventListener("click",async()=>{const i=a.integrations.find(b=>b.provider==="google_calendar");if(!i)return;s.textContent="同期中…",s.disabled=!0;const{syncGoogleCalendar:p,fetchCalendarEvents:m}=await I(async()=>{const{syncGoogleCalendar:b,fetchCalendarEvents:x}=await Promise.resolve().then(()=>O);return{syncGoogleCalendar:b,fetchCalendarEvents:x}},void 0),h=await p(i);h.error?F("同期失敗: "+h.error,"error"):(F(`${h.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),E()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const i=e.querySelector("#fax-file")?.files?.[0];if(!i){F("FAX画像を選択してください","warning");return}const p=a.integrations.find(m=>m.provider==="cloud_vision");if(!p||!p.config.api_key){F("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,E();try{const m=new FileReader;m.onload=async()=>{const h=String(m.result??""),{ocrFaxImage:b,saveFaxRecord:x,fetchFaxInbox:w}=await I(async()=>{const{ocrFaxImage:T,saveFaxRecord:N,fetchFaxInbox:R}=await Promise.resolve().then(()=>O);return{ocrFaxImage:T,saveFaxRecord:N,fetchFaxInbox:R}},void 0),S=await b(p,h),C=e.querySelector("#fax-sender-name")?.value??"",A=e.querySelector("#fax-sender-phone")?.value??"";await x({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:C,senderPhone:A,ocrStatus:S.error?"failed":"done",ocrText:S.text}),a.faxOcrText=S.error?`エラー: ${S.error}`:S.text,a.faxRecords=await w(),a.faxProcessing=!1,E()},m.readAsDataURL(i)}catch(m){F("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,E()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",E()}),e.querySelectorAll("[data-action='ms-edit']").forEach(s=>{s.addEventListener("click",()=>{a.mailSenderEditingId=s.dataset.id??null,E()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,E()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,i={id:s,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(b=>b.id===s)?.isVerified??!1};if(!i.name||!i.email){F("名前とメールアドレスは必須です","warning");return}const{saveMailSender:p,fetchMailSenders:m}=await I(async()=>{const{saveMailSender:b,fetchMailSenders:x}=await Promise.resolve().then(()=>O);return{saveMailSender:b,fetchMailSenders:x}},void 0);await p(i)?(a.mailSenders=await m(),a.mailSenderEditingId=null,F("保存しました"),E()):F("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=s.dataset.id??"",{deleteMailSender:p,fetchMailSenders:m}=await I(async()=>{const{deleteMailSender:b,fetchMailSenders:x}=await Promise.resolve().then(()=>O);return{deleteMailSender:b,fetchMailSenders:x}},void 0);await p(i)?(a.mailSenders=await m(),E()):F("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(s=>{s.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){F("データなし","error");return}const s=a.demandAnalysis,i=Object.entries(s.matrix).map(([m,h])=>{const b={productCode:m};return s.months.forEach(x=>{b[x]=h[x]??0}),b}),p=[{key:"productCode",label:"商品コード"},...s.months.map(m=>({key:m,label:m}))];Ka("demand-analysis.csv",i,p)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){F("データなし","error");return}const s=a.productionPlan.map(p=>({...p}));Ka("production-plan.csv",s,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await Ee("当月の全請求を締め切りますか？")&&F("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async s=>{const i=parseInt(s.target.value);a.brewingPlanFY=i;const{fetchBrewingPlanSummary:p,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:h,fetchBrewingProductDetail:b,fetchBrewingCustomCategories:x,fetchBrewingCategoryOverrides:w,fetchAllBrewingStockEntries:S}=await I(async()=>{const{fetchBrewingPlanSummary:j,fetchBrewingMonthlyTrend:z,fetchBrewingSchedule:Y,fetchBrewingProductDetail:H,fetchBrewingCustomCategories:G,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:J}=await Promise.resolve().then(()=>O);return{fetchBrewingPlanSummary:j,fetchBrewingMonthlyTrend:z,fetchBrewingSchedule:Y,fetchBrewingProductDetail:H,fetchBrewingCustomCategories:G,fetchBrewingCategoryOverrides:Q,fetchAllBrewingStockEntries:J}},void 0),[C,A,T,N,R,M,B]=await Promise.all([p(`${i}-10-01`,`${i+1}-09-30`),m(`${i}-10-01`,`${i+1}-09-30`),h(i),b(`${i}-10-01`,`${i+1}-09-30`),x(),w(),S()]);a.brewingPlanData=C,a.brewingMonthlyTrend=A,a.brewingSchedule=T,a.brewingProductDetail=N,a.brewingStockEntries=B,a.brewingCustomCategories=R,a.brewingOverrides=M,a.brewingExcludedProducts=new Set,E()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"",p=s.dataset.parent??"";if(!i||!p)return;if(s.checked){a.brewingExcludedProducts.delete(i),E();return}a.brewingExcludedProducts.add(i);const m=a.brewingCustomCategories.filter(h=>h.parentCategory===p);if(m.length===1){const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:x,fetchBrewingCategoryOverrides:w}=await I(async()=>{const{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:B,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:z}=await Promise.resolve().then(()=>O);return{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:B,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:z}},void 0);await h(i,m[0].name);const S=a.brewingPlanFY,{fetchBrewingYearlyShipments:C}=await I(async()=>{const{fetchBrewingYearlyShipments:M}=await Promise.resolve().then(()=>O);return{fetchBrewingYearlyShipments:M}},void 0),[A,T,N,R]=await Promise.all([b(`${S}-10-01`,`${S+1}-09-30`),x(`${S}-10-01`,`${S+1}-09-30`),w(),C()]);a.brewingPlanData=A,a.brewingProductDetail=T,a.brewingOverrides=N,a.brewingYearlyShipments=R,a.brewingExcludedProducts.delete(i)}E()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"",p=s.dataset.cat??"";if(!i||!p)return;const{setBrewingCategoryOverride:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:x,fetchBrewingYearlyShipments:w}=await I(async()=>{const{setBrewingCategoryOverride:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:j,fetchBrewingYearlyShipments:z}=await Promise.resolve().then(()=>O);return{setBrewingCategoryOverride:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:j,fetchBrewingYearlyShipments:z}},void 0);await m(i,p);const S=a.brewingPlanFY,[C,A,T,N]=await Promise.all([h(`${S}-10-01`,`${S+1}-09-30`),b(`${S}-10-01`,`${S+1}-09-30`),x(),w()]);a.brewingPlanData=C,a.brewingProductDetail=A,a.brewingOverrides=T,a.brewingYearlyShipments=N,E()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"";if(!i)return;const{setBrewingCategoryOverride:p,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h,fetchBrewingCategoryOverrides:b,fetchBrewingYearlyShipments:x}=await I(async()=>{const{setBrewingCategoryOverride:N,fetchBrewingPlanSummary:R,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:B,fetchBrewingYearlyShipments:j}=await Promise.resolve().then(()=>O);return{setBrewingCategoryOverride:N,fetchBrewingPlanSummary:R,fetchBrewingProductDetail:M,fetchBrewingCategoryOverrides:B,fetchBrewingYearlyShipments:j}},void 0);await p(i,null);const w=a.brewingPlanFY,[S,C,A,T]=await Promise.all([m(`${w}-10-01`,`${w+1}-09-30`),h(`${w}-10-01`,`${w+1}-09-30`),b(),x()]);a.brewingPlanData=S,a.brewingProductDetail=C,a.brewingOverrides=A,a.brewingYearlyShipments=T,E()})}),(()=>{const s=e.querySelector("#gantt-timeline");if(!s)return;const i=[9,10,11,12,1,2,3,4,5],p=i.length;let m=null,h=null;s.querySelectorAll(".gantt-bar").forEach(A=>{A.style.pointerEvents="auto"});function b(A){return"touches"in A?A.touches[0].clientX:A.clientX}function x(A){const T=A.target,N=T.closest(".gantt-bar");if(!N)return;const R=N.parentElement,M=N.dataset.cat??"",B=parseInt(N.dataset.month??"0"),j=parseInt(N.dataset.dur??"1"),z=parseInt(N.dataset.vol??"0"),Y=R.offsetWidth/p;let H="move";T.classList.contains("gantt-resize-right")?H="resize-right":T.classList.contains("gantt-resize-left")&&(H="resize-left"),N.style.cursor=H==="move"?"grabbing":"ew-resize",N.style.opacity="0.8",N.style.zIndex="10",m={bar:N,mode:H,cat:M,origMonth:B,origDur:j,origVol:z,startX:b(A),cellW:Y,origLeftPct:parseFloat(N.style.left),origWidthPct:parseFloat(N.style.width)},A.preventDefault()}function w(A){if(!m)return;const{bar:T,mode:N,origDur:R,startX:M,cellW:B,origLeftPct:j,origWidthPct:z}=m,Y=b(A)-M,H=Math.round(Y/B),G=Math.round(j/100*p);if(N==="move"){const Q=Math.max(0,Math.min(p-R,G+H));T.style.left=(Q/p*100).toFixed(2)+"%"}else if(N==="resize-right"){const Q=Math.max(1,Math.min(p-G,R+H));T.style.width=(Q/p*100).toFixed(2)+"%"}else if(N==="resize-left"){const Q=Math.max(0,Math.min(G+R-1,G+H)),J=R-(Q-G);T.style.left=(Q/p*100).toFixed(2)+"%",T.style.width=(J/p*100).toFixed(2)+"%"}}async function S(A){if(!m)return;const{bar:T,cat:N,origMonth:R,origDur:M,origVol:B}=m,j=Math.round(parseFloat(T.style.left)/100*p),z=Math.max(1,Math.round(parseFloat(T.style.width)/100*p)),Y=i[Math.max(0,Math.min(p-1,j))];if(T.style.cursor="grab",T.style.opacity="1",T.style.zIndex="",m=null,Y===R&&z===M)return;const{saveBrewingSchedule:H,fetchBrewingSchedule:G}=await I(async()=>{const{saveBrewingSchedule:J,fetchBrewingSchedule:Z}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:J,fetchBrewingSchedule:Z}},void 0),Q=a.brewingSchedule.filter(J=>J.brewCategory===N).map(J=>J.brewMonth===R?{brewMonth:Y,durationMonths:z,plannedVolumeL:B}:{brewMonth:J.brewMonth,durationMonths:J.durationMonths,plannedVolumeL:J.plannedVolumeL});await H(N,a.brewingPlanFY,Q),a.brewingSchedule=await G(a.brewingPlanFY),E()}s.addEventListener("mousedown",x),s.addEventListener("touchstart",x,{passive:!1}),document.addEventListener("mousemove",w),document.addEventListener("touchmove",w,{passive:!1}),document.addEventListener("mouseup",S),document.addEventListener("touchend",S);function C(A){const T=A.dataset.cat??"",N=parseInt(A.dataset.month??"0"),R=parseInt(A.dataset.vol??"0"),M=parseInt(A.dataset.max??"99999"),B=A.querySelector(".gantt-bar-label");if(!B||B.querySelector("input"))return;const j=document.createElement("input");j.type="number",j.min="0",j.max=String(M),j.step="100",j.value=String(R),j.style.cssText="width:60px;height:24px;font-size:12px;text-align:center;border:1px solid #2563eb;border-radius:3px;pointer-events:auto;",B.textContent="",B.style.pointerEvents="auto",B.appendChild(j),j.focus(),j.select();const z=async()=>{const Y=parseFloat(j.value)||0;if(B.style.pointerEvents="none",B.textContent=k(Math.round(Y))+"L",Math.abs(Y-R)<1)return;const{saveBrewingSchedule:H,fetchBrewingSchedule:G}=await I(async()=>{const{saveBrewingSchedule:J,fetchBrewingSchedule:Z}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:J,fetchBrewingSchedule:Z}},void 0),Q=a.brewingSchedule.filter(J=>J.brewCategory===T).map(J=>({brewMonth:J.brewMonth,durationMonths:J.durationMonths,plannedVolumeL:J.brewMonth===N?Y:J.plannedVolumeL}));await H(T,a.brewingPlanFY,Q),a.brewingSchedule=await G(a.brewingPlanFY),E()};j.addEventListener("blur",z),j.addEventListener("keydown",Y=>{Y.key==="Enter"&&j.blur()})}s.addEventListener("dblclick",A=>{const T=A.target.closest(".gantt-bar");T&&C(T)}),s.addEventListener("touchstart",A=>{const T=A.target.closest(".gantt-bar");if(T){if(h){clearTimeout(h),h=null,C(T);return}h=setTimeout(()=>{h=null},300)}},{passive:!0}),s.querySelectorAll(".gantt-bar-container").forEach(A=>{A.style.pointerEvents="auto";const T=async N=>{if(m)return;const R=A.dataset.cat??"",M=parseInt(A.dataset.max??"0"),B=A.getBoundingClientRect(),j=N-B.left,z=Math.floor(j/(B.width/p)),Y=i[Math.max(0,Math.min(p-1,z))];if(a.brewingSchedule.some(Z=>Z.brewCategory===R&&Z.brewMonth===Y))return;const H=Math.round(M*.3)||500,{saveBrewingSchedule:G,fetchBrewingSchedule:Q}=await I(async()=>{const{saveBrewingSchedule:Z,fetchBrewingSchedule:ae}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:Z,fetchBrewingSchedule:ae}},void 0),J=[...a.brewingSchedule.filter(Z=>Z.brewCategory===R).map(Z=>({brewMonth:Z.brewMonth,durationMonths:Z.durationMonths,plannedVolumeL:Z.plannedVolumeL})),{brewMonth:Y,durationMonths:2,plannedVolumeL:H}];await G(R,a.brewingPlanFY,J),a.brewingSchedule=await Q(a.brewingPlanFY),E()};A.addEventListener("click",N=>{N.target.closest(".gantt-bar")||T(N.clientX)})})})();function k(s){return s.toLocaleString("ja-JP")}(()=>{const s=e.querySelector("#bp-gantt");if(!s)return;let i=null;function p(b){const x=b.target,w=x.closest(".bp-gantt-bar");if(!w)return;let S="move";x.classList.contains("bp-gantt-resize-right")?S="resize-right":x.classList.contains("bp-gantt-resize-left")&&(S="resize-left");const C="touches"in b?b.touches[0].clientX:b.clientX;w.style.opacity="0.7",w.style.zIndex="10",i={bar:w,mode:S,stepId:w.dataset.stepId??"",startX:C,origLeft:parseFloat(w.style.left),origWidth:parseFloat(w.style.width)},b.preventDefault()}function m(b){if(!i)return;const w=("touches"in b?b.touches[0].clientX:b.clientX)-i.startX;i.mode==="move"?i.bar.style.left=i.origLeft+w+"px":i.mode==="resize-right"?i.bar.style.width=Math.max(6,i.origWidth+w)+"px":(i.bar.style.left=i.origLeft+w+"px",i.bar.style.width=Math.max(6,i.origWidth-w)+"px")}async function h(){if(!i)return;const{bar:b,stepId:x,origLeft:w,origWidth:S}=i,C=parseFloat(b.style.left),A=parseFloat(b.style.width);b.style.opacity="1",b.style.zIndex="",i=null;const T=Math.round((C-w)/6),N=Math.round((A-S)/6);if(T===0&&N===0)return;const R=b.dataset.plannedStart??"",M=b.dataset.plannedEnd??"";if(!R||!M)return;const B=(V,K)=>{const W=new Date(V);return W.setDate(W.getDate()+K),W.toISOString().slice(0,10)};let j=R,z=M;T!==0&&N===0?(j=B(R,T),z=B(M,T)):N!==0&&T===0?z=B(M,N):(j=B(R,T),z=B(M,T+N));const Y=b.dataset.batchId??"",H=parseInt(b.dataset.stepOrder??"0"),{updateBrewingProcessStep:G,fetchBrewingProcessSteps:Q}=await I(async()=>{const{updateBrewingProcessStep:V,fetchBrewingProcessSteps:K}=await Promise.resolve().then(()=>O);return{updateBrewingProcessStep:V,fetchBrewingProcessSteps:K}},void 0),J=a.brewingProcessSteps.filter(V=>V.batchId===Y).sort((V,K)=>V.stepOrder-K.stepOrder);await G(x,{planned_start:j,planned_end:z});let Z=z;for(const V of J){if(V.stepOrder<=H)continue;const K=Math.max(Math.round((new Date(V.plannedEnd).getTime()-new Date(V.plannedStart).getTime())/864e5),0),W=B(Z,1),ne=B(W,K);await G(V.id,{planned_start:W,planned_end:ne}),Z=ne}let ae=j;for(let V=J.length-1;V>=0;V--){const K=J[V];if(K.stepOrder>=H)continue;const W=Math.max(Math.round((new Date(K.plannedEnd).getTime()-new Date(K.plannedStart).getTime())/864e5),0),ne=B(ae,-1),we=B(ne,-W);await G(K.id,{planned_start:we,planned_end:ne}),ae=we}J.map(V=>(V.stepOrder<H&&Math.round((new Date(V.plannedEnd).getTime()-new Date(V.plannedStart).getTime())/864e5),V));const{updateBrewingBatch:ie}=await I(async()=>{const{updateBrewingBatch:V}=await Promise.resolve().then(()=>O);return{updateBrewingBatch:V}},void 0);await ie(Y,{start_date:J[0].stepOrder<H?B(j,-J.filter(V=>V.stepOrder<H).reduce((V,K)=>V+Math.round((new Date(K.plannedEnd).getTime()-new Date(K.plannedStart).getTime())/864e5)+1,0)):H===1?j:void 0,target_end_date:Z}),a.brewingProcessSteps=await Q(a.brewingBatches.map(V=>V.id)),E()}s.addEventListener("mousedown",p),s.addEventListener("touchstart",p,{passive:!1}),document.addEventListener("mousemove",m),document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("mouseup",h),document.addEventListener("touchend",h)})(),e.querySelector("[data-action='bp-auto-schedule']")?.addEventListener("click",async()=>{if(a.brewingBatches.length===0)return;const s=e.querySelector("[data-action='bp-auto-schedule']");s&&(s.textContent="計算中...",s.disabled=!0);const{autoScheduleAllBatches:i,fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await I(async()=>{const{autoScheduleAllBatches:x,fetchBrewingBatches:w,fetchBrewingProcessSteps:S}=await Promise.resolve().then(()=>O);return{autoScheduleAllBatches:x,fetchBrewingBatches:w,fetchBrewingProcessSteps:S}},void 0),{fetchTanks:h}=await I(async()=>{const{fetchTanks:x}=await Promise.resolve().then(()=>O);return{fetchTanks:x}},void 0),b=await h().catch(()=>[]);await i(a.brewingBatches,a.bpWorkerSettings,a.bpStepLabor,b),a.brewingBatches=await p(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(x=>x.id)):[],E()});for(const s of["bp-worker-count","bp-worker-hours","bp-worker-start"])e.querySelector(`[data-action='${s}']`)?.addEventListener("change",async i=>{const p=parseFloat(i.target.value)||0;s==="bp-worker-count"?a.bpWorkerSettings.workerCount=p:s==="bp-worker-hours"?a.bpWorkerSettings.weeklyHoursLimit=p:a.bpWorkerSettings.dayStartHour=p;const{saveWorkerSettings:m}=await I(async()=>{const{saveWorkerSettings:h}=await Promise.resolve().then(()=>O);return{saveWorkerSettings:h}},void 0);await m(a.bpWorkerSettings),E()});e.querySelector("[data-action='bp-worker-deadline']")?.addEventListener("change",async s=>{a.bpWorkerSettings.deadlineDate=s.target.value;const{saveWorkerSettings:i}=await I(async()=>{const{saveWorkerSettings:p}=await Promise.resolve().then(()=>O);return{saveWorkerSettings:p}},void 0);await i(a.bpWorkerSettings),E()}),e.querySelector("[data-action='bp-worker-sunday']")?.addEventListener("change",async s=>{a.bpWorkerSettings.allowSunday=s.target.checked;const{saveWorkerSettings:i}=await I(async()=>{const{saveWorkerSettings:p}=await Promise.resolve().then(()=>O);return{saveWorkerSettings:p}},void 0);await i(a.bpWorkerSettings),E()}),e.querySelector("[data-action='bp-tank-add']")?.addEventListener("click",async()=>{const s=e.querySelector("#bp-tank-no")?.value?.trim()??"",i=parseFloat(e.querySelector("#bp-tank-cap")?.value??"0"),p=e.querySelector("#bp-tank-cats")?.value?.trim()??"";if(!s||i<=0)return;const m=p?p.split(/[,、]/).map(x=>x.trim()).filter(Boolean):[],{addTank:h,fetchTanks:b}=await I(async()=>{const{addTank:x,fetchTanks:w}=await Promise.resolve().then(()=>O);return{addTank:x,fetchTanks:w}},void 0);await h(s,i,"",m),a.bpTanks=await b(),E()}),e.querySelectorAll("[data-action='bp-tank-delete']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.tankId??"";if(!i)return;const{deleteTank:p,fetchTanks:m}=await I(async()=>{const{deleteTank:h,fetchTanks:b}=await Promise.resolve().then(()=>O);return{deleteTank:h,fetchTanks:b}},void 0);await p(i),a.bpTanks=await m(),E()})}),e.querySelector("[data-action='bp-import-schedule']")?.addEventListener("click",async()=>{const s=e.querySelectorAll("[data-action='bp-import-check']:checked");if(s.length===0)return;const{createBrewingBatch:i,fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await I(async()=>{const{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:x}=await Promise.resolve().then(()=>O);return{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:x}},void 0);for(const h of s){const b=h.dataset.cat??"",x=h.dataset.code??"",w=parseFloat(h.dataset.vol??"0"),S=h.dataset.date??"";!b||!x||!S||await i(b,x,a.brewingPlanFY,w,S,a.brewingProcessSteps,a.brewingRiceParams)}a.brewingBatches=await p(a.brewingPlanFY),a.brewingBatches.length>0&&(a.brewingProcessSteps=await m(a.brewingBatches.map(h=>h.id))),E()}),e.querySelector("[data-action='bp-show-new-form']")?.addEventListener("click",()=>{a.bpShowNewForm=!a.bpShowNewForm,E()}),e.querySelector("[data-action='bp-create-batch']")?.addEventListener("click",async()=>{const s=e.querySelector("#bp-new-cat")?.value??"",i=e.querySelector("#bp-new-code")?.value?.trim()??"",p=parseFloat(e.querySelector("#bp-new-vol")?.value??"0"),m=e.querySelector("#bp-new-date")?.value??"";if(!s||!i||!m)return;const{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:x}=await I(async()=>{const{createBrewingBatch:w,fetchBrewingBatches:S,fetchBrewingProcessSteps:C}=await Promise.resolve().then(()=>O);return{createBrewingBatch:w,fetchBrewingBatches:S,fetchBrewingProcessSteps:C}},void 0);await h(s,i,a.brewingPlanFY,p,m,a.brewingProcessSteps,a.brewingRiceParams),a.brewingBatches=await b(a.brewingPlanFY),a.brewingProcessSteps=await x(a.brewingBatches.map(w=>w.id)),a.bpShowNewForm=!1,E()}),e.querySelectorAll("[data-action='bp-toggle-detail']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.batchId??"";a.bpExpandedBatchId=a.bpExpandedBatchId===i?"":i,E()})}),e.querySelectorAll("[data-action='bp-step-status']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:p}=await I(async()=>{const{updateBrewingProcessStep:b}=await Promise.resolve().then(()=>O);return{updateBrewingProcessStep:b}},void 0),m={status:s.value};s.value==="進行中"&&!s.dataset.actualStart&&(m.actual_start=new Date().toISOString().split("T")[0]),s.value==="完了"&&!s.dataset.actualEnd&&(m.actual_end=new Date().toISOString().split("T")[0]),await p(i,m);const{fetchBrewingProcessSteps:h}=await I(async()=>{const{fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>O);return{fetchBrewingProcessSteps:b}},void 0);a.brewingProcessSteps=await h(a.brewingBatches.map(b=>b.id)),E()})}),e.querySelectorAll("[data-action='bp-step-temp']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:p}=await I(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>O);return{updateBrewingProcessStep:m}},void 0);await p(i,{temperature:parseFloat(s.value)||null})})}),e.querySelectorAll("[data-action='bp-step-notes']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:p}=await I(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>O);return{updateBrewingProcessStep:m}},void 0);await p(i,{notes:s.value})})});let L="";e.querySelectorAll("[data-action='bp-show-delete-modal']").forEach(s=>{s.addEventListener("click",()=>{L=s.dataset.batchId??"";const i=e.querySelector("#bp-delete-modal"),p=e.querySelector("#bp-delete-batch-name");i&&(i.style.display="flex"),p&&(p.textContent=s.dataset.batchCode??"")})}),e.querySelector("[data-action='bp-delete-cancel']")?.addEventListener("click",()=>{const s=e.querySelector("#bp-delete-modal");s&&(s.style.display="none"),L=""}),e.querySelector("[data-action='bp-delete-confirm']")?.addEventListener("click",async()=>{if(!L)return;const s=e.querySelector("#bp-delete-modal");s&&(s.style.display="none");const{supabaseDelete:i}=await I(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>ee);return{supabaseDelete:h}},void 0);await i("brewing_process_batches",L);const{fetchBrewingBatches:p,fetchBrewingProcessSteps:m}=await I(async()=>{const{fetchBrewingBatches:h,fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>O);return{fetchBrewingBatches:h,fetchBrewingProcessSteps:b}},void 0);a.brewingBatches=await p(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(h=>h.id)):[],a.bpExpandedBatchId="",L="",E()}),e.querySelector("#bp-delete-modal")?.addEventListener("click",s=>{s.target===s.currentTarget&&(s.currentTarget.style.display="none",L="")}),e.querySelectorAll("[data-action='bp-batch-vol']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.batchId??"";if(!i)return;const{updateBrewingBatch:p}=await I(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>O);return{updateBrewingBatch:m}},void 0);await p(i,{planned_volume_l:parseFloat(s.value)||0})})}),e.querySelectorAll("[data-action='bp-batch-date']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.batchId??"";if(!i)return;const{updateBrewingBatch:p}=await I(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>O);return{updateBrewingBatch:m}},void 0);await p(i,{start_date:s.value})})}),e.querySelectorAll("[data-action='bp-batch-status']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.batchId??"";if(!i)return;const{updateBrewingBatch:p,fetchBrewingBatches:m,fetchBrewingProcessSteps:h}=await I(async()=>{const{updateBrewingBatch:b,fetchBrewingBatches:x,fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>O);return{updateBrewingBatch:b,fetchBrewingBatches:x,fetchBrewingProcessSteps:w}},void 0);await p(i,{status:s.value}),a.brewingBatches=await m(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await h(a.brewingBatches.map(b=>b.id)):[],E()})}),e.querySelectorAll("[data-action='proc-add-schedule']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=e.querySelector(`[data-action='proc-add-month-select'][data-cat='${i}']`),m=e.querySelector(`[data-action='proc-add-month-vol'][data-cat='${i}']`),h=parseInt(p?.value??"0"),b=parseFloat(m?.value??"0");if(!i||!h||b<=0)return;const w=[...a.brewingSchedule.filter(A=>A.brewCategory===i).map(A=>({brewMonth:A.brewMonth,durationMonths:A.durationMonths,plannedVolumeL:A.plannedVolumeL})),{brewMonth:h,durationMonths:2,plannedVolumeL:b}],{saveBrewingSchedule:S,fetchBrewingSchedule:C}=await I(async()=>{const{saveBrewingSchedule:A,fetchBrewingSchedule:T}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:A,fetchBrewingSchedule:T}},void 0);await S(i,a.brewingPlanFY,w),a.brewingSchedule=await C(a.brewingPlanFY),E()})}),e.querySelectorAll("[data-action='proc-remove-schedule']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=parseInt(s.dataset.month??"0");if(!i||!p)return;const m=a.brewingSchedule.filter(x=>x.brewCategory===i&&x.brewMonth!==p).map(x=>({brewMonth:x.brewMonth,durationMonths:x.durationMonths,plannedVolumeL:x.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await I(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:w}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:x,fetchBrewingSchedule:w}},void 0);await h(i,a.brewingPlanFY,m),a.brewingSchedule=await b(a.brewingPlanFY),E()})}),e.querySelectorAll("[data-action='proc-sched-remove']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=parseInt(s.dataset.month??"0");if(!i||!p)return;const m=a.brewingSchedule.filter(x=>x.brewCategory===i&&x.brewMonth!==p).map(x=>({brewMonth:x.brewMonth,durationMonths:x.durationMonths,plannedVolumeL:x.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await I(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:w}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:x,fetchBrewingSchedule:w}},void 0);await h(i,a.brewingPlanFY,m),a.brewingSchedule=await b(a.brewingPlanFY),E()})}),e.querySelectorAll("[data-action='proc-sched-edit-vol']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=parseInt(s.dataset.month??"0"),m=parseFloat(s.value)||0;if(!i||!p)return;const h=a.brewingSchedule.filter(w=>w.brewCategory===i).map(w=>({brewMonth:w.brewMonth,durationMonths:w.durationMonths,plannedVolumeL:w.brewMonth===p?m:w.plannedVolumeL})),{saveBrewingSchedule:b,fetchBrewingSchedule:x}=await I(async()=>{const{saveBrewingSchedule:w,fetchBrewingSchedule:S}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:w,fetchBrewingSchedule:S}},void 0);await b(i,a.brewingPlanFY,h),a.brewingSchedule=await x(a.brewingPlanFY),E()})}),e.querySelectorAll("[data-action='proc-edit-vol']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=parseFloat(s.value)||0;if(!i)return;const{saveProcurementDecision:m}=await I(async()=>{const{saveProcurementDecision:h}=await Promise.resolve().then(()=>O);return{saveProcurementDecision:h}},void 0);await m(i,a.brewingPlanFY,p),a.procurementDecisions[i]=p,E()})}),e.querySelector("[data-action='proc-add-commitment']")?.addEventListener("click",async()=>{const s=(e.querySelector("#proc-commit-variety")?.value??"").trim(),i=parseFloat(e.querySelector("#proc-commit-bales")?.value??"0"),p=parseFloat(e.querySelector("#proc-commit-price")?.value??"0"),m=parseInt(e.querySelector("#proc-commit-month")?.value??"0")||null,h=(e.querySelector("#proc-commit-supplier")?.value??"").trim();if(!s||i<=0)return;const{saveRicePurchaseCommitment:b,fetchRicePurchaseCommitments:x}=await I(async()=>{const{saveRicePurchaseCommitment:w,fetchRicePurchaseCommitments:S}=await Promise.resolve().then(()=>O);return{saveRicePurchaseCommitment:w,fetchRicePurchaseCommitments:S}},void 0);await b({varietyName:s,committedBales:i,pricePerKg:p,deliveryMonth:m,supplier:h,fy:a.brewingPlanFY}),a.ricePurchaseCommitments=await x(a.brewingPlanFY),E()}),e.querySelector("[data-action='proc-add-variety']")?.addEventListener("click",async()=>{const s=e.querySelector("#proc-variety-name"),i=e.querySelector("#proc-variety-price"),p=s?.value.trim()??"",m=parseFloat(i?.value??"400")||400;if(!p)return;const{addRiceVariety:h,fetchRiceVarieties:b}=await I(async()=>{const{addRiceVariety:w,fetchRiceVarieties:S}=await Promise.resolve().then(()=>O);return{addRiceVariety:w,fetchRiceVarieties:S}},void 0);await h(p,m)&&(a.riceVarieties=await b(),s&&(s.value=""),i&&(i.value=""),F(`「${p}」を追加しました`)),E()}),e.querySelectorAll("[data-action='proc-delete-variety']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",{deleteRiceVariety:p,fetchRiceVarieties:m}=await I(async()=>{const{deleteRiceVariety:b,fetchRiceVarieties:x}=await Promise.resolve().then(()=>O);return{deleteRiceVariety:b,fetchRiceVarieties:x}},void 0);await p(i)&&(a.riceVarieties=await m()),E()})}),e.querySelectorAll("[data-action='brew-rice-variety-select']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=s.dataset.field??"",m=s.value;if(!i||!p)return;const h=a.brewingRiceParams[i]??{brewCategory:i,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[p]=m;const b=a.riceVarieties.find(w=>w.name===m);b&&(p==="kojiVariety"&&(h.kojiPricePerKg=b.defaultPricePerKg),p==="kakeVariety"&&(h.kakePricePerKg=b.defaultPricePerKg)),a.brewingRiceParams[i]=h;const{saveBrewingRiceParams:x}=await I(async()=>{const{saveBrewingRiceParams:w}=await Promise.resolve().then(()=>O);return{saveBrewingRiceParams:w}},void 0);await x(i,h),E()})}),e.querySelector("[data-action='proc-add-new-cat']")?.addEventListener("click",async()=>{const s=e.querySelector("#proc-new-cat-name"),i=e.querySelector("#proc-new-cat-vol"),p=s?.value.trim()??"",m=parseFloat(i?.value??"0");if(!p){F("区分名を入力してください","warning");return}if(m<=0){F("醸造予定量を入力してください","warning");return}const{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await I(async()=>{const{saveBrewingSchedule:x,fetchBrewingSchedule:w}=await Promise.resolve().then(()=>O);return{saveBrewingSchedule:x,fetchBrewingSchedule:w}},void 0);await h(p,a.brewingPlanFY,[{brewMonth:10,durationMonths:2,plannedVolumeL:m}]),a.brewingSchedule=await b(a.brewingPlanFY),s&&(s.value=""),i&&(i.value=""),F(`「${p}」を追加しました`),E()}),e.querySelector("[data-action='brew-rice-bulk-apply']")?.addEventListener("click",async()=>{const s=parseFloat(e.querySelector("#rice-bulk-per-l")?.value??"0.50"),i=parseFloat(e.querySelector("#rice-bulk-koji")?.value??"0.30");if(isNaN(s)||isNaN(i))return;const{saveBrewingRiceParams:p}=await I(async()=>{const{saveBrewingRiceParams:b}=await Promise.resolve().then(()=>O);return{saveBrewingRiceParams:b}},void 0),m=Object.keys(a.brewingRiceParams),h=new Set([...m,...a.brewingYearlyShipments.map(b=>b.brewCategory)]);for(const b of h){const x=a.brewingRiceParams[b]??{brewCategory:b,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};x.ricePerLiterKg=s,x.kojiRatio=i,a.brewingRiceParams[b]=x,await p(b,x)}E()}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=s.dataset.field??"",m=parseFloat(s.value);if(!i||!p||isNaN(m))return;const h=a.brewingRiceParams[i]??{brewCategory:i,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[p]=m,a.brewingRiceParams[i]=h;const{saveBrewingRiceParams:b}=await I(async()=>{const{saveBrewingRiceParams:x}=await Promise.resolve().then(()=>O);return{saveBrewingRiceParams:x}},void 0);await b(i,h),E()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=parseFloat(s.value);if(!i)return;const{saveBrewingForecastOverride:m}=await I(async()=>{const{saveBrewingForecastOverride:h}=await Promise.resolve().then(()=>O);return{saveBrewingForecastOverride:h}},void 0);if(isNaN(p))await m(i,null),delete a.brewingForecastOverrides[i];else{const h=p/100;await m(i,h),a.brewingForecastOverrides[i]=h}E()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p="bc-"+encodeURIComponent(i).replace(/%/g,"-"),m=e.querySelector(`#alc-raw-${p}`),h=e.querySelector(`#alc-target-${p}`),b=parseFloat(m?.value??"18")||18,x=parseFloat(h?.value??"15")||15,{saveBrewingAlcoholSetting:w}=await I(async()=>{const{saveBrewingAlcoholSetting:C}=await Promise.resolve().then(()=>O);return{saveBrewingAlcoholSetting:C}},void 0);await w(i,b,x)&&(a.brewingAlcoholSettings[i]={brewCategory:i,rawAlcoholPct:b,targetAlcoholPct:x}),E()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"",p=s.value,m=s.dataset.current??"";if(p===m)return;const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:x,fetchBrewingCategoryOverrides:w}=await I(async()=>{const{setBrewingCategoryOverride:C,fetchBrewingPlanSummary:A,fetchBrewingProductDetail:T,fetchBrewingCategoryOverrides:N}=await Promise.resolve().then(()=>O);return{setBrewingCategoryOverride:C,fetchBrewingPlanSummary:A,fetchBrewingProductDetail:T,fetchBrewingCategoryOverrides:N}},void 0);if(await h(i,p)){const C=a.brewingPlanFY,[A,T,N]=await Promise.all([b(`${C}-10-01`,`${C+1}-09-30`),x(`${C}-10-01`,`${C+1}-09-30`),w()]);a.brewingPlanData=A,a.brewingProductDetail=T,a.brewingOverrides=N}E()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",p=s.value;if(!i||!p)return;const{linkTypeToCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:x,fetchCategoryTypeLinks:w}=await I(async()=>{const{linkTypeToCategory:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:z}=await Promise.resolve().then(()=>O);return{linkTypeToCategory:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:z}},void 0);await m(i,p);const S=a.brewingPlanFY,[C,A,T,N]=await Promise.all([h(`${S}-10-01`,`${S+1}-09-30`),b(`${S}-10-01`,`${S+1}-09-30`),x(),w()]);a.brewingPlanData=C,a.brewingProductDetail=A,a.brewingOverrides=T,a.brewingTypeLinks=N,E()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=s.dataset.type??"";if(!i||!p)return;const{unlinkTypeFromCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:x,fetchCategoryTypeLinks:w}=await I(async()=>{const{unlinkTypeFromCategory:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:z}=await Promise.resolve().then(()=>O);return{unlinkTypeFromCategory:R,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:B,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:z}},void 0);await m(i,p);const S=a.brewingPlanFY,[C,A,T,N]=await Promise.all([h(`${S}-10-01`,`${S+1}-09-30`),b(`${S}-10-01`,`${S+1}-09-30`),x(),w()]);a.brewingPlanData=C,a.brewingProductDetail=A,a.brewingOverrides=T,a.brewingTypeLinks=N,E()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const s=e.querySelector("#brew-new-category-name"),i=e.querySelector("#brew-new-category-parent"),p=s?.value.trim()??"",m=i?.value??"";if(!p)return;if(!m){F("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map(w=>w.name)].includes(p)){F("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:b}=await I(async()=>{const{addBrewingCustomCategory:w}=await Promise.resolve().then(()=>O);return{addBrewingCustomCategory:w}},void 0);await b(p,m)?(a.brewingCustomCategories.push({name:p,parentCategory:m}),s&&(s.value=""),F(`「${p}」を追加しました（${m}系）`)):F("追加に失敗しました","error"),E()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"";if(!i)return;const{deleteBrewingCustomCategory:p,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h}=await I(async()=>{const{deleteBrewingCustomCategory:x,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:S}=await Promise.resolve().then(()=>O);return{deleteBrewingCustomCategory:x,fetchBrewingPlanSummary:w,fetchBrewingProductDetail:S}},void 0);if(await p(i)){a.brewingCustomCategories=a.brewingCustomCategories.filter(C=>C.name!==i);for(const[C,A]of Object.entries(a.brewingOverrides))A===i&&delete a.brewingOverrides[C];const x=a.brewingPlanFY,[w,S]=await Promise.all([m(`${x}-10-01`,`${x+1}-09-30`),h(`${x}-10-01`,`${x+1}-09-30`)]);a.brewingPlanData=w,a.brewingProductDetail=S,F(`「${i}」を削除しました`)}E()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=s.dataset.catId??"",h=e.querySelector(`#new-entry-target-${p}`)?.value??i,b=e.querySelector(`#new-entry-label-${p}`),x=e.querySelector(`#new-entry-vol-${p}`),w=b?.value.trim()??"",S=parseFloat(x?.value??"0");if(S<=0)return;const{addBrewingStockEntry:C,fetchBrewingPlanSummary:A,fetchAllBrewingStockEntries:T}=await I(async()=>{const{addBrewingStockEntry:R,fetchBrewingPlanSummary:M,fetchAllBrewingStockEntries:B}=await Promise.resolve().then(()=>O);return{addBrewingStockEntry:R,fetchBrewingPlanSummary:M,fetchAllBrewingStockEntries:B}},void 0);if(await C(h,w||`タンク${a.brewingStockEntries.filter(R=>R.brewCategory===h).length+1}`,S)){const R=a.brewingPlanFY,[M,B]=await Promise.all([A(`${R}-10-01`,`${R+1}-09-30`),T()]);a.brewingPlanData=M,a.brewingStockEntries=B}E(),requestAnimationFrame(()=>{const R=document.getElementById(`stock-display-${p}`),M=document.getElementById(`stock-edit-${p}`),B=document.querySelector(`.btn-edit-stock[data-cat-id="${p}"]`);R&&(R.style.display="none"),M&&(M.style.display=""),B&&(B.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.id??"",p=s.value;if(!i||!p)return;const{reassignBrewingStockEntry:m,fetchBrewingPlanSummary:h,fetchAllBrewingStockEntries:b}=await I(async()=>{const{reassignBrewingStockEntry:w,fetchBrewingPlanSummary:S,fetchAllBrewingStockEntries:C}=await Promise.resolve().then(()=>O);return{reassignBrewingStockEntry:w,fetchBrewingPlanSummary:S,fetchAllBrewingStockEntries:C}},void 0);if(await m(i,p)){const w=a.brewingPlanFY,[S,C]=await Promise.all([h(`${w}-10-01`,`${w+1}-09-30`),b()]);a.brewingPlanData=S,a.brewingStockEntries=C}E(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach(w=>{const S=document.getElementById(`stock-display-${w.dataset.catId}`),C=document.getElementById(`stock-edit-${w.dataset.catId}`);C&&C.querySelector(`[data-id="${i}"]`)&&(S&&(S.style.display="none"),C.style.display="",w.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",p=s.dataset.cat??"",m="bc-"+encodeURIComponent(p).replace(/%/g,"-"),{deleteBrewingStockEntry:h,fetchBrewingPlanSummary:b,fetchAllBrewingStockEntries:x}=await I(async()=>{const{deleteBrewingStockEntry:S,fetchBrewingPlanSummary:C,fetchAllBrewingStockEntries:A}=await Promise.resolve().then(()=>O);return{deleteBrewingStockEntry:S,fetchBrewingPlanSummary:C,fetchAllBrewingStockEntries:A}},void 0);if(await h(i)){const S=a.brewingPlanFY,[C,A]=await Promise.all([b(`${S}-10-01`,`${S+1}-09-30`),x()]);a.brewingPlanData=C,a.brewingStockEntries=A}E(),requestAnimationFrame(()=>{const S=document.getElementById(`stock-display-${m}`),C=document.getElementById(`stock-edit-${m}`),A=document.querySelector(`.btn-edit-stock[data-cat-id="${m}"]`);S&&(S.style.display="none"),C&&(C.style.display=""),A&&(A.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.catId??"",p=e.querySelector(`#stock-display-${i}`),m=e.querySelector(`#stock-edit-${i}`);p&&(p.style.display="none"),m&&(m.style.display=""),s.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.catId??"",p=e.querySelector(`#stock-display-${i}`),m=e.querySelector(`#stock-edit-${i}`),h=e.querySelector(`.btn-edit-stock[data-cat-id="${i}"]`);p&&(p.style.display=""),m&&(m.style.display="none"),h&&(h.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.catId??"",p=e.querySelector(`#schedule-rows-${i}`);if(!p)return;const m=p.querySelectorAll(".schedule-edit-row").length,h=document.createElement("div");h.innerHTML=buildScheduleEditRowHTML(i,m,9,2,0,"");const b=h.firstElementChild;p.appendChild(b),b.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>b.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(s=>{s.addEventListener("click",()=>s.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",p=s.dataset.catId??"",m=e.querySelector(`#stock-input-${p}`),h=parseFloat(m?.value??"");if(isNaN(h)||h<0){alert("有効な数値を入力してください");return}s.textContent="保存中...",s.setAttribute("disabled","true");try{const{upsertBrewingStock:b,fetchBrewingPlanSummary:x,fetchBrewingMonthlyTrend:w}=await I(async()=>{const{upsertBrewingStock:T,fetchBrewingPlanSummary:N,fetchBrewingMonthlyTrend:R}=await Promise.resolve().then(()=>O);return{upsertBrewingStock:T,fetchBrewingPlanSummary:N,fetchBrewingMonthlyTrend:R}},void 0),S=a.brewingPlanFY;await b(i,h,0);const[C,A]=await Promise.all([x(`${S}-10-01`,`${S+1}-09-30`),w(`${S}-10-01`,`${S+1}-09-30`)]);a.brewingPlanData=C,a.brewingMonthlyTrend=A,E()}catch(b){console.error("[brewing save]",b),alert(`保存エラー: ${String(b)}`),s.textContent="保存",s.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.toggleCat??"",p=`sub-row-${"bc-"+encodeURIComponent(i).replace(/%/g,"-")}`,m=e.querySelectorAll(`.${p}`),h=s.querySelector(".toggle-icon"),b=m[0]?.style.display!=="none";m.forEach(x=>{x.style.display=b?"none":""}),h&&(h.innerHTML=b?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{F("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{F("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(s=>{s.addEventListener("click",()=>{F("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{F("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(s=>{s.addEventListener("click",async()=>{await Ee("この買掛を入金済みにしますか？")&&F("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(s=>{s.addEventListener("click",()=>{F("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{F("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(s=>{s.addEventListener("click",()=>{const i=s.closest("tr")?.querySelector("td")?.textContent??"";F(`タンク ${i} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{F("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(s=>{s.addEventListener("click",()=>{const i=s.closest("tr")?.querySelector("td")?.textContent??"";F(`注文 ${i} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{F("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(s=>{s.addEventListener("click",()=>{F("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{F("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.customer??"";F(`得意先 ${i} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{F("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!s||!await Ee("このリストを削除しますか？"))return;const{supabaseDelete:p}=await I(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>ee);return{supabaseDelete:h}},void 0);if(await p("lead_lists",s)){const{fetchLeadLists:h}=await I(async()=>{const{fetchLeadLists:b}=await Promise.resolve().then(()=>O);return{fetchLeadLists:b}},void 0);a.leadLists=await h(),F("削除しました","success"),E()}else F("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{F("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.scYm;if(!i)return;a.shipmentCalendarYearMonth=i,a.shipmentCalendarData=null,a.shipmentCalendarPrevYearData=null,a.shipmentCalendarSelectedDate=null,E();const{fetchShipmentCalendar:p}=await I(async()=>{const{fetchShipmentCalendar:S}=await Promise.resolve().then(()=>O);return{fetchShipmentCalendar:S}},void 0),[m,h]=i.split("-").map(Number),b=`${m-1}-${String(h).padStart(2,"0")}`,[x,w]=await Promise.all([p(i),p(b)]);a.shipmentCalendarData=x,a.shipmentCalendarPrevYearData=w,E()})}),e.querySelectorAll("[data-sc-date]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.scDate;i!==void 0&&(a.shipmentCalendarSelectedDate=i?a.shipmentCalendarSelectedDate===i?null:i:null,E())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(s=>{s.addEventListener("click",async()=>{a.calendarYearMonth=s.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:i}=await I(async()=>{const{fetchCalendarEvents:p}=await Promise.resolve().then(()=>O);return{fetchCalendarEvents:p}},void 0);a.calendarEvents=await i(a.calendarYearMonth),E()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async s=>{a.calendarYearMonth=s.target.value;const{fetchCalendarEvents:i}=await I(async()=>{const{fetchCalendarEvents:p}=await Promise.resolve().then(()=>O);return{fetchCalendarEvents:p}},void 0);a.calendarEvents=await i(a.calendarYearMonth),E()}),e.querySelector("#cal-filter-category")?.addEventListener("change",s=>{a.calendarFilterCategory=s.target.value,E()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const s=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(s.getTime()+3600*1e3).toISOString(),isAllDay:!1}},E()}),e.querySelectorAll("[data-cal-date]").forEach(s=>{s.tagName!=="BUTTON"&&s.addEventListener("click",i=>{if(i.target.closest(".cal-event"))return;const p=s.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${p}T10:00:00`,isAllDay:!1}},E()})}),e.querySelectorAll("[data-cal-event-id]").forEach(s=>{s.addEventListener("click",i=>{i.stopPropagation();const p=s.dataset.calEventId,m=a.calendarEvents.find(h=>h.id===p);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},E())})}),e.querySelectorAll("[data-action='cal-close']").forEach(s=>{s.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.calendarEdit=null,E())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:s,fetchCalendarEvents:i,CALENDAR_CATEGORY_COLORS:p}=await I(async()=>{const{saveCalendarEvent:w,fetchCalendarEvents:S,CALENDAR_CATEGORY_COLORS:C}=await Promise.resolve().then(()=>O);return{saveCalendarEvent:w,fetchCalendarEvents:S,CALENDAR_CATEGORY_COLORS:C}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,h=e.querySelector("#cal-category")?.value??"general",b={id:m,title:e.querySelector("#cal-title")?.value??"",category:h,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:p[h]};if(!b.title){F("タイトルは必須です","warning");return}await s(b)?(a.calendarEvents=await i(a.calendarYearMonth),a.calendarEdit=null,F("保存しました"),E()):F("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!s||!await Ee("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:i,fetchCalendarEvents:p}=await I(async()=>{const{deleteCalendarEvent:h,fetchCalendarEvents:b}=await Promise.resolve().then(()=>O);return{deleteCalendarEvent:h,fetchCalendarEvents:b}},void 0);await i(s)?(a.calendarEvents=await p(a.calendarYearMonth),a.calendarEdit=null,F("削除しました"),E()):F("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,E();try{const s=a.importPreview.rows.filter(p=>p._valid),i=await Eo(a.importEntity,s);a.importResult=`取り込み完了: ${i.inserted}件成功 / ${i.failed}件失敗`,a.importPreview=null}catch(s){a.importResult=`エラー: ${s instanceof Error?s.message:String(s)}`}finally{a.importing=!1,E()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const s=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=s,a.storeSales=[],a.actionLoading=!0,E(),ln(s).then(i=>{a.storeSales=i,a.actionLoading=!1,E()})}),e.querySelectorAll("[data-action='copy-config']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.configValue??"";if(i)try{await navigator.clipboard.writeText(i),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(p){console.warn("Clipboard copy failed",p)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const i=JSON.stringify({supabase_url:fe,supabase_anon_key:ce,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),p=new Blob([i],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(p),h=document.createElement("a");h.href=m,h.download="relay_config.json",h.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.code??"";if(i)try{await navigator.clipboard.writeText(decodeURIComponent(i)),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(p){console.warn("Clipboard code copy failed",p)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(s=>{s.addEventListener("change",()=>{We(e),a.emailSaveMessage=null,E()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(s=>{s.addEventListener("change",()=>{We(e),a.emailSaveMessage=null,E()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{We(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{We(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(s=>{s.addEventListener("click",()=>{a.emailTemplateId=s.dataset.templateId??"custom";const i=Io(a.emailTemplateId);a.emailSubject=i.subject,a.emailBody=i.body,a.emailSaveMessage=null,E()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{We(e);const s=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${s}`),a.emailSaveMessage=null,E()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{We(e),a.actionLoading=!0,E(),Qt(Da("draft")).then(s=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(s.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,E()})}),e.querySelector("#email-sender")?.addEventListener("change",s=>{a.emailSenderId=s.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{We(e),a.actionLoading=!0,a.emailSending=!0,E();const s=Da("sent");a.mailSenders.find(i=>i.id===a.emailSenderId),Ys().then(async i=>{await Qt({...s,recipientCount:i.sent}),a.emailSaveMessage=`${i.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,E(),F(`${i.sent}件送信完了`)}).catch(async()=>{await Qt(Da("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,E(),F("APIキー未設定のため下書き保存しました","warning")})}),e.querySelectorAll(".feature-checkbox").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.featureId;if(!i)return;const p=a.myProfile?.name??a.myProfile?.email??"不明";s.checked?await ao(i,p):await no(i),a.featureStatuses=await ra(),E()})})}function E(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=rm()}catch(o){console.error("[renderApp] render error:",o),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(o)}

${o?.stack??""}</div>`;return}const t=e.querySelector(".app-page-title");document.title=t?.textContent?`${t.textContent} | 酒仙iクラウド`:"酒仙iクラウド",cm(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),wn()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const o of["fd-scaler","print-scaler","q-preview-scaler"]){const r=e.querySelector(`#${o}`),l=r?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),c=l?.querySelector(".print-page")??l;if(!r||!c)continue;const d=r.parentElement?.clientWidth??0,u=c.offsetWidth;if(d>0&&u>0&&u>d-24){const y=(d-24)/u;r.style.transform=`scale(${y})`,r.style.transformOrigin="top left",r.style.height=`${(c.offsetHeight+48)*y}px`}else r.style.transform="",r.style.height=""}});const n=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=n?"hidden":"",document.body.style.touchAction=n?"none":""}const zo="sake-cloud-cache",dm=300*1e3;function pm(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(zo,JSON.stringify(e))}catch{}}function um(){try{const e=localStorage.getItem(zo);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>dm?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let Fo=0;async function ct(){const e=um();e&&(a.loading=!1,E()),a.loading=!e,e||E();try{const[t,n,o,r,l,c,d]=await Promise.all([fs(),vs(),Xa(),bs(),Et(a.invoiceFilter),en(),gs("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=o,a.pipelineMeta=r,a.invoiceRecords=l,a.salesAnalytics=c,d){const u={...Gt,...Ba(),...d};a.quoteCompanySettings=u,Xe(u)}if(lt.length===0&&Fu(),!a.salesFilter.startDate||!a.salesFilter.endDate){const y=[...t.salesRecords].sort(($,P)=>new Date(P.date).getTime()-new Date($.date).getTime())[0]?.date??new Date().toISOString(),f=new Date(y),g=new Date(f);g.setDate(f.getDate()-30),a.salesFilter={startDate:ls(g.toISOString()),endDate:ls(f.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await Et(a.invoiceFilter)),a.error=null,pm()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,E(),Lt(a.route),Fo=Date.now()}}window.addEventListener("popstate",()=>{a.route=No(location.pathname),a.currentCategory=ha(a.route),a.sidebarOpen=!1,At(),Lt(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,E();return}if(e.key==="Escape"){if(a.globalSearchOpen){At(),E();return}if(a.pickerMode){ca(),E();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Mo(),E());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&Oo(t)}});a.user=da()?Wo():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await I(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>O);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),E()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,o=0,r=0,l=0,c=1;document.addEventListener("mousedown",d=>{const u=d.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;d.preventDefault();const y=u.closest(".fd-canvas");if(!y)return;const f=y.getBoundingClientRect();if(f.width===0)return;c=228.6/f.width,t=u,n=d.clientX,o=d.clientY,r=parseFloat(u.style.left)||0,l=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(_=>_.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const g=document.querySelector("#fd-selected-info");g&&(g.textContent=`選択中: ${u.title}`);const $=document.querySelector("#fd-sel-x"),P=document.querySelector("#fd-sel-y");$&&($.value=String(r)),P&&(P.value=String(l))}),document.addEventListener("mousemove",d=>{if(!t)return;const u=(d.clientX-n)*c,y=(d.clientY-o)*c,f=Math.round((r+u)*2)/2,g=Math.round((l+y)*2)/2;t.style.left=f+"mm",t.style.top=g+"mm";const $=document.querySelector("#fd-sel-x"),P=document.querySelector("#fd-sel-y");$&&($.value=String(f)),P&&(P.value=String(g))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",d=>{if(!a.fdDesignMode||!a.fdActiveFieldId||d.key!=="ArrowLeft"&&d.key!=="ArrowRight"&&d.key!=="ArrowUp"&&d.key!=="ArrowDown"||d.target.tagName==="INPUT"||d.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;d.preventDefault();const y=.5;let f=parseFloat(u.style.left)||0,g=parseFloat(u.style.top)||0;d.key==="ArrowLeft"?f-=y:d.key==="ArrowRight"?f+=y:d.key==="ArrowUp"?g-=y:d.key==="ArrowDown"&&(g+=y),u.style.left=f+"mm",u.style.top=g+"mm";const $=document.querySelector("#fd-sel-x"),P=document.querySelector("#fd-sel-y");$&&($.value=String(f)),P&&(P.value=String(g))})})();let Ta=null,Kt=[],ds=null;function mm(e){const t=window.google?.maps;if(!t){console.warn("Google Maps not loaded");return}const n=e.querySelector("#customer-map"),o=e.querySelector("#map-data");if(!n||!o)return;const r=JSON.parse(decodeURIComponent(o.dataset.customers??"[]")),l=JSON.parse(decodeURIComponent(o.dataset.deliveries??"[]"));Ta||(Ta=new t.Map(n,{center:{lat:35.38,lng:139.25},zoom:10,gestureHandling:"greedy",streetViewControl:!1,mapTypeControl:!1}),ds=new t.InfoWindow);const c=Ta,d=ds;function u($){return $.isAtRisk?"#e53e3e":$.isDormant?"#dd6b20":$.amount12m>0?"#2563eb":"#aaa"}function y($,P=32){const _=`<svg xmlns="http://www.w3.org/2000/svg" width="${P}" height="${P}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${$}" stroke="white" stroke-width="2.5"/></svg>`;return{url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(_),scaledSize:new t.Size(P,P),anchor:new t.Point(P/2,P/2)}}function f(){Kt.forEach($=>$.setMap(null)),Kt=[]}function g($,P,_){f();const D=new t.LatLngBounds;let k=!1;r.filter(s=>!($==="at-risk"&&!s.isAtRisk||$==="dormant"&&(s.isAtRisk||!s.isDormant)||$==="active"&&(s.isAtRisk||s.isDormant||s.amount12m===0)||$==="inactive"&&(s.isAtRisk||s.isDormant||s.amount12m>0)||P&&s.areaCode!==P||_&&(s.businessTypeName||s.businessType)!==_)).forEach(s=>{if(!s.lat||!s.lng)return;const i={lat:s.lat,lng:s.lng};D.extend(i),k=!0;const p=new t.Marker({map:c,position:i,icon:y(u(s),28),title:s.name});p.addListener("click",()=>{d.setContent(`<div style="font-size:13px;max-width:260px;">
          <strong>${s.name}</strong><br>${s.address1??""}<br>
          エリア: ${s.areaCode??"―"} / ${s.businessTypeName??s.businessType??"―"}<br>
          12ヶ月売上: <strong>${s.amount12m?.toLocaleString()??0}円</strong></div>`),d.open(c,p)}),Kt.push(p)}),l.forEach(s=>{if(!s.lat||!s.lng)return;const i={lat:s.lat,lng:s.lng};D.extend(i),k=!0;const p=new t.Marker({map:c,position:i,icon:y("#FF9800",22),title:s.name});p.addListener("click",()=>{d.setContent(`<div style="font-size:13px;"><strong>${s.name}</strong><br>${s.address??""}${s.phone?`<br>${s.phone}`:""}</div>`),d.open(c,p)}),Kt.push(p)}),k&&c.fitBounds(D,{top:40,bottom:40,left:40,right:40})}g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz),e.querySelectorAll("[data-map-status]").forEach($=>{$.addEventListener("click",()=>{const P=$.dataset.mapStatus;a.mapFilters={...a.mapFilters,filterStatus:P},e.querySelectorAll("[data-map-status]").forEach(_=>{_.className=_.className.replace(/\b(primary|secondary)\b/g,_===$?"primary":"secondary")}),g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)})}),e.querySelector("#map-filter-area")?.addEventListener("change",$=>{a.mapFilters={...a.mapFilters,filterArea:$.target.value},g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#map-filter-biz")?.addEventListener("change",$=>{a.mapFilters={...a.mapFilters,filterBiz:$.target.value},g(a.mapFilters.filterStatus,a.mapFilters.filterArea,a.mapFilters.filterBiz)}),e.querySelector("#btn-geocode")?.addEventListener("click",async()=>{const $=e.querySelector("#btn-geocode"),P=e.querySelector("#geocode-progress"),_=e.querySelector("#geocode-status"),D=e.querySelector("#geocode-bar");$&&($.disabled=!0),P&&(P.style.display="block");try{const{batchGeocode:k}=await I(async()=>{const{batchGeocode:s}=await Promise.resolve().then(()=>O);return{batchGeocode:s}},void 0),L=await k((s,i,p)=>{_&&(_.textContent=`${s}/${i} — ${p}`),D&&(D.style.width=`${Math.round(s/Math.max(i,1)*100)}%`)});_&&(_.textContent=`完了: ${L.success}件成功 / ${L.failed}件失敗`),D&&(D.style.width="100%"),setTimeout(()=>{window.location.reload()},3e3)}catch(k){_&&(_.textContent="エラーが発生しました: "+String(k))}})}ct();const ym=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&ct()},ym);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-Fo>60*1e3&&ct()});let Ha="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{Ha=e}).catch(()=>{});setInterval(async()=>{if(!(!Ha||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==Ha&&!a.updateAvailable&&(a.updateAvailable=!0,E())}catch{}},120*1e3);export{I as _};
